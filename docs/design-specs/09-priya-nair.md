# CoFile website design spec: "Whose Turn"

**Designer:** Priya Nair, enterprise UX and service design, Toronto
**Date:** November 26, 2026
**Covers:** cofile.app public site, partner filing desks, client-facing pages, the proof, the enterprise dashboard, white-label surfaces, developer docs and emails.
**Status of words:** every quoted string in this document is taken from the repo as it stands today. Where a new component needs a label that doesn't exist yet, I mark it **[new label]** and list it in the Copy notes appendix. I haven't rewritten anything in the design itself.

---

## 1. Who I am, and how that shapes this design

I spent nine years designing tax-preparation and practice-management software for CPA firms, and before that I did field research in accounting offices, payroll bureaus, law firm back offices and title companies. I've sat beside a lot of preparers in February. Most of what I learned comes down to three things:

1. **Professionals don't live on the home page. They live in the queue.** A firm owner reads the marketing site once, maybe twice. The staff member who files for 40 clients a month reads the filing desk every day. So the desk, the filing detail page and the dashboard get as much design care as the hero. They're where the product is either trusted or quietly abandoned.
2. **Most errors happen at handoffs.** In every firm I've studied, things go wrong when work moves from one person to another: preparer to reviewer, firm to client, client back to firm, firm to the government. CoFile's whole promise ("stop and ask rather than guess") is a promise about handoffs. So the design should show each handoff on screen and never leave one implied.
3. **White-label is a system, not a skin.** I've shipped theming for firm-branded client portals used by thousands of firms. Firms will upload a 4,000-pixel JPEG of their letterhead and pick the yellow from their logo for button text. Firms should never have to be designers. The system has to make whatever they choose look professional, and it must never let a brand choice change what a status means.

That's why this spec is built around the service blueprint and the theming algorithm first, and the visual style second.

---

## 2. The concept: Whose Turn

> Every filing is a relay between four hands: **you** (the firm), **your client**, **CoFile** and **the state**. At every moment, on every surface, the design shows whose turn it is and which gate the filing is waiting at.

The locked copy already tells this story. The process heading is "You start it. Your client approves it. CoFile files it." The proof is a gate: "One button. Until it's pressed, nothing is submitted and nothing is paid." The fee check is a second gate: "If the two differ, it stops before paying and tells you why." A rehearsal is the same relay with the last gate held shut on purpose: "Pay Now: held, on purpose."

So the design has one main visual device, the **Turn Line**. It's a horizontal track with stations. A single **baton** (a solid dot) shows where the filing is, and **gates** (short vertical bars) mark the points nothing passes without permission. The same grammar scales:

| Where | Form of the Turn Line |
|---|---|
| Home page hero and process | Large, animated once, explains the product in four seconds |
| Filing desk list rows | A 32 px "turn glyph" next to the status chip |
| Filing detail | The full swimlane blueprint, one lane per hand, every event placed in time |
| The proof (client) | A three-station line: the firm, "You", the state, with the gate drawn right before the approve button |
| Emails | A static four-cell table that renders in every mail client |
| Enterprise dashboard | Counts by whose turn, so an operations lead can see where work is piling up |
| Rehearsal | The same line, with the last gate drawn in violet and the track after it dashed |

**Why it fits CoFile.** CoFile's risk is irreversible: a state filing can't be taken back and state fees generally aren't refunded. People trust an irreversible act when they can see who decided what and in what order. The firm owner wants to know their client approved. The client wants to know nothing happens until they press the button. The developer wants a state machine they can reason about. The Turn Line is all three: a picture of the state machine, drawn so a 62-year-old CPA and a 26-year-old engineer read it the same way.

**The rules that follow from the concept**

1. **Color means status, never brand.** CoFile has no brand color of its own. CoFile is ink on paper; color is kept for status meaning. Firms bring their own color, and the system keeps their color away from status meaning.
2. **Gates are always drawn.** Wherever something waits for a person (approval, a security code, a drift review), the gate glyph appears. Nothing ever seems to "just happen".
3. **The turn is always named in words.** Every glyph, chip and lane has a text label, so the design never depends on color or position alone.
4. **Rehearsal is a state, not an apology.** It has its own color (stage violet), its own pattern (the rehearsal hatch) and its own place on the line: the held gate. It looks deliberate, because it is.

---

## 2A. Service blueprint: one filing, from request to documents back

This is the blueprint the whole design was built from. The example is the one the home page already uses: Ana Ortiz texts Harbor & Pine CPA for a New Jersey LLC for Two Sisters Bakery. "Frontstage" is what a person sees; "backstage" is what CoFile does unseen; the line of visibility sits between them. Status names in the CoFile column are the locked labels from `web/lib/status.ts`. Email subjects are the engine's real subjects from `src/comms/render.ts` and `src/users/routes.ts`.

| # | Client (Ana) | Firm staff | CoFile, frontstage | CoFile, backstage | The state (NJ, IRS) | Surface | Email / message |
|---|---|---|---|---|---|---|---|
| 1 | Texts the firm: "Need an LLC for the bakery. It's me and my sister, 50/50, in Jersey City." | Receives the text on their own phone | | | | (outside CoFile) | SMS, Ana to firm |
| 2 | | Forwards the text to the firm's CoFile number or address | | AI reads the message, picks the filing type, extracts answers | | | Reply to staff with a link |
| 3 | | Opens "Request by text message"; sees "This looks like a request for: **New Jersey LLC formation**." | Shows "We filled in N answers from your message." | | | Desk: From email (`/p/<slug>/from-email/<id>`) | |
| 4 | | Presses "Open the filled-in form"; checks every answer; saved answers (agent, organizer, signer) already filled | Form shows "Filled in from your message…" notice | Firm defaults merged into the form | | Desk: New filing form | |
| 5 | | Presses "Send the proof to my client" | Status **Received**, then **Getting the state's review page** | Drives NJ's site up to its review page; captures it | NJ site shows its review page (nothing submitted) | Desk: filing detail, Turn Line on CoFile | |
| 6 | Gets the email | Sees **Waiting for approval**; "Link to the proof" card shows who it was emailed to | | Signs a single-use link bound to the exact details | | Desk: filing detail | "Your proof is ready to approve: …" with "Open your proof"; state review page attached |
| 7 | Opens the proof on her phone; checks names, address, fees ($100.00 + $3.50 = $103.50) and NJ's own review page | | | | | The proof (`api.cofile.app/approve/<token>`) | |
| 8 | Presses "Approve, and authorize submission and payment" | | "Approval recorded" page | Records consent version, time, IP | | Proof: decision page | |
| 9 | | Card owner gets the email; opens Ready to pay; types the security code; presses "Pay and file" | Status **Approved**; desk notice "1 approved filing is ready to pay…" | Code goes to Basis Theory, kept an hour at most | | Desk: Ready to pay | "Card security code needed: …" with "Enter security code" |
| 10 | | | **Queued**, then **Filing now** | Fills NJ's screens; checks the review page matches the proof; reads the fee on NJ's payment screen and compares it with the proof | NJ portal, screen by screen | Desk: detail, live progress on the state site | |
| 10a | May be asked to approve again | Sees the pause on the desk | **Paused: state site changed** (if NJ changed its form) | Stops before paying; drift review by CoFile staff | | Desk: detail with the calm `paused` tone, not red | "Site changed — review needed: …" to the account's admin channels (see 2B.2) |
| 11 | | | **Submitted to the state** → **Accepted by the state** | Saves NJ's documents to the filing | NJ answers at once | Desk: detail, Documents card | |
| 12 | | | **EIN issued** | Applies with the IRS once the name check passes; saves the IRS letter | IRS EIN assistant | Desk: detail, EIN shown | (no separate email today; see Copy notes) |
| 13 | Gets the documents | Gets the documents; record in one place | **Completed** | Attaches documents to the email | | Desk: detail; optional "Save to Google Docs" | "Completed: …" with "Documents: …. They're attached." |

**In a rehearsal**, rows 9 to 13 change: there's no security code step and no submission. The filing runs every screen and stops at the gate ("Pay Now: held, on purpose"). The client's proof and email both carry "Rehearsal: nothing will be filed or paid, even if you approve."

**What the blueprint told me to design**

- **Row 3 and row 4 are the riskiest handoff**, from an AI draft to a human check. The form has to show which answers came from the message, so the staff member checks those first (see the provenance marks in section 9.2).
- **Row 6 is where firms lose track of things**: "did my client get it?" The filing detail shows the actual send result ("We emailed this link to …" or "This link hasn't been emailed…") on the Turn Line itself, not buried in a card.
- **Row 9 is a hidden second gate.** Today it's only a notice. It gets its own station on the Turn Line ("Ready to pay"), its own count in the desk navigation, and the email lands the card owner straight on it.
- **Row 10a is the moment trust is won or lost.** A stop has to look calm and competent, not broken. So "Paused: state site changed" uses the slate "paused" tone, not red, and the Turn Line shows the baton stopped at the payment gate with CoFile still holding it.
- **Rows 12 and 13 need their own touchpoints.** The engine sends "Completed" today. The blueprint wants "Submitted to the state", "EIN issued" and documents-back as separate moments. I've designed the email slots; the words are for the copy owner.

---

## 2B. Roles, permissions and who hears what

A blueprint is only half the picture without the people around it. These are the roles the product already has (or has in settings), and what each one sees. Roles marked *(settings only)* exist in the onboarding questionnaires but aren't built as permissions yet. The design is ready for them, so no layout changes once they arrive.

### 2B.1 Who sees which surface

| Surface | Firm owner (signed up) | Firm staff (invited) | Card owner | Client (approver) | Enterprise admin | Enterprise operator / viewer *(settings only)* | API key (developer) | CoFile staff (platform tenant) |
|---|---|---|---|---|---|---|---|---|
| Public site, docs | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| Filing desk: Filings, New filing, Client links, Signatures | ✓ | ✓ | if also staff | | | | | |
| Filing desk: Setup, Billing | ✓ | (proposed: owner only) | | | | | | |
| Ready to pay | ✓ | ✓ | ✓ (lands here from the email) | | ✓ | operator | | |
| Intake form, the proof, decision pages | | | | ✓ (by link only) | | | | |
| Dashboard: Overview, Filings, Firms | | | | | ✓ | ✓ | | ✓ |
| Dashboard: API keys, Webhooks, Setup, Team, Billing | | | | | ✓ | viewer: read only | | ✓ |
| Sign-ups and enterprise requests | | | | | | | | ✓ |
| Drift reviews (proposed surface) | | | | | | | | ✓ |
| API (`api.cofile.app`) | | | | | | | ✓ | |

