# Design brief: CoFile website (cofile.app)

The shared brief handed to ten independent designers, Nov 26, 2026. Each writes a full design spec
for the whole site as they would design it with every tool, studio, foundry, illustrator, motion
house and technology available. They are not limited to what is easy to build.

## What is fixed and what is open

| | Status |
|---|---|
| **The name** | **CoFile**, at cofile.app (API at api.cofile.app). Never "Keystone" or "Keystone Filings" anywhere a customer can see. |
| **The copy** | **Locked.** Headlines, body text, button labels, legal and consent wording, status names and terms are final. Designers lay out, order, emphasize, chunk, illustrate and animate the existing words; they do not rewrite them. If a designer thinks a word is a problem, they say so in a short "copy notes" appendix, not in the design. Mockups quote the real copy. |
| **The brand** | **Fully open.** Logo, wordmark, mark, color, type, grid, imagery, illustration, photography, 3D, motion, sound, icons, tone of the visuals. The current "paper and ink with manila, green/amber/red, Source Serif 4 + IBM Plex, folder-tab mark" look is only where things stand today; keep, change or discard any of it. |
| **The product and pages** | Fixed in what they do (below). Designers may propose how each page is structured, laid out and navigated, and may propose new surfaces (for example a status page or a filing timeline) if their design needs them. |

## What CoFile is

CoFile fills in government filings (LLC and corporation formations, EINs, employer registrations,
copies and certificates) on the official New York, New Jersey, Florida and IRS websites, screen by
screen, using a browser it drives itself. Before anything is filed, the business owner approves
**the proof**: one page showing every detail, every fee, and where possible the state's own review
page filled in. Only after approval does CoFile submit and pay, and it checks the fee again on the
state's payment screen and stops if anything differs. A state filing can't be taken back, so the
whole product is built on "stop and ask rather than guess".

It is **in beta**. Filing types switch to live one at a time. Until a type is live it runs as a
**rehearsal**: the whole filing performed on the state's real website, stopping before the last
button. Rehearsals are free. Nothing in the design may imply that every filing is live today.

### Two products on one engine

1. **Partner firms (the main public audience):** CPA firms, payroll companies, fractional CFOs and
   title companies. They sign up, set up their firm's **filing desk** (name, logo, colors, fonts,
   registered agent per state, payment cards), then file for their clients. Their clients see the
   firm's brand, not CoFile's: the only sign of CoFile is a small "with CoFile".
2. **Enterprise (platforms and filing companies):** they put CoFile underneath their own product
   through an API, signed webhooks, a white-label setup and an embeddable widget, with their own
   state logins, agents, signers and defaults. They request access through a form; staff set them up.

### The people who see the site

- **Firm owners and staff** (CPA, payroll, CFO, title): busy, cautious, protective of their client
  relationships, often 40 to 65, many not technical. They need to trust it before they put their name on it.
- **Their clients**, the business owners: often first-time founders, on a phone, sometimes
  Spanish-first, sometimes older. They meet only the firm's branded intake form, the proof and emails.
- **Enterprise buyers and developers**: product managers, engineers, AI-agent builders, procurement
  and security reviewers. They read the API docs and the security story.
- **Internal staff** at CoFile (platform tenant): partner sign-ups, enterprise requests, drift reviews.

## The words (current, locked)

| Term | Meaning |
|---|---|
| **the proof** | The client's approval page: every detail, every fee, where possible the state's own review page filled in, and one button. "You've approved a proof before: business cards, letterhead, an invitation at the printer." |
| **rehearsal** | A filing run on the real state website that stops before the last button. Free. "Rehearse on the real stage." |
| **file for real / live filing** | Actually submitted and paid. Needs a subscription. |
| **filing desk** | A partner firm's branded area at `/p/<slug>`. Enterprise accounts have a **dashboard**. |
| **filing type** vs **filing** | "New York LLC formation" is a filing type; one submission is a filing. |
| **Ready to pay** | The page where the card's security code is entered when approved filings are ready to pay (kept an hour at most). |
| **stops before paying** | What happens when the state's page has changed. Never promise "will be submitted" or "filed right away". |
| Coverage labels | "Live", "Rehearsed to the payment screen", "Screens recorded, rehearsal next", "Offered, not yet rehearsed", "Planned". |
| Status colors today | Green = approved, live and the button that moves a filing forward; amber = a rehearsal's planned hold; red = a stop. (The meanings are useful; the colors are open.) |
| log in / log out | Not "sign in". |

