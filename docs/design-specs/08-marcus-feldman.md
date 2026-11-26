# CoFile visual design spec: "Front of House"

Marcus Feldman · Design spec 08 · written against BRIEF.md v3 and the round 3 copy (Nov 26, 2026)

Every quoted line in this document comes from `web/app/page.tsx`, the seven pages behind it
(`web/app/how-it-works`, `for-firms`, `what-we-file`, `pricing`, `security`, `faq`, `platforms`), the
stand-in pictures in `web/components/landing/Visuals.tsx`, or the product code it points to. Where a
design needs a word that doesn't exist yet, it says `[copy needed]`. I haven't rewritten, reordered or
added a single message. Prices come from `web/lib/pricing.ts` and coverage from `web/lib/coverage.ts`.

---

## 1. Who I am, and what I bring

I'm Marcus Feldman, 41, in Chicago. For fifteen years I've designed the marketing sites and sign-up
flows for accounting and payroll software: the pages a firm owner lands on between two client calls,
and the five screens that decide whether they start a trial. I'm known for pages that convert without
tricks. No countdown timers, no fake "Join 10,000 firms" bars, no stock handshakes. What works with
this buyer is plain and hard to do well: one obvious hierarchy per screen, the real product shown
doing real work, demos you can touch, a call to action you can't miss, and every section paying for
the next scroll.

I know the CPA buyer. She's 52, runs a nine-person practice, built it on referrals, and is quietly
proud that clients call her first for everything. She doesn't want a "platform". She wants to say yes
to the client who needs an LLC without handing them to a stranger, she wants to sign off on it herself,
and she wants to look good doing it. If a page makes her firm look better, she'll give it four minutes.
If it makes her feel managed, or makes CoFile the star, she's gone.

This round the home page copy is down to about 330 words, which is how I like it: the pictures have to
carry the page, and pictures are my trade. So here's what I'm designing for: she sees her own name on
it, she sees herself in charge of it, she can't miss the price, and "Run a free rehearsal" is the
easiest click on the page.

---

## 2. The visual concept: Front of House

**The one idea: the firm is out front; CoFile works the back of house.**

"Front of house" is the theater and restaurant term for everything the audience or the guest sees:
the lobby, the dining room, the name over the door. Back of house is the kitchen and the crew. The copy
already lives in this world ("Your name on the door. Ours in small type.", "rehearse a filing", "the
whole filing, performed on the state's real website with no audience"), and the idea gives the whole
visual system one rule a build team can apply without me in the room:

> **In every picture of the product, the firm's name, logo and color come first and largest. CoFile
> appears once, in small type, at the edge.**

That rule makes the site sell the copy's story by showing it rather than saying it:

| The copy's story | How Front of House shows it |
|---|---|
| **Say yes, under your own name.** | The hero isn't a CoFile screen. It's Harbor & Pine CPA's own filing desk, in Harbor & Pine's green and Harbor & Pine's font. On our own home page, the largest company name in the first screen is a firm's, set bigger than our wordmark in the header. |
| **Your brand on everything.** | Two office doors side by side in one hallway, two brass plates, two firms, and in front of each door the same client page in that firm's colors. The visitor can put their own firm's name on the second door and watch its page re-brand. |
| **Nobody retypes anything.** | A one-line text from a client lifts out of the phone, phrase by phrase, and lands in a drafted filing; the firm's saved answers fill in the rest in the firm's own color. Ease shown as things moving from one hand to the next. |
| **You stay in charge.** | The proof is drawn as the firm's own letterhead with one button in the firm's color. The motion is the firm pressing it: a go-ahead, not a gate. |
| **It's done, and the papers come back.** | A filing is a round trip, and the brand's mark is that round trip: an open ring with a dot travelling it. The dot leaves when the firm approves and comes home with the Certificate of Formation and the IRS letter. |
| **The filings your clients already ask for.** | Four plain tiles (New York, New Jersey, Florida, IRS) laid out like a firm's own menu of services, each filing with a quiet dot for where it stands. |
| **Try it free.** | Sign-here Yellow, CoFile's one color, belongs to "Run a free rehearsal" and to the rehearsal itself. In the Rehearsals section the house lights go down (a dark band) and the state's real website is lit like a stage with no audience. |
| **Simple prices.** | "$45" is the biggest number on the site, set like a price on a shop window. No "contact sales" fog, no toggles to decode. |
| **People behind it.** | The line about filing professionals sits right under the hero's buttons with a small person glyph, the one human note in the first screen. Team photography only if it's the real team (7.3). |

**Two registers, one system.** Everything on every surface belongs to one of two registers.

- **House** (front of house) is the firm's register: its logo, its main color, its font, its clients'
  names, its clients' businesses. House is warm, specific and in color.
- **Backstage** is CoFile's register: the neutral frame, Ink type on white and Gallery grey, our wordmark,
  the docs, the platform dashboard, the support pages. Backstage is calm, exact and almost colorless, so
  the firm's color is always the color you notice.

The marketing site is backstage giving a tour of the house. Our neutral frame is the gallery wall; the
firm is the painting.

**Who sees what.** The firm sees its filing desk and approves the proof. Its clients see only the firm's
branded form, client link pages and emails, never CoFile's. So the house register has two audiences: the
firm (desk, proof, firm emails) and the firm's client (forms, client link pages, client emails). Both get
the firm's brand; the client's surfaces get even less of us.

**What the concept deliberately isn't.** It isn't built on safety. There are no locks, shields, vaults,
seals, stamps, checkmarks-as-decoration, fingerprints, hashes or "verified" badges anywhere in the
identity, the hero or the motion. The security line on the home page and the Security page are designed
as well-made reference material: easy to find, calm, honest. The appendix of a good annual report, not
its cover.

### 2.1 One filing, start to finish

One example filing runs through the home page, so the visitor follows a single case from start to
finish: Two Sisters Bakery LLC, a New Jersey LLC formation, for the example firm Harbor & Pine CPA, with
$103.50 in state fees.

1. **Hero:** on Harbor & Pine's desk, Two Sisters Bakery LLC sits at the top of the list with "Proof ready
   to approve". Something is waiting for the firm, and the reader wants to know what.
2. **Firms:** the page the bakery's owner fills in, under Harbor & Pine's brand, beside the same page
   under Northgate Payroll's.
3. **Requests, The proof, After: "The Run".** On desktop these three sections share one pinned picture,
   the firm's desk, which changes as the reader scrolls past the three headlines: Ana Ortiz's text
   turns into the draft, the draft becomes the proof and Harbor & Pine approves it, then the filed record
   comes back with its papers. The headlines scroll; the picture stays and does the work.
4. **Coverage:** the other filings clients ask for.
5. **Rehearsals:** the same filing performed on New Jersey's real website, free, with no audience.
6. **Pricing:** $45 a filing.
7. **Close:** the visitor's own name on the door.

The Run (9.3) is the structural idea of the home page: three short text blocks beside one picture that
tells the whole middle of the story. It's the closest thing to sitting next to a firm owner and showing
her the product, which is how this product actually gets sold.

---

## 3. Identity

### 3.1 The mark: the Hand-off

An open ring with a dot sitting in its opening. The ring is the round trip a filing makes ("Your client
asks. You approve it. CoFile files it." and then "Then it's filed, and the papers come back to you."); the
dot is the filing, mid-hand-off. Read another way, it's a "C" passing something forward. It's about the
hand-off and the return, about ease. It contains no check, no lock and no seal, and it doesn't read as an
approval stamp.

**Construction, for the illustrator (24-unit grid, origin top-left):**

```
        . . . . . . . . . . . . . . . . . . . . . . . .
        .            ▄▄██████▄▄                     .
        .        ▄███▀▀      ▀▀███▄                 .
        .      ▄██▀              ▀▀█▄               .
        .     ██▀                    ▀              .     ring: centerline radius 8.0
        .    ██                                     .     stroke 3.5, round caps
        .    ██                        ●            .     gap: 80° centered on 3 o'clock
        .    ██                                     .     dot: radius 2.25 at (20, 12)
        .     ██▄                    ▄              .
        .      ▀██▄              ▄▄█▀               .
        .        ▀███▄▄      ▄▄███▀                 .
        .            ▀▀██████▀▀                     .
        . . . . . . . . . . . . . . . . . . . . . . . .
```

- Ring: circle centered at (12, 12), centerline radius 8.0 units, stroke width 3.5 units, round caps.
- The ring is open on the right: the stroke runs from 40° to 320° (standard angles, 0° at 3 o'clock,
  counter-clockwise), leaving an 80° gap centered on 3 o'clock.
- Dot: a filled circle, radius 2.25 units, centered at (20, 12), exactly on the ring's centerline in the
  middle of the gap. Clearance between the dot and each round cap is about 1.1 units, which holds open at
  16 px.
- Optical correction: the dot is nudged 0.15 units outward (to x = 20.15) so it doesn't look swallowed. The
  ring's caps are shaved 0.1 unit on their inner side so the opening reads as an even gap.
- Color: ring in Ink `#15181E`, dot in Sign-here Yellow `#FFC533`. One-color versions: all Ink, all white,
  or all currentColor (for the small-type lockup). On yellow backgrounds both ring and dot are Ink.
- Minimum size: 12 px (the small-type lockup). Below 16 px the stroke thickens to 3.8 units and the dot to
  radius 2.4, drawn as a separate small-size master.
- Never: rotated, outlined, given a gradient, filled in as a disc, or put inside a badge, shield or circle
  frame.

### 3.2 The wordmark

"CoFile", in its exact capitalization, drawn from GT America Standard Medium and then hand-finished by the
foundry or a lettering artist:

- **The C** of the wordmark gets the mark's aperture: its terminals are cut at 40° from horizontal so the
  opening matches the ring's gap. Side by side, the mark and the C rhyme.
- **The i** gets a round tittle (replacing the stock dot), 1.25× the stem width and set 6% higher than
  stock, so the wordmark carries the mark's dot without being cute about it. The tittle is Ink, not yellow:
  color stays in the mark.
- **Spacing:** "Fi" kerned −20 units, "il" +6, overall tracking −1% at display sizes and 0 at text sizes.
  No ligatures.
- Two optical sizes: Display (above 24 px) and Small (below 24 px, stems +6%, spacing +2%).

### 3.3 Lockups

```
 Horizontal (primary)          Stacked (rare: app icon sheets)      Mark alone
 ┌──────────────────────┐      ┌────────────┐                      ┌─────┐
 │ (◯•)  CoFile          │      │    (◯•)    │                      │(◯•) │
 └──────────────────────┘      │   CoFile    │                      └─────┘
                               └────────────┘
```

- **Horizontal:** mark height = 1.55 × the wordmark's cap height; gap between mark and wordmark = 0.42 ×
  mark width; the wordmark's baseline sits 4% below the ring's lowest point, so the pair looks centered
  rather than measured. In the site header the mark is 28 px and the wordmark's cap height 18 px.
- **Clear space:** 2 × the dot's diameter on all sides.
- **Favicon and app icon:** the mark alone. Favicon: Ink ring and yellow dot on transparent (light tabs),
  white ring and yellow dot (dark tabs, via `prefers-color-scheme` in the SVG favicon). App icon and social
  avatar: Ink ring and yellow dot on a white rounded square (radius 22% of the side).

### 3.4 "Ours in small type": the with-CoFile mark

"Your name on the door. Ours in small type." and, on For firms, "The only sign of us is a small 'with
CoFile'." This lockup is the most-seen form of our brand, because it sits on every page a firm's client
sees. It's designed as its own object, not as a shrunken logo.

```
   (◯•) with CoFile
   └┬┘ └─┬─┘ └──┬──┘
   12px  Regular  Medium    13 px type, all one color, one line, never wraps
```

- A single outlined SVG, so it needs no font on the firm's pages and renders identically everywhere.
- The mark at 12 px; 5 px gap; "with" in GT America Regular; "CoFile" in GT America Medium; 13 px type with
  optical spacing +1%.
- One color for all three parts, no yellow dot: on a firm's page the dot would be the only non-firm color,
  and Front of House says the only color is the firm's. Default `#5B6170` on white (6.2:1: small, never
  illegible); `rgba(255,255,255,0.78)` on a firm-colored header band.
- **One per page.** Desktop and tablet: the far right of the firm's header, vertically centered on the
  logo. Phone: the center of the page footer, 24 px above the bottom safe area. Never in the body, never next
  to a button, never in an email's subject or sender name.
- **Pages the firm's clients see** (the intake form, client link pages, the page shown after sending): it
  isn't a link, so nothing pulls a client away from their firm. **Pages the firm sees** (the filing desk,
  the proof, firm emails): it links to the CoFile home page.
- In the embedded widget it's the existing line "Filed with CoFile", in the same 13 px and color, at the
  bottom of the frame.
- On the marketing site, wherever a picture shows a firm's page, the lockup is drawn at its true 13 px
  size, never enlarged for legibility. Its smallness is the point the headline makes.

### 3.5 How a firm's logo sits on its pages: the logo bay

Firms upload all sorts of logos: a tidy SVG wordmark, a 2009 JPEG with a white box around it, a square
crest, a light logo made for a dark letterhead. The logo bay makes every one look deliberate.

```
 ┌──────────────────────────────────────────────────────────────────────────────┐
 │▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀ 6px firm main color ▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀│
 │                                                                              │
 │   [ LOGO  ≤44px tall, ≤220px wide ]  Harbor & Pine CPA          (◯•) with CoFile │
 │                                                                              │
 └──────────────────────────────────────────────────────────────────────────────┘
   white header, 80 px desktop / 64 px phone, 1 px #E4E5E1 bottom rule
```

1. **Trim and measure.** On upload, the server trims transparent or flat-white margins (tolerance ΔE < 2)
   and measures aspect ratio and average luminance. The firm sees the trimmed result in Setup before saving.
2. **Size by shape, not by box.** A wide wordmark (aspect ≥ 3:1) sits at 32 px tall, up to 220 px wide. A
   medium logo (1.4:1 to 3:1) at 40 px. A square or round logo (below 1.4:1) at 44 px with the firm's name
   set beside it, because a square logo alone rarely says the name. Optical sizing, not equal height, is
   what makes very different logos look like peers.
3. **Dark logo, white header.** Most logos were drawn for white letterhead, so the header is white by
   default and the firm color runs as a 6 px rule along the top edge.
4. **Light logo, colored header.** If the logo is mostly light (average luminance above 0.7 on
   transparent), the header becomes a 72 px band in the firm's main color and the logo sits on it, so a
   white logo is never lost on white.
5. **Logo with a white box.** If the trim finds an opaque white rectangle, the logo goes on the white header
   as is. A boxed logo is never put on a colored band.