**Design consequences**
- A read-only role sees the same pages with actions removed, not greyed out. A greyed "Pay and file" button invites a click and an error. A viewer instead sees a one-line `paused` note where the action would be **[new label]**.
- The client never logs in. Everything a client sees is reached by a signed, single-use link, so the client frame has no account menu, no "Log out" and no navigation.
- A card owner may not be a desk user at all (an owner's spouse, a firm partner who never files). The "Card security code needed" email therefore lands on Ready to pay through log in, and the pay ticket is readable without any other context: card, filings, field, button.

### 2B.2 Who hears about what

Every engine event, who it goes to (from `src/comms/render.ts`), and where its button lands. This is the email half of the blueprint; section 10.8 gives the template.

| Event | Audience | Subject (locked) | Button (locked) | Lands on |
|---|---|---|---|---|
| `filing.awaiting_approval` | Client | "Your proof is ready to approve: {title}" | "Open your proof" | The proof |
| `filing.information_required` | Client | "More information needed: {title}" | (none) | (reply to the firm) |
| `filing.card_code_needed` | Card owner | "Card security code needed: {title}" | "Enter security code" | Ready to pay |
| `filing.changes_requested` | Client | "Changes requested: {title}" | (none) | |
| `filing.completed` | Client | "Completed: {title}" | (link to the filing page where the firm has a desk) | Filing detail |
| `filing.rejected` | Client | "Rejected by the state: {title}" | (none) | |
| `filing.name_options_ready` | Admin | "Choose a name: {title}" | "Choose a name" | Name choice page |
| `filing.review_gate` | Admin | "Review before submit: {title}" | "Review the filing" | Review page |
| `filing.drift_halted` | Admin | "Site changed — review needed: {title}" | (none) | Filing detail |
| `filing.failed` (bot check) | Admin | "Portal bot check: {title}" | (none) | Filing detail |
| `filing.failed` | Admin | "Failed: {title}" | (none) | Filing detail |
| `filing.blocked` | Admin | "Blocked: {title}" | (none) | Filing detail |
| `filing.needs_reconciliation` | Admin | "Checking whether the state received: {title}" | (none) | Filing detail |
| Sign-up | Firm owner | "Confirm your email for CoFile" | | `/verify-email` |
| Partner approved | Firm owner | "Your partner account is open" | | `/login` |
| Enterprise approved | Enterprise admin | "Your CoFile account is ready" | | set password |
| Password reset | Any user | "Reset your password" | | `/reset-password` |
| Invitation | Firm staff | "You're invited to {firm}'s filing portal" | | `/join/<token>` |

"Admin" means the account's admin channels (`adminChannels` in the account settings). For an enterprise, those are its own staff. For a partner firm, as the code reads today, the account is CoFile's own platform account, so **staff notices about a firm's filing reach CoFile's staff, not the firm**. The firm learns about a stop only by opening its desk. The design routes every admin notice for a partner firm's filing to that firm's own users as well (the desk already knows them), and keeps CoFile staff copied. This is a product change, flagged in the pushback list.

**Gaps the blueprint exposes** (design slots ready; words needed, see Copy notes): no "Submitted to the state", no "EIN issued", and staff emails without a button. Every staff email should land on the filing detail page, where the Turn Line explains the stop. I've designed every admin template with a button slot; it hides when the engine sends no link.

---

## 3. Brand identity

### 3.1 The mark: the Gate

The CoFile mark is a dot waiting at a line. It shows the product's single promise: the filing (the dot) waits at the gate (the bar) until someone says go.

**Construction, on a 24 × 24 unit grid:**

| Element | Geometry |
|---|---|
| Dot | Perfect circle, centre (8, 12), radius 4.5 units |
| Bar | Rectangle x 15 to 19, y 3 to 21 (4 × 18 units), fully rounded ends (radius 2) |
| Gap | 2.5 units between the dot's right edge (12.5) and the bar's left edge (15). The dot never touches the bar. |
| Optical balance | Dot area 63.6 u², bar area 69.4 u²; the dot sits on the bar's exact vertical centre |
| Colour | One colour only: ink `#111A21` on light, paper `#EDEFEA` on dark. Never two colours, never a gradient |

Drawn at 16 px (favicon) the gap is 1.67 px. The 16 px master is hinted separately so the gap is exactly 2 px and the bar 3 px wide.

**The wordmark.** "CoFile", custom lettering commissioned from an independent type studio, drawn from the skeleton of Atkinson Hyperlegible Next Bold (the UI face, section 5) but with tightened spacing (−1.5% tracking at display size), a flat-terminal C, and an **i whose dot is a true circle**, 1.3× the stem width. Next to the stem of the l that follows it, the i-dot rhymes with the Gate mark. It's a quiet detail, never coloured or animated separately. Cap height to x-height 1 : 0.74; the F's middle arm is 88% of the top arm.

**Lockups**

| Lockup | Use | Spacing |
|---|---|---|
| Horizontal (mark + wordmark) | Public site header, docs, dashboard, account emails | Mark height = wordmark cap height × 1.45; gap = 0.6 × dot diameter |
| Mark alone | Favicon, app icon, social avatar, loading state | Clear space = 1 dot diameter on every side |
| "with CoFile" co-brand mark | Every firm-branded page and email | See 3.2 |

**Usage rules**

- Minimum size: horizontal lockup 80 px wide; mark alone 16 px.
- Clear space: one dot diameter around the lockup, two around the mark when it's used as an app icon.
- Never put the mark in a status colour. Green, violet, amber, red and blue are reserved for meaning.
- Never animate the mark except with the official "baton" motion (section 8.3), and only on CoFile's own pages.
- Never place the mark on a photo without a paper plate behind it.
- Never put the mark or wordmark on a firm's page at more than 14 px tall.

### 3.2 The "with CoFile" co-brand mark

On every page a firm's client sees (intake, the proof, permanent service pages) and in every client email, CoFile appears once, as a small "with CoFile" (the existing copy: "The only sign of us is a small 'with CoFile'").

| Property | Value |
|---|---|
| Composition | Mark at 12 px + 6 px gap + "with CoFile" in Atkinson Hyperlegible Next 500, 13 px / 16 px |
| Colour | `--ink-3` (`#5A636C` light, 6.1:1 on white; `#98A0A7` dark, 6.5:1). Never the firm's colour, never smaller than 13 px |
| Position, desktop | Right end of the firm header, baseline-aligned with the firm name |
| Position, phone | Header right if the firm name is 18 characters or fewer; otherwise in the page footer, centred |
| Link | Goes to cofile.app in a new tab, with `aria-label` "with CoFile (opens in a new tab)" |
| In the widget | The existing "Filed with CoFile" line, same style, at the bottom of the frame |
| On white-label enterprise pages | Absent unless the enterprise opts in; the enterprise's own name and support contact appear instead |

It must stay legible. I've seen "powered by" marks pushed down to 10 px grey on grey. This one passes AA and stays a real link, because a client who wants to know who handles their SSN deserves to be able to find out.

### 3.3 Brand voice in visuals

Ink on paper, with color only where it means something. Plain diagrams that a first-year staff accountant could draw on a whiteboard. Dry and specific, like the copy ("You do the advising. We do the typing."). No mascots, no handshake photos, no gradient glows, no fake dashboards with invented numbers.

---

## 4. Color

### 4.1 Principles

- **CoFile is ink and paper.** CoFile's own primary button is ink. It recedes on purpose, because on most of the pages that matter the brand in charge is the firm's.
- **Six status tones, fixed everywhere.** No firm, enterprise or theme can change them. Each has a text/icon colour, a tint for backgrounds and a line colour.
- **Every status colour passes 6:1 on its own tint**, not just 4.5:1, because status chips are small and many readers are over 60.
- **Colour never works alone.** Every tone also has an icon shape and a word.

### 4.2 Neutral tokens

| Token | Light | Dark | Use | Contrast notes |
|---|---|---|---|---|
| `--paper` | `#F6F6F2` | `#0E1317` | Page background | |
| `--surface` | `#FFFFFF` | `#151B21` | Cards, forms, the proof sheet | |
| `--surface-sunk` | `#EEEFEA` | `#1C232A` | Table headers, wells, code blocks in prose | |
| `--surface-raised` | `#FFFFFF` + shadow | `#1C232A` + line | Popovers, sheets | |
| `--line` | `#DADCD5` | `#2C353E` | Dividers, card borders (decorative) | Decorative only |
| `--line-strong` | `#7F857D` | `#6A747E` | Input borders, checkbox outlines, focusable edges | 3.27:1 on sunk, 3.78:1 on white; dark 3.64:1 (WCAG 1.4.11) |
| `--ink` | `#111A21` | `#EDEFEA` | Body text, headings, CoFile primary button | 17.6:1 on white; dark 15.0:1 |
| `--ink-2` | `#3F4851` | `#BCC2C6` | Secondary text, labels | 9.3:1; dark 9.6:1 |
| `--ink-3` | `#5A636C` | `#98A0A7` | Captions, meta, "with CoFile" | 6.1:1; dark 6.5:1 (the lowest text colour allowed) |
| `--on-ink` | `#FFFFFF` | `#0E1317` | Text on the ink button | 17.6:1 |
| `--ink-hover` | `#27313A` | `#D5D9D4` | Ink button hover | White on it 13.2:1 |
| `--focus-outer` | `#111A21` | `#EDEFEA` | Focus ring, outer 2 px | |
| `--focus-inner` | `#FFFFFF` | `#0E1317` | Focus ring, inner 2 px | Works on any firm colour |
| `--selection` | `#DCE6F7` | `#24344D` | Text selection, selected table row | |

### 4.3 Status tones

| Tone | Meaning | Icon shape | Text/icon (light) | Tint (light) | Line (light) | Text/icon (dark) | Tint (dark) | Line (dark) | Ratio on tint (L / D) |
|---|---|---|---|---|---|---|---|---|---|
| `done` | Approved, accepted, completed, live | Check in a circle | `#17633A` | `#E2F2E7` | `#9DCFAE` | `#6CCF97` | `#10281B` | `#2F6B49` | 6.3 / 8.2 |
| `act` | Someone has to act (turn names who) | Filled dot inside a ring ("your move") | `#874600` | `#FCEFD9` | `#EBC07D` | `#F0B65E` | `#2D200F` | `#77561F` | 6.4 / 8.7 |
| `progress` | CoFile or the state is working | Ring with a quarter arc | `#1B52AD` | `#E6EEFB` | `#A8C1EE` | `#8EB2FF` | `#132137` | `#34507F` | 6.3 / 7.7 |
| `held` | A rehearsal's planned hold | The Gate (dot + bar) | `#5F33AB` | `#EFE8FB` | `#C4AEEE` | `#BFA2FF` | `#231939` | `#54428A` | 6.9 / 7.7 |
| `paused` | CoFile stopped to check something (safety stop) | Two short bars | `#47525E` | `#ECEFF2` | `#C2C8D0` | `#ADB6C0` | `#1E252D` | `#46505B` | 6.9 / 7.5 |
| `stop` | It stopped and needs fixing | Square with a horizontal bar | `#AE231C` | `#FBE7E5` | `#EFAFA9` | `#FF968C` | `#33141A` | `#7A3A3A` | 5.8 / 8.0 |

**Why violet for rehearsal, not amber.** Amber reads as "caution". A rehearsal isn't a warning; it's a deliberate, free, complete run that stops before the last button. Violet is a stage colour: theatrical, calm and unlike any of the other tones. Under the three common colour-vision deficiencies it stays apart from `done` green (it reads blue where green reads ochre), and it always comes with the Gate icon and the rehearsal hatch (section 7.4).

**Why slate for "Paused: state site changed".** That pause is CoFile doing its job. Red would tell the firm something broke, and that would be wrong. Red is kept for real stops: "Failed", "Rejected by the state", "Stopped", "Needs correcting".

### 4.4 Every status name, its tone and whose turn it is

| Status label (locked) | Tone | Turn |
|---|---|---|
| Received | progress | CoFile |
| Needs correcting | stop | You |
| Needs information | act | You |
| Getting the state's review page | progress | CoFile |
| Waiting for approval | act | Your client |
| Changes requested | act | You |
| Approved | done | CoFile, or You when it's waiting on the card's security code |
| On hold | paused | CoFile |
| Queued | progress | CoFile |
| Filing now | progress | CoFile |
| Paused: state site changed | paused | CoFile |
| Name unavailable | act | You |
| Final check | progress | CoFile |
| Submitted to the state | progress | The state |
| Accepted by the state | done | (none: finished) |
| EIN issued | done | (none) |
| Rejected by the state | stop | You |
| Completed | done | (none) |
| Failed | stop | You |
| Stopped | stop | You |
| Being checked | paused | CoFile |

Coverage labels map the same way: "Live" is `done`, with a solid dot; "Rehearsed to the payment screen" is `held`; "Screens recorded, rehearsal next" is `progress`, outlined; "Offered, not yet rehearsed" is `paused`, outlined; "Planned" is `paused`, with a dashed outline.

### 4.5 Data and code colours

The enterprise dashboard's charts use a separate, non-status categorical set, so a bar for "New Jersey" never looks like an approval: `#3D4A8F` indigo, `#2B7A78` sea, `#8A6D1E` ochre, `#7A4A6B` plum, `#4E6B3A` moss, at 4.5:1 or more on white, with lighter steps for dark mode (`#9DA8F0`, `#7CCBC8`, `#D9BC6A`, `#D4A2C3`, `#A8C98F`).

Code blocks (docs, the enterprise section) use an ink ground: background `#111A21`, text `#E4E7E1`, keys `#C9D2DC`, strings `#A9D8B8`, numbers `#E9C88C`, comments `#8D969E` (5.1:1). In dark mode the code ground drops to `#0A0E11` with the same foregrounds.

### 4.6 Firm colours

Firm colours are never tokens CoFile defines. They're computed per firm by the theming algorithm (section 11) into `--firm-accent`, `--firm-on-accent`, `--firm-accent-hover`, `--firm-tint`, `--firm-link`, and the same set in dark mode. Firm colours are used for: the primary button, the 4 px header rule, the selected nav item's left bar, links, focus halos inside forms, and the turn baton on firm pages. They're never used for status chips, alerts, the rehearsal band, destructive actions or fees.

### 4.7 Token excerpt (as built)

```css
:root {
  --paper: #F6F6F2; --surface: #FFFFFF; --surface-sunk: #EEEFEA;
  --line: #DADCD5; --line-strong: #7F857D;
  --ink: #111A21; --ink-2: #3F4851; --ink-3: #5A636C; --on-ink: #FFFFFF; --ink-hover: #27313A;
  --focus-inner: #FFFFFF; --focus-outer: #111A21; --selection: #DCE6F7;

  --done: #17633A;     --done-tint: #E2F2E7;     --done-line: #9DCFAE;
  --act: #874600;      --act-tint: #FCEFD9;      --act-line: #EBC07D;
  --progress: #1B52AD; --progress-tint: #E6EEFB; --progress-line: #A8C1EE;
  --held: #5F33AB;     --held-tint: #EFE8FB;     --held-line: #C4AEEE;
  --paused: #47525E;   --paused-tint: #ECEFF2;   --paused-line: #C2C8D0;
  --stop: #AE231C;     --stop-tint: #FBE7E5;     --stop-line: #EFAFA9;

  /* Firm slots: CoFile's own pages fall back to ink. Firm pages get computed values (11.2). */
  --firm-accent: var(--ink); --firm-on-accent: var(--on-ink); --firm-accent-hover: var(--ink-hover);
  --firm-tint: #EEF0EC; --firm-link: var(--ink); --firm-deep: var(--ink); --firm-rule: var(--ink);

  --voice: "Newsreader", "Iowan Old Style", "Palatino Linotype", Georgia, serif;
  --hand: "Atkinson Hyperlegible Next", "Segoe UI", system-ui, -apple-system, Roboto, sans-serif;
  --record: "Atkinson Hyperlegible Mono", "SF Mono", "Cascadia Mono", Consolas, monospace;
}
@media (prefers-color-scheme: dark) {
  :root:not([data-theme="light"]) {
    --paper: #0E1317; --surface: #151B21; --surface-sunk: #1C232A;
    --line: #2C353E; --line-strong: #6A747E;
    --ink: #EDEFEA; --ink-2: #BCC2C6; --ink-3: #98A0A7; --on-ink: #0E1317; --ink-hover: #D5D9D4;
    --focus-inner: #0E1317; --focus-outer: #EDEFEA; --selection: #24344D;
    --done: #6CCF97; --done-tint: #10281B; --done-line: #2F6B49;
    --act: #F0B65E; --act-tint: #2D200F; --act-line: #77561F;
    --progress: #8EB2FF; --progress-tint: #132137; --progress-line: #34507F;
    --held: #BFA2FF; --held-tint: #231939; --held-line: #54428A;
    --paused: #ADB6C0; --paused-tint: #1E252D; --paused-line: #46505B;
    --stop: #FF968C; --stop-tint: #33141A; --stop-line: #7A3A3A;
    --firm-tint: #1E252D;
  }
}
/* The same dark block repeats under :root[data-theme="dark"] for the manual override. */
```

---

## 5. Typography

### 5.1 Three voices

The type system has one rule that matters for white-label: **three roles, and only one of them belongs to the brand.**

| Role | What it sets | CoFile pages | Firm pages | Typeface |
|---|---|---|---|---|
| **Voice** | Public headlines, email headlines, the firm name in the header | Newsreader Display | The firm's chosen font | Newsreader (Production Type), optical sizes 6 to 72 |
| **Hand** | Everything the user reads and does: body, labels, buttons, nav, tables, help | Atkinson Hyperlegible Next | Same, always | Atkinson Hyperlegible Next (Braille Institute), variable 200 to 800 |
| **Record** | What goes to the state or comes back from it: values on the proof, fees, EINs, filing references, codes, API | Atkinson Hyperlegible Mono | Same, always | Atkinson Hyperlegible Mono (Braille Institute) |

Put simply: **the firm's font gives the firm its voice, and our fonts set the facts.** A firm that uploads a decorative script still gets a proof whose fees are set in a typeface built so that 0 and O, 1 and l, and 5 and S can't be confused. That matters when an EIN or a total of "$103.50" is the thing being approved.

Why these faces:
- **Atkinson Hyperlegible Next** was designed for low-vision readers. Its letters are told apart by shape, not just by size. It has a big x-height, Latin Extended (all Spanish characters including ¿ ¡ ñ ü) and real tabular figures. It reads clearly at 16 px on a cheap Android phone in sunlight, which is where many clients will meet the proof.
- **Atkinson Hyperlegible Mono** shares the Next skeleton, so the values on the proof sit naturally beside their labels instead of looking like code.
- **Newsreader Display** gives the public site the gravity of a printed document, without the manila-folder nostalgia of today's look. It sets headlines with authority at 64 px and stays readable at 28 px in emails. It's open-licensed, which matters because every firm email carries the Voice role fallback.

**Fallback stacks**
- Voice: `"Newsreader", "Iowan Old Style", "Palatino Linotype", Georgia, serif`
- Hand: `"Atkinson Hyperlegible Next", "Segoe UI", system-ui, -apple-system, Roboto, sans-serif`
- Record: `"Atkinson Hyperlegible Mono", "SF Mono", "Cascadia Mono", Consolas, monospace`

### 5.2 Scales

**Public site (base 18 px)**

| Style | Face, weight | Desktop size / line | Tablet | Phone | Tracking |
|---|---|---|---|---|---|
| Display (H1) | Newsreader 560, opsz 72 | 64 / 68 | 48 / 52 | 38 / 42 | −0.015em |
| Section (H2) | Newsreader 560, opsz 48 | 44 / 50 | 36 / 42 | 30 / 36 | −0.01em |
| Sub-head (H3) | Atkinson Next 700 | 22 / 28 | 21 / 28 | 20 / 26 | 0 |
| Kicker | Atkinson Next 700, all caps | 14 / 18 | 14 / 18 | 13 / 18 | +0.06em |
| Lede | Atkinson Next 400 | 21 / 32 | 20 / 30 | 19 / 28 | 0 |
| Body | Atkinson Next 400 | 18 / 28 | 18 / 28 | 17 / 26 | 0 |
| Small | Atkinson Next 400 | 15 / 22 | 15 / 22 | 15 / 22 | 0 |
| Caption | Atkinson Next 500 | 14 / 20 | 14 / 20 | 14 / 20 | +0.01em |

**Filing desk and dashboard (base 16 px)**

| Style | Face, weight | Size / line |
|---|---|---|
| Page title | Atkinson Next 700 | 28 / 34 |
| Section title | Atkinson Next 700 | 20 / 26 |
| Group title | Atkinson Next 700 | 17 / 24 |
| Body | Atkinson Next 400 | 16 / 24 |
| Label | Atkinson Next 600 | 15 / 20 |
| Help | Atkinson Next 400 | 14 / 20 |
| Table | Atkinson Next 400 | 15 / 22 (rows 48 px tall) |
| Meta (minimum) | Atkinson Next 500 | 13 / 18, never for anything you must read to act |
| Record values | Atkinson Mono 400 | 15 / 22 |
| Stat number | Atkinson Next 700, tabular | 36 / 40 |

**Client pages and the proof (base 17 px, phone first)**

| Style | Face, weight | Size / line |
|---|---|---|
| Firm name in header | Voice (firm font) 600 | 18 / 24 |
| Filing title | Atkinson Next 700 | 26 / 32 (phone), 32 / 38 (desktop) |
| Section heading | Atkinson Next 700 | 20 / 26 |
| Field label (on proof) | Atkinson Next 600 | 15 / 20, `--ink-2` |
| Field value (on proof) | Atkinson Mono 400 | 17 / 26, `--ink` |
| Fee line | Atkinson Mono 400, tabular | 17 / 26, right-aligned |
| Fee total | Atkinson Mono 700, tabular | 22 / 28 |
| Consent note | Atkinson Next 400 | 17 / 26 |
| Approve button | Atkinson Next 700 | 18 / 24 |

### 5.3 Numerals, fees and codes

- Fees always use **tabular lining figures** (`font-variant-numeric: tabular-nums lining-nums`), two decimals, with the dollar sign hung outside the column so decimal points line up: `$100.00` over `  $3.50`.
- Totals get a 2 px ink rule above them, never a coloured box.
- EINs are shown as `XX-XXXXXXX` in Record, with a "copy" button beside them; SSNs are always masked in Record as `***-**-1234`.
- Filing references and API ids are set in Record at 0.92 em, with a thin space every 8 characters on screen only (copying gives the raw id).
- Codes the user types (one-time code, security code) use Record at 24 px with 0.2em letter spacing, so a reader can check each digit.

---

## 6. Layout

### 6.1 Grid and breakpoints

| Name | Range | Columns | Gutter | Margin | Content max |
|---|---|---|---|---|---|
| `xs` | 0 to 479 | 4 | 16 | 16 | 100% |
| `sm` | 480 to 767 | 6 | 16 | 24 | 100% |
| `md` | 768 to 1023 | 8 | 24 | 32 | 100% |
| `lg` | 1024 to 1439 | 12 | 24 | 40 | 1200 |
| `xl` | 1440+ | 12 | 32 | auto | 1200 (public), 1360 (desk, dashboard) |

- **Reading measure** is capped at 68 characters for body text (about 640 px at 18 px) and 60 characters for the proof.
- **The app shell** (desk and dashboard) uses a 248 px left rail at `lg` and up, collapsing to a 64 px icon rail at `md`, and a top bar with a menu sheet below `md`.
- **The proof and intake** use a single centred column, 640 px max, at every size. They never go multi-column, because a legal approval should read top to bottom.

### 6.2 Spacing scale

4 px base: `2, 4, 8, 12, 16, 20, 24, 32, 40, 48, 64, 80, 96, 128`. Tokens `--s-0` to `--s-13`.
- Field to field inside a group: 20. Group to group: 40. Section to section on the public site: 128 desktop, 80 phone.
- Table cell padding: 12 vertical, 16 horizontal. Touch targets: 44 × 44 minimum in the desk, **48 × 48 minimum on client pages**.

### 6.3 Radii

| Token | Value | Use |
|---|---|---|
| `--r-xs` | 4 | Chips' inner icon plates, code spans |
| `--r-sm` | 6 | Inputs, buttons, checkboxes (3) |
| `--r-md` | 10 | Cards, notices, table containers |
| `--r-lg` | 16 | The proof sheet, sheets and dialogs |
| `--r-pill` | 999 | Status chips, the baton, the turn glyph |

Buttons and chips are deliberately different shapes: **buttons are rectangles that do something; chips are pills that say something.** On a firm whose brand colour is close to a status colour, shape is what keeps them apart.

### 6.4 Elevation

| Level | Light | Dark | Use |
|---|---|---|---|
| 0 | none, 1 px `--line` | 1 px `--line` | Default cards |
| 1 | `0 1px 2px rgba(17,26,33,.06), 0 0 0 1px #DADCD5` | `--surface` + 1 px `#2C353E` | Table containers, filing cards |
| 2 | `0 8px 24px -8px rgba(17,26,33,.18), 0 0 0 1px #DADCD5` | `#1C232A` + 1 px `#3A444E` | Popovers, menus, toasts |
| 3 | `0 24px 64px -16px rgba(17,26,33,.32)` | `#1C232A` + 1 px `#3A444E` + scrim `rgba(0,0,0,.6)` | Dialogs, the mobile nav sheet |
| Proof | `0 1px 0 #DADCD5, 0 18px 40px -24px rgba(17,26,33,.35)` | `#151B21` + 1 px `#2C353E` | The proof sheet: it should look like one physical page |

---

## 7. Imagery

### 7.1 What we show, and what we don't

The product's real artifacts are more persuasive than any stock photo: the proof, the state's review page, the rehearsal log, the coverage table, the papers coming back. **The imagery is the product, drawn carefully.** No stock photography at all. No photos of handshakes, laptops on lawns, or gavels.

### 7.2 Kinds of imagery

| Kind | What | Style | Commission from |
|---|---|---|---|
| **Blueprint diagrams** | The Turn Line in its large forms (hero, process, After, Checks) | 1.5 px ink lines on paper, stations as 10 px circles, gates as 4 × 22 px bars, lane labels set in Hand caps. No perspective, no isometric, no shading | A technical illustrator who draws transit maps or wayfinding diagrams, working inside the design system's SVG templates |
| **Specimen sheets** | The sample proof, a redrawn state review page, the rehearsal log, a state document and the EIN letter, as seen on the home page | Built as live HTML components, not pictures, so they're crisp, translatable and accessible. State pages are **simplified redraws** labelled as samples, never screenshots passed off as live | In-house, from the component library |
| **Firm theme fans** | The same proof in three firm themes, fanned like paper swatches (section "Firms") | Rendered from the real theming engine with three sample palettes applied to the one example firm, "Harbor & Pine CPA" | In-house |
| **Spot icons** | 48 icons: status shapes, the Gate, document types, security blocks, channels (email, text, WhatsApp, Slack) | 24 px grid, 1.75 px stroke, rounded joins, 2 px corner radius, no fills except the status dot and Gate | An icon studio that has drawn a public-sector or banking icon set |
| **Portrait series (Phase 4, optional)** | Real firm staff at their own desks: a CPA, a payroll specialist, a title closer, with consent and named on the caption | Documentary, natural light, 35 mm, no posing at laptops. Used only on a future "Firms" story page, never on the proof or intake | A documentary photographer through an agency, with model releases |

### 7.3 Data visuals

- **The coverage ladder** (section 9.11): each filing type on a five-step track from "Planned" to "Live".
- **Turn counts** on the desk and dashboard: horizontal stacked bars by whose turn, never pie charts.
- **Enterprise charts**: by status, by state and by month, as horizontal bars with direct labels and tabular numbers. Charts never use status colours for categories; status bars use the status tone and its icon in the label.

### 7.4 The rehearsal hatch

A secondary, non-colour signal for anything in rehearsal: 45° lines, 1 px, 8 px apart, in `--held` at 10% opacity (light) or 14% (dark), laid over the `held` tint. It's used on the rehearsal band on the proof and intake, the rehearsal banner in the new filing form, the "held" segment of the Turn Line, and the home page's rehearsal log. Never on text smaller than 17 px, and never behind body copy. The hatch sits in a 12 px strip at the band's left edge, so text stays on a clean tint.

---

## 8. Motion and interaction

### 8.1 Principles

1. **Motion explains a handoff, or it doesn't happen.** The only things that move are the baton (a filing changing hands), gates (opening or holding) and content arriving.
2. **Nothing moves on the proof except feedback to your own touch.** No entrance animations on the approval page.
3. **Calm over clever.** No bounce, no parallax and no decorative loops. The only thing that ever repeats is the pending ring on a button you just pressed, and after 10 seconds even that gives way to words (see 9.13).

### 8.2 Tokens

| Token | Duration | Easing | Use |
|---|---|---|---|
| `--t-instant` | 80 ms | linear | Pressed states, checkbox marks |
| `--t-quick` | 140 ms | `cubic-bezier(.2, 0, 0, 1)` | Hover, focus ring, chip changes |
| `--t-standard` | 220 ms | `cubic-bezier(.2, 0, 0, 1)` | Folds opening, menus, toasts in |
| `--t-exit` | 160 ms | `cubic-bezier(.4, 0, 1, 1)` | Anything leaving |
| `--t-baton` | 560 ms | `cubic-bezier(.65, 0, .35, 1)` | The baton travelling between stations |
| `--t-gate` | 240 ms | `cubic-bezier(.2, 0, 0, 1)` | A gate drawing shut, or opening |
| `--t-story` | 900 ms | `cubic-bezier(.65, 0, .35, 1)` | Home page sequences only |

### 8.3 Signature moments

| Moment | Where | What happens |
|---|---|---|
| **The handoff** | Hero, process section | On first view, the baton leaves "You" and slides to "Your client" (`--t-baton`). It waits 400 ms, then the gate draws in from the top (`--t-gate`). It runs once; the hero is still afterwards. |
| **Two readings match** | Checks section | Two fee readouts, "$103.50" from the proof and "$103.50" from the state's payment screen, slide together until their decimal points align. Then a 1 px ink rule draws between them and a small check appears. If you scroll back up, it doesn't replay. |
| **Held, on purpose** | Rehearsals section | The rehearsal log fills in line by line (one line per 120 ms). The last line, "Pay Now: held, on purpose", arrives in violet; the Gate icon draws, then the hatch fades in over 300 ms. |
| **Live status** | Filing detail | When a status changes while the page is open (server-sent events), the baton moves to its new station and the new event slides into the blueprint lane at `--t-standard`. A polite live region announces the new status label. |
| **Code accepted** | Ready to pay | After "Pay and file" succeeds, a 60-minute ring appears around the card's icon and empties over the hour, showing how long the code is kept ("kept an hour at most"). It's a real countdown, not decoration. |

### 8.4 Interaction rules

- **Buttons**: pressed state scales the label by 0.98 and darkens the fill one step, with no ripple. A pending button keeps its width, swaps its label for the existing pending text ("Sending…", "Saving…", "Creating…") and shows a 14 px progress ring.
- **Double-submit**: every form that creates or approves something disables its submit on the first press and uses the existing nonce.
- **Folds** ("More options (optional)", folded sections) open with a height transition at `--t-standard` and move focus to the first field inside.
- **Optimistic UI** is never used for anything that reaches a state. A filing's status changes on screen only when the engine says it changed.

### 8.5 Reduced motion

With `prefers-reduced-motion: reduce`, the baton jumps without travelling, gates appear without drawing, sequences show their final frame, and the Ready to pay ring becomes a text countdown, "[n] minutes" **[new label]**. Durations become 0 ms except focus and hover colour changes (80 ms), which help orientation. There are no autoplaying videos anywhere, so nothing else needs to change.

---

## 9. Components

Every component exists in three themes (CoFile light, CoFile dark, firm-themed light and dark) and is tested against the 24-firm stress set (section 13.3).

### 9.1 Buttons

| Variant | Fill | Text | Border | Use |
|---|---|---|---|---|
| Primary (CoFile) | `--ink` | `--on-ink` | none | "Run a free rehearsal", "Create account", "Log in" |
| Primary (firm) | `--firm-accent` | `--firm-on-accent` | none | "New filing", "Send the proof to my client", "Send to {firm}", the approve button |
| Secondary | `--surface` | `--ink` | 1 px `--line-strong` | "See what your client sees", "Request changes", "Copy link" |
| Quiet | transparent | `--ink-2`, underlined on hover | none | "Use a link instead", "Log out" |
| Destructive | `--surface` | `--stop` | 1 px `--stop-line` | "Remove", "Turn off", "Disconnect". Never filled, never firm-coloured |

**Sizes**: small 32 px tall (desk tables only), 14 px text, 12 px side padding; medium 44 px, 16 px text, 20 px padding; large 56 px, 18 px text, 24 px padding, full width under `sm`. **States**: default, hover (`--t-quick` fill step), focus (double ring: 2 px `--focus-inner` then 2 px `--focus-outer`, offset 0), pressed, pending (ring + existing pending label), disabled (40% opacity of the label only; the fill stays and `aria-disabled` explains why in a tooltip). Buttons always name a verb in the existing copy; they're never icon-only, except the copy buttons, which carry an `aria-label`.

### 9.2 Fields

- **Text input**: 48 px tall (client), 44 px (desk); 1 px `--line-strong`; `--r-sm`; label above, never a placeholder used as a label; help below in Help style. **Focus**: border goes to 2 px `--firm-accent` (or ink) plus the double ring. **Error**: 2 px `--stop` border, a stop-shape icon before the message, and the message joined to the input with `aria-describedby`. The locked error pattern ("{issue}. {help}") is kept.
- **Required marker**: today's `*` stays, with the locked line "Fields marked * are required." set as the first line of the form. The asterisk is `--ink-2`, not red, because red means stop.
- **Paired fields** (`field-row`): two or three fields side by side on `md` and up, stacked on phones. City, State and ZIP go 6/3/3 columns.
- **Same as / Same person as**: a row of secondary small buttons above the address or person block, prefixed with the locked label "Same as" or "Same person as". Pressing one fills the block, flashes the filled fields' tint for 600 ms and announces "[n] fields filled" **[new label]**.
- **Provenance marks** (for drafts from email or a past client): a 3 px left bar in `--progress` on each field that was filled from the message, plus a legend at the top using the existing notice ("Filled in from your message "{subject}". Check every answer and add what's missing."). The bar clears once the field is edited or focused for 2 seconds. That's the row-4 handoff from the blueprint, made visible.
- **Radio and yes/no**: radio cards 48 px tall with a 20 px control; yes/no sits inline.
- **Checkbox and authorizations**: a 22 px box, with the statement text at body size beside it, never small print. Authorizations sit in their own fieldset with the locked legend "Authorizations".
- **SSN and FEIN**: masked after blur (`***-**-1234`) with a "show" toggle; numeric keyboard; `autocomplete="off"`.
- **Signature pad**: 4:1 aspect on desktop (640 × 160) and full width on phone, with a prompt to turn the phone sideways **[new label]**; a baseline at 72% height with a small ✕ at its left; ink stroke 2.5 px; buttons "Clear" **[new label]** and the existing consent checkbox below.
- **File (PDF)**: a drop zone 120 px tall with the locked help "A PDF of 10 MB or less, without a password."

### 9.3 Status chip

A pill 28 px tall (24 px in dense tables): 8 px left padding, a 14 px tone icon, 6 px gap, the locked status label in Hand 600 at 14 px, 10 px right padding. Fill `--{tone}-tint`, text and icon `--{tone}`, no border, except `paused` outline variants in the coverage table. The **Rehearsal chip** is always shown beside the status chip on a rehearsal (held tone, Gate icon, "Rehearsal"). The desk list today says "Test" there; see the Copy notes.

### 9.4 The Turn Line

**Compact glyph (lists, 32 × 12 px).** Four 6 px circles on a 1 px line, one for each hand: You · Your client · CoFile · The state. Past stations are small filled `--ink-3` dots; the current one is a 10 px baton in `--firm-accent` (or `--ink` on CoFile pages); future ones are hollow rings. A 1 × 8 px gate mark sits between "Your client" and "CoFile". Its accessible name is the lane, e.g. "Turn: Your client" **[new label]**.

**Full blueprint (filing detail).** Four lanes, 56 px tall each, with lane labels in Hand 700 caps at 13 px in a 120 px left gutter. Time runs left to right. Each event is a 12 px station in the lane of whoever acted, labelled underneath with the locked status name and a time in Meta. Handoffs are 1.5 px ink connectors with 8 px rounded corners. Gates are 4 × full-height bars across all four lanes, drawn at "Waiting for approval" (approval gate) and at the payment check (fee gate). A gate that has been passed turns `--done` with a check notch; a held one turns `--held` with the hatch; a stopped one turns `--paused` or `--stop`. Below `md`, the blueprint turns vertical: time runs down, and each event carries a lane tag on the left.

```
              Received   Getting the     Waiting for     Approved     Filing now    Submitted     Accepted by    EIN issued
                         state's review   approval                                to the state  the state
YOU           ●──┐                                        ║   ●─┐ (Ready to pay)  ║
YOUR CLIENT      │                        ●───────────────║─┘   │                 ║
COFILE           └────────●───────────────┘               ║     └───●─────────────║──●─┐
THE STATE                                                  ║                       ║    └──●───────────●──────────●
                                                     approval gate             fee gate
```

**Client version (the proof).** Three stations: the firm's name, "You", "The state" **[new labels, except the firm name]**. The baton sits on "You"; the approval gate is drawn just before "The state". CoFile isn't a lane on client pages. To the client, the filing company is the firm (the existing definition: "{firm}, filing through CoFile").

### 9.5 Timeline (event list)

Under the blueprint, the same events appear as an accessible ordered list: time (Meta), lane tag, status label, and any detail from the engine (for example "We emailed this link to ana@…"). The list is the real content; the blueprint is a visual summary of it, hidden from screen readers with `aria-hidden`, and the list has the heading "Progress on the state site" for run steps, as today.

### 9.6 Tables

48 px rows, 15 px text, 1 px `--line` row rules, header row on `--surface-sunk` in Label style. Numbers and dates right-aligned and tabular. Ids in Record. A row's main link is its first cell; the whole row is clickable, with a hover tint of `--surface-sunk`. Under `md`, tables become stacked cards: the first cell as the title, the chip top-right, the other cells as label and value pairs. Long tables get sticky headers and a "Showing 1 to 50 of 312" **[new label]** pager; the enterprise filings table keeps its 500-row limit.

### 9.7 Navigation

- **Public header**: 72 px tall; lockup left; the existing section links ("How it works", "For firms", "What we file", "For platforms"); right side "Log in" (quiet) and "Run a free rehearsal" (primary ink). Under `md`: lockup, "Log in", and a menu button that opens a full-height sheet.
- **Desk rail** (`lg`+): the firm's logo plate at top (max 200 × 48), a full-width primary "New filing" button, then the locked nav labels: "Filings", "Ready to pay", "Client links", "Signatures", "Setup", "Billing". "Ready to pay" and "Filings" carry count badges (ink pill, white tabular number) when something waits. "with CoFile" sits at the bottom of the rail, followed by the user's email (link to password) and "Log out".
- **Dashboard rail**: CoFile lockup, then the locked labels "Overview", "Filings", "Ready to pay", "Firms", "API keys", "Webhooks", "Setup", "Team", "Billing" (or "Sign-ups" for the platform tenant) and "Docs".

### 9.8 Banners and notices

| Kind | Look | Copy (locked) |
|---|---|---|
| Beta notice, CoFile pages | 36 px slim band above the header, `--surface-sunk`, "Beta" as a small ink tag | "CoFile is in beta. Any filing can run as a free rehearsal on the state's real website. It stops before the last button, so nothing is filed or paid. Filing types go live one at a time. Questions or problems? hello@cofile.app" |
| Beta notice, firm pages | Same band, neutral, no CoFile name | "This service is in beta. Any filing can run as a rehearsal on the state's real website. It stops before the last button, so nothing is filed or paid. Filing types go live one at a time." |
| Rehearsal band (intake, proof, new filing) | Full-width `held` tint, hatch strip, Gate icon, body size | e.g. "Rehearsal: nothing will be filed or paid, even if you approve." |
| Notice | `--r-md`, 4 px left bar in the tone, tone icon, body text | info (ink), act, done, stop, paused |

The beta notice collapses to a single line with a "More" disclosure **[new label]** under `sm`. It is never dismissible, because it's a fact, not a promotion. The widget has none, as decided.

### 9.9 Empty states

A 64 px line illustration from the blueprint family (an empty Turn Line with the baton resting at "You"), the locked sentence, and the locked actions. For example the desk: "Your desk is clear. Start a filing (it can be a free rehearsal), or send a client a link with your logo on it." with "New filing" and "Send a client a link". No jokes, no cartoon people.

### 9.10 Toasts

Bottom-left on desktop and bottom full-width on phones, 56 px tall, elevation 2, with a tone icon. They auto-dismiss after 6 s unless hovered or focused, and have `role="status"`. They're used only for confirmations of the user's own action ("Saved to Google Docs.", "Copy link" success). **Never for status changes from the engine or the state.** Those belong in the page, on the Turn Line, where they can't be missed.

### 9.11 The proof card and the coverage table

These two are specified in full on their pages (10.4 and 10.1, Coverage), because they carry most of the product's trust. In short: the proof card is a single sheet with numbered regions (details, fees, the state's page, the decision), and the coverage table is a **ladder**: each row shows a five-step track (Planned · Offered, not yet rehearsed · Screens recorded, rehearsal next · Rehearsed to the payment screen · Live), filled up to its stage, with the label in words beside it. "Live" is always the far-right column. If nothing in a row has reached it, the column is visibly empty. You can't misread an empty column.

