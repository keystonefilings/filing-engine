# The filing worker and its network (decision 4, revised 2026-11-19)

The worker runs the browser in the background: it opens Chromium when it picks up a filing,
with no laptop or open tab needed. One worker per filing service company in Scope 1 (each
subscriber files from its own setup); Keystone's is the first.

**What matters is not a static address.** Government portals block well-known cloud
data-center networks. A static IP rented from a cloud provider is blocked the same way, so
don't buy one on that basis. What matters per portal is whether it serves the worker's network.
From our cloud container (checked 2026-11-17, -18 and -19):

| Portal | From a cloud data-center network |
|---|---|
| NJ (formation, records, sign-in) | served |
| FL Sunbiz filing | served |
| IRS EIN assistant | refused: "Access Denied" (Akamai) |
| NY DOS | refused: connection closed |
| Missouri | refused: Cloudflare challenge |

A different hosted browser reached the IRS Identity screen, so this depends on whose network
the worker is on. Test before paying for anything. NY additionally needs Keystone's logged-in
service-company session. A stable address helps that account look consistent, but isn't required.

**Per-portal routing.** Run the worker wherever is convenient. Send only the portals that refuse
its network out a route they serve (an office line, or a host whose network passes the check):

```
SITE_PROXIES=IRS=http://office:3128,NY=http://office:3128,MO=http://office:3128
```

Every other site goes direct. `npm run probe-sites` shows each portal through the route it
would use, so it is the go/no-go check for any machine or route.

## 1. Pick the machine

Either works; the site check (step 3) decides, and the two can be combined.

- **A hosted worker (cloud VM or container).** Simplest to run, and NJ and FL work from it
  today. No static IP needed. If the probe says the IRS, NY or Missouri refuse it, route just
  those portals through the office line with `SITE_PROXIES`.
- **A small always-on computer at the office** on the office internet line. An ordinary
  business connection, so it is the likeliest to pass the IRS and NY on its own.

Needs: Docker, 2 CPU, 4 GB RAM, 20 GB disk, US location.

## 2. Install

```bash
git clone https://github.com/keystonefilings/filing-engine && cd filing-engine
cp .env.example .env    # then edit .env on this machine
```

In `.env`, set at least `POSTGRES_PASSWORD`, `API_KEYS`, `APPROVAL_SIGNING_SECRET`,
`PUBLIC_BASE_URL` (the https address approval links will use), `WORKER_TENANTS` (the
service company this machine files for, e.g. `keystone`), and that company's NJ and NY
logins, scoped by its tenant id:

```
WORKER_TENANTS=keystone
VAULT_KEYSTONE_NJ_USERNAME=...
VAULT_KEYSTONE_NJ_PASSWORD=...
VAULT_KEYSTONE_NJ_TOTP_SEED=...      # only if the account uses an authenticator app
VAULT_KEYSTONE_MO_USERNAME=...
VAULT_KEYSTONE_MO_PASSWORD=...
VAULT_KEYSTONE_MO_TOTP_SEED=...     # only if the account uses an authenticator app
VAULT_KEYSTONE_NYGOV_USERNAME=...
VAULT_KEYSTONE_NYGOV_PASSWORD=...
VAULT_KEYSTONE_NYGOV_TOTP_SEED=...   # only if the ny.gov account uses an authenticator app
```

Type these on the machine. Do not send them by chat or email, and do not commit `.env`.

## 3. Check the sites from this machine

```bash
npm ci
npm run probe-sites
```

Every line should say `ok`. The probe ends by naming any portal that isn't reachable on its
current route. Give just those portals a route that works (`SITE_PROXIES`, see above), or run
the worker on the other option in step 1, and run the probe again.

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
