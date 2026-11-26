# Plate & Proof

**A visual design spec for cofile.app**
Harold "Hal" Brennan, engraver and document designer, Philadelphia
Written against BRIEF.md, version 2 (Nov 26, 2026). The copy in `web/app/page.tsx` is locked, and every headline, paragraph and label below is quoted from it. Where a design needs a word that doesn't exist yet, I've marked it `[copy needed]`.

---

## 1. Who I am, and what I bring

I've cut letters into copper and steel for thirty-five years. I started at a security printer on the Delaware, engraving portraits and borders for stock certificates and bond coupons. Then I moved to the side of the trade I loved more: letterheads, wedding suites, diplomas, the calling cards of men and women who wanted their name to look as solid as their work. These days I consult for firms on their stationery. Mostly that means telling a managing partner his letterhead is crowded, and drawing him one that isn't.

Here's what I bring. I know what makes a person proud to hand over a piece of paper with their name on it. I know how a proof works: the printer sets your name, pulls one sheet and hands it over, and nothing runs until you initial it. That ritual is already in CoFile's copy ("You've approved a proof before: business cards, letterhead, an invitation at the printer"), so I don't have to borrow a metaphor. The copy has wandered into my shop.

I also know one temptation better than anybody on this job: making paper look *official*. Guilloche borders, rosettes, eagles, seals, microprinted frames, Treasury greens. I drew those things for a living. None of them goes on this website. CoFile isn't a government agency, and a firm owner should never feel the site is pretending to be one. I'm leaving my rose engine at home. My ornament on this job is the ornament of a good stationer: fine rules, a well-set name, a clean margin, a blind impression and a small maker's imprint at the foot of the sheet.

---

## 2. The visual concept: Plate & Proof

### The one idea

**CoFile is the firm's stationer.**

A fine stationer does three things. They engrave the firm's name on a plate once, and from then on every sheet, card and envelope the firm sends carries that name, beautifully. When something new is ordered they pull a **proof** and the customer approves it. And the stationer's own name appears only as a tiny **imprint** at the foot of the sheet or a blind stamp on the envelope flap: small print, on purpose.

That's the selling story of this copy, nearly word for word:

| The copy says | The stationer's shop shows it as |
|---|---|
| "Your name on the door. Ours in small print." | The firm's name engraved, large and proud. CoFile is the maker's imprint at the foot, "with CoFile", in 13px type. |
| "You start it. Your client approves it. CoFile files it." | The order is placed, the proof is approved, the run goes through. It's the most familiar job in the world. |
| "Your client sees what the state will see, before the state does." | **The proof**: one sheet on the firm's letterhead, every detail and fee set clearly, and one button where a signature would go. |
| "The papers come back to you." | The finished order comes home: an envelope addressed to the firm, the papers inside. |
| "Rehearse on the real stage." | **The blind impression.** The full plate is pressed into the paper, every letter there, with no ink. It's the most luxurious finish in stationery, and here it's free. |

### What the visitor should feel

A firm owner, 58, runs a twelve-person CPA practice and has had the same letterhead since 2004. She should land on this site and feel three things in the first ten seconds:

1. **"That's my name, and it looks good."** On every surface we show, the firm's name is the most beautiful thing on the page. The first thing her eye lands on in the hero is "Harbor & Pine CPA" at the top of a proof, set like engraved letterhead, not the CoFile logo.
2. **"My clients would like getting this."** The proof looks like something from a good printer: calm, white, generous, legible, with one clear button.
3. **"This is easy, and I can try it free."** Nothing on the page looks technical or legal or governmental. It looks like paper and ink and a person's name.

### The signature device: the Name Plate

CoFile's mark is a **name plate**: the small brass plate with two screws that goes beside an office door. Ours is **blank except for "Co"**. Across the site it keeps the same promise. We make the plate and you put your name on it.

- On the home page, a real hand-engraved brass plate reading "Harbor & Pine CPA" hangs on a real door (section 4, "Your name on the door").
- At signup, as the firm types its name into the existing "Firm name" field, the name appears engraved on the plate.
- At the close ("Run one rehearsal. Then decide."), the same plate hangs on the same door, **blank**, waiting for "your name on the door".
- On every page a client sees, the plate disappears. Only the firm's letterhead shows, with a small "with CoFile" imprint at the foot.

### Four rules I'd hand to every person on the build