### 9.12 State matrix

Every interactive component documents these states in Storybook. The Turn Line and status chip have more states than most, so here they are in full.

**Turn Line stations**

| State | Station | Track before it | Label |
|---|---|---|---|
| Future | 10 px hollow ring, 1.5 px `--line-strong` | 1 px `--line`, dotted | `--ink-3` |
| Past | 8 px filled `--ink-3` | 1.5 px `--ink-3` solid | `--ink-2`, with time in Meta |
| Current | 14 px baton, `--firm-accent` or `--ink`, with a 4 px halo in the tint | 1.5 px `--ink` solid | `--ink`, Label weight, with the status chip under it |
| Gate, waiting | 4 px bar, full lane height, `--ink` | | the gate's name in Meta **[new label]** |
| Gate, passed | Bar in `--done` with a 6 px notch | solid continues | |
| Gate, held (rehearsal) | Bar in `--held` with the hatch on both sides | track after it dashed 4/4 in `--held` | |
| Gate, paused | Bar in `--paused`, two-bar icon on top | track after it dotted | |
| Gate, stopped | Bar in `--stop`, square icon on top | track after it absent | |

**Status chip**

| Context | Treatment |
|---|---|
| Default | Tint fill, tone text and icon |
| In a selected or hovered row | Tint fill stays; a 1 px tone line is added so the chip doesn't dissolve into the row tint |
| On a firm-tinted surface | Chips always sit on `--surface` or `--surface-sunk`, never directly on `--firm-tint` |
| Dark | Dark tint and text from 4.3 |
| Forced colors | Chip becomes a 1 px `CanvasText` outline; the icon carries the meaning (12.4) |
| Updated live | Chip cross-fades at `--t-quick`; the live region announces the new label |

