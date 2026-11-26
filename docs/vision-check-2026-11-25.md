# Vision check, 2026-11-25

The Nov 25 voice memo (`docs/vision-memo-2026-11-25-transcript.md`) checked against the code at
`d688d69`. Status: **Done** works as described; **Partial** exists but is incomplete, inert or
dry-run only; **Missing** has no implementation.

## Summary

- Most of the *shape* is built: the landing page, a single login with routing, partner sign-up and
  setup, the enterprise dashboard, API docs and OpenAPI, the state-then-type portal, intake forms
  with folding and "Same as", and adapters for NY, NJ, FL and IRS.
- **Nothing files for real yet.** All 11 adapters are `complete: false`, and only `irs-ein` has
  `confirmSubmission`. Payment screens are the common blocker: none of the card or deposit checkout
  pages after "Pay" is mapped.
- **No email or message is ever sent.** The only sender is `LogChannelSender`
  (`src/bootstrap.ts:64`), yet the UI promises approval emails, sign-up emails and completion
  emails in several places.
- **Many settings are saved but never read.** These include payment routing (`stateFeeCards` is
  never called), `portalDefaults`, `channels`, and `documentsTo` (H1). Users will think they have
  configured things that do nothing.
- Missing outright: subscription billing, a password reset, permanent branded per-service pages,
  a client address book, fonts, channel connectors (email, Slack, WhatsApp) and the 20-persona
  copy review.
- Web checks pass: `npm test` 20/20, `typecheck` clean, `next build` succeeds. The engine suite was
  not run in this check (it needs Chromium and embedded Postgres); CI runs it on pull requests.

## Status by requirement

### Filing engine

| # | Memo asks for | Status | Where / what's missing |
|---|---|---|---|
| 1 | NY, NJ, FL, all filing types, and IRS EIN mapped and live | Partial | `src/adapters/index.ts`. Every adapter is `complete: false`, so `preflight.ts:53` blocks live runs. **NY formation:** deposit throws (`ny-formation/adapter.ts:105`) and the page after File Document isn't mapped. **NJ formation and standing:** the NICUSA checkout isn't mapped. **FL:** the card page isn't mapped. **IRS:** the EIN Assignment screen isn't mapped. **NJ-REG and NYS-100:** built from the paper forms, not the walked maps (`docs/portal-maps/nj-reg.md`, `ny-nys100-unemployment.md`). **MO:** every `fill` throws. Mapped in the docs with no adapter: NY dissolution, amendment, certificate of change, copies and certificates of status; NJ for-profit corporation. |
| 2 | Filings use the stored payment methods, with a backup if the first fails | Partial | `src/settings/payments.ts` models a default card, `fallbackMethodId` and per-filing routing, but nothing reads it, and the vault has no card type. The FL Sunbiz prepaid account is the only payment path that works. This contradicts decision 3 (see Decisions below). |
| 3 | State logins saved securely, used on every filing | Partial | The `Vault` interface exists, but production uses `EnvVault` (environment variables). Nothing writes `portalLogins`, and the dashboard's "Connect" button is disabled. Sign-ins depend on Steel profiles saved by hand. |
| 4 | Per-state defaults (registered agent, service of process, signer, organizer), overridden by what the submission says | Partial | Precedence and provenance work (`src/settings/policies.ts:96-223`: the filing value wins and each field records its source). But defaults are one per tenant or firm, not per state. `portalDefaults` is saved but never read. The NY adapter never fills the registered agent. There's no UI for these fields; only staff can set them. |
| 5 | Stop at the state review page, email a screenshot, pay and submit after approval | Partial | Client approval happens **before** the run, on a signed link with no screenshot (`src/approvals`). A beta review gate does take a screenshot at the review page (`run.ts:121-130`), but it is staff-only, off by default, and only on the FL, IRS and NY formation screens. After approval it re-runs from scratch in a new browser and never compares the result with what was approved. See Decisions. |
| 6 | Send filings to the engine through email, Slack or WhatsApp | Missing | The `channels` schema exists and isn't read. There is no inbound parsing and no senders; the only intake is `POST /v1/filings`. |
| 7 | Fetch the EIN PDF as soon as it appears | Partial, **will fail** | The CP 575 download exists (`irs-ein/adapter.ts:340-358`). But the Assignment screen gets a drift check before it's filled (`run.ts:118`). A screen never seen before halts by default (`run.ts:274-280`), and a dry run never reaches this one. So the first live run halts after submit, before the download, and the letter is lost. Every adapter's post-submit screen has the same problem. |
| 8 | Enterprise picks the state copy email; the CPA firm goes in NY's CC | Partial | NY formation fills CC only from a per-filing field (`ny-formation/adapter.ts:304`). There's no tenant or firm setting for it, and nothing puts the CPA firm's email in automatically. E-Submission never fills CC. |

### Landing, login and accounts

