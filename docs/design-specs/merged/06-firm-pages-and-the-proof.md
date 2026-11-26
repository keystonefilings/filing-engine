# CoFile merged design, part 6: the firm's pages and the proof (10B)

Merge round, Nov 26, 2026. This part designs every page that carries a firm's name: the filing
desk (`cofile.app/p/<firm>`), the proof the firm approves, the firm's permanent page for each
filing (`cofile.app/<firm>/<service>`), and the client link pages (`cofile.app/i/<token>`) with
the intake form they share. It is built on `01-foundation.md`, which is binding: its tokens, type
scale, theming rules (3.5 to 3.7), example data (D4) and motion rules (D2) are used as they are and
are referred to by section number ("3.5", "4.3", "D2"). The choices this part made where the ten
designers split are in `DECISIONS.md`.

The copy is locked. Every line in quotation marks below is the product's own text, from
`web/app/p/[slug]/`, `web/app/[firm]/[service]/`, `web/app/i/[token]/`, the components they use
and `src/approvals/render.ts` with its routes in `src/api/server.ts`. Text in braces, such as
`{firm}` or `{title}`, is filled in by the product. Words this design needs that don't exist are
marked `[copy needed]` and listed in 10B.30. Apostrophes the code writes as `&apos;` render as ’
(5.4).

