# CoFile visual design spec: "Front of House"

Marcus Feldman · Design spec 08 · written against BRIEF.md v2 (Nov 26, 2026)

Every quoted line in this document comes from `web/app/page.tsx` or the product code it points to.
Where a design needs a word that doesn't exist yet, it says `[copy needed]`. I haven't rewritten,
reordered or added a single message.

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
to the client who needs an LLC without handing them to a stranger, and she wants to look good doing
it. If a page makes her firm look better, she'll give it four minutes. If it makes her feel managed,
or makes CoFile the star, she's gone.

So that's the brief I'm designing to: make her see her own name on it, make her see her client
enjoying it, and make "Run a free rehearsal" the easiest click on the page.

---

## 2. The visual concept: Front of House

**The one idea: the firm is out front; CoFile works the back of house.**

"Front of house" is the theater and restaurant term for everything the audience or the guest sees:
the lobby, the dining room, the names on the marquee. Back of house is the kitchen and the crew. The
copy already lives in this world ("Rehearse on the real stage", "with no audience", "Your name on the
door. Ours in small print."), and it gives the whole visual system one rule that a build team can
apply without me in the room:

> **In every picture of the product, the firm's name, logo and color come first and largest. CoFile
> appears once, small, at the edge.**

That rule makes the site sell the copy's story by showing it, not by saying it:

| The copy's story | How Front of House shows it |
|---|---|
| **Your firm, your client, your name.** | Every product picture is branded as a firm, not as CoFile. On our own home page, the largest company name in the hero is "Harbor & Pine CPA", set bigger than our own wordmark in the header. In the Firms section the visitor types their own firm's name and watches it appear on a brass door plate, on their filing desk, on their client's form and on the proof. |
| **Effortless for everyone.** | The product is shown in motion, doing the work: a text message turning into a drafted filing, a state website filling itself in screen by screen, papers landing back on the firm's desk. Ease is shown as things moving smoothly from one hand to the next, never as a feature grid. |
| **A client experience to be proud of.** | The proof is treated as the most beautiful object on the site: large, readable, firm-branded, on a phone and a desk, introduced as a printer's proof of the firm's own letterhead that becomes the filing proof. |
| **The papers come back.** | A filing is drawn as a round trip. The brand's mark is that round trip: an open ring with a dot travelling it. The dot leaves the firm, passes through the client and the state, and comes home with the papers. |
| **A free rehearsal on the real stage.** | Sign-here Yellow, the one CoFile color, belongs to two things only: the "Run a free rehearsal" button and the rehearsal itself. In the Rehearsals section the house lights go down (the page's one dark band) and the state's real website is lit like a stage with no audience. |

**Two registers, one system.** Everything on every surface belongs to one of two registers.

- **House** (front of house) is the firm's register: its logo, its main color, its font, the client's
  name, the client's business. House is warm, specific and in color.
- **Backstage** is CoFile's register: the neutral frame, Ink type on white and Gallery grey, our
  wordmark, the docs, the enterprise dashboard, the support sections. Backstage is calm, exact and
  almost colorless, so that the firm's color is always the color you notice.

The marketing site is backstage giving a tour of the house. Our neutral frame is the gallery wall;
the firm is the painting.

**What the concept deliberately isn't.** It isn't built on safety. There are no locks, shields, vaults,
seals, stamps, checkmarks-as-decoration, fingerprints, hashes or "verified" badges anywhere in the
identity, the hero or the motion. The checks, the catch and security are designed as well-made
reference pages in the places the copy puts them: easy to find, calm, honest. They're the appendix
of a good annual report, not its cover.

**What earns the next scroll.** Each story section ends on something unfinished that the next section
completes, and one example filing runs through the whole page so the visitor follows a single case
from start to finish: Two Sisters Bakery LLC, a New Jersey LLC formation, prepared by the example firm
Harbor & Pine CPA, for $103.50 in state fees. The hero shows its proof. Process shows it moving through
three hands. The proof section opens the proof up. Firms puts the visitor's own name on it. Requests
shows where it came from (Ana Ortiz's text). Rehearsals shows it run on New Jersey's real website. After
shows its papers coming home. The close puts the visitor's name back on the door.

---

## 3. Identity

### 3.1 The mark: the Hand-off

An open ring with a dot sitting in its opening. The ring is the round trip a filing makes ("You start
it. Your client approves it. CoFile files it." and then "The papers come back to you."); the dot is the
filing, mid-hand-off. Read another way, it's a "C" passing something forward. It's about the hand-off
and the return, about ease. It contains no check, no lock and no seal, and it doesn't read as an
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
  middle of the gap. Clearance between the dot and each round cap is about 1.1 units, which holds open
  at 16 px.
- Optical correction: the dot is nudged 0.15 units outward (to x = 20.15) so it doesn't look as if it's
  being swallowed. The ring's caps are shaved 0.1 unit on their inner side so the opening reads as an
  even gap.
- Color: ring in Ink `#15181E`, dot in Sign-here Yellow `#FFC533`. One-color versions: all Ink, all
  white, or all currentColor (for the "with CoFile" lockup). On yellow backgrounds the dot is Ink and
  the ring is Ink.
- Minimum size: 12 px (the "with CoFile" lockup). Below 16 px the stroke thickens to 3.8 units and the
  dot to radius 2.4, drawn as a separate small-size master.
- Never: rotated, outlined, given a gradient, filled in as a disc, or put inside a badge, shield or
  circle frame.

### 3.2 The wordmark

"CoFile", in its exact capitalization, drawn from GT America Standard Medium and then hand-finished by
the foundry or a lettering artist:

- **The C** of the wordmark gets the mark's aperture: its terminals are cut at 40° from horizontal so the
  opening matches the ring's gap. Side by side the mark and the C rhyme.
- **The i** gets a round tittle (replacing the stock dot), sized at 1.25× the stem width and set 6%
  higher than stock, so the wordmark carries the mark's dot without being cute about it. The tittle is
  Ink, not yellow: color stays in the mark.
- **Spacing:** "Fi" kerned −20 units, "il" +6, overall tracking −1% at display sizes and 0 at text
  sizes. No ligatures.
- Cap height to x-height ratio stays GT America's. The wordmark is drawn at two optical sizes: Display
  (above 24 px) and Small (below 24 px, stems +6%, spacing +2%).

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
- **Favicon and app icon:** the mark alone. Favicon: Ink ring and yellow dot on transparent (light
  tabs), white ring and yellow dot (dark tabs, via `prefers-color-scheme` in the SVG favicon). App icon
  and social avatar: Ink ring and yellow dot on a white rounded square (radius 22% of the side).

### 3.4 The "with CoFile" mark: the small print, designed

"The only sign of us is a small 'with CoFile'." This lockup is the most-seen form of our brand, because
it sits on every page a client sees. It's designed as its own object, not as a shrunken logo.

```
   (◯•) with CoFile
   └┬┘ └─┬─┘ └──┬──┘
   12px  Regular  Medium    13px type, all one color, one line, never wraps
```

- Built as a single outlined SVG, so it needs no font on the firm's pages and renders identically
  everywhere.
- The mark at 12 px; 5 px gap; "with" in GT America Regular; "CoFile" in GT America Medium; 13 px
  type with optical spacing +1%.
- One color for all three parts, no yellow dot: on firm pages the dot would be the only non-firm color,
  and Front of House says the only color is the firm's. Default `#5B6170` on white (6.2:1, small but
  never illegible); `rgba(255,255,255,0.78)` on a firm-colored header band.
- **One per page.** Desktop and tablet: the far right of the firm's header, vertically centered on the
  logo. Phone: the center of the page footer, 24 px above the bottom safe area. Never in the body, never
  next to the Approve button, never in the email subject or sender name.
- On client-facing pages (the intake form, the proof, the decision page) it isn't a link, so nothing
  pulls the client away from their firm. On the filing desk it links to the CoFile home page.
- In the embedded widget it's replaced by the existing line "Filed with CoFile", set in the same
  13 px, same color, at the bottom of the frame.

### 3.5 How a firm's logo sits on its pages: the logo bay

Firms upload all sorts of logos: a tidy SVG wordmark, a 2009 JPEG with a white box around it, a square
seal-like crest, a light logo made for a dark letterhead. The logo bay makes every one of them look
deliberate.

```
 ┌──────────────────────────────────────────────────────────────────────────────┐
 │▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀ 6px firm main color ▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀│
 │                                                                              │
 │   [ LOGO  ≤44px tall, ≤220px wide ]  Harbor & Pine CPA            (◯•) with CoFile │
 │                                                                              │
 └──────────────────────────────────────────────────────────────────────────────┘
   white header, 80px desktop / 64px phone, 1px #E4E5E1 bottom rule
```

1. **Trim and measure.** On upload, the server trims transparent or flat-white margins (tolerance ΔE < 2)
   and measures the logo's aspect ratio and average luminance. The firm sees the trimmed result in
   Setup before it saves.
2. **Size by shape, not by box.** A wide wordmark (aspect ≥ 3:1) sits at 32 px tall, up to 220 px wide.
   A medium logo (1.4:1 to 3:1) at 40 px. A square or round logo (below 1.4:1) at 44 px, with the firm's
   name set beside it, because a square logo alone rarely says the name. Optical sizing, not equal
   height, is what makes three very different logos look like peers.
3. **Dark logo, white header.** Most logos were drawn for white letterhead, so the header is white by
   default and the firm color runs as a 6 px rule along the top edge.
4. **Light logo, colored header.** If the logo is mostly light (average luminance above 0.7 on
   transparent), the header becomes a 72 px band in the firm's main color and the logo sits on it, so a
   white logo is never lost on white.
5. **Logo with a white box.** If the trim finds an opaque white rectangle, the logo is placed on the white
   header as is. We never put a boxed logo on a colored band.
6. **No logo yet.** A monogram tile: 40 × 40 px, radius 10 px, filled with the firm's main color, the
   firm's initials (up to three letters, taken from the capitalized words of the name and skipping "&"
   and "and": "Harbor & Pine CPA" becomes HPC, or HP if the firm chooses two) in white, in the firm's
   font at 16 px Semibold, then the firm's name at 20 px beside it. Firms without a logo still look
   finished on day one.
7. **The firm's name.** Set in the firm's font at 20 px Semibold desktop, 17 px phone, in Ink. When the
   logo is a wide wordmark that already spells the name, the firm can hide the text name in Setup (a
   visual toggle; its label is `[copy needed]`).
8. **The second color** is used for links and highlights only, never as a second big shape.

How the firm's color is applied everywhere is specified in 4.4.

---

## 4. Color

### 4.1 The palette

CoFile's own palette is almost colorless on purpose: one yellow, a near-black, a warm-neutral grey,
and the plain status colors a product needs. The firm brings the color.

| Name | Hex | Role | Contrast notes |
|---|---|---|---|
| **Ink** | `#15181E` | All CoFile text, the ring of the mark, primary dark bands | 17.8:1 on white |
| **Graphite** | `#4A505C` | Secondary text, ledes, captions | 8.1:1 on white, 7.3:1 on Gallery |
| **Fine Print** | `#5B6170` | The lightest text allowed anywhere (the "with CoFile" lockup, table meta) | 6.2:1 on white |
| **Gallery** | `#F4F4F1` | Alternate section bands, the "stage" behind product shots | The gallery wall: neutral enough that navy, pine, burgundy and teal all look rich on it |
| **Rule** | `#E4E5E1` | Hairlines, table rules, card borders | Decorative |
| **Field Edge** | `#8A909C` | Input borders, the outline of the secondary button | 3.2:1 on white (meets non-text contrast) |
| **Sign-here Yellow** | `#FFC533` | Primary call to action, the mark's dot, everything about rehearsals | Ink on it: 11.3:1 |
| **Yellow Edge** | `#D9A21A` | The pressed edge of yellow buttons, outline of yellow dots on white | Decorative |
| **Rehearsal Tint** | `#FFF2C7` | Rehearsal notices and chips (with Ink text and a 1 px `#E8B82A` edge) | Ink on it: 15.9:1 |
| **Night** | `#0F1115` | The two dark bands (Rehearsals, Close and footer), dark mode base | |
| **Night Raised** | `#181B22` | Cards and code blocks on Night | |
| **Night Rule** | `#2A2F39` | Hairlines on Night | |

Why yellow: the one thing every CPA has put in front of every client is the yellow "sign here" flag.
It means "this is the part where you act". That's exactly what our yellow does: it marks the one action
on the page (Run a free rehearsal) and the free thing we're inviting people to do (the rehearsal). It's
also the one color no CPA, payroll or title firm I've ever worked with uses as its main brand color,
so it never collides with the firm's navy, pine or burgundy in the product shots. And it's
spectacular on Night, where our two big moments happen.

### 4.2 Status colors (product)

Status is never shown by color alone: every chip carries its words (the labels in `web/lib/status.ts`),
and tone only supports them.

| Tone | Text | Background | Used for (existing labels) |
|---|---|---|---|
| **Done** | `#157A4A` | `#E4F4EA` | "Approved", "Submitted to the state", "Accepted by the state", "EIN issued", "Completed", and "Live" |
| **Needs someone** | `#A04A06` | `#FDEEDF` | "Needs information", "Waiting for approval", "Changes requested", "Name unavailable", "On hold", "Paused: state site changed", "Being checked" |
| **Problem** | `#B3261E` | `#FBE9E7` | "Needs correcting", "Rejected by the state", "Failed", "Stopped" |
| **In motion** | `#4A505C` | `#EEEFF1` | "Received", "Getting the state's review page", "Queued", "Filing now", "Final check" |
| **Rehearsal** | `#15181E` | `#FFF2C7` + 1 px `#E8B82A` | "Rehearsal" |

"Needs someone" is a burnt orange, deliberately far from Sign-here Yellow so a waiting filing never
looks like a call to action.

### 4.3 How color is used

- **Per screen, one yellow thing.** On any viewport-height of any CoFile page there is at most one
  yellow button. Yellow dots (list markers, the mark) don't count; yellow buttons do. If two would
  show at once, the lower one turns into the secondary style.
- **Yellow is never text.** Yellow never carries words on white; words go in Ink on yellow.
- **Ink and white do the work.** Body text is Ink on white or Gallery. Ledes are Graphite. Nothing on
  the site is lighter than Fine Print.
- **The firm's color only lives inside product pictures** on the marketing site. Outside them, the page
  is Ink, white, Gallery and yellow. That's what makes the firm's color look like the point.
- **Bands alternate** white and Gallery, with two Night bands at the two moments of drama (the
  rehearsal stage, and the close running into the footer). Support sections sit on white with tighter
  spacing; they never get a band of their own color.
- **No gradients** on CoFile surfaces, except one: the soft spotlight on the rehearsal stage (4.6).

### 4.4 The firm's colors on its pages

The firm picks a **Main color** ("Buttons and the top of the page. Button text is white, so choose a
dark color.") and a **Second color** ("Links and highlights. Choose a color that's easy to read on
white."), the existing labels in Setup. The system then makes those choices look their best:

1. **Button shade.** If white text on the main color is below 4.5:1, the system derives a button shade
   by lowering OKLCH lightness in 0.02 steps (keeping hue, clamping chroma to stay in gamut) until it
   passes. The original color still paints the 6 px top rule, so the brand reads true; buttons use the
   accessible shade. Setup's live preview shows both, so nothing surprises the firm.
2. **Link shade.** The same for the second color against white at 4.5:1. If the firm gave no second
   color, links use the button shade.
3. **Tints.** Two tints per firm, mixed in OKLCH with white: 6% (selected table rows, the active nav
   item's background) and 12% (the left edge of notices, the selected choice card). The firm's color is
   never put behind body text at full strength and never floods a whole page.
4. **Focus.** A 3 px outline in the button shade with a 2 px white offset, on every focusable element.
5. **The firm's color never replaces status colors.** "Waiting for approval" is burnt orange in every
   firm's desk, so staff moving between firms (and enterprise accounts) read status the same way.
6. **Dark mode on the filing desk** lifts the button shade to OKLCH lightness 0.72 with Ink button text,
   so the firm's hue survives on Night. Client-facing pages (the form, the proof, the decision page and
   emails) stay light in every mode, the way a printed proof is always paper-white: the firm's brand
   was made for white, and that's where it looks best (see 12).

**Demo colors.** The example firm Harbor & Pine CPA is a pine green, `#1F4D3B` (9.6:1 with white
text), with a dark brass second color, `#8A5F1F` (5.6:1 on white), and uses the Lora preset as its
font, so the site demonstrates main color, second color and the firm's own font every time it shows
the proof. The eight ready colors offered in the home page demo and in Setup are dark enough for white
text without any adjustment:

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
| Status texts | Done `#5FD196`, Needs someone `#F5A25D`, Problem `#F28B82`, In motion `#C3C8D1`, on 16% tints of the same hues over Night Raised |

Product pictures (the proof, firm pages) stay light inside dark mode. On Night they read as lit
screens, which is exactly the look we want: the house is lit, backstage is dark.

### 4.6 The one gradient

On the Rehearsals band only: a radial spotlight behind the stage screen, from `#232733` at the center
to Night at 70% radius, at an ellipse 1.6:1. It's the house lights going down. Nowhere else.

---

## 5. Typography

### 5.1 Typefaces

- **GT America** (Grilli Type), Standard width, in Regular 400, Medium 500 and Bold 700, with italics
  for Regular. It's the American gothic tradition (the lineage of the plain-spoken grotesques American
  business has always printed its forms in), redrawn for screens: open apertures, generous x-height,
  sturdy figures, true tabular numerals. It sounds like a well-run firm, not like a startup. It carries
  every CoFile headline, paragraph, button and table.
- **GT America Condensed Medium** for one job: oversized index numerals (the numbered lists in
  "Checked twice" and "The catch", and the stat tiles on the enterprise dashboard). Never for words.
- **GT America Mono** Regular and Medium for code, API names, IDs and `"dryRun": true`. Never for
  business data on client pages: a CPA's client reads a state filing, not a terminal.
- **On firm pages, the firm's font** leads (the presets in `web/lib/fonts.ts`: Inter, IBM Plex Sans,
  Roboto, Open Sans, Lato, Montserrat, Source Serif, Merriweather, Lora, the device's own, or an
  uploaded file). CoFile's typefaces appear there only inside the outlined "with CoFile" SVG.
- **Licensing:** web, app and email licenses for GT America and Mono; a desktop license for the studios.
  The wordmark is drawn as outlines (3.2), so it needs no license in use.
- **Fallback stack:** `"GT America", "Helvetica Neue", Arial, system-ui, sans-serif`;
  mono: `"GT America Mono", ui-monospace, "SF Mono", Menlo, monospace`. Metric-matched fallback via
  `size-adjust` so pages don't jump when the web font loads.

### 5.2 The scale (marketing site)

Sizes are set for 40-to-65-year-old eyes. The body is 18 px on desktop, and nothing a reader needs is
below 15 px.

| Style | Desktop size / line | Phone size / line | Weight | Tracking | Use |
|---|---|---|---|---|---|
| Display | 72 / 76 | 40 / 44 | Medium | −2% | The hero H1 only |
| H2 | 52 / 56 | 32 / 37 | Medium | −1.5% | Section headlines |
| H2 support | 40 / 46 | 28 / 34 | Medium | −1% | "Checked twice. Filed once.", "Every filing service has a catch. Here's ours.", "Security" |
| H3 | 26 / 32 | 22 / 28 | Medium | −0.5% | Step titles, security card titles |
| Lede | 22 / 34 | 19 / 30 | Regular | 0 | The paragraph under each H2, in Graphite |
| Body | 18 / 28 | 17 / 27 | Regular | 0 | Lists, step text, table cells |
| Kicker | 17 / 24 | 16 / 22 | Medium | 0 | "For CPA, payroll, fractional CFO and title firms" |
| Button L | 19 / 24 | 18 / 22 | Medium | +0.5% | Primary CTAs |
| Small | 15 / 22 | 15 / 22 | Regular | +0.5% | Notes, captions, footnotes |
| Fine | 13 / 18 | 13 / 18 | Regular | +1% | "with CoFile", figcaptions, the legal line only |
| Index numeral | 64 / 64 | 44 / 44 | Condensed Medium | 0 | 01 to 05 in support lists |
| Code | 16 / 26 | 15 / 24 | Mono Regular | 0 | Docs, the enterprise snippet |

Fluid between breakpoints with `clamp()`: Display `clamp(40px, 3.2vw + 26px, 72px)`, H2
`clamp(32px, 2.2vw + 22px, 52px)`, Lede `clamp(19px, 0.3vw + 18px, 22px)`.

Rules:

- **Sentence case everywhere.** No all-caps labels, no letterspaced eyebrows: caps read slower, and this
  audience reads carefully. The only capitals are the ones in the data ("TWO SISTERS BAKERY LLC").
- **Measure:** ledes max 34 em (about 64 characters), body max 38 em.
- **Headlines break by meaning,** set by hand per breakpoint with `text-wrap: balance` as the fallback:
  "Your client approves the proof. / Then CoFile files it." The full stop is where the line breaks.
- **Figures:** tabular lining figures (`font-variant-numeric: tabular-nums lining-nums`) in every fee,
  table and date, so $100.00, $3.50 and $103.50 line up on the decimal.
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
| Chip | 14 / 18 | Medium | Status and stage chips, the smallest text in the product except "with CoFile" |
| Proof value | 18 / 26 | Regular | Values on the proof |
| Proof total | 24 / 30 | Bold | "Total" on the proof |

### 5.4 Pairing on firm pages

The firm's font sets both headings and body. If it's a serif (Lora, Merriweather, Source Serif), we keep
it for headings and body and add 2% to the line height for long help text. If an uploaded font has no
tabular figures, fees are set in the device's own font with tabular figures, so amounts always align;
the change is invisible at 18 px. The firm's font never appears smaller than 15 px.

---

## 6. Layout

### 6.1 Grid

| | Phone (< 640) | Tablet (640 to 1023) | Desktop (1024 to 1439) | Wide (≥ 1440) |
|---|---|---|---|---|
| Columns | 4 | 8 | 12 | 12 |
| Outer margin | 20 px | 32 px | 48 px | auto, content max 1200 px |
| Gutter | 16 px | 24 px | 24 px | 32 px |
| Header height | 60 px | 64 px | 72 px | 72 px |

Product pictures are allowed to break the grid on one side: on desktop the "stage" panel behind a
product shot runs from its column to the edge of the viewport, so the product feels bigger than the
page. Text never breaks the grid.

### 6.2 Spacing

An 8 px base with a few 4 px steps: 4, 8, 12, 16, 24, 32, 48, 64, 96, 128, 160.

| | Phone | Desktop |
|---|---|---|
| Story section padding (top and bottom) | 80 | 160 |
| Support section padding | 64 | 96 |
| H2 to lede | 16 | 24 |
| Lede to the section's product picture or list | 40 | 64 |
| Between list rows | 16 | 20 |
| Card padding | 20 | 32 |
| Product picture to its caption | 12 | 16 |

### 6.3 Rhythm: how the home page breathes

The page alternates **a story section** (big product picture, generous space, motion) with a short
pause, and steps down to **support sections** (typographic, tighter, still) where the copy puts them.
Read top to bottom, the energy goes: big (hero), flowing (process), close-up (proof), personal (firms),
surprising (requests), calm (checks), satisfying (after), dramatic (rehearsals, the dark stage),
factual (coverage), candid (the catch), calm (security), technical (enterprise), warm (close).

```
 Band color   Section                          Weight      Product picture
 ─────────────────────────────────────────────────────────────────────────
 white        1  Hero                          story       the proof, large
 Gallery      2  Process                       story       three hands, one line
 white        3  The proof                     story       the proof, opened up
 Gallery      4  Firms                         story       the door plate + live re-brand
 white        5  Requests                      story       a text becomes a draft
 white        6  Checks                        support     none (typographic)
 Gallery      7  After                         story       papers land on the desk
 NIGHT        8  Rehearsals                    story       the lit stage
 white        9  Coverage                      reference   the table
 Gallery     10  The catch                     support     none (typographic)
 white       11  Security                      support     none (typographic)
 Gallery     12  Enterprise                    story       code + the inquiry form
 NIGHT       13  Close → footer                story       the door plate, your name
```

Support sections get a hairline (`Rule`) above them instead of a color change, so they read as part of
the page that came before, not as new chapters.

### 6.4 Section anatomy

Story sections on desktop use one of two layouts, never more, so the eye learns where to look:

```
 A. Words left, product right (5 + 7)          B. Words on top, product full width (8 → 12)
 ┌───────────────┬───────────────────────┐     ┌───────────────────────────┐
 │ H2            │                       │     │ H2                        │
 │ Lede          │      PRODUCT          │     │ Lede                      │
 │ List          │      (bleeds right)   │     ├───────────────────────────┴───────┐
 │               │                       │     │           PRODUCT (12 col)        │
 └───────────────┴───────────────────────┘     └───────────────────────────────────┘
```

Hero, Proof, Firms, Requests, After and Enterprise use A (Proof and After mirror it, product left,
words right, so the page zigzags). Process, Rehearsals and Coverage use B.

On phones, every section is one column in copy order: H2, lede, then the product picture, then the
list. The product picture never comes before the headline.

### 6.5 Persistent elements

- **Header:** sticky. It starts transparent over the white hero and gains a white background at 92%
  opacity with a 12 px backdrop blur and a `Rule` bottom line once the page scrolls 8 px.
- **The header's "Run a free rehearsal"** stays visible on desktop at all times. On phones the header
  carries the logo, "Log in" and a menu button; the yellow button moves into a **sticky bottom bar**
  (64 px plus safe area, white, `Rule` top line) that slides up once the hero's own button has scrolled
  out of view, and slides away while the Close section's button is on screen. Same words, same place,
  every time.
- **No popups, no chat bubble, no cookie wall over content.** If a consent banner is legally needed it's
  a bottom sheet the same height as the sticky bar and replaces it until dismissed.

---

## 7. Art direction

### 7.1 Principles

1. **The product is the photograph.** The most important pictures on this site are the proof, the
   client's form, the filing desk and the papers coming back. They're built from the real component
   library with fixture data (Two Sisters Bakery LLC, Harbor & Pine CPA, $103.50) and placed in the page
   as live HTML, not as screenshots. They stay crisp at any zoom, a screen reader can read them, they
   translate with the page, and they can never drift from the real product.
2. **Photograph situations, never customers.** No faces paired with names, no quotes, no logos of firms
   that "use CoFile". People appear as hands, shoulders and working environments, so nobody can mistake
   a picture for a testimonial. Every photo is of a real place with paid, released talent, credited
   internally and captioned nowhere on the page.
3. **Nothing official.** No state seals, flags used as emblems, capitol domes, eagles, IRS marks or
   colors that copy a government site. State websites are drawn as neutral schematics (7.4), labeled
   with the copy's own words ("New Jersey's own review page, filled in"). In the real product, the
   proof shows the actual picture the state produced; on the marketing site we never imitate it.
4. **Warm people, cool frame.** Photography is warm, natural light. CoFile's frame around it is cool and
   neutral. The contrast is Front of House in one look: the people are lit, the crew is in black.
5. **No stock.** Not one stock photo, stock illustration or stock icon set.

### 7.2 Product pictures

**Device frames, our own drawing.** A generic phone (screen 390 × 844 at 1×, corner radius 48, bezel
10 px in Ink, a single 8 px camera dot centered at the top, no notch or island shape that copies a
real phone) and a generic browser window (40 px top bar in Gallery, a pill-shaped address field
showing the page's real path, no traffic-light dots). Both cast a "stage shadow":
`0 40px 80px -24px rgba(21,24,30,0.28), 0 8px 24px -8px rgba(21,24,30,0.12)`.

**Fixture data, kept consistent across every picture on the site:**

| Field | Value (all from the copy) |
|---|---|
| Firm | Harbor & Pine CPA (shown with "example firm" wherever the copy does) |
| Client business | Two Sisters Bakery LLC; New Jersey LLC formation |
| Members | Ana Ortiz, Lucia Ortiz (50/50) |
| Address | 88 Grove St, Jersey City NJ 07302 |
| Fees | Formation filing fee $100.00; NJ portal fee, by card $3.50; Total to the state $103.50 |
| Deadline | "Please approve by Dec 3, 5:00 PM Eastern." |
| The text message | "Need an LLC for the bakery. It's me and my sister, 50/50, in Jersey City." |
| Harbor & Pine's address bar path | `cofile.app/p/harbor-and-pine` (fixture, not copy) |

**Harbor & Pine's logo** is commissioned as a fixture: a small, believable professional-firm logo (a
simple pine-and-wave monogram beside the name, drawn in pine green). It's the example firm's identity,
not ours, and it's drawn so that it looks like a real practice's logo, not a CoFile asset. It appears
only where the copy names the example firm.

**Every product picture is real at 1:1.** If a CPA leans in to read a fee, she can. No blurred UI, no
lorem ipsum, no "abstracted" squiggle rows in the hero or the proof section. Where the copy gives no
value for a field, the field shows a neutral 10 px grey bar (Rule) rather than invented text.

### 7.3 Photography

**Who to commission:** a documentary and editorial photographer who shoots small business and the
workplace for magazines and annual reports, with a producer who can cast real working people (owners of
real bakeries, real bookkeepers) rather than models. Two shoot days in two cities: one day in Jersey City
and Hoboken, one in Chicago's neighborhood main streets.

**Look:** natural light only, window light where possible. 35 mm and 50 mm primes, f/2.8 to f/4: the
setting stays readable. Grading: warm neutral, whites kept white (no yellowed "vintage" cast), blacks
lifted only slightly, skin true. Unposed: people mid-task, never looking at the camera. Every frame
leaves clean negative space on one side for layout, and every phone or laptop screen is shot as a
clean tracking-marked screen so the real UI can be composited in post.

**Shot list:**

| # | Shot | What it shows | Where it's used |
|---|---|---|---|
| P1 | A main-street CPA office at 8:30 a.m., shot from the sidewalk: the door, the window, the street reflected. A blank brass plate on the door frame (for the 3D or composite plate). | Your name on the door | Firms section backdrop; Close (night version, P2) |
| P2 | The same door at dusk, lights on inside, warm glow through the glass. | The practice, open late in tax season | Close section, behind the plate |
| P3 | Over the shoulder of a firm owner, 50s, at her desk with a laptop; a client folder and a mug beside it; late-afternoon light. Screen tracking-marked. | You start it | Process step 1; the filing desk pages' sign-in panel |
| P4 | A bakery counter at 6 a.m., flour on the counter, two aprons on hooks; a hand holding a phone at chest height, thumb near the bottom of the screen. Screen tracking-marked. No face. | Your client approves it | Process step 2; the proof email |
| P5 | The same counter, the phone set down on a flour-dusted cloth, screen up. | The approval made, back to work | After section, small |
| P6 | A contractor in a pickup cab, phone on the steering wheel, thumb typing. Screen tracking-marked. | They text you | Requests section, phone version |
| P7 | A first-time founder at a kitchen table at night, laptop open, a notebook of sketches beside it. | The client on their own time | Intake form page (firm-neutral marketing only), sign-up side panel |
| P8 | A firm's front desk mid-morning: a staffer on the phone, another walking past with papers; motion blur on the walker. | A busy practice | Sign-up page side panel |
| P9 | Hands at a print-shop counter turning over a letterhead proof with crop marks, a stack of business cards beside it. | You've approved a proof before | The proof section, the frame before the morph |
| P10 | A tidy desk corner: a printed formation document and an envelope being slid into a client's binder. Documents shot blank and composited with neutral, non-official layouts. | The papers come back to you | After section, phone hero |

**Never:** a handshake, a headset, a crowd round a laptop, a magnifying glass, a padlock, a shield, a
government building, a flag, a pile of messy paperwork as a "before" shot, a stressed person rubbing
their temples.

### 7.4 Illustration

Kept to a few precise kinds, all drawn in-house or by a UI illustration studio, in one style: flat
fills, 1.5 px Ink lines at 1×, Gallery and white fills, yellow only for the dot.

- **The hand-off line:** a single 2 px Ink line with the yellow dot riding it, linking product pictures
  (Process, Requests, After). Corner radius 24 px where it turns.
- **State-screen schematics:** the 13 screens of New Jersey's LLC form, redrawn as neutral wireframes:
  a grey top bar with no emblem or state name, a page title as a grey bar, form rows. Real field labels
  appear only where the copy gives them ("Business Name", "Designator", "Pay Now"); values appear only
  where the fixture gives them (TWO SISTERS BAKERY, LLC). Grey 8% to 60% Ink only, so they read as
  "someone else's website" without imitating anyone's.
- **Document cards:** the papers that come back, drawn as white sheets with grey text bars and a label
  beneath (never a facsimile of a certificate or an IRS letter, never a seal, signature or barcode).
- **The stage meter:** see 11.6.
- **Empty states and errors:** the mark's ring and dot, drawn large at 120 px in Rule and yellow.

### 7.5 3D: the brass door plate

The site's one 3D object, used twice (Firms and Close).

**Who to commission:** a product-visualization 3D studio that does photoreal materials for real-time
web (WebGL) as well as stills.

**The object:** a satin-brushed brass plate, 300 × 100 mm, 4 mm thick, 1.5 mm chamfered edge, corner
radius 4 mm, fixed with four countersunk brass screws 12 mm in from each corner, mounted on a painted
wooden door panel (soft white paint, eggshell finish, a visible panel moulding above). Text is engraved
0.4 mm deep and filled with black enamel, set in the firm's chosen font (the default, Harbor & Pine CPA,
is in Lora), centered, cap height 22 mm, one or two lines automatically balanced.

