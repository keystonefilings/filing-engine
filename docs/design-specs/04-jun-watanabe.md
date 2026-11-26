# CoFile: visual design spec

**Letterhead in Daylight**

Jun Watanabe, interaction designer, Tokyo. Spec 04 of 10. Written against BRIEF.md v3 (Nov 26, 2026) and the round 3 copy: `web/app/page.tsx`, the seven pages behind it (How it works, For firms, What we file, Pricing, Security, Questions, For platforms) and the picture stand-ins in `web/components/landing/Visuals.tsx`.

Every word quoted on these pages comes from the repo. Where a design needs a word that doesn't exist yet, I mark it `[copy needed]`. I have changed nothing in the copy, its order, its prices or its tone. Everything else, I have redrawn. The home page now has about 330 words, so the pictures carry it, and most of this spec is about those pictures.

---

## 1. Who I am, and what I bring

I trained as an industrial designer, so I think about the hand before the screen: how much a thing weighs, which way the light falls on it, what it does when you press it. I spent ten years on mobile banking apps for Japanese banks, where the customer is often sixty-five and the button moves money, so the interface has to be calm and kind. Then I designed the digital presence of a fine stationery house: letterheads, envelopes, cards, the small rituals of paper.

What I bring to CoFile:

- **Paper, as stationery rather than storage.** A firm's letterhead is something it is proud of. I want every page a client sees, and the proof the firm approves, to feel like that letterhead.
- **Light.** One consistent light source on the whole site, real shadows, real time of day. Light is how a screen feels calm without being empty.
- **Ma (間).** Meaningful empty space. The empty space on the page is where the firm's name goes.
- **Motion that has weight.** Paper lifts before it moves, settles when it lands, folds along a crease. Nothing bounces or flashes.
- **Mobile first, by conviction.** The client who fills in the firm's form is standing in a bakery at six in the morning with flour on her hands. The firm owner who approves the proof is often on her phone too, between two meetings. I design those screens first and the desktop second.

---

## 2. The visual concept: Letterhead in Daylight

### The one idea

**Your firm's own letterhead, lying on a calm desk in daylight. Every page your client sees is a sheet of it, and so is the proof you approve. CoFile is the paper underneath and one small line at the foot.**

Think of a sheet of good letterhead on a desk by a window in the morning. At the head is the firm's name and its color. The sheet itself is quiet, generous and well made. At the very foot, where a fine printer puts its imprint, is a small line: "with CoFile". That picture is the brand.

The firm's **filing desk** is then exactly what its name says: a real desk in that same light, where the firm's sheets come and go. The hero shows it. Every other picture on the home page is one sheet on that desk at a different hour of the day.

Each part of the picture answers part of the copy's story:

| The selling story (locked copy) | What the picture does |
|---|---|
| **Say yes, under your own name.** "Your client needs an LLC. Say yes, under your own name." | The hero is the firm's filing desk in the morning, its name at the head in its own color, its clients' filings lying on it as paper slips. The first thing a firm owner sees is their own kind of name, looking proud. |
| **Your brand on everything.** "Your name on the door. Ours in small type." | The head of every sheet is kept empty for the firm: its logo, a painted color edge, its font. CoFile's mark is literally a blank letterhead, a sheet whose head is left for you. "with CoFile" sits at the foot like a printer's imprint, in small type. |
| **Nobody retypes anything.** "Your client sends a text. Nobody retypes it." | The client's words lift out of the text bubble and settle onto the draft as typed values. No hands on a keyboard anywhere in the picture. Saved answers arrive in their own quiet ink. |
| **You stay in charge.** "Nothing is filed or paid until you approve the proof." | The proof is a printer's proof of the firm's own work, on fine paper, its letterhead at the top, every value typed, the fees totalled the way an accountant totals them, and one button. Firm owners have approved proofs of their business cards and letterhead before; this looks and feels like that. One press and the sheet folds in thirds like a letter and goes. |
| **It's done, and the papers come back.** "Then it's filed, and the papers come back to you." | The letter comes back as an envelope addressed to the firm, holding the state's document and the IRS letter, bound with a paper band (an obi) that carries the client's business name. |
| **The filings your clients already ask for.** New York, New Jersey, Florida and the IRS. | Four cards laid side by side on the desk, one per place, each listing its filings with a small sheet glyph that fills as a filing type gets closer to live. |
| **Try it free.** "In beta: rehearse a filing, free." "Run one rehearsal. Then decide." | Rehearsals have their own warm color, kaki (persimmon), the color of first light. The main button, "Run a free rehearsal", is the same color, so "try it" is always the warmest thing on the page. |
| **Simple prices.** "$45 a filing. EIN included with a formation." | A rate card, printed on thick cotton card stock the way a good stationer prints its prices: large, plain figures, nothing hidden in small type except our name. |
| **People behind it.** "Built and run by filing professionals. When a filing needs a person, one of them takes over." | The filing professionals are photographed at their own desks, in the same daylight, and appear small and warm wherever that line appears. |

### One working day

The light on the site follows one good working day. At the top of the home page it is early morning: low light from the left, cool shadows, a window frame softly crossing the desk. As you scroll, the light climbs to midday and then turns into late-afternoon gold from the right. By the close, "Run one rehearsal. Then decide.", the sun is low and warm on a blank sheet of letterhead waiting for your firm's name.

The home page reads in that light: your client's text arrives in the morning, you approve the proof before lunch, and the papers come back to your desk in the afternoon. Nobody is told this. It is felt, the way you feel the time of day in a room. The pages behind the home page each keep one hour: How it works and For firms are mid-morning, What we file and Pricing are midday, Security and Questions are a calm, even overcast light, For platforms is late afternoon.

### What the concept is not

It is not a filing cabinet, a folder, a seal, a stamp, a lock or a vault. I resisted the hanko, the Japanese approval seal, even though it is the most obvious thing for me to draw: a seal says "verified", and this brand is about "yours". On the home page, security is one quiet line and a link at the foot of the pricing section; the checks live on How it works and the details on the Security page. They are designed carefully, in a slightly smaller room. The light, the brand and the motion belong to the firm, its clients and the ease.

---

## 3. Identity

### 3.1 The mark: "the Sheet"

A portrait sheet of paper whose top third is solid ink: a letterhead with the head left for the firm. The top third is not arbitrary. When a business letter is folded in thirds (三つ折り, mitsuori, and the American business fold), the top panel is the one that carries the letterhead and shows through a window envelope. So the mark is at once a letterhead, a letter opened after folding, and three panels for the three steps.

**Construction, on a 48 × 48 unit grid (1 unit = 1 px at 48 px):**

```
        x: 10.5                         37.5
 y: 6.5  ╭─────────────────────────────╮
         │█████████████████████████████│   head: solid fill, y 6.5 → 18.17
         │█████████████████████████████│   (exactly one third of the height)
 18.17   │█████████████████████████████╰╮  crease step: 0.75 u, 45° chamfer
         │                              │  lower edge sits at x 38.25
         │                              │
 29.83   │  ┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄  │  second crease: 1 u hairline,
         │                              │  only at 64 px and larger
         │                              │
 41.5    ╰──────────────────────────────╯
```