Credits in parentheses name the designer an idea comes from. Most of this part follows Hal
(the Letterhead on every surface, the proof, the stationery suite in Branding), with Priya (the
desk shell, the QA gallery, the proof's details), Dev (logo analysis, the empty desk's live page,
edge cases), Greta (typesetting the firm's name, the proof as a printer's proof, stage lines) and
Marcus (the logo bay, the live preview, numbered sections on the proof, mini previews of the
client's page).

---

## 10B.0 What these pages are for

These are the pages a firm owner opens every working day, and the pages her clients see. They
have one job each:

| Surface | Who sees it | The one thing it must do |
|---|---|---|
| The filing desk | The firm's staff | Feel like the firm's own office, with its next job in its own color |
| Branding (Setup, step 2) | The firm owner, once | Show her, before any client does, her logo, color and font done right everywhere |
| The proof | The firm's approver | Be the calmest, most legible sheet in the product, with one place to say yes |
| The firm's page for a filing, a client link | The firm's client, usually on a phone | Look entirely like the firm, and be easy to fill in at arm's length |

Register 2 (2.4) holds on all of them: the firm's Letterhead leads, the firm's colors take Brass's
place, Founders Grotesk does the work, Miller is absent except the Imprint's italic "with", and
CoFile is only the 13 px Imprint. **No Brass, no Miller headline, no Name Plate mark appears on any
page in this part.**

---

## 10B.1 What every firm page shares

**Reading the wireframes.** ◆ your turn, ● done, ◐ attention, ○ in hand, ▬ problem (4.3); ⚲ the
ghost-light glyph and a dashed box the rehearsal mark (4.4); ═ the Firm Rule's 3 px line and the ─
under it its 1 px line (3.5); ▭ a neutral Rule bar where no words exist (D1.1); ▲ over ≈≈ Harbor &
Pine's pine-and-waves symbol. Numbers beside a box are pixels.

### 10B.1.1 Grounds and sheets

| Surface | Page ground | Content | Depth |
|---|---|---|---|
| The filing desk | `--firm-wash` (Bond `#F5F5F2` when the firm has set no color) | White sheets, 1 px Rule `#DDD7CB` border, `--r-sheet` 2 px | `--e0`: no shadow inside the app; paper on paper (6.4) |
| The proof, the decision page | `--firm-wash` | One centred white sheet, 760 px | `--e-sheet` |
| Client pages (filing page, client link, their states) | `--firm-wash` | One white sheet, 760 px, form column 640 px | `--e-sheet` on desktop and tablet; none on phones, where the sheet is the screen |

The desk's Letterhead row and navigation row are white (Sheet), so every logo sits on the white
it was drawn for (3.5).

### 10B.1.2 The firm-page type in use

From 5.3, plus the sizes this part needs inside those tokens. The firm's font appears only where
3.7 allows: the typeset name, page titles, client-page and proof headings, and client-page button
labels for preset fonts.

| Use | Token | Size / line | Face, weight, color |
|---|---|---|---|
| Typeset firm name, desk row | `firm-name` | 20 / 26 desktop, 17 / 22 phone | Firm font 600, Plate Ink |
| Typeset firm name, sheets | `firm-name` | 24 / 30 beside a logo, 30 / 36 alone; phone 20 / 26, 24 / 30 | Firm font 600, Plate Ink |
| Desk page titles ("Filings", "Ready to pay") | `page-title` | 32 / 38, phone 28 / 34 | Firm font 600, Plate Ink |
| Client-page h1 (the filing type) | `page-title` | 32 / 38, phone 28 / 34 | Firm font 600, Plate Ink |
| The proof's title (the business name) | `proof-title` | 34 / 40, phone 28 / 34 | Firm font 600, Plate Ink |
| Desk card titles ("Your proof is ready", "Documents") | `section` | 22 / 28, phone 20 / 26 | Founders Grotesk Medium, Plate Ink |
| Client-page and proof h2, fieldset legends | `section` | 22 / 28, phone 20 / 26 | Firm font 600 |
| Desk body | `body-desk` | 17 / 26 | Founders Grotesk Text 400 |
| Client and proof body | `body-client` | 18 / 28, phone 17 / 27 | Founders Grotesk Text 400 |
| Kicker on firm pages ("Step 2 of 3", the proof's filing type) | — | 15 / 22 | Founders Grotesk Medium, Graphite, sentence case, no lead rule |
| Tables | `table` | 16 / 22, head 14 / 18 Medium Graphite | Founders Grotesk Text |
| Labels, help, input, chips | `label`, `help`, `input`, `chip` | 16 / 22, 15 / 22, 18 / 24, 14 / 18 | As 5.3 |
| Values the state receives | `proof-value` | 16 / 24, phone 17 / 24 | Founders Grotesk Mono 400 |
| Fees, totals | `fee`, `total` | 18 / 26, 22 / 28 | Founders Grotesk Text tabular; total Medium |
| Small lines (help, legal, "Questions? Email …") | `small` | 15 / 23 | Founders Grotesk Text, Graphite |
| Dates, times, counts in tables | — | 15 / 22 | Founders Grotesk Text tabular, Graphite |
| The Imprint | `imprint` | 13 / 16 | 3.4, exactly |

**Dates** are set as "Dec 1, 2026" and "Dec 1, 2026, 9:14 AM" (en-US, short month, tabular), the
format the registered-agent panel already uses, never "12/1/2026": a month name can't be misread
(Elaine, Greta). This changes formatting, not words.

### 10B.1.3 Spacing and sizes on firm pages

On the 8 px scale (6.3). Desk: 32 px between blocks, 48 px between groups (24 / 32 on phones).
Client pages and the proof: sheet padding 48 px desktop, 40 px tablet, 20 px phone; 24 px field to
field, 48 px between fieldsets (20 / 40 on phones).

| Element | Desktop | Phone (390) |
|---|---|---|
| Desk Letterhead row | 76 px | 64 px |
| Firm Rule | 3 px `--firm`, 2 px gap, 1 px `--firm-2` (3.5) | same |
| Desk navigation row | 52 px | none: the menu sheet (10B.3) |
| Fields (input, select) | 52 px tall, 18 px text | 56 px tall |
| Textarea | 3 rows minimum, 120 px | same |
| Primary button | 48 px on the desk; 56 px on client pages; 60 px for the proof's approve button | 56 px, full width |
| Secondary button | 48 px; 52 px under the proof's approve button | 56 px, full width when it stands alone |
| Small button ("Turn off", "Remove", "Fill in", "Copy link") | 40 px, 15 px label | 48 px (`pointer: coarse`) |
| Checkbox, radio | 24 px box, 48 px row | same |
| Tap targets | 48 × 48 px minimum, 8 px apart (6.6) | same |

### 10B.1.4 Buttons on firm pages

All buttons are chamfered (`--chamfer`, 6.4), labels in sentence case as the copy writes them.

| Kind | Fill | Label | Border | Hover / pressed | Used for |
|---|---|---|---|---|---|
| **Primary** | `--firm-fill` | `--firm-on`; firm font 600 18 / 24 on client pages and the proof (preset fonts), Founders Grotesk Medium 18 / 24 elsewhere and for uploaded fonts (3.7) | none; or 1 px `--firm-ink` when the fill is light (3.6 case b); on the dark desk, 1 px `--firm-ink-dark` when the fill has under 3:1 against Night Card | fill 8% deeper in OKLCH L in `--t-quick`; press: down 1 px with a 1 px inset shadow for 80 ms, release 160 ms `--ease-settle` (D2) | One per view: "New filing", "Open the proof and approve it", "Create the proof", "Send to {firm}", "Approve, and authorize submission and payment", "Save and continue", "Pay and file" |
| **Primary, near-white firm** (3.6 case e) | Plate Ink | Sheet | a 4 px left edge in `--firm` | Plate Ink 8% lighter | The same, for a firm whose main color is near-white |
| **Secondary** | Sheet | Plate Ink, Founders Grotesk Medium | 1.5 px Plate Ink | fill `--firm-row` | "Send a client a link", "Request changes", "Manage billing", "Change" |
| **Small** | Sheet | Plate Ink, 15 / 20 Medium | 1 px Rule Strong `#8A8578` | fill `--firm-row` | "Fill in", "Copy link", "Turn off", "Clear signature", "Same as" choices |
| **Danger, small** | Sheet | Madder `#9A2D2D` | 1 px Madder | fill Madder Tint `#F8E6E3` | "Remove" on a saved signature |
| **Text button** | none | `--firm-ink`, underlined 1 px | none | underline 2 px | "Use a link instead", "Remove logo" |

**Pending.** A button that is waiting keeps its size and shows the product's own pending label
("Saving…", "Sending…", "Opening Stripe…", "Opening…", "Checking…"), its fill at 85% opacity,
`aria-busy="true"`, and no spinner unless the wait passes 3 s; then a 16 px ring turns once a
second before the label (D2).

**Disabled.** Rule Strong outline, Graphite label, Bond `#F5F5F2` fill; never just faded.

### 10B.1.5 Status chips on firm pages: the product's labels, mapped to 4.3

`StatusBadge` takes its label and tone from `web/lib/status.ts`. The product's three tones
("ok", "warn", "bad") become the foundation's shapes like this, so a firm's own next step reads as
an invitation in its own color, and nothing else does:

| Status label (product) | 4.3 tone | Chip |
|---|---|---|
| "Waiting for approval", "Needs information", "Changes requested" | **Your turn** | Sheet, 1 px `--firm-ink` border, `--firm-ink` text, ◆ in `--firm` |
| "Approved", "Submitted to the state", "Accepted by the state", "Completed", "EIN issued" | **Done** | Solid Verdigris `#2E6B57`, white text, ● white (the quiet tint version in dense tables, 4.3) |
| "On hold", "Paused: state site changed", "Name unavailable", "Being checked" | **Attention** | Ochre Tint `#F7EDD8`, Ochre `#855A0C` text, ◐ |
| "Received", "Getting the state's review page", "Queued", "Filing now", "Final check" | **In hand** | Sheet, 1 px Iron `#3F434F` border, Iron text, ○ |
| "Needs correcting", "Rejected by the state", "Failed", "Stopped" | **Problem** | Madder Tint `#F8E6E3`, Madder text, ▬ |
| "Test", "Rehearsal" | **Rehearsal** | Sheet, 1.5 px dashed Plate Ink (dash 4, gap 3), the ghost-light glyph (4.4) |

Chips are 28 px tall (`--chamfer`), 14 / 18 Medium, 10 px side padding, 6 px between glyph and
word. The glyph is `aria-hidden`; the word carries the meaning.

### 10B.1.6 Notice slips

The product's notices (`notice`, `notice ok`, `notice warn`, `notice bad`) are set as **slips**:
a strip of paper laid on the sheet. Full column width, `--r-sheet`, 16 px × 20 px padding, the
sentence in the page's body size, its link underlined in `--firm-ink`. Never a toast, never
dismissible, never animated except the 200 ms crossfade when it first appears.

| Slip | Fill | Edge | Glyph | Used for (examples) |
|---|---|---|---|---|
| **Your turn** | Sheet | 1 px `--firm-ink`, plus a 3 px `--firm` left edge | ◆ `--firm` | "1 filing needs someone to act.", the next-step line on a filing ("The proof is ready: check exactly what will be filed and approve it.") |
| **Attention** | Ochre Tint | 1 px Ochre at 35% | ◐ Ochre | "Real filings need an active subscription; rehearsals are free. Subscribe", "{n} approved filings are ready to pay and need your card's security code. Pay and file", the Google Docs notices |
| **Done** | Verdigris Tint `#E4F0EA` | 1 px Verdigris at 35% | ● Verdigris | "Saved to Google Docs. Open the record", "Already sent as a filing. Open the filing", "Saved. New filings offer these agents." |
| **Problem** | Madder Tint | 2 px Madder left rule; on red-family firms also a 1 px Plate Ink outline (3.6) | ▬ Madder | `lastError`, "Please fix these and submit again.", "That didn't save. Try again in a minute." |
| **Plain** | Bond `#F5F5F2` | 1 px Rule | none | "No saved signatures yet.", "None of the services you offer form a business, so there's no agent to save.", the 30-day deletion line |
| **Rehearsal** | Sheet | 1.5 px dashed Plate Ink | ghost light, 14 px | "Rehearsal: {title} isn't live yet, so this filing is a rehearsal. …", "This page is in rehearsal for now. …", "Rehearsal: nothing will be filed or paid, even if you approve." |

A rehearsal is never yellow and never a warning (all ten): the product's `notice warn` on its
rehearsal lines becomes the dashed Rehearsal slip.

### 10B.1.7 The states every page shares

| State | Treatment |
|---|---|
| **Loading** | Sheets and rows appear at their final size as blank paper, the table rows as 64 px blanks with a 12 px Rule bar where the name will be, pulsing 60% ↔ 100% opacity over 1.6 s. No shimmer, no spinner before 3 s (D2). The Letterhead and navigation never load late: they are server-rendered with the page |
| **Empty** | A Plain slip or an engraved vignette in Graphite (D1.4) at 160 px, its sentence in `body-desk`, and the page's primary action. Each page's own empty state is below |
| **Error in a form** | A Problem slip at the top of the form with the product's sentence, focused and announced (`role="alert"`); each field's message under the field in Madder 15 / 22 with the ▬ glyph, the field's border at 2 px Madder. Red alone never carries it (4.3) |
| **Success** | A Done slip in place of, or above, the form (`role="status"`), with the product's sentence |
| **Pending** | 10B.1.4 |
| **A page that fails** | 10B.21 |

### 10B.1.8 The beta notice on firm surfaces

The site-wide beta notice already words itself for firm pages: "Beta" and "This service is in
beta. Any filing can run as a rehearsal on the state's real website. It stops before the last
button, so nothing is filed or paid. Filing types go live one at a time." It names neither CoFile
nor its address there, so the firm's brand stays the only one.

On firm surfaces it is drawn as a **quiet strip under the Firm Rule**, not above the Letterhead,
so the firm's name is always the first thing on the page: white, one or two lines with 12 px above
and below, a 1 px Rule bottom edge, the
"Beta" chip in the rehearsal style (dashed, ghost light, 4.4), the sentence in `small` (15 / 23)
Graphite, on the content column. On the desk it sits under the navigation row; on client pages,
inside the sheet, 16 px under the Firm Rule. It is never dismissible and never in the embed widget
(as built). The proof and its decision pages are served by the engine, outside the site's layout,
and carry no beta notice today; their own rehearsal band says what matters there. Build note: render `BetaBanner` inside the firm layouts for these paths
instead of above them in the root layout.

### 10B.1.9 The tab and the favicon

On every firm surface the favicon is the firm's square logo crop, or its monogram tile (3.5.5),
and the tab names the firm, never CoFile (Dev): "Filings · Harbor & Pine CPA", "Branding · Harbor &
Pine CPA", "New Jersey LLC formation · Harbor & Pine CPA". The page part is the product's existing
title; only the suffix changes from the root layout's "· CoFile" to the firm's display name. The
proof keeps its own `<title>`, "{firm}: approve filing". The client link page keeps "Your filing",
followed by "· {firm}".

---

## 10B.2 Making a firm look its best: three worked examples

The system in 3.5 to 3.7 runs automatically. This section shows it at work on the three firms
every build and QA review uses: the two example firms (3.8, 4.7) and one deliberately awkward
brand. Each must look like itself, and look intended, on every surface in this part, with no hand
adjustment (Greta's test, 10B.2.5).

Five moves do the work, in this order (Hal, Dev, Greta):

1. **The logo sits on white, sized by area, never touched** (3.5.1): trimmed, its background read,
   sized so a square symbol and a wide wordmark look like peers.
2. **The name is typeset in ink, in the firm's font, with a compositor's courtesies** (3.5.2): the
   italic ampersand, credentials in small capitals, tracking by class, and no wrapping in the desk
   row.
3. **The color goes into the Firm Rule at full strength, and into everything else through the ink
   match** (3.6): the exact hex in the rule, a legible shade for buttons and links, a whisper of it
   under the sheet.
4. **The firm's font speaks the headings; Founders Grotesk states the facts** (3.7).
5. **Status, errors, focus and the Imprint never change** (3.6, "What never changes").

### 10B.2.1 Harbor & Pine CPA: a classic dark color, a serif, a square symbol

| | |
|---|---|
| Logo | Square symbol (a pine above two short wave lines), trimmed ratio 1.0; supplied as transparent PNG and as a JPEG on a white box (3.8). The name is typeset beside it |
| Colors | Main Harbor `#1D4E63`, second Pine `#2B5A47` |
| Font | Lora (preset), 600 |
| Tokens (4.7) | `--firm-fill` `#1D4E63` (white 9.0:1), `--firm-ink` Pine `#2B5A47` (7.9:1), `--firm-wash` `#F2F8FB`, `--firm-row` `#EBF7FE`, `--firm-tint` `#DDEEF7`, `--firm-ink-dark` `#6394AB` |

**Sizes by surface** (area rule, 3.5.1; the phone desk row uses 2,400 px², clamp 24–36 px, the one
value this part adds to the foundation's table):

| Surface | Logo | Typeset name |
|---|---|---|
| Desk row, desktop (3,200 px²) | 44 × 44 (height cap) | Lora 600 20 / 26 |
| Desk row, phone (2,400 px²) | 36 × 36 | Lora 600 17 / 22 |
| Sheets, desktop (6,400 px²): proof, client pages | 64 × 64 | Lora 600 24 / 30 |
| Sheets, phone (4,400 px²) | 48 × 48 | Lora 600 20 / 26 |

**The name, set.** "Harbor *&* Pine CPA": the ampersand in Lora Italic 600, because Lora has an
italic; "CPA" at 88% (17.6 px in the desk row) with +0.04 em tracking, because Lora has no true
small capitals; the rest at tracking 0 (a serif). 12 px between the symbol and the name, the name's
x-height centred on the symbol. Lora is size-adjusted to Founders Grotesk Text's x-height (3.7), so
the serif never looks timid beside the sans.

```
Desk Letterhead row, desktop (76 px)
┌────────────────────────────────────────────────────────────────────────────────────────────┐
│  ┌────┐                                                                                     │
│  │ ▲  │  Harbor & Pine CPA                         with CoFile     {signed-in email} ▾      │
│  │ ≈≈ │  └ Lora 600 20/26, "&" italic, CPA 88%     13 px Graphite   15 px Graphite           │
│  └────┘                                                                                     │
│  44×44                                                                                      │
├════════════════════════════════════════════════════════════════════════════════════════════┤ 3 px Harbor #1D4E63
│ ────────────────────────────────────────────────────────────────────────────────────────── │ 2 px gap, 1 px Pine #2B5A47
│  Filings   New filing   Ready to pay   Client links   Signatures   Setup   Billing           │ 52 px
│  ▔▔▔▔▔▔▔ 3 px Pine underline on the current page                                            │
└────────────────────────────────────────────────────────────────────────────────────────────┘
```

**What to check on Harbor & Pine.** The JPEG version shows no box on any white sheet (its white
background disappears, 3.5.1). On the dark desk it sits on the white logo plate. Its "your turn"
chip has Pine text and border with a Harbor lozenge, and Pine is near Verdigris in hue: the chip is
an outline and "Completed" (the home picture's "Filed") is a solid fill, so they never read alike (4.3; the green rule in 3.6). On
the dark desk the Harbor button has only 1.75:1 against Night Card, so it takes the 1 px
`--firm-ink-dark` `#6394AB` border (10B.1.4).

### 10B.2.2 Northgate Payroll: a warm mid-tone, a geometric sans, a wide wordmark

| | |
|---|---|
| Logo | Wide wordmark: a gate mark (two posts and a lintel that read as an N) then "Northgate Payroll", one color, transparent PNG; trimmed ratio 5.0 (the reference value for every drawing) |
| Colors | Main Ember `#C2410C`, no second color |
| Font | Montserrat (preset), 600 |
| Tokens (4.7) | `--firm-2` Ember at 35% `#EABCAA`, `--firm-fill` `#C2410C` (white 5.2:1), `--firm-ink` `#C2410C`, `--firm-wash` `#FEF5F2`, `--firm-row` `#FFF0E9`, `--firm-tint` `#FFE2D6`, `--firm-ink-dark` `#D76E4D` |

| Surface | Logo | Typeset name |
|---|---|---|
| Desk row, desktop | 25 × 126 | hidden on screen (kept as visually hidden text and in the tab) |
| Desk row, phone | 24 × 120 (height floor) | hidden |
| Sheets, desktop | 36 × 179 | hidden |
| Sheets, phone | 30 × 148 | hidden |

The wordmark already spells the name, so the name is never typeset beside it (3.5.2). Montserrat
headings are tracked −0.01 em (a sans) and size-adjusted down to Founders Grotesk's x-height, so a
wide geometric face doesn't look louder than the facts under it.

```
Client page, phone (390): the sheet is the screen
┌──────────────────────────────────────┐
│ 20                                   │ head margin 20
│ [▥ Northgate Payroll ]               │ wordmark 30 × 148, no name beside it
│ ════════════════════════════════════ │ 3 px Ember #C2410C
│ ──────────────────────────────────── │ 1 px #EABCAA
│ New Jersey LLC formation             │ Montserrat 600 28/34
│ Certificate of Formation for a       │ 17/27 Plate Ink
│ domestic LLC, filed online through … │
│ ┌──────────────────────────────────┐ │
│ ┃▬ Please fix these and submit     │ │ Problem slip: Madder text and glyph,
│ ┃  again.                          │ │ 2 px Madder left rule, 1 px Plate Ink
│ ┃  · {issue}                       │ │ outline (the red-family rule)
│ └──────────────────────────────────┘ │
│ 1  Name                              │ Montserrat 600 20/26; "1" in Ember
│ LLC name, without the ending *       │
│ ┃┌──────────────────────────────────┐│ 2 px Madder border on the field
│ ┃└──────────────────────────────────┘│
│ ┃▬ {the field's message}             │ Madder 15/22 with the bar glyph
│ …                                    │
│ ┌──────────────────────────────────┐ │
│ │      Send to Northgate Payroll   │ │ Ember fill, white Montserrat 600, 56 px
│ └──────────────────────────────────┘ │
└──────────────────────────────────────┘
```

**What to check on Northgate.** Ember sits in the red family (H 15°–40°, C > 0.12), so on its
pages an error is Madder words, the ▬ glyph, a 2 px Madder left rule and a Plate Ink outline, and
never relies on hue: the button never looks like an error and an error never looks like the
button (3.6). Its Firm Rule's thin line is Ember at 35%, which shows the no-second-color rule. The
Ember button reaches 3.05:1 against Night Card, so on the dark desk it needs no border.

### 10B.2.3 The awkward brand: a light color, a wide light logo, an unusual font

The case most white-label products get wrong, built from the foundation's QA gallery (3.6). Its
name is one of the two spare example firm names `[copy needed: two more example firm names]`
(3.8); here it is written **⟨Firm C⟩**.

| | |
|---|---|
| Logo | A very wide wordmark, trimmed ratio 7.0, **white letters on transparent**: drawn for the firm's own dark website (mean OKLCH L of its ink 0.97) |
| Colors | Main a bright yellow `#F2C200` (OKLCH 0.83 / 0.17 / 91°), no second color |
| Font | **Uploaded**: a wide display sans, one weight only (Regular 400), no italic, no small capitals, no tabular figures, Basic Latin only (no é, ñ, á), x-height 0.54 em |

**Derived tokens** (3.6, rounded; the build computes them):

| Token | Value | Why |
|---|---|---|
| `--firm` | `#F2C200` | Exact; white on it is only 1.68:1 |
| `--firm-fill` | `#F2C200` with **Plate Ink** text (9.5:1) and a 1 px `--firm-ink` border | Case (b): light color, dark text, a border so the shape holds on white |
| `--firm-on` | Plate Ink `#1D2130` | |
| `--firm-ink` | `#8A6D00` (4.9:1 on white) | Yellow lowered in L until it reads as text |
| `--firm-2` | `#FAEAA6` (yellow at 35%), only 1.21:1 on white | No second color set |
| `--firm-wash` | ≈ `#FAF7EF` | Chroma capped at 0.010 |
| `--firm-row` / `--firm-tint` | ≈ `#FCF5E3` / ≈ `#F7EBCA` | |
| `--firm-ink-dark` | ≈ `#E7C341` (about 9:1 on Night Card) | C capped at 0.14 |

**How the system handles each awkward part.** Three rules here extend the foundation for cases it
didn't name; none changes a decision it made.

1. **A light logo on a light fill.** 3.5 puts light marks on a logo plate filled with
   `--firm-fill`. Here that fill is yellow, and white letters on yellow vanish (1.68:1). **Rule:**
   the plate takes `--firm-fill` only when the logo's mean ink reaches 3:1 on it; otherwise the
   plate is Plate Ink `#1D2130` (white marks 16:1), which is almost always what a logo made for a
   dark website was drawn on. Same chamfered plate, 8 × 12 px padding. On the dark desk, a
   light-marks logo sits straight on Night Card with no plate (the dark chrome does the plate's
   job) and never on the white logo plate, where it would vanish.
2. **A Firm Rule whose thin line disappears.** With no second color, the 1 px line is the yellow at
   35% (1.21:1), invisible on white. **Rule:** when the derived second color is under 1.25:1
   against white, the thin line is drawn in `--firm-ink` instead, so the rule keeps its two-line
   construction: 3 px bright yellow, 2 px gap, 1 px `#8A6D00`. The 3 px line keeps the exact yellow
   (1.68:1, above the 1.5:1 threshold, so no extra under-line is needed).
3. **Yellow next to Ochre.** The firm's "your turn" (`--firm-ink` `#8A6D00`) and the product's
   Attention tone (Ochre `#855A0C`) are almost the same hue. **Rule,** as for greens near Verdigris
   (3.6): for firm colors at H 60°–100° with C > 0.10, shape alone separates them, and the build
   checks it: "your turn" is always an outline on white with a lozenge, Attention always a tinted
   fill with ◐. Where `--firm` has under 3:1 on white (as here), the lozenge glyph gets a 1 px
   `--firm-ink` outline so it stays visible.

**The font.** It passes the x-height test (0.54 em ≥ 0.40), so it sets the headings (3.7). Because
it has one weight, it is used at 400 wherever 3.7 asks for 600, with `font-synthesis: none`: never
a browser's faux bold. It has no italic, so the ampersand stays roman; no small capitals, so
credentials go to 88% with +0.04 em tracking; it is wide, so headings are allowed to balance onto
two lines (`text-wrap: balance`) and are never squeezed or shrunk to fit. Figures are never set in
it (fees and dates are Founders Grotesk). **Missing letters:** at upload the build reads the
font's character map; any string that would be set in it and contains a character it lacks (a
proof titled "Panadería Muñoz LLC", say) is set entirely in Founders Grotesk Medium, never with one
letter in a second face (extends 3.7). Button labels use Founders Grotesk Medium, as for every
uploaded font (3.7).

**The wide light logo.** Area rule: desk row 24 × 168 (height floor) on a 40 × 192 Plate Ink
plate; sheets 30 × 212 on a 46 × 236 plate; phone sheets 25 × 175 on a 41 × 199 plate. The name is
hidden beside it, as for any wide logo.

```
The proof's head, desktop (sheet 760, content 664)
┌──────────────────────────────────────────────────────────────────┐
│                               32                                 │
│              ┌────────────────────────────────────┐              │
│              │  ⟨FIRM C⟩  (white letters)          │  Plate Ink   │ logo plate 46 × 236,
│              └────────────────────────────────────┘  chamfered   │ logo 30 × 212
│                               20                                 │
│ ════════════════════════════════════════════════════════════════ │ 3 px #F2C200
│ ──────────────────────────────────────────────────────────────── │ 1 px #8A6D00 (rule 2)
│ ┌ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ┐ │
│   ⚲ Rehearsal: nothing will be filed or paid, even if you approve. │ dashed Plate Ink
│ └ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ┘ │
│ NJ formation                                                     │ kicker, Graphite
│ Two Sisters Bakery LLC                                           │ uploaded face 400, 34/40
│ …                                                                │
│ ┌──────────────────────────────────────────────────────────────┐ │
│ │      Approve, and authorize submission and payment           │ │ yellow fill, Plate Ink
│ └──────────────────────────────────────────────────────────────┘ │ Founders Medium, 1 px #8A6D00
└──────────────────────────────────────────────────────────────────┘
```

**What to check on ⟨Firm C⟩.** The logo is never lost (on its Plate Ink plate on every sheet, bare
on the dark desk); the Firm Rule reads as two lines; the button prints yellow with dark text and a
fine border; links and focus rings are the deep olive `#8A6D00`, never the yellow; no heading is
in faux bold; "your turn" and "Ready to pay" are told apart by shape; the Branding preview tells
the firm, in its own swatches, that its buttons print with dark text (10B.7).

### 10B.2.4 What the three share, unmoved

On all three, at every size: the status chips and glyphs (10B.1.5), the error construction, the
field borders (Rule Strong `#8A8578`), the focus ring's construction (2 px `--firm-ink` outside a
2 px white ring), the 13 px Imprint in the same place on each kind of surface (3.4), and the grid
under the sheet. Put the three client pages side by side and the fields sit on the same pixels.

### 10B.2.5 The QA gallery (for the build and QA team)

An internal page, not public: `/p/_gallery` in development builds only (Priya's house-color
gallery). It renders, for each case, the desk's Letterhead row and overview, the Branding preview
suite, the client page (desktop and phone), the proof's head and decision area, and the email
head, in light and dark, side by side.

The cases: the three firms above; the nine ready colors the Branding page offers (`#1f4fd1`,
`#0f766e`, `#15803d`, `#b45309`, `#b91c1c`, `#7e22ce`, `#be185d`, `#334155`, `#111827`); the
foundation's hostile set (neon `#39FF14`, pale pink `#F9C5D1`, near-white `#F5F5F5`, pure black,
a 64 px logo, a 4000 px logo, a logo with 40% padding, a photo as a logo, a script font, a very
condensed font, a 40-character name, a 2-letter name, a Spanish name with accents, no logo, a firm
color equal to a status color); and Greta's 24 real-world logo files (white-box JPEGs, transparent
PNGs, very wide wordmarks, square seals, tiny text, light logos, names from 6 to 48 characters with
and without "&", "CPA", "LLC"). Every case must pass on every surface with no hand adjustment
before launch, and again whenever the ink match or the logo analysis changes (Greta, Priya).

---

## 10B.3 The filing desk: shell and navigation

The firm's own working room. Its name is at the head of every page, its color is in the rule
under it and on the one button that matters, and CoFile is the small type at the right end of the
Letterhead row (3.4). Built in `(portal)/layout.tsx` and `TopBar`.

### 10B.3.1 Desktop and tablet

```
DESKTOP 1440 (content 1200 px on 12 columns, margins 120)
┌────────────────────────────────────────────────────────────────────────────────────────────────┐
│ [logo] Harbor & Pine CPA                                   with CoFile      {signed-in email} ▾ │ 76 px, Sheet
├════════════════════════════════════════════════════════════════════════════════════════════════┤ Firm Rule, full window
│ Filings   New filing   Ready to pay (1)   Client links   Signatures   Setup   Billing            │ 52 px, Sheet
├────────────────────────────────────────────────────────────────────────────────────────────────┤ 1 px Rule
│ [⚲ Beta]  This service is in beta. Any filing can run as a rehearsal on the state's real …      │ 1–2 lines, Sheet (10B.1.8)
├────────────────────────────────────────────────────────────────────────────────────────────────┤ 1 px Rule
│                                      --firm-wash                                                │
│   48                                                                                           │
│   ┌ page content: 12 columns to 1200 px ─────────────────────────────────────────────────────┐ │
│   │  or a narrow page: a centred 720 px column, with a 320 px rail at ≥ 1280 px              │ │
│   └──────────────────────────────────────────────────────────────────────────────────────────┘ │
│   48                                                                                           │
│                         Questions? Email {support email}.                                      │ small, Graphite, centred
│   48                                                                                           │
└────────────────────────────────────────────────────────────────────────────────────────────────┘
```

- **Letterhead row** (76 px, white, full window, content aligned to the grid's first column). The
  firm's logo and typeset name by 3.5 at the desk row's area (3,200 px², 24–44 px tall, at most
  200 px wide); a long name never wraps here: it steps to 18 px, then truncates with the full name
  in its `title` (3.5.2). The whole logo-and-name block links to the desk's Filings page; it gets a
  focus ring, never a hover color.
- **Right end of the row**, vertically centred on the logo: the **Imprint** "with CoFile" (13 px
  Graphite, a link to cofile.app in a new tab, 3.4), then 24 px, then the **account control**: the
  signed-in email in 15 / 22 Graphite with a 10 px caret, a 48 px tall target. It opens a 240 px
  menu (`--e-menu`, Sheet, `--r-sheet`) with two 48 px rows: "Change password" (a link to the
  Password page; only for a personal session, as today) and "Log out" (the existing form button,
  set as a menu row in Plate Ink). For a session opened from an invite link the email is plain text
  and the menu holds only "Log out". The menu closes on Escape and outside click, and returns focus
  to the control.
- **The Firm Rule** runs the full width of the window under the row: the firm's letterhead,
  stretched to the room (Hal).
- **The navigation row** (52 px, white, 1 px Rule bottom edge): the product's labels "Filings",
  "New filing", "Ready to pay", "Client links", "Signatures", and for partner firms "Setup" and
  "Billing", in Founders Grotesk Text 17 / 24, Plate Ink, 32 px apart, left-aligned on the grid.
  The current page is Founders Grotesk Medium with a **3 px `--firm-ink` underline** sitting on
  the row's bottom edge (`aria-current="page"`); hover adds a 1 px Plate Ink underline in
  `--t-quick`. The current page is worked out from the path (Filings for `/p/<firm>` and
  `/filings/…`, New filing for `/new/…` and `/from-email/…`, Setup for `/setup/…`).
- **The "Ready to pay" count.** When approved filings are waiting for a card's security code, a
  22 px chip follows the label: Ochre Tint, Ochre tabular numeral 14 / 18 Medium, `--chamfer-s`
  (Elaine, Priya, Dev). Its accessible name `[copy needed: e.g. the count read with the label]`.
  The number is data; it never animates (D2.5).
- **Beta strip** under the navigation (10B.1.8).
- **Page ground** `--firm-wash`; content blocks are white sheets with a 1 px Rule border and no
  shadow; 48 px from the strip to the page title.
- **Footer**: "Questions? Email {support email}." when the firm has a support email, `small`
  Graphite, centred, the address a `--firm-ink` link.
- **Not sticky.** Desk pages are short and the reader keeps her place; the rows scroll away with
  the page. Cross-document View Transitions keep the Letterhead row, the Firm Rule and the
  navigation perfectly still while the content crossfades in 200 ms (D2).
- **Tablet (834)**: the same rows with 40 px margins; the navigation stays a row from 760 px wide
  up (the seven labels need about 720 px). Below 760 px the phone shell takes over.
- **Skip link**: the first focusable element, visible on focus, jumping to the page title
  `[copy needed: "Skip to content"]`.

### 10B.3.2 Phone

```
PHONE 390 (margins 20)                          THE MENU SHEET (full height, Sheet)
┌──────────────────────────────────────┐        ┌──────────────────────────────────────┐
│ [36] Harbor & Pine CPA  with CoFile ≡│ 64 px  │ [36] Harbor & Pine CPA  with CoFile ✕│ 64 px
│                                 Menu │ sticky │                                Close │
├══════════════════════════════════════┤        ├══════════════════════════════════════┤
│ [⚲ Beta] This service is in beta. …  │ wraps  │▌Filings                              │ 64 px rows,
├──────────────────────────────────────┤        ├──────────────────────────────────────┤ 20/28 Medium
│ Filings                              │ 28/34  │  New filing                          │
│ ┌──────────────────────────────────┐ │        ├──────────────────────────────────────┤
│ │            New filing            │ │ 56 px  │  Ready to pay                    (1) │
│ └──────────────────────────────────┘ │        ├──────────────────────────────────────┤
│ …                                    │        │  Client links                        │
│                                      │        ├──────────────────────────────────────┤
│                                      │        │  Signatures                          │
│                                      │        ├──────────────────────────────────────┤
│                                      │        │  Setup                               │
│                                      │        ├──────────────────────────────────────┤
│                                      │        │  Billing                             │
│                                      │        ├──────────────────────────────────────┤
│                                      │        │  {signed-in email}                   │ 15/22 Graphite
│                                      │        │  Change password                     │ --firm-ink link
│                                      │        │ ┌──────────────────────────────────┐ │
│                                      │        │ │             Log out              │ │ secondary, 56
│                                      │        │ └──────────────────────────────────┘ │
└──────────────────────────────────────┘        └──────────────────────────────────────┘
```

- **The row** is 64 px, white, sticky, with a 1 px Rule bottom edge once the page has scrolled:
  the logo (2,400 px², 24–36 px), the typeset name at 17 / 22 when 3.5 shows it, the Imprint, and
  a 48 × 48 menu button with three 1.5 px lines over the word `[copy needed: "Menu"]` (Rosa), the
  same treatment as CoFile's own header. When the name and the Imprint don't both fit, the Imprint
  drops to its own 28 px row under the Letterhead, right-aligned (3.4, Dev).
- **No navigation row and no sideways tab strip** on phones: older thumbs miss a scrolling strip
  (Hal). The page's own title says where you are; the menu sheet lists everything.
- **The menu sheet** slides down from under the row (240 ms, `--ease-settle`; closing 160 ms
  `--ease-exit`), full height, white. The product's labels in Founders Grotesk Medium 20 / 28,
  64 px rows with Rule hairlines; the current page with a 3 px `--firm-ink` bar at its left edge;
  the "Ready to pay" count at the right. Under them, the signed-in email, "Change password" and
  "Log out" (a full-width secondary button). The menu button becomes a close button
  `[copy needed: "Close"]`. Focus is held inside the sheet; Escape closes it.
- **Each page's primary action** sits under its title at full width, 56 px (Dev).

### 10B.3.3 Dark mode, and the platform-invited firm

**Dark mode** (the desk follows the system setting, 4.6): the page ground goes to Night `#14161E`;
the Letterhead and navigation rows and every content sheet to Night Card `#1F2230` with 1 px
`#323646` rules; text Night Ink `#ECE8DF`, Graphite `#A9ABB5`. The logo sits on the **white logo
plate** (white, the Name Plate's 45° corners, 12 px padding), except a light-marks logo, which sits
straight on Night Card (10B.2.3). The typeset name is Night Ink. The Firm Rule keeps the exact
`--firm` in its 3 px line; its thin line, links, focus rings and the current-page underline use
`--firm-ink-dark`. Primary buttons keep `--firm-fill`, with a 1 px `--firm-ink-dark` border when the
fill has under 3:1 against Night Card. Chips take their dark values (4.6). Pages that open from the
desk and belong to the client or the approver (the proof, a client page preview) stay white.

**A firm a platform invited** (no partner profile) keeps that platform's white label, as the
product does today: its own Letterhead from the platform's settings, no Imprint, and no "Setup" or
"Billing" in the navigation. Everything else is identical.

---

## 10B.4 Filings: the desk's overview (`/p/<firm>`)

### 10B.4.1 With filings

```
DESKTOP (12 columns, 1200)
  Filings                                                                     ┌──────────────┐
  └ firm font 600, 32/38                                                      │  New filing  │ primary, 48
                                                                              └──────────────┘
  24
  ┃◐ 1 approved filing is ready to pay and need your card's security code. Pay and file          │ Attention slip
  12
  ┃◆ 1 filing needs someone to act.                                                              │ Your-turn slip
  32
  ┌────────────────────────────────────────────────────────────────────────────────────────────┐
  │ Filing                           Type                          Status              Started │ 44, head 14/18
  ├────────────────────────────────────────────────────────────────────────────────────────────┤ 1 px Rule Strong
  ▌ Two Sisters Bakery LLC  [⚲ Test]   New Jersey LLC formation      ◆ Waiting for approval  Dec 1, 2026 │ 64, 3 px --firm bar
  ├────────────────────────────────────────────────────────────────────────────────────────────┤ 1 px Rule
  │ Hudson Ledger LLC                New York LLC formation        ● Completed         Nov 28, 2026 │
  ├────────────────────────────────────────────────────────────────────────────────────────────┤
  │ Hudson Ledger LLC                EIN for an existing LLC       ● EIN issued        Nov 28, 2026 │
  ├────────────────────────────────────────────────────────────────────────────────────────────┤
  │ Orchard Lane Inc.                New Jersey business and employer registration (NJ-REG)          │
  │                                                                ● Submitted to the state  Nov 27, 2026 │
  └────────────────────────────────────────────────────────────────────────────────────────────┘
     c1 ────────── c5               c6 ──────── c8                 c9 ── c10           c11 ── c12
```

(The rows are the example desk of D4, with the product's own type titles and status labels, the
ones the real desk shows: "Waiting for approval" where the home page's picture says "Proof ready to
approve", "Completed" for "Filed", "EIN issued" for "Filed, IRS letter saved". Dates are layout
placeholders.)

- **Head**: "Filings" (`page-title`, firm font 600) and "New filing" (primary, `--firm-fill`,
  48 px) on one baseline.
- **Notices**, in the product's order, as slips (10B.1.6), 12 px apart, 24 px under the title:
  "Real filings need an active subscription; rehearsals are free. Subscribe" (Attention);
  "{n} approved filings are ready to pay and need your card's security code. Pay and file"
  (Attention); "{n} filings need someone to act." (Your turn). With nothing to do, nothing at all.
- **The ledger** (a white sheet, 1 px Rule border, no padding): columns "Filing", "Type",
  "Status", "Started". The head row is 44 px, 14 / 18 Medium Graphite, sentence case, with a 1 px
  Rule Strong line under it. Rows are 64 px with 1 px Rule hairlines and 24 px side padding.
  - **Filing**: the business name in Founders Grotesk Medium 17 / 24 Plate Ink, underlined 1 px in
    `--firm-ink` at a 3 px offset (the CoFile link construction with the firm's ink in Brass
    Line's place); a dry run carries the product's "Test" chip in the rehearsal style 8 px after it.
    The whole row is the link's target (a stretched link), so the owner can click anywhere on it.
  - **Type**: the filing type's title, 15 / 22 Plate Ink.
  - **Status**: the chip (10B.1.5).
  - **Started**: the date, 15 / 22 Graphite tabular, right-aligned.
  - **Rows waiting for the firm** (statuses in the product's "needs action" set) carry a 3 px
    `--firm` bar on their left edge, so the owner's eye finds her work in her own color (Hal, Dev,
    Marcus, Elaine, Priya). The order of rows is the product's; the design doesn't re-sort.
  - Hover: the row fills `--firm-row` in `--t-quick`. Focus: the ring around the whole row.
  - A changed status (on revalidation) presses its chip in and washes its row with 6% `--firm`
    that fades over 2 s (D2). Nothing else moves.
- **Phone**: the ledger becomes a stack of row cards, 12 px apart: white, 1 px Rule, 16 px padding;
  the name (17 / 24 Medium, underlined), the type (15 / 22 Graphite), then the chip and the date on
  one line. Waiting cards keep the 3 px `--firm` left edge. The whole card is the link.
- **Tablet**: the ledger stays a table; "Type" wraps to two lines before anything truncates.

### 10B.4.2 The empty desk: "Your desk is clear."

The first page a new firm sees on its own desk, so it shows the promise instead of a picture of
nothing: the firm's own client page, already in its brand (Marcus; with Dev's "their own name, big,
on their own desk").

```
DESKTOP
  Filings
  32
  ┌──────────────────────────────────────────────────────────────────────────────────────────┐
  │  48                                                                                       │
  │  Your desk is clear. Start a filing (it can        ┌───────────────────────────────┐      │
  │  be a free rehearsal), or send a client a link     │ [logo] Harbor & Pine CPA      │      │ the firm's own
  │  with your logo on it.                             │ ═════════════════════════════ │      │ client page, phone
  │  └ 18/28 Plate Ink, c1–c5                          │ ───────────────────────────── │      │ layout, 1:1 at 360,
  │  32                                                │ {first filing type offered}   │      │ cropped at 440 px
  │  ┌──────────────┐ ┌────────────────────────┐       │ ▭▭▭▭▭▭▭▭▭▭▭▭▭▭                │      │ by a straight edge
  │  │  New filing  │ │  Send a client a link  │       │ ┌───────────────────────────┐ │      │
  │  └──────────────┘ └────────────────────────┘       │ └───────────────────────────┘ │      │ fields as empty
  │   primary 48        secondary 48                   │ ▭▭▭▭▭▭▭▭▭                     │      │ fields and Rule bars
  │                                                    │ ┌───────────────────────────┐ │      │
  │                                                    │ │   Send to Harbor & Pine…  │ │      │
  │                                                    └───────────────────────────────┘      │
  │  48                                                    c7 ─────────────── c11            │
  └──────────────────────────────────────────────────────────────────────────────────────────┘
```

- One white sheet. Left (c1–c5): the product's sentence "Your desk is clear. Start a filing (it can
  be a free rehearsal), or send a client a link with your logo on it." in `body-client` 18 / 28,
  then "New filing" (primary) and "Send a client a link" (secondary), 16 px apart. While the desk
  is empty the head's own "New filing" button is not drawn, so the view holds one primary button
  (D5); it returns with the first filing.
- Right (c7–c11): **the firm's real client page**, rendered live from its brand (logo, Firm Rule,
  the firm's font on the first offered filing type's title, its button "Send to {firm}"), in the
  phone layout at 1:1 and 360 px wide, cropped at 440 px with a straight edge, on `--e-sheet`.
  Where the page would show the firm's form, it shows empty fields and Rule bars, never invented
  text (D1.1). It is a picture of the page, not a link (`role="img"`, accessible name `[copy needed:
  describing the preview of the firm's client page]`); "with your logo on it" is shown, not
  promised. If the firm has no logo, the monogram tile and the typeset name show instead, which is
  the point: it already looks finished.
- **Phone**: the sentence, the two buttons full width, then the preview at 320 px wide, centred.

### 10B.4.3 Loading and failure

Loading: the title and button are server-rendered; the ledger shows three 64 px blank rows with a
12 px Rule bar in each column, pulsing (10B.1.7). If the engine can't be reached the page fails as
a whole (10B.21); the billing and card checks fail quietly (their slips simply don't show), as
built.

---

## 10B.5 Setup: "Set up your account" (`/setup`, partner firms)

A narrow page (720 px column). The steps are a ledger, each with the status glyph the whole
product uses, so a done step looks done the way a filed filing does (Hal's ledger, with 4.3's
shapes in place of his lozenges, since the lozenge means "your turn").

```
DESKTOP (720 column)
  Set up your account                                              firm font 600, 32/38
  Three short steps, plus registered agents if you want them.      body-desk, Graphite
  You can change any of them later.
  32
  ┌────────────────────────────────────────────────────────────────────┐
  │ ●  Your firm                                         ┌──────────┐  │ 96 px rows
  │    Name, kind of firm and who to contact.            │  Change  │  │ ● Verdigris: done
  │                                                      └──────────┘  │ secondary
  ├────────────────────────────────────────────────────────────────────┤ 1 px Rule
  │ ◆  Branding                                   ┌─────────────────┐  │ ◆ --firm: next
  │    Your logo and color on the pages your      │ Set up branding │  │ primary, 48
  │    clients see.                               └─────────────────┘  │
  ├────────────────────────────────────────────────────────────────────┤
  │ ○  Payment                                    ┌─────────────────┐  │ ○ Rule Strong: later
  │    Which card pays state fees: one card for   │ Set up payment  │  │ secondary
  │    everything, or one per filing type, with   └─────────────────┘  │
  │    a backup.                                                       │
  └────────────────────────────────────────────────────────────────────┘
  24
  ┌────────────────────────────────────────────────────────────────────┐
  │ Registered agents (optional)                       ┌────────────┐  │ Founders Medium 20/26,
  │ Save the agent you use in each state, and your     │ Add agents │  │ "(optional)" Graphite
  │ forms offer it so nobody types it again.           └────────────┘  │ small, secondary
  └────────────────────────────────────────────────────────────────────┘
```

- Each row: the 16 px glyph hung at the left (● Verdigris done, ◆ `--firm` with a `--firm-ink`
  outline for the next step, ○ Rule Strong for later), the step's title ("Your firm", "Branding",
  "Payment") in Founders Grotesk Medium 20 / 26, its line in `small` Graphite, and its button at the
  right, vertically centred: the next step's ("Set up your firm", "Set up branding", "Set up
  payment") is the one primary; the others are secondary, done ones reading "Change".
- "Registered agents" card: its title, "(optional)" in Graphite, the line, and "Add agents" or
  "Change agents" as a small secondary button.
- **All done**: the title becomes "You're set up", the line "You can change any of these at any
  time.", every row shows ● and "Change", and "Start a filing" appears under the agents card as the
  page's primary. Arriving here from the last step, the Firm Rule draws once under "You're set up"
  (`--t-draw`, `--ease-sweep`), the same gesture as the rule under "Approval recorded" (D2): the
  firm's ink, ruled under its first finished job. Reduced motion: the rule is simply there.
- **Phone**: rows stack: glyph and title, the line, then the button full width (56 px).

## 10B.6 Your firm (Step 1 of 3, `/setup/details`)

A narrow page; the form is one white sheet with 32 px padding (20 px on phones).

```
DESKTOP (720 column)
  Step 1 of 3                                            kicker, 15/22 Medium Graphite
  Your firm                                              firm font 600, 32/38
  24
  ┌────────────────────────────────────────────────────────────────────┐
  │ Firm name                                                          │ label 16/22 Medium
  │ [ Harbor & Pine CPA                                              ] │ 52 px
  │ Kind of firm                                                       │
  │ [ CPA or accounting firm                                       ▾ ] │
  │ Main contact                       Phone                           │ two columns ≥ 600 px
  │ [                              ]   [                             ] │
  │ Contact email                      Website                         │
  │ [                              ]   [ https://                    ] │
  │ Email for the state's copies (optional)                            │
  │ [                                                                ] │
  │ When we file using our own New York account, the state emails …   │ help 15/22 Graphite
  │ 48                                                                 │
  │ Services you offer your clients                                    │ legend, Founders Medium 20/26
  │ Only these show on your filing desk and your filing pages for …   │
  │ New York                      New Jersey                           │ group heads 15/22 Medium
  │ ☑ New York LLC formation      ☑ New Jersey LLC formation           │ 48 px rows, 24 px boxes
  │ ☑ New York corporation …      ☐ New Jersey corporation formation   │
  │ Florida                       Federal                              │
  │ ☐ Florida LLC formation       ☑ {federal EIN title}                │
  │ 32                                                                 │
  │ ┌────────────────────┐                                             │
  │ │ Save and continue  │                                             │ primary, 48
  │ └────────────────────┘                                             │
  └────────────────────────────────────────────────────────────────────┘
```

- The fields and their help exactly as built: "Firm name", "Kind of firm" (with "CPA or accounting
  firm", "Payroll company", "Fractional CFO firm", "Title company", "Something else"), "Main
  contact", "Phone", "Contact email", "Website", "Email for the state's copies (optional)" with its
  help, and "Services you offer your clients" with "Only these show on your filing desk and your
  filing pages for clients. You can change them any time."
- **The name carries through** (Marcus, Elaine): the "Firm name" typed at sign-up, which the
  visitor may have engraved on the blank plate at the Close (D3), arrives here filled in. The
  plate and its brass stay on CoFile's pages; here it is simply the firm's name, in a field, under
  its own Letterhead.
- **Services** in a two-column grid of state groups on desktop (one column on phones), each group
  headed by the state's name ("New York", "New Jersey", "Florida", "Federal"), checkboxes in
  `--firm-fill` when checked.
- **Errors**: "Check the highlighted fields." at the top, with "Enter your firm's name." and "Pick
  at least one service to offer." under their fields; "That didn't save. Try again in a minute."
  as a Problem slip. **Pending**: "Saving…".

## 10B.7 Branding (Step 2 of 3, `/setup/branding`): the proofing room

The page where a firm first sees its name at the head of its own pages, so it gets more care than
any other desk page (Hal). Its job: show every surface the brand will touch, live, while the firm
chooses, and tell it honestly what the ink match did.

### 10B.7.1 Desktop

```
DESKTOP 1440 (12 columns)
  Step 2 of 3
  Branding                                                       firm font 600, 32/38
  Your clients see your name, logo and colors on the pages where they fill in and approve filings.
  32                                                             body-desk Graphite, c1–c8
  ┌ form sheet, c1–c5 (486 px) ─────────┐   ┌ the preview, c7–c12 (588 px), sticky top 24 ───────────┐
  │ Your web address                    │   │ Preview of a client's page            caption 14/20    │
  │ ┌─────────────┬───────────────────┐ │   │ ┌────────────────────────────┐  ┌───────────────────┐  │
  │ │ cofile.app/ │ harborpine        │ │   │ │ [logo] Harbor & Pine CPA   │  │ (the proof's head)│  │
  │ └─────────────┴───────────────────┘ │   │ │ ══════════════════════════ │  │ centred letterhead│  │
  │ Your pages for clients live here, … │   │ │ ────────────────────────── │  │ ════════════════  │  │
  │ Name your clients see               │   │ │ Please fill in your LLC    │  │ ▭▭▭▭▭▭▭▭▭▭        │  │
  │ [ Harbor & Pine CPA               ] │   │ │ formation details.         │  │ [ Approve, and …] │  │
  │ Logo                                │   │ │ What you'll need           │  └───────────────────┘  │
  │ ┌─────────────────────────────────┐ │   │ │ [▭▭▭▭▭▭▭▭▭▭▭▭▭▭▭▭▭▭▭▭▭▭▭▭] │  ┌───────────────────┐  │
  │ │ the logo bay (10B.7.3)          │ │   │ │ [▭▭▭▭▭▭▭▭▭▭▭▭▭▭▭▭▭▭▭▭▭▭▭▭] │  │ (the email's head)│  │
  │ └─────────────────────────────────┘ │   │ │ ┌────────────────────────┐ │  │ Your proof is     │  │
  │ Main color                          │   │ │ │   Send for approval    │ │  │ ready to approve: │  │
  │ [■] [ #1d4e63 ]                     │   │ │ └────────────────────────┘ │  │ [ Open your proof]│  │
  │ ◇◇◇◇◇◇◇◇◇                           │   │ │            ────            │  └───────────────────┘  │
  │ Buttons and the top of the page. …  │   │ │         with CoFile        │  ┌───────────────────┐  │
  │ [Aa] (the ink match, 10B.7.4)       │   │ └────────────────────────────┘  │ (the desk's row)  │  │
  │ Second color                        │   │   large slot: phone layout,     └───────────────────┘  │
  │ [■] [ #2b5a47 ]                     │   │   0.8 scale, 312 × 600            thumbnails 220 wide,│
  │ ◇◇◇◇◇◇◇◇◇                           │   │                                   phone layouts, 0.56 │
  │ Links and highlights. Choose a …    │   └─────────────────────────────────────────────────────────┘
  │ Font                                │
  │ [ Lora (serif)                    ▾]│
  │ Or upload your own (WOFF2, WOFF, …) │
  │ Support email shown to clients      │
  │ [                                 ] │
  │ ┌────────────────────┐              │
  │ │ Save and continue  │              │
  │ └────────────────────┘              │
  └─────────────────────────────────────┘
```

- **The form** (c1–c5, a white sheet, 32 px padding) holds the fields exactly as built, in their
  order: "Your web address", "Name your clients see", "Logo", "Main color", "Second color", "Font",
  "Support email shown to clients", and "Save and continue". The two color fields stack (the form
  column is too narrow to set them side by side with their swatches).
- **The preview** (c7–c12) stays in view while the form scrolls (sticky 24 px below the top of the
  viewport, when the viewport is at least 760 px tall; otherwise it scrolls with the page).
- **"Save and continue"** is drawn in the firm's **saved** brand, like the rest of the desk around
  the form; only the preview wears the choices being made. When the save succeeds, the next page
  (Payment) arrives in the new brand and its Firm Rule draws once in the new color (`--t-draw`):
  the moment the desk takes the firm's ink. **Pending**: "Saving…". **Errors**: "Check the
  highlighted fields." with each field's message under it ("A logo link must start with
  https://", the font upload's message); "That didn't save. Try again in a minute."

### 10B.7.2 The fields

**"Your web address".** One 52 px field in two parts: the site's address ("cofile.app/") in 18 px
Graphite on a Bond `#F5F5F2` cell with a 1 px Rule right edge, and the slug in Founders Grotesk Mono
18 px. Help: "Your pages for clients live here, one per service. Lowercase letters, digits and
dashes. Changing it changes those links."

**"Name your clients see".** A 52 px field. Typing updates every preview at once, with no
animation: the typeset name, its ampersand and credentials set by 3.5.2 as the letters arrive. On a
firm's first visit the field holds the name from sign-up, so the first thing the preview shows is
the firm's own name as a letterhead (Marcus's carry-over). If the visitor chose a main color in For
firms' live preview earlier in the same browser session (D3), Branding opens with that color
selected, not saved until "Save and continue" `[copy needed: a short note that the color came from
the For firms preview]`.

**"Main color", "Second color".** A 56 × 56 swatch button (chamfered, a 1 px Rule Strong edge)
that opens the system color picker; beside it the hex field (140 × 56, Founders Grotesk Mono 18
px); under them the nine ready colors the product offers as 32 × 32 chamfered swatches, 8 px apart,
the chosen one ringed 2 px Plate Ink with a 2 px white gap. Their accessible names stay the hex
codes, as built. The product's help lines sit under each: "Buttons and the top of the page.
Button text is white, so choose a dark color." and "Links and highlights. Choose a color that's
easy to read on white." (Whether the first changes once the ink match ships is a copy decision,
3.6.) A malformed code shows "Use a hex code like #1f4fd1." in Madder.

**"Font".** A 56 px control listing the product's presets ("Standard (the device's own)", "Inter",
"IBM Plex Sans", "Roboto", "Open Sans", "Lato", "Montserrat", "Source Serif (serif)",
"Merriweather (serif)", "Lora (serif)", and "Your own font (uploaded)" once there is one). Each
option is **set in its own face** at 18 px, so choosing a font is reading it (Greta, Priya): a
custom listbox whose faces load when it opens, over the native select as the no-script fallback.
Under it, the upload line "Or upload your own (WOFF2, WOFF, TTF or OTF, up to 600 KB)" with a
small file button. Errors: "The font file must be 600 KB or smaller.", "That file isn't a font we
can use." After an upload, the build measures the font (x-height, weights, italic, small capitals,
character coverage; 3.7, 10B.2.3); if it will be used for the name only, or will fall back where
letters are missing, a Plain slip says so `[copy needed: two short notes, "used for your name
only" and "falls back where letters are missing"]`.

