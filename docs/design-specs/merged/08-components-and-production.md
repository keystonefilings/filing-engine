# CoFile merged design, part 8: components, craft notes, production and what to strip (sections 11 to 14)

Merge round, Nov 26, 2026. This part writes sections 11 to 14 of the merged spec on the foundation
in `01-foundation.md`, which is binding: its tokens (4.9), type scale (5.2, 5.3), spacing (6.3),
corners and depth (6.4), motion tokens (D2) and example data (D4) are used here as they stand and
are not repeated in full. Section numbers such as "3.4" or "D2" point to the foundation. The few
new splits this part settled are in `DECISIONS.md`.

Credits in parentheses name the designer an idea comes from. The library leans on Hal for the
shapes (chamfered buttons and chips, the price card, dot leaders, the proof), on Marcus and Priya
for states, fields, tables and the one-primary rule, and on whoever did a given component best.

The copy is locked. Every label quoted here is the product's or the round 3 copy's own wording
(`web/app/page.tsx`, `web/components/landing/Visuals.tsx`, `web/lib/status.ts`,
`web/lib/coverage.ts`, the components in `web/components/`). Words this design needs that don't
exist are marked `[copy needed]` and listed at the end of section 11.

---

## 11. Components

### 11.0 How the library works

**One library, three registers, two inks.** Every component is built once and serves the three
registers of 2.4. It reads a small **semantic token layer** that the register sets; the shapes,
sizes and states never change between registers, only the inks (Hal's "two inks", Rosa's "two
skins", Jun's "two dresses").

| Semantic token | CoFile's pages (`.reg-cofile`) | The firm's pages and every picture of one (`.reg-firm`) | White label (`.reg-white`) |
|---|---|---|---|
| `--page` | Cotton `#FBFAF6` | `--firm-wash` (Bond `#F5F5F2` if no color) | the platform's wash, same formula |
| `--surface` | Sheet `#FFFFFF` (Night Card `#1F2230` in dark) | Sheet `#FFFFFF`, always | Sheet |
| `--text`, `--text-2` | Plate Ink, Graphite | Plate Ink, Graphite | Plate Ink, Graphite |
| `--line`, `--line-strong` | Rule `#DDD7CB`, Rule Strong `#8A8578` | the same | the same |
| `--action`, `--action-hover`, `--action-on` | Brass `#D9A84A`, Brass Deep `#C99A3F`, Plate Ink | `--firm-fill`, `--firm-fill-hover` (11.1), `--firm-on` | the platform's tokens, same derivation |
| `--link`, `--link-line` | Plate Ink, Brass Line `#A87A1E` | `--firm-ink`, `--firm-ink` | platform ink |
| `--focus`, `--focus-gap` | Plate Ink, `#FFFFFF` | `--firm-ink`, `#FFFFFF` | platform ink, `#FFFFFF` |
| `--select`, `--select-on`, `--select-fill` | Plate Ink, `#FFFFFF`, Brass Tint `#F6EBD0` | `--firm-fill`, `--firm-on`, `--firm-row` | platform equivalents |
| `--row` (hover, selected rows) | Cotton 2 `#F3F0E8` (Brass Tint for selected rows on the dashboard) | `--firm-row` | platform row |
| `--halo` (field focus halo) | Brass Tint at 100% | `--firm-tint` at 50% alpha (3.6) | platform tint at 50% |
| `--bullet` (list lozenge) | Brass Line | `--firm` | platform main color |

Brass is never a field color, never text on paper and never on a firm's page (4.8), so on CoFile's
pages checkboxes, radios and selected choices use Plate Ink, and Brass appears only as the one
button and a few fine lines.

**Paper pins its own inks.** A white sheet is white in both modes (4.6, D5), so the `.sheet` class
re-declares the light values of `--ink`, `--graphite`, `--rule`, `--rule-strong`, the status tones
and `color-scheme: light` inside itself. Anything placed on a sheet (fields, chips, tables, the
proof) therefore renders in light inks even when the page around it is Night. This one rule is what
keeps the proof, client pages and every product picture correct in dark mode.

**Control sizes.** Large 56 px (CoFile's pages, client pages, the proof, every primary on phones);
Medium 48 px (the desk, the dashboard, secondary actions); Small 40 px (desktop tables and dense
rows only, with the hit area padded to 48 px); Header 44 px. The proof's approve button is 60 px.
Tap targets are 48 × 48 px minimum with 8 px between neighbours (6.6).

**States, the same everywhere.** Each component below lists its own values; these rules hold for
all of them.

| State | Rule |
|---|---|
| **Default** | At rest. Nothing pulses, glows or animates on its own (D2). |
| **Hover** | Only ever adds: a deeper fill, a thicker underline, a hover row. Never the only way to learn something; every hover has a focus and a tap equivalent. Color changes in `--t-quick` 120 ms. Hover styles apply only under `@media (hover: hover)` so phones never stick in a hover state. |
| **Focus** | The focus ring of D5 on every focusable element: a 2 px `--focus-gap` ring hugging the element (`box-shadow: 0 0 0 2px var(--focus-gap)`), then a 2 px `--focus` outline at 2 px offset. Plate Ink on CoFile's pages, `--firm-ink` on firm pages, Night Ink with a Night gap on dark grounds. Instant, never animated, never removed. Buttons and links show it on `:focus-visible`; fields show it on any focus, because older users click into a field and then lose it (Greta). On a Brass or firm-filled button the white gap keeps the ring visible against the fill. |
| **Active (pressed)** | The deboss: the element sinks 1 px over 80 ms with `inset 0 1px 0 rgba(29,33,48,.18)`, and releases over 160 ms `--ease-settle` (D2). No ripples, no scale. |
| **Disabled** | Used only where the product already disables something ("Clear signature" before anything is drawn, "Not available yet" in the plan picker, a button while its form is sending). Submit buttons are never disabled to signal missing fields: the form submits and the errors explain (Marcus, Priya). The look is Hal's blind impression: Cotton 2 fill, Graphite text, 1 px Rule edge, no shadow, `cursor: not-allowed`, `aria-disabled="true"`, and the reason in words nearby wherever the product gives one (Elaine, Rosa). Never an opacity fade, which turns text illegible. |
| **Loading** | The product's own pending words ("Sending…", "Saving…", "Creating…", "Signing in…", "Confirming…"). Lists and tables show blank sheets and Rule bars at their final size pulsing 60% ↔ 100% over 1.6 s, no shimmer, no spinner unless a wait passes 3 s (D2). `aria-busy="true"` on the region. |
| **Error** | Madder `#9A2D2D` text plus the Problem glyph (a 12 × 4 px bar, 4.3), never color alone, never a warning triangle or a "!" disc. Errors sit next to what they are about and are announced (`role="alert"` for a form's summary, `aria-describedby` for a field). On red-family firms (H 15°–40°, C > 0.12, Northgate's Ember included) errors also carry a 2 px Madder left rule and a Plate Ink outline, so an error never looks like the firm's button (3.6). |
| **Picture** | Inside a marketing picture (D1), components render in their final, resting state and are inert: buttons and fields become `<span>`s with the same look, `cursor: default`, no hover, not focusable, so nobody tries to press a picture and keyboard users don't tab through a drawing (Elaine, Hal). Their words stay readable to screen readers. The one exception is the hero's waiting row, which is a real link to the proof section (D3, Marcus). |

### 11.1 Buttons

**Anatomy.**

```
 ╱‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾╲     corners: --chamfer (6 px bevel; 3 px round fallback)
│  Run a free rehearsal            │     label: Founders Grotesk Medium, button-l 18/24, +0.2%
 ╲________________________________╱      height 56 · side padding 28 · min width 120
  ←28→                        ←28→
```

Buttons are struck, not cut, so they take the plate's chamfer (6.4); everything paper around them is
square. A label never truncates: it wraps to two balanced lines and the button grows in height
(padding-block 16 px, line-height 24 px, so a two-line Large button is 80 px tall) before it ever
grows wider than its column (Hal, Marcus, Priya). No icons in buttons, except a 16 px drawn arrow
where a button leaves the site.

**Sizes.**

| Size | Height | Side padding | Label | Where |
|---|---|---|---|---|
| Proof | 60 px | 32 px | `button` 18/24 Medium (the firm's font 600 for presets on client pages, 3.7) | "Approve, and authorize submission and payment" only |
| Large | 56 px | 28 px | `button-l` 18/24 Medium | CoFile's pages, client pages, the proof's secondary, every primary on phones |
| Medium | 48 px | 24 px | `button-l` 18/24 Medium | The desk and dashboard, secondary actions, the sticky phone bar |
| Header | 44 px | 20 px | `button-s` 16/20 Medium | The header's "Run a free rehearsal" |
| Small | 40 px (48 px hit area) | 16 px | `button-s` 16/20 Medium | Desktop table rows, "Same as" choices, "Copy link", "Clear signature", "Log out" |

On phones every page's main action is full width at 56 px; two buttons stack, primary first, 12 px
apart (Elaine).

**Kinds and their states.**

| Kind | Default | Hover | Active | Focus | Disabled | Loading |
|---|---|---|---|---|---|---|
| **Primary, CoFile** (Brass) | Brass `#D9A84A` fill, Plate Ink label (7.4:1), no border | Brass Deep `#C99A3F` (6.2:1) | Brass Deep, debossed | Ring: Plate Ink on a white gap | Never: "Run a free rehearsal" is always available (Amara). Other Brass submits follow the blind look | Label swaps to the product's pending word, debossed look held, width locked |
| **Primary, firm** | `--firm-fill`, `--firm-on` label; on a light firm fill (3.6 b) a 1 px `--firm-ink` border | `--firm-fill-hover`: OKLCH L × 0.92, H and C fixed; if that drops `--firm-on` under 4.5:1, L rises by the same step instead (D2's "8% deeper") | debossed | Ring: `--firm-ink` on a white gap | Blind look | As CoFile's |
| **Outline** (secondary) | Transparent, 1 px Rule Strong `#8A8578` border (3.7:1), Plate Ink label | `--row` fill (Cotton 2, or `--firm-row`), border Plate Ink | debossed | Ring | Blind look | As above |
| **Outline on Night** | Transparent, 1 px `#6E7180`, Night Ink label | Night 2 fill, border Night Ink | debossed | Night Ink ring, Night gap | Blind look in dark values | As above |
| **Quiet** (text button) | No box; `--link` label with the link underline (11.2); 48 px tall hit area | Underline 2 px | Underline 2 px, text 1 px down | Ring around the text box | Graphite text, no underline | Pending word in place |
| **Danger** | Transparent, 1 px Madder border, Madder label, Small size. Only "Remove", "Turn off", "Revoke", "Remove logo" | Madder Tint fill | debossed | Ring | Blind look | Pending word |
| **Picture of a button** | Identical to the kind it shows, inert (11.0) | none | none | none | none | none |

On firm pages the Outline is neutral (Rule Strong and Plate Ink), not firm-colored, so the firm's
color stays on the one thing to do (Hal). Danger actions always confirm (11.17).

**Loading in detail.** On press the button keeps its pressed look, locks its current width (so a
shorter pending word doesn't make it jump), sets `aria-busy` and `aria-disabled`, and its label
swaps to the product's own pending word. If the wait passes 3 s, a 2 px line in the label's color
draws along the inside bottom edge from left to right over 1.2 s `--ease-sweep` and starts again:
a rule being drawn, the shop's own kind of progress (Jun, Elaine). With reduced motion the line
sits still at full width. When the action fails, the button returns to its default and the error
appears beside it or in the form's summary; buttons have no error state of their own.

**The one Brass button rule** (4.8, D5), as built:

1. **At most one Brass-filled button in any viewport-height** of any CoFile page. Everything beside
   it is Outline or Quiet. Two Brass buttons never sit side by side, and nothing else is ever
   filled with Brass.
2. **Each page declares its lead button**: the hero's "Run a free rehearsal" on the home page, the
   page head's on a page that has one, the form's submit on sign-up and log-in ("Create account",
   "Log in"). An `IntersectionObserver` watches it.
3. **The header's copy is Outline while the lead is in view** (1 px Plate Ink, Plate Ink label) and
   crossfades to Brass over 200 ms once the lead has fully left the viewport; it crossfades back
   when the lead returns. On pages with no lead in their first screen it is Brass from the start.
   On sign-up, where the header link points at the page itself, it stays Outline with
   `aria-current="page"`.
4. **The sticky phone bar follows the same rule** (6.7): it appears only when no other Brass button
   is in view, and hides while the Close's button, For platforms' inquiry form, the menu sheet or a
   focused field is on screen.
5. **The menu sheet** covers the page, so its full-width "Run a free rehearsal" is the only Brass on
   screen while it is open.
6. **On the Night band** Brass keeps its fill with Night `#14161E` text (8.3:1). The rehearsal band
   has no button of its own (the copy gives it none); the header or the sticky bar carries it there.
7. **Firm pages have no Brass at all.** Their rule is one primary per view, in `--firm-fill`.
8. **QA:** an automated check scrolls every CoFile page at 390, 834 and 1440 px in one-screen steps
   and fails if two Brass fills intersect the viewport at once.

### 11.2 Links

| Kind | Default | Hover | Active | Focus | Visited |
|---|---|---|---|---|---|
| **Inline**, CoFile's pages | Plate Ink text, 1 px Brass Line `#A87A1E` underline (3.8:1), `text-underline-offset: 3px`, `text-decoration-skip-ink: auto` | Underline 2 px, turns Plate Ink (120 ms) | Underline 2 px | Ring around the line box | No change (Hal) |
| **Inline**, firm pages | `--firm-ink` text and underline, 1 px, offset 3 px | 2 px | 2 px | `--firm-ink` ring | No change |
| **Inline**, dark grounds | Night Ink text, Brass underline (CoFile) or `--firm-ink-dark` (the dark desk chrome) | 2 px, Night Ink | 2 px | Night Ink ring | No change |
| **Arrow link** (section ends: "For firms", "How it works"; "See all plans" where it stands alone) | Founders Grotesk Medium 18/24, the link underline, then 8 px and a 16 px drawn arrow (1.5 px stroke, 45° head) | Arrow moves 3 px right (`--t-quick`), underline 2 px | as hover | Ring around text and arrow | No change |
| **Back link** ("← Filings", "← Other filings", "All states") | Founders Grotesk Medium 15/20, a 14 px drawn left arrow, `--link` with its underline, 24 px above the h1, 48 px hit height | Arrow moves 3 px left, underline 2 px | — | Ring | No change |
| **Nav link** (11.10) | No underline at rest: the header row is recognizably navigation | 1 px Rule Strong underline, 6 px below the baseline | — | Ring | — |

- **Links are always underlined** everywhere except the nav rows (4.8): older readers look for the
  underline (Hal, Priya). Links inside a sentence that is already Graphite, such as "See all plans"
  and "Security" under the prices or the email in the beta notice, take the inline style with the
  sentence's own text color and the Brass Line underline.
- **Links that open a new tab** (the Imprint on the proof and desk, the docs' Markdown and OpenAPI
  files) carry a 14 px external glyph after a thin space; nothing else opens a new tab.
- **The skip link** `[copy needed: "Skip to content"]` is the first focusable element on every page:
  hidden until focused, then an Outline Medium button on Sheet with `--e-menu`, 16 px from the top
  left. It is not Brass, so it never breaks the one Brass button rule (Hal, Elaine, Amara).
- **Email addresses** (`mailto:`) use the inline style; on phones they wrap at the @ if they must.

### 11.3 Fields and forms

**Anatomy of a field.**

```
NAICS code (optional)                          ← label: label 16/22 Founders Text Medium, Plate Ink;
                                                  "(optional)" in Graphite Regular
2 to 6 digits.                                 ← help: help 15/22 Graphite, max 64 characters a line,
                                                  between the label and the field so it is read
                                                  before typing (Elaine); 8 px above the field
┌────────────────────────────────────────────┐
│                                            │ ← field: 56 px, Sheet fill, 1 px Rule Strong border,
└────────────────────────────────────────────┘   --r-sheet 2 px, 16 px side padding, input 18/24
▬ <the product's message for this field>       ← error: 15/22 Founders Medium, Madder, after the
                                                  12 × 4 px bar glyph, 8 px below the field
```

| Part | Spec |
|---|---|
| **Field** | 56 px tall on CoFile's pages, client pages and the proof; 48 px on the desk and dashboard. Sheet `#FFFFFF` fill (on CoFile's own dark cards: Night `#14161E` fill, `#6E7180` border, Night Ink text). Text `input` 18/24, so iOS never zooms. Fields are paper, so their corners are `--r-sheet` (6.4), not chamfered |
| **Label** | Always visible, above the field, never a placeholder or a floating label (all ten). Required fields end with "*" in `--link` color (Plate Ink or `--firm-ink`); the product's "Fields marked * are required." sits once at the top of the form in `help` |
| **Placeholder** | None, except where the product already has one ("https://", "Leave empty for none"), in Graphite |
| **Hover** | Border Graphite `#555867` |
| **Focus** | Border 2 px `--focus`, drawn inside (an extra `inset 0 0 0 1px`) so nothing shifts, and the D5 ring, whose 2 px gap is filled with `--halo` instead of white, since a white gap would vanish on a white sheet: Brass Tint on CoFile's pages, `--firm-tint` at 50% on firm pages (3.6) |
| **Filled for you** | See below |
| **Error** | Border 2 px Madder (inset), message under the field as in the anatomy, `aria-invalid="true"`, `aria-describedby` pointing at the message. The label stays Plate Ink. On red-family firms the border is 2 px Plate Ink and a 3 px Madder bar runs inside the field's left edge (3.6) |
| **Disabled** | Cotton 2 fill, Rule border, Graphite text, `cursor: not-allowed` |
| **Read-only** | No box at all: label above, value below. Values that go to the state are in Founders Grotesk Mono 16/24 (`proof-value`), everything else in Founders Text (5.5) |
| **Loading** | Fields don't spin. A select whose options are loading shows a 60%-width Rule bar inside the field, pulsing (D2) |

**The other controls.**

| Control | Spec |
|---|---|
| **Select** | The field's box with a 12 px chevron drawn as two 1.5 px strokes, 16 px from the right. The native picker on every device. Long lists (fonts) may open a custom list with 48 px rows, each font's name set in that font (Elaine, Jun) |
| **Textarea** | Minimum 3 rows (120 px), resizes vertically only, `input` text. Where the product sets a maximum length, a counter in `help` tabular Graphite sits under the right end ("120 / 300", numerals only) (Marcus, Priya) |
| **Checkbox** | 24 px square, 1 px Rule Strong border, `--r-sheet`. Checked: `--select` fill with a 2 px `--select-on` tick, the one place a tick belongs, inside a box a person ticks (Hal). Indeterminate: a 10 × 2 px bar. The box and its whole label are one target, at least 48 px tall |
| **Radio** | 24 px circle, 1 px Rule Strong; checked: a 10 px `--select` dot. Same target rule |
| **Choice card** (radios and checkboxes with real choices: the registered agent "Your registered agent, or ours", payment mode, kind of firm, monthly or yearly billing, the state and filing-type pickers) | Sheet, 1 px Rule border, `--r-sheet`, 16 × 20 px padding, the control at the left, 56 px minimum. Hover: Rule Strong border. Selected: a 2 px `--select` border drawn inside and `--select-fill` behind (Marcus, Priya, Tomás). Error: as a field |
| **Declaration row** (Authorizations) | The legend "Authorizations" in `section`, its explanation in `help`, a 1 px Rule above the group, then each statement as a row: a 24 px checkbox and the statement in `body-client` 18/28 (17/26 on the desk), set in full and never truncated, 16 px between rows (Hal). The product's "Please confirm." sits after an unchecked statement in Madder with the bar glyph |
| **Code field** (one-time code, card security code) | One input, Founders Grotesk Mono 24/32, letter-spacing 0.3 em, centred, with one 1 px Rule Strong underline drawn per expected character (Hal's blind cells as hairlines), 56 px tall, as wide as its characters plus 32 px. `inputmode="numeric"`, `autocomplete="one-time-code"` where it applies; pasting fills it. The card vault's own secure field is styled through the vault's options to match exactly, so no seam shows (Jun, Amara) |
| **Plate field** (values to copy: client links, page addresses, API keys, the widget snippet's first line) | Cotton 2 fill, no border, `--r-sheet`, 48 px, the value in Founders Grotesk Mono 15/24 truncated in the middle so the start and end of a link stay visible (Marcus), the full value in `title` and selectable. The product's "Copy link" or "Copy" as a Small Outline button inside the right end. On copy the label swaps for 2 s to `[copy needed: a copy confirmation, e.g. "Copied"]`, announced politely (Hal) |
| **Logo drop zone** | 160 px tall, Cotton 2 fill, 1 px Rule Strong **solid** border (dashed means rehearsal, 4.4), the upload glyph and the product's help ("A PNG, JPEG or WebP picture. …") centred inside; the whole zone is the file button. Drag-over: 2 px `--focus` border and `--select-fill`. After upload: the processed logo shown on white exactly as it will appear, beside the original (3.5) |
| **Color field** | A 56 × 56 px swatch button (opens the system picker) and a 120 px hex input in Mono; the nine ready colors as 32 px squares with 48 px hit areas, the selected one ringed 2 px Plate Ink with a 2 px white gap, never a tick. Under them, the ink match line of 3.6 |
| **Signature pad** | A white sheet 3:1, at least 160 px tall (200 px on desktop), 1 px Rule Strong border; a 1 px Rule Strong baseline at 72% of its height with a 14 px "×" in Graphite at its left end; strokes in Signature Ink `#26336A`, 1.5 to 3 px with pressure or speed, smoothed. "Clear signature" is a Small Outline under its right end. Its accessible name is the product's "Signature pad: the signer draws their signature here with a mouse, finger or stylus." It stays white in dark mode (Hal, Elaine, Jun) |

**Filled for you.** A field the system filled, from the firm's saved answers or from a forwarded
message, carries a 3 px `--firm` edge inside its left border and a `--firm-row` fill until the
person edits it; then it looks like any other answer. A visually hidden line names the source
`[copy needed: "Filled in from your saved answers" / "Filled in from your message"]`. The page's
existing notice says it in words ("Filled in from your message “…”. Check every answer and add
what's missing."). The draft picture on the home page shows the same rows with their source tags
("from the text", "already filled"), so the picture and the product tell one story (Marcus, Dev;
decisions file).

**Form layout.**

- **Width.** Forms are at most 640 px (6.2), inside a 760 px sheet on client pages.
- **Sections** are the product's own fieldsets. Each opens with its legend in `section` (the firm's
  font 600 at 22/28 on client pages, Founders Medium on the desk), a 1 px Rule above it and 48 px
  of space; no box around the section (Hal). Fields are 24 px apart (20 px on phones), groups 48 px
  (40 px) (6.3).
- **The submit button** ("Create the proof" for the firm, "Send to <firm>" for a client) sits under
  the form's footnote, left-aligned at a 320 px minimum on desktop and full width on phones (Hal).
- **Form states:** submitting (the button loads, fields go `readonly`, nothing else moves); failed
  (the summary notice appears at the top, takes focus, and lists each problem as a link to its
  field, with the product's "Please fix these and submit again." as its first line); done (the
  product's own outcome: a Done notice beside the button, or the form replaced in place by its
  thank-you heading with the Firm Rule drawing under it, D2).

**Paired fields** (the product's `field-row`: `n2` two up at 2:1, `n3` three up at 2:1:1, used for
city, state and ZIP and similar).

```
DESKTOP                                                PHONE (≤ 599 px)
City                       State        ZIP code       City
[________________________] [________▾]  [_________]    [__________________________]
                                                       State            ZIP code
                                                       [__________▾]    [__________]
```

- Columns 16 px apart. The labels share one row: if one label wraps to two lines, the others keep
  their place and all three fields still line up on one edge (`align-items: end` on the label row).
- Each field's help and error stay under that field; an error under one field grows the row evenly
  so neighbours don't jump.
- Phones: a two-up row stacks; a three-up row puts the wide field on its own line and the two short
  ones side by side at 1:1 (Hal's 6/2/4, Rosa). Below 360 px everything stacks.

**Folded optional questions.** The product folds in two ways, and each gets its own look.

1. **A whole optional section** (a fieldset whose title ends "(optional)", such as "Registered agent
   (optional)" or "Other provisions (optional)"): a 64 px row with a 1 px Rule above it, the title
   in `section` with "(optional)" in Graphite Regular, and a 16 px chevron at the right that turns
   180° when open (240 ms height ease, D2). It is a native `details`/`summary`, so it works without
   scripts. It opens by itself when it already holds an answer or a problem (the product's rule),
   and its chevron is then already turned. When open, the fields follow with no box, and a 1 px Rule
   closes the section.
2. **"More options (optional)"** inside a section: a quieter 48 px row, the summary in Founders
   Medium 16/22 in `--link` color with "(optional)" in Graphite and a 12 px chevron before it. Its
   opened fields carry a 2 px `--line-strong` rule down their left, 16 px in, so they read as
   belonging to the summary (Rosa).

Both summaries take the focus ring around the whole row, and Enter or Space toggles them.

**"Same as" and "Same person as".** The product offers earlier addresses or people as one-tap
copies above an address or a person.

```
Same as   ╱ Main business address ╲  ╱ Organizer ╲        ← help 15/22 Graphite, then Small
          ╲_______________________╱  ╲___________╱          Outline choices, 8 px apart, wrapping
Street address
[__________________________________________________]
```

- The lead words in `help` Graphite, then each earlier entry as a Small Outline button (40 px, 48 px
  hit area, chamfered, Founders Medium 15/20), up to the six the product offers, wrapping to more
  lines on phones. 8 px above the first field of the group.
- On press the values are copied; the fields that changed flash `--firm-tint` to transparent over
  600 ms (Amara) and become "filled for you" until edited. Focus stays on the button. A polite live
  region announces it `[copy needed: a short spoken confirmation that the details were copied]`.
  With reduced motion, no flash.

**Repeating groups** (members, managers, officers). Each item is a card inside the form: Sheet,
1 px Rule border, `--r-sheet`, 20 px padding (16 on phones), its title from the product's item
label and number ("Person 1") in Founders Medium 17/24, and the product's "Remove" as a Small Danger
button at its top right. The product's add button is an Outline Medium with a 16 px plus glyph,
under the last item. Never dashed (Hal, Jun).

### 11.4 The sheet, the Letterhead, the Firm Rule

These are the identity pieces of 3.4 and 3.5 built as components, so nobody places a firm's logo or
the Imprint by hand anywhere in the product or the pictures (Priya, Marcus).

**`<Sheet>`**: the white paper everything carrying a firm's name lies on (2.3, 6.1).

| Prop | Values |
|---|---|
| `register` | `firm` (default) · `cofile` (CoFile's own cards: the price card, auth cards, dashboard panels, which go Night Card in dark; a firm sheet never does) |
| `size` | `picture` (marketing pictures, padding 40 / 32 / 20 px by breakpoint, 6.3) · `page` (the proof and client pages, 760 px, 48 px padding) · `card` (24 to 32 px padding, 1 px Rule border, no shadow) · `email` (600 px, 32 px padding) |
| `head` | `ceremonial` (Letterhead centred: the proof, decision page, emails) · `working` (left-aligned: intake form, client pages, desk) · `none` |
| `imprint` | `foot-link` · `foot-plain` · `none`, per the table in 3.4 |

- **Look:** Sheet `#FFFFFF`, `--r-sheet` 2 px, `--e-sheet`; on Night `--e-sheet-dark`. Cards inside
  sheets get a 1 px Rule border and no shadow (6.4).
- **Phone:** on firm pages the sheet *is* the screen: edge to edge, no shadow, 20 px padding. In
  pictures it keeps a 20 px margin and its shadow, so a picture of a page never looks like the page
  (Hal).
- **States:** a sheet that is a link as a whole (a state card on the desk's picker, a preview card)
  lifts on hover to `--e-lift` with `translateY(-2px)` over 180 ms `--ease-settle`, and takes the
  ring at 4 px offset on focus. Loading: a blank sheet at its final size with Rule bars where text
  will be, pulsing (D2). An expired or used link shows the same sheet with the engine's own words,
  never an alarm.

**`<Letterhead>`** implements 3.5 whole: trim, background reading, shape class, area sizing and
clamps per surface, raster limits, the typeset name with its italic ampersand and small-cap
credentials, the monogram tile, the white logo plate on dark chrome, the firm's favicon and tab
title. Props: `firm`, `surface` (`sheet`, `sheet-phone`, `desk`, `email`), `align`. It renders the
Firm Rule beneath itself.

**`<FirmRule>`**: 3 px `--firm`, 2 px gap, 1 px `--firm-2`; 1 px `rgba(29,33,48,.10)` under the
3 px line when the main color is under 1.5:1 on white; full sheet content width, or the full window
on the desk. On the dark desk chrome the 3 px line keeps the exact color and the 1 px line takes
`--firm-ink-dark` (3.6). One motion: on the decision page and the client's thank-you state it draws
from the left, `scaleX` 0 → 1 over `--t-draw` 600 ms `--ease-sweep`, like the rule under a
signature (D2); static with reduced motion. CoFile's own thick-and-thin (3 px, 2 px, 1 px, all
Plate Ink) is the same component with `ink="cofile"`, used only at the top of CoFile's footer
(D5).

**`<Imprint>`**: "with CoFile" exactly as 3.4: "with" in Miller Text Italic, a 0.28 em space, the
wordmark's small master at the same cap height, 13 px, Graphite `#555867` (`#A9ABB5` on dark),
under a 40 px × 1 px Rule hairline 12 px above, 24 px below the last content. Props: `surface`,
`link` (true only on the proof, the decision page and the desk header, opening cofile.app in a new
tab), `variant` (`with` or `filed-with` for the widget's "Filed with CoFile", left-aligned, 12 px
below the form, no hairline). The desk variant sits at the right end of the Letterhead row,
vertically centred on the logo, 24 px before the signed-in user's email, without the hairline.

- **States:** none at rest; as a link, a 1 px Graphite underline under the whole lockup on hover
  and the ring on focus, nothing else. Never animated, never bold, never a firm or Brass color, never
  in a badge, never larger than 14 px on a firm surface.
- **Accessibility:** live text "with" plus the wordmark SVG with `role="img"` and
  `aria-label="CoFile"`, so a screen reader says "with CoFile". Until the lettering is delivered,
  the interim of 3.3 (Miller Text Italic plus Miller Text Bold) at the same metrics.
- **Email:** live text in the email stacks with a PNG @2× of the drawn lockup where images load,
  `alt="with CoFile"`.

### 11.5 The proof

One component, three sizes, one set of parts (Hal, with Priya's rule that it is built twice from
one set of tokens).

| Size | Width | Where | What it includes |
|---|---|---|---|
| **Picture** | 560 px (full width minus 40 px on phones) | Home section 4, How it works | Letterhead, title and chip, details, fees with leaders, the button as a picture, the payment slip. Sample data from D4, labeled "Sample proof · test details · not a real business" |
| **Page** | 760 px sheet on `--firm-wash` | The real proof page | Every part below |
| **Email card** | 520 px | "Your proof is ready to approve" email | The firm's Letterhead edge, the filing title, the fee total in `total`, then the email's button |

**Parts, in the product's order** (`src/approvals/render.ts`):

```
                         [ firm logo ]                        ← Letterhead, centred (3.5)
                       Harbor & Pine CPA
 ═══════════════════════════════════════════════════════════  ← Firm Rule
 ───────────────────────────────────────────────────────────
 ┌ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ┐  ← only on a rehearsal: the
   ⚲ Rehearsal: nothing will be filed or paid, even if you      rehearsal notice (11.11)
   approve.
 └ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ┘
 Two Sisters Bakery LLC                ◆ Ready to approve     ← proof-title 34/40, firm font 600
 Filing reference … Please decide by …                          reference and deadline 16/24
 ┌──────────────────────────────────────────────────────────┐  Graphite; the deadline in Medium
 │ By approving, you confirm every detail below is correct… │  ← terms panel: Bond, 1 px Rule,
 └──────────────────────────────────────────────────────────┘    24 px padding, 17/27
 The state's review page                                       ← section 22/28 firm font
 [ the state's own page, in a neutral 1 px Rule frame ]
 Filing details
   Formation                                                   ← group head 15/20 Medium Graphite
   Business name            TWO SISTERS BAKERY LLC             ← proof-label 38% · proof-value Mono
   Members                  Ana Ortiz, Lucia Ortiz (50/50)
 State fees
   Formation filing fee ································ $100.00  ← fee 18/26, leaders, decimal-aligned
   NJ portal fee, by card ································ $3.50
   ──────────────────────────────────────────────────────────    ← 1 px Plate Ink
   Total to the state                                 $103.50   ← total 22/28 Medium
                                                      ═══════   ← double rule: 1 px, 2 px gap, 1 px
 One-time code sent to you  [ _ _ _ _ _ _ ]                     ← when required (11.3 code field)
 What should change? (Needed only if you ask for changes)
 [                                                          ]
 [     Approve, and authorize submission and payment        ]   ← Proof size, --firm-fill, full width
 [                    Request changes                       ]   ← Outline Large, 12 px below
 Questions: …                                                   ← small Graphite
                              ────
                           with CoFile                          ← Imprint, linked
```

**Rules.**

- **One button in the firm's color**, at the foot, after everything has been read: "Approve, and
  authorize submission and payment", 60 px, full content width, the biggest button in the product
  and the place the firm's initials would go. **It is never sticky**, on any screen (Hal;
  decisions file). It never pulses. Pressing it debosses it, and the decision page arrives with its
  heading pressing in and the Firm Rule drawing under it (D2). No stamp, no seal, no "APPROVED", no
  tick burst.
- **Values** that go to the state are Founders Grotesk Mono (`proof-value` 16/24; 17/24 on phones,
  set under their label). **Fees** are Founders Text tabular lining, right-aligned on the decimal,
  always with cents (5.4, 5.5). The table keeps the state's order; the design never reorders it.
  Masked numbers ("***-**-1234") are tabular with the asterisks in Graphite.
- **Labels with "A › B" paths** are grouped: the first part becomes a group head with 24 px above
  it, the rest stays in the row (Hal).
- **The state's review page** is the state's real page, shown as evidence in a neutral 1 px Rule
  frame at full content width, tap or click to see it full size in an overlay (11.17). It is the
  only place a state's own page appears, and never in a marketing picture (3.9).
- **The terms panel** has no icon and no yellow: it is the part of a proof you read slowly, set to
  be read, not to alarm (Hal).
- **The picture's annotation layer** (marketing only, never on a real proof): marginal numerals in
  Founders Medium 15/20 Graphite, hung 24 px outside the sheet's left edge on the first baseline of
  the row they point to, with optional 1 px Brass Line leaders to that row (Elaine's callouts, Greta's
  marginal numerals). The payment slip ("New Jersey payment screen", $103.50, "Matches the proof"
  as a Done chip) is a narrow card tucked 12 px out from under the sheet's foot (Hal).

**States.** Ready (the default); rehearsal (the rehearsal notice appears; nothing else changes);
code wrong (the code field's error); changes requested and approved (the decision page: same
Letterhead and sheet, heading in `page-title`, the product's paragraphs, the Questions line, the
Imprint); expired or used (the same sheet with the engine's words); loading (none: the page is
server-rendered and works without JavaScript).

**Phone.** The sheet is the screen; the Letterhead stays centred; fee leaders shorten and amounts
never wrap; the review page is full width and tap-to-zoom; both buttons full width.

**Dark mode.** The proof is always a light sheet; only the page around it goes to Night (4.6).

**Print** is in 12.6.

**Built twice, kept identical.** The real proof is server-rendered in `src/approvals/render.ts`
with inline styles and no scripts; the picture and the Branding preview use a React component.
Both read one generated token file (13.2), and a Playwright test renders the same sample through
both and fails on any visual difference (Priya).

### 11.6 Chips and status

**Anatomy.**

```
 ╱‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾╲
│ ◆  Proof ready to approve     │   30 px tall · 0 12 px padding · glyph 12 px · 6 px gap
 ╲____________________________╱    chip 14/18 Founders Text Medium · --chamfer (--chamfer-s under 28 px)
```

- **Sizes:** standard 30 px (Hal); compact 24 px with `--chamfer-s` for source tags and chips inside
  dense table cells. Text never goes under the `chip` size of 14 px.
- **Long labels** ("Rehearsed to the payment screen", "Getting the state's review page") never
  break mid-word and never truncate: they wrap to a second line, the chip grows (padding-block
  6 px), and the glyph stays on the first line.
- **Status is never color alone** (4.3): glyph, words and color always travel together, and Done is
  a solid fill while Your turn is an outline, so they can't be confused on a green firm's desk.

**The tones** (4.3), as chips:

| Tone | Chip | Labels (the product's own) |
|---|---|---|
| **Done** | Verdigris `#2E6B57` fill, white text, white filled-circle glyph | "Live", "Filed", "Filed, IRS letter saved", "Approved", "Submitted to the state", "Accepted by the state", "Completed", "EIN issued", "Matches the proof" |
| **Done, quiet** (dense tables, What we file) | Verdigris Tint `#E4F0EA`, Verdigris text, filled circle | the same, where a solid chip would shout |
| **Your turn** (firm pages and their pictures) | Sheet, 1 px `--firm-ink` border, `--firm-ink` text, lozenge ◆ in `--firm` | "Proof ready to approve", "Ready to approve", "Waiting for approval", "Needs information", "Changes requested", "Your proof is ready" |
| **Your turn** (CoFile's dashboard) | Ochre Tint `#F7EDD8`, Ochre `#855A0C` text, lozenge | the same |
| **Attention** | Ochre Tint, Ochre text, half-filled circle ◐ | "Name unavailable", "On hold", "Being checked", "Paused: state site changed", "Ready to pay" |
| **In hand** | Sheet, 1 px Iron `#3F434F` border, Iron text, ring ○ | "Received", "Queued", "Getting the state's review page", "Filing now", "Final check", "Submitted", "For your team to check" |
| **Problem** | Madder Tint `#F8E6E3`, Madder text, bar ▬ | "Needs correcting", "Rejected by the state", "Failed", "Stopped" |
| **Rehearsal** | Sheet (or transparent), 1.5 px dashed Plate Ink (dash 4, gap 3), Plate Ink text, the 14 px ghost-light glyph | "Rehearsal", "Test", the "Beta" chip, "Rehearsed to the payment screen" |
| **Neutral** (no status meaning) | Sheet, 1 px Rule Strong, Plate Ink text, no glyph | "Your plan", counts of things, "Planned" where it isn't a coverage mark |

**Mapping from the product.** `<StatusChip status context>` reads `statusLabel()` in
`web/lib/status.ts`: `ok` → Done; `bad` → Problem; `""` → In hand; `warn` → Attention, except
"Waiting for approval", "Needs information" and "Changes requested", which are **Your turn** on a
firm's desk (it's the firm's move) and on CoFile's dashboard (Hal, Priya). Rehearsal and test
flags add the Rehearsal chip beside the status, never instead of it.

**Drawing the dashed outline.** CSS `border-style: dashed` draws different dash lengths in every
browser and can't follow a chamfer. The rehearsal outline is an inline SVG behind the label: a path
of the chip's chamfered shape, `stroke-width: 1.5`, `stroke-dasharray: 4 3`, `vector-effect:
non-scaling-stroke`, `currentColor`. The same `<DashedOutline>` draws rehearsal notices and the
plate glyphs, so "dashed means rehearsal" looks identical everywhere (4.4).

**States.** Chips are labels: no hover, no focus of their own (the row or link around them takes
it). When a status changes, the new chip crossfades over 200 ms, and on the desk it presses in with
its row carrying a 6% firm wash that fades over 2 s (D2). Loading: an 80 × 30 px Rule bar. In dark
mode the tones take their dark values (4.6); the solid Done chip keeps `#2E6B57` with white text.

**Related small parts.**

- **Source tags** ("from the text", "already filled"), compact chips with no border: in
  CoFile's marketing pictures "from the text" is Brass Ink `#7A5714` on Brass Tint `#F6EBD0`
  (5.5:1), with the travelling phrase underlined in Brass Line (4.2); "already filled" is Plate Ink
  on `--firm-row` with a 6 px `--firm` lozenge. Wherever a draft with source tags appears on a firm's own
  pages, the firm-colored version is used for both (`--firm-ink` on `--firm-tint`, 6.6:1 for
  Harbor & Pine), because there is no Brass on a firm's page.
- **Count badge** (desk navigation, beside "Ready to pay" and "Filings" when something waits on the
  firm): 22 px tall, 22 px minimum width, `--chamfer-s`, `--firm-fill` with `--firm-on`, 14 px
  Medium tabular, 6 px after the link text. Accessible name `[copy needed: e.g. "2 waiting"]`.
- **Mono chip** (`cofile.app/bestaccounting/llc-filing-new-york`, `"dryRun": true`, `/file`):
  Cotton 2, `--chamfer-s`, Founders Grotesk Mono 15/22, 2 × 8 px padding; never wraps inside a
  path, but the chip may wrap to the next line as a whole.
- **Method chips** in the docs (GET, POST, PUT, DELETE): Outline chips in Mono 14/18 capitals (they
  are code), all in one ink. Color means status, never an HTTP verb (Hal).
- **Coverage plate glyphs** are in 11.16.

### 11.7 Timeline

One component for a filing's stages, used on the home page's After picture ("Approved",
"Submitted", "Filed"), the desk's filing detail, and the "Completed" email (Hal's stage rule,
Marcus's stage track, Elaine's timeline).

**Anatomy, horizontal (desktop, up to six stages).**

```
  ◆━━━━━━━━━━━━━━━━━━━◆━━━━━━━━━━━━━━━━━━━◇───────────────────◇
  Approved             Submitted           Filed               …
  Nov 24, 10:12        Nov 24, 10:31
  └ passed: Plate Ink   └ current: --firm,   └ ahead: outline
    lozenge and rule      4 px --firm-tint      lozenge, Rule
                          halo, label Medium     Strong line
```

- **Line:** 1 px, Plate Ink between passed stages, Rule Strong ahead. Spans the container; stages
  evenly spaced, at least 120 px apart.
- **Stages:** 12 px lozenges (squares turned 45°, the bullet's shape at a larger size). Passed:
  filled Plate Ink. Current: filled `--firm` (Plate Ink on CoFile's dashboard) with a 4 px
  `--firm-tint` halo. Ahead: 1 px Rule Strong outline. When the final stage is reached ("Filed",
  "Completed"), its lozenge is Verdigris and the Done chip sits beside the timeline.
- **Labels:** the product's status labels, or the stand-in's three words, under each lozenge in
  Founders Medium 15/20 Plate Ink (Graphite ahead); times below in 14/20 Graphite tabular where the
  product has them.
- **Problem:** the stage that failed shows the Madder bar glyph in place of its lozenge with its
  label in Madder; the line after it stops. Nothing after a problem is drawn as if it will happen.
- **Rehearsal:** a rehearsal's run ends at its last screen; its final lozenge is drawn with the
  dashed outline and the timeline carries the Rehearsal chip.

**Vertical** (phones, more than six stages, and "Progress on the state site"): the line runs down
the left, 24 px in, with 8 px lozenges; each step is a 48 px row with its words in `body-desk`
17/26 and its time right-aligned in Graphite tabular.

**Accessibility.** Where a status chip already states where the filing is, the timeline is
`aria-hidden` (Hal). Where it stands alone (the record, the email) it is an ordered list with
`aria-current="step"` on the current stage.

**States.** Default as above; updating (a new stage inks in along the line: `stroke-dashoffset`
over `--t-draw` 600 ms, then its lozenge presses in; reduced motion: appears complete); loading (the
line in Rule only, no labels). Dark mode on the desk chrome: passed Night Ink, current
`--firm-ink-dark`, ahead `#6E7180`. In the After picture it plays once as D3 describes.

### 11.8 Tables

**The ledger** (desk Filings, client links, signatures, saved cards, keys, webhooks, dashboard lists):

```
 Filing                         Type                          Status                     Started
 ─────────────────────────────────────────────────────────────────────────────────────────────── ← 1 px Plate Ink
▌Two Sisters Bakery LLC         New Jersey LLC formation      ◆ Proof ready to approve   Nov 24  ›
 ─────────────────────────────────────────────────────────────────────────────────────────────── ← 1 px Rule
 Hudson Ledger LLC              New York LLC formation        ● Filed                    Nov 18  ›
```

| Part | Spec |
|---|---|
| **Frame** | No outer border, no vertical rules, no zebra stripes (Hal, Marcus, Priya). The table sits on a sheet (or Night Card on CoFile's dark dashboard) |
| **Header row** | 44 px, `table` header 14/18 Founders Medium Graphite, sentence case, a 1 px Plate Ink rule under it. Sticky under the header on tables longer than a screen (Marcus) |
| **Rows** | 56 px for one line, 64 px for two (the business name in 17/24 Medium over the filing type in 15/22 Graphite, Elaine's desk rows). `table` 16/22 text. 1 px Rule between rows |
| **Numbers and dates** | Right-aligned, tabular lining; dates in Graphite |
| **The row's link** | The first cell's main item (a business name, a key name) is the link: Plate Ink Medium with a 1 px Rule Strong underline, 2 px `--link` on hover. Its click area is stretched over the whole row (`::after` inset 0), and a 16 px chevron sits at the row's right end. The row takes the focus ring when its link has focus |
| **Hover** | `--row` fill (`--firm-row` on firm pages, Cotton 2 on CoFile's) |
| **Needs the firm** | A 3 px `--firm` bar inside the row's left edge plus the Your turn chip, so the owner's eye finds her work (Priya, Rosa). On CoFile's dashboard the bar is Ochre |
| **Selected** | `--select-fill` and the 3 px bar in `--select` |
| **Updated** | The 6% firm wash fading over 2 s (D2) |
| **Loading** | Five rows of Rule bars at their final widths, pulsing; the header row is real |
| **Empty** | One 64 px row across all columns with the product's sentence in Graphite ("No filings."), or the empty state of 11.13 where the whole page is empty |
| **Error** | A Problem notice in place of the rows, in the product's words ("Billing couldn't be loaded. Try again shortly.") |

**On phones** (≤ 599 px) every ledger becomes a list of row cards: the first column as the title in
17/24 Medium, the other columns as label and value lines (label 14/20 Graphite, value 16/22), the
chip last on its own line, 16 px padding, a 1 px Rule between cards, the whole card the link. No
sideways scrolling (Hal, Marcus, Priya, Jun). The one exception is the docs' parameter tables,
which scroll inside a framed box with the first column sticky and an 8 px fade on the right edge
showing there is more (Elaine).

**The details table** (the proof, a filing's details): label 38% in `proof-label` 16/22 Graphite,
value in `proof-value` (Mono when it goes to the state), rows at least 52 px with 1 px Rule
between, group heads as in 11.5. Phones: label above value.

**The fee table** (the proof, the payment slip, the price card's lines): label left in `fee` 18/26,
dot leaders between (Founders Text periods every 0.4 em in Rule Strong, on the shared baseline,
5.4), the amount right-aligned on the decimal in tabular figures. The total row has a single 1 px
Plate Ink rule above it and a double rule (1 px, 2 px gap, 1 px) under the amount only, the way an
accountant underlines a total (Jun, Elaine). When a label is long, the leader shrinks; below 40 px
of leader the amount drops under its label, right-aligned (Hal).

### 11.9 Price cards

**The home price card** (home section 8, the Pricing page head): the stationer's printed price card
(Hal 9.8), the one object on the site that is heavy stock.

```
                $45  a filing. EIN included
                     with a formation.                         ← price-xl + display-l, centred
        ┌──────────────────────────────────────────────────┐
        │ Pay as you go ···················· per live filing│  ← left: price-l Miller Display
        │──────────────────────────────────────────────────│    right: Miller Text Italic, lede size,
        │ $25 ······························ an EIN on its own│    Graphite · leaders Rule Strong
        │──────────────────────────────────────────────────│
        │ $15 ························ copies and certificates│
        │──────────────────────────────────────────────────│
        │ Plans from $250 ··············· a month for 6 filings│
        └──────────────────────────────────────────────────┘▌  ← --e-card: 2 px Rule Strong edge
                                                         ▀▀▀▀     along bottom and right
               State fees separate. Rehearsals free. See all plans
     Social Security numbers encrypted and deleted 30 days after the filing. …  Security
```

- **Card:** Sheet, `--r-sheet`, `--e-card`, max 760 px, centred, 48 px inner margins (24 px on
  phones), no texture. Four lines 76 px apart with 1 px Rule hairlines between.
- **Type:** the left item in `price-l` (Miller Display 56/60, lining tabular, Plate Ink), with the
  "$" at 60% raised to cap height (5.4); the right item in Miller Text Italic at the `lede` size,
  Graphite. Leaders as the fee table. Figures come from `web/lib/pricing.ts` only.
- **Under the card,** centred, `small` 15/23 Graphite: "State fees separate. Rehearsals free. See all
  plans" and, 12 px below, the security line set exactly the same way with "Security" as its link
  (2.6).
- **Phone:** left-aligned; each line stacks the left item (at 44 px, `price-l` phone) over the right
  item, right-aligned, with a leader across the gap.
- **States:** none. It is not a link and has no hover. Nothing on it ever moves (D2, rule 5). Dark
  mode: Night Card `#1F2230`, edge `#6E7180`, Night Ink figures, Graphite dark right items.

**Plan cards** (Pricing page, Billing on the desk, `PlanPicker`):

```
 ┌────────────────────────────┐
 │ Growth                     │  ← display-s, Miller Text 26/32 (Founders Medium 22/28 on the desk)
 │                            │
 │ $500  a month              │  ← price-l + body 18 Graphite on the same baseline
 │ or $5,000 a year (2 months │  ← small, Graphite: the product's annual line
 │ free)                      │
 │ ────────────────────────── │  ← 1 px Rule
 │ ◆ 15 filings a month       │  ← lozenge list, ui 17/24
 │ ◆ …                        │
 │ (●) A filing professional  │  ← a 32 px real portrait (C10) as this line's bullet
 │     takes over when a      │
 │     filing needs one       │
 │ [ Switch to this plan ]    │  ← Billing only: firm primary Medium, or Outline
 └────────────────────────────┘
```

- **Card:** Sheet, `--r-sheet`, `--e-sheet`, 32 px padding (20 px on phones), equal heights in a
  row, minimum 260 px wide; four across at desktop, two at tablet, one on phones.
- **Growth** is set on the heavier stock: `--e-card` instead of `--e-sheet`, nothing else. No
  ribbon, no badge, no color, no "most popular" (Hal). Every designer singled out the middle plan;
  this is the quietest way that still reads.
- **Prices** never animate, never strike through, never carry a "save" badge beyond the product's
  own "(2 months free)" wording.
- **On Billing** (a firm page) the cards use Founders for names, the current plan carries the Firm
  Rule along its top edge and the product's "Your plan" chip (Neutral tone) at its top right, and
  its button is dropped. The next plan's button is the page's one firm primary; others are Outline.
  "Not available yet" uses the disabled look with its words.
- **States:** the card has none of its own; its button has the button states; loading after
  "Switch to this plan" follows 11.1, and the product's notice ("Your plan is changing. …") appears
  as a Done notice above the cards.

### 11.10 Navigation

**The header** (CoFile's pages; 6.7).

```
DESKTOP, 76 px at rest → 60 px after 120 px of scroll
┌──────────────────────────────────────────────────────────────────────────────────────────────┐
│ [▭Co] CoFile     How it works   For firms   What we file   Pricing   For platforms   Log in   ╱ Run a free rehearsal ╲ │
└──────────────────────────────────────────────────────────────────────────────────────────────┘
  lockup 28 px    nav 17/24 Plate Ink, 32 px apart; current: 2 px Brass Line    44 px button: Outline
                  underline 6 px below the baseline                             while the lead is in view

PHONE, 64 px                                   640–1100 px (1240 px in Spanish)
┌──────────────────────────────┐               ┌───────────────────────────────────────────────┐
│ [▭Co] CoFile   Log in  ≡ Menu│               │ [▭Co] CoFile        Log in  ╱Run a free…╲  ≡ Menu│
└──────────────────────────────┘               └───────────────────────────────────────────────┘
```

- **Ground:** Cotton, sticky. A 1 px Rule bottom edge appears only once the page has scrolled.
- **Compacting without moving the page:** the header's box keeps its 76 px in the flow; the
  compact state translates the bar up 16 px and scales the lockup to 0.857 over 200 ms
  `--ease-settle`, so the content under it never shifts and only `transform` animates (D2). With
  reduced motion it switches at once.
- **Links:** `nav` 17/24 Founders Text, Plate Ink; hover 1 px Rule Strong underline; current
  `aria-current="page"` with the 2 px Brass Line underline. "Log in" is the same as a nav link.
- **Menu button** (phone, and 640 to 1100 px): 48 × 48 px minimum, three 20 px lines of 1.5 px with
  6 px between them, then the word `[copy needed: "Menu"]` (D7) in Founders Medium 15/20, so people
  who don't read the icon still find it (Rosa). `aria-expanded`, `aria-controls`.

**The phone menu sheet.**

```
┌──────────────────────────────┐
│ [▭Co] CoFile          ✕      │  64 px, the close button replaces Menu
│──────────────────────────────│
│ How it works                 │  64 px rows · Miller Text 24/32 · 1 px Rule hairlines
│──────────────────────────────│
│ For firms                    │
│──────────────────────────────│
│ What we file                 │
│ Pricing                      │
│ For platforms                │
│──────────────────────────────│
│ Log in                       │  Founders 18/24
│                              │
│ [   Run a free rehearsal   ] │  Brass Large, full width, above the safe area
│ hello@cofile.app             │  small, inline link
└──────────────────────────────┘
```

- A full-height Cotton sheet that slides down from under the header, `translateY(-8px)` → 0 with
  opacity, 240 ms `--ease-settle`; it leaves in 160 ms `--ease-exit`. Reduced motion: opacity only,
  120 ms.
- The current page's row carries a 7 px Brass Line lozenge hung in the left margin.
- Close: a 48 px button with a 1.5 px drawn ✕, accessible name `[copy needed: "Close menu"]`. Esc
  also closes. Focus is trapped inside, moves to the first link on open and returns to the Menu
  button on close. The page behind doesn't scroll, and the sticky phone bar hides.
- The sheet's accessible name is D7's `[copy needed]`.

**The sticky phone bar** (6.7): 64 px plus `env(safe-area-inset-bottom)`, Cotton, 1 px Rule top
line, 8 px padding, "Run a free rehearsal" as a full-width Medium Brass button (48 px; the bar
itself is the 64 px band). It slides up from below (`translateY(100%)` → 0, 240 ms
`--ease-settle`) once the page's lead button has left the viewport, and down (160 ms) whenever
another Brass button, For platforms' inquiry form, the menu sheet or a focused field appears.
CoFile's pages only: never on a firm's or client's page.

**The footer** (6.5, Hal 9.0).

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━  3 px Plate Ink
──────────────────────────────────────────────────────────────────────────────────────────  2 px gap, 1 px
 [▭Co] CoFile · the filing desk behind your firm           New York · New Jersey · Florida · IRS
                                                           Building a filing product? CoFile for platforms

 CoFile is not a law firm or a government agency, isn't affiliated with any state or the IRS,
 and doesn't give legal or tax advice.
 Terms · Privacy · Security · FAQ · hello@cofile.app                       [ theme control ]
```

- Cotton 2 ground. The thick-and-thin in Plate Ink across the content width, 64 px above the first
  row; 48 px bottom padding plus the sticky bar's height on phones, so the bar never covers the
  legal line.
- First row 17/24 Plate Ink: the lockup (28 px) and the Shell's line in c1–c6; the places line in
  c7–c12, set with wide middots (a 0.5 em space each side), the way an address sits at the foot of
  a letterhead.
- The legal line and links in `small` 15/23 Graphite, links underlined; each link has a 48 px tall
  hit area (12 px block padding) so a thumb can't miss on a phone.
- **Theme control** (12.1): a three-way segmented control (11.17) at the right of the links row,
  `[copy needed: its label and its three options, e.g. "Appearance: System, Light, Dark"]`.
- Phone: everything stacks left-aligned, 24 px between groups.

**The desk navigation** (the firm's filing desk; 3.5, 6.8).

```
DESKTOP
┌─────────────────────────────────────────────────────────────────────────────────────────────┐
│ [logo] Harbor & Pine CPA                              with CoFile   ana@harborpine…  Log out │ 76 px, Sheet
│ ═════════════════════════════════════════════════════════════════════════════════════════  │ Firm Rule, window width
│ Filings  New filing  Ready to pay ▣2  Client links  Signatures  Setup  Billing               │ 52 px, --firm-wash
└─────────────────────────────────────────────────────────────────────────────────────────────┘
PHONE
┌──────────────────────────────┐
│ [logo] Harbor & Pine…  ≡ Menu│ 64 px
│ ════════════════════════════ │
└──────────────────────────────┘
```

(The email address is a layout placeholder, as in the foundation's 6.8.)

- **Letterhead row:** Sheet, 76 px (64 px on phones), the `<Letterhead surface="desk">` at the left;
  at the right the Imprint, the signed-in user's email (a 15 px link to the password page, as the
  product has it) and "Log out" as a Small Outline button. Dark mode: Night Card with the logo on
  its white logo plate (3.5).
- **Nav row:** 52 px on `--firm-wash`, the product's links in Founders Medium 17/24 Plate Ink, 32 px
  apart. Current: a 3 px underline in `--firm-ink` (contrast-safe on any firm; the foundation also
  allows `--firm-2`, which is used instead only when it reaches 3:1 on the wash). Hover: 1 px Rule
  Strong underline. Count badges (11.6) after "Ready to pay" and "Filings" when something waits.
- **Overflow:** if the links don't fit (a long Spanish set, a narrow laptop), the row switches to
  the phone pattern by measuring, not by a fixed breakpoint (Dev).
- **Phone:** the Letterhead row carries the logo (or typeset name) and the same Menu button as the
  public site; there is no nav row and no horizontal tab strip (older thumbs miss them). Menu opens
  a full-height Sheet: the links in 64 px rows in Founders Medium 20/28, current with a 3 px
  `--firm-ink` bar at its left, then the Imprint, the user's email and "Log out". Accessible name
  for the sheet `[copy needed]`. Each page's main action ("New filing") stays in its page head, full
  width (Hal; decisions file).
- **The desk's foot:** the product's support line ("Questions? Email …") in `small` Graphite on the
  wash, 48 px below the content. No Imprint here: on the desk it lives in the header.

**CoFile's dashboard** uses the same shell with CoFile's lockup in the Letterhead row (64 px, Sheet,
1 px Rule under it instead of a Firm Rule) and its links ("Overview", "Filings", "Ready to pay",
"Firms", "API keys", "Webhooks", "Setup", "Team", "Billing", "Sign-ups", "Docs") in the nav row on
Cotton; current with a 3 px Brass Line underline (it is CoFile's register).

**The docs navigation:** a 240 px left rail; group heads ("Guides", "Reference") in 14/20 Founders
Medium Graphite, sentence case; links in Founders Text 16/24 Plate Ink in 40 px rows; the current
page in Medium with a 2 px Brass Line rule at its left. At ≥ 1280 px a right rail lists the page's
headings `[copy needed: its heading, e.g. "On this page"]`. On phones the left rail becomes a
disclosure at the top of the page whose summary is the current page's title.

**In-page contents** (Terms, Privacy): a sticky list in the left margin at ≥ 1024 px, Founders 15/22,
the current section with a 2 px Brass Line rule at its left (Elaine).

### 11.11 Banners and notices

**The beta notice** (home page and CoFile's own pages; 6.5).

```
┌───────────────────────────────────────────────────────────────────────────────────────────┐
│  ┌ ─ ─ ─ ─┐                                                                                │
│   ⚲ Beta   CoFile is in beta. Any filing can run as a free rehearsal on the state's real   │ Cotton 2
│  └ ─ ─ ─ ─┘ website. It stops before the last button, so nothing is filed or paid. Filing  │ 1 px Rule under
│             types go live one at a time. Questions or problems? hello@cofile.app            │
└───────────────────────────────────────────────────────────────────────────────────────────┘
```

- Cotton 2 band with a 1 px Rule bottom edge, 12 px block padding; centred on the 1200 px grid in
  one or two lines on desktop; `small` 15/23 Graphite; the email as an inline link. The "Beta" chip
  is the Rehearsal chip (11.6): it means what a rehearsal means.
- Phones: left-aligned (a centred four-line paragraph is hard to read), wrapping to four lines.
- Not dismissible on the home page; the same, at full length, on the pages behind it.
  `role="note"`.
- **On firm pages** it carries the product's other wording ("This service is in beta. …"), names
  neither CoFile nor its address (as the code already does), and sits on `--firm-wash` with no
  Brass and no link. Never in the embed widget.
- Dark mode: Night 2 `#1A1D27` band, `#323646` edge, Graphite dark text.

**The notice slip** (Hal's slip, replacing every colored box).

```
▌▬  Please fix these and submit again.                        ← 4 px left rule in the tone · 12 px glyph
▌   · Business name                                              aligned to the first line · text 17/26
▌   · Members                                                    (18/28 on client pages) · links underlined
```

| Tone | Left rule | Fill | Glyph | Product examples |
|---|---|---|---|---|
| **Plain** | Plate Ink | Sheet (Cotton 2 when it sits on a white sheet) | none | Next-step notes ("We're filling in the state's form up to its review page. …"), "Filled in from your message “…”. …" |
| **Your turn** | `--firm` (Plate Ink on the dashboard) | `--firm-row` | lozenge ◆ | "1 filing needs someone to act.", "… ready to pay and needs your card's security code. Pay and file" |
| **Attention** | Ochre | Ochre Tint | ◐ | "Real filings need an active subscription; rehearsals are free. Subscribe" |
| **Done** | Verdigris | Verdigris Tint | ● | "Saved.", "Saved to Google Docs. Open the record", "Your plan is changing. …" |
| **Problem** | Madder | Madder Tint | ▬ | "Please fix these and submit again.", "Billing couldn't be loaded. Try again shortly." |
| **Rehearsal** | none: a 1.5 px dashed Plate Ink outline all round (11.6) | Sheet | ghost light | "This page is in rehearsal for now. …", "Rehearsal: nothing will be filed or paid, even if you approve." |

- **Shape:** `--r-sheet`, 16 × 20 px padding (12 × 16 for one-line confirmations beside a button),
  the full width of its column, the link at the end of the sentence. No dismiss button unless the
  product has one.
- **Roles:** confirmations after an action `role="status"`; form errors `role="alert"` and the
  summary takes focus (`tabindex="-1"`).
- **Arrival:** opacity 0 → 1 and a 4 px rise over `--t-ink` 260 ms; instant with reduced motion.
- **Red-family firms:** Problem notices drop the tint and use a Plate Ink 1 px outline, the 4 px
  Madder rule and the bar glyph, so an error can't be read as the firm's own color (3.6).
- **The rehearsal notice is never yellow and never a warning** (all ten): dashes and the ghost
  light, Plate Ink text, the first word "Rehearsal" in Medium.
- **Consent notice**, only if one is legally required: a bottom sheet the height of the sticky bar
  that replaces it until dismissed (6.7), Cotton, 1 px Rule top line, `small` text and Small Outline
  buttons `[copy needed: its words and buttons, if it is ever needed]`.

### 11.12 Toasts

**Confirmations stay where the action happened**: the product's inline notices, the "Copy" button's
own label, the row that changed (Elaine, Hal). A toast is used for one thing only: on the filing
desk, a filing's status changing while the firm is on another desk page (a proof approved by a
colleague, a filing "Filed", papers back). It uses only existing data.

```
┌─────────────────────────────────────────┐
│ ● Filed   Two Sisters Bakery LLC    ✕   │  360 px · Sheet · 1 px Rule · --e-menu · 16 px padding
└─────────────────────────────────────────┘  the business name is the link to the filing
```

- **Place:** bottom right, 24 px from the edges, on desktop; on phones, under the Letterhead row,
  full width minus 16 px margins, so the thumb zone and the page's primary button stay clear (Marcus,
  Jun). It never covers a primary button: if it would, it moves above it.
- **Timing:** one at a time, queued; each stays 6 s (longer than the usual 4 s, for older readers),
  and pauses while hovered or focused. `role="status"`, polite.
- **Close:** a 48 px ✕ button, accessible name `[copy needed]`.
- **Motion:** rises 8 px with opacity over `--t-ink`, leaves in 160 ms `--ease-exit`; fade only with
  reduced motion.
- **Never** on CoFile's marketing pages, client pages or the proof; no toast celebrates anything.

### 11.13 Empty states

A page with nothing in it yet should look like the nicest clear desk a firm owner has seen (Hal),
never a sad picture.

```
                         ┌──────────────┐
                         │  engraved    │   vignette 160 px (120 px on phones), one ink
                         │  vignette    │
                         └──────────────┘
          Your desk is clear. Start a filing (it can be a free rehearsal),
          or send a client a link with your logo on it.                     ← 20/30 Founders Text, max 34 em
                 [ New filing ]   [ Send a client a link ]                  ← firm primary + Outline
```

- **Layout:** centred in the content area, 96 px block padding (64 px on phones) (Elaine); the
  product's own sentence and its own actions, nothing added.
- **Two kinds** (Hal's vignettes, Marcus's live previews):
  1. **The firm's own work lists** (Filings, Ready to pay, Signatures): an engraved vignette (D1
     kind 4), drawn in Graphite on firm pages and in Plate Ink on CoFile's dashboard (Night Ink on
     dark). Filings uses the clear desk; Ready to pay the same at 120 px with "Nothing is waiting
     for a card right now."
  2. **Things the firm's clients will see** (Client links, the pages for each filing): a live
     preview of the client page in the firm's own Letterhead at 280 px, so the empty state already
     shows the firm its name on the door (Marcus).
- **Type:** on firm pages the sentence is Founders Text 20/30 Plate Ink: Miller never appears on a
  firm's page (3.7). On CoFile's dashboard it is `lede`.
- **Dense tables** (the dashboard's "No filings.") use the one-row empty row of 11.8, no vignette.

### 11.14 The "with CoFile" mark

The component is `<Imprint>` (11.4); its rules are 3.4. What the build must hold to:

| Surface | Place | Size and color | Link |
|---|---|---|---|
| The proof, the decision page | Foot of the sheet, centred, under the 40 px hairline | 13 px, Graphite | Yes, new tab |
| Intake form, client link pages, each filing's page | Foot of the sheet, centred | 13 px, Graphite | No |
| The filing desk | Right end of the Letterhead row | 13 px, Graphite | Yes, new tab |
| Firm emails | Foot of the email body, centred | 13 px, Graphite | Linked to the firm; plain text to the client |
| The embed widget | "Filed with CoFile", foot, left-aligned | 13 px, Graphite | No |
| Pictures on CoFile's site | Wherever the pictured page has it, at its true 13 px, never enlarged | 13 px | Inert |

- It is the same 13 px line, in the same place, on every surface of a kind. In the Firms picture
  it sits on exactly the same pixels in both firms' pages (D3).
- **QA:** a visual test renders the client page and the proof for Harbor & Pine, Northgate and every
  QA gallery firm and fails if the Imprint's box moves by a pixel or its color changes.

### 11.15 Code blocks

**Docs blocks** (Hal, with the inks checked here).

```
┌──────────────────────────────────────────────────────────┐
│                                              [ Copy ]    │  Copy: Small Outline on Night
│ {                                                        │
│   "kind": "nj_llc_formation",                            │  Founders Grotesk Mono 15/24 (14/22 phone)
│ ▌ "dryRun": true,                                        │  highlighted line: 3 px Brass rule +
│   …                                                      │  rgba(217,168,74,.12) behind
│ }                                                        │
└──────────────────────────────────────────────────────────┘
```

- **Ground:** Plate Ink `#1D2130` in light mode; Night Card `#1F2230` with a 1 px `#323646` edge in
  dark. `--r-sheet`, 24 px padding (20 px on phones).
- **Four inks only:** text Night Ink `#ECE8DF` (about 13:1), strings Brass `#D9A84A` (6.5:1), keys
  Verdigris light `#6FB39A` (6.6:1), comments Graphite dark `#A9ABB5` (7.0:1). Numbers and booleans
  take the text ink in Medium. No rainbow.
- Long lines scroll inside the block, never the page; on phones the block bleeds to the screen edges
  (Rosa). No line numbers. `tab-size: 2`.
- **Copy button:** Small Outline on Night (1 px `#6E7180`, Night Ink label) at the top right,
  `[copy needed: "Copy" for code blocks, and its confirmation]`; on press the label swaps for 2 s
  and the swap is announced politely.
- **Inline code:** Mono at 0.9 em on Cotton 2, 2 × 4 px padding, `--r-sheet`; Night 2 on dark.

**Snippets inside the product** (the widget snippet on the desk's "Your pages for clients"): the
light variant, Cotton 2 ground and Plate Ink Mono, because a firm's desk is a calm working page
(Jun); single lines use the plate field (11.3).

### 11.16 The coverage tiles

The stationer's sample cards (Hal 9.6), home section 6, the New filing state picker, What we file.

```
┌──────────────────────────┐
│ New Jersey               │  display-m, Miller Display 36/42, Plate Ink (CoFile's pages)
│ ──                       │  24 × 1 px Rule, 16 px below the name
│ LLC formation        ⬚   │  44 px rows: ui 17/24 left, the 16 × 10 plate glyph right
│ Standing certificate ⬚   │
│ Payroll registration ▭   │
│ (NJ-REG)                 │
│ Corporation formation ▭  │
└──────────────────────────┘
 ■ Live   ⬚ Rehearsed to the payment screen   ▭ Screens recorded or offered, rehearsal next
```

(■ inked, ⬚ marked out in dashes, ▭ cut in outline.)

- **Card:** Sheet, 1 px Rule border, no shadow (cards lying on a table), `--r-sheet`, 32 px inner
  margins (20 px on phones). The place name alone, no outline of a state, seal, flag or capitol
  (3.9). Cards in a row are equal height; the IRS card simply has more paper below its one line.
- **Data** from `web/lib/coverage.ts` with Planned types left out on the home page; a type the
  deployment switches live (`isLive`) shows the inked glyph with no separate design.
- **Plate glyphs** (4.5), drawn at 16 × 10 px with a 2 px chamfer leg: **Live** solid Verdigris with
  a 1 px Cotton line across its middle; **Rehearsed to the payment screen** a 1.5 px dashed Plate
  Ink outline, dash 3 and gap 2 at this size so every side carries a dash; **Screens recorded or
  offered, rehearsal next** a 1 px solid Graphite outline; **Planned** (What we file only) a 1 px
  dotted Rule Strong outline (1 px dots, 2 px gaps). Each glyph has its status as its accessible
  name and `title`; the legend in words sits under every set (15/23 Graphite, 32 px apart; stacked
  one per line on phones).
- **Grid:** four cards across 12 columns on desktop, two by two on tablet, one column with 16 px
  between on phones.
- **States:** on the home page they are not links: no hover. On the desk's state picker the same
  card is a link as a whole (`--e-lift` on hover, ring on focus, the count line in `small`). Dark
  mode: Night Card cards; glyphs in dark values (Live keeps `#2E6B57` with a Night line; outlines in
  Night Ink, `#A9ABB5` and `#6E7180`). Motion: dealt once (D3).

### 11.17 Other parts

| Part | Spec |
|---|---|
| **Lists** | No ticks (5.4). Short lists: a 7 px lozenge in `--bullet` hung in the margin, centred on the first line's x-height, text indent 24 px, items 16 px apart (`list` 19/28 on the home page). Support pages: a 6 px Graphite en rule. Ordered lists: Miller Text old-style numerals in Plate Ink hanging in the margin on CoFile's pages; Founders Medium tabular on firm pages |
| **Accordion** (Questions) | Native `details`/`summary`. 72 px rows, 1 px Rule hairlines, the question in `display-s` Miller Text 26/32, a 12 px lozenge at the right: outline when closed, filled Plate Ink when open (Hal). Answer in `body` 18/29, 24 px below. 240 ms height ease. The whole row is the button and takes the ring |
| **The message bubble** (a client's text: home section 3, How it works, the desk's request page) | Cotton 2 (Night Card on dark), Plate Ink `body` 18/29, `--r-sheet` with an 8 px tail at the lower left, max 320 px, 16 × 20 px padding; its source line under it in `caption` Graphite ("Ana Ortiz · text message · example"). Never styled like any messaging app (Hal, Amara) |
| **Document card** (the record, the desk's documents, the "Completed" email) | Letter proportion (8.5 : 11), Sheet, `--e-sheet` (1 px Rule edge in lists), `--r-sheet`; the issuer ("New Jersey", "IRS") in 14/20 Founders Medium Graphite, the document's name in `section` Founders Medium, its value in Mono 15/22, then five Rule bars 6 px tall at 60–92% width. 160 × 207 px on the desk, 230 × 298 px in pictures. Never a facsimile (3.9). In the product it is a download link with the ring on focus |
| **Stat tile** (dashboard) | Sheet card (Night Card in dark), the label in 14/20 Founders Medium Graphite, the figure in `stat` Miller Display 40/44 lining tabular, its line in `small` |
| **Card plate** (saved cards) | A chamfered Sheet tile 56 px tall, 1 px Rule, the card's label and last four digits in tabular figures; no card-network art |
| **Dialog** (confirming "Remove", "Turn off", "Revoke"; the state's review page full size) | Desktop: a centred 480 px Sheet (the review page: up to 1200 px), `--e-menu`, over a `rgba(29,33,48,.40)` scrim, no blur (6.4). Phone: a bottom sheet with 16 px side margins. Focus trapped and returned; Esc closes. Uses the product's own confirmation words, or `[copy needed]` where it has none |
| **Segmented control** (the footer's theme control; Monthly or Yearly where shown as one control) | 44 px, a Cotton 2 track with 1 px Rule, segments in Founders Medium 15/20; the selected segment Sheet with 1 px Rule Strong; radio semantics underneath |
| **Tooltip** | Avoided: nothing important lives in one (Dev). Only native `title` on coverage glyphs and truncated firm names |
| **Replay control** (moving pictures, D2) | 24 px drawn replay glyph in a 48 px hit area, Graphite, in the picture's caption row at the right; accessible name D7. Hidden with reduced motion, where pictures are already in their final state |
| **Film controls** (the engraver film, C11) | A 40 px chamfered Sheet button at the film's lower left with a 1.5 px pause or play glyph, always visible while it plays (WCAG 2.2.2) `[copy needed: accessible names, "Pause" and "Play"]` |
| **The wipe handle** (home section 2) | A 1 px Plate Ink line the height of the two pages, with a 44 × 44 px chamfered handle on it: Brass Tint fill, 1.5 px Brass Line edge, two Plate Ink chevrons. Drawn in brass as D3 asks, but not filled Brass, so it never reads as a second Brass button. `role="slider"` with arrow-key steps of 10%; accessible name D7 |
| **Icons** | About 40, on a 24 px grid, 1.5 px stroke, round caps and joins, 45° chamfers where a corner would be square, Plate Ink or `currentColor` (D5): arrows (right, left, down, external), chevrons, plus, minus, close, menu, copy, upload, download, document, envelope, speech bubble, phone, pen, edit, card, calendar, clock, search, replay, play, pause, link, person, people, desk, door, printer, page, eye, globe. Never a padlock, shield, key, vault, seal, stamp, badge, star, flag, check-in-a-circle or government building |

**`[copy needed]` added in this part** (sections 11 and 12)

| Where | What |
|---|---|
| Every page (11.2) | The skip link's words, e.g. "Skip to content" |
| Plate fields and code blocks (11.3, 11.15) | A copy confirmation for "Copy link" and "Copy" (e.g. "Copied"), and a "Copy" label for docs code blocks |
| Filled-in fields (11.3) | A short hidden line naming the source of a filled answer ("from your saved answers", "from your message") |
| "Same as" and "Same person as" (11.3) | A short spoken confirmation that the details were copied |
| Desk navigation (11.6, 11.10) | The count badge's accessible name (e.g. "2 waiting"); the desk menu sheet's accessible name |
| Phone menu sheets (11.10) | The close button's accessible name ("Close menu") |
| Footer (11.10, 12.1) | The theme control's label and its three options |
| Docs (11.10) | The heading of the right rail ("On this page") |
| Toasts (11.12) | The close button's accessible name |
| Engraver film (11.17) | The pause and play buttons' accessible names |
| Dialogs (11.17) | Confirmation words for "Remove", "Turn off" and "Revoke" wherever the product has none |
| Consent notice (11.11) | Its words and buttons, only if one is ever legally required |
| Branding (12.4) | The note to the firm when an uploaded font lacks Spanish accents |

D7's items (the Menu word, the menu sheet's name, replay, wipe handle, alt text and the rest) stand
as listed in the foundation and are not repeated here.

---

## 12. Craft notes

### 12.1 Dark mode ("night stock", 4.6)

- **Switching.** Follows `prefers-color-scheme`, with a manual override in the footer (11.10)
  stored per browser in `localStorage` and applied as `data-theme` on `<html>` before first paint
  (a four-line inline script in `<head>`, so there is no light flash). `color-scheme` is set to
  match, so native controls and scrollbars follow.
- **What goes dark:** CoFile's pages, the desk's chrome, the dashboard, the docs. **What stays
  light:** every sheet (the proof, client pages, the widget, emails, every product picture), via
  "paper pins its own inks" (11.0); photographs (at most 4% darker); the signature pad.
- **Per component:** Brass keeps its fill with Night text (8.3:1); Outline buttons go to 1 px
  `#6E7180` with Night Ink labels; fields on CoFile's dark cards take a Night fill, on a firm's
  sheet they stay white; chips, notices and the timeline take the dark tones; tables sit on Night
  Card; code blocks on Night Card with an edge; the Imprint is `#A9ABB5`; vignettes are drawn in
  Night Ink; the logo sits on its white logo plate on the desk; the rehearsal band deepens to
  `#0E1016`; the Close swaps to the dusk plate C4; textures swap to the black-card scan at 4%.
- **Firm colors on dark chrome** use `--firm-ink-dark` for links, focus rings, the current-tab
  underline and the Firm Rule's thin line; the 3 px line keeps the exact color. Every QA gallery
  firm is tested on Night Card.
- **Emails** declare `color-scheme: light only` where supported and put the Letterhead on a fixed
  white cell, so a client's mail app can't print a firm's logo on black (Hal).
- **Never:** pure black grounds, inverted logos or photographs, glows to "light" a dark page.

### 12.2 Phones

- Designed at 390 px, checked at 320, 360 and 430. Margins 20 px (16 px at ≤ 360). No sideways page
  scroll at any width; only code blocks, the docs' parameter tables and the two-door swipe scroll
  inside themselves.
- Words first, then the picture (6.6). On firm pages the sheet is the screen; pictures keep a 20 px
  margin and their shadow.
- Tap targets 48 × 48 px, 8 px apart. Primary buttons full width at 56 px; two buttons stack,
  primary first. Fields 56 px with 18 px text, so iOS never zooms.
- Every field has the right `type`, `inputmode` and `autocomplete` (`email`, `tel`,
  `postal-code`, `address-line1`, `one-time-code`, `organization` for "Firm name").
- The sticky phone bar hides whenever the keyboard is up (any focused field), and pages leave its
  height free at their foot. Everything respects `env(safe-area-inset-*)`.
- Nothing depends on hover. Hover styles sit inside `@media (hover: hover)`.
- The proof is approved at its foot, never from a sticky bar (11.5). The desk's navigation is the
  menu sheet (11.10), never a tab strip to swipe.

### 12.3 Older eyes

- **Floors** (5.2, D5): body 18 px on CoFile's pages and client pages, 17 px on the desk; nothing a
  person needs under 14 px; nothing longer than six words under 15 px; the 13 px Imprint is the only
  exception, on purpose, and never the only place information lives.
- **Contrast:** body text 12:1 or better; Graphite (6.2:1 on the darkest paper it sits on) is the
  lightest text anywhere; controls and field edges at least 3:1 (Rule Strong 3.7:1); the Rule
  hairline is never the only edge of a control.
- **Reading:** weights 400 and up only; sentence case; links underlined; labels always visible;
  ledes and body 60 to 68 characters a line; no text on photographs (the Close's words sit on a
  Cotton panel); status always glyph plus words.
- **Zoom:** sizes in `rem`, so the reader's own text size scales everything; layouts hold at 200%
  zoom and reflow to the phone layout at 400% with nothing clipped (Hal, Rosa).
- **`prefers-contrast: more`** (Greta): Rule hairlines become Rule Strong, Graphite secondary text
  becomes Plate Ink, tinted chips and notices gain a 1 px border in their tone, the paper texture
  turns off.
- **`forced-colors: active`** (Windows High Contrast): every chip, notice and control keeps a real
  `border` (never shape by background alone), glyphs are SVG in `currentColor`, the focus ring uses
  `Highlight`, the dashed rehearsal outline survives as a dashed border, and textures and shadows
  drop away.
- **Test with real readers:** moderated sessions with firm owners over 55 and clients over 60, on
  their own phones with their own text sizes, before launch (Rosa, Priya, Tomás; 13.4).

### 12.4 Spanish text length

- Plan for 20 to 30% longer strings, and test every page with a +35% pseudo-locale before launch
  (Dev). `lang` is set on every element whose language differs from the page's.
- **No fixed widths** on buttons, chips, nav links, kickers, price-card lines or table cells.
  Buttons and chips wrap to two lines and grow in height, never shrink below their floor.
- **Navigation:** the public header moves its five links into the menu below 1240 px when the page
  is Spanish (1100 px in English) (Hal); the desk row switches by measuring its links (11.10).
- **Headlines:** the one-sentence-per-line breaks are for English; in Spanish headlines use
  `text-wrap: balance` and may take a third line on desktop. `hyphens: auto` on Spanish body only,
  never on headlines, names, buttons or the proof's values. ¿ and ¡ hang into the margin at display
  sizes like opening quotes.
- **Accents at display size:** Miller Display's accented capitals (Á É Í Ó Ú Ñ) must clear the line
  above at `display-xl` 72/76; test every headline slot with long Spanish strings that open with ¿
  and carry accented capitals. Every font subset carries Latin Extended-A (5.1).
- **The price card:** leaders shrink to absorb longer right items, and below 40 px of leader the
  right item drops under the left (11.8).
- **Firm fonts:** an uploaded font is checked for á é í ó ú ü ñ ¿ ¡ at upload; a font that lacks
  them is used for the firm's name only, with a note to the firm `[copy needed: the message when an
  uploaded font lacks Spanish accents]` (Priya).
- Values that go to the state stay exactly as the state needs them, whatever the page's language.
- Product pictures are live HTML reading the same strings as the page, so they translate with it;
  photographs carry no words.

### 12.5 Reduced motion

`prefers-reduced-motion: reduce` shows every picture in its final, fully composed state and keeps
every meaning (D2, rule 8). Per component:

| Component | With reduced motion |
|---|---|
| Buttons | Hover and press change color only; no 1 px sink. The loading line sits still |
| Header | Compacts instantly; the Outline-to-Brass swap is instant |
| Menu sheet, dialogs, toasts | Opacity only, 120 ms, no travel |
| Accordions and folded sections | Open and close at once |
| Chips, rows, notices | Status changes swap instantly; the 2 s wash on an updated row is a static `--firm-row` until the next visit |
| Loading | Skeletons hold still at 80% instead of pulsing |
| "Same as" | No flash; the fields are marked "filled for you" |
| Firm Rule, timeline | Drawn complete |
| Moving pictures | Final frame; the replay control is hidden |
| The engraving | The typed name appears at once, cut and lit; no glint |
| The engraver film | Doesn't autoplay: its poster shows with the play button |
| Page changes | No View Transitions crossfade |

`prefers-reduced-transparency` turns the paper textures off (4.8). Nothing anywhere carries
information only in motion.

### 12.6 Print

- **The proof** (Hal, Greta, Jun): one stylesheet, US Letter and A4, 0.75 in margins. The Letterhead
  at the top of page 1 with the Firm Rule in its exact colors (`print-color-adjust: exact`); no page
  ground, no shadows; values in Mono at 10.5 pt, labels and fees at 10.5 pt; the rehearsal notice
  as a 0.5 pt dashed box; the code field, comment and buttons hidden, with the filing reference and
  the decide-by line in their place; the Imprint and page numbers ("1 / 2", numerals only) at the
  foot of each page through `@page` margin boxes where supported. The fee table and its total never
  break across pages (`break-inside: avoid`). A firm that prints it holds a printer's proof for the
  client's file.
- **The decision page and a filing's record** print the same way, with the documents listed by name.
- **Terms and Privacy:** Miller Text 11/15 pt, headings in Miller Display, link addresses printed
  after their text, the in-page contents hidden.
- **Everything else:** header, sticky bar, menu, motion, textures and replay controls hidden;
  pictures print in their final state; the Night band prints as Plate Ink text on white with its
  photograph, to save ink; links stay underlined.

---

## 13. Production

### 13.1 Tools and stack

| Job | Tool | Notes |
|---|---|---|
| **Design** | Figma, one library mirroring section 11 one to one | Variables for every token in five modes: CoFile Light, CoFile Night, Firm Light, Firm Night (desk chrome), White label. A **firm collection** with a mode per example firm (Harbor & Pine, Northgate, Best Accounting) and per QA gallery case (3.6), so any frame re-brands in one click (Marcus, Priya, Jun). A small plugin runs the same ink-match code as production, so designers see deepened colors exactly (Elaine, Hal) |
| **Build** | The existing Next.js app in `web/`, React, plain CSS on custom properties in cascade layers (`@layer tokens, base, components, pictures, utilities`) | No CSS framework, no CSS-in-JS runtime. One stylesheet per component, imported by the component |
| **Tokens** | One JSON source → Style Dictionary → CSS custom properties, a TypeScript constants module, and the inline constants for the proof renderer and emails | One source for the site, `src/approvals/render.ts`, `src/comms/` and the Figma variables (Jun, Marcus) |
| **The ink match** | TypeScript with `culori` (OKLCH, gamut mapping, WCAG contrast), run on the server when Branding is saved and cached on the firm record; the same module runs in the browser for the live preview | Unit tests for every rule in 3.6 and a fuzz test of 1,000 random colors asserting every pair it emits passes (Hal, Dev) |
| **Logo processing** | Canvas in the browser at upload (trim, ring sampling, shape class, light-on-transparent detection); `sharp` on the server for older logos and email PNGs | Implements 3.5 step 1 to 6 (Dev, Priya) |
| **Fonts** | Self-hosted WOFF2 subset with `fontTools` (`pyftsubset`) to Latin plus Latin Extended-A, features kept per 5.1; metric-matched fallback `@font-face` rules generated from the fonts' metrics | Firm font metrics stay in `web/lib/fonts.ts` (3.7) |
| **Motion** | CSS transitions and the Web Animations API, triggered by `IntersectionObserver`, in one shared module of about 12 KB; cross-document View Transitions for page changes | No animation library, no Lottie, no video for UI (D2) |
| **The engraving** | three.js at an exact pinned version, lazy-loaded (about 150 KB gzip) only under D2's conditions; an MSDF glyph atlas of the engraving face; the HDRI shot with C1/C3. SVG `feSpecularLighting` fallback, then a still | The only real-time rendering on the site (D1) |
| **Icons and glyphs** | SVG, optimized with SVGO, shipped as one sprite plus inline React components for the glyphs that take `currentColor` | |
| **Email** | MJML, compiled to table HTML with VML buttons for Outlook; plain-text versions generated beside each | Tested in an email testing service across Apple Mail, Gmail (web, iOS, Android), Outlook (Windows, Mac, web), light and dark (most of the ten) |
| **Component workshop** | Storybook, with three toolbar switchers: firm (the three examples and the QA gallery), theme (light, dark, high contrast), locale (English, Spanish, +35% pseudo-locale) | Every story is a visual test |
| **Testing** | Playwright visual regression at 320, 390, 834, 1440 px in both modes, for three firms and the QA gallery, plus the pseudo-locale; axe in CI; automated contrast checks on every token pair and every computed firm token; Lighthouse CI against the budgets below; manual passes with VoiceOver (iOS, macOS), NVDA and TalkBack on the proof, the client form, the desk and the home pictures | Includes the one-Brass-button scroll check (11.1) and the unmoving Imprint check (11.14) |
| **Photography** | Medium-format digital tethered to Capture One, one shared grade (a LUT built on the Cotton white point), retouching in Photoshop; delivered as 16-bit TIFF masters | Web derivatives as AVIF with WebP fallback through `<picture>`, art-directed crops per breakpoint |

**Performance budgets.**

| Measure | Budget |
|---|---|
| Largest paint, home page, mid-range Android on 4G | ≤ 2.0 s. The largest element is the hero h1, never a picture (Marcus, Tomás) |
| Layout shift | CLS < 0.02: every picture reserves its box; fonts swap with metric-matched fallbacks |
| Interaction | INP < 150 ms |
| Fonts on first load, CoFile's pages | < 160 KB (5.1) |
| Script before idle, CoFile's pages | ≤ 90 KB gzip, the motion module included; each moving picture ≤ 40 KB (D2) |
| The engraving chunk | ≤ 160 KB gzip plus its HDRI and atlas (≤ 400 KB), loaded only when its section is within one screen |
| Each photograph | ≤ 220 KB at the largest served crop; the Close's full-bleed ≤ 280 KB |
| Paper texture tiles | ≤ 40 KB each |
| Firm and client pages | ≤ 100 KB script, no WebGL, no video, ever |
| The proof page | Server-rendered, works with no script at all; ≤ 30 KB script for the code field and the zoom overlay |

### 13.2 The design-system files, and tokens as code

**Proposed layout** (paths are proposals for the build team):

```
web/design/
  tokens.json            the one source: color (with dark values), type, space, corners, depth, motion
  build-tokens.mjs       Style Dictionary config → the three outputs below
web/styles/
  tokens.css             generated: :root, the dark media block, [data-theme] blocks (4.9)
  registers.css          the semantic layer of 11.0: .reg-cofile, .reg-firm, .reg-white, .sheet
  base.css               reset, type roles (5.2, 5.3), links, focus ring, selection, print base
  components/*.css       one file per component in section 11
web/lib/design/
  tokens.ts              generated constants (for render.ts, emails, canvas work)
  ink.ts                 the ink match (3.6), shared by server, browser and the Figma plugin
  logo.ts                logo processing (3.5)
  motion.ts              the shared motion module (D2)
web/components/ui/       Button, Link, Field, Select, Checkbox, Radio, ChoiceCard, CodeField,
                         PlateField, SameAs, Fold, Chip, StatusChip, Notice, Toast, Table, Timeline,
                         Dialog, Segmented, Accordion, EmptyState, CodeBlock
web/components/brand/    NamePlate, Wordmark, Lockup, Imprint, Letterhead, FirmRule, MonogramTile,
                         Sheet, Proof, PriceCard, PlanCard, SampleCard, PlateGlyph, GhostLight
web/components/pictures/ the home and inner-page pictures, replacing the stand-ins in Visuals.tsx
                         one by one and keeping each figure's aria-label and caption
```

**Tokens, as they land in CSS.** The palette is 4.9 exactly. Around it:

```css
/* type roles: fluid between 390 and 1440 px, in rem (5.2) */
:root {
  --t-display-xl: clamp(2.625rem, 1.929rem + 2.857vw, 4.5rem);   --lh-display-xl: 1.0556;
  --t-price-xl:   clamp(5.5rem, 3.829rem + 6.857vw, 10rem);        --lh-price-xl: 0.9;
  --t-body: clamp(1.0625rem, 1.039rem + 0.095vw, 1.125rem);        --lh-body: 1.61;
  /* … one pair per token in 5.2 and 5.3 … */

  /* space (6.3) */
  --s-4: 4px; --s-8: 8px; --s-12: 12px; --s-16: 16px; --s-24: 24px; --s-32: 32px;
  --s-48: 48px; --s-64: 64px; --s-96: 96px; --s-128: 128px; --s-160: 160px;

  /* corners and depth (6.4) */
  --r-0: 0; --r-sheet: 2px; --r-device: 44px;
  --e-sheet: 0 1px 1px rgba(29,33,48,.05), 0 10px 28px -10px rgba(29,33,48,.20);
  --e-lift:  0 2px 2px rgba(29,33,48,.06), 0 22px 44px -14px rgba(29,33,48,.24);
  --e-menu:  0 8px 24px rgba(29,33,48,.12), 0 0 0 1px rgba(29,33,48,.06);

  /* motion (D2) */
  --ease-press: cubic-bezier(.3,0,.2,1); --ease-settle: cubic-bezier(.2,.8,.2,1);
  --ease-sweep: cubic-bezier(.45,0,.25,1); --ease-exit: cubic-bezier(.4,0,1,1);
  --t-quick: 120ms; --t-press: 180ms; --t-ink: 260ms; --t-set: 320ms; --t-draw: 600ms; --t-light: 1200ms;
}

/* struck things take the plate's chamfer (6.4) */
.chamfer   { border-radius: 6px; corner-shape: bevel; }
.chamfer-s { border-radius: 4px; corner-shape: bevel; }
@supports not (corner-shape: bevel) { .chamfer { border-radius: 3px; } .chamfer-s { border-radius: 2px; } }

/* the semantic layer (11.0) */
.reg-cofile {
  --page: var(--cotton); --surface: var(--sheet); --text: var(--ink); --text-2: var(--graphite);
  --action: var(--brass); --action-hover: var(--brass-deep); --action-on: var(--ink);
  --link: var(--ink); --link-line: var(--brass-line);
  --focus: var(--ink); --focus-gap: #fff;
  --select: var(--ink); --select-on: #fff; --select-fill: var(--brass-tint);
  --row: var(--cotton-2); --halo: var(--brass-tint); --bullet: var(--brass-line);
}
.reg-firm {
  --page: var(--firm-wash); --surface: #fff; --text: var(--ink); --text-2: var(--graphite);
  --action: var(--firm-fill); --action-hover: var(--firm-fill-hover); --action-on: var(--firm-on);
  --link: var(--firm-ink); --link-line: var(--firm-ink);
  --focus: var(--firm-ink); --focus-gap: #fff;
  --select: var(--firm-fill); --select-on: var(--firm-on); --select-fill: var(--firm-row);
  --row: var(--firm-row); --halo: color-mix(in srgb, var(--firm-tint) 50%, transparent);
  --bullet: var(--firm);
}
/* paper pins its own inks, in either mode (11.0) */
.sheet {
  color-scheme: light; background: #fff; border-radius: var(--r-sheet); box-shadow: var(--e-sheet);
  --ink: #1D2130; --graphite: #555867; --rule: #DDD7CB; --rule-strong: #8A8578;
  --done: #2E6B57; --done-tint: #E4F0EA; --ochre: #855A0C; --ochre-tint: #F7EDD8;
  --madder: #9A2D2D; --madder-tint: #F8E6E3; --iron: #3F434F;
}

/* the focus ring (D5): buttons and links on keyboard focus, fields on any focus */
:where(a, button, summary, [tabindex]):focus-visible {
  outline: 2px solid var(--focus); outline-offset: 2px; box-shadow: 0 0 0 2px var(--focus-gap);
}
:where(input, select, textarea):focus {
  outline: 2px solid var(--focus); outline-offset: 2px;
  box-shadow: inset 0 0 0 1px var(--focus), 0 0 0 2px var(--halo);  /* 2 px border inside, tinted gap */
}
```

**The firm tokens** are written per firm by `ink.ts` when Branding is saved, as a short inline
`<style>` on every firm page (`:root { --firm: …; --firm-2: …; … }`), as inline values in the
proof renderer and the email builder, and as a JSON blob on the firm record for the setup preview.
`--firm-fill-hover` is added to the 3.6 set by the same module (11.1).

**Components read only semantic tokens.** A component stylesheet never names Brass, a firm token
or a hex value; it names `--action`, `--link`, `--surface`. That is what makes the same button
Brass on the home page, Harbor blue on Harbor & Pine's desk and Ember on Northgate's (Priya). A lint
rule (stylelint `declaration-property-value-disallowed-list`) blocks raw hex values in
`components/*.css`.

**Component API, in brief.** Every component takes `register` from context (a
`<Register value="firm" firm={tokens}>` provider sets the class and the firm's inline tokens),
`size` where it has sizes, and `picture` (renders the inert picture state of 11.0). The pictures
in `web/components/pictures/` are built only from these components with the example data of D4,
so a change to a real component changes the picture of it.

### 13.3 The full asset list

| Group | Asset | Formats and variants | Source |
|---|---|---|---|
| **Identity** | The Name Plate mark, three drawings: full (≥ 64 px, bevel and slotted screws), standard (32–63 px), small (< 32 px, dot screws) | SVG, Plate Ink and Brass versions, one-color | Lettering artist, traced from the engraver's 120 mm plate scan (3.2) |
| | Favicon drawing on the 32 × 16 grid, hand-pixelled 16 px master | SVG with a `prefers-color-scheme` swap; ICO 16/32/48 | Lettering artist |
| | App icons | Apple touch 180, PWA 192 and 512, maskable 512 (Plate Ink square, Brass plate at 72%) | Lettering artist |
| | The wordmark, Display and Small masters | SVG; outlined PDF; PNG @1×–3× for email | Lettering artist |
| | Lockups: horizontal (header, footer), stacked (social, 404, CoFile emails) | SVG, light (Plate Ink, Brass Line lozenge) and dark (Night Ink, Brass lozenge) | Lettering artist |
| | The Imprint: "with CoFile" and "Filed with CoFile" | Live-text component; SVG of the wordmark's small master; PNG @2× for email | Lettering artist, built in code |
| | Social card and OG images | 1200 × 630 PNG templates rendered per page at build: the page's h1 in Miller on Cotton with its picture's final frame; the home page's in a dusk version on C4 | Built in code |
| | Usage sheet | PDF, one page | Lettering artist |
| **Type** | Miller Display (Roman, Italic, Semibold) and Miller Text (Roman, Italic) | Web (CoFile's pages only), desktop and app licenses; WOFF2 subsets | Font Bureau through Type Network |
| | Founders Grotesk, Founders Grotesk Text, Founders Grotesk Mono (Regular, Medium) | Web license covering cofile.app, every firm and client page under it, the hosted white-label pages and the embed widget on firms' own sites; desktop and app; WOFF2 subsets | Klim Type Foundry |
| | The engraving face's MSDF atlas | PNG plus JSON, Latin Extended-A | Built from the licensed font, with the foundry's written permission for this use |
| | Metric-matched fallbacks | `@font-face` rules for each family | Built in code |
| **Tokens** | `tokens.json`, `tokens.css`, `registers.css`, `tokens.ts`, the Figma variables | — | Built in code (13.2) |
| **Example firms** (3.8) | Harbor & Pine CPA: square pine-and-waves symbol | SVG, plus a JPEG on a white box (the box-disappearing demo) | Identity studio |
| | Northgate Payroll: wide gate wordmark | Transparent PNG and SVG | Identity studio |
| | Best Accounting: plain wide wordmark | SVG | Identity studio |
| | Two spare firms for Branding and the docs | SVG | Identity studio, names `[copy needed]` (D7) |
| | The QA gallery (3.6): a white logo on transparent, a JPEG on a box, a 64 px raster, a 4000 px raster, an 8:1 wordmark, a logo with 40% padding, a photo as a logo, a script, a condensed font, a 40-character name, a 2-letter name, a Spanish name with accents, no logo; the hostile colors | SVG and raster files, colors and fonts as JSON | Identity studio |
| | Printed props: Harbor & Pine letterhead and business-card proofs (C9), the envelope addressed "Harbor & Pine CPA" (C6) | Print files and printed pieces | Identity studio, printed at a letterpress shop |
| **Photography** (D1) | C1 Harbor & Pine's door, C2 Northgate's door, C3 the blank plate, C4 the blank plate at dusk (lights off and on), C5 the client asks, C6 the papers come home (clean plate and envelope frame), C7 the stage, C8 the firm approves, C9 the proof at the printer, C10 people at the bench (reportage and a square portrait per person, real staff only) | 16-bit TIFF masters; AVIF and WebP at 640, 1280, 1920, 2560 px wide; 4:5 phone crops shot on the day; HDRIs from the plate's position for C1 and C3; screens shot with tracking marks for compositing | Photographer and production team |
| **Film** | C11 the engraver: the 12 s silent site cut | AV1 and H.264 MP4 ≤ 1.2 MB; poster AVIF; a WebVTT text description; ProRes master | Craft-film crew |
| **Engraved vignettes** (D1 kind 4) | The set section 7 specifies; at least D1's four (a clear desk for the desk's empty state, a returned envelope for the documents email and Ready to pay, a phone on a bakery counter for requests, the blank plate for the sign-up and log-in panels and account emails), plus one each for the 404, the signed-out pages and errors | SVG in one ink with `currentColor`, drawn at 4× and checked at 120 and 160 px; PNG @2× for email; light and dark | Steel-engraving illustrator |
| **Icons and glyphs** | About 40 icons (11.17); status glyphs (filled circle, half circle, ring, lozenge, bar); the ghost light (4.4); the four plate glyphs (4.5); list lozenge; drawn arrows and chevrons | SVG on 24, 16 and 12 px grids; one sprite | Icon designer |
| **Textures** | Cotton paper and black card tiles (4.8) | 512 px seamless WebP, ≤ 40 KB each | Reprographic studio, from C12 |
| **The engraving** | The shader with its SVG fallback and still; brass normal and roughness maps from the engraver's test plates | GLSL in a module; KTX2 textures; a still AVIF per state | Creative technologist |
| **Pictures (code)** | Home: the desk, two doors and one page with the wipe, the text to the draft, the proof with its slip, the record with the envelope, the sample cards, the run sheet on the stage, the price card, the blank plate with the name field. Inner pages: the letterhead proof becoming the proof (How it works), the four live brand previews (For firms), the coverage table and stage marks (What we file), plan cards (Pricing) | React components in `web/components/pictures/`, each with its reduced-motion final state, its figure label and caption | Built in code |
| **Email** | One MJML master with two letterheads (the firm's; CoFile's stacked lockup) and every message the product sends (the list is in section 10), each with plain text | MJML source, compiled HTML, plain text | Email developer |
| **Print** | Stylesheets for the proof, the decision page, a filing's record, Terms and Privacy | CSS | Built in code |
| **Library** | The Figma library; Storybook | — | Design team, built in code |

### 13.4 What to commission

| # | Who (kind of studio or artist) | What they deliver | Timing |
|---|---|---|---|
| 1 | **A lettering artist** who works in the engraver's Scotch roman tradition and hints for screens | The CoFile wordmark (Display and Small masters), the "Co" of the Name Plate and the final Name Plate drawings, the hand-pixelled 16 px favicon, the lockups, a one-page usage sheet (3.2, 3.3) | Weeks 1–8; the interim of 3.3 ships from day one |
| 2 | **A hand engraver**: a working bench engraver who still cuts nameplates by hand | Two brass plates ("Harbor & Pine CPA" with the italic ampersand, letters filled black; one blank, same blank), one brushed-steel plate ("Northgate Payroll" in geometric capitals), the Name Plate cut in brass at 120 mm for tracing, three blank brass test plates with practice cuts for the shader's reference; fitting the plates on location; a day at the bench for the film (C11) | Weeks 2–6, before the shoot |
| 3 | **A small identity studio** that has designed for professional-services firms | The example firm identities (3.8: logos, colors, preset fonts), two spare firms, the QA gallery kit, the printed props for C6 and C9 (with a letterpress shop), and a clearance check that no name or mark resembles a real firm's | Weeks 2–5 |
| 4 | **One photographer** for the whole set, strong in interiors, still life and documentary portraits, with a producer, a casting director, a location scout, a prop stylist, a digital tech and a retoucher | C1–C10 per D1 in about seven shoot days (the two doors, with the blank plate and its dusk pass on the Harbor & Pine door's day; the bakery at dawn; a CPA's own office; the desk still life in the studio; a letterpress shop; the theatre; CoFile's own team, only with consent); clean plates, HDRIs, phone crops, screen tracking marks; releases for everyone in frame | Casting from week 2, shoot weeks 6–8, post to week 10 |
| 5 | **A small craft-film crew** (director and camera, an editor, a colorist), ideally the photographer's production | C11, the engraver at the bench and fitting the plate: the 12 s silent site cut, its poster and text description | Shot with the engraver, weeks 5–6; delivered week 9 |
| 6 | **A steel-engraving illustrator** working in one ink, of contemporary things | The vignettes in 13.3 (about ten), light and dark, checked against 3.9 | Weeks 4–10 |
| 7 | **An icon designer** | About 40 icons and every glyph in 13.3, drawn to the plate's 45° chamfer | Weeks 3–7 |
| 8 | **A reprographic scanning studio** | C12: cotton letter paper, heavy card and black card at 1200 dpi, made into seamless tiles | Week 5 |
| 9 | **A creative technologist** (a small interactive studio or an in-house engineer with WebGL craft) | The engraving of a typed name into C3 (WebGL, the SVG fallback and the still), and the Firms signature with the wipe handle, to D2's budgets | Weeks 7–13 |
| 10 | **A motion designer**, for direction only | Timing sheets and browser prototypes for every D3 moment, reviewed against the reduced-motion states; the build team implements | Weeks 6–10 |
| 11 | **An email developer** | Both template families, every message, VML buttons, dark-mode handling, client testing | Weeks 8–10 |
| 12 | **An accessibility consultancy** with older-adult research experience | An audit of the proof, the client form, the desk and the home page (screen readers included); moderated sessions with eight firm owners over 55 and four Spanish-speaking clients over 60, on their own devices (Rosa, Priya, Tomás) | Twice: on the phase 1 build and before launch |
| 13 | **Firm-owner research** (the same consultancy, or a researcher) | Six to eight firm owners see the home pictures and the desk in their own logo and color, loaded through the ink match, before the build is final (Priya) | Week 6 |
| 14 | **A Spanish-speaking typographer** | A review of every page and email set in Spanish: line breaks, headlines, chips, the price card (Tomás) | Before launch |

**Licenses, not commissions:** Miller (Type Network) and Founders Grotesk (Klim). Klim's web license
is priced by pageviews; firm and client pages and the embed are high-volume, so the license must be
scoped to them before launch (the decisions file of the foundation lists the open-licensed
alternative).

**Not commissioned, on purpose:** no 3D studio, no illustration of people, no stock, no motion
house, no custom type family (D1, D2, the foundation's decisions).

### 13.5 The order to build in

Each phase ships on its own, and every page must already sell before any motion is added (Greta,
Tomás). The proof and the client's pages come first (all ten), and the desk is started before the
home page, because real firms and clients use these pages today and the home page's pictures are
built from them: the hero picture is the real desk (Marcus, Priya, Elaine, Dev; decisions file).

| Phase | Weeks | What | Ships |
|---|---|---|---|
| **0. Foundations** | 1–2 | `tokens.json` and its outputs; interim type and fallbacks; `base.css`; the ink match with its fuzz test; logo processing; `Sheet`, `Letterhead`, `FirmRule`, `Imprint`, the interim wordmark; Storybook with the firm, theme and locale switchers. Commissions 1–4 start; casting starts now, because people take longest | Internally |
| **1. The proof and the client's pages** | 2–5 | The core components (buttons, links, fields and forms with paired fields, folds, "Same as", filled-for-you, chips and status, notices, tables, timeline); the proof page in the server renderer with its decision page and print stylesheet; the service page, the client link page, the intake form and its thank-you state; the embed widget; the client and firm emails about a filing | Live: the first thing real users see |
| **2. The filing desk** | 4–8 | The desk shell and navigation (desktop row, phone menu); Filings with its empty state; Filing detail with the timeline and "Your proof is ready"; New filing (state and type pickers, the form); Setup and Branding with its live preview and the ink-match line; client links; requests; signatures; Ready to pay; Billing with plan cards; toasts | Live |
| **3. The home page, still** | 5–9 | Header, footer, beta notice, sticky phone bar, menu sheet; every home picture as live HTML in its final frame; the price card; the coverage tiles. Photographs not yet delivered are held as Cotton 2 frames at their final aspect, never stock | Behind a flag, then live |
| **4. The pages behind it, and the account pages** | 7–10 | How it works, For firms, What we file, Pricing, Security, Questions, For platforms; sign-up (the side panel's blank plate as a still), log-in, password and verification pages; Terms and Privacy with print; 404 and errors; CoFile's own emails | Live |
| **5. Craft lands** | 8–12 | Photographs, the film, the vignettes and textures replace their placeholders; the drawn wordmark replaces the interim in one release, with matched metrics so nothing reflows; firm-owner research (week 6) folded in | Live, piece by piece |
| **6. Motion** | 10–13 | The motion module; the D3 moments in selling order (Firms first, then the hero, the proof, Requests, After, the rehearsal stage, coverage); replay controls; the Firms wipe; the engraving at the Close and at sign-up, SVG fallback first, WebGL last | Live, moment by moment |
| **7. Platforms** | 11–14 | CoFile's dashboard, the API docs with code blocks, the white-label hosted page | Live |
| **8. Passes and launch** | 13–15 | Dark mode, Spanish pseudo-locale and the typographer's review, older eyes, high contrast and forced colors, performance against the budgets, the accessibility audit and fixes | Launch |

---

## 14. What to strip from today's visuals

Visuals only: every word and its order stay. "Today" names what is in the code now
(`web/app/globals.css`, `web/app/landing.css`, `web/components/landing/`, `web/components/`,
`src/approvals/render.ts`, `src/comms/resend.ts`), so the build team can find each one.

| # | Today | Why it goes | In its place |
|---|---|---|---|
| 1 | **The manila folder-tab mark with a check cut into its edge** (`FolderTab` in `Shell.tsx`, its alias `Seal`, the `.seal` class) | A folder says paperwork and a check says "approved": it builds CoFile's mark on verifying, the one story the brand isn't about, and as the most colorful thing in the header it is the opposite of "ours in small type" (all ten) | The Name Plate, blank except for "Co": a plate waiting for the firm's name (3.2) |
| 2 | **The cream and manila palette** (`#F7F3EA` page, `#FFFDF8` surface, `#F3EAD2`, manila `#EBDDB8`, the `#D8D0BF` line), on the site and inline in the proof renderer | Cream tints every firm's color yellow, turns a firm's JPEG-on-white logo into a visible box, and drifts toward old documents and filing cabinets (Hal, Greta, Priya) | Cotton `#FBFAF6` for CoFile's pages; pure white sheets wherever a firm's name appears; the firm's own wash under them (4.2, 3.6) |
| 3 | **Green as CoFile's own color** (`#1F6B4F` for the primary button, `--ok` and every tick; `#6CC29C` in dark) | Green buttons and ticks say "approved, checked, safe", and green is a firm color (Harbor & Pine's Pine, half the CPA firms in the country), so CoFile competes with its own customers (Marcus, Elaine, Tomás) | Brass for the one action on CoFile's pages; the firm's fill on firm pages; Verdigris only for Done (4.3) |
| 4 | **Fixed button colors on firm surfaces**: the proof's default `#1F6B4F` button and the emails' fixed `#1f4fd1` button in `src/comms/resend.ts` | They are CoFile's colors (or nobody's) on the firm's pages, where only the firm's color belongs (Priya, Tomás) | `--firm-fill` with `--firm-on`, from the ink match, on every firm button and email |
| 5 | **White-or-black button text chosen by a luminance cut-off** (`textOn()`), and the help text it forces ("Button text is white, so choose a dark color.") | A threshold isn't a contrast check, and it makes the firm change its brand to suit us (Priya) | The ink match (3.6), which keeps the firm's hue and proves 4.5:1; whether the help text changes is a copy decision (D7) |
| 6 | **IBM Plex Sans, IBM Plex Mono and Source Serif 4**, loaded from Google Fonts on the site and on the proof | The voice of developer documentation; IBM Plex Sans and Source Serif sit in the firm's own font menu, so a firm's pages and CoFile's could look identical; and client pages make third-party font requests (Priya, Dev, Jun, Hal) | Miller for CoFile's voice, Founders Grotesk for every word you read or fill in, Founders Mono for what goes to the state; self-hosted (5.1) |
| 7 | **Type set too small for the buyer**: a 15 px body (`globals.css`), `.small` at 0.86 rem (about 13 px), chips at 12.5 px, `.badge` at 0.78 rem, table heads at 0.82 rem, 12 px mono captions, the 0.68 rem uppercase `.pill`, 13 px state-page rows, and "Built and run by filing professionals…" at 14 px Graphite | A firm owner of 60 reads with glasses on; and setting the lines that sell as fine print says "fine print" (Greta) | An 18 px body, a 14 px floor, 15 px for anything longer than six words; the 13 px Imprint is the only small type (5.2) |
| 8 | **Mono where nothing goes to the state**: the mono kicker (`.nx-kicker`), mono captions, the "01" step counters, the uppercase pills, and every cell of the proof's tables in Plex Mono, fees included | Mono everywhere means nothing; on the proof it makes a bakery's name and its fees look like a log file (Hal, Greta, Priya) | Mono only for values exactly as the state receives them, references, paths and code; fees in tabular Founders (5.5) |
| 9 | **Uppercase, letter-spaced labels** (`.pill`, the docs' `.navhead`) | Capitals are slow for older eyes and run long in Spanish (5.4) | Sentence case everywhere |
| 10 | **A green tick before every list item** (`Tick`, `.nx-list .tick`) | Dozens of identical ticks turn every benefit into a compliance checklist and keep saying "verified" when the copy says "yours" (all ten) | The 7 px lozenge in Brass Line or the firm's color; ticks only inside checkboxes a person ticks (5.4, 11.3) |
| 11 | **The rotated stamp** (`.lp .stamp`: a 2 px bordered label turned −4°) | It imitates an approval stamp, which 3.9 rules out | Nothing: status is a chip with its glyph and words |
| 12 | **Numbered callout discs on the sample proof** (`.nx-callout`, 22 px black circles with mono numerals) | Instruction-manual marks on the one object that should be calmest (Hal, Greta, Rosa) | Marginal numerals with fine leaders, outside the sheet, in the picture's annotation layer only (11.5) |
| 13 | **The highlighter** (`.lp mark`, a manila gradient behind client values) | A schoolbook highlighter on a client's name reads as "something here is wrong" (Marcus, Tomás) | Brass Tint behind travelling phrases in CoFile's marketing pictures only; never on a real page (4.2) |
| 14 | **Yellow and amber boxes for reassurance and rehearsal**: the beta banner's `#FBEFD5` with `#8A5A00` "Beta", the proof's `.note`, rehearsal notices styled `notice warn`, and the amber "held, on purpose" (`.nx-held`) | They turn the free rehearsal, the offer itself, into a warning, and make the stop the loudest line in its picture (Priya, Hal, Greta) | The beta notice on Cotton 2 with the dashed Beta chip; rehearsal notices in dashes and the ghost light; the held line set like every other line (4.4, 11.11) |
| 15 | **The 4 px colored stripe as the firm's brand** (`.branded .topbar` and the proof's `.brandbar`), the firm's name as plain bold text, the logo capped at 40 × 160 px | A stripe isn't a letterhead, and one cap can't fit every shape of logo (Hal, Jun, Priya, Rosa) | The Letterhead: area-sized logo, typeset name, the Firm Rule (3.5) |
| 16 | **CoFile first on the firm's own desk** (`TopBar` with the platform name at the left, the firm's logo shrunk into `.cobrand` at 22 px) and "with CoFile" as loose grey text wherever it lands | It puts CoFile in the firm's place, and the most important CoFile mark was never designed (Marcus, Dev, Priya, Rosa) | The firm's Letterhead leads its desk; the Imprint, one drawn 13 px lockup in a fixed place (3.4, 11.14) |
| 17 | **The firm's name reversed out of a green bar in the pictures** (`.nx-proof-firm`, white on `#2D5B4F`) | It shows a firm as a colored banner, not as stationery, and it isn't how the product renders a firm | The Letterhead on a white sheet in every picture (D1) |
| 18 | **Status by color alone**: `.badge.ok`, `.warn`, `.bad` changing only the text color; the coverage dots (`r3-dot`); the setup steps' filled green dots | Hard to tell apart for older and color-blind eyes, and gone in grayscale or print (Greta, Tomás, Dev) | Glyph, words and tone together (4.3); the plate glyphs for coverage (4.5) |
| 19 | **Rounded everything**: an 8 px radius on cards, buttons, fields and fieldsets; 999 px pills for badges and chips | Soft generic software shapes with no hierarchy (Greta, Elaine) | Paper square-cut at 2 px; the plate's chamfer only on things that are struck (6.4) |
| 20 | **A shadow on every card and a box around every group** (`.card` with `--shadow`; boxed fieldsets; boxed `details.fold`) | When everything floats, nothing is a sheet (Hal) | Shadows only on sheets; cards with a hairline; form sections as rules and space (11.3, 11.4) |
| 21 | **Dashed borders for ordinary things**: repeating groups (`.group-item`), the secret box (`.secret`), the signature pad, the proof picture's rows | Dashed is the rehearsal's mark and must mean only that (4.4) | Solid hairlines; the dashed outline reserved for rehearsals |
| 22 | **Hover by `filter: brightness(1.08)` and disabled by `opacity: .55`** | A filter lightens a firm's color unpredictably; a faded button is illegible | Computed hover fills (11.1); the blind disabled look with its reason in words |
| 23 | **Focus as a green outline on fields only** | Most of the page had no visible focus, and the ring was CoFile's green on the firm's pages | The D5 ring on every focusable element, in the page's own ink |
| 24 | **Traffic-light HTTP method chips** (`.method.GET` green, `POST`, `PUT` amber, `DELETE` red) | Color means status on this site; a DELETE isn't a problem (Hal) | One-ink method chips (11.6) |
| 25 | **Cream code blocks** (`pre` on `#F3EAD2`) and the landing page's dark block with mint strings | Neither belongs to the palette | Plate Ink blocks with four inks; the light variant on the desk (11.15) |
| 26 | **The looping scan highlight** (`TraceScan.tsx` moving a stripe down the run trace every 900 ms) | Nothing on the site loops (D2), and a scanning beam says "inspecting", not "performed" | Pictures that play once and rest; the run sheet cued once under the ghost light (D3) |
| 27 | **The same two-column band for every section** (`.nx-two` at 1fr 1fr with a rule above each `.nx-sec`) | Nine identical spreads read as one long section and nothing earns the next scroll (Marcus, Elaine, Greta) | The bands of 6.5: the zigzag, the full-width coverage and price card, the one Night band, the photograph at the close |
| 28 | **The stand-in pictures** in `Visuals.tsx`: bordered boxes of labeled HTML, look-alike buttons (`.nx-fake`), the "H&P" letters in a box as a logo (`.r3-logo`), the `↓` arrow between the text and the form | They did their job, saying what each picture must show; boxed widgets aren't pictures, fake buttons invite a click, and a placeholder logo makes the example firm, and so the reader's firm, look like a placeholder (Greta, Elaine, Rosa) | Designed live pictures built from the real components, buttons inert, the example firms' real identities, each figure keeping its label and caption (D1, 13.3) |
| 29 | **The proof page as it renders today** (`render.ts`: an 860 px column on cream, IBM Plex, a yellow `.note`, mono cells, the 4 px brand bar) | It is the page the firm signs, and it looks like a log printout under a stripe | The proof of 11.5: a 760 px white sheet on the firm's wash under its own Letterhead |