**Fields**: empty, filled, focused, filled from a message (provenance bar), error, disabled (only when hidden by a condition, otherwise never disabled), read-only (viewer role), masked (SSN/FEIN after blur).

**Buttons**: default, hover, focus, pressed, pending, disabled with a reason, and success (the button becomes the next step's link, never a green "Done!" flash).

### 9.13 Loading and long waits

Some statuses last seconds, others days ("in Florida an examiner reviews the filing first"). The design separates three kinds of wait:

| Wait | Example | Treatment |
|---|---|---|
| Your own action (under 10 s) | "Sending…", "Saving…" | Pending ring in the button with its label. After 10 s, the ring stops and the button's help line shows the existing pending label as text, so a slow network never shows an endless spinner |
| CoFile working (minutes) | "Getting the state's review page", "Filing now" | No spinner. The Turn Line baton sits at CoFile, and the newest line of "Progress on the state site" shows under it with its time ("Registered agent · 10:16:42 AM"), updated live. Real progress, not an animation |
| The state's turn (hours to weeks) | "Submitted to the state" | The baton sits in the state lane. The locked "After" copy explains why ("New York sends a receipt by email, and in Florida an examiner reviews the filing first"), shown on the filing page as a `progress` notice for NY and FL filings, with the submitted date in Record |

Page loads use skeletons that match the final layout (table rows as 48 px bars in `--surface-sunk`, no shimmer), shown only after 300 ms, so fast loads never flash.

### 9.14 Smaller components

| Component | Spec |
|---|---|
| Stat tile | 20 px padding, label in Label `--ink-2`, number in Stat (36/40, tabular), a sub-line in Meta; whole tile is a link when it has one |
| Card tile (payment card) | 64 × 40 card brand mark, "ending 4242" in Record, purpose in Meta; never a fake card graphic with a full number |
| Copy button | 32 px square, copy icon, `aria-label` names the thing copied; on success the icon becomes a check for 1.5 s and a toast confirms |
| Code block | Ink ground (4.5), 14/22 Record, a language tab and copy button in the top-right, horizontal scroll with an edge fade |
| Drawer | 560 px from the right at `lg`, full-screen sheet below `md`; elevation 3; focus trapped; closes with Esc; the URL updates so a drawer can be linked |
| Confirm dialog | For destructive actions only ("Remove", "Turn off", "Disconnect", revoking a key): 440 px, the action restated in the title, destructive button on the right, Cancel focused by default |
| Tabs | Underlined, 44 px tall, 2 px `--ink` (or firm accent) indicator; never more than five |
| Disclosure (`details`) | 44 px summary row with a chevron that rotates 90° at `--t-standard`; summary text in Label |
| Pager | "Previous" and "Next" with the count line; 44 px targets |
| Count badge | Ink pill, 20 px tall, tabular white number, 1 to 99 then "99+" |

---

## 10. Page by page

### 10.1 Home (`/`)

The home page reads as one long blueprint. A thin Turn Line runs down the left margin at `lg`+ (a 1 px ink rule at x = 40 px) with a station for each section. As you scroll, the baton moves down it, so the page itself shows where you are in the story. Under `lg` the rule is hidden; nothing else depends on it.

**Hero**

```
┌───────────────────────────────────────────────────────────────────────────────────────────┐
│ ▪ Beta  CoFile is in beta. Any filing can run as a free rehearsal…  hello@cofile.app      │
├───────────────────────────────────────────────────────────────────────────────────────────┤
│ ●▌CoFile    How it works  For firms  What we file  For platforms      Log in [Run a free…] │
├──────────────────────────────────────────────┬────────────────────────────────────────────┤
│ FOR CPA, PAYROLL, FRACTIONAL CFO AND TITLE   │  YOU ──── YOUR CLIENT ─●─║── COFILE ── STATE │
│ FIRMS                                        │ ┌────────────────────────────────────────┐ │
│                                              │ │ Harbor & Pine CPA        example firm  │ │
│ Your client approves                         │ ├────────────────────────────────────────┤ │
│ the proof. Then CoFile                       │ │ Two Sisters Bakery LLC   [▌Rehearsal]  │ │
│ files it.                                    │ │ New Jersey LLC formation. Please       │ │
│                                              │ │ approve by Dec 3, 5:00 PM Eastern.     │ │
│ CoFile fills in your clients' LLC and        │ │ (1) Business name  TWO SISTERS BAKERY… │ │
│ corporation formations, EINs and employer    │ │     Members        Ana Ortiz, Lucia…   │ │
│ registrations on the official New York, New  │ │     Main business… 88 Grove St…        │ │
│ Jersey, Florida and IRS websites, …          │ │ (2) Formation filing fee      $100.00  │ │
│                                              │ │     NJ portal fee, by card      $3.50  │ │
│ [Run a free rehearsal] [See what your client │ │     Total to the state        $103.50  │ │
│  sees]                                       │ │ (3) New Jersey's own review page, …    │ │
│                                              │ │ (4) [Approve for filing]               │ │
│ In beta. A rehearsal fills in every screen…  │ │     Nothing is submitted or paid until │ │
│                                              │ │     you approve.                       │ │
│                                              │ └────────────────────────────────────────┘ │
│                                              │ Sample proof · test details · not a real…  │
└──────────────────────────────────────────────┴────────────────────────────────────────────┘
```

- Columns 1 to 6 hold the text; columns 7 to 12 hold the sample proof. Under `md` the proof follows the CTAs at full width.
- The kicker is set in Kicker style; the H1 is Display, broken as "Your client approves / the proof. Then CoFile / files it." with `text-wrap: balance`.
- The sample proof is the real proof component in its "specimen" mode, themed with Harbor & Pine CPA's sample palette (deep pine `#1F5C4A`), and its Turn Line sits above it with the baton resting at the gate. The `<mark>` highlights on the business name and address become a 2 px underline in the firm tint, not a yellow highlighter.
- Callouts 1 to 4 are 24 px ink circles in Record 700. Hovering or focusing one highlights the matching line in the Proof section's list below (1: details, 2: fees, 3: the state's page, 4: one button), and the link is announced. The figcaption "Sample proof · test details · not a real business" sits under the sheet in Caption style. It must never be cropped out of a screenshot, so it sits inside the figure's bounding box.
- The beta note "In beta. A rehearsal fills in every screen of the state's real website…" sits in Small style under the CTAs, with the Gate icon in `--held`.

