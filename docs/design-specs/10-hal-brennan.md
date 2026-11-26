# Plate & Proof

**A visual design spec for cofile.app**
Harold "Hal" Brennan, engraver and document designer, Philadelphia
Written against BRIEF.md, version 3 (Nov 26, 2026), and the round 3 copy: the home page (`web/app/page.tsx`), its seven example pictures (`web/components/landing/Visuals.tsx`) and the seven pages behind it. The copy is locked, and every headline, line, price and label below is quoted from it. Where a design needs a word that doesn't exist yet, I've marked it `[copy needed]`.

---

## 1. Who I am, and what I bring

I've cut letters into copper and steel for thirty-five years. I started at a security printer on the Delaware, engraving portraits and borders for stock certificates and bond coupons. Then I moved to the side of the trade I loved more: letterheads, wedding suites, diplomas, the calling cards of men and women who wanted their name to look as solid as their work. These days I consult for firms on their stationery. Mostly that means telling a managing partner his letterhead is crowded, and drawing him one that isn't.

Here's what I bring. I know what makes a person proud to hand over a piece of paper with their name on it. I know how a proof works: the printer sets your name, pulls one sheet and hands it over, and nothing runs until you initial it. That ritual is already in CoFile's copy ("You've approved a proof before: business cards, letterhead, an invitation at the printer"), so I don't have to borrow a metaphor. The copy has wandered into my shop.

I also know one temptation better than anybody on this job: making paper look *official*. Guilloche borders, rosettes, eagles, seals, microprinted frames, Treasury greens. I drew those things for a living. None of them goes on this website. CoFile isn't a government agency, and a firm owner should never feel the site is pretending to be one. I'm leaving my rose engine at home. My ornament on this job is the ornament of a good stationer: fine rules, a well-set name, a clean margin, a blind impression and a small maker's imprint at the foot of the sheet.

---

## 2. The visual concept: Plate & Proof

### The one idea

**CoFile is the firm's stationer.**

A fine stationer does four things. They engrave the firm's name on a plate once, and from then on every sheet, card and envelope the firm sends carries that name, beautifully. When something new is ordered they pull a **proof**, and the person whose name is on it initials it before anything runs. They hand over a plain price card. And the stationer's own name appears only as a tiny **imprint** at the foot of the sheet or a blind stamp on the envelope flap: small type, on purpose.

That's the selling story of this copy, nearly line for line:

| The copy says | The stationer's shop shows it as |
|---|---|
| "Your client needs an LLC. Say yes, under your own name." | The firm's own **filing desk**, with its name engraved at the head like a ledger with the firm's name on the cover. The work comes in, and the firm says yes. |
| "Your name on the door. Ours in small type." | The firm's name on a brass plate by the door and at the head of every page its client sees. CoFile is the maker's imprint at the foot, "with CoFile", in 13px type. |
| "Your client sends a text. Nobody retypes it." | The customer's note scribbled on the back of an envelope turns into a typeset job ticket. The shop does the setting. |
| "Nothing is filed or paid until you approve the proof." | **The proof**: one sheet on the firm's letterhead, every detail and fee set clearly, and one button where your initials would go. In my shop the person who approves the proof is the person whose name is on it. Here it's the same. |
| "Then it's filed, and the papers come back to you." | The finished order comes home: an envelope addressed to the firm, the papers inside. |
| "The filings your clients already ask you for." | The shop's sample cards, one card per place, each with what it can print. |
| "In beta: rehearse a filing, free." | **The blind impression.** The full plate is pressed into the paper, every letter there, with no ink. It's the most luxurious finish in stationery, and here it's free. |
| "$45 a filing. EIN included with a formation." | The stationer's price card: plain figures, set well, with nothing hidden in the small type. |
| "Built and run by filing professionals. When a filing needs a person, one of them takes over." | A shop with people at the bench. You can see their hands in the pictures. |

### What the visitor should feel

A firm owner, 58, runs a twelve-person CPA practice and has had the same letterhead since 2004. Within ten seconds on the site she should feel:

1. **"That's my name, and it looks good."** On every surface we show, the firm's name is the most beautiful thing on the page. The first thing her eye lands on in the hero is "Harbor & Pine CPA" at the head of its own filing desk, set like engraved letterhead, not the CoFile logo.
2. **"I can say yes, and my clients will see me."** The client's pages carry her logo, her color and her name, and CoFile is a whisper at the foot.
3. **"I'm in charge, and it's easy."** The proof looks like something from a good printer: calm, white, generous, legible, with one clear button that's hers to press.
4. **"I know what it costs, and I can try it free."** The prices are set as plainly as a price card. Nothing on the page looks technical, legal or governmental. It looks like paper and ink and a person's name.

### The signature device: the Name Plate

CoFile's mark is a **name plate**: the small brass plate with two screws that goes beside an office door. Ours is **blank except for "Co"**. Across the site it keeps the same promise. We make the plate and you put your name on it.

- **On the home page, section 2** ("Your name on the door. Ours in small type."): two real doors, two real hand-engraved brass plates, "Harbor & Pine CPA" and "Northgate Payroll". Below each is the same client page in that firm's own brand. This is the site's most memorable moment (section 8).
- **At signup**, as the firm types into the existing "Firm name" field, its name appears engraved on the plate.
- **At the close** ("Run one rehearsal. Then decide."), the plate hangs on its door **blank**, waiting for the visitor's name.
- **On every page a client sees**, the plate disappears. Only the firm's letterhead shows, with the small "with CoFile" imprint at the foot.

### Four rules I'd hand to every person on the build

1. **The firm's name is always the best-set thing on the page.** If CoFile's name ever outranks the firm's on a firm surface, the page is wrong.
2. **Paper, not plastic.** Surfaces are paper colors, edges are crisp, shadows are the shadows a sheet makes on a desk. No glassmorphism, no gradients, no glow.
3. **Ceremony without officialdom.** Fine rules, generous margins and good type give dignity. Seals, rosettes, guilloche, eagles, ribbons, wax, foil stamps, certificate frames, parchment and blackletter are banned (full list in section 3.7).
4. **Ink where the action is.** Everything is quiet ink on paper except the one thing to do next. On CoFile's pages that's the copper "Run a free rehearsal". On a firm's pages it's the button in the firm's own color.

### Where safety sits

On the home page, security is the one small line at the foot of the price card, with its link, set exactly like the "State fees separate" line above it. The Security page and the "Checks before every filing." section on How it works get honest, well-set typography: plain paragraphs, good rules, easy to find from the footer. They get no padlocks, shields, vault doors, seals or check-mark motifs, and the brand, the motion and the hero aren't built on them. The pride of the trade is in the name and the proof. The care shows in how well everything is set.

---

## 3. Identity

### 3.1 The pieces

| Piece | What it is | Where it's used |
|---|---|---|
| **The Name Plate** (mark) | A chamfered brass name plate with two level screws and "Co" engraved in the middle | Favicon, app icon, header lockup, social avatar, the close, the 404 |
| **The wordmark** | "CoFile" in a custom-drawn engraver's roman | Header lockup, footer, emails from CoFile, the docs |
| **The imprint** | "with CoFile", set small, on a hairline | The foot of every firm surface: proof, intake form, service page, client emails, filing desk header |
| **The headline lockup** | Name Plate above the hero headline, "Your client needs an LLC. Say yes, under your own name." | The social card (1200 × 630), which uses the page's own title |

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

### 3.4 The imprint: "with CoFile", ours in small type

This is the most important piece of the identity. It's how CoFile appears on every page a client sees and on the proof the firm approves, and it's the visual proof of "Ours in small type".

In my trade the imprint is the line in the bottom margin of a sheet that says who made it. It's small and well-set, and you only notice it if you look.

```
                     ────────────
                     with CoFile
```

- "with" in **Plate Roman Italic 400**, then one word space, then the **wordmark** (no plate).
- **13px** on screen (cap height about 9px). Never smaller, because it has to be readable, and never larger than 14px on a firm surface.
- **Graphite** `#5E6170` on white, `#A9ABB5` on dark. It's never in the firm's color and never in Copper.
- **On sheets** (the proof, the intake form, client link pages, the decision page, emails): centred at the foot, 24px below the last content. Above it sits a centred hairline 40px long, 1px, Rule `#DDD7CB`, with 12px of space between the hairline and the text.
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
5. **Alignment.** **Centred** on the proof, the decision page and emails, which are the ceremonial pieces. **Left-aligned** on the intake form, the service page, the client link page and the filing desk, which are the working pieces. The firm doesn't have to choose. The page decides.

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
- Any reproduction of a state's or the IRS's header, logo, letterhead or document. In marketing mockups, the "state's own review page" is redrawn as neutral field rows with no header. Real IRS or state documents are never photographed legibly. Where the copy names a document ("Certificate of Formation", "EIN letter (CP 575)"), it's shown as CoFile's own **document card**, a typeset label on a plain sheet (section 9.5), never as the state's certificate or the IRS's letter. In photographs, those papers are edge-on or face-down.

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

**The two example firms.** The copy names two sample firms, and each needs a convincing brand that's clearly *theirs*, not ours. Their colors never appear on CoFile's own chrome, only on their own sheets. I'd commission both identities from a small identity studio, kept modest and believable, like real firms' letterheads (section 13).

| Firm | Main color | Second color | Font (from the existing presets) | Logo |
|---|---|---|---|---|
| **Harbor & Pine CPA** (traditional) | **Pine** `#2F4A3C`, white text 9.9:1 | **Harbor** `#3D6A8A`, 5.8:1 on white, so links use it | "Lora (serif)" | An "H&P" monogram with an italic ampersand, beside the name set in a classic serif, "CPA" letterspaced small. No circle, no frame |
| **Northgate Payroll** (modern) | **Northgate Teal** `#0F6E73`, white text 6.0:1 | **Amber** `#C07A12`, only 3.5:1 on white | "Montserrat" | A gate mark (two uprights and a lintel, read as an N) and a wordmark in a geometric sans |

Northgate's amber is in there on purpose. It shows the ink match (3.6) doing its quiet job: at 3.5:1 the amber is too light for link text, so on Northgate's pages links use its teal and the amber goes into the thin line of the Firm Rule and the highlights. The firm still sees its two colors. Nothing is ugly, and nothing is illegible.

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
An engraver's Scotch roman, drawn for screens. It's for headlines, ledes, the sample firm names, the prices, the money totals on the proof, and long reading (Terms, Privacy). Brief for the foundry in 5.4.
*Interim until it's delivered:* **Miller Display** and **Miller Text** (Font Bureau, licensed through Type Network), with their italics.
*Fallback stack:* `"Plate Roman", "Miller Display", Georgia, "Times New Roman", serif`.

**2. Founders Grotesk** (Klim Type Foundry, licensed): the working sans.
For body text, everything in the interface, forms, tables, buttons and the proof's data. Use **Founders Grotesk Text** at 20px and below, and **Founders Grotesk** at 21px and above. Weights: Regular 400 and Medium 500 only. It's a plain, honest grotesque with open shapes that holds up for older eyes at 17–18px.
*Fallback stack:* `"Founders Grotesk Text", "Helvetica Neue", Arial, system-ui, sans-serif`.

**3. Founders Grotesk Mono** (Klim): code only.
It's used in the API docs, API keys, webhook payloads and the `"dryRun": true` snippet on the For platforms page. **It's never used on the proof, a form or a client's details.** A client's business name isn't computer output.

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
| `price-xl` | Plate Roman Display, lining | 112 / 104 | 72 / 68 | 400, −1% | The "$45" in "$45 a filing. EIN included with a formation." (a size change inside the headline, not a new word) |
| `price-l` | Plate Roman Display, lining | 56 / 60 | 44 / 48 | 400 | The price card's figures ("$25", "$15", "Plans from $250") and the plan prices on the Pricing page |
| `figure-l` | Plate Roman Deck, lining, tabular | 26 / 30 | 24 / 28 | 500 | "Total to the state $103.50", the EIN on a filing page, dashboard stats |
| `code` | Founders Grotesk Mono | 15 / 24 | 14 / 22 | 400 | Code |

Use CSS `clamp()` between the phone and desktop values, interpolated from 400px to 1280px viewport width. For example `display-xl` is `clamp(40px, 2.73vw + 29px, 64px)`.

### 5.3 Pairing and setting rules

- **Headlines are set like engraved letterhead**: Plate Roman Display, generous size, normal case, no bold. Hierarchy comes from size and space, not weight. Use `text-wrap: balance` and never break a headline before its last two words.
- **Ledes are in the serif** (Plate Roman Text). Ledes are the copy's voice ("Your client needs an LLC. Who do they call? You."), and they should read like a well-printed letter.
- **Everything you act on is in the sans.**
- **Figures**: lining tabular figures in tables and on the proof. Old-style proportional figures in serif running text. Money is always aligned on the decimal.
- **Leaders**: the proof's fees, the home page's price card and the Pricing page's "What counts as a filing." list use **dot leaders**, as on a good invoice or price list. Use Founders Grotesk Text periods spaced at 0.4em, in Rule Strong.
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

---

## 6. Layout

### 6.1 The grid

| Breakpoint | Width | Columns | Outer margin | Gutter | Content max |
|---|---|---|---|---|---|
| Phone | up to 599px | 4 | 20px | 16px | 100% |
| Tablet | 600–1023px | 8 | 40px | 24px | 100% |
| Laptop | 1024–1279px | 12 | 48px | 24px | 100% |
| Desktop | 1280px and up | 12 | 64px | 24px | **1152px** (12 × 74 + 11 × 24) |

Over 1600px the content stays at 1152px and the margins grow. Paper doesn't stretch.

**Reading measures:** ledes and body paragraphs max **34em** (about 64 characters). Long reading (Terms, Privacy, docs) max **68ch**. Forms max **640px**. Sheets (proof, intake form) max **760px**, the width of a letter-size sheet with comfortable margins at 96dpi.

### 6.2 Spacing

Built on 8px with one half-step: **4, 8, 12, 16, 24, 32, 48, 64, 96, 128, 160**.

