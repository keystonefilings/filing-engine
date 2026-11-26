# Doorlight: the visual design of cofile.app

**Tomás Ferreira** · creative technologist · visual design spec, v2 · Nov 26, 2026 (on brief v3
and the round 3 copy)

For the build team, and for the studios we commission. The copy is locked: every headline, line,
label, price and caption below is quoted from `web/app/page.tsx`, `web/components/landing/Visuals.tsx`,
the seven pages behind the home page and the product's own pages. Where a design needs a word that
doesn't exist yet (alt text, an interaction label), I've marked it `[copy needed]`. Every picture
uses the copy's example details (Harbor & Pine CPA, Northgate Payroll, Two Sisters Bakery LLC, Ana
Ortiz, Hudson Ledger LLC, Orchard Lane Inc.) and keeps its small "example" label.

**Contents**

1. Who I am
2. The visual concept: Doorlight
3. Identity
4. Color
5. Typography
6. Layout
7. Art direction
8. Motion
9. The home page, section by section
10. The other pages
11. Components
12. Craft notes
13. Production
14. What I'd strip from today's visuals

---

## 1. Who I am

I'm Tomás Ferreira, 26. I grew up in São Paulo and now work out of Berlin. I build real-time things:
WebGL, shaders, generative systems, 3D you can touch in a browser, and the kind of experiential
sites that win awards. I'm writing this spec because CoFile has three moments that people should
*feel* rather than read about:

- a client's text message turning into a drafted filing that nobody had to retype,
- a firm's name, logo and color turning up on every page its client sees,
- the state's papers coming back to the firm.

The part I'm proudest of is the unglamorous part. I ship. Every scene in this spec has a
performance budget, a static version that works with JavaScript off, a low-power version for an old
phone and a reduced-motion version. The 61-year-old CPA on a 2019 laptop and her client on a
cracked Android get the whole story. The light is a bonus on top of a complete, well-set site, and
the site never depends on it.

What I bring: light, material and time as storytelling tools, the engineering to make them cheap,
and the discipline to keep all of it in service of one feeling: *"this is for my firm, I can say yes
to my clients, I want to try it."* The copy is now about 330 words on the home page, so the pictures
carry it. That's the job I'd want: seven pictures and a light that ties them together.

---

## 2. The visual concept: Doorlight

### The one idea

> **Every good firm has a door with its name on it. CoFile is the light that comes through it.**

Picture the glass door of a practice that's been around a while. A sign painter has lettered the
firm's name on the glass in gold leaf. It's early, the sun is low, and the light comes through the
door, carrying the firm's name across the floor, over the desk and onto the papers. Down in the
bottom corner of the glass, the sign painter has signed the work, very small.

That's the whole brand. **The firm's name, in the firm's color, lands on every page its client
sees. CoFile is the small signature in the corner.** The copy says it in eight words: *"Your name on
the door. Ours in small type."* Doorlight makes that line into something you can see, and it makes
the hero's promise visible too: *"Say yes, under your own name."*

### How it brings out the selling story

| The copy sells | What Doorlight does with it |
|---|---|
| **1. Say yes, under your own name.** "Your client needs an LLC. Say yes, under your own name." | The hero picture is the firm's own filing desk (Harbor & Pine CPA) lying in the morning light that comes through its door. The firm's name is printed at the top of the desk and also falls across it as light. |
| **2. Your brand on everything.** "Your name on the door. Ours in small type." "Your logo and color on every page your client sees." | Two glass doors side by side, Harbor & Pine CPA and Northgate Payroll, each gilded in its own style. Each door's light falls on the same client page, and turns it into that firm's page. "with CoFile" is drawn and placed like a sign painter's signature: tiny, in the corner, beautifully made. |
| **3. Nobody retypes anything.** "Your client sends a text. Nobody retypes it." | A sunbeam crosses from Ana's text message to a drafted New Jersey LLC formation. Her words lift off the bubble like dust caught in the light and settle into the right fields. The firm's saved answers fill in the rest in the firm's color. |
| **4. You stay in charge.** "Nothing is filed or paid until you approve the proof." | The proof lies on a printer's light table, lit from below: one page, every detail and every fee. It is the brightest object on its section, and its one button is the brightest thing on the proof. The firm owner is the person at the table. |
| **5. It's done, and the papers come back.** "Then it's filed, and the papers come back to you." | Golden hour. The light turns warm and low, the sun moves through "Approved", "Submitted" and "Filed", and the state's document and the IRS letter come to rest on the firm's record. |
| **6. The filings your clients already ask for.** New York, New Jersey, Florida and the IRS. | Dusk: four tiles like four office windows, one per place. Each filing type is a small lamp: lit when it's Live, warm when it's rehearsed, unlit until then. As types go live during the beta, the windows get brighter on their own. |
| **7. Try it free.** "In beta: rehearse a filing, free." "Run one rehearsal. Then decide." | The rehearsal is an empty theatre lit by a single ghost light: the state's real website as the stage, with no audience. At the end of the page it's night, and a door waits for *your* name. Click "Run a free rehearsal" and the sign-up page letters your firm's name on that door as you type it. |
| **8. Simple prices.** "$45 a filing. EIN included with a formation." | Lamplight on one clean strip of four prices, set large, like the prices in a good shop window. No small print hunting. |
| **9. People behind it.** "Built and run by filing professionals. When a filing needs a person, one of them takes over." | The sign painter in the story is real: CoFile is a shop of craftspeople who do careful work and sign it small. The real team is photographed in the same light, and shows up as quiet portraits beside that line. |

### The home page is one working day

The home page runs from morning to night. As you scroll, a single light layer follows the sun: its
color, its angle, the direction of every card's shadow. You open the page at 8:00 with the filing
desk in the morning sun and close it at 22:00 with the door lit, waiting for your name. Nobody has to
notice this consciously. They'll feel the page warm up, glow, and settle.

| # | Section | Time | Light |
|---|---|---|---|
| 1 | Hero | 08:00 | Low morning sun from the left through Harbor & Pine's door glass; pine shadows sway |
| 2 | Firms | 10:00 | Two doors in a bright corridor, each casting its own colored light |
| 3 | Requests | 12:30 | One sharp sunbeam, lunchtime (Ana texts from the bakery) |
| 4 | The proof | 14:00 | Clear afternoon; the light table glows from below |
| 5 | After | 16:30 | Golden hour from the right, long shadows |
| 6 | Coverage | 18:00 | Dusk; the four windows switch on |
| 7 | Rehearsals | 19:00 | Inside the theatre: dark, one ghost light |
| 8 | Pricing | 20:30 | A desk lamp's pool on the price strip |
| 9 | Close | 22:00 | Night; a door lit from inside, waiting for a name |

The pages behind the home page each take one hour of the same day (§10): How it works is the
morning shift, For firms is noon at the door, What we file is the evening, Pricing is lamplight,
For platforms is the night shift.

### The rules of the concept

1. **The light belongs to the firm.** On CoFile's own site, the light carries the example firms'
   names. On a firm's own pages it carries that firm's color. CoFile never projects its own name in
   light and never gilds it.
2. **CoFile's own presence is small and warm.** The Doorlight mark, the wordmark, and one warm
   color, Lamp, for CoFile's own buttons on CoFile's own pages. On a firm's pages, CoFile is only
   "with CoFile".
3. **The proof is the brightest thing in its picture.** Wherever it appears (the proof section, How
   it works, the filing desk, the "proof is ready" email), nothing else in the composition is lit
   more brightly.
4. **Reassurance gets still light.** The security line, the Security page, "Checks before every
   filing." on How it works, "What's separate." on Pricing and the Questions page are the quiet
   hours: plain typographic layouts, set beautifully, with no scene and no motion beyond a fade-in.
   They look trustworthy because they look calm, and they're easy to find: the security line sits
   under the prices, and Security and FAQ stay in the footer.
5. **No drama about stopping.** No red flashes, no locks, no seals, no shields, no stamps. The
   rehearsal's last line ("Pay Now · held, on purpose") is just the last cue of the evening, set in
   the same calm type as the rest.
6. **Everything works without the light.** The static version is a complete, designed site. WebGL
   is an enhancement that arrives after the words.

---

## 3. Identity

### 3.1 The mark: the Doorlight

An arched doorway of warm light, leaning forward at the angle of the morning sun: the shape a glass
door's light makes when it falls across a floor. It reads as "door", "light" and "open", and its
forward lean gives it energy without an arrow.

**Construction (for the illustrator), on a 48 × 48 unit square:**

1. Draw an upright arched doorway: a rectangle from x = 10 to x = 26 (16 units wide), from y = 22
   down to the baseline at y = 42, topped by a true semicircle of radius 8 centred at (18, 22). The
   crown is at y = 14. Total height 28 units.
2. Shear it horizontally about the baseline: x′ = x + 0.375 × (42 − y). The baseline stays where it
   is; the crown moves 10.5 units to the right. The lean is atan(0.375) = **20.6°**.
3. Round the two base corners with a radius of 1.5 units. Leave the arch as the pure sheared curve
   (it becomes a leaning half-ellipse). No other detail.
4. Centre the result optically in the square: the visual mass sits about 1 unit right of the
   geometric centre, so shift it 1 unit left.

