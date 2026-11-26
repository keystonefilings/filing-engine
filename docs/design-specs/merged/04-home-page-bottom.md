# CoFile merged design, part 4: the home page, 9.5 to 9.10

Merge round, Nov 26, 2026. This part writes the second half of **9. The home page**: After,
Coverage, Rehearsals, Pricing, the Close and the footer. It builds on the foundation in
`01-foundation.md`; the beta notice, header, Hero, Firms, Requests and the
proof (9.0 to 9.4) are written separately. Every token named here (`--e-sheet`, `display-l`,
`--ease-settle`, `press-in` and so on) means the foundation's definition, and its example data
(D4), motion rules (D2) and signature moments (D3) are used as given. The choices this part made
where the ten designers split, and the foundation is silent, are in `DECISIONS.md`.

Credits in parentheses name the designer an idea comes from. Hal's section 9 is the base, so
uncredited detail follows him.

The copy is locked. Every quoted line is the round 3 copy in `web/app/page.tsx`,
`web/components/landing/Visuals.tsx` and `web/components/landing/Shell.tsx`; "CoFile" stands for
`platformName()`, the prices come from `web/lib/pricing.ts` and the coverage from
`web/lib/coverage.ts`. New words are marked `[copy needed]` and listed at the end of this part.

### Conventions used below

- **Coordinates** are at the 1440 px design width: 120 px margins, 12 columns of 78 px with 24 px
  gutters, so column *n* starts at page x = 120 + (n − 1) × 102. c1–c4 runs x 120–504 (384 px);
  c1–c5 runs 120–606 (486 px); c6–c12 runs 630–1320 (690 px), and a picture that bleeds right runs
  on to the viewport edge (810 px wide at 1440). Positions inside a picture are measured from the
  picture's own top-left corner.
- **Breakpoints** (6.2): desktop 1280+; laptop 1024–1279 (the same 12 columns, narrower; a note per
  section); tablet 600–1023 (designed at 834, 8 columns, 40 px margins); phone ≤ 599 (designed at
  390, 20 px margins).
- **Every picture** is a `figure` with an accessible name and its label as `figcaption`: the label
  in `caption` (Founders Grotesk Text 14/20, Graphite), 12 px under the picture's lower-left corner,
  always visible, with the 24 px replay control at the right end of the same row (accessible name
  `[copy needed]`, already raised in D7). A picture plays once, the first time it is 40% in view,
  then rests in its final frame; the final frame is the page's default markup, so a reader without
  JavaScript, with reduced motion, or arriving by a deep link (`#after`, `#pricing`) sees it complete
  (D2).