6. **No logo yet.** A monogram tile: 40 × 40 px, radius 10 px, in the firm's main color, with the firm's
   initials (up to three letters from the capitalized words of the name, skipping "&" and "and": "Harbor &
   Pine CPA" becomes HPC, or HP if the firm picks two) in white, in the firm's font at 16 px Semibold, then
   the firm's name at 20 px beside it. A firm with no logo still looks finished on day one.
7. **The firm's name.** In the firm's font at 20 px Semibold desktop, 17 px phone, in Ink. When the logo is
   a wide wordmark that already spells the name, the firm can hide the text name in Setup (a visual
   toggle; its label is `[copy needed]`).
8. **The second color** is for links and highlights only, never a second big shape.

How the firm's color is applied everywhere is in 4.4.

---

## 4. Color

### 4.1 The palette

CoFile's own palette is almost colorless on purpose: one yellow, a near-black, a warm-neutral grey,
and the plain status colors a product needs. The firm brings the color.

| Name | Hex | Role | Contrast notes |
|---|---|---|---|
| **Ink** | `#15181E` | All CoFile text, the ring of the mark, dark bands | 17.8:1 on white |
| **Graphite** | `#4A505C` | Secondary text, ledes, captions | 8.1:1 on white, 7.3:1 on Gallery |
| **Fine Print** | `#5B6170` | The lightest text allowed anywhere (the small-type lockup, table meta) | 6.2:1 on white |
| **Gallery** | `#F4F4F1` | Alternate section bands, the "stage" behind product pictures | The gallery wall: neutral enough that navy, pine, burgundy and teal all look rich on it |
| **Rule** | `#E4E5E1` | Hairlines, table rules, card borders | Decorative |
| **Field Edge** | `#8A909C` | Input borders, the outline of the secondary button | 3.2:1 on white (meets non-text contrast) |
| **Sign-here Yellow** | `#FFC533` | Primary call to action, the mark's dot, everything about rehearsals | Ink on it: 11.3:1 |
| **Yellow Edge** | `#D9A21A` | The pressed edge of yellow buttons, the outline of yellow dots on white | Decorative |
| **Rehearsal Tint** | `#FFF2C7` | Rehearsal notices and chips (with Ink text and a 1 px `#E8B82A` edge) | Ink on it: 15.9:1 |
| **Night** | `#0F1115` | The two dark bands (Rehearsals; Close running into the footer), dark mode base | |
| **Night Raised** | `#181B22` | Cards and code blocks on Night | |
| **Night Rule** | `#2A2F39` | Hairlines on Night | |

Why yellow: the one thing every CPA has put in front of every client is the yellow "sign here" flag. It
means "this is the part where you act". That's what our yellow does: it marks the one action on the page
(Run a free rehearsal) and the free thing we're inviting people to do (the rehearsal). It's also a color no
CPA, payroll or title firm I've ever worked with uses as its main brand color, so it never collides with a
firm's navy, pine or burgundy in the pictures. And it's spectacular on Night, where two of our big moments
happen.

### 4.2 Status colors (product and pictures)

Status is never shown by color alone: every chip carries its words, and tone only supports them. These
apply to the product's labels (`web/lib/status.ts`) and to the labels in the home page pictures.

| Tone | Text | Background | Used for (existing labels) |
|---|---|---|---|
| **Done** | `#157A4A` | `#E4F4EA` | "Approved", "Submitted to the state", "Accepted by the state", "EIN issued", "Completed", "Live"; in the pictures "Filed", "Filed, IRS letter saved", "Matches the proof" |
| **Your turn** | `#A04A06` | `#FDEEDF` | "Needs information", "Waiting for approval", "Changes requested", "Name unavailable", "On hold", "Paused: state site changed", "Being checked"; in the pictures "Proof ready to approve", "Ready to approve" |
| **Problem** | `#B3261E` | `#FBE9E7` | "Needs correcting", "Rejected by the state", "Failed", "Stopped" |
| **In motion** | `#4A505C` | `#EEEFF1` | "Received", "Getting the state's review page", "Queued", "Filing now", "Final check"; in the pictures "Submitted" |
| **Rehearsal** | `#15181E` | `#FFF2C7` + 1 px `#E8B82A` | "Rehearsal", "Rehearsed to the payment screen" |

"Your turn" is a warm burnt orange, deliberately far from Sign-here Yellow, so a filing waiting for the
firm never looks like a marketing button, and warm enough that it reads as an invitation rather than an
alarm. It's the firm's own next step.

**Coverage dots** (the home page tiles and the What we file page) use three marks, always beside words:

| Stage | Mark |
|---|---|
| Live | 12 px solid circle, `#157A4A` |
| Rehearsed to the payment screen | 12 px solid circle, Sign-here Yellow, 1 px Yellow Edge |
| Screens recorded or offered, rehearsal next | 12 px ring, 1.75 px Graphite, empty |
| Planned (What we file page only) | 12 px ring, 1.25 px dashed Field Edge |

### 4.3 How color is used

- **Per screen, one yellow button.** On any viewport-height of any CoFile page there is at most one yellow
  button. Yellow dots (the mark, coverage dots) don't count. If two buttons would show at once, the lower
  one takes the secondary style.
- **Yellow is never text.** Words go in Ink on yellow, never yellow on white.
- **Ink and white do the work.** Body text is Ink on white or Gallery. Ledes are Graphite. Nothing on the
  site is lighter than Fine Print.
- **The firm's color only lives inside pictures** on the marketing site. Outside them, the page is Ink,
  white, Gallery and yellow. That's what makes the firm's color look like the point.
- **Bands alternate** white and Gallery, with two Night bands at the two moments of drama (the rehearsal
  stage, and the close running into the footer).
- **No gradients** on CoFile surfaces except one: the soft spotlight on the rehearsal stage (4.6).

### 4.4 The firm's colors on its pages

The firm picks a **Main color** ("Buttons and the top of the page. Button text is white, so choose a
dark color.") and a **Second color** ("Links and highlights. Choose a color that's easy to read on
white."), the existing labels in Setup. The system then makes those choices look their best:

1. **Button shade.** If white text on the main color is below 4.5:1, the system derives a button shade by
   lowering OKLCH lightness in 0.02 steps (keeping hue, clamping chroma in gamut) until it passes. The
   original color still paints the 6 px top rule, so the brand reads true; buttons use the accessible shade.
   Setup's live preview shows both, so nothing surprises the firm.
2. **Link shade.** The same for the second color against white at 4.5:1. With no second color, links use the
   button shade.
3. **Tints.** Two tints per firm, mixed in OKLCH with white: 6% (selected rows, the active nav item) and 12%
   (the left edge of notices, the selected choice card, saved answers in a draft). The firm's color is never
   put behind body text at full strength and never floods a page.
4. **Focus.** A 3 px outline in the button shade with a 2 px white offset, on every focusable element.
5. **The firm's color never replaces status colors.** "Waiting for approval" is the same burnt orange in
   every firm's desk, so staff (and platform teams looking across many firms) read status the same way.
6. **Dark mode on the filing desk** lifts the button shade to OKLCH lightness 0.72 with Ink button text, so
   the firm's hue survives on Night. The proof, the pages the firm's clients see and every email stay light
   in every mode, the way a printed proof is always paper-white: the firm's brand was made for white, and
   that's where it looks best (12).

**Demo firms.** The site's two example firms are commissioned fixtures (7.2), chosen to look nothing like
each other so the "same page, two brands" point lands at a glance:

| Example firm | Main color | Second color | Font (a Setup preset) |
|---|---|---|---|
| Harbor & Pine CPA | Pine `#1F4D3B` (9.6:1 with white text) | Brass `#8A5F1F` (5.6:1 on white) | Lora, a serif |
| Northgate Payroll | Navy `#1B2A4A` (14.2:1 with white text) | Teal `#0F5C63` (7.7:1 on white) | Montserrat, a geometric sans |

The eight ready colors offered in the home page and For firms demos and in Setup are dark enough for white
text without adjustment:

| Navy | Pine | Burgundy | Teal | Slate | Plum | Rust | Black |
|---|---|---|---|---|---|---|---|
| `#1B2A4A` | `#1F4D3B` | `#6E1E2F` | `#0F5C63` | `#3A4656` | `#4B2A55` | `#8C3B1E` | `#15181E` |

### 4.5 Dark mode (CoFile's own surfaces)

| Light token | Dark value |
|---|---|
| White page | Night `#0F1115` |
| Gallery band | Night Raised `#181B22` |
| Ink text | `#EDEEF0` (16:1 on Night) |
| Graphite text | `#A7ADB8` (8.4:1) |
| Fine Print | `#8F96A3` (6.0:1) |
| Rule | Night Rule `#2A2F39` |
| Field Edge | `#6B7280` |
| Sign-here Yellow | unchanged `#FFC533` (12:1 with Ink text) |
| Status texts | Done `#5FD196`, Your turn `#F5A25D`, Problem `#F28B82`, In motion `#C3C8D1`, on 16% tints of the same hues over Night Raised |

Pictures of firm pages stay light inside dark mode. On Night they read as lit screens, which is exactly the
look we want: the house is lit, backstage is dark.

### 4.6 The one gradient

On the Rehearsals band only: a radial spotlight behind the stage, from `#232733` at the center to Night at
70% radius, as a 1.6:1 ellipse. The house lights going down. Nowhere else.

---

## 5. Typography

### 5.1 Typefaces

- **GT America** (Grilli Type), Standard width, in Regular 400, Medium 500 and Bold 700, with italics for
  Regular. It's the American gothic tradition (the plain-spoken grotesques American business has always
  printed its forms and price lists in), redrawn for screens: open apertures, generous x-height, sturdy
  figures, true tabular numerals. It sounds like a well-run firm, not a startup. It carries every CoFile
  headline, paragraph, button, price and table.
- **GT America Condensed Medium** for two jobs only: the price numerals ("$45", plan prices) and the stat
  tiles on the platform dashboard. Condensed lets "$45" go very large without taking the whole line. Never
  for words.
- **GT America Mono** Regular and Medium for code, API names, IDs and `"dryRun": true`. Never for business
  data in the product or the pictures: a firm reads a state filing, not a terminal.
- **On firm pages, the firm's font** leads (the presets in `web/lib/fonts.ts`: Inter, IBM Plex Sans,
  Roboto, Open Sans, Lato, Montserrat, Source Serif, Merriweather, Lora, the device's own, or an uploaded
  file). CoFile's typefaces appear there only inside the outlined small-type SVG.
- **Licensing:** web, app and email licenses for GT America, Condensed and Mono; desktop licenses for the
  studios. The wordmark is outlines (3.2), so it needs no license in use.
- **Fallback stacks:** `"GT America", "Helvetica Neue", Arial, system-ui, sans-serif`; mono `"GT America
  Mono", ui-monospace, "SF Mono", Menlo, monospace`. Metric-matched fallbacks via `size-adjust`, so pages
  don't jump when the web font arrives.

### 5.2 The scale (marketing site)

Sizes are set for 40-to-65-year-old eyes. The body is 18 px on desktop, and nothing a reader needs is
below 15 px.

| Style | Desktop size / line | Phone size / line | Weight | Tracking | Use |
|---|---|---|---|---|---|
| Display | 72 / 76 | 40 / 44 | Medium | −2% | The hero H1, the H1 on each page behind the home page |
| H2 | 52 / 56 | 32 / 37 | Medium | −1.5% | Section headlines |
| H2 reference | 36 / 42 | 26 / 32 | Medium | −1% | Support headings: "Checks before every filing.", "What's separate.", "State by state." |
| H3 | 26 / 32 | 22 / 28 | Medium | −0.5% | Step titles, plan names, security card titles, tile names |
| Lede | 22 / 34 | 19 / 30 | Regular | 0 | The line under each H2, in Graphite |
| Body | 18 / 28 | 17 / 27 | Regular | 0 | Lists, step text, answers, table cells |
| Kicker | 17 / 24 | 16 / 22 | Medium | 0 | "For CPA, payroll, fractional CFO and title firms", "Pricing for firms" |
| Button L | 19 / 24 | 18 / 22 | Medium | +0.5% | Primary calls to action |
| Small | 15 / 22 | 15 / 22 | Regular | +0.5% | Notes, captions, the security line |
| Fine | 13 / 18 | 13 / 18 | Regular | +1% | The small-type lockup, picture labels ("Example · test details · not a real firm"), the legal line |
| Price display | 144 / 128 | 96 / 88 | Condensed Medium | −2% | "$45" in "$45 a filing. EIN included with a formation." |
| Price | 56 / 56 | 44 / 44 | Condensed Medium | −1% | Plan prices and the price strip's figures |
| Code | 16 / 26 | 15 / 24 | Mono Regular | 0 | Docs, platform snippets |

Fluid between breakpoints with `clamp()`: Display `clamp(40px, 3.2vw + 26px, 72px)`, H2 `clamp(32px, 2.2vw
+ 22px, 52px)`, Price display `clamp(96px, 5vw + 72px, 144px)`.

Rules:

- **Sentence case everywhere.** No all-caps labels, no letterspaced eyebrows: caps read slower, and this
  audience reads carefully. The only capitals are the ones in the data ("TWO SISTERS BAKERY LLC").
- **Measure:** ledes max 34 em (about 64 characters), body max 38 em.
- **Headlines break by meaning,** set by hand per breakpoint, with `text-wrap: balance` as the fallback:
  "Your client needs an LLC. / Say yes, under your own name." The full stop is where the line breaks.
- **Figures:** tabular lining figures in every fee, price, table and date, so $100.00, $3.50 and $103.50
  line up on the decimal and the four plan prices line up across their cards.
- **Weight discipline:** Regular for reading, Medium for anything you act on or scan for, Bold only for
  totals ("Total to the state $103.50").

### 5.3 The scale (product: filing desk, dashboard, proof, forms)

| Style | Size / line | Weight | Use |
|---|---|---|---|
| Page title | 32 / 38 (phone 26 / 32) | Medium (firm font: Semibold) | "Filings", "New filing", the filing title |
| Section title | 22 / 28 | Medium | Card titles, form section legends |
| Body | 17 / 26 | Regular | Forms, tables, proof rows |
| Label | 16 / 22 | Medium | Field labels |
| Help | 15 / 22 | Regular, Graphite | Field help, notices |
| Chip | 14 / 18 | Medium | Status and stage chips: the smallest text in the product except the small-type lockup |
| Proof value | 18 / 26 | Regular | Values on the proof |
| Proof total | 24 / 30 | Bold | "Total" on the proof |

### 5.4 Pairing on firm pages

The firm's font sets both headings and body. If it's a serif (Lora, Merriweather, Source Serif), it's kept
for both, with 2% more line height for long help text. If an uploaded font has no tabular figures, fees are
set in the device's own font with tabular figures so amounts always align; at 18 px nobody notices. The
firm's font never appears smaller than 15 px.

---

## 6. Layout

### 6.1 Grid

| | Phone (< 640) | Tablet (640 to 1023) | Desktop (1024 to 1439) | Wide (≥ 1440) |
|---|---|---|---|---|
| Columns | 4 | 8 | 12 | 12 |
| Outer margin | 20 px | 32 px | 48 px | auto, content max 1200 px |
| Gutter | 16 px | 24 px | 24 px | 32 px |
| Header height | 60 px | 64 px | 72 px | 72 px |

Pictures may break the grid on one side: on desktop the Gallery "stage" behind a picture runs from its
column to the edge of the viewport, so the product feels bigger than the page. Text never breaks the grid.

### 6.2 Spacing

An 8 px base with a few 4 px steps: 4, 8, 12, 16, 24, 32, 48, 64, 96, 128, 160.

| | Phone | Desktop |
|---|---|---|
| Story section padding (top and bottom) | 80 | 144 |
| Reference section padding | 64 | 96 |
| H2 to lede | 16 | 24 |
| Lede to list or link | 24 | 32 |
| Text column to its picture (phone, stacked) | 32 | – |
| Between list rows | 14 | 16 |
| Card padding | 20 | 32 |
| Picture to its example label | 12 | 16 |

### 6.3 Rhythm: how the home page breathes

With so few words, each section is a headline, a line or two, and a picture that fills most of the
screen. The page reads like a well-paced product demo: big, personal, effortless, in charge, satisfying,
reassuring, dramatic, plain, warm.

```
 Band      #  Section                     Picture                                   Layout
 ───────────────────────────────────────────────────────────────────────────────────────────────
 white     1  Hero                        Harbor & Pine's desk                      words 5 · picture 7, bleeds right
 Gallery   2  Firms                       Two doors, one page, two brands           picture 7 · words 5, bleeds left
 white     3  Requests    ┐               The Run, state A: text becomes a draft    words 5 · pinned picture 7
 white     4  The proof   ├ The Run       The Run, state B: the firm approves       (one picture, pinned across
 white     5  After       ┘               The Run, state C: the papers come home     three text blocks)
 Gallery   6  Coverage                    Four tiles, the firm's menu of filings    headline over full-width tiles
 NIGHT     7  Rehearsals                  The stage and its run sheet               words 5 · picture 7
 white     8  Pricing                     The price itself, set large               full width, typographic
 NIGHT     9  Close → footer              The door at dusk, your name on it          words over the picture
```

The Run is one white band 300 viewport-heights tall on desktop (three text blocks, each about a screen
apart), with the picture pinned in the right seven columns. On tablets and phones it splits back into three
ordinary sections, each with its own copy of the picture in the right state (9.3).

### 6.4 Section anatomy

```
 A. Words beside picture (5 + 7)               B. Headline over a full-width picture
 ┌───────────────┬───────────────────────┐     ┌───────────────────────────┐
 │ H2            │                       │     │ H2                        │
 │ Lede          │      PICTURE          │     │ Lede · link               │
 │ Icon list     │      (bleeds out)     │     ├───────────────────────────┴───────┐
 │ Link →        │                       │     │           PICTURE (12 col)        │
 └───────────────┴───────────────────────┘     └───────────────────────────────────┘
```

- The text column is vertically centered on its picture, never top-aligned to a tall picture.
- **On phones** every section is one column in copy order: H2, lede, list, link, then the picture. The
  picture never comes before the headline. Pictures go full-bleed on a Gallery stage with 20 px padding.
- **"For firms" and "How it works" links** sit under each list as text links in 18 px Medium Ink with a
  2 px underline and a right arrow, never as buttons: one yellow button per screen.

### 6.5 Persistent elements

- **Header:** sticky. It starts transparent over the white hero and gains a white background at 92% opacity
  with a 12 px backdrop blur and a `Rule` bottom line once the page scrolls 8 px.
- **The header's "Run a free rehearsal"** stays visible on desktop at all times. On phones the header carries
  the logo, "Log in" and a menu button; the yellow button moves into a **sticky bottom bar** (64 px plus safe
  area, white, `Rule` top line) that slides up once the hero's own button has scrolled out of view, and
  slides away while a page's closing button is on screen. Same words, same place, every time.
- **No popups, no chat bubble, no cookie wall over content.** If a consent banner is legally needed, it's a
  bottom sheet the same height as the sticky bar and replaces it until dismissed.

---

## 7. Art direction

### 7.1 Principles

1. **The product is the photograph.** The most important pictures on this site are the filing desk, the
   client's page, the draft, the proof and the papers coming back. They're built from the real component
   library with fixture data and placed in the page as live HTML, not screenshots. They stay crisp at any
   zoom, a screen reader can read them, they translate with the page, and they can never drift from the
   real product. The stand-ins in `Visuals.tsx` are replaced one for one by these live components.
2. **Every example says it's an example.** Each picture keeps its small label ("Example · test details ·
   not a real firm" and its siblings, 7.2), in Fine type, Graphite, at the picture's lower-left edge.
3. **Photograph situations, never customers.** No faces paired with names, no quotes, no logos of firms
   that "use CoFile". People appear as hands, shoulders and working environments, so nobody can mistake a
   picture for a testimonial. The one exception is the real CoFile team (P10), photographed only if they
   are the real people and agree, and never captioned with a quote.
4. **Nothing official.** No state seals, flags used as emblems, capitol domes, eagles, IRS marks, or
   colors and layouts that copy a government site or letter. State websites are drawn as neutral
   schematics, and state documents and the IRS letter as neutral document cards (7.4).
5. **Warm people, cool frame.** Photography is warm, natural light. CoFile's frame around it is cool and
   neutral. Front of House in one look: the people are lit, the crew is in black.
6. **No stock.** Not one stock photo, stock illustration or stock icon set.

### 7.2 Product pictures