**Light and camera:** key light from the upper left like a hallway window (5600 K, large softbox),
warm fill from the right (3200 K, low), a thin specular streak across the plate's top edge. Camera at
eye height, 6° off frontal to the left, 50 mm equivalent, shallow focus falling off on the door edges.

**Deliverables:**

- A real-time model (glTF, under 1.2 MB with textures, KTX2 compression) whose engraving is generated
  live from text: a signed-distance-field text mask drives the normal map, the cavity occlusion and the
  enamel fill, so any firm name engraves correctly in any of the preset fonts.
- A still-render fallback set: the blank plate in three lighting states (morning, P1; dusk, P2; neutral
  studio) at 3200 px wide, plus a layered PSD so the site can composite SVG text into the engraving with
  an inner-shadow and enamel-fill filter when WebGL isn't available.
- A 4-second loopable "glint" pass (a light sweep across the brass) for the moment a name is finished.

### 7.6 Iconography

A 40-icon set, commissioned from a UI icon designer: 24 px grid, 1.75 px stroke, round caps and joins,
2 px corner radius, Ink by default, currentColor in product. Includes: document, envelope, text
message, link, copy, paste, phone, laptop, calendar, clock, card (generic, no network marks), people,
person, building (a plain storefront, never a columned government building), arrow-right, arrow-return,
download, signature, pen, upload, settings, palette, font, eye, plus, minus, chevron (4), close, menu,
search, filter, sort, external link, code, webhook, key, play, pause.