**"Support email shown to clients".** A 52 px email field.

### 10B.7.3 The logo bay

The logo field, drawn as the plate's proportion (2.5:1) rather than a dashed drop zone: dashes mean
rehearsal and nothing else (4.4).

```
BEFORE A LOGO (486 × 168)                       AFTER A LOGO
Logo                                            Logo
┌──────────────────────────────────────────┐    ┌────────────────────┬─────────────────────┐
│ ┌──────────────────────────────────────┐ │    │ ░▓░▓░▓░▓░▓░▓░▓░▓░▓ │                     │
│ │ A PNG, JPEG or WebP picture. A wide  │ │    │ ▓░ as uploaded, on ░│   ┌────┐            │
│ │ logo on a clear background looks     │ │    │ ░▓ a transparency  ▓│   │ ▲  │ Harbor &   │
│ │ best. Big pictures are shrunk for    │ │    │ ▓░ grid, fit to    ░│   │ ≈≈ │ Pine CPA   │
│ │ you.                                 │ │    │ ░▓ the half        ▓│   └────┘            │
│ │           ┌─────────────┐            │ │    │ ▓░▓░▓░▓░▓░▓░▓░▓░▓░▓ │  on white, trimmed, │
│ │           │ Choose file │            │ │    │ [copy needed]       │  sized, with plate  │
│ │           └─────────────┘            │ │    │                     │  [copy needed]      │
│ └──────────────────────────────────────┘ │    └────────────────────┴─────────────────────┘
└──────────────────────────────────────────┘    Remove logo    Use a link instead
Use a link instead                              ☐ [copy needed: show or hide the typed name]
```