1. **The firm's name is always the best-set thing on the page.** If CoFile's name ever outranks the firm's on a firm surface, the page is wrong.
2. **Paper, not plastic.** Surfaces are paper colors, edges are crisp, shadows are the shadows a sheet makes on a desk. No glassmorphism, no gradients, no glow.
3. **Ceremony without officialdom.** Fine rules, generous margins and good type give dignity. Seals, rosettes, guilloche, eagles, ribbons, wax, foil stamps, certificate frames, parchment and blackletter are banned (full list in section 3.7).
4. **Ink where the action is.** Everything is quiet ink on paper except the one thing to do next. On CoFile's pages that's the copper "Run a free rehearsal". On a firm's pages it's the button in the firm's own color.

### Where safety sits

The security, checks and catch sections get honest, well-set typography where the copy puts them: plain paragraphs, good rules, easy to find from the footer. They get no padlocks, shields, vault doors, seals or check-mark motifs, and the brand, the motion and the hero aren't built on them. The pride of the trade is in the name and the proof. The care shows in how well everything is set.

---

## 3. Identity

### 3.1 The pieces

| Piece | What it is | Where it's used |
|---|---|---|
| **The Name Plate** (mark) | A chamfered brass name plate with two level screws and "Co" engraved in the middle | Favicon, app icon, header lockup, social avatar, the close, the 404 |
| **The wordmark** | "CoFile" in a custom-drawn engraver's roman | Header lockup, footer, emails from CoFile, the docs |
| **The imprint** | "with CoFile", set small, on a hairline | The foot of every firm surface: proof, intake form, service page, client emails, filing desk header |
| **The tagline lockup** | Name Plate + "Approve the proof. Then it's filed." | The close, the social card, email footers on CoFile's own emails |

### 3.2 The Name Plate: drawing instructions

Draw it on a grid of **40 × 16 units**. One unit is 1/40 of the plate's width.

```
     0    4.5                 20                 35.5   40
 0   ╱‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾╲
     │  ╱‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾╲  │   ← bevel line (large sizes only)
 8   │ (⊖)               𝘊𝘰                (⊖)  │   ← screws, slots level
     │  ╲________________________________________╱  │
16   ╲________________________________________________╱
```

