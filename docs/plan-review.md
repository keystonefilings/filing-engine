# Filing auto-fill engine: plan review (2026-11-15)

Reviewed: filing_auto_fill_mapping.md (Nov 14 walk) + the ten owner requirements.
Nothing built. No live site checks were made for this review.

## A. Blocking issues (decide before build)

1. EIN before the state filing is accepted creates orphan-EIN risk.
   NY's online name screen only validates the type indicator; the real availability and
   acceptability decision is made by a DOS examiner after submission. NJ does a real
   availability check, but the filing can still be rejected on review. If the EIN is
   issued mid-run and the state filing is later rejected, an EIN exists for an entity
   that never formed; closing it is a letter to the IRS, not a click. Recommendation:
   keep rule 4 as the default but make the EIN step a per-filing option: "in-run" vs
   "after state acceptance" (second run). Your call; it should be a setting, not a
   hardcoded order.
2. IRS constraints that the doc does not yet hold (verify on the weekday walk):
   - Online EIN assistant runs Mon-Fri ~7am-10pm ET only. This is why Saturday errored.
     Any run that includes an EIN can only happen in that window.
   - ~15 minute inactivity timeout; the whole interview is one sitting.
   - One EIN per responsible party per day.
   - Responsible party must be an individual with an SSN/ITIN. Clients without one
     cannot use the online flow at all (fax/mail SS-4, days). Rule 4 cannot apply to
     them; the engine needs a branch that files the state form without the EIN and
     reports "EIN not possible online."
   - Third-party designee: we apply on behalf of the client, which requires a signed
     Form SS-4 authorization retained on file. Treat that as a required intake artifact.
   - The CP 575 PDF appears only if "receive letter online" is chosen. Lock that in.
   - IRS sits behind aggressive bot protection. Cloud/data-center IPs are a real risk
     of silent blocks or CAPTCHAs. Plan a stable US office/static egress for workers.
3. No site has a sandbox and nothing can be un-submitted. Every live test must stop
   before Pay/Submit. The engine needs a first-class `dry_run` mode that executes
   everything through the Review screen and halts. All development should run against
   local replicas of the three wizards captured from the walkthroughs (DOM + HAR), not
   the live sites.
4. Double-submit protection. If a worker crashes between clicking Pay and recording
   the result, a retry files and charges twice. Write a "submit intent" record before
   the final click; on recovery, reconcile (NJ Retrieve Documents, NY receipt email,
   IRS cannot be reconciled at all) instead of re-running.
5. Login reality. "NY is saved in our browser profile" is a desktop fact, not a server
   fact. The engine needs its own persistent browser profile with ny.gov credentials in
   a vault, and a plan for NY.gov ID MFA (TOTP seed in the vault, or an approval-style
   code prompt). Also serialize NY runs: concurrent sessions on one ny.gov account are
   likely to invalidate each other.
6. Payment data. The sites take raw card numbers; the engine would type them. That is
   PCI scope for stored cards. Prefer NJ eCheck ($1 fee) with ACH details in the vault,
   and decide NY once screen 2's payment area is mapped. Option: make the payment
   fields part of the human tap (the approver enters card data in the tap UI, which is
   passed through once and never stored).

## B. Gaps in the mapping doc

- NY screen 2 bottom (signature/submit/payment) and all radio labels: unmapped. NY
  cannot be built to submit until this is captured.
- NY name availability is not checked by the filing flow. Add a pre-run search against
  the DOS public entity database, plus a restricted-words list (bank, insurance, etc.)
  as a validation rule.
- NJ good standing fees: your message says fees were walked; the doc says "not shown,
  read at Select Documents on a real entity." Reconcile.
- NJ signer Title dropdown: only one option observed.
- NJ Business Amendment Service (alternate name + amendments): unknown whether login is
  needed; unmapped.
- NY name-change amendment online screen: unmapped.
- NY paper forms: no PDF field maps yet; the service-company upload screen itself is
  unmapped. This is the largest unknown in the scope.
- Completion semantics are undefined per site. NJ returns documents at once; NY emails
  a filing receipt later after examiner review; IRS is instant. The API needs distinct
  states: submitted, accepted, rejected, plus the artifacts for each.
- Name model. NJ wants the name WITHOUT designator (separate screen); NY wants it WITH
  the indicator; IRS wants the full legal name. Store base name + designator and render
  per site.
