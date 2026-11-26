# Vitrina: the visual design of cofile.app

**Rosa Delgado** · visual communication design · Los Angeles and San Juan
Spec for the build team and the studios we commission · Nov 26, 2026

> Every word on these pages is the locked copy from `web/app/page.tsx` and the product's own
> pages. Where a picture or a control needs a word that doesn't exist yet, I've marked it
> `[copy needed]`. I haven't touched the argument or its order. This spec is about how it looks.

---

## 1. Who I am, and what I bring

I'm 53. I spent years designing for government digital services and for community
organizations: benefit applications, small-business grant programs, the kind of form a woman
fills in on her phone at the back of her shop between customers. Now I run a studio between Los
Angeles and San Juan that makes bilingual campaigns for small-business programs: posters,
bus shelters, storefront decals, the websites behind them.

Three things I bring to CoFile:

1. **People first, in the pictures and in the layout.** I photograph real small-business owners
   and the people who keep their books. Not stock, not models pretending to work. When a firm
   owner looks at this site, I want them to see their clients, and to see themselves standing
   next to them.
2. **Bold, warm color that still passes contrast.** Community posters are loud because they have
   to be read from across the street. That same discipline (big type, flat color, high
   contrast, nothing gray-on-gray) is exactly what a 62-year-old CPA reading on a laptop at 9 PM
   needs. Accessibility is how I make things beautiful, not a tax on it.
3. **Two languages designed together.** The copy is English today. Every layout here has been
   drawn so that Spanish (about a quarter longer, with ñ, ¿ and accents) drops in without a single
   container breaking, because the bakery on Grove Street may well get its proof in Spanish one
   day. I'm not proposing any Spanish words: that's the copy team's call.

---

## 2. The visual concept: Vitrina

**Vitrina** is the shop window. It's where a business paints its name, puts its best work on
display, and tells the street who it is.

The idea comes straight out of one line of the copy: **"Your name on the door. Ours in small
print."** Think of a sign painter lettering a name in gold leaf on an office door. When the
painter finishes, they sign their work, tiny, in the bottom corner of the glass. Nobody reads
it except the next shop owner who wants the same painter. That's CoFile. **CoFile is the sign
painter, not the sign.** The firm's name goes on the door, big and proud. CoFile signs small in
the corner: "with CoFile".

The whole visual system follows from that:

| The copy's selling story | How Vitrina shows it |
|---|---|
| **Your firm, your client, your name.** "Your name on the door. Ours in small print." | Every page a firm's client sees opens with **the Door**: a band in the firm's own color with its logo on a nameplate and its name in its own font. CoFile's only sign is a small "with CoFile" set in the band's bottom-right corner, exactly where a sign painter signs. The signature film on the home page shows a real sign painter gilding "Harbor & Pine CPA" onto a glass door. |
| **Effortless for everyone.** "You start it. Your client approves it. CoFile files it." | One hand-brushed line, **the Thread**, runs through the site and passes the work from the firm to the client to the papers coming home. Three people, one line, no machinery. A text message turns into a drafted filing in front of your eyes. |
| **A client experience to be proud of.** The proof. | The proof is the hero object of the site. It's drawn as a beautiful printed page on a printer's proofing table, next to business-card and invitation proofs, because the copy says "You've approved a proof before". It always wears the firm's colors, never ours. |
| **It does the work and brings the results home.** "The papers come back to you." | A homecoming: the state's documents arrive in an envelope printed in the firm's color and fan out onto the desk. Then a photograph of the first certificate framed on a shop wall, next to the first dollar bill. |
| **Try it free, for real.** "Rehearse on the real stage." | A real community theater, house lights down, warm light on an empty stage: the rehearsal with no audience. The rehearsal log sits on the stage like a script. |

**The look, in one paragraph.** Warm masa-colored paper, deep indigo ink, and the colors of a
Caribbean and Mexican-American main street: flamboyán red-orange, marigold, sea teal,
bougainvillea. Big friendly show-card lettering for headlines (the brush-made sans you see
painted on bodega windows), a calm, very legible humanist sans for reading. Photography of real
owners in their own doorways, and poster collages where those people are cut out and set on
flat arches of color, the way community screen-print posters have done it for fifty years. Real
silkscreen texture on the color, never on the words.

**Two worlds, one rule.** On **CoFile's own pages** (the public site, sign-up, docs, the
enterprise dashboard) Vitrina is vivid: full palette, photography, poster collage. On **a
firm's pages** (the filing desk, the client form, service pages, the proof, the client emails)
CoFile steps back to the sign painter's role: warm white paper, ink, the firm's color doing all
the talking, CoFile's colors absent, and the signature in the corner. The firm owner sees on our
site what we'll do for their name on theirs.

**What Vitrina is not built on.** No locks, shields, vaults, seals, stamps, checkmark badges or
"stop" imagery in the brand, the hero or the motion. The checks, the catch and security get clear,
calm, well-made sections where the copy puts them, but the signature moments are all about
people, names and ease.

---

## 3. Identity

### 3.1 The mark: the Doorway

A door with an arched window, the kind you find on storefronts from Old San Juan to Jersey
City to Little Havana. The window is **left blank on purpose**: it's where the firm's name goes.
In the door's lower-right corner, a short bar: the sign painter's signature, the "small print".

**Construction** (for the illustrator; unit `u`, drawn on a 12u × 16u box):

```
        ┌──── 12u ────┐
            ▄▄████▄▄           outer: rectangle 12u wide, straight sides
         ▄██▀▀    ▀▀██▄         10u tall, topped by a semicircle r = 6u
        ██  ▄▄▀▀▀▀▄▄  ██        (total height 16u). Bottom corners square:
        ██ █        █ ██        the door stands on the ground.
        ██ █ window █ ██       window: an inset arch, 2u from left, right
        ██ █        █ ██        and top. 8u wide, semicircle r = 4u, then
        ██ ▀▀▀▀▀▀▀▀▀▀ ██        straight sides 4u. Window bottom sits 10u
        ██            ██        below the top of the door.
        ██            ██       signature bar: 3u wide × 1u tall, from
        ██       ▀▀▀  ██        x = 7u to 10u, y = 13u to 14u (2u in from
        ██            ██        the right edge, 2u up from the bottom).
        ▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀
```

- **Fill:** door in Flamboyán `#C8341A`; window and signature bar cut through to the
  background (they read as Masa `#FFF7EC` on light, as Noche on dark).
- **One-color:** door in Tinta `#1F1B2D` (or Masa on dark), window and bar knocked out.
- **Corners:** the arch is a true semicircle; the window's inner corners at the sill get a 0.25u
  radius so it doesn't feel mechanical at large sizes. All other corners square.
