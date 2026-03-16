#!/usr/bin/env python3
"""
Call this after adding new strains to Supabase.
Usage: python3 revalidate_strains.py slug-one slug-two slug-three
"""
import sys, requests, os

SITE_URL = "https://strainhub.org"
SECRET = os.environ.get("REVALIDATE_SECRET", "strainhub_rev_2026_xBz!")

slugs = sys.argv[1:] if len(sys.argv) > 1 else []
if not slugs:
    print("Usage: python3 revalidate_strains.py <slug1> <slug2> ...")
    sys.exit(1)

print(f"Revalidating {len(slugs)} pages...")
r = requests.post(
    f"{SITE_URL}/api/revalidate",
    json={"secret": SECRET, "slugs": slugs},
    timeout=30
)
data = r.json()
print(f"✅ Revalidated: {data.get('revalidated', [])}")
if data.get("errors"):
    print(f"❌ Errors: {data.get('errors')}")
