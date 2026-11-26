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

---

## 9. The home page, section by section

All copy below is quoted from `web/app/page.tsx`, `web/components/landing/Shell.tsx` and
`web/components/BetaBanner.tsx`. "CoFile" stands where the code says `{name}`.

### 9.0 The frame: beta notice and header

**Beta notice.** A slim bar above the header, Gallery background, `Rule` bottom line, 15 px Small type
in Ink. A "Beta" chip leads (Rehearsal Tint, Ink text, 14 px Medium, because beta and rehearsal are the
same promise). Desktop: the whole notice, max two lines, centered on the content column:

> **Beta** CoFile is in beta. Any filing can run as a free rehearsal on the state's real website. It
> stops before the last button, so nothing is filed or paid. Filing types go live one at a time.
> Questions or problems? hello@cofile.app

Phone: one line, "**Beta** CoFile is in beta." with a chevron; tapping expands the rest in place
(260 ms height animation), and the bar remembers its state for the visit. It isn't dismissible:
it's short, and it's true.

**Header.**

```
 Desktop (72 px)
 ┌────────────────────────────────────────────────────────────────────────────────────────┐
 │ (◯•) CoFile     How it works   For firms   What we file   For platforms    Log in  [ Run a free rehearsal ] │
 └────────────────────────────────────────────────────────────────────────────────────────┘
   mark 28 px      17 px Medium Ink, 32 px apart                             text link  yellow, 48 px

 Phone (60 px)                                   Phone sticky bottom bar (after the hero's button scrolls away)
 ┌──────────────────────────────┐                ┌──────────────────────────────┐
 │ (◯•) CoFile      Log in   ☰  │                │ [    Run a free rehearsal   ] │  56 px button, 20 px margins
 └──────────────────────────────┘                └──────────────────────────────┘
```

Nav links ("How it works", "For firms", "What we file", "For platforms") get a 2 px Ink underline,
offset 6 px, for the section in view. The phone menu is a full-height sheet from the right: the four
links at 24 px Medium, 64 px rows, then "Log in" and the yellow button at the bottom within thumb reach.

---

### 9.1 Hero

**Copy placed:** kicker "For CPA, payroll, fractional CFO and title firms" · H1 "Your client approves the
proof. Then CoFile files it." · sub "CoFile fills in your clients' LLC and corporation formations, EINs
and employer registrations on the official New York, New Jersey, Florida and IRS websites, with your
firm's name and logo on every page your client sees. First, your client gets one page showing every
detail, every fee and, where possible, the state's own review page, filled in." · buttons "Run a free
rehearsal" and "See what your client sees" · note "In beta. A rehearsal fills in every screen of the
state's real website and stops before the last button, so nothing is filed and nothing is paid. You'll
set up your firm's filing desk first." · the sample proof for Two Sisters Bakery LLC from Harbor & Pine
CPA, with its figcaption "Sample proof · test details · not a real business".

**The idea:** the hero is the client's proof, branded as somebody's firm, at a size you can read. Not a
dashboard, not an abstract illustration. The biggest company name in the first screen of our own site is
the firm's.

**Desktop**

