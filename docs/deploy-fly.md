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

Everything is in `fly.toml`. Checked before this guide was written, without a Fly account: the
browserless image builds, starts and stops cleanly; the store, queue and a filing run through
PgBouncer in transaction mode (what Neon's pooled endpoint uses); documents round-trip through an
S3-compatible store; and a local rehearsal with Fly's settings passed `tools/check-deploy.ts` on
both roles, including a real Steel session and the tenant setup in step 6.

Run the commands from a checkout of this repository on a computer with
[flyctl](https://fly.io/docs/flyctl/install/) installed, signed in to the Fly organization the
SpedReports robot uses. No command below prints a secret.

## 1. Create the app and its storage

```bash
fly apps create keystone-filing-engine
```

If that name is taken, pick another and change `app` and `WORKER_WAKE_URL` in `fly.toml` to match.

```bash
fly storage create --app keystone-filing-engine
```

This creates a private bucket and sets `BUCKET_NAME`, `AWS_ACCESS_KEY_ID`,
`AWS_SECRET_ACCESS_KEY`, `AWS_ENDPOINT_URL_S3` and `AWS_REGION` as the app's secrets.

## 2. Create the database

In Neon, create a new project for the filing engine (for example `filing-engine`) in AWS
us-east-1, next to Fly's `iad` region. Do not reuse the SpedReports project: the two systems hold
different people's data. Copy the **pooled** connection string (its host contains `-pooler`) and
make sure it ends in `?sslmode=require`. The engine creates its tables on first start.

## 3. Set the secrets

All seven are required: the API and the worker refuse to start, listing everything missing, until
they are set. `--stage` holds them for the first deploy.

Two values you paste. `read -s` asks without showing the value or saving it in shell history:

```bash
read -s DATABASE_URL && fly secrets set --stage --app keystone-filing-engine DATABASE_URL="$DATABASE_URL"
```

```bash
read -s STEEL_API_KEY && fly secrets set --stage --app keystone-filing-engine STEEL_API_KEY="$STEEL_API_KEY"
```

Use a new Steel key for this app (for example `filing-engine-worker`), not the SpedReports key.

Two values only the machines need, generated in place and never shown:

```bash
fly secrets set --stage --app keystone-filing-engine APPROVAL_SIGNING_SECRET="$(openssl rand -hex 32)" WORKER_WAKE_TOKEN="$(openssl rand -hex 32)"
```

`DATA_ENCRYPTION_KEY` seals Social Security numbers in the database. Without it they can't be read
back, so it goes into a file only you can read, then into the password manager (delete the file
after). Never change it once filings exist: rows sealed with one key can't be opened with another.

```bash
(umask 077 && openssl rand -hex 32 > ~/fe-data-key) && fly secrets set --stage --app keystone-filing-engine DATA_ENCRYPTION_KEY="$(cat ~/fe-data-key)"
```

Two keys people use: the caller key (cofile.app calls the engine with it) and the
platform staff key (tenant settings and drift reviews). Each is generated into a file only you
can read:

```bash
(umask 077 && openssl rand -hex 32 > ~/fe-api-key && openssl rand -hex 32 > ~/fe-staff-key)
```

```bash
fly secrets set --stage --app keystone-filing-engine API_KEYS="$(cat ~/fe-api-key):keystone" STAFF_API_KEYS="$(cat ~/fe-staff-key):ops@keystone"
```

The text after the staff key's colon is the name recorded on drift-review decisions; use who
holds the key. Keep both files until step 6, then move the keys to a password manager (and the
caller key to wherever the cofile.app web app keeps its secrets) and delete the files.

**On Windows PowerShell 5.1** (no `openssl`; flyctl as `.\flyctl` in its folder), one block
generates and stages the four generated secrets, saving the caller and staff keys in the home
folder encrypted with Windows DPAPI (readable only by the same Windows account on that PC):

```powershell
& {
  $rng = [Security.Cryptography.RandomNumberGenerator]::Create()
  function New-Hex { $b = New-Object byte[] 32; $rng.GetBytes($b); -join ($b | ForEach-Object { $_.ToString('x2') }) }
  $api = New-Hex; $staff = New-Hex; $data = New-Hex
  ConvertTo-SecureString $api -AsPlainText -Force | ConvertFrom-SecureString | Set-Content "$HOME\fe-api-key.dpapi"
  ConvertTo-SecureString $staff -AsPlainText -Force | ConvertFrom-SecureString | Set-Content "$HOME\fe-staff-key.dpapi"
  ConvertTo-SecureString $data -AsPlainText -Force | ConvertFrom-SecureString | Set-Content "$HOME\fe-data-key.dpapi"
  .\flyctl secrets set --stage --app keystone-filing-engine "API_KEYS=$($api):keystone" "STAFF_API_KEYS=$($staff):ops@keystone" "APPROVAL_SIGNING_SECRET=$(New-Hex)" "WORKER_WAKE_TOKEN=$(New-Hex)" "DATA_ENCRYPTION_KEY=$($data)"
  if ($LASTEXITCODE -eq 0) { 'Done: 5 secrets staged. Keys saved encrypted in your home folder.' } else { 'flyctl failed: run this block again.' }
}
```

**Email (Resend).** Not required to start, but without it nothing is emailed: approval links,
password resets and notices are only recorded on each filing. In Resend, add the sending
domain (`cofile.app`), add the DNS records it shows (SPF and DKIM) and wait
until it says Verified. Then create an API key with sending access only, and:

```bash
read -s RESEND_API_KEY && fly secrets set --stage --app keystone-filing-engine RESEND_API_KEY="$RESEND_API_KEY"
```

```bash
fly secrets set --stage --app keystone-filing-engine EMAIL_FROM="CoFile <filings@cofile.app>" WEB_BASE_URL="https://cofile.app"
```

`EMAIL_FROM` must be an address on the verified domain, and `WEB_BASE_URL` is where the web
front end runs: password-reset and log-in links in emails point there.

**Sign in with Google.** Not required to start. In Google Cloud, APIs & Services, Credentials:
create an OAuth client of type Web application, with the authorized redirect URI
`https://cofile.app/auth/google/callback` (your `PORTAL_PUBLIC_URL` plus `/auth/google/callback`).
The consent screen needs only the `openid` and `email` scopes. Set `GOOGLE_CLIENT_ID` and
`GOOGLE_CLIENT_SECRET` in the web app and the same `GOOGLE_CLIENT_ID` on the engine:

```bash
fly secrets set --stage --app keystone-filing-engine GOOGLE_CLIENT_ID=xxxx.apps.googleusercontent.com
```

It signs in existing accounts only (a Google-verified email that matches one); new firms still sign
up with the form.

**Filing by email (Resend receiving).** Not required to start. A firm's user writes to one
address with what to file; we email back a link to the form filled in from the email (read by
Claude in the web app, which needs `ANTHROPIC_API_KEY` there). Nothing is filed from an email. In
Resend: add a receiving domain (for example `in.cofile.app`) and the MX record it shows; add a
webhook to `https://<your API>/v1/inbound/email/resend` for the event `email.received` and copy
its signing secret. The same `RESEND_API_KEY` reads each message's text.

```bash
read -s RESEND_INBOUND_WEBHOOK_SECRET && fly secrets set --stage --app keystone-filing-engine RESEND_INBOUND_WEBHOOK_SECRET="$RESEND_INBOUND_WEBHOOK_SECRET" INBOUND_EMAIL_ADDRESS=file@in.cofile.app
```

Only an active firm user's own address is answered, and the answer goes to that address; anyone
else gets no reply. The email's text is sealed like SSNs and deleted after 30 days.

**Requests from Slack.** Not required to start. At api.slack.com/apps create an app (from
scratch). Under Slash Commands add `/file` with the request URL
`https://<your API>/v1/slack/command` and the hint "the filing you need, with the details". Under
OAuth & Permissions add the redirect URL `https://<your API>/v1/slack/oauth/callback` and the bot
scopes `commands`, `users:read` and `users:read.email`. Under Manage Distribution turn on public
distribution so firms can add it to their own Slack. Then:

```bash
read -s SLACK_CLIENT_SECRET && read -s SLACK_SIGNING_SECRET && fly secrets set --stage --app keystone-filing-engine SLACK_CLIENT_ID=xxxx.xxxx SLACK_CLIENT_SECRET="$SLACK_CLIENT_SECRET" SLACK_SIGNING_SECRET="$SLACK_SIGNING_SECRET"
```

A firm adds it from the "add CoFile to your Slack" link on its New filing page. A person's Slack
email must match their CoFile account; the answer is private to them.

**Requests by text and WhatsApp (Twilio).** Not required to start, and both take days to weeks
of registration. In Twilio: buy a US number and complete A2P 10DLC brand and campaign registration
for it (texting); add a WhatsApp sender (Twilio walks you through Meta's business verification).
Set the messaging webhook of both to `https://<your API>/v1/inbound/twilio` (POST). Then:

```bash
read -s TWILIO_AUTH_TOKEN && fly secrets set --stage --app keystone-filing-engine TWILIO_ACCOUNT_SID=ACxxxx TWILIO_AUTH_TOKEN="$TWILIO_AUTH_TOKEN" TWILIO_SMS_FROM=+1xxxxxxxxxx TWILIO_WHATSAPP_FROM=+1xxxxxxxxxx
```

`PUBLIC_BASE_URL` must be exactly the URL Twilio calls (it's part of Twilio's signature). People add
their mobile number under their account and confirm it with a code we text them; messages from
other numbers get no answer.

**Our registered agent service (Registered Agents, Inc.).** Partner firms can name their own
agent or use ours, which we resell; the firm is charged `REGISTERED_AGENT_ANNUAL_USD` (default $59)
per business per year on its Stripe invoices, from the year the filing is submitted until it
cancels in Billing. Set it up in the platform tenant's settings (`PUT /v1/tenants/<platform>` with
the staff key): `registeredAgentProvisioning.defaultProvisioning: "third_party"` and
`thirdParty: { provider: "registered_agents_inc", agents: { NJ: { name, address }, FL: { ... } } }`
with Registered Agents, Inc.'s agent name and office address in each state you offer. Partner
forms offer ours only in those states. Until their API is connected, every new business and every
cancellation emails `OPS_EMAIL` to place it in their portal by hand. When they share their API
documentation (ask your wholesale contact), add its order endpoint as `thirdParty.http` and the key
as `thirdParty.apiCredentialKey`: the engine then orders through the API and stops emailing.

**Subscriptions (Stripe).** Not required to start. In Stripe:

1. Products: create a product per plan (Enterprise, Partner), each with a recurring price. Copy
   each price id (`price_...`).
2. Developers, API keys: create a restricted key with write access to Customers, Checkout
   Sessions and Customer portal, and read access to Prices.
3. Developers, Webhooks: add the endpoint `https://<your API>/v1/billing/stripe-webhook` with the
   events `checkout.session.completed`, `customer.subscription.created`,
   `customer.subscription.updated`, `customer.subscription.deleted`, `customer.subscription.paused`,
   `customer.subscription.resumed`, `invoice.payment_failed` and `invoice.paid`. Copy its signing
   secret (`whsec_...`).
4. Settings, Billing, Customer portal: turn it on (card updates, invoices, cancelling).

```bash
read -s STRIPE_SECRET_KEY && read -s STRIPE_WEBHOOK_SECRET && fly secrets set --stage --app keystone-filing-engine STRIPE_SECRET_KEY="$STRIPE_SECRET_KEY" STRIPE_WEBHOOK_SECRET="$STRIPE_WEBHOOK_SECRET"
```

```bash
fly secrets set --stage --app keystone-filing-engine STRIPE_PRICE_ENTERPRISE=price_xxx STRIPE_PRICE_PARTNER=price_yyy BILLING_REQUIRED=true
```

With `BILLING_REQUIRED=true` a live filing needs the payer's subscription to be active, in a
trial, or being retried by Stripe; practice filings are always free. The platform's own filings,
and the firms an enterprise subscriber files for, are not billed separately.

**Saved cards (Basis Theory).** Not required to start. Create a Public application (permission
`token:create`) for the web app's `BASIS_THEORY_PUBLIC_KEY`, and a Private application
(permission `token:read`) for the worker:

```bash
read -s BASIS_THEORY_API_KEY && fly secrets set --stage --app keystone-filing-engine BASIS_THEORY_API_KEY="$BASIS_THEORY_API_KEY"
```

To copy a saved key to the clipboard for a password manager without showing it (then clear the
clipboard with `Set-Clipboard -Value ' '`, and delete the entry from clipboard history if it is on):

```powershell
Set-Clipboard ([Runtime.InteropServices.Marshal]::PtrToStringBSTR([Runtime.InteropServices.Marshal]::SecureStringToBSTR((Get-Content "$HOME\fe-staff-key.dpapi" | ConvertTo-SecureString))))
```

## 4. Deploy

```bash
fly deploy --app keystone-filing-engine
```

```bash
fly scale count api=1 worker=1 --app keystone-filing-engine
```

`fly status` should show one `api` and one `worker` machine. If one keeps restarting,
`fly logs` names each missing or wrong setting.

## 5. Check the deploy

On each machine (pick `api`, then run it again and pick `worker`):

```bash
fly ssh console --app keystone-filing-engine --select -C "node --import tsx tools/check-deploy.ts"
```

It checks the settings, the database, the object storage, the Steel key (worker: opens one
session and releases it at once) and that the API can reach and wake the worker. Every line
should say `ok` or `note`. A failed wake means `WORKER_WAKE_URL` does not match the app: filings
still run, at the worker's next 10-minute check.

## 6. Set up the tenant

Only the staff key creates a tenant; the caller key then adds client companies:

```bash
curl -fsS -X PUT https://keystone-filing-engine.fly.dev/v1/tenants/keystone -H "x-api-key: $(cat ~/fe-staff-key)" -H "content-type: application/json" -d '{"name":"CoFile"}'
```

```bash
curl -fsS -X PUT https://keystone-filing-engine.fly.dev/v1/client-companies/keystone-direct -H "x-api-key: $(cat ~/fe-api-key)" -H "content-type: application/json" -d '{"name":"CoFile direct clients","einMode":"in_run"}'
```

The full settings (organizer, filer, registered agents, webhook endpoints, admin channels) go
through the same two routes; `src/settings/schema.ts` lists every field.

## 7. Portals and saved sign-ins

From the worker machine, check every portal through Steel's full browser connection (the first
time it is exercised end to end):

```bash
fly ssh console --app keystone-filing-engine --select -C "node --import tsx tools/probe-sites.ts"
```

Every line should say `ok` except Missouri, whose bot check does not clear on Steel (file
Missouri by hand). Then save each logged-in account (docs/fixed-ip-machine.md, "Saved sign-ins"):

```bash
fly ssh console --app keystone-filing-engine --select --pty -C "node --import tsx tools/steel-login.ts nygov:keystone https://my.ny.gov/"
```

Open the link it prints, sign in, press Enter, and repeat for `ny:keystone` and `nj:keystone`.
Then set every printed entry at once:

```bash
fly secrets set --app keystone-filing-engine STEEL_PROFILES="nygov:keystone=<profile id>,ny:keystone=<profile id>,nj:keystone=<profile id>"
```

## 8. First dry run

Create an `ein_only` filing through the API with the caller key and approve it. Until the web
address is decided, open the approval link with its host replaced by
`keystone-filing-engine.fly.dev`. `DRY_RUN_DEFAULT=true`: the run fills the whole IRS interview
and stops before "Submit EIN Request".

Use a real client's details, with their consent. The IRS assistant receives each page as the
interview advances; only the final submission is skipped. Never use made-up identities.

## 9. The engine's web address (api.cofile.app)

```bash
fly certs add api.cofile.app --app keystone-filing-engine
```

Add the DNS record that command shows, then:

```bash
fly secrets set --app keystone-filing-engine PUBLIC_BASE_URL=https://api.cofile.app
```

Links sent from then on use the new address.

## Running it

- **Deploys** replace the worker only after the filing in progress finishes (up to 5 minutes,
  `kill_timeout`). A run still going after that is marked interrupted and reported, never
  re-run on its own. The API stops at once.
- **Idle cost.** The worker checks the database every 10 minutes when idle, so the Neon project
  can scale to zero in between; the API wakes it the moment a filing is queued. The API itself
  stops when no one is using it; webhook retries then wait until it next starts.
- **Before real filings**, the Steel checklist in docs/fixed-ip-machine.md applies (data
  processing agreement, retention, dashboard access), and the same questions apply to Neon and
  Fly's object storage, which hold filing data too.
