# CoFile, in your colors

**Visual design spec for cofile.app. Dev Raman, staff product designer. Round 2, Nov 26, 2026.**

Scope: visuals only. Every headline, paragraph, button label and the order of the story come from `web/app/page.tsx` and the product pages as they stand. Where a design needs a word that doesn't exist yet, I mark it `[copy needed]`. Wireframes shorten long copy with "…" to fit; the full text is set exactly as written.

---

## 1. Who I am, and what I bring

I'm Dev. I've spent eight years designing for fintech companies, mostly on the marketing site and the product as one system: the same tokens, components and React code on the home page as in the app. My habit, and my bias, is that **the product is the hero.** I don't sell software with metaphors or mascots. I stage the real interface beautifully: crisp, lit well, with real depth, glass and gradients used with restraint, and typography tight enough that a 56-year-old CPA trusts it within a second.

For CoFile that bias fits unusually well, because the product's best moment is something you can *see*: one beautiful page with a firm's name at the top, which a bakery owner opens on her phone and approves. My job is to make that page so handsome that a firm owner wants it to carry their name. I'll also build the system that makes *any* firm's logo and color look good, because that's the real product promise behind "Your name on the door."

What I bring to the build: a token system that turns one hex value from a firm into a full, accessible color scheme; a component library shared by the marketing site, the filing desk, the proof and the docs; staged product renders made from the real components rather than drawn mockups; and motion that shows how the product works instead of decorating it.

---

## 2. The visual concept: "In Your Colors"

### The one idea

**CoFile is a beautifully made, colorless instrument. The firm is the color.**

Everything CoFile owns is graphite, porcelain white, clear glass and hairline: quiet, exact, premium, like a well-made pen. Everything the firm owns (its name, its logo, its color, its font) is the *light* that falls through it. On every surface a client sees, the firm's color fills the button, the top of the page, the highlights on the proof and a soft glow behind the page, as if the firm's own color were shining into the room. CoFile appears only in graphite, at 14px, as "with CoFile."

The home page puts this to work. It's dressed in the colors of the example firm, **Harbor & Pine CPA** (Harbor teal, `#0F766E`), so a visitor first sees the site the way their clients would see *their* pages. Halfway down, the visitor can tap a different color and watch the whole page relight in it. The site stops being a description of white-labelling and becomes a demonstration of it.

### How it brings out the copy's selling story

| The copy sells | How "In Your Colors" makes it land |
|---|---|
| **1. Your firm, your client, your name.** "Your name on the door. Ours in small print." | Color belongs to the firm, graphite to CoFile. The firm's name is set large in its own font, and the CoFile mark is designed to be small. Even the dot on the "i" in CoFile's wordmark takes the firm's color (see Identity). The headline itself is typeset as the joke it is: "Ours in small print." is literally set small. |
| **2. Effortless for everyone.** "You start it. Your client approves it. CoFile files it." | One continuous relay line, in the firm's color, carries one sheet from the firm's desk to the client's phone to the state's website. Three steps, one gesture. The middle step, the client's, sits highest and brightest, because "your client is in charge of the middle one." |
| **3. A client experience to be proud of.** The proof. | The proof is the hero object of the whole site: a single white sheet with the firm's brand bar, lit by the firm's color, as carefully staged as a premium card in a product shot. It appears in the hero, gets taken apart layer by layer in the proof section, and returns in the close. |
| **4. It does the work and brings the results home.** | The state's screens fill in on their own, like a contact sheet developing. Then the papers fly back into one filing record, which settles gently, like mail landing on a desk. |
| **5. Try it free, for real.** "Rehearse on the real stage." | Rehearsal gets its own visual language: **dashed line = rehearsal, solid = live**, borrowed from the spike tape that marks positions on a theater stage. A rehearsal looks like the real thing drawn in dashes, inviting and safe to try. The coverage table uses the same language as a fill-in scale, from a plain label to a dotted outline, then dashed, then solid. |

### What the concept is not

It isn't built on locks, shields, seals, vaults, stamps, check marks or "stop" imagery. The checks, the catch and security sit in a calm, readable "reading room" style (white panels, plain type, no glow) where the copy puts them, and anyone who goes looking will find them well designed. The brand, the hero and the motion are about the firm, its clients and how easy it all is.

### Three rules that keep it honest

1. **Color always means the firm.** CoFile never uses a hue for itself, apart from the tiny dot in its own wordmark, and that dot turns into the firm's color as soon as there is a firm.
2. **The product is the picture.** Every major image is the real interface, rendered from the real components (so a color change is real), staged with light and depth. Photography supports it and never replaces it.
3. **Nothing official.** No seals, eagles, capitol domes, flags, state outlines used as emblems, IRS letterforms or anything that imitates a government mark. State websites appear as a neutral, re-typeset "foreign screen," clearly not ours and clearly not a copy of theirs.

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
  - **When a firm is present:** a solid fill in the firm's main color. On the home page that means Harbor teal, or whichever color the visitor picks in the Firms section.
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

This is the most important CoFile mark, because it's the one clients actually see. It has to be gracious, small and unmistakably secondary.

- **Construction:** the word "with" in Suisse Int'l Regular, Slate `#5A6070`, then a word space of 0.28 em, then the CoFile wordmark at the same font size, Graphite, its dot in **the firm's main color**. The dot is how CoFile nods to the firm: even our own mark wears their color.
- **Size:** 14px on every client-facing page, on desktop and on phones. It is never larger, so the firm's logo is always at least 2.3× its height.
- **Placement:**
  - On the firm's top bar (the "Door", 3.5 below): right-aligned, vertically centered on the logo's center line.
  - At the foot of the proof, the intake form and the decision page: centered, 48px below the last element.
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
- Second example firm, only where the product's own copy already names it (the permanent page `cofile.app/bestaccounting/llc-filing-new-york`): **Best Accounting**, a plain wide wordmark in a geometric sans, navy `#1F4FD1`.

Both are fictional. Every image that shows them carries the caption the copy already uses ("example firm", "test details · not a real business") where the copy provides it.

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

**The example firm's light** (the home page's default light, and the first swatch the visitor sees):