**Process.** "You start it. Your client approves it. CoFile files it." is set as an H2 over a three-lane diagram. The three step texts each sit in their lane ("You start it." in lane 1, "Your client approves it." in lane 2, "CoFile files it." in lane 3), with the gate drawn between steps 2 and 3, and the lede "Three steps, and your client is in charge of the middle one." beneath. Phone: the three steps stack vertically along a vertical line with the gate as a horizontal bar.

**The proof.** "Your client sees what the state will see, before the state does." Two columns: the lede on the left; on the right the six checks as a list with Gate-check icons (not generic checkmarks). At `lg`+, a scaled copy of the sample proof is sticky in the left column below the lede, and each list item highlights its region as it scrolls into view. The sixth item, "For CPAs: it does for a business filing what the 8879 does for a return.", gets a small "8879" Record tag, because CPAs will recognize it at a glance.

**Firms.** "Your name on the door. Ours in small print." On the right, the firm theme fan: three phone-sized proofs for Harbor & Pine CPA in three palettes (pine, navy `#0B2545`, warm gold `#F2C94C` with ink text), showing the theming engine handling a dark, a very dark and a light brand color. A loupe circle magnifies the "with CoFile" mark on the front sheet. The four list items sit beneath the lede.

**Requests.** "Clients don't fill in forms. They text you." The bubble ("Need an LLC for the bakery. It's me and my sister, 50/50, in Jersey City." / "Ana Ortiz · text message · example") is drawn as a neutral grey message bubble, not imitating any messaging app. On scroll, three phrases in the bubble ("LLC", "me and my sister, 50/50", "Jersey City") get a `--progress` underline, and thin connectors run to three fields of a small drafted filing card (members, ownership, state), each with the blue provenance bar from 9.2. The arrow line "↳ read into a drafted New Jersey LLC formation for your team to check" sits under the card in Record. Last comes a station in the "You" lane marked with a person-check icon, showing that "Someone at your firm checks the draft."

**Checks.** "Checked twice. Filed once." Left: the lede and the five list items. Right: the "two readings match" visual. Two Record readouts, labelled "the proof" and "the state's payment screen" in Caption (taken from the list copy), slide together until their decimals align. Below them is the gate.

