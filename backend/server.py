import asyncio
from contextlib import suppress
from fastapi import FastAPI, APIRouter, Depends, HTTPException, Query, Request
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
from pymongo import ASCENDING, DESCENDING, IndexModel, ReturnDocument
import os
import logging
import time
import uuid
import requests
from html import escape
from pathlib import Path
from pydantic import BaseModel, Field, EmailStr, field_validator
from typing import List, Literal, Optional
from datetime import datetime, timezone

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

try:
    from backend.clerk_auth import clerk_router, require_user
    from backend.email_service import send_email, EMAIL_FROM_NAME
except ModuleNotFoundError:
    from clerk_auth import clerk_router, require_user
    from email_service import send_email, EMAIL_FROM_NAME

mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]
OWNER_EMAIL = os.environ['OWNER_EMAIL']

logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(name)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)

INDEXES: dict[str, list[IndexModel]] = {
    "enquiries": [
        IndexModel([("id", ASCENDING)], name="id", unique=True),
        IndexModel([("created_at", DESCENDING)], name="created_desc"),
        IndexModel([("form_type", ASCENDING), ("status", ASCENDING)], name="type_status"),
    ],
    "users": [IndexModel([("user_id", ASCENDING)], name="user_id", unique=True)],
}


async def ensure_indexes() -> None:
    for collection, models in INDEXES.items():
        for model in models:
            try:
                await db[collection].create_indexes([model])
            except Exception as exc:
                logger.error("ensure_indexes(%s.%s): %s", collection, model.document["name"], exc)

app = FastAPI()
api_router = APIRouter(prefix="/api")

SERVICES = [
    "Website design & development", "Software & web app development", "AI chatbots", "AI voice agents",
    "Paid ads", "SEO", "Social media management", "Video editing & clipping", "Graphic design",
]
MODELS = ["Per project", "Monthly per client", "Dedicated team", "Pilot project"]
COUNTRIES = ["Canada", "United States", "Other"]

# ---------- Roles ----------
ROLES = ["admin", "member"]
DEFAULT_ROLE = "member"
RETIRED_ROLES: dict[str, str] = {}
RANK = {r: len(ROLES) - i for i, r in enumerate(ROLES)}
ENV = "live" if os.environ.get("CLERK_PUBLISHABLE_KEY", "").startswith("pk_live_") else "preview"
IN_ENV = {"env": {"$in": [ENV, None]}}


def effective_role(role) -> str:
    role = RETIRED_ROLES.get(role, role)
    return role if role in ROLES else DEFAULT_ROLE


def _clerk_user(user_id: str) -> dict:
    r = requests.get(f"https://api.clerk.com/v1/users/{user_id}", timeout=10,
                     headers={"Authorization": f"Bearer {os.environ['CLERK_SECRET_KEY']}", "User-Agent": "emergent-app"})
    r.raise_for_status()
    return r.json()


def _primary_email(data: dict) -> str:
    emails = data.get("email_addresses", [])
    primary = next((e for e in emails if e["id"] == data.get("primary_email_address_id")), emails[0] if emails else None)
    return primary["email_address"] if primary else ""


async def current_member(user: dict = Depends(require_user)) -> dict:
    uid = user["user_id"]
    member = await db.users.find_one({"user_id": uid}, {"_id": 0})
    if member is None or not member.get("role"):
        data = await asyncio.to_thread(_clerk_user, uid)
        admins = {e.strip().lower() for e in os.environ.get("ADMIN_EMAIL", "").split(",") if e.strip()}
        is_admin = any(e["email_address"].lower() in admins and (e.get("verification") or {}).get("status") == "verified"
                       for e in data["email_addresses"])
        role = "admin" if is_admin else DEFAULT_ROLE
        await db.users.update_one({"user_id": uid, "role": {"$in": [None, ""]}}, {"$set": {"role": role}})
        member = await db.users.find_one_and_update(
            {"user_id": uid},
            {"$setOnInsert": {"user_id": uid, "role": role, "email": _primary_email(data),
                              "created_at": datetime.now(timezone.utc).isoformat()}},
            upsert=True, projection={"_id": 0}, return_document=ReturnDocument.AFTER)
    if member.get("env") != ENV:
        await db.users.update_one({"user_id": uid}, {"$set": {"env": ENV}})
    return {**member, "env": ENV, "role": effective_role(member["role"])}


