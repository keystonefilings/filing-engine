# CoFile website design spec: "Glass Engine"

**Designer:** Tomás Ferreira, creative technologist (spec 06 of 10) · **Date:** Nov 26, 2026
**For:** the build team · **Covers:** cofile.app, the filing desk, client pages and the proof, the enterprise dashboard, white-label surfaces, developer docs and emails

> **The idea in one breath.** CoFile does something almost nobody has seen: a browser fills in a state's website screen by screen, checks the fee, and stops in front of the last button. Today's site describes this. Mine **plays it back**, from a real recorded rehearsal with test details, so a cautious CPA can watch the engine work before trusting it with a client. The drama lives on the public site. As the stakes rise (the desk, the client's form, the proof), the motion drains away, until the proof is the stillest page CoFile owns. **Motion goes down as consequence goes up.**

---

## 1. Who I am and how that shapes this design

I grew up in São Paulo writing shaders at night and building festival installations by day; for six years in Berlin I've built real-time 3D and live product stories, mostly interfaces where you watch an agent act step by step so you can trust it or stop it. That is CoFile's problem exactly. Three habits shape this spec:

1. **Show the real thing.** Every frame of motion comes from a real recorded rehearsal or from data the product already emits (run steps, `filing.step` events, the per-type live switch). No recording, no animation: the page shows the text log.
2. **Spectacle is an enhancement.** Every scene sits on server-rendered HTML that already carries the locked copy, the sample proof and the log. WebGL loads last and switches off first.
3. **English is my third language.** I design for 35% longer Spanish strings, for `¿` and `ñ`, and for people who read slowly because the words matter.

---

## 2. The concept: Glass Engine

The machine works behind glass, where you can see it. The glass is also a wall: you can watch, but nothing reaches the state until a person says so.

### 2.1 Three ideas

1. **Watch it run.** The public site is a viewing room. A sample proof assembles; then a recorded rehearsal plays across 13 glass panes, each a real captured screen of New Jersey's LLC form filled in with test details. The visitor's scroll moves the timeline, the engine's caret moves, and the log fills in with the locked words: "filled", "passed", "matched the proof", "matches the proof".
2. **The hold is the hero.** The climax isn't "Filed!" It's **"Pay Now: held, on purpose."** The caret decelerates and stops just short of the state's Pay Now button, and an amber ring draws around it. That ring becomes the brand mark. For a product in beta, the most honest and most memorable image is the one where it *doesn't* press the button.
3. **Motion goes down as consequence goes up.** Every surface is assigned an intensity, and a developer checks this table before adding any animation:

| Intensity | Name | Where | What moves |
|---|---|---|---|
| **4** | Theater | Home page Stage bands, the full rehearsal replay page | WebGL scenes, scroll-linked timelines, the caret, the fee lock, the hold ring |
| **3** | Instrument | Filing desk, dashboard, docs | Live data only: run strips ticking per screen, webhook events arriving. SVG and CSS, no WebGL |
| **2** | Paper | Sign-up, login, setup, intake forms, emails | Feedback only: focus, "Same as" ink-in, pending buttons, folds. ≤ 200 ms |
| **1** | Still | The proof, decision pages, Ready to pay | Nothing moves on its own. No parallax, no reveal, no autoplay |

### 2.2 Why it fits

- **The reader is cautious, not jaded.** A 58-year-old CPA has seen a thousand hero gradients, never a machine filling in the NJ portal and refusing to press Pay Now. Seeing is how they'll decide to put their name on the door.
- **The product is already visual.** The proof shows the state's own review page; the engine records screens; run steps carry screen names and times. The site needs a good player, not metaphors.
- **The beta becomes the show.** "Rehearsal" stops being a disclaimer. On the coverage board, Live is a closed ring and everything else is visibly open.
- **Developers get the same truth.** The recording behind the home page also drives the docs' webhook event replay, so the CPA and the API buyer watch the same rehearsal from two seats.

No robots, no glowing brains, no "AI" particles, no stock handshakes, no invented metrics, no 3D state maps. The only 3D object on the site is glass with a real screen inside it.

---

## 3. Brand identity

The folder tab with a check says "office supplies". I'm discarding it and drawing the mark from the product's signature moment.

### 3.1 The mark: the Held Ring

A ring that goes almost all the way around and stops short of a dot. It reads as a **C**, as a **progress ring that hasn't closed**, and as a filing that went through every screen and **held before the last button** (the dot).

**Construction on a 48 × 48 unit grid** (clock positions; 3:00 = 0°, counterclockwise positive):

| Part | Spec |
|---|---|
| Ring centerline | Circle centered at (24, 24), radius 17 |
| Stroke | 6.5 units (0.135 of the outer diameter) |
| Arc | Starts at **2:30** (15°) with a **flat cap** cut along the radius, runs **clockwise** through 6, 9 and 12, ends at **1:00** (60°) with a **round cap**. 315° of arc, 45° of gap |
| Dot | Filled circle, 6.75 units (stroke + 0.25 optical correction), centered on the ring's centerline at **1:45** (37.5°), the middle of the gap |
| Optical correction | The round cap is pushed 0.4 units along the arc so both ends read as equal weight |
| Clearance | ≈ 2 units of air either side of the dot; never under 1.6 at any size |

The flat end is where the run began; the round end is where it stopped, gently; the dot is the last button, untouched. The full construction holds down to 20 px. From 16 to 19 px use the **small-size master** (stroke 0.18 of the diameter, gap 56°, dot 1.1 × stroke). Below 16 px, no mark.

### 3.2 The icon family that grows from the mark

The ring becomes the status language, so the logo and the product speak one dialect. All glyphs are drawn on 16 and 20 px grids with the mark's proportions:

| Glyph | Drawing | Used for (product status words) |
|---|---|---|
| **Held** | The mark: 315° arc, dot in the gap | Rehearsal, Rehearsed to the payment screen, "held, on purpose" |
| **Closed** | Full ring, dot at the center | Live, Approved, Submitted to the state, Accepted by the state, Completed, EIN issued |
| **Stopped** | 315° arc ending in a short perpendicular bar; no dot | Needs correcting, Paused: state site changed, Rejected by the state, Failed, Stopped |
| **Waiting** | 180° arc, round caps | Waiting for approval, Needs information, Changes requested, On hold, Being checked, Name unavailable |
| **Mapped** | Full ring, 8 dashes | Screens recorded, rehearsal next |
| **Offered** | Full ring, 16 dots | Offered, not yet rehearsed |
| **Planned** | Hairline ring, ⅓ stroke | Planned |
| **Running** | 315° arc whose gap rotates (intensity 3 only; static at reduced motion) | Received, Queued, Filing now, Getting the state's review page, Final check |

Shape carries meaning on its own, so color never has to: for color-blind readers, grayscale prints and firms whose brand color is red.

### 3.3 Wordmark and lockups

"CoFile": one word, capital C and F, never "Cofile", "COFILE" or "Co-File". Set in **Trace Sans Medium** (commissioned, section 5); at launch, **Instrument Sans SemiBold, width 90**. Tracking −1% at display sizes, 0 below 18 px. Two drawn refinements: the **C**'s upper terminal is cut at the same angle as the mark's flat end, and the **i**'s tittle is a true circle; in the full-color lockup only, that tittle is Trace Blue.

```
 Horizontal (default)              Stacked                        Mark only
 ┌───────────────────────┐         ┌──────────┐                   ┌─────┐
 │  (◜◝·)  CoFile        │         │  (◜◝·)   │                   │(◜◝·)│
 └───────────────────────┘         │  CoFile  │                   └─────┘
 mark height = 1.32 × cap height   └──────────┘
 gap mark→word = 0.42 × mark Ø     word centered, gap = 0.3 × Ø
```

- **Clear space:** 4 × stroke on every side. **Minimum:** lockup 88 px wide; mark 20 px (16 px small master).
- **Colors:** Ink on Daylight (`#11151B` on `#F5F4EF`), Daylight on Stage (`#ECEEF2` on `#0B0E13`), or full color (dot and tittle in Trace Blue). Never on photos or gradients. Never in green, amber or red: the brand never borrows status colors.
- **Don'ts:** don't close the ring, move the dot, rotate the mark, or put it on a firm's client pages.
- **The one sanctioned animation:** on the home page's first paint only, the arc draws clockwise from the flat end in 900 ms (`ease-hold`), and the dot fades in 120 ms later: the run, in miniature. Nowhere else does the logo move.

### 3.4 The "with CoFile" co-brand mark

The locked copy promises "The only sign of us is a small 'with CoFile'." I take "small" literally.

- **Text only, no mark:** "with" regular, "CoFile" medium, always in CoFile's UI face (it reads as a credit line, not the firm's voice).
- **Size and color:** 12 px on the desk and intake pages, 13 px on the proof, 11 px in emails; `--text-3` (`#5C6370` / `#8B93A1`), never the firm's color or Trace Blue; ≥ 5:1 contrast everywhere.
- **Placement:** right end of the firm's brand bar, baseline-aligned with the firm's name. Under 400 px wide it moves to the footer after the firm's support email, so the brand bar holds only the firm.
- **Not a link** on client pages (a client is never led away from the firm); a link to cofile.app on the desk.
- **Absent** on enterprise white-label pages (`/e/…`), in the embed widget and on any tenant-branded page.

### 3.5 Voice of the visuals

Calm, exact, a little nocturnal. The Stage is dark like a theater before the curtain; the Daylight pages are clean like a well-kept office. Glass, not chrome. Lines, not blobs. Real screens, not illustrations of screens. One accent (Trace Blue) for CoFile, three signals (go, hold, stop) for filings, and everything else neutral.

---

## 4. Color

Two worlds: **Daylight**, where people read, fill in and approve, and **Stage**, where the engine performs. Stage is also the dark-mode base: the theater with the house lights down. On the public site, even in light mode, the hero, the Run and the close are **Stage windows**, dark bands in a daylight page, because the captured state screens are bright and glow on dark. Anything read at length (the catch, security, coverage, forms) sits in Daylight.

### 4.1 Core tokens

| Token | Daylight | Stage / dark | Use |
|---|---|---|---|
| `--bg` | `#F5F4EF` | `#0B0E13` | Page |
| `--surface` | `#FFFFFF` | `#131821` | Cards, sheets, fields |
| `--surface-2` | `#ECEBE5` | `#1B2230` | Insets, table headers, beta notice |
| `--surface-3` | `#E2E1DA` | `#242C3B` | Disabled fills |
| `--line` | `#D6D4CB` | `#2A3242` | Hairlines |
| `--line-strong` | `#8E8B80` | `#5E6A85` | Field borders (3.4:1 / 3.3:1 on surface) |
| `--text` | `#11151B` | `#ECEEF2` | Body, headings |
| `--text-2` | `#3C434E` | `#B3B9C5` | Ledes, secondary |
| `--text-3` | `#5C6370` | `#8B93A1` | Captions, timestamps, "with CoFile" |
| `--trace` | `#2E45D6` | `#8FA0FF` | CoFile's brand color: the caret, CoFile CTAs, links and focus on CoFile pages |
| `--trace-ink` | `#FFFFFF` | `#0B0E13` | Text on `--trace` |
| `--trace-soft` | `#E6E9FD` | `#1B2350` | Selected rows, the scan band |

Stage extras (both modes): `--stage-0 #07090D` (vignette edge), `--stage-haze #18213A` (haze peak behind the active pane), `--glass-edge` = `#8FA0FF` at 22% (Fresnel rim), `--glass-body` = white at 4%, `--caret #8FA0FF`.

### 4.2 Status colors

The meanings stay; the hues are retuned to glow on Stage and stay sober in Daylight. **Green, amber and red are never brand colors.** CoFile's own CTAs are Trace Blue, so green keeps one job: approved, live, and the button that moves a filing forward.

| Token | Daylight | Stage | Soft fill (light / dark) | Chip text (light / dark) | Meaning |
|---|---|---|---|---|---|
| `--go` | `#0B7A4B` | `#3FD69A` | `#DDF3E8` / `#0F2C21` | `#086A41` / `#3FD69A` | Approved, live, forward |
| `--hold` | `#9A5800` | `#FFB547` | `#FCEBD0` / `#33240A` | `#8A4F00` / `#FFB547` | A rehearsal's planned hold |
| `--stop` | `#B3261E` | `#FF7A6E` | `#FBE1DE` / `#3A1512` | `#B3261E` / `#FF7A6E` | A stop |

Text on solid status fills: white in Daylight; `#06120C`, `#1A1000`, `#1A0503` on Stage.

### 4.3 Contrast (WCAG ratios, calculated for these exact values)