```
 white page                                    Gallery stage, bleeds to the right edge
┌─────────────────────────────────────────────┬──────────────────────────────────────────────┐
│                                             │░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░│
│ ━━ For CPA, payroll, fractional CFO and     │░░░   ┌──────────────────────────────────┐ ░░░░│
│    title firms                              │░░░   │▀▀▀▀▀▀▀▀▀▀▀ pine green 6px ▀▀▀▀▀▀▀▀▀▀│ ░░░░│
│                                             │░░░   │ [H&P]  Harbor & Pine CPA            │ ░░░░│
│ Your client approves                        │░░░   │        example firm                 │ ░░░░│
│ the proof. Then                             │░░░   ├──────────────────────────────────┤ ░░░░│
│ CoFile files it.                            │░░░   │ Two Sisters Bakery LLC  [Rehearsal] │ ░░░░│
│                                             │░░░   │ New Jersey LLC formation. Please    │ ░░░░│
│ CoFile fills in your clients' LLC and       │░░░   │ approve by Dec 3, 5:00 PM Eastern.  │ ░░░░│
│ corporation formations, EINs and employer   │░░░ ● │ Business name     TWO SISTERS BAKERY LLC │░░│
│ registrations on the official New York, New │░░░   │ Members           Ana Ortiz, Lucia Ortiz (50/50)│
│ Jersey, Florida and IRS websites, with ...  │░░░   │ Main business address  88 Grove St, ...  │░░│
│                                             │░░░ ● │ Formation filing fee           $100.00 │ ░░│
│ [ Run a free rehearsal ]  See what your     │░░░   │ NJ portal fee, by card           $3.50 │ ░░│
│                           client sees  ↓    │░░░   │ Total to the state             $103.50 │ ░░│
│                                             │░░░ ● │ ┌ New Jersey's own review page, ───┐ │ ░░│
│ In beta. A rehearsal fills in every screen  │░░░   │ │ filled in                         │ │ ░░│
│ of the state's real website and stops ...   │░░░   │ │ Business Name   TWO SISTERS BAKERY│ │ ░░│
│                                             │░░░   │ │ Designator      LLC               │ │ ░░│
│                                             │░░░   │ └───────────────────────────────────┘ │ ░░│
│                                             │░░░ ● │ [        Approve for filing         ] │ ░░│
│                                             │░░░   │ Nothing is submitted or paid until you│ ░░│
│                                             │░░░   │ approve.                              │ ░░│
│                                             │░░░   └──────────────────────────────────┘ ░░░░│
│                                             │░░░   Sample proof · test details · not a real business │
└─────────────────────────────────────────────┴──────────────────────────────────────────────┘
  cols 1–6                                       cols 7–12 + bleed
```

- **Kicker:** 17 px Medium Ink, led by a 24 × 3 px yellow rule. Sentence case.
- **H1:** Display, 72/76, Ink, broken by hand after "approves", "Then", "it." on desktop; after
  "approves", "Then CoFile" on phone.
- **Sub:** Lede style but 20/32 here, Graphite, max 33 em.
- **Buttons:** "Run a free rehearsal" as the Large primary (yellow, 56 px tall, 28 px side padding).
  "See what your client sees" as a text button with a down arrow, 19 px Medium Ink with a 2 px
  underline; it scrolls smoothly (600 ms, `--ease-move`) to the Proof section and starts M3 there.
- **Note:** Small, 15/22, Graphite, max 36 em, 24 px below the buttons, led by the same "Beta" chip as
  the notice bar so the two read as one fact.
- **The proof sheet:** 560 px wide, white, radius 16, stage shadow, on the Gallery stage. Harbor & Pine's
  6 px pine-green top rule, 72 px header with its monogram logo (32 px) and "Harbor & Pine CPA" set in
  Lora Semibold 24 px (larger than our 18 px header wordmark, on purpose), "example firm" under it in
  Fine. "Two Sisters Bakery LLC" in Lora Semibold 28 px with the yellow "Rehearsal" chip. Rows as
  label/value pairs, 17 px, values in tabular figures, `Rule` hairlines; the total row in Bold. The
  state review page as a neutral schematic (7.4) in a small browser frame, labeled with the copy.
  "Approve for filing" as a full-width firm-green button (52 px), "Nothing is submitted or paid until you
  approve." under it in Small.
- **Pointers:** four yellow 14 px dots with a 1 px Yellow Edge, half on the sheet edge and half on the
  stage, beside the details, fees, review page and button. Each is a link to the matching list item in
  the Proof section, labeled for screen readers with that item's own text. They're the same dot as the
  mark: the filing, pointing at what the client will see.
- **Figcaption:** Fine, Graphite, under the sheet's lower-left corner.

**Phone**

