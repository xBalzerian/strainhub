-- StrainHub Articles table
-- Run this in Supabase SQL Editor: https://supabase.com/dashboard/project/bfzcjunuuxzhqafuljlh/sql/new

CREATE TABLE IF NOT EXISTS public.articles (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  title text NOT NULL,
  slug text UNIQUE NOT NULL,
  category text NOT NULL DEFAULT 'News',
  summary text,
  content text,
  hero_image_url text,
  thumbnail_url text,
  tags text[] DEFAULT '{}',
  related_strains text[] DEFAULT '{}',
  related_seedbanks text[] DEFAULT '{}',
  faq jsonb DEFAULT '[]',
  reactions jsonb DEFAULT '{"fire":0,"heart":0,"laugh":0,"wow":0,"thumbs":0}',
  views integer DEFAULT 0,
  reading_time integer DEFAULT 5,
  seo_title text,
  seo_description text,
  is_published boolean DEFAULT true,
  published_at timestamptz DEFAULT now(),
  author_name text DEFAULT 'Angelica M.',
  author_title text DEFAULT 'Cannabis Enthusiast'
);

CREATE INDEX IF NOT EXISTS articles_slug_idx ON articles(slug);
CREATE INDEX IF NOT EXISTS articles_category_idx ON articles(category);
CREATE INDEX IF NOT EXISTS articles_published_idx ON articles(published_at DESC);
