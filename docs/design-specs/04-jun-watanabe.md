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
- **Inside the home-page pictures**, the example firms' own colors lead: Harbor & Pine CPA in a deep harbor teal (`#1E5A5C`, with a second color of `#C9A45C`, a weathered brass), Northgate Payroll in a confident brick red (`#A8452F`, second color `#2E3A4C`, slate). These are the firms' colors, invented by the brand designer who draws their logos (see 7.6). They prove that CoFile's quiet palette makes room for any firm's color.
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

- **Desktop**: each home-page section is a two-part composition: a short column of words on the desk (cols 1 to 4) and one large picture (cols 6 to 12), with column 5 left empty as ma. The picture is always the bigger partner, because the brief is right that the pictures carry the page. The sides alternate down the page (words left, then right, then left) so the eye moves like reading a fold-out. Coverage and pricing are the two full-width sections, where the cards and the rate card span all twelve columns under the heading.
- **Phone**: one column. Order follows the copy: heading, lede, the short list and its link, then the picture. Pictures take the full width minus 20 px margins, and photographs may go edge to edge. Nothing ever sits side by side on a phone except a label and its value on a sheet when both are short.
- **Sticky thumb bar on phone**: after the hero's buttons scroll out of view, a 64 px bar rises from the bottom (`translateY` 100% → 0, 320 ms, paper land curve) holding "Run a free rehearsal" full width in Kaki. It sinks away again inside the close section (which has its own button), in the For platforms inquiry form, and whenever a field has focus. It respects `env(safe-area-inset-bottom)`.
- **Tap targets**: 48 × 48 px minimum, 56 px tall for primary buttons on phone.
- **Sheet widths**: the proof is 720 px wide on desktop (a sheet of letterhead at screen scale) and full width minus 20 px on phone. Forms sit on 720 px sheets. The letter-style pages (Terms, Privacy) and the Questions answers sit on 760 px sheets.