| Pair | Ratio |
|---|---|
| `--text` on `--bg` (light / dark); on `--surface` (light, the proof) | 16.6 / 16.6; 18.3 |
| `--text-2` on `--bg` (light / dark) | 9.1 / 9.8 |
| `--text-3` on `--bg` (light / dark); on `--surface-2` | 5.5 / 6.3; 5.1 |
| White on `--trace`; `#0B0E13` on dark `--trace` | 7.2; 8.0 |
| `--trace` as link text on `--bg` (light / dark) | 6.5 / 8.0 |
| White on `--go` / `--hold` / `--stop` | 5.4 / 5.6 / 6.5 |
| Chip text on soft fills, light: go / hold / stop | 5.7 / 5.6 / 5.3 |
| Chip text on soft fills, dark: go / hold / stop | 8.1 / 8.6 / 6.4 |
| Status colors as text on Stage: go / hold / stop | 10.4 / 11.0 / 7.6 |

Rules: body text on the proof ≥ 7:1; captions ≥ 4.5:1 everywhere; every status is shape + words + color, never color alone. Charts use a separate neutral set (`#2E45D6`, `#6B7BE8`, `#A9B3F2`, `#5C6370`; Stage `#8FA0FF`, `#6475E0`, `#3E4A9A`, `#8B93A1`) so no bar is ever painted red to mean "Failed".

---

## 5. Typography

### 5.1 Typefaces

| Role | Launch | Phase 4 (commissioned) |
|---|---|---|
| Display and UI on CoFile surfaces | **Instrument Sans** (variable, width 75–100, weight 400–700) | **Trace Sans**: variable grotesk, width 80–100, weight 380–720, optical size 12–96 |
| Default client-facing text (when a firm keeps the default font preset) | **Atkinson Hyperlegible Next** (variable): built for low-vision readers, full Spanish coverage | same |
| Verbatim values, fees, codes, the log | **JetBrains Mono** (variable): tabular, unmistakable 0/O and 1/l/I | **Trace Mono** |

**Commission brief** (independent foundry, 7–9 months): the C's terminal angle built in; Latin Extended-A (Spanish, Portuguese and Vietnamese names in member lists); tabular and proportional lining figures; a dollar sign with a full stroke; a plain zero for fees and a dotted zero (stylistic set) for keys and references; the ring status glyphs in the Private Use Area so they sit on the baseline in chips and logs; hinting tested at 11–14 px on Windows.

### 5.2 Mono means verbatim

Anything in mono is exactly the characters that go to the state, the IRS or the API: `TWO SISTERS BAKERY LLC`, `88 Grove St, Jersey City NJ 07302`, `$103.50`, a filing reference, a `cofile_` key. Labels, explanations and headings are never mono. A client learns without being told: the monospaced lines are the ones to check.

### 5.3 Scales

**Public site** (base 17 px: the first reader is 58, on a laptop at arm's length):

| Token | Size | Line height | Weight / width | Example (locked copy) |
|---|---|---|---|---|
| `display-xl` | 40 → 76 px, `clamp(2.5rem, 1.4rem + 4.4vw, 4.75rem)`, −0.02em | 1.02 | 560 / 88 | "Your client approves the proof. Then CoFile files it." |
| `display-l` | 30 → 48 px, −0.015em | 1.08 | 560 / 92 | "Checked twice. Filed once." |
| `title` | 22 px | 28 px | 600 | "Encrypted, masked SSNs" |
| `lede` | 18 → 20 px | 1.6 | 400 | "Three steps, and your client is in charge of the middle one." |
| `body` / `body-s` | 17 / 15 px | 28 / 24 px | 400 | Paragraphs; the beta note under the CTAs |
| `caption` | 13 px | 20 px | 450 | "Sample proof · test details · not a real business" |
| `kicker` | 13 px mono, uppercase, +0.08em | 16 px | 500 | "For CPA, payroll, fractional CFO and title firms" |
| `mono-m` / `mono-s` | 16 / 13 px | 24 / 20 px | 450 | Log and fee rows; pane addresses |

Ledes run 62–68 characters, body 72. Headlines `text-wrap: balance`, paragraphs `text-wrap: pretty`.

**Desk and dashboard (intensity 3):**

| Token | Size / line height | Notes |
|---|---|---|
| `h1` | 28 / 34 px, 600 | One per page: "Filings", "Ready to pay", "Send a client a link" |
| `h2` | 20 / 28 px, 600 | Card heads: "Link to the proof", "Documents" |
| `body` | 16 / 24 px | |
| `table` | 15 / 22 px | Numeric columns mono, right-aligned |
| `meta` | 13 / 18 px | Timestamps, "started … by …" |
| `stat` | 36 / 40 px mono, 500 | Dashboard counts |

**Client pages and the proof (phone first):**

| Token | Phone | ≥ 900 px | Notes |
|---|---|---|---|
| `h1` (filing title) | 26 / 32 px, 650 | 32 / 38 px | "New Jersey LLC formation" |
| `body` | 18 / 28 px | 18 / 30 px | Consent and explanation text, AAA contrast |
| `label` | 15 / 20 px, 600, `--text-2` | same | "Business name", "Members" |
| `value` (verbatim) | 17 / 26 px mono | same | `overflow-wrap: anywhere`, never truncated |
| `fee` | 17 / 26 px mono, tabular, right-aligned | same | |
| `total` | 22 / 28 px mono, 600 | 24 / 30 px | The "Total" row |
| `button` | 18 px, 600 | 17 px | "Approve, and authorize submission and payment" wraps to two centered lines on narrow phones, never truncated |

The firm's font, when set, replaces the text face for headings, labels and body on these pages, after the checks in 11.6. It never replaces the mono.

### 5.4 Numerals

Fees: mono, tabular, two decimals, decimal points aligned. Deadlines stay in words as the product writes them ("December 3, 2026, 5:00 PM Eastern"), in the text face: a deadline is an explanation, not a verbatim value. Keys, references and log times: mono with the dotted zero.

---

## 6. Layout

### 6.1 Grid and breakpoints

| Name | Width | Columns | Gutter | Margin |
|---|---|---|---|---|
| `xs` | 0–599 | 4 | 16 | 16 + safe-area insets (works at 320 px) |
| `sm` | 600–899 | 8 | 20 | 24 |
| `md` | 900–1199 | 12 | 24 | 32 (home Stage goes inline, unpinned) |
| `lg` | 1200–1599 | 12 | 24 | 48 (home Stage pins beside the copy) |
| `xl` | ≥ 1600 | 12 | 32 | auto; content max 1360, Stage windows may bleed to 1600 |

Home at `lg`: copy in columns 1–5, the pinned Stage viewport in 7–12 (16:11, sticky at `top: 96px`). Desk at `lg`: a 232 px rail plus content capped at 1040 px; detail pages 720 px. The proof: one 680 px column at every size.

### 6.2 Spacing, radii, elevation

- **Spacing** (4 px base): `2, 4, 8, 12, 16, 24, 32, 48, 64, 96, 128, 160`. Home sections 128 / 96 / 64 px vertical at `lg` / `md` / `xs`; desk cards 24 px padding (16 on `xs`); 20 px between fields, 32 between fieldsets.
- **Radii:** 3 px log highlights; 6 px chips; 10 px buttons, fields, notices; 14 px cards; 22 px the proof sheet, Stage windows and glass panes; 999 px pills.
- **Elevation:** `e1` card = `0 0 0 1px var(--line), 0 1px 2px rgba(17,21,27,.05)`; `e2` popover/toast = `0 0 0 1px var(--line), 0 12px 32px -12px rgba(17,21,27,.22)`; `e3` the proof sheet on Stage = `0 48px 96px -48px rgba(0,0,0,.65), 0 0 0 1px rgba(255,255,255,.06)`. Dark mode uses inset borders (`inset 0 0 0 1px var(--line)`) instead of shadows. At intensity ≤ 3, hover changes borders only; elevation never animates.

---

## 7. Imagery

### 7.1 What the site shows instead of pictures

1. **Real recorded rehearsals.** The primary image source: captured screens from a rehearsal on the state's real website, filled in with test details ("Two Sisters Bakery LLC", Ana and Lucia Ortiz, 88 Grove St, as in the locked sample). Each capture sits in a thin "ghost browser" frame whose address bar shows the real address in mono (for New Jersey, `njportal.com/DOR/BusinessFormation/…`). The captures are not redrawn, recolored or "improved". The only edits are masking session identifiers and any field that isn't test data. Whether state insignia need masking is counsel's call; my default is to leave the captures unaltered and keep them small enough to read as evidence, not decoration. The footer's "isn't affiliated with any state or the IRS" line stays on every page that shows them.
2. **The sample proof as live HTML**, never a screenshot: real text, selectable, translatable and readable by screen readers. In the scene it's rendered into a texture from that same HTML, so the two can never disagree.
3. **Blank papers, never fake documents.** A rehearsal stops before the last button, so no certificate or EIN letter exists for the test business, and the site must never show one: a mocked-up state certificate or IRS letter would imply a filing that never happened. For "The papers come back to you." I commission a short still-life series of **blank** paper: plain sheets, an empty envelope, a thin stack, with no letterheads, seals, numbers or names. Shot top-down on a matte warm-gray desk (`#D6D4CB` range), soft daylight from the left, 50 mm, no hands, no props, no coffee cups. In the scene, the same blank sheets are labeled only with the locked list's own words (the state's documents, the EIN, one record).
4. **No people photography on CoFile's pages.** The firms are the humans in this story, and they put their own faces on their own pages. On firm-facing marketing, a stock accountant would be a lie, and a stock "founder" would be worse.

### 7.2 3D

One scene family: **glass panes on a dark stage.** Each pane is a 16:10 rounded rectangle (corner radius equivalent to 22 px at its display size) with a 2 mm bevel, holding one captured screen as its texture. Panes stack in depth like a fanned deck (18 world units apart, rotated −14° on Y, offset 6 units on X per pane). The camera is a slow dolly with a 35 mm-equivalent lens; it never orbits more than 18° and never rolls. There's no other geometry: no desks, no buildings, no maps, no particles that don't carry a glyph.

### 7.3 Data visuals

- **The coverage board** (home): a five-stop track per filing type, drawn in SVG from the same data as the table (9.11).
- **The run strip** (desk, dashboard): one tick per screen of the state's form, filled as `filing.step` events arrive (9.5).
- **The event replay** (docs): a vertical stream of webhook events synced to the same recording as the home page (10.10).
- **Dashboard charts**: neutral bars with direct labels and the status glyphs as row markers, no legends to decode, no pie charts.

### 7.4 What to commission, and from whom (by kind)

| Commission | From | Deliverable |
|---|---|---|
| Real-time scene and player | A real-time 3D / creative-coding studio with shipped WebGL production sites and a record of performance work on mid-range phones | The Glass Engine player (8.4), shaders, the recording format and importer, the tier 1 storyboard renderer |
| Typefaces | An independent type foundry with variable-font and hinting experience | Trace Sans and Trace Mono (5.1) |
| Mark refinement | A small identity studio, or the foundry above | Masters of the Held Ring, the small-size master, the icon family on 16 and 20 px grids |
| Paper still life | A still-life / product photographer | 6 frames of blank paper (sheets, an envelope, a stack): no letterheads, seals, numbers or names (7.1) |
| Sound (optional, phase 3) | A UI sound designer | 5 cues (key tick, scan, match, hold, stop), each under 40 KB, mono, normalized to −18 LUFS, off by default |
| Spanish | A legal-translation agency experienced with US Hispanic readers, with counsel reviewing consents | Spanish versions of client pages, the proof and client emails |
| Accessibility audit | An independent accessibility firm with testers who use screen readers and magnifiers daily | An audit before each phase ships |
| Recordings | Our own engine | A rehearsal of each showcased filing type with test details, exported as a run recording (13.3) |

---

## 8. Motion and interaction

### 8.1 Principles

1. **Motion is evidence.** Something moves only to show a thing the product really does: a field being filled, a fee being read, a run holding. Never for "delight".
2. **The engine has one gesture: the caret.** A slim vertical bar (2 × 18 px at 1×) with a 6 px Trace Blue dot at its foot and a 120 ms fading trail. It's deliberately not a mouse pointer, so nobody mistakes it for their own cursor or for a person.
3. **Deceleration means care.** The engine never snaps. It eases into every field and decelerates hardest in front of Pay Now.
4. **Native scroll is sacred.** No scroll-jacking and no smooth-scroll libraries that override the wheel. Scenes are scroll-*linked* (they read the scroll position), never scroll-*driven* (they never move it).
5. **Motion goes down as consequence goes up** (2.1).

### 8.2 Tokens

