# CoFile website design spec: "In register" (En registro)

**Designer:** Rosa Delgado, accessibility and civic service design lead (Los Angeles and San Juan)
**Date:** November 26, 2026
**For:** the CoFile build team, with the brief of Nov 26 (`docs/design-specs/BRIEF.md`)
**Status:** design direction plus a buildable system. The copy is quoted as it is in the repo. Anything I think should change in the words is in Appendix B, never in the design.

---

## 1. Who I am, and how that shapes this design

For twelve years I rebuilt government forms: benefit applications, DMV renewals, a disaster-aid claim that had to work on a borrowed phone in a shelter. I'm bilingual, I'm a certified accessibility professional, and I test with the people most sites forget: adults over 65, low-vision readers at 300% zoom, screen-reader users, people with tremors, Spanish-first readers, and anyone on a cheap Android phone with one bar of signal.

So my measure for CoFile is simple. Picture Ana Ortiz, the example client on the home page. She's on a five-year-old Android phone with a cracked screen, on the bus in Jersey City, reading Spanish first. She's about to approve a $103.50 state fee she can't get back. If she can read the proof, understand it, approve it with confidence and know what happens next, then the 60-year-old CPA and the developer will manage too. **Everyone finishes** is the test for every screen in this spec.

That shapes four choices you'll see all the way through:

1. **Client pages are held to a higher standard than marketing pages.** The proof and the intake form meet WCAG 2.2 AA everywhere, and AAA for text contrast (7:1), target size (44 px minimum, 48 px on phones), focus appearance and reading support. These are the pages where a mistake costs money and can't be undone.
2. **A firm's brand rides on top of an accessible base and never replaces it.** Thousands of firms will pick colors I'll never see. The system has to make their pages look like theirs and still pass, automatically.
3. **Words come before pictures, and text before images.** Every picture of a state page has a plain-text twin. Every status has a word as well as a color and a shape.
4. **Inclusive design is not a beige design.** I draw on two print traditions I love, and I want this to be the most beautiful filing site anyone has used.

---

## 2. The concept: In register

In a print shop, a sheet is **in register** when every color plate lands exactly where it should. When the plates slip, you get a ghosted edge, the classic proof error a pressman catches before the run. In Spanish, *registro* also means the public registry where a business is recorded: in Puerto Rico, the *Registro de Corporaciones*. CoFile is about registration in both senses.

**The idea the whole design hangs on: what the client approves, what the state's page shows and what's paid must line up exactly. If they don't, CoFile stops.** The design makes that alignment visible.

- **The proof is framed by printer's corner marks.** Three corners plus a check that takes the place of the fourth. It's the logo, the frame of every proof, and the motion when a client approves: the marks close into register.
- **The rehearsal log and the filing timeline use the same mark** for each line that lined up ("matched the proof", "matches the proof"), and a hold glyph for the one step held on purpose.
- **The grid is strict.** Labels and values sit on shared baselines, fees align on the decimal point, and the state's review page sits next to its plain-text twin line for line. Alignment is how this brand says "checked".
- **The theming system works the same way.** Each firm's color is "registered" against the accessible base: adjusted just enough to pass, never allowed to knock the reading out of line.

Two traditions feed the visual language. I'm drawing on the genres, not copying any one maker:

- **The printer's proof:** corner and crop marks, the sign-off box, the honest grid of a proof sheet, numbers set in a typewriter-like mono.
- **Mid-century Caribbean community-education print:** the silkscreened posters and booklets made to explain civic processes plainly to readers of every literacy level. Flat color, visible paper, big friendly type, a human hand in the drawing. That tradition is the ancestor of plain-language design, and it belongs to the communities CoFile's clients come from.

Why it fits CoFile: the product's whole promise is "stop and ask rather than guess". In register is that promise turned into a visual system. It's warm, it's a craft, it's civic, and it isn't the generic look of tech startups. It also gives "rehearsal" a natural place. In a print shop you pull a proof before the run, so you rehearse before you file.

### The three rules every screen follows

| Rule | What it means in practice |
|---|---|
| **Everything lines up** | 4 px baseline grid; label/value pairs aligned; tabular numerals; decimal-aligned fees; the state's page and its text twin in step. |
| **Plain first** | Text before images; one task per screen on phones; status words always shown, never color alone; no icon without a visible label. |
| **Everyone finishes** | Every flow tested at 320 px width, 400% zoom, with VoiceOver, TalkBack and NVDA, in Spanish, on a slow 3G profile, before it ships. |

---

## 3. Brand identity

### 3.1 The mark: "the open frame"

Draw it on a 24 × 24 unit grid. The final artwork is vector. Hand it to the illustrator exactly like this:

- **Frame:** three L-shaped corner brackets at the **top-left, bottom-left and bottom-right** corners of a square from (2, 2) to (22, 22). Each bracket has two arms **7 units** long measured from the outer corner, a stroke **2.5 units** thick, square ends and a sharp mitered outer corner, like a printer's crop mark.
- **The check, in place of the fourth corner:** one continuous stroke, 2.5 units thick, with round caps and a round join. It runs from (7, 12.5) down to (10.5, 16) and then up to (21, 5). The long arm ends where the missing top-right bracket would be, so **the check completes the frame**: the proof, approved, and on its way.
- **Optical correction:** the check's long arm is 0.25 units thinner at its tip than at the join, so it doesn't look heavier than the brackets at small sizes. At 16 px and below, use the **pixel version**: a 3-unit stroke, with every point snapped to whole pixels.
- **Color:** frame in Tinta `#141B26`, check in Añil `#2A3A94` (on dark: frame Papel `#F2EFE9`, check `#A9B5FF`). Single-color versions are all Tinta or all Papel. The check is **never green**. Green belongs to the "Approved" and "Live" status in the product, and the logo must not look like a status.

Why not a checkbox? A checked checkbox is a closed square. The open frame never closes on screen, except in one moment: approval (see 8.3).

### 3.2 The wordmark

"CoFile": capital C, lowercase o, capital F, lowercase i-l-e, always one word. It's custom lettering, commissioned from a lettering artist, based on Literata SemiBold at optical size 48:

- Cap height 0.70 em, x-height 0.50 em, spacing tightened by 10 units per 1000. The "o" is optically enlarged by 2% so it doesn't look small between the capitals.
- **The dot of the "i" is a small square** with sides equal to the mark's stroke at lockup size. It's the "register dot", the one place the frame's geometry appears inside the letters.
- The "F" crossbar is shortened by 6% so it doesn't collide with the square dot.
- No italic, outline, shadow or gradient versions.

### 3.3 Lockups and usage

| Lockup | Construction | Minimum size |
|---|---|---|
| Horizontal (default) | Mark, then a gap of 0.4 × mark height, then the wordmark; wordmark cap height = 0.58 × mark height, baseline aligned to the bottom brackets | 96 px wide on screen, 22 mm in print |
| Stacked | Mark centered over the wordmark, with a gap of 0.3 × mark height | 64 px wide |
| Mark alone | App icon, favicon, avatar for CoFile's own emails | 16 px (pixel version) |

- **Clear space:** half the mark's height on every side.
- **Backgrounds:** Papel, white, Tinta or Añil only. Never on a photograph without a solid plate behind it.
- **Never:** recolor the mark in a firm's color, rotate it, close the frame (except in the approval motion), animate it on page load, or put it on a client-facing page bigger than the "with CoFile" mark allows.
- **Favicon set:** a 16 px pixel mark; 32, 180 (Apple touch) and 512 px versions with the mark on a Papel square with 22% corner radius; a monochrome SVG `mask-icon`.

### 3.4 The "with CoFile" co-brand mark

On a firm's pages, the only sign of CoFile is "with CoFile" (locked copy). It's small print, but it has to stay legible, because hiding the platform completely would be its own kind of dishonesty.

- **Construction:** the word "with" in Atkinson Hyperlegible Next Regular, then the CoFile wordmark scaled so its cap height matches the cap height of the surrounding text. No mark. Words only.
- **Size:** 15 px text on the web (never smaller), 14 px in email. Color Ink 2 `#3B4556` on the firm bar's surface: **9.67:1** on white, **9.04:1** on Papel.
- **Placement:** the right end of the firm bar on screens 640 px and wider. On phones, it sits on its own line under the firm's name at the left, so it never competes with the logo for width. In emails, it goes in the footer line. On the embedded widget, the locked line "Filed with CoFile" sits at the foot of the form.
- **Never:** above or before the firm's name, taller than 40% of the firm logo's height, or in a firm's color. On the proof and the intake form it's **not a link**, which means one less tab stop in the middle of a critical task. It's plain text, so a screen reader reads it as "with CoFile".

### 3.5 Voice of the visuals

