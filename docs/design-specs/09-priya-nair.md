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
the branded pages its clients see, and the proof the firm signs off. The home page has about 330
words; the pictures have to do the selling, and I want every one of them to show a firm owner
*their own practice*, wearing their colors.

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
mark on the pages a firm's clients see is a small tag sewn in at the corner: "with CoFile".

The home page has about 330 words, so the pictures do the selling. In House Colors every picture
is a page from one firm's working life, Harbor & Pine CPA's, rendered in its colors: its filing
desk, its client page beside another firm's, a client's text turning into its draft, its proof,
its papers coming home. A firm owner scrolling the page is looking at their own practice a few
months from now, under their own name.

### How it brings out the copy

| The copy sells | House Colors shows it |
|---|---|
| **Say yes, under your own name.** "Your client needs an LLC. Say yes, under your own name." | The hero picture isn't CoFile's product; it is Harbor & Pine CPA's filing desk: its logo, its pine green, its typeface, its clients. CoFile is one line of slate type at the bottom. The owner sees a desk with a firm's name on it, and can picture their own |
| **Your brand on everything.** "Your name on the door. Ours in small type." "Your logo and color on every page your client sees." | The CoFile mark is an open frame (the firm's place) with a small tag pinned to its corner (us). In the Firms picture one client page dresses in two firms' brands, and only the small type stays the same |
| **Nobody retypes anything.** "Your client sends a text. Nobody retypes it." | The words of Ana Ortiz's text visibly travel into a drafted filing in the firm's colors, and the firm's saved answers fill in the rest |
| **You stay in charge.** "Nothing is filed or paid until you approve the proof." | The proof is the most finished object in the system: a white page with the firm's nameplate, one band of its color and the one button in its color. It feels like a partner signing off a return, calm and in control, with no locks or stop signs anywhere near it |
| **It's done, and the papers come back.** "Then it's filed, and the papers come back to you." | Motion on the site always ends with something arriving at the firm: the state's document and the IRS letter fly back and settle into the firm's record |
| **The filings your clients already ask for.** "The filings your clients already ask you for." | Four plain tiles, New York, New Jersey, Florida and the IRS, with each filing on a line and a small square telling you where it stands. Easy to read at a glance, with no maps or emblems |
| **Try it free.** "In beta: rehearse a filing, free." | Rehearsal gets the one color CoFile owns: **Iris**, a calm violet-blue, on the home page's only dark band, like a stage with the work lights on. Today the product shows rehearsals as yellow warnings; here a rehearsal is an invitation |
| **Simple prices.** "$45 a filing. EIN included with a formation." | Prices set large in graphite figures on a plain white strip, like a fee schedule on good letterhead. No badges, starbursts or strike-throughs |
| **People behind it.** "Built and run by filing professionals. When a filing needs a person, one of them takes over." | Small square portraits of the real filing professionals sit beside that line in the hero, photographed the way we photograph firm owners: at work, in daylight |

### Four rules the whole system follows

1. **CoFile has no brand color.** Graphite, chalk and paper are CoFile. Iris means "rehearsal" and
   nothing else. Every other hue on a page is a firm's, or a status.
2. **The firm leads wherever its client looks, and on its own desk.** Logo, name, color and font
   come first on the client's form, the client link pages, the emails, the filing desk and the
   proof the firm approves. CoFile is 12px of slate type at the far end: ours in small type.
3. **One band of color.** The cloth I grew up around in Kerala, kasavu, is a plain cream ground with
   a single border of gold, and it is the most elegant thing I know. Firm pages work the same way:
   a white ground, one confident band of the house color, and the house color on the one button
   that matters. Any color looks good used like this, even a difficult one.
4. **Real product, real people.** The seven pictures are the actual product, built from the same
   components as the filing desk and rendered live with sample data in a firm's colors. The
   photographs are documentary pictures of the people it serves and the filing professionals who
   run it. No abstract illustrations of "automation", no robots, no shields.

### What House Colors is not

It is not a security brand. There are no locks, vaults, shields, checkmark seals, stamps or "stop"
gestures anywhere in the identity, the hero or the motion. Security is one quiet line under the
prices and a calm page of its own; the checks live on How it works as a plain numbered list; the
rehearsal's last line is set in Iris, never in red. None of them borrows from the brand's signature
moments.

### The two signature ideas

- **The mark that wears your color.** The CoFile mark is an open frame with a tag. On the home page
  the frame fills with Harbor & Pine's pine as the hero's desk arrives, keeps the firm's color all
  the way down the page, and empties again at "Run one rehearsal. Then decide.", waiting for yours.
- **One page, two houses.** In "Your name on the door. Ours in small type." a single plain client
  page splits in two, and each copy dresses in its firm's brand, Harbor & Pine CPA's and Northgate
  Payroll's: color, logo, font, button. The only thing that doesn't change is the small "with
  CoFile" at the bottom of each, and a hairline draws between the two to say so. It is the most
  memorable moment on the site (section 9.2).

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

### 3.4 The "with CoFile" mark: ours in small type

The only sign of CoFile on a partner firm's pages. The home page calls it "Ours in small type"; For
firms says "The only sign of us is a small 'with CoFile'." This is that small type, designed once and
used everywhere.

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

The copy names two example firms. Harbor & Pine CPA carries the whole site; Northgate Payroll
stands beside it in the Firms picture. A brand-identity studio designs both as if they were real
practices, because firm owners will judge CoFile by how good these firms look.

**Harbor & Pine CPA**, a twelve-person CPA practice:

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

**Northgate Payroll**, a payroll firm, chosen to be Harbor & Pine's opposite:

- **Logo**: a wide geometric sans wordmark with a small symbol of two posts and a lintel, a gate
  that reads as an N. Wide class, about 3.4 : 1, so no name is set beside it.
- **Main color**: Ember `#C2410C` (white text at 5.2 : 1). No second color, so links use the
  derived ink.
- **Font on its pages**: Montserrat, also a preset.
- **Props**: an open-plan office with orange accents, for the For firms page.

Other demo firms exist only in the QA gallery (section 4.5).

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
| **Chalk Deep** | `#ECE9E2` | Quiet bands on the pages behind the home page, the beta bar, table header rows, the plinth under the Firms picture | — |
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

All text-on-tint pairs pass 5 : 1 or better. Marigold means "someone's turn", and on a firm's desk that is
most often the firm's own: a proof ready to approve. It is warm, not alarming.

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

| Firm | Main | Second | Font | Logo case it proves | Where it appears |
|---|---|---|---|---|---|
| **Harbor & Pine CPA** | Pine `#1F5C4B` | Brass `#8A5F14` | Lora | Mid logo, transparent | Every picture on the site |
| **Northgate Payroll** | Ember `#C2410C` | none (derived) | Montserrat | Wide wordmark, no name beside it | The Firms picture; For firms |
| QA firm A | Cobalt `#1F4FD1` | — | Inter | Wide sans wordmark | QA only |
| QA firm B | Teal `#0F766E` | — | Open Sans | JPEG on a dark box: becomes a tile | QA only |
| QA firm C | Slate `#334155` | Copper `#9A3412` | Source Serif | Square mark, name beside it | QA only |
| QA firm D | Purple `#7E22CE` | — | Uploaded display font | Uploaded font, headings only | QA only |
| QA firm E | Amber `#B45309` | — | Lato | Warm mid-tone; white text still passes (5.0 : 1) | QA only |

Pine and Ember are chosen to be far apart: green against orange, a serif against a geometric sans,
a mid logo against a wide one, a CPA practice against a payroll firm. If the system makes both look
like themselves on the same page, a visitor believes it will do the same for them. (Ember carries
white text at 5.2 : 1.)

The QA firms' main colors are five of the nine ready colors the Branding page already offers, so
we test what firms will actually pick on day one. They never appear on the public site, so they
need no names.

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
| display-1 | 72 / 76 | 56 / 60 | 40 / 44 | 500 | −0.02em | Hero headline, fluid: `clamp(40px, 5.6vw, 72px)` |
| display-2 | 44 / 50 | 38 / 44 | 32 / 38 | 500 | −0.015em | Home section headlines; page titles on the pages behind it |
| display-3 | 34 / 40 | 30 / 36 | 26 / 32 | 500 | −0.01em | Section headlines on the pages behind the home page |
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
- **Hero line break**: "Your client needs an LLC." / "Say yes, under your own name." One sentence
  per line on desktop and tablet (each sentence is a block-level span, not a change to the words);
  on phone, balanced wrapping and never a widow.
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
| Section padding (top and bottom) | 128px (160px around the hero and the Firms picture) | 96px | 72px |
| Quiet sections on the pages behind the home page | 96px | 72px | 56px |
| Headline to lede | 24px | 20px | 16px |
| Lede to content | 56px | 48px | 32px |
| List item gap | 16px | 16px | 14px |

The home page is nine short sections and eleven pictures (section 9). On desktop a section's text
takes six columns and its picture takes the other six and bleeds to the viewport edge. Sides
alternate (text left in Requests, After and Rehearsals; picture left in Firms and The proof) so the
eye zigzags down the page. The hero stacks its headline above a text-and-picture row. Coverage and
Pricing run full width, the Close is centered, and two full-bleed photographs sit between sections
as breathing room. On phone every section is text first, then its picture, full-bleed.

The pages behind the home page use a quieter rhythm: Chalk Deep or Paper bands, tighter padding,
more reading, and one picture or photograph per page section at most. The eye learns that the home
page is the story and the inner pages are the reference.

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

## 7. Art direction

### 7.1 Principles

1. **The pictures are the product.** Every product picture on the site is a live component: real
   HTML and CSS from the same library as the filing desk, rendered with sample data in a firm's
   house colors. Not screenshots, and not Figma drawings exported as images. Live pictures stay
   sharp at any zoom, reflow on a phone, follow dark mode, translate, and can never drift from the
   product. The text inside them is real text, hidden from screen readers (`aria-hidden`) with one
   description per picture `[copy needed: alt text for each picture]`.
2. **One firm tells the story.** Harbor & Pine CPA owns every picture. Its client is Two Sisters
   Bakery LLC (Ana and Lucia Ortiz). Its desk also shows Hudson Ledger LLC and Orchard Lane Inc., the
   stand-in's other sample clients. Northgate Payroll appears once, beside it. Repetition is the
   point: by the fifth picture a visitor knows this firm, and that's what their own clients will
   feel about theirs.
3. **Every picture sits on a house field.** A rounded panel behind each picture, either the full
   house color (the hero only), the 6% house wash (most pictures), Chalk Deep (Firms, where two
   houses share it) or Night (Rehearsals). The field says "this belongs to the firm" before you read
   a word.
4. **Every example keeps its label.** The stand-ins' captions stay verbatim ("Example · test details
   · not a real firm", "Sample proof · test details · not a real business" and so on), set as
   13px Slate captions under the field, never inside the product UI.
5. **Photographs are breathers, not decoration.** Two full-bleed photographs sit between home
   sections; one photograph plate sits inside the Requests picture. The pages behind the home page
   carry the rest of the shoot.

### 7.2 Product imagery: frames and objects

| Object | Spec |
|---|---|
| **Desk card** | The filing desk at real size (scaled 0.9 on desktop), radius 16, `e3` shadow, no browser chrome. A bare 4px house band on top and the sidebar's nameplate do the job a browser bar would |
| **Phone card** | A client page at 390 × 844 CSS px, scaled as needed, radius 36, a 1px Stone edge and `e3` shadow. No hardware, no notch, no buttons: we're showing the firm's page, not anybody's phone |
| **Message card** | A fragment of a generic conversation: incoming bubble in Chalk Deep `#ECE9E2`, radius 20 with a 6px tail corner, Graphite text at 17px, the sender line under it. Not modeled on any real messaging app's colors or shapes |
| **Paper** | Documents are Letter-ratio cards (8.5 : 11), radius 3 (paper has sharp corners), white, a 1px Stone edge and a soft `e2` shadow. They tilt a few degrees when fanned |
| **Document faces** | Redrawn and plainly generic: a title line, the business name or EIN in Mono, three to six grey text bars, a thin rule. **No seals, crests, emblems, letterhead logos, flags or signatures**, and nothing that imitates a state or IRS document's real layout |
| **Screen ghosts** | Stand-ins for the state's website screens: a pale header bar with no logo, two to four label and field bars, a button-shaped bar. Never a real state website screenshot on the marketing site (the proof in the product shows the real review page, which is its job) |
| **The state's review page, in the proof picture** | A screen ghost with real text in it ("Business Name", "Designator" and the values), framed as a picture inside the page: 1px Pebble edge, radius 6, an inner shadow of 1px |

Sample data rules: only the names and figures already in the copy and the stand-ins; Social
Security numbers, if ever shown, masked as the product masks them (`***-**-1234`); EINs shown as the
stand-in shows them (`EIN 00-0000000`); no real business, address, person or account.

### 7.3 Photography

**What I'd commission**: a documentary portrait photographer with small-business editorial work,
a producer, a casting director, a set and prop stylist (who also produces Harbor & Pine's door
vinyl, letterhead, folder and mug), a retoucher for screen work, and a digital tech on set so we
check skin tones and the pine green on a calibrated monitor while shooting.

**The look**: natural window light, early morning or late afternoon; 35mm and 50mm primes at f/2
to f/2.8; people mid-task, not posing at the lens; real places in Jersey City, Queens and Tampa,
not studios. The grade is warm-neutral and honest: no teal-and-orange, no heavy haze. Each frame
carries one touch of the house color in the scene (the door lettering, a pine-green mug, a pocket
folder) so the photographs belong to the same firm as the product pictures.

**Casting**: real sisters for Ana and Lucia Ortiz, in their thirties or forties. Real accountants,
aged 45 to 65, as Harbor & Pine's owner and staff. For Northgate, a younger payroll team. Real
CoFile filing professionals for the portraits (if we can't photograph the real people, we leave the
portraits out; we never use models or stock for them). Signed releases for everyone; no visible
signage of any real business.

**Shot list**

| # | Name | Scene | Framing and crops | Used on |
|---|---|---|---|---|
| P1 | **The door** | Harbor & Pine's glass office door, the firm's name and symbol in white vinyl with a pine stripe; through the glass, the softly lit office, one staff member at a desk. Morning light | Straight on, eye level, 50mm. 21:9 (desktop), 4:3 (phone) | Home interlude before Firms; For firms opening |
| P2 | **Ana's text** | Before opening, Ana at the bakery counter typing a message with her thumb, flour on her apron and hands; Lucia shaping loaves behind her, out of focus. The phone screen faces away from us | Three-quarter, waist up, 35mm. 4:5 and 16:9 | The Requests picture's photo plate; How it works requests section |
| P3 | **The sign-off** | Harbor & Pine's owner at her desk, reading glasses pushed up, reading the proof on a large monitor, a pen in her hand that she isn't using. Calm, in charge | Over the shoulder, 50mm; screen replaced in retouch with the live proof comp. 3:2 | How it works proof section; the proof email's marketing preview |
| P4 | **The desk at work** | Two Harbor & Pine staff at their monitors, one leaning over to point at the other's screen (the filing desk) | 35mm, a little above eye level. 16:9 | For firms "Your filing desk, in your brand." |
| P5 | **The papers, handed over** | The owner at the bakery's counter handing Ana a pine-green pocket folder; Ana opening it, smiling; Lucia wiping her hands to look. The documents are plain props with no seals | 35mm, both faces visible. 21:9 and 4:3 | Home interlude after "Then it's filed, and the papers come back to you."; How it works after section |
| P6 | **Northgate** | Northgate Payroll's open-plan office, orange chairs, a whiteboard with a payroll calendar (props, unreadable) | Wide, 35mm. 16:9 | For firms "Your name on the door. Ours in small type." |
| P7 | **The professionals** | CoFile's filing professionals at work: at a desk with two monitors, on a call, reading a printed form | Environmental portraits plus tight square crops of each face, 1:1 | The hero's portrait tiles; Questions "Is a person involved?"; sign-up |
| P8 | **A contractor's phone** | A contractor in his van, filling in his firm's branded form on his phone between jobs | 50mm through the open door. 4:5 | The service page and client-link marketing on For firms |
| P9 | **A first-time founder** | A young founder at a kitchen table at night, laptop open on the firm's branded form, a mug, a notebook | 35mm. 3:2 | For firms; sign-up alternate |
| P10 | **A printer's proof** | Flat lay on light oak: Harbor & Pine's letterhead and business-card proofs with crop marks, a loupe, and a laptop showing the filing proof | Overhead, 50mm. 4:5 | How it works "You see what the state will see, before the state does." |

**Screens in photographs**: replaced in retouch with renders of the live components at the right
perspective, never invented UI. If a screen can't be replaced cleanly, it faces away from the
camera.

### 7.4 Illustration

Very little, and only where the product needs a friendly picture: empty states and confirmations.
I'd commission an illustrator who works in simple geometric line, to draw twelve spot illustrations
on a 160px grid built from the mark's vocabulary: rounded rectangles at the frame's corner ratio,
small square tags, a 2px Graphite line, and one flat fill that is **always the house color**
(`currentColor` in SVG, so every firm's empty desk is drawn in its own color).

| # | Illustration | Where |
|---|---|---|
| I1 | A tidy desk with a single tag-shaped note on it | Filings, "Your desk is clear." |
| I2 | A link drawn as two joined frames | Client links, none sent yet |
| I3 | A signature line with a pen resting on it | Signatures, "No saved signatures yet." |
| I4 | A card, face down, resting on a tray | Ready to pay, "Nothing is waiting for a card right now." |
| I5 | A frame with its tag hanging loose | Link expired or can't be used |
| I6 | An empty frame, its tag fallen beside it | 404 |
| I7 | A frame slightly askew | Something went wrong |
| I8 | An envelope whose flap is a frame | Check your email |
| I9 | A frame filled with the house color, tag in place | "You're set up" |
| I10 | A message bubble resolving into a frame | A request arrived by text or email |
| I11 | Two sheets of paper settling into a frame | Documents back |
| I12 | Three stacked screen ghosts with a dashed Iris outline | Rehearsal finished |

No people in illustrations (photographs handle people), no checkmarks, no locks.

### 7.5 Iconography

A custom set of about 40 icons on a 24px grid: 1.75px stroke, round joins and caps, corners at
radius 2, the frame's proportions wherever a rectangle appears. Two sizes, 20 and 24. Filled
variants only where a selected state needs them (sidebar navigation), and the fill is a solid
tag-like square inside the outline.

Set: filings, new filing, ready to pay (a card), client links, signatures (a pen nib), setup
(sliders), billing (a receipt), requests (a message), email, text message, chat (generic, for
WhatsApp and Slack, which are named in words and never shown as their logos), documents, EIN (a page
with a number line), state, rehearsal (a dashed circle), live (a filled circle), firms, team, API
keys (a plain key), webhooks, docs, external link, copy, download, upload, search, menu, close,
chevrons, arrows, info, someone's turn, problem, done, sign out.

Not in the set: padlocks, shields, vaults, seals, stamps, stop signs.

### 7.6 3D

None on the site. The product is the hero object, and live UI is sharper, lighter and more honest
than any render of it. Rendered folders, safes and floating documents are exactly the clichés this
brand avoids. If we later make a short brand film, a motion studio can extrude the live UI layers
for it, but nothing 3D ships on cofile.app.

### 7.7 Texture

One texture: a 2% monochrome grain (a 256px blue-noise tile, multiplied) on large house fields and
on the Night band, to stop color banding on big flat panels and to give the hero's pine a little
depth, like dyed card stock. Nothing else: no paper texture, no linen, no shadows pretending to
be paper.

### 7.8 What no picture ever shows

Government seals, eagles, flags, capitol domes, the IRS name styled as a logo, any official mark;
real state website screenshots on the marketing site; padlocks, shields, vault doors; handshakes,
robots, piles of paper, red tape; anxious faces; any real messaging app's branding.

---

## 8. Motion

### 8.1 Principles

- **Motion lives in the pictures, never in the words.** Headlines, ledes and buttons never move,
  except for the buttons' own hover and press.
- **Each picture plays once**, when 50% of it scrolls into view, then rests in its final state. It
  plays again only if it leaves the viewport completely and comes back after 30 seconds or more.
- **Everything moves toward the firm.** Things arrive, fill, dress and settle. Nothing leaves,
  closes or stops in a way that asks for attention.
- **Short.** No single picture's sequence runs past 2.4 seconds. No loops.
- **Transform, opacity and color only**, so it all runs at 60fps on a three-year-old phone.

### 8.2 Tokens

| Token | Value | Use |
|---|---|---|
| `--ease-settle` | `cubic-bezier(0.2, 0, 0, 1)` | Arrivals, fills, most motion |
| `--ease-swap` | `cubic-bezier(0.65, 0, 0.35, 1)` | Cross-fades between two states (fonts, logos) |
| `--ease-exit` | `cubic-bezier(0.4, 0, 1, 1)` | The rare departure (menus closing) |
| `--t-press` | 80ms | Button press |
| `--t-quick` | 160ms | Hover, focus, chip changes |
| `--t-base` | 240ms | UI state changes in the product |
| `--t-story` | 480ms | One beat of a picture |
| `--t-long` | 720ms | The hero field and the Close frame |
| Stagger | 60–150ms | Rows, tags, documents |

### 8.3 The moments

| Where | The moment | What it sells |
|---|---|---|
| Header, whole page | **The mark wears your color.** The header mark's frame fills with Pine as the hero arrives (400ms), keeps it down the page, and drains back to an open frame when the Close enters (480ms) | The firm's color goes in CoFile's frame; at the end, the frame waits for yours |
| Hero | **The desk arrives.** Pine field wipes in from the right; the desk card rises; its rows enter one by one; the first row, the proof ready to approve, gets its house bar last | Say yes, under your own name: this is a firm's own desk, with work on it |
| Firms | **One page, two houses** (the signature). One plain page splits in two; each copy dresses in its firm's brand; the two "with CoFile" lines never change, and a hairline joins them | Your name on the door. Ours in small type |
| Requests | **The text reads in.** The bubble arrives; three phrases light up; each travels along a line into a field of the draft; saved answers fill the rest | Nobody retypes it |
| The proof | **The sign-off.** A reader's eye goes down the page (numbered tags 1 to 4 light in turn); the Approve button presses; the fee line slides out underneath | You stay in charge, calmly |
| After | **Homecoming.** The stage track fills; the state's document and the IRS letter fly in from the right and settle into the record | The papers come back to you |
| Coverage | **The tags fill.** Each filing's small status square fills in sequence | The filings your clients already ask for, and where each stands |
| Rehearsals | **The run-through.** A thin Iris line runs down the log; screen ghosts turn like pages; the last line glows softly in Iris | A free rehearsal on the real website, start to finish |
| Close | **The empty frame.** A large open frame draws itself, tag last | Run one rehearsal, then put your name in it |
| Desk: Branding setup | **Live dressing.** The preview re-dresses as the firm picks a color, uploads a logo or changes the font (240ms color, 160ms font cross-fade) | It's their brand, instantly |
| Desk: new rows | A new filing slides into the list from above (240ms) with a house-wash flash that fades over 1.2s | Something arrived for you |
| Desk: documents back | On the filing page, newly arrived documents settle in with the homecoming motion, shortened to 360ms | The papers come back |
| The proof: approving | The button's fill sweeps a lighter house tint (240ms), then the page cross-fades to the decision page with the nameplate held perfectly still | The firm stays constant; only the outcome changes |

Every sequence is specified beat by beat with its picture in section 9.

### 8.4 Reduced motion

With `prefers-reduced-motion: reduce`, every picture renders in its final state, the header mark
stays open on every page, and cross-fades become instant swaps. "One page, two houses" simply
shows the two finished pages side by side, which is also the picture's static design. Nothing is
lost but the moving.

### 8.5 Build notes

CSS transitions and the Web Animations API, triggered by IntersectionObserver; no animation
library is needed, and no Lottie or video for UI (it would freeze the text into pictures). House
colors animate through registered custom properties (`@property --house { syntax: '<color>' }`) so
the color transitions are real color interpolations. Font swaps cross-fade two stacked text
layers, because font-family can't interpolate.

---

## 9. The home page, section by section

### 9.0 The page at a glance

Nine sections, in the locked order, and eleven pictures. Seven are the stand-ins designed in full,
two are new photographic interludes between sections, one is the price strip and one is the empty
frame at the close. Every picture is Harbor & Pine CPA's, except Northgate's half of the Firms
picture.

```
 Beta banner ─ Header (mark wears Pine from here down)
 1  Hero ............ headline across; text left │ P1 picture: H&P's filing desk on a full Pine field
    Interlude ....... full-bleed photograph: Harbor & Pine's door                       (new)
 2  Firms ........... P2 picture: one page, two houses │ text right        ← the signature moment
 3  Requests ........ text left │ P3 picture: Ana's photo, her text, the drafted filing
 4  The proof ....... P4 picture: H&P's proof for Two Sisters Bakery LLC │ text right
 5  After ........... text left │ P5 picture: the record, the certificate, the IRS letter
    Interlude ....... full-bleed photograph: the papers handed to Ana at the bakery     (new)
 6  Coverage ........ full width: P6 picture, four state tiles
 7  Rehearsals ...... dark band: text left │ P7 picture: the run sheet and the screen ghosts
 8  Pricing ......... full width: the price strip, then the security line
 9  Close ........... centered: the empty frame (mark drains here), headline, button
 Footer (Graphite)
```

Grounds, top to bottom: Chalk, photograph, Chalk, Chalk, Chalk, Chalk, photograph, Chalk Deep,
Night, Paper, Chalk, Graphite. The page darkens once, at the rehearsal, and ends dark at the footer.

Throughout the text columns, the stand-ins' green ticks become **8px Graphite tags** (radius 2),
centered on the first line's x-height: CoFile's voice gets CoFile's small square, and color stays
in the pictures. The "For firms" and "How it works" links are 18px Medium Graphite with a 1px
underline and a 16px arrow icon that moves 3px right on hover (160ms).

### 9.0.1 Beta banner

Kept on the home page and the pages behind it, as the copy has it: "**Beta** CoFile is in beta. Any
filing can run as a free rehearsal on the state's real website. It stops before the last button,
so nothing is filed or paid. Filing types go live one at a time. Questions or problems?
hello@cofile.app"

- A 40px bar (auto height on phone) on Chalk Deep, 14/20 Graphite text, centered within the
  content width.
- "Beta" is a pill: 1px Iris outline, Iris text, 12/16 Medium, radius 10, 2px × 8px padding. It's
  the first Iris on the page, quietly teaching that Iris means rehearsal.
- The email is an underlined link. No close button (the product has none).
- Phone: the pill sits on its own line above the text, left-aligned, 16px padding.

### 9.0.2 Header

| | Desktop | Phone |
|---|---|---|
| Height | 72px; 60px with a Stone hairline once scrolled | 60px |
| Left | Mark and wordmark (cap height 17px), linking home | Mark and wordmark (cap height 15px) |
| Middle | "How it works", "For firms", "What we file", "Pricing", "For platforms": 16px Medium Graphite, 32px apart; current page marked by a 2px Graphite underline 6px below the baseline | Hidden |
| Right | "Log in" (quiet button) and "Run a free rehearsal" (primary, 44px tall) | "Log in" (quiet) and a menu button (`[copy needed: menu button label for screen readers]`) |
| Behavior | Sticky. Hides on scroll down after the hero, returns on scroll up | Same. The menu opens a full-height Paper sheet listing the five pages at 22px with 56px rows, then both buttons full width |

Below 1180px, or when the nav doesn't fit (Spanish), the middle nav folds into the menu button.

**The mark wears Pine.** On the home page the header mark starts Open. When the hero's Pine field
arrives, the frame fills with Pine `#1F5C4B` (480ms, `--ease-settle`), and it stays Pine while the
page shows Harbor & Pine's work. When the Close section is 50% in view it drains back to Open
(480ms). On every other page the mark is Open.

**Phone sticky button**: once the hero's "Run a free rehearsal" scrolls out of view, a 72px Paper bar
with a Stone top hairline slides up from the bottom (240ms) holding the same button, full width,
56px tall. It slides away when the Close's button is in view, or on scroll up while the header is
showing.

### 9.1 Hero

**Copy, placed**

- Kicker: "For CPA, payroll, fractional CFO and title firms"
- Headline: "Your client needs an LLC. Say yes, under your own name."
- Sub: "CoFile files your clients' formations, EINs and payroll registrations on the official state
  and IRS websites, once you approve."
- Buttons: "Run a free rehearsal" (primary) and "See pricing" (secondary)
- Note: "Built and run by filing professionals. When a filing needs a person, one of them takes over."

**Layout.** The headline gets the whole width: it's one confident sentence of advice, and at 72px it
needs the room. Below it, a six-and-six row: the sub, buttons and note on the left; the picture on
the right, on a Pine field that runs to the viewport's right edge.

```
Desktop (1440)
┌───────────────────────────────────────────────────────────────────────────────────────────┐
│ ▪ For CPA, payroll, fractional CFO and title firms                        (kicker 16 Med)  │
│                                                                                           │
│ Your client needs an LLC.                                               (display-1, 72/76) │
│ Say yes, under your own name.                                                              │
│                                                                                           │
│ CoFile files your clients'          ┌─────────────────── Pine #1F5C4B field ──────────────┤
│ formations, EINs and payroll        │      ┌──▬▬▬▬▬▬▬▬▬▬▬▬▬▬ pine band ▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬──┐  │
│ registrations on the official       │      │ [H&P] Harbor &   │ Client filings  [New filing]│
│ state and IRS websites, once you    │      │       Pine CPA   │                             │
│ approve.              (lede 21/33)  │      │ Filing desk      │▌Two Sisters Bakery LLC      │
│                                     │      │                  │▌New Jersey LLC formation    │
│ [Run a free rehearsal] [See pricing]│      │ ▸ Filings        │▌      (Proof ready to approve)│
│        (56px)             (56px)    │      │   New filing     │ Hudson Ledger LLC   (Filed) │
│                                     │      │   Ready to pay   │ New York LLC formation      │
│ ▣ ▣ ▣  Built and run by filing      │      │   Client links   │ Hudson Ledger LLC           │
│        professionals. When a filing │      │   Signatures     │ EIN (Filed, IRS letter saved)│
│        needs a person, one of them  │      │   Setup          │ Orchard Lane Inc.           │
│        takes over.  (16/24 Slate)   │      │   Billing        │ Payroll registration (NJ-REG)│
│                                     │      │ ▪ with CoFile    │               (Submitted)   │
│                                     │      └──────────────────┴─────────────────────────────┘
│                                     └──────────────────────────────────────────────────────┤
│                                        Example · test details · not a real firm   (caption) │
└───────────────────────────────────────────────────────────────────────────────────────────┘
```

```
Phone (390)
┌──────────────────────────────┐
│ ▪ For CPA, payroll,          │
│   fractional CFO and title   │
│   firms                      │
│                              │
│ Your client needs            │  40/44, balanced
│ an LLC. Say yes,             │
│ under your own name.         │
│                              │
│ CoFile files your clients'   │  17/27
│ formations, EINs and …       │
│                              │
│ [   Run a free rehearsal   ] │  56, full width
│ [        See pricing       ] │  56, full width
│                              │
│ ▣▣▣ Built and run by filing  │
│     professionals. When a …  │
├──────────────────────────────┤
│▓▓▓▓▓▓▓▓ Pine field ▓▓▓▓▓▓▓▓▓▓│  full bleed, 600px
│▓ ┌─▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬─┐ ▓│
│▓ │ [H&P] Harbor & Pine  ≡ │ ▓│  the desk's own phone layout,
│▓ │ Client filings [New]   │ ▓│  1:1 at 335px wide
│▓ │▌Two Sisters Bakery LLC │ ▓│
│▓ │▌New Jersey LLC formation│▓│
│▓ │▌(Proof ready to approve)│▓│
│▓ │ Hudson Ledger LLC      │ ▓│
│▓ │ (Filed)                │ ▓│
│▓ │ …                      │ ▓│
│▓ │ ▪ with CoFile          │ ▓│
│▓ └────────────────────────┘ ▓│
├──────────────────────────────┤
│ Example · test details ·     │
│ not a real firm              │
└──────────────────────────────┘
```

**Type and details.** Kicker 16/22 Medium Slate, preceded by an 8px Graphite tag. Headline
display-1, Graphite, each sentence its own line from tablet up. Sub as lede, max 520px. Buttons
56px: primary Graphite with white label, secondary 1.5px Graphite outline. The note is 16/24 Slate
beside three 40px square portraits of the real filing professionals (P7 crops, radius 10, 4px
apart, a 2px Chalk ring so they overlap by 8px), `[copy needed: alt text naming the people]`. If we
can't photograph the real people, the note stands alone.

**Picture P1: Harbor & Pine's filing desk** (designs `DeskVisual`)

*What it shows.* The firm's own desk, on an ordinary morning: four of its clients' filings, one
waiting for the firm. The stand-in's content, all of it: the nameplate "H&P" and "Harbor & Pine
CPA", the label "Filing desk", the heading "Client filings" with the "New filing" button, and the
four rows:

| Client | Filing | Where it stands | Tone |
|---|---|---|---|
| Two Sisters Bakery LLC | New Jersey LLC formation | Proof ready to approve | Marigold (someone's turn), row highlighted |
| Hudson Ledger LLC | New York LLC formation | Filed | Leaf |
| Hudson Ledger LLC | EIN | Filed, IRS letter saved | Leaf |
| Orchard Lane Inc. | Payroll registration (NJ-REG) | Submitted | Slate |

Then "with CoFile" and the caption "Example · test details · not a real firm".

*Composition.* The Pine field is 640px tall, radius 28 on its left corners only, bleeding off the
right edge, with the 2% grain. Cropped off its top-right, the Harbor & Pine symbol at 720px,
tone-on-tone (Pine lifted 6% in OKLCH lightness), like a watermark in dyed card. The desk card is
620 × 500px (the product at 0.9 scale), set 56px in from the field's left edge and 64px down, with
`e3` shadow. Its left 48px hangs over the Chalk, so the desk straddles CoFile's ground and the
firm's color: CoFile underneath, the firm on top.

*The desk card, designed in full* (this is the real desk shell from section 10.9, at 0.9):

- A 4px Pine band across the top.
- Sidebar, 176px wide, Chalk ground: the nameplate (the H&P mid logo at 36px with "Harbor & Pine
  CPA" set in Lora 600 15px beside it; "Filing desk" under it in 12px Slate); then the nav from the
  product (Filings, New filing, Ready to pay, Client links, Signatures, Setup, Billing) at 14px,
  32px rows, Filings selected with a 3px Pine bar and a Pine-wash fill; "with CoFile" at the foot.
- Main area, Paper ground, 24px padding: "Client filings" in Lora 600 22px, and the "New filing"
  button at the right, Pine fill, white label, 36px tall, label in Lora 600 (a preset, so the
  firm's font is allowed on buttons).
- Rows 64px tall, a Stone hairline between them. Client name 15px Medium Graphite; filing type
  13px Slate under it; the status chip right-aligned.
- The Two Sisters row is the firm's turn: a 3px Pine bar on its left edge and a 6% Pine wash
  behind it. This is the only use of house color in the list: it marks what the firm needs to do
  next, in the firm's own color.

*States.* Light as above. Dark: the field stays Pine (it's the firm's), the desk card switches to
the desk's dark theme (Graphite 2 ground, Graphite 3 sidebar), and the logo sits on its white
plinth. Phone: the desk's own phone layout at 1:1 (top bar with nameplate and menu icon, rows as
stacked cards with the chip on its own line). Spanish: rows wrap to two lines; the chip moves under
the filing type.

*Motion: "The desk arrives"* (on load, total ≈ 1.5s)

| t | Beat |
|---|---|
| 0ms | The Pine field wipes in from the right edge (clip-path inset, 720ms, settle). The header mark fills with Pine (480ms) |
| 200ms | The desk card rises 24px and fades in (480ms) |
| 520ms | The four rows enter, 80ms apart: 8px slide up, fade, 240ms each |
| 1000ms | The Two Sisters row's Pine bar grows from top to bottom (240ms), then its wash fades in (320ms) |
| 1500ms | Rest. Nothing on the card is clickable; the cursor stays an arrow |

Reduced motion: the final frame, the header mark Open.

### 9.1.1 Interlude: the door (new picture)

Between the hero and "Your name on the door. Ours in small type.", a full-bleed photograph: **P1,
Harbor & Pine's glass door**, the firm's name in white vinyl with a pine stripe, the office softly
lit behind the glass. 21:9 at 600px tall on desktop (`object-position: 50% 45%`), 4:3 on phone.
No text over it. `[copy needed: alt text]`.

It sets up the next headline without a word: you see a firm's name on a door, then you read "Your
name on the door." On scroll the photograph drifts 32px slower than the page (a gentle parallax,
desktop only, off with reduced motion).

### 9.2 Firms: one page, two houses

**Copy, placed** (text column on the right, picture on the left)

- "Your name on the door. Ours in small type."
- "Your logo and color on every page your client sees."
- Ticks: "A link for each client" · "A page for every filing you offer" · "A button for your own
  website" · "Your registered agent, or ours"
- Link: "For firms"

**Picture P2: the same client page under two firms** (designs `TwoFirmsVisual`). The signature
picture of the site.

*What it shows.* Two phone cards side by side: the same client page, "Start your New Jersey LLC",
with the fields "Business name" and "Who owns it", the button "Continue" and "with CoFile" at the
foot. One belongs to Harbor & Pine CPA, the other to Northgate Payroll. Caption: "Two example firms
· same page, each in its own brand".

| | Harbor & Pine CPA | Northgate Payroll |
|---|---|---|
| Band | 4px Pine `#1F5C4B` | 4px Ember `#C2410C` |
| Nameplate | Mid logo at 40px with "Harbor & Pine CPA" in Lora 600 beside it | Wide wordmark at 36px, no name beside it |
| Title band | 6% Pine wash | 6% Ember wash |
| "Start your New Jersey LLC" | Lora 600, 26px | Montserrat 600, 24px (Montserrat runs wider) |
| Fields | CoFile Sans labels and inputs, identical on both; focus ring in each house's ink | |
| "Continue" | Pine fill, white label in Lora 600 | Ember fill, white label in Montserrat 600 |
| "with CoFile" | Slate, 12px, CoFile Sans, the same pixel position on both | |

*Composition.* A Chalk Deep plinth, radius 28, 620 × 600px, bleeding off the left edge. The two
phone cards are 260px wide (the client page at 0.67 scale), 40px apart, standing on the plinth's
lower third with `e3` shadows. Under each card's "with CoFile" a 1px Graphite hairline runs from one
mark to the other, with 4px end ticks: a caliper saying "these are the same". No words on it.

```
Desktop (picture left, text right)
┌──────────────── Chalk Deep plinth ───────────────┐
│   ┌─▬▬▬▬ pine ▬▬▬▬─┐      ┌─▬▬▬ ember ▬▬▬▬─┐      │    Your name on the door.
│   │ [H&P] Harbor &  │      │ [NORTHGATE ⊓ ] │      │    Ours in small type.
│   │       Pine CPA  │      │                │      │
│   │░░░░░░░░░░░░░░░░░│      │░░░░░░░░░░░░░░░░│      │    Your logo and color on every
│   │ Start your New  │      │ Start your New │      │    page your client sees.
│   │ Jersey LLC      │      │ Jersey LLC     │      │
│   │ Business name   │      │ Business name  │      │    ▪ A link for each client
│   │ [_____________] │      │ [____________] │      │    ▪ A page for every filing you offer
│   │ Who owns it     │      │ Who owns it    │      │    ▪ A button for your own website
│   │ [_____________] │      │ [____________] │      │    ▪ Your registered agent, or ours
│   │ [   Continue  ] │      │ [  Continue  ] │      │
│   │ ▪ with CoFile   │      │ ▪ with CoFile  │      │    For firms →
│   └────────┬────────┘      └───────┬────────┘      │
│            ├───────────────────────┤               │
└──────────────────────────────────────────────────┘
   Two example firms · same page, each in its own brand
```

```
Phone (text first, then the picture)
┌──────────────────────────────┐
│ Your name on the door.       │
│ Ours in small type.          │
│ Your logo and color on …     │
│ ▪ A link for each client     │
│ ▪ …                          │
│ For firms →                  │
├──────── Chalk Deep ──────────┤
│ ┌─pine──────┐ ┌─ember─────┐  │  two cards, 164px each (0.42),
│ │[H&P] H&P  │ │[NORTHGATE]│  │  12px apart
│ │Start your │ │Start your │  │
│ │New Jersey │ │New Jersey │  │
│ │LLC        │ │LLC        │  │
│ │[_______]  │ │[_______]  │  │
│ │[Continue] │ │[Continue] │  │
│ │▪ with …   │ │▪ with …   │  │
│ └─────┬─────┘ └─────┬─────┘  │
│       ├─────────────┤        │
└──────────────────────────────┘
 Two example firms · same page,
 each in its own brand
```

At phone scale the small text is too small to read, and that's fine: what has to be read at a
glance is two colors, two logos, two typefaces, one identical small line. Tapping either card
opens it full size in a sheet `[copy needed: close label for the sheet]`.

*Motion: "One page, two houses"* (when 50% in view, ≈ 2.0s)

| t | Beat |
|---|---|
| 0ms | A single undressed page sits centered on the plinth: grey band, no logo, title in CoFile Sans, a Graphite "Continue", and "with CoFile" at the foot. It is the page before any firm owns it |
| 200ms | It duplicates; the two copies slide apart to their places (480ms, settle) |
| 700ms | Harbor & Pine dresses: band fills left to right in Pine (360ms); logo and name fade in with a 4px rise (240ms); the title cross-fades from CoFile Sans to Lora (200ms); the title band washes Pine (240ms); "Continue" fills Pine (300ms) |
| 850ms | Northgate dresses the same way in Ember and Montserrat, 150ms behind |
| 1600ms | Neither "with CoFile" has moved. The caliper hairline draws from left mark to right mark (360ms), and both marks take one soft 1px underline pulse (240ms) |
| 2000ms | Rest |

Hover (desktop): a card lifts 4px (160ms). Reduced motion: the finished pair.

---

### 9.3 Requests: the text reads in

**Copy, placed** (text left, picture right)

- "Your client sends a text. Nobody retypes it."
- "Forward the text, email, WhatsApp or Slack message. AI drafts the filing, your saved answers
  fill in the rest, and your team checks it."

**Picture P3: a client's text becoming a drafted New Jersey LLC formation** (designs
`TextToFormVisual`)

*What it shows.* Three things joined by lines: Ana in her bakery (photograph P2), her message, and
the draft on Harbor & Pine's desk. The stand-in's content, all of it:

- The bubble: "Need an LLC for the bakery. It's me and my sister, 50/50, in Jersey City." with
  "Ana Ortiz · text message · example" under it.
- The draft card: "Draft: New Jersey LLC formation" and the chip "For your team to check".
- Rows: "Business name" TWO SISTERS BAKERY LLC · "Members" Ana Ortiz, Lucia Ortiz (50/50) · "City"
  Jersey City, NJ, each tagged "from the text"; "Registered agent" Your saved agent · "Organizer
  and signer" Your saved answers, each tagged "already filled".

*Composition* (picture area 700 × 560px):

- **Photo plate**, top left: P2 at 4:5, 280 × 350px, radius 20.
- **Message card**, overlapping the photo's lower right by 40px: 330px wide, Paper, radius 20,
  `e2`. The bubble inside it in Chalk Deep, 17/26 Graphite. Three phrases carry a Pine-tint
  highlighter (`--house-tint`, 2px rounded ends): "the bakery", "me and my sister, 50/50", "Jersey
  City".
- **Draft card**, right side, 400px wide, top at 72px: the desk's card style with a 4px Pine band
  and a 20px H&P monogram tile beside the title (15px Medium). The chip is the neutral Slate chip.
  Rows 48px: label 13px Slate on the left, value in CoFile Mono 14px, and a source tag on the right:
  - "from the text": a Pine-tint pill with a tiny speech-bubble icon, house-ink text, 12px.
  - "already filled": a neutral pill with a tiny Graphite tag icon (the firm's saved answers are
    marked with CoFile's square, because they come from the desk's memory).
- **Connectors**: three 1.5px lines in `--house-ink` from each highlighted phrase to the start of
  its row, drawn as soft S-curves with 12px radius bends, ending in a 4px dot. The stand-in's down
  arrow becomes these lines.

```
Desktop
 Your client sends a text.             ┌────────────┐
 Nobody retypes it.                    │ P2 photo   │      ┌─▬▬▬▬▬▬▬▬ pine ▬▬▬▬▬▬▬▬─┐
                                       │ Ana at the │      │ [HP] Draft: New Jersey  │
 Forward the text, email, WhatsApp     │ counter    │      │ LLC formation           │
 or Slack message. AI drafts the       │            │  ╭──▶│ Business name  TWO SIST…│ from the text
 filing, your saved answers fill in    │            │  │╭─▶│ Members  Ana Ortiz, Lu…│ from the text
 the rest, and your team checks it.    └─────┬──────┘  ││╭▶│ City  Jersey City, NJ   │ from the text
                                        ┌────┴─────────┼┼┼┐ │ Registered agent  Your… │ already filled
                                        │ Need an LLC for ‹the bakery›. It's     │ Organizer and signer … │ already filled
                                        │ ‹me and my sister, 50/50›, in          │ (For your team to check)
                                        │ ‹Jersey City›.                         └─────────────────────────┘
                                        └─────────────────────────┘
                                         Ana Ortiz · text message · example
```

```
Phone
┌──────────────────────────────┐
│ Your client sends a text.    │
│ Nobody retypes it.           │
│ Forward the text, email, …   │
├──────────────────────────────┤
│ [ P2 photo, 16:9, full bleed]│
│   ┌──────────────────────┐   │  message card overlaps the photo's
│   │ Need an LLC for ‹the │   │  bottom edge by 48px
│   │ bakery›. It's ‹me and│   │
│   │ my sister, 50/50›, in│   │
│   │ ‹Jersey City›.       │   │
│   └──────────┬───────────┘   │
│ Ana Ortiz · text message ·   │
│ example      │               │  one vertical connector
│ ┌─▬▬▬▬▬▬▬▬▬▬▬▼▬▬▬▬▬▬▬▬▬▬▬▬─┐ │
│ │ Draft: New Jersey LLC    │ │
│ │ (For your team to check) │ │
│ │ Business name            │ │  label above value on phone;
│ │ TWO SISTERS BAKERY LLC   │ │  source tag under the value
│ │ [from the text]          │ │
│ │ …                        │ │
│ └──────────────────────────┘ │
└──────────────────────────────┘
```

*Motion: "The text reads in"* (≈ 2.2s)

| t | Beat |
|---|---|
| 0ms | Message card fades in with three typing dots (480ms) |
| 480ms | The dots become the bubble (scale 0.96 to 1, 200ms) |
| 800ms | "the bakery" highlights (220ms); its connector draws (360ms); the Business name value lands with a 4px slide from the left and its "from the text" pill appears |
| 1050ms | Same for "me and my sister, 50/50" and Members |
| 1300ms | Same for "Jersey City" and City |
| 1750ms | Registered agent and Organizer and signer fill together (fade, 240ms) with their "already filled" pills |
| 2000ms | The "For your team to check" chip appears (160ms). Rest |

Values land; they are never typed out letter by letter. The whole point is that nobody types.

### 9.4 The proof: the sign-off

**Copy, placed** (picture left, text right)

- "Nothing is filed or paid until you approve the proof."
- "One page: every detail, every fee."
- Ticks: "The state's own review page, where possible" · "Every fee checked again before paying" ·
  "Any later change comes back for approval"
- Link: "How it works"

**Picture P4: a sample proof for Two Sisters Bakery LLC** (designs `ProofVisual`)

*What it shows.* The page Harbor & Pine approves, exactly as the firm gets it on its desk and by
email, with the stand-in's content: "Harbor & Pine CPA" and "example firm"; "Two Sisters Bakery
LLC" with the chip "Ready to approve"; four numbered blocks (the details, the fees, "New Jersey's
own review page, filled in", and "Approve for filing"); under the page, "New Jersey payment screen",
$103.50 and "Matches the proof"; and the caption "Sample proof · test details · not a real
business".

*Composition.* A Pine-wash panel (6%), radius 28, bleeding off the left edge, 640px tall. On it,
the proof page: 500px wide, Paper, radius 16, `e3`. This is the product's proof component
(section 10.22) at real size, trimmed to these blocks:

| Block | Design |
|---|---|
| Top | 4px Pine band. Nameplate: H&P logo at 36px, "Harbor & Pine CPA" Lora 600 17px, "example firm" 12px Slate under it; "with CoFile" at the right end |
| Title | "Two Sisters Bakery LLC" in Lora 600 28/34; the chip "Ready to approve" (Marigold, someone's turn) on the same line, or below it if it doesn't fit |
| 1 · Details | Label column 150px, 14px Medium Slate; values in CoFile Mono 15px Graphite: TWO SISTERS BAKERY LLC, Ana Ortiz, Lucia Ortiz (50/50), 88 Grove St, Jersey City NJ 07302. The business name and address carry the Pine-tint highlighter, as the stand-in marks them |
| 2 · Fees | "Formation filing fee" $100.00, "NJ portal fee, by card" $3.50; a 1.5px Graphite rule; "Total to the state" $103.50 in 600. Tabular figures, right-aligned |
| 3 · The state's page | "New Jersey's own review page, filled in" as a 12px Slate caption, over a screen ghost framed as a picture (1px Pebble, radius 6): a pale header bar with no logo, then "Business Name" TWO SISTERS BAKERY and "Designator" LLC in a plain sans and Mono |
| 4 · Approve | "Approve for filing": full-width Pine button, 52px, white label in Lora 600 17px |

The numbered markers sit in the page's left margin, 18px outside the text: 20px Pine tags (radius
5) with white numerals in 12px Medium. They are the tag motif in the firm's color: the firm's
reading order through its own page.

Under the page, 16px below, the **fee line**: a 500px Paper strip, radius 12, `e1`, 48px tall:
"New Jersey payment screen" in 14px Slate, $103.50 in Mono, and the Leaf chip "Matches the
proof". It is visually a footnote to the page, small and quiet.

```
Desktop (picture left, text right)
┌──────────── 6% Pine wash ──────────────┐
│    ┌─▬▬▬▬▬▬▬▬▬▬▬▬ pine ▬▬▬▬▬▬▬▬▬▬▬▬─┐   │    Nothing is filed or paid
│    │ [H&P] Harbor & Pine CPA  ▪ with CoFile   until you approve the proof.
│    │       example firm            │   │
│    │ Two Sisters Bakery LLC        │   │    One page: every detail, every fee.
│    │            (Ready to approve) │   │
│  1▪│ Business name  TWO SISTERS…   │   │    ▪ The state's own review page,
│    │ Members        Ana Ortiz, …   │   │      where possible
│    │ Main business  88 Grove St, … │   │    ▪ Every fee checked again before
│  2▪│ Formation filing fee  $100.00 │   │      paying
│    │ NJ portal fee, by card  $3.50 │   │    ▪ Any later change comes back for
│    │ ───────────────────────────── │   │      approval
│    │ Total to the state    $103.50 │   │
│  3▪│ New Jersey's own review page, │   │    How it works →
│    │ filled in                     │   │
│    │ ┌───────────────────────────┐ │   │
│    │ │ Business Name  TWO SISTERS│ │   │
│    │ │ Designator     LLC        │ │   │
│    │ └───────────────────────────┘ │   │
│  4▪│ [     Approve for filing     ]│   │
│    └───────────────────────────────┘   │
│    [New Jersey payment screen  $103.50  (Matches the proof)]
└────────────────────────────────────────┘
   Sample proof · test details · not a real business
```

Phone: text first; then the wash panel full bleed with the page at 350px (1:1 with the product's
phone proof); markers move inside the page's left padding; the fee line follows under it.

*Motion: "The sign-off"* (≈ 1.9s)

| t | Beat |
|---|---|
| 0ms | The page rises 16px and fades in (480ms) |
| 400ms | Marker 1 appears (scale 0.6 to 1, 160ms) and its block takes a passing Pine wash (fades in 120ms, out 360ms) |
| 650ms / 900ms / 1150ms | Markers 2, 3 and 4 the same: a reader's eye moving down the page |
| 1350ms | The Approve button presses (scale 0.98, 80ms) and a lighter Pine sweeps across it left to right (320ms) |
| 1700ms | The fee line slides out from under the page, 12px down (240ms). Rest |

The chip stays "Ready to approve": the picture shows the moment of signing, and needs no new
words.

### 9.5 After: homecoming

**Copy, placed** (text left, picture right)

- "Then it's filed, and the papers come back to you."
- Ticks: "The state's documents, saved and sent to you" · "CoFile applies for the EIN and keeps the
  IRS letter" · "An update at each stage"

**Picture P5: a filed record with the state's document and the IRS letter** (designs
`PapersVisual`)

*What it shows.* Harbor & Pine's record for Two Sisters Bakery LLC, finished: the stages
"Approved", "Submitted", "Filed"; and two documents come home, "New Jersey · Certificate of
Formation · TWO SISTERS BAKERY LLC" and "IRS · EIN letter (CP 575) · EIN 00-0000000". Caption:
"Example record · sample documents".

*Composition.* A Pine-wash panel, radius 28, bleeding off the right edge, 560px tall. On it a
record card, 540px wide, Paper, radius 16, `e2`, with a 4px Pine band. The card's head carries
"Two Sisters Bakery LLC" in Lora 600 20px and "New Jersey LLC formation" in 13px Slate (sample data
already in P1). Under it, the **stage track**: three 14px Pine tags joined by a 2px Pine line, with
"Approved", "Submitted" and "Filed" in 13px Medium under each; "Filed" gets an 18px tag. Under the
track, the **documents**: two paper cards, 190 × 246px (Letter ratio), overlapping by 40px, at −4°
and +3°, each with its face designed generically (section 7.2):

| | Certificate of Formation | EIN letter (CP 575) |
|---|---|---|
| Top line | "New Jersey" in 11px Medium Slate | "IRS" in 11px Medium Slate |
| Title | "Certificate of Formation" in 15px Medium | "EIN letter (CP 575)" in 15px Medium |
| Key value | TWO SISTERS BAKERY LLC in Mono 11px | EIN 00-0000000 in Mono 13px |
| Body | Five grey text bars, a thin rule, two more bars | Four grey text bars and an address block of three short bars |
| Never | A seal, a crest, a state outline, a signature | The IRS name styled as a logo, an eagle, any official mark |

Each paper has a 28px file pill under it in the card (a page icon and a download icon, no words).

```
Desktop
 Then it's filed, and the papers    ┌──────────────── 6% Pine wash ──────────────────┐
 come back to you.                  │  ┌─▬▬▬▬▬▬▬▬▬▬▬▬▬▬ pine ▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬─┐     │
                                    │  │ Two Sisters Bakery LLC                   │     │
 ▪ The state's documents, saved     │  │ New Jersey LLC formation                 │     │
   and sent to you                  │  │                                          │     │
 ▪ CoFile applies for the EIN and   │  │  ▪━━━━━━━━━━━━━━▪━━━━━━━━━━━━━━■          │     │
   keeps the IRS letter             │  │  Approved      Submitted      Filed      │     │
 ▪ An update at each stage          │  │                                          │     │
                                    │  │     ╱‾‾‾‾‾‾‾‾‾╲  ╱‾‾‾‾‾‾‾‾‾╲              │     │
                                    │  │    │New Jersey │ │IRS        │            │     │
                                    │  │    │Certificate│ │EIN letter │            │     │
                                    │  │    │of Formation││(CP 575)   │            │     │
                                    │  │    │TWO SISTERS│ │EIN 00-…   │            │     │
                                    │  │     ╲_________╱  ╲_________╱              │     │
                                    │  └──────────────────────────────────────────┘     │
                                    └───────────────────────────────────────────────────┘
                                      Example record · sample documents
```

Phone: the card at full width; the track fits (three nodes); the two papers at 140px wide, fanned.

*Motion: "Homecoming"* (≈ 2.0s)

| t | Beat |
|---|---|
| 0ms | The card fades in (360ms) |
| 300ms | "Approved" tag fills; the line draws to "Submitted" (240ms); it fills; the line draws to "Filed"; it fills and grows to 18px (each tag 160ms) |
| 1100ms | The certificate flies in from beyond the right edge of the viewport (the state's side) on a shallow arc, rotating from 10° to −4°, landing with a 2px settle (600ms) |
| 1250ms | The IRS letter follows the same way to +3° (600ms) |
| 1850ms | The card takes one soft Pine-wash pulse (300ms). Rest |

The papers always travel right to left, toward the text column that says "you".

### 9.5.1 Interlude: the papers, handed over (new picture)

Between After and Coverage, a second full-bleed photograph: **P5**, Harbor & Pine's owner at the
bakery counter handing Ana a pine-green pocket folder, Lucia looking on. 21:9 at 560px on desktop,
4:3 on phone, no text over it, `[copy needed: alt text]`. The previous section says the papers come
back to the firm; this picture shows what the firm does with them, under its own name. It's the
emotional close of the story half of the page; what follows is the reference half: what we file,
the rehearsal, the prices.

---

### 9.6 Coverage: four tiles

**Copy, placed** (full width)

- "The filings your clients already ask you for."
- "New York, New Jersey, Florida and the IRS. See which are live today" (the last four words are the
  link to What we file)

**Picture P6: state tiles** (designs `StateTiles`)

*What it shows.* Four places and every filing type except the planned one, with the short names
from `lib/coverage.ts`, each marked with where it stands, and the legend: "Live", "Rehearsed to the
payment screen", "Screens recorded or offered, rehearsal next". Status comes live from the
deployment's switches, so the design works for any mix, including all of them live.

*The status square.* Each filing ends in a 12px square (the tag again), with its label as the
accessible name (`aria-label` and `title`, as in the stand-in):

| Where it stands | Square |
|---|---|
| Live | Solid Leaf `#1D7A50` |
| Rehearsed to the payment screen | Solid Iris `#5B4BD6` |
| Screens recorded or offered, rehearsal next | 1.5px Pebble outline, empty |

*Composition.* A Chalk Deep band. The tiles are a bento on the 12-column grid, sized by how many
filings each place has, so nothing is padded out:

```
Desktop
 The filings your clients already ask you for.
 New York, New Jersey, Florida and the IRS. See which are live today →

┌──────────────────────────────────────┐ ┌──────────────────────────────────────┐
│ New York                     (22/28) │ │ New Jersey                           │
│                                      │ │                                      │
│ LLC formation                     □  │ │ LLC formation                     ■  │ Iris
│ Corporation formation             □  │ │ Standing certificate              ■  │ Iris
│ Payroll registration (NYS-100)    □  │ │ Payroll registration (NJ-REG)     □  │
│ LLC changes and dissolution       □  │ │ Corporation formation             □  │
│ Copies and certificate of status  □  │ └──────────────────────────────────────┘
│ Application for Authority         □  │ ┌──────────────────┐ ┌─────────────────┐
│ Assumed name (DBA)                □  │ │ Florida          │ │ IRS             │
│                                      │ │ LLC formation  ■ │ │ EIN, with the   │
│                                      │ │ Corporation    ■ │ │ IRS letter    □ │
│                                      │ │ formation        │ │                 │
│                                      │ │ Limited        ■ │ │                 │
│                                      │ │ partnership      │ │                 │
└──────────────────────────────────────┘ └──────────────────┘ └─────────────────┘
 ■ Live   ■ Rehearsed to the payment screen   □ Screens recorded or offered, rehearsal next
```

- New York spans columns 1–6 over two rows; New Jersey 7–12 on the first row; Florida 7–9 and the
  IRS 10–12 on the second. Tiles are Paper, radius 16, `e1`, 28px padding.
- The place name in title-2 (22/28 Medium) with 20px under it; filing rows 44px, 16px Graphite,
  hairlines between; the square right-aligned and optically centered on the first line.
- No maps, no state outlines, no flags, no seals. The tiles are plain on purpose: a firm owner
  recognizes "New Jersey · LLC formation" faster than any shape.
- Legend: 15px Slate, the three squares in a row, under the tiles, left-aligned.

Phone: tiles stack, New York first, each full width; rows 48px; the legend moves above the tiles
so the squares are explained before they're seen.

*Motion: "The tags fill"* (≈ 1.2s). The tiles fade in together (240ms); then the squares fill in
reading order, 40ms apart (each 160ms, from an empty outline to its state). A Live square, when
there is one, lands last with a 1.1× scale pop (160ms). Rest.

### 9.7 Rehearsals: the stage

**Copy, placed** (text left, picture right, on the page's one dark band)

- "In beta: rehearse a filing, free."
- "CoFile fills in every screen of the state's real website and stops before the last button:
  nothing is filed or paid. Filing types go live one at a time."

**The band.** Night `#121417` full bleed, 128px padding, with the 2% grain and a work-light glow:
a radial gradient centered above the picture, Iris at 10% opacity fading to nothing over 900px.
Headline in Chalk Text, lede in Slate Dark. The header mark stays Pine in its Chalk header above.

**Picture P7: a rehearsal log** (designs `RehearsalLog`)

*What it shows.* The stand-in's content: "Rehearsal · New Jersey LLC formation" with "test
details"; then "Business name" filled · "Name check" passed · "Registered agent" filled · "Members and
signatures" filled · "Review page" matched the proof · "Payment: $103.50" matches the proof · "Pay
Now" held, on purpose; and the caption "Rehearsal · nothing filed, nothing paid".

*Composition.*

- **The run sheet**: a card on Graphite 3 `#23272C`, radius 16, 500px wide, a 1px Seam edge. Its
  header row: "Rehearsal · New Jersey LLC formation" in 15px Medium Chalk Text and "test details"
  in 13px Slate Dark at the right, over a 1px Seam rule. Then seven 52px rows: a Mono numeral
  (01–07, 13px Slate Dark), the step in 16px Chalk Text, and its result right-aligned in 15px Slate
  Dark.
- **The run line**: a 2px line down the left edge of the rows, joining a 10px tag at each row.
  Done tags are solid Iris Dark `#A99BFF`. The last row's tag is a dashed Iris Dark outline, and
  "held, on purpose" is set in Iris Dark: the curtain line of the rehearsal, never red, never an
  icon of a hand or a stop sign.
- **The screen ghosts**: behind the card, up and to the right, a fanned stack of thirteen screen
  ghosts (180 × 120px, Graphite 2, radius 8, faint field bars), offset 6px and rotated 1.5° each,
  for the thirteen screens of the state's form. They make "every screen of the state's real
  website" visible without showing the state's site.
- Caption under the card in 13px Slate Dark.

```
Desktop
████████████████████████████████ Night, Iris work-light glow ████████████████████████████████
█                                                         ░░░ ghosts ░░░                    █
█  In beta: rehearse a filing, free.          ┌─────────────────────────────────────────┐   █
█                                             │ Rehearsal · New Jersey LLC   test details│   █
█  CoFile fills in every screen of the        │ ┊01  Business name               filled  │   █
█  state's real website and stops before      │ ┊02  Name check                  passed  │   █
█  the last button: nothing is filed or       │ ┊03  Registered agent            filled  │   █
█  paid. Filing types go live one at a time.  │ ┊04  Members and signatures      filled  │   █
█                                             │ ┊05  Review page      matched the proof  │   █
█                                             │ ┊06  Payment: $103.50  matches the proof │   █
█                                             │ ◌07  Pay Now           held, on purpose  │ ← Iris
█                                             └─────────────────────────────────────────┘   █
█                                              Rehearsal · nothing filed, nothing paid      █
█████████████████████████████████████████████████████████████████████████████████████████████
```

Phone: text first; the card full width; three ghosts peek above its top edge instead of thirteen.

*Motion: "The run-through"* (≈ 2.4s)

| t | Beat |
|---|---|
| 0ms | The card and the ghost stack fade up (360ms) |
| 300ms | The run line starts down from the first row. At each row (every 300ms) the tag fills Iris and the result text fades from 40% to full (160ms); at the same time the ghost stack turns two screens, the front ghost sliding left and fading as the next takes its place (240ms) |
| 2100ms | The line reaches row 07 and ends at its dashed outline tag. The row brightens from 70% to full (300ms). The work-light glow brightens 2% (300ms) |
| 2400ms | The caption fades in. Rest |

### 9.8 Pricing: the price strip

**Copy, placed** (full width, on Paper)

- "$45 a filing. EIN included with a formation."
- The four items, as the copy pairs them: "Pay as you go" / "per live filing" · "$25" / "an EIN on
  its own" · "$15" / "copies and certificates" · "Plans from $250" / "a month for 6 filings"
- "State fees separate. Rehearsals free. See all plans"
- "Social Security numbers encrypted and deleted 30 days after the filing. Saved cards held in a card
  vault, never in our database. Security"

**Picture: the price strip** (new). Prices are the picture here, like a fee schedule printed on good
letterhead: big figures, plain words, nothing shouting.

```
Desktop
 $45 a filing. EIN included with a formation.                         (display-2, Graphite)

 ┌───────────────────┬───────────────────┬───────────────────┬───────────────────┐
 │ Pay as you go     │ $25               │ $15               │ Plans from $250   │  title-1 28/34
 │ per live filing   │ an EIN on its own │ copies and        │ a month for 6     │  body 17 Slate
 │                   │                   │ certificates      │ filings           │
 └───────────────────┴───────────────────┴───────────────────┴───────────────────┘
 State fees separate. ◌ Rehearsals free.  See all plans →                         (15 Slate)
 ─────────────────────────────────────────────────────────────────────────────────────────────
 Social Security numbers encrypted and deleted 30 days after the filing. Saved cards held in a
 card vault, never in our database.  Security →                                    (15 Slate)
```

- The strip: four equal cells divided by 1px Stone rules, a 1.5px Graphite rule above and below
  the whole strip (the "letterhead" rules), 32px vertical padding per cell.
- The bold term in each cell (`b`) is title-1 28/34 Medium Graphite with tabular figures, so $25,
  $15 and $250 align on the same baseline; the description under it is body 17/27 Slate.
- "Rehearsals free." is preceded by a 10px dashed Iris tag, the rehearsal square from the run
  sheet: the only color in the section.
- "See all plans" and "Security" are underlined links with arrows.
- **The security line** sits 32px under a Stone hairline, in 15/22 Slate across the full measure:
  easy to find, easy to read, and deliberately unillustrated. No lock, no shield, no badge.
- No motion. Prices sit still.

Phone: the strip becomes a 2 × 2 grid (rules between cells), then the two small lines stacked.

### 9.9 Close: the empty frame

**Copy, placed** (centered, on Chalk)

- "Run one rehearsal. Then decide."
- "Try it on a filing you know by heart. Questions? hello@cofile.app"
- Button: "Run a free rehearsal"

**Picture: the empty frame** (new). Above the headline, the CoFile mark at 160px, Open: a 4px
Pebble outline frame and a Graphite tag pinned to its corner. All the way down, the frame wore
Harbor & Pine's pine. Here it is empty: a nameplate waiting for the visitor's firm.

```
                               ┌──────────────┐
                               │              │      160px, Open
                               │              │
                               │              │
                               └──────────── ■
                     Run one rehearsal. Then decide.            (display-2)
           Try it on a filing you know by heart. Questions? hello@cofile.app   (lede)
                         [   Run a free rehearsal   ]           (56px, Graphite)
```

- 160px padding above and below; the frame 48px above the headline; the button 40px below the
  lede.
- *Motion: "The empty frame"* (≈ 1.2s). When 50% in view, the header mark drains from Pine to Open
  (480ms) while the big frame draws its outline clockwise from the top-left (720ms, stroke-dashoffset),
  and the tag drops into place last (scale 0.6 to 1, 160ms, a 2px overshoot). Hovering or focusing
  the button nudges the big tag 2px down and right, a small wink (160ms).
- Phone: frame at 120px; the button full width.

### 9.10 Footer

Graphite `#1B1F24` band, Chalk Text type, 64px padding, the Reverse mark at the start.

```
 ▢▪ CoFile · the filing desk behind your firm   New York · New Jersey · Florida · IRS   Building a filing product? CoFile for platforms →
 ──────────────────────────────────────────────────────────────────────────────────────────────────
 CoFile is not a law firm or a government agency, isn't affiliated with any state or the IRS, and
 doesn't give legal or tax advice.                       Terms · Privacy · Security · FAQ · hello@cofile.app
```

Row one at 16px; the legal line at 14/22 in Slate Dark `#A8AEB6` (8.9 : 1 on Graphite); links
underlined. Phone: everything stacks, links in a row that wraps, 48px tap targets.

---

## 10. The other pages

### 10.1 The pages behind the home page: shared frame

All seven share the home page's header (nav, current page underlined), beta banner and footer.

- **Page head** (`PageHead`): Chalk, 96px top and 72px bottom padding. Kicker 16/22 Medium Slate
  with its 8px Graphite tag; title at display-2 (44/50) across eight columns; lede at 21/33 across
  seven. Phone: 56px top padding, title 32/38.
- **Sections**: the quiet rhythm from section 6.2. Ticks become 8px Graphite tags. A section that
  pairs text with a picture uses the home page's six-and-six split; long text sections use an
  eight-column reading measure.
- **Pictures**: the home page's live pictures are reused wherever a page uses the same stand-in,
  at full size and with their motion. Photographs from the shoot open or punctuate pages.
- **Closes**: each page's closing section uses the home Close's layout with a 96px empty frame
  (no header-mark drain; on these pages the mark is already Open).

### 10.2 How it works (`/how-it-works`)

**Head**: kicker "How it works"; title "Your client asks. You approve it. CoFile files it."; lede
"Three steps. Your client hands the job to you, and you sign off before anything is filed."

**Steps (`#steps`): the round trip** (new picture). Three panels across twelve columns, each holding
its step's words ("Your client asks." / "You approve it." / "CoFile files it." and their
paragraphs), with a small picture above each:

| Panel | Ground | Picture above the words |
|---|---|---|
| 1 · "Your client asks." | Chalk Deep, flat | A phone card fragment of Harbor & Pine's client form, with a small message bubble tucked beside it (the client's two ways in) |
| 2 · "You approve it." | Paper, raised 24px, `e2`, a 4px Pine band | A miniature of the proof's top and its Pine "Approve for filing" button. The firm's panel is the raised one, because the firm is in charge of the middle step |
| 3 · "CoFile files it." | Graphite, Chalk Text | Three screen ghosts filling with field bars, and one paper card leaving the stack |

A 2px Graphite connector runs through the three pictures, 1 to 2 to 3, and a **return arc** curves
under the panels from 3 back to 2: the papers come back to the firm, not to the start. Motion
(≈ 2.4s): a 10px Pine tag travels 1 to 2 (480ms), pauses while panel 2's button presses (240ms),
travels 2 to 3 (480ms); panel 3's ghosts fill (480ms); a small paper rides the return arc back into
panel 2 (600ms). Phone: the panels stack; the connector runs down their left edge and the return
arc becomes a short curve from 3 back up to 2.

**The proof (`#proof`)**. Opens with photograph P10 (the printer's proof flat lay) at 21:9, full
width of the content area, radius 28, because the lede begins "You've approved a proof before:
business cards, letterhead, an invitation at the printer." Then text left (the title "You see what
the state will see, before the state does.", the long lede and the six ticks) and P4, the proof
picture, right. The picture is `position: sticky` (top 120px) while the long text scrolls past it,
and its sign-off motion plays when the first tick reaches it. The sixth tick ("Like reviewing a
return before you e-file it: nothing goes to the state until you've signed off.") is set apart by a
Stone hairline above it, in 18px Medium, because CPAs will recognize themselves in it.

**Requests (`#requests`)**: "Clients don't always fill in forms. They text you." and its lede, text
right, with P3 (the text reads in) left, opening on the full-size P2 photograph plate.

**Checks (`#checks`)**: a quiet Chalk Deep band. "Checks before every filing." and its lede on the
left; the four items on the right as a numbered list, numerals 01 to 04 in CoFile Mono 14px Slate
hanging in the margin, body 18/29. No picture, no icons, no motion: the reader who comes here wants
to read.

**After (`#after`)**: "The papers come back to you." with its lede and three ticks, text left, and
P5 (homecoming) right. Under the section, photograph P5 (the papers handed over) at 21:9.

**Close**: "Run one rehearsal. Then decide.", its lede, and "Run a free rehearsal" (primary) beside
"Questions" (secondary).

### 10.3 For firms (`/for-firms`)

**Head**: kicker "For CPA, payroll, fractional CFO and title firms"; title "Form the business. Keep the
client."; the lede ("Your client needs an LLC. Who do they call? You. …") at 21/33, seven columns.

**Opening photograph** (new): an alternate frame from the P5 setup, the owner and Ana talking across
the bakery counter before the handover, 21:9, radius 28. "Keep the client" is a relationship; this
shows one. `[copy needed: alt text]`

**Your filing desk (`#desk`)**: "Your filing desk, in your brand." and its five ticks, text left;
P1 (the desk, on its Pine field) right, with motion. Beneath it, photograph P4 (the desk at work)
at 16:9 as a second plate, offset two columns right, so the product and the people who use it sit
together. The fifth tick ("CoFile is built and run by filing professionals. When a filing needs a
person, one of them takes over.") carries the 24px portrait tiles from the hero in place of its tag.

**Your brand (`#brand`)**: "Your name on the door. Ours in small type." and its lede, text right;
P2 (one page, two houses) left, with photograph P6 (Northgate's office) as a narrow 4:5 plate
behind Northgate's phone card, so each firm visibly has its own place.

*Optional, needs the owner's approval and copy:* under P2, a row of the Branding page's nine ready
colors as 40px swatches. Tapping one re-dresses a third, unnamed page live, with a monogram tile in
place of a logo. `[copy needed: a label for the swatch row, each swatch's accessible name, and the
example firm name shown on the page]`

**Registered agent (`#agent`)**: "Your registered agent, or ours." and its lede, left; the three
ticks with their "How it works" and "Pricing" links, right. Quiet Paper band, no picture.

**Close**: "Open your firm's filing desk.", its lede and "Run a free rehearsal".

### 10.4 What we file (`/what-we-file`)

**Head**: kicker "What we file"; title "New York, New Jersey, Florida and the IRS."; lede "Every filing
type carries a plain label, so you always know which ones are live today."

**The table (`#coverage`)**: full width, Paper card, radius 16.

| Column | Width | Style |
|---|---|---|
| Filing | 52% | 17px Graphite; the parenthetical in "Standing certificate (through the API; not on the filing desk yet)" in Slate |
| Where | 18% | 16px Graphite |
| Where it stands | 30% | A status chip: the status square plus the label |

| Label | Chip |
|---|---|
| Live | Leaf tint ground, solid Leaf square, Leaf text |
| Rehearsed to the payment screen | Iris tint ground, solid Iris square, Iris text |
| Screens recorded, rehearsal next | Neutral tint ground, outline Pebble square, Graphite text |
| Offered, not yet rehearsed | Neutral tint ground, outline Pebble square, Slate text |
| Planned | No ground, dashed Pebble square, Slate text |

Rows 60px with Stone hairlines; a Chalk Deep header row in 14px Medium Slate; the first column
sticks on horizontal scroll at tablet widths. Phone: each row becomes a card (filing 17px Medium,
place 15px Slate, chip on its own line), 12px apart. The note under the table at 15/22 Slate, max
eight columns, with its email link underlined.

**How a filing type goes live (`#live`)**: title and lede left; P7 right on a Night panel (radius
28), so the run sheet keeps its stage on a light page.

**State by state (`#states`)**: "State by state." and a 2 × 2 grid of Paper cards (New York, New
Jersey, Florida, IRS), each with its h3 in title-2 and its paragraph at 17/27. Under each h3, that
place's status squares in a row (the same squares as P6, no labels, with an accessible summary
`[copy needed]`), a small visual link back to the table.

**Close**: "Rehearse one you know by heart." with "Run a free rehearsal" and "See pricing".

### 10.5 Pricing (`/pricing`)

**Head**: kicker "Pricing for firms"; title "$45 a filing. EIN included with a formation."; lede "Pay
for each live filing, or take a plan with filings included every month. Every plan is backed by
filing professionals, and rehearsals are always free."

**Plans (`#plans`)**: four price cards in a row on desktop, 2 × 2 on tablet, stacked on phone. The
card design is in section 11.

| Card | Price line | Under it | List |
|---|---|---|---|
| Pay as you go | "$45" + " a filing" | "No monthly fee. Pay only for live filings." | "$25 for an EIN on its own" · "$15 for copies and certificates" · "A filing professional takes over when a filing needs one" |
| Starter | "$250" + " a month" | "or $2,500 a year (2 months free)" | "6 filings a month" · "$40 for each filing past that" · the takeover line |
| Growth (`r3-plan-mid`) | "$500" + " a month" | "or $5,000 a year (2 months free)" | "15 filings a month" · "$33 for each filing past that" · the takeover line |
| Unlimited | "$1,000" + " a month" | "or $10,000 a year (2 months free)" | "Unlimited filings (fair use: 60 a month)" · "$15 for each filing past fair use" · "Priority help from a person" · the takeover line |

The figure is 48/52 Medium tabular Graphite; " a filing" and " a month" sit on its baseline at
18px Slate. The middle card (Growth) gets a 1.5px Graphite outline and sits 8px higher, with no badge
and no extra words. The takeover line in every card is bulleted with a 20px portrait tile (P7)
instead of a tag: a person, literally, on every plan. The note under the cards in 15px Slate, its
link underlined.

**What counts as a filing (`#counts`)** and **What's separate (`#separate`)**: title left, list
right, set as a ledger. Each item's bold run-in ("One filing:", "Included:", "An EIN on its own:",
"Copies and certificates:", "Unused filings", "State fees", "CoFile's registered agent service,",
"New York's publication notice") sits in a 220px left column in 17px Medium, its sentence to the
right at 17/27, with a Stone hairline between rows. The words and their order don't change; the
run-ins just get their own column, like accounts in a ledger. The last item of "What's separate."
has no run-in and spans both columns.

**Close**: "Start with a free rehearsal.", its lede and "Run a free rehearsal". A dashed Iris tag
sits before the headline.

### 10.6 Security (`/security`)

**Head**: kicker "Security"; title "How we handle what you trust us with."; lede "Social Security
numbers, cards and state logins, and how CoFile keeps each one."

**The five (`#security`)**: Paper cards on Chalk in a two-column grid (the fifth card spans both
columns on desktop), each with its h3 ("Encrypted, masked SSNs", "Cards in a vault, logins
encrypted", "Single-use links to the proof", "Signatures only on approval", "Separate accounts") in
title-2 and its paragraph at 17/27, 32px padding. No icons, no locks, no shields, no badges, no
motion. Trust comes from plain, complete sentences set large enough to read.

**Closing paragraph**: the lede-sized paragraph with its three links (How it works, Privacy Policy,
the email), across eight columns.

This is the calmest page on the site, on purpose.

### 10.7 Questions (`/faq`)

**Head**: kicker "Questions"; title "Questions, answered."; lede "Something else? hello@cofile.app".

**The fourteen**: one column, 760px, as an accordion of `details` elements.

- Each question 20/28 Medium Graphite, in a row of at least 72px, with a 24px plus icon on the right
  that turns into a minus (rotate 90°, 160ms). Stone hairlines between rows.
- Open answers at 18/29, max 64 characters a line, 24px under the question, links underlined.
- A link to `/faq#approves` (or any id) opens that item, scrolls to it with a 96px offset, and gives
  the row a Chalk Deep background that fades over 1.2s.
- "Who approves a filing?" gets a small picture inside its answer: the proof's Pine "Approve for
  filing" button at 0.6 scale beside the words, the firm's button in the firm's color.
- "Is a person involved?" gets the row of P7 portrait tiles at 40px under its answer.
- Phone: full width, the same rows; the plus icon stays 24px with a 48px tap area.

### 10.8 For platforms (`/platforms`)

**Head**: kicker "For platforms"; title "Building a filing product? Put CoFile underneath it."; the
lede at 21/33.

**Picture: underneath** (new), full content width, between the head and the section, on a Chalk
Deep plinth 360px tall. Three layers stacked with 32px vertical and horizontal offsets, from front
to back:

1. A white-label proof page in a neutral demo platform brand: a grey logo block where a platform's
   logo goes, a Slate band, no name (`[copy needed: if a platform name is wanted]`).
2. The embed widget on a generic website frame: the client form at 0.6 scale inside a page of grey
   content bars.
3. At the back and bottom, a Graphite slab with the Tag at its corner and a code chip,
   `"dryRun": true`, in CoFile Mono on Iris tint.

No arrows, no labels: the layers say "your product on top, CoFile underneath". Motion: the layers
slide apart from a single stack to their offsets (480ms, 80ms stagger).

**The section (`#enterprise`)**: the five ticks left; the inquiry form right on a Paper card (radius
16, 32px padding, `e1`). The `"dryRun": true` in the fifth tick is CoFile Mono on Iris tint with
Iris text, radius 4, the same as in the docs. "Read the API docs" is an underlined link.

**Inquiry form**: fields from `InquiryForm` ("Name", "Company", "Work email", "Phone (optional)",
"States you file in", "Filings per month", "What you'd like to do (optional)"), two to a row on
desktop where the component pairs them, one per row on phone; the "Send" button, Graphite, 52px. The
honeypot field stays visually hidden. On success, the card shows the component's message beside
illustration I8.

---

### 10.9 Sign-up (`/signup`)

The moment a firm first puts its name on something.

- Shell with the header (no nav), on Chalk. A 960px two-part card: the form on the left (560px,
  Paper, 40px padding) and a **nameplate preview** on the right (400px, Chalk Deep).
- Form head: "For firms" as the kicker, "Set up your firm's filing desk" in title-1, the lede at
  17/27 Slate. Fields as the form has them ("Firm name", "Kind of firm", "Your name", "Work email",
  "Password", "Password again", "Phone (optional)", "Website (optional)", the New York, New Jersey and
  Florida checkboxes, "Filings per month", the terms checkbox), two to a row where the form pairs
  them, then "Create account" (Graphite, full width, 56px). Under the card, the note "Building a
  filing product? See CoFile for platforms." in 15px Slate.
- **The preview** (new picture): the Open frame mark at 120px. As the visitor types the firm's
  name, a monogram tile with its initials (section 3.5) appears inside the frame in Graphite and
  the name sets itself beside it in CoFile Sans 20px Medium, live, letter by letter as typed. No
  color yet; the color comes on the Branding step. It is the first time they see their own name on
  a CoFile surface. `[copy needed: a caption for the preview, if one is wanted]`
- Phone: the preview collapses to a 72px strip above the form (monogram tile plus name), then the
  form full width.

### 10.10 Check your email, and confirm your email (`/signup/sent`, `/verify-email`)

One centered auth card, 480px, Paper, radius 16, `e1`, 40px padding, on Chalk, under the
navless header.

- Check your email: kicker "Your filing desk", title "Check your email", the lede (with its "log
  in" link when the desk opens straight away), illustration I8 above the title at 96px, the note
  "No email after a few minutes? Check spam, or send the link again."
- Confirm your email: kicker "Your filing desk", title "Confirm your email"; with a token, the lede
  "One click and your email is confirmed." and the "Confirm my email" button (Graphite, full width,
  56px); without one, the resend lede, the "Email" field and "Send a new link".

### 10.11 Log in (`/login`, `/dashboard/login`)

- The same auth card: kicker "Log in", title "Welcome back", lede "Firms go to their filing desk,
  platforms to their dashboard."
- "Continue with Google" as a full-width secondary button built to Google's own published
  sign-in button guidelines; then a Stone hairline; then "Email" and "Password" and the "Log in"
  button (Graphite, 56px).
- Notices from the page (the Google errors, "Your session ended. Log in again to carry on." and the
  others) sit above the form in the notice component, in the tone each one needs: Brick for a
  failure, Slate for information, Leaf for "Your password is changed. Log in with the new one."
- Under the card: "New here? Set up your firm's filing desk. Enterprise developers can also log in
  with an API key."
- The API-key log-in for platforms uses the same card with a single "API key" field set in
  CoFile Mono.

### 10.12 Password pages

Forgot password ("Reset your password", the "Email" field, "Email me a reset link", "Back to log
in"), reset password ("New password", "New password again", the help "At least 12 characters. A few
unrelated words work well.", "Set new password") and change password inside the desk ("Current
password", "New password", "New password again", "Change password") all use the auth card, or a
narrow desk card for the last one. Password fields get a show/hide toggle `[copy needed: its two
labels]` and a strength hint drawn as three 4px segments under the field (no words, Slate to
Graphite as it lengthens past 12 characters).

### 10.13 Terms and Privacy (`/terms`, `/privacy`)

- Reading layout: an 720px article on Paper, centered, with a 240px sticky contents list on its
  left from 1200px up, built from the page's own h2s (no new words).
- Title in display-3; "Effective November 26, 2026. See also our Privacy Policy." (or Terms) in
  15px Slate with the link underlined.
- Body 18/30 Graphite. Numbered h2s ("1. What CoFile does") at 24/30 Medium, the number in
  CoFile Mono Slate. Bold statements stay bold; links underlined.
- Print stylesheet: Paper, no header or nav, 11pt body, URLs printed after links.
- Phone: the contents list becomes a disclosure at the top `[copy needed: its label]`.

### 10.14 404, errors and dead ends

| Page | Words (as the code has them) | Design |
|---|---|---|
| 404 | "Page not found" / "The link may be old or mistyped." / "Go to the home page" | Shell header, a centered 560px column, I6 (the frame with its tag fallen) at 160px, title-1, body, a secondary button |
| Error | "Something went wrong" / "This page couldn't load just now. It's usually a short hiccup on our side." / "Try again" and "Log in again" / "If it keeps happening, tell us this reference: …" | I7 (the frame askew), primary "Try again", secondary "Log in again", the reference in a CoFile Mono chip that selects all on click |
| Invite expired | "This link has expired or isn't valid" / its paragraph | I5, centered, no nav |
| Signed out of a desk | "You're not signed in to this filing desk" / its paragraphs and "log in here" link | I5, centered |
| Session ended | (the log-in page's notice) | The log-in card with the notice on top |
| A client link that no longer works | "This link has expired or isn't valid" / "Ask whoever sent it for a new one."; "This link can't be used" | **Neutral on purpose**: the firm isn't known yet, so there's no CoFile logo either. A plain Paper page, I5 drawn in Graphite and Slate, the words, nothing else |

---

### 10.15 The filing desk: the shell (`/p/<firm>`)

The firm's own room. Its brand leads; CoFile is the small type at the bottom of the sidebar.

```
Desktop
┌▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬┬──────────────────────────────────────────────────────────────┐
│ (4px house band)         │                                                              │
│ [logo] Harbor & Pine CPA │  Filings                                        [New filing] │
│        Filing desk       │                                                              │
│                          │  ┌ your turn ───────────────┐ ┌ ready to pay ─────────────┐  │
│ [ + New filing ]  house  │  │ 1 filing needs someone…  │ │ 1 approved filing is …    │  │
│                          │  └──────────────────────────┘ └───────────────────────────┘  │
│ ▌ Filings                │                                                              │
│   Ready to pay       (1) │  Filing                    Type           Status   Started   │
│   Client links           │ ▌Two Sisters Bakery LLC    NJ LLC formation (Waiting…) Dec 1 │
│   Signatures             │  Hudson Ledger LLC         NY LLC formation (Completed) Nov 28│
│   Setup                  │  …                                                           │
│   Billing                │                                                              │
│                          │                                                              │
│ ──────────────────────── │                                                              │
│ ana@harborpine.example   │                                                              │
│ Log out                  │                                                              │
│ ▪ with CoFile            │  Questions? Email …                                          │
└──────────────────────────┴──────────────────────────────────────────────────────────────┘
```

- **Sidebar**, 256px, Chalk, a 1px Stone right edge. The 4px house band across its top. The
  nameplate (section 3.5) at the logo's desk size, with "Filing desk" in 12px Slate under the name
  `[copy needed: confirm "Filing desk" as a label under the name]`. Then "New filing" as a full-width
  house button (44px), and the nav: Filings, Ready to pay (with a Marigold count when filings are
  waiting), Client links, Signatures, and for partner firms Setup and Billing. Rows 44px, 15px
  Medium, a 20px icon; the current page gets a 3px house bar on the left and a house-wash fill.
- **Foot of the sidebar**: the signed-in email (linking to change password), "Log out" as a quiet
  button, and "with CoFile".
- **Content**: Chalk ground, max 1120px, 48px padding; page titles in the firm's font at 32/40.
  The firm's support line ("Questions? Email …") at the foot in 14px Slate.
- Firms that a platform invited show that platform's nameplate and no "with CoFile", as the
  product does today.
- **Phone**: a 56px top bar (the 4px band, the nameplate at 28px, a menu icon); the sidebar becomes a
  full-height sheet with the same order. Pages put their main button at the top of the content.
- **Dark**: sidebar Graphite 3, content Night, cards Graphite 2; the logo on its white plinth; the
  house band unchanged; house ink switches to its dark derivation.

### 10.16 Filings (the desk's overview)

- Title "Filings" with "New filing" (house button) at the right.
- **Your-turn cards** (new arrangement of existing notices): the notices the page shows ("Real
  filings need an active subscription; rehearsals are free. Subscribe", "1 approved filing is ready
  to pay and need your card's security code. Pay and file", "1 filing needs someone to act.") become
  a row of up to three compact cards, each with a 4px Marigold top rule, the sentence at 16/24 and
  its link as a quiet button. Nothing at all when there's nothing to do.
- **The list**: a Paper card holding the table (Filing, Type, Status, Started). Rows 60px. The client
  name links, 16px Medium; a rehearsal carries a small Iris chip after it (the code's label for it
  today is "Test"; `[copy needed: confirm "Test" or "Rehearsal" for this chip]`). Rows whose status
  needs someone get the hero's treatment: a 3px house bar and a house wash. Dates in tabular
  figures, 14px Slate.
- **Empty**: I1 at 160px over "Your desk is clear. Start a filing (it can be a free rehearsal), or send
  a client a link with your logo on it." with "New filing" (house) and "Send a client a link"
  (secondary).
- Phone: rows become cards (name, type, chip, date), 12px apart.

### 10.17 Setup and Branding

**Setup** (`/setup`): title "Set up your account" (or "You're set up"), its lede, and the three
steps as a vertical list of 88px rows: a 20px tag on the left (solid house color with a white tick
glyph when done, a house outline for the next step, a Pebble outline for later), the step's title
and line ("Your firm", "Branding", "Payment"), and its button at the right (house fill for the next
step: "Set up your firm", "Set up branding", "Set up payment"; secondary "Change" for done ones).
Then the optional Registered agents card and, when everything's done, "Start a filing". When the
last step completes, illustration I9 (a frame filled with the firm's own color) appears above "You're
set up", and the frame fills in with a 480ms wipe: their color, in our frame, for the first time.

**Branding** (`/setup/branding`), the most important setup screen, because it's where the firm
sees itself:

```
Desktop
┌─────────────────────────────────────┬───────────────────────────────────────┐
│ Step 2 of 3                         │  ┌ phone ──────────┐  live preview,   │
│ Branding                            │  │▬▬▬ band ▬▬▬▬▬▬▬▬│  sticky          │
│ Your clients see your name, logo …  │  │[logo] Your name │                   │
│                                     │  │Start your New … │                   │
│ Your web address                    │  │[Send to …     ] │                   │
│ cofile.app/ [harbor-and-pine     ]  │  └─────────────────┘                   │
│ Name your clients see [          ]  │  ┌ the proof ─────────────────────┐    │
│ Logo  [ drop a picture or browse ]  │  │▬▬▬▬ band ▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬│    │
│ Main color  [■][#1f5c4b] ■■■■■■■■■  │  │[logo] Name         ▪ with CoFile   │
│ Second color[■][#8a5f14] ■■■■■■■■■  │  │Title             [Approve …]   │    │
│ Font  [ Lora (serif)          ▾ ]   │  └────────────────────────────────┘    │
│ Support email shown to clients [ ]  │  ┌ email ─────────────────────────┐    │
│ [ Save and continue ]               │  │[logo] Name  …  [Open your proof]│   │
│                                     │  └────────────────────────────────┘    │
└─────────────────────────────────────┴───────────────────────────────────────┘
```

- The form (560px) uses the page's fields as they are: "Your web address" (with the site's address
  as a Slate prefix inside the field, the slug in CoFile Mono), "Name your clients see", "Logo"
  (a 120px drop zone with a dashed Pebble border, radius 12, which shows the trimmed logo once
  uploaded, plus "Use a link instead" and "Remove logo"), "Main color" and "Second color" (a 44px
  picker swatch, the hex field in Mono, and the nine ready colors as 32px rounded squares; the
  chosen one gets a 2px Graphite ring with a 2px Paper gap), "Font" (the select, each option
  rendered in its own face, plus the upload), and "Support email shown to clients"; then "Save and
  continue" (Graphite here: the firm hasn't saved its color yet).
- **The preview** replaces today's single card with the firm's kit, live: the client page on a phone
  card (the TwoFirms page at 0.6), the top of the proof (nameplate, title, the Approve button) and
  the head of the proof email. All three re-dress as the firm types, picks or uploads (color 240ms,
  font cross-fade 160ms, logo fade 240ms). The house engine runs live: a too-light main color shows
  its derived button straight away, a logo on a dark box shows as a tile, a logo with no name beside
  it moves the name out. Any explanation of those adjustments is `[copy needed]`; the existing
  help ("Buttons and the top of the page. Button text is white, so choose a dark color.") stays
  under the field.
- Phone: the preview is a 140px strip at the top showing the phone page's header and button; tapping
  it opens the three previews in a sheet.

**Your firm**, **Payment** and **Registered agents** use the narrow form layout: fields at 48px, the
payment mode as two large choice rows ("One card for every filing" / "A card for each type of
filing, with one main card for the rest"), card selects, and the saved-cards list in which each
card is a small generic card glyph (64 × 40px, Graphite, radius 6, last four digits in Mono) beside
its label. The card vault's own field is styled with our field tokens.

### 10.18 New filing: state, then type

**State** (`/new`): title "New filing", the question "Which state is the business in?" at 21/32, the
note about rehearsals in 15px Slate. Then the three states as large cards in a row: Paper, radius
16, 32px padding, the state's name in the firm's font at 28/34, its count line ("3 filing types,
plus the federal EIN") in 15px Slate. Hover lifts 4px and draws a house-color bottom rule. No state
outlines, as on the public site.

The "Or send us the details and we fill in the form for you to check:" block becomes a row of up
to three small **ways-in cards** (email, text or WhatsApp, Slack), each with its icon, its sentence
and the address or `/file` in CoFile Mono. Words as the page has them.

**Type** (`/new?state=NJ`): "All states" back link; title "New Jersey: what are you filing?"; the
lede; then the types as a two-column grid of cards: the title at 20/26 Medium, the Live (Leaf) or
Rehearsal (Iris) chip, the summary at 15/22 Slate, the fee note at 14/20. Then **"Your pages for
clients"**: a card listing each service's permanent page in a CoFile Mono pill with a copy button
`[copy needed: "Copy" and "Copied"]`, and its widget code in a Graphite code block.

### 10.19 The new filing form

- Narrow layout (720px), with a 240px right rail from 1280px up holding a sticky list of the
  form's own section titles, each with a small tag that fills when the section is complete (the
  words are the legends already on the form).
- Back link "← Other filings"; title (the filing type) in the firm's font; the summary with its
  "Send them a link" link.
- Notices: "Filled in from your message …" in the house-tint notice with a message icon;
  "Rehearsal: … isn't live yet, so this filing is a rehearsal. …" in the **Iris** notice (today it's
  a yellow warning; a rehearsal is good news).
- "Start from a client you filed for before": an inline row (label, select, "Fill in" secondary).
- Each fieldset is a Paper card, radius 16, 32px padding, its legend at 21/28 in the firm's font.
  Fields as in section 11. "More options (optional)" and folded optional sections are disclosure
  rows inside the card, with a chevron. "Same as" choices are small secondary pills.
- **Authorizations**: each statement is a full-width choice row (a 22px checkbox, the statement at
  17/26), 16px padding, a Stone hairline between rows; a checked row takes a house wash.
- The footnote "Next you get the proof to approve. Nothing is filed until you do.", then "Create
  the proof" as a 56px house button with the fee note beside it in 14px Slate.

### 10.20 Filing detail (the record)

```
Desktop (narrow column + right rail)
 ← Filings
 Two Sisters Bakery LLC   (Waiting for approval) (Rehearsal)            firm font 32/40
 New Jersey LLC formation · started 12/1/2026, 9:14 AM by …              15 Slate

 ▪━━━━━━━━━━▫──────────▫──────────▫                                       stage track
 Approved   Submitted to the state   Accepted by the state   Completed

 ┌▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬ house band ▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬┐   ┌ Documents ───────────┐
 │ Your proof is ready                           │   │ [page] [page]         │
 │ Check every detail and fee exactly as …       │   │ Certificate of …      │
 │ [ Open the proof and approve it ]   house     │   └──────────────────────┘
 │ We also emailed the link to …                 │   ┌ EIN ─────────────────┐
 └───────────────────────────────────────────────┘   │ 00-0000000   (Mono 28)│
 ▸ Progress on the state site (test run, …)          └──────────────────────┘
```

- Title row: the filing's title in the firm's font, its status chip, and the Iris "Rehearsal" chip
  for a rehearsal. The meta line in 15px Slate.
- **Stage track** (new picture, from P5): the product's own status labels as stages ("Approved",
  "Submitted to the state", "Accepted by the state", "Completed"), house tags joined by a 2px line,
  done stages solid, the current one ringed, future ones Pebble outline.
- The next-step line ("The proof is ready: check exactly what will be filed and approve it.") as an
  information notice.
- **"Your proof is ready"**: the page's lead card when it's present: Paper, a 4px house band, the
  title at title-2, its sentence, "Open the proof and approve it" as a 52px house button, and the
  email line in 14px Slate. This is the most important button the firm presses all day; it is the
  biggest thing on the page.
- Ready-to-pay and error notices in their tones; the missing-information form as a card.
- "Save to Google Docs" as a small secondary button with its note.
- **Documents** (right rail, or under the main column on phone): each document as a 96 × 124px paper
  thumbnail (the generic faces from section 7.2) with its label (15px Medium) and kind (13px Slate)
  under it. Newly arrived documents settle in with the shortened homecoming motion.
- **EIN**: "EIN:" with the number in CoFile Mono 28px on a Paper card.
- **"Progress on the state site"**: a disclosure; inside, a vertical list of steps with times in
  tabular CoFile Mono 13px and a 2px Stone line joining them; the run's mode in Slate.

### 10.21 Client links

Title "Send a client a link"; the lede; the link form in a Paper card; then "Links you sent" as a
table (For, Filing, Made, Status, and a "Turn off" small secondary button for open ones). Status
tones: "Waiting for the client" Marigold (it's the client's turn), "Used: open the filing" a Leaf
link, "Turned off" and "Expired" neutral. Empty: I2.

### 10.22 Requests from a text or email

- Title "Request by text message" (or email, Slack, WhatsApp, as the page words it), the "From …"
  line with the subject in Medium.
- **The message** comes first, shown as it arrived: the same Chalk Deep bubble as the home page's
  P3 (17/26), with the sender and time under it. On the page it lives in a "Your message"
  disclosure; I open it by default on desktop.
- **The match**: a Paper card with a 4px house band: "This looks like a request for: New Jersey LLC
  formation." with the filing type in Medium, the count line ("We filled in 4 answers from your
  message.") and "Open the filled-in form" as the house button. "Not this filing? Choose another" is
  a disclosure listing the types as links.
- Notices: "Already sent as a filing." (Leaf); the 30-day deletion notice (neutral).
- Illustration I10 appears beside the match card on desktop.

### 10.23 Signatures

Title "Saved signatures"; its lede; a table (Signer with email under it, Saved, Last used, and a small
destructive "Remove"); "No saved signatures yet." with I3 when empty; then "Add a signature" and the
signature form (section 11, signature pad).

### 10.24 Ready to pay

Title "Ready to pay"; its lede. Each card waiting is a Paper card: the card glyph (64 × 40px, last
four digits in Mono) and its name in 17px Medium; the filings waiting for it as a list (title link,
"approved, waiting since …" in 14px Slate); then the security-code field (the vault's field styled
as a 120px CoFile Mono input) and its button. The help line under the cards in 15px Slate. Empty:
I4 with "Nothing is waiting for a card right now."

### 10.25 Billing

Title "Billing". The plan panel: the plan name in title-2 with its status chip, the price, renews or
ends, and "Subscribe" or "Manage billing". "This month on …" as a usage meter: a 10px bar in
**Graphite** (billing is the firm's account with CoFile, so it wears CoFile's neutral, not the
house color), filled to filings used of the allowance, carried-over filings as a hatched segment,
the sentence beside it. Plan choices reuse the price card (section 11) with "Your plan" as a Leaf
chip and "Switch to this plan", "Choose this plan" or "Not available yet" as the button. The help
paragraph at 15/22 Slate. The registered-agent services panel as a card below.

---

### 10.26 The proof (the page the firm approves)

The firm approves the proof, on its desk and by email, and the proof wears the firm's own brand.
That matters even though the client never sees it: it's the firm's signature on the work, and it
should feel like signing off a return on the firm's own letterhead. It is rendered on the server
(`src/approvals/render.ts`), so every value below is an inline-able token, and the page must look
right with no JavaScript.

```
Phone (390), top to bottom                     Desktop: the same column, 680px, centered on Paper
┌▬▬▬▬▬▬▬▬▬▬▬▬▬ 4px house band ▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬┐
│ [logo] Harbor & Pine CPA     ▪ with CoFile │  nameplate, 64px
├────────────────────────────────────────────┤
│ ◌ Rehearsal: nothing will be filed or paid,│  Iris band, only for a rehearsal
│   even if you approve.                     │
├░░░░░░░░░░░░ house wash ░░░░░░░░░░░░░░░░░░░░┤
│ Two Sisters Bakery LLC …                   │  firm font 28/34 (34/40 desktop)
│ Filing reference 7f3c…. Please decide by   │  15/22, reference in Mono,
│ December 3, 2026, 5:00 PM Eastern. After … │  the deadline in Medium
├────────────────────────────────────────────┤
│ ┃ By approving, you confirm every detail   │  the consent note: 17/26,
│ ┃ below is correct and authorize …         │  3px house-ink rule on the left
│ ┃ Government sites don't save drafts, …    │
│                                            │
│ The state's review page                    │  firm font 21/28
│ This is a picture of the state's own …     │
│ ┌────────────────────────────────────────┐ │  the real screenshot, framed:
│ │      (the state's review page)         │ │  1px Pebble, radius 8; tap to open
│ └────────────────────────────────────────┘ │  full size
│ Filing details                             │
│ Social Security numbers are masked …       │
│ FORMATION                                  │  group header from the first segment
│ Business name    TWO SISTERS BAKERY LLC    │  label 15 Medium Slate / value Mono 16
│ Members › 1 › Name   Ana Ortiz             │  nested segments as a Slate prefix
│ …                                          │
│ State fees                                 │
│ Nothing is charged on this page. …         │
│ Formation filing fee            $100.00    │  tabular, right-aligned
│ NJ portal fee, by card            $3.50    │
│ ────────────────────────────────────────── │  1.5px Graphite
│ Total                           $103.50    │  600
│ ┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄ │
│ Maximum you authorize  $110.00 (if the …)  │  Medium, on a dashed rule
├▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬ house band ▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬┤
│ One-time code sent to you  [ _ _ _ _ _ _ ] │  Mono 22, letter-spaced
│ What should change? (Needed only if you    │
│ ask for changes)  [                     ]  │
│ [ Approve, and authorize submission and  ] │  house button, 56px, full width
│ [ payment                                ] │
│ [ Request changes                        ] │  secondary, 52px
├────────────────────────────────────────────┤
│ Questions: hello@harborpine.example        │  14 Slate
│ ▪ with CoFile                              │
└────────────────────────────────────────────┘
```

(The reference, the fee cap and the email in this sketch stand for whatever the filing carries.
Group headers like "FORMATION" are drawn from the payload's own keys and set in small caps,
not in all-caps letters.)

- **Ground**: Paper everywhere; the title band in the house wash, full bleed.
- **Nameplate**: the logo at the proof size from section 3.5; the firm's name in its font, 600
  17px; "with CoFile" at the right end for partner firms. A platform's white-label proof shows the
  platform's name and support contact and no CoFile mark, as it does today.
- **Rehearsal band**: Iris tint, Iris text 16/24 Medium, a dashed Iris tag before it. It replaces
  today's yellow note: a rehearsal is not a warning.
- **The consent note** is legal text that matters, so it is set at full body size (17/26), never
  small or grey, with a 3px house-ink rule on its left and 20px padding. The EIN sentences join it
  as the renderer adds them.
- **Filing details**: the renderer's rows, grouped visually where the label prefix changes: a
  group header in 13px Medium small caps, Slate, 24px above. Labels 15/22 Medium Slate (40% width
  on desktop; on phone the label sits above its value). Values in CoFile Mono 16/24, wrapping
  anywhere for long addresses. Stone hairlines.
- **State fees**: the same table with tabular figures right-aligned, the total in 600 under a
  1.5px Graphite rule, and "Maximum you authorize" on its own row under a dashed Pebble rule, its
  explanation in 15px Slate.
- **The decision card**: a Paper card under a 4px house band, 24px padding. The one-time code field
  (when required) in CoFile Mono at 22px with 0.3em tracking; the change field at 17px, 3 rows; then
  the buttons. "Approve, and authorize submission and payment" is the house button at 56px, full
  width on phone and 100% of the column on desktop (it's a long label and should never be squeezed);
  "Request changes" is a 52px secondary under it.
- **Phone helper**: once the reader has scrolled past "State fees", a 64px Paper bar with a Stone
  top hairline offers "Approve, and authorize submission and payment" fixed at the bottom of the
  screen, so the firm doesn't hunt for it on a long filing. It never appears before the fees
  have been on screen.
- **Approving** (motion): the button's fill sweeps a lighter house tint (240ms), the label is
  replaced by a three-dot progress (no new words), then the decision page loads. Where the browser
  supports cross-document View Transitions, the nameplate is a named element and holds perfectly
  still while the body cross-fades (240ms).
- **Decision page** (`renderDecisionPage`): the same top, the heading in the firm's font at 28/34,
  the paragraphs at 17/26. After an approval, illustration I9 in the house color sits above the
  heading at 120px; after a change request, nothing (it isn't a celebration).
- **Print**: a print stylesheet makes the proof a clean document a partner can file: nameplate and
  band at the top of page one, the firm name and filing reference in a running header, all
  details and fees, no form, no buttons, page numbers in the footer. Eleven-point body.
- **Dark mode**: follows the device. Ground Graphite 2; values Chalk Text; the screenshot keeps a
  white mat around it so the state's bright page doesn't glare; the house wash uses its dark
  derivation; the logo sits on its white plinth.

### 10.27 A page for each filing (`cofile.app/<firm>/<filing>`)

For example `cofile.app/bestaccounting/llc-filing-new-york`: a firm's permanent page for one
filing, which its clients open from an email, a text or the firm's own website. Phone first.

```
Phone
┌▬▬▬▬▬▬▬▬▬▬▬▬▬▬ 4px house band ▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬┐
│ [logo] Best Accounting        ▪ with CoFile │  white header, 64px
├░░░░░░░░░░░░░░ house wash ░░░░░░░░░░░░░░░░░░░┤
│ New York LLC formation                     │  firm font 28/34
│ Articles of Organization for a domestic    │  17/26 Slate
│ LLC, … After you send this, Best           │
│ Accounting checks every detail and fee …   │
├────────────────────────────────────────────┤
│ ◌ This page is in rehearsal for now. …     │  Iris notice (only if not live)
│ State filing fee $200, paid only after …   │  15/22
│ Fields marked * are required.              │
│ ┌ Name ──────────────────────────────────┐ │  each section a card
│ │ …                                      │ │
│ └────────────────────────────────────────┘ │
│ ┌ Authorizations ────────────────────────┐ │
│ └────────────────────────────────────────┘ │
│ Next, Best Accounting checks it and …      │
│ By sending, you agree to CoFile's Terms …  │  13/18 Slate
│ [        Send to Best Accounting        ]  │  house button, 56px
│ Questions about this form? Email …         │
└────────────────────────────────────────────┘
```

("Best Accounting" stands for the firm's display name; the slug in the brief's example is all the
copy gives us.)

- Paper ground, the client page layout (680px on desktop, centered, with the title band and header
  full bleed).
- The rehearsal notice ("This page is in rehearsal for now. …") is Iris, not yellow.
- Sections are Paper cards with a 1px Stone edge, legends in the firm's font; fields at 56px tall
  on phone (section 11) with 17px text.
- The submit label "Send to {firm}" is in the firm's font when it's a preset. The legal line
  ("By sending, you agree to CoFile's Terms of Service; …") at 13/18 Slate, its links underlined.
- **Sent**: the form is replaced by a confirmation panel: illustration I9 in the firm's color at
  120px, "Thank you, we have your details." in the firm's font at 24/30, and "Next, the firm checks
  every detail and approves the filing. Nothing is filed or paid until it does. You can close this
  page." at 17/26. The client's last impression is the firm's color, not ours.
- Desktop: the same column, with the header's nameplate at full client-page size.

### 10.28 The client link page (`/i/<token>`)

The same design as 10.27 with the link's label after the title in Slate ("New Jersey LLC formation
· Ana Ortiz"), its own lede ("After you send this, {firm} checks every detail and approves it.
Nothing is filed until they do.") and footnote, and the support line at the foot. Signing, when a
form needs it, uses the signature pad full width. Dead or used links show the neutral page from
10.14.

---

### 10.29 Platforms: the dashboard (`/dashboard`)

CoFile's own room, used by a platform's staff. It wears CoFile: graphite, chalk, the Open mark.
It shares the desk's shell (section 10.15) with CoFile's nameplate (Open mark and wordmark) in place
of a firm's, and a Graphite selection bar instead of a house one. Nav: Overview, Filings, Ready to
pay, Firms, API keys, Webhooks, Setup, Team, Billing (or Sign-ups for the platform's own account),
Docs.

- **Overview**: the account's name as the title. Notices as Your-turn cards (section 10.16). Three
  stat cards: "Filings" with the total in GT America Bold 40px tabular and the "… live, …
  rehearsals" line drawn as a 6px split bar (Leaf for live, Iris for rehearsals) above its words;
  "Webhook deliveries" with delivered, pending and failed; "API keys" with its count and "Manage
  keys". Then the three charts, "By status", "By state", "By month", as horizontal bars (12px tall,
  radius 2, values right-aligned in tabular figures): status bars in their status tones, state and
  month bars in Graphite, the current month in Graphite with the others at 45%. "As of …" in 13px
  Slate Mono.
- **Filings**: the firm filter select, then the table with the filing id under each title in Mono
  13px Slate and the Iris rehearsal chip.
- **Firms** and **a firm**: the list with ids in Mono; a firm's page with "Filing desk", "Public
  pages and website widget" (each page's address as a Mono pill with copy, the widget code in a
  code block) and "Invite staff".
- **API keys**: the table with key prefixes in Mono; a new key appears once in a Chalk Deep panel
  in Mono 17px with a copy button, beside the existing words about it being shown once.
- **Webhooks**, **Setup**, **Team**, **Billing**, **Sign-ups**: tables and forms from section 11.
  State portal logins list each portal by name with its connect form; nothing on screen ever shows
  a stored secret.

### 10.30 API docs (`/docs`)

```
Desktop (≥ 1360)
┌ header: ▢▪ CoFile    API docs   Dashboard ───────────────────────────────────────────────────┐
├──────────────┬───────────────────────────────────────────┬────────────────────────────────────┤
│ Overview     │ CoFile API                                │                                    │
│ Guides       │ File state business paperwork from your … │  ┌ curl ─────────────────────────┐ │
│  Authentic…  │                                           │  │ curl https://…/v1/filings \   │ │
│  Filings and │ Quick start                               │  │  -H "x-api-key: $COFILE_…"    │ │
│  the lifecy… │ 1  Get an API key from the dashboard.     │  └───────────────────────────────┘ │
│  …           │ 2  Set up the client company …            │                                    │
│ Reference    │ 3  Create a filing with "dryRun": true, … │                                    │
│  Endpoints   │ 4  Add a webhook endpoint …               │                                    │
│  OpenAPI     │                                           │                                    │
└──────────────┴───────────────────────────────────────────┴────────────────────────────────────┘
```

- Chalk ground; a 240px nav (section headers "Guides" and "Reference" in 13px Medium Slate small
  caps; links 15px, the current one with a Graphite bar); a 720px article at 17/28; from 1360px a
  right column where code blocks for the current section sit sticky. Below 1360px code sits inline.
- **Code blocks**: Graphite `#16191D` ground, radius 12, 20px padding, CoFile Mono 14/22, Chalk Text
  type. Syntax: keys `#C9C3FF`, strings `#9ED6B4`, numbers `#F2B65A`, comments `#8A9099`,
  punctuation `#A8AEB6`. A copy button top right `[copy needed: "Copy" and "Copied"]`.
- **Rehearsal in code**: wherever `"dryRun": true` or `/dry-run` appears, in prose or in a block, it
  is underlined with a 2px Iris rule and gets Iris tint behind it. Developers learn the same color
  language as firms.
- **Endpoints** (`/docs/reference`): each endpoint a section with its method chip and path in Mono
  20px. Method chips are outline Mono chips, 12px Medium: GET Slate, POST Graphite filled, PUT and
  PATCH Graphite outline, DELETE Brick outline. "Query", "Body" and "Responses" in 13px Medium small
  caps; status codes in Mono chips.
- **Guide cards** on the docs home: a two-column grid of Paper cards, title 18px Medium, summary 15px
  Slate.
- Tables (statuses, events, fees) use the product table.

### 10.31 The white-label hosted page (`/e/<account>/<firm>/<filing>`)

A platform's firm's page for one filing: exactly the design of 10.27, with that firm's nameplate,
house colors and font. CoFile's mark appears where the product shows it today and nowhere else.

### 10.32 The embed widget

The firm's form inside the firm's own website, in a frame. It must look as if the firm's web
designer built it.

- No header, no band, no page ground of its own: Paper with 16px padding, radius 12, and a 1px
  Stone edge so it sits cleanly on any site. The firm's font for headings; CoFile Sans for fields.
- The house button for "Send to {firm}"; the rehearsal notice in Iris when the filing isn't live.
- "Filed with CoFile" at the foot, 12px Slate, with the tag.
- Works from 300px to 720px wide; the frame resizes to its content as it does now. Light only,
  because the host page's theme can't be known.

### 10.33 Emails

**The template** (one system for every email):

| Part | Spec |
|---|---|
| Frame | 600px, centered; outer ground Chalk `#F5F3EE`; a Paper card with radius 12 where the client supports it; 32px padding (20px under 480px) |
| Top | A 4px band in the house color (a table cell's background), then the nameplate: the logo as a PNG at 2×, 40px tall, **always on a white plinth** so dark-mode inversion in mail apps can't ruin it, and the firm's name in 18px bold system sans |
| Body | 16/24 system sans, `#1B1F24`; headings 20/28 bold |
| Button | A bulletproof button (table cell plus VML for Outlook): house-button color, house-on label, 16px bold, 48px tall, radius 8, at least 220px wide. Under it, the fallback link in 13px Slate |
| Rehearsal line | When present, a full-width Iris-tint panel with Iris text, above the body |
| Foot | The support line ("Questions? Email …") in 13px Slate, then "with CoFile" (a 6px Graphite square cell plus text) for partner firms |
| Dark mode | `color-scheme: light dark`, explicit dark styles for the apps that honor them; the plinth protects the logo in the ones that invert |
| Preheader | Hidden preview text `[copy needed: one line per email]` |
| Plain text | Every email ships a plain-text part with the same words |

**The emails**

| Email | Brand | Subject (as the code has it) | Its one button | Design note |
|---|---|---|---|---|
| The proof is ready (to the firm) | The firm's | "Your proof is ready to approve: {filing}" | "Open your proof" | The firm's own nameplate. When the state's review page is attached, a 240px thumbnail of it sits above the button in a 1px Pebble frame |
| Documents back (completed) | The firm's | "Completed: {filing}" | The filing page link `[copy needed: a button label; it has none today]` | Each document listed as a row with a small page icon and its name, attachments noted as the body says |
| EIN issued | The firm's | `[copy needed: subject and body; no template exists yet]` | `[copy needed]` | The EIN set in Mono 28px on a Chalk Deep panel, the IRS letter as an attachment row |
| More information needed | The firm's | "More information needed: {filing}" | none | The missing items as a bulleted list |
| Changes requested | The firm's | "Changes requested: {filing}" | none | The comment quoted in a Chalk Deep panel |
| Rejected by the state | The firm's | "Rejected by the state: {filing}" | none | Brick rule on the left of the reason; never a red banner |
| Card security code needed | The firm's | "Card security code needed: {filing}" | "Enter security code" | The card glyph with its last four digits |
| Firm operations (choose a name, review before submit, site changed, failed, blocked, checking) | The firm's | As in `src/comms/render.ts` | "Choose a name" / "Review the filing" where present | The same template, body only |
| Confirm your email | CoFile's | "Confirm your email for CoFile" | "Confirm my email" | CoFile's nameplate: the Open mark and wordmark on Paper, a Graphite band, a Graphite button |
| Reset your password | CoFile's | "Reset your password" | "Choose a new password" | As above |
| Your partner account is open; Your CoFile account is ready | CoFile's | As in `src/users/routes.ts` | Their link | As above, with illustration I9 drawn in Graphite at 96px |
| Invited to a firm's filing desk | The firm's | "You're invited to {firm}'s filing portal" | Its link | The firm's nameplate; "with CoFile" in the foot |

The email to a client asking them to fill in a link is written in the firm's own mail app from
the Client links page, so it carries the firm's own email design, not ours.

---

## 11. Components

One library serves cofile.app, the desk, the client pages, the dashboard and the home page's
pictures. Every component reads the house tokens, so the same button is Graphite on cofile.app,
Pine on Harbor & Pine's desk and Ember on Northgate's.

### 11.1 Buttons

| Kind | Fill | Label | Border | Use |
|---|---|---|---|---|
| Primary (CoFile pages) | Graphite `#1B1F24`; hover `#2B3138`; pressed `#0F1215` | White | none | "Run a free rehearsal", "Create account", "Log in" |
| Primary (firm pages) | `--house-button`; hover 8% darker in OKLCH; pressed 14% darker | `--house-on` | none | "New filing", "Create the proof", "Approve, and authorize submission and payment", "Send to {firm}" |
| Secondary | Transparent; hover 4% Graphite (or house-ink) wash | Graphite (or house-ink) | 1.5px Graphite (or house-ink) | "See pricing", "Request changes", "Send a client a link" |
| Quiet | Transparent | Graphite, underlined on hover | none | "Log in" in the header, "Log out" |
| Destructive | Transparent; on confirm, Brick fill with white | Brick | 1.5px Brick | "Remove", "Turn off" |

| Size | Height | Padding | Label | Radius |
|---|---|---|---|---|
| Large | 56px | 0 28px | 17px Medium | 10px |
| Default | 48px | 0 22px | 16px Medium | 8px |
| Small | 40px | 0 16px | 15px Medium | 8px |
| Compact (tables only) | 32px | 0 12px | 14px Medium | 6px |

- Pressed: translate 1px down, 80ms. Focus: section 11.18.
- Busy: the label stays (the code already swaps in "Sending…", "Saving…") and a three-dot progress
  sits after it; the button keeps its width.
- Disabled: 40% opacity, no hover.
- Labels never truncate; long labels wrap to two lines and the button grows (Spanish, and "Approve,
  and authorize submission and payment").
- Full width on phone for every page's main action.

### 11.2 Links

Inherit the text color (Graphite, or `--house-2-ink` on firm pages), always underlined: 1px,
offset 3px, the underline at 45% of the text color, going solid on hover (160ms). "Next" links with
an arrow ("For firms", "How it works", "See all plans") are 18px Medium with a 16px arrow icon that
moves 3px right on hover. External links get the external-link icon at 14px.

### 11.3 Fields

| Part | Spec |
|---|---|
| Label | Above the field, 15/20 Medium Graphite, 8px gap. Required: a Slate asterisk after it (the form explains "Fields marked * are required.") |
| Input | 48px tall (56px on client pages on phone), 17px text, 14px horizontal padding, Paper fill, 1.5px Pebble `#8E9399` border, radius 8 |
| Hover | Border Graphite at 70% |
| Focus | Border 2px Graphite (house-ink on firm pages) and a 4px ring in the house wash (Chalk Deep on CoFile pages) |
| Help | Under the field, 15/22 Slate, max 64 characters a line |
| Error | Border 2px Brick; the message under it in 15px Brick after a 16px round "!" icon; the page's own error summary as a Brick notice at the top with links to each field |
| Values the state will see | The Mono variant: CoFile Mono 17px, for EINs, references, slugs, codes and API keys |
| Select | The same box with a 20px chevron; options in the native list |
| Textarea | Minimum 3 rows, resizable vertically, the counter ("120 / 500") in 13px Slate tabular |
| File drop | 120px tall, dashed 1.5px Pebble border, radius 12, an upload icon and the native button; a dragged file turns the border solid house-ink |
| Color | A 44px swatch button opening the picker, the hex in a Mono field, the nine ready colors as 32px rounded squares |

### 11.4 Choices

- **Checkbox and radio**: 22px, 1.5px Pebble border (radius 6 for checkbox, round for radio);
  checked fill Graphite on CoFile pages, the house color on firm pages, with a white glyph.
- **Choice rows**: for radios and yes/no fields with long labels, a full-width row (min 56px,
  16px padding, 1px Stone border, radius 10); selected rows take a 2px house-ink border and the
  house wash. "Yes" / "No" sit as two rows side by side.
- **Authorization rows**: as choice rows, with the statement at 17/26 and the whole row clickable.

### 11.5 Cards

Paper, radius 16 (12 inside dense desk pages), 24px padding in the desk and 32px on cofile.app,
`e1`. A card that leads a page (the proof-ready card, the match card) gets a 4px house band across
its top. Cards never nest more than one level.

### 11.6 Chips, squares and pills

- **Status chip**: 28px tall, radius 14, 13/16 Medium, 10px horizontal padding, a 10px glyph
  before the label: Leaf (a filled circle with a tick), Marigold (a half-filled circle), Brick (a
  filled circle with "!"), Slate (a hollow circle), Iris (a dashed circle). Tints and text from
  section 4.2. Labels are the product's own (`lib/status.ts`).
- **Status squares**: 12px squares (radius 2.5) for coverage: solid Leaf for Live, solid Iris for
  rehearsed, a 1.5px Pebble outline for recorded or offered, a dashed outline for planned. Always
  with an accessible label.
- **Source pills** (in the Requests picture and the forms filled from a message): 24px tall,
  radius 12, 12px Medium; "from the text" on house tint with house-ink text, "already filled" on
  the neutral tint.
- **Mono pills**: page addresses, ids, `/file`: CoFile Mono 14px on Chalk Deep, radius 6, 4px ×
  8px padding, with an optional copy button.

### 11.7 Notices

A rounded panel (radius 12, 16px × 20px padding, a 1px border in the tone at 30%) with a 20px icon
and the sentence at 16/24. Tones: information (Slate), someone's turn (Marigold), problem (Brick),
done (Leaf), rehearsal (Iris), from your message (house tint). The tone the product calls `warn`
splits in two: rehearsal notices become Iris, and only genuine "someone needs to act" notices stay
Marigold.

### 11.8 Price card and price strip

**Price card** (Pricing page, Billing):

```
┌─────────────────────────────┐
│ Starter                     │  title-2, 22/28 Medium
│                             │
│ $250  a month               │  48/52 Medium tabular + 18px Slate on the baseline
│ or $2,500 a year (2 months  │  15/22 Slate
│ free)                       │
│ ─────────────────────────── │  1px Stone
│ ▪ 6 filings a month         │  17/26, Graphite tags
│ ▪ $40 for each filing past  │
│   that                      │
│ ◉ A filing professional     │  20px portrait tile as the bullet
│   takes over when a filing  │
│   needs one                 │
│ [ Switch to this plan ]     │  Billing only
└─────────────────────────────┘
```

Paper, radius 16, 32px padding, `e1`, equal heights in a row. The emphasized card (Growth on the
Pricing page; "Your plan" on Billing) gets a 1.5px Graphite outline and rises 8px. On Billing, the
current plan carries the Leaf "Your plan" chip at the top right.

**Price strip** (home page): section 9.8. Four cells between 1.5px Graphite rules, the term in
title-1 tabular, its description in body Slate.

### 11.9 Tables

- Header row: Chalk Deep, 14/20 Medium Slate, sentence case, 44px.
- Rows: 56–60px, 16px text (15px in dense desk tables), Stone hairlines, a house-wash hover on firm
  pages and Chalk Deep hover on CoFile pages.
- Numbers right-aligned in tabular figures; dates in tabular figures in Slate.
- The first column holds the link, in Medium.
- Rows that need the firm: a 3px house bar on the left edge.
- Under 640px, every table becomes a list of cards (first column as the title, the rest as label and
  value pairs, chips on their own line).

### 11.10 Navigation

- **Site header** and **menu sheet**: section 9.0.2.
- **Desk sidebar** and **phone top bar**: section 10.15. The dashboard uses the same with CoFile's
  nameplate.
- **Docs nav**: section 10.30.
- **Back links** ("← Filings", "← Other filings", "All states"): 15px Medium with a 16px left
  arrow, above the title, 16px gap.
- **Steps** ("Step 2 of 3"): 13px Medium Slate above the title, plus three 24 × 4px segments, done
  ones filled with the house color.

### 11.11 The nameplate, the band and "with CoFile"

The nameplate (logo rules, monogram tile), the 4px band and "with CoFile" are components with the
rules in sections 3.4 and 3.5 built in; nobody places a firm's logo by hand anywhere in the
product.

### 11.12 The proof

Section 10.26. Built twice from one set of tokens: as the server-rendered page and as the React
component behind the home page's picture P4 and the Branding preview, with a visual test that
keeps the two identical.

### 11.13 Stage track

Tags (14px, the last stage 18px) joined by a 2px line; done in the house color, current ringed with
a 2px house-ink ring and 2px Paper gap, future as a Pebble outline. Labels 13/18 Medium under each
tag, centered; on phone, longer tracks turn vertical with labels to the right.

### 11.14 Accordion

Section 10.7: 72px rows, 20/28 Medium questions, a plus that turns into a minus, Stone hairlines,
the open answer at 18/29. Built on `details` and `summary` so it works without JavaScript.

### 11.15 Code blocks

Section 10.30: Graphite `#16191D`, radius 12, CoFile Mono 14/22, a copy button, Iris marking for
`"dryRun": true`. Inline code: CoFile Mono at 0.92em on Chalk Deep, radius 4, 2px × 5px padding.

### 11.16 Documents

Paper thumbnails at Letter ratio with the generic faces from section 7.2: 96 × 124px in lists,
190 × 246px in pictures. A 1px Stone edge, radius 3, `e2` when fanned. The label under the
thumbnail, never on it.

### 11.17 Signature pad

A Paper area 180px tall (140px on phone), full width, 1px Pebble border, radius 12. A 1px Pebble
baseline at 72% of the height with a 14px "×" glyph at its left end in Slate. Ink is Graphite, a
2.5px pressure-smoothed stroke. A small secondary "clear" button at the top right (label as the
component has it). The consent statement under it as an authorization row.

### 11.18 Focus and states

- **Focus ring**: a 2px outline in Graphite (house-ink on firm pages; Chalk Text on dark), offset
  2px, on every interactive element, shown for keyboard focus (`:focus-visible`). Never removed.
- **Hover**: 160ms; never the only way to see something.
- **Selected**: the house wash plus a 3px house bar (desk) or a 2px house-ink border (choices).
- **Loading**: skeleton bars in Chalk Deep with a slow 1.6s shimmer (off with reduced motion) for
  lists; a three-dot progress for buttons.
- **Empty**: an illustration from section 7.4, the page's sentence, its buttons.

---

## 12. Craft notes

**Dark mode.** cofile.app, the desk, the dashboard and the docs follow the device, with a manual
choice stored per viewer (`data-theme`). Client pages and the proof follow the device too. House
colors never invert: the band and the hero's Pine field stay their exact hex; text and links use
the dark ink derivation; washes mix over Graphite 2. Logos always sit on a white plinth in dark
mode unless the firm one day uploads a dark version. The Rehearsals band is the one section that is
dark in both modes; in dark mode it lifts to Graphite 2 with a stronger Iris glow so it still reads
as a stage. Photographs get no filter in dark mode; their captions switch to Slate Dark.

**Phones.** Clients are mostly on phones, and so are firm owners between meetings. Every page works
at 320px with 20px margins and no sideways scrolling; text comes before its picture; main buttons
go full width at 56px; fields are 56px tall on client pages, with 17px text so iOS doesn't zoom;
tap targets are never smaller than 48px. The proof's fixed approve bar appears only after the fees
have been seen. Pictures are designed at phone size, not shrunk: the desk shows its real phone
layout, and the proof is the real phone proof.

**Older eyes.** Body text is 18px on cofile.app and 17px on client pages and the proof; nothing a
person must read is under 15px (chips at 13px are always read with their glyphs and context).
Graphite on Chalk is 14.9 : 1, Slate is 5.7 : 1, and no reading text uses a weight under 400 or a
grey lighter than Slate. Links are always underlined. Sentence case everywhere. Line height is at
least 1.5 for body text. Everything holds at 200% zoom without sideways scrolling. Motion never
carries meaning on its own.

**Spanish.** Plan for Spanish running 20–30% longer. No fixed-width buttons, chips or nav items;
buttons wrap to two lines; the header nav folds into the menu as soon as it doesn't fit; headlines
use balanced wrapping, and the hero's display-1 clamps down so "Say yes, under your own name." in
Spanish still sits on two lines on desktop. Price cells and tiles grow in height, never squeeze
type. Mono values (business names, addresses) are the client's own data and wrap anywhere. Every
picture's text is live text, so pictures translate with the page. GT America and every firm font
preset cover the Spanish accents and ñ; the house font upload checks for them `[copy needed: a
message if an uploaded font lacks them]`.

---

## 13. Production

### 13.1 Tools

- **Figma** for the system and all page designs, with variables for every token and **variable
  modes per house** (CoFile, Harbor & Pine, Northgate, and the 24 QA firms) and per theme, so any
  frame can be switched into any firm's brand with one click.
- **The house engine** as a small TypeScript package (OKLCH derivations, contrast checks, logo trim
  and classification, monogram generation) used by the web app, the proof renderer, the email
  renderer and a Figma plugin, so design and product compute the same colors.
- **Storybook** for every component, with a house switcher and a theme switcher in the toolbar;
  visual regression tests run each component across all 26 houses in light and dark.
- **Playwright** screenshots of every page in a few houses at 320, 390, 768, 1024 and 1440px, plus
  a Spanish pseudo-locale (+30% length) pass.
- **Accessibility**: axe in CI, plus manual screen-reader passes on the proof, the client form and the
  home page pictures.
- **Photography**: shot tethered with a digital tech, color-checked against the Pine and Ember
  swatches printed on the set.

### 13.2 Asset list

| Group | Assets |
|---|---|
| Identity | The Frame and Tag mark (Open, Worn, Mono, Reverse, Tag only) as SVG; the wordmark (regular and small-size masters) as SVG and outlined; the lockup; "with CoFile" as a coded component and as email cells; favicon set (16, 32, 48 ICO, 180, 192, 512, maskable 512, SVG with a dark media query); the social card (1200 × 630, Chalk, the Open mark, room for one line of existing copy) |
| Type | GT America Standard (Regular, Medium, Bold) and GT America Mono (Regular) web, app and desktop licenses, with a white-label clause covering firm pages served from cofile.app; metric-matched fallbacks |
| Example firms | Harbor & Pine CPA: logo (mid, symbol-only, monogram), color sheet, door vinyl artwork, letterhead and business-card artwork for the printer's proof shoot, pocket folder, mug. Northgate Payroll: wide wordmark, symbol, office props. QA firm logos (five), plus the 18 hostile cases |
| Photography | P1–P10 from section 7.3 plus the alternate P5 frame for For firms, each delivered as retouched masters and in the crops listed; screen-replacement renders for P3 and P4 |
| Illustration | I1–I12 from section 7.4 as SVG with `currentColor` fills |
| Icons | About 40 icons at 20 and 24px (section 7.5) |
| Pictures (code) | P1 desk, P2 one page two houses, P3 text reads in, P4 proof, P5 homecoming, P6 state tiles, P7 run sheet with screen ghosts, the price strip, the empty frame, the round trip (How it works), underneath (For platforms) |
| Generic objects | Six document faces (certificate, EIN letter, receipt and three others), thirteen screen ghosts, the card glyph |
| Templates | The email template (section 10.33), the proof renderer's styles, the print stylesheet |
| Texture | The 256px blue-noise grain tile |

### 13.3 What to commission

1. **A type studio's custom-lettering team**: the wordmark (both masters) and final drawing of the
   mark, to the construction in section 3.1.
2. **A brand-identity studio** that has designed for professional services: Harbor & Pine CPA's and
   Northgate Payroll's complete identities, the props for the shoot, and the five QA firm logos
   (deliberately varied: a serif monogram, a sans wordmark, a JPEG on a box, a script, a tiny square).
3. **A documentary portrait photographer** with producer, casting director, set and prop stylist,
   digital tech and retoucher: the shot list in section 7.3, two shoot days in New Jersey and New
   York and one in Florida, plus a day with CoFile's own filing professionals.
4. **An illustrator** working in simple geometric line: I1–I12 and the icon set, drawn to the
   mark's geometry.
5. **An interactive developer with motion craft** (or our own front-end team with a motion
   designer's direction): the eleven code pictures and their motion, as live components.
6. **An accessibility consultancy**: an audit of the proof, the client form and the desk, and
   moderated sessions with firm owners over 55 and with Spanish-speaking clients on their own phones.
7. **Research**: six to eight firm owners to react to the home page's pictures in their own brand
   (we load their real logo and color into the house engine for the session) before the build is
   final.

### 13.4 Build order

1. **Foundations**: tokens, the type licenses and fallbacks, the house engine (with its tests), the
   nameplate and "with CoFile" components, the mark and wordmark.
2. **The proof** (server renderer and component, plus print) and **the proof email**: the page the
   firm signs, and the first thing a firm judges.
3. **The client's pages**: the page for each filing, the client link page, the embed widget, their
   confirmation states and dead ends, and the client-facing emails.
4. **The desk**: the shell, Filings, Branding (with the live kit preview), Setup, New filing and the
   form, the filing record.
5. **The home page**: the eleven pictures as live components with sample data first, then layout,
   then the shoot's photographs, then motion last.
6. **The pages behind it**: How it works, For firms, What we file, Pricing, Security, Questions, For
   platforms.
7. **Account pages**: sign-up with the nameplate preview, log-in, password, verification, Terms,
   Privacy, 404 and errors.
8. **The remaining desk pages**: client links, requests, signatures, Ready to pay, billing.
9. **Platforms**: the dashboard, the docs, the hosted page.
10. **All remaining emails**, then the dark mode, Spanish, older-eyes and phone passes across
    everything, and the house QA gallery run before launch.

---

## 14. What I'd strip from today's visuals, and why

| Today | Why it goes |
|---|---|
| **The manila folder-tab mark with a check cut into it** (`FolderTab`, the `.seal` class) | It says paperwork and approval stamp, the wrong story: a filing service's mark, not a firm's. The new mark makes room for the firm and puts CoFile in the corner |
| **The paper-and-ink palette** (the cream grounds, the manila and the warm off-whites, `#F7F3EA` and `#FFFDF8` on the proof, `#FBEFD5` notes) | Cream tints every firm's color yellow and makes every firm look like it's on old parchment. Firm pages need a true white so the house color reads as the firm chose it |
| **Three typefaces** (Source Serif 4, IBM Plex Sans, IBM Plex Mono) | Too many voices, and IBM Plex Sans and Source Serif are both in the firm font menu, so CoFile and a firm could look identical. One family with one mono, not in the menu |
| **The green ticks on every list** (`Tick`) | Repetitive, and a check on every line reads as verification, not benefit. Small Graphite tags carry lists in CoFile's voice and leave color to the firms |
| **Rehearsals shown as yellow warnings** (`notice warn`, the `nx-reh` chip) | A free rehearsal is the offer. It gets Iris, a calm invitation, everywhere it appears |
| **The fixed green `#1F6B4F` and blue `#1f4fd1` buttons** on the proof and in emails | They are CoFile's colors imposed on the firm's pages. Every button on a firm page is the firm's color, through the house engine |
| **`textOn()`'s luminance threshold** for button text | It picks white or black by a cut-off, not by contrast. The engine checks the real ratio and derives a legible button in the firm's own hue |
| **CoFile's name leading the partner desk's top bar**, with the firm's logo squeezed in on the right | The copy says the desk carries the firm's name, logo and color. The firm's nameplate leads; CoFile moves to the foot of the sidebar |
| **The single brand bar and a logo capped at 40 × 160px** on the proof | Logos come in every shape. The nameplate trims, classifies and tiles them so each one looks intended |
| **The sample visuals as tables in boxes** (the stand-ins in `Visuals.tsx`) | They describe the pictures without showing them. Each becomes a live, finished picture of a firm's real working day |
| **Mono-everything** (every value, label and log line in IBM Plex Mono) | Mono now means one thing: what the state will see. Everything else is in the sans |
| **Uppercase, letterspaced labels and kickers** | Hard for older readers. Sentence case everywhere; only the state's own values are in capitals |
