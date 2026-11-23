# The filing worker and its network (decision 4, revised 2026-11-23)

The worker runs the browser in the background: it opens Chromium when it picks up a filing,
with no laptop or open tab needed. One worker per filing service company in Scope 1 (each
subscriber files from its own setup); Keystone's is the first.

**What matters is not a static address.** Government portals block well-known cloud
data-center networks. A static IP rented from a cloud provider is blocked the same way, so
don't buy one on that basis. What matters per portal is whether it serves the worker's network.

| Portal | From our cloud container (2026-11-17 to -19) | Through a plain Steel session (2026-11-23) |
|---|---|---|
| NJ (formation, records, sign-in) | served | served |
| FL Sunbiz filing | served | served |
| IRS EIN assistant | refused: "Access Denied" (Akamai) | served |
| NY DOS (filing, public inquiry) | refused: connection closed | served, after its JavaScript check clears |
| Missouri | refused: Cloudflare challenge | refused: Cloudflare's check did not clear (3 sessions, one waited 60 s) |

Steel's public address changed with every session, and that was fine: no portal needs a fixed
one. NY additionally needs Keystone's logged-in service-company session (a saved sign-in, below).

**Per-portal routing.** Run the worker wherever is convenient. Send only the portals that refuse
its network another way: a Steel hosted browser (`steel`), or a proxy on a line they serve:

```
SITE_PROXIES=IRS=steel,NY=steel
```

Every other site goes direct. Missouri has no working hosted route today: file Missouri by
hand, or give it an office line (`MO=http://office:3128`) if Keystone ever has one. When a run
meets a bot check that does not clear, it stops before submitting anything and the admin is told
("Portal bot check"). The engine never solves or gets around one. `npm run probe-sites` shows
each portal through the route it would use, so it is the go/no-go check for any machine or route.

## 1. Pick the machine

Either works; the site check (step 3) decides, and the two can be combined.

- **A hosted worker (cloud VM or container) with Steel for the IRS and NY.** No office or
  always-on computer needed: NJ and FL go direct, the IRS and NY run in Steel's browsers
  (`SITE_PROXIES=IRS=steel,NY=steel`, see "Steel hosted browsers" below). No static IP needed.
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

## Steel hosted browsers

A site routed `steel` runs in a fresh Steel session per filing run (`src/browser/steel.ts`),
reached over a CDP WebSocket (`wss://connect.steel.dev`, port 443), so the worker's own network
must allow outbound WebSockets. The engine creates every session plain and says so explicitly:
no Steel proxy, no CAPTCHA solving, no fingerprint injection, no "humanized" input, no session
recording (Steel records by default), a view-only live view, a 15-minute cap (the most Keystone's
Steel plan allows; `STEEL_SESSION_TIMEOUT_MS`) and release after 5 idle minutes. Every run ends
its session when it finishes or fails.

```
STEEL_API_KEY=...                  # this worker's own key, from the deployment's secret store
SITE_PROXIES=IRS=steel,NY=steel
STEEL_PROFILES=nygov=<profile id>  # saved sign-ins, from npm run steel-login (below)
```

Give each worker its own Steel key (not the SpedReports key), so either can be rotated alone.

**Saved sign-ins.** A NY run needs a logged-in browser (Keystone's company-wide ny.gov login is
profile `nygov`; NY DOS accounts are `ny:<tenant>`). On Steel that login lives in a Steel
profile. An operator creates it once by signing in by hand in Steel's live view:

```bash
npm run steel-login -- nygov https://my.ny.gov/
```

It prints a live-view link (do not share it: it controls the browser), waits for you to sign
in, then prints the `STEEL_PROFILES` entry to add. Run it again when the login expires.

**Before real filings run through Steel.** SSNs, state logins and payment pages would pass
through Steel's browsers. Recording is off in every session the engine creates; the rest is
Keystone's to settle with Steel:

- a data processing agreement with Steel;
- how long Steel keeps session logs, downloaded files and profiles, and how to delete them;
- who in Keystone can sign in to the Steel dashboard (it can open live sessions).

## 3. Check the sites from this machine

```bash
npm ci
npm run probe-sites
```

The probe opens each portal through the worker's own browser harness and the routes in `.env`,
Steel included, so it tests exactly what a filing run would do. Every line should say `ok`; a
portal that shows a bot check, a blank page or an unexpected page is never `ok`. The probe ends
by naming any portal that isn't reachable on its current route. Give just those portals a route that works (`SITE_PROXIES`, see above), or run
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