- Roles. Who is organizer/filer (Keystone) vs member/signer (client) drives the NY
  opening-statement checkbox and the NJ signer. Needs a per-tenant role config.
- Sensitive data. Responsible-party SSNs are needed for the EIN. Not in the settings
  layer, and must not be: hold per-run, encrypted, purge after completion.
- Not in scope anywhere: NY LLC publication requirement (120 days after filing). Note
  only; a client-facing product usually at least reminds.
- Doc hygiene: two "Open items" sections; merge.

## C. Ambiguities to resolve

- Human tap (rule 6): one tap per submission means two taps in a combined run (IRS
  submit, then state pay/submit). Recommend: tap 1 approves the full reviewed payload
  and releases the EIN submit; tap 2 confirms the state submit with the EIN shown.
  Tap 2 could be settings-optional later.
- Tap deadline vs session timeouts: the approver must respond inside the site's
  session window (IRS ~15 min). The engine needs an approval deadline derived from the
  site, a keepalive policy, and a clean abort. A pre-submit abort is harmless (no
  drafts). An abort after the EIN is filed is the orphan-EIN case above.
- Who taps: the tap is the legal execution of the filing. Record who, when, from
  where, and the exact payload shown. The approver must be a person authorized to sign.
- Rule 5 "no hardcoded script": read literally (fully dynamic/LLM-driven filling) this
  is unsafe for irreversible government submissions. Proposed reading: deterministic,
  label-and-semantics based field resolution from the live DOM each run, no CSS
  selectors in adapters, plus a drift detector that halts BEFORE submit whenever the
  live form's field set, required flags, or option lists differ from the last approved
  snapshot. New field = stop and report, never guess.
- "State selector" in settings (req 7): assumed to mean the default filing state per
  client. Confirm.
- Notification checkboxes pre-checked in NJ (annual report reminders, CorpWatch):
  settings default needed; recommend leaving on for the filing contact email.

## D. Architecture

Stack recommendation: TypeScript, Playwright, Postgres, a Postgres-backed job queue
(pg-boss) to start, S3-compatible object storage with encryption. Workers run from a
stable US egress, not ephemeral cloud IPs.

Flow of one run:
API request -> validate against canonical schema + settings -> pre-flight (site up, IRS
window, login valid, approver reachable) -> worker opens site context -> adapter drives
screens via the form resolver, recording a screenshot + DOM snapshot per step -> drift
check -> approval gate (webhook `filing.awaiting_approval`, deadline) -> submit intent
written -> submit -> artifacts captured -> webhook `filing.completed` or `.failed`.

Modules:
1. api: REST + OpenAPI, per-caller API keys, idempotency keys, filing CRUD, artifact
   download, approval endpoints.
2. domain: canonical FilingRequest (entity, name model, addresses, roles, EIN options),
   validation rules per state, run state machine.
3. orchestrator: queue, run lifecycle, approval gates with deadlines, per-account
   serialization (NY), IRS hours/one-per-day guards, submit-intent + reconciliation.
4. browser-runtime: Playwright harness, persistent profiles per site/account, step
   recorder (screenshot, DOM snapshot, trace), dry_run switch, network egress config.
5. form-resolver: live DOM -> field inventory (label, type, required, options); intent
   matching from the mapping doc's field names; drift detector against stored snapshot.
6. site-adapters: nj-formation, irs-ein, ny-formation, nj-standing, nj-amendments
   (alt name + charter amendments), ny-amendment-name, ny-paper-upload. Each adapter
   is a screen sequence of intents, not selectors, with the NJ quirks (Enter to add
   member, modal-body primary button) encoded as named fallbacks.
7. settings + vault: tenant settings, per-client defaults, secrets (ny.gov creds, MFA
   seed, payment instruments), read fresh each run.
8. approvals: tap UI (signed one-time link; web first, Slack/SMS later), payload
   rendering, deadline, audit record.
9. webhooks: event catalog, HMAC signing, retries with backoff, dead-letter, replay.
10. artifacts: encrypted storage for CP 575, NJ formation docs, NY receipts, per-step
    screenshots; retention policy; SSN purge job.
11. docgen: PDF form filling for NY paper forms from field maps + settings.
12. inbox: mailbox ingestion for NY acknowledgements/receipts to close the loop.
13. fixtures: local replicas of each wizard built from captured DOM/HAR for tests.