```
┌──────────────────────────────┐
│ Beta  CoFile is in beta.   ⌄ │
├──────────────────────────────┤
│ (◯•) CoFile       Log in   ☰ │
├──────────────────────────────┤
│ ━━ For CPA, payroll,         │
│    fractional CFO and title  │
│    firms                     │
│                              │
│ Your client approves         │  40/44
│ the proof. Then CoFile       │
│ files it.                    │
│                              │
│ CoFile fills in your         │  17/27 Graphite
│ clients' LLC and ...         │
│                              │
│ [   Run a free rehearsal   ] │  full width, 56
│   See what your client sees ↓│  text button, centered
│                              │
│ Beta  In beta. A rehearsal   │  15/22
│ fills in every screen ...    │
├──────────────────────────────┤
│░░░░░░░░ Gallery, full bleed ░│
│░ ┌──────────────────────────┐│
│░ │▀▀▀▀▀▀ pine ▀▀▀▀▀▀▀▀▀▀▀▀▀▀││  proof card: 350 px wide,
│░ │[H&P] Harbor & Pine CPA   ││  rows stack label over value
│░ │ ...                      ││
│░ └──────────────────────────┘│
│░ Sample proof · test details │
└──────────────────────────────┘
```

On phones the proof's rows stack (label in Small Graphite above value in Body), the fee amounts stay
right-aligned, and the review-page schematic goes full card width. The pointer dots sit inside the card's
left padding.

**Motion:** M1 on load (2.6 s), then M2 sends the dot down into Process. On phones M1 starts when the
proof card is 30% in view, not on load, so nobody misses it below the fold.

**Imagery:** none beyond the product. No photo competes with the proof.

---

### 9.2 Process: "You start it. Your client approves it. CoFile files it."

**Copy placed:** H2 "You start it. Your client approves it. CoFile files it." · lede "Three steps, and
your client is in charge of the middle one." · steps: "You start it." / "Fill in a short form yourself,
send your client a link, or forward the email or text they sent you. Your saved answers fill in the rest:
registered agent, organizer, signer, addresses." · "Your client approves it." / "They get the proof: one
page with your firm's name at the top, showing every detail and every fee." · "CoFile files it." / "It
fills in the state's own website screen by screen, checks the fee again before paying, and brings back
the state's documents. You hear about each stage."

**The idea:** three hands, one line. The middle card is the client's, and it's literally the biggest
thing in the row.

**Desktop** (layout B, Gallery band)

```
 You start it. Your client approves it.
 CoFile files it.
 Three steps, and your client is in charge of the middle one.

  ●━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━●━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━●   hand-off line, the dot rides it
 ┌─────────────────────┐   ┌───────────────────────────┐   ┌─────────────────────┐
 │  ┌────┐┌────┐┌────┐ │   │▀▀▀▀▀▀▀▀ pine green ▀▀▀▀▀▀▀▀│   │ ┌─────────────────┐ │
 │  │form││link││text│ │   │  ┌─────────────────────┐  │   │ │ state screen    │ │
 │  └────┘└────┘└────┘ │   │  │ phone: the proof     │  │   │ │ filling, row by │ │
 │  (fanned −4° 0° +4°)│   │  │ Harbor & Pine CPA    │  │   │ │ row             │ │
 │                     │   │  │ Two Sisters Bakery   │  │   │ └─────────────────┘ │
 │ registered agent ·  │   │  │ ...                  │  │   │  [Approved]         │
 │ organizer · signer ·│   │  │ [Approve for filing] │  │   │  [Filing now]       │
 │ addresses  → form   │   │  └─────────────────────┘  │   │  [Submitted to the  │
 │                     │   │                           │   │   state]            │
 ├─────────────────────┤   ├───────────────────────────┤   ├─────────────────────┤
 │ You start it.       │   │ Your client approves it.  │   │ CoFile files it.    │
 │ Fill in a short form│   │ They get the proof: one   │   │ It fills in the     │
 │ yourself, send ...  │   │ page with your firm's ... │   │ state's own website │
 └─────────────────────┘   └───────────────────────────┘   └─────────────────────┘
   cols 1–4                  cols 5–8, 24 px higher,          cols 9–12
                             12% taller, stage shadow
```

- **Cards:** white, radius 20, 32 px padding. Outer cards have a 1 px `Rule` border and no shadow. The
  middle card has no border, the firm's 6 px top rule, the stage shadow, and sits 24 px higher and 12%
  taller than its neighbors.
