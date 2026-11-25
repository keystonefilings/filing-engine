# Scope

The work is two products on one engine.

## Scope 1: the platform (enterprise subscription for filing service companies)

Sold to filing service companies. Each subscriber runs its own business on it and is
independent of every other subscriber, Keystone included. A subscriber:

- answers the **service company questionnaire** (`docs/onboarding/service-company.md`);
- connects **its own state logins** (NJ, ny.gov service-company account, NY drawdown),
  its own registered agent service and its own people (organizer, filer, signer);
- plugs the API into **its own channels**: its website (API + webhooks), Slack, WhatsApp,
  email, SMS;
- has its own customers, who answer the **customer questionnaire**
  (`docs/onboarding/customer-firm.md`) inside the subscriber's product, under the
  subscriber's brand, with defaults and locked questions the subscriber chooses.

## Scope 2: Keystone's own front end

Keystone is one subscriber of the platform. On top of it Keystone builds a front end for
**CPAs, title companies and payroll companies**. Each of those customers answers the
customer questionnaire and chooses per question G1 whether filings run on **their own
state logins** or on **Keystone's accounts**.

## Levels and who owns what

| Level | In the code | Owns |
|---|---|---|
| Platform (the software vendor) | config | site adapters, drift review of changed government forms, the site check, deployment images |
| Service company (subscriber) | `TenantSettings` | its state logins (vault, scoped to it), registered agent service, organizer/filer/signer, branding, channels, webhooks, API keys, defaults and locks for its customers' answers, its worker machine and fixed IP |
| Customer firm (CPA, title, payroll) | `ClientCompanySettings` | its questionnaire answers, its approvers, optionally its own state logins (G1 = own account) |
| Entity being filed | filing request + `intake` | names, owners, addresses, responsible party |

Isolation rules the engine enforces:

- Vault keys are scoped `tenant/key` and `tenant/firm/key`; one subscriber's logins can
  never be used for another's filing.
- Jobs carry the tenant; a subscriber's own worker (its own fixed IP) sets
  `WORKER_TENANTS` and claims only its own jobs.
- Approval pages show the subscriber's name and support contact, never the platform's.
- Customer firms belong to exactly one subscriber; API keys map to one subscriber.

Shared on purpose: the site adapters and their approved form snapshots. When a state
changes a form, the platform reviews the drift once for every subscriber.

## What is built today, by scope

| Piece | Scope 1 | Scope 2 |
|---|---|---|
| Engine, adapters (NJ formation and standing certificates: dry run; NY, IRS: pending walks) | yes | uses it |
| API + signed webhooks | yes | uses it |
| Approval links | yes (branded per subscriber) | uses it |
| Questionnaires as settings, defaults, locks, provenance | yes | uses it |
| Channel delivery (email, Slack, WhatsApp, SMS) | settings only; delivery module not built | |
| Subscriber self-service: API keys, webhooks, usage, firm portals, payment routing, portal defaults, team (web/dashboard) | yes (draft); accounts created by staff after the contact form; card and login vault, roles and billing not built | |
| Landing page, email log-in, partner sign-up and setup guide (web/, web/signup, web/p/<slug>/setup) | | yes (draft); approval required unless PARTNER_SIGNUP_MODE=automatic; cards connect once the vault is chosen |
| API docs site (web/docs, OpenAPI) | yes (draft) | uses it |
| White-label firm portal for CPAs / title / payroll companies (web/p) | | yes (draft); filings are dry runs unless PORTAL_LIVE_FILINGS=true |
| NY PDF upload filings (DOS-1335-f, DOS-1338-f) with saved signatures | yes (dry run) | uses it |

## Open naming question

Webhook headers are named `X-Keystone-*`. If the platform is sold under another name,
rename them before the first outside subscriber integrates.
