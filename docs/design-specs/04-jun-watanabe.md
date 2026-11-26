# CoFile website design spec: The Tally Seal

**Designer:** Jun Watanabe, interaction design, Tokyo
**For:** the CoFile build team (cofile.app, api.cofile.app)
**Date:** November 26, 2026
**Scope:** every public page, the partner filing desk, client pages and the proof, the enterprise dashboard, white-label and embed surfaces, developer docs, emails

All headlines, body text, labels and status names in this document are quoted from the repository as it stands today. Where I think a word should change, I say so only in the appendix, "Copy notes". Where a surface needs words that don't exist yet, I mark the slot `[copy needed]` and leave it empty.

---

## 1. Who I am, and how that shapes this design

I trained in industrial design, so I still think in materials: paper weight, the give of a button, the sound a drawer makes when it closes. Then I spent ten years designing mobile banking apps for Japanese banks, mostly transfers and account opening. In that work, the most important screen in the app is the confirmation screen and the most-read screen is the completion screen. Everything I believe about CoFile comes from those ten years:

1. **An irreversible act deserves a ritual, not a warning.** A Japanese bank transfer has a rhythm: enter, confirm, execute, complete. Each step looks different, so people slow down without being told to. CoFile's proof is a confirmation screen for something you can't take back. It needs the same rhythm, made with layout and motion, not with red text.
2. **Every state is a screen.** The failures I fixed were almost never on the screens people drew. They were in the pending second after a tap, the expired link, the half-finished state when the network dropped. In this spec I draw the states, then the transitions between them.
3. **Calm is a feature.** People with law or money on the line want quiet pages. I practise *ma*, meaningful empty space: one idea at a time, room around it, nothing moving unless something happened.
4. **The phone comes first.** The client approves the proof on a phone, often standing up, sometimes in Spanish, sometimes with reading glasses on the table in the other room. I design at 375 px first and test at 320 px. The desktop is the phone with room to breathe.

## 2. The concept: the tally seal

In Japanese offices, when two copies of an agreement are made, one seal is pressed across the edge where the two sheets overlap. This is *wariin* (割印), the tally seal. Each sheet keeps half of the impression. Years later you put the sheets side by side. If the halves line up, the papers belong together and nothing has been swapped. If they don't, something changed.

CoFile's whole promise is that kind of matching. One half is **the proof**: what the client saw and approved. The other half is **the state's own review page**, read again at filing time. When the halves match, CoFile goes ahead. When anything differs, it stops before paying. "Checked twice. Filed once." is a tally seal written as a sentence.

So the design hangs on one idea: **two halves that must match.** It works at every scale:

| Scale | How the idea shows |
|---|---|
| The mark | A square company seal cut top to bottom by a stepped seam: two identical halves that fit only each other. |
| The page | A *seam*: a fine vertical rule that runs between what goes out and what comes back (the proof and the state's page, the text message and the draft, the approved and the filed). |
| The approval | When the client approves, a round seal lands across the seam between the proof and the record. Half stays with the client's copy. Half travels with the filing. |
| The timeline | When CoFile reaches the state's review page and it matches, the two halves visibly close up. If they don't match, they stay apart, and the filing stops. |
| Coverage | Each filing type shows how much of its seal it has earned, from an empty ring to a full one. |

Why this fits CoFile and not another company: it doesn't decorate the product, it *explains* its mechanism. A 60-year-old CPA understands "the halves must match" without knowing anything about browser automation. A developer reads it as a checksum. And because it is a shape and a motion, not a color, it survives being placed under thousands of firm brands.

One detail of the tradition does real work. In Japan, a company's seal is square (*kakuin*) and a person's seal is round (*maruin*). CoFile is a company, so its mark is square. The client's approval is a person's act, so the approval seal is round. On a firm's pages the round seal carries no CoFile branding at all. Ours stays square, small and in the corner.

## 3. Brand identity

### 3.1 The mark: the Kaku

The mark is a square seal cut by a stepped seam. Draw it on a 32 × 32 unit grid (1 unit = 1 px at 32 px).

```
Raster at 1 character = 1 unit across, 1 row = 2 units down:

   0         1         2         3
   01234567890123456789012345678901
 2   ███████████  ███████████████
 4   ███████████  ███████████████        body: 28 × 28 units,
 6   ███████████  ███████████████        corner radius 4
 8   ███████████  ███████████████        (corners not shown)
10   ███████████  ███████████████
12   ███████████  ███████████████        seam: 2-unit channel,
14   ███████████      ███████████        centerline (14,2) → (14,16)
16   ███████████      ███████████        → (18,16) → (18,30)
18   ███████████████  ███████████
20   ███████████████  ███████████        the two halves are the
22   ███████████████  ███████████        same shape turned 180°
24   ███████████████  ███████████
26   ███████████████  ███████████
28   ███████████████  ███████████
```

- **Body.** A square from (2, 2) to (30, 30), corner radius 4 units, true circular arcs (not a squircle: this is a carved stone, not an app icon).
- **Seam.** A 2-unit channel cut through the body. Its centerline runs from (14, 2) down to (14, 16), steps right to (18, 16), then runs down to (18, 30). The channel is cut away (transparent), never painted, so the mark sits on any background.
- **Symmetry.** The two halves are the same shape turned 180°. The left half is 11 units wide at the top and 15 at the bottom; the right half is the reverse. This is the point of the mark: the two documents are the same document.
- **Corners of the step.** The two inside corners of the step get a 0.75-unit radius, as if cut with a round chisel. The ends of the channel at the top and bottom edges are cut square.
- **Optical sizes.** *Plain* (16 to 47 px): as above; at 16 px the channel widens to 2.5 units and the step snaps to whole pixels. *Carved* (48 px and up, print): add a rim, a 1-unit transparent line inset 2.5 units from the edge, broken where the seam crosses it, and use the scanned stone edge (see 7.2) instead of the clean vector outline.
- **Color.** Ai indigo `#1F3B70` on light grounds; Kami white `#FCFBF8` reversed on indigo or on dark grounds; Sumi `#1C1C1A` for single-color print and fax. Both halves are always the same color.

### 3.2 The wordmark

"CoFile", set in Newsreader Display Medium (weight 500, optical size 72), then redrawn by a type designer so it is ours:

- The dot on the **i** is a small square, 0.9 × the stem width, aligned to the x-height grid: a seal in miniature.
- The terminals of **C** and **e** are cut vertically, the same angle as the seam, instead of the default angled cut.
- Tracking +0.5% at display sizes, +2% below 14 px cap height.
- Color: Sumi ink. The mark carries the color; the word never does.

### 3.3 Lockups and rules

| Lockup | Use | Geometry |
|---|---|---|
| Horizontal | Header, emails, docs, dashboard | Mark height = 1.45 × wordmark cap height. Gap = 0.4 × mark height. The step of the seam lines up with the middle of the x-height, so the step points into the word. |
| Mark alone | Favicon, app icon, avatar, social | 16 px minimum on screen, 6 mm in print. App icon: the carved mark centered on Kami white, at 62% of the tile. |
| Stacked | Social cards, print only | Mark above, wordmark centered below, gap 0.3 × mark height. |

Clear space is half the mark's height on every side. Never: rotate the mark, pull its halves apart (the 404 page is the one deliberate exception, 10.2), color the two halves differently, add gradients, shadows or outlines, place it inside a firm's color, put it on a firm's page anywhere other than the "with CoFile" note, or pair it with another company's mark in a lockup.

### 3.4 The approval seal: the Maru

The round seal is not a logo. It is a system component that records a person's decision, and it never carries the CoFile name.

- A circle, 88 px across at its full size on the decision page, 20 px in lists and timelines.
- An outer ring 3 px (at 88 px), an inner ring 1 px, 5 px inside it.
- In the field: the status word, set in Atkinson Hyperlegible Next Bold, 15 px, letter-spaced +4%, on one line ("Approved"), with the date below in the mono face at 11 px ("Dec 2, 2026"). The date is data, not copy.
- A vertical seam runs through the middle, 2 px wide, exactly like the Kaku's seam but straight. In the approval moment (8.3) the two halves of the Maru sit on two different sheets.
- Ink: Matsuba green for an approval of a filing that will be filed; Kohaku amber with a dashed outer ring for a rehearsal, with the word "Rehearsal" in the field. These are status colors, fixed in every theme; a firm can't change them.
- Texture: each impression is masked by one of 30 hand-pulled ink grains (7.2), chosen by a hash of the filing reference, so the same approval always shows the same impression and no two filings look stamped by a machine.
- The seal is a picture of a decision, not the decision's words: it is `aria-hidden`, and the page's heading ("Approval recorded") carries the meaning. The status word may be split by the seam; that is the point of a tally seal, and nobody needs to read it from the seal alone.

### 3.5 The "with CoFile" note

On a firm's pages, CoFile appears only as a small "with CoFile". I design it as a note, not a logo:

- Atkinson Hyperlegible Next, 13 px / 18 px, weight 400 for "with" and 600 for "CoFile", in Usuzumi (`#4D4B46` light, `#BDB8AD` dark): 7.9:1 and 9.2:1 on the page, because small text still has to be readable.
- A 10 px Kaku sits before the words, in the same Usuzumi, never in indigo, never in the firm's color.
- Placement: on phones, centered under the last element on the page, 32 px below it. From 600 px up, also at the right end of the firm's brand bar. On the proof, once only, under the decision area.
- In the embeddable widget the text is the existing "Filed with CoFile", same style.
- It is a link only on pages CoFile owns. On the proof and intake it is plain text: a client mid-approval should never be sent away to a vendor's homepage.

### 3.6 The voice of the visuals

Washi paper, sumi ink, one indigo, and the status inks. Hairlines, not boxes. Flat paper with real but shallow layering. Type does most of the work. If a page feels empty, that is usually the design working.

## 4. Color

### 4.1 Principles

1. **Action and status are different jobs.** Today green means "approved", "live" *and* "the button that moves a filing forward". That breaks the day a firm with a red or green brand sets its button color. In my system the action color is whatever brand owns the page (CoFile's indigo, or the firm's color), and it never means a status. Status colors are fixed across every theme and always come with a glyph and a word.
2. **One accent per page.** Indigo, or the firm's color. Never both.
3. **Paper, not white.** The ground is a warm, slightly gray washi so that pure white (`#FCFBF8`) can mean "a sheet lying on the desk": the proof, a card, a form.

### 4.2 Core tokens

The palette uses traditional Japanese color names because they describe materials, which is how I want the team to think about them.

| Token | Name | Light | Dark | Use |
|---|---|---|---|---|
| `--paper` | Washi | `#F5F3EE` | `#161614` | Page ground |
| `--sheet` | Kami | `#FCFBF8` | `#1F1E1B` | Cards, the proof, form sheets |
| `--sunken` | Suzuri | `#ECE9E1` | `#121210` | Code blocks, inset wells, table header band |
| `--ink` | Sumi | `#1C1C1A` | `#ECE9E1` | Text, primary icons |
| `--ink-2` | Usuzumi | `#4D4B46` | `#BDB8AD` | Secondary text, labels, "with CoFile" |
| `--ink-3` | Nezumi | `#6B6862` | `#979288` | Hints, timestamps, placeholders |
| `--line` | Hairline | `#DAD6CC` | `#34322D` | Dividers, the seam (decorative only) |
| `--line-field` | Field edge | `#8C877C` | `#77736A` | Input borders, checkbox outlines (3:1 rule) |
| `--ai` | Ai indigo | `#1F3B70` | `#93ACE0` | CoFile's action color, links on CoFile pages |
| `--ai-press` | Kon | `#142A55` | `#B4C6EA` | Pressed state of indigo |
| `--on-ai` | | `#FFFFFF` | `#0F1422` | Text on indigo |
| `--ai-tint` | Asagi wash | `#E6EAF3` | `#1C2338` | Selected rows, current nav item |
| `--kihada` | Kihada | `#F6E7A6` | `#4A4020` | Highlighter behind values typed into the state's page |
| `--focus-inner` | | `#FCFBF8` | `#161614` | Focus ring, inner 2 px |
| `--focus-outer` | | `#1C1C1A` | `#ECE9E1` | Focus ring, outer 2 px |
| `--scrim` | | `rgba(28,28,26,.40)` | `rgba(0,0,0,.60)` | Behind bottom sheets |

### 4.3 Status inks

Five tones, each with a glyph drawn from the seal (section 9.4). The glyph and the word carry the meaning; the color confirms it.

| Tone | Name | Text / glyph light | Wash light | Text / glyph dark | Wash dark | Means |
|---|---|---|---|---|---|---|
| Done | Matsuba (pine) | `#22654A` | `#E2EEE7` | `#7CC4A0` | `#15291F` | Approved, Live, Submitted to the state, Accepted by the state, EIN issued, Completed |
| Held | Kohaku (amber) | `#83570C` | `#F6EBD3` | `#E2B35E` | `#2E2412` | Rehearsal, a rehearsal's planned hold ("held, on purpose"), Rehearsed to the payment screen |
| Stop | Beni (red) | `#A8281D` | `#F8E3DF` | `#F08B7F` | `#331A17` | Needs correcting, Paused: state site changed, Rejected by the state, Failed, Stopped |
| Your turn | Nezu-ai (indigo gray) | `#4A5670` | `#E7E9F0` | `#A9B4CE` | `#1E2230` | Waiting for approval, Needs information, Changes requested, Name unavailable, On hold, Being checked |
| In motion | Nezu-ai | `#4A5670` | none | `#A9B4CE` | none | Received, Queued, Getting the state's review page, Filing now, Final check |

### 4.4 Contrast (measured, WCAG 2.x)

| Pair | Light | Dark |
|---|---|---|
| Ink on paper / on sheet | 15.4 / 16.5 | 14.9 / 13.7 |
| Ink-2 on paper | 7.9 | 9.2 |
| Ink-3 on paper (smallest allowed: 14 px) | 5.0 | 5.9 |
| Ai on paper (links) | 9.9 | 8.0 |
| On-ai on ai (button text) | 10.9 | 8.1 |
| Matsuba on its wash | 5.8 | 7.5 |
| Kohaku on its wash | 5.3 | 7.9 |
| Beni on its wash | 5.7 | 6.7 |
| Nezu-ai on its wash | 6.1 | 7.6 |
| Field edge on sheet (non-text, needs 3:1) | 3.5 | 3.5 |
| Ink on Kihada highlight | 13.7 | 8.5 |

Every text pair passes AA at any size; the proof's body text passes AAA (7:1). The status hues sit far apart in OKLCH (Matsuba 163°, Kohaku 73°, Beni 29°, Nezu-ai 265°) and also differ in lightness and glyph, so they stay apart for the common color-vision deficiencies. I will run the full set through deuteranopia, protanopia and tritanopia simulation before sign-off; the glyphs make it pass even if a pair merges.

### 4.5 Dark mode: Sumi night

Dark is not inverted light. The ground is the gray-black of an inkstone (`#161614`), sheets are a step lighter, and shadows are replaced by a 1 px lighter edge on the top of a sheet. Status colors brighten and their washes darken so text-on-wash stays above 6.5:1. Three things never go dark: the state's review page (it is a picture of a light web page, so it sits on a Kami plate with a 1 px `--line` frame), the signature pad (ink must look like ink), and the client's logo when it has no dark version (it sits on a small light plate, see 11.4).

## 5. Typography

### 5.1 Faces

| Role | Face | Why |
|---|---|---|
| **Desk voice** (UI, body, labels) | Atkinson Hyperlegible Next, variable 200 to 800 (Braille Institute) | Designed for low-vision readers: open apertures, distinct I, l and 1, distinct 0 and O. Our readers are 40 to 65 and on phones. It covers Spanish fully. And it is open-licensed, which matters more than it seems: it loads on thousands of firm pages, client links and embeds with no per-domain licence to track. |
| **Paper voice** (headlines, the filing's name on the proof, legal pages) | Newsreader (Production Type), variable with optical sizes 6 to 72 | A calm text serif with real optical sizes, so a 64 px headline and a 26 px proof title are each drawn for their size. Open-licensed for the same reason. |
| **Record voice** (fees, codes, references, EINs, values sent to the state, API) | Atkinson Hyperlegible Mono | Every character is unambiguous, which is a safety feature when a client checks "07302" or an EIN. Same family as the desk voice, so it sits on the same line without looking pasted in. |

The rule the team should remember: **the desk speaks sans, paper speaks serif, and anything the state will read is in the record voice.**

A firm's chosen font replaces the desk and paper voices on its own pages (section 11). It never replaces the record voice: exact characters are not a branding decision.

### 5.2 Scale

Sizes in px; line height after the slash. Phone is the default; desktop applies from 900 px.

| Token | Face, weight | Phone | Desktop | Tracking | Used for |
|---|---|---|---|---|---|
| `display` | Newsreader 450, opsz 72 | 38/42 | 64/68 | -1.5% | Home H1 only |
| `section` | Newsreader 450, opsz 48 | 30/36 | 44/50 | -1% | Home section headlines |
| `title` | Newsreader 500, opsz 36 | 26/32 | 32/38 | -0.5% | Page titles, the proof's filing name |
| `heading` | Atkinson 700 | 19/26 | 20/28 | 0 | Card and block headings |
| `lede` | Atkinson 400 | 19/30 | 21/33 | 0 | Section ledes, the hero sub |
| `body` | Atkinson 400 | 17/27 | 17/27 | 0 | Default reading text |
| `body-proof` | Atkinson 400 | 18/28 | 18/29 | 0 | Everything on the proof |
| `body-desk` | Atkinson 400 | 16/24 | 16/24 | 0 | Dense desk and dashboard tables |
| `label` | Atkinson 600 | 16/22 | 16/22 | 0 | Field labels |
| `small` | Atkinson 400 | 15/22 | 15/22 | 0 | Help text, notes |
| `caption` | Atkinson 400 | 14/20 | 14/20 | +0.5% | Captions, legal footer: the smallest reading size |
| `note` | Atkinson 400/600 | 13/18 | 13/18 | +1% | "with CoFile", chip text only |
| `record` | Mono 400 | 16/24 | 16/24 | 0 | Values on the proof and in tables |
| `fee` | Mono 500 | 17/24 | 17/24 | 0 | Fee lines |
| `fee-total` | Mono 600 | 28/32 | 32/36 | -1% | Total to the state |
| `code` | Mono 400 | 14/22 | 14/22 | 0 | Docs code, API keys |
| `kicker` | Atkinson 600 | 14/20 | 15/22 | +2% | The hero kicker, section numbers |

No uppercase anywhere in our own text. The only capitals-only strings are values as the state receives them ("TWO SISTERS BAKERY LLC"), and those are set in the record voice so it is clear they are the state's, not ours. Headlines use `text-wrap: balance`, body uses `text-wrap: pretty`.

### 5.3 Numerals and money

- Every dollar amount is in the record voice, with tabular figures, right-aligned, decimals on one vertical line, the "$" hanging into the left gutter so the digits align.
- Totals: a 1 px rule above in `--ink`, then `fee-total`. Never bold-and-colored; the size carries it.
- Slashed zero is on in the mono face (its `zero` feature), so "$100.00" never reads as letters.
- Dates are written in words, never numerals only: "Dec 3, 5:00 PM Eastern", as the copy already does.

## 6. Layout

### 6.1 Breakpoints and grid

| Name | Width | Columns | Side margin | Gutter | Notes |
|---|---|---|---|---|---|
| `xs` | 320 to 599 | 4 | 20 (16 below 375) | 12 | The design width is 375. Safe-area insets added to margins. |
| `sm` | 600 to 899 | 8 | 32 | 16 | Large phones, small tablets, the embed in a narrow column |
| `md` | 900 to 1199 | 12 | 40 | 20 | Tablets in landscape, small laptops |
| `lg` | 1200 to 1599 | 12 | auto | 24 | Content max 1152 |
| `xl` | 1600+ | 12 | auto | 24 | Same max; the extra width is *ma* |

Reading measures: ledes 34em, body 38em, the proof column 640 px max, forms 560 px max. Tables may run wider.

### 6.2 The seam

The seam is the layout's signature. It is a 1 px `--line` vertical rule with a 4 px gap every 12 px (a perforation), placed:

- on the home page from `md` up, between the copy column (columns 1 to 6) and the exhibit column (columns 8 to 12), with column 7 left empty;
- on the proof, between the proof and its record (after approval);
- on the filing detail, between "approved" and "filed" in the timeline;
- on phones, turned horizontal: a perforated rule between the copy and the exhibit.

It is decorative and hidden from assistive technology.

### 6.3 Spacing

A 4 px base. Names are steps, not pixels, so they can scale.

| Token | px | Typical use |
|---|---|---|
| `s1` | 4 | Icon to label |
| `s2` | 8 | Chip padding, tight stacks |
| `s3` | 12 | Label to field |
| `s4` | 16 | Field to field, card padding on phones |
| `s5` | 24 | Card padding from `sm`, block to block |
| `s6` | 32 | Group to group |
| `s7` | 48 | Sub-sections |
| `s8` | 64 | Page title to content |
| `s9` | 96 | Home sections on phones |
| `s10` | 144 | Home sections on desktop: the *ma* |

### 6.4 Radii and elevation

| Token | Value | Use |
|---|---|---|
| `r1` | 3 px | Highlights, inline code |
| `r2` | 8 px | Buttons, fields, chips' inner shapes |
| `r3` | 12 px | Cards, sheets, the proof |
| `r4` | 20 px | Top corners of bottom sheets |
| `pill` | 999 px | Status chips |

Elevation is paper lying on paper. Four levels only:

| Level | Light | Dark | Use |
|---|---|---|---|
| `e0` flat | none | none | Text on the page |
| `e1` sheet | `0 0 0 1px var(--line), 0 1px 2px rgba(28,28,26,.06)` | `0 0 0 1px #34322D, inset 0 1px 0 #2A2925` | Cards, forms, the proof |
| `e2` lifted | `0 0 0 1px var(--line), 0 2px 4px rgba(28,28,26,.06), 0 16px 32px -16px rgba(28,28,26,.24)` | `0 0 0 1px #3D3B35, inset 0 1px 0 #34322D` | The sample proof on the home page, a card being pressed |
| `e3` over | `0 -8px 32px rgba(28,28,26,.18)` plus `--scrim` | `0 0 0 1px #4C4943` plus `--scrim` | Bottom sheets, dialogs |

Touch targets are 48 × 48 px minimum everywhere (well above WCAG's 24 px), 56 px tall for the primary action on the proof and the intake form.

## 7. Imagery

### 7.1 What we show, and what we don't

The product is the picture. The best image of CoFile is the sample proof, drawn at full fidelity, and a real state review page from a rehearsal (test details). No stock photography, no smiling teams, no laptops on café tables, no 3D blobs. No faces at all: it ages better and keeps the firm's relationship with its client at the center, not ours.

### 7.2 Commissions

| Commission | From (kind) | What |
|---|---|---|
| **The carved seal** | A *tenkoku* seal carver | Carve the Kaku in soft stone, 30 mm square. Scan the stone and its impressions at 2400 dpi. The impression's edge becomes the "carved" mark for print, the 404 page and the close of the home page. |
| **Ink grains** | The same carver, plus a print studio | Pull 30 impressions of a blank round seal on washi with a sumi-based seal paste (no vermilion: red is reserved for stops), varied pressure. Scanned as grayscale masks for the Maru (3.4), so on-screen approvals have the irregular density of a real stamp. |
| **Paper dioramas** | A paper engineer, photographed by a still-life photographer in north daylight on washi | Three small paper constructions, shot top-down and at 30°: **(a)** a *kamishibai* stage, the wooden paper-theater frame, with 13 paper cards for New Jersey's screens and the last card held half out, for "Rehearse on the real stage"; **(b)** two sheets overlapping with one round seal across their edge, for "Checked twice. Filed once."; **(c)** an opened return envelope with three documents fanned out, for "The papers come back to you." |
| **Icon set** | An icon designer, working from the Kaku's construction | About 40 icons on a 20 px grid, 1.5 px stroke, the Kaku's 0.75-unit carved inner corners, no fills except status glyphs. |
| **Motion** | A small motion studio with web and Core Haptics experience | The seal sequence, the halves rejoining, the held breath (8.3), delivered as code-ready specs and reference renders, not video. |

Dioramas are cut out on transparent backgrounds so they sit on the washi in both themes; in dark mode they get a 6% darker multiply and a soft contact shadow, not a background plate.

### 7.3 Data visuals

Coverage is the only data visual on the public site (9.11). In the enterprise dashboard, the "By status", "By state" and "By month" counts are horizontal bars in Nezu-ai with the number in the record voice at the end of each bar. One series, no legend, no pie charts, no animation on load.

## 8. Motion and interaction

### 8.1 Principles

1. **Nothing moves without a cause.** Only the reader's action or a real change of state moves anything. No ambient loops, no parallax, no scroll-jacking, no autoplay.
2. **Motion says where something came from and where it went.** If "Same as" fills an address, the reader should see it come from the address above.
3. **One signature moment per journey.** The seal. Everything else finishes in under 240 ms.
4. **Honest pending.** Never show success before the server confirms it. The seal lands after the approval is recorded, not when the button is pressed.
5. **Paper physics.** Things slide like paper on a desk: fast start, soft settle, no bounce. Sections fold and unfold like paper, with a crease.
6. **Reduced motion means no travel, not no feedback.** Under `prefers-reduced-motion: reduce`, movement becomes a 120 ms crossfade, and state changes still show.

### 8.2 Tokens

| Token | Duration | Easing | Use |
|---|---|---|---|
| `t-press` | 80 ms | `cubic-bezier(0.2, 0, 0, 1)` | Button and card press-down |
| `t-quick` | 140 ms | `cubic-bezier(0.2, 0, 0, 1)` | Hover, chip change, focus ring |
| `t-fold` | 220 ms | `cubic-bezier(0.65, 0, 0.35, 1)` | Folds, "More options", field reveal |
| `t-slide` | 320 ms | `cubic-bezier(0.16, 1, 0.3, 1)` | Bottom sheets, page sections entering |
| `t-step` | 480 ms | `cubic-bezier(0.16, 1, 0.3, 1)` | A timeline step advancing |
| `t-leave` | 160 ms | `cubic-bezier(0.4, 0, 1, 1)` | Anything leaving (always faster than entering) |
| `t-seal` | 760 ms total | spring: stiffness 600, damping 40, mass 1 | The approval seal (8.3) |

### 8.3 Signature moments

**1. The seal (approval recorded).** The client presses "Approve, and authorize submission and payment".

| Time | What happens | Haptic |
|---|---|---|
| 0 ms, press down | The button sinks 2 px, its shadow tightens, its fill goes to the pressed tone (80 ms). | `tick` |
| Release | The form posts. The label stays exactly as it is; a thin ring traces slowly around the button's edge (1.6 s a lap, linear) while `aria-busy="true"`. Nothing else on the page changes. | none |
| Server confirms | The proof sheet slides up 24 px and a second sheet, the record, appears under it. The seam lies between them. | none |
| +0 to 180 ms | The Maru descends from 1.15× scale and 0 opacity onto the seam, half on each sheet. | none |
| +180 to 300 ms | Impact: scale 1.0, the ink grain mask fills from the center out. | `seal` |
| +300 to 540 ms | Ink spreads 2% beyond the rim and settles back (spring). | tail of `seal` |
| +540 to 760 ms | The two sheets separate by 8 px along the seam, each keeping its half. Heading "Approval recorded" and its paragraph fade in below. Focus moves to the heading. | none |

Under reduced motion: the seal and heading crossfade in over 120 ms, the sheets don't move, the haptic still plays. If the server answers with an error, the ring stops, the button returns to rest, and the message appears above it in the Stop tone (9.8). The seal never appears.

I considered press-and-hold to approve and rejected it: it needs instructions (new copy), it fails people with tremor and switch users, and the proof itself is already the confirmation screen. The deliberateness comes from the page's rhythm, not from a gesture test.

**2. The halves rejoin (the state's page matched).** On the filing detail, when the run reaches the state's review page and it matches the approved proof, the timeline's two half-seals (the approved half on the left of the seam, the state's half on the right) slide together over 480 ms and close into one full seal in Matsuba. The step label reads as the log does today: "Review page · matched the proof".

**3. The held breath (a rehearsal stops on purpose).** In a rehearsal, the last step ("Pay Now · held, on purpose") doesn't fill. Its Kohaku dashed ring dims to 70% and back once over 1.2 s, like a held breath, then stays still. Haptic: `held`. It must read as calm and intended: no red, no shake, no exclamation mark.

**4. The stop.** When the state's page differs or a fee doesn't match, the two halves approach and stop 4 px apart, visibly not fitting, and the step turns Beni with the stop glyph. No shaking: a shake says "you did something wrong", and a stop is CoFile doing its job. Haptic: `stop`.

**5. Same as.** Tapping "Same as" over an address: if the source block is on screen, its values lift as ghost text and travel to the target fields (220 ms, `t-fold` easing), then the target fields show a Kihada highlight that fades over 600 ms. If the source is off screen, the fields fill with a left-to-right ink wipe (240 ms). Haptic: `settle`.

**6. Read into a draft.** On the home page's Requests section and on From email, each phrase the AI read is underlined in the message, and the matching field in the draft carries the same small index number. Scrolling the section into view draws the underlines one after another, 90 ms apart, once.

### 8.4 Haptics

Haptics are a second channel for state, never decoration. They play only in response to the reader's own gesture, never on page load, and follow the device's system setting.

| Pattern | Feel | Core Haptics (iOS app, future) | Android / web `navigator.vibrate` | Used for |
|---|---|---|---|---|
| `tick` | A light click | Transient, intensity 0.35, sharpness 0.6 | `[8]` | Press-down on the primary button, choosing a radio card, toggling a fold |
| `settle` | Two soft taps | Two transients 0.3 / 0.5, 50 ms apart | `[10, 50, 10]` | "Same as" filled, a saved answer applied, a link copied |
| `seal` | A press, then a firm, soft thud | Continuous ramp 0 to 0.5 over 120 ms, transient 1.0 / sharpness 0.3 at impact, continuous tail 0.2 decaying over 80 ms | `[14, 40, 36]` at impact | Approval recorded |
| `held` | One long, soft breath | Continuous 0.2, sharpness 0.1, 300 ms, ease in and out | `[40]` | A rehearsal reached its planned hold |
| `stop` | Two firm taps, not three | Two transients 0.8 / sharpness 0.7, 110 ms apart | `[18, 110, 18]` | A stop, a code that didn't match, a form with problems |

On iOS Safari, where the web has no vibration API, `tick` and `settle` use the system's own switch haptic through a native `<input type="checkbox" switch>` triggered inside the user's gesture; `seal`, `held` and `stop` play only in a future native app. Nothing depends on haptics: every haptic has a visual twin.

### 8.5 Sound

None on the web. The future native app may play one sound, the seal's soft paper thud (−24 LUFS, 180 ms), only when the device isn't silenced.

### 8.6 The transition map: one filing's life

"Design every transition" means writing them all down. Each row is a change of status (labels from `web/lib/status.ts`), what the chip becomes, what the timeline does, the email the engine already sends (subject as in `src/comms/render.ts`), and the motion. Remote changes arrive over a server-sent event stream; if the page is open, the change animates once; if the page is opened later, it renders in its current state with no replay. Haptics never fire for remote changes, only for the reader's own gestures.

| Change | Chip becomes | Timeline | Email (existing) | Motion |
|---|---|---|---|---|
| Created | ◔ Received | First step appears | none | Step fades in, `t-step` |
| Preview run starts | ◔ Getting the state's review page | Rail fills to this step | none | Rail fill, `t-step` |
| Proof goes out | ◐ Waiting for approval | The approved half-seal appears, empty, left of the seam | "Your proof is ready to approve: {title}" | Half-seal slides in from the left, 480 ms |
| Client asks for changes | ◐ Changes requested | Half-seal outline dims to `--ink-3` | "Changes requested: {title}" | 220 ms fade |
| Information missing | ◐ Needs information | Step shows "Still needed" form below it | "More information needed: {title}" | Fold opens, `t-fold` |
| Client approves | ● Approved | The left half-seal fills Matsuba | none | On the client's page: the seal (8.3, 1). On the desk: the half fills from the center, 480 ms |
| Card code needed | ◐ chip, plus the "Ready to pay" count | Notice under the step | "Card security code needed: {title}" | Badge count changes with a 140 ms crossfade |
| Run starts | ◔ Queued, then ◔ Filing now | Nested run steps appear one by one as they happen | none | Each line enters in 140 ms, rail extends |
| Review page matched | ◔ Filing now | Halves rejoin | none | 8.3, 2 |
| State page changed | ■ Paused: state site changed | Halves stop 4 px apart | "Site changed — review needed: {title}" (staff) | 8.3, 4 |
| Review gate | ◔ Final check | Captured screen shown as a plate | "Review before submit: {title}" (staff) | Plate fades in |
| Name taken | ◐ Name unavailable | Step turns Your turn | "Choose a name: {title}" (staff) | 220 ms |
| Rehearsal reaches its hold | ◌ Rehearsal stays | "Pay Now · held, on purpose" | none | 8.3, 3 |
| Submitted | ● Submitted to the state | Step fills | `[copy needed]` | `t-step` |
| Accepted | ● Accepted by the state | Step fills | `[copy needed]` | `t-step` |
| Rejected | ■ Rejected by the state | Step turns Stop | "Rejected by the state: {title}" | 220 ms, no shake |
| EIN issued | ● EIN issued | EIN appears in `fee-total` mono | `[copy needed]` | Digits fade in left to right, 30 ms apart |
| Completed | ● Completed | The rail ends in a full seal | "Completed: {title}" | Final seal fills, 480 ms |
| Unsure what the state received | ◐ Being checked | Step turns Your turn | "Checking whether the state received: {title}" (staff) | 220 ms |
| Failed | ■ Failed | Step turns Stop | "Failed: {title}" or "Portal bot check: {title}" (staff) | 220 ms |

## 9. Components

Every component below is specified with all of its states. "Action color" means `--ai` on CoFile's pages and the firm's corrected color (section 11) on theirs.

### 9.1 Buttons

| Kind | Rest | Hover (pointer only) | Pressed | Focus | Disabled | Pending |
|---|---|---|---|---|---|---|
| **Primary** | Action-color fill, on-color text, `label` weight 600, 48 px tall (56 px on the proof and intake), `r2`, padding 0 24 | Fill 6% darker in OKLCH lightness | Sinks 2 px, fill 12% darker, `t-press`, `tick` | Focus ring 2 + 2 px outside, offset 2 | 40% fill, cursor not-allowed, still announced | Label unchanged (existing labels like "Sending…" swap in where the code has them), ring traces the edge, `aria-busy` |
| **Secondary** | `--sheet` fill, 1 px `--line-field` border, ink text | Border goes to `--ink-2` | Sinks 1 px, `--sunken` fill | Same ring | Same | Same |
| **Quiet** | No fill, ink text, underline on hover | Underline | `--sunken` fill | Same ring | Same | n/a |
| **Removal** ("Remove", "Revoke", "Turn off", "Disconnect", "Turn down") | Secondary shape, Beni text | Beni border | Beni wash fill | Same ring | Same | Same |

Rules: one primary per view. Buttons are full width on phones when they end a form or a flow; otherwise they size to their label. Removal actions never sit next to a primary without 24 px between them. The focus ring is the system's ink-and-paper pair, never the firm's color, so it is visible on every theme.

### 9.2 Fields

- **Text, email, tel, number, date.** 52 px tall, 1 px `--line-field` border, `--sheet` fill, `r2`, 16 px left padding, value in `body` (17 px, which also stops iOS zooming). Label above in `label` weight, 12 px gap. Help below in `small`, `--ink-2`.
- **Required marker.** The existing `*` after the label, in `--ink-2`, not red (red means stop). "Fields marked * are required." sits once at the top of the form.
- **Record fields** (SSN, FEIN, ZIP, EIN, NAICS): values in the record voice. SSN shows dots after entry and reveals the last four only; `autocomplete="off"`, numeric keypad.
- **Select.** Native select on phones (the system picker is the most accessible thing we can offer). Long lists (states) open a full-height sheet with a search field on desktop.
- **Radio and yes/no.** Radio *cards*: each option a 56 px row with the circle on the left, the whole row tappable. Yes/No as two equal cards side by side. Selected: 2 px action-color border, `tick`.
- **Checkbox.** 24 px box, 2 px `--line-field` border, check drawn with the Kaku's carved corner. The authorization checkboxes are full-width cards, statement text in `body`, so the person reads the whole sentence they are checking.
- **Address block.** Street, suite, city, state and ZIP, with the labels each form already defines, paired as the code does (city, state and ZIP on one row from `sm` up). "Same as" appears above as a row of secondary chips, one per earlier address, labelled by that address's own label.
- **Person block.** "Same person as" chips, one per person already named.
- **Repeating group** (members, signers). Each item a sheet with "{item label} {n}" as its heading and "Remove" as a quiet removal button. "Add {item}" as a secondary button with a plus icon at the end of the list.
- **Signature pad.** Always a Kami-white sheet in both themes, 160 px tall on phones, a baseline drawn at 70% height, the signer's name printed under the line in `caption`. The consent checkbox card directly below.
- **PDF upload.** A dashed 1 px drop zone, 96 px tall, the existing help text inside it; after upload, a row with file name in the record voice, its size, and "Remove".

**States for every field:** empty; focused (border 2 px action color, no glow); filled; prefilled from the firm's saved answers (a 3 px Kihada left edge, so staff can see what came from their defaults); invalid (Beni border, the message above the help text, starting with the stop glyph, announced through `aria-describedby`); disabled (dotted border, `--ink-3` text); hidden by a condition (removed with a `t-fold` collapse, never just disappearing).

**Folds.** A folded section's summary is a 56 px row with the existing title ("{section title} (optional)") and a chevron that rotates 90° over 220 ms. Opening unfolds the height with a 1 px crease line at the fold that fades in 300 ms. "More options (optional)" uses the same fold, inset. Folds open by themselves when they already hold an answer or a problem, as the code does today.

### 9.3 The proof card

The core component, used three ways: the real proof (client), the sample on the home page, and the "what your client sees" preview in the desk.

```
┌─────────────────────────────────────┐  sheet, e1, r3
│ [firm logo] Harbor & Pine CPA        │  brand bar: 56 px, firm's
│─────────────────────────────────────│  color as a 4 px top rule
│ ◌ Rehearsal                          │  status chip (if rehearsal)
│ Two Sisters Bakery LLC               │  title, paper voice
│ New Jersey LLC formation. Please     │  body-proof, ink-2
│ approve by Dec 3, 5:00 PM Eastern.   │
│                                      │
│ ① Business name                      │  label above value
│   TWO SISTERS BAKERY LLC             │  record voice on Kihada
│   Members                            │
│   Ana Ortiz, Lucia Ortiz (50/50)     │
│   ...                                │
│ ② Formation filing fee      $100.00  │  fee lines, mono, aligned
│   NJ portal fee, by card      $3.50  │
│   ───────────────────────────────    │
│   Total to the state        $103.50  │  fee-total
│ ③ New Jersey's own review page,      │  plate with the state's page
│   filled in [ picture ]              │
│ ④ [ Approve for filing ]             │  primary, full width
│   Nothing is submitted or paid       │
│   until you approve.                 │
└─────────────────────────────────────┘
```

On phones, label/value pairs stack (label above, value below) instead of a two-column table: two columns at 375 px wrap long names and addresses into unreadable stripes. From `sm` up, a 40/60 two-column table. Numbered callouts are 24 px Kami circles with a 1 px ink ring and the number in the record voice.

### 9.4 Status chips

A pill, 28 px tall, 10 px horizontal padding, glyph (12 px) plus the existing status label in `note` 600. Glyphs come from the seal:

| Glyph | Drawn as | Tone | Labels |
|---|---|---|---|
| ● | Full disc | Done | Approved, Live, Submitted to the state, Accepted by the state, EIN issued, Completed |
| ◌ | Dashed ring | Held | Rehearsal, Rehearsed to the payment screen |
| ◐ | Half disc, split by the seam | Your turn | Waiting for approval, Needs information, Changes requested, Name unavailable, On hold, Being checked |
| ◔ | Quarter disc | In motion | Received, Queued, Getting the state's review page, Filing now, Final check |
| ■ | Square with a paper bar | Stop | Needs correcting, Paused: state site changed, Rejected by the state, Failed, Stopped |
| ○ | Thin ring | Not started | Screens recorded, rehearsal next |
| ┄ | Dotted ring | Not started | Offered, not yet rehearsed |
| – | Short dash | Not started | Planned |

Done, Held, Your turn and Stop chips have their wash fill; In motion and Not started are outline only. The ◔ glyph turns 90° every 2.4 s while something is genuinely running (live data), and is still otherwise and under reduced motion. A chip is never color alone and never a glyph alone.

### 9.5 The timeline

The filing detail's spine, vertical on every width. Each step: a 20 px glyph on a 2 px rail, the step label in `heading`, the time in `caption` `--ink-3` on the right. Step names are the existing status labels from `web/lib/status.ts`, in lifecycle order; no new words. For a formation: "Received", "Getting the state's review page", "Waiting for approval", "Approved", "Filing now" (with the run's own steps nested under it, as in the rehearsal log: "Review page · matched the proof", "Payment: … · matches the proof"), "Submitted to the state", "Accepted by the state", "EIN issued", "Completed". A step that a filing skips (no review page, no EIN) is simply not drawn. The rail is drawn solid up to the current step and perforated after it. The seam crosses the rail between "Approved" and "Filing now": the approved half-seal sits on the left of the seam, the state's half on the right, and they close up at the nested "Review page · matched the proof" line (8.3). Future steps are listed but dim, so the reader always sees the whole road.

### 9.6 Tables

Desk and dashboard tables: 56 px rows on phones, 48 px from `md`, `body-desk`, the header row in `small` 600 `--ink-2` on `--sunken`. No vertical rules, hairline row dividers. The first column is a link; the whole row is clickable with the link as its accessible name. On phones, tables become stacked rows: the first column as the row title, status chip on the right, other columns as `small` lines below.

### 9.7 Navigation

- **CoFile's public header.** 64 px. Kaku plus wordmark left; the section links ("How it works", "For firms", "What we file", "For platforms") from `md` up; "Log in" (quiet) and "Run a free rehearsal" (primary) right. On phones: mark, "Log in", and the primary button shrunk to 40 px tall; the section links move into the footer.
- **Desk and dashboard.** On phones, a 56 px top bar (firm logo or name, the email, "Log out") plus a horizontally scrolling strip of the nav labels below it, the current one in `--ai-tint` with a 2 px underline, scrolled into view. "Ready to pay" carries a count badge when something waits. From `md`, a 240 px left rail with the same labels.
- **Docs.** A left rail from `md` ("Overview", "Guides", "Reference", "Endpoints", "OpenAPI (JSON)"); on phones, a sticky select at the top of the page.

### 9.8 Notices and banners

| Notice | Look |
|---|---|
| **Beta notice** | A 40 px band above the header, `--sunken` ground, the word "Beta" in Kohaku 600 with the ◌ glyph, the existing sentence in `small`. Not sticky, not dismissible. On firms' pages it uses the neutral wording and no CoFile name. Not in the embed. |
| **Rehearsal band** (proof, intake, firm pages) | Full width, Kohaku wash, 4 px Kohaku left edge, ◌ glyph, text in `body` 600. On the proof it appears at the top and again directly above the button. |
| **Your turn** ("ready to pay and need your card's security code", "needs someone to act", subscription) | Sheet with a 4 px Nezu-ai left edge and the ◐ glyph. The link inside is the action ("Pay and file", "Subscribe"). |
| **Stop** (errors, `lastError`, "Please fix these and submit again.") | Beni wash, 4 px Beni left edge, ■ glyph, `role="alert"`, focus moves to it; a list of issues links each one to its field. |
| **Done** ("Saved to Google Docs.") | Matsuba left edge, ● glyph, `role="status"`. |

### 9.9 Empty states

One sentence of existing copy, one or two actions, and a lot of space. On the desk's Filings page: "Your desk is clear. Start a filing (it can be a free rehearsal), or send a client a link with your logo on it." with "New filing" (primary) and "Send a client a link" (secondary). No illustration, and never our mark: this is the firm's desk. The empty desk is a clean sheet, and that is the image.

### 9.10 Toasts

Rare. Used only for confirmations of something the reader just did, where the confirmation already has words (a card's security code accepted). Copy buttons ("Copy link", "Copy") need no toast: the button shows a check glyph in place of its icon for 1.2 s, keeps its label, and plays `settle`. A bottom sheet chip, 48 px, centered above the safe area, ink background with paper text, the existing message, 5 s plus 1 s per 10 words, pausable on hover and focus, `role="status"`. Never for errors, never with an action that only exists inside the toast.

### 9.11 The coverage table

The most important honesty device on the site. Two parts:

1. **The ladder**, above the table: the five labels in order, each with its glyph, as a horizontal row from `md` and a vertical list on phones: ● Live, ◌ Rehearsed to the payment screen, ○ Screens recorded, rehearsal next, ┄ Offered, not yet rehearsed, – Planned. It reads as a path every type walks, left to right.
2. **The table.** Columns "Filing", "Where", "Where it stands". Grouped by "Where" (New Jersey, Florida, IRS, New York), each group with a sticky 40 px header on phones. The status cell is always the chip, never a footnote. "Live" rows come first in each group and are the only rows with a Matsuba chip, so on a page where nothing is live yet, there is simply no green. A row never says more than its label.

On phones each row is a 64 px block: filing name in `body`, chip below it. A segmented filter at the top ("All states", then each state name already in the table) narrows the list.

```
PHONE: coverage
┌───────────────────────────────┐
│ New York, New Jersey, Florida │
│ and the IRS.                  │
│ Every filing type carries a   │
│ plain label, so you always…   │
│                               │
│ ● Live                        │  the ladder: a path,
│ ◌ Rehearsed to the payment    │  top to bottom
│   screen                      │
│ ○ Screens recorded, rehearsal │
│   next                        │
│ ┄ Offered, not yet rehearsed  │
│ – Planned                     │
│                               │
│ [All states][New Jersey][Flo…]│  segmented filter
│ ── New Jersey ─────────────── │  sticky group header
│ LLC formation                 │
│ ◌ Rehearsed to the payment    │
│   screen                      │
│ Standing certificate (through │
│ the API; not on the filing    │
│ desk yet)                     │
│ ◌ Rehearsed to the payment …  │
│ Employer registration (NJ-REG)│
│ ○ Screens recorded, rehearsal │
│   next                        │
│ …                             │
└───────────────────────────────┘
```

### 9.12 Loading

Nothing appears for the first 400 ms: most loads finish inside that, and a flash of skeleton is worse than a pause. After 400 ms, a *paper skeleton*: the sheet's outline and hairline bars where lines of text will be, static. No shimmer, because shimmer is ambient motion. Images reserve their exact aspect ratio (the state's review page is known in advance from the artifact), so nothing jumps when they arrive. Buttons that are waiting show their own pending state (9.1), never a full-page spinner.

### 9.13 The seam (component)

A 1 px line in `--line`, dashed 12 px on, 4 px off, vertical by default and horizontal on phones or inside the timeline. `aria-hidden="true"`, and in forced-colors mode it becomes `CanvasText` at 1 px. It never carries meaning by itself; everything it marks also has words.

### 9.14 Sheets and dialogs

On phones, a bottom sheet: `r4` top corners, a 36 × 4 px grab bar, slides up with `t-slide` over `--scrim`, can be dragged down (dismisses past 30% of its height or at 600 px/s). From `md`, a centered 560 px dialog. Both use the native `<dialog>`, trap focus, close on Escape and return focus to what opened them. Used for: the signature pad on phones, the state's review page full-screen, long pickers. The close control needs an accessible name: `[copy needed]` (one word, in English and Spanish).

### 9.15 Cards and the vault fields

- **Saved card row.** 64 px: a generic card icon (network marks only where the vault returns the network), the card's name ("Name for this card (optional)" when set), the last four in the record voice ("•••• 4242"), "Remove" as a removal button.
- **Add a card.** "Card number", "Expires" (placeholder "MM/YY"), "Name for this card (optional)", "Save card". The vault's fields are iframes; they are styled through the vault's style options with our tokens (Atkinson 17 px, `--line-field` border, the same 52 px height), and the focus ring is drawn on their wrapper so it matches every other field. The existing vault sentence ("Saved cards are held by Basis Theory, a card vault, never in our database…") sits under the fields with a small lock icon.
- **Security code field** (Ready to pay). One field, 56 px tall, 140 px wide, centered, mono 28 px, tracking +30%, numeric keypad, 3 or 4 digits. No masking dots while typing (the person is looking at the card), masked after submit.

### 9.16 The enterprise inquiry form

On the home page's Enterprise section: "Name", "Company", "Work email", "Phone (optional)", "States you file in" (radio cards: "New York", "New Jersey", "Florida", "Several of these", "Other states too"), "Filings per month" (radio cards: "Under 50", "50 to 250", "250 to 1,000", "Over 1,000"), "What you'd like to do (optional)" as a textarea, the hidden spam field ("Leave this field empty (it helps us block spam)") moved off-screen but kept labelled, and "Send" (pending: "Sending…"). On success the sheet keeps its size and shows the existing result message in place of the fields.

## 10. Page by page

### 10.1 Home `/`

The home page is a calm walk through one filing, in the copy's order. On desktop each section is two columns across the seam: words on the left (columns 1 to 6), the exhibit on the right (8 to 12). On phones: words, a horizontal perforated seam, then the exhibit. 96 px between sections on phones, 144 px on desktop. No section has a background band; the space separates them.

```
PHONE 375                                DESKTOP 1280
┌───────────────────────────────┐        ┌────────────────────────────────────────────┐
│◌ Beta  CoFile is in beta. Any │        │◌ Beta  CoFile is in beta. Any filing can…  │
│filing can run as a free …     │        ├────────────────────────────────────────────┤
├───────────────────────────────┤        │▣ CoFile  How it works  For firms  What we  │
│▣ CoFile      Log in [Run a f…]│        │          file  For platforms  Log in [Run…]│
│                               │        │                       ┆                    │
│— For CPA, payroll, fractional │        │— For CPA, payroll,    ┆  ┌──────────────┐  │
│  CFO and title firms          │        │  fractional CFO…      ┆  │Harbor & Pine │  │
│                               │        │                       ┆  │Two Sisters   │  │
│Your client                    │        │Your client approves   ┆  │Bakery LLC  ◌ │  │
│approves the proof.            │        │the proof. Then CoFile ┆  │① …  ② $103.50│  │
│Then CoFile files it.          │        │files it.              ┆  │③ [state pg]  │  │
│                               │        │                       ┆  │④ [Approve…]  │  │
│CoFile fills in your clients'  │        │CoFile fills in…       ┆  └──────────────┘  │
│LLC and corporation…           │        │[Run a free rehearsal] ┆   Sample proof ·   │
│                               │        │See what your client   ┆   test details ·   │
│[ Run a free rehearsal       ] │        │sees                   ┆   not a real…      │
│[ See what your client sees  ] │        │In beta. A rehearsal…  ┆                    │
│In beta. A rehearsal fills in… │        └────────────────────────────────────────────┘
│- - - - - - - - - - - - - - - -│
│ ┌───────────────────────────┐ │
│ │ sample proof (9.3)        │ │
│ └───────────────────────────┘ │
│ Sample proof · test details · │
│ not a real business           │
└───────────────────────────────┘
```

| # | Section (locked headline) | Layout and exhibit |
|---|---|---|
| 1 | **Hero.** "Your client approves the proof. Then CoFile files it." | Kicker with a 24 px hairline before it. H1 in `display`, broken after "proof." on phones. Sub in `lede`. Primary "Run a free rehearsal"; "See what your client sees" as secondary, scrolling to `#proof`. The beta note in `small` `--ink-2` directly under the buttons, never smaller. The sample proof (9.3) lifted at `e2`, rotated 0°: it is a document, not a postcard. Tapping a numbered callout scrolls to the matching line in section 3 and highlights it with Kihada for 1.2 s. |
| 2 | **Process.** "You start it. Your client approves it. CoFile files it." | Three steps as three sheets in a row on desktop, stacked on phones, joined by the rail from 9.5. The middle step ("Your client approves it.") carries the half-seal glyph and sits 8 px higher: the lede says the client is in charge of the middle one, so the layout does too. |
| 3 | **The proof.** "Your client sees what the state will see, before the state does." | The lede on the left. On the right, the six checks as a list with the ● glyph in Matsuba instead of ticks. The last item, the 8879 line, is set apart by 24 px and a hairline: it is the one sentence a CPA will repeat to a partner. |
| 4 | **Firms.** "Your name on the door. Ours in small print." | The exhibit is the same sample proof re-themed live in three brand settings for the same example firm, Harbor & Pine CPA (navy with a serif, green with a sans, warm red with a sans), chosen from three swatches. It crossfades (220 ms) only when the reader taps a swatch, never by itself. Under it, the "with CoFile" note at actual size with a hairline callout: "Ours in small print", quoted from the headline. |
| 5 | **Requests.** "Clients don't fill in forms. They text you." | Ana Ortiz's text as a real message bubble (sheet, `r3` with one square corner), and to its right (below on phones) a drafted New Jersey LLC formation card. Read-into-a-draft motion (8.3, 6): "LLC", "the bakery", "me and my sister, 50/50", "Jersey City" underlined with index numbers matching fields. The existing "↳ read into a drafted New Jersey LLC formation for your team to check" line sits on the seam between them. |
| 6 | **Checks.** "Checked twice. Filed once." | Diorama (b): two sheets, one seal across their edge. The five checks as a numbered list in the record voice numbers. |
| 7 | **After.** "The papers come back to you." | Diorama (c): the return envelope. Three items with the timeline's Done glyph. |
| 8 | **Rehearsals.** "Rehearse on the real stage." | Diorama (a), the kamishibai stage, above the example rehearsal log. The log is a timeline (9.5): six ● steps in Matsuba ("filled", "passed", "matched the proof", "matches the proof"), then "Pay Now · held, on purpose" with the dashed ring and the held breath (8.3, 3) when it scrolls into view, once. The caption "13 screens of New Jersey's own LLC form…" below. |
| 9 | **Coverage.** "New York, New Jersey, Florida and the IRS." | The ladder and table (9.11), the full width of the grid. The note below in `small`, the mailto as a link. |
| 10 | **The catch.** "Every filing service has a catch. Here's ours." | The five points as a numbered list, large numbers (`section` size, Newsreader, `--ink-3`) hanging in the left margin. No box, no warning color: honesty is not an alert. |
| 11 | **Security.** "Security" | Five blocks in a 2-column grid (3 from `lg`), each with an icon from the set, its `h3`, its paragraph. Equal weight; no "bank-grade" badges. |
| 12 | **Enterprise.** "Building a filing product? Put CoFile underneath it." | List on the left; the inquiry form on a sheet on the right (fields as 9.2). The `"dryRun": true` code in the record voice on `--sunken`. |
| 13 | **Close.** "Run one rehearsal. Then decide." | Centered, 144 px of space above. The button. "Questions first?" with the email. Then the carved Kaku at 40 px and the tagline "Approve the proof. Then it's filed." in Newsreader italic. |

**Footer.** On `--sunken`. "CoFile · the filing desk behind your firm" and "New York · New Jersey · Florida · IRS" on one line; the legal sentence on its own line in `caption`; "Terms · Privacy · Security · hello@cofile.app" as links, 48 px tall tap rows on phones.

### 10.2 Sign-up and account pages

All of these use one quiet layout: the CoFile header (mark, "Log in"), a single 480 px sheet centered with 64 px above it, the beta notice on top, the footer below. One task per page.

| Route | Content (locked copy) | Notes |
|---|---|---|
| `/signup` | Kicker "For firms", title "Set up your firm's filing desk", the sub. Fields in the code's order: firm name, kind of firm (radio cards, the five choices), your name, work email, password and again, phone and website (optional, folded under the firm block), states you file in (checkbox cards), volume (radio cards), the Terms checkbox card, "Create account". | On desktop, a second column shows a live preview of the desk's top bar with the firm name typed so far, so sign-up already feels like setting up the door. The note "Your account opens as soon as you confirm your email." (or the review wording) under the button. "Building a filing product?" links to `#enterprise`. |
| `/signup/sent` | "Your filing desk", "Check your email", the text, "No email after a few minutes? Check spam, or send the link again". | An envelope icon (64 px, line). "send the link again" is a quiet button that becomes "Sending…" then shows the existing result. |
| `/login` | "Log in", "Welcome back", "Firms go to their filing desk, platforms to their dashboard.", "Continue with Google", email, password, "Forgot your password?", "Log in". | "Continue with Google" first (most firm staff have Google Workspace), a hairline, then email and password. The error messages from the code appear as Stop notices above the form. |
| `/forgot-password`, `/reset-password`, `/verify-email` | As in the code ("Reset your password", "Choose a new password", "Confirm your email", "One click and your email is confirmed."). | Password fields have a show/hide toggle (icon, with the field's label as its accessible name). The 12-character hint stays visible, not a tooltip. |
| `/invite-expired`, expired client links, approval errors | "This link has expired or isn't valid" plus its line. | The *torn* state: a 64 px drawing of a paper slip with its seal half torn off. The same illustration on every expired link, so people learn it. |
| `/join/<token>` | A redirect. | Design the in-between: a blank paper page with the firm's logo (if known) or the Kaku, fading in after 400 ms only if the redirect is slow. |
| `/terms`, `/privacy` | Legal text. | Paper voice for headings, body at 18/30, 38em measure, numbered clauses with hanging numbers, a sticky contents select on phones. Version and date at the top in the record voice. |
| 404 | "Page not found", "The link may be old or mistyped.", "Go to the home page". | The carved Kaku impression, large, but with its halves 6 px apart: the one place the mark itself shows a mismatch. |
| Error | "Something went wrong", "This page couldn't load just now. It's usually a short hiccup on our side.", "Try again", "Log in again". | "Try again" primary. No illustration. |

### 10.3 The partner filing desk `/p/<slug>`

The desk is co-branded: the firm's logo and name on the left of the top bar, its color on the primary button and a 4 px top rule, its font on headings and body (section 11). Status colors, focus ring and record voice stay system.

**Filings (home).** Title "Filings" and the primary "New filing" on one row. Your-turn notices below it, in this order: ready to pay, needs someone to act, subscription. Then the table: "Filing", "Type", "Status", "Started", rows sorted with Your-turn statuses first, then In motion, then the rest by date. A rehearsal row carries the ◌ "Rehearsal" chip beside its name (see Copy notes on "Test"). Empty: 9.9.

```
PHONE: Filings
┌───────────────────────────────┐
│[logo] Harbor & Pine  ana@… Log out│
│ Filings  New filing  Ready to…→│  scrolling strip
├───────────────────────────────┤
│ Filings            [New filing]│
│┃◐ 1 approved filing is ready to│  Your turn notice
│┃  pay … Pay and file           │
│ ─────────────────────────────  │
│ Two Sisters Bakery LLC   ◐ Wai…│
│ New Jersey LLC formation       │
│ ◌ Rehearsal · Dec 1            │
│ ─────────────────────────────  │
│ Grove Street Tea LLC     ● Sub…│
│ …                              │
└───────────────────────────────┘
```

**Setup guide.** Title "Set up your account" (or "You're set up"), the line under it, then four steps as rows (9.5's rail, vertical): "Your firm", "Branding", "Payment", and "Registered agents (optional)", each with its one-line description and its button ("Set up your firm", "Set up branding", "Set up payment", "Add agents"). Done steps get the ● glyph and their button turns secondary ("Change agents"). When all are done, "Start a filing" becomes the page's primary.

**Branding.** "Step 2 of 3", "Branding", the line, then a split: controls on the left, a **live preview** on the right (on phones, a preview sheet pinned under the controls, collapsible). Controls: "Your web address", "Name your clients see"; logo (drop zone, "Use a link instead", "Remove logo"); "Main color" and "Second color" (swatch, hex field, the ready colors row); "Font" (the presets as radio cards, each label set in its own face, plus "Your own font (uploaded)"); "Support email shown to clients"; "Save and continue". Wireframe and rules in 11.5. The preview shows the client's phone view of the intake form's top and the proof's decision area, in light and dark side by side, with any automatic correction shown openly (11.3): a small note under the preview names what was adjusted. `[copy needed]` for that note.

**Details, Registered agents, Payments.** One form each, same layout as sign-up. Agents: one sheet per state the firm files in, "Ours: Registered Agents, Inc., through CoFile ($59 a year per business, billed to your firm)" as one radio card option, "Your own" as the other. Payments: the saved cards as card-shaped rows (brand mark, last four in the record voice), the Basis Theory field inside a sheet with its own 3:1 border, and the assignment of cards to filing types as a table of selects.

**New filing.** Three steps, each its own view, with the step's choice summarized at the top of the next view.

1. "Which state is the business in?": the states as four large cards (New Jersey, Florida, New York, and "All states" for the federal EIN), each showing its count of live types. The existing line about filing types going live, with "What we file" linking to the coverage table. Below a hairline: "Or send us the details…" with email and Slack.
2. Filing type: cards in the state, each with the type's title, a ● "Live" or ◌ "Rehearsal" chip (the existing tooltip text shown as visible `small` text under the chip on phones), and the existing line "Fill it in yourself, or send your client a link…". "Your pages for clients" and the widget code below, folded.
3. The form: "← Other filings", then a choice of who fills it ("Fill in", "Send them a link") as two cards, then "Start from a client you filed for before" / "New client". The intake form (10.4) follows, with "Send the proof to my client" as its button and "Nothing is filed until your client approves the proof." under it.

**Filing detail.** The heart of the desk.

```
PHONE: filing detail
┌───────────────────────────────┐
│ ← Filings                     │
│ Two Sisters Bakery LLC        │  title
│ ◐ Waiting for approval  ◌ Reh…│
│ New Jersey LLC formation ·    │
│ started Dec 1, 9:12 AM by ana │
│┃ The approver has a link to   │  nextStep() as a Your-turn note
│┃ check exactly what will be…  │
│                               │
│ ● Received             9:12 AM│  timeline (9.5)
│ ● Getting the state's  9:13 AM│
│   review page                 │
│ ◐ Waiting for approval 9:40 AM│  ← current: half seal
│ ○ Approved                    │  dim future steps
│ ┆ ─ ─ seam ─ ─ ─ ─ ─ ─ ─ ─ ─  │
│ ○ Filing now                  │
│ ○ Submitted to the state      │
│ ○ Accepted by the state       │
│ ○ Completed                   │
│                               │
│ Link to the proof             │  sheet
│ We emailed this link to …     │
│ [https://api.cofile.app/appr…]│  record voice, copy button
│ Documents · EIN · Progress on │
│ the state site (folded)       │
└───────────────────────────────┘
```

Documents as rows with a file icon, label and kind; the EIN as "EIN:" with the number in `fee-total` size so it can be read across a desk. "Progress on the state site" as a fold holding the run's steps in the record voice. "Save to Google Docs" as a secondary button with its explanation beside it.

**Client links.** "Send a client a link" form on a sheet (Filing select, "Who it's for (shown to you and the client)", "Make link"); after making, the link in the record voice with "Copy link" and "Email it from your mail app" as two equal buttons, and a `settle` haptic on copy. "Links you sent" as a table with status chips ("Waiting for the client" ◐, "Turned off" –, "Used: open the filing" as a link).

**From email.** Two columns across the seam: "Your message" on the left (the original, with read phrases underlined and numbered), the draft on the right ("This looks like a request for:" the type, then "Open the filled-in form" as primary). "Not this filing? Choose another" as a quiet link. The deleted-after-30-days state shows a paper slip with no text and the existing sentence.

**Signatures.** "Saved signatures", the explanation, then a table (Signer, Saved, Last used, "Remove"), each signature shown as a small rendered image on a Kami plate. "Add a signature" opens the pad in a bottom sheet on phones.

**Ready to pay.** One job: enter a security code. The explanation, then one sheet per card waiting: the card's label and last four in the record voice, the filings waiting on it listed with their fees, the vault's code field (large, 56 px, centered digits), "Pay and file" primary full width. While sending: "Sending…". Success: the sheet's filings each turn ◔ "Queued", and the existing "Thanks. Filings for this card pay with it for the next hour." shows as a Done notice with a 60-minute ring that empties quietly as the hour passes (a real countdown, not decoration). Empty: "Nothing is waiting for a card right now."

**Billing.** The plan from Stripe as one sheet, the registered agent renewals as a table, "Your plan is changing…" as a Your-turn notice. No prices anywhere except the ones Stripe returns for this account.

**Password.** The change-password form on a 480 px sheet. **Signed out** (`/p/<slug>/signed-out`): the firm's logo if known, "You're not signed in to this filing desk" and its text, nothing else.

**Every state of the desk, with its existing words.**

| Where | State | Treatment |
|---|---|---|
| Filings | Subscription missing | Your-turn notice: "Real filings need an active subscription; rehearsals are free." with "Subscribe" |
| Filings | Cards waiting | Your-turn notice: "{n} approved filings are ready to pay…" with "Pay and file" |
| Filings | People must act | Your-turn notice: "{n} filings need someone to act." |
| Filing detail | Next step known | `nextStep()` text as a Your-turn note, or In-motion note while "previewing" |
| Filing detail | Missing information | A "Still needed" sheet under the timeline step with the missing fields, "Send the answers" (pending "Sending…"), and the quiet link "start this filing again" |
| Filing detail | Waiting for a card code | Your-turn notice: "Approved and ready to pay. It needs the security code of {card} ending {last4}." with "Pay and file" |
| Filing detail | Error text from the engine | Stop notice with `lastError` |
| Filing detail | Proof link not emailed | "This link hasn't been emailed (sending failed)…" as a Stop notice when sending failed, Your-turn otherwise |
| Filing detail | Google Docs | "Saved to Google Docs." with "Open the record" (Done); the five failure lines (cancelled, too long, denied, failed, not available) as Your-turn notices |
| Ready to pay | Vault not switched on | "Card payments need the card vault switched on for this site." as an In-motion note, no field |
| Ready to pay | Field couldn't load | Stop: "The field couldn't load. Reload the page and try again." |
| Ready to pay | Wrong length | Field error: "Type the 3 or 4 digit code from the card." |
| Ready to pay | Not accepted | Stop: "The code wasn't accepted. Try again.", field cleared, focus kept, `stop` haptic |
| Ready to pay | Accepted | Done: "Thanks. Filings for this card pay with it for the next hour." plus the one-hour ring |
| From email | Reading switched off | "Reading emails automatically isn't switched on for this site yet." |
| From email | Type unknown | "We couldn't tell which filing this is." with the "Choose the filing" picker |
| From email | Nothing found | "We couldn't find answers in your message for this form." |
| From email | Already used | "Already sent as a filing." with "Open the filing" |
| Billing | Subscription status | Chips by tone: "Active" and "Free trial" ● Done; "Waiting for the first payment" ◔; "Paused" ◐; "No subscription yet" ○; "Canceled" –; "The first payment didn't go through", "Payment failed: Stripe is retrying" and "Unpaid" ■ Stop |
| Billing | Plans | "Your plan", plan sheets with "Choose this plan", "Switch to this plan" or "Not available yet" (disabled), and the counting paragraph ("Only live filings count…") set in `small` under them. Prices only as Stripe returns them for this account. |
| Billing | After checkout | Done: "Thanks. Stripe is confirming the payment; this page updates in a moment." Buttons pending: "Opening Stripe…" |
| Billing | Payment failed | Stop: "The last payment failed. Update the card under Manage billing." |
| Setup › Payments | No cards | "No cards saved yet. Add a card, then choose which card pays for what…" with "Add a card" |
| Setup › Payments | Routing | Radio cards "One card for every filing" and "A card for each type of filing, with a main card for the rest"; "Main card" and "Backup card" selects; "New Jersey: pay with your NJ account" sheet with "A card" / "A bank account (eCheck)" and the NJ portal-fee paragraph |
| Setup › Agents | New York | The agent block's label carries "(optional: New York doesn't require one)"; "Save agents" |

### 10.4 The client's intake: `/i/<token>`, `/<firm>/<service>`, `/e/<tenant>/<firm>/<service>`

The same page in three wrappers. The firm owns it entirely: firm brand bar (logo, name), the firm's color and font, "with CoFile" once at the bottom (3.5). The beta notice in its neutral wording. If the type isn't live, the rehearsal band with "This page is in rehearsal for now…" sits above the title and is repeated in short form above the button.

```
PHONE: intake
┌───────────────────────────────┐
│ [logo] Best Accounting        │  firm bar, 4 px firm-color rule
│ ◌ This page is in rehearsal   │  rehearsal band
│   for now. You can fill it in…│
│ New York LLC formation        │  title, firm font
│ Articles of Organization… After│  summary + the after-you-send line
│ you send this, we'll email you│
│ Fields marked * are required. │
│ ── Name ───────────────────── │  section = sheet, legend as heading
│ LLC name, without the ending *│
│ [                           ] │
│ Ending *  ( LLC ) ( L.L.C. )  │  radio cards
│ ── Registered agent ───────── │
│ …                             │
│ ▸ Other provisions (optional) │  fold
│ ── Authorizations ─────────── │
│ ☐ I am the authorized …       │  full-width statement cards
│ Next, we'll email you a proof │
│ to check. Nothing is filed…   │
│ [ Send to Best Accounting   ] │  primary, 56 px, firm color
│ By sending, you agree to…     │
│        ▣ with CoFile          │
└───────────────────────────────┘
```

- **One section per sheet**, the legend as the sheet's heading, 32 px between sheets. On phones, a slim progress line under the firm bar fills as sections are completed (no numbers, no percent: it is orientation, not pressure).
- **Asking for as little as possible.** The firm's saved answers prefill silently on the client's page (no Kihada edge for clients; that is a staff cue). Conditional fields appear with a `t-fold` reveal directly under the answer that caused them, so cause and effect are next to each other. Optional sections are folded. "Same as" and "Same person as" chips save retyping.
- **Errors.** On submit, the Stop notice with "Please fix these and submit again." and its issues as links; each field shows its own message. Focus moves to the notice. Haptic `stop`.
- **Sent.** The button shows "Sending…"; then the existing thank-you (`result.title`, "Thank you.") replaces the form in place, with the next-step line. No confetti.

**Every state of the intake.**

| State | Treatment |
|---|---|
| Link expired | Torn slip, "This link has expired or isn't valid", "Ask whoever sent it for a new one." under the firm's bar |
| Link can't be used / type withdrawn | Same layout: "This link can't be used" or "This filing is no longer offered" |
| Rehearsal type | Rehearsal band at the top and in short form above the button |
| EIN only | The IRS line ("…exactly what will be sent to the IRS…"); the phrase "state's own review page" never appears on IRS pages |
| Prefilled by the firm | Values present, no marker for the client |
| Conditional question appears | Revealed under its cause with `t-fold`; disappears the same way, and its answer is kept in case it comes back |
| Group item added / removed | New sheet unfolds below the last; removal folds it away and moves focus to the next item's heading |
| Server error | Stop notice at the top, issues linked to fields, answers kept as typed (the existing kept-form behavior; only passwords are cleared) |
| Without JavaScript | The form still posts; folds are native `details`; "Same as" chips are hidden rather than broken |
| Sending | Button "Sending…", the form dims to 85% and is inert |
| Sent | The thank-you replaces the form in place; focus moves to it |

### 10.5 The proof (api.cofile.app)

This page is where the whole design pays off. The client opens it from an email on a phone. It has to be unmistakable, calm and complete, in one scroll, with one decision at the end.

```
PHONE: the proof                         …continued
┌───────────────────────────────┐        ┌───────────────────────────────┐
│ [logo] Harbor & Pine CPA      │        │ State fees                    │
│◌ Rehearsal: nothing will be   │        │ Nothing is charged on this    │
│  filed or paid, even if you   │        │ page. These fees are paid to… │
│  approve.                     │        │ Formation filing fee  $100.00 │
│                               │        │ NJ portal fee, by card  $3.50 │
│ NJ formation:                 │        │ ───────────────────────────── │
│ Two Sisters Bakery LLC        │        │ Total               $103.50   │
│ Filing reference f_8c2… Please│        │                               │
│ decide by December 3, 2026,   │        │ ┌─ decision ────────────────┐ │
│ 5:00 PM Eastern. After that…  │        │ │◌ Rehearsal: nothing will… │ │
│                               │        │ │By approving, you confirm  │ │
│ ① The state's review page     │        │ │every detail below is      │ │
│ This is a picture of the      │        │ │correct and authorize its  │ │
│ state's own review page…      │        │ │submission exactly as      │ │
│ ┌───────────────────────────┐ │        │ │shown, and payment of the  │ │
│ │ [ state page, tap to zoom]│ │        │ │fees shown, up to the total│ │
│ └───────────────────────────┘ │        │ │shown ($103.50). Government│ │
│ ② Filing details              │        │ │fees generally can't be …  │ │
│ Business name                 │        │ │Government sites don't save│ │
│ TWO SISTERS BAKERY LLC        │        │ │drafts, so once you approve│ │
│ Members                       │        │ │One-time code sent to you  │ │
│ Ana Ortiz, Lucia Ortiz (50/50)│        │ │[ _ _ _ _ _ _ ]            │ │
│ …                             │        │ │[Approve, and authorize    │ │
│ ③ …                           │        │ │ submission and payment  ] │ │
│ ┃ Total  $103.50 · Dec 3 ─────│ sticky │ │[ Request changes        ] │ │
└───────────────────────────────┘        │ └───────────────────────────┘ │
                                         │ Questions: help@harborpine…   │
                                         │        ▣ with CoFile          │
                                         └───────────────────────────────┘
```

- **Order.** Firm bar; rehearsal band (if a rehearsal); title; reference and deadline; ① the state's review page (where there is one); ② Filing details; ③ State fees; ④ the decision sheet. The approval consent moves from the top of today's page into the decision sheet, directly above the button, because it describes what the button does. It is the same text, at full `body-proof` size, never folded.
- **The state's review page** sits on a Kami plate with its existing explanation above it and its alt text. Tap opens it full-screen with pinch-zoom and a 1:1 view; values that appear in the filing details carry a faint Kihada highlight in the picture (from the rehearsal's field coordinates) so the client can match picture to text.
- **Filing details** follow the state's order, grouped under the state's section names, label above value on phones. Values in the record voice. Masked SSNs show the existing masking sentence once, above the first masked value.
- **The sticky line.** A 48 px bar at the bottom of the viewport shows "Total" and the amount, and the deadline date, until the fee section scrolls into view; then it slides away (`t-leave`). Tapping it scrolls to the fees. It never contains the approve button: an always-present approve button invites approving without reading.
- **The reading rail.** A 2 px line down the left edge (inside the margin) fills as each section passes through the viewport. It never blocks the button. It just shows, calmly, that every section has been seen.
- **The decision sheet.** A sheet at `e1` with a 2 px ink top rule. One-time code (when required) as six separate digit boxes, `autocomplete="one-time-code"`, numeric keypad. Then the primary, 56 px, full width, the firm's corrected color, with the label wrapping to two lines if it must (never truncated). Then "Request changes" as secondary; choosing it reveals "What should change? (Needed only if you ask for changes)" with a `t-fold` and moves focus into it. Then "Questions:" and the firm's email.
- **Pressing approve:** the seal sequence (8.3, 1).

**Every state of the proof.** The engine renders this page as HTML; every state below must work without JavaScript, with JavaScript adding only the motion, the rail, the sticky line and the zoom.

| State | Treatment |
|---|---|
| Opening | Firm bar and title paint first; the review picture's plate reserves its aspect ratio |
| Rehearsal | Kohaku band at the top and again inside the decision sheet; the rehearsal seal variant afterwards |
| Live filing | No band. The decision sheet's 2 px ink top rule and the firm-color button. Absence of the amber band is never the only signal: the consent text itself names payment and the amount. |
| With the state's review page | Section ① as specified |
| Without one (IRS, or where the state's site doesn't allow it) | Section ① is left out; numbering starts at Filing details; the words "state's review page" don't appear |
| EIN in the run / after acceptance | The existing EIN sentence appended to the consent block, as today |
| Masked SSNs | The masking sentence once, above the first masked value; values like `***-**-1234` in the record voice |
| Fee cap | An extra fee row, "Maximum you authorize", with "(if the state asks for more, we stop before paying)" on its own line in `small`; the consent's amount is the cap |
| One-time code | "One-time code sent to you" above one 56 px field with `autocomplete="one-time-code"` (iOS and Android fill it from the message). Wrong code: the proof stays, Stop notice "That code didn't match…", field cleared, focus back in it, `stop` haptic |
| Pressing approve | 8.3, 1: the ring traces, label unchanged, second presses ignored |
| Connection lost while posting | Ring stops, button returns, a Stop notice `[copy needed]`; the code and comment are kept; no seal |
| Deadline passes while the page is open | The page checks the deadline each minute. Once past, the decision sheet dims, both buttons disable, and "This link to the proof has expired. Ask whoever sent it for a new one." appears inside the sheet |
| Approved | The seal; "Approval recorded" |
| Changes requested | The fold; the change-request sentence |
| Opened again after deciding | A closed paper slip (no seal, because the page doesn't say which decision), with "A decision was already recorded with this link, so there's nothing more to do here." |
| Expired or invalid | The torn slip with the matching sentence |
| Printed | A print stylesheet for Letter and A4: no sticky line or rail, the reference and page number in each footer, the review picture at full width, values in the record voice |
| Text at 200% | Label above value at every width; the sticky line hides above 150% text size to give the content room |
| Screen reader | Reading order is visual order. The consent text is tied to the approve button with `aria-describedby`, so it is read when the button is reached |

### 10.6 After the decision, and approval errors

- **Approval recorded:** the seal on the seam between the shrunken proof and the record sheet, then "Approval recorded" and its paragraph (the rehearsal variant uses the Kohaku dashed seal with "Rehearsal").
- **Change request recorded:** no seal. The proof sheet folds in half (a 320 ms paper fold) and the existing "Thank you. Your change request is recorded…" sentence appears. Nothing was approved, so nothing is stamped.
- **Errors** (already decided, expired, not valid, code didn't match, couldn't record): the firm's brand bar and the torn-slip illustration (10.2), then the existing sentence. "That code didn't match…" keeps the proof on screen and shows as a Stop notice above the code field instead, with the `stop` haptic, because the client should not lose their place.

### 10.7 Enterprise dashboard `/dashboard`

CoFile-branded, denser, desktop-leaning but fully usable on phones. Left rail from `md`: "Overview", "Filings", "Ready to pay", "Firms", "API keys", "Webhooks", "Setup", "Team", "Billing", "Docs" (and "Sign-ups" for the platform tenant).

- **Overview.** Your-turn notices first ("Real filings need an active subscription; rehearsals are free.", ready to pay). Then three figure tiles: Filings, Webhook deliveries, API keys (number in `fee-total` mono, label in `small`), then "By status", "By state", "By month" as bar lists (7.3).
- **Filings.** The desk's table plus columns for firm and reference (record voice), filters as segmented controls by status tone.
- **Firms / firm detail.** Table (Firm, Filing desk, Approvers); detail shows the firm's brand as a live mini-preview, its desk link, approvers, and its filings.
- **API keys.** The existing explanation ("Keys you create here. A key we set up for you isn't listed here…"), then the create form: "Key name" (placeholder "Key name, e.g. Production server") and "Create key". A new key appears once in a dashed `--sunken` well in the record voice with "Copy" beside it (`settle` haptic on copy). The table: "Name", "Key" (the `cofile_` prefix and 8 characters visible), "Last used", and "Revoke" as removal; revoked keys show a – "Revoked" chip. Empty: "No keys created here yet."
- **Filings.** Filters "All firms" and "Show" as selects on phones and segmented controls from `md`. Columns "Filing", "Firm", "Type", "Status", "Created". "Ready to pay: needs the card's code" as a ◐ chip that links to Ready to pay. Empty: "No filings."
- **Webhooks.** The existing explanation, then one sheet per endpoint: "URL (https)" in the record voice, "Signing secret ends in" with the last characters in mono and its sentence about changing it, then "Every event" / "Or only these events" as radio cards; the event list appears under the second with each event name in mono. "Remove this endpoint" as removal, "Add another endpoint" as secondary, "Save endpoints" as primary. Under each saved endpoint, a delivery strip: the last 30 deliveries as 8 px ticks (● Matsuba delivered, ■ Beni failed), each tick a button opening that delivery.
- **Firm detail.** "← Firms", the firm's name in `title`, a Stop notice when it has no approvers ("This firm has no approvers, so its filings can't be approved…"), then sheets for "Filing desk" (a live mini-preview of the firm's brand and its link), "Public pages and website widget" (its line, the page links, the widget code in a copyable well) and "Invite staff".
- **Team.** "Name", "Email", "Last signed in" table; "Add someone" with "Name", "Email", "First password" ("At least 12 characters."), pending "Adding…", and the existing success line. Empty: "No one yet."
- **Setup.** "Payment methods" (with "Card for your subscription" and "State fees" as two separate sheets, because the copy insists they are different money), "State portal logins" (NY DOS, NYS-100, NJ, IRS, FL as rows: "Portal", "Pays by", "Login", with a sealed lock icon once connected and "Disconnect" as removal), "Who's named on your filings", "Your registered agent in each state", portal defaults. Each block a sheet; the existing explanations above each.
- **Ready to pay, Billing, Password** as in the desk; an account that isn't billed shows "This account isn't billed here." on a plain sheet.
- **Platform tenant: Sign-ups and Enterprise requests.** Two queues as tables with "Approve" (primary, small) and "Turn down" (removal). Drift reviews, when built, use the stop visual: the approved form snapshot and the changed one side by side across the seam, differences in Kihada.

### 10.8 White-label and embed

- `/e/<tenant>/<firm>/<service>`: the intake page (10.4) under the enterprise's brand. "with CoFile" is omitted where the enterprise's white-label setup says so; the neutral beta notice stays.
- `/embed/…` and `embed.js`: the intake form only, no header, no beta notice, transparent page ground so it takes the host page's background, the form on a sheet. The script sizes the iframe to its content (`EmbedResizer`) and animates height changes with `t-fold` so the host page doesn't jump. "Filed with CoFile" at the bottom in the `note` style. The embed respects the host's `color-scheme` and can be forced light or dark with a `data-theme` attribute on the script tag.

### 10.9 Developer docs `/docs`

The developer is the second reader, and they are reading code. Same system, different density:

- **Layout.** Left rail navigation, content at 720 px, and from `lg` a right column for code examples that stays beside the prose it belongs to.
- **Code.** Mono 14/22 on `--sunken`, a quiet syntax palette from the status inks at reduced chroma (strings Matsuba, numbers Kohaku, keys Ai, comments `--ink-3`), never Beni (red in code reads as an error). Copy button on every block.
- **Reference.** Each of the 25 endpoints as a block: method pill (`GET`, `POST`, `PUT`, `DELETE` in outline only, with the method word, no color coding by verb), path in mono, a one-line summary, then request and response. Webhook events list with the signature verification sample.
- **Coverage on the docs home** reuses the coverage chip system exactly. `"dryRun": true` gets the ◌ glyph wherever it's explained, tying the developer's flag to the public word "rehearsal".
- **Machine-readable.** `/openapi.json`, `/llms.txt` and `/docs.md` are linked from the docs home under "For your tools and AI agents" as three rows with a download icon. They are plain files; no design applies inside them, and they must not carry presentation markup.

### 10.10 Emails (Resend)

One template, 560 px, sent as the firm (logo, name, color) on client emails and as CoFile on account emails. Live text only, no images needed to understand it (the logo has alt text; everything else is HTML text). Dark-mode aware with `color-scheme` meta and tested in the main clients.

```
┌──────────────────────────────────┐
│ [firm logo]  Harbor & Pine CPA   │
│──────────────────────────────────│ 4 px firm-color rule
│ ◌ Rehearsal: nothing will be     │ only for rehearsals
│   filed or paid, even if you…    │
│ Your proof is ready to approve:  │ subject, repeated as heading
│ NJ formation: Two Sisters Bak…   │
│ Your proof is ready. Open the    │ body
│ link to see every detail and …   │
│ [ Open your proof ]              │ firm color, corrected
│ Don't forward this email: …      │
│──────────────────────────────────│
│ with CoFile                      │
└──────────────────────────────────┘
```

| Email | Subject and button (existing) | Design note |
|---|---|---|
| Approval request | "Your proof is ready to approve: {title}", "Open your proof" | The only email with a large button. |
| Security code needed | "Card security code needed: {title}", "Enter security code" | Links to Ready to pay. "Never reply to this email with the code." set apart in `small` 600. |
| Missing information | "More information needed: {title}" | The missing items as a list, not a comma-joined sentence. |
| Filing submitted, documents back, EIN issued | Status labels "Submitted to the state", "Completed", "EIN issued"; `[copy needed]` for bodies | The EIN in the record voice at 24 px. Documents as a list with file names. |
| Sign-up, verification, password reset, invitations | "Confirm your email for CoFile", "Reset your password", "Your partner account is open", "Your CoFile account is ready", "You're invited to {firm}'s filing portal" | CoFile-branded: Kaku and wordmark, indigo button. |

**Email rules.** Client emails are sent in the firm's name with the firm's support address as reply-to; account emails come from CoFile. The preheader is the body's first sentence, so no new words are needed. Every email has a plain-text part with the link on its own line. The button is a bulletproof HTML button 48 px tall in the firm's corrected color (11.2), never an image. In dark-mode clients the template declares `color-scheme: light dark`, uses a transparent logo with a light plate fallback, and keeps the button's text pair from the dark correction. The "Don't forward this email…" sentence and "Never reply to this email with the code." are set in `small` 600 directly under the button, where people's eyes land after it.

### 10.11 New surfaces I propose

1. **The client's sealed copy.** After approval, a PDF of exactly what was approved, with the half-seal printed on its right edge and the reference in the record voice, attached to the "Completed" email and kept on the filing. `[copy needed]` for its link.
2. **A client follow-along page.** The decision page becomes a quiet, read-only timeline (9.5) the client can return to from the same link until the filing completes. `[copy needed]`.

### 10.12 Route checklist

So nothing is missed in the build, every surface in the brief and where it is specified:

| Surface | Route | Section |
|---|---|---|
| Home | `/` | 10.1 |
| Firm sign-up, sent | `/signup`, `/signup/sent` | 10.2 |
| Log in (with Google), forgot, reset, verify, invite expired, join | `/login`, `/forgot-password`, `/reset-password`, `/verify-email`, `/invite-expired`, `/join/<token>` | 10.2 |
| Session ended | `/session-ended` (a redirect to `/login?ended=1` or the desk's signed-out page) | 10.2, 10.3 |
| Terms, Privacy, 404, error | `/terms`, `/privacy`, not-found, error | 10.2 |
| Desk: Filings, Setup (details, branding, agents, payments), New filing, filing detail, Client links, From email, Signatures, Ready to pay, Billing, Password, signed out | `/p/<slug>/…` | 10.3, 11 |
| Permanent service pages | `/<firm>/<service>` | 10.4 |
| Client intake | `/i/<token>` | 10.4 |
| The proof, decision, approval errors | `api.cofile.app/approve/<token>` | 10.5, 10.6 |
| Enterprise dashboard: overview, keys, webhooks, filings, firms and firm detail, setup, Ready to pay, billing, team, password, sign-ups and enterprise requests | `/dashboard/…` | 10.7 |
| Enterprise hosted page, embed | `/e/<tenant>/<firm>/<service>`, `/embed/…`, `embed.js` | 10.8 |
| Docs, reference, machine-readable | `/docs`, `/docs/<guide>`, `/docs/reference`, `/openapi.json`, `/llms.txt`, `/docs.md` | 10.9 |
| Emails | Resend templates | 10.10 |

## 11. The white-label theming system

Thousands of firms will choose colors I will never see. So I design the rules, not the themes.

### 11.1 What a firm controls, and what it doesn't

| A firm controls | The system keeps |
|---|---|
| Display name, logo (plus an optional dark-mode logo), primary color, second color, font (a preset or an upload), support email | Status inks and glyphs, the focus ring, the record voice, sizes and spacing, layout, the Maru seal, the rehearsal band, error and stop styling, button shape and size |

The primary color appears on: the primary button, links (when they pass 4.5:1, otherwise ink with a 2 px underline in the firm color), the selected border of radio cards (when it passes 3:1, otherwise ink), and the intake's progress line. The second color appears only as the brand bar's 4 px top rule. Nowhere else.

### 11.2 Automatic contrast fixes

Computed when the firm saves its branding, stored as derived tokens, shown to the firm in the preview. Nothing is changed silently.

1. Convert the color to OKLCH.
2. **Button text.** If white text reaches 4.5:1, use white. Else, if ink text reaches 7:1 (the color is genuinely light), keep the fill and use ink text. Else, lower the lightness in 0.005 steps, chroma capped at 0.18 to stay in gamut, hue unchanged, until white reaches 4.5:1.
3. **Button edge.** If the fill is under 3:1 against the sheet (pale yellows, mints, white), add a 1 px inside edge in the same hue at lightness minus 0.25, so the button still reads as a button.
4. **Dark mode.** Repeat 2 and 3 against the dark sheet (`#1F1E1B`), lightening instead of darkening for colors that disappear into it (navy, black).
5. **Status neighbors.** If the color sits within 25° of Beni's hue (red, coral, crimson) with chroma above 0.10, links and selected borders use ink instead, so red never doubles as an interaction cue near a stop. The button keeps the firm's red: its shape and label carry it.

Measured results of the rule on sample firm colors:

| Firm picks | Result | Text | Contrast |
|---|---|---|---|
| `#5B9BD5` sky blue | `#3979B1` | White | 4.6:1 |
| `#FF6B6B` coral | `#D24247` | White | 4.6:1 |
| `#2E8B57` sea green | `#288653` | White | 4.5:1 |
| `#8A8A8A` gray | `#757575` | White | 4.6:1 |
| `#7FD1AE` mint | unchanged, plus edge | Ink | 9.5:1 |
| `#F4D03F` yellow | unchanged, plus edge | Ink | 11.3:1 |
| `#1F3B70` navy | unchanged | White | 10.9:1 |

### 11.3 Logos

Uploaded logos are trimmed of transparent margins and measured. Wide logos (wider than 2.5:1) sit 28 px tall on phones, 32 px from `md`, at most 160 / 200 px wide; squarer logos sit at 36 px. If a logo's own contrast against the sheet is under 2:1 (a white logo on a transparent background, say), it sits on a small ink plate (`r2`, 8 px padding) in that theme, and the branding page suggests uploading a version for that mode. No logo: the firm's name in its font at `heading` size.

### 11.4 Fonts

Presets are shown in the picker set in their own face. An uploaded font is checked for every character English and Spanish need (including á é í ó ú ü ñ ¿ ¡), an x-height of at least 0.42 em, and text-weight stems; a script or display face that fails is used for the firm's name only, with Atkinson for everything else. Every firm font gets `size-adjust`, `ascent-override` and `descent-override` computed so its x-height matches Atkinson's, so a firm's font never changes the layout. The record voice is never replaced.

### 11.5 The branding page, as the firm sees it

The theming system is only as good as the moment the firm meets it. The branding page shows the consequences of every choice before the firm saves.

```
DESKTOP: Setup › Branding
┌──────────────────────────────────────────────────────────────────────────┐
│ Step 2 of 3                                                              │
│ Branding                                                                 │
│ Your clients see your name, logo and colors on the pages where they …    │
│                                    ┆                                     │
│ Logo                               ┆   LIGHT            DARK             │
│ ┌ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ┐        ┆  ┌────────────┐  ┌────────────┐   │
│   drop a PNG, JPEG or WebP         ┆  │[logo] Harb…│  │[logo] Harb…│   │
│ └ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ┘        ┆  │ Two Sister…│  │ Two Sister…│   │
│ Use a link instead                 ┆  │ Total      │  │ Total      │   │
│                                    ┆  │   $103.50  │  │   $103.50  │   │
│ Main color                         ┆  │[Approve, a…│  │[Approve, a…│   │
│ [■] #5B9BD5  ● ● ● ● ● ●           ┆  │ with CoFile│  │ with CoFile│   │
│                                    ┆  └────────────┘  └────────────┘   │
│ Second color                       ┆   ■ #5B9BD5 → ■ #3979B1           │
│ [■] #D9A441                        ┆   white text 2.96 → 4.6 : 1        │
│                                    ┆   [copy needed: adjustment note]   │
│ Font                               ┆                                     │
│ (•) Standard (the device's own)    ┆                                     │
│ ( ) Inter   ( ) Lora (serif) …     ┆                                     │
│                                    ┆                                     │
│ [ Save and continue ]              ┆                                     │
└──────────────────────────────────────────────────────────────────────────┘
```

- The preview is two real phones, light and dark, rendering the actual proof component with the firm's tokens, not a mock. Changes apply within 140 ms of typing a valid hex.
- When the rule in 11.2 adjusts a color, the preview shows the chosen swatch, an arrow, the swatch actually used, and both contrast figures. The firm can accept the adjusted color or pick another. It cannot switch the adjustment off.
- The font radio cards each render their label in their own face; an uploaded font that fails the checks in 11.4 shows the preview with the name in that font and the body in Atkinson.
- The form's own labels stay: "Your web address", "Name your clients see", "Main color", "Second color", "Font", "Your own font (uploaded)", "Support email shown to clients", "Save and continue" (pending "Saving…"). The existing heading "Preview of a client's page" sits over the two phones. Font upload errors ("That file isn't a font we can use.", "The font file must be 600 KB or smaller.") appear as field errors under the upload.

### 11.6 The theming lab

Before launch, and on every change to the rule, a test suite renders the proof, the intake and an email for a fixed set of hard themes and fails the build if any text pair falls under its minimum: white `#FFFFFF`, pale yellow `#F4D03F`, mint `#7FD1AE`, mid gray `#8A8A8A`, sky `#5B9BD5`, coral `#FF6B6B`, pure red `#FF0000`, near-black `#111111` (for dark mode), navy `#1F3B70`, a status-green `#22654A` (to prove Done chips stay distinct from a green button), a script font, and a logo that is white on transparent.

## 12. Accessibility, Spanish and dark mode

**Accessibility.** WCAG 2.2 AA throughout; AAA text contrast on the proof. Reading text is never under 14 px or thinner than weight 400. Everything is set in `rem`, so the device's text size is respected; pages reflow at 320 CSS px and at 200% zoom with no sideways scroll. Every page has landmarks and one `h1`; each proof section is a labelled region; the fees are a real table with a caption and the total announced with its label. Status chips include their column name for screen readers ("Status: Waiting for approval"). Focus moves on purpose: to the Stop notice on errors, to the heading after the seal, into the comment field after "Request changes". Live updates (a run's steps, Ready to pay) use polite live regions, at most one announcement every 5 s. No time limits beyond the real ones, and those are written in words. Touch targets 48 px. Motion and haptics each follow their own system setting.

**Older readers.** Labels always above fields, never inside them as placeholders. Icons always with words. No gray text on gray, no hover-only information, no swipe-only actions. The proof is one scroll, not tabs.

**Spanish.** Client-facing surfaces (intake, proof, decision pages, client emails) are designed to take a Spanish copy deck once it is written and approved: every layout allows 35% longer strings, buttons wrap rather than truncate, and dates and money follow the reader's language (`3 de diciembre, 5:00 p. m., hora del Este`). Values that go to the state are never translated; they keep the record voice and `lang="en"` so screen readers pronounce them correctly. The language choice is remembered per client link. The switcher's wording is a `[copy needed]` slot.

**Dark mode.** Follows the system; `data-theme="light"` or `"dark"` overrides it (per page, per embed). Sumi night is specified in 4.5; firm colors get their own dark-mode correction (11.2).

## 13. Production

**Stack.** Next.js as today. Design tokens authored in Figma variables (modes: light, dark; themes: CoFile and six sample firms), exported through Tokens Studio to Style Dictionary, emitted as CSS custom properties (`--cf-*`) and a TypeScript map. Firm themes are computed server-side in the engine and the web app with `culori` (OKLCH) at save time, so the proof (rendered by the engine) and the desk use the same derived values. Motion in code with the Web Animations API and a small spring helper; no video, no Lottie. Haptics in one `haptics.ts` module with the five patterns and a capability check. Emails built with React Email, rendered to HTML and text for Resend. Fonts self-hosted as WOFF2, subset to Latin, Latin-1 and Latin Extended-A, preloaded on the proof.

**Design-system files.** Figma: Foundations (color, type, space, motion specs), Components (every state in 9), Patterns (forms, the proof, the timeline, empty and error states), Pages (every surface in 10, at 375 and 1280, light and dark), Theming lab (twelve real-looking firm themes, including the hard ones: yellow, white, coral, navy, a script font). Storybook mirrors Components with visual regression across light and dark, six firm themes and three widths.

**Asset list.** Kaku (plain, carved, 16 px, app icon, favicon set, social card), wordmark and lockups (SVG, PDF), Maru component with 30 ink masks (AVIF and WebP, 2x and 3x), torn-slip illustration, three dioramas (transparent, light and dark treatments), 40 icons (SVG sprite), the email template set, the OG image template.

**Commissions.** The seal carver, the paper engineer and still-life photographer, an icon designer, a type designer for the wordmark, a motion studio (7.2).

**Phases.**

| Phase | Weeks | Ships |
|---|---|---|
| 1 | 1 to 4 | Tokens, type, the Kaku, core components; the proof, the decision pages and the intake; the theming engine. Client-facing first, because that is where the stakes are. |
| 2 | 5 to 8 | The filing desk, the home page with real UI exhibits, coverage, emails. |
| 3 | 9 to 12 | Dashboard, docs, delivered commissions, the seal and haptics polish, the Spanish layouts. |

Before each phase ships: moderated sessions with eight firm staff over 50 on their own computers, and eight clients on their own phones, four of them Spanish-first. The test that matters: can a client say, without help, what they authorized after pressing the button?

## 14. Appendix

### 14.1 What I would push back on in the current site

1. **The proof gets the least design of any surface.** It is an 860 px desktop table with inline styles, two narrow columns on a phone, and the consent sits at the top, far from the button it describes. It is the one page where someone authorizes an irreversible payment.
2. **Green does three jobs** (approved, live, the forward button). The moment a firm's color replaces the button green, the meaning splits. Action and status must be separate systems.
3. **Amber also does two jobs.** In the desk, the "warn" tone covers both a rehearsal's planned hold and "someone needs to act". A rehearsal hold is good news; a waiting approval is a to-do. They need different glyphs and tones.
4. **Coverage labels are right, but they read as a list, not a path.** Without the ladder, "Rehearsed to the payment screen" and "Live" are two chips of similar weight.
5. **Every value in mono, small.** The mono face is right for exact characters, but at .92em in a narrow column long names and addresses become hard to read for older eyes. Size it up and stack it on phones.
6. **The folder tab says "storage".** CoFile's promise is not that it keeps files; it is that what was approved is what gets filed. The mark should carry that mechanism.
7. **The white-label contrast fix is a binary.** Choosing white or black text on the firm's color is not enough for mid-tone colors, where neither passes; the fill has to move.

### 14.2 Copy notes

Suggestions only. None of these are applied in the design above.

1. The desk's filings list labels a rehearsal "Test", and the filing detail says "test run" and "filing run". Elsewhere the word is "Rehearsal".
2. "1 approved filing is ready to pay and need your card's security code": "need" should be "needs" in the singular.
3. "Signing in…" on the log-in button, "You're not signed in to this filing desk", "they can sign in at the log-in page" and "Last signed in" use "sign in", which the words table rules out.
4. The account-approved email says "You can try a practice filing right away"; the current word is "rehearsal".
5. The proof's title is built from internal ids ("NJ formation: …"). The plain filing type title ("New Jersey LLC formation"), as on the intake and the home sample, would read better.
6. The home page's sample proof says "Approve for filing"; the real button says "Approve, and authorize submission and payment". The section is called "See what your client sees", so the sample might show the real label.
7. `nextStep()` lines on the firm's own desk speak of "The approver" and "Your filing company"; partner copy elsewhere says "your client" and speaks to the firm as "you".
8. The dashboard's "Ask the platform team to configure tenant …" and the webhooks page's "The engine posts…" use words the copy review keeps out of non-developer copy.
9. Slots that need new words, marked `[copy needed]`: the branding preview's note about automatic adjustments; the bodies of the "Submitted to the state", documents-back and "EIN issued" emails; the client's sealed copy link; the client follow-along page; the Spanish language switcher.
