-- Keystone filing engine: Postgres schema. Records are JSONB documents with the
-- columns the engine queries on. Sensitive values (responsible-party SSN) live only
-- in filings.doc until the purge job clears them after completion.
create table if not exists filings (
  id uuid primary key,
  tenant_id text not null,
  client_company_id text not null,
  idempotency_key text not null,
  status text not null,
  payload_hash text not null,
  doc jsonb not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (tenant_id, idempotency_key)
);
create index if not exists filings_status_idx on filings (status);

create table if not exists approvals (
  id uuid primary key,
  filing_id uuid not null references filings (id),
  status text not null,
  token text not null unique,
  expires_at timestamptz not null,
  doc jsonb not null
);

create table if not exists runs (
  id uuid primary key,
  filing_id uuid not null references filings (id),
  status text not null,
  doc jsonb not null
);

create table if not exists submit_intents (
  id uuid primary key,
  run_id uuid not null,
  filing_id uuid not null references filings (id),
  outcome text,
  doc jsonb not null
);
create index if not exists submit_intents_open_idx on submit_intents (outcome) where outcome is null;

create table if not exists drift_halts (
  id uuid primary key,
  filing_id uuid not null references filings (id),
  site text not null,
  screen_key text not null,
  status text not null,
  doc jsonb not null
);

create table if not exists approved_snapshots (
  site text not null,
  screen_key text not null,
  doc jsonb not null,
  updated_at timestamptz not null default now(),
  primary key (site, screen_key)
);

create table if not exists intent_overrides (
  site text not null,
  screen_key text not null,
  doc jsonb not null,
  primary key (site, screen_key)
);

create table if not exists tenants (id text primary key, doc jsonb not null);
create table if not exists client_companies (id text primary key, tenant_id text not null, doc jsonb not null);

create table if not exists webhook_deliveries (
  id uuid primary key,
  filing_id uuid not null,
  status text not null,
  next_attempt_at timestamptz not null,
  doc jsonb not null
);
create index if not exists webhook_due_idx on webhook_deliveries (next_attempt_at) where status = 'pending';

create table if not exists jobs (
  id bigserial primary key,
  kind text not null,
  filing_id uuid,
  enqueued_at timestamptz not null default now(),
  taken_at timestamptz,
  taken_by text,
  done_at timestamptz
);
-- Columns added after the first schema version (idempotent for existing databases).
alter table jobs add column if not exists taken_by text;
alter table jobs add column if not exists done_at timestamptz;
-- Platform: a service company's own worker claims only its own jobs.
alter table jobs add column if not exists tenant_id text;
create index if not exists jobs_open_idx on jobs (id) where taken_at is null;
