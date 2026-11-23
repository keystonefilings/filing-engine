# Deploying on Fly.io with Neon and Steel

Keystone's layout (2026-11-23): the filing engine runs on Fly.io beside the SpedReports robot,
with every portal's browser on Steel. Steel hosts browsers only; Fly runs the program.

| Piece | Where | Notes |
|---|---|---|
| API (approval pages, webhooks, client API) | Fly, process group `api` | public over HTTPS; stops when idle, starts on the next request |
| Worker (runs filings) | Fly, process group `worker` | always on, no public port; woken by the API over Fly's private network |
| Browsers | Steel | one fresh plain session per filing run (docs/fixed-ip-machine.md, "Steel hosted browsers") |
| Database | Neon (its own project) | pooled connection string; **not** the SpedReports database |
| Documents and screenshots | Fly object storage (Tigris) | shared by the API and the worker, kept across deploys |

Everything is in `fly.toml`. Checked before this guide was written: the browserless image builds
and starts, and the store, queue and a filing run cleanly through PgBouncer in transaction mode
(what Neon's pooled endpoint uses) with protocol-level prepared statements off.

Run the commands below from a checkout of this repository on a computer with
[flyctl](https://fly.io/docs/flyctl/install/) installed, signed in to the Fly organization the
SpedReports robot uses. None of the commands below print a secret.

## 1. Create the app and its storage

```bash
fly apps create keystone-filing-engine
```

If that name is taken, pick another and change `app` and `WORKER_WAKE_URL` in `fly.toml` to match.

```bash
fly storage create --app keystone-filing-engine
```

This creates a private bucket and sets `BUCKET_NAME`, `AWS_ACCESS_KEY_ID`,
`AWS_SECRET_ACCESS_KEY`, `AWS_ENDPOINT_URL_S3` and `AWS_REGION` as the app's secrets, which the
engine picks up on its own.

## 2. Create the database

In Neon, create a new project for the filing engine (for example `filing-engine`) in AWS
us-east-1, next to Fly's `iad` region. Do not reuse the SpedReports project: the two systems hold
different people's data and must not share a database. Copy the **pooled** connection string (its
host contains `-pooler`) and make sure it ends in `?sslmode=require`. The engine creates its
tables on first start.

## 3. Set the secrets

Each `read -s` asks for a value without showing it or saving it in shell history; paste it and
press Enter.

```bash
read -s DATABASE_URL && fly secrets set --stage --app keystone-filing-engine DATABASE_URL="$DATABASE_URL"
```

```bash
read -s STEEL_API_KEY && fly secrets set --stage --app keystone-filing-engine STEEL_API_KEY="$STEEL_API_KEY"
```

Use a new Steel key for this app (for example `filing-engine-worker`), not the SpedReports key.

```bash
fly secrets set --stage --app keystone-filing-engine APPROVAL_SIGNING_SECRET="$(openssl rand -hex 32)" WORKER_WAKE_TOKEN="$(openssl rand -hex 32)"
```

The caller API key is also needed by whatever calls the engine (keystonefilings.com), so generate
it into a file only you can read, set it, and store it where that caller keeps its secrets:

```bash
(umask 077 && openssl rand -hex 32 > ~/filing-engine-api-key.txt) && fly secrets set --stage --app keystone-filing-engine API_KEYS="$(cat ~/filing-engine-api-key.txt):keystone"
```

Delete `~/filing-engine-api-key.txt` once the key is stored with the caller. Optional:
`PLATFORM_STAFF_KEYS` (same form, no tenant) opens the drift-review routes.

## 4. Deploy

```bash
fly deploy --app keystone-filing-engine
```

```bash
fly scale count api=1 worker=1 --app keystone-filing-engine
```

The worker refuses to start, and says why in `fly logs`, if a setting is missing or would fail
every run (for example no `STEEL_API_KEY`). `fly status` should show one `api` and one `worker`
machine; the API answers at `https://keystone-filing-engine.fly.dev/healthz`.

## 5. Check the portals from the worker

```bash
fly ssh console --app keystone-filing-engine --select -C "node --import tsx tools/probe-sites.ts"
```

Pick the `worker` machine. Every line should say `ok` except Missouri, whose bot check does not
clear on Steel (file Missouri by hand). This is the first run through Steel's full browser
connection, which the development container could not open.

## 6. Save the sign-ins

For each logged-in account (docs/fixed-ip-machine.md, "Saved sign-ins"), on the worker machine:

```bash
fly ssh console --app keystone-filing-engine --select --pty -C "node --import tsx tools/steel-login.ts nygov https://my.ny.gov/"
```

Open the link it prints, sign in, press Enter, then add every printed entry, comma separated:

```bash
fly secrets set --app keystone-filing-engine STEEL_PROFILES="nygov=<profile id>,ny:keystone=<profile id>,nj:keystone=<profile id>"
```

## 7. First dry run

Create an `ein_only` filing through the API with the caller key and approve it. Until the web
address is decided, open the approval link with its host replaced by
`keystone-filing-engine.fly.dev`. `DRY_RUN_DEFAULT=true`, so the run fills the whole IRS interview
and stops before "Submit EIN Request". Check `fly logs` and the run's screenshots
(`GET /v1/filings/<id>`).

## 8. When the web address is decided

```bash
fly certs add filings.keystonefilings.com --app keystone-filing-engine
```

Add the DNS record that command shows, then:

```bash
fly secrets set --app keystone-filing-engine PUBLIC_BASE_URL=https://filings.keystonefilings.com
```

Links sent from then on use the new address.

## Running it

- **Deploys** replace the worker only after the filing in progress finishes (up to 5 minutes;
  `kill_timeout`). A run still going after that is marked interrupted and reported, never
  re-run on its own.
- **Idle cost.** The worker checks the database every 10 minutes when idle, so a Neon project
  can scale to zero in between; the API wakes it the moment a filing is queued. The API itself
  stops when no one is using it. Webhook retries then wait until it next starts.
- **Before real filings**, the Steel checklist in docs/fixed-ip-machine.md applies (data
  processing agreement, retention, dashboard access), and the same questions apply to Neon and
  Fly's object storage, which hold filing data too.