def require_role(*roles: str):
    async def check(member: dict = Depends(current_member)) -> dict:
        if member["role"] not in roles:
            raise HTTPException(status_code=403, detail="Not allowed")
        return member
    return check


@app.on_event("startup")
async def move_retired_roles():
    for old, new in RETIRED_ROLES.items():
        await db.users.update_many({"role": old}, {"$set": {"role": new}})


# ---------- Models ----------
class EnquiryIn(BaseModel):
    form_type: Literal["partner", "rate_card"]
    name: str = Field(min_length=2, max_length=120)
    agency: str = Field(min_length=2, max_length=160)
    website: str = Field(min_length=3, max_length=240)
    email: EmailStr
    country: str
    services: List[str] = Field(min_length=1)
    models: List[str] = []
    volume: str = Field(min_length=1, max_length=120)
    message: str = Field(default="", max_length=4000)
    nda: bool = False
    company_url: str = ""  # honeypot
    elapsed_ms: int = 0

    @field_validator("country")
    @classmethod
    def _country(cls, v):
        if v not in COUNTRIES:
            raise ValueError("Choose a country")
        return v

    @field_validator("services")
    @classmethod
    def _services(cls, v):
        if any(s not in SERVICES for s in v):
            raise ValueError("Unknown service")
        return v

    @field_validator("models")
    @classmethod
    def _models(cls, v):
        if any(m not in MODELS for m in v):
            raise ValueError("Unknown engagement model")
        return v