- **Outer plate.** A 40 × 16 rectangle, all four corners **chamfered at 45°**, chamfer leg 2.5 units. Stroke 1.2 units, mitred joins, stroke centred on the path. Plate Ink on light grounds, Cotton on dark.
- **Bevel line.** A second chamfered rectangle inset 2 units from the outer edge, chamfer leg 1.6 units, stroke 0.4 units. It's the light catching the plate's bevelled edge. Draw it only when the mark is 64px wide or more.
- **Screws.** Two circles of radius 1.1 units, centred at (4.5, 8) and (35.5, 8), stroke 0.6 units. Each has a **horizontal** slot 1.4 units long and 0.4 units thick through its centre. A good fitter sets the slots level, and ours are level. Below 32px wide, the screws become solid dots of radius 0.9 units with no slots.
- **"Co".** Set in Plate Roman Italic (section 5) and redrawn by hand for the mark. Cap height 6.4 units, baseline at y = 11.2, optically centred on x = 20 (the C's overshoot sits 0.3 units left of true centre). The C's upper terminal ends in a hairline flick rising at 20°. The o tucks into the C's mouth with −0.4 units of kerning, so the two read as one cut. Stroke contrast is 1:4, and the thinnest hairline is never under 0.35 units.
- **Clear space.** 4 units on every side. Nothing else goes inside it, including the firm's logo.
- **Minimum size.** 28px wide on screen (screws as dots, no bevel), 12mm wide in print.
- **The illustrator's reference.** Before the vector is drawn, the hand engraver in section 13 cuts this plate in real brass at 120mm wide. The vector is traced from a 2400dpi scan of that plate, then cleaned on the grid above. I want the hairline of the "Co" to have the slight swell only a burin gives.

**Favicon and app icon.** At 16 and 32px the plate is redrawn at **32 × 16 units** (2:1) so it fills the square better. It keeps the dots and the "Co" and drops the bevel. It sits on a Cotton square for the light theme and a Plate Ink square for dark. The 180px and 512px icons use the full 40 × 16 drawing with bevel and slotted screws, centred on Cotton with 18% padding.

**What it must not become.** It's never put in a circle, which would make it a seal. It never gets a ribbon, stars, laurel or a border of any kind. It's never filled with a gradient or rendered in gold foil on screen. The only "brass" version is the real photograph on the door. Everywhere else it's a line drawing in one ink.

### 3.3 The wordmark

"CoFile" is set in **Plate Roman Deck, Medium**, then redrawn by the type designer as a logotype:

- **C**: vertical stress, with a sharp beak serif on the upper terminal and a softer bracketed lower terminal.
- **o**: standard, with a slightly thinner hairline at top and bottom than the text cut (contrast 1:5).
- **F**: the top arm is extended 6% past the text glyph. The middle arm is shortened 8% so the gap after F doesn't open up.
- **i**: the dot is a **lozenge**, a small square turned 45° that is 1.25 times the stem width. It echoes the chamfer on the plate. This is the wordmark's one quirk, and no other text uses it.
- **l**: the ascender rises 4% above cap height, as in engraved romans.
- **e**: a level crossbar and a fine, slightly lifted hairline terminal.
- **Spacing**: tracking +10/1000. Kerning C-o −20, F-i −10, i-l 0, l-e −5.
- **Case**: always "CoFile", with a capital C and a capital F. Never all caps, never small caps and never lowercase, even in the imprint. It's a name, and you don't change a person's name to fit a style.

**Lockups.**

- **Horizontal** (header, footer): the plate, then the wordmark. The plate's height is 1.15 times the wordmark's cap height, the gap is 0.6 times the plate's height, and the plate's centre line aligns with the wordmark's x-height centre. The header lockup is 28px tall overall on desktop and 24px on phone.
- **Stacked** (social avatar, the 404, CoFile's own email header): the plate above the wordmark, centred, with a gap of 0.5 times the plate's height.
- **Wordmark alone** is used inside the imprint, and in running text in the docs header.

### 3.4 The imprint: "with CoFile"

This is the most important piece of the identity. It's how CoFile appears on every page a client sees, and it's the visual proof of "Ours in small print".

In my trade the imprint is the line in the bottom margin of a sheet that says who made it. It's small and well-set, and you only notice it if you look.

```
                     ────────────
                     with CoFile
```

- "with" in **Plate Roman Italic 400**, then one word space, then the **wordmark** (no plate).
- **13px** on screen (cap height about 9px). Never smaller, because it has to be readable, and never larger than 14px on a firm surface.
- **Graphite** `#5E6170` on white, `#A9ABB5` on dark. It's never in the firm's color and never in Copper.
- **On sheets** (proof, intake form, decision page, client emails): centred at the foot, 24px below the last content. Above it sits a centred hairline 40px long, 1px, Rule `#DDD7CB`, with 12px of space between the hairline and the text.
- **In the filing desk header**: right-aligned, at 13px, vertically centred on the firm's logo, with 24px of space before the user's email.
- **In the embed widget**: the existing words "Filed with CoFile", set the same way (Italic "Filed with" + wordmark), left-aligned at the foot.
- **Never** above the firm's name, never in the first line of a page, never animated, and never with the plate. On firm surfaces the plate belongs to the firm.

### 3.5 How a firm's logo sits on its pages: the Letterhead

Every firm surface (proof, intake form, service page, client link, filing desk, emails) opens with **the Letterhead**. That's the system I'd build for a client's stationery, made to take any logo and any color a firm uploads.

**Anatomy, top to bottom:**

1. **The head margin.** 32px on desktop sheets, 20px on phone.
2. **The logo**, on pure white `#FFFFFF`. The sheet behind the letterhead is always pure white, in light mode and in dark, because most firm logos were made as white-background JPGs for letterhead. On white they sit seamlessly, with no grey box showing around them.
   - Wide logos (aspect ratio over 3:1): height 44px on desktop and 36px on phone, max width 280px / 220px.
   - Medium (1.5:1 to 3:1): height 56px / 44px.
   - Square or tall (under 1.5:1): height 64px / 52px, with the firm name typeset beside it (see below).
   - Clear space around the logo is at least half its height. No frames, no shadows, no recoloring, no rounding of corners.
   - If the uploaded file is smaller than twice its display size, it's shown at its native size divided by two, so it never goes soft. Setup tells the firm `[copy needed]`.
3. **The firm name, typeset.** It shows when there's no logo, or beside a square logo (the code already shows logo and name together). It's set in the firm's chosen font, or in Plate Roman Deck if they chose "Standard (the device's own)". The name is in Plate Ink, never in the firm color: a name in ink always reads best, and the firm color goes into the rule. Sizes: 24px beside a logo; 30px on desktop and 24px on phone when there's no logo, tracking +1%.
   - If a firm's logo already contains its name, it should be able to hide the typeset name `[copy needed: a setting label]`, or the name prints twice, which looks amateur.
4. **The Firm Rule.** This is the device that makes any firm's color look like a printing ink rather than a web stripe:
   - A **3px rule in the firm's Main color**, the full content width of the sheet.
   - A **2px gap**, then a **1px rule in the firm's Second color**. If there's no second color, it's the Main color at 35% opacity.
   - It sits 20px below the logo. This thick-and-thin pair is the classic letterhead rule, and it carries the firm's color without making a page loud.
5. **Alignment.** **Centred** on the proof, the decision page and client emails, which are the ceremonial pieces. **Left-aligned** on the intake form, the service page, the client link page and the filing desk, which are the working pieces. The firm doesn't have to choose. The page decides.

**On a desk page in dark mode**, the logo sits on its own small white plate: a chamfered white rectangle with 12px padding and the same 45° corners as the Name Plate. So the logo is always on the white it was designed for, and the shape quietly ties back to the mark.

### 3.6 How a firm's color behaves: the ink match

Firms type in any hex value. A stationer matches a customer's color as an ink and tells them honestly when it won't print. The site does the same, automatically, and never changes the firm's color in its logo or its Firm Rule.

The code's own help text gives the Main color to "Buttons and the top of the page" and the Second color to "Links and highlights". I keep those jobs.

| Firm's Main color | Firm Rule | Buttons (white text) | Focus ring |
|---|---|---|---|
| Contrast with white ≥ 4.5:1 | Exact color | Exact color | Exact color |
| 3:1 to 4.5:1 (mid tones, e.g. a bright teal) | Exact color | **Mixed a shade deeper**: lower the OKLCH lightness in steps of 0.02, same hue and chroma, until white text reaches 4.5:1 | The deepened color |
| Under 3:1 (pale, yellow, pastel) | Exact color | **Plate Ink** button, with a 4px left edge in the firm color | Plate Ink |
| Near-black (OKLCH L < 0.25) | Exact color | Exact color | Exact color |
| Very high chroma (neon) | Exact color | Chroma capped at 0.17 for fills only | Capped color |

The Second color handles links and highlights. If it reaches 4.5:1 on white, links use it. Otherwise links use the deepened Main color, or Plate Ink. Highlights (the "check this" wash on the proof) are always the Second color at 10% over white, and that tint never carries text contrast on its own.

**The page under the sheet** gets a whisper of the firm's ink, the way a mill tints a stock for a client. The page color is `oklch(97.6% min(C × 0.12, 0.010) H)`, where C and H are the chroma and hue of the firm's Main color. With no color set it falls back to Bond `#F5F5F2`. Most visitors will never notice, but every firm's pages will feel a little bit theirs.

The setup Branding page shows all of this live (section 10). If the site deepens a color for buttons, the preview shows the original next to the deepened one, so the firm understands and isn't surprised `[copy needed: one line explaining the deepened button color]`.

### 3.7 Lines I won't cross

CoFile is not a government agency and must never look like one, on its own pages or a firm's. None of the following ever appears, in any art, photograph, icon, illustration or texture:

- Circular seals, rosettes, medallions, starbursts, "approved" stamps, notary crimps, embossed foil seals or wax seals.
- Guilloche patterns, microprinting, security borders, certificate frames, banknote vignettes, allegorical figures (Liberty, Justice, Commerce) and portraits in engraved ovals.
- Eagles, flags, stars-and-stripes, state outlines, capitol domes, columns, scales of justice, laurel, ribbons and banners.
- Red-white-and-blue palettes, Treasury greens, parchment and blackletter.
- The typefaces of American government sites (Public Sans, Source Sans as used in federal design systems), Trajan, and Copperplate Gothic.
- Any reproduction of a state's or the IRS's header, logo, letterhead or document. In marketing mockups, the "state's own review page" is redrawn as neutral field rows with no header. Real IRS or state documents are never photographed legibly. The EIN letter is shown only as a closed envelope or an edge-on sheet, never with its letterhead visible.

The same rule applies to locks, shields, vault doors and check-badge icons, though for a different reason. They're not dishonest, but they'd make security the story, and it isn't.

---

## 4. Color

### 4.1 The idea

There's paper and there's ink. CoFile owns one ink of its own, **Copper**, the metal engraving plates are cut from. On a firm's pages Copper steps aside and the firm's own color takes its place. The rest is paper colors and one blue-black ink.

### 4.2 The palette (light)

| Name | Hex | Role |
|---|---|---|
| **Cotton** | `#FBFAF6` | The page on CoFile's own site: a warm white like 100% cotton letter paper, not cream and not parchment |
| **Sheet** | `#FFFFFF` | Every sheet: the proof, the forms, cards, the letterhead. Firm logos always sit on this |
| **Plate Ink** | `#1D2130` | Text, the mark, dark bands. A blue-black like engraving ink. 15.3:1 on Cotton |
| **Copper** | `#A4512B` | CoFile's one accent: "Run a free rehearsal", links on CoFile pages, the leader lines. 5.3:1 on Cotton, so it passes for text and for white-on-copper buttons |
| **Graphite** | `#5E6170` | Secondary text, captions, the imprint. 5.9:1 on Cotton |
| **Verdigris** | `#2E6B57` | The patina of copper: "Live", "Completed", "Accepted by the state", "EIN issued". 6.3:1 with white |

**Supporting tones:**

| Name | Hex | Role |
|---|---|---|
| Cotton 2 | `#F3F0E8` | Quiet bands (the Proof and After sections), table header rows, the beta notice |
| Bond | `#F5F5F2` | The page under firm sheets when the firm has no color set |
| Rule | `#DDD7CB` | Hairlines and dividers. Decorative only, never the only edge of a control |
| Rule Strong | `#8A8578` | Field borders, checkbox borders, the outline button. 3.5:1 on Cotton, so it meets the 3:1 rule for controls |
| Copper Deep | `#8A4122` | Copper hover and pressed |
| Copper Tint | `#F4E6DD` | The highlight behind a leader-line target, selected rows on CoFile pages |
| Ochre | `#855A0C` text on `#F7EDD8` | "Waiting for approval", "Needs information" and other warn tones |
| Madder | `#9A2D2D` text on `#F8E6E3` | "Rejected by the state", "Failed", field errors |
| Signature Ink | `#26336A` | The stroke color of every signature drawn on the signature pad: an iron-gall blue-black, so a signature always looks like a pen did it, never like a brand color |
| Blind Light | `rgba(255,255,255,.9)` | The highlight edge of a blind impression |
| Blind Shadow | `rgba(29,33,48,.16)` | The shadow edge of a blind impression |

**Harbor & Pine CPA, the example firm.** The mockups need one convincing sample brand, and it has to look clearly like *theirs*, not ours. Main color **Pine** `#2F4A3C` (white text 9.9:1), Second color **Harbor** `#3D6A8A` (5.8:1 on white). Pine and Harbor never appear on CoFile's own chrome, only on Harbor & Pine's sheets.

### 4.3 The palette (dark): "Night stock"

Fine stationers sell black card printed in white ink, and dark mode is that card.

| Name | Hex |
|---|---|
| Night (page) | `#14161E` |
| Night 2 (quiet bands) | `#1A1D27` |
| Night Card (CoFile's own cards) | `#1F2230` |
| Ink (text) | `#ECE8DF` |
| Graphite | `#A9ABB5` |
| Copper | `#DE8D62`. Buttons are Copper fill with Night text (7.0:1) |
| Copper Deep (hover) | `#EAA27C` |
| Verdigris | `#6FB39A` |
| Ochre | `#E3B567` on `#2B2416` |
| Madder | `#E58B85` on `#2E1B1C` |
| Rule | `#323646` |
| Rule Strong | `#6E7180` |
| Blind Light | `rgba(255,255,255,.06)` |
| Blind Shadow | `rgba(0,0,0,.45)` |

**Firm sheets stay white in dark mode.** The proof, the intake form, a service page and the emails are documents, and a firm's logo and color were designed for white paper. In dark mode the page around the sheet goes to Night, the sheet stays `#FFFFFF`, and every color on the sheet stays as in light mode. The filing desk chrome goes dark with the logo on its little white plate (3.5). Illustrations swap to Cotton line work. Photographs stay as shot, with a 4% darkening.

### 4.4 How color is used

- **About 90% of any CoFile page is paper and Plate Ink.** Copper appears on the primary button, links, leader lines and the occasional thin rule, and that's all. On a typical screen there should be one copper object you'd click.
- **Copper never appears on a firm's sheet.** There the firm's Main color does Copper's job. CoFile shows up only as the Graphite imprint.
- **Verdigris means "done" or "live"** and nothing else. It's never decorative.
- **Status is never color alone.** Every chip has a word and a small glyph (section 11).
- **No red, white and blue together**, ever (3.7).
- **No gradients** except the one moving "raking light" highlight in the Rehearsals section (section 8). It's motion, not a fill.
- **Texture.** Cotton carries a scanned cotton-paper texture at 3% (multiply), tiled at 512px. Sheets have no texture: a client's details should sit on clean white. Night carries a scanned black card texture at 4% (screen). Both are switched off with `prefers-reduced-transparency` and on low-power devices.

---

## 5. Typography

### 5.1 The families

I picked these from one lineage on purpose. The Scotch roman and the early grotesques both came out of the Edinburgh typefoundries of the 1800s, and they were the faces American engravers and job printers set letterheads and price lists in for a hundred years. They belong together.

**1. Plate Roman** (commissioned): display, deck and text serif.
An engraver's Scotch roman, drawn for screens. It's for headlines, ledes, the sample firm names, the money totals on the proof, and long reading (Terms, Privacy). Brief for the foundry in 5.4.
*Interim until it's delivered:* **Miller Display** and **Miller Text** (Font Bureau, licensed through Type Network), with their italics.
*Fallback stack:* `"Plate Roman", "Miller Display", Georgia, "Times New Roman", serif`.

**2. Founders Grotesk** (Klim Type Foundry, licensed): the working sans.
For body text, everything in the interface, forms, tables, buttons and the proof's data. Use **Founders Grotesk Text** at 20px and below, and **Founders Grotesk** at 21px and above. Weights: Regular 400 and Medium 500 only. It's a plain, honest grotesque with open shapes that holds up for older eyes at 17–18px.
*Fallback stack:* `"Founders Grotesk Text", "Helvetica Neue", Arial, system-ui, sans-serif`.

**3. Founders Grotesk Mono** (Klim): code only.
It's used in the API docs, API keys, webhook payloads and the `"dryRun": true` snippet in the Enterprise section. **It's never used on the proof, a form or a client's details.** A client's business name isn't computer output.

**On the firm's pages,** the firm's chosen font (one of the presets, or their upload) replaces Plate Roman for the typeset firm name, the page's headings (h1, h2) and button labels. Body text, form fields, field labels and the proof's data stay in Founders Grotesk Text. Whatever a firm picks for its brand, a client checking their own address gets our most legible face. If the firm picks "Standard (the device's own)", headings use Plate Roman.

### 5.2 The scale

Base size is **18px on CoFile's own pages and 17px in the filing desk and dashboard**, on desktop and phone alike. The readers are 40 to 65, and so am I, and more.

| Token | Face | Desktop size / line | Phone size / line | Weight, tracking | Used for |
|---|---|---|---|---|---|
| `display-xl` | Plate Roman Display | 64 / 68 | 40 / 44 | 400, −0.5% | Hero headline only |
| `display-l` | Plate Roman Display | 48 / 54 | 32 / 38 | 400, −0.3% | Section headlines (h2) |
| `display-m` | Plate Roman Deck | 32 / 38 | 26 / 32 | 500, 0 | Page titles in the desk, auth card titles, the proof's h1 |
| `display-s` | Plate Roman Deck | 24 / 30 | 22 / 28 | 500, 0 | Step titles, h3, the proof's h2 |
| `lede` | Plate Roman Text | 21 / 33 | 19 / 30 | 400, 0 | Section ledes, the hero sub |
| `body` | Founders Grotesk Text | 18 / 29 | 17 / 27 | 400, 0 | Lists, paragraphs |
| `ui` | Founders Grotesk Text | 17 / 24 | 17 / 24 | 400, 0 | Desk text, table cells, the proof's values |
| `input` | Founders Grotesk Text | 18 / 24 | 18 / 24 | 400 | Text in fields (18px avoids iOS zoom and suits older eyes) |
| `label` | Founders Grotesk Text | 16 / 22 | 16 / 22 | 500, +0.2% | Field labels, table headers in the desk |
| `button` | Founders Grotesk | 18 / 24 | 18 / 24 | 500, +0.2% | All buttons except small |
| `button-s` | Founders Grotesk Text | 16 / 20 | 16 / 20 | 500 | Small buttons ("Same as", "Turn off") |
| `small` | Founders Grotesk Text | 15 / 23 | 15 / 23 | 400 | Captions, the beta note, footnotes. The floor for any running text |
| `kicker` | Founders Grotesk | 14 / 18 | 13 / 18 | 500, +8%, caps | Section kickers like "For CPA, payroll, fractional CFO and title firms" |
| `imprint` | Plate Roman Italic + wordmark | 13 / 16 | 13 / 16 | 400 | "with CoFile" only |
| `figure-l` | Plate Roman Deck, lining, tabular | 26 / 30 | 24 / 28 | 500 | "Total to the state $103.50", the EIN on a filing page, dashboard stats |
| `code` | Founders Grotesk Mono | 15 / 24 | 14 / 22 | 400 | Code |

Use CSS `clamp()` between the phone and desktop values, interpolated from 400px to 1280px viewport width. For example `display-xl` is `clamp(40px, 2.73vw + 29px, 64px)`.

### 5.3 Pairing and setting rules

- **Headlines are set like engraved letterhead**: Plate Roman Display, generous size, normal case, no bold. Hierarchy comes from size and space, not weight. Use `text-wrap: balance` and never break a headline before its last two words.
- **Ledes are in the serif** (Plate Roman Text). Ledes are the copy's voice ("Your client needs an LLC. Who do they call? You."), and they should read like a well-printed letter.
- **Everything you act on is in the sans.**
- **Figures**: lining tabular figures in tables and on the proof. Old-style proportional figures in serif running text. Money is always aligned on the decimal.
- **Leaders**: the proof's fees and the coverage footnote use **dot leaders**, as on a good invoice or price list. Use Founders Grotesk Text periods spaced at 0.4em, in Rule Strong.
- **Small caps** are only for the `kicker` and the table header row on CoFile's pages, using real caps from Founders at +8% tracking, never faux small caps. Spanish kickers run long, so a kicker may wrap to two lines and never goes under 13px.
- **The ampersand.** Firm names are full of them ("Harbor & Pine"), and an engraver loves an ampersand. Plate Roman ships with three (5.4). The sample firm's letterhead uses the italic one.
- **Underlined links**, always: 1px underline offset 3px, in the link color. Older readers look for the underline.
- **The engraved impression** (an effect, not a font): firm names and the hero headline can carry a 1px letterpress deboss (`text-shadow: 0 1px 0 rgba(255,255,255,.85), 0 -0.5px 0 rgba(29,33,48,.08)`). It's for 28px and above on light grounds only, and it's off in dark mode and in Windows High Contrast.

### 5.4 The type commission: Plate Roman

**Brief to the foundry.** An engraver's Scotch roman, in the lineage of the modern faces used for American engraved letterheads and price lists from 1840 to 1910. It shouldn't revive any one historical face. The family:

- **Display** (optical size 40–96px): contrast 1:6, sharp bracketed hairline serifs, vertical stress, small ball terminals on a, c, f, r. Capitals slightly wide, in the engraver's proportion. At 64px no hairline may be thinner than 2px on a 1× screen.
- **Deck** (20–40px): contrast 1:4, sturdier hairlines, a slightly larger x-height (0.70 of cap height).
- **Text** (14–20px): contrast 1:2.6, x-height 0.72, open apertures, generous spacing, for long reading on screen by people over 60.
- **Styles**: Regular 400 and Medium 500 in each size, plus Italic 400 in Display and Text. The Italic is an engraver's italic with a fluid, slightly connected rhythm, not a script.
- **Features**: lining and old-style figures, tabular and proportional; true small caps; case-sensitive forms; `ss01` with three ampersands (a roman, an italic and an engraver's flourished one for display use); `ss02` the lozenge i-dot (logotype only); fractions; the currency and arithmetic set; arrows ← → ↓ ↳ drawn to match.
- **Language**: full Latin Extended-A. Spanish has to be perfect: á é í ó ú ü ñ ¿ ¡ and accented capitals that clear the line above at a 1.06 line height. Vietnamese is a stretch goal.
- **Hinting** for Windows at text sizes, and variable font files (wght and opsz axes) as well as static instances.
- **Logotype**: the CoFile wordmark and the "Co" for the Name Plate are drawn as part of the commission (3.2, 3.3).
- **Timeline**: about 6 months. The interim Miller faces carry launch.