| Token | Name | Hex |
|---|---|---|
| `--firm` (home default) | **Harbor** (Harbor & Pine CPA's main color) | `#0F766E` |

**Spectrum** (used *only* in the wordmark's dot, the symbol's dot, the "any color" swatch in the color dial, and the default glow on CoFile's own app pages): Apricot `#F2A65A`, Rose `#E86A8A`, Iris `#9A7BF0`, Sky `#4F8CF0`, Sea `#3DB39A`.

**Daylight** (CoFile's own glow, used where there is no firm: log-in, sign-up before a name is typed, docs, the enterprise dashboard, the enterprise section of the home page): two soft radial glows on Porcelain, cool `#DCE3F5` at top left and warm `#F6E7DA` at bottom right, each 60% opacity, 900px radius, with 2.5% monochrome grain so it doesn't band.

### 4.2 Status and stage colors

Status is never shown by color alone: each tone has a dot or glyph, and text.

| Tone | Text | Tint (chip and notice background) | Used for |
|---|---|---|---|
| **Live** / ok | `#16794C` | `#E6F4EC` | "Live", "Approved", "Accepted by the state", "Completed", "EIN issued" |
| Attention / warn | `#8A5100` | `#FDF2DC` | "Waiting for approval", "Needs information", "Changes requested", "Ready to pay" notices |
| Problem / bad | `#B3261E` | `#FCEBEA` | "Needs correcting", "Rejected by the state", "Failed", form errors |
| Neutral | `#3A3F4A` | `#EEF0F3` | "Received", "Queued", "Filing now", "Being checked" |
| **Rehearsal** | `#14161A` | *no fill*: 1.5px **dashed** Graphite outline, dash 4 / gap 3 | Every "Rehearsal" and "Test" badge, the beta pill, rehearsal notices |

**The fill-in scale** (coverage labels), one visual idea read left to right as maturity:

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
| Small print | 19px | 24px | 400, Slate | 1.3 | 0 | The second line of "Your name on the door. Ours in small print." |
| Title | 21px | 24px | 600 | 1.25 | −0.012em | Step titles, card h3, security h3 |
| Lede | 19px | 22px | 400, Ink 2 | 1.5 | −0.006em | The paragraph under each h2 (max 62ch) |
| Body | 17px | 18px | 400 | 1.6 | 0 | Lists, steps, everything else |
| Kicker | 15px | 15px | 500 | 1.3 | +0.01em | "For CPA, payroll, fractional CFO and title firms", sentence case, never caps |
| UI | 16px | 17px | 600 | 1 | 0 | Buttons |
| Small | 15px | 15px | 400, Slate | 1.5 | 0 | Notes, the beta note under the hero, coverage footnote |
| Caption | 14px | 14px | 400, Slate | 1.45 | +0.005em | Figure captions, "example" tags, legal line |
| Mono data | 15px | 16px | 400 | 1.45 | −0.01em | Proof values, log results, codes, URLs |
| Mono numeral | 20px | 40px | 400, Slate | 1 | −0.02em | The catch's 01–05 |

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

### 5.4 Proof scale (client-facing; the firm's font unless noted)

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
- Headline line breaks are set by hand for the 13 home sections at three breakpoints (see Section 9). No widows in h1 or h2; `text-wrap: balance` as the fallback.

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
| Selling sections (hero, process, proof, firms, requests, after, rehearsals, close): vertical padding | 96px | 160px |
| Support sections (checks, coverage, catch, security): vertical padding | 72px | 112px |
| h2 → lede | 16px | 24px |
| Lede → content | 40px | 64px |
| Between list items | 16px | 20px |
| Card padding | 20px | 32px |

### 6.3 How pages breathe

- **One idea per viewport.** Each selling section is built around one staged object (a sheet, a phone, a stage) and never more than one primary button.
- **Two registers.** Selling sections sit on Porcelain with the firm's light (a glow behind the staged object). Support sections sit on a white "reading room" panel (radius 28px on desktop, full-bleed on phone, hairline border, no glow), so they look calm, deliberate and easy to read, and visibly different from the pitch around them.
- **Asymmetric two-column** for most sections on desktop: copy in columns 1–5, staged object in 6–12, always on the right, so the eye learns where the product lives. The exceptions are full-width: process, firms (the stage spans all 12 columns under the headline), coverage, the catch and the close. In the proof section the stage is sticky while the list scrolls past it.
- **Phones get a single column** where copy always comes first and the staged object follows, full width with 12px side margins (a little wider than the text column, so it feels like a product shot, not a thumbnail).
- **No section dividers.** Space and a change of register do the separating. Hairlines are for tables and cards only.


---

## 7. Art direction

### 7.1 The hierarchy of pictures

1. **Staged product** (about 80% of all imagery). The real React components, rendered live in the page wherever possible (so the color dial actually recolors them), set on sheets, in browser windows and on phones, lit by the firm's glow, with real contact shadows. This is the house style.
2. **Photography** (about 15%). Firm owners in their own offices and their clients in their own businesses, always documentary, always with a phone or a screen that we composite the real product onto. Used in three places on the home page and on sign-up.
3. **Illustration** (about 5%). Only the small things the product can't show itself: the documents that come back, the state's screens as neutral "foreign" UI, spike-tape marks, the example firms' logos, the icon set.

There's no 3D character, no isometric city, no abstract blob, no stock photo, and no illustration of a concept like "trust."

### 7.2 Staged product: the look

- **The sheet.** The proof is staged as a single sheet of white (radius 20px), 1.5px thick (drawn as a 1.5px lower edge in `#E7E9ED`, so it reads as a physical card, not a flat div), floating 40–64px above the Porcelain, tilted at most 4° in 3D (`perspective: 1800px; rotateX(4deg) rotateY(-6deg)` for the hero, flat elsewhere).
- **The light.** Behind each staged object: a primary glow (`--firm-glow`, radial, about 1.2× the object's width, centered 15% above and 10% right of the object's center), a secondary smaller warm glow (`--firm-mark` at 60%, offset down-left), and a monochrome grain overlay at 2.5% opacity (a 256px tile, `mix-blend-mode: soft-light`) so gradients never band on cheap screens.
- **Contact shadow.** Two layers: a tight Graphite shadow (`0 16px 32px -16px rgba(20,22,26,.22)`) and a long colored one (`0 48px 96px -32px` in `--firm` at 38%). The colored one is the trick: the sheet seems to sit in the firm's light.
- **Specular edge.** A 1px top highlight on sheets and glass (`inset 0 1px 0 rgba(255,255,255,.9)`), and on the hero only, a faint diagonal sheen (linear gradient, white 0 → 8% → 0) that follows the pointer.
- **Devices.** One custom, generic phone: a rounded slab with a uniform 10px bezel in `#1B1D22`, a small centered camera dot, no notch or island shape, no buttons that look like any real brand, corner radius 54px at 390px width. Browser windows are drawn as UI, not as laptops: a white window, radius 16px, a 40px top bar with three Hairline dots and a neutral address pill showing the real path (`cofile.app/p/harborpine`, `cofile.app/bestaccounting/llc-filing-new-york`) in Mono 13px. No laptop hardware renders.
- **Cropping.** Stages crop boldly: a desktop window cut off by the right edge of the viewport, a phone overlapping its bottom-left corner by 20%. Never show a whole device floating in the middle of nowhere when a crop would feel closer.
- **Content in product shots.** Only real copy and test details from the repo: Harbor & Pine CPA, Two Sisters Bakery LLC, Ana Ortiz and Lucia Ortiz (50/50), 88 Grove St, Jersey City NJ 07302, $100.00 + $3.50 = $103.50, Dec 3, 5:00 PM Eastern. Every staged proof carries its caption from the copy.

### 7.3 The state's screens: "foreign UI"

The product's promise is "the state's own website" and "the state's own review page," so we show them, but in a way that can never be mistaken for an official page and never imitates one:

- Re-typeset by us, never a real screenshot on the marketing site. Only the field labels and values from our copy appear (for example "Business Name" / TWO SISTERS BAKERY, "Designator" / LLC).
- A deliberately different, plainer visual language: system serif headings (Georgia fallback stack), Arial-like body, square corners, 1px `#B8BCC4` borders, a pale grey `#EEF0F3` header band with no logo, no seal, no state name in a banner, no colors from any state's site.
- Always framed: a neutral browser window or a picture frame with the copy's caption above it ("New Jersey's own review page, filled in").
- In the product, the real captured review page appears on the proof (that's the feature), inside the same neutral frame, unaltered.

### 7.4 Photography

**Style.** Documentary commercial. Natural window light, early morning or late afternoon; 35mm and 50mm; f/2–f/2.8; real locations, never studio sets. A warm-neutral grade (lifted blacks to `#16181C`, highlights rolled at 96%, skin tones protected), no teal-and-orange. One small prop in the firm's color in each key shot (a teal mug, a teal folder), so the photo belongs to the lit page. People look at their work, not at the camera. Screens and phones are shot dark or with tracking markers and composited later with the real UI.

**Cast.** Firm owners and staff 40–65, mixed genders and backgrounds, dressed as they actually dress at work. Clients: small-business owners in their own trades. Everyone cast and released; the copy's example names (Ana and Lucia Ortiz) are played by actors and always captioned as examples.

**Never.** Government buildings, flags, capitols, courthouses, seals, IRS forms, piles of paperwork, handshakes, people pointing at laptops, open-plan startup offices, or logos on devices (taped over or retouched out).

**Shot list (one commercial photographer, one producer, three shoot days in the New York and New Jersey area):**

| # | Shot | Where on the site | Brief |
|---|---|---|---|
| P1 | **"The door"** | Firms section, beside the stage; sign-up | A glass office door with "Harbor & Pine CPA" in white vinyl lettering (we make and apply it; removable). Shallow focus on the lettering; the owner (woman, about 55) softly visible inside at her desk, morning light raking across the glass. Two framings: tight on the lettering (16:9 and 4:5), and wider with the owner (3:2). The only words in the photo are the firm's name. Nothing of CoFile appears, which is the point. |
| P2 | **"Ana texts"** | Requests section | Ana (about 38) behind a bakery counter before dawn, flour on her apron, typing on her phone with one thumb; her sister Lucia out of focus pulling trays. Phone screen dark for compositing the message. Shoot at a real independent bakery (Jersey City or Hoboken), interior lights on, blue hour outside. 4:5 and 16:9. |
| P3 | **"Approving at the counter"** | Proof section (phone) and the close | The sisters together at the end of the counter after the morning rush, Lucia holding the phone, Ana leaning in; relaxed, a little proud. Screen composited with the proof. 3:2 and 1:1. |
| P4 | **"The owner's desk"** | Process section (optional backdrop), filing desk empty state marketing | A CPA (man, about 60) at a tidy desk in a small-town office, a monitor showing the filing desk (composited), reading glasses pushed up, a client folder closed beside him. 16:9. |
| P5 | **"Payroll office"** | Sign-up, for-firms pages | A payroll company staffer (about 45) in a modest suburban office, forwarding a client's text on her phone, the desk monitor showing the drafted filing. 3:2. |
| P6 | **"The closing room"** | Sign-up rotation | A title company closing room after hours: a long table, folders squared up, a staffer (about 50) checking a proof on a tablet. 3:2. |
| P7 | **"The contractor"** | Proof page explainer, emails (header art for CoFile's own sign-up emails only) | A contractor (about 45) in his truck cab, approving on his phone, work gloves on the dash. 4:5. |
| P8 | **"First founder"** | Spare, for social and future pages | A first-time founder (about 30) at a kitchen table at night, a laptop and a single lamp, the proof on screen. 4:5. |

Deliverables: 6–10 selects per shot, retouched at 6000px long edge; screen plates and tracking data for compositing; signed releases including the right to show the composited product.

### 7.5 Illustration and texture

- **Documents that come back** (After section, filing detail): generic sheets, never imitations. White sheets with radius 6px, a 12px grey title bar, 4–9 grey text lines at varying lengths, and at most a small empty rectangle where a stamp would be on a real document (left blank: we draw no seal, no signature, no letterhead). Three kinds, told apart by layout only: *a state document* (portrait, two columns of lines), *the IRS letter* (portrait, address block top-left, one long paragraph; nothing like the IRS's own letter design), and *a receipt email* (an envelope-shaped card with three lines). Labels come from the copy and float beside them as chips. Drawn as SVG by an illustrator, on our grid.
- **Spike tape.** The rehearsal motif: L-shaped and T-shaped tape marks (stroke 6px, butt caps, slightly irregular ends as if torn, 2° rotation jitter) in the firm's color at 85%, placed at the corners of each state screen in the rehearsal filmstrip. SVG, eight variants.
- **The relay line.** A 2px line in `--firm-line` with a 6px dot in `--firm` that travels along it. Drawn in code (SVG path, `stroke-dashoffset`).
- **Grain.** One 256px monochrome noise tile (PNG, 8-bit, 6KB), used on every glow.
- **Icons.** A custom set of about 48 icons on a 24px grid, 1.75px stroke, round caps and joins, 2px corner radius on all rectangles (the same family as the C in the symbol). Filled variants only for selected nav states. The set includes: form, link, message bubble, email, phone text, chat/Slack-generic (a speech bubble with a hash), browser window (our sign for "the state's website", never a government building), sheet, sheet stack, document returned (sheet with a curved arrow), calendar, clock, dollar, card, signature (pen nib on a line), people, building-neutral (a plain storefront, for the client's business), key (dashboard only), webhook, code, gear, palette, upload, copy, external, arrows, chevrons, plus, close, menu, search, help, info, attention, problem. **Deliberately absent from the marketing set:** padlock, shield, vault, seal, rosette, stamp, magnifier-over-document.

### 7.6 What I'd commission (by kind)

| Kind of studio or artist | What | Notes |
|---|---|---|
| Type foundry license | Suisse Int'l and Suisse Int'l Mono: web (≈ 500k views/month to start), app, and email-image licenses | Swiss Typefaces |
| Lettering designer | The CoFile wordmark and the C-and-dot symbol, per 3.1 and 3.2 | Two rounds, master in vector plus a variable-width test at 14–200px |
| Brand illustrator | Harbor & Pine CPA (four variants), Best Accounting, the document set, spike-tape set | Logos must look like real small-firm logos, slightly dated, not like our style |
| Commercial photographer and producer | The shot list in 7.4 | Documentary style; producer handles locations, casting, releases, vinyl lettering |
| Retoucher / compositor | Screen inserts on P1–P8 from Playwright captures of the real UI at 3× | Perspective-matched, with a faint screen reflection |
| Motion studio (interactive) | Prototypes of the five signature moments in Section 8, delivered as code-ready timing specs and reference renders | They prototype; our engineers build in code, because the motion runs on live components |
| Creative technologist | The House Light engine (OKLCH ramp, contrast solving, logo analysis) and the scroll scenes | Can be in-house |
| Accessibility auditor | WCAG 2.2 AA audit of the proof, intake form and filing desk; testing with users 55+ and screen readers | Before launch of the proof redesign |
| Email developer | Templates in 10.7, tested across clients | React Email + Litmus |

---

## 8. Motion

### 8.1 Principles

1. **Motion explains the product.** Every moving thing on the site is something the product actually does: a sheet travels from firm to client to state, fields fill in, a message becomes a filing, papers come back, a firm's color fills its pages.
2. **It plays once, then rests.** No loops, no idle animation, no autoplaying video. A section animates when 40% of it enters the viewport, then stays still. Returning to a section doesn't replay it.
3. **Physical and light.** Sheets have mass (springs); color moves like light (crossfades in OKLCH, never through grey); UI responds instantly (≤ 180ms).
4. **Never in the way of reading.** No scroll hijacking. Sticky scenes are short (at most 160vh of scroll), the copy is readable at every frame, and everything can be skipped by scrolling on.
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

### 8.3 The five signature moments

**M1. The proof arrives (hero), 2.4s, once, on load.**

| t | What happens |
|---|---|
| 0ms | Kicker, h1 lines and sub fade up 12px, 500ms each, 80ms apart. |
| 200ms | The Harbor glow blooms behind the stage: opacity 0 → 1, scale 0.9 → 1, 1200ms, settle. |
| 300ms | The proof sheet rises: y +32 → 0, rotateX 10° → 4°, opacity 0 → 1, sheet spring. Its colored contact shadow grows with it. |
| 500ms | The phone (lower right) slides in 24px later on the same spring. |
| 900ms | Highlighter marks sweep left to right across "TWO SISTERS BAKERY LLC", then "88 Grove St, Jersey City NJ 07302": a `--firm-mark` band growing from 0 to 100% width, 420ms each, 150ms apart. Like someone at the firm marking the proof for the client. |
| 1500ms | "$103.50" settles: digits roll up 6px into place (tabular figures, 300ms). |
| 1700ms | Callout pins 1 → 4 pop: scale 0.6 → 1, 70ms stagger. |
| 2100ms | "Approve for filing" breathes once: a `--firm-glow` ring spreads 0 → 12px → 0 over 1200ms. Then nothing moves. |
| Same time | The dot in the header wordmark shifts from Spectrum to Harbor teal (640ms). The site has "taken the firm's color." |

After load, pointer movement over the stage tilts it by at most ±3° (Y) and ±2° (X), following with a 600ms lag, and the sheen follows the pointer. Off on touch devices and with reduced motion.

**M2. The relay (process section), 2.8s, once, on enter.**

A sheet token (a 40 × 52px mini proof with a 6px firm-colored top band) travels along the relay line:

1. It appears on card 1 ("You start it."), where the three ways in (form, link, text) are fanned; the saved-answer fields fill with `--firm-wash` one by one (registered agent, organizer, signer, addresses), 120ms stagger.
2. It travels to card 2 ("Your client approves it."), 700ms on the spring, and lands on the phone's screen; the phone lifts 8px; its approve button breathes once.
3. It travels to card 3 ("CoFile files it."); the foreign-UI state screen fills three fields in sequence (120ms each), then the stage ticker beside it lights its three dots in turn.

On phones the line runs vertically down the left edge of the three stacked cards, and each card plays its part as it scrolls into view.

**M3. The proof, taken apart (proof section), scroll-linked, desktop only.**

The proof sheet sits sticky in columns 6–12 while the six list items scroll past in columns 1–5. As each item reaches the middle of the viewport, its layer of the sheet lifts 8px toward the viewer, gains a 2px `--firm-line` outline and a tag with the item's number, and the rest of the sheet dims to 45% (in 240ms). Between items, the sheet eases back to whole. After the last item ("For CPAs…"), the whole sheet lifts together and gets a single outline. On phones there's no sticky scene: each item shows its own static crop of the sheet above it.

**M4. The relight (firms section), interactive. The site's signature moment.** See 9.4. A tap on a swatch:

- 0–640ms: every staged surface in the Firms stage (desk window, client form on the phone, proof sheet) crossfades its firm tokens to the new color in OKLCH, as a wave moving from the swatch outward (each surface starts 60ms after the one nearer the dial).
- The stage's glow crossfades over the same 640ms, and the contact shadows follow.
- The wordmark dot in the header and every later glow on the page take the new color too (persisted for the visit in `localStorage`, read in a try/catch; the page works without it).
- We never recolor a firm's logo (3.4), so when the color leaves Harbor teal, the Harbor & Pine logo crossfades to its monogram plate ("H&P") drawn in the new color: the same plate any firm gets before it uploads a logo. Choosing Harbor teal again brings the logo back.
- "with CoFile" stays Graphite. That contrast is the whole message.
- Reduced motion: instant swap.

**M5. The papers come back (after section), 2.2s, once, on enter.**

Three document sheets slide in from the right edge, 120ms apart, rotate from 6° to their resting angles (−2°, 1°, −1°) and land in the filing record's document tray with a sheet spring and a tiny 2px overshoot, as if dropped on a desk. As each lands, a status in the record's stage line lights in order ("Submitted to the state" → "Accepted by the state" → "EIN issued" → "Completed"), and the EIN value fades in in Mono.

### 8.4 Smaller moments

| Where | Motion |
|---|---|
| Requests | Typing dots (three 6px dots, 900ms) → Ana's bubble lands (spring). Then three phrases in the bubble get a `--firm-mark` highlight in turn ("an LLC", "me and my sister, 50/50", "Jersey City"), and a copy of each lifts and flies along a curved path (700ms) into its field on the drafted filing. The arrow caption writes on with the line. Remaining fields fill with `--firm-wash` (saved answers). 3.0s. |
| Rehearsals | The 13 screen thumbnails of the filmstrip "develop" left to right: grey skeleton → filled, 120ms apart, as the log lines alongside fill in their results, matched in time. The final thumbnail's dashed spike-tape outline draws itself on (stroke-dashoffset, 600ms). Calm; no flash at the end. |
| Coverage | Each chip draws its outline style (dotted, dashed, solid fill) once as the table enters, 40ms stagger down the column. |
| Close | The headline's two sentences fade up; the CTA's glow breathes once; the symbol's dot crossfades from Spectrum to the active firm color. |
| Header | Compresses from 72 to 60px after 80px of scroll (240ms); glass blur fades in. |
| Buttons | Press: translateY(1px), 120ms. Hover: background step and a 4px `--firm-glow` halo on primary buttons, 180ms. |
| The proof (product) | On load, sections fade up 8px in sequence (60ms stagger). After "Approve", the button fills to a bloom of the firm color that expands to cover the sheet (500ms) and resolves into the decision page, which arrives with the firm's logo already in place. |
| Filing desk | Status chips crossfade on change; new filings slide into the top of the list (spring). Nothing else. |

### 8.5 Why this sells the copy

The hero motion tells the visitor in two seconds that the product *is* a page their client approves, carrying the firm's name. The relay shows "three steps" as one effortless gesture. The taken-apart proof shows "every detail and every fee" without a paragraph of reassurance. The relight is "your name on the door," made physical: your color fills everything, and CoFile doesn't change. The papers landing is "the papers come back to you," the satisfying end. None of the motion is about stopping, waiting or verifying.

---

## 9. The home page, section by section

Default light on the home page: Harbor teal `#0F766E`, until the visitor picks another color in section 4. All copy below is the locked copy from `web/app/page.tsx`, placed as written.

### 9.0 The frame: beta notice and header

**Beta notice.** A slim bar above the header, Porcelain deep `#ECEEF1`, not sticky (it scrolls away with the page).

- Desktop: 40px tall, one line, centered within the 1264px column. Left: the **Beta** pill (dashed rehearsal outline, 24px tall, 13px… no: 14px, 600). Then the text in 14px Ink 2: "CoFile is in beta. Any filing can run as a free rehearsal on the state's real website. It stops before the last button, so nothing is filed or paid. Filing types go live one at a time. Questions or problems? hello@cofile.app". The email is an underlined link. If it wraps at laptop widths, the bar grows to two lines; never truncated.
- Phone: the pill on its own line, the text wrapping to four lines at 14/20, padding 12px 20px. About 108px. Acceptable, because it isn't sticky.
- On firm pages the product's own wording for firm pages applies ("This service is in beta…"), in the same visual form.

**Header.** Sticky, glass, 72px, compressing to 60px after 80px of scroll.

```
Desktop
┌────────────────────────────────────────────────────────────────────────────────────┐
│ CoFile▪      How it works   For firms   What we file   For platforms   Log in  [Run a free rehearsal] │
└────────────────────────────────────────────────────────────────────────────────────┘
  wordmark 22px    nav 16px 500 Graphite, 32px apart             text btn   primary M (48px)

Phone
┌──────────────────────────────────────┐
│ CoFile▪                 Log in   ☰   │  60px; ☰ opens a full-height glass sheet with
└──────────────────────────────────────┘  the four nav links at 28px, then both buttons
```

- Wordmark at 22px with its dot in the active light (Spectrum until the hero settles, then Harbor teal).
- Nav: "How it works", "For firms", "What we file", "For platforms". The active section (by scroll position) gets a 2px `--firm-line` underline offset 8px.
- Right: "Log in" as a text button; "Run a free rehearsal" as the primary Graphite button (48px).
- Phone: after the hero's CTAs scroll out of view, a **bottom CTA bar** slides up: glass, 76px tall including the safe area, with "Run a free rehearsal" full-width (56px). It hides again while the close section is visible, so there are never two of the same button on screen.

### 9.1 Hero

**Copy:**
- Kicker: "For CPA, payroll, fractional CFO and title firms"
- h1: "Your client approves the proof. Then CoFile files it."
- Sub: "CoFile fills in your clients' LLC and corporation formations, EINs and employer registrations on the official New York, New Jersey, Florida and IRS websites, with your firm's name and logo on every page your client sees. First, your client gets one page showing every detail, every fee and, where possible, the state's own review page, filled in."
- Buttons: "Run a free rehearsal" · "See what your client sees"
- Note: "In beta. A rehearsal fills in every screen of the state's real website and stops before the last button, so nothing is filed and nothing is paid. You'll set up your firm's filing desk first."
- The sample proof (all its words as in the copy), with the caption "Sample proof · test details · not a real business".

**Desktop (1440).** Height: 100vh minus the header, minimum 760px, maximum 920px. Copy in columns 1–5, the stage in columns 6–12 bleeding 120px past the right edge of the content column.

```
┌──────────────────────────────────────────────────────────────────────────────────────────┐
│                                                       ░░▒▒▓▓▓ Harbor glow 32% ▓▓▒▒░░       │
│  (●) For CPA, payroll, fractional                 ╭────────────────────────────────────────┐
│      CFO and title firms                          │ [H&P] HARBOR & PINE CPA  example firm       with CoFile▪ │
│                                                   ├────────────────────────────────────────┤
│  Your client                                      │ Two Sisters Bakery LLC          ┆Rehearsal┆│
│  approves the proof.                              │ New Jersey LLC formation. Please approve │
│  Then CoFile                                      │ by Dec 3, 5:00 PM Eastern.               │
│  files it.                                     ①  │ Business name     TWO SISTERS BAKERY LLC │
│                                                   │ Members           Ana Ortiz, Lucia Ortiz (50/50) │
│  CoFile fills in your clients' LLC and            │ Main business     88 Grove St, Jersey City NJ 07302 │
│  corporation formations, EINs and employer     ②  │ Formation filing fee              $100.00 │
│  registrations on the official New York, …        │ NJ portal fee, by card              $3.50 │
│                                                   │ Total to the state                $103.50 │
│  [ Run a free rehearsal ]  ( See what your     ③  │ ┌ New Jersey's own review page, filled in ┐ │
│                              client sees ↓ )      │ │ Business Name   TWO SISTERS BAKERY      │ │
│                                                   │ │ Designator      LLC                     │ │
│  ┆ In beta. A rehearsal fills in every screen     │ └─────────────────────────────────────────┘ │
│    of the state's real website and stops …     ④  │ [ Approve for filing ]  Nothing is submitted │
│                                                   │                         or paid until you…  │
│                                                   ╰──────────────────────────╮  ╭──────────╮
│                                                                              │  │  phone   │
│                                  Sample proof · test details · not a real business  ╰──────────╯
└──────────────────────────────────────────────────────────────────────────────────────────┘
```

- **Kicker** in a glass pill (36px tall, 15px 500), led by an 8px dot in `--firm` (the same rounded-square dot as the wordmark).
- **h1** at Display 1 (80px), Graphite, broken by hand: "Your client / approves the proof. / Then CoFile / files it." Behind "the proof" sits a `--firm-mark` highlighter band (the same mark the proof uses for highlights), 0.38em tall, at the lower third of the x-height. That ties the headline to the object on the right.
- **Sub** at Lede (22px), Ink 2, max width 34em.
- **Buttons**, 56px, 16px apart: "Run a free rehearsal" primary Graphite; "See what your client sees" secondary glass with a 16px down-arrow icon, which scrolls smoothly to `#proof`.
- **Note** at Small (15px), Slate, max width 30em, led by a 12px dashed rehearsal glyph (a dashed rounded square). Not an alert box: just a well-set note.
- **The stage:** the proof sheet, 600px wide, in 3D at `rotateX(4deg) rotateY(-6deg)`, with Harbor & Pine's Door (wide logo on white, "example firm" in a 14px Slate tag, "with CoFile" at the right), then the body. Values in Suisse Int'l Mono; "TWO SISTERS BAKERY LLC" and the address carry highlighter marks; the fees use tabular figures with a hairline above the total. The state page inset (block 3) is drawn as foreign UI (7.3). The approve button is in `--firm-fill` with the firm's font. **Callout pins 1–4**: 24px Graphite circles with white Mono numerals, sitting 20px outside the sheet's left edge, centered on each block. (The pins have no legend: the proof section explains each block.)
- **The phone**, 300px wide, overlaps the sheet's bottom-right corner by 25% and is tilted the other way (`rotateY(8deg)`). It shows the same proof at phone size, scrolled to the title and the approve button, a reminder that clients approve on their phones.
- **Caption** centered under the stage, 14px Slate.

**Phone (390).**

```
┌──────────────────────────────────┐
│ (●) For CPA, payroll, fractional │  kicker pill wraps to two lines
│     CFO and title firms          │
│                                  │
│ Your client                      │  Display 1 at 40px
│ approves the                     │
│ proof. Then                      │
│ CoFile files it.                 │
│                                  │
│ CoFile fills in your clients' …  │  Lede 19px
│                                  │
│ [    Run a free rehearsal     ]  │  56px, full width
│ (  See what your client sees ↓ ) │  56px, full width
│ ┆ In beta. A rehearsal fills …   │  Small 15px
│                                  │
│ ░▒▓ glow ▓▒░                      │
│╭────────────────────────────────╮│  the proof, flat (no tilt), 12px side
││ [H&P] Harbor & Pine CPA        ││  margins, at true phone scale: this IS
││ example firm      with CoFile▪ ││  what the client would see on this phone
││ Two Sisters Bakery LLC ┆Rehears││
││ …                              ││
│╰────────────────────────────────╯│
│ Sample proof · test details · …  │
└──────────────────────────────────┘
```

On phones the separate phone device is dropped: the visitor is already holding one. Pins sit inside the sheet's left padding (20px circles).

**Dark mode:** the page goes to Graphite night with a richer Harbor glow (28%); the sheet stays white. It looks like a lit print in a dark room.

### 9.2 Process: "You start it. Your client approves it. CoFile files it."

**Copy:** h2 "You start it. Your client approves it. CoFile files it." · lede "Three steps, and your client is in charge of the middle one." · three steps, each a bold title and a paragraph, exactly as written.

**Desktop.** Full width. The h2 sits on one line at Display 2 (56px) across 12 columns, with the middle sentence, "Your client approves it.", set in `--firm-ink`: the lede says the client is in charge of the middle step, so the middle step gets the color. Lede below in Ink 2.

```
┌──────────────────────────────────────────────────────────────────────────────────────┐
│ You start it. Your client approves it. CoFile files it.                               │
│ Three steps, and your client is in charge of the middle one.                          │
│                                                                                       │
│                           ░░▒▒▓ glow ▓▒▒░░                                             │
│  ╭───────────────────╮        ╭──────────────────────╮        ╭───────────────────╮    │
│  │ ╭─form──╮         │        │      ╭──────────╮     │        │ ┌ foreign UI ──┐  │    │
│  │ │╭─link─╮│ fanned │●━━━━━━━│      │  phone   │     │━━━━━━━●│ │ ▓▓▓▓▓▓▓      │  │    │
│  │ ││╭text╮││        │        │      │  proof   │     │        │ │ ▓▓▓▓░░░      │  │    │
│  │ saved answers:    │        │      │ [Approve]│     │        │ └──────────────┘  │    │
│  │ ▒Registered agent │        │      ╰──────────╯     │        │ ● Filing now      │    │
│  │ ▒Organizer ▒Signer│        │   (raised 24px, lit)  │        │ ● Submitted to …  │    │
│  ╰───────────────────╯        ╰──────────────────────╯        │ ● Accepted by …   │    │
│                                                                ╰───────────────────╯    │
│  You start it.                 Your client approves it.        CoFile files it.         │
│  Fill in a short form          They get the proof: one page    It fills in the state's   │
│  yourself, send your client    with your firm's name at the    own website screen by     │
│  a link, or forward the …      top, showing every detail …     screen, checks the fee …  │
└──────────────────────────────────────────────────────────────────────────────────────┘
```

- Three cards in columns 1–4, 5–8, 9–12; white sheets, radius 20, e1 elevation. The **middle card is raised** (translateY −24px, e3 elevation, the firm glow behind it) and 8% taller.
- **Card 1** ("You start it."): three mini UIs fanned at −6°, 0°, 6°: a short form (four field skeletons), a link chip in Mono (`cofile.app/p/harborpine`), and a text bubble. Below them, four small field chips that fill with `--firm-wash` as the relay passes, carrying the words from the step's copy: "registered agent", "organizer", "signer", "addresses".
- **Card 2** ("Your client approves it."): the phone at 220px wide showing the proof, firm Door and approve button visible.
- **Card 3** ("CoFile files it."): a foreign-UI state screen filling in, and beside it a three-dot stage ticker using the product's real status words: "Filing now", "Submitted to the state", "Accepted by the state". This is the visual for "You hear about each stage."
- **The relay line** (2px `--firm-line`, with a 6px `--firm` dot) connects the cards at mid-height, behind them.
- Step titles at Title (24px 600), paragraphs at Body (18px), in columns under each card.

**Phone.** h2 on three lines (one sentence per line, the middle one in `--firm-ink`), lede, then the three cards stacked full width, each followed by its title and paragraph. The relay line runs vertically down the left margin (x = 10px), connecting the cards; the middle card has the glow and is not raised (no room), but gets a 2px `--firm-line` outline instead.

**Motion:** M2, the relay.

### 9.3 The proof: "Your client sees what the state will see, before the state does."

**Copy:** h2 · lede ("You've approved a proof before: business cards, letterhead, an invitation at the printer. Nothing went to press until you said so. The proof does the same for a filing. …") · six list items, exactly as written.

**Desktop.** A two-column scroll scene, about 160vh. Columns 1–5 hold the h2 (Display 2), the lede and then the six items, spaced so each can reach the middle of the viewport in turn. Columns 6–12 hold the proof sheet, sticky at 120px from the top, flat (no tilt here), 640px wide, with the full proof structure from the product: the Door, rehearsal band, title, deadline, consent panel, state's review page, filing details, state fees, the one button.

```
┌───────────────────────────────────────────────────────────────────────────────────┐
│ Your client sees what the state       ╭──────────────────────────────────────────╮ │
│ will see, before the state does.      │ [H&P] Harbor & Pine CPA     with CoFile▪ │ │
│                                       │ Two Sisters Bakery LLC                    │ │
│ You've approved a proof before:       │ ┌consent panel (--firm-wash)───────────┐ │ │
│ business cards, letterhead, an …      │ │ By approving, you confirm every …    │ │ │ ← item 4 layer
│                                       │ └──────────────────────────────────────┘ │ │
│ ▪ Every name, address and answer,  ◀──│ ┌ The state's review page ───────────┐   │ │ ← item 3 layer
│   in the order the state asks …       │ └────────────────────────────────────┘   │ │
│                                       │ Filing details                            │ │ ← item 1 layer
│ ▪ Every fee in dollars and cents,     │ Business name   TWO SISTERS BAKERY LLC    │ │
│   from a verified fee table           │ …                                         │ │
│                                       │ State fees                                │ │ ← item 2 layer
│ ▪ Where the state's website allows    │ Total                         $103.50     │ │
│   it, a picture of the state's own …  │                                           │ │
│ ▪ Each statement your client is …     │ [ Approve, and authorize submission and   │ │ ← item 5 layer
│ ▪ One button. Until it's pressed, …   │   payment ]   ( Request changes )         │ │
│ ▪ For CPAs: it does for a business    │               with CoFile▪               │ │ ← item 6: whole sheet
│   filing what the 8879 does for a …   ╰──────────────────────────────────────────╯ │
└───────────────────────────────────────────────────────────────────────────────────┘
```

- List bullets are the **dot** (8px rounded square in `--firm`) instead of check marks. Item text at Body 18px. The active item goes to Graphite with its dot growing to 10px; inactive items sit at Slate.
- Item → layer mapping: 1 → Filing details; 2 → State fees; 3 → the state's review page; 4 → the consent panel (the product's statement, "By approving, you confirm every detail below is correct and authorize its submission exactly as shown, and payment of the fees shown, up to the total shown ($103.50). Government fees generally can't be refunded once paid, even if the filing is rejected."); 5 → the buttons; 6 → the whole sheet.
- Item 6 ("For CPAs: …") is set a little differently: "For CPAs:" in 600, and the item gets 32px more space above it, so it lands as a quiet aside to accountants.
- No seal, no stamp, no "approved" graphic anywhere. The sheet itself is the reassurance.

**Phone.** No sticky scene. h2, lede, then the six items as a vertical list, each with a 4:3 crop of its layer of the proof directly above it (a white card, radius 16, the layer at 100% and the rest of the sheet blurred and faded behind). Item 6 gets the whole sheet in miniature. Optional: P3 ("Approving at the counter") as a full-width 1:1 photo between the lede and the list, with the proof composited on Lucia's phone. Alt text `[copy needed]`.

**Motion:** M3.

### 9.4 Firms: "Your name on the door. Ours in small print." The relight

**Copy:** h2 "Your name on the door. Ours in small print." · lede ("Your client needs an LLC. Who do they call? You. They always have. …") · four list items, exactly as written.

**The h2, typeset as the joke.** One `<h2>`, two lines:

- "Your name on the door." at Display 2 (56px desktop / 32px phone), Graphite, 600.
- "Ours in small print." at the Small print style (24px desktop / 19px phone), Slate, 400, set on the next line and right-aligned to the end of the first line on desktop (left-aligned on phones), as if it were a footnote to the line above.

**Desktop.**

```
┌────────────────────────────────────────────────────────────────────────────────────────┐
│ Your name on the door.                                          ╭──────────────────────╮ │
│                         Ours in small print.                    │  P1 "the door":      │ │
│                                                                 │  HARBOR & PINE CPA   │ │
│ Your client needs an LLC. Who do they call? You. They always    │  on glass, morning   │ │
│ have. Until now, saying yes meant someone on staff typing …     │  light               │ │
│                                                                 ╰──────────────────────╯ │
│                                ░░░░▒▒▒▒▓▓▓▓ the firm's light ▓▓▓▓▒▒▒▒░░░░                │
│ ╭─ cofile.app/p/harborpine ──────────────────────────────────╮                           │
│ │ [H&P] Harbor & Pine CPA                       with CoFile▪ │   ╭────────────────────╮  │
│ │ Filings                                    [ New filing ]  │   │ proof sheet        │  │
│ │ Two Sisters Bakery LLC   ┆Rehearsal┆  Waiting for approval │   │ [H&P] Harbor & Pine│  │
│ │ …                    ╭──────────────╮                      │   │ Two Sisters Bakery │  │
│ ╰──────────────────────│ phone: form  │──────────────────────╯   │ [ Approve … ]      │  │
│                        │ [H&P] Harbor │                          ╰────────────────────╯  │
│                        │ New Jersey   │                                                  │
│                        │ LLC formation│                                                  │
│                        │[Send to Harbor & Pine CPA]                                      │
│                        ╰──────────────╯                                                  │
│              (●)  (●)  (●)  (●)  (●)  (●)  (●)  (●)  (●)  (◍)        #0f766e              │
│                                                                                           │
│  ▪ Your filing desk carries   ▪ Send one client a link,  ▪ Your client sees your  ▪ Name your own │
│    your firm's name, logo…      keep a permanent filing…   firm on the form and…    registered…   │
└────────────────────────────────────────────────────────────────────────────────────────┘
```

- **Top:** h2 and lede in columns 1–8. Photo P1 ("the door") in columns 9–12, 4:5, radius 20: the firm's name on its own glass door, with nothing of CoFile in sight. It says the headline without saying it.
- **The stage** (12 columns, bleeding to both viewport edges at ≥ 1440): three surfaces, all live components in Harbor & Pine's brand:
  1. *The filing desk* in a browser window (`cofile.app/p/harborpine`), 760px wide: the Door, the "Filings" list with Two Sisters Bakery LLC and a couple of rows of test details, the "New filing" button in the firm's color.
  2. *The client's form* on the phone, 280px wide, overlapping the window's bottom edge: the Door, "New Jersey LLC formation", three fields and the button "Send to Harbor & Pine CPA" (the product's own label pattern, "Send to {firm}").
  3. *The proof* as a sheet, 400px wide, at the right.
  Each surface has "with CoFile" in its place, Graphite, 14px.
- **The color dial**, centered under the stage: ten 36px circular swatches, 14px apart, in a glass tray (radius 999, 64px tall): the product's own nine ready colors (`#1f4fd1`, `#0f766e`, `#15803d`, `#b45309`, `#b91c1c`, `#7e22ce`, `#be185d`, `#334155`, `#111827`), then a tenth **Spectrum** swatch that opens the native color picker for any hex. The active swatch gets a 2px white gap and a 2px Graphite ring. Its hex shows to the right in Mono 15px Slate (data, not copy). Each swatch's accessible name is its hex. The tray has no visible label; if the product team wants one, `[copy needed]`.
- **Optional, phase 2:** a small "try your own logo" control in the tray that previews the stage with the visitor's logo, processed only in the browser and never uploaded. Label `[copy needed]`. Strongest possible version of "this is for my firm," but it needs a copy decision.
- **The four list items** in a 4-column row under the dial, dot bullets, Body 18px. On hover (desktop), each item highlights the part of the stage it describes: item 1 → the desk's Door; item 2 → the form on the phone and the window's address bar; item 3 → the "with CoFile" lockups, which get a soft ring; item 4 → the registered agent field on the form.

**Phone.**

```
┌──────────────────────────────────┐
│ Your name on the door.           │  32px
│ Ours in small print.             │  19px Slate
│                                  │
│ Your client needs an LLC. …      │
│                                  │
│ ╭──────────────────────────────╮ │  P1 at 4:5, full width
│ │   HARBOR & PINE CPA (glass)  │ │
│ ╰──────────────────────────────╯ │
│ ░▒▓ glow ▓▒░                      │
│ ╭────────────╮                   │  stage, simplified: the phone form
│ │ phone form │  ╭proof╮           │  (60% width) overlapping the proof
│ │ [Send to …]│  │     │           │  sheet (55% width)
│ ╰────────────╯  ╰─────╯           │
│ ◀ (●)(●)(●)(●)(●)(●)(●)(●)(●)(◍) ▶│  dial scrolls horizontally, 44px targets
│                                  │
│ ▪ Your filing desk carries …     │
│ ▪ Send one client a link, …      │
│ ▪ Your client sees your firm …   │
│ ▪ Name your own registered …     │
└──────────────────────────────────┘
```

**Motion:** M4, the relight. This is the moment the whole site is built for.

### 9.5 Requests: "Clients don't fill in forms. They text you."

**Copy:** h2 · lede ("That's how requests really arrive. Send it on as it is, by email, text, WhatsApp or Slack. CoFile's AI reads the message and drafts the filing, and your saved answers fill in the rest. …") · the bubble "Need an LLC for the bakery. It's me and my sister, 50/50, in Jersey City." with its caption "Ana Ortiz · text message · example" · the arrow line "↳ read into a drafted New Jersey LLC formation for your team to check".

**Desktop.**

```
┌────────────────────────────────────────────────────────────────────────────────────┐
│ Clients don't fill in              ╭────────────────────╮                            │
│ forms. They text you.              │ P2 Ana at the      │                            │
│                                    │ counter, blue hour │  ╭─ drafted filing (desk) ─╮│
│ That's how requests really         │   ╭──────────────╮ │  │ New Jersey LLC formation││
│ arrive. Send it on as it is, by    │   │ phone        │ │  │ Members                 ││
│ email, text, WhatsApp or Slack. …  │   │ ╭──────────╮ │ │  │ ▒Ana Ortiz, Lucia Ortiz ││
│                                    │   │ │Need an LLC│ │━━━━━▶│ (50/50)            ││
│                                    │   │ │for the …  │ │ │  │ Main business address   ││
│                                    │   │ ╰──────────╯ │ │  │ ▒Jersey City NJ         ││
│                                    │   ╰──────────────╯ │  │ Registered agent ░saved ││
│                                    ╰────────────────────╯  ╰─────────────────────────╯│
│                                    Ana Ortiz · text message · example                 │
│                                    ↳ read into a drafted New Jersey LLC formation for │
│                                      your team to check                               │
└────────────────────────────────────────────────────────────────────────────────────┘
```

- Copy in columns 1–5. In columns 6–12, a three-layer composition: photo P2 (4:5, radius 20) in the back; the phone composited onto Ana's hands but also pulled forward as a clean device in front (so the message is legible); and to the right, the **drafted filing card** from the firm's desk (white sheet, 360px).
- **The bubble:** a generic incoming message bubble (`#E9EBEF`, radius 22 with a 6px tail, Graphite 17px text), not a copy of any messaging app's design. The caption "Ana Ortiz · text message · example" sits beneath in 14px Slate.
- **The arrow line** "↳ read into a drafted New Jersey LLC formation for your team to check" set in Mono 15px Slate, following the curved path (2px `--firm-line`) from the bubble to the drafted card.
- **The drafted card:** title "New Jersey LLC formation", with fields read from the message in `--firm-mark` highlight (Members: Ana Ortiz, Lucia Ortiz (50/50); the Jersey City address field partly filled) and fields from saved answers in `--firm-wash` with a small dot marker (Registered agent). The visual difference between "read from the message" and "from your saved answers" is shown by highlight vs. wash; no new label needed (if the product adds a legend: `[copy needed]`).
- The channels in the lede (email, text, WhatsApp, Slack) are words, not logos. We don't place third-party logos.

**Phone.** h2, lede, then the phone with the bubble full width (photo P2 cropped 1:1 behind it at 40% opacity under a Porcelain scrim, or dropped if it hurts legibility), the caption, the arrow line running downward, and the drafted card below.

**Motion:** typing dots → bubble → phrases fly into fields (8.4).