**Device frames, our own drawing.** A generic phone (screen 390 × 844 at 1×, corner radius 48, bezel 10 px
in Ink, a single 8 px camera dot centered at the top, no notch or island shape that copies a real phone)
and a generic browser window (40 px top bar in Gallery, a pill-shaped address field showing the page's real
path, no traffic-light dots). Both cast a stage shadow: `0 40px 80px -24px rgba(21,24,30,0.28), 0 8px 24px
-8px rgba(21,24,30,0.12)`.

**Fixture data, consistent across every picture on the site** (all from `Visuals.tsx` unless marked):

| Picture | Fixture |
|---|---|
| Example firms | Harbor & Pine CPA; Northgate Payroll |
| The desk | "Client filings", "New filing"; rows: Two Sisters Bakery LLC · New Jersey LLC formation · "Proof ready to approve"; Hudson Ledger LLC · New York LLC formation · "Filed"; Hudson Ledger LLC · EIN · "Filed, IRS letter saved"; Orchard Lane Inc. · Payroll registration (NJ-REG) · "Submitted" |
| The client page | "Start your New Jersey LLC"; fields "Business name", "Who owns it"; button "Continue" |
| The text | "Need an LLC for the bakery. It's me and my sister, 50/50, in Jersey City." · "Ana Ortiz · text message · example" |
| The draft | "Draft: New Jersey LLC formation" · "For your team to check"; Business name TWO SISTERS BAKERY LLC, Members Ana Ortiz, Lucia Ortiz (50/50), City Jersey City, NJ ("from the text"); Registered agent "Your saved agent", Organizer and signer "Your saved answers" ("already filled") |
| The proof | Two Sisters Bakery LLC · "Ready to approve"; Business name TWO SISTERS BAKERY LLC; Members Ana Ortiz, Lucia Ortiz (50/50); Main business address 88 Grove St, Jersey City NJ 07302; Formation filing fee $100.00; NJ portal fee, by card $3.50; Total to the state $103.50; "New Jersey's own review page, filled in": Business Name TWO SISTERS BAKERY, Designator LLC; "Approve for filing"; "New Jersey payment screen" $103.50 "Matches the proof" |
| The record | Stages "Approved", "Submitted", "Filed"; documents: New Jersey · Certificate of Formation · TWO SISTERS BAKERY LLC; IRS · EIN letter (CP 575) · EIN 00-0000000 |
| The rehearsal | "Rehearsal · New Jersey LLC formation" · "test details"; Business name filled; Name check passed; Registered agent filled; Members and signatures filled; Review page matched the proof; Payment: $103.50 matches the proof; Pay Now held, on purpose |
| Labels | "Example · test details · not a real firm"; "Two example firms · same page, each in its own brand"; "Sample proof · test details · not a real business"; "Example record · sample documents"; "Rehearsal · nothing filed, nothing paid" |
| Address bar paths | `cofile.app/p/harbor-and-pine` and `cofile.app/northgate-payroll/llc-filing-new-jersey` (fixture paths, not copy) |

**The example firms' logos** are commissioned fixtures, drawn by an identity designer as two believable,
modest professional-firm logos that look nothing alike: Harbor & Pine, a pine-and-wave monogram in pine
green beside the name in Lora; Northgate Payroll, a simple gate "N" built from two posts and a lintel in
navy beside the name in Montserrat. They're the example firms' identities, not ours, and appear only where
the copy names the firms.

**Every product picture is real at 1:1.** If a CPA leans in to read a fee, she can. No blurred UI, no lorem
ipsum, no "abstracted" squiggle rows. Where the copy gives no value for a field, the field shows a neutral
10 px grey bar (Rule) rather than invented text.

### 7.3 Photography

**Who to commission:** a documentary and editorial photographer who shoots small business and the
workplace for magazines and annual reports, with a producer who casts real working people (owners of real
bakeries, real bookkeepers) rather than models. Two shoot days: one in Jersey City and Hoboken, one on
Chicago's neighborhood main streets. A third, separate half-day for P10 if the CoFile team agrees.

**Look:** natural light, window light where possible. 35 mm and 50 mm primes at f/2.8 to f/4, so the
setting stays readable. Grading: warm neutral, whites kept white (no yellowed "vintage" cast), blacks
lifted only slightly, skin true. Unposed: people mid-task, never looking at the camera. Every frame leaves
clean negative space on one side for type, and every phone or laptop screen is shot straight-on as a clean
tracking-marked screen, so the real UI can be composited in post.

**Shot list:**

| # | Shot | What it shows | Where it's used |
|---|---|---|---|
| P1 | The upstairs hallway of a small professional building at 9 a.m.: two neighboring office doors, painted wood, each with a blank brass plate at eye height. Window light from the left. Shot square-on from across the hall. | Your name on the door, and another firm's on the next | Home, Firms (with the 3D plates); For firms |
| P2 | The same hallway at dusk: lights on behind the doors' frosted glass, a warm glow, the corridor lamps on. | The practice, open late | Home, Close (behind the plate) |
| P3 | Over the shoulder of a firm owner, 50s, at her desk with a laptop; a client folder and a mug beside it; late-afternoon light. Screen tracking-marked. | You approve it | How it works (step 2); For firms; the log-in page |
| P4 | A bakery counter at 6 a.m., flour on the counter, aprons on hooks; a hand holding a phone at chest height, thumb near the screen. Screen tracking-marked. No face. | The client fills in the firm's page | For firms (the client's side); How it works (step 1) |
| P5 | A contractor in a pickup cab, phone on the steering wheel, thumb typing. Screen tracking-marked. | Your client sends a text | Home, The Run on phones (state A); How it works (requests) |
| P6 | A first-time founder at a kitchen table at night, laptop open, a notebook of sketches beside it. | The client on their own time | The "Check your email" page |
| P7 | A firm's front desk mid-morning: a staffer on the phone, another walking past with papers, motion blur on the walker. | A busy practice that says yes | The sign-up page side panel |
| P8 | Hands at a print-shop counter turning over a letterhead proof with crop marks, business cards beside it. | You've approved a proof before | How it works (the proof section) |
| P9 | A tidy desk corner: a printed formation document and an envelope being slid into a client's binder. Documents shot blank and composited with neutral layouts. | The papers come back to you | How it works (after); the documents-back email header (firm-facing) |
| P10 | Only with the real team's consent: the actual filing professionals who run CoFile at work, two or three environmental frames, hands on keyboards, a phone call, a whiteboard. No names, no titles, no quotes. | When a filing needs a person, one of them takes over | For firms; Pricing (under the plans); How it works (step 3). If there's no real team shoot, these slots use the person glyph (7.6) and nothing else. |

**Never:** a handshake, a headset, a crowd round a laptop, a magnifying glass, a padlock, a shield, a
government building, a flag, a pile of messy paperwork as a "before" shot, a stressed person rubbing their
temples, an AI-generated face.

### 7.4 Illustration

Kept to a few precise kinds, drawn in-house or by a UI illustration studio, in one style: flat fills, 1.5 px
Ink lines at 1×, Gallery and white fills, yellow only for the dot.

- **The hand-off line:** a single 2 px Ink line with the yellow dot riding it. It links the text to the draft
  in The Run, and the proof to the record. Corner radius 24 px where it turns.
- **State-screen schematics:** New Jersey's LLC form, redrawn as neutral wireframes: a grey top bar with no
  emblem or state name, a page title as a grey bar, form rows. Real field labels appear only where the copy
  gives them ("Business Name", "Designator", "Pay Now"); values only where the fixture gives them (TWO
  SISTERS BAKERY, LLC, $103.50). Greys from 8% to 60% Ink only, so they read as "someone else's website"
  without imitating anyone's.
- **Document cards:** the papers that come back, drawn as white sheets (8.5 × 11 proportion) with grey
  text bars and a small label block (the issuer in Fine, the title in 15 px Medium, the reference line in
  14 px). Never a facsimile: no seal, crest, signature, barcode, letterhead layout or eagle.
- **Coverage dots:** 4.2.
- **Empty states and errors:** the mark's ring and dot, drawn large at 120 px in Rule and yellow.

### 7.5 3D: the brass door plates

The site's one 3D object, used on the home page (Firms and Close) and For firms.

**Who to commission:** a product-visualization 3D studio that does photoreal materials for real-time web
(WebGL) as well as stills.

**The object:** a satin-brushed brass plate, 300 × 100 mm, 4 mm thick, 1.5 mm chamfered edge, corner radius
4 mm, fixed with four countersunk brass screws 12 mm in from each corner, composited onto the blank plates in
P1 and P2. Text is engraved 0.4 mm deep and filled with black enamel, set in the firm's font, centered, cap
height 22 mm, one or two lines balanced automatically. Harbor & Pine CPA's plate is in Lora; Northgate
Payroll's in Montserrat.

**Light and camera:** matched to P1 (key from the left like the hallway window, 5600 K; warm fill from the
corridor lamps, 3200 K, low; a thin specular streak along the top edge) and P2 (warm key from the lamp above,
glow from the frosted glass). Square-on, 50 mm equivalent, the plates in focus and the door edges falling
off softly.

**Deliverables:**

- A real-time model (glTF, under 1.2 MB with textures, KTX2 compression) whose engraving is generated live
  from text: a signed-distance-field text mask drives the normal map, cavity occlusion and enamel fill, so
  any firm name engraves correctly in any preset font.
- Still renders of the blank plate matched to P1 and P2 at 3200 px, plus layered PSDs, so the site can
  composite SVG text into the engraving (inner shadow plus enamel fill) when WebGL isn't available.
- A 1.2-second "glint" pass (a light sweep across the brass) for the moment a name is finished.

### 7.6 Iconography

A 44-icon set commissioned from a UI icon designer: 24 px grid, 1.75 px stroke, round caps and joins, 2 px
corner radius, Ink by default, currentColor in product. It includes the glyphs for the home page's lists
(link, page, cursor-on-button, person-with-pin for the registered agent, window for the review page,
receipt for fees, arrow-return for changes, document, envelope for the IRS letter, bell for updates) and
the product set: text message, copy, paste, phone, laptop, calendar, clock, card (generic, no network
marks), people, person, storefront (never a columned government building), arrow-right, download,
signature, pen, upload, settings, palette, font, eye, plus, minus, chevrons, close, menu, search, filter,
sort, external link, code, webhook, key, play, pause.

**Banned from the set:** padlock, shield, vault, seal, rosette, stamp, badge-with-check, fingerprint,
eye-with-slash for "private", magnifier-over-document. A check glyph exists only inside a checkbox and on
completed setup steps, never as decoration in front of a sentence.

### 7.7 Texture

None on CoFile surfaces. Flat, clean, white. The only textures on the site are the real ones in the
photographs and the brass and paint of the door plates. No paper grain, no noise overlays, no fake
letterpress.

---

## 8. Motion

### 8.1 Principles

- **Motion shows the work moving between hands.** Every animation is something passing from one person or
  place to the next: a message becoming a draft, the firm's go-ahead, a screen filling, a document coming
  home. Nothing spins for decoration.
- **It plays once, then gets out of the way.** Story animations run the first time a picture is 40% in
  view, then hold their final frame. A small round replay button (play icon, 40 px, the picture's
  bottom-right corner, its accessible name `[copy needed]`) runs it again.
- **Money never moves.** Prices and fees appear complete and stay still. No counting up, no odometers, no
  "$45" flipping into place. A price that animates looks like it's negotiating.
- **Nothing moves the reader's text.** Headlines and paragraphs fade in with at most 12 px of rise, or not at
  all; pictures do the moving.
- **Reduced motion means final frames.** With `prefers-reduced-motion: reduce`, every sequence renders its
  finished state at once, The Run stops pinning and becomes three static pictures, and the door plates are
  still renders. Each final frame is designed to tell its story on its own.

### 8.2 Tokens

| Token | Value | Use |
|---|---|---|
| `--ease-settle` | `cubic-bezier(0.2, 0.8, 0.2, 1)` | Things arriving and coming to rest |
| `--ease-move` | `cubic-bezier(0.45, 0, 0.2, 1)` | Things travelling (the dot, documents, the text phrases) |
| `--ease-exit` | `cubic-bezier(0.4, 0, 1, 1)` | Things leaving |
| `--t-micro` | 140 ms | Hover, press, chip changes |
| `--t-ui` | 260 ms | Menus, disclosures, color changes |
| `--t-scene` | 600 ms | A picture entering, a Run state changing |
| Spring (documents, cards) | stiffness 320, damping 28, mass 1 | Landing with a small, satisfying settle |
| Stagger | 60 to 120 ms | Rows, chips, dots |

### 8.3 The moments

