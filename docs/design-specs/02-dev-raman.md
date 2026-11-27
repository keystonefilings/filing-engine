# CoFile, in your colors

**Visual design spec for cofile.app. Dev Raman, staff product designer. Round 3, Nov 26, 2026 (on the published round 3 copy).**

Scope: visuals only. Every headline, line, button label, price and the order of each page come from `web/app/page.tsx`, the seven pages behind it and the product pages as they stand; prices come from `web/lib/pricing.ts` as the site shows them. Where a design needs a word that doesn't exist yet, I mark it `[copy needed]`. Wireframes shorten long copy with "…" to fit; the full text is set exactly as written.

---

## 1. Who I am, and what I bring

I'm Dev. I've spent eight years designing for fintech companies, mostly on the marketing site and the product as one system: the same tokens, components and React code on the home page as in the app. My habit, and my bias, is that **the product is the hero.** I don't sell software with metaphors or mascots. I stage the real interface beautifully: crisp, lit well, with real depth, glass and gradients used with restraint, and typography tight enough that a 56-year-old CPA trusts it within a second.

For CoFile that bias fits unusually well, because the product's best moment is something you can *see*: a filing desk with a firm's own name and logo on it, a client page in the firm's colors, and one page, the proof, that the firm approves before anything is filed. My job is to make those pages so handsome that a firm owner wants them to carry their name. I'll also build the system that makes *any* firm's logo and color look good, because that's the real product promise behind "Your name on the door."

What I bring to the build: a token system that turns one hex value from a firm into a full, accessible color scheme; a component library shared by the marketing site, the filing desk, the proof and the docs; staged product renders made from the real components rather than drawn mockups; and motion that shows how the product works instead of decorating it.

---

## 2. The visual concept: "In Your Colors"

### The one idea

**CoFile is a beautifully made, colorless instrument. The firm is the color.**

Everything CoFile owns is graphite, porcelain white, clear glass and hairline: quiet, exact, premium, like a well-made pen. Everything the firm owns (its name, its logo, its color, its font) is the *light* that falls through it. On the firm's filing desk, on the proof the firm approves, and on every form, client link page and email its client sees, the firm's color fills the main button and the highlights and casts a soft glow behind the page, as if the firm's own color were shining into the room. CoFile appears only in graphite, at 14px, as "with CoFile". That is "Ours in small type", drawn.

The home page puts this to work from the first frame. The hero picture is **Harbor & Pine CPA's filing desk**, lit in Harbor teal (`#0F766E`). A firm owner's first sight of CoFile is a desk carrying another firm's name, so they picture their own. One scroll later comes the site's signature moment, **the split**: a single client page parts down the middle into two complete pages, each lit in its own firm's color (Harbor & Pine's teal, Northgate Payroll's copper), each in its own logo and font, while the small "with CoFile" stays exactly the same on both. The site doesn't describe white-labelling. It shows it. Then one filing, Two Sisters Bakery LLC, stays on screen through the next three sections, turning from a client's text into a draft, into the proof, into a filed record with its papers. The page ends on an empty, dashed door plate: the visitor's name goes there.

The copy was cut to about 330 words so the pictures carry the page. In this concept every picture is the real product, built from the real components and staged like a premium product shot. The words say "your name"; the pictures show the firm's name on every surface.

### How it brings out the copy's selling story

| The copy sells | How "In Your Colors" makes it land |
|---|---|
| **1. Say yes, under your own name.** | The hero picture is a firm's desk, not CoFile's. Harbor & Pine's logo is the largest brand in the first viewport. CoFile's own wordmark in the header is 22px, and even its dot turns Harbor teal as the desk loads. |
| **2. Your brand on everything.** "Your name on the door. Ours in small type." | Color, logo and font always belong to the firm; graphite belongs to CoFile. The split shows one page under two brands. The headline is typeset as the joke it is: "Ours in small type." is literally set small. |
| **3. Nobody retypes anything.** | The client's text lifts out of its bubble, phrase by phrase, and lands in the drafted filing's fields. "from the text" answers glow with the firm's highlighter; "already filled" answers sit in the firm's soft wash. You watch nobody type. |
| **4. You stay in charge.** "Nothing is filed or paid until you approve the proof." | The proof is the most carefully made object on the site: a white sheet with the firm's name at the top, every detail and every fee, and one button in the firm's color. The approval is shown as *the firm's* gesture, made on the firm's own desk. |
| **5. It's done, and the papers come back.** | The state's document and the IRS letter slide in and settle into the firm's record like mail landing on a desk, as the stages light up one after another. |
| **6. The filings your clients already ask for.** | Four calm tiles, one per place, each listing filings in plain words with a fill-in mark: dotted, then dashed, then solid when live. It reads like a shelf of work the firm already does. |
| **7. Try it free.** "In beta: rehearse a filing, free." | Rehearsal has its own visual language: **dashed = rehearsal, solid = live**, borrowed from the spike tape that marks positions on a theater stage. A rehearsal looks like the real thing drawn in dashes: inviting, free, nothing to lose. |
| **8. Simple prices.** "$45 a filing. EIN included with a formation." | Prices are set like the fees on the proof: large tabular figures, no asterisks, no fine print, no "contact us" boxes. The headline price is the biggest number on the page. |
| **9. People behind it.** "Built and run by filing professionals." | Real portraits of the real filing professionals (documentary, never stock), small and warm, beside that line in the hero and again on How it works. |

### What the concept is not

It isn't built on locks, shields, seals, vaults, stamps, check marks or "stop" imagery. Security is one quiet line and a link at the foot of the pricing section, with its own calm page. The checks on How it works and the long answers in Questions sit in a readable "reading room" style (white panels, plain type, no glow). Anyone who goes looking finds them well designed. The brand, the hero, the signature moment and the motion are about the firm, its clients and how easy it is.

### Three rules that keep it honest

1. **Color always means the firm.** CoFile never uses a hue for itself, apart from the tiny dot in its own wordmark, and that dot turns into the firm's color as soon as there is a firm.
2. **The product is the picture.** Every home page picture (the desk, the split, the journey, the shelf, the run sheet, the open door) is the real interface, rendered from the real components (so a color change is real), staged with light and depth, and labeled as an example as the copy already does. Photography supports it and never replaces it.
3. **Nothing official.** No seals, eagles, capitol domes, flags, state outlines used as emblems, IRS letterforms, IRS letter layouts or anything that imitates a government mark. State websites appear as a neutral, re-typeset "foreign screen," clearly not ours and clearly not a copy of theirs.

---

## 3. Identity

### 3.1 The wordmark

**"CoFile"**, set as a single word in a custom-drawn version of Suisse Int'l Semibold (the brand face; see Typography), commissioned from a lettering designer.

Drawing notes for the lettering designer:

- **Skeleton:** Suisse Int'l Semibold, cap height 0.71 em, x-height 0.53 em. Overall tracking −1.5%. "C" to "o" kerned tight (−40 units at 1000 UPM), "F" to "i" opened slightly (+10) so the dot breathes.
- **C:** terminals cut horizontally (not angled), aperture slightly more closed than the retail face (terminals end at 38° from horizontal center, measured from the bowl's center), so the C reads as a confident bracket, not a gap. The same C geometry is reused in the symbol.
- **o:** optically round, contrast very low; it should feel like the C's smaller companion ("Co" = with).
- **F:** middle arm at 52% of cap height and 82% of the top arm's length.
- **i: the dot.** The tittle is replaced by a **rounded square**: side length = 1.35 × the stem width, corner radius = 28% of the side, bottom edge sitting 1.1 stem widths above the x-height, shifted right by 0.08 stem width so it centers optically over the stem. This is the only part of CoFile that ever carries color.
- **l, e:** retail forms; the "e" terminal cut horizontally to match the C.
- **Color:** letters always Graphite `#14161A` on light grounds, Porcelain `#F4F5F7` on dark. The dot:
  - **By default (no firm present):** the *Spectrum* chip, a conic gradient through five muted hues (Apricot `#F2A65A` → Rose `#E86A8A` → Iris `#9A7BF0` → Sky `#4F8CF0` → Sea `#3DB39A` → Apricot), starting at 200°. Before you choose a color, the dot holds every color.
  - **When a firm is present:** a solid fill in the firm's main color. On the marketing pages that means Harbor teal. Once a visitor picks a color with the dial on For firms, the open doors at the foot of the pages take that color for the rest of the visit.
  - **One-color reproduction** (fax, embossing, single-ink print): the dot matches the letters.
- **Minimum size:** 14px cap-height-equivalent font size on screen (the dot is then 2.4px; below that the dot is drawn at a fixed 2.5px minimum so it never vanishes).
- **Clear space:** the height of the "C" on all sides.

### 3.2 The symbol: "C and dot"

Used only where the wordmark can't fit: favicon, app icon, social avatar, the tagline in the close, the email footer.

Precise construction on a 48 × 48 unit grid:

```
   0    8    16   24   32   40   48
 0 ┌─────────────────────────────────┐   Tile: 48×48 superellipse (n = 5),
   │                                 │   fill Graphite #14161A.
 12│     ┌───────────────┐           │
   │     │  ┌─────────┐  │           │   C: rounded-rectangle bracket,
   │     │  │         │  └─┐ ┌──┐    │   outer box x10→34, y12→36 (24×24),
 20│     │  │         │    │ │▪▪│    │   outer radius 9, stroke 6
   │     │  │         │    │ │▪▪│    │   (inner box 12×12, inner radius 3).
 28│     │  │         │  ┌─┘ └──┘    │   Opening on the right: stroke removed
   │     │  └─────────┘  │           │   between y19 and y29, flat vertical cuts.
 36│     └───────────────┘           │   Fill: white.
   │                                 │
 48└─────────────────────────────────┘   Dot: 7×7 rounded square, radius 2,
                                          x33→40, y20.5→27.5, sitting in the
                                          C's mouth. Fill: Spectrum (default) or
                                          the firm's color.
```

The C "holds" the dot: CoFile holding the firm's color. On light backgrounds without the tile, the C is Graphite and the dot as above.

### 3.3 The "with CoFile" lockup

This is the most important CoFile mark, because it's the only one a firm's clients ever see: on the firm's forms, its client link pages and its emails. It is "Ours in small type" made into a mark, so it has to be gracious, small and unmistakably secondary.

- **Construction:** the word "with" in Suisse Int'l Regular, Slate `#5A6070`, then a word space of 0.28 em, then the CoFile wordmark at the same font size, Graphite, its dot in **the firm's main color**. The dot is how CoFile nods to the firm: even our own mark wears their color.
- **Size:** 14px on every firm and client page, on desktop and on phones. It is never larger, so the firm's logo is always at least 2.3× its height.
- **Placement:**
  - On the firm's top bar (the "Door", 3.4 below): right-aligned, vertically centered on the logo's center line.
  - At the foot of the intake form, the client link pages, the proof and the "Approval recorded" page: centered, 48px below the last element.
  - In the website widget: the product's own line "Filed with CoFile" uses the same construction with "Filed with."
  - In client emails: footer only, never in the header.
- **Never:** the symbol tile on a firm's page, the lockup in the firm's color, a link styled in blue, or the lockup above the firm's name.
- **Dark mode:** "with" in `#A4AAB7`, wordmark in `#EDEFF3`, dot in the firm's color lifted for dark (see Color).

### 3.4 How a firm's logo sits: "the Door"

Every firm-facing and client-facing page opens with **the Door**: the firm's top bar. It is designed to flatter logos that were never made for the web, because most CPA logos weren't.

```
Desktop, 72px tall, white (or glass when scrolled), hairline bottom
┌──────────────────────────────────────────────────────────────────────┐
│  [LOGO]  Harbor & Pine CPA                              with CoFile▪ │
└──────────────────────────────────────────────────────────────────────┘
   ░░░░▒▒▒▓▓ the firm's light: a radial glow of the firm's color, 10%,
   ░░░░░▒▒▒  540px wide, spilling 280px down from behind the logo

Phone, 60px tall
┌────────────────────────────────────┐
│ [LOGO] Harbor & Pine CPA    with CoFile▪ │   (lockup drops to its own 28px
└────────────────────────────────────┘     row beneath if the name is long)
```

**Logo analysis.** Runs in the browser when the firm uploads in Branding, and again on the server for old logos:

1. **Trim:** whitespace and transparent margins are cropped to the content's bounding box, then 4% padding is added back, so logos with big white margins don't look tiny.
2. **Shape class:** by aspect ratio of the trimmed logo.
   - *Wide* (≥ 2.5:1): height 32px desktop / 26px phone, max width 220 / 160px. The firm name is **not** repeated beside it when the logo contains text (we ask nothing; we simply never set the name next to a wide logo).
   - *Medium* (1.2 to 2.5:1): height 40 / 32px, max width 180 / 140px, name hidden.
   - *Square or tall* (< 1.2:1): height 44 / 36px, with the firm's name set beside it in the firm's font, 20 / 17px, weight 600, Graphite.
3. **Background:** corners are sampled.
   - Transparent, or white within ΔE 3: placed directly on the white bar.
   - Opaque and colored (a navy box, say): placed on a **plate**, a rounded rectangle (radius 10px) filled with the logo's own sampled background color, padding 6px × 10px, so it reads as the firm's sign rather than a pasted JPEG.
   - Opaque and photographic or noisy: plate in white with a hairline, radius 10.
4. **Contrast in dark mode:** if the logo is mostly dark (mean luminance < 0.25) on transparency, it automatically gets a white plate in dark mode.
5. **No logo yet:** a **monogram plate** is drawn: a 40px rounded square (radius 10) in the firm's main color, carrying up to three initials from the firm name (the "&" kept: "H&P"), in the firm's font at 17px weight 700, in the firm's on-color, followed by the name at 20px. It looks finished, never like a missing image.
6. **Never:** stretch, recolor, add drop shadows or put the logo straight onto the glow without a plate when its contrast with the glow is under 3:1.

**The firm's color on the Door.** No colored stripe across the top: that's the one thing every white-label product does, and it looks like a warning band. The firm's color shows up as *light* (the glow behind the logo), as the main button on the page, as the highlights on the proof, and as the dot in "with CoFile." A firm's color is shown off best when it's used as light, not as paint.

**The favicon on firm pages** is the firm's monogram plate (or a square crop of a square logo), not CoFile's symbol. The browser tab says the firm's name too.

### 3.5 The example firm's identity (to commission)

Every mockup uses **Harbor & Pine CPA**. It needs a believable, slightly traditional small-firm logo, the kind a real CPA has had since 2009, so the system visibly flatters it:

- A mark made of three stacked chevrons (a pine) standing on a single wave line (the harbor), drawn in one weight. Beside it, "HARBOR & PINE" in a classic humanist serif with small caps, and "CPA" in tracked caps beneath. Color: Harbor teal `#0F766E` on transparency.
- Deliver four variants for demos: *wide* (mark + name, transparent), *square* (mark only), *on a box* (white mark on a teal box, opaque JPEG, to show the plate) and *old JPEG* (on a white background with big margins, to show trimming).
- Second example firm, **Northgate Payroll** (the copy's other example, in the split): a payroll company's logo of the 2010s, deliberately unlike Harbor & Pine's. A square mark of a north-pointing arrow cut from a gate shape (two posts and a lintel), with "NORTHGATE" in a wide geometric sans and "PAYROLL" in a lighter weight beside it. Color: Northgate copper `#B45309`, one of the product's own ready colors. Its firm font is the Montserrat preset; Harbor & Pine's is the Lora preset, so the split shows fonts changing as well as colors. Variants: wide and square.
- Third, only where the product's own copy already names it (the page `cofile.app/bestaccounting/llc-filing-new-york`): **Best Accounting**, a plain wide wordmark in a geometric sans, navy `#1F4FD1`.
- The client businesses on the desk (Two Sisters Bakery LLC, Hudson Ledger LLC, Orchard Lane Inc.) appear only as names, never with logos: they're the firm's clients, not brands on the firm's pages.

All are fictional. Every image that shows them carries the caption the copy already uses ("example firm", "test details · not a real business") where the copy provides it.

---

## 4. Color

### 4.1 CoFile's own palette (light)

CoFile's palette is deliberately almost colorless, so any firm's color is the brightest thing on the page.

| Token | Name | Hex | Use |
|---|---|---|---|
| `--graphite` | **Graphite** | `#14161A` | All primary text, CoFile's primary button, the wordmark, the symbol tile |
| `--ink-2` | Graphite 88 | `#2B2F38` | Ledes and long reading text (softer than pure Graphite at large sizes) |
| `--slate` | **Slate** | `#5A6070` | Secondary text, captions, "with" in the lockup. 6.3:1 on white |
| `--field-line` | Field line | `#868D9A` | Input borders and other component outlines that must reach 3:1 |
| `--hairline` | **Hairline** | `#E2E4E9` | Dividers, card borders, table rules |
| `--porcelain` | **Porcelain** | `#F4F5F7` | The page background everywhere |
| `--porcelain-2` | Porcelain deep | `#ECEEF1` | The beta notice, table header rows, quiet wells |
| `--sheet` | Sheet white | `#FFFFFF` | Cards, the proof sheet, panels, fields |
| `--glass` | Glass | `rgba(255,255,255,.64)` + `backdrop-filter: blur(24px) saturate(160%)` | Sticky header, secondary buttons over imagery, floating chips |
| `--glass-edge` | Glass edge | `inset 0 1px 0 rgba(255,255,255,.85), 0 0 0 1px rgba(20,22,26,.06)` | The 1px light catch on top of every glass surface |

**The example firms' light** (Harbor is the home page's default light):

| Token | Name | Hex |
|---|---|---|
| `--firm` (home default) | **Harbor** (Harbor & Pine CPA's main color) | `#0F766E` |
| `--firm` (second example) | Northgate copper (Northgate Payroll's main color) | `#B45309` |

**Spectrum** (used *only* in the wordmark's dot, the symbol's dot, the "any color" swatch in the color dial on For firms and in Branding setup, and the default glow on CoFile's own app pages): Apricot `#F2A65A`, Rose `#E86A8A`, Iris `#9A7BF0`, Sky `#4F8CF0`, Sea `#3DB39A`.

**Daylight** (CoFile's own glow, used where there is no firm: log-in, sign-up before a name is typed, docs, the platform dashboard, the For platforms page): two soft radial glows on Porcelain, cool `#DCE3F5` at top left and warm `#F6E7DA` at bottom right, each 60% opacity, 900px radius, with 2.5% monochrome grain so it doesn't band.

### 4.2 Status and stage colors

Status is never shown by color alone: each tone has a dot or glyph, and text.

| Tone | Text | Tint (chip and notice background) | Used for |
|---|---|---|---|
| **Your turn** (the firm's next step) | `--firm-ink` | `--firm-wash`, with a 6px `--firm` dot | "Proof ready to approve", "Ready to approve", "Waiting for approval", "Your proof is ready". The firm's own action is shown in the firm's own color: an invitation, not a warning. On CoFile's dashboard (no firm), Graphite on `#EEF0F3`. |
| **Live** / ok | `#16794C` | `#E6F4EC` | "Live", "Filed", "Filed, IRS letter saved", "Approved", "Accepted by the state", "Completed", "EIN issued" |
| Attention / warn | `#8A5100` | `#FDF2DC` | "Needs information", "Changes requested", "Name unavailable", "Ready to pay" notices |
| Problem / bad | `#B3261E` | `#FCEBEA` | "Needs correcting", "Rejected by the state", "Failed", form errors |
| Neutral | `#3A3F4A` | `#EEF0F3` | "Received", "Queued", "Filing now", "Submitted", "Submitted to the state", "Being checked" |
| **Rehearsal** | `#14161A` | *no fill*: 1.5px **dashed** Graphite outline, dash 4 / gap 3 | Every "Rehearsal" and "Test" badge, the beta pill, rehearsal notices |

**The fill-in scale** (coverage labels on What we file), one visual idea read left to right as maturity. The home page's state tiles use a three-step version that matches their legend: a dotted ring for "Screens recorded or offered, rehearsal next", a dashed ring for "Rehearsed to the payment screen", a solid dot for "Live".

| Label | Treatment | Glyph (14px rounded square in four quarters) |
|---|---|---|
| Planned | Text only, Slate, no outline | empty, dotted outline |
| Offered, not yet rehearsed | 1px solid Hairline-dark `#C9CDD4` outline, Slate text | 1 quarter filled |
| Screens recorded, rehearsal next | 1.5px **dotted** Graphite outline, Graphite text | 2 quarters |
| Rehearsed to the payment screen | 1.5px **dashed** Graphite outline, Graphite text | 3 quarters |
| Live | **Solid** Live green fill `#16794C`, white text | full |

### 4.3 The firm's color: the "House Light" engine

A firm gives us one hex value (their **Main color**) and optionally a **Second color**. The engine turns them into a complete, accessible scheme, computed in OKLCH (with the `culori` library), cached per firm, and exposed as CSS custom properties on the firm's pages:

| Token | Derivation | Used for |
|---|---|---|
| `--firm` | The firm's hex, exactly | The glow, the "with CoFile" dot, monogram plates, decorative strokes |
| `--firm-fill` | `--firm`, unless white text fails 4.5:1 on it, then lowered in L (hue and chroma kept) until it passes. For very light colors (L > 0.82), the fill stays as-is and `--firm-on` becomes Graphite instead | Primary buttons, the selected state of choices |
| `--firm-on` | White if it reaches 4.5:1 on `--firm-fill`, else Graphite `#14161A` | Text on primary buttons |
| `--firm-ink` | `--firm` if it reaches 4.5:1 on white, else darkened in L until it does | Links, focus borders, active nav, kickers on firm pages |
| `--firm-wash` | L 0.975, C = min(C × 0.25, 0.025) | Selected rows, the consent panel on the proof, saved-answer fields |
| `--firm-mark` | L 0.92, C = min(C × 0.45, 0.06) | The highlighter marks on the proof |
| `--firm-line` | L 0.84, C = min(C × 0.6, 0.09) | Focus ring outer halo (at 50% alpha), relay lines |
| `--firm-glow` | `--firm` with L clamped to 0.50–0.72 and C clamped to ≤ 0.14, at 22% alpha (32% for the hero stage) | All ambient glows, stage contact shadows |
| `--firm-2` | The second color if set (with its own ink derivation), else `--firm-ink` | Links and highlights, as the Branding page says |

**Edge cases, designed on purpose** (tested with the nine ready colors the product already offers: `#1f4fd1`, `#0f766e`, `#15803d`, `#b45309`, `#b91c1c`, `#7e22ce`, `#be185d`, `#334155`, `#111827`):

- **Near-black** (`#111827`, L < 0.3): a near-black glow would look like soot, so `--firm-glow` lifts to a cool steel (same hue, L 0.58, C ≥ 0.03). The firm still gets a near-black button, which looks very sharp.
- **Slate grey** (`#334155`): treated like near-black, with a steel glow.
- **Red-family firms** (`#b91c1c`): a red firm button is perfectly fine, but our Problem red has to stay distinct. On a red-family firm (hue 0°–35°), error states keep their icon and text and use a 2px left border plus the tint, so they never depend on the hue alone.
- **Bright yellow or pastel** (L > 0.82): fill as given with Graphite text; `--firm-ink` drops to a deep version of the hue for links.
- **Neon** (C > 0.25): glows are clamped (C ≤ 0.14) so nothing looks radioactive; the button keeps the firm's exact color.

The product's Branding help text currently says "Button text is white, so choose a dark color." With the engine, any color works. If the product team wants that line updated once the engine ships: `[copy needed]`.

### 4.4 Dark mode

| Token | Dark value |
|---|---|
| Page | `#0E0F12` (Graphite night) |
| Surface / sheet | `#16181C` |
| Raised | `#1D2025` |
| Hairline | `#2B2F37` |
| Field line | `#6B7280` |
| Text | `#EDEFF3` |
| Ink 2 | `#D3D7DE` |
| Slate | `#A4AAB7` |
| Glass | `rgba(28,31,37,.62)` + blur 24 + edge `inset 0 1px 0 rgba(255,255,255,.06), 0 0 0 1px rgba(255,255,255,.06)` |
| Live | `#4CC38A` on `#12301F` |
| Attention | `#F0B45A` on `#3A2A10` |
| Problem | `#F2867D` on `#3B1714` |
| Rehearsal | dashed `#EDEFF3` outline |
| Firm ink | `--firm` lifted in L until it reaches 4.5:1 on `#16181C` |
| Firm glow | L clamped to 0.60–0.78, 28% alpha |

The **proof's "state's review page" picture** is always shown as captured, in a light frame, even in dark mode: it is a picture of someone else's page.

The **staged product on the marketing site** stays in light mode even when the visitor's system is dark. The page itself goes dark around it, and the glows become richer. A lit white sheet on a dark page is the most beautiful version of the hero, so the dark home page gets that for free.

### 4.5 How color is used, in one paragraph

Graphite does the talking. Porcelain and white do the breathing. The firm's color does the lighting: one glow per stage, one primary button per view, highlighter marks on the proof, the dot. Status colors appear only on chips and notices. Spectrum appears only in CoFile's dot and on CoFile's own pages that have no firm. If a screen has two saturated colors that aren't status, something's wrong.

---

## 5. Typography

### 5.1 Typefaces

| Role | Face | Foundry | Why |
|---|---|---|---|
| Display, UI and text | **Suisse Int'l** (Regular 400, Medium 500, Semibold 600) | Swiss Typefaces (retail; web, app and email-image licenses) | A neutral grotesk with real precision at display sizes and an open, sturdy text cut at 17–18px. It looks like a financial instrument, not a startup, and it stays out of the way of firm fonts. |
| Data, values, codes, the run log | **Suisse Int'l Mono** (Regular 400) | Swiss Typefaces | Shares the sans's skeleton, so a value on the proof ("TWO SISTERS BAKERY LLC") sits naturally beside a label. Unambiguous 0/O and 1/l/I. |
| The firm's voice on firm pages | **The firm's chosen font** (Standard, Inter, IBM Plex Sans, Roboto, Open Sans, Lato, Montserrat, Source Serif, Merriweather, Lora, or their own upload) | — | The firm name, headings and button labels on the Door, intake form, proof, decision page and client emails are set in the firm's font. Values on the proof stay in Suisse Int'l Mono, so "what the state will see" always looks the same, whatever the firm's taste. |
| Wordmark | Custom lettering on Suisse Int'l Semibold | Commissioned | See 3.1. |
| Email | System stack (`-apple-system, "Segoe UI", Helvetica, Arial, sans-serif`), with the firm's font loaded where clients support it | — | Web fonts are unreliable in mail; the layout is designed to survive the fallback. |

Settings everywhere: `font-feature-settings: "ss01" on` for Suisse's single-story alternates only in the wordmark (not in text); `"tnum" on` in every table, fee, date and count; `"case" on` in all-caps values. Optical kerning on. No text below 14px, ever. No all-caps in the interface apart from data that is all-caps by nature.

### 5.2 Marketing scale

Fluid between 390px and 1440px viewports with `clamp()`; the end points are given.

| Style | Phone (390) | Desktop (1440) | Weight | Line height | Tracking | Use |
|---|---|---|---|---|---|---|
| Display 1 | 40px | 80px | 600 | 1.04 → 0.98 | −0.03 → −0.04em | Hero h1, close h2 |
| Display 2 | 32px | 56px | 600 | 1.1 → 1.04 | −0.025 → −0.032em | Section h2 |
| Small type | 19px | 24px | 400, Slate | 1.3 | 0 | The second sentence of "Your name on the door. Ours in small type." |
| Title | 21px | 24px | 600 | 1.25 | −0.012em | Step titles, card h3, tile headings, plan names |
| Lede | 19px | 22px | 400, Ink 2 | 1.5 | −0.006em | The line or paragraph under each h1 and h2 (max 62ch) |
| Body | 17px | 18px | 400 | 1.6 | 0 | The short ticks, steps, answers, everything else |
| Kicker | 15px | 15px | 500 | 1.3 | +0.01em | "For CPA, payroll, fractional CFO and title firms", sentence case, never caps |
| UI | 16px | 17px | 600 | 1 | 0 | Buttons |
| Small | 15px | 15px | 400, Slate | 1.5 | 0 | Notes, the line under the hero buttons, "State fees separate…", the security line |
| Caption | 14px | 14px | 400, Slate | 1.45 | +0.005em | Figure captions, "example" tags, legal line |
| Mono data | 15px | 16px | 400 | 1.45 | −0.01em | Proof values, log results, codes, URLs |
| Price | 44px | 72px | 600, tnum | 1 | −0.035em | The figures on the price strip and price cards ("$45", "$25", "$15", "$250") |
| Price unit | 16px | 18px | 400, Slate | 1.3 | 0 | "per live filing", "a month", "an EIN on its own" |

### 5.3 Product scale (filing desk, dashboard, docs)

| Style | Size / line | Weight |
|---|---|---|
| Page title (h1) | 32 / 38 (phone 28 / 34) | 600, −0.02em |
| Section title (h2) | 22 / 28 | 600, −0.01em |
| Card title (h3) | 18 / 24 | 600 |
| Body | 17 / 26 | 400 |
| Table | 16 / 22 | 400; header 14 / 18, 500, Slate, sentence case |
| Small | 15 / 22 | 400, Slate |
| Caption | 14 / 20 | 400, Slate |
| Mono | 15 / 22 | 400 |
| Docs prose | 17 / 28, measure 68ch | 400 |
| Code | Suisse Int'l Mono 14.5 / 23 | 400 |

### 5.4 Proof scale (the page the firm approves; the firm's font unless noted)

| Element | Desktop | Phone |
|---|---|---|
| Firm name on the Door | 20 / 600 | 17 / 600 |
| Filing title (h1), e.g. "Two Sisters Bakery LLC" | 34 / 40, 600 | 28 / 34 |
| Section heading (h2) "Filing details", "State fees" | 22 / 28, 600 | 20 / 26 |
| Body, consent | 18 / 29 | 17 / 27 |
| Row label | 16 / 22, 500, Slate | 15 / 20 above the value |
| Value | Suisse Int'l Mono 16 / 22, Graphite | Suisse Int'l Mono 17 / 24 |
| Fee amount | Suisse Int'l 18 tnum, right-aligned | same |
| Total | Suisse Int'l 22 tnum, 600 | same |
| Approve button | 18 / 600 | 18 / 600 |

### 5.5 Pairing rules

- On CoFile's pages: Suisse Int'l for everything; Mono only for data that a machine reads or types (values, URLs, codes, fees in tables, the run log).
- On a firm's pages: the firm's font for its voice (name, headings, buttons, body); Suisse Int'l Mono for the values that go to the state; Suisse Int'l for the "with CoFile" lockup only.
- Headline line breaks are set by hand for the nine home sections and the seven pages behind them, at three breakpoints (see Sections 9 and 10). No widows in h1 or h2; `text-wrap: balance` as the fallback.

---

## 6. Layout

### 6.1 Grid

| Breakpoint | Columns | Column | Gutter | Outer margin | Content max |
|---|---|---|---|---|---|
| Phone (< 640) | 4 | fluid | 16px | 20px | 100% |
| Large phone / small tablet (640–1023) | 8 | fluid | 24px | 32px | 100% |
| Laptop (1024–1279) | 12 | fluid | 24px | 40px | 100% |
| Desktop (≥ 1280) | 12 | 76px | 32px | auto, ≥ 48px | 1264px |

Staged product is allowed to **bleed**: hero and Firms stages can extend past the content max into the right margin (up to the viewport edge), because a product shot cropped by the edge of the screen reads as bigger than the screen.

### 6.2 Spacing

An 8px base with a 4px half step: 4, 8, 12, 16, 24, 32, 48, 64, 96, 128, 160, 200.

| Rhythm | Phone | Desktop |
|---|---|---|
| Home sections with a picture (hero, firms, requests, the proof, after, rehearsals): vertical padding | 96px | 160px |
| Home sections without a side picture (coverage, pricing, close): vertical padding | 80px | 128px |
| Reading-room sections (checks, security, questions, legal, the coverage table): vertical padding | 72px | 112px |
| Page head on the pages behind the home page (kicker, h1, lede) | 64px top / 48px bottom | 120px top / 72px bottom |
| h2 → lede | 16px | 24px |
| Lede → content | 40px | 64px |
| Between list items | 16px | 20px |
| Card padding | 20px | 32px |

### 6.3 How pages breathe

- **One idea per viewport.** The copy is short on purpose, so each section is a short text column and one big picture: one staged object (a desk, a pair of pages, a sheet, four tiles, a log) and never more than one primary button. The picture gets 7 of 12 columns; the words get 5 and plenty of air.
- **Two registers.** Selling sections sit on Porcelain with the firm's light (a glow behind the staged object). Support content (the checks on How it works, the Security page, Questions, Terms and Privacy, the full coverage table) sits on a white "reading room" panel (radius 28px on desktop, full-bleed on phone, hairline border, no glow), so they look calm, deliberate and easy to read, and visibly different from the pitch around them.
- **Asymmetric two-column** for most sections on desktop: copy in columns 1–5, the picture in 6–12, always on the right, so the eye learns where the product lives. Requests, the proof and after share one sticky picture (M3), so for those three sections the right-hand column holds still while the words move. Full-width: coverage (the four tiles across 12 columns), pricing (the price strip) and the close (the open door, centered).
- **Phones get a single column** where copy always comes first and the picture follows, full width with 12px side margins (a little wider than the text column, so it feels like a product shot, not a thumbnail).
- **No section dividers.** Space and a change of register do the separating. Hairlines are for tables and cards only.


---

## 7. Art direction

### 7.1 The hierarchy of pictures

1. **Staged product** (about 80% of all imagery). The real React components, rendered live in the page wherever possible (so the split and the color dial actually recolor them), set on sheets, in browser windows and on phones, lit by the firm's glow, with real contact shadows. This is the house style.
2. **Photography** (about 15%). Firm owners in their own offices and their clients in their own businesses, always documentary, always with a phone or a screen that we composite the real product onto. On the home page only as the small portraits of the filing professionals in the hero; used more fully on For firms, How it works, sign-up and in CoFile's own emails.
3. **Illustration** (about 5%). Only the small things the product can't show itself: the documents that come back, the state's screens as neutral "foreign" UI, spike-tape marks, the example firms' logos, the icon set.

There's no 3D character, no isometric city, no abstract blob, no stock photo, and no illustration of a concept like "trust."

### 7.2 Staged product: the look

- **The sheet.** Every page we stage (the desk, the client page, the proof, the record) is a single sheet of white (radius 20px), 1.5px thick (drawn as a 1.5px lower edge in `#E7E9ED`, so it reads as a physical card, not a flat div), floating 40–64px above the Porcelain, tilted at most 4° in 3D (`perspective: 1800px; rotateX(3deg) rotateY(-6deg)` for the hero desk, flat elsewhere).
- **The light.** Behind each staged object: a primary glow (`--firm-glow`, radial, about 1.2× the object's width, centered 15% above and 10% right of the object's center), a secondary smaller warm glow (`--firm-mark` at 60%, offset down-left), and a monochrome grain overlay at 2.5% opacity (a 256px tile, `mix-blend-mode: soft-light`) so gradients never band on cheap screens.
- **Contact shadow.** Two layers: a tight Graphite shadow (`0 16px 32px -16px rgba(20,22,26,.22)`) and a long colored one (`0 48px 96px -32px` in `--firm` at 38%). The colored one is the trick: the sheet seems to sit in the firm's light.
- **Specular edge.** A 1px top highlight on sheets and glass (`inset 0 1px 0 rgba(255,255,255,.9)`), and on the hero only, a faint diagonal sheen (linear gradient, white 0 → 8% → 0) that follows the pointer.
- **Devices.** One custom, generic phone: a rounded slab with a uniform 10px bezel in `#1B1D22`, a small centered camera dot, no notch or island shape, no buttons that look like any real brand, corner radius 54px at 390px width. Browser windows are drawn as UI, not as laptops: a white window, radius 16px, a 40px top bar with three Hairline dots and a neutral address pill showing the real path (`cofile.app/p/harborpine`, `cofile.app/bestaccounting/llc-filing-new-york`) in Mono 14px. No laptop hardware renders.
- **Cropping.** Stages crop boldly: a desktop window cut off by the right edge of the viewport, a phone overlapping its bottom-left corner by 20%. Never show a whole device floating in the middle of nowhere when a crop would feel closer.
- **Content in product shots.** Only real copy and sample data from the repo: Harbor & Pine CPA, Northgate Payroll, Two Sisters Bakery LLC, Hudson Ledger LLC, Orchard Lane Inc., Ana Ortiz and Lucia Ortiz (50/50), 88 Grove St, Jersey City NJ 07302, $100.00 + $3.50 = $103.50, EIN 00-0000000. Every example picture keeps its small example label from the copy ("Example · test details · not a real firm", "Sample proof · test details · not a real business", and so on).

### 7.3 The state's screens: "foreign UI"

The product's promise is "the state's own website" and "the state's own review page," so we show them, but in a way that can never be mistaken for an official page and never imitates one:

- Re-typeset by us, never a real screenshot on the marketing site. Only the field labels and values from our copy appear (for example "Business Name" / TWO SISTERS BAKERY, "Designator" / LLC).
- A deliberately different, plainer visual language: system serif headings (Georgia fallback stack), Arial-like body, square corners, 1px `#B8BCC4` borders, a pale grey `#EEF0F3` header band with no logo, no seal, no state name in a banner, no colors from any state's site.
- Always framed: a neutral browser window or a picture frame with the copy's caption above it ("New Jersey's own review page, filled in").
- In the product, the real captured review page appears on the proof (that's the feature), inside the same neutral frame, unaltered.

### 7.4 Photography

**Style.** Documentary commercial. Natural window light, early morning or late afternoon; 35mm and 50mm; f/2–f/2.8; real locations, never studio sets. A warm-neutral grade (lifted blacks to `#16181C`, highlights rolled at 96%, skin tones protected), no teal-and-orange. One small prop in the firm's color in each key shot (a teal mug, a teal folder), so the photo belongs to the lit page. People look at their work, not at the camera. Screens and phones are shot dark or with tracking markers and composited later with the real UI.

**Cast.** Firm owners and staff 40–65, mixed genders and backgrounds, dressed as they actually dress at work. Clients: small-business owners in their own trades; they're shown with the firm's forms, never with the proof, because the firm approves it. Everyone cast and released; the copy's example names (Ana and Lucia Ortiz) are played by actors and always captioned as examples.

**Never.** Government buildings, flags, capitols, courthouses, seals, IRS forms, piles of paperwork, handshakes, people pointing at laptops, open-plan startup offices, or logos on devices (taped over or retouched out).

**Shot list (one commercial photographer, one producer, three shoot days in the New York and New Jersey area, plus one portrait day with CoFile's own team):**

| # | Shot | Where on the site | Brief |
|---|---|---|---|
| P1 | **"The door"** | For firms, beside "Your name on the door. Ours in small type."; sign-up | A glass office door with "Harbor & Pine CPA" in white vinyl lettering (we make and apply it; removable). Shallow focus on the lettering; the owner (woman, about 55) softly visible inside at her desk, morning light raking across the glass. Two framings: tight on the lettering (16:9 and 4:5), and wider with the owner (3:2). The only words in the photo are the firm's name. Nothing of CoFile appears, which is the point. |
| P2 | **"Ana texts"** | How it works, beside "Clients don't always fill in forms. They text you." | Ana (about 38) behind a bakery counter before dawn, flour on her apron, typing on her phone with one thumb; her sister Lucia out of focus pulling trays. Phone screen dark for compositing the message. Shoot at a real independent bakery (Jersey City or Hoboken), interior lights on, blue hour outside. 4:5 and 16:9. |
| P3 | **"The owner approves"** | How it works (the photo band between the steps and the proof); For firms | The CPA owner from P1 at her desk, glasses on, the proof open on her monitor (composited), her hand on the mouse, a client folder labeled "Two Sisters Bakery" beside the keyboard. A calm, in-charge moment, late-afternoon light. 3:2 and 4:5. |
| P4 | **"The owner's desk"** | For firms, beside "Your filing desk, in your brand." | A CPA (man, about 60) at a tidy desk in a small-town office, a monitor showing Harbor & Pine's filing desk (composited), reading glasses pushed up. 16:9. |
| P5 | **"Payroll office"** | For firms, sign-up | A payroll company staffer (about 45) in a modest suburban office, forwarding a client's text on her phone, the desk monitor showing the drafted filing. 3:2. |
| P6 | **"The closing room"** | Sign-up rotation | A title company closing room after hours: a long table, folders squared up, a staffer (about 50) reviewing a proof on a tablet. 3:2. |
| P7 | **"The contractor"** | Spare, for the client intake explainer and social | A contractor (about 45) in his truck cab, filling in his firm's client link form on his phone, work gloves on the dash. 4:5. |
| P8 | **"First founder"** | Spare, for social and future pages | A first-time founder (about 30) at a kitchen table at night, a laptop and a single lamp, the firm's branded form on screen. 4:5. |
| P9 | **"The filing professionals"** | Hero (three 40px portraits), How it works, Questions ("Is a person involved?"), For firms | CoFile's own filing professionals: real staff, not actors, never stock. Head-and-shoulders portraits against the same neutral warm-grey wall (`#E7E4DF`), soft window key from camera left, 85mm, f/4, eyes to camera, a little smile. One environmental portrait each at their actual desk with two screens. Names and roles, if shown, `[copy needed]`. |

Deliverables: 6–10 selects per shot, retouched at 6000px long edge; screen plates and tracking data for compositing; signed releases including the right to show the composited product.

### 7.5 Illustration and texture

- **Documents that come back** (After section, filing detail): generic sheets, never imitations. White sheets with radius 6px, a 12px grey title bar, 4–9 grey text lines at varying lengths, and at most a small empty rectangle where a stamp would be on a real document (left blank: we draw no seal, no signature, no letterhead). Three kinds, told apart by layout only: *a state document* (portrait, two columns of lines), *the IRS letter* (portrait, address block top-left, one long paragraph; nothing like the IRS's own letter design, even where the copy names it "EIN letter (CP 575)"), and *a receipt email* (an envelope-shaped card with three lines). The labels from the copy ("New Jersey · Certificate of Formation", "IRS · EIN letter (CP 575)") sit on our own chips beside the sheets, never printed on them as if they were the real thing. Labels come from the copy and float beside them as chips. Drawn as SVG by an illustrator, on our grid.
- **Spike tape.** The rehearsal motif: L-shaped and T-shaped tape marks (stroke 6px, butt caps, slightly irregular ends as if torn, 2° rotation jitter) in the firm's color at 85%, placed at the corners of each state screen in the rehearsal filmstrip. SVG, eight variants.
- **The relay line.** A 2px line in `--firm-line` with a 6px dot in `--firm` that travels along it. Drawn in code (SVG path, `stroke-dashoffset`).
- **Grain.** One 256px monochrome noise tile (PNG, 8-bit, 6KB), used on every glow.
- **Icons.** A custom set of about 48 icons on a 24px grid, 1.75px stroke, round caps and joins, 2px corner radius on all rectangles (the same family as the C in the symbol). Filled variants only for selected nav states. The set includes: form, link, message bubble, email, phone text, chat/Slack-generic (a speech bubble with a hash), browser window (our sign for "the state's website", never a government building), sheet, sheet stack, document returned (sheet with a curved arrow), calendar, clock, dollar, card, signature (pen nib on a line), people, building-neutral (a plain storefront, for the client's business), key (dashboard only), webhook, code, gear, palette, upload, copy, external, arrows, chevrons, plus, close, menu, search, help, info, attention, problem. **Deliberately absent from the marketing set:** padlock, shield, vault, seal, rosette, stamp, magnifier-over-document.

### 7.6 What I'd commission (by kind)

| Kind of studio or artist | What | Notes |
|---|---|---|
| Type foundry license | Suisse Int'l and Suisse Int'l Mono: web (≈ 500k views/month to start), app, and email-image licenses | Swiss Typefaces |
| Lettering designer | The CoFile wordmark and the C-and-dot symbol, per 3.1 and 3.2 | Two rounds, master in vector plus a variable-width test at 14–200px |
| Brand illustrator | Harbor & Pine CPA (four variants), Northgate Payroll (two), Best Accounting, the document set, spike-tape set | Logos must look like real small-firm logos, slightly dated, not like our style |
| Commercial photographer and producer | The shot list in 7.4, including the team portraits (P9) | Documentary style; producer handles locations, casting, releases, vinyl lettering |
| Retoucher / compositor | Screen inserts on P1–P8 from Playwright captures of the real UI at 3× | Perspective-matched, with a faint screen reflection |
| Motion studio (interactive) | Prototypes of the four signature moments in Section 8 (the desk, the split, the journey, the open door), delivered as code-ready timing specs and reference renders | They prototype; our engineers build in code, because the motion runs on live components |
| Creative technologist | The House Light engine (OKLCH ramp, contrast solving, logo analysis) and the scroll scenes | Can be in-house |
| Accessibility auditor | WCAG 2.2 AA audit of the proof, intake form and filing desk; testing with users 55+ and screen readers | Before launch of the proof redesign |
| Email developer | Templates in 10.15, tested across clients | React Email + Litmus |

---

## 8. Motion

### 8.1 Principles

1. **Motion explains the product.** Every moving thing on the site is something the product actually does: a firm's color fills its desk, one page takes two firms' brands, a message becomes a filing, the firm approves the proof, papers come back.
2. **It plays once, then rests.** No loops, no idle animation, no autoplaying video. A section animates when 40% of it enters the viewport, then stays still. Returning to a section doesn't replay it.
3. **Physical and light.** Sheets have mass (springs); color moves like light (crossfades in OKLCH, never through grey); UI responds instantly (≤ 180ms).
4. **Never in the way of reading.** No scroll hijacking. The page scrolls at its normal speed everywhere; the one long sticky picture (M3) only holds still while its three sections' words scroll past it. The copy is readable at every frame, and everything can be skipped by scrolling on.
5. **Reduced motion is a first-class design**, not a fallback: with `prefers-reduced-motion: reduce`, every scene shows its final, fully composed frame, color changes are instant, and the hero tilt is off. No information lives only in motion.

### 8.2 Tokens

| Token | Value | Use |
|---|---|---|
| `--dur-press` | 120ms | Button press, chip toggle |
| `--dur-hover` | 180ms | Hover, focus ring |
| `--dur-ui` | 240ms | Disclosure open, tab change, notice in |
| `--dur-mark` | 420ms | Highlighter sweep on the proof |
| `--dur-relight` | 640ms | A firm color change across a stage |
| `--dur-stage` | 900ms | A sheet arriving |
| `--ease-settle` | `cubic-bezier(.2,.8,.2,1)` | Most entrances |
| `--ease-swift` | `cubic-bezier(.3,0,.1,1)` | UI state changes |
| `--ease-exit` | `cubic-bezier(.4,0,1,1)` | Things leaving |
| Sheet spring | stiffness 180, damping 24, mass 1 | Sheets, phones, cards landing |
| Stagger | 70ms (pins, chips), 120ms (list items, screens) | |

Built with Motion for React on the live components; scroll progress from `useScroll` on sticky scenes; nothing heavier.

### 8.3 The four signature moments (home page)

**M1. The desk opens in your name (hero), 2.2s, once, on load.**

| t | What happens |
|---|---|
| 0ms | Kicker, h1 lines and sub fade up 12px, 500ms each, 80ms apart. |
| 200ms | The Harbor glow blooms behind the picture: opacity 0 → 1, scale 0.9 → 1, 1200ms, settle. |
| 300ms | The desk window rises: y +32 → 0, rotateX 9° → 3°, opacity 0 → 1, sheet spring. Its colored contact shadow grows with it. |
| 550ms | The Door assembles: Harbor & Pine's logo settles from 96% to 100% scale and full opacity (300ms), then the firm name and the "Filing desk" label. |
| 800ms | The "New filing" button fills with Harbor teal, a 420ms wipe from left to right: the firm's color arriving on its own desk. At the same moment the dot in the header's CoFile wordmark crossfades from Spectrum to Harbor teal (640ms). The site has taken the firm's color. |
| 1000ms | The four rows slide up 12px into place, 90ms apart. Each chip fades in its own tone as it lands: the Live tint for "Filed", Neutral for "Submitted", the firm's own wash for "Proof ready to approve". |
| 1700ms | The first row (Two Sisters Bakery LLC, "Proof ready to approve") lifts 4px with a soft firm-colored glow, as if hovered, and a proof sheet slides 72px out from behind the window's bottom edge: the page this row leads to, which section 4 shows in full. |
| 2000ms | The three portraits beside "Built and run by filing professionals…" fade in, 80ms apart. Then nothing moves. |

After load, pointer movement over the picture tilts it by at most ±3° (Y) and ±2° (X), following with a 600ms lag, and a faint sheen follows the pointer. Off on touch devices and with reduced motion.

**M2. The split (firms section). The site's signature moment. 2.4s, once, when 60% of the picture is in view.**

| t | What happens |
|---|---|
| 0ms | One client page stands alone in the middle of the picture: a white sheet in neutral Graphite, its Door empty, the title "Start your New Jersey LLC", two fields, the button "Continue", and "with CoFile" at its foot. No firm yet. |
| 300ms | A hairline of light draws down its middle, top to bottom (300ms). |
| 600ms | The page parts into two complete pages that slide apart on the sheet spring, the gap opening to 48px. Each half grows into a whole page as it moves. |
| 900ms | Each page relights in a wave from its Door downward (640ms, the right page 120ms behind the left): Harbor & Pine's logo, teal button and teal glow on the left; Northgate Payroll's logo, copper button and copper glow on the right. The title crossfades from Suisse Int'l into each firm's own font (Lora for Harbor & Pine, Montserrat for Northgate). The two glows overlap in the gap between the pages as a soft blend of teal and copper. |
| 1600ms | The caption "Two example firms · same page, each in its own brand" fades in. "with CoFile" never moves and never changes: the same 14px Graphite on both pages, before and after. That stillness is the message. |

Clicking or tapping the picture replays it (accessible name for that control: `[copy needed]`). On the **For firms** page the same picture gets a color dial under it (9.2 and 10.2): tapping a swatch relights the right-hand page in that color, with the logo swapping to a monogram plate in the new color, because we never recolor a firm's logo (3.4).

**M3. One filing, start to finish (requests → the proof → after). A scroll-linked stage across three sections, desktop and large tablet.**

The owner's freedom to merge pictures is the best thing that happened to this page. Sections 3, 4 and 5 tell one story about one filing, Two Sisters Bakery LLC, so they get **one stage**: a single sticky picture in columns 6–12 that transforms as the three text columns scroll past on the left. The object never leaves the screen; it changes from a text into a draft, from a draft into the proof, and from the proof into a filed record with its papers. (On phones the three acts become three separate pictures, each playing its own act once on enter. See 9.3.)

Each act is complete and still whenever its section's headline sits in the middle of the viewport. The transitions happen only in the scroll distance *between* sections, and they're scrubbed by scroll, so the reader controls the pace and nothing ever plays at them.

*Act 1, "Your client sends a text. Nobody retypes it." (plays once when the act settles, 3.0s).* Typing dots (three 6px dots, 900ms) → Ana's bubble lands (spring). Three phrases in the bubble get a `--firm-mark` highlight in turn ("the bakery", "me and my sister, 50/50", "Jersey City"); a copy of each lifts out and flies along a curved path (700ms, settle) into its row on the draft: Business name, Members, City. Each row gets its "from the text" tag as its phrase lands. Then the two saved rows (Registered agent, Organizer and signer) fill together in one quiet 240ms fade in `--firm-wash`, with their "already filled" tags. They were already there, so they don't fly. Last, the "For your team to check" chip settles onto the draft's header.

*Transition 1 → 2 (scrubbed).* The bubble slides away and fades out to the upper left. The draft card grows into the proof sheet: its header becomes Harbor & Pine's Door, its rows re-set as the proof's "Filing details" table (the same values in the same Mono, so you can see they're the same answers), and the fees and the state's review page unfold below them like a sheet being pulled from a printer.

*Act 2, "Nothing is filed or paid until you approve the proof." (plays once when the act settles, 2.0s).* Highlighter marks sweep left to right across "TWO SISTERS BAKERY LLC" and "88 Grove St, Jersey City NJ 07302" (420ms each, 150ms apart). "$103.50" settles with a 6px digit roll (300ms). Then a pointer (a plain arrow cursor: the firm's hand, not ours) glides in from the lower left to "Approve for filing" (600ms, settle), presses it (the button dips 1px, 120ms), and the firm's color blooms once along the top edge of the sheet (500ms). The chip "Ready to approve" crossfades to the product's own status word "Approved". The payment-screen strip beneath the sheet is simply there, with no animation of its own: it supports the proof, it isn't the show.

*Transition 2 → 3 (scrubbed).* The proof folds down to a compact record card (its Door and title stay; the tables collapse into one line), and the stage line appears above it with "Approved" already lit.

*Act 3, "Then it's filed, and the papers come back to you." (plays once when the act settles, 2.2s).* The stage line lights "Submitted", then "Filed", 300ms apart. As "Filed" lights, two document sheets slide in from the right edge, 160ms apart, rotate from 6° to their resting angles (−2° and 1.5°) and land in the record's tray on the sheet spring with a 2px overshoot, as if dropped on a desk: first New Jersey's Certificate of Formation, then the EIN letter. The EIN value fades in in Mono.

Scrolling back up reverses the scrubbed transitions; the acts don't replay. Reduced motion: no sticky stage at all. The three acts are laid out as three static pictures beside their sections, exactly as on tablets.

**M4. The open door (close), 1.6s, once, on enter.**

A large Door (the firm's top bar, 1000px wide) sits above the closing headline with its logo plate drawn as an empty **dashed** outline (the rehearsal line), "with CoFile" small at its right. The dashed plate's outline draws itself on (stroke-dashoffset, 700ms), then a soft glow in the active light color breathes once behind it (1200ms), and the CTA's halo breathes with it. If the visitor tapped a color on the For firms page this visit, the glow and the plate's dashes are in that color. It says "put your name here" without a word.

### 8.4 Smaller moments

| Where | Motion |
|---|---|
| Coverage tiles | Each tile fades up (120ms stagger); within it, each filing's mark draws its style (dotted ring, dashed ring, solid dot) once, 40ms apart down the list. When a filing type goes live in production, its mark is simply solid next time: no celebratory animation. |
| Rehearsal log | The log lines fill in their results top to bottom, 160ms apart, each result fading from Slate skeleton to text. The final line's dashed spike-tape mark draws itself on (stroke-dashoffset, 600ms). Calm; no flash at the end. |
| Pricing | No motion beyond a 12px fade-up of the strip. Prices stand still. |
| Close | The headline fades up; the CTA's glow breathes once; the symbol's dot crossfades from Spectrum to the active firm color. |
| How it works: the relay | The three steps ("Your client asks." "You approve it." "CoFile files it.") are joined by a relay line in `--firm-line`; a small sheet token travels from the client's form, to the firm's proof (where it pauses and the approve button breathes), to the state's screen, then documents. 2.8s, once. See 10.1. |
| How it works: the proof taken apart | The six proof items scroll past a sticky proof sheet; each lifts its layer. See 10.1. |
| Header | Compresses from 72 to 60px after 80px of scroll (240ms); glass blur fades in. |
| Buttons | Press: translateY(1px), 120ms. Hover: background step and a 4px `--firm-glow` halo on primary buttons, 180ms. |
| The proof (product) | On load, sections fade up 8px in sequence (60ms stagger). After "Approve, and authorize submission and payment", the button's color blooms across the sheet (500ms) and resolves into the "Approval recorded" page, which arrives with the firm's logo already in place. |
| Filing desk | Status chips crossfade on change; new filings slide into the top of the list (spring). Nothing else. |

### 8.5 Why this sells the copy

The hero motion makes the first two seconds about the firm: a desk carrying its name, its color arriving on its own button, even CoFile's dot giving way. The split turns "your name on the door, ours in small type" into something you watch: one page, two firms, and CoFile unchanged and small. The journey keeps one filing on screen from a client's text to the papers coming back, so the three middle sections read as one effortless motion: "nobody retypes it" without a single keystroke on screen, the approval as the firm's own gesture because the firm is in charge, and the papers landing as the satisfying end. The open door in the close hands the page back to the visitor: their name goes there. None of the motion is about stopping, waiting or verifying.

---

## 9. The home page, section by section

Nine sections, about 330 words, locked in order and wording. The pictures carry the page, so I've used the owner's freedom over them:

| # | Section | Picture (mine) | Replaces |
|---|---|---|---|
| 1 | Hero | **P-1 The desk**, plus three portraits of the filing professionals | `DeskVisual` |
| 2 | Firms | **P-2 The split** | `TwoFirmsVisual` |
| 3–5 | Requests, the proof, after | **P-3 One filing, start to finish**: one sticky picture in three acts (desktop); three pictures (phone) | `TextToFormVisual`, `ProofVisual`, `PapersVisual`, merged |
| 6 | Coverage | **P-4 The shelf** | `StateTiles` |
| 7 | Rehearsals | **P-5 The run sheet** | `RehearsalLog` |
| 8 | Pricing | No picture: the prices are the picture (**the price strip**) | — |
| 9 | Close | **P-6 The open door** (new) | — |

Default light on the home page: Harbor teal `#0F766E`. Every example picture keeps its example label from the copy, set as a caption (14px Slate) under the picture.

### 9.0 The frame: beta banner, header, phone CTA bar

**Beta banner.** A slim bar above the header, Porcelain deep `#ECEEF1`, not sticky (it scrolls away with the page).

- Desktop: 40px tall, one line, centered in the 1264px column. Left: the **Beta** pill (the dashed rehearsal outline, 24px tall, 14px 600). Then in 14px Ink 2: "CoFile is in beta. Any filing can run as a free rehearsal on the state's real website. It stops before the last button, so nothing is filed or paid. Filing types go live one at a time. Questions or problems? hello@cofile.app". The email is an underlined link. If it wraps at laptop widths the bar grows to two lines; it is never truncated.
- Phone: the pill on its own line, the text wrapping to four lines at 14/20, padding 12px 20px (about 108px). Acceptable because it isn't sticky.
- On firm pages the product's own wording for firm pages applies ("This service is in beta…"), in the same visual form, never naming us.

**Header.** Sticky glass, 72px, compressing to 60px after 80px of scroll.

```
Desktop
┌───────────────────────────────────────────────────────────────────────────────────────────┐
│ CoFile▪    How it works   For firms   What we file   Pricing   For platforms    Log in  [Run a free rehearsal] │
└───────────────────────────────────────────────────────────────────────────────────────────┘
 wordmark 22px   nav 16px 500 Graphite, 28px apart                                 text btn  primary M, 48px

Phone
┌──────────────────────────────────────┐
│ CoFile▪                 Log in   ☰   │  60px. ☰ opens a full-height glass sheet: the five
└──────────────────────────────────────┘  nav links at 28px/600, 64px rows, then both buttons
```

- The wordmark's dot is Spectrum on load and turns Harbor teal as the hero desk lights (M1).
- Nav: "How it works", "For firms", "What we file", "Pricing", "For platforms". The current page gets a 2px `--firm-line` underline offset 8px.
- **Phone CTA bar.** After the hero's buttons scroll out of view, a glass bar slides up from the bottom (76px including the safe area) with "Run a free rehearsal" full-width at 56px. It hides while the close is on screen, so the same button never appears twice.

### 9.1 Hero, with P-1 "The desk"

**Copy, as placed:**
- Kicker: "For CPA, payroll, fractional CFO and title firms"
- h1: "Your client needs an LLC. Say yes, under your own name."
- Sub: "CoFile files your clients' formations, EINs and payroll registrations on the official state and IRS websites, once you approve."
- Buttons: "Run a free rehearsal" · "See pricing"
- Note: "Built and run by filing professionals. When a filing needs a person, one of them takes over."
- Picture caption: "Example · test details · not a real firm"

**Desktop (1440).** Height: 100vh minus header and banner, minimum 760px, maximum 900px. Words in columns 1–5; P-1 in columns 6–12, bleeding off the right edge of the viewport.

```
┌──────────────────────────────────────────────────────────────────────────────────────────────┐
│                                                  ░░▒▒▓▓▓ Harbor glow, 32% ▓▓▓▒▒░░              │
│ (▪) For CPA, payroll, fractional        ╭─ ● ● ●  ( cofile.app/p/harborpine ) ─────────────────┤
│     CFO and title firms                 │ [≋ HARBOR & PINE CPA]   Filing desk       with CoFile▪ │
│                                         ├────┬─────────────────────────────────────────────────┤
│ Your client needs an LLC.               │ ▤  │ Client filings                    [ New filing ]│
│ Say yes, under your                     │ ✎  │ ┌─────────────────────────────────────────────┐ │
│ own name.                               │ ⇄  │ │ Two Sisters Bakery LLC   (● Proof ready to   │ │  ← lifted, glow
│ ▔▔▔▔▔▔▔▔ (firm highlighter)             │ ✉  │ │ New Jersey LLC formation    approve)        │ │
│                                         │ ✍  │ └─────────────────────────────────────────────┘ │
│ CoFile files your clients' formations,  │    │  Hudson Ledger LLC              (● Filed)        │
│ EINs and payroll registrations on the   │    │  New York LLC formation                          │
│ official state and IRS websites, once   │    │  Hudson Ledger LLC     (● Filed, IRS letter saved)│
│ you approve.                            │    │  EIN                                             │
│                                         │    │  Orchard Lane Inc.            (● Submitted)      │
│ [ Run a free rehearsal ]  ( See pricing )    │  Payroll registration (NJ-REG)                   │
│                                         ╰────┴──────────╮╭──────────────────────────╮──────────┤
│ (◉◉◉) Built and run by filing                           ││ [≋ HARBOR & PINE CPA]    │  ← proof sheet
│       professionals. When a filing needs                ││ Two Sisters Bakery LLC   │    peeking out
│       a person, one of them takes over.                 │╰──────────────────────────╯
│                                              Example · test details · not a real firm          │
└──────────────────────────────────────────────────────────────────────────────────────────────┘
```

- **Kicker:** a glass pill (36px tall, 15px 500) led by an 8px rounded-square dot in `--firm`, the same dot as the wordmark's.
- **h1** at Display 1 (80px), set by hand in two voices: "Your client needs an LLC." in Slate `#5A6070` (6.3:1, comfortable at 80px), the setup; then "Say yes, under your own name." in Graphite, the answer. Under "your own name" runs a `--firm-mark` highlighter band, 0.36em tall at the lower third of the x-height, the same mark the proof uses for its highlights.
- **Sub** at Lede (22px), Ink 2, max width 30em.
- **Buttons**, 56px, 16px apart: "Run a free rehearsal" in primary Graphite; "See pricing" as a secondary glass button with a 16px arrow, linking to `/pricing`.
- **The note and the portraits:** three 40px circular portraits of the real filing professionals (P9), overlapping by 12px, each with a 2px white ring, sitting left of the note. The note at Small (15px), Ink 2 (not Slate: it's a selling line), max width 28em. The portraits are decorative (`alt=""`); if they ever become links to the people's names, `[copy needed]`.

**P-1 "The desk", designed in full.**

*What it shows:* Harbor & Pine CPA's filing desk as a firm sees it every day, wearing the firm's own name, logo and color. It's the product's real desk component, rendered live with sample data.

*Composition:*
- A browser window, 880px wide × 600px, radius 16, bleeding 160px off the right edge of the viewport; tilted `perspective(1800px) rotateX(3deg) rotateY(-6deg)`; e3 elevation with the teal contact shadow; the Harbor glow centered behind its upper third.
- Window top bar (40px): three Hairline dots and an address pill showing `cofile.app/p/harborpine` in Mono 14px.
- **The Door** (64px): Harbor & Pine's wide logo (32px tall), the label "Filing desk" in 14px Slate after a hairline divider, "with CoFile" at the right.
- A 56px icon rail on the left (the desk's nav collapsed to icons: filings active, in `--firm-ink` on `--firm-wash`; the rest Slate). The real desk shows labels (10.11); the picture uses the collapsed rail so the rows get the room.
- Body: "Client filings" at 22px 600; "New filing" button (40px, `--firm-fill`, the firm's Lora font) at the right.
- Four rows, 72px each, hairline between them: the business name at 17px 600 ("Two Sisters Bakery LLC", "Hudson Ledger LLC", "Hudson Ledger LLC", "Orchard Lane Inc.") over the filing type at 15px Slate ("New Jersey LLC formation", "New York LLC formation", "EIN", "Payroll registration (NJ-REG)"), and the status chip on the right: "Proof ready to approve" (Your turn: `--firm-wash`, `--firm-ink`, teal dot), "Filed" and "Filed, IRS letter saved" (Live tint), "Submitted" (Neutral).
- Row 1 is lifted: white, 4px higher, e2 elevation and a soft teal glow, as if just hovered.
- **The proof, peeking:** a 360px proof sheet slides out from behind the window's bottom edge, overlapping it by 72px, showing only its Door and the title "Two Sisters Bakery LLC" in Lora. It's the page row 1 leads to, and the page section 4 shows in full.
- Caption centered under the window: "Example · test details · not a real firm".

*Style:* the product exactly as built, at 1× product scale (17px body), never shrunk to illegibility. The window is light even in dark mode.

*States:*
- Default (SSR): the final composed frame, so the picture is complete without JavaScript.
- Animated (M1): on first load only.
- Pointer: tilt ±3° and sheen; nothing in the picture is clickable. `role="img"`, `aria-label` from the copy's figure label ("An example firm's filing desk").
- Dark mode: page in Graphite night, the window stays light, the teal glow deepens to 28%.
- Reduced motion: final frame, no tilt.

*Motion:* M1 (8.3).

**Phone (390).**

```
┌──────────────────────────────────┐
│ (▪) For CPA, payroll, fractional │  kicker pill wraps to two lines
│     CFO and title firms          │
│ Your client needs an LLC.        │  40px, Slate
│ Say yes, under your              │  40px, Graphite
│ own name.                        │
│ ▔▔▔▔▔▔▔▔                         │
│ CoFile files your clients' …     │  Lede 19px
│ [     Run a free rehearsal     ] │  56px, full width
│ (          See pricing         ) │  56px, full width
│ (◉◉◉) Built and run by filing    │  Small 15px
│       professionals. When a …    │
│ ░▒▓ glow ▓▒░                      │
│╭────────────────────────────────╮│  P-1, flat, 12px margins: the window
││ ( cofile.app/p/harborpine )    ││  without the icon rail, cropped to
││ [≋ HARBOR & PINE CPA] with CoF▪││  the Door, the heading and the first
││ Client filings   [ New filing ]││  three rows, at product scale
││ Two Sisters Bakery LLC         ││
││ (● Proof ready to approve)     ││
││ Hudson Ledger LLC   (● Filed)  ││
│╰────────────────────────────────╯│
│ Example · test details · not a … │
└──────────────────────────────────┘
```

On phones the row chips drop below the business name; the peeking proof is omitted.

### 9.2 Firms, with P-2 "The split"

**Copy, as placed:** h2 "Your name on the door. Ours in small type." · lede "Your logo and color on every page your client sees." · four ticks: "A link for each client", "A page for every filing you offer", "A button for your own website", "Your registered agent, or ours" · link "For firms" · picture caption "Two example firms · same page, each in its own brand".

**The h2, typeset as the joke.** One `<h2>`, two sentences on two lines:
- "Your name on the door." at Display 2 (56px desktop / 32px phone), Graphite, 600.
- "Ours in small type." at the Small type style (24px desktop / 19px phone), Slate, 400, on its own line, right-aligned to the end of the line above on desktop (left-aligned on phones), like a footnote to it.

**Ticks.** Each tick is led by a 20px icon in `--firm-ink` instead of a check mark: link, sheet, a cursor on a button, a person with a pin (the agent). Body 18px, 20px between items. **"For firms"** is an arrow link: 17px 600 Graphite, a 16px arrow that moves 3px right on hover, underline on hover only.

**Desktop.**

```
┌──────────────────────────────────────────────────────────────────────────────────────────┐
│                                              ░░▒▒▓▓ teal ▓▓▒▒░░▒▒▓▓ copper ▓▓▒▒░░         │
│ Your name on the door.                     ╭────────────────╮    ╭────────────────╮       │
│                Ours in small type.         │ [≋ HARBOR &    │    │ [⇧] NORTHGATE  │       │
│                                            │    PINE CPA]   │    │     PAYROLL    │       │
│ Your logo and color on every page your     │                │    │                │       │
│ client sees.                               │ Start your New │    │ Start your New │       │
│                                            │ Jersey LLC     │    │ Jersey LLC     │       │
│ ⛓ A link for each client                   │  (Lora)        │    │  (Montserrat)  │       │
│ ▭ A page for every filing you offer        │ Business name  │    │ Business name  │       │
│ ⌖ A button for your own website            │ [____________] │    │ [____________] │       │
│ ⚲ Your registered agent, or ours           │ Who owns it    │    │ Who owns it    │       │
│                                            │ [____________] │    │ [____________] │       │
│ For firms →                                │ [  Continue  ] │    │ [  Continue  ] │       │
│                                            │  with CoFile▪  │    │  with CoFile▪  │       │
│                                            ╰────────────────╯    ╰────────────────╯       │
│                                      Two example firms · same page, each in its own brand │
└──────────────────────────────────────────────────────────────────────────────────────────┘
```

**P-2 "The split", designed in full.**

*What it shows:* the same client page ("Start your New Jersey LLC") under two example firms, each in its own logo, color and font, with the same small "with CoFile" on both. It is the product's real public filing page component, rendered twice with two firms' brand tokens.

*Composition:*
- Two phones (the generic device, 300px wide, 620px tall), standing 48px apart in columns 6–12, each turned 4° toward the other (`rotateY(±4deg)`), so they face each other like two shop windows on one street.
- Behind them, two glows: Harbor teal behind the left, Northgate copper behind the right, each 520px, overlapping in the gap into a soft teal-copper blend. (The engine clamps both to the same lightness, so the blend never goes muddy.)
- **Left page (Harbor & Pine CPA):** the Door with the wide teal logo; the title "Start your New Jersey LLC" in Lora 26px 600; two fields labeled "Business name" and "Who owns it" (56px, field-line border; the first shows a focus ring in teal, as if the client has just tapped it); "Continue" full-width in teal with white text; "with CoFile" centered at the foot.
- **Right page (Northgate Payroll):** the same, with the square copper mark and "NORTHGATE PAYROLL" beside it, the title in Montserrat 25px 600, the button in copper, the focus ring in copper.
- Everything that is the firm's (logo, color, font, focus ring, button) differs; everything that is CoFile's ("with CoFile", the field structure, the spacing) is identical to the pixel.
- Caption below, centered: "Two example firms · same page, each in its own brand".

*States:*
- Before (start of M2): one neutral page, centered, Graphite skeleton, empty Door.
- After (default SSR frame and the end of M2): the two branded pages as described.
- Replay: click or tap the picture (control's accessible name `[copy needed]`).
- On For firms (10.2): the same picture plus a color dial that relights the right-hand page in any color.
- Dark mode: pages stay light; glows at 28%.
- Reduced motion: the two pages, no split.

*Motion:* M2, the split (8.3). The signature moment of the site.

**Phone.**

```
┌──────────────────────────────────┐
│ Your name on the door.           │  32px
│ Ours in small type.              │  19px Slate
│ Your logo and color on every …   │
│ ⛓ A link for each client         │
│ ▭ A page for every filing you …  │
│ ⌖ A button for your own website  │
│ ⚲ Your registered agent, or ours │
│ For firms →                      │
│ ░▒▓ teal ▓▒░  ░▒▓ copper ▓▒░      │
│ ╭────────────╮                   │  two phones at 62% width, overlapping by
│ │ HARBOR &   │╭────────────╮     │  30%: Harbor & Pine in front-left, Northgate
│ │ PINE CPA   ││ NORTHGATE  │     │  behind-right and 16px higher. Tapping the
│ │ Start your ││ PAYROLL    │     │  back one brings it forward (300ms spring).
│ │ New Jersey ││            │     │
│ │ [Continue] ││ [Continue] │     │
│ ╰────────────╯╰────────────╯     │
│ Two example firms · same page, … │
└──────────────────────────────────┘
```

On phones the split plays as the second phone sliding out from behind the first, then relighting.

### 9.3 to 9.5 Requests, the proof and after, with P-3 "One filing, start to finish"

These three sections tell one story about one filing, so on desktop they share **one sticky picture** in three acts (M3). Each section keeps its own words, in order, in columns 1–5; the picture holds still in columns 6–12 while they scroll past.

**Copy, as placed:**

- *Requests:* h2 "Your client sends a text. Nobody retypes it." · lede "Forward the text, email, WhatsApp or Slack message. AI drafts the filing, your saved answers fill in the rest, and your team checks it."
- *The proof:* h2 "Nothing is filed or paid until you approve the proof." · lede "One page: every detail, every fee." · ticks "The state's own review page, where possible", "Every fee checked again before paying", "Any later change comes back for approval" · link "How it works".
- *After:* h2 "Then it's filed, and the papers come back to you." · ticks "The state's documents, saved and sent to you", "CoFile applies for the EIN and keeps the IRS letter", "An update at each stage".
- Picture labels from the copy: "Ana Ortiz · text message · example"; "Sample proof · test details · not a real business"; "Example record · sample documents".

**Desktop layout.** The three text blocks are each at least 100vh tall, with their h2 vertically centered when active. The picture is `position: sticky; top: 112px; height: calc(100vh − 176px)`, 7 columns wide, and sits on one continuous Harbor glow that drifts slowly downward as the acts change (its center moves from 30% to 70% of the picture's height across the three sections).

```
            text column (scrolls)                         picture (sticky)
┌────────────────────────────────────────┬──────────────────────────────────────────────────┐
│ Your client sends a text.              │ ACT 1                                            │
│ Nobody retypes it.                     │  ╭──────────╮                                    │
│                                        │  │ phone    │     ╭─ Draft: New Jersey LLC ────╮ │
│ Forward the text, email, WhatsApp or   │  │ ╭──────╮ │ ─╮  │ formation  (For your team  │ │
│ Slack message. AI drafts the filing, … │  │ │Need an│ │  ╰─▶│             to check)     │ │
│                                        │  │ │LLC for│ │     │ Business name   TWO SIST… ▒from the text│
│                                        │  │ ╰──────╯ │     │ Members         Ana Ortiz…▒from the text│
│                                        │  ╰──────────╯     │ City            Jersey Ci…▒from the text│
│                                        │  Ana Ortiz · text │ Registered agent Your sav…░already filled│
│                                        │  message · example│ Organizer and…  Your sav…░already filled│
│                                        │                   ╰────────────────────────────╯ │
├────────────────────────────────────────┼──────────────────────────────────────────────────┤
│ Nothing is filed or paid until you     │ ACT 2   (the desk, blurred, behind)              │
│ approve the proof.                     │      ╭──────────────────────────────────────╮    │
│ One page: every detail, every fee.     │      │ [≋ HARBOR & PINE CPA] example firm   │    │
│ ⊡ The state's own review page, where … │   ①  │ Two Sisters Bakery LLC (● Ready to   │    │
│ ⊡ Every fee checked again before …     │      │                          approve)    │    │
│ ⊡ Any later change comes back for …    │   ②  │ … details, fees, $103.50 …           │    │
│ How it works →                         │   ③  │ ┌ New Jersey's own review page… ┐    │    │
│                                        │   ④  │ [ Approve for filing ]  ↖ pointer    │    │
│                                        │      ╰──────────────────────────────────────╯    │
│                                        │      ┊ New Jersey payment screen  $103.50 (● Matches the proof) ┊
├────────────────────────────────────────┼──────────────────────────────────────────────────┤
│ Then it's filed, and the papers come   │ ACT 3                                            │
│ back to you.                           │  ╭─ [≋ HARBOR & PINE CPA] Two Sisters Bakery LLC ╮│
│ ⊡ The state's documents, saved and …   │  │ ●━━━━━━━━━●━━━━━━━━━●                         ││
│ ⊡ CoFile applies for the EIN and …     │  │ Approved   Submitted   Filed                  ││
│ ⊡ An update at each stage              │  │  ╭─────────╮  ╭─────────╮                     ││
│                                        │  │  │ ▬▬▬▬    │  │ ▬▬      │  (sheets at −2°, 1.5°)││
│                                        │  │  │ ▬▬ ▬▬▬  │  │ ▬▬▬▬▬▬  │                     ││
│                                        │  │  ╰─────────╯  ╰─────────╯                     ││
│                                        │  │  New Jersey · Certificate   IRS · EIN letter  ││
│                                        │  │  of Formation · TWO SIS…    (CP 575) · EIN 00-0000000││
│                                        │  ╰───────────────────────────────────────────────╯│
└────────────────────────────────────────┴──────────────────────────────────────────────────┘
```

**Ticks in these sections** use 20px icons in `--firm-ink`, not check marks: a framed window (the state's review page), a dollar sign in a circle (fees), a curved return arrow (changes come back); then a document, an envelope with a small number sign (the EIN), and a bell (updates). "How it works" is the arrow link style. On desktop, hovering a proof tick highlights its part of the act 2 picture: the state's review page inset; the fees table and the payment-screen strip; the approve button.

**P-3, act 1: "A text becomes a draft".**

*What it shows:* Ana's text message turning into a drafted New Jersey LLC formation on the firm's desk, with the answers from the text marked and the rest filled from the firm's saved answers.

*Composition:*
- Left of the picture: the generic phone (260px wide) showing a plain message thread: one incoming bubble (`#E9EBEF`, radius 22 with a 6px tail, Graphite 17px), "Need an LLC for the bakery. It's me and my sister, 50/50, in Jersey City.", and under the phone the caption "Ana Ortiz · text message · example". The thread UI is generic, not any messaging app's design.
- Right: the **draft card**, a white sheet (420px, radius 20, e2), overlapping the phone's right edge by 40px. Header: "Draft: New Jersey LLC formation" at 18px 600, and the chip "For your team to check" (Neutral). Five rows, 52px each: label at 15px Slate ("Business name", "Members", "City", "Registered agent", "Organizer and signer"), value in Mono 16px ("TWO SISTERS BAKERY LLC", "Ana Ortiz, Lucia Ortiz (50/50)", "Jersey City, NJ", "Your saved agent", "Your saved answers"), and a tag at the right: "from the text" on a `--firm-mark` pill with a 12px speech-bubble icon, or "already filled" on a `--firm-wash` pill with a 6px dot.
- A curved path (2px `--firm-line`, ending in a small arrowhead) runs from the bubble to the draft's first row. It replaces the stand-in's down arrow.

*States:* final frame (SSR); act 1 animation (M3, plays once when the act settles); reduced motion: final frame; dark mode: phone and card stay light.

**P-3, act 2: "The proof, on your desk".**

*What it shows:* the sample proof for Two Sisters Bakery LLC, opened on Harbor & Pine's desk, being approved by the firm.

*Composition:*
- Behind: the hero's desk window at 30% opacity, blurred 8px, so the proof is clearly something that opens on the firm's own desk.
- The **proof sheet**, 560px wide, flat, e3 elevation:
  - The Door: Harbor & Pine's wide logo, the 14px Slate tag "example firm", "with CoFile" at the right.
  - Title "Two Sisters Bakery LLC" (Lora 30px 600) with the chip "Ready to approve" in the Your turn style.
  - Block 1, a details table: "Business name" / TWO SISTERS BAKERY LLC (highlighted), "Members" / Ana Ortiz, Lucia Ortiz (50/50), "Main business address" / 88 Grove St, Jersey City NJ 07302 (highlighted). Labels 15px Slate, values Mono 16px.
  - Block 2, fees: "Formation filing fee" $100.00, "NJ portal fee, by card" $3.50, a hairline, "Total to the state" $103.50 at 20px 600. Tabular figures, right-aligned.
  - Block 3, the state's page: the caption "New Jersey's own review page, filled in" (Mono 14px Slate) above a foreign-UI inset (7.3) with "Business Name" / TWO SISTERS BAKERY and "Designator" / LLC.
  - Block 4: "Approve for filing", 52px, `--firm-fill`, Lora 17px 600.
  - Callout pins 1–4: 24px Graphite circles with white Mono numerals, 20px outside the sheet's left edge, one per block.
- Under the sheet, a slim **payment-screen strip** (560 × 48px) in the foreign-UI style (plain grey, Arial-like): "New Jersey payment screen" on the left, "$103.50" in Mono in the middle, and on the right our own chip "Matches the proof" (Live tint). Deliberately quiet: no glow, no animation.
- Caption: "Sample proof · test details · not a real business".

*States:* final frame shows "Ready to approve", unpressed (SSR and reduced motion); after act 2 plays, "Approved" and the bloom; hover links from the ticks highlight blocks (desktop); dark mode: the sheet stays light.

**P-3, act 3: "The papers come back".**

*What it shows:* the filed record for Two Sisters Bakery LLC on the firm's desk, with its stages and the two documents that came back.

*Composition:*
- A **record card** (600px, radius 20, e2): Harbor & Pine's Door; the title "Two Sisters Bakery LLC" (Lora 26px).
- The **stage line**: three 14px dots joined by a 2px line, labeled "Approved", "Submitted", "Filed" (15px 500). Lit dots are solid Live green; the line between lit dots turns `--firm-line`. No check marks.
- The **document tray**: a Porcelain-deep well (radius 14, 220px tall) holding two generic document sheets (7.5) at −2° and 1.5°: a state document (portrait, two columns of grey lines, an empty stamp area) and an IRS letter (portrait, an address block, one long paragraph). Beside each, our own label chip in two lines: "New Jersey" (Mono 14px Slate) over "Certificate of Formation" (15px 600) and "TWO SISTERS BAKERY LLC" (Mono 14px); "IRS" over "EIN letter (CP 575)" and "EIN 00-0000000". The labels sit on our chips, never printed on the sheets as if they were the real documents.
- Caption: "Example record · sample documents".

*States:* final frame (SSR, reduced motion) with all three stages lit and both documents in the tray; act 3 animation; dark mode: the card stays light.

**Phone and tablet (< 1024).** No sticky picture. Each section is copy first, then its own picture: act 1 after the requests copy, act 2 after the proof copy, act 3 after the after copy. Each plays its own act once on enter.

```
┌──────────────────────────────────┐
│ Your client sends a text.        │
│ Nobody retypes it.               │
│ Forward the text, email, …       │
│ ╭────────╮                       │  act 1: phone (55% width) and the draft
│ │ Need an│                       │  card below it, overlapping by 24px; the
│ │ LLC …  │                       │  path runs down, not across
│ ╰────────╯                       │
│   ↓                              │
│ ╭──────────────────────────────╮ │
│ │ Draft: New Jersey LLC …      │ │  rows stack: label, value, tag on one
│ │ Business name                │ │  line under the value
│ │ TWO SISTERS BAKERY LLC       │ │
│ │ ▒ from the text              │ │
│ ╰──────────────────────────────╯ │
│ Ana Ortiz · text message · …     │
│                                  │
│ Nothing is filed or paid until   │
│ you approve the proof.           │
│ … ticks, How it works →          │
│ ╭──────────────────────────────╮ │  act 2: the proof sheet at true phone
│ │ [≋ HARBOR & PINE] with CoF▪  │ │  scale, pins inside the left padding,
│ │ Two Sisters Bakery LLC       │ │  the payment strip under it
│ │ …                            │ │
│ │ [   Approve for filing    ]  │ │
│ ╰──────────────────────────────╯ │
│                                  │
│ Then it's filed, and the papers  │
│ come back to you.                │
│ … ticks                          │
│ ╭──────────────────────────────╮ │  act 3: the record; the stage line
│ │ ●━━━━●━━━━●                  │ │  stays horizontal; the two documents
│ │ Approved Submitted Filed     │ │  sit side by side at 46% each
│ │ ╭─────╮ ╭─────╮              │ │
│ ╰──────────────────────────────╯ │
└──────────────────────────────────┘
```

### 9.6 Coverage, with P-4 "The shelf"

**Copy, as placed:** h2 "The filings your clients already ask you for." · lede "New York, New Jersey, Florida and the IRS." followed by the link "See which are live today" · the tiles' place names, filing names and legend from `web/lib/coverage.ts` ("Live", "Rehearsed to the payment screen", "Screens recorded or offered, rehearsal next").

**Desktop.** Full width. h2 and lede in columns 1–8, then the shelf across all 12 columns, then the legend.

**P-4 "The shelf", designed in full.**

*What it shows:* the four places, each with the filing types a firm's clients ask for, and where each one stands. It's live data: when a filing type goes live, its mark turns solid on the next build, with no design change.

*Composition: a bento of four white tiles,* sized by how much each holds:

```
┌─────────────────────────────────────────┬─────────────────────────────────────────┐
│ New York                                │ New Jersey                              │
│ LLC formation                        ┊○ │ LLC formation                        ╌○ │
│ Corporation formation                ┊○ │ Standing certificate                 ╌○ │
│ Payroll registration (NYS-100)       ┊○ │ Payroll registration (NJ-REG)        ┊○ │
│ LLC changes and dissolution          ┊○ │ Corporation formation                ┊○ │
│ Copies and certificate of status     ┊○ ├────────────────────┬────────────────────┤
│ Application for Authority            ┊○ │ Florida            │ IRS                │
│ Assumed name (DBA)                   ┊○ │ LLC formation   ╌○ │ EIN, with the   ┊○ │
│                                         │ Corporation …   ╌○ │ IRS letter         │
│                                         │ Limited partn…  ╌○ │                    │
└─────────────────────────────────────────┴────────────────────┴────────────────────┘
  ● Live    ╌○ Rehearsed to the payment screen    ┊○ Screens recorded or offered, rehearsal next
```

- New York (7 filings) is a tall tile in columns 1–6; New Jersey (4) is a wide tile in columns 7–12; Florida (3) and IRS (1) share the second row on the right, 3 columns each. On a 1024–1279 laptop, the same bento at 8+4 columns.
- Each tile: white, radius 20, e1 elevation, padding 28px. The place name at Title (24px 600). Rows 48px, hairline between them, the short filing name at 17px Graphite on the left, the mark on the right.
- **Marks** (16px): Live is a solid Live green dot; "Rehearsed to the payment screen" is a 1.5px **dashed** Graphite ring; "Screens recorded or offered, rehearsal next" is a 1.5px **dotted** Slate ring. Each mark has its label as `aria-label` and as a tooltip on hover or tap; on phones, tapping a row shows the label inline under the filing name for 4 seconds.
- A soft Harbor glow (14%) sits behind the shelf. The tiles are sheets on the firm's light like everything else.
- The legend below, centered, at Small (15px), each label led by its mark.

*States:* live data (marks follow `statusOf`); hover row (Porcelain wash); reduced motion: no mark drawing; dark mode: tiles `#16181C`, marks in their dark tones.

*Motion:* tiles fade up (120ms stagger), marks draw once (8.4).

**Phone.** h2, lede and link, then the four tiles stacked full width in the copy's order (New York, New Jersey, Florida, IRS), then the legend as a vertical list.

### 9.7 Rehearsals, with P-5 "The run sheet"

**Copy, as placed:** h2 "In beta: rehearse a filing, free." · lede "CoFile fills in every screen of the state's real website and stops before the last button: nothing is filed or paid. Filing types go live one at a time." · the log's words · caption "Rehearsal · nothing filed, nothing paid".

**Desktop.** Words in columns 1–5, P-5 in 6–12. In the h2, the word "free" carries the `--firm-mark` highlighter: the one word a busy owner should remember from this section.

**P-5 "The run sheet", designed in full.**

*What it shows:* a rehearsal of a New Jersey LLC formation on the state's real website, as a log: every screen filled in, and the last button left alone on purpose.

*Composition:*

```
        ┊┌───────┐ ┌───────┐ ┌───────┐ ┌───────┐ ┌───────┐┊   ← filmstrip of foreign-UI
       ┌┘│ ▓▓▓▓  │ │ ▓▓▓   │ │ ▓▓▓▓▓ │ │ ▓▓ ▓▓ │ │ ▓▓▓ ⌜⌝│└┐     screens, spike-tape corners,
        ┊└───────┘ └───────┘ └───────┘ └───────┘ └──⌞⌟──┘┊     the last one dashed
   ╭╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╮
   ┆ Rehearsal · New Jersey LLC formation      test details ┆   ← dashed outline:
   ┆─────────────────────────────────────────────────────────┆     a rehearsal, drawn
   ┆ ● Business name                                 filled  ┆     in dashes
   ┆ ● Name check                                    passed  ┆
   ┆ ● Registered agent                              filled  ┆
   ┆ ● Members and signatures                        filled  ┆
   ┆ ● Review page                       matched the proof  ┆
   ┆ ● Payment: $103.50                  matches the proof  ┆
   ┆ ◌ Pay Now                            held, on purpose  ┆
   ╰╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╯
                    Rehearsal · nothing filed, nothing paid
```

- **The run sheet:** a white card (560px, radius 20) whose border is the 1.5px dashed rehearsal line. Header row: "Rehearsal · New Jersey LLC formation" at 16px 600 and "test details" in 14px Slate. Seven rows of 48px: the step at 17px on the left, led by a 10px solid Graphite dot; the result in Mono 15px on the right. The last row ("Pay Now" / "held, on purpose") is led by a dashed ring instead of a dot, its result in Graphite like the others. Nothing is red, nothing is a warning: it's the end of a rehearsal, like the last line of a script.
- **The filmstrip** behind and above the card: five foreign-UI screen thumbnails (120 × 80px, square corners, plain grey layouts, no state marks), overlapping slightly in a gentle arc, each with spike-tape L-marks at two corners in `--firm` at 85%. The last thumbnail shows a lone button area outlined in dashed spike tape: the last button, untouched.
- Caption under the card: "Rehearsal · nothing filed, nothing paid".

*States:* final frame (SSR, reduced motion); rows fill in once (8.4); dark mode: the card stays light, its dashed border in Graphite.

**Phone.** h2 (with "free" highlighted), lede, then the run sheet full width (filmstrip reduced to three thumbnails above it), then the caption.

### 9.8 Pricing: the price strip

**Copy, as placed:** h2 "$45 a filing. EIN included with a formation." · four items: "Pay as you go" / "per live filing"; "$25" / "an EIN on its own"; "$15" / "copies and certificates"; "Plans from $250" / "a month for 6 filings" · "State fees separate. Rehearsals free. See all plans" · "Social Security numbers encrypted and deleted 30 days after the filing. Saved cards held in a card vault, never in our database. Security".

No picture here, on purpose. The prices are the picture: after six product pictures, a section of pure, large, honest numbers is the strongest change of pace on the page.

**Desktop.**

```
┌──────────────────────────────────────────────────────────────────────────────────────┐
│ $45 a filing. EIN included with a formation.                                          │
│ ▔▔▔ (Price style, 88px)  (Display 2, 56px)                                            │
│                                                                                       │
│ ╭───────────────────┬───────────────────┬───────────────────┬───────────────────────╮ │
│ │ Pay as you go     │ $25               │ $15               │ Plans from $250       │ │
│ │ per live filing   │ an EIN on its own │ copies and        │ a month for 6 filings │ │
│ │                   │                   │ certificates      │                       │ │
│ ╰───────────────────┴───────────────────┴───────────────────┴───────────────────────╯ │
│ State fees separate. Rehearsals free. See all plans →                                 │
│ ─────────────────────────────────────────────────────────────────────────────────    │
│ Social Security numbers encrypted and deleted 30 days after the filing. Saved cards   │
│ held in a card vault, never in our database. Security →                               │
└──────────────────────────────────────────────────────────────────────────────────────┘
```

- **The h2:** one heading, two sizes. "$45" in the Price style at 88px (tabular, 600, −0.04em), the rest, "a filing. EIN included with a formation.", at Display 2 (56px) on the same baseline. The biggest number on the page, set with the same care as the fees on the proof.
- **The strip:** one white sheet (radius 20, e1), four equal cells divided by hairlines, 160px tall, padding 32px. Cells 2 and 3 set their figure ("$25", "$15") in the Price style at 56px, and their unit at Price unit (18px Slate) beneath. Cell 1 sets "Pay as you go" at 30px 600 on the same baseline as the figures, with "per live filing" beneath. Cell 4 sets "Plans from" at 18px 500 Slate above "$250" at 56px, with "a month for 6 filings" beneath. No asterisks, no strike-throughs, no badges.
- A faint Harbor glow (10%) behind the strip, the quietest on the page.
- **"State fees separate. Rehearsals free. See all plans"** at Small (15px Ink 2), with "See all plans" as an arrow link to `/pricing`.
- **The security line,** 48px below, after a hairline: Small (15px) Slate, with "Security" as an underlined link to `/security`. No icon, no lock, no badge. It's there for the reader who looks for it.

**Phone.** The h2 with "$45" at 56px and the rest at 32px. The strip becomes a 2 × 2 grid of cells (each 50%, hairlines between), figures at 40px. Then the notes and the security line.

### 9.9 Close, with P-6 "The open door"

**Copy, as placed:** h2 "Run one rehearsal. Then decide." · lede "Try it on a filing you know by heart. Questions? hello@cofile.app" · button "Run a free rehearsal".

**P-6 "The open door", designed in full (new picture).**

*What it shows:* a firm's Door (the top bar every firm page opens with) waiting for the visitor's firm: an empty logo plate drawn as a dashed outline, a dashed line where the firm's name would go, and "with CoFile" small at the right. No words of its own. Alt text `[copy needed]`.

*Composition and layout (desktop):*

```
┌──────────────────────────────────────────────────────────────────────────────────────┐
│                         ░░░▒▒▒▓▓▓ the active light, 30% ▓▓▓▒▒▒░░░                       │
│      ╭──────────────────────────────────────────────────────────────────────────╮     │
│      │ ┌╌╌╌╌╌╌┐  ╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌                                with CoFile▪ │     │
│      │ ╎      ╎                                                                 │     │
│      │ └╌╌╌╌╌╌┘                                                                 │     │
│      ╰──────────────────────────────────────────────────────────────────────────╯     │
│                                                                                       │
│                         Run one rehearsal. Then decide.                               │
│               Try it on a filing you know by heart. Questions? hello@cofile.app       │
│                              [ Run a free rehearsal ]                                 │
│                                                                                       │
│                                   [C▪] (symbol, 28px)                                 │
└──────────────────────────────────────────────────────────────────────────────────────┘
```

- The Door: 1000px wide, 88px tall (scaled up from the product's 64px), white glass, radius 20, e2. At the left a 56 × 56 logo plate drawn as a 1.5px dashed outline (radius 12) in `--firm-ink`; beside it a 200px dashed baseline in the same color where the name would be set; "with CoFile" at 14px on the right, exactly as on a real firm's page.
- Behind it, the active light: Harbor teal, or the color the visitor chose on For firms this visit.
- The headline at Display 1 (80px), centered; the lede at 22px; the button at 60px tall (the one large button on the page). The CoFile symbol (28px) sits 96px below as a quiet sign-off.

*States:* default (Harbor teal); visitor's color (from the For firms dial, read from `localStorage` in a try/catch; the page renders the same without it); dark mode (the Door in dark glass, dashes in light firm ink); reduced motion (static).

*Motion:* M4 (8.3).

**Phone.** The Door shrinks to the full content width (350px, 64px tall), then the headline at 40px, the lede, the full-width button, the symbol.

### 9.10 Footer

**Copy, as placed:** "CoFile · the filing desk behind your firm" · "New York · New Jersey · Florida · IRS" · "Building a filing product? CoFile for platforms" · "CoFile is not a law firm or a government agency, isn't affiliated with any state or the IRS, and doesn't give legal or tax advice." · "Terms · Privacy · Security · FAQ · hello@cofile.app".

- Porcelain deep `#ECEEF1`, a hairline at the top, 64px padding (48px on phone).
- Row 1, three columns: the wordmark at 18px followed by "· the filing desk behind your firm" at 15px Ink 2; the places at 15px Slate, centered; "Building a filing product? CoFile for platforms" at the right, with "CoFile for platforms" as a link.
- Row 2, after 32px: the legal sentence at Caption (14px Slate, max 70ch) on the left; the links at 14px on the right, separated by middle dots, with underlines on hover.
- The wordmark stays small here too. The brand is confident being small.
- Phone: everything stacks left-aligned, 16px apart; links wrap onto two lines.

---

## 10. The other pages

### 10.0 The page head (shared by the seven pages behind the home page)

Every one of these pages opens with the product's page head: kicker, h1 and lede.

- Kicker: the glass pill with the firm-color dot (15px 500).
- h1 at Display 1, scaled down for inner pages: 64px desktop / 36px phone, 600, −0.035em, max 14 words per line, broken by hand.
- Lede at 22px / 19px, Ink 2, max 62ch.
- Layout: words in columns 1–7, and on most pages a **head picture** in columns 8–12 (named per page below). Padding 120px top / 72px bottom on desktop.
- The same header, beta banner and footer as the home page. The current page is underlined in the nav.
- Light: Harbor teal on the pages that sell (How it works, For firms, What we file, Pricing); none on Security and Questions (reading room); Daylight on For platforms (no firm: it's for platforms).

### 10.1 How it works (`/how-it-works`)

**Page head.** Kicker "How it works" · h1 "Your client asks. You approve it. CoFile files it." · lede "Three steps. Your client hands the job to you, and you sign off before anything is filed."

The h1 is set over two lines, with the middle sentence, "You approve it.", in `--firm-ink`: it's the firm's step, so it gets the firm's color. No head picture: the three steps directly below are the picture.

**#steps: "the relay".** Three cards across 12 columns, joined by a relay line (2px `--firm-line` with a 6px traveling `--firm` dot), each followed by its bold title and paragraph, exactly as written ("Your client asks." / "You approve it." / "CoFile files it.").

```
┌──────────────────────────────────────────────────────────────────────────────────────┐
│  ╭──────────────────╮          ╭──────────────────────╮          ╭──────────────────╮ │
│  │ phone: Harbor &  │          │ desk window: the     │          │ foreign-UI state │ │
│  │ Pine's form      │●━━━━━━━━━│ proof, open,         │━━━━━━━━━●│ screen filling   │ │
│  │ + text bubble    │          │ [Approve for filing] │          │ ● Filing now     │ │
│  │ + email chip     │          │ (raised 24px, lit)   │          │ ● Submitted to … │ │
│  │ ▒registered agent│          │                      │          │ ● Accepted by …  │ │
│  │ ▒organizer ▒signer│         ╰──────────────────────╯          │ (◉) a person     │ │
│  ╰──────────────────╯                                            ╰──────────────────╯ │
│  Your client asks.             You approve it.                   CoFile files it.      │
│  They fill in a short form …   You get the proof: one page …     It fills in the …     │
└──────────────────────────────────────────────────────────────────────────────────────┘
```

- **Card 1, "Your client asks."**: three ways in, fanned at −6°, 0°, 6°: the client's form on a phone (Harbor & Pine's Door, two fields), Ana's text bubble, and an email card (an envelope with three grey lines). Beneath, four field chips that fill with `--firm-wash` as the relay passes, carrying the paragraph's own words: "registered agent", "organizer", "signer", "addresses".
- **Card 2, "You approve it."**: raised 24px, e3, the firm glow behind. A desk window (miniature) with the proof open and its approve button in teal. It's the middle step and the firm's, so it's the brightest card.
- **Card 3, "CoFile files it."**: a foreign-UI state screen filling in, beside a three-dot ticker using the product's real status words ("Filing now", "Submitted to the state", "Accepted by the state"), and at its foot a single 32px portrait (P9) with a soft ring, for "one of the filing professionals who run CoFile takes over".
- Motion: the relay (8.4), 2.8s, once.
- Phone: the three cards stack; the relay line runs down the left margin; card 2 gets a 2px `--firm-line` outline instead of being raised.

**Between sections: a photo band.** P3 ("The owner approves"), full-bleed, 1440 × 560 (16:9 crop on phone), the proof composited on her monitor. Alt text `[copy needed]`. No caption beyond the example label `[copy needed]` if the screen shows sample data (it does: it carries the proof's own "Sample proof · test details · not a real business" caption in the corner).

**#proof: "the proof, taken apart".** h2 "You see what the state will see, before the state does." · lede (the printer's proof paragraph) · six items, exactly as written.

- Desktop, a scroll scene of about 160vh: the h2, the lede and then the six items in columns 1–5; a full proof sheet sticky in columns 6–12 (640px, flat) with every layer of the real proof: the Door, the title, the consent panel, the state's review page, filing details, state fees and the buttons.
- As each item reaches the middle of the viewport, its layer lifts 8px, gains a 2px `--firm-line` outline and a numbered tag, and the rest of the sheet dims to 45% (240ms). Mapping: 1 → Filing details; 2 → State fees; 3 → the state's review page; 4 → the consent panel, with the product's own statement text; 5 → the buttons; 6 ("Like reviewing a return before you e-file it…") → the whole sheet lifts together under one outline.
- Item bullets: the 8px firm dot. The active item turns Graphite and its dot grows to 10px; the others rest at Slate.
- Phone: no sticky scene. Each item gets a 4:3 crop of its layer above it (the layer sharp, the rest of the sheet blurred and faded); item 6 gets the whole sheet in miniature.

**#requests.** h2 "Clients don't always fill in forms. They text you." · lede. Picture: P2 ("Ana texts") at 4:5, radius 20, with the act 1 draft card from the home page (9.3) overlapping its lower right corner, the "from the text" and "already filled" tags in place. Caption "Ana Ortiz · text message · example". On phones the draft card sits under the photo, overlapping it by 32px.

**#checks (reading room).** h2 "Checks before every filing." · lede · four items. A white panel (radius 28, hairline, no glow), two columns: h2 and lede in columns 1–4, the items in 6–12 with Graphite dots (support register: no firm color). The figures in the fine-print item ("$52", "$27") are set in Mono. No picture, no icons of shields or locks: plain, well-set reading.

**#after: "three tempos".** h2 "The papers come back to you." · lede · three items. Picture, in columns 6–12: three horizontal lanes on a white sheet, one per state named in the lede, labeled only with the state names:

```
  New Jersey  ●━━━━━━▣                       (answers at once: the document arrives right away)
  New York    ●━━━━━━✉━━━━━━━━━━▣            (a receipt by email, then the document)
  Florida     ●━━━━━━━━━━━◉━━━━━━━━━━━━━━━▣  (an examiner reviews first: a small person glyph)
```

Each lane starts at a dot and ends at a small document sheet; the New York lane passes an envelope icon; the Florida lane passes a person glyph. There are no times, no axis and no durations, only relative lengths, because the copy promises no times. Motion: the lanes draw left to right together (1.2s), so New Jersey's document arrives first and Florida's last. Phone: the lanes keep their horizontal form at full width.

**Close.** h2 "Run one rehearsal. Then decide." · lede · buttons "Run a free rehearsal" (primary) and "Questions" (secondary glass). P-6, the open door, sits above the headline as on the home page.

### 10.2 For firms (`/for-firms`)

**Page head.** Kicker "For CPA, payroll, fractional CFO and title firms" · h1 "Form the business. Keep the client." · lede ("Your client needs an LLC. Who do they call? You. …").

**Head picture:** P1 ("The door"), 4:5, radius 20, in columns 8–12: "Harbor & Pine CPA" on its own glass door, with nothing of CoFile in sight. On phones it follows the lede at full width (4:5). Alt text `[copy needed]`.

**#desk.** h2 "Your filing desk, in your brand." · five items, exactly as written. Picture: P-1 (the desk) flat, at full product scale, in columns 6–12, with the full labeled nav rail (not collapsed) so firms see the whole desk: "Filings", "New filing", "Ready to pay", "Client links", "Signatures", "Setup", "Billing". Item 5 ("CoFile is built and run by filing professionals…") gets the three P9 portraits beside it, as in the hero.

**#brand: the split, with the dial.** h2 "Your name on the door. Ours in small type." (typeset as on the home page) · lede "The same page carries each firm's own name, logo and color. Your clients never see another firm's, or a big CoFile logo." Picture: P-2 (the split), and under it **the color dial**:

- Ten 40px circular swatches, 14px apart, in a glass tray (radius 999, 68px tall): the product's own nine ready colors (`#1f4fd1`, `#0f766e`, `#15803d`, `#b45309`, `#b91c1c`, `#7e22ce`, `#be185d`, `#334155`, `#111827`) and a tenth **Spectrum** swatch that opens the native color picker for any hex. The active swatch gets a 2px white gap and a 2px Graphite ring; its hex shows to the right in Mono 15px Slate (data, not copy). Each swatch's accessible name is its hex. No visible label; if one is wanted, `[copy needed]`.
- A tap relights the **right-hand page** in that color (640ms OKLCH crossfade, the wave from the Door downward, the glow following). Its logo crossfades to a monogram plate ("NP") in the new color, because we never recolor a firm's logo; choosing copper again brings Northgate's logo back. The left page stays Harbor & Pine. "with CoFile" never changes.
- The chosen color is remembered for the visit (`localStorage`, in a try/catch) and lights the open door at the foot of this page and of the home page.
- Phase 2, optional: a "try your own logo" control in the tray that previews the right-hand page with the visitor's logo, processed only in the browser and never uploaded. Label `[copy needed]`.
- Phone: the dial scrolls horizontally inside its tray (44px targets), under the overlapping phones.

**#agent.** h2 "Your registered agent, or ours." · lede · three items with their links. Picture (small, columns 7–11): one field card from the client's form, staged: the label "Registered agent", the value "Your saved agent" in Mono, the "already filled" tag in `--firm-wash`, on a white sheet with a soft glow. A quiet picture for a quiet point: it's filled in on every filing.

**Close.** h2 "Open your firm's filing desk." · lede "Add your logo and color, then rehearse a real filing on the state's own website. …" · button. P-6, the open door, above the headline, here in the dial's color if the visitor chose one. Its dashed plate is literally the place "Add your logo" refers to.

### 10.3 What we file (`/what-we-file`)

**Page head.** Kicker "What we file" · h1 "New York, New Jersey, Florida and the IRS." · lede "Every filing type carries a plain label, so you always know which ones are live today." Head picture: P-4 (the shelf) at 60% scale in columns 8–12, as a preview of the full table below.

**#coverage: the table (reading room).** All 16 rows from `COVERAGE`, in their order, with the columns "Filing", "Where" and "Where it stands".

```
┌───────────────────────────────────────────────────────────┬──────────────┬──────────────────────────────────────┐
│ Filing                                                    │ Where        │ Where it stands                      │
├───────────────────────────────────────────────────────────┼──────────────┼──────────────────────────────────────┤
│ LLC formation                                             │ New Jersey   │ ╭╌ ◕ Rehearsed to the payment screen ╌╮│
│ Standing certificate (through the API; not on the filing… │ New Jersey   │ ╭╌ ◕ Rehearsed to the payment screen ╌╮│
│ …                                                         │              │                                      │
│ EIN, with the IRS letter saved                            │ IRS          │ ╭┄ ◑ Screens recorded, rehearsal next┄╮│
│ …                                                         │              │                                      │
│ Corporation formation (for-profit)                        │ New Jersey   │ ╭─ ◔ Offered, not yet rehearsed ─╮     │
│ Alternate name, charter amendments                        │ New Jersey   │   ○ Planned                          │
└───────────────────────────────────────────────────────────┴──────────────┴──────────────────────────────────────┘
```

- A white panel (radius 28), the table inside it: header row in Porcelain deep at 14px 500 Slate, sentence case; rows 60px, 17px text, hairlines between them; hover row Porcelain.
- "Where it stands" uses the full **fill-in scale** (4.2): Planned (text and empty glyph), Offered (hairline outline, ¼ glyph), Screens recorded (dotted outline, ½), Rehearsed (dashed outline, ¾), Live (solid green, full). The glyph is the non-color cue; the label is always written out.
- The note under the table ("Rehearsed to the payment screen: CoFile completed every screen…") at Small (15px) Ink 2, max 80ch, with the email as a link.
- Phone: each row becomes a stacked item (the filing name at 17px 600, the place at 15px Slate, the chip beneath), hairlines between.

**#live.** h2 "How a filing type goes live." · lede. Picture: P-5 (the run sheet), as on the home page.

**#states: four state notes.** h2 "State by state." · four notes ("New York", "New Jersey", "Florida", "IRS"), each an h3 and a paragraph, exactly as written. A 2 × 2 grid of white cards (radius 20, padding 32px), h3 at Title (24px), text at Body. No seals, outlines or flags: the place names in type are enough. The "(CP 575)" in the IRS note is plain text, nothing more.

**Close.** h2 "Rehearse one you know by heart." · buttons "Run a free rehearsal" and "See pricing". Centered, no picture, with the Harbor glow behind.

### 10.4 Pricing (`/pricing`)

**Page head.** Kicker "Pricing for firms" · h1 "$45 a filing. EIN included with a formation." ("$45" in the Price style at 96px, the rest at 64px) · lede ("Pay for each live filing, or take a plan with filings included every month. …"). No head picture: the plans are the picture.

**#plans: the price cards.**

```
┌────────────────────┬────────────────────┬──────────────────────┬────────────────────┐
│ Pay as you go      │ Starter            │ ╭ Growth ───────────╮│ Unlimited          │
│ $45 a filing       │ $250 a month       │ │ $500 a month      ││ $1,000 a month     │
│ No monthly fee.    │ or $2,500 a year   │ │ or $5,000 a year  ││ or $10,000 a year  │
│ Pay only for live  │ (2 months free)    │ │ (2 months free)   ││ (2 months free)    │
│ filings.           │                    │ │                   ││                    │
│ ▪ $25 for an EIN … │ ▪ 6 filings a month│ │ ▪ 15 filings a … ││ ▪ Unlimited filings│
│ ▪ $15 for copies … │ ▪ $40 for each …   │ │ ▪ $33 for each … ││   (fair use: 60 …) │
│ ▪ A filing profes… │ ▪ A filing profes… │ │ ▪ A filing prof… ││ ▪ $15 for each …   │
│                    │                    │ │  (raised, lit)    ││ ▪ Priority help …  │
│                    │                    │ ╰───────────────────╯│ ▪ A filing profes… │
└────────────────────┴────────────────────┴──────────────────────┴────────────────────┘
  Prices in US dollars, for partner firms. Building a filing product for many businesses? Talk to us about platform pricing.
```

- Four cards in a row (3 columns each), white, radius 20, e1, padding 32px, equal height.
- The plan name at Title (24px 600). The price at the Price style (56px) with its unit ("a filing", "a month") at 18px Slate on the same baseline. The line beneath ("No monthly fee. Pay only for live filings." / "or $2,500 a year (2 months free)") at Small.
- The items with 8px Graphite dots (not check marks), Body 17px. The last item on every card, "A filing professional takes over when a filing needs one", gets a 24px P9 portrait in place of its dot, the same person on every card: the people come with every plan.
- **Growth** (the product marks it as the middle plan) is raised 16px, e3, with the Harbor glow behind it and a 2px `--firm-line` border. No "most popular" badge: that would be new copy, and the light says it anyway.
- The note beneath at Small, with "Talk to us about platform pricing" as a link.
- Phone: the cards become a horizontal snap carousel (86% width, 12px gap, the next card peeking), starting on Growth, with page dots beneath; or, with reduced motion or a screen reader, a plain vertical stack.

**#counts: "what counts", with a picture of fractions.** h2 "What counts as a filing." · lede · five items with their bold leads. Picture in columns 7–12: three sheets side by side on the firm's light: a whole sheet (one filing: "a formation, a payroll registration…"), a sheet cut in half ("An EIN on its own: $25, or half a filing on a plan"), and a sheet cut in thirds with one third lifted ("Copies and certificates: $15, or a third of a filing on a plan"). Each sheet is labeled only with the bold lead from the copy beside it ("One filing:", "An EIN on its own:", "Copies and certificates:"). It makes the unit system obvious in one glance.

**#separate (reading room).** h2 "What's separate." · four items, bold leads, Graphite dots, a white panel. No picture.

**Close.** h2 "Start with a free rehearsal." · lede · button. Centered, the Harbor glow.

### 10.5 Security (`/security`)

**Page head.** Kicker "Security" · h1 "How we handle what you trust us with." · lede. No head picture and no glow: this page is the reading room, end to end.

**#security.** Five items, each an h3 and a paragraph, exactly as written ("Encrypted, masked SSNs", "Cards in a vault, logins encrypted", "Single-use links to the proof", "Signatures only on approval", "Separate accounts").

- A white panel (radius 28), two columns of cards (3 + 2), each card a hairline-topped block with padding 32px: the h3 at Title (22px 600), the paragraph at Body (18px), max 52ch.
- Each card carries a small Mono index ("01" to "05") in Slate above its h3, for orientation. No icons: no locks, shields, keys or vaults.
- The closing paragraph (the links to How it works, the Privacy Policy and the email) at Lede size, Ink 2, in a separate section below, centered at 62ch.
- Phone: one column.

### 10.6 Questions (`/faq`)

**Page head.** Kicker "Questions" · h1 "Questions, answered." · lede "Something else? hello@cofile.app".

**The questions.** Fourteen questions, in their order, as disclosures.

```
┌──────────────────────────────────────────────────────────────────────┐
│ What does "in beta" mean?                                        ＋  │  72px row
├──────────────────────────────────────────────────────────────────────┤
│ What is a rehearsal?                                             －  │
│   The whole filing, performed on the state's real website with no    │  answer, 18px, 64ch,
│   audience. CoFile fills in every screen with your details and …     │  revealed with a
├──────────────────────────────────────────────────────────────────────┤  240ms height ease
│ Who approves a filing?                                           ＋  │
└──────────────────────────────────────────────────────────────────────┘
```

- One column, 840px wide, centered, on a white panel (radius 28). Rows 72px min, the question at 20px 600 Graphite, a 24px plus/minus glyph on the right (the vertical stroke rotates away, 240ms); hairlines between.
- Answers at Body 18px Ink 2, max 64ch, 8px top / 24px bottom; links underlined.
- Deep links (`/faq#approves`): the targeted question opens and its row gets a `--firm-wash` background that fades out over 1.6s.
- "Is a person involved?" shows the three P9 portraits at 40px under its answer.
- Phone: full width, rows 64px min, the question at 18px.

### 10.7 For platforms (`/platforms`)

The one dark page: Graphite night (`#0E0F12`) with **Daylight** glows (cool `#2A3350` and warm `#3A2C25` in dark), because there's no firm here. It's for the companies building underneath.

**Page head.** Kicker "For platforms" · h1 "Building a filing product? Put CoFile underneath it." · lede ("Filing companies, and platforms that sign up new businesses, …").

**Head picture: "Underneath".** Columns 8–12, a layered stack seen in slight perspective (`rotateX(18deg) rotateZ(-8deg)`):

- Top layer: a white-label proof on light glass. Its Door holds a dashed placeholder plate (the platform's brand goes there, as on the open door), its button in a neutral slate.
- Middle layer: an embeddable widget, a small white form card with its "Filed with CoFile" line.
- Bottom layer, in Graphite: CoFile itself, a stream of webhook event names in Mono 14px (`filing.awaiting_approval` and the others as they appear in the API docs), with `"dryRun": true` highlighted in a Sea-colored code token.

Alt text `[copy needed]`. The picture says "underneath" without a word: the platform's brand on top, CoFile below.

**#enterprise.** Two columns: the five items (light text, 8px Spectrum-Sea dots; the code `"dryRun": true` as an inline code chip; "Read the API docs" as an arrow link) in columns 1–6, and the inquiry form on a dark glass card in columns 7–12. Form fields as in Components (11), in their dark variant: "Name", "Company", "Work email", "Phone (optional)", "States you file in", "Filings per month", "What you'd like to do (optional)", and the button "Send" (primary, white on dark: `#EDEFF3` fill, Graphite text).

Phone: page head, the picture (flattened, full width), the items, then the form.

### 10.8 Sign-up, log-in, password and verification

All of these share the **auth layout**: the same header (no nav, just the wordmark, "Log in" and "Run a free rehearsal"), the beta banner, Porcelain with a Daylight glow, and the footer.

**Sign-up: "Set up your firm's filing desk"** (`/signup`). Copy as written: the label "For firms", the h2 "Set up your firm's filing desk", the lede ("For firms that file for their clients. Confirm your email, put your name and logo on the door, …"), the form ("Firm name", "Kind of firm" with its five options, "Your name", "Work email", "Password", "Password again", "Phone (optional)", "Website (optional)", "States you file in", "Filings per month", the terms checkbox, "Create account"), the notes and "Building a filing product? See CoFile for platforms."

```
Desktop
┌──────────────────────────────────────────┬───────────────────────────────────────────────┐
│ For firms                                │            ░░▒▒▓ active light ▓▒▒░░            │
│ Set up your firm's filing desk           │  ╭───────────────────────────────────────╮    │
│ For firms that file for their clients. … │  │ ┌──┐ Harbor & Pine CPA ← typed live     │    │
│                                          │  │ │HP│                       with CoFile▪ │    │
│ Firm name        [Harbor & Pine CPA    ] │  │ └──┘                                    │    │
│ Kind of firm     [CPA or accounting fi▾] │  ╰───────────────────────────────────────╯    │
│ Your name        [                     ] │                                               │
│ Work email       [                     ] │   (P1, P5 or P6 photo, rotating, 4:5)          │
│ Password / again [          ] [        ] │                                               │
│ …                                        │                                               │
│ [ Create account ]                       │                                               │
└──────────────────────────────────────────┴───────────────────────────────────────────────┘
```

- Left (columns 1–6): the form on a white sheet (radius 24, padding 40px), fields at full width with paired fields ("Password" / "Password again", "Phone (optional)" / "Website (optional)") side by side from 1024px up. "States you file in" as three large toggle chips (48px, the dashed outline when off, solid Graphite when on).
- Right (columns 7–12, sticky): **the door fills in.** The open door from the close (P-6), now filling as the visitor types: the dashed plate becomes a monogram plate with their firm's initials (up to three, "&" kept) in the active light color, and the dashed name line becomes their firm name in the brand face at 22px 600. Below it, one photo from P1, P5 or P6 (4:5, radius 20), chosen to match "Kind of firm" when it's picked (CPA → P1, payroll → P5, title → P6; fractional CFO and "Something else" → P4). It's the first time the visitor sees their own name on the door.
- Phone: the door preview sits above the form at full width (64px tall) and fills in as they type; photos are dropped.
- **"Check your email"** (`/signup/sent`): the auth card (below) with the filled-in door from sign-up at its top (if this browser has it), the copy as written, and a 64px envelope illustration with one firm-colored line on the letter.

**The auth card** (log in, forgot and reset password, confirm email): a centered white sheet (480px, radius 24, padding 40px, e2) on the Daylight glow.

- **Log in** (`/login`): the label "Log in", h2 "Welcome back", lede "Firms go to their filing desk, platforms to their dashboard.", "Continue with Google" (a secondary button following Google's own sign-in button guidelines, full width), a hairline, then "Email", "Password", "Forgot your password?", the primary button, and the note ("New here? Set up your firm's filing desk. Enterprise developers can also log in with an API key."). Notices (session ended, password changed, Google errors) appear at the top of the card in the notice styles (11.7).
- **Forgot password / Reset password**: the same card, with "Reset your password" and its lede; the help line "At least 12 characters. A few unrelated words work well." under the fields.
- **Confirm your email** (`/verify-email`): "One click and your email is confirmed." with the single button "Confirm my email" at 56px; or the resend form.
- **API key log-in** (`/dashboard/login`): the auth card in its dark variant (Graphite night, Daylight dark glows), because it leads to the platform dashboard.
- **Invite expired / signed out** (`/invite-expired`, `/p/<firm>/signed-out`): the auth card with its heading and paragraphs as written; on a firm's signed-out page the card carries the firm's Door at its top, not CoFile's header.

### 10.9 Terms and Privacy

The **reading layout**, used for both:

- The header without nav, the beta banner, a white panel (radius 28 on desktop, full-bleed on phone).
- Title at 48px 600 (phone 32px), the effective date at Small, the link to the other document at the right.
- Body at 18px / 29px, max 68ch, Ink 2. Section headings ("1. What CoFile does", …) at 22px 600, with their numbers hung in the left margin in Mono 15px Slate on desktop.
- A sticky table of contents in the left column (columns 1–3) on desktop, listing the section headings at 15px, the current one in Graphite with a 2px rule; on phones it collapses into a disclosure at the top (label `[copy needed]` if it needs one beyond the headings).
- Bold sentences (for example the "not a law firm" paragraph) keep their bold: 600 Graphite, nothing more. No callout boxes.

### 10.10 404 and errors

- **"Page not found"** (`/not-found`): the auth card layout, with a picture above the heading: a proof sheet drawn as an empty skeleton (grey bars where text would be, the Door blank), tilted 3°. The heading "Page not found", "The link may be old or mistyped.", and the button "Go to the home page".
- **"Something went wrong"** (`error.tsx`): the same layout without the picture. The heading, the paragraph, "Try again" (primary) and "Log in again" (secondary). The reference ("If it keeps happening, tell us this reference: …") in Mono 14px with a copy-to-clipboard glyph.
- On a firm's pages, both use the firm's Door and light, never CoFile's header.
- **Client link errors** (`/i/<token>`: "This link has expired or isn't valid", "This link can't be used", "This filing is no longer offered"): the firm's Door, a short white card, the heading at 28px, the paragraph, and the firm's support email as a link if it has one. Calm, never alarming: no red, no icons.

### 10.11 The filing desk (`/p/<firm>`)

The firm's own workplace, so the firm's brand leads and CoFile is "with CoFile". Partner firms and firms set up by a platform get the same structure; only the lockup changes (partner firms: "with CoFile"; white-label: the platform's own name where the product sets it).

**The shell.**

```
Desktop
┌───────────────┬───────────────────────────────────────────────────────────────────────┐
│ [≋ HARBOR &   │  (page content, max 1040px)                                            │
│    PINE CPA]  │                                                                       │
│               │  ░░▒▒ a faint glow of the firm's color behind the page title ▒▒░░       │
│ ▤ Filings     │                                                                       │
│ ✚ New filing  │                                                                       │
│ $ Ready to pay│                                                                       │
│ ⛓ Client links│                                                                       │
│ ✍ Signatures  │                                                                       │
│ ⚙ Setup       │                                                                       │
│ ▣ Billing     │                                                                       │
│               │                                                                       │
│ ana@…  Log out│                                                                       │
│ with CoFile▪  │                                                                       │
└───────────────┴───────────────────────────────────────────────────────────────────────┘
  248px sidebar, white, hairline right
```

- **Sidebar** (248px, white, hairline right): the firm's logo at the top (logo rules from 3.4; max 200 × 44px), the nav ("Filings", "New filing", "Ready to pay", "Client links", "Signatures", and for partner firms "Setup" and "Billing"), 48px rows, 16px 500, a 20px icon each. The active item: `--firm-wash` background, `--firm-ink` text and icon, radius 10. A count badge on "Ready to pay" when filings are waiting (Your turn chip style). At the foot: the signed-in email (link to change password), "Log out" (text button) and "with CoFile".
- **Content:** Porcelain, max 1040px, 48px padding; the page title at 32px 600 with the primary action at its right.
- **Phone:** a 60px top bar with the firm's logo and a menu button; the menu opens the sidebar as a full-height sheet. The page's primary action ("New filing") sits under the title at full width.
- The footer line "Questions? Email …" (when the firm has a support email) at Small, centered at the foot of every page.

**Filings (overview).** Title "Filings" with "New filing" (primary, `--firm-fill`). Notices first ("Real filings need an active subscription; rehearsals are free.", "1 approved filing is ready to pay…", "1 filing needs someone to act."), in the notice styles. Then the list:

- Desktop: a white card holding a table ("Filing", "Type", "Status", "Started"): rows 64px, the business name at 17px 600 as a link, the "Rehearsal"/"Test" badge in the dashed style beside it, the type at 15px, the status chip, the date at 15px Slate tabular.
- Filings waiting for the firm (Proof ready / Waiting for approval) float to the top inside the list with a 3px `--firm` bar on the row's left edge and the Your turn chip. The firm's next job is always in the firm's own color.
- Phone: rows become cards (business name, type, chip, date), 12px apart.
- **Empty state, "Your desk is clear."** This is the first thing a new firm sees, so it's a moment: the firm's logo at 96px tall on a white sheet with the firm's light behind it, the copy as written ("Your desk is clear. Start a filing (it can be a free rehearsal), or send a client a link with your logo on it."), and the two buttons "New filing" and "Send a client a link". Their own name, big, on their own desk.

**Setup.** Title "Set up your account" (or "You're set up"), the lede, then a vertical stepper: three rows ("Your firm", "Branding", "Payment"), each with a 28px step dot (dashed ring when to do, a solid firm-color dot when done; no check marks), title and text, and its button at the right ("Set up your firm", "Set up branding", "Set up payment" or "Change"). The next step's button is primary. The optional "Registered agents" card follows, with "Add agents" / "Change agents".

**Branding: "the fitting room".** "Step 2 of 3", h1 "Branding", lede "Your clients see your name, logo and colors on the pages where they fill in and approve filings." Then two columns:

```
┌──────────────────────────────────────┬────────────────────────────────────────────────┐
│ Your web address                     │  Preview of a client's page                     │
│ cofile.app/ [harborpine        ]     │  ╭──────────────────╮  ╭──────────────────────╮ │
│ Name your clients see [Harbor & Pine]│  │ phone: the form  │  │ email: the firm's    │ │
│ Logo  [ upload ]  Use a link instead │  │ in the firm's    │  │ header and button    │ │
│ Main color   [■][#0f766e] ●●●●●●●●●  │  │ brand, live      │  │                      │ │
│   Aa on your color: white text, 5.3:1│  ╰──────────────────╯  ╰──────────────────────╯ │
│ Second color [■][#______] ●●●●●●●●●  │  ( Phone · Desktop · Email )  ← view toggle     │
│ Font  [Lora (serif)              ▾]  │                                                │
│ Support email shown to clients [   ] │                                                │
│ [ Save ]                             │                                                │
└──────────────────────────────────────┴────────────────────────────────────────────────┘
```

- Left (columns 1–5): the fields as written ("Your web address", "Name your clients see", "Logo", "Main color", "Second color", "Font", "Support email shown to clients"), each with its help text.
- **Color fields:** a 48px swatch button that opens the picker, the hex input in Mono, and the nine ready colors as 28px circles. Under the main color, a live **contrast sample**: an "Aa" chip on the chosen color with its text color and ratio (data the engine computes, e.g. "5.3:1"). The words around it are `[copy needed]` if any are wanted; the sample alone is clear.
- **Logo field:** a drop zone (dashed outline, 120px tall) that shows the logo after upload with the automatic trim and plate applied (3.4), so the firm sees exactly how it will sit. "Use a link instead" as a text button.
- Right (columns 6–12, sticky): **the live preview**, titled with the product's own "Preview of a client's page". A view toggle switches between the client's form on a phone, the same page on desktop and a client email `[copy needed for the toggle labels]`. Every change relights the preview in 640ms, the firm's light included.
- Phone: the preview sits at the top in a collapsible 280px tall strip that stays visible while the fields scroll.

**New filing.** Step 1, "Which state is the business in?": three large state cards (New York, New Jersey, Florida), each 160px tall, white, radius 20: the state name at 24px 600 and the product's count line ("2 filing types, plus the federal EIN") at 15px Slate. No outlines or seals. Above them, the ways to send details ("Or send us the details and we fill in the form for you to check": email, text or WhatsApp, Slack `/file`) as three copyable chips with Mono addresses. Step 2, "{State}: what are you filing?": filing type cards in a 2-column grid, each with its title, its Live (solid green) or Rehearsal (dashed) badge, its summary and fee note. Then the "Your pages for clients" card: each service's permanent URL in Mono with a copy button, and the widget code in a dark code block, under disclosures.

**The filing form** (`/p/<firm>/new/<kind>`): the intake form (10.13) inside the desk shell, with sections as white cards, "More options (optional)" disclosures, the "Same as" chips, the saved signatures select and signature pad, the Authorizations fieldset and the button "Create the proof". Fields filled from the firm's saved answers show the `--firm-wash` background with a small dot at the right (the same "already filled" language as the home page picture).

**Filing detail.** "← Filings", then the title at 32px with the status chip and the dashed "Rehearsal" badge, the meta line at 15px Slate, the next-step notice.

- **"Your proof is ready"** card, when the proof is waiting: a white card with a 3px `--firm` top edge, the firm's light behind it, the title "Your proof is ready", the line "Check every detail and fee exactly as they'll go to the state, then approve it or ask for changes. Nothing is filed until you approve.", and the button "Open the proof and approve it" (primary, 52px). The email note beneath at Small. This is the most important card on the desk, so it gets the most light.
- **A stage line** across the top of the page built from the filing's status history, using the product's own status words, with Live-green dots for completed stages and a dashed ring for the current one.
- **Documents:** the papers that came back, as document tiles (a 64 × 84px generic sheet thumbnail, the label and the kind at 15px), 3 per row. "Save to Google Docs" as a secondary button.
- **EIN:** "EIN:" at 15px Slate and the number in Mono 22px 600, on its own line.
- **"Progress on the state site"**: the run log in the run-sheet style (9.7), inside a disclosure.
- Notices for missing information, card codes and errors in the notice styles; the missing-information form in the field styles.

**Client links.** h1 "Send a client a link", the lede, the form ("Filing", "Who it's for (shown to you and the client)", "Make link"). The made link appears in a result card: the URL in Mono 17px, "Copy link" and "Email it from your mail app". Below, "Links you sent" as a table ("For", "Filing", "Made", "Status", and "Turn off"), with statuses as chips: "Waiting for the client" (Neutral: it's the client's turn, not the firm's), "Used: open the filing" (a link), "Turned off" and "Expired" (Slate text).

**Requests from a text or email** (`/p/<firm>/from-email/<id>`). h1 "Request by text message" (or email, WhatsApp, Slack), the from line. The original message shown as a message bubble (the same generic bubble as the home page) or an email card. Then the match card: "This looks like a request for: New Jersey LLC formation." with the filled count line and "Open the filled-in form" (primary). The disclosures "Not this filing? Choose another" and "Your message" below.

**Signatures.** h1 "Saved signatures", the lede, the table of signers ("Signer", "Saved", "Last used", "Remove"), then "Add a signature" with the signature pad: a white sheet 560 × 200px, a 1px baseline in `--firm-line` 48px from the bottom with a small "×" mark at its left, the stroke drawn in Graphite at 2.5px with pressure smoothing; "Clear" as a text button `[copy needed if it lacks a label]`; the consent checkbox in a `--firm-wash` panel.

**Ready to pay.** h1 "Ready to pay", the lede. Filings waiting, grouped by card: each group a white card headed by a generic card tile (88 × 56px, radius 8, Graphite gradient, the card's label and "ending 4242"-style last four in Mono; no card network marks unless the card is that network and its guidelines allow it), the filings listed under it, and one security-code field (Mono 24px, 4 boxes' width) with the button. Empty state: "Nothing is waiting for a card right now." with nothing else.

**Billing.** h1 "Billing". The current plan summary card (plan name, status chip from the product's words: "Active", "Free trial", "Payment failed: Stripe is retrying"…), "Manage billing". Then the plan picker: the same price cards as the Pricing page (10.4) with the Monthly/Annual toggle (a segmented control, 44px), "Your plan" as a Live-tint chip on the current card, and each card's button. The registered agent services panel follows as a plain card.

### 10.12 The proof the firm approves

The page behind "Open the proof and approve it" and the "Your proof is ready to approve" email. It's built from `renderReviewPage`: the firm's brand on top (its logo, name, color and font), "with CoFile", then the filing. The firm approves it, so it should feel like the moment a printer hands over a perfect proof: unhurried, beautiful and complete.

```
Desktop (sheet 760px, centered on Porcelain with the firm's light)
┌──────────────────────────────────────────────────────────────────────────┐
│ [≋ HARBOR & PINE CPA]                                     with CoFile▪   │  the Door
├──────────────────────────────────────────────────────────────────────────┤
│ ┆ Rehearsal: nothing will be filed or paid, even if you approve. ┆       │  dashed band
│                                                                          │
│ Two Sisters Bakery LLC                                                   │  h1, firm font 34px
│ Filing reference … Please decide by December 3, 2026, 5:00 PM Eastern.   │
│ ┌────────────────────────────────────────────────────────────────────┐   │
│ │ By approving, you confirm every detail below is correct and …       │   │  consent, --firm-wash
│ └────────────────────────────────────────────────────────────────────┘   │
│ The state's review page                                                  │
│ ┌ neutral frame ─────────────────────────────────────────────────────┐   │  tap to zoom
│ │  (the captured page, unaltered)                                    │   │
│ └────────────────────────────────────────────────────────────────────┘   │
│ Filing details                                                           │
│ Business name                       TWO SISTERS BAKERY LLC               │  labels 16px Slate,
│ Members › 1 › Name                  Ana Ortiz                            │  values Mono 16px
│ …                                                                        │
│ State fees                                                               │
│ Formation filing fee                                     $100.00         │
│ NJ portal fee, by card                                     $3.50         │
│ Total                                                    $103.50         │
│ One-time code sent to you  [ ______ ]                                    │
│ What should change? (Needed only if you ask for changes)  [          ]   │
│ [ Approve, and authorize submission and payment ]  ( Request changes )   │
│ Questions: …                                                             │
│                              with CoFile▪                                │
└──────────────────────────────────────────────────────────────────────────┘
```

- **The Door** as in 3.4, the firm's light spilling from behind the logo.
- **The rehearsal band** (when it's a rehearsal): the dashed outline band with a spike-tape glyph and the product's sentence in 16px 600. Inviting, not a warning: no amber.
- **Title block:** the filing title in the firm's font, 34px / 28px; the reference and deadline line at 16px Slate with the deadline in 600 Graphite.
- **Consent panel:** `--firm-wash`, radius 14, 17px Ink 2, padding 20px 24px. The product's consent sentences and the EIN and drafts notes, exactly as built.
- **The state's review page** (where the state allows it): "The state's review page" heading, its paragraph, then the captured image in a neutral frame (1px `#C9CDD4`, radius 10, a 32px grey top band with no text). Tap or click opens a full-screen viewer with pinch and wheel zoom. The image keeps its alt text as written.
- **Filing details:** a table with the label column at 40%. Nested keys ("Members 1 › Name") are set as a breadcrumb: earlier segments in Slate, the last in Graphite, "›" in Hairline-dark. Values in Suisse Int'l Mono 16px Graphite. The SSN note in Small above the table when present; masked values (`***-**-1234`) in Mono with the stars in Slate.
- **State fees:** right-aligned tabular amounts; the total at 22px 600 above a hairline; "Maximum you authorize" as its own row in Ink 2.
- **The decision:** the one-time code field (when required) in Mono 24px with letter-spacing 0.2em, 220px wide; the comment textarea; then the two buttons: "Approve, and authorize submission and payment" (primary, `--firm-fill`, 56px, the firm's font at 18px 600) and "Request changes" (secondary, white with a 1.5px `--firm-ink` border). On phones both are full width, stacked, the approve button first.
- **Footer:** "Questions: …" at Small, then "with CoFile" centered.
- **Phone:** the sheet becomes the page (no outer margin, sections as white blocks on Porcelain, 20px padding); tables stack labels above values; the state's page image is full width.
- **Dark mode:** the page honors it (surfaces `#16181C`), but the state's review page image stays in a light frame.

**"Approval recorded"** (the decision page): the firm's Door, then a white sheet with the firm's light blooming behind it (it arrives with the bloom from the approve button, 8.4). The heading "Approval recorded" at 34px in the firm's font, the paragraph as written (rehearsal or live), "Questions: …", "with CoFile".

### 10.13 The firm's pages for clients: filing pages, client link pages and the intake form

These are the only pages a firm's client sees, so they carry no CoFile branding beyond "with CoFile" and must be at their best on a phone.

- **Filing pages** (`/<firm>/<service>`, for example `cofile.app/bestaccounting/llc-filing-new-york`), **white-label hosted pages** (`/e/<account>/<firm>/<service>`) and **client link pages** (`/i/<token>`) share one layout: the Door, the beta notice in the firm's wording ("This service is in beta…"), the rehearsal notice if the filing isn't live ("This page is in rehearsal for now. …", in the dashed band, not amber), the h1 (the filing title, plus " · {label}" in Slate on client link pages), the summary line ("After you send this, {firm} checks every detail and fee and approves exactly what will be filed. …"), the fee note, the form, the footnotes and "with CoFile".
- **Layout:** one column, 680px max on desktop, centered on Porcelain with the firm's light behind the Door. On phones, 20px side padding, full-width fields.
- **The intake form:**
  - Sections as white cards (radius 20, padding 28px / 20px on phone), each with its title at 20px 600 (firm font) and help text at Small.
  - Fields per Components (11.2), 56px tall on phones, labels above, help below, "Fields marked * are required." at the top.
  - Address blocks: the "Same as" chips (36px pills, "Same as" in Slate then each earlier address as a chip) above the fields; "Same person as" the same way.
  - Repeating groups (members, managers): each item a sub-card with its title and "Remove" text button; "Add member" as a dashed-outline full-width button (the dashed line meaning "add something here").
  - "More options (optional)" disclosures in Slate with a chevron.
  - Authorizations: a fieldset with each statement as a large checkbox row (24px box, 17px text, the whole row tappable, a `--firm-wash` background when checked).
  - The signature pad as in 10.11.
  - The send button "Send to {firm}" (primary, the firm's fill and font, full width on phones, 56px), with the fee note beside or below it.
  - Errors: the summary at the top ("Please fix these and submit again.") in the Problem notice, each field's message under it in Problem red with an icon, the field border at 2px.
- **After sending:** the form is replaced by a white card with the firm's light: "Thank you, we have your details." at 24px 600 in the firm's font and the message ("Next, the firm checks every detail and approves the filing. …"), with the firm's logo at 48px above. A small moment of pride for the client, in the firm's colors.

### 10.14 Platforms: dashboard, API docs, hosted page and embed

**The dashboard** (`/dashboard`), CoFile's own, so Graphite and Daylight lead.

- The same shell as the filing desk, with CoFile's wordmark at the top of the sidebar and the nav "Overview", "Filings", "Ready to pay", "Firms", "API keys", "Webhooks", "Setup", "Team", "Billing" (or "Sign-ups"), "Docs". Active item in Graphite on `#EEF0F3`.
- **Overview:** the account name as h1; notices; then three stat tiles ("Filings", "Webhook deliveries", "API keys"): white cards, the label at 15px Slate, the figure at 40px 600 tabular, the sub-line at Small. Then three bar-chart cards ("By status", "By state", "By month"): horizontal bars 10px tall, radius 5, in Graphite at 85% with the largest bar in full Graphite; labels at 15px left, counts at 15px tabular right; "None yet." when empty. "As of …" at Caption.
- If the platform has set a brand color for its white-label pages, its color becomes the dashboard's light and active-nav accent (through the same engine); otherwise Daylight.
- Tables (filings, firms, keys, webhooks) as in Components (11.6). API keys and webhook secrets in Mono with a "copy" glyph and a reveal toggle.

**API docs** (`/docs`).

```
┌──────────────┬───────────────────────────────────────────┬──────────────────────────────┐
│ Overview     │ CoFile API                                 │  (reference pages only)       │
│ Guides       │ File state business paperwork from your …  │  ┌ dark code panel ─────────┐ │
│  Authentic…  │                                            │  │ curl …/v1/filings \       │ │
│  Filings and…│ Quick start                                │  │  -H "x-api-key: $COFILE_… │ │
│  Filing types│ 1. Get an API key from the dashboard.      │  │ { "dryRun": true, … }     │ │
│  Approvals   │ 2. …                                       │  └───────────────────────────┘ │
│  Webhooks    │ ┌ code ───────────────────────────────┐    │                              │
│  Errors      │ │ curl https://…/v1/filings -H …      │    │                              │
│  Saved sign… │ └─────────────────────────────────────┘    │                              │
│  White-label…│ Guides (cards)                             │                              │
│ Reference    │                                            │                              │
│  Endpoints   │                                            │                              │
│  OpenAPI     │                                            │                              │
└──────────────┴───────────────────────────────────────────┴──────────────────────────────┘
```

- A three-column layout: the docs nav on the left (240px: "Overview", "Guides" and their titles, "Reference", "Endpoints", "OpenAPI (JSON)"), prose in the middle at 17 / 28 with a 68ch measure, and on reference pages a sticky dark code panel on the right.
- **Code blocks:** Graphite night `#0E0F12`, Suisse Int'l Mono 14.5 / 23, radius 14, a copy button at the top right. Syntax colors drawn from Spectrum, lightened for dark: keys Iris `#B9A8F7`, strings Apricot `#F5C38E`, numbers Rose `#F29BB0`, booleans and `null` Sea `#7FD1B9`, comments `#7A808C`, punctuation `#A4AAB7`. `"dryRun": true` looks the same here as on For platforms.
- **Endpoint blocks:** the method as a chip (GET Sea, POST Iris, PUT Apricot, DELETE Rose: each a 10% tint with the full color for text, Mono 14px 600), the path in Mono 17px; summary in 600; "Query", "Body" and "Responses" as small labels at 14px 500 Slate; examples in code blocks; status codes as Mono chips.
- Guide cards on the docs home: white cards in a 2-column grid, title at 18px 600 and summary at 15px Slate.
- Phone: the nav becomes a disclosure at the top; the code panel follows the prose.

**The white-label hosted page** (`/e/<account>/<firm>/<service>`): identical to a firm's filing page (10.13), in the firm's brand, with the platform's name and support contact where the product puts them.

**The embed widget** (`/embed/…`): the intake form with no page chrome, built to sit inside someone else's website.

- A transparent outer background, so the host page shows through; the form's sections as white cards with a hairline (their shadows off, because shadows look wrong inside other sites).
- The firm's color and font as always; the host page decides the width (fluid from 320px), and `EmbedResizer` keeps the height exact, so there's never an inner scrollbar.
- 16px padding; no Door (the host site is the door); "Filed with CoFile" at 14px at the foot, using the lockup construction.
- No beta banner, as the product already does.

### 10.15 Emails

Two families, designed in React Email with tables and inline styles, tested in Litmus, 600px wide, readable at 17px.

**Firm-branded emails.** For partner firms, the filing emails go to the firm itself, so they carry the firm's own brand: "Your proof is ready to approve: …", "More information needed: …", "Changes requested: …", "Completed: …" (the documents are back), "Rejected by the state: …", "Card security code needed: …", and the client-facing ones a platform's end clients receive.

```
┌──────────────────────────────────────────────────┐
│ [≋ HARBOR & PINE CPA]                            │  white header, logo max 200 × 40
│ ▬▬▬▬▬▬ (a 6px band of the firm's color)           │
│                                                  │
│ Your proof is ready to approve:                  │  24px 600, firm font where supported
│ NJ llc formation: TWO SISTERS BAKERY LLC         │
│                                                  │
│ ┆ Rehearsal: nothing will be filed or paid … ┆   │  dashed band, only on rehearsals
│ Your proof is ready. Open the link to see every  │  17px / 27px
│ detail and every fee, exactly as they'll go to   │
│ the state, then approve it or ask for changes. … │
│                                                  │
│ [      Open your proof      ]                    │  56px bulletproof button, --firm-fill
│                                                  │
│ Questions: …                                     │
│ ─────────────────────────────────────────────    │
│ with CoFile▪                                     │  footer, 14px
└──────────────────────────────────────────────────┘
```

- **Header:** the firm's logo on white (the trimmed, plated version from 3.4, as a PNG at 2×), and beneath it a 6px band in the firm's main color. (In email, light can't be a glow, so the color becomes one clean band. It's the only place the system uses a stripe.)
- **Subject line as headline:** the subject, as written, at 24px 600.
- **Body** at 17 / 27px, Graphite on white, max 520px.
- **Button:** a bulletproof button (VML for Outlook), 56px tall, in `--firm-fill` with `--firm-on` text, the link label as written ("Open your proof", "Review the filing", "Choose a name", "Enter security code"; "Open" when none is set).
- **"Completed" (documents back):** under the body, a small document tile (a 48 × 64 generic sheet image) with the state reference in Mono, when the product includes one.
- **"EIN issued":** the status exists in the product ("EIN issued"), but no email copy does yet: subject and body `[copy needed]`. Designed like "Completed", with the EIN in Mono 22px 600 in its own row.
- **The beta and rehearsal lines** appear as the dashed band only when the product includes them.
- **Footer:** "with CoFile" only. Dark-mode email clients: the logo PNG gets a 6px white padding plate so dark logos survive inverted backgrounds.

**CoFile's own account emails**: "Confirm your email for CoFile", "Your partner account is open", "Your CoFile account is ready", "Reset your password", "You're invited to {firm}'s filing portal" (this one in the firm's brand, since it's the firm's invitation).

- Header: the CoFile wordmark at 22px, its dot in Spectrum (a tiny embedded PNG, so the gradient survives), on white.
- A 280px-tall header image on "Your partner account is open" and "Your CoFile account is ready" only: the open door (P-6) rendered as an image, its plate showing the new firm's initials in the monogram style, drawn server-side. Their name on the door, the day they sign up.
- Body and buttons as above, with the button in Graphite.
- Footer: the legal line and hello@cofile.app at 14px, Slate.

---

## 11. Components

One library for the marketing site, the filing desk, the proof, the client pages and the docs. On CoFile's pages the accent tokens resolve to Graphite (and Daylight for light); on a firm's pages they resolve to the firm's tokens (4.3). Same components, different light.

### 11.0 Foundations

| Token | Values |
|---|---|
| Radius | `--r-xs` 6 (code chips) · `--r-sm` 10 (small buttons, plates, nav items) · `--r-md` 12 (buttons, fields) · `--r-lg` 16 (cards, windows) · `--r-xl` 20 (sheets, tiles, price cards) · `--r-2xl` 28 (reading-room panels) · pill 999 |
| Elevation e0 | none; a 1px Hairline border |
| Elevation e1 (cards) | `0 1px 2px rgba(20,22,26,.05), 0 0 0 1px rgba(20,22,26,.06)` |
| Elevation e2 (raised, menus) | `0 12px 32px -12px rgba(20,22,26,.18), 0 0 0 1px rgba(20,22,26,.06)` |
| Elevation e3 (staged sheets) | `0 48px 96px -32px color-mix(in oklch, var(--firm) 38%, transparent), 0 16px 32px -16px rgba(20,22,26,.22), 0 0 0 1px rgba(20,22,26,.05)` |
| Focus ring | 2px gap in the surface color, then 2px `--firm-ink` (Graphite on CoFile pages), then a 4px `--firm-line` halo at 50%. Visible on every interactive element, keyboard and touch alike. |
| Touch targets | 44px minimum everywhere; 56px for primary actions on phones |
| Dark mode | every token has its dark value (4.4); elevation shadows become darker borders plus a subtle top highlight |

### 11.1 Buttons and links

| Kind | Look | Sizes |
|---|---|---|
| **Primary (CoFile pages)** | Graphite `#14161A` fill, white text 600, `inset 0 1px 0 rgba(255,255,255,.14)` top highlight. Hover: `#23262D` and a 4px glow halo in the active light. Press: `#0B0C0F`, translateY(1px). | L 56px (padding 0 28, 17px) · M 48px (0 22, 16px) · S 40px (0 16, 15px) |
| **Primary (firm pages)** | `--firm-fill` with `--firm-on` text in the firm's font, 600. Hover: L −0.05 in OKLCH. Press: L −0.10. | same |
| **Secondary** | Glass over imagery (`--glass` + edge), white with a 1px `--field-line` border on plain surfaces; Graphite text (`--firm-ink` on firm pages). | same |
| **Text button** | No box, 600, underline offset 4px on hover. ("Log in", "Log out", "Use a link instead") | 44px tall hit area |
| **Arrow link** | 17px 600 Graphite, a 16px arrow that slides 3px right on hover; underline on hover only. ("For firms", "How it works", "See all plans", "See which are live today") | — |
| **Inline link** | Underlined (1px, offset 3px), in Graphite on CoFile pages and `--firm-2` on firm pages; hover thickens the underline to 2px. | — |
| **Destructive** ("Remove", "Turn off") | White with Problem red text; a red border appears on hover. Never filled red. | S |
| **Add** ("Add member") | Full-width, 48px, 1.5px **dashed** outline, Slate text and a plus icon: the dashed line means "something goes here". | — |
| **Disabled** | 40% opacity, no shadow, `cursor: not-allowed`; the label stays. Pending states change the label as the product does ("Sending…", "Creating…") with a 16px spinner. | — |

### 11.2 Fields

- **Text input, select, textarea:** white, 1px `--field-line` (`#868D9A`, ≥ 3:1), radius 12, height 52px (56px on phones), padding 0 16px, 17px text (18px on phones so iOS never zooms). Placeholder in Slate. Select: a 20px chevron at the right. Textarea: 120px min, grows with content.
- **Label** above at 15px 500 Graphite, 8px gap; the required asterisk in Slate. **Help** below at 15px Slate, 6px gap. **Error:** 15px Problem red with a 16px attention icon, the border at 2px Problem red; the error never replaces the label.
- **Focus:** a 2px `--firm-ink` border and the 4px halo.
- **Filled from saved answers:** a `--firm-wash` background and a 6px `--firm` dot inside the right edge, with a tooltip `[copy needed]`. Same visual language as "already filled" in the home page picture.
- **Read-only values** (the proof, the request page): no box; label above, value in Mono.
- **Checkbox and radio:** 24px boxes, radius 6 (checkbox) or round (radio), 1.5px `--field-line`; checked: `--firm-fill` with a white mark. Always in a 48px row with the label, the whole row clickable.
- **Choice cards** (radio groups with descriptions, the state picker, plan periods): 56px+ rows, white, 1px border; selected: a 2px `--firm-ink` border and a `--firm-wash` fill.
- **Yes/no:** a two-option segmented control, 48px.
- **Toggle chips** ("States you file in"): 48px pills; off: dashed outline; on: solid Graphite (or `--firm-fill`) with white text.
- **Color field:** a 48px swatch button, the hex input in Mono (110px), and the ready colors as 28px circles; the selected one with a gap and ring.
- **Logo field:** a 120px drop zone with a dashed outline that shows the trimmed, plated logo after upload; "Remove logo" as a destructive text button.
- **One-time code:** Mono 24px, letter-spacing 0.2em, centered, 220px wide.
- **Signature pad:** see 10.11.

### 11.3 Cards, sheets and windows

- **Card:** white, radius 16, e1, padding 32px (20px on phones). The workhorse of the desk.
- **Sheet:** white, radius 20, a 1.5px lower edge `#E7E9ED`, e3 when staged. Used for every staged page in the pictures, the proof, and the empty states.
- **Window:** a sheet with a 40px top bar (three Hairline dots, the address pill in Mono 14px). Pictures only.
- **Phone:** the generic device (7.2). Pictures only.
- **Reading-room panel:** white, radius 28, a hairline border, no shadow, no glow. Security, Questions, legal, the coverage table, the checks.
- **Notice card** ("Your proof is ready" on the filing detail): a card with a 3px `--firm` top edge and the firm's light behind it.

### 11.4 The proof

The proof is a component with these parts, in this order, so it can render at full size (10.12), as a picture (9.3, act 2), as a miniature (10.1 card 2) or as layers (10.1 #proof):

1. **Door** (3.4).
2. **Rehearsal band** (optional): dashed outline, radius 12, spike-tape glyph, 16px 600.
3. **Title block:** the title (firm font), the status chip ("Ready to approve" in the Your turn style), the reference and deadline line.
4. **Consent panel:** `--firm-wash`, radius 14.
5. **State's review page** (optional): heading, paragraph and the framed image, or in pictures the foreign-UI inset with its caption.
6. **Filing details:** the label/value table (labels Slate, values Mono), with `--firm-mark` highlighter marks available for pictures.
7. **State fees:** right-aligned tabular amounts, total row, maximum row.
8. **Decision:** code field, comment field, approve (primary, the firm's) and "Request changes" (secondary).
9. **Footer:** questions line, "with CoFile".

Callout pins (24px Graphite circles, white Mono numerals) are a picture-only add-on.

### 11.5 Chips, badges and marks

| Chip | Look |
|---|---|
| **Status chip** | 28px pill, 14px 500, padding 0 10px 0 8px, a 6px dot then the label; tones from 4.2 (Your turn, Live, Attention, Problem, Neutral). Never color alone. |
| **Rehearsal / Test badge** | 24px pill, no fill, 1.5px dashed Graphite outline (dash 4, gap 3), 14px 600. Beside a filing title, or as the Beta pill. |
| **Live badge** (filing type cards) | 24px pill, solid Live green fill, white 14px 600 text. |
| **Fill-in chip** (coverage table) | 28px pill with the 14px four-quarter glyph and the label; outline style from 4.2. |
| **Coverage mark** (home tiles) | 16px: solid dot / dashed ring / dotted ring, with an `aria-label` and a tooltip. |
| **Source tag** ("from the text", "already filled") | 24px pill, 14px 500; "from the text" on `--firm-mark` with a 12px bubble icon; "already filled" on `--firm-wash` with a 6px dot. |
| **Count badge** (nav) | 22px circle, 14px 600 tabular, `--firm-fill` with `--firm-on`. |
| **Method chip** (docs) | Mono 14px 600 in a 10% tint of its method color (4 colors, 10.14), radius 6. |
| **Example label** | Not a chip: the picture's caption at 14px Slate, centered under it. |

### 11.6 Tables

- Inside a card or a reading-room panel, never floating. Header row: 44px, 14px 500 Slate, sentence case, Porcelain deep background on wide tables.
- Rows 56–64px, 16–17px text, hairline separators, hover row in `#F8F9FA`.
- Numbers right-aligned with tabular figures; dates in Slate; Mono for IDs, URLs and codes.
- The primary cell (a business or filing name) is the row's link: 600, Graphite, underline on hover.
- Phones: tables with more than two columns become stacked cards (the primary cell as the card title, the others as label/value lines).

### 11.7 Notices

| Tone | Look |
|---|---|
| Info / neutral | `#EEF0F3` background, Graphite text, a 20px info icon |
| Your turn | `--firm-wash` background, `--firm-ink` icon, Graphite text, the action as an inline link |
| OK | Live tint, Live text for the first sentence, Graphite for the rest |
| Attention | Attention tint, a 20px attention icon, Graphite text |
| Problem | Problem tint, a 20px problem icon, Graphite text; `role="alert"` when it's a form error |
| Rehearsal | Dashed outline band, no fill |

All notices: radius 14, padding 16px 20px, 16–17px text, the icon top-aligned with the first line. No left color stripes, no shouting bold.

### 11.8 Price strip and price cards

- **Price strip** (home, 9.8): one white sheet, four equal cells with hairline dividers, 160px tall, figures in the Price style (56px), units at 18px Slate. 2 × 2 on phones.
- **Price card** (Pricing, Billing, 10.4): white, radius 20, e1, padding 32px; the plan name at 24px 600; the price figure at 56px with its unit on the baseline; the sub-line at Small; items with 8px Graphite dots; the takeover line with a 24px portrait. The middle plan raised 16px with e3, the light behind it and a 2px `--firm-line` border. On Billing, the current plan adds the "Your plan" chip and drops its button.
- Figures always tabular, never with superscript dollar signs, never with "starting at" in small type: the copy's own words do that job.

### 11.9 Navigation

- **Marketing header** (9.0): glass, 72 → 60px, wordmark, five links, "Log in", primary CTA; on phones the wordmark, "Log in" and a menu button that opens a full-height glass sheet.
- **Phone CTA bar** (9.0).
- **Filing desk sidebar** (10.11) and **phone top bar**.
- **Dashboard sidebar** (10.14).
- **Docs nav** (10.14): 240px, section labels ("Guides", "Reference") at 14px 500 Slate, links at 15px, the current page in Graphite with a 2px left rule.
- **Segmented control** (Monthly / Annual, Phone / Desktop / Email): 44px, a Porcelain-deep track, the selected segment white with e1, 240ms slide.
- **Breadcrumb back link** ("← Filings", "All states"): 15px 500, Slate, Graphite on hover.

### 11.10 Disclosures and the accordion

- **Disclosure** ("More options (optional)", "Not this filing? Choose another", "Your message", "Progress on the state site"): a 48px row, the summary at 16px 500 with a 16px chevron that rotates 90° (240ms); the content reveals with a height ease.
- **Accordion** (Questions, 10.6): 72px rows, 20px 600 questions, a plus/minus glyph.

### 11.11 The brand pieces as components

- **Door** (3.4) with logo analysis, plates and the "with CoFile" lockup.
- **Monogram plate** (3.4): 40px default; 56px on the open door; 96px on the empty desk.
- **Dashed plate** (P-6): the empty state of the Door, used in the close, sign-up and the platform picture.
- **Color dial** (10.2 and Branding).
- **Stage line** (act 3, filing detail): 14px dots, 2px connecting line, labels below at 15px 500.
- **Portrait stack** (P9): 24 / 32 / 40px circles, 2px white rings, overlapping by 30%.
- **Glow** (7.2): a component, not ad-hoc CSS: `<Light tone="firm|daylight|spectrum" strength="10|14|22|32" />`, so every glow on the site is tuned in one place.

---

## 12. Craft notes

- **Dark mode.** Every token has a dark value (4.4) and every page honors `prefers-color-scheme`, with a manual override in the footer `[copy needed]`. Staged pictures stay light on a dark page (they're product shots, and a lit white sheet on a dark page is the most beautiful version of them); glows get richer (28%). Firm colors are lifted for text and links in dark. The state's review page image is always framed light. Emails keep a white body.
- **Phones.** Copy first, then the picture, always. Pictures stay at product scale (never shrunk past 15px text), cropped instead of scaled. Primary actions are 56px and full width; the phone CTA bar keeps "Run a free rehearsal" one thumb away without ever doubling it. The client's pages (10.13) are designed phone-first and then widened, not the reverse. Respect safe areas; no hover-only information.
- **Older eyes.** Body never under 17px; nothing under 14px anywhere. Text contrast ≥ 4.5:1 (Slate on white is 6.3:1); field borders ≥ 3:1. No light-grey-on-white text, no thin weights (nothing under 400), no all-caps sentences, no italics for meaning. Status always has text and a shape, never color alone. Line length ≤ 68ch. Focus rings are visible on every element. Motion is optional (reduced motion gives the final frames), and nothing important lives only in motion or in a tooltip.
- **Spanish text length.** Plan for 25–35% longer strings. Headlines are set with `text-wrap: balance` and hand breaks per language, never in fixed-height boxes. Buttons size to their label and may wrap to two lines on phones (min 56px tall, padding kept). Chips, tags and nav items never have fixed widths; the header nav collapses into the menu at a width that depends on the measured labels, not a fixed breakpoint. Tables stack on phones. No text is ever baked into an image (the pictures are live components, so they translate with the page). The firm fonts in the presets and Suisse Int'l both cover á é í ó ú ñ ü ¿ ¡. Test every page with a +35% pseudo-locale before launch.

---

## 13. Production

### 13.1 Tools

| Job | Tool |
|---|---|
| Design system and page design | Figma, with variables for every token, in modes: Light / Dark × CoFile / Harbor / Northgate / any firm (a mode per test color from the ready list) |
| Tokens to code | Figma variables → Tokens Studio → Style Dictionary → CSS custom properties and a TypeScript token module |
| The House Light engine | TypeScript with `culori` (OKLCH ramps, contrast solving), run on the server when a firm saves Branding and cached on the firm record; the same code runs in the browser for the live preview and the color dial |
| Logo analysis | Canvas in the browser (trim, corners, aspect class, dark detection) when the firm uploads; `sharp` on the server for older logos and email PNGs |
| Components | React (the existing Next.js app), CSS modules on the tokens; Storybook with a firm-color switcher on every story |
| Motion | Motion for React; `useScroll` for the journey stage (M3); SVG `stroke-dashoffset` for dashed and drawn lines |
| Pictures | The real components rendered live in the page; Playwright captures at 3× for the screen inserts in photos, OG images and emails |
| OG and social images | `@vercel/og` (or Satori) templates per page in the brand: the page's h1 in Suisse Int'l on Porcelain with the active light; firm filing pages get the firm's Door and color |
| Photography | Capture One for the shoot; Photoshop for screen compositing |
| Illustration | Vector (SVG), drawn on the 24px icon grid and our document grid |
| Email | React Email, Litmus for client testing |
| Quality | Lighthouse and axe in CI; visual regression (Playwright snapshots) for each picture in the nine ready colors plus near-black, yellow and neon test colors |

### 13.2 Asset list

| Asset | Format | Count |
|---|---|---|
| Wordmark (light, dark, one-color) | SVG, plus PNG at 1×–3× for email | 3 |
| C-and-dot symbol (tile, no tile; Spectrum, one-color) | SVG | 4 |
| Favicon and app icons (CoFile) | SVG favicon, 32/180/512 PNG, maskable icon | 5 |
| Firm favicon generator | Server template (monogram plate or square logo crop) | 1 template |
| Spectrum dot for email | PNG 2× | 1 |
| Harbor & Pine CPA logo (wide, square, on a box, old JPEG) | SVG + the two raster demos | 4 |
| Northgate Payroll logo (wide, square) | SVG | 2 |
| Best Accounting wordmark | SVG | 1 |
| Generic phone frame | SVG (frame) + PNG shadow pass | 1 |
| Browser window frame | Component (no asset) | — |
| Grain tile | PNG 256px, 8-bit | 1 |
| Document sheets (state document, IRS letter, receipt email) | SVG | 3 |
| Skeleton proof (404) | SVG | 1 |
| Spike-tape marks (L and T, torn ends) | SVG | 8 |
| Foreign-UI screen thumbnails | Components with sample fields | 5 layouts |
| Icon set | SVG, 24px grid | ~48 |
| Photography P1–P8 | Retouched TIFF masters, AVIF/WebP/JPEG at 640–2400px, with composited and clean versions | 8 shots × 2–3 framings |
| Team portraits P9 | Same, plus 80px and 160px circle crops | one per filing professional |
| Envelope illustration (signup sent) | SVG | 1 |
| Open-door header image for emails | Server-rendered PNG per new firm | 1 template |
| OG images | Templates: home, each inner page, firm filing page | 9 templates |
| Email templates | React Email | 2 families, ~16 messages |
| Fonts | Suisse Int'l (400/500/600), Suisse Int'l Mono (400), WOFF2, subset Latin + Latin Extended | 4 files |

### 13.3 What to commission

As in 7.6: the type license and the wordmark lettering; a brand illustrator for the example firms' logos, the documents and the spike tape; a commercial photographer and producer for P1–P9; a retoucher and compositor; an interactive motion studio to prototype the four signature moments; a creative technologist for the House Light engine and the journey stage (in-house is fine); an accessibility auditor with users 55+; an email developer.

### 13.4 The order to build in

1. **Tokens and the House Light engine.** Everything depends on one hex becoming a whole scheme. Ship it with Storybook and the stress-test colors.
2. **The Door, logo analysis and the "with CoFile" lockup.** The firm's first impression of its own brand.
3. **The proof** (10.12) and **the firm's pages for clients** (10.13): what firms approve and what their clients see, in any brand.
4. **The filing desk** (10.11), starting with Branding (the fitting room) and the empty state ("Your desk is clear."), because that's where a new firm first falls for its own name on the door.
5. **The home page**, picture by picture, in this order: P-1 the desk (hero), P-2 the split, P-3 the journey (first as three static pictures, then the sticky stage), P-4 the shelf, P-5 the run sheet, the price strip, P-6 the open door. Each picture ships static first, then gets its motion.
6. **The seven pages behind the home page**, sharing the page head: For firms and Pricing first (they decide the click), then How it works, What we file, Questions, Security, For platforms.
7. **Sign-up with the filling door**, log-in, password and verification pages, 404 and errors, Terms and Privacy.
8. **Emails**, both families.
9. **Platforms:** the dashboard, the docs (code theme first), the hosted page and the embed.
10. **Photography and portraits** dropped in as they arrive (the layouts have their places reserved from step 5 on).
11. **Motion polish** and the reduced-motion pass, then the accessibility audit and the +35% pseudo-locale test, then launch.

---

## 14. What I'd strip from today's visuals, and why

- **The manila folder tab with a check cut into it.** It says "office supplies" and "approved", which makes CoFile's mark about verification, the one thing the brand shouldn't be built on. It's also the biggest, most colorful CoFile element on every page, the opposite of "ours in small type". Replaced by a graphite wordmark whose only color is the firm's.
- **The cream paper, ink and green palette** (`#F7F3EA`, `#1C2430`, `#1F6B4F`, the amber note boxes `#FBEFD5`). The paper-and-ink look reads as a legal notice or a government form: heavy, nostalgic, a little anxious. And because CoFile already owns a green, every firm color has to fight it. Replaced by a colorless CoFile and the firm's color as the only light.
- **IBM Plex Sans, Plex Mono and Source Serif together.** Three families give the site the voice of a document rather than a product, and two of them (Plex Sans and Source Serif) are fonts a firm can pick for its own pages, so CoFile and the firm end up sounding alike. Replaced by one precise grotesk and its mono, with the firm's font reserved for the firm.
- **A green check mark on every list item.** It turns every benefit into a compliance checklist and every section into reassurance. Replaced by the firm-colored dot and purposeful icons.
- **The 4px colored stripe across the top of the proof.** It's the cheapest way to show a brand color and reads like a warning band. Replaced by the firm's light: a glow, the button, the highlights.
- **"with CoFile" as small grey text pushed to the right with inline styles.** The most important CoFile mark was undesigned. Replaced by a drawn lockup that's small on purpose.
- **The CoFile-first top bar on partner firms' desks,** with the firm's logo shrunk into a corner. The firm's brand should lead its own desk. Replaced by the firm's logo at the top of its own sidebar and "with CoFile" at the foot.
- **Equal-weight "band" sections.** Every section looks equally important today, so pictures, prices and reassurance all have the same volume. Replaced by two registers: lit sections that sell, and a calm reading room for the rest.
- **The labeled HTML stand-in pictures.** They were placeholders by design. Replaced by staged, lit, live product pictures, merged where the story is one story (the journey), and joined by two new ones (the open door and the portraits).
- **Status dots that differ only by color** (in the stand-in tiles). Replaced by marks that differ in shape too: dotted, dashed, solid.