Webhook events: filing.validated, filing.started, filing.step (screen name, screenshot
id), filing.awaiting_approval, filing.approved, filing.ein_filed, filing.submitted,
filing.completed (with artifact ids), filing.failed (stage, reason, screenshot),
filing.aborted (approval timeout).

## E. Build order

0. Foundations: repo, schema, API skeleton, state machine, queue, webhooks, settings
   + vault, approval gate, artifact store, Playwright harness with step recorder and
   drift detector, dry_run, fixture replicas of the NJ and NY wizards from the walks.
1. NJ formation, end to end in dry_run (no login, fully mapped, instant name check,
   known quirks). First live dry_run stops at Payment. First real filing on a Keystone
   test entity or a consenting client with a human watching.
2. IRS EIN adapter: weekday mapping walk (stop before submit), standalone EIN product
   first, then wire into the NJ run with the in-run/after-acceptance option and the
   stop-on-error rule. Resolve egress IP and third-party designee intake here.
3. NY formation: server-side login + MFA, capture screen 2 bottom and radio labels,
   payment decision, inbox ingestion for receipts. Then the EIN integration.
4. NJ Business Records standing certificates (low risk, reveals fees).
5. NJ Business Amendment Service: alternate name, then amendments (same flow).
6. NY name-change amendment online.
7. NY paper-upload engine: map the service-company upload screen, then the PDF forms
   one at a time (Certificate of Status request, assumed name, foreign qualification,
   other amendments, dissolution).
8. Accountant front-end on the API.

## F. Decisions (client answers, Nov 15)

1. EIN timing (Yakov): EIN files inside the formation run by default, but only after the
   name-availability check passes. Per-company setting (per client company), not a
   global default; the alternative value is "after state acceptance" (second run).
   Implementation note: the gate is NJ's real availability check at the Designator
   screen; for NY it is the pre-run DOS public database search plus screen 1 passing,
   since NY's filing flow does not check availability itself.

2. Approval (Yakov, rethinking the tap): the API sends the full filing details to the
   client's chosen channel (email or other); the client approves through a per-filing
   link, and that link response IS the approval. Open: whether the approver list applies.
   Reconciliation:
   - Approval moves BEFORE the run (email is async; IRS sessions time out ~15 min).
     The client approves the exact payload; the run submits only that. Rule 6 is met
     because the drift detector guarantees nothing else is submitted.
   - Two taps collapse into one approval covering EIN + state filing; the approval
     text states the EIN issued in-run will be entered into the state form.
   - Approval binds to a hash of filing data + a settings snapshot taken at approval
     time; run start re-checks the hash and aborts (new approval needed) on mismatch.
   - Approval validity window (e.g. 7 days) replaces the session-tied deadline.
   - Payment option B (card entered at the tap) would now run on the client's link
     page; weigh in decision 3.
   - Approver list becomes per-client-company (channel + addresses), overridable per
     filing. Approver should be the named signer/organizer or someone on that list.
     Links are single-use, signed, bound to filing + payload hash; audit stores
     recipient, time, IP, exact payload shown. Optional one-time code for assurance.
     The signed Form SS-4 designee authorization remains a separate intake artifact.
   - Engine generates the link and emits it in filing.awaiting_approval; direct email
     is an optional built-in channel. Review page shows all fields (SSN masked), with
     approve / request changes; a change request yields a new payload and link.
   - Accountant front-end tap no longer needed for first release.

3. Payment (Yakov): NJ pays through the client's own signed-in NJ account where payment
   details are already stored; NY pays from the client's prepaid DD (drawdown) account,
   filled manually. No cards or ACH in our vault.
   Reconciliation:
   - Removes PCI scope; decision 2's card-on-link-page option is moot.
   - Changes requirement 10 for NJ: engine now logs in as the client. Vault holds
     per-client-company NJ portal credentials + MFA; NJ runs serialize per client
     account; clients consent to account use; new clients create an NJ account first.
   - VERIFY: that a signed-in NJ account exposes a stored payment method at the
     Payment screen (Saturday walk saw only Credit Card / E-Check via NICUSA, logged in
     or out). Walk to Payment logged in to a real account.
   - VERIFY: NY screen 2 payment area (unmapped): how the DD account is selected, and
     whether it is one account under Keystone's login or per-client accounts.
   - ADD: NY drawdown balance pre-flight before approval and run start; fee shown in
     the approval message; filing.blocked instead of starting when short.
   - Settings: "payment type" becomes "which stored method" for NJ; NY gains a DD
     account reference.