| # | Memo asks for | Status | Where / what's missing |
|---|---|---|---|
| 9 | Landing page with compelling copy | Done | `web/app/page.tsx`. The copy is specific and builds trust. Some claims go further than the code: "cards and logins in a vault", "connected securely", subscription cards. `web/app/layout.tsx:6` sets `robots: noindex`, so search engines won't index the page. |
| 10 | Three paths: create an account (CPA, CFO, payroll), request Enterprise, log in | Done | Firm types are one dropdown. Title companies, which `docs/scope.md` names, aren't offered. |
| 11 | One login, routed automatically to the enterprise or partner dashboard | Done | `web/lib/accounts.ts:21-52`. A second, API-key login still exists at `/dashboard/login`. |
| 12 | Forgot password and the account basics | Missing | There's no reset, change-password or email verification flow. Logout doesn't revoke the engine session key (it lasts 12 h for enterprise, 7 days for partners). No error pages: an engine 401 or 5xx shows the raw Next.js error. |
| 13 | Enterprise request form, then staff follow-up, then a login | Partial | The form stores the request (`POST /v1/inquiries`), and the platform tenant can see the list. Creating the account means staff running curl commands with a password they choose and pass on by hand. There's no invite or set-password email and no Google sign-in. |

### Enterprise

| # | Memo asks for | Status | Where / what's missing |
|---|---|---|---|
| 14 | Full API and webhook docs, readable by humans and AI agents, downloadable | Partial | There are 8 guides, a 25-endpoint reference and `/openapi.json`. The OpenAPI schemas are bare `{type: "object"}` with no `webhooks` section and no FilingRequest schema. There's no `llms.txt`, single-file Markdown or download. Samples are curl and JavaScript only. One guide links to a repo file outsiders can't see. |
| 15 | Plug into their website; filings arrive from their site | Partial | API keys and the webhook editor work. Webhooks return 409 until staff configure the tenant. There's no test delivery or delivery log, no cancel endpoint, no pagination on `GET /v1/filings`, and `filing.accepted`/`filing.rejected` are never emitted. `X-Frame-Options: DENY` blocks embedding. |
| 16 | Subscription billing with set pricing | Missing | There are no plans, prices, processor or invoices. |
| 17 | Setup page for each portal's login (NY DOS, NYS-100, NJ, IRS, FL) | Partial | The portal list renders, but the Connect buttons are disabled (row 3). |
| 18 | Resend email for screenshots, approvals and notices | Missing | There is no email sender of any kind. |

### Partner front end (CPA, payroll)

| # | Memo asks for | Status | Where / what's missing |
|---|---|---|---|
| 19 | Sign up, log in, setup guide | Done | Accounts wait for approval unless `PARTNER_SIGNUP_MODE=automatic`. The "states you file in" answer is collected and never used. |
| 20 | Name, logo, colors, **fonts** (presets and upload) | Partial | Name, logo and two colors exist. Fonts are missing entirely: `globals.css` hard-codes system fonts. |
| 21 | Pay Keystone (subscription) and filing payment methods | Partial | Only a card-routing preference saves, with no card able to be added. There is no subscription for partners. The payments step is marked done with zero cards. |
| 22 | Portal lists filings by state, then filing type | Done (dry run) | **NY:** LLC, corporation, NYS-100, Application for Authority, Assumed Name. **NJ:** LLC, NJ-REG. **FL:** LLC, profit corporation, LP. The EIN is offered under every state. All are dry runs. Partners can't choose which filings they offer. |
| 23 | Permanent branded page per partner per service (`/bestaccounting/llc-filing-new-york`) | Missing | Only one-off `/i/<token>` links exist: one per client, one filing each, expiring within 30 days, and they can't be listed or revoked. The approval page shows Keystone's brand, not the partner's (`src/api/server.ts:242`). |
| 24 | Finished filing emailed back to the partner | Missing | The completion message goes to approvers through the log sender, with the text "Documents are available." and no link or attachment. |
| 25 | Minimal forms: no duplicates, "Same as", optional questions folded | Partial | Folding, paired fields and address "Same as" exist. Duplicates remain: **FL** asks for correspondence contact and filing contact separately. **NY** asks for SOP email, contact email and CC. **EIN** asks again for the state and the physical state. **NYS-100** asks for phone numbers even when "same as business" is ticked. **NJ-REG** asks for signer and contact separately. There's no "Same as" for people (organizer equal to a member). Saved firm defaults never skip a question. |
| 26 | Save client information for next time | Missing | There's no address book or prefill. |
| 27 | Partner saves its registered agent per state; no state passwords | Partial | Partners correctly can't enter logins. But they can't set a registered agent or any other default either, and the engine holds one agent per firm, not per state. |
| 28 | Client submissions go straight into the engine and get filed | Done, to approval | `/i/<token>` goes to `POST /v1/filings` and then the approval link (which isn't sent; row 18). |

### Other

| # | Memo asks for | Status | Where / what's missing |
|---|---|---|---|
| 29 | Review the copy with 20 simulated personas and apply the best | Missing | Not started. |

## Decisions (the memo changes earlier decisions)

**Settled on Nov 25:**
1. **Approval: yes to the preview, screenshot, then matching live pass described below.** This
   amends decision 2 (Nov 15).
2. **Payment: store customers' own cards (option B).** This replaces decision 3's "no cards or ACH
   in our vault". State prepaid accounts (option C) remain supported wherever a customer has one.
   The card vault provider (VGS or Basis Theory) is still to be chosen, and the worker host enters
   PCI scope.

The analysis behind them:

1. **Approval at the review page (memo) vs. approval before the run (decision 2, Nov 15).**
   Decision 2 moved approval before the run because email replies are slow and IRS sessions time out
   after about 15 minutes, so a browser can't wait at the review page for an email answer.
   Recommendation: keep one client approval, but base it on the real review page.
   1. A preview pass (a dry run) goes to the state's review page, takes a screenshot and stops.
   2. The client approves that screenshot together with the payload.
   3. The live pass must reproduce the same review page before it pays: the same text, the same
      fee, and a matching payload hash. It halts if anything differs.

   This is close to what the beta review gate does. It needs to become client-facing, run on every
   adapter, and compare the live pass with what was approved.
2. **Stored payment cards (memo) vs. "no cards or ACH in our vault" (decision 3).** The memo wants
   cards, a backup card, and an engine that types them in. A card the engine types into a state
   checkout has to exist as a raw card number on the worker at run time. Stripe never releases raw
   numbers of saved cards, so Stripe can't be that vault. The options:
   - **A. Keystone pays the states with virtual cards** (recommended for the partner front end).
     Issue a single-use card per filing, locked to the approved amount, from a card-issuing API
     such as Stripe Issuing or Lithic. Recover the fee from the customer through Stripe Billing,
     alongside the subscription. Customers' card numbers never reach the worker, and a backup
     method is simply the customer's backup card in Stripe.
   - **B. Store each enterprise's own cards** in a card vault built for passing them on (VGS or
     Basis Theory). The worker detokenizes a card at the payment screen. This puts the worker
     machine in PCI scope and needs a compliance review.
   - **C. Prefer state prepaid accounts wherever they exist**: NY DOS drawdown and the FL Sunbiz
     E-file account. These need no card at all, and C combines with A or B.
   
   Recommendation: C everywhere it's available, A for partners, and B only if an enterprise
   insists on its own cards.
