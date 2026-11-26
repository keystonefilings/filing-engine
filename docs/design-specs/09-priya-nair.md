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
