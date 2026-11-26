# Doorlight: the visual design of cofile.app

**Tomás Ferreira** · creative technologist · visual design spec, v1 · Nov 26, 2026

For the build team, and for the studios we commission. The copy is locked: every headline, label and
caption below is quoted from `web/app/page.tsx` or from the product's own pages. Where a design needs
a word that doesn't exist yet (alt text, an interaction label), I've marked it `[copy needed]`. Every
demo uses the copy's example details (Harbor & Pine CPA, Two Sisters Bakery LLC, Ana Ortiz) and never
shows a real filing.

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
sites that win awards. I'm writing this spec because I think CoFile has three moments that people
should *feel* rather than read about:

- a client's text message turning into a drafted filing,
- a firm's name and logo turning up on every page its client sees,
- the state's papers coming home.

The part I'm proudest of is the unglamorous part. I ship. Every scene in this spec has a
performance budget, a static version that works with JavaScript off, a low-power version for an old
phone, and a reduced-motion version. The 61-year-old CPA on a 2019 laptop and her client on a
cracked Android get the whole story. The light is a bonus on top of a complete, well-set site, and
the site never depends on it.

What I bring: light, material and time as storytelling tools; the engineering to make them cheap;
and the discipline to keep all of it in service of one sentence: *"this is for my firm, my clients
will love it, I want to try it."*

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
the door. Ours in small print."* Doorlight makes that sentence into something you can see.

### How it brings out the selling story