Calm, exact, warm. Flat color, real paper texture used sparingly (only in illustrations and the home hero's background, at 4% opacity, never behind text that matters), generous white space, and one strong color at a time.

---
## 4. Color

### 4.1 Principles

1. **Action and status are separate color families.** Today, green means both "approved" and "the button that moves a filing forward", and a firm's color replaces green on its pages. That mixes up what something *is* with what you can *do*. In this system, **action color** (CoFile's Añil, or the firm's clamped color) is only for buttons and links. **Status colors** (approved/live, rehearsal, stop, information) are fixed system tokens that no firm can ever change.
2. **No color carries meaning alone.** Each status has a word, an icon shape and a color, so it still reads in grayscale, in Windows contrast themes and for the 1 in 12 men with a color-vision difference.
3. **Contrast targets:** body text at least **7:1** on client pages and at least 4.5:1 elsewhere (most of ours exceed 7:1 anyway). Large display text at least 4.5:1. Input borders, focus rings and icons that carry meaning at least **3:1** against what's next to them.

Every ratio below was measured with the WCAG 2.x relative luminance formula. Background is the second value in each pair.

### 4.2 Core tokens, light

| Token | Hex | Use | Measured contrast |
|---|---|---|---|
| `--paper` (Papel) | `#FAF7F1` | Page background | — |
| `--surface` | `#FFFFFF` | Cards, fields, the proof sheet | — |
| `--sunk` | `#F1ECE3` | Wells, code background, table stripes, beta notice | — |
| `--ink` (Tinta) | `#141B26` | Body text, headings | 16.17 on paper, 17.29 on surface, 14.70 on sunk |
| `--ink-2` | `#3B4556` | Secondary text, help text, captions | 9.04 on paper, 9.67 on surface, 8.22 on sunk |
| `--ink-3` | `#566173` | Meta (dates, "example" tags); never task-critical | 5.86 on paper, 6.26 on surface, 5.32 on sunk |
| `--line` | `#D6CFC2` | Dividers only (decorative, carries no meaning) | 1.55 on surface |
| `--line-strong` | `#77705F` | Field borders, checkbox and radio outlines, table header rules | 4.60 on paper, 4.92 on surface (needs 3:1) |
| `--anil` (Añil) | `#2A3A94` | CoFile action color: primary buttons, links | 9.85 white-on-Añil; 9.21 on paper |
| `--anil-hover` | `#1F2C78` | Hover and pressed | 12.43 white-on |
| `--anil-tint` | `#E7EAF8` | Selected rows, current nav item, chosen radio card | Añil text on it: 8.22; ink: 14.43 |
| `--focus` | `#141B26` | Focus ring (outer), with a 2 px `--paper` gap inside it | 16.17 on paper |

Añil ramp (illustration, charts, firm-less default theme): 50 `#EEF0FB`, 100 `#E7EAF8`, 200 `#C9CFF0`, 300 `#A9B5FF`, 400 `#7F8DDB`, 500 `#5263C2`, 600 `#3A4BAA`, 700 `#2A3A94`, 800 `#1F2C78`, 900 `#151E52`.

Illustration-only accent, never used in the UI: Flamboyán `#C2410C` (4.84 on paper). It's the flame-tree orange of the posters. It only appears inside commissioned illustrations, so it can never be mistaken for a stop.

### 4.3 Status tokens, light (fixed: never themed)

| Status family | Text `--x-text` | Tint `--x-tint` | Fill `--x-fill` (icons, bars) | Text on tint | Fill vs paper |
|---|---|---|---|---|---|
| **Approved / Live / done** | `#13543A` | `#E2F1E8` | `#1F7A4D` | **7.63** | 4.97 |
| **Rehearsal / planned hold / needs someone** | `#6B4100` | `#FCEFD3` | `#9C6200` | **7.74** | 4.72 |
| **Stop / error / rejected** | `#8E1D14` | `#FBE5E1` | `#B3261E` | **7.45** | 6.11 |
| **Information / in progress** | `#24507A` | `#E5EEF7` | `#24507A` | **7.15** | 7.84 |
| **Neutral / not started** | `#3B4556` | `#F1ECE3` | `#77705F` | 8.22 | 4.60 |

White text on the solid fills (used only for counts in badges): approved 5.32, rehearsal 5.05, stop 6.54. These pass AA for the 16 px bold badge numerals they're used for.

**Icon shapes, which carry the meaning without color:**

| Family | Glyph (24 px grid, 2 px stroke) |
|---|---|
| Approved / Live | Solid disc with a check knocked out |
| Rehearsal / held | Ring with two vertical bars inside: "held, on purpose" |
| Stop | Octagon with a horizontal bar |
| Information / in progress | Ring with a quarter arc filled. It's static: progress is never shown by spinning alone |
| Neutral / planned | Dashed ring |

### 4.4 Dark tokens

Dark mode follows `prefers-color-scheme`, with a manual override in the desk and dashboard account menu. Client pages follow the device setting only. That means one less control to find on a page where the task is to approve.

| Token | Hex | Measured |
|---|---|---|
| `--paper` | `#0F141B` | — |
| `--surface` | `#161D27` | — |
| `--raised` | `#1D2632` | Menus and dialogs. Dark mode shows elevation with lighter surfaces, not shadows |
| `--sunk` | `#0B1016` | — |
| `--ink` | `#F2EFE9` | 16.11 on paper, 14.77 on surface, 13.30 on raised |
| `--ink-2` | `#C5CBD5` | 11.33 on paper, 10.39 on surface, 9.36 on raised |
| `--ink-3` | `#9AA3B1` | 7.26 on paper, 6.66 on surface, 6.00 on raised |
| `--line-strong` | `#7C8696` | 4.61 on surface, 5.02 on paper |
| `--anil` | `#A9B5FF` (with `--paper` text on buttons) | 9.45 text-on-fill; 8.67 as link on surface |
| `--anil-hover` | `#C3CCFF` | — |
| `--anil-tint` | `#1E2547` | — |
| `--focus` | `#F2EFE9` | 16.11 on paper |
| Approved text / tint | `#7ED6A2` / `#13291E` | 8.82 |
| Rehearsal text / tint | `#F5C36A` / `#2E2410` | 9.37 |
| Stop text / tint | `#FF968A` / `#341614` | 7.85 |
| Information text / tint | `#9CC7F0` / `#15263A` | 8.64 |

Status fills in dark use the text values. Dark paper text on them: approved 10.59, rehearsal 11.35, stop 8.79.

### 4.5 Data visualization

Charts in the dashboard (filings by status, by state, by month) use the status fills for status series. Series that aren't statuses (states, months) use the Añil ramp 300, 500, 700 and 900, plus `--line-strong`, never a status color. Every chart has a "View as table" toggle that shows a real `<table>` (copy needed, Appendix B). No chart is the only place a number appears.

### 4.6 Forced colors and print

- In `forced-colors: active` (Windows contrast themes), chips, notices and buttons get a 1 px `CanvasText` border so their shape survives when backgrounds are removed. Icons use `currentColor`, and the focus ring uses `Highlight`.
- In print, the proof prints in Tinta on white, with status words and shapes but no tints. The firm's logo prints in its own colors.

---

## 5. Typography

### 5.1 Typefaces

| Role | Typeface | Why |
|---|---|---|
| **Display and headings, legal long-form** | **Literata** (TypeTogether; variable, opsz 7–72, weights 200–900; SIL Open Font License) | A screen-first book serif with sturdy serifs and open counters, from a foundry with deep Latin American roots. It has full Spanish and Latin Extended support, it's warm without being nostalgic, and its optical sizes let headlines tighten while Terms text stays open. |
| **UI and body text** | **Atkinson Hyperlegible Next** (Braille Institute; variable, weights 200–800; OFL) | Designed for low-vision readers. Its letters are told apart by shape: I, l and 1 differ, the 0 is not an O, and b, d, p and q aren't mirror images. It has a large x-height and was drawn for over 150 languages. |
| **Mono for fees, codes, references, state data** | **Atkinson Hyperlegible Mono** (Braille Institute; OFL) | Tabular figures, a slashed zero, and the same letter-shape distinctions as the sans. Used for "$103.50", "TWO SISTERS BAKERY LLC" as the state will see it, filing references, API keys and the EIN. |

All three are open-licensed. That matters here: these fonts are served on thousands of white-label pages, inside emails and on the engine-rendered proof, with no per-domain licensing to track. **Self-host every file** from `cofile.app` and `api.cofile.app`, subset to Latin, Latin-1 Supplement and Latin Extended-A, and stop loading Google Fonts on the proof. A client's IP address shouldn't go to a third party just to render a filing page.

**Commission:** a small type studio to draw a **"fee figures" stylistic set** for Atkinson Hyperlegible Mono: a larger, clearer dollar sign, a period that is 15% heavier so "$103.50" can never read as "$10350" at low resolution, and a tuned ¿ and ¡ for the sans. It ships under the OFL's terms as a separately named family.

### 5.2 Scale

The root stays at the browser default (16 px), and every size is in rem, so a reader's own text-size setting scales everything. Line heights sit on a 4 px baseline.

| Style | Font, weight | Size (phone → desktop) | Line height | Tracking | Use |
|---|---|---|---|---|---|
| Display | Literata 600, opsz 72 | `clamp(2.5rem, 1.6rem + 3.6vw, 4rem)` (40 → 64 px) | 1.08 | −0.015em | Home H1 only |
| H1 | Literata 600, opsz 48 | `clamp(2rem, 1.5rem + 2vw, 2.75rem)` (32 → 44 px) | 1.15 | −0.01em | Page titles, section headlines on home |
| H2 | Literata 600, opsz 32 | `clamp(1.625rem, 1.3rem + 1.4vw, 2.25rem)` (26 → 36 px) | 1.2 | −0.005em | Sections |
| H3 | Atkinson Next 700 | 1.375rem (22 px) | 1.3 | 0 | Cards, security blocks |
| H4 | Atkinson Next 700 | 1.1875rem (19 px) | 1.35 | 0 | Fieldset legends, proof section heads |
| Lede | Atkinson Next 400 | 1.25rem (20 px) | 1.55 | 0 | Section intros on home |
| **Body, client pages** | Atkinson Next 400 | **1.125rem (18 px)** | **1.6** | 0.005em | Proof, intake, client emails |
| **Body, CoFile pages** | Atkinson Next 400 | 1.0625rem (17 px) | 1.6 | 0.005em | Home, desk, dashboard, docs |
| Label | Atkinson Next 700 | 1.0625rem (17 px) | 1.4 | 0 | Field labels. Labels are bold, never gray |
| Help | Atkinson Next 400, ink-2 | 1rem (16 px) | 1.5 | 0 | Help text under fields |
| Small | Atkinson Next 400, ink-2 | 0.9375rem (15 px) | 1.5 | 0.01em | Captions, footer legal line. **Never for anything needed to finish a task** |
| Table | Atkinson Next 400 | 1rem (16 px) | 1.45 | 0 | Dense tables in desk and dashboard |
| Mono | Atkinson Mono 400 | 0.95em of context | inherit | 0 | Codes, references, state data |
| Fee total | Atkinson Mono 700, fee figures | 1.5rem (24 px) | 1.25 | 0 | "Total to the state", "Total" |

**Nothing on the site is set below 15 px.** Today's app uses 15 px body text and 13.4 px help text, and that's the first thing I'd change.

### 5.3 Rules

- **Measure:** 66 characters at most for body text, 58 on client pages. The lede is capped at 60ch, as today.
- **Weights:** two in use per face (Literata 600; Atkinson Next 400 and 700; Mono 400 and 700). That keeps font bytes down: about 92 KB of WOFF2 in total, subset.
- **No all-caps for UI.** Uppercase only where it *is* the data, for example the business name as the state will record it. Kickers are sentence case.
- **Italic:** only for the names of documents in legal text. Never for emphasis on client pages, because italics are harder for low-vision and dyslexic readers.
- **Numbers:** `font-variant-numeric: tabular-nums lining-nums` everywhere numbers stack. Money always shows cents ("$100.00", never "$100"). Fee columns are right-aligned on the decimal point.
- **Text spacing (WCAG 1.4.12):** layouts must survive a 1.5 line height, 0.12em letter spacing and 0.16em word spacing applied by the reader. Fixed heights on text containers are banned.
- **Fallbacks with matched metrics:** `@font-face` fallbacks use `size-adjust`, `ascent-override` and `descent-override` on Arial and Georgia, so the swap on a slow connection doesn't move the approve button under someone's thumb.

---
## 6. Layout

| Item | Spec |
|---|---|
| **Breakpoints** | Design starts at **320 px** (that's 1280 px at 400% zoom, WCAG 1.4.10), then 480, 640, 768, 1024, 1280, 1440. |
| **Grid** | 4 columns under 640 px (16 px gutters, 16 px side margins plus safe-area insets); 8 columns from 640 to 1023 px (20 px gutters, 32 px margins); 12 columns from 1024 px (24 px gutters, max content 1200 px). |
| **Widths** | Reading column 680 px; client pages 640 px (the proof and the intake are one column at every width); app content 1200 px with a 248 px sidebar. |
| **Spacing scale (px)** | 4, 8, 12, 16, 24, 32, 48, 64, 96, 128. Section padding on home: 64 on phones, 96 on tablets, 128 on desktop. |
| **Radii** | 4 px (chips, code), 8 px (fields, buttons), 14 px (cards, the proof sheet), 999 px (only for the round "same as" chips and avatars). |
| **Elevation (light)** | e0 flat with a `--line` border (default for cards). e1 `0 1px 2px rgba(20,27,38,.08)` (sticky bars). e2 `0 8px 24px -12px rgba(20,27,38,.28)` (menus). e3 `0 24px 48px -16px rgba(20,27,38,.36)` (dialogs). In dark mode, elevation is shown with `--surface` and `--raised`, not shadows. |
| **Targets** | **44 × 44 px minimum** everywhere (AAA 2.5.5), **48 px tall** for every control on client pages, and **56 px** for the proof's approve button. At least 8 px between adjacent targets; **24 px between Approve and Request changes**. |
| **Sticky elements** | At most one per screen (the desk top bar *or* a form action bar, never both). `scroll-padding-top` equals the sticky height plus 16 px, so a focused field is never hidden behind it (WCAG 2.4.11). |

---

## 7. Imagery

**Photography: commission, never stock.** Hire a documentary portrait photographer who works in the communities CoFile serves: northern New Jersey, the five boroughs, South Florida and Puerto Rico's diaspora. Shoot real firm owners and staff (40 to 70, at their own desks), and real first-time owners (a bakery, a landscaping crew, a nail studio, a home-care agency). Use natural light. Hands holding phones that show the real proof. Get a written release from everyone and pay them. Rules: photos never carry information, have empty `alt` unless they show something the text doesn't, and are never placed behind text.

**Illustration: commission a printmaker-illustrator** who works in two- and three-color screenprint. Pull real prints, scan them at 1200 dpi and vectorize them, with the paper grain on a separate layer (under 30 KB per image). The palette is Tinta, Añil 300 and 700, Papel and Flamboyán. A one-pixel misregistration between plates is allowed **in illustrations only**, never on text or UI. Subjects: a sheet passing through three hands (firm, client, state); a stage with the curtain down (rehearsal); a filing desk tray, empty (empty states); a stack of returned papers with a seal (documents back).

**Product imagery: real screens only**, drawn from the live components with the home page's test data (Harbor & Pine CPA, Two Sisters Bakery LLC). Every product image on the home page is **live HTML, not a picture**, so a screen reader can read it and it reflows at zoom.

**Data visuals:** the coverage ladder (9.10), the filing timeline (9.6), the rehearsal log (10.1, section 8) and dashboard charts (4.5). Each has a text or table twin.

**No 3D, no video backgrounds, no Lottie.** They cost bytes on cheap phones and tell nobody anything.

**Icons:** an original set on a 24 px grid with a 2 px stroke, round joins and 2 px internal padding. Around 60 icons, each with a visible text label next to it. No icon-only buttons except Close in a dialog, which has an accessible name.

---

## 8. Motion and interaction

### 8.1 Principles

1. **Motion explains a change of state.** It's never there to decorate, and it never loops.
2. **Full-page navigation is instant.** No page transitions. Slow is not the same as careful.
3. **Nothing moves on its own for more than 5 seconds** (WCAG 2.2.2), and nothing flashes.
4. **Reduced motion is a first-class design, not a fallback.** It's used whenever `prefers-reduced-motion: reduce` is set or "Reduce motion" is chosen in account settings (copy needed). Transforms are swapped for an opacity change of 120 ms or less, or for nothing.

### 8.2 Tokens

| Token | Duration | Easing | Use |
|---|---|---|---|
| `--dur-instant` | 80 ms | linear | Pressed states |
| `--dur-quick` | 140 ms | `cubic-bezier(0.2, 0, 0, 1)` | Hover, focus, chip changes |
| `--dur-base` | 220 ms | `cubic-bezier(0.2, 0, 0, 1)` | Disclosures opening, menus |
| `--dur-exit` | 160 ms | `cubic-bezier(0.3, 0, 1, 1)` | Anything leaving |
| `--dur-register` | 480 ms | `cubic-bezier(0.34, 1.2, 0.64, 1)` (slight overshoot) | The register moment only |
| `--delay-spinner` | 400 ms | — | A loading indicator appears only if a wait lasts longer than this |

### 8.3 Signature moments

1. **The register (approval).** When the client presses "Approve, and authorize submission and payment" and the server confirms, the decision page loads with the proof's frame. The three corner marks move 4 px inward, the check draws its stroke (`stroke-dashoffset`, 320 ms) into the fourth corner, and the frame is closed: in register. The heading "Approval recorded" holds focus throughout. With reduced motion, the closed frame simply appears.
2. **The rehearsal log (home, section 8).** When it scrolls into view, the seven lines appear one every 280 ms (about 2 seconds in total). Each "filled", "passed", "matched the proof" and "matches the proof" gets a small register mark. The last line, "Pay Now: held, on purpose", gets the rehearsal hold glyph and a 2 px amber rule. It plays once and ends in a static state. With reduced motion, all lines are there from the start.
3. **"Same as" copy.** The fields that were filled get a `--anil-tint` background that fades out over 600 ms, so you can see what changed. A polite live region says what was copied (copy needed).
4. **Coverage ladder.** On first view, each row's meter fills to its rung (220 ms, staggered 30 ms). With reduced motion, it's static.

### 8.4 Loading

- **Short waits** (under 400 ms): nothing. **Longer waits:** the button's own label changes to its existing pending text ("Sending…", "Saving…", "Creating…", "Confirming…"), a 16 px progress ring appears inside the button, the button's width is locked, and `aria-busy="true"` is set on the form.
- **Long processes** (getting the state's review page can take minutes): never an endless spinner. Show the timeline with the current status "Getting the state's review page", its next-step sentence, and the time it started.
- **Skeletons** only in the desk and dashboard lists, as static blocks (no shimmer), with `aria-busy` on the region.
- **Haptics:** one 10 ms vibration on Android when an approval is recorded. Off with reduced motion.

---
## 9. Components

Every component exists in light, dark and forced-colors versions, and is specified for 320 px width and 200% text.

### 9.1 Focus (applies to everything)

A two-tone ring: 2 px `--paper` gap, then a 3 px `--focus` outline (`outline: 3px solid var(--focus); outline-offset: 2px`, plus `box-shadow: 0 0 0 2px var(--paper)` on the element). It contrasts **16:1** with the page whatever color a firm's button is, because the ring always sits on paper. It shows on `:focus-visible` only. It's never removed and never animated. This meets 2.4.13 Focus Appearance (AAA).

### 9.2 Buttons

| Variant | Light | Use |
|---|---|---|
| Primary | Fill `--action` (Añil, or the firm's clamped color), text `--action-text`, 8 px radius | One per view: "Run a free rehearsal", "New filing", "Send the proof to my client", "Approve, and authorize submission and payment" |
| Secondary | `--surface` fill, 2 px `--line-strong` border, ink text | "See what your client sees", "Request changes", "Send a client a link" |
| Quiet | No fill, ink text, underline on hover | Toolbar actions, "Same as" chips (with a pill border) |
| Danger | `--surface` fill, 2 px `--stop-fill` border, stop text, octagon icon | "Revoke", "Disconnect", "Turn off", "Remove" |

**Sizes:** 48 px (default), 56 px (proof approve, full-width on phones), 44 px (dense tables). Horizontal padding is 24 px, and labels wrap to two lines rather than truncate. **Spanish labels run about 30% longer, so buttons never have a fixed width.**

**States:** default; hover (fill moves to `--action-hover`, 140 ms); pressed (80 ms, no movement); focus (9.1); **loading** (8.4); **disabled is avoided**. A button stays pressable, and pressing it explains what's missing through the error summary. Where disabling is unavoidable (a second press while one is already sending), it uses `aria-disabled`, keeps 4.5:1 text contrast and keeps its focus.
**Button state matrix (CoFile's own pages; firm pages swap in the clamped action ramp from section 11):**

| State | Primary, light | Primary, dark | Secondary, light | Danger, light |
|---|---|---|---|---|
| Default | `#2A3A94` fill, white text (9.85) | `#A9B5FF` fill, `#0F141B` text (9.45) | white fill, 2 px `#77705F` border, ink text (17.29) | white fill, 2 px `#B3261E` border, `#8E1D14` text (8.99) |
| Hover | `#1F2C78` (12.43) | `#C3CCFF` (11.80) | `#F1ECE3` fill (14.70) | `#FBE5E1` fill (7.45) |
| Pressed | `#151E52` (15.68) | `#DDE2FF` (14.43) | `#E9E4DA` fill (13.65) | `#FBE5E1` fill, border `#8E1D14` |
| Focus-visible | Default look plus the 9.1 ring | Ring in `#F2EFE9` | Ring | Ring |
| Loading | Default fill, pending label, 16 px ring icon, width locked | Same | Same | Same |
| Unavailable (`aria-disabled`) | `#C9CFF0` fill, ink text (11.25), a 2 px dashed `#77705F` border so the shape survives (the fill alone is 1.44 vs paper) | `#232D3A` fill, `#9AA3B1` text | `#E9E4DA` fill, ink-2 text (7.63) | Same as secondary |

Opacity is never used to show an unavailable button: a faded label fails contrast for exactly the readers who most need to know why they can't go on.


### 9.3 Fields

- **Anatomy:** label (bold, above the field, never a placeholder standing in for a label), help text (under the label, linked with `aria-describedby`), control, error message (under the control). The control is 48 px tall with a 2 px `--line-strong` border (4.92:1), 8 px radius and 18 px text on client pages.
- **Paired fields** ("field-row n2/n3", ZIP next to state): side by side only at 560 px and wider, always in reading order.
- **States:** default; hover (border Tinta); focus (ring); filled; **prefilled from the firm's saved answers** (a 4 px `--anil-tint` left rule. Its meaning goes in the help text, copy needed); **error** (border 2 px `--stop-fill`, an octagon icon and the error text in `--stop-text` under the control, with "Error:" visually hidden before it, copy needed); read-only (sunk fill, dashed border).
- **Error summary:** at the top of the form, a stop notice with a heading (the existing "Please fix these and submit again.") and a list in which **each issue is a link to its field**. On a failed submit, **focus moves to the summary** (today the page only scrolls). The summary keeps `role="alert"`.
- **Choices:** radios and checkboxes are 24 px boxes inside 48 px-tall label rows, so the whole row is the target. Yes/No sit inline only at 480 px and wider.
- **"Same as" / "Same person as":** a row of pill buttons (44 px) above the address or name. Each shows the source label ("Main business address") or the person's name. After a copy, the pressed chip shows a check for 2 seconds and the live region announces it.
- **Folded sections and "More options (optional)":** native `<details>` with a 48 px summary row and a rotating chevron (a 90° rotation over 220 ms; reduced motion: a swap). They open by themselves when they hold an answer or a problem, as today.
- **SSN and FEIN:** `inputmode="numeric"`, `autocomplete="off"`, paste allowed, dashes optional. A Show/Hide toggle (copy needed). On blur, the field shows only the last four.
- **Dates:** a date of birth is three labeled fields (month, day, year, copy needed), because a native date picker on Android with TalkBack is slow to work through when the year is decades back. Other dates keep the native picker.
- **Signature:** the pad (always light "paper", as today) is 160 px tall with a clear-and-redraw control. **I'm asking for a typed alternative as well** (Appendix A): a name typed and shown in a signature-style font, for people who can't draw with a finger. Counsel must approve it.
- **File (PDF):** a large drop zone that's also a 48 px button; the selected file shows name, size and remove. "A PDF of 10 MB or less, without a password." stays as the help text.
- **Authorizations:** each statement in its own 48 px-minimum card with a checkbox, the full text readable, and "Please confirm." placed inline with the stop styling when missing.
**Field anatomy and error state (phone, client page):**

```
Business name *                     ← label, 17px bold, ink
The name the state will record.     ← help, 16px ink-2 (from the form's own help)
┌──────────────────────────────────┐
│ Two Sisters Bakery               │ ← 48px, 18px text, 2px #77705F border
└──────────────────────────────────┘

Business name *
┌══════════════════════════════════┐ ← 2px #B3261E border
│                                  │
└══════════════════════════════════┘
⬣ {the engine's issue message}.     ← #8E1D14 on paper (8.41), octagon glyph,
                                       visually hidden "Error:" prefix
```

(The help line in the sketch stands for whatever help text the form already has; it isn't new copy.)

| Field state | Border | Background | Other |
|---|---|---|---|
| Default | 2 px `#77705F` | white | — |
| Hover | 2 px Tinta | white | — |
| Focus | 2 px Tinta + the 9.1 ring | white | Help text stays visible (never replaced by the error) |
| Prefilled from saved answers | 2 px `#77705F` and a 4 px `#E7EAF8` inner left rule | white | Help line names the source (copy needed) |
| Error | 2 px `#B3261E` | white | `aria-invalid="true"`; the message joins `aria-describedby` |
| Read-only | 2 px dashed `#77705F` | `#F1ECE3` | Not focusable unless it holds text someone may need to copy |
| Hidden by a condition (`showIf`) | — | — | Removed from layout and from the accessibility tree, as today with `hidden` and `disabled` |


### 9.4 The proof sheet (shared by the home sample and the real proof)

A white sheet (`--surface`) with a 14 px radius, a 1 px `--line` border and the **three corner marks** in `--ink-3` set 12 px outside its corners (on phones, 8 px). The firm bar sits on top. Inside are numbered sections. On the home sample, the numbered callouts 1 to 4 are 28 px Añil discs with paper numerals, and each callout's meaning is written out in the list beside it (section 3 of home), so the numbers aren't the only link between the two. The full page anatomy is in 10.4.

### 9.5 Status chips

A 4 px radius, 28 px tall (32 px on client pages), with a 16 px glyph, the word, and a tint background plus a 1 px border in the family's fill at 40% opacity. Every label in `web/lib/status.ts` maps to a family:

| Family | Labels |
|---|---|
| Approved / done | Approved, Submitted to the state, Accepted by the state, EIN issued, Completed, **Live** |
| Rehearsal / waiting on someone | **Rehearsal**, Waiting for approval, Needs information, Changes requested, On hold, Paused: state site changed, Name unavailable, Being checked |
| Stop | Needs correcting, Rejected by the state, Failed, Stopped |
| Information / in progress | Received, Getting the state's review page, Queued, Filing now, Final check |

"Rehearsal" always uses the hold glyph, so it can never be confused with "Waiting for approval", which uses a clock-ring glyph inside the same family.
```
[◉ Approved]  [⏸ Rehearsal]  [◷ Waiting for approval]  [⬣ Rejected by the state]  [◔ Filing now]
 green tint    amber tint      amber tint                red tint                    blue tint
```

A filing can carry two chips side by side: its status, and **Rehearsal** whenever it's a rehearsal. The rehearsal chip always comes second, so a sighted scan and a screen reader both get "what's happening" first and "this one won't be filed" second. The pair wraps onto two lines rather than shrinking.


### 9.6 Timeline (filing detail)

A vertical list (`<ol>`) with a 2 px rail. Each step has its glyph, its status label, a timestamp and who did it. The current step has `aria-current="step"`, a 4 px `--action` rail segment and its existing next-step sentence (from `nextStep()`) in a notice beneath. **A rehearsal ends with a terminal step showing the hold glyph**, labeled with its existing status, so the end of a rehearsal reads as a finish, not a failure. Stop steps use the octagon and show `lastError`. Future steps are dashed rings in `--ink-3`.
```
LIVE FILING                                REHEARSAL
◉ Received            Nov 24, 9:02 AM      ◉ Received              Nov 24, 9:02 AM
│  by maria@harborpine.com                 │
◉ Waiting for approval  Nov 24, 9:20 AM    ◉ Waiting for approval  Nov 24, 9:20 AM
│                                          │
◉ Approved            Nov 24, 6:41 PM      ◉ Approved              Nov 24, 6:41 PM
┃  ← 4px action rail = current             ┃
◔ Filing now          Nov 25, 8:00 AM      ⏸ {terminal rehearsal step}  Nov 25, 8:11 AM
┆  [notice: next-step sentence]               held before the last button
○ Submitted to the state                   (nothing after this: the rail ends
┆                                            in a closed register mark)
○ Accepted by the state
┆
○ EIN issued
```

Each step is one `<li>` with its time in a `<time datetime>` element. The rail and glyphs are `aria-hidden`; the list order and labels carry the meaning. (Times and the email address are sample data.)


### 9.7 Tables

Real `<table>` markup with `<caption>` and `scope` on headers. On phones, rows restyle into stacked blocks, **with explicit ARIA table roles** so Safari and VoiceOver don't drop the table semantics. Row height is 48 px, header rules use `--line-strong`, and there are no zebra stripes (they confuse magnifier users when lines are lost), only rules. A whole row can be a link only if its first cell holds a real `<a>`, so screen-reader users don't hear a "clickable" row with nothing to land on.

### 9.8 Navigation

- **Public header:** the lockup, four section links ("How it works", "For firms", "What we file", "For platforms"), "Log in", and "Run a free rehearsal". **Under 860 px, the section links are not hidden** (they are today): a "Menu" button (copy needed) opens a full-width sheet of 56 px rows with the same four links and Log in. "Run a free rehearsal" stays visible in the bar.
- **Skip link** to `#top` main content, first in the tab order, visible on focus (copy needed).
- **Filing desk:** a left sidebar from 1024 px wide (labels always visible) with Filings, New filing, Ready to pay, Client links, Signatures, Setup and Billing in the existing order. Under 1024 px, there's a top bar with the firm's logo, a "New filing" primary button and Menu. A count badge on "Ready to pay" when codes are needed.
- **Dashboard:** the same pattern with Overview, Filings, Ready to pay, Firms, API keys, Webhooks, Setup, Team, Billing / Sign-ups, Docs.
- **Docs:** a three-pane layout from 1280 px (nav, content, code). Two panes from 768 px. Under 768, the docs nav becomes a "Docs" disclosure at the top of the content.

### 9.9 Banners and notices

- **Beta notice:** a full-width strip in `--sunk` with ink-2 text and a small "Beta" tag (neutral, not amber, because beta is a fact, not a warning). On phones, only the first sentence shows; the rest opens in a `<details>` whose summary is that first sentence. It's `role="note"`, never sticky, and never on `/embed`.
- **Rehearsal notice (client pages):** rehearsal tint, a 4 px left rule in `--reh-fill`, the hold glyph, and text at body size, placed directly under the firm bar and before the H1, so it's the first thing read after the firm's name.
- **Notices** ok/warn/stop/info: a 4 px left rule in the family's fill, a glyph, a tint background and text at body size. Stop notices that block a task use `role="alert"`; others use `role="status"` when they appear after an action, or plain markup when they're present at page load.

### 9.10 The coverage table

The table keeps its locked headers ("Filing", "Where", "Where it stands"). It adds a **ladder meter**: five rungs drawn left to right (Planned, Offered not yet rehearsed, Screens recorded, Rehearsed to the payment screen, Live), shown as a 120 × 12 px stepped bar before each label. The meter is `aria-hidden`. The label is the accessible truth. "Live" is the only rung filled in approved green, and it only fills when `liveFilings()` is true for that type, so **a type can't look live by accident**. Filters: by state (New York, New Jersey, Florida, IRS) and by stage, using the locked labels as filter names. On phones, rows group under state captions, and "Where" becomes the caption rather than a repeated column.
```
DESKTOP
Filing                                        Where        Where it stands
─────────────────────────────────────────────────────────────────────────────────
LLC formation                                 New Jersey   ▰▰▰▰▱  ⏸ Rehearsed to the payment screen
Standing certificate (through the API; not…)  New Jersey   ▰▰▰▰▱  ⏸ Rehearsed to the payment screen
EIN, with the IRS letter saved                IRS          ▰▰▰▱▱  ◔ Screens recorded, rehearsal next
Corporation formation (for-profit)            New Jersey   ▰▰▱▱▱  ○ Offered, not yet rehearsed
Alternate name, charter amendments            New Jersey   ▰▱▱▱▱  ┄ Planned
(a type switched live)                        …            ▰▰▰▰▰  ◉ Live   ← the only green rung

PHONE (grouped by state; "Where" becomes the caption)
New Jersey
┌───────────────────────────────┐
│ LLC formation                 │
│ ▰▰▰▰▱ ⏸ Rehearsed to the      │
│        payment screen         │
├───────────────────────────────┤
│ Corporation formation (for-…) │
│ ▰▰▱▱▱ ○ Offered, not yet      │
│        rehearsed              │
└───────────────────────────────┘
```

The meter's fifth rung is outlined in green but only filled when the type is live, so even an empty rung tells you where "live" is and how far each type has to go. That's how "rehearsal" reads as a strength: it's the fourth step of five on a visible road, not a disclaimer. Long filing names wrap; they're never cut off with an ellipsis in the real table (the sketch abbreviates for width only).


### 9.11 Empty states, toasts, dialogs

- **Empty states:** a small screenprint illustration (the empty desk tray), the existing text ("Your desk is clear. Start a filing (it can be a free rehearsal), or send a client a link with your logo on it.") and its two buttons. Under 640 px, the illustration is left out.
- **Toasts:** only for confirmations you could live without missing ("Copy link" → copied). They appear next to the control that triggered them, not at the screen's corner, stay for at least 6 seconds or until dismissed, are announced with `role="status"`, and never cover content at 400% zoom. **Anything that matters is a notice on the page instead** (for example "Saved to Google Docs." stays inline, as today).
- **Dialogs:** native `<dialog>`, with focus trapped and returned to the trigger, Esc to close, and a 44 px Close button. Used only for confirming destructive actions (Revoke a key, Disconnect a portal login, Turn off a link).
- **Secrets and links** (an approval link, a new API key): mono text on `--sunk` with a dashed border, wrapping (`overflow-wrap: anywhere`), and a "Copy link" or copy button next to it.
### 9.12 The firm bar

The header of every client-facing page (intake, service page, proof, decision and error pages, client emails).

```
▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀  4px rule: firm's second color, else main color
[LOGO ≤40px]  Harbor & Pine CPA            English | Español     with CoFile
```

- 72 px tall on desktop and 64 px on phones, on `--surface`, with a 1 px `--line` bottom border.
- The firm's name is always shown as text in the firm's font at 20 px 700, even when the logo contains it. The logo's `alt` is empty, so the name is read once.
- On phones: logo and name on the first line; the language toggle and "with CoFile" on a second 32 px line. Nothing is hidden behind a menu, because a client page has no menu.
- It isn't sticky. On the proof, the client needs every pixel of the screen for the details.

### 9.13 Filters and search (desk and dashboard tables)

A row above each table: a search field (48 px, with a visible label), then filter dropdowns as native `<select>` elements with visible labels (status family, state, rehearsal or live). The result count is announced through the polite live region after each change. Filters live in the URL, so a filtered list can be bookmarked and Back works. There are no auto-filtering chips that reflow the table while someone is reading it. (Labels for search and filters: copy needed.)

### 9.14 Code blocks

Atkinson Hyperlegible Mono at 15 px with a 1.6 line height, on `--sunk` in light mode and Tinta in dark mode, wrapping long lines (no horizontal scroll unless the reader turns wrapping off with a toggle, copy needed). The copy button sits top-right, 44 px, and announces through the live region. Syntax colors are dedicated tokens (they share hues with the status palette but never appear outside code):

| Token | Light on `#F1ECE3` | Dark on `#141B26` |
|---|---|---|
| Text | `#141B26` (14.70) | `#F2EFE9` (15.07) |
| Keys, keywords | `#2A3A94` (8.37) | `#C9CFF0` (11.25) |
| Strings | `#13543A` (7.57) | `#9FD3B8` (10.28) |
| Numbers, booleans | `#6B4100` (7.49) | `#F5C36A` (10.62) |
| Comments | `#3B4556` (8.22), upright | `#9AA3B1` (6.79), upright |


---
## 10. Page by page

Every page has a unique `<title>` naming the page first and the site or firm second, one H1, landmarks (`header`, `nav`, `main`, `footer`) and the support contact in the same place: the footer on CoFile pages, the end of the page on firm pages (WCAG 3.2.6).

### 10.1 Home (`/`)

Single column on phones. The 12-column grid from 1024 px. Sections alternate Papel and white bands; on phones there are no alternating bands, just 1 px rules, to save visual noise.

```
DESKTOP ≥1024                                                    
┌───────────────────────────────────────────────────────────────┐
│ Beta · CoFile is in beta. Any filing can run as a free …       │ sunk strip
├───────────────────────────────────────────────────────────────┤
│ [⌐ ✓ CoFile]   How it works  For firms  What we file  For…   Log in [Run a free rehearsal] │
├──────────────────────────────┬────────────────────────────────┤
│ ── For CPA, payroll,         │   ⌐                         ✓  │
│    fractional CFO and title  │   ┌ Harbor & Pine CPA  example firm ┐
│    firms                     │   │ Two Sisters Bakery LLC [Rehearsal]│
│ Your client approves the     │   │ New Jersey LLC formation. Please  │
│ proof. Then CoFile files it. │   │ approve by Dec 3, 5:00 PM Eastern.│
│ (Display, 7 cols → 6)        │   │ ① Business name  TWO SISTERS…    │
│ CoFile fills in your …(lede) │   │ ② Formation filing fee  $100.00  │
│ [Run a free rehearsal]       │   │   NJ portal fee, by card   $3.50 │
│ [See what your client sees]  │   │   Total to the state     $103.50 │
│ In beta. A rehearsal fills … │   │ ③ New Jersey's own review page…  │
│ (small, ink-2)               │   │ ④ [Approve for filing]           │
│                              │   │   Nothing is submitted or paid…  │
│                              │   └──────────────────────────────────┘
│                              │   ⌊                         ⌋  │
│                              │ Sample proof · test details · not a real business │
└──────────────────────────────┴────────────────────────────────┘
```

```
PHONE 360
┌──────────────────────────┐
│ Beta · CoFile is in beta.▸│
│ [⌐✓ CoFile]  [Menu]       │
│ [Run a free rehearsal]    │ (full-width, in bar on ≥480)
│ ── For CPA, payroll, …    │
│ Your client approves the  │
│ proof. Then CoFile files  │
│ it.                       │
│ CoFile fills in …         │
│ [Run a free rehearsal]    │ 56px, full width
│ [See what your client sees]│
│ In beta. A rehearsal …    │
│ ┌ sample proof ────────┐  │ full width, after the copy
│ │ …                    │  │
│ └──────────────────────┘  │
└──────────────────────────┘
```

Section by section (all copy as in `web/app/page.tsx`):

1. **Hero.** The sample proof is live HTML, a `<figure>` with its existing `aria-label`. The `<mark>` highlights on the business name and address are an Añil-tint highlight with a 2 px Añil underline, so they still show in forced colors. The fake "Approve for filing" button is a styled `<span>` (it's not a control, and must never take focus). The numbered callouts 1 to 4 sit in the proof's left margin. On phones they move inline, before each block.
2. **Process.** "You start it. Your client approves it. CoFile files it." Three columns on desktop, stacked on phones. Each step is headed by its locked `<strong>` sentence, with a numeral in Literata 600 at 48 px. The middle step ("Your client approves it.") sits on an Añil-tint card. The lede says the client is in charge of the middle one, so the layout shows it.
3. **The proof.** Two columns: the lede on the left; the six checks on the right as a list with the register glyph (not a generic tick). The 8879 line is the last item, set off with a top rule, because it's the line that speaks to CPAs.
4. **Firms.** A screenprint illustration of a door with a firm's name painted on it and "with CoFile" lettered small on the frame. The list carries the four points.
5. **Requests.** The message bubble is a real chat-bubble shape in `--sunk`, 18 px text, with the caption "Ana Ortiz · text message · example". Then the arrow line "read into a drafted New Jersey LLC formation for your team to check" in mono, with a mini proof card: a hint that the message becomes a proof, not a filing.
6. **Checks.** "Checked twice. Filed once." Two columns, five items with the register glyph. The fine-print line (standing certificate $52 / $27) sets its figures in mono.
7. **After.** A three-step strip of illustrations: state's documents, EIN letter, one record.
8. **Rehearsals.** "Rehearse on the real stage." The log is a mono panel on `--sunk` with a header row "Rehearsal · New Jersey LLC formation" / "test details". It animates once (8.3), with "Pay Now: held, on purpose" in rehearsal text with the hold glyph. The caption under it is kept. Its `aria-label` stays "Example rehearsal log", and its rows are a list, so they're read in order.
9. **Coverage.** The table with the ladder (9.10). Its locked note goes beneath at body size, not small, because it holds the answer to "which are live". The mailto link is a secondary button-styled link on phones.
10. **The catch.** Five large numerals in Literata (64 px) in a two-column grid on desktop, one column on phones. No icons. It should read like a signed letter.
11. **Security.** Five blocks in a 3 + 2 grid, each with an H3 and a small line icon (lock, vault, link, pen, partition).
12. **Enterprise.** Two columns: list left, inquiry form right on a white card. The `"dryRun": true` code uses mono on `--sunk`. Form fields follow 9.3. The honeypot field stays hidden with `aria-hidden` and `tabindex="-1"`, as today.
13. **Close.** A Tinta band with Papel text (16.17:1). Buttons invert: Papel fill, ink text. The tagline "Approve the proof. Then it's filed." sits with the full-color mark at 40 px.

**Footer:** the lockup, "CoFile · the filing desk behind your firm", "New York · New Jersey · Florida · IRS", the legal line, then Terms · Privacy · Security · hello@cofile.app. Links are 44 px tall on phones.

### 10.2 Account pages

All of these use a centered 480 px card on Papel, one H1 (today these pages use H2 as the top heading; make the visible heading the H1), the "field-label" kicker as a small sentence-case line above it, and the beta notice.

| Route | Layout notes |
|---|---|
| `/signup`, H1 "Set up your firm's filing desk" | 640 px card, because it's the longest form. Fieldsets: firm (Firm name, Kind of firm), you (Your name, Work email, Password, Password again, the 12-character hint), optional (Phone, Website), States you file in (checkbox cards, 48 px), Filings per month, the Terms checkbox, then "Create account" full-width. Password fields get a show/hide toggle and allow paste and password managers (WCAG 3.3.8). The enterprise link sits under the card. |
| `/signup/sent`, H1 "Check your email" | An envelope illustration, the lede, and "send the link again" as a secondary button. |
| `/login`, H1 "Welcome back" | "Continue with Google" first as a secondary button with the Google glyph, then a divider, then Email and Password, then "Log in" and "Forgot your password?". Errors from Google appear as a stop notice above, with focus moved to it. |
| `/forgot-password`, `/reset-password`, `/verify-email` | One task per page; the existing copy; an expired-link state with "Ask for a new link" as a button. |
| `/invite-expired`; `/join/<token>` (redirects here) | Info notice styling, not an error. Nobody did anything wrong. |
| `/p/<slug>/signed-out` | The same card, with the firm's branding if the slug resolves. |
| `/terms`, `/privacy` | Long-form reading layout: Literata body at 19 px with a 1.65 line height, 66ch, numbered headings, a sticky contents list on desktop (a `<details>` on phones), and the version date at the top. A "Print" style is provided. |
| 404 "Page not found", error "Something went wrong" | An illustration of a sheet slipping off its marks (the only place misregistration means something). One button, plus the support email. On firm pages, these use the firm's branding and never mention CoFile. |

### 10.3 Partner filing desk (`/p/<slug>`)

The firm's own desk: the firm's logo and name in the top bar, the firm's clamped action color, CoFile's neutral base. Partner desks also show the CoFile lockup small at the foot of the sidebar (it's the firm's tool, and CoFile's product).

```
DESKTOP ≥1024
┌──────────────┬───────────────────────────────────────────────┐
│ [Firm logo]  │ Filings                         [New filing]  │
│ Harbor&Pine  │ ┌ ⏸ 1 approved filing is ready to pay and …  │
│──────────────│ │   [Pay and file]                             │
│ Filings  ●   │ └──────────────────────────────────────────────┘
│ New filing   │ ┌ 2 filings need someone to act. ─────────────┐
│ Ready to pay②│ └──────────────────────────────────────────────┘
│ Client links │ Filing            Type         Status      Started
│ Signatures   │ Two Sisters …     NJ LLC form… [⏸Rehearsal] Nov 24
│ Setup        │                                [◷Waiting for approval]
│ Billing      │ …                                             │
│──────────────│                                               │
│ you@firm.com │                                               │
│ [Log out]    │                                               │
│ with CoFile  │                                               │
└──────────────┴───────────────────────────────────────────────┘
```

- **Overview / Filings:** notices first (ready to pay, needs action, subscription), then the table. Each row shows its status chip, plus a **Rehearsal** chip whenever `dryRun` is true. On phones, rows become stacked blocks: title (link), type, chips, date.
- **Setup guide:** "Set up your account", with "Three short steps, plus registered agents if you want them." A vertical stepper of 4 cards ("Step 2 of 3" kickers), each showing done (approved glyph), current (Añil rail) or not started (dashed ring), with the step's existing description and button. Registered agents is marked "(optional)".
- **Setup › Details:** one fieldset per topic, with a save bar at the end of the form (not sticky on phones).
- **Setup › Branding** (the theming console, section 11):

```
┌ Branding ────────────────────────┬ Preview ─────────────────────┐
│ Logo  [Choose file] or link      │ [Phone] [Desktop]  [Light][Dark]│
│ Main color  [■ #F4C430] ready ■■■│ ┌ phone frame ────────────┐  │
│ Second color [■ …]               │ │ [logo] Harbor & Pine CPA │  │
│ Font  (•) Standard (the device's │ │ The proof …              │  │
│        own) ( ) Inter ( ) Lora … │ │ [Approve, and authorize  │  │
│        ( ) Upload                │ │  submission and payment] │  │
│                                  │ └──────────────────────────┘  │
│ Readability report               │ Your color   On buttons       │
│ ✓ Buttons 10.5:1 (ink text)      │ [■ F4C430]  [■ F4C430 + ink]  │
│ ✓ Links adjusted to 4.6:1        │                               │
└──────────────────────────────────┴───────────────────────────────┘
```

  On phones, the preview sits below the form behind "Preview" tabs. The report lines are copy-needed (Appendix B).

- **Setup › Registered agents:** one card per state (NY, NJ, FL): "Your own" or "Ours" as radio cards, with address fields and "Same as" where an agent is already saved for another state.
- **Setup › Payments:** saved cards as rows (label, brand, last four). The Basis Theory card field is styled through its element API to the field spec (48 px, 2 px border, our focus ring passed through its style options), with the locked vault sentence beside it.
- **New filing, step 1 (state):** three 120 px-tall cards (New York, New Jersey, Florida), each with its count line. The "Or send us the details…" ways (email, text, Slack) sit beneath as a secondary panel.
- **New filing, step 2 (type):** H1 "{State}: what are you filing?". Cards in a 2-column grid show title, a **Live or Rehearsal chip** (from `liveFilings()`), summary and fee note. The "Your pages for clients" card follows.
- **New filing, step 3 (the form):** see 10.5. For staff, it stays one long page with a sticky section index on the right at 1280 px and wider; the submit row "Send the proof to my client" ends the page.
- **Filing detail:** narrow column. H1 is the filing title with its chips. Then the type line, the timeline (9.6), the ready-to-pay or error notice, the missing-info form when needed, "Link to the proof" (a secret block with a copy button), Documents (a list of files with type and size, each a 48 px row), the EIN (mono, 24 px), and "Progress on the state site" as a disclosure listing each screen with its time.
- **Client links:** "Send a client a link" form (Filing, Who it's for, "Make link"), the result with "Copy link" and "Email it from your mail app", then "Links you sent" as a table with status chips and "Turn off" as a danger-quiet button.
- **From email `/from-email/<id>`:** two columns on desktop. Left: "Your message", the original text in a quoted `--sunk` block (or the 30-day deletion notice). Right: "This looks like a request for: …", the chosen filing and "Open the filled-in form". On phones, the message is first.
- **Signatures:** a table of Signer, Saved and Last used, with Remove; then "Add a signature". The pad lives in a 640 px card.
- **Ready to pay:** H1 "Ready to pay" and the locked explanation. One card per saved card, listing the filings waiting for it, with a single security-code field (Basis Theory element, 4-character width but a 48 px-tall target) and its button. Success is announced with `role="status"`, and the card turns to an approved notice.
- **Billing:** the plan and its price as Stripe returns it (prices appear only here, after login), and invoices as a table. The "Your plan is changing…" text is an info notice.
- **Password:** one form (9.3), with the locked hint about signing out other devices.

### 10.4 The proof (engine page at `api.cofile.app/approve/<token>`)

The most important page on the site. It's server-rendered HTML that **works with no JavaScript**, weighs less than 60 KB before the review image, and is fully usable at 320 px.

**Reading order (I've changed the order; the words stay the same):**

```
PHONE 360
┌────────────────────────────┐
│▀▀▀▀ firm color 4px rule ▀▀▀│
│ [Harbor & Pine logo]        │ firm bar (surface)
│ Harbor & Pine CPA           │
│ with CoFile                 │ 15px ink-2
├────────────────────────────┤
│ ⏸ Rehearsal: nothing will  │ rehearsal notice (only on rehearsals)
│ be filed or paid, even if  │
│ you approve.               │
│ ⌐                       ✓  │ corner marks
│ NJ formation: TWO SISTERS  │ H1
│ BAKERY LLC                 │
│ Please decide by December  │ deadline, bold
│ 3, 2026, 5:00 PM Eastern.  │
│ After that, this link …    │
│ ┌ Total ────────── $103.50┐│ summary strip (fee total, mono 24px)
│ └─────────────────────────┘│
│ Filing details  (H2)        │
│  Business name              │ label 16px ink-2
│  TWO SISTERS BAKERY LLC     │ value 18px mono ink
│  Members                    │
│  Ana Ortiz, Lucia Ortiz …   │
│ The state's review page(H2)│ (only when the state allows it)
│ [image on white plate]      │
│ State fees  (H2)            │
│  Formation filing fee $100.00│
│  NJ portal fee…        $3.50│
│  Total               $103.50│
│ ┌ consent ────────────────┐ │ the full "By approving…" note,
│ │ By approving, you confirm│ │ placed directly above the button
│ │ …Please check everything │ │
│ │ now.                     │ │
│ └──────────────────────────┘│
│ One-time code sent to you   │ (when required)
│ [______]                    │
│ [Approve, and authorize    ]│ 56px, full width, 2 lines OK
│ [submission and payment    ]│
│        24px gap             │
│ ▸ Request changes           │ <details>: textarea + button
│ Questions: help@firm.com    │
│ ⌊                       ⌋  │
└────────────────────────────┘
```

- **The firm bar** shows the logo (on an automatic plate if it lacks contrast, see 11), the firm's name as text, and "with CoFile". The `<title>` stays "{firm}: approve filing". `<html lang>` follows the page language, not a hard-coded `en`.
- **The locked line "Filing reference … Please decide by … After that, this link stops working…"** is chunked, not reworded: the reference sits in a small mono line under the H1, and the deadline sentences are set in bold.
- **The summary strip** repeats only data already on the page (the fee table's "Total"), so someone checking the amount doesn't have to scroll to the bottom to find it.
- **Filing details** is a `<dl>`: label stacked over value on phones; a two-column grid from 640 px (labels 35%, values 65%), with no 40%-width table header cells squeezing the values. Values the state will record in capitals are shown in mono, as the state will see them. SSNs show masked (spoken label: Appendix B).
- **The state's review page** sits on a white plate with a 1 px border, even in dark mode (never inverted). Tap opens it full-size in a new view with pinch zoom allowed. Its locked `alt` text points to the text twin. From 1024 px, the image and the details sit side by side, with matching rows marked by small register ticks: the signature idea, in register.
- **State fees** is a `<table>` with a caption, right-aligned mono figures and the total in 24 px bold. "Maximum you authorize" gets its own row, as now.
- **The consent block** moves to directly above the button, so the last thing read before acting is what acting means. It sits in a 2 px Tinta-bordered box (not amber, because it's not a warning, it's the agreement).
- **The approve button** uses the firm's action color, clamped to **7:1** (section 11), at 56 px. "Request changes" lives in a `<details>` below it, 24 px away, holding the locked label "What should change? (Needed only if you ask for changes)", the textarea and its own "Request changes" button. Nobody can hit the wrong one with a shaky thumb.
- **After pressing:** the button shows a pending state, the form can't be sent twice, and the decision page loads with the register moment. "Approval recorded" is the H1, and the locked sentence follows (the rehearsal or live version).
- **Errors and expired links** (today bare `<p>` tags): the same branded shell, an H1 and the locked sentence ("This link to the proof has expired. Ask whoever sent it for a new one.", "That code didn't match…", "A decision was already recorded with this link…"), the firm's support email, and an HTTP 410 or 400 as today. The H1 for each needs copy (Appendix B).

### 10.5 Client intake (`/i/<token>`) and permanent service pages (`/<firm>/<service>`)

Both use the firm's brand with CoFile nearly invisible: firm bar, "with CoFile", rehearsal notice when not live, H1 the filing type (plus the link label on client links), and the locked summary sentence.

**On phones, the form becomes one section per step.** Each `fieldset` (or folded section) becomes its own screen with a "Step 2 of 5" line, the legend as the H2, and a 56 px continue button at the foot (copy needed). The browser Back button moves back a step (history entries per step). **The last step shows every answer** grouped by section, with a change link per group, before the existing submit label "Send to {firm}". Answers are kept on the device as you go (the existing `useKeptForm`), so a dropped connection or a phone call doesn't lose them. Errors from the server send you to the step holding the first problem, with the summary at its top. From 768 px, it's the single long form as today. Firm staff see the same form on the desk at full length.

The service page (`/<firm>/<service>`, e.g. `cofile.app/bestaccounting/llc-filing-new-york`) is a permanent public page, so it adds a short page header above the form: the firm's logo at 64 px, its name, the filing type as H1, the fee note, and the firm's support line. It has an Open Graph card generated from the firm's brand (logo on Papel with the filing type), so the link looks right when a firm texts it to a client.

**Expired or closed links** ("This link has expired or isn't valid", "This link can't be used", "This filing is no longer offered"): the firm's branded shell, the H1, the locked sentence, and the firm's contact.

### 10.6 Enterprise dashboard (`/dashboard`)

CoFile's brand (Añil), denser type (16 px tables), and the same components.

- **Overview:** three stat tiles (Filings, Webhook deliveries, API keys) with large Atkinson numerals and links. Then "By status", "By state" and "By month" as small bar charts with table toggles. Any account-not-set-up notice comes first.
- **API keys:** the table (Name, Last used, status) and "Revoke" behind a confirm dialog. A new key appears once in a secret block, `cofile_` prefix visible, with Copy.
- **Webhooks:** endpoints table, delivery log with HTTP status in mono. **No status colors for HTTP codes.** Failures get the stop glyph only when the delivery actually failed after retries.
- **Filings:** a filterable table (status family, state, rehearsal or live, firm), with the same chips as the desk.
- **Firms and firm detail:** a firm list with logo thumbnails, then firm detail with its branding preview (a reduced section 11 console), settings and that firm's filings.
- **Setup:** "Payment methods" (the locked vault text), "State portal logins" as a table: Portal, Pays by, Login and Disconnect for NY DOS, NYS-100, NJ, IRS and FL, each row with "Not needed" where it applies, then portal defaults and "Who's named on your filings". Connected logins show a sealed glyph and never redisplay the value.
- **Ready to pay, Billing, Team, Password:** as in the desk. Team is a table with role chips (neutral, never status colors) and invitations.
- **Platform tenant only:** "Sign-ups" (Waiting for approval with Approve / Turn down, then Decided) and "Enterprise requests". **Proposed new surface, Drift reviews:** two state screenshots side by side (approved snapshot and today's page) with the differences outlined in rehearsal amber, the affected filings listed, and Accept / Correct / Reject. It uses the engine's existing `/v1/drift-reviews` (copy needed).
- **`/dashboard/login`** (API key login): the account card, with a mono key field that allows paste.

### 10.7 White-label surfaces

- **`/e/<tenant>/<firm>/<service>`:** the same as the service page, with the enterprise's brand, no "with CoFile" unless the tenant's settings ask for it, and the neutral beta notice.
- **`/embed/...` with `embed.js`:** a form-only layout with 16 px padding, no header, no beta notice, and "Filed with CoFile" at the foot. `embed.js` inserts an `<iframe>` with a `title` of "{filing type} · {firm}", resizes it to its content (no inner scroll bars, ever), passes `prefers-color-scheme`, and moves focus into the frame only when the user does. The host page can't restyle it. The theme comes from the tenant's saved brand, run through section 11.

### 10.8 Developer docs

- **`/docs`** (guides) and **`/docs/reference`** (25 endpoints): the three-pane layout from 1280 px: nav (248 px), content (680 px), code (the rest, on `--sunk` in light mode and Tinta in dark mode). Each endpoint has a method label as a **neutral mono chip** (GET, POST, DELETE in Tinta on `--sunk`, never green or red), the path in mono, parameters as a table, then the request and response samples with a copy button.
- Syntax colors for code are tested to 4.5:1 on the code background in both modes. Comments are `--ink-2`, not faint gray.
- The header carries "OpenAPI (JSON)", `llms.txt` and `docs.md` links as quiet buttons. **`/openapi.json`, `/llms.txt`, `/docs.md`** are served as plain files with the right types. No HTML styling, but `docs.md` is written with real headings, so it reads well when an AI agent or a screen reader user opens it.
- The CPA reading the docs out of curiosity gets a short "what this is" paragraph at the top of `/docs` (existing intro), so the page never opens on code alone.

### 10.9 Emails (Resend)

A single column, 600 px wide, all live text (no images of text), 18 px body, 1.6 line height. A "bulletproof" button 52 px tall built from a table cell with a VML fallback for Outlook. A plain-text part always. Tested in dark mode: the logo comes in a transparent and a dark version, or sits on a plate.

```
┌──────────────────────────────┐
│ [Firm logo]  Harbor & Pine CPA│ client emails: firm brand
│                               │
│ Your proof is ready to approve:│ H1 = subject text
│ NJ formation: TWO SISTERS …   │
│ Your proof is ready. Open the │ body (locked)
│ link to see every detail …    │
│ [ Open your proof ]           │ firm color, clamped
│ Don't forward this email: …   │ (in the body copy)
│ ───────────────────────────── │
│ Questions: help@firm.com      │
│ with CoFile                   │ small print
└──────────────────────────────┘
```

| Email | Audience, brand | Button (locked label) |
|---|---|---|
| Approval request: "Your proof is ready to approve: …" | Client, firm brand. A rehearsal line at the top when it's a rehearsal | "Open your proof" |
| Security code needed: "Card security code needed: …" | Card owner, firm or CoFile | "Enter security code" (goes to Ready to pay) |
| Missing information: "More information needed: …" | Client, firm brand | None today (Appendix B) |
| Filing submitted, documents back, EIN issued, "Completed: …" | Client and firm | Link to the filing or documents |
| Sign-up and verification, password reset, invitations | CoFile brand, Añil | Links to `/verify-email`, `/reset-password` and the invitation's set-password page |

Rejected, changes requested, site changed, bot check and the other staff notices use the same template, with a stop or rehearsal-tint rule at the top matching their family.

---
## 11. The white-label theming system: "the register"

One TypeScript package, `@cofile/theme`, used by **both** the web app (`brandStyle`) and the engine's proof renderer (`render.ts`), so a firm's color is clamped the same way everywhere. Today the proof sets white text on the firm's raw color without checking it.

### 11.1 What a firm controls, and what it doesn't

| Firm controls | CoFile keeps fixed |
|---|---|
| Logo (light, plus an optional dark version), firm name, support email | Page background, text colors, field styles, spacing, sizes |
| Main color and second color | Status colors, glyphs, the focus ring |
| Font: a preset or an upload | The mono face for fees, codes and state data; minimum sizes |
| Which filings it offers, its pages' wording through its own settings | The proof's structure, order and consent block |

### 11.2 The color clamp

The input is the firm's hex. Everything is worked out in OKLCH, so lightness can change without shifting hue.

1. **Text on the color.** Measure white and Tinta (`#141B26`) against the color, and use whichever contrasts more.
2. **Target:** at least 4.5:1 for buttons on the desk, intake and emails; **at least 7:1 for the proof's approve button**. If the better text color misses the target, step OKLCH lightness by 0.005 in both directions (darker with white text, lighter with ink text), reducing chroma only to stay in gamut, and keep the candidate with the smaller change.
3. **Edge.** If the fill contrasts less than 3:1 with Papel, add a 2 px border in a darker step that reaches at least 3:1, so a pale button still has a visible shape.
4. **Links** use a separate step of the color that reaches 4.5:1 on Papel. Links are always underlined.
5. **Hue guard.** If the color falls in the stop band (OKLCH hue 10°–45° with chroma ≥ 0.10, the reds), it still paints the firm bar's rule, headings and links, but **primary button fills on client pages use the firm's second color if it passes, otherwise Tinta**. Red means stop, and a red "Approve" button teaches the wrong thing on the one page that matters. Colors in the rehearsal amber band are allowed, because chips always carry their glyph.
6. **Dark mode:** the same steps against `#161D27`, usually landing lighter with dark text.

Measured on real inputs:

| Firm's color | As given | Buttons (4.5:1) | Proof approve (7:1) |
|---|---|---|---|
| Saffron `#F4C430` | white text 1.64, ink 10.53 | `#F4C430`, ink text, 10.53, plus a `#8A6A00` edge (1.54 → 4.74 vs Papel) | the same, 10.53 |
| Teal `#2BB3A3` | white 2.60, ink 6.65 | as given, ink text, 6.65 | `#32B8A8`, ink text, 7.05 |
| Sky `#4FA3E0` | white 2.75, ink 6.30 | as given, ink text | `#59ADEA`, ink text, 7.07 |
| Pine `#2F6F5E` | white 5.91 | as given, white text | `#226353`, white text, 7.05 |
| Navy `#1D3557` | white 12.36 | as given | as given |
| Red `#D62828` | white 5.01 | **hue guard**: second color or Tinta for fills; red kept for the bar rule and headings | the same |

### 11.3 Logos and fonts

- **Logo:** we measure the logo's average contrast against the firm bar. Under 3:1 (a white logo, say), it goes on a Tinta plate with 8 px padding and a 6 px radius. Max 40 px tall in bars, 64 px on service pages. Transparent PNG, SVG (sanitized server-side) and WebP accepted. The logo's `alt` is empty, because the firm's name is always also shown as text.
- **Firm with no logo:** the name set in the firm's font at 20 px 700, and a two-letter monogram tile in the clamped color for favicons and Open Graph cards.
- **Fonts:** each preset is pre-checked. An upload is checked for the Spanish glyphs (á é í ó ú ü ñ ¿ ¡, plus capitals), for x-height (at least 0.45 em) and for distinct I, l and 1. A font missing glyphs, or one that's script or very thin, is **used only for the firm's name and headings**, and body text falls back to the preset "Standard". `size-adjust` matches each font's x-height to the 18 px base, so a small-eyed face doesn't make the proof harder to read.

### 11.4 The console tells the firm what it did

The branding page (10.3) shows the firm's color next to "On buttons", and a readability report listing each automatic fix in plain words (copy needed). Nothing is changed silently. The firm can't turn the clamp off.

**Testing:** a CI job fuzzes 10,000 random colors and 200 fonts through the clamp and checks every output pair against its target, in light and dark.

---

## 12. Accessibility, Spanish and dark mode

### 12.1 Standards

**Baseline WCAG 2.2 AA on every page. AAA where it counts:** 1.4.6 contrast (7:1) on client pages, 2.5.5 target size (44 px), 2.4.13 focus appearance, 3.1.5 reading level (lower-secondary plain language, which the locked copy mostly meets), 2.2.6 telling people about timeouts (the deadline line on the proof, the hour on security codes). The criteria new in 2.2, specifically:

| Criterion | How it's met |
|---|---|
| 2.4.11 Focus not obscured | One sticky bar at most; `scroll-padding` |
| 2.5.7 Dragging | The signature pad gets a typed alternative (pending counsel); nothing else drags |
| 2.5.8 Target size | 44 px everywhere (above the 24 px minimum) |
| 3.2.6 Consistent help | The support email in the same place on every page |
| 3.3.7 Redundant entry | "Same as", "Same person as", the firm's saved answers, and the last step's review |
| 3.3.8 Accessible authentication | Paste and password managers allowed, Google login, `autocomplete="one-time-code"` |

### 12.2 Screen readers

- **Landmarks and headings** on every page; one H1; H2s for proof sections, so a VoiceOver user can jump by heading: details, review page, fees.
- **Live regions:** one polite `role="status"` region per page for copy confirmations, saved states and "Same as"; `role="alert"` only for the error summary and blocking stops.
- **Focus management:** after a failed submit, focus goes to the error summary; after a phone step change, to the step's H2; after a dialog, back to its trigger; on the decision page, to the H1.
- **Spoken data:** the masked SSN needs a spoken form (Appendix B); mono state values carry `lang` when they're Spanish words in an English page; fees read naturally as currency.
- **Tested with** VoiceOver on iOS and macOS, TalkBack on Android, NVDA with Firefox and Chrome, JAWS with Chrome, Voice Control and Voice Access (visible labels match accessible names, 2.5.3), and switch access.

### 12.3 Spanish (designed for, not translated here)

The English copy is locked. **Spanish is a localization decision**, so this is how the design makes room for it:

- **Space:** every string container allows 35% more length; buttons wrap; nothing truncates. Test strings at 1.35× length in every component story.
- **Switch:** on client pages, the firm bar has "English | Español" (language names in their own language) as a two-option toggle. The firm can also send a client link in Spanish. The choice sets `<html lang="es">`, so screen readers switch voice, and it carries into the proof and emails. CoFile's own pages follow when Spanish ships.
- **The proof in Spanish:** counsel decides which version of the consent is binding. The design supports Spanish primary with the English text in a disclosure under it, and records the consent version and language with each approval.
- **What the state will see:** state systems may strip accents (PANADERÍA → PANADERIA). The proof must show the state's version exactly, in mono, next to what the client typed, whenever they differ (copy needed).
- **Names:** two surnames, hyphens and accents accepted in every name field; no field is too short for "María de los Ángeles Rodríguez-Santiago".
- **Format:** es-US conventions: "3 de diciembre de 2026, 5:00 p. m., hora del Este"; dollars stay "$103.50".
- **Words to settle in a glossary first:** "the proof" and "rehearsal". In Spanish, *prueba* means both "proof" and "test", so it could collide with the meaning of a rehearsal. The glossary should be tested with Spanish-first owners in NJ, FL and Puerto Rico before anything is translated. I recommend *usted* throughout (legal and money context), and a legal translator plus a community review panel.

### 12.4 Dark mode

Tokens in 4.4. The state's review page and the signature pad always sit on white plates. Firm colors are clamped against the dark surface. Logos use the dark upload or a plate. Emails ship `color-scheme` meta and dark-safe logos. Charts use the dark ramp.

### 12.5 Slow phones and bad connections

Budgets for client pages: **HTML plus CSS under 60 KB compressed, under 120 KB of JavaScript (intake only; the proof uses none), fonts under 92 KB in total.** The review image loads after the text, sized to fit (AVIF and WebP, at 1x and 2x). Target: the proof is readable and its button usable within 3 seconds on a low-end Android device on slow 3G (400 kbps, 400 ms round trip). A failed submit keeps everything typed and offers to send again.

---

## 13. Production

- **Stack:** Next.js (as today), CSS custom properties generated from `tokens.json` with Style Dictionary, the `@cofile/theme` clamp package shared with the engine, and native `<details>` and `<dialog>`, with no UI framework added.
- **Design files:** a Figma library with variables for light, dark and a "firm" mode wired to the clamp, plus the components in 9 with all states, and page templates for 10.
- **Quality gates:** Storybook with axe on every story; Chromatic snapshots in light, dark, forced colors, 200% text and 320 px; Playwright with axe-core on every route; scripted screen-reader runs with Guidepup; Lighthouse CI against the 12.5 budgets; Litmus for emails including Outlook and dark mode; the clamp fuzz test.
- **Fonts:** self-hosted WOFF2 files, subset, with metric-matched fallbacks.
- **Commission:** lettering artist (wordmark); type studio (fee figures set); printmaker-illustrator (about 14 screenprint illustrations); documentary photographer (two weeks across NY, NJ, FL and PR); legal translator and community review panel (Spanish); an independent accessibility audit before each phase ships.
- **Assets:** the mark (four sizes plus the pixel version), lockups, the "with CoFile" mark, favicons, about 60 icons, 5 status glyphs, about 14 illustrations, about 30 photographs, Open Graph templates (CoFile and firm-generated), and email templates (client, card owner, account, staff).
- **Phases** (each closes with a moderated usability round of at least 8 people: 2 screen-reader users, 2 aged 65 or over, 2 Spanish-first, 1 with a tremor, 1 low-vision):
  1. **Weeks 1–3: tokens, theme clamp, the proof and its errors, client emails.** The irreversible step goes first.
  2. **Weeks 4–6: intake (phone steps), service pages, embed.**
  3. **Weeks 7–9: home and account pages.**
  4. **Weeks 10–13: filing desk, setup console.**
  5. **Weeks 14–16: dashboard, docs, drift reviews.**
  6. **Spanish:** glossary research runs alongside phases 1–2; launch after the glossary and legal review.

---

## Appendix A: What I'd push back on in the current site

1. **The proof's approve button can fail contrast.** `render.ts` paints `button.primary` in the firm's raw `primaryColor` with white text and no check. With a saffron brand, that's 1.64:1 on the one button that authorizes a non-refundable payment. That's my biggest concern, and section 11 exists to fix it.
2. **Action and status share green**, and the firm's color replaces it, so "approved" and "press me" are the same signal.
3. **Text is too small for this audience:** 15 px body text and 13.4 px help text in `globals.css`.
4. **The public nav disappears on phones** (`.nav { display: none }` under 860 px) with nothing to replace it.
5. **Errors are signaled by red text alone**, the error summary isn't linked to its fields, and focus isn't moved to it.
6. **The proof's layout:** the change-request box sits between the details and the approve button, the two buttons sit side by side, the details table squeezes values beside 40%-width labels, `lang="en"` is hard-coded, and the approval error pages are bare unbranded `<p>` text.
7. **Drawing is the only way to sign**, which shuts out people with tremors and some screen-reader users.
8. **The docs use status colors for HTTP methods** (GET green, DELETE red).
9. **Sign-up and log-in have no H1** (their top heading is an H2).
10. **The proof loads Google Fonts**, sending a client's IP address to a third party on a legal page.

## Appendix B: Copy notes

Suggestions only. The design above uses the locked words.

- **Labels the design needs that don't exist yet:** Menu; Close; Skip to main content; Show / Hide (SSN); Copy and Copied; Continue and "Step 2 of 5" (phone steps); Month / Day / Year; a visually hidden "Error:"; "View as table"; "Reduce motion"; English / Español; the readability-report lines in Branding; a note for answers prefilled from the firm's saved answers; the "Same as" confirmation; an H1 for each proof error page; the drift review screen; a line on the proof for "how the state will record this" when accents are stripped.
- **The masked SSN** ("***-**-1234") is read aloud as a run of "star"s; it needs a spoken label such as one meaning "ending in 1234".
- **The home sample's button says "Approve for filing"**, but the real proof says "Approve, and authorize submission and payment". For trust, the sample should show the real label.
- **"Sign in" survives** in "Signing in…", "Google sign-in", "This account can't sign in" and "You're not signed in to this filing desk". The rule is "log in".
- **"Test" and "test run" survive** in the desk's filings list badge, the filing detail's run summary and the Signatures page. They should say "rehearsal".
- **"The approver"** appears in the status next-steps. Partner copy should say "your client". "Your filing company will…" reads oddly on a firm's own desk, where the firm *is* the filing company.
- **The proof's title** is built from codes ("NJ formation: …"), and "Filing reference" is a long ID that can't be read aloud easily. Use a plain title and a short reference.
- **"Fields marked * are required."**: on short forms, marking the optional fields instead is easier to scan.
- **"Filed with CoFile"** (embed) and **"with CoFile"** (elsewhere): pick one.
- **"Ask the platform team to configure tenant …"** on the dashboard is engine jargon.
- **The missing-information email** has no button or link to act on.
