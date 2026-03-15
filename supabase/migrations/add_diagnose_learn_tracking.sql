-- Add diagnose and learn_views tracking columns to profiles
ALTER TABLE profiles
  ADD COLUMN IF NOT EXISTS diagnose_today integer NOT NULL DEFAULT 0,
  ADD COLUMN IF NOT EXISTS diagnose_date date,
  ADD COLUMN IF NOT EXISTS learn_views_today integer NOT NULL DEFAULT 0,
  ADD COLUMN IF NOT EXISTS learn_views_date date;