## The home page copy, in order (locked)

Read the real file: `web/app/page.tsx`. Its sections, in order:

1. **Hero.** Kicker "For CPA, payroll, fractional CFO and title firms". H1 "Your client approves the
   proof. Then CoFile files it." Sub, CTAs "Run a free rehearsal" and "See what your client sees",
   beta note. A **sample proof** for "Two Sisters Bakery LLC" (example firm "Harbor & Pine CPA",
   NJ LLC formation, fees $100.00 + $3.50 = $103.50, numbered callouts 1 to 4, "Approve for filing").
2. **Process.** "You start it. Your client approves it. CoFile files it." Three steps.
3. **The proof.** "Your client sees what the state will see, before the state does." Six checks,
   including "it does for a business filing what the 8879 does for a return".
4. **Firms.** "Your name on the door. Ours in small print."
5. **Requests.** "Clients don't fill in forms. They text you." A text-message bubble from Ana Ortiz
   read into a drafted filing.
6. **Checks.** "Checked twice. Filed once."
7. **After.** "The papers come back to you." Documents, EIN letter, one record.
8. **Rehearsals.** "Rehearse on the real stage." An example rehearsal log ending "Pay Now: held, on purpose".
9. **Coverage.** "New York, New Jersey, Florida and the IRS." A table of 16 filing types with status labels.
10. **The catch.** "Every filing service has a catch. Here's ours." Five numbered honesty points.
11. **Security.** Five blocks (SSNs, cards in Basis Theory and logins encrypted, single-use proof
    links, signatures only on approval, separate accounts).
12. **Enterprise.** "Building a filing product? Put CoFile underneath it." List plus the inquiry form.
13. **Close.** "Run one rehearsal. Then decide." Tagline "Approve the proof. Then it's filed."

Also on every public page: a slim beta notice (neutral, with no CoFile name, on firms' white-label
pages), and a footer saying CoFile is not a law firm or a government agency, with Terms, Privacy and
hello@cofile.app. No prices are shown publicly.

## Every surface to design

Routes are in `web/app` (Next.js). The design spec should cover all of these.

**Public site:** `/` home; `/signup` (firm sign-up, sets up the filing desk) and `/signup/sent`;
`/login` (one login, routes each user to their desk or dashboard; Google sign-in); `/forgot-password`,
`/reset-password`, `/verify-email`, `/invite-expired`, `/join/<token>`; `/terms`, `/privacy`;
404 and error pages.