- **Step titles** in H3 (26/32 Medium); step text in Body. The titles are the H2's three sentences, so the
  eye can read the H2 again across the cards.
- **Vignette 1, "You start it.":** three small tiles fanned like cards in a hand: a mini form (title "New
  Jersey LLC formation", grey bars, a firm-green button), a link chip (the copy icon and a fixture client
  link), and Ana's text bubble. Below them, four small pills set in Small type with the step's own words
  "registered agent", "organizer", "signer", "addresses". During M2, as the dot passes, the pills slide up
  into the form tile and its grey bars turn into filled rows with a firm-green left edge (saved answers
  filling in the rest).
- **Vignette 2, "Your client approves it.":** the phone with the proof's top half: the Harbor & Pine
  header, "Two Sisters Bakery LLC", the first rows, "Approve for filing". On desktop the phone is
  composited into photo P4 (a hand at a bakery counter, shot straight-on), cropped to the hand and phone,
  filling the card's upper half. When the dot arrives, the button presses (2 px sink) and its label stays
  the same.
- **Vignette 3, "CoFile files it.":** a browser window with a neutral state-screen schematic filling row
  by row, and three notification toasts stacking beside it, using the product's real status labels:
  "Approved", "Filing now", "Submitted to the state" (Done, In motion, Done tones). That's "You hear about
  each stage", shown.
- **The hand-off line:** 2 px Ink, running across the top of the three cards and dipping into each card's
  top edge. The yellow dot rides it, scroll-linked (M2). On reduced motion the line is drawn with the dot
  resting at the right end.

**Phone**

```
┌──────────────────────────────┐
│ You start it. Your client    │
│ approves it. CoFile files it.│
│ Three steps, and your client │
│ is in charge of the middle   │
│ one.                         │
│ ┃                            │
│ ●┌──────────────────────────┐│  the line runs down the left margin
│ ┃│ [fanned tiles]           ││
│ ┃│ You start it.            ││
│ ┃│ Fill in a short form ... ││
│ ┃└──────────────────────────┘│
│ ●┌──────────────────────────┐│  middle card: full width, pine rule,
│ ┃│▀▀▀▀ pine ▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀││  shadow, the only card with a photo
│ ┃│ [P4 + phone]             ││
│ ┃│ Your client approves it. ││
│ ┃└──────────────────────────┘│
│ ●┌──────────────────────────┐│
│  │ [state screen + toasts]  ││
│  │ CoFile files it.         ││
│  └──────────────────────────┘│
└──────────────────────────────┘
```

The line runs vertically 12 px from the left edge; the cards are inset 24 px to make room. The dot travels
down it as the reader scrolls.

---

### 9.3 The proof: "Your client sees what the state will see, before the state does."

**Copy placed:** H2 "Your client sees what the state will see, before the state does." · lede "You've
approved a proof before: business cards, letterhead, an invitation at the printer. Nothing went to press
until you said so. The proof does the same for a filing. Your client gets a link to one page with your
firm's name and logo at the top. Approving it locks in exactly what's on it. If anything has to change
later, it comes back to them to approve again." · list: "Every name, address and answer, in the order the
state asks for them" · "Every fee in dollars and cents, from a verified fee table" · "Where the state's
website allows it, a picture of the state's own review page, filled in" · "Each statement your client is
making, such as letting the filing company sign or pay" · "One button. Until it's pressed, nothing is
submitted and nothing is paid." · "For CPAs: it does for a business filing what the 8879 does for a
return."

**The idea:** this is the anchor "See what your client sees" lands on, so it's an interactive demo of the
client's actual page. And it opens with something every firm owner has done: approve a printer's proof
of their own letterhead.

**Desktop** (layout A mirrored: product left, words right; white band)