**After.** "The papers come back to you." The Turn Line runs right to left here: three document cards (the state's documents, the EIN letter, the record) travel from "The state" back to "You". Each card is a small specimen of a state document with a Record header and blurred body text marked "sample".

**Rehearsals.** "Rehearse on the real stage." The two ledes on the left; on the right the rehearsal log, set as a run log: a header row "Rehearsal · New Jersey LLC formation" with "test details" in Meta, then one row per line of the locked LOG (Business name: filled; Name check: passed; Registered agent: filled; Members and signatures: filled; Review page: matched the proof; Payment: $100.00 + $3.50 NJ portal fee: matches the proof). Each result has a small `done` check, and the last row, "Pay Now: held, on purpose", has the violet Gate, the `held` tint and the hatch strip. Under it: "13 screens of New Jersey's own LLC form, some grouped here, filled in with test details. Nothing was filed."

**Coverage.** "New York, New Jersey, Florida and the IRS." The ladder table:

```
Filing                                         Where        Planned  Offered  Screens  Rehearsed  Live   Where it stands
LLC formation                                  New Jersey     ●───────●────────●────────●═║        ○      Rehearsed to the payment screen
EIN, with the IRS letter saved                 IRS            ●───────●────────●        ○          ○      Screens recorded, rehearsal next
Corporation formation (for-profit)             New Jersey     ●───────●        ○        ○          ○      Offered, not yet rehearsed
Alternate name, charter amendments             New Jersey     ●       ○        ○        ○          ○      Planned
```

- The rows and labels come from `COVERAGE` and `STAGES` in `page.tsx`, in their existing order. The ladder's column headings are shortened forms of the locked stage labels **[new labels]**; the full label always appears in words in the last column.
- A row whose type is live (from `liveFilings`) fills the Live step with a solid `done` dot and shows the green "Live" chip. The Live column has a faint `done` tint background, so an empty column reads as empty.
- State filter chips above the table ("New York", "New Jersey", "Florida", "IRS"), using the section's own words.
- Phone: each row becomes a card with the filing name, the state, the ladder at full width and the label.
- The small print beneath (definitions and "Write to hello@cofile.app and we'll tell you each one by name.") is set at Small size, never Caption. It's part of the honesty, so it must be readable.

**The catch.** "Every filing service has a catch. Here's ours." The five points are set as a numbered list with 48 px Record numerals in `--ink-3`, two columns at `lg` (1 to 3, then 4 and 5), on a `--surface` panel with a 1 px ink top rule like a page of terms. No icons, no colour. It should read like a frank letter.

**Security.** "Security" as H2, with the five blocks in a 3 + 2 grid of cards, each with a spot icon (masked digits, vault door, link with clock, pen behind a gate, separate boxes) and the locked H3 and paragraph.

**Enterprise.** "Building a filing product? Put CoFile underneath it." This is the only **inverted band** on the page (`--ink` ground, paper text), a clear signal that the page is changing reader. Left: the lede, the list, and a code card showing the start of a request with `"dryRun": true` highlighted. Right: the inquiry form on a `--surface` card, with the locked labels (Name, Company, Work email, Phone (optional), States you file in, Filings per month, What you'd like to do (optional)) and "Send".

**Close.** "Run one rehearsal. Then decide." is centred with the lede, the primary CTA "Run a free rehearsal" and "Questions first? hello@cofile.app". The tagline "Approve the proof. Then it's filed." is set in Voice at 28 px, preceded by the Gate mark at 28 px (replacing today's folder tab). The left-margin Turn Line ends here, with its baton resting at the last station.

**Footer.** Two rows on `--surface-sunk`. Row 1: lockup, "CoFile · the filing desk behind your firm", "New York · New Jersey · Florida · IRS". Row 2: "CoFile is not a law firm or a government agency, isn't affiliated with any state or the IRS, and doesn't give legal or tax advice." and "Terms · Privacy · Security · hello@cofile.app". Body size, not Caption.

### 10.2 Account pages

All account pages share one **desk-door layout**: on `md`+, a 520 px card on the left two-thirds and, on the right, a quiet illustration of an empty filing desk Turn Line with the baton at "You". Under `md`, the card fills the screen and the illustration is dropped.

| Route | Layout notes (copy is locked) |
|---|---|
| `/signup` | "For firms" kicker, H2 "Set up your firm's filing desk", lede. The form is set in three groups with 40 px between them: firm (Firm name, Kind of firm), you (Your name, Work email, Password, Password again, with "At least 12 characters. A short sentence works well."), and filing (Phone (optional), Website (optional), States you file in as three 48 px checkbox cards, Filings per month). The terms checkbox sits above "Create account". A wide card (720 px) at `lg`, with paired fields. |
| `/signup/sent` | "Check your email", with an envelope icon carrying a small baton. The "send the link again" link is a secondary button. |
| `/login` | "Welcome back" and "Firms go to their filing desk, platforms to their dashboard." Then "Continue with Google" as a full-width secondary button with Google's own mark (following their guidelines), a 1 px divider, and the email form. Google errors appear as a `stop` or `act` notice above it. "Enterprise developers can also log in with an API key" sits as a quiet link. |
| `/forgot-password`, `/reset-password` | One field and one button each. |
| `/verify-email` | "Confirm your email" and "One click and your email is confirmed." The confirm button is large and primary; the resend form is folded beneath. |
| `/invite-expired`, `/join/<token>` | The expired page uses the `paused` tone icon, not an error tone. Join shows the inviting firm's logo plate (it's the firm inviting), then the password form. |
| `/terms`, `/privacy` | Long-form reading layout: a 680 px column, a sticky contents list on the left at `lg`, headings in Hand 700, body 18/30, a version and date line in Record at the top. Print stylesheet included. |
| 404 | "Page not found" and "The link may be old or mistyped." with an empty Turn Line (no baton), and "Go to the home page". |
| Error | "Something went wrong" with the existing two buttons and the reference in Record with a copy button. |
| Session ended, signed out (`/p/<slug>/signed-out`) | "You're not signed in to this filing desk" plus the existing guidance, with the firm's logo plate if the slug resolves. |

### 10.3 The partner filing desk (`/p/<slug>`)

The desk is co-branded: the firm's logo and colour on the rail and buttons, CoFile's fonts for the facts, "with CoFile" at the foot of the rail.

**Home: the turn board.** The filings table becomes a queue grouped by whose turn it is, because a staff member's first question each morning is "what's mine?".

```
┌──────────────┬──────────────────────────────────────────────────────────────────────────┐
│ [H&P logo]   │ Filings                                                   [New filing]   │
│ [New filing] │ ┌ act ─ 1 approved filing is ready to pay and need your card's security  │
│              │ │       code. Pay and file                                                │
│ Filings   4  │ └ act ─ 3 filings need someone to act.                                    │
│ Ready to pay1│                                                                           │
│ Client links │ YOU · 3 ─────────────────────────────────────────────────────────────────│
│ Signatures   │  Brightline Cafe LLC    NY LLC formation  [◉ Needs information] ●○○○ 11/24│
│ Setup        │  …                                                                        │
│ Billing      │ YOUR CLIENT · 2 ─────────────────────────────────────────────────────────│
│              │  Two Sisters Bakery LLC NJ LLC formation  [◉ Waiting for approval]○●○○ ▌R │
│              │ COFILE · 1 ──────────────────────────────────────────────────────────────│
│              │  …                                   [◔ Filing now]           ○○●○        │
│ with CoFile  │ THE STATE · 0 (folded)   DONE · 12 (folded)                               │
│ ana@hp.com   │                                                                           │
│ [Log out]    │                                                                           │
└──────────────┴──────────────────────────────────────────────────────────────────────────┘
```

- The existing notices stay at the top, in the `act` tone, in their locked wording ("…ready to pay and need your card's security code. Pay and file", "…need someone to act.", and the subscription notice).
- Group headings use the four lane labels and a fifth, "Done" **[new labels]**. Each group is a table with the locked columns "Filing", "Type", "Status", "Started", plus the turn glyph. Done and The state are folded by default once they hold more than 5 rows.
- A search field and filters (state, status, rehearsal or live) sit above at `lg`. "Rehearsal" chips appear on the filing's row.
- From-email requests not yet turned into filings appear in the You group as rows titled with the locked "Request by email" / "Request by text message", with a channel icon.
- Empty: the 9.9 empty state with "Your desk is clear…".

**Setup guide.** "Set up your account" and "Three short steps, plus registered agents if you want them. You can change any of them later." The three steps are a vertical Turn Line of their own: each step ("Your firm", "Branding", "Payment") is a station with its text and the locked buttons ("Set up your firm", "Set up branding", "Set up payment", or "Change"). The next step's button is primary. Registered agents is a separate card with "(optional)". When everything is done: "You're set up" with "Start a filing". Sub-pages carry "Step 1 of 3" and so on as a 3-segment progress bar plus the words.

**Setup: Branding.** The brand check, the heart of the theming system (section 11). It uses a two-pane layout at `lg`.

```
┌────────────────────────────────────┬──────────────────────────────────────────────────┐
│ Step 2 of 3 ▰▰▱                    │  PREVIEW   [Desk] [Client form] [Proof] [Email]  │
│ Branding                           │            [Light ◐ Dark]                        │
│ Your clients see your name, logo…  │  ┌──────────────── phone 390 ────────────────┐   │
│                                    │  │ [logo] Harbor & Pine CPA    with CoFile   │   │
│ Your web address  cofile.app/[hp]  │  │ ▨ This page is in rehearsal for now…      │   │
│ Name your clients see [         ]  │  │ New Jersey LLC formation                  │   │
│ Logo  [drop zone]  ▢ on dark       │  │ [Send to Harbor & Pine CPA]               │   │
│ Main color  [■] #2E9C6A  ● ● ● ●   │  └───────────────────────────────────────────┘   │
│ Second color [■] #…                │  CHECKS                                          │
│ Font [Lora (serif)        ▾]       │  ✓ Button text   4.61:1  (adjusted from #2E9C6A) │
│   or upload                        │  ✓ Links         4.61:1                           │
│ Support email shown to clients     │  ✓ Dark mode     8.58:1                           │
│ [Save and continue]                │  ✓ Logo on dark  plate added                      │
└────────────────────────────────────┴──────────────────────────────────────────────────┘
```

The preview renders the real components with the computed theme, never a mock. The checks list shows ratios, plus the before and after swatch whenever the algorithm adjusted the colour **[new labels for the check names and messages]**. The locked help texts stay under each field. One of them ("Button text is white, so choose a dark color.") stops being true under automatic contrast; see Copy notes.

**Setup: Details, Agents, Payments.** Single-column forms in cards, with paired fields. Payments shows the two locked radio cards ("One card for every filing", "A card for each type of filing, with one main card for the rest"), then the card selects in a two-column row. Saved cards are shown as card tiles (brand mark, "ending 4242", purpose) inside a Basis Theory-hosted add-card frame, styled to match the field spec.

**New filing.** Step 1, "Which state is the business in?", shows three 160 px state tiles ("New York", "New Jersey", "Florida") with their locked count lines ("3 filing types, plus the federal EIN"), plus the locked rehearsal sentence and the "Or send us the details…" channels as a quiet card with channel icons. Step 2, "{State}: what are you filing?", shows filing-type tiles: title, a Live (`done`) or Rehearsal (`held`, with the Gate) chip, summary, fee note in Record. "Your pages for clients" sits below as a folded card with each permanent URL in Record, a copy button and the widget snippet in a code block.

**New filing form** (the `IntakeForm`). A 720 px column, with a 280 px sticky **"form map"** to the right at `xl`: the section titles as a list, each with a dot that fills when its required fields are complete, and "Authorizations" last. Order on the page:

1. "← Other filings", H1 "New Jersey LLC formation", the summary with "Would your client rather fill it in? Send them a link."
2. The rehearsal band, when the type isn't live ("Rehearsal: New Jersey LLC formation isn't live yet, so this filing is a rehearsal…").
3. "Start from a client you filed for before" as an inline select with "Fill in".
4. "Fields marked * are required.", then the sections as fieldsets with legends, folded sections as `details` with "(optional)", and "More options (optional)" folds inside sections.
5. Authorizations fieldset, each statement a 22 px checkbox at body size, with the locked definition of "the filing company".
6. Footnote "Nothing is filed until your client approves the proof.", then the primary button "Send the proof to my client" with the fee note beside it in Record.

When the engine returns issues, the locked alert ("Please fix these and submit again.") appears at the top with each issue as a link that jumps to and focuses the field. Each field also shows its own error, and the form map marks the section with a `stop` dot.

**Filing detail.** The page staff open most after the queue.

```
← Filings
Two Sisters Bakery LLC   [◉ Waiting for approval] [▌Rehearsal]
New Jersey LLC formation · started Nov 26, 2026, 10:14 AM by ana@harborpine.com (client link)
┌ Turn Line, full blueprint (9.4) ─────────────────────────────────────────────────────────┐
└──────────────────────────────────────────────────────────────────────────────────────────┘
┌ notice ── The approver has a link to check exactly what will be filed and approve it. ───┐
┌ Link to the proof ───────────────────────────────────────────────────────────────────────┐
│ We emailed this link to ana@twosisters.example. If they can't find it, you can pass it on.│
│ https://api.cofile.app/approve/…  [Copy link]                                            │
└──────────────────────────────────────────────────────────────────────────────────────────┘
┌ Documents ─────────────┐ ┌ EIN ─────────────────┐ ┌ Save to Google Docs ───────────────┐
└────────────────────────┘ └──────────────────────┘ └────────────────────────────────────┘
▸ Progress on the state site (rehearsal, …)
```

- The `nextStep` text for the status sits directly under the blueprint, as a notice in the status tone.
- Context cards appear in a fixed order: the action card first (the missing-information form, "Approved and ready to pay…" with "Pay and file", or the stop message), then the link to the proof, documents, the EIN (Record, 24 px, with copy), and Google Docs.
- "Progress on the state site" is shown as a run log matching the home page's rehearsal log: screen name, the time in Record, and a `done` check, ending in the held gate for a rehearsal.
- At `xl`, the context cards move into a right column (400 px) and the blueprint gets the full width above both columns.

**Client links.** "Send a client a link" with the lede. The form ("Filing", "Who it's for (shown to you and the client)", "Make link") sits in a card. The result card shows the kind and label as a heading, the link in Record, "Copy link", and "Works for 30 days and makes one filing…". "Links you sent" is a table whose state column uses chips: "Waiting for the client" (`act`, Your client turn glyph), "Used: open the filing" (`done`, as a link), "Turned off" and "Expired" (`paused`). "Turn off" is a destructive small button.

**From email** (`/from-email/<id>`). "Request by {email | text message | Slack | WhatsApp}" with a channel icon, the sender line in Meta, then a two-column layout at `lg`. On the left is the message as received, in a neutral bubble or email card ("Your message"), with extracted phrases underlined in `--progress`. On the right is the decision card: "This looks like a request for: New Jersey LLC formation", "We filled in 6 answers from your message. Check every answer and add what's missing before you send it.", then "Open the filled-in form". The "Not this filing? Choose another" fold sits below. The purged state ("The text of this message was deleted after 30 days…") replaces the left column with a `paused` notice.

**Signatures.** "Saved signatures" with the lede, a table (Signer, Saved, Last used, Remove), then "Add a signature" with the pad (9.2) and the consent checkbox. A signature preview in the table is never shown. The lede says "Nobody can download it.", and the design shouldn't even appear to allow it.

**Ready to pay.** "Ready to pay" with the lede. Each waiting card is a **pay ticket**: card tile (brand, "ending 4242"), the filings waiting for it as a list of links with "approved, waiting since…", then the Basis Theory security-code field (Record, 24 px, 0.2em spacing, 120 px wide) and "Pay and file". After success, the locked confirmation ("Thanks. 2 filings are being filed now.") appears with the 60-minute ring (8.3). Empty: "Nothing is waiting for a card right now." with an empty pay ticket outline. The footnote about Basis Theory sits at the bottom in Small, not Caption.

**Billing.** "Billing", then the plan panel and plan picker as Stripe returns them. Amounts appear only here, inside the desk and never publicly, in Record with tabular figures. The registered agent services panel lists each business with its renewal date in a table. Notices use the locked texts.

**Password, signed out.** Simple single-card pages inside the desk shell (password) or outside it with the firm's logo plate (signed out).

**Keyboard, for the people who file all day.** Staff who file 40 a month will learn shortcuts, and the desk should reward it. "N" opens New filing; "/" focuses search; "G" then "F" goes to Filings, "G" then "P" to Ready to pay, "G" then "L" to Client links; "J" and "K" move through the queue and "Enter" opens a filing; "?" opens a shortcut sheet **[new labels for the sheet]**. Shortcuts never fire inside a field, and none of them approves, pays or submits anything.

**Multi-firm staff.** A bookkeeper who works for two firms has two desks. The rail's logo plate becomes a switcher when the same email has more than one desk, listing each firm's logo and name. Switching changes the whole theme, so a staff member always knows whose name is on the door.

### 10.4 Client-facing pages (the firm's brand, CoFile nearly invisible)

**Shared frame.** A firm header 64 px tall: a 4 px top rule in the firm's second colour (or accent), the logo plate (max 160 × 40, optically sized, 11.3), the firm name in the firm's Voice font, and "with CoFile" on the right. Below that, the neutral beta notice, then a single 640 px column. The base size is 17 px and every touch target is 48 px or more. There's no navigation: a client should never get lost.

**Intake form (`/i/<token>`) and permanent service pages (`/<firm>/<service>`).** The order is: the rehearsal band when the type isn't live ("This page is in rehearsal for now. You can fill it in and see your proof, but nothing will be filed with the state and nothing will be charged, now or later, even after you approve it. To file for real, contact {firm}."), the H1 (filing title, with " · {label}" for a labelled link), the summary, the fee note in Record, and then the form. The form is the same `IntakeForm` with client wording: "Send to {firm}", the footnote "Next, you'll get a proof to check. Nothing is filed until it's approved.", and the Terms and Privacy line in Small. On phones:

- **Progressive disclosure, not a wizard.** Each section fills the screen in turn, and its legend becomes a sticky section header, so a long form never feels endless. All the fields stay in one DOM form with one submit, exactly as the engine expects.
- Paired fields stack; "Same as" buttons sit above the address they fill, at 44 px.
- The submit button is full width and 56 px tall.

Link errors ("This link has expired or isn't valid" / "Ask whoever sent it for a new one.", "This link can't be used", "This filing is no longer offered") use the shared frame with the firm's brand where it's known and a `paused` icon, never a red error.

**The proof** (served by the engine at `api.cofile.app/approve/<token>`). It's the most important page in the product. On a phone it's one long sheet that has to be read to the end.

```
┌──────────────── 390 ─────────────────┐
│▔▔▔▔▔▔▔▔▔ firm colour rule ▔▔▔▔▔▔▔▔▔▔▔│
│ [logo] Harbor & Pine CPA  with CoFile│
├──────────────────────────────────────┤
│▨ Rehearsal: nothing will be filed or │  held band (rehearsals only)
│  paid, even if you approve.          │
├──────────────────────────────────────┤
│ NJ formation: Two Sisters Bakery LLC │  filing title (as the engine builds it)
│ Filing reference 7f3c… (Record)      │
│ Please decide by Wed, Dec 3,         │
│ 5:00 PM ET. After that, this link    │
│ stops working…                       │
│ H&P CPA ──── You ●║──── The state    │  client Turn Line
│ ┌─────────────────────────────────┐  │
│ │ By approving, you confirm every │  │  consent note: ink 2 px left
│ │ detail below is correct and     │  │  rule, body size, never small
│ │ authorize its submission… up to │  │
│ │ the total shown ($103.50).      │  │
│ │ Government fees generally can't │  │
│ │ be refunded once paid, even if  │  │
│ │ the filing is rejected.         │  │
│ │ Government sites don't save     │  │
│ │ drafts…                         │  │
│ └─────────────────────────────────┘  │
│ The state's review page              │
│ [ image, tap to enlarge ]            │
│ Filing details                       │
│  Business name                       │  label above value on phones
│  TWO SISTERS BAKERY LLC              │
│ State fees                           │
│  Nothing is charged on this page…    │
│  Formation filing fee      $100.00   │
│  NJ portal fee…              $3.50   │
│  ─────────────────────────────────   │
│  Total                     $103.50   │
│ [One-time code sent to you]  (opt.)  │
│ ║                                    │  the gate, drawn
│ ┌─────────────────────────────────┐  │
│ │ Approve, and authorize          │  │  firm primary, 64 px,
│ │ submission and payment          │  │  two lines allowed
│ └─────────────────────────────────┘  │
│ ─────────────── or ───────────────   │
│ What should change? (Needed only if  │
│ you ask for changes) [           ]   │
│ [ Request changes ]                  │  secondary
│ Questions: help@harborpine.example   │
└──────────────────────────────────────┘
  sticky foot while scrolling: Total $103.50
```

Design decisions:

1. **One button, at the end.** The approve button isn't sticky. It sits after the fees and after the state's page, so getting to it means passing every detail. A slim sticky foot ("Total" and the amount, in Record) keeps the amount visible while the reader scrolls, and tapping it scrolls to the fees.
2. **The decision area is split.** Approve comes first; the change-request textarea and "Request changes" sit below a divider, so the two buttons can't be confused or mis-tapped. The divider's "or" is a **[new label]**.
3. **The consent note is body text,** with a 2 px ink left rule, not a tinted warning box. The no-refund sentence is part of the consent, so it reads at full size.
4. **The state's review page** is shown full width with a 1 px `--line-strong` border, with tap-to-zoom into a pan-and-pinch viewer. The locked alt text stays.
5. **Values in Record, labels in Hand.** On phones the label sits above the value; at `md`+ they're 40/60 columns. Masked SSNs keep the locked note.
6. **The red-band rule:** if the firm's accent falls in the red hue band (section 11.4), the approve button uses the firm's deep variant, so approving never looks like a danger action.
7. **Dark mode** is supported, but the review page image always sits on a white plate.

**Approval outcomes.** The decision page uses the same frame: "Approval recorded" with the locked paragraph (rehearsal or live version) and the Turn Line with the baton handed on. The change-request confirmation ("Thank you. Your change request is recorded…"), the code mismatch ("That code didn't match…") and the link errors ("This link to the proof has expired…", "…isn't valid…", "A decision was already recorded with this link…", "We couldn't record your decision because this link has expired or was already used…") all render in the branded frame. Today they're bare `<p>` tags; see pushback. Expired and already-decided use `paused`; the code mismatch uses `act`.

### 10.5 Enterprise dashboard (`/dashboard`)

CoFile-branded (ink), with the app-shell rail and a denser scale (tables at 14/20, 40 px rows), because operations leads and developers want density.

| Page | Layout |
|---|---|
| Overview | Account name as H1; the locked notices (subscription, ready to pay, configuration). Row 1: three stat tiles: "Filings" (with "{n} live, {n} rehearsals"), "Webhook deliveries" (with pending and failed), "API keys" with "Manage keys". Row 2: a **turn strip**, filings by whose turn as one stacked horizontal bar with counts per lane, so a stuck queue shows at once. Row 3: "By status", "By state", "By month" as direct-labelled bars (status bars in their tones, others in the categorical set). "As of {time}." in Meta. |
| Filings | A full-width table with filters (status, state, firm, rehearsal/live), the id under each title in Record, status chip and turn glyph. Row click opens a filing drawer (560 px) with the blueprint and events, so an operator can triage without losing their place. The "Test" badge becomes the Rehearsal chip. |
| Firms, firm detail | Table of firms with id in Record. Detail: "Filing desk" settings, "Public pages and website widget" with URLs and snippet in code blocks, "Invite staff". |
| API keys | Table (name, prefix `cofile_xxxxxxxx` in Record, created, revoke). A new key appears once in a `--surface-sunk` well with copy, and a notice that it won't be shown again **[new label if not present]**. |
| Webhooks | Endpoints table plus a per-endpoint **delivery log**: event type in Record, response code chip (2xx `done`, 4xx/5xx `stop`, pending `progress`), retry count, timestamp. Signing secret shown once. |
| Setup | Long settings page with a sticky section index on the left: "Payment methods", "State portal logins", "Who's named on your filings", "Your registered agent in each state", "Defaults per portal". The portal logins table shows each portal (NY DOS, NYS-100, NJ, IRS, FL) with "Pays by" and a login status chip ("Connected {date} by {name}" as `done`, "Not needed" as plain Meta). |
| Ready to pay | Same pay tickets as the desk, with "({firm}'s card)" owner tags. |
| Billing, Team, Password | Standard card and table layouts with locked copy. |
| Sign-ups and enterprise requests (platform tenant) | Two **review queues**: "Waiting for approval" with approve and decline buttons per row, and a side panel showing everything the applicant entered; "Decided" folded; "Enterprise requests" with the inquiry details. |
| Drift reviews (proposed, platform staff) | A new internal surface: for each paused filing, side-by-side "approved snapshot" vs "today's screen" with differences outlined in `--paused`, and accept / correct / reject actions. It maps onto the engine's existing `/v1/drift-reviews`. Labels to come from the copy owner. |

### 10.6 White-label surfaces

- **`/e/<tenant>/<firm>/<service>`** is the same as the firm service page, themed with the enterprise's brand (and the firm's, where the enterprise allows it). "with CoFile" is absent unless the enterprise opts in. The beta notice is neutral.
- **`/embed/...` with `embed.js`** is a frame with no header, no beta banner and a transparent background option. It inherits the host page's width and `EmbedResizer` keeps its height right. It starts at the rehearsal band (if any) and the H1, and ends with "Filed with CoFile" in Meta. `embed.js` accepts `data-theme="light|dark|auto"` and `data-accent` overrides, which run through the same algorithm (section 11). A host can never pass raw CSS.

### 10.7 Developer docs

A separate **workbench** look inside the same system: the Hand face at 16/26, Record for everything technical, and code blocks on the ink ground.

- `/docs`: a three-column layout at `lg` (240 px nav, 720 px content, 240 px "On this page"). H1 "CoFile API", the locked intro (including "Not every filing type is live yet; see Coverage."), "Quick start" with the curl example, then the agent-readable files as three **download tiles**: "all docs in one Markdown file" (`/docs.md`), "OpenAPI 3.1" (`/openapi.json`) and "llms.txt", each with its path in Record and a copy-URL button.
- Guides (`/docs/<slug>`): long-form, with the Turn Line used once in "Filings and the lifecycle" as a state diagram labelled with the API status ids in Record beside the locked labels.
- `/docs/reference`: 25 endpoints. The left nav is grouped by resource. Each endpoint block has a method chip, the path in Record, description, parameters table, and a sticky right-hand code panel with curl, Node and Python tabs. **Method chips are monochrome** (ink outline, method in Record 700) instead of today's green, amber and red, which borrowed status meaning.
- Webhooks pages show the `X-CoFile-Event`, `X-CoFile-Delivery` and `X-CoFile-Signature` headers in a definition table.
- Dark mode is first-class here, with the same tokens.

### 10.8 Emails

Built with React Email and sent through Resend. Each email is 600 px wide, single column, with a bulletproof (VML-backed) button.

| Layer | Client emails (firm brand) | Account emails (CoFile) |
|---|---|---|
| Header | Firm logo plate on white, 4 px firm rule | CoFile lockup |
| Headline | The subject restated in Voice (the firm font if it's web-safe, otherwise Georgia), 26/32 | Newsreader fallback Georgia |
| Turn strip | A four-cell table (three for client emails) with the active cell filled in the firm tint and labelled | none |
| Body | The engine's locked body text, 16/24, `#111A21` on `#FFFFFF` | Same |
| Button | Firm accent with computed text colour, 48 px tall, with the locked label ("Open your proof", "Enter security code", "Choose a name", "Review the filing") | Ink |
| Link line | "Or paste this link into your browser:" with the URL in Record | Same |
| Footer | Firm support email, then "with CoFile" | CoFile address and hello@cofile.app |

The approval request ("Your proof is ready to approve: …") puts the rehearsal line in the `held` band when it's a rehearsal and attaches the state review page as today. "Card security code needed: …" leads to Ready to pay, with the warning "Never reply to this email with the code." set as its own paragraph with a `stop` icon. "More information needed", "Changes requested", "Completed" (with "Documents: …"), "Rejected by the state" and the staff notices ("Site changed — review needed", "Portal bot check", "Failed", "Blocked", "Checking whether the state received") all use the same template with the tone icon matching 4.4. Sign-up ("Confirm your email for CoFile"), "Your partner account is open", "Your CoFile account is ready", "Reset your password" and invitations ("You're invited to {firm}'s filing portal") use the CoFile template. "Filing submitted", "Documents back" and "EIN issued" get designed template slots with the matching turn strip; their words are for the copy owner. Every email has a plain-text part, a dark-mode variant (logo plates kept white), and is tested in Litmus across 40 clients.

### 10.9 Proposed new surfaces

The brief allows new surfaces where the design needs them. These four came out of the blueprint. Each reuses existing copy where it can, and needs the copy owner where it can't.

| Surface | Who | Why | What it shows |
|---|---|---|---|
| **Drift reviews** (platform staff) | CoFile staff | Row 10a of the blueprint is a human decision with no screen today | Approved snapshot vs today's screen, differences outlined, decision buttons (10.5) |
| **Client filing status** (`api.cofile.app/approve/<token>/status`, read-only after a decision) | The client | After "Approval recorded", a client hears nothing until "Completed" or "Rejected". For a Florida filing that can be weeks | The client Turn Line through to "Accepted by the state", the locked status labels, and the firm's support line. No details, no fees, nothing sensitive: just where it is |
| **Coverage history** (`/coverage`) | Firms, procurement | "Rehearsals are also how each filing type earns its way to live." A dated record of each type's steps makes that claim checkable | The ladder from 10.1 with a date at each step reached, filterable by state |
| **Service status** (`status.cofile.app`) | Everyone | State portals go down and change. A firm whose filing says "Paused: state site changed" wants to know if it's just them | Per-portal availability (NY DOS, NYS-100, NJ, IRS, FL) and open drift reviews by portal, without filing details |

---

## 11. The white-label theming system

### 11.1 What a firm controls

| Slot | Input | Where it shows | Guardrail |
|---|---|---|---|
| Display name | Text, 80 characters max | Header, proof, emails, "Send to {firm}" | Wraps to two lines at most; at more than 32 characters the header drops the logo's text-lockup space |
| Logo | PNG, JPEG, WebP (or SVG, proposed); optional dark-background version | Desk rail, client header, proof, emails | Auto-trim, plate detection, optical sizing (11.3) |
| Main colour | Any hex | Primary buttons, baton, links, focus halo, header rule | The contrast algorithm (11.2); never used for status |
| Second colour | Any hex, optional | The 4 px header rule only | Used only if it differs from paper by 1.5:1 or more; otherwise the main colour is used |
| Font | 10 presets or an upload (WOFF2, WOFF, TTF, OTF, 600 KB) | Voice role only: firm name, page titles on client pages, email headline | Glyph and metric check (11.5) |
| Support email | Email | Client footers and proof | |
| Web address | Slug | Permanent pages | |

A firm doesn't control: status colours, the rehearsal band, fees and values (Record face), body text, field styling, the beta notice, consent text, or the position and size of "with CoFile".

### 11.2 The colour algorithm

It runs on save, server-side, and is stored as a theme JSON per firm (so the proof, emails and pages all use identical values). It works in OKLCH, with gamut mapping by chroma reduction.

```
input  P  (firm main colour), INK = #111A21, WHITE = #FFFFFF
1. If contrast(WHITE, P) ≥ 4.5           → accent = P,  on-accent = WHITE           (step A: keep)
2. Else if contrast(INK, P) ≥ 7.0         → accent = P,  on-accent = INK             (step B: light brand, dark text)
3. Else                                   → lower L by 0.01 (same H, C clipped to sRGB)
                                            until contrast(WHITE, P′) ≥ 4.5         (step C: deepen)
4. hover      = L − 0.05 (white text) or L − 0.06 (ink text)
5. tint       = OKLCH(0.965, min(C × 0.25, 0.035), H)
6. link       = start at min(L, 0.62), lower L until contrast(link, WHITE) ≥ 4.5
7. dark mode  = L′ = max(L, 0.74), C′ = min(C, 0.16); raise L′ until contrast(#0E1317, accent) ≥ 6.0;
                on-accent-dark = #0E1317
8. deep       = OKLCH(0.32, min(C, 0.12), H)   (used by the red-band rule, 11.4)
9. record     ΔL, ratios and the step used, for the brand check panel
```

Step B exists because firms with light brands (golds and sky blues) deserve to see their real colour, not a muddy darkened version. The 7:1 threshold keeps mid-tones (which pass ink at only 5:1 and look dull) in step C.

**Worked examples** (computed with this algorithm):

| Firm picks | Step | Accent | Text on it | Ratio | Hover | Tint | Link | Dark accent |
|---|---|---|---|---|---|---|---|---|
| `#2E9C6A` mid green | C | `#058656` | white | 4.61 | `#06754B` | `#E3FAEC` | `#058656` | `#5BC38F` |
| `#1F4FD1` blue | A | `#1F4FD1` | white | 6.78 | `#123EC0` | `#EEF4FE` | `#1F4FD1` | `#80A9FE` |
| `#F2C94C` gold | B | `#F2C94C` | ink | 11.09 | `#DEB633` | `#FCF3D9` | `#917301` | `#F2C94C` |
| `#7FB3E6` sky | B | `#7FB3E6` | ink | 7.95 | `#6DA0D2` | `#EBF5FF` | `#4678A8` | `#7FB3E6` |
| `#00B3B3` bright teal | C | `#018484` | white | 4.53 | `#087473` | `#E2F9F8` | `#018484` | `#58BEBD` |
| `#E85D75` coral | C | `#CC435E` | white | 4.63 | `#BA3250` | `#FFEFF0` | `#CC435E` | `#FE7B8E` |
| `#9AA0A6` grey | C | `#70767C` | white | 4.59 | `#62686D` | `#F2F4F5` | `#70767C` | `#A5ACB2` |

### 11.3 Logos

1. **Trim** transparent or flat-colour margins (within ΔE 2 of the corner pixels).
2. **Detect the background.** If the logo has an opaque, near-white background, it gets a white plate with 8 px padding and `--r-sm` everywhere, including dark mode. If it's transparent and its mean luminance against the page background is under 2:1 (a white logo on a white page), it gets a plate in `--firm-accent`.
3. **Optical sizing.** Logos are sized by area, not height: target 2,400 px² in the client header, clamped to 40 px tall and 160 px wide (desk rail 200 × 48). A square monogram and a long wordmark look equally heavy.
4. **Dark mode:** use the uploaded dark version if there is one; otherwise keep the plate.
5. Serve as AVIF/WebP at 1×, 2× and 3×, plus a PNG for email.

### 11.4 Collision rules

Status tones never change per firm. Brand and status are kept apart by role (firm colour is never used for status), by shape (rectangular buttons, pill chips) and by icon plus words. Two specific rules:

- **Red band.** If the accent hue is between 5° and 40° with chroma above 0.12 (reds, vermilions, deep oranges), the **proof's approve button** and the intake submit use the firm's **deep** variant (step 8). A red "Approve" reads as a warning to a nervous client.
- **Violet band.** If the accent hue is between 280° and 315° with chroma above 0.10, rehearsal surfaces keep the hatch at 1.5× opacity, so "rehearsal" never looks like "brand".

### 11.5 Fonts

Presets are pre-checked. An upload goes through three checks: it must cover Basic Latin plus Latin-1 (Spanish: á é í ó ú ñ ü ¿ ¡), its x-height must be at least 0.42 of the em, and it must have regular (400) and bold (600+) weights or a variable weight axis. If it fails any check, it's used only for the firm name in the header, and the brand check panel says why. Uploaded fonts are subset to the needed range, converted to WOFF2 and served from cofile.app with `font-display: swap` and metric-matched fallbacks (`size-adjust`), so text doesn't jump.

### 11.6 Testing every theme

Each firm's computed theme is snapshot-tested on save against five surfaces (desk header, intake, proof, email, widget). If any text-on-colour pair falls below its threshold (which shouldn't happen, but the check catches bugs), the save is refused with the panel showing the failing pair.

### 11.7 Layering: platform, enterprise, firm

Brand settings stack in three layers. Each layer can only set what the layer above allows.

| Layer | Who sets it | Controls | Locks it can apply |
|---|---|---|---|
| Platform | CoFile | Status tones, type roles, the proof's structure, consent text, the beta notice, accessibility floors | Everything below can't change these |
| Enterprise (tenant) | The enterprise, in its white-label setup | Its name, logo, color, font and support contact on the proof; whether "with CoFile" shows; whether its firms may brand their own pages | "Firms keep our look" (today's behavior: firms an enterprise invited keep the enterprise's white-label look) or "Firms may add their logo" |
| Firm | The firm, in Setup: Branding | The slots in 11.1, where its layer allows | |

Partner firms that signed up with CoFile directly sit under the platform's own tenant. That tenant allows full firm branding and always shows "with CoFile".

**The computed theme**, stored per firm and per tenant, read by the web app, the engine's proof renderer and the email renderer alike:

```json
{
  "version": 3,
  "computedAt": "2026-11-26T15:04:00Z",
  "source": { "primary": "#2E9C6A", "secondary": "#C8A951", "font": "lora", "logo": "artifact:7d1e…" },
  "light": {
    "accent": "#058656", "onAccent": "#FFFFFF", "accentHover": "#06754B", "tint": "#E3FAEC",
    "link": "#058656", "deep": "#1E4A37", "rule": "#C8A951",
    "ratios": { "onAccent": 4.61, "link": 4.61 }, "step": "C", "deltaL": -0.07
  },
  "dark": { "accent": "#5BC38F", "onAccent": "#0E1317", "tint": "#10281B", "link": "#5BC38F", "ratios": { "onAccent": 8.58 } },
  "bands": { "red": false, "violet": false },
  "logo": { "light": "/logo/7d1e…", "dark": null, "plate": "white", "box": [148, 36] },
  "font": { "role": "voice", "stack": "'Lora', Georgia, serif", "checks": { "spanish": true, "xHeight": 0.5, "weights": [400, 600] } }
}
```

The `deep` value above is illustrative; it's computed by step 8. Version bumps invalidate every cached theme, so a change to the algorithm reaches every firm on the next page load.

---

## 12. Accessibility, Spanish and dark mode

### 12.1 Accessibility

Target: WCAG 2.2 AA everywhere, and AAA (7:1) for text contrast on the proof, the intake form and client emails, because those are read by the oldest and least technical readers, often on a phone outdoors.

- **Size and reflow.** Base 17 px on client pages; nothing a reader must act on is below 15 px. Zoom to 400% reflows to one column with no horizontal scroll, except data tables, which scroll inside their container with a visible edge fade and a "scroll" affordance on the first column.
- **Focus.** Always visible: the double ring (2 px inner `--focus-inner`, 2 px outer `--focus-outer`) works on any firm color, white or black. Skip link "Skip to content" **[new label]** on every page. Focus order follows reading order; drawers and dialogs trap focus and return it.
- **Status.** Every status is a word plus an icon. The Turn Line has a text equivalent (9.5). Live status changes go to a polite live region; errors that block a submit go to an assertive one.
- **Forms.** Labels are always visible. Errors are tied with `aria-describedby`; the error summary links to each field; required fields are explained up front ("Fields marked * are required."). Grouped fields use `fieldset` and `legend`, as `IntakeForm` already does. Autocomplete tokens are set on every name, address, email and phone field, so phones can fill them.
- **Timing.** Approval links expire, so the proof states the deadline in words near the top (the locked "Please decide by…"). Nothing on a client page times out while it's open. The security code's one-hour window applies only after it's entered and is shown as a countdown.
- **The state's review image** keeps the locked alt text, and every value it shows is also listed as text under "Filing details".
- **Signature pad.** Signing by keyboard isn't possible for a drawn signature, so the pad's help explains it and the existing alternative stays available: send a client link so the signer signs on their own device.
- **Testing.** axe-core in CI; manual audits with NVDA + Firefox, JAWS + Chrome, VoiceOver on iOS and macOS, and TalkBack on Android; moderated sessions with at least four participants over 65, two low-vision users (one using 200% zoom, one using a screen magnifier) and two screen-reader users. The proof is tested end to end by each.

### 12.2 Spanish

Client pages (intake, the proof, decision and error pages, client emails) are designed for Spanish from day one. The desk and dashboard follow in a later phase.

- **Room to grow.** Layouts allow 35% text expansion. Buttons wrap to two lines rather than truncating. The approve button is already two-line ready on a 390 px phone, and its Spanish rendering will be longer still.
- **Switching.** A language switch in the client header, "English · Español" **[new label]**, is remembered per link and follows `Accept-Language` on first visit. The `lang` attribute is set per page, and per element for any string left in English.
- **What's never translated.** Values going to the state stay exactly as entered. State review images stay as the state shows them. Fees stay in US format ($103.50).
- **Legal text.** Consent, authorization and no-refund text is shown in Spanish only once counsel approves a translation, with the English original one tap away and the version recorded with the approval.
- **Who writes it.** Translations come from a legal-financial specialist agency and are approved by the copy owner. The design doesn't invent them.
- **Typography.** Atkinson Hyperlegible Next and Mono, and Newsreader, all cover the Spanish character set; firm uploads are checked for it (11.5).

### 12.3 Dark mode

It follows `prefers-color-scheme`, with a manual override (light, dark, system) in the desk and dashboard menus, stored per user. CoFile's public pages offer the same toggle in the footer. Every token has a dark value (sections 4 and 11). State review images, logos with opaque backgrounds and signature images always sit on white plates, because they were made for white. The proof follows the device setting; in dark mode, fees and the approve button keep their computed contrast and the consent note keeps its ink rule (in `--ink`, now light).

### 12.4 Forced colors and high contrast

Under `forced-colors: active` (Windows high contrast):
- Status chips become 1 px `CanvasText` outlines with the tone icon kept. Icons are inline SVG with `fill: currentColor`, so they survive.
- The Turn Line keeps its geometry. Baton and gates use `Highlight`; the hatch is dropped and the held gate shows its Gate icon instead.
- Buttons use `ButtonText` and `ButtonFace`, and the firm color is ignored, as the user intends.
- Focus uses the system `Highlight` 3 px outline.

### 12.5 Print

Firms print. A CPA's file still often has paper in it, and a record of what was approved belongs there.
- **Filing detail** prints as a one-to-three-page record: the firm's logo and name, the filing title, status and dates, the Turn Line as a static vertical event list, what was approved (the proof's details and fees), documents listed by name, and the EIN. Navigation, buttons and the rail are hidden. Footer: filing reference in Record and the page number.
- **The proof** prints as it looks, minus the decision area, with "Filing reference" and the deadline in the header.
- **Terms and Privacy** print with their version and date.
- Print uses ink on white only (no tints), 11 pt Hand and 10 pt Record, with page breaks avoided inside fee tables.


