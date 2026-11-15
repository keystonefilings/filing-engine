# Keystone filing engine

API + webhook service whose worker drives government filing sites live. See `../plan-review.md` for the plan, decisions and walk checklists.

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
- `src/adapters` per-site screen sequences expressed as field intents, never selectors: `nj-formation` (complete), `ny-formation` (screen 2 bottom pending walk C), `irs-ein` (pending walk B)
- `src/api` Fastify routes; `src/index.ts` cloud tier; `src/worker.ts` fixed-IP worker tier
- `fixtures/` wizard replicas for development and tests; `db/schema.sql` Postgres schema

## Run
```bash
cp .env.example .env
npm run dev          # API on :8080 with in-process worker (dry-run default)
npm run fixtures     # NJ wizard replica on :4310
npm test
```
Point the NJ adapter at the replica with `NJ_FORMATION_URL=http://127.0.0.1:4310/nj-formation/business-name.html`.

## Safety defaults
- `DRY_RUN_DEFAULT=true`: every run stops before the irreversible click and records a `dry_run_stop` submit intent.
- Adapters marked `complete: false` refuse non-dry runs.
- A submit intent without an outcome on worker start marks the filing `needs_reconciliation`; nothing is ever re-run automatically.
- First observation of a screen halts for review unless `firstObservationPolicy: "accept"` is set (bootstrap/fixtures only).
