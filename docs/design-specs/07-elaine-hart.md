# CoFile website design spec: "Of Record"

**Designer:** Elaine Hart, editorial design
**For:** the CoFile build team (cofile.app, api.cofile.app)
**Date:** November 26, 2026
**Concept:** Of Record. Two inks: black for the record, blue for the editor's note.

All copy in this document is quoted from the repository (`web/app/page.tsx`, the filing desk and
dashboard pages, `src/approvals/render.ts`, `src/comms/render.ts`, `web/lib/status.ts`). Where a
surface needs words that don't exist yet, I mark the slot as **[copy needed]** and say so in
Appendix B. I have not rewritten a headline, a label or a consent anywhere in the design.

---

## 1. Who I am, and how that shapes this

I spent twenty-five years making pages for people who read with a pencil. First the art desk of a
financial daily, then a business monthly. My readers were controllers, analysts, tax partners,
bankers. They don't read a page; they audit it. They go to the table first, check the total, look
for the footnote, and only then decide whether to read the story. If a number is set in a way that
makes it hard to check, they assume someone is hiding something. If a page looks edited, with a
clear hierarchy, consistent rules and captions that say what you are looking at, they extend it the
benefit of the doubt.

CoFile's first readers are the same people. A CPA aged 58 deciding whether to put her firm's name
on a state filing she will never see typed. She will look at the sample proof the way she looks at
an 8879: name, amounts, signature line. So my job is not to make CoFile look like software. It is
to make it look edited: the confidence of a front page, the care of a good explainer graphic, and
the honesty of a corrections box.

Three habits from the newsroom run through this whole spec:

1. **Every picture is evidence.** No mood photography, no illustrated people pointing at laptops.
   Pictures are real screens, real documents, or diagrams that explain something you can check.
2. **Numbers are set to be checked.** Tabular figures, decimal alignment, totals ruled the way an
   accountant rules them. A fee is never decoration.
3. **The page has one lead.** Every page has one thing that matters most, and the layout makes that
   thing win. On the proof, it is the details, the fees and the one button. Everything else defers.

---

## 2. The concept: Of Record

A newspaper of record prints what happened and stands behind it. CoFile does the same for a
business filing: it shows the client exactly what will be filed, files only that, and keeps the
record of what was approved, what was filed and what the state sent back. The site should read like
that publication.

The idea that holds it together is **two inks**, borrowed from the press room.

- **Record ink (black).** Everything that is the record: the copy, the client's details, the fees,
  what goes to the state. Set in black on white, as plainly and legibly as possible.
- **Editor's blue.** On a printer's proof, an editor marks corrections, keys and instructions in a
  pencil color that never prints. In CoFile, editor's blue is the color of everything that helps you
  check but is never part of the filing: numbered callouts, leader lines, keys between a picture and
  its text, the highlight on a value you are asked to look at, the focus ring. CoFile itself lives in
  this ink. That is "Ours in small print" turned into a system: CoFile is the editor's hand on the
  page, present, helpful, and never part of what is filed.
- **Signals.** Green, amber and red appear only when they mean something: green for approved, live
  and the button that moves a filing forward; amber for a rehearsal's planned hold and for a filing
  that waits on a person; red for a stop. Never as decoration, never as a brand color.

Why it fits CoFile: the product's whole promise is a distinction between what you are shown and what
is filed, and the guarantee that they match. Two inks make that distinction visible on every page.
A client on a phone learns in seconds that black is what she is approving and blue is CoFile
pointing at it. A developer learns that blue in the docs is annotation and black is the payload.

### Design principles (for every decision the build team makes without me)

| # | Principle | In practice |
|---|---|---|
| 1 | The specimen is the real thing | The sample proof on the home page uses the same component, order and type as the client's real proof. If they ever differ, the sample is wrong. |
| 2 | Hierarchy, not boxes | Sections are separated by rules and space, not by bordered cards. A box is reserved for the proof sheet, data tables, the catch and form fields. |
| 3 | Numbers are set to be checked | Tabular lining figures, decimal alignment, single rule above a total and double rule below the final total. |
| 4 | Black is the record, blue is the note | Never put a filed value in blue. Never put an annotation in black. |
| 5 | Signals are signals | Green, amber and red never appear in illustration, charts of non-status data or brand moments. |
| 6 | Captions are mandatory | Every figure has a caption or an accessible name taken from the copy. |
| 7 | End with a full stop | Long pages end with the end mark (section 3). The reader always knows when she has reached the end. |

---

## 3. Brand identity

### 3.1 Retire the folder tab

The manila folder tab with a check cut into it is pleasant, but a folder and a check mark are the
two most common icons in filing software. It says "app", not "publication of record". I would
retire it, and the manila color with it.

### 3.2 The wordmark

**CoFile**, set as fixed artwork drawn from the commissioned display face, Record Display Semibold
(section 5). It is the brand; as on a newspaper, the name, well set, does the work.

Drawing notes for the lettering artist:

- **Proportions.** Cap height 700 units, x-height 500 (a high x-height so it holds at 18 px in a
  top bar). Overall width on a 1,000-unit em: about 2,640 units.
- **C.** Vertical stress, moderate contrast (thick 92, thin 34). Top terminal ends in a short,
  sharp beak serif angled 12 degrees down; the bottom terminal is a plain sheared cut, no serif.
  Aperture slightly closed (about 80 degrees of arc open).