- **Before**: a white bay, 1 px Rule Strong border with a 1 px Rule bevel line inset 4 px (the
  plate's bevel, 3.2), the product's help centred in `small` Graphite, the file button under it.
  The whole bay is a drop target: on drag-over its border goes to 2 px `--firm-ink` and its fill to
  `--firm-row`. Square-cut, like paper.
- **After** (Marcus's logo bay; Dev's before-and-after): two halves. Left, the file as uploaded on
  an 8 px transparency grid (Bond and white squares), so a white box or wide margins are visible.
  Right, the logo **as clients will see it**: trimmed, background read, sized by area for sheets,
  on white or on its plate (3.5.1, 10B.2.3), with the typeset name beside it when 3.5.2 shows it.
  Captions under each half `[copy needed: "as uploaded" and "on your pages"]`.
- Under the bay: "Remove logo" (text button), "Use a link instead" / "Or a link to your logo"
  (the link field, 52 px, placeholder "https://yourfirm.com/logo.png"), the setting that shows or
  hides the typed name beside the logo `[copy needed: its label]` (3.5.2), and, only when it
  applies, the note that a small raster logo is shown at half its pixels `[copy needed]` (3.5.1).
- Errors in Madder under the bay: "Choose a PNG, JPEG or WebP picture.", "That picture couldn't be
  opened.", "That picture is too large. Try a smaller one."
- Phone: the halves stack (as uploaded above, on your pages below), the bay full width.

### 10B.7.4 The ink match, shown honestly

Under the main color's help, one line shows **how the button will print**, so nothing is changed
behind the firm's back (Hal, Dev, Elaine, Rosa):

```
 PRINTS AS CHOSEN (case a)        DEEPENED (case c) or CHROMA CAPPED (case d)
 ┌──────┐                         ┌──────┐    ┌──────┐
 │  Aa  │                         │  Aa  │ →  │  Aa  │   [copy needed: one line explaining
 └──────┘                         └──────┘    └──────┘    a deepened button color]
 #1d4e63                          {chosen}    {used}
 Harbor & Pine CPA                hex codes in mono 14 px Graphite
```

- Each chip is 56 × 40 px, chamfered, filled with the color, "Aa" in Founders Grotesk Medium 18 px
  in the text color the button will use, the hex under it in mono 14 px Graphite.
- **Prints as chosen** (case a): one chip, nothing else.
- **Deepened or chroma-capped** (cases c, d): the chosen chip, an arrow, the chip actually used,
  and the explanation `[copy needed: one line explaining a deepened button color]` (3.6).
- **Light color with dark text** (case b, ⟨Firm C⟩'s yellow): one chip with Plate Ink "Aa" and its
  fine border, and `[copy needed: one line explaining that a light color's buttons print with dark
  text]`.
- **Near-white** (case e): the chosen chip, an arrow, the Plate Ink button with its 4 px `--firm`
  left edge, and the same deepened-color line.
- The second color gets the same line only when links fall back to `--firm-ink` (3.6, "Second
  color too light") `[copy needed: one line explaining that links use a darker shade]`.

### 10B.7.5 The preview suite

Four live previews of every surface the brand touches, laid out like a stationer's sample sheet
(Hal's stationery suite, with Marcus's and Priya's live dressing). All four are **phone layouts**,
because that is where a firm's client meets the brand:

| Slot | Surface | Content (no invented words: D1.1) |
|---|---|---|
| Large (312 × 600, 0.8 scale), the default | **The client's page** | The product's own preview words: "Preview of a client's page" as the panel caption; the firm's Letterhead with "with CoFile" at the foot; "Please fill in your LLC formation details."; "What you'll need" as a `--firm-ink` link; two empty fields; "Send for approval" as the primary button |
| Thumbnail 1 | **The proof's head** | The centred Letterhead and Firm Rule, a Rule bar where the title goes, the button "Approve, and authorize submission and payment" |
| Thumbnail 2 | **The proof email's head** | The email's centred Letterhead, "Your proof is ready to approve:" with a Rule bar for the title, Rule bars for the body, the button "Open your proof", the Imprint (the emails part's template) |
| Thumbnail 3 | **The desk's Letterhead row** | The firm's row as in 10B.3.2, with "with CoFile" and the Firm Rule |

- Thumbnails are 220 px wide (0.56 scale), stacked 16 px apart in the right of the panel, each a
  white sheet on `--firm-wash` with `--e-sheet`, captioned `[copy needed: three captions, for the
  proof, the email and the filing desk]`. Clicking or pressing Enter on a thumbnail swaps it into
  the large slot (a `button`; its accessible name `[copy needed]`); the swap is a 200 ms crossfade.
- **Everything is live.** A color change re-inks every preview in `--t-ink` (260 ms crossfade);
  a font change crossfades in 160 ms once the face has loaded, with no reflow (size-adjusted, 3.7);
  a new logo fades in over 240 ms on its plate; the name re-sets as it is typed. The ink match runs
  as the firm picks: a light color shows its dark-text button, a light logo its Plate Ink plate, a
  wide logo hides the typed name, a long name steps down. The panel is the honest answer to "what
  will my clients see?".
- **Dark toggle**: a small two-way control at the panel's top right shows the desk's row in dark
  mode (the client page, proof and email stay white in every mode, 4.6) `[copy needed: its two
  labels]` (Elaine).
- Under the panel, 12 px below, in `caption` Graphite: nothing else. No marketing words in the
  firm's own setup.

### 10B.7.6 Phone

```
PHONE 390
┌──────────────────────────────────────┐
│ [36] Harbor & Pine CPA  with CoFile ≡│ desk row, sticky
├══════════════════════════════════════┤
│┌────────────────────────────────────┐│ the live strip, 120 px, sticky under the row
││ Preview of a client's page       ⌄ ││ caption 14/20 + chevron; the strip is a button
││ [logo] Harbor & Pine CPA  ═══════  ││ the client page's head and its button at 0.8
││ ┌──────────────────┐               ││
││ │ Send for approval│               ││
│└────────────────────────────────────┘│
│ Step 2 of 3                          │
│ Branding                             │ 28/34
│ Your clients see your name, logo …   │
│ Your web address                     │
│ [cofile.app/|harborpine           ]  │ 56 px
│ …                                    │
│ ┌──────────────────────────────────┐ │
│ │        Save and continue         │ │ 56, full width
│ └──────────────────────────────────┘ │
└──────────────────────────────────────┘
```

- The form first, one column, 56 px fields. A **120 px live strip** stays under the desk's row
  while the form scrolls (Rosa, Priya): the client page's Letterhead, Firm Rule and button at 0.8
  scale, labelled with the product's own "Preview of a client's page". It hides while a text field
  has focus (the keyboard needs the room) and returns on blur.
- Tapping the strip opens a full-height sheet with the four previews as a horizontal snap carousel
  at 0.8 scale, one per screen, with page dots (Hal), closed by the same close button as the menu
  sheet `[copy needed: "Close"]`.
- The logo bay's halves stack; the color fields keep their 56 px swatch and hex field on one line,
  the ready colors wrapping to two rows of five and four.

## 10B.8 Payment (Step 3 of 3, `/setup/payments`)

A narrow page. The product's paragraph leads: "State fees are charged by the state when a filing is
submitted, after you approve the exact amount on the proof. Saved cards are held by Basis Theory, a
card vault, never by CoFile. A card's security code isn't saved, so when approved filings are ready
to pay, we ask the card's owner to enter it on the Ready to pay page and keep it for an hour at
most. Filings wait until it's entered." (in `body-desk`, "Ready to pay" a `--firm-ink` link).

```
DESKTOP (720 column)
  Step 3 of 3
  Payment
  {the paragraph}
  24
  ┌────────────────────────────────────────────────────────────────────┐ saved cards
  │ ▭  {label} · ending {last4}                         ┌──────────┐   │ 64 px rows, a 40 × 26
  │                                                     │  Remove  │   │ card glyph, no network art
  │                                                     └──────────┘   │
  └────────────────────────────────────────────────────────────────────┘
  24
  ┌ Add a card ────────────────────────────────────────────────────────┐ Founders Medium 20/26
  │ Card number                                                        │
  │ [ Card number                                                    ] │ Basis Theory field, styled
  │ Expires                          Name for this card (optional)     │
  │ [ MM/YY            ]             [ e.g. Company Amex             ] │
  │ ┌───────────┐                                                      │
  │ │ Save card │                                                      │ primary while no card saved
  │ └───────────┘                                                      │
  │ Saved cards are held by Basis Theory, a card vault, never in our … │ help
  └────────────────────────────────────────────────────────────────────┘
  24
  ┌────────────────────────────────────────────────────────────────────┐
  │ How state fees are paid                                            │ legend
  │ ┌────────────────────────────────────────────────────────────────┐ │
  │ │ ◉ One card for every filing                                    │ │ 72 px choice card, selected:
  │ └────────────────────────────────────────────────────────────────┘ │ 2 px --firm-ink, --firm-row
  │ ┌────────────────────────────────────────────────────────────────┐ │
  │ │ ○ A card for each type of filing, with one main card for the   │ │
  │ │   rest                                                         │ │
  │ └────────────────────────────────────────────────────────────────┘ │
  │ Main card                       Backup card, used if the main one  │
  │ [ Choose a card            ▾ ]  is declined                        │
  │                                 [ Choose a card              ▾ ]   │
  │ ┌──────┐                                                           │
  │ │ Save │                                                           │
  │ └──────┘                                                           │
  └────────────────────────────────────────────────────────────────────┘
```


- **Saved cards** as card plates (Hal): white rows inside a sheet, a 40 × 26 card glyph (1.5 px
  Plate Ink outline, `--chamfer-s`, one 4 px stripe), "{label} · ending {last4}" (and " ·
  subscription" where it applies) in 17 / 26, "Remove" as a small button. No card-network art.
- **"Add a card"**: the Basis Theory secure fields are styled to match our fields from outside the
  frame (the wrapper draws the 1 px Rule Strong border, the 52 px height and the focus ring from the
  element's focus events) and from inside through the element's style option (Founders Grotesk Text
  18 px, Plate Ink, Graphite placeholder; the font passed to the element as a font URL). Product
  copy: "Card number", "Expires", "Name for this card (optional)", "Save card" / "Saving…", "Saved
  {brand} ending {last4}.", "Check the card number.", "The card wasn't saved.", "The card wasn't
  accepted. Check it and try again.", "The card fields couldn't load. Reload the page and try
  again.", and the help line. If saving cards is off: "Saving cards isn't turned on for your account
  yet. Email {support email} to turn it on." as a Plain slip.
- **"How state fees are paid"**: the two choices as 72 px choice cards (radio 24 px inside, the
  bold part of the second label in Medium); the selected one has a 2 px `--firm-ink` border and
  `--firm-row` fill (Marcus, Rosa). "Main card" and "Backup card, used if the main one is
  declined" as 52 px selects ("No cards yet" / "Choose a card"); with the second choice, "Card for
  each filing" as a fieldset with one select per filing type. "No cards saved yet. Add a card, then
  choose which card pays for what. You can save how fees are paid now and pick cards later." as a
  Plain slip. "Save" / "Saving…"; error "The backup card has to be a different card."
- **One primary at a time**: while no card is saved, "Save card" is the primary and "Save" is
  secondary; once a card exists they swap (D5).

## 10B.9 Registered agents (`/setup/agents`)

A narrow page: "← Setup" (a `--firm-ink` link, 15 / 22), "Registered agents", the product's
paragraph ("Save the agent you use in each state once. Your forms then offer it as the answer, so
you and your clients don't type it again. Anyone can still name a different agent on a filing."),
then one white sheet per state the firm forms businesses in, 24 px apart:

- The legend is the state's name in Founders Grotesk Medium 20 / 26; New York adds "(optional: New
  York doesn't require one)" in Graphite.
- Fields as built: "Agent name" (placeholder "Leave empty for none"), "Agent email (optional)" for
  New Jersey, "Street address in {state}", then "Suite (optional)", "City" and "ZIP" in a
  three-column row on desktop (one column on phones).
- "Save agents" (primary) after the last sheet; "Saved. New filings offer these agents." as a Done
  slip; errors "Fill in the {state} agent's street, city and ZIP, or leave its name empty.", "Check
  the agents' details: each address must be in its own state.", "That didn't save. Try again in a
  minute." as Problem slips.
- **Empty**: "None of the services you offer form a business, so there's no agent to save." as a
  Plain slip.

---

## 10B.10 New filing, step one: the state (`/new`)

```
DESKTOP (12 columns)
  New filing                                              ┌ c9–c12, Bond panel ──────────────┐
  Which state is the business in?                         │ Or send us the details and we    │
  └ 22/28 Founders Grotesk Text, Plate Ink                │ fill in the form for you to      │
  Filing types go live one at a time; until then they     │ check:                           │
  run as rehearsals. See What we file for where each      │ Email {address} from {email}.    │ addresses in
  one stands.                     small, Graphite         │ Text {sms} or WhatsApp {wa} from │ Founders Grotesk
                                                          │ your mobile (add it under your   │ Mono 15/22
                                                          │ account).                        │
                                                          │ Type /file in Slack (add CoFile  │
                                                          │ to your Slack).                  │
                                                          └──────────────────────────────────┘
  32
  ┌──────────────────────────────┐ ┌──────────────────────────────┐ ┌──────────────────────────────┐
  │ New York                     │ │ New Jersey                   │ │ Florida                      │ 168 px,
  │ └ Founders Medium 28/34      │ │                              │ │                              │ 4 columns each
  │                              │ │                              │ │                              │
  │ 2 filing types, plus the     │ │ 2 filing types, plus the     │ │ Federal EIN only. To offer   │ small, Graphite
  │ federal EIN                  │ │ federal EIN                  │ │ Florida filings, choose them │
  │                            → │ │                            → │ │ in Setup.                  → │
  └──────────────────────────────┘ └──────────────────────────────┘ └──────────────────────────────┘
```

(The count lines are the product's own; the numbers depend on what the firm offers.)

- **Head** (c1–c8): "New filing" (`page-title`), the question "Which state is the business in?"
  at 22 / 28 Founders Grotesk Text, and the note "Filing types go live one at a time; until then
  they run as rehearsals. See What we file for where each one stands." in `small` Graphite, "What
  we file" a `--firm-ink` link.
- **The other ways in** (c9–c12), when the firm has any: a Bond `#F5F5F2` panel, 1 px Rule, 24 px
  padding, with the product's lines "Or send us the details and we fill in the form for you to
  check:", "Email {address} from {email}.", "Text {sms} or WhatsApp {whatsapp} from your mobile
  (add it under your account).", "Type /file in Slack (add CoFile to your Slack)." in `small`;
  the addresses, numbers and `/file` in Founders Grotesk Mono 15 / 22; "your account" and "add
  CoFile to your Slack" as `--firm-ink` links. No channel logos.
- **The three states** as cards across all 12 columns (each 384 × 168): white, 1 px Rule, 32 px
  padding; the state's name in Founders Grotesk Medium 28 / 34; the product's count line ("1 filing
  type", "{n} filing types, plus the federal EIN", "Federal EIN only. To offer {state} filings,
  choose them in Setup.", "None offered yet") in `small` Graphite; a 20 px arrow glyph at the
  bottom right, `aria-hidden`. The whole card is the link. Hover: `--e-lift` and a 3 px `--firm`
  line along the card's top edge (120 ms) (Elaine). No maps, outlines, seals or state colors (3.9).
- **Phone**: the head, the three cards stacked full width (120 px tall), then the ways-in panel.
  Build note: the ways-in block moves after the cards in the markup, so the reading order and the
  visual order match on every screen.

## 10B.11 New filing, step two: the filing type (`/new?state=NJ`)

```
DESKTOP (12 columns)
  ← All states
  New Jersey: what are you filing?                                     page-title
  Fill it in yourself, or send your client a link to fill it in. Either way, you approve the
  proof before anything is filed or paid. Filing types go live one at a time; until then they
  run as rehearsals.                                                   body-desk Graphite, c1–c8
  32
  ┌──────────────────────────────────────────────┐ ┌──────────────────────────────────────────────┐
  │ New Jersey LLC formation                     │ │ New Jersey corporation formation             │ Founders Medium 22/28
  │ [⚲ Rehearsal]                                │ │ [⚲ Rehearsal]                                │ chip
  │ Certificate of Formation for a domestic LLC, │ │ Certificate of Incorporation for a domestic  │ small, Graphite
  │ filed online through NJ Business Formation.  │ │ for-profit corporation (DP), filed online …  │
  │ $103.50 by card: the state filing fee of     │ │ State filing fee $100, plus New Jersey's     │ small, Plate Ink,
  │ $100 plus New Jersey's $3.50 portal fee …    │ │ portal fee …                                 │ tabular
  └──────────────────────────────────────────────┘ └──────────────────────────────────────────────┘
  ┌──────────────────────────────────────────────┐
  │ {federal EIN}                                │
  └──────────────────────────────────────────────┘
  48
  ┌ Your pages for clients ──────────────────────────────────────────────────────────────────────┐
  │ Each service has a permanent page with your branding. Send it to any client, or put the     │
  │ form on your own website with the widget code; every submission becomes a filing here.      │
  │ ▸ New Jersey LLC formation:  ┌──────────────────────────────────────────────┐ ┌──────────┐  │
  │                              │ {firm page address}                          │ │  [copy]  │  │
  │                              └──────────────────────────────────────────────┘ └──────────┘  │
  └──────────────────────────────────────────────────────────────────────────────────────────────┘
```

- "All states" as a back link with a left arrow glyph, then the title "{State}: what are you
  filing?" and the product's paragraph.
- **Filing-type cards**, two columns on desktop and tablet (fee notes can run long), one on phones:
  white, 1 px Rule, 32 px padding; the type's title in Founders Grotesk Medium 22 / 28; the chip,
  "Live" (Done) or "Rehearsal" (the rehearsal chip), whose explanation "Runs on the state's real
  website and stops before the last button: nothing is filed or paid" is the chip's description
  (`aria-describedby`) and, on hover or focus, a tooltip (Sheet, `--e-menu`, 15 / 22, 320 px
  max); the summary in `small` Graphite; the fee note in `small` Plate Ink with tabular figures.
  Hover lifts the card (`--e-lift`); the whole card is the link.
- **Empty**: "No {state} filings are offered here yet." as a Plain slip.
- **"Your pages for clients"** (when the firm has public pages): a white sheet, its title in
  Founders Grotesk Medium 20 / 26 and the product's line in `small` Graphite. Each service is a
  disclosure row: "{title}:" then its permanent address in a **plate field** (Hal): Bond fill, 1 px
  Rule, `--chamfer-s`, Founders Grotesk Mono 15 / 22, the address itself a link that opens the
  page in a new tab; beside it a small copy button `[copy needed: "Copy" and "Copied"]` (Priya).
  Opening the row shows "Website widget: paste where the form should appear." and the snippet in a
  Bond code block (Founders Grotesk Mono 14 / 22, wrapped, 16 px padding) with its own copy button.
  The code block is paper like everything else on the desk, not a dark terminal.

## 10B.12 The intake form: the desk's own form and every client page

One component (`IntakeForm`) serves the firm on its desk ("Create the proof") and the client on
the firm's pages ("Send to {firm}"). This section is its anatomy; 10B.12.1 places it on the desk
and 10B.24 and 10B.25 on the client pages.

### 10B.12.1 The desk's form page (`/new/<kind>`)

```
DESKTOP (720 column + 320 rail at ≥ 1280)
  ← Other filings
  New Jersey LLC formation                                         page-title (firm font)
  Certificate of Formation for a domestic LLC, filed online        body-desk Graphite;
  through NJ Business Formation. Would your client rather fill     "Send them a link" a
  it in? Send them a link.                                         --firm-ink link
  ┃◆ Filled in from your message "{subject}". Check every answer   Your-turn slip (when from
  ┃  and add what's missing.                                       a message)
  ┌ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ┐   Rehearsal slip (when not
    ⚲ Rehearsal: New Jersey LLC formation isn't live yet, so          live)
    this filing is a rehearsal. CoFile fills in every screen …
  └ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ┘   ┌ rail, sticky ────────────┐
  Start from a client you filed for before                         │ ● Name                   │
  [ New client                        ▾ ]  [ Fill in ]             │ ● Business data          │
  32                                                               │ ○ Registered agent       │
  ┌ the form, one white sheet, 40 px padding ───────────────────┐  │ ○ Members and managers   │
  │ Fields marked * are required.                               │  │ ○ Other provisions …     │
  │ ───────────────────────────────────────────────────────────  │  │ ○ Signers                │
  │ 1  Name                                                     │  │ ○ Certificates           │
  │ …                                                           │  │ ○ Filing contact         │
  │ Next you get the proof to approve. Nothing is filed until … │  │ ○ Authorizations         │
  │ [ Create the proof ]   $103.50 by card: the state filing …  │  └──────────────────────────┘
  └─────────────────────────────────────────────────────────────┘
```

- "← Other filings", the type's title, the product's line with "Send them a link", then the
  notices: "Filled in from your message “{subject}”. Check every answer and add what's missing."
  (Your turn) and the rehearsal line "Rehearsal: {title} isn't live yet, so this filing is a
  rehearsal. CoFile fills in every screen of the state's real website and stops before the last
  button. Nothing is filed or paid. Each filing type goes live once it's verified on the state's
  website. To ask when this one will, email {support email}." (the Rehearsal slip, never a
  warning).
- **"Start from a client you filed for before"**: one row: the label (16 / 22 Medium), a 52 px
  select ("New client" and the firm's past clients), and "Fill in" as a small button.
- **The section rail** (≥ 1280 px; Priya, Marcus): a sticky list of the form's own section titles,
  each with an 8 px circle that fills with `--firm` once the section's required answers are in
  (outline Rule Strong before). Each title jumps to its section. `aria-hidden` circles; the titles
  are links. It is the only extra on the firm's own form; client pages don't get it (10B.12.3).
- **Saved and carried-in answers show where they came from** (foundation `--firm-row`; Marcus,
  Dev): a field the firm's saved answers filled (its agent, its organizer, its contact details) has
  a `--firm-row` fill and a 3 px `--firm` left edge until it is edited; a field filled from a
  forwarded message has a `--firm-tint` fill ("check this", 3.6) until it is edited or focused and
  left. The tags that name them `[copy needed: whether the draft picture's "already filled" and
  "from the text" tags appear on the real form, and their accessible descriptions]`.
- **Submit**: "Create the proof" (primary, 56 px), the fee note beside it in `small` Graphite
  (under it on phones); the footnote "Next you get the proof to approve. Nothing is filed until you
  do." above them in `body-desk`. On success the desk goes straight to the new filing's page
  (10B.13), which arrives with its "Your proof is ready" card or its next step.

### 10B.12.2 The form's parts

Everything below is the same on the desk and on client pages, except where marked.

| Part | Treatment |
|---|---|
| **Error summary** | A Problem slip at the top: "Please fix these and submit again." (or the product's own error sentence), then up to 20 issues as a list, each an anchor link to its field (Elaine). It receives focus when it appears, and the page scrolls to it (as built) |
| **Required note** | "Fields marked * are required." in `help` Graphite, 0 px above, 24 px below |
| **Sections** | Each `fieldset`: 48 px above, a 1 px Rule line across the column, 20 px, then the legend. Legend: firm font 600 22 / 28 on client pages; Founders Grotesk Medium 22 / 28 on the desk (3.7). A **section numeral** (1, 2, 3 …) in Founders Grotesk Medium 16 / 22 tabular, `--firm-ink`, hangs 32 px left of the legend in the sheet's margin on desktop, inline 12 px before it on phones (Elaine's chapters; the proof uses the same marks, 10B.22). Section help under the legend in `help`, 12 px |
| **Labels and fields** | Label 16 / 22 Medium Plate Ink above the field, 8 px gap; the required mark "*" in Plate Ink, never red (`aria-hidden`; the field carries `aria-required`). Fields 52 px (56 px on phones), 18 / 24 text, 16 px side padding, 1 px Rule Strong border, `--r-sheet`. Help under the field, 8 px, `help` Graphite. Placeholders in Graphite, never instead of a label |
| **Focus** | 2 px `--firm-ink` outline, 2 px offset from a 2 px white ring, instant (D2, D5) |
| **Field error** | The field's border at 2 px Madder; its message first in the help line, in Madder 15 / 22 with the ▬ glyph, then the help text in Graphite. On red-family firms the field also keeps a 1 px Plate Ink outer line (3.6) |
| **Rows of fields** | Address parts: street and "suite, unit or floor" full width, then city, state and ZIP on one row (1fr, 160 px, 120 px) at 640 px; stacked on phones |
| **"Same as" / "Same person as"** | A row above the address or name: "Same as" or "Same person as" in `small` Graphite, then each earlier address or person as a small button (40 px; 48 px on touch), 8 px apart, wrapping. A copy is instant; the filled fields flash `--firm-row` for 600 ms |
| **Selects** | "Choose…" as the empty option, a 16 px chevron |
| **Radios and yes/no** | Choice rows: a 24 px radio and the label, 48 px tall, the whole row the target; yes/no as two choice cards side by side (each 120 px wide). Checked: `--firm-fill` with a `--firm-on` dot |
| **Checkboxes** | A 24 px box, 1.5 px Rule Strong; checked fills `--firm-fill` with a `--firm-on` check (the light-fill border rule applies); the label beside it at body size |
| **Repeating groups** (members, signers, provisions) | The group label and help, then each item as a card inside the sheet (white, 1 px Rule, 20 px padding, no shadow): its title ("Member 1") in Founders Grotesk Medium 16 / 22 with "Remove" as a small button at the right; "Add member" (the product's "Add {item}") as a secondary small button with a 12 px plus glyph. Never dashed: dashes mean rehearsal |
| **Notes inside a section** | Plain slips |
| **"More options (optional)"** | A 48 px disclosure row: "More options" in Founders Grotesk Medium 16 / 22, "(optional)" in Graphite, a 16 px chevron that turns 180° in 200 ms; the content opens with a 240 ms height ease (D2). Opens by itself when it already holds an answer or a problem (as built) |
| **Folded optional sections** | A 56 px row with a 1 px Rule top line: "{title} (optional)" in the legend style, "(optional)" in Graphite, the chevron |
| **Textarea counter** | "{n} / {max}" right-aligned under the field in `help` tabular Graphite |
| **PDF field** | The file button and its help "A PDF of 10 MB or less, without a password." |
| **Signature field** | The select (the firm's saved signatures, "{name}, saved {date}", and "Draw a new signature" / "Draw a new signature for {signer}"), its help ("It goes on the state form only after this filing is approved, never on a preview. …"), then the pad (10B.12.4) and the consent checkbox |
| **Authorizations** | Legend "Authorizations" and the product's paragraph (the client's or the firm's wording, as built). Each statement is a choice row: a 24 px checkbox and the statement at body size, 16 px padding, Rule hairlines between rows, the whole row the target; a checked row fills `--firm-row`. "Please confirm." follows the statement in Madder when it's missing |
| **Footnote, submit, fee** | The footnote lines above the button. The primary button; the fee note beside it in `small` Graphite on desktop, under it on phones; the fee aside (New York's publication paragraph) under both in `small` Graphite, 64 ch measure |
| **Pending** | "Sending…", the button kept at its size (10B.1.4) |

### 10B.12.3 What client pages leave out

The client's copy of the form is the same parts with less around them: no section rail, no "Start
from a client", no saved-answer tags, no fee aside above the fold. A client sees the firm's name,
the filing, the fields and one button. Section numerals stay: they make a long state form feel like
a few short chapters (Elaine). No progress dots, no fixed submit bar: the button is at the end,
where the reading ends.

### 10B.12.4 The signature pad

```
┌──────────────────────────────────────────────────────────────────┐ full column width (640),
│                                                                  │ 200 px tall (160 on phones)
│                                                                  │ white, 1 px Rule Strong
│                                                                  │
│  ×  ____________________________________________________________ │ 1 px Rule Strong baseline,
│                                                                  │ 48 px from the bottom;
└──────────────────────────────────────────────────────────────────┘ "×" 14 px Graphite
 Signed above.                                     ┌─────────────────┐
                                                   │ Clear signature │ small button
                                                   └─────────────────┘
```

- Strokes in **Signature Ink** `#26336A` (4.2), 2.4 px, round caps, pressure-varied from 1.5 to
  3 px where the pointer reports pressure (Hal), so a signature looks like a pen made it.
- The pad's line under it shows the product's label until something is drawn, then "Signed
  above."; "Clear signature" is disabled until there is ink.
- The consent ("I adopt this image as my signature for this company's New York filings, used only
  on approved filings." or the engine's own text) as a checkbox row under the pad, 16 px below.
- Focus: the pad takes the focus ring; its accessible name is the product's label ("Signature pad:
  …").

---

## 10B.13 Filing detail (`/filings/<id>`): the record, its timeline and its documents

The filing's own page. When the proof is waiting, the page exists to send the firm to it; after
that, it is the record the papers come home to.

### 10B.13.1 Desktop

```
DESKTOP (720 column + 320 rail at ≥ 1280)
  ← Filings
  Two Sisters Bakery LLC                                          page-title, firm font
  [◆ Waiting for approval]  [⚲ Rehearsal]                         chips, 12 px below
  New Jersey LLC formation · started Dec 1, 2026, 9:14 AM by {submitter} (client link)
  24                                                              small, Graphite
  ◆━━━━━━━━━━━━━·────────────·────────────·────────────·          the stage rule
  Waiting for    Approved     Submitted    Accepted by  Completed  14/20, Graphite ahead,
  approval                    to the state the state               --firm-ink Medium current
  24
  ┃◆ The proof is ready: check exactly what will be filed and approve it.     next step, Your-turn slip
  24                                                                          ┌ rail ───────────────────┐
  ╔═══════════════════════════════════════════════════════════════╗           │ Documents               │
  ║ ═════════════════════════════════════════════════════════════ ║ Firm Rule │ ┌──────┐ ┌──────┐       │
  ║ Your proof is ready                                           ║ on top    │ │ ▭▭▭▭ │ │ ▭▭▭▭ │       │ 128 × 166
  ║ Check every detail and fee exactly as they'll go to the       ║           │ │ ▭▭   │ │ ▭▭▭  │       │ cards
  ║ state, then approve it or ask for changes. Nothing is filed   ║           │ └──────┘ └──────┘       │
  ║ until you approve.                                            ║           │ {label}  {label}        │ 15/22 Medium
  ║ ┌─────────────────────────────────┐                           ║           │ {kind}   {kind}         │ 14/20 Graphite
  ║ │  Open the proof and approve it ↗│                           ║           ├─────────────────────────┤
  ║ └─────────────────────────────────┘ primary, 56               ║           │ EIN:                    │ 15/22 Graphite
  ║ We also emailed the link to {address}.                        ║           │ 00-0000000              │ Mono 32/40
  ╚═══════════════════════════════════════════════════════════════╝           ├─────────────────────────┤
  The signer's saved signature is placed on the state form only once         │ [ Save to Google Docs ] │ small
  this filing is approved.                                     small         │ A copy of this record   │
  32                                                                          │ in your Google account. │
  ▸ Progress on the state site (test run, {status})                           │ People's Social …       │
                                                                              └─────────────────────────┘
```

(The EIN shown is the copy's own sample, 00-0000000; the rest is the example data in D4.)

- **Head**: "← Filings"; the filing's title (`page-title`, firm font: the business is the story,
  Elaine); its status chip and, for a dry run, the "Rehearsal" chip on the line under it; the
  product's meta line ("{type} · started {date and time} by {who} (client link)") in `small`
  Graphite.
- **The stage rule** (Greta's route line, Hal's progress rule, with 4.3's glyphs): the filing type's
  main path in the product's own labels, for a state filing "Waiting for approval", "Approved",
  "Submitted to the state", "Accepted by the state", "Completed" (for an EIN alone, "Waiting for
  approval", "Approved", "EIN issued"). Stops 12 px, evenly spaced across the column: a reached stop
  is ● Verdigris; the current stop, when it is the firm's turn, is ◆ `--firm` with its label in
  `--firm-ink` Medium; stops ahead are a 6 px Rule Strong dot with Graphite labels. Between reached
  stops the line is 2 px Plate Ink; ahead it is 1 px Rule. Statuses off the path ("Needs
  information", "On hold", "Name unavailable", "Paused: state site changed", "Being checked") are
  told by the chip and the next-step slip, not by a stop; a filing that stopped ("Rejected by the
  state", "Failed", "Stopped", "Needs correcting") shows ▬ in Madder at the stop it didn't reach. A
  rehearsal's rule is drawn in the rehearsal's dashes (1.5 px, 4 / 3). The rule is `aria-hidden`:
  the chip carries the meaning (Hal). When a stage has been reached since the firm last looked, its
  segment inks along once (`--t-draw`, `--ease-sweep`), the After band's gesture (D3).
- **Next step**: the product's sentence for the status ("The proof is ready: check exactly what
  will be filed and approve it.", "Fill in what's missing below and the filing moves on to
  approval.", "We're filling in the state's form up to its review page. …", "The state says the
  name is taken. …", "The state rejected the filing. …") as a slip in its tone: Your turn for the
  firm's own steps, Plain while the state's page is fetched, Attention for a name, Problem for a
  rejection or failure.
- **"Your proof is ready"**, whenever there is an approval link: the page's one hero, and the most
  important card in the product (Hal, Priya, Dev). A white sheet with the **Firm Rule along its
  top edge** (the 3, 2 and 1 px lines, inside the card's top), 32 px padding: "Your proof is ready"
  (`section`, Founders Grotesk Medium 22 / 28), the product's sentence in `body-desk`, "Open the
  proof and approve it" (primary, 56 px, a 16 px arrow-out glyph after the label, opening in a new
  tab, with the hidden hint `[copy needed: "opens in a new tab"]`), and the emailed line ("We also
  emailed the link to {addresses}." or "The link wasn't emailed (sending failed); open it here.") in
  `small` Graphite. Arriving as the filing reaches "Waiting for approval", the card presses in once
  (D2 `press-in`); the button never pulses.
- **Other notices**, as slips: "Approved and ready to pay. It needs the security code of {label}
  ending {last4}. Pay and file" (Attention); the filing's last error (Problem); "Saved to Google
  Docs. Open the record" (Done) and the Google notices ("Saving to Google Docs was cancelled.",
  "That Google sign-in took too long. Try again.", …) (Attention), under the head.
- **"Still needed"** (status "Needs information"): a white sheet with a 1 px `--firm-ink` border
  and the 3 px `--firm` left edge (it's the firm's turn), its title "Still needed", the missing
  fields in the form's style (10B.12.2), "Send the answers" (primary); "Thanks, that's everything.
  The filing moves on to approval." or "Saved. Still needed: {labels}." as a Done slip; errors as
  built. "Also needed: {labels}. These take the full form: start this filing again with them, and
  this one can be left as it is." in `small`, "start this filing again" a link.
- **The rail** (≥ 1280 px; under the main column, in this order, below that):
  - **Documents**: the papers that came back, as **document cards** (the foundation's own card:
    a plain white sheet 128 × 166, 1 px Rule, grey Rule bars for text, no seal and no state
    layout, 3.9), two across, 16 px apart. Under each, its label as a download link (15 / 22
    Medium, underlined `--firm-ink`) and its kind (14 / 20 Graphite). A document that arrived since
    the firm last looked rises once out of a drawn envelope edge (12 px, 400 ms `--ease-settle`):
    the envelope flap of D2, played once.
  - **EIN**: "EIN:" in 15 / 22 Graphite and the number in Founders Grotesk Mono 32 / 40 Plate
    Ink, in a 1 px Rule box with 20 px padding: the number a new business will quote for the rest
    of its life is set big (Greta, Elaine).
  - **"Save to Google Docs"** (small secondary) with its note, "A copy of this record in your
    Google account. People's Social Security numbers and ITINs are left out." in `small` Graphite.
- **"Progress on the state site"**: a disclosure (48 px summary row, Founders Grotesk Medium
  17 / 24, "({test run|filing run}, {status})" in Graphite). Inside, the run's steps as a vertical
  list on a 1 px Rule line: a 7 px ○ Iron ring per step (● Verdigris for the last when the run is
  complete), the step's note in 15 / 22, its time in Founders Grotesk Mono 14 / 20 Graphite at the
  right, tabular. The programme of the rehearsal band (D3), in the desk's quiet voice.

### 10B.13.2 Phone

One column, in this order: head, chips, meta line, **the stage rule set vertically** (stops 36 px
apart on a vertical line, labels to the right), the next step, "Your proof is ready" with its
button full width, the other notices, "Still needed", documents (two across, 150 px wide), the EIN,
"Save to Google Docs", the progress disclosure.

### 10B.13.3 States

| State | What shows |
|---|---|
| Received, fetching the review page | Chip "Received" or "Getting the state's review page"; the rule with no stop reached; the Plain next-step slip; no proof card |
| Waiting for approval | The proof card as the hero; the rule's first stop ◆ |
| Approved, filing | Chip "Approved", "Queued" or "Filing now"; no proof card; the rule inked to "Approved" |
| Ready to pay | The Attention slip with "Pay and file" |
| Needs information | "Still needed" |
| Done | Chip "Completed" (or "EIN issued"); the rule inked to the end; documents and the EIN lead the rail |
| Rejected, failed, stopped | Problem chip; the last error as a Problem slip; ▬ on the rule; the next-step line |
| Not found (another firm's filing, a wrong id) | 10B.21 |

---

## 10B.14 Client links (`/client-links`)

```
DESKTOP (720 column)
  Send a client a link                                             page-title
  Your client fills in the filing on a page with Harbor & Pine CPA's name and logo. It then
  appears here under Filings, and you get the proof to approve before anything is filed. …
  24                                                               body-desk Graphite
  ┌──────────────────────────────────────────────────────────────────────┐
  │ Filing                                                               │
  │ [ Choose…                                                        ▾ ] │
  │ Who it's for (shown to you and the client)                           │
  │ [ e.g. Blue Harbor Bakery                                          ] │
  │ ┌────────────┐                                                       │
  │ │ Make link  │                                                       │ primary
  │ └────────────┘                                                       │
  └──────────────────────────────────────────────────────────────────────┘
  24   (after "Make link")
  ┌──────────────────────────────────────────────────────────────────────┐
  │ New Jersey LLC formation for {label}         ┌──────────────────────┐│ result card
  │ ┌──────────────────────────────────────────┐ │ [logo] Harbor & Pine ││ the client's page,
  │ │ {the link}                               │ │ ════════════════════ ││ phone layout, 0.6
  │ └──────────────────────────────────────────┘ │ New Jersey LLC       ││ (234 × 300)
  │ [ Copy link ]  [ Email it from your mail app ]│ formation · {label}  ││
  │ Works for 30 days and makes one filing.      │ [▭▭▭▭▭▭▭▭▭▭▭▭▭▭▭▭]   ││
  │ Anyone with the link can fill in the form,   │ [ Send to Harbor … ] ││
  │ so send it only to your client.              └──────────────────────┘│
  └──────────────────────────────────────────────────────────────────────┘
  32
  ┌ Links you sent ──────────────────────────────────────────────────────┐
  │ For                Filing                    Made          Status    │ head 14/18
  │ {label}            New Jersey LLC formation  Dec 1, 2026   ○ Waiting for the client  [Turn off] │
  │ No label           New York LLC formation    Nov 28, 2026  ● Used: open the filing   │
  │ {label}            Florida LLC formation     Nov 20, 2026  Expired                   │
  └──────────────────────────────────────────────────────────────────────┘
```

- **Head**: "Send a client a link" and the product's paragraph, with the firm's display name in it.
- **The form** in a white sheet: "Filing" (select, "Choose…"), "Who it's for (shown to you and the
  client)" (placeholder "e.g. Blue Harbor Bakery"), "Make link" (primary). Errors as Problem slips:
  "Pick a filing.", "Sign out and back in, then make the link again.", "That link couldn't be made
  just now. Try again in a minute."
- **The result card** (Hal, Marcus): "{filing} for {label}" in Founders Grotesk Medium 20 / 26;
  the link in a plate field (Founders Grotesk Mono 15 / 22, wrapping anywhere); "Copy link" and
  "Email it from your mail app" as small buttons, the first confirming with `[copy needed:
  "Copied"]`; the product's line "Works for {days} days and makes one filing. Anyone with the link
  can fill in the form, so send it only to your client." in `small` Graphite. Beside it on desktop
  (under it on phones, 280 px wide), **the page the link opens**, drawn live in the firm's brand at
  0.6 scale: its Letterhead, "{filing} · {label}" in the firm's font, empty fields, the "Send to
  {firm}" button. The client's view, as a reassurance before the link is sent (`role="img"`,
  accessible name `[copy needed]`). The card presses in once when it appears.
- **"Links you sent"**: a ledger sheet: "For" (the label, or "No label" in Graphite), "Filing",
  "Made" (date), "Status", and "Turn off" as a small button on open links. Status: "Waiting for the
  client" with ○ Iron (it's the client's turn, not the firm's: In hand), "Used: open the filing" as
  a `--firm-ink` link with ● Verdigris, "Turned off" and "Expired" in plain Graphite text. Rows
  56 px. Phone: rows become cards (label, filing, date, status, the button full width).
- **Empty**: with no links yet the ledger simply isn't there, as built.

## 10B.15 Requests from a text or email (`/from-email/<id>`)

The link in the reply to a forwarded request opens this page. It tells the same story as the home
page's Requests band, on the firm's own desk: the message, and the form already filled in from it.

```
DESKTOP (12 columns)
  Request by text message                                          page-title
  From {sender}, Dec 1, 2026, 7:42 AM: {subject}                   small Graphite, subject Medium
  32
  ╔═ c1–c7 ════════════════════════════════════════╗   ┌ c8–c12: Your message ───────────────┐
  ║ ═══════════════════════════════════════════════ ║   │ ╭─────────────────────────────────╮ │
  ║ This looks like a request for: New Jersey LLC   ║   │ │ {the message, as it arrived}    │ │ bubble: Bond,
  ║ formation. {note}                               ║   │ │                                 │ │ 1 px Rule, 20 px
  ║ We filled in 4 answers from your message.       ║   │ ╰╮────────────────────────────────╯ │ radius, 4 px at
  ║ Check every answer and add what's missing       ║   │   {sender} · {time}                 │ the sender corner
  ║ before you send it.                             ║   └─────────────────────────────────────┘
  ║ ┌──────────────────────────────┐                ║
  ║ │  Open the filled-in form     │                ║   primary, 56
  ║ └──────────────────────────────┘                ║
  ╚═════════════════════════════════════════════════╝
  ▸ Not this filing? Choose another
```

- **Head**: "Request by {email | Slack | text message | WhatsApp}" and the product's from line, the
  subject in Founders Grotesk Medium.
- **The match** (c1–c7), the hero card with the Firm Rule along its top, like "Your proof is
  ready": "This looks like a request for: {filing}." with the filing in Medium and the reader's
  note after it, in `body-client` 18 / 28; the count line ("We filled in {n} answers from your
  message." or "We couldn't find answers in your message for this form.") and "Check every answer
  and add what's missing before you send it." in `small` Graphite; "Open the filled-in form"
  (primary). Under the card, the disclosure "Not this filing? Choose another" listing the filing
  types as 48 px link rows.
- **The message** (c8–c12): set as it arrived (Hal, Elaine, Greta, Marcus). A text or WhatsApp
  message is a **bubble**: Bond `#F5F5F2`, 1 px Rule, 20 px radius with a 4 px corner at the
  sender's side, 18 / 28 Plate Ink, max 420 px, the sender and time under it in 14 / 20 Graphite;
  the same neutral bubble as the home page's Requests picture, never a messaging app's look. An
  email is a **letter card**: white, 1 px Rule, 24 px padding, the sender and subject in `small`
  Graphite over a 1 px Rule, the body in 17 / 26, wrapped as written. Where a filled-in answer
  appears word for word in the message, that phrase is underlined 2 px in `--firm` (the home
  picture's underlines, in the firm's ink) (Marcus). The disclosure "Your message" in the markup
  is open by default on desktop and tablet.
- **No match**: the card's place takes a Plain slip with the product's sentence ("We couldn't
  tell which filing this is. {note} Choose it below." or "Reading emails automatically isn't
  switched on for this site yet. Choose it below.") and the disclosure "Choose the filing", open.
- **Already sent**: "Already sent as a filing. Open the filing" as a Done slip above everything.
- **Deleted after 30 days**: the bubble's shape holds the product's sentence instead of the
  message, in Graphite ("The text of this message was deleted after 30 days, as we do with all
  personal details. Start the filing from the New filing page."), and no match card (Greta).
- **Phone**: head, the match card, the disclosure, then the message.

## 10B.16 Signatures (`/signatures`)

A narrow page. "Saved signatures" and the product's paragraph ("Some New York filings are a state
PDF form that has to be signed. A saved signature is kept encrypted and is placed on a form only
after that filing is approved, never on a preview or test run. Nobody can download it.").

- **The ledger**: a white sheet: "Signer" (the name in 17 / 24 Medium, the email under it in
  `small` Graphite), "Saved" and "Last used" (dates, or "Never"), and "Remove" as a small danger
  button. Rows 64 px. No signature images: nobody can download one, and the page shouldn't look as
  if they could (Elaine).
- **Empty**: "No saved signatures yet." as a Plain slip, with an engraved vignette above it (a
  capped fountain pen on a blank sheet, Graphite, 120 px; D1.4).
- **"Add a signature"** (h2, Founders Grotesk Medium 22 / 28), then the form in a white sheet:
  "Signer's full name", "Signer's email (optional)", the help "Only the signer may draw and adopt
  their own signature. If the signer is your client, send them a client link for the filing; the
  form asks them to sign.", "Signature" with the pad (10B.12.4), the engine's consent sentence as a
  checkbox row, and "Save signature" (primary). Messages: "Saved {name}'s signature." (Done);
  "Enter the signer's full name.", "Draw the signature in the box.", "The signer has to check the
  box to adopt the signature.", "The signature couldn't be saved." (Problem).

## 10B.17 Ready to pay (`/pay`)

A narrow page. "Ready to pay" and the product's paragraph ("Approved filings that pay the state
with a saved card wait here for the card's security code (the 3 or 4 digits on the card). Enter it
once and every filing waiting for that card goes ahead. We keep the code for an hour at most, then
delete it.").

```
DESKTOP (720 column)
  ┌────────────────────────────────────────────────────────────────────┐
  │ ▭  {card} ending {last4}                                           │ card plate + Medium 20/26
  │ ────────────────────────────────────────────────────────────────── │
  │ Two Sisters Bakery LLC  approved, waiting since Dec 1, 2026, 3:02 PM│ 48 px rows
  │ ────────────────────────────────────────────────────────────────── │
  │ Security code for {card} ending {last4}                            │ label
  │ ┌──────────────┐  ┌──────────────┐                                 │
  │ │  · · · ·     │  │ Pay and file │                                 │ 160 × 56, Mono 24,
  │ └──────────────┘  └──────────────┘                                 │ 0.3 em; button 56
  └────────────────────────────────────────────────────────────────────┘
  A card's security code can't be stored, so we ask for it when filings are ready to pay. …
```

- One white sheet per card waiting: the card plate (10B.8) and "{card} ending {last4}"; the
  filings waiting for it as rows (the title as a link, "approved, waiting since {date and time}"
  in `small` Graphite); then the security code: its label "Security code for {card}", the Basis
  Theory field styled as a 160 × 56 px field in Founders Grotesk Mono 24 px with 0.3 em letter
  spacing and the numeric keypad (`inputmode="numeric"` through the element's options), and "Pay
  and file".
- **One primary in view** (D5) even with several cards waiting: each "Pay and file" is drawn as a
  secondary button until its own field holds a complete code, then it fills with `--firm-fill`
  (200 ms crossfade). The firm's eye goes to the card it is paying.
- Messages: "Thanks. The filing is being filed now.", "Thanks. {n} filings are being filed now.",
  "Thanks. Filings for this card pay with it for the next hour." (Done, `role="status"`); "Type the
  3 or 4 digit code from the card.", "The code wasn't sent.", "The code wasn't accepted. Try
  again.", "The field couldn't load. Reload the page and try again." (Problem). "Sending…" while
  pending.
- The product's help line under the sheets in `small` Graphite.
- **Empty**: "Nothing is waiting for a card right now." in `body-desk`, with an engraved vignette
  (a card face down on a clear desk, Graphite, 120 px) (Elaine). **Vault off**: "Card payments need
  the card vault switched on for this site." as a Plain slip.

## 10B.18 Billing (`/billing`, partner firms)

Billing is the firm's account with CoFile, but it lives on the firm's desk, so it keeps the desk's
register: the firm's ink marks its plan, and prices are set in Founders Grotesk, never Miller (5.5).

```
DESKTOP (12 columns)
  Billing
  ┌ c1–c7 ───────────────────────────────────────────┐
  │ Growth plan                         ● Active      │ Founders Medium 22/28, chip
  │ $500.00 a month                                   │ 18/26 tabular
  │ Renews Dec 26, 2026.                              │ small Graphite
  │ [ Manage billing ]                                │ secondary
  │ Your plan pays for live filings; rehearsals are … │ small Graphite
  └───────────────────────────────────────────────────┘
  ┌ c1–c7 ───────────────────────────────────────────┐
  │ This month on Growth          Nov 26 to Dec 25, 2026│
  │ ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓░░░░░░░░░░░░│░░░░░░░░░░░        │ 12 px meter; tick = plan's own
  │ 9 of 18 filings used (15 in the plan, 3 carried over from last month).│
  └───────────────────────────────────────────────────┘
  ( Monthly | Yearly (2 months free) )                   48 px segmented control
  ┌════════════════┐ ┌────────────────┐ ┌────────────────┐ ┌────────────────┐
  │ Pay as you go  │ │ Starter        │ │ Growth  ●Your  │ │ Unlimited      │ 4 across, 3 cols each;
  │ No monthly fee │ │ $250 a month   │ │ $500 a month   │ │ $1,000 a month │ the current plan's card
  │ {blurb}        │ │ {blurb}        │ │ {blurb}        │ │ {blurb}        │ carries the Firm Rule
  │ {detail}       │ │ {detail}       │ │ {detail}       │ │ {detail}       │ along its top
  │ [Choose this…] │ │ [Switch to …]  │ │                │ │ [Switch to …]  │ secondary buttons
  └────────────────┘ └────────────────┘ └────────────────┘ └────────────────┘
  Only live filings count; rehearsals are always free and never count. …   small Graphite, 64 ch
  ┌ Registered agent service ─────────────────────────────────────────────────────────────┐
  │ …table: Business, State, Since, Status, [Cancel renewal]                               │
  └────────────────────────────────────────────────────────────────────────────────────────┘
```

(Plan names and prices come from `web/lib/pricing.ts` through the billing summary; the month's
numbers are a layout placeholder.)

- **Notices** under the title: "Your plan is changing. Stripe adjusts this period's charge for the
  change, and this page shows the new plan in a moment." (Done, `role="status"`); "Billing couldn't
  be loaded. Try again shortly." (Problem).
- **The plan panel** (a white sheet, c1–c7): "{plan} plan" with its status chip ("Active" and "Free
  trial" Done; "Waiting for the first payment" and "Paused" Attention; "Payment failed: Stripe is
  retrying", "Unpaid" and "The first payment didn't go through" Problem; "No subscription yet" and
  "Canceled" a plain chip, Sheet with a 1 px Rule Strong border and no glyph); the price line in
  18 / 26 tabular; "Renews {date}." or "Ends {date}."; the slips ("Thanks. Stripe is confirming the
  payment; this page updates in a moment.", "The last payment failed. Update the card under Manage
  billing.", "Real filings need an active subscription. Rehearsals are always free.", "You can't
  subscribe from this page yet. To ask about filing for real, email hello@cofile.app."); "Subscribe"
  (primary, where there are no plan cards) and "Manage billing" (secondary; "Opening Stripe…",
  "Opening…"); the help paragraph in `small` Graphite.
- **"This month on {plan}"**: the dates in `small` Graphite at the right; a 12 px meter (Bond track,
  1 px Rule, the used part in `--firm-fill`, a 1 px Plate Ink tick where the plan's own filings end
  and carried-over ones begin); the product's sentence beside or under it. Going past the plan is
  not a warning ("You're never stopped for going past your plan"), so the meter never turns amber or
  red: it simply fills, and the sentence says "Extras so far: {amount}, on your next invoice." The
  pay-as-you-go month reads "{n} live filings this month: {amount}, on your next invoice."
- **The period**: "Monthly" and "Yearly ({n} months free)" as a two-part segmented control, 48 px,
  the selected part in `--firm-fill` with `--firm-on` text (its group named "Billed", as built).
- **The plans** as four cards (two by two on tablets, stacked on phones), each a white sheet,
  32 px padding: the plan's name in Founders Grotesk Medium 22 / 28; the price with its figure in
  Founders Grotesk Medium 32 / 38 tabular and the words after it ("a month", "a year") in 17 / 26
  ("No monthly fee" at 22 / 28); the blurb and the detail line in `small`; the button. **The current
  plan's card carries the Firm Rule along its top** and the "Your plan" chip (Done, quiet) (Hal);
  it has no button. Every other card's "Choose this plan" or "Switch to this plan" is a secondary
  button (a choice among equals; the page has no single next step); "Not available yet" is a
  disabled button. Errors as a Problem slip.
- **"Registered agent service"**: a white sheet with the product's offer line, the ledger
  ("Business", "State", "Since", "Status": "Renews {date}" or "Cancelled {date}; covered until
  {date}") and "Cancel renewal" (small), "No businesses use our registered agent yet." when empty,
  and the help paragraph.

## 10B.19 Password (`/password`)

A narrow page, two white sheets, 480 px wide.

- "Password" (`page-title`). For a personal session, the form: "Current password", "New
  password", "New password again", the help "At least 12 characters. Changing it signs you out on
  every other device.", "Change password" (primary; "Saving…"), its messages as slips. For a
  session from an invite link: "You opened this dashboard from an invite link, so there is no
  password to change." in `body-desk` Graphite.
- **"Send filing requests by text or WhatsApp"** (when the site has numbers), a second sheet with
  the title in Founders Grotesk Medium 20 / 26 and its three states as built: no number yet ("Your
  mobile number", placeholder "212 555 0100", "Text me a code" as a secondary button, the help
  line); waiting ("The 6-digit code we texted to {number}", a 6-character field in Founders Grotesk
  Mono 24 px with 0.3 em spacing and `autocomplete="one-time-code"`, "Confirm" / "Checking…");
  confirmed ("Your mobile number is {number}. From it, {where} with the filing you need; we answer
  with a link to the form filled in from your message.", the number in Medium, "Remove this
  number" small). Errors as Problem slips.

## 10B.20 Signed out (`/p/<firm>/signed-out`)

Not inside the desk shell: whoever is here isn't signed in.

```
DESKTOP                                            PHONE
┌──────────────────────────────────────────┐       ┌──────────────────────────────┐
│               Bond ground                │       │ (sheet is the screen)        │
│   ┌──────────────────────────────────┐   │       │ [the vignette, 120 px]       │
│   │       [engraved vignette:        │   │       │ You're not signed in to this │
│   │        a door, its plate blank,  │   │       │ filing desk                  │
│   │        Graphite, 160 px]         │   │       │ If your firm has a filing    │
│   │ You're not signed in to this     │   │       │ desk, log in here.           │
│   │ filing desk                      │   │       │ Otherwise open the invite    │
│   │ If your firm has a filing desk,  │   │       │ link …                       │
│   │ log in here.                     │   │       └──────────────────────────────┘
│   │ Otherwise open the invite link   │   │
│   │ your filing company sent you. …  │   │
│   └──────────────────────────────────┘   │
└──────────────────────────────────────────┘
```

- One centred white sheet, 560 px, 48 px padding, on Bond. The heading "You're not signed in to
  this filing desk" in Founders Grotesk Medium 28 / 34 (no firm's font is known here; no Miller,
  since this is a firm address); the two paragraphs in `body-client`; "log in here" a Plate Ink link
  underlined 1 px Rule Strong.
- An engraved vignette above the heading (D1.4): the office door with its plate blank, in Graphite,
  160 px (120 px on phones).
- **When the address belongs to a firm with public pages** (its brand is already public), the
  sheet carries that firm's Letterhead, left-aligned, and the ground is its `--firm-wash`: the
  person came to that firm's desk. Otherwise the sheet has no Letterhead and no Imprint.

## 10B.21 When a desk page fails, or isn't there

- **A page that fails** inside the desk keeps the Letterhead row, the Firm Rule and the
  navigation (build note: a `(portal)/error.tsx` using the root error page's words), and shows one
  centred white sheet, 560 px: "Something went wrong" (`page-title`), "This page couldn't load just
  now. It's usually a short hiccup on our side." (`body-desk`), "Try again" (primary) and "Log in
  again" (secondary), and, when there is one, "If it keeps happening, tell us this reference:
  {digest}" with the reference in Founders Grotesk Mono, `small` Graphite.
- **Not found** inside the desk (a filing that isn't this firm's, a wrong address) keeps the shell
  and shows "Page not found" and "The link may be old or mistyped." with one button back to the
  desk's Filings `[copy needed: the desk's version of "Go to the home page"]`.
- **A session that ended** goes to CoFile's own "session ended" page, as built (the public-site
  part).

---

## 10B.22 The proof: the page the firm approves

The firm opens it from its desk ("Open the proof and approve it") or from the email "Your proof is
ready to approve: {title}". It is one sheet under the firm's own Letterhead, set like a proof from a
very good printer: every detail where it should be, every fee like a good invoice, plenty of white,
and one place to say yes, at the foot, after everything has been read (Hal). The firm approves it,
never its client. It is rendered by the engine (`renderReviewPage` in `src/approvals/render.ts`),
so every value below is an inline style, and the page works completely with no JavaScript.

### 10B.22.1 Desktop

```
DESKTOP 1440: --firm-wash ground; one sheet, 760 px, centred, 64 px from the top, --e-sheet,
48 px padding (content 664)
┌──────────────────────────────────────────────────────────────────┐
│                               32                                 │
│                            ┌──────┐                              │
│                            │  ▲   │                              │ logo 64 × 64 (sheets, 3.5)
│                            │  ≈≈  │                              │
│                            └──────┘                              │
│                               12                                 │
│                        Harbor & Pine CPA                         │ Lora 600 24/30, centred
│                               20                                 │
│ ════════════════════════════════════════════════════════════════ │ 3 px Harbor
│ ──────────────────────────────────────────────────────────────── │ 1 px Pine, 2 px below
│                               32                                 │
│ ┌ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ┐ │ only for a rehearsal:
│   ⚲  Rehearsal: nothing will be filed or paid, even if you        │ 1.5 px dashed Plate Ink,
│      approve.                                                     │ 17/26 Medium
│ └ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ┘ │
│                               32                                 │
│ NJ formation                                                     │ kicker 15/22 Medium Graphite
│ Two Sisters Bakery LLC                                           │ proof-title: Lora 600 34/40
│                               16                                 │
│ Filing reference 3f9c…. Please decide by December 3, 2026,       │ 16/24 Graphite; reference
│ 5:00 PM Eastern. After that, this link stops working and you'll  │ in Mono 15; the deadline
│ need a new one.                                                  │ Medium Plate Ink
│                               24                                 │
│ ┌──────────────────────────────────────────────────────────────┐ │ the terms: Bond, 1 px Rule,
│ │ By approving, you confirm every detail below is correct and  │ │ 24 px padding, 17/27
│ │ authorize its submission exactly as shown, and payment of    │ │ Plate Ink; no icon,
│ │ the fees shown, up to the total shown ($103.50). Government  │ │ no color
│ │ fees generally can't be refunded once paid, even if the      │ │
│ │ filing is rejected. Government sites don't save drafts, so   │ │
│ │ once you approve, the whole filing is sent in one go. Please │ │
│ │ check everything now.                                        │ │
│ └──────────────────────────────────────────────────────────────┘ │
│                               48                                 │
│1  The state's review page                                        │ numeral --firm-ink, hung;
│   This is a picture of the state's own review page, filled in    │ h2 Lora 600 22/28
│   with your details. When we file, we go ahead only if the state │ body-client 18/28
│   shows exactly this page again; if anything is different, we   │
│   stop before paying.                                            │
│   ┌──────────────────────────────────────────────────────────┐   │ the state's own page,
│   │ ┌──────────────────────────────────────────────────────┐ │   │ as captured: 12 px Bond
│   │ │                (the state's review page)             │ │   │ mat, 1 px Rule Strong;
│   │ └──────────────────────────────────────────────────────┘ │   │ a link to the full size
│   └──────────────────────────────────────────────────────────┘   │
│                               48                                 │
│2  Filing details                                                 │
│   Formation                                                      │ group head 15/22 Medium
│   ────────────────────────────────────────────────────────────   │
│   Name › Base name              TWO SISTERS BAKERY               │ label 16/22 Medium Graphite,
│   Name › Designator             LLC                              │ 38% / value Mono 16/24
│   Members 1 › Name              Ana Ortiz                        │ Plate Ink; Rule hairlines
│   Members 2 › Name              Lucia Ortiz                      │
│   Main business address › City  Jersey City                      │
│   …                                                              │
│                               48                                 │
│3  State fees                                                     │
│   Nothing is charged on this page. These fees are paid to the    │
│   state when the filing is submitted.                            │
│   Formation filing fee ·································· $100.00│ fee 18/26, dot leaders
│   NJ portal fee, by card ··································· $3.50│ Rule Strong, tabular
│   ────────────────────────────────────────────────────────────── │ 1 px Plate Ink
│   Total                                                  $103.50 │ total 22/28 Medium
│                                                          ═══════ │ double rule (1, 2, 1)
│                               48                                 │
│ ──────────────────────────────────────────────────────────────── │ 1 px Rule
│                               32                                 │
│4  What should change? (Needed only if you ask for changes)       │ label 16/22 Medium
│   ┌──────────────────────────────────────────────────────────┐   │ textarea, 3 rows, 120 px
│   │                                                          │   │
│   └──────────────────────────────────────────────────────────┘   │
│                               24                                 │
│ ┌──────────────────────────────────────────────────────────────┐ │ primary, full width, 60 px,
│ │        Approve, and authorize submission and payment         │ │ --firm-fill, Lora 600 18/24
│ └──────────────────────────────────────────────────────────────┘ │
│                               16                                 │
│ ┌──────────────────────────────────────────────────────────────┐ │ secondary, full width,
│ │                       Request changes                        │ │ 52 px
│ └──────────────────────────────────────────────────────────────┘ │
│                               32                                 │
│ Questions: {support email}                                       │ small Graphite, a link
│                               24                                 │
│                              ────                                │ 40 px hairline
│                           with CoFile                            │ the Imprint, 13 px
│                               48                                 │
└──────────────────────────────────────────────────────────────────┘
```

(The fee rows and total are the copy's NJ example, D4; the filing's reference is shortened here as
a layout placeholder; the details' labels are what the renderer builds from the payload's keys.)

### 10B.22.2 The parts, top to bottom

1. **Letterhead, centred** (3.5, ceremonial): the logo by the sheets' area rule, the typeset name
   when 3.5.2 shows it (Harbor & Pine: yes; Northgate and ⟨Firm C⟩: no), the Firm Rule across the
   content width, 20 px under the logo block. No logo: the typeset name alone at 30 / 36. The
   page's `<title>` stays "{firm}: approve filing".
2. **The rehearsal band** (only for a practice filing): the rehearsal mark (4.4), the same object
   as every other rehearsal mark: Sheet, 1.5 px dashed Plate Ink (4 / 3), 16 × 20 px padding, the
   14 px ghost light, "Rehearsal: nothing will be filed or paid, even if you approve." in Founders
   Grotesk Medium 17 / 26 Plate Ink. Never yellow, never a warning (all ten).
3. **The title.** The engine's title for the filing ("{state} {type}: {business name}") is set in
   two lines, without changing a word: the part before the colon as a kicker (15 / 22 Medium
   Graphite), the business name as the title (`proof-title`, firm font 600, 34 / 40, `text-wrap:
   balance`), so the client's business is the largest thing on the sheet after the firm's name
   (Greta). A title with no colon is set whole as the title. Long names wrap and are never
   truncated.
4. **Reference and deadline**: the product's line in 16 / 24 Graphite; the reference in Founders
   Grotesk Mono 15; the deadline ("December 3, 2026, 5:00 PM Eastern") in Founders Grotesk Medium
   Plate Ink, so it can be found at a glance (Hal).
5. **The terms panel**: the approval consent, then the EIN sentences when they apply ("While
   filing, we'll get the EIN from the IRS and enter it on the state form. It's the only detail
   added after you approve." or "Once the state accepts this formation, we'll apply for its EIN
   with the IRS using the EIN details below; approving now covers that application too, so you
   won't be asked again."), then "Government sites don't save drafts, so once you approve, the
   whole filing is sent in one go. Please check everything now." Bond `#F5F5F2`, 1 px Rule, 24 px
   padding, 17 / 27 Plate Ink, measure 62 ch. It is the part of a proof you read slowly, so it is
   set to be read, never small, grey, yellow or iconed (Hal, Priya, Elaine).
6. **Numbered sections** (Marcus; the "numbered markers" of 3.6): "1", "2", "3", "4" in Founders
   Grotesk Medium 16 / 22 tabular `--firm-ink`, hung in the sheet's left margin 32 px before each
   heading (inline, 12 px before it, on phones), so a firm can say "check section 2" to a
   colleague. Without a review picture the sections renumber from 1.
7. **"The state's review page"** (h2 in the firm's font, 22 / 28): the product's paragraph in
   `body-client`, then the picture at the content width less 32 px, on a 12 px Bond mat with a 1 px
   Rule Strong edge, `--r-0`: the state's real page shown as it is, the one place the state's own
   website appears anywhere on our surfaces, as evidence for the firm and never as decoration (Hal,
   Marcus). The picture is wrapped in a link to the full-size image (it works with no script); with
   script, it opens a full-screen viewer (Sheet ground, the image at 100%, wheel and pinch zoom, a
   close control `[copy needed: "Close"]`). Its alt text as written.
8. **"Filing details"**: the h2; the SSN note ("Social Security numbers are masked on this page. We
   store them encrypted and delete them after 30 days.") in `small` Graphite when it applies; then
   the renderer's rows, **grouped**: where a row's label begins with a new first segment
   ("Formation", "Contact", …), that segment becomes a group head (15 / 22 Founders Grotesk Medium
   Plate Ink, 24 px above, a 1 px Rule under it) and the rest of the label stays in the row (Hal,
   Greta, Priya). Labels: 38% of the width, 16 / 22 Medium Graphite, the "›" separators in Rule
   Strong with 4 px each side. Values: Founders Grotesk Mono 16 / 24 Plate Ink, exactly as the state
   receives them, wrapping anywhere (long addresses). Masked SSNs ("***-**-1234") with the asterisks
   in Graphite. Rows 12 px top and bottom, 1 px Rule hairlines. The table keeps the payload's order:
   the design never reorders it.
9. **"State fees"**: the h2 and "Nothing is charged on this page. These fees are paid to the state
   when the filing is submitted."; the fee rows with **dot leaders** (Founders Grotesk Text periods
   every 0.4 em in Rule Strong, 5.4), labels 18 / 26 Plate Ink, amounts tabular, right-aligned on the
   decimal, always with cents; a 1 px Plate Ink rule across the column above "Total" (22 / 28
   Medium, the amount Medium tabular) and the **double rule** under the amount (1 px, 2 px gap,
   1 px), the way an accountant underlines a total (Jun, Elaine). When set, "Maximum you authorize"
   follows as its own row (label 16 / 22 Medium, amount 18 / 26 tabular), its parenthesis "(if the
   state asks for more, we stop before paying)" on the line under it in `small` Graphite.
10. **The decision**, after a 1 px Rule and 32 px:
    - "One-time code sent to you" (when required): a 220 × 56 field, 6 characters, Founders Grotesk
      Mono 24 / 32 with 0.3 em letter spacing, `autocomplete="one-time-code"`,
      `inputmode="numeric"`.
    - "What should change? (Needed only if you ask for changes)": a 3-row textarea, 120 px.
    - **"Approve, and authorize submission and payment"**: the primary button, the full content
      width, **60 px tall** (it wraps to two centred lines on phones and grows to 80 px), in
      `--firm-fill` with `--firm-on` text, the firm's font 600 18 / 24 for presets (Founders Grotesk
      Medium for an uploaded font). The biggest button in the product, and the place the initials
      go. **Never sticky**: a proof is approved at the foot, after it has been read (Hal, Elaine).
    - "Request changes": a secondary button, the full width, 52 px, 16 px below, so neither can be
      hit by mistake.
11. **"Questions: {email}"** in `small` Graphite, the address a `--firm-ink` mail link; then the
    **Imprint** at the foot (3.4: centred, 24 px below, its 40 px hairline 12 px above; a link to
    cofile.app in a new tab), for partner firms as built. A platform's white-label proof shows the
    platform's name and contact and no Imprint.

### 10B.22.3 Phone

```
PHONE 390: the sheet is the screen (white, no shadow, 20 px padding)
┌──────────────────────────────────────┐
│                 20                   │
│              ┌──────┐                │ logo 48 × 48
│              │  ▲   │                │
│              └──────┘                │
│          Harbor & Pine CPA           │ 20/26
│ ════════════════════════════════════ │
│ ──────────────────────────────────── │
│ ┌ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─┐ │
│  ⚲ Rehearsal: nothing will be filed  │
│    or paid, even if you approve.     │
│ └ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─┘ │
│ NJ formation                         │
│ Two Sisters Bakery LLC               │ 28/34
│ Filing reference … Please decide by  │
│ December 3, 2026, 5:00 PM Eastern. … │
│ ┌──────────────────────────────────┐ │
│ │ By approving, you confirm every  │ │ 17/27, 20 px padding
│ │ detail below is correct and …    │ │
│ └──────────────────────────────────┘ │
│ 1 The state's review page            │ numeral inline
│ ┌──────────────────────────────────┐ │ full width; tap opens it
│ │ (the state's page)               │ │ full size
│ └──────────────────────────────────┘ │
│ 2 Filing details                     │
│ Formation                            │
│ Name › Base name                     │ label above (15/20)
│ TWO SISTERS BAKERY                   │ value under (Mono 17/24)
│ ──────────────────────────────────── │
│ 3 State fees                         │
│ Formation filing fee ······· $100.00 │ leaders shorten; amounts
│ NJ portal fee, by card ········ $3.50│ never wrap
│ Total                        $103.50 │
│ 4 What should change? (Needed only … │
│ [                                  ] │
│ ┌──────────────────────────────────┐ │
│ │ Approve, and authorize submission│ │ 80 px, two lines
│ │           and payment            │ │
│ └──────────────────────────────────┘ │
│ ┌──────────────────────────────────┐ │
│ │         Request changes          │ │ 52 px
│ └──────────────────────────────────┘ │
│ Questions: {support email}           │
│                ────                  │
│             with CoFile              │
└──────────────────────────────────────┘
```

Tablet (834): the 760 px sheet with 40 px padding; numerals hang in the padding.

### 10B.22.4 Behavior

- **No entrance.** The proof is on the page at first paint and nothing on it moves (D2): no
  sections sliding in, no counting fees, nothing pulsing.
- **Approving**: the button debosses (80 ms down 1 px with a 1 px inset shadow) and stays pressed,
  `disabled` and `aria-busy`, until the next page arrives, so a second press can't send twice (a
  few lines of inline script; without script the form simply posts). Where cross-document View
  Transitions are supported, the Letterhead holds perfectly still while the body crossfades
  (200 ms) into the decision page (Priya, Hal).
- **Always light**: `color-scheme: light`; the proof is a sheet of paper and stays one in every
  mode (4.6).
- **Fonts**: the engine page loads Founders Grotesk Text and Mono from cofile.app and the firm's
  font (its Google Fonts stylesheet or its uploaded file), replacing the stand-in faces the
  renderer loads today (build note). If the firm's font fails, headings fall back to Founders
  Grotesk, never to a serif default (3.7).
- **Focus order**: the review picture's link, the code field, the textarea, Approve, Request
  changes, the questions link, the Imprint.

### 10B.22.5 Print

A firm may want the proof in the client's file, and it should look as if it came from the firm's
own printer (Hal, Priya). A print stylesheet makes it a letter-size document: 0.75 in margins; the
Letterhead at the top of page 1 and, on later pages, a running head with the firm's name and the
filing reference in 9 pt; body 11 pt; the rehearsal band as a 0.5 pt dashed box; the review
picture at the text width; the details and fees in full, with leaders and the double rule; no form
and no buttons (in their place, the reference and deadline line again); the Imprint and "page {n}
of {m}" at the foot of each page `[copy needed: the page-number wording]`. The Firm Rule prints in
the exact `--firm`.

---

## 10B.23 The proof's other states

Every state keeps the same sheet, ground and Letterhead wherever the firm is known, so a firm
never meets a bare page from its own proof link (Hal: "the same sheet with the engine's words, in a
calm card"). Short states use the same 760 px sheet with 48 px between the Firm Rule and the
message and 48 px under it.

### 10B.23.1 Approved: "Approval recorded"

```
┌──────────────────────────────────────────────────────────────────┐
│                       [ the Letterhead ]                         │
│ ════════════════════════════════════════════════════════════════ │
│ ──────────────────────────────────────────────────────────────── │
│                               48                                 │
│                        Approval recorded                         │ proof-title, firm font,
│                         ═════════════                            │ centred; a 160 px Firm Rule
│                         ─────────────                            │ draws under it (600 ms)
│                               24                                 │
│      Thank you. Your approval is recorded. We'll submit the      │ body-client, centred,
│      filing exactly as shown. If the state's page has changed    │ measure 34 em
│      by then, we stop before paying, and you may be asked to     │
│      approve again. We'll email you when it's complete.          │
│                               32                                 │
│                    Questions: {support email}                    │
│                              ────                                │
│                           with CoFile                            │
└──────────────────────────────────────────────────────────────────┘
```

- The heading "Approval recorded" at `proof-title` in the firm's font, centred (5.4: the decision
  page is a ceremonial piece). Under it, a **160 px Firm Rule** (the same 3, 2, 1 px lines) draws
  left to right once (`--t-draw`, `--ease-sweep`) as the heading presses in: the rule under a
  signature (D2). Reduced motion: both are simply there.
- The paragraph, live: "Thank you. Your approval is recorded. We'll submit the filing exactly as
  shown. If the state's page has changed by then, we stop before paying, and you may be asked to
  approve again. We'll email you when it's complete."
- **A rehearsal**: "Thank you. Your approval is recorded. This is a rehearsal, so nothing will be
  filed or paid." set inside the rehearsal frame (dashed, the ghost light before it), the mark
  without new words.
- **Nothing else**: no stamp, seal, tick, confetti or "APPROVED" (all ten). A finished page looks
  finished (Elaine).

### 10B.23.2 Changes requested

The same sheet and Letterhead (build note: today this answer is a bare paragraph; it is rendered
through the decision page with the firm's brand). No heading exists in the copy `[copy needed: a
heading for the change-request page, the counterpart of "Approval recorded"]`; until there is one,
the product's sentence stands alone under the Letterhead, centred, in Founders Grotesk Text 22 / 28
Plate Ink: "Thank you. Your change request is recorded, and nothing will be filed from this link. If
the filing is corrected, you'll get a new link to approve." No drawing rule: nothing was signed.

### 10B.23.3 The link can't be used

| State | The product's words | Letterhead | Treatment |
|---|---|---|---|
| **Expired** (opening the proof) | "This link to the proof has expired. Ask whoever sent it for a new one." | The firm's (build note: look up the approval's firm, as the record still exists) | The sentence centred, Founders Grotesk Text 22 / 28 Plate Ink, then "Questions: …" and the Imprint |
| **Already decided** | "A decision was already recorded with this link, so there's nothing more to do here." | The firm's | Same |
| **Not valid** | "This link to the proof isn't valid. Ask whoever sent it for a new one." | None: the firm can't be known | A plain white sheet on Bond, the sentence centred, no Letterhead and no Imprint: a neutral page, never CoFile's |
| **Couldn't record the decision** (the link ran out while the proof was open) | "We couldn't record your decision because this link has expired or was already used. Ask whoever sent it for a new link." | The firm's | A Problem slip, centred in the sheet |
| **The code didn't match** | "That code didn't match. Go back, check the latest one-time code we sent you and try again." | The firm's | A Problem slip; under it a link back to the proof `[copy needed: its label]`, the browser's back otherwise |
| **The engine fails** | none today `[copy needed: a short page for a proof link that fails to load]` | The firm's where known | The sentence centred, Founders Grotesk Text 22 / 28 |

No state uses red beyond the Problem slip's tone, a warning triangle or an illustration: the firm is
still at its own desk (Greta).

---

## 10B.24 The firm's page for each filing (`cofile.app/<firm>/<service>`)

A firm's permanent page for one filing, which it sends to any client or links from its own
website: for example `cofile.app/bestaccounting/llc-filing-new-york`. It is the firm's shop window,
the purest form of "your name on the door" (Greta): nothing on it is CoFile's but the Imprint at the
foot and our two small legal links. Built by `PublicIntake`. Shown here for Best Accounting, the
example the copy names (3.8: a plain wide wordmark, Best Blue `#1F4FD1`, Inter).

### 10B.24.1 Desktop

```
DESKTOP 1440: --firm-wash (#F4F7FE) ground; one sheet, 760 px, centred, 64 px from the top,
--e-sheet; 48 px padding top, 60 px at the sides (form column 640)
┌────────────────────────────────────────────────────────────────────────────┐
│ [ BEST ACCOUNTING wordmark ]                                               │ left-aligned (working
│                                                                            │ piece), area rule
│ ══════════════════════════════════════════════════════════════════════════ │ 3 px #1F4FD1
│ ────────────────────────────────────────────────────────────────────────── │ 1 px #B1C1EF
│ [⚲ Beta]  This service is in beta. Any filing can run as a rehearsal on   │ beta strip, small
│           the state's real website. It stops before the last button, …    │ Graphite (10B.1.8)
│                                 32                                         │
│ ┌ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ┐ │ only while not live
│   ⚲ This page is in rehearsal for now. You can fill it in, but nothing     │
│     will be filed with the state and nothing will be charged, now or      │
│     later, even after you approve it. To file for real, contact Best      │
│     Accounting.                                                           │
│ └ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ┘ │
│                                 24                                         │
│ New York LLC formation                                                     │ Inter 600 32/38
│                                 16                                         │
│ Articles of Organization for a domestic LLC, filed online with the NY      │ body-client 18/28
│ Department of State. After you send this, Best Accounting checks every     │ Plate Ink
│ detail and fee and approves exactly what will be filed. Nothing is filed   │
│ or paid until they do.                                                     │
│ State filing fee $200, paid only after the filing is approved. Optional:   │ small, Plate Ink,
│ plain copy $5, certified copy $10, certificate of existence …              │ tabular
│                                 32                                         │
│ Fields marked * are required.                                              │
│ ────────────────────────────────────────────────────────────────────────── │
│1 Name                                                                      │ numeral in --firm-ink;
│  LLC name, without the ending *                                            │ legend Inter 600 22/28
│  ┌──────────────────────────────────────────────────────────────────────┐  │ 56 px
│  └──────────────────────────────────────────────────────────────────────┘  │
│  For example: Blue Harbor Consulting. Words like bank, insurance or …     │ help
│  Ending *                                                                  │
│  [ LLC                                                                ▾ ]  │
│  …                                                                         │
│ ────────────────────────────────────────────────────────────────────────── │
│2 Articles                                                                  │
│  …                                                                         │
│ Authorizations                                                             │
│  …                                                                         │
│ Next, Best Accounting checks it and approves the filing. Nothing is filed  │ body-client
│ until they do.                                                             │
│ By sending, you agree to CoFile's Terms of Service; your details are       │ small Graphite; links
│ handled under its Privacy Policy.                                          │ Graphite, underlined
│ Questions about this form? Email Best Accounting at {support email}.       │ small; --firm-ink link
│                                 24                                         │
│ ┌──────────────────────────────┐  State filing fee $200, paid only after … │ primary 56, Inter 600;
│ │  Send to Best Accounting     │                                           │ fee note small Graphite
│ └──────────────────────────────┘                                           │
│ Within 120 days after the LLC is formed, New York requires it to publish … │ fee aside, small Graphite
│                                 48                                         │
│                                ────                                        │
│                             with CoFile                                    │ the Imprint, not a link
│                                 48                                         │
└────────────────────────────────────────────────────────────────────────────┘
```

- **The Letterhead** inside the sheet, left-aligned (a working piece, 3.5), sized by the sheets'
  area rule; for Best Accounting's wide wordmark, no typeset name. Head margin 48 px.
- **The beta strip** (10B.1.8) under the Firm Rule; then **the rehearsal band** while the filing
  type isn't live, the product's sentence with the firm's name in it, in the rehearsal mark (4.4).
- **The h1** is the filing type in the firm's font (`page-title`); **the paragraph** is the
  summary and the product's reassurance in the firm's name ("After you send this, {firm} checks
  every detail and fee and approves exactly what will be filed. Nothing is filed or paid until they
  do."; for an EIN alone, "… approves exactly what will be sent to the IRS. Nothing is filed until
  they do."), at `body-client` in Plate Ink: it is what a client needs to hear, in the firm's name
  (Hal). The fee note under it in `small` tabular.
- **The form**: the client's copy of 10B.12 (10B.12.3), legends and the button in the firm's font.
- **The footnotes**, as built and in this order: "Next, {firm} checks it and approves the filing.
  Nothing is filed until they do." (`body-client`); "By sending, you agree to CoFile's Terms of
  Service; your details are handled under its Privacy Policy." (`small` Graphite, the two links in
  Graphite underlined 1 px Rule Strong: they're ours, and small, so they don't take the firm's
  color, Hal); "Questions about this form? Email {firm} at {email}." (`small`, the address a
  `--firm-ink` link).
- **"Send to {firm}"**: primary, 56 px, auto width (at least 280 px), the label in the firm's font
  600 for presets; the fee note beside it; the fee aside under it.
- **The Imprint** at the foot of the sheet, centred, 13 px Graphite, **not a link**: nothing should
  pull a client away from the firm (3.4). Shown wherever the product shows "with {platform}" today
  (partner firms).
- **Tab**: "New York LLC formation · Best Accounting" (as built) and the firm's favicon.

### 10B.24.2 Phone

```
PHONE 390: the sheet is the screen
┌──────────────────────────────────────┐
│ 20                                   │
│ [ BEST ACCOUNTING ]                  │ wordmark by the phone area rule
│ ════════════════════════════════════ │
│ ──────────────────────────────────── │
│ [⚲ Beta] This service is in beta. …  │ wraps to four lines
│ ┌ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─┐ │
│  ⚲ This page is in rehearsal for     │
│    now. You can fill it in, but …    │
│ └ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─┘ │
│ New York LLC formation               │ Inter 600 28/34
│ Articles of Organization for a       │ 17/27
│ domestic LLC, filed online with the  │
│ NY Department of State. After you …  │
│ State filing fee $200, paid only …   │ small
│ Fields marked * are required.        │
│ ──────────────────────────────────── │
│ 1 Name                               │ 20/26
│ LLC name, without the ending *       │
│ ┌──────────────────────────────────┐ │ 56 px, 18 px text
│ └──────────────────────────────────┘ │
│ …                                    │
│ Next, Best Accounting checks it and  │
│ approves the filing. Nothing is …    │
│ By sending, you agree to CoFile's …  │ small
│ Questions about this form? Email …   │
│ ┌──────────────────────────────────┐ │
│ │     Send to Best Accounting      │ │ 56, full width
│ └──────────────────────────────────┘ │
│ State filing fee $200, paid only …   │ small, under the button
│                ────                  │
│             with CoFile              │
└──────────────────────────────────────┘
```

Phone first: this is where a bakery owner opens it between customers (Marcus). One column, 20 px
margins, 56 px fields with 18 px text (no iOS zoom), the button full width at the end of the form,
never fixed to the screen.

### 10B.24.3 States

| State | Treatment |
|---|---|
| **Sending** | "Sending…" in the button (10B.1.4) |
| **Errors** | The form's error summary (10B.12.2), focused; the page scrolls to it. Page-level errors from the product as the summary's sentence: "This page isn't available any more.", "Reload the page and try again.", "This page has had a lot of submissions in the last hour. Try again later, or contact the firm." On a red-family firm the summary and fields take the red-family construction (3.6, 10B.2.2) |
| **Sent** | The form is replaced in place, under the same Letterhead, by the product's title "Thank you, we have your details." in the firm's font at `page-title`, a 160 px Firm Rule drawing under it once (`--t-draw`), and "Next, the firm checks every detail and approves the filing. Nothing is filed or paid until it does. You can close this page." in `body-client`. Focus moves to the title. That is the client's whole ceremony: short, warm, and in the firm's colors (Hal, Priya). The page scrolls to the top so the Letterhead is in view |
| **Not offered, or no such firm** | The site's 404 (the public-site part), as built |
| **Loading** | Server-rendered; nothing loads late except the firm's font, which swaps in with no reflow (3.7) |

## 10B.25 The client link page (`cofile.app/i/<token>`)

The page a client opens from the link the firm made in Client links: one client, one filing. The
same sheet and order as 10B.24, with these differences, all from the product:

- **The h1**: "{filing} · {label}", the label after a middot in Graphite at the same size, weight
  400 (Hal, Priya): "New Jersey LLC formation · Two Sisters Bakery LLC".
- **The paragraph**: "{summary} After you send this, {firm} checks every detail and approves it.
  Nothing is filed until they do."
- **The footnotes**: "Next, {firm} checks it and approves the filing. Nothing is filed until they
  do." and the legal line; then, after the form, "Questions? Email {email}." in `small`.
- **Signing**, when the form needs it: the client always draws a fresh signature (as built), with
  the pad full width (10B.12.4) and the client's own wording "Only the signer named above may draw
  it."
- **Sent**: "Thank you." in the firm's font at `page-title`, the drawing rule, and "We have your
  answers. Your firm checks every detail and the fees and approves the filing before anything is
  sent to the state."
- **Tab**: "Your filing · {firm}".

```
PHONE 390, a client link for Harbor & Pine
┌──────────────────────────────────────┐
│ [48] Harbor & Pine CPA               │ symbol 48 × 48, Lora 600 20/26
│ ════════════════════════════════════ │ 3 px Harbor
│ ──────────────────────────────────── │ 1 px Pine
│ [⚲ Beta] This service is in beta. …  │
│ New Jersey LLC formation · Two       │ Lora 600 28/34; the label
│ Sisters Bakery LLC                   │ in Graphite 400
│ Certificate of Formation for a       │
│ domestic LLC, filed online through … │
│ After you send this, Harbor & Pine   │
│ CPA checks every detail and approves │
│ it. Nothing is filed until they do.  │
│ …the form…                           │
│ ┌──────────────────────────────────┐ │
│ │    Send to Harbor & Pine CPA     │ │ Harbor fill, Lora 600
│ └──────────────────────────────────┘ │
│ Questions? Email {support email}.    │
│                ────                  │
│             with CoFile              │
└──────────────────────────────────────┘
```

**When the link can't be used** (the client is still in the firm's office, so these keep the firm's
sheet wherever the firm can be known; Greta, Marcus, Rosa):

| State | The product's words | Letterhead | Treatment |
|---|---|---|---|
| Not valid, or expired before it could be read | "This link has expired or isn't valid" · "Ask whoever sent it for a new one." | None: the link can't name the firm. A plain white sheet on Bond, no Imprint | The heading at `page-title` in Founders Grotesk Medium, the line in `body-client` |
| Used, turned off or expired (the record says so) | "This link can't be used" · "This link was already used. Ask whoever sent it for a new one if you need to file again." / "This link was turned off by whoever sent it. Ask them for a new one." / "This link has expired. Ask whoever sent it for a new one." | The firm's (build note: load the firm's brand before this check) | The heading in the firm's font at `page-title`, the line in `body-client`, the firm's support line if it has one |
| The filing is no longer offered | "This filing is no longer offered" · "Contact {firm} at {email}." | The firm's | Same, the address a `--firm-ink` link |
| Sending after the link closed | "This link has expired. Ask whoever sent it for a new one.", "This filing is no longer offered.", or the closed sentence | The firm's | As the form's error summary |

No red, no warning signs and no illustration on these: a calm sentence on the firm's own paper
(Greta).

## 10B.26 The website widget (`/embed/…`)

The same page as 10B.24, inside the firm's own website, so the firm's site is the frame: no
Letterhead, no beta strip, no page ground (transparent; the form sits on whatever the firm's page
is), the firm's font and colors, 20 px padding, its height following its content (as built), and
"Filed with CoFile" at its foot, left-aligned, 12 px below the form, set as the Imprint ("Filed
with" in the italic, 13 px Graphite), not a link (3.4). Fields keep their white fill and Rule Strong
borders so they hold on any background. The platforms part designs the white-label hosted page and
the widget's settings around it.

---

## 10B.27 Motion on the firm's pages

Client pages and the proof barely move: they are for reading and deciding (Rosa, Amara). The desk
moves only to say something changed. Everything follows D2: words never wait, nothing loops,
money never moves, nothing celebrates, reduced motion shows every final state at once.

| Where | Moment | Timing |
|---|---|---|
| Every desk page | View Transition: the Letterhead row, Firm Rule and navigation hold still, the content crossfades | 200 ms |
| Overview | A changed status: its chip presses in, its row washes 6% `--firm` and fades | 180 + 260 ms; wash 2 s |
| Setup, all done | The Firm Rule draws under "You're set up" | 600 ms, `--ease-sweep`, once |
| After saving Branding | The next page's Firm Rule draws in the new color | 600 ms, once |
| Branding preview | Color re-ink, font crossfade, logo fade | 260 / 160 / 240 ms |
| Filing detail | "Your proof is ready" presses in when it first appears; a newly reached stage inks along the rule; a new document rises out of the envelope edge | `press-in`; 600 ms; 400 ms |
| Client links | The result card presses in | `press-in` |
| Disclosures ("More options", "Progress on the state site", "Not this filing?") | Height ease; chevron turns | 240 ms; 200 ms |
| The proof | Nothing on arrival; the approve button debosses and holds | 80 ms down |
| "Approval recorded", a client's "Thank you" | The heading presses in; a 160 px Firm Rule draws under it | `press-in`; 600 ms |
| Menus and sheets | Open with `--ease-settle`, close with `--ease-exit` | 240 / 160 ms |

No spinners before 3 s, no skeleton shimmer, no toasts, no confetti, no pulsing buttons, no
animated Imprint.

## 10B.28 Accessibility and language on the firm's pages

- **Floors** (D5): nothing under 14 px but the 13 px Imprint; 15 px for anything longer than six
  words; 48 px targets; WCAG 2.2 AA on every firm's colors, which the ink match guarantees for text
  and controls (3.6) and the QA gallery proves (10B.2.5).
- **Focus**: 2 px `--firm-ink` outline outside a 2 px white ring on every focusable element, never
  animated; on the dark desk `--firm-ink-dark`. Focus moves to an error summary, a success title or
  an opened sheet, and returns to the opener when a menu or sheet closes.
- **Announcements**: Problem slips `role="alert"`, Done slips and the "Pay and file" results
  `role="status"`, as built.
- **Structure**: one h1 per page (the page title; on client pages the filing type; on the proof the
  business name); legends on every fieldset; tables with header cells; the stage rule and every
  glyph `aria-hidden`, their meaning in words beside them.
- **Text size and zoom**: every size is in rem; at 200% zoom the desk's navigation becomes the
  phone menu, tables become row cards, and no page scrolls sideways.
- **Color never alone** (4.3): every status has its glyph and word; errors their bar glyph and
  words; "your turn" is an outline and "done" a fill.
- **Spanish and accents**: client names and addresses use Latin Extended-A in Founders Grotesk
  ("Lucía", "Muñoz"); a firm font that lacks a letter falls back for that whole string (10B.2.3);
  `lang` set per element; buttons, chips and kickers wrap rather than shrink, and no button has a
  fixed width, since Spanish runs about 20% longer (D5, 5.4).
- **No script**: the proof, the decision pages and every client page work fully without
  JavaScript; the desk's live previews and menus need it, with the plain form beneath them.

## 10B.29 What this part took, and what it left out

**Taken**: Hal's Letterhead on every firm surface, the centred proof with its terms panel, fee
leaders and full-width approve button, the decision page's drawn rule, the ledger, the stationery
suite in Branding and the card plates; Priya's desk details (counts on "Ready to pay", the section
rail, the phone strip in Branding, the QA gallery, the proof's print sheet); Dev's before-and-after
logo, contrast sample and edge cases, and the empty desk that shows the firm's own page; Greta's
typesetting of names, the stage line, the 24-file test and calm states; Marcus's logo bay, the live
previews and their carry-over, the mini client page on Client links, and the proof's numbered
sections; Elaine's numbered form chapters, the anchored error summary, the big EIN, the dark toggle
in Branding; Rosa's collapsing preview strip on phones.

**Left out**, because the foundation settled the matter or it would read as another designer's
work: Priya's and Dev's sidebars (the foundation puts the navigation in a row under the Firm Rule);
Dev's glow of the firm's color behind the logo (no glows, 2.5); Marcus's 6 px color band across the
top and his colored header for light logos (the Firm Rule and the logo plate do that work); Priya's
Iris rehearsal color (rehearsal is dashes and the ghost light everywhere, 4.4); Priya's sticky
approve bar and Elaine's scroll-linked reading rule on the proof (never sticky; no scroll-linked
motion, D2); sideways-scrolling tabs on phones (Greta, Elaine, Marcus); Greta's sticky door plate
beside the service page's form (the Letterhead names the firm once, at the head); every dashed drop
zone and dashed "add" button (dashes mean rehearsal).

## 10B.30 `[copy needed]` raised by this part

| Where | What |
|---|---|
| Desk shell (10B.3) | The accessible name of the "Ready to pay" count; "Skip to content"; the phone menu button's word ("Menu") and the sheet's close button ("Close") |
| Overview (10B.4) | The accessible name of the empty desk's preview of the firm's own client page; whether the list's "Test" chip should read "Rehearsal", as on the filing's own page (Priya) |
| Your firm and Branding (10B.7) | A short note when Branding opens with a color chosen in For firms' preview; two notes after a font upload ("used for your name only", "falls back where letters are missing"); the two captions in the logo bay ("as uploaded", "on your pages"); the label of the show-or-hide-the-name setting (also in the foundation's list); the note when a raster logo is too small (also in the foundation's list); one line explaining a deepened button color (also in the foundation's list); one line explaining that a light color's buttons print with dark text; one line explaining that links use a darker shade; three preview captions (the proof, the email, the filing desk) and the accessible name of the swap control; the two labels of the dark toggle |
| Branding on phones | "Close" for the preview sheet (the same word as the menu's) |
| New filing (10B.11) | "Copy" and "Copied" for the page addresses and the widget code |
| The desk's form (10B.12.1) | Whether the draft picture's "already filled" and "from the text" tags appear on the real form, and their accessible descriptions |
| Filing detail (10B.13) | The hidden hint that "Open the proof and approve it" opens in a new tab |
| Client links (10B.14) | "Copied" after "Copy link"; the accessible name of the preview of the page the link opens |
| Errors (10B.21) | The desk's version of "Go to the home page" |
| The proof (10B.22, 10B.23) | "Close" for the review picture's viewer; the print footer's page wording; a heading for the change-request page; a link back to the proof after a code that didn't match; a short page for a proof link that fails to load |
| Example firms (10B.2.3) | The awkward brand's name, one of the two spare example firm names the foundation already asks for |
| Copy notes (no new words) | The overview's singular notice reads "1 approved filing is ready to pay and need your card's security code." (the code shares "need" between singular and plural); the copy owner may want "needs". The Branding help "Button text is white, so choose a dark color." no longer holds for light colors once the ink match ships (foundation 3.6) |