**Partner filing desk** (`/p/<slug>`, co-branded with the firm's logo, colors and font):
home/overview; **Setup** guide (details, branding with logo, colors and font presets or upload,
registered agents per state, payments); **New filing** (pick the state, then the filing type, then a
short form with paired fields, optional questions folded, "Same as" for addresses and people);
filing detail (timeline from draft to proof to filed, documents, EIN letter); **Client links**
(send a client a link to fill in the form themselves); **From email** (a request forwarded by
email/text read into a draft for staff to check); **Signatures** (saved signatures, NY forms);
**Ready to pay**; **Billing**; password; signed out.

**Permanent branded service pages:** `/<firm>/<service>`, for example
`cofile.app/bestaccounting/llc-filing-new-york`: a firm's public page for one filing it offers.

**Client-facing pages** (firm's brand, CoFile nearly invisible): the intake form at `/i/<token>`;
**the proof** (approval page, served by the engine at api.cofile.app; the approve button reads
"Approve, and authorize submission and payment", with consents and a no-refund warning on state
fees); approval errors and expired links.

**Enterprise dashboard** (`/dashboard`): overview, API keys, webhooks, filings, firms (and firm
detail), setup (payment routing, state portal logins for NY DOS, NYS-100, NJ, IRS, FL, and portal
defaults), Ready to pay, billing, team, password. The platform tenant also sees partner sign-ups and
enterprise requests.

**White-label surfaces:** `/e/<tenant>/<firm>/<service>` (an enterprise's hosted page) and
`/embed/...` with `embed.js` (the widget a site embeds; no beta banner here).

**Developer docs:** `/docs` (guides), `/docs/reference` (API reference, 25 endpoints),
`/openapi.json`, `/llms.txt` and `/docs.md` (readable by AI agents, downloadable).

**Emails:** approval request ("your proof is ready"), security code needed (link to Ready to pay),
missing information, filing submitted, documents back, EIN issued, sign-up and verification, password
reset, invitations. Sent through Resend.

## The hard design problems

1. **Co-branding at scale.** Thousands of firms pick their own logo, colors and font. Their pages
   must still look professional, pass contrast (a firm may choose a light color behind white button
   text), and keep the status colors meaningful. Design the theming system, not just one theme.
2. **Trust for an irreversible act.** People approve a legal filing and authorize paying a state fee
   that can't be refunded. The proof has to be unmistakable on a phone.
3. **Honest beta.** Make "rehearsal" feel like a strength, and make which filing types are live
   impossible to misread.
4. **Two very different readers on one site:** a 60-year-old CPA and a developer evaluating an API.
5. **Forms that ask for as little as possible** for legal filings with many fields.
6. **Accessibility and plain reading:** older readers, phones, Spanish-first readers, screen readers.

## What each spec must contain

Write it as the designer would hand it to a build team. Cover at least:

1. Who you are and how that shapes this design (short).
2. The concept: the one idea the whole design hangs on, and why it fits CoFile.
3. Brand identity: logo, wordmark and mark (describe precisely enough for an illustrator to draw),
   usage rules, the "with CoFile" co-brand mark.
4. Color: full token set with hex values, light and dark, status colors, contrast notes.
5. Typography: typefaces (any foundry, or commissioned), scale with sizes and line heights, numerals,
   mono for codes and fees.
6. Layout: grid, breakpoints, spacing scale, radii, elevation.
7. Imagery: photography, illustration, 3D, data visuals; what to commission and from whom (by kind,
   not real named people).
8. Motion and interaction: principles, durations and easings, signature moments, reduced motion.
9. Components: buttons, fields, the proof card, status chips, timeline, tables, navigation, banners,
   empty states, toasts, the coverage table.
10. Page by page: every surface above, with layout, what goes where, mobile behavior, and how the
    locked copy sits on the page.
11. The white-label theming system: what a firm controls, guardrails, automatic contrast fixes.
12. Accessibility, localization (Spanish) and dark mode.
13. Production: tools and stack, design-system files, asset list, what to commission, phases.
14. Appendix: what you would push back on in the current site, and copy notes (if any).

Be specific: real hex values, real sizes, real durations, real component states. Prose plus tables
and ASCII wireframes where they help. Original work only: draw on genres and traditions, but don't
recreate any other company's brand or site.

## Files worth reading

- `web/app/page.tsx` (the locked home page copy) and `web/app/landing.css`, `web/app/globals.css` (today's look)
- `docs/scope.md` (the two products and who owns what)
- `docs/copy-review-2026-11-26.md` (the copy decisions; "Words to use" is partly superseded by the table above)
- `web/app/p/[slug]/(portal)/` (the filing desk pages), `web/components/IntakeForm.tsx`, `src/approvals/render.ts` (the proof)
- `web/app/dashboard/(app)/` (enterprise dashboard), `web/app/docs/` (developer docs)