**Banned from the set:** padlock, shield, vault, seal, rosette, stamp, badge-with-check, fingerprint,
eye-with-slash for "private", magnifier-over-document. A check glyph exists only as a functional mark
inside a checkbox and on completed setup steps, never as decoration in front of a sentence.

### 7.7 Texture

None on CoFile surfaces. Flat, clean, white. The only textures on the site are the real ones in the
photographs and the brass and paint of the door plate. No paper grain, no noise overlays, no fake
letterpress.

---

## 8. Motion

### 8.1 Principles

- **Motion shows the work moving between hands.** Every animation on the site is something passing from
  one person or place to the next: a value filling in, a message becoming a draft, a screen filling, a
  document coming home. Nothing spins for decoration.
- **It plays once, then gets out of the way.** Story animations run the first time a section is 40%
  in view, then hold their final frame. A small round "replay" button (play icon, 40 px, bottom-right
  of the product picture, `aria-label` `[copy needed]`) runs it again.
- **Nothing moves the reader's text.** Headlines and paragraphs fade in with at most 12 px of rise, or not
  at all; product pictures do the moving.
- **Reduced motion means final frames.** With `prefers-reduced-motion: reduce`, every sequence renders
  its finished state immediately, scroll-linked effects are off, and the door plate is the still render.
  Nothing is lost: each final frame is designed to tell the whole story on its own.

