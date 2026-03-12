-- Run this in Supabase → SQL Editor → New Query → Run

-- 1. Create the strains table
CREATE TABLE IF NOT EXISTS strains (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  type TEXT CHECK (type IN ('Indica', 'Sativa', 'Hybrid')),
  thc_min FLOAT DEFAULT 0,
  thc_max FLOAT DEFAULT 0,
  cbd_min FLOAT DEFAULT 0,
  cbd_max FLOAT DEFAULT 0,
  effects TEXT[] DEFAULT '{}',
  flavors TEXT[] DEFAULT '{}',
  terpenes TEXT[] DEFAULT '{}',
  helps_with TEXT[] DEFAULT '{}',
  description TEXT DEFAULT '',
  grow_difficulty TEXT CHECK (grow_difficulty IN ('Easy', 'Moderate', 'Difficult')),
  grow_yield TEXT CHECK (grow_yield IN ('Low', 'Medium', 'High')),
  grow_height TEXT CHECK (grow_height IN ('Short', 'Average', 'Tall')),
  flowering_weeks_min INT DEFAULT 8,
  flowering_weeks_max INT DEFAULT 10,
  parents TEXT[] DEFAULT '{}',
  image_url TEXT DEFAULT '',
  rank_popularity INT DEFAULT 999,
  breeder TEXT,
  origin_region TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Indexes for fast queries
CREATE INDEX IF NOT EXISTS idx_strains_slug ON strains(slug);
CREATE INDEX IF NOT EXISTS idx_strains_type ON strains(type);
CREATE INDEX IF NOT EXISTS idx_strains_rank ON strains(rank_popularity);
CREATE INDEX IF NOT EXISTS idx_strains_effects ON strains USING GIN(effects);
CREATE INDEX IF NOT EXISTS idx_strains_terpenes ON strains USING GIN(terpenes);
CREATE INDEX IF NOT EXISTS idx_strains_helps ON strains USING GIN(helps_with);

-- 3. Full text search index (for the search bar)
ALTER TABLE strains ADD COLUMN IF NOT EXISTS search_vector TSVECTOR;
CREATE INDEX IF NOT EXISTS idx_strains_search ON strains USING GIN(search_vector);

-- Update search vector on insert/update
CREATE OR REPLACE FUNCTION strains_search_update() RETURNS TRIGGER AS $$
BEGIN
  NEW.search_vector := to_tsvector('english',
    COALESCE(NEW.name, '') || ' ' ||
    COALESCE(NEW.description, '') || ' ' ||
    COALESCE(array_to_string(NEW.effects, ' '), '') || ' ' ||
    COALESCE(array_to_string(NEW.flavors, ' '), '') || ' ' ||
    COALESCE(array_to_string(NEW.terpenes, ' '), '')
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS strains_search_trigger ON strains;
CREATE TRIGGER strains_search_trigger
  BEFORE INSERT OR UPDATE ON strains
  FOR EACH ROW EXECUTE FUNCTION strains_search_update();

-- 4. Enable Row Level Security (optional — for user features later)
ALTER TABLE strains ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Strains are publicly readable" ON strains FOR SELECT USING (true);

-- Done! Now go to supabase.com → Table Editor → strains → Import data
-- Upload the strains_all.json file as CSV (convert first) or use the import script
