# CoFile merged design, part 3: the home page, 9.0 to 9.4

Merge round, Nov 26, 2026. This part designs the top half of the home page on the foundation
(`01-foundation.md`): the beta notice and header, the hero, Firms, Requests and the proof. Section
numbers such as 3.4 or 6.5 refer to the foundation; D1 to D7 are its binding direction. The base is
Hal's section 9, with Elaine and Marcus for the hero, Dev, Priya, Elaine and Greta for Firms, and
Elaine, Rosa and Priya for Requests and the proof. Credits in parentheses name the source. The
splits this part settled are in `DECISIONS.md`. Sections 9.5 to 9.10 (After, Coverage,
Rehearsals, Pricing, Close, Footer) are in the next part.

All words quoted are the round 3 copy (`web/app/page.tsx`, `web/components/landing/Visuals.tsx`,
`web/components/landing/Shell.tsx`, `web/components/BetaBanner.tsx`), with "CoFile" where the code
renders `{name}`. Anything new is marked `[copy needed]` and listed at the end of this part.

Measurements are for the 1440 px desktop design width (12 columns of 78 px, 24 px gutters, content
1200 px from x = 120 to x = 1320) and the 390 px phone (20 px margins, content 350 px), unless a
line says otherwise. At 1440, column *n* starts at x = 120 + (n − 1) × 102: c1 120, c4 426 (ends
504), c6 630, c7 732 (ends 810), c9 936, c12 1242 (ends 1320).

---

## 9. The home page

### The page from top to bottom

The home page is a stationer's sample book (Hal): nine spreads, each a few words and one picture,
the picture always the bigger of the two. Read in order, the pictures tell one story about one
firm, Harbor & Pine CPA: its desk under its own name, its name on its clients' pages beside another
firm's, a client's text becoming a filing on its desk, the proof it approves, the papers coming
home, what it can file, the free rehearsal, the price card, and finally a blank plate waiting for
the visitor's own name.

```
 DESKTOP, one column of the page (not to scale)        PHONE (390), same order, words first

 ░ beta notice, Cotton 2 ░░░░░░░░░░░░░░░░░░░░░░░░       ░ beta notice ░░░░░░░░░░░░
 ─ header, Cotton, sticky ─────────────────────────      ─ header ─────────────────
 1 HERO       h1 across the full width                   1 words · buttons · note
              words c1–c4 │ DESK SHEET c6–c12 ▸bleed       desk sheet
 2 FIRMS      ◂bleed TWO DOORS, ONE PAGE c1–c7 │ words    2 words
                    [first photograph on the page]          doors, two-card swipe
 3 REQUESTS   words │ ANA (photo) · TEXT · DRAFT ▸bleed  3 words · Ana · text · draft
 4 THE PROOF  ▒ Cotton 2 band ▒ THE PROOF c1–c7 │ words  4 words · the proof
 5 AFTER      words │ DESK PHOTO · ENVELOPE · RECORD     5 words · picture
 6 COVERAGE   headline c1–c8 · four cards across 12 col  6 words · cards stacked
 7 REHEARSALS █ Night band █ words │ STAGE · RUN SHEET    7 words · run sheet
 8 PRICING    centred: "$45" · the price card c3–c10     8 words · card
 9 CLOSE      █ full-bleed photograph: the blank plate █ 9 photo 4:5 · words below
 ═ footer, Cotton 2, thick-and-thin rule ══════════      ═ footer ═════════════════
```

**How the sections alternate.** The standard band is four columns of words, one empty column and
seven columns of picture (6.5), and the picture's side swaps at every band through the first five:
right, left, right, left, right. The eye zigzags the way it does through a sample book, and no two
neighbouring bands put their words in the same place. Coverage and Pricing break the zigzag on purpose (full
width, then centred), and the Close is a photograph across the whole screen. On phones every band
is one column, in the copy's order, words first and picture second; no band opens with a picture
and no two pictures touch without words between them (6.6).

**Grounds.** Paper, paper, paper, quiet paper (Cotton 2 under the proof), paper, paper, night (the
rehearsal stage), paper, photograph. There are no rules or dividers between Cotton bands: a band
ends in its 160 px foot margin, the way a sheet ends in its bottom margin. Where the ground changes
(into and out of the proof's Cotton 2 band, the Night band, the Close's photograph) the change of
ground is the only edge, square and full bleed.

**Where the photographs sit.** The first screen has no photograph except the small portraits of
CoFile's own filing professionals beside the hero's note (D1). The first picture-sized photograph is
the two doors in Firms, so the page's first image of a real place is a firm's name on a door,
directly beside "Your name on the door." After that, photography is the setting under the product in
Requests (Ana at the bakery counter), After (the desk where the papers come home) and Rehearsals
(the empty stage), and the whole picture in the Close (the blank plate). The hero and the proof
carry no photograph: the first is a firm's desk on paper, the second a single sheet on the quietest
ground on the page, and nothing competes with either (Hal, Tomás).

**Between 1024 and 1279 px** (small laptops) the seven picture columns are too narrow for a 1:1
picture. The hero keeps its arrangement with a fluid desk (9.1); Firms, Requests and the proof stack
as on tablet, words first across c1–c8 and then the picture across the content width, still at 1:1.
The zigzag returns at 1280.

**What moves.** Every picture plays once, the first time 40% of it is in view, then rests (D2). In
this half: the desk sets under its own name (2.2 s, on load), the signature moment in Firms (4.2 s,
then the wipe handle), the text becoming a draft in Requests (3.4 s), and the proof being laid
down (about 2 s). Words, prices and buttons never move. Every moving picture has a 24 px replay control
at the right end of its caption row: Graphite, Plate Ink on hover, a 48 × 48 px hit area, accessible
name `[copy needed]` (D7); it appears once the picture has played, and not at all with reduced
motion.

**Brass on the page.** One Brass button per screen (4.8). In this half that is the hero's "Run a
free rehearsal"; once it scrolls away, the header's button turns Brass (desktop) or the sticky bar
rises (phone). The only other Brass in this half is line work: the kicker's lead rule, the list
lozenges, link underlines, the wipe handle's rule and grip outline in Firms, and the phrase
underlines, leaders and tint in Requests. Brass never appears on any firm's sheet except the
Requests picture's "from the text" tags and tint, which the foundation assigns (4.2).

**Section anchors** keep the code's ids: `#top` (the main element), `#firms`, `#requests`, `#proof`,
`#after`, `#coverage`, `#rehearsals`, `#pricing`. Every anchor target gets `scroll-margin-top: 84px`
(the compact 60 px header plus 24 px), so a jump never tucks a headline under the header.

**Every picture** is a `figure` whose accessible name is the stand-in's existing `aria-label`
("An example firm's filing desk", "The same client page under two example firms", "A client's text
drafted into a New Jersey LLC formation", "A sample proof for an example business") and whose label
is its `figcaption`, 14/20 Graphite (`caption`), 12 px under the picture's lower-left corner (D1,
D5). Product pictures are live HTML at 1:1, so a screen reader reads their real text; the product's
own chrome inside them (desk tabs, pictures of buttons) is `aria-hidden` so it isn't read as page
navigation.

---

### 9.0 Beta banner and header

#### The beta notice