- **Sheets in pictures** are pages of CoFile's filing desk (the record in 9.5, the run sheet in
  9.7), so they wear CoFile's look, the same for every firm, with Harbor & Pine as the account
  (decision 2; the desk takes the dashboard's treatment, 10C). At the head of each, the desk's
  header row: CoFile's horizontal lockup at the left, its lozenge in Brass Line as in the desk's own
  header (10C.2), and at the right end the account label, Harbor & Pine's square symbol at 24 px
  tall with "Harbor & Pine CPA" in Founders Grotesk Text Medium; under the row, CoFile's 1 px Plate
  Ink rule (10C.1). The firm's name and logo are content there, never the sheet's letterhead: no
  Firm Rule, no Lora, no Harbor or Pine ink, and no "with CoFile" (the Imprint is retired, decision
  12). The lockup is `aria-hidden` inside a picture; the account label reads as text. Sheets stay
  pure white in dark mode.
- **One Brass button per screen** (4.8). None of these bands has a button except the Close, so the
  header's "Run a free rehearsal" is the Brass one through 9.5 to 9.8; 9.9 says what happens at the
  Close.

---

## 9.5 After: "Then it's filed, and the papers come back to you."

**Copy, in order:** h2 "Then it's filed, and the papers come back to you." · list "The state's
documents, saved and sent to you" / "CoFile applies for the EIN and keeps the IRS letter" / "An
update at each stage" · inside the picture, the stand-in's record: the stages "Approved",
"Submitted", "Filed"; "New Jersey", "Certificate of Formation", "TWO SISTERS BAKERY LLC"; "IRS",
"EIN letter (CP 575)", "EIN 00-0000000" · label "Example record · sample documents".

**The idea: the order comes home** (Hal). One band up the firm approved the proof. Here the
finished job comes back to it the way a stationer's order does: the record of the filing, a page of
CoFile's filing desk, lies on a desk in the firm's office with every stage inked, and CoFile's
envelope addressed to the firm opens beside it and gives up the two papers, which settle onto the
record. The photograph makes it a real desk at the end of a working day; the record, the envelope
and the papers are live HTML and SVG. It is the reward of the story half of the page, so it is calm
and complete: nothing stamps, nothing celebrates.

### The band

- Ground Cotton, with the 3% cotton texture. Spacing 128 above, 160 below (showpiece band, 6.3).
- Arrangement A (6.5): words in c1–c4, c5 empty, the picture in c6–c12 bleeding right.
- `id="after"`, as today.

### The words

- **h2** at `display-l` (Miller Display 400, 52/56, −0.6%), Plate Ink, `text-wrap: balance`. At
  384 px it sets in three lines, "Then it's filed, / and the papers / come back to you." (Jun's
  break, which balance gives at this measure); never a lone "you.". Its cap height lines up with
  the top edge of the record sheet (picture y 40), per 6.2.
- **List**, 32 px under the h2: `list` (Founders Grotesk Text 19/28, 500), Plate Ink, 16 px between
  items, each item hung on a 7 px Brass Line lozenge in the margin (5.4). No ticks, no icons.
- The copy gives this section no lede, no link and no button, and none is added.
- The column (about 370 px tall: the h2's three lines, then five lines of list) runs from the
  record's top edge to about the middle of the papers, so there is no void beneath it.

### The picture: "The order comes home"

**What it shows.** Harbor & Pine's filed record for Two Sisters Bakery LLC, a page of CoFile's desk
with Harbor & Pine as the account, lying on a walnut desk with its three stages inked; beside it an
opened CoFile envelope addressed to Harbor & Pine CPA; and the two papers that came back in it, the
state's Certificate of Formation and the IRS letter, lying side by side on the record. It reads in one glance as "done, and it's all here".

**Accessible name** (the stand-in's): "A filed record with the state's document and the IRS
letter". The record's words are real text in reading order, the stages as an ordered list; the
envelope is `aria-hidden` (it repeats the firm's name); the photograph is decorative (`alt=""`)
inside the figure.

**Composition, desktop.** The picture frame is the photograph, 810 × 640, from c6 to the viewport
edge; the first 690 px are on the grid. Two live objects lie on it: the record sheet at the left,
the envelope at the lower right. Everything readable stays inside the grid; only the envelope's
blank right end and the photograph's props run into the bleed.

```
 picture x:  0  24                                440 464                  690 | bleed  810
 y   0 ┌──────────────────────────────────────────────────────────────────────┬──────────┐
       │  walnut desk, top-down, north light                  ╲ pen         │          │
      40│   ┌───────────── record sheet, 416 × 540 ────────────┐ ╲╲           │          │
       │   │ [▭Co] CoFile              [▲≈] Harbor & Pine CPA │              │  ◯──◯    │
       │   │ ──────────────────────────────────────────────── │              │ glasses  │
       │   │                                                  │              │          │
       │   │ Two Sisters Bakery LLC     (Miller Display, 24)  │              │          │
       │   │ New Jersey LLC formation                         │              │          │
       │   │ ●──────────────────────●───────────────────────● │              │          │
       │   │ Approved             Submitted             Filed │              │          │
     332│   │ ┌──────────────────┐ ┌──────────────────┐       │   ╱‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾╲  │
       │   │ │ New Jersey       │ │ IRS              │       │  ╱  flap, open        ╲ │
     452│   │ │ Certificate of   │ │ EIN letter       │       │ ┌───────────────────────┼──┐
       │   │ │ Formation        │ │ (CP 575)         │       │ │ [▭Co] CoFile          │  │
       │   │ │ TWO SISTERS      │ │ EIN 00-0000000   │       │ │  Harbor & Pine CPA    │  │
       │   │ │ BAKERY LLC       │ │ ▬▬▬▬▬▬▬▬▬▬▬▬     │       │ │                       │  │
       │   │ │ ▬▬▬▬▬▬▬▬▬▬▬▬     │ │ ▬▬▬▬▬▬▬▬▬▬       │       │ └───────────────────────┼──┘
     580│   └─┴──────────────────┴─┴──────────────────┴───────┘ envelope 280 × 122   │  (cup)   │
     640└──────────────────────────────────────────────────────────────────────┴──────────┘
        Example record · sample documents                                         [↻]
```

(The pen, glasses and cup are in the photograph; the ASCII only marks where they sit.)

**The photograph (C6, the clean plate).** What this layout needs from the art-direction brief:

- Top-down, square to the frame, a walnut desk in north light, lit so that a sheet's shadow falls
  straight down and soft, matching `--e-sheet` (Hal, Jun).
- Clear wood under the record (picture x 0–480, the full height) and under the envelope and its
  open flap (x 440–760, y 380–600): grain only, no knots or marks that read through.
- Props at the edges only: a fountain pen lying diagonally in the upper right (about x 500–680,
  y 70–170), folded reading glasses at the right edge, mostly in the bleed (x 660–810, y 210–330),
  a cup on a coaster cut by the bottom-right corner (x 640–810, y 560–640).
- One master large enough to crop the desktop frame (810 × 640), the tablet frame (834 × 600) and
  the phone frame (390 × 640), with the props re-laid on the day for the phone frame (the pen at the
  top right, the glasses at the lower left, no cup).
- No paper of any kind in the photograph: every paper on the desk is live.

**The record sheet** (live HTML; the product's filing record, set as a page of CoFile's filing desk
with Harbor & Pine as the account, so it wears CoFile's look and the firm's name and logo are
content in the desk's header row, never its letterhead; decision 2). 416 × 540, at picture x 24,
y 40. Sheet `#FFFFFF`, `--r-sheet`, `--e-sheet`, 40 px margins (content 336 px).

| y in the sheet | Element | Spec |
|---|---|---|
| 40–84 | The desk's header row | Both ends vertically centred in the 44 px row. Left: CoFile's horizontal lockup at 20 px tall, Plate Ink, its lozenge in Brass Line (10C.2), `aria-hidden`. Right end: the account label, Harbor & Pine's square symbol at 24 × 24, 8 px, "Harbor & Pine CPA" in Founders Grotesk Text Medium 15/20, Plate Ink. Nothing in the picture is focusable |
| 104 | CoFile's rule | 1 px Plate Ink, full content width (10C.1). No Firm Rule |
| 134–164 | Title | "Two Sisters Bakery LLC" in Miller Display 400 24/30 (the desk's title face, 10C.2, at the sheet's scale), Plate Ink |
| 168–190 | The filing | "New Jersey LLC formation" in `help` (Founders Grotesk Text 15/22), Graphite |
| 218–260 | The stage rule | Below |
| 292–500 | The papers' place | The two document cards, 160 × 208 each, at content x 0 and x 176 (16 px apart) |
| 500–540 | Foot margin | — |

**The stage rule** ("An update at each stage", drawn rather than written). A 1 px Rule hairline
across the content width at sheet y 224, carrying three 12 px dots: at its start, its middle and
its end. A stage that has passed is the Done glyph, a solid Verdigris `#2E6B57` circle (4.3), and
the hairline between two passed stages is overdrawn in 2 px Verdigris; a stage not yet passed (seen
only at the start of the motion) is a 1.5 px Rule Strong ring on white. The labels sit 16 px under
the dots in Founders Grotesk Text Medium 15/20, Plate Ink: "Approved" left-aligned under the first,
"Submitted" centred under the second, "Filed" right-aligned under the third. The dots are circles,
not lozenges: the lozenge is the "your turn" glyph (4.3), and a finished record has no turn
left in it.

**The document cards** (CoFile's own document card, 3.9: the same component as the documents list
on a filing page). 160 × 208, white, `--r-sheet`, 1 px Rule border and no shadow at rest (paper on
paper, 6.4), 16 px padding (content 128 px):

| | The state's document | The IRS letter |
|---|---|---|
| Issuer: Founders Grotesk Text Medium 14/20, Graphite | "New Jersey" | "IRS" |
| Title, 4 px below: Founders Grotesk Medium 17/22, Plate Ink | "Certificate of Formation" (two lines) | "EIN letter (CP 575)" (two lines) |
| Value, 8 px below: Founders Grotesk Mono 14/20, `case` on, Plate Ink | "TWO SISTERS BAKERY LLC" ("TWO SISTERS / BAKERY LLC") | "EIN 00-0000000" (one line) |
| Body, 12 px below | Four text bars, 5 px tall, 10 px apart, Rule `#DDD7CB`, at 100%, 92%, 96% and 58% | The same, at 100%, 88%, 94% and 46% |

The issuer is a word and nothing more. No seal, crest, emblem, header block, signature, barcode,
form layout or any state or IRS styling (3.9).

**The envelope** (live SVG over the photograph, `aria-hidden`). A heavy white envelope in #10
proportion, 280 × 122, at picture x 464, y 452, lying face up and square to the frame; its right
54 px run into the bleed and are cropped by the viewport where there is no bleed. Face `#FFFFFF`,
1 px Rule edge, `--e-sheet`. It is CoFile's envelope, because the papers come back to the firm in
an email to the firm, and every email to the firm is in CoFile's look (decision 2, 10D.7): in its
upper-left corner, 20 px in and 18 px down, CoFile's horizontal lockup at 16 px tall in Plate Ink,
the lozenge in the letters' color as in mail (10D.4); and addressed, 28 px in from the left edge
and 52 px down, to "Harbor & Pine CPA" in Founders Grotesk Text Medium 16/22, Plate Ink, the name
set as content in CoFile's type, not the firm's. No street address (D4 gives none), no stamp, no
postmark, no window, no barcode. Hal's blind-stamped plate on the flap stays out: the foundation
drops the blind impression, and the lockup in the corner already says who sent it. Open,
the flap lies flat above the envelope's top edge: a triangle 280 wide and 52 deep, the paper's
inside in Cotton 2 `#F3F0E8` with a 1 px Rule edge, plain, with no security tint or pattern (3.9).
At the start of the motion the flap is folded behind the envelope and not visible.

**Shadows.** The live pieces lie on the photographed desk, not on the page, so they keep
`--e-sheet` in both modes; a paper being carried takes `--e-lift` (6.4).

**Label:** "Example record · sample documents", 12 px under the photograph's lower-left corner
(page x 630); the replay control at the right end of the row, aligned to c12's right edge (page x
1320), never in the bleed.

### Motion: "The order comes home" (about 2.3 s, once)

(Hal M5; the lift, arc and land from Jun M6; D3.)

**Starting frame**, set by script while the band is still below the fold: the record in place with
its header row, rule, title and filing line; the three dots as blind rings and the hairline plain;
the stage labels already readable; the envelope closed (flap folded behind); the two papers inside
it, hidden.

| t (ms) | Beat | Duration and easing |
|---|---|---|
| 0 | "Approved" dot: `press-in` (the ring's edge comes up, then the Verdigris ink) | 180 + 260 ms, `--ease-press` then `--ease-settle` |
| 240 | The 2 px Verdigris segment draws from the first dot to the second | 300 ms, `--ease-sweep`, `stroke-dashoffset` |
| 400 | "Submitted" dot: `press-in` | 440 ms |
| 640 | The second segment draws | 300 ms |
| 800 | "Filed" dot: `press-in` | 440 ms |
| 1000 | The envelope's flap opens on its hinge, the top edge: `rotateX` from folded-behind to flat (`perspective: 800px`); its shadow comes up as it lands | 500 ms, `--ease-settle` |
| 1350 | The Certificate of Formation rises 96 px straight up out of the envelope's mouth, masked by the envelope's face below the mouth line | 240 ms, `--ease-press` |
| 1470 | The IRS letter rises the same way | 240 ms |
| 1590 | The Certificate lifts (shadow to `--e-lift`), travels on a shallow arc to its place on the record (apex 24 px above the straight path; rotating to −2° at mid-flight and back to 0°, never more than 3°), and lands with a 2 px settle | 480 + 80 ms, `--ease-settle` |
| 1710 | The IRS letter does the same | 480 + 80 ms |
| 2150 / 2270 | As each card lands, its shadow crossfades to none and its 1 px Rule border comes up | 160 ms |

**At rest:** all three stages inked, the envelope open and empty, the two papers square on the
record. Nothing bounces, and "Filed" gets no stamp or burst (D2.6). Layering: each paper sits
between the flap's inside and the envelope's face until it clears the mouth, then moves above the
face. Only `transform`, `opacity` and `stroke-dashoffset` animate; about 6 KB in the shared motion
module. The papers' travel (about 460 px) is the exception D2 names to its 40 px limit on
distances: the documents rising out of the envelope.

**Reduced motion:** the final frame, with no beats. **Replay:** resets to the starting frame
instantly and plays once more.

### States

| State | What shows |
|---|---|
| Default: no JavaScript, reduced motion, or a deep link to `#after` | The final frame |
| Playing | The table above |
| Hover | Nothing. The picture is not interactive; the cursor stays an arrow |
| Dark mode | The photograph 4% darker, never tinted; the record, the cards and the envelope stay white (4.6); the h2 and list in Night Ink with Brass lozenges; the caption in `#A9ABB5` |
| Image still loading | A flat placeholder in the photograph's average walnut color at the frame's exact size, so nothing moves when it arrives; the live record and envelope sit on it from first paint |
| Spanish | The h2 and list run about 20% longer and simply take more lines; the picture's contents are example data and stay as they are |

### Desktop (1440)

```
 c1                  c4   c5   c6 (630)                                      c12 (1320)  1440
┌───────────────────────┬────┬──────────────────────────────────────────────────┬────────┐
│                       │    │ ┌──────────────── photograph C6, 810 × 640 ──────────────┐│
│ Then it's filed,      │    │ │  ┌──────── record 416 × 540 ───────┐   pen           ││
│ and the papers        │    │ │  │ [▭Co] CoFile [▲≈] Harbor & Pine CPA│               glasses
│ come back to you.     │    │ │  │ ─────────────────────────────── │                 ││
│   display-l 52/56     │    │ │  │ Two Sisters Bakery LLC          │                 ││
│                       │    │ │  │ New Jersey LLC formation        │                 ││
│ ◆ The state's         │    │ │  │ ●──────────●──────────●         │                 ││
│   documents, saved    │    │ │  │ Approved Submitted   Filed      │   ╱‾‾‾flap‾‾‾╲  ││
│   and sent to you     │    │ │  │ ┌──────────┐ ┌──────────┐       │ ┌────────────────┼┐
│ ◆ CoFile applies for  │    │ │  │ │New Jersey│ │IRS       │       │ │Harbor & Pine CPA│
│   the EIN and keeps   │    │ │  │ │Certificate│ │EIN letter│      │ └────────────────┼┘
│   the IRS letter      │    │ │  │ └──────────┘ └──────────┘       │          (cup)  ││
│ ◆ An update at each   │    │ │  └─────────────────────────────────┘                 ││
│   stage   list 19/28  │    │ └──────────────────────────────────────────────────────┘│
│                       │    │ Example record · sample documents                  [↻]  │
└───────────────────────┴────┴──────────────────────────────────────────────────┴────────┘
 128 above · 160 below · band height about 1,000 px
```

### Laptop (1024–1279)

The same arrangement on the narrower columns. The record narrows to 360 × 512 (32 px margins; the
header row's lockup at 18 px tall, so the account label still fits beside it; cards 140 × 186,
with "EIN 00-0000000" on two lines), the envelope to 220 × 96 at its right with its lockup at 14 px
tall and the address in Founders Grotesk Text Medium 15/20, and the photograph runs from c6 to the
viewport edge, cropping whatever passes it.

### Tablet (834)

Words first in c1–c8 (h2 at the tablet `display-l`, 44/48; list 19/28), 48 px, then the picture
full width, bleeding both edges at 834 × 600, in the desktop composition at the same sizes (record
at x 40, envelope at x 480), the label at the left margin under it.

### Phone (390)

```
┌──────────────────────────────┐
│ Then it's filed, and the     │  h2 34/38, balanced
│ papers come back to you.     │
│                              │  24
│ ◆ The state's documents,     │  list 18/26 Medium, 14 apart
│   saved and sent to you      │
│ ◆ CoFile applies for the EIN │
│   and keeps the IRS letter   │
│ ◆ An update at each stage    │
│                              │  40
├──────────────────────────────┤  photograph C6, phone crop, full bleed 390 × 640
│   ┌──── record 326 × 434 ───┐│  record at x 32, y 24; 20 px margins
│   │[▭Co] CoFile             ││  the desk's header: lockup 16 tall, then
│   │   [▲≈] Harbor & Pine CPA││  the account label at the row's right end,
│   │                         ││  logo 24, name 14/20 Medium (one row at
│   │ ─────────────────────── ││  390; two here for width); 1 px Plate Ink
│   │ Two Sisters Bakery LLC  ││  rule; title Miller Display 20/26
│   │ New Jersey LLC formation││
│   │ ●─────────●──────────●  ││  stage labels 14/20 Medium
│   │ Approved Submitted Filed││
│   │ ┌─────────┐ ┌─────────┐ ││  cards 135 × 176: issuer 14,
│   │ │New Jersey│ │IRS      │ ││  title 15/20 Medium, mono 14/20,
│   │ │Certifi-  │ │EIN letter│ ││  three text bars
│   │ └─────────┘ └─────────┘ ││
│   └─────────────────────────┘│
│        ╱‾‾‾‾flap‾‾‾‾╲        │
│       ┌────────────────────┐ │  envelope 220 × 96 at x 150, y 520;
│       │ Harbor & Pine CPA  │ │  CoFile's lockup 14 tall at its top left;
│       └────────────────────┘ │  address Founders Grotesk Medium 15/20
├──────────────────────────────┤
│ Example record · sample   [↻]│  label 12 below, 20 px inset
│ documents                    │
└──────────────────────────────┘
```

Words first, then the picture (6.6). The record and envelope are the product's phone sizes, never a
shrunk desktop picture. The motion is the same, the papers rising out of the envelope and travelling
up and to the left onto the record. Hal dropped the photograph on phones; it stays here, recomposed,
because on a phone the warm desk is most of what makes this the homecoming and not another card.

---

## 9.6 Coverage: "The filings your clients already ask you for."

**Copy, in order:** h2 "The filings your clients already ask you for." · lede "New York, New
Jersey, Florida and the IRS." followed by the link "See which are live today" (to `/what-we-file`)
· the four places and their filings by short name, from `web/lib/coverage.ts` with "Planned" types
left out, as the stand-in does · the legend "Live" / "Rehearsed to the payment screen" / "Screens
recorded or offered, rehearsal next".

**The idea: the shop's sample cards** (Hal). A stationer keeps a rack of sample cards, one for each
kind of thing the shop can make. Here there is one card per place, each listing what can be filed
there, each filing marked with a small plate glyph that is cut, then marked out, then inked as it
gets closer to live (4.5). It is the one band with no photograph and no example label: it is the
real list, read straight from the site's data, so a firm owner sees the filings their clients ask
for before they read a single status. Facts don't perform (Elaine): the cards are dealt once and
then hold still.

### The band

- Ground Cotton, with the texture. Spacing 128 above, 160 below.
- Arrangement B (6.5): the h2 and lede in c1–c8; the four cards across all 12 columns, one card per
  three columns; the legend under them.
- `id="coverage"`, as today.

### The words

- **h2** at `display-l` 52/56, Plate Ink, c1–c8 (792 px), `text-wrap: balance`: two lines, "The
  filings your clients / already ask you for."
- **Lede** 24 px below, `lede` (Miller Text 22/34), Plate Ink, max 34 em; one line at 1440. "See
  which are live today" is the link: Plate Ink, a 1 px Brass Line underline at a 3 px offset,
  thickening to 2 px Plate Ink on hover (4.8). It stays inline in the sentence, with no arrow.
- 48 px from the lede to the cards; 24 px from the cards to the legend.

### The picture: "The sample cards"

**What it shows.** Four cards dealt side by side in the stand-in's order, New York, New Jersey,
Florida, the IRS, each headed by the place's name and listing its filings with where each one
stands today. It is live data: the glyph of a filing type that the deployment switches live
(`isLive` in `coverage.ts`) inks to "Live" on the next build, with no design change, and the
section grows more confident as the beta goes on (Jun).

**Accessible name:** the four cards are a `section` labelled by the h2; each card is an `article`
headed by its place name (an h3); each list is a `ul`. No `figure`, because it is not an example.

**Each card.** White Sheet, square-cut (`--r-sheet`), `--e-sheet`, lying on Cotton (D1). 282 px
wide on desktop, 32 px padding (content 218 px). All four cards share the height of the tallest
(New York), so they read as one rack of cards; the IRS card simply has more paper under its one
line, like any card with one line on it (Hal, Jun, Tomás).

```
┌──────────────── 282 ────────────────┐
│  32                                  │
│  New York              display-m     │  Miller Display 36/42, Plate Ink
│  ──                    24 × 1 px     │  Rule Strong, 12 below the name
│                                      │  20
│  LLC formation                  ▭    │  row: ui 17/24 Plate Ink, padding 10 / 0
│  ──────────────────────────────────  │  1 px Rule between rows
│  Corporation formation          ▭    │
│  ──────────────────────────────────  │
│  Payroll registration           ▭    │  long names wrap; the glyph stays on
│  (NYS-100)                           │  the first line
│  ──────────────────────────────────  │
│  …                                   │
│  32                                  │
└──────────────────────────────────────┘
   name column 190 px · 12 px gap · glyph 16 × 10, right-aligned, 7 px from the line's top
```

- **The place name** at `display-m` (Miller Display 400, 36/42 desktop), Plate Ink, set like the
  name on a calling card. "IRS" is set exactly like the states. No state outlines, maps, flags,
  seals, capitols or state colors anywhere (3.9): the name alone is enough.
- **The short rule** 12 px under the name: 24 × 1 px, Rule Strong.
- **The rows**, 20 px under the rule: each filing type's short name in `ui` (Founders Grotesk Text
  17/24), Plate Ink, 10 px above and below, a 1 px Rule hairline between rows (none after the
  last). The glyph sits at the right edge, centred on the first line's x-height; a long name wraps
  in its 190 px column and the row grows (a one-line row is 44 px, a two-line row 68 px).
- **The rows, as the data gives them today:**
  - New York: "LLC formation", "Corporation formation", "Payroll registration (NYS-100)", "LLC
    changes and dissolution", "Copies and certificate of status", "Application for Authority",
    "Assumed name (DBA)"
  - New Jersey: "LLC formation", "Standing certificate", "Payroll registration (NJ-REG)",
    "Corporation formation"
  - Florida: "LLC formation", "Corporation formation", "Limited partnership"
  - IRS: "EIN, with the IRS letter"
- **Card height** at 1440: New York's seven rows (three of one line, four of two) give 32 + 42 + 12
  + 1 + 20 + 410 + 32, so all four cards are 552 px tall.

**The plate glyphs** (4.5), 16 × 10 px: the Name Plate's outline without screws, 45° chamfers with a
2 px leg, drawn in SVG on whole pixels.

| Status (from `statusOf`) | Glyph | Legend word |
|---|---|---|
| Live | Solid Verdigris `#2E6B57` plate with a 1 px Cotton line engraved across its middle, 3 px in from each end: inked | "Live" |
| "Rehearsed to the payment screen" | The outline in 1.5 px dashed Plate Ink, empty: marked out, the rehearsal mark at glyph scale (dash 3, gap 2, so every side shows at least one dash) | "Rehearsed to the payment screen" |
| "Screens recorded, rehearsal next" and "Offered, not yet rehearsed" | The outline in 1 px solid Graphite, empty: cut, not yet marked | "Screens recorded or offered, rehearsal next" |

Each glyph is `role="img"` with its row's full status label from `statusOf` as its accessible name
(so a screen reader hears "Offered, not yet rehearsed", the finer stage, where the legend groups
it). On a fine pointer, hovering a row for 400 ms shows the same label in a small tag 8 px above the
glyph: Plate Ink fill, Cotton text in `caption` 14/20, 6 × 10 px padding, `--r-sheet`, `--e-menu`,
fading in over 120 ms. Rows are not focusable and the cards are not links: the visible legend and
the accessible names carry the meaning, and the lede's link goes to the full table on What we file.

**Today's glyphs**, so the build can be checked against the data: New Jersey's "LLC formation" and
"Standing certificate" and all three Florida rows are dashed; every other row is the plain outline;
none is inked until a filing type is switched live.

### The legend

Under the cards, flush left at c1, one line on desktop: each glyph, 8 px, its label in `small`
(Founders Grotesk Text 15/23), Graphite; 32 px between items. "▬ Live · ⬚ Rehearsed to the payment
screen · ▭ Screens recorded or offered, rehearsal next" runs about 730 px. It always shows all three
marks, whatever today's data, because it explains the scale, not today's count.

### Motion: "Cards dealt" (640 ms, once)

(Hal M6, Jun M7; D3.) At 40% in view the four cards are dealt left to right: each rises 16 px into
place and fades in over 400 ms with `--ease-settle`, 80 ms apart (New York at 0, New Jersey 80,
Florida 160, IRS 240). Their contents travel with them; nothing inside a card moves, no glyph draws
or pops, and nothing moves afterwards. The replay control sits at the right end of the legend row,
aligned to c12 (D2.2). **Reduced motion:** the cards are in place.

### States

| State | What shows |
|---|---|
| Today | The glyphs as listed above |
| A filing type goes live | Its glyph inks; nothing else changes. All four cards fully inked is designed for, not a redesign |
| Hover on a row (fine pointer) | The status tag above the glyph; the row itself doesn't change |
| Dark mode | Cards on Night Card `#1F2230` (CoFile's own cards, 4.6) with `--e-sheet-dark`; place names and rows in Night Ink; hairlines `#323646`; the short rule `#6E7180`. Glyphs: Live a solid `#6FB39A` plate with a Night Card line; rehearsed, dashed Night Ink; recorded or offered, 1 px `#A9ABB5`. The status tag inverts: Night Ink fill, Night text |
| Spanish | Short names run longer and wrap onto more lines; the cards stay equal height and simply grow |

### Desktop (1440)

```
 c1 (120)                                                c8 (912)                    c12 (1320)
┌──────────────────────────────────────────────────────────┬──────────────────────────────┐
│ The filings your clients                    display-l 52/56                             │
│ already ask you for.                                                                     │
│ New York, New Jersey, Florida and the IRS. See which are live today     lede 22/34      │
│                                                                                    48    │
│ ┌──────────────────┐  ┌──────────────────┐  ┌──────────────────┐  ┌──────────────────┐ │
│ │ New York         │  │ New Jersey       │  │ Florida          │  │ IRS              │ │
│ │ ──               │  │ ──               │  │ ──               │  │ ──               │ │
│ │ LLC formation  ▭ │  │ LLC formation  ⬚ │  │ LLC formation  ⬚ │  │ EIN, with the  ▭ │ │
│ │ Corporation    ▭ │  │ Standing       ⬚ │  │ Corporation    ⬚ │  │ IRS letter       │ │
│ │ formation        │  │ certificate      │  │ formation        │  │                  │ │
│ │ Payroll regis- ▭ │  │ Payroll regis- ▭ │  │ Limited        ⬚ │  │                  │ │
│ │ tration (NYS-100)│  │ tration (NJ-REG) │  │ partnership      │  │                  │ │
│ │ LLC changes    ▭ │  │ Corporation    ▭ │  │                  │  │                  │ │
│ │ and dissolution  │  │ formation        │  │                  │  │                  │ │
│ │ Copies and     ▭ │  │                  │  │                  │  │                  │ │
│ │ certificate of   │  │                  │  │                  │  │                  │ │
│ │ status           │  │                  │  │                  │  │                  │ │
│ │ Application    ▭ │  │                  │  │                  │  │                  │ │
│ │ for Authority    │  │                  │  │                  │  │                  │ │
│ │ Assumed name   ▭ │  │                  │  │                  │  │                  │ │
│ │ (DBA)            │  │                  │  │                  │  │                  │ │
│ └──────────────────┘  └──────────────────┘  └──────────────────┘  └──────────────────┘ │
│   282 × 552 each, 24 px gutters                                                    24    │
│ ▬ Live    ⬚ Rehearsed to the payment screen    ▭ Screens recorded or offered,   [↻]    │
│   rehearsal next   (one line at 1440)                                                    │
└────────────────────────────────────────────────────────────────────────────────────────┘
 ▬ inked plate · ⬚ dashed plate · ▭ outline plate
```

### Laptop (1024–1279)

Four across on the narrower columns (about 214 px cards at 1024, 24 px padding); more names wrap
and the cards grow taller together.

### Tablet (834)

The h2 and lede across the full width; the cards two by two (365 px each, 24 px gutter; New York
beside New Jersey, Florida beside the IRS), each pair equal height; the legend under them, wrapping
to two lines.

### Phone (390)

```
┌──────────────────────────────┐
│ The filings your clients     │  h2 34/38
│ already ask you for.         │
│ New York, New Jersey, Florida│  lede 19/30, link inline
│ and the IRS. See which are   │
│ live today                   │
│                              │  32
│ ▬ Live                       │  legend first, one item per line,
│ ⬚ Rehearsed to the payment   │  small 15/23, 8 px apart
│   screen                     │
│ ▭ Screens recorded or        │
│   offered, rehearsal next    │
│                              │  24
│ ┌──────────────────────────┐ │  cards full width, 350 px, 20 px padding,
│ │ New York                 │ │  natural height on phones
│ │ ──                       │ │  place name 28/34
│ │ LLC formation          ▭ │ │  rows ui 17/24, most on one line
│ │ Corporation formation  ▭ │ │
│ │ Payroll registration   ▭ │ │
│ │ (NYS-100)                │ │
│ │ …                        │ │
│ └──────────────────────────┘ │
│                              │  16
│ ┌──────────────────────────┐ │
│ │ New Jersey               │ │
│ │ …                        │ │
└──────────────────────────────┘
```

On a phone the four cards stack to about 1,500 px, so the legend moves **above** them, where the
marks are explained before they are seen (Priya, Amara). The cards take their natural height (equal
heights only matter side by side). The deal becomes each card rising as it reaches 40% in view, same
timing; the replay control sits at the right end of the legend's first line.

---

## 9.7 Rehearsals: "In beta: rehearse a filing, free."

**Copy, in order:** h2 "In beta: rehearse a filing, free." · lede "CoFile fills in every screen of
the state's real website and stops before the last button: nothing is filed or paid. Filing types
go live one at a time." · inside the picture, the stand-in's log: "Rehearsal · New Jersey LLC
formation", "test details", then "Business name" filled, "Name check" passed, "Registered agent"
filled, "Members and signatures" filled, "Review page" matched the proof, "Payment: $103.50"
matches the proof, "Pay Now" held, on purpose · label "Rehearsal · nothing filed, nothing paid".

**The idea: house lights down; the run is cued** (Rosa, Tomás; the programme from Greta). The copy
calls a rehearsal the whole filing performed on the state's real website with no audience, so this
band is set where the copy puts it: an empty theatre after hours, one ghost light left burning on
the bare stage, and the rehearsal printed as the evening's run sheet, every screen cued line by
line. It is the only dark band on the home page, the house lights down for the one part of the
story that is a performance. The run sheet is a white sheet from CoFile's filing desk, with Harbor &
Pine named as the account: a rehearsal is the firm's own filing, run from the desk, and the desk,
like the stage, is CoFile's (decision 2). The last line, "Pay Now · held, on purpose", is cued
exactly like the six before it. The section sells a full run-through that costs nothing, not a
stop.

### The band

- Ground `--stage`: Night `#14161E` in light mode, deepened to `#0E1016` in dark mode so it still
  reads as a change of scene (4.6). The scanned black-card texture at 4% (screen). It is dark from
  its first frame: no scroll-linked color change, no fade from Cotton.
- Spacing 128 above, 160 below. The sticky header stays Cotton over it.
- Arrangement A (6.5): words in c1–c4 on the stage ground; the photograph and the run sheet in
  c6–c12, the photograph bleeding right. Type never sits on the photograph.
- `id="rehearsals"`, as today. No button: the copy gives this section none, and the header carries
  "Run a free rehearsal" here (Hal).

### The words

- **h2** at `display-l` 52/56, Night Ink `#ECE8DF` (14.8:1 on Night). On desktop and tablet the
  line breaks after the colon, "In beta:" on its own line, and the rest balances: "In beta: /
  rehearse a / filing, free." (Elaine's break at the colon, Greta's three lines). On phones
  `text-wrap: balance` alone.
- **Lede** 24 px below, `lede` 22/34, Night Ink, max 34 em. "CoFile" is `platformName()`.
- The column is vertically centred on the run sheet (6.2: a short column is never top-aligned with
  a void beneath it).
- No "free" highlighter, no underline on any word (Rosa: the headline already says it).

### The picture: "The run sheet, on an empty stage"

**What it shows.** A real small theatre seen from the back of the house, house lights off, a single
ghost light on a bare stage, the seats empty; and lying in its light, Harbor & Pine's run sheet for a
rehearsal of a New Jersey LLC formation, every line cued. **Accessible name** (the stand-in's):
"Example rehearsal log". The photograph's alt text is `[copy needed]` (D7, "the stage"); it carries
no caption of its own, since no photograph does (decision 15), and the run sheet's label is the
picture's. The run sheet's words are real text in reading order, as a list.

**The photograph (C7)**, desktop: a 3:2 crop of the 21:9 master, 810 × 540, from c6 to the viewport
edge, square-cut. What this layout needs from the brief:

- The ghost light (a bare bulb in a wire cage on a plain stand) at the left fifth of the frame, its
  bulb at about picture x 120, y 220, its stand reaching the boards at about y 380; its warm pool
  spreading across the boards toward the right.
- The fly space and the back wall in near-black across the top quarter; the backs of empty seats as
  soft silhouettes along the bottom (y 440–540), most visible at the lower left.
- Nothing that matters right of x 186 below y 168, where the run sheet lies.
- A 4:5 frame for phones with the ghost light close and centred (C7). Never text on the photograph;
  never an audience; no colored curtain or seats that would add a hue to the band; no
  red-white-and-blue, and no flags or emblems anywhere in the theatre (3.9).
- In dark mode, 4% darker, never tinted.

**The run sheet** (live HTML; the product's rehearsal log, set as a page of CoFile's filing desk
with Harbor & Pine as the account, in CoFile's look, decision 2).
480 × 604, at picture x 186 (page x 816–1296, so its right edge stays 24 px inside c12), y 168: it
lies across the lower part of the photograph and runs 232 px below it onto the stage ground, like a
programme set down on the lip of the stage (Rosa). Sheet `#FFFFFF`, `--r-sheet`, `--e-sheet-dark`
(a white sheet on Night, 6.4), 40 px margins (content 400 px).

| y in the sheet | Element | Spec |
|---|---|---|
| 40–84 | The desk's header row | As on the record (9.5): CoFile's horizontal lockup at 20 px tall at the left, its lozenge in Brass Line, `aria-hidden`; at the right end the account label, Harbor & Pine's square symbol at 24 × 24, 8 px, "Harbor & Pine CPA" in Founders Grotesk Text Medium 15/20, Plate Ink; both vertically centred in the row |
| 104 | CoFile's rule | 1 px Plate Ink, full content width (10C.1). No Firm Rule |
| 134–158 | The head | The ghost-light glyph (4.4) at 14 px in Plate Ink, 8 px, then "Rehearsal · New Jersey LLC formation" in Founders Grotesk Text Medium 18/24, Plate Ink |
| 162–182 | "test details" | `caption` 14/20, Graphite, aligned with the head's text |
| 198 | The rehearsal rule | 1.5 px dashed Plate Ink, dash 4, gap 3, full content width: the spike tape, "dashed means rehearsal" (4.4) |
| 208–572 | Seven cues | Rows of 52 px, below |
| 572–604 | Foot margin | 32 px |

**The cues.** Each row is the step, dot leaders, and its result on one shared baseline, the way a
printed programme or a table of contents is set (Greta, Rosa, Jun, Elaine):

```
Business name ································· filled
Name check ···································· passed
Registered agent ······························ filled
Members and signatures ························ filled
Review page ························ matched the proof
Payment: $103.50 ··················· matches the proof
Pay Now ····························· held, on purpose
```

- The step in `ui` (Founders Grotesk Text 17/24), Plate Ink, left; "$103.50" inside "Payment:
  $103.50" in tabular lining figures, still Founders (5.5).
- The result in `mono` (Founders Grotesk Mono 16/24), Plate Ink, right-aligned: a rehearsal's
  results are the machine's record of what it typed and saw, which is what mono means on this site
  (5.5).
- Leaders: Founders Grotesk Text periods at the row's size every 0.4 em, Rule Strong, 12 px clear
  of the words at each end, at least 40 px long; if a pair can't fit with 40 px of leader (Spanish,
  or a phone), the result drops to a second line, right-aligned, with the leader running in front
  of it.
- Row padding 14 px; no hairlines between rows (the leaders carry the line).
- **Every row is set the same.** No color, weight, glyph or rule singles out "Pay Now · held, on
  purpose": no Brass, no red, no special color on the last line (4.4), no hand, no stop sign
  (Hal, Rosa, Tomás).

**The ghost light's pool** (the one gradient on the site, 4.8): a radial from
`rgba(255,196,107,.16)` at its centre to transparent at 70%, an ellipse 560 × 260 px, drawn on a
layer clipped to the run sheet, so it reads as warm light falling on paper and never as a glow on
the dark ground. At rest it is widened to cover the whole sheet, centred on the cues, so no line
ends brighter than another. Plate Ink on the warmest point of the sheet stays above 14:1.

**Label:** "Rehearsal · nothing filed, nothing paid" in `caption`, `#A9ABB5` (7.9:1 on Night), 12 px
under the run sheet's lower-left corner, the replay control at the right end of the row aligned to
the sheet's right edge.

### Motion: "House lights down; the run is cued" (about 2.3 s, once)

(Rosa moment 7, Tomás M9, Greta's programme; D3.)

**Starting frame**, set by script while the band is below the fold: a `#0E1016` layer over the
photograph at 30% opacity (the house at 70% brightness); the run sheet in place with its
header row, rule, head, "test details" and dashed rule; the seven cues at opacity 0; the pool
hidden.

| t (ms) | Beat | Duration and easing |
|---|---|---|
| 0 | The ghost light comes up: the dark layer over the photograph fades from 30% to 0 (the photograph from 70% to 100%) | 1200 ms (`--t-light`), `--ease-sweep` |
| 600 | The pool appears, centred on the first cue | 260 ms opacity |
| 700 | Cue 1, "Business name · filled", sets: the row goes from opacity 0 to 1 and rises 2 px; its leader reveals left to right with it (a clip that scales from 0 to 1 on x) | 320 ms (`--t-set`), `--ease-settle` |
| 820 → 1420 | Cues 2 to 7 set the same way, 120 ms apart; the pool steps down to each cue as it sets (`translateY`, 120 ms, `--ease-settle`). "Pay Now · held, on purpose" sets at 1420 like every other cue | 320 ms each |
| 1740 | The pool widens to cover the whole sheet and comes to rest centred on the cues | 600 ms, `--ease-settle`, `transform: scale` |

Done at about 2.34 s. Only `transform` and `opacity` animate (the brightness change is an overlay's
opacity, not a filter). No flicker, no breathing bulb, no loop afterwards (D2.4).

**Reduced motion:** the photograph at full brightness, every cue in place, the pool at rest.
**Replay:** resets to the starting frame instantly and plays once more.

### States

| State | What shows |
|---|---|
| Default: no JavaScript, reduced motion, deep link | The final frame |
| Dark mode | The band at `#0E1016`; the photograph 4% darker; the run sheet stays white; the words in Night Ink |
| Light mode | The band is Night all the same: the theatre is always dark |
| Image still loading | The photograph's area in `#0E1016` with the ghost light's average warm tone as a flat 12% patch where the bulb will be; no shimmer |
| Spanish | The h2 and lede take more lines; cue words are example data from the stand-in and stay as they are |

### Desktop (1440)

```
 band --stage (Night), 128 above
 c1 (120)       c4 (504)   c6 (630)                                         c12 (1320)  1440
┌─────────────────┬───────┬─────────────────────────────────────────────────────────────────┐
│                 │       │ photograph C7, 3:2 crop, 810 × 540                               │
│                 │       │ ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓ fly space, near-black ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓ │
│                 │       │     ╭─╮                                                          │
│                 │       │     │●│ ghost light      ┌──────── run sheet 480 × 604 ────────┐  │
│                 │       │     ╰┬╯                  │ [▭Co] CoFile [▲≈] Harbor & Pine CPA │  │
│ In beta:        │       │      │                   │ ─────────────────────────────────── │  │
│ rehearse a      │       │ ░░░░░┴░░░ pool on the    │                                     │  │
│ filing, free.   │       │   boards                 │ ✧ Rehearsal · New Jersey LLC        │  │
│  display-l      │       │                          │   formation (one line at 18 px)     │  │
│                 │       │ ▀▄▀▄▀▄ seat backs ▀▄▀▄   │ test details                        │  │
│ CoFile fills in │       └──────────────────────────│ ╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌ │──┘
│ every screen of │                                  │ Business name ··············· filled│
│ the state's real│                                  │ Name check ·················· passed│
│ website and     │                                  │ Registered agent ············ filled│
│ stops before the│                                  │ Members and signatures ······ filled│
│ last button: …  │                                  │ Review page ······ matched the proof│
│ … one at a time.│                                  │ Payment: $103.50 · matches the proof│
│   lede 22/34    │                                  │ Pay Now ··········· held, on purpose│
│                 │                                  └─────────────────────────────────────┘
│                 │                                  Rehearsal · nothing filed, nothing  [↻]
│                 │                                  paid
└─────────────────┴─────────────────────────────────────────────────────────────────────────┘
 160 below · band height about 1,100 px · ✧ = the ghost-light glyph
```

### Laptop (1024–1279)

The run sheet narrows to 440 (32 px margins, content 376; the widest pair, "Payment: $103.50 ·
matches the proof", still fits with 40 px of leader) and anchors to c12's right edge; the
photograph runs from c6 to the viewport edge with its focal point at the ghost light
(`object-position: 15% 45%`), so the light stays visible left of the sheet.

### Tablet (834)

Words first in c1–c6, then 48 px, then the photograph full width bleeding both edges at 834 × 556,
and the run sheet (480) centred, lying across the photograph's lower 40% and running onto the stage
ground below it; the label under the sheet.

### Phone (390)

```
┌──────────────────────────────┐  band --stage
│ In beta: rehearse a filing,  │  h2 34/38, balanced, Night Ink
│ free.                        │
│ CoFile fills in every screen │  lede 19/30
│ of the state's real website  │
│ and stops before the last    │
│ button: nothing is filed or  │
│ paid. Filing types go live   │
│ one at a time.               │
│                              │  40
├──────────────────────────────┤  photograph C7, 4:5, full bleed 390 × 488
│           ╭─╮                │  the ghost light close and centred
│           │●│                │
│           ╰┬╯                │
│      ░░░░░░┴░░░░░            │
│ ┌──────────────────────────┐ │  run sheet 350 wide, rising 64 px into
│ │[▭Co] CoFile              │ │  the photograph's bottom edge (Rosa);
│ │    [▲≈] Harbor & Pine CPA│ │  20 px margins; header: lockup 16 tall,
│ │ ──────────────────────── │ │  account label logo 24, name 14/20 (one
│ │ ✧ Rehearsal · New Jersey │ │  row at 390; two here for width)
│ │   LLC formation          │ │  head 16/22 Medium, two lines
│ │ test details             │ │
│ │ ╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌ │ │
│ │ Business name ··· filled │ │  cues 48 px; step ui 17/24;
│ │ Name check ······ passed │ │  result mono 15/22; leaders at
│ │ …                        │ │  least 24 px on phones
│ │ Payment: $103.50 ·       │ │  a pair that doesn't fit drops its
│ │        matches the proof │ │  result to a second line
│ │ Pay Now · held, on purpose│ │
│ └──────────────────────────┘ │
│ Rehearsal · nothing filed,[↻]│
│ nothing paid                 │
└──────────────────────────────┘
```

Words first, then the picture (6.6); the photograph and the sheet are one picture, so nothing breaks
the rule that two pictures never touch. The motion is the same, the pool stepping down the cues on
the narrower sheet.

---

## 9.8 Pricing: "$45 a filing. EIN included with a formation."

**Copy, in order:** h2 "$45 a filing. EIN included with a formation." · the four items, as the
copy pairs them: "Pay as you go" / "per live filing"; "$25" / "an EIN on its own"; "$15" / "copies
and certificates"; "Plans from $250" / "a month for 6 filings" · "State fees separate. Rehearsals
free. See all plans" (the last three words link to `/pricing`) · "Social Security numbers encrypted
and deleted 30 days after the filing. Saved cards held in a card vault, never in our database.
Security" (the last word links to `/security`). Every figure is `usd()` over `web/lib/pricing.ts`
(`PRICING.payAsYouGo` and `startingPlan()`); if the figures change, the design doesn't.

**The idea: the price card** (Hal), with "$45" set as the biggest number on the page (Greta, and
all ten). A good stationer hands you a printed price card: heavy stock, figures you can read across
the room, dot leaders so the eye can't slip a line, and nothing in the small type but the shop's
name. A firm owner who has been quoted by consultants all their life sees "$45" set at 160 px and
understands that nobody is hiding anything. The price is the picture: no photograph, no
illustration, no badges, no "most popular", no strikethrough, no counting figures.

### The band

- Ground Cotton, with the texture. Spacing 128 above, 160 below.
- Arrangement C (6.5): centred. The h2 over the full content width; the price card centred in
  c3–c10 at 760 px; the two small lines centred under it.
- `id="pricing"`, as today.

### The headline

One h2, two sentences, one sentence per line; the figure simply set the size a price deserves (5.2
`price-xl`). The words are unchanged.

```
                    $45  a filing.                    ← line 1: "$" 96 px raised to cap height, hung;
                                                         "45" price-xl 160/144; "a filing." display-l
                                                         52/56 on the figure's baseline
          EIN included with a formation.              ← line 2: display-l 52/56, its baseline 72 px
                                                         below line 1's
```

- **Line 1**, "$45 a filing.": "45" in Miller Display 400 at `price-xl` (160 px, line height 144,
  −1.5%, lining figures). The "$" at 60% of the figure size (96 px), raised so its top meets the
  figures' cap height (5.4). A word space of 0.25 em at 52 px, then "a filing." in `display-l`
  (52 px) sitting on the same baseline as "45".
- **Line 2**, "EIN included with a formation.": `display-l` 52/56, its baseline 72 px below line 1's.
- **Centred** (the price card's headline is one of the ceremonial settings, 5.4). The "$" is left
  out of the centring and hangs to the left of it, so "45 a filing." is optically centred and the
  figure reads first as a number (5.4, Elaine, Greta). At 1440 line 1 is about 470 px wide and line
  2 about 720.
- Plate Ink throughout. No rule or underline under the figure, no Brass, no letterpress effect
  (5.4).
- **Markup:** each sentence a block-level span; the figure a span with `font-size` and the "$" a
  span of its own, so a screen reader reads "$45 a filing. EIN included with a formation." as
  written.

### The price card

**What it is.** The four price items as a printed price list on heavy card. Not a picture of a
product, so it carries no example label: these are the real prices.

- **Stock:** Sheet `#FFFFFF`, `--r-sheet`, and `--e-card`: the sheet shadow plus a 2 px Rule Strong
  edge line along the bottom and right, so it reads as 600 gsm card with thickness (Hal). The heavy
  card-stock scan (C12) at 2%, multiply, the only sheet on the site that carries a texture, because
  it is card, not paper; off with `prefers-reduced-transparency`, on low-power devices and in
  forced colors (4.8).
- **Size:** 760 × 452 at 1440, centred (page x 340–1100); 48 px inner margins (content 664 px).
- **Four rows**, 88 px each, separated by 1 px Rule hairlines across the content width; within a
  row, the left item, the leaders and the right item share one baseline, 60 px below the row's top.

```
┌──────────────────────────── 760 ────────────────────────────┐
│ 48                                                           │
│     Pay as you go ································ per live filing    │  88
│     ─────────────────────────────────────────────────────────│
│   $ 25 ········································ an EIN on its own    │  88
│     ─────────────────────────────────────────────────────────│
│   $ 15 ································· copies and certificates    │  88
│     ─────────────────────────────────────────────────────────│
│     Plans from $250 ······················· a month for 6 filings    │  88
│ 48                                                           │
└──────────────────────────────────────────────────────────────┘▌
 ▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀  2 px edge line
   the "$" of rows 2 and 3 hangs in the card's left margin, so "25", "15", "Pay" and "Plans" share
   one left edge
```

| Row | Left item | Right item |
|---|---|---|
| 1 | "Pay as you go" in `display-m` (Miller Display 400, 36/42), Plate Ink: it is a name, not a figure, so it is set smaller than the prices and reads as the headline's "a filing." carried on (Jun) | "per live filing" |
| 2 | "$25" at `price-l` (Miller Display 56/60, lining tabular figures), Plate Ink; the "$" at 60% (34 px) raised to cap height and hung in the card's margin | "an EIN on its own" |
| 3 | "$15", the same | "copies and certificates" |
| 4 | "Plans from $250": one `<b>` in two sizes on one baseline, "Plans from" in `display-m` 36 and "$250" at `price-l` 56, its "$" at 60% raised, not hung (it follows a word) (Rosa, Marcus, Dev) | "a month for 6 filings" |

- **The right items** in `lede` (Miller Text 400, 22/34), Graphite (7.0:1 on Sheet), right-aligned
  on the content edge. Roman, not italic: Miller Text Italic in Graphite is kept for "Ours in small
  type." alone (5.2).
- **The leaders:** Founders Grotesk Text periods at 18 px every 0.4 em (7.2 px), Rule Strong,
  running from 16 px after the left item to 16 px before the right item, on the shared baseline,
  `aria-hidden`. At least 40 px; under that the right item drops to a second line, right-aligned,
  with the leader in front of it (Hal's Spanish rule). At 1440 the shortest leader (row 4) is about
  125 px.
- **Markup:** the stand-in's `ul` of four `li`, each a `b` and a `span`; the leaders are generated
  boxes, so nothing extra is read aloud.

### The two small lines

- 32 px under the card, centred, `small` (Founders Grotesk Text 15/23), Graphite: "State fees
  separate. Rehearsals free. See all plans", with "See all plans" as a link (Plate Ink, Brass Line
  underline, 4.8).
- 12 px below it, the security line, **set exactly the same way**: same size, same color, same
  centring, max 64 ch (two lines at 1440), "Security" as the link. No icon, no lock, no shield, no
  box, no rule above it. It is there for the reader who looks for it, which is the point (Hal, 2.6).

### Motion

None. Nothing in this band moves, not even an entrance: a price that animates looks negotiable
(D2.5; Greta, Hal, Elaine, Marcus). The card is on the page at first paint like the words.

### States

| State | What shows |
|---|---|
| Default | As above, in every mode |
| Hover | Only the two links (underline 1 → 2 px, 120 ms). The card is not a link and doesn't lift |
| Dark mode | The card on Night Card `#1F2230` (CoFile's own card, 4.6), its edge line `#6E7180`, no card texture; the figures and names in Night Ink; the right items and small lines in `#A9ABB5`; leaders `#6E7180`; links Night Ink with a Brass underline |
| A plan or price changes | The figures follow `pricing.ts`; a four-digit figure ("$1,000") still fits row 4 with a 60 px leader, and the card never changes size |
| Spanish | The right items run longer; leaders shorten, then the right item drops to its own line, per row, without moving the others |
| Print | The card prints with a 1 px Plate Ink border instead of its shadow; the small lines print in full |

### Desktop (1440)

```
 band Cotton, 128 above
┌────────────────────────────────────────────────────────────────────────────────────────┐
│                                                                                        │
│                          $ 45  a filing.            "45" 160/144 · "a filing." 52/56   │
│                                                                                        │
│                  EIN included with a formation.     52/56                              │
│                                                                                 48     │
│        ┌────────────────── price card 760 × 452, c3–c10 ──────────────────┐            │
│        │   Pay as you go ······························ per live filing   │            │
│        │   ─────────────────────────────────────────────────────────────  │            │
│        │ $ 25 ································· an EIN on its own        │            │
│        │   ─────────────────────────────────────────────────────────────  │            │
│        │ $ 15 ··························· copies and certificates        │            │
│        │   ─────────────────────────────────────────────────────────────  │            │
│        │   Plans from $250 ··················· a month for 6 filings      │            │
│        └──────────────────────────────────────────────────────────────────┘▌           │
│         ▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀              │
│                                                                                 32     │
│                  State fees separate. Rehearsals free. See all plans          small    │
│           Social Security numbers encrypted and deleted 30 days after the     small    │
│           filing. Saved cards held in a card vault, never in our database.             │
│                                       Security                                         │
└────────────────────────────────────────────────────────────────────────────────────────┘
 160 below · band height about 1,020 px
```

### Laptop (1024–1279)

The same, with `price-xl` at the clamp's value (about 128 px at 1024) and the card at 760 or the
width of c3–c10, whichever is less (about 700 at 1024, 40 px margins).

### Tablet (834)

Centred. "45" at 120/108, the "$" at 72; "a filing." and line 2 at the tablet `display-l` 44/48.
The card 680 px wide, centred, 40 px margins, rows 80 px; left items at `display-m` 32/38 and
`price-l` 48/52; right items in `lede` 21/32. The small lines centred, max 56 ch.

### Phone (390)

```
┌──────────────────────────────┐
│ $45 a filing.                │  "45" 88/80, "$" 53 raised (not hung);
│                              │  "a filing." 34/38 on the figure's baseline
│ EIN included with a          │  line 2 34/38, balanced
│ formation.                   │
│                              │  32
│ ┌──────────────────────────┐ │  card full width, 350; 20 px padding;
│ │ Pay as you go            │ │  --e-card
│ │ per live filing          │ │  left item display-m 28/34
│ │ ──────────────────────── │ │  right item lede 19/30, Graphite, 4 below
│ │ $25                      │ │  price-l 44/48
│ │ an EIN on its own        │ │
│ │ ──────────────────────── │ │  rows: 16 px above and below,
│ │ $15                      │ │  1 px Rule between
│ │ copies and certificates  │ │
│ │ ──────────────────────── │ │
│ │ Plans from $250          │ │  "Plans from" 28 · "$250" 44, one baseline
│ │ a month for 6 filings    │ │
│ └──────────────────────────┘▌│
│                              │  24
│ State fees separate.         │  small 15/23, left-aligned
│ Rehearsals free. See all     │
│ plans                        │
│ Social Security numbers      │  12 below; set the same way
│ encrypted and deleted 30 days│
│ after the filing. Saved cards│
│ held in a card vault, never  │
│ in our database. Security    │
└──────────────────────────────┘
```

Left-aligned on phones (6.5). The rows stack, left item over right item, with no leaders: at 310 px
the leader would be a few dots between a figure and a wrapped line, and the stacked list reads more
plainly (Jun). "$45 a filing." stays on one line (about 285 px).

---

## 9.9 Close: "Run one rehearsal. Then decide."

**Copy, in order:** h2 "Run one rehearsal. Then decide." · lede "Try it on a filing you know by
heart. Questions? hello@cofile.app" (the address is `supportEmail()`, a `mailto:` link) · the
optional firm-name field, label `[copy needed]` (D7) · button "Run a free rehearsal" (to
`/signup`).

**The idea: your name on the plate** (Hal's empty plate; Marcus's typing onto a plate; Elaine's
name carried into sign-up; Dev's and Priya's plate and frame left waiting). The page ends on the
door it showed in Firms, Harbor & Pine's, in the same late sun, with the brass plate **blank**: the
name taken off, waiting. Nobody needs to explain it. Beside it, in the Close's panel, one optional
field. As the visitor types their own firm's name, each letter is cut into the brass and filled
black, the way Harbor & Pine's was; and when they press "Run a free rehearsal", the name is already
on the plate at sign-up. "Say yes, under your own name", one last time, without a word added. If
they don't type, it is an empty plate in good light, and that is the invitation.

### The band

- **The photograph is the band:** C3, full bleed, edge to edge, its height `clamp(600px, 52.8vw,
  860px)` (760 px at 1440), `object-fit: cover` with its focal point on the plate. Dark mode uses
  C4 (D1).
- **The panel:** a Cotton panel in c1–c5 carries the words, the field and the button, so type
  never sits on the photograph (Hal, 6.5).
- **Spacing:** the band has no padding of its own; Pricing's 160 px sits above it and the footer
  follows directly below.
- **One Brass button per screen.** While the Close's button is at least 50% in view, the header's
  "Run a free rehearsal" crossfades back to its outline style (200 ms), exactly as it is while the
  hero's button is in view (4.8). The phone's sticky bar slides away while the Close's button is on
  screen and whenever the field has focus (6.7).
- No `id` today; none needed.

### The photograph (C3; C4 in dark mode)

**What it shows.** Harbor & Pine's door from C1, the same lock-off and light, with the brass plate
blank: chamfered corners, two screws with their slots level, the bevel catching the late sun from
the left, the face clean and evenly lit. It carries no caption: no photograph does (decision 15),
and this one shows no firm (Marcus). Its alt text is `[copy needed]` (D7, "the blank plate"), and
it stays the same once a name is engraved, because the field holds the name.

**What this band needs from the brief** (for the art-direction writer):

- **Desktop frame:** the medium-close frame, the plate's face about 25% of the frame's width
  (360 × 144 px at 1440), its centre at 76% across and 47% down. To its left, the door's edge and
  moulding in harbor-blue black and the brick, plain enough to sit behind the panel (the panel
  covers 8% to 42% of the width at 1440). Master at least 2880 × 1520.
- **The face:** no glare spot and no reflection of the photographer where the letters will go; the
  engraving field must be lit evenly enough that cut letters read anywhere on it.
- **Registration:** the plate shot square-on (C1's note), and for every delivered frame the plate
  face's four corners recorded in that frame's pixel coordinates, so the engraving lands in exact
  register.
- **Light probes:** the HDRI from the plate's position in the C1/C3 session, and a second probe for
  C4's dusk frame.
- **Other frames:** a 3:2 crop for tablets; a 4:5 phone frame with the plate about 72% of the
  frame's width, centred 55% down; and C4, the same frames thirty minutes after sunset with the
  lights-on pass (warm light from the transom, the plate catching the street light).
- **Delivery:** AVIF with a WebP fallback, about 240 KB at 1440 × 760 @2x; loaded lazily one screen
  ahead; until it arrives, a flat placeholder in its average color at the exact size.

### The panel

Cotton `#FBFAF6` with the cotton texture, `--r-sheet`, `--e-sheet`; c1–c5 (page x 120–606, 486 px),
48 px padding (content 390 px); vertically centred on the photograph (top at 90 px at 1440).

| Order | Element | Spec | Space after |
|---|---|---|---|
| 1 | **h2** "Run one rehearsal. Then decide." | `display-l` 52/56, Plate Ink. Each sentence a block-level span (5.4); the column can't hold "Run one rehearsal." on one line at 52 px, so the first sentence balances onto two: "Run one / rehearsal. / Then decide." | 24 |
| 2 | **Lede** "Try it on a filing you know by heart. Questions? hello@cofile.app" | `lede` 22/34, Plate Ink; the address a link (Plate Ink, Brass Line underline, 4.8) | 32 |
| 3 | **Field label** `[copy needed]` | `label` (Founders Grotesk Text Medium 16/22), Plate Ink | 8 |
| 4 | **The field** | Below | 16 |
| 5 | **Button** "Run a free rehearsal" | The primary button, 56 px: Brass fill, Plate Ink text in `button-l` 18/24, `--chamfer`, 28 px side padding, left-aligned; hover Brass Deep (`--t-quick`); press the 1 px deboss (D2) | — |

Panel height about 580 px at 1440. The button is the page's last and is the same as the hero's: the
page opens and closes on the same action (Elaine).

### The field

- **Look:** 390 × 56, Sheet fill, 1 px Rule Strong border (3.7:1, 6.4), `--r-sheet`, 16 px side
  padding, text in `input` (Founders Grotesk Text 18/24) Plate Ink. Hover: the border goes
  Graphite. Focus: the standard ring, 2 px Plate Ink offset 2 px from a 2 px white ring (D5),
  instant. No placeholder text (placeholders vanish when you type, and they are copy).
- **What it is in markup:** a labelled `input type="text"`, deliberately **not** inside a form and
  with no `name`, so it can never be submitted anywhere. `autocomplete="organization"`,
  `autocapitalize="words"`, `spellcheck="false"`, `maxlength="60"`, `enterkeyhint="go"`.
  `aria-describedby` points to a visually hidden description of the plate (`[copy needed]`, D7).
  Optional, so no required marker and no error state, ever.
- **Enter** in the field follows the Close's button to `/signup`, with no query string.
- **Shown only with JavaScript** (the name can only travel through the browser's storage): it is in
  the markup but hidden unless the small inline script in the head has marked the page as scripted
  before first paint, so it never pops in and the panel never shifts. Without JavaScript the panel
  is the words and the button.
- The canvas or SVG on the plate is `aria-hidden`: the field is the real thing, and it echoes what
  is typed as any field does. Nothing is announced per keystroke.

### The moment: your name on the plate

**What the visitor sees.** They click or tap the field and type. Each letter is cut into the brass
as they type it: the groove opens, a glint runs along the floor of the cut, and the letter fills
black, so their name looks exactly as Harbor & Pine's did on its door in Firms. The name stays
centred on the plate as it grows; a long name steps down in size and moves onto two lines, the way
an engraver would lay it out. When they stop for a moment, the late sun rakes across the plate once.
Deleting fills the letters back in. If they clear the field, the plate is blank again. Then "Run a
free rehearsal", and at sign-up the name is in "Firm name" and on the same plate.

#### Lettering

- **Face:** Miller Display Roman 400, the engraver's Scotch roman the Name Plate's "Co" and the
  wordmark are drawn from (3.3, 5.1). The Close and sign-up are CoFile's own pages, and a stationer
  cuts a new plate in the house roman until the firm chooses its own face (see
  `DECISIONS.md`).
- **The firm-name rules of 3.5 apply to whatever is typed:** the "&" in Miller Display Italic
  ("Harbor *&* Pine CPA", Greta, Elaine); credentials ("CPA", "CPAs", "LLC", "LLP", "PC", "PLLC",
  "Inc.", "& Co.") in Miller's small capitals, or at 88% with +0.04 em where a cut lacks them.
- **As typed:** never forced to capitals or any other case ("you don't change a person's name to
  fit a style", Hal). Tracking +3%, kerning on, centred.
- **Characters:** Latin and Latin Extended-A (the site's subsets, 5.1: "Muñoz", "Gonçalves"), digits
  and `& . , ' ’ - – ( ) /`. Anything else (an emoji, another script) is left off the plate and
  kept in the field.
- **A short list of slurs and obscenities**, shared with sign-up's plate: while the field contains
  one, the plate stays blank; the field is untouched (Elaine). It keeps any screenshot of the plate
  fit to share.

#### Fitting the name to the plate

On the plate's 40 × 16 unit grid (3.2), the engraving field is 27 × 9 units, from x 6.5 to 33.5
and y 3.5 to 12.5, clear of the screws (centres at x 4.5 and 35.5, radius 1.1) by at least a unit.

| Name | Layout | Cap height (units) | At 1440 (9 px a unit) |
|---|---|---|---|
| Fits on one line at cap 2.0 or more | One line, centred | As large as fits, at most 3.0 | 18–27 px caps |
| Doesn't | Two lines, balanced at a word space: "&" stays with the word after it, a credential with the word before it, and no line is a single short word where another break exists | As large as fits, 2.2 to 1.6; line pitch 1.9 × cap | 14–20 px caps |
| Doesn't fit two | Three lines, the same rules | 1.6 to 1.3 | 12–14 px caps |
| One word too long at the minimum | Tracking drops to 0, then that line scales to fit | — | — |

For checking: "Harbor & Pine CPA" sets on one line at cap 2.2 units (about 20 px caps on the
desktop plate). Sixty characters always fit on three lines. On a phone the plate's lettering can go
as small as 9 px caps: it is decoration of the field's value, and the field always holds the
legible text.

#### The cut: timings

| Event | What happens | Duration and easing |
|---|---|---|
| A letter typed (input debounced 30 ms, Hal M9) | The groove opens from nothing to full depth; a glint runs along the floor of the cut; then the black fill wicks in (Marcus) | 90 ms `--ease-press`; 60 ms glint; 120 ms fill, `--ease-settle`. About 270 ms; fast typing overlaps letters |
| Every keystroke | Letters already cut slide to their new centred positions | 120 ms, `--ease-settle` |
| The layout steps (one line to two, a cap-height step) | The whole name crossfades from the old layout to the new; nothing is re-cut | 160 ms |
| A letter deleted | Its fill and groove recede together, leaving clean brass | 60 ms |
| Paste or autofill | The whole name is cut left to right, 40 ms a letter | At most 1.2 s in all |
| 700 ms after the last keystroke | The late sun rakes across the plate once, left to right | 1200 ms (`--t-light`), `--ease-sweep`; at most once every 6 s |
| The field cleared | The letters fill back in right to left, 40 ms apart; the plate is blank | At most 600 ms |

**The look of the cut:** a V-groove generated from the name's signed-distance field (the profile a
burin leaves, Hal 7.4), its walls lit by the door's HDRI so the cut catches the sun, its floor
filled with black enamel (Plate Ink `#1D2130` at 90%, a hairline of brass showing at the groove's
lit lip), matching the hand-engraved "Harbor & Pine CPA" in C1. No glow, no gold-foil effect, no
outline (3.2).

**Reduced motion:** every change appears at once, fully cut and filled; no glint, no raking light.

#### Rendering, in three tiers

1. **WebGL2** (D2): loads once the Close is within one screen, on devices reporting
   `deviceMemory ≥ 4` and not in Save-Data mode. Written in raw WebGL2, one shader over the plate's
   rectangle, no three.js, at most 40 KB of script gzipped (D2's cap per moving picture), plus a
   glyph SDF atlas (Miller Display Roman, its Italic "&", small capitals; Latin and Latin
   Extended-A) of about 70 KB, built at deploy. Lit with the C1/C3 HDRI, or the C4 probe in dark
   mode. The canvas shares the photograph's transform, so the push-in and every crop keep it in
   register.
2. **SVG** (everyone else): the same layout as SVG text over the plate's face, the cut drawn with
   `feSpecularLighting` over the text's alpha and the fill at 88% Plate Ink; a letter's cut is a
   90 ms fade with a 1 px inset shift; the raking light a moving gradient mask (a transform). About
   4 KB.
3. **No JavaScript:** no field; the blank plate, the words and the button. Screenshots, the social
   card and print use the blank plate.

#### The name stays in the browser

(D3: the name lives only in the visitor's browser and is never sent until they submit sign-up.)

- **Where:** `sessionStorage`, one key (for example `cofile.firmName`), holding the field's value
  trimmed, 60 characters at most. Written 300 ms after typing settles and on `pagehide`; removed
  when the field is emptied. Every read and write is wrapped in `try`/`catch`; where storage is
  blocked (some private windows), the moment still works on the page and simply doesn't carry.
- **Never sent:** not in a form, a URL, a cookie, an analytics event or a session recording. The
  field carries the analytics tool's do-not-record attribute and is excluded from autocapture.
  Analytics may count that the field was used, never what was typed.
- **Every "Run a free rehearsal"** on the site (the hero's, the header's, the sticky bar's, the
  Close's) leads to the same sign-up, which reads the key, so it doesn't matter which one they
  press.
- **Coming back** to the home page in the same tab: the field is pre-filled and the plate shows the
  name already cut, with no animation and no push-in.
- **A new tab or a new visit** starts blank (`sessionStorage`, not `localStorage`).

#### Carried into sign-up: "It's already yours"

The sign-up page's layout is section 10's (6.8: a 560 px card and a side panel holding the blank
plate). What arrives there from the Close:

- On load, if the key holds a name and "Firm name" is empty, "Firm name" is pre-filled with it. Not
  focused: focus goes where the page normally puts it.
- The side panel's plate (C3 in the panel's crop, the same engraving engine and lettering) shows the
  name **already cut**, with no cut animation; 300 ms after load the late sun rakes across it once
  (1200 ms). Reduced motion: no light, the name simply there.
- Typing in "Firm name" keeps cutting with the same timings (Hal M9) and writes back to the same
  key, so a visitor who goes back to the home page finds the two in step.
- The key is deleted once sign-up succeeds. The only way the name ever reaches the server is as
  "Firm name" in the sign-up form the visitor submits.
- Between the pages, the standard cross-document View Transition (the header still, the content
  crossfading in 200 ms, D2). The plate doesn't fly between pages: the two crops differ, and the
  name already being there is the surprise.

#### On a phone: the plate comes to you while you type

On a phone the photograph comes first and the field sits under the h2 and lede, so when the
keyboard rises the plate has scrolled out of sight. So, while the field has focus and less than half
of the photograph's plate is inside the visual viewport, a **plate strip** docks 8 px under the
header: 350 × 140 (2.5:1), a crop of the same photograph around the plate carrying the same live
engraving, `--r-sheet`, `--e-menu`, centred with 20 px margins. It fades in over 160 ms (opacity
only) and out on blur or as soon as the photograph's plate is back in view. It is positioned with
the `visualViewport` API so the keyboard never covers it, and it overlays the page: no layout shift
and no scrolling done for the visitor (D2.3). `aria-hidden`. Where `visualViewport` isn't supported
there is no strip, and the visitor sees the plate when the keyboard closes. Touch tablets get the
same strip.

### Motion at rest: the push-in

At 40% in view, the photograph and its engraving layer scale from 1.00 to 1.03 over 8 s with
`--ease-settle`, around the plate's centre, once (Hal M8, D2.7): a slow camera move with nothing
else moving. The panel never moves. It doesn't run with reduced motion or when a stored name is
already on the plate, and it doesn't stop if the visitor starts typing. **No replay control here:**
the only motion that carries meaning is the cut, and the field replays it whenever they type.

### States

| State | What shows |
|---|---|
| Default (blank) | The photograph with the blank plate; the field empty |
| Field focused, empty | The focus ring; the plate blank; on a phone, the plate strip docks |
| Typing | Each letter cut as typed (the table above) |
| Name on the plate, field blurred | The name stays cut; the raking light once, 700 ms after the last keystroke |
| A long name | Two or three lines on the plate; the field scrolls its text as fields do |
| Characters the plate can't cut | Left off the plate, kept in the field |
| A listed word in the field | The plate stays blank until it's gone |
| Back in the same tab | Field pre-filled, plate already cut, no push-in |
| Reduced motion | Changes appear at once; no push-in, glint or raking light |
| No WebGL | The SVG tier, same layout |
| No JavaScript | No field; the blank plate, the words, the button |
| Storage blocked | Works on the page; nothing carries to sign-up |
| Dark mode | C4 (dusk, lights on); the panel in Night `#14161E` with `--e-sheet-dark`; h2 and lede in Night Ink; the field on Night Card `#1F2230` with a `#6E7180` border and Night Ink text; the Brass button with Night text (8.3:1); the cut lit by the dusk probe, letters still filled black |
| Spanish | The h2 and lede take more lines; the panel grows and the photograph's height follows (at least the panel's height plus 96 px) |
| Print | The photograph and the field are left out; the words print |

### Desktop (1440)

```
 Pricing above (160) · no band padding · the footer follows
┌──────────────────────────────────────────────────────────────────────────────────────────┐
│ photograph C3, full bleed, 1440 × 760: the harbor-blue door's edge and moulding at left, │
│ brick, late raking sun from the left                                                     │
│  ┌──────── Cotton panel, c1–c5, 486 × 580 ────────┐                                       │
│  │ 48                                              │                                      │
│  │ Run one                                         │                                      │
│  │ rehearsal.                       display-l      │                                      │
│  │ Then decide.                     52/56          │         ╱‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾╲    │
│  │                                                 │        │ (⊖)                  (⊖) │   │ plate face
│  │ Try it on a filing you know by                  │        │       (blank brass)      │   │ 360 × 144,
│  │ heart. Questions?                lede 22/34     │        │                          │   │ centre at
│  │ hello@cofile.app                                │         ╲________________________╱    │ 76% · 47%
│  │                                                 │                                      │
│  │ [copy needed: field label]       label 16/22    │                                      │
│  │ ┌─────────────────────────────────────────────┐ │                                      │
│  │ │                                             │ │ 56                                   │
│  │ └─────────────────────────────────────────────┘ │                                      │
│  │ ┌──────────────────────┐                        │                                      │
│  │ │ Run a free rehearsal │  Brass, 56             │                                      │
│  │ └──────────────────────┘                        │                                      │
│  │ 48                                              │                                      │
│  └─────────────────────────────────────────────────┘                                      │
└──────────────────────────────────────────────────────────────────────────────────────────┘

 with a name typed (the plate only):
                                                                ╱‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾╲
                                                               │ (⊖)  [the visitor's  (⊖) │
                                                               │       firm name]         │
                                                                ╲________________________╱
                                                      cut into the brass, filled black, centred
```

### Laptop (1024–1279)

The panel widens to c1–c6 (about 476 px at 1024) with 40 px padding, so the h2 and the field keep a
comfortable measure; the photograph's height is at least the panel's plus 96 px, and its focal point
keeps the plate in the right third.

### Tablet (834)

The phone order: the photograph first, a 3:2 crop at 834 × 556 with the plate in its right half;
then the words on Cotton in c1–c6 (max 560 px), the field at most 480 px wide, the button at its
natural width. The plate strip docks on touch tablets.

### Phone (390)

```
┌──────────────────────────────┐
│ photograph C3, 4:5,          │  390 × 488, full bleed; the plate about
│ full bleed                   │  280 px wide, centred 55% down
│                              │
│   ╱‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾╲   │
│  │ (⊖)               (⊖) │  │
│  │     (blank brass)      │  │
│   ╲______________________╱   │
│                              │
├──────────────────────────────┤  Cotton, 32 above, 20 px margins
│ Run one rehearsal.           │  h2 34/38: one sentence a line
│ Then decide.                 │
│ Try it on a filing you know  │  lede 19/30, 16 below the h2
│ by heart. Questions?         │
│ hello@cofile.app             │
│                              │  24
│ [copy needed: field label]   │  label 16/22
│ ┌──────────────────────────┐ │  field, full width, 56
│ └──────────────────────────┘ │
│ ┌──────────────────────────┐ │  16; the button full width, 56
│ │   Run a free rehearsal   │ │
│ └──────────────────────────┘ │
│                              │  80
└──────────────────────────────┘

 while the field has focus and the keyboard is up:
┌──────────────────────────────┐
│ header, 64                   │
│ ┌──────────────────────────┐ │  the plate strip, 350 × 140, docked
│ │  ╱‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾╲   │ │  8 px under the header, the name cut
│ │ │ (⊖) [the name]  (⊖) │  │ │  live as it's typed
│ │  ╲___________________╱   │ │
│ └──────────────────────────┘ │
│ …lede…                       │
│ [copy needed: field label]   │
│ ┌──────────────────────────┐ │
│ │ the name|                │ │
│ └──────────────────────────┘ │
├──────────────────────────────┤
│ keyboard                     │
└──────────────────────────────┘
```

The photograph comes first on phones (6.5); the words, field and button follow on Cotton, and the
sticky bar stays away while the Close's button is on screen or the field has focus. Every tap
target is 48 px or more.

---

## 9.10 Footer

**Copy, in order** (`Shell.tsx`): "CoFile · the filing desk behind your firm" · "New York · New
Jersey · Florida · IRS" · "Building a filing product? CoFile for platforms" (the last three words
link to `/platforms`) · "CoFile is not a law firm or a government agency, isn't affiliated with any
state or the IRS, and doesn't give legal or tax advice." · "Terms · Privacy · Security · FAQ ·
hello@cofile.app" (each a link; the address `supportEmail()`) · and one control this design adds,
the appearance switch, `[copy needed]`.

**The idea: the foot of the letterhead** (Hal). CoFile's own pages end the way a good letterhead
does, with a thick-and-thin rule and the house's name and address line set small and well. It is
the one place CoFile uses the rule device for itself (D5). No giant wordmark, no sitemap, no social
icons, no newsletter box: the brand is confident being small (Dev).

### The band

- Ground Cotton 2 `#F3F0E8`, full bleed, no texture. It follows the Close's photograph directly.
- Padding 64 px above the rule, 48 px below the last line, plus `env(safe-area-inset-bottom)`.
- The same footer on every page that uses the Shell: the home page, the seven pages behind it and
  the account pages. The filing desk and the dashboard are in CoFile's look too, but they end on
  their own app shell (10B.3, 10C.2) and never take this footer. Client pages have no CoFile footer
  and show nothing of CoFile except counsel's authorization text on the client form ("{firm},
  filing through CoFile", decision 12).

### Desktop (1440)

```
 Cotton 2 · 64 above the rule
 c1 (120)                                         c6 | c7 (732)                          c12 (1320)
 ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━  3 px Plate Ink
 ─────────────────────────────────────────────────────────────────────────────────────────────  2 px gap, 1 px
                                                                                           40
 [▭Co] CoFile · the filing desk behind your firm      New York  ·  New Jersey  ·  Florida  ·  IRS
  lockup 24 px · ui 17/24                              Building a filing product? CoFile for platforms
                                                                                           48
 CoFile is not a law firm or a government agency,     Terms · Privacy · Security · FAQ ·
 isn't affiliated with any state or the IRS, and      hello@cofile.app
 doesn't give legal or tax advice.   small 15/23                                           24
                                                      [copy needed: appearance] ( ◦ ) ( ◦ ) ( ● )
                                                                                           48
```

- **The rule** across the content width (c1–c12, 1200 px): 3 px Plate Ink, a 2 px gap, 1 px Plate
  Ink. 40 px below it, the first row.
- **Row 1, c1–c6:** the horizontal lockup at 24 px tall (the plate in Plate Ink, then the wordmark;
  the lozenge in Brass Line, 3.3), followed on the wordmark's baseline by "· the filing desk behind
  your firm" in `ui` 17/24, Plate Ink. The wordmark is `role="img"` named "CoFile"
  (`platformName()`), so the line reads as the copy writes it. Not a link: the header's lockup is
  the way home.
- **Row 1, c7–c12:** "New York · New Jersey · Florida · IRS" in `ui` 17/24, Graphite, its middots
  set with 0.6 em either side, the way an address line is set at the foot of a letterhead (Hal);
  8 px below, "Building a filing product? CoFile for platforms" in `ui` 17/24, Plate Ink, with
  "CoFile for platforms" as the link.
- **Row 2**, 48 px below: in c1–c6 the legal line in `small` 15/23, Graphite, max 60 ch (three
  lines); in c7–c12 the links in `small` 15/23, Plate Ink, underlined in Brass Line (4.8), the
  middots in Graphite with 12 px either side, `aria-hidden`; each link's hit area padded to 48 px
  tall.
- **The appearance switch**, 24 px under the links in c7–c12: the site follows the device's setting,
  with this as the manual override (`data-theme`, 4.6). A group label in `small` Graphite, then a
  radio group of three segments, 40 px tall, `button-s` 16/20 in Plate Ink: each segment with
  `--chamfer` corners and a 1 px Rule Strong border on transparent, the chosen one with a 1.5 px
  Plate Ink border and a Sheet fill. Labels `[copy needed]`; "follow the device" is the default.
  The choice is a per-viewer convenience kept in `localStorage` (wrapped in `try`/`catch`) and
  applied by a small inline script before first paint, so the page never flashes the wrong mode.

### States

| State | What shows |
|---|---|
| Links | Hover: the underline thickens to 2 px and turns Plate Ink (120 ms); focus: the standard ring |
| Dark mode | Night 2 `#1A1D27`; the rule in Night Ink; the plate in Brass (3.2) and the wordmark in Night Ink with a Brass lozenge (3.3); text in Night Ink and `#A9ABB5`; links Night Ink with a Brass underline; the switch's borders `#6E7180`, the chosen segment on Night Card |
| Spanish | Lines wrap longer; the two columns keep their split |
| Print | The rule and the text print; the switch doesn't |

### Tablet (834)

The same two columns on the 8-column grid (c1–c4 and c5–c8), the rule across the full content
width, 56 px above it.

### Phone (390)

```
┌──────────────────────────────┐  Cotton 2, 48 above the rule
│ ━━━━━━━━━━━━━━━━━━━━━━━━━━━━ │  the rule, full content width
│ ──────────────────────────── │
│                              │  32
│ [▭Co] CoFile · the filing    │  lockup 24; the line wraps under it
│ desk behind your firm        │
│                              │  24
│ New York · New Jersey ·      │  ui 17/24 Graphite
│ Florida · IRS                │
│                              │  24
│ Building a filing product?   │
│ CoFile for platforms         │
│                              │  24
│ CoFile is not a law firm or a│  small 15/23 Graphite
│ government agency, isn't     │
│ affiliated with any state or │
│ the IRS, and doesn't give    │
│ legal or tax advice.         │
│                              │  24
│ Terms          Privacy       │  links in two columns of 48 px rows;
│ Security       FAQ           │  the middots drop (they separate a
│ hello@cofile.app             │  single line), the address across both
│                              │  24
│ [copy needed: appearance]    │
│ ┌────────┬────────┬────────┐ │  three equal segments, 48 px tall
│ │        │        │   ●    │ │
│ └────────┴────────┴────────┘ │
│                              │  48 + 64 + safe area
└──────────────────────────────┘
```

Everything stacks flush left, 24 px between groups (6.5). The bottom padding adds the sticky bar's
64 px, because the bar slides back up once the Close's button has scrolled away, and the footer's
last line must not sit under it.

---

## `[copy needed]` in this part

**New, raised by this part:**

| Where | What |
|---|---|
| 9.10 Footer | The appearance switch: its group label and its three options (light, dark, and following the device's setting) |

**Already raised in the foundation (D7), placed here:**

| Where | What |
|---|---|
| 9.5 After, 9.6 Coverage, 9.7 Rehearsals | The accessible name of the replay control |
| 9.7 Rehearsals | Alt text for the stage photograph (C7) |
| 9.9 Close | The label of the optional firm-name field; the visually hidden description of the engraving it drives; alt text for the blank-plate photograph (C3 and C4) |

Everything else in these bands is existing copy: the coverage tooltips use `statusOf`'s labels, the
pictures use the stand-ins' labels and the example data in D4, and the After photograph is
decorative (`alt=""`) inside a figure that keeps the stand-in's accessible name.