class Enquiry(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    form_type: str
    name: str
    agency: str
    website: str
    email: str
    country: str
    services: List[str]
    models: List[str] = []
    volume: str = ""
    message: str = ""
    nda: bool = False
    status: Literal["new", "handled"] = "new"
    email_status: str = "pending"
    created_at: str = Field(default_factory=lambda: datetime.now(timezone.utc).isoformat())
    handled_at: Optional[str] = None


class StatusIn(BaseModel):
    status: Literal["new", "handled"]


class RoleIn(BaseModel):
    role: str


# ---------- Email ----------
def _row(label: str, value: str) -> str:
    return (f'<tr><td style="padding:6px 12px 6px 0;color:#575B62;font-size:13px;vertical-align:top;width:170px">{escape(label)}</td>'
            f'<td style="padding:6px 0;color:#111418;font-size:14px">{escape(value) or "-"}</td></tr>')


def _enquiry_email(e: Enquiry) -> tuple[str, str]:
    kind = "partner enquiry" if e.form_type == "partner" else "rate card request"
    subject = f"New {kind}: {e.agency}"
    rows = [_row("Name", e.name), _row("Agency", e.agency), _row("Agency website", e.website),
            _row("Email", e.email), _row("Country", e.country), _row("Services", ", ".join(e.services)),
            _row("Approx. monthly volume", e.volume)]
    if e.form_type == "partner":
        rows += [_row("Engagement models", ", ".join(e.models)), _row("NDA requested", "Yes" if e.nda else "No"),
                 _row("Message", e.message)]
    html = ('<table role="presentation" width="100%"><tr><td style="padding:24px;font-family:Arial,sans-serif">'
            f'<p style="font-size:16px;color:#111418;margin:0 0 16px">A new {escape(kind)} came in through the website.</p>'
            f'<table role="presentation" style="border-collapse:collapse">{"".join(rows)}</table>'
            '<p style="font-size:13px;color:#575B62;margin-top:20px">Sign in to the enquiries inbox to review it and mark it as handled.</p>'
            f'<p style="font-size:12px;color:#8A8F98">Sent by {escape(EMAIL_FROM_NAME)} website notifications.</p>'
            '</td></tr></table>')
    return subject, html


async def _notify(e: Enquiry) -> None:
    subject, html = _enquiry_email(e)
    try:
        await send_email(to=OWNER_EMAIL, subject=subject, html=html, reply_to=e.email)
        status = "sent"
    except Exception as exc:
        logger.error("Enquiry email failed for %s: %s", e.id, exc)
        status = "failed"
    await db.enquiries.update_one({"id": e.id}, {"$set": {"email_status": status}})


_recent: dict[str, list[float]] = {}


def _rate_limited(ip: str) -> bool:
    now = time.time()
    for k in [k for k, v in _recent.items() if now - v[-1] > 600]:
        del _recent[k]
    hits = [t for t in _recent.get(ip, []) if now - t < 600]
    hits.append(now)
    _recent[ip] = hits
    return len(hits) > 8


# ---------- Routes ----------
@api_router.get("/")
async def root():
    return {"message": "Sinnovation API"}


@api_router.post("/enquiries", status_code=201)
async def create_enquiry(body: EnquiryIn, request: Request):
    if body.company_url or body.elapsed_ms < 2500:
        return {"ok": True}  # silently drop bots
    ip = (request.headers.get("x-forwarded-for", "").split(",")[-1].strip()
          or (request.client.host if request.client else ""))
    if _rate_limited(ip):
        raise HTTPException(status_code=429, detail="Too many submissions. Please try again later.")
    data = body.model_dump(exclude={"company_url", "elapsed_ms"})
    if body.form_type == "rate_card":
        data.update(models=[], message="", nda=False)
    enquiry = Enquiry(**{k: v.strip() if isinstance(v, str) else v for k, v in data.items()})
    await db.enquiries.insert_one(enquiry.model_dump())
    asyncio.create_task(_notify(enquiry))
    return {"ok": True, "id": enquiry.id}


@api_router.get("/me")
async def me(member: dict = Depends(current_member)):
    return {"user_id": member["user_id"], "role": member["role"], "email": member.get("email", "")}


@api_router.get("/enquiries", response_model=List[Enquiry])
async def list_enquiries(form_type: Optional[Literal["partner", "rate_card"]] = None,
                         status: Optional[Literal["new", "handled"]] = None,
                         limit: int = Query(200, ge=1, le=500),
                         admin: dict = Depends(require_role("admin"))):
    q = {}
    if form_type:
        q["form_type"] = form_type
    if status:
        q["status"] = status
    docs = await db.enquiries.find(q, {"_id": 0}).sort("created_at", -1).limit(limit).to_list(limit)
    return [Enquiry(**d) for d in docs]


@api_router.patch("/enquiries/{enquiry_id}", response_model=Enquiry)
async def update_enquiry(enquiry_id: str, body: StatusIn, admin: dict = Depends(require_role("admin"))):
    handled_at = datetime.now(timezone.utc).isoformat() if body.status == "handled" else None
    doc = await db.enquiries.find_one_and_update(
        {"id": enquiry_id}, {"$set": {"status": body.status, "handled_at": handled_at}},
        projection={"_id": 0}, return_document=ReturnDocument.AFTER)
    if not doc:
        raise HTTPException(status_code=404, detail="Not found")
    return Enquiry(**doc)


@api_router.get("/users")
async def list_users(admin: dict = Depends(require_role("admin"))):
    people = await db.users.find(IN_ENV, {"_id": 0}).to_list(1000)
    return {"roles": [r for r in ROLES if RANK[r] <= RANK[admin["role"]]],
            "users": [{**p, "role": effective_role(p.get("role"))} for p in people]}


@api_router.patch("/users/{user_id}/role")
async def set_role(user_id: str, body: RoleIn, admin: dict = Depends(require_role("admin"))):
    if body.role not in ROLES or RANK[body.role] > RANK[admin["role"]]:
        raise HTTPException(status_code=403, detail="Not allowed")
    target = await db.users.find_one({"user_id": user_id, **IN_ENV}, {"_id": 0})
    if target is None:
        raise HTTPException(status_code=404, detail="Not found")
    if (effective_role(target.get("role")) == "admin" and body.role != "admin"
            and await db.users.count_documents({"role": "admin", **IN_ENV}) <= 1):
        raise HTTPException(status_code=409, detail="Keep at least one admin")
    await db.users.update_one({"user_id": user_id}, {"$set": {"role": body.role}})
    return {"user_id": user_id, "role": body.role}


app.include_router(api_router)
app.include_router(clerk_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.on_event("startup")
async def start_index_build():
    app.state.index_task = asyncio.create_task(ensure_indexes())


@app.on_event("shutdown")
async def shutdown_db_client():
    app.state.index_task.cancel()
    with suppress(asyncio.CancelledError):
        await app.state.index_task
    client.close()
