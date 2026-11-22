# Sinnovation API regression: enquiries submit/anti-bot, inbox auth/roles, filters, PATCH status, users/role
import os
import time
import uuid
import pytest
import requests
from pathlib import Path
from clerk_helpers import session_jwt

def _base():
    u = os.environ.get("REACT_APP_BACKEND_URL")
    if not u:
        for line in (Path(__file__).parent.parent.parent / "frontend/.env").read_text().splitlines():
            if line.startswith("REACT_APP_BACKEND_URL="):
                u = line.split("=", 1)[1].strip()
    return u.rstrip("/")

BASE = _base()
API = f"{BASE}/api"
ADMIN_ID = "user_3MQQi8NOAADWg3GZ8N5f7Nf8ymE"
MEMBER_ID = "user_3MQQi64WW8IiYS1LQxlSWD5RZtW"
CREATED = []


def payload(form_type="partner", **kw):
    p = {"form_type": form_type, "name": "TEST_Name", "agency": f"TEST_Agency {uuid.uuid4().hex[:6]}",
         "website": "testagency.com", "email": "delivered@resend.dev", "country": "Canada",
         "services": ["SEO", "Paid ads"], "models": ["Pilot project"] if form_type == "partner" else [],
         "volume": "Not sure yet", "message": "TEST message" if form_type == "partner" else "",
         "nda": form_type == "partner", "company_url": "", "elapsed_ms": 5000}
    p.update(kw)
    return p


@pytest.fixture(scope="module")
def admin_h():
    return {"Authorization": f"Bearer {session_jwt(ADMIN_ID)}"}


@pytest.fixture(scope="module")
def member_h():
    return {"Authorization": f"Bearer {session_jwt(MEMBER_ID)}"}


def _all(admin_h, **params):
    r = requests.get(f"{API}/enquiries", headers=admin_h, params=params, timeout=20)
    assert r.status_code == 200
    return r.json()


class TestSubmit:
    def test_partner_valid(self, admin_h):
        p = payload("partner")
        r = requests.post(f"{API}/enquiries", json=p, timeout=20)
        assert r.status_code == 201, r.text
        d = r.json(); assert d["ok"] is True and isinstance(d["id"], str)
        CREATED.append(d["id"])
        time.sleep(4)
        row = next(e for e in _all(admin_h) if e["id"] == d["id"])
        assert row["agency"] == p["agency"] and row["status"] == "new" and row["nda"] is True
        assert row["models"] == ["Pilot project"]
        print("partner email_status:", row["email_status"])
        assert row["email_status"] in ("sent", "failed")

    def test_ratecard_valid_strips_partner_fields(self, admin_h):
        p = payload("rate_card", models=["Pilot project"], message="x", nda=True)
        r = requests.post(f"{API}/enquiries", json=p, timeout=20)
        assert r.status_code == 201, r.text
        CREATED.append(r.json()["id"])
        time.sleep(4)
        row = next(e for e in _all(admin_h) if e["id"] == r.json()["id"])
        assert row["form_type"] == "rate_card" and row["models"] == [] and row["nda"] is False
        print("rate_card email_status:", row["email_status"])

    @pytest.mark.parametrize("kw", [{"email": "bad"}, {"country": "France"}, {"services": ["Bogus"]},
                                    {"services": []}, {"form_type": "other"}, {"models": ["Free"]}])
    def test_invalid_422(self, kw):
        r = requests.post(f"{API}/enquiries", json=payload(**kw), timeout=20)
        assert r.status_code == 422

    @pytest.mark.parametrize("kw", [{"company_url": "http://spam.com"}, {"elapsed_ms": 1000}])
    def test_bot_dropped(self, admin_h, kw):
        p = payload(**kw)
        r = requests.post(f"{API}/enquiries", json=p, timeout=20)
        assert r.status_code in (200, 201) and r.json()["ok"] is True and "id" not in r.json()
        assert not any(e["agency"] == p["agency"] for e in _all(admin_h))


class TestAuth:
    def test_no_token_401(self):
        assert requests.get(f"{API}/enquiries", timeout=20).status_code == 401

    def test_member_403(self, member_h):
        assert requests.get(f"{API}/enquiries", headers=member_h, timeout=20).status_code == 403

    def test_me_roles(self, admin_h, member_h):
        a = requests.get(f"{API}/me", headers=admin_h, timeout=20).json()
        m = requests.get(f"{API}/me", headers=member_h, timeout=20).json()
        assert a["role"] == "admin" and m["role"] == "member"

    def test_filters(self, admin_h):
        assert all(e["form_type"] == "partner" for e in _all(admin_h, form_type="partner"))
        assert all(e["form_type"] == "rate_card" for e in _all(admin_h, form_type="rate_card"))
        assert all(e["status"] == "new" for e in _all(admin_h, status="new"))
        assert requests.get(f"{API}/enquiries", headers=admin_h, params={"status": "zzz"}, timeout=20).status_code == 422

    def test_patch(self, admin_h, member_h):
        assert CREATED, "no created enquiry"
        eid = CREATED[0]
        assert requests.patch(f"{API}/enquiries/{eid}", json={"status": "handled"}, headers=member_h, timeout=20).status_code == 403
        r = requests.patch(f"{API}/enquiries/{eid}", json={"status": "handled"}, headers=admin_h, timeout=20)
        assert r.status_code == 200 and r.json()["status"] == "handled" and r.json()["handled_at"]
        assert any(e["id"] == eid for e in _all(admin_h, status="handled"))
        r = requests.patch(f"{API}/enquiries/{eid}", json={"status": "new"}, headers=admin_h, timeout=20)
        assert r.json()["status"] == "new" and r.json()["handled_at"] is None
        assert requests.patch(f"{API}/enquiries/nope-{uuid.uuid4()}", json={"status": "handled"}, headers=admin_h, timeout=20).status_code == 404
        assert requests.patch(f"{API}/enquiries/{eid}", json={"status": "bad"}, headers=admin_h, timeout=20).status_code == 422

    def test_users(self, admin_h, member_h):
        assert requests.get(f"{API}/users", headers=member_h, timeout=20).status_code == 403
        r = requests.get(f"{API}/users", headers=admin_h, timeout=20)
        assert r.status_code == 200 and "admin" in r.json()["roles"]
        users = r.json()["users"]
        admins = [u for u in users if u["role"] == "admin"]
        if len(admins) != 1:
            pytest.skip("more than one admin; not demoting real accounts")
        r = requests.patch(f"{API}/users/{admins[0]['user_id']}/role", json={"role": "member"}, headers=admin_h, timeout=20)
        assert r.status_code == 409
        assert requests.patch(f"{API}/users/{MEMBER_ID}/role", json={"role": "superadmin"}, headers=admin_h, timeout=20).status_code == 403
        assert requests.patch(f"{API}/users/{MEMBER_ID}/role", json={"role": "member"}, headers=member_h, timeout=20).status_code == 403