---

## 13. Production

### 13.1 Stack and files

| Layer | Choice |
|---|---|
| Design files | Figma: one library "CoFile System" (tokens, components, the Turn Line variants), one "Firm Themes" file with the 24-firm stress set, page files per area |
| Tokens | W3C Design Tokens (DTCG) JSON, built with Style Dictionary into CSS custom properties, TypeScript constants and an email-safe inline palette |
| Theming engine | A pure TypeScript module (`theme/compute.ts`) using Culori for OKLCH, shared by `web/` and the engine (`src/approvals/render.ts`), so the proof and the desk compute identical colours |
| Components | React components in `web/components/ui/`, documented in Storybook, with visual regression in Chromatic across light, dark and the 24 firm themes |
| Turn Line | SVG components with a JSON event input; Rive for the three home page story animations, with static SVG fallbacks |
| Emails | React Email templates rendered server-side, sent through Resend, tested in Litmus |
| Fonts | Self-hosted WOFF2 subsets of Newsreader, Atkinson Hyperlegible Next and Mono; preloaded for the Hand face only |
| Quality gates | axe-core and Playwright contrast checks in CI; Lighthouse budget of 90+ on the proof on a mid-range Android profile; proof page weight under 120 KB before the review image |

### 13.2 Asset list

- Gate mark (SVG master, 16 px hinted, app icons 180/192/512, social 1200 × 630), wordmark, three lockups, the "with CoFile" mark.
- 48 icons (24 px), 6 status icons (14 px and 20 px), 4 channel icons.
- Turn Line component set: compact glyph, full blueprint, client line, email table, vertical variant.
- Specimen components: sample proof, redrawn NJ review page, rehearsal log, document specimens, EIN letter specimen.
- Three Rive animations (handoff, two readings match, held on purpose) with static fallbacks.
- Empty-state line drawings (8), the 404 and error illustrations.
- Email templates: 18 (14 filing events, 4 account).
- The 24-firm stress set: real-world colour, logo and font combinations, including white logos, JPEG letterheads, neon colours, script fonts and 60-character names.

