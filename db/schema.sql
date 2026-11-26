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

create table if not exists name_resolutions (
  id uuid primary key,
  filing_id uuid not null references filings (id),
  status text not null,
  token text not null,
  doc jsonb not null
);

create table if not exists review_gates (
  id uuid primary key,
  filing_id uuid not null references filings (id),
  status text not null,
  token text not null,
  doc jsonb not null
);

create table if not exists messages (
  id uuid primary key,
  filing_id uuid not null references filings (id),
  status text not null,
  doc jsonb not null,
  created_at timestamptz not null default now()
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

-- Run leases: the worker running a filing renews its lease; recovery touches only filings
-- whose lease lapsed (the worker stopped), never one another live worker is still running.
create table if not exists run_leases (
  filing_id uuid primary key,
  worker_id text not null,
  token text not null,
  acquired_at timestamptz not null,
  expires_at timestamptz not null
);
-- Dry-run previews are a property of the queued job, never of the approved request.
alter table jobs add column if not exists dry_run boolean not null default false;

-- Self-service tenant API keys: only the SHA-256 of each key is kept.
create table if not exists tenant_api_keys (
  id uuid primary key,
  tenant_id text not null,
  hash text not null unique,
  revoked_at timestamptz,
  created_at timestamptz not null default now(),
  doc jsonb not null
);
create index if not exists tenant_api_keys_tenant_idx on tenant_api_keys (tenant_id);
create index if not exists client_companies_tenant_idx on client_companies (tenant_id);

-- Saved signatures for paper-upload forms. The PNG is AES-256-GCM sealed with SIGNATURE_KEY (never in the
-- database); revoking deletes the sealed image and keeps the record for the audit trail.
create table if not exists signatures (
  id uuid primary key,
  tenant_id text not null,
  client_company_id text not null,
  revoked_at timestamptz,
  created_at timestamptz not null default now(),
  doc jsonb not null
);
create index if not exists signatures_company_idx on signatures (tenant_id, client_company_id);

-- Dashboard sign-in (src/users): enterprise staff and partner firms' staff. Only an scrypt hash of each
-- password is kept. Partner sign-ups wait here with status 'pending' until approved.
create table if not exists users (
  id uuid primary key,
  email text not null unique,
  tenant_id text not null,
  created_at timestamptz not null default now(),
  doc jsonb not null
);
create index if not exists users_tenant_idx on users (tenant_id);

-- Portal logins (V29): sealed with AES-256-GCM (DATA_ENCRYPTION_KEY) before they reach this table.
create table if not exists vault_secrets (
  key text primary key,
  tenant_id text not null,
  sealed text not null,
  updated_at timestamptz not null default now()
);

-- V40: filing requests firms email in (text sealed under DATA_ENCRYPTION_KEY, purged with SSNs).
create table if not exists inbound_messages (
  id uuid primary key,
  tenant_id text not null,
  client_company_id text not null,
  provider_id text not null unique,
  received_at timestamptz not null,
  doc jsonb not null
);

-- V33: each paying account's Stripe subscription (apart from settings, which approvals are bound to).
create table if not exists billing_accounts (
  id text primary key,
  tenant_id text not null,
  customer_id text unique,
  updated_at timestamptz not null default now(),
  doc jsonb not null
);

-- Client links (V26): one link, one client, one filing; listed and revocable by the firm.
create table if not exists intake_links (
  id text primary key,
  tenant_id text not null,
  client_company_id text not null,
  created_at timestamptz not null default now(),
  doc jsonb not null
);
create index if not exists intake_links_company_idx on intake_links (client_company_id, created_at desc);

-- Enterprise contact-form requests from the landing page.
create table if not exists inquiries (
  id uuid primary key,
  created_at timestamptz not null default now(),
  doc jsonb not null
);