| Token | Duration | Easing | Use |
|---|---|---|---|
| `t-instant` | 0 ms | | Reduced motion; everything on the proof |
| `t-micro` | 120 ms | `ease-settle` | Hover borders, chip changes, "Same as" per-field ink-in |
| `t-short` | 200 ms | `ease-settle` | Folds opening, notices appearing, toasts |
| `t-medium` | 320 ms | `ease-settle` | Run strip tick fill, desk panel transitions |
| `t-long` | 560 ms | `ease-settle` | Home section reveals (once per page view) |
| `t-draw` | 900 ms | `ease-hold` | The Held Ring drawing; the logo's first paint |
| `t-scene` | 1.2–2.4 s | `ease-dolly` | Camera moves between scene states |
| `t-breathe` | 4 s loop | sine | The hold ring breathing: scale 1.00 → 1.035, glow 60% → 100% |

| Easing | Curve | Feel |
|---|---|---|
| `ease-settle` | `cubic-bezier(0.2, 0, 0, 1)` | Fast start, soft landing; the default |
| `ease-hold` | `cubic-bezier(0.33, 0, 0.12, 1)` | Long, deliberate deceleration; the stop in front of Pay Now |
| `ease-dolly` | `cubic-bezier(0.45, 0, 0.2, 1)` | Camera: symmetric, unhurried |
| `ease-exit` | `cubic-bezier(0.4, 0, 1, 1)` | Things leaving |
| Caret spring | stiffness 380, damping 34, mass 1 | Critically damped: no overshoot, ever |

Typing in scenes: 28 ms per character, capped at 600 ms per field (long addresses speed up rather than drag). Each glyph inks in with a 2 px rise and 0 → 100% opacity over 90 ms.

### 8.3 Signature moments

**1. The proof assembles** (hero, once, 2.4 s, starting 400 ms after the H1 paints). The sample proof's rows type in top to bottom; the numbered callouts 1 to 4 pop onto their rows (scale 0.8 → 1, `t-short`); the "Rehearsal" chip draws its Held glyph last.

**2. Words into fields** ("Clients don't fill in forms. They text you.", 3.2 s). Ana's bubble sits on the left. The phrases "an LLC", "me and my sister, 50/50" and "in Jersey City" highlight in `--trace-soft`, then their glyphs lift and fly along curved paths into three fields of a drafted New Jersey LLC formation. The locked line "↳ read into a drafted New Jersey LLC formation for your team to check" writes underneath. The draft ends with a Waiting glyph, because someone at the firm still checks it: the scene never sends it anywhere.

**3. Registration** (the Run, frame F6, 1.1 s). The state's captured review page slides over the proof's picture of it. Printer's registration marks (⊕) converge from 40 px outside the four corners and lock when the layers align: a proof, in the printer's sense, which is the locked lede's own metaphor.