- **Sheet outline**: x 10.5 → 37.5 (27 u wide), y 6.5 → 41.5 (35 u tall). That is US Letter, 8.5 × 11, to the nearest half unit, because this is a mark for American firms. Corner radius 2 u. Stroke 2.5 u, aligned inside.
- **Head**: solid fill from the top edge to y 18.17 (35 ÷ 3 = 11.67 u). Its two top corners follow the 2 u radius. Its lower edge is perfectly straight.
- **Crease step**: below the head, the right edge of the sheet steps out by 0.75 u through a 45° chamfer, so the lower two thirds sit at x 38.25. An opened tri-fold letter never lies quite flat, and this is the one detail that makes the mark ours rather than a generic document icon. The left edge stays straight.
- **Second crease**: at y 29.83, a 1 u hairline from x 13 to x 35 in Kage (#CED2D5) on light grounds or #3A3D43 on dark ones. Drawn only at 64 px and larger.
- **Favicon cut (16 and 32 px)**: no step, no second crease, stroke 3 u, head 13 u. The darker head must still read at 16 px.
- **Clear space**: one head height (11.67 u) on all sides.
- **Colors**: Sumi (#22211F) on light grounds. Washi (#FCFBF8) on dark grounds. Never in kaki, never in a firm's color, with one exception: the app icon.
- **App icon (1024 × 1024, desk and dashboard home-screen icon)**: Sumi square ground, a Washi sheet drawn as above at 62% of the icon height, head band in Kaki (#EC8F52). First light on the head of the page. This is the only place the mark carries color.

### 3.2 The wordmark

"CoFile", drawn by the type foundry as a custom wordmark on GT Alpina (Grilli Type), not typed.

- **Weight**: a custom 440 between GT Alpina Regular and Medium, so it holds up at 14 px in a top bar and in an email.
- **Width**: Standard.
- **Kerning** (in 1/1000 em): C–o −20, o–F −10, F–i +10, i–l +5, l–e 0.
- **F**: middle arm 8% shorter than the text cut, to open the space in front of the i.
- **The tittle of the i** is a tiny sheet, not a dot: a portrait rectangle whose width is 1.1 × the i's stem, whose height is 1.29 × its width (Letter proportion again), with corners rounded at 8% of its width. Its bottom edge sits where the bottom of the round dot would sit. At text sizes nobody notices it. At display sizes, people smile.
- **Color**: Sumi on light, Washi on dark. The wordmark is never set in kaki, a gradient or a firm's color.
- **Minimum size**: 12 px cap height on screen.

### 3.3 Lockups

```
  ▆▆▆                              ▆▆▆
  █  █  CoFile                     █  █
  ▀▀▀                              ▀▀▀
                                  CoFile
  horizontal (primary)          stacked (app splash, square spaces)
```

- **Horizontal**: mark height = 1.3 × the wordmark's cap height. Gap = 0.45 × mark width. The mark's bottom edge sits on the baseline, so the head of the sheet rises above the cap height, a small sheet standing on the line of type.
- **Stacked**: mark above, centered, gap = 0.5 × head height, wordmark below at 1.6 × the mark's width.
- **Top bar size**: wordmark cap height 15 px on desktop, 14 px on phone.
- **No tagline lockup.** The round 3 copy has no tagline, so the mark and wordmark never carry one.

### 3.4 "Ours in small type": the "with CoFile" imprint

"Your name on the door. Ours in small type." This imprint is that line made visible, and it is the most important piece of the identity, because it is the only sign of us a firm's client will ever see. It works like a fine printer's imprint at the foot of a sheet: present, quiet, never competing.

- **Text**: "with" in Whitney Book, lowercase, followed by the CoFile wordmark drawing (not typed), x-heights aligned.
- **Size**: "with" at 14 px. The wordmark is scaled so its cap height is 10 px. Never larger on any firm or client surface, on any screen size. This is the literal "small type": 14 px is also the smallest size anywhere on the site, so nothing of ours is ever bigger than the least important word on the firm's page.
- **Color**: Usuzumi (#5E6166) on paper. Never the firm's color, never kaki.
- **Placement on a sheet the client sees** (the firm's filing page, the client intake form, client link pages, emails to the client) **and on the proof the firm approves**: centered at the foot of the sheet, 40 px below the last content. Above it, a 1 px Kage hairline 40 px wide, 12 px above the text. Nothing else in the foot.
- **Placement on the filing desk** (firm staff): in the top bar, right after the firm's name, separated by a middle dot: `[logo] Harbor & Pine CPA · with CoFile`.
- **In the embed widget**, the existing words "Filed with CoFile" at the widget's foot, same style.
- **Motion rule**: on every surface where the firm's brand animates (the setup preview, the two-firms picture on the home page), the imprint is the one element that never moves. Everything around it may change. It stays exactly where it is, the same size, the same grey.

### 3.5 How a firm's logo sits on its pages: the head of the sheet

Every firm-facing and client-facing sheet has a **head**: a band at the top kept for the firm, in the same proportion as the mark's head. This is where a firm's brand lives, and the rules below exist so that any firm, with any logo, any color and any of the ten preset fonts (or its own uploaded font), looks as good as Harbor & Pine CPA and Northgate Payroll do in the home-page pictures.

```
 ┌═════════════════════════════════════════════════┐  ← painted edge, 4 px, firm main color
 │                                                 │
 │   [ LOGO ]   Harbor & Pine CPA                  │  ← head: 96 px desktop / 76 px phone
 │                                                 │     6% tint of the firm's second color
 ├─────────────────────────────────────────────────┤  ← 1 px hairline, Kage
 │                                                 │
 │   (the sheet's content)                         │
 │                                                 │
 │                     ────                        │
 │                  with CoFile                    │  ← the imprint
 └─────────────────────────────────────────────────┘
```

**The painted edge.** Fine cards have painted edges: the edge of the board colored by hand. Every firm sheet has a 4 px painted top edge in the firm's main color, running the full width and following the sheet's 4 px top corners. It is the firm's color at its most elegant: a thin, confident line, not a flood. On phone it is 4 px too; it should never get thinner.

**The logo box.**

- Left-aligned to the sheet's content edge (32 px from the sheet edge on desktop, 20 px on phone), vertically centered in the head.
- Maximum 44 px tall and 220 px wide on desktop; 36 px tall and 180 px wide on phone.
- **Optical sizing by area, not height.** A wide wordmark logo and a square emblem should feel the same size. Scale every logo so its bounding box covers about 7,000 px² on desktop (4,600 px² on phone), then clamp to the maximums above. A 4:1 wordmark ends up about 42 × 168 px; a square emblem about 44 × 44 px (it hits the height clamp first). The engineer gets this as a formula: `scale = sqrt(targetArea / (w × h))`, then clamp.
- **White boxes disappear.** Many firms will upload a JPEG with a white rectangle around the logo. When the four corner pixels are opaque and within ΔE 3 of white, render the logo with `mix-blend-mode: multiply` on the paper. The white box melts into the sheet and only the ink remains, as if the logo were printed on it. Because client sheets stay paper even in dark mode (see 12), this always works.
- **The firm's name.** Set beside the logo in the firm's font, 20 px (18 px on phone), weight 600, Sumi, 16 px gap. If a firm has no logo, the name alone becomes the head at 26 px (22 px on phone) and it still looks like letterhead, because the painted edge and the head band do the work. If the logo already contains the name, the firm can hide the typed name with a setting in Branding: `[copy needed: a checkbox label such as the logo already shows our name]`.

**The firm's colors.**

- **Main color**: the painted edge, the primary button, the focus ring, the reading-progress hairline, selected tabs, the active step. Nothing larger. A firm's color is never used as a page background or a large fill, which protects every client from a firm that picked neon.
- **Second color**: the head band's tint (6% over Washi) and small details such as the active row marker in tables.
- **When a color is too light** (contrast under 3:1 against Washi, a pale yellow for instance): fills keep the color and switch their text to Sumi (the site already computes this), and links, focus rings and the progress hairline use the same hue darkened in OKLCH to L 0.45. The firm sees its color; the client can still read.
- **When no color is set**: the painted edge and buttons are Sumi. Ink is always tasteful.

**The firm's font.** Headings and body text on firm pages use the firm's chosen font. To keep the rhythm of the page steady whichever font they pick, each preset gets a `size-adjust` in its `@font-face`, tuned by eye against Whitney's x-height. Starting values: Standard (system) 100%, Inter 98%, IBM Plex Sans 100%, Roboto 102%, Open Sans 97%, Lato 104%, Montserrat 94%, Source Serif 104%, Merriweather 93%, Lora 102%. An uploaded font is measured at upload (x-height ÷ em) and adjusted the same way. Values typed into the state form (on the proof and drafts) stay in GT Alpina Typewriter: that is not CoFile branding, it is the visual sign that "this is exactly what will be typed".

---

## 4. Color

### 4.1 The thinking

There are only two "colors" in this brand: **daylight on paper**, and **the firm's own color**. CoFile's palette is mostly air: a cool morning grey for the desk, a warm white for paper, a warm black for ink. Then one warm accent, kaki (persimmon), for first light and for "try it". Then one cool accent, ai (indigo), for links and for things someone needs to act on. Ai and kaki are an old pairing in Japanese craft: indigo-dyed cloth beside persimmon-dyed paper. Here they stay small.

The firm's color is never competing with ours, because on the firm's pages ours disappears. Kaki and ai do not appear on any client-facing surface. The client sees paper, ink and the firm's color.

Shadows are cool and the light is warm, as in real daylight: shadows on a sunny desk are filled by blue sky, so they are bluish, while the direct light is warm. That one physical fact is why the sheets will look lit rather than drawn.

### 4.2 Light palette

| Token | Name | Hex | Use | Contrast note |
|---|---|---|---|---|
| `--ground` | **Morning** | `#ECEEED` | The desk: page background on CoFile's own pages | Sumi on it 13.8:1 |
| `--ground-shade` | Shade | `#E3E6E6` | The "smaller rooms": the checks on How it works, the Security page's ground, table headers | |
| `--paper` | **Washi** | `#FCFBF8` | Every sheet: the proof, forms, cards, emails | Sumi on it 15.6:1 |
| `--paper-back` | Paper back | `#F4F3EF` | Insets on a sheet, the back of a folding sheet, code blocks | |
| `--ink` | **Sumi** | `#22211F` | Text, the mark, secondary button borders | |
| `--ink-2` | Usuzumi | `#5E6166` | Secondary text, the imprint, captions | 6.0:1 on Washi, 5.3:1 on Morning |
| `--ink-3` | Pale ink | `#8D9095` | Disabled text and decorative numerals only, never information | 3.1:1 |
| `--hairline` | Kage | `#CED2D5` | Rules, field borders, table lines | |
| `--kaki` | **Kaki** (persimmon) | `#EC8F52` | The primary button on CoFile's pages, rehearsal chips, proofreader's numerals | Sumi text on it 6.6:1 |
| `--kaki-deep` | Kaki deep | `#DB7A3C` | Primary button hover and its 1 px bottom edge | Sumi text 5.3:1 |
| `--asa` | **Asa** (first light) | `#FCE4CC` | The light itself: highlighter swipes, the warm wash of light, the beta notice ground | |
| `--ai` | **Ai** (indigo) | `#33437A` | Links, focus rings on CoFile's pages, "someone needs to act" status dots, saved answers on drafts | 9.1:1 on Washi |
| `--leaf` | Wakaba (young leaf) | `#4F8A3A` | The "Live" dot and "done" status dots only; never text | |
| `--beni` | Beni | `#B0413A` | Errors: field errors, failed and rejected statuses | 5.5:1 on Washi |
| `--shadow` | Sky shadow | `#2A3550` | The color every shadow is mixed from (never pure black) | |

### 4.3 Dark palette: "the desk at night"

In dark mode the window is dark and a warm desk lamp takes over. The desk goes dark. The paper does not.

| Token | Hex | Notes |
|---|---|---|
| `--ground` | `#16171A` | Night desk |
| `--ground-shade` | `#1B1D20` | Support rooms |
| `--surface` | `#1F2125` | Desk furniture: nav, dashboard panels, list rows |
| `--paper` | `#ECEAE4` | **Paper stays paper**, dimmed so it doesn't glare: the proof, the client's forms and link pages, the letterhead preview, emails, the home-page pictures |
| `--paper-back` | `#E2E0D9` | |
| `--ink-on-ground` | `#ECEAE5` | Text on the dark desk, 14.9:1 |
| `--ink` | `#22211F` | Text on paper, unchanged |
| `--ink-2` | `#A9ACB2` on ground, `#5A5D62` on paper | 7.9:1 on ground |
| `--hairline` | `#33363C` on ground, `#C9CCCF` on paper | |
| `--kaki` | `#F09A62` | Sumi text on it, 7.3:1 |
| `--asa` | `#4A3826` on ground (the lamp's glow), `#F6DDC3` on paper | |
| `--ai` | `#A5B4EA` | Links on the dark desk, 8.8:1 |
| `--leaf` | `#79B35A` | |
| `--beni` | `#E07A70` on ground | |
| `--shadow` | `#000000` at 40 to 60% | At night shadows are simply dark |

The light layer in dark mode is a warm pool from a lamp at the upper right, `radial-gradient(ellipse at 85% 0%, rgba(240,154,98,.10), transparent 60%)`, instead of the moving window light.

### 4.4 How color is used

- **On CoFile's own pages** (home, How it works, For firms, What we file, Pricing, Security, Questions, For platforms, sign-up, log in, docs, legal): Morning desk, Washi sheets, Sumi ink. Kaki appears in exactly three roles: the primary button, the rehearsal chip and the proofreader's numerals on sample proofs. If you squint at the home page you should see grey, white, black, two example firms' colors inside the pictures, and a few warm points of persimmon that all mean "try it".
- **Inside the home-page pictures**, the example firms' own colors lead: Harbor & Pine CPA in a deep harbor teal (`#1E5A5C`, with a second color of `#C9A45C`, a weathered brass), Northgate Payroll in a confident brick red (`#A8452F`, second color `#2E3A4C`, slate). These are the firms' colors, invented by the brand designer who draws their logos (see 7.7). They prove that CoFile's quiet palette makes room for any firm's color.
- **On the firm's pages** (filing desk, the proof, filing pages, intake form, client link pages, emails): the same Morning desk and Washi sheets, Sumi ink, and the firm's colors as set out in 3.5. No kaki, no ai, no CoFile color. Status dots are the one semantic exception on the filing desk, which is staff-facing.
- **Rehearsal on the firm's pages** can't use kaki, so it uses a neutral "trial print" treatment that works with any firm color: a chip with a 1 px dashed Sumi border, and a notice on a faint diagonal hatch (1 px lines of Sumi at 5% opacity, 6 px apart, 45°), the way a printer marks a test sheet.
- **The coverage stages** are told by a glyph and a word, never by color alone (see 11.6).
- **Shadows** are always mixed from Sky shadow (`#2A3550`) and always fall away from the current light (see 8.2).
- **Never**: gradients as decoration, color behind long text, color as the only carrier of meaning, red anywhere except a real error.

---

## 5. Typography

### 5.1 Typefaces

| Role | Typeface | Foundry | Why |
|---|---|---|---|
| **Display**: headlines, section headings, the close | **GT Alpina** Standard, Regular 400 and Regular Italic | Grilli Type | A serif with a gentle, slightly calligraphic hand. It feels like good stationery without being old-fashioned, and it is beautiful at 72 px. Regular, not Light, because the readers are 40 to 65. |
| **Typed values**: everything CoFile types into the state's form, on proofs, drafts, the rehearsal log, code | **GT Alpina Typewriter** Regular | Grilli Type | The copy says "You do the advising. We do the typing." So the typing has its own face, in the same family as the headlines. A value in the typewriter face always means "this is exactly what goes to the state". |
| **Text and interface**: body, ledes, labels, buttons, tables | **Whitney** (Whitney ScreenSmart at 20 px and below) | Hoefler&Co | A humanist sans designed for wayfinding signage: open apertures, a generous x-height, sturdy at small sizes, clear numerals, tabular figures. My industrial-design side chooses it; my older readers will thank it. ScreenSmart cuts are hinted for screens at text sizes. |
| **Wordmark** | Custom drawing on GT Alpina (see 3.2) | Grilli Type, commissioned | |
| **Proofreader's numerals** | A set of ten circled numerals drawn like a soft pencil, as SVG | Commissioned from the same lettering artist as the wordmark details | For callouts on sample proofs |

Both families cover Latin Extended, so Spanish (á é í ó ú ñ ü ¿ ¡) is complete.

**Fallback stacks**, each with `size-adjust` so the layout doesn't jump while fonts load:

- Display: `"GT Alpina", Georgia, "Times New Roman", serif` (Georgia at `size-adjust: 96%`)
- Typewriter: `"GT Alpina Typewriter", ui-monospace, "Courier New", monospace`
- Text: `"Whitney SSm", "Whitney", system-ui, -apple-system, "Segoe UI", sans-serif` (system-ui at `size-adjust: 103%`)

Loading: preload GT Alpina Regular (Latin subset) and Whitney Book and Semibold (Latin subset). Everything else `font-display: swap`. Total font weight under 180 KB on first load.

### 5.2 The scale

Sizes are in px at the default browser text size and are set in rem, so they grow with the reader's own text-size setting. Phone ≤ 599 px, tablet 600 to 1023 px, desktop ≥ 1024 px. Fluid sizes use `clamp()` between the phone and desktop values.

| Token | Face and weight | Desktop | Tablet | Phone | Tracking | Use |
|---|---|---|---|---|---|---|
| `display-1` | Alpina Regular | 72 / 76 | 56 / 62 | 40 / 46 | −0.015em | The hero H1 |
| `display-2` | Alpina Regular | 52 / 58 | 42 / 48 | 32 / 38 | −0.01em | Section headings (H2) |
| `figure-xl` | Alpina Regular, tabular lining figures | 64 / 64 | 56 / 56 | 48 / 48 | −0.02em | The price figures on the rate card and the Pricing page ("$25", "$15", "$250") |
| `display-3` | Alpina Regular | 34 / 42 | 30 / 38 | 26 / 33 | −0.005em | Proof titles, plan names, page titles on the desk, state names on the coverage cards |
| `heading` | Whitney Semibold | 22 / 30 | 21 / 29 | 20 / 28 | 0 | H3, card titles, step leads |
| `lede` | Whitney Book | 22 / 34 | 21 / 32 | 19 / 30 | 0 | Section ledes, the hero sub |
| `body` | Whitney Book | 19 / 30 | 18 / 29 | 18 / 28 | 0 | Body text, list items |
| `ui` | Whitney Medium | 18 / 24 | 18 / 24 | 17 / 24 | 0 | Buttons, nav, tabs |
| `label` | Whitney Medium | 16 / 22 | 16 / 22 | 16 / 22 | 0.005em | Form labels, table headers |
| `small` | Whitney Book | 16 / 24 | 16 / 24 | 15 / 22 | 0 | Notes, help text, captions |
| `micro` | Whitney Medium | 14 / 20 | 14 / 20 | 14 / 20 | 0.02em | The imprint, chip text, figcaptions. Nothing on the site is smaller than 14 px. |
| `typed` | Alpina Typewriter | 17 / 26 | 17 / 26 | 16 / 24 | 0 | Values on proofs and drafts |
| `typed-small` | Alpina Typewriter | 15 / 22 | 15 / 22 | 14 / 20 | 0 | The rehearsal log, code |
| `kicker` | Whitney Medium | 17 / 24 | 16 / 22 | 15 / 22 | 0.01em | "For CPA, payroll, fractional CFO and title firms" |

### 5.3 Rules of setting

- **No all-caps**, anywhere I control. Kickers and labels are sentence case, set apart by weight and a short hairline, not by capitals. All-caps is hard to read for older eyes and doubles in length in Spanish. The only capitals are in values the state requires (TWO SISTERS BAKERY LLC), which are typed exactly as they will be filed.
- **Measure**: ledes and body at 30 to 36 em (about 62 characters). Headlines may run wider but break by sense, never leaving a single word alone on a line (`text-wrap: balance` for headings, `text-wrap: pretty` for paragraphs, plus hand-set breaks for the hero).
- **Figures**: Whitney tabular lining figures (`font-variant-numeric: tabular-nums lining-nums`) in every fee, table and date. Fees align on the decimal point.
- **Totals** are set the way an accountant sets them: a single 1 px rule above the total row, a double rule (two 1 px lines 2 px apart) below it. Every CPA who sees the proof will notice this.
- **Italic**: GT Alpina Regular Italic is used only where the copy already marks a phrase as a quotation, such as "with CoFile" when it is quoted inside a sentence. I don't add emphasis the copy doesn't have.
- **Links**: underlined, 1 px, offset 3 px, in Ai on CoFile's pages and in the firm's (contrast-safe) main color on firm pages. On hover the underline thickens to 2 px.
- **Pairing**: Alpina speaks (headlines), Whitney explains (everything else), Typewriter types (values). They never trade jobs.

---

## 6. Layout

### 6.1 The desk and the sheet

There is one layout idea under everything: **the page is a desk; some things lie on it as sheets.**

- What CoFile says to the firm (headlines, ledes, the short lists) is printed directly on the desk.
- Everything that carries the firm's name (the filing desk, the client's form and link pages, the proof the firm approves, an email, the state's papers coming back) is always a **sheet**: Washi paper, a 4 px corner radius, a real shadow, a little rotation when it is resting casually (never on a working page).

So on the home page you can always see, at a glance, which parts are "yours". They are objects. They have weight. You want to pick them up. With only about 330 words, the sheets are the page: each section is a short column of words on the desk beside one large sheet.

### 6.2 Grid

| | Phone | Tablet | Desktop | Wide |
|---|---|---|---|---|
| Width | ≤ 599 px | 600 to 1023 px | 1024 to 1439 px | ≥ 1440 px |
| Columns | 4 | 8 | 12 | 12 |
| Outer margin | 20 px (16 px at ≤ 360 px) | 32 px | 48 px | auto |
| Gutter | 16 px | 24 px | 24 px | 32 px |
| Content max | full | full | 1200 px | 1280 px |

On wide screens the extra width is ma: it stays empty desk. The photographic plates and the light layer bleed to the viewport edges; text never does.

### 6.3 Spacing

An 8 px base with a 4 px half step. Tokens: `4, 8, 12, 16, 24, 32, 48, 64, 96, 128, 160, 200`.

- **Vertical rhythm**: line heights are multiples of 2 px and blocks are spaced in multiples of 8, so baselines fall into step down the page.
- **Home-page sections** (hero, firms, requests, proof, after, coverage, rehearsals, pricing, close): 160 px above and below on desktop, 112 on tablet, 96 on phone. These rooms are large and quiet, which is right for so few words.
- **Quiet rooms** (the checks section of How it works, the Security page's content, the security line under pricing): 96 px on desktop, 80 on tablet, 64 on phone, on the Shade ground where they are whole sections. They are smaller rooms off the main corridor: easy to find, clearly secondary.
- **Heading to lede**: 24 px. **Lede to content**: 48 px desktop, 32 phone. **List items**: 20 px apart, with a 1 px Kage rule between items on lists of four or more.
- **Inside a sheet**: 32 px padding on desktop, 20 px on phone; 40 px from the last content to the imprint.

### 6.4 How pages breathe

- **Desktop**: the home page has four kinds of composition, chosen section by section in 9.
  - **Type on the picture**: the hero and the close. A full-bleed photographic plate of the desk; the words sit on the desk itself, in the light, beside (hero) or on (close) a sheet.
  - **Words beside a picture**: firms, requests, the proof, after, rehearsals. A short column of words on the desk (cols 1 to 4) and one large picture (cols 6 to 12), with column 5 left empty as ma. The picture is always the bigger partner. The sides alternate down the page (words left, then right, then left) so the eye moves like reading a fold-out.
  - **Words above a spread**: coverage and pricing. The heading and lede on top, then the cards or the rate card spanning all twelve columns.
  - **A picture alone**: one wordless photograph between the hero and the firms section (the door, see 9.2). A breath, the way a good book puts a full-page plate before a chapter.
- **Phone**: one column. Order follows the copy: heading, lede, the short list and its link, then the picture. Pictures take the full width minus 20 px margins, and photographs may go edge to edge. Nothing ever sits side by side on a phone except a label and its value on a sheet when both are short.
- **Sticky thumb bar on phone**: after the hero's buttons scroll out of view, a 64 px bar rises from the bottom (`translateY` 100% → 0, 320 ms, paper land curve) holding "Run a free rehearsal" full width in Kaki. It sinks away again inside the close section (which has its own button), in the For platforms inquiry form, and whenever a field has focus. It respects `env(safe-area-inset-bottom)`.
- **Tap targets**: 48 × 48 px minimum, 56 px tall for primary buttons on phone.
- **Sheet widths**: the proof is 720 px wide on desktop (a sheet of letterhead at screen scale) and full width minus 20 px on phone. Forms sit on 720 px sheets. The letter-style pages (Terms, Privacy) and the Questions answers sit on 760 px sheets.

---

## 7. Art direction

### 7.1 Principles

1. **Photograph the light, set the words live.** Every picture is a photographed plate (a real desk, real paper, real window light) with the product composited on top as live HTML: real components from the design system, with example data. No fake screenshots and no words baked into images. The words stay sharp, accessible, translatable and always up to date with the copy. A light pass and a paper-grain pass sit over the HTML so it reads as printed on the paper, not floating above it.
2. **One light.** Every plate is shot for its hour in the working day (8.2), so the shadows on the HTML and in the photograph always agree.
3. **Few objects.** Each picture has its sheet and at most two objects: a pen, a cup, an envelope, a phone. Ma is the rest.
4. **Real people, never stock.** The people are real filing professionals, real firm owners and a real neighborhood bakery, photographed where they work.
5. **Examples say so.** Every example picture keeps a small caption saying it is an example, using the stand-ins' own words: "Example · test details · not a real firm", "Two example firms · same page, each in its own brand", "Sample proof · test details · not a real business", "Example record · sample documents", "Rehearsal · nothing filed, nothing paid", and "Ana Ortiz · text message · example" inside the text bubble. Captions are set in `micro`, Usuzumi, on the desk at the picture's lower left, like a label in a museum case.
6. **No government marks, ever.** The state's document and the IRS letter are drawn as plain sheets in our own typography: no seals, crests, eagles, state outlines, official letterheads or form layouts. A state website, wherever it appears, is a neutral grey screen frame with plain fields and our type. Nothing in any picture could be mistaken for a government page.

### 7.2 Photography: still life and light

**Commission**: a still-life photographer who specializes in paper goods and natural light (the kind who shoots for fine stationers and paper mills), with a set builder and a paper stylist. Two days in a studio with a large north-and-east window, plus one golden-hour session.

**Camera and set**: a 100 MP medium-format back on a copy stand rig, lens 100 to 120 mm from about 3.5 m directly above, so sheets are true rectangles for compositing. Desk surface: a single 1.8 × 1.2 m board of pale limed ash, matte, lightly grained, graded so its average tone at the plate's edge equals Morning (#ECEEED) and the photograph melts into the page. Paper: US Letter, 118 gsm 100% cotton, uncoated, bright white (it is graded to Washi). Every plate is delivered with separate passes: clean desk, desk with blank sheet(s), light-only pass on a grey card, and a shadow-gobo pass.

| Plate | Hour | What it shows | Crops | Passes and notes |
|---|---|---|---|---|
| **P1 · The desk at 8 a.m.** (hero) | 08:00 | The desk by the window. Low light from the left at about 20° elevation, the soft shadow of a four-pane window frame crossing the lower right, a few blurred leaf shadows from a tree outside. One blank Letter sheet laid at −1.5° right of center (this becomes the filing desk). At the top-right edge, cropped by the frame: a closed fountain pen in black lacquer (no brand) and a pale celadon cup of tea. | 21:9 desktop, 16:10 tablet, 4:5 phone | Clean desk; desk with sheet; light-only; gobo time-lapse (1 frame every 10 s for 20 min) for the drift loop; the same desk at night under a warm lamp from the upper right, for dark mode |
| **P2 · The door** (between hero and firms) | 08:30 | A quiet office hallway, a glass door with "Harbor & Pine CPA" hand-gilded on the glass in 23-carat gold leaf with a fine black outline. Morning light comes through the glass and throws the letters' shadow, softly, onto a pale wooden floor. A glimpse of a bright office behind, out of focus. Shot straight on at door-handle height. | 21:9 band, 4:5 phone | Clean glass (no letters) for a possible later swap; letters' shadow on the floor as its own pass |
| **P3 · The printer's proof** (the proof) | 11:30 | A letterpress proof sheet of Harbor & Pine CPA's business cards, eight up, with crop marks and registration marks, printed in the firm's teal on cotton card. It lies on the desk, partly under where the CoFile proof sheet will sit, and a soft pencil (not a pen) lies across its corner. Nothing is written or stamped on it. | 16:10 desktop, 4:5 phone | Card sheet alone; desk without it |
| **P4 · Coming home** (after) | 13:30 | Light now from high and slightly right. An opened #10 window envelope in unbranded cotton paper, flap up. Fanned out of it: two Letter sheets (they become the state's document and the IRS letter). Beside them a slim stack bound with a 40 mm paper band (an obi) of pale kozo washi. | 16:10, 4:5 | Envelope closed and open; each sheet alone; band alone; a mid-fan frame for the animation's middle key |
| **P5 · The rate card** (pricing) | 16:15 | A single card of 600 gsm cotton board, 9 × 5 in, lying flat. Light low from the right, raking, so the board's surface and its edge are visible. | 21:9, 4:5 | Raking light pass, to drive the letterpress effect on the live figures (7.6) |
| **P6 · Golden hour** (the close) | 17:00 | The same desk as P1, the sun now low from the right, long warm shadows reaching left, the window frame's shadow stretched. One blank sheet of letterhead, its head empty, at +1° near center. The cup is gone. The pen lies parallel to the sheet. | 21:9, 16:10, 4:5 | As P1 |
| **P7 · Texture library** | — | Macro scans at 1:1, 300 ppi: the cotton sheet, kozo washi, the 600 gsm board, the kraft back of an envelope. | 1024 px seamless tiles | Grey-balanced; used at 2 to 3% opacity |

### 7.3 Photography: people

**Commission**: a documentary portrait photographer who works only in available light, with a producer who handles casting, consent and releases. Three days.

| Set | Who | Where and when | Shots | Used on |
|---|---|---|---|---|
| **The filing professionals** | CoFile's real filing team (three to five people), photographed only with their consent. Never models presented as staff. | At their own desks, morning light, their screens off or out of frame | A 4:5 portrait of each, looking slightly off camera, at work, relaxed. A wider shot of two of them looking at one sheet together. | Small round portraits beside "Built and run by filing professionals…" in the hero and on Pricing; larger on How it works and For firms |
| **Firm owners** | A CPA (a woman in her late 50s), a payroll firm owner (a man in his mid 40s), a title company closer (a woman in her 60s). Real customers who agree to it, or real practitioners cast for the shoot and captioned as examples | Their own offices, 8 to 10 a.m. | At the desk with a phone, mid-thought; at the door of the office; a hand on a sheet of their own letterhead (their letterhead out of focus) | For firms, sign-up, the firm-owner moments in How it works |
| **The bakery** | Two sisters who run a real neighborhood bakery, cast to play Ana and Lucia Ortiz in the "Two Sisters Bakery" example, with their own signage kept out of frame or neutral | Their bakery at 6 a.m., ovens on, the shop still dark except for the work lights and the first daylight | Ana at the counter, flour on her hands, typing a text with her thumb; both sisters with the first trays; Ana laughing at her phone | Requests (home and How it works), For firms |

**Grade, for every photograph**: a shared "daylight" look. Shadows lifted slightly and nudged cool (about +3 toward blue), highlights warm, saturation −8, no crushed blacks, fine grain at 2%. Skin is always true; only the light is graded.

**Alt text** for every photograph: `[copy needed]`.

### 7.4 Product imagery

- All UI in pictures is the real design system, in live HTML, with the example data from the stand-ins: Harbor & Pine CPA, Northgate Payroll, Two Sisters Bakery LLC, Hudson Ledger LLC, Orchard Lane Inc., Ana Ortiz and Lucia Ortiz.
- **Phones** appear in our own neutral frame: a rounded rectangle at the true 19.5:9 proportion, a 1 px Kage outline, a 10 px Sumi bezel, no notch, no buttons, no brand. The screen is lit very slightly brighter than the paper (it is a light source) and carries the same daylight gobo at half strength.
- **The state's website**, where a picture needs it (the proof's "New Jersey's own review page, filled in", the rehearsal run), is a neutral screen frame in Paper back with plain grey fields, labels in Whitney and values in Typewriter. No state colors, crests or layouts.

### 7.5 Illustration and paper relief

Almost none, on purpose. Two small commissions:

- **An icon set**, about 40 icons, drawn by an icon designer: 24 px grid, 1.5 px stroke, round caps and joins, Sumi, with an optional Washi fill so an icon can be "a little piece of paper" (the document, the envelope, the slip, the phone). No ticks, locks, shields or seals in the set.
- **Six paper-relief vignettes** for empty and error states, made by a paper artist in white cotton paper (cut, scored and folded, white on white, about 20 × 15 cm each) and photographed in the P1 light so their only color is shadow: an empty desk with one slip ("Your desk is clear."), a sheet lifting in a breeze (404), a gently creased sheet (errors), an envelope with a letter half in (check your email), a stack bound with a band (no documents yet), a single folded tent card (no client links yet). Each is used at most 240 px wide.

### 7.6 Texture, light and print effects

- **Paper grain**: the P7 cotton tile over every sheet at 2.5% opacity, `mix-blend-mode: multiply`, including over the text, so the type looks printed. Never on the desk ground except inside photographic plates.
- **Desk**: flat Morning with a 1.5% fine noise to prevent banding in the light gradients.
- **Letterpress figures** on the rate card and Pricing: the price figures get an inset effect in CSS, `text-shadow: 0 1px 0 rgba(255,255,255,.7), 0 -1px 0 rgba(42,53,80,.18)`, and the P5 raking-light pass sits over the card, so the numbers look pressed into thick board. It is the only "pressed" effect on the site, and it is on prices, not on approvals.
- **The painted edge** on firm sheets (3.5) gets a 1 px highlight on its upper side (`rgba(255,255,255,.35)`), as a painted board edge catches the light.
- **The light layer**: on CoFile's public pages, a fixed full-viewport layer above the desk and below the type holds the gobo from P1 (window frame and leaves), blurred 24 px, at 5 to 9% opacity (`multiply`), plus a warm wash (`soft-light`) whose color follows the hour (8.2). Firm pages get no gobo: an even, calm light from the upper left, because a working tool should be steady.

### 7.7 The example firms' identities

**Commission**: a brand designer to create the example firms as if they were real clients, using only what the product allows (a logo file, two colors, one of the ten preset fonts), so every picture shows exactly what CoFile does for a real firm.

- **Harbor & Pine CPA**: a monogram emblem, an ampersand whose lower bowl becomes three short water lines and whose upper stroke ends in a small pine, beside a wordmark. Colors: harbor teal `#1E5A5C`, brass `#C9A45C`. Font: Lora. Supplied deliberately as a JPEG with a white box, to show the box melting away (3.5).
- **Northgate Payroll**: a wordmark with a simple gate made of two uprights and a lintel over the "N". Colors: brick `#A8452F`, slate `#2E3A4C`. Font: Montserrat. Supplied as a transparent PNG.
- Two spares for the setup page and docs, under names to be chosen: `[copy needed: two more example firm names]`.

None of them may resemble a real firm's identity; the designer checks names and marks before delivery.

---

## 8. Motion

### 8.1 Principles

Paper is my animation teacher. It has weight, so it lifts before it moves. It has air under it, so it drifts a little and settles when it lands. It has a grain, so it folds along a crease and nowhere else. And it never fades: paper doesn't dissolve, it moves. Only light and ink are allowed to appear and disappear.

1. **Lift, move, land.** Any sheet that changes place first lifts (rises 2 to 6 px, its shadow grows and softens), then travels on a slight arc with no more than 3° of rotation, then lands with a 2 px settle. Never a bounce, never a scale-up pop.
2. **Ink soaks, light passes.** Color arrives like ink wicking into paper (from an edge, with a soft leading edge). Emphasis arrives as light passing over something. Neither flashes.
3. **One thing at a time.** Only one signature moment plays at once. Each plays once per page view, when it is about 40% in view, and can be replayed where it matters.
4. **The meaning survives without motion.** With reduced motion every moment becomes its final still, which tells the same story (8.6).

### 8.2 The working day: light and shadow as you scroll

Each home-page section carries an hour. When a section crosses the middle of the viewport, it sets four custom properties on the page, and the light moves to that hour over 1,200 ms (`--ease-light`). The properties are registered with `@property` so the browser interpolates them.

| Section | Hour | Light from | Shadow offset `--sx`, `--sy` (px) | Warm wash `--wash` (soft-light) | Gobo |
|---|---|---|---|---|---|
| Hero | 08:00 | left, low | +8, +10 | `#FFF1E0` at 22% | window frame and leaves, 7%, drifting |
| The door | 08:30 | left | +7, +10 | `#FFF1E0` at 20% | through the glass |
| Firms | 09:30 | upper left | +6, +9 | `#FFF4E8` at 16% | 5% |
| Requests | 10:30 | upper left | +4, +8 | `#FFF7EF` at 12% | 4% |
| The proof | 11:30 | above | +2, +7 | `#FFFFFF` at 8% | none (the sun is high) |
| After | 13:30 | above right | −2, +7 | `#FFF7EC` at 10% | none |
| Coverage | 14:30 | right | −4, +8 | `#FFF1E0` at 14% | 3%, mirrored |
| Rehearsals | 15:30 | right | −6, +9 | `#FFE9CF` at 18% | 5%, mirrored |
| Pricing | 16:15 | right, low | −7, +10 | `#FFE2C2` at 22% | raking, 6% |
| Close | 17:00 | right, low | −10, +12 | `#FFD9AE` at 30% | long frame shadow, 9% |

Every sheet's shadow is built from those properties, in Sky shadow:

```css
box-shadow:
  0 1px 0 rgba(42,53,80,.05),
  calc(var(--sx) * 1px)  calc(var(--sy) * 1px)  24px -8px rgba(42,53,80,.16),
  calc(var(--sx) * .4px) calc(var(--sy) * .4px)  6px -2px rgba(42,53,80,.08);
```

A lifted sheet multiplies the offsets by 1.6 and adds 16 px of blur. The pages behind the home page each hold one hour (2), so their light never moves.

### 8.3 Motion tokens

| Token | Value | Use |
|---|---|---|
| `--dur-press` | 120 ms | A button going down |
| `--dur-micro` | 160 ms | Hover, focus, underline |
| `--dur-small` | 240 ms | Chips, logos resolving, small settles |
| `--dur-sheet` | 520 ms | A sheet moving across the desk |
| `--dur-fold` | 640 ms | The tri-fold |
| `--dur-ink` | 420 ms | Ink soaking along an edge |
| `--dur-light` | 1,200 ms | The light changing hour |
| `--dur-drift` | 90 s, alternate | The window light's drift in the hero |
| `--ease-land` | `cubic-bezier(.2, .8, .2, 1)` | Landing, settling: fast start, long soft finish |
| `--ease-lift` | `cubic-bezier(.4, 0, .2, 1)` | Lifting and departing |
| `--ease-ink` | `cubic-bezier(.3, 0, .1, 1)` | Ink soak, highlighter |
| `--ease-light` | `cubic-bezier(.45, 0, .55, 1)` | Light, slow in and slow out |
| Spring (drag, flick on phone) | stiffness 260, damping 30, mass 1 | No more than 1% overshoot |
| Typing | 28 ms per character, ±8 ms jitter | Values typing in the Typewriter face |

### 8.4 The signature moments

| # | Moment | Where | What moves, and when | Why it sells the copy |
|---|---|---|---|---|
| M1 | **Morning arrives** | Hero | The page renders complete (nothing waits on animation). 0 to 1,200 ms: the warm wash rises and the window-frame shadow fades in, as if the sun had just cleared a roof. At 1,200 ms the Two Sisters Bakery slip on the filing desk ("Proof ready to approve") lifts 3 px and keeps a slightly deeper shadow: the one thing waiting for you. Then the 90 s drift begins: the shadow of the window frame slides 24 px, the leaves sway 2 px on a 7 s cycle. | "Say yes, under your own name": calm, a good morning at your own desk, your name at the head of it |
| M2 | **The gold catches the light** | The door | As the photograph enters, one narrow highlight sweeps across the gilded letters of "Harbor & Pine CPA" from left to right (900 ms, `--ease-light`), masked to the letters. Once. | "Your name on the door": the name literally gleams |
| M3 | **Ink soaks in** | Firms | One blank client page lies on the desk. It parts into two (each slides 50% left or right, 520 ms). Then each page's painted edge soaks in its firm's color from the top-left corner (420 ms, 6 px feathered leading edge); its logo resolves like ink drying (opacity and a 2 px settle, 240 ms); the heading's font changes to the firm's (240 ms crossfade); the Continue button fills with the firm's color from the bottom up (300 ms). Through all of it the "with CoFile" line at the foot of both pages does not move. | "Your name on the door. Ours in small type." The firms change; we stay small and still |
| M4 | **Words become fields** | Requests | The phone shows a typing indicator (900 ms), then Ana's text lands (rises 8 px, 320 ms). Three phrases get a highlighter swipe in Asa, one after another. Each highlighted phrase lifts off as a small paper slip and travels on an arc to its row on the draft sheet (640 ms), where it lies down flat and its words are typed as the formal value: TWO SISTERS BAKERY LLC, Ana Ortiz, Lucia Ortiz (50/50), Jersey City, NJ. Then the saved rows fill in without travelling, in Ai ink, like ink drying (300 ms): they were already yours. Last, the "For your team to check" chip settles on the head of the draft. About 4.2 s. A small replay button sits at the picture's corner. | "Your client sends a text. Nobody retypes it." Nobody's hands touch a keyboard; the words just move |
| M5 | **The fold** | The proof (and the real proof page) | "Approve for filing" can be pressed. It goes down 1 px (120 ms). Then the sheet folds like a letter: the bottom third folds up over the middle (0 to 320 ms), the top third folds down over it (240 to 560 ms), the backs of the panels showing paper with the faintest mirrored show-through of the text (6%). The folded letter lifts (560 to 700 ms) and slides out to the right (700 to 1,100 ms). On the home page, because it is a sample, a fresh sheet is then laid back down from the left (520 ms). On the real proof page, the decision page arrives in its place. | "Nothing is filed or paid until you approve the proof": one press from you, and it is on its way |
| M6 | **Coming home** | After | An envelope is placed on the desk from the upper right, as if by a hand (lift, arc, land; rotation +6° to +1.5°, 700 ms). Its flap opens on its hinge (420 ms). The state's document and the IRS letter slide out and fan (520 ms, 120 ms apart). The record, bound in its paper band with TWO SISTERS BAKERY LLC on it, slides out last. Three small update slips ("Approved", "Submitted", "Filed") drift down onto the envelope's corner one after another, like notes left on a desk (360 ms each, 200 ms apart). About 2.6 s. | "Then it's filed, and the papers come back to you." The return is the reward |
| M7 | **Cards dealt** | Coverage | The four cards (New York, New Jersey, Florida, IRS) are dealt onto the desk left to right (rise 12 px and land, 420 ms, 90 ms apart). Then each filing's stage glyph fills to its level (320 ms, 30 ms apart). | "The filings your clients already ask you for": a full hand, laid out |
| M8 | **The light passes** | Rehearsals | The run sheet types itself line by line. A soft beam of warm light moves down the sheet to each line as it types. At the last line ("Pay Now", "held, on purpose") the light rests, then slowly widens to fill the whole sheet. | "In beta: rehearse a filing, free." Calm, complete, nothing at stake |
| M9 | **The press** | Pricing | As the rate card lands, its figures are pressed: the letterpress inset deepens over 360 ms with a 1 px downward settle, as if the platen had just come down. | "$45 a filing": a price printed with confidence |
| M10 | **Golden hour** | Close | The light turns gold and the shadows stretch long (1,200 ms). The head of the blank letterhead waits, empty: ma. If the visitor typed their firm's name into the firms picture (9.2), it is typed into the head now in GT Alpina (40 ms per character). Stored only in that browser tab; never sent anywhere. | "Run one rehearsal. Then decide." The page ends on a sheet waiting for your name |

### 8.5 Small interactions

- **Buttons**: press 120 ms down 1 px with the bottom edge flattening; release with `--ease-land` 160 ms. On hover, a single band of first light (40% wide, Asa at 35%) passes across the button once, 700 ms.
- **Links**: underline thickens from 1 to 2 px, 160 ms.
- **Fields**: on focus, the border goes to Sumi 1.5 px and a 4 px glow of Asa appears around it, as if a patch of sunlight had fallen on it (160 ms). On firm pages the glow is the firm's main color at 18%.
- **Linked sheets and cards**: lift 2 px on hover with the shadow ×1.4 (200 ms, `--ease-lift`); land on leave (240 ms).
- **Top bar**: transparent over the hero; after 80 px of scroll it becomes Washi at 86% with a 12 px backdrop blur and a hairline (240 ms).
- **Questions**: opening a question unfolds it like a folded note. The answer's height grows (300 ms, `--ease-land`) and its text slides down 4 px; the small fold glyph beside the question opens.
- **Between public pages**: View Transitions. The new page's first sheet rises 16 px and lands (360 ms); the light cross-fades to the new page's hour (1,200 ms). The header never moves.
- **Status "Filing now"** on the filing desk: its dot breathes very slowly (opacity 1 → .55 → 1 over 3.2 s). It is the only thing on the desk that moves by itself.
- **Haptics**: on Android, an 8 ms vibration on pressing the approve button on the real proof and on primary buttons. Nothing on iOS, which has no web haptics. No sound, anywhere.

### 8.6 Reduced motion, and performance

- **`prefers-reduced-motion: reduce`**: no translation, rotation, folding or drift. States change with a 120 ms cross-fade. The light is fixed at each section's hour, with no transitions. Typed text appears complete. Each signature moment shows its final frame: the two firms' pages already in their colors, the draft already filled with the slips lying in their rows, the envelope open with its papers fanned, the run sheet complete in warm light. The story is the same; it simply doesn't move.
- **Performance**: transform and opacity only. The fold builds its three panels (clipped copies of the sheet) only when the button is pressed. The gobo is one 2048 × 1024 WebP under 90 KB, moved only by transform. Every moment pauses out of view and when the tab is hidden. With `Save-Data`, or `navigator.deviceMemory` of 2 or less, there is no drift and no gobo. Total motion code under 18 KB gzipped (a small scheduler on the Web Animations API, no animation library on the public pages).

---

## 9. The home page, section by section

The home page is one working day on one desk. The nine sections stay in the copy's order with the copy's words. I use **ten pictures**: the seven stand-ins, each redesigned from scratch, plus three of my own (the door, the rate card and the golden-hour close). Every example picture keeps its small example caption.

| # | Section | Hour | Composition | Picture |
|---|---|---|---|---|
| — | Beta banner, header | — | Slim band, top bar | — |
| 1 | Hero | 08:00 | Type on the picture | **The filing desk** (replaces `DeskVisual`) and small portraits of the filing professionals |
| — | Interlude | 08:30 | A picture alone | **The door** (new) |
| 2 | Firms | 09:30 | Words left, picture right | **Two phones, two letterheads** (replaces `TwoFirmsVisual`) |
| 3 | Requests | 10:30 | Picture left, words right | **From the bakery to your desk** (replaces `TextToFormVisual`) |
| 4 | The proof | 11:30 | Words left, picture right | **The proof on the printer's proof** (replaces `ProofVisual`) |
| 5 | After | 13:30 | Picture left, words right | **Coming home** (replaces `PapersVisual`) |
| 6 | Coverage | 14:30 | Words above a spread | **Four cards** (replaces `StateTiles`) |
| 7 | Rehearsals | 15:30 | Words left, picture right | **The run sheet** (replaces `RehearsalLog`) |
| 8 | Pricing | 16:15 | Words above a spread | **The rate card** (new) |
| 9 | Close | 17:00 | Type on the picture | **A blank letterhead at golden hour** (new) |
| — | Footer | dusk | — | — |

### 9.0 The beta banner and the header

**Beta banner.** A slim band across the very top, on Asa (`#FCE4CC`), 44 px tall on desktop.

- Left: a small chip, "Beta", in Kaki with Sumi text (`micro`, 600 weight, 24 px tall, 10 px horizontal padding, radius 6 px).
- Then, in `small` Sumi: "CoFile is in beta. Any filing can run as a free rehearsal on the state's real website. It stops before the last button, so nothing is filed or paid. Filing types go live one at a time. Questions or problems? hello@cofile.app" (the address underlined in Ai).
- On phone it wraps to three or four lines at 15 px with 12 px vertical padding. It is not sticky: it scrolls away with the page, so the phone's first screen soon belongs to the hero.

**Header.** 76 px tall on desktop, 60 px on phone. Transparent over the hero plate, so the morning light falls across it too; after 80 px of scroll it becomes frosted Washi (8.5).

```
DESKTOP
┌───────────────────────────────────────────────────────────────────────────────────────┐
│ [Beta] CoFile is in beta. Any filing can run as a free rehearsal on the state's real… │  Asa band
├───────────────────────────────────────────────────────────────────────────────────────┤
│ ▆ CoFile    How it works  For firms  What we file  Pricing  For platforms    Log in  ( Run a free rehearsal ) │
└───────────────────────────────────────────────────────────────────────────────────────┘

PHONE
┌──────────────────────────────┐
│ [Beta] CoFile is in beta.    │
│ Any filing can run as a free │
│ rehearsal on the state's …   │
├──────────────────────────────┤
│ ▆ CoFile        Log in   ≡   │
└──────────────────────────────┘
```

- **Left**: the horizontal lockup, wordmark cap height 15 px.
- **Center**: "How it works", "For firms", "What we file", "Pricing", "For platforms" in `ui` (Whitney Medium 18 px), Sumi, 32 px apart. The current page is marked by a 2 px Sumi underline, 6 px below the baseline, 16 px wide, centered under the word: a small mark, like a ribbon bookmark, not a full underline.
- **Right**: "Log in" as a quiet text button; "Run a free rehearsal" as the primary Kaki button at 44 px height (the only place it is smaller than 52 px).
- **Phone**: lockup, "Log in" and a menu button (a 24 px icon of three short horizontal lines of unequal length, like lines of text on a sheet; accessible name `[copy needed: Menu]`). The menu opens as a sheet sliding down from under the header (520 ms, land): the five page names at 24 px Alpina, 64 px rows with hairlines, then "Log in" and "Run a free rehearsal" full width at the bottom, within thumb reach.

### 9.1 Hero: the filing desk at 8 a.m.

**Copy, in order:** kicker "For CPA, payroll, fractional CFO and title firms" / H1 "Your client needs an LLC. Say yes, under your own name." / sub "CoFile files your clients' formations, EINs and payroll registrations on the official state and IRS websites, once you approve." / buttons "Run a free rehearsal" and "See pricing" / note "Built and run by filing professionals. When a filing needs a person, one of them takes over." / the picture: the filing desk.

**The composition.** The whole hero is plate P1, the desk by the window at 8 a.m., bleeding to every edge of the viewport and graded so its edges are exactly the page's Morning grey. The words are printed on the desk in the upper left, in the light. The firm's filing desk lies on the desk at the lower right as a large sheet of Harbor & Pine CPA's letterhead. The window frame's shadow crosses both. The H1 runs wide across the top in two sentences on two lines, with the pause between them as space: the client's need, then your answer.

```
DESKTOP (1440 × 900, hero height = min(100svh, 920 px))
┌──────────────────────────────────────────────────────────────────────────────────────────┐
│ (header, transparent)                                                   ░ window light ░  │
│                                                                      ░░░ ║ ░░░ ║ ░░░     │
│  ── For CPA, payroll, fractional CFO and title firms                   ░░ ║ ░░░ ║ ░░  ┌─┐│
│                                                                                     │pen││
│  Your client needs an LLC.                                                       ( cup ) │
│  Say yes, under your own name.                                                           │
│                                                                                          │
│  CoFile files your clients' formations,     ┌══════════════════════════════════════╗   │
│  EINs and payroll registrations on the      │ [H&P] Harbor & Pine CPA    Filing desk│   │
│  official state and IRS websites, once      ├──────────────────────────────────────┤   │
│  you approve.                               │ Client filings          ( New filing ) │   │
│                                             │ ┌──────────────────────────────────┐  │   │
│  ( Run a free rehearsal )  ( See pricing )  │ │Two Sisters Bakery LLC  ● Proof   │◀─┼─ lifted
│                                             │ │New Jersey LLC formation  ready to│  │   │
│  ◯◯◯  Built and run by filing               │ │                          approve │  │   │
│       professionals. When a filing          │ └──────────────────────────────────┘  │   │
│       needs a person, one of them           │  Hudson Ledger LLC            ● Filed  │   │
│       takes over.                           │  New York LLC formation                │   │
│                                             │  Hudson Ledger LLC   ● Filed, IRS      │   │
│                                             │  EIN                   letter saved ▯  │   │
│                                             │  Orchard Lane Inc.       ● Submitted   │   │
│                                             │  Payroll registration (NJ-REG)         │   │
│                                             │               ────                     │   │
│                                             │            with CoFile                 │   │
│                                             └────────────────────────────────────────┘   │
│                                              Example · test details · not a real firm    │
└──────────────────────────────────────────────────────────────────────────────────────────┘

PHONE (390 wide)
┌──────────────────────────────┐
│ ▆ CoFile        Log in   ≡   │
│  ░ window light ░            │
│ ── For CPA, payroll,         │
│    fractional CFO and title  │
│    firms                     │
│                              │
│ Your client needs            │
│ an LLC.                      │
│ Say yes, under               │
│ your own name.               │
│                              │
│ CoFile files your clients'   │
│ formations, EINs and payroll │
│ registrations on the official│
│ state and IRS websites, once │
│ you approve.                 │
│                              │
│ ( Run a free rehearsal     ) │
│ ( See pricing              ) │
│                              │
│ ◯◯◯ Built and run by filing  │
│     professionals. When a    │
│     filing needs a person,   │
│     one of them takes over.  │
│                              │
│ ┌══════════════════════════╗ │  the sheet at −1°,
│ │[H&P] Harbor & Pine CPA   │ │  plate P1 in 4:5
│ │ Filing desk              │ │
│ │ Client filings  (New …)  │ │
│ │ ┌──────────────────────┐ │ │
│ │ │Two Sisters Bakery LLC│ │ │
│ │ │New Jersey LLC form…  │ │ │
│ │ │● Proof ready to      │ │ │
│ │ │  approve             │ │ │
│ │ └──────────────────────┘ │ │
│ │ Hudson Ledger LLC …      │ │
│ │          ────            │ │
│ │       with CoFile        │ │
│ └──────────────────────────┘ │
│ Example · test details ·     │
│ not a real firm              │
└──────────────────────────────┘
```

**Type.**

- Kicker: `kicker`, Usuzumi, preceded by a 24 px Sumi hairline at mid x-height with a 12 px gap.
- H1: `display-1` (72 / 76 px desktop, 40 / 46 px phone), Sumi, hand-set breaks: on desktop one sentence per line; on phone each sentence over two lines ("Your client needs / an LLC." and "Say yes, under / your own name."). 32 px below the kicker.
- Sub: `lede`, Sumi, max 30 em (cols 1 to 5), 32 px below the H1.
- Buttons: 40 px below the sub. "Run a free rehearsal" is the primary Kaki button (52 px desktop, 56 px phone). "See pricing" is a quiet button (Washi fill at 70% over the plate, 1 px Sumi border, Sumi text, same height), 16 px to its right on desktop, stacked under it on phone, both full width.
- Note: `small`, Usuzumi, 40 px below the buttons, max 26 em. Before it, three round portraits of CoFile's filing professionals (7.3), 40 px each, overlapping by 10 px, each with a 2 px Washi ring and its own small shadow from the morning light. They are real people or they are left out; the note stands alone if no portraits exist. Alt text `[copy needed]`.

**The picture: the filing desk (replaces `DeskVisual`).**

What it shows: Harbor & Pine CPA's filing desk, as a sheet of the firm's letterhead lying on the real desk, its four client filings as paper slips.

- **The sheet**: Washi, 620 × 520 px on desktop (cols 7 to 12, overhanging the content edge by 40 px into the margin), rotated −1.5° because it is resting on a desk in a picture. Shadow from the 08:00 light (`--sx` +8, `--sy` +10). Paper grain at 2.5%. On phone, full width minus 20 px, rotated −1°.
- **The head**: 4 px painted edge in harbor teal `#1E5A5C`; 96 px head with a 6% brass tint; the H&P emblem (supplied with a white box, which melts into the paper by multiply) at 44 px tall; "Harbor & Pine CPA" in Lora 600, 20 px, Sumi. At the right of the head, "Filing desk" in Whitney Medium 15 px, Usuzumi.
- **The desk row**: "Client filings" in Lora 24 px on the left, and a "New filing" button in teal with Washi text, 40 px tall, on the right. In the picture it is not a working button; it has no hover.
- **The slips**: each filing is a slip of Paper back, 64 px tall on desktop (two lines plus padding), separated by 8 px, each with a hairline border and its own tiny shadow. Left: the business name in Lora 18 px, Sumi; under it the filing in Whitney 15 px, Usuzumi. Right: a status chip (11.6). The rows, from the stand-in: "Two Sisters Bakery LLC" / "New Jersey LLC formation" / "Proof ready to approve" (Ai dot); "Hudson Ledger LLC" / "New York LLC formation" / "Filed" (leaf dot); "Hudson Ledger LLC" / "EIN" / "Filed, IRS letter saved" (leaf dot, plus a 14 px document glyph: there is a letter on this one); "Orchard Lane Inc." / "Payroll registration (NJ-REG)" / "Submitted" (Usuzumi dot).
- **The waiting slip**: Two Sisters Bakery LLC is lifted 3 px with a deeper shadow and a 3 px brass marker on its left edge. Of everything on the desk, it is the one waiting for you to approve.
- **The foot**: the imprint, "with CoFile", 40 px below the last slip.
- **Objects**: the fountain pen and the celadon cup at the plate's upper right, cropped by the edge. Nothing else.
- **Caption**: "Example · test details · not a real firm", `micro`, Usuzumi, on the desk 16 px below the sheet's lower left.
- **States**: default (as above); reduced motion (identical, with no drift); dark mode (the plate switches to the night pass under a desk lamp, the words turn to light ink on the dark desk, and the sheet stays paper, dimmed to `#ECEAE4`).
- **Motion**: M1, "Morning arrives" (8.4). On hover over a slip (desktop), that slip lifts 2 px. The figure is otherwise still, and is announced as a picture (`aria-label` "An example firm's filing desk", from the stand-in).

**Why it sells**: the first thing a firm owner sees is a firm's name at the head of a beautiful sheet, and their own clients' kind of work lying calmly on it. "Under your own name" is shown before it is read.

### 9.1a Interlude: the door

**Copy**: none. This is a picture alone, between the hero and the firms section: a breath, like a full-page plate before a chapter.

**The picture (new).** Plate P2: the glass door with "Harbor & Pine CPA" in gold leaf, morning light coming through it, the letters' shadow lying soft on the pale floor.

- **Desktop**: a full-bleed band, 21:9, 600 px tall at 1440 wide (`max-height: 64vh`). No text on it. 96 px of desk above and below.
- **Phone**: 4:5, edge to edge, about 488 px tall at 390 wide, cropped to the letters and their shadow.
- **Caption**: "Example · test details · not a real firm", `micro`, on the desk under the band's lower left, 12 px below.
- **Motion**: M2, the gold catches the light, once.
- **Alt text**: `[copy needed]`.

It sits just before "Your name on the door", so the reader has seen a firm's name on a real door, gleaming, a moment before they read the line.

### 9.2 Firms: two phones, two letterheads

**Copy, in order:** H2 "Your name on the door. Ours in small type." / lede "Your logo and color on every page your client sees." / four short items "A link for each client", "A page for every filing you offer", "A button for your own website", "Your registered agent, or ours" / link "For firms".

```
DESKTOP
┌──────────────────────────────────────────────────────────────────────────────────┐
│                                                                                  │
│  Your name on the door.                ┌──────────────┐    ┌──────────────┐      │
│  Ours in small type.                   │┌════════════┐│    │┌════════════┐│      │
│                                        ││[H&P] Harbor ││    ││[N] Northgate││      │
│  Your logo and color on every          ││  & Pine CPA ││    ││    Payroll  ││      │
│  page your client sees.                │├────────────┤│    │├────────────┤│      │
│                                        ││ Start your  ││    ││ Start your  ││      │
│  —  A link for each client             ││ New Jersey  ││    ││ New Jersey  ││      │
│  —  A page for every filing you offer  ││ LLC   (Lora)││    ││ LLC  (Mont.)││      │
│  —  A button for your own website      ││ Business    ││    ││ Business    ││      │
│  —  Your registered agent, or ours     ││ name [____] ││    ││ name [____] ││      │
│                                        ││ Who owns it ││    ││ Who owns it ││      │
│  For firms →                           ││ [_________] ││    ││ [_________] ││      │
│                                        ││ (Continue)  ││    ││ (Continue)  ││      │
│                                        ││   ────      ││    ││   ────      ││      │
│                                        ││ with CoFile ││    ││ with CoFile ││      │
│                                        │└────────────┘│    │└────────────┘│      │
│                                        └──────────────┘    └──────────────┘      │
│                                         −2°                 +1.5°                │
│                                        Two example firms · same page, each in    │
│                                        its own brand                             │
└──────────────────────────────────────────────────────────────────────────────────┘

PHONE
┌──────────────────────────────┐
│ Your name on the door.       │
│ Ours in small type.          │
│                              │
│ Your logo and color on every │
│ page your client sees.       │
│                              │
│ —  A link for each client    │
│ —  A page for every filing   │
│    you offer                 │
│ —  A button for your own     │
│    website                   │
│ —  Your registered agent,    │
│    or ours                   │
│ For firms →                  │
│                              │
│      ┌───────────┐           │
│   ┌──┴────────┐  │  the pair, fanned:
│   │┌═════════┐│  │  front −4°, back +4°;
│   ││[H&P] …  ││  │  swipe or tap to bring
│   ││Start    ││  │  the other forward
│   ││your NJ  ││  │
│   ││LLC      ││  │
│   ││[_____]  ││  │
│   ││(Continue││──┘
│   ││with CoF.││
│   │└─────────┘│
│   └───────────┘
│ Two example firms · same     │
│ page, each in its own brand  │
└──────────────────────────────┘
```

**Words.** H2 in `display-2`, broken by sentence onto two lines: "Your name on the door." / "Ours in small type." The second line is the same size and weight: the copy already makes the joke, and the design shouldn't nudge it. The lede in `lede` 24 px below. The four items in `body`, each preceded by a 12 × 1.5 px Kage dash (no ticks), 20 px apart. "For firms" as a text link in Ai with a small 16 px arrow glyph after it (the arrow moves 3 px right on hover).

**The picture: two phones, two letterheads (replaces `TwoFirmsVisual`).**

What it shows: the same client page ("Start your New Jersey LLC") under two example firms, each in its own brand, on two phones lying on the desk, so the reader sees what their client sees, where their client sees it.

- **The phones**: our neutral frame (7.4), 300 × 620 px each on desktop, 32 px apart, the left one at −2° and the right one at +1.5°, both with soft 09:30 shadows. The screens carry the gobo at half strength.
- **Harbor & Pine CPA page** (left): teal painted edge; head with the H&P emblem and the name in Lora; the heading "Start your New Jersey LLC" in Lora 600, 24 px; two fields labeled "Business name" and "Who owns it" (labels in Lora 16 px, the fields 48 px tall, Washi, 1 px Kage, radius 8 px); a full-width "Continue" button in teal with Washi text; the imprint "with CoFile" at the foot.
- **Northgate Payroll page** (right): brick painted edge; head with the Northgate gate wordmark (transparent PNG); everything else identical in structure but set in Montserrat, with the button in brick and its head band tinted with slate at 6%.
- **What stays identical**: the layout, the field sizes, and the imprint at exactly the same place and size on both screens. Seen side by side, the only differences are the firms' own name, logo, color and font. That is the whole message.
- **Caption**: "Two example firms · same page, each in its own brand", `micro`, under the pair.
- **Motion**: M3, "Ink soaks in" (8.4). On phone the pair is fanned like two cards in a hand (front at −4°, back at +4°, offset 28 px right and 20 px up); a swipe or a tap lifts the back phone, carries it over and lands it in front (spring, 8.3). Both heads are always visible.
- **Try it with your own name (optional, desktop and phone)**: under the caption, one small field and a color well, with labels `[copy needed: a field label for your firm's name]` and `[copy needed: a label for your color]`. Typing changes the left phone's head to the typed name in Lora (the default preset) and its painted edge and button to the chosen color, with the same ink soak. The imprint does not move. The name is kept in this browser tab only and reused at the close (M10). If the copy owner prefers no new labels, this control is simply left out.
- **States**: default; mid-animation; reduced motion (both phones already branded); dark mode (the phones' screens stay paper-light, since the client's page is paper).

### 9.3 Requests: from the bakery to your desk

**Copy, in order:** H2 "Your client sends a text. Nobody retypes it." / lede "Forward the text, email, WhatsApp or Slack message. AI drafts the filing, your saved answers fill in the rest, and your team checks it."

```
DESKTOP
┌──────────────────────────────────────────────────────────────────────────────────┐
│  ┌─────────────────────┐                                                         │
│  │ (photo print, white │      ┌═══════════════════════════════╗                  │
│  │  border: Ana at the │      │[H&P] Draft: New Jersey LLC    │                  │
│  │  bakery counter at  │      │      formation  ● For your    │                  │
│  │  6 a.m., flour on   │      │                 team to check │   Your client    │
│  │  her hands)         │      ├───────────────────────────────┤   sends a text.  │
│  │          ┌────────┐ │ ───▶ │Business name                  │   Nobody         │
│  │          │ ╭────╮ │ │ slip │TWO SISTERS BAKERY LLC [from…] │   retypes it.    │
│  │          │ │Need│ │ │ ───▶ │Members                        │                  │
│  │          │ │an  │ │ │ slip │Ana Ortiz, Lucia Ortiz (50/50) │   Forward the    │
│  │          │ │LLC…│ │ │ ───▶ │City                           │   text, email,   │
│  │          │ ╰────╯ │ │ slip │Jersey City, NJ     [from the…]│   WhatsApp or    │
│  └──────────┤ phone  ├─┘      │Registered agent               │   Slack message. │
│             └────────┘        │Your saved agent [already fil…]│   AI drafts the  │
│                               │Organizer and signer           │   filing, your   │
│                               │Your saved answers [already …] │   saved answers  │
│                               └───────────────────────────────┘   fill in the    │
│                                                                    rest, and your│
│                                                                    team checks it│
└──────────────────────────────────────────────────────────────────────────────────┘

PHONE
┌──────────────────────────────┐
│ Your client sends a text.    │
│ Nobody retypes it.           │
│ Forward the text, email,     │
│ WhatsApp or Slack message. … │
│                              │
│ ┌──────────────────────────┐ │  photo print, 4:5,
│ │ (Ana at the counter)     │ │  white border
│ │          ┌──────────┐    │ │
│ │          │╭────────╮│    │ │  phone overlaps the
│ │          ││Need an ││    │ │  print's lower right
│ │          ││LLC for…││    │ │
│ └──────────┤╰────────╯├────┘ │
│            └────┬─────┘      │
│                 ▼  slips fall│
│ ┌══════════════════════════╗ │
│ │[H&P] Draft: New Jersey   │ │
│ │ LLC formation            │ │
│ │ ● For your team to check │ │
│ │ Business name            │ │
│ │ TWO SISTERS BAKERY LLC   │ │
│ │ ▓ from the text          │ │
│ │ …                        │ │
│ └──────────────────────────┘ │
└──────────────────────────────┘
```

**Words**: right on desktop (cols 9 to 12, narrow and tall; the picture takes cols 1 to 8 this time because it needs width for the journey), top on phone. H2 broken by sentence. Lede at `lede`.

**The picture: from the bakery to your desk (replaces `TextToFormVisual`).**

What it shows: a client's text, sent from her world (the bakery at dawn), becoming a drafted filing on your desk, with nobody typing.

- **The photo print**: from the bakery set (7.3), Ana at the counter at 6 a.m., flour on her hands, typing with her thumb, softly out of focus behind her hands. It is presented as a photographic print lying on the desk: a 12 px white border, a 2° rotation, its own shadow, 400 × 500 px on desktop. Her world and your desk are two different lights; the print keeps its own dawn color.
- **The phone**: our neutral frame, 220 × 450 px, lying across the print's lower-right corner, so it overlaps the print and the desk. On its screen: a messaging thread in a neutral style of our own (not any real messaging app's look): a grey bubble (`#E9EAEC`, radius 20 px with one 6 px corner) holding "Need an LLC for the bakery. It's me and my sister, 50/50, in Jersey City." in Whitney 17 px, and under it "Ana Ortiz · text message · example" in `micro`, Usuzumi.
- **The draft sheet**: a sheet of Harbor & Pine letterhead with a compact 56 px head (teal edge, emblem at 28 px). Title "Draft: New Jersey LLC formation" in Lora 22 px; beside it the chip "For your team to check" (neutral chip with an Ai dot). Five rows, each a label in Whitney 15 px Usuzumi over a value in Typewriter 17 px Sumi, with a small source tag at the right:
  - "Business name" / "TWO SISTERS BAKERY LLC" / "from the text"
  - "Members" / "Ana Ortiz, Lucia Ortiz (50/50)" / "from the text"
  - "City" / "Jersey City, NJ" / "from the text"
  - "Registered agent" / "Your saved agent" / "already filled"
  - "Organizer and signer" / "Your saved answers" / "already filled"
- **The two kinds of value**: values "from the text" carry a soft Asa highlighter swipe behind them, the same swipe that marked the phrase in Ana's bubble, so the eye joins phrase to field without any arrow. Values "already filled" are typed in Ai ink, the color of your own saved answers. The source tags repeat the distinction: "from the text" on an Asa tag, "already filled" on a Paper back tag with Ai text.
- **The slips**: during M4, the phrases "for the bakery", "me and my sister, 50/50" and "in Jersey City" lift out of the bubble as three small Washi slips (the phrase in Whitney 14 px) and travel on arcs to their rows. At rest (and in reduced motion) the slips are gone and only the highlights remain, in both places.
- **No arrow**: the stand-in's down arrow is replaced by the journey itself. At rest, a faint dotted path (1 px, Kage, 4 px dashes) traces the arc from bubble to sheet, like the trail a paper plane leaves in a children's book. Only at rest.
- **Motion**: M4, "Words become fields", with a small replay button (a 32 px round icon button at the picture's lower right, accessible name `[copy needed: Replay]`).
- **States**: before (bubble only), during, at rest, reduced motion (at rest). Dark mode: the print and the phone screen keep their own light; the sheet stays paper.

**Why it sells**: the reader watches the words move by themselves from the client's phone into the right boxes. "Nobody retypes it" is literally what happens on screen.

### 9.4 The proof: the proof on the printer's proof

**Copy, in order:** H2 "Nothing is filed or paid until you approve the proof." / lede "One page: every detail, every fee." / three items "The state's own review page, where possible", "Every fee checked again before paying", "Any later change comes back for approval" / link "How it works".

```
DESKTOP
┌──────────────────────────────────────────────────────────────────────────────────┐
│                                       ┌ ┬ ┬ ┐ printer's proof of H&P cards       │
│  Nothing is filed or paid          ┌══╧═╧═╧═══════════════════════════╗ (P3)    │
│  until you approve the proof.      │[H&P] Harbor & Pine CPA           │  ✎      │
│                                    │      example firm                │ pencil  │
│  One page: every detail,           ├──────────────────────────────────┤         │
│  every fee.                        │ Two Sisters Bakery LLC  ● Ready   │         │
│                                ①   │ Business name   TWO SISTERS BAK… │         │
│  —  The state's own review page,   │ Members         Ana Ortiz, Luci… │         │
│     where possible                 │ Main business   88 Grove St, Je… │         │
│  —  Every fee checked again    ②   │ Formation filing fee     $100.00 │         │
│     before paying                  │ NJ portal fee, by card     $3.50 │         │
│  —  Any later change comes         │ ───────────────────────────────  │         │
│     back for approval              │ Total to the state       $103.50 │         │
│                                    │ ═══════════════════════════════  │         │
│  How it works →                ③   │ ┌ New Jersey's own review page, ┐ │         │
│                                    │ │ filled in   [neutral screen]   │ │         │
│                                    │ └────────────────────────────────┘ │         │
│                                ④   │ (      Approve for filing       ) │         │
│                                    │              ────                │         │
│                                    │           with CoFile            │         │
│                                    └──────────────────────────────────┘         │
│                                    Sample proof · test details · not a real …   │
└──────────────────────────────────────────────────────────────────────────────────┘

PHONE
┌──────────────────────────────┐
│ Nothing is filed or paid     │
│ until you approve the proof. │
│ One page: every detail,      │
│ every fee.                   │
│ —  The state's own review …  │
│ —  Every fee checked again … │
│ —  Any later change comes …  │
│ How it works →               │
│                         ┌┬┬┐ │  a sliver of the
│ ┌═══════════════════════┴┴┴╗ │  printer's proof
│ │[H&P] Harbor & Pine CPA   │ │
│ │ Two Sisters Bakery LLC   │ │
│ │ ● Ready to approve       │ │
│ │① Business name           │ │
│ │  TWO SISTERS BAKERY LLC  │ │
│ │  Members                 │ │
│ │  Ana Ortiz, Lucia Ortiz  │ │
│ │  (50/50)                 │ │
│ │② Formation filing fee    │ │
│ │                  $100.00 │ │
│ │  …    Total   $103.50    │ │
│ │③ [review page print]     │ │
│ │④ ( Approve for filing  ) │ │
│ │       with CoFile        │ │
│ └──────────────────────────┘ │
│ Sample proof · test details ·│
│ not a real business          │
└──────────────────────────────┘
```

**Words**: left (cols 1 to 4). H2 broken by sense: "Nothing is filed or paid / until you approve the proof." The three items with Kage dashes; "How it works" as an Ai link with its arrow.

**The picture: the proof on the printer's proof (replaces `ProofVisual`).**

What it shows: the proof that the firm approves, lying on top of a printer's proof of the same firm's business cards. The comparison needs no words: a firm owner has approved proofs at the printer before, and this is one more, as well made.

- **Under it**: plate P3, the letterpress proof sheet of Harbor & Pine CPA's business cards with crop and registration marks, rotated +4°, its upper-right corner showing beyond the proof, and the pencil lying across it.
- **The proof sheet**: Washi, 560 px wide on desktop, rotated −1°, in the 11:30 light (shadow almost straight down). Painted edge in teal; 96 px head with the H&P emblem, "Harbor & Pine CPA" in Lora, and "example firm" under it in `micro` Usuzumi.
- **Title row**: "Two Sisters Bakery LLC" in Lora 600, 28 px, with the chip "Ready to approve" (neutral chip, Ai dot) at its right; on phone the chip drops under the title.
- **Block 1, the details**: a two-column table, labels in Whitney 15 px Usuzumi (40% of the width), values in Typewriter 17 px Sumi: "Business name" / "TWO SISTERS BAKERY LLC"; "Members" / "Ana Ortiz, Lucia Ortiz (50/50)"; "Main business address" / "88 Grove St, Jersey City NJ 07302". The two values the stand-in marks (the name and the address) get the Asa highlighter swipe, as if the firm owner had run a highlighter over the details that matter most. Rows 44 px, hairlines between. On phone, labels sit above values.
- **Block 2, the fees**: "Formation filing fee" $100.00; "NJ portal fee, by card" $3.50; "Total to the state" $103.50. Tabular figures aligned on the decimal point; a 1 px rule above the total; a double rule below it; the total in Whitney Semibold.
- **Block 3, the state's page**: "New Jersey's own review page, filled in" as a small caption in `micro` Usuzumi, above a print of the state's page: a neutral grey screen frame (7.4) presented like a contact print pasted onto the proof, white border, 1° off square, a tiny shadow. Inside: "Business Name" / "TWO SISTERS BAKERY" and "Designator" / "LLC", plain grey fields with Typewriter values. No state colors, crest or layout.
- **Block 4, the button**: "Approve for filing", full width of the sheet's content, 56 px, teal with Washi text, radius 10 px. On CoFile's own page, it is pressable (M5).
- **The proofreader's numerals**: ①②③④ in the left margin, drawn in soft Kaki pencil (5.1), 28 px, one beside each block, the way a printer's proof is marked up. On phone they sit inside the sheet's margin at the left of each block. Hovering a numeral (or the matching list line on the left) puts a gentle patch of light on that block.
- **The foot**: the imprint.
- **Caption**: "Sample proof · test details · not a real business".
- **Dropped from the stand-in**: the "New Jersey payment screen · $103.50 · Matches the proof" strip. The second list item already says "Every fee checked again before paying" in words, and a picture built around matching is exactly what the brief asks me not to make. The picture stays about the firm owner approving their own well-made page.
- **States**: at rest; pressed and folding (M5); refilled; reduced motion (pressing shows the folded letter as a still for 1.2 s, then the sheet again). Dark mode: the sheet and the printer's proof stay paper on the dark desk.

**Why it sells**: "you stay in charge" is shown as something calm and familiar, the same gesture as approving business cards at the printer, and one press is all it takes.

### 9.5 After: coming home

**Copy, in order:** H2 "Then it's filed, and the papers come back to you." / three items "The state's documents, saved and sent to you", "CoFile applies for the EIN and keeps the IRS letter", "An update at each stage".

```
DESKTOP
┌──────────────────────────────────────────────────────────────────────────────────┐
│     ╱‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾╲  flap open                                              │
│    ┌──────────────────────┐   ┌─────────────┐                                    │
│    │  ┌───────────────┐   │  ╱ New Jersey   ╲     Then it's filed,               │
│    │  │Harbor & Pine  │   │ │ Certificate of │    and the papers                 │
│    │  │CPA   (window) │ ┌─┴─┤ Formation      │    come back to you.              │
│    │  └───────────────┘ │IRS│ TWO SISTERS…   │                                   │
│    │      envelope      │EIN│ ≡≡≡≡≡≡≡≡≡      │    —  The state's documents,      │
│    └────────────────────┤letter              │       saved and sent to you       │
│      ▭ Approved         │(CP 575)            │    —  CoFile applies for the EIN  │
│      ▭ Submitted        │EIN 00-0000000      │       and keeps the IRS letter    │
│      ▭ Filed            │≡≡≡≡≡≡≡             │    —  An update at each stage     │
│   ┌══ TWO SISTERS ══┐   └────────────────────┘                                   │
│   │   BAKERY LLC    │ the record, in its paper band                              │
│   └═════════════════┘                                                            │
│    Example record · sample documents                                             │
└──────────────────────────────────────────────────────────────────────────────────┘

PHONE
┌──────────────────────────────┐
│ Then it's filed, and the     │
│ papers come back to you.     │
│ —  The state's documents,    │
│    saved and sent to you     │
│ —  CoFile applies for the    │
│    EIN and keeps the IRS …   │
│ —  An update at each stage   │
│                              │
│  ┌────────────────────────┐  │
│  │ envelope, flap open    │  │
│  │ ┌ Harbor & Pine CPA ┐  │  │
│  └─┴───────┬─────────────┘  │
│    ┌───────┴──────┐ ┌─────┐ │  two documents
│    │ New Jersey   │ │ IRS │ │  fanned
│    │ Certificate  │ │ EIN │ │
│    │ of Formation │ │ let…│ │
│    └──────────────┘ └─────┘ │
│  ▭ Approved ▭ Submitted     │
│  ▭ Filed                    │
│  Example record · sample    │
│  documents                  │
└──────────────────────────────┘
```

**Words**: right (cols 9 to 12). H2 broken after the comma: "Then it's filed, / and the papers / come back to you." on desktop.

**The picture: coming home (replaces `PapersVisual`).**

What it shows: the filed record coming back to the firm, as real paper does: an envelope addressed to the firm, the state's document and the IRS letter fanned out of it, and the record bound with a paper band.

- **The envelope**: plate P4, a #10 window envelope, flap open. Through the window shows the top third of a folded letter, and on it "Harbor & Pine CPA" in Lora, Sumi. This is the mark's idea made real: the head of the tri-folded letter, showing the firm's name through the window.
- **The two documents**: two Washi sheets fanned out of the envelope (−4° and +3°), each drawn plainly in our type, with nothing that looks official:
  - "New Jersey" (a `micro` label in Usuzumi at the top left), "Certificate of Formation" in GT Alpina 22 px, "TWO SISTERS BAKERY LLC" in Typewriter 15 px, then six greyed lines of text drawn as 1 px Kage rules of varied length.
  - "IRS", "EIN letter (CP 575)", "EIN 00-0000000", and greyed lines.
  - No seals, crests, eagles, signatures, form numbers or letterhead of any government. The labels come from the stand-in.
- **The record**: a slim stack of sheets bound with a 40 mm band of pale kozo washi. On the band, "TWO SISTERS BAKERY LLC" in Typewriter 14 px, Sumi. The obi is how a Japanese stationer hands over a finished set: everything for one client, in one place.
- **The updates**: three small slips (Paper back, 140 × 36 px) lying on the envelope's corner, each with a leaf dot and its word: "Approved", "Submitted", "Filed". They replace the stand-in's ticked list, without ticks.
- **Caption**: "Example record · sample documents".
- **Light**: 13:30, from above and slightly right; the shadows have turned.
- **Motion**: M6, "Coming home", with the replay button.
- **States**: arriving, at rest, reduced motion (at rest), dark mode (all paper stays paper).

**Why it sells**: this is the reward. The work goes out once and comes back to the firm complete, addressed to it, in good order.

### 9.6 Coverage: four cards

**Copy, in order:** H2 "The filings your clients already ask you for." / lede "New York, New Jersey, Florida and the IRS." with the link "See which are live today".

```
DESKTOP
┌──────────────────────────────────────────────────────────────────────────────────┐
│  The filings your clients already ask you for.                                   │
│  New York, New Jersey, Florida and the IRS. See which are live today →           │
│                                                                                  │
│  ┌──────────────────┐ ┌──────────────────┐ ┌──────────────────┐ ┌─────────────┐ │
│  │ New York         │ │ New Jersey       │ │ Florida          │ │ IRS         │ │
│  │ ──────────────── │ │ ──────────────── │ │ ──────────────── │ │ ─────────── │ │
│  │ LLC formation  ▯ │ │ LLC formation  ◧ │ │ LLC formation  ◧ │ │ EIN, with   │ │
│  │ Corporation    ▯ │ │ Standing       ◧ │ │ Corporation    ◧ │ │ the IRS   ▯ │ │
│  │  formation       │ │  certificate     │ │  formation       │ │ letter      │ │
│  │ Payroll regis… ▯ │ │ Payroll regis… ▯ │ │ Limited        ◧ │ │             │ │
│  │ LLC changes …  ▯ │ │ Corporation    ▯ │ │  partnership     │ │             │ │
│  │ Copies and …   ▯ │ │  formation       │ │                  │ │             │ │
│  │ Application …  ▯ │ │                  │ │                  │ │             │ │
│  │ Assumed name … ▯ │ │                  │ │                  │ │             │ │
│  └──────────────────┘ └──────────────────┘ └──────────────────┘ └─────────────┘ │
│   ■ Live    ◧ Rehearsed to the payment screen    ▯ Screens recorded or offered,  │
│                                                    rehearsal next                │
└──────────────────────────────────────────────────────────────────────────────────┘

PHONE: the four cards stacked, New York first, each full width; the legend under the last card.
```

**Words**: H2 at `display-2`, one line on desktop; the lede and its link in `lede`, the link in Ai with its arrow.

**The picture: four cards (replaces `StateTiles`).**

What it shows: every filing type CoFile handles, by place, with where each stands, laid out like four index cards dealt onto the desk.

- **The cards**: Washi, equal height (set by New York, the longest), 3 columns each on desktop, 24 px apart, rotations of −0.6°, +0.4°, −0.3° and +0.7° so they look laid by hand. 14:30 light from the right. On tablet 2 × 2; on phone stacked, full width, not rotated.
- **Card head**: the place's name in GT Alpina, `display-3`, then a 1 px Sumi rule. Plain type only: no state shapes, flags, seals or colors. The IRS card is the same as the others.
- **Rows**: each filing's short name from the coverage list in Whitney 17 px, Sumi, 44 px rows with hairlines, and its stage glyph (11.6) right-aligned, 18 px. Planned filings are left out, as in the stand-in. The rows, in order: New York: "LLC formation", "Corporation formation", "Payroll registration (NYS-100)", "LLC changes and dissolution", "Copies and certificate of status", "Application for Authority", "Assumed name (DBA)". New Jersey: "LLC formation", "Standing certificate", "Payroll registration (NJ-REG)", "Corporation formation". Florida: "LLC formation", "Corporation formation", "Limited partnership". IRS: "EIN, with the IRS letter". Live status comes from the live switch, so these glyphs change without a redesign.
- **The glyph says it, not the color**: each row's glyph also carries the full stage label as its accessible name and as a tooltip ("Live", "Rehearsed to the payment screen", "Screens recorded, rehearsal next", "Offered, not yet rehearsed").
- **Legend**: under the cards, in `small`, each glyph with the stand-in's three labels: "Live", "Rehearsed to the payment screen", "Screens recorded or offered, rehearsal next".
- **Motion**: M7, "Cards dealt".
- **States**: today's mix; a future state where most glyphs are full ink (the design gets more confident as more filing types go live, without changing).

### 9.7 Rehearsals: the run sheet

**Copy, in order:** H2 "In beta: rehearse a filing, free." / lede "CoFile fills in every screen of the state's real website and stops before the last button: nothing is filed or paid. Filing types go live one at a time."

```
DESKTOP
┌──────────────────────────────────────────────────────────────────────────────────┐
│                                      ┌─┐┌─┐┌─┐┌─┐┌─┐┌─┐┌┄┐  seven screen frames   │
│  In beta: rehearse                   └─┘└─┘└─┘└─┘└─┘└─┘└┄┘  lit one by one       │
│  a filing, free.                  ┌═══════════════════════════════════╗          │
│                                   │ [Rehearsal]                       │          │
│  CoFile fills in every screen     │ Rehearsal · New Jersey LLC        │          │
│  of the state's real website      │ formation              test details│          │
│  and stops before the last        ├───────────────────────────────────┤          │
│  button: nothing is filed or      │ Business name ········ filled     │          │
│  paid. Filing types go live       │ Name check ··········· passed     │ ◀ light  │
│  one at a time.                   │ Registered agent ····· filled     │          │
│                                   │ Members and signatures  filled    │          │
│                                   │ Review page ·· matched the proof  │          │
│                                   │ Payment: $103.50  matches the pr… │          │
│                                   │ Pay Now ········ held, on purpose │ (Kaki)   │
│                                   └───────────────────────────────────┘          │
│                                   Rehearsal · nothing filed, nothing paid        │
└──────────────────────────────────────────────────────────────────────────────────┘

PHONE: H2, lede; a seven-segment strip; the run sheet full width; caption.
```

**Words**: left (cols 1 to 4). H2 broken as "In beta: rehearse / a filing, free."

**The picture: the run sheet (replaces `RehearsalLog`).**

What it shows: one rehearsal, from start to finish, typed out like a theatre's run sheet or a printer's job ticket. Calm, complete, nothing at stake.

- **The sheet**: Washi, 480 × 560 px on desktop, with a faint trial-print hatch across it (4.4) and a Kaki "Rehearsal" chip in its head. Head: "Rehearsal · New Jersey LLC formation" in Whitney Semibold 17 px and, at the right, "test details" in `micro` Usuzumi.
- **Rows**: the step in Whitney 16 px on the left, the result in Typewriter 15 px on the right, joined by dot leaders (a row of 1 px dots, 4 px apart, Kage), the classic typesetting of a cue sheet or a table of contents. The rows from the stand-in: "Business name" filled; "Name check" passed; "Registered agent" filled; "Members and signatures" filled; "Review page" matched the proof; "Payment: $103.50" matches the proof; "Pay Now" held, on purpose. The last result is set in Kaki deep (`#DB7A3C`), the rehearsal color, as the end of a run-through, not a warning.
- **The screen frames**: above the sheet, seven small neutral screen frames (56 × 40 px) in a row like a contact strip, one per row of the sheet, each lighting up warm as its row types (M8). The seventh, for "Pay Now", is drawn with a dashed Kaki outline and stays unlit: the last button, untouched.
- **Caption**: "Rehearsal · nothing filed, nothing paid".
- **Motion**: M8, "The light passes".
- **States**: typing, complete, reduced motion (complete, in warm light).

**Why it sells**: a rehearsal looks like what it is, a complete performance on the real stage, warm and free. The most generous color on the site is on it.

### 9.8 Pricing: the rate card

**Copy, in order:** H2 "$45 a filing. EIN included with a formation." / four price items: "Pay as you go" with "per live filing", "$25" with "an EIN on its own", "$15" with "copies and certificates", "Plans from $250" with "a month for 6 filings" / note "State fees separate. Rehearsals free. See all plans" / security line "Social Security numbers encrypted and deleted 30 days after the filing. Saved cards held in a card vault, never in our database. Security".

```
DESKTOP
┌──────────────────────────────────────────────────────────────────────────────────┐
│  $45 a filing. EIN included with a formation.                                    │
│                                                                                  │
│   ┌──────────────────────────────────────────────────────────────────────────┐   │
│   │  Pay as you go    │      $25          │      $15          │ Plans from    │   │
│   │                   │                   │                   │    $250       │   │
│   │  per live filing  │ an EIN on its own │ copies and        │ a month for   │   │
│   │                   │                   │ certificates      │ 6 filings     │   │
│   └──────────────────────────────────────────────────────────────────────────┘   │
│     thick cotton card, letterpress figures, raking light from the right           │
│                                                                                  │
│   State fees separate. Rehearsals free. See all plans →                          │
│                                                                                  │
│   Social Security numbers encrypted and deleted 30 days after the filing.        │
│   Saved cards held in a card vault, never in our database. Security →            │
└──────────────────────────────────────────────────────────────────────────────────┘

PHONE
┌──────────────────────────────┐
│ $45 a filing. EIN included   │
│ with a formation.            │
│ ┌──────────────────────────┐ │
│ │ Pay as you go            │ │
│ │ per live filing          │ │
│ │ ──────────────────────── │ │
│ │ $25   an EIN on its own  │ │
│ │ ──────────────────────── │ │
│ │ $15   copies and         │ │
│ │       certificates       │ │
│ │ ──────────────────────── │ │
│ │ Plans from $250          │ │
│ │ a month for 6 filings    │ │
│ └──────────────────────────┘ │
│ State fees separate. …       │
│ Social Security numbers …    │
│ Security →                   │
└──────────────────────────────┘
```

**Words**: the H2 across the top, `display-2`, one line on desktop; "$45" is set in the same size as the rest of the line. The figure is already the first word; it doesn't need to shout.

**The picture: the rate card (new, replacing the plain price strip).**

What it shows: the prices printed on a thick card, the way a good stationer prints a price list. Plain, confident, nothing hidden.

- **The card**: plate P5, 600 gsm cotton board, spanning cols 2 to 11 on desktop (about 960 × 240 px), lying flat with its thick edge catching the 16:15 raking light. On phone it turns portrait, full width.
- **Four compartments** divided by 1 px Kage rules (horizontal rules on phone):
  - "Pay as you go" in `display-3` (it is a name, not a figure), with "per live filing" under it in `small` Usuzumi.
  - "$25" in `figure-xl`, with "an EIN on its own".
  - "$15" in `figure-xl`, with "copies and certificates".
  - "Plans from $250": "Plans from" in Whitney Medium 17 px above "$250" in `figure-xl`, with "a month for 6 filings".
- **Letterpress**: the figures are pressed into the board (7.6), the only pressed effect on the site.
- **Under the card**: "State fees separate. Rehearsals free. See all plans" in `small`, Usuzumi, with "See all plans" as an Ai link and arrow, 32 px below the card.
- **The security line**: 48 px further down, alone, in `small` Usuzumi, max 44 em: "Social Security numbers encrypted and deleted 30 days after the filing. Saved cards held in a card vault, never in our database." followed by "Security" as an Ai link and arrow. No icon, no lock, no shield, no box around it. It is easy to find for whoever looks for it, and it doesn't compete with the prices.
- **Motion**: M9, "The press".

### 9.9 Close: a blank letterhead at golden hour

**Copy, in order:** H2 "Run one rehearsal. Then decide." / lede "Try it on a filing you know by heart. Questions? hello@cofile.app" / button "Run a free rehearsal".

```
DESKTOP
┌──────────────────────────────────────────────────────────────────────────────────┐
│ ░░░░░░░░░░░░░ long golden shadow of the window frame, from the right ░░░░░░░░░░░ │
│                     ┌──────────────────────────────────────────┐   ✒ pen         │
│                     │                                          │                 │
│                     │            (the head: empty)             │                 │
│                     │                                          │                 │
│                     ├──────────────────────────────────────────┤                 │
│                     │                                          │                 │
│                     │   Run one rehearsal.                     │                 │
│                     │   Then decide.                           │                 │
│                     │                                          │                 │
│                     │   Try it on a filing you know by heart.  │                 │
│                     │   Questions? hello@cofile.app            │                 │
│                     │                                          │                 │
│                     │   ( Run a free rehearsal )               │                 │
│                     │                                          │                 │
│                     │                  ▆                       │  ← the mark,    │
│                     └──────────────────────────────────────────┘    small        │
└──────────────────────────────────────────────────────────────────────────────────┘

PHONE: plate P6 in 4:5; the sheet full width minus 20 px, its head empty; the type and a full-width button on the sheet.
```

**The picture (new).** Plate P6, golden hour, full bleed, with one blank sheet of letterhead at the center, at +1°. The words are printed on the sheet itself, below its empty head.

- **The sheet**: Washi, 640 × 620 px on desktop, its painted edge left unpainted (plain paper edge) and its 96 px head completely empty. This is the mark at full size: a letterhead with the head left for you.
- **Type on the sheet**: the H2 in `display-2`, Sumi, broken by sentence; the lede in `lede`, with hello@cofile.app as an Ai link; the primary Kaki button 40 px below. On phone the button is full width.
- **The foot**: the CoFile mark alone, 20 px, Usuzumi, centered. No words.
- **If the visitor typed their firm's name** in the firms picture (9.2), the empty head now carries it, typed in GT Alpina at 26 px with the chosen color on the painted edge (M10). Otherwise it stays empty, and that emptiness is the invitation.
- **Light**: 17:00, low from the right, warm, long shadows reaching left across the desk and over the sheet's lower half.
- **The phone thumb bar** (6.4) sinks away here, because the sheet has its own button.

**Why it sells**: the page ends at the end of a good working day, on a sheet of letterhead waiting for your firm's name. "Then decide" has its answer in the picture.

### 9.10 Footer

**Copy**: "CoFile · the filing desk behind your firm" / "New York · New Jersey · Florida · IRS" / "Building a filing product? CoFile for platforms" / "CoFile is not a law firm or a government agency, isn't affiliated with any state or the IRS, and doesn't give legal or tax advice." / "Terms · Privacy · Security · FAQ · hello@cofile.app".

The footer is the desk at dusk: Shade ground (`#E3E6E6`), no gobo, a 1 px Kage rule at the top. Desktop: the mark (24 px) and the first line on the left, the places in the center, the platforms line on the right, all `small` Usuzumi; 32 px below, the legal line in `micro` across cols 1 to 8 and the links on the right, separated by middle dots, underlined on hover. Phone: everything stacked, left-aligned, 16 px apart, links on their own line at 48 px tap height. 96 px top padding, 48 px bottom plus the safe area.

---

## 10. The other pages

### 10.0 The page head shared by the seven pages

Each of the seven pages opens with the copy's `PageHead`: a kicker, an H1 and a short lede. They share one composition, on the desk, with that page's hour of light (2):

- Kicker in `kicker` with its hairline, H1 in `display-1` at a step smaller (60 / 66 px desktop, 38 / 44 px phone, because these titles are longer than the home page's), lede in `lede` at max 34 em.
- Desktop: the words in cols 1 to 7; cols 9 to 12 hold that page's **head picture** where it has one (listed below), otherwise ma.
- 128 px above (under the header) and 96 px below on desktop; 64 and 48 on phone.
- The header shows the current page with its small ribbon mark (9.0). The beta banner shows on all seven pages, as the code already does.
- Sections inside the pages reuse the home page's compositions and components. Where a page reuses a home-page picture, it is the same component, usually larger and with more detail, never a different drawing of the same thing.

### 10.1 How it works (`/how-it-works`) · mid-morning, 09:30

**Head**: kicker "How it works" / H1 "Your client asks. You approve it. CoFile files it." / lede "Three steps. Your client hands the job to you, and you sign off before anything is filed." The H1 is set one sentence per line on desktop, so the three steps read as three lines. No head picture: the steps below are the picture.

**Steps (`#steps`): the triptych.** Three sheets laid side by side on the desk across all twelve columns, one per step, each holding a small picture and the step's words beneath it, on the desk.

```
DESKTOP
┌──────────────────────────────────────────────────────────────────────────────────┐
│  ┌───────────────┐       ┌───────────────────┐        ┌───────────────┐          │
│  │ (phone with   │       │ (the proof, its   │        │ (envelope     │          │
│  │ the firm's    │       │  head in teal; a  │        │  coming home, │          │
│  │ client form   │       │  hand with a      │        │  papers       │          │
│  │ and a text)   │       │  pencil above it) │        │  fanned)      │          │
│  └───────────────┘       └───────────────────┘        └───────────────┘          │
│  Your client asks.       You approve it.               CoFile files it.          │
│  They fill in a short    You get the proof: one        It fills in the state's   │
│  form from your link, …  page with your firm's …       own website screen by …   │
└──────────────────────────────────────────────────────────────────────────────────┘
```

- Step leads "Your client asks.", "You approve it.", "CoFile files it." in GT Alpina 30 px; the paragraphs under them in `body`, unchanged.
- The middle sheet, "You approve it.", is larger (5 columns against 3 and 3) and lifted 6 px with a deeper shadow: the firm is in charge of the middle step, and the layout says so. It is the only step with a photograph: a firm owner's hand holding a pencil above the proof (from the firm-owner set, 7.3).
- On phone: the three steps stacked, joined by a fine dotted path (the trail of the sheet), the middle step full width and the outer two inset by 16 px.
- Motion: as each sheet enters, it lands (lift-move-land, 90 ms apart). The pencil in the photograph doesn't move.

**The proof (`#proof`)**: H2 "You see what the state will see, before the state does." with the long lede ("You've approved a proof before: business cards, letterhead, an invitation at the printer. …") and the six list items. The picture is the proof on the printer's proof (9.4), larger (680 px sheet), with the proofreader's numerals ① to ⑥ now matching the six list items: ① the details block ("Every name, address and answer, in the order the state asks for them"), ② the fees ("Every fee in dollars and cents, from a verified fee table"), ③ the state's page print, ④ a statements block added to the sheet for this page (each statement on the form and who made it, shown as two greyed lines with a small label `[copy needed: one example statement]`), ⑤ the button ("One button. Until it's pressed, nothing is submitted and nothing is paid."), ⑥ a pencilled bracket around the whole sheet for "Like reviewing a return before you e-file it: nothing goes to the state until you've signed off." Hovering a list item lights its part of the sheet. The list sits in cols 1 to 5 beside the sheet, each item numbered with its pencil numeral instead of a tick. On phone the sheet comes first and each numbered item follows with a small crop of its part of the sheet beside it.

**Requests (`#requests`)**: H2 "Clients don't always fill in forms. They text you." and its lede, beside the same "From the bakery to your desk" picture (9.3).

**Checks (`#checks`)**: a quiet room on Shade, 96 px spacing. H2 "Checks before every filing." with its lede; the four items as a numbered list in `body`, numerals in GT Alpina 22 px Pale ink, hairlines between. No picture, no icons, no motion beyond a soft fade. In the fine-print item, "$52 for an LLC and $27 for a corporation" uses tabular figures.

**After (`#after`)**: H2 "The papers come back to you." with its lede ("Some states answer at once. Others take their time: …") and three items. The picture is new: **three envelopes, three speeds**. Three window envelopes lie on the desk in the early-afternoon light, each showing a place name through its window in Whitney Medium: "New Jersey" already open with its document out; "New York" closed, with a small receipt slip tucked under it; "Florida" closed and squared up, waiting. It shows the lede's idea, that states answer at different speeds, without a word of new copy. Caption: "Example record · sample documents".

**Close**: H2 "Run one rehearsal. Then decide." / lede "A rehearsal fills in every screen of the state's real website and stops before the last button. It's free, and nothing is filed or paid." / buttons "Run a free rehearsal" (Kaki) and "Questions" (quiet). Set on a blank letterhead as on the home page, in this page's mid-morning light rather than gold.

### 10.2 For firms (`/for-firms`) · morning, 09:00

**Head**: kicker "For CPA, payroll, fractional CFO and title firms" / H1 "Form the business. Keep the client." / the long lede ("Your client needs an LLC. Who do they call? You. …"). **Head picture**: a portrait from the firm-owner set: the CPA at the door of her own office in morning light, her firm's name on the glass softly out of focus behind her (cols 8 to 12, 4:5, presented as a print with a white border). Alt text `[copy needed]`.

**Desk (`#desk`)**: H2 "Your filing desk, in your brand." and the five items, beside the filing desk picture (9.1) at a larger size, with a second, smaller sheet tucked under it: the same desk on a phone, in our phone frame, because firm owners check their desk on the go.

**Brand (`#brand`)**: H2 "Your name on the door. Ours in small type." and its lede ("The same page carries each firm's own name, logo and color. …"), beside the two-phones picture (9.2), with the "try it with your own name" control shown here by default.

**Agent (`#agent`)**: H2 "Your registered agent, or ours." with its lede and the three items (with their links to How it works and Pricing). Picture: a single slip from the draft sheet, enlarged and lying alone on the desk: "Registered agent" over "Your saved agent" in Ai ink, its tag "already filled". Small, quiet, exactly the point: it's filled in on every filing.

**Close**: H2 "Open your firm's filing desk." / lede "Add your logo and color, then rehearse a real filing on the state's own website. …" / "Run a free rehearsal". The close sheet here is the letterhead in setup: its head shows a dashed 1 px Kage rectangle where a logo goes and a small empty color well beside it, waiting. No new words in it.

### 10.3 What we file (`/what-we-file`) · midday, 12:00

**Head**: kicker "What we file" / H1 "New York, New Jersey, Florida and the IRS." / lede "Every filing type carries a plain label, so you always know which ones are live today." No head picture.

**Coverage (`#coverage`): the full table.** All sixteen rows, on one large Washi sheet spanning cols 1 to 12 (a ledger, laid on the desk).

```
DESKTOP
┌────────────────────────────────────────────────────────────────────────────────┐
│ Filing                                         Where        Where it stands     │
│ ───────────────────────────────────────────────────────────────────────────── │
│ LLC formation                                  New Jersey   ◧ Rehearsed to the  │
│                                                               payment screen    │
│ Standing certificate (through the API; not on  New Jersey   ◧ Rehearsed to the  │
│ the filing desk yet)                                          payment screen    │
│ …                                                                              │
│ Alternate name, charter amendments             New Jersey   ○ Planned           │
└────────────────────────────────────────────────────────────────────────────────┘
 Rehearsed to the payment screen: CoFile completed every screen …  Write to hello@cofile.app …
```

- Header row in `label` Usuzumi on Shade; rows 56 px, `body`, hairlines; the stage column shows the stage glyph and the stage label as a chip (11.6), with "Live" in full ink when the switch is on.
- Above the table, a quiet filter: five small toggle chips "New York", "New Jersey", "Florida", "IRS" (the place names, already copy) plus the default showing every row. The row order stays the copy's.
- On phone each row becomes a slip: the filing in Whitney Medium 17 px, "Where" under it in `small` Usuzumi, the chip on its own line. Slips are grouped visually only by a 24 px gap when the place changes.
- The note under the table, in `small` Usuzumi, max 60 em, with the email link in Ai.

**Live (`#live`)**: H2 "How a filing type goes live." with its lede, beside the run sheet (9.7).

**States (`#states`)**: H2 "State by state." and the four notes (h3 "New York", "New Jersey", "Florida", "IRS" with their paragraphs) on the same four index cards as the home page's coverage, now holding prose: card head in GT Alpina `display-3`, paragraph in `body`. Same rotations, same hand.

**Close**: H2 "Rehearse one you know by heart." / buttons "Run a free rehearsal" and "See pricing", on a blank letterhead in midday light.

### 10.4 Pricing (`/pricing`) · late afternoon, 16:00

**Head**: kicker "Pricing for firms" / H1 "$45 a filing. EIN included with a formation." / lede "Pay for each live filing, or take a plan with filings included every month. …" No head picture; the plans are the picture.

**Plans (`#plans`): four rate cards.**

```
DESKTOP
┌──────────────────────────────────────────────────────────────────────────────────┐
│ ┌──────────────┐ ┌──────────────┐ ┌──────────────┐ ┌──────────────┐               │
│ │Pay as you go │ │Starter       │ │Growth        │ │Unlimited     │  ← Growth     │
│ │              │ │              │ │ (lifted 8 px)│ │              │    lifted     │
│ │ $45          │ │ $250         │ │ $500         │ │ $1,000       │               │
│ │  a filing    │ │  a month     │ │  a month     │ │  a month     │               │
│ │No monthly fee│ │or $2,500 a   │ │or $5,000 a   │ │or $10,000 a  │               │
│ │Pay only for  │ │year (2 months│ │year (2 months│ │year (2 months│               │
│ │live filings. │ │free)         │ │free)         │ │free)         │               │
│ │──────────────│ │──────────────│ │──────────────│ │──────────────│               │
│ │— $25 for an  │ │— 6 filings a │ │— 15 filings a│ │— Unlimited   │               │
│ │  EIN on its  │ │  month       │ │  month       │ │  filings (fair│              │
│ │  own         │ │— $40 for each│ │— $33 for each│ │  use: 60 a   │               │
│ │— $15 for     │ │  filing past │ │  filing past │ │  month)      │               │
│ │  copies and  │ │  that        │ │  that        │ │— $15 for each│               │
│ │  certificates│ │— A filing    │ │— A filing    │ │  filing past │               │
│ │— A filing    │ │  professional│ │  professional│ │  fair use    │               │
│ │  professional│ │  takes over …│ │  takes over …│ │— Priority    │               │
│ │  takes over …│ │              │ │              │ │  help from a │               │
│ │              │ │              │ │              │ │  person      │               │
│ │              │ │              │ │              │ │— A filing …  │               │
│ └──────────────┘ └──────────────┘ └──────────────┘ └──────────────┘               │
│  Prices in US dollars, for partner firms. Building a filing product for many      │
│  businesses? Talk to us about platform pricing.                                   │
└──────────────────────────────────────────────────────────────────────────────────┘
```

- Each plan is a thick card (the rate card's stock, 7.6): plan name in `display-3`, the price in `figure-xl` letterpress with its unit ("a filing" or "a month") in Whitney 18 px beside the figure's baseline, the annual line or the no-fee line in `small` Usuzumi, a 1 px rule, then the items in `body` with Kage dashes.
- **Growth** (the plan the code already marks as the middle one) is lifted 8 px with a deeper shadow and a 4 px Kaki painted edge on its top: the one a stationer would put at the front of the counter. No badge, no new word.
- "A filing professional takes over when a filing needs one", the last line of every card, is set in Whitney Medium with, before it, the same three small round portraits as the hero (16 px each), so the people behind the line appear on every plan. If no portraits exist, the line stands alone.
- Phone: the cards stacked in the copy's order (Pay as you go, Starter, Growth, Unlimited), Growth still lifted and edged. A small sticky row of the four plan names at the top of the section lets the reader jump between cards.
- Under the cards: the note in `small`, with its platforms link.

**Counts (`#counts`)**: H2 "What counts as a filing." with its lede, beside the five items whose bold leads ("One filing:", "Included:", "An EIN on its own:", "Copies and certificates:", "Unused filings") are set in Whitney Semibold. Picture: a small still life of three slips on the desk, sized by weight: one whole slip, a half-width slip and a third-width slip, labeled with the figures already in the copy ("$45", "$25", "$15"). It shows "half a filing" and "a third of a filing" in paper, not in words.

**Separate (`#separate`)**: H2 "What's separate." with its four items, bold leads in Semibold. No picture.

**Close**: H2 "Start with a free rehearsal." / its lede / "Run a free rehearsal", on a blank letterhead in late-afternoon light.

### 10.5 Security (`/security`) · overcast, even light

**Head**: kicker "Security" / H1 "How we handle what you trust us with." / lede "Social Security numbers, cards and state logins, and how CoFile keeps each one." No head picture. On this page the light layer is overcast: no gobo, no warm wash, an even light from above. Calm and steady, never dramatic.

**Body**: the five items (h3 "Encrypted, masked SSNs", "Cards in a vault, logins encrypted", "Single-use links to the proof", "Signatures only on approval", "Separate accounts" with their paragraphs) set on one 760 px Washi sheet as a letter of explanation: h3 in Whitney Semibold 22 px, paragraphs in `body`, 48 px between items, hairlines between. No icons of any kind: no locks, keys, shields, vaults or ticks. Then the closing paragraph ("The checks CoFile runs on every filing … are on How it works. … Security questions: hello@cofile.app.") on the desk below the sheet in `lede`, with its three links in Ai.

On phone, the same sheet full width. That is the whole page: clear, well set, findable, and quiet.

### 10.6 Questions (`/faq`) · even midday light

**Head**: kicker "Questions" / H1 "Questions, answered." / lede "Something else? hello@cofile.app".

**Body**: the fourteen questions as folded notes, in one column 760 px wide.

- Each question is a slip of Washi, 72 px tall when closed: the question in Whitney Semibold 20 px, and at the right a small fold glyph (a 16 px sheet with its top-right corner folded down). Slips are 12 px apart, each with its own small shadow.
- Opening a question unfolds it (8.5): the slip grows to show the answer in `body`, the glyph's corner unfolds, and the slip lifts 2 px while open. Links inside answers are in Ai.
- Each slip keeps its id (`#beta`, `#rehearsal`, `#approves`, …). Arriving from a link opens that slip and lifts it, with a soft patch of light on it for 2 s.
- On phone the slips are full width, 64 px minimum, with the question wrapping freely.

### 10.7 For platforms (`/platforms`) · late afternoon, 16:30

**Head**: kicker "For platforms" / H1 "Building a filing product? Put CoFile underneath it." / lede "Filing companies, and platforms that sign up new businesses, can offer state filings inside their own product under their own brand. …"

**Head picture: underneath.** An exploded stack of three sheets floating a little above the desk, seen from slightly above, each casting its shadow on the one below:

1. On top, a platform's own product page carrying a white-label proof, under a placeholder brand: a neutral wordmark `[copy needed: an example platform name]` with a slate painted edge.
2. In the middle, the embeddable widget: the client form as it sits inside someone else's page, with "Filed with CoFile" at its foot.
3. At the bottom, the paper underneath it all: a sheet of Typewriter text showing a short request body taken from the API docs' quick start, with `"dryRun": true` highlighted in Asa.

On hover (desktop) or as it enters (phone), the layers part a further 24 px, then settle back: you see what is underneath. The bottom sheet is CoFile; it is literally underneath.

**Body (`#enterprise`)**: the five items (with `"dryRun": true` set in Typewriter on an Asa tint, and "Read the API docs" as an Ai link) on the left in cols 1 to 5; the inquiry form on a Washi sheet on the right in cols 7 to 12: "Name", "Company", "Work email", "Phone (optional)", "States you file in", "Filings per month", "What you'd like to do (optional)", "Send". Fields per 11.2; the two selects side by side on desktop, stacked on phone. The form sheet has no letterhead (it is CoFile's own form) and its foot carries the small mark alone.

### 10.8 Sign-up, log in, passwords and verification · morning

All of these are one sheet on the desk, centered, in the hero's 08:00 light (no drift). The header shows no section navigation, as the code already does. 128 px above the sheet on desktop, 32 px on phone, where the sheet is full width minus 20 px and starts right under the header.

**Sign-up (`/signup`)**: field label "For firms" / H2 "Set up your firm's filing desk" / lede "For firms that file for their clients. Confirm your email, put your name and logo on the door, and choose which card pays the state's fees. …" / the form: "Firm name", "Kind of firm" (with "Choose one", "CPA or accounting firm", "Payroll company", "Fractional CFO firm", "Title company", "Something else"), "Your name", "Work email", "Password", "Password again", the hint "At least 12 characters. A short sentence works well.", "Phone (optional)", "Website (optional)", "States you file in" (New York, New Jersey, Florida), "Filings per month", the terms checkbox, "Create account", and the notes under it.

```
DESKTOP
┌──────────────────────────────────────────────────────────────────────────────┐
│   ┌═══════════════════════════════╗        ┌──────────────────────────┐       │
│   │ (head: your firm's name,      │        │ For firms                │       │
│   │  typed live as you fill in    │        │ Set up your firm's       │       │
│   │  "Firm name")                 │        │ filing desk              │       │
│   ├───────────────────────────────┤        │ lede …                   │       │
│   │ Client filings                │        │ Firm name  [__________]  │       │
│   │ ┌───────────────────────────┐ │        │ Kind of firm [Choose one]│       │
│   │ │ Two Sisters Bakery LLC    │ │        │ Your name  [__________]  │       │
│   │ └───────────────────────────┘ │        │ Work email [__________]  │       │
│   │          with CoFile          │        │ …                        │       │
│   └───────────────────────────────┘        │ ( Create account )       │       │
│   Example · test details ·                 └──────────────────────────┘       │
│   not a real firm                                                             │
└──────────────────────────────────────────────────────────────────────────────┘
```

- **The form sheet** sits in cols 7 to 12; fields per 11.2, paired fields side by side on desktop.
- **The letterhead preview** sits in cols 1 to 5: a small filing desk (the hero's picture, 70% size) whose head is empty until you type in "Firm name". Then your firm's name is typed into the head, letter by letter as you type, in GT Alpina 22 px, with a Sumi painted edge (the color comes later, in Setup). "Your name on the door" happens while you are still signing up. It reads the field locally and sends nothing.
- **Phone**: the preview shrinks to a slim strip pinned under the header: just the painted edge and the head with your typed name, 56 px tall. The form follows.
- **After "Create account"**: the sheet folds in thirds and slides away (M5, shortened to 600 ms), and the "Check your email" page lays its own sheet down.

**Check your email (`/signup/sent`)**: field label "Your filing desk" / H2 "Check your email" / the lede and note. Picture: the paper-relief envelope with a letter half in (7.5), 200 px wide, above the heading.

**Confirm your email (`/verify-email`)**: field label "Your filing desk" / H2 "Confirm your email" / "One click and your email is confirmed." / "Confirm my email", or the resend variant ("Lost the email, or the link expired? …", "Email", "Send a new link"). The same sheet; on success the button's light sweep runs once and the next page lays its sheet down.

**Log in (`/login`)**: field label "Log in" / H2 "Welcome back" / lede "Firms go to their filing desk, platforms to their dashboard." / "Continue with Google" (a quiet full-width button with Google's own mark, used per Google's guidelines) / "Email", "Password", "Forgot your password?", "Log in" / "New here? Set up your firm's filing desk. Enterprise developers can also log in with an API key." The sheet is 480 px wide; the notices ("Your session ended. Log in again to carry on." and the others) appear as a slip laid on top of the sheet's head, Paper back with a 3 px left edge in Ai (or Beni for the Google errors).

**Forgot password / reset password** (`/forgot-password`, `/reset-password`): field labels "Forgot password" / "Reset password", H2 "Reset your password" / "Choose a new password", their ledes, fields and buttons ("Email me a reset link", "Set new password", "Ask for a new link"). Same 480 px sheet. The password hint ("At least 12 characters. A few unrelated words work well.") sits under the field in `small`; a quiet strength line under the field fills with Sumi ink (not red-to-green) as the password grows.

**Platform dashboard log in (`/dashboard/login`)**: H1 "CoFile dashboard" on the same sheet, with the API key field in Typewriter.

### 10.9 Terms and Privacy · even light

Set as a long letter on a 760 px Washi sheet. Section headings ("1. What CoFile does", "2. What CoFile is not", …) in Whitney Semibold 22 px with the numeral hanging in the left margin in GT Alpina 22 px, Pale ink. Body in `body` at 19 / 30 px. On desktop a sticky index of the section headings sits to the left of the sheet (cols 1 to 3, `small`, the current section marked by the ribbon mark). On phone the index collapses into a button at the top of the sheet (`[copy needed: Contents]`) that opens a sheet listing the sections. A "back to top" is the header itself, which stays.

### 10.10 404, errors and expired links · paper relief

Each is a single sheet on the desk with one paper-relief vignette (7.5) above the heading, 240 px wide, in the even light.

- **404**: H1 "Page not found" / "The link may be old or mistyped." / "Go to the home page". Vignette: a sheet lifting in a breeze. Its only motion: the vignette photograph drifts 4 px on a 6 s sine, as if the breeze were still there (still under reduced motion).
- **Error**: H1 "Something went wrong" / "This page couldn't load just now. It's usually a short hiccup on our side." / "Try again" (primary) and "Log in again" (quiet) / the reference line in `small` with the digest in Typewriter. Vignette: a gently creased sheet.
- **Expired or invalid link** (`/invite-expired`, and the client link page's own variants "This link has expired or isn't valid" / "Ask whoever sent it for a new one.", "This link can't be used", "This filing is no longer offered"): on CoFile's own pages, the creased-sheet vignette; on a firm's client link page, no vignette at all, just the firm's letterhead sheet with the message, so a client sees only their firm.
- **Signed out of a filing desk** (`/p/<firm>/signed-out`): H1 "You're not signed in to this filing desk" on the firm's letterhead sheet.

### 10.11 The firm's pages: the filing desk

The filing desk at `cofile.app/p/<firm>` is the firm's own room. Its brand leads; CoFile is the small "with CoFile" at the top bar's right of the firm name. The light is even and steady (a working tool), the desk is Morning, and the work lies on it as sheets.

**Typography on the desk**: the firm's font sets the letterhead, page titles and client business names. Interface text (labels, buttons, table text, notices) stays in Whitney, so a long day's work stays easy to read whatever font a firm chose. On the client's pages (10.12) the firm's font leads throughout.

**The top bar.**

```
DESKTOP
┌════════════════════════════════════════════════════════════════════════════════┐ ← firm painted edge, 4 px
│ [H&P] Harbor & Pine CPA · with CoFile   Filings  New filing  Ready to pay      │
│                                         Client links  Signatures  Setup        │
│                                         Billing          ana@… (Log out)       │
└────────────────────────────────────────────────────────────────────────────────┘

PHONE
┌════════════════════════════┐
│ [H&P] Harbor & Pine CPA  ≡ │   with CoFile moves into the menu sheet's foot
└────────────────────────────┘
   … and a bottom tab bar:  Filings · New filing · Ready to pay · More
```

- 72 px, Washi, the firm's 4 px painted edge across the very top of the browser window. Logo per 3.5 at 36 px; firm name in the firm's font 18 px; "· with CoFile" as the imprint (14 px Usuzumi).
- Navigation: "Filings", "New filing", "Ready to pay", "Client links", "Signatures", "Setup", "Billing" in `ui`, the current one marked with a 2 px underline in the firm's main color. The user's email (linking to the password page) and "Log out" (quiet small button) at the right.
- Phone: firm letterhead and a menu button at the top; a bottom tab bar (64 px plus safe area, Washi, hairline above) with "Filings", "New filing", "Ready to pay" and a "More" sheet `[copy needed: More]` for the rest, each with an icon from the set. The thumb does the work.
- Footer, where the firm set one: "Questions? Email …" in `small` Usuzumi.

**Filings, the overview (`/p/<firm>`).**

- Title row: H1 "Filings" in the firm's font at `display-3`, the primary "New filing" button (firm color) at the right.
- Notices ("Real filings need an active subscription; rehearsals are free. Subscribe", "1 approved filing is ready to pay and need your card's security code. Pay and file", "2 filings need someone to act.") are slips laid across the top of the desk: Paper back, 56 px, a 3 px left edge in Ai (something needs you) or Beni (something went wrong), the action link at the right.
- The filings: on desktop a table on a single Washi sheet ("Filing", "Type", "Status", "Started"): rows 60 px, the filing title in the firm's font 17 px as a link, a dashed "Test" chip beside rehearsals (the trial-print chip, 4.4), the type in `small`, the status chip (11.6), the date in `small` Usuzumi with tabular figures. Rows that need someone lift 2 px with a 3 px marker in the firm's second color on their left edge, like the waiting slip in the hero. On phone each filing is a slip card: title, type, status chip, date.
- **Empty state**: "Your desk is clear. Start a filing (it can be a free rehearsal), or send a client a link with your logo on it." with "New filing" and "Send a client a link", under the paper-relief vignette of an empty desk with one slip. It is the calmest screen in the product, on purpose.

**New filing, by state then type (`/p/<firm>/new`).**

- Step one: H1 "New filing", "Which state is the business in?", the beta note with its "What we file" link, and the alternative ways in ("Or send us the details and we fill in the form for you to check:" with the email address, text or WhatsApp numbers and the Slack `/file` command, each in Typewriter where it is an address or a number). The three states are three large index cards (the coverage cards' look): "New York", "New Jersey", "Florida" in GT Alpina `display-3`, the count line ("3 filing types, plus the federal EIN", etc.) under each in `small`. A card lifts on hover; on phone they stack at 96 px each.
- Step two (`?state=NJ`): "All states" as a back link, H1 "New Jersey: what are you filing?", the lede, then each filing type as a card: title in the firm's font 20 px, a chip ("Live" in full ink, or the dashed "Rehearsal" chip), the summary in `small`, the fee note in `small` Sumi. Then "Your pages for clients" as a sheet: each service's permanent page address in Typewriter on a Paper back slip with a copy button, and the widget code in a code block (11.9) under a disclosure.
- The filing form itself (`/new/<kind>`) is the intake form (10.12) on the firm's letterhead, with the staff submit label "Create the proof".

**A filing (`/p/<firm>/filings/<id>`).**

```
DESKTOP
┌──────────────────────────────────────────────────────────────────────────────┐
│ ← Filings                                                                    │
│ Two Sisters Bakery LLC                                 ● Waiting for approval │
│ New Jersey LLC formation · started … by …                                    │
│                                                                              │
│  ○───────●───────○───────○───────○   the paper trail of stages              │
│                                                                              │
│ ┌═══════════════════════════════════╗  ┌──────────────────────────────┐      │
│ │ Your proof is ready               │  │ Documents                    │      │
│ │ Check every detail and fee …      │  │ ▯ Certificate of Formation   │      │
│ │ ( Open the proof and approve it ) │  │ ▯ EIN letter                 │      │
│ │ We also emailed the link to …     │  └──────────────────────────────┘      │
│ └───────────────────────────────────┘  ▸ Progress on the state site          │
└──────────────────────────────────────────────────────────────────────────────┘
```

- Head: "← Filings", the filing title as H1 in the firm's font, the status chip, the meta line in `small` Usuzumi.
- **The paper trail**: under the head, the filing's journey as a line of small sheet glyphs joined by a 1 px Kage line, using the status labels the filing has passed through (for instance "Received", "Waiting for approval", "Approved", "Filing now", "Submitted to the state", "Accepted by the state", "Completed"). Passed stages are full ink, the current one is lifted and outlined in the firm's color, future ones are outlines. On phone it runs vertically.
- **"Your proof is ready"**: the most important card on the desk when it appears, so it is a full sheet of the firm's letterhead in miniature (painted edge, small head), with "Your proof is ready", "Check every detail and fee exactly as they'll go to the state, then approve it or ask for changes. Nothing is filed until you approve." and the primary button "Open the proof and approve it" in the firm's color, then the email note in `small`.
- The next-step notice, errors and "Approved and ready to pay…" as slips (11.7).
- **Documents**: each document as a row with a 32 px first-page thumbnail (a rendered preview of the actual file, on a tiny Washi sheet with a shadow), its label and kind; tap to open. "EIN: …" appears as a large value in Typewriter 22 px.
- "Save to Google Docs" as a quiet small button with its note.
- **"Progress on the state site"**: a disclosure; open, it lists the steps as a run sheet (9.7's look: step and time joined by dot leaders, in Typewriter), no screenshots unless the firm opens them.

**Client links (`/p/<firm>/client-links`)**: H1 "Send a client a link", the form ("Who it's for (shown to you and the client)", the filing type, "Email it from your mail app"), and "Links you sent" as a list of slips (who, type, sent date, "Used: open the filing"). Beside the form on desktop, a small preview of what the client will receive: the client's form page on a phone in the firm's brand, updating as you choose the filing type.

**Requests from a text or email (`/p/<firm>/from-email/<id>`)**: H1 "Request by text" (or "Request by email"), then the two halves of the home page's requests picture, live: on the left, "Your message", the original message as a bubble or as a quoted email on Paper back; on the right, "This looks like a request for:" with the filing type, and "Open the filled-in form". The phrases the AI used are highlighted in Asa in the message, as on the home page. The other states ("Already sent as a filing.", "The text of this message was deleted after 30 days…", "We couldn't find answers in your message for this form.", "Not this filing? Choose another") are slips.

**Signatures (`/p/<firm>/signatures`)**: H1 "Saved signatures" and its explanation; each saved signature on a small card of cotton paper (Washi with grain at 4%) with a 1 px baseline, the ink of the signature in Sumi, the signer's name in `small` under the line. "No saved signatures yet." with the vignette of a folded tent card. "Add a signature": the signature pad (11.10).

**Ready to pay (`/p/<firm>/pay`)**: H1 "Ready to pay" and its explanation. Each saved card is a slip shaped like a plain card (rounded 12 px, 86 × 54 proportion, Paper back, the card's label and "ending 4242" in Typewriter, no network logos drawn by us), with the filings waiting for it listed beside it and the security-code field (the vault's own field inside our field frame, 11.2). "Nothing is waiting for a card right now." when empty.

**Billing (`/p/<firm>/billing`)**: H1 "Billing". The current plan as a rate card (the Pricing page's card, 10.4) with its status line ("Waiting for the first payment", "Payment failed: Stripe is retrying", …) as a slip; the plan picker as the four rate cards with the current one marked by the firm's painted edge; the PlanPicker explanation in `small`; "Manage billing" as a quiet button.

**Setup (`/p/<firm>/setup`)**: H1 "Set up your account" (later "You're set up") with "Three short steps, plus registered agents if you want them. You can change any of them later." The three steps ("Set up your firm", "Set up branding", "Set up payment") and "Registered agents (optional)" are four index cards in a row (stacked on phone), each with its line ("Name, kind of firm and who to contact.", "Your logo and color on the pages your clients see.", "Which card pays state fees: …", "Save the agent you use in each state, …"), done steps showing a full-ink sheet glyph, the next one lifted.

**Branding (`/p/<firm>/setup/branding`)**, the most important setup page, because it is where "your name on the door" is made:

```
DESKTOP
┌──────────────────────────────────────────────────────────────────────────────┐
│ Step 2 of 3                                                                  │
│ Branding                                                                     │
│ Your clients see your name, logo and colors on the pages where they fill …   │
│                                                                              │
│ ┌─────────────────────────────┐    ┌──────────────────────────────────────┐  │
│ │ Name your clients see [___] │    │  Preview of a client's page          │  │
│ │ Logo                        │    │  ┌══════════════════════════════╗    │  │
│ │ ┌ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ┐ │    │  │[logo] Your firm name         │    │  │
│ │   drop zone = an empty head │    │  ├──────────────────────────────┤    │  │
│ │ └ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ┘ │    │  │Please fill in your LLC       │    │  │
│ │ A PNG, JPEG or WebP …       │    │  │formation details.            │    │  │
│ │ Main color   [■] #1e5a5c    │    │  │What you'll need …            │    │  │
│ │ Second color [■] #c9a45c    │    │  │( Send for approval )         │    │  │
│ │ Font  [Lora (serif)     ▾]  │    │  │          with CoFile         │    │  │
│ │ Support email shown to      │    │  └──────────────────────────────┘    │  │
│ │ clients [________]          │    │  (on a phone frame / on a sheet)     │  │
│ │ ( Save )                    │    └──────────────────────────────────────┘  │
│ └─────────────────────────────┘                                              │
└──────────────────────────────────────────────────────────────────────────────┘
```

- Controls on the left (cols 1 to 5), the live "Preview of a client's page" on the right (cols 7 to 12), sticky while you scroll the controls. A small toggle above the preview shows it on a phone or on a desktop sheet (icons, accessible names `[copy needed]`).
- **The logo drop zone is drawn as an empty letterhead head**: the same 96 px head with a 1 px dashed Kage outline where the logo goes, and the existing help line under it ("A PNG, JPEG or WebP picture. A wide logo on a clear background looks best. Big pictures are shrunk for you."). A dropped logo settles into the head with a 2 px land; if it has a white box, the box melts away as the preview applies multiply (3.5), the best possible first impression of the product.
- **Colors**: each a 44 px swatch well (a small square of painted card) next to its hex field ("Use a hex code like #1f4fd1."). Choosing a color soaks it into the preview's painted edge and button (M3's ink soak). If a main color is too light for links, a quiet note appears under the field `[copy needed: a line saying links will use a darker shade of this color]`.
- **Font**: the select lists the presets each set in its own face ("Inter", "Lora (serif)", …), and "Your own font (uploaded)". Changing it crossfades the preview's type in 240 ms.
- The preview is the real client page component in the firm's brand, so what the firm sees here is exactly what its clients see.
- Phone: the preview becomes a 160 px strip pinned under the header (head, painted edge, the button), with the controls below; tapping it opens the full preview as a sheet.

**Your firm, Payment, Registered agents** (`/setup/details`, `/setup/payments`, `/setup/agents`): sheets of fields (11.2), with "Step 1 of 3" / "Step 3 of 3" in the kicker style. Payment's two choices ("One card for every filing" and "A card for each type of filing, with one main card for the rest") are two large radio cards, each with a small drawing of one card or several cards. Registered agents: one row per state, the saved agent shown as a slip like the draft's "Your saved agent".

### 10.12 The firm's pages the client sees

These are the pages a firm's client sees, on their phone more often than not. **Only the firm's brand appears**, plus the small "with CoFile" imprint at the foot. No CoFile colors, no beta banner text naming us (the code's banner on these pages already says "This service is in beta."), no CoFile navigation.

**The frame.** Morning desk, the firm's letterhead sheet centered (720 px on desktop, full width on phone, where the sheet's edges touch the screen and the painted edge runs across the top of the screen). The firm's font leads everything. The beta banner, where shown, sits above the sheet in a neutral Paper back band (no Asa, no Kaki).

**A page for each filing the firm offers** (`cofile.app/<firm>/<service>`, such as `cofile.app/bestaccounting/llc-filing-new-york`), **the client link page** (`/i/<token>`) and **the white-label hosted page** (10.13) are the same sheet:

```
PHONE (designed first)
┌══════════════════════════════┐ ← firm painted edge
│ [logo] Best Accounting       │ ← the head belongs to the firm alone
├──────────────────────────────┤
│ ░ This page is in rehearsal  │ ← trial-print hatch notice
│ ░ for now. …                 │
│ New York LLC formation       │ ← firm's font, 28 px
│ Articles of Organization …   │
│ After you send this, Best    │
│ Accounting checks every      │
│ detail and approves it. …    │
│ ── Name ──────────────────── │ ← section as a "page" of the booklet
│ LLC name                     │
│ [__________________________] │
│ …                            │
│ ( Send to Best Accounting  ) │ ← firm color, full width, 56 px
│ Next, Best Accounting checks │
│ it and approves the filing.  │
│ By sending, you agree to …   │
│             ────             │
│          with CoFile         │
└──────────────────────────────┘
```

- Head (3.5), then the rehearsal notice when the filing type isn't live yet ("This page is in rehearsal for now. You can fill it in, but nothing will be filed with the state and nothing will be charged, now or later, even after you approve it. To file for real, contact …") on the trial-print hatch, never in a warning color.
- H1, the filing's title in the firm's font at 28 px (34 px desktop), with the link's label after a middle dot where there is one; the summary and the "After you send this, … checks every detail and approves it. Nothing is filed until they do." line in `body` Usuzumi; the fee note in `small`.
- **The form**, designed for one thumb. Each section of the form ("Name", "Business data", "Registered agent", "Members and managers", "Other provisions (optional)", "Signers", "Certificates", "Authorizations") is set off like a page of a small booklet: the section title in the firm's font 22 px over a hairline, its help text in `small`, then its fields. On phone a slim sticky rail under the head shows the current section's title, so a long form never loses its place. Optional parts ("More options (optional)") are disclosures.
- Fields per 11.2, 56 px tall on phone, labels above, help under, errors in Beni with an icon and words. Repeating groups ("Member", "Signer") are small cards with "Add" and "Remove" as quiet buttons. Radio choices ("When filed", "On a later date"; "I'll name the agent", "The filing company's registered agent …") are full-width choice cards with a 24 px radio.
- The signature field: the signature pad (11.10) with its explanation and consent line.
- The submit button "Send to <firm>" in the firm's color, full width on phone; the footnote lines under it; then the imprint.
- **After sending**: the sheet folds in thirds and slides up and away (the client's own small moment of "it's gone to my firm"), and a short confirmation sheet lays down in its place, using the action's own success words.
- **In dark mode**, the desk goes dark and the sheet stays paper, so a firm's dark logo always reads.

**The proof the firm approves** (rendered by `src/approvals/render.ts`, opened from the filing desk or the email). It is the firm's own proof, so it wears the firm's letterhead, and it is the most carefully set page in the system.

- **Frame**: the firm's letterhead sheet, 760 px on desktop, full width on phone. Head with the logo, the brand name and "with CoFile" moved to the foot as the imprint (the code puts "with …" at the bar's right; I move it to the foot so the head belongs to the firm alone).
- **Rehearsal**: "Rehearsal: nothing will be filed or paid, even if you approve." as a band on the trial-print hatch right under the head.
- **Title and meta**: the filing title in the firm's font at `display-3`; "Filing reference …" (the reference in Typewriter) and "Please decide by …" in `body` Usuzumi.
- **The consent note** (the approval consent text, the EIN lines and "Government sites don't save drafts, …") on a Paper back panel with a 3 px left edge in the firm's main color, `body` Sumi, 24 px padding. It is important, so it is plain and easy to read, not alarming.
- **"The state's review page"**: H2 in the firm's font 22 px, its paragraph, then the picture of the state's own review page presented as a print laid on the proof: white border, 1° off square, its own shadow, tap or click to see it full screen (pinch to zoom on phone). Its alt text is the code's own.
- **"Filing details"**: H2, the SSN note when present, then the table: labels in Whitney 15 px Usuzumi, values in Typewriter 17 px Sumi, rows 48 px, hairlines; on phone each label sits above its value. Masked numbers keep their mask in Typewriter.
- **"State fees"**: H2, "Nothing is charged on this page. …", then the fees table with tabular figures aligned on the decimal point, the single rule above "Total" and the double rule below it, and "Maximum you authorize" as its own row in `small`.
- **The decision**: the one-time code field when required (six 56 px boxes in Typewriter 24 px, each a small slip), "What should change? (Needed only if you ask for changes)" as a textarea that grows, then the two buttons: "Approve, and authorize submission and payment" as the primary in the firm's color, full width on phone, 56 px, and "Request changes" as a quiet button under it. A 2 px reading-progress hairline in the firm's main color runs along the top of the screen as you read down, so you know how much of the proof is left before the button.
- **On approve**: the press (120 ms), then the fold (M5): the proof folds in thirds and slides away, and the decision page ("Approval recorded" with its paragraph) lays down in its place on the same letterhead. On Android, an 8 ms haptic tick on the press.
- **"Questions: …"** in `small` Usuzumi above the imprint.

### 10.13 Platforms: dashboard, API docs, white-label page, widget

**The dashboard (`/dashboard`).** CoFile's own room for platforms, so CoFile's identity is present here, quietly. Developers often work at night, so the dark "desk at night" is designed with as much care as the day.

- **Frame**: a left rail on desktop (240 px, Washi on Morning, or `--surface` at night) with the mark and wordmark at the top and the navigation as a list: "Overview", "Filings", "Ready to pay", "Firms", "API keys", "Webhooks", "Setup", "Team", "Billing", "Sign-ups", "Docs". The current item has a 3 px Sumi marker on its left (the ribbon, turned vertical). On phone the rail becomes a top bar with a menu sheet.
- **Overview**: H1 the account's name in GT Alpina `display-3`. Notices as slips (11.7). Then a calm grid of sheets: "Webhook deliveries" (recent deliveries as a run sheet: event, time and response code in Typewriter, joined by dot leaders, the response code dot in leaf or Beni), "API keys" with "Manage keys", and three small charts, "By status", "By state" and "By month".
- **Charts**: drawn like a well-set annual report. Bars in Sumi at 80% with 2 px rounded tops, the current month in Kaki, axis labels in `micro` Usuzumi, one Kage baseline and no gridlines, values on hover in a small slip. "By state" uses the four place names as plain labels. Nothing in color unless it means something.
- **Filings, Firms, Sign-ups**: tables (11.8) on sheets; a firm's row shows its logo at 24 px and its painted color as a 4 px swatch, so the platform sees each firm's brand at a glance.
- **API keys**: each key as a slip with its name, a masked value in Typewriter and a copy button; a new key appears once in a highlighted slip (Asa) with its value in full.
- **Webhooks**: endpoints as slips; deliveries as the run sheet; payloads in code blocks (11.9).

**The API docs (`/docs`).**

```
DESKTOP
┌──────────────┬──────────────────────────────────────────────┬────────────────┐
│ ▆ CoFile     │ (kicker) API docs                            │ On this page   │
│ API docs     │ File state business paperwork from your own  │ Quick start    │
│              │ product: LLC formations in New York, …       │ …              │
│ Overview     │                                              │                │
│ Reference    │ Quick start                                  │                │
│ Endpoints    │ ① Get an API key from the dashboard.         │                │
│ OpenAPI      │ ② Set up the client company …                │                │
│ (JSON)       │ ③ Create a filing with "dryRun": true, …     │                │
│              │ ┌──────────────────────────────────────────┐ │                │
│ Guides       │ │ POST /v1/filings                  [copy] │ │                │
│ Authentic…   │ │ { "dryRun": true, … }                    │ │                │
│ Filings and  │ └──────────────────────────────────────────┘ │                │
│ the lifecycle│ ④ Add a webhook endpoint …                   │                │
│ …            │                                              │                │
└──────────────┴──────────────────────────────────────────────┴────────────────┘
```

- Three columns on desktop: the nav (cols 1 to 3: "Overview", "Reference", "Endpoints", "OpenAPI (JSON)" and the guides: "Authentication", "Filings and the lifecycle", "Filing types, fields and state fees", "Approvals", "Webhooks", "Errors", "Saved signatures and PDF uploads", "White-label firm portal"), the content (cols 4 to 9, max 720 px) and "On this page" (cols 10 to 12, sticky, `small`). The top bar keeps "API docs" and "Dashboard" as its links.
- Prose in Whitney `body`; headings in GT Alpina; every path, field, value and identifier inline in Typewriter on a Paper back tint, 2 px radius.
- Quick start steps numbered with the same pencil numerals as the sample proofs, so the docs feel like part of the same hand.
- **Code blocks** per 11.9; request and response side by side on wide screens, stacked below 1280 px.
- **Endpoint reference**: each endpoint as a sheet: the method as a small Typewriter label (GET as a Sumi outline, POST and PUT as Sumi filled with Washi text, DELETE as a Beni outline; no rainbow of colors), the path in Typewriter 18 px, then parameters as a table (name in Typewriter, type in `small` Usuzumi, description in `body`).
- `"dryRun": true` is highlighted in Asa wherever it appears, the same first light as a rehearsal.
- The links for agents ("all docs in one Markdown file", "OpenAPI 3.1", "/openapi.json", "llms.txt") as a quiet row of slips under the intro.
- Dark mode is the night desk with the code blocks a shade lighter than the ground (`#24262B`) and Typewriter text in `#ECEAE5`.

**The white-label hosted page (`/e/<tenant>/<firm>/<service>`).** The same sheet as the firm's filing page (10.12), in the platform's or firm's brand as configured. When the white-label setup removes the "with CoFile" line, the foot of the sheet stays simply empty: ma, not a gap.

**The embed widget (`/embed/…`).** The client form as it sits inside someone else's website, so it must look at home on any page.

- No desk, no sheet shadow, no paper grain, no rotation, no light layer: the host page is the desk. Background transparent by default (a setting for Washi).
- The firm's font and colors, the head reduced to nothing (the host page already carries the firm's name), the fields at a compact 48 px, one column below 560 px of width, two above.
- The rehearsal notice on the trial-print hatch; the submit button in the firm's color; "Filed with CoFile" at the foot as the imprint.
- Height follows the content (the resizer already exists); the fold-away after sending is reduced to a 240 ms cross-fade inside the frame, so the host page never jumps.

### 10.14 Emails

Every email is one sheet of letterhead on a Morning ground, 600 px wide, built with tables for every mail client, and readable with images off.

```
┌ Morning ground ──────────────────────────────────────┐
│   ┌════════════════════════════════════════════╗     │ ← painted edge: a 4 px table row
│   │ [logo] Harbor & Pine CPA                   │     │   in the firm's main color
│   ├────────────────────────────────────────────┤     │
│   │ Rehearsal: nothing will be filed or paid,  │     │ ← hatch band, only on rehearsals
│   │ even if you approve.                       │     │
│   │ Your proof is ready. Open the link to see  │     │
│   │ every detail and every fee, exactly as     │     │
│   │ they'll go to the state, then approve it … │     │
│   │                                            │     │
│   │ (        Open your proof        )          │     │ ← firm color, 48 px
│   │                                            │     │
│   │                 ────                       │     │
│   │              with CoFile                   │     │
│   └────────────────────────────────────────────┘     │
└──────────────────────────────────────────────────────┘
```

**The template.**

- **Ground** Morning `#ECEEED`; **sheet** Washi `#FCFBF8`, 1 px `#CED2D5` border, 40 px padding (24 px on phones via media query).
- **Head**: the 4 px painted edge as a table row in the firm's main color; the logo image (max 40 px tall, with a `width` attribute and alt text of the firm's name), then the firm's name as live text in 18 px semibold, so the head still reads with images off.
- **Type**: Whitney where the client supports web fonts (Apple Mail), falling back to `-apple-system, "Segoe UI", Helvetica, Arial, sans-serif`; 16 px body at 1.6 line height, Sumi. Values (references, EINs, amounts) in `ui-monospace, Menlo, Consolas, monospace`.
- **Button**: a bulletproof table button (with a VML fallback for Outlook) in the firm's main color with its computed text color, 48 px tall, radius 10 px, at least 240 px wide, full width under 480 px.
- **Rehearsal band**: when the filing is a rehearsal, the existing first line ("Rehearsal: nothing will be filed or paid, even if you approve.") sits in a band of Paper back with a 1 px dashed Sumi border, the email-safe version of the trial-print hatch.
- **Foot**: the imprint "with CoFile" as live text, 14 px, `#5E6166`, centered, with the 40 px hairline above it.
- **Preheader**: the body's first sentence, hidden.
- **Dark mode**: `color-scheme: light dark`; the ground darkens to `#16171A` and the sheet stays light (paper stays paper), set with explicit backgrounds so clients that invert colors leave the letterhead alone.

**The emails, one by one** (subjects and bodies are the code's own):

| Email | Who it's for | Letterhead | What's special in the design |
|---|---|---|---|
| **"Your proof is ready to approve: …"** | The firm (partner firms approve their clients' filings) | The firm's | Button "Open your proof". When the state's review page is attached ("Attached is a picture of the state's own review page…"), a 280 px thumbnail of it sits under the button as a print with a white border, linked to the proof. The body stays one paragraph, exactly as written, at 16 px. |
| **"Completed: …"** (documents back) | The firm and, by its settings, its client | The firm's | After "This filing is complete…", the documents line ("Documents: …. They're attached. …") becomes a list of slips: a 24 px document glyph (PNG), the document's name, one per row on Paper back. Button "Open" to the filing page. A small band image under the head (the paper obi with the business name rendered as live text over a tinted cell) is the email's one picture. |
| **EIN issued** | The firm | The firm's | The status label "EIN issued" exists, but no email does yet. Template: the EIN as a large value in monospace 24 px on a Paper back slip, the IRS letter as an attachment slip. Subject and body `[copy needed]`. |
| **"More information needed: …"**, **"Changes requested: …"**, **"Card security code needed: …"**, **"Choose a name: …"**, **"Review before submit: …"**, **"Site changed — review needed: …"**, **"Rejected by the state: …"**, **"Failed: …"**, **"Blocked: …"**, **"Checking whether the state received: …"** | The firm (and the card's owner for the security code) | The firm's | The same sheet. A 3 px left edge on the first paragraph says the kind of message: Ai when someone needs to act, Beni when something went wrong, none otherwise. Buttons use the code's labels ("Enter security code", "Choose a name", "Review the filing"). |
| **"Confirm your email for CoFile"**, **"Reset your password"**, **"Your partner account is open"**, **"Your CoFile account is ready"** | The person signing up | CoFile's own | Head: the CoFile mark and wordmark (image with live-text fallback "CoFile"), no painted edge. Button in Kaki with Sumi text. No imprint at the foot (it is our own letter); instead the footer line "CoFile is not a law firm or a government agency…" in 14 px Usuzumi. |
| **"You're invited to …'s filing portal"** | A firm's team member | The firm's | The firm's letterhead, because the invitation is into the firm's room. |