### 8.2 Tokens

| Token | Value | Use |
|---|---|---|
| `--ease-settle` | `cubic-bezier(0.2, 0.8, 0.2, 1)` | Things arriving and coming to rest |
| `--ease-move` | `cubic-bezier(0.45, 0, 0.2, 1)` | Things travelling (the dot, documents) |
| `--ease-exit` | `cubic-bezier(0.4, 0, 1, 1)` | Things leaving |
| `--t-micro` | 140 ms | Hover, press, chip changes |
| `--t-ui` | 260 ms | Menus, disclosures, color changes |
| `--t-scene` | 600 ms | A product picture entering |
| Spring (documents, cards) | stiffness 320, damping 28, mass 1 | Landing with a small, satisfying settle |
| Stagger | 60 to 120 ms | Rows, chips |

### 8.3 The moments

| # | Moment | Where | What happens | Duration | Why it sells |
|---|---|---|---|---|---|
| M1 | **The proof assembles** | Hero | Sheet rises 24 px and fades in; Harbor & Pine's green rule draws left to right; the firm's name sets in; the rows fill top to bottom (each value fades in from a soft grey bar, 90 ms stagger); the fees tick up to $103.50; the state review thumbnail slides in; "Approve for filing" breathes once (a 1.04× scale and a 6 px soft ring in the firm's green). | 2.6 s, once, on load | The first thing that moves on the site is the firm's name. Then the client's business. Then one button. |
| M2 | **The hand-off** | Hero → Process | After M1, a yellow dot leaves the Approve button and drops along the right edge of the hero into Process, where it rides the hand-off line across the three steps as you scroll (scroll-linked from 30% to 70% of the section in view). | Scroll-linked | Each step is literally passed to the next hand: "You start it. Your client approves it. CoFile files it." |
| M3 | **Letterhead becomes the proof** | The proof | A Harbor & Pine letterhead proof with crop marks (the thing every firm has approved at a printer) sits on the stage; the crop marks fade, the letterhead's header stays where it is, and the body of the page reflows into the filing proof's rows. | 1.6 s, once | It makes the lede's comparison visible: the proof is the firm's own letterhead doing a new job. |
| M4 | **Point to it** | The proof | Hovering or focusing a list item highlights the matching region of the proof (a 12% firm-green wash and a 2 px outline, 260 ms); the proof gently scrolls inside its frame to bring the region into view. | 260 ms per change | It's an interactive demo of the client experience, at the reader's pace. |
| M5 | **Your name on the door** | Firms | Typing in "Name your clients see" engraves the plate letter by letter (each letter carves in 40 ms, its enamel fills 120 ms later); 700 ms after the last keystroke, a glint sweeps the brass. In the same moment the three product previews beneath re-brand: name first, then color (color cross-fades 260 ms, 60 ms stagger across the three). | Live, per keystroke | The single most memorable moment on the site: the visitor sees their own firm's name on their own door, desk, form and proof. |
| M6 | **A text becomes a draft** | Requests | The bubble arrives with a typing indicator (600 ms); then three phrases underline in yellow one by one ("an LLC", "me and my sister, 50/50", "in Jersey City"), and from each a hand-off line draws to the drafted filing beside the phone, where the matching rows fill. Saved answers fill the remaining rows together, each with a firm-green left edge. | 3.4 s, once | "Clients don't fill in forms. They text you." shown as a thing that happens on its own. |
| M7 | **Papers come home** | After | Three document cards travel in on a gentle arc from the top-right (the state's direction) and land in the filing's record, one after another (700 ms each, 160 ms stagger, spring landing); the filing's stage track advances to "Completed"; the hand-off dot arrives last and settles into the record's corner. | 2.8 s, once | The round trip closes: "The papers come back to you." |
| M8 | **The stage plays** | Rehearsals | House lights dim as the band enters (the spotlight gradient fades up over 900 ms). The stage screen fills New Jersey's 13 screens in turn while the filmstrip below advances and the rehearsal log lights line by line in step. The last line simply arrives in Graphite, and the last screen's "Pay Now" button stays drawn in a dashed outline. Then the run holds, with a pause/play control. | 11 s, then holds; loops only if the visitor presses play | The whole filing, performed on the real stage. It shows the work, not a stop. |
| M9 | **Coverage settles** | Coverage | Each row's stage meter fills its pips left to right, 30 ms per pip, rows staggered 40 ms, once. | 1.2 s | A quiet read of progress: types earning their way to live. |
| M10 | **The ring closes** | Close | The door plate returns (with the visitor's name if they typed one); the glint runs once; the mark beside "Approve the proof. Then it's filed." draws its ring and the dot comes to rest in the gap. | 1.4 s, once | The page ends where the firm's name began. |

**Micro-interactions:**

- **Buttons:** on hover the yellow button lifts 1 px and its bottom edge deepens; on press it sinks
  2 px onto its edge (`--t-micro`). The firm-colored buttons on firm pages do the same in their shade.
- **Chips** change tone with a 140 ms color cross-fade, never a bounce.
- **The filing desk's "Filing now"** status shows a slim indeterminate bar in the firm's button shade
  under the chip; on CoFile's own dashboard the same status shows the mark with its dot circling the ring
  once every 1.6 s.
- **Copy link** buttons morph their icon from copy to a check for 1.2 s.
