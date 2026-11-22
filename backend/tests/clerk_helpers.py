# Helpers to mint Clerk session JWTs / sign-in tickets for test users (never prints the secret)
import os
import requests
from pathlib import Path


def _secret():
    key = os.environ.get("CLERK_SECRET_KEY")
    if not key:
        for line in (Path(__file__).parent.parent / ".env").read_text().splitlines():
            if line.startswith("CLERK_SECRET_KEY="):
                key = line.split("=", 1)[1].strip().strip('"')
    return key


def _h():
    return {"Authorization": f"Bearer {_secret()}", "Content-Type": "application/json", "User-Agent": "emergent-test"}


def session_jwt(user_id: str) -> str:
    s = requests.post("https://api.clerk.com/v1/sessions", json={"user_id": user_id}, headers=_h(), timeout=15)
    s.raise_for_status()
    t = requests.post(f"https://api.clerk.com/v1/sessions/{s.json()['id']}/tokens", json={}, headers=_h(), timeout=15)
    t.raise_for_status()
    return t.json()["jwt"]


def sign_in_ticket(user_id: str) -> str:
    r = requests.post("https://api.clerk.com/v1/sign_in_tokens", json={"user_id": user_id}, headers=_h(), timeout=15)
    r.raise_for_status()
    return r.json()["token"]


if __name__ == "__main__":
    import sys
    print(sign_in_ticket(sys.argv[1]))
