-- MVP leads + admin (PostgreSQL)

CREATE TABLE IF NOT EXISTS admin_users (
  id SERIAL PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  password_hash TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'lead_status') THEN
    CREATE TYPE lead_status AS ENUM (
      'NEW',
      'CONTACTED',
      'MEETING',
      'QUOTE_SENT',
      'WON',
      'LOST'
    );
  END IF;
END$$;

CREATE TABLE IF NOT EXISTS leads (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  company TEXT,
  message TEXT,
  project_type TEXT NOT NULL DEFAULT 'ecommerce',
  source TEXT,
  utm_source TEXT,
  utm_medium TEXT,
  utm_campaign TEXT,
  landing_page TEXT,
  referrer TEXT,
  diagnostic JSONB NOT NULL DEFAULT '{}'::jsonb,
  recommendation_technical TEXT NOT NULL,
  strategic_support_recommended BOOLEAN NOT NULL DEFAULT FALSE,
  status lead_status NOT NULL DEFAULT 'NEW',
  estimated_value NUMERIC(12, 2),
  final_value NUMERIC(12, 2),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_leads_status ON leads (status);
CREATE INDEX IF NOT EXISTS idx_leads_created_at ON leads (created_at DESC);
CREATE INDEX IF NOT EXISTS idx_leads_source ON leads (source);

CREATE TABLE IF NOT EXISTS lead_notes (
  id SERIAL PRIMARY KEY,
  lead_id INTEGER NOT NULL REFERENCES leads (id) ON DELETE CASCADE,
  body TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_lead_notes_lead_id ON lead_notes (lead_id);
