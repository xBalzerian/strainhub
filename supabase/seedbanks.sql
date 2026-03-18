-- Seedbanks table migration
-- Run this in your Supabase SQL editor at: https://supabase.com/dashboard/project/bfzcjunuuxzhqafuljlh/sql

CREATE TABLE IF NOT EXISTS public.seedbanks (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  country TEXT CHECK (country IN ('USA', 'Canada')),
  state_province TEXT,
  city TEXT,
  founded_year INTEGER,
  website TEXT,
  description TEXT,
  short_bio TEXT,
  logo_url TEXT,
  notable_strains TEXT[] DEFAULT '{}',
  seed_types TEXT[] DEFAULT '{}',
  shipping_regions TEXT[] DEFAULT '{}',
  payment_methods TEXT[] DEFAULT '{}',
  rating NUMERIC(3,1),
  review_count INTEGER DEFAULT 0,
  reviews JSONB DEFAULT '[]',
  social_instagram TEXT,
  social_twitter TEXT,
  is_verified BOOLEAN DEFAULT false,
  is_active BOOLEAN DEFAULT true,
  rank_popularity INTEGER,
  faq JSONB DEFAULT '[]',
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_seedbanks_slug ON public.seedbanks(slug);
CREATE INDEX IF NOT EXISTS idx_seedbanks_country ON public.seedbanks(country);
CREATE INDEX IF NOT EXISTS idx_seedbanks_rank ON public.seedbanks(rank_popularity);

-- Public read access (no auth required for listing page)
ALTER TABLE public.seedbanks ENABLE ROW LEVEL SECURITY;
CREATE POLICY IF NOT EXISTS "Public read" ON public.seedbanks FOR SELECT USING (true);