4. Egress IP (Yakov): option 2. The filing robot runs from one fixed dedicated IP (small
   VM or static proxy); the DOE vendor portal keeps plain cloud egress as today
   (separate system, unaffected by this plan).
   Reconciliation:
   - Two tiers: API, orchestrator, DB, webhooks, approval pages in the cloud; browser
     workers on the fixed-IP VM, pulling jobs outbound-only and uploading artifacts to
     object storage. No inbound ports on the VM.
   - VM is the sensitive host (ny.gov + client NJ browser profiles): disk encryption,
     secrets fetched from the vault at run time, locked admin path. Consistent IP
     reduces MFA challenges on NY/NJ accounts.
   - Single point of failure and throughput ceiling: rebuild script to re-create the VM
     on the same IP; configurable per-site concurrency limit, starting at 1.
   - Dedicated != trusted: cloud static IPs are still data-center addresses. Run the
     weekday IRS mapping walk from the chosen VM IP first; if challenged or blocked,
     fall back to a static business line at the office with a small proxy box. US IP.
   - Log every bot challenge/block as a run event to spot volume-based scoring early.

5. NJ fees discrepancy (laid out for Yakov, pending answer):
   Unresolved: message said standing-certificate fees were walked; doc says fees are
   read at Select Documents on a real entity. Formation fee table (card/eCheck service
   fees) predates decision 3 and may not match a stored-method payment.
   Why it matters: approval is now pre-run (decision 2), so the client approves a
   charge to their own NJ account before it happens; the fee must be quotable.
   Options: A) one signed-in real-entity walk to Select Documents (stop before cart),
   seed a per-filing-type fee table, engine reads the live fee each run and halts before
   payment on mismatch; B) no table, approve against a cap, halt if site shows more;
   C) use NJ's published schedule, risk of mismatch with portal checkout.
   Recommendation: A, combined with decision 3's signed-in NJ walk; keep B's cap in
   the approval text as a secondary guard.
   Question: were fees seen Saturday (values?) or do we walk this week, on which entity?
   DECIDED (Yakov): option A. One signed-in real-entity walk now to record every price
   at Select Documents; per-filing-type fee table; live fee check + drift detector on
   prices halts before payment on mismatch; walk folded into decision 3's signed-in NJ
   walk; cap kept in the approval text as a secondary guard.

6. Reading of rule 5 (laid out for Yakov, pending answer):
   Choice: how the engine behaves when a government form differs from last run.
   Why: irreversible submissions, no sandbox, and approval is pre-run (decision 2), so
   the form must receive exactly the approved payload.
   Options: A) deterministic label/type matching from the live DOM, no selectors or
   ids, per-screen snapshot (fields, required flags, options, prices); cosmetic
   changes pass, substantive differences halt before submit with screenshot + diff,
   human approves the new snapshot; B) fully adaptive AI filling, adapts silently, can
   fill a new field by inference with no human review; C) A for execution, AI proposes
   the updated mapping only in the drift-review step.
   Recommendation: A now, C later. Decision 5's price check is a row in the snapshot.
   Question: stop-and-report, or adapt-and-continue when a form changes?
   DECIDED (Yakov): option C in the initial build. Stop-and-report engine plus the
   post-halt proposal flow now: on a drift halt the system proposes the updated field
   mapping, a human reviewer accepts or corrects it, then the run resumes. Nothing
   fills a changed field without a human seeing it.
   Implication: if the drift adds a new REQUIRED field, the client's pre-run approval
   no longer covers the payload; the filing goes back for a new client approval after
   the mapping is accepted. Cosmetic/optional drift resumes without re-approval.

## G. Consolidated plan v2 (all six decisions in)

Settled:
1. EIN in-run by default, gated on the name-availability check (NJ: Designator screen;
   NY: pre-run DOS database search + screen 1). Per-client-company setting; alternative
   "after state acceptance".
2. Approval is a per-filing signed link sent to the client's channel, BEFORE the run.
   One approval covers EIN + state filing; bound to a hash of filing data + settings
   snapshot; re-checked at run start; validity window; per-client-company approver
   list (default: named signer/organizer), overridable per filing; full audit record.
