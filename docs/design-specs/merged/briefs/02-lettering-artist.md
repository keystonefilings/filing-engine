# Brief: lettering artist

**The job:** the CoFile wordmark, the "Co" of our mark (the Name Plate), the final mark drawings, a
hand-pixelled 16 px favicon, app icons, lockups and a one-page usage sheet.
**For:** a lettering artist who works in the engraver's Scotch roman tradition and can tune
drawings for screens.
**Contact:** [CoFile contact]

## 1. Who we are

CoFile (cofile.app) is a filing service. Accounting, payroll, fractional-CFO and title firms use it
to file state business filings for their clients (LLC formations, payroll registrations, EINs)
under the firm's own brand. We see ourselves as the firm's stationer: we make the plate, the firm
puts its name on it, and our own name stays in small type. Our line for it is "Your name on the
door. Ours in small type."

## 2. What we need

CoFile's own name and mark, drawn by hand. The wordmark is "CoFile", drawn as a logotype in the
manner of an engraver's Scotch roman, in two masters (Display and Small). The mark is the **Name
Plate**: a chamfered plate with two level screws, blank except for "Co". You draw the "Co"; a hand
engraver we commission cuts the plate in real brass from your drawing; you then draw the final mark
from a scan of that plate, so the "Co" keeps the slight swell only a burin gives. From these come
the favicon, app icons, lockups and a usage sheet. Our fonts are licensed (Miller and Founders
Grotesk), so this is the only lettering we are commissioning. A typeset stand-in is live today, and
your drawings replace it in one change, so they must fit the same space.

## 3. Deliverables

### 3.1 The wordmark, "CoFile"

Capital C, capital F, one word. Drawn as a logotype: not typed, and not traced from any font. The
reference for proportion and contrast is Miller Display (Font Bureau, through Type Network), the
headline face of our site. Draw on a 1,000-unit em with a cap height of 700.

| Letter | Drawing spec |
|---|---|
| **C** | Vertical stress. A sharp beak serif on the upper terminal (beak 56 units long); a softer, bracketed lower terminal. Aperture opened 4% against the reference, so it holds at 13 px. |
| **o** | x-height 476 (0.68 of cap height), overshoot 12. Hairlines top and bottom at 1:5 contrast, a touch finer than the text cut. Kern C–o −20. |
| **F** | Top arm extended 6% past the reference glyph; middle arm shortened 8% and set at 52% of cap height, so the gap after the F doesn't open up. Kern F–i −10. The top arm clears the i's dot by at least 40 units. |
| **i** | **The dot is a lozenge**: a square turned 45°, its diagonal 1.25 × the stem width, its lower point 70 units above the x-height. It echoes the plate's chamfered corners and is the wordmark's one quirk. |
| **l** | Ascender 728, 4% above cap height, as in engraved romans. i–l 0. |
| **e** | Level crossbar at 58% of x-height; a fine, slightly lifted hairline terminal. Kern l–e −5. |
| **Spacing** | Tracking +10/1000 at display sizes. |

1. **Display master**, for 20 px and up, at the contrast above.
2. **Small master**, for 11 to 19 px (the site header on phones, and anything under 20 px):
   contrast 1:2.5, x-height raised to 0.72 of cap height, spacing +30/1000, the lozenge enlarged
   to 1.5 × stem, and no hairline thinner than 1 CSS px at a 13 px font size (about 77 units on
   the 1,000-unit em).
3. **It must fit the stand-in's space.** Today's stand-in is "CoFile" set in Miller Display
   Semibold with +10 tracking. The drawn wordmark replaces it with matched metrics, so nothing on
   any page moves. We send you its measurements. If your drawing needs a different width or
   height, tell us at the first round, so we can change the stand-in to match before your art
   lands.

### 3.2 The "Co" and the Name Plate

Draw the plate on a grid of **40 × 16 units**; one unit is 1/40 of the plate's width. y is
measured down from the top edge.

```
     0    4.5                 20                 35.5   40
 0   ╱‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾╲
     │  ╱‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾╲  │   ← bevel line (64 px wide and up)
 8   │ (⊖)               Co                 (⊖)  │   ← screws, slots level
     │  ╲________________________________________╱  │
16   ╲________________________________________________╱
```