**4. The fee lock** ("Checked twice. Filed once." and the Run's F7, 1.8 s). Left: the proof's fee column (`$100.00`, `$3.50`, `$103.50`). Right: the state's captured payment screen. A scan band sweeps the state's amounts; each lifts off the screen, travels left and settles beside its twin with decimal points aligned, and a bracket closes around each pair.

**5. The hold** (the Run's F8 and the close, 2.2 s). The caret approaches Pay Now on `ease-hold` and stops 28 px short. The Held Ring draws around the button in `--hold` (900 ms), then breathes. The caret withdraws 8 px. The log row "Pay Now · held, on purpose" lights amber. The breathing stops after 20 cycles and the frame holds still.

**6. The firm swap** ("Your name on the door. Ours in small print.", 1.2 s per firm). The sample proof re-skins through three fictional example firms: Harbor & Pine CPA plus two more whose names the copy owner supplies (Appendix B), with deliberately difficult brand colors, a pale yellow `#F4B400` and a mid pink `#E91E63`. The theming system's fixes happen visibly (11.3): the yellow button takes dark text and gains an edge; the pink darkens one step to `#E41B60`. "with CoFile" stays the same size and color through all three. It rests on Harbor & Pine.

**7. The stop variant** ("Checked twice. Filed once.", on demand only, 1.6 s). Triggered from the first check's sentence ("If the two differ, it stops before paying and tells you why."). The same fee lock, but the state's amount differs: the bracket doesn't close, the run line ends in the Stopped glyph in `--stop`, and the pane dims. This is the one sanctioned exception to "only real recordings", so it's built to look like a diagram, not evidence: the state side is a neutral, untextured pane with a single amount on it, never a captured or doctored state screen, and its caption calls it an example (wording in Appendix B). It never autoplays, so no visitor lands on a red stop without asking for it.

### 8.4 The Glass Engine scene

**Renderer.** three.js (WebGL2) with custom GLSL, running in an **OffscreenCanvas worker** where supported so input never waits on the GPU; main-thread fallback elsewhere. A WebGPU renderer sits behind a flag for phase 3.

**Scene graph.** A camera; up to 13 pane meshes sharing one instanced geometry (one draw each for its texture); the proof sheet as a pane whose texture is rasterized from the same HTML as the tier 0 proof; the caret as a screen-space quad; a half-resolution haze quad. Targets: ≤ 40 draw calls, ≤ 60 k triangles, ≤ 9 texture binds per frame.

**Shaders.**

- **Stage haze** (fullscreen fragment): two octaves of low-frequency value noise (scale 0.6, drift 0.015 units/s), mixed from `--stage-0` at the edges to `--stage-haze` behind the active pane, with a radial vignette (inner 0.35, outer 1.1). **Blue-noise dithering** (a 64 × 64 tiling texture, ±1/255) prevents banding on 8-bit panels. Rendered at half resolution and upsampled.
- **Glass pane:** the screen texture (KTX2/Basis UASTC, mip-mapped); a Fresnel rim, `pow(1.0 − dot(N, V), 3.0) × 0.22` in `--glass-edge`; a 2 px bevel normal map that offsets the backdrop sample by up to 3 px (cheap refraction from a downsampled copy of the haze, never the other panes); depth falloff where panes behind the active one lose 30% brightness and soften through a precomputed mip bias, so there's no per-frame blur pass.
- **Scan band** (a uniform on the pane shader): a 28 px horizontal band at the field the engine is reading, lifting luminance 8%, with a 1 px Trace Blue leading edge. Its position comes from the recording's field rectangles, never from guesses.
- **Field ink:** test-detail values drawn from a multi-channel signed-distance (MSDF) atlas of the mono face, sharp at any zoom and able to fly between panes glyph by glyph. Each glyph has its own start time and a quadratic Bézier path whose control point lifts 40 px toward the camera.
- **Held Ring:** an SDF in a fragment quad, `d = abs(length(p) − r) − w`, masked to the arc by angle with the 45° gap and the dot at 37.5°; arc length driven by a `progress` uniform 0 → 1; outer glow `exp(−d × 18.0) × 0.5` in `--hold`. The same geometry as an SVG path drives tiers 1 and 2.
- **Registration marks:** four SDF crosshair-in-circle marks converging to the pane's corners, locking with a one-frame 20% brightness flash (skipped at reduced motion and for anyone with `prefers-contrast: more`).

**Dynamic resolution.** Device pixel ratio clamped to 1.5. If the 30-frame moving average exceeds 14 ms, drop to 1.0, then to 0.75 with FXAA. If three consecutive frames exceed 50 ms, the scene hands off to tier 2 mid-play without losing the playhead.

### 8.5 Performance budgets

| Budget | Target | How |
|---|---|---|
| LCP (home, 4G, mid-range Android) | ≤ 1.8 s | The H1 is the LCP element, server-rendered text; nothing waits for the scene |
| CLS | ≤ 0.02 | Stage windows have fixed aspect ratios from first paint; tier 0 content fills the same box |
| INP | ≤ 150 ms | Scene in a worker; passive scroll listeners; no layout reads inside animation frames |
| Initial JS (home) | ≤ 70 KB gzipped | The scene loader is 6 KB; the scene is fetched on idle |
| Scene JS | ≤ 140 KB gzipped | Tree-shaken three.js core plus our shaders |
| Scene textures | ≤ 1.6 MB desktop, ≤ 600 KB phone | KTX2; phones get the 1024 px set; panes stream in run order |
| Fonts on first paint | ≤ 110 KB | Subset WOFF2, `font-display: swap`, metric-matched fallbacks (`size-adjust`, `ascent-override`) so the swap doesn't shift |
| GPU frame | ≤ 8 ms at 1440p on an integrated laptop GPU | Checked in a 60-frame warm-up before the scene shows |
| Idle cost | 0 | The loop stops when the Stage window is off-screen, the tab is hidden, or the scene is paused or finished |
| Battery | No continuous rendering after the hold | Breathing stops after 20 cycles |
| Desk, client and proof pages | ≤ 120 KB JS per page; no WebGL shipped at all | Separate bundles; a lint rule forbids importing the scene outside `/` and the replay page |

### 8.6 Tiers and fallbacks

| Tier | Who gets it | What they see |
|---|---|---|
| **0: Document** | No JS, text browsers, crawlers, AI agents, print | The whole story: the sample proof as HTML, the rehearsal log as an ordered list, the coverage table, the captions. This *is* the page; everything else decorates it |
| **1: Storyboard** | `prefers-reduced-motion: reduce`, Save-Data, `deviceMemory < 4`, fewer than 4 cores, low battery (Battery API under 20% and not charging), no WebGL2, or a failed warm-up | The Run as a static **filmstrip**: 8 key frames (the log's grouped steps) as compressed stills in a row (a vertical list on phones), each with its log line; the hold frame larger, with the Held Ring drawn and still. The fee lock as two aligned columns with brackets closed. Nothing autoplays |
| **2: Motion lite** | Capable phones without GPU headroom; any scene that dropped frames | CSS and SVG: log rows type in, the ring draws in SVG, the fee lock in DOM, panes as `<img>` with CSS 3D transforms and no shaders |
| **3: Glass Engine** | Desktop and capable devices with motion allowed | The full scene |

Detection runs once, on idle, cached for the session. A visitor can always step down: every Stage window has a **pause/play control** (bottom-right, 44 × 44 px, focusable, `Space` toggles it when focused) and a **replay** control after the hold. The tier never steps up without a reload. Labels for these controls need copy (Appendix B).

**Reduced motion is tier 1, full stop:** no camera, no flying glyphs, no breathing, no flash. The information is identical; only the movement is gone. **Low power** (Save-Data, low battery, or the OS's low-power hint where exposed) is tier 1 too.

### 8.7 Interaction rules for scenes

- At `lg`, the scroll position maps to the Run's timeline only while its Stage window is pinned (300 vh of scroll). Below `lg`, the Run is an inline player that plays when 60% visible and pauses when it leaves.
- The log rows beside the scene are real buttons: activating "Members and signatures · filled" jumps the playhead to that step. Arrow keys move between rows; focus never enters the canvas.
- Hovering or focusing a pane shows its address and screen name (from the recording, such as "Registered Agent") in 13 px mono after 400 ms.
- Scenes never capture the pointer, never play sound unless switched on, never cover text, and never loop on their own.

---

## 9. Components

Every component exists in three skins: **CoFile** (Trace Blue accents), **Firm** (the firm's derived tokens, section 11) and **Tenant** (an enterprise's white-label tokens, with no trace of CoFile). Status colors and glyphs are identical in all three. Components are built once, as CSS-variable-driven React components, and the engine's proof renderer consumes the same CSS.

### 9.1 Buttons

| Role | CoFile skin | Firm skin | Used for (locked labels) |
|---|---|---|---|
| `primary` | `--trace` fill, `--trace-ink` text | not used | "Run a free rehearsal", "Create account", "Log in", "Send", "Email me a reset link" |
| `forward` | `--go` fill, white text | the firm's derived fill and text (11.3) | "Send the proof to my client", "Send to {firm}", "Approve, and authorize submission and payment", "Pay and file", "New filing", "Save and continue" |
| `secondary` | `--surface` fill, `--text`, 1.5 px `--line-strong` border | border in the firm's ink at 40% | "See what your client sees", "Request changes", "Send a client a link", "Continue with Google" (Google's own spec) |
| `quiet` | text in `--trace`, underline on hover | text in the firm's ink | "Use a link instead", "send the link again", "Back to log in" |
| `danger` | `--surface` fill, `--stop` text and 1.5 px border | same | "Remove logo", revoking a key, removing a signature |

| Size | Height | Padding | Text |
|---|---|---|---|
| L | 52 px (56 px for the approve button on phones) | 0 24 px | 17 px / 600 |
| M | 44 px | 0 18 px | 16 px / 600 |
| S | 36 px visual, 44 px hit area | 0 12 px | 14 px / 600 |

| State | Treatment |
|---|---|
| Hover | Fill 6% darker in OKLCH lightness (4% lighter on Stage), `t-micro` |
| Pressed | Fill 10% darker, content shifts 1 px down; no scaling |
| Focus-visible | 3 px ring in `--trace` (or the firm's ink), 2 px offset, visible against the fill and the page |
| Disabled | `--surface-3` fill, `--text-3` text; no opacity tricks; `cursor: not-allowed` |
| Pending | The label changes to the product's pending text ("Sending…", "Saving…", "Creating…", "Confirming…"), preceded by a 14 px Running glyph (static at reduced motion); width locked so nothing shifts |

### 9.2 Fields

- 48 px tall (56 px on client pages on phones), 16 px horizontal padding, 17 px text (16 px is the floor anywhere, so iOS never zooms), radius 10, 1.5 px `--line-strong` border, `--surface` fill.
- Label above (15/20 600); help below (14/20 `--text-2`). The required marker is explained once at the top, as the product does: "Fields marked * are required."
- **Focus:** a 2 px border in `--trace` (or firm ink) plus a 4 px outer ring at 20%.
- **Error:** 2 px `--stop` border; the Stopped glyph and the message in `--stop` above the help; and the summary notice at the top of the form ("Please fix these and submit again.") listing each problem as a link to its field.
- **Paired fields:** `n2` (2fr / 1fr) and `n3` (2fr / 1fr / 1fr), stacking to one column under 600 px.
- **Verbatim inputs** (business name, EIN, SSN, ZIP, share counts) use the mono face, so people type into the same letters the proof will show.
- **SSN fields:** masked after blur (`•••-••-1234`) with a show/hide toggle; `autocomplete="off"`, no spellcheck, numeric keyboard.
- **"Same as" chips:** 32 px pills above an address or person, after the locked "Same as" label, each naming the earlier entry. On press, values ink into each field with a 60 ms stagger (`t-micro`) and the chip shows a Closed glyph for 2 s. Reduced motion: instant.
- **Folded optional sections:** a full-width 56 px `summary` row with the section title and "(optional)", a chevron that turns 90° in `t-short`. A fold opens itself when it holds an answer or a problem, as the product already does. "More options (optional)" uses the quiet style.
- **Authorization statements:** each a 56 px-minimum checkable card (the whole card is the label), 24 px checkbox, the statement text at 16/24; checked state shows a 2 px border in the firm's ink. The locked help above them ("The state form asks for these. …") stays at full size, never as fine print.
- **Signature pad:** always a white sheet, even in dark mode, 160 px tall, 1.5 px dashed border, a baseline rule at 70% height in `--line`, with the locked pad label for screen readers.
- **Security code field** (Ready to pay): one 4-character mono field at 28 px, `inputmode="numeric"`, `autocomplete="cc-csc"`, 64 px tall.

### 9.3 The proof card

The home page's sample and the real proof share one component, so "See what your client sees" stays true.

```
┌──────────────────────────────────────────────────┐ ← 3 px stripe, firm's second color
│ [logo] Harbor & Pine CPA              example firm│ ← brand bar, 56 px
├──────────────────────────────────────────────────┤
│ Two Sisters Bakery LLC          (◜◝· Rehearsal)   │ ← title + Held chip
│ New Jersey LLC formation. Please approve by       │
│ Dec 3, 5:00 PM Eastern.                           │
│                                                   │
│ ①  Business name   TWO SISTERS BAKERY LLC         │ ← values in mono, with a 2 px
│    Members         Ana Ortiz, Lucia Ortiz (50/50) │   underline in --trace-soft on
│    Main business   88 Grove St, Jersey City NJ    │   the highlighted ones
│    address         07302                          │
│ ②  Formation filing fee                  $100.00  │
│    NJ portal fee, by card                  $3.50  │
│    Total to the state                    $103.50  │ ← 1.5 px rule above the total
│ ③  New Jersey's own review page, filled in        │
│    Business Name   TWO SISTERS BAKERY             │
│    Designator      LLC                            │
│ ④  [ Approve for filing ]                         │
│    Nothing is submitted or paid until you approve.│
├──────────────────────────────────────────────────┤
│ Sample proof · test details · not a real business │ ← figcaption
└──────────────────────────────────────────────────┘
```

Callouts are 24 px circles in `--text` with `--surface` numerals (13 px mono) in a 40 px left gutter. On the home page at `lg`, each callout connects by a hairline to its line in the "The proof" section's list while that section is in view.

### 9.4 Status chips

28 px tall, radius 6, 6 px glyph-to-label gap, 13/16 600 text, soft fill and chip text from 4.2. The label is always the product's own status text, never abbreviated; on phones chips wrap to two lines rather than truncate.

| Group | Fill | Glyph | Product labels |
|---|---|---|---|
| Go | go-soft | Closed | Live, Approved, Submitted to the state, Accepted by the state, Completed, EIN issued |
| Hold | hold-soft | Held | Rehearsal, Rehearsed to the payment screen |
| Waiting | hold-soft | Waiting | Waiting for approval, Needs information, Changes requested, On hold, Being checked, Name unavailable |
| Stop | stop-soft | Stopped | Needs correcting, Paused: state site changed, Rejected by the state, Failed, Stopped |
| Neutral | surface-2 | Running, Mapped, Offered or Planned | Received, Queued, Filing now, Getting the state's review page, Final check, Screens recorded, rehearsal next, Offered, not yet rehearsed, Planned |

A **high-emphasis** variant (solid status fill, status-ink text) exists for stops on firm themes that are stop-adjacent (11.4) and for the single most urgent item on a page.

### 9.5 The timeline and the run strip (filing detail)

Vertical on phones, horizontal at `md`+. Nodes are 20 px glyphs joined by a 2 px line, solid where done and dashed ahead. Stages use the product's status names: Received → Waiting for approval → Approved → (Ready to pay, when a card's security code is needed) → Filing now → Submitted to the state → Accepted by the state → Completed, with Documents and EIN issued hanging off Completed. A **rehearsal's** track ends at a **Held** node in amber right after "Filing now", and nothing is drawn beyond it, because a rehearsal never goes there. A stop replaces the current node with the Stopped glyph and the product's next-step text under it. Each node shows its time (13 px mono) and, on hover or focus, the event behind it.

**The run strip** sits under "Filing now" while a run is active: one 8 × 20 px tick per screen of the state's form (13 for the NJ LLC), labeled from the run's own steps ("Business Name", "Registered Agent", …). Ticks fill left to right as `filing.step` events arrive (`t-medium`); the newest pulses once, not continuously. The last tick is the payment button: in a rehearsal it ends Held; in a live filing it fills only after the fee check passes. Screen readers get one polite announcement per screen, throttled to one per 4 s, with a mute control.

```
 Filing now ── run strip (rehearsal)
 ▮▮▮▮▮▮▮▮▮▮▮▯ (◜◝·)
 Business Name · Designator · Data · Purpose · Address · Agent · Agent details ·
 Members · Provisions · Signatures · Contact · Review · Payment (held)
```

### 9.6 Tables

- Row height 52 px (desk), 44 px (dashboard dense option); header 40 px in `--surface-2`, 13 px 600 `--text-2`, sticky.
- No zebra stripes; `--line` hairlines. Numbers mono and right-aligned. Status columns use chips.
- Row hover: `--trace-soft` or `firm-soft`; when a row opens something, the whole row is the link, with the first cell as the accessible name.
- Under 600 px, tables become stacked cards: first column as the title, status chip top-right, the rest as label/value pairs.

### 9.7 Navigation

- **Public top bar** (64 px): the horizontal lockup; the locked section links "How it works", "For firms", "What we file", "For platforms"; "Log in" (secondary) and "Run a free rehearsal" (primary). Under 900 px: lockup, "Log in" and the CTA. On the home page the section links become a horizontally scrolling chip row under the bar, so no hamburger and no new "Menu" label is needed.
- **Filing desk rail** (232 px at `lg`): the firm's logo and name at the top with "with CoFile" under them; then "Filings", "New filing", "Ready to pay" (with a count badge when filings wait for a security code), "Client links", "Signatures", "Setup", "Billing"; the account email (linking to the password page) and "Log out" at the bottom. Under 1200 px: a top bar with the same links in a scrolling row and the count badge kept.
- **Dashboard rail:** "Overview", "Filings", "Ready to pay", "Firms", "API keys", "Webhooks", "Setup", "Team", "Billing", "Docs", plus "Sign-ups" for the platform tenant only.
- **Footer** (public pages): "CoFile · the filing desk behind your firm", "New York · New Jersey · Florida · IRS", then the locked legal line ("CoFile is not a law firm or a government agency, isn't affiliated with any state or the IRS, and doesn't give legal or tax advice.") and "Terms · Privacy · Security · hello@cofile.app". Stage background, 15 px, `--text-2`.

### 9.8 Banners and notices

- **Beta notice:** 36 px, `--surface-2`, centered 14 px `--text-2` text, a 14 px Held glyph in `--hold` before the bold "Beta", then the locked text ("CoFile is in beta. Any filing can run as a free rehearsal on the state's real website. It stops before the last button, so nothing is filed or paid. Filing types go live one at a time." with the contact on CoFile pages). On firms' white-label pages, the neutral version ("This service is in beta. …") with no CoFile name or address. Never in the embed widget. It doesn't dismiss: it's a fact, not an announcement.
- **Notices** (radius 10, 16 px padding, 4 px left bar): info (`--line-strong` bar), hold (hold-soft, Held glyph), stop (stop-soft, Stopped glyph), go (go-soft, Closed glyph). An action inside a notice is a link at its end, as the product's copy has it ("Pay and file", "Subscribe").
- **Rehearsal band** on client pages and the proof: full width, hold-soft, a 20 px Held glyph, the locked line at 17 px 600 ("Rehearsal: nothing will be filed or paid, even if you approve." on the proof; "This page is in rehearsal for now. …" on intake). Sticky at the top of the viewport on the proof, so it's visible at every scroll position.

### 9.9 Empty states

One static drawing: the Held Ring at 64 px in `--line-strong`, with a 120 px hairline running into its flat end, beside the locked line ("Your desk is clear. Start a filing (it can be a free rehearsal), or send a client a link with your logo on it.") and its buttons. Other empty states ("No saved signatures yet.", "None yet.") use the same drawing at 40 px. No illustrated people, boxes or plants.

### 9.10 Toasts

For confirmations that need no decision ("Saved to Google Docs."). Bottom-left at `md`+, top on phones, 6 s, paused on hover and focus, `role="status"`, dismissible. Anything about money, approval or a stop is never a toast: it's an inline notice that stays.

### 9.11 The coverage board and table

Desktop shows the board; the table under it is the same data in the locked columns ("Filing", "Where", "Where it stands"). Phones show the table as cards.

```
 Where it stands:                Planned   Offered   Screens recorded   Rehearsed   Live
 ──────────────────────────────────────────────────────────────────────────────────────
 NEW JERSEY
 LLC formation                      •─────────•─────────•──────────────(◜◝·)────────○   Rehearsed to the payment screen
 Standing certificate (through      •─────────•─────────•──────────────(◜◝·)────────○   Rehearsed to the payment screen
 the API; not on the filing desk yet)
 Employer registration (NJ-REG)     •─────────•────────(◌)──────────────○───────────○   Screens recorded, rehearsal next
 Corporation formation (for-profit) •────────(⁘)────────○──────────────○───────────○   Offered, not yet rehearsed
 Alternate name, charter amendments(○)────────○─────────○──────────────○───────────○   Planned
 FLORIDA …   NEW YORK …   IRS …
```

- Rows are grouped by "Where" (New Jersey, Florida, New York, IRS) with 13 px mono uppercase group heads.
- Each row's current stop draws its glyph (Held, Mapped, Offered, Planned); passed stops are small filled dots; stops ahead are hollow.
- **Live looks unlike everything else:** a Live row gets the Closed glyph at the last stop, a go-soft row background and the "Live" chip. Nothing else on the board is green. If no type is live in this deployment, no row is green, and that's correct.
- The status words are always printed in full beside the track. The track is a picture of the sentence, never a replacement for it.
- Built from the page's `COVERAGE` list and the per-type live switch at render time, so the board can't drift from the table.
- The locked footnote ("Rehearsed to the payment screen: CoFile completed every screen …") sits directly under the board, with "Write to hello@cofile.app and we'll tell you each one by name." as a link.

### 9.12 Stage window

The container for every scene: radius 22 (full-bleed bands have none), `--stage-1` fill, fixed aspect ratio, tier 0 HTML inside it from first paint, the canvas layered over it once ready (cross-fade 320 ms), pause/play and replay controls bottom-right, the locked caption bottom-left in 13 px `--text-2`. When the scene is paused or finished, the HTML underneath is what assistive technology reads.

### 9.13 Code blocks and copy buttons

Code on Stage in both modes (`--stage-1`, text `#ECEEF2`, 14/22 mono). Syntax uses Trace tints only, so a status color never means "syntax": keys `#8FA0FF`, strings `#C9D1FF`, numbers and booleans `#ECEEF2` bold, comments `#8B93A1`. A 36 px copy button at the top-right shows a Closed glyph for 2 s after copying. API keys and approval links use the same block in a dashed-border "secret" variant.

---

## 10. Page by page

### 10.1 Home `/`

The locked sections stay in their locked order. At `lg`, one **pinned Stage viewport** (columns 7–12) carries the scene through sections 1 to 8, changing state per section, while the copy scrolls normally in columns 1–5. Below `lg`, each section gets its own inline Stage card (4:5 on phones, 16:11 on tablets) that plays when it's in view. The page `<title>` and description stay as `generateMetadata` writes them.

**Hero, desktop:**

```
┌ (◜◝·) Beta  CoFile is in beta. Any filing can run as a free rehearsal … hello@cofile.app ┐
├────────────────────────────────────────────────────────────────────────────────────────┤
│ (◜◝·) CoFile   How it works  For firms  What we file  For platforms  [Log in] [Run a free rehearsal] │
├──────────────────────────── Stage window (full bleed) ─────────────────────────────────┤
│                                      │                                                 │
│ FOR CPA, PAYROLL, FRACTIONAL CFO     │      ┌──── sample proof sheet (e3) ────┐        │
│ AND TITLE FIRMS                      │      │ Harbor & Pine CPA  example firm │  haze  │
│                                      │      │ Two Sisters Bakery LLC (◜◝·)    │        │
│ Your client approves                 │      │ ① … ② … ③ … ④ [Approve for      │        │
│ the proof. Then CoFile               │      │                 filing]         │        │
│ files it.                            │      └─────────────────────────────────┘        │
│                                      │  behind it at 12%: 13 panes in a fanned deck    │
│ CoFile fills in your clients' LLC    │                                                 │
│ and corporation formations, EINs …   │  Sample proof · test details · not a real       │
│                                      │  business                               [❚❚]   │
│ [Run a free rehearsal] [See what your client sees]                                     │
│ In beta. A rehearsal fills in every screen of the state's real website and stops      │
│ before the last button, so nothing is filed and nothing is paid. You'll set up your   │
│ firm's filing desk first.                                                              │
└────────────────────────────────────────────────────────────────────────────────────────┘
```

**Hero, phone:**

```
┌─────────────────────────────┐
│ (◜◝·) Beta  CoFile is in    │ ← beta notice wraps to 3 lines
│ beta. Any filing can …      │
├─────────────────────────────┤
│ (◜◝·) CoFile                │ ← under 400 px, the buttons take
│ [Log in][Run a free rehearsal]│  their own 52 px row; the CTA
│                             │   label never truncates
├─────────────────────────────┤
│ How it works · For firms ·→ │ ← scrolling chip row
├──── Stage band ─────────────┤
│ FOR CPA, PAYROLL, …         │
│ Your client                 │ ← 40 px
│ approves the proof.         │
│ Then CoFile files it.       │
│ CoFile fills in your …      │
│ [   Run a free rehearsal   ]│ ← full width
│ [ See what your client sees]│
│ In beta. A rehearsal …      │
├──── Daylight ───────────────┤
│ ┌ sample proof (HTML) ────┐ │
│ │ Harbor & Pine CPA        │ │
│ │ …                        │ │
│ └──────────────────────────┘ │
│ Sample proof · test details …│
└─────────────────────────────┘
```

On phones the bar's CTA never truncates: under 400 px, "Log in" and "Run a free rehearsal" move into a second 52 px row under the lockup. The H1 is `display-xl` in `--text` on Stage (16.6:1) and is painted first; the proof assembles 400 ms later (moment 1).

**Sections 2 to 13** (the Stage viewport column describes the pinned scene at `lg`; below `lg`, the same content plays in the section's inline card):

| # | Locked heading | Copy column | Stage viewport |
|---|---|---|---|
| 2 | "You start it. Your client approves it. CoFile files it." | The lede, then the three steps as a vertical list, bold lead-ins ("You start it.", "Your client approves it.", "CoFile files it.") in `title`, paragraphs in `body`; a 2 px Trace line joins the three like a run strip | The camera dollies across three stations: a short form, the proof, the pane deck. The station whose step is centered in the copy column is lit; the others dim to 30% |
| 3 | "Your client sees what the state will see, before the state does." | The printer's-proof lede, then the six checks, each with a Closed glyph replacing today's tick | The proof sheet returns. As each check scrolls past, its part of the sheet lights: names (①), fees (②), the state's page (③), the statements, the one button (④). The 8879 line gets no visual: it speaks to CPAs on its own |
| 4 | "Your name on the door. Ours in small print." | The lede, four checks | Moment 6, the firm swap |
| 5 | "Clients don't fill in forms. They text you." | The lede | Moment 2. Ana's bubble ("Need an LLC for the bakery. It's me and my sister, 50/50, in Jersey City." · "Ana Ortiz · text message · example") flies into a draft that ends Waiting |
| 6 | "Checked twice. Filed once." | The lede, five checks; the stop variant (moment 7) attached to the first; "see Security" links to `#security` | Moment 4, the fee lock |
| 7 | "The papers come back to you." | The lede, three checks | The panes recede; three blank sheets (7.1) slide forward, labeled with the locked list's words, and file themselves into one record card: what was approved, what was filed, what the state sent back. No mock certificate or EIN letter ever appears |
| 8 | "Rehearse on the real stage." | Both ledes ("… with no audience …", "Try one on a filing you know by heart …") | **The Run** (storyboard below) |
| 9 | "New York, New Jersey, Florida and the IRS." | Full width, Daylight: the lede, the board and table (9.11), footnote, mail link | The viewport unpins and releases |
| 10 | "Every filing service has a catch. Here's ours." | Full width, Daylight: the lede, then the five points as large numbered rows (48 px mono numerals in `--text-3`, text at `lede` size, 32 px rhythm, hairlines between). No animation: honesty doesn't perform | none |
| 11 | "Security" | Five blocks in a 3 + 2 grid, each with a 20 px line icon (lock, vault, link, pen, partition) on the ring's 1.5 px stroke, headings in `title` | none |
| 12 | "Building a filing product? Put CoFile underneath it." | The lede, the list (the `"dryRun": true` item in mono, "Read the API docs" as a link), and the inquiry form in a Daylight card on the right (Name, Company, Work email, Phone (optional), States you file in, Filings per month, What you'd like to do (optional), "Send") | A slim Stage strip above the section plays the docs' event replay in miniature (event names scrolling as the Run plays), a bridge for developers |
| 13 | "Run one rehearsal. Then decide." | Centered: the lede, "Run a free rehearsal", "Questions first? hello@cofile.app" | A Stage band; the tagline "Approve the proof. Then it's filed." sits under the Held Ring at 96 px, drawn once (`t-draw`), still afterwards |

**The Run storyboard** (section 8; 300 vh pinned at `lg`, an inline 24 s player elsewhere). The log rows are the locked `LOG`; the caption is the locked "13 screens of New Jersey's own LLC form, some grouped here, filled in with test details. Nothing was filed."

```
 Frame  Timeline   Scene                                                              Log row lit
 F0     0–5%       Header "Rehearsal · New Jersey LLC formation" + "test details".
                   13 panes fanned in depth, caret parked at the proof.
 F1     5–18%      Pane "Business Name" comes forward. "TWO SISTERS BAKERY" flies      Business name · filled
                   glyph by glyph from the proof's value into the state's field.
 F2     18–26%     The scan band sweeps the state's name-check result. Closed glyph.   Name check · passed
 F3     26–40%     Designator, Data, Purpose, Main Business Address riffle past        (grouped, no row)
                   fast: the "some grouped here" in the caption.
 F4     40–52%     The two Registered Agent panes: agent fields ink in.                Registered agent · filled
 F5     52–64%     Members (Ana Ortiz, Lucia Ortiz), then Signatures.                  Members and signatures · filled
 F6     64–76%     Review page slides over the proof's picture; registration locks.   Review page · matched the proof
 F7     76–88%     Payment screen. The fee lock.                                       Payment: $100.00 + $3.50 NJ portal fee · matches the proof
 F8     88–100%    Caret eases toward Pay Now, stops 28 px short; the Held Ring        Pay Now · held, on purpose
                   draws in amber and breathes.
```

```
 Layout at lg (pinned)                                     Phone (inline player, 4:5)
 ┌───────────────────────┬────────────────────────────┐   ┌──────────────────────────┐
 │ Rehearse on the real  │  ╱pane╱pane╱[ACTIVE PANE]   │   │ [ACTIVE PANE, flat]      │
 │ stage.                │        caret ▏•             │   │   caret ▏•               │
 │ CoFile is in beta …   │                             │   ├──────────────────────────┤
 │ ┌ Rehearsal · New Jersey LLC formation  test details │   │ ● Business name   filled │
 │ │ ● Business name             filled               │   │ ● Name check      passed │
 │ │ ● Name check                passed               │   │ ◌ Registered agent       │
 │ │ ◌ Registered agent          …                    │   │ …                        │
 │ │ (◜◝·) Pay Now     held, on purpose               │   │ 13 screens of New …      │
 │ └──────────────────────┘                            │   │                [❚❚] [↺]  │
 │ 13 screens of New Jersey's own LLC form, …          │   └──────────────────────────┘
 └───────────────────────┴────────────────────────────┘
```

**Honesty rules for the Run:** built only from a real rehearsal recording; the header always carries "test details"; nothing in it says or implies "filed"; its last frame is the hold; it never loops back to F0 on its own (a looping run would read as many filings); and if the recording's form snapshot no longer matches the adapter's approved snapshot, the page falls back to tier 1 with that recording's stills and the text log (13.3).

### 10.2 Sign-up, login and account pages (intensity 2)

All share a **split layout** at `md`+: a Daylight form column (max 440 px) on the left, a narrow Stage panel on the right with the Held Ring and the page's own supporting line. On phones the Stage panel becomes a 72 px band above the form.

| Route | Locked heading | Layout notes |
|---|---|---|
| `/signup` | "Set up your firm's filing desk" | The lede ("For firms that file for their clients. …"). Paired fields: Firm name / Kind of firm; Your name / Work email; Password / Password again (with "At least 12 characters. A short sentence works well."); Phone (optional) / Website (optional). "States you file in" as three large toggle chips; "Filings per month"; the terms checkbox; "Create account"; the approval-dependent note and "Log in" link; "Building a filing product? …" at the bottom. The Stage panel mirrors "Firm name" live into a mock brand bar as it's typed: the first taste of "your name on the door" |
| `/signup/sent` | "Check your email" | One column; the Held Ring draws once; the locked lines; "send the link again" as a quiet button |
| `/login` | "Welcome back" | "Firms go to their filing desk, platforms to their dashboard." Email, password, "Log in"; a divider; "Continue with Google"; then "New here? Set up your firm's filing desk" and "log in with an API key". Errors and statuses (all locked, such as "Your session ended. Log in again to carry on.", "No account uses that Google email. …") appear as notices above the form, in stop or info style |
| `/forgot-password` | "Reset your password" | One field, "Email me a reset link", "Back to log in" |
| `/reset-password` | "Choose a new password" | Two fields, "Set new password"; the incomplete-link case as a stop notice with "ask for a new one" |
| `/verify-email` | "Confirm your email" | "One click and your email is confirmed." One large "Confirm my email"; the resend form under a divider |
| `/invite-expired` | "This link has expired or isn't valid" | Waiting glyph, the locked line, nothing else |
| `/join/<token>` | (a redirect route) | Shows a 600 ms Running glyph only if the redirect is slow; no copy of its own |
| `/dashboard/login` | "CoFile dashboard" | "Log in with one of your API keys …"; a single mono key field |

### 10.3 Legal, 404 and errors

- **`/terms`, `/privacy`:** a Daylight reading layout, 68-character measure, 17/28 body, a sticky contents list at `lg` built from the headings, numbered sections with mono numerals, version and date at the top in `caption`. No Stage, no motion. Print stylesheet included.
- **404** ("Page not found" / "The link may be old or mistyped." / "Go to the home page"): a small Stage band with a single empty ghost-browser pane and the Stopped glyph.
- **Error** ("Something went wrong" / "This page couldn't load just now. It's usually a short hiccup on our side." / "Log in again"): the same with the Waiting glyph.
- On firm and client routes, both pages use the firm skin with no Stage and no CoFile marketing.

### 10.4 Partner filing desk `/p/<slug>` (intensity 3)

The desk is the firm's room with CoFile's furniture: the firm's logo, name, colors and font in the rail and the brand bar; CoFile's grid, components and status language everywhere else. No WebGL. The only live motion is real data arriving.

**Filing detail, desktop:**

```
┌ rail ─────────┬───────────────────────────────────────────────────────────────┐
│ [logo]        │ ← Filings                                                      │
│ Harbor & Pine │ Two Sisters Bakery LLC  (◔ Filing now) (◜◝· Rehearsal)         │
│ with CoFile   │ New Jersey LLC formation · started 11/26/2026, 10:14 AM by ana@…│
│               │                                                                │
│ Filings       │ ● Received ── ● Waiting for approval ── ● Approved ── ◔ Filing now ── (◜◝·) │
│ New filing    │ 10:14          10:15                    10:41          10:42          │
│ Ready to pay ②│                                                                │
│ Client links  │ ┌ Progress on the state site ──────────────────────────────┐  │
│ Signatures    │ │ ▮▮▮▮▮▮▮▮▯▯▯▯▯  Members · 10:44:12                         │  │
│ Setup         │ │ ┌ Live run view (phase 3) ─────────────┐  Business Name ✓ │  │
│ Billing       │ │ │ njportal.com/DOR/BusinessFormation/… │  Designator    ✓ │  │
│               │ │ │ [ latest captured screen, 16:10 ]    │  …               │  │
│               │ │ └──────────────────────────────────────┘  Members      ◔ │  │
│ ana@harbor…   │ └───────────────────────────────────────────────────────────┘  │
│ [Log out]     │ ┌ Link to the proof ┐ ┌ Documents ┐                              │
│               │ │ We emailed this…  │ │ (empty)   │                              │
└───────────────┴───────────────────────────────────────────────────────────────┘
```

| Page | Layout and behavior |
|---|---|
| **Filings** (home) | H1 "Filings" with "New filing" (forward) at the right. Notices stack in priority order: subscription ("Real filings need an active subscription; rehearsals are free. Subscribe"), Ready to pay ("… ready to pay and need your card's security code. Pay and file"), then the needs-action count. Table: Filing / Type / Status / Started, with a Held **Rehearsal** chip beside rehearsal names (replacing today's "Test", Appendix B). A row with an active run shows a 64 px mini run strip under its status chip. Empty state per 9.9 |
| **Setup** | "Set up your account" (or "You're set up"): a vertical checklist of three 64 px rows ("Your firm", "Branding", "Payment"), each with a glyph (Planned, then Closed when done); then Registered agents and "Start a filing". Each step page carries "Step 2 of 3" above its H1 as a three-segment bar plus the locked text |
| **Setup: Branding** | See the wireframe below. Form on the left ("Your web address", "Name your clients see", Logo, "Main color", "Second color", Font, "Support email shown to clients", "Save and continue"); on the right, a **live preview of the real proof and intake components** in the firm's skin, phone-sized, with a light/dark toggle and the theming report (11.7). The preview updates in `t-micro` as values change; nothing else moves |
| **Setup: details, agents, payments** | One-column forms. Agents: one card per state the firm files in, with "Ours: Registered Agents, Inc., through CoFile ($59 a year per business, billed to your firm)" as a radio option where offered. Payments: saved cards with brand and last four in mono; the Basis Theory card element styled to the 48 px field spec |
| **New filing, step 1** | "New filing" / "Which state is the business in?" and the locked note linking "What we file". Three 160 px state cards (New York, New Jersey, Florida), each with its count line ("2 filing types, plus the federal EIN"). The "Or send us the details and we fill in the form for you to check:" list beneath, with the firm's own intake address and numbers in mono |
| **New filing, step 2** | "{State}: what are you filing?" and its lede. Filing-type cards with a **Live** (Closed, go) or **Rehearsal** (Held, hold) chip at the top-left, the summary and the fee note. "Your pages for clients" card below: each permanent URL and widget snippet in a mono code block with a copy button |
| **New filing, the form** | One column, max 720 px: fieldsets, folds, "Same as" chips, the Authorizations fieldset (9.2). A **summary bar** (sticky bottom on phones and tablets, a sticky right column at `lg`) holds the fee note and "Send the proof to my client". The hold band heads the form when the type isn't live |
| **Filing detail** | As wireframed: title, status chip, Rehearsal chip, meta line; the timeline (9.5); the next-step notice; **Progress on the state site**, promoted from a closed `details` to an open panel with the run strip and step list (screen name and time per step); **Live run view** (phase 3): while a run is active, a 16:10 panel shows the latest captured screen, masked as recorded screens already are, updated per `filing.step`, with screen name and time. It moves only when the real engine moves. Then "Link to the proof" (the link in a secret code block with copy, and the locked emailed-to line), the signer note, Documents, the EIN in 20 px mono, "Save to Google Docs" with its locked note, and the missing-information form when needed |
| **Client links** | "Send a client a link": the form on the left; "Links you sent" as a table with chips ("Used: open the filing" as the row link) |
| **From email / text** | "Request by {email, text, …}": the original message in the same bubble component as the home page (now with real content), beside "This looks like a request for: …" with each extracted value in mono, linked to its field, and "Open the filled-in form" (forward). The 30-day deletion line as an info notice |
| **Signatures** | "Saved signatures" with its locked explanation; one card per signature (the image on white, signer's name, the forms it applies to); "No saved signatures yet." empty state; "Add a signature" opens the pad and consent |
| **Ready to pay** | Intensity 1. "Ready to pay" and its locked paragraph. One card per saved card (label and "ending 4242" in mono) listing the approved filings waiting, each with its state total in mono; one security-code field; "Pay and file". After entry: a go notice. Nothing animates, nothing auto-advances |
| **Billing** | The plan card with the price from Stripe (prices appear only here, never on public pages); registered-agent renewals (business, state, renewal date in mono); the plan-change and load-error notices as written |
| **Password, signed out** | One-column Paper layouts. "You're not signed in to this filing desk" in the firm skin when the slug resolves, neutral otherwise |

**Setup: Branding, desktop:**

```
┌───────────────────────────────────────┬──────────────────────────────────┐
│ Step 2 of 3  ▰▰▱                      │  Preview of a client's page      │
│ Branding                              │  [Light] [Dark]                  │
│ Your clients see your name, logo and  │  ┌────────────────────────────┐  │
│ colors on the pages where they fill   │  │ [logo] Best Accounting  with│  │
│ in and approve filings.               │  │                      CoFile│  │
│ Your web address  cofile.app/[best…]  │  │ New Jersey LLC formation   │  │
│ Name your clients see [Best Account…] │  │ Business name              │  │
│ Logo [Choose file]  Use a link instead│  │ TWO SISTERS BAKERY LLC     │  │
│ Main color [■][#e91e63] ■■■■■■■■■     │  │ Total            $103.50   │  │
│ Second color [■][#19a7ce] ■■■■■■■■■   │  │ [Approve, and authorize    │  │
│ Font [Atkinson Hyperlegible ▾]        │  │  submission and payment]   │  │
│ Support email shown to clients […]    │  └────────────────────────────┘  │
│ [Save and continue]                   │  (◜◝·) button shade adjusted     │
│                                       │  (●) links darkened for reading  │
└───────────────────────────────────────┴──────────────────────────────────┘
```

(The two report lines are placeholders for copy the copy owner writes; Appendix B.)

### 10.5 Permanent branded service pages `/<firm>/<service>`

A firm's public page for one filing (for example `cofile.app/bestaccounting/llc-filing-new-york`). Firm skin, intensity 2, no CoFile marketing. A 120 px firm header band (logo, name, the filing type as H1); the hold band when the type isn't live ("This page is in rehearsal for now. You can fill it in and see your proof, but nothing will be filed with the state and nothing will be charged, now or later, even after you approve it. To file for real, contact {firm}."); the form (as 10.4); the locked "After you send this, we'll email you a link to check and approve exactly what will be filed, with a picture of the state's own review page where possible. Nothing is filed or paid until it's approved." above the send button (the IRS variant on EIN pages); the Terms and Privacy line; the firm's support email; "with CoFile" in the brand bar. The neutral beta notice at the top.

### 10.6 Client-facing pages (firm skin; intensity 2, then 1)

**Intake `/i/<token>`.** The firm's brand bar; the hold band when needed; H1 = filing type, with the link's label in `--text-2`; the summary line and "After you send this, you'll get a link to check exactly what will be filed, and nothing is filed until it's approved."; the form, submitting with "Send to {firm}"; the footnote "Next, you'll get a proof to check. Nothing is filed until it's approved."; the Terms line; "Questions? Email …". On phones: one field per row, 56 px fields, the right keyboard per field type, and the client version of the Authorizations help ("The state form asks for these. Check a box only if the statement is true for you; …"). The link errors ("This link has expired or isn't valid" / "Ask whoever sent it for a new one.", "This link can't be used", "This filing is no longer offered") are single-message pages in the firm skin with a 32 px Waiting or Stopped glyph and the firm's contact.

**The proof** (rendered by the engine at api.cofile.app; intensity 1). Phone:

```
┌─────────────────────────────────┐
│▓ (◜◝·) Rehearsal: nothing will  │ ← sticky hold band, rehearsals only
│▓ be filed or paid, even if you  │
│▓ approve.                       │
├─────────────────────────────────┤
│ [logo] Harbor & Pine CPA        │ ← brand bar; "with CoFile" in the
├─────────────────────────────────┤   footer under 400 px
│ ①  ②  ③  ④                      │ ← section rail, sticky under the band
│ Two Sisters Bakery LLC          │ ← H1: the engine's filing title
│ Filing reference …. Please      │
│ decide by December 3, 2026,     │
│ 5:00 PM Eastern. After that,    │
│ this link stops working and     │
│ you'll need a new one.          │
│ ┌─────────────────────────────┐ │
│ │ By approving, you confirm   │ │ ← consent note, surface-2, 18/28;
│ │ every detail below is       │ │   stays first because its words
│ │ correct and authorize its   │ │   say "below"
│ │ submission exactly as shown,│ │
│ │ and payment of the fees …   │ │
│ │ Government sites don't save │ │
│ │ drafts, so once you approve,│ │
│ │ the whole filing is sent in │ │
│ │ one go. Please check        │ │
│ │ everything now.             │ │
│ └─────────────────────────────┘ │
│ ① Filing details                │
│ Business name                   │
│ TWO SISTERS BAKERY LLC          │ ← mono 17/26, never truncated
│ Members 1 › Name                │
│ Ana Ortiz                       │
│ …                               │
│ ② State fees                    │
│ Nothing is charged on this page.│
│ These fees are paid to the state│
│ when the filing is submitted.   │
│ Formation filing fee    $100.00 │
│ NJ portal fee, by card    $3.50 │
│ Total                   $103.50 │ ← 22 px mono 600
│ ③ The state's review page       │
│ This is a picture of the state's│
│ own review page, filled in …    │
│ [ picture, full width; tap to   │
│   open full screen, pinch zoom ]│
│ ④                               │
│ One-time code sent to you [   ] │ ← only when required
│ What should change? (Needed     │
│ only if you ask for changes)    │
│ [                             ] │
│ [ Approve, and authorize       ]│ ← forward, 56 px, two lines
│ [ submission and payment       ]│
│                                 │
│ [ Request changes ]             │ ← secondary, 24 px below
│ Questions: help@harborpine…     │
│ with CoFile                     │
└─────────────────────────────────┘
```

- **Order.** I reorder the proof to match the home page's sample: details ①, fees ②, the state's page ③, decide ④. "See what your client sees" becomes literally true, and phones lead with readable text rather than a tiny desktop screenshot. The consent note stays above the details because its own words say "every detail below".
- **Section rail.** Four numbered dots in a 40 px sticky row; each turns Closed as its section scrolls fully past. Tapping one jumps to it. It's orientation, never a gate: the buttons are never disabled by scrolling.
- **Details.** The engine's label paths ("Members 1 › Name") render as grouped sub-tables: a group heading ("Members 1") and plain labels beneath, so the "›" path never shows on a phone. Masked SSNs (`***-**-1234`) in mono with the locked SSN line above the table.
- **Fees.** Mono, tabular, right-aligned; the total row 22 px with a 1.5 px rule above; "Maximum you authorize" as its own row with its parenthetical.
- **The state's page.** Full width, on a white plate in both modes, with the locked alt text. Tapping opens a full-screen viewer (pinch to zoom, a 44 px close control, focus trapped and returned).
- **Decide.** The approve button is the only element in the firm's forward color on the page. "Request changes" is secondary and sits 24 px below, never side by side on phones, so a thumb can't hit the wrong one. The comment field sits above both and is optional, as its label says.
- **Pressing approve:** the label switches to a pending state with the Running glyph (static at reduced motion), then the engine's decision page replaces the proof in the same skin. No confetti, no burst: the decision page's own heading and paragraphs say what happened.
- **Approval errors and expired links:** same skin, a 32 px Stopped or Waiting glyph, the engine's message at `body` size, the firm's support email as a large link.
- **Desktop:** the same single 680 px column; the section rail moves to a sticky left margin.

### 10.7 Enterprise dashboard `/dashboard` (intensity 3)

CoFile skin by default; tenant branding where the tenant has set it. Dense, calm, live.

```
┌ rail ───────┬────────────────────────────────────────────────────────────────┐
│ (◜◝·) CoFile│ {account name}                                                  │
│ Overview    │ ⚠ 2 approved filings are ready to pay and need a card's         │
│ Filings     │   security code. Pay and file                                   │
│ Ready to pay│ ┌ Filings ─────┐ ┌ Webhook deliveries ┐ ┌ API keys ┐            │
│ Firms       │ │ 1,284        │ │ 9,931              │ │ 3        │            │
│ API keys    │ │ 412 live, 872│ │ 4 pending, 1 failed│ │ Manage   │            │
│ Webhooks    │ │ rehearsals   │ └────────────────────┘ └──────────┘            │
│ Setup       │ └──────────────┘                                                │
│ Team        │ Running now (live run board, proposed)                          │
│ Billing     │ Two Sisters Bakery LLC   NJ  ▮▮▮▮▮▮▮▯▯▯▯▯▯  Members     10:44  │
│ Docs        │ {filing title}           FL  ▮▮▮▯▯▯▯▯▯▯     {screen}    10:43  │
│             │ By status         By state          By month                    │
│             │ ● Completed ███   NJ ████           Jun ██                       │
│             │ (◜◝·) … ██        FL ██             …                            │
│             │ As of …                                                          │
└─────────────┴────────────────────────────────────────────────────────────────┘
```

(The numbers are placeholders for layout only; the real page shows the account's own data and never sample figures.)

| Page | Layout |
|---|---|
| **Overview** | H1 = account name; notices (subscription, Ready to pay, setup); three stat cards ("Filings" with "{n} live, {n} rehearsals"; "Webhook deliveries" with pending and failed; "API keys" with "Manage keys"); the **live run board** (proposed): every running filing as a row with its run strip ticking from `filing.step` over server-sent events, so an enterprise watches its fleet work; the three bar charts ("By status", "By state", "By month") with direct labels; "As of …" |
| **API keys** | Table (name, `cofile_` prefix plus 8 characters in mono, created, last used); a "new key" flow that shows the secret once in a dashed secret block with copy; the locked note about keys set up by us |
| **Webhooks** | Endpoints table; a **live delivery tail**: the last 50 deliveries streaming in (event name in mono, HTTP status chip, latency in ms), filterable by event, with a test-delivery action |
| **Filings** | The desk's table plus firm and state columns, filters as chips |
| **Firms / firm detail** | "Firms" with its locked lede; detail with "Filing desk" (a preview of the firm's skin, as in Branding) and "Invite staff" |
| **Setup** | "Payment methods", "State portal logins" (one card per portal: NY DOS, NYS-100, NJ, IRS, FL, each with a connected glyph and the locked "sealed (encrypted) as soon as it arrives …" line), "Who's named on your filings", "Defaults per portal" |
| **Ready to pay, Billing, Team, Password** | As on the desk |

### 10.8 Platform tenant (internal staff)

- **Sign-ups:** "Waiting for approval", "Decided" and "Enterprise requests" as three tabs with counts; each request a card with its answers and approve/decline actions; the locked note on 7-day links.
- **Drift review** (internal; proposed layout): when a state changes a form, a full-width comparison of the approved snapshot and the changed screen: an **onion-skin slider**, a **difference overlay** (a canvas pixel diff with changed regions outlined in `--stop`), the changed fields listed, and the filings it paused ("Paused: state site changed"). It's the same pane renderer as the home page, pointed at evidence.

### 10.9 White-label surfaces

- **`/e/<tenant>/<firm>/<service>`:** the tenant's skin only. No CoFile wordmark, no "with CoFile", no Trace Blue anywhere. The neutral beta notice. Structure as 10.5.
- **`/embed/…` with `embed.js`:** the form only: no brand bar, no beta notice, an optional transparent background. `embed.js` keeps sizing the iframe to its content and accepts `data-theme="light|dark|auto"` and `data-accent` (still passed through 11.3). The iframe carries a title from the filing type; tab order stays natural and nothing traps focus.

### 10.10 Developer docs and machine-readable files

- **Layout:** three columns at `lg`: navigation (232 px, with the guide titles and "API reference"), content (max 720 px), and a sticky Stage-colored code column with request and response samples. Under `lg`, code blocks sit inline.
- **Docs home:** H1 "CoFile API" and its locked lede (with the "Not every filing type is live yet; see Coverage." link); "Quick start" as a numbered four-step rail; the curl sample; the "For your tools and AI agents" line with `/docs.md`, `/openapi.json` and `/llms.txt` as three mono chips with copy and download; "Base URL: https://api.cofile.app"; the guide cards.
- **Event replay** (in "Filings and the lifecycle" and "Webhooks"): the same NJ LLC rehearsal recording, played as a vertical stream of the real event names (`filing.validated`, `filing.previewing`, `filing.awaiting_approval`, `filing.approved`, `filing.started`, `filing.step` × 13, …), each expandable to its JSON body with test details, ending at the rehearsal's stop before submit; synced to a small pane thumbnail. Intensity 3; tier 1 shows the list statically.
- **Reference** (25 endpoints): method chips (GET, POST, PUT, DELETE) in neutral fills with mono labels, never status colors; the path in 17 px mono; parameter tables; samples in the code column. "dry run (rehearsal)" glossed as the docs do.
- **`/openapi.json`, `/llms.txt`, `/docs.md`:** plain files with correct content types and no chrome: they're for machines, and that's their design.

### 10.11 Emails (Resend)

One template system, two skins. **Firm skin** for everything a client or firm receives about a filing: the firm's logo, name and a 4 px stripe in the firm's color; the firm's support address; "with CoFile" at 11 px in the footer (absent for tenants). **CoFile skin** for account email.

- 600 px max, one column, 17/26 body in the email-safe system stack, mono only for values and amounts, one bulletproof 52 px button in the firm's derived forward color.
- Rehearsals: the locked line "Rehearsal: nothing will be filed or paid, even if you approve." as a hold-tinted row with the Held glyph (PNG for clients that block SVG) above the body.
- Dark mode: `color-scheme: light dark`, both palettes in a `prefers-color-scheme` block, logos on a light plate when they'd vanish. Every email is understandable with images off.

| Email | Locked subject | Button (locked label) | Skin |
|---|---|---|---|
| Approval request | "Your proof is ready to approve: {filing}" | "Open your proof" | Firm |
| Security code needed | "Card security code needed: {filing}" | "Enter security code" (to Ready to pay) | Firm, to the card's owner |
| Missing information | "More information needed: {filing}" | none (body tells them whom to send it to) | Firm |
| Changes requested | "Changes requested: {filing}" | none | Firm |
| Completed (documents back) | "Completed: {filing}" | none | Firm |
| Rejected | "Rejected by the state: {filing}" | none | Firm |
| Choose a name | "Choose a name: {filing}" | "Choose a name" | Firm, to staff |
| Review before submit | "Review before submit: {filing}" | "Review the filing" (with the captured screen) | Firm, to staff |
| Site changed | "Site changed — review needed: {filing}" | none | Firm, to staff |
| Sign-up and verification | "Confirm your email for CoFile", "Your partner account is open", "Your CoFile account is ready" | as written | CoFile |
| Password reset | "Reset your password" | as written | CoFile |
| Invitations | "You're invited to {firm}'s filing portal" | as written | Firm |
| Filing submitted, EIN issued | no copy exists yet | | Firm (Appendix B) |

### 10.12 New surfaces I propose

1. **A full-screen rehearsal page per showcased type** (for example `/rehearsals/nj-llc`): the Run in theater mode with all 13 screens, each step's time, the event stream and the locked caption. Shareable, so a partner at a firm can send it to a colleague. Linked from the Run's caption. Needs a title (Appendix B).
2. **Live run view** on the filing detail (10.4) and the **live run board** on the dashboard (10.7).
3. **Per-row anchors on coverage** (`/#coverage-nj-reg`), so support can link one filing type directly.

---

## 11. The white-label theming system

Thousands of firms will pick colors I'll never see. So the system doesn't trust its inputs: it derives a safe theme from them every time, and tells the firm what it changed.

### 11.1 What a firm controls

Name clients see, logo (upload or link), main color, second color, font (a preset or an uploaded file up to 600 KB), support email shown to clients, and its web address (slug). Enterprise tenants also control the name and support contact on the proof and every firm page they host, and "with CoFile" never appears on their pages.

### 11.2 What a firm never controls

Status colors and glyphs; the rehearsal band and the beta notice; the consent block; the proof's structure and order; the mono face for verbatim values and fees; minimum type sizes and line heights; focus visibility; target sizes; and the "with CoFile" line on partner pages.

### 11.3 The derivation

Runs at save time (so the firm sees the result) and again at render time (so old settings get new rules), in OKLCH, gamut-clipped to sRGB.

| Derived token | Rule | Examples (contrast measured) |
|---|---|---|
| `firm-fill` and `firm-on-fill` (the forward button) | Keep the chosen color if white or `#111111` text reaches 4.5:1 on it, preferring white when both do. If neither does, lower OKLCH lightness in 0.005 steps (chroma held, then reduced only if out of gamut) until white reaches 4.5:1 | `#1F4FD1`: kept, white text (6.8:1). `#F4B400`: kept, `#111111` text (10.2:1). `#19A7CE`: kept, `#111111` text (6.7:1). `#E91E63`: white 4.35, dark 4.34, neither passes → `#E41B60` with white |
| `firm-fill-edge` | If `firm-fill` is under 3:1 against the page, add a 1.5 px border at the fill's lightness −0.25, so the button's shape is visible | `#F4B400` on white (1.85:1) → border `#9C6D00` |
| `firm-ink` (links, focus rings, selected states, "Same as" chips) | The second color, darkened until it reaches 4.5:1 on `--surface` (light), or lightened to 4.5:1 on the dark surface | `#19A7CE` → `#0081A2` on white; `#7ED957` → `#438523` |
| `firm-soft` | `firm-ink` at OKLCH lightness 0.96 (light) or 0.24 (dark), chroma × 0.35 | Row hover, selected chips, the Branding preview's backdrop |
| `firm-stripe` | The second color exactly as chosen (decorative only, never text) | The 3 px stripe on the brand bar and emails |
| Dark variants | `firm-fill` lightened until it reaches 3:1 against `#0B0E13`, then the text choice re-run; `firm-ink` lightened to 4.5:1 on `#131821` | A navy `#1F4FD1` lightens to a mid blue with dark text |

The firm's exact colors are never discarded: the stripe and the logo keep them. Only text-bearing and interactive uses are adjusted, by the smallest step that passes.

### 11.4 Status protection

If the firm's main color sits within 25° of the stop hue (OKLCH hue 15–40°) with chroma above 0.10, the theme is flagged **stop-adjacent**: the approve button gains a leading Closed glyph, and stop chips switch to their high-emphasis form (solid `--stop`, white text). Amber-adjacent firms (hue 55–85°) get the same treatment for hold and waiting chips, and the rehearsal band gains a 2 px `--hold` border. Green firms need nothing: green already means forward. Glyph shapes (3.2) make every status legible without hue in any case.

### 11.5 Logos

On upload: trim transparent padding; detect an opaque background; measure contrast against the light and dark surfaces. If the logo falls under 3:1 on either, it sits on a **logo plate** (`#FFFFFF`, 8 px padding, radius 6) in that mode. Display heights: 32 px in the desk rail, 40 px on the proof and intake, 36 px in emails; width capped at 180 px (wide wordmarks scale down to fit, never crop). Firms without a logo get their name set in their chosen font at 20 px 600.

### 11.6 Fonts

An uploaded or preset font is checked for the Spanish set (`á é í ó ú ü ñ ¿ ¡`, capitals included), digits and a readable x-height (≥ 0.46 em). If anything is missing, the firm's font sets headings and the brand bar only, and body text falls back to Atkinson Hyperlegible Next. `font-size-adjust: 0.52` normalizes x-heights so a firm's condensed display face never shrinks the proof's body. Script, blackletter and ultra-condensed faces are allowed for the brand bar name only. The firm's font never sets values, fees or codes.

### 11.7 The report the firm sees

Under the Branding preview, a short list of rows, one per adjustment (the button shade, link darkening, a logo plate in dark mode, a font fallback for missing Spanish letters), each with a before/after swatch. The sentences are new copy (Appendix B). If nothing was changed, the list is empty and the preview speaks for itself.

### 11.8 Test corpus

The derivation ships with a visual test of 24 hostile palettes (neon yellow, white-on-white, two near-identical colors, pure red, a 50% gray, a transparent PNG logo in white) across the desk, intake, the proof and three emails, in light and dark. Every screenshot must pass automated contrast checks before a release.

---

## 12. Accessibility, Spanish and dark mode

### 12.1 Accessibility

- **Standard:** WCAG 2.2 AA everywhere; AAA contrast (7:1) for body text on the proof and client pages.
- **Targets:** 44 × 44 px minimum; 56 px for the approve button on phones; at least 8 px between adjacent targets on client pages.
- **Focus:** always visible (3 px, 2 px offset), never removed; a skip link to the main content on every page; focus returns to the trigger when a viewer or fold closes.
- **Screen readers:** every Stage canvas is `aria-hidden`; its information is in the adjacent HTML (the sample proof, the log list, the fee table). The log uses an ordered list with each result as text. The proof's state-page picture keeps its locked alt text. The run strip announces politely, throttled, and can be muted. Chips are text, so they read naturally; glyphs are decorative.
- **Headings and landmarks:** one H1 per page, sections in order, `nav`, `main` and `footer` landmarks; tables use real `th` with scope; form errors are linked with `aria-describedby` and summarized at the top.
- **Zoom:** pages reflow at 400% with no horizontal scroll except data tables, which turn into cards.
- **Older readers:** 17–18 px base sizes; no light-gray body text; no text over imagery; no auto-advancing content except the Run (which pauses, never loops and never runs under reduced motion); no time limits we impose ourselves (the proof's deadline and the security code's hour are product rules, stated in words).
- **Motion:** `prefers-reduced-motion` is tier 1 (8.6) on every surface. `prefers-contrast: more` thickens borders to 2 px, removes soft fills behind text, and turns the registration flash off.
- **Audits:** the commissioned audit before each phase, including VoiceOver on iOS for the proof and intake, TalkBack on Android, NVDA on Windows for the desk and dashboard, and a screen-magnifier pass for the proof at 200%.

### 12.2 Spanish

- **Order of work:** client surfaces first (intake, the proof, decision pages, client emails), then firm pages (service pages, the beta notice), then the marketing site.
- **Translation:** a professional translation of the locked English, never machine translation at runtime. The consent, authorization, declaration and no-refund texts go through counsel before use, with their own consent version recorded as the English does.
- **Choosing the language:** from the client link (a firm can set it per link), else the browser's preference, with a switch in the brand bar (labels in Appendix B). `lang` is set on the page so screen readers switch voices.
- **Layout:** every component tolerates +35% length: buttons wrap to two lines, chips wrap, nothing truncates, and the approve button's Spanish label has been tested at 320 px. Hyphenation is off in legal text, on in long body paragraphs.
- **Verbatim stays verbatim:** `TWO SISTERS BAKERY LLC`, addresses and the state's own field names on its review page stay exactly as the state shows them; a short Spanish note above the state's picture explains that it shows the state's own English page (copy owner to write).
- **Typography:** both launch text faces and the commissioned faces cover the full Spanish set, including `¿ ¡ ñ ü` at every weight; the firm-font check (11.6) protects the rest.

### 12.3 Dark mode

- Follows the system by default everywhere, with a manual light / dark / system switch on CoFile pages, remembered per browser.
- Stage tokens *are* the dark palette, so the public site's Stage windows look the same in both modes; in dark mode the Daylight bands become dark `--bg`, and band edges carry the separation (a 1 px `--line` rule).
- Fixed light islands in dark mode: the signature pad, the state's review page picture, captured screens (on a white plate, never inverted) and logos that fail the contrast check.
- Firm themes run the dark derivation (11.3); a firm previews both modes on its Branding page, and the proof's dark mode is tested on OLED phones at 30% brightness.
- Emails carry both palettes; clients that force-invert colors get logos on plates and buttons with explicit text colors.

---

## 13. Production

### 13.1 Stack

- **Site:** the existing Next.js app. Tokens as CSS custom properties generated from one source: Tokens Studio in Figma → Style Dictionary → `tokens.css`, `tokens.ts` and the email inliner's JSON. The engine's proof renderer at api.cofile.app inlines the same generated CSS, so the proof and the home sample can't drift.
- **Scene:** three.js (WebGL2) with custom GLSL in an OffscreenCanvas worker; a pre-generated MSDF atlas for the mono face; KTX2/Basis textures through the Basis transcoder (WASM, loaded with the scene); a 6 KB loader for capability detection and tier choice. A lint rule keeps WebGL imports out of desk, client, proof and dashboard bundles.
- **Live data:** the desk's run strip and live run view, and the dashboard's run board and delivery tail, subscribe to server-sent events relayed from the engine's existing `filing.step` and webhook events. No polling faster than every 10 s as a fallback.
- **Theming:** an OKLCH derivation module (11.3) shared by the site, the engine's proof renderer and the email renderer, unit-tested against 2,000 random colors plus every swatch in today's picker.
- **Emails:** React Email templates rendered to HTML and sent through Resend; tested across major clients, light and dark, with images on and off.
- **CI gates:** Lighthouse budgets (8.5) on `/`, a sample filing desk, a sample intake and a sample proof; axe on every route; visual regression for each skin (CoFile, three sample firms, one tenant) in light and dark at 375, 768 and 1280 px; a reduced-motion snapshot of the home page; the recording snapshot check (13.3).

### 13.2 Design-system files

| File | Contents |
|---|---|
| `CoFile Foundations` (Figma) | Tokens (Daylight, Stage, status, viz), type scales (5.3), grid, spacing, radii, elevation |
| `CoFile Mark` | The Held Ring master and small master, lockups, clear-space sheets, the icon family on 16 and 20 px grids, "with CoFile" |
| `CoFile Components` | Every component in section 9 in three skins, all states, light and dark |
| `CoFile Pages` | Every route in section 10 at 375, 768, 1280 and 1600 px, light and dark |
| `Glass Engine Storyboards` | Frames F0–F8, the seven moments with timing sheets, tier 1 filmstrip frames, tier 2 CSS fallbacks |
| `Theming Lab` | The derivation on 24 hostile palettes (11.8) |
| `Email Kit` | Both skins, every email in 10.11 |
| Code | `@cofile/tokens`, `@cofile/ui` (React components), `@cofile/glass` (the scene, isolated package), `@cofile/theme` (derivation) |

### 13.3 The run recording (the asset everything depends on)

A rehearsal of the NJ LLC formation with test details, exported by the engine as `nj-llc.run.json` plus textures:

- `steps[]`: screen key, screen name, URL, start and end time, and for each field its rectangle on the capture and the value typed (test details only).
- `captures[]`: one per screen, KTX2 at 2048 and 1024 px plus WebP stills for tier 1, with sensitive fields masked exactly as recorded screens already are.
- `fees`: what the proof showed and what the payment screen showed, as numbers and as rectangles on the capture.
- `snapshot`: the hash of the adapter's approved form snapshot it was recorded against, and the recording date.
- `events[]`: the webhook events the run emitted, with test-detail bodies, for the docs' event replay.

At build time, `snapshot` is checked against the adapter's current approved snapshot. If the state has changed its form since, the home page drops to tier 1 with that recording's stills and the text log, and staff get an alert to re-record. The site never plays a screen the state no longer shows. Recordings are made once by staff, never per visitor: no visitor's page load ever touches a state website.

### 13.4 Asset list

- Mark masters (SVG; PNG at 16, 32, 180 and 512 px; a maskable app icon); the favicon set from the small master.
- The icon family as an SVG sprite and as PUA glyphs in the commissioned fonts.
- Social cards (1200 × 630): the Held Ring and the page's locked headline on Stage, one per public page.
- Run recordings: NJ LLC (phase 2), FL LLC (phase 3), more as types are rehearsed.
- 6 blank-paper stills; MSDF atlases; a 64 × 64 blue-noise texture; email glyph PNGs at 1× and 2×.
- Three sample firm themes for previews, tests and the firm swap.

### 13.5 Phases

| Phase | Weeks | Ships |
|---|---|---|
| **1: Foundations and honesty** | 1–6 | Tokens, launch typefaces, the mark and icon family, status chips on every surface; the coverage board; the proof restyled and reordered; the theming derivation and Branding report; rehearsal bands; Spanish for client surfaces underway. Home page at tiers 0–1 (storyboard, no WebGL) |
| **2: The Run** | 7–14 | The Glass Engine scene (tiers 2–3) for the hero and the Run; the fee lock, registration and the hold; the recording pipeline and snapshot check; the desk's run strip and the open progress panel; the docs' event replay |
| **3: Live** | 15–22 | Live run view on the filing detail; the dashboard's run board and delivery tail; the full-screen rehearsal page; the firm swap and words-into-fields moments; blank-paper stills; optional sound; Spanish for firm pages |
| **4: Commissioned type** | In parallel, lands around month 8 | Trace Sans and Trace Mono replace the launch faces on CoFile surfaces |

---

## 14. Appendix

### 14.1 What I'd push back on in the current site

1. **It describes the engine instead of showing it.** The product records every screen of a real rehearsal, and the site reduces that to a seven-row table. The most persuasive asset CoFile has goes unused.
2. **The hold is buried.** "Pay Now: held, on purpose" is the single most trust-building line on the site, and it's set as a muted cell in a log. It should be the climax.
3. **Paper and ink says "stationery", not "careful machine".** Manila and a folder tab with a check make CoFile look like a forms vendor. The mark is fussy at 16 px and says nothing about what the product does.
4. **Green does two jobs.** It's both the marketing CTA and the "approved / live" status, so "Run a free rehearsal" and "Live" look related. I split them: Trace Blue for CoFile's CTAs, green only for filings moving forward.
5. **The sample proof isn't the real proof.** Different order (the real one leads with the state's page) and a different button label. "See what your client sees" should be literally true.
6. **Firm colors are only half fixed.** `textOn` flips between white and near-black text, but a mid-tone like `#E91E63` fails both, and nothing gives a pale button an edge.
7. **"Progress on the state site" is closed by default** on the filing detail and labeled "test run". The best live evidence in the desk is hidden.
8. **Coverage chips lean on color.** "Live" and "Rehearsed to the payment screen" differ mostly by hue; shape must carry it.
9. **The proof's details render the engine's key paths as one long table.** On a phone that's a wall of rows; grouping by person and address costs nothing and changes no words.

### 14.2 Copy notes (suggestions only; the design above uses the locked copy as it stands)

1. **Sample proof button.** The home page sample says "Approve for filing"; the real proof says "Approve, and authorize submission and payment". Suggest the sample uses the real label.
2. **"Test" and "test run" leftovers.** The desk's filings list shows a "Test" badge on rehearsals; the filing detail says "test run" / "filing run"; Signatures says "never on a preview or test run". Suggest "Rehearsal" throughout.
3. **"Sign in" leftovers.** "You're not signed in to this filing desk", the "Signed out" page title, the "Signing in…" pending label on login, Team's "People who sign in to this dashboard", and Password's "You signed in with an API key". Suggest the "log in" forms the locked terms ask for.
4. **Branding help.** "Button text is white, so choose a dark color." stops being true with 11.3. Suggest something like "Any color works; we adjust the shade if needed so button text stays readable."
5. **Dashboard setup notice.** "Ask the platform team to configure tenant …" uses internal words the copy review asked to avoid.
6. **Next-step text on the desk.** "Your filing company will offer alternatives" and "Your filing company has been told and will follow up" read oddly when the reader *is* the firm.
7. **"Every detail below."** The proof's consent pins itself above the details. If the layout ever moves it next to the button, the word must change with it.
8. **Missing email copy.** There's no body copy yet for "filing submitted" and "EIN issued" emails; "Completed" stands in for "documents back".
9. **New labels this design needs** (for the copy owner to write): the Stage window's pause, play and replay controls; the stop-variant control (or approval to use the sentence "If the two differ, it stops before paying and tells you why." as its accessible name) and its "this is an example" caption; the language switch; the light / dark / system switch; the Branding report rows (11.7); the full-screen rehearsal page's title and its link from the Run's caption; the live run view's heading; the live run board's heading ("Running now" in my wireframe is a placeholder); names for the two extra example firms in the firm swap; an optional "recorded on {date}" line under the Run; a Spanish note above the state's English review page.
10. **"Filing reference."** The proof shows the internal filing id; if firms quote it to clients, a shorter human reference would read better on a phone.