- **o.** Slightly condensed (counter 88% of the C's counter width) so "Co" reads as one syllable.
  Optical overshoot 12 units above x-height and below baseline.
- **F.** Top arm full width with a vertical serif; middle arm 72% of the top arm, set at 52% of cap
  height (a little high, which keeps the F open next to the i). Bracketed foot serif.
- **i.** The dot is a **square**, 86 × 86 units, centered over the stem, its bottom 120 units above
  x-height. This square is the only square dot in the system; it becomes the end mark.
- **l, e.** Text-weight forms. The e has a horizontal bar and a terminal that ends at 3 o'clock.
- **Spacing.** Fixed: C to o kerned −18, o to F +6, F to i −10. Do not retrack the wordmark.

### 3.3 The mark: the Full Stop

For the favicon, app icon, email footer and small places where the wordmark won't fit:

```
   32 × 32 grid
   . . . . ████████ . . . . .
   . . ██          ██ . . . .
   . ██              ██ . . .
   ██                       .      C ring: outer diameter 28, centered at (15,16)
   ██              ▪▪▪▪     .      stroke 5.5 at 9 and 3 o'clock, 3.0 at 12 and 6
   ██              ▪▪▪▪     .      aperture: 70° opening centered on 3 o'clock
   . ██              ██ . . .      square: 6 × 6, centered on the horizontal axis,
   . . ██          ██ . . . .        its left edge 2 units inside the ring's outer edge
   . . . . ████████ . . . . .
```

A capital C, drawn as a ring with an opening at 3 o'clock, with a solid square sitting in the
opening at the center line. It reads as "C.": CoFile, full stop. Approved, filed, done. The square
is the i-dot of the wordmark, scaled.

| Colorway | C | Square | Ground |
|---|---|---|---|
| Primary | Ink #15171A | Editor's blue #1F45A8 | Paper #F6F5F1 or Sheet #FFFFFF |
| Reversed | Sheet #FFFFFF | Editor's blue, dark value #8FA8F0 | Ink #15171A |
| One color | Ink or white | same as C | any neutral |
| App icon | Paper #F6F5F1 | Editor's blue, dark value #8FA8F0 | Ink #15171A, 22% corner radius (platform mask) |

### 3.4 Lockups, clear space, minimum sizes

- **Horizontal lockup:** mark left, wordmark right, gap = 0.5 × mark width, wordmark cap height =
  0.62 × mark height, baselines aligned to the square's bottom edge.
- **Wordmark alone** is the default on CoFile's own pages. The mark alone is for 32 px and below.
- **Clear space:** the height of the wordmark's capital C on all sides.
- **Minimum sizes:** wordmark 64 px wide on screen (18 px cap height in the masthead is the norm);
  mark 16 px. Below 16 px, use the one-color square-only glyph (favicon at 16 px only).
- **Never:** outline it, set it in a firm's color, put it on a photograph, add a tagline inside the
  lockup, animate the letters, or rebuild it in a live font.

### 3.5 The end mark

A solid square, 0.42 em, editor's blue, set one word space after the last word of a long-form page
(Terms, Privacy, each docs guide, the home page's close). It is the magazine's end-of-story sign.
The home page's tagline sits on its own line with it:

```
Approve the proof. Then it's filed. ▪
```

### 3.6 The "with CoFile" co-brand mark

On a firm's pages, the only sign of CoFile is "with CoFile". It is small print and must look it.

- Set in Record Sans: "with" Regular, "CoFile" Semibold, 12/16 px, color `ink-3` (#62666D light,
  #94918A dark). No mark by default; an optional 9 px Full Stop mark may precede it in the email
  footer only.
- Never in the firm's color, never in editor's blue, never larger than 40% of the cap height of the
  firm's name beside it, never centered in a header.
- **Placement:** right end of the firm's brand bar on the filing desk, intake form and the proof;
  in the email footer line on client emails. Once per page.
- **Clear space:** 12 px on all sides. **Minimum:** 11 px text size.
- **Embed widget and enterprise white-label pages:** no "with CoFile" at all unless the enterprise
  turns it on; the beta notice is also absent from the widget.

### 3.7 Social cards (Open Graph)

1200 × 630, Paper ground. Top: a 3 px ink rule, then the wordmark at 40 px cap height. Middle: the
page's own H1 in Record Display 64/70, ink, left-aligned, max 3 lines. Bottom left: "cofile.app" in
Record Sans 22 px ink-3. Bottom right: the Full Stop mark, 48 px. Generated per page at build time.

---

## 4. Color

### 4.1 The palette in one breath

A near-white newsprint ground, white sheets for anything you are asked to check, a deep neutral
ink, one editor's blue, and three signals. That is all. No gradients, no brand second color, no
decorative tints. A financial reader trusts restraint.

### 4.2 Core tokens

| Token | Role | Light | Dark |
|---|---|---|---|
| `paper` | Page ground | #F6F5F1 | #121314 |
| `sheet` | The proof, forms, tables, anything to check | #FFFFFF | #1B1D20 |
| `sheet-2` | Zebra rows, code, quiet panels | #EFEDE7 | #222428 |
| `ink` | Text, headlines, the record, primary button | #15171A | #ECEAE4 |
| `ink-2` | Body secondary, ledes | #474B52 | #B9B6AE |
| `ink-3` | Captions, meta, "with CoFile" | #62666D | #94918A |
| `rule` | Hairlines between rows and sections (non-text) | #D6D3CB | #33363A |
| `rule-strong` | Section rules, table heads, the proof's top rule | #15171A | #ECEAE4 |
| `field-border` | Input and checkbox borders (3:1 minimum) | #7D8187 | #6E7279 |
| `blue` | Editor's blue: callouts, keys, links on CoFile pages, focus | #1F45A8 | #8FA8F0 |
| `blue-tint` | Highlight on a value to check; selected rows | #E4EAF8 | #18213A |
| `blue-line` | Leader lines and dimension lines (non-text) | #6F87CF | #5B6FB0 |

### 4.3 Signal tokens

| Token | Meaning | Light text/fill | Light tint | Dark text/fill | Dark tint |
|---|---|---|---|---|---|
| `go` | Approved, live, the button that moves a filing forward | #0E6B3F | #E2F0E7 | #5DC08A | #13281C |
| `go-on` | Text on a `go` fill | #FFFFFF | | #0B1A12 | |
| `hold` | A rehearsal's planned hold; a filing waiting on a person | #8A5200 | #FBEFD9 | #E9B35A | #2E2310 |
| `stop` | A stop: rejected, failed, stopped, needs correcting | #B02A1E | #FBE6E3 | #F08A7E | #34171A |
| `stop-on` | Text on a `stop` fill | #FFFFFF | | #1E0B09 | |

The **rehearsal hatch** is the second signifier for amber, so no reader depends on hue: 45-degree
lines, 1 px, 6 px pitch, in `hold` at 35% opacity (light) or 45% (dark). It fills the left 4 px of a
rehearsal chip, the margin strip of a rehearsal proof and the held line of a rehearsal log.

### 4.4 Measured contrast (WCAG 2.2 ratios)

| Pair | Light | Dark |
|---|---|---|
| `ink` on `paper` / on `sheet` | 16.5 / 18.0 | 15.5 / 14.0 |
| `ink-2` on `paper` / `sheet` | 8.0 / 8.8 | 9.2 / 8.3 |
| `ink-3` on `paper` / `sheet` | 5.3 / 5.8 | 5.9 / 5.4 |
| `blue` on `paper` / `sheet` | 7.8 / 8.5 | 8.0 / 7.3 |
| `blue` on `blue-tint` | 7.0 | 6.9 |
| `go` on `sheet`; `go-on` on `go` | 6.6; 6.6 | 7.5; 8.0 |
| `hold` on `sheet`; on `hold` tint | 6.4; 5.6 | 8.9; 8.1 |
| `stop` on `sheet`; `stop-on` on `stop` | 6.6; 6.6 | 7.0; 7.8 |
| `field-border` on `sheet` (non-text, needs 3:1) | 3.9 | 3.5 |

Every text pair clears 4.5:1 and most clear AAA (7:1). `rule` is decorative and never the only way
to tell two things apart.

### 4.5 Usage rules

- **Ratio on a CoFile page:** roughly 70% paper and sheet, 25% ink, 4% blue, 1% signals.
- **The primary button on CoFile's own pages is ink, not green.** "Run a free rehearsal" does not
  move a filing forward, so it doesn't get the green. Green appears only on "Live", "Approved" and
  the forward actions inside the product: "Send the proof to my client", "Pay and file", and the
  proof's approve button (subject to the firm's theme, section 11).
- **Links:** on CoFile's pages, `blue` with a 1 px underline at 3 px offset; on a firm's pages, the
  firm's second color after the contrast fix.
- **The beta notice is neutral** (`sheet-2` ground, `ink` text). Today it is amber; amber means a
  rehearsal's hold, and the beta is not a hold.
- **Dark mode** follows the device unless the person picks a theme. The state's review page picture
  always sits on a white mat (16 px of #FFFFFF around it) so the state's own colors read true.

### 4.6 The tokens as the build team will write them

```css
:root {
  /* Two inks */
  --paper: #F6F5F1;  --sheet: #FFFFFF;  --sheet-2: #EFEDE7;
  --ink: #15171A;    --ink-2: #474B52;  --ink-3: #62666D;
  --rule: #D6D3CB;   --rule-strong: #15171A;  --field-border: #7D8187;
  --blue: #1F45A8;   --blue-tint: #E4EAF8;    --blue-line: #6F87CF;
  /* Signals */
  --go: #0E6B3F;   --go-tint: #E2F0E7;   --go-on: #FFFFFF;
  --hold: #8A5200; --hold-tint: #FBEFD9;
  --stop: #B02A1E; --stop-tint: #FBE6E3; --stop-on: #FFFFFF;
  --hatch: repeating-linear-gradient(135deg,
             color-mix(in srgb, var(--hold) 35%, transparent) 0 1px, transparent 1px 6px);
  /* Firm theme slots, filled by the theme compiler (section 11); CoFile's defaults shown */
  --brand-band: var(--ink);
  --brand-action: var(--go);   --brand-action-on: var(--go-on);
  --brand-link: var(--blue);
  --brand-font-head: var(--font-display);
  color-scheme: light dark;
}
@media (prefers-color-scheme: dark) {
  :root:not([data-theme="light"]) {
    --paper: #121314;  --sheet: #1B1D20;  --sheet-2: #222428;
    --ink: #ECEAE4;    --ink-2: #B9B6AE;  --ink-3: #94918A;
    --rule: #33363A;   --rule-strong: #ECEAE4;  --field-border: #6E7279;
    --blue: #8FA8F0;   --blue-tint: #18213A;    --blue-line: #5B6FB0;
    --go: #5DC08A;   --go-tint: #13281C;   --go-on: #0B1A12;
    --hold: #E9B35A; --hold-tint: #2E2310;
    --stop: #F08A7E; --stop-tint: #34171A; --stop-on: #1E0B09;
  }
}
:root[data-theme="dark"] { /* the same dark values, for an explicit choice */ }
```

The dark block is repeated under `:root[data-theme="dark"]` so a person's explicit choice wins over
the device. The engine's proof renderer imports the same values from the token package rather than
inlining them.

---

## 5. Typography

### 5.1 The family

I would commission one superfamily, **Record**, from an independent foundry with newspaper-family
experience, and ship stopgaps from open libraries until it is delivered.

| Role | Commissioned | Stopgap (ship now) | Used for |
|---|---|---|---|
| Display serif | Record Display, optical sizes Banner (48+), Head (24 to 47) | Newsreader, opsz axis, 600 | H1, H2, the wordmark's source, pull quotes |
| Text serif | Record Text, Roman and Italic, opsz Text (14 to 23) | Newsreader, opsz 16 to 20, 400 and italic | Ledes, long-form legal and guide text |
| Sans | Record Sans, 400 / 500 / 600 / 700, with Condensed width | Inter (with disambiguation set ss02) and Inter Tight for condensed | Interface, labels, buttons, tables, captions |
| Mono | Record Mono, 400 / 500, slashed zero | IBM Plex Mono | Values exactly as typed into the state's form, codes, API |

Brief to the foundry: a serif that holds at 40 px on a phone and 96 px on a monitor without
looking either spindly or bloated; a sans with unmistakable I, l, 1 and 0, O; generous x-heights;
full Latin Extended-A coverage including accented capitals that don't collide with the line above
(Á, É, Í, Ñ, Ó, Ú, Ü at 1.1 line height); inverted ¿ and ¡ that sit on the baseline properly;
tabular and proportional lining figures in all styles; a dedicated "agate" cut of the condensed sans
tuned for 13 to 15 px tables; and a mono whose figures match the sans figures' width so a fee in
mono and a fee in sans align in a column.

### 5.2 What each face means

- **Serif speaks.** Headlines and ledes are CoFile's voice: the editorial page.
- **Sans works.** Every control, label, table and caption. The filing desk and dashboard are almost
  all sans; they are working pages, not reading pages.
- **Mono is verbatim.** A value in mono is exactly what goes to the state: TWO SISTERS BAKERY LLC,
  88 Grove St, Jersey City NJ 07302, a filing reference, an API key, a webhook header. This keeps
  today's best habit and makes it a rule.
- **Fees are figures, not code.** Dollar amounts are set in Record Sans with tabular lining figures,
  right-aligned on the decimal, never in mono and never in a firm's uploaded font.

### 5.3 Scale

Sizes are in px; mobile applies below 768 px. Fluid sizes interpolate between them with `clamp()`.

| Token | Face | Desktop size / line | Mobile size / line | Weight, tracking |
|---|---|---|---|---|
| `banner` | Record Display | 80 / 84 | 40 / 44 | 600, −1.2% |
| `h1` | Record Display | 56 / 62 | 34 / 40 | 600, −1% |
| `h2` | Record Display | 44 / 50 | 30 / 36 | 600, −0.8% |
| `h3` | Record Sans | 22 / 30 | 20 / 28 | 600, 0 |
| `h4` | Record Sans | 18 / 26 | 18 / 26 | 600, 0 |
| `kicker` | Record Sans | 14 / 18 | 13 / 18 | 600, +6%, small caps |
| `lede` | Record Text | 22 / 34 | 19 / 30 | 400, 0 |
| `pull` | Record Display Italic | 34 / 42 | 26 / 34 | 500, −0.5% |
| `body-read` | Record Text | 19 / 30 | 18 / 28 | 400 (Terms, Privacy, guides) |
| `body` | Record Sans | 17 / 26 | 17 / 26 | 400 (marketing body, list items) |
| `ui` | Record Sans | 16 / 24 | 16 / 24 | 400 (desk, dashboard, forms); never smaller for inputs |
| `ui-small` | Record Sans | 14 / 20 | 14 / 20 | 400 (help text, meta) |
| `caption` | Record Sans | 14 / 20 | 14 / 20 | 400, `ink-3` |
| `credit` | Record Sans | 12 / 16 | 12 / 16 | 500, +4%, small caps ("Sample proof · test details · not a real business") |
| `agate` | Record Sans Condensed | 15 / 22 | 15 / 22 | 400, tabular (data tables) |
| `mono` | Record Mono | 15 / 22 | 15 / 22 | 400 (code, references) |
| `mono-proof` | Record Mono | 17 / 26 | 17 / 26 | 400 (values on the proof) |
| `fee` | Record Sans | 18 / 26 | 18 / 26 | 500, tabular lining |
| `fee-total` | Record Sans | 24 / 32 | 22 / 30 | 700, tabular lining |

Client-facing pages (intake, proof, client emails) start one step up: body 18/28, values 18/28,
because the reader may be older, on a phone, or reading in a second language. Working pages (filing
desk, dashboard) set their page `h1` smaller, at 44/50 on desktop and 30/36 on phones: a working
page's title labels the page; it doesn't sell it.

### 5.4 Numerals and figures

- Lining figures everywhere. Old-style figures make $103.50 look smaller than its neighbours, and a
  finance reader notices.
- Tabular figures in every table, every fee, every count and every date column.
- The dollar sign is kerned −20 units against the first figure; cents are always shown on fees
  ($100.00, not $100).
- Totals ruled as an accountant would: a 1 px `rule-strong` above the total, and a double rule
  (1 px, 2 px gap, 1 px) below the final total. This is the single most important typographic
  detail for the CPA reader.
- Dates in running text as the copy gives them ("Dec 3, 5:00 PM Eastern"); in tables as
  "Nov 26, 2026" in tabular figures.

### 5.5 Setting rules

- Headlines: sentence case as written, `text-wrap: balance`, no widows (a single word on the last
  line is fixed with a non-breaking space before the last word at build time). Headlines keep their
  full stops; they are statements, and the copy means them.
- Ledes: maximum measure 64 characters; `text-wrap: pretty`.
- Hyphenation off in English headlines and ledes, on (with `hyphenate-limit-chars: 7 3 3`) in
  Spanish body text, which runs longer.
- Small caps only for kickers and credits, generated from real small-cap glyphs, never scaled capitals.
- Underlines for links only. Emphasis is italic serif in reading text, semibold in interface text.

---

## 6. Layout

### 6.1 Grid and breakpoints

An editorial grid: 12 columns on desktop, 8 on tablet, 4 on phone, on a 4 px base unit with an 8 px
rhythm. Columns are fluid between breakpoints; the content area caps at 1224 px.

| Name | Width | Columns | Margin | Gutter | Notes |
|---|---|---|---|---|---|
| `xs` | 0 to 479 | 4 | 16 | 16 | One column of reading; tables become stacked records |
| `sm` | 480 to 767 | 4 | 24 | 16 | Large phones, small tablets in portrait |
| `md` | 768 to 1023 | 8 | 32 | 24 | Two-column spreads start here |
| `lg` | 1024 to 1359 | 12 | 40 | 24 | Full editorial grid |
| `xl` | 1360 and up | 12 (80 px each) | auto, min 48 | 24 | Content 1224 px, centered |

The dashboard uses the same grid with a fixed 240 px left rail at `lg` and up, and the 12 columns
inside the remaining width; the filing desk keeps a top tab row (10.5) and the full grid, because
its seven tabs fit across and its readers are used to tabs, not rails. Reading pages (Terms, Privacy, guides) set text on
columns 3 to 9 (7 columns, about 704 px, 64 characters at 19 px).

Safe areas: horizontal margins are `max(margin, env(safe-area-inset-left/right))`; sticky bottom
elements add `env(safe-area-inset-bottom)`.

### 6.2 Spacing scale

| Token | px | Typical use |
|---|---|---|
| `s1` | 4 | Icon to label |
| `s2` | 8 | Chip padding, tight stacks |
| `s3` | 12 | Label to field |
| `s4` | 16 | Between fields; phone margin |
| `s5` | 24 | Gutter; between paragraphs and figures |
| `s6` | 32 | Between field groups |
| `s7` | 48 | Between blocks inside a section |
| `s8` | 64 | Section padding, phone |
| `s9` | 96 | Section padding, tablet |
| `s10` | 128 | Section padding, desktop |

### 6.3 Rules (the main structural device)

| Rule | Spec | Where |
|---|---|---|
| Hairline | 1 px `rule` | Between table rows, list items, footer lines |
| Section rule | 2 px `rule-strong`, full content width | Top of every home page section, above each desk page title |
| Thick-thin | 4 px + 2 px gap + 1 px, `rule-strong` | Top of the masthead; top of the proof sheet |
| Total rule | 1 px above, double 1 px / 2 px gap / 1 px below | Fee totals, billing totals |
| Column rule | 1 px `rule`, vertical | Between columns of the process strip, the security box, the front-page index |
| Leader | 1 px `blue-line`, with 3 px dot at the end | Callouts and keys only |
| Dot leader | `ink-3` periods, 6 px pitch | Rehearsal log, table of contents in docs |

### 6.4 Radii

Editorial pages are square. Radii are kept for touch affordance only.

| Token | Value | Use |
|---|---|---|
| `r0` | 0 | Sheets, tables, sections, the proof, images |
| `r1` | 2 px | Buttons, fields, chips, toasts |
| `r-round` | 50% | Callout markers, radio buttons, avatars in Team |

### 6.5 Elevation

No floating cards. Depth comes from paper on paper.

| Level | Spec | Use |
|---|---|---|
| 0 | `paper`, no shadow | The page |
| 1 | `sheet` + 1 px `rule` border | Forms, tables, the coverage table |
| 2 (the sheet on the desk) | `sheet` + 1 px `rule` + `0 1px 0 rgba(21,23,26,.06), 0 18px 40px -24px rgba(21,23,26,.35)` | The proof, the sample proof, the hero's lead art |
| 3 | `sheet` + 1 px `rule-strong` + `0 12px 32px -12px rgba(21,23,26,.40)` | Menus, popovers, toasts, dialogs |
| Dark mode | Shadows are replaced by a 1 px `#3A3D42` border and a 4% lighter sheet per level | |

### 6.6 Z-index

`base 0`, `sticky 100` (section index, proof index), `masthead 200`, `toast 400`, `dialog 500`,
`skip-link 900`.

---

## 7. Imagery

### 7.1 What a picture is for

Every picture on this site is evidence. There are three kinds, in this order of preference:

1. **Real screens.** Captures from rehearsals on the states' real websites, filled in with test
   details, and captures of CoFile's own pages. They are documentary photographs of the work.
2. **Explainer graphics.** Drawn diagrams that let a reader check a claim: what maps to what, what
   is compared with what, how close each filing type is to live.
3. **Commissioned documentary photography.** Three images, no more, of real objects and places.

Not used: stock photography, illustrated people, 3D renders, isometric devices, abstract gradients,
state seals, flags or state outlines (they imply an affiliation CoFile doesn't have; the footer
says plainly that CoFile isn't affiliated with any state or the IRS).

### 7.2 The house style for graphics

- Drawn on the 12-column grid; labels in `caption` sans, `ink-2`.
- Strokes: 1 px for rules and frames, 1.5 px for arrows and icons, square caps, mitred joins.
- Two inks only, plus signals where the graphic is about status. Editor's blue for every key,
  leader and annotation. No drop shadows inside graphics; the sheet itself may sit at elevation 2.
- Every graphic is built as a live SVG component fed by the real data in the code (the `COVERAGE`
  and `LOG` arrays, the fee table), so the graphic can never drift from the facts.
- Every graphic has a text equivalent: the existing copy it illustrates is always on the page in
  full, so the graphic is never the only carrier of meaning.

### 7.3 Callout markers (the keys)

Numbered circles that tie a picture to the words beside it.

- 24 px circle (28 px on the proof, 20 px in dense tables), 1.5 px `blue` stroke, `sheet` fill,
  numeral in Record Sans 600, 13 px, `blue`, tabular, optically centered (+0.5 px down).
- Active state (the item being read or hovered): `blue` fill, white numeral.
- A leader line runs from the marker to its target: 1 px `blue-line`, horizontal or vertical only,
  one 90-degree bend allowed, ending in a 3 px dot on the target's edge.
- Markers sit in the margin or gutter, never on top of a value.

### 7.4 The graphics to commission (eight)

| # | Graphic | Where | What it shows |
|---|---|---|---|
| G1 | The keyed proof | Hero and "The proof" | The sample proof for Two Sisters Bakery LLC with markers 1 to 4, keyed to the six checks (section 10.1) |
| G2 | The middle step | Process | Three steps on one rule; the middle one raised on a sheet, because "your client is in charge of the middle one" |
| G3 | Read into a draft | Requests | Ana Ortiz's text, with three phrases underlined in blue and led to the drafted fields they became |
| G4 | Two readings | Checks | The fee from the verified fee table and the fee read on the state's payment screen, side by side, matched; the mismatch case drawn as a stop |
| G5 | The papers come back | After | Three lanes (New Jersey, New York, Florida) showing the shape of each state's return, with no time axis |
| G6 | Thirteen screens | Rehearsals | A filmstrip of the 13 New Jersey LLC screens from a rehearsal, twelve marked filled and the last marked held |
| G7 | The ladder | Coverage | A five-step glyph per filing type, from Planned to Live, plus a legend with counts |
| G8 | One record | Filing detail and After | The filing's timeline from draft to proof to filed, with the documents and the EIN letter hanging off it |

**Who draws them:** an information-graphics studio with newsroom experience (the kind that builds
election-night and markets graphics), working from this spec in Figma and delivering React SVG
components with the data bound. One lead designer, one developer, six weeks.

#### Graphic specifications

**G1, the keyed proof.** The `ProofSheet` component itself (9.3), not a picture of it, so it is
always identical to the client's page. Hero instance 560 px wide with markers only; section 03
instance 720 px with leaders to the six checks. Data: the sample filing in `page.tsx` (Two Sisters
Bakery LLC, Harbor & Pine CPA, $100.00 + $3.50 = $103.50, the two lines of New Jersey's review page).
Leaders: 1 px `blue-line`, horizontal runs only between the list column and the sheet edge, a 3 px
dot where they touch the sheet, never crossing a value. Accessible name: the figure's existing
`aria-label`, "A sample proof for an example business"; markers `aria-hidden`.

**G2, the middle step.** Full content width, 200 px tall at `lg`. One 2 px `ink` rule runs at the
height of the step numerals; numerals 1, 2 and 3 in 32 px Record Display sit on it in 48 px paper
circles. The middle column's sheet rises 24 px above the others and its rule segment is 4 px. The
step names and bodies are the real text, set in HTML over the SVG rule, so the graphic is only the
rule, circles and sheet. Phone: the rule turns vertical on the left at x = 20 px, numerals on it,
text to its right.

**G3, read into a draft.** Two columns at `md` and up (bubble 5 columns, draft 6 columns, a 1-column
channel between them for leaders). Bubble: Record Sans 18/26, `sheet-2`, `r1` with a 10 px tail at
bottom left, max 360 px wide. Three underlined spans in the bubble (2 px `blue` underline, 2 px
offset): "the bakery", "me and my sister, 50/50", "Jersey City". Draft: three field rows from the
sample proof (Business name, Members, Main business address) with values in `mono`; the address's
street portion outlined in a 1 px dotted `ink-3` box with no leader. Leaders route through the
channel with one bend each, staggered vertically by 24 px so they never cross. Phone: bubble above,
draft below, leaders replaced by matching markers 1 to 3 on the spans and the fields.

**G4, two readings.** Two "meter" cards side by side, each a white sheet 280 × 160 px: a caption at
the top in `caption` small caps ("verified fee table" on the left, "the state's payment screen" on the
right, both phrases from the copy), the figure "$103.50" in `fee-total` 40 px below. Between them, a
32 px blue circle with "=" in white. Below the pair, the second row at 70% scale: the left card the
same, the right card's figure replaced by a hatched blank 120 × 32 px, the circle showing "≠" in
`stop`, and a stop chip beneath reading "stops before paying". Phone: the pairs stack, each pair
side by side at 50% width.

**G5, the papers come back.** Three horizontal lanes 64 px apart, each a 1 px `rule` line from a
filled `ink` node at the left to a document glyph at the right. Lane labels in `h4` sans on the left:
"New Jersey", "New York", "Florida". Between: New Jersey nothing (the line runs straight to the
document); New York one email glyph node; Florida one examiner node (a generic person-at-desk glyph,
no face). No time axis, no tick marks, no durations; all three lines are the same length on purpose.
Captioned by the lede beside it, so it needs no labels beyond the three state names.

**G6, thirteen screens.** A single row of 13 thumbnails (64 × 48 px, 8 px apart; 4 rows of 3 plus
1 on phones), each a real capture from a New Jersey LLC rehearsal with test details, masked as in
7.5, on a white mat. Under each, a 6 px marker: filled `ink` square for screens filled in, the hatch
for the thirteenth. The row sits directly above the log and shares its caption. Thumbnails open a
lightbox at full size with arrow-key navigation; each has alt text naming the screen **[copy needed]**.

**G7, the ladder.** See 9.7. Legend row above the table: five glyph-plus-label pairs in ladder
order with the count in tabular figures after each label, 24 px apart, wrapping on phones. Counts
computed from `COVERAGE` and `liveFilings()` at render time.

**G8, one record.** The `FilingRecord` timeline (9.5) rendered with an example filing for the home
page's "After" section on wide screens (under G5, beside P3), and with the real filing on the
filing detail page. On the home page it is marked with the same credit line style as the sample
proof, using the existing words "test details".

### 7.5 Real screens

- **Who:** an in-house capture pipeline, not a photographer. Every rehearsal already records its
  screens; pick captures from a rehearsal run with test details only.
- **Treatment:** shown at true aspect ratio, never cropped to hide the state's chrome, on a white
  mat (16 px) with a 1 px `rule` frame. Browser chrome reduced to a 28 px bar with the state site's
  domain in `mono` 12 px, because the domain is the evidence that this is the state's real website.
- **Masking:** every SSN, card digit and signature in a capture is replaced by a 45-degree hatched
  bar in `ink-3` at 30% before it leaves the capture pipeline, even with test details.
- **Scale rule:** a screen shown smaller than 60% of its real width gets a blue magnifier inset on
  the one field the copy is talking about.

### 7.6 Commissioned photography (three images)

Brief: documentary, available light, color, slightly cool neutral grade, no shallow-depth gimmicks,
no models posing. Shot by a documentary photographer with newspaper experience, on location, with
releases. Each image gets a caption from the copy or a **[copy needed]** slot.

| # | Subject | Where | Notes |
|---|---|---|---|
| P1 | An office door with gold-leaf sign lettering for the example firm, "Harbor & Pine CPA", hand-painted by a sign painter | Firms ("Your name on the door. Ours in small print.") | Real sign-painted glass, shot straight on at eye level. The literal door. Caption: "Harbor & Pine CPA · example firm". |
| P2 | A phone in a hand at a bakery counter, the screen showing the firm-branded proof | The proof section, mobile only (as a second image under the list) | The screen is composited from the real proof component, never staged by hand. |
| P3 | A desk with the state's returned documents and an EIN letter (specimen, test details), a pen, a coffee ring | After ("The papers come back to you.") | Documents are printed from real rehearsal outputs with test details and a visible "specimen" marking printed in the margin. |

### 7.7 Icons

A set of 28 icons on a 24 px grid with 2 px padding, 1.5 px stroke, square caps, drawn by the
graphics studio: vault, key, lock, link, single-use link, signature, separate accounts (two boxes),
document, certificate, EIN letter, email, text message, chat, forward, card, security code, clock,
calendar, state building (generic, columnless, never a capitol dome), check, hold, stop, rehearsal
(hatched square), live (filled circle), search, filter, copy, download, external link. Icons never
appear without a text label, except copy, download and close in tables (which get `aria-label`s).

---

## 8. Motion and interaction

### 8.1 Principles

1. **Motion is a correction mark, not decoration.** It shows what changed, what is linked to what,
   or what just happened. If it does none of those, cut it.
2. **Nothing moves while you are reading it.** No parallax, no scroll-jacking, no autoplay loops,
   no moving backgrounds. A graphic animates once, when it enters, and then holds still.
3. **Irreversible acts get weight, not speed.** Approval, payment and sending are slower and more
   deliberate than navigation.
4. **No sound.** Ever.

### 8.2 Tokens

| Token | Duration | Easing | Use |
|---|---|---|---|
| `t-instant` | 80 ms | linear | Press feedback, checkbox fill |
| `t-quick` | 140 ms | `cubic-bezier(.2, 0, 0, 1)` | Hover, focus ring, chip changes |
| `t-base` | 220 ms | `cubic-bezier(.2, 0, 0, 1)` | Folds opening, menus, toasts in |
| `t-exit` | 160 ms | `cubic-bezier(.4, 0, 1, 1)` | Anything leaving |
| `t-draw` | 360 ms | `cubic-bezier(.3, 0, .2, 1)` | Leader lines drawing, ladder squares filling |
| `t-weight` | 480 ms | `cubic-bezier(.7, 0, .3, 1)` | The approval stamp, "Pay and file" confirmation |
| `t-register` | 720 ms | `cubic-bezier(.16, 1, .3, 1)` | The register moment (below) |
| Stagger | 60 to 90 ms | | Between sequential items |

### 8.3 Signature moments

**The keyed proof draws its keys (hero and section 03).** In the hero, as the sample proof
enters the viewport (50% visible), markers 1 to 4 scale from 0.6 to 1 with `t-quick`, staggered
90 ms, and the `<mark>` highlight on the business name and address wipes left to right behind the
text (`t-draw`). In section 03, the explainer, each leader line then draws from its list item to
its part of the sheet with `t-draw`, staggered 90 ms, in list order. Each sequence is under 1.1 s
and runs once per visit.

**The log sets itself (rehearsals).** The rehearsal log's lines appear one by one, 90 ms apart, as
if typeset: the label appears, the dot leader runs out (`t-draw`), then the result. The last line,
"Pay Now ........ held, on purpose", waits an extra 400 ms, then the amber hatch slides in from
the left edge of the line (`t-weight`). The thirteen-screen filmstrip below fills in lockstep.

**The register moment (checks and the real proof).** Two thin layers, the proof's values and the
state's review page, are drawn 6 px right and 4 px down of each other, like two printing plates out
of register, then slide into exact register with `t-register`. When they meet, the shared values
flash `blue-tint` for 220 ms. On the home page this illustrates "Review page: matched the proof"; in
a filing's timeline it plays once when that event is recorded.

**The approval stamp (the proof).** When the client presses "Approve, and authorize submission and
payment", the button shows a pending state at once (`t-instant`), then, when the server confirms,
the decision page opens with its heading "Approval recorded" set inside a 2 px ink rule frame that
draws around it clockwise (`t-weight`), and the time of approval set below it in mono. It is the
press OK, signed and dated. No confetti, no check-mark burst.

**The ladder fills (coverage).** Each row's five squares fill left to right, 40 ms per square,
rows staggered 30 ms, when the table enters. Live rows end with the green "Live" chip fading in.

### 8.4 Interaction details

- **Hover** on links: underline thickens from 1 px to 2 px (`t-quick`). On table rows: `sheet-2`
  ground. On callout markers: marker fills blue and its target gets `blue-tint`.
- **Focus** everywhere: 2 px `blue` outline, 2 px offset, plus a 4 px `blue-tint` halo on fields.
  Never removed, never replaced by a color change alone.
- **Press:** buttons darken 8% and move 1 px down (`t-instant`).
- **Pending:** the button keeps its width, its label changes to the code's pending text ("Sending…",
  "Saving…", "Creating…"), and a 2 px progress rule runs along its bottom edge. The button is
  disabled while pending.

### 8.5 Reduced motion

With `prefers-reduced-motion: reduce`: every draw, fill, slide and register becomes an immediate
final state; opacity fades are capped at 120 ms; the approval frame appears drawn; nothing staggers.
The site must be complete and fully legible with JavaScript off and motion off: every graphic's
final state is server-rendered SVG.

---

## 9. Components

### 9.1 Buttons

| Variant | Light | Dark | Use |
|---|---|---|---|
| `ink` (primary on CoFile pages) | `ink` fill, #FFFFFF text | `ink` fill (#ECEAE4), #121314 text | "Run a free rehearsal", "Log in", "Create account", "Send" |
| `go` (forward) | `go` fill, `go-on` text | `go` fill, `go-on` text | "Send the proof to my client", "Pay and file", the proof's approve button; on firm pages, the firm's guarded color (section 11) |
| `quiet` | transparent, 1 px `ink` border, `ink` text | same with dark tokens | "See what your client sees", "Request changes", "Copy link" |
| `text` | `blue` text, underline | | "Back to log in", inline actions |
| `stop` | transparent, 1 px `stop` border, `stop` text | | "Remove", "Turn off", "Disconnect" (always followed by a confirm step) |

Sizes: `lg` 56 px tall, 24 px side padding, 18 px label (the proof, phone primary actions); `md`
48 px, 20 px padding, 16 px label (default); `sm` 36 px, 12 px padding, 14 px label (tables,
dashboard rows). Minimum touch target 44 × 44 px always. Labels are never truncated; on phones a
long label wraps to two lines, centered, line height 22 px.

States: default, hover (8% darker fill or `sheet-2` ground), active (12% darker, 1 px down), focus
(section 8.4), pending (section 8.4), disabled (40% opacity is not allowed for meaning: disabled
buttons get `sheet-2` fill, `ink-3` text and a `not-allowed` cursor, and the reason is said in text
beside them).

### 9.2 Fields

- **Label** above, `ui` 16 px semibold, `ink`. **Help** below the label, not below the field, so a
  screen reader and a sighted reader meet it in the same order: `ui-small`, `ink-2`.
- **Input:** 48 px tall (52 px on client pages), `sheet` fill, 1 px `field-border`, `r1`, 12 px
  side padding, text 17 px (18 on client pages; never under 16, which stops phone zoom).
- **Focus:** border `blue`, 2 px outline, 4 px `blue-tint` halo.
- **Error:** border `stop` 2 px; message below in `stop` with a 16 px stop square icon, starting with
  the field's label so it reads alone. The form's top shows a summary list of every error, each a
  link to its field.
- **Optional:** the word "(optional)" in `ink-3` after the label, as the code does; required fields
  carry no marker at all. (Today's red asterisk goes; see Appendix B.)
- **Paired fields** (`field-row n2`, `n3`): 2:1 and 2:1:1 ratios on `md` and up, stacked on phone.
  A pair shares one top label when the copy gives one.
- **"Same as":** a row of `quiet sm` chips under an address or person group: "Same as" in `ink-3`
  then one chip per earlier address or person. Pressing one fills the fields and shows them filled
  in `blue-tint` for 1.2 s so the reader sees what changed.
- **Folded optional questions:** "More options (optional)" as a `details` row: 48 px, a 12 px
  chevron that rotates 90 degrees (`t-base`), a hairline above and below.
- **Checkbox and radio:** 22 px boxes, 2 px `field-border`, checked fill `ink` (not the firm color,
  so a consent check never looks like a brand flourish).
- **Authorizations (consents):** each one is its own ruled block on `sheet-2`: a 4 px `ink` left
  rule, the checkbox, and the consent text at full `ui` size. Consent text is never set smaller
  than the form around it.
- **Signature pad:** always a white sheet, even in dark mode, 160 px tall, with a 1 px dashed `rule`
  baseline 40 px from the bottom and an × at its start.

### 9.3 The proof card (component `ProofSheet`)

One component renders the home page's sample and the client's real proof. Structure:

```
╔════════════════════════════════════════════════════════════╗  thick-thin rule (firm's color on firm pages)
║ [firm logo] Harbor & Pine CPA                 with CoFile  ║  brand bar, 64 px
╟────────────────────────────────────────────────────────────╢
║ Two Sisters Bakery LLC                    [▧ Rehearsal]    ║  h2 serif + chip
║ New Jersey LLC formation. Please approve by Dec 3,         ║  ui-small ink-2
║ 5:00 PM Eastern.                                           ║
║                                                            ║
(1) Business name ............ TWO SISTERS BAKERY LLC        ║  label sans / value mono, value on blue-tint
║   Members .................. Ana Ortiz, Lucia Ortiz (50/50)║
║   Main business address .... 88 Grove St, Jersey City ...  ║
║                                                            ║
(2) Formation filing fee                         $100.00     ║  fee figures, decimal aligned
║   NJ portal fee, by card                           $3.50     ║
║   ───────────────────────────────────────────────────────  ║  total rule above
║   Total to the state                             $103.50     ║  fee-total
║   ═══════════════════════════════════════════════════════  ║  double rule below
║                                                            ║
(3) ┌ New Jersey's own review page, filled in ─────────────┐ ║  white mat, state capture
║   │ Business Name     TWO SISTERS BAKERY                  │ ║
║   │ Designator        LLC                                 │ ║
║   └───────────────────────────────────────────────────────┘ ║
║                                                            ║
(4) [        Approve for filing        ]                       ║  go button
║   Nothing is submitted or paid until you approve.          ║
╚════════════════════════════════════════════════════════════╝
  SAMPLE PROOF · TEST DETAILS · NOT A REAL BUSINESS            credit line, small caps
```

- Sheet at elevation 2, `r0`, max width 560 px (sample) or 720 px (real proof).
- Label column 40%, value column 60% at `md` and up; on phones label above value, value in
  `mono-proof` 17/26, so a long address never squeezes.
- Values the copy marks (`<mark>`) get `blue-tint` behind them: the reader is being asked to look.
- Markers 1 to 4 hang in the left margin, 16 px outside the sheet (inside it on phones, in a 32 px
  left gutter).
- Rehearsal state: the hatch runs down the sheet's left edge (8 px wide) and the chip reads
  "Rehearsal" (section 9.4).

### 9.4 Status chips

Every chip is shape + label + color, so color is never the only carrier. Height 26 px, `r1`,
8 px side padding, Record Sans 500 14 px, a 10 px glyph at the left.

| Tone | Glyph | Colors | Labels (from `web/lib/status.ts` and the coverage labels) |
|---|---|---|---|
| Go | filled circle ● | `go` text, `go` tint ground | Approved, Submitted to the state, Accepted by the state, EIN issued, Completed, Live |
| Wait | pause bars ‖ | `hold` text, `hold` tint ground | Waiting for approval, Needs information, Changes requested, On hold, Paused: state site changed, Name unavailable, Being checked |
| Rehearsal | hatched square ▧ | `hold` text, `sheet` ground, hatched 4 px left edge | Rehearsal, Rehearsed to the payment screen |
| Stop | filled square ■ | `stop` text, `stop` tint ground | Needs correcting, Rejected by the state, Failed, Stopped |
| In motion | open circle ○ | `ink-2` text, `sheet-2` ground | Received, Getting the state's review page, Queued, Filing now, Final check |
| Not yet | open square □ | `ink-3` text, transparent, 1 px `rule` border | Screens recorded, rehearsal next; Offered, not yet rehearsed; Planned |

"Filing now" adds a 6 px dot that pulses opacity 1 to 0.4 every 1.6 s (static with reduced motion).
"Live" is the only chip that is ever set in solid green fill with `go-on` text, and only in the
coverage table and on filing-type pickers; it is the one label that must never be misread.

### 9.5 The timeline (component `FilingRecord`)

The filing detail's spine, from draft to proof to filed. Vertical on every width (a horizontal rail
cannot hold the documents and notes that hang off each stage).

```
  ○  Received                                   Nov 26, 10:02 AM
  │   started by m.reyes@harborpine.example (client link)
  ●  Getting the state's review page            Nov 26, 10:03 AM
  │
  ●  Waiting for approval  ◀ now                Nov 26, 10:05 AM
  ┆   Link to the proof  [Copy link]
  ┆   We emailed this link to ana@twosisters.example …
  ┆
  ◌  Approved
  ◌  Submitted to the state
  ◌  Accepted by the state
  ◌  Completed
       ├─ Documents
       └─ EIN
```

- Past stages: solid 2 px `ink` spine, filled node in the stage's tone. Current: node 14 px with a
  `blue` ring and the "now" pointer in blue (annotation, so blue). Future: dashed `rule` spine,
  hollow nodes, `ink-3` labels.
- Stage labels are the status labels; times in tabular figures, right column.
- Each stage can hold the existing notices: the `nextStep()` text, "Link to the proof", "Documents",
  "EIN", the missing-information form.
- A rehearsal's timeline ends at the held step with the hatch, and the chip "Rehearsal" beside the
  filing title.
- The register moment (8.3) plays on the stage where the review page matched.

### 9.6 Tables

- **Data table (desk, dashboard):** `agate` 15/22, header row in Record Sans 600 13 px small caps
  `ink-2` with a 2 px `rule-strong` below, hairlines between rows, 48 px rows (40 px "compact"
  option in the dashboard), numeric columns right-aligned, the first column a link in `ink` with a
  blue underline on hover. Sticky header inside scroll containers. Row hover `sheet-2`.
- **Phone:** tables of records become stacked records: each row a block with the first column as a
  heading and the rest as label/value lines; no horizontal scrolling for anything a person must read.
  Wide reference tables (API fields) keep horizontal scroll with a fade edge and a visible scrollbar.
- **Fee table:** two columns, label and amount; amounts decimal-aligned with `font-variant-numeric:
  tabular-nums` and a fixed-width figure column; total rules as in 5.4.

### 9.7 The coverage table (component `CoverageLadder`)

Columns, as the code has them: "Filing", "Where", "Where it stands". I add the ladder glyph inside
the third column, before the chip, so no new words are needed.

```
 Filing                                         Where         Where it stands
 ══════════════════════════════════════════════════════════════════════════════════
 LLC formation                                  New Jersey    ■■■■□  ▧ Rehearsed to the payment screen
 Standing certificate (through the API; not     New Jersey    ■■■■□  ▧ Rehearsed to the payment screen
   on the filing desk yet)
 EIN, with the IRS letter saved                 IRS           ■■■□□  □ Screens recorded, rehearsal next
 Corporation formation (for-profit)             New Jersey    ■■□□□  □ Offered, not yet rehearsed
 Alternate name, charter amendments             New Jersey    ■□□□□  □ Planned
 (a type switched live)                         …             ■■■■■  ● Live
```

- Ladder: five 10 × 10 px squares, 2 px apart. Planned 1, Offered 2, Screens recorded 3, Rehearsed
  4, Live 5. Filled squares in `ink`, the fifth filled in `go` only when the type is live; empty
  squares 1 px `rule` outline. `aria-hidden`; the chip carries the meaning.
- Legend above the table: the five labels in ladder order, each with its glyph and a count from the
  data, for example "Live 0". If no type is live, the zero is printed. An editor prints the zero.
- Sorting: by "Where it stands" (default, as the code orders it) or by "Where", by pressing the
  column heading; `aria-sort` set accordingly.
- Phone: each row becomes a block: filing in `h4`, "Where" in `ink-2`, ladder and chip below.

### 9.8 Navigation

- **Masthead (CoFile pages):** thick-thin rule at the very top, 72 px bar, wordmark left (18 px
  cap height), the four section links centered-left ("How it works", "For firms", "What we file",
  "For platforms"), then "Log in" (`quiet md`) and "Run a free rehearsal" (`ink md`). The current
  section's link gets a 2 px `ink` underline as you scroll. Below 860 px: wordmark, "Log in" and a
  menu button; the four links move into a full-width sheet that drops from the masthead (`t-base`).
- **Filing desk top bar:** the firm's brand bar (section 11) then a 52 px tab row: "Filings",
  "New filing", "Ready to pay", "Client links", "Signatures", "Setup", "Billing". Ready to pay shows a
  count badge (`hold` tint) when filings are waiting. On phones, a bottom tab bar holds "Filings",
  "New filing" and "Ready to pay", with the rest under a menu.
- **Dashboard rail:** 240 px left rail on `sheet`, the account name at top in `h4`, links in the
  order of the layout ("Overview", "Filings", "Ready to pay", "Firms", "API keys", "Webhooks",
  "Setup", "Team", "Billing", "Sign-ups", "Docs"), 40 px rows, active row with a 3 px `ink` left
  rule. Collapses to a top menu below 1024 px.
- **Docs:** three columns at `xl` (rail 240, text 7 columns, on-page contents 200), two at `lg`,
  one on phone with a sticky contents button.
- **Skip link:** the first focusable element on every page, "Skip to content" **[copy needed]**.

### 9.9 Banners and notices

- **Beta notice:** 40 px strip above the masthead, `sheet-2` ground, `ink` text 14/20, centered,
  "Beta" in small caps semibold followed by the code's sentence. On firms' white-label pages the
  neutral version ("This service is in beta. …") with no CoFile name. Not on the embed widget.
- **Rehearsal banner (client pages, desk forms):** full-width band, `hold` tint ground, hatched 8 px
  left edge, the rehearsal glyph and the code's sentence, for example "Rehearsal: nothing will be
  filed or paid, even if you approve." in `ui` semibold. It is sticky on the proof (below the index
  strip) so it is visible at the button.
- **Notices** (`notice`, `.ok`, `.warn`, `.bad`): no box. A 4 px left rule in the tone color, the
  tone glyph, text in `ink`. Errors from the engine (`f.lastError`) appear as `bad` notices.
- **Inline "next step":** `nextStep()` texts set in `lede` size serif italic directly under the
  filing title, with a blue left marker, because they are the editor telling you what happens next.

### 9.10 Empty states

Typographic, not illustrated. The existing sentence set in `lede` serif, centered on a 7-column
measure, with the action buttons the code gives below it. Example, the desk's Filings page: "Your
desk is clear. Start a filing (it can be a free rehearsal), or send a client a link with your logo
on it." with "New filing" (`go`) and "Send a client a link" (`quiet`). A thin end mark sits under
the buttons.

### 9.11 Toasts

Bottom-left on desktop, bottom full-width on phones (above the tab bar). `sheet`, elevation 3,
`r1`, 4 px tone rule on the left, 16 px text, one line where possible, an optional action. Stay
6 s, or until dismissed if they hold an action; pause on hover and focus. Announced via a polite
live region. Used for "Copy link" confirmations and saves; never for errors that need action
(those are notices on the page).

### 9.12 Code blocks

`sheet-2` ground in light, #0E0F10 in dark, `mono` 15/22, 20 px padding, a 2 px `ink` top rule,
a "Copy" text button top right. Syntax in two inks: keys and punctuation `ink`, strings `blue`,
comments `ink-3` italic. No rainbow themes. Inline `code` gets `sheet-2` ground, 2 px padding.

### 9.13 Component state reference

Exact values for the build. "Light / dark" where they differ.

**Buttons**

| Variant | Default | Hover | Active | Focus | Pending | Disabled |
|---|---|---|---|---|---|---|
| `ink` | bg #15171A, text #FFFFFF / bg #ECEAE4, text #121314 | bg #2A2D32 / #FFFFFF | bg #000000, 1 px down / #D9D6CF | 2 px #1F45A8 outline, 2 px offset / #8FA8F0 | label from code, 2 px progress rule #FFFFFF at 60% along the bottom | bg #EFEDE7, text #62666D / bg #222428, text #94918A |
| `go` | bg #0E6B3F, text #FFFFFF / bg #5DC08A, text #0B1A12 | bg #0C5F38 / #74CB9B | bg #0A5230 / #4FAE7B | as above | as above | as above |
| `quiet` | transparent, 1 px #15171A border / 1 px #ECEAE4 | bg #EFEDE7 / #222428 | bg #E4E1D9 / #2A2D32 | as above | as above | border #D6D3CB, text #62666D |
| `text` | #1F45A8, 1 px underline / #8FA8F0 | 2 px underline | #15335F / #B3C4F5 | outline as above, 2 px radius | n/a | text #62666D, no underline |
| `stop` | transparent, 1 px #B02A1E, text #B02A1E / #F08A7E | bg #FBE6E3 / #34171A | bg #F6D2CD / #43201F | as above | as above | as `quiet` disabled |
| Firm `brand-action` | compiler output | compiler output darkened 8% in OKLCH L | 12% | as above | as above | as above |

**Fields**

| State | Border | Ground | Label | Message |
|---|---|---|---|---|
| Default | 1 px `field-border` | `sheet` | `ink` 600 | help in `ink-2` |
| Hover | 1 px `ink-2` | `sheet` | | |
| Focus | 1 px `blue` + 2 px `blue` outline + 4 px `blue-tint` halo | `sheet` | | |
| Filled by "Same as" or saved answers | 1 px `field-border` | `blue-tint` for 1.2 s, then `sheet` | | |
| Error | 2 px `stop` | `sheet` | `ink` 600 | `stop`, stop square glyph, starts with the label |
| Read-only (locked by an enterprise default) | 1 px dashed `rule` | `sheet-2` | `ink` 600 | a lock glyph and the reason, if the code gives one |
| Disabled | 1 px `rule` | `sheet-2` | `ink-3` | |

**Notices**

| Tone | Left rule | Glyph | Text | Use |
|---|---|---|---|---|
| plain (`notice`) | 4 px `ink` | none | `ink` | Facts, deleted-message notice |
| ok | 4 px `go` | filled circle | `ink` | "Saved to Google Docs. …", plan changes |
| warn | 4 px `hold` | pause bars | `ink` | "Approved and ready to pay. …", "1 filing needs someone to act." |
| bad | 4 px `stop` | filled square | `ink` | `f.lastError`, "Billing couldn't be loaded. …" |
| rehearsal | 8 px hatch | hatched square | `ink` 600 | Rehearsal banners |

Notice text is always `ink`, never the tone color, so long sentences stay at full contrast; the tone
lives in the rule and the glyph. Padding 12 px 16 px, no border other than the left rule, `sheet`
ground on paper pages and transparent on sheets.

**Chips:** see 9.4. Hover (where a chip is a filter toggle): 1 px `ink-2` border; selected: `ink`
fill with white text and the glyph kept.

---

## 10. Page by page

### 10.1 Home (`/`): the front page

The home page is a front page followed by a run of explainer spreads. Thirteen sections is a lot
of page, so wayfinding matters: each section opens with a 2 px section rule and a folio numeral
(01 to 13, Record Sans 600 13 px tabular, `ink-3`) at the left end of the rule, and the masthead
underlines the nearest of its four links as you pass that link's anchor ("How it works" from
#process, "For firms" from #firms, "What we file" from #coverage, "For platforms" from #enterprise).

Three layouts recur: **spread** (text columns 1 to 5, graphic 7 to 12), **wide** (heading and lede
1 to 8, graphic full width below) and **box** (a ruled sidebar).

**01 Hero (front page, above the fold).**

```
═══════════════════════════════════════════════════════════════════════════════════════ thick-thin
CoFile        How it works   For firms   What we file   For platforms      [Log in] [Run a free rehearsal]
───────────────────────────────────────────────────────────────────────────────────────
FOR CPA, PAYROLL, FRACTIONAL CFO AND TITLE FIRMS                     ┌───────────────────────────┐
                                                                    1│ Harbor & Pine CPA         │
Your client approves                                                 │ Two Sisters Bakery LLC  ▧ │
the proof. Then CoFile                                              2│ … details …               │
files it.                                                            │ … fees … $103.50 ═══      │
                                                                    3│ … NJ's own review page …  │
CoFile fills in your clients' LLC and corporation formations,       4│ [ Approve for filing ]    │
EINs and employer registrations on the official New York, …          └───────────────────────────┘
                                                                     SAMPLE PROOF · TEST DETAILS ·
[Run a free rehearsal]  [See what your client sees]                  NOT A REAL BUSINESS

In beta. A rehearsal fills in every screen of the state's real website and stops before the
last button, so nothing is filed and nothing is paid. You'll set up your firm's filing desk first.
───────────────────────────────────────────────────────────────────────────────────────
 How it works          │ For firms             │ What we file          │ For platforms
───────────────────────────────────────────────────────────────────────────────────────
```

- Kicker in small caps with a 24 px ink rule before it. H1 in `banner` across columns 1 to 7,
  three lines at `xl`. The name in the H1 is set in the same face as the rest: no logo in a headline.
- Sub (`lede`, serif) on columns 1 to 6. CTAs: "Run a free rehearsal" (`ink lg`), "See what your
  client sees" (`quiet lg`, anchors to #proof).
- The beta note is set as an editor's note: Record Text italic 17/26, `ink-2`, with a 2 px `ink`
  left rule, on columns 1 to 6. It is the most important honesty sentence above the fold and it
  must not look like legal small print.
- The sample proof (G1) sits on columns 8 to 12 at elevation 2, rotated 0 degrees (no jaunty tilt;
  a proof is checked straight), keys 1 to 4 in the gutter at its left. Its credit line, "Sample
  proof · test details · not a real business", is a small-caps credit under the sheet.
- Under the fold line, a four-column **front-page index** using the four masthead labels, each a
  link to its section, with column rules between. Collapses to a 2 × 2 grid on tablet and a list on
  phone.
- **Phone:** kicker, H1 (34/40, four or five lines), sub, two full-width buttons stacked, the beta
  note, then the sample proof full width with keys inside its left gutter. The proof comes after the
  buttons, so the first screen is the promise and the action.

**02 Process: "You start it. Your client approves it. CoFile files it."** Wide layout. Lede: "Three
steps, and your client is in charge of the middle one." G2 below: three columns joined by one 2 px
ink rule running through numerals 1, 2, 3. Columns 1 and 3 sit on the paper; column 2 sits on a
raised white sheet (elevation 2) 24 px taller than its neighbours, its rule segment thickened to
4 px, because the lede says the client is in charge of the middle one. (Not green: this is an
illustration, and the green is kept for real approvals.) The step names ("You start it.", "Your client approves it.", "CoFile files it.") in
`h3`, bodies in `body`. Phone: three stacked blocks on a vertical rule; the middle block on its sheet.

**03 The proof: "Your client sees what the state will see, before the state does."** This is where
"See what your client sees" lands, so it is the full explainer, G1 at its largest. Wide layout: H2
and the long lede ("You've approved a proof before: business cards, letterhead…") on columns 1 to 8;
below them, the sample proof again, now at the real proof's true width (720 px, columns 4 to 9),
with the six checks arranged around it like the labels of an explainer graphic, each item joined to
the part of the sheet it describes by a blue leader line. In the DOM it stays one list in its
locked order; only its placement is graphic. Each item carries a key that matches the markers:

| List item (locked copy) | Key |
|---|---|
| Every name, address and answer, in the order the state asks for them | 1 |
| Every fee in dollars and cents, from a verified fee table | 2 |
| Where the state's website allows it, a picture of the state's own review page, filled in | 3 |
| Each statement your client is making, such as letting the filing company sign or pay | plain tick |
| One button. Until it's pressed, nothing is submitted and nothing is paid. | 4 |
| For CPAs: it does for a business filing what the 8879 does for a return. | pull quote |

Placement at `lg` and up: items 1 and 2 on columns 1 to 3, level with the details and the fees;
items 3 and 5 on columns 10 to 12, level with the state's page and the button; item 4 under items
1 and 2, its leader running to the space between the fees and the state's page (in a real proof the
statements live in the terms block above the details, and the leader says so by ending at the top
edge of the sheet). Item 6 is set as a pull quote under the sheet: `pull` italic serif across
columns 2 to 11, a 2 px `ink` rule above, still last in the list. For the CPA reader that one line
does more than the whole page.

```
 [1] Every name, address and      ┌──────────────── proof ────────────────┐   [3] Where the state's
     answer, in the order the  ───┤ ① details                             │       website allows it, …
     state asks for them          │                                       ├───
 [2] Every fee in dollars and  ───┤ ② fees  …  $103.50  ═══               │
     cents, from a verified       │ ③ New Jersey's own review page        ├─── [4] One button. Until
     fee table                    │ ④ [ Approve for filing ]              │       it's pressed, …
 [✓] Each statement your          └───────────────────────────────────────┘
     client is making, …
 ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   "For CPAs: it does for a business filing what the 8879 does for a return."
```

Hovering or focusing an item lights its marker and its part of the sheet (`blue-tint`); hovering a
marker lights its item. At `md`, the leaders go and the list sits beside the sheet in two columns.
On phones the hero already showed the proof, so section 03 sets H2, lede, P2 (the phone at the
bakery counter, the screen showing the proof) and then the list with its markers.

**04 Firms: "Your name on the door. Ours in small print."** Spread, reversed (photo left). P1, the
sign-painted door, columns 1 to 6, with caption "Harbor & Pine CPA · example firm". Right: H2, lede,
the four ticked items. Under the photo, a small explainer: the firm's branded brand bar at true size
with a blue dimension line comparing the cap height of "Harbor & Pine CPA" with that of "with
CoFile". The numbers are measurements, not words: "28 px" and "11 px".

**05 Requests: "Clients don't fill in forms. They text you."** Spread. Right side, G3: the text
bubble (Record Sans 18/26 on `sheet-2`, a real message bubble shape with a 2 px tail, credit
"Ana Ortiz · text message · example" below it), then the arrow line "↳ read into a drafted New Jersey
LLC formation for your team to check" in `mono` `ink-2`, then a small drafted form (fields from the
sample proof). Three phrases in the bubble carry blue underlines with leaders to the fields they
became: "the bakery" to Business name, "me and my sister, 50/50" to Members, "Jersey City" to Main
business address. The address's street is shown with an `ink-3` dotted outline and no leader,
because it came from saved answers, not the text. The lede's last sentence, "A message alone never
reaches the state.", is set on its own line in semibold.

**06 Checks: "Checked twice. Filed once."** Wide. H2 at `banner` size: it is the best headline on
the page and deserves front-page scale. G4 below the lede: two readings side by side, "verified fee
table" and "the state's payment screen", each with "$103.50" in `fee-total`, joined by an equals
sign in a blue circle; underneath, the same pair with a mismatched amount drawn in `stop` and the
result "stops before paying" in a stop chip. The mismatched figure is drawn as a hatched blank, not a
made-up number. The list items follow in two columns; the standing certificate item gets an inline
agate table: "LLC $52, corporation $27", set from the item's own figures.

**07 After: "The papers come back to you."** Spread. G5: three horizontal lanes labeled "New Jersey",
"New York", "Florida", each starting at a "submitted" node and ending at "documents" node, with the
shape of what happens between, taken from the lede: New Jersey direct; New York with an email
receipt node; Florida with an examiner review node. No time axis, no durations: CoFile states no
turnaround times. P3 (the desk with returned papers) sits under the lanes on wide screens and is
omitted on phones.

**08 Rehearsals: "Rehearse on the real stage."** Spread with the log as the graphic. The log
(`aria-label` "Example rehearsal log") is set as an agate column on a white sheet: header line
"Rehearsal · New Jersey LLC formation" with "test details" in `ink-3` right; each line label, dot
leader, result; the last line "Pay Now ........ held, on purpose" in `hold` with the hatch. Above it,
G6, the thirteen-screen filmstrip: 13 thumbnails, 64 px wide, of the real New Jersey screens from a
rehearsal, twelve with a small filled marker, the thirteenth with the hatch. The caption is the
code's own: "13 screens of New Jersey's own LLC form, some grouped here, filled in with test
details. Nothing was filed." The second lede paragraph, "Try one on a filing you know by heart, and
compare it screen by screen.", stays where it is, after the first, but is set as a pull line:
Record Display Italic 26/34 with a 2 px `ink` rule above it.

**09 Coverage: "New York, New Jersey, Florida and the IRS."** Wide. H2, lede ("Every filing type
carries a plain label, so you always know which ones are live today."), then the ladder legend and
the coverage table (9.7) full width on a sheet. The note under it ("Rehearsed to the payment screen:
…") is set as a table footnote in `caption`, with the "Write to hello@cofile.app" link in blue. A
type switched live gets the green "Live" chip and a filled fifth square; nothing else on the page is
green except the buttons that move a filing forward.

**10 The catch: "Every filing service has a catch. Here's ours."** Box layout: a ruled sidebar the
full content width, `sheet-2` ground, thick-thin rule on top, set like a newspaper's corrections box.
The five points as a numbered list with hanging numerals in Record Display 44 px `ink`, text in
`body` serif 19/30. Two columns at `lg` (1 to 3 left, 4 and 5 right), one on phone. This is where a
skeptical reader decides to trust the page, so it gets the most careful setting on the site.

**11 Security: "Security".** A five-cell "fact box": a ruled grid (3 + 2 at `lg`, 2 + 2 + 1 at `md`,
stacked on phone) with column rules, each cell an icon (vault, key, single-use link, signature, two
boxes), the `h3` title and the paragraph. No colors other than ink and blue.

**12 Enterprise: "Building a filing product? Put CoFile underneath it."** Spread. Left: H2, lede,
the five ticked items; the `"dryRun": true` item shows the code inline in `mono` and "Read the API
docs" as a text link. Right: the inquiry form on a sheet, fields as the code has them: "Name",
"Company", "Work email", "Phone (optional)", "States you file in" (as a checkbox group), "Filings per
month" (a radio group of four, set as a segmented row on desktop), "What you'd like to do
(optional)", and "Send" (`ink md`). The honeypot field is visually hidden, not `display:none`.

**13 Close: "Run one rehearsal. Then decide."** Centered on columns 3 to 10, H2 in `banner`, lede,
"Run a free rehearsal" (`ink lg`) and "Questions first? hello@cofile.app". Then a section rule and
the tagline on its own line, Record Display Italic 28/36, followed by the end mark:
"Approve the proof. Then it's filed. ▪"

**Footer (the colophon).** On `paper`, above it a thick-thin rule. Line one: "CoFile · the filing desk
behind your firm" left, "New York · New Jersey · Florida · IRS" right. Line two, in `caption`: the
not-a-law-firm sentence left, "Terms · Privacy · Security · hello@cofile.app" right. Phone: stacked.

**Desktop wireframes for the three graphic-led spreads.**

06 Checks (wide):

```
━━ 06 ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Checked twice. Filed once.                                                     (banner, 80/84)
A state filing can't be taken back, so CoFile would rather stop and ask than guess.  (lede)

   ┌ VERIFIED FEE TABLE ┐        ┌ THE STATE'S PAYMENT SCREEN ┐
   │      $103.50       │  (=)   │          $103.50           │
   └────────────────────┘        └────────────────────────────┘
   ┌ verified fee table ┐        ┌ the state's payment screen ┐
   │      $103.50       │  (≠)   │         ▨▨▨▨▨▨▨            │   ■ stops before paying
   └────────────────────┘        └────────────────────────────┘

 ✓ The fee your client approves comes from    │ ✓ If a state has changed its form since CoFile
   a verified fee table. CoFile reads it …    │   last verified it, the filing stops …
 ✓ It reads the fine print. By card, New      │ ✓ A filing is never sent twice on its own. …
   Jersey's standing certificate costs …      │ ✓ How CoFile handles Social Security numbers,
     LLC ............ $52                     │   cards and state logins: see Security.
     corporation .... $27                     │
```

08 Rehearsals (spread):

```
━━ 08 ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Rehearse on the real stage.              │ ▪▪▪▪▪▪▪▪▪▪▪▪▧   (13 screens, G6)
                                         │ ┌────────────────────────────────────────────────┐
CoFile is in beta, and here's what that  │ │ Rehearsal · New Jersey LLC formation  test det. │
means. Any filing can run as a           │ │ Business name ..................... filled     │
rehearsal: the whole filing, performed   │ │ Name check ........................ passed     │
on the state's real website with no      │ │ Registered agent .................. filled     │
audience. …                              │ │ Members and signatures ............ filled     │
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━   │ │ Review page ........... matched the proof      │
Try one on a filing you know by heart,   │ │ Payment: $100.00 + $3.50 NJ portal fee         │
and compare it screen by screen.         │ │   .............................. matches the proof
  (pull line, italic serif)              │ │▧Pay Now .................. held, on purpose    │
                                         │ └────────────────────────────────────────────────┘
                                         │ 13 screens of New Jersey's own LLC form, …
```

09 Coverage (wide):

```
━━ 09 ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
New York, New Jersey, Florida and the IRS.
Every filing type carries a plain label, so you always know which ones are live today.

■■■■■ ● Live 0   ■■■■□ ▧ Rehearsed to the payment screen 5   ■■■□□ □ Screens recorded, rehearsal next 7
■■□□□ □ Offered, not yet rehearsed 3   ■□□□□ □ Planned 1
┌──────────────────────────────────────────────────────────────────────────────────────┐
│ FILING ▾                                   WHERE ▾        WHERE IT STANDS ▾           │
│ ════════════════════════════════════════════════════════════════════════════════════ │
│ LLC formation                              New Jersey     ■■■■□ ▧ Rehearsed to the …  │
│ …                                                                                    │
└──────────────────────────────────────────────────────────────────────────────────────┘
Rehearsed to the payment screen: CoFile completed every screen on the state's real website …
```

(The counts shown are computed from today's `COVERAGE` array with nothing switched live; they
change by themselves when a type goes live.)

**Responsive summary**

| Section | `xs`/`sm` (phone) | `md` (tablet) | `lg`/`xl` (desktop) |
|---|---|---|---|
| 01 Hero | Copy, buttons, beta note, then the proof full width | Copy over proof, proof 6 of 8 columns | Copy 1–7, proof 8–12 |
| 02 Process | Vertical rule, three blocks | Three columns, smaller sheet lift | Three columns, G2 |
| 03 The proof | H2, lede, P2, keyed list | Proof and list side by side | Explainer with leaders |
| 04 Firms | Copy, list, P1, ratio strip | Photo over copy | Photo 1–6, copy 7–12 |
| 05 Requests | Bubble, arrow line, draft with markers | Two columns, markers | G3 with leaders |
| 06 Checks | Readings stacked, list one column | Readings side by side, list one column | As wireframe |
| 07 After | Lanes, list (no photo) | Lanes, list, photo | Lanes and G8 beside P3 |
| 08 Rehearsals | Filmstrip 4 × 3 + 1, log, caption | Copy over log | As wireframe |
| 09 Coverage | Stacked records, legend wraps | Table, "Where" column narrow | Full table |
| 10 The catch | One column, numerals hang | Two columns | Two columns |
| 11 Security | Stacked cells | 2 + 2 + 1 | 3 + 2 |
| 12 Enterprise | List, then form | List over form | List 1–6, form 7–12 |
| 13 Close | Centered, buttons full width | Centered | Centered on 3–10 |

### 10.2 Sign-up, log in and account pages

All share one layout, **the reply card**: masthead (without the section links), then a two-column
page at `lg`: the form on a sheet across columns 1 to 6, and a quiet column 8 to 12 holding the
page's lede and, on sign-up, a miniature of the filing desk's brand bar. On phones, lede then form.

- **`/signup`**, "Set up your firm's filing desk". The lede sits above the form. Fields in the code's
  order: "Firm name", the kind of firm (a radio list, not a select, because five options fit and older
  readers find selects fiddly), "Your name", "Work email", "Password" and "Password again" as a pair
  with the help "At least 12 characters. A short sentence works well." under the label, "Phone
  (optional)" and "Website (optional)" as a pair, "States you file in", the volume radios, then the
  agreement checkbox ("I agree to the Terms of Service and the Privacy Policy", both links open in
  a new tab with an external-link glyph), then "Create account" (`ink lg`, full width). Under it, the
  hero note "Building a filing product? …" in `caption`. A live preview strip on the right column
  shows the firm name the user types in a brand bar, with "with CoFile" at its end: they see their
  name on the door before they've finished the form.
- **`/signup/sent`**, "Check your email": a single centered sheet, the large email icon in blue, the
  H2, the note "No email after a few minutes? Check spam, or …".
- **`/login`**, "Welcome back": lede "Firms go to their filing desk, platforms to their dashboard.",
  "Continue with Google" (`quiet lg` with Google's own mark per their guidelines) above a hairline,
  then email and password, "Log in" (`ink lg`), the "Forgot your password?" text link, and "Set up your firm's
  filing desk" as a text link at the foot.
- **`/forgot-password`** ("Reset your password", "Email me a reset link"), **`/reset-password`**
  ("Choose a new password", "Set new password"), **`/verify-email`** ("Confirm your email", "Confirm
  my email", and the resend form with "Send a new link"): one sheet each, one field group, one button.
- **`/invite-expired`** ("This link has expired or isn't valid") and **`/join/<token>`**: `/join`
  is a redirect; if it must pause (token check), it shows a centered sheet with a 2 px progress rule
  and no text beyond the page title **[copy needed]**, then lands on the desk or the expired page.
- **`/p/<slug>/signed-out`**, "You're not signed in to this filing desk": the firm's brand bar
  (neutral if unknown), the sheet with the two paragraphs.

### 10.3 Terms and Privacy (`/terms`, `/privacy`)

Long-form reading pages. Text on columns 3 to 9, `body-read` serif 19/30, numbered section heads in
`h3` sans with hanging numerals in the left margin, a sticky contents list in columns 10 to 12 at
`xl` (from the page's own headings), the version and date line from the page in `caption` under the
H1, and the end mark after the last sentence. Print stylesheet: black on white, 11 pt serif, URLs
printed after links, no masthead.

### 10.4 Not found and error

- **404**, "Page not found": the masthead, then a front-page layout with the H1 at `h1` size and "The
  link may be old or mistyped." as the lede, "Go to the home page" (`ink md`). A faint folio "404"
  in the section rule, as a page number.
- **Error**, "Something went wrong": same layout, "Try again" (`ink md`) and "Log in again" (`quiet
  md`), and the reference line "If it keeps happening, tell us this reference: …" with the digest in
  `mono` and a copy button. On a firm's pages, both pages render inside the firm's brand bar.

### 10.5 The filing desk (`/p/<slug>`)

A working page: sans, dense but never small. The firm's brand bar on top (section 11), the tab row,
then content on the 12-column grid inside a 1224 px frame (the desk has no left rail; seven tabs fit
across).

```
╔══════════════════════════════════════════════════════════════════════════════╗  firm color rule
║ [logo] Harbor & Pine CPA                    m.reyes@… [Log out]   with CoFile ║
╟──────────────────────────────────────────────────────────────────────────────╢
║ Filings  New filing  Ready to pay (1)  Client links  Signatures  Setup  Billing║
╚══════════════════════════════════════════════════════════════════════════════╝
 ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━  section rule
 Filings                                                         [New filing]
 ▍1 approved filing is ready to pay and needs your card's security code. Pay and file
 ▍1 filing needs someone to act.
 FILING                    TYPE                         STATUS                  STARTED
 ───────────────────────────────────────────────────────────────────────────────────
 Two Sisters Bakery LLC ▧  New Jersey LLC formation     ‖ Waiting for approval   11/26/2026
```

- **Filings (home).** H1 "Filings" with "New filing" (`go md`) at the right. Notices (Ready to pay,
  needs someone to act, subscription) as ruled `warn` notices, each with its link. The table: Filing
  (link) with a rehearsal chip after the name for rehearsals, Type, Status chip, Started. Rows that
  need action sort first and carry a 3 px `hold` left rule. Empty state as in 9.10.
- **Setup** ("Set up your account" / "You're set up"). The three steps as a numbered checklist on
  one sheet: a 28 px numeral circle (filled `ink` with a white tick when done), title in `h4`, the
  step text, and the button ("Set up your firm", "Set up branding", "Set up payment", or "Change").
  The next step's button is `ink`; the others `quiet`. "Registered agents (optional)" below as its
  own ruled row with "Add agents". When done, "Start a filing" (`go lg`).
  - **Your firm** (details): one sheet, fields paired, "Save and continue".
  - **Branding**: the form on columns 1 to 6, a **live proof preview** on columns 7 to 12: the real
    `ProofSheet` component rendering the sample filing in the firm's chosen logo, colors and font,
    plus a phone-width preview of the intake form below it. Under the color fields, the contrast
    check from section 11 reports in plain words what the system will do **[copy needed]**. The two
    helps from the code ("Buttons and the top of the page. Button text is white, so choose a dark
    color." and "Links and highlights. Choose a color that's easy to read on white.") stay until the
    automatic fix ships; see Appendix B.
  - **Registered agents**: one ruled block per state the firm files in, the saved agent shown as a
    small address card, "Change" or "Add".
  - **Payment**: the card list as rows (brand, last four in `mono`, label, which filing types it
    pays), the routing choice ("one card for everything, or one per filing type, with a backup") as
    two large radio cards, and the Basis Theory sentence set as an editor's note with a vault icon.
- **New filing.** Three steps, each a full page with a breadcrumb rule ("All states" links back).
  1. "Which state is the business in?": three large typographic tiles, New York, New Jersey and
     Florida, set in Record Display 32 px on sheets (a row of three at `md` and up, stacked on
     phones), each with its count line from the code in `ui-small` ("1 filing type, plus the federal
     EIN", "None offered yet", or "Federal EIN only. To offer … filings, choose them in Setup."). No
     maps, no seals. The note "Filing types go live one at a time; until then they run as
     rehearsals. See What we file for where each one stands." sits above the tiles as an editor's
     note; the "Or send us the details and we fill in the form for you to check:" list (email, text
     or WhatsApp, Slack's `/file`) sits below them as a ruled strip of three channels, each with its
     icon and the address in `mono`.
  2. "{State}: what are you filing?": the filing types as ruled rows rather than a grid of cards:
     title in `h4`, the code's chip ("Live" in solid green, or "Rehearsal" with the hatch, whose
     tooltip text "Runs on the state's real website and stops before the last button: nothing is
     filed or paid" becomes a visible second line on touch devices, where tooltips don't exist), and
     the summary in `ink-2`. The whole row is the link, 72 px minimum, chevron at the right. The lede
     ("Fill it in yourself, or send your client a link…") above. The permanent-page and widget block
     below as a folded ruled section per filing type, the link in `mono` with "Copy link".
  3. The form (`IntakeForm`): sections as numbered parts with `h3` heads and a hairline, paired
     fields, "Same as", folded "More options (optional)", authorizations in their ruled blocks, and
     the submit "Send the proof to my client" (`go lg`) with the footnote above it. A sticky part
     index on the left at `lg` (section titles from the form), a progress rule on phones.

```
 ← All states
 ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 New Jersey: what are you filing?
 Fill it in yourself, or send your client a link to fill it in. Either way, your client approves …
 ──────────────────────────────────────────────────────────────────────────────────────────────
 LLC formation                                           ▧ Rehearsal                        ›
 {summary from the filing type}
 ──────────────────────────────────────────────────────────────────────────────────────────────
 Employer registration (NJ-REG)                          ▧ Rehearsal                        ›
 {summary}
 ──────────────────────────────────────────────────────────────────────────────────────────────
 (a type switched live)                                  ● Live                             ›
```

The form page at `lg`:

```
 ┌ PARTS ──────────┐  New Jersey LLC formation
 │ 1 The business  │  ──────────────────────────────────────────────────────────────
 │ 2 Members       │  1  {section title}
 │ 3 Agent         │     Business name                          Ending
 │ 4 …             │     [______________________________]       [LLC     ▾]
 │                 │     Main business address
 │                 │     [__________________________________________________]
 │                 │     [City_____________________] [State] [ZIP____]
 │                 │     Same as  [Members' address 1]
 │                 │     ▸ More options (optional)
 │                 │  2  {section title}
 └─────────────────┘  …
                      ┃ Authorizations
                      ┃ [ ] {consent text at full size}
                      {footnote}
                      [ Send the proof to my client ]
```

(Part names in this wireframe are placeholders for the form's own section titles, which come from
each filing type's definition in `lib/intake/forms`.)
- **Filing detail.** The `FilingRecord` timeline (9.5) is the page. Header: back link "← Filings",
  title in `h1` serif (the business name is the headline of its own record), status chip, rehearsal
  chip, the meta line in `ui-small`. The `nextStep()` sentence as an editor's note. Then, at `lg`, two
  columns: the timeline (columns 1 to 7) and a right column with "Link to the proof" (the link in
  `mono` on `sheet-2` with "Copy link"), "Documents" (each document as a row with a document icon,
  the label and kind, and a download action), "EIN" (the number in `mono` 22 px, with the IRS letter
  as a document row), "Save to Google Docs". "Progress on the state site" stays folded, its steps set
  as an agate log like the home page's rehearsal log, so the firm sees the same picture they were
  sold.
- **Client links** ("Send a client a link"). Form on a sheet: "Filing" select, "Who it's for (shown
  to you and the client)", "Make link" (`ink`). Made links as a table with "Copy link", "Email it
  from your mail app", "Turn off" (`stop sm`, with confirm) and "Used: open the filing".
- **From email** ("Request by …"). Spread: the original message on the left as a quoted letter (Record
  Text, `sheet-2`, a 4 px `ink-3` left rule, sender and channel as a credit line); on the right "This
  looks like a request for: …" and "Open the filled-in form" (`go md`). The fields read from the
  message carry blue underlines in the message and matching keys on the draft, the same device as
  G3. The deleted-after-30-days notice replaces the message with a hatched blank of the same height.
- **Signatures** ("Saved signatures"): each saved signature on a white sheet, the signature image at
  true size, the signer's name and date, "Remove". "Add a signature" below with the pad and the
  consent block.
- **Ready to pay.** A focused page. The lede ("Approved filings that pay the state with a saved card
  wait here…") then one sheet per card: card label and last four in `mono`, the filings waiting for
  it as a fee table with a ruled total, the security code field (the card vault's hosted field, labelled "Security code for {card}"),
  and "Pay and file" (`go lg`). "Nothing is waiting for a card right now."
  as the empty state. A 60-minute keep rule appears as a small clock icon next to the code's sentence.
- **Billing.** Plan name and its price **from Stripe** (no price is ever hard-coded or shown
  publicly), a ruled invoice table, the registered-agent lines (each business with its renewal date),
  the plan picker as radio cards. Notices as the code gives them.
- **Password.** One sheet, "Change password".

**Filing detail at `lg`:**

```
 ← Filings
 ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 Two Sisters Bakery LLC   ‖ Waiting for approval   ▧ Rehearsal                    (h1 serif 44/50)
 New Jersey LLC formation · started 11/26/2026, 10:02 AM by m.reyes@… (client link)
 ┃ The approver has a link to check exactly what will be filed and approve it.    (next step)
 ─────────────────────────────────────────────────────┬──────────────────────────────────────
  ○ Received                         10:02 AM          │ LINK TO THE PROOF
  │                                                    │ We emailed this link to ana@… If they
  ● Getting the state's review page  10:03 AM          │ can't find it, you can pass it on. It
  │   (register moment plays here)                     │ shows exactly what will be filed and
  ◉ Waiting for approval  ◀ now      10:05 AM          │ the fees.
  ┆                                                    │ ┌──────────────────────────────────┐
  ◌ Approved                                           │ │ https://api.cofile.app/…         │
  ◌ Submitted to the state                             │ └──────────────────────────────────┘
  ◌ Accepted by the state                              │ [Copy link]
  ◌ Completed                                          │ ───────────────────────────────────
                                                       │ DOCUMENTS   (none yet: section hidden)
  ▸ Progress on the state site (rehearsal, …)          │ EIN         (hidden until issued)
                                                       │ [Save to Google Docs]  A copy of …
```

Phone: the header, the next-step note, then the right column's blocks (link, documents, EIN) above
the timeline, because on a phone the thing to act on comes first and the history after it.

**Ready to pay at `lg`:**

```
 Ready to pay
 Approved filings that pay the state with a saved card wait here for the card's security code
 (the 3 or 4 digits on the card). Enter it once and every filing waiting for that card goes ahead.
 We keep the code for an hour at most, then delete it.                              🕐
 ┌─────────────────────────────────────────────────────────────────────────────────────────┐
 │ Firm card  ···· 4242                                                                    │
 │ Two Sisters Bakery LLC · New Jersey LLC formation                              $103.50 │
 │ {another approved filing}                                                       $xx.xx │
 │ ─────────────────────────────────────────────────────────────────────────────────────── │
 │ Total                                                                          $xxx.xx │
 │ ═══════════════════════════════════════════════════════════════════════════════════════ │
 │ Security code for Firm card ···· 4242  [ 123 ]                [ Pay and file ]          │
 └─────────────────────────────────────────────────────────────────────────────────────────┘
```

The total row uses the fee table's "Total" label; the figures are the approved filings' own totals.
The security-code field is the card vault's hosted element (its iframe), so it is styled through the
vault's style options to match our field spec exactly: 52 px tall, 18 px figures, `field-border`,
the same focus ring drawn on its wrapper. "Pay and file" is the `go lg` button; while pending it
reads "Sending…", as in the code. When the code is accepted, the sheet's top rule turns `go`.

### 10.6 Permanent branded service pages (`/<firm>/<service>`)

Example: `cofile.app/bestaccounting/llc-filing-new-york`. Entirely in the firm's theme. Layout:
the firm's brand bar, then a single column (columns 3 to 10 at `lg`) with the filing type's title
as `h1` in the firm's heading font, the summary and the "After you send this…" sentence as the lede,
the rehearsal banner when the type isn't live, the form, the "Next, we'll email you a proof to check…"
line above "Send", and the terms line in `caption`. Footer: "Questions? Email …" with the firm's
support address, and "with CoFile" small at the right. The neutral beta notice sits above the brand bar.

### 10.7 Client-facing pages

**The intake form (`/i/<token>`).** Built for a phone first, for a reader who may be older or
Spanish-first. One column, max 640 px, body 18/28, inputs 52 px. The firm's brand bar, the neutral
beta notice, the rehearsal banner when it applies ("This page is in rehearsal for now. …" in full),
the title (`h1` firm font, 30/36), the summary lede, then the form in short numbered parts. Each part
is one screen's worth on a phone; the next part stays visible below (no pagination, no wizard that
hides what's coming). Submit at the end, full width. The expired and closed states ("This link has
expired or isn't valid", "This link can't be used", "This filing is no longer offered") use one
centered sheet in the firm's theme with the firm's contact line.

**The proof (api.cofile.app).** The most important page on the system. Phone wireframe:

```
┌──────────────────────────────────┐
│▔▔▔▔▔▔▔▔▔▔ firm color rule ▔▔▔▔▔▔▔│
│ [logo] Harbor & Pine CPA   with  │
│                            CoFile│
├──────────────────────────────────┤
│ ① Filing details  ② State fees   │  sticky index strip, scrolls sideways
│ ③ The state's review page  ④     │
├──────────────────────────────────┤
│▧ Rehearsal: nothing will be filed│  only on rehearsals; sticky under the strip
│  or paid, even if you approve.   │
├──────────────────────────────────┤
│ Two Sisters Bakery LLC           │  h1 serif 30/36
│ Filing reference … Please decide │  ui 17/26 ink-2; the deadline in semibold ink
│ by December 3, 2026, 5:00 PM     │
│ Eastern. After that, this link   │
│ stops working and you'll need a  │
│ new one.                         │
│┃By approving, you confirm every  │  the terms block: the note from render.ts,
│┃detail below is correct and      │  intact and in its order; sheet-2 ground,
│┃authorize its submission exactly │  4 px ink left rule, ui 17/26 ink
│┃as shown, and payment of the fees│
│┃shown, up to the total shown     │
│┃($103.50). Government fees       │  this sentence semibold
│┃generally can't be refunded once │
│┃paid, even if the filing is      │
│┃rejected. … Government sites     │
│┃don't save drafts, so once you   │
│┃approve, the whole filing is sent│
│┃in one go. Please check          │
│┃everything now.                  │
│                                  │
│ ① Filing details                 │  h2 serif 24/30, marker in the margin
│ Business name                    │  label ui-small ink-2
│ TWO SISTERS BAKERY LLC           │  mono-proof on blue-tint
│ Members                          │
│ Ana Ortiz, Lucia Ortiz (50/50)   │
│ …                                │
│ ② State fees                     │
│ Nothing is charged on this page. │
│ These fees are paid to the state │
│ when the filing is submitted.    │
│ Formation filing fee     $100.00 │  fee, tabular, decimal-aligned
│ NJ portal fee, by card     $3.50 │
│ ──────────────────────────────── │  single rule above the total
│ Total                    $103.50 │  fee-total
│ ════════════════════════════════ │  double rule below
│ ③ The state's review page        │
│ This is a picture of the state's │
│ own review page, filled in …     │
│ ┌──────────────────────────────┐ │
│ │ white mat: state capture     │ │  tap to open full screen, pinch to zoom
│ └──────────────────────────────┘ │
│ ④ ─────────────────────────────  │  section rule, the decision
│ Total                    $103.50 │  recap, same labels and figures as ②
│ One-time code sent to you        │  only when required
│ [__________________]             │
│ ┌──────────────────────────────┐ │
│ │ Approve, and authorize       │ │  go lg, 64 px, two centered lines
│ │ submission and payment       │ │
│ └──────────────────────────────┘ │
│ [ Request changes              ] │  quiet lg, full width
│ Questions: help@harborpine.examp │
└──────────────────────────────────┘
```

Desktop (`lg` and up): the sheet is 720 px wide, centered on the paper, at elevation 2; the index
strip becomes a sticky column in the left margin (the four markers stacked with the headings beside
them, 200 px wide); the markers sit 16 px outside the sheet's left edge; the brand bar spans the
viewport.

Rules for the proof:

- **The beta notice.** The neutral notice ("This service is in beta. …") sits above the brand bar
  in its slim form, as on every firm page, and scrolls away; only the rehearsal band is sticky.
- **The terms come first, because the copy says "below".** The approval consent reads "By approving,
  you confirm every detail below is correct…". The word "below" fixes its position: it must stand
  above the details. So the whole note from `render.ts` (the consent, the EIN sentence when there is
  one, and "Government sites don't save drafts…") stays together, intact and in its order, directly
  under the deadline line, as **the terms block**. It is the first thing read and the thing every
  later section is checked against. (Appendix B suggests a wording that would let the consent sit
  beside the button; until then, the copy decides the layout.)
- **Order matches the sample**: details (1), fees (2), the state's review page (3), the decision (4).
  Today the real page puts the picture first and the sample puts it third; the CPA was shown one
  order and the client gets another. The index strip uses the page's own headings ("Filing
  details", "State fees", "The state's review page"); item 4 is the marker alone and jumps to the
  decision.
- **The decision recap.** Directly above the button, the total is repeated with the fee table's own
  label and figure ("Total $103.50"), or "Maximum you authorize" and its figure when the filing has
  a fee cap. No new words: the reader sees the amount she is authorizing at the moment she presses.
- **The consent is set at reading size**, never in small print. "Government fees generally can't be
  refunded once paid, even if the filing is rejected." is semibold.
- **"Maximum you authorize"** gets its own ruled row under the total in ②, with its parenthesis
  ("if the state asks for more, we stop before paying") in `ink-2`.
- **Rehearsals repeat the banner at the button.** On a rehearsal, "Rehearsal: nothing will be filed
  or paid, even if you approve." is repeated, word for word, in a hatched band directly above the
  button, so it is on screen at the moment of the decision as well as at the top.
- **No sticky approve button.** The button appears once, at the end, after everything it approves.
  The sticky index strip lets the reader jump, but the button is only reached after the details and
  fees have passed on screen.
- **"Request changes"** first reveals the comment field ("What should change? (Needed only if you
  ask for changes)") and moves focus to it; pressing it again submits. On approval the field stays
  hidden. With JavaScript off, the field is shown above both buttons, as the code renders it today.
- **The state's review page picture** sits on a white mat with its caption paragraph above it, can
  be opened full screen with pinch zoom, and keeps its long alt text from the code.
- **SSN masking:** masked values in `mono` with the last four in `ink` and the mask in `ink-3`.
- **Dark mode:** the proof follows the device, except the white mat around the state's picture.
- **After deciding:** the decision page in the same theme: "Approval recorded" with the stamp moment
  (8.3) and the code's paragraph for a rehearsal or a live filing.
- **Approval errors and expired links:** today these are bare paragraphs. They get the full branded
  frame: the brand bar, one centered sheet, the code's sentence as the lede ("This link to the proof
  has expired. Ask whoever sent it for a new one.", "A decision was already recorded with this link,
  so there's nothing more to do here.", "That code didn't match. …"), and the firm's contact line. A
  stop glyph for invalid and wrong code, an open circle for already decided.

**The intake form on a phone:**

```
┌──────────────────────────────────┐
│ This service is in beta. …       │  neutral beta notice, 14/20
│▔▔▔▔▔▔▔▔▔▔ firm color rule ▔▔▔▔▔▔▔│
│ [logo] Harbor & Pine CPA   with  │
│                            CoFile│
├──────────────────────────────────┤
│▧ This page is in rehearsal for   │  rehearsal band, when it applies
│  now. You can fill it in and see │
│  your proof, but nothing will be │
│  filed with the state … To file  │
│  for real, contact Harbor & Pine │
│  CPA.                            │
├──────────────────────────────────┤
│ New Jersey LLC formation         │  h1, firm heading font, 30/36
│ {summary} After you send this,   │  lede 18/28
│ you'll get a link to check       │
│ exactly what will be filed, and  │
│ nothing is filed until it's      │
│ approved.                        │
│ ━━ 1 ━━━━━━━━━━━━━━━━━━━━━━━━━━━ │  part rule with numeral
│ {section title}                  │
│ Business name                    │  label 17 semibold
│ [____________________________]   │  52 px input
│ …                                │
│ ━━ 2 ━━━━━━━━━━━━━━━━━━━━━━━━━━━ │
│ …                                │
│ Next, you'll get a proof to      │
│ check. Nothing is filed until    │
│ it's approved.                   │
│ ┌──────────────────────────────┐ │
│ │ Send to Harbor & Pine CPA    │ │  brand-action lg, full width
│ └──────────────────────────────┘ │
│ By sending, you agree to …       │  caption, links underlined
│ Questions? Email …               │
└──────────────────────────────────┘
```

Behaviour notes: the "the filing company" definition line that the forms carry sits at the top of
the Authorizations block, set as a definition (term in semibold, then the rest), because a client
must know who that is before checking anything. Repeated groups (the code's "Add {item}" buttons,
for example "Add member", with each block titled "{Item} {n}") add a new ruled block that scrolls into view with `t-base` and receives
focus on its first field. A kept draft (the existing `useKeptForm`) restores silently; nothing
flashes.

**The decision page (after approving):**

```
┌──────────────────────────────────┐
│ [logo] Harbor & Pine CPA   with  │
│                            CoFile│
├──────────────────────────────────┤
│  ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓  │  the frame draws clockwise, t-weight
│  ┃   Approval recorded        ┃  │  h1 serif 34/40
│  ┃   Nov 27, 2026 · 9:14 AM   ┃  │  mono 15/22, time of the decision
│  ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛  │
│ Thank you. Your approval is      │  the code's paragraph, 18/28
│ recorded. We'll submit the filing│
│ exactly as shown. If the state's │
│ page has changed by then, we stop│
│ before paying, and you may be    │
│ asked to approve again. We'll    │
│ email you when it's complete.    │
│ Questions: …                     │
└──────────────────────────────────┘
```

The time line under the heading is a value (when the approval was recorded), not new words; it is
the dated signature an editor puts on a press OK. On a rehearsal the frame is drawn with the hatch
along its left side and the rehearsal paragraph follows.

### 10.7a Print

CPAs print. Title closers print. Every record a client approves will end up in a paper file, so
the important pages get print stylesheets designed with the same care as the screen.

- **The proof** prints on US Letter (and A4) at 10.5 pt Record Text and 10 pt Record Mono, margins
  0.75 in, the firm's logo and name at the top, "with CoFile" in 7 pt in the footer, page numbers
  "1 / 2" in the footer right. The terms block, details, fees and the state's review page print in
  that order; the buttons and the code field don't print; a 2 in ruled blank sits at the end of the
  last page for the firm's own initials if they want them (rules only, no words). The state's
  picture prints at full column width in grayscale-safe contrast.
- **The filing record** (filing detail) prints as a file copy: header, timeline with dates, the
  documents list with their names, the EIN, and the proof link's reference, no navigation.
- **The coverage table** prints on one landscape page with the legend and the footnote.
- **Terms and Privacy** print as in 10.3.
- In print, editor's blue becomes 60% black with the markers kept as outlined numerals, and the
  rehearsal hatch prints as a 0.5 pt diagonal pattern, so a black-and-white office printer keeps
  every distinction.

### 10.8 Enterprise dashboard (`/dashboard`)

Working pages for product managers and engineers. The 240 px rail, content on the remaining grid,
sans throughout, the wordmark at the top of the rail (enterprise accounts see CoFile, not a firm).

- **Overview** (the account name as `h1`): the page's three figures ("Filings", "Webhook
  deliveries", "API keys") set as a newspaper's market strip, then "By status", "By state" and "By
  month" as charts in the house style, and the "As of …" line as a dateline (wireframe below).
  Notices ("Real filings need an active subscription; rehearsals are free.", "Pay and file") as ruled
  `warn` notices above the strip.
- **Filings:** the data table at compact density, filters by status and firm as chip toggles, the
  rehearsal chip on rehearsal rows, filing references in `mono`.
- **Firms** and **firm detail** (the firm name as `h1`, "Filing desk", "Invite staff"): a firm's
  brand bar preview at the top of the detail page, so the enterprise sees what the firm's clients see.
- **API keys:** keys as rows with the prefix (`cofile_` plus 8) in `mono`, "Last used" right-aligned,
  "Revoke" (`stop sm`). A new key appears once in a `secret` block: `mono` on `sheet-2`, a 1 px
  dashed `ink` border, "Copy", and the code's own line ("…: copy this key now. It won't be shown
  again.") as a `hold` notice directly above it.
- **Webhooks:** endpoints as rows with the URL in `mono`, events as chips, recent deliveries as an
  agate log with HTTP status codes in `mono` and tones (2xx go, 4xx and 5xx stop).
- **Setup:** "Payment methods", "State portal logins" (one ruled row per portal: NY DOS, NYS-100,
  NJ, IRS, FL, each with its status and "Disconnect" or "Not needed"), "Who's named on your filings",
  "Your registered agent in each state", "Defaults per portal", each as a numbered part on one page
  with a sticky part index, like the intake form.
- **Ready to pay, Billing, Team** ("Add someone"), **Password:** as the desk's versions, in the
  dashboard frame.
- **Sign-ups** (platform tenant only): "Waiting for approval", "Decided", "Enterprise requests" as
  three ruled sections. Each pending sign-up is a row with the firm name, kind, states and volume,
  and approve/decline buttons; enterprise requests show the inquiry form's answers as a quoted card.

**Dashboard overview at `xl`:**

```
┌──────────────┬───────────────────────────────────────────────────────────────────────────────┐
│ CoFile       │ ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ │
│              │ {account name}                                                     (h1 44/50) │
│ ▍Overview    │ ▍Real filings need an active subscription; rehearsals are free. Subscribe     │
│  Filings     │ ───────────────────────────────────────────────────────────────────────────── │
│  Ready to pay│ FILINGS                │ WEBHOOK DELIVERIES        │ API KEYS                 │
│  Firms       │ 1,284                  │ 12,907                    │ 4                        │
│  API keys    │ 0 live, 1,284 rehearsals│ 3 pending, 0 failed      │ Manage keys              │
│  Webhooks    │ ───────────────────────────────────────────────────────────────────────────── │
│  Setup       │ BY STATUS                                                                     │
│  Team        │ ███████████████████ ▓▓▓▓▓▓ ░░░░░░░ ▒▒   one stacked bar in status tones       │
│  Billing     │ ● Completed 812  ‖ Waiting for approval 41  ○ Filing now 6  ■ Failed 3  …     │
│  Sign-ups    │ ─────────────────────────────────────┬─────────────────────────────────────── │
│  Docs ↗      │ BY STATE                             │ BY MONTH                               │
│              │ New Jersey  ████████████  611        │  ▁▃▅▆█   columns, ink, tabular labels  │
│ m.lee@… ▾    │ Florida     ███████  402             │                                         │
│              │ New York    ████  271                │                                         │
│              │ As of 11/26/2026, 4:10:22 PM.                                                 │
└──────────────┴───────────────────────────────────────────────────────────────────────────────┘
```

(The figures are illustrative; the labels are the page's own: "Filings" with "{n} live, {m}
rehearsals", "Webhook deliveries" with "{n} pending, {m} failed", "API keys" with "Manage keys", then
"By status", "By state", "By month" and the "As of …" line, which I set as a dateline in `caption`
directly under the h1 rather than at the foot, because a reader judges every figure by its date.)

The figure strip is a market strip: three columns with column rules, the label in small caps 12 px
`ink-2`, the figure in Record Sans 700 32/40 tabular, the subline in `ui-small`. Charts follow the
house rules: "By status" is one 16 px stacked bar, segments in status tones in the order Go, Wait,
In motion, Stop, separated by 2 px `sheet` gaps, with a chip legend so the bar is never the only way
to read the counts. "By state" and "By month" are not status data, so they are drawn in `ink` only:
horizontal bars with the value at the bar's end, and columns with the month labels below, no
gridlines beyond a baseline and one hairline at the maximum, values on hover and in a visually
hidden table for screen readers.

### 10.9 White-label surfaces

- **`/e/<tenant>/<firm>/<service>`:** the same page as 10.6 in the enterprise's theme, with the
  enterprise's name and support contact. No CoFile mark unless the enterprise turns on "with CoFile".
  The neutral beta notice shows.
- **`/embed/...` and `embed.js`:** no masthead, no beta banner, no brand bar (the host page is the
  brand). Transparent page ground, `sheet` form surface optional (`data-surface="none|sheet"`), the
  firm's color and font, auto-resize via the existing resizer. The script tag takes
  `data-theme="light|dark|auto"` and `data-accent` overrides that pass through the same contrast
  guard (section 11). Minimum width 320 px; below 480 px fields stack.

### 10.10 Developer docs (`/docs`, `/docs/reference`)

The docs are a reference book, and I set them as one: the masthead with "API docs" active, a left
rail of guides ("Authentication", "Filings and the lifecycle", "Filing types, fields and state fees",
"Approvals", "Webhooks", "Errors", "Saved signatures and PDF uploads", "White-label firm portal"),
reading text in `body-read` serif on 7 columns, code blocks in two inks, and an on-page contents
column at `xl`.

- **`/docs` home** ("CoFile API"): "Quick start" as four numbered steps with hanging numerals and the
  curl block; the machine-readable links line ("For your tools and AI agents: all docs in one Markdown
  file, OpenAPI 3.1 … and llms.txt") set as a ruled strip of three items with download icons; the
  guides as a ruled list (title in `h4`, summary in `ink-2`), not a grid of cards.
- **Statuses** (in "Filings and the lifecycle"): the status list drawn as the `FilingRecord` timeline
  with API status names in `mono` next to the plain labels, so a developer sees exactly what the
  firm and the client see.
- **`/docs/reference`** ("API reference"): grouped endpoints. Each endpoint opens with its method in a
  mono chip (GET `ink` outline, POST `ink` fill, PUT and PATCH `blue` outline, DELETE `stop` outline:
  never green, which is reserved), the path in `mono` 18 px, a two-column layout at `lg`: parameters
  and schema tables on the left, request and response examples sticky on the right.
- **`/openapi.json`, `/llms.txt`, `/docs.md`:** served as files. Links to them carry a file glyph and
  the format in `mono`. When opened in a browser, `/llms.txt` and `/docs.md` render in a plain
  monospaced reader page (sheet, 72-character measure) with a "download" text link **[copy needed]**.

**API reference at `xl`:**

```
┌──────────────┬──────────────────────────────────────────┬─────────────────────────────────┐
│ API docs     │ ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ │                                 │
│ Quick start  │ API reference                            │                                 │
│ Authentication│ ──────────────────────────────────────── │                                 │
│ Filings and  │ {group}                                  │                                 │
│  the lifecycle│ [POST] /v1/filings                       │  REQUEST                         │
│ …            │ {description}                            │  ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓ │
│ ──────────── │ BODY                                     │  ┃ curl …/v1/filings \          ┃ │
│ API reference│ name        type      required  notes    │  ┃  -H "x-api-key: $COFILE_…"  ┃ │
│  {group}     │ ──────────────────────────────────────── │  ┃  -d '{ "dryRun": true, … }' ┃ │
│   POST /v1/… │ dryRun      boolean   no        …        │  ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛ │
│   GET  /v1/… │ …                                        │  RESPONSE 201                     │
│ ──────────── │                                          │  ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓ │
│ openapi.json │                                          │  ┃ { "id": "…", "status": … }   ┃ │
│ llms.txt     │                                          │  ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛ │
│ docs.md      │                                          │  (sticky while this endpoint      │
│              │                                          │   is in view)                     │
└──────────────┴──────────────────────────────────────────┴─────────────────────────────────┘
```

(Group names, descriptions and schema rows come from the reference page's own data; the column
heads of the field table follow whatever the reference already prints.)

- **Endpoint anchors:** every endpoint has a permanent anchor and a "copy link" glyph on hover beside
  its path, for developers pasting links into tickets.
- **Search:** a `/` keyboard shortcut opens a search sheet over the docs (elevation 3), results
  grouped by guide and endpoint, paths in `mono` **[copy needed for the placeholder]**.
- **Two readers:** the guides speak in Record Text for the product manager; the reference speaks in
  sans and mono for the engineer; the same masthead and the same two inks tell both that it's one
  publication.
- **Statuses and webhook events** are cross-linked: each event name in `mono` links to the timeline
  stage it corresponds to in the lifecycle guide.

### 10.11 Emails

One template system built in React Email and sent through Resend, in two frames:

- **Client frame** (approval request, missing information, changes requested, completed, rejected,
  and the submitted, documents and EIN messages): the firm's logo and name on a 4 px firm color rule,
  640 px max, white sheet, body 18/28 in a system-safe stack (the firm's font only if it is a web font
  that email clients support, with fallback), one action button 52 px tall in the firm's guarded
  color, the link also printed in full below the button in `mono` 13 px for readers whose mail app
  strips buttons. Footer: the firm's support address and "with CoFile" in 12 px.
- **CoFile frame** (security code needed, sign-up and verification, password reset, invitations,
  the admin notices): the wordmark on a thick-thin rule, the same sheet, `ink` button.

Layout of an approval request ("Your proof is ready to approve: …"): the subject line repeated as the
heading in serif 26/32; the rehearsal line on its own hatched band if present; the body; the button
"Open your proof"; the expiry sentence, and "Don't forward this email: anyone with the link can open
your proof." set as a separate semibold line. The security-code email ("Card security code needed:
…") uses "Enter security code"; its last sentence, "Never reply to this email with the code.", gets
the same semibold line treatment. Every email has a plain-text part with the same words.

Messages for "filing submitted", "documents back" and "EIN issued" don't have written copy in the
repository yet (`src/comms/render.ts` covers completed and rejected). I've designed their slots, a
heading, one paragraph, a documents list block and a button, and listed them in Appendix B
**[copy needed]**.

**The approval request on a phone (client frame):**

```
┌──────────────────────────────────┐
│▔▔▔▔▔▔▔▔ 4 px firm color ▔▔▔▔▔▔▔▔▔│
│ [logo] Harbor & Pine CPA         │
│                                  │
│ Your proof is ready to approve:  │  serif 26/32 (system serif fallback)
│ Two Sisters Bakery LLC           │
│▧ Rehearsal: nothing will be filed│  only on rehearsals
│  or paid, even if you approve.   │
│ Your proof is ready. Open the    │  18/28
│ link to see every detail and     │
│ every fee, exactly as they'll go │
│ to the state, then approve it or │
│ ask for changes. Nothing is filed│
│ or paid until you approve. The   │
│ link expires, so please look     │
│ soon.                            │
│ ┌──────────────────────────────┐ │
│ │       Open your proof        │ │  52 px, firm's guarded color
│ └──────────────────────────────┘ │
│ https://api.cofile.app/…         │  mono 13, the full link
│ Don't forward this email: anyone │  semibold line
│ with the link can open your      │
│ proof.                           │
│ ──────────────────────────────── │
│ help@harborpine.example          │  12/16 ink-3
│ with CoFile                      │
└──────────────────────────────────┘
```

The heading in the email body is the subject line as rendered, so the reader sees in the message
exactly what she saw in her inbox. The body's last sentence is moved onto its own line in the same
words; nothing else is reordered.

**Every message, its frame and its mark:**

| Message (subject as in the code) | Audience | Frame | Button (from the code) | Mark at the heading |
|---|---|---|---|---|
| Your proof is ready to approve: {filing} | Client | Client | Open your proof | Wait glyph |
| More information needed: {filing} | Client | Client | none (the body says whom to send it to) | Wait glyph |
| Changes requested: {filing} | Client | Client | none | Wait glyph |
| Completed: {filing} | Client | Client | none | Go glyph |
| Rejected by the state: {filing} | Client | Client | none | Stop glyph |
| Filing submitted / documents back / EIN issued | Client | Client | **[copy needed]** | Go glyph |
| Card security code needed: {filing} | Card owner | CoFile (or the firm's frame on a firm's account) | Enter security code | Wait glyph |
| Choose a name: {filing} | Firm or enterprise staff | CoFile | Choose a name | Wait glyph |
| Review before submit: {filing} | Staff | CoFile | Review the filing | Wait glyph, with the captured screen inline on a white mat |
| Site changed — review needed: {filing} | Staff | CoFile | none | Stop glyph |
| Portal bot check: {filing} | Staff | CoFile | none | Stop glyph |
| Failed: {filing} / Blocked: {filing} | Staff | CoFile | none | Stop glyph |
| Checking whether the state received: {filing} | Staff | CoFile | none | Wait glyph |
| Reset your password | Account holder | CoFile | from the account template | none |
| Confirm your email for CoFile | New firm | CoFile | from the account template | none |
| Your partner account is open / Your CoFile account is ready | New firm or enterprise | CoFile | from the account template | Go glyph |
| You're invited to {firm}'s filing portal | Firm staff | The firm's frame | from the invitation template | none |

Rules for every email: one button at most; the link printed in full below it; no images that carry
words (a blocked-images reader loses nothing but the logo, whose `alt` is the firm's name); 640 px
max; dark-mode safe; a plain-text part identical in words; the firm's support address in the footer
of client mail, hello@cofile.app in the footer of CoFile mail.

### 10.12 Surfaces I would add

The brief allows new surfaces where the design needs them. Two would earn their place; both need
copy before they can ship, so they are proposals, not part of the locked site.

- **The changes column (`/changes`).** A dated, reverse-chronological log, set like a newspaper's
  corrections column: each time a filing type switches live, each time a state changes a form and
  CoFile re-verifies it, one ruled entry with the date in tabular figures, the filing type, the
  jurisdiction and the coverage label before and after (ladder glyphs, old to new). It is the
  coverage table's memory, and it is what a cautious CPA would check before trusting a "Live"
  label. Linked from the coverage footnote. **[copy needed]** for the page title, lede and entry
  formats.
- **A state-site status page (`status.cofile.app`).** For enterprise buyers and their on-call
  engineers: one row per state portal (NY DOS, NYS-100, NJ, IRS, FL) with whether CoFile is
  currently filing there, paused for a drift review, or seeing the portal down, in the status chip
  system, with a 90-day strip of daily squares per portal. Same two inks, same chips, no marketing.
  **[copy needed]** throughout.

---

## 11. The white-label theming system

Thousands of firms will choose their own logo, colors and font. I can't design each of their pages,
so I design the rules that make any choice look edited. The principle: **the firm owns the chrome;
the record is not themable.**

### 11.1 What a firm controls

| Control (Setup → Branding) | Accepted | Where it shows |
|---|---|---|
| Name your clients see | up to 80 characters | Brand bar, emails, page titles |
| Logo | SVG, PNG, WebP; or a link | Brand bar (max 40 px tall, 200 px wide; 32 × 160 on phones), emails |
| Main color | any #rrggbb | The 4 px band, the forward button (after the guard), the logo plate if needed |
| Second color | any #rrggbb | Links and focus accents on the firm's pages (after the guard) |
| Font | one of the ten presets in `lib/fonts.ts`, or an upload up to 600 KB | Firm name (when no logo), headings, buttons |
| Support email shown to clients | an email | Footers and the proof's "Questions:" line |
| Your web address | the slug | Service page URLs |

I'd add one optional control: **a logo for dark backgrounds**. Without it, the plate rule in 11.3
applies.

### 11.2 What a firm never controls

The proof's structure and order; the fee table's typography and total rules; the consent block;
the rehearsal banner and hatch; status chips and their colors; field and checkbox styling; the
verbatim mono values; body text size. These are the record and the signals. A firm's font never
touches a fee or a value that goes to the state.

### 11.3 The theme compiler

Runs on save (and in the Branding page's live preview), in OKLCH, and produces a token set for
light and dark. One shared package used by the web app and by the engine's proof renderer.

1. **Band.** The main color, as chosen, becomes `brand-band` (the 4 px rule). It carries no text,
   so any color is allowed here: the firm's identity is always visible exactly as they chose it.
2. **Forward button.** Start with the main color. If white text on it is at least 4.5:1, use it.
   If not, lower its OKLCH lightness in 0.02 steps (scaling chroma to stay in gamut) until white
   reaches 4.8:1. If that shifts the color by more than 0.12 in OKLab distance from the original (it
   no longer looks like their color), keep the original and set the label in `ink` instead, provided
   that is at least 4.5:1. The button always gets a 1 px border in its darker shade when its contrast
   against the sheet is under 3:1, so a pale button still has an edge.
3. **Signal guard.** If the resulting button color has OKLCH chroma of 0.08 or more and a hue
   between 15 and 45 degrees (the stop red zone) or 55 and 90 degrees (the hold amber zone), forward
   buttons use `ink` with white text, and the firm's color stays on the band and the logo plate. A red
   "Approve" button is not allowed, whatever the brand book says. Green hues are welcome: green
   already means forward.
4. **Links.** The second color is darkened the same way until it reaches 4.5:1 on `sheet` and
   `paper`. If it falls in the stop zone, links use the guarded main color or `ink`. Links are always
   underlined, so color is never their only signal.
5. **Editor's blue collision.** If the firm's button or link color is within 0.10 OKLab of `blue`,
   the page's annotations (keys, leaders, highlights) switch to `ink-2` outlines so the reader can
   still tell the firm's voice from the editor's note.
6. **Dark mode.** The band keeps the original color. The forward button is recomputed for the dark
   ground. First choice: keep the light-mode button and its white label, if the button reaches 3:1
   against the dark sheet (so it reads as a shape). Otherwise raise its OKLCH lightness until it
   reaches 3:1 against the sheet and set the label in `#121314` once that reaches 4.5:1. The signal
   guard (step 3) runs again on the dark result.
7. **Logo plate.** The logo is analysed on upload: transparent pixels, mean color, and contrast
   with the sheet in both modes. A logo whose ink is under 3:1 against the ground (a white logo on
   light, a navy logo on dark) is placed on a plate: the band color or white, 8 px padding, `r1`.
   Whitespace is trimmed automatically; SVGs are sanitized.
8. **Font.** Presets are pre-checked. An uploaded font is tested for: the Spanish character set
   (á é í ó ú ü ñ Á É Í Ó Ú Ü Ñ ¿ ¡), digits, $ and punctuation; x-height of at least 0.42 em; and
   legibility at 16 px (stroke and counter heuristics). Failing coverage: not used on Spanish pages
   and replaced per glyph by Record Sans elsewhere. Failing legibility: used for headings 24 px and
   up only, never for buttons.
9. **Long names.** A firm name wraps to two lines in the brand bar and shrinks from 20 to 16 px
   past 40 characters. It is never truncated: a client must be able to read whose page this is.

### 11.4 The torture set

Twenty-four reference firms live in Storybook and Figma and every change is tested against them:
pale yellow (#F5E663), pure red (#FF0000), the stop-red twin (#B3261E), safety orange, neon green
(#39FF14), a navy within 0.05 of editor's blue, black, white (#FFFFFF), a mid-gray, a white logo on
transparent, a wide 6:1 logo, a tall square seal-style logo, a 78-character firm name, a script
upload, a condensed display upload, and the ten presets. A theme ships only if all of them pass.

---

## 12. Accessibility, Spanish and dark mode

### 12.1 Accessibility

- **Standard:** WCAG 2.2 AA everywhere; AAA contrast (7:1) for body text on client pages, which
  the palette already meets.
- **Size:** interface text never under 16 px; client pages 18 px; inputs at least 16 px so phones
  don't zoom. Pages reflow at 320 CSS px and 400% zoom with no loss and no horizontal scroll for
  reading content.
- **Targets:** 44 × 44 px minimum; 8 px between adjacent targets.
- **Structure:** one `h1` per page, headings in order, landmarks (`banner`, `nav`, `main`,
  `contentinfo`), the proof's four parts as `section`s labelled by their headings. The fee table is a
  real `table` with a `caption` taken from "State fees". Status chips are text; glyphs and the ladder
  are `aria-hidden`. Callout markers are `aria-hidden` duplicates of list text that is always present.
- **Forms:** labels bound to inputs, help bound with `aria-describedby`, an error summary at the
  top with links to fields, correct `autocomplete` tokens (`name`, `email`, `tel`, `street-address`,
  `postal-code`, `one-time-code`; the security code is the vault's hosted field, which must expose
  its label to assistive technology across the iframe), radio groups as `fieldset` with `legend`.
- **Color independence:** every status has a glyph and a word; the rehearsal hatch backs the amber.
  In forced-colors mode the hatch becomes a dashed border and glyphs stay.
- **Time:** the proof's deadline and the security code's hour are stated in words; nothing times out
  without saying so, and form drafts are kept (the existing kept-form behaviour) if a session ends.
- **Testing:** VoiceOver on iOS and macOS, TalkBack, NVDA with Firefox, JAWS with Chrome, voice
  control, and moderated sessions with readers over 65 and readers with low vision, on their own
  phones. The proof is tested end to end with each before it ships.

**The proof, as a screen reader hears it.** The order is the visual order, which is the copy's
order:

1. Page title (the code's "{firm}: approve filing"), then the banner landmark: the firm's name
   (the logo's `alt` is empty because the name follows as text) and "with CoFile".
2. On rehearsals, the rehearsal note, exposed as a `note` region, before the heading.
3. `h1` with the filing title; the reference and deadline paragraph.
4. The terms block, as a `region` labelled by its first words, read in full.
5. "Filing details" (`h2`), then the details as a table whose row headers are the labels; masked
   SSNs are read as "ending in 1234" through a visually hidden prefix on the masked value.
6. "State fees" (`h2`), the fee table with its caption, each amount read as currency, "Total" and
   "Maximum you authorize" as rows.
7. "The state's review page" (`h2`), its paragraph, the picture with its long alt text from the code.
8. The decision: the recap total, the one-time code field (when required), then "Approve, and
   authorize submission and payment", then "Request changes".
9. The questions line.

The sticky index strip is a `nav` with `aria-label` from the firm's page title **[copy needed]**,
placed after the banner and skippable by the skip link. Markers inside headings are `aria-hidden`.

### 12.2 Spanish

The locked copy is English. Spanish pages are translations of that copy, not new copy: produced by
a legal translation house with US business-filing experience, reviewed by a panel of Spanish-first
business owners, and, for consents and declarations, approved by counsel. The design's job is to
make room:

- Every container is designed at 130% of the English text length; buttons wrap, never truncate.
- Language is set with `lang="es"` on the page and `lang="en"` on any English that remains, such as
  the state's own field names and the state's review page picture, which stays in English.
- Values that go to the state stay verbatim in mono (the state's form is in English).
- Money stays in US format ($103.50, es-US); dates use es-US formatting.
- Hyphenation is on in Spanish body text; headlines never hyphenate.
- Where a firm offers Spanish, client pages and client emails show a language switch in the brand
  bar, labelled in the other language **[copy needed]**; the choice is remembered on the link.

### 12.3 Dark mode

- Follows the device by default; CoFile's own pages and the desk offer a light/dark/auto control in
  the footer and account menu **[copy needed]**.
- Tokens as in section 4. Elevation by borders, not shadows.
- Always white, in both modes: the signature pad, the state's review page mat, real screen
  captures, uploaded PDFs. They are documents, and documents are paper.
- Emails declare `color-scheme: light dark`; logos sit on plates where the compiler says so; buttons
  keep their light-mode colors because several mail clients invert unpredictably.

---

## 13. Production

### 13.1 Stack and files

- **Design:** Figma with variables in three collections (color modes light and dark; firm theme,
  with the 24 torture firms as modes; type scale for desktop and mobile). Files: `Foundations`,
  `Components`, `Proof`, `Public pages`, `Filing desk`, `Dashboard`, `Docs`, `Email`, `Graphics`.
- **Tokens:** W3C design-token JSON in `packages/tokens`, built with Style Dictionary into CSS custom
  properties for `web/` and a TypeScript module for the engine, so `src/approvals/render.ts` stops
  inlining hex values and the proof shares the site's tokens.
- **Theme compiler:** `packages/theme` (OKLCH math, contrast, logo analysis, font checks), with unit
  tests asserting every output pair's contrast.
- **Components:** `packages/ui` (React, server-renderable), with Storybook, Chromatic visual
  regression across light, dark, English, Spanish and the torture set, and Playwright screenshots
  at 320, 390, 768, 1024 and 1440 px. axe-core in CI.
- **Graphics:** React SVG components bound to the code's data (`COVERAGE`, `LOG`, the fee table,
  `web/lib/status.ts`), server-rendered in their final state, animated with CSS and the Web
  Animations API behind an in-view observer.
- **Fonts:** self-hosted variable WOFF2, subset to Latin and Latin Extended-A, `font-display: swap`
  with size-adjusted fallbacks to avoid layout shift.
- **Email:** React Email, sent through Resend, tested in Gmail (web, iOS, Android), Outlook for
  Windows and Mac, Apple Mail, in light and dark.

### 13.2 Asset list

Wordmark (positive, reversed, one-color; SVG and PDF); the Full Stop mark (three colorways);
favicons (16, 32, 48 SVG and ICO, 180 Apple touch, 192 and 512 maskable); Open Graph template;
"with CoFile" lockups (light, dark; 11 to 14 px); the end mark; 28 icons; graphics G1 to G8 as
components; photographs P1 to P3 with captions; email header and footer frames for both frames;
the rehearsal hatch as an SVG pattern and a CSS gradient; the 24 torture-set themes.

### 13.3 What to commission

| Commission | From (by kind) | Scope |
|---|---|---|
| Record type family | An independent type foundry with news-family experience | Display (2 optical sizes), Text, Sans with Condensed and Agate, Mono; Latin Ext-A; 9 months, stopgaps meanwhile |
| Wordmark and mark | The same foundry's lettering lead | Drawn from Record Display; delivered with construction sheets |
| Explainer graphics G1 to G8 | A newsroom-trained information-graphics studio | Design and data-bound components, 6 weeks |
| Icons | The same studio | 28 icons on the house grid |
| Photography P1 to P3 | A documentary photographer; a traditional sign painter for P1's door | 3 days on location |
| Spanish | A legal translation house; a Spanish-first reader panel | All client-facing copy and emails; counsel review of consents |
| Accessibility | An accessibility consultancy with assistive-technology users on staff | Audit before launch and after each phase; older-reader sessions |

### 13.4 Phases

1. **Weeks 1 to 4: the record.** Tokens, stopgap fonts, wordmark and mark, the `ProofSheet`
   component used by both the home page sample and the real proof, the theme compiler, the client
   email frame. Ship the proof first: it is the page that has to be right.
2. **Weeks 5 to 10: the front page.** The home page with G1 to G7, the masthead and colophon, auth
   pages, legal pages, 404 and error.
3. **Weeks 11 to 16: the working pages.** Filing desk (timeline, tables, chips, Setup with live
   preview), dashboard, docs, service pages, white-label pages and the embed; Spanish; photography.
4. **Weeks 17 to 36: the type.** The commissioned Record family replaces the stopgaps (no layout
   changes; metrics are specified to match), a full accessibility audit, older-reader and
   Spanish-reader testing, and a corrections pass.

---

## 14. Appendix

### A. What I would push back on in the current site

1. **The sample proof is not the real proof.** The home page shows details, fees, then the state's
   page, with "Approve for filing"; the client's real page shows the state's page first and the
   button "Approve, and authorize submission and payment", in different type and inline styles.
   A product whose promise is "what you approve is what's filed" cannot show a specimen that differs
   from the thing. One component, one order.
2. **Everything is a box.** Cards with 1 px borders and 8 px corners hold the steps, lists,
   notices, the log and the forms at the same weight, so the proof has to compete with a dozen things
   that look like it. Rules and hierarchy should do that work, and boxes should be rare.
3. **Green is spent on marketing.** The site's main call to action is green, the same green that
   means approved, live and "this moves a filing forward". By launch, green should mean only that.
4. **The beta notice is amber.** Amber is the rehearsal's planned hold. The beta isn't a hold.
5. **The coverage table relies on chips alone.** A reader can't see at a glance how far each type
   is from live. The ladder does that without new words.
6. **The firm's font is applied to everything** on its pages, including fees and fields. A firm's
   uploaded display font should never set a dollar amount.
7. **The proof is styled separately** with hard-coded colors in `render.ts`, has no dark mode, and
   doesn't share the site's tokens. It should be the best-built page in the system, not the plainest.
8. **Type is too small for the audience.** Desk body text at 15 px and help text at about 13 px
   are too small for many readers aged 40 to 65 and for clients on phones.
9. **Thirteen sections with no wayfinding.** The home page needs folios, an index and a masthead
   that shows where you are.
10. **Approval errors are bare paragraphs** with no firm brand, no way back and no contact.

### B. Copy notes

These are suggestions for the copy owners. None of them is used in the design.

1. **Sample proof button.** The hero's sample button reads "Approve for filing"; the real button
   reads "Approve, and authorize submission and payment". I'd make the sample match the real label.
2. **"Signing in…"** is the Log in button's pending label (`AuthForms.tsx`); the house rule is
   "log in". Suggest "Logging in…".
3. **"signed in" on the signed-out page** ("You're not signed in to this filing desk") breaks the
   same rule.
4. **"Test" and "test run" still show in the desk:** the Filings table's dry-run badge reads "Test",
   the filing detail's progress line says "test run", and Signatures says "never on a preview or test
   run". The term is "rehearsal".
5. **"The engine posts each filing event…"** on the dashboard's Webhooks page uses "the engine",
   which the copy review keeps to the developer docs.
6. **Status next steps** (`web/lib/status.ts`) say "The approver" and "Your filing company"; the copy
   review asks for "your client" in partner copy.
7. **The decision page** says "We'll submit the filing exactly as shown." It is qualified by the
   next sentence, but counsel may want it checked against the "never promise will be submitted" rule.
8. **Missing email copy:** "filing submitted", "documents back" and "EIN issued" have no messages
   in `src/comms/render.ts`; slots are designed in 10.11.
9. **New interface words the design needs** (each marked **[copy needed]**): a skip link, the
   Branding page's contrast-fix note, the language switch labels, the theme control, the `/join`
   pause and the "download" link on the plain reader for `/llms.txt` and `/docs.md`, plus alt text
   for photographs P1 to P3 and graphics G2 to G8.
10. **A dateline for coverage.** An "as of" date on the coverage table would let a careful reader
    know how fresh the labels are. Editors date anything that changes.
11. **Optional section kickers.** Short labels above each home page H2 would help scanning; the
    design works without them, using folios and the masthead links.
12. **The red asterisk.** The copy review noted the * marker is unexplained; the design drops it and
    marks only optional fields, which the forms already do.
13. **"Invitations now come by email"** on `/invite-expired`: "now" will date the page.
14. **"every detail below" in the approval consent** (`approvalConsent()` in `render.ts`) fixes the
    consent's position above the details, so the design keeps it there. If counsel would accept
    "every detail on this page", the whole consent could sit directly above the approve button, which
    is where I would put it. Until then, the design repeats only the total at the button.
15. **"filing portal" in the invitation subject** ("You're invited to {firm}'s filing portal"): the
    partner area is the firm's "filing desk".
16. **"Signed out"** is the signed-out page's tab title; the house words are "log in" and "log out".
17. **Tooltip-only copy.** The "Rehearsal" chip on the New filing page carries its explanation in a
    `title` tooltip, which touch screens and many screen readers never show. The design shows it as
    a visible line; copy owners may want a shorter version for that position.
18. **Raw JSON field names on the proof.** `humanKey()` turns field paths into labels ("Base name",
    "Formation › Members 1 › Name"). Labels like these are copy the client reads at the moment of
    approval; a reviewed label map per filing type would read better than the automatic one.

Approve the proof. Then it's filed. ▪