3. No payment data on our side. NJ pays via the client's signed-in NJ account (engine
   logs in as the client; per-client NJ credentials + MFA in the vault). NY pays from
   the prepaid DD account; balance pre-flight before approval and run start.
4. Browser workers run from one fixed dedicated US IP (VM or static proxy), pulling
   jobs outbound-only; API/orchestrator/DB/webhooks/approval pages stay in the cloud.
   Test the IP against the IRS site before building on it.
5. NJ fees: one signed-in real-entity walk to Select Documents; per-filing-type fee
   table; live fee check halts before payment on mismatch; cap in approval text.
6. Deterministic label/type field matching, no selectors; per-screen snapshots; drift
   halts before submit; proposal flow for the reviewer to accept/correct the mapping;
   resume, or re-approve with the client if a new required field appeared.

Architecture deltas from section D:
- approvals module: client link pages (approve / request changes), hash binding,
  settings snapshot, expiry, optional one-time code. Accountant-app tap dropped.
- NEW drift-review module: snapshot store, diff, mapping proposal (heuristic label
  similarity first, model-assisted proposal allowed since a human accepts), reviewer
  UI, resume/re-approve logic.
- settings + vault: per-client NJ credentials/MFA, NY DD account reference, NJ
  stored-method choice, fee table, approver list per client company. No card/ACH.
- orchestrator: NY DD balance pre-flight; per-site concurrency limit (start 1);
  per-account serialization (ny.gov and each client NJ account).
- browser-runtime: runs on the fixed-IP VM; secrets fetched at run time; bot
  challenge/block logged as run events.

Build order v2:
0. Foundations (cloud tier + VM worker tier), fixtures from the walks, dry_run,
   approvals with link pages, drift detector + proposal/review flow, fee table.
   In parallel, three human walks (need the accounts):
   a) NJ signed in to a real account: Payment screen (stored method? service fee?)
      and Business Records Select Documents (all prices). Stop before cart/pay.
   b) IRS EIN weekday walk from the VM IP, stop before submit; full question map.
   c) NY screen 2 bottom: signature/submit/payment, DD account selection, radio labels.
1. NJ formation adapter (now logged in as client) end to end in dry_run; first real
   filing with a human watching.
2. IRS EIN adapter standalone, then wired into the NJ run with the name gate.
3. NY formation adapter (server-side ny.gov login + MFA, DD pre-flight, receipt
   inbox), then EIN integration.
4. NJ standing certificates. 5. NJ Business Amendment Service (alt name, amendments).
6. NY name-change amendment. 7. NY paper-upload engine. 8. Accountant front-end.

Still open on our side:
- Decision 2's approver-list piece (per-client-company list, signer/organizer default)
  was reconciled but not explicitly confirmed by Yakov.
- Who the drift reviewer is (assumed Keystone staff, not the client).
- Whether client NJ accounts carry MFA, and client consent wording for account use.
- Meaning of "state selector" in settings (assumed default filing state per client).
- Form SS-4 third-party designee authorization as an intake artifact.
- The three walks above; nothing adapter-side can be finished without them.

## H. Capture checklists for the three walks

General rules for every walk: use a test name only; stop before any Pay, Submit, or
Cart step; nothing is filed. For every screen: save a full-page screenshot, save the
page HTML (right-click, Save As, Webpage Complete, or DevTools copy of outerHTML), and
copy every field label exactly as written. For every dropdown or radio: open it and
copy the full option list in order. Note which fields show a required marker and which
error appears when a required field is left blank and Continue is pressed. Note the
URL of every screen. Record timing: how long each screen takes to load, and any idle
timeout warning. Record any CAPTCHA, challenge, or block page in full.

### Walk A: NJ portal, signed in to a real client account

Part 1, formation Payment screen (njportal.com/DOR/BusinessFormation):
1. Sign in to the client account first. Record whether sign-in asks for a second factor
   and of what kind (SMS, email, app).
2. Run the formation wizard with a test name through Business Information, Registered
   Agent, Members (add one), Signatures (add one, check the box), Review.
3. On the Payment screen: capture the Additional Certificates section, the Contact
   Information fields and whether they are pre-filled from the account, the Select
   Payment Type options, and whether a saved or stored payment method appears anywhere.