| The copy sells | What Doorlight does with it |
|---|---|
| **1. Your firm, your client, your name.** "Your name on the door. Ours in small print." | The gilded door is the signature image. On the firm's own pages, its color becomes the light at the top of the page. "with CoFile" is drawn and placed like a sign painter's signature: small, in the corner, beautifully made. |
| **2. Effortless for everyone.** "You start it. Your client approves it. CoFile files it." "Clients don't fill in forms. They text you." | Light doesn't push. Things fill in as the light moves across them. Ana's text message is the site's party trick: its words lift off the bubble like dust caught in a sunbeam and settle into a drafted New Jersey LLC formation. |
| **3. A client experience to be proud of.** "Your client sees what the state will see, before the state does." | The proof is always the most brightly lit object in any composition. In the three steps, the middle one (the client's) gets the brightest light: "your client is in charge of the middle one." The proof section shows it on a printer's light table, layer by layer. |
| **4. It does the work and brings the results home.** "The papers come back to you." | Golden hour. The light turns warm and low, and the state's documents, the IRS letter and the record arrive on the firm's desk and settle into one neat stack. |
| **5. Try it free, for real.** "Rehearse on the real stage." "Run one rehearsal. Then decide." | The rehearsal section is an empty theatre lit by a single ghost light: the real stage, no audience. At the end of the page it's night, and the door is waiting for *your* name. Click "Run a free rehearsal" and the sign-up page letters your firm's name on that door as you type it. |

### The page is one working day

The home page runs from morning to night. As you scroll, the light layer follows the sun: its
color, its angle, the shadows on the cards. You open the page at 8:00 with a request on the desk and
close it at 22:00 with the papers home and the door lit. Nobody needs to notice this consciously.
They'll feel the page warm up, then glow, then settle.

| # | Section | Time | Light |
|---|---|---|---|
| 1 | Hero | 08:00 | Low morning sun from the left through Harbor & Pine's door glass; pine shadows sway |
| 2 | Process | 09:30 | Three-pane window; the middle pane is clear glass and brightest |
| 3 | The proof | 11:00 | Clear late-morning light; the light table glows from below |
| 4 | Firms | 12:00 | The door scene, catching full noon sun |
| 5 | Requests | 13:00 | Soft, bright, lunchtime (Ana texts from the bakery) |
| 6 | Checks | 14:30 | Even, still afternoon light. No gobo, no motion |
| 7 | After | 16:30 | Golden hour from the right, long shadows |
| 8 | Rehearsals | 18:00 | Inside the theatre: dark, one ghost light |
| 9 | Coverage | 18:30 | Dusk outside, desk lamp on the table |
| 10 | The catch | 19:00 | Lamplight, still |
| 11 | Security | 19:30 | Lamplight, still |
| 12 | Enterprise | 21:00 | Night; the inquiry form is the lit window |
| 13 | Close | 22:00 | Night; the door lit from inside, waiting for a name |

### The rules of the concept

1. **The light belongs to the firm.** On CoFile's own site, the light carries the example firm's
   name, Harbor & Pine CPA. On a firm's pages it carries that firm's color. CoFile never projects its
   own name in light, and never gilds it.
2. **CoFile's own presence is small and warm.** The Doorlight mark, the wordmark, and a single warm
   color, Lamp, for CoFile's own buttons on CoFile's own pages. On a firm's pages, CoFile is only
   "with CoFile".
3. **The proof is the brightest thing on the page.** Wherever it appears (hero, process, proof
   section, firms, emails), nothing else in the composition is lit more brightly.
4. **Support sections get still light.** Checks, the catch and Security are the quiet hours: plain
   typographic layouts, set beautifully, with no scene and no motion beyond a fade-in. They look
   trustworthy because they look calm. They are easy to find: they keep their place in the page,
   their anchors, and "Security" stays in the footer.
5. **No drama about stopping.** No red flashes, no locks, no seals, no shields, no stamps. The
   rehearsal's last line ("Pay Now · held, on purpose") is just the last cue of the evening.
6. **Everything works without the light.** The static version is a complete, designed site.
   WebGL is an enhancement that arrives after the words.

---

## 3. Identity

### 3.1 The mark: the Doorlight

An arched doorway of warm light, leaning forward at the angle of the morning sun: the shape a glass
door's light makes when it falls across a floor. It reads as "door", "light", "open", and it leans
forward, which gives it energy without an arrow.

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
be read at 11 px because its main job is to be the small print. Brief for the lettering artist:

- **Proportions.** Cap height 700 / 1000 em, x-height 520 (generous, for small sizes), stem 92
  units. Draw from scratch; Atkinson Hyperlegible Next Semibold is the reference for proportion and
  color on the page, not a source to trace.
- **C**: open aperture, terminals cut perpendicular to the stroke, upper terminal slightly longer
  than the lower.
- **o**: optically round, 4% overshoot.
- **F**: top arm 62% of the letter's width, middle arm 50%, middle arm centred at 52% of cap
  height.
- **i**: the tittle is a miniature Doorlight, leaning 20.6°, 1.1 × stem width wide and 1.6 × tall,
  its base 60 units above the x-height. It must clear the F's top arm by at least 40 units; kern
  F–i tight so the little light tucks in just past the end of the arm. **This tittle is the mark
  inside the word**: wherever the separate mark would be too much (all "with CoFile" uses), it
  carries the brand alone.
- **l**: a small rightward foot, so l never reads as I at 11 px.
- **e**: horizontal bar, open lower aperture.
- Spacing tight and even. Supply three pixel-fitted masters for 11, 12 and 14 px, plus the vector.

### 3.3 Lockups, clear space, minimum sizes

- **Primary lockup**: Doorlight mark left of the wordmark. Mark height = 1.2 × the wordmark's cap
  height. The mark's base sits on the baseline. Gap = 0.45 × cap height. Horizontal only.
- **Clear space**: one cap height on every side.
- **Minimum sizes**: primary lockup at 12 px cap height (nav uses 15 px cap height, about 22 px
  overall). Wordmark alone at 8 px cap height (the "with CoFile" size).
- **Colors**: Ink on light; Moonlit #ECE8DF on Night, with the mark in Lamp. Never in a firm's color,
  never gilded, never on a photograph without a solid plate.

### 3.4 The "with CoFile" mark

The sign painter's signature. It is the only sign of CoFile on a firm's pages, so it has to be
small, unmistakable and well made.

- **Set**: "with" in Atkinson Hyperlegible Next Italic 400, then a word space, then the wordmark
  (no separate mark: the Doorlight tittle carries it). "with" is sized so its x-height matches the
  wordmark's.
- **Size**: 12 px on screens (wordmark cap height 8.4 px); 11 px in emails, as a 2× PNG with the
  alt text "with CoFile".
- **Color**: the surrounding text color, solid, at 64% of the way from the background to the text
  (on a firm's pane that's about #5D6168). Never the firm's color, never Lamp, never a link color.
- **Place**: bottom-right of the firm's pane (the header band, §3.5), sitting on the same baseline
  as the firm's name. On the proof it sits at the right end of the pane. In the embed widget the
  product's own words are "Filed with CoFile", set the same way, under the form, left-aligned.
- **Behavior**: none. No hover, no glow, no animation. A signature, not a button.

### 3.5 How a firm's logo sits on its pages: the Pane

Every page a firm's client sees (the form, the proof, the emails) and every page of the filing desk
starts with **the Pane**: a header band that works like the firm's door glass.

```
 ▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀  4 px lintel, --firm (exact)
 ┌──────────────────────────────────────────────────────────────────┐
 │  [ LOGO ]  Harbor & Pine CPA                         with CoFile │  76 px (64 px phone), --firm-wash
 └──────────────────────────────────────────────────────────────────┘  1 px --firm-line
 ░░░░░░░ doorlight wash: the firm's light falling from the top-left ░░░░░░░  360 px, static
```

- **Lintel**: a 4 px band of the firm's exact primary color across the full width. Apart from the
  logo itself, this is the only place the exact, unmodified brand color appears in a large shape.
- **Pane**: 76 px tall on desktop, 64 px on phones, filled with `--firm-wash` (the firm's hue at
  97.5% lightness, §4.4). A pale, faintly colored glass, so any logo designed on white looks right.
- **Logo**: at the left page margin, vertically centred, sized by the optical rule below.
- **Name**: if the logo doesn't contain the firm's name (heuristic: logo aspect ratio under 2:1), the
  name sits 12 px to the right of the logo in the firm's font (or Atkinson Hyperlegible Next 650),
  20 px on desktop, 18 px on phones.
- **with CoFile**: at the right margin, on the name's baseline.
- **Doorlight wash**: under the pane, a static, soft light falls from the top-left: a radial gradient
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
| `--firm-glow` | *c* at oklch(0.92, min(C × 0.5, 0.08), H), mixed 60/40 with Daylight #FFE3A8 | The doorlight wash |
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
   pixels above 98% lightness to transparent with a 1 px feathered edge. Setup shows a before/after
   and a "use as uploaded" override `[copy needed]`.
3. **Light logos** (mean ink lightness above 0.8, made for dark backgrounds): place on a plate of
   `--firm-ink`, radius 8 px, padding 8 × 12 px, inside the Pane.
4. **Optical size**: logos are sized by how much ink they carry, not by their box. Wide wordmarks
   (aspect ratio 2.5:1 or more) get 28 to 36 px of height; compact marks (under 1.6:1) get 44 px;
   in between, interpolate. Then nudge so the ink area is about 2,200 px² on desktop (1,600 on
   phones). A thin wordmark and a chunky seal end up looking the same size, which is what the eye
   wants.
5. **Retina**: keep the upload at its native size; serve 1× and 2× WebP plus the original SVG when
   there is one.

**Font.** The firm's font (a Google Font or an uploaded file) sets the firm's name in the Pane, the
h1 and h2 on its pages, and the title on the proof. Body text, labels and every filing value stay in
Atkinson Hyperlegible (the legibility contract, §5). The adaptor measures the font's x-height and
writes `size-adjust` and `ascent-override` so headings in any font sit at the same optical size.
Script and novelty faces (x-height ratio under 0.4) are limited to the firm's name.

### 3.7 The example firms

Mockups use only the example names already in the product:

- **Harbor & Pine CPA** (the home page's example firm). Brand: **Pine #2E5B4B** (white text on it
  is 7.7:1), with Brass #B08A3E as a secondary. Logo, to commission: a roundel monogram, "H&P" in a
  classic old-style serif inside a fine ring, with a small pine and two wave lines; plus a
  horizontal version with "Harbor & Pine CPA" set in Libre Caslon Text. Its font on its pages:
  Libre Caslon Text. On the door: gold leaf with a Pine outline and drop shade.
- **Best Accounting** (from the product's own example, "Best Accounting, filing through CoFile",
  and the brief's `cofile.app/bestaccounting/...` page). Brand: a bright **Cobalt #2F5BEA**, a bold
  geometric sans wordmark in lowercase. It exists to prove the system with a very different firm:
  modern, saturated, logo-only.

Both are fictional and drawn for us. No real firm's name or mark appears anywhere.

### 3.8 Identity don'ts

- Never tint, outline or recolor a firm's logo.
- Never make CoFile's mark larger than, or more prominent than, the firm's.
- Never project or gild CoFile's own name. The gold is for the firm.
- Never use Lamp on a firm's pages, except the rehearsal chip and notice (§11), where it is a
  product signal, not CoFile branding.
- Never build an icon or mark from locks, shields, seals, ticks-in-circles, stamps or eagles, and
  nothing that could pass for a government or IRS mark.

---