- **Small sizes:** below 24 px tall, drop the signature bar (it turns to mush). Below 16 px
  (favicon), draw the 16 × 16 pixel version by hand: 2 px window inset, arch made of stepped
  pixels, no bar.
- **Clear space:** 4u on every side. **Minimum:** 16 px tall on screen, 6 mm in print.
- **Never:** put the mark on a photograph, outline it, add a gradient, tilt it, put a name or
  anything else in the window (the blank window is the point), or use it on a firm's pages
  except inside the "with CoFile" signature.

### 3.2 The wordmark: CoFile

"CoFile" in one word, capital C and F, lettered from **Vitrina Sans Bold** (the commissioned
display face, §5) and then hand-adjusted by the lettering artist:

- **C:** a round, open C. The terminals are cut at 12° like the lift of a flat brush, not
  sliced horizontally. Aperture wide: about 38% of the cap height.
- **o:** sits close to the C (tracking −20 units between them) so "Co" reads as a pair: the
  firm and CoFile, working together.
- **F:** the middle arm is 60% the length of the top arm, with the same brush-cut ends.
- **i:** **the dot is the Doorway**, a tiny filled arch, 1.4× the stem width wide and 1.8× tall.
  This is the only place the mark lives inside the wordmark. In one-color uses it takes the
  wordmark color; in full color it's Flamboyán.
- **l:** a small foot curving right, like a brush finishing a stroke.
- **e:** horizontal crossbar, open aperture, no sharp spur.
- Tracking: −1% at display sizes, 0 at 24 px and below.
- **Colors:** Tinta on Masa (default); Masa on Flamboyán; Masa on Tinta. On Marigold use Tinta.
  The i-dot is Flamboyán only on Masa and Marigold backgrounds; elsewhere it matches the letters.

**Lockup:** Doorway + wordmark side by side. The Doorway's height equals 1.3× the wordmark's
cap height; its bottom sits on the wordmark's baseline. Gap between them = 0.5× cap height.
In the lockup, the i-dot becomes a plain round dot (no two Doorways side by side).

Sizes: site header lockup 30 px cap height on desktop, 24 px on phone. Footer 22 px.

### 3.3 The "with CoFile" signature

This is the most important piece of the identity, because it's the only piece most of the
world will ever see. It must look like a craftsperson's signature: small, confident, settled.

```
                                   with CoFile
                                   ─────┬─────
              Adelle Sans Italic 400 ──┘   └── CoFile wordmark, cap height matched to
              in Muted ink                     the x-height of "with" × 1.35
```

- **Type:** "with" in Adelle Sans Italic, Regular; "CoFile" in the wordmark (not typed in a
  font), its cap height matched so the two words sit as one line. Doorway i-dot kept.
- **Size:** 14 px on desktop, 13 px on phone. Never smaller: it has to stay legible for an older
  client who wonders who CoFile is.
- **Color:** always neutral. Muted ink `#5E5668` on light pages, `#B9AFC4` on dark. **Never** the
  firm's color, **never** Flamboyán. CoFile does not bring its color onto the firm's pages.
- **Where:** directly under the firm's Door band, right-aligned to the content column, 10 px
  below the band. The sign painter's spot: bottom corner of the window. On every firm surface
  (filing desk, service pages, client form, proof, decision page, client emails) it's in the
  same place, so it becomes familiar and then invisible.
- **Link:** on client-facing pages (forms, proof, emails) it is **not** a link. We don't pull a
  firm's client away to our site. On the filing desk (staff only) it links to cofile.app in a new
  tab.
- **Embed widget:** the product's own words there are "Filed with CoFile". Same treatment, same
  size, bottom-right of the widget.

### 3.4 How a firm's logo sits on its pages: the Door

Firm logos arrive in every condition: a crisp SVG, a JPEG with a white box around it, a
letterhead scan, nothing at all. The Door is built so that every one of them looks deliberate.

```
DESKTOP (content column 960 px, band full-bleed)
┌──────────────────────────────────────────────────────────────────────────┐
│ ███████████████████████████ firm color band, 96 px ████████████████████ │
│ ██  ┌───────────┐                                                     ██ │
│ ██  │ nameplate │   Harbor & Pine CPA                                 ██ │
│ ██  │  (logo)   │   firm font, 26 px                                  ██ │
│ ██  └───────────┘                                                     ██ │
│ ████████████████████████████████████████████████████████████████████████ │
│                                                          with CoFile    │
└──────────────────────────────────────────────────────────────────────────┘

PHONE (band 72 px)
┌────────────────────────────────┐
│████████████████████████████████│
│██ ┌──────┐ Harbor & Pine CPA ██│
│██ └──────┘  firm font, 20 px ██│
│████████████████████████████████│
│                    with CoFile │
└────────────────────────────────┘
```

**The nameplate** (where the logo sits):

- Logo box: max 52 px tall × 240 px wide on desktop; 36 × 160 on phone. Scaled to fit, never
  stretched, never cropped.
- **Transparent logo (PNG/SVG with alpha):** sits straight on the band, no plate, if it has at
  least 3:1 contrast against the band. If it doesn't (a dark-green logo on a dark-green band),
  it gets a plate.
- **Logo on a solid background** (detected by sampling the four corner pixels; if they match
  within ΔE 3): it gets **a plate**, a rounded rectangle (8 px radius) filled with the sampled
  corner color, padded 8 px all round, with a 1 px inner line in that color darkened 8%. The plate
  looks like an enamel or brass nameplate screwed to the door, not a pasted box.
- **No logo:** a monogram plate. Up to two initials from the firm's display name (the first
  letters of the first two significant words, skipping "&", "and", "the", "of", "LLC", "CPA",
  "PC", "Inc"), set in the firm's font, Bold, in a 52 px circle in the band color's accessible
  light tint, letters in the band color. "Harbor & Pine CPA" becomes "HP".