```
┌─────────────────────────────────────────────────┬───────────────────────────────────┐
│░░░░░░░ Gallery stage, bleeds to the left edge ░░│ Your client sees what the state  │
│░░ ┌──────┐                                    ░░│ will see, before the state does. │
│░░ │ P9   │   ┌───────────────────────────┐    ░░│                                  │
│░░ │print │   │ phone, 430 × 880           │    ░░│ You've approved a proof before:  │
│░░ │shop  │   │ ┌───────────────────────┐ │    ░░│ business cards, letterhead, an   │
│░░ └──────┘   │ │▀▀▀▀▀ pine ▀▀▀▀▀▀▀▀▀▀▀▀│ │    ░░│ invitation at the printer. ...   │
│░░            │ │[H&P] Harbor & Pine CPA│ │    ░░│                                  │
│░░            │ │ Rehearsal: nothing ...│ │    ░░│ ● Every name, address and answer,│
│░░            │ │ Two Sisters Bakery LLC│ │◀───────── in the order the state asks ...│
│░░            │ │ ...                   │ │    ░░│ ● Every fee in dollars and cents,│
│░░            │ │ (scrolls inside)      │ │    ░░│   from a verified fee table      │
│░░            │ └───────────────────────┘ │    ░░│ ● Where the state's website ...  │
│░░            └───────────────────────────┘    ░░│ ● Each statement your client ... │
│░░                                             ░░│ ● One button. Until it's ...     │
│░░                                             ░░│ ┌──────────────────────────────┐ │
│░░                                             ░░│ │ For CPAs: it does for a      │ │
│░░                                             ░░│ │ business filing what the     │ │
│░░                                             ░░│ │ 8879 does for a return.      │ │
│░░                                             ░░│ │      ‾‾‾‾                    │ │
│                                                 │ └──────────────────────────────┘ │
└─────────────────────────────────────────────────┴───────────────────────────────────┘
  cols 1–7 + bleed                                  cols 8–12
```

- **The phone** shows the complete proof as the client gets it (designed in 10.3), at 1:1, for Two
  Sisters Bakery LLC from Harbor & Pine CPA: the firm header, the rehearsal note, the title, the deadline,
  the consent note, the state's review page, Filing details (with the Authorizations from the NJ LLC form,
  such as "I authorize the filing company to pay the state fee shown on the proof."), State fees, and the
  two buttons. It scrolls inside its screen with a visible slim scrollbar.
- **The list** has no ticks. Each item is a row with a 10 px yellow dot, Body text, 20 px between rows.
  Each row is a button (full-row hit area, focus ring): hovering or focusing it runs M4, which washes the
  matching region of the proof in 12% pine green with a 2 px outline, scrolls the phone to it, and draws a
  1.5 px Ink leader line from the dot to the region's edge. The first item is active by default.
- **"For CPAs":** the sixth item is set apart as a card: Gallery fill (on the white band), radius 16, 28 px
  padding, the text at 24/32 Medium Ink, and "8879" underlined with a 4 px yellow underline offset 4 px.
  It's the one line written in the CPA's own professional language, so it gets the emphasis of a pull
  quote. It's not linked to a region.
- **P9** (hands turning over a letterhead proof at a print counter) sits as a 200 × 260 inset at the
  stage's top-left corner, radius 12, before the phone: the visual footnote to "You've approved a proof
  before".
- **Motion (M3):** when the section is 40% in view, the phone's screen first shows a Harbor & Pine
  letterhead proof with crop marks at the corners (fine Ink hairlines, 16 px long, offset 8 px). Over 1.6 s
  the crop marks fade, the letterhead's header stays put as the proof's header, and the letter's body
  reflows into the proof's rows. Then M4 becomes available. Arriving from the hero's "See what your client
  sees" button starts M3 immediately.

**Phone**

```
┌──────────────────────────────┐
│ Your client sees what the    │
│ state will see, before the   │
│ state does.                  │
│ You've approved a proof      │
│ before: ...                  │
├──────────────────────────────┤
│░ Gallery, full bleed ░░░░░░░░│
│░ ┌──────────────────────────┐│  phone frame dropped: the proof card
│░ │▀▀▀▀ pine ▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀││  itself, 350 px wide, 560 px tall
│░ │[H&P] Harbor & Pine CPA   ││  window that scrolls inside
│░ │ ...                      ││
│░ └──────────────────────────┘│
│░ ● ● ● ● ●  (region chips)   │
├──────────────────────────────┤
│ ● Every name, address and    │
│   answer, in the order ...   │
│ ● Every fee in dollars ...   │
│ ● ...                        │
│ ┌──────────────────────────┐ │
│ │ For CPAs: it does for a  │ │
│ │ business filing what the │ │
│ │ 8879 does for a return.  │ │
│ └──────────────────────────┘ │
└──────────────────────────────┘
```