**Copy** (`BetaBanner.tsx`, CoFile's own pages): "Beta" · "CoFile is in beta. Any filing can run as a
free rehearsal on the state's real website. It stops before the last button, so nothing is filed or
paid. Filing types go live one at a time. Questions or problems? hello@cofile.app"

It is a slip at the head of the sheet, not an alarm (Hal): the quietest band on the page, above the
header, scrolling away with the page. It is not sticky and, on the home page, not dismissible (the
owner's decision; the product has no close button).

```
DESKTOP 1440                                                                      height 70
┌──────────────────────────────── Cotton 2 #F3F0E8, full bleed ─────────────────────────────────┐
│  x=120                                                                                x=1320  │ 12
│  ┌╌╌╌╌╌╌╌╌╌┐                                                                                  │
│  ╎ ♁ Beta  ╎  CoFile is in beta. Any filing can run as a free rehearsal on the state's real    │ 15/23
│  └╌╌╌╌╌╌╌╌╌┘  website. It stops before the last button, so nothing is filed or paid. Filing    │ Graphite
│               types go live one at a time. Questions or problems? hello@cofile.app            │
│                                                                                               │ 12
└───────────────────────────────────────────────────────────────────────────────────── 1px Rule ┘
  ♁ = the ghost-light glyph (4.4)   ╎╌╎ = the rehearsal chip's dashed edge
  (drawn on three lines to fit here; at 1440 and 1280 the sentence sets in two)

PHONE 390                                         height about 140
┌──────────────────────────────────────┐
│ ┌╌╌╌╌╌╌╌╌╌┐                          │ 12
│ ╎ ♁ Beta  ╎                          │ chip on its own line
│ └╌╌╌╌╌╌╌╌╌┘                          │ 8
│ CoFile is in beta. Any filing can    │ 15/23 Graphite
│ run as a free rehearsal on the       │ four to five lines
│ state's real website. It stops       │
│ before the last button, so nothing   │
│ is filed or paid. Filing types go    │
│ live one at a time. Questions or     │
│ problems? hello@cofile.app           │
│                                      │ 12
└──────────────────────────── 1px Rule ┘
```

- **Band:** Cotton 2 `#F3F0E8`, full bleed, with a 1 px Rule `#DDD7CB` bottom edge. Padding 12 px
  top and bottom; content on the 1200 px column, flush left (centred running text is reserved for
  ceremonial pieces, 5.4). Two lines at 1440 and 1280, three at 1024; about 70 px tall on desktop.
- **The chip:** "Beta" in the rehearsal style, because beta and rehearsal are the same promise (Hal,
  Marcus): 26 px tall, Sheet fill, a 1.5 px dashed Plate Ink border (dash 4, gap 3), `--chamfer-s`
  corners, 10 px side padding; the 14 px ghost-light glyph in Plate Ink, 6 px gap, then "Beta" in
  `chip` 14/18 Founders Grotesk Text Medium, Plate Ink. On desktop it sits inline at the start of
  the first line, its text baseline on the sentence's baseline, and the second line hangs from the
  sentence's first letter (a hanging indent, 12 px after the chip). On phones it takes its own
  line, 8 px above the text.
- **The sentence:** `small` 15/23 Founders Grotesk Text, Graphite `#555867` (6.2:1 on Cotton 2),
  `text-wrap: pretty`. The email is a link in Plate Ink with the CoFile link underline (1 px Brass
  Line `#A87A1E`, 3 px offset; 2 px Plate Ink on hover) and a 48 px tall hit area on phones (the
  line's own height plus 12 px padding above and below, so it never crowds the line before it).
- **Semantics:** `role="note"`, as the code has it. Never read twice: the "Beta" chip is real text.
- **Phone:** about 140 px (four to five lines plus the chip), above the 64 px header; it scrolls
  away so the first screen soon belongs to the hero. It never collapses, so no disclosure control
  and no new words are needed.
- **On the pages behind the home page** it is identical. **On a firm's and a client's pages** the
  code's other wording ("This service is in beta. Any filing can run as a rehearsal on the state's
  real website. It stops before the last button, so nothing is filed or paid. Filing types go live
  one at a time.") sits in the same slip on `--firm-wash` instead of Cotton 2, with no CoFile name
  and no email; the dashed chip works on any firm's page because it carries no Brass and no hue
  (4.4). Not shown in the embed widget, as the code has it.
- **Dark mode:** Night 2 `#1A1D27`, 1 px `#323646` bottom edge, text `#A9ABB5`, chip border and
  glyph in Night Ink `#ECE8DF` on a transparent fill, the email underline in Brass `#D9A84A`.

#### The header

**Copy** (`Shell.tsx`): the lockup (accessible name "CoFile home", from the code), "How it works",
"For firms", "What we file", "Pricing", "For platforms", "Log in", "Run a free rehearsal".

```
DESKTOP 1440, at the top of the page                                                height 76
┌───────────────────────────────────────────────────────────────────────────────────────────────┐
│ x=120        x=324                                                       ‹Log in›     x=1320   │
│ [⌂Co] CoFile  How it works   For firms   What we file   Pricing   For platforms   Log in  ┌──────────────────────┐ │
│                                                                                    │ Run a free rehearsal │ │ 44
│  lockup 28    nav 17/24 Plate Ink, 32 apart                              32  ←32→  └──────────────────────┘ │
└───────────────────────────────────────────────────────────────────────────────────────────────┘
  no bottom edge until the page scrolls · CTA is an outline button while the hero's button is in view

DESKTOP, after 120 px of scroll                                                     height 60
┌───────────────────────────────────────────────────────────────────────────────────────────────┐
│ [⌂Co] CoFile  How it works   For firms   What we file   Pricing   For platforms   Log in  [▓ Run a free rehearsal ▓] │
└──────────────────────────────────────────────────────────────────────────────────── 1px Rule ┘
  CTA turns Brass once the hero's button has scrolled away (200 ms crossfade)

640–1100 px                                                                         height 72
┌──────────────────────────────────────────────────────────────┐
│ [⌂Co] CoFile                      Log in  [ Run a free rehearsal ]  ≡ Menu │
└──────────────────────────────────────────────────────────────┘

PHONE 390                                         height 64
┌──────────────────────────────────────┐
│ [⌂Co] CoFile          Log in   ≡ Menu │   lockup 24 · "Log in" · menu button 48 × 48+
└──────────────────────────────────────┘
  [⌂Co] = the Name Plate, then the wordmark (3.3)
```

- **Bar:** Cotton `#FBFAF6`, sticky to the top of the viewport (the beta notice scrolls away above
  it). 76 px tall on desktop at the top of the page; after 120 px of scroll it compacts to 60 px
  (height, lockup and button scale together, 200 ms `--ease-settle`) and a 1 px Rule bottom edge
  fades in (200 ms). No blur, no transparency, no shadow (6.4).
- **Lockup:** the horizontal lockup (3.3), 28 px tall on desktop (24 px in the compact bar and on
  phones): the Name Plate, then the wordmark in Plate Ink with its lozenge in Brass Line. It links
  home. Clear space one cap height.
- **Navigation:** "How it works", "For firms", "What we file", "Pricing", "For platforms" in `nav`
  17/24 Founders Grotesk Text 400, Plate Ink, 32 px apart, starting at c3 (x = 324). These are
  navigation, not links in running text, so they carry no underline at rest: hover draws a 1 px
  Plate Ink underline 6 px below the baseline (120 ms); the current page carries a 2 px Brass Line
  underline at the same offset. On the home page no link is current.
- **"Log in":** the same `nav` style, 32 px before the button, with the same hover underline.
- **"Run a free rehearsal":** a 44 px button, `button-s` 16/20 Founders Grotesk Text Medium, 20 px
  side padding, `--chamfer` corners. While any part of the hero's own "Run a free rehearsal" is on
  screen it is an **outline** button (1 px Plate Ink edge, Plate Ink text, transparent fill; hover
  fills Cotton 2); once the hero's button has left the viewport it crossfades to **Brass** (fill
  `#D9A84A`, Plate Ink text, hover Brass Deep `#C99A3F`) over 200 ms, and back if the reader scrolls
  up to the hero (4.8). It presses like a key into paper (D2).
- **640 to 1100 px:** the five links move into the menu; the lockup, "Log in", the button and the
  menu button stay.
- **Phone (under 640 px):** 64 px; lockup at 24 px; "Log in" as a text link; a menu button with
  three 1.5 px Plate Ink lines 18 px wide and the word `[copy needed: "Menu"]` (D7) after them in
  `button-s`, because many older readers don't read the three-line icon as a menu (Rosa); hit area
  at least 48 × 48 px. The phone header carries no "Run a free rehearsal": the sticky bar does
  (below).
- **The menu sheet:** a full-height Cotton sheet that drops from under the header (opacity 0 → 1
  and translateY −12 → 0 px, 240 ms `--ease-settle`; closing 160 ms `--ease-exit`), with the header
  staying on top. Inside, 20 px margins: the five links in Miller Text 24/32 Plate Ink, each in a
  64 px row with a 1 px Rule under it; 32 px; "Log in" in `button-l` 18/24 Medium as a text link;
  16 px; "Run a free rehearsal" full width, 56 px, Brass; 24 px; the support email,
  hello@cofile.app, in `small` 15/23 as a link. The sticky bar is hidden while the sheet is open,
  so only one Brass button shows. Focus moves to the first link and is held inside the sheet;
  Escape or the menu button closes it and returns focus to the button. The sheet has an accessible
  name `[copy needed]` (D7), and the menu button's word changes while the sheet is open
  `[copy needed: the menu button's word while the sheet is open, e.g. "Close"]`. The page behind
  doesn't scroll while it is open.
- **The sticky phone bar** (6.7): once the hero's "Run a free rehearsal" has scrolled out of view,
  a 64 px bar plus `env(safe-area-inset-bottom)` slides up from the bottom (translateY 100% → 0,
  240 ms `--ease-settle`): Cotton, a 1 px Rule top line, and "Run a free rehearsal" full width,
  56 px, Brass, with 20 px side margins. It slides away (160 ms `--ease-exit`) while the Close's
  button is on screen, while the menu is open and whenever a field has focus.
- **Focus:** every link and button takes the focus ring (a 2 px Plate Ink outline offset 2 px from a
  2 px white ring), instantly, never animated (D5). A "Skip to content" link is the first focusable
  element `[copy needed: the skip link's words]`.
- **Dark mode:** Night bar; nav and "Log in" in Night Ink; the plate and the wordmark's lozenge in
  Brass; the outline button's edge and text in Night Ink; the Brass button keeps its fill with
  Night `#14161E` text (8.3:1). The bottom edge in `#323646`.
- **Reduced motion:** the compact change and the button's crossfade are instant; the menu sheet
  appears without the drop; the sticky bar appears without sliding.
- **Without JavaScript:** the header stays 76 px; the button stays an outline button (so the hero's
  Brass button is still the only Brass one in the first screen); the menu works as a `details`
  disclosure; there is no sticky bar.
- **Spanish:** the five links run about 20% longer; the breakpoint at which they move into the menu
  is set by measurement (when the nav no longer fits with 32 px gaps), not by a fixed width.

---
### 9.1 Hero

**Copy, in order** (`page.tsx`):

- Kicker: "For CPA, payroll, fractional CFO and title firms"
- h1: "Your client needs an LLC. Say yes, under your own name."
- Sub: "CoFile files your clients' formations, EINs and payroll registrations on the official state and
  IRS websites, once you approve."
- Buttons: "Run a free rehearsal" (to `/signup`) · "See pricing" (to `/pricing`)
- Note: "Built and run by filing professionals. When a filing needs a person, one of them takes over."
- Picture label: "Example · test details · not a real firm"

**The idea.** The headline promises "under your own name", and the picture keeps the promise on the
spot: the first product a visitor sees is a firm's own filing desk, in that firm's logo, color and
font, with one client's job waiting for the firm at the top (all ten). The largest company name in
the first screen is Harbor & Pine CPA's, not ours (Marcus); CoFile is the 13 px imprint at the
right end of the desk's letterhead row. The headline gets the whole width, so it reads in one
glance like a sign over a door (Elaine, Marcus); the desk lies under it like the first sheet in a
sample book, with the proof for Two Sisters Bakery tucked behind it (Hal).

#### Desktop layout (1440)

```
x: 120                          504    630                                          1270   1320  1440
┌──────────────────────────────────────────────────────────────────────────────────────────────────┐
│ beta notice, 70                                                                                  │
├──────────────────────────────────────────────────────────────────────────────────────────────────┤
│ header, 76                                                                                       │
├──────────────────────────────────────────────────────────────────────────────────────────────────┤
│                                              64                                                  │
│ ── For CPA, payroll, fractional CFO and title firms             kicker 16/22 Graphite            │
│                                              16                                                  │
│ Your client needs an LLC.                                       display-xl 72/76, Plate Ink      │
│ Say yes, under your own name.                                   full content width, c1–c12       │
│                                              48                                                  │
│ CoFile files your clients'      ┌─────────────────── desk sheet 640 × 572 ───────────────────┐┐  │
│ formations, EINs and payroll    │ [▲] Harbor & Pine CPA │ Filing desk            with CoFile ││  │
│ registrations on the official   │ ══════════════════════════════════════════════════════════ ││ ← proof
│ state and IRS websites, once    │ ────────────────────────────────────────────────────────── ││   behind,
│ you approve.        lede 22/34  │ Filings   New filing   Ready to pay   Client links         ││   0.6,
│                                 │ ‾‾‾‾‾‾‾                                                    ││   72→88
│                     48          │ Client filings                              [ New filing ] ││   px out
│ [▓ Run a free rehearsal ▓]  See pricing →                                                    ││
│        56, Brass        24      │ ────────────────────────────────────────────────────────── ││
│                     32          │▌Two Sisters Bakery LLC             ◆ Proof ready to approve › │
│ ▣ ▣ ▣  48 px portraits          │▌New Jersey LLC formation                                   ││
│                     12          │ ────────────────────────────────────────────────────────── ││
│ Built and run by filing         │ Hudson Ledger LLC                                  ● Filed ││
│ professionals. When a filing    │ New York LLC formation                                     ││
│ needs a person, one of them     │ ────────────────────────────────────────────────────────── ││
│ takes over.        body 18/29   │ Hudson Ledger LLC                ● Filed, IRS letter saved ││
│                                 │ EIN                                                        ││
│                                 │ ────────────────────────────────────────────────────────── ││
│                                 │ Orchard Lane Inc.                              ○ Submitted ││
│                                 │ Payroll registration (NJ-REG)                              ││
│                                 └────────────────────────────────────────────────────────────┘┘
│                                 Example · test details · not a real firm                  ⟲  │
│                                              160                                                 │
└──────────────────────────────────────────────────────────────────────────────────────────────────┘
  [▲] Harbor & Pine's square symbol (a pine over two short waves), 44 px   ◆ your turn   ● done
  ○ in hand   ▌ the 3 px Harbor bar on the waiting row   ⟲ the replay control
```

- **Kicker:** `kicker` 16/22 Founders Grotesk Medium, Graphite, +0.5%, sentence case, led by a
  24 × 1.5 px Brass Line rule at x-height with 12 px after it. 64 px below the header; 16 px to the
  h1. It may wrap to two lines (Spanish), the second line hanging from the first letter.
- **h1:** `display-xl` 72/76 Miller Display 400, −1%, Plate Ink, across c1–c12, one sentence per line
  ("Your client needs an LLC." / "Say yes, under your own name."), each sentence a block-level span
  inside the one `h1`. The longer line is about 940 px at 72 px, so both fit the 1200 px column with
  room. No word is re-weighted, recolored or highlighted.
- **Below the h1, 48 px down,** the band splits: words in c1–c4 (x 120–504), the desk sheet from c6
  (x 630). The words column is **top-aligned** with the desk sheet (the sub's first cap height on
  the sheet's top edge), the one band where the words don't centre on their picture, so the buttons
  stay in the first screen on a 1366 × 768 laptop (they end about 690 px down). Height of the
  words: about 420 px against the desk's 572.
- **Sub:** `lede` 22/34 Miller Text 400, Plate Ink, `text-wrap: pretty`, four lines in the 384 px
  column.
- **Buttons, 48 px below the sub:** "Run a free rehearsal" is the primary: 56 px, Brass `#D9A84A`
  fill, Plate Ink `button-l` 18/24 Founders Grotesk Medium +0.2%, 24 px side padding, `--chamfer`
  corners; hover Brass Deep `#C99A3F` (120 ms); press 80 ms down 1 px with a 1 px inset shadow,
  160 ms release (D2). "See pricing" is a **text link** (decisions file), not a second button, so
  the Brass button stands alone: `button-l` 18/24 Founders Grotesk Medium, Plate Ink, underlined
  1 px in Brass Line at a 3 px offset (2 px Plate Ink on hover), with a 16 px arrow (1.5 px stroke,
  Plate Ink) 8 px after it that moves 3 px right on hover (120 ms); its hit area is 56 px tall,
  centred on the button's line, 24 px to its right. When the row doesn't fit the column (under about
  1260 px wide, and in Spanish) the link wraps under the button, left-aligned, 8 px below, with a
  48 px hit area.
- **The note, with the people behind it:** 32 px below the buttons, up to three portraits of CoFile's
  real filing professionals (C10, tight crops), 48 × 48 px each, square-cut, 8 px apart, no border,
  no circle, no ring; 12 px below them the note in `body` 18/29 Founders Grotesk Text, Plate Ink
  (it is a selling line, not a footnote), three lines. Each portrait's `alt` gives the person's name
  and role `[copy needed]` (D7); no name is printed, because the copy is locked (decisions file).
  Only people who have agreed appear: with one or two, show those; with none, the note stands alone
  and nothing takes the portraits' place (all ten).

#### The picture: "The desk under its own name" (replaces `DeskVisual`)

**What it shows.** Harbor & Pine CPA's filing desk as the firm sees it every morning, the real
desk component rendered live with the example data (D4), at 1:1: the firm's letterhead row with its
logo, name and the small "with CoFile", the Firm Rule, the desk's tabs, "Client filings" with the
"New filing" button, and four of the firm's clients' filings. One is waiting for the firm: Two
Sisters Bakery LLC, "Proof ready to approve". Tucked behind the desk is that filing's proof, the
sheet section 4 shows in full (Hal).

**The desk sheet**, 640 × 572 px, Sheet `#FFFFFF`, `--r-sheet` 2 px corners, `--e-sheet`, at x
630–1270, leaving 50 px to the grid's edge for the proof behind. Horizontal padding 32 px. Top to
bottom:

| Part | Height | Specification |
|---|---|---|
| **Letterhead row** | 76 | Left-aligned working letterhead (3.5). The square symbol at 44 × 44 (the desk row's area rule, 3.5), in Harbor `#1D4E63`; 12 px; "Harbor *&* Pine CPA" in Lora 600 20/26, Plate Ink, the "&" in Lora Italic 600, "CPA" by the credentials rule (3.5: the font's real small capitals if the served Lora has them, otherwise 88% size with +0.04 em tracking); 16 px; a 1 px Rule hairline 20 px tall; 16 px; "Filing desk" in `small` 15/23 Graphite (the stand-in's label). At the right end, 32 px from the sheet's edge and vertically centred on the logo, **the Imprint**: "with CoFile" at 13/16 (3.4), Graphite, plain text here (it is a picture), present from the first frame and never animated |
| **Firm Rule** | 6 | Full sheet width, the window's width on the real desk (3.5): 3 px Harbor, 2 px gap, 1 px Pine `#2B5A47` |
| **Tabs** | 52 | "Filings", "New filing", "Ready to pay", "Client links" (the product's own first four tabs, Marcus) in Founders Grotesk Text 16/22, Plate Ink, 24 px apart, vertically centred; "Filings" in Medium with a 2 px `--firm-2` (Pine) underline along the row's bottom edge, the width of the word. `aria-hidden`: they are a picture of the desk's navigation, not the page's |
| Space | 32 | — |
| **Head row** | 44 | "Client filings" in `page-title` 32/38 Lora 600, Plate Ink, left (a styled paragraph, not a heading, so the page's outline isn't interrupted). "New filing" at right: a 44 px button, Founders Grotesk Text Medium 16/20, white on `--firm-fill` Harbor, 20 px side padding, `--chamfer` corners; a picture of a button, `aria-hidden`, not focusable |
| Space, rule | 24 + 1 | A 1 px Rule across the content width |
| **Four rows** | 4 × 76, 1 px Rule between | Business name in Founders Grotesk Text Medium 17/24, Plate Ink, over the filing in 15/22 Graphite; the status chip right-aligned, vertically centred. A `ul`, each row an `li` |

The chips (4.3), `chip` 14/18 Founders Grotesk Text Medium, 28 px tall, 10 px side padding, a 12 px
glyph and 6 px gap, `--chamfer` corners:

| Row | Business / filing | Chip | Tone |
|---|---|---|---|
| 1 | Two Sisters Bakery LLC / New Jersey LLC formation | "Proof ready to approve" | **Your turn:** Pine `#2B5A47` text (`--firm-ink`, 7.9:1), Sheet fill, 1 px Pine border, a ◆ lozenge in Harbor. The firm's next step in the firm's own color: an invitation, not a warning |
| 2 | Hudson Ledger LLC / New York LLC formation | "Filed" | **Done:** white on Verdigris `#2E6B57`, filled circle ● in white |
| 3 | Hudson Ledger LLC / EIN | "Filed, IRS letter saved" | Done |
| 4 | Orchard Lane Inc. / Payroll registration (NJ-REG) | "Submitted" | **In hand:** Iron `#3F434F` text, Sheet fill, 1 px Iron border, ring ○ |

Done is a solid fill and Your turn an outline, so "Filed" and "Proof ready to approve" are told
apart by shape as well as hue (4.3, Priya).

**The waiting row** is the one row that wants the firm, so it is the one row that is live (Marcus):

- At rest: a 3 px Harbor bar on the sheet's left edge for the row's full height (Elaine, Priya), and
  a 16 px chevron (1.5 px stroke, Graphite) 12 px after its chip.
- The whole row is a real link, `<a href="#proof">`, to section 4, where this filing's proof is laid
  out in full. Its accessible name is the row's own text; a visually hidden description tells a
  screen reader where it goes `[copy needed: a short hint that the link goes to the sample proof
  below]`.
- Hover: the row fills `--firm-row` `#EBF7FE` and the chevron moves 2 px right (120 ms); the cursor
  is a pointer. The other three rows are not interactive and have no hover state: a picture of a
  page should only look clickable where it is.
- Focus: the firm's focus ring inside the sheet (a 2 px Pine outline, offset 2 px from a 2 px white
  ring, inset so it isn't clipped by the sheet's edge).
- Press: the row debosses 1 px (80 ms), then the page scrolls to `#proof` with the browser's smooth
  scroll (the visitor asked for it; with reduced motion it jumps).

**The proof behind** (Hal): the sample proof for Two Sisters Bakery LLC (9.4), the same live
component, drawn at 0.6 of its true size (384 × 535 px), its top 16 px below the desk's top and its
foot 21 px above the desk's foot, so it sits wholly behind the desk and only a strip shows: at rest
its right edge stands **88 px** past the desk's right edge (72 px before the motion), running
into the page margin (x up to 1358 at 1440; clipped by the viewport below 1280). The strip shows the
right ends of its Firm Rule, of its "Ready to approve" chip, its fee amounts and double rule, and
the end of its Harbor "Approve for filing" button: enough to read as the proof under the desk, and
to send the eye to section 4. It is reduced because only its edge is ever seen and it must not hang
below the desk into the caption; it is decorative (`aria-hidden`, `inert`, no pointer events), and
its own small type is hidden behind the desk. Shadow `--e-sheet`; it is shown at 1280 px and wider
only.

**Label:** "Example · test details · not a real firm", `caption` 14/20 Graphite, 12 px under the desk
sheet's lower-left corner; the replay control at the right end of the same row, under the desk's
right edge.

**Fonts.** The picture sets Harbor & Pine's name and titles in Lora 600 (and the "&" in Lora Italic
600), so the home page preloads the Lora 600 Latin subset (about 25 KB) beside Miller Display and
Founders Grotesk Text. If Lora isn't ready when the name is due to ink, the ink waits up to 400 ms,
then proceeds in the size-adjusted fallback (3.7); nothing reflows when Lora arrives.

#### Motion: "The desk under its own name" (D3, Hal M1), 2.2 s

Plays once on load on desktop and tablet (the desk is in the first screen); on phones, the first
time 40% of the desk is in view. A tiny inline script in the `head` sets the starting state before
first paint when motion is allowed, so nothing flashes; without it, the desk is simply complete.

| t (ms) | Beat |
|---|---|
| 0 | First paint. The desk sheet is already in place at full size with `--e-lift` (raised 2 px), so the layout never jumps. On it, only the Imprint "with CoFile" is visible (it never animates: ours was always there, in small type). The proof behind stands 72 px out |
| 0–600 | **The Firm Rule draws** left to right (`scaleX` from the left edge, `--t-draw` 600 ms, `--ease-sweep`): the 3 px Harbor line, then the 1 px Pine line 120 ms behind it (120–720) |
| 150–850 | **The name inks in**: the symbol, "Harbor & Pine CPA" and "Filing desk" are revealed behind a left-to-right mask (`clip-path`, 700 ms, `--ease-sweep`), like a burin pass |
| 500–940 | The tabs ink (`--t-ink` 260 ms fade); "Client filings" and the "New filing" button `press-in` (edge 180 ms, then ink 260 ms) |
| 900–1490 | **The four rows set** top to bottom, `--t-set` 320 ms each, 90 ms apart (900, 990, 1080, 1170): opacity 0 → 1, rising 2 px. Rows 2 to 4 arrive with their chips; row 1 arrives with its Harbor bar and **without** its chip |
| 1600–2040 | **"Proof ready to approve" presses in last**: its edge comes up (scale .96 → 1, `--t-press` 180 ms, `--ease-press`), then its ink (260 ms, `--ease-settle`); the chevron fades in with the ink |
| 1600–2200 | As it does, the proof behind slides 16 px further out to the right (600 ms, `--ease-settle`), and the desk settles from `--e-lift` to `--e-sheet` (translateY −2 → 0, the shadows crossfading, 600 ms): the eye ends on the waiting row and the sheet behind it |
| 2200 | Rest. The replay control fades in (200 ms) |

Only `transform`, `opacity` and `clip-path` on composited layers animate. The replay control plays
the same sequence from the 0 ms frame.

#### Phone layout (390)

```
┌──────────────────────────────────────┐
│ beta notice, about 140               │
├──────────────────────────────────────┤
│ [⌂Co] CoFile          Log in   ≡ Menu │ 64
├──────────────────────────────────────┤
│                                      │ 32
│ ── For CPA, payroll, fractional CFO  │ kicker 15/22, two lines
│    and title firms                   │
│                                      │ 12
│ Your client needs                    │ display-xl 42/46
│ an LLC.                              │ each sentence its own block,
│ Say yes, under                       │ balanced, never a widow
│ your own name.                       │
│                                      │ 16
│ CoFile files your clients'           │ lede 19/30, four lines
│ formations, EINs and payroll         │
│ registrations on the official state  │
│ and IRS websites, once you approve.  │
│                                      │ 32
│ [▓▓▓▓▓ Run a free rehearsal ▓▓▓▓▓▓▓] │ 56, full width, Brass
│ See pricing →                        │ 48 hit area, left-aligned
│                                      │ 24
│ ▣ ▣ ▣                                │ 48 px portraits
│ Built and run by filing              │ body 17/27
│ professionals. When a filing needs a │
│ person, one of them takes over.      │
│                                      │ 40
│ ┌──────────────────────────────────┐ │ desk sheet 350, its phone layout
│ │ [▲] Harbor & Pine CPA  with CoFile│ │ 64: name 17/22, Imprint at right
│ │     Filing desk                   │ │ "Filing desk" 14/20 under the name
│ │ ══════════════════════════════════│ │ Firm Rule
│ │ Client filings                    │ │ 28/34 Lora 600
│ │ [ New filing ]                    │ │ 44, natural width
│ │ ──────────────────────────────────│ │
│ │▌Two Sisters Bakery LLC          › │ │ rows stack: name, filing,
│ │▌New Jersey LLC formation          │ │ then the chip, 8 px below
│ │▌◆ Proof ready to approve          │ │
│ │ ──────────────────────────────────│ │
│ │ Hudson Ledger LLC                 │ │
│ │ New York LLC formation            │ │
│ │ ● Filed                           │ │
│ │ … two more rows …                 │ │
│ └──────────────────────────────────┘ │
│ Example · test details · not a real  │ caption 14/20
│ firm                              ⟲  │
│                                      │ 80
└──────────────────────────────────────┘
```

- The promise and the action come first (6.6): at 390 × 844 the h1, sub, "Run a free rehearsal" and
  "See pricing" all sit in the first screen (they end about 810 px down, below a four- to five-line
  beta notice).
- **h1** at 42/46, four lines, each sentence a block, `text-wrap: balance`. **Sub** `lede` 19/30.
  **Button** full width, 56 px. **"See pricing"** under it, left-aligned, 8 px below, 48 px hit area.
  **Note** `body` 17/27, three lines, under the portraits.
- **The desk** is its real phone layout, 350 px wide with the page's 20 px margins and its shadow
  (it is a picture, not the page): the letterhead row at 64 px (the symbol at 40 px, the name at
  17/22, "Filing desk" in 14/20 Graphite on a second line under it, the Imprint at the row's right
  end; if a longer name were ever shown, the Imprint drops to its own 28 px row, 3.4); the Firm Rule;
  20 px padding; no tab row (the phone desk keeps its navigation behind its own menu, which the
  picture leaves out); "Client filings" at 28/34; "New filing" under it at its natural width; four
  rows of about 114 px, each stacking the name, the filing and then the chip 8 px below. The waiting
  row keeps its Harbor bar, chevron and link. No proof behind.
- About 680 px tall. The sticky bar rises once the hero's button has scrolled away (9.0).

#### Tablet (834)

Words in c1–c6 (the kicker, the h1 at about 56/60 across c1–c8 with one sentence per line where it
fits, the sub, the buttons on one row, the portraits and note); 48 px; the desk sheet across c1–c8
(754 px), reflowing to that width. The proof behind is left out. The motion plays on load if the
desk is 40% in view in the first screen, otherwise when it is.

#### Between 1024 and 1279 px

The words keep c1–c4; the desk is live and fluid, so it takes the width from c6 to 24 px short of
the viewport's edge (about 556 px at 1024) and reflows; its Imprint always shows. The proof behind
appears from 1280 px.

#### States

| State | What the reader sees |
|---|---|
| **Default markup** (no JavaScript, and the first frame for crawlers) | The complete desk at rest: every row and chip, the proof behind 88 px out, `--e-sheet`. The waiting row still links to `#proof` |
| Playing | The 2.2 s sequence above; the waiting row is a working link throughout |
| Rest | Complete; the replay control shows |
| Waiting row hover / focus / press | As above: `--firm-row` fill and chevron nudge; the Pine focus ring; a 1 px deboss, then the scroll to the proof |
| **Reduced motion** | Complete at once, no replay control; the jump to `#proof` is instant |
| **Dark mode** | The band is Night `#14161E`; the kicker, h1, sub and note in Night Ink `#ECE8DF` (the kicker in `#A9ABB5`); the kicker's rule, the link underline and the arrow in Brass; the Brass button unchanged with Night text. The desk and the proof behind stay pure white with `--e-sheet-dark`; every color on them is as in light mode (4.6). The portraits take at most a 4% darkening |
| Portraits missing | The note moves up 60 px into their place; nothing else changes |
| **Spanish** | The kicker wraps to two lines; "See pricing" wraps under the button; the h1's sentences may each take two lines on tablet. The desk's example data stays as it is (it is the firm's English-language desk) |
| Fonts still loading | Metric-matched fallbacks (5.1, 3.7); the Lora ink waits up to 400 ms |

---
### 9.2 Firms: "Your name on the door. Ours in small type."

**Copy, in order** (`page.tsx`, `id="firms"`):

- h2: "Your name on the door. Ours in small type."
- Lede: "Your logo and color on every page your client sees."
- List: "A link for each client" · "A page for every filing you offer" · "A button for your own website" ·
  "Your registered agent, or ours"
- Link: "For firms" (to `/for-firms`)
- Picture label: "Two example firms · same page, each in its own brand"

**The idea.** The headline, made literal and then proved. Two real office doors, two real
hand-engraved plates, two firms that have never met: Harbor & Pine CPA on brass, Northgate Payroll
on steel (Hal). In front of each door, the same client page, each in its own firm's logo, color and
font, its bones on exactly the same pixels, and at the foot of both the same 13 px "with CoFile",
unmoved (all ten). This is the site's signature moment (D3): one page parts into two, each firm's
name lifts off its plate into its page, and our small type arrives last. Then a brass handle lets the
visitor wipe one page into the other firm's brand while nothing else moves a pixel (Hal). The
headline sets its own joke: "Ours in small type." is literally small (Greta, Elaine, Hal).

#### Desktop layout (1440)

The picture takes c1–c7 plus the left margin (x 0–810 at 1440: the photographs may bleed to the
viewport's edge, 6.2); c8 is empty; the words sit in c9–c12, vertically centred on the picture.

```
x: 0                393 417               810         936                          1320
┌──────────────────────────────────────────────────────────────────────────────────────────┐
│                                          128                                              │
│ ┌──── door A ─────┐┊┌──── door B ─────┐                                                   │
│ │ C1, 393 × 491   │┊│ C2, 393 × 491   │                                                   │
│ │  painted harbor-│┊│  glazed alumin- │                                                   │
│ │  blue door edge │┊│  ium door edge  │                                                   │
│ │  ╱‾‾‾‾‾‾‾‾‾‾‾╲  │┊│  ╱‾‾‾‾‾‾‾‾‾‾‾╲  │            Your name on                           │
│ │ (⊖)Harbor &   (⊖)│┊│ (⊖)NORTHGATE  (⊖)│           the door.         display-l 52/56     │
│ │  ╲_Pine CPA__╱  │┊│  ╲_PAYROLL___╱  │                          16                       │
│ │  brass, black-  │┊│  brushed steel, │            Ours in small type.  small-type 18/26  │
│ │  filled         │┊│  black-filled   │                          24                       │
│ │  ┌─ panel A ──────┐ ┊  ┌─ panel B ──────┐        Your logo and color on    lede 22/34    │
│ └──│▒┌──────────┐▒│─┘┊└──│▒┌──────────┐▒│─┘        every page your client                 │
│    │▒│[▲] Harbor &│▒│  ┃  │▒│[⊓ Northgate│▒│         sees.                                 │
│    │▒│    Pine CPA│▒│  ┃  │▒│   Payroll] │▒│                       48                      │
│    │▒│════════════│▒│  ┃  │▒│════════════│▒│        ◆ A link for each client  list 19/28  │
│    │▒│Start your  │▒│  ┃  │▒│Start your  │▒│        ◆ A page for every filing you offer   │
│    │▒│New Jersey  │▒│ ┌┸┐ │▒│New Jersey  │▒│        ◆ A button for your own website       │
│    │▒│LLC  (Lora) │▒│ │⊖│ │▒│LLC (Montse-│▒│        ◆ Your registered agent, or ours      │
│    │▒│Business name▒│ └┰┘ │▒│rrat)       │▒│                       24                      │
│    │▒│[__________]│▒│  ┃  │▒│Business name▒│        For firms →                            │
│    │▒│Who owns it │▒│  ┃  │▒│[__________]│▒│                                               │
│    │▒│[__________]│▒│  ┃  │▒│Who owns it │▒│                                               │
│    │▒│[ Continue ]│▒│  ┃  │▒│[__________]│▒│                                               │
│    │▒│   ────     │▒│  ┃  │▒│[ Continue ]│▒│                                               │
│    │▒│with CoFile │▒│  ┃  │▒│   ────     │▒│                                               │
│    │▒└──────────┘▒│  ┃  │▒│with CoFile │▒│                                               │
│    └──────────────┘     └──────────────┘                                                 │
│ Two example firms · same page, each in its own brand                         ⟲           │
│                                          160                                              │
└──────────────────────────────────────────────────────────────────────────────────────────┘
  ▒ the page under the sheet (--firm-wash)   ┊ the 24 px Cotton gutter between the doors
  ┃ ┌┸┐│⊖│└┰┘ the wipe handle: a 2 px Brass Line rule with a plate-end grip and one level screw
  (the two client pages are identical in every row; the ASCII can't hold them level, the build does)
```

**The doors** (photographs C1 and C2, D1). Two portrait crops, 4:5, each 393 × 491 px at 1440, side
by side with a 24 px Cotton gutter, square-cut, no border, no shadow (a photograph is not a sheet).
Same lens, height and framing in both (C2 matches C1's medium frame), so the two read as a pair of
real firms on two different streets:

- **Door A, Harbor & Pine CPA:** the edge of a deep harbor-blue painted wooden door in a brick
  building, late raking sun from the left; on the wall beside it the brass plate, hand-engraved
  "Harbor & Pine CPA" with the italic ampersand, letters filled black, the two screws' slots level.
- **Door B, Northgate Payroll:** the edge of a glazed aluminium-framed door in a converted mill,
  mid-morning daylight; the brushed-steel plate of the same shape engraved "NORTHGATE PAYROLL" in
  geometric capitals, filled black.
- **The crop** puts each plate square-on, its centre at 50% across and 34% down, about 180 px wide
  on screen, so its engraving is crisp and legible; the lower 48% of each frame is quiet wall or
  door, where the page lies.
- Files: 786 × 982 px (2×) AVIF with WebP and JPEG fallbacks, about 90 KB each; loaded lazily once
  the band is within one screen, on a Cotton 2 box of the same size so nothing shifts. Alt text
  `[copy needed]` (D7). They are never tinted or darkened by more than 4% (dark mode).

**The two client pages.** Over the lower part of each door lies that firm's client page (the
firm's page for a filing, "Start your New Jersey LLC"), the real component in each firm's brand
tokens (4.7), at 1:1, at a phone's width: a **panel** 324 px wide of the page's ground (the firm's
`--firm-wash`, the mill tint under its sheets, 3.5) holding a 300 px white **sheet** inset 12 px on
every side, `--r-sheet`, `--e-sheet`. Each panel is centred under its door, its top at 52% of the
door's height (y 255), so it covers the lower part of the photograph and runs 343 px below it onto
the Cotton. Panel A spans x 35–359, panel B x 452–776; the gap between them, 93 px, holds the wipe
handle on the centre line of the doors' gutter (x 405).

The sheet, 300 × 555 px, 20 px side padding, top to bottom (identical in both brands except where
the table says):

| Part | Size | Harbor & Pine CPA | Northgate Payroll |
|---|---|---|---|
| Head margin | 20 | — | — |
| **Letterhead block** | **48, fixed** | The square symbol 48 × 48 in Harbor; 12 px; "Harbor *&* Pine CPA" in Lora 600 20/26, Plate Ink (the square-logo rule: the name is typeset beside it, 3.5) | The wide wordmark (the gate mark and "Northgate Payroll" in its geometric sans, one color, Ember) at 26 × 169 px by the area rule; no typeset name beside it (the wide-logo rule) |
| Gap, then the **Firm Rule** | 20 + 6 | 3 px Harbor `#1D4E63`, 2 px gap, 1 px Pine `#2B5A47` | 3 px Ember `#C2410C`, 2 px gap, 1 px Ember at 35% `#EABCAA` (no second color) |
| Gap, then the **title** | 24 + 68 | "Start your New Jersey LLC" in Lora 600 28/34, Plate Ink, two lines | The same words in Montserrat 600 28/34 (size-adjusted, 3.7), two lines |
| Gap, **"Business name"** | 24 + 22 + 8 + 52 | `label` 16/22 Founders Grotesk Text Medium, Plate Ink; an empty 52 px field: Sheet, 1 px Rule Strong `#8A8578` border, `--r-sheet` | identical |
| Gap, **"Who owns it"** | 20 + 22 + 8 + 52 | identical | identical |
| Gap, **"Continue"** | 32 + 56 | Full width, 56 px, `--firm-fill` Harbor, white label in Lora 600 18/24 (a preset font on a client page, 3.7), `--chamfer` corners | Ember fill (white 5.2:1), white label in Montserrat 600 18/24 |
| Gap, **the Imprint** | 24 + 1 + 12 + 16 | A 40 px Rule hairline centred, then "with CoFile" centred, 13/16, Graphite (3.4). Not a link: nothing pulls a client away from their firm | identical, on the same pixels |
| Foot margin | 20 | — | — |

The buttons are pictures of buttons (`aria-hidden`, not focusable); the fields are drawn, not real
inputs. Read by a screen reader, each page gives its firm's name, its title and its Imprint.

**How the bones stay on the same pixels** (a build requirement, not a nicety): the letterhead block
has a fixed height of 48 px on phone-width sheets (64 px on desktop sheets) with the logo centred in
it, so the Firm Rule falls at the same y for any logo; the title box is two lines tall in both fonts,
broken after "New" in both (a no-break space joins "Jersey LLC"); the button and every field keep
their boxes whatever the font. A visual-regression test renders both pages, masks the brand layers
(the ground, the letterhead block's contents, the Firm Rule's colors, the title's glyphs, the
button's fill and label) and must find no other pixel changed.

**Label:** "Two example firms · same page, each in its own brand", `caption` 14/20 Graphite, 12 px
under panel A's lower-left corner; the replay control at the right end of the row, under panel B's
right edge.

#### The words

- **h2**, one element, two sentences as block spans: "Your name on the door." in `display-l`
  52/56 Miller Display, Plate Ink, two lines in the 384 px column ("Your name on / the door.",
  `text-wrap: balance`); 16 px below, "Ours in small type." on its own line in `small-type` 18/26
  Miller Text Italic, Graphite, the only place this style is used (5.2). It is never enlarged "for
  balance" (Greta). A screen reader reads the h2 as one sentence pair.
- **Lede**, 24 px below: `lede` 22/34 Miller Text, Plate Ink, two lines.
- **List**, 48 px below: `list` 19/28 Founders Grotesk Text Medium, Plate Ink, one line each; a 7 px
  Brass Line lozenge hung 12 px into the left margin, centred on the first line's x-height (5.4); 16
  px between items. No ticks, no icons.
- **"For firms"**, 24 px below the list: a text link in `button-l` 18/24 Founders Grotesk Medium,
  Plate Ink, a 1 px Brass Line underline at a 3 px offset (2 px Plate Ink on hover), and a 16 px
  arrow 8 px after it that moves 3 px right on hover (120 ms); 48 px hit area.
- The block is about 500 px tall, vertically centred on the picture (its top about 190 px below the
  doors' top edge).

#### Motion: "Two doors, one page", the signature moment (D3; Hal M2 with Dev's and Priya's split), 4.2 s

Plays once, the first time 40% of the picture is in view.

| t (s) | Harbor & Pine CPA (left) | Northgate Payroll (right) |
|---|---|---|
| 0.0 | **At rest:** both door photographs, plates in their soft light. Between them, centred on the gutter (x 243–567) at the panels' final height, **one unbranded page**: its panel in Bond `#F5F5F2` (the page with no firm color), its sheet with an empty letterhead block, a single 1 px Rule line where the Firm Rule goes, the title in Founders Grotesk Medium 28/34, both labels and fields, and "Continue" as a 1 px Rule Strong outline with a Graphite label. No Imprint yet: the page before any firm owns it (Priya) | — |
| 0.2–0.5 | A 1 px Rule hairline draws down the page's middle, top to bottom (300 ms, `--ease-sweep`) (Dev) | — |
| 0.5–1.3 | **The page parts:** two whole copies slide apart, each to its place under its door (800 ms, `--ease-settle`, 208 px each way, the one move on the site longer than 40 px besides the documents in After and the names below). Labels and fields are already where they will stay | (the right copy) |
| 1.1–2.3 | **Light rakes across the brass plate**, left to right (1.2 s, `--t-light`) | 1.4–2.6, the same across the steel plate |
| 1.9–2.7 | **The name lifts off the plate:** a live copy of the engraved name, set exactly over the engraving, fades in as it detaches (200 ms) and rises into the letterhead block (800 ms, `--ease-settle`, about 145 px), scaling from the engraved letters' size to Lora 600 20 px in Plate Ink; the symbol inks in beside it (`--t-ink` 260 ms). The engraving stays on the plate | 2.2–3.0: the engraved capitals lift the same way and crossfade, halfway down, into Northgate's wordmark |
| 2.5–3.1 | **The Firm Rule draws** left to right (`--t-draw` 600 ms): 3 px Harbor, the 1 px Pine 120 ms behind | 2.8–3.4: Ember, and Ember at 35% |
| 2.7–3.4 | **The page inks in Harbor & Pine's brand:** the panel's ground crossfades Bond → `--firm-wash` (320 ms); the title crossfades from Founders Grotesk to Lora (260 ms, same box); "Continue" `press-in`s into Harbor with its white Lora label (440 ms) | 3.0–3.7: Ember wash, Montserrat, Ember button |
| 3.7–4.1 | **"with CoFile" fades in at the foot of both pages at the same moment**: 13 px Graphite, a plain 400 ms opacity fade, no movement, no scale. Ours, last and small (Hal, Rosa, Priya). This is the one place the Imprint appears by a fade (D3); everywhere else it is simply there | the same instant |
| 4.0–4.2 | The wipe handle fades in between the pages (200 ms). Rest; the replay control appears | — |

**The lift's mechanics.** Each name copy is live text (Harbor & Pine) or an SVG (Northgate's
capitals and wordmark), positioned from a small mapping file measured on the photograph (the
engraving's box in the image's coordinates), so it starts exactly on the letters at every width.
It animates `transform` and `opacity` only.

**The raking light** is photographic, not rendered (D1 keeps real-time rendering to the Close's
engraving): a 1.2 s clip of each plate alone, shot on the C1 and C2 lock-offs with a moving reflector
(Hal), cropped to the plate (about 360 × 180 px at 2×), muted, `playsinline`, no controls, AV1 with
an H.264 fallback, under 150 KB each, its first and last frames identical to the still. It is
composited over the door photograph so only the plate's light moves. If it can't play (Low Power
Mode, Save-Data, a slow connection), the plate stays as photographed and the rest of the moment
plays on its timing. The two clips are on C1's and C2's shot lists (7).

#### The wipe handle (Hal), after the moment

```
        ┃              a 2 px Brass Line #A87A1E rule, the full height of the panels,
        ┃              on the doors' gutter and the gap between the pages
      ┌─┸─┐
      │   │            the grip: 28 × 56 px, the end of a name plate (--chamfer corners),
      │ ⊖ │            Sheet fill, 1.5 px Brass Line outline, one 8 px screw
      │   │            (1 px Plate Ink circle, a 4 px slot, level)
      └─┰─┘            hit area 48 × 80 px, centred on the panels' vertical middle
        ┃
```

- **Drag it left** across Harbor & Pine's page and the part of that page to the right of the handle
  re-inks into Northgate Payroll's brand; **drag it right** across Northgate's page and the part to
  its left re-inks into Harbor & Pine's. What changes under the wipe: the page's ground, the
  letterhead block's contents, the Firm Rule's colors, the title's typeface, the button's fill and
  label face. **What doesn't move a pixel:** the labels, the fields, the title's box and line breaks,
  the button's box, the hairline and "with CoFile". Built as a second, other-brand copy of each page
  stacked exactly over it and revealed with `clip-path: inset()` that follows the handle.
- **Release** and it springs back to the centre (400 ms, `--ease-settle`).
- **Pointer:** `ew-resize` over the grip, `grabbing` while dragging; hover turns the grip's outline
  and screw Plate Ink (120 ms). The handle follows the pointer one to one and stops at the outer
  edges of the two pages.
- **Keyboard:** it is a focusable `role="slider"` (−100 to 100, 0 at rest) with an accessible name
  `[copy needed]` (D7) and a spoken value `[copy needed: aria-valuetext saying how much of which
  page shows the other firm's brand]`. Left and Right arrows move it 10% of a page per press, Home
  and End jump to either end, Escape returns it to the centre; when focus leaves, it springs back.
  Focus ring: the 2 px Plate Ink ring around the grip.
- It appears when the moment has played (or at once with reduced motion); without JavaScript it is
  not rendered. Not on phones (the swipe does the comparison there).

#### Phone layout (390)

```
┌──────────────────────────────────────┐
│ Your name on                         │ display-l 34/38
│ the door.                            │
│                                      │ 12
│ Ours in small type.                  │ small-type 16/22, italic, Graphite
│                                      │ 16
│ Your logo and color on every page    │ lede 19/30
│ your client sees.                    │
│                                      │ 32
│ ◆ A link for each client             │ list 18/26, 14 px apart
│ ◆ A page for every filing you offer  │
│ ◆ A button for your own website      │
│ ◆ Your registered agent, or ours     │
│                                      │ 24
│ For firms →                          │
│                                      │ 40
│ ┌─── card 1, 310 ───────────┐ ┌──── │ the second card's edge shows
│ │ C1, 1:1, 310 × 310        │ │ C2  │ 44 px at the screen's right
│ │      ╱‾‾‾‾‾‾‾‾‾‾╲         │ │ ╱‾‾ │
│ │     (⊖)Harbor &  (⊖)      │ │(⊖)N │
│ │      ╲_Pine CPA_╱         │ │ ╲__ │
│ │ ┌─ panel 310 ──────────┐  │ │ ┌── │
│ └─│▒┌──────────────────┐▒│──┘ └─│▒┌ │
│   │▒│[▲] Harbor & Pine  │▒│       │▒│ │
│   │▒│    CPA            │▒│       │▒│ │
│   │▒│═══════════════════│▒│          │
│   │▒│Start your New     │▒│          │
│   │▒│Jersey LLC         │▒│          │
│   │▒│Business name      │▒│          │
│   │▒│[________________] │▒│          │
│   │▒│Who owns it        │▒│          │
│   │▒│[________________] │▒│          │
│   │▒│[    Continue     ]│▒│          │
│   │▒│       ────        │▒│          │
│   │▒│    with CoFile    │▒│          │
│   │▒└──────────────────┘▒│          │
│   └──────────────────────┘          │
│                ● ○                   │ two 8 px dots, 48 px buttons
│ Two example firms · same page, each  │ caption 14/20
│ in its own brand                  ⟲  │
│                                      │ 80
└──────────────────────────────────────┘
```

- **Words first**, then the picture (6.6). The h2 at 34/38, "Ours in small type." at 16/22 italic
  Graphite, 12 px below; lede 19/30; list 18/26 with 14 px between items; "For firms" with its arrow.
- **The two-card swipe** (Hal): a horizontal strip, the full width of the screen with 20 px of
  scroll padding, `scroll-snap-type: x mandatory`; two cards 310 px wide, 16 px apart, so the second
  card's edge shows 44 px at the screen's right. Each card is its door, recropped to 1:1 (310 × 310,
  the plate centred at 40% down; the photographer delivers this crop), with its client page panel
  (310 px, the sheet 286 px inside 12 px of wash) over the photograph's lower part from 55% down. The
  sheet is the same component, reflowed to 286 px; its rows and spacing are as on desktop. About
  750 px tall.
- **Dots:** two 8 px dots, 12 px apart, centred under the strip; the current one filled Plate Ink,
  the other a 1 px Graphite ring; each a 48 × 48 px button whose accessible name is its firm's name
  (example data, no new words). Each card is a `group` named with its firm's name.
- **Motion on phones:** the first time 40% of the strip is in view, card 1 plays the left half of
  the moment from an unbranded page (no split): light rakes the plate (0–1.2 s), the name lifts
  (0.8–1.6), the Firm Rule draws (1.4–2.0), the page inks (1.8–2.5), "with CoFile" fades in
  (2.8–3.2). Then, 1.2 s later, the strip slides itself once to card 2 (600 ms, `--ease-settle`),
  which is already complete, so the visitor sees there are two firms (Hal). It doesn't slide if the
  visitor has touched the strip. After that it moves only under the thumb. No wipe handle on phones.

#### Tablet, and 1024 to 1279 px

Below 1280 the band stacks: the words first in c1–c6, then the picture across the full content
width, the doors capped at 400 px wide each with the 24 px gutter, the pair centred (at 834: two
365 × 456 doors, the panels 324 px, a 65 px gap for the handle). The full desktop moment and the
wipe handle (touch drag works) are used from 600 px up.

#### States

| State | What the reader sees |
|---|---|
| **Default markup** (no JavaScript) | Both doors and both finished pages in their brands, both Imprints, no handle, no replay control |
| Before it plays (with JavaScript) | Both doors, and the one unbranded page centred between them, without an Imprint |
| Playing | The 4.2 s sequence |
| Rest | Both pages complete; the wipe handle live; the replay control in the caption row |
| Wiping | The part of a page past the handle in the other firm's brand; everything else still |
| **Reduced motion** | The finished pair at once, both Imprints present, the handle present and working (it moves with the pointer and snaps back without easing); no replay control. On phones, no self-slide |
| Plate clip can't play | The plates stay as photographed; everything else plays |
| Photograph not yet loaded | A Cotton 2 box of the door's size; the pages and their motion are unaffected (the moment waits for the photographs, up to 1 s, then plays without them) |
| **Dark mode** | The band is Night; the photographs unchanged (at most 4% darker); each panel's ground is Night 2 `#1A1D27`, as a real client page's ground is in dark mode, so the ground's ink-in is skipped; the sheets stay pure white with `--e-sheet-dark` and every color on them as in light mode (4.6). The handle's rule and outline in Brass, the grip on Night Card. The words in Night Ink, "Ours in small type." in `#A9ABB5` |
| **Spanish** | The h2's two parts keep their sizes; the list items may take two lines; the pages are the firms' English-language pages and don't change |

---
### 9.3 Requests: "Your client sends a text. Nobody retypes it."

**Copy, in order** (`page.tsx`, `id="requests"`):

- h2: "Your client sends a text. Nobody retypes it."
- Lede: "Forward the text, email, WhatsApp or Slack message. AI drafts the filing, your saved answers fill
  in the rest, and your team checks it."
- Picture text (`Visuals.tsx`): the message "Need an LLC for the bakery. It's me and my sister,
  50/50, in Jersey City." with "Ana Ortiz · text message · example"; the draft "Draft: New Jersey LLC
  formation", "For your team to check", the rows "Business name" TWO SISTERS BAKERY LLC, "Members"
  Ana Ortiz, Lucia Ortiz (50/50), "City" Jersey City, NJ, each "from the text", and "Registered
  agent" Your saved agent, "Organizer and signer" Your saved answers, each "already filled".

**The idea.** The customer's note becomes a set job (Hal). The photograph shows how little the
client did: Ana at her bakery counter before opening, thumbing a text (Elaine). The picture shows
how little the firm has to do: her own words, underlined, run along fine leader lines straight into
the rows of a drafted New Jersey LLC formation on Harbor & Pine's desk, while the firm's saved
answers were already there and need no line at all (Hal, Elaine, Rosa). No hand, no cursor, no
typing: the values land, they are never typed out letter by letter (Priya).

#### Desktop layout (1440)

Words in c1–c4; c5 empty; the picture from c6 (x 630), its draft sheet running into the right
margin (to x 1404).

```
x: 120              504   630        894  964 1004                                1404 1440
┌─────────────────────────────────────────────────────────────────────────────────────────┐
│                                     128                                                 │
│                          ┌─ C5, 264 × 330 ─┐                                            │
│                          │ Ana at the      │      ┌──────── draft sheet 400 ─────────┐  │
│                          │ counter, apron, │      │ [▲] Harbor & Pine CPA  with CoFile│  │ 64
│                          │ flour on her    │      │ ═══════════════════════════════════│  │ 6
│                          │ wrist, thumbing │      │ Draft: New Jersey LLC             │  │ section
│ Your client sends        │ her phone; her  │      │ formation                         │  │ 22/28
│ a text. Nobody           │ sister soft     │      │ [◆ For your team to check]        │  │
│ retypes it.              │ behind          │      │ ───────────────────────────────────│  │
│        display-l 52/56   │  ┌──────────────┴──────┐                                   │  │
│                          │  │ Need an LLC for the  │    │ Business name   ◔ from the text│  │
│ Forward the text,        │  │ bakery.·············┐│····●▓TWO SISTERS BAKERY LLC▓      │  │ 68
│ email, WhatsApp or       └──│ It's me and my       ││  ┌·│───────────────────────────────│  │
│ Slack message. AI           │ sister, 50/50,······┼┘  ┊ │ Members         ◔ from the text│  │
│ drafts the filing, your     │ in Jersey City.·····┐   ┊·●▓Ana Ortiz, Lucia Ortiz (50/50)▓│  │
│ saved answers fill in       └─────────────────────┼┘  ┊ │───────────────────────────────│  │
│ the rest, and your team     Ana Ortiz · text       ┊  ┊ │ City            ◔ from the text│  │
│ checks it.  lede 22/34      message · example      └··┼·●▓Jersey City, NJ▓             │  │
│                                                       ┊ │───────────────────────────────│  │
│                                                         │░Registered agent already filled░│ │
│                                                         │░Your saved agent              ░│ │
│                                                         │───────────────────────────────│  │
│                                                         │░Organizer and signer  (tag) ░│  │
│                                                         │░Your saved answers           ░│  │
│                                                         └───────────────────────────────┘  │
│                                                                                     ⟲       │
│                                     160                                                 │
└─────────────────────────────────────────────────────────────────────────────────────────┘
  ··· a 1 px dotted Brass Line leader, ending in a 4 px dot at the sheet's edge
  ▓ Brass Tint behind the value that came from the text   ░ --firm-row on the saved rows
  ◔ the 12 px speech-bubble glyph    ◆ the your-turn lozenge in Harbor
  (tag) "already filled", too long for the sketch; in the build every tag sits on its label's line
  (the leaders run in three columns of elbows so they never cross; see below)
```

**The words.** The h2 in `display-l` 52/56 Miller Display, Plate Ink. In the 384 px column the
longer sentence won't fit on one line, so the two sentences run on as one balanced paragraph of three
lines ("Your client sends / a text. Nobody / retypes it."); where a column allows each sentence its
own line (tablet and phone, below), each is its own line (5.4). 24 px; the lede in `lede` 22/34 Miller
Text, Plate Ink, four lines. No list, no link. The block (about 330 px) is vertically centred on the
draft sheet, the picture's main object.

#### The picture: "Nobody retypes it" (replaces `TextToFormVisual`)

**What it shows.** Three things, left to right, joined by three fine lines: Ana in her bakery, the
text she sent, and the filing it became on her firm's desk, with the firm's saved answers already in
place. It is the stand-in's content, all of it, and nothing more.

**1. The photograph** (C5, D1): Ana Ortiz at the counter of a real neighbourhood bakery early in the
morning, apron on, flour on her wrist, thumbing a text on an unbranded phone, her sister soft in the
background (cast: real sisters). 4:5, 264 × 330 px at x 630–894, square-cut, no shadow. The phone's
screen is shot dark with tracking marks and composited with the same message in CoFile's own bubble
at photo scale, never a messaging app's look (C5). The photographer frames Ana in the upper two
thirds and keeps the lower third quiet counter, because the live bubble lies over it. Alt text
`[copy needed]` (D7). If the owner wants cast frames marked beyond the bubble's own label, that line
is D7's open item.

**2. The message**: our own neutral bubble, live text, at reading size, lying over the photograph's
lower edge as if it had just come off her screen (Elaine, Priya):

- 310 px wide at x 654–964, its top at y 262, so it covers the photograph's lowest 68 px and stands
  70 px clear of its right edge. Fill Cotton 2 `#F3F0E8`; `--r-sheet` corners except a square
  8 px tail cut at the lower left (the incoming side); `--e-sheet`, because it lies on the photograph.
  Padding 20 px.
- The text in `body` 18/28 Founders Grotesk Text, Plate Ink, in three lines as it wraps naturally at
  270 px: "Need an LLC for the bakery." / "It's me and my sister, 50/50," / "in Jersey City." Each phrase
  that travels ends its line, so its leader never crosses a word.
- **The three phrases** (D3): "an LLC for the bakery", "me and my sister, 50/50", "in Jersey City",
  each with Brass Tint `#F6EBD0` behind it (the highlighter, 4.2) and a 1.5 px Brass Line `#A87A1E`
  underline 3 px below the baseline.
- The label "Ana Ortiz · text message · example" in `caption` 14/20 Graphite, 12 px under the
  bubble's left edge, on the Cotton. It is the picture's example label; the picture has no second one
  (Marcus).

**3. The draft**: a crop of Harbor & Pine's desk, the filing request's draft view, live, at 1:1. A
white sheet 400 px wide at x 1004–1404 (running 84 px into the margin), its top at y 96, 583 px
tall, `--r-sheet`, `--e-sheet`, 28 px side padding. Top to bottom:

| Part | Height | Specification |
|---|---|---|
| **Letterhead row** | 64 | The desk's compact row (the draft is a narrow desk view, 3.5): the symbol at 40 px in Harbor; 10 px; "Harbor *&* Pine CPA" in Lora 600 17/22, Plate Ink; at the right end, the Imprint "with CoFile", 13/16 Graphite, never animated |
| **Firm Rule** | 6 | Full sheet width: 3 px Harbor, 2 px gap, 1 px Pine |
| Space | 24 | — |
| **Title** | 56 | "Draft: New Jersey LLC formation" in `section` 22/28 Founders Grotesk Medium (the desk's card titles, 5.3), Plate Ink, up to two lines |
| Space, **chip** | 12 + 28 | "For your team to check": the **Your turn** chip, because checking is the team's next step (Marcus): Pine text, Sheet fill, 1 px Pine border, the ◆ lozenge in Harbor, `chip` 14/18 |
| Space, rule | 20 + 1 | A 1 px Rule across the content width |
| **Five rows** | 5 × 68, 1 px Rule between | Each row: 11 px; a label line (the label in `small` 15/22 Founders Grotesk Text, Graphite, left; the source tag right-aligned); 4 px; the value in `mono` 16/24 Founders Grotesk Mono, Plate Ink, exactly as it will go to the state (5.5); 7 px |
| Foot | 28 | — |

| Row | Label | Value | Tag | Treatment |
|---|---|---|---|---|
| 1 | Business name | TWO SISTERS BAKERY LLC | "from the text" | Value on a Brass Tint band (2 px above and below, 4 px either side); the tag in `chip` 14/20 Founders Grotesk Medium, Brass Ink `#7A5714` (6.6:1), after a 12 px speech-bubble glyph (1.5 px stroke, Brass Ink) (4.2) |
| 2 | Members | Ana Ortiz, Lucia Ortiz (50/50) | "from the text" | the same |
| 3 | City | Jersey City, NJ | "from the text" | the same |
| 4 | Registered agent | Your saved agent | "already filled" | The whole row on `--firm-row` `#EBF7FE` (the saved-answer rows, 3.6), edge to edge of the sheet; the tag 14/20 Founders Grotesk Medium, Graphite, no glyph |
| 5 | Organizer and signer | Your saved answers | "already filled" | the same |

So the colors explain themselves without a legend: brass is what CoFile read from her text, the
firm's own tint is what the firm already knew (Marcus's logic, our tokens). The "from the text" tags
and the tint are the one place Brass touches a firm's sheet, and they are CoFile's annotation of the
picture, as the foundation assigns (4.2).

**The leaders** (Hal, Elaine): three 1 px dotted lines in Brass Line (round dots every 5 px), each
from the end of a phrase's underline to the sheet's left edge beside its row, ending in a 4 px Brass
Line dot 6 px short of the sheet. Each runs right just under its phrase's line, out of the bubble,
turns down with an 8 px radius, and turns right again into its row's label line. The three elbows sit
at three x positions so no line ever crosses another: the leader from the lowest phrase turns first
(x 976), the middle one next (x 984), the top one last (x 992). The top leader drops about 24 px, the
middle about 64 px, the bottom about 104 px, so they slope gently down to a sheet that sits lower
than the bubble. They stay drawn at rest: they are the picture's meaning, a line from what she wrote
to where it went with no hand in between (Hal).

**No phone slab** is drawn on desktop: the photograph already shows her phone, and the bubble at
reading size is its message (6.4 keeps the slab for where nothing else shows the phone).

**The replay control** sits 12 px under the draft sheet's lower-right corner.

#### Motion: "Nobody retypes it" (D3; Hal M3, Elaine M4, Rosa moment 3), 3.4 s

Plays once, the first time 40% of the picture is in view. The photograph never moves.

| t (ms) | Beat |
|---|---|
| 0 | **Before:** the photograph; the draft sheet with its letterhead, Imprint, Firm Rule and title; all five labels; rows 1 to 3 with **empty** value lines and no tags; rows 4 and 5 with their values **already present** in Plate Ink but without their tint or tags (they were already there). No chip. No bubble |
| 0–320 | Ana's bubble rises 12 px and fades in (`--t-set` 320 ms, `--ease-settle`), with its label |
| 320–720 | A pause, so the reader reads her words first (Hal) |
| 720–1020 | "an LLC for the bakery": its tint fades in and its underline draws left to right (300 ms, `--ease-sweep`) |
| 870–1170 | "me and my sister, 50/50", the same, 150 ms behind |
| 1020–1320 | "in Jersey City", the same |
| 1020–1520 | The first leader draws from the end of the first underline to its row (500 ms, `--ease-settle`, SVG `stroke-dashoffset`) |
| 1170–1670 | The second leader |
| 1320–1820 | The third leader |
| 1520–1780 | **Row 1's value sets** as its leader lands: "TWO SISTERS BAKERY LLC" with its tint, then its "from the text" tag (`--t-ink` 260 ms: opacity 0 → 1, rising 2 px) |
| 1670–1930 | Row 2 sets: "Ana Ortiz, Lucia Ortiz (50/50)" |
| 1820–2080 | Row 3 sets: "Jersey City, NJ" |
| 2080–2340 | **The two saved rows ink together, at once, with no lines:** their `--firm-row` fill and "already filled" tags fade in (260 ms) |
| 2600–3040 | "For your team to check" presses in last (edge 180 ms, `--ease-press`; ink 260 ms) |
| 3400 | Rest. The replay control fades in |

#### Phone layout (390)

```
┌──────────────────────────────────────┐
│ Your client sends a text.            │ display-l 34/38
│ Nobody retypes it.                   │ each sentence its own line
│                                      │ 16
│ Forward the text, email, WhatsApp or │ lede 19/30
│ Slack message. AI drafts the filing, │
│ your saved answers fill in the rest, │
│ and your team checks it.             │
│                                      │ 40
│ ┌──────────────────────────────────┐ │ C5 recropped 4:5, 350 × 438
│ │                                  │ │
│ │  Ana at the counter, thumbing    │ │
│ │  her phone                       │ │
│ │                                  │ │
│ │ ┌──────────────────────────────┐ │ │ bubble 310, over the photo's
│ └─│ Need an LLC for the bakery.  │─┘ │ lowest 64 px
│   │ It's me and my sister, 50/50, │   │ body 18/28
│   │ in Jersey City.               │   │
│   └──┬───────────────────────────┘   │
│   Ana Ortiz · text message · example │ caption 14/20
│      ┊                               │ one leader, 40 px
│ ┌────●─────────────────────────────┐ │ draft sheet 350
│ │ [▲] Harbor & Pine CPA  with CoFile│ │ 64
│ │ ═════════════════════════════════│ │
│ │ Draft: New Jersey LLC formation  │ │
│ │ [◆ For your team to check]       │ │
│ │ ─────────────────────────────────│ │
│ │ Business name     ◔ from the text│ │ label line, tag at right
│ │ ▓TWO SISTERS BAKERY LLC▓         │ │ value line, mono 16
│ │ ─────────────────────────────────│ │
│ │ … Members, City, then the two    │ │
│ │ saved rows on --firm-row …       │ │
│ └──────────────────────────────────┘ │
│                                   ⟲  │
│                                      │ 80
└──────────────────────────────────────┘
```

- Words first. On a phone the 350 px column allows each sentence its own line: "Your client sends a
  text." / "Nobody retypes it." at 34/38.
- The photograph recropped to 4:5 (350 × 438), then the bubble (310 px, 20 px in from the left)
  over its lowest 64 px, then its label.
- **One leader instead of three** (Hal): a single vertical 1 px dotted Brass Line, 40 px, from under
  the label to a 4 px dot on the draft's top edge. Below it the pairing is by color alone: each
  underlined phrase in the bubble, each tinted value on the draft (Greta).
- The draft sheet runs the full 350 px, keeping its shadow; its rows are already label-over-value, so
  they don't change. About 1,150 px for the picture in all.
- Motion: the same beats, with the single leader drawing (500 ms) once all three underlines have
  drawn, then the three values setting 150 ms apart; about 3.0 s.

#### Tablet, and 1024 to 1279 px

Below 1280 the band stacks: the words first in c1–c8, each sentence of the h2 on its own line
(52/56 at 1024, 44/48 at 834), then the picture across the content width with the same three
parts, the photograph reduced to 240 × 300 so the bubble, the 40 px gap and the 400 px draft fit
(750 px at 834). Leaders and motion as on desktop.

#### States

| State | What the reader sees |
|---|---|
| **Default markup** (no JavaScript) | Complete: the bubble, its three tinted and underlined phrases, all three leaders, every value with its tint or row fill, every tag, the chip |
| Before it plays | As the 0 ms row of the motion table |
| Rest | Complete; the replay control |
| **Reduced motion** | Complete at once; no replay control |
| Photograph not loaded | A Cotton 2 box of its size; the bubble lies on it as usual |
| **Dark mode** | The band is Night; the photograph unchanged (at most 4% darker); the bubble and the draft stay light (they are parts of the picture, 4.6), the bubble keeping its Cotton 2 fill and its tint; the bubble's label in `#A9ABB5`; the leaders and their dots in Brass `#D9A84A` where they cross the Night; the words in Night Ink |
| **Spanish** | The h2 and lede reflow; the picture is the example firm's English-language desk and Ana's own English text, unchanged |

---
### 9.4 The proof: "Nothing is filed or paid until you approve the proof."

**Copy, in order** (`page.tsx`, `id="proof"`):

- h2: "Nothing is filed or paid until you approve the proof."
- Lede: "One page: every detail, every fee."
- List: "The state's own review page, where possible" · "Every fee checked again before paying" ·
  "Any later change comes back for approval"
- Link: "How it works" (to `/how-it-works`)
- Picture text (`Visuals.tsx`): "Harbor & Pine CPA", "example firm", "Two Sisters Bakery LLC", "Ready to
  approve", "Business name" TWO SISTERS BAKERY LLC, "Members" Ana Ortiz, Lucia Ortiz (50/50), "Main
  business address" 88 Grove St, Jersey City NJ 07302, "Formation filing fee" $100.00, "NJ portal fee,
  by card" $3.50, "Total to the state" $103.50, "New Jersey's own review page, filled in", "Business
  Name" TWO SISTERS BAKERY, "Designator" LLC, "Approve for filing", "New Jersey payment screen"
  $103.50, "Matches the proof"
- Picture label: "Sample proof · test details · not a real business"

**The idea.** "You've approved a proof before" (How it works). The proof is the one sheet in the
firm's life that is *for the firm*, so it is the most ceremonial object on the site and the calmest:
one sheet under the firm's own letterhead, every detail and every fee set like a good invoice, one
button in the firm's color at the place your initials would go (Hal). It lies alone on the quietest
ground on the page, Cotton 2, with no photograph and no Brass near it, and nothing in its band
competes with it (Hal, Tomás). Four small numbered marks in the margin, CoFile's annotation and not
part of the firm's page, lead the eye through it in order, the way an editor reads a proof (Elaine).
The firm approves it, never its client.

#### Desktop layout (1440)

The band is Cotton 2 `#F3F0E8`, full bleed, 128 px above and 160 px below. The picture is in c1–c7
(the sheet at x 170–810, its callouts in c1's left part); c8 is empty; the words are in c9–c12,
vertically centred on the sheet.

```
x: 120  170                                             810    882  936                       1320
┌────────────────────────────── Cotton 2, full bleed ──────────────────────────────────────────────┐
│                                         128                                                       │
│      ┌──────────────────── the proof, 640 × 892, Sheet ──────────────┐                            │
│      │                         [▲]                   example firm   │                            │
│      │                  Harbor & Pine CPA                            │                            │
│      │ ════════════════════════════════════════════════════════════  │                            │
│      │ ────────────────────────────────────────────────────────────  │                            │
│      │ Two Sisters Bakery LLC                 [◆ Ready to approve]   │   Nothing is filed         │
│ (1)──│ Business name        ░TWO SISTERS BAKERY LLC░                 │   or paid until            │
│      │ ──────────────────────────────────────────────────────────── │   you approve              │
│      │ Members              Ana Ortiz, Lucia Ortiz (50/50)           │   the proof.               │
│      │ ──────────────────────────────────────────────────────────── │        display-l 52/56     │
│      │ Main business address ░88 Grove St, Jersey City NJ 07302░     │                 24         │
│ (2)──│ Formation filing fee ······························· $100.00  │   One page: every detail,  │
│      │ NJ portal fee, by card ································ $3.50  │   every fee.  lede, Graphite│
│      │ ──────────────────────────────────────────────────────────── │                 48         │
│      │ Total to the state                                  $103.50  │   ◆ The state's own review │
│      │                                                     ═══════  │     page, where possible   │
│ (3)──│ New Jersey's own review page, filled in                       │   ◆ Every fee checked      │
│      │ ┌▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔┐  │     again before paying    │
│      │ │ Business Name    TWO SISTERS BAKERY                      │  │   ◆ Any later change comes │
│      │ │ Designator       LLC                                     │  │     back for approval      │
│      │ └──────────────────────────────────────────────────────────┘  │                 24         │
│ (4)──│ [▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓ Approve for filing ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓]  │   How it works →           │
│      │                             ────                              │                            │
│      │                          with CoFile                          │                            │
│      └───────────────────────────┬───────────────────────────────────┴──────┐                     │
│                                  │ New Jersey payment screen  $103.50  ● Matches the proof │      │
│                                  └──────────────────────────────────────────┘ slip 480 × 56     │
│      Sample proof · test details · not a real business                    ⟲                      │
│                                         160                                                       │
└───────────────────────────────────────────────────────────────────────────────────────────────────┘
  (n)── a numbered callout and its leader, outside the sheet   ░ --firm-tint, the "check this" mark
  ▔▔ the review page's plain Bond top band   ═══ the accountant's double rule under the total
```

#### The words

- **h2**: `display-l` 52/56 Miller Display, Plate Ink, four balanced lines in the 384 px column
  ("Nothing is filed / or paid until / you approve / the proof.").
- **Lede**, 24 px below: `lede` 22/34 Miller Text in Graphite (ledes on Cotton 2, 4.2; 6.2:1), two
  lines.
- **List**, 48 px below: `list` 19/28 Founders Grotesk Text Medium, Plate Ink, the 7 px Brass Line
  lozenges hung in the margin, 16 px apart; the first item takes two lines.
- **"How it works"**, 24 px below: the text link with its arrow, as "For firms" in 9.2.
- About 530 px tall, centred on the sheet (its top about 180 px below the sheet's top). The list does
  not point at the sheet on hover; the callouts order the sheet and the list says what the reader
  will find on it (decisions file).

#### The picture: "One page, your button" (replaces `ProofVisual`)

**What it shows.** The sample proof for Two Sisters Bakery LLC as Harbor & Pine CPA will see it:
one page under the firm's letterhead with every detail, every fee, the state's own review page
filled in, and the firm's one button; and tucked under its foot, the New Jersey payment screen's
total, matching it. It is the real proof component (section 10), live, at 1:1, with the stand-in's
data and nothing more.

**The sheet**, 640 × 892 px at x 170–810, Sheet `#FFFFFF`, `--r-sheet`, `--e-sheet`, 48 px side
padding (content 544 px). A ceremonial piece, so its letterhead is centred (3.5). Top to bottom:

| Part | Height | Specification |
|---|---|---|
| Head margin | 32 | — |
| **Logo** | 64 | The square symbol, 64 × 64 (the sheet's area rule, capped), Harbor, centred |
| Gap, **name** | 12 + 30 | "Harbor *&* Pine CPA" in Lora 600 24/30, Plate Ink, centred; the "&" in Lora Italic 600, "CPA" by the credentials rule (3.5) |
| "example firm" | — | The stand-in's label, `caption` 14/20 Graphite, at the sheet's top-right corner, 24 px from the top and right edges |
| Gap, **Firm Rule** | 20 + 6 | The full content width: 3 px Harbor, 2 px gap, 1 px Pine |
| Gap, **title row** | 24 + 40 | "Two Sisters Bakery LLC" in `proof-title` 34/40 Lora 600, Plate Ink, left; at the right, on the title's first line, the **Your turn** chip "Ready to approve" (Pine text, Sheet fill, 1 px Pine border, ◆ in Harbor) |
| Gap, **the details** | 24 + 146 | Three rows of 48 px, a 1 px Rule between: the label in `proof-label` 16/22 Founders Grotesk Text Medium, Graphite, in a 38% column (207 px); the value in `proof-value` 16/24 Founders Grotesk Mono, Plate Ink, exactly as the state will receive it. "TWO SISTERS BAKERY LLC" and "88 Grove St, Jersey City NJ 07302" sit on the firm's "check this" mark, `--firm-tint` `#DDEEF7`, a band 2 px above and below the text and 4 px either side: the stand-in's highlighter, in the firm's own ink (3.6) |
| Gap, **the fees** | 24 + 121 | `fee` 18/26 Founders Grotesk Text, tabular lining figures, amounts right-aligned on the decimal point, cents always shown: "Formation filing fee" then dot leaders (Founders Grotesk periods every 0.4 em in Rule Strong `#8A8578`, on the shared baseline) to "$100.00"; "NJ portal fee, by card" to "$3.50". 8 px; a 1 px Plate Ink rule across the content width; 8 px; "Total to the state" and "$103.50" in `total` 22/28 Founders Grotesk Medium, tabular; under the amount only, the accountant's double rule (1 px, 2 px gap, 1 px Plate Ink) (5.4) |
| Gap, **the state's review page** | 24 + 143 | "New Jersey's own review page, filled in" in `caption` 14/20 Graphite (a label, so not mono, 5.5); 8 px; a neutral redraw (3.9, D1): a frame with a 1 px Rule edge and `--r-sheet` corners, a plain 16 px Bond band across its top (no title, no dots, no color, no seal, no state mark), 12 px padding, then two rows of 36 px with a 1 px Rule between: "Business Name" and "Designator" in `small` 15/22 Graphite (capitalised as the copy has them), "TWO SISTERS BAKERY" and "LLC" in `mono` 16/24 Plate Ink |
| Gap, **the button** | 24 + 56 | "Approve for filing", full content width, 56 px, `--firm-fill` Harbor `#1D4E63`, white `button` 18/24 Founders Grotesk Medium (the proof is a firm page, not a client page, 5.3), `--chamfer` corners. A picture of a button: `aria-hidden`, not focusable, no hover. It never pulses, glows or moves |
| Gap, **the Imprint** | 24 + 1 + 12 + 16 | A 40 px Rule hairline centred, 12 px, "with CoFile" centred, 13/16 Graphite (3.4) |
| Foot margin | 48 | — |

**The callouts** (Elaine): four marks in the Cotton 2 margin, outside the sheet, so they read as
CoFile's annotation and never as part of the firm's page. Each is a 24 px circle in Plate Ink with
its numeral in Cotton, Founders Grotesk Medium 14 px tabular, at x 122–146, with a 1.5 px Plate Ink
leader running 20 px right and stopping 4 px short of the sheet's edge. They sit on the first text
line of: (1) the details, (2) the fees, (3) the state's review page, (4) the button. They are
`aria-hidden`: the proof's own text carries the meaning. No ticks, no check marks, no inspector's
stamp.

**The payment slip**: a narrow slip of paper tucked under the sheet's foot, offset to the right, the
way the payment screen's printout would be slipped under a proof (Hal, Elaine). 480 × 56 px, Sheet
white, a 1 px Rule edge, `--r-sheet`, `--e-sheet`, at x 402–882 so it stands 72 px past the sheet's
right edge, its top 8 px tucked under the sheet's foot. 20 px padding, one line: "New Jersey payment
screen" in `small` 15/23 Graphite; 24 px; "$103.50" in Founders Grotesk Text Medium 17/24, tabular,
Plate Ink; and at the right the **Done** chip "Matches the proof" (white on Verdigris, ● in white).
A footnote to the proof, set like one: smaller, behind, quiet, and present from its first frame. No
badge, no tick burst.

**Label:** "Sample proof · test details · not a real business", `caption` 14/20 Graphite, 12 px under
the slip, aligned to the sheet's left edge; the replay control at the right end of that row, under
the sheet's right edge.

**Height.** The picture is about 972 px tall and the band about 1,260 px: about 1.4 screens on a
900 px tall window, the tallest band on the page and a little over the foundation's guide (6.5).
The proof is shown whole and at 1:1 on purpose: reduced, its 13 px Imprint would shrink, and it is
the object the band exists for. On a 1080 px tall window the sheet and its slip are in view at
once.

#### Motion: "One page, your button" (D3; Hal M4, Elaine M5), about 2.1 s

Plays once, the first time 40% of the sheet is in view. Fees and totals are on the sheet when it
lands and never move (D2).

| t (ms) | Beat |
|---|---|
| 0 | **Before:** the band and its words. The sheet not yet laid (opacity 0, 24 px low); the slip tucked 20 px under where the sheet's foot will be; no callouts |
| 0–600 | **The proof is laid down:** the sheet rises 24 px into place and fades in (600 ms, `--ease-settle`), already carrying its letterhead, "example firm", the title and chip, every label, the fee labels and amounts, the total's figure, the review page's caption and the Imprint |
| 500–960 | The detail values set, one row after another (`--t-set` 320 ms, 70 ms apart), each "check this" mark with its value |
| 600–800 | Callout 1 fades in (200 ms) |
| 900–1300 | The dot leaders draw out from each fee label to its amount (400 ms, `--ease-sweep`) |
| 950–1150 | Callout 2 |
| 1200–1500 | The rule above the total draws left to right (300 ms); 1350–1650, the double rule under "$103.50" draws |
| 1300–1560 | The review page's frame and its two rows ink in (`--t-ink` 260 ms) |
| 1300–1500 | Callout 3 |
| 1500–1940 | **"Approve for filing" presses in last** (edge 180 ms, `--ease-press`; ink 260 ms, `--ease-settle`), and then is still |
| 1600–1800 | Callout 4 |
| 1700–2100 | **The slip slides 12 px out** from under the sheet's foot (400 ms, `--ease-settle`); "Matches the proof" is simply there on it |
| 2100 | Rest; the replay control fades in |

#### Phone layout (390)

```
┌──────────────────────────────────────┐
│░░░░░░░░░░░ Cotton 2, full bleed ░░░░░│
│ Nothing is filed or                  │ display-l 34/38, three lines
│ paid until you                       │
│ approve the proof.                   │
│                                      │ 16
│ One page: every detail, every fee.   │ lede 19/30, Graphite
│                                      │ 32
│ ◆ The state's own review page, where │ list 18/26
│   possible                           │
│ ◆ Every fee checked again before     │
│   paying                             │
│ ◆ Any later change comes back for    │
│   approval                           │
│                                      │ 24
│ How it works →                       │
│                                      │ 40
│ ┌──────────────────────────────────┐ │ the proof, 350, its phone layout
│ │              [▲]     example firm│ │ logo 48; "example firm" 14/20
│ │        Harbor & Pine CPA         │ │ 20/26
│ │ ═════════════════════════════════│ │
│ │ Two Sisters                      │ │ proof-title 28/34
│ │ Bakery LLC                       │ │
│ │ [◆ Ready to approve]             │ │ chip under the title
│ │ Business name                    │ │ label 15/20 above
│ │ ░TWO SISTERS BAKERY LLC░         │ │ value, mono 17/24
│ │ ─────────────────────────────────│ │
│ │ Members                          │ │
│ │ Ana Ortiz, Lucia Ortiz (50/50)   │ │
│ │ ─────────────────────────────────│ │
│ │ Main business address            │ │
│ │ ░88 Grove St, Jersey City NJ░    │ │
│ │ ░07302░                          │ │
│ │ Formation filing fee ···· $100.00│ │ fee 18/26, shorter leaders
│ │ NJ portal fee, by card ····· $3.50│ │
│ │ ─────────────────────────────────│ │
│ │ Total to the state       $103.50 │ │ total 22/28
│ │                          ═══════ │ │
│ │ New Jersey's own review page,    │ │
│ │ filled in                        │ │
│ │ ┌▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔┐ │ │
│ │ │ Business Name  TWO SISTERS    │ │ │
│ │ │                BAKERY         │ │ │
│ │ │ Designator     LLC            │ │ │
│ │ └───────────────────────────────┘ │ │
│ │ [▓▓▓▓▓ Approve for filing ▓▓▓▓▓] │ │ 56, full width
│ │              ────                │ │
│ │           with CoFile            │ │
│ └──┬───────────────────────────────┘ │
│    │ New Jersey payment screen  $103.50│ slip 326 × 92, two lines,
│    │ ● Matches the proof              │ 8 px under the sheet's foot
│    └───────────────────────────────┘ │
│ Sample proof · test details · not a  │ caption 14/20
│ real business                     ⟲  │
│░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░│ 80
└──────────────────────────────────────┘
```

- The band keeps its Cotton 2 ground full bleed. Words first: the h2 at 34/38 in three balanced
  lines, the lede in Graphite, the list, the link.
- The proof is its real phone layout, 350 px wide, keeping its shadow and the page's 20 px margins
  (it is a picture): 20 px side padding; the letterhead centred (the symbol at 48 px by the phone
  area rule, the name at 20/26); "example firm" 16 px from the top-right corner; the title at
  `proof-title` 28/34 on two lines with the chip under it (12 px); each detail as label (15/20
  Graphite Medium) above value (`proof-value` 17/24 mono); the fees on one line each with shorter
  leaders; the review page's rows side by side, wrapping the value; the button full width; the
  Imprint. About 1,060 px tall.
- **No callouts** on phones: there is no margin for them outside the sheet, and the list is just
  above.
- **The slip** sits under the sheet's foot, 8 px tucked, 326 px wide at the content's right edge,
  in two lines (the label and amount, then the chip), 92 px tall.
- Motion: the same beats without the callouts, about 2.0 s.

#### Tablet, and 1024 to 1279 px

Below 1280 the band stacks: the words first in c1–c8, then the proof centred at 640 px with its
callouts in the margin to its left (at 834 the sheet leaves 57 px either side) and the slip under
its foot. Motion as on desktop.

#### States

| State | What the reader sees |
|---|---|
| **Default markup** (no JavaScript) | The complete sheet with every rule and leader, the callouts, the slip 12 px out |
| Before it plays | The band and its words only |
| Rest | Complete; the replay control |
| Interaction | None. The picture is a sample; its button does nothing, so it has no hover or pressed state and isn't focusable (Elaine). Read by a screen reader, the sheet gives its text in order |
| **Reduced motion** | Complete at once; no replay control |
| **Dark mode** | The band is Night 2 `#1A1D27`; the sheet and the slip stay pure white with `--e-sheet-dark`, every color on them as in light mode (the proof always stays paper, 4.6); the callouts become Night Ink circles with Night numerals and Night Ink leaders; the h2 and list in Night Ink, the lede in `#A9ABB5`, the lozenges and link underline in Brass |
| **Spanish** | The words reflow (the first list item may take three lines); the proof is the example firm's English-language proof and doesn't change |

---

### `[copy needed]` in this part

New items this part adds (beyond D7's list):

| Where | What |
|---|---|
| Header (phone) | The menu button's word while the menu sheet is open (for example "Close") |
| Header | The words of the "Skip to content" link, the first focusable element on every page |
| Hero, the desk picture | A short, visually hidden description for the waiting row's link, saying it goes to the sample proof below |
| Firms, the wipe handle | The spoken value (`aria-valuetext`) saying how much of which page shows the other firm's brand |

Items from D7 that this part uses: the alt text of the door photographs (C1, C2), of Ana's
photograph (C5) and of each team portrait with the person's name and role (C10); the accessible name
of the replay control; the accessible name of the wipe handle; the word "Menu" on the phone's menu
button and the menu sheet's accessible name; a caption marking cast frames as examples (Ana), if
the owner wants one.
