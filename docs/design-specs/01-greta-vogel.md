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

### 2.1 How the concept answers the six hard problems

| Problem | Answer in this design | Where |
|---|---|---|
| Co-branding at scale | The firm's color becomes the *print* color of its forms, computed for contrast; ink, the signals and the decisive button never change | 4.2, 9.1, 11 |
| Trust for an irreversible act | The proof is a numbered form; the declaration sits directly above the one ink button at the end; amounts follow accounting rules; nothing sticky, nothing celebratory | 9.4, 10.4 |
| Honest beta | "Live" is the only full green disc on the site; rehearsal is the hold symbol in amber; coverage stages are ordinal quarters of a disc | 4.3, 9.10, 10.1 |
| Two readers on one site | One system, two densities: 18px reading for firms and clients, 16px with mono for developers; the same numbering from intake to API | 5.2, 10.8, 10.10 |
| Forms that ask little | State order, required first, optional folded, saved answers marked, field widths that say how long an answer is, help before the box | 9.2, 10.5 |
| Plain reading | 14px minimum, 7:1 on the proof, symbol plus word for every state, Spanish designed in from the start | 5.2, 12 |

---

## 3. Brand identity

### 3.1 The wordmark

"CoFile", one word, capital C, capital F, set in Formular Sans 75 Bold and then redrawn by hand as lettering. Instructions for the letterer:

- **Construction grid.** Cap height = 10 units. x-height = 6.9 units (lower than the text face's, deliberately, to give the F room; see below). Stem weight = 1.6 units (vertical), 1.45 units (horizontal; grotesk contrast). Baseline overshoot for round letters 0.15 units.
- **C.** Grotesk construction, terminals cut exactly horizontal, aperture 3.4 units tall at the right side. No spur.
- **o.** Optically round, width 6.9 units, counter 3.7 units wide.
- **F.** Top arm 5.8 units long from the stem's left edge. Middle arm 4.9 units long, and **the top edge of the middle arm sits exactly on the x-height line** (6.9 units), leaving a 1.65-unit counter under the top arm. This is the one deliberate detail: the F's middle arm continues the top line of "o", "i" and "e", so the word reads as one line of text, the way a field label reads on a form.
- **i.** The dot is a **square**, side = stem width (1.6 units), its top edge on the cap height line. It echoes the mark (3.2).
- **l.** Ascender rises exactly to cap height, not above. The wordmark sits in a clean rectangle: cap height top, baseline bottom, no ascender poking out.
- **e.** Horizontal terminal, bar at 3.9 units, same horizontal stem weight.
- **Spacing.** Tracked −10/1000 at display sizes, kerned optically. The C–o pair is tightened by 40/1000 so "Co" does not fall apart from "File". No color split, no weight split between "Co" and "File": the name is one word.

The wordmark is supplied as SVG in three optical sizes: **Display** (above 32px cap height), **Text** (12 to 32px, slightly wider spacing and a 5% heavier hairline), and **Micro** (below 12px, used only in "with CoFile" and the favicon companion, spacing opened by +30/1000).

### 3.2 The mark: the marked box

A square outline with a solid square inside it. It is the box on a form, marked. On the forms I have designed, a box is marked by filling it or crossing it, never by a decorative tick. Filling the box is the client's act. The mark says: *the box was marked by the person who had the right to mark it*.

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
| Ink on paper | 18.4:1 | 14.8:1 | AAA body |
| Ink-2 on paper | 8.9:1 | 8.8:1 | AAA body |
| Ink-3 on paper | 5.3:1 | 5.3:1 | AA, 14px minimum |
| Form Blue on paper | 8.5:1 | 8.7:1 | AAA for 14px labels |
| Go on paper | 6.3:1 | 7.8:1 | AA text, 3:1 symbol |
| Hold on paper | 5.7:1 | 9.0:1 | AA text |
| Stop on paper | 6.8:1 | 7.6:1 | AA text |
| Go on go-tint | 5.4:1 | 6.9:1 | AA |
| Hold on hold-tint | 5.1:1 | 7.9:1 | AA |
| Stop on stop-tint | 5.7:1 | 7.1:1 | AA |
| Button text on button | 18.4:1 | 15.7:1 | AAA |
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
- Unambiguous I, l, 1 and O, 0: a lowercase l with a tail, a 1 with a flag and a foot, a plain capital I at full cap height, a zero narrower than the O. In Mono, the zero is slashed.
- Figures: **tabular lining figures by default**, proportional lining as `pnum`. Oldstyle figures are not drawn. All figures share one width in tabular mode, including the dollar sign, comma and period, so that columns of amounts align by construction.
- Case-sensitive forms for parentheses, hyphens and colons. No automatic fractions: "50/50" on a member line is a split, not a fraction, and must stay as typed.
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
| `t-sub` | 20/28 | 20/28 | 65 | 0 | H3; kickers; step titles |
| `t-lede` | 20/28 | 18/28 | 55 | 0 | Home section ledes, in `--ink-2`, 60ch maximum |
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
- **Annotated specimens**: the sample proof in the hero (the copy's callouts 1 to 4) and the full proof in "Your client sees what the state will see, before the state does." (the six statements). Annotations are a commentary layer *outside* the specimen and must never be confused with the specimen's own line numbers: annotation numerals in `t-sub` 75 **ink**, set in the page's reference column outside the sheet, with 1px ink leader lines (horizontal and vertical only) ending in a 4px ink dot at the edge of the block they mark. The specimen's own line numbers stay inside the sheet, 13px, print color.

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

- **Checkbox:** 24px box, 2px `--print` border. Checked: a 12px ink square fills the center. It is the CoFile mark. Focus ring outside. The whole label is the hit area; authorization statements (`.auth`) are full-width rows with 16px padding and a 1px hairline frame, so a long legal sentence is one tappable object.
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
│     The state's review page (where possible), numbered callouts   │
│     Filing details        1 … n, numbered rows                    │
│     State fees            amounts, total with rules               │
│     Declaration           consent text, directly above the button │
│ ═══ heavy rule                                                    │
│     [ Approve, and authorize submission and payment ]             │
│ ─── rule                                                          │
│     What should change? · [ Request changes ]                     │
│     Questions · with CoFile                                       │
└───────────────────────────────────────────────────────────────────┘
```

The headings are the copy's own ("The state's review page", "Filing details", "State fees"). There is no third numbering for the parts: line numbers for details, and nothing else, so a first-time founder has one system to learn.

### 9.5 Status chips

Two sizes, no fills, no pills; only the header size has a border:

- **Inline** (tables, lists): 12px symbol, 4px gap, label `t-small` 65 in ink. Height 20px.
- **Header** (filing detail, the proof): 16px symbol, label `t-body` 65, inside a 1px border in the tone color, 32px tall, 12px padding. "Rehearsal" in the header always uses this size.

"Live" and "Rehearsal" are chips like any other: Live is the go disc, Rehearsal the hold bars. The desk's filings list shows the Rehearsal chip after the filing's name where today it shows "Test".

### 9.6 Timeline

Vertical. Three columns: time (right-aligned, tabular, `t-small` ink-2, 96px), the line (a 1px `--hairline` vertical rule with the status symbol centered on it), and the event (status label in 65, the next-step sentence from `nextStep()` below in `t-small`). Completed events carry their symbol; the current event is set in 75 Bold; future events are listed in `--ink-3` with a 12px dotted ring (the same mark as "Planned" in the coverage table: not yet reached) so the client and firm can see what is still to come. The line between completed events is ink; the line into the future is hairline.

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

### 9.12 The line numbering (the signature system)

The numbering is a component with its own rules, because if it drifts it is worse than useless.

**Assignment.**

- Each filing type has a **schedule**: the ordered list of every detail the state asks for, in the state's screen order. Line numbers are assigned 1, 2, 3 … down that schedule. Repeated groups take one number with sub-lines: members are line 9, and Member 1's name and address are 9.1 and 9.2, Member 2's are 9.3 and 9.4. Authorizations are numbered last, continuing the sequence.
- Optional details keep their number whether or not they are answered. On the proof, an unanswered optional line is shown as its number and label with an en dash for the value, so the numbers never renumber between a client's proof and the next client's. A gap is honest; a renumbered line is a trap.
- The schedule is versioned with the filing type (the engine already versions the state's form snapshots). If a state adds a field, the new version appends or inserts and the version changes; a proof always shows the numbers of the version it was made with.

**Display.**

| Surface | Where the number sits | Style |
|---|---|---|
| Intake form | Reference column, baseline of the label | `t-ref`, print color |
| The proof, Filing details | Reference column (row header text on phones) | `t-ref`, print color |
| The proof, the state's page | Callout squares drawn on the capture by the engine | 24px print-color square, paper numeral, 13px |
| Rehearsal log, run log | First column of the log | Mono, ink-2 |
| Filing detail (desk, dashboard) | In the request fold and in the record | `t-ref` |
| API | `line` property on each field in `/v1/schema/filing-request` and on each row of the shown payload | String, e.g. `"9.2"` |
| Printed record | Left margin | 9pt, print color |

**The callouts on the state's page** are placed by the engine from the field positions it already knows when it fills the page (it typed those values, so it knows where they are). A callout sits 4px to the left of the field's box, or above it when there is no room. If the engine cannot place a callout with confidence, it omits it rather than guess; the text table still has every line.

**Numbers look like print, not like buttons.** Only on the proof do they do something (8.3): there they get a 1px dotted underline on hover and on focus, a 48px hit area, and are exposed to screen readers as buttons. Everywhere else they are plain text.

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
- Cols 8–12: the sample proof, rendered by the real proof component at 375px wide (the width of a phone), not scaled down, with the copy's sample content (including its own button, "Approve for filing").
- The callouts 1 to 4 are **annotations** (7.3): numerals in `t-sub` 75 ink in col 7, outside the sheet, each with a short 1px ink leader to the top of the block it marks (the details, the fees, New Jersey's page, the approval). Inside the sheet, the specimen carries its own **line numbers** 1 to 3 beside the three details in 13px print color, and the excerpt of New Jersey's review page carries the matching callout square 1 beside "Business Name". The two numberings are kept apart by size, color and position: commentary outside, in ink; the form's own numbers inside, in print. The reader learns the signature idea in the first screen without being told.
- The highlighted values (`<mark>`) are drawn as a 3px print-tint underlay behind the value, never yellow.
- Mobile: kicker, H1 (36/44), sub, CTAs stacked full width, beta note, then the sample proof full width with callouts inline at its left edge.

Directly under the hero on mobile only: the four section links in a 2 × 2 grid of 56px cells with hairlines, so the page is navigable without the menu.

**02 Process.** "You start it. Your client approves it. CoFile files it." H2 cols 2–9; lede cols 2–7. The three steps as a three-column table across cols 2–12, each step's title ("You start it.", "Your client approves it.", "CoFile files it.") in `t-sub` 75 over its paragraph. Each column is topped by a rule: hairline for steps 1 and 3, **a 3px ink rule for step 2**, because the lede says "your client is in charge of the middle one" and the design should say it too. Step numbers 1, 2, 3 in the reference style above each rule. Mobile: three stacked blocks, the same rules.

**03 The proof.** "Your client sees what the state will see, before the state does." Headline and lede cols 2–6. At L+ the right side (cols 8–12) holds an **annotated specimen**: the full proof sheet of the sample filing, scaled to 85%, with six leader lines to the six statements, which are set in cols 8–12 beside it as a numbered list. The ticks are gone (Appendix A.1): each of the six statements is numbered 1 to 6 in the reference style and the leader line from its number lands on the part of the proof it describes. "For CPAs: it does for a business filing what the 8879 does for a return." is the sixth and has no leader line; it is set 65 Medium, the one statement for a professional. Mobile: the statements as a numbered list; the specimen below, unscaled, with the numbers in its margin.

**04 Firms.** "Your name on the door. Ours in small print." Headline and lede cols 2–6; the four statements as a numbered list cols 8–12. Below, across cols 2–12, a **specimen strip**: the header of Harbor & Pine CPA's proof shown three times side by side, in three different firm colors, each with its computed print color and button color, so the reader sees that the firm's color changes the print and never the ink. The third uses a pale color and shows the automatic fix (a darker print color, ink button text). Under the strip, the "with CoFile" mark at its real 13px with a 1px dimension line and "13 px" in `t-ref`. Mobile: the three headers stacked.

**05 Requests.** "Clients don't fill in forms. They text you." Headline and lede cols 2–6. Cols 8–12: the message is typeset as a **quotation**, not a cartoon bubble: a 1px hairline frame on Ground, 24px padding, the message in `t-body-l` 56 Italic, and the source line "Ana Ortiz · text message · example" in `t-small` ink-2 under it. The phrases that were read carry a 1px print underline and, as a superscript, the line number of the field they filled in the New Jersey LLC schedule: "me and my sister" and "50/50" the members line, "Jersey City" the address line. Below, the arrow line "↳ read into a drafted New Jersey LLC formation for your team to check" in mono, then a small draft in the form's own style: the business name line as an **empty box** (the message did not say), the members line with "Ana Ortiz" in ink, a second empty box and "(50/50)", and the main business address line with empty boxes for the street and ZIP and "Jersey City" and "NJ" in ink. The reader sees exactly which words became which line, and that the empty boxes are what "Someone at your firm checks the draft" means.

**06 Checks.** "Checked twice. Filed once." Headline and lede cols 2–6; the five statements numbered cols 8–12. Above the list, the **second-check figure**: two columns, "verified fee table" and "the state's payment screen" (phrases from the first statement), each with `$103.50` in `t-heading` tabular, joined by an equals sign that appears last (8.3). The final statement's link "Security" is a normal underlined link.

**07 After.** "The papers come back to you." Headline and lede cols 2–6. Cols 8–12: the three statements as a numbered list, and beneath them a horizontal **timeline strip** for a sample filing using the real status labels: Waiting for approval, Approved, Submitted to the state, Accepted by the state, EIN issued, Completed. Each is a short vertical stroke on a 1px rule with its label below; the documents (schematics, 7.1) hang under "Accepted by the state" and "EIN issued". Mobile: the strip becomes the vertical timeline component (9.6).

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

**10 The catch.** "Every filing service has a catch. Here's ours." Here the design makes its one rhetorical gesture. The five points are **set at `t-heading` (24/32), larger than any body text on the page**, as a numbered list with the numerals hanging in the reference column at the same size. Fine print set large. Cols 2–10. The lede "We'd rather tell you now than have you find out later." in `t-lede` above.

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
│    The state's review page         │
│    This is a picture of the state's│
│    own review page, filled in …    │
│   ┌──────────────────────────────┐ │
│   │  [screenshot]  [1]    [9]    │ │  tap opens viewer, pinch zoom
│   └──────────────────────────────┘ │
├────────────────────────────────────┤
│    Filing details                  │  numbers from the type's schedule
│ 1  Business name                   │  label: t-label in print
│    TWO SISTERS BAKERY LLC          │  value: t-body-l ink
│ 7  Main business address           │
│    88 Grove St, Jersey City NJ …   │
│ 9  Members                         │
│    Ana Ortiz, Lucia Ortiz (50/50)  │
├────────────────────────────────────┤
│    State fees                      │
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
│ ▌  By approving, you confirm every │  declaration, print bar
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

- **Order.** Rehearsal notice; H1 with reference and deadline; the state's review page (only where possible; absent for IRS filings); Filing details; State fees; the declaration; the decision. The consent paragraph (from `approvalConsent()` with the EIN sentences and "Government sites don't save drafts…") moves from the top of the page to **directly above the button**. A short reminder at the top is not needed: the rehearsal notice and the deadline are the two facts the reader needs before reading.
- **The state's review page.** Full sheet width, 1px hairline frame, numbered callouts drawn by the engine on the capture as 24px print-colored squares with paper numerals, matching the line numbers in Filing details. Tapping the picture opens a full-screen viewer (paper, 1px ink border, pinch and double-tap zoom to 200%, close button top right). Alt text unchanged.
- **Filing details.** On phones, label above value. At 720px, a two-column table: line number in the reference column, label (40%), value (60%). Nested values (members, addresses) are grouped under a sub-label in 65 Medium with their sub-lines numbered as in 9.12 (9.1, 9.2). The SSN sentence sits directly above the first masked value, not at the top of the table. Values in sans; masked numbers in mono.
- **The authorizations** the client is making appear as the last group of Filing details, each statement in full in `t-body-l`, each with the marked box (they were checked on the intake form). They are statements, so they read as sentences, not table cells.
- **State fees.** The fee table with accounting rules (5.3). "Nothing is charged on this page. These fees are paid to the state when the filing is submitted." above it in ink-2.
- **The declaration and the decision.** The declaration in `t-body-l` ink with a 4px print-colored left bar. Then the one-time code field if required (single input, `inputmode="numeric"`, mono 24px, letter-spacing 0.3em, `autocomplete="one-time-code"`). Then a 2px ink rule. Then the decisive button. Then a 1px rule, and the second path: the comment field and "Request changes". Separating the two paths keeps the textarea out of the space between the declaration and the button.
- **Sticky total.** Once the H1 has scrolled out of view, a 44px strip pins to the top (hidden while the State fees table itself is on screen): the firm's name at the left and "Total $103.50" at the right in tabular 75 Bold. It shows money, not a button.
- **The H1** today reads "NJ formation: TWO SISTERS BAKERY LLC", built from engine field names. The design sets whatever the engine supplies; Appendix B asks for the filing type's own title.

**Decision page.** Same firm header. "Approval recorded" as H1, the paragraph from the engine (the rehearsal version or the live version, unchanged). For a live filing, below it, the timeline component showing "Approved" done and the next stages to come in ink-3. For a change request: the change-request paragraph, as its own page with the same header. Nothing else: no "share", no "rate us".

**Approval errors and expired links.** Today these are bare `<p>` elements without the firm's header. They get the full branded page: firm header, an H1 (see Appendix B; until there is copy, the sentence itself is set as `t-title`), and the support line. The three texts ("A decision was already recorded with this link…", "This link to the proof has expired…", "This link to the proof isn't valid…") and the two POST errors ("That code didn't match…", "We couldn't record your decision…") unchanged. "That code didn't match" returns to the proof with the code field in its error state, not to a separate page.

**Print.** The proof prints on US Letter: 0.75in margins, 10.5pt, the reference column in the left margin, the picture of the state's page at full text width, the decision block replaced by a line recording the approval time if approved. The firm's band prints as a 2pt rule.

### 10.5 The intake form `/i/<token>` and the form in the desk

One form component serves the client link, the firm's permanent pages, the hosted enterprise page, the widget and the desk's New filing. It is designed to ask for as little as possible and to look exactly like the proof it will become.

```
┌ band ─────────────────────────────────────────────┐
│ [logo] Harbor & Pine CPA                with CoFile│
├───────────────────────────────────────────────────┤
│ ‖ This page is in rehearsal for now. You can fill  │  only when the type isn't live
│   it in and see your proof, but nothing will be …  │
│ New Jersey LLC formation · {link label}            │
│ Certificate of Formation for a domestic LLC, …     │
│ After you send this, you'll get a link to check …  │
│                                                    │
│ Fields marked * are required.                      │
│ ──────────────────────────────────────── 1/7 ───── │
│    Name                                            │  section legend, t-heading
│ 1  LLC name, without the ending *                  │
│    Don't type LLC or Ltd. here; pick the ending …  │  help before the box
│    [                                            ]  │
│ 2  Ending *                                        │
│    [ LLC                ▾]                         │
│ ──────────────────────────────────────── 2/7 ───── │
│    Business data                                   │
│ 3  EIN, if one is already assigned (usually blank) │
│    [            ]                                  │
│    ＋ More options (optional)                      │
│ ...                                                │
│ ──────────────────────────────────────── 5/7 ───── │
│    Members and managers                            │
│    Member 1                              Remove    │
│ 9  Name *                                          │
│ 10 Address *                                       │
│    Same as  [Main business address]                │
│ ...                                                │
│    Other provisions (optional)            ＋       │  folded section
│ ────────────────────────────────────────────────── │
│    Authorizations                                  │
│    The state form asks for these. Check a box …    │
│   ┌──────────────────────────────────────────────┐ │
│   │ □  I attest that the registered agent …      │ │
│   └──────────────────────────────────────────────┘ │
│    Next, you'll get a proof to check. Nothing is … │
│    By sending, you agree to CoFile's Terms …       │
│    [ Send to Harbor & Pine CPA ]                   │  firm primary
│    Questions? Email {firm support email}.          │
└───────────────────────────────────────────────────┘
```

- **Order** follows the state's screens, which is the order the proof will show. Line numbers are assigned per filing type from that order and fixed for the type's version; the proof uses the same numbers.
- **Section progress** as a numeral pair (`1/7`) at the right end of each section's rule, `t-ref`. No progress bar, no steps across the top; the form is one page and scrolls.
- **Required first, optional folded:** sections with nothing required are folded with "(optional)" in their title, as `planSections()` already decides; inside a section, optional questions go under "More options (optional)". A folded section opens by itself when it holds an answer or a problem.
- **Repeated groups** (members, signers, provisions): each item is a sub-sheet with a hairline frame, titled "Member 1", with "Remove" at the right; "Add" below the last item as a small secondary button.
- **Saved answers** from the firm's setup (registered agent, organizer, signer, addresses) are shown filled, with the 3px print bar (9.2), so staff see at a glance what came from Setup.
- **Desk version:** same component in `t-body` instead of `t-body-l`, with an aside in cols 10–12 holding the filing type's fee note (`feeNote`) and the rehearsal or live chip, sticky at L+. Button: "Send the proof to my client".
- **Widths:** the client sheet is 720px; on a phone, every field is full width except the short ones (ZIP, state, dates), which keep their widths so their brevity is visible.

### 10.6 The filing desk `/p/<slug>`

Firm's theme throughout (Section 11). Header: the firm's logo plate and name at left, the nav ("Filings", "New filing", "Ready to pay", "Client links", "Signatures", "Setup", "Billing"), and at right the user's email (link to password), "Log out", and "with CoFile". The 4px band in the firm's color sits above the header. The beta band (neutral wording) above that.

**Filings (home).** "Filings" H1 with "New filing" (firm primary) at the right edge. Notices directly under the title, in this order: approved filings ready to pay, with "Pay and file" (a neutral notice in print color, not amber: paying is the next step, not a hold); filings that need someone to act; the subscription notice "Real filings need an active subscription; rehearsals are free." with "Subscribe". Then the table:

| Filing | Type | Status | Started |
|---|---|---|---|
| Two Sisters Bakery LLC  ‖ Rehearsal | New Jersey LLC formation | ○ Waiting for approval | Nov 26 |

Rows that need action sort first and are set in 65 Medium. The Rehearsal chip replaces today's "Test" badge. Empty state: "Your desk is clear. Start a filing (it can be a free rehearsal), or send a client a link with your logo on it." with "New filing" and "Send a client a link".

**New filing.** Step one: "New filing", "Which state is the business in?", the rehearsal sentence with its "What we file" link, the request channels (email address, text, WhatsApp, Slack `/file`) as a small definition list. The three states are **three full-width rows**, not cards: state name in `t-heading`, the count ("2 filing types, plus the federal EIN") in ink-2, a chevron at the right, 80px tall, hairlines between. Step two: "All states" back link, "{State}: what are you filing?", the paragraph, then the filing types as rows: title in `t-sub` 75, the Live or Rehearsal chip directly after the title, summary in ink-2, fee note in `t-small`. "Your pages for clients" below as a sheet listing each permanent page URL in mono with a "Copy link" button and the widget snippet in a code block. Step three is the form (10.5).

**Filing detail.** Cols 2–8 for the record, cols 10–12 for the aside.

```
 ← Filings
 Two Sisters Bakery LLC                       [○ Waiting for approval] [‖ Rehearsal]
 New Jersey LLC formation · started Nov 26, 2026, 10:42 AM by ana@… (client link)
 ┌ notice ────────────────────────────────────────────────────────────┐
 │ The approver has a link to check exactly what will be filed …      │
 └────────────────────────────────────────────────────────────────────┘
 10:42  ●──  Received                                    aside:
 10:44  ●──  Getting the state's review page             Link to the proof
 10:51  ○══  Waiting for approval                        We emailed this link to …
        ◌    Approved                                    https://api.cofile.app/…  [Copy]
        ◌    Filing now                                  Documents
        ◌    Submitted to the state                      –
        ◌    Accepted by the state                       Save to Google Docs
        ◌    Completed
 ▸ Progress on the state site (rehearsal, running)
```

The timeline (9.6) is the spine of the page, from draft to proof to filed. Documents list with pictograms and the document kind in ink-2; the EIN in mono 75 Bold when issued ("EIN: 12-3456789"). "Progress on the state site" is a fold containing the run's steps as a numbered mono log with times, the same visual language as the home page's rehearsal log. Stop notices (`lastError`) in stop tint directly under the header. "Approved and ready to pay…" as a neutral notice with "Pay and file". Missing information: the "Still needed" form inline, with "Send the answers".

**Setup.** "Set up your account" / "You're set up". The steps as a numbered list of rows (1 Your firm, 2 Branding, 3 Payment), each with its description and its button; a done step shows the go disc in place of its number and its button reads "Change". Registered agents (optional) as a fourth row set apart by a hairline. Each step page is a reading layout (cols 2–8) with "Step 2 of 3" in `t-ref`.

**Branding** is the most important setup page, because it is where the theming system meets the firm. Left (cols 2–6): "Your web address", "Name your clients see", Logo, "Main color", "Second color", Font, "Support email shown to clients", "Save and continue". Right (cols 8–12, sticky): **"Preview of a client's page"**, showing three live miniatures one above the other, at true size: the intake header, the proof's top with its decisive button, and the email header, each in light and dark (a two-up). Under each color field, the computed result: the swatch the firm chose, an arrow, and the swatch the system will use for print and for buttons, with their contrast ratios as numbers (for example `4.9 : 1`). When the system changes a color, the firm sees both and the reason is numeric. (The labels for this report are in Appendix B.)

**Registered agents, Payments.** Reading layouts; per-state rows for agents ("Ours: Registered Agents, Inc., through CoFile ($59 a year per business, billed to your firm)" appears here in the desk only, never publicly); the payment routing form with the two radios ("One card for every filing", "A card for each type of filing") and the card selects, Basis Theory card fields styled to match 9.2 through their style API.

**Client links.** Two parts: "Send a client a link" (Filing select, "Who it's for (shown to you and the client)", "Make link", then the link in mono with "Copy link" and "Email it from your mail app"), and "Links you sent" as a table (Filing, label, Status with chips "Waiting for the client" ○ or "Turned off", and "Used: open the filing" or "Turn off").

**From email `/from-email/<id>`.** "Filing request". Two columns at L+: left (cols 2–6) "Your message" set as a quotation (as on the home page, 10.1 section 05), the phrases that were read underlined and numbered; right (cols 8–12) "This looks like a request for: {type}", the draft's filled lines with the same numbers, and "Open the filled-in form". The failure messages ("We couldn't find answers in your message for this form.", "We couldn't tell which filing this is.") as neutral notices with the "Choose the filing" select. Deleted messages: the 30-day sentence in place of the quotation.

**Signatures.** "Saved signatures", the paragraph, the table (Signer, Last used, Remove), "No saved signatures yet." and "Add a signature" with the signature pad (9.3) and the consent as an authorization row.

**Ready to pay.** "Ready to pay" and its paragraph. Then one block per card: the card's label and "ending 4242" in 65, the filings waiting for it as a short list with amounts right-aligned and a total line (accounting rules), then the security code field (mono 24px, 6ch wide, `inputmode="numeric"`, `autocomplete="cc-csc"`) and "Pay and file" (ink: paying is irreversible, so it is ink on firm pages too). Confirmation as the toast "Thanks. Filings for this card pay with it for the next hour."

**Billing.** "Billing": the plan and its price (shown here only), the Stripe portal link, and the table of businesses with our registered agent and their renewal dates. Notices ("Your plan is changing…", "Billing couldn't be loaded. Try again shortly.") as neutral and stop notices.

**Password, signed out.** The 480px sheet pattern (10.3), in the firm's theme. The signed-out page keeps the firm's look so the firm's staff know where they are.

### 10.7 Permanent branded service pages `/<firm>/<service>`

The firm's public page for one filing type, for example `cofile.app/bestaccounting/llc-filing-new-york`. It is the intake form (10.5) with three differences: no link label in the H1; the summary followed by the firm-page sentence ("After you send this, we'll email you a link to check and approve exactly what will be filed, with a picture of the state's own review page where possible. Nothing is filed or paid until it's approved.", or the IRS version for EIN filings); and a page head suitable for search and sharing: `<title>` from `publicTitle()`, an Open Graph image generated per firm (Section 13.3). These pages are permanent addresses a firm prints on its letterhead, so they never move and never change layout between releases.

### 10.8 The enterprise dashboard `/dashboard`

CoFile's own theme, denser (`t-body`, 40 to 48px rows), because its readers are operators and developers. Header nav: "Overview", "Filings", "Ready to pay", "Firms", "API keys", "Webhooks", "Setup", "Team", "Billing" (or "Sign-ups" for the platform tenant), "Docs".

- **Overview.** Three figures across cols 1–12 ("Filings", "Webhook deliveries", "API keys") in `t-title` tabular with their label above in `t-small`; "Manage keys" link. Then "By status", "By state", "By month" as **bar tables** (7.3) side by side at L, stacked on mobile. The setup notice ("Your account settings haven't been set up by the platform yet…") as a stop notice at the top when it applies.
- **Filings.** The filings table with filters as a single row of selects (status, state, firm) above it; no chart. Filing detail as in the desk (10.6) plus the request JSON in a fold and the webhook deliveries for that filing.
- **Firms and firm detail.** Table of firms (name, filings, last filing, theme swatch). Firm detail shows the firm's branding preview (the same three miniatures as the desk's branding page), its settings, its filings.
- **API keys.** Table (name, prefix in mono `cofile_1a2b3c4d`, created, "Last used", "Revoke"). A new key appears once in a secret box: Ground background, 1px dashed print border, the key in mono 16px with a "Copy" button, and the note that it is shown once. Older `kfe_` keys are listed in the same table without distinction.
- **Webhooks.** Endpoints table; the deliveries log as a mono ledger with HTTP status codes; failed deliveries carry the stop symbol, successful ones nothing (absence of a symbol is the normal case).
- **Setup.** "Payment methods" (the Basis Theory paragraph), "State portal logins" as a table with one row per portal (NY DOS, NYS-100, NJ, IRS, FL), columns "Portal", "Pays by", and "Disconnect" (destructive, dialog confirm), "Not needed" rows in ink-3; "Who's named on your filings", "Your registered agent in each state", "Defaults per portal", each a numbered reading-layout form.
- **Ready to pay, Billing, Team, Password.** As in the desk, in CoFile's theme; Team is a table with roles and an invite form.
- **Platform tenant only: Sign-ups and Enterprise requests.** Two queue tables ("Waiting for approval", "Decided"; "Enterprise requests"), each row with "Approve" (ink, small) and "Turn down" / "Decline" (destructive). The explanatory sentences above each table unchanged.
- **Drift reviews (platform staff).** A comparison layout: the approved snapshot of the state's screen at left, the new screen at right, both at the same scale on the grid (cols 1–6 and 7–12), with differences outlined in stop color and listed beneath as numbered lines. Decisions as three buttons. This is where "stop and ask" is answered, so it gets the same care as the proof.

### 10.9 White-label surfaces

**`/e/<tenant>/<firm>/<service>`** is the service page (10.7) in the subscriber's theme, with no "with CoFile" and the subscriber named as the filing company. The beta band appears in its neutral wording.

**`/embed/...` and `embed.js`.** The form without header, band, beta notice or footer: the host page supplies the brand. The frame grows with the form (the existing `cofile:height` message). Layout responds to the **frame's** width with container queries: under 480px one column; 480 to 720px paired fields; never wider than 720px, centered if the frame is wider. Padding 16px. Firm print color and font apply. The rehearsal notice still appears when the type is not live: a widget on a firm's site must not hide that nothing will be filed. The closing line "Filed with CoFile" in `t-small` ink-3 at the end (see Appendix B).

### 10.10 Developer docs `/docs`, `/docs/reference`, and the machine-readable files

The docs are read by a different person, but they are set in the same system. Engineers like typography that respects them as much as CPAs do.

```
 XL
 cols 1–2 nav        cols 3–8 prose (66ch)                      cols 9–12 examples
 Overview            POST /v1/filings                           curl / JSON, mono
 Guides              Create a filing. …                         ┌───────────────────────┐
  Authentication     Body                                       │ {                     │
  Filings and the …  ┌──────────────┬────────┬───────────────┐  │   "dryRun": true,     │
  Filing types, …    │ dryRun       │ bool   │ …             │  │   …                   │
  Approvals          └──────────────┴────────┴───────────────┘  │ }                     │
  Webhooks           Responses                                  └───────────────────────┘
  Errors             201 · 402 · 422
  Saved signatures …
  White-label firm …
 Reference
  Endpoints
  OpenAPI (JSON)
```

- **Nav** (cols 1–2, sticky): the existing structure ("Overview", "Guides" with the eight guides, "Reference", "Endpoints", "OpenAPI (JSON)"), section heads in `t-small` 65 ink-2 (not uppercase). Current page with a 2px ink bar at its left. Mobile: the nav becomes a select-style button at the top of the page opening the full list in a sheet.
- **Prose** cols 3–8 in `t-body` (16/24), headings `t-heading`, inline code `t-mono-s` on Ground.
- **Examples** cols 9–12 at XL, sticky per endpoint; below L they follow the prose.
- **Reference:** the 25 endpoints each opened by a 1px ink rule. The method and path as one line in Formular Mono 65 Medium 16px: `POST /v1/filings`. **Methods are not color-coded.** Today GET is green and DELETE red, which spends the status colors on HTTP verbs; a DELETE is not a stop. Method in ink, path in ink, path parameters (`:id`) in print color. Parameter tables: name (mono), type (mono, ink-2), required, description. Response codes as a row of mono codes.
- **`/openapi.json`, `/llms.txt`, `/docs.md`:** not pages, but still designed: `docs.md` follows one heading hierarchy (one `#`, then `##` per guide, `###` per endpoint), wraps at 100 characters, uses only tables and fenced code, and opens with a contents list. A "Download" link for `docs.md` and links to the other two sit at the top of `/docs` as a three-item list in mono. Served with correct types (`text/markdown`, `text/plain`, `application/json`).

### 10.11 Emails

Sent through Resend; written as components (React Email) so the HTML and plain-text versions are generated from one source.

- **Frame:** 600px maximum, single column, Ground outside, paper sheet inside with 32px padding (20px on phones). Client emails carry the firm's header (logo plate, firm name, 4px band as a table cell of the firm color) and "with CoFile" in the footer line for partner firms; account emails carry the CoFile lockup.
- **Type:** Formular Sans static where clients support web fonts, falling back to Helvetica and Arial; body 17/26, headings 24/32 Bold. The subject line is repeated as the email's H1.
- **One button per email**, ink, 48px, bulletproof (table-based), with the link also written out underneath in mono for clients that strip buttons. On client emails the button is ink, never the firm color, because the action (opening the proof) leads to an irreversible decision.
- **Dark mode:** `color-scheme: light dark` with explicit dark styles; logos on a white plate when they have no dark version.

| Email | Subject (locked) | Button |
|---|---|---|
| Approval request | Your proof is ready to approve: {title} | Open your proof |
| Security code needed | Card security code needed: {title} | Enter security code (to Ready to pay) |
| Missing information | More information needed: {title} | none today (Appendix B) |
| Changes requested | Changes requested: {title} | none |
| Completed | Completed: {title} | none |
| Rejected | Rejected by the state: {title} | none |
| Staff notices | Choose a name, Review before submit, Site changed — review needed, Portal bot check, Failed, Blocked, Checking whether the state received | as each provides |
| Sign-up verification | Confirm your email for CoFile | Confirm my email |
| Password reset | Reset your password | the reset link |
| Account ready | Your CoFile account is ready / Your partner account is open | Log in |
| Invitation | You're invited to {firm}'s filing portal | the join link |

The rehearsal line ("Rehearsal: nothing will be filed or paid, even if you approve.") opens the approval email in a hold-tint block with the hold symbol, above everything else. "Don't forward this email: anyone with the link can open your proof." sits directly above the button, in 65 Medium. The brief also lists filing submitted, documents back and EIN issued emails; they use the same status template with the filing's timeline drawn as a list of stages, and need their copy confirmed (Appendix B).

### 10.12 New surfaces I propose

1. **The filing record, printable.** One page per filing that holds "What was approved, what was filed and what the state sent back, in one place": the proof as approved (with its line numbers and approval time), the run log, and the documents list. A print stylesheet for US Letter. It is what a CPA puts in the client file.
2. **A permanent `/#coverage` anchor and a coverage feed** (`/coverage.json`) so firms and agents can check which types are live without reading the page. The page and the feed are rendered from the same source as the table.

---

## 11. The white-label theming system

### 11.1 The principle

A firm changes the print of the form, never the ink. Its logo, name, color and font say *whose form this is*. Everything that says *what the client is agreeing to* and *what state the filing is in* is fixed by the system and identical on every firm's pages, so that a client who has approved one proof has learned to read all of them.

### 11.2 What a firm controls, and where it goes

| Firm setting (Setup, Branding) | Token(s) | Applied to | Never applied to |
|---|---|---|---|
| Logo | logo plate | Header of the desk, intake, service pages, the proof, client emails | Inside the form, near buttons, as a watermark |
| "Name your clients see" | firm name | Header (beside or instead of the logo), "Send to {firm}", the definition of "the filing company", emails | The proof's H1 |
| "Main color" | `--band`, `--print`, `--print-tint`, `--firm-button`, `--firm-button-text`, `--firm-button-hover` | The 4px band; labels, section rules, field boxes, line and section numbers (as print); forward buttons ("Send to {firm}", "Send the proof to my client", "Make link", "Save and continue") | Status symbols and chips; the decisive button on the proof; "Pay and file"; notices; links; body text |
| "Second color" | `--firm-mark` | The highlight underlay of values on the proof and the correspondence highlight | Text, links, buttons, rules |
| Font | `--firm-font` | The firm's name; H1 and H2 of the intake and service pages; the desk's page titles | Field labels, values, help, tables, amounts, the proof's details and declaration, buttons, notices |
| Support email | text | "Questions? Email…", the proof's "Questions:" line, client emails' reply-to | Nothing else |
| Web address (slug) | URL | `/<firm>/<service>`, `/p/<slug>` | Nothing else |

Today "Second color" drives links. In this system links are always ink, underlined. A link's job is to be recognized as a link by every reader on every firm's page; a firm's pale teal underline cannot be relied on to do that.

### 11.3 The algorithm

One function, `firmTheme(primary, secondary, font, logo)`, shared by the web app and the engine (today `brandStyle()` in `web/lib/firm.ts` and `brandedTop()` in `src/approvals/render.ts` each do part of this, differently). It works in OKLCH so that darkening keeps the firm's hue.

**Step 1: classify the main color.** Convert to OKLCH (L, C, h).

- **Protected zone** if C ≥ 0.09 and h is between 10° and 105° (reds, oranges, ambers, yellows, saturated browns). These hues collide with stop and hold. A page printed in red reads as an error page; a page printed in amber reads as a rehearsal.
- **Neutral** if C < 0.03 (grays, near-black). Treated as normal.
- **Normal** otherwise (greens, teals, blues, purples, pinks).

Green is deliberately not protected: many accounting firms are green, a green-printed form does not read as "approved" without the disc and the word, and green forward buttons agree with the existing meaning of green.

**Step 2: print color.**

- Normal: hold h and C (C capped at 0.20), lower L in steps of 0.01 until contrast against `--paper` is at least **4.5:1** (labels are 14 to 16px Medium). If the chosen color already passes, use it unchanged. `--print-tint` = the print color at L 0.96, C × 0.25.
- Protected: `--print` = neutral print `#3E4451` (9.8:1), `--print-tint` = `#EEEFF2`. The firm's color is still used for the band, and for the firm's typed name in the header when it reaches 4.5:1, so the brand remains on the page.
- Dark mode: raise L from the light print value until contrast against dark paper `#1A1A19` is at least 4.5:1, capping L at 0.86 so the color does not become white. Protected colors use `#AEB4C2`.

**Step 3: band.** `--band` = the main color exactly as chosen, if its contrast against paper is at least 1.5:1 (it must be visible as a band); otherwise the print color from step 2. The band is never adjusted for hue; it is the firm's own color.

**Step 4: forward button.**

1. Fill = the main color as chosen (protected colors: fill = ink, and stop here).
2. Text: white `#FFFFFF` if white on the fill is at least 4.5:1; otherwise ink `#141414` if ink on the fill is at least 4.5:1; otherwise darken the fill (as in step 2) until white passes.
3. If the fill's contrast against paper is below 3:1 (a pale button would disappear), add a 1px ink border.
4. Hover: fill L − 0.06 (light mode), L + 0.06 (dark mode); text recomputed.
5. Dark mode: repeat against dark paper.

**Step 5: highlight.** `--firm-mark` = the second color mixed with paper (in OKLab) starting at 16% and decreasing until ink on it is at least 12:1, so that the highlighted value stays as readable as any other. If the second color is in the protected zone, or missing, `--firm-mark` = `--print-tint`.

**Step 6: font.** Presets load as today. An uploaded font (WOFF2, OTF or TTF, 600 KB or smaller, as now) is checked on upload:

- Glyph coverage: Basic Latin and Latin-1 Supplement are required, plus ñ á é í ó ú ü ¿ ¡ for Spanish pages. Missing glyphs fall back to Formular per glyph through `unicode-range`; a font missing basic letters is refused.
- x-height ratio: if below 0.42 of the em, the font is used only for the firm's name and H1 (28px and up).
- Weights: if only one weight is supplied, headings use it as it is (`font-synthesis: none`); no faux bold.
- Metric-matched fallback: the system generates `size-adjust` and ascent overrides so the page does not jump when the font arrives.

**Step 7: logo.** On upload:

- Transparent margins are trimmed; the logo is stored at 2x of its display height.
- Display: height 40px (desktop), 32px (mobile), maximum width 200px (160px mobile). Very wide logos scale down to fit the width, but never below 24px tall; below that the typed name is used instead.
- A logo whose visible pixels have contrast below 1.6:1 against paper (white or very pale logos on transparency) is set on an ink plate `#141414` with 8px padding. In dark mode the reverse: dark logos are set on a paper plate `#FFFFFF`. A firm may upload a separate dark-mode logo, which then needs no plate.
- JPEG logos with opaque white backgrounds keep their rectangle and get a 1px hairline in dark mode, on a paper plate.

### 11.4 Examples

| Firm's main color | Class | Print (light) | Forward button | Notes |
|---|---|---|---|---|
| `#1F4FD1` cobalt | Normal | `#1F4FD1` (6.8:1, unchanged) | Fill `#1F4FD1`, white text | Passes as chosen |
| `#8EC5FF` pale sky | Normal | about `#2F6DB5` (5.3:1) | Fill `#8EC5FF`, ink text, 1px ink border | The band stays pale sky |
| `#0F766E` teal | Normal | `#0F766E` (5.5:1) | Fill `#0F766E`, white text | |
| `#E0201B` signal red | Protected | `#3E4451` | Ink | Band and logo plate keep the red |
| `#F4C430` saffron | Protected | `#3E4451` | Ink | Saffron is a hold hue; band keeps it |
| `#334155` slate | Neutral | `#334155` (10.4:1) | Fill `#334155`, white text | |

### 11.5 The ready colors

Today's nine swatches include an amber and a red. They are replaced by twelve colors that pass every step unchanged, so a firm that picks from the row never sees a correction: Form Blue `#2F4C80`, Navy `#1E3A6E`, Cobalt `#1F4FD1`, Indigo `#3B3C9E`, Teal `#0F6670`, Pine `#1E5E46`, Moss `#3F5F2A`, Plum `#6B2E6B`, Aubergine `#4A2350`, Mulberry `#7A2257`, Slate `#3E4451`, Graphite `#2B2B2B`. Any other color can still be typed or picked.

### 11.6 What a firm can never change

Type sizes; the grid; radii; the order and structure of the proof; the decisive button; status colors and symbols; the rehearsal notice and the beta notice; legal and consent text; "with CoFile" on partner pages; the line numbering. These are the parts every client must be able to rely on.

### 11.7 Verification

- On every save, the Branding page shows the result (10.6) with numeric contrast, so the firm sees what the system did.
- The build runs a **theme matrix** nightly: 200 colors sampled around the hue wheel at five lightnesses, 20 awkward logos (white on transparent, square, 8:1 wide, JPEG on white, tiny), and the ten font presets plus three uploaded fonts with missing glyphs, through the intake, the proof and the email, in light and dark. Each render is checked for contrast by computation (not by eye) and compared visually with the last run.

---

## 12. Accessibility, Spanish and dark mode

### 12.1 Accessibility

**Standard:** WCAG 2.2 AA on every surface; AAA contrast (7:1) for all text on the proof and client pages. Tested with VoiceOver on iOS Safari, TalkBack on Android Chrome, NVDA with Firefox and Chrome, and JAWS with Chrome (many CPA offices run Windows with JAWS or ZoomText), at 200% and 400% zoom, and with Windows high-contrast themes.

**Structure.** One H1 per page; landmarks for header, navigation (named "Sections" on the home page, "Docs" in the docs), main and footer; a skip link (Appendix B). Every page has its own title (the copy review found identical titles; the design keeps them distinct).

**The proof.** Each part is a `<section>` labelled by its heading. Filing details is a real `<table>` with row headers (`<th scope="row">`) whose text begins with the line number, so a screen-reader user hears "3, Main business address, 88 Grove St…" and can be told "line 3" on the telephone like anyone else. The fee table has a caption ("State fees") and the total row is marked up as a `<tfoot>`. The picture of the state's page carries the existing alt text, which correctly says every value is also listed as text; nothing appears only in the picture. The decisive button's accessible name is its visible label, with nothing added. The page works fully without JavaScript; the correspondence highlight and the image viewer are enhancements.

**Forms.** Labels bound to fields; help text and error text linked with `aria-describedby`; `aria-invalid` on errors; the error summary takes focus and is `role="alert"`; groups (`fieldset` with `legend`) for sections, repeated items and radio sets; authorizations are real checkboxes with their full sentences as labels; `autocomplete` tokens on every name, address, email, phone and one-time code field.

**Status.** Symbols are `aria-hidden`; the word carries the meaning. Status changes in the desk are announced through a polite live region. Color is never the only carrier, anywhere.

**Motion and time.** Reduced motion honored (8.4). No time limits on pages; deadlines (the proof link, the security code's hour) are stated as clock times with the time zone.

**Target size and spacing.** 48px targets, 8px minimum between adjacent targets; layouts survive WCAG 1.4.12 text-spacing overrides and reflow at 320 CSS px without horizontal scrolling (except docs code blocks).

**Forced colors.** Every button has a transparent 1px border so it remains outlined in Windows high contrast; symbols use `currentColor` where forced colors are active; the band is dropped and the firm's name remains.

**Older readers.** 18px body on every client page; no light weights; no gray text below 5:1; no text on images; no icon-only controls except the menu button, which has a visible focus state and a name.

### 12.2 Spanish

The client-facing surfaces (intake, the proof, decision and error pages, client emails) are designed for Spanish from the start; the desk, the dashboard and the docs follow later, if firms ask.

- **Switching:** a language switch in the client header beside "with CoFile", showing the two language names in their own language (Appendix B). A firm can also choose the language when making a client link, so the email and form arrive in Spanish.
- **Translation:** the locked English copy is translated by legal translators into US Spanish, then reviewed by counsel for every consent, authorization and declaration. The state receives English; values on the proof stay exactly as they will be filed (often the state's capitals), with `lang="en"` on them so screen readers pronounce "TWO SISTERS BAKERY LLC" correctly inside a Spanish page.
- **Statements under oath:** each authorization shows the Spanish text with the English original directly beneath it in `t-small` ink-2, because the English is what is filed. (Wording of the label for the English original in Appendix B.)
- **Length:** Spanish runs 20 to 30% longer. Nothing truncates; buttons wrap. The decisive button is tested at 360px with the Spanish label at three lines (88px tall).
- **Formats:** dates written out as Spanish does ("3 de diciembre de 2026, 5:00 p. m., hora del Este"); amounts keep US notation (`$103.50`), which is also the convention of Spanish in the United States; tabular figures unchanged.
- **Typography:** Formular's ¿ and ¡ are drawn to sit on the baseline; hyphenation on for Spanish body text, off for labels and values; `lang="es"` on the document.

### 12.3 Dark mode

- All tokens have dark values (4.2); dark mode follows the system on public and client pages. In the desk and dashboard, the account menu offers a choice (Appendix B).
- **The proof follows dark mode**, with the same 7:1 rule; the print stylesheet is always light.
- **Evidence is never altered.** Screenshots of the state's pages are shown exactly as captured, never inverted or dimmed, framed in a 1px hairline. They will be bright in dark mode, and that is correct: it is a picture of what the state shows.
- The signature pad stays paper white.
- Logos get plates (11.3); firm colors are recomputed for dark paper.
- The focus ring inverts to `#EDEDE8` with a `#1A1A19` halo.
- Emails declare `color-scheme: light dark` and provide explicit dark styles.

---

## 13. Production

### 13.1 Tools and stack

- **Design:** Figma, with variables for color (modes: Light, Dark, and four sample firm themes produced by the algorithm), number variables for the spacing scale and type sizes, and layout grids for each breakpoint. Code Connect mappings from each Figma component to its React component.
- **Tokens:** one `tokens.json` in the W3C Design Tokens format is the source. Style Dictionary builds `tokens.css` (custom properties for light, dark and the structure of firm overrides), a TypeScript module for the app and the engine, and the email constants.
- **Web:** the existing Next.js app. Today's `globals.css` and `landing.css` (two parallel token sets, `.lp` scoping, manila and serif) are replaced by `tokens.css` plus a small component library (`@cofile/ui`): Button, Field, Choice, Fold, SameAs, SignaturePad, StatusChip, CoverageDisc, Timeline, Table, Notice, Toast, Dialog, Sheet, ProofSheet, LineRef, FirmHeader, WithCoFile. CSS Modules; no utility framework is needed for a system this small.
- **The engine's proof** (`src/approvals/render.ts`, server-rendered HTML at api.cofile.app) uses the same `tokens.css` and the same theme function, inlined as critical CSS under 14 KB, with fonts from the same origin. The proof must render and submit without JavaScript; a 6 KB script adds the correspondence highlight and the image viewer.
- **Theme function:** `@cofile/theme`, a pure TypeScript package used by both the web app and the engine, with OKLCH conversion, the seven steps of 11.3, and unit tests on the fixtures of 11.4 and the nightly matrix.
- **Fonts:** self-hosted WOFF2, preloaded variable Sans (Latin core), `font-display: swap` with metric-matched fallbacks so nothing shifts.
- **Emails:** React Email components rendered to HTML and text, sent through Resend, checked in an email-client rendering service across Gmail (web, iOS, Android), Apple Mail, Outlook (Windows, web) in light and dark.
- **Quality:** Storybook showing every component in every state, light and dark, at XS and XL; visual regression on every pull request; axe checks in CI; contrast assertions computed from tokens (not from screenshots); Playwright journeys for the proof on a 360px viewport with VoiceOver and TalkBack scripts run by people each release.

### 13.2 Design-system files

| File | Contents |
|---|---|
| `CoFile Foundations.fig` | Color variables and modes, type styles, grids, spacing, rules, symbols |
| `CoFile Components.fig` | Every component of Section 9 with all states and variants, light and dark |
| `CoFile Surfaces.fig` | Every page of Section 10 at XS, M and XL, light and dark |
| `CoFile Firm Theming.fig` | The algorithm's examples, the twelve ready colors, logo plate cases, the matrix sample |
| `CoFile Pictograms.fig` | 32 pictograms, 12 status symbols, 5 coverage discs, construction grids |
| `CoFile Email.fig` | The email frame and each template |
| `tokens.json` | The source of truth |
| `brand/` | Wordmark and mark masters, usage sheet as a PDF |

### 13.3 Asset list

| Asset | Formats | Notes |
|---|---|---|
| Wordmark | SVG in Display, Text, Micro; ink, paper | 3.1 |
| Mark | SVG mono, two-ink, reversed | 3.2 |
| Lockups | SVG horizontal, all colors | 3.3 |
| Favicons | SVG (with dark-mode media query), ICO 16/32, PNG 180, 192, 512 | Mark only |
| Social images | 1200 × 630 templates for home, docs, and each firm's service page | The firm page image is generated: firm logo plate, firm name, filing type title, band in the firm's color; no CoFile mark |
| Status symbols | SVG sprite, 12 | 4.3 |
| Coverage discs | SVG, 5 | 9.10 |
| Pictograms | SVG sprite, 32 | 7.2 |
| Email images | PNG 2x of the lockup and the mark | Only images in emails |
| Fonts | WOFF2 variable and static; OTF for design | 5.1 |
| Sample data | The Two Sisters Bakery LLC fixture used by the hero, the specimen and Storybook | One fixture, so the specimen never contradicts itself |
| Annotated specimens | Generated from components at build | 7.3 |
| Print stylesheets | Proof, filing record, Terms, Privacy | US Letter |

### 13.4 What to commission

| What | From (by kind) | When |
|---|---|---|
| Formular Sans and Mono, wordmark lettering | Swiss independent type foundry with grotesk and signage work | Start in phase 0; ships in phase 4 |
| Pictograms and status symbols | Information-design studio with transit pictogram systems | Phase 1 |
| Spanish translation of client copy | Legal translators for US Spanish, plus a plain-language editor; counsel review of consents | Phase 2 |
| Accessibility audit | An audit firm whose testers include blind, low-vision and older users | End of phases 1 and 3 |
| Usability research | A research studio: sessions with CPA, payroll and title staff aged 45 to 70, and first-time founders approving a proof on their own phones, including Spanish-first founders | Phase 1 (the proof), phase 3 (the desk) |

### 13.5 Phases

The pages people sign go first.

| Phase | Weeks | Scope |
|---|---|---|
| 0. Foundations | 3 | Tokens, interim fonts (Univers Next), `@cofile/theme`, the 18 core components, Storybook, CI checks |
| 1. Client pages | 6 | The proof, decision and error pages, intake form, client links, service pages, embed, client emails. Research and audit |
| 2. Public site | 5 | Home (13 sections), sign-up, log in and account pages, legal pages, 404 and error. Spanish for client pages |
| 3. Filing desk and dashboard | 8 | All desk and dashboard pages, Branding with the contrast report, drift review, account emails. Research and audit |
| 4. Docs and type | 4 | Docs and reference, machine-readable files; the commissioned Formular replaces Univers Next across everything in one release |
| 5. Records | 3 | Printable filing record, coverage feed, print stylesheets |

---

## 14. Appendix

### A. What I would push back on in the current site

1. **Ticks on marketing bullets.** Every list on the home page starts with a green tick. A tick on a form means *this is done and correct*. Spent on "An embeddable widget for your own pages" it means nothing, and by the time the client reaches the one place where a mark matters, the mark is worn out. Number the lists; keep green for approved and live.
2. **Paper and manila as decoration.** Cream ground, manila tint, a folder-tab mark and a rotated "stamp" (`.stamp`, `rotate(-4deg)`) imitate an office. The product is not old paper; it is an accurate form. Real paper is white, and white gives older readers the contrast they need.
3. **Three typefaces.** A serif for headlines, a sans, a mono. The headlines do not need a second voice, and the switch costs a font download and a unity.
4. **Mono for entered values and amounts.** On the sample proof the client's name, members and address are in mono, as though a machine wrote them. They are the client's words; they belong in the reading face. Amounts need tabular figures and decimal alignment, which a good sans provides, not a typewriter face.
5. **The declaration at the top of the proof.** The consent paragraph is printed above everything, then the reader scrolls through the picture, the details and the fees, and finds the button at the bottom far from what it commits them to. The declaration belongs directly above the signature.
6. **The firm's color on the approve button.** `brandedTop()` paints the approve button in the firm's primary color. Across thousands of firms the decisive button would be thousands of colors, some pale with white text, some red. The button that commits a client should look the same everywhere.
7. **Amber for waiting.** `StatusBadge` gives "Waiting for approval", "Needs information" and "On hold" the same amber as a rehearsal. Amber should mean the planned hold, and nothing else.
8. **HTTP methods in status colors.** In the docs GET is green and DELETE red. A DELETE is not a stop.
9. **Coverage chips that look alike.** "Rehearsed to the payment screen" is amber, the other three stages are the same plain gray. The four stages are an order, and the design should show the order.
10. **Bare error pages on the proof.** Expired and used links return an unstyled `<p>`, without the firm's name, at the moment a client is most likely to be confused.
11. **No navigation on phones.** The public header hides its section links below 860px with nothing in their place.
12. **The second color for links.** A firm's pale second color decides whether links can be seen. Links should be ink and underlined.
13. **Two token systems.** `globals.css` and `landing.css` define the same palette twice under different names, and the engine's proof hard-codes a third copy of the hex values. One source, or the three will drift.
14. **Rounded corners and shadows on cards.** Small, but they make a legal page look like an app store. Rules separate things better than shadows, and corners do not need softening.

**My biggest pushback:** the site spends its strongest signals (the green tick, the colored button) on marketing bullets and on each firm's brand color, so by the time a client reaches the one button that cannot be undone, those signals no longer mean anything.

### B. Copy notes

The design above uses the copy as it is. These are the words I would raise with the copy owner. None of them is used in the design.

**Inconsistencies with the agreed terms**

1. **"Signing in…"** is the busy label of the log in button (`AuthForms.tsx`). The rule is "log in", so "Logging in…".
2. **"You're not signed in to this filing desk"** on `/p/<slug>/signed-out`: "logged in".
3. **"You're invited to {firm}'s filing portal"** (invitation subject): the partner area is now the "filing desk".
4. **"Test"** badge in the desk's filings list, **"test run"** in "Progress on the state site", and **"never on a preview or test run"** on the Signatures page: these should say "rehearsal".
5. **"Filed with CoFile"** at the end of the widget, where every other client surface says "with CoFile". On a rehearsal page "Filed" is also not true.
6. **The proof's H1** is built from engine values ("NJ formation: TWO SISTERS BAKERY LLC"). The filing type's own title ("New Jersey LLC formation") would match the email subject and the intake page.
7. **"Fields marked * are required."** The forms already mark optional questions with "(optional)". One convention is enough; I would keep "(optional)" and drop the asterisk and its sentence, which also removes an unexplained symbol for screen-reader users.
8. **"Your filing company"** in `nextStep()` texts shown to firm staff on their own desk ("Your filing company will offer alternatives") reads oddly when the reader is the firm.

**Words the design needs that the copy does not have**

9. **Headings for approval error pages.** The design sets the sentence itself as the heading until there is copy; a short heading per case would be better.
10. **A skip link** ("Skip to content" or similar).
11. **The language switch** on client pages: the two language names, and the label for "the English original" under each Spanish authorization.
12. **The contrast report** on the Branding page: labels for "what you chose", "what clients will see", and a one-line reason when a color is adjusted.
13. **Line numbers for screen readers.** Whether the number should be read with a word ("line 3") or bare.
14. **A reference to the state's screen** beside each section of the intake form (for example "Screen 7 of 13"), which the engine already knows from each field's reference; useful for staff who know the state's site.
15. **Appearance choice** in the desk and dashboard account menu (light, dark, system).
16. **Logo includes our name:** a setting for firms whose logo already contains their name, so the name is not printed twice.
17. **A short explanation behind "with CoFile"** for a client who wonders what it means, reached from the phrase.
18. **Emails the brief lists but the code does not name:** filing submitted, documents back and EIN issued need subjects and bodies; the missing-information email has no link or button, and a client who is asked for details should be told where to give them.
19. **Coverage legend title**, if one is wanted above the five discs; the design works without one.