- The **firm's name** always appears next to the logo, in the firm's font (Bold if available,
  else the heaviest weight), 26 px desktop / 20 px phone, in the band's text color. On a phone,
  names longer than 28 characters wrap to two lines (never truncate a firm's name).

**The band** (the firm's color, done right): see §4.5 for the full color algorithm. In short:
the band is the firm's primary color at full strength; its text flips between white and ink for
contrast; very pale colors become a white band with an 8 px rule of the color along the top.

**The firm's font:** used for the firm's name, all headings, and button labels on its pages.
Body text and form fields stay in Adelle Sans, for legibility, unless the firm's font is on our
vetted list of text faces (Lato, Source Sans, Inter, Open Sans, Merriweather, Lora, Libre
Franklin, Work Sans, Nunito Sans, IBM Plex Sans, Roboto, Noto Sans, and their kin), in which case
body follows it too. Uploaded custom fonts are always headings-only.

**The firm's secondary color:** used only for the Thread line on its pages, selected states in
pickers, and the stage meter fill. Never for text, never for the primary button.

**What never changes on a firm's pages, whatever the firm picks:** status colors (they have to
mean the same thing everywhere), the focus ring, the error color, the field borders and the
"with CoFile" signature.

### 3.5 Example firm, for every mockup

The copy's example firm is **Harbor & Pine CPA**. For mockups we commission one example logo:
a simple round monogram "H&P" with a single line of water under a pine, drawn by the
illustrator in two flat colors. It's labelled "example firm" wherever the copy labels it.

- Primary: Pine `#2F5D50` (white text on it 7.49:1).
- Secondary: Brass `#B8893A` (decorative only).
- Font: a warm transitional serif from the vetted list (Lora, Semibold) so mockups show a firm
  font that isn't ours.

No other example firm names are invented. Where a mockup needs to show "any firm", it shows
Harbor & Pine's Door repainted in other colors (§9.4).

---

## 4. Color

### 4.1 The idea

Main-street color. The palette is taken from the walls, awnings and flowers of the
neighborhoods these firms serve: the red-orange of the flamboyán tree in bloom in June, the
marigold of cempasúchil, the teal of a Caribbean doorway, the magenta of bougainvillea over a
fence, all on warm masa-colored paper with a deep indigo ink. Bold, flat, poster-like. Every
pairing that carries words has been checked against WCAG 2.2 (ratios below are measured).

### 4.2 The palette (light)

| Name | Hex | Role | Key contrast |
|---|---|---|---|
| **Masa** | `#FFF7EC` | Page paper on CoFile's pages | Tinta on it 15.8:1 |
| **Arena** | `#F6E9D6` | Alternate section paper, table zebra, quiet panels | Tinta 14.0:1, Muted 5.8:1 |
| **Tinta** | `#1F1B2D` | Ink: text, the dark band, the button's print shadow | on Masa 15.8:1 |
| **Muted ink** | `#5E5668` | Secondary text, captions, "with CoFile" | on Masa 6.6:1 |
| **Flamboyán** | `#C8341A` | The CoFile color: primary buttons, the Doorway, the closing poster | Masa text on it 5.0:1; white 5.3:1 |
| **Flamboyán deep** | `#9C2A14` | Links and small red text on Arena; error text; the pressed button | on Masa 7.2:1 |
| **Cempasúchil** | `#F5B323` | Marigold: poster fields, highlights, the focus ring | Tinta on it 9.1:1. **Never** text on light paper. |
| **Caribe** | `#0B7A75` | Sea teal: "Live", success, the Thread on our pages, charts | white on it 5.2:1, on Masa 4.9:1 |
| **Buganvilla** | `#B52A62` | Bougainvillea: a third poster field, used sparingly (Requests, sign-up) | Masa on it 5.7:1 |
| **Line** | `#E6D8C3` | Hairlines and card edges (decorative only) | 1.3:1, never meaningful alone |
| **Field edge** | `#8C7B65` | Borders on inputs, checkboxes, the table's outer edge | 3.9:1 on Masa (non-text ≥ 3:1) |

**Tints** for chips, highlights and panels:

| Tint | Hex | Text on it |
|---|---|---|
| Flamboyán tint | `#FBE3DA` | Flamboyán deep `#9C2A14` 6.2:1 |
| Cempasúchil tint | `#FCE7B0` | Marigold deep `#7A5A00` 5.2:1, Tinta 13.7:1 |
| Caribe tint | `#CDEBE6` | Caribe deep `#0B5F5B` 5.9:1 |
| Buganvilla tint | `#F6D6E2` | Buganvilla deep `#8A1F4A` 6.6:1 |
| Neutral tint | `#EFE6D8` | Tinta 13.6:1 |

**Rules that keep it honest:**
- Flamboyán text is allowed on Masa and white (≥ 4.99:1) but **not** on Arena (4.4:1). On Arena,
  red text is Flamboyán deep.
- Caribe text on Arena is 4.3:1: large text only (≥ 24 px). Small teal text uses Caribe deep.
- Marigold never carries text on paper, and never sits behind white text. It's a field color:
  Tinta words on marigold, always.
- Marigold on Flamboyán (2.9:1) is a poster pairing for shapes only, never for words.

### 4.3 How much of each

On CoFile's own pages, roughly: **60% Masa and Arena, 20% Tinta (type and one dark band),
10% Flamboyán, 6% Cempasúchil, 3% Caribe, 1% Buganvilla.** Flamboyán is the voice: it appears on
every primary button and on the closing poster, and nowhere decorative enough to compete with a
button. Marigold is the warmth: the hero's arch, the highlighter on the proof, the focus ring.
Teal means "live" and "done", and draws the Thread. Bougainvillea appears in only two poster
fields on the whole home page, which is why it's memorable.

**Section rhythm on the home page** (paper color by section): Masa (hero) → Masa (process) →
Arena (the proof) → Masa with the full-bleed film (firms) → Masa (requests) → Arena (checks) →
Masa (after) → Tinta (rehearsals: the theater is dark) → Masa (coverage) → Arena (the catch) →
Arena (security) → Tinta (enterprise) → Flamboyán (close) → Tinta (footer). Never two dark
sections in a row; the dark rehearsal stage and the dark enterprise foundation are separated by
four light ones.

### 4.4 Dark mode

Dark mode is a night street: shop windows lit from inside.

| Name | Hex | Role | Key contrast |
|---|---|---|---|
| **Noche** | `#17131F` | Page | Text 15.9:1 |
| **Noche raised** | `#231D2E` | Cards, panels | Text 14.2:1 |
| **Noche high** | `#2E2639` | Hover, selected rows | Text 12.6:1 |
| **Text** | `#F6EEE3` | Body and headings | |
| **Muted** | `#B9AFC4` | Secondary text | on Noche 8.7:1, on raised 7.8:1 |
| **Flamboyán bright** | `#FF7A5C` | Primary button fill (label in Noche, 7.1:1), links | on Noche 7.1:1 |
| **Cempasúchil bright** | `#FFC447` | Highlights, focus ring | on Noche 11.5:1 |
| **Caribe bright** | `#3FC1B4` | Live, success, the Thread | on Noche 8.3:1 |
| **Buganvilla bright** | `#F06A9C` | Poster fields | decorative |
| **Field edge** | `#6A5F78` | Input borders | 3.1:1 |

Dark status chips: ok `#7FE0D4` on `#123B39` (7.9:1); warn `#FFC447` on `#3D2F0B` (8.2:1); bad
`#FF9C84` on `#44190F` (7.4:1); neutral `#F6EEE3` on `#2E2639`.

In dark mode the Tinta sections (rehearsals, enterprise) become Noche raised with a 1 px
`#3B3346` top rule, so they still read as a change of scene. The Flamboyán closing poster stays
Flamboyán (it's a poster, it doesn't dim) with Masa type. Photographs are never inverted or
tinted; their arches sit on Noche, and cut-out portraits get a 2 px Masa keyline so they don't
dissolve into the dark.

### 4.5 Firm colors: how any firm's color looks its best

The firm gives us a primary and (optionally) a secondary hex. Some are gorgeous, some are the
`#00FF00` their nephew picked in 2009. The system makes every one of them look intentional and
pass contrast, without the firm doing anything. Computed once when the color is saved, in OKLCH,
and stored as five tokens:

1. **`--firm-band`**: the color exactly as given. The Door band, the large monogram, illustration
   color plates. We never change the firm's color where it's a big field: that's their brand.
2. **`--firm-on-band`**: white `#FFFFFF` if white on the band is ≥ 4.5:1; else Tinta
   `#1F1B2D` if that is ≥ 4.5:1 (it will be). Used for the firm name and anything on the band.
3. **`--firm-action`**: the button fill. If white on the firm color is ≥ 4.5:1, it's the firm
   color. If not, step OKLCH lightness down by 0.03 (keeping hue and chroma, clamping chroma to the
   sRGB gamut) until white passes 4.5:1. A sunny yellow firm gets a deep golden-ochre button; a
   light blue firm gets a confident mid-blue. Same family, readable.
4. **`--firm-action-deep`**: `--firm-action` with lightness −0.12: the button's print shadow and
   pressed state, and firm-colored links on paper (re-checked to ≥ 4.5:1 on the page paper).
5. **`--firm-tint`**: lightness 0.95, chroma × 0.35: selected rows, the monogram plate, the
   highlighter in the firm's proof. Tinta text on it is always ≥ 12:1.

**Edge cases:**
- **Very pale firm colors** (OKLCH L > 0.88): the band would look washed out, so it becomes a
  white band with an 8 px top rule in `--firm-action`, firm name in Tinta.
- **Near-black firm colors** (L < 0.25): fine as a band; the action stays as given; the tint gets
  a hue lift so it isn't a muddy gray.
- **Neon or out-of-gamut colors** (chroma > 0.25): the band keeps the color; the action color's
  chroma is clamped to 0.2 so buttons don't vibrate.
- **Red firm colors** (hue 15° to 40°, chroma > 0.12): errors on that firm's pages switch from
  red-only to red plus the error glyph and a Tinta outline, so an error never looks like the
  firm's own button.
- **Teal or green firm colors** close to Caribe: the "Live" chip adds its glyph and a Tinta
  outline so it doesn't blend with firm elements.

**The firm-facing preview** (Setup → Branding, §10.2) shows all five tokens live on a miniature
Door, a form, a button and a proof, so the firm sees their color done right before any client
does.

**Neutral paper on firm pages.** Firm pages use their own quieter paper set, so our masa
doesn't fight their color:

| Name | Hex | Role |
|---|---|---|
| Papel | `#FFFDF9` | Page (Tinta on it 16.5:1, Muted 6.9:1) |
| Sheet | `#FFFFFF` | Cards, the proof sheet, fields |
| Rule | `#E9E2D8` | Hairlines |
| Field edge | `#8C7B65` | Inputs (4.0:1 on Papel) |

---

## 5. Typography

### 5.1 The faces

**1. Vitrina Sans: commissioned display face (headlines, the wordmark).**
A one-stroke **show-card gothic**: the brush-made sans that sign painters have used for
"OPEN", "SALE" and a shop's name on its window for a hundred years, from bodega windows in the
Bronx to the panaderías of Hialeah. We commission a foundry with Latin American type designers on
staff to draw it from research (photographs of hand-painted storefronts in New York, Jersey
City, Newark, Miami, Orlando and San Juan, plus interviews with two working sign painters).

- Character: upright, slightly condensed (width about 88% of a neutral grotesque), generous
  x-height (0.54 em), terminals finished with a soft brush cut at 12°, stroke contrast barely
  there (vertical strokes 6% heavier than horizontals, the way a flat brush lays paint), round
  shapes slightly squared at the shoulders. Friendly, sturdy, never cute.
- Weights: **Medium (500), Bold (700), Black (850).** Bold is the workhorse.
- Optical size: one design, with a separate **Vitrina Sans Display** cut (tighter spacing, finer
  brush detail) for 56 px and up.
- Language support: full Latin Extended-A, so Spanish (á é í ó ú ü ñ ¿ ¡), Portuguese, French,
  Vietnamese diacritics on the roadmap. The ñ tilde and the ¿ must be drawn with as much care as
  the C.
- Figures: lining and tabular, so "$103.50" sits square in a headline.
- Delivered as variable WOFF2 with `wght` axis 500 to 850.
- **Interim until it's delivered (about 16 weeks):** **Tablet Gothic** (TypeTogether)
  Semi Condensed, Bold and Extra Bold. It's the closest temperament available today, has
  excellent Spanish support, and its widths let us match the commission's proportions.

**2. Adelle Sans (TypeTogether): reading and interface.**
A humanist sans built for reading on screens: large x-height, open counters, distinct
I / l / 1, and a double-story "a" that doesn't close up at small sizes. Warm without being
casual. It comes from a type foundry co-founded by Latin American and European designers, has
a vast language range, and has true italics (the "with" in the signature is its italic).
Weights used: **Regular 400, Semibold 600, Bold 700**, plus Italic 400.

**3. Adelle Mono (TypeTogether): exact values.**
For what gets typed into a state's form, exactly as it'll go: business names in capitals,
addresses, fees, filing references, the EIN, API code. Same family as the text, so values sit
next to labels without the jolt of a coding font. Regular 400, and Semibold 600 for totals.
(If the build team needs a free fallback for the API docs, JetBrains Mono at 95% size sits close.)

**4. Commissioned lettering (not a font).** The "with CoFile" signature and the gold-leaf
lettering of "Harbor & Pine CPA" in the signature film are drawn by a sign painter, by hand.

**Pairing logic:** Vitrina Sans speaks (headlines, big numbers, the poster moments). Adelle Sans
explains (everything you read). Adelle Mono shows what will be filed (values only, never
sentences). That's it: three voices, each with one job.

### 5.2 The scale

Base 19 px body on desktop, 18 px on phone, because the readers are 40 to 65 and reading after
work. Ratio about 1.25 at the small end, opening up at the display end.

| Token | Use | Face / weight | Desktop size / line | Phone size / line | Tracking |
|---|---|---|---|---|---|
| `display-xl` | Hero headline | Vitrina Sans Display Bold | 76 / 78 | 44 / 47 | −1.5% |
| `display-l` | Close poster headline | Vitrina Sans Display Black | 88 / 88 | 48 / 50 | −1.5% |
| `h2` | Section headlines | Vitrina Sans Display Bold | 54 / 58 | 34 / 38 | −1% |
| `h3` | Step titles, card titles, security heads | Vitrina Sans Bold | 28 / 34 | 24 / 30 | −0.5% |
| `h4` | Small headings in product | Adelle Sans Bold | 21 / 28 | 20 / 26 | 0 |
| `kicker` | Hero kicker, section eyebrows | Adelle Sans Semibold | 17 / 24 | 16 / 22 | +1% |
| `lede` | Section ledes, hero sub | Adelle Sans Regular | 23 / 35 | 20 / 31 | 0 |
| `body` | Body text, list items | Adelle Sans Regular | 19 / 30 | 18 / 28 | 0 |
| `body-strong` | Inline emphasis, labels | Adelle Sans Semibold | 19 / 30 | 18 / 28 | 0 |
| `ui` | Buttons, nav, fields | Adelle Sans Semibold | 18 / 24 | 18 / 24 | +0.5% |
| `small` | Notes, captions, the beta note | Adelle Sans Regular | 16 / 25 | 16 / 24 | 0 |
| `micro` | "example", "test details", figure captions | Adelle Sans Semibold | 14 / 20 | 14 / 20 | +2% |
| `value` | Filing values on the proof | Adelle Mono Regular | 17 / 26 | 16 / 24 | 0 |
| `value-total` | Totals | Adelle Mono Semibold | 20 / 28 | 18 / 26 | 0 |
| `stat` | Big numbers on dashboards | Vitrina Sans Bold, tabular | 48 / 52 | 40 / 44 | −1% |

Fluid between breakpoints with `clamp()`; e.g. `h2: clamp(2.125rem, 1.2rem + 2.6vw, 3.375rem)`.

**Hard floors:** nothing a person needs to read is under 14 px, and nothing longer than six words
is under 16 px. Legal lines in the footer are 15 px, not the 11 px people expect from fine print:
the catch section's whole promise is that our fine print is readable.

### 5.3 Typographic rules

- **Sentence case everywhere,** exactly as the copy writes it. No all-caps headlines (they hurt
  older eyes and Spanish accents). The only capitals are the values the state demands
  ("TWO SISTERS BAKERY LLC"), which are set in Adelle Mono because they are values.
- **Headline measure:** at most 18 words wide, usually 10 to 14. Balanced with
  `text-wrap: balance`. Body measure 60 to 70 characters.
- **Highlighting words in headlines:** none. The copy's headlines are complete thoughts; no word
  gets a different color.
- **Numbers:** fees and totals always tabular figures, right-aligned in tables, `$` hung outside
  the column on desktop.
- **Links:** underlined always (1.5 px, offset 3 px), in Flamboyán deep on paper. Not color alone.
- **Lists:** the copy uses many lists. Vitrina never uses the same bullet twice in a row on the
  home page (see §9): numbered chips for the proof, plaques for firms, plain hanging numerals for
  the catch, small object icons for security, and so on. Repetition of ticks is one of the things I
  strip (§14).
- **Spanish:** `lang` set per element when content is Spanish; `hyphens: auto` for Spanish body
  only (never headlines); ¿ and ¡ hang outside the left margin by their own width in display sizes,
  the way a good sign painter optically aligns them.

---

## 6. Layout

### 6.1 Grid

| | Desktop ≥ 1200 | Laptop 960 to 1199 | Tablet 640 to 959 | Phone < 640 |
|---|---|---|---|---|
| Columns | 12 | 12 | 8 | 4 |
| Max content width | 1240 px | 100% | 100% | 100% |
| Outer margin | auto (min 48) | 40 | 32 | 20 |
| Gutter | 24 | 24 | 20 | 16 |
| Reading column | 7 columns (≈ 700 px) | 7 | 8 | 4 |

The **firm's pages** use a narrower frame: one centered column, 760 px for forms and the proof,
1080 px for the filing desk's tables. The Door band is always full-bleed.

### 6.2 Spacing

A 4 px base, used as these steps only: **4, 8, 12, 16, 24, 32, 48, 64, 96, 128, 176.**

- Section padding (home): 128 top / 128 bottom on desktop, 96 on laptop, 72 on phone. The hero
  gets 96 top (it sits under the header) and 128 bottom.
- Headline to lede: 24. Lede to content: 48 desktop, 32 phone.
- Between paragraphs: 0.8 em. Between list items: 20 px (lists are where people slow down).
- Cards: 32 px padding desktop, 24 phone. Form fields: 24 between fields, 48 between groups.

### 6.3 Shapes

- **The arch** (semicircular top, square bottom) is Vitrina's signature container, used **only
  for pictures**: photographs, poster fields behind cut-out portraits, illustration frames. Text
  never goes in an arch (it wastes the top and it's harder to read).
- **Cards and panels:** rectangles, 14 px radius, 1 px Line edge, no blurred shadows.
- **Pinned objects** (the proof, the text message, the rehearsal log, documents): rectangles with
  a **print shadow**: a solid offset of 6 px down and 6 px right in Tinta at 100% (or the firm's
  `--firm-action-deep` on firm surfaces). It's the look of a screen-printed object slightly out
  of register, and it makes the product objects feel like real things on a table.
- **Buttons:** 12 px radius, with a 4 px print shadow (see §11).

### 6.4 How pages breathe

- **Desktop:** the home page alternates between a **split** (copy in columns 1 to 6, the object
  or picture in 7 to 12) and a **full-bleed moment** (the Door film, the theater, the closing
  poster). Splits alternate sides: object right, then left, then right, so the eye walks down the
  street, window to window.
- **Phone:** one column, always copy first, then the object, at full width minus margins. The
  pictures keep their arches but drop to 4:5. Nothing sits side by side except chips and two
  short buttons. Sticky elements: only the header (60 px, condensed).
- **Vertical rhythm on a phone** follows a "read, see, read" beat: no section opens with a
  picture, and no two pictures are adjacent without words between them.

### 6.5 Breakpoint behaviour of the header

- Desktop: lockup left; nav links centered ("How it works", "For firms", "What we file",
  "For platforms"); right: "Log in" (quiet button) and "Run a free rehearsal" (primary).
  Height 80 px, shrinking to 64 px after 120 px of scroll.
- Phone: lockup left (24 px cap height), "Run a free rehearsal" as a compact primary button
  right (44 px tall, 16 px label), and a menu button with three lines plus the word
  `[copy needed: "Menu"]` for people who don't read hamburger icons. The menu opens a full-height
  Masa sheet with the four links at 24 px, "Log in" and the primary button, and the support email.

---

## 7. Art direction

### 7.1 Principles for every picture

1. **Real people in their own places.** We photograph working small-business owners and working
   firm staff (CPAs, payroll people, fractional CFOs, title officers) in New York, New Jersey and
   Florida, the places CoFile files. No stock, no models in borrowed aprons. Casting is done
   through local chambers of commerce, small-business development centers and community
   organizations, in English and Spanish, and everyone is paid a proper day rate.
2. **Nobody is given a name, a quote or a business that isn't theirs.** The photographs show the
   kind of people firms serve. They are never captioned as customers, never quoted, and never
   implied to use CoFile. The example story (Harbor & Pine CPA, Two Sisters Bakery LLC, Ana Ortiz)
   lives only on the product objects (the proof, the text message, the log, the papers), where the
   copy already labels it "example", "test details" or "not a real business".
3. **No legible real business names or logos in any frame.** Signage is shot soft, from inside
   (reversed and out of focus), or out of frame. It protects people from looking like endorsers
   and keeps the only legible name on our pages the firm's.
4. **No government look, anywhere.** No seals, eagles, state outlines, capitol domes, flags,
   official-looking certificates or IRS-like letters, in photographs, props or illustrations.
   Documents are generic paper with abstract lines, drawn by our illustrator.
5. **Age, honestly.** Most firm owners we show are 40 to 70, with reading glasses, gray hair and
   good posture. Clients range from 20s to 60s. Mix of Latino, Black, Asian, white, Caribbean,
   South Asian and Middle Eastern owners, the real mix of these states' main streets. Bodies of
   every size. At least one owner using a cane or a wheelchair across the set, without making it
   the subject.
6. **Hands at work, not hands at laptops.** No handshakes, no thumbs-up, no pointing at screens,
   no headsets, no glass-walled offices, no one jumping for joy. People do what they do: knead,
   measure, count a drawer, sign a lease, look at their phone with a small private smile.
7. **Warm, true color.** Graded warm (white balance about 5200 K, a gentle lift in the shadows
   toward Tinta, never orange skin). Skin tones are checked on a calibrated monitor against the
   subject in person. No heavy filters, no fake film grain on photographs (the grain belongs to
   the screen-printed color fields).
8. **The subject sees the pictures first.** Every person approves their selects before we use
   them. Releases are bilingual. Pictures of a person are retired on request, no questions.

### 7.2 Four kinds of picture

**A. Doorway portraits** (environmental). The owner in their own doorway or behind their own
counter, facing the camera, at eye level, natural light from the street. 35 mm and 50 mm lenses,
f/2.8 to f/4 so the shop behind is readable but soft. Always cropped into **the arch** on the
site. Used for firm owners (the Firms section, sign-up) and clients (the After section, emails).

**B. Cut-out portraits** (poster collage). People shot full-length or three-quarter against
a clean gray backdrop on location (a portable backdrop set up in their own shop, so the light is
theirs), then silhouetted by a retoucher and set on flat **arch fields** of palette color. Each
cut-out keeps a 6 px **paper edge** in Masa, cut slightly irregular, the way you'd cut a
photograph out of a magazine and paste it onto a poster. This is the look of fifty years of
community screen-print posters, and it lets people stand right next to the product objects.

**C. Still lifes.** Tabletop and wall photography of real objects: the printer's proofing table,
the framed first certificate, the envelope arriving. Shot by a still-life photographer, top-down
or at 30°, on real surfaces (a worn wood counter, a print shop's light table).

**D. The film.** One short film, the signature moment: a sign painter lettering "Harbor & Pine CPA"
in gold leaf on a glass door (§7.4).

### 7.3 Shot list

| # | Where it's used | What the picture shows | Mode | Notes |
|---|---|---|---|---|
| H1 | Home hero | **Two sisters who run a food business together** (real sisters, 30s to 50s), in aprons, flour on their forearms. One holds her phone at chest height and reads it; the other leans on her shoulder, reading the same screen. Both have a quiet, pleased look: the moment of "that's us". Phone back to camera; we never fake a screen. | B, cut-out, 3/4 length | Shoot 3 gestures: reading; one pointing at the screen with a little laugh; both looking up toward the viewer. Alt text `[copy needed]`. |
| P1 | Process: "You start it." | A firm owner in her 50s at her own desk, reading glasses pushed up, forwarding a message on her phone with one thumb, coffee in the other hand. | B | The client's file folders on the desk are plain manila, no labels legible. |
| P2 | Process: "Your client approves it." | A contractor in his 40s in the cab of his work truck, phone in hand, reading carefully. | B | Truck door lettering out of frame. |
| F1 to F4 | Firms section strip; sign-up; log-in | Firm owners and staff at their offices: a Black CPA in her 60s at her office door; a Korean-American payroll firm owner in his 50s at his reception counter; a Cuban-American fractional CFO in her 40s with a client at a small round table; a title officer in his 60s in a closing room with a pen. | A | Their own offices. Door lettering shot from inside, soft. |
| R1 | Requests | Tight on two hands, flour-dusted, typing on a phone on a bakery counter. | B (hands only) | Placed behind the text-message bubble. |
| W1 | After | **The first certificate on the wall**: a framed document hung on a shop wall beside a framed first dollar bill, a small plant, a family photo, a calendar. Morning light. | C | The document is a prop drawn by our illustrator: a plain sheet with a simple border in Pine and abstract lines. Nothing official. |
| W2 | After, phone | Detail of W1: the frame and the dollar. | C | |
| T1 | Rehearsals | **An empty community theater** from the back of the house, slightly raised: red curtain open, warm pool of light on a bare stage, a single **ghost light** (the bare bulb on a stand theaters leave on overnight) at center, rows of empty seats. | A (place) | A real community theater or school auditorium in Jersey City, Newark or Miami. Shot at dusk with practicals. |
| T2 | Rehearsals, phone | The ghost light, close, with the curtain behind. | A | |
| PR1 | The proof | **The printer's proofing table**, top-down: a business-card proof sheet, a letterhead proof, a bilingual quinceañera invitation proof with its ribbon, a pencil, a loupe, a pica ruler, and in the middle an empty space (where the HTML proof is placed). | C | All printed props from a real neighborhood print shop's own work, with any names abstracted by the illustrator. The empty space is shot with a white card for an accurate shadow. |
| C1 | Close | A firm owner (a Puerto Rican CPA in his 60s, cardigan) and his client (a first-time founder in her 20s, a florist, holding a bucket of flowers), side by side, looking at the viewer, proud and relaxed. | B, full length | The closing poster. |
| S1, S2 | Sign-up, verify email | Two more firm owners, cut-out, seated, mid-laugh with someone out of frame. | B | |
| E1 to E3 | Emails (CoFile's own) | Small arch crops of F1, F3, C1. | A/B | 1200 px wide masters. |

**Shoot plan:** three location days per state (NY, NJ, FL), one theater night, two still-life
days, two film days. A bilingual crew of five: photographer, assistant, producer-caster (who
speaks to every subject in their language), stylist (who mostly removes things), retoucher on
set for cut-out checks. Deliver RAW plus graded TIFFs (16-bit, Adobe RGB) and web masters
(sRGB, 2400 px long edge, AVIF and WebP).

### 7.4 The signature film: "Name on the door"

- **What:** a sign painter letters **"Harbor & Pine CPA"** in 23-karat gold leaf on the inside of
  a glass office door, reverse-lettered the traditional way, then turns to the lower-right
  corner and signs, small, in a single line: **"with CoFile"** in their own hand. We pull back
  to see the door from the street side, the name glowing in morning light.
- **The set:** a built office door (wood frame, painted in Pine `#2F5D50`, brass handle, a
  plain glass pane), so no real firm's door is used. A set builder and a scenic painter make it.
- **Cast:** a real working sign painter, ideally one who apprenticed in a family shop; their
  hands are the stars. Paid as a craftsperson and credited on the film's page `[copy needed]`.
- **Shots:** (1) extreme macro of the quill brush loading size; (2) the brush laying the H in
  one stroke; (3) gold leaf laid on, breathed on, burnished with cotton; (4) time-lapse of the full
  name; (5) the small signature in the corner, real time, three seconds; (6) pull back from the
  street side, the name readable, the signature a tiny glint.
- **Cut for the site:** 9 seconds, silent, scrubbed by scroll on desktop (or autoplaying once
  with a visible pause button), ending on the finished door. Also a 20-second version for the
  site's social card and the sales team.
- **Specs:** shot at 6K, 24 fps (time-lapse at 1 frame / 2 s), graded warm. Delivered as AV1 and
  H.264 MP4 at 1920 × 1080 and 1080 × 1350 (phone crop), under 3.5 MB for the site cut, plus a
  poster still (the finished door) as AVIF. Captions not needed (no speech); an audio-described
  text version sits below for screen readers `[copy needed]`.

### 7.5 Illustration

**Who:** a screen-print poster illustrator (community-poster tradition, flat shapes, confident
line), working with a real screen-print studio for textures.

**How it's built:** every illustration is drawn as **two plates**, like a two-color screen
print: an **ink plate** (Tinta line and solid) and a **color plate** (one flat color). On CoFile's
pages the color plate prints in Flamboyán, Cempasúchil, Caribe or Buganvilla. **On a firm's pages
the color plate prints in the firm's own color** (`--firm-band`), and the ink plate stays Tinta.
So every empty state, every envelope and every success picture on the filing desk is
automatically a two-color print in the firm's color. Delivered as SVG with two named groups,
`ink` and `color`, so CSS recolors them.

**Line:** a brush line, 2.5 px at 1× display, round ends, very slightly irregular (drawn by hand
and then cleaned, not drawn with a geometric tool). The color plate is offset 1.5 px down-right
from the ink plate on purpose: the gentle misregistration of a real print. Never on text.

**The set (40 pieces):**

- **The Thread**: one continuous brush line, drawn as an SVG path, with its endings: a hand
  (start), a phone (approve), an envelope (papers back). Used in Process, sign-up and the setup
  steps.
- **Papers coming home** (After section and filing detail): an envelope in the color plate, three
  sheets (generic document, a letter, a one-page record), each with abstract lines only.
- **State website screens** (Process step 3, Rehearsals, filing detail): a stack of three
  simplified browser windows with label-and-field lines filling in. No state names, colors, seals
  or layouts that resemble a real state site.
- **The stage curtain** (Rehearsals, the rehearsal badge on the desk): a theater curtain swag,
  drawn in the color plate.
- **Empty states** (filing desk): a clear desk with a plant and a coffee cup ("Your desk is
  clear"); a paper airplane leaving a hand (client links); an open mailbox (requests); a pen and a
  signature line (signatures); a stack of cards (Ready to pay).
- **Doors** for the system pages: a door with a blank window (404, "Page not found"); a door
  with a hanging clock-face sign, the hands at "back soon" (error, "Something went wrong"); an
  envelope sliding through a door's mail slot (sign-up "Check your email", verify email,
  forgot password); a door ajar with light coming out (log in, "Your account is ready").
- **Security icons** (5, the only icons in that section): masked digits (a row of dots ending
  in four digits); a card; a link of two loops; a pen nib; two doors side by side (separate
  accounts). No locks, no shields.
- **Coverage meter glyphs** (see §11.6).

### 7.6 Texture

A real screen-print studio pulls flat prints of each palette color on cotton rag paper with
three ink densities, plus five deliberately imperfect edges (a squeegee drag, a slight flood,
two misregistered corners). Scanned at 1200 dpi, cleaned, delivered as tiling 512 px WebP
textures. On the site they sit **only on color fields** (the hero arch, the closing poster, the
cut-out fields) at 3% to 5% opacity using `mix-blend-mode: multiply`. Never on Masa paper, never
on firm pages, never under text smaller than 34 px.

### 7.7 Product imagery

Product objects on the marketing site (the proof, the text message, the rehearsal log, the
drafted filing, the papers) are **real HTML and CSS**, not screenshots: they stay sharp, they
can be read by screen readers, they can be translated, and they always match the product.
Device frames are minimal: a phone is a 3 px Tinta outline with a 40 px radius and nothing else.
No realistic device renders, no 3D. This is a flat, printed, photographic world, and 3D would
make it look like every other software site.

---

## 8. Motion

### 8.1 Principles

- **Motion follows the work as it passes between people.** Things arrive, get handed on, come
  home. Nothing spins, nothing pulses for attention, nothing loops forever.
- **Words never wait.** Headlines and copy are on screen and readable from the first frame.
  Only objects and pictures move.
- **Printed, not digital.** Color fields appear the way a squeegee pulls ink: a wipe from bottom
  to top. Paper lands with a small settle. Lines are drawn like a brush stroke, fast at the start,
  slow at the end.
- **Once.** Each scroll moment plays once per page load and then stays put.
- **`prefers-reduced-motion: reduce`:** every moment below is replaced by its final frame, with at
  most a 150 ms opacity fade. The film shows its poster still with a play button.
- No parallax on text, no scroll-jacking, no smooth-scroll libraries. Scroll-linked effects use
  CSS scroll-driven animations where supported and simply show the end state elsewhere.

### 8.2 Tokens

| Token | Value | For |
|---|---|---|
| `dur-quick` | 120 ms | Button press, chip select |
| `dur-base` | 200 ms | Hover, focus, small reveals |
| `dur-gentle` | 320 ms | Panels, menus, toasts |
| `dur-scene` | 600 ms | Object entrances |
| `dur-story` | 1200 to 1600 ms | The signature sequences |
| `ease-brush` | `cubic-bezier(0.22, 1, 0.36, 1)` | Lines and entrances: quick start, long soft finish |
| `ease-squeegee` | `cubic-bezier(0.65, 0, 0.35, 1)` | Color-field wipes |
| `spring-settle` | stiffness 260, damping 22, mass 1 | Paper landing |

### 8.3 The moments

1. **The hero proof lands** (once, on load, ≈ 1.6 s total):
   - 0 ms: the marigold arch prints, wiping up from its base (600 ms, `ease-squeegee`), with the
     texture visible during the wipe.
   - 150 ms: the cut-out sisters rise 24 px and fade in (700 ms, `ease-brush`).
   - 400 ms: the proof drops in from 16 px above (`spring-settle`); its print shadow appears
     80 ms after it lands, as if the paper has just touched the table.
   - 700 ms: the proof's Door band fills left to right with Pine (450 ms), and "Harbor & Pine
     CPA" fades in on it.
   - 1050 ms: the four numbered chips (1 to 4) pop in, 80 ms apart, scale 0.6 to 1.
   - 1500 ms: the "Approve for filing" button gets a single warm glow (a Cempasúchil ring that
     expands 6 px and fades, 400 ms). Once.
   **Why:** it shows, in a breath, the whole first half of the promise: your firm's name lands on
   top of your client's proof, in your color, in their hands.

2. **The Thread** (Process, on entering view): one brush line draws from the firm owner's hand
   (step 1), across to the contractor's phone (step 2), and on to the envelope (step 3), 1400 ms,
   `ease-brush`, using `stroke-dashoffset`. As the line reaches each step, its number chip fills
   with Caribe (200 ms). **Why:** "You start it. Your client approves it. CoFile files it." in one
   gesture: one line, handed on, no friction.

3. **Follow the list** (The proof): each of the six list items is tied to a part of the large
   proof beside it. Hover or keyboard focus on an item washes that part of the proof in
   Cempasúchil tint (200 ms) and draws a short brush leader line from the item to it (300 ms). On a
   phone there's no room for both side by side, so each list item carries its own crop of the proof
   (a "detail tile"), and the highlight wipes across the tile as the item scrolls into the middle
   third of the screen. **Why:** it makes "one page, every detail, every fee, one button" tangible:
   the reader sees exactly where each promise lives.

4. **Name on the door** (Firms; the signature moment): the 9-second film of the sign painter,
   scrubbed by scroll on desktop as the section passes through the viewport (the name is finished
   when the section's headline reaches the top third). On phones and with any doubt about
   performance, it autoplays once, muted, when 60% visible, with a pause button (always shown,
   bottom-left, 48 px). It ends on the finished door, and stays there. **Why:** "Your name on the
   door. Ours in small print." performed by a craftsperson, in real gold.

5. **A text becomes a filing** (Requests, ≈ 2.4 s):
   - The typing dots show for 700 ms, then Ana's bubble pops in (`spring-settle`).
   - 300 ms later, three phrases inside the bubble get a Cempasúchil highlighter swipe, left to
     right, 250 ms each: "an LLC", "me and my sister, 50/50", "in Jersey City".
   - From each highlight, a brush line travels down to the drafted filing card (500 ms), and the
     matching field on the card fills in with that same phrase (fade and 4 px rise, 200 ms). Then
     the remaining fields fill in together as quiet gray bars: the saved answers (§9.5).
   - Then the arrow line "↳ read into a drafted New Jersey LLC formation for your team to check"
     writes on with its arrow drawn (400 ms).
   **Why:** "Clients don't fill in forms. They text you." The reader watches the ease happen.

6. **The papers come home** (After, ≈ 1.6 s): an envelope printed in Pine slides in from the
   right edge to the center (600 ms, `ease-brush`), its flap opens (200 ms), and three sheets fan
   out above it (the state's documents, the EIN letter, one record), each landing with
   `spring-settle` and a 2° rotation that settles to 0.6°. The three list items beside it fade in
   as each sheet lands. **Why:** the homecoming. The work went out; it came back, to you.

7. **House lights** (Rehearsals): as the dark section enters, the theater photograph's
   brightness rises from 70% to 100% over 1200 ms (the stage lights warming up), and the rehearsal
   log fades up beside it, each line appearing 90 ms after the last, like reading down a script.
   The last line ("Pay Now · held, on purpose") appears in the same rhythm as the rest: calm, no
   special effect. **Why:** a rehearsal is a performance. We set the stage and let it run.

8. **Stage meters** (Coverage): each row's five-dot meter fills from left to its stage, 40 ms per
   dot, rows staggered 30 ms, the first time the table enters view.

9. **The closing poster** (Close): the Cempasúchil arch prints up behind the cut-out pair (600 ms,
   `ease-squeegee`), the pair rises in (700 ms), and the brush underline beneath "Approve the
   proof. Then it's filed." draws left to right (800 ms). The Doorway mark beside it lights its
   window from Masa to Cempasúchil tint and back (one 900 ms breath). **Why:** the last thing you
   see is a doorway with its light on.

### 8.4 Interface motion

- **Buttons:** hover deepens the fill by 6% L (`dur-base`); press moves the button 2 px down and
  right and shrinks its print shadow from 4 px to 2 px (`dur-quick`), like pressing a real key.
- **Links:** underline thickens from 1.5 to 2.5 px on hover.
- **Chips and pickers:** selection fills from the center out (`dur-base`).
- **Focus:** the focus ring appears instantly (no animation on focus, ever).
- **Toasts and notices:** slide 8 px and fade (`dur-gentle`), stay until dismissed when they carry
  an action; status-only ones stay 6 s and pause on hover or focus.
- **Filing desk:** a filing that has just arrived (from a client link, a text or an email) gets a
  firm-tint wash on its row that fades over 2 s. When documents come back, the "Documents" card on
  the filing gets the envelope illustration's flap-open animation once.
- **On a firm's client pages** (the form, the proof): almost no motion. The Door band never
  animates. The page is for reading and deciding.