3. **Where state logins live.** Use a real secret store with per-tenant keys in place of `EnvVault`.
   Options are a cloud KMS with envelope encryption in Postgres, HashiCorp Vault, or 1Password
   service accounts. Add a write path (the dashboard's Connect form posts once and never reads the
   password back) and MFA handling per portal.

## How the channels would get running

- **Email out (Resend):** Verify `keystonefilings.com` in Resend (SPF and DKIM DNS records), add a
  `ResendSender` behind the existing `ChannelSender` interface (`src/comms/senders.ts`), and store
  the API key as a secret. This one change makes approvals, sign-up, reset and completion emails
  real, so it should come first.
- **Email in:** Use a dedicated inbound address (for example `file@...`) through an inbound-parse
  webhook (Postmark, SendGrid, or Resend's inbound if it fits).
- **Slack:** Build a Slack app that each customer installs with OAuth, using a message shortcut or
  slash command. It needs a public HTTPS events endpoint on the API.
- **WhatsApp:** Use the Meta WhatsApp Business Platform, directly or through Twilio. It needs Meta
  business verification, a dedicated number and approved message templates; expect days to weeks
  for verification.
- **SMS:** Use Twilio, with US A2P 10DLC brand and campaign registration (also days to weeks).

The rule for every inbound channel: free text never files directly. Each message becomes a
**draft** filing with Claude extracting the fields. The reply is a link to the prefilled intake
form, which asks only for what's missing, and the normal approval follows. The audit trail and the
payload-hash approval stay as they are.

## Risks found during the check (not in the memo)

1. **CP 575 loss on the first live EIN run** (row 7). Fix this before any live EIN: let
   post-submit screens skip the first-observation halt, and collect artifacts before any check
   that can throw.
2. **NYS-100 shares one browser profile across tenants.** `ny-payroll` uses the global profile
   `"nygov"` (`src/adapters/ny-payroll/adapter.ts:110`); every other NY adapter scopes it to
   `ny:<tenantId>`. This breaks the isolation rule in `docs/scope.md`.
3. **SSNs are stored in plain text** in `filings.doc`, with no purge job, although
   `src/domain/filing.ts:46` promises one.
4. **UI promises that aren't kept.** Approval, sign-up and completion emails never go out, and
   setup pages save settings nothing reads. Either wire them up or soften the wording until they
   work.
5. **Firm invite links carry the inviter's engine key.** A "7-day" invite dies when the 12-hour
   session does. The invitee holds a key for the whole tenant, limited to one firm only by the
   front end (`web/app/dashboard/(app)/firms/[id]/actions.ts:64`).
6. **Idempotency key reuse.** A reused key with a different payload silently returns the old
   filing (`src/orchestrator/service.ts:100-105`). It should be a 409.
7. **CI gaps.** CI doesn't run on push to `main`, and `fly-deploy.yml` deploys with no test gate.

## Suggested order

1. **Make what exists honest and safe.**
   - The Resend sender.
   - Password reset and invite emails.
   - Fix the CP 575 halt.
   - Scope the NYS-100 profile per tenant.
   - Encrypt SSNs and add the purge job.
   - Soften the UI copy that promises unbuilt features.
2. **First live filing, end to end, on one portal.** NY LLC on the drawdown account is the
   shortest path (decision 3, prepaid). Map the deposit and post-submit pages, set
   `complete: true`, and send the completion email with the documents. Then FL on Sunbiz prepaid,
   then the IRS EIN.
3. **Settle decisions 1 and 2 above**, then build the review-page screenshot approval and the
   payment approach you choose.
4. **Partner front end.**
   - Permanent branded pages `/<partner>/<filing>`.
   - Fonts.
   - Per-state registered agent and other defaults that skip questions.
   - A client address book.
   - Removing the duplicate questions in row 25.
   - Partner-branded approval pages.
5. **Enterprise.**
   - The secret store and the Connect form for logins.
   - Per-state defaults the adapters actually read.
   - A copy and CC email setting.
   - Staff approval of enterprise requests with an invite email.
   - Stripe Billing subscriptions.
   - Full OpenAPI schemas, `llms.txt` and a downloadable docs bundle.
6. **Channels**, in this order: email in, Slack, WhatsApp, SMS.
7. **20-persona copy review**, once the features the copy describes are real.

## Tracker

*Nov 25: the site is now **CoFile** (cofile.app). Addresses written as keystonefilings.com above
are cofile.app (for example cofile.app/bestaccounting/llc-filing-new-york).*

Every issue from the memo and from this check, in one list. Tick an item only when it is done in
code (with tests) or, for items that need a person, when that step has happened. Items marked
*needs* name what has to come from outside the code (a live walk, a vendor account, a decision).
Rows refer to the status tables above.

### What's waiting on you (Nov 26)

Built and tested; each switches on when its accounts and keys are set (steps in docs/deploy-fly.md):

- **Resend:** `cofile.app` is verified (Nov 26, DNS in Vercel) and the key is saved in the Vercel
  web project. The site itself never sends mail, though: the engine does (approval links, password
  resets, notices), so set the same key on the engine too, `fly secrets set RESEND_API_KEY=...`
  (docs/deploy-fly.md), or no email goes out (V1). For filing by email, a receiving domain (MX
  record), the webhook's signing secret and `INBOUND_EMAIL_ADDRESS` (V40).
- **Claude API key** in the web app (`ANTHROPIC_API_KEY`): reads requests sent by email, Slack,
  text and WhatsApp (V40-V43).
- **Basis Theory:** a public key (web) and a private key (engine) for saved cards (V18).
- **Stripe:** the two prices, a restricted key, the webhook secret, then `BILLING_REQUIRED=true` (V33).
- **Google:** done Nov 26 (project cofile-515904, client "CoFile Web"; redirect URIs
  `https://cofile.app/api/auth/callback/google` and the localhost one, which the code now uses).
  The engine's client ID is in fly.toml. While the consent screen is in Testing only its test users
  can sign in with Google. Portal-only "Save to Google Docs" is built (Nov 26): on a partner firm's
  filing page, it writes the filing's record (details, status, authorizations, documents kept,
  without people's SSNs or ITINs) into a new Doc in the person's Google account; no Google token is
  kept, and enterprise accounts don't get it. Publishing the consent screen with the Docs scope
  needs Google's verification.
- **Vercel production settings (Nov 26):** I set `PLATFORM_NAME=CoFile` (it was "Keystone
  Filings") and added `PORTAL_PUBLIC_URL=https://cofile.app`, with your OK; both apply on the next
  deploy. Still yours: `PLATFORM_API_KEY` isn't set. Without it a client link a partner firm sends
  carries the firm's session key and ends with that session (7 days at most); with it, the link
  carries no key and lasts 30 days. Its value is the platform tenant's engine caller key: the key
  in the engine's `API_KEYS` secret before `:keystone` (made at deploy step 3 into ~/fe-api-key),
  or a key created in the dashboard's Keys page as a `keystone` staff user. Add it in Vercel as a
  Sensitive, Production variable. `RESEND_API_KEY` there is unused (the
  engine sends mail). Each takes effect on the next deploy.
- **Slack:** a Slack app with the `/file` command (V41).
- **Twilio:** a number with A2P 10DLC registration, and a WhatsApp sender (Meta verification) (V42-V43).
- **NJ fees from the NJ account (Yakov, Nov 26):** done in enterprise Setup (Payment methods, "New
  Jersey: pay with your NJ account"): per NJ filing type (LLC formation, corporation formation,
  standing certificate), state fees are paid with the card or eCheck saved in the enterprise's own
  NJ account instead of a card saved with us; no card saved with us is used or asked for on those
  filings, and API filings are matched by state and type. Without a connected NJ login, a filing of
  a ticked type is stopped at approval, never paid another way. NJ's portal fee for a saved method
  is quoted at the card or eCheck figure until the signed-in checkout is walked (the payment page's
  fee check stops a run that differs); which option the signed-in page shows is part of that walk.
- **Partner pricing (Nov 26):** built on the recommendations (config/partner-pricing.json; Billing
  page plan choice, usage counted at each live submission, extras and pay-as-you-go charges on the
  firm's Stripe invoice). Yours: create the Stripe prices and set `STRIPE_PARTNER_PRICES`
  (docs/deploy-fly.md). Prices stay off the public site.
- **Copy and branding, round 2 (Yakov, Nov 26):** done. The 20 personas wrote the site as for
  their own client; Yakov approved all five choices (rehearsal, the proof, filing desk, free
  rehearsals, the new look), and the home page, sign-up, filing desk, client pages, proof page and
  approval email now follow the merged direction (docs/copy-review-2026-11-26.md).
- **Florida EIN (Yakov, Nov 26):** done. A Florida formation's EIN is applied for only once the
  state accepts the formation (any `in_run` request becomes `after_acceptance`). When the acceptance
  is recorded (or a state accepts at once, as NJ does, for a formation asking for that order), the
  EIN application starts as its own filing under the client's approval of the formation, whose
  page says so; the EIN is copied back onto the formation. Before this, `after_acceptance` was only
  a setting, and nothing applied for the EIN after acceptance.
- **Copy decisions:** all 19 questions from the copy review (docs/copy-review-2026-11-26.md) were
  decided and done on Nov 26: price wording, the filing company, the Terms and Privacy pages, the
  support address (hello@cofile.app), the approval consent (now covering fee payment), the
  saved-signature consent (limited and revocable), first-person declarations, the EIN owner route,
  the coverage table, practice mode (plus a site-wide beta banner), the registered agent (ours,
  resold from Registered Agents, Inc., $59 a year per business), turnaround times, the sign-up
  review wording, the production addresses (api.cofile.app and cofile.app; DNS records in
  docs/deploy-fly.md section 9), EIN-only filings for an LLC formed in any state, the fee figures
  (NY's tax on shares, NJ's $103.50 LLC and $52/$27 standing certificate), the API key prefix
  (cofile_ for new keys, kfe_ still accepted), Florida professional entities (PLLC, P.A.,
  Chartered) and the Application for Authority's PDF uploads. Still with you: have counsel review
  the Terms and Privacy Policy (governing law, liability cap, legal entity name) and the approval
  consent, saved-signature consent and declaration wording.
- **Registered Agents, Inc.:** their API documentation and key (through your wholesale contact),
  and their agent name and office address for each state you offer (setup in docs/deploy-fly.md).
- **Live walks with you:** NY drawdown deposit and post-submit pages, Sunbiz checkout, the IRS
  Assignment screen, the NJ checkout (V9-V12); the checkout walks also let the adapters type saved
  cards (V18). Also the pages V13 and V14 couldn't map: each NY record filing's confirmation, the NJ
  corporation's last pages, Missouri, NYS-100's Ready to Submit, and the page after NJ-REG's
  Complete Registration.

### Step 1: honest and safe
- [x] V1. Resend email sender behind `ChannelSender`, wired as the default email sender (row 18). **Done in code** (`src/comms/resend.ts`; approval links, password resets and partner approvals). *To turn on: a Resend API key and DNS verification of the sending domain (`docs/deploy-fly.md`, step 3).*
- [x] V2. Password reset (forgot password, then a link to set a new one) and change password (row 12). **Done**: `/forgot-password`, `/reset-password`, and Password pages in both dashboards; links are single-use, last an hour and end every session.
- [x] V3. EIN CP 575: post-submit screens never halt on first sight; artifacts are collected even when confirmation fails (row 7, risk 1). **Done** (`src/orchestrator/run.ts`, `test/post-submit.test.ts`); also fixed in-run EIN artifacts all being stored as `cp575`.
- [x] V4. NYS-100 browser profile scoped per tenant (risk 2). **Done**: profile `nygov:<tenant>` and credential `<tenant>/NYGOV`. *Deploy note: rename the Fly secret entry `STEEL_PROFILES` `nygov=` to `nygov:keystone=`.*
- [x] V5. SSNs encrypted at rest, plus the purge job `src/domain/filing.ts:46` promises (risk 3). **Done** (`src/store/sensitive.ts`): AES-256-GCM per field in Postgres under `DATA_ENCRYPTION_KEY` (required in production); masked once a filing has been completed or aborted for `SENSITIVE_RETENTION_DAYS` (30). *Deploy note: set `DATA_ENCRYPTION_KEY` (`docs/deploy-fly.md`, step 3) before the next deploy, or the API won't start.*
- [x] V6. UI copy matches what works: no promised emails, vaults or subscription cards that don't exist (risk 4, row 9). **Done for the app**: emails promised are now sent (V1); unsent messages are recorded as "skipped", never "sent"; the filing page says whether the approval link was emailed; sign-up and setup copy match. The landing page's vault lines describe V18 and V29 and get rewritten in the copy review (V44).
- [x] V7. Email verification for new sign-ups, and logout revokes the engine session key (row 12). **Done**: partner sign-ups confirm their email (a button on the link page, so mail scanners can't confirm); `POST /v1/auth/sign-out` ends one session; the web logout calls it for password sessions.
- [x] V8. Error pages in the web app for an engine 401 or 5xx (row 12). **Done**: an ended session goes to log in with a notice (`/session-ended`); `error.tsx` and `not-found.tsx` replace the raw Next.js pages.

### Step 2: first live filings (adapters)
- [ ] V9. NY LLC and corporation live on the drawdown account: map the deposit and post-submit pages, `confirmSubmission`, `complete: true` (row 1). *Needs: a supervised live walk.*
- [ ] V10. FL LLC, profit corporation and LP live on the Sunbiz prepaid account: map the card and post-submit pages (row 1). *Needs: a live walk.*
- [ ] V11. IRS EIN live: map the Assignment screen; entity types beyond LLC (row 1). *Needs: a live walk.* Also: once the IRS adapter is complete, a dry run of a formation with an in-run EIN stops at the IRS click and never previews the state's later screens; the preview needs to continue past the EIN with the placeholder.
- [ ] V12. NJ formation and standing live: map the NICUSA checkout (row 1). *Needs: a live walk; card storage (V18).*
- [x] V13. NJ-REG and NYS-100 adapters rebuilt from the walked maps, not the paper forms (row 1). **Done** (both still dry-run only): NYS-100 follows the walked Business Profile and Application screens (spinner waits, the styled Yes/No questions and what they reveal, Validate Address keeping the approved address, the member record, reusing the business's own profile instead of making a second, one more click when a save hangs); NJ-REG follows Welcome through Review (Entity ID and EIN gate, the state record's name check, county and municipality lists, owner dialogs, the 22 Yes/No questions), and its Review page is what the client approves. Attestations and the typed name are entered only on a live run, inside the submit guard, with the client's grant on file. A branch the walks didn't open stops the run before anything is typed. Also fixed: NJ-REG's fiscal month was sent as text. *Left for walks: Ready to Submit and the confirmation (NYS-100), the page after Complete Registration (NJ-REG), and the branches listed in each adapter.*
- [x] V14. MO formation `fill` steps; NY par value; adapters for the mapped NY filings (dissolution, amendment, certificate of change, copies, certificates of status) and NJ for-profit corporation (row 1). **Done as far as the maps go** (all stay dry-run only until their walks): NY par value (form fields; the Tax on Shares quoted from the shares, 1/20 of 1% of total par value, rule in config/fees.json; per-filing price lines no longer read as site changes, while the fee check still compares every line before paying); NJ for-profit corporation (directors, incorporators, stock; new form `nj-corp`); NY dissolution, name change (amendment), certificate of change, copies and certificate of status (five adapters sharing the NY DOS login and draw-down payment, five new forms, fees from the map); Missouri fill steps from the state's guide (tested on replica pages only). E-Submission now uses the account set in settings and checks the balance. *Left for walks: each NY flow's page after Submit, the plain-copy choice, a corporation's name change and change, the par amount field, the NJ corporation's signatures, review and payment pages, and Missouri's real pages (list in src/adapters/mo-formation/adapter.ts).*
- [x] V15. Completion email to the partner or enterprise contact with links to the documents (row 24). **Done**: the completion email attaches the documents (15 MB cap; never screenshots or the SS-4), links to the filing page for portal firms, and goes where H1 says (a partner firm by default).
- [x] V16. Emit `filing.accepted` and `filing.rejected` (row 15). **Done**: `filing.accepted` on the NJ/IRS path; `POST /v1/filings/{id}/outcome` records a later answer (NY receipt, FL examiner, rejection) with the state's documents. Reading the NY receipt inbox automatically comes with email in (V40).

### Step 3: the two Nov 25 decisions
- [x] V17. Review-page approval: a preview pass takes the screenshot, the client approves it, and the live pass must match it before paying. Client-facing, on every adapter (row 5, decision 1). **Done**: new status `previewing`; the approval email attaches the state's review page and the approval page shows it; the live run compares a fingerprint of the page (dates, times, EINs and session ids ignored) before the click past it and, on a difference, takes a new preview instead of paying. Applies to every adapter with a mapped review screen (FL, IRS, NY formation today; others as their review screens are mapped); `approvalPreview: "payload"` keeps the old data-only approval. Also closed a gap: a name picked by an admin no longer files a filing the client never approved.
- [ ] V18. Stored cards: card vault provider, add-card flow, default and backup card used at payment screens, routing per filing type actually read (rows 2, 9, 21, decision 2). *Provider chosen Nov 25: **Basis Theory**. Needs: its public and private API keys.* **Progress:** cards are added in Basis Theory's own fields (enterprise Setup, partner Payment step), kept as tokens only, removable; the card per filing type and the backup are chosen at run time and read from Basis Theory only at the payment screen (`ctx.paymentCards()`); a validator bug that would have refused real Basis Theory token ids is fixed. **Security code done:** PCI rules forbid keeping it, and the client who approves usually doesn't own the card (it's the firm's under G1 "own_account", else the subscriber's), so it is *not* on the approval page. An approved filing whose checkout takes a card waits (`blocked`, `awaitingCardCode`) and the card's owner gets one email per card; they type the code once on "Ready to pay" (dashboard or firm portal) in a Basis Theory field, a token that expires within the hour, and every filing waiting for that card is queued and pays with it. A run starts only with 15 minutes of the code's life left. Also fixed: the saved cards never reached the checkout step (`ctx.paymentCards` was dropped). *Left: each checkout adapter types the card and sets `paysWithCard` (NJ, FL; with the checkout walks, V9-V12); keys `BASIS_THEORY_PUBLIC_KEY` (web) and `BASIS_THEORY_API_KEY` (engine).*

### Step 4: partner front end
- [x] V19. Permanent branded pages `/<partner>/<filing>`, with an editable partner slug shown in setup (row 23). **Done**: `/<firm>/<service>` (for example `/best-accounting/llc-formation-new-york`), listed on the partner's New filing page; "Your web address" in branding setup (reserved site paths and taken addresses refused; the portal and session move with it). Each submission is a new filing that goes through preview and approval; 30 submissions an hour per firm. *Needs `PLATFORM_API_KEY` on the web app.*
- [x] V20. Partner-branded approval page (Keystone's brand appears today) (row 23). **Done**: the approval page shows the firm's name, logo, main color, font and support email; partner firms add "with Keystone Filings".
- [x] V21. Fonts: preset choices and upload (row 20). **Done**: ten presets (Google Fonts) or an uploaded WOFF2, WOFF, TTF or OTF file (600 KB, checked by its bytes), with a live preview in branding setup; used on the portal, client links, public pages and the approval page.
- [x] V22. Partner per-state registered agent and other defaults, and saved defaults skip questions in the forms (rows 25, 27). **Done**: Setup, Registered agents saves one agent per offered state; on New Jersey forms "Our saved agent" is the default answer and the agent questions stay folded; New York and Florida forms come filled in. Applies to the partner's own filings, client links and public pages. (Signer, organizer and other defaults for subscribers are V30.)
- [x] V23. Client address book that prefills repeat filings (row 26). **Done**: "Start from a client you filed for before" on each new filing, built from the firm's earlier filings (one per client email), fills the contact, business and mailing addresses, and the first member, signer and organizer; never the old entity's name or anything sensitive.
- [x] V24. Remove the duplicate questions listed in row 25; "Same as" for people (row 25). **Done**: Florida's correspondence name and email removed (the adapter always used the filing contact); New York's service-of-process notice email defaults to the contact's; the EIN's physical state comes from the physical address; NYS-100's books and charges phones follow "same as the business"; clients no longer see "copy receipts to this email" (the firm gets the copy, V28); "Same person as" copies a name and address already entered (a member, the service-of-process person) into another person. Kept on purpose: NJ-REG's signer and contact, and the EIN's contact and responsible-party phones, which are often different people.
- [x] V25. Partners choose which filings they offer; use the "states you file in" answer (rows 19, 22). **Done**: "Services you offer your clients" in the Your firm step; until a partner chooses, it offers its sign-up states plus the EIN. Unoffered services leave the portal and their public pages.
- [x] V26. Client links can be listed and revoked; resubmitting returns an error, not the old filing. **Done**: Client links lists each link (who it's for, filing, status, a link to its filing once used) with Turn off; a used, turned-off or expired link tells the client so and refuses to send. Links made before this change keep working until they expire.
- [x] V27. "Needs information" filings get a form on the filing page. **Done**: the filing keeps its list of missing answers (`missingInformation`); the page asks for single values and addresses directly, and for people, members and owners offers to start the filing again with the full form.
- [x] V28. The CPA firm's email goes in NY's CC automatically on Keystone-account filings; E-Submission fills CC; the firm's details prefill the contact block (rows 8, 11). **Done**: `src/adapters/copies.ts` picks the CC (the filing's own address, the firm's copy address, a partner's contact email, the subscriber's copy address) for NY online filing and E-Submission; a partner's own filings start with its contact details. The copy-address settings exist (`copyEmail` on firm and subscriber); their screens come with V31.

### Step 5: enterprise
- [x] V29. Secret store for state logins (replacing `EnvVault`), the Connect form, MFA per portal (rows 3, 17). **Done**: logins connected in Setup (username, password, optional authenticator key) are sealed with AES-256-GCM under `DATA_ENCRYPTION_KEY` in `vault_secrets`, write-only through the API, per tenant; the engine reads them before environment variables; Disconnect removes them. *Still to do with the live walks (V9, V12): adapters typing the stored login and authenticator code on each portal's sign-in screen; today sign-ins use browser sessions saved by hand.*
- [x] V30. Per-state defaults the adapters read (registered agent, service of process, signer, organizer, portal defaults) (row 4). **Done**: "Defaults per portal" now fill what a filing leaves unset (NY copies, certificate of existence and E-Submission service level; FL certified copy and certificate of status; NJ reminders and CorpWatch), with provenance; Setup gains "Who's named on your filings" (organizer, filer, signer) and "Your registered agent in each state", which only staff could set before. NYS-100 gets its own NY.gov business login (falls back to the NY DOS one); Missouri's login can be connected too.
- [x] V31. Copy and CC email setting for state websites (row 8). **Done**: "Also send the state's copies to" in enterprise Setup and "Email for the state's copies" in a partner's Your firm step; used for the CC (V28).
- [x] V32. Staff review of enterprise requests in the dashboard: approve, create the account, send an invite email to set a password (row 13). **Done**: Approve and Decline on the Sign-ups page (platform staff only); approving creates the subscriber and its first user and emails a 7-day link to set their own password.
- [x] V33. Subscription billing (Stripe Billing): plans, pricing, enterprise and partner subscriptions (rows 16, 21). *Nov 25: the existing Stripe account is used.* **Done**: an enterprise subscriber and a partner firm each have a Billing page (plan, price read from Stripe, status, renewal date); Subscribe opens Stripe Checkout and Manage billing opens Stripe's customer portal (card, invoices, cancelling). Stripe's signed webhook keeps the status (late events ignored); it's kept apart from settings so a renewal never voids a pending approval. With `BILLING_REQUIRED=true`, a live filing needs a subscription that is active, in a trial or being retried (402 otherwise, with a plain message in the portal and on public pages); practice filings are always free; an enterprise subscriber's firms ride on its plan. Checked end to end against a local Stripe stand-in. *Needs from you: the two prices in Stripe, a restricted key, the webhook's signing secret (setup steps in docs/deploy-fly.md), then `BILLING_REQUIRED=true`.*
- [x] V34. Docs: full OpenAPI schemas with a `webhooks` section, `llms.txt`, a single-file Markdown download, Python samples, no links to private repo files (row 14). **Done**: `/openapi.json` carries the FilingRequest JSON Schema (generated from the engine's own model, also at `GET /v1/schema/filing-request`) and a `webhooks` section with every event and its signed headers; `/docs.md` is every doc in one Markdown file; `/llms.txt` points AI agents at both; Python samples sit next to the JavaScript ones (the Python webhook check was verified against a real engine signature); the private repo link is gone.
- [x] V35. API gaps: cancel, approve through the API, pagination, webhook test delivery and log, 409 on idempotency key reuse with a different payload (row 15, risk 6). **Done**: `POST /v1/filings/{id}/cancel` (partners too, for their own), `POST /v1/filings/{id}/approval`, `limit`/`before` on `GET /v1/filings`, `POST /v1/webhooks/test` and `GET /v1/webhooks/deliveries`, and 409 for a reused key with a different request (filings made before this keep the old behavior). All in the API reference.
- [x] V36. Firm invite links get their own scoped key, not the inviter's session key (risk 5). **Done**: inviting a firm's staff creates their own account, limited to that firm by the engine, with an emailed 7-day link to set their password; no key is in any link. Old invite links no longer sign anyone in.
- [x] V37. Sign in with Google (row 13, "eventually"). **Done**: "Continue with Google" on the log-in page for existing accounts. The web app runs Google's code flow (PKCE, state and nonce in a sealed 10-minute cookie); the engine checks Google's ID token itself (Google's signature from its published keys, our client id, issuer, expiry, nonce, verified email) and signs in the account with that email; a Google-verified email also confirms an unconfirmed account. Clear messages for no account, waiting for approval, cancelled or expired. *Needs from you: a Google OAuth client (setup in docs/deploy-fly.md).*
- [x] V38. Landing page: remove `noindex` when launching, offer title companies, stop freezing env values at build (rows 9, 10). **Done**: indexing is a setting (`SITE_INDEXABLE=true` at launch); title companies can sign up and are named on the landing and sign-up pages; every page reads its settings when served.
- [x] V39. Embedding: decide whether the portal may be framed on a customer's site (`X-Frame-Options: DENY` today) (row 15). **Done** (a drop-in form widget, as decided): a firm pastes `<script src="https://cofile.app/embed.js" data-account data-firm data-service>` and its branded form appears in its own page, sized to the form. Works for partner firms and for a subscriber's firm once "Public pages and website widget" is on (also giving it pages at `/e/<account>/<firm>/<service>`). Public pages and the widget now go through the engine with no key and no web-app platform key; only `/embed` pages may be framed. Forms that need a drawn signature stay on the firm's portal and client links.

### Step 6: channels
- [x] V40. Email in: inbound address to draft filing to prefilled form link (row 6). **Done**: a firm's user emails the request to one address (Resend receiving, signed webhook); we keep the text sealed for that firm and reply with a link. Opening it, Claude picks the filing from the firm's own list and fills in that form from what the email states (nothing guessed; every answer checked against the form's fields, choices and formats; the email is treated as data). The firm checks the form and sends it as usual, then the client approves. Unknown senders get no reply; staff without a firm are pointed to their dashboard; the text is deleted after 30 days. Checked end to end with stand-ins for Resend and the Claude API. Also fixed on the way: pre-filled forms (this and "start from a past client") now fill radio buttons, checkboxes and second and later people. *Needs from you: a receiving domain in Resend (MX record), the webhook's signing secret, `INBOUND_EMAIL_ADDRESS`, and `ANTHROPIC_API_KEY` in the web app.*
- [x] V41. Slack app (row 6). **Done**: firms add the CoFile app to their Slack (OAuth; the workspace token is sealed); anyone there types `/file` and the request. Slack's signature is checked, the person's Slack email must match a CoFile account at a firm, and the private answer links to the form filled in from the message (same path as email: Claude reads it, the firm checks and sends, the client approves). *Needs from you: a Slack app (setup in docs/deploy-fly.md).*
- [x] V42. WhatsApp through the Meta Business Platform (row 6). **Done, through Twilio** (one integration with V43): WhatsApp messages arrive on the same Twilio webhook and are answered the same way. *Needs from you: a WhatsApp sender in Twilio, which includes Meta's business verification.*
- [x] V43. SMS through Twilio with 10DLC registration (row 6). **Done**: people add their mobile number under their account and confirm it with a texted code; a text from that number becomes a request and Twilio's reply carries the link. Twilio's signature is checked; unknown numbers get no answer; a number belongs to one account. Checked end to end with stand-ins for Twilio, Slack and the Claude API. *Needs from you: a Twilio number with A2P 10DLC registration.*

### Step 7: copy and release hygiene
- [x] V44. 20-persona copy review of the full site, best recommendations applied (row 29). *Nov 25: run as 20 separate reviewers, then merge the best changes.* **Done**: 20 separate reviewers, 599 findings, 150 changes kept and 148 applied (263 edits), checked by the tests and in the browser; the coverage table brought up to date. Results, the shared glossary and 19 decisions for you (with recommendations): docs/copy-review-2026-11-26.md.
- [x] V45. CI on push to `main`, and a test gate before the Fly deploy (risk 7). **Done**: `test.yml` runs on pull requests, pushes to `main` and before each deploy; `fly-deploy.yml` deploys only after it passes.

### Found while building
- [x] V46. Forms lost everything typed after an error (React 19 clears a form after its action, so a wrong password emptied the email and a sign-up error emptied the form). **Done**: `web/components/useKeptForm.ts` keeps values on every action form; forms that create something still clear after a success.