- **Sections breathe like a letterhead: less above, more below.** A good sheet has a smaller head margin than foot margin, and so does a good section. Showpiece sections get **128px above and 160px below** on desktop, **64 / 80** on phone. Support sections ("Checks before every filing." on How it works, the Security page's panels, "What's separate." on Pricing) get **96 / 112** and **56 / 64**, tighter and plainer on purpose.
- Headline to lede: 24px. Lede to content: 48px (32 on phone). List items: 20px apart. Between an h2 and an anchored figure: 64px.
- I don't lock web text to a baseline grid. I lock the spaces between things, and those never vary from the scale.

### 6.3 Surfaces and edges

- **Sheets** are `#FFFFFF`, square-cut with a 2px radius (only enough to anti-alias the corner), and have the **sheet shadow**: `0 1px 1px rgba(29,33,48,.05), 0 10px 28px -10px rgba(29,33,48,.20)`. It's the shadow a sheet of 24lb paper throws on a desk under a window, close and soft.
- **Lifted sheets** (hover on a clickable card, the hero desk): `0 2px 2px rgba(29,33,48,.06), 0 22px 44px -14px rgba(29,33,48,.24)` with translateY(−2px).
- **Cards inside sheets** have no shadow, only a 1px Rule border. Paper on paper doesn't throw shadows you can see.
- **The chamfer.** Buttons, chips, the logo plate in dark mode and the Name Plate share a 45° corner. Build it with `border-radius: 6px; corner-shape: bevel;` and fall back to a 3px round radius where `corner-shape` isn't supported. Only these elements get it. Sheets and cards stay square.

### 6.4 How a page breathes

**Desktop.** A CoFile page is a sequence of horizontal bands across Cotton. Each band has one idea: a headline, its line or two, and one picture. The home page has about 330 words, so the pictures carry it. In most sections the text takes **4 columns** and the picture **7**, with one empty column between them as a margin. A picture is always bigger than the words beside it, the way a good catalogue page gives the sample more room than the description. The side the picture sits on alternates down the page (right, left, right) so the eye zigzags the way it does through a stationer's sample book. Three sections break the pattern on purpose: Coverage and Pricing run full width, and the close is a full-bleed photograph. There's a lot of air around the sheets; nobody crowds a letterhead. Only one thing is sticky, the header, which compacts from 76px to 60px after 120px of scroll. Nothing hijacks the scroll wheel: the pictures that move play on their own once they're in view.

**Phone.** Everything goes to one column in the copy's order. Sheets go **edge to edge**. On a phone the sheet *is* the screen, so the proof and the forms lose their side margins and shadow and keep the letterhead at the top. Sections keep their full spacing. After the hero leaves the screen, a **sticky bottom bar** with "Run a free rehearsal" appears: 64px tall with the button inside, Cotton background, hairline top. It slides away while the close section is on screen, so two copies of the button are never visible at once.

**Firm pages** use a single centred sheet of 760px on desktop. A client opening their form, or a firm opening its proof, should feel they've been handed one sheet of paper.

**The filing desk and the dashboard** are working rooms rather than showrooms. They use the full 1152px grid, a 17px base and tighter vertical spacing (32 / 48 between blocks).

---

## 7. Art direction

### 7.1 The look of the pictures

Everything we show should look **made by hand, lit by daylight, and owned by a real firm**. Three kinds of picture, each with a job:

1. **Photographs** for the human moments: the door, the client, the papers coming home.
2. **Engraved vignettes** for explaining and for empty states: line engravings in the steel-engraving tradition, but of **contemporary** things like phones, laptops, a bakery counter and a text message. An engraving of a smartphone is a little bit funny and very memorable, and it puts the craft of my trade in service of a modern job.
3. **Live product**: the proof, the desk, the forms, rendered in HTML, not as screenshots. They're the real thing, and the most persuasive picture we have.

**Never:** stock photos of handshakes, people pointing at laptops, smiling headsets, abstract blue networks, isometric illustrations, 3D blobs, emoji, AI-generated people, flags, government buildings or anything in 3.7.

### 7.2 Photography: the commission

**Photographer:** an interiors and still-life photographer who also does honest portraiture. They should work in natural north light, shoot medium-format digital (100MP), and their book should show real small businesses rather than staged offices. One photographer for everything, so the light is consistent. **Retoucher:** a print-trained retoucher. Nothing is "enhanced" beyond what a darkroom could do.

**Casting:** real people over models, with releases. A real CPA in her fifties or sixties for the firm owner, photographed in her own office. Two real sisters who bake, in their thirties or forties, for Ana and Lucia Ortiz. Two or three of CoFile's real filing professionals, at their real desks, for "Built and run by filing professionals". Every example picture keeps a small label saying it's an example, as the stand-ins' captions do.

**Shot list:**

| # | Shot | Use | Notes |
|---|---|---|---|
| P1 | **Harbor & Pine's door.** A painted wooden office door, deep green-black, in a brick rowhouse office on a quiet street (no house numbers, no shop signs). Mounted beside it is a **real brass name plate, hand-engraved "Harbor & Pine CPA"** (from the engraver, 13.3). Late-afternoon raking sun from the left so the engraving reads in light and shadow. Three frames: wide (door and step), medium (plate and doorframe), macro (the engraved letters filling the frame). | Home section 2, left door; For firms | Tripod lock-off. Shoot the plate straight on, lens axis perpendicular, to make compositing simple. Bracket for HDR. Shoot a 360° HDRI from the plate's position for the WebGL reflections. |
| P2 | **Northgate Payroll's door.** A different building and a different temperament: a glazed aluminium-framed door in a converted mill or a small modern office park, mid-morning daylight. Mounted beside it is a **brushed-steel plate of the same shape, engraved "Northgate Payroll"** in a geometric sans, filled with black. The same lens, height and framing as P1's medium frame so the two sit side by side as a pair. | Home section 2, right door | The two doors must feel like two real firms that have never met. |
| P3 | **The blank plate.** P1's lock-off and light, with a **blank** brass plate of the same size (two screws, slots level, the bevel catching the light). | The close; the signup preview; the base plate for rendering any firm name live | Same session, same 20 minutes of sun as P1. |
| P4 | **The blank plate at dusk.** P3's medium frame, 30 minutes after sunset, with warm light from the transom above the door and the blank plate catching the street light. | The close in dark mode; the social card | |
| P5 | **The client asks.** Early morning in a small bakery: flour on a steel counter, a tray just out of the oven. Ana, apron on, types a text with one thumb, the other hand still floury. Her sister works in soft focus behind. She's mid-thought, practical, a little rushed: a business owner handing a job to someone she trusts. | Home section 3 (phone); How it works, "Your client asks." | Shoot the phone screen dark with tracking dots. Ana's message is composited in post, set in our bubble style (section 11), never a messaging app's own look. The phone is unbranded. |
| P6 | **The firm approves.** Our CPA at her own desk in her own office: framed photos, a plant, binders, a window, reading glasses on. The laptop shows the proof (composited) and her hand rests near the trackpad. She looks like someone checking a thing she cares about. | How it works, "You approve it."; For firms; signup | Shoot in her real office, rearranging nothing but the light. |
| P7 | **The papers come home.** A top-down still life on a walnut desk: a heavy white envelope (not kraft, not manila) with "Harbor & Pine CPA" set as the address, opened, sheets fanned **edge-on or face-down** (no state or IRS letterhead is ever legible), a fountain pen, reading glasses, a coffee cup on a coaster. | The documents email; the social card for How it works | **Shoot a second plate** from the same locked-off camera with the envelope and papers removed and only the props at the edges (pen, glasses, cup), the centre clear. That clean desk is the tabletop for home section 5, where the envelope and documents are live HTML. |
| P8 | **The proof at the printer.** A printer's make-ready table: a business-card proof and a letterhead proof on cotton stock, initialled in pencil in the margin, a loupe beside them. | How it works, beside the lede's "at the printer" | Shoot at a real engraving or letterpress shop. |
| P9 | **People at the bench.** Two or three of CoFile's filing professionals at their desks, each photographed the same way: from the side, at work, three-quarter light, one hand on the keyboard, a state's form open on screen (screen composited with neutral blind rows, no state marks). Not looking at camera, not smiling for it. | How it works, step 3; Pricing (the "takes over" line); the Questions page, "Is a person involved?" | Real staff only, or this shot is dropped. Nobody stands in for a filing professional. |
| P10 | **Paper.** Flat reprographic scans at 1200dpi: 100% cotton letter paper (felt side), 600gsm cotton card, black card, and a **real blind-embossed sample** of the Name Plate and of one row of the rehearsal log on cotton card, lit at a low raking angle from four directions. | Textures; the 404; the reference for the CSS blind impression | Scanned by a reprographic studio, not a flatbed. |

**Grading:** neutral, a touch warm in the highlights (Cotton white point), true blacks in the ink. No teal-orange, no haze, no grain filters. Skin as it is.

### 7.3 Engraved vignettes: the commission

**Artist:** a line engraver or illustrator who works in the steel-engraving manner: swelling burin lines, parallel hatching, cross-hatching for shadow and stipple for skin. Ideally they cut the masters on copper by hand. If not, they draw at 4× with a pressure-sensitive line that truly swells, and no "engraving filter" anywhere. Masters are scanned at 2400dpi and vectorized by hand.

**Style rules:** one ink (Plate Ink on light, Cotton on dark). Contemporary objects, real proportions, no caricature. A tight vignette shape that fades out in hatching, never boxed in a frame. No allegory, no eagles, no ornamental borders. Line weight is 0.6 to 2.4px at 1×, and nothing finer than 0.6px or it disappears for older eyes.

**The set:**

| # | Subject | Used in |
|---|---|---|
| V1 | A phone on a bakery counter, a speech bubble rising from it, a rolling pin and a scatter of flour beside it | How it works, step 1 "Your client asks."; the client link email |
| V2 | A hand with a pen resting beside a laptop that shows a letterhead and one button; reading glasses folded on the desk | How it works, step 2 "You approve it." |
| V3 | A browser window seen slightly from the side, its form fields being filled line by line (just fields and a cursor, no seal or state header) | How it works, step 3 "CoFile files it."; the rehearsal email |
| V4 | Two hands on a keyboard, shirt cuffs rolled: a person taking over | Beside "Built and run by filing professionals…" on Pricing and the Questions page, where P9 isn't available |
| V5 | A returned envelope, flap open, papers rising out of it | The documents-back email; a filing's Documents card; home section 5 on phone |
| V6 | A clear desk: blotter, closed laptop, a pen at rest, a cup | Empty states ("Your desk is clear.") |
| V7 | The blank Name Plate, engraved at large size, with full bevel and slotted screws | The 404; the signed-out page |
| V8 | A door with a name plate, seen from the step | Signup and log-in side panels; the invitation email |
| V9 | A small slip tipped in at an angle, like an errata slip | Pricing, "What's separate." |
| V10 | A stack of four cards, slightly fanned, the top one blank | What we file, header; the new-filing state picker |

Deliver as optimized SVG (each under 80KB), with a Cotton-line dark variant and a 2× PNG fallback for email.

### 7.4 3D and real-time

Only three pieces, all of them physical things rather than abstractions:

1. **The plate under the print** (For platforms page). A photoreal render: a printed white-label proof sheet floating 40mm above a polished **copper plate**, which carries the same layout engraved in **mirror image**, as a real plate does. Soft studio light and a dark seamless ground. It runs as a 6-second loop: the sheet lowers onto the plate, a soft press, and it lifts. It's "Put CoFile underneath it" shown in the trade's own terms. The sheet's brand is a neutral placeholder platform name `[copy needed: sample platform name]`, never a real company. Render at 2400 × 1600, H.264 and AV1 under 1.4MB, with a poster frame. **Studio:** a product-visualization 3D house with strong materials work (metal and paper).
2. **The brass name in real time** (signup; the For firms close). A WebGL material that engraves *any* text into the blank brass plate from P3. The text is converted to a signed-distance field, then a height map with a V-groove profile (the shape a burin leaves), then a normal map, lit with the HDRI shot at the door. It's composited onto P3 in exact registration, and the raking light can be moved. **Studio:** a creative-technology studio with WebGL and type-rendering experience. Fallback: an SVG filter version (`feSpecularLighting` over the text's alpha), then a static frame from P1.
3. **The raking light** (home section 7, the rehearsal log). A lighting pass rather than a model: a normal map is baked from the blind-embossed log rows (scanned in P10), and a soft light moves across it in WebGL. Fallback: the CSS blind impression with a moving gradient mask.

### 7.5 Product imagery

- The desk, the client pages, the proof, the drafted filing, the record, the tiles and the emails are shown as **live HTML components with sample data**, using exactly the sample copy in `Visuals.tsx`: "Harbor & Pine CPA", "Northgate Payroll", "Two Sisters Bakery LLC", "Hudson Ledger LLC", "Orchard Lane Inc.", "Ana Ortiz". No screenshots, so they stay sharp, translatable and true to the product.
- **Every example picture keeps its example label** ("Example · test details · not a real firm", "Sample proof · test details · not a real business" and so on) as a 13px Graphite caption under the picture, set like a plate caption in a book.
- **Devices** are drawn, not photographed, except in P5 and P6. A phone is a plain slab (radius 44px, 10px Plate Ink bezel, no notch, no buttons, no brand). A laptop is a thin lid line and a hinge. The device frame is understated so the firm's letterhead inside it carries the picture.
- **The state's website** is never shown as a screenshot in marketing. It's drawn as neutral blind-embossed field rows with no header. The sample proof's "New Jersey's own review page, filled in" is two plain rows ("Business Name / TWO SISTERS BAKERY", "Designator / LLC") inside a neutral grey screen frame. The "New Jersey payment screen" strip is drawn the same way.
- **Alt text**: the stand-ins' figure labels carry over ("An example firm's filing desk", "The same client page under two example firms", "A client's text drafted into a New Jersey LLC formation", "A sample proof for an example business", "A filed record with the state's document and the IRS letter", "Example rehearsal log"). Every picture I've added (the doors as photographs, the close, the price card, the vignettes) is `[copy needed]`.

### 7.6 Texture and ornament

- **The blind impression** is the site's signature finish. It's an uninked emboss, drawn in CSS as `box-shadow: inset 0 1px 1.5px var(--blind-shadow), inset 0 -1px 0 var(--blind-light)` on containers, and the letterpress text-shadow on type. It's used for **rehearsal** things (the chip, the rehearsal log, the "Planned" plate glyphs) and for the 404 plate. The text inside a blind element is always inked in Graphite or Ink, so it's always readable. The emboss is decoration around legible text, never the text itself.
- **Rules.** Hairlines in Rule (1px). The **thick-and-thin** (3px + 2px gap + 1px) is the Firm Rule on firm sheets, and in Plate Ink it's the top of CoFile's footer. Nowhere else.
- **The lozenge** ◆ (a 7px square turned 45°, in Copper) is the bullet for every list on CoFile's pages. It replaces the green ticks, so a list reads as a list rather than a checklist. On firm pages the lozenge takes the firm's Main color.
- **Dot leaders** on fees and price-list-style rows.
- **Nothing else.** No flourishes, no corner ornaments, no borders around pages.

---

## 8. Motion

### 8.1 How things move here

Print doesn't slide or bounce. It arrives in two beats: the **impression** (the plate meets the paper and the shape is pressed in) and then the **ink** (the color is there). Everything that moves on this site moves in those two beats, quickly and once.

**Rules:**

1. **Words never wait.** Headlines, lines, prices and buttons are on the page the moment it paints. Only pictures move.
2. **Once per visit.** A picture plays the first time it's 40% in view and then rests. Each moving picture has a small replay control in its caption row (a 24px circular-arrow icon, `aria-label` `[copy needed]`).
3. **Nothing scrolls the page for you.** No pinning, no scroll-jacking, no parallax. Older readers lose their place when a page moves under their thumb.
4. **Nothing loops** except the 6-second plate loop on For platforms, which pauses when off screen and after three cycles.
5. **Prices never move.** A price that animates looks like it's negotiable.
6. **Reduced motion** (`prefers-reduced-motion: reduce`) shows every picture in its final state, with the raking light parked at its resting angle. Nothing is lost but the timing.

**Tokens:**

| Token | Value | Use |
|---|---|---|
| `ease-press` | `cubic-bezier(.3, 0, .2, 1)` | Impressions, button presses |
| `ease-settle` | `cubic-bezier(.2, .8, .2, 1)` | Ink, things settling into place |
| `ease-sweep` | `cubic-bezier(.45, 0, .25, 1)` | Raking light, rules drawing |
| `t-quick` | 120ms | Hover color changes |
| `t-press` | 180ms | The impression beat; button press |
| `t-ink` | 260ms | The ink beat |
| `t-set` | 320ms | A line or row setting into place |
| `t-draw` | 600ms | A rule or leader line drawing |
| `t-sweep` | 2400ms | The raking light |
| `stagger` | 70–120ms | Between rows |

**The two-beat recipe** (`press-in`) used everywhere: the element starts at opacity 0 with the blind impression only (the inset shadow at full and the content at 0). Over `t-press` the impression comes up. Then over `t-ink` with `ease-settle` the content's opacity goes 0 → 1 and it rises 2px into place.

### 8.2 The moments that move, and why each one sells

| # | Where | What moves | Duration | What it sells |
|---|---|---|---|---|
| M1 | Hero, the desk | The Firm Rule draws, Harbor & Pine's name inks in, the four rows set, and the proof behind slides out a little | 2.2s | "Under your own name": the first thing that happens on the site is a firm's name being set |
| M2 | Section 2, the two doors | Light rakes across two engraved plates, each name lifts into its client page, the pages ink in, and "with CoFile" appears last and small. Then the visitor can wipe one page into the other firm's brand | 4.2s + interaction | "Your name on the door. Ours in small type." **The signature moment** |
| M3 | Section 3, the text | Phrases in Ana's message underline and run along leader lines into the drafted filing; the saved answers ink in | 3.4s | "Nobody retypes it" |
| M4 | Section 4, the proof | The proof is laid down, the fee leaders draw, the total sets, and the button presses in last | 2.0s | One page, one button, yours to press |
| M5 | Section 5, after | Three stages ink along a rule, then two documents rise out of the envelope | 2.4s | "The papers come back to you" |
| M6 | Section 6, coverage | Four place cards are dealt onto the table | 0.7s | Plain, ready, real |
| M7 | Section 7, rehearsal | A raking light crosses the blind-embossed log, revealing every row | 2.4s | "Rehearse a filing, free": the full impression, no ink |
| M8 | The close | A slow push-in on the blank plate | 8s, once | Your name could go here |
| M9 | Signup | Each letter of the firm's name is cut into the brass as it's typed | 90ms a letter | It's already yours |
| M10 | Everywhere | Buttons press like a key into paper | 80 / 160ms | Pressing something should feel made |

### 8.3 M2 in detail: "Two doors, one page"

This is the moment people should describe to a colleague afterwards.

**Desktop (≥ 1024px), autoplays once when the diptych is 50% in view:**