4. Capture the full fee table exactly as shown, including the service fee for each
   payment type.
5. Capture the two notification checkboxes and their default state.
6. STOP before Pay Now. Press Cancel and record where Cancel lands.
7. Repeat steps 3 to 5 signed out, same test data, and note every difference.

Part 2, Business Records standing certificates
(njportal.com/dor/businessrecords/EntityDocs/StandingCerts.aspx):
1. Still signed in. Capture the Search Type radio options exactly.
2. Search by Business Name for the real entity. Capture the Results screen: columns,
   how a row is selected, how many rows appear and whether paging exists.
3. Select the entity and reach Select Documents. Capture every document type offered,
   its price, any quantity or delivery options, and any service fee note.
4. Add one document to the Cart. Capture the Cart screen: line items, totals, service
   fee, payment type options, and whether the stored payment method appears.
5. STOP before checkout. Remove the item from the cart and record that it is empty.
6. Open the Retrieve Documents page and capture it: what it asks for and what it lists.
7. Capture the Business Name Search screen (njportal.com/DOR/BusinessNameSearch) and
   the result for the test name and the real name, including the exact wording of
   "available" and "not available".

### Walk B: IRS EIN interview from the VM IP (weekday, 7am to 10pm Eastern)

Preparation: run the browser from the dedicated VM IP. Confirm the day and time. Have
a test LLC name, a US address, and a responsible party with an SSN who consents to
this walk; the SSN is entered only on the responsible-party screen and the walk stops
before submission, so no EIN is issued.
1. Load the EIN Assistant start page. Record whether any challenge, CAPTCHA, or block
   appears from this IP, and the exact wording.
2. Capture the legal structure screen and its options. Choose LLC.
3. Capture the member count and state screens, including the exact question text.
4. Capture the "why is the LLC requesting an EIN" screen and all options.
5. Capture the responsible party screens: name, SSN or ITIN field, the "I am one of the
   owners / I am a third party applying on behalf" choice, and any text about Form SS-4
   authorization for third parties.
6. Capture the address screens, including whether a separate mailing address is asked.
7. Capture the LLC details screen: legal name, trade name, county, state of articles,
   start date, closing month, and all employee and activity questions with options.
8. Capture the confirmation-letter delivery screen: the exact wording of "receive
   letter online" versus mail.
9. Capture the summary screen before submit, in full.
10. STOP. Do not click Submit. Close the tab. Record the inactivity warning if one
    appeared at any point and the number of minutes it stated.
11. Record the total elapsed time and the number of screens.

### Walk C: NY DOS screen 2 bottom (filings.dos.ny.gov, ny.gov service-company login)

1. Sign in. Record whether a second factor is asked and of what kind.
2. Enter the filing flow for a Domestic LLC with a test name that includes "LLC".
3. On screen 2, for every radio group, capture the full option labels exactly: service
   of process (manual versus service company, and the service company list), registered
   agent, management structure, effective date, dissolution date.
4. Scroll past Filer. Capture everything below it: signature fields, certification
   text, any attachment or upload option, and the payment section.
5. In the payment section, capture how payment is chosen: whether a drawdown (DD)
   account appears, whether it is one account or a choice among several, whether a
   balance is displayed and where, and whether a card option also exists.
6. Capture the fee breakdown shown, including any optional items such as certified copy
   or certificate of existence and their prices.
7. Capture the exact label of the final button (Submit, File, Pay) and any confirmation
   dialog that opens when it is pressed, then cancel that dialog. STOP there.
8. Separately, find where the DD account balance is shown in the account area outside
   the filing flow, and capture that page and its URL.
9. Capture the name-change amendment entry point (Business Express route) up to its
   first data screen, for later mapping, without entering data.
10. Record any session or idle timeout warning and its stated duration.

## I. Phase 0 status (built Nov 15, code in /home/user/filing-engine, commit 4a5bef1)

Built and tested (27 tests passing, API boots):
- Canonical filing request + per-state validation + lifecycle state machine + event catalog.
- Settings (tenant, client company) with snapshot hashing; vault interface (env/in-memory
  implementations; production secrets manager still to wire).
- Pre-run link approval: signed single-use token, payload hash + settings snapshot binding,
  expiry, masked review page (SSN never rendered), approve / request-changes, run-start re-check.