On phones the list sits below the proof; tapping an item scrolls the page up to the proof window and runs
M4 there. P9 is dropped on phones.

---

### 9.4 Firms: "Your name on the door. Ours in small print."

**Copy placed:** H2 "Your name on the door. Ours in small print." · lede "Your client needs an LLC. Who
do they call? You. They always have. Until now, saying yes meant someone on staff typing the same agent
address into a state website again, or sending the client to an online formation site and getting back a
filing you never saw. CoFile lets you say yes and keep your name on it." · list: "Your filing desk carries
your firm's name, logo and color." · "Send one client a link, keep a permanent filing page for each filing
you offer, or put the filing button on your own website." · "Your client sees your firm on the form and on
the proof. The only sign of us is a small "with CoFile"." · "Name your own registered agent in each state,
or use ours, provided through Registered Agents, Inc."

Demo labels, reused from the product's own Setup page: "Name your clients see", "Main color", and the
preview caption "Preview of a client's page".

**The idea:** the signature moment of the site (M5). The visitor types their own firm's name and sees it
engraved on a brass plate on a real office door, and then on their filing desk, their client's form and
their client's proof, in their color. CoFile appears once, at 13 px, in the corner. The headline
happens to the reader.

**Desktop** (Gallery band)

```
┌──────────────────────────────┬──────────────────────────────────────────────────────────┐
│ Your name on the door.       │ ┌──────────────────────────────────────────────────────┐ │
│ Ours in small print.         │ │ P1: the office door, morning light                   │ │
│                              │ │                                                      │ │
│ Your client needs an LLC.    │ │            ╔═══════════════════════════╗             │ │
│ Who do they call? You. They  │ │            ║    Harbor & Pine CPA       ║  brass,     │ │
│ always have. Until now, ...  │ │            ╚═══════════════════════════╝  live 3D    │ │
│ ... CoFile lets you say yes  │ │                                                      │ │
│ and keep your name on it.    │ └──────────────────────────────────────────────────────┘ │
│                              │                                        (◯•) with CoFile  │ 13 px
├──────────────────────────────┴──────────────────────────────────────────────────────────┤
│ ┌──────────────────────────────────────────────────────────────────────────────────────┐ │
│ │ Name your clients see  [ Harbor & Pine CPA                         ]                 │ │
│ │ Main color   (●)(●)(●)(●)(●)(●)(●)(●)                                                 │ │
│ └──────────────────────────────────────────────────────────────────────────────────────┘ │
│ ┌──────────────────────────┐  ┌──────────────────────────┐  ┌──────────────────────────┐ │
│ │ browser: the filing desk │  │ phone: the service page  │  │ phone: the proof         │ │
│ │ ▀▀▀▀ color ▀▀▀▀▀▀▀▀▀▀▀▀▀ │  │ ▀▀▀▀ color ▀▀▀▀▀▀▀▀▀▀▀▀▀ │  │ ▀▀▀▀ color ▀▀▀▀▀▀▀▀▀▀▀▀▀ │ │
│ │ [HP] name     with CoFile│  │ [HP] name                │  │ [HP] name                │ │
│ │ Filings  New filing ...  │  │ New Jersey LLC formation │  │ Two Sisters Bakery LLC   │ │
│ │ Two Sisters Bakery LLC   │  │ [fields]                 │  │ ...                      │ │
│ │ [Waiting for approval]   │  │ [Send to <name>]         │  │ [Approve, and authorize  │ │
│ │                          │  │         (◯•) with CoFile │  │  submission and payment] │ │
│ └──────────────────────────┘  └──────────────────────────┘  └──────────────────────────┘ │
│  ● Your filing desk carries     ● Send one client a link,      ● Your client sees your    │
│    your firm's name, logo and     keep a permanent filing        firm on the form and on  │
│    color.                         page for each filing you       the proof. The only sign │
│                                   offer, or put the filing       of us is a small "with   │
│                                   button on your own website.    CoFile".                 │
│                                                                                          │
│  ● Name your own registered agent in each state, or use ours, provided through           │
│    Registered Agents, Inc.                                                                │
└──────────────────────────────────────────────────────────────────────────────────────────┘
```

