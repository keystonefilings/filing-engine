# CoFile visual design spec: House Colors

**Priya Nair**, product designer, Toronto. Spec 09 of 10. November 26, 2026.

Scope: visuals only. Every headline, paragraph, label and the order of the story are locked and
quoted here as they appear in `web/app/page.tsx` and the product pages. Where a design needs words
that don't exist yet (alt text, an aria label, an example name), I mark it `[copy needed]`.
I spell it "color" throughout, because that's what's on the buttons.

---

## 1. Who I am, and what I bring

I grew up between Kerala and London and have spent most of my working life in Toronto, designing
software for accounting firms: practice management, tax workflow, client portals. My days were
spent with CPA partners in their fifties who had spent thirty years building a name, and with the
staff who sit in our screens from 8 to 6 in March and April. Two lessons from that work shape this
spec.

First, **a work tool has to be a pleasant place to spend a day.** Firm staff will live in the filing
desk. It should feel calm, legible and quick, like a well-kept desk, not like a cockpit.

Second, **in white-label work the product's job is to make someone else's brand look good.** I've
shipped client portals for hundreds of firms, and every one of them uploaded a logo that broke the
layout in a new way: a white logo on a transparent background, a JPEG with a grey box around it, a
yellow that couldn't carry white button text, a script font that was unreadable at 14px. The
designs that worked were the ones that expected all of this and quietly made each firm look as
good as its best stationery.

So my weight in this spec sits where the copy sits: the firm's name on the door, the filing desk,
the branded pages, and the proof the client sees. The marketing site is where a firm owner decides,
and I want what they see there to be *their own future*, wearing their colors.

---

## 2. The visual concept: House Colors

> **CoFile is cut from graphite and chalk, so the only color on any page belongs to a firm.**

At school in London every house had its colors, and you wore them with a kind of pride you didn't
have to explain. Accounting firms have house colors too: the green on the letterhead, the navy on
the sign, the logo on the glass door. Nobody chose those casually.

House Colors is a system in which **CoFile itself is deliberately colorless**: graphite type,
chalk-white grounds, crisp paper surfaces, one excellent typeface. Everything that carries color
either belongs to a firm (its main color, its second color, its logo, its font) or tells you where
a filing stands. CoFile is the well-made garment; the firm's colors are what you see. Our only
mark on the client's pages is a small tag sewn in at the corner: "with CoFile".

### How it brings out the copy