- Webhooks: HMAC-signed deliveries, backoff schedule, dead-letter, consumer verify helper.
- Resolver: live-page inventory (labels, required flags, options, prices), label-based intent
  matching with reviewer overrides, structural drift detection (cosmetic changes ignored).
- Drift review: halt records, heuristic mapping proposals, accept/correct/reject; new required
  field => filing goes back for client re-approval; otherwise re-queued.
- Fee table (config/fees.json) + live fee check against approved lines and cap.
- Orchestrator: queue boundary, per-site/per-account concurrency, pre-flight (approval, IRS
  hours window, fee known, credentials present, NY drawdown balance hook), run executor with
  step evidence (screenshot + DOM per screen), submit intent before the irreversible click,
  reconciliation flag on restart, dry-run guard.
- Adapters: NJ formation complete against the fixture replica (all 3 quirks handled); NY
  formation through screen 2 (bottom pending walk C); IRS EIN placeholder (walk B) that
  blocks any non-dry run with an in-run EIN.
- Fixtures: NJ wizard replica incl. drift variant; Postgres schema + store; API routes;
  cloud entry point and worker entry point.

Design notes that surfaced while building:
- "Resume" after a drift review is a NEW run from the first screen. No site keeps drafts,
  so the halted browser session is discarded; nothing was submitted.
- First observation of a screen halts for review unless bootstrapped (fixtures do this).
  Production bootstrap = one dry run per adapter with a reviewer accepting each screen.
- The test fee table assumes the NJ stored-card service fee is $3.50; the production table
  keeps it unknown until walk A, so a real NJ filing is refused until that number is recorded.
- The git author on the initial commit is a placeholder; set the real author before pushing.

Not built yet (needs the walks or later phases): IRS adapter body, NY screen 2 bottom +
login/MFA + inbox for receipts, NY drawdown balance reader, NJ standing/amendments/alt-name
adapters, NY paper-upload + PDF generation, pg-boss queue, production secrets manager,
email delivery of approval links (webhook carries the link today).

## J. Walks of Nov 17 (cloud session)

Full record: `docs/walks/2026-11-17.md`. Summary:
- NJ signed-out formation walked end to end to Payment and cancelled; the engine's own
  dry run then filled all 13 live screens and stopped before Pay Now.
- NJ standing certificates walked to the cart: $25 per certificate, +$2 card / +$1 eCheck.
- IRS EIN assistant and NY DOS both refuse the cloud IP. Decision 4 (fixed IP) now
  covers NY as well as the IRS.
- IRS published hours differ from the plan: Mon-Fri 6am-1am, Sat 6am-9pm, Sun 6pm-midnight.
- Pay Now hands off to the NICUSA gateway, which is unmapped; NJ adapter is dry-run only
  until walk A (signed in) maps it.
- Open items closed: NJ signer Title list (LLC: Authorized Representative only); NJ
  standing-certificate fees.
- New questions: Q1 shared NJ business payment account instead of client logins;
  Q2 Keystone's NJ Registered Agent Number.

Still needed from a person:
- Walk A signed in (needs a client NJ login, or the Keystone business account per Q1),
  through Pay Now onto the gateway page, stopping before any card/stored-method confirm.
- Walk B (IRS) and walk C (NY) from the fixed IP, which does not exist yet.
- NY service-company login: entered on the fixed-IP machine as VAULT_NYGOV_USERNAME,
  VAULT_NYGOV_PASSWORD and (if the account uses an authenticator app) VAULT_NYGOV_TOTP_SEED.
  Never pasted into chat.

## K. Built after the Nov 17 walks

- NJ standing-certificate adapter (search, exact row by name + Entity ID, cart, fee check);
  live dry run passes in 13 s and stops before Pay Now.
- Engine: waits correctly for ASP.NET partial postbacks (they never navigate); fee check
  reads only real total lines; webhook secrets read from tenant settings at send time
  (retries after a restart are signed); Postgres job queue (two workers never take the same
  job); a worker restart settles interrupted runs instead of re-running them; per-run fields
  (search results) excluded from drift.
- Tools: walk recorder (blocks pay/submit, masks SSN/password/card/bank fields) and site check.
- Deployment: Dockerfile, docker-compose (db + api + worker), `docs/fixed-ip-machine.md`.
- Tests: 52, including Postgres against a real database and the recorder's guards.
