# Keystone filing engine

API + webhook service whose worker drives government filing sites live. See `docs/plan-review.md` for the plan, decisions and walk checklists, and `docs/filing-auto-fill-mapping.md` for the field map from the Nov 14 walk.

## Layout
- `src/domain` canonical filing request, name model (NJ: base name + designator; NY/IRS: full name), per-state validation, lifecycle states, webhook event catalog
- `src/settings` tenant and client-company settings, settings snapshot/hash, vault interface (secrets fetched at run time)
- `src/approvals` pre-run link approval (decision 2): signed single-use token, payload hash binding, masked review page
- `src/webhooks` signed deliveries with backoff and dead-letter
- `src/resolver` live page -> field inventory (labels, required flags, options, prices), label-based intent matching, drift detection
- `src/drift-review` halt records, mapping proposals, reviewer decisions (decision 6)
- `src/fees` fee table (`config/fees.json`) and live fee check (decision 5)
- `src/orchestrator` queue, per-site/per-account concurrency, pre-flight, run executor, filing service
- `src/browser` Playwright harness, step recorder, submit guard (dry run) and error types
- `src/adapters` per-site screen sequences expressed as field intents, never selectors: `nj-formation`, `nj-standing`, `fl-formation` (live dry runs pass; real runs wait for the final payment walk), `ny-formation` and `irs-ein` (mapped from the Nov 18 walk), `mo-formation` (from the state guide)
- `tools/` walk recorder and site check
- `src/api` Fastify routes; `src/index.ts` cloud tier; `src/worker.ts` fixed-IP worker tier
- `fixtures/` wizard replicas for development and tests; `db/schema.sql` Postgres schema

## Run
```bash
cp .env.example .env
npm run dev          # API on :8080 with in-process worker (dry-run default)
npm run fixtures     # NJ wizard replica on :4310
npm test
```
Point the NJ adapter at the replica with `NJ_FORMATION_URL=http://127.0.0.1:4310/nj-formation/welcome.html`.

## Deployment and walks
- `docs/deploy-fly.md`: Keystone's deployment on Fly.io with a Neon database, Fly object storage and every browser on Steel.
- `docs/fixed-ip-machine.md`: which portals serve which network, Steel setup and saved sign-ins, and other layouts (a single machine with docker compose); `npm run probe-sites` checks the routes.
- `docs/walks/HOW-TO-RUN-THE-WALKS.md`: `npm run walk -- <name> --url <start>` records a person-driven walk and blocks Pay/Submit.
- `docs/walks/CHATGPT-WALK-INSTRUCTIONS.md`: hand this to an assistant helping on a person's computer; it ends with a fixed report format.
- `docs/walks/2026-11-17.md`: what the Nov 17 walks found.
- `docs/scope.md`: the two products (Scope 1 platform for filing service companies; Scope 2 Keystone's front end for CPAs, title and payroll companies) and the four levels.
- `docs/onboarding/service-company.md`: what a filing service company answers when it subscribes (its accounts, people, channels, defaults and locks for its customers).
- `site/landing.html`: the platform landing page (published as a private Claude page; editable design in the Figma file "Filing Engine — Landing page"). It is page content only: the publisher adds the html/head/body wrapper.
- `docs/onboarding/customer-firm.md`: what each customer firm answers; becomes `policies` on its record and fills each filing.

## Safety defaults
- `DRY_RUN_DEFAULT=true`: every run stops before the irreversible click and records a `dry_run_stop` submit intent.
- Adapters marked `complete: false` refuse non-dry runs.
- A submit intent without an outcome on worker start marks the filing `needs_reconciliation`; nothing is ever re-run automatically.
- First observation of a screen halts for review unless `firstObservationPolicy: "accept"` is set (bootstrap/fixtures only).