| The copy sells | House Colors shows it |
|---|---|
| **Your firm, your client, your name.** "Your name on the door. Ours in small print." | Every product picture on the site wears a firm's colors, never CoFile's. The CoFile mark is literally a large open frame (the firm's place) with a small solid tag pinned to its corner (us). On the site, the frame fills with whichever firm's color is on screen. |
| **Effortless for everyone.** "You start it. Your client approves it. CoFile files it." | Three owners, three tones: the firm in its house color, the client on a phone, CoFile in graphite. One filing travels between them and comes home. Setting up a firm's look is one screen, and it shows up everywhere at once. |
| **A client experience to be proud of.** "Your client sees what the state will see, before the state does." | The proof is the most finished object in the system: a white page with the firm's nameplate and one band of its color, set with the care of a printer's proof. It is the hero of the home page. |
| **It does the work and brings the results home.** "The papers come back to you." | The documents travel back into the firm's record, in the firm's colors. Motion on the site always ends with something arriving at the firm, not leaving it. |
| **Try it free, for real.** "Rehearse on the real stage." | Rehearsal gets the one color CoFile owns: **Iris**, a calm violet-blue. Today the product shows rehearsals as yellow warnings. In House Colors a rehearsal is an invitation, and it looks like one. |

### Four rules the whole system follows

1. **CoFile has no brand color.** Graphite, chalk and paper are CoFile. Iris means "rehearsal" and
   nothing else. Every other hue on a page is a firm's, or a status.
2. **The firm leads wherever the client looks.** Logo, name, color and font come first on the form,
   the proof, the emails and the desk. CoFile is 12px, slate, at the far end of the header.
3. **One band of color.** The cloth I grew up around in Kerala, kasavu, is a plain cream ground with
   a single border of gold, and it is the most elegant thing I know. Firm pages work the same way:
   a white ground, one confident band of the house color, the house color on the one button that
   matters. Any color looks good used like this, even a difficult one.
4. **Real product, real people.** The pictures are the actual UI, rendered live in a firm's colors,
   and documentary photographs of the people it serves: firm owners, their staff, a bakery at
   6 a.m. No abstract illustrations of "automation", no robots, no shields.

### What House Colors is not

It is not a security brand. There are no locks, vaults, shields, checkmark seals, stamps or "stop"
gestures anywhere in the identity, the hero or the motion. The checks, the catch and security are
designed as calm, readable support sections exactly where the copy puts them (section 9), and they
borrow nothing from the brand's signature moments.

### The two signature ideas

- **The mark that wears your color.** The CoFile mark is an open frame with a tag. On the home page
  the frame fills with the color of the firm on screen: Harbor & Pine's pine in the hero, then
  each firm in turn as the page re-dresses, and then, at the very end, it empties again, waiting for
  yours.
- **The Re-dress.** In "Your name on the door. Ours in small print.", one filing desk, one client
  form and one proof change firm before your eyes: color, logo, font, all at once. The only thing
  that never moves is the small "with CoFile". It is the single most memorable moment on the site
  (section 9.4).

---

## 3. Identity

### 3.1 The mark: Frame and Tag

A large rounded square drawn as an open frame (the firm's place) with a small solid rounded square
(CoFile) pinned over its lower-right corner, like a maker's label stitched into a seam.

**Construction, on a 32 × 32 unit grid** (1 unit = 1px at 32px):

| Part | Geometry |
|---|---|
| Frame, outer edge | Rounded square from (1.5, 1.5) to (25.5, 25.5): 24 × 24, corner radius 6.0 |
| Frame, inner edge | Rounded square from (4.0, 4.0) to (23.0, 23.0): 19 × 19, corner radius 3.5 (stroke 2.5) |
| Tag | Solid rounded square 10 × 10, corner radius 2.5, centered on (25.5, 25.5), the frame's notional sharp corner. It spans (20.5, 20.5) to (30.5, 30.5) |
| Knockout | The frame is cut back by 2.0 units around the tag (an offset path of the tag, radius 4.5), so the tag floats just clear of the frame |
| Bounds | (1.5, 1.5) to (30.5, 30.5); 1.5 units of air to the canvas edge |

Notes for the illustrator: the frame's lower-right arc disappears under the tag and its knockout;
what remains are two frame arms that stop short of the tag with a clean 2-unit gap. Keep stroke
ends square (they are cut by the knockout, not capped). At 16px and below, increase the frame stroke
to 2.0px absolute and the knockout to 1.5px so the gap doesn't fill in.

**States of the mark**

| State | Frame | Tag | Where |
|---|---|---|---|
| **Open** (default) | Graphite outline | Graphite solid | Everywhere CoFile appears alone: log in, sign-up, docs, dashboard, favicon, social |
| **Worn** | Solid fill in the house color on screen (the inner hole is filled too) | Graphite solid, chalk knockout | The home page header and close; the branding setup step; the Frame illustration in empty states |
| **Mono** | Graphite outline | Graphite | Print, fax-quality, one-color use |
| **Reverse** | Chalk outline | Chalk | Graphite and dark grounds (footer, rehearsal stage band, dark mode) |
| **Tag only** | None | Graphite (slate in "with CoFile") | The "with CoFile" mark on firm pages, emails, the widget. The frame never appears on a firm's pages: the frame *is* the firm's page |

Minimum size: full mark 16px; tag alone 6px. Clear space: one tag width on all sides.

Favicon set: 16, 32, 48 (ICO), 180 (Apple touch), 192 and 512 (PWA), maskable 512 with the mark at
60% on chalk. An SVG favicon with a `prefers-color-scheme` media query swaps to Reverse in dark
browser chrome.

### 3.2 The wordmark

"CoFile", mixed case, always one word. Drawn by a type studio's custom-lettering team from CoFile's
typeface (GT America Standard Medium, section 5), with these refinements:

- **C**: horizontal terminals, aperture opened about 5% against the text font, so the word starts
  open and friendly.
- **o**: optically matched to the C; C–o kerned tight (−12 units at 1000 UPM) so "Co" reads as one
  syllable.
- **F**: middle arm shortened to 82% of the top arm, giving room for the i.
- **i**: the tittle is a **square**, 1.1× the stem width, corners at 15% of stem width. It is the
  Tag, in miniature, inside the name.
- **l**, **e**: straight from the typeface; e crossbar horizontal.
- Spacing: +0.5% tracking at display sizes. A separate small-size master (for 11–14px) with stems
  4% heavier and spacing 2% looser, used for "with CoFile".

### 3.3 Lockups

- **Primary horizontal**: mark left, wordmark right. The frame's outer height equals the
  wordmark's cap height; the frame top sits on the cap line and the frame bottom on the baseline,
  so **the tag hangs below the baseline like a descender**. Gap from mark to wordmark: 0.42 × frame
  width.
- **Mark only**: social avatars, app icon, favicon.
- No stacked lockup, no tagline lockup. The tagline "Approve the proof. Then it's filed." is set as
  text, never locked to the logo.
- Header size on cofile.app: wordmark cap height 17px desktop, 15px phone.

### 3.4 The "with CoFile" mark

The only sign of CoFile on a partner firm's pages, as the copy promises: "The only sign of us is a
small 'with CoFile'."

```
 ▪ with CoFile
 │  │    └── CoFile Sans Medium, live text (not an image)
 │  └─────── CoFile Sans Regular
 └────────── Tag: 0.5em square, radius 0.12em, 0.4em gap before "with"
```

| Property | Value |
|---|---|
| Size | 12px / 16px line on the desk, client pages, proof and widget; 13px in emails |
| Color | Slate `#59606A` on light; `#A8AEB6` on dark. Never the house color, never graphite-black |
| Typeface | Always CoFile Sans, never the firm's font. It is our label, sewn in with our thread |
| Place | The far right of the firm's header row, baseline-aligned with the firm name; the footer of the proof and of every email; the bottom of the embedded widget |
| Link | Not a link on client pages (a client shouldn't be led away from their firm). On the firm's own desk it links to cofile.app in a new tab |
| Enterprise white-label | Hidden entirely: those accounts show only their own brand (the legal line that names CoFile's Terms stays, as the copy has it) |

The widget's existing words "Filed with CoFile" use the same tag and styling.

### 3.5 How a firm's logo sits on its pages: the nameplate

Every firm surface opens with a **nameplate**: the firm's logo, its name, and one band of its
color. It appears at the top of the desk's sidebar, the header of every client page, the top of the
proof, and the header of every client email. Firms upload anything, so the nameplate is built to
make anything look intended.

**1. Trim.** On upload, detect the bounding box of non-background pixels and crop to it with 4%
padding. Most uploaded logos carry 20–40% dead margin; this alone fixes half of the "tiny logo"
complaints.

**2. Classify by shape** (width ÷ height after trimming):

| Class | Ratio | Logo height (desk / client page / proof / email) | Firm name beside it? |
|---|---|---|---|
| Wide | ≥ 2.6 : 1 | 30 / 36 / 36 / 36px, max width 240px (180px phone) | No, by default: wide logos almost always contain the name. The name stays in the page as visually hidden text and in the title area |
| Mid | 1.4 – 2.6 : 1 | 36 / 40 / 40 / 40px | Yes, 18px, firm font, 600 |
| Square or tall | < 1.4 : 1 | 40 / 44 / 44 / 44px | Yes, 20px, firm font, 600 |

A checkbox in Branding overrides the default for wide logos: `[copy needed: "Show our name next to
the logo"]`.

**3. Read the background.** Sample the outer 2px ring of the trimmed image:

| What we find | What we do |
|---|---|
| Transparent | Place directly on white. On chalk or dark grounds, set it on a white plinth (radius 10, padding 6px × 10px) |
| Solid white or near-white (OKLCH L > 0.94) | Treat as transparent-on-white; same plinth rule off white |
| Solid color or dark | Present the logo as a **tile**: clip the image's corners to radius 8 so its own box becomes a deliberate tile. No extra border |
| Busy or photographic | Tile with radius 8 and a 1px Stone hairline |
| Light marks on transparent (mean L of mark pixels > 0.85: a logo made for dark websites) | Render on a tile filled with the house color, or with Graphite if the house color is light |

**4. No logo yet.** Draw a **monogram tile**: 44 × 44px, radius 10, filled with the house color,
initials in the house-on text color, firm font at 600. Initials come from the first two
significant words, skipping "and", "&", "the", "of", "CPA", "CPAs", "LLC", "LLP", "PC", "Inc",
"Group". "Harbor & Pine CPA" becomes **H&P**, with the ampersand set at 80% size. It looks like a
decision, not a placeholder, and the firm can live with it until it uploads a logo.

**5. The band.** A 4px rule of the firm's exact main color runs along the top edge of every client
page, the proof and every client email. On the desk, the same 4px band crowns the sidebar above the
nameplate. This is the kasavu border: the one place the exact hex appears, at full strength,
regardless of how difficult it is.

**6. Never.** Recolor a logo, add shadows or outlines to it, crop it to a circle, stretch it, or
put it straight onto a field of the house color without its tile.

### 3.6 The example firm: Harbor & Pine CPA

The copy names one example firm, and it carries the whole site. A brand-identity studio designs
it as if it were a real twelve-person practice, because firm owners will judge CoFile by how good
this firm looks.

- **Logo**: "Harbor & Pine" in a warm, slightly condensed serif, with a compact symbol: a pine whose
  lowest branches resolve into two horizontal wave lines. "CPA" in letterspaced small caps. Mid
  class, about 2.1 : 1, transparent background. Also a square symbol-only version for the tile.
- **Main color**: Pine `#1F5C4B`. **Second color**: Brass `#8A5F14` (5.6 : 1 on white, so it
  passes as a link color untouched).
- **Font on its pages**: Lora, one of the presets already in the product's font menu. Showing a
  preset, not a custom font, proves to every visitor that their firm can look this good with what's
  in the menu today.
- **Props for photography**: vinyl lettering on a glass office door, letterhead, business cards,
  a pocket folder, a mug, an email signature, a framed certificate on the wall (generic, no seals).

Four more demo firms appear in the Re-dress and in the QA gallery. Their names are `[copy needed]`;
their looks are briefed in section 4.5.

### 3.7 Identity don'ts

- No folder tabs, checkmarks, seals, stamps, ribbons, padlocks or shields in or around the mark.
- No gradients in the mark; the Worn fill is a flat house color.
- Never use the frame on a firm's pages. Never set the wordmark in the firm's color.
- Nothing that resembles a government seal, an eagle, a state outline in a circle, the IRS, or any
  official emblem, anywhere on the site, in any illustration, in any photograph.

---

## 4. Color

### 4.1 CoFile's own palette (light)

CoFile is these eight values and nothing else. Contrast figures are against the ground they are
used on.

| Name | Hex | Role | Contrast |
|---|---|---|---|
| **Graphite** | `#1B1F24` | All text; CoFile's primary buttons; the tag; the footer and the rehearsal stage band | 14.9 : 1 on Chalk |
| **Chalk** | `#F5F3EE` | Page ground on cofile.app and on the filing desk. A whisper warm, so blues, greens and burgundies all sit well on it | — |
| **Paper** | `#FFFFFF` | Cards, forms, the proof, every client page. Client pages are pure white so a firm's color reads true | — |
| **Chalk Deep** | `#ECE9E2` | Support bands (Checks, The catch), the beta bar, table header rows | — |
| **Stone** | `#E3DFD7` | Hairlines and dividers (decorative only) | — |
| **Pebble** | `#8E9399` | Field borders, checkbox outlines, the open frame in empty states | 3.1 : 1 on Paper (passes non-text contrast) |
| **Slate** | `#59606A` | Secondary text, captions, "with CoFile" | 5.7 : 1 on Chalk, 6.4 : 1 on Paper |
| **Iris** | `#5B4BD6` | **Rehearsal, and only rehearsal** | 6.1 : 1 on Paper |

### 4.2 Status colors

Status is always color **plus a glyph plus words**, never color alone, because some firms' house
colors are green, red or amber, and some readers can't tell those apart.

| Tone | Text / glyph | Tint (chip and notice ground) | Used for (the product's own labels) |
|---|---|---|---|
| **Leaf** | `#1D7A50` | `#E4F2EA` | Live, Approved, Submitted to the state, Accepted by the state, EIN issued, Completed |
| **Marigold** | `#8F5600` | `#FFF0D4` | Waiting for approval, Needs information, Changes requested, Ready to pay, On hold, Name unavailable, Being checked, Paused: state site changed |
| **Brick** | `#B42318` | `#FDECEA` | Needs correcting, Rejected by the state, Failed, Stopped |
| **Slate** | `#59606A` | `#EFEDE8` | Received, Queued, Filing now, Getting the state's review page, Final check |
| **Iris** | `#5B4BD6` | `#EEEBFF` | Rehearsal (chips, notices, the beta tag, the run sheet) |

All text-on-tint pairs pass 5 : 1 or better.

### 4.3 Dark mode

| Name | Hex | Role |
|---|---|---|
| Night | `#121417` | Ground |
| Graphite 2 | `#1A1D21` | Surfaces, cards |
| Graphite 3 | `#23272C` | Raised surfaces, menus, the proof card on cofile.app |
| Seam | `#30353B` | Hairlines |
| Pebble Dark | `#6B7178` | Field borders |
| Chalk Text | `#EEECE7` | Text (15.6 : 1 on Night) |
| Slate Dark | `#A8AEB6` | Secondary text (8.4 : 1 on Night) |
| Iris Dark | `#A99BFF` | Rehearsal |
| Leaf / Marigold / Brick Dark | `#5CCB8E` / `#F2B65A` / `#FF8A7A` | Status text; their tints are the same hues at 16% over Graphite 2 |

CoFile's primary button inverts in dark mode: Chalk Text fill, Night label.

### 4.4 The house color engine

A firm gives us one or two hex codes. The product's branding help asks for a dark main color
because button text is white, but people pick what's on their letterhead, so the system must
make any color work without changing its hue. All derivations happen in OKLCH, which keeps the hue
stable as lightness changes.

| Token | Derived how | Used for |
|---|---|---|
| `--house` | The firm's main color, exactly | The 4px band; monogram tile; primary button fill (when it passes); timeline nodes; checkbox fill; the desk's selected-nav bar |
| `--house-on` | White if white on `--house` ≥ 4.5 : 1; else Graphite if that ≥ 4.5 : 1 | Text on house-colored buttons and tiles |
| `--house-button` | `--house` if either label color passes; otherwise `--house-ink` | Primary button fill, so mid-tones like a bright pink still get a legible button in their own hue |
| `--house-ink` | Lower OKLCH L in 0.02 steps (reducing chroma if it leaves sRGB) until ≥ 4.5 : 1 on Paper | Focus rings, numbered markers, link text when there is no second color |
| `--house-2` / `--house-2-ink` | The second color, and its ink derived the same way | Links and highlights, as the product help says |
| `--house-wash` | 6% `--house` over Paper | The title band on client pages; hovered rows; selected cards |
| `--house-tint` | 14% `--house` over Paper | `mark` highlights on the proof; "filled in from your message" highlights |
| `--house-dark-ink` | Raise L until ≥ 4.5 : 1 on Graphite 2 | Links and markers in dark mode |
| `--house-dark-wash` | 14% `--house` over Graphite 2 | Title band in dark mode |

The engine replaces today's `textOn()` luminance threshold with a real contrast check. The 4px band
always uses the exact hex: it is decorative, and it is the firm's.

Rules for house color:

- **Never** for body text, large backgrounds, status chips, errors, or anything that must mean
  "problem". Brick means problem everywhere, even for a firm whose color is red.
- If a firm's color sits within ΔE 12 of Leaf, Marigold, Brick or Iris, status chips keep their
  colors (the glyph and label carry the meaning) and the Branding preview shows them side by side
  so the firm sees it's fine.
- No second color set: `--house-2` = `--house-ink`.

### 4.5 The demo houses (site imagery and QA)

| Firm | Main | Second | Logo case it proves |
|---|---|---|---|
| Harbor & Pine CPA | Pine `#1F5C4B` | Brass `#8A5F14` | Mid logo, preset font (Lora) |
| A payroll firm `[copy needed: name]` | Cobalt `#1F4FD1` | — | Wide sans wordmark, no name beside it |
| A title company `[copy needed: name]` | Teal `#0F766E` | — | JPEG with a dark box: becomes a tile |
| A fractional CFO firm `[copy needed: name]` | Slate `#334155` | Coral `#C2410C` | Square monogram mark, name beside it |
| A bookkeeping and tax practice `[copy needed: name]` | Purple `#7E22CE` | — | Uploaded display font, headings only |
| A family CPA practice `[copy needed: name]` | Amber `#B45309` | — | Warm mid-tone; white text still passes (5.0 : 1) |

The five extra mains are five of the nine "ready colors" the Branding page already offers. The
Re-dress swatch row on the home page uses exactly those nine, so what a visitor plays with on the
site is what they'll pick on day one.

The QA gallery adds 18 hostile cases: yellow `#F2C200`, neon `#39FF14`, pale pink `#F9C5D1`,
near-white `#F5F5F5`, pure black, red-plus-green, a 64px logo, a 4000px logo, a white logo on
transparent, a logo with 40% padding, a photo as a logo, a script font, a very condensed font, a
40-character firm name, a 2-letter firm name, a Spanish firm name with accents, a firm with no logo,
and a firm whose color is identical to Leaf.

### 4.6 How color is used, by surface

| Surface | Neutral | House | CoFile accent |
|---|---|---|---|
| cofile.app pages | ~85% Chalk and Paper, ~10% Graphite | Up to ~5%, only inside product imagery and the Worn mark | Iris for rehearsal mentions |
| Filing desk | Chalk ground, Paper cards, Graphite text | Band, nameplate, primary buttons, selection | Iris rehearsal chips |
| Client pages and the proof | Paper ground | Band, title wash, the one primary button, highlights | Iris rehearsal notice; Slate "with CoFile" |
| Enterprise dashboard and docs | Chalk, Paper, Graphite | None (it's CoFile's own room) | Iris for rehearsals and `"dryRun": true` |

### 4.7 Tokens

```css
:root {
  --graphite: #1B1F24;  --chalk: #F5F3EE;  --paper: #FFFFFF;  --chalk-deep: #ECE9E2;
  --stone: #E3DFD7;     --pebble: #8E9399; --slate: #59606A;  --iris: #5B4BD6;
  --leaf: #1D7A50;  --leaf-tint: #E4F2EA;  --marigold: #8F5600; --marigold-tint: #FFF0D4;
  --brick: #B42318; --brick-tint: #FDECEA; --neutral-tint: #EFEDE8; --iris-tint: #EEEBFF;
  /* Set per firm by the house engine; Harbor & Pine shown */
  --house: #1F5C4B; --house-on: #FFFFFF; --house-button: #1F5C4B; --house-ink: #1F5C4B;
  --house-2: #8A5F14; --house-2-ink: #8A5F14; --house-wash: #F1F5F4; --house-tint: #DDE7E4;
}
@media (prefers-color-scheme: dark) {
  :root:not([data-theme="light"]) {
    --graphite: #EEECE7; --chalk: #121417; --paper: #1A1D21; --chalk-deep: #23272C;
    --stone: #30353B; --pebble: #6B7178; --slate: #A8AEB6; --iris: #A99BFF;
    --leaf: #5CCB8E; --marigold: #F2B65A; --brick: #FF8A7A;
  }
}
:root[data-theme="dark"] { /* same values as the media query block */ }
```

---

## 5. Typography

### 5.1 Typefaces

| Role | Face | Weights | Why |
|---|---|---|---|
| **CoFile Sans**: headlines, UI, body | **GT America Standard** (Grilli Type), licensed for web, app and desktop | Regular 400, Medium 500. Bold 700 only for the large stat numerals on the dashboard | A grotesk with American gothic warmth: confident in a 64px sentence, plain in a 15px table. Real tabular figures, distinct I / l / 1, a generous x-height. Crucially, it is **not** in the firm font menu, so no firm page is ever mistaken for CoFile, and CoFile never looks like a firm |
| **CoFile Mono**: what the state will see | **GT America Mono** (Grilli Type) | Regular 400 | Used for one meaning: values as they'll be typed into the state's form (on the proof and in the desk), plus reference numbers, links, EINs, API keys and code. Shares GT America's proportions, so it sits in a sentence without jolting |
| **The firm's font** | Whatever the firm picks: a preset (Inter, IBM Plex Sans, Roboto, Open Sans, Lato, Montserrat, Source Serif, Merriweather, Lora) or its own upload | 400 and 600 | See 5.2 |
| **Emails** | System stack: `-apple-system, "Segoe UI", Helvetica, Arial, sans-serif`; mono `ui-monospace, Menlo, Consolas, monospace` | 400, 600 | Web fonts are unreliable in mail clients |

Fallbacks for CoFile Sans: `"Helvetica Neue", Arial, system-ui, sans-serif`, with a metric-adjusted
`@font-face` fallback (`size-adjust`, `ascent-override`) so the page doesn't jump when the font
arrives.

One family, two cuts. No serif on CoFile's own pages: I want the firm's own typography, which is
often a serif logo, to be the only "voice" with personality on a firm's page, and CoFile's site to
read like the calm frame around it.

### 5.2 Where the firm's font goes

The firm's font is used where it shines and kept away from where it can hurt.

| Element | Preset font | Uploaded font |
|---|---|---|
| Firm name in the nameplate | Firm font 600 | Firm font 600 |
| H1 and H2 on client pages, the proof title, desk page titles | Firm font 600 | Firm font 600 |
| Primary button labels on client pages | Firm font 600 | CoFile Sans Medium (uploaded fonts often lack the weights or glyphs a button needs) |
| Body, labels, fields, help, tables, chips | CoFile Sans | CoFile Sans |
| Values on the proof | CoFile Mono | CoFile Mono |

"Standard (the device's own)" uses `system-ui` for the firm roles. Every firm font gets a
metric-matched fallback generated at upload, so a slow font never reflows the proof.

### 5.3 Scale: cofile.app

| Token | Desktop | Tablet | Phone | Weight | Tracking | Use |
|---|---|---|---|---|---|---|
| display-1 | 64 / 68 | 52 / 56 | 40 / 44 | 500 | −0.02em | Hero headline |
| display-2 | 48 / 54 | 40 / 46 | 32 / 38 | 500 | −0.015em | Section headlines |
| display-3 | 36 / 42 | 32 / 38 | 28 / 34 | 500 | −0.01em | Support section headlines (Checks, The catch, Security) |
| title-1 | 28 / 34 | 26 / 32 | 24 / 30 | 500 | −0.005em | Close tagline, auth card titles |
| title-2 | 22 / 28 | 21 / 28 | 20 / 26 | 500 | 0 | Card titles, step titles, h3 |
| lede | 21 / 33 | 20 / 31 | 19 / 30 | 400 | 0 | Section ledes |
| body | 18 / 29 | 18 / 29 | 17 / 27 | 400 | 0 | Lists, paragraphs |
| small | 15 / 22 | 15 / 22 | 15 / 22 | 400 | 0 | Notes, footnotes, the beta note |
| kicker | 16 / 22 | 16 / 22 | 15 / 20 | 500 | +0.01em | Hero kicker, sentence case |
| caption | 13 / 18 | 13 / 18 | 13 / 18 | 500 | +0.01em | Figure captions, chip labels |
| mono | 16 / 24 | 16 / 24 | 15 / 22 | 400 | 0 | Values, code |

### 5.4 Scale: the desk, client pages and the proof

| Token | Size / line | Weight | Use |
|---|---|---|---|
| page-title | 32 / 40 (phone 28 / 34) | Firm font 600 | Desk page titles, client page H1 |
| proof-title | 34 / 40 (phone 28 / 34) | Firm font 600 | The filing title on the proof |
| section | 21 / 28 | 600 (firm font on client pages, CoFile Sans Medium on the desk) | Fieldset legends, card titles |
| body | 16 / 24 desk; **17 / 26 client pages and the proof** | 400 | Paragraphs |
| label | 15 / 20 | 500 | Field labels |
| field | 17 / 24 | 400 | Text in inputs (17px stops iOS zooming and is kind to older eyes) |
| help | 15 / 22 | 400 | Help under fields |
| table | 15 / 22 | 400 | Desk tables |
| proof-label | 15 / 22 | 500, Slate | Left column of Filing details |
| proof-value | 16 / 24 | Mono 400, Graphite | Right column of Filing details |
| fee | 17 / 24 | 400, tabular figures; total 600 | State fees |
| chip | 13 / 16 | 500 | Status chips (the smallest text in the product) |
| tag-line | 12 / 16 | 400 + 500 | "with CoFile" |

### 5.5 Details

- **Sentence case everywhere.** No all-caps labels or kickers; older readers recognize word shapes,
  and all-caps is harder for them. The only uppercase on any page is the state's own values
  (TWO SISTERS BAKERY LLC), which is exactly the point.
- **Figures**: tabular lining in tables, fees, timestamps and the coverage table; proportional in
  prose. Dollar amounts always show cents on the proof and the fee rows ($103.50, $3.50).
- **Measure**: body 60–68 characters; ledes max 620px; headlines balanced with `text-wrap: balance`.
- **Hero line break**: "Your client approves the proof." / "Then CoFile files it." Two sentences,
  two lines on desktop, never a widow.
- **Links** are always underlined (1px, offset 3px, Slate-mixed underline that becomes solid on
  hover). Some firms' second colors are weak; the underline carries the meaning.
- **Weights**: nothing lighter than 400, ever.

---

## 6. Layout

### 6.1 Grid and breakpoints

| Breakpoint | Width | Columns | Margins | Gutter |
|---|---|---|---|---|
| Phone | < 640px | 4 | 20px | 16px |
| Tablet | 640–1023px | 8 | 32px | 20px |
| Desktop | 1024–1439px | 12 | 48px | 24px |
| Wide | ≥ 1440px | 12, content max 1200px, centered | auto | 24px |

Color fields and photographs may bleed to the viewport edge on any breakpoint; text never does.

### 6.2 Spacing

A 4px base: 4, 8, 12, 16, 24, 32, 48, 64, 96, 128, 160.

| Rhythm | Desktop | Tablet | Phone |
|---|---|---|---|
| Section padding (top and bottom) | 128px (160px around the hero and the Re-dress) | 96px | 72px |
| Support section padding | 96px | 72px | 56px |
| Headline to lede | 24px | 20px | 16px |
| Lede to content | 56px | 48px | 32px |
| List item gap | 16px | 16px | 14px |

The home page alternates **open** sections (Chalk, generous, with imagery) and **support**
sections (Chalk Deep or Paper bands, tighter, text-only). The eye learns that the open ones are the
story and the tight ones are the reference.

### 6.3 Product layouts

| Layout | Spec |
|---|---|
| Desk shell | Fixed left sidebar 256px (the nameplate on top), content area max 1120px with 48px padding. Phone: top bar with nameplate and a menu button; the sidebar becomes a full-height sheet |
| Wide page | Tables and lists: full content width |
| Narrow page | Forms, setup, filing detail: 720px column; optional 320px right rail on ≥ 1280px |
| Client page | 680px column, centered on Paper; header full width; title band full width in `--house-wash` |
| The proof | 680px column; phone: full width with 20px margins |
| Auth pages | One 480px card (sign-up: 560px plus a preview panel) centered on Chalk |
| Docs | 240px left nav, 720px article, optional 360px right column for code on ≥ 1360px |

### 6.4 Shape and depth

| Token | Value | Use |
|---|---|---|
| radius-xs | 4px | Chip insides, the tag in UI |
| radius-s | 8px | Fields, buttons 40–48px, logo tiles |
| radius-m | 12px | Cards, notices |
| radius-l | 16px | The proof card, phone cards, big panels |
| radius-xl | 28px | Hero color field's open corner, section photographs |
| e0 | none | Most things |
| e1 | `0 0 0 1px #E3DFD7, 0 1px 2px rgba(27,31,36,.05)` | Cards |
| e2 | `0 8px 24px rgba(27,31,36,.08), 0 0 0 1px rgba(27,31,36,.04)` | Menus, the elevated middle step |
| e3 | `0 28px 64px rgba(16,24,22,.22)` | The proof floating on the hero field; phone cards in imagery |

Depth is used for one reason: to show what sits on top of what (the proof on the firm's color,
the client's phone in front of the desk). Never for decoration.

---