- **The door:** photo P1 cropped to 16:10, radius 20, with the brass plate (7.5) rendered live in WebGL
  where the blank plate sits in the photo, matched for perspective and light. The plate reads "Harbor &
  Pine CPA" in Lora until the visitor types.
- **"with CoFile"** sits outside the photo, under its bottom-right corner, at its real 13 px size in
  Fine Print grey. That's the second sentence of the headline, made literal. No arrow or annotation
  points to it; people find it, and smile.
- **The demo bar:** a white card, radius 16, 24 px padding, directly under the door. "Name your clients
  see": a Large field (56 px, 19 px text) pre-filled with "Harbor & Pine CPA", fully selectable; 40
  characters max. "Main color": the eight ready colors (4.4) as 36 px circles with a 2 px white ring and a
  1 px `Rule` outer ring, the selected one with a 2 px Ink outer ring. Field and swatches use the exact
  components from Setup, so the demo is the product.
- **Three previews:** live components at 0.8 scale, each 360 px wide: the filing desk overview in a
  browser frame, the New Jersey LLC service page on a phone, and the proof on a phone. Each re-brands on
  every keystroke and swatch click (M5): the logo bay shows the monogram tile generated from the typed
  name (logo bay rule 6), the name sets in the header, the main color runs the top rule and buttons, and
  "Send to <name>" picks up the name (the form's real button label, `Send to ${brand.name}`).
- **The list items** sit as captions under the three previews they describe, with the yellow dot marker.
  The fourth item, about the registered agent, runs full width beneath as a plain row with no picture
  (and no Registered Agents, Inc. logo).
- **Carry-over:** whatever the visitor typed and picked is kept in their browser (local storage, never
  sent anywhere) and pre-fills "Firm name" on the sign-up page and "Name your clients see" and "Main color"
  in Branding setup. The close section's door plate shows it too (9.13).
- **Clearing the field** returns everything to Harbor & Pine CPA.

**Phone**

```
┌──────────────────────────────┐
│ Your name on the door.       │
│ Ours in small print.         │
│ Your client needs an LLC ... │
│ ┌──────────────────────────┐ │
│ │ P1 cropped 4:3 to the    │ │
│ │ plate:  Harbor & Pine CPA│ │
│ └──────────────────────────┘ │
│            (◯•) with CoFile  │
│ ┌──────────────────────────┐ │  sticks to the top of the viewport
│ │ Name your clients see    │ │  while the previews below are in view
│ │ [ Harbor & Pine CPA    ] │ │
│ │ ● ● ● ● ● ● ● ●          │ │  swatches scroll sideways
│ └──────────────────────────┘ │
│ ┌────────────────────┐┌──────│  previews: horizontal swipe,
│ │ the filing desk    ││ the  │  snap to center, 300 px wide,
│ │                    ││ form │  page dots under them
│ └────────────────────┘└──────│
│ ● Your filing desk carries   │  caption changes with the card
│   your firm's name, logo ... │
│ ● Name your own registered   │
│   agent in each state, ...   │
└──────────────────────────────┘
```

**Fallbacks:** without WebGL, the plate is the still render with the name composited as SVG (inner
shadow, enamel fill). With reduced motion, the plate updates without the carve animation or the glint, and
the previews change without cross-fades.

---

### 9.5 Requests: "Clients don't fill in forms. They text you."

**Copy placed:** H2 "Clients don't fill in forms. They text you." · lede "That's how requests really
arrive. Send it on as it is, by email, text, WhatsApp or Slack. CoFile's AI reads the message and drafts
the filing, and your saved answers fill in the rest. Someone at your firm checks the draft. Then it goes to
your client as a proof, like any other filing. A message alone never reaches the state." · the bubble "Need
an LLC for the bakery. It's me and my sister, 50/50, in Jersey City." with "Ana Ortiz · text message ·
example" · the caption "↳ read into a drafted New Jersey LLC formation for your team to check".

**The idea:** a delighter. The thing that usually means work for the firm (a client's breezy one-line
text) turns into a drafted filing in front of the reader's eyes.

**Desktop** (layout A, white band)

```
┌──────────────────────────────┬──────────────────────────────────────────────────────────┐
│ Clients don't fill in forms. │   ┌──────────────────┐                                    │
│ They text you.               │   │ phone            │      ┌──────────────────────────┐  │
│                              │   │                  │      │ New Jersey LLC formation │  │
│ That's how requests really   │   │  ┌────────────┐  │      │ ──────────────────────── │  │
│ arrive. Send it on as it is, │   │  │ Need an LLC│  │ ───▶ │ LLC name, without the    │  │
│ by email, text, WhatsApp or  │   │  │ for the    │  │      │ ending      [ - - - - ]  │  │
│ Slack. CoFile's AI reads the │   │  │ bakery.    │  │      │ Members or managers      │  │
│ message and drafts the       │   │  │ It's me and│──┼────▶ │   me and my sister, 50/50│  │
│ filing, and your saved       │   │  │ my sister, │  │      │ Main business address    │  │
│ answers fill in the rest.    │   │  │ 50/50, in  │──┼────▶ │   in Jersey City         │  │
│ Someone at your firm checks  │   │  │ Jersey City│  │      │ Registered agent  ▌▬▬▬▬  │  │
│ the draft. Then it goes to   │   │  └────────────┘  │      │ Signers           ▌▬▬▬▬  │  │
│ your client as a proof, like │   │  Ana Ortiz · text│      │ Filing contact    ▌▬▬▬▬  │  │
│ any other filing. A message  │   │  message ·       │      └──────────────────────────┘  │
│ alone never reaches the      │   │  example         │                                    │
│ state.                       │   └──────────────────┘                                    │
│                              │   ↳ read into a drafted New Jersey LLC formation for your │
│                              │     team to check                                         │
└──────────────────────────────┴──────────────────────────────────────────────────────────┘
```

- **The phone:** our generic frame, cropped at the bottom, showing a single incoming message. The bubble
  is our own design (not any messaging app's): Gallery fill, radius 22 with a 6 px tail at bottom-left,
  20 px padding, the text at 20/28 Regular Ink, so it reads at a glance. "Ana Ortiz · text message ·
  example" in Fine under the bubble. No avatar, no face.
- **The draft:** a white card in the filing desk's style, titled "New Jersey LLC formation" (the real form
  title), with the NJ form's real field labels. Phrases from the message land as Ink-on-Rehearsal-Tint
  chips beside "Members or managers" and "Main business address". "LLC name, without the ending" is left
  empty with a dashed 1.5 px Field Edge outline: the message didn't give a name, and someone at the firm
  will check the draft. "Registered agent", "Signers" and "Filing contact" show as filled with grey value
  bars and a 3 px firm-green left edge: saved answers.
- **The caption** "↳ read into a drafted New Jersey LLC formation for your team to check" sits under the
  hand-off lines, 17 px Medium Graphite: it's the label of the transformation.
- **Motion (M6):** 3.4 s, once. Replay button in the corner.

**Phone**

```
┌──────────────────────────────┐
│ Clients don't fill in forms. │
│ They text you.               │
│ That's how requests really   │
│ arrive. ...                  │
│ ┌──────────────────────────┐ │
│ │ P6: a hand typing in a   │ │  photo P6, the phone screen composited
│ │ truck cab, the bubble on │ │  with the same bubble, live HTML
│ │ the screen               │ │
│ └──────────────────────────┘ │
│        ┃ (line drops down)   │
│ ↳ read into a drafted New    │
│   Jersey LLC formation for   │
│   your team to check         │
│ ┌──────────────────────────┐ │
│ │ New Jersey LLC formation │ │
│ │ ...rows...               │ │
│ └──────────────────────────┘ │
└──────────────────────────────┘
```

On phones the transformation runs vertically: the phrases lift out of the bubble and drop into the draft
below it.