**Fills.** Solid **Ink #1C1F24** on light backgrounds; solid **Lamp #F5B53F** on Night. At large
display sizes only (64 px and up, on CoFile's own pages), the mark may carry a light gradient:
Lamp #F5B53F at the base to Daylight #FFE3A8 at the crown, linear, along the lean.

**Small sizes.** Below 20 px, the illustrator supplies a pixel-fitted version: base corners square,
arch drawn as 3 to 4 stepped segments so the shape stays crisp. The 16 px favicon is a hand-pixelled
master, not a scaled vector.

**App icon.** The Doorlight in Lamp on a Night rounded square (corner radius 22% of the side), mark
height 56% of the icon, sitting on the icon's optical centre line.

### 3.2 The wordmark

**"CoFile"**, custom-drawn by a lettering artist, never typed. A humanist sans, semibold, built to
be read at 11 px, because its main job is to be the small type. Brief for the lettering artist:

- **Proportions.** Cap height 700 / 1000 em, x-height 520 (generous, for small sizes), stem 92
  units. Draw from scratch; Atkinson Hyperlegible Next Semibold is the reference for proportion and
  color on the page, not a source to trace.
- **C**: open aperture, terminals cut perpendicular to the stroke, upper terminal slightly longer
  than the lower.
- **o**: optically round, 4% overshoot.
- **F**: top arm 62% of the letter's width, middle arm 50%, middle arm centred at 52% of cap height.
- **i**: the tittle is a miniature Doorlight, leaning 20.6°, 1.1 × stem width wide and 1.6 × tall,
  its base 60 units above the x-height. It clears the F's top arm by at least 40 units; kern F–i
  tight so the little light tucks in just past the end of the arm. **This tittle is the mark inside
  the word**: wherever the separate mark would be too much (every "with CoFile"), it carries the
  brand alone.
- **l**: a small rightward foot, so l never reads as I at 11 px.
- **e**: horizontal bar, open lower aperture.
- Spacing tight and even. Supply three pixel-fitted masters for 11, 12 and 14 px, plus the vector.

### 3.3 Lockups, clear space, minimum sizes

- **Primary lockup**: Doorlight mark left of the wordmark. Mark height = 1.2 × the wordmark's cap
  height. The mark's base sits on the baseline. Gap = 0.45 × cap height. Horizontal only.
- **Clear space**: one cap height on every side.
- **Minimum sizes**: primary lockup at 12 px cap height (the nav uses 15 px cap height, about 22 px
  overall). Wordmark alone at 8 px cap height (the "with CoFile" size).
- **Colors**: Ink on light; Moonlit #ECE8DF on Night, with the mark in Lamp. Never in a firm's color,
  never gilded, never on a photograph without a solid plate.

### 3.4 "with CoFile": ours in small type

The sign painter's signature. On the firm's pages and its clients' pages it is the only sign of
CoFile, so it has to be small, unmistakable and well made. It is the visual form of "Ours in small
type".

- **Set**: "with" in Atkinson Hyperlegible Next Italic 400, a word space, then the wordmark (no
  separate mark: the Doorlight tittle carries it). "with" is sized so its x-height matches the
  wordmark's.
- **Size**: 12 px on screens (wordmark cap height 8.4 px); 11 px in emails, as a 2× PNG with the
  alt text "with CoFile".
- **Color**: the surrounding text color, solid, at 64% of the way from the background to the text
  (on a firm's pane that's about #5D6168). Never the firm's color, never Lamp, never a link color.
- **Place**: right end of the firm's pane (§3.5), sitting on the same baseline as the firm's name.
  In the embed widget the product's own words are "Filed with CoFile", set the same way, under the
  form, left-aligned.
- **Behavior**: none. No hover, no glow, no animation. A signature, not a button.
- **On the home page pictures** (the filing desk, the two firms' pages) it appears exactly as it
  does in the product, at true size. The Firms picture also shows it gilded tiny in the corner of
  each door's glass (§9.2): the one time it's ever drawn as a sign painter's signature.

### 3.5 How a firm's logo sits on its pages: the Pane

Every page a firm's client sees (the form behind a client link, the firm's page for each filing,
the widget's header when it has one, the emails) and every page the firm works in (the filing desk
and the proof) starts with **the Pane**: a header band that works like the firm's door glass.

```
 ▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀  4 px lintel, --firm (exact)
 ┌──────────────────────────────────────────────────────────────────┐
 │  [ LOGO ]  Harbor & Pine CPA                         with CoFile │  76 px (64 px phone), --firm-wash
 └──────────────────────────────────────────────────────────────────┘  1 px --firm-line
 ░░░░░░░ doorlight wash: the firm's light falling from the top-left ░░░░░░░  360 px, static
```

- **Lintel**: a 4 px band of the firm's exact primary color across the full width. Apart from the
  logo itself, this is the only place the exact, unmodified brand color appears as a large shape.
- **Pane**: 76 px tall on desktop, 64 px on phones, filled with `--firm-wash` (the firm's hue at
  97.5% lightness, §3.6). A pale, faintly colored glass, so any logo designed on white looks right.
- **Logo**: at the left page margin, vertically centred, sized by the optical rule in §3.6.
- **Name**: if the logo doesn't contain the firm's name (heuristic: logo aspect ratio under 2:1),
  the name sits 12 px to the right of the logo in the firm's font (or Atkinson Hyperlegible Next
  650), 20 px on desktop, 18 px on phones.
- **with CoFile**: at the right margin, on the name's baseline. On a filing desk with navigation,
  the nav row sits under the Pane and "with CoFile" stays in the Pane.
- **Doorlight wash**: under the Pane, a static soft light falls from the top-left: a radial gradient
  (ellipse 80% × 100% at 18% 0%) from `--firm-glow` at 55% opacity to transparent at 70%, 360 px
  tall, dithered with a blue-noise PNG at 2% so it never bands. That's the firm's light on its own
  pages. No WebGL, no motion.

### 3.6 Making any firm's logo and color look their best: the brand adaptor

Firms upload what they have: a 2009 JPEG with a white box, a pale-yellow brand color, a script font.
The adaptor makes every one of them look intentional. It runs once, when the firm saves Branding,
and writes CSS custom properties. All color maths in OKLCH.

**Color.** From the firm's primary color *c* = (L, C, H):

| Token | Rule | Use |
|---|---|---|
| `--firm` | *c*, exact | Lintel, logo plate when needed, selected-nav underline |
| `--firm-ink` | If white text on *c* reaches 4.5:1, use *c*. If *c* is very light (L > 0.75) and Ink text on it reaches 7:1, use *c* with Ink text. Otherwise lower L in 0.02 steps, hue fixed, chroma clipped to sRGB, until white reaches 4.5:1. | Primary buttons, links, focus ring |
| `--firm-on` | #FFFFFF or Ink #1C1F24, whichever the rule above chose | Text on `--firm-ink` |
| `--firm-wash` | oklch(0.975, min(C × 0.18, 0.02), H) | The Pane, page wash |
| `--firm-tint` | oklch(0.94, min(C × 0.35, 0.045), H) | Selected rows, the focus halo, the firm's chips |
| `--firm-line` | oklch(0.88, min(C × 0.3, 0.04), H) | Pane rule, firm-colored hairlines |
| `--firm-glow` | oklch(0.92, min(C × 0.5, 0.08), H), mixed 60/40 with Daylight #FFE3A8 | The doorlight wash |
| `--firm-ink-dark` | oklch(max(L, 0.74), min(C, 0.14), H), with Night text | Dark-mode buttons and links |
| `--firm-wash-dark` | oklch(0.24, min(C × 0.25, 0.03), H) | Dark-mode Pane |

Edge cases:

- **Gray or black brands** (C < 0.03): the glow uses CoFile's neutral Daylight; buttons are Ink.
  The firm gets a confident monochrome look, not a muddy gray one.
- **Neon brands** (C > 0.2): never used for large areas. Only the lintel, the button and the logo.
- **Clashes with status colors**: if the firm's hue is within 25° of Brick (error) or Fern
  (success) and C > 0.1, notices switch to their icon-first style with a 3 px left rule, so a
  red-brand button never looks like an error and an error never looks like a button.
- **Secondary color**: if present and distinct from the primary (ΔE OK > 0.08), it colors the
  selected-nav underline and the "current stage" dot on the filing timeline. Otherwise both derive
  from the primary.

**Logo.**

1. **Trim** transparent and near-white margins.
2. **White boxes**: if the logo is a JPEG or an opaque PNG with a near-white background, convert
   pixels above 98% lightness to transparent with a 1 px feathered edge. Setup shows a before and
   after, with a "use as uploaded" override `[copy needed]`.
3. **Light logos** (mean ink lightness above 0.8, made for dark backgrounds): place on a plate of
   `--firm-ink`, radius 8 px, padding 8 × 12 px, inside the Pane.
4. **Optical size**: logos are sized by how much ink they carry, not by their box. Wide wordmarks
   (aspect ratio 2.5:1 or more) get 28 to 36 px of height; compact marks (under 1.6:1) get 44 px;
   in between, interpolate. Then nudge so the ink area is about 2,200 px² on desktop (1,600 on
   phones). A thin wordmark and a chunky seal-shaped logo end up looking the same size, which is
   what the eye wants.
5. **Retina**: keep the upload at its native size; serve 1× and 2× WebP plus the original SVG when
   there is one.

**Font.** The firm's font (a Google Font or an uploaded file) sets the firm's name in the Pane, the
h1 and h2 on its pages, and the title on the proof. Body text, labels and every filing value stay in
Atkinson Hyperlegible (the legibility contract, §5). The adaptor measures the font's x-height and
writes `size-adjust` and `ascent-override` so headings in any font sit at the same optical size.
Script and novelty faces (x-height ratio under 0.4) are limited to the firm's name.

### 3.7 The example firms and clients

Mockups use only the example names already in the copy and product, all fictional, all drawn for
us. No real firm's name or mark appears anywhere.

| Example | Where it appears | Brand we draw for it |
|---|---|---|
| **Harbor & Pine CPA** | Hero desk, Firms, the proof, After | **Pine #2E5B4B** (white text 7.7:1), Brass #B08A3E secondary. Logo: a roundel monogram, "H&P" in a classic old-style serif inside a fine ring, with a small pine and two wave lines; plus a horizontal version with "Harbor & Pine CPA" set in Libre Caslon Text. Its font: Libre Caslon Text. On its door: 23-carat gold leaf in roman capitals with a Pine outline and drop shade. |
| **Northgate Payroll** | Firms (the second door and page) | **Northgate Blue #2B4C9B** (white text 8.0:1). Logo: a bold geometric sans wordmark in capitals with a small north-pointing chevron over the N. Its font: Archivo. On its door: aluminium (silver) leaf block capitals with a Northgate Blue shade. A modern firm next to a traditional one, so the two doors look like two different sign painters' styles, on purpose. |
| **Best Accounting** | The firm's filing page (`cofile.app/bestaccounting/...`), the widget | **Cardinal #B7322C** (white text 6.0:1). A lowercase rounded-sans wordmark. Chosen as the stress test: a red brand that must not look like an error state (§3.6). |
| **Two Sisters Bakery LLC**, **Ana Ortiz**, **Lucia Ortiz** | Requests, the proof, After, rehearsal log | No brand: they're the client. Ana's world is the bakery at dawn (photography, §7). |
| **Hudson Ledger LLC**, **Orchard Lane Inc.** | Rows on the hero desk | No brand; rows only. |

### 3.8 Identity don'ts

- Never tint, outline or recolor a firm's logo.
- Never make CoFile's mark larger or more prominent than the firm's.
- Never project or gild CoFile's own name. The gold is for the firm. The single exception is the
  sign painter's tiny signature in the corner of a door's glass, in the Firms picture.
- Never use Lamp on a firm's pages, except the rehearsal chip and notice (§11), where it is a
  product signal, not CoFile branding.
- Never build an icon or mark from locks, shields, seals, ticks-in-circles, stamps or eagles, or
  anything that could pass for a government or IRS mark.

---
## 4. Color

Doorlight's color comes in two kinds: **surfaces** (the room, the lit things in it, the ink) and
**light** (the color the light layer carries at each hour). Surfaces stay legible at every hour.
Light only tints them.

### 4.1 CoFile's palette, light mode

| Token | Name | Hex | Use |
|---|---|---|---|
| `--shade` | **Shade** | #E8E9E6 | The page background: the room, in soft shade. Ink on it is 13.6:1. |
| `--sunlit` | **Sunlit** | #FFF9EF | Everything you read or touch sits in the light: cards, the proof, fields, the price strip. Ink on it is 15.8:1. |
| `--ink` | **Ink** | #1C1F24 | Text, Ink buttons, the mark, Live chips. |
| `--slate` | Slate | #4F555D | Secondary text: 7.2:1 on Sunlit, 6.2:1 on Shade. Never lighter than this for text. |
| `--line` | Line | #C9CBC6 | Hairlines on Shade. |
| `--line-lit` | Lit line | #E2DCCF | Hairlines and table rules on Sunlit. |
| `--lamp` | **Lamp** | #F5B53F | CoFile's own primary buttons, the Live dot, the rare highlight. Ink text on Lamp is 9.1:1. |
| `--lamp-tint` | Lamp tint | #FCEBC4 | Rehearsal chips and notices, "from the text" markers, highlighted values on the proof. |
| `--daylight` | Daylight | #FFE3A8 | The color of light itself: patches, beams, the light table's glow. Never a fill for text. |
| `--leaf` | Gold leaf | #D9AE4F | Flat stand-in for gilding (the door's PBR gold is in §7.3). Decoration only, never text. |
| `--dusk` | Dusk | #DCDDE2 | The room at dusk: the Coverage and Pricing backgrounds. Ink on it is 12.2:1. |
| `--night` | **Night** | #15171E | After hours: the Rehearsals stage, the Close, the footer, the For platforms page, dark mode. |
| `--lamplit` | Lamplit | #1F222B | Surfaces on Night. |
| `--moonlit` | Moonlit | #ECE8DF | Text on Night: 14.6:1. |

**The four I'd name if you only remember four:** Shade #E8E9E6, Sunlit #FFF9EF, Ink #1C1F24,
Lamp #F5B53F. Plus Night #15171E for after hours.

### 4.2 Status colors

Muted on purpose, so they never fight a firm's brand. Every status also carries a shape or icon, so
color is never the only signal.

| Status | Text | Tint | Icon |
|---|---|---|---|
| Good (filed, accepted, completed, EIN issued) | Fern #2F7350 (5.4:1 on Sunlit) | #DDEEE3 | Filled dot |
| Needs someone (waiting for approval, needs information) | Ochre #8A5300 (6.0:1) | #FBEBCB | Ring with a gap |
| Problem (rejected, failed) | Brick #A2372C (6.4:1) | #F7DEDA | Short bar |
| In progress (received, queued, filing now) | Slate #4F555D | #ECEDEA | Ring |
| Rehearsal, Test | Ink | Lamp tint #FCEBC4 | The ghost-light glyph (§7.6) |

### 4.3 The coverage lamps

The three tones the copy uses for coverage ("Live", "Rehearsed to the payment screen", "Screens
recorded or offered, rehearsal next") are three states of a small lamp:

| Tone | Dot (14 px) | Chip |
|---|---|---|
| **Live** | Lamp #F5B53F disc, 1.5 px Ink ring, a 3 px glow of Lamp at 35% | Ink fill, Moonlit text, the lit dot first |
| **Rehearsed** | Half-filled: Ink left half, Sunlit right half, 1.5 px Ink ring | Lamp tint fill, Ink text |
| **Plain** (recorded, offered) | Empty 1.5 px Slate ring | Sunlit fill, 1 px #B9BDC3 border, Ink text |
| **Planned** (What we file table only) | Dashed 1.5 px Slate ring (2 px dash, 2 px gap) | Transparent, dashed border, Slate text |

The shapes go from empty to half to lit, the way a light comes up, so the scale works in grayscale,
for color-blind readers and in print.

### 4.4 The light colors, by hour

The light layer (§8.2) multiplies the page by a shade map and tints the lit areas. Its colors per
hour:

| Hour | Light (lit areas) | Shade (unlit areas, multiply) | Floor of shade over text | Direction |
|---|---|---|---|---|
| 08:00 | #FFE6BF | #E3E8F0 | 0.94 | From the text side, low (15°) |
| 10:00 | #FFF0D6 | #E6EAEE | 0.95 | From the text side, 35° |
| 12:30 | #FFF7EA | #ECEDED | 0.96 | Overhead, slightly from the text side |
| 14:00 | #FFF6E4 | #EAEBEA | 0.96 | From the text side, 50° |
| 16:30 | #FFD9A0 | #E4DFE6 | 0.94 | From the text side, low (18°) |
| 18:00 | #F9D7B0 dusk, lamps #FFC46B | #D8DAE4 | 0.93 | Ambient; lamps local |
| 19:00 | Ghost light #FFC46B | Night | n/a (dark stage) | One point light |
| 20:30 | Desk lamp #FFD08A | #D9DAE0 | 0.93 | One pool, above |
| 22:00 | Interior glow #FFC97A | Night | n/a | From behind the door glass |

"From the text side" means the light always enters from the side of the section the text column sits on, falls across the words and lands on the picture (§6.2). "Floor of shade over text" is the legibility guard: wherever a text block sits, the shade never
darkens the page below that factor, so contrast never drops more than about 6%.

### 4.5 Dark mode

Dark mode is "after hours": the same room, lit by lamps instead of the sun.

| Light token | Dark value |
|---|---|
| Shade | Night #15171E |
| Sunlit | Lamplit #1F222B; raised surfaces #282C37 |
| Ink (text) | Moonlit #ECE8DF |
| Slate | #A9ADB5 (7.1:1 on Lamplit) |
| Line / Lit line | #343844 / #3A3E4A |
| Lamp | Lamp #F5B53F, unchanged (Ink text on it) |
| Lamp tint | #3A301B, with Lamp text (7.1:1) |
| Daylight | Lamplight #FFC46B at 18% opacity, as pools rather than patches |
| Fern / Ochre / Brick | #7CC79B / #F0B455 / #F08A7E |
| Firm tokens | `--firm-ink-dark`, `--firm-wash-dark` (§3.6) |

On the home page in dark mode, the day becomes the evening shift: the timeline runs from 18:00 to
22:00, so the light is lamps the whole way down, and the door at the end is the same.

### 4.6 How color is used

- **On CoFile's site**, by area: about 70% Shade and Sunlit, 15% Ink type, 10% Night (the stage,
  the close, the footer), 3% example firms' colors (inside the pictures), 2% Lamp. Lamp is rare on
  purpose: it marks CoFile's own buttons and the Live lamps, nothing else.
- **On a firm's pages**, CoFile's colors step back to neutrals (Shade, Sunlit, Ink, Slate) and the
  firm's tokens (§3.6) take over every accent. Lamp appears only in rehearsal chips and notices.
- **Gold** appears only on doors, for firms' names.
- **Never**: color-only status, red for anything but a real problem, gradients behind text other
  than the light layer, or a firm's color on CoFile's own buttons.

---

## 5. Typography

Three faces, three jobs. **Fraunces speaks** (headlines, prices: the warm, human voice of a firm
owner's world). **Atkinson Hyperlegible Next works** (everything you read, fill in or check).
**Atkinson Hyperlegible Mono is evidence** (the exact values that go to the state). All three are
under the SIL Open Font License, which matters more than it sounds: the widget and the firms' pages
for each filing run on firms' own sites and domains, and an open license means no per-domain or
per-pageview font licensing ever stands between a firm and its own page.

### 5.1 The faces

- **Fraunces** (Undercase Type, variable). Axes: optical size 9–144, weight 100–900, SOFT 0–100,
  WONK 0–1. Our settings: optical size automatic (`font-optical-sizing: auto`), weight 440 for
  headlines, WONK 0 always, SOFT tied to the hour: 20 in the morning sections, 35 at midday, 55 in
  the lamplit and night sections. The letters literally soften as the light does. The change is
  small enough that no one sees it happen; they only feel the evening is gentler. Lining figures
  (`font-variant-numeric: lining-nums`) for every price.
- **Atkinson Hyperlegible Next** (Braille Institute, variable weight 200–800, with italics).
  Designed for low-vision readers: distinct letterforms (I l 1, O 0, rn m), open apertures, a big
  x-height. That's exactly what a 60-year-old reading a proof needs, and what a client on a phone in
  a bright bakery needs.
- **Atkinson Hyperlegible Mono** (Braille Institute, variable weight 200–800). For filing values,
  fees, EINs, URLs, API keys and code. A business name in Mono is visibly "the exact text that will
  be filed": the reader can count the spaces.

Fraunces never appears on a firm's pages or its clients' pages: there the firm's font, or
Atkinson Next, takes the headings. CoFile's voice disappears and only its small type remains.

### 5.2 The scale

| Role | Face | Desktop | Phone | Weight | Tracking |
|---|---|---|---|---|---|
| Display (home hero h1) | Fraunces | 80/84 | 44/48 | 440 | −1.5% |
| Page h1 (pages behind the home page) | Fraunces | 64/68 | 40/44 | 440 | −1.2% |
| Section h2 | Fraunces | 52/56 | 34/38 | 440 | −1% |
| Price numeral (the "$45", plan prices) | Fraunces | 96/96 in the Pricing h2, 56/60 on plan cards | 56/60 and 44/48 | 480 | −2% |
| h3 | Atkinson Next | 22/30 | 20/28 | 650 | 0 |
| Lede | Atkinson Next | 22/34 | 19/30 | 400 | 0 |
| Body | Atkinson Next | 18/29 | 17/27 | 400 | 0 |
| Tick item (home's short lists) | Atkinson Next | 20/28 | 18/26 | 500 | 0 |
| UI label | Atkinson Next | 16/22 | 16/22 | 600 | 0 |
| Kicker | Atkinson Next | 16/22 | 15/22 | 650 | +2% |
| Small | Atkinson Next | 15/22 | 15/22 | 400 | 0 |
| Caption, example labels, legal line | Atkinson Next | 14/20 | 14/20 | 450 | +1% |
| Value (filing data) | Atkinson Mono | 17/26 | 16/24 | 450 | 0 |
| Code | Atkinson Mono | 15/24 | 14/22 | 400 | 0 |
| Button | Atkinson Next | 17/20 | 17/20 | 650 | +0.5% |
| Nav | Atkinson Next | 16/20 | 18/24 (menu) | 550 | 0 |

Rules:

- **Minimum sizes**: body text 17 px, nothing at all below 14 px except "with CoFile" (12 px, by
  design, and never carrying information a reader needs).
- **Measure**: ledes 56 to 64 characters, body 60 to 72.
- **Headline wrapping**: `text-wrap: balance` on every h1 and h2; `text-wrap: pretty` on ledes.
  The hero headline breaks after "LLC." on desktop by balance, not by a forced break, so Spanish
  and future edits still balance.
- **Numbers**: tabular figures in every table, fee column and price strip; fees right-aligned on
  the decimal point; the total row's figure in 650 weight.
- **Kickers** are sentence case (as the copy writes them) with a 10 px Doorlight glyph before them
  in Lamp on CoFile's pages. No all-caps text anywhere: capitals are harder to read for older eyes,
  except where the copy itself writes them (a business name like TWO SISTERS BAKERY LLC, in Mono).
- **Pairing in a line**: Mono may sit inside an Atkinson sentence (`"dryRun": true`, a fee). Fraunces
  never shares a line with either.

---
## 6. Layout

### 6.1 Grid and breakpoints

| Breakpoint | Columns | Outer margin | Gutter | Content max |
|---|---|---|---|---|
| Phone, 360 to 599 (design at 390) | 4 | 20 px | 16 px | fluid |
| Large phone and small tablet, 600 to 899 | 8 | 32 px | 20 px | fluid |
| Tablet and small laptop, 900 to 1199 | 12 | 48 px | 24 px | fluid |
| Laptop, 1200 to 1439 | 12 | 64 px | 24 px | 1240 px |
| Desktop, 1440 and up | 12 | auto (at least 96 px) | 24 px | 1240 px; full-bleed pictures run to 1440 px, then to the edge |

**Spacing scale** (px): 4, 8, 12, 16, 24, 32, 40, 56, 72, 96, 128, 168. Nothing off-scale.

**Section rhythm** on the home page: 168 px above and below each section on desktop, 128 px on
tablet, 96 px on phones. The full-bleed sections (Rehearsals, Close) run edge to edge with 128 px
of inner padding (72 px on phones). Between a headline and its lede: 24 px. Lede to ticks: 32 px.
Ticks to the "For firms" or "How it works" link: 24 px. Text to picture on phones: 40 px.

### 6.2 How text and pictures sit together

The copy is short, so the pictures get the room. The standard home section is **a 4-column text
column, a 1-column breath, and a 7-column picture**, with the picture at least 560 px tall on
desktop. Sections alternate sides for rhythm, and **the light always comes from the text side**:
it enters over the words and falls onto the picture, so the eye travels the same way the light
does, from the line to the thing it describes.

| # | Section | Desktop layout |
|---|---|---|
| 1 | Hero | Text cols 1–5 (the hero gets one more column for the long headline), picture cols 6–12, the picture bleeding off the right edge by 64 px |
| 2 | Firms | Picture cols 1–7, text cols 9–12 |
| 3 | Requests | Text cols 1–4, picture cols 6–12 |
| 4 | The proof | Picture cols 1–7, text cols 9–12 |
| 5 | After | Text cols 1–4, picture cols 6–12 |
| 6 | Coverage | Headline and lede across cols 1–8; the four tiles across all 12 |
| 7 | Rehearsals | Full-bleed dark stage; the text sits inside the ghost light's pool on cols 1–5, the log on cols 7–12 |
| 8 | Pricing | Headline across cols 1–10; the price strip across all 12; the two small lines under it, cols 1–8 |
| 9 | Close | Full-bleed night door; text on cols 1–6, vertically centred in the door's glow |

Vertical alignment: the headline's cap height lines up with the top edge of the picture's main
object (the desk, the doors, the proof sheet), not with the picture's frame.

### 6.3 Phones

Every section becomes one column, and the picture comes early: **headline, lede, picture, ticks,
link**. The picture moves visually with CSS `order`; the reading order for assistive tech stays the
copy's order, since the pictures are labeled examples that support the text. Pictures run full
width with 0 margin (edge to edge), and their contents keep 20 px of inner margin. Each picture has
a phone composition of its own in §9, never a shrunk desktop one.

On phones the sticky header shrinks to 56 px. Once the hero's "Run a free rehearsal" button has
scrolled away, a bottom bar slides up (64 px, Sunlit at 96% with a 12 px backdrop blur, a 1 px Line
rule on top) carrying the same button full width. It hides while the Close section's own button is
on screen.

### 6.4 The pages behind the home page

Each opens with a **page head**: kicker, h1 and lede on cols 1–7, and a head picture on cols 8–12
(desktop) or full width below the lede (phone). Then their sections use the same 4 + 7 anatomy as
the home page where there's a picture, and a centered 8-column reading column where there isn't.
Long lists (How it works' six proof points, Pricing's "What counts as a filing.") run as a single
column at 64 characters.

### 6.5 The firm's pages and the apps

- **Filing desk and dashboard**: the Pane (76 px), a 52 px nav row under it, then content on a
  12-column fluid grid, max 1200 px. "Narrow" pages (a filing, a form, setup steps) use a centered
  720 px column.
- **Client pages** (a firm's page for one filing, a client link): the Pane, the firm's doorlight
  wash, then a centered 640 px column. One field per row, labels above fields.
- **The proof**: centered 760 px sheet on Shade, 48 px padding (20 px on phones).
- **Emails**: 600 px, single column, 32 px padding.
- **Docs**: a 248 px nav, a 720 px reading column, and a 420 px code rail at 1280 px and up.

### 6.6 Breathing

The home page has about 330 words and nine pictures. That ratio is the brief: a firm owner should be
able to get the whole argument from the headlines and pictures alone, in under a minute, at any
scroll speed. So: one idea per screen, generous space around every headline, nothing competing with
a picture's main object, and no section taller than about 1.3 screens on desktop.

---

## 7. Art direction

### 7.1 The light layer

The light that runs through the site is real-time where it can be and pre-rendered where it can't,
but it always comes from the same source material: **gobos** (from the theatre-lighting term for a
shape that light passes through). Each gobo is a grayscale mask that says where light gets through:

| Gobo | Used in | What it is |
|---|---|---|
| G1 Harbor & Pine door | Hero; How it works head | The door's glass panel with "HARBOR & PINE CPA" in gilded capitals and the H&P roundel (letters block light, so they fall as soft shadow letters inside the light), the door's muntin bars, and a pine branch outside, beyond the glass |
| G2 Two doors | Firms | Two glass panels side by side, each with its own lettering, split by a door jamb |
| G3 Sunbeam | Requests | One soft-edged shaft of light with drifting dust motes |
| G4 Light table | The proof | No mask: an even under-glow with a falloff to the edges of the table |
| G5 Low window | After | A tall window at golden hour, its light stretched long across the desk, the H&P name returning faintly in the stretch |
| G6 Dusk windows | Coverage | No mask: an ambient dusk tint plus small lamp glows at each Live and rehearsed dot |
| G7 Ghost light | Rehearsals | A single point light on a stand: a pool, falling off to dark |
| G8 Desk lamp | Pricing | A cone from above: an elliptical pool over the price strip |
| G9 Night door | Close | Frosted glass glowing from inside, with the faint chalk guidelines of letters not yet painted |

**How they're made.** A lighting photographer shoots the real light (§7.4, the light studies) and a
3D artist rebuilds each one in Blender to match, then bakes it as a mask: 2048 × 2048, 8-bit, with
a full mip chain, encoded as KTX2 (UASTC) for WebGL and as a 1600 px AVIF for the CSS fallback.
Masks have no text baked in except the example firms' lettering, which is also rendered live from an
MSDF font so it stays sharp.

### 7.2 The 3D scenes

Each is a small, self-contained scene, loaded only when its section approaches the viewport.

| Scene | Where | What's in it | Budget |
|---|---|---|---|
| **The door** | For firms head, sign-up, setup done, Close | A classic office door: stained white-oak frame and rails (no brand of door), a tall glass panel in the upper 60%, clear glass with a frosted band behind the lettering, a brass lever handle, a brass kick plate. Gilding live on the glass (§7.3). | 18k triangles, 3 materials, 2 × 1K textures + 1K HDR, ≤ 420 KB total |
| **Two doors** | Home: Firms | Two door glass panels in a shared corridor wall, cropped to the glass and the top of the rails, the Harbor & Pine one in oak, the Northgate one in painted steel (Northgate Blue frame). | 22k triangles, ≤ 480 KB |
| **Light table** | Home: the proof; How it works | A printer's light table seen from slightly above: a frosted acrylic top glowing, a thin aluminium edge. The proof and its layers are DOM, laid on it. | 2k triangles, ≤ 120 KB |
| **Homecoming desk** | Home: After | A desk surface in warm walnut, a low window's light across it, the record card and two document sheets as bendable planes. | 6k triangles, ≤ 260 KB |
| **The stage** | Home: Rehearsals; What we file | A black-box stage: floorboards, a ghost light (a bare bulb in a wire cage on a stand), a row of tall flats (the screens), the backs of empty seats in the foreground as silhouettes. | 14k triangles, ≤ 380 KB |

Rendering: three.js for the door scenes (it earns its weight there: PBR, transmission, an HDR
environment); a hand-written WebGL2 renderer (on OGL) for the light layer, the light table, the
sunbeam and the stage, which are mostly 2.5D shader work.

### 7.3 Gilding, specified

The single most important material on the site. The illustrator and the 3D studio work from a real
reference: a traditional glass gilder letters two real door panels for us (Harbor & Pine CPA and
Northgate Payroll, the example firms) and we scan them.

- **Harbor & Pine**: 23-carat gold leaf, water-gilded on the inside of the glass, in roman capitals
  drawn by the lettering artist (not a font). Burnished face with **matte centres** (the gilder's
  technique of a matte line inset in each stroke; ours inset 14% of the stroke width). A 6% outline
  in Pine enamel and a drop shade at 135° in Pine darkened by 30%. The roundel monogram above the
  name in enamel Pine with gold.
- **Northgate Payroll**: aluminium leaf, block capitals with a slight slab, a Northgate Blue outline
  and a 45° shade. Crisper, cooler, modern.
- **The signature**: bottom-right corner of each glass, "with CoFile" in the wordmark, 1/40 of the
  glass width, in plain white enamel. Small enough that you only notice it when the camera pulls
  focus to it.
- **Shader**: lettering mask from an MSDF atlas (so any firm's name can be gilded live, §10); gold
  as metalness 1, base color #E2B65A, roughness 0.12 on the burnished face and 0.45 on the matte
  centres; a faint normal map from the scanned leaf's skewings (the tiny wrinkles of real leaf),
  1K, tiling; the glass on top with roughness 0.02 and a 4% reflection. Environment: a 1K HDR of a
  bright office interior with one big window.
- **Painting it**: for the example firms, the lettering artist supplies stroke paths for every
  letter, in a sign painter's stroke order, and the reveal paints along them. For any other name
  (sign-up), a left-to-right brush wipe with a noisy edge.

### 7.4 Photography

Four series. All shot in natural light only, at the hours in §2, by photographers who are good with
light first and people second.

**A. Light studies (by an architectural and interiors photographer).** The data behind the gobos.
One room with plaster walls, a south-east window and a pine outside, and a glass-paneled door,
shot from 07:30 to 22:00 at every hour in §2: HDR brackets (−4 to +4 EV), a clean plate of the empty
wall, the same wall with the door panel's shadow, and a gray card and color chart in every frame.
Also: the corridor with two doors at 10:00; a single sunbeam with dust (shot against black velvet,
a haze machine at its lowest setting); a desk at golden hour; a theatre's ghost light on an empty
stage (a real small theatre, house lights off); a desk lamp's pool on a walnut desk.

**B. The people behind it (by a documentary portrait photographer).** "Built and run by filing
professionals. When a filing needs a person, one of them takes over." These are CoFile's real
filing professionals, photographed where they work, in the same window light, never posed
"working". Shot list: each person at their desk, three-quarter, 50 mm, window as key light; hands on
a keyboard with a filing desk on screen (screen replaced in post with example data); one person
reading a printed proof at the window; a team moment around one screen, natural, nobody looking at
the camera. Used as: three 40 px circular portraits beside the hero's note, larger portraits on For
firms and How it works, and one on Questions beside "Is a person involved?". Real names in alt text
`[copy needed]`. Never stock, never models.

**C. Firms at their doors (same photographer).** Firm owners and staff, 40 to 65, at work: a CPA
reading her phone at her desk at 8:00; a payroll firm owner at his office's glass door at 10:00; a
title company's closer with a folder; a fractional CFO at a café table. Cast from real firm owners
who agree to appear (they are models here, not customers or endorsements); every visible sign,
screen and door shows only the example firms' names. Used on For firms and in emails' sign-up
welcome only, never as testimonials.

**D. Clients (same photographer).** The small-business side: two sisters (actors) opening a bakery
at dawn, one texting with flour on her hands; a contractor in a truck cab; a first-time founder at
a kitchen table at night. Every phone screen shows the example text or a firm's example client page,
replaced in post. Used on the Requests picture (§9.3, the bakery at dawn behind the phone) and on
For firms.

**E. The film (by a craft-film director and a small crew).** The glass gilder lettering the two
example doors: chalk guidelines and the pounce pattern, the leaf lifted on a gilder's tip, the water
size, the burnish with cotton, the outline in enamel, the tiny signature in the corner. 4K, 100 fps
for the macro shots. It feeds three things: the reference for the shader, a 20-second loop for the
For firms page head on phones (where real-time gilding is too heavy), and a 45-second film for
social and the press page.

### 7.5 Illustration

Very little, on purpose; the light does the illustrating.

- **No illustrated people.** People are photographs, or not there.
- **Diagrams**: one, the day arc (§11.10): the stages of a filing as points along the sun's path,
  used in After, on the filing detail page and in the docs' lifecycle guide.
- **Empty states**: small light vignettes (an empty desk in a patch of morning light; a door gap
  with a letter slipping under it for "Check your email"), drawn as flat light shapes in Shade,
  Sunlit and Daylight, 240 × 160, SVG with one gradient.
- **Documents**: depicted as CoFile's own neutral document cards (§9.5), never facsimiles.

### 7.6 Iconography

- 24 px grid, 1.75 px stroke, round caps and joins, Ink (or Moonlit on Night). Drawn, not taken
  from a library, so they share the Doorlight's 20.6° lean wherever an icon has a diagonal.
- **The set**: filing desk, new filing, client link, page (a firm's filing page), button (for
  "A button for your own website"), registered agent (a small building with a door), text message,
  email, WhatsApp-style chat (a generic double bubble, never the WhatsApp logo), Slack-style hash
  (generic, never the Slack logo), signature (a pen nib), Ready to pay (a card outline), billing,
  documents, EIN letter (an envelope with a sheet), settings, team, API key, webhook, docs.
- **The ghost-light glyph** (rehearsal, everywhere: chips, notices, emails, the filing desk): a bare
  bulb (a 7 px circle) in a wire cage (two curved 1.5 px lines) on a stand (a vertical line to a
  tripod of three short feet). It replaces any warning triangle for rehearsals: a rehearsal is a
  stage, not a hazard.
- **List markers**: the home page's ticks become small Doorlights (8 × 11 px) in Ink at 70%, or in
  Lamp on Night. They mark "here is something you get", not "checked". Lists on the support pages
  use a plain 6 px Slate en rule instead.
- **Never**: padlocks, shields, vaults, check-in-circle badges, AI sparkles. The AI in "AI drafts the
  filing" isn't a character; its picture is the sunbeam.

### 7.7 Texture

- **Blue-noise dither** (a 128 × 128 PNG at 2% opacity) on every gradient and light patch, so dark
  and warm gradients never band on cheap screens.
- **Plaster**: a 512 px tiling micro-texture at 1.5% luminance on Shade and Dusk, only in the home
  page's backgrounds. You feel it on a good screen and never see it on a bad one.
- **Walnut, oak, floorboards, acrylic, leaf**: in the 3D scenes only, from scans.
- **Nothing on Sunlit.** The surfaces you read are clean.

### 7.8 Product imagery

- The UI in every picture is **real UI**, built from the product's component library, rendered in
  the DOM with example data, so it's sharp, translatable and always matches the product. No
  screenshots, no mockup JPEGs.
- Devices: a generic phone (2 px Ink bezel, 44 px corner radius, no notch brand cues) only where the
  copy is about a phone or a text message. No laptop frames: the filing desk floats as a sheet of UI
  in the light.
- Every picture keeps its small example label from the copy ("Example · test details · not a real
  firm", "Sample proof · test details · not a real business" and so on), set in the caption style,
  Slate, under the picture's bottom-left corner.

### 7.9 What never appears

State seals, the IRS logo or anything resembling it, eagles, flags used as emblems, screenshots of
real government websites (the state's review page is drawn as a neutral sheet), real firms' names or
marks, stock handshakes, padlocks, shields, robots, confetti.

---
## 8. Motion

### 8.1 Principles

1. **Light moves slowly; things settle quickly.** Light changes over seconds (1.2 to 2.4 s). UI
   answers in milliseconds (120 to 320 ms). Nothing in between: no bouncy middle.
2. **Motion only where it sells.** The moments in §8.3 are the only scripted motion on the site.
   Everything else fades in once (240 ms, 8 px rise) and stays put.
3. **Ambient motion is nearly still.** Leaves sway, a cloud passes: never more than 3% luminance
   change, never faster than one cycle in 8 seconds. You should be able to read a lede on top of it
   without noticing it.
4. **Never hijack the scroll.** No scroll-jacking, no speed changes, no section pinned for longer
   than 60% of a viewport. Scroll-linked motion is scrubbed by the reader's own scrolling, and every
   moment also completes on its own if the reader stops.
5. **Every moment has an end frame that is a good still.** That frame is the reduced-motion
   version, the Tier C image and the social card.

### 8.2 The light layer, technically

- **One fixed canvas** (`position: fixed; inset: 0; pointer-events: none`) above the content,
  composited with `mix-blend-mode: multiply`. It renders a shade map: 1.0 where light falls, the
  hour's shade color elsewhere. Because the page is designed fully lit, multiply only ever darkens a
  little and tints cool, so lit areas read warm by contrast. One blend mode, one draw call per gobo.
- **Resolution**: half the device pixel ratio, upsampled bilinearly. Light is soft; nobody can tell.
  Blue-noise dither in the shader against banding.
- **Penumbra**: each gobo samples its mip chain with a level of detail set by its distance from the
  "glass": the door's letters (near) cast crisp shadows, the pine beyond the glass (far) blurs.
- **Anchors**: each section marks where its light lands with `data-light="hero"` and so on. A
  ResizeObserver caches their page offsets; per frame the shader gets only the scroll position, so
  there's no layout read in the frame loop.
- **The hour**: one uniform, `uHour`, eased toward the hour of the section in the middle of the
  viewport with a critically damped spring (half-life 0.6 s). Color, direction, SOFT on the type and
  the CSS shadow direction all read from it.
- **Text guard**: elements with `data-light-protect` (every text column) clamp the shade to the
  hour's floor (§4.4) inside their rectangle.
- **Shadows follow the sun**: card shadows are CSS, with their x-offset driven by a custom property
  from +8 px (morning, sun from the left) through 0 (noon) to −8 px (late afternoon). In Tier C the
  value is set per section, statically.
- **Pausing**: stops when the tab is hidden, when no anchor is on screen, and after 20 seconds
  without input (it settles to its last frame). Resumes on scroll.
- **Budget**: at most 2 ms of GPU per frame on Intel Iris Xe; 60 fps while scrolling, 30 fps when
  idle.

### 8.3 The moments

| # | Moment | Where | Trigger | Duration | What moves | Why it sells |
|---|---|---|---|---|---|---|
| M1 | **Sunrise** | Hero | Page load, after the headline paints | 1,600 ms | The light layer comes up from pre-dawn blue (#D7DCE6 shade) to 08:00; Harbor & Pine's lettered light slides 40 px into place across the desk; the pine shadows start their sway | The firm's name arrives as light on its own desk: "under your own name" |
| M2 | **The desk fills** | Hero | 400 ms into M1 | 900 ms total | The Pane's lintel draws left to right (300 ms); the four rows rise 8 px and fade in, 90 ms apart; "Proof ready to approve" warms once (Lamp tint pulse, 600 ms, no loop); "with CoFile" fades in last, 200 ms | A real desk, busy and calm. The thing that needs you is gently obvious |
| M3 | **The gilding** | Firms | Picture 40% in view | 2,600 ms | Each door's name is painted along its stroke paths (Harbor & Pine first, Northgate 300 ms later); a burnish sheen sweeps across each name (700 ms); then the camera pulls focus to the bottom-right corner of the glass, where "with CoFile" sits tiny (600 ms), and back (500 ms) | "Your name on the door. Ours in small type." Said by the picture, in that order |
| M4 | **Two lights, one page** | Firms | End of M3 | 900 ms | Each door's light falls on the client page below it; the page under each door takes on that firm's lintel, logo, font and button color (cross-fade 400 ms, from neutral) | "Your logo and color on every page your client sees" |
| M5 | **The sunbeam** | Requests | Picture 45% in view; replays on tap or hover of the bubble | 2,400 ms | The beam brightens (300 ms). The phrases that matter lift off Ana's bubble as glyph particles: "the bakery", "me and my sister, 50/50", "in Jersey City". They travel the beam on curved paths (900 ms, 120 ms apart) and settle into Business name, Members and City as Mono values. Then the saved answers fill in from the right in the firm's color (300 ms each, 80 ms apart). The chip "For your team to check" settles last | "Nobody retypes it": you watch the retyping not happen |
| M6 | **Layers on the light table** | The proof | Picture 40% in view | 1,800 ms | The proof's four numbered parts are laid on the glowing table one by one like transparencies: details, fees, the state's review page (seen through the proof, slightly offset), the button. Each lands with a 4 px settle. The callout numbers appear as Lamp discs. The button warms last and stays the brightest thing | "One page: every detail, every fee", with the firm's one button |
| M7 | **Homecoming** | After | Scrubbed by scroll through the section | Scroll-linked, ~1 screen | The sun travels an arc over the picture through "Approved", "Submitted", "Filed"; each stage lights as the sun passes. At "Filed" the light turns golden and the two documents drift in from the top right and settle on the record (spring: stiffness 170, damping 26) | "Then it's filed, and the papers come back to you" |
| M8 | **The windows switch on** | Coverage | Tiles 30% in view | 1,200 ms | Inside each tile, the lamps come on row by row (60 ms apart): Live lamps glow, rehearsed ones warm to half, plain ones stay dark rings. The tiles' backgrounds warm a little with each lit lamp | Coverage feels like a lit building, and grows brighter as types go live |
| M9 | **The run-through** | Rehearsals | Log 35% in view | 3,200 ms | The ghost light breathes once. Each log row lights as its cue comes (400 ms apart), and the matching flats on the stage behind light up. "Pay Now · held, on purpose" lights like every other cue, in the same color; the last flat stays in soft ghost light | A rehearsal is the whole show, on the real stage, no audience |
| M10 | **Lamp on** | Pricing | Strip 40% in view | 800 ms | A desk lamp's pool warms over the price strip; the "$45" in the headline settles from 600 to 480 weight (a variable-font tween, 600 ms) | Prices you can read at a glance, in good light |
| M11 | **The waiting door** | Close | Section 30% in view | 2,000 ms | A door at night: its frosted glass glows on from inside (1,200 ms); faint chalk guidelines for a name appear on the glass (800 ms) and stay. No name. | "Run one rehearsal. Then decide." The door is ready for yours |
| M12 | **Your name on the door** | Sign-up | As the "Firm name" field changes | 40 ms per character, then 900 ms | The typed name is gilded onto the same door, letter by letter; when typing pauses for 600 ms, the burnish sheen sweeps across it | The copy says "put your name and logo on the door"; this does it, on the first screen |

### 8.4 Small motion (components)

| Element | Motion |
|---|---|
| Primary button hover | A narrow band of light sweeps across, left to right, 600 ms, `ease-out`, once per hover. Background steps from Lamp to #F8C25A in 120 ms |
| Button press | 1 px down, background #E9A52B, 80 ms |
| Focus | The 3 px ring appears at once (no animation), so keyboard users never wait |
| Chips and status | Change color by cross-fade, 200 ms |
| Accordions (Questions) | Height animates with `interpolate-size`, 240 ms; the chevron turns 90°, 200 ms |
| Nav on scroll | The header goes from transparent to Sunlit at 92% with a 12 px blur over 160 ms, after 24 px of scroll; it switches to its Night version over dark sections |
| Table rows | Hover: a light patch slides under the row, 160 ms |
| Notices | Rise 8 px and fade in, 240 ms; never shake |

### 8.5 Timing tokens

| Token | Value | Use |
|---|---|---|
| `--ease-daylight` | cubic-bezier(0.22, 0.61, 0.36, 1) | Entrances, light arriving |
| `--ease-settle` | spring 170 / 26 (or cubic-bezier(0.34, 1.2, 0.64, 1) where springs aren't available) | Papers, layers landing |
| `--ease-quick` | cubic-bezier(0.2, 0, 0, 1) | UI |
| `--t-micro` | 120 ms | Hovers |
| `--t-ui` | 240 ms | Panels, notices |
| `--t-reveal` | 900 ms | Picture parts |
| `--t-light` | 1,600 ms | Light changes |

### 8.6 Tiers and reduced motion

Same content in every tier; only the light changes.

| Tier | Who gets it | Light | Pictures |
|---|---|---|---|
| **A, full** | WebGL2, at least 8 logical cores or `deviceMemory` ≥ 8, no Save-Data, no reduced motion, and a 2-second frame-time probe under 14 ms | Real-time light layer and 3D scenes | Live, as in §8.3 |
| **B, light** | Most phones and older laptops; anyone whose frame probe lands between 14 and 24 ms | CSS: each section's gobo as an AVIF with `mix-blend-mode: multiply`, drifting with a 12-second CSS transform loop | The scripted moments as short muted video loops (AV1 with an HEVC fallback, 6 to 8 s, 720 px tall, ≤ 600 KB each) under live DOM UI, or as DOM animations where the moment is mostly UI (M2, M4, M6, M8, M9, M10) |
| **C, still** | `prefers-reduced-motion`, Save-Data, no JavaScript, frame probe over 24 ms, or a battery-saver hint | Each section's end-frame light as a static AVIF | Every picture at its end frame. Live DOM UI, no animation beyond a 240 ms fade |

If frame time degrades mid-session (ten frames over 24 ms in a row), the page steps down a tier
quietly and never steps back up in that visit.

---
## 9. The home page, section by section

### 9.0 The pictures, and the frame around them

I keep a picture in every one of the seven places the stand-ins hold today, redesign each one
fully, and add four of my own. That makes eleven visual pieces on a 330-word page, which is the
point: the pictures carry the page.

| # | Picture | Section | Replaces | Kind |
|---|---|---|---|---|
| P0 | **The light layer**, behind all the type | Every section | (new) | Real-time light, §8.2 |
| P1 | **The desk in the doorlight** | Hero | `DeskVisual` | Live UI in a light scene |
| P1b | **The people**: three small portraits | Hero, beside the note | (new) | Photography |
| P2 | **Two doors** | Firms | `TwoFirmsVisual` | 3D doors + live UI |
| P3 | **The sunbeam** | Requests | `TextToFormVisual` | Live UI + particles |
| P4 | **The light table** | The proof | `ProofVisual` | Live UI on a lit surface |
| P5 | **Homecoming** | After | `PapersVisual` | 2.5D scene + live UI |
| P6 | **Four windows** | Coverage | `StateTiles` | Live UI, lit |
| P7 | **The ghost light** | Rehearsals | `RehearsalLog` | 3D stage + live UI |
| P8 | **The lamp** | Pricing | (new; no stand-in) | Light only |
| P9 | **The waiting door** | Close | (new; none today) | 3D door |

#### The beta banner

Kept on the home page, as the copy requires. It's the thin line of light under a door: a Night
strip at the very top of the page, its bottom edge a 1 px Lamp line with a 6 px glow.

- **Copy**: "**Beta**" then "CoFile is in beta. Any filing can run as a free rehearsal on the
  state's real website. It stops before the last button, so nothing is filed or paid. Filing types
  go live one at a time. Questions or problems? hello@cofile.app"
- **Desktop**: 44 px tall, one line, centered on the 1240 px column. "Beta" as a Lamp chip (Ink
  text, 13 px, 650, 22 px tall, radius 11) with the ghost-light glyph; the sentence in Moonlit,
  14 px; the email as a Moonlit link with a 1 px underline at 3 px offset.
- **Phone**: the text wraps to four lines at 14/20; 20 px side padding. It scrolls away with the
  page and never sticks.

#### The header

```
DESKTOP 1440                                                                                72 px
┌──────────────────────────────────────────────────────────────────────────────────────────────┐
│ ◢ CoFile     How it works   For firms   What we file   Pricing   For platforms    Log in  [ Run a free rehearsal ] │
└──────────────────────────────────────────────────────────────────────────────────────────────┘
PHONE 390                                                                                   56 px
┌──────────────────────────────────────┐
│ ◢ CoFile                Log in   ≡   │
└──────────────────────────────────────┘
```

- Lockup at 15 px cap height. Nav in Atkinson Next 550, 16 px, Ink, 32 px apart; the current page
  gets a 2 px Ink underline 6 px below the text. "Log in" as a quiet button; "Run a free rehearsal"
  as the small primary button (44 px, Lamp).
- Transparent at the top of the page; after 24 px of scroll it becomes Sunlit at 92% with a 12 px
  backdrop blur and a 1 px Line rule; over Night sections it switches to Night at 92% with Moonlit
  text and the mark in Lamp.
- **Phone menu** (the ≡ button, accessible name `[copy needed]`): a full-screen Night sheet. The five
  nav items in Fraunces 32/40, Moonlit, 20 px apart; "Log in" and "Run a free rehearsal" at the
  bottom, full width, 56 px. It opens with the light coming on behind the list (a 400 ms glow from
  the top-left).

#### The footer

Night, with the same 1 px Lamp line on its top edge: the page ends with light under the door, as it
began.

- Row 1 (Moonlit, 15 px): the mark in Lamp, then "CoFile · the filing desk behind your firm",
  "New York · New Jersey · Florida · IRS" and "Building a filing product? CoFile for platforms" (the
  last two words a link), spaced across the 12 columns.
- Row 2 (Slate-on-Night #A9ADB5, 14 px): "CoFile is not a law firm or a government agency, isn't
  affiliated with any state or the IRS, and doesn't give legal or tax advice." and the links
  "Terms · Privacy · Security · FAQ · hello@cofile.app".
- Phone: each item on its own line, 12 px apart; links as 44 px tall tap rows.

---

### 9.1 Hero, 08:00

**Copy, in order:** kicker "For CPA, payroll, fractional CFO and title firms" · h1 "Your client
needs an LLC. Say yes, under your own name." · sub "CoFile files your clients' formations, EINs and
payroll registrations on the official state and IRS websites, once you approve." · buttons "Run a
free rehearsal" and "See pricing" · note "Built and run by filing professionals. When a filing needs
a person, one of them takes over."

```
DESKTOP 1440 × 900 (below the 44 px beta strip and 72 px header)
┌──────────────────────────────────────────────────────────────────────────────────────────────┐
│                                         ░░░░░░░░░ morning light through the door glass ░░░░░░░ │
│ ◢ For CPA, payroll, fractional CFO      ░  ▐ HARBOR & PINE CPA ▌  (soft shadow letters)  ░  ⁂ pine│
│   and title firms                       ░  ┌──────────────────────────────────────────────┐  ░  │
│                                         ░  │▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀ Pine lintel ▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀│  ░  │
│ Your client needs                       ░  │ (H&P) Harbor & Pine CPA · Filing desk  with CoFile │ │
│ an LLC. Say yes,                        ░  ├──────────────────────────────────────────────┤  ░  │
│ under your own                          ░  │ Client filings                   [ New filing ] │    │
│ name.                                   ░  │ Two Sisters Bakery LLC        ( Proof ready to   │    │
│                                            │ New Jersey LLC formation        approve )      │    │
│ CoFile files your clients' formations,     │ Hudson Ledger LLC                    ( ● Filed ) │    │
│ EINs and payroll registrations on the      │ New York LLC formation                         │    │
│ official state and IRS websites, once      │ Hudson Ledger LLC      ( ● Filed, IRS letter saved ) │
│ you approve.                               │ EIN                                            │    │
│                                            │ Orchard Lane Inc.                ( ○ Submitted ) │    │
│ [ Run a free rehearsal ]  See pricing →    │ Payroll registration (NJ-REG)                  │    │
│                                            └──────────────────────────────────────────────┘    │
│ (◐◑◒) Built and run by filing professionals.   Example · test details · not a real firm        │
│       When a filing needs a person, one of them takes over.                                    │
└──────────────────────────────────────────────────────────────────────────────────────────────┘
```

**Type and buttons.** Kicker in Atkinson Next 650, 16 px, Slate, with the 10 px Doorlight in Lamp.
The h1 in Fraunces 80/84, weight 440, SOFT 20, Ink; balance breaks it into four lines in five
columns. The sub in the lede style, 22/34, Slate, max 30 em. Then "Run a free rehearsal" (primary,
Lamp, 56 px on the hero) and "See pricing" as a quiet arrow link (Ink, 17 px, 650, a 1 px underline
that grows to 2 px on hover, and a → that moves 3 px). 24 px between them.

**P1b, the people.** Before the note: three circular portraits of CoFile's real filing
professionals (§7.4 B), 40 px, overlapping by 10 px, each with a 2 px Sunlit ring, warm-graded to
the morning light. The note itself in Atkinson Next 16/24, Ink at weight 500, so it reads as a
promise rather than fine print. Alt text for the portraits `[copy needed]` (their names).

**P1, the desk in the doorlight: what it shows.** Harbor & Pine CPA's filing desk, as live UI with
the stand-in's exact rows:

- **The Pane**: Pine lintel; the H&P roundel at 44 px; "Harbor & Pine CPA" in Libre Caslon Text
  600, 20 px; "Filing desk" in the caption style, Slate, after a 12 px gap; "with CoFile" at the
  right.
- **The header row**: "Client filings" in Libre Caslon Text 22 px; "New filing" as the firm's
  primary button (Pine, white text, 40 px, a non-interactive replica in the picture).
- **Four rows**, 64 px each, a 1 px Lit line between: the business in Atkinson Next 650, 17 px; the
  filing type below in 15 px Slate; the status chip at the right:
  - Two Sisters Bakery LLC · New Jersey LLC formation · "Proof ready to approve": the firm's
    "your turn" chip (`--firm-tint` fill, Pine text, a filled Pine dot), the one warm call to act.
  - Hudson Ledger LLC · New York LLC formation · "Filed": Fern good chip, filled dot.
  - Hudson Ledger LLC · EIN · "Filed, IRS letter saved": Fern good chip.
  - Orchard Lane Inc. · Payroll registration (NJ-REG) · "Submitted": the in-progress chip (Slate
    ring).
- **Caption** under the picture's bottom-left: "Example · test details · not a real firm".

**Composition.** The desk sheet is Sunlit, 640 px wide, radius 16, and floats about 24 px off the
Shade wall: its shadow falls 8 px to the right (morning). Behind it, the G1 gobo lays a parallelogram
of Daylight across the wall from the upper left. Inside that light, Harbor & Pine's gilded name and
roundel fall as soft shadow letters on the wall *just above* the sheet, and the bottom of the light
crosses the sheet's Pane, where the same name is printed. The firm's name is there twice: once as
light, once as type. The pine branch beyond the glass throws a blurred, swaying shadow in the top
right corner. The text guard keeps every shadow letter off the rows.

**Motion.** M1 (sunrise) and M2 (the desk fills), §8.3. Ambient afterwards: the pine sways (one
cycle in 9 s, 6 px), a cloud passes every 14 s (−3% light for 2 s). Hovering a row: the light patch
slides under it (160 ms). Nothing in the picture is clickable; the whole picture has one accessible
name, "An example firm's filing desk" (the stand-in's label).

**States.** Tier A as above. Tier B: G1 as a static AVIF drifting 12 px over 12 s; the rows animate
in the DOM. Tier C: the end frame, with the light already up. Dark mode: the desk at 18:00, a desk
lamp from the left, the Pane in `--firm-wash-dark`.

```
PHONE 390 (under the 4-line beta strip and the 56 px header)
┌────────────────────────────────────┐
│ ◢ For CPA, payroll, fractional CFO │
│   and title firms                  │
│ Your client needs an               │
│ LLC. Say yes, under                │   Fraunces 44/48
│ your own name.                     │
│ CoFile files your clients'         │   19/30, Slate
│ formations, EINs and payroll …     │
│ [      Run a free rehearsal      ] │   56 px, full width
│            See pricing →           │   48 px tap target
│ (◐◑◒) Built and run by filing      │
│ professionals. When a filing …     │
│░░░░░ HARBOR & PINE CPA (light) ░░░░│   picture: edge to edge
│┌──────────────────────────────────┐│
││(H&P) Harbor & Pine CPA  with CoFile││
││Client filings        [New filing]││
││Two Sisters Bakery LLC            ││
││New Jersey LLC formation          ││
││( Proof ready to approve )        ││   chip on its own line
││Hudson Ledger LLC …               ││
│└──────────────────────────────────┘│
│ Example · test details · not a …   │
└────────────────────────────────────┘
```

On phones "Filing desk" moves below the firm's name in the Pane; the chips sit on their own line
under each row's filing type, so "Filed, IRS letter saved" never truncates. The light is G1 as a
static AVIF (Tier B by default on phones), cropped so the shadow name falls across the top of the
card.

---

### 9.2 Firms, 10:00

**Copy:** h2 "Your name on the door. Ours in small type." · lede "Your logo and color on every page
your client sees." · ticks "A link for each client" · "A page for every filing you offer" · "A button
for your own website" · "Your registered agent, or ours" · link "For firms"

```
DESKTOP: picture cols 1–7, text cols 9–12
┌─────────────────────────────────────────────┐
│ ┌──────────────────┐ ║ ┌──────────────────┐ │        Your name on the
│ │ (H&P) roundel    │ ║ │  ⌃               │ │        door. Ours in
│ │ HARBOR & PINE    │ ║ │ NORTHGATE        │ │        small type.
│ │      CPA         │ ║ │ PAYROLL          │ │
│ │  gold leaf, pine │ ║ │ silver leaf,     │ │        Your logo and color on
│ │  shade      ·wC· │ ║ │ blue shade  ·wC· │ │        every page your client
│ └──────────────────┘ ║ └──────────────────┘ │        sees.
│ ░░░ Pine-warm light ░║░░ blue-cool light ░░ │
│ ┌──────────────────┐ ║ ┌──────────────────┐ │        ◢ A link for each client
│ │▀▀▀ Pine ▀▀▀▀▀▀▀▀▀│ ║ │▀▀▀ Blue ▀▀▀▀▀▀▀▀▀│ │        ◢ A page for every filing
│ │(H&P) Harbor & Pine│ ║ │ NORTHGATE  with C│ │          you offer
│ │Start your New    │ ║ │Start your New    │ │        ◢ A button for your own
│ │Jersey LLC        │ ║ │Jersey LLC        │ │          website
│ │[Business name   ]│ ║ │[Business name   ]│ │        ◢ Your registered agent,
│ │[Who owns it     ]│ ║ │[Who owns it     ]│ │          or ours
│ │[    Continue    ]│ ║ │[    Continue    ]│ │
│ └──────────────────┘ ║ └──────────────────┘ │        For firms →
└─────────────────────────────────────────────┘
  Two example firms · same page, each in its own brand          (·wC· = "with CoFile", gilded tiny)
```

**P2, two doors: what it shows.** Two office doors side by side in a bright corridor, cropped to
their glass and the top of their lower rails, and in front of each, standing in the light that
comes through it, the **same client page**: "Start your New Jersey LLC", with the fields "Business
name" and "Who owns it" and the button "Continue". Each page wears its own firm: the Pane with that
firm's lintel and logo, the heading in that firm's font (Libre Caslon Text for Harbor & Pine, Archivo
for Northgate Payroll), the button in that firm's color, and "with CoFile" in small type at the right
of the Pane. Same layout, same words, same spacing: only the brand changes. That's the argument.

**The doors.** Left: Harbor & Pine CPA, white-oak frame, gold-leaf roman capitals with a Pine
shade and the roundel above (§7.3). Right: Northgate Payroll, a painted steel frame in Northgate
Blue, aluminium-leaf block capitals with a blue shade. Between them, a 24 px painted jamb. In the
bottom-right corner of each glass, the sign painter's signature: "with CoFile", 1/40 of the glass
width, white enamel. Each door's light is tinted by its firm (`--firm-glow`): warm with a hint of
pine on the left, cooler with a hint of blue on the right, so the two pages sit in two different
lights.

**Sizes.** Each column 340 × 640: glass 340 × 300 (3D), light gap 40, page card 300 × 300
(Sunlit, radius 14, live DOM at 1:1 so it stays sharp). The pages' fields are 44 px tall replicas,
not real inputs.

**Motion.** M3 then M4 (§8.3). The pull-focus to the tiny "with CoFile" in the glass's corner is
the beat that lands "Ours in small type". Hover (desktop): the burnished gold catches a glint that
follows the pointer across the letters (the environment highlight is rotated ±15° by pointer x). No
other interaction.

**The text column.** h2 in Fraunces 52/56; lede 22/34; ticks in the tick style (20/28, 500) with
Ink Doorlight markers, 16 px apart; "For firms" as an arrow link, 24 px below.

**States.** Tier B: each door as a 6-second video loop of its gilding (ending on the finished
glass), with the pages as DOM fading into their brand; Tier C: the finished doors as AVIF, pages
already branded. Dark mode: the corridor at night, each glass lit from inside.

```
PHONE 390
┌────────────────────────────────────┐
│ Your name on the door.             │
│ Ours in small type.                │
│ Your logo and color on every page  │
│ your client sees.                  │
│┌──────────────────────────────────┐│  one door at a time,
││   HARBOR & PINE CPA (glass)      ││  scroll-snap, 88% wide,
││░░░░░░░░░ light ░░░░░░░░░░░░░░░░░░││  the next one peeking
││ ┌──────────────────────────────┐ ││
││ │(H&P) Harbor & Pine  with CoFile│ ││
││ │Start your New Jersey LLC     │ ││
││ │[Business name              ] │ ││
││ │[Who owns it                ] │ ││
││ │[          Continue         ] │ ││
││ └──────────────────────────────┘ ││
│└──────────────────────────────────┘│
│              ●  ○                  │  position dots
│ Two example firms · same page, …   │
│ ◢ A link for each client  …        │
│ For firms →                        │
└────────────────────────────────────┘
```

On phones the two firms sit in a horizontal scroll-snap row, each panel 88% wide with the next
peeking 24 px. After the first door finishes its gilding, the row glides once to Northgate (900 ms)
so the reader sees the second brand without swiping, then stays. With reduced motion the two panels
stack vertically, shorter (glass 200 px).

---

### 9.3 Requests, 12:30

**Copy:** h2 "Your client sends a text. Nobody retypes it." · lede "Forward the text, email, WhatsApp
or Slack message. AI drafts the filing, your saved answers fill in the rest, and your team checks
it."

```
DESKTOP: text cols 1–4, picture cols 6–12
                                          ┌─────────────┐
Your client sends                         │  ▂▂▂ phone  │╲  ← one sunbeam, Daylight,
a text. Nobody                            │ ┌─────────┐ │ ╲    with dust motes
retypes it.                               │ │Need an LLC│ │  ╲
                                          │ │for the bakery.│ ╲
Forward the text, email,                  │ │It's me and my │   ╲
WhatsApp or Slack                         │ │sister, 50/50, │    ╲
message. AI drafts the                    │ │in Jersey City.│     ╲
filing, your saved answers                │ └─────────┘ │      ╲
fill in the rest, and your                │ Ana Ortiz · text message · example
team checks it.                           └─────────────┘        ╲
                                                  ┌────────────────────────────────────────┐
                                                  │ Draft: New Jersey LLC formation         │
                                                  │                 ( For your team to check )│
                                                  │ Business name  TWO SISTERS BAKERY LLC  ▸ from the text │
                                                  │ Members        Ana Ortiz, Lucia Ortiz (50/50) ▸ from the text │
                                                  │ City           Jersey City, NJ          ▸ from the text │
                                                  │ Registered agent  Your saved agent      ● already filled │
                                                  │ Organizer and signer  Your saved answers ● already filled │
                                                  └────────────────────────────────────────┘
```

**P3, the sunbeam: what it shows.** A client's text arriving and becoming a drafted filing, with no
typing in between.

- **The phone**: a generic phone (§7.8), 280 × 520, turned −4°, at the top left of the picture,
  showing one incoming message bubble (#E9EAE7 on a Sunlit screen, radius 20, Atkinson Next 18/26
  Ink): "Need an LLC for the bakery. It's me and my sister, 50/50, in Jersey City." Under the bubble,
  in the caption style: "Ana Ortiz · text message · example".
- **The beam**: one shaft of Daylight (G3), 120 px wide, soft-edged, running diagonally from the
  phone down to the draft card, with slow dust motes (24 particles, 0.5 px, drifting at 4 px/s).
- **The draft card**: Sunlit, 480 px wide, radius 14. Header "Draft: New Jersey LLC formation" in
  Atkinson Next 650, 18 px, with the chip "For your team to check" (the in-progress chip). Five rows,
  each a label (15 px Slate), a value in Mono (17 px Ink) and a source marker:
  - "from the text": a Lamp-tint pill with a tiny beam glyph, on Business name "TWO SISTERS BAKERY
    LLC", Members "Ana Ortiz, Lucia Ortiz (50/50)" and City "Jersey City, NJ".
  - "already filled": a `--firm-tint` pill with a filled dot in the firm's color (Pine, since this
    is Harbor & Pine's draft), on Registered agent "Your saved agent" and Organizer and signer "Your
    saved answers".
- In the bubble, the phrases that fed the draft keep a soft Lamp underline after the moment ends:
  "LLC", "the bakery", "me and my sister, 50/50", "Jersey City". Hairline threads of light (1 px,
  Daylight at 40%) stay between each phrase and its field. The end frame explains itself.

**Motion.** M5 (§8.3), mapped precisely: "LLC" and "the bakery" and "my sister" lift and assemble
into "TWO SISTERS BAKERY LLC" in the Business name field (the glyphs re-set from Atkinson to Mono
as they land, uppercase); "me and my sister, 50/50" and the sender's name flow into Members; "Jersey
City" lands in City. Then the two saved-answer rows fill from the right in the firm's color. The
glyph particles are sampled from the real bubble text (≤ 2,400 points), travel on cubic Béziers
along the beam, change from Ink to Lamp in flight and back to Ink on landing; when they land, the
real DOM value fades in under them and the particles fade out. Tap or hover the bubble to replay.

**States.** Tier B: the same as a DOM animation without particles (phrases highlight in the bubble,
then the matching fields highlight and fill, 120 ms apart); the beam is a CSS gradient. Tier C: the
end frame with underlines and threads. Dark mode: the phone glows in a dim room, the beam becomes a
desk lamp's shaft.

```
PHONE 390
┌────────────────────────────────────┐
│ Your client sends a text.          │
│ Nobody retypes it.                 │
│ Forward the text, email, WhatsApp  │
│ or Slack message. …                │
│ ┌────────────────────────────────┐ │  the phone cropped to its
│ │ Need an LLC for the bakery.    │ │  top half: only the bubble
│ │ It's me and my sister, 50/50,  │ │
│ │ in Jersey City.                │ │
│ └────────────────────────────────┘ │
│ Ana Ortiz · text message · example │
│              ░░░ beam ↓ ░░░         │  the beam runs straight down
│ ┌────────────────────────────────┐ │
│ │ Draft: New Jersey LLC formation│ │
│ │ ( For your team to check )     │ │
│ │ Business name                  │ │  label above value,
│ │ TWO SISTERS BAKERY LLC         │ │  marker under the value
│ │ ▸ from the text                │ │
│ │ …                              │ │
│ └────────────────────────────────┘ │
└────────────────────────────────────┘
```

---
### 9.4 The proof, 14:00

**Copy:** h2 "Nothing is filed or paid until you approve the proof." · lede "One page: every detail,
every fee." · ticks "The state's own review page, where possible" · "Every fee checked again before
paying" · "Any later change comes back for approval" · link "How it works"

```
DESKTOP: picture cols 1–7, text cols 9–12
┌────────────────────────────────────────────────────┐
│ ░░░░░░░░░░░░░ the light table glows ░░░░░░░░░░░░░░ │
│ ░ ┌──────────────────────────────────────────┐  ░ │      Nothing is filed
│ ░ │▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀ Pine lintel ▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀│  ░ │      or paid until you
│ ░ │ Harbor & Pine CPA  example firm  with CoFile│ ░ │      approve the proof.
│ ░ │ Two Sisters Bakery LLC  ( Ready to approve )│ ░ │
│ ①│ Business name   TWO SISTERS BAKERY LLC       │  ░ │      One page: every
│ ░ │ Members         Ana Ortiz, Lucia Ortiz (50/50)│ ░ │      detail, every fee.
│ ░ │ Main business address  88 Grove St, Jersey City NJ 07302 │
│ ②│ Formation filing fee              $100.00   │  ░ │      ◢ The state's own
│ ░ │ NJ portal fee, by card              $3.50   │  ░ │        review page, where
│ ░ │ Total to the state                $103.50   │  ░ │        possible
│ ③│   ┌────────────────────────────────┐ ↖ laid on like a transparency   ◢ Every fee checked
│ ░ │   │ New Jersey's own review page, filled in │  │      again before paying
│ ░ │   │ Business Name   TWO SISTERS BAKERY      │  │    ◢ Any later change
│ ░ │   │ Designator      LLC                     │  │      comes back for
│ ░ │   └────────────────────────────────┘          │      approval
│ ④│ [            Approve for filing            ] │  ░ │
│ ░ └──────────────────────────────────────────┘  ░ │      How it works →
│ ░   New Jersey payment screen   $103.50  ( Matches the proof )       │
└────────────────────────────────────────────────────┘
  Sample proof · test details · not a real business
```

**P4, the light table: what it shows.** The stand-in's sample proof, every word of it, laid on a
printer's light table, the way the firm owner has checked a proof at the printer before. The table
is the frosted acrylic surface of §7.2, seen straight down so the proof stays perfectly sharp; it
glows Daylight from beneath, and the glow spills 24 px past every edge of the sheet.

- **The sheet**: Sunlit, 580 px wide, radius 12. Pane with Pine lintel; "Harbor & Pine CPA" in Libre
  Caslon Text, the stand-in's "example firm" in the caption style beside it, "with CoFile" at the
  right.
- **Title row**: "Two Sisters Bakery LLC" in Libre Caslon Text 26 px, with the chip "Ready to
  approve" (the firm's "your turn" chip, §11.5).
- **① Details**: a key-value table, labels in Atkinson Next 15 px Slate, values in Mono 17 px Ink.
  The two marked values ("TWO SISTERS BAKERY LLC", "88 Grove St, Jersey City NJ 07302") get a
  Lamp-tint highlight with 4 px of padding, as if the light table shone through just those words.
- **② Fees**: label left, amount right on tabular figures; a 1 px Ink rule over "Total to the state
  $103.50", in 650 weight.
- **③ The state's review page**: drawn as a neutral sheet, not a screenshot: a smaller card
  (#F3F4F1, 1 px #C9CBC6 border, no seal or state graphics) with the Mono caption "New Jersey's own
  review page, filled in" and its two rows. It is laid onto the proof at −1.5° like a transparency,
  overlapping the sheet's right edge by 32 px.
- **④ The button**: "Approve for filing", the firm's primary button (Pine, white), 56 px, full
  width of the sheet's content column. It is the brightest thing in the picture: the light table's
  glow is strongest directly under it.
- **Callouts**: ①–④ as 26 px Lamp discs with Ink numerals (Atkinson Next 650, 14 px), sitting in
  the table's margin, 16 px left of the sheet, aligned to the first line of each part.
- **The match strip**: under the sheet, a slim Sunlit tab (44 px tall, radius 0 0 12 12) with "New
  Jersey payment screen", "$103.50" in Mono and the chip "Matches the proof" (Fern good chip). It's
  part of the record, set as calmly as the rest; it never animates on its own.

**Motion.** M6 (§8.3): the four parts are laid on the table one by one; the button warms last. No
press, no "approved" state, ever: the picture never shows a filing being made.

**States.** Tier B: the same in DOM; the glow is a CSS radial gradient under the sheet. Tier C: the
end frame. Dark mode: the light table glows warmer in a dark room, which looks beautiful; the sheet
becomes Lamplit with Moonlit text and the table's glow stays Daylight at 30%.

```
PHONE 390
┌────────────────────────────────────┐
│ Nothing is filed or paid until     │
│ you approve the proof.             │
│ One page: every detail, every fee. │
│░┌────────────────────────────────┐░│  the table's glow around
│░│Harbor & Pine CPA     with CoFile│░│  the sheet's edges
│░│Two Sisters Bakery LLC          │░│
│░│( Ready to approve )            │░│
│░│① Business name                 │░│  callout discs inline,
│░│  TWO SISTERS BAKERY LLC        │░│  label above value
│░│  …                             │░│
│░│② Total to the state   $103.50  │░│
│░│③ ┌────────────────────────────┐│░│  review page card inline,
│░│  │New Jersey's own review page││░│  not rotated
│░│  └────────────────────────────┘│░│
│░│④ [    Approve for filing     ] │░│
│░└────────────────────────────────┘░│
│ New Jersey payment screen $103.50  │
│ ( Matches the proof )              │
│ Sample proof · test details · …    │
│ ◢ The state's own review page, …   │
│ How it works →                     │
└────────────────────────────────────┘
```

---

### 9.5 After, 16:30

**Copy:** h2 "Then it's filed, and the papers come back to you." · ticks "The state's documents,
saved and sent to you" · "CoFile applies for the EIN and keeps the IRS letter" · "An update at each
stage"

```
DESKTOP: text cols 1–4, picture cols 6–12
                                   ·  ─ ─ ─ ☀ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ·    ← the day arc
Then it's filed,                Approved        Submitted          Filed
and the papers
come back to you.        ░░░░░░░░░░░ long golden light across walnut ░░░░░░░░░░░░
                         ░            ┌───────────────┐                         ░
◢ The state's documents, ░  ┌─────────┤ IRS           │   (shadows long, to the right)
  saved and sent to you  ░  │New Jersey│ EIN letter   │
◢ CoFile applies for the ░  │Certificate│ (CP 575)    │
  EIN and keeps the IRS  ░  │of Formation│ EIN 00-0000000 │
  letter                 ░  │TWO SISTERS│ ▬▬▬▬▬▬       │
◢ An update at each      ░  │BAKERY LLC │ ▬▬▬▬         │
  stage                  ░  │▬▬▬▬▬▬▬▬   └───────────────┘
                         ░  └──────────┘                                       ░
                             Example record · sample documents
```

**P5, homecoming: what it shows.** The end of a filing, at the end of a working day. A warm walnut
desk in golden-hour light (G5: a tall window's light stretched long across the desk, with Harbor &
Pine's lettering faintly returning in the stretch). Across the top of the picture, **the day arc**
(§11.10): a fine 1 px arc in Ink at 30% with the stand-in's three stages, "Approved", "Submitted"
and "Filed", as 12 px dots with their labels in Atkinson Next 600, 15 px. Below, two documents
resting on the desk:

- **New Jersey · "Certificate of Formation" · "TWO SISTERS BAKERY LLC"**, in front, turned −3°.
- **IRS · "EIN letter (CP 575)" · "EIN 00-0000000"**, behind it, turned +4°, offset up and right.

Both are drawn in CoFile's **neutral document card** style, never as facsimiles: 240 × 310
portrait cards, #FFFDF8 with a 1 px Lit line border and a 2 px radius; the place ("New Jersey",
"IRS") as a caption-style kicker top-left; the title in Atkinson Next 650, 17 px; the Mono line;
then seven gray text bars (#E6E1D6, 6 px tall, at 92%, 100%, 84%, 96%, 60%, 88% and 40% width,
12 px apart) standing in for the body. No seal, no emblem, no letterhead, no signature, no state
or IRS graphics of any kind. They cast long golden-hour shadows (40 px, to the right).

**Motion.** M7 (§8.3), scrubbed by scroll: the sun (a 20 px Daylight disc with a 24 px glow)
travels the arc; each stage's dot fills Fern as the sun passes it ("Approved", "Submitted",
"Filed"); at "Filed" the light turns fully golden and the two documents drift in from the top right
and settle (the letter first, the certificate 200 ms later). If the reader stops scrolling halfway,
the scene completes by itself over 1.2 s.

**States.** Tier B: the arc and dots animate in the DOM; the documents are DOM cards with a CSS
spring; the light is a static golden AVIF. Tier C: the end frame. Dark mode: a desk lamp instead of
the window, the arc in Moonlit at 30%.

```
PHONE 390
┌────────────────────────────────────┐
│ Then it's filed, and the papers    │
│ come back to you.                  │
│  ●──────────●──────────●           │  the arc flattens into a
│ Approved  Submitted   Filed        │  three-step row
│░░░░░░░░ golden light ░░░░░░░░░░░░░░│
│░  ┌──────────┐┌──────────┐       ░│  the two cards fanned,
│░  │New Jersey││IRS       │       ░│  160 × 210 each
│░  │Certificate││EIN letter│       ░│
│░  │of Formation││(CP 575) │       ░│
│░  └──────────┘└──────────┘       ░│
│ Example record · sample documents  │
│ ◢ The state's documents, saved …   │
└────────────────────────────────────┘
```

---

### 9.6 Coverage, 18:00

**Copy:** h2 "The filings your clients already ask you for." · lede "New York, New Jersey, Florida and
the IRS. See which are live today" (the last five words a link)

```
DESKTOP: headline cols 1–8, tiles across 12 (dusk background)
The filings your clients already ask you for.
New York, New Jersey, Florida and the IRS. See which are live today →

┌───────────────────┐ ┌───────────────────┐ ┌───────────────────┐ ┌───────────────────┐
│ New York          │ │ New Jersey        │ │ Florida           │ │ IRS               │
│                   │ │                   │ │                   │ │                   │
│ LLC formation   ○ │ │ LLC formation   ◐ │ │ LLC formation   ◐ │ │ EIN, with the     │
│ Corporation     ○ │ │ Standing        ◐ │ │ Corporation     ◐ │ │ IRS letter      ○ │
│  formation        │ │  certificate      │ │  formation        │ │                   │
│ Payroll regis-  ○ │ │ Payroll regis-  ○ │ │ Limited         ◐ │ │                   │
│  tration (NYS-100)│ │  tration (NJ-REG) │ │  partnership      │ │                   │
│ LLC changes and ○ │ │ Corporation     ○ │ │                   │ │                   │
│  dissolution      │ │  formation        │ │                   │ │                   │
│ Copies and cert-○ │ │                   │ │  (warmest window) │ │                   │
│  ificate of status│ │                   │ │                   │ │                   │
│ Application for ○ │ │                   │ │                   │ │                   │
│  Authority        │ │                   │ │                   │ │                   │
│ Assumed name    ○ │ │                   │ │                   │ │                   │
│  (DBA)            │ │                   │ │                   │ │                   │
└───────────────────┘ └───────────────────┘ └───────────────────┘ └───────────────────┘
 ● Live   ◐ Rehearsed to the payment screen   ○ Screens recorded or offered, rehearsal next
```

(The dots above show today's stages; any row whose filing type is switched on shows ● Live, from
the same data as the site.)

**P6, four windows: what it shows.** The stand-in's state tiles as four windows of one building at
dusk. Each tile is a Sunlit pane, 290 px wide, radius 14, with a 1 px Lit line frame and a 6 px
inner "sill" shadow at its bottom edge. The place name sits at the top in Fraunces 30/34. The rows
are the short names from the coverage data (every type except "Planned"), in Atkinson Next 16/22,
each with its **coverage lamp** (§4.3) right-aligned on the first line: ● Live, ◐ rehearsed, ○
plain. Each tile's glass warms with its lamps: a soft radial glow of Daylight, 6% for each rehearsed
lamp and 14% for each Live one, centred on the tile, so a tile with three rehearsed types (Florida,
today) is visibly the warmest window, and every tile gets brighter as types go live during the beta,
with no redesign. Hovering or focusing a lamp shows its full label ("Rehearsed to the payment
screen", or the row's stage) in a tooltip; the lamps carry those labels as accessible names. The
legend sits under the tiles with the same three lamps and the copy's three labels.

**Layout.** Four equal-width tiles across 12 columns, equal height (the tallest, New York, sets
it); shorter tiles keep their extra glass empty, like windows with fewer lamps. The section sits on
Dusk #DCDDE2 with the plaster texture, and the hour's ambient light is cool except inside the tiles.

**Motion.** M8 (§8.3): the lamps switch on row by row. Ambient afterwards: the Live lamps' glow
breathes by 2% every 6 s, like real bulbs on a dimmer, and nothing else moves.

**States.** Tier B and C: identical, DOM only (this picture costs nothing). Dark mode: the tiles
become Lamplit, the building is fully at night, and the lamps glow brighter by contrast, which is
the most readable version of all.

```
PHONE 390
┌────────────────────────────────────┐
│ The filings your clients already   │
│ ask you for.                       │
│ New York, New Jersey, Florida and  │
│ the IRS. See which are live today →│
│ ┌──────────────────────────────┐┌──│  a scroll-snap row of
│ │ New York                     ││ N│  windows: 300 px each,
│ │ LLC formation              ○ ││ e│  the next one peeking,
│ │ Corporation formation      ○ ││ w│  like walking past
│ │ …                            ││  │  a building
│ └──────────────────────────────┘└──│
│ ● Live  ◐ Rehearsed to the payment │
│ screen  ○ Screens recorded or …    │
└────────────────────────────────────┘
```

---

### 9.7 Rehearsals, 19:00

**Copy:** h2 "In beta: rehearse a filing, free." · lede "CoFile fills in every screen of the
state's real website and stops before the last button: nothing is filed or paid. Filing types go
live one at a time."

```
DESKTOP: full bleed, Night, 760 px tall
┌──────────────────────────────────────────────────────────────────────────────────────────────┐
│   ▯ ▯ ▯ ▯ ▯ ▯ ▯ ▯ ▯ ▯ ▯ ▯ ▯   ← 13 flats across the back of the stage, lighting in turn       │
│                                                                                              │
│        ╭─╮                                       ┌──────────────────────────────────────┐   │
│        │●│  ← the ghost light                    │ Rehearsal · New Jersey LLC formation │   │
│        ╰┬╯                                       │                         test details │   │
│ ░░░░░░░░│░░░░░░░░░░░░                            │ Business name                 filled │   │
│ ░ In beta: rehearse ░                            │ Name check                    passed │   │
│ ░ a filing, free.   ░                            │ Registered agent              filled │   │
│ ░                   ░                            │ Members and signatures        filled │   │
│ ░ CoFile fills in every screen of the state's    │ Review page        matched the proof │   │
│ ░ real website and stops before the last         │ Payment: $103.50   matches the proof │   │
│ ░ button: nothing is filed or paid. Filing types │ Pay Now          ✦ held, on purpose  │   │
│ ░ go live one at a time.  ░                      └──────────────────────────────────────┘   │
│ ░░░░░░░░░░░░░░░░░░░░░░░░░░                         Rehearsal · nothing filed, nothing paid   │
│ ▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄  the backs of empty seats, silhouetted ▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄ │
└──────────────────────────────────────────────────────────────────────────────────────────────┘
(✦ = the ghost-light glyph)
```

**P7, the ghost light: what it shows.** A theatre after hours. In a theatre, when the house is
empty, one bare bulb on a stand is left burning on the stage: the ghost light. It's the perfect
picture of a rehearsal: the real stage, the full run-through, and nobody in the seats.

- **The stage** (§7.2): dark floorboards, the ghost light standing at the left third, its warm pool
  (#FFC46B) spreading across the boards. **The text column sits inside the pool**: the light behind
  the type is the picture.
- **The flats**: across the back of the stage, 13 tall flats in perspective, each a simplified
  "screen": a Lamplit rectangle with three or four gray bars and one Mono line. They are abstract on
  purpose, never a copy of the state's website, and there are 13 because a New Jersey LLC
  rehearsal runs through 13 screens.
- **The log**: the stand-in's rehearsal log on a Lamplit card (#1F222B, radius 14, 1 px #343844
  border), 520 px wide, lit from the ghost light's side. Header "Rehearsal · New Jersey LLC
  formation" in Atkinson Next 650, Moonlit, with "test details" right-aligned in Slate-on-Night.
  Seven rows, 52 px each, label left (Atkinson Next 16, Moonlit), result right (Mono 15). "Pay Now ·
  held, on purpose" has the ghost-light glyph before its result and is otherwise set exactly like
  every other row: the last cue, not a warning.
- **The seats**: the backs of nine empty theatre seats in silhouette along the bottom edge
  (#0E1015 on Night), 88 px tall. We are sitting in the house; nobody else is.
- **Caption**: "Rehearsal · nothing filed, nothing paid", under the log, caption style in
  Slate-on-Night.

**Motion.** M9 (§8.3): the ghost light breathes once; the log's rows light as their cues come, and
the matching flats light behind (the 13 flats map to the 7 rows in groups of 2, 2, 2, 3, 2, 1, 1).
After the last cue, the stage settles into ghost light. Ambient: the bulb's filament flickers by 1%,
irregularly, about every 4 s.

**States.** Tier B: a 7-second loop of the stage (flats lighting) under the DOM log, which animates
its rows in sync. Tier C: the end frame. Light and dark mode are the same: the theatre is always
dark.

```
PHONE 390: Night
┌────────────────────────────────────┐
│ ▯▯▯▯▯▯▯▯▯▯▯▯▯   ← flats, small     │
│         ╭─╮                        │
│         │●│   the ghost light      │
│ ░░░░░░░░░┴░░░░░░░░░░░░░░░░░░░░░░░░ │
│ ░ In beta: rehearse a filing,     ░│
│ ░ free.                           ░│
│ ░ CoFile fills in every screen …  ░│
│ ┌────────────────────────────────┐ │
│ │Rehearsal · New Jersey LLC      │ │
│ │formation          test details │ │
│ │Business name            filled │ │
│ │…                               │ │
│ │Pay Now      ✦ held, on purpose │ │
│ └────────────────────────────────┘ │
│ Rehearsal · nothing filed, nothing │
│ paid                               │
│ ▀▄▀▄▀▄▀▄ seats ▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀ │
└────────────────────────────────────┘
```

---

### 9.8 Pricing, 20:30

**Copy:** h2 "$45 a filing. EIN included with a formation." · price items "Pay as you go" / "per live
filing" · "$25" / "an EIN on its own" · "$15" / "copies and certificates" · "Plans from $250" / "a
month for 6 filings" · "State fees separate. Rehearsals free. See all plans" · "Social Security
numbers encrypted and deleted 30 days after the filing. Saved cards held in a card vault, never in
our database. Security"

```
DESKTOP: Dusk, a desk lamp's pool from above
                         ░░░░░░░░░░░░░░░ lamp pool ░░░░░░░░░░░░░░░
$45 a filing. EIN included with a formation.
 ^ 96 px                       ^ 52 px
┌───────────────────────┬───────────────────────┬───────────────────────┬───────────────────────┐
│ Pay as you go         │ $25                   │ $15                   │ Plans from $250       │
│ per live filing       │ an EIN on its own     │ copies and            │ a month for 6 filings │
│                       │                       │ certificates          │                       │
└───────────────────────┴───────────────────────┴───────────────────────┴───────────────────────┘
State fees separate. Rehearsals free. See all plans →

Social Security numbers encrypted and deleted 30 days after the filing. Saved cards held in a card
vault, never in our database. Security
```

**P8, the lamp.** Not an object: a light. A desk lamp's warm pool (G8, #FFD08A) falls from above
onto the strip and spills onto the Dusk background around it, so the prices are the best-lit thing
on the screen. That's the whole picture, and it's enough: prices should be easy to read, not
decorated.

- **The headline**: one h2, in Fraunces 52/56, with "$45" set at 96 px (lining figures, weight
  480) on the same baseline, so the price is the first thing anyone sees.
- **The strip**: one Sunlit bar, 1240 px, radius 16, split into four equal cells by 1 px Lit line
  rules, 40 px padding. The bold item in each cell ("Pay as you go", "$25", "$15", "Plans from $250")
  in Fraunces 40/44, weight 460; the line under it in Atkinson Next 17/24, Slate. No icons, no
  "popular" badges, no strikethrough prices.
- **The two small lines**: "State fees separate. Rehearsals free. See all plans" in Atkinson Next
  16/24, Slate, with "See all plans" as an arrow link; then, 24 px below, the security line in the
  small style (15/22, Slate), with "Security" as a plain underlined link. No icon, no lock, no
  badge: one calm sentence for the reader who looks for it.

**Motion.** M10 (§8.3). Nothing else.

**States.** All tiers: DOM plus a CSS radial gradient for the pool. Dark mode: Night background,
the strip Lamplit, the lamp pool warmer.

```
PHONE 390
┌────────────────────────────────────┐
│ $45 a filing. EIN                  │  "$45" at 64 px,
│ included with a formation.         │  the rest at 34/38
│ ┌────────────────┬───────────────┐ │
│ │ Pay as you go  │ $25           │ │  2 × 2 grid
│ │ per live filing│ an EIN on its │ │
│ │                │ own           │ │
│ ├────────────────┼───────────────┤ │
│ │ $15            │ Plans from    │ │
│ │ copies and     │ $250          │ │
│ │ certificates   │ a month for 6 │ │
│ │                │ filings       │ │
│ └────────────────┴───────────────┘ │
│ State fees separate. Rehearsals    │
│ free. See all plans →              │
│ Social Security numbers encrypted  │
│ … Security                         │
└────────────────────────────────────┘
```

---

### 9.9 Close, 22:00

**Copy:** h2 "Run one rehearsal. Then decide." · lede "Try it on a filing you know by heart.
Questions? hello@cofile.app" · button "Run a free rehearsal"

```
DESKTOP: full bleed, Night, 720 px tall
┌──────────────────────────────────────────────────────────────────────────────────────────────┐
│                                                        ┌──────────────────────────────┐      │
│                                                        │ ▒▒▒▒▒▒ frosted glass ▒▒▒▒▒▒▒ │      │
│  Run one rehearsal.                                    │ ▒ ┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄ ▒ │      │
│  Then decide.                                          │ ▒ ┆  ┆  ┆  ┆  ┆  ┆  ┆  ┆ ▒ │  ← chalk guidelines,
│                                                        │ ▒ ┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄ ▒ │    no letters yet
│  Try it on a filing you know by heart.                 │ ▒▒▒▒ glowing from inside ▒▒ │      │
│  Questions? hello@cofile.app                           ├──────────────────────────────┤      │
│                                                        │            ○ handle          │      │
│  [ Run a free rehearsal ]                              │                              │      │
│                                    ░░░░░░░░░░░░░░░░░░░░░ the glow spills across the floor ░░░│
└──────────────────────────────────────────────────────────────────────────────────────────────┘
```

**P9, the waiting door: what it shows.** The same door as the For firms page and the sign-up page,
at night, seen from the corridor. Its frosted glass glows warm from inside (#FFC97A), and on the
glass are a sign painter's faint chalk guidelines: a baseline, a cap line, and spacing ticks for a
name that hasn't been painted yet. No letters. The glow spills out across the corridor floor toward
the text, so the headline and the button sit in the door's light. The door is ready for the
reader's name, and the copy's own line on the sign-up page ("put your name and logo on the door")
finishes the thought one click later.

- h2 in Fraunces 52/56, Moonlit, SOFT 55. The lede in Moonlit at 22/34; the email a Moonlit link.
- "Run a free rehearsal" in Lamp, 56 px: the only Lamp object in the section, as warm as the door's
  glow.

**Motion.** M11 (§8.3). Hovering the button brightens the door's glow by 8% (300 ms): the light you're
invited to step into. Clicking it carries the glow into the sign-up page, whose door is the same
door in the same light (a 400 ms cross-fade between the two scenes when both are Tier A).

**States.** Tier B: a 4-second loop of the glow coming on, ending on the still. Tier C: the still.
Light and dark mode are the same: it's night.

```
PHONE 390: Night
┌────────────────────────────────────┐
│ ┌────────────────────────────────┐ │  the door cropped to its
│ │▒▒▒ glowing glass, chalk lines ▒│ │  glass, 300 px tall
│ │▒ ┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄ ▒│ │
│ └────────────────────────────────┘ │
│ ░░░░░░ glow on the floor ░░░░░░░░░ │
│ Run one rehearsal.                 │
│ Then decide.                       │
│ Try it on a filing you know by     │
│ heart. Questions? hello@cofile.app │
│ [      Run a free rehearsal      ] │
└────────────────────────────────────┘
```

---
## 10. The other pages

### 10.0 The page head, shared

Every page behind the home page opens the same way: the kicker (with its Lamp Doorlight), the h1 in
Fraunces 64/68, the lede at 22/34, on Shade, with the light layer at that page's hour behind the
type. The head is 480 to 560 px tall on desktop. Where I give a page a head picture, it sits on
cols 8–12 (or full width below the lede on phones). Each page closes with the same close pattern as
the home page (a full-bleed band, its own headline, the Lamp button), lit for that page's hour.

---

### 10.1 How it works · the morning shift (08:00 to 14:00)

**Head:** kicker "How it works" · h1 "Your client asks. You approve it. CoFile files it." · lede
"Three steps. Your client hands the job to you, and you sign off before anything is filed." No head
picture: the three steps below are the picture, and they start right under the lede.

**Steps: the three panes.** One picture across 12 columns, 360 px tall, lit through a three-pane
window (the window's two mullions throw two soft vertical shadows that divide the steps). Under each
pane, its step's copy.

```
DESKTOP
┌──────────────────────┃──────────────────────┃──────────────────────┐
│ ░ frosted pane ░      ┃ ███ clear pane ███   ┃ ░ frosted pane ░      │
│  ┌────┐┌─────┐ ✉      ┃   ┌──────────────┐   ┃  ▯▯▯ screens filling  │
│  │link││ text│        ┃   │ the proof    │   ┃  ┌──┐┌──┐ papers back │
│  │page││bubble        ┃   │ [Approve…]   │   ┃  └──┘└──┘  (◐) a person│
│  └────┘└─────┘        ┃   └──────────────┘   ┃                       │
└──────────────────────┃──────────────────────┃──────────────────────┘
 Your client asks.        You approve it.         CoFile files it.
 They fill in a short     You get the proof: one  It fills in the state's
 form from your link, …   page with your firm's   own website screen by …
                          name at the top, …
```

- **Pane 1, "Your client asks."**: a fanned trio, the three ways a job arrives: Harbor & Pine's
  client page ("Start your New Jersey LLC", from P2), Ana's text bubble (from P3) and an email
  envelope glyph. Frosted-pane light, soft.
- **Pane 2, "You approve it."**: the proof sheet in miniature, its button "Approve for filing"
  glowing. **Clear glass: the brightest pane**, because the firm is in charge of the middle step.
- **Pane 3, "CoFile files it."**: three abstract screen flats filling in left to right with a
  moving light, the two document cards from P5 coming back, and one 40 px portrait of a CoFile
  filing professional (§7.4 B), for the step's line "When a filing needs a person, one of the
  filing professionals who run CoFile takes over."
- **Motion**: as the section scrolls in, the sun moves from pane 1 to pane 3 (1.8 s); pane 2 stays
  brightest after it passes. Phone: the three panes stack, each 220 px tall above its copy, and
  the light moves top to bottom.

**The proof: "You see what the state will see, before the state does."** The long lede and six
ticks on cols 1–5; P4 (the light table) on cols 7–12, larger (640 px sheet), held with
`position: sticky` while the six ticks scroll past it. That isn't scroll-jacking: the reader
scrolls normally and the picture simply stays in view. As each tick reaches the middle of the
viewport, the matching part of the proof brightens on the table (the rest dims to 85%):

| Tick | What lights on the proof |
|---|---|
| "Every name, address and answer, in the order the state asks for them" | ① the details table |
| "Every fee in dollars and cents, from a verified fee table" | ② the fees |
| "Where the state's website allows it, a picture of the state's own review page, filled in" | ③ the review-page transparency |
| "Each statement on the form, and who made it, such as letting the filing company sign or pay" | The proof's consent note, shown here in full from the product's proof page: "By approving, you confirm every detail below is correct and authorize its submission exactly as shown, and payment of the fees shown, up to the total shown ($103.50). Government fees generally can't be refunded once paid, even if the filing is rejected." |
| "One button. Until it's pressed, nothing is submitted and nothing is paid." | ④ the button |
| "Like reviewing a return before you e-file it: nothing goes to the state until you've signed off." | The whole sheet, evenly lit |

Phone: no sticky; the proof picture sits after the lede, and each tick gets a 56 px crop of its part
of the proof as a thumbnail at its left.

**Requests: "Clients don't always fill in forms. They text you."** P3 (the sunbeam) beside the lede,
exactly as on the home page.

**Checks: "Checks before every filing."** Reassurance, so still light (§2, rule 4). Headline and
lede on cols 1–5; the four items on cols 7–12 as a plain list with Slate en-rule markers, 24 px
apart, body 18/29. Figures in the text ($52, $27) in Mono. No picture, no icon, no motion beyond the
fade-in. The section keeps its `#checks` anchor, which the Security page links to.

**After: "The papers come back to you."** P5 (homecoming), with the lede's three timings drawn on
the day arc as three small notes along it, quoted from the lede in the caption style: "Some states
answer at once." just after "Submitted", "New York sends a receipt by email" a little further on,
and "in Florida an examiner reviews the filing first" furthest along, before "Filed".

**Close:** "Run one rehearsal. Then decide." · "A rehearsal fills in every screen of the state's real
website and stops before the last button. It's free, and nothing is filed or paid." · "Run a free
rehearsal" and "Questions" (quiet). P9, the waiting door.

---

### 10.2 For firms · noon at the door

**Head:** kicker "For CPA, payroll, fractional CFO and title firms" · h1 "Form the business. Keep
the client." · the long lede ("Your client needs an LLC. Who do they call? You. …"). **Head picture:
the door**, cols 7–12, 720 px tall, bleeding off the right edge: Harbor & Pine CPA's door in full,
at noon, in real time. The single-door version of M3: the name painted along its strokes, the
burnish, then the slow pull-focus down to "with CoFile" in the corner of the glass and back. On
phones the head picture is the film (§7.4 E): a 20-second loop of the gilder's hands lettering the
glass, 4:5, muted, with a still poster, under the lede.

**"Your filing desk, in your brand."** Five ticks on cols 1–5; P1 (the desk) on cols 7–12, plus one
addition: under the desk, three small round swatches, Harbor & Pine (Pine), Northgate Payroll
(Northgate Blue) and Best Accounting (Cardinal), that switch the example desk between the three
example firms. The Pane, logo, font, button and chips retint through the brand adaptor in 400 ms,
and the doorlight behind the desk changes color with them. Control label `[copy needed]`. The
fifth tick ("CoFile is built and run by filing professionals. …") gets three 40 px portraits as its
marker.

**"Your name on the door. Ours in small type."** The lede ("The same page carries each firm's own
name, logo and color. Your clients never see another firm's, or a big CoFile logo.") with P2, the
two doors, as on the home page.

**"Your registered agent, or ours."** Lede and three ticks on cols 1–5. Picture on cols 7–12: three
small filing cards in a row (New York, New Jersey, Florida, as titles only), each with one lit row,
"Registered agent · Your saved agent" (the label and value from P3), filling in at the same moment
(300 ms, together): "Either way it's filled in on every filing." Phone: the three cards stack and
fill together.

**Close:** "Open your firm's filing desk." · "Add your logo and color, then rehearse a real filing on
the state's own website. It's free, and nothing is filed or paid." · "Run a free rehearsal". P9, the
waiting door, but in daylight: the chalk guidelines in noon sun.

---

### 10.3 What we file · the evening (18:00)

**Head:** kicker "What we file" · h1 "New York, New Jersey, Florida and the IRS." · lede "Every
filing type carries a plain label, so you always know which ones are live today." No head picture;
the table starts 48 px below the lede, under dusk light with a desk lamp's pool over it.

**The coverage table.** All 16 rows in the copy's order, on one Sunlit card, radius 16.

| Element | Spec |
|---|---|
| Header row | "Filing", "Where", "Where it stands" in Atkinson Next 650, 14 px, Slate, sentence case, on Sunlit with a 1 px Ink rule under |
| Rows | 64 px min, 1 px Lit line between; "Filing" in 17 px Ink (long names like "Standing certificate (through the API; not on the filing desk yet)" wrap, never truncate); "Where" in 16 px Slate; "Where it stands" as the coverage chip (§4.3) with its lamp |
| Columns | 56% / 18% / 26% |
| Hover | A light patch slides under the row (160 ms) |
| Optional filter | A segmented row above the table with "New York", "New Jersey", "Florida", "IRS" (words from the copy) and an "all" state `[copy needed]`; off by default |
| Phone | Each row becomes a block: "Filing" in 17 px 650, then "Where" and the chip on one line, 16 px gap between blocks |

The note under it ("Rehearsed to the payment screen: CoFile completed every screen …") in the small
style at 64 characters, with the email as a link.

**"How a filing type goes live."** The lede on cols 1–5 and P7 (the ghost light) on cols 7–12, as a
contained stage card (radius 20, 560 px tall) rather than full bleed.

**"State by state."** The four notes (New York, New Jersey, Florida, IRS) in four window tiles
from P6's family, 2 × 2 on desktop, each with the place in Fraunces 30 and its paragraph in body
style; stacked on phones. The New York note's "120 days" and the IRS note's "(CP 575)" stay plain
text.

**Close:** "Rehearse one you know by heart." · "Run a free rehearsal" and "See pricing" (quiet), in
the ghost light's pool on Night.

---

### 10.4 Pricing · lamplight (20:30)

**Head:** kicker "Pricing for firms" · h1 "$45 a filing. EIN included with a formation." with "$45"
at 112 px · lede "Pay for each live filing, or take a plan with filings included every month. Every
plan is backed by filing professionals, and rehearsals are always free." Light: one desk lamp pool,
centered on the plans.

**The plans.** Four plan cards in a row on desktop (3 columns each), all the same height, in the
copy's order: Pay as you go, Starter, Growth, Unlimited.

```
┌──────────────┐ ┌──────────────┐ ┌══════════════┐ ┌──────────────┐
│ Pay as you go│ │ Starter      │ ║ Growth       ║ │ Unlimited    │
│ $45 a filing │ │ $250 a month │ ║ $500 a month ║ │ $1,000       │
│ No monthly   │ │ or $2,500 a  │ ║ or $5,000 a  ║ │ a month      │
│ fee. Pay only│ │ year (2      │ ║ year (2      ║ │ or $10,000 a │
│ for live     │ │ months free) │ ║ months free) ║ │ year (2 …)   │
│ filings.     │ │──────────────│ ║──────────────║ │──────────────│
│──────────────│ │◢ 6 filings a │ ║◢ 15 filings a║ │◢ Unlimited   │
│◢ $25 for an  │ │  month       │ ║  month       ║ │  filings (fair│
│  EIN on its  │ │◢ $40 for each│ ║◢ $33 for each║ │  use: 60 a   │
│  own         │ │  filing past │ ║  filing past ║ │  month)      │
│◢ $15 for     │ │  that        │ ║  that        ║ │◢ $15 for each│
│  copies and  │ │(◐) A filing  │ ║(◐) A filing  ║ │  filing past │
│  certificates│ │  professional│ ║  professional║ │  fair use    │
│(◐) A filing  │ │  takes over …│ ║  takes over …║ │◢ Priority help│
│  professional│ │              │ ║  in the lamp's║ │  from a person│
│  takes over …│ │              │ ║  pool        ║ │(◐) A filing … │
└──────────────┘ └──────────────┘ └══════════════┘ └──────────────┘
```

- **Card**: Sunlit, radius 16, 32 px padding, 1 px Lit line border. The plan name in Atkinson Next
  650, 18 px. The price in Fraunces 56/60 lining (weight 480) with its unit ("a filing", "a month")
  in Atkinson Next 18 px Slate on the same baseline. The line under it ("No monthly fee. Pay only
  for live filings." or "or $2,500 a year (2 months free)") in the small style. A 1 px Lit rule.
  Then the items, 12 px apart, with Doorlight markers.
- **The last line of every plan**, "A filing professional takes over when a filing needs one", has
  a 24 px portrait of a real CoFile filing professional as its marker instead of a Doorlight (a
  different person on each card). Alt text `[copy needed]`.
- **Growth**: the copy marks it as the middle plan (`r3-plan-mid`), so the lamp's pool is centered on
  it: it's raised 8 px, its border is 1.5 px Ink, and a Daylight glow sits behind it. No "popular"
  badge: there's no copy for one, and the light says it anyway.
- **Phone**: the cards stack in order, full width; Growth keeps its glow.

The note ("Prices in US dollars, for partner firms. Building a filing product for many businesses?
Talk to us about platform pricing.") centered under the cards in the small style.

**"What counts as a filing."** Lede and five items. Each item's bold lead-in ("One filing:",
"Included:", "An EIN on its own:", "Copies and certificates:", "Unused filings") in Atkinson Next 650.
Beside the first four, a small **unit bar** (48 × 6 px, radius 3) shows how much of a plan's filing
it uses: full for one filing, full with a small "+" notch for the included EIN, half for an EIN on
its own, a third for copies and certificates. It's drawn in Ink at 70% on a Lit line track. The
fifth item gets a bar with an arrow notch ("roll over").

**"What's separate."** Reassurance, so still: four items with Slate en rules, bold lead-ins as the
copy has them, no picture.

**Close:** "Start with a free rehearsal." · "Rehearsals run on the state's real website and stop
before the last button. They're free and never count toward a plan." · "Run a free rehearsal". The
ghost light.

---

### 10.5 Security · still light

**Head:** kicker "Security" · h1 "How we handle what you trust us with." · lede "Social Security
numbers, cards and state logins, and how CoFile keeps each one." Flat, even, 14:00 light, with no
gobo and no motion. It's the one page with no head picture at all, on purpose.

**The five items** as Sunlit cards in a 2-column grid (the fifth spans both columns on desktop,
or sits alone, centered), each with a 24 px icon from the set, the h3 in Atkinson Next 650 22 px, and
the paragraph in body style:

| Item | Icon (none of them a lock, shield or vault) |
|---|---|
| "Encrypted, masked SSNs" | Masked digits: three dots, a hyphen, two dots |
| "Cards in a vault, logins encrypted" | A plain card outline |
| "Single-use links to the proof" | A link, broken after one use (one ring open) |
| "Signatures only on approval" | A pen nib |
| "Separate accounts" | Two separate doors side by side: the Doorlight concept's own picture of separate rooms |

**The closing paragraph** ("The checks CoFile runs on every filing before it pays … are on How it
works. … Security questions: hello@cofile.app.") in the lede style on cols 1–8, links underlined.

---

### 10.6 Questions

**Head:** kicker "Questions" · h1 "Questions, answered." · lede "Something else? hello@cofile.app".
Still light.

**The fourteen questions** as one accordion on cols 2–9 (desktop), full width on phones.

- **Row**: the question in Atkinson Next 600, 20/28, Ink; min height 72 px; a 1 px Line rule
  between rows; a 20 px chevron at the right that turns 90° when open. The whole row is the target.
- **Answer**: body 18/29, 64 characters wide, 8 px under the question, 24 px of space below; links
  underlined.
- **Deep links**: each item keeps its anchor (`#beta`, `#rehearsal`, `#approves`, `#people`,
  `#proof`, `#texts`, `#fees`, `#cost`, `#ein`, `#timing`, `#publication`, `#agent`, `#law`, `#live`);
  arriving on one opens it, scrolls it to 120 px from the top, and gives its row a 2-second warm
  highlight (Lamp tint fading out).
- **"Is a person involved?"**: its answer carries a row of three portraits (48 px) of the real
  filing professionals under the text. Alt text `[copy needed]`.
- Search, categories, "was this helpful": none. Fourteen questions don't need them.

---

### 10.7 For platforms · the night shift (21:00)

The whole page is Night.

**Head:** kicker "For platforms" · h1 "Building a filing product? Put CoFile underneath it." · the
lede. **Head picture: underneath.** The light table again (it's the same idea, turned around):
a platform's own product sits on top, a generic white-label UI with a gray placeholder logo block,
the client page from P2 ("Start your New Jersey LLC", fields, "Continue") in a neutral violet brand
(#5B4BD6), and from **underneath** it CoFile's warm light glows through, spilling past its edges onto
the Night page. The platform's brand is on top; CoFile is the light under it. No platform name
appears (the placeholder logo is an unlabeled rounded rectangle). Caption `[copy needed]`, since
this picture has no example label in the copy yet.

**The section.** The five ticks on cols 1–5 in Moonlit with Lamp Doorlight markers; `"dryRun":
true` as an inline Mono chip (Lamp tint on Night, #3A301B, Lamp text) with the ghost-light glyph;
"Read the API docs" as an arrow link. **The inquiry form** on cols 7–12 is a lit window at night: a
Sunlit card (radius 16, 40 px padding) glowing softly (a 48 px Daylight glow at 25% around it), with
the fields "Name", "Company", "Work email", "Phone (optional)", "States you file in" (New York, New
Jersey, Florida, Several of these, Other states too), "Filings per month" (Under 50, 50 to 250, 250
to 1,000, Over 1,000), "What you'd like to do (optional)" and the button "Send" (Lamp). The spam
field is visually hidden. On phones the form follows the list, full width.

---
### 10.8 Sign-up, log-in, passwords, legal, errors

**Sign-up: your name on the door.** The page that turns the concept into a product.

- **Copy**: kicker "For firms" · h1 "Set up your firm's filing desk" · "For firms that file for their
  clients. Confirm your email, put your name and logo on the door, and choose which card pays the
  state's fees. Your first filing can be a free rehearsal: nothing filed, nothing paid." · the form
  (Firm name, Kind of firm, Your name, Work email, Password, Password again, Phone (optional), Website
  (optional), States you file in, the volume choice, the Terms and Privacy agreement) · "Create
  account" · "Building a filing product? See CoFile for platforms."
- **Desktop**: the form on cols 1–6 on a Sunlit panel; on cols 7–12, full height and sticky, **the
  door** (§7.2) in morning light, its glass blank except for the chalk guidelines. As the reader
  types in "Firm name", the name is gilded onto the glass (M12), in roman capitals with a Pine-free
  neutral Ink shade (we don't know their color yet). When they pause, the burnish sweeps it. If they
  clear the field, the leaf lifts off letter by letter. "with CoFile" is already tiny in the corner.
  The picture's accessible name `[copy needed]`; it announces nothing as it changes.
- **Phone**: the door's glass as a 200 px strip at the top of the page, above the h1, lettering the
  name live; it scrolls away normally.
- **Fallback** (Tier B and C): the name as SVG text in a gold gradient (#B8862F → #F1D27A → #B8862F)
  with a CSS sheen on pause.
- **Long names**: the lettering fits the glass by reducing size down to 40% and then breaking onto
  a second line at a word boundary, the way a sign painter would.

**Check your email / Confirm your email.** "Your filing desk" kicker · h1 "Check your email" (or
"Confirm your email") · the copy and the "send the link again" / "Send a new link" / "Confirm my
email" controls. Picture: the door gap, a 240 × 160 light vignette of a strip of light under a
door, with an envelope slipped halfway under it.

**Log in.** h1 "Welcome back" · "Firms go to their filing desk, platforms to their dashboard." ·
"Continue with Google" · Email, Password, "Forgot your password?", "Log in" · "New here? Set up your
firm's filing desk. Enterprise developers can also log in with an API key". A single centered
Sunlit card (480 px) on Shade, in morning light through an unlettered door's glass (just the
muntins' shadows). "Continue with Google" follows Google's own sign-in button guidelines (white,
their mark, their wording), since it's their brand; everything else is ours. Errors ("Google
sign-in was cancelled." and the rest) as notices above the form.

**Forgot password, choose a new password, log in with an API key.** The same centered card.
Password hints ("At least 12 characters. A few unrelated words work well.") in the small style under
the field, never as placeholder text.

**Terms and Privacy.** A reading page: h1 in Fraunces 56, body 18/29 at 68 characters, h2 in
Atkinson Next 650 24 px. On desktop, a sticky contents rail (cols 1–3) generated from the h2s, with
the current one marked by a 2 px Ink bar. No light layer: flat Sunlit.

**Page not found.** h1 "Page not found" · "The link may be old or mistyped." · "Go to the home page".
Picture: an empty corridor floor at morning with a patch of doorlight on it and no door in sight
(the light came from somewhere; the link didn't). 320 × 200, static.

**Something went wrong.** h1 "Something went wrong" · "This page couldn't load just now. It's usually
a short hiccup on our side." · "Try again" and "Log in again". Picture: the same corridor light,
dimmed, as if a cloud had passed; hovering "Try again" brings the light back up (300 ms).

**Link expired, not signed in to a filing desk.** The centered card, no picture; on a firm's URL,
the firm's Pane if the firm is known.

---

### 10.9 The filing desk (the firm's pages)

The firm's brand leads everywhere: the Pane, the firm's color as every accent, the firm's font for
headings, and "with CoFile" as the only sign of us. CoFile's Fraunces and Lamp don't appear (except
the rehearsal chip and notice).

**The frame.**

```
DESKTOP
▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀  lintel
│ (H&P) Harbor & Pine CPA                                              with CoFile │  Pane 76
│ Filings  New filing  Ready to pay  Client links  Signatures  Setup  Billing    ana@… [Log out] │  nav 52
░░░░░░░░░░░░░░░░░░░ the firm's doorlight wash ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
  content, max 1200
PHONE
│ (H&P) Harbor & Pine CPA     with CoFile │  Pane 64
│ Filings ▾                           ≡ │  current page + menu
```

- Nav items in Atkinson Next 550, 16 px, Ink; the current one with a 3 px underline in the firm's
  secondary (or primary) color. The account email in the small style (a link to the password page
  where the product allows it), "Log out" as a small quiet button.
- Phone: the nav collapses to the current page's name and a menu sheet (Sunlit, the Pane at its top,
  the seven items at 18/24, 56 px rows).

**Filings (the overview).** h1 "Filings" (in the firm's font) with "New filing" (firm primary) on the
right. Notices ("Real filings need an active subscription; rehearsals are free. Subscribe", "… ready
to pay and need your card's security code. Pay and file", "… need someone to act.") as notices
(§11.7). The table: Filing (a link, in 650), the "Test" badge (rehearsal style, with the ghost
light), Type, Status, Started. Status chips: the firm's **"your turn" chip** for "Waiting for
approval" (it's the firm's own call to act, so it wears the firm's color, not a warning color);
Fern for done; Ochre for "Needs information" and "Changes requested"; Brick for problems; Slate for
in progress. **Empty state**: "Your desk is clear. Start a filing (it can be a free rehearsal), or
send a client a link with your logo on it." with "New filing" and "Send a client a link", above a
240 × 160 vignette: an empty desk in a patch of light in the *firm's* glow color.

**Setup.** h1 "Set up your account" (or "You're set up") · "Three short steps, plus registered agents
if you want them. You can change any of them later." The three steps (Your firm, Branding,
Payment) as a vertical list of rows, each with a coverage-style lamp (○ to do, ● done, in the
firm's color), title, text and its button ("Set up your firm", "Set up branding", "Set up payment",
or "Change"). The "Registered agents (optional)" card below. **When everything is done**: the page
becomes "You're set up" and its head shows **the firm's own door**, its name gilded in its own
font's spirit (roman capitals for serif brands, block capitals for sans), shaded in its own color,
in morning light. It's the payoff for everything the home page promised: the firm's name, on the
door, in our light. Then "You can change any of these at any time." and "Start a filing".

**Branding (Step 2 of 3).** h1 "Branding" · "Your clients see your name, logo and colors on the pages
where they fill in and approve filings." Form on cols 1–6 (Your web address, Name your clients see,
the logo upload, the colors, Font, Your own font (uploaded), Support email shown to clients). On
cols 7–12, sticky: "Preview of a client's page", live, built by the brand adaptor as the firm types:
the Pane, a heading, two fields and a button, in their brand. Under the preview, a 200 px strip of
their door glass with their name gilded (Tier A). When the adaptor adjusts something (a color
darkened for readable buttons, a white logo box removed) it shows a quiet before/after pair of
swatches, explanation `[copy needed]`. Logo upload: a 160 px drop area with a dashed Line border
that shows the trimmed logo on the Pane color as soon as it's chosen. Color fields: a 44 px swatch
plus a Mono hex field. Font: a select that previews each option's name in its own face.

**Your firm, Payment, Registered agents.** Narrow forms (720 px) with the field styles of §11.2.
Payment's card choices ("One card for every filing", "A card for each type of filing") as two large
radio cards.

**New filing.** h1 "New filing" · "Which state is the business in?" · the small note · "Or send us the
details and we fill in the form for you to check:" with its three ways (email address, text or
WhatsApp, Slack `/file`), each with its icon. **The state picker**: three window tiles (P6's family),
New York, New Jersey, Florida, each with the place name in the firm's heading font at 28 px and the
count line ("4 filing types, plus the federal EIN", or "None offered yet"), 200 px tall, lit on
hover. **Then by state**: "← All states" · h1 "New Jersey: what are you filing?" · the text · the type
cards in a 2-column grid: title (650, 18 px), the chip ("Live" with its lit lamp, or "Rehearsal"
with the ghost light), the summary, the fee note in the small style. **"Your pages for clients"**: a
card listing each page's URL in Mono with a copy button `[copy needed]`, and "Website widget: paste
where the form should appear." with the snippet in a Night code block.

**The new filing form.** "← Other filings" · h1 the type's title · the summary and "Send them a
link" · notices (filled from a message; rehearsal) · "Start from a client you filed for before" as a
compact row (select plus "Fill in") · the intake form (§10.11) · its footnote "Next you get the proof
to approve. Nothing is filed until you do." · the button "Create the proof".

**A filing.** "← Filings" · h1 the filing's title, with its status chip and the "Rehearsal" badge ·
the meta line. Under it, the **day arc** (§11.10) with the filing's stages, its current stage glowing
in the firm's color. Then, in this order, as the product lays them out: the next-step notice; "Save
to Google Docs"; the card-code notice; **"Your proof is ready"**, the brightest card on the page
(Sunlit with the firm's doorlight wash across its top, the text "Check every detail and fee exactly
as they'll go to the state, then approve it or ask for changes. Nothing is filed until you
approve.", the firm's primary button "Open the proof and approve it", and the line about the email);
the signature note; **Documents** as a list of document cards (§9.5's style at 56 px tall, with the
kind as a caption); the **EIN** in Mono 28 px in a Sunlit inset; "Progress on the state site" as a
disclosure with the run's steps as a numbered list with times in Mono.

**Send a client a link.** h1 "Send a client a link" · the text · the form · "Links you sent" as a
table whose status words ("Waiting for the client", "Used: open the filing", "Turned off",
"Expired") use the status chips, with "Turn off" as a small quiet button.

**A request by text or email.** h1 "Request by text message" (or email, Slack, WhatsApp) · "From …"
· the card "This looks like a request for: New Jersey LLC formation." with "We filled in 3 answers
from your message. Check every answer and add what's missing before you send it." and "Open the
filled-in form". "Your message" shows the message as P3's end frame does: the text in a bubble (or
an email card), with the phrases the draft used underlined in Lamp tint. The product and the home
page's picture are the same thing.

**Saved signatures.** h1 "Saved signatures" · text · the table (Signer, Saved, Last used, "Remove" as a
small Brick-outline button) · "Add a signature" · the pad (§11.2).

**Ready to pay.** h1 "Ready to pay" · text. For each card waiting: a generic card outline (no network
logos), its label and last four in Mono, the security-code field (Mono, 4 character boxes, 56 px,
`inputmode="numeric"`), and the filings waiting for it as a compact list.

**Billing.** h1 "Billing" · notices · the billing panel · the plan picker as the Pricing page's four
plan cards (§10.4) with the current plan marked by the firm's color border and a "current" state
`[copy needed]` if the picker lacks one · the registered agent services panel.

---

### 10.10 The proof (the page the firm approves)

The most important page CoFile makes. It belongs to the firm: the firm's Pane, the firm's font for
the title, the firm's color for the button. It's built from the proof page's own words.

```
DESKTOP (760 px sheet on Shade)                       PHONE
▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀ lintel ▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀        ▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀
│ (H&P) Harbor & Pine CPA            with CoFile │    │(H&P) Harbor & Pine  with CoFile│
░░░░░░░░░░░░░ the firm's doorlight ░░░░░░░░░░░░░    │✦ Rehearsal: nothing will be  │
┌──────────────────────────────────────────────┐    │  filed or paid, even if you  │
│ ✦ Rehearsal: nothing will be filed or paid,  │    │  approve.                    │
│   even if you approve.                       │    │NJ formation: TWO SISTERS …   │
│ NJ formation: TWO SISTERS BAKERY LLC         │    │Filing reference … Please     │
│ Filing reference …. Please decide by …       │    │decide by …                   │
│ ┃ By approving, you confirm every detail …   │    │┃ By approving, you confirm … │
│ The state's review page                      │    │The state's review page       │
│ ┌──────────────────────────────────────────┐ │    │[ picture, full width ]       │
│ │ picture of the state's review page        │ │    │Filing details                │
│ └──────────────────────────────────────────┘ │    │Business name                 │
│ Filing details                               │    │TWO SISTERS BAKERY LLC        │
│ Business name        TWO SISTERS BAKERY LLC  │    │…                             │
│ …                                            │    │State fees                    │
│ State fees                                   │    │Formation filing fee $100.00  │
│ Formation filing fee              $100.00    │    │Total               $103.50   │
│ …                                            │    │What should change? …         │
│ Total                             $103.50    │    │[                           ] │
│ What should change? (Needed only if you ask  │    │[ Approve, and authorize     ]│
│ for changes)  [                           ]  │    │[ submission and payment     ]│
│ [ Approve, and authorize submission and payment ] │ │[     Request changes        ]│
│ [ Request changes ]                          │    │Questions: …                  │
│ Questions: …                                 │    └──────────────────────────────┘
└──────────────────────────────────────────────┘
```

- **Rehearsal band**: "Rehearsal: nothing will be filed or paid, even if you approve." on Lamp tint,
  with the ghost-light glyph, 650 weight, at the very top of the sheet.
- **Title**: the filing title in the firm's font, 34/40 desktop, 26/32 phone. The reference and
  deadline line in the small style, Slate; the deadline in 650.
- **The consent note**: a Sunlit inset with a 3 px left rule in the firm's color (an authorization,
  not a warning, so it gets the firm's color, not Ochre), body 17/27.
- **The state's review page**: its h2 (Atkinson Next 650, 22 px) and paragraph, then the picture in
  a frame (1 px Line border, radius 8, 16 px inner padding on #F3F4F1) with the product's own alt
  text.
- **Filing details**: the heart. Two-column key-value rows, 52 px min, label 15 px Slate on the
  left (38%), value in Mono 17 px Ink on the right; nested groups (members, addresses) get a 650
  subhead and a 16 px indent. Masked numbers stay as the product writes them, with Mono spacing.
- **State fees**: the paragraph, then label and amount rows with figures right-aligned on tabular
  figures; "Total" in 650 above a 1 px Ink rule; "Maximum you authorize" when present, in Slate.
- **The decision**: the optional one-time code field (Mono, 6 boxes, `autocomplete="one-time-code"`);
  the "What should change?" field as a 3-row textarea; then **"Approve, and authorize submission and
  payment"** as the firm's primary button, full width of the sheet's content, 60 px min, wrapping to
  two lines on phones; and "Request changes" as a secondary button under it, 52 px. The buttons are
  never sticky: the firm reaches them by reading.
- **Reading light**: a 3 px bar of the firm's glow color down the sheet's left edge fills as the
  firm scrolls through the proof, so the page "lights up" as it's read. Purely decorative, no
  gating.
- **The decision page** (after approving or asking for changes): the same Pane and sheet, the
  heading and paragraphs the product writes, a quiet Fern dot beside the heading for an approval.
  No confetti, no animation beyond the fade-in.
- **Dark mode**: the sheet in Lamplit, values in Moonlit, the firm's button in `--firm-ink-dark`.

---

### 10.11 The firm's pages for clients

**A firm's page for one filing** (the brief's example `cofile.app/bestaccounting/llc-filing-new-york`;
in the product today the slug reads `llc-formation-new-york`), **a client link page** (`/i/…`), and
the **white-label hosted page** (`/e/…`) all share one template, branded entirely by the firm:

- The Pane (Best Accounting: Cardinal lintel, its lowercase wordmark, "with CoFile" at the right),
  the firm's doorlight wash.
- The rehearsal notice when the type isn't live: "This page is in rehearsal for now. You can fill it
  in, but nothing will be filed with the state and nothing will be charged, now or later, even after
  you approve it. To file for real, contact Best Accounting." on Lamp tint with the ghost light.
- h1 the filing's title in the firm's font (28/34 desktop); on a client link page, the link's label
  after it in Slate. The summary and "After you send this, Best Accounting checks every detail and
  fee and approves exactly what will be filed. Nothing is filed or paid until they do." in the lede
  style; the fee note in the small style.
- **The intake form** (below) and its button "Send to Best Accounting" in Cardinal (white text,
  6.0:1). The adaptor keeps Cardinal for the button and switches error notices to their icon-first
  style, so the red button and a red error never look alike.
- The footnotes: "Next, Best Accounting checks it and approves the filing. Nothing is filed until
  they do." and the Terms and Privacy line, and the firm's support email.

**The intake form.** One column, 640 px, the firm's sections as cards (Sunlit, radius 14, 32 px
padding, 24 px apart), each headed by its title in the firm's font (Name, Business data, Registered
agent, Members and managers, Signers, …).

- On desktop, a slim progress rail to the left of the column lists the section titles with small
  lamps that light in the firm's color as each section is completed: the form lights up as the
  client goes. On phones the rail becomes a 3 px bar in the firm's color across the top.
- Fields per §11.2: labels above, 52 px inputs, help text under, "*" for required with the copy's
  "Fields marked * are required." above the first section.
- "Same as" and "Same person as" options as small pill toggles beside the group heading.
- Repeated groups (members, managers) as nested cards with a "Remove" text button and an add button.
- "More options (optional)" as a disclosure row.
- **Authorizations**: the explanation in the small style, then each statement as a 24 px checkbox row
  with the statement at body size.
- **Signature**: the pad (§11.2) with the copy's line "Only the signer named above may draw it."
- **Errors**: "Please fix these and submit again." as a Brick notice at the top listing each issue as
  a link to its field; each field shows its message under it with the short-bar icon.

**Thank you.** "Thank you, we have your details." and "Next, the firm checks every detail and approves
the filing. Nothing is filed or paid until it does. You can close this page." on the same Pane, with
the firm's doorlight wash slightly warmer (a 600 ms fade up) and nothing else. Calm, finished, theirs.

---

### 10.12 Platforms: the dashboard, the docs, the widget

**The dashboard.** CoFile-branded, since a platform's team works in it.

- A Night sidebar (248 px) with the lockup in Moonlit and Lamp at the top and the nav (Overview,
  Filings, Ready to pay, Firms, API keys, Webhooks, Setup, Team, Billing, Sign-ups, Docs), each with
  its icon, 44 px rows, the current one on a Lamplit pill with a 3 px Lamp bar at its left. The
  account email, "Change password" and "Log out" at the bottom. On phones the sidebar becomes a menu
  sheet.
- Main area on Shade, Sunlit cards, h1 in Fraunces 40 (the one app where Fraunces appears, since
  it's CoFile's own).
- **Overview**: three stat cards (Filings, Webhook deliveries, API keys with "Manage keys"), the
  number in Atkinson Next 650 at 44/48 tabular; then "By status", "By state" and "By month" as charts:
  horizontal bars for status and state, columns for month, in Ink at 80% with the current month in
  Lamp, gridlines in Lit line, labels 14 px Slate, values at the bar ends. No pies, no 3D, no
  gradients.
- **Filings**: the "All firms" filter and "Show" control above the table (Filing, Firm, Type, Status,
  Created), with "Test" badges and "Ready to pay: needs the card's code" as an Ochre chip.
- **Firms**: the table (Firm, Filing desk, Approvers), each firm's row led by its own logo at 24 px
  and a 4 px swatch of its color, so a platform sees its firms' brands at a glance.
- **API keys, Webhooks, Team, Sign-ups**: tables with Mono for keys, URLs and secrets (masked, with a
  reveal control where the product has one), "Revoke" and "Turn down" as Brick-outline buttons,
  "Approve" as the primary.
- **Setup**: its four sections ("Payment methods", "State portal logins", "Who's named on your
  filings", "Your registered agent in each state") as stacked cards, with the portal logins as a
  table (Portal, Pays by, Login, "Disconnect").

**The API docs.**

- Top bar with the lockup and "Docs"; a 248 px nav (Overview, Guides with its eight guides,
  Reference, Endpoints, OpenAPI (JSON)); a 720 px reading column; at 1280 px and up, a 420 px code
  rail on Night beside each guide's examples.
- Prose in Atkinson Next 18/29; h1 Fraunces 48; h2 Atkinson Next 650 26; inline code in Mono on a
  #ECEDEA pill.
- **Code**: Night blocks, Mono 15/24, syntax colors: keys Lamp #F5B53F, strings #A8D5B5, numbers
  #F2A99A, punctuation #A9ADB5, comments #8A909C (all ≥ 4.5:1 on Night). A copy button `[copy
  needed]` in each block's top right.
- `"dryRun": true` is marked wherever it appears with the ghost-light glyph in the margin: in the
  docs, a rehearsal looks the same as it does everywhere else.
- **Endpoints**: method badges in Mono 13 px (GET Ink outline, POST Ink fill, PUT Ink fill with
  Moonlit text, DELETE Brick outline), the path in Mono, parameters as a key-value table.
- **The lifecycle guide** ("Filings and the lifecycle") uses the day arc (§11.10) with every status
  label from the product on it.

**The white-label hosted page.** The client-page template of §10.11 under the platform's firm's
brand; "with CoFile" appears only where the product shows it.

**The embed widget.** Runs inside a firm's (or a platform's) own website, so it brings no Pane and no
page background of its own: the host page is the frame. Two looks, chosen in setup `[copy needed]`:
**card** (Sunlit, radius 14, 1 px Lit line border, 24 px padding) or **bare** (transparent, fields
only). The firm's font and color; fields and buttons from §11; responsive from 320 to 720 px; its
height follows its content. "Filed with CoFile" under the form at 12 px, left-aligned. No light
layer, no motion beyond field focus.

---

### 10.13 Emails

Two families, both 600 px, single column, tables for layout, inline styles, a bulletproof button, and
a dark-mode stylesheet for the clients that honor one.

**The firm's emails** (about its filings: "Your proof is ready to approve: …", "More information
needed: …", "Card security code needed: …", "Changes requested: …", "Completed: …", "Rejected by the
state: …" and the rest):

```
┌──────────────────────────────────────────────┐
│▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀ firm lintel 4 px ▀▀▀▀▀▀▀▀▀▀▀▀▀▀│
│ (logo) Harbor & Pine CPA                      │  Pane, --firm-wash
│ ✦ Rehearsal: nothing will be filed or paid,  │  Lamp tint band, when a rehearsal
│   even if you approve.                        │
│ Your proof is ready. Open the link to see    │  17/26
│ every detail and every fee, …                │
│ [        Open your proof        ]             │  firm-ink, 52 px
│ Or paste this link into your browser: …      │  13 px
│ ──────────────────────────────────────────── │
│ Questions? … · with CoFile                    │  12 px, Slate
└──────────────────────────────────────────────┘
```

- The Pane with the firm's logo (2× PNG, max 40 px tall) on `--firm-wash`, the lintel as a 4 px
  table row in `--firm`.
- The rehearsal line as a Lamp-tint band with the ghost-light glyph (a 2× PNG, alt "").
- Body in Atkinson Hyperlegible Next (linked from Google Fonts for Apple Mail and iOS), falling back
  to Verdana, then Arial: 17/26, #1C1F24, paragraphs 16 px apart.
- The button in `--firm-ink` with `--firm-on` text, 52 px tall, radius 8 (square corners in Outlook
  via VML), its label from the product ("Open your proof", "Choose a name", and so on); the fallback
  link in 13 px Slate.
- **Documents back** ("Completed: …"): a 560 × 120 header picture above the body, two of §9.5's
  document cards resting in golden light, as a 2× JPEG, alt "" (decorative).
- **EIN issued**: the status label "EIN issued" exists, the email's subject and body are `[copy
  needed]`. Layout: the same family, with the EIN in Mono 28 px, letter-spaced 2%, in a Sunlit inset
  (#FFF9EF, 1 px #E2DCCF border).
- Footer: the firm's support line when there is one, then "with CoFile" (2× PNG of the wordmark,
  alt "with CoFile"), 11 px.

**CoFile's account emails** ("Confirm your email for CoFile" with "Confirm my email", "Your partner
account is open" with "Log in", "Your CoFile account is ready" with "Set my password", "Reset your
password" with "Choose a new password", "You're invited to …'s filing portal" with "Set my
password"):

- The CoFile lockup on Sunlit, with a 1 px Lamp line under the header (the door gap).
- The button in Lamp with Ink text.
- The sign-up welcome ("Your partner account is open") gets one picture: a 560 × 200 crop of the
  waiting door in morning light (P9 in daylight), alt `[copy needed]`.
- Footer: the legal line ("CoFile is not a law firm or a government agency, …") at 12 px, Slate.

**Dark mode** (Apple Mail, iOS Mail, Outlook.com): backgrounds to Night and Lamplit, text to Moonlit,
the Pane to `--firm-wash-dark`, and every logo on a light plate (#FFF9EF, radius 6, 6 px padding) so
a firm's dark logo never disappears.

---
