-- Devis / factures (MVP lean)

DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'document_type') THEN
    CREATE TYPE document_type AS ENUM ('QUOTE', 'INVOICE');
  END IF;
END$$;

DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'document_status') THEN
    CREATE TYPE document_status AS ENUM (
      'DRAFT',
      'SENT',
      'ACCEPTED',
      'REJECTED',
      'PAID',
      'CANCELLED'
    );
  END IF;
END$$;

CREATE TABLE IF NOT EXISTS document_counters (
  year INTEGER NOT NULL,
  type document_type NOT NULL,
  last_number INTEGER NOT NULL DEFAULT 0,
  PRIMARY KEY (year, type)
);

CREATE TABLE IF NOT EXISTS documents (
  id SERIAL PRIMARY KEY,
  type document_type NOT NULL,
  number TEXT NOT NULL UNIQUE,
  lead_id INTEGER REFERENCES leads (id) ON DELETE SET NULL,
  source_quote_id INTEGER REFERENCES documents (id) ON DELETE SET NULL,
  status document_status NOT NULL DEFAULT 'DRAFT',
  client_name TEXT NOT NULL,
  client_email TEXT NOT NULL,
  client_company TEXT,
  client_address TEXT,
  subtotal_ht NUMERIC(12, 2) NOT NULL DEFAULT 0,
  tax_rate NUMERIC(5, 2) NOT NULL DEFAULT 20,
  tax_amount NUMERIC(12, 2) NOT NULL DEFAULT 0,
  total_ttc NUMERIC(12, 2) NOT NULL DEFAULT 0,
  currency TEXT NOT NULL DEFAULT 'EUR',
  valid_until DATE,
  due_date DATE,
  notes TEXT,
  sent_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_documents_type ON documents (type);
CREATE INDEX IF NOT EXISTS idx_documents_status ON documents (status);
CREATE INDEX IF NOT EXISTS idx_documents_lead_id ON documents (lead_id);
CREATE INDEX IF NOT EXISTS idx_documents_created_at ON documents (created_at DESC);

CREATE TABLE IF NOT EXISTS document_lines (
  id SERIAL PRIMARY KEY,
  document_id INTEGER NOT NULL REFERENCES documents (id) ON DELETE CASCADE,
  label TEXT NOT NULL,
  quantity NUMERIC(12, 2) NOT NULL DEFAULT 1,
  unit_price_ht NUMERIC(12, 2) NOT NULL DEFAULT 0,
  position INTEGER NOT NULL DEFAULT 0
);

CREATE INDEX IF NOT EXISTS idx_document_lines_document_id ON document_lines (document_id);

CREATE TABLE IF NOT EXISTS document_emails (
  id SERIAL PRIMARY KEY,
  document_id INTEGER NOT NULL REFERENCES documents (id) ON DELETE CASCADE,
  to_email TEXT NOT NULL,
  sent_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  ok BOOLEAN NOT NULL DEFAULT FALSE,
  error TEXT
);

CREATE INDEX IF NOT EXISTS idx_document_emails_document_id ON document_emails (document_id);
