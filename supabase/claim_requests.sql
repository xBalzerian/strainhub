-- Run this in Supabase SQL Editor: https://supabase.com/dashboard/project/bfzcjunuuxzhqafuljlh/sql/new

CREATE TABLE IF NOT EXISTS public.claim_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  seedbank_name TEXT NOT NULL,
  seedbank_slug TEXT,
  contact_name TEXT NOT NULL,
  contact_email TEXT NOT NULL,
  contact_phone TEXT,
  website TEXT,
  message TEXT,
  request_type TEXT DEFAULT 'claim' CHECK (request_type IN ('claim', 'new_listing', 'promo', 'event')),
  promo_title TEXT,
  promo_description TEXT,
  promo_discount TEXT,
  promo_expires_at DATE,
  event_title TEXT,
  event_description TEXT,
  event_date DATE,
  event_url TEXT,
  banner_url TEXT,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected', 'contacted')),
  admin_notes TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_claim_requests_status ON public.claim_requests(status);
CREATE INDEX IF NOT EXISTS idx_claim_requests_slug ON public.claim_requests(seedbank_slug);
ALTER TABLE public.claim_requests ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public insert" ON public.claim_requests FOR INSERT WITH CHECK (true);