| Time | Left (Harbor & Pine CPA) | Right (Northgate Payroll) |
|---|---|---|
| 0.0s | Door photo P1 at rest, plate in soft light. Below it, the client page sheet is blank white (only its outline and shadow) | Same with P2 |
| 0.0–1.2s | **Raking light**: a highlight crosses the engraved letters left to right (WebGL light on the plate's normal map, or a 1.2s graded video clip shot with a moving reflector on set). `ease-sweep` | Starts 300ms after the left |
| 1.0–1.8s | **The name lifts**: a copy of the engraved name, now as ink in the firm's own font and Pine, rises off the plate (opacity 0 → 1, translateY 0 → the letterhead position, about 180px, `ease-settle`, 800ms). It lands at the head of the sheet as the logo and name, and the Firm Rule draws under it (`t-draw`) | The same in Montserrat and Northgate Teal, with the amber thin line |
| 1.8–3.2s | The page sets: "Start your New Jersey LLC" (`press-in`), the "Business name" field, the "Who owns it" field (stagger 120ms), and the "Continue" button in Pine | The same in Northgate's brand. The fields sit on exactly the same pixels in both pages |
| 3.4–4.2s | **"with CoFile"** fades in at the foot of both pages *at the same moment*, 13px Graphite, a plain 400ms fade with no movement | — |

The caption "Two example firms · same page, each in its own brand" sits under the diptych from the start.

**The wipe (after it plays).** Between the two pages there's a thin vertical brass-colored edge with a 32px handle, shaped like the end of a name plate with one screw (`aria-label` `[copy needed]`). Drag it, or press the arrow keys when it's focused, and it moves across the left page. Behind it, the page re-inks into the other firm's brand: logo, font, Firm Rule, button color and page tint change, and **nothing else moves a pixel**. Fields, labels, spacing and "with CoFile" stay exactly where they were. Release, and it springs back with `ease-settle` over 400ms. It's a demonstration of the whole system in one gesture: the structure is CoFile's, the brand is the firm's, and the imprint never changes.

**Phone:** one door and one page at a time, as a horizontal snap carousel of two cards (Harbor & Pine, then Northgate Payroll), with page dots below the caption. On first view it plays the left half of the sequence (light, lift, ink, imprint) in 3.2s, then after 1.2s slides itself to the second firm once (600ms) so the visitor sees there are two. After that it's under the thumb.

**Reduced motion:** both doors, both finished pages, the imprint present, no wipe handle animation (the handle still works by keyboard and drag).

### 8.4 The rest, in detail

**M1, the desk (hero).** On first paint the desk sheet is already there with its frame and shadow, so the layout never jumps. Then: the 3px Firm Rule in Pine draws left to right (`t-draw`), with the 1px Harbor line 120ms behind it. The "H&P" logo and "Harbor & Pine CPA" ink in behind a left-to-right mask, like a burin pass (700ms, `ease-sweep`). "Client filings" and the "New filing" button `press-in`, then the four rows set top to bottom (`t-set`, 90ms stagger). The first row's chip, "Proof ready to approve", presses in last (scale .96 → 1, `t-press`). As it does, the proof sheet tucked behind the desk slides 16px further out to the right (600ms), so the eye travels to it. Total 2.2s. Hovering a row lifts it 1px and tints it with 4% Pine.

**M3, the text (section 3).** Ana's bubble rises 12px and fades in (`t-set`). After a 400ms pause, three phrases are underlined one after another with a 1.5px Copper hairline drawn left to right (300ms each, 150ms apart): "an LLC for the bakery", "me and my sister, 50/50" and "in Jersey City". From the end of each underline a dotted leader (Copper, 1px, 2px dots every 5px) draws along a gentle elbow to its row in the draft (500ms, `ease-settle`), and the row's value sets in with its "from the text" tag (`t-ink`). The two saved rows ("Registered agent / Your saved agent" and "Organizer and signer / Your saved answers") are blind-pressed from the start, and they ink at the same moment, together, when the third leader lands. They were already there; the text only made them needed. Last, the "For your team to check" chip presses in. Total 3.4s.

**M4, the proof (section 4).** The proof sheet rises 24px into place (600ms, `ease-settle`). The detail rows set (70ms stagger). In the fee table the dot leaders draw out from each label to its amount (400ms), and "Total to the state $103.50" sets with a 1px Plate Ink rule drawing above it. The neutral review-page frame fades in. The "Approve for filing" button `press-in`s last. Then the "New Jersey payment screen" slip slides out from under the foot of the sheet (12px, 400ms) and its "Matches the proof" chip appears with a plain fade. It's a footnote, so it moves like one. Total 2.0s.

**M5, after (section 5).** Along a hairline, three lozenges ink one after another with their labels "Approved", "Submitted", "Filed" (each `press-in`, 300ms apart): "an update at each stage". Then the envelope's flap (live SVG over the P7 photograph) opens with a 3D rotate of 180° on its top edge (500ms, `ease-settle`), and the two document cards rise out of it (320ms each, 120ms stagger) and settle side by side.

**M6, coverage (section 6).** The four place cards are dealt: each rises 16px and fades in (400ms, 80ms stagger, left to right). Hover or focus a filing in a card and its stage glyph inks (`t-ink`). That's all.

**M7, the raking light (section 7).** The log is a white sheet with every row blind-embossed. The text is inked in Graphite from the start, so it's readable before, during and after. A soft, wide highlight (a 40% wide radial light, 12% white over the sheet, with the emboss shadows lengthening as it passes) crosses the sheet left to right in 2.4s (`ease-sweep`). Each row's emboss deepens from 40% to 100% as the light reaches it. Every row gets the same treatment, the last one ("Pay Now / held, on purpose") included. The light comes to rest low on the left at 35°, where the impression reads best, and stays there. It sells the rehearsal as the full impression, every screen, rather than as a thing that stops.

**M8, the close.** The blank-plate photograph pushes in from scale 1.00 to 1.03 over 8 seconds, once, with `ease-settle`. Nothing else moves. It's an empty plate in good light, and the visitor supplies the name.

**M9, signup.** As the firm types into "Firm name", each new letter is cut into the brass plate (the WebGL engraving from 7.4): the groove deepens from 0 to full over 90ms with a 60ms glint at the bottom of the cut. Deleting a letter fills it back in, 60ms. Input is debounced at 30ms so fast typists don't see a backlog. Reduced motion shows the text engraved at once.

**M10, buttons.** Press: 80ms, translateY(1px) plus a 1px inset shadow, so it reads like a deboss. Release: 160ms, `ease-settle`. Hover: fill to Copper Deep (or the firm color 8% deeper) in `t-quick`. No ripples, no glows, no scale-up.

**In the product.**

- **The proof, approved.** When the firm presses "Approve, and authorize submission and payment", the button debosses and holds that state while the request goes. The decision page then opens with its heading `press-in` and the Firm Rule drawing under it (`t-draw`), like the rule drawn under a signature. No stamps, no confetti, no checkmark burst.
- **The filing desk, live updates.** When a filing's status changes while the desk is open, the old chip fades (120ms) and the new one presses in (`t-press`), and the row carries a 6% firm-color wash that fades out over 2s. When documents arrive, the filing's Documents card plays the envelope flap once.
- **Loading.** Rows that are loading show as blind-embossed blanks at the final size, with a slow 1.6s opacity pulse between 60% and 100%. No shimmer sweeps, and no spinner unless a wait passes 3 seconds.
- **Page changes.** Cross-document View Transitions keep the header lockup and the firm's letterhead still while the content cross-fades (200ms). Everything else is the browser's.

### 8.5 Budgets

- No moving picture adds more than 40KB of script beyond the shared motion module (about 12KB, built on the Web Animations API, no animation library).
- The WebGL pieces load only on devices that report `deviceMemory ≥ 4` and are not in data-saver mode, and only once their section is within one screen of the viewport. Everyone else gets the SVG or still fallback, which is designed as a finished picture, not a placeholder.
- The two door clips (if video is used for the raking light) are under 600KB each at 1280px wide, AV1 with an H.264 fallback, muted, with no controls and `playsinline`.

---

## 9. The home page, section by section

The home page is a stationer's sample book with nine spreads. Each spread has a few words and one picture, and the picture is always the bigger of the two. The pictures tell one story in order: the firm's desk, its name on its clients' pages, a client's text becoming a filing, the proof the firm approves, the papers coming home, what can be filed, the free rehearsal, the price card, and an empty plate waiting for the visitor's name.

The section bands, top to bottom:

| # | Band | Ground | Picture side | Desktop spacing above / below |
|---|---|---|---|---|
| — | Beta notice | Cotton 2 | — | — |
| — | Header | Cotton (sticky, compacts) | — | — |
| 1 | Hero | Cotton | Right, bleeding into the margin | 80 / 160 |
| 2 | Firms | Cotton | Left | 128 / 160 |
| 3 | Requests | Cotton | Right | 128 / 160 |
| 4 | The proof | **Cotton 2** (the proof needs a quieter ground to sit on) | Left | 128 / 160 |
| 5 | After | Cotton | Right | 128 / 160 |
| 6 | Coverage | Cotton | Full width | 128 / 160 |
| 7 | Rehearsals | **Sheet white** (a blind impression reads best on white) | Left | 128 / 160 |
| 8 | Pricing | Cotton | Centred | 128 / 128 |
| 9 | Close | Full-bleed photograph | Behind | 0 / 0 |
| — | Footer | Cotton 2 | — | 64 / 48 |

On phone every band is one column, words first and picture second, in the same order, with 64 / 80 spacing.

### 9.0 The beta notice, the header and the footer

**Beta notice** (home page and CoFile's own pages). It's a slip at the top of the sheet, not an alarm.

```
┌─────────────────────────────────────────────────────────────────────────────────────────┐
│ [BETA]  CoFile is in beta. Any filing can run as a free rehearsal on the state's real   │
│         website. It stops before the last button, so nothing is filed or paid. Filing   │
│         types go live one at a time. Questions or problems? hello@cofile.app            │
└─────────────────────────────────────────────────────────────────────────────────────────┘
```

- Cotton 2 band with a 1px Rule bottom edge. Content is centred on the 1152px grid in one or two lines on desktop, 15/23 Graphite, with the email as an underlined Copper link.
- "Beta" is a **blind chip** (section 11.4): 13px Founders Medium caps, +8% tracking, Ink text, embossed. It's the same object as the rehearsal chip because it means the same thing.
- On phone it wraps to four lines at 15px. It isn't dismissible on the home page (owner's decision). On the other pages it collapses to its first sentence plus a disclosure triangle `[copy needed: accessible name]`.
- **On firm pages** the code's other wording ("This service is in beta. …") is used in the same slip, on the firm's tinted page ground, with no CoFile name, no CoFile link and no Copper.

**Header.**

```
Desktop, 76px (compacts to 60px after 120px of scroll)
┌─────────────────────────────────────────────────────────────────────────────────────────┐
│ [▭Co] CoFile    How it works  For firms  What we file  Pricing  For platforms   Log in  [ Run a free rehearsal ] │
└─────────────────────────────────────────────────────────────────────────────────────────┘

Phone, 64px
┌──────────────────────────────┐
│ [▭Co] CoFile      Log in  ≡  │
└──────────────────────────────┘
```

- Cotton, with a 1px Rule bottom edge that appears only once the page has scrolled.
- The lockup is 28px tall (24 on phone). Nav links are 17px Founders Text in Ink, 32px apart. The current page gets a 2px Copper underline 6px below the baseline. Hovered links get a 1px Rule underline.
- "Log in" is a plain text link. "Run a free rehearsal" is the primary button at 44px tall (section 11.1).
- **Phone:** "≡" opens a full-height sheet (Cotton, sliding down 240ms) listing the five links in Plate Roman Deck 28px with 64px rows and hairlines, and "Run a free rehearsal" full width at the bottom. The button needs an accessible name `[copy needed]`.
- From 640px to 1100px, the five links move into the "≡" sheet and the CTA stays in the bar.

**Footer.**

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━  ← thick-and-thin, Plate Ink
───────────────────────────────────────────────────────────────────────────────────────
 [▭Co] CoFile · the filing desk behind your firm    New York · New Jersey · Florida · IRS
                                                    Building a filing product? CoFile for platforms

 CoFile is not a law firm or a government agency, isn't affiliated with any state or the IRS,
 and doesn't give legal or tax advice.
 Terms · Privacy · Security · FAQ · hello@cofile.app
```

- Cotton 2. The **thick-and-thin rule in Plate Ink** across the content width is the foot of the letterhead. It's the one place CoFile uses the Firm Rule device for itself.
- The top row is 17px. "New York · New Jersey · Florida · IRS" is set with wide middots, the way an address line is set at the foot of a letterhead. The legal line and links are 15px Graphite with underlined links.
- Phone: everything stacks left-aligned, with 24px between groups.

### 9.1 Hero: the desk, under the firm's own name

**Copy, in order:** kicker "For CPA, payroll, fractional CFO and title firms" · h1 "Your client needs an LLC. Say yes, under your own name." · sub "CoFile files your clients' formations, EINs and payroll registrations on the official state and IRS websites, once you approve." · buttons "Run a free rehearsal" and "See pricing" · note "Built and run by filing professionals. When a filing needs a person, one of them takes over."

**The picture: "The desk".** This is Harbor & Pine CPA's filing desk, laid on the table like the first sheet in a sample book, with the proof for Two Sisters Bakery tucked behind it. It's live HTML. Every word is the stand-in's sample copy.

*The desk sheet (front):* white, 548px wide on desktop, sheet shadow, 40px inner margins.

- **Letterhead, left-aligned:** Harbor & Pine's logo (the "H&P" monogram, 44px tall, in Pine) and "Harbor & Pine CPA" in Lora 24px Ink. On the right of the same line is "Filing desk" in the `kicker` style, Graphite. Below them is the **Firm Rule**: 3px Pine, 2px gap, 1px Harbor.
- **Head row:** "Client filings" in Lora 24px on the left. "New filing" on the right is a small primary button in Pine (40px tall, white text, chamfered). It's a picture of a button, so it's not focusable and has `aria-hidden`.
- **Four ledger rows**, 72px each, with 1px Rule between them:

| Business (17px Founders Medium, Ink) / filing (15px Graphite) | Chip |
|---|---|
| Two Sisters Bakery LLC / New Jersey LLC formation | "Proof ready to approve": an **action chip** in the firm's color (Pine text, 1px Pine border, Pine lozenge), the one thing on the desk that wants the owner |
| Hudson Ledger LLC / New York LLC formation | "Filed": a **done chip**, Verdigris fill, white text, inked plate glyph |
| Hudson Ledger LLC / EIN | "Filed, IRS letter saved": done chip |
| Orchard Lane Inc. / Payroll registration (NJ-REG) | "Submitted": an **in-hand chip**, Ink outline, Ink text |

- **Foot:** the imprint "with CoFile", centred under a 40px hairline (3.4).

*The proof (behind):* a second white sheet, the proof for "Two Sisters Bakery LLC", offset 72px right and 48px down. You see its centred Harbor & Pine letterhead edge and its right margin. It runs off the right edge of the grid into the page margin, and at viewports under 1280px it's clipped by the viewport. It's decorative (`aria-hidden`), a hint at section 4.

*Caption:* "Example · test details · not a real firm", 13px Graphite, under the desk sheet's left edge.

**Desktop layout (1280).**

```
 cols:  1    2    3    4    5    6 │  7    8    9    10   11   12 │ margin
┌──────────────────────────────────┬──────────────────────────────┬────────┐
│ ── FOR CPA, PAYROLL, FRACTIONAL  │ ┌────────────────────────────┐─┐       │
│    CFO AND TITLE FIRMS           │ │ [H&P] Harbor & Pine CPA  FILING DESK│ │
│                                  │ │ ━━━━━━━━━━━━━━━━━━━━━━━━━━ │ │  ← proof
│ Your client needs an             │ │ ────────────────────────── │ │    behind,
│ LLC. Say yes, under              │ │ Client filings  [New filing]│ │    off the
│ your own name.                   │ │ ─────────────────────────── │ │    grid
│                                  │ │ Two Sisters Bakery LLC      │ │
│ CoFile files your clients'       │ │ New Jersey LLC formation  ◇ Proof ready to approve
│ formations, EINs and payroll     │ │ ─────────────────────────── │ │
│ registrations on the official    │ │ Hudson Ledger LLC   ■ Filed │ │
│ state and IRS websites, once     │ │ ─────────────────────────── │ │
│ you approve.                     │ │ Hudson Ledger LLC  ■ Filed, IRS letter saved
│                                  │ │ ─────────────────────────── │ │
│ [ Run a free rehearsal ] [See pricing]│ Orchard Lane Inc.  □ Submitted   │
│                                  │ │          ────               │ │
│ Built and run by filing          │ │       with CoFile           │ │
│ professionals. When a filing     │ └────────────────────────────┘ │       │
│ needs a person, one of them      │ Example · test details · not a real firm │
│ takes over.                      │                              │        │
└──────────────────────────────────┴──────────────────────────────┴────────┘
```

- Text in cols 1–6, picture in cols 7–12, with its back sheet bleeding right.
- **Kicker**: `kicker` style in Graphite, preceded by a 24px Copper hairline at its cap height.
- **h1**: `display-xl`, 60–64px, Ink, `text-wrap: balance`, three lines at 1280, with the letterpress impression. Nothing in it is re-weighted or recolored.
- **Sub**: `lede`, Plate Roman Text 21/33, max 30em.
- **Buttons**: "Run a free rehearsal" primary (Copper, 56px tall). "See pricing" secondary (1px Rule Strong outline, Ink text, 56px), 16px gap.
- **Note**: 15/23 Graphite, max 30em, 32px below the buttons, with a 7px Copper lozenge before it. It's the one human line in the hero and is set like the last line of a letter. On How it works and Pricing it gets the P9 portraits (section 10). Here it stays words.
- Vertical: the h1's cap height sits 80px below the header. The desk sheet's top aligns to the kicker.

**Phone layout (390).**

```
┌──────────────────────────────┐
│ [BETA] CoFile is in beta.    │
│ Any filing can run as a free │
│ rehearsal … hello@cofile.app │
├──────────────────────────────┤
│ [▭Co] CoFile      Log in  ≡  │
├──────────────────────────────┤
│ ── FOR CPA, PAYROLL,         │
│    FRACTIONAL CFO AND TITLE  │
│    FIRMS                     │
│                              │
│ Your client needs            │
│ an LLC. Say yes,             │
│ under your own name.         │
│                              │
│ CoFile files your clients'   │
│ formations, EINs and payroll │
│ registrations on the …       │
│                              │
│ [   Run a free rehearsal   ] │
│ [        See pricing       ] │
│                              │
│ ◆ Built and run by filing    │
│   professionals. When a …    │
│                              │
│ ┌──────────────────────────┐ │
│ │[H&P] Harbor & Pine CPA   │ │
│ │ FILING DESK              │ │
│ │━━━━━━━━━━━━━━━━━━━━━━━━━━│ │
│ │ Client filings [New filing]│
│ │ Two Sisters Bakery LLC   │ │
│ │ New Jersey LLC formation │ │
│ │ ◇ Proof ready to approve │ │
│ │ ……                       │ │
│ │       with CoFile        │ │
│ └──────────────────────────┘ │
│ Example · test details · …   │
└──────────────────────────────┘
```

- The h1 at 40/44. Buttons are full width, 56px, stacked with 12px between them.
- The desk sheet keeps a 20px side margin and its shadow (it's a picture, not the page), and the proof behind it is dropped. Each row stacks business, filing, then chip.
- The sticky bottom bar (6.4) appears once this section leaves the screen.

**States.** Dark mode: the band goes to Night and the desk sheet stays white (4.3). Reduced motion: the desk is shown complete.

**Motion:** M1 (8.4).

### 9.2 Firms: two doors, one page

**Copy:** h2 "Your name on the door. Ours in small type." · lede "Your logo and color on every page your client sees." · list "A link for each client" / "A page for every filing you offer" / "A button for your own website" / "Your registered agent, or ours" · link "For firms".

**The headline, set to make its own point.** "Your name on the door." is set at `display-l` (48px). "Ours in small type." follows on its own line at **26px Plate Roman Text Italic**, in Ink, still perfectly readable, still part of the same h2. The words, their order and their meaning are untouched. The size change says what the sentence says.

**The picture: "Two doors, one page".** It replaces the stand-in's two side-by-side pages with a diptych.

- **Left panel: Harbor & Pine CPA.** At the top is photograph P1, square-cropped on the brass plate "Harbor & Pine CPA" with the doorframe at the edge, 306 × 306px. Overlapping the photo's lower edge by 56px is the **client page**, a white sheet 280px wide, the size of a phone screen:
  - Letterhead, left-aligned: the H&P logo and "Harbor & Pine CPA" in Lora 18px, with the Firm Rule in Pine and Harbor.
  - "Start your New Jersey LLC" in Lora 22px.
  - Two fields, labelled "Business name" and "Who owns it": 16px labels and 48px white fields with Rule Strong borders, empty.
  - "Continue": a full-width 48px button in Pine.
  - The imprint "with CoFile" at the foot.
  - The page's ground behind the sheet is Harbor & Pine's tint (3.6).
- **Right panel: Northgate Payroll.** Photograph P2, the steel plate "Northgate Payroll", same crop. The same client page in Northgate's brand: the gate mark and "Northgate Payroll" in Montserrat, a Firm Rule in Northgate Teal with an amber thin line, "Start your New Jersey LLC" in Montserrat SemiBold, the same two fields on exactly the same grid, "Continue" in Teal, and the same imprint at the foot.
- **Between them**, a 24px Cotton gutter and the brass **wipe handle** (8.3).
- **Caption** under both: "Two example firms · same page, each in its own brand".

What the eye should take in: two firms that look nothing alike, two doors that have never met, and identical bones underneath. The only thing that's the same in both brands is the small type at the foot.

**Desktop layout.**

```
 cols:  1    2    3    4    5    6    7  │ 8 │  9   10   11   12
┌─────────────────────────────────────────┬───┬────────────────────┐
│ ┌───────────────┐ ┃ ┌───────────────┐   │   │ Your name on the   │
│ │  [photo P1]   │ ┃ │  [photo P2]   │   │   │ door.              │
│ │ ╱‾‾‾‾‾‾‾‾‾‾╲  │ ┃ │ ╱‾‾‾‾‾‾‾‾‾‾╲  │   │   │ Ours in small type.│
│ │ │Harbor & Pine│ │ ┃ │ │ Northgate  │ │   │   │                    │
│ │ ╲____CPA___╱  │ ┃ │ ╲__Payroll_╱  │   │   │ Your logo and color│
│ │ ┌───────────┐ │ ┃ │ ┌───────────┐ │   │   │ on every page your │
│ └─│[H&P] Harbor│─┘ ┃ └─│[⊓] Northgate│─┘ │   │ client sees.       │
│   │━━━━━━━━━━━│   ┃   │━━━━━━━━━━━│     │   │                    │
│   │Start your │   ┃   │Start your │     │   │ ◆ A link for each  │
│   │New Jersey │   ┃   │New Jersey │     │   │   client           │
│   │LLC        │  [▭]  │LLC        │     │   │ ◆ A page for every │
│   │Business name│ ┃   │Business name│   │   │   filing you offer │
│   │[_________]│   ┃   │[_________]│     │   │ ◆ A button for your│
│   │Who owns it│   ┃   │Who owns it│     │   │   own website      │
│   │[_________]│   ┃   │[_________]│     │   │ ◆ Your registered  │
│   │[ Continue ]│  ┃   │[ Continue ]│    │   │   agent, or ours   │
│   │ with CoFile│  ┃   │ with CoFile│    │   │                    │
│   └───────────┘   ┃   └───────────┘     │   │ For firms →        │
│ Two example firms · same page, each in its own brand             │
└─────────────────────────────────────────┴───┴────────────────────┘
```

- The picture is in cols 1–7, col 8 is empty, and the text is in cols 9–12, vertically centred on the picture.
- List: `body` 18px, lozenge bullets in Copper, 16px between items. These are four short noun phrases, so they're set close together like an index.
- "For firms" is a text link at 18px Founders Medium, Copper, underlined, with a 16px → arrow icon after it.

**Phone layout.**

```
┌──────────────────────────────┐
│ Your name on the door.       │
│ Ours in small type.          │
│ Your logo and color on every │
│ page your client sees.       │
│ ◆ A link for each client     │
│ ◆ A page for every filing    │
│   you offer                  │
│ ◆ A button for your own …    │
│ ◆ Your registered agent, …   │
│ For firms →                  │
│ ┌──────────────────────────┐ │
│ │      [photo P1, 4:3]      │ │
│ │  ┌────────────────────┐   │ │
│ └──│[H&P] Harbor & Pine │───┘ │
│    │Start your New Jersey│    │
│    │…  [ Continue ]      │    │
│    │    with CoFile      │    │
│    └────────────────────┘     │
│           ● ○                 │
│ Two example firms · same …    │
└──────────────────────────────┘
```

- On phone the h2's two lines are 32px and 20px.
- The diptych becomes a two-card snap carousel, 300px cards with the next card's edge peeking 24px, with page dots below.

**States.** Before it plays: both sheets show blank, with frame and shadow only (desktop). After: complete, with the handle live. Keyboard: the handle is focusable, and the arrow keys move it 10% per press. Dark mode: the photos stay, the sheets stay white, the ground is Night. Reduced motion: complete, with no play.

**Motion:** M2 (8.3).

### 9.3 Requests: the text becomes the filing

**Copy:** h2 "Your client sends a text. Nobody retypes it." · lede "Forward the text, email, WhatsApp or Slack message. AI drafts the filing, your saved answers fill in the rest, and your team checks it."

**The picture: "From a text to a draft".**

- **The phone (left of the picture):** a drawn slab (7.5), 232px wide, upright, showing one message. The bubble is Cotton 2 `#F3F0E8` with Ink text at 17/25 and a 2px radius with an 8px tail at the bottom-left. It's ours, and it looks like no messaging app. It reads "Need an LLC for the bakery. It's me and my sister, 50/50, in Jersey City." Below it in 13px Graphite: "Ana Ortiz · text message · example".
- **The draft (right):** a white sheet 400px wide, set 72px lower than the phone, so the leaders slope gently down. It has a head, "Draft: New Jersey LLC formation", in Plate Roman Deck 20px, with the chip "For your team to check" (an in-hand chip). Then five rows, 56px each, with a hairline between:

| Label (15px Graphite) | Value (17px Founders Text, Ink, tabular) | Tag (13px, right-aligned) |
|---|---|---|
| Business name | TWO SISTERS BAKERY LLC | "from the text", Copper, with a 12px speech-bubble glyph |
| Members | Ana Ortiz, Lucia Ortiz (50/50) | "from the text" |
| City | Jersey City, NJ | "from the text" |
| Registered agent | Your saved agent | "already filled", Graphite, with a 12px plate glyph |
| Organizer and signer | Your saved answers | "already filled" |

- **The leaders**: three dotted Copper leaders run from the underlined phrases in the bubble to the three "from the text" rows, each a single gentle elbow. They're the visual meaning of "Nobody retypes it": a line from what she wrote to where it went, with no human hand in between.
- **The old "↓" arrow is gone**. The leaders replace it.
- The values are set in Founders Grotesk Text, not monospace. A business name typed by a baker shouldn't look like computer output.

**Desktop layout.** Text in cols 1–4, picture in cols 6–12.

```
┌───────────────────────┬─┬────────────────────────────────────────────────┐
│ Your client sends a   │ │ ┌──────────┐                                    │
│ text. Nobody retypes  │ │ │  ░░░░░░  │                                    │
│ it.                   │ │ │┌────────┐│     ┌──────────────────────────────┐│
│                       │ │ ││Need an ││     │ Draft: New Jersey LLC        ││
│ Forward the text,     │ │ ││LLC for ││·····│ formation  [For your team…]  ││
│ email, WhatsApp or    │ │ ││the bak-││  ·  │──────────────────────────────││
│ Slack message. AI     │ │ ││ery. It's··· ·│ Business name                 ││
│ drafts the filing,    │ │ ││me and my│   ·│ TWO SISTERS BAKERY LLC  from the text
│ your saved answers    │ │ ││sister,  │····│ Members                       ││
│ fill in the rest, and │ │ ││50/50, in│    │ Ana Ortiz, Lucia Ortiz (50/50) from the text
│ your team checks it.  │ │ ││Jersey   │····│ City  Jersey City, NJ  from the text
│                       │ │ ││City.    │    │ Registered agent              ││
│                       │ │ │└────────┘│    │ Your saved agent   already filled
│                       │ │ │Ana Ortiz ·│    │ Organizer and signer          ││
│                       │ │ │text message│   │ Your saved answers already filled
│                       │ │ │· example  │    └──────────────────────────────┘│
│                       │ │ └──────────┘                                    │
└───────────────────────┴─┴────────────────────────────────────────────────┘
```

**Phone layout.** The phone frame is dropped: on a phone, the bubble sits straight on the page. Then a single vertical dotted leader drops 48px, and below it the draft sheet runs full width with the tags under each value.

```
┌──────────────────────────────┐
│ Your client sends a text.    │
│ Nobody retypes it.           │
│ Forward the text, email, …   │
│ ┌──────────────────────┐     │
│ │Need an LLC for the   │     │
│ │bakery. It's me and my│     │
│ │sister, 50/50, in     │     │
│ │Jersey City.          │     │
│ └┬─────────────────────┘     │
│ Ana Ortiz · text message ·   │
│  example                     │
│  ┆                           │
│ ┌──────────────────────────┐ │
│ │Draft: New Jersey LLC     │ │
│ │formation                 │ │
│ │[For your team to check]  │ │
│ │Business name             │ │
│ │TWO SISTERS BAKERY LLC    │ │
│ │◔ from the text           │ │
│ │…                         │ │
│ └──────────────────────────┘ │
└──────────────────────────────┘
```

(The ◔ above stands in for our 12px speech-bubble glyph.)

**States.** Before play: the bubble is hidden, the draft rows are blind-pressed blanks, and the two saved rows are blind with their text present. After: complete. Dark mode: the bubble is Night Card `#1F2230` with Ink, the draft sheet stays white, and the leaders are dark-mode Copper.

**Motion:** M3 (8.4).

### 9.4 The proof: one page, yours to approve

**Copy:** h2 "Nothing is filed or paid until you approve the proof." · lede "One page: every detail, every fee." · list "The state's own review page, where possible" / "Every fee checked again before paying" / "Any later change comes back for approval" · link "How it works".

**The picture: "The proof".** The sample proof for "Two Sisters Bakery LLC" on Harbor & Pine's letterhead: a letter-proportioned white sheet, 560 × 724px, on the Cotton 2 band. The proof is the one sheet in the firm's life that's *for the firm*, so it's the most ceremonial: centred letterhead, generous margins, everything in its place.

From top to bottom (inner margins 48px, 40px between groups):

1. **Letterhead, centred:** the H&P monogram (52px) above "Harbor & Pine CPA" in Lora 22px. Top-right corner, 13px Graphite: "example firm". Below, the Firm Rule full width.
2. **Title row:** "Two Sisters Bakery LLC" in Lora 30px, left. On the right, the chip "Ready to approve" (action chip, Pine).
3. **Details:** a three-row table. Labels 15px Graphite in a 38% column; values 17px Founders Text Ink.
   - "Business name" · "TWO SISTERS BAKERY LLC"
   - "Members" · "Ana Ortiz, Lucia Ortiz (50/50)"
   - "Main business address" · "88 Grove St, Jersey City NJ 07302"
   
   The stand-in's yellow highlighter on the name and address becomes the firm's **check-this wash**: Harbor at 10% behind the value, with a 1px Harbor underline offset 4px. It says "look here" in the firm's own ink.
4. **Fees** with dot leaders to right-aligned, decimal-aligned amounts:
   ```
   Formation filing fee ··························· $100.00
   NJ portal fee, by card ··························· $3.50
   ─────────────────────────────────────────────────────────
   Total to the state                               $103.50
   ```
   "Total to the state" is 17px Founders Medium. "$103.50" is `figure-l` (26px Plate Roman Deck, lining). Above them is a 1px Plate Ink rule.
5. **The state's review page:** a neutral screen frame (1px Rule border, a 20px Bond top bar with three 6px Rule dots and no title, 12px inner padding). Above the frame, 13px Graphite: "New Jersey's own review page, filled in". Inside, two rows in Founders Text 15px: "Business Name" · "TWO SISTERS BAKERY" and "Designator" · "LLC". It has no state header, seal or color, per 3.7.
6. **The button:** "Approve for filing", full content width, 56px, Pine, white Founders Medium 18px, chamfered. It sits where a signature would, at the end of the sheet. It's a picture (`aria-hidden`, not focusable).
7. **Imprint:** "with CoFile" at the foot.

**The payment slip.** Under the foot of the proof, tucked half behind it and offset 40px right, is a narrow neutral slip (Bond `#F5F5F2`, 420 × 56px, 1px Rule). It reads "New Jersey payment screen" (15px Graphite) · "$103.50" (17px Founders Medium, tabular) · chip "Matches the proof" (done chip, Verdigris). It's a footnote to the proof, so it's set like one: smaller, behind, and quiet.

**Caption:** "Sample proof · test details · not a real business".

**Stripped from the stand-in:** the numbered callout circles 1–4 (they look like an inspector's annotations, and the list beside the picture does that job) and the monospace values.

**Desktop layout.** The picture is in cols 1–7 (the proof sheet centred in that span, with the slip breaking out right), and the text is in cols 9–12.

```
┌────────────────────────────────────────┬─┬─────────────────────┐
│     ┌───────────────────────────────┐  │ │ Nothing is filed or │
│     │                   example firm │  │ │ paid until you      │
│     │            [H&P]               │  │ │ approve the proof.  │
│     │       Harbor & Pine CPA        │  │ │                     │
│     │ ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━  │  │ │ One page: every     │
│     │ ─────────────────────────────  │  │ │ detail, every fee.  │
│     │ Two Sisters Bakery LLC  ◇ Ready to approve               │
│     │ Business name  TWO SISTERS BAKERY LLC│ │ ◆ The state's own │
│     │ Members        Ana Ortiz, Lucia …    │ │   review page,    │
│     │ Main business  88 Grove St, Jersey … │ │   where possible  │
│     │ Formation filing fee ····· $100.00   │ │ ◆ Every fee       │
│     │ NJ portal fee, by card ······ $3.50  │ │   checked again   │
│     │ ─────────────────────────────  │  │ │   before paying     │
│     │ Total to the state      $103.50 │  │ │ ◆ Any later change  │
│     │ New Jersey's own review page, filled in│   comes back for  │
│     │ ┌ · · · ──────────────────────┐│  │ │   approval          │
│     │ │ Business Name  TWO SISTERS …││  │ │                     │
│     │ │ Designator     LLC           ││  │ │ How it works →     │
│     │ └─────────────────────────────┘│  │ │                     │
│     │ [      Approve for filing     ]│  │ │                     │
│     │          with CoFile           │  │ │                     │
│     └──────────┬────────────────────────────┐                   │
│                │ New Jersey payment screen  $103.50  ■ Matches the proof
│                └────────────────────────────┘                   │
│     Sample proof · test details · not a real business           │
└────────────────────────────────────────┴─┴─────────────────────┘
```

**Phone.** Words first. Then the proof sheet runs full width with a 12px side margin and keeps its shadow (it's a picture). The letterhead stays centred, the title and chip stack, the fee leaders shorten, and the button is full width. The slip sits under the sheet, full width, not tucked behind.

**States.** Dark mode: the band is Night 2, and the sheet and slip stay paper. Reduced motion: complete.

**Motion:** M4 (8.4).

### 9.5 After: the order comes home

**Copy:** h2 "Then it's filed, and the papers come back to you." · list "The state's documents, saved and sent to you" / "CoFile applies for the EIN and keeps the IRS letter" / "An update at each stage".

**The picture: "The papers come home".** This is mixed media: a real photograph of a real desk, with live paper on top of it.

- **The tabletop:** the clean plate of P7, a walnut desk from above in north light, with a fountain pen at the top edge, reading glasses at the right and a cup at the lower left. The centre is clear. Picture area 7 cols × 4:3 (662 × 496px), with a 2px radius.
- **The record card** (live, upper left of the table): a white card 320px wide, slightly lifted. Across its top, a hairline runs between three lozenges, each labelled below in 15px Founders Medium: "Approved", "Submitted", "Filed". All three are inked Verdigris, so the job is done. It's the visual for "An update at each stage", as a progress rule a person can read at a glance.
- **The envelope** (live SVG, centre): a heavy white envelope, flap open. Its face carries Harbor & Pine's name as the address, in Lora 15px: "Harbor & Pine CPA". The flap's tip has the smallest CoFile mark on the site, a 10px blind stamp of the Name Plate, the way a stationer stamps the back flap. It's the only appearance of the plate on anything a firm receives. It's blind, colorless, and you have to look for it.
- **Two document cards** (live), rising out of the envelope and fanned 4° apart. Each is a white letter-proportioned card, 184 × 238px:
  - Kicker in `kicker` style, Graphite: "New Jersey" on one, "IRS" on the other.
  - Title in Plate Roman Deck 20px: "Certificate of Formation" / "EIN letter (CP 575)".
  - Value in 15px Founders Text, tabular: "TWO SISTERS BAKERY LLC" / "EIN 00-0000000".
  - Below that, five **blind-ruled lines**, embossed and inkless, that stand for a document's body without imitating one. The cards carry no seal, no header and no state or IRS styling (3.7). They're CoFile's own document cards, the same component as the Documents list on a filing page.
- **Shadows** on the live pieces match the photograph's light: soft, from the upper left, 8px offset, 24px blur at 18%.
- **Caption:** "Example record · sample documents".

**Desktop layout.** Text in cols 1–4, picture in cols 6–12.

```
┌──────────────────────┬─┬─────────────────────────────────────────────────┐
│ Then it's filed, and │ │ ┌─────────────────────────────────────────────┐ │
│ the papers come back │ │ │ (pen)   (photo: walnut desk)      (glasses)  │ │
│ to you.              │ │ │  ┌──────────────────────────┐               │ │
│                      │ │ │  │ ◆───────◆───────◆         │               │ │
│ ◆ The state's        │ │ │  │ Approved Submitted Filed  │               │ │
│   documents, saved   │ │ │  └──────────────────────────┘               │ │
│   and sent to you    │ │ │            ┌────────┐┌────────┐              │ │
│ ◆ CoFile applies for │ │ │            │NEW JERSEY││IRS    │              │ │
│   the EIN and keeps  │ │ │            │Certificate││EIN letter│          │ │
│   the IRS letter     │ │ │            │of Formation││(CP 575) │          │ │
│ ◆ An update at each  │ │ │            │TWO SISTERS ││EIN 00-…│          │ │
│   stage              │ │ │            │ ═ ═ ═ ═   ││ ═ ═ ═  │           │ │
│                      │ │ │       ┌────┴──────────┴┴────────┴────┐       │ │
│                      │ │ │ (cup)  │      Harbor & Pine CPA        │       │ │
│                      │ │ │       └───────────────────────────────┘       │ │
│                      │ │ └─────────────────────────────────────────────┘ │
│                      │ │ Example record · sample documents               │
└──────────────────────┴─┴─────────────────────────────────────────────────┘
```

(The pen, glasses and cup are in the photograph. The labels above only mark where they sit.)

**Phone.** Words first. Then the record card full width. Then the envelope with the two cards rising out of it, on Cotton with no photograph. On a narrow screen the photo would only crowd the paper, so the V5 vignette's hatching appears faintly at the envelope's base instead.

**States.** Dark mode: the photograph darkens 4%, and every card stays white. Reduced motion: the envelope is shown open, with the cards out.

**Motion:** M5 (8.4).

### 9.6 Coverage: the sample cards

**Copy:** h2 "The filings your clients already ask you for." · lede "New York, New Jersey, Florida and the IRS. See which are live today" (the last four words are the link) · the tiles · the legend "Live" / "Rehearsed to the payment screen" / "Screens recorded or offered, rehearsal next".

**The picture: "The sample cards".** A stationer keeps a rack of sample cards, one for each thing the shop can make. Here there's one card per place, in the stand-in's order: New York, New Jersey, Florida, IRS. They're drawn from `web/lib/coverage.ts`, which leaves out "Planned" types, as the stand-in does.

**Each card:**

- A white card on Cotton, with a 1px Rule border and no shadow (cards on a table), and 32px inner margins.
- **The place name** in Plate Roman Display 36px, Ink, set like the name on a calling card. There are **no state outlines, seals, flags or capitals** (3.7). The name alone is enough.
- A 1px Rule, 24px wide, under the name.
- **The filings**, one per row, 44px rows. The short name is 17px Founders Text in Ink. On the right is the 16px **plate glyph** for its status, with the status as its accessible name and as a tooltip *and* a visible legend below. Color is never the only signal.
  - New York: "LLC formation", "Corporation formation", "Payroll registration (NYS-100)", "LLC changes and dissolution", "Copies and certificate of status", "Application for Authority", "Assumed name (DBA)"
  - New Jersey: "LLC formation", "Standing certificate", "Payroll registration (NJ-REG)", "Corporation formation"
  - Florida: "LLC formation", "Corporation formation", "Limited partnership"
  - IRS: "EIN, with the IRS letter"
- **The plate glyphs** (16 × 10px, the Name Plate's outline without screws), one glyph language for status across the whole site:
  - **Live**: solid Verdigris plate with a 1px Cotton line engraved across it. Inked.
  - **Rehearsed to the payment screen**: a blind-embossed plate (white, with inner shadow and highlight) and a Graphite 1px outline so it reads at small sizes. Pressed, not yet inked.
  - **Screens recorded or offered, rehearsal next**: a plain 1px Graphite outline. Cut, not yet pressed.
  
  On the What we file page the outline splits into its two stages, and "Planned" gets a dotted outline (10.3).
- Cards are equal height in their row. New York is the tallest, and the IRS card simply has more paper below its one filing, like any card with one line on it.

**The legend** runs under the cards as one line: each glyph followed by its label in 15px Graphite, 32px apart.

**Desktop layout.**

```
┌────────────────────────────────────────────────────────────────────────────────┐
│ The filings your clients already ask you for.                                  │
│ New York, New Jersey, Florida and the IRS. See which are live today            │
│                                                                                │
│ ┌──────────────────┐┌──────────────────┐┌──────────────────┐┌──────────────────┐│
│ │ New York         ││ New Jersey       ││ Florida          ││ IRS              ││
│ │ ──               ││ ──               ││ ──               ││ ──               ││
│ │ LLC formation  ▭ ││ LLC formation  ▣ ││ LLC formation  ▣ ││ EIN, with the    ││
│ │ Corporation    ▭ ││ Standing       ▣ ││ Corporation    ▣ ││ IRS letter     ▭ ││
│ │  formation       ││  certificate     ││  formation       ││                  ││
│ │ Payroll reg.   ▭ ││ Payroll reg.   ▭ ││ Limited        ▣ ││                  ││
│ │  (NYS-100)       ││  (NJ-REG)        ││  partnership     ││                  ││
│ │ LLC changes …  ▭ ││ Corporation    ▭ ││                  ││                  ││
│ │ Copies and …   ▭ ││  formation       ││                  ││                  ││
│ │ Application …  ▭ ││                  ││                  ││                  ││
│ │ Assumed name … ▭ ││                  ││                  ││                  ││
│ └──────────────────┘└──────────────────┘└──────────────────┘└──────────────────┘│
│ ■ Live   ▣ Rehearsed to the payment screen   ▭ Screens recorded or offered, rehearsal next │
└────────────────────────────────────────────────────────────────────────────────┘
```

(▣ is the blind-embossed plate, ▭ the outline plate, ■ the inked plate.)

- The headline and lede are in cols 1–8, and the cards are 3 cols each.
- Tablet: two by two. Phone: one column, the cards full width with 16px between them, then the legend stacked one item per line.

**States.** A filing that the deployment switches live (`isLive`) shows the inked glyph and "Live" automatically. There's no separate design. Dark mode: the cards are Night Card, the glyphs use dark-mode Verdigris and Ink, and the blind plate uses the dark blind values.

**Motion:** M6 (8.4).

### 9.7 Rehearsals: the blind impression

**Copy:** h2 "In beta: rehearse a filing, free." · lede "CoFile fills in every screen of the state's real website and stops before the last button: nothing is filed or paid. Filing types go live one at a time."

**The picture: "The rehearsal log, pressed blind".** It's the stand-in's log, made into the finest thing a stationer can make, a blind impression on cotton.

- **The sheet:** white, 520px wide, sheet shadow, on the white band (the band and sheet are the same white, so the sheet is defined only by its shadow and its impression, like an embossed card on a white tablecloth).
- **The header row:** "Rehearsal · New Jersey LLC formation" in Plate Roman Deck 20px Ink, and on the right "test details" in 13px Graphite. Under it, a blind-embossed rule.
- **Seven rows**, 56px each. Each row is a blind-embossed panel (inner shadow and highlight, 2px radius) with its words inked: the label in 17px Founders Text Ink on the left and the result in 17px Plate Roman Text Italic Graphite on the right.
  - "Business name" · "filled"
  - "Name check" · "passed"
  - "Registered agent" · "filled"
  - "Members and signatures" · "filled"
  - "Review page" · "matched the proof"
  - "Payment: $103.50" · "matches the proof"
  - "Pay Now" · "held, on purpose"
- **The last row is set exactly like the others.** The stand-in colors it, and I don't. The rehearsal's story is that everything was pressed, all the way to the last screen, not that something stopped.
- **The raking light** (M7) passes over the sheet once and rests low on the left.
- **Caption:** "Rehearsal · nothing filed, nothing paid", 13px Graphite.

**Desktop layout.** The picture is in cols 1–6 and the text in cols 8–12. The band is white, so the section reads as a different paper.

```
┌─────────────────────────────────────┬─┬──────────────────────────┐
│ ┌─────────────────────────────────┐ │ │ In beta: rehearse a      │
│ │ Rehearsal · New Jersey LLC      │ │ │ filing, free.            │
│ │ formation           test details│ │ │                          │
│ │ ╭─────────────────────────────╮ │ │ │ CoFile fills in every    │
│ │ │ Business name        filled │ │ │ │ screen of the state's    │
│ │ ╰─────────────────────────────╯ │ │ │ real website and stops   │
│ │ ╭─────────────────────────────╮ │ │ │ before the last button:  │
│ │ │ Name check           passed │ │ │ │ nothing is filed or      │
│ │ ╰─────────────────────────────╯ │ │ │ paid. Filing types go    │
│ │   … five more rows, pressed …   │ │ │ live one at a time.      │
│ │ ╭─────────────────────────────╮ │ │ │                          │
│ │ │ Pay Now     held, on purpose│ │ │ │                          │
│ │ ╰─────────────────────────────╯ │ │ │                          │
│ └─────────────────────────────────┘ │ │                          │
│ Rehearsal · nothing filed, nothing paid                          │
└─────────────────────────────────────┴─┴──────────────────────────┘
```

The copy gives this section no button, so I add none. The header and the sticky phone bar carry "Run a free rehearsal" here.

**Phone.** Words, then the sheet full width with a 12px margin. The rows keep their emboss, and the label and result stay on one line where they fit (they do at 390px: the longest pair is "Pay Now" + "held, on purpose").

**States.** Dark mode: the band becomes Night, the sheet becomes Night Card, and the emboss uses the dark blind values with the text in Ink. A blind impression on black card is just as fine. Reduced motion: the light rests at its final angle.

**Motion:** M7 (8.4).

### 9.8 Pricing: the price card

**Copy:** h2 "$45 a filing. EIN included with a formation." · items "Pay as you go" / "per live filing", "$25" / "an EIN on its own", "$15" / "copies and certificates", "Plans from $250" / "a month for 6 filings" · "State fees separate. Rehearsals free. See all plans" · "Social Security numbers encrypted and deleted 30 days after the filing. Saved cards held in a card vault, never in our database. Security".

(The figures come from `web/lib/pricing.ts`. If they change, the design doesn't.)

**The picture is the price card itself.** A good stationer hands you a printed price card: heavy stock, figures you can read across the room, dot leaders so the eye can't slip a line. I'd rather show prices that way than in four floating boxes.

- **The headline:** centred, in two sizes. "$45" is set at `price-xl` (112px Plate Roman Display, lining figures), and "a filing. EIN included with a formation." follows at `display-l` 48px on the same baseline, wrapping to a second line under it. The words are unchanged, and the figure is simply set the size a price deserves.
- **The card:** centred, 8 cols wide (760px). It's heavier than any other sheet on the site: white, with a 2px Rule Strong **edge line along its bottom and right** so it reads as 600gsm card with thickness, the sheet shadow, and 48px inner margins, no texture.
- **Four lines, set as a price list with dot leaders**, 76px apart with hairlines between:

```
   Pay as you go ································ per live filing
   $25 ········································ an EIN on its own
   $15 ································ copies and certificates
   Plans from $250 ··························· a month for 6 filings
```

  The left item is in Plate Roman Display at `price-l` (44px desktop, lining figures, Ink). The right item is in Plate Roman Text Italic 21px, Graphite. The leaders are Founders periods every 0.4em in Rule Strong, aligned on a shared baseline.
- **Under the card,** centred, 15/23 Graphite:
  - "State fees separate. Rehearsals free. See all plans", with "See all plans" as a Copper underlined link.
  - 12px below it, the security line, set **exactly the same way** with "Security" as the link. Same size, same color, no icon. It's there for the reader who looks for it, which is the point.

**Desktop layout.**

```
┌────────────────────────────────────────────────────────────────────────────┐
│                $45  a filing. EIN included                                  │
│                     with a formation.                                       │
│        ┌──────────────────────────────────────────────────────────┐         │
│        │ Pay as you go ······························ per live filing│        │
│        │──────────────────────────────────────────────────────────│        │
│        │ $25 ·································· an EIN on its own │        │
│        │──────────────────────────────────────────────────────────│        │
│        │ $15 ···························· copies and certificates │        │
│        │──────────────────────────────────────────────────────────│        │
│        │ Plans from $250 ··················· a month for 6 filings│        │
│        └──────────────────────────────────────────────────────────┘▌        │
│                                                                    ▀▀▀▀▀▀▀   │
│              State fees separate. Rehearsals free. See all plans            │
│  Social Security numbers encrypted and deleted 30 days after the filing.   │
│      Saved cards held in a card vault, never in our database. Security      │
└────────────────────────────────────────────────────────────────────────────┘
```

**Phone.** The headline is left-aligned: "$45" at 72px on its own line, then the rest at 32px. The card runs full width with 24px inner margins. Each line stacks the left item (at 36px) over the right item (Italic 19px, right-aligned), with a leader running across the gap between them. The small lines are left-aligned.

**States.** Dark mode: the card becomes Night Card, the edge line becomes Rule Strong (dark), and the figures are Ink. Nothing moves (8.1, rule 5).

### 9.9 Close: the empty plate

**Copy:** h2 "Run one rehearsal. Then decide." · lede "Try it on a filing you know by heart. Questions? hello@cofile.app" · button "Run a free rehearsal".

**The picture: "The empty plate".** Photograph P3, full bleed: Harbor & Pine's door, but the brass plate is **blank**, in good late sun. It's the same door the visitor saw in section 2, with the name taken off. Nobody needs to explain it. In dark mode, P4 is used: the same blank plate at dusk, with warm light from the transom.

- **Desktop:** the photograph runs edge to edge at 16:7 (at 1440px wide, 630px tall), cropped so the plate sits in the right third at eye level. On the left, over the quiet part of the door and the brick, a **Cotton panel** (cols 1–5, 48px padding, the sheet shadow) carries the words, so the type never sits on a photograph.
  - The h2 is `display-l` in Ink, the lede is `lede`, and the email is an underlined Copper link.
  - "Run a free rehearsal" is the primary button at 56px.
- **Phone:** the photo comes first at 4:5, cropped on the plate. The words follow on Cotton below it, with the button full width. The sticky bottom bar hides here (6.4).

```
Desktop
┌──────────────────────────────────────────────────────────────────────────────────┐
│ ┌─────────────────────────────┐        (photo: green-black door, brick,          │
│ │ Run one rehearsal. Then     │         late sun)              ╱‾‾‾‾‾‾‾‾‾╲       │
│ │ decide.                     │                                │ ⊖     ⊖ │      │
│ │                             │                                ╲_________╱      │
│ │ Try it on a filing you know │                                  (blank)        │
│ │ by heart. Questions?        │                                                 │
│ │ hello@cofile.app            │                                                 │
│ │ [ Run a free rehearsal ]    │                                                 │
│ └─────────────────────────────┘                                                 │
└──────────────────────────────────────────────────────────────────────────────────┘
```

**Alt text:** `[copy needed]`.

**Motion:** M8 (8.4).

---

## 10. The other pages

### 10.0 The pages behind the home page: shared parts

**The title page (`PageHead`).** Each of the seven pages opens like the title page of a booklet.

```
┌───────────────────────────────────────────────────────────────────────────────┐
│ ── KICKER                                           ┌───────────────────────┐ │
│ Page title in Plate Roman Display,                  │   frontispiece        │ │
│ set large.                                          │   (picture, if any)   │ │
│ The lede in Plate Roman Text, up to 34em.           └───────────────────────┘ │
└───────────────────────────────────────────────────────────────────────────────┘
```

- Cotton band, 96px above and 112px below.
- Kicker as on the home page. h1 at 56/60 desktop (38/42 phone), Plate Roman Display, `text-wrap: balance`. Lede `lede`.
- Text in cols 1–7, and the **frontispiece** (a picture, when the page has one) in cols 9–12, aligned to the h1's cap height. On phone the frontispiece goes under the lede at full width.
- The h1 has a 2px Copper rule 48px long above the kicker, the same mark as the hero kicker, so every page is visibly part of one book.

**The page close.** Inner pages end with their own close section (each has its own copy). It's a Cotton 2 band with the words in cols 1–7 and, in cols 9–12, the **Name Plate blind-embossed at 240px wide** on a white card (P10's real emboss scan). It's the empty plate again, quieter than the home page's photograph.

**Lists** keep the lozenge bullets. **Two-column sections** (`nx-two`) set the h2 and lede in cols 1–5 and the list or picture in cols 7–12.

### 10.1 How it works (`/how-it-works`)

The page that explains the job. It has more pictures than any other page, because explaining is what pictures do best.

1. **Title page.** Kicker "How it works" · h1 "Your client asks. You approve it. CoFile files it." · lede "Three steps. Your client hands the job to you, and you sign off before anything is filed." No frontispiece: the steps are the picture.
2. **The steps (`#steps`).** Three columns, each topped by a large engraved vignette (240px tall): V1 (the phone on the bakery counter) for "Your client asks.", V2 (the hand and pen beside the laptop) for "You approve it." and V3 (the form filling line by line) for "CoFile files it.". Under each, the lead in Plate Roman Deck 24px and the paragraph in `body`.
   - The **middle column sits on a white sheet** with the sheet shadow (the other two sit on Cotton). It's the firm's step, and the firm's sheet.
   - Above each vignette is a small Copper old-style numeral (1, 2, 3) in Plate Roman Text 20px. They're list numbers, since this is an ordered list (`<ol>`), not new copy.
   - Phone: stacked, vignette 180px tall, middle sheet full width.
3. **Between the steps and the proof, a photo band**: P9, "People at the bench", as a triptych of three of CoFile's filing professionals at work, 3 × 4:5, full grid width. It sits right under step 3's "When a filing needs a person, one of the filing professionals who run CoFile takes over." Caption and alt text `[copy needed]`. If real portraits aren't possible, the band is dropped rather than staged.
4. **The proof (`#proof`).** h2 "You see what the state will see, before the state does." · the long lede about the printer · the six list items · the sample proof.
   - P8 (the printer's proof, initialled in pencil) sits as a small 240 × 180px inset photo under the lede. The lede says "at the printer", and the picture shows it.
   - **The annotated proof.** The proof sheet from 9.4 (cols 7–12). Each of the first five list items has a hairline Copper **leader** to the region it describes: the detail rows, the fees, the review-page frame, the statements (on this page the sample proof shows a short "Statements" group, `[copy needed: sample statement text]`, or the leader is omitted), and the button. Hover or focus a list item, and its leader brightens from 40% to 100% while its region gets a Copper Tint wash (`t-ink`). It's a printer's mark-up, done in the margin.
   - The sixth item, "Like reviewing a return before you e-file it: nothing goes to the state until you've signed off.", is set apart at the end in Plate Roman Text Italic 21px, with a 32px hairline above it, like a closing remark.
   - Phone: no leaders. Each list item is followed by a cropped detail of its region of the proof (static crops of the live component, 100% width, 160px tall), and then the whole proof.
5. **Requests (`#requests`).** h2 "Clients don't always fill in forms. They text you." · lede. The picture is P5, Ana texting at the bakery counter (photo, 4:5, cols 7–10), with the **draft sheet** from 9.3 overlapping its lower right edge by 120px (cols 10–12). The phone screen in the photo shows her message composited in our bubble. The leaders run from the phone screen in the photograph to the draft rows. Phone: the photo full width, then the draft sheet.
6. **Checks (`#checks`), a support section.** h2 "Checks before every filing." · lede · four list items. Cotton 2 band, tighter spacing (6.2), two columns, and no picture. The list is set in `body` with 24px between items, and the "$52" and "$27" in tabular figures. There are no check marks or shields, only the lozenges.
7. **After (`#after`).** h2 "The papers come back to you." · lede · three list items. The picture is **P7 in full**: the envelope on the walnut desk, papers edge-on, at 4:3 in cols 7–12. It's the same scene as the home page's section 5, now as the finished photograph. Caption `[copy needed]` plus the example label.
8. **Close.** h2 "Run one rehearsal. Then decide." · lede · buttons "Run a free rehearsal" (primary) and "Questions" (secondary). The page-close pattern, with the blind plate.

### 10.2 For firms (`/for-firms`)

The page for the owner who's already interested. It's the warmest page, and it's about her.

1. **Title page.** Kicker "For CPA, payroll, fractional CFO and title firms" · h1 "Form the business. Keep the client." · the long lede ("Your client needs an LLC. Who do they call? You. …").
   - **Frontispiece:** P6, the CPA in her own office checking a proof on her laptop, 4:5, cols 9–12, with the example caption `[copy needed]`.
   - The lede runs long (about 75 words), so it's set at `lede` size with a 34em measure, and its first sentence ("Your client needs an LLC.") gets a 3-line **initial cap**: a Plate Roman Display "Y" at 96px in Copper, dropped three lines. It's a letter-writer's flourish on the one page that reads like a letter. Phone: no initial cap.
2. **The desk (`#desk`).** h2 "Your filing desk, in your brand." · five list items. The picture is the **full filing desk** in Harbor & Pine's brand inside a drawn laptop (7 cols): the header with the logo, "with CoFile" right, the nav row (Filings, New filing, Ready to pay, Client links, Signatures, Setup, Billing), and the Filings table with the four sample rows from the hero. Caption "Example · test details · not a real firm".
   - The fifth item ("CoFile is built and run by filing professionals. …") gets a 56px circular crop of one P9 portrait before it, the only portrait in a list on the site. Where P9 isn't available, the lozenge stays.
3. **The brand (`#brand`).** h2 "Your name on the door. Ours in small type." (two sizes, as on the home page) · lede "The same page carries each firm's own name, logo and color. Your clients never see another firm's, or a big CoFile logo." The picture is "Two doors, one page" (9.2) with the wipe. On this page the wipe handle starts in the middle of the left page, so the two brands are visible side by side in one sheet from the start.
4. **The agent (`#agent`).** h2 "Your registered agent, or ours." · lede · three list items (with their links to How it works and Pricing). The picture is a **close-up of the client form**, cropped like a detail plate in a book: Harbor & Pine's letterhead edge at the top and three fields, with "Registered agent" showing "Your saved agent" and the "already filled" tag (the same component as 9.3). 5 cols, white sheet, with the sheet's bottom edge fading into Cotton over 48px.
5. **Close.** h2 "Open your firm's filing desk." · lede · "Run a free rehearsal". The picture is P3, the blank plate, 4:5 at cols 8–12, with the live engraving: if copy for a field label is supplied `[copy needed]`, the visitor can type a firm name and watch it engraved (M9). Without it, the plate stays blank.

### 10.3 What we file (`/what-we-file`)

1. **Title page.** Kicker "What we file" · h1 "New York, New Jersey, Florida and the IRS." · lede "Every filing type carries a plain label, so you always know which ones are live today." **Frontispiece:** V10, four cards fanned with the top one blank.
2. **The coverage table (`#coverage`).** All 16 rows from `coverage.ts`, in their order, in a **ledger table** (11.6): "Filing" (cols 1–6), "Where" (cols 7–8), "Where it stands" (cols 9–12).
   - **Status chips with the plate glyphs, five states:**

| Stage label | Chip |
|---|---|
| "Live" | Done chip: Verdigris fill, white text, inked plate |
| "Rehearsed to the payment screen" | Blind chip: embossed, Ink text, blind plate |
| "Screens recorded, rehearsal next" | Outline chip: 1px Graphite, Ink text, plate outline with three engraved lines inside |
| "Offered, not yet rehearsed" | Outline chip, with an empty plate outline |
| "Planned" | Dotted chip: a 1px dotted Graphite border, Graphite text, dotted plate outline |

   - The table's header row is sticky inside the table while you scroll through it (not the page). That's the one exception to "nothing sticky", because 16 rows on a phone need it.
   - "Where" is set in the `kicker` style, Graphite.
   - The footnote (the long "Rehearsed to the payment screen: …" paragraph with the email link) sits under the table in `small`, max 46em.
   - **Phone:** each row becomes a card. The filing name is 17px Medium, "Where" is in the kicker style above it, and the chip is below it.
3. **How a filing type goes live (`#live`).** h2 "How a filing type goes live." · lede. The picture is **the rehearsal log pressed blind** (9.7, with its raking light), and above the log a **stage ladder**: the five plate glyphs drawn at 40px in a row, joined by a hairline, labelled with the five stage labels (from "Planned" to "Live"), so the eye can see a filing earn its way across. The labels are the existing ones. It's a picture, so it's `aria-hidden`, and the table above carries the meaning.
4. **State by state (`#states`).** h2 "State by state." · four notes (h3 "New York", "New Jersey", "Florida", "IRS", each with its paragraph). They're set on the **same sample cards** as the home page's coverage tiles, with the place name in Plate Roman Display 36px and the paragraph in `body`. This keeps one picture for each place across the site. Four across on desktop, two by two on tablet, stacked on phone.
5. **Close.** h2 "Rehearse one you know by heart." · buttons "Run a free rehearsal" and "See pricing". The page-close pattern.

### 10.4 Pricing (`/pricing`)

1. **Title page.** Kicker "Pricing for firms" · h1 "$45 a filing. EIN included with a formation.", set as on the home page, with "$45" at `price-xl` · lede "Pay for each live filing, or take a plan with filings included every month. Every plan is backed by filing professionals, and rehearsals are always free." No frontispiece: the figure is the picture.
2. **The plans (`#plans`): four price cards.**

```
┌────────────────┐┌────────────────┐┏━━━━━━━━━━━━━━━━┓┌────────────────┐
│ Pay as you go  ││ Starter        │┃ Growth         ┃│ Unlimited      │
│                ││                │┃                ┃│                │
│ $45 a filing   ││ $250 a month   │┃ $500 a month   ┃│ $1,000 a month │
│ No monthly fee.││ or $2,500 a    │┃ or $5,000 a    ┃│ or $10,000 a   │
│ Pay only for   ││ year (2 months │┃ year (2 months ┃│ year (2 months │
│ live filings.  ││ free)          │┃ free)          ┃│ free)          │
│ ────────────── ││ ────────────── │┃ ────────────── ┃│ ────────────── │
│ ◆ $25 for an   ││ ◆ 6 filings a  │┃ ◆ 15 filings a ┃│ ◆ Unlimited    │
│   EIN on its   ││   month        │┃   month        ┃│   filings (fair│
│   own          ││ ◆ $40 for each │┃ ◆ $33 for each ┃│   use: 60 a    │
│ ◆ $15 for      ││   filing past  │┃   filing past  ┃│   month)       │
│   copies and   ││   that         │┃   that         ┃│ ◆ $15 for each │
│   certificates ││                │┃                ┃│   filing past  │
│                ││                │┃                ┃│   fair use     │
│                ││                │┃                ┃│ ◆ Priority help│
│                ││                │┃                ┃│   from a person│
│ ·············· ││ ·············· │┃ ·············· ┃│ ·············· │
│ A filing prof- ││ A filing prof- │┃ A filing prof- ┃│ A filing prof- │
│ essional takes ││ essional takes │┃ essional takes ┃│ essional takes │
│ over when a    ││ over when a    │┃ over when a    ┃│ over when a    │
│ filing needs   ││ filing needs   │┃ filing needs   ┃│ filing needs   │
│ one            ││ one            │┃ one            ┃│ one            │
└────────────────┘└────────────────┘┗━━━━━━━━━━━━━━━━┛└────────────────┘
```

   - Four white cards, 3 cols each, equal height, 32px inner margins, 1px Rule border, no shadow.
   - The plan name in `kicker` style. The price in `price-l` (44px) with " a filing" / " a month" in Plate Roman Text Italic 21px. The annual line in `small` Graphite.
   - The list in `body`, with lozenges.
   - **The last line of every card**, the owner's "A filing professional takes over when a filing needs one", is set apart at the foot of each card under a dotted rule, in Plate Roman Text Italic 17px, aligned to the bottom so all four line up across the row. It's the same promise on every card, so it sits at the same height on every card.
   - **Growth** (the stand-in's middle card) is printed on heavier stock: the 2px edge line from the home price card, the sheet shadow, and a 3px Copper rule along its top. That's all. There's no "most popular" ribbon, because the copy has none.
   - Under the cards in `small`: "Prices in US dollars, for partner firms. Building a filing product for many businesses? Talk to us about platform pricing."
   - Tablet: two by two. Phone: stacked full width, with Growth third as in the copy order, and its heavier stock kept.
3. **What counts as a filing (`#counts`).** h2 "What counts as a filing." · lede "Only live filings sent to a state or the IRS count. Rehearsals never do." · five items. They're set as a **definition ledger**: each bold lead ("One filing:", "Included:", "An EIN on its own:", "Copies and certificates:", "Unused filings") in Plate Roman Deck 20px in a left column (cols 7–8), and the rest of the sentence in `body` (cols 9–12), with a hairline between rows. Phone: lead above, sentence below.
4. **What's separate (`#separate`), a support section.** h2 "What's separate." · four items. They're set on a **slip**: a narrower white card (cols 7–12) tipped 0.6° counter-clockwise on desktop (flat on phone and with reduced motion), with V9 engraved small in its top-right corner. It's the errata slip of the trade, tucked in honestly, not hidden.
5. **Close.** h2 "Start with a free rehearsal." · lede · "Run a free rehearsal". The page-close pattern.

### 10.5 Security (`/security`)

A support page, so it gets plain, beautiful typesetting and no pictures. It should read like a letter from a careful firm.

1. **Title page.** Kicker "Security" · h1 "How we handle what you trust us with." · lede "Social Security numbers, cards and state logins, and how CoFile keeps each one."
2. **Five panels.** "Encrypted, masked SSNs" · "Cards in a vault, logins encrypted" · "Single-use links to the proof" · "Signatures only on approval" · "Separate accounts", each with its paragraph.
   - They're set as a **numbered ledger**, not as cards with icons. Each panel is a row with the h3 in Plate Roman Deck 22px in cols 1–4 and the paragraph in `body` in cols 5–11, with hairlines between rows. There are no locks, shields or check marks. The order is the copy's order.
   - Phone: h3 above, paragraph below.
3. **The links paragraph.** "The checks CoFile runs on every filing … Security questions: hello@cofile.app." in `lede` size on Cotton 2, with Copper underlined links.

### 10.6 Questions (`/faq`)

1. **Title page.** Kicker "Questions" · h1 "Questions, answered." · lede "Something else? hello@cofile.app".
2. **The fourteen questions**, as an index of disclosures (`<details>`), in cols 1–8 on desktop:
   - Each question is a 72px row: the question in Plate Roman Deck 22px Ink, and on the right a 20px lozenge outline that **fills with Copper** when open. There are no plus or minus signs.
   - Answers open below in `body` at 34em with 24px top padding and 32px bottom. Opening takes 200ms on height, and none with reduced motion.
   - Links inside answers are Copper and underlined.
   - Each item keeps its `id` (`#beta`, `#rehearsal`, `#approves` …). Arriving at an anchor opens that answer and gives its row a Copper Tint wash that fades over 2s.
   - **"Is a person involved?"** gets the one picture on the page inside its answer: a single P9 portrait (4:5, 200px wide) floated right. Where P9 isn't available, V4.
   - Phone: full width, rows 64px with the question at 19px.

### 10.7 For platforms (`/platforms`)

The page for builders, so it's printed on the plate room's dark stock.

1. **Title page, on a Plate Ink band** (`#1D2130`, Cotton text, in dark and light modes alike). Kicker "For platforms" · h1 "Building a filing product? Put CoFile underneath it." · lede. The **frontispiece is the 3D render** "The plate under the print" (7.4), running as its loop across cols 7–12 and bleeding into the right margin. The sheet floats above the copper plate and presses down. Poster frame for reduced motion.
2. **The list and the inquiry form (`#enterprise`)**, back on Cotton.
   - Left (cols 1–5): the five list items. The `"dryRun": true` is set in Founders Grotesk Mono 15px on a Night Card chip with Cotton text. "Read the API docs" is a Copper link.
   - Right (cols 7–12): **the inquiry form as an order form**, a white sheet with 40px margins.
     - At its top, CoFile's lockup at 24px and a 1px Rule. It's CoFile's own order form, so it carries CoFile's letterhead.
     - Fields, in the copy's order: "Name", "Company", "Work email", "Phone (optional)", "States you file in" (select: New York, New Jersey, Florida, Several of these, Other states too), "Filings per month" (select: Under 50, 50 to 250, 250 to 1,000, Over 1,000) and "What you'd like to do (optional)" (textarea, 4 rows).
     - Name and Company sit side by side on desktop, as do Work email and Phone. The rest are full width.
     - The honeypot field stays visually hidden.
     - The submit button, "Send", is primary and full width on phone.
     - The sent state: the sheet's fields fade to blind and the confirmation message the component returns appears in their place.

### 10.8 Sign-up, log-in, password and verification

**The account pages share one layout: the door and the card.** The left half is the form card. The right half is the firm's door, which is the reason they came.

**Sign-up (`/signup`).** Kicker "For firms" · h2 "Set up your firm's filing desk" · lede "For firms that file for their clients. Confirm your email, put your name and logo on the door, and choose which card pays the state's fees. Your first filing can be a free rehearsal: nothing filed, nothing paid." · the form · "Building a filing product? See CoFile for platforms."

```
┌──────────────────────────────────────┬─────────────────────────────────────────┐
│  FOR FIRMS                           │                                         │
│  Set up your firm's filing desk      │     (photo P3: the blank plate on       │
│  For firms that file for their       │      Harbor & Pine's door, live         │
│  clients. Confirm your email, …      │      engraving)                         │
│                                      │          ╱‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾╲               │
│  Firm name                           │          │ ⊖  Okafor &   ⊖ │ ← engraved  │
│  [ Okafor & Daughters CPA_______ ]   │          │    Daughters CPA│   as typed  │
│  Kind of firm  [ Choose one     ▾]   │          ╲_______________╱               │
│  Your name     [______________]      │                                         │
│  Work email    [______________]      │    ┌──────────────────────────┐         │
│  Password      [______________]      │    │ Okafor & Daughters CPA   │ ← the   │
│  Password again[______________]      │    │ ━━━━━━━━━━━━━━━━━━━━━━━━ │   letter-│
│  Phone (optional) [___________]      │    │ ──────────────────────── │   head, │
│  Website (optional) [_________]      │    │                          │   typeset│
│  [ … filings a month select … ]      │    └──────────────────────────┘         │
│  [        Create account         ]   │                                         │
│  Building a filing product? See      │                                         │
│  CoFile for platforms.               │                                         │
└──────────────────────────────────────┴─────────────────────────────────────────┘
```

(The firm name shown is a stand-in for whatever the visitor types. The page itself shows nothing until they type.)

- **Left (cols 1–6):** the form on a white sheet with 48px margins. Fields in the copy's order: "Firm name", the kind-of-firm select ("Choose one", "CPA or accounting firm", "Payroll company", "Fractional CFO firm", "Title company", "Something else"), "Your name", "Work email", "Password", "Password again", "Phone (optional)", "Website (optional)", the volume select ("Under 10", "10 to 50", "50 to 200", "Over 200"), and "Create account" (primary, full width).
- **Right (cols 7–12):** P3 at 4:5, full height of the form, with the **live engraving** (M9). As "Firm name" is typed, the name is cut into the brass, fitted to the plate: up to 18 characters on one line, longer names on two lines, at a minimum size of 60% of the plate's height before they shrink. Under the photo, a **typeset letterhead preview** on a small white sheet: the name in Plate Roman Deck 24px with the Firm Rule in Plate Ink (they haven't chosen a color yet). Until they type, the plate is blank and the preview shows only its rules. It's `aria-hidden`. The field is the real thing.
- Phone: the plate photo becomes a 16:9 strip (200px) above the form, and the letterhead preview is dropped.

**Check your email (`/signup/sent`).** Kicker "Your filing desk" · h2 "Check your email" · lede (both variants) · the hero-note line with "send the link again". A single centred card (520px), with V8 (the door seen from the step) above it at 160px.

**Log in (`/login`).** Kicker "Log in" · h2 "Welcome back" · lede "Firms go to their filing desk, platforms to their dashboard." · any notice · "Continue with Google" · the email form · "Log in" · the note line ("New here? …"). The same split as sign-up, but the right half is **P1** (Harbor & Pine's door with its name), because the visitor coming back already has a name on a door.
- "Continue with Google" follows Google's own published button rules: their mark, their colors, white button. That's their brand, used as they require, and the only third-party mark on the site.
- Notices (session ended, password changed, account ready, Google errors) appear above the form as notice slips (11.5).

**Forgot password, reset password, confirm email, session ended, invite expired.** The single centred card: 520px, white sheet, 40px margins, the kicker label, an h2 at `display-m`, the lede, the form, and the primary button full width. V8 sits small (120px) above the card on Cotton. The pending labels the components already have ("Sending…", "Saving…", "Confirming…") replace the button text, and the button holds its debossed state while pending.

### 10.9 Terms and Privacy

**The booklet.** These are long documents, so they're set as a well-printed booklet that a careful person might print out and read with a pen.

- Plate Roman Text 19/31, measure 68ch, in cols 3–10.
- A title page band: the h1 at `display-l` and the effective date in `small`.
- A **table of contents** at the top: section titles with dot leaders running to their section numbers, each a link.
- **Section numbers hang in the left margin** (cols 1–2) in Plate Roman Deck 20px, Copper. Headings are in Plate Roman Deck 24px.
- No pictures. The footer as usual.
- **Print stylesheet:** letter size with 1in margins. A running foot with "CoFile", the document title and the page number in 9pt. Links print their URL in brackets. The beta notice and header don't print.
- Phone: the section numbers move inline before their headings, and the text drops to 18/29.

### 10.10 404 and errors

**404 ("Page not found").** Centred on Cotton: V7, the blank Name Plate, engraved large at 360px wide and blind-embossed. Then "Page not found" at `display-m`, "The link may be old or mistyped." in `lede`, and "Go to the home page" as a secondary button. The empty plate says there's nothing here gently, and without a joke.

**Error ("Something went wrong").** No picture. It's a calm card: the h1 "Something went wrong", "This page couldn't load just now. It's usually a short hiccup on our side.", then "Try again" (primary) and "Log in again" (secondary). The reference line ("If it keeps happening, tell us this reference: …") is set in `small` Graphite with the digest in Founders Mono, selectable. A broken page shouldn't try to be charming.

**Firm-side errors** (the client link page's "This link has expired or isn't valid" / "Ask whoever sent it for a new one.", "This link can't be used", "This filing is no longer offered", the firm's signed-out page) use the **firm's letterhead** and the same calm card, never CoFile's plate.

### 10.11 The filing desk (`/p/<firm>`): the firm's working room

The firm's brand leads. CoFile is the imprint in the header.

**The desk header (every desk page).**

```
Desktop
┌─────────────────────────────────────────────────────────────────────────────────────┐
│ [H&P] Harbor & Pine CPA                       with CoFile   ana@harborpine… [Log out]│  72px, white
│ ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━│  Firm Rule
│ Filings   New filing   Ready to pay   Client links   Signatures   Setup   Billing     │  56px, nav
└─────────────────────────────────────────────────────────────────────────────────────┘
```

(The email shown is a placeholder for the signed-in user's own.)

- A white band, 72px. The firm's logo at 40px tall (3.5 rules) and its typeset name in the firm's font, 20px. On the right, the imprint "with CoFile" (13px Graphite), then the user's email (a 15px link to the password page), then "Log out" (small secondary button).
- **The Firm Rule** runs the full width of the window under the header. It's the firm's letterhead, stretched to the room.
- **The nav row**, 56px, on the firm's tinted ground (3.6). Links in 17px Founders Medium, Ink, 32px apart. The current one gets a 3px underline in the firm's Main color (deepened if needed).
- **Phone:** the header is 60px with the logo only (or the typeset name if there's no logo), the Firm Rule, then the nav as a single "≡" sheet `[copy needed: accessible name]` listing the links in 64px rows. No horizontal scrolling tab strips: older thumbs miss them.
- **Dark mode:** the header goes to Night Card with the logo on its little white plate (3.5). The Firm Rule keeps its colors.

**The ground.** The desk's page is the firm's tinted ground. Content sits in white sheets (no shadow; a 1px Rule border) on that ground, 1152px max, 17px base.

**Filings (the overview).** h1 "Filings" (`display-m`, in the firm's font), with "New filing" as a primary button on the right in the firm's color.
- **Notices**, as slips (11.5): "Real filings need an active subscription; rehearsals are free. Subscribe", "… ready to pay and need your card's security code. Pay and file", "… need someone to act."
- **The ledger table** (11.6): "Filing" (the business name as a link, 17px Medium, with a "Test" blind chip where it's a dry run), "Type", "Status" (status chip, 11.4) and "Started" (15px Graphite, tabular). Rows are 64px. Rows needing action show their chip in the **action** style in the firm's color, so the owner's eye finds her work.
- **Empty state:** V6 (the clear desk) at 200px, centred, with "Your desk is clear. Start a filing (it can be a free rehearsal), or send a client a link with your logo on it." in `lede`, and the buttons "New filing" (primary) and "Send a client a link" (secondary). It's the nicest empty desk a firm owner has ever seen.

**Setup ("Set up your account" / "You're set up").** The lede, then the three steps as a **ledger with lozenges**: "Your firm", "Branding", "Payment", each with its line ("Name, kind of firm and who to contact." …) and its button ("Set up your firm", "Set up branding", "Set up payment" / "Change"). A done step's lozenge is inked in the firm's color. The next step's button is primary and the others are secondary. Below that is the "Registered agents" card ("(optional)" in Graphite) with "Add agents" / "Change agents", and when everything is done, "Start a filing".

**Branding (step 2 of 3): the proofing room.** This is where a firm falls in love with the product, so it gets the most care of any desk page.

```
┌──────────────────────────────────────┬─────────────────────────────────────────────┐
│ STEP 2 OF 3                          │  ┌───────────────┐   ┌───────────────────┐  │
│ Branding                             │  │ phone: client │   │ the proof (top)   │  │
│ Your clients see your name, logo …   │  │ page, live    │   │ centred letterhead│  │
│                                      │  │ [logo] Name   │   │ ━━━━━━━━━━━━━━━━━ │  │
│ Your web address                     │  │ ━━━━━━━━━━━━  │   │ Two Sisters …     │  │
│ cofile.app/ [harborpine______]       │  │ Start your …  │   └───────────────────┘  │
│ Name your clients see [________]     │  │ [ Continue ]  │   ┌───────────────────┐  │
│ Logo [ drop a file, or link ]        │  │ with CoFile   │   │ email: Your proof │  │
│ Main color  [■ #2F4A3C]              │  └───────────────┘   │ is ready …        │  │
│ Second color [■ #3D6A8A]             │                      │ [Open your proof] │  │
│ Font [ Lora (serif)        ▾]        │  Buttons print in   │ with CoFile       │  │
│ Or upload your own …                 │  ■ #2F4A3C ✓        └───────────────────┘  │
│ Support email shown to clients […]   │                                             │
│ [ Save and continue ]                │                                             │
└──────────────────────────────────────┴─────────────────────────────────────────────┘
```

- **Left (cols 1–5):** the existing form: "Your web address" (with the site prefix in Graphite), "Name your clients see", the logo field, "Main color" and "Second color" (with their help text), "Font" (the presets, "Or upload your own …"), "Support email shown to clients", and "Save and continue".
  - **The color fields** are wide swatches (56px tall) with the hex beside them. Clicking one opens the system color picker plus a hex field.
  - **The logo field** is a drop zone drawn as a blind-embossed rectangle in the plate's proportion. On upload, the logo appears in it on white.
- **Right (cols 7–12): the stationery suite.** A live preview of every surface the firm's brand will touch, laid out like a stationer's sample layout, all updating as the fields change (`t-ink` crossfade):
  - the **client page on a phone** (the 9.2 component);
  - the **top of the proof** (centred letterhead, title, chip, button);
  - the **"proof is ready" email** (10.14);
  - the **desk header**.
- **The ink match, shown honestly.** Under the suite, a single line shows the button as it will print, a swatch of the color actually used, and either a small ✓ (the color prints as chosen) or the chosen color beside the deepened one with `[copy needed: one line explaining the deepened button color]`.
- Phone: the form first, then the suite as a horizontal snap carousel of the four previews. A small "see the preview" link sits under the color fields and jumps to the carousel `[copy needed: link text]`.

**Details, Payments and Agents (setup steps 1 and 3, and agents).** Standard form pages on a 640px white sheet with the step label ("Step 1 of 3"…) in the kicker style. Payments: "Main card" and "Backup card, used if the main one is declined" as selects, a select per filing type, and saved cards shown as **card plates**: chamfered white tiles with the card's label and last four digits. No card network art.

**New filing, by state then type.**
- "New filing" · "Which state is the business in?" · the "Filing types go live one at a time …" note · the "Or send us the details …" box (email, text, WhatsApp, Slack lines, with `/file` in Mono).
- **The state picker:** three **sample cards** (the 9.6 card): "New York", "New Jersey", "Florida" in Plate Roman Display 36px, each with its count line ("1 filing type, plus the federal EIN" and so on) in `small`. Hover lifts the card, and the whole card is the link. V10 sits small in the page's top right.
- **"<State>: what are you filing?"** · lede · **kind cards** (3 across on desktop): the title in Plate Roman Deck 20px, the chip ("Live" done chip, or "Rehearsal" blind chip with its title tooltip), the summary in `small`, and the fee note.
- **"Your pages for clients"** card: each service with its permanent URL in a **plate field** (11.2) and "Website widget: paste where the form should appear." with the snippet in a Mono code block and a copy button.

**New filing, the form (`/new/<kind>`).** "← Other filings" · h1 the kind title · the muted line with "Send them a link" · notices (filled from your message; the rehearsal notice) · "Start from a client you filed for before" (select + "Fill in") · the **intake form** (11.3) with its submit button **"Create the proof"** · the footnote. The page is a 760px white sheet on the tinted ground, with the firm's letterhead at the top left. The firm sees its own form exactly as its client will.

**Filing detail.** "← Filings" · h1 the filing's title · status chip and "Rehearsal" blind chip on the same line · the meta line in Graphite.
- **The stage rule** (new picture, `aria-hidden`; the status chip carries the meaning): the 9.5 progress rule across the page, with lozenges for the statuses the filing has passed, using the existing status labels ("Waiting for approval", "Approved", "Submitted to the state", "Accepted by the state", "Completed"…). Passed stages are inked in the firm's color and later ones are blind.
- **Next step** as a notice slip.
- **"Your proof is ready"**: when there's an approval link, this is the most important card in the product, so it's a **white sheet with the firm's Firm Rule along its top**. "Your proof is ready" in Plate Roman Deck 24px, the line "Check every detail and fee exactly as they'll go to the state, then approve it or ask for changes. Nothing is filed until you approve.", the primary button **"Open the proof and approve it"** (firm color, 56px), and the emailed / not-emailed line in `small`.
- "Save to Google Docs" (small secondary) with its note. Notices as slips.
- **Documents:** a row of **document cards** (the 9.5 component, 160px wide) with the label and kind, each a download link. When documents arrive, the envelope flap plays once (8.4).
- **EIN:** "EIN:" in `label` and the number in `figure-l`, Plate Roman Deck 26px. It's the moment the business becomes real, so it's set like an engraved number.
- **"Progress on the state site"** (disclosure): the run's steps as a vertical hairline with small lozenges and times in Graphite, tabular.
- The "missing information" form uses the standard form components.

**Client links ("Send a client a link").** Lede · the form ("Filing" select, "Who it's for (shown to you and the client)", "Make link", then "Copy link" and "Email it from your mail app") · "Links you sent" ledger (For, Filing, Made, Status, "Turn off"). Once a link is made, a **preview card** shows the client page it opens, with the firm's letterhead and the filing title, at 280px: the client's view, as a reassurance.

**Requests from a text or email ("Request by text message", "Request by email" …).** The meta line · the "Already sent as a filing" slip if so · the original message shown **as a bubble** (the 9.3 bubble, so the desk and the home page tell the same story) · the card "This looks like a request for: <filing>." with "We filled in N answers from your message." and the primary button "Open the filled-in form" · the disclosures "Not this filing? Choose another" and "Your message". For a deleted message, the notice slip with the 30-day line.

**Signatures ("Saved signatures").** Lede · ledger (Signer, Saved, Last used, "Remove" as a small danger button) · "Add a signature" · the **signature pad**: a white field 640 × 200px with a fine baseline 48px from the bottom, a small engraved "×" at its left end, and strokes in **Signature Ink** `#26336A` at a pressure-sensitive 1.5–3px width. Clear and save buttons sit below.

**Ready to pay.** Lede · each card's group of waiting filings · a single **code field** per card (4 digits max, 56px tall, Founders Mono 24px, letter-spaced 0.3em, `inputmode="numeric"`) with its button. "Nothing is waiting for a card right now." as an empty state with V6.

**Billing.** The existing billing panel and plan picker, using the **Pricing page's four cards** (10.4) inside the desk. The current plan's card carries the Firm Rule along its top instead of Copper: on the firm's own desk, the firm's ink marks the plan it chose.

**Password, and the firm's signed-out page.** The single centred card, on the firm's letterhead.

### 10.12 The proof: the page the firm approves

The firm opens it from its desk ("Open the proof and approve it") or from the "Your proof is ready to approve" email. It's one sheet on the firm's own letterhead, and it's the firm's own proof. It should feel like being handed a proof by a very good printer: every detail where it should be, plenty of white, and one place to initial.

**Desktop, a 760px sheet centred on the firm's tinted ground:**

```
┌──────────────────────────────────────────────────────────────────┐
│                         [ firm logo ]                            │  head margin 40
│                       Harbor & Pine CPA                          │
│ ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ │  Firm Rule
│ ──────────────────────────────────────────────────────────────── │
│ ╭──────────────────────────────────────────────────────────────╮ │  only on a
│ │ ▣ Rehearsal: nothing will be filed or paid, even if you      │ │  rehearsal:
│ │   approve.                                                   │ │  blind band
│ ╰──────────────────────────────────────────────────────────────╯ │
│ <Filing title>                                                   │  display-m
│ Filing reference … Please decide by December 3, 2026, 5:00 PM    │
│ Eastern. After that, this link stops working and you'll need …   │
│ ┌──────────────────────────────────────────────────────────────┐ │
│ │ By approving, you confirm every detail below is correct and  │ │  the terms,
│ │ authorize its submission exactly as shown, and payment of …  │ │  Bond panel
│ │ Government sites don't save drafts, so once you approve, …   │ │
│ └──────────────────────────────────────────────────────────────┘ │
│ The state's review page                                          │  display-s
│ This is a picture of the state's own review page, filled in …   │
│ ┌ · · · ───────────────────────────────────────────────────────┐ │
│ │                [ the state's screenshot ]                    │ │
│ └──────────────────────────────────────────────────────────────┘ │
│ Filing details                                                   │
│ Social Security numbers are masked on this page. …               │
│  Formation                                                       │  group heads
│  Business name ................ TWO SISTERS BAKERY LLC           │  (from the
│  …                                                               │   "›" paths)
│ State fees                                                       │
│ Nothing is charged on this page. These fees are paid to the …   │
│  Formation filing fee ·································· $100.00 │
│  NJ portal fee, by card ··································· $3.50 │
│  ──────────────────────────────────────────────────────────────  │
│  Total                                                  $103.50 │
│  Maximum you authorize   $… (if the state asks for more, we …)  │
│ One-time code sent to you  [ _ _ _ _ _ _ ]                       │  if required
│ What should change? (Needed only if you ask for changes)        │
│ [                                                              ] │
│ [        Approve, and authorize submission and payment         ] │  firm color,
│ [                     Request changes                          ] │  60px
│ Questions: support@…                                             │
│                           ────                                   │
│                        with CoFile                               │
└──────────────────────────────────────────────────────────────────┘
```

**Anatomy and rules:**

1. **Letterhead, centred** (3.5): the logo, the typeset name and the Firm Rule. The page's `<title>` stays "<firm>: approve filing".
2. **The rehearsal band** (only for a practice filing): a full-width blind-embossed band with the blind plate glyph and "Rehearsal: nothing will be filed or paid, even if you approve." in 17px Founders Medium, Ink. It's the same object as every other rehearsal mark on the site. It isn't yellow and isn't a warning: it's the blind impression.
3. **Title:** the filing title at `display-m` in the firm's font. The reference and deadline line is 16px Graphite, with the deadline ("December 3, 2026, 5:00 PM Eastern") in Founders Medium Ink so it's findable.
4. **The terms panel:** the approval consent, the EIN sentences when they apply, and "Government sites don't save drafts …" in a Bond `#F5F5F2` panel with a 1px Rule border, 24px padding, at 17/27. It has no icon and no yellow. It's the part of a proof you read slowly, so it's set to be read, not to alarm.
5. **The state's review page:** h2 at `display-s`, the paragraph, and the screenshot in the neutral screen frame (9.4) at full content width. This is the state's real page, shown as it is, at reduced size. Click to view it at full size in an overlay. It's the one place the state's own page appears, as evidence for the firm, never as decoration.
6. **Filing details:** h2, the SSN note when it applies, then the table. The rows' "A › B" labels are grouped: the first segment becomes a **group head** in the `kicker` style with 24px above, and the rest of the label sits in the row. The labels column is 38% wide at 15px Graphite, and the values are 17px Founders Text Ink. Masked SSNs ("***-**-1234") are set in tabular figures with the asterisks in Graphite. The table runs in the state's order and the design never reorders it.
7. **State fees:** h2, the paragraph, then the fee table with **dot leaders** and decimal-aligned amounts. "Total" is in Founders Medium with its amount in `figure-l` above a 1px Plate Ink rule. "Maximum you authorize" is its own row with its explanation in `small`.
8. **The decision:**
   - "One-time code sent to you" (when required): a single code field, 6 characters, Founders Mono 24px, letter-spaced, `autocomplete="one-time-code"`.
   - "What should change? (Needed only if you ask for changes)": a 3-row textarea.
   - **"Approve, and authorize submission and payment"**: the primary button, full content width, **60px tall**, in the firm's Main color (ink-matched), 19px Founders Medium. It's the biggest button anywhere in the product, and it's where the initials go: at the end, after everything has been read. **It's never sticky**, because a proof is approved at the foot, not from the top.
   - "Request changes": a secondary button, full width, 52px, 12px below.
9. **Questions** line in `small` Graphite, then the **imprint** at the foot.

**Phone:** the sheet is the screen (edge to edge, no shadow, 20px margins). The letterhead stays centred. The fee leaders shorten, and amounts never wrap. The review-page screenshot is full width and tap-to-zoom. The buttons are full width.

**Print:** a proper letter-size page. The letterhead prints at the top of page 1. The rehearsal band prints as a 0.5pt outlined box. The form and buttons don't print, and in their place go the filing reference and deadline. The foot carries the imprint and the page number. A firm may want a paper copy for the file, and it should look like it came from their own printer.

**The decision page** (after approving or requesting changes): the same letterhead and sheet. The heading at `display-m` with the Firm Rule drawing under it (8.4), then the paragraphs and the Questions line. Nothing else: no stamps, no seals and no "APPROVED".

**Expired or used link:** the same sheet with the engine's words, in a calm card.

### 10.13 The client's pages: the service page, the client link and the form

Clients see only these, so they're entirely the firm's.

**The service page** (`cofile.app/bestaccounting/llc-filing-new-york`, the stand-in's example address) **and the client link page** (titled "Your filing") share one layout:

```
┌──────────────────────────────────────────────────────────────────┐
│ [Best Accounting logo] Best Accounting               with CoFile │  white header
│ ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ │
├──────────────────────────────────────────────────────────────────┤
│        ┌──────────────────────────────────────────────┐          │  firm-tinted
│        │ ▣ This page is in rehearsal for now. You can │          │  ground
│        │   fill it in, but nothing will be filed …    │          │
│        │ <Kind title> · <label>                       │          │
│        │ <summary> After you send this, Best          │          │
│        │ Accounting checks every detail and fee and   │          │
│        │ approves exactly what will be filed. …       │          │
│        │ <fee note>                                   │          │
│        │ ── THE INTAKE FORM ──                        │          │
│        │ [ Send to Best Accounting ]                  │          │
│        │ Next, Best Accounting checks it and approves │          │
│        │ the filing. Nothing is filed until they do.  │          │
│        │ By sending, you agree to CoFile's Terms …    │          │
│        │ Questions? Email …                           │          │
│        └──────────────────────────────────────────────┘          │
└──────────────────────────────────────────────────────────────────┘
```

- **Header:** a white band with the firm's letterhead left-aligned (logo and name) and the imprint "with CoFile" on the right, as the code places it. The Firm Rule runs full width under it. On phone the imprint moves to the foot of the sheet.
- **The rehearsal notice** ("This page is in rehearsal for now. …") is the **blind band**, never a warning box.
- **The h1** is the kind title in the firm's font at `display-m`. On a client link the label follows after a middot in Graphite at the same size, regular weight.
- **The sentence** "After you send this, <firm> checks every detail …" is set in `lede` at 19px. It's the reassurance a client needs, in the firm's name.
- **The form** (11.3). The submit button reads "Send to <firm>" in the firm's color, full width on phone.
- **The footnote lines** are in `small`, with the Terms and Privacy links in Graphite underlined (not the firm's color: they're ours, and they're small).
- **The thank-you state** ("Thank you, we have your details." / "Next, the firm checks every detail and approves the filing. Nothing is filed or paid until it does. You can close this page."): the form is replaced in place by the heading at `display-m` with the Firm Rule drawing under it (8.4) and the line in `lede`. That's the client's whole ceremony. It's short, warm and in the firm's own colors.
- **The white-label hosted page** (`/e/<account>/<firm>/<service>`) is exactly this layout. The imprint slot carries whatever the account's white-label setup names, in the same 13px style.

### 10.14 Emails

**One template, two letterheads.** Filing emails carry the **firm's letterhead** (logo, name, Firm Rule) and the imprint at the foot. CoFile's own account emails carry **CoFile's letterhead** (the lockup and a 1px Plate Ink rule) and no imprint.

- 600px wide, white, 40px margins (24px on phone), inside a Bond `#F5F5F2` outer field.
- Fonts: Plate Roman and Founders load as web fonts where clients allow (Apple Mail, iOS). Fallbacks are Georgia for headings and Helvetica/Arial for body.
- The subject line is repeated as the email's h1 in 26px serif. The body is 17/27. **One bulletproof button** (HTML/VML, 52px tall, firm color, white 17px, chamfer as a 4px radius in Outlook). The support line comes next, then the imprint.
- **Dark-mode email clients:** the letterhead sits on a fixed white table cell with `color-scheme: light only` where supported, so the logo stays on white. Logos are requested as transparent PNGs in setup where possible.
- The preheader repeats the first sentence of the body (no new words).

| Email | Letterhead | What's designed |
|---|---|---|
| "Your proof is ready to approve: <title>" | Firm | The body. A **proof card** under it: a small white panel with the firm's letterhead edge, the filing title in serif 20px and the fee total in `figure-l`. Then the button "Open your proof". For a rehearsal, the "Rehearsal: nothing will be filed or paid, even if you approve." line sits above the body in a blind band |
| "More information needed: <title>" | Firm | The body, with the missing labels set as a short list |
| "Card security code needed: <title>" | Firm | The body and "Enter security code" |
| "Changes requested: <title>" | Firm | The body, with the comment quoted in serif italic |
| "Completed: <title>" | Firm | The body and the "Documents: …" line. The documents are listed as **document cards** (label and kind) with the V5 envelope vignette at 120px above them. It's the "papers come back" moment by email |
| EIN issued | Firm | A design is ready: the EIN set in `figure-l` on a document card. The copy is `[copy needed]`: the engine sends no EIN email today |
| "Rejected by the state: <title>" | Firm | Body only. No red, no icon |
| The firm-staff emails ("Choose a name", "Review before submit", "Site changed — review needed", "Portal bot check", "Failed", "Blocked", "Checking whether the state received") | Firm | Body and button. They're plain and quiet |
| "Confirm your email for CoFile" | CoFile | The button and V8 (the door) at 120px: their door is coming |
| "Your partner account is open" / "Your CoFile account is ready" | CoFile | The button, with the blank Name Plate engraved small above the text |
| "Reset your password" | CoFile | Body and button only |
| "You're invited to <firm>'s filing portal" | Firm | The firm's letterhead, the body and the button |

### 10.15 Platforms: the dashboard, the API docs and the embed

**The dashboard** (`/dashboard`) is CoFile's own working room for platforms: Cotton ground, CoFile's lockup in a 64px white header, and the nav "Overview", "Filings", "Ready to pay", "Firms", "API keys", "Webhooks", "Setup", "Team", "Billing" (and "Sign-ups" on the platform's own account), then "Docs". The current link has a Copper underline.

- **Overview:** the account name as h1. Notice slips. Then **three stat tiles** ("Filings", "Webhook deliveries", "API keys"), each a white card with the label in `kicker` style, the number in `figure-l` at 40px, and its sub-line in `small` ("N live, N rehearsals", "N pending, N failed", "Manage keys").
- **Charts** ("By status", "By state", "By month"): horizontal bars, 10px tall, in Plate Ink at 80%, on a Rule track, with values in tabular figures at the right. One ink and no rainbow. The state names stay as words.
- **API keys:** each key in a **plate field** (11.2) in Mono, with "Copy" and the key's dates.
- **Webhooks:** endpoints as ledger rows, and deliveries with status chips (done / warn / bad).
- Dark mode is the default suggestion for developers here: it follows the system setting, with no special case.

**The API docs** (`/docs`): **the specimen book.**

- A three-column layout. The left rail (cols 1–3) lists the guides in 15px with the current one inked in Copper. The content column is 68ch (cols 4–9). On wide screens, the right rail (cols 10–12) holds "On this page" anchors.
- h1 "CoFile API" at `display-l`. Guides' h2 at `display-s`.
- **Code blocks** on Plate Ink `#1D2130` with Cotton text, Founders Grotesk Mono 15/24, 24px padding, a copy button top right, and a 4-color syntax palette drawn from the site: Cotton for text, Copper (dark) `#DE8D62` for strings, Verdigris (dark) `#6FB39A` for keys, Graphite (dark) `#A9ABB5` for comments.
- **Method chips** (GET, POST, PUT, DELETE) are chamfered outline chips in Mono 13px caps. Same ink for all, no traffic-light colors.
- The **Guides grid** on the docs home: 2-column cards with the title in Plate Roman Deck 20px and the summary in `small`.
- The "For your tools and AI agents" line keeps its links to the Markdown, OpenAPI and llms.txt files.

**The embed widget** (`/embed/…`) sits inside someone else's website, so it has to look at home anywhere.

- No page ground, no header and no beta notice (the code already leaves it off). It's a white panel with 16px padding and no border or shadow, so the host page frames it.
- The firm's color and font apply. The fields and buttons are ours.
- At the foot: **"Filed with CoFile"** in the imprint style, left-aligned, 13px.
- It sizes to its content (the existing resizer). Its minimum width is 300px, where it switches to the phone layout.
