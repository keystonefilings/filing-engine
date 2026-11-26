# CoFile: website design specification

**Formular.** Printed in one color, filled in in black, every line numbered.

Greta Vogel, typographer and information designer, Basel. Specification for the build team, November 26, 2026. Version 1.0.

---

## 1. Who I am, and what that does to this design

I trained in Basel at the end of the 1970s, in the school that taught that a grid is a moral instrument: it makes the designer's decisions visible and checkable. Since then I have designed signs for railway stations, tax and customs forms for three cantons, and annual reports for banks. The forms taught me the most. A sign is read for two seconds. A form is read slowly, by someone anxious, who will then sign it and live with what they signed.

CoFile is a forms company. It fills in forms on government websites, and its most important page, the proof, is a form with one signature on it. So I have designed CoFile as I would design an official form: strict grid, two typefaces, no decoration, color only where color means something, and figures that line up. Everything you would normally use to make a website "friendly" (illustration, rounded corners, gradients, a playful mascot, parallax) I have left out. The friendliness is in the reading: large type, short lines, plain order, nothing hidden.

Three habits from forms work shape every page:

1. **Printed matter and written matter are different inks.** On a well-made paper form, everything the authority printed (boxes, labels, line numbers) is in one colored ink, and everything the citizen writes is in black. You can see at a glance what was asked and what was answered. I carry this onto the screen.
2. **Every line has a number.** "Line 7 is wrong" is a sentence a nervous person can say on the telephone. A number is the shortest possible name for a thing.
3. **The declaration sits directly above the signature.** Never at the top of the page, never in a footnote. You read what you are promising, and then you sign, in that order and in that place.

---

## 2. The concept: Formular

*Formular* is the German word for a form. The whole design hangs on one idea: **CoFile's pages are printed forms, and the people using them write on them.**

That idea gives three rules that run through every surface:

**Two inks.** There is a *print* color and there is *ink*. The print color draws the structure: labels, rules, field boxes, line numbers, section numbers. Ink (near-black) is reserved for what a person entered or decided: the client's details, the amounts, and the buttons that act. On CoFile's own pages the print color is CoFile's Form Blue. On a firm's pages, **the print color becomes the firm's color.** That is the entire co-branding idea in one sentence: a firm changes the print color of the form; it never changes the ink. Thousands of firms can each have their own form, and on every one of them the client's details and the decisive button look exactly the same.

**One numbering.** Every detail in a filing type has a line number, fixed per filing type and in the order the state asks for it. The same number appears beside the field on the intake form, beside the row on the proof, as a callout on the picture of the state's own review page, and beside the step in the rehearsal log. The client can check line 3 on the proof against callout 3 on New Jersey's page. The CPA can say "line 3" on the telephone. The developer sees the same order in the API. This numbering is my signature idea, and Section 9 and Section 10 show where it lives.

**Color means state, never decoration.** Apart from the print color, the system has exactly three signal colors, and they mean exactly three things: green for *approved and live*, amber for *a rehearsal's planned hold*, red for *a stop*. Each always comes with a symbol and a word, so color is never the only carrier. No green ticks on marketing bullet points, no amber "highlight" boxes, no red for emphasis. If a color appears, something is in that state.

Why this fits CoFile: CoFile's promise is "stop and ask rather than guess", and its one irreversible moment is a signature on a page. An austere, form-like design says *this is a serious document and nothing is hidden*. It also solves the co-branding problem structurally instead of cosmetically, and it makes the beta legible, because "Live" is the only thing on the site drawn as a full green disc.

---

## 3. Brand identity

### 3.1 The wordmark

"CoFile", one word, capital C, capital F, set in Formular Sans 75 Bold and then redrawn by hand as lettering. Instructions for the letterer:

- **Construction grid.** Cap height = 10 units. x-height = 7.2 units. Stem weight = 1.6 units (vertical), 1.45 units (horizontal; grotesk contrast). Baseline overshoot for round letters 0.15 units.
- **C.** Grotesk construction, terminals cut exactly horizontal, aperture 3.4 units tall at the right side. No spur.
- **o.** Optically round, width 6.9 units, counter 3.7 units wide.
- **F.** Top arm 5.8 units long from the stem's left edge. Middle arm 4.9 units long, and **the top edge of the middle arm sits exactly on the x-height line** (7.2 units). This is the one deliberate detail: the F's middle arm continues the top line of "o", "i" and "e", so the word reads as one line of text, the way a field label reads on a form.
- **i.** The dot is a **square**, side = stem width (1.6 units), its top edge on the cap height line. It echoes the mark (3.2).
- **l.** Ascender rises exactly to cap height, not above. The wordmark sits in a clean rectangle: cap height top, baseline bottom, no ascender poking out.
- **e.** Horizontal terminal, bar at 3.9 units, same horizontal stem weight.
- **Spacing.** Tracked −10/1000 at display sizes, kerned optically. The C–o pair is tightened by 40/1000 so "Co" does not fall apart from "File". No color split, no weight split between "Co" and "File": the name is one word.

The wordmark is supplied as SVG in three optical sizes: **Display** (above 32px cap height), **Text** (12 to 32px, slightly wider spacing and a 5% heavier hairline), and **Micro** (below 12px, used only in "with CoFile" and the favicon companion, spacing opened by +30/1000).

### 3.2 The mark: the marked box

A square outline with a solid square inside it. It is the box on a form, marked. On every form I have designed, a box is marked by filling it; the tick is an English-language habit that grew out of hurried clerks. Filling the box is the client's act. The mark says: *the box was marked by the person who had the right to mark it*.

Drawing instructions, on a 16 × 16 unit grid:

- Outer square: 16 × 16 units, stroke 1.5 units, stroke drawn **inside** the square (so the outer edge is exactly 16).
- Inner solid square: 8 × 8 units, centered. The gap between stroke and solid is 2.5 units on all sides.
- Corners: square, no rounding, no optical rounding at small sizes.
- In two-ink use (CoFile's own pages, above 24px only): the outline is Form Blue (print), the solid is ink. It is the concept drawn in a single figure: the printed box, and what the person put in it.

The same geometry is used for the **checked checkbox** in every form in the product (Section 9.3). The brand mark and the act of agreeing are the same shape. This is intended.

### 3.3 Lockups

| Lockup | Composition | Use |
|---|---|---|
| Horizontal | Mark, gap of 0.5 × mark side, wordmark. Mark side = wordmark cap height. Mark bottom on the wordmark baseline. | Site header, docs, dashboard, account emails |
| Mark alone | The marked box | Favicon, app icon, social avatar, the close of the home page |
| Wordmark alone | "CoFile" | Legal lines, footers, small print |

**Clear space:** one mark side on all four sides. **Minimum sizes:** mark 12px on screen, 4mm in print; horizontal lockup 14px cap height on screen. **Favicon:** the mark at 16, 32 and 180px; at 16px the outer stroke is 1.5px rendered as 2px with the inner square 8px, hinted to whole pixels.

**Colors permitted:** ink on paper, paper on ink, two-ink (Form Blue outline, ink solid) on paper only. **Never:** in a firm's color, in a status color, on a photograph, rotated, outlined, with a shadow or gradient, as a pattern, as a "stamp".

### 3.4 The "with CoFile" co-brand mark

On every page a partner firm's client sees, the only sign of CoFile is the phrase **"with CoFile"**. It is set, never drawn as a logo:

- Words "with CoFile", Formular Sans 55 Regular, 13/16px, color `--ink-3` (#6B6B68 light, #8E8E88 dark). "CoFile" in 65 Medium, same color. No mark, no box, no link styling.
- Placement: in the firm's header, right-aligned, sharing the baseline of the firm's name. On the proof, repeated once at the very end, after the support line. In client emails, in the footer line.
- It never grows: 13px at every breakpoint, including large desktop. A firm cannot remove it on partner pages; enterprise white-label pages (`/e/...`) do not carry it at all, because there the subscriber's own name is the filing company.
- Clear space: 16px from the nearest firm element. It must never sit inside the firm's logo plate or touch the firm's colored band.

On the home page, under "Your name on the door. Ours in small print.", the specimen shows this mark at its true 13px size with a dimension line beside it. The small print, measured.

---

## 4. Color

### 4.1 The palette

CoFile has no "brand color" in the usual sense. It has paper, ink, one print color for structure, and three signals. That is the whole palette.

| Name | Light | Dark | Role |
|---|---|---|---|
| Paper | `#FFFFFF` | `#1A1A19` | The sheet: forms, the proof, tables |
| Ground | `#F2F2EE` | `#111110` | Behind sheets; bands; code blocks |
| Ink | `#141414` | `#EDEDE8` | Text; entered details; amounts; buttons that act |
| Form Blue (print) | `#2F4C80` | `#A3B8E3` | Labels, rules, field boxes, line and section numbers |
| Go | `#0B6E3F` | `#5FC08A` | Approved, live |
| Hold | `#8F5B00` | `#E9B14A` | A rehearsal's planned hold |
| Stop | `#B0201C` | `#FF8A80` | A stop |

Why Form Blue: it is the dull blue of printed official forms, the color you see in the boxes and never notice. It is far enough in hue from green (go) and red (stop) that it cannot be mistaken for a state, dark enough for 14px labels, and quiet enough to recede behind what the person wrote.

Why not cream or manila: an imitation of old paper is decoration. Real paper is white, and white gives the highest contrast for older eyes. The warmth in this system comes from the Ground (`#F2F2EE`, a very slightly warm gray), not from pretending to be a folder.

### 4.2 Full token set

All values are CSS custom properties on `:root`, redefined under `@media (prefers-color-scheme: dark)` and under `[data-theme="dark"]`.

| Token | Light | Dark | Use |
|---|---|---|---|
| `--paper` | `#FFFFFF` | `#1A1A19` | Sheet background |
| `--ground` | `#F2F2EE` | `#111110` | Page background, bands |
| `--ink` | `#141414` | `#EDEDE8` | Primary text, entered values |
| `--ink-2` | `#4A4A48` | `#B8B8B2` | Secondary text, ledes |
| `--ink-3` | `#6B6B68` | `#8E8E88` | Tertiary text (14px and above only), "with CoFile" |
| `--print` | `#2F4C80` | `#A3B8E3` | Print color: labels, rules, boxes, numbers. Replaced on firm pages |
| `--print-tint` | `#EEF2F8` | `#1E2430` | Correspondence highlight, selected row |
| `--rule` | `#141414` | `#EDEDE8` | 1px and 2px structural rules, total lines |
| `--hairline` | `#D9D9D4` | `#33332F` | Row separators, sheet borders |
| `--field-line` | `#85857F` | `#7A7A75` | Disabled and neutral input borders (3:1 minimum) |
| `--go` | `#0B6E3F` | `#5FC08A` | Go symbol and text |
| `--go-tint` | `#E4F1E9` | `#12291C` | Go notice background |
| `--hold` | `#8F5B00` | `#E9B14A` | Hold symbol and text |
| `--hold-tint` | `#FBF0DA` | `#2E2410` | Rehearsal notice background |
| `--stop` | `#B0201C` | `#FF8A80` | Stop symbol, error text, error borders |
| `--stop-tint` | `#FBE6E4` | `#3A1614` | Stop notice background |
| `--button` | `#141414` | `#EDEDE8` | Ink button fill |
| `--button-text` | `#FFFFFF` | `#141414` | Ink button label |
| `--button-hover` | `#2E2E2C` | `#D6D6D0` | Ink button hover |
| `--button-press` | `#000000` | `#FFFFFF` | Ink button pressed |
| `--focus` | `#141414` | `#EDEDE8` | Focus ring (3px) |
| `--focus-halo` | `#FFFFFF` | `#1A1A19` | 2px gap between element and ring |
| `--scrim` | `rgba(20,20,20,.48)` | `rgba(0,0,0,.64)` | Behind overlays |
| `--code-bg` | `#F2F2EE` | `#111110` | Code blocks |
| `--code-ink` | `#141414` | `#EDEDE8` | Code text |
| `--code-comment` | `#5C5C59` | `#9E9E98` | Code comments |
| `--code-string` | `#2F4C80` | `#A3B8E3` | Strings (print color, not a status color) |

On firm pages, eight tokens are replaced by computed firm values: `--print`, `--print-tint`, `--band`, `--firm-button`, `--firm-button-text`, `--firm-button-hover`, `--firm-mark` (the highlight from the second color) and `--firm-font`. The algorithm is in Section 11. Ink, paper, ground and the three signals are **never** replaced.

### 4.3 Status colors and their symbols

Every status is shown as **symbol + word**, the symbol in the status color, the word in ink. The symbols are drawn on a 12-unit grid and shipped as an SVG sprite.

| Tone | Color | Symbol | Statuses (labels from `web/lib/status.ts`, unchanged) |
|---|---|---|---|
| Go | `--go` | Solid disc | Approved, Submitted to the state, Accepted by the state, EIN issued, Completed, Live |
| Hold | `--hold` | Two vertical bars (the hold) | Rehearsal; "held, on purpose" in the rehearsal log |
| Stop | `--stop` | Solid square with a paper-colored horizontal bar | Needs correcting, Paused: state site changed, Rejected by the state, Failed, Stopped, Being checked, Name unavailable |
| Waiting on a person | `--ink` | Open ring, 1.5px | Waiting for approval, Needs information, Changes requested, On hold |
| Moving | `--ink-2` | Ring with a 90° solid arc | Received, Queued, Getting the state's review page, Filing now, Final check |

Today's site uses amber for "waiting" statuses as well as for rehearsals. I have taken amber away from waiting. Amber means the hold, and only the hold; a filing waiting for its client is not on hold, it is waiting, and it is drawn in ink. The statuses that need someone to act (`NEEDS_ACTION`) are additionally set in 65 Medium in lists, so they are found by weight before color.

### 4.4 Contrast notes

Computed with the WCAG 2.2 relative-luminance formula.

| Pair | Light | Dark | Requirement |
|---|---|---|---|
| Ink on paper | 18.4:1 | 15.2:1 | AAA body |
| Ink-2 on paper | 8.9:1 | 9.4:1 | AAA body |
| Ink-3 on paper | 5.3:1 | 5.3:1 | AA, 14px minimum |
| Form Blue on paper | 8.5:1 | 8.9:1 | AAA for 14px labels |
| Go on paper | 6.4:1 | 7.8:1 | AA text, 3:1 symbol |
| Hold on paper | 5.7:1 | 9.0:1 | AA text |
| Stop on paper | 6.9:1 | 7.6:1 | AA text |
| Go on go-tint | 5.5:1 | 6.9:1 | AA |
| Hold on hold-tint | 5.1:1 | 7.4:1 | AA |
| Stop on stop-tint | 5.8:1 | 6.1:1 | AA |
| Button text on button | 18.4:1 | 15.2:1 | AAA |
| Field-line on paper | 3.7:1 | 4.0:1 | 3:1 non-text |

The proof is held to **7:1 for all text** (AAA). That rules out ink-3 on the proof except for the "with CoFile" line, which is not content.

The three signals were also checked under simulated protanopia, deuteranopia and tritanopia: go and stop separate by lightness and, more importantly, by symbol (disc versus barred square). A reader who sees no color at all loses nothing.

---

## 5. Typography

### 5.1 Two typefaces, one family

One sans for everything people read, one monospace for everything a machine says. Both from one commissioned family.

**Formular Sans** (commissioned). A grotesk on an Akzidenz skeleton with the apertures of a wayfinding face. Weights named the Swiss way, by number: **55 Regular** (400), **56 Italic** (400, for quotations only), **65 Medium** (500), **75 Bold** (700). Delivered as one variable font, `wght` 400 to 700, plus static instances for email.

**Formular Mono** (commissioned, same family). **55 Regular** and **65 Medium**. Same x-height, cap height and vertical metrics as the Sans, so a code or reference can sit inside a sentence without jumping.

**Commission brief for the foundry** (a Swiss independent type studio with grotesk and signage experience):

- x-height 0.53 em, cap height 0.72 em. Open apertures on a, c, e, s, 2, 3, 5, 6, 9: at 14px on a cheap phone screen, an older reader must not confuse c with o or 3 with 8.
- Unambiguous I, l, 1 and O, 0: capital I with no serifs but a slightly shorter height is not acceptable; use a lowercase l with a tail, a 1 with a flag and foot, a capital I plain. In Mono, zero is slashed.
- Figures: **tabular lining figures by default**, proportional lining as `pnum`. Oldstyle figures are not drawn. All figures share one width in tabular mode, including the dollar sign, comma and period, so that columns of amounts align by construction.
- Case-sensitive forms for parentheses, hyphens, colons; fractions (`frac`) for "50/50" in the Spanish and English member lines.
- Character set: Latin Extended-A and B, Vietnamese, plus ¿ ¡ ñ º ª with their uppercase heights tuned. The Spanish inverted marks sit on the baseline, not the descender.
- Hinting tuned for Windows at 13 to 16px; tested at 13px on a 1x display.
- Delivery: WOFF2, variable and static, subsetted Latin core (35 KB target for Sans 400–700 variable) and an extended subset loaded by `unicode-range`.

**Interim, until the commission ships:** Univers Next Pro (Regular, Medium, Bold, Italic) and Univers Next Typewriter Pro for mono, both licensed for web and email. Univers is the right ancestor: a Swiss family whose weights were numbered from the start. Fallback stack: `"Formular Sans", "Univers Next Pro", "Helvetica Neue", Arial, system-ui, sans-serif`; mono: `"Formular Mono", "Univers Next Typewriter Pro", ui-monospace, Menlo, Consolas, monospace`.

Today's site uses three families (a serif for headlines, a sans, a mono). Headlines on this site do not need a second voice. Hierarchy comes from size, weight and space.

### 5.2 Scale

Sizes in px at a 16px root, all line heights on a 4px baseline. "Mobile" applies below 768px.

| Token | Desktop | Mobile | Weight | Tracking | Use |
|---|---|---|---|---|---|
| `t-display` | 60/68 | 36/44 | 75 | −1.5% | Home hero H1 only |
| `t-headline` | 40/48 | 28/36 | 75 | −1% | Home section H2s, close |
| `t-title` | 32/40 | 26/32 | 75 | −0.5% | Page H1 in the desk, dashboard, docs; the proof's H1 |
| `t-heading` | 24/32 | 22/28 | 75 | 0 | H2 in apps; the catch's five points |
| `t-sub` | 20/28 | 20/28 | 65 | 0 | H3; home ledes |
| `t-body-l` | 18/28 | 18/28 | 55 | 0 | Home body; all client-facing pages; the proof |
| `t-body` | 16/24 | 16/24 | 55 | 0 | Desk, dashboard and docs body; tables |
| `t-small` | 14/20 | 14/20 | 55 | +0.5% | Help text, captions, notes |
| `t-label` | 16/24 (client), 14/20 (desk) | same | 65 | 0 | Field labels, in print color |
| `t-ref` | 13/20 | 13/20 | 65 | +2% | Line numbers, section numbers, callouts; tabular |
| `t-mono` | 15/24 | 14/20 | Mono 55 | 0 | Code blocks, the rehearsal log |
| `t-mono-s` | 14/20 | 13/20 | Mono 55 | 0 | Inline code, keys, references |

Rules:

- **Minimum text size is 14px**, with one exception: the 13px reference numerals, which are always also present in the accessible name of their row.
- **Line length:** 66 characters for body, 60 for ledes, 45 for the proof on a phone (it falls out of the width naturally).
- **Sentence case everywhere.** The copy already is. No all-caps headings, no letterspaced kickers. The only capitals are the ones the state prints: "TWO SISTERS BAKERY LLC" is a value, so it is shown as the state will show it.
- **Italic** is used only for quoted words from a person (Ana Ortiz's message) and for nothing else.
- **No bold inside running text** except the one place the copy calls for a name or status.
- `text-wrap: balance` on headlines; `text-wrap: pretty` on body; hyphenation off in English, on in Spanish (`hyphens: auto` with `lang="es"`), never in labels or values.

### 5.3 Numerals, money and dates

The proof is a fee statement, and CPAs read fee statements for a living. They will notice a misaligned decimal before they notice a headline.

- All figures in the UI use `font-variant-numeric: tabular-nums lining-nums`. Prose on the home page uses proportional figures (`pnum`) so a sentence like "within 120 days" does not look gappy.
- **Money is set in the sans, not the mono.** Always two decimals, always a dollar sign, right-aligned in its column so the decimals align by construction: `$100.00`, `$3.50`, `$103.50`.
- **Totals follow accounting convention:** a 1px ink rule above the total line, the total in 75 Bold, and a double rule (two 1px ink rules, 2px apart) below it. "Total to the state" and the proof's "Total" are drawn this way, and only those.
- **Dates and times** keep the copy's forms ("Dec 3, 5:00 PM Eastern", "December 3, 2026, 5:00 PM Eastern"). The time zone is never dropped. In tables, dates are right-aligned tabular in the "Started" and "Last used" columns.
- **Codes are mono:** filing references, EINs (`12-3456789`), masked SSNs (`***-**-1234`), API keys (`cofile_…`), webhook IDs, the `"dryRun": true` flag, URLs of client links and the widget snippet.
- **Mono is also the voice of the rehearsal log**, because it is literally a log the engine wrote. Mono is not used for anything a person entered: the client's business name on the proof is in the sans.

---

## 6. Layout

### 6.1 The grid

A 12-column modular grid with a **reference column**: column 1 on large screens is the margin where section numbers, line numbers and callouts hang, exactly as on a tax form.

| Breakpoint | Width | Columns | Margin | Gutter | Reference column |
|---|---|---|---|---|---|
| XS | 0–479 | 4 | 16 | 16 | Inline: numerals sit before the label, 28px wide |
| S | 480–767 | 6 | 24 | 16 | Inline, 32px |
| M | 768–1023 | 8 | 32 | 24 | Hanging 40px inside column 1 |
| L | 1024–1279 | 12 | 40 | 24 | Column 1 |
| XL | 1280+ | 12, max content 1200 (column 78px) | auto | 24 | Column 1 |

At XL a column is 78px and the grid is 12 × 78 + 11 × 24 = 1200px. Everything snaps: text blocks start on a column edge, images span whole columns, and nothing is centered unless the whole block is centered.

Standard spans at L and XL:

| Layout | Spans |
|---|---|
| Home two-part section (`nx-two`) | Ref col 1; headline and lede cols 2–6; list, figure or form cols 8–12 |
| Home full section | Ref col 1; headline cols 2–9; table or list cols 2–12 |
| Reading pages (setup, forms, legal) | Ref col 1; content cols 2–8; aside cols 10–12 |
| App list pages (desk, dashboard) | Cols 1–12 |
| Client sheet (intake, proof) | A single sheet 720px wide (8 columns of the M grid) centered on Ground, with its own internal grid: 40px reference column + 632px content + 24px padding each side |

### 6.2 Spacing, baseline and rhythm

A 4px base unit. Line heights are multiples of 4; vertical spacing uses only these steps:

| Token | px | Typical use |
|---|---|---|
| `s1` | 4 | Symbol to word |
| `s2` | 8 | Label to field |
| `s3` | 12 | Help text to field |
| `s4` | 16 | Field to field; mobile margin |
| `s5` | 24 | Gutter; paragraph to list |
| `s6` | 32 | Group to group |
| `s7` | 48 | Section head to content |
| `s8` | 64 | Section padding on mobile |
| `s9` | 96 | Section padding on desktop |
| `s10` | 128 | Before the close of the home page |

Every home section begins with a **1px ink rule across the full content width**, with its section numeral (`01` to `13`, `t-ref`, print color) set directly under the rule in the reference column. The rule is the section break; there are no alternating background bands.

### 6.3 Rules, radii, elevation

- **Rules:** hairline 1px `--hairline` (rows); rule 1px `--rule` (section starts, table heads, total lines); heavy 2px `--rule` (the top of the proof's decision block); band 4px `--band` (the firm's color at the very top of firm pages).
- **Radii: 0.** Square corners on everything: buttons, fields, sheets, chips, images, toasts. The only round shapes are the round symbols (disc, ring), because they are symbols. A firm cannot change this.
- **Elevation: none.** No shadows. A sheet is set apart from the Ground by its paper color and a 1px hairline. An overlay (dialog, menu sheet, image viewer) is paper with a 1px ink border, over the scrim. Three levels only: page, sheet, overlay.
- **Touch targets:** 48 × 48px minimum everywhere; the proof's decisive button is 56px tall minimum. Older hands, small phones.

---

## 7. Imagery

### 7.1 What the site shows

The site shows the real thing, or nothing.

- **No stock photography. No photographs of people.** A smiling founder at a laptop tells a CPA nothing she can check.
- **No illustration for its own sake**, no 3D, no isometric office scenes, no device mockups. The proof on the home page is not shown inside a drawing of a phone; it is shown as itself, at the size a phone shows it.
- **Primary imagery is captured product and captured state screens.** The sample proof, the rehearsal log, the coverage table and the state's review pages are rendered by the real components, with test details. Screens of the states' websites come from the capture pipeline of real rehearsals (test details only), at 2x, color-managed to sRGB, cropped on column edges, framed with a 1px hairline, and always captioned: what it is, whose site it is, and "test details".
- **Government documents are never faked.** "The papers come back to you" will tempt someone to typeset an imitation IRS letter. Don't. Until CoFile can show a real returned document with the owner's written permission and redactions, the documents are shown as **schematics**: a ruled rectangle in the proportions of US Letter, with the document's name set in it and nothing else.

### 7.2 Pictograms

One commission: a set of 32 pictograms for documents, channels and security, drawn by an information-design studio with transit pictogram experience.

- Grid 24 × 24 units, live area 20 × 20, stroke 2 units, square caps and joins, no fills except where a fill carries meaning (the marked box).
- Drawn as objects seen straight on, no perspective. A card, an envelope, a text message, a document, a certificate with a ribbon notch, a lock, a key, a link, a signature line, a clock with one hand, a stack of three sheets.
- Sizes: 20px in tables and lists, 24px in headings, 48px only on empty states of the desk and dashboard. Always in `--ink-2`, never in a status color; status has its own symbols (4.3).
- Every pictogram is paired with a word. None stands alone, none is used as decoration in a marketing list.

### 7.3 Data visuals

Information graphics are allowed where they replace words with something more exact:

- **The coverage scale** (Harvey balls, 9.10): five stages as a circle filled in quarters.
- **The timeline** of a filing (9.6).
- **Bar tables** in the dashboard: numbers with a horizontal bar of proportional length in `--print` at 8px height, no axes, no grid lines, values printed at the end of the bar. No pie or donut charts anywhere; they cannot be read to a decimal.
- **Annotated specimens**: the proof with leader lines to the six statements in "Your client sees what the state will see, before the state does." Leader lines 1px print color, horizontal and vertical only, ending in a 4px dot on the specimen.

### 7.4 What to commission

| Item | From (by kind) | Notes |
|---|---|---|
| Formular Sans and Mono | Swiss independent type foundry | Section 5.1 brief; 6 to 9 months |
| Wordmark and mark drawing | The same foundry's lettering department | Three optical sizes, SVG |
| 32 pictograms | Information-design studio, transit pictogram background | Plus 12 status symbols in the same drawing system |
| Capture and redaction pipeline | In-house engineering with a retoucher on call | Automated, consistent crops; masks applied before capture, not painted afterwards |
| Annotated specimens | In-house, from real components | Re-rendered on each release so the specimen never drifts from the product |

---

## 8. Motion and interaction

### 8.1 Principles

1. **Motion shows sequence, cause or correspondence. Nothing else moves.** No entrance fades on text, no parallax, no scroll-jacking, no hover lift, no animated gradients, no looping illustrations.
2. **Motion never delays reading.** Text is present and readable at frame 0; at most a highlight or a line appears.
3. **Everything that moves can be stopped,** and with `prefers-reduced-motion: reduce` nothing moves at all.
4. **No sound.** On phones, the approval sends one light haptic tick (Android `navigator.vibrate(10)`; iOS none). Nothing else vibrates.

### 8.2 Durations and easings

| Token | Duration | Easing | Use |
|---|---|---|---|
| `m-instant` | 0 | none | Everything under reduced motion |
| `m-micro` | 100ms | linear | Color changes on hover and press |
| `m-short` | 160ms | `cubic-bezier(0.2, 0, 0, 1)` | Chips, checkbox fill, validation messages, correspondence highlight in |
| `m-medium` | 240ms | `cubic-bezier(0.2, 0, 0, 1)` | Folds opening, "More options", disclosure |
| `m-long` | 320ms | `cubic-bezier(0.2, 0, 0, 1)` in; `cubic-bezier(0.3, 0, 1, 1)` out | Overlays, menu sheet, image viewer |
| `m-step` | 280ms per line | steps | Rehearsal log sequence |
| `m-fade-out` | 1200ms | linear | A changed row's highlight fading back to paper |

No bounce, no spring, no overshoot. Distances are short: an overlay rises 16px, a fold opens to its natural height, never more.

### 8.3 Signature moments

**Correspondence (the proof).** Tapping a line number on the proof tints that row with `--print-tint` (160ms) and outlines the same numbered callout on the picture of the state's review page; if the picture is off screen, a small "↑ 3" chip appears at the top edge and scrolls to it when tapped. Tapping a callout on the picture does the reverse. This is the one interaction that justifies the numbering, so it must be perfect: hit areas 48px, the highlight stays until another number is tapped.

**The rehearsal log (home, section 08).** When the log is 50% in view, its seven lines appear one at a time at `m-step` intervals: the step name first, then its result in the right-hand column 120ms later. Before the last line there is a pause of 600ms. Then "Pay Now" appears, and "held, on purpose" is set in hold color with the hold symbol. It plays once and stays. It runs at the real order of events; it does not pretend to be real time.

**The second check (home, section 06).** In the fee figure, the amount from the verified fee table appears first; 400ms later the amount read on the state's payment screen appears beside it, and only then the equals sign between them. The motion is the argument: two readings, compared, before paying.

**Approval.** When "Approve, and authorize submission and payment" is pressed, the label does not change and nothing celebrates. A 2px ink line runs along the bottom edge of the button, left to right, linear, while the request is in flight (indeterminate after 1.5s). The decision page then replaces the proof with a 240ms crossfade. No confetti, no check animation. Something irreversible has happened, and the design is quiet about it.

**Status changes in the desk.** When a filing's status changes while the page is open, its row tints with `--print-tint` and fades back over `m-fade-out`. The motion says "this changed", which is information.

### 8.4 Reduced motion

All durations become 0. The rehearsal log is shown complete. The second check shows both amounts and the equals sign at once. The in-flight line on the approve button is replaced by the button's disabled state. Folds open without animation. The "moving" status symbol is drawn static.

---

## 9. Components

### 9.1 Buttons

| Variant | Size | Fill / text | States |
|---|---|---|---|
| Ink (primary) | 48px tall, 24px side padding, `t-body` 75 Bold | `--button` / `--button-text` | Hover `--button-hover`; pressed `--button-press`; focus 3px `--focus` ring with 2px `--focus-halo` gap; disabled `--ground` fill, `--ink-3` text, 1px `--hairline`; busy: label per copy ("Sending…", "Saving…", "Creating…"), 2px line along the bottom |
| Decisive (the proof only) | 56px minimum, full sheet width on phones, 400px minimum on desktop, `t-body-l` 75 Bold, wraps to two lines | Always ink, on every firm | As ink; plus the in-flight line (8.3) |
| Firm primary (firm pages, non-decisive) | As ink | `--firm-button` / `--firm-button-text` (Section 11) | Hover `--firm-button-hover`; others as ink |
| Secondary | 48px, 1px `--rule` border | `--paper` / `--ink` | Hover `--ground` fill; pressed 2px border |
| Quiet (text button) | 48px hit area, text only | `--ink`, underline 1px, offset 3px | Hover underline 2px |
| Small (Same as, Remove, Copy link) | 36px tall, 48px hit area, `t-small` 65 | Secondary style | As secondary |
| Destructive (Revoke, Disconnect, Turn off, Remove) | Secondary | Text in `--stop`, no red fill | Asks to confirm inline: the button is replaced by the same label in stop text plus a secondary button to keep it, for 8 seconds |

The rule: **on firm pages, the button that moves the client's work forward uses the firm's color; the button that commits the client to something irreversible is always ink.** The firm's color is the print; the signature is ink.

### 9.2 Fields

- **Label above the field**, `t-label` in `--print` (which is the firm's print color on firm pages). The line number hangs in the reference column, `t-ref`, baseline-aligned with the label.
- **Help text sits between label and field**, not under the field. You read the instruction before you write, as on a paper form.
- **The box:** 48px tall (single line), 0 radius, 1px border in `--print`, paper fill, 12px side padding, value in `t-body-l` (client pages) or `t-body` (desk) in ink. The box is printed in the print color; what is typed is ink.
- **Width follows the expected answer:** ZIP 7ch, state 12ch, EIN 12ch, date 14ch, phone 18ch, names and streets full span. Paired rows keep the current `field-row n2` (2:1) and `n3` (2:1:1) proportions.
- **States:**

| State | Treatment |
|---|---|
| Default | 1px `--print` border |
| Hover | 1px `--ink` border |
| Focus | 2px `--ink` border inside, plus 3px `--focus` ring outside with 2px halo |
| Filled | Unchanged; the ink of the value is the signal |
| Filled from saved answers | A 3px `--print` bar on the box's left edge inside the border |
| Error | 2px `--stop` border; message set **above** the box, under the label, in `t-small` stop color, prefixed with the stop symbol; the existing "Please confirm." and validation messages unchanged |
| Disabled / read-only | `--ground` fill, 1px `--field-line` border, value in `--ink-2` |

- **Optional questions:** labels already carry "(optional)", set in `--ink-3`, 55 Regular. The "More options (optional)" fold is a 48px row with a 1px hairline top, a 12px plus sign that becomes a minus, `m-medium` open.
- **"Same as" and "Same person as":** the phrase in `t-small` ink-2 followed by small secondary buttons named with the earlier address or person, in a row that wraps; they appear only when there is something earlier to copy, as now.
- **Error summary** at the top of a form: a stop notice listing each problem as a link that moves focus to the field. Copy: "Please fix these and submit again."

### 9.3 Checkboxes, radios, signature pad

- **Checkbox:** 24px box, 2px `--print` border. Checked: an 12px ink square fills the center. It is the CoFile mark. Focus ring outside. The whole label is the hit area; authorization statements (`.auth`) are full-width rows with 16px padding and a 1px hairline frame, so a long legal sentence is one tappable object.
- **Radio:** 24px circle, 2px `--print` border, selected shows a 12px ink disc.
- **Signature pad:** always paper `#FFFFFF`, also in dark mode, 160px tall, 1px `--print` border, one 1px ink baseline at 72% of the height running from 24px to the right edge. The surrounding copy is unchanged.

### 9.4 The proof card

The proof is the most important component and is specified in full in 10.4. As a component it is a **sheet**: paper, 1px hairline, 720px maximum, internal reference column 40px. Its parts, in order:

```
┌ band 4px, firm color ─────────────────────────────────────────────┐
│ [logo plate]  Firm name                               with CoFile │
├───────────────────────────────────────────────────────────────────┤
│ ‖ Rehearsal notice (only when a rehearsal)                        │
│ H1 · reference and deadline                                       │
│ A   The state's review page (where possible)                      │
│ B   Filing details        1 … n, numbered rows                    │
│ C   State fees            amounts, total with rules               │
│ D   Declaration           consent text, directly above the button │
│ ═══ heavy rule                                                    │
│     [ Approve, and authorize submission and payment ]             │
│ ─── rule                                                          │
│     What should change? · [ Request changes ]                     │
│     Questions · with CoFile                                       │
└───────────────────────────────────────────────────────────────────┘
```

The part letters A to D are margin marks, not headings; the headings are the copy's own.

### 9.5 Status chips

Two sizes, no fills, no borders, no pills:

- **Inline** (tables, lists): 12px symbol, 4px gap, label `t-small` 65 in ink. Height 20px.
- **Header** (filing detail, the proof): 16px symbol, label `t-body` 65, inside a 1px border in the tone color, 32px tall, 12px padding. "Rehearsal" in the header always uses this size.

"Live" and "Rehearsal" are chips like any other: Live is the go disc, Rehearsal the hold bars. The desk's filings list shows the Rehearsal chip after the filing's name where today it shows "Test".

### 9.6 Timeline

Vertical. Three columns: time (right-aligned, tabular, `t-small` ink-2, 96px), the line (a 1px `--hairline` vertical rule with the status symbol centered on it), and the event (status label in 65, the next-step sentence from `nextStep()` below in `t-small`). Completed events carry their symbol; the current event is set in 75 Bold; future events are listed in `--ink-3` with an empty 12px ring so the client and firm can see what is still to come. The line between completed events is ink; the line into the future is hairline.

### 9.7 Tables

- No vertical rules. 1px ink rule under the header row, hairlines between rows, 1px ink rule closing the table.
- Header cells `t-small` 65 in `--ink-2`, sentence case, aligned with their data: left for text, right for numbers and dates.
- Row height 48px in the desk and dashboard, 40px in the docs, 56px with two-line cells.
- Numbers right-aligned tabular; status columns use inline chips.
- Hover: row background `--ground`. Selected: `--print-tint`.
- Mobile: tables of more than three columns become **stacked rows**: the first column as the row's heading, the others as label-value pairs, with a hairline between rows. No horizontal scrolling for tables that a client or firm reads; horizontal scroll is allowed only in the docs' parameter tables, with a visible right-edge fade.

### 9.8 Navigation

- **Public header:** 72px tall at L+, 56px on mobile, paper, 1px ink rule below. Lockup at the left edge of column 1. Section links ("How it works", "For firms", "What we file", "For platforms") at cols 5–9 in `t-body` ink, current section underlined 2px. "Log in" (quiet) and "Run a free rehearsal" (ink) at the right edge.
- **Mobile:** lockup, "Log in" and a 48px square button with three 2px rules (accessible name "Sections"). It opens a full-width sheet listing the four section links in `t-heading`, each 64px tall with a hairline, then the primary button. The sheet rises 16px over `m-long`.
- **App header (desk, dashboard):** 64px, links as text, current link with a 2px ink underline flush with the header's bottom rule. On mobile, the current page's name with the same three-rule button opening the full list.
- **Docs sidebar:** see 10.7.

### 9.9 Banners and notices

- **Beta notice:** a 40px band at the very top of every page except the widget, `--ground` background, 1px hairline below, text `t-small` ink centered at L+, left-aligned on mobile, hold symbol before "Beta" in 75 Bold. Copy from `BetaBanner.tsx`, unchanged, including the neutral version on firm pages. It does not use amber as a background: the band is information, not alarm.
- **Notices in pages:** paper background, 4px left bar in the tone color, symbol and text. Tones: neutral (print), go, hold, stop. Only two kinds get a tinted background: the **rehearsal notice on client pages** (`--hold-tint`), because a client must not miss it, and **stop notices** (`--stop-tint`), because something has stopped.

### 9.10 The coverage table

The table that makes the beta impossible to misread. Columns: reference number (`01`–`16`), Filing, Where, Where it stands.

"Where it stands" carries a **coverage disc**: a 16px circle with a 1.5px ink outline, filled by quarters. Its stages are ordered, and the fill shows the order.

| Disc | Label (locked) | Color |
|---|---|---|
| Empty, dotted outline | Planned | Ink-3 |
| Empty | Offered, not yet rehearsed | Ink |
| Half | Screens recorded, rehearsal next | Ink |
| Three quarters | Rehearsed to the payment screen | Ink |
| Full | Live | **Go green**, label in 75 Bold |

Only "Live" is green, only "Live" is full, only "Live" is bold. A reader scanning the column sees at once how many types are live, and if the answer is none, she sees that too. A legend with the five discs and labels sits above the table, right-aligned, in `t-small`. The note under the table (definitions and the "Write to hello@cofile.app" line) is set in `t-small` across cols 2–9.

Mobile: each row becomes a block: Filing in 65 Medium, Where in ink-2 on the next line, the disc and label below. The reference number hangs at the left.

### 9.11 Empty states, toasts, dialogs

- **Empty states:** words and actions only. The copy (for example "Your desk is clear. Start a filing (it can be a free rehearsal), or send a client a link with your logo on it.") in `t-body-l`, with its buttons underneath. A 48px pictogram may sit above it in the desk and dashboard; never an illustration.
- **Toasts:** for confirmations that need no action ("Thanks. Filings for this card pay with it for the next hour."). Bottom-left at L+, bottom full-width on mobile above the safe area, paper with 1px ink border, `t-body`, 6 seconds, pause on hover and focus, `role="status"`. Errors never appear as toasts; they stay on the page where the problem is.
- **Dialogs:** used only to confirm destructive actions where inline confirmation is not enough (disconnecting a state portal login). Paper, 1px ink border, 480px maximum, focus trapped, Escape closes.

---

## 10. Page by page

All copy below is quoted from the repository. Where I write a heading or a label it is the copy's own; where the design needs a word the copy does not have, I have left a numeral or a symbol instead and listed a suggestion in Appendix B.

### 10.1 Home `/`

Thirteen sections, in the copy's order, each opened by a full-width ink rule and numbered `01` to `13` in the reference column. One typeface, one color for structure, and only the coverage table and the rehearsal log use signal colors.

**Header and beta notice.** The beta band (9.9), then the header (9.8).

**01 Hero.**

```
L / XL  ───────────────────────────────────────────────────────────────────────────── 1px ink
 01   For CPA, payroll, fractional CFO and title firms         ┌ Harbor & Pine CPA    example firm ┐
                                                               │▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀│
      Your client approves                                     │ Two Sisters Bakery LLC ‖Rehearsal│
      the proof. Then                                          │ New Jersey LLC formation. Please │
      CoFile files it.                                         │ approve by Dec 3, 5:00 PM Eastern│
                                                            1  │ Business name   TWO SISTERS BAKE…│
      CoFile fills in your clients' LLC and corporation        │ Members         Ana Ortiz, Lucia…│
      formations, EINs and employer registrations on the       │ Main business…  88 Grove St, Jer…│
      official New York, New Jersey, Florida and IRS        2  │ Formation filing fee     $100.00 │
      websites, with your firm's name and logo on every        │ NJ portal fee, by card     $3.50 │
      page your client sees. First, your client gets ...       │ ──────────────────────────────── │
                                                               │ Total to the state       $103.50 │
      [ Run a free rehearsal ]   See what your client sees     │ ════════════════════════════════ │
                                                            3  │ New Jersey's own review page,    │
      In beta. A rehearsal fills in every screen of the        │ filled in                        │
      state's real website and stops before the last           │ Business Name  TWO SISTERS BAKERY│
      button, so nothing is filed and nothing is paid.         │ Designator     LLC               │
      You'll set up your firm's filing desk first.          4  │ [ Approve for filing ]           │
                                                               │ Nothing is submitted or paid ... │
                                                               └──────────────────────────────────┘
                                                               Sample proof · test details · not a real business
```

- Cols 2–6: kicker in `t-sub` 65 print color (not uppercase, not letterspaced); H1 `t-display`; sub `t-body-l` ink-2; CTAs on one line with 16px between; the beta note in `t-small` ink-2, max 52ch.
- Cols 8–12: the sample proof, rendered by the real proof component at 375px wide (the width of a phone), not scaled down. The callouts 1 to 4 sit in col 7 as hanging `t-ref` numerals in print color, each aligned with the top of the block it marks. They are the proof's own part marks; no leader lines, no circles.
- The highlighted values (`<mark>`) are drawn as a 3px print-tint underlay behind the value, never yellow.
- Mobile: kicker, H1 (36/44), sub, CTAs stacked full width, beta note, then the sample proof full width with callouts inline at its left edge.

Directly under the hero on mobile only: the four section links in a 2 × 2 grid of 56px cells with hairlines, so the page is navigable without the menu.

**02 Process.** "You start it. Your client approves it. CoFile files it." H2 cols 2–9; lede cols 2–7. The three steps as a three-column table across cols 2–12, each step's title ("You start it.", "Your client approves it.", "CoFile files it.") in `t-sub` 75 over its paragraph. Each column is topped by a rule: hairline for steps 1 and 3, **a 3px ink rule for step 2**, because the lede says "your client is in charge of the middle one" and the design should say it too. Step numbers 1, 2, 3 in the reference style above each rule. Mobile: three stacked blocks, the same rules.

**03 The proof.** "Your client sees what the state will see, before the state does." Headline and lede cols 2–6. At L+ the right side (cols 8–12) holds an **annotated specimen**: the full proof sheet of the sample filing, scaled to 85%, with six leader lines to the six statements, which are set in cols 8–12 beside it as a numbered list. The ticks are gone (Appendix A.1): each of the six statements is numbered 1 to 6 in the reference style and the leader line from its number lands on the part of the proof it describes. "For CPAs: it does for a business filing what the 8879 does for a return." is the sixth and has no leader line; it is set 65 Medium, the one statement for a professional. Mobile: the statements as a numbered list; the specimen below, unscaled, with the numbers in its margin.

**04 Firms.** "Your name on the door. Ours in small print." Headline and lede cols 2–6; the four statements as a numbered list cols 8–12. Below, across cols 2–12, a **specimen strip**: the header of Harbor & Pine CPA's proof shown three times side by side, in three different firm colors, each with its computed print color and button color, so the reader sees that the firm's color changes the print and never the ink. The third uses a pale color and shows the automatic fix (a darker print color, ink button text). Under the strip, the "with CoFile" mark at its real 13px with a 1px dimension line and "13 px" in `t-ref`. Mobile: the three headers stacked.

**05 Requests.** "Clients don't fill in forms. They text you." Headline and lede cols 2–6. Cols 8–12: the message is typeset as a **quotation**, not a cartoon bubble: a 1px hairline frame on Ground, 24px padding, the message in `t-body-l` 56 Italic, and the source line "Ana Ortiz · text message · example" in `t-small` ink-2 under it. Three phrases in the message carry a 1px print underline and a superscript reference numeral: "me and my sister" (1), "50/50" (2), "Jersey City" (3). Below, the arrow line "↳ read into a drafted New Jersey LLC formation for your team to check" in mono, then a three-row draft table: line numbers 1–3 against the field labels "Members", "Members" (ownership), "Main business address", with the drafted values in ink. The reader sees exactly which words became which line.

**06 Checks.** "Checked twice. Filed once." Headline and lede cols 2–6; the five statements numbered cols 8–12. Above the list, the **second-check figure**: two columns, "verified fee table" and "the state's payment screen" (phrases from the first statement), each with `$103.50` in `t-heading` tabular, joined by an equals sign that appears last (8.3). The final statement's link "Security" is a normal underlined link.

**07 After.** "The papers come back to you." Headline and lede cols 2–6. Cols 8–12: the three statements as a numbered list, and beneath them a horizontal **timeline strip** for a sample filing using the real status labels: Waiting for approval, Approved, Submitted to the state, Accepted by the state, EIN issued, Completed. Each is a tick mark on a 1px rule with its label below; the documents (schematics, 7.1) hang under "Accepted by the state" and "EIN issued". Mobile: the strip becomes the vertical timeline component (9.6).

**08 Rehearsals.** "Rehearse on the real stage." Both ledes cols 2–6. Cols 8–12: the rehearsal log as a ruled ledger, mono `t-mono`:

```
  Rehearsal · New Jersey LLC formation                  test details
 ─────────────────────────────────────────────────────────────────────
 1  Business name                                       filled
 2  Name check                                          passed
 3  Registered agent                                    filled
 4  Members and signatures                              filled
 5  Review page                                         matched the proof
 6  Payment: $100.00 + $3.50 NJ portal fee              matches the proof
 7  Pay Now                                          ‖  held, on purpose
 ═════════════════════════════════════════════════════════════════════
```

Results right-aligned. Line 7 is the only colored line: hold symbol and "held, on purpose" in `--hold`, 65 Medium. The caption "13 screens of New Jersey's own LLC form, some grouped here, filled in with test details. Nothing was filed." in `t-small` below. Plays as in 8.3.

**09 Coverage.** "New York, New Jersey, Florida and the IRS." H2 and lede cols 2–9; legend right-aligned at cols 10–12; the coverage table (9.10) across cols 2–12; the note below cols 2–9. Rows keep the copy's order, which already runs from furthest along to least. No filters, no tabs: sixteen rows fit on one screen at L.

**10 The catch.** "Every filing service has a catch. Here's ours." Here the design makes its one rhetorical gesture. The five points are **set at `t-heading` (24/32), larger than any body text on the page**, as a numbered list with the numerals hanging in the reference column at the same size. Fine print set large. Cols 2–10. The lede "We'd rather tell you now than have you find out later." in `t-sub` above.

**11 Security.** "Security". The five blocks as a **definition table**: heading in col 2–5 (`t-sub` 75), text in cols 6–12 (`t-body-l`), hairline between rows. Each heading has its pictogram (lock, card, link, signature line, separated sheets) at 24px in the reference column. A table, because this is what security reviewers will copy into a questionnaire.

**12 Enterprise.** "Building a filing product? Put CoFile underneath it." Headline, lede and the five-item list cols 2–6 (numbered, no ticks; `"dryRun": true` in mono; "Read the API docs" a link). The inquiry form cols 8–12, on a paper sheet with 32px padding: paired fields (Name and Company; Work email and Phone (optional); States you file in and Filings per month), then "What you'd like to do (optional)", then "Send" (ink). The honeypot field stays visually hidden. The success message replaces the form in the same sheet.

**13 Close.** "Run one rehearsal. Then decide." `t-headline` cols 2–9, the lede below, then "Run a free rehearsal" with "Questions first? hello@cofile.app" beside it. 128px of space, then the tagline "Approve the proof. Then it's filed." in `t-sub`, preceded by the marked box at 24px in two-ink.

**Footer.** Ground background, 1px ink rule above. Line one: "CoFile · the filing desk behind your firm" (left) and "New York · New Jersey · Florida · IRS" (right). Line two: the legal sentence (left, max 66ch) and "Terms · Privacy · Security · hello@cofile.app" (right). `t-small`, ink-2.

### 10.2 Sign-up `/signup` and `/signup/sent`

```
 ─────────────────────────────────────────────────────────────────────────
  For firms                                   ┌ sheet ─────────────────────┐
  Set up your firm's filing desk              │ Firm name                  │
                                              │ [                        ] │
  For firms that file for their clients.      │ (kind)  [ Choose one     ▾]│
  Confirm your email, put your name and       │ Your name   │ Work email   │
  logo on the door, and choose which card     │ Password    │ Password again│
  pays the state's fees. Your first filing    │ At least 12 characters...  │
  can be a free rehearsal: nothing filed,     │ Phone (optional) │ Website │
  nothing paid.                               │ States you file in         │
                                              │ □ New York □ New Jersey □ FL│
  Building a filing product? …                │ Filings per month [Under 10]│
                                              │ □ I agree to the Terms ... │
                                              │ [ Create account ]         │
                                              │ You'll confirm your email… │
                                              └────────────────────────────┘
```

Copy column cols 2–5, form sheet cols 7–11. The form is numbered 1 to 11 in its margin like every form in the system. "States you file in" is a row of three checkboxes (9.3). Password help sits between label and field. Mobile: copy first, then the form full width.

`/signup/sent`: a single sheet, cols 3–8. "Your filing desk" as the kicker, "Check your email" as H1, the paragraph, then the "send the link again" form with "Email" and "Send a new link". The envelope pictogram at 48px above the heading is the only image.

### 10.3 Log in and account pages

**`/login`.** One sheet, 480px, centered on Ground. "Log in" kicker, "Welcome back" H1, "Firms go to their filing desk, platforms to their dashboard." in ink-2. "Continue with Google" as a secondary button with Google's own mark at the size and clear space Google's rules require; then a hairline; then Email, Password, "Forgot your password?" (quiet link, right-aligned under Password), "Log in" (ink). Under the sheet: "New here? Set up your firm's filing desk. Enterprise developers can also log in with an API key". The API key form opens on the same page as a second sheet, with its 12-hour note. Messages ("Your session ended. Log in again to carry on." and the others) appear as a neutral notice at the top of the sheet; Google errors as stop notices.

**`/forgot-password`, `/reset-password`, `/verify-email`, `/invite-expired`, `/join/<token>`, session ended.** All use the same 480px sheet: kicker, H1, one paragraph, one form or one link, nothing else. "Forgot password" / "Reset your password" / "Email me a reset link" / "Back to log in"; "Reset password" / "Choose a new password" / "Set new password"; "Your filing desk" / "Confirm your email" / "Confirm my email"; "This link has expired or isn't valid" with "Ask whoever sent it for a new invitation…". `/join/<token>` is a redirect; while it resolves, it shows the sheet with the wordmark only, no spinner for the first 400ms.

**`/terms` and `/privacy`.** Reading layout: cols 2–8, `t-body-l`, numbered clauses with the clause numbers hanging in the reference column (1, 1.1, 1.2), headings `t-heading`. A contents list at cols 10–12, sticky at L+, collapsing to the top of the page on mobile. Version and date at the top in `t-small`. A print stylesheet sets them on US Letter, 11pt, with the clause numbers in the margin.

**404 and error.** The header, a rule, then in cols 2–8: "Page not found", "The link may be old or mistyped.", "Go to the home page" (ink button). The error page: "Something went wrong", "This page couldn't load just now. It's usually a short hiccup on our side.", "Try again" (ink) and "Log in again" (secondary). No illustrations, no jokes, no large "404" numerals. On firm pages, both are drawn in the firm's theme, without the CoFile header.

### 10.4 The proof (approval page, api.cofile.app)

The page people sign. Designed for a 360px phone first. All text 7:1 or better. No sticky approve button: the button is at the end of the document, where a signature goes, and the reader reaches it by reading.

```
 360px phone
┌────────────────────────────────────┐
│▀▀▀▀▀▀▀▀▀▀▀ band 4px firm ▀▀▀▀▀▀▀▀▀▀│
│ [logo] Harbor & Pine CPA           │
│                        with CoFile │
├────────────────────────────────────┤
│ ‖ Rehearsal: nothing will be filed │  hold-tint, only for rehearsals
│   or paid, even if you approve.    │
├────────────────────────────────────┤
│ NJ formation:                      │  t-title 26/32 (engine's title
│ TWO SISTERS BAKERY LLC             │  today; see Appendix B)
│ Filing reference F-8K2Q…           │  mono
│ Please decide by December 3, 2026, │
│ 5:00 PM Eastern. After that, this  │
│ link stops working and you'll need │
│ a new one.                         │
├────────────────────────────────────┤
│ A  The state's review page         │
│    This is a picture of the state's│
│    own review page, filled in …    │
│   ┌──────────────────────────────┐ │
│   │  [screenshot]   ①      ②     │ │  tap opens viewer, pinch zoom
│   └──────────────────────────────┘ │
├────────────────────────────────────┤
│ B  Filing details                  │
│ 1  Business name                   │  label: t-label in print
│    TWO SISTERS BAKERY LLC          │  value: t-body-l ink
│ 2  Members                         │
│    Ana Ortiz, Lucia Ortiz (50/50)  │
│ 3  Main business address           │
│    88 Grove St, Jersey City NJ …   │
├────────────────────────────────────┤
│ C  State fees                      │
│    Nothing is charged on this page.│
│    Formation filing fee    $100.00 │
│    NJ portal fee, by card    $3.50 │
│    ───────────────────────────────│
│    Total                   $103.50 │
│    ═══════════════════════════════│
│    Maximum you authorize   $103.50 │
│    (if the state asks for more, we │
│    stop before paying)             │
├────────────────────────────────────┤
│ D  By approving, you confirm every │
│    detail below is correct and …   │
│    Government sites don't save     │
│    drafts, so once you approve …   │
│    [ One-time code sent to you   ] │
│ ══════════════════════════════════ │  2px ink
│ ┌────────────────────────────────┐ │
│ │ Approve, and authorize         │ │  decisive, ink, 72px (2 lines)
│ │ submission and payment         │ │
│ └────────────────────────────────┘ │
│ ────────────────────────────────── │
│    What should change? (Needed     │
│    only if you ask for changes)    │
│    [                             ] │
│    [ Request changes ]             │  secondary
│                                    │
│    Questions: {firm support email} │
│                        with CoFile │
└────────────────────────────────────┘
```

Rules for the build:

- **Order.** Rehearsal notice; H1 with reference and deadline; A, the state's review page (only where possible; absent for IRS filings); B, Filing details; C, State fees; D, the declaration; the decision. The consent paragraph (from `approvalConsent()` with the EIN sentences and "Government sites don't save drafts…") moves from the top of the page to **directly above the button**. A short reminder at the top is not needed: the rehearsal notice and the deadline are the two facts the reader needs before reading.
- **A, the picture.** Full sheet width, 1px hairline frame, numbered callouts drawn by the engine on the capture as 24px print-colored squares with paper numerals, matching the line numbers in B. Tapping the picture opens a full-screen viewer (paper, 1px ink border, pinch and double-tap zoom to 200%, close button top right). Alt text unchanged.
- **B, Filing details.** On phones, label above value. At 720px, a two-column table: line number in the reference column, label (40%), value (60%). Nested values (members, addresses) are grouped under a sub-label in 65 Medium with their own lines numbered 2.1, 2.2. The SSN sentence sits directly above the first masked value, not at the top of the table. Values in sans; masked numbers in mono.
- **The authorizations** the client is making appear as the last group of B, each statement in full in `t-body-l`, each with the marked box (they were checked on the intake form). They are statements, so they read as sentences, not table cells.
- **C, State fees.** The fee table with accounting rules (5.3). "Nothing is charged on this page. These fees are paid to the state when the filing is submitted." above it in ink-2.
- **D and the decision.** The declaration in `t-body-l` ink with a 4px print-colored left bar. Then the one-time code field if required (single input, `inputmode="numeric"`, mono 24px, letter-spacing 0.3em, `autocomplete="one-time-code"`). Then a 2px ink rule. Then the decisive button. Then a 1px rule, and the second path: the comment field and "Request changes". Separating the two paths keeps the textarea out of the space between the declaration and the button.
- **Sticky total.** When section C has scrolled out of view upward, a 44px strip pins to the top: the firm's name at the left and "Total $103.50" at the right in tabular 75 Bold. It shows money, not a button.
- **The H1** today reads "NJ formation: TWO SISTERS BAKERY LLC", built from engine field names. The design sets whatever the engine supplies; Appendix B asks for the filing type's own title.

**Decision page.** Same firm header. "Approval recorded" as H1, the paragraph from the engine (the rehearsal version or the live version, unchanged). For a live filing, below it, the timeline component showing "Approved" done and the next stages to come in ink-3. For a change request: the change-request paragraph, as its own page with the same header. Nothing else: no "share", no "rate us".

**Approval errors and expired links.** Today these are bare `<p>` elements without the firm's header. They get the full branded page: firm header, an H1 (see Appendix B; until there is copy, the sentence itself is set as `t-title`), and the support line. The three texts ("A decision was already recorded with this link…", "This link to the proof has expired…", "This link to the proof isn't valid…") and the two POST errors ("That code didn't match…", "We couldn't record your decision…") unchanged. "That code didn't match" returns to the proof with the code field in its error state, not to a separate page.

**Print.** The proof prints on US Letter: 0.75in margins, 10.5pt, the reference column in the left margin, the picture of the state's page at full text width, the decision block replaced by a line recording the approval time if approved. The firm's band prints as a 2pt rule.
