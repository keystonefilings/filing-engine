# The fixed-IP machine (decision 4)

From the cloud on 2026-11-17 the IRS EIN assistant answered "Access Denied" and NY DOS
closed every connection. Both filings therefore run from one machine with a fixed,
non-data-center-looking US address. NJ works from anywhere.

## 1. Pick the machine

Either works; the site check (step 3) decides.

- **A small always-on computer at the office** on the office internet line. Most likely
  to pass the IRS and NY, since it is an ordinary business connection.
- **A small cloud VM with a static IP.** Cheaper to run, but cloud addresses are what the
  IRS and NY refused here. Try it with step 3 before committing to it.

Needs: Docker, 2 CPU, 4 GB RAM, 20 GB disk, US location.

## 2. Install

```bash
git clone https://github.com/keystonefilings/filing-engine && cd filing-engine
cp .env.example .env    # then edit .env on this machine
```

In `.env`, set at least `POSTGRES_PASSWORD`, `API_KEYS`, `APPROVAL_SIGNING_SECRET`,
`PUBLIC_BASE_URL` (the https address approval links will use), and the NY login:

```
VAULT_NYGOV_USERNAME=...
VAULT_NYGOV_PASSWORD=...
VAULT_NYGOV_TOTP_SEED=...   # only if the ny.gov account uses an authenticator app
```

Type these on the machine. Do not send them by chat or email, and do not commit `.env`.

## 3. Check the sites from this machine

```bash
npm ci
npm run probe-sites
```

Every line should say `ok`. If the IRS or NY says `blocked`, this machine cannot file
there; try the other option in step 1.

## 4. Run

```bash
docker compose up -d --build
```

The API listens on 127.0.0.1:8080. Put an HTTPS reverse proxy in front of it (for
example Caddy: `reverse_proxy 127.0.0.1:8080`) so clients can open approval links.
`DRY_RUN_DEFAULT=true` stays on until each adapter is marked complete.

## 5. After a restart

The worker settles anything it was in the middle of: a submit that may have gone out is
marked `needs_reconciliation`, a run that never reached submission is marked `failed`.
Nothing is re-run automatically; a person re-queues it.