- **Outer plate.** A 40 × 16 rectangle with all four corners chamfered at 45°, chamfer leg 2.5
  units. Stroke 1.2 units, mitred joins, centred on the path.
- **Bevel line.** A second chamfered rectangle inset 2 units from the outer edge, chamfer leg 1.6
  units, stroke 0.4 units: the light catching the plate's bevelled edge. Drawn only when the mark
  is 64 px wide or more.
- **Screws.** Two circles of radius 1.1 units centred at (4.5, 8) and (35.5, 8), stroke 0.6
  units, each with a **horizontal** slot 1.4 units long and 0.4 units thick through its centre. A
  good fitter sets the slots level. Below 32 px wide the screws become solid dots of radius 0.9
  units, with no slot.
- **"Co".** Lettered by hand in the wordmark's italic: cap height 6.4 units, baseline at y = 11.2,
  optically centred on x = 20 (the C's overshoot sits 0.3 units left of true centre). The C's
  upper terminal ends in a hairline flick rising at 20°. The o tucks into the C's mouth with −0.4
  units of kerning, so the two read as one cut. Stroke contrast 1:4; no hairline under 0.35 units.
- **Clear space.** 4 units on every side. Nothing goes inside it, a firm's logo included.
- **Minimum size.** 28 px wide on screen (dot screws, no bevel); 12 mm wide in print.
- **The mark is a line drawing in one ink**: never filled, never shaded, never a gradient or a
  gold-foil effect.

The work runs in three steps:

1. **The "Co" for the engraver.** Draw it for a brass plate 120 mm wide, where one unit is 3 mm:
   plate 120 × 48 mm, cap height 19.2 mm, baseline 33.6 mm below the top edge. Deliver it as a
   1:1 vector PDF, with the plate's outline and screw centres for placement.
2. **The tracing.** The engraver cuts it in brass; the plate is scanned at 2,400 dpi and the scan
   comes to you. Trace the vector from the scan and clean it on the grid, keeping the burin's
   swell.
3. **The final mark, three drawings**, each in a Plate Ink and a Brass version, one color, SVG:
   - **Full**, for 64 px wide and up: bevel line and slotted screws.
   - **Standard**, for 32 to 63 px: slotted screws, no bevel line.
   - **Small**, under 32 px: dot screws, no bevel line.

### 3.3 Favicon and app icons

At 16 and 32 px the plate is redrawn at **32 × 16 units** (2:1) so it fills the square better. It
keeps the dot screws and the "Co" and drops the bevel. Hand-pixel the 16 px master; the browser must
never scale the vector down.

| File | Drawing |
|---|---|
| Favicon, SVG, with a light/dark swap (`prefers-color-scheme`) | Plate Ink plate on transparent for light tabs; Brass plate for dark tabs |
| ICO with 16, 32 and 48 px | The 32 × 16 plate, Plate Ink on a Cotton square. The 16 px is your hand-pixelled master |
| Apple touch icon 180 px; web app icons 192 and 512 px; maskable 512 px | A Plate Ink square with the full 40 × 16 plate (bevel and slotted screws) in Brass, 72% of the tile's width, centred optically. The same image is our social avatar |

### 3.4 Lockups

- **Horizontal** (site header and footer, the filing desk, the dashboard): the plate, then the
  wordmark. Plate height = 1.15 × the wordmark's cap height; gap = 0.6 × plate height; the plate's
  centre line aligns with the centre of the wordmark's x-height. 28 px tall on desktop, 24 px on
  phones.
- **Stacked** (social cards, the 404 page, the head of CoFile's emails): the plate centred above
  the wordmark, gap 0.5 × plate height.
- **Wordmark alone**: the API docs header.
- **Clear space**: one cap height on every side. **Minimum**: wordmark 8 px cap height; lockup
  12 px cap height.
- **Versions** of the horizontal and stacked lockups:
  - **Light**: plate and wordmark in Plate Ink, the lozenge in Brass Line. For our own web pages.
  - **Dark**: plate in Brass, wordmark in Night Ink, the lozenge in Brass. For our own web pages.
  - **One color**: everything, the lozenge included, in the letters' color. For emails, the docs
    and print: the metal lozenge belongs to our own pages only.
- **For email**: the stacked lockup in Plate Ink, lozenge included, as PNG at 96 × 56 CSS px:
  1× (96 × 56), 2× (192 × 112) and 3× (288 × 168).

### 3.5 The usage sheet

One page, PDF: the mark's three sizes and when each applies, the wordmark's two masters and their
size ranges, the lockups, clear space, minimum sizes, the colors below, and the "never" list in
section 5.

### 3.6 Colors, formats and naming

| Name | Hex | Where |
|---|---|---|
| Plate Ink | `#1D2130` | The mark and wordmark on light grounds |
| Brass | `#D9A84A` | The mark on dark grounds (the only place the mark is drawn in Brass); the lozenge on dark |
| Brass Line | `#A87A1E` | The lozenge in the light header and footer lockups |
| Night Ink | `#ECE8DF` | The wordmark on dark grounds |
| Cotton | `#FBFAF6` | Our page color; the ICO's square |
| Night | `#14161E` | Our dark-mode page color |

These are screen colors. Where the mark is printed, the printer matches Plate Ink by proof.

**Formats:** SVG for every drawing (outlined, no live type); the wordmark also as an outlined PDF;
PNG where listed; ICO; your working source files.

**Naming** (please follow, or propose your own scheme at round 1): `cofile-wordmark-display.svg`,
`cofile-wordmark-small.svg`, `cofile-mark-full-ink.svg`, `cofile-mark-full-brass.svg` (and
`-standard-`, `-small-`), `cofile-favicon.svg`, `favicon.ico`, `cofile-favicon-16.png`,
`apple-touch-icon-180.png`, `icon-192.png`, `icon-512.png`, `icon-maskable-512.png`,
`cofile-lockup-horizontal-light.svg` (and `-dark`, `-onecolor`; the same for `-stacked-`),
`cofile-lockup-stacked-email@1x.png` (and `@2x`, `@3x`), `cofile-co-120mm.pdf`,
`cofile-usage-sheet.pdf`.

**Questions for you:**

- The "Co" is to be drawn "in the wordmark's italic", while the wordmark itself is upright. We read
  this as an italic "Co" drawn to belong with the upright wordmark. Tell us if you read it
  differently.
- Our spec gives the masters' ranges (20 px and up; 11 to 19 px) without saying whether that is
  the font size or the cap height. Please check both masters in the lockups at their real heights
  (28, 24, 20 and 16 px tall) and tell us which master each should use.
- Would you add pixel-fitted versions of the lockup at those fixed sizes?
- Should the usage sheet give print color equivalents? [owner to confirm]

## 4. How it will be used

- **Header and footer** of every page in CoFile's own look: the website, sign-up and log-in, the
  filing desk firms work in, the platform dashboard, the API docs. The lockup is 28 px tall on
  desktop and 24 px on phones, so most people meet the wordmark at 13 to 28 px. The Small master
  matters as much as the Display one.
- **Inside product pictures** on our home page (live drawings of our filing desk), the lockup
  appears at 20 px and 16 px tall.
- **Email:** the stacked lockup heads every email CoFile sends to firms, at 96 × 56 px.
- **Browser tabs and phone home screens:** the favicon at 16 and 32 px; the app icons.
- **Large:** the stacked lockup on the 404 page and on social link previews.
- **Dark mode:** the mark turns Brass and the wordmark Night Ink on our near-black page.
- **Never where a firm's client looks.** The pages a firm's clients see carry only the firm's
  brand, so the mark and wordmark never appear there.
- **The plate's shape travels.** The real plates in our photographs are cut to the mark's
  proportions (300 × 120 mm, corners chamfered at 45°, two level screws), and the mark's outline
  without screws becomes a 16 × 10 px status glyph drawn by others. Your plate has to work as a
  real object as well as a logo.

## 5. References and what to avoid

**References.** Miller Display for proportion and contrast; the engraver's Scotch roman tradition,
the letters American engravers and job printers set letterheads and price lists in for a hundred
years. The feel we want is a contemporary fine stationer, not an antique one.

**Never:**

- The mark in a circle (that makes it a seal), with a ribbon, stars, laurel or any border, filled
  with a brass color, given a drop shadow, a gradient or a foil effect.
- The wordmark in a firm's color, in Brass as a whole, outlined, in all capitals, small capitals or
  lower case: "you don't change a person's name to fit a style".
- Traced from Miller or any other font, or typed.
- A tagline locked to the mark. There is none.
- Anything that looks official or government: seals, stamps, crests, Trajan or Copperplate Gothic,
  blackletter.
- Pastiche: copperplate script, Victorian ornament, faux letterpress, parchment.
- Anything that recalls the mark we are replacing: a manila folder tab with a check cut into it.

## 6. Rounds and acceptance

We suggest four rounds. Please quote on that basis and say what an extra round costs.

1. **Directions.** Sketches of the wordmark and the "Co", shown at 13, 24 and 64 px as well as
   large. We check: the drawing spec in 3.1 and 3.2, the lozenge, and that it fits the stand-in's
   space.
2. **The "Co" for the engraver, and the refined wordmark.** We check the 1:1 "Co" against the grid
   (cap height, baseline, optical centre, the C–o kern) before it goes to the engraver.
3. **The Small master, the traced mark and the favicon.** We check: no hairline under 1 CSS px at
   13 px; the C's aperture holds at 13 px; the F's top arm clears the dot by 40 units; the three
   mark drawings at their size ranges (bevel only at 64 px and up, dot screws under 32 px, slots
   level); the mark legible at its 28 px minimum; the 16 px favicon hand-pixelled and crisp in light
   and dark tabs; the app icon on a phone's home screen.
4. **Final files and usage sheet.** We check the colors are exact, every file in the list is
   there and named, and the lockup proportions in 3.4.

**Accepted** means: every check above passes; our build team swaps your files in for the stand-in
and nothing on the page moves; the lockups read cleanly in our header at 28 and 24 px, in light and
dark mode, and in the email lockup at 96 × 56 px; and [CoFile contact] signs off in writing.

## 7. Timing

Week numbers count from the start of our programme (week 1). The calendar date of week 1 is
[owner to confirm].

- **Weeks 1 to 8**, your whole commission. The stand-in is live from day one, so nothing waits on
  you except the steps below.
- **The "Co" drawing comes first.** The hand engraver cuts the brass plate from it in their weeks
  2 to 6, and the scan comes back to you for the final tracing. We'll set the hand-over date with
  both of you.
- **Your final art lands in our weeks 8 to 12**, in one release.

**Who depends on you:** the hand engraver (your "Co", before they cut the brass mark); our email
templates, built in weeks 8 to 10 (the email lockup PNGs); our build team, for the one-release swap.
**You depend on:** the engraver's 2,400 dpi scan of the brass plate.

## 8. Rights

- **Full ownership.** Copyright and all other rights in the wordmark, the "Co", the mark drawings,
  favicon, app icons, lockups and usage sheet are assigned to CoFile, including the right to
  modify them and to register them as trademarks.
- You confirm the work is your original drawing, not traced from Miller or any other font.
- You may show the work in your portfolio after our launch.

## 9. What we provide

- This brief, and the drawing pages of our design spec on request.
- The stand-in wordmark and its measurements; screenshots of it in our header, emails and tabs.
- Specimens of Miller Display. We hold the license; if you need the font files themselves for
  reference, we'll arrange a seat [owner to confirm].
- The engraver's 2,400 dpi scan of the brass "Co" plate, when it is cut.
- The colors above.
- [CoFile contact] for questions and reviews.

## 10. To quote

Please send:

1. A price for each group: the wordmark (both masters); the "Co" and the three mark drawings
   (including the tracing from the scan); the favicon (hand-pixelled master, SVG and ICO); the app
   icons; the lockups (all versions and the email PNGs); the usage sheet. And the price of an extra
   round.
2. Your schedule against our weeks 1 to 8, and the date you could deliver the "Co" for the engraver.
3. Samples of past lettering and logotypes, especially Scotch roman or engraved work, and any
   lettering you have tuned for small screen sizes.
4. Your questions.

---

Spec references (for CoFile's use): 01-foundation 2.1, 2.6, 3.1–3.3, 3.9, 4.2, 4.5, 4.6, 5.1;
02-art-direction-and-motion 7.6.1; 03-home-page-top 9.0 (header lockup);
07-platforms-and-emails 10D.4 (email lockup); 08-components-and-production 13.3, 13.4, 13.5,
14 (row 1); DECISIONS 8; BUILD-PLAN A.16, C.2.