### 13.3 What to commission

| What | From (by kind) |
|---|---|
| Wordmark lettering and Gate mark refinement | An independent type studio |
| Icon set | An icon studio with public-sector or banking experience |
| Blueprint diagrams and document specimens | A technical illustrator who draws transit maps or wayfinding |
| Three story animations | A small motion studio that works in Rive |
| Spanish localization | A legal-financial translation agency, with counsel review |
| Accessibility audit | An accessibility consultancy with disabled and older-adult testers |
| Research | 12 firm staff (CPA, payroll, CFO, title) and 12 clients (4 Spanish-first, 4 over 65), moderated, in two rounds |
| Portrait series (Phase 4, optional) | A documentary photographer through an agency |

### 13.4 Phases

| Phase | Weeks | Scope |
|---|---|---|
| 0. Foundations | 1 to 3 | Tokens, type, theming engine, stress set, status components, the Turn Line |
| 1. Trust surfaces | 4 to 7 | The proof, decision and error pages, intake, client emails; research round 1 with clients |
| 2. The desk | 8 to 12 | Turn board, filing detail, new filing form, Ready to pay, setup with the brand check; research round 2 with firm staff |
| 3. Public site | 13 to 16 | Home, account pages, legal, 404 and error, animations |
| 4. Enterprise and docs | 17 to 20 | Dashboard, drift reviews, docs and reference, widget theming |
| 5. Polish | 21 to 22 | Spanish launch, accessibility audit fixes, optional portrait series |

### 13.5 Design files and naming

| Figma file | Pages |
|---|---|
| CoFile System | Cover · Tokens (light, dark) · Type · Icons · Gate mark and lockups · Buttons · Fields · Chips · Turn Line · Tables · Navigation · Notices and banners · Empty states · Toasts · Dialogs and drawers · Email blocks |
| Firm Themes | The 24-firm stress set, each applied to: desk header, intake on phone, proof on phone, email |
| Public site | Home (desktop, tablet, phone) · Account pages · Legal · 404 and error |
| Filing desk | Turn board · Setup and brand check · New filing (state, type, form) · Filing detail (every status) · Client links · From email · Signatures · Ready to pay · Billing |
| Client pages | Intake · The proof (live, rehearsal, with code, with EIN after acceptance) · Decision and error pages · Spanish layouts |
| Enterprise | Dashboard pages · Drift reviews · Docs and reference · Widget |
| Emails | All 18 templates, light and dark |

Component names match code names (`TurnLine/Compact`, `StatusChip/held`, `ProofSheet/Fees`). Every status variant of the filing detail page is a separate frame, because a build team needs to see "Name unavailable" as clearly as "Completed".

### 13.6 Acceptance criteria (the build is done when)

1. Every status label in `web/lib/status.ts` renders with its tone, icon and turn from 4.4, in light, dark and forced colors.
2. All 24 stress-set firms pass the automatic contrast checks on all five themed surfaces, and their logos sit inside their boxes without distortion.
3. The proof scores 100 in Lighthouse accessibility and 90+ in performance on a mid-range Android profile, and passes a screen-reader walkthrough from the email to "Approval recorded".
4. A rehearsal is identifiable on every surface it appears on (desk row, detail, intake, proof, email) by color, pattern and word, checked in grayscale.
5. The coverage ladder's Live column reflects `liveFilings` per type, and an empty Live column renders as visibly empty.
6. No customer-visible surface contains "Keystone", "sign in" in new strings, or a price outside the desk's Billing page.
7. Every quoted string in the build matches the repo's copy byte for byte (a test compares rendered text to the source strings).

### 13.7 How we'll know it works

Service measures, tracked per filing type and per firm, reviewed monthly with the product owner:

| Measure | Why it matters |
|---|---|
| Time from "Send the proof to my client" to "Approval recorded" | The client's handoff; long times mean the email or the proof isn't working |
| Proof opened but not decided within the deadline | Abandonment at the gate |
| "Request changes" rate, and its most common comments | Whether the firm's draft or the AI draft is wrong, and where |
| Fields edited after an AI draft, per field | Where provenance marks matter most |
| Time an approved filing waits in Ready to pay | The hidden second gate |
| Staff minutes per filing (from desk open to send) | The firm's real cost, and the product's real promise |
| Rehearsals per firm before the first live filing | Whether rehearsal is earning trust, as "Run one rehearsal. Then decide." intends |

---

## 14. Appendix

### 14.1 What I'd push back on in the current site

1. **The proof's error and decision states are unbranded.** A client who taps an expired link gets a bare `<p>` with no firm name, no logo and no way to reach the firm. That's the moment they most need reassurance that the link was real. All approval responses should render in the branded frame.
2. **Green does too many jobs today.** It means "approved", "live", "the button that moves a filing forward" and CoFile's brand all at once. When everything forward-moving is green, green stops telling you anything. Separate brand (ink, or the firm's colour) from status.
3. **Rehearsal is styled as a warning.** Amber notices and a "warn" badge make the product's best feature look like a problem. Give it its own tone and treat it as a feature.
4. **The desk list is flat.** A table sorted by date makes staff scan for what's theirs. Group it by whose turn it is.
5. **"Ready to pay" is a hidden gate.** It's a notice and a nav item, but it isn't shown as a step in the filing's progress. It should be a station on the Turn Line with a count badge.
6. **The firm's font is applied to everything, including inputs and values.** A firm's display font shouldn't set the fees on the proof. Limit it to the Voice role.
7. **The brand form tells firms to "choose a dark color"** instead of fixing contrast for them. Fix it automatically and show what was changed.
8. **API method chips borrow status colours** (GET green, DELETE red). They should be neutral.

### 14.2 Copy notes

I didn't change any of these in the design; they're for the copy owner.

1. **"Test" badges.** The desk filings list and the dashboard filings list show "Test" for rehearsals, and filing detail says "test run". The locked term is "rehearsal". I've designed the Rehearsal chip in those places pending your decision.
2. **Sample vs real approve button.** The home page sample proof says "Approve for filing"; the real proof says "Approve, and authorize submission and payment". A client who has seen the sample may hesitate at the longer button. Consider aligning the sample.
3. **"1 approved filing is ready to pay and need your card's security code."** The singular form needs "needs".
4. **"Sign in" wording.** "Google sign-in…" (login errors), "You're not signed in to this filing desk" and "People who sign in to this dashboard" use sign-in language against the log-in rule. "Google sign-in" may be fine as Google's product name; the others could become "logged in" and "log in".
5. **Branding help text.** "Button text is white, so choose a dark color." stops being true once contrast is fixed automatically. Suggested direction: tell the firm any color works and that the preview shows any adjustment.
6. **Brand preview button "Send for approval"** doesn't match the real client button "Send to {firm}".
7. **New labels the design needs** (proposed, to be written by you): Turn Line lanes ("You", "Your client", "CoFile", "The state"; for clients the firm name, "You", "The state"), "Done" group, ladder column headings, brand check names and messages, "[n] fields filled", "[n] minutes", "Clear" (signature pad), the turn glyph's accessible name, "or" on the proof, "Skip to content", "English · Español", the table pager, and the beta notice's "More".
8. **Missing touchpoints.** There's no "Submitted to the state" or "EIN issued" email, and "Completed" carries the documents. The blueprint wants all three as separate moments; the templates are designed, the words are needed.
9. **"The engine posts each filing event…"** on the Webhooks page uses "the engine", which the copy review asked to avoid outside the docs.
10. **Staff email subject "Site changed — review needed"** uses an em dash; other subjects use a colon. Consider a colon for consistency.