| # | Moment | Where | What happens | Duration | Why it sells |
|---|---|---|---|---|---|
| M1 | **The desk comes alive** | Home, Hero | The window rises 24 px and fades in; Harbor & Pine's pine rule draws left to right; the firm's name sets in; the four rows slide in from 8 px below (90 ms stagger). Then the desk does a moment of real work: Orchard Lane's chip settles on "Submitted", a small document glyph slides into Hudson Ledger's EIN row as its chip reads "Filed, IRS letter saved", and last, Two Sisters Bakery's row gains a 3 px pine-green left edge as its "Proof ready to approve" chip arrives. | 3.0 s, once, on load | The first thing that moves on the site is the firm's name; the last is the job waiting for the firm. |
| M2 | **Same page, two brands** | Home, Firms | The two client pages rise in front of their doors; then their matching fields light in sync (a 2 px outline in each firm's own color on "Business name", then "Who owns it", then "Continue", 300 ms each), so the eye reads "same page" across two very different brands. | 1.8 s, once | "Your logo and color on every page your client sees," proved by comparison. |
| M3 | **Your name on the door** | Home, Firms; For firms | Clicking the second door's plate (or its pencil button) and typing engraves the plate letter by letter (each letter carves in 40 ms, its enamel fills 120 ms later); the client page in front of that door picks up the name in its header at once; choosing one of the eight color dots re-colors that page (260 ms cross-fade). 700 ms after the last keystroke the glint sweeps the brass. | Live, per keystroke | The single most memorable moment on the site: the visitor sees their own firm's name on a door beside another firm's, and their own client page under it. |
| M4 | **The Run, A: a text becomes a draft** | Home, Requests | The text bubble arrives in the phone with a typing indicator (600 ms). Three phrases highlight in turn with a soft yellow underline ("an LLC for the bakery", "me and my sister, 50/50", "in Jersey City"); from each, a hand-off line draws to the drafted filing in the desk window beside the phone, where the matching row fills and takes its "from the text" tag. Then the two saved rows fill together with a pine-green left edge and "already filled". The "For your team to check" chip arrives last. | 3.4 s per entry | "Nobody retypes it," happening by itself. |
| M5 | **The Run, B: the go-ahead** | Home, The proof | The phone slides out left; the draft in the window folds up into the proof (the rows stay, the header becomes Harbor & Pine's letterhead, fees and the review page slide in beneath). A pointer glides to "Approve for filing" and presses it (2 px sink); the chip "Ready to approve" cross-fades to "Approved"; a yellow dot rises out of the button. | 2.4 s per entry | "Nothing is filed or paid until you approve the proof," shown as the firm's own hand on the button. |
| M6 | **The Run, C: papers come home** | Home, After | The dot travels a short arc to the top of the record; the stage track draws "Approved", "Submitted", "Filed" in turn (the dot stops at each, 300 ms); then the two document cards fly in from the top right on a gentle arc (700 ms each, 160 ms stagger) and land on the record with a spring, slightly overlapped and turned (−3°, +2°) like papers set down on a desk. The dot settles into the ring's gap in a small mark in the record's corner. | 2.8 s per entry | The round trip closes: "Then it's filed, and the papers come back to you." |
| M7 | **The menu settles** | Home, Coverage; What we file | Each tile's dots appear left to right and top to bottom, 30 ms apart, once. | 1.2 s | A calm, honest read of where each filing stands. |
| M8 | **The stage plays** | Home, Rehearsals; What we file | The house lights dim as the band arrives (the spotlight fades up over 900 ms). The stage screen fills New Jersey's screens in turn while the run sheet beside it lights line by line in step. The last line simply arrives in Graphite and the last screen's "Pay Now" button stays drawn in a dashed outline. The run then holds, with a pause and play control. | 9 s, then holds; replays on play | The whole filing performed on the real stage. It shows the work, not a stop. |
| M9 | **Your name at dusk** | Home, Close | The door at dusk fades up; if the visitor typed their firm's name in Firms, it's on the plate and the glint runs once; then the ring of the small mark beside the button draws and its dot comes to rest. | 1.4 s, once | The page ends where "Say yes, under your own name" began. |
| M10 | **Letterhead becomes the proof** | How it works | A Harbor & Pine letterhead proof with crop marks (the thing every firm has approved at a printer) sits in the window; the crop marks fade, the letterhead's header stays put, and the body reflows into the proof's rows. | 1.6 s, once | It makes the comparison in the lede visible: the proof is the firm's own letterhead doing a new job. |
| M11 | **Point to it** | How it works | Hovering or focusing one of the six list items washes the matching region of the proof in a 12% firm tint with a 2 px outline, and scrolls the proof inside its frame to it. | 260 ms per change | An interactive tour of the proof, at the reader's pace. |
| M12 | **Your brand, everywhere at once** | For firms | Typing in "Name your clients see" and picking a "Main color" re-brands four live previews at once (the desk, the client page, the proof, an email): name first, then color, 60 ms stagger. | Live | "Your filing desk, in your brand," in the visitor's own brand. |

**The Run's mechanics (desktop).** The picture is pinned (`position: sticky`, top 120 px) in the right seven
columns while the three text blocks scroll on the left. When a block's headline crosses the middle of the
viewport, the picture plays the transition into that state forward at its own pace (M4, M5, M6), and plays
it in reverse when the reader scrolls back up. It isn't scrubbed to the scroll position: scrubbed product
demos feel sticky and slow, and the reader loses the thread. A slim progress rail of three dots at the
picture's left edge shows which state is showing, each a button that jumps to its section.

**Micro-interactions:**

- **Buttons:** the yellow button lifts 1 px on hover with its bottom edge deepening; on press it sinks 2 px
  onto its edge (`--t-micro`). Firm-colored buttons do the same in their shade.
- **Chips** change tone with a 140 ms color cross-fade, never a bounce.
- **"Filing now"** on the filing desk shows a slim indeterminate bar in the firm's button shade under the
  chip; on CoFile's own dashboard the same status shows the mark with its dot circling once every 1.6 s.
- **Copy link** buttons morph their icon from copy to a check for 1.2 s.
- **Accordions** (Questions) open with a 260 ms height ease and a chevron turning 180°.

---

## 9. The home page, section by section

All copy below is quoted from `web/app/page.tsx`, `web/components/landing/Shell.tsx`,
`web/components/BetaBanner.tsx` and the stand-ins in `web/components/landing/Visuals.tsx`. "CoFile" stands
where the code says `{name}`; prices are the values `web/lib/pricing.ts` gives today.

The seven stand-in pictures become six designed pictures plus two new ones: the Requests, Proof and After
pictures are merged into one pinned picture with three states (The Run), the Pricing section is its own
picture (the price, set large), and the Close gets a picture it never had (the door at dusk).

### 9.0 The frame: beta notice and header

**Beta notice.** A slim bar above the header: Gallery background, `Rule` bottom line, 15 px Small type in
Ink. A "Beta" chip leads (Rehearsal Tint, Ink text, 14 px Medium: beta and rehearsal are the same promise).
Desktop shows the whole notice, two lines at most, centered on the content column:

> **Beta** CoFile is in beta. Any filing can run as a free rehearsal on the state's real website. It stops
> before the last button, so nothing is filed or paid. Filing types go live one at a time. Questions or
> problems? hello@cofile.app

Phone: one line, "**Beta** CoFile is in beta." with a chevron; tapping expands the rest in place (260 ms),
and the bar remembers its state for the visit. It isn't dismissible: it's short, and it's true.

**Header.**

```
 Desktop (72 px)
 ┌──────────────────────────────────────────────────────────────────────────────────────────────┐
 │ (◯•) CoFile    How it works  For firms  What we file  Pricing  For platforms   Log in  [ Run a free rehearsal ] │
 └──────────────────────────────────────────────────────────────────────────────────────────────┘
   mark 28 px     17 px Medium Ink, 28 px apart                                text link  yellow, 48 px

 Phone (60 px)                                  Phone sticky bottom bar (after the hero's button scrolls away)
 ┌──────────────────────────────┐               ┌──────────────────────────────┐
 │ (◯•) CoFile      Log in   ☰  │               │ [    Run a free rehearsal   ] │  56 px button, 20 px margins
 └──────────────────────────────┘               └──────────────────────────────┘
```

- The five links ("How it works", "For firms", "What we file", "Pricing", "For platforms") take a 2 px Ink
  underline, offset 6 px, on the page they lead to. "Pricing" sits fourth, where a buyer's eye looks for it.
- Below 1180 px the links collapse into the menu button. The phone menu is a full-height sheet from the
  right: the five links at 24 px Medium in 64 px rows, then "Log in" and the yellow button at the bottom,
  within thumb reach.

---

### 9.1 Hero

**Copy placed:** kicker "For CPA, payroll, fractional CFO and title firms" · H1 "Your client needs an LLC.
Say yes, under your own name." · sub "CoFile files your clients' formations, EINs and payroll registrations
on the official state and IRS websites, once you approve." · buttons "Run a free rehearsal" and "See
pricing" · note "Built and run by filing professionals. When a filing needs a person, one of them takes
over." · picture label "Example · test details · not a real firm".

**The idea:** the headline promises "under your own name", and the picture keeps the promise on the spot:
the first product the visitor sees is a firm's own filing desk, in that firm's brand, with a client's job
waiting at the top. The largest company name in the first screen of our site is Harbor & Pine CPA's.

**Desktop**

```
 white page
┌──────────────────────────────────────────────────────────────────────────────────────────────┐
│ ━━ For CPA, payroll, fractional CFO and title firms                                          │
│                                                                                              │
│ Your client needs an LLC.                                                                    │  Display 72/76
│ Say yes, under your own name.                                                                │
│                                                                                              │
├───────────────────────────────┬──────────────────────────────────────────────────────────────┤
│                               │░░░░░░░░░░░░░░░░░ Gallery stage, bleeds right ░░░░░░░░░░░░░░░░░│
│ CoFile files your clients'    │░ ┌──────────────────────────────────────────────────────────┐ │
│ formations, EINs and payroll  │░ │ ( cofile.app/p/harbor-and-pine )                          │ │
│ registrations on the official │░ ├──────────────────────────────────────────────────────────┤ │
│ state and IRS websites, once  │░ │▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀ pine green 6px ▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀│ │
│ you approve.                  │░ │ [H&P logo] Harbor & Pine CPA               (◯•) with CoFile│ │
│                               │░ │            Filing desk                                    │ │
│ [ Run a free rehearsal ]      │░ │ Filings   New filing   Ready to pay   Client links        │ │
│                               │░ ├──────────────────────────────────────────────────────────┤ │
│ See pricing →                 │░ │ Client filings                            [ New filing ]  │ │
│                               │░ │▌Two Sisters Bakery LLC                 (Proof ready to   │ │
│ (👤) Built and run by filing  │░ │▌New Jersey LLC formation                approve)       ›  │ │
│      professionals. When a    │░ │ Hudson Ledger LLC                       (Filed)           │ │
│      filing needs a person,   │░ │ New York LLC formation                                    │ │
│      one of them takes over.  │░ │ Hudson Ledger LLC                       (Filed, IRS       │ │
│                               │░ │ EIN                                      letter saved)    │ │
│                               │░ │ Orchard Lane Inc.                       (Submitted)       │ │
│                               │░ │ Payroll registration (NJ-REG)                             │ │
│                               │░ └──────────────────────────────────────────────────────────┘ │
│                               │░ Example · test details · not a real firm                   │
└───────────────────────────────┴──────────────────────────────────────────────────────────────┘
  cols 1–4                        cols 5–12 + bleed
```

- **Kicker:** 17 px Medium Ink, led by a 24 × 3 px yellow rule. Sentence case.
- **H1:** Display 72/76, Ink, across the full content width in two lines, broken at the full stop: "Your
  client needs an LLC." / "Say yes, under your own name." Setting it wide and short (rather than squeezed
  into a column) makes it read in one glance, the way a shop sign does.
- **Sub:** 20/32, Graphite, max 28 em, in the four left columns, top-aligned with the window's top edge.
- **Buttons:** "Run a free rehearsal" as the Large primary (yellow, 56 px tall, 28 px side padding).
  "See pricing" as a text link in 19 px Medium Ink with a 2 px underline and a right arrow, 20 px below:
  in a narrow column, a stacked pair reads better than a cramped row, and it keeps the yellow button alone.
- **Note:** Small, 15/22, Graphite, 32 px below, beside a 36 px Gallery circle holding the person glyph in
  Ink (7.6). If the real-team shoot (P10) happens, the circle becomes three overlapping 36 px portrait
  circles of real team members, with no names. It's the one human note in the first screen.

**The picture: Harbor & Pine's desk** (replaces `DeskVisual`)

- **What it shows:** Harbor & Pine CPA's filing desk overview, the real product's layout at 1:1, with the
  four fixture rows. One job waits for the firm at the top of the list; the others are moving or done.
- **Frame:** a generic browser window, 780 × 560, on a Gallery stage that bleeds to the right edge of the
  viewport. Address field `cofile.app/p/harbor-and-pine` (fixture).
- **Header (logo bay, 3.5):** the 6 px pine rule; Harbor & Pine's logo at 40 px; "Harbor & Pine CPA" in Lora
  Semibold 24 px (larger than our 18 px header wordmark, on purpose); "Filing desk" under it in 14 px
  Graphite; the small-type lockup at the far right at its true 13 px.
- **Desk nav:** the product's real first four tabs, "Filings", "New filing", "Ready to pay", "Client links",
  in 15 px Medium; "Filings" active with a 2 px pine underline and a 6% pine tint.
- **Body:** "Client filings" (22 px Medium) with the "New filing" button (pine, white text, 40 px tall,
  radius 10) at right. Four rows, 76 px tall, `Rule` hairlines: the business name in 17 px Medium Ink over
  its filing type in 15 px Graphite, the status chip at right. Chips by tone (4.2): "Proof ready to approve"
  in Your turn; "Filed" and "Filed, IRS letter saved" in Done; "Submitted" in In motion.
- **The waiting row:** Two Sisters Bakery LLC's row carries a 6% pine tint, a 3 px pine left edge and a
  chevron at its right end. It's the only row that looks clickable, and it is.
- **States:** at rest (final frame of M1); hover (each row lifts 1 px and darkens its hairline; the waiting
  row's chevron moves 2 px right); focus (3 px pine outline); click on the waiting row scrolls smoothly
  (700 ms, `--ease-move`) to The Run's proof state (9.4). Other rows aren't interactive. Dark mode: the
  window stays light on Night. Reduced motion: the final frame.
- **Motion:** M1 (3.0 s on load).
- **Label:** "Example · test details · not a real firm", Fine, Graphite, under the window's lower-left corner.

**Phone**

```
┌──────────────────────────────┐
│ Beta  CoFile is in beta.   ⌄ │
├──────────────────────────────┤
│ (◯•) CoFile      Log in    ☰ │
├──────────────────────────────┤
│ ━━ For CPA, payroll,         │
│    fractional CFO and title  │
│    firms                     │
│                              │
│ Your client needs            │  40/44, four lines
│ an LLC. Say yes,             │
│ under your own               │
│ name.                        │
│                              │
│ CoFile files your clients'   │  17/27 Graphite
│ formations, EINs and payroll │
│ registrations on the ...     │
│                              │
│ [   Run a free rehearsal   ] │  full width, 56
│        See pricing →         │  text link, centered
│                              │
│ (👤) Built and run by filing │  15/22
│      professionals. ...      │
├──────────────────────────────┤
│░░░░░ Gallery, full bleed ░░░░│
│░ ┌──────────────────────────┐│  the desk's own phone layout,
│░ │▀▀▀▀▀▀ pine ▀▀▀▀▀▀▀▀▀▀▀▀▀▀││  no browser chrome: header,
│░ │[H&P] Harbor & Pine CPA   ││  "Client filings", rows as
│░ │ Client filings  [New ...]││  stacked cards with chips
│░ │ ▌Two Sisters Bakery LLC  ││  under the names
│░ │ ▌(Proof ready to approve)││
│░ │  Hudson Ledger LLC (Filed)│
│░ └──────────────────────────┘│
│░ Example · test details · ...│
└──────────────────────────────┘
```

On phones M1 starts when the desk is 30% in view, not on load, so nobody misses it below the fold.

---

### 9.2 Firms: "Your name on the door. Ours in small type."

**Copy placed:** H2 "Your name on the door. Ours in small type." · lede "Your logo and color on every page
your client sees." · list "A link for each client" · "A page for every filing you offer" · "A button for your
own website" · "Your registered agent, or ours" · link "For firms" · picture label "Two example firms · same
page, each in its own brand".

**The idea:** the headline, made literal. Two office doors side by side in the same hallway, each with its
own brass plate, and in front of each door the same client page in that firm's brand. CoFile appears on
both pages exactly as the headline says: in small type. And the second door is the visitor's to take.

**Desktop** (Gallery band; picture left, words right, so the page zigzags)

```
┌──────────────────────────────────────────────────────────┬──────────────────────────────┐
│ ┌──────────────────────────────────────────────────────┐ │                              │
│ │ P1: the hallway, two doors, morning light            │ │ Your name on the door.       │
│ │                                                      │ │ Ours in small type.          │
│ │   ┌──────────────────────┐   ┌──────────────────────┐│ │                              │
│ │   │  Harbor & Pine CPA    │   │  Northgate Payroll ✎ ││ │ Your logo and color on every │
│ │   └──────────────────────┘   └──────────────────────┘│ │ page your client sees.       │
│ │        (Lora, brass)              (Montserrat, brass) │ │                              │
│ │                                                      │ │ [🔗] A link for each client  │
│ │    ┌──────────────┐            ┌──────────────┐      │ │ [▭] A page for every filing  │
│ └────│▀▀▀ pine ▀▀▀▀▀│────────────│▀▀▀ navy ▀▀▀▀▀│──────┘ │     you offer                │
│      │[H&P] Harbor &│            │[N] Northgate │        │ [⌖] A button for your own    │
│      │ Pine CPA     │            │ Payroll      │        │     website                  │
│      │ Start your   │            │ Start your   │        │ [⚑] Your registered agent,   │
│      │ New Jersey   │            │ New Jersey   │        │     or ours                  │
│      │ LLC          │            │ LLC          │        │                              │
│      │ Business name│            │ Business name│        │ For firms →                  │
│      │ [__________] │            │ [__________] │        │                              │
│      │ Who owns it  │            │ Who owns it  │        │                              │
│      │ [__________] │            │ [__________] │        │                              │
│      │ [ Continue ] │            │ [ Continue ] │        │                              │
│      │(◯•) with CoFile│          │(◯•) with CoFile│      │                              │
│      └──────────────┘            └──────────────┘        │                              │
│                                   ● ● ● ● ● ● ● ●        │                              │
│  Two example firms · same page, each in its own brand    │                              │
└──────────────────────────────────────────────────────────┴──────────────────────────────┘
  cols 1–7 + bleed left                                      cols 8–12
```

**The picture: Two doors** (replaces `TwoFirmsVisual`)

- **What it shows:** photo P1 (an upstairs hallway, two neighboring office doors) with two live 3D brass
  plates (7.5) composited onto the doors' blank plates: "Harbor & Pine CPA" engraved in Lora on the left,
  "Northgate Payroll" in Montserrat on the right. In front of each door, a phone with the same client page
  ("Start your New Jersey LLC", "Business name", "Who owns it", "Continue") in that firm's brand: Harbor &
  Pine's pine rule, logo, Lora and pine button; Northgate's navy rule, gate logo, Montserrat and navy button.
  The small-type lockup sits in each phone's footer.
- **Composition:** the photo at 16:10, radius 20, filling seven columns and bleeding to the left edge of the
  viewport. The phones (260 px wide, the page at 0.67 scale) stand centered under their doors and overlap
  the photo's bottom edge by 45% of their height, so each page sits in front of its own door. The pages'
  small-type lockups are counter-scaled to stay 13 px on screen, the same size a client really sees.
- **Making it yours:** the right-hand door is the visitor's to take. A 32 px white circular pencil button
  sits at the top-right corner of Northgate's plate (accessible name `[copy needed]`), and hovering the
  plate shows a text caret. Click the plate or the pencil and type: the plate engraves the visitor's firm
  name letter by letter (M3), and the phone in front of that door changes its header to the new name, with
  a monogram tile in place of Northgate's logo (logo bay rule 6). Under the right phone, the eight ready
  colors (4.4) sit as 24 px dots (the group's accessible name: "Main color", the Setup label); choosing one
  re-colors that page. Max 40 characters; a long name balances onto two lines on the plate. Clearing the
  plate returns Northgate Payroll. The left door always stays Harbor & Pine, so the comparison holds.
- **Carry-over:** the typed name and color stay in the visitor's browser only (local storage, never sent
  anywhere). They reappear on the Close's door (9.9), pre-fill "Firm name" on the sign-up page, and
  pre-fill "Name your clients see" and "Main color" in Branding setup after sign-up.
- **States:** at rest; editing (the plate shows a caret and a 2 px yellow focus ring around its edge);
  personalized; hover on either phone (it lifts 4 px); reduced motion (the plate updates without carving or
  glint); no WebGL (still render with SVG engraving).
- **Motion:** M2 on entry (the two phones rise, their fields light in sync), M3 on edit.
- **Label:** "Two example firms · same page, each in its own brand", Fine, Graphite, under the picture.

**The words:** the four list items become icon rows: a 36 px white rounded square (radius 10, `Rule`
border) holding a 20 px Ink glyph (link; page; cursor on a button; person with a pin), then the text at
19/28 Ink, 16 px between rows. No ticks. "For firms" is a text link with an arrow, 32 px under the list.

**Phone**

```
┌──────────────────────────────┐
│ Your name on the door.       │
│ Ours in small type.          │
│ Your logo and color on every │
│ page your client sees.       │
│ [🔗] A link for each client  │
│ [▭] A page for every filing  │
│     you offer                │
│ [⌖] A button for your own    │
│     website                  │
│ [⚑] Your registered agent,   │
│     or ours                  │
│ For firms →                  │
├──────────────────────────────┤
│ ┌──────────────────────────┐ │  P1 cropped 3:2 to the two plates;
│ │ [Harbor & Pine CPA]      │ │  the plate of the page below is lit,
│ │        [Northgate Payroll]│ │  the other dims to 60%
│ └──────────────────────────┘ │
│     ( H&P )  ( N )           │  two logo tiles as a toggle
│ ┌──────────────────────────┐ │  one phone page at 0.8 scale;
│ │▀▀▀ pine ▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀│ │  swipe or tap the toggle to
│ │ Start your New Jersey LLC│ │  switch firms (260 ms cross-fade)
│ │ ...                      │ │
│ └──────────────────────────┘ │
│ Two example firms · same ... │
└──────────────────────────────┘
```

On phones, tapping the lit Northgate plate opens the same edit (the keyboard rises with the plate scrolled
into view above it); the color dots sit under the page.

---

### 9.3 to 9.5: The Run (Requests, The proof, After)

The middle of the page is one picture told in three states. On desktop, the three sections share a white
band about three screens tall: their text blocks scroll on the left, each centered in its own screen, while
one picture, Harbor & Pine's desk window, stays pinned on the right and changes state as each headline
passes the middle of the viewport (mechanics in 8.3). The window frame and Harbor & Pine's header never
move; only the body changes, so the reader feels one filing moving through one firm's desk.

```
 Desktop: the pinned picture (cols 6–12 + bleed right, on a Gallery stage)

  scroll ↓                                   ┌─────────────────────────────────────────────────┐
 ┌──────────────────────────┐                │ ( cofile.app/p/harbor-and-pine )                 │
 │ Your client sends a text.│  ── state A ── │▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀ pine 6px ▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀│
 │ Nobody retypes it.       │                │ [H&P] Harbor & Pine CPA        (◯•) with CoFile │
 │ Forward the text, ...    │                ├─────────────────────────────────────────────────┤
 └──────────────────────────┘                │                                                 │
            ⋮                    ●  A        │          the body changes: A, B, C              │
 ┌──────────────────────────┐    ○  B        │                                                 │
 │ Nothing is filed or paid │    ○  C        │                                                 │
 │ until you approve the    │  progress      │                                                 │
 │ proof. ...               │  rail          └─────────────────────────────────────────────────┘
 └──────────────────────────┘                  label for the current state, Fine, under the window
            ⋮
 ┌──────────────────────────┐
 │ Then it's filed, and the │
 │ papers come back to you. │
 └──────────────────────────┘
```

On tablets and phones there's no pinning: each section has its own copy of the picture, frozen in its
state, directly after its words. With reduced motion, desktop does the same.

---

### 9.3 Requests: "Your client sends a text. Nobody retypes it."

**Copy placed:** H2 "Your client sends a text. Nobody retypes it." · lede "Forward the text, email, WhatsApp
or Slack message. AI drafts the filing, your saved answers fill in the rest, and your team checks it." ·
picture text from the stand-in: the bubble "Need an LLC for the bakery. It's me and my sister, 50/50, in
Jersey City." with "Ana Ortiz · text message · example", and the draft "Draft: New Jersey LLC formation",
"For your team to check", its five rows and their "from the text" and "already filled" tags.

**The picture, state A: a text becomes a draft** (replaces `TextToFormVisual`)

```
        ┌────────────────┐   ┌───────────────────────────────────────────────┐
        │ phone          │   │ [H&P] Harbor & Pine CPA        (◯•) with CoFile │
        │                │   ├───────────────────────────────────────────────┤
        │ ┌────────────┐ │   │ Draft: New Jersey LLC formation               │
        │ │ Need an LLC│─┼───┼─▶ (For your team to check)                    │
        │ │ for the    │ │   │ ▌Business name  TWO SISTERS BAKERY LLC        │
        │ │ bakery.    │ │   │ ▌               ● from the text                │
        │ │ It's me and│─┼───┼─▶▌Members      Ana Ortiz, Lucia Ortiz (50/50)  │
        │ │ my sister, │ │   │ ▌               ● from the text                │
        │ │ 50/50, in  │─┼───┼─▶▌City         Jersey City, NJ                 │
        │ │ Jersey City│ │   │ ▌               ● from the text                │
        │ └────────────┘ │   │ ▌Registered agent      Your saved agent       │
        │ Ana Ortiz ·    │   │ ▌                      ● already filled        │
        │ text message · │   │ ▌Organizer and signer  Your saved answers     │
        │ example        │   │ ▌                      ● already filled        │
        └────────────────┘   └───────────────────────────────────────────────┘
          overlaps the window's left edge by 64 px
```

- **What it shows:** the client's one-line text, on the client's phone, and the filing it became on the
  firm's desk.
- **The phone:** our generic frame at 0.8 scale, cropped at the bottom, overlapping the window's left edge
  by 64 px and sitting 40 px lower than the window's top, so it reads as "arriving". A single incoming
  message in our own bubble design (not any messaging app's): Gallery fill, radius 22 with a 6 px tail at
  bottom-left, 20 px padding, the text at 20/28 Regular Ink so it reads at a glance. "Ana Ortiz · text
  message · example" in Fine under the bubble. No avatar, no face.
- **The draft:** in the window's body, in the filing desk's style. "Draft: New Jersey LLC formation" at 22 px
  Medium with the "For your team to check" chip (Your turn tone: it's the team's next step). Rows 64 px, label
  in 15 px Graphite, value in 17 px Ink.
- **Where each answer came from, shown by color:** the three rows from the text carry a 3 px yellow left
  edge, and the phrases they came from carry a matching soft yellow underline in the bubble ("an LLC for the
  bakery", "me and my sister, 50/50", "in Jersey City"); their tag "from the text" is 14 px Ink led by an
  8 px yellow dot. The two saved rows carry a 3 px pine left edge and 12% pine tint, and their tag "already
  filled" is led by an 8 px pine dot. Yellow is what came in; the firm's color is what the firm already
  knows. No legend needed.
- **Hand-off lines:** 1.5 px Ink lines from each highlighted phrase to its row, drawn during M4 and resting at
  40% opacity afterwards.
- **States:** at rest (all rows filled, lines at rest); entering (M4); reduced motion (final frame).
- **Label:** "Ana Ortiz · text message · example" is the picture's own label; no second one.

**The words:** H2 and lede in the left five columns, vertically centered on the pinned window.

**Phone**

```
┌──────────────────────────────┐
│ Your client sends a text.    │
│ Nobody retypes it.           │
│ Forward the text, email,     │
│ WhatsApp or Slack message... │
├──────────────────────────────┤
│░ ┌──────────────────────────┐│  P5 (a hand typing in a truck cab)
│░ │ P5, the bubble composited ││  with the bubble on its screen;
│░ │ on the phone screen       ││  or the UI phone alone if P5 is
│░ └──────────────────────────┘│  not yet shot
│░ Ana Ortiz · text message ·  │
│░        ┃ (lines drop)       │
│░ ┌──────────────────────────┐│
│░ │ Draft: New Jersey LLC    ││  the draft card, full width;
│░ │ formation                ││  rows stack label over value,
│░ │ ▌Business name ...       ││  tag beneath
│░ └──────────────────────────┘│
└──────────────────────────────┘
```

On phones the phrases lift out of the bubble and drop into the draft below it.

---

### 9.4 The proof: "Nothing is filed or paid until you approve the proof."

**Copy placed:** H2 "Nothing is filed or paid until you approve the proof." · lede "One page: every detail,
every fee." · list "The state's own review page, where possible" · "Every fee checked again before paying" ·
"Any later change comes back for approval" · link "How it works" · the stand-in proof's text ("Harbor & Pine
CPA", "example firm", "Two Sisters Bakery LLC", "Ready to approve", the rows, fees, "New Jersey's own review
page, filled in", "Approve for filing", "New Jersey payment screen", "$103.50", "Matches the proof") · label
"Sample proof · test details · not a real business".

**The idea:** the firm is in charge, so the proof is drawn as the firm's own letterhead with the firm's one
button, and the motion is the firm pressing it. Approving reads as the go-ahead it is.

**The picture, state B: the go-ahead** (replaces `ProofVisual`)

```
   ┌───────────────────────────────────────────────┐
   │ [H&P] Harbor & Pine CPA        (◯•) with CoFile │   the window header stays
   │       example firm                            │
   ├───────────────────────────────────────────────┤
   │ Two Sisters Bakery LLC      (Ready to approve) │   Lora 30 px
   │                                               │
 ① │ Business name          TWO SISTERS BAKERY LLC │
   │ Members        Ana Ortiz, Lucia Ortiz (50/50) │
   │ Main business address  88 Grove St, Jersey    │
   │                        City NJ 07302          │
 ② │ Formation filing fee                 $100.00 │
   │ NJ portal fee, by card                 $3.50 │
   │ Total to the state                   $103.50 │   Bold
 ③ │ ┌ New Jersey's own review page, filled in ──┐ │
   │ │ Business Name   TWO SISTERS BAKERY         │ │   neutral schematic
   │ │ Designator      LLC                        │ │
   │ └────────────────────────────────────────────┘ │
 ④ │ [            Approve for filing             ] │   pine, full width
   └───────────────────────────────────────────────┘
     ┊ New Jersey payment screen   $103.50  (Matches the proof) ┊   the stub
   Sample proof · test details · not a real business
```

- **What it shows:** the proof for Two Sisters Bakery LLC as Harbor & Pine sees it: one page, every detail,
  every fee, the state's own review page and one button.
- **The sheet:** the window body becomes the proof's page. Harbor & Pine's header gains "example firm" in
  Fine under the name. "Two Sisters Bakery LLC" in Lora Semibold 30 px with the "Ready to approve" chip (Your
  turn). Rows as label/value pairs (labels 15 px Graphite, values 17 px Ink in Lora with tabular figures,
  `Rule` hairlines); the total in Bold. The review page as the neutral schematic (7.4) in a small inset frame
  with the copy's label above it. "Approve for filing" as a full-width pine button, 56 px tall, radius 10.
- **Region markers:** the stand-in's four numbered regions become four small numerals (14 px Medium,
  Graphite) in the sheet's left margin, aligned to each region's first line, with no circles or boxes. They
  help the eye and the list's hover links; they're not a checklist.
- **The stub:** "New Jersey payment screen · $103.50 · Matches the proof" sits under the sheet like a
  payment stub torn from the bottom of a form: the same width, 48 px tall, joined to the sheet by a dashed
  `Rule` perforation line, white, with "Matches the proof" as a Done chip. It's small, still and last. It
  never animates and never gets a badge.
- **Linking the words to the picture:** hovering or focusing a list item outlines its region (2 px pine,
  12% pine wash, 260 ms): "The state's own review page, where possible" → region 3; "Every fee checked
  again before paying" → region 2 and the stub; "Any later change comes back for approval" → region 4, the
  button. The list items are the triggers; the picture never moves on its own while the reader hovers.
- **States:** before approval (the chip reads "Ready to approve"); after M5 (the chip reads "Approved",
  Done tone, the button shows its pressed state for 600 ms and returns); hover links; reduced motion (the
  "Ready to approve" frame, no press).
- **Motion:** M5 on entry, which ends with the yellow dot rising from the button: the filing setting off.

**The words:** the three list items as icon rows (window glyph, receipt glyph, arrow-return glyph), then
"How it works →".

**Phone:** words, then the proof as its own card (no browser chrome), full width on a Gallery stage, rows
stacked label over value, the stub under it, then the label.

---

### 9.5 After: "Then it's filed, and the papers come back to you."

**Copy placed:** H2 "Then it's filed, and the papers come back to you." · list "The state's documents, saved
and sent to you" · "CoFile applies for the EIN and keeps the IRS letter" · "An update at each stage" · the
stand-in record's text (stages "Approved", "Submitted", "Filed"; "New Jersey", "Certificate of Formation",
"TWO SISTERS BAKERY LLC"; "IRS", "EIN letter (CP 575)", "EIN 00-0000000") · label "Example record · sample
documents".

**The picture, state C: papers come home** (replaces `PapersVisual`)

```
   ┌───────────────────────────────────────────────┐
   │ [H&P] Harbor & Pine CPA        (◯•) with CoFile │
   ├───────────────────────────────────────────────┤
   │ Two Sisters Bakery LLC                        │
   │                                               │
   │  ●━━━━━━━━━━━━━━●━━━━━━━━━━━━━━●               │   stage track
   │  Approved       Submitted      Filed          │
   │  ✉              ✉              ✉              │   an update at each stage
   │                         ┌─────────────┐       │
   │                ┌────────┴────┐ ▬▬▬▬▬  │       │   two document cards,
   │                │ ▬▬▬▬▬▬▬▬    │ ▬▬▬▬   │       │   set down slightly turned
   │                │ ▬▬▬▬▬▬      │ ▬▬▬▬▬  │       │
   │                │ ▬▬▬▬▬▬▬     ├────────┘       │
   │                └─────────────┘                │
   │            New Jersey         IRS             │
   │            Certificate of     EIN letter      │
   │            Formation          (CP 575)        │
   │            TWO SISTERS        EIN 00-0000000  │
   │            BAKERY LLC                         │
   └───────────────────────────────────────────────┘
   Example record · sample documents
```

- **What it shows:** the filed record on Harbor & Pine's desk: the stages it passed through, and the two
  papers it brought home.
- **The stage track:** three 14 px dots on a 2 px Ink line, each with its stage name below in 15 px Medium;
  reached stages are solid Ink, the last one ("Filed") solid Done green. Under each stage, a 16 px envelope
  glyph in Graphite: "An update at each stage," drawn rather than written.
- **The papers:** two document cards (7.4), 170 × 220 px, white, with a stage shadow, set down overlapping
  and turned (−3° and +2°), each with its label block beneath: the issuer ("New Jersey", "IRS") in Fine
  Graphite, the title ("Certificate of Formation", "EIN letter (CP 575)") in 15 px Medium Ink, the reference
  ("TWO SISTERS BAKERY LLC", "EIN 00-0000000") in 14 px tabular. No seal, crest, eagle, barcode or letter
  layout: they're our document cards, not facsimiles.
- **The dot comes home:** at the end of M6 the yellow dot settles into a 20 px Hand-off mark drawn in the
  record's top-right corner (Ink ring, yellow dot). It's the one time CoFile's mark appears inside a firm's
  picture, and only as the end of the round trip; at rest it's the same quiet size as the small type.
- **States:** before (the track reaches "Submitted", no papers); after M6 (the final frame); reduced motion
  (final frame).
- **Motion:** M6 on entry.

**The words:** the three list items as icon rows (document glyph, envelope glyph, bell glyph).

**Phone:** words, then the record card full width; the two papers sit side by side under the track at 140 px
wide each, then the label.

---

### 9.6 Coverage: "The filings your clients already ask you for."

**Copy placed:** H2 "The filings your clients already ask you for." · lede "New York, New Jersey, Florida and
the IRS." with the link "See which are live today" · the tiles' place names, short filing names and the
legend: "Live", "Rehearsed to the payment screen", "Screens recorded or offered, rehearsal next".

**The idea:** the firm's menu of services. Four plain tiles, set like a well-printed price list in a
professional office (names on the left, dotted leaders, a mark on the right), so a firm owner sees "these
are the filings my clients already ask for" before reading a single status.

**The picture: the menu** (replaces `StateTiles`)

```
 Gallery band
 The filings your clients already ask you for.
 New York, New Jersey, Florida and the IRS.  See which are live today →

 ┌────────────────────────┐ ┌────────────────────────┐ ┌────────────────────────┐ ┌────────────────────────┐
 │ New York               │ │ New Jersey             │ │ Florida                │ │ IRS                    │
 │ ────────────────────── │ │ ────────────────────── │ │ ────────────────────── │ │ ────────────────────── │
 │ LLC formation ······ ○ │ │ LLC formation ······ ● │ │ LLC formation ······ ● │ │ EIN, with the IRS      │
 │ Corporation          │ │ Standing certificate · ● │ │ Corporation          │ │ letter ············· ○ │
 │ formation ·········· ○ │ │ Payroll registration   │ │ formation ·········· ● │ └────────────────────────┘
 │ Payroll registration   │ │ (NJ-REG) ··········· ○ │ │ Limited partnership  ● │
 │ (NYS-100) ·········· ○ │ │ Corporation          │ └────────────────────────┘
 │ LLC changes and        │ │ formation ·········· ○ │
 │ dissolution ········ ○ │ └────────────────────────┘
 │ Copies and certificate │
 │ of status ·········· ○ │
 │ Application for        │
 │ Authority ·········· ○ │
 │ Assumed name (DBA) · ○ │
 └────────────────────────┘
  ● Live   ● Rehearsed to the payment screen   ○ Screens recorded or offered, rehearsal next
```

- **Tiles:** white, radius 16, `Rule` border, 28 px padding, four across on desktop (two across on tablets),
  top-aligned, each as tall as its list. Uneven lengths are honest, like a real menu, and the eye reads
  across the tops. The place name in H3 (26 px Medium Ink) over a 1 px Ink rule. No state outlines, seals,
  flags or state colors: the tiles are neutral and identical in style.
- **Rows:** 17/24 Ink, 44 px tall, a dotted leader (1 px Field Edge dots every 4 px) from the end of the name
  to the stage mark at the right (4.2). A live type's name is set in Medium so live filings stand out in the
  list without a second color. Each row's full stage label is its accessible name and its tooltip.
- **Legend:** under the tiles, the three marks with their exact labels, Small, Graphite, 24 px between items.
- **States:** today's (no live types); any type switching to Live (its dot turns green, its name goes
  Medium); hover on a row (6% Gallery row tint and the tooltip); reduced motion (no dot animation).
- **Motion:** M7.
- **Link:** "See which are live today" is a text link with an arrow at the end of the lede, going to What we
  file.

**Phone:** the tiles stack in one column in the same order; the leaders stay; the legend follows the last
tile.

---

### 9.7 Rehearsals: "In beta: rehearse a filing, free."

**Copy placed:** H2 "In beta: rehearse a filing, free." · lede "CoFile fills in every screen of the state's
real website and stops before the last button: nothing is filed or paid. Filing types go live one at a
time." · the rehearsal log's text ("Rehearsal · New Jersey LLC formation", "test details", the seven lines)
· label "Rehearsal · nothing filed, nothing paid".

**The idea:** the house lights go down. The page's first dark band, with the state's website lit like a
stage, and the rehearsal's run sheet beside it. It's the most theatrical moment on the site, and it's about
a free trial, which is exactly where a little theater belongs.

```
 NIGHT band, spotlight behind the picture
┌──────────────────────────────┬────────────────────────────────────────────────────────────┐
│                              │         ┌──────────────────────────────────────────┐       │
│ In beta: rehearse a filing,  │         │ (state website)            (Rehearsal)    │       │
│ free.                        │         │ ┌────────────────────────────────────┐   │       │
│ ▔▔▔▔ (yellow under "free")   │         │ │ ▬▬▬▬▬▬▬▬                           │   │       │
│                              │         │ │ Business Name  TWO SISTERS BAKERY  │   │       │
│ CoFile fills in every screen │         │ │ Designator     LLC                 │   │       │
│ of the state's real website  │         │ │ ▬▬▬▬▬▬  ▬▬▬▬▬▬▬▬▬▬                 │   │       │
│ and stops before the last    │         │ │              ┌╌╌╌╌╌╌╌╌╌┐           │   │       │
│ button: nothing is filed or  │         │ │              ╎ Pay Now ╎           │   │       │
│ paid. Filing types go live   │         │ │              └╌╌╌╌╌╌╌╌╌┘           │   │       │
│ one at a time.               │  ┌──────┴─────────────────────┐──────────────┘   │       │
│                              │  │ Rehearsal · New Jersey LLC │ test details     │       │
│                              │  │ formation                  │                  │       │
│                              │  │ Business name       filled │                  │       │
│                              │  │ Name check          passed │                  │       │
│                              │  │ Registered agent    filled │                  │       │
│                              │  │ Members and signatures     │                  │       │
│                              │  │                     filled │                  │       │
│                              │  │ Review page  matched the   │                  │       │
│                              │  │              proof         │                  │       │
│                              │  │ Payment: $103.50  matches  │                  │       │
│                              │  │              the proof     │                  │       │
│                              │  │ Pay Now  held, on purpose  │                  │       │
│                              │  └────────────────────────────┘                  │       │
│                              │   ▢ ▢ ▢ ▢ ▢ ▢ ▢ ▢ ▢ ▢ ▢ ▢ ▢   filmstrip of screens            │
│                              │   Rehearsal · nothing filed, nothing paid                   │
└──────────────────────────────┴────────────────────────────────────────────────────────────┘
```

- **Words:** H2 in `#EDEEF0` at 52 px; the word "free" carries a 6 px Sign-here Yellow underline offset 6 px,
  the only decoration on any headline on the site. Lede in `#A7ADB8`.
- **The stage:** a light browser window (680 × 440) showing the neutral New Jersey schematic (7.4), lit by the
  spotlight gradient (4.6), with a "Rehearsal" chip in its top bar. Its last screen shows the "Pay Now"
  button drawn as a dashed 1.5 px outline, unfilled: the last button, not pressed. No red, no stop sign, no
  hand, no lock.
- **The run sheet** (replaces `RehearsalLog`): a Night Raised card, 340 px wide, radius 16, overlapping the
  window's lower-left corner like a clipboard set down in front of the stage. Header "Rehearsal · New Jersey
  LLC formation" in 15 px Medium `#EDEEF0` with "test details" in Fine `#8F96A3`. Seven lines, 15/22, each a
  label at left and result at right in `#A7ADB8`; the line currently playing is `#EDEEF0` with an 8 px yellow
  dot before it. "held, on purpose" appears in the same `#A7ADB8` as the rest: it's simply the last line.
- **The filmstrip:** thirteen 40 × 28 px thumbnails of the schematic screens under the window, the current
  one outlined in yellow. They give the run a sense of length without a number.
- **States:** playing (M8), holding (final frame: every line shown, the last thumbnail outlined), paused
  (play button visible), reduced motion (final frame, no spotlight fade).
- **Label:** "Rehearsal · nothing filed, nothing paid", Fine, `#8F96A3`.

**Phone:** words, then the window full width (no spotlight ellipse, a flat `#181B22` stage), then the run
sheet as a full-width card under it (not overlapping), then the filmstrip as a single scrolling row.

---

### 9.8 Pricing: "$45 a filing. EIN included with a formation."

**Copy placed:** H2 "$45 a filing. EIN included with a formation." · price items "Pay as you go" / "per live
filing" · "$25" / "an EIN on its own" · "$15" / "copies and certificates" · "Plans from $250" / "a month for 6
filings" · note "State fees separate. Rehearsals free." with the link "See all plans" · the security line
"Social Security numbers encrypted and deleted 30 days after the filing. Saved cards held in a card vault,
never in our database." with the link "Security".

**The idea:** the price is the picture. Published prices are rare in this category and they're a selling
point, so "$45" is the biggest number on the site, set like a price on a shop window, and nothing about it
moves.

```
 white band
┌──────────────────────────────────────────────────────────────────────────────────────────┐
│                                                                                          │
│  $45  a filing.                                                                          │  "$45" Price display 144 px
│  ‾‾‾                                                                                     │  Condensed; "a filing." H2
│  EIN included with a formation.                                                          │  on the same baseline
│                                                                                          │
│ ┌─────────────────────┬─────────────────────┬─────────────────────┬─────────────────────┐ │
│ │ Pay as you go       │ $25                 │ $15                 │ Plans from $250     │ │
│ │ per live filing     │ an EIN on its own   │ copies and          │ a month for 6       │ │
│ │                     │                     │ certificates        │ filings             │ │
│ └─────────────────────┴─────────────────────┴─────────────────────┴─────────────────────┘ │
│  State fees separate. Rehearsals free.  See all plans →                                  │
│ ──────────────────────────────────────────────────────────────────────────────────────── │
│  Social Security numbers encrypted and deleted 30 days after the filing. Saved cards     │  Small, Graphite,
│  held in a card vault, never in our database.  Security →                                │  no icon
└──────────────────────────────────────────────────────────────────────────────────────────┘
```

- **The headline:** "$45" in GT America Condensed Medium at 144/128 Ink, with tabular figures; "a filing."
  in H2 (52 px) sharing its baseline; "EIN included with a formation." on the line below in H2. A 4 px yellow
  rule, the width of "$45", sits 12 px under the figure: the price's own sign-here flag.
- **The price strip:** one white card, radius 16, `Rule` border, four equal cells divided by 1 px `Rule`
  lines. Top line of each cell: "Pay as you go" in H3 (26 px Medium); "$25" and "$15" in Price style (56 px
  Condensed); "Plans from" in H3 followed by "$250" in Price style, on one baseline. Second line in 17 px
  Graphite ("per live filing", "an EIN on its own", "copies and certificates", "a month for 6 filings"). The
  first cell sits directly under "$45", so "$45 … Pay as you go … per live filing" reads as one thought.
- **The note:** Small, Graphite, 20 px under the strip, with "See all plans" as a text link.
- **The security line:** after a 1 px `Rule` and 32 px of space, Small, Graphite, max 60 em, with "Security"
  as a text link with an arrow. No padlock, no shield, no badge. It's there for the reader who looks for it,
  and it's as calm as a footnote in a good annual report.
- **Motion:** none. Money never moves (8.1).

**Phone:** "$45" at 96 px with "a filing." wrapping under it at 32 px; the strip becomes a 2 × 2 grid of
cells; the note and the security line follow in Small.

---

### 9.9 Close: "Run one rehearsal. Then decide."

**Copy placed:** H2 "Run one rehearsal. Then decide." · lede "Try it on a filing you know by heart.
Questions? hello@cofile.app" · button "Run a free rehearsal".

**The idea:** a picture the section never had: the hallway at dusk, the lights on behind the door, and on
the plate, the visitor's own firm name if they typed it in Firms. If they didn't, the plate is blank and
waiting, with a text caret, and clicking it opens the same edit as in Firms. "Say yes, under your own
name," one last time, without a word added.

```
 NIGHT band, continuing into the footer
┌──────────────────────────────────┬────────────────────────────────────────────────────────┐
│                                  │ P2: the door at dusk, warm light through frosted glass │
│ Run one rehearsal.               │                                                        │
│ Then decide.                     │            ╔═══════════════════════════╗               │
│                                  │            ║  [the visitor's firm name] ║  or blank,    │
│ Try it on a filing you know by   │            ╚═══════════════════════════╝  with a caret │
│ heart. Questions?                │                                                        │
│ hello@cofile.app                 │                                                        │
│                                  │                                                        │
│ [ Run a free rehearsal ]  (◯•)   │                                                        │
│                                  │                                                        │
└──────────────────────────────────┴────────────────────────────────────────────────────────┘
```

- **Words** on a solid Night panel in the left five columns (no gradient over the photo): H2 at 60/64
  `#EDEEF0`; lede in `#A7ADB8` with the email as an underlined link in `#EDEEF0`; the Large yellow button,
  with a 24 px Hand-off mark beside it in white and yellow (M9 draws its ring).
- **The picture:** P2 cropped to the right-hand door, bleeding to the right edge and to the top and bottom
  of the band, with the 3D plate composited (dusk lighting). Personalized: the visitor's name engraved, the
  glint runs once (M9). Not personalized: a blank plate with a slow 1.1 s caret blink at its center; the
  plate's accessible name is `[copy needed]`. It isn't labeled as an example because it doesn't show a firm.
- **The sticky bottom bar** on phones slides away while this button is on screen.

**Phone:** P2 cropped 4:3 to the plate, full bleed at the top of the band, then the words and the
full-width button on Night beneath it.

---

### 9.10 Footer

Continuing the Night band of the Close, separated by a 1 px Night Rule and 64 px of space.

```
┌──────────────────────────────────────────────────────────────────────────────────────────┐
│ (◯•) CoFile                                                                              │
│ CoFile · the filing desk behind your firm   New York · New Jersey · Florida · IRS        │
│                                             Building a filing product? CoFile for platforms →│
│ ──────────────────────────────────────────────────────────────────────────────────────── │
│ CoFile is not a law firm or a government agency, isn't affiliated with any state or the  │
│ IRS, and doesn't give legal or tax advice.                                               │
│ Terms · Privacy · Security · FAQ · hello@cofile.app                                      │
└──────────────────────────────────────────────────────────────────────────────────────────┘
```

- The lockup in white and yellow at 24 px. "CoFile · the filing desk behind your firm" in 17 px `#EDEEF0`;
  "New York · New Jersey · Florida · IRS" in 15 px `#A7ADB8`; "Building a filing product? CoFile for
  platforms" with the link underlined.
- The legal line in Fine `#8F96A3` (6.0:1 on Night), max 70 em; the links in 15 px `#EDEEF0`, 24 px apart.
- Phone: one column in the same order; links wrap two to a line with 48 px tap height.

---

## 10. The other pages

### 10.0 The template for the pages behind the home page

Every page behind the home page opens with the same head, then alternates story sections (a picture) and
reference sections (typographic), and ends with a Night close band (except Security and Questions, which end
on their last section and go straight into the footer).

```
 Page head (white)
┌──────────────────────────────────────────────────────────────────────────────────────────┐
│ ━━ Kicker                                                                                │  17 px Medium + yellow rule
│ H1 in Display, up to two lines                                                           │  72/76
│ Lede, 22/34 Graphite, max 34 em                                    [head picture, if any] │
└──────────────────────────────────────────────────────────────────────────────────────────┘
 Close band (Night)
┌──────────────────────────────────────────────────────────────────────────────────────────┐
│ H2 at 52 px #EDEEF0 · lede #A7ADB8 · [ Run a free rehearsal ]  secondary link            │
└──────────────────────────────────────────────────────────────────────────────────────────┘
```

- **Head:** 96 px top padding desktop, 48 px phone. Where a page has a head picture, the H1 and lede take
  the left six columns and the picture the right six, bleeding right.
- **Lists** everywhere use the icon rows from the home page (36 px tile, 20 px glyph) on story sections, and
  plain hairline rows with no marker on reference sections. No ticks anywhere.
- **Reference sections** (checks, what's separate, state notes, security cards) use H2 reference (36 px),
  96 px padding, white, a `Rule` line above, and never carry a picture or motion.
- **Close bands** carry the yellow button and, where the copy has one, a secondary action as an outlined
  white button on Night ("Questions", "See pricing").

---

### 10.1 How it works (`/how-it-works`)

**Head:** kicker "How it works" · H1 "Your client asks. You approve it. CoFile files it." · lede "Three
steps. Your client hands the job to you, and you sign off before anything is filed." No head picture: the
three steps directly below are the picture, and the H1's three sentences become their three titles.

**Steps** (Gallery band): "Your client asks." · "You approve it." · "CoFile files it.", each with its copy.

```
  ●━━━━━━━━━━━━━━━━━━━━━━━━━━━━━●━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━●   the hand-off line; the dot rides it
 ┌─────────────────────┐   ┌───────────────────────────┐   ┌─────────────────────┐
 │ [fanned tiles:      │   │▀▀▀▀▀▀▀▀ pine ▀▀▀▀▀▀▀▀▀▀▀▀▀│   │ [state schematic    │
 │  client page,       │   │ P3: the firm owner at her │   │  filling]           │
 │  text, short form]  │   │ desk, the proof on her    │   │ (Approved)          │
 │ registered agent ·  │   │ laptop, Approve under her │   │ (Filing now)        │
 │ organizer · signer ·│   │ hand                      │   │ (Submitted to the   │
 │ addresses           │   │                           │   │  state)   [person]  │
 ├─────────────────────┤   ├───────────────────────────┤   ├─────────────────────┤
 │ Your client asks.   │   │ You approve it.           │   │ CoFile files it.    │
 │ They fill in a short│   │ You get the proof: one    │   │ It fills in the     │
 │ form from your link,│   │ page with your firm's ... │   │ state's own ...     │
 └─────────────────────┘   └───────────────────────────┘   └─────────────────────┘
   cols 1–4                  cols 5–8: 24 px higher,          cols 9–12
                             12% taller, stage shadow
```

- **Cards:** white, radius 20, 32 px padding. The outer two have a `Rule` border; the middle card (the firm's
  step) has no border, Harbor & Pine's 6 px rule, the stage shadow, and sits 24 px higher and 12% taller:
  the firm is the one who signs off, so its card leads the row.
- **Card 1 vignette:** three small tiles fanned like cards in a hand (−4°, 0°, +4°): the client page
  ("Start your New Jersey LLC") on a phone, Ana's text bubble, and a short form. Beneath them, four pills in
  Small type with the step's own words "registered agent", "organizer", "signer", "addresses". As the dot
  passes, the pills slide up into the form tile and its grey bars become filled rows with a pine left edge.
- **Card 2 vignette:** photo P3 cropped to the owner's hands, the laptop and the mug, with the proof
  composited on the laptop screen and the pointer over "Approve for filing".
- **Card 3 vignette:** a browser window with the neutral state schematic filling row by row, and three toasts
  stacking beside it with the product's real status labels: "Approved" (Done), "Filing now" (In motion),
  "Submitted to the state" (Done). In the corner, a 36 px person tile (the glyph, or a P10 portrait circle)
  for "When a filing needs a person, one of the filing professionals who run CoFile takes over."
- **Line and dot:** 2 px Ink across the cards' tops; the yellow dot rides it, scroll-linked from 30% to 70%
  of the section in view. Phone: the line runs down the left margin and the cards stack, the middle one full
  width with its photo.

**The proof** (white band, picture left): H2 "You see what the state will see, before the state does." ·
the lede ("You've approved a proof before: business cards, letterhead, an invitation at the printer. …") ·
six list items.

- **Picture:** the complete proof as the firm gets it (10.9) in a browser window at 1:1, 640 px wide,
  scrolling inside its frame, opening with M10 (Harbor & Pine's letterhead proof with crop marks becomes the
  filing proof). Photo P8 (hands turning over a letterhead proof at a print counter) sits as a 200 × 260
  inset at the stage's top-left corner, radius 12: the visual footnote to "You've approved a proof before".
- **List:** items one to five are buttons that run M11: "Every name, address and answer…" → Filing details;
  "Every fee in dollars and cents…" → State fees; "Where the state's website allows it…" → the state's review
  page; "Each statement on the form, and who made it…" → the authorizations, such as "I authorize the filing
  company to pay the state fee shown on the proof."; "One button…" → the approve button. Each row has a
  small region numeral in Graphite.
- **The sixth item**, "Like reviewing a return before you e-file it: nothing goes to the state until you've
  signed off.", is set apart as a card: Gallery fill, radius 16, 28 px padding, 24/32 Medium Ink. It's the
  line written in the CPA's own professional language, so it gets the emphasis of a pull quote.

**Requests** (Gallery band, picture right): H2 "Clients don't always fill in forms. They text you." · lede.
Picture: The Run's state A (9.3) as a still, with M4 on entry. Phone: P5 version.

**Checks** (reference section): H2 "Checks before every filing." · lede · four items as hairline rows with
20 px Medium Graphite numerals 1 to 4 in the left gutter. No picture, no icons, no motion. Calm, complete,
easy to find from the Security page's link (`#checks`).

**After** (white band, picture left): H2 "The papers come back to you." · lede (the states' timing) · three
items. Picture: The Run's state C (9.5) as a still, with photo P9 (documents slid into a client's binder) as
a 220 px inset at its lower-left corner.

**Close** (Night): "Run one rehearsal. Then decide." · lede "A rehearsal fills in every screen of the state's
real website and stops before the last button. It's free, and nothing is filed or paid." · "Run a free
rehearsal" and "Questions".

---

### 10.2 For firms (`/for-firms`)

**Head:** kicker "For CPA, payroll, fractional CFO and title firms" · H1 "Form the business. Keep the
client." · the long lede ("Your client needs an LLC. Who do they call? You. …"). **Head picture:** photo P4
(a bakery counter at 6 a.m., a hand holding a phone) with Harbor & Pine's client page ("Start your New
Jersey LLC") composited on the screen, at 4:5, radius 20, in the right six columns. The client stays the
firm's client, and the picture shows the client seeing only the firm. Label: "Example · test details · not a
real firm".

**"Your filing desk, in your brand."** (Gallery band): the five list items as icon rows, and the page's main
picture, **the brand studio**: the full version of the home page's door demo.

```
 ┌──────────────────────────────────────────────────────────────────────────────────────────┐
 │ Name your clients see [ Harbor & Pine CPA                    ]   Main color ● ● ● ● ● ● ● ● │
 │ Font [ Lora (serif)          ▾ ]                                                          │
 ├──────────────────────┬──────────────────────┬──────────────────────┬─────────────────────┤
 │ browser: the desk    │ phone: client page   │ browser: the proof   │ envelope: an email  │
 │ ▀▀ color ▀▀▀▀▀▀▀▀▀▀▀ │ ▀▀ color ▀▀▀▀▀▀▀▀▀▀▀ │ ▀▀ color ▀▀▀▀▀▀▀▀▀▀▀ │ ▀▀ color ▀▀▀▀▀▀▀▀▀▀ │
 │ [HP] name            │ [HP] name            │ [HP] name            │ [HP] name           │
 │ Client filings       │ Start your New       │ Two Sisters Bakery   │ Your proof is ready │
 │ ...                  │ Jersey LLC           │ LLC                  │ to approve: ...     │
 │                      │ (◯•) with CoFile     │ [Approve for filing] │ [Open your proof]   │
 └──────────────────────┴──────────────────────┴──────────────────────┴─────────────────────┘
   Preview of a client's page
```

- **Controls:** the real Setup components with their real labels: "Name your clients see" (a Large field,
  pre-filled "Harbor & Pine CPA", or the name the visitor typed on the home page), "Main color" (the eight
  ready colors as 32 px dots, plus a custom color well), and "Font" (the Setup presets). The caption under
  the previews is Setup's own "Preview of a client's page". A logo upload is left out on purpose: the
  monogram tile (logo bay rule 6) shows that a firm looks finished even before it adds a logo.
- **Previews:** four live components at 0.7 scale: the desk overview (browser), the client page (phone), the
  proof (browser), and the proof-ready email (an email card, 10.15). All four re-brand on every keystroke and
  click (M12). The client page's small-type lockup is counter-scaled to 13 px.
- **The fifth list item** ("CoFile is built and run by filing professionals. When a filing needs a person,
  one of them takes over.") carries a P10 portrait row if it exists, otherwise the person glyph tile.
- **Phone:** controls stack and stick to the top of the viewport while the previews scroll sideways under
  them (snap to center, 300 px cards, page dots).

**"Your name on the door. Ours in small type."** (white band): the lede ("The same page carries each firm's
own name, logo and color. Your clients never see another firm's, or a big CoFile logo.") beside the Two
doors picture (9.2). If the visitor typed a name in the brand studio above, the second door carries it.

**"Your registered agent, or ours."** (reference-leaning, white): the lede and three items (with the links
"How it works" and "Pricing"). A small picture sits beside them: the registered agent block of a New Jersey
filing as the firm's form shows it, with the form's real labels ("Registered agent", "I'll name the agent",
"The filing company's registered agent (named on the approval page)"), the firm's saved agent filled in on a
12% pine tint. Label: "Example · test details · not a real firm".

**Close** (Night): "Open your firm's filing desk." · lede "Add your logo and color, then rehearse a real
filing on the state's own website. It's free, and nothing is filed or paid." · "Run a free rehearsal". With
P1's right-hand door and its plate, blank or with the visitor's name, as in the home page's Close.

---

### 10.3 What we file (`/what-we-file`)

**Head:** kicker "What we file" · H1 "New York, New Jersey, Florida and the IRS." · lede "Every filing type
carries a plain label, so you always know which ones are live today."

**The table** (white): headers "Filing", "Where", "Where it stands"; the 16 rows of `COVERAGE`; the footnote
("Rehearsed to the payment screen: …") in Small under it with the email link.

```
 New York   New Jersey   Florida   IRS                       place chips filter the rows

 Filing                                              Where        Where it stands
 ─────────────────────────────────────────────────────────────────────────────────────────
 LLC formation                                       New Jersey   [▮▮▮▯ Rehearsed to the payment screen]
 Standing certificate (through the API; not on the   New Jersey   [▮▮▮▯ Rehearsed to the payment screen]
   filing desk yet)
 ...
 EIN, with the IRS letter saved                      IRS          [▮▮▯▯ Screens recorded, rehearsal next]
 ...
 Corporation formation (for-profit)                  New Jersey   [▮▯▯▯ Offered, not yet rehearsed]
 ...
 Alternate name, charter amendments                  New Jersey   [▯▯▯▯ Planned]
```

- **Stage chips with a meter:** each chip carries its exact label plus a four-segment meter (4 × 10 × 6 px
  segments, 2 px gaps) at its left: Planned none filled (dashed outline), Offered one, Screens recorded two,
  Rehearsed three (in Sign-here Yellow), Live four (all Done green, label "Live"). It shows progress toward
  live, which is the honest and hopeful way to read the table.
- **Rows:** 60 px, 17 px text, hairlines, no zebra; the header row sticky under the site header on scroll.
- **Place chips** above the table ("New York", "New Jersey", "Florida", "IRS": the H1's own words) filter the
  rows; tapping an active chip clears it. No "All" chip, so no new word is needed.
- **Phone:** each row becomes a card: the filing name (17 px Medium), the place in 15 px Graphite, the stage
  chip beneath. The place chips scroll sideways.

**"How a filing type goes live."** (Night band, the stage): the lede ("Any filing can run as a rehearsal: the
whole filing, performed on the state's real website with no audience. …") beside the stage and run sheet
(9.7, M8). Under both, full width, **the road to live**: the four stage labels and "Live" on one horizontal
track, as the meter's segments drawn large (Planned → Offered, not yet rehearsed → Screens recorded,
rehearsal next → Rehearsed to the payment screen → Live), in `#A7ADB8` with the Rehearsed segment in yellow
and Live in green. It explains "earns its way to live" without a word added.

**"State by state."** (reference): four cards with H3 "New York", "New Jersey", "Florida", "IRS" and their
notes, four across on desktop, two on tablets, one on phones. White, `Rule` border, no imagery: no state
shapes, seals or colors.

**Close** (Night): "Rehearse one you know by heart." · "Run a free rehearsal" and "See pricing".

---

### 10.4 Pricing (`/pricing`)

**Head:** kicker "Pricing for firms" · H1 "$45 a filing. EIN included with a formation." set like the home
page's pricing headline ("$45" in Price display, the rest in Display) · lede "Pay for each live filing, or
take a plan with filings included every month. Every plan is backed by filing professionals, and
rehearsals are always free."

**Plans** (Gallery band): four cards from `PRICING.plans`.

```
 ┌────────────────┐ ┌────────────────┐ ┌══════════════════┐ ┌────────────────┐
 │ Pay as you go  │ │ Starter        │ ║ Growth           ║ │ Unlimited      │
 │ $45 a filing   │ │ $250 a month   │ ║ $500 a month     ║ │ $1,000 a month │
 │ No monthly fee.│ │ or $2,500 a    │ ║ or $5,000 a year ║ │ or $10,000 a   │
 │ Pay only for   │ │ year (2 months │ ║ (2 months free)  ║ │ year (2 months │
 │ live filings.  │ │ free)          │ ║                  ║ │ free)          │
 │ ────────────── │ │ ────────────── │ ║ ──────────────── ║ │ ────────────── │
 │ · $25 for an   │ │ · 6 filings a  │ ║ · 15 filings a   ║ │ · Unlimited    │
 │   EIN on its   │ │   month        │ ║   month          ║ │   filings (fair│
 │   own          │ │ · $40 for each │ ║ · $33 for each   ║ │   use: 60 a    │
 │ · $15 for      │ │   filing past  │ ║   filing past    ║ │   month)       │
 │   copies and   │ │   that         │ ║   that           ║ │ · $15 for each │
 │   certificates │ │                │ ║                  ║ │   filing past  │
 │ (👤) A filing  │ │ (👤) A filing  │ ║ (👤) A filing    ║ │   fair use     │
 │ professional   │ │ professional   │ ║ professional     ║ │ · Priority help│
 │ takes over ... │ │ takes over ... │ ║ takes over ...   ║ │   from a person│
 └────────────────┘ └────────────────┘ └══════════════════┘ │ (👤) A filing  │
                                                             │ professional...│
                                                             └────────────────┘
```

- **Cards:** white, radius 20, 32 px padding, equal width, top-aligned. Plan name in H3. The price in Price
  style (56 px Condensed) with " a month" or " a filing" in 19 px Graphite on its baseline; the annual line in
  Small. A `Rule` line, then the items as rows with a 6 px Ink dot. The last row of every plan, "A filing
  professional takes over when a filing needs one", is set apart with the 28 px person tile, so the human
  promise reads as part of every plan, not a feature of the top one.
- **Growth** (the code's middle plan) gets the emphasis the layout gives it: a 2 px Ink border, 16 px taller,
  sitting 8 px higher, with the stage shadow. No "most popular" ribbon: no such words exist, and we wouldn't
  fake popularity.
- **The note** under the cards in Small: "Prices in US dollars, for partner firms. Building a filing product
  for many businesses? Talk to us about platform pricing."
- **Phone:** the cards stack, Growth second as in the code, with full emphasis kept.

**"What counts as a filing."** (white): the lede ("Only live filings sent to a state or the IRS count.
Rehearsals never do.") and five items with their bold lead-ins. Beside "An EIN on its own" and "Copies and
certificates", a small proportional bar shows the unit from `PRICING.units` (a full 48 px bar for one
filing, a half bar, a third of a bar), so "half a filing" and "a third of a filing" are seen, not computed.

**"What's separate."** (reference): four items as hairline rows with their bold lead-ins.

**Close** (Night): "Start with a free rehearsal." · lede "Rehearsals run on the state's real website and stop
before the last button. They're free and never count toward a plan." · "Run a free rehearsal".

---

### 10.5 Security (`/security`)

**Head:** kicker "Security" · H1 "How we handle what you trust us with." · lede "Social Security numbers,
cards and state logins, and how CoFile keeps each one." No head picture.

**Five cards** (white, reference style): "Encrypted, masked SSNs" · "Cards in a vault, logins encrypted" ·
"Single-use links to the proof" · "Signatures only on approval" · "Separate accounts", each with its text.

- Two columns on desktop (the fifth card spans the first column of the third row), one on phones. White,
  radius 16, `Rule` border, 32 px padding, H3 title, Body text, max 36 em.
- Each card opens with a 20 px glyph from the ordinary set, never a lock or shield: person (SSNs), card
  (cards and logins), link (links to the proof), signature (signatures), storefront (separate accounts).
- The closing paragraph as a lede at 20/32 Graphite with its three links ("How it works", "Privacy Policy",
  the email), after a `Rule`.
- No motion, no dark band, no pictures. It's the most plainly set page on the site, on purpose.

---

### 10.6 Questions (`/faq`)

**Head:** kicker "Questions" · H1 "Questions, answered." · lede "Something else? hello@cofile.app".

**Fourteen questions** as accordions in one column (eight columns wide on desktop):

- Rows 72 px minimum, `Rule` hairlines between them, the question at 20/28 Medium Ink, a 20 px chevron at
  right turning 180° on open (260 ms). The answer at 18/28 Body, max 40 em, 24 px bottom padding, links
  underlined.
- Each question keeps its `id` ("beta", "rehearsal", "approves" and so on). Arriving at `/faq#approves`
  opens that question and scrolls it to 120 px below the top.
- The question "Who approves a filing?" has nothing visually special: no question is promoted over another.
- Phone: full width, question 18/26.

---

### 10.7 For platforms (`/platforms`)

**Head:** kicker "For platforms" · H1 "Building a filing product? Put CoFile underneath it." · lede ("Filing
companies, and platforms that sign up new businesses, can offer state filings inside their own product
under their own brand. …"). **Head picture: underneath.** The headline, drawn: two layers, slightly offset
in a flat isometric stack (30° projection, no perspective). On top, a proof page in a neutral placeholder
brand (a grey 40 px logo block and a slate `#3A4656` rule, no name: it's the platform's brand, whatever it
is). Underneath, a Night Raised code panel showing a request with `"dryRun": true` in GT America Mono and,
below it, a short stream of webhook event names from the docs (`filing.awaiting_approval`,
`filing.completed`) in `#A7ADB8`. The top layer floats 24 px above the lower with a soft shadow. Label:
"Example · test details · not a real firm".

**The list and the form** (Gallery band): the five items as icon rows (code, palette, window, key, play)
with `"dryRun": true` as an inline Mono chip (Night Raised, `#EDEEF0`, 15 px) and "Read the API docs" as a
link; the inquiry form in a white card on the right (11.2), its "Send" button yellow, the only yellow button
on the page.

No close band: the form is the call to action here.

---

### 10.8 Sign-up (`/signup`, `/signup/sent`)

**Copy:** label "For firms" · H2 "Set up your firm's filing desk" · lede "For firms that file for their clients.
Confirm your email, put your name and logo on the door, and choose which card pays the state's fees. Your
first filing can be a free rehearsal: nothing filed, nothing paid." · the fields ("Firm name", "Kind of
firm", "Your name", "Work email", "Password", "Password again", "Phone (optional)", "Website (optional)",
"States you file in", "Filings per month"), the terms checkbox, "Create account", and "Building a filing
product? See CoFile for platforms."

**The idea:** sign-up is the first minute of the firm's own desk, so the page shows the desk being built as
the form is filled in. Type the firm name and it appears, engraved, on a plate and in a desk header beside
the form.

```
 Desktop
┌──────────────────────────────────────────────┬─────────────────────────────────────────────┐
│ For firms                                    │░░░░░░░░░░░░░░ Gallery stage ░░░░░░░░░░░░░░░░│
│ Set up your firm's filing desk               │░                                           ░│
│ For firms that file for their clients. ...   │░   ╔═══════════════════════════╗           ░│
│                                              │░   ║  [Firm name, as typed]     ║  plate    ░│
│ Firm name        [______________________]    │░   ╚═══════════════════════════╝           ░│
│ Kind of firm     [ Choose one          ▾]    │░   ┌───────────────────────────────────┐   ░│
│ ──────────────────────────────────────────── │░   │▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀│   ░│
│ Your name        [______________________]    │░   │ [HP] Firm name       with CoFile   │   ░│
│ Work email       [______________________]    │░   │ Client filings      [New filing]   │   ░│
│ Password         [__________] Password again │░   │ ▬▬▬▬▬▬▬▬▬▬▬   ▬▬▬▬▬▬               │   ░│
│ At least 12 characters. A short sentence ... │░   └───────────────────────────────────┘   ░│
│ ──────────────────────────────────────────── │░   P7: a busy front desk (lower half)      ░│
│ Phone (optional)  Website (optional)         │░                                           ░│
│ States you file in  ☐ New York ☐ New Jersey  │░                                           ░│
│                     ☐ Florida                │░                                           ░│
│ Filings per month [ Under 10          ▾]     │░                                           ░│
│ ☐ I agree to the Terms of Service and the    │░                                           ░│
│   Privacy Policy.                            │░                                           ░│
│ [ Create account ]                           │░                                           ░│
│ You'll confirm your email. ... Log in.       │░                                           ░│
│ Building a filing product? See CoFile for    │░                                           ░│
│ platforms.                                   │░                                           ░│
└──────────────────────────────────────────────┴─────────────────────────────────────────────┘
```

- The form in the left six columns, its groups separated by hairlines and 32 px of space (no new group
  headings). Fields are Large (56 px). "Create account" is the yellow Large button, full width of the form.
- **The live preview** on the right: the brass plate (a still render with SVG engraving, so it's light) and a
  desk header in a default slate (`#3A4656`) with a monogram tile, both updating from "Firm name" on every
  keystroke. If the visitor typed a name and chose a color on the home page, both arrive pre-filled. P7 fills
  the lower half of the stage behind the preview, cropped to the front desk.
- **"Check your email"** (`/signup/sent`): a centered 520 px card with the label "Your filing desk", the H2 and
  its lede; above them, the Hand-off mark drawn at 120 px with its dot making one slow orbit (1.6 s): the email
  on its way and back.
- **Phone:** the preview becomes a 72 px strip above the form: the plate alone, the name engraving as typed.
  P7 is dropped.

### 10.9 Log in, password and verification pages

- **Log in** (`/login`): label "Log in", H2 "Welcome back", lede "Firms go to their filing desk, platforms to
  their dashboard." The card (480 px, left half) holds "Continue with Google" (an outlined button with
  Google's own mark per its guidelines), the email and password fields, "Forgot your password?", the yellow
  "Log in" button, and the note "New here? Set up your firm's filing desk. Enterprise developers can also log
  in with an API key." The right half is photo P3 (a firm owner at her desk), full height, no text over it.
  Notices (a session that ended, a changed password, a Google problem) sit above the form as notices (11.12).
- **Forgot password, reset password, verify email, resend:** one centered 480 px card each, with the 32 px mark
  above, its small label ("Forgot password", "Reset password", "Your filing desk"), its H2 ("Reset your
  password", "Choose a new password", "Confirm your email"), lede, fields and one yellow button ("Email me a
  reset link", "Set new password", "Confirm my email", "Send a new link"). Gallery page, white card, radius 20.
- **Phone:** the cards go full width with 20 px margins; the log-in photo is dropped.

### 10.10 Terms and Privacy

A reading layout: a 680 px measure at 18/30, H1 in Display, the sixteen numbered H2s at 28/34 Medium. On
desktop a sticky contents list sits in the left three columns (the H2s in 15 px, the current one in Ink with a
2 px yellow left rule, the others in Graphite). Links underlined. No pictures. Phone: the contents become a
disclosure at the top.

### 10.11 Not found and errors

- **Not found:** "Page not found" · "The link may be old or mistyped." · "Go to the home page" (secondary
  button). The Hand-off mark at 120 px in Rule with its yellow dot sitting outside the ring, a little below
  the gap, as if it had rolled off the path. A light joke, never a scolding one.
- **Error:** "Something went wrong" · "This page couldn't load just now. It's usually a short hiccup on our
  side." · "Try again" (yellow) and "Log in again" (secondary). The mark with its dot resting in the gap. The
  reference ("If it keeps happening, tell us this reference: …") in Small with the digest in Mono.
- On a firm's pages, the same states are drawn in the firm's register: its header, its monogram, no CoFile
  mark.

---

### 10.12 The proof (the page the firm approves)

The proof is now the firm's own page: it opens from the filing desk ("Open the proof and approve it") and
from the proof-ready email. It's the most important page in the product, so it gets the most care.

**Copy** (from `src/approvals/render.ts`): the brand bar with "with CoFile"; when it's a rehearsal,
"Rehearsal: nothing will be filed or paid, even if you approve."; the filing title as the H1; "Filing
reference … Please decide by …. After that, this link stops working and you'll need a new one."; the consent
note ("By approving, you confirm every detail below is correct and authorize its submission exactly as shown,
…"); "The state's review page" with its explanation and picture; "Filing details" with its table; "State
fees" with "Nothing is charged on this page. These fees are paid to the state when the filing is submitted.",
the fee rows, "Total" and, where set, "Maximum you authorize"; the optional one-time code; "What should
change? (Needed only if you ask for changes)"; the buttons "Approve, and authorize submission and payment" and
"Request changes"; "Questions: …".

```
 Gallery page; the proof is a white sheet, 760 px, like a document on a desk
┌──────────────────────────────────────────────────────────────────────┐
│▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀ firm main color 6px ▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀│
│ [LOGO] Harbor & Pine CPA                              (◯•) with CoFile │  letterhead
├──────────────────────────────────────────────────────────────────────┤
│ ┃ Rehearsal: nothing will be filed or paid, even if you approve.     │  Rehearsal Tint band
│                                                                      │
│ Two Sisters Bakery LLC                                               │  firm font 40 px
│ Filing reference …  Please decide by December 3, 2026, 5:00 PM       │
│ Eastern. After that, this link stops working ...                     │  deadline in Medium
│ ┌──────────────────────────────────────────────────────────────────┐ │
│ │▌By approving, you confirm every detail below is correct and ...  │ │  consent note, firm 12%
│ └──────────────────────────────────────────────────────────────────┘ │  tint left edge
│ 1  The state's review page                                           │
│    This is a picture of the state's own review page ...              │
│    ┌──────────────────────────────────────────────────────────────┐  │
│    │ [the real picture the state produced]          (tap to zoom) │  │
│    └──────────────────────────────────────────────────────────────┘  │
│ 2  Filing details                                                    │
│    Business name ................ TWO SISTERS BAKERY LLC            │
│    Members ...................... Ana Ortiz, Lucia Ortiz (50/50)    │
│    ...                                                               │
│ 3  State fees                                                        │
│    Nothing is charged on this page. ...                              │
│    Formation filing fee ........................... $100.00          │
│    NJ portal fee, by card ............................ $3.50         │
│    Total .......................................... $103.50          │  Bold 24 px
│ 4  What should change? (Needed only if you ask for changes)          │
│    [______________________________________________________]          │
│    [ Approve, and authorize submission and payment ]  [ Request changes ] │
│    Questions: …                                                      │
└──────────────────────────────────────────────────────────────────────┘
```

- **Letterhead:** the logo bay (3.5) at full size. The proof is the one page where the firm's header is 96 px
  tall: it's the firm's letterhead, and it should feel like it.
- **Rehearsal band:** a full-width Rehearsal Tint band with a 4 px `#E8B82A` left edge, Ink 17 px Medium.
- **Title and deadline:** the filing title in the firm's font at 40/46 (phone 30/36). The deadline sentence
  in Body with the date and time in Medium.
- **Consent note:** a white panel with a 4 px left edge in the firm's button shade and a 6% firm tint, 17/26.
  It's the most important paragraph on the page and is set to be read, not skimmed past.
- **Section numerals:** 1 to 4 in 15 px Medium Graphite in the left margin beside the H2s ("The state's
  review page", "Filing details", "State fees", and the decision area), so the firm can say "check section 2"
  to a colleague.
- **The state's review page picture:** shown at full column width in a 1 px `Rule` frame, radius 8. Tap or
  click opens it full screen with pinch and wheel zoom. This is the real picture the state produced; it's the
  one place on any CoFile surface where the state's own website appears as itself.
- **Filing details:** a definition list, label left (40%, 15 px Graphite) and value right (17 px Ink, the
  firm's font, tabular figures), `Rule` hairlines, grouped by the payload's top-level sections with a 24 px
  gap. Masked Social Security numbers show as given (***-**-1234) with the existing note above the table.
- **State fees:** amounts right-aligned on the decimal; "Total" in Bold 24 px over a 2 px Ink rule; "Maximum
  you authorize" in Body under it.
- **Decision area:** the comment field (Large textarea, 3 rows); the approve button in the firm's button
  shade, 56 px tall, full width on phones and auto width on desktop; "Request changes" as the secondary
  button beside it (below it on phones). The optional one-time code field sits above both, with
  `autocomplete="one-time-code"`.
- **Phone:** the sheet goes edge to edge (no Gallery margins), rows stack label over value, and the review
  picture is full width. A slim sticky header (the firm's logo bay at 48 px) keeps the firm's name in view
  while the firm scrolls.
- **Light only**, in every mode (4.4.6).

**After deciding** (`renderDecisionPage`): the same letterhead; "Approval recorded" as the H1 in the firm's
font; the paragraph ("Thank you. Your approval is recorded. …", or the rehearsal version). Beneath, a 64 px
stage track in the firm's color showing "Approved" reached and the next stages ahead in outline. The change
request and expired-link messages use the same letterhead with their sentence as the H1-sized line.

---

### 10.13 The filing desk (`/p/<firm>`)

**The frame** for every desk page: the logo bay header (3.5); the desk nav "Filings", "New filing", "Ready to
pay", "Client links", "Signatures", "Setup", "Billing" in 16 px Medium, the current page underlined 2 px in
the firm's color on a 6% tint; at right the signed-in email (15 px Graphite, a link to the password page),
"Log out" (small secondary button), and the small-type lockup. The page body on white, max 1080 px. The
support line "Questions? Email …" at the foot in Small.

```
 ┌──────────────────────────────────────────────────────────────────────────────────────────┐
 │▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀ firm color ▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀│
 │ [LOGO] Harbor & Pine CPA                       ana@… [Log out]          (◯•) with CoFile │
 │ Filings  New filing  Ready to pay  Client links  Signatures  Setup  Billing              │
 ├──────────────────────────────────────────────────────────────────────────────────────────┤
 │ Filings                                                              [ New filing ]      │
 │ ┃ 1 approved filing is ready to pay and needs your card's security code. Pay and file    │
 │ ┌──────────────────────────────────────────────────────────────────────────────────────┐ │
 │ │ Filing                       Type                          Status              Started│ │
 │ │ Two Sisters Bakery LLC [Test] New Jersey LLC formation     (Waiting for approval) …  │ │
 │ └──────────────────────────────────────────────────────────────────────────────────────┘ │
 └──────────────────────────────────────────────────────────────────────────────────────────┘
```

Phone: the nav becomes a horizontal scrolling tab row under the header (current tab scrolled into view), and
"New filing" moves to a sticky bottom bar in the firm's button shade.

**Filings (overview).** H1 "Filings" with "New filing" (firm button). Notices in the "Your turn" style (11.12)
for "Real filings need an active subscription; rehearsals are free.", the ready-to-pay line and "… need
someone to act." The table: "Filing", "Type", "Status", "Started", 64 px rows, the filing name as a 17 px
Medium link, the "Test" badge on rehearsals drawn as the Rehearsal chip, status chips by tone. Rows that need
the firm sort visually first by a 3 px firm-color left edge (sorting itself is a product decision). **Empty
state:** "Your desk is clear. Start a filing (it can be a free rehearsal), or send a client a link with your
logo on it." with "New filing" and "Send a client a link", beside a live mini preview of the firm's own client
page with its logo (or monogram), so "with your logo on it" is shown, not promised.

**Setup.** "Set up your account" (or "You're set up") with the three steps ("Your firm", "Branding",
"Payment") as a vertical stepper: a 32 px circle per step (outlined; filled with the firm's color and a check
when done), 72 px rows, the next step's button in the firm's color. The "Registered agents" card below, white
with `Rule` border.

- **Your firm** (details): the fields from `SetupForms` in two columns, the offered services as checkbox
  groups by state.
- **Branding:** "Step 2 of 3", "Branding" and its lede; on the left the fields ("Your web address", "Name your
  clients see", "Logo", "Main color", "Second color", "Font", "Support email shown to clients"); on the right,
  sticky, the brand studio's four previews (10.2) under Setup's own caption "Preview of a client's page".
  Uploading a logo shows the trimmed logo in the logo bay at once, sized by the shape rule. When the main color
  needs a darker button shade (4.4.1), the color field shows the original and the derived shade side by side
  as two swatches, with the existing help "Button text is white, so choose a dark color." The web address
  field shows `cofile.app/` as a fixed prefix in Graphite.
- **Payment:** "One card for every filing" and "A card for each type of filing, with one main card for the
  rest" as two large radio cards (the selected one with a 2 px firm-color border and 6% tint); card selects as
  Large selects showing a generic card glyph with the label and last four digits.
- **Registered agents:** a state-by-state list, each a card with the saved agent's name and address.

**New filing.** "New filing" · "Which state is the business in?" · the three states as large cards (240 px
tall, the state's name at 32 px Medium, the count line in 15 px Graphite), no maps, seals or state colors.
The other ways to send a request ("Or send us the details and we fill in the form for you to check:" with the
email address, text and WhatsApp numbers and the Slack `/file` command) as a quiet Gallery panel with those
glyphs. Then "<State>: what are you filing?" with filing type cards: title, a "Live" (Done) or "Rehearsal"
chip, summary and fee note; and the "Your pages for clients" card listing each service's permanent address and
widget code in Mono on Gallery with a "Copy" button.

**The new filing form** (`/new/<kind>`): "← Other filings", the kind's title, summary and "Send them a link".
The rehearsal notice in the Rehearsal style. "Start from a client you filed for before" as a Large select with
"Fill in". The form itself (11.2): one column, 680 px, each section a fieldset with its legend at 22 px
Medium, separated by 48 px; on desktop a sticky section index in the left gutter lists the section titles with
a small dot per section that fills in the firm's color as the section is completed. Answers filled from saved
answers or a forwarded message carry a 3 px left edge (firm color for saved answers, yellow for answers taken
from a message), the same language as The Run. "Authorizations" as checkbox cards with the statement in Body.
The submit button "Create the proof" in the firm's color, with "Next you get the proof to approve. Nothing is
filed until you do." beside it.

**Filing detail** (`/filings/<id>`): "← Filings"; the title at 32 px with its status chip and the "Rehearsal"
chip; the meta line; a stage track across the top (the filing's real stages from `status.ts`, reached ones
solid, the current one in the firm's color, those ahead outlined); the next-step notice. When the proof is
waiting, **"Your proof is ready"** is the page's hero card: white, 2 px firm-color border, the sentence "Check
every detail and fee exactly as they'll go to the state, then approve it or ask for changes. Nothing is filed
until you approve.", the button "Open the proof and approve it" in the firm's button shade (Large), and "We
also emailed the link to …" in Small. **Documents** as a grid of document cards (7.4) with each document's real
label under it and a download glyph; the **EIN**, when there is one, as a large tile ("EIN:" in Graphite and the
number at 32 px tabular Medium). "Save to Google Docs" as a secondary button with its note. "Progress on the
state site" as a disclosure listing the run's steps with times in 15 px tabular.

**Client links.** "Send a client a link" and its lede; the form ("Filing", "Who it's for (shown to you and the
client)", "Make link"); the result card shows the link in Mono with "Copy link", and beside it a mini preview
of the page the client will open, in the firm's brand. "Links you sent" as a table ("For", "Filing", "Made",
"Status") with "Turn off" as a small secondary button.

**A request from a text or email** (`/from-email/<id>`): "Filing request"; "This looks like a request for:"
with the filing type in Medium and "Open the filled-in form" in the firm's button shade; "Your message" shows
the original as a bubble (a text) or an email card (an email), with the phrases that were used underlined in
soft yellow, matching The Run.

**Signatures.** "Saved signatures" with its explanation; the table ("Signer", "Saved", "Last used",
"Remove"), each signature shown as a 160 × 48 px thumbnail on a white strip with a baseline rule; "Add a
signature" opens the signature pad: a full-width 220 px canvas, a 1 px Field Edge baseline 48 px from the
bottom, Ink strokes at 2.5 px, with "Clear" as a text button `[copy needed]` if the pad doesn't already have
one.

**Ready to pay.** "Ready to pay" with its explanation. One card per payment card: a generic card glyph with
the card's label and last four, the filings waiting for it as rows, a four-box code input (56 px boxes,
24 px tabular, `inputmode="numeric"`), and the firm-colored "Pay and file" button.

**Billing.** "Billing"; the plan panel ("<Plan> plan" with its status chip); "This month on <plan>" with the
usage bar (10 px tall, radius 6, the firm's color on Gallery) and its dates; the plan picker with "Monthly" and
"Yearly (2 months free)" as a segmented control and the plans as cards matching the public Pricing cards,
drawn in the desk's register ("Your plan" as a Done chip on the current one).

---

### 10.14 Pages the firm's clients see

These carry the firm's brand alone. The small-type lockup is the only sign of CoFile, at the far right of the
header on desktop and in the footer on phones, and it isn't a link.

**A page for each filing** (`/<firm>/<service>`, for example `cofile.app/bestaccounting/llc-filing-new-york`),
**client link pages** (`/i/<token>`) and the **white-label hosted page** (`/e/<account>/<firm>/<service>`) share
one template, designed phone-first because that's where the bakery owner opens it:

```
 Phone
┌──────────────────────────────┐
│▀▀▀▀▀▀ firm color ▀▀▀▀▀▀▀▀▀▀▀▀│
│ [LOGO] Best Accounting       │  logo bay, 64 px
├──────────────────────────────┤
│ ┃ This page is in rehearsal  │  Rehearsal Tint, only while
│ ┃ for now. You can fill it   │  the type isn't live
│ ┃ in, but nothing will be ...│
│ New York LLC formation       │  firm font, 30/36
│ Articles of Organization ... │  summary + "After you send
│ After you send this, Best    │  this, … checks every detail
│ Accounting checks every ...  │  and fee …"
│ ● ● ○ ○ ○ ○ ○                │  section progress dots
│ Fields marked * are required.│
│ ┌ Name ────────────────────┐ │  fieldset cards
│ │ LLC name, without the    │ │
│ │ ending *                 │ │
│ │ [______________________] │ │
│ └──────────────────────────┘ │
│ ...                          │
│ Next, Best Accounting checks │
│ it and approves the filing.  │
│ [   Send to Best Accounting ]│  firm button shade, 56 px
│ By sending, you agree to ... │
│        (◯•) with CoFile      │  footer, not a link
└──────────────────────────────┘
```

- Max width 680 px on larger screens, centered on a 2% firm-tinted page background so the white form reads as
  the firm's own sheet.
- Sections as fieldset cards (white, radius 16, `Rule` border, 20 px padding on phones); "More options
  (optional)" as an inline disclosure; folded optional sections as collapsed cards with a chevron.
- A row of small section progress dots under the intro, filling in the firm's color as sections are
  completed, so a long state form feels like a few short steps.
- Required marks in the firm's link shade; errors in Problem red with an icon and words, and the summary box
  ("Please fix these and submit again.") at the top, focused on submit.
- The "Send to <firm>" button in the firm's button shade, full width on phones.
- **Thank you:** the confirmation notice takes over the page: the firm's logo bay large (64 px), the notice's
  title in the firm's font at 28 px and its message in Body, centered. No CoFile mark beyond the footer.
- **Expired or unusable links** ("This link has expired or isn't valid", "This link can't be used", "This
  filing is no longer offered"): the same frame, the sentence as the H1, and the firm's contact line if there
  is one.

**The embed widget** (`/embed/…`): the same form with no header, no page background (transparent, so it sits
on the firm's own site), the firm's font and colors, auto height, and "Filed with CoFile" in Fine at the
bottom. The firm's own website is the front of house here; the widget borrows its surroundings.
