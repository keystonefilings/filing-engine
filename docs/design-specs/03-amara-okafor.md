# CoFile website design spec: "In Register"

**Designer:** Amara Okafor, brand identity and motion (London studio)
**Date:** Nov 26, 2026
**Scope:** every surface in the shared brief, from cofile.app to the proof, the filing desk, the dashboard, the docs and the emails.
**Ground rules followed:** the copy is quoted as it stands in the repo. Where my design needs words that don't exist yet, the mockups show `⟨copy to come⟩` and my suggestions are in Appendix B. The name is CoFile. No prices. No suggestion anywhere that every filing type is live.

---

## 1. Who I am, and how that shapes this

I make brand worlds: wordmarks, kinetic type, 3D, sound, launch films. Before I opened a studio I spent school holidays at my aunt's print shop on Lagos Island. I learned to read a press proof there, and I learned that the press operator who stops the run when the plates are a hair out of line is the most valuable person in the building.

My bias: most B2B software looks the same, a pale gradient, a rounded sans, a laptop mock-up, and you forget it in an hour. A brand can be loud and still be careful. Bold color is fine. Vague isn't.

My second bias matters more here: a brand that won't step back is a bad brand. CoFile's partner firms' clients should see the firm, and learn CoFile is there only from a small "with CoFile". So this spec designs two things that have to agree: a loud CoFile for the people choosing it, and a quiet discipline for the pages it carries for others.

## 2. The concept: In Register

**In register** is the printer's term for the moment every plate lines up exactly: cyan over magenta over yellow over black, crosshairs on crosshairs. Out of register, the image doubles and blurs, and a good printer stops the press.

That is CoFile's whole product, so it's the idea everything here hangs on:

- **The proof is a press proof.** The copy already says so: "You've approved a proof before: business cards, letterhead, an invitation at the printer. Nothing went to press until you said so."
- **Filing is registration.** CoFile files business registrations and employer registrations. The printer's word and the government's word are the same word.
- **The product is a set of layers that must line up.** What the client approved, the state's own review page, the fee table, the fee on the state's payment screen. CoFile goes ahead only when they register. When they don't, it "stops before paying". That's the press operator stopping the run.
- **"Register" is also a tone of voice.** CoFile speaks loudly on its own pages and quietly on its partners' pages. The concept names the volume control too.

The visual world is a modern press, not a nostalgic one: two strong inks overprinting on bright stock, registration targets, crop marks, heavy sheets, acetate overlays sliding into alignment. No sepia, no letterpress texture, no vintage stamps.

**The signature idea is "the Register".** Two layers slide into exact alignment and a registration target locks with a small tick: in the logo sting, the hero, the proof, the fee check on a filing and the rehearsal log. When the layers don't line up, they stay apart, everything stops moving, and the screen says why. One gesture carries the promise, **it files only when everything lines up**, and it explains the product without a word of new copy.

### Four volumes

| Volume | Name | Surfaces | What the brand does |
|---|---|---|---|
| 3 | **Poster** | Home, sign-up, campaign, launch film, social | Full ink: Register Blue fields, overprint, kinetic type, 3D, sound in film |
| 2 | **Desk** | Filing desk chrome, dashboard, docs, CoFile's account emails, login | Brand shows in type, the wordmark, focus rings and the action color. No 3D, no overprint, motion only where it explains |
| 1 | **Counter** | A partner firm's client pages: intake, service pages, the proof, client emails | The firm's logo, color and font. CoFile supplies structure (grid, type for details and fees, status system, match glyph) and a small "with CoFile" |
| 0 | **Blank** | Enterprise white-label pages and the embed widget | No CoFile anywhere. Structure only, fully themed by the enterprise |

---

## 3. Brand identity

### 3.1 The mark: "the Register"

A heavy **C** holding a **registration target**. The C is the firm; the target is the filing it holds. One crosshair arm runs out through the C's opening: the line that goes through to the state.

**Construction (64 × 64 unit artboard, origin top left):**

| Element | Geometry |
|---|---|
| C | Centered at (30, 32). Outer radius 26, inner radius 15 (stroke 11). Opening on the right, from −38° to +38° measured from the positive x axis. Terminals cut along the radius (radial cuts), sharp corners. |
| Target ring | Centered at (34, 32), 4 units right of the C's center, so it leans toward the opening. Outer radius 10, inner radius 7 (stroke 3). |
| Crosshair, vertical | 2.5 units wide, centered on x = 34, from y = 19.5 to y = 44.5 (12.5 either side of center). Clears the C's inner edge by about 1.9 units. |
| Crosshair, left arm | 2.5 units high, centered on y = 32, from x = 21.5 to the ring. |
| Crosshair, right arm | 2.5 units high, centered on y = 32, from the ring out to x = 60, past the C's outer edge (x = 56). Square end. |
| Color, primary | C in Press Black `#15131C`; target and crosshair in Register Blue `#3B2CF5`. |
| One-color | All Press Black, or all Stock `#F5F3EE` reversed on Register Blue, Overprint or Press Black. |

**Micro cut (16 to 23 px):** the crosshair is dropped, the ring becomes a solid dot of radius 6, and the C stroke thickens to 12. This is the favicon and the smallest avatar.

**Plates (motion and posters only):** the target is duplicated as two "plates", Register Blue offset (−2, +2) and Proof Pink offset (+3, −2), with multiply blending so their overlap shows Overprint Violet. The logo sting animates the plates into register (§8.3). A plate pair is never used in a static logo.

### 3.2 The wordmark

"CoFile", drawn by hand on the bones of the display face (§5), heavy weight (about 820), normal width.

- **Cap height 700 units, x-height 540**, so the wordmark holds at 14 px.
- The **o** is the target: a ring at the o's weight, with crosshair arms reaching 18% of the ring's diameter beyond it (8% under 96 px wordmark width; a plain ring under 72 px).
- The **C** repeats the mark's radial cuts. The **F**'s middle bar is 82% of the top bar. The **i** has a square dot on the cap-height line. The **e** has a flat horizontal terminal.
- Tracking −10/1000 at display sizes, 0 below 24 px; "Co" and "File" tightened 12 units, so it reads as one word with a hinge.
- Two-color: letters in Press Black, the o-target in Register Blue. One-color versions follow the mark.

**Lockups**

| Lockup | Use | Spacing |
|---|---|---|
| Wordmark alone | Primary. Site header, emails from CoFile, docs, the dashboard | Clear space = the o's ring diameter on every side |
| Mark + wordmark | App icon tiles, social avatars with names, the launch film end card | Gap = 0.4 × mark height; mark height = 1.42 × cap height |
| Mark alone | Favicon, app icon, small avatars, the loading glyph | Clear space = 25% of mark height |

**Don't:** recolor outside the palette; add gradients, shadows or bevels; rotate; outline; set "CoFile" in another typeface; show the plates misregistered in a still logo; use the mark inside a firm's own branding; put the wordmark on a photo without a solid field behind it.

### 3.3 The "with CoFile" co-brand mark

This is the only sign of CoFile a partner firm's client sees. It has to be small, sure of itself and impossible to mistake for the firm's own brand.

```
  with CoFile        ← "with": text face, 12/14, weight 400
                       "CoFile": wordmark, micro cut, cap height 9 px (plain-ring o)
                       one color only: ink-3 #6B6779 (light) / #9A96A8 (dark)
```

- Always one neutral color. Never Register Blue, never the firm's color, never Proof Pink.
- Height 14 px on desktop, 13 px on phones. Never larger than 40% of the firm logo's height.
- **Where it sits:** top right of the firm's header on desktop; at the bottom of the page, under the firm's support line, on phones (so the firm's logo owns the top of a phone screen).
- Not a link on the client's pages (the intake form and the proof). Nothing should pull a client away from approving their filing. On the firm's own filing desk it links to cofile.app.
- Embed widget: today's "Filed with CoFile" footer line takes the same treatment. On enterprise white-label pages it doesn't appear at all (Volume 0).

### 3.4 The match glyph

A system icon, not the logo: a circle (1.5 px stroke) with a short crosshair, used next to anything that "matches" ("matched the proof", "matches the proof"). It locks into place with the Register motion. On Volume 0 (enterprise white-label) it's swapped for a plain check in a circle, so no CoFile signature leaks into another company's product.

### 3.5 Sonic logo

**"Seat and ring", 1.1 seconds.** Two dry wooden clicks 80 ms apart (the plates seating), then a rising major sixth on a felt-mallet wooden xylophone, recorded in a small room, with the second note ringing 600 ms. It's for the launch film, tutorials, webinars and ads. It never autoplays on the website and is never used on a firm's or client's page. An optional dashboard "sounds" switch (off by default) plays one click on "Accepted by the state". Delivered as 48 kHz/24-bit WAV masters, with a calm descending-fourth variant for a stopped filing in video, never an alarm.

---

## 4. Color

### 4.1 The idea

Two inks on bright stock. **Register Blue** is a hot ultramarine, saturated enough to own, and outside the three status meanings (green, amber, red). **Press Black** leans violet, so blue type on it looks deliberate. **Proof Pink** is the second plate, for overprint and marketing only. Where pink and blue overlap they make **Overprint Violet**, the deep field for the hero at night and the film.

Manila, cream and green are retired. Cream says "heritage", which is everyone's safe choice. Retiring green as the brand color also gives it back to the one job that matters most: **approved and live**.

### 4.2 Core tokens

All contrast ratios are WCAG 2.x, computed. "Text" pairs must reach 4.5:1 and non-text pairs (borders, icons) 3:1.

| Token | Light | Dark | Use | Contrast notes |
|---|---|---|---|---|
| `--stock` | `#F5F3EE` | `#0F0E14` | Page background | |
| `--sheet` | `#FFFFFF` | `#1A1922` | Cards, the proof, tables, documents | |
| `--sheet-2` | `#ECE9E2` | `#23212D` | Sunken areas, table heads, code | |
| `--rule` | `#DCD8CF` | `#2F2C3A` | Hairlines (decorative only) | |
| `--rule-strong` | `#8C8797` | `#6C6879` | Input borders, chip outlines | 3.48 on sheet; 3.23 on dark sheet |
| `--ink` | `#15131C` | `#F2F0EA` | Main text | 16.6 on stock; 16.9 dark |
| `--ink-2` | `#4A4757` | `#BDB9C9` | Secondary text | 8.1 light; 10.0 dark |
| `--ink-3` | `#6B6779` | `#9A96A8` | Captions, "with CoFile" | 4.9 on stock; 6.1 on dark sheet |
| `--register` | `#3B2CF5` | `#8F87FF` | Brand, links, primary button on CoFile pages, focus ring | 6.6 on stock; dark 6.5 on stock |
| `--register-hover` | `#2C1FD1` | `#A9A3FF` | Hover | |
| `--register-press` | `#2416B0` | `#C2BEFF` | Pressed | |
| `--on-register` | `#FFFFFF` | `#0F0E14` | Text on Register Blue | 7.3 light; 6.5 dark |
| `--register-tint` | `#E8E6FF` | `#1F1C47` | Selected rows, "your move" chip background | Register text on it 6.0 |
| `--pink` | `#FF3D8B` | `#FF5C9D` | Second plate, marketing only | Ink on pink 5.5. White on pink fails (3.3): never |
| `--overprint` | `#3B0A86` | `#3B0A86` | Deep hero field, film, dark posters | White on it 13.3 |
| `--focus` | 2 px `--register` + 2 px `--sheet` gap | same, dark tokens | Every focusable element | |

Marketing pairs: Stock `#F5F3EE` type on Register Blue is 6.6:1, so the hero headline and body can sit on a full blue field at any size.

### 4.3 Status colors

Five families. Every status in `web/lib/status.ts` belongs to exactly one, and every chip carries **a glyph, a color and the locked words**, so no one has to rely on color alone.

| Family | Statuses (locked labels) | Glyph | Light: text / bg / solid | Dark: text / bg / solid |
|---|---|---|---|---|
| **Go** | Approved · Submitted to the state · Accepted by the state · EIN issued · Completed · Live | Filled disc with a check | `#0B6E44` / `#DCF2E5` / `#0B7A4B` (white text 5.4) | `#4FD69A` / `#10291E` / `#4FD69A` (dark text 10.4) |
| **Stage** (rehearsal) | Rehearsal · "held, on purpose" · Rehearsed to the payment screen | Ring drawn with a **dashed** stroke; pause bars for "held" | `#7A4A00` / `#FFEBC2` / `#F5A623` (ink text 9.1); dashed line `#C98400` (3.1) | `#FFC24F` / `#33250A` / `#FFC24F` |
| **Your move** | Waiting for approval · Needs information · Changes requested · Name unavailable · On hold | Arrow in a circle | `#3B2CF5` / `#E8E6FF` | `#A8A2FF` / `#1F1C47` |
| **Stop** | Paused: state site changed · Needs correcting · Rejected by the state · Failed · Stopped | Octagon with a bar | `#B3261E` / `#FDE3DF` / `#B3261E` (white 6.5) | `#FF7B6B` / `#3A1513` |
| **Moving** | Received · Getting the state's review page · Queued · Filing now · Final check · Being checked | Three dots (a spinner ring when animated) | `#4A4757` / `#ECE9E2` | `#BDB9C9` / `#23212D` |

Three rules make this hold:

1. **Our ink marks your move.** In product, Register Blue appears only where a person has to act: the primary button and the "Your move" chips. Blue chips are the to-do list.
2. **Solid means real, dashed means rehearsal.** Live and Go chips are solid. Rehearsal chips are dashed marigold outlines, in the coverage table, the filing list and the proof banner alike, so "is this real?" is answered by shape before anyone reads a word.
3. **Status colors never come from a firm** (§11).

Today amber covers both "rehearsal" and "needs someone to act". Splitting them lets marigold be a stage light rather than a warning.

### 4.4 Data colors (dashboard charts)

Series in order: Register `#3B2CF5`, Teal `#0F8B8D`, Pink `#E0337A`, Ink-2 `#4A4757`, Marigold `#C98400`, Sky `#4E8FE0`. Charts "by status" use the five status families only, in the order Go, Your move, Moving, Stage, Stop.

---

## 5. Typography

### 5.1 Families

| Role | Final (commissioned or licensed) | Build stand-in today | Why |
|---|---|---|---|
| Display | **CoFile Press**, commissioned from an independent type foundry. Variable: weight 400–900, width 85–125, plus a custom `TRAP` axis (ink-trap depth 0–100). Companion **CoFile Press Plates**, a COLRv1 color font that renders two offset plates for overprint headlines | Bricolage Grotesque (variable, OFL) | An ownable grotesque. Deep ink traps at poster sizes (`TRAP` 80) become the brand's texture. At product sizes (`TRAP` 0) it's clean and calm |
| Text and UI | **Atkinson Hyperlegible Next** (Braille Institute, OFL), weights 400, 500, 700 | Same | Designed so letters that get confused (I l 1, O 0, rn m) stay distinct for low-vision readers. This is for the 60-year-old CPA and the client approving on a phone |
| Mono (fees, codes, IDs, API) | **Atkinson Hyperlegible Mono**, 400 and 500, with the slashed-zero alternate on | Same | Shares letterforms with the text face. Every digit is unambiguous |

The brand is loud in the display face and deliberately plain in the text face. On firm pages (Volume 1) a firm's font replaces CoFile Press for headings and the firm's name; **details, fees and codes always stay in Atkinson Mono**, whatever the firm picks (§11).

Foundry brief for CoFile Press: x-height 0.54 em, squarish curves, flat horizontal terminals, Latin Extended-A (Spanish accents that fit at 0.94 leading), tabular and proportional lining figures, a single-stroke $, and a "CoFile" ligature that drops in the target-o at ≥ 40 px.

### 5.2 Scale

Root is 16 px. **Product body text is 17 px, never smaller for anything someone must read to act.** Today's 15 px dashboard and portal body is too small for many of our readers.

**Poster (marketing)**

| Style | Size / line height | Face, settings | Use |
|---|---|---|---|
| Mega | clamp(48px, 7.2vw, 120px) / 0.94 | Press 820, width 92, TRAP 80, tracking −0.035em | Home H1 only |
| Display | clamp(36px, 4.8vw, 72px) / 1.0 | Press 780, width 96, TRAP 60, tracking −0.025em | Section H2s |
| Title | 28/34 → 34/40 at ≥1024 | Press 720, width 100, TRAP 20 | H3s, form titles on marketing pages |
| Kicker | 14/20 | Atkinson 700, uppercase, +0.08em | The hero kicker, section labels |
| Lede | 19/30 → 21/33 at ≥1024 | Atkinson 400, max 62ch | Ledes |
| Body L | 18/29 | Atkinson 400 | Marketing body, list items |

**Desk and Counter (product)**

| Style | Size / line height | Face | Use |
|---|---|---|---|
| H1 | 32/40 (28/36 under 480) | Press 760 / firm font on Counter | Page titles |
| H2 | 24/32 | Press 720 / firm font | Section titles |
| H3 | 19/26 | Atkinson 700 | Card titles, fieldset legends |
| Body | 17/27 | Atkinson 400 | Everything people read |
| Label | 16/22 | Atkinson 700 | Field labels |
| Small | 15/22 | Atkinson 400 | Help text, metadata |
| Caption | 13/18 | Atkinson 500 | Timestamps, table meta. Never instructions |
| Data | 16/24 | Atkinson Mono 400 | Details on the proof, IDs, links |
| Fee | 18/26 | Atkinson Mono 500, tabular | Fee lines |
| Total | 24/30 | Atkinson Mono 700, tabular | "Total to the state", "Total" |
| Button | 17/20 | Atkinson 700 | All buttons |
| Code | 15/24 | Atkinson Mono 400 | Docs code blocks |

### 5.3 Numerals and money

- Money: tabular lining figures, always with cents (`$3.50`), decimal-aligned in a right-aligned column, with the `$` in its own narrow column. The total row has a 2 px ink rule above it.
- Deadlines keep the copy's format ("Dec 3, 5:00 PM Eastern") in the text face. Codes, references and IDs use mono.
- Masked SSNs (`***-**-1234`) are in mono with the asterisks at 60% opacity, so the last four stand out.

---

## 6. Layout

**Grid**

| Breakpoint | Width | Columns | Margin | Gutter |
|---|---|---|---|---|
| xs | < 480 | 4 | 16 | 16 |
| sm | 480–767 | 4 | 24 | 16 |
| md | 768–1023 | 8 | 32 | 20 |
| lg | 1024–1439 | 12 | 48 | 24 |
| xl | ≥ 1440 | 12 | auto (content 1280) | 32 |

Container widths: marketing 1280, product 1120, forms and reading 720, **the proof 680**, docs prose 760 with a 240 sidebar and a 280 code rail at xl. Margins honor `env(safe-area-inset-*)`.

**Spacing scale (px):** 2, 4, 8, 12, 16, 24, 32, 48, 64, 96, 128, 192 (tokens `s-0`…`s-11`). Marketing sections run on 128 vertical padding at lg (96 md, 64 xs). Product pages use 32 between blocks and 16 inside cards.

**Radii.** Paper has square corners: **documents are 2 px** (the proof, documents, the rehearsal log). **Controls are 10 px.** Chips are pills, marketing panels 16 px. Crisp sheets and soft controls separate "a document" from "something you press".

**Elevation**

| Level | Light | Dark |
|---|---|---|
| e0 | flat, 1 px `--rule` | flat, 1 px `--rule` |
| e1 sheet at rest | `0 1px 0 rgba(21,19,28,.06), 0 1px 3px rgba(21,19,28,.08)` | `--sheet` plus a 1 px top highlight `rgba(255,255,255,.06)` |
| e2 lifted sheet | `0 2px 0 rgba(21,19,28,.04), 0 24px 48px -28px rgba(21,19,28,.35)` | `--sheet-2` plus the highlight |
| e3 dialog | `0 40px 80px -32px rgba(21,19,28,.45)` | `--sheet-2`, 60% black scrim |

**Crop marks** frame the key figures on Poster pages: 8 px arms, 1 px `--ink-3`, set 6 px outside the corners. They mark "this is the real artifact": the sample proof, the rehearsal log, the coverage table.

---

## 7. Imagery

**3D (the hero and the proof section).** A real-time WebGL scene: the sample proof as a sheet of heavy uncoated stock with visible fibre and a slight curl, and the state's review page as acetate floating above it. They separate and re-register as you scroll. Commission a 3D studio that specializes in material realism (paper, film, ink), with a 2× AVIF still as the fallback. No laptops, no floating phones, no glowing particles.

**Press drawings (illustration).** Isometric technical line drawings, 1.5 px strokes, two inks on stock, showing the mechanism: a form becoming a proof, a proof registering over a state page, documents coming back. No characters, mascots or hands holding phones. Commission an illustrator from architectural or engineering drawing, not editorial illustration.

**Photography.** Sparingly: Firms, the close, sign-up, social. Documentary portraits on location, flash plus daylight, of **real beta partner firms** who agree to it, each shot against one sheet of Register Blue backdrop paper hung in their own office: their world, our ink. Until partners agree, use still lifes only (a redacted EIN letter, returned state documents, a phone showing a proof on a kitchen counter). Nobody is cast to pose as a customer.

**Data visuals.** The coverage "run bars" (§9.10), the filing timeline (§9.7), dashboard charts in the data palette. Flat, two inks, no 3D charts, no gradients.

**Kinetic type** carries social and campaign work, built only from locked lines: "Checked twice. Filed once." "Rehearse on the real stage." "Your name on the door. Ours in small print." Each line is set in CoFile Press Plates and registers on the beat.

---

## 8. Motion and interaction

### 8.1 Principles

1. **Motion shows alignment, not decoration.** If something moves, it's coming into register, being checked, or moving to the next stage. Nothing floats for atmosphere.
2. **Paper has weight.** Sheets decelerate and settle. No bounce in product, no elastic overshoot anywhere.
3. **Loud on the poster, still on the form.** Poster pages get scroll-driven sequences and 3D. Desk pages get 160–360 ms transitions. Counter pages (client-facing) get one moment only: the proof locking on approval.
4. **A stop is still.** When a filing stops, motion stops. No shaking, no flashing red, no pulsing. The layers stay visibly apart and the reason appears. Calm is the message.
5. **Never make anyone wait for an animation.** Input is never blocked by motion, and every sequence can be skipped by scrolling or tabbing.

### 8.2 Tokens

| Token | Duration | Use |
|---|---|---|
| `t-1` | 90 ms | Press feedback (button down) |
| `t-2` | 160 ms | Hover, chip change, checkbox |
| `t-3` | 240 ms | Fold open, menu, tab |
| `t-4` | 360 ms | Sheet move, toast in, page transition |
| `t-5` | 560 ms | **Register lock** |
| `t-6` | 900 ms | Hero beats |
| `t-7` | 1200 ms | Logo sting |

| Easing | Curve | Use |
|---|---|---|
| `ease-standard` | `cubic-bezier(0.2, 0, 0, 1)` | Most transitions |
| `ease-enter` | `cubic-bezier(0, 0, 0, 1)` | Things arriving |
| `ease-exit` | `cubic-bezier(0.3, 0, 1, 1)` | Things leaving (0.8× the enter duration) |
| `ease-register` | `cubic-bezier(0.16, 1, 0.3, 1)` | Plates sliding into alignment |
| `spring-sheet` | stiffness 170, damping 26, mass 1 | 3D sheets (critically damped, no visible overshoot) |
| `linear` | | Progress only |

### 8.3 Signature moments (storyboards)

**A. Logo sting (first visit only, 1,200 ms; skipped on later visits and under reduced motion).**

| ms | Frame |
|---|---|
| 0 | Stock field. The C sits in place in Press Black. The target appears as two plates, blue at (−6, +5) and pink at (+8, −5), multiply, 100% opacity. |
| 0–560 | Plates slide to (0, 0) on `ease-register`. The overlap passes through Overprint Violet. |
| 560 | Plates meet. Pink drops to 0 opacity over 90 ms; the target is solid Register Blue. |
| 560–650 | The right crosshair arm draws out through the C's opening, from the ring to x = 60. |
| 650–1200 | The wordmark sets letter by letter beside it (40 ms stagger), then the header settles. The film version plays "Seat and ring" in sync: clicks at 520 and 600 ms, notes at 650 ms. |

**B. The hero: "Your client approves the proof."**

```
 load           0–900 ms        scroll 0→35%           scroll 35→70%          scroll 70→100%
 ┌────────┐     H1 sets as two   proof sheet lifts,      NJ review-page acetate  callout 4 lands on
 │ H1     │     plates (Press    tilts 8°; callouts      slides from right,      "Approve for filing";
 │ plates │     Plates), locks   1·2·3 tick on in        registers over callout  registration targets
 │ proof  │     in register at   order, 120 ms apart;    3; match glyph locks    at the sheet's four
 │ flat   │     900 ms           fee column aligns       (t-5)                   corners lock; sheet
 └────────┘                                                                      flattens to 0°
```

On phones the sequence runs on tap of "See what your client sees" rather than on scroll, and the sheet stays flat (no tilt), so the proof is always readable.

**C. The Register in product: the fee check.** On a filing's timeline, the fee on the proof and the fee on the state's payment screen appear as two lines. The second slides up (`t-5`, `ease-register`) until the decimal points align, and the match glyph locks. If they differ, it stops 6 px short and stays there, the row turns Stop, motion ends, and the locked words say the filing "stops before paying".

**D. The rehearsal run.** In the home page's log, each row arrives as a thin sheet from the right (180 ms, 60 ms stagger). "matched the proof" locks a match glyph, and "matches the proof" registers its two amounts. Then "Pay Now · held, on purpose" drops in on a marigold bar with pause bars and **everything stops**, as a marigold stage light (12%, radial, from the top) fades up behind the log over 900 ms.

**E. Approving the proof (Counter).** On "Approve, and authorize submission and payment": a progress ring in the button (`t-2`), then a 2 px frame in the firm's color draws clockwise round the sheet (`t-5`), four corner ticks lock, and "Approval recorded" crossfades in (`t-4`). A 10 ms haptic tick on Android. No sound, no confetti, no CoFile mark.

**F. Coverage run bars.** On first view, each row's five-segment bar fills left to right to its stage (60 ms per segment, rows staggered 30 ms). Live rows end with the final segment locking solid green.

**G. Page transitions (Desk).** A cross-document View Transition: the outgoing page shifts 8 px left and fades (`t-3` exit), the incoming arrives from 8 px right (`t-4` enter). Shared elements (a filing's title and status chip) morph between the list and the detail page.

### 8.4 Reduced motion

With `prefers-reduced-motion: reduce`, every sequence jumps to its final state, with only a 120 ms opacity crossfade. There's no parallax, the WebGL scene is replaced by its AVIF still, and the logo sting is skipped. The fee check shows both lines already aligned, or already apart in a stop. A site-wide "Reduce motion" toggle in the footer does the same for people who haven't set the system preference.

### 8.5 Interaction details

Anything that changes on hover also changes on focus. Buttons move down 1 px on press (`t-1`). Links carry a 1 px underline at 3 px offset, 2 px on hover. Copy buttons (API keys, approval links) swap their glyph for a check for 1.6 s and announce it through a polite live region.

---

## 9. Components

Every component reads the same tokens on all four volumes. On Counter pages the `--action` token resolves to the firm's safe color (§11). On CoFile's own pages it resolves to `--register`.

### 9.1 Buttons

| Variant | Rest | Hover | Pressed | Focus | Disabled |
|---|---|---|---|---|---|
| Primary | `--action` fill, `--on-action` text | one step darker (OKLCH L −0.06) | L −0.10, 1 px down | `--focus` ring | 40% opacity fill, `--ink-3` text, `cursor: not-allowed`, still focusable with `aria-disabled` |
| Secondary | `--sheet` fill, `--ink` text, 1.5 px `--rule-strong` border | border to `--ink-2` | `--sheet-2` fill | ring | 50% opacity |
| Quiet | no fill, `--ink-2` | `--ink`, underline | `--sheet-2` | ring | 50% |
| Destructive (Revoke, Turn off, Disconnect, Remove logo) | Secondary with `--stop` text | `--stop-bg` fill | darker | ring | 50% |

Sizes: **L 56 px** (hero CTAs, the proof's approve button, full width under 480 px), **M 48 px** (default), **S 40 px** (dense tables, with a 44 px hit area). Padding 0 24 px (L), 0 20 (M), 0 14 (S). Loading keeps the label, using the locked pending words where they exist ("Sending…", "Saving…", "Creating…", "Opening Stripe…"), adds a 16 px spinner ring and sets `aria-busy`.

### 9.2 Fields

- 52 px tall, 17 px text, 10 px radius, 1.5 px `--rule-strong` border, `--sheet` fill.
- Label above (16/22, 700). Help text sits *between* the label and the input (15/22, `--ink-2`), so it's read before typing, and is tied with `aria-describedby`.
- Focus: border goes to `--action` and the 2 px ring shows. Error: 2 px `--stop` border, a Stop glyph and the message under the field, the field gets `aria-invalid`, and the form's summary ("Please fix these and submit again.") lists every issue as a link to its field.
- Required: `*` in `--stop`, with the locked line "Fields marked * are required." once at the top of the form.
- **Paired fields** follow today's `n2` (2fr 1fr) and `n3` (2fr 1fr 1fr) rows and stack under 560 px.
- **"Same as" / "Same person as":** a row of pill buttons (40 px, secondary) above an address or person block, labeled with the earlier entry ("Same as" · `Main business address`). Pressing one fills the block, and the filled fields flash `--register-tint` for 600 ms. A polite announcement confirms it.
- **Folded optional questions:** "More options (optional)" is a quiet disclosure with a chevron rotating 90° (`t-3`). Folded sections ("… (optional)") are full-width sheets with a 1 px rule. Either opens by itself when it already holds an answer or an issue (today's behavior, kept).
- **Authorizations:** each checkbox statement sits on a `--sheet-2` panel with a 24 px checkbox and its text at 17/27. The statement text is never truncated.

### 9.3 The proof card

The most important component on the site. It must be unmistakable on a phone, at 1.5× text zoom, in Spanish, in dark mode.

```
 PHONE, 375 px                               ┌ sticky strip (appears after 120 px scroll) ┐
┌───────────────────────────────────┐        │ [firm logo 24px]          Total  $103.50   │
│ ▀▀▀▀▀▀▀▀▀ 4px firm color ▀▀▀▀▀▀▀▀▀ │        └────────────────────────────────────────────┘
│ [Harbor & Pine logo]              │  firm header, logo max 32 px high
├───────────────────────────────────┤
│ ┌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌┐ │  Stage banner, dashed marigold, only for a rehearsal:
│ ╎ ◌ Rehearsal: nothing will be  ╎ │  "Rehearsal: nothing will be filed or paid,
│ ╎   filed or paid, even if you  ╎ │   even if you approve."
│ ╎   approve.                    ╎ │
│ └╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌┘ │
│ ⟨filing title⟩                    │  H1, firm font, 28/36
│ Filing reference ⟨id⟩. Please     │  Body; the deadline in 700 weight
│ decide by December 3, 2026,       │
│ 5:00 PM Eastern. After that ...   │
│                                   │
│ ①  The state's review page       │  H2 with step numbers 1–4 in the firm's color
│ ┌───────────────────────────────┐ │  the state's picture, always on a white plate,
│ │ [state page image, pinch zoom]│ │  2 px radius, tap = full-screen viewer
│ └───────────────────────────────┘ │
│ ②  Filing details                │
│ Business name                     │  label above value on phones (Small, ink-2)
│ TWO SISTERS BAKERY LLC            │  value in Data mono 16/24
│ ─────────────────────────────     │
│ ③  State fees                    │
│ Nothing is charged on this page.. │
│ Formation filing fee    $ 100.00  │  Fee style, decimal-aligned
│ NJ portal fee, by card  $   3.50  │
│ ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━  │  2 px ink rule
│ Total                   $ 103.50  │  Total style 24/30
│ ④  ┌ consent ─────────────────┐  │  consent panel, 2 px border in --ink,
│    │ By approving, you confirm │  │  directly above the button it governs
│    │ every detail below ... no │  │
│    │ refund warning ...        │  │
│    └───────────────────────────┘  │
│ One-time code sent to you         │  (only when required) 52 px numeric field
│ ┌───────────────────────────────┐ │
│ │ Approve, and authorize        │ │  Primary L, full width, 2 lines allowed,
│ │ submission and payment        │ │  min-height 64 px when it wraps
│ └───────────────────────────────┘ │
│ ┌───────────────────────────────┐ │
│ │ Request changes               │ │  Secondary L; first press reveals
│ └───────────────────────────────┘ │  "What should change? (Needed only if
│ Questions: ⟨firm support email⟩   │   you ask for changes)", second press sends
│            with CoFile            │  co-brand, bottom, phone placement
└───────────────────────────────────┘
```

Decisions:

- **Order:** what the state will see first (its own page), then every detail, then the money, then the consent and the button. The consent text moves from the top of the page to directly above the button, because consent belongs next to the act. The sentence "Government sites don't save drafts, so once you approve, the whole filing is sent in one go. Please check everything now." stays at the top, after the deadline, as the instruction to read before scrolling.
- **The four numbered markers** reuse the home page's callouts 1–4, so the sample on cofile.app and the real proof teach the same reading order.
- **No sticky approve button.** An irreversible act shouldn't follow you down the page. Only the total follows you, in the sticky strip.
- **The state's review page image** always sits on a white plate in dark mode, opens full screen with pinch zoom, and keeps its existing alt text.
- Masked SSNs show the locked line "Social Security numbers are masked on this page. We store them encrypted and delete them after 30 days." directly under "Filing details".
- When a fee cap exists, "Maximum you authorize" is its own row under Total, with its parenthesis "(if the state asks for more, we stop before paying)" in Small on a second line.

### 9.4 Status chips

Height 28 px (24 px in dense tables), pill, 13/16 Atkinson 700, a 14 px glyph, 10 px side padding. Go and Live are **solid** fills. Stage is a **dashed** 1.5 px marigold outline on `--stage-bg`. Your move, Stop and Moving are tinted fills. Under Windows High Contrast (`forced-colors`) every chip keeps its glyph and gains a 1 px CanvasText border. The dashed and solid difference survives.

### 9.5 Banners

| Banner | Look | Copy (locked) |
|---|---|---|
| Beta notice, CoFile pages | 40 px strip above the header, `--sheet`, bottom border 1.5 px dashed marigold, a small dashed "Beta" chip | "CoFile is in beta. Any filing can run as a free rehearsal … Questions or problems? hello@cofile.app" |
| Beta notice, firm pages | Same strip in neutral `--sheet-2`, no CoFile name | "This service is in beta. Any filing can run as a rehearsal on the state's real website. It stops before the last button, so nothing is filed or paid. Filing types go live one at a time." |
| Phones | The strip shows "Beta" plus the first sentence as a native disclosure; tapping reveals the rest. Nothing is cut, only folded | |
| Rehearsal notice (forms, desk, intake) | Stage family: dashed marigold box, Stage glyph | e.g. "Rehearsal: {type} isn't live yet, so this filing is a rehearsal. …" |
| Your move (Ready to pay, needs action) | Register tint, arrow glyph, link at the end | "1 approved filing is ready to pay and need your card's security code. Pay and file" (wording per count, as in the code) |
| Stop | `--stop-bg`, octagon glyph, the reason in Body | the filing's own error text |
| Subscription | Your move family | "Real filings need an active subscription; rehearsals are free. Subscribe" |

### 9.6 Toasts

Bottom center on phones (above the tab bar), bottom right on desktop, 360 ms in on `ease-enter`, `role="status"`. They auto-dismiss after 6 s, or stay until closed if the text is longer than 12 words or reports a failure. Example: "Thanks. Filings for this card pay with it for the next hour."

### 9.7 The filing timeline

A vertical spine on every width (it reads on a phone without sideways scrolling). Nodes are 20 px glyphs in their status family. Done segments are solid 2 px `--ink-2`. The current node has a 6 px halo in its family tint. Future nodes are hollow, and in a rehearsal the spine below approval is **dashed marigold** to the end, where it stops on a Stage node with pause bars.

```
  ● Received                         Dec 1, 9:14 AM
  │
  ● Getting the state's review page  Dec 1, 9:15 AM
  │
  ➜ Waiting for approval    ◀ halo   "The approver has a link to check exactly what will
  ┆                                   be filed and approve it."   [Link to the proof]
  ○ Approved
  ┆
  ○ Filing now   ── fee check: [proof $103.50] ⟷ [state's payment screen $103.50] ⊕
  ┆
  ○ Submitted to the state
  ┆
  ○ Accepted by the state ─── ○ EIN issued
  ┆
  ○ Completed   ── Documents · EIN letter
```

Each node expands to show its `nextStep` text, run steps ("Progress on the state site") and documents.

### 9.8 Tables

Header row on `--sheet-2`, 13/16 Atkinson 700 `--ink-2`, sentence case (no all-caps, which matters for Spanish). Rows 56 px, 1 px `--rule` dividers, no zebra stripes. The first column's text is the link, and the whole row gets a hover tint as an enhancement. Money columns are right-aligned and decimal-aligned. Under 768 px every table row becomes a stacked card: title first, chip top right, the other columns as label and value pairs.

### 9.9 Navigation

- **Poster top bar:** wordmark left. Links "How it works", "For firms", "What we file", "For platforms" (Body 17). Right: "Log in" (quiet) and "Run a free rehearsal" (primary M). 72 px tall, compressing to 56 px after 80 px of scroll, on `--stock` at 92% with a 16 px backdrop blur. Under 860 px the links move into a full-screen sheet in Register Blue, opened by an icon button labeled "Sections" (the nav's existing accessible name), with the links set in Display size.
- **Desk nav:** a 248 px left rail at ≥ 1024 px with the firm's logo at the top, the locked menu (Filings, New filing, Ready to pay, Client links, Signatures, Setup, Billing), the user's email and "Log out" at the bottom, and "with CoFile" under that. Ready to pay carries a count badge in the Your move family when filings are waiting. Under 1024 px: a top bar with the logo, and a bottom tab bar with Filings, New filing, Ready to pay and Client links, plus an overflow sheet ⟨copy to come: its label⟩ for the rest.
- **Dashboard nav:** the same rail with the CoFile wordmark, and the locked items Overview, Filings, Ready to pay, Firms, API keys, Webhooks, Setup, Team, Billing (or Sign-ups for the platform tenant), Docs.

### 9.10 The coverage table ("run sheet")

```
 Filing                                         Where        Where it stands
 ───────────────────────────────────────────────────────────────────────────────────────
 LLC formation                                  New Jersey   ▰▰▰▰▱  ┆Rehearsed to the payment screen┆
 EIN, with the IRS letter saved                 IRS          ▰▰▰▱▱   Screens recorded, rehearsal next
 Corporation formation (for-profit)             New Jersey   ▰▰▱▱▱   Offered, not yet rehearsed
 Alternate name, charter amendments             New Jersey   ▰▱▱▱▱   Planned
 ⟨any type switched on⟩                          …            ▰▰▰▰▰  ● Live
```

- Five segments, one per stage: Planned, Offered, Screens recorded, Rehearsed, Live. The labels stay the locked words. The bar only repeats them as a shape.
- Live: all five segments solid Go green, with the solid Live chip. Rehearsed: four segments marigold, with the dashed Stage chip. Lower stages: segments in `--ink-3` with plain text labels and no chip, so only the two top stages ever look like badges.
- A filter row of place chips (New York · New Jersey · Florida · IRS, the footer's own words) narrows the table. It's off by default, so the full list of 16 stays visible.
- Each bar has `role="img"` and an `aria-label` that repeats the stage label. The label text is always present, so the bar adds nothing a screen reader needs.
- Under 768 px each row is two lines: the filing (700 weight), then "Where · label", with the bar under it.
- The locked footnote ("Rehearsed to the payment screen: CoFile completed every screen … we'll tell you each one by name.") sits under the table at Small, with the mailto link styled as a secondary button-link.

### 9.11 Empty states, code, the security code field

- **Empty states:** a press drawing (an empty press bed with four registration targets), the locked text, and the locked buttons. Filing desk: "Your desk is clear. Start a filing (it can be a free rehearsal), or send a client a link with your logo on it." with "New filing" and "Send a client a link".
- **Code blocks:** always on Press Black `#15131C` in both modes, text `#F2F0EA`, keys `#A9A3FF`, strings `#7FE0B0`, numbers `#FFC24F`, comments `#9A96A8`, with a copy button top right. `"dryRun": true` is highlighted in marigold everywhere it appears, so a rehearsal flag in code looks like a rehearsal on screen.
- **Security code (Basis Theory iframe):** styled through the vault's style API to match our 52 px fields, 4 boxes for 3–4 digits rendered as one input (one field, `autocomplete="cc-csc"`), with the card's label and last four above it.

---

## 10. Page by page

### 10.1 Home `/` (Volume 3, Poster)

**Hero, desktop ≥ 1024**

```
┌ Beta strip (dashed marigold) ──────────────────────────────────────────────────────────────┐
├──────────────────────────────────────────────────────────────────────────────────────────────┤
│ CoFile           How it works  For firms  What we file  For platforms   Log in [Run a free rehearsal] │
╞══════════════════════════ full-bleed Register Blue field #3B2CF5 ════════════════════════════╡
│  FOR CPA, PAYROLL, FRACTIONAL CFO AND TITLE FIRMS     (kicker, stock 14/20)                     │
│                                                    ┌ crop marks ┐                               │
│  Your client                                        ╭─────────────────────────╮                 │
│  approves the proof.        (Mega, stock,           │ Harbor & Pine CPA        │ ← 3D sheet     │
│  Then CoFile files it.       7 cols, plates          │ example firm             │   (5 cols),    │
│                              lock at 900 ms)         │ Two Sisters Bakery LLC ┆Rehearsal┆      │
│  CoFile fills in your clients' LLC and ...  (Lede,   │ ① name · members · addr │   acetate of   │
│  stock at 92%, 6 cols)                               │ ② $100.00  $3.50 $103.50 │   NJ review    │
│  [Run a free rehearsal]  [See what your client sees] │ ③ NJ's own review page ⊕ │   page slides  │
│   (primary L: stock fill, Register text)  (outline L) │ ④ [Approve for filing]   │   in (§8.3 B)  │
│  In beta. A rehearsal fills in every screen ...      ╰─────────────────────────╯                 │
│  (Small, stock 85%)                         Sample proof · test details · not a real business │
╘══════════════════════════════════════════════════════════════════════════════════════════════╛
```

On the blue field the primary button inverts: Stock fill, Register Blue text (6.6:1). The sample proof is a white sheet with Press Black type. It is the only white object in the hero, so the eye lands on it.

**Hero, phone (375):** the kicker, the H1 at 48/45 (three lines), the lede, two full-width L buttons stacked, then the beta note. The sample proof follows as a flat sheet at full width, callouts on the left margin, with the acetate already registered. "See what your client sees" scrolls to `#proof` and plays the registration once there.

**Sections in order** (locked copy as in `web/app/page.tsx`):

| # | Section (locked H2) | Layout | Visual and motion | Phone |
|---|---|---|---|---|
| 2 | "You start it. Your client approves it. CoFile files it." | Stock field. H2 across 10 cols; three steps as three tall sheets in a row, each topped by a huge numeral (Press 900, 160 px, `TRAP` 100) | The middle sheet ("Your client approves it.") is raised (e2) and carries a Register Blue top edge, picking up "your client is in charge of the middle one" | Steps stack; numerals at 96 px |
| 3 | "Your client sees what the state will see, before the state does." | 5/7 split: H2 and lede left, the six ticks right as a list with match glyphs | The 3D scene's second act: the acetate lifts off the proof and re-registers as you scroll the list. The 8879 line gets a 1.5 px Register Blue underline, because CPAs will look for it | Sheet above, list below |
| 4 | "Your name on the door. Ours in small print." | Overprint Violet field | A real partner's office door with their name (photography, when available), else a press drawing of a door plate. "Ours in small print" is shown literally: a "with CoFile" lockup at true size, 12 px, circled by a crop-mark loupe | Photo crops to 4:5 |
| 5 | "Clients don't fill in forms. They text you." | Stock. Left: H2 and lede. Right: a phone-sized message bubble | Ana Ortiz's bubble arrives with a typing indicator (600 ms). Then "↳ read into a drafted New Jersey LLC formation for your team to check" draws as a line to a small draft sheet whose fields fill one by one. "A message alone never reaches the state." gets a 700 weight | Bubble full width |
| 6 | "Checked twice. Filed once." | Press Black field, stock type | Two fee plates, "$103.50" and "$103.50", register in the Mega style across the field (scroll-scrubbed). The five ticks sit below in two columns | One column |
| 7 | "The papers come back to you." | Stock | Press drawing: documents and the EIN letter flowing back into one folder labeled with the firm's name ("Harbor & Pine CPA") | Drawing above the list |
| 8 | "Rehearse on the real stage." | Press Black field, stage-light gradient | The rehearsal log as a run of sheets (§8.3 D). "Pay Now · held, on purpose" lands on marigold and the page goes still. Caption below in Small | Log full width, rows 2 lines |
| 9 | "New York, New Jersey, Florida and the IRS." | Stock, full 12 cols | The run sheet (§9.10) with crop marks at its corners | Stacked rows |
| 10 | "Every filing service has a catch. Here's ours." | Stock, 8 cols centered | Five numbered points, numerals in Press 900 at 72 px in Register Blue, each point on its own row with a hairline. No decoration: honesty looks plain | Numerals 48 px |
| 11 | "Security" | `--sheet-2` field | Five blocks in a 3 + 2 grid, each with a press-drawing icon (a vault door, a masked number, a single-use ticket, a signature line, separate drawers) | One column |
| 12 | "Building a filing product? Put CoFile underneath it." | Press Black field, code-rail feel | List left (with `"dryRun": true` highlighted in marigold). Inquiry form right on a white sheet: Name, Company, Work email, Phone (optional), States you file in, Filings per month, What you'd like to do (optional), [Send] | Form below list |
| 13 | "Run one rehearsal. Then decide." | Full-bleed Register Blue | H2 in Display, lede, [Run a free rehearsal] (inverted), "Questions first? hello@cofile.app". The tagline "Approve the proof. Then it's filed." is set huge in CoFile Press Plates at the very bottom, its two plates registering as it enters the viewport, with the mark beside it | Tagline wraps to 3 lines |

**Footer:** Press Black field. Wordmark; "CoFile · the filing desk behind your firm"; "New York · New Jersey · Florida · IRS"; the legal line ("CoFile is not a law firm or a government agency, isn't affiliated with any state or the IRS, and doesn't give legal or tax advice."); Terms · Privacy · Security · hello@cofile.app; and the "Reduce motion" switch ⟨copy to come⟩.

### 10.2 Sign-up, log in and account pages (Volume 2)

One template, **"the slip"**: a split screen. On the left (5 cols) is a Register Blue panel with the page's kicker and H1 in Display. On the right (7 cols) is the form on a white sheet. Under 768 the blue panel shrinks to a 160 px band above the form.

| Route | Blue panel | Form side | Notes |
|---|---|---|---|
| `/signup` | "For firms" / "Set up your firm's filing desk" + the locked paragraph | Firm name, Kind of firm, Your name, Work email, Password, Password again, Phone (optional), Website (optional), States you file in; Terms checkbox; [Create account]; the review note; "Already have one? Log in." | A live preview tile in the blue panel shows the firm's name, as typed, on a mini filing-desk header. It's the first taste of "your name on the door" |
| `/signup/sent` | "Your filing desk" / "Check your email" | The locked text and "send the link again" | An envelope press drawing, its flap registering shut (`t-5`) |
| `/login` | "Log in" / "Welcome back" + "Firms go to their filing desk, platforms to their dashboard." | [Continue with Google] first (secondary L with Google's mark per their rules), divider, email, password, [Log in], "Forgot your password?", "New here? Set up your firm's filing desk. Enterprise developers can also log in with an API key." | Each locked error message ("No account uses that Google email…") appears as a Stop or Your move banner above the form |
| `/forgot-password` | "Forgot password" / "Reset your password" | email, [Email me a reset link], "Back to log in" | |
| `/reset-password` | "Reset password" / "Choose a new password" | New password, New password again, the 12-character help text, [Set new password] | A strength meter as five segments, using the run-bar shape |
| `/verify-email` | "Your filing desk" / "Confirm your email" | "One click and your email is confirmed." + one button | Button press first, as the code requires (so mail scanners confirm nothing) |
| `/invite-expired`, `/join/<token>` | "This link has expired or isn't valid" | The locked text | |
| `/terms`, `/privacy` | No blue panel. A Volume 2 reading page: 760 col, a sticky table of contents at ≥ 1024, H2s in Press, body in Atkinson 18/30, version and date in mono under the H1 | | |
| 404 / error | A misregistered target, at rest: two plates offset and still. "Page not found" / "The link may be old or mistyped." / [Go to the home page]; "Something went wrong" / "This page couldn't load just now. It's usually a short hiccup on our side." / [Try again] [Log in again] | | The one place a misregistration is shown still: the page isn't where it should be |

### 10.3 Partner filing desk `/p/<slug>` (Volume 2 chrome, firm-branded content)

The desk is CoFile's tool with the firm's name on it. The rail carries the firm's logo and color (its top 4 px rule and the active-item marker). Buttons use the firm's safe action color. Type, status and structure are CoFile's.

| Page | Layout and what goes where |
|---|---|
| **Filings** (home) | H1 "Filings" with [New filing] top right. Banners in this order: subscription, Ready to pay, "N filings need someone to act." Then the filing table (Filing · Type · Status · Started). Rehearsal rows carry a dashed Stage chip beside the title (replacing today's "Test" badge, see Appendix B). A "Your move" filter chip pins action-needed filings to the top. Empty: §9.11 |
| **Setup** | "Set up your account" / "You're set up". A vertical stepper of three sheets (Your firm, Branding, Payment) with filled discs when done, plus the optional Registered agents card. The next step's button is primary. When all three are done, a full-width [Start a filing] |
| **Setup › Branding** | "Step 2 of 3" / "Branding". Two columns at ≥ 1024: controls left (web address, name your clients see, logo upload, main color, second color, font preset or upload, support email); **live preview** right, showing the client's proof and intake header at phone size with a light/dark toggle. The automatic contrast fixes appear here, inline (§11.3). On phones the preview is a sticky 33 vh pane on top |
| **Setup › Agents / Details / Payments** | Single 720 column. Agents: one row per offered state. Payments: a "How state fees are paid" radio pair as two large choice sheets ("One card for every filing" / "A card for each type of filing, with one main card for the rest"), then card pickers |
| **New filing** | Step 1: "Which state is the business in?" with three big state sheets (New York, New Jersey, Florida), each with its count line ("2 filing types, plus the federal EIN"). The rehearsal note in a Stage banner. The "send us the details" ways as a compact list. Step 2: "{State}: what are you filing?" as a grid of filing-type sheets, each with a **Live** solid chip or a **Rehearsal** dashed chip, summary and fee note |
| **New filing › form** | 720 column. The H1 is the filing title. The Stage banner if not live. "Start from a client you filed for before" as a select row. Sections as sheets with legends; paired fields; "Same as" pills; optional folds; Authorizations; footnote "Nothing is filed until your client approves the proof."; [Send the proof to my client] (primary L) with the fee note beside it. On ≥ 1280 a right-hand **summary rail** shows the filing building up as a mini proof (name, people, fees), in Data mono |
| **Filing detail** | Title, chip and Rehearsal chip; meta line. The timeline (§9.7) is the spine of the page. Beside it at ≥ 1024: cards for "Link to the proof" (the link in mono with copy), Documents, EIN, "Save to Google Docs". Missing information appears as an inline form at the "Needs information" node |
| **Client links** | "Send a client a link". The form (type, label) on a sheet, then "Links you sent" (For · Filing · Made · Status) with "Turn off" as a destructive S button. The link status uses chips: "Waiting for the client" (Your move), "Used" (Go), "Turned off" and "Expired" (Moving, grey) |
| **From email** `/from-email/<id>` | Two panes: the original message on the left as a quoted sheet (sender, time, text in Body), the drafted form on the right with a Register tint on every field the AI filled, so staff can see what to check. The locked lines ("This looks like a request for:", "Open the filled-in form", "Not this filing? Choose another") sit at the top of the right pane. When the text was deleted after 30 days, the left pane shows the locked notice on `--sheet-2` |
| **Signatures** | "Saved signatures" and the locked explanation. Each signature on a white "paper" tile (white in dark mode too, as today) with the signer's name; [Add a signature] opens the pad in a dialog |
| **Ready to pay** | "Ready to pay" and the locked explanation. One sheet per card, listing its waiting filings, with the security code field and its button. On success the toast "Thanks. Filings for this card pay with it for the next hour." shows and each filing's chip moves forward |
| **Billing** | The plan panel and the picker as sheets. Prices come only from Stripe once set. The locked line "Real filings need an active subscription. Rehearsals are always free." in Stage style. "Manage billing" secondary |
| **Password**, **Signed out** | Volume 2 single column. Signed out uses the slip template |

### 10.4 Permanent service pages `/<firm>/<service>` (Volume 1)

A firm's public page for one filing: the firm's header (logo, name, 4 px top rule), the H1 filing title in the firm font, the summary, the rehearsal notice when not live, then the intake form. The footer carries the Terms and Privacy line, the firm's support email and "with CoFile". The page is designed to be shared and bookmarked, so it gets an Open Graph image generated per firm and service: the firm's logo and the filing title on a sheet with crop marks, in the firm's color.

### 10.5 Client-facing pages (Volume 1)

- **Intake `/i/<token>`:** the firm header with "with CoFile" (phone: bottom). The Stage banner when in rehearsal ("This page is in rehearsal for now. … To file for real, contact {firm}."). H1, the summary, the form, the footnote ("Next, you'll get a proof to check. Nothing is filed until it's approved."), the Terms and Privacy line, and [Send to {firm}] as primary L. Progress is shown as a slim section index at the top on phones (section names only, from the form's own legends).
- **The proof:** §9.3.
- **After deciding:** the same branded page. "Approval recorded" with a filled Go disc that draws in (`t-5`), then the locked paragraph (the rehearsal or the live version). Request changes shows "Thank you. Your change request is recorded, and nothing will be filed from this link. …" with a Your move glyph.
- **Expired and invalid links** (all four locked messages: "This link to the proof has expired. Ask whoever sent it for a new one.", "isn't valid", "already recorded", "That code didn't match…"): the firm's header (when known), a single sheet, the message in Body 20/32, a neutral glyph (never a Stop octagon: the client did nothing wrong), and the firm's support email. The code-mismatch message gets a "Go back" action ⟨copy to come⟩.

### 10.6 Enterprise dashboard `/dashboard` (Volume 2)

Built for developers and operations people, so it's denser than the desk: Body stays 17, but tables run 48 px rows.

| Page | Design |
|---|---|
| **Overview** | Account name as H1. Banners (subscription, Ready to pay, setup missing). Four stat sheets: Filings ("N live, M rehearsals", with a split bar solid green vs dashed marigold), Webhook deliveries ("pending, failed"), API keys ([Manage keys]). Then "By status" (a horizontal bar per status family), "By state", "By month" (columns). "As of …" in Caption mono |
| **Filings** | A full table with filter chips by family and by state. Waiting rows carry "Ready to pay: needs the card's code" as a Your move chip |
| **Firms / firm detail** | Table of firms with "Filing desk" status ("Not set up" in Moving grey). Firm detail: the same branding preview as the desk's Branding setup, plus invite staff |
| **API keys** | Keys table: name, the prefix `cofile_` + 8 in mono, created, "Last used", [Revoke]. A new key appears once in a `--sheet-2` secret box with a dashed border and a copy button |
| **Webhooks** | Endpoints as sheets: URL in mono, "Signing secret ends in …", "Every event" or a checklist of events, a delivery log with status chips per delivery |
| **Setup** | Long-form settings as anchored sheets: "Payment methods", "State portal logins" (one row per portal: NY DOS, NYS-100, NJ, IRS, FL, with Connect / Disconnect / "Not needed" and a sealed-lock glyph once connected), portal defaults, "Who's named on your filings", "Your registered agent in each state" |
| **Ready to pay, Billing, Team, Password** | As on the desk. Team: name, email, role, "Last signed in" |
| **Sign-ups** (platform tenant) | Two queues as tables: "Waiting for approval" partner sign-ups and "Enterprise requests" (company, "States, volume", message). Approve is primary S, decline is destructive. Row expansion shows the full inquiry |

The rail and header carry the CoFile wordmark. The only brand flourishes are the wordmark and Register Blue on actions and "Your move" chips. Dark mode is fully supported here (many developers live in it).

### 10.7 White-label surfaces (Volume 0)

`/e/<tenant>/<firm>/<service>` and `/embed/...` use the Counter templates with every CoFile signature removed. There's no "with CoFile", the match glyph is swapped for a neutral check, and no CoFile font is loaded except Atkinson for details and fees (an unbranded, widely used typeface). There's no beta strip in the widget. The widget's frame has no chrome: transparent background by default (or `--sheet` if the host page asks), a 16 px inner padding, and it inherits the enterprise's theme through the same token set. Its height follows its content through `embed.js`.

### 10.8 Developer docs `/docs` (Volume 2)

Three columns at ≥ 1280: navigation rail (Overview, Guides, Reference, Endpoints, OpenAPI (JSON)), prose at 760, and a code rail at 380 that keeps the current example in view. Under 1280 the code sits inline.

- **Overview:** the locked intro, then "Quick start" as four numbered steps, each with its code block, and `"dryRun": true` in marigold.
- **Guides** (Authentication, Filings and the lifecycle, Filing types, fields and state fees, Approvals, Webhooks, Errors, Saved signatures and PDF uploads, White-label firm portal): Press H1, Atkinson 18/30 body, mono 15/24 code. The lifecycle guide uses the §9.7 timeline as its diagram, with raw status names in mono beside the plain labels.
- **Reference** (the endpoints): one row per endpoint, with a method pill (GET Go green, POST Register, PUT marigold-ink, DELETE Stop), the path in mono and deep links. Request and response examples come with language tabs.
- **For agents:** `/llms.txt`, `/docs.md` and `/openapi.json` are linked from a "For your tools and AI agents" card with download buttons. Their pages are plain text, so the design shows them as a mono preview with a copy button.

### 10.9 Emails (through Resend)

Two templates, one system.

**Client emails** (Volume 1, the firm's brand): approval request ("Your proof is ready to approve: …"), missing information, changes requested, completed (documents attached), rejected, and the filing submitted and EIN issued messages (template designed; copy to come, Appendix B). **CoFile account emails** (Volume 2): confirm your email, reset your password, your partner account is open, your CoFile account is ready, invitations, and the card security code needed (to the card's owner).

```
 600 px, single column, 24 px padding, bulletproof (table layout), dark-mode aware
┌──────────────────────────────────────────────┐
│ ▀▀▀▀▀▀▀▀▀▀▀ 4 px firm color (client) ▀▀▀▀▀▀▀ │   CoFile emails: wordmark, 4 px Register Blue
│ [firm logo, max 40 px high]                  │
│                                              │
│ ┆ Rehearsal: nothing will be filed or paid, ┆│   Stage box, rehearsals only (as text, not image)
│ ┆ even if you approve.                      ┆│
│ Your proof is ready.  ← first sentence as    │   20/28 bold; then the rest of the locked body
│ Open the link to see every detail ...        │   at 16/24, system font stack
│                                              │
│ [  Open your proof  ]   ← firm safe color,   │   48 px bulletproof button, locked label
│                          VML fallback        │
│ Or paste this link into your browser: ...    │   13/18 grey
│ ─────────────────────────────────────────    │
│ Questions? ⟨firm support email⟩   with CoFile│   co-brand only for partner firms' clients
└──────────────────────────────────────────────┘
```

- Fonts: Atkinson Hyperlegible via webfont where supported, falling back to the system stack. The firm's font is not used in email (too unreliable).
- Fees and references in email are in a mono stack. The attached "State review page.png" is mentioned in the body as today.
- The security-code email never shows a field: the button "Enter security code" goes to Ready to pay, and "Never reply to this email with the code." is set in 700.
- Dark mode: `prefers-color-scheme` styles with a dark logo variant if the firm uploaded one, otherwise the logo sits on a white plate.
- The plain-text version is first-class (the same order, the link on its own line).

### 10.10 New surfaces I'd add

- **A public status page** (`status.cofile.app`): live and rehearsal state per filing type (reusing the run sheet), plus a notice when a state's website changed and filings are paused for review. Copy to come.
- **A shareable rehearsal report:** after a firm's first rehearsal, a page (on its desk) that plays back the run as the §8.3 D sequence, with the screens recorded. It turns "try one on a filing you know by heart, and compare it screen by screen" into a moment a firm owner can show a partner. Copy to come.

---

## 11. The white-label theming system

Thousands of firms will pick their own colors and fonts. The system's job is to let every one of them look like itself while keeping contrast, legibility and status meaning intact, with no designer in the loop.

### 11.1 What a firm controls

| Control | Where it shows | Guardrail |
|---|---|---|
| Logo (light; optional dark variant) | Header, the proof, intake, emails | Transparent margins trimmed automatically; max 40 × 200 px desktop, 32 × 160 phone. A dark logo in dark mode goes on a white plate (8 px padding, 6 px radius) |
| Name your clients see | Header, titles, emails | Firm font, never truncated, wraps to 2 lines |
| Main color | Primary buttons, 4 px top rule, active nav marker, step numbers on the proof | Rules 1, 3, 4 below |
| Second color | Links, highlights | Rule 2 |
| Font: a preset (Standard, Inter, IBM Plex Sans, Roboto, Open Sans, Lato, Montserrat, Source Serif, Merriweather, Lora) or an upload (600 KB max) | Headings and the firm's name; body only if it passes the check | Upload check: must cover Basic Latin and Latin-1 (Spanish accents and ¿ ¡); x-height at least 0.45 em for body use, otherwise headings only. **Details, fees and codes always use Atkinson Mono** |
| Support email, web address | Footer, the proof, service page URLs | |

Firms never control status colors, the proof's structure, the consent panel, field sizes or type sizes.

### 11.2 Derived tokens

From the main color `M` and second color `S`, the theme package `@cofile/theme` computes, in OKLCH:

`--action`, `--on-action`, `--action-hover`, `--action-press`, `--firm-rule` (= `M` unchanged), `--link` (from `S`), and dark-mode versions of each. The same package runs in the web app, in the engine's proof renderer (api.cofile.app) and in the email builder, so a firm looks the same in all three.

### 11.3 Automatic fixes

1. **Text on the action color.** If white text reaches 4.5:1, keep it. Otherwise, if the color is light (OKLCH L ≥ 0.75) and Press Black text reaches 7:1, switch the text to `#15131C` and keep the firm's exact color. Otherwise darken in OKLCH, keeping hue and chroma (clamped to the sRGB gamut), in steps of 0.005 L until white reaches 4.5:1.
2. **Links.** `S` is darkened the same way until it reaches 4.5:1 on both `--sheet` and `--stock`.
3. **Status protection.** If `M` falls in the Stop band (OKLCH hue 15°–40°, chroma > 0.12), the proof's approve button uses `--firm-ink` (`M` at L 0.30) and the firm's red stays on the top rule, the logo and the step numbers. A red "Approve" must never look like a red "Stop". If `M` sits in the Stage band (hue 60°–95°), rehearsal banners keep their dashed border, so a yellow brand never looks like a rehearsal.
4. **Dark mode.** `--action` is lifted to L 0.76 to 0.80 with `#0F0E14` text, and checked again for 4.5:1.

Worked examples (computed):

| Firm color | White text | Fix | Result |
|---|---|---|---|
| Teal `#2E8C83` (our sample "Harbor & Pine CPA") | 4.04 (fails) | Darken | `#22837A`, white 4.57 |
| Yellow `#F7C600` | 1.61 | Light color, Press Black text 11.4 | Color kept, ink text |
| Sky blue `#7FC8F8` | 1.82 | Press Black text 10.1 | Color kept, ink text |
| Green `#2BAE66` | 2.86 | Darken | `#008843`, white 4.56 |
| Red `#D62828` | 5.01 (passes) | Stop band | Approve button `--firm-ink`; red on the rule and logo only |

The Branding setup shows every fix live in the preview, next to the firm's original color ⟨copy to come: the explanation⟩. A firm can't switch the fixes off.

**Testing:** a theme fuzz suite renders the proof, the intake and an email for 10,000 random color pairs and every font preset, in light and dark, and fails CI on any text pair below 4.5:1 or any action color inside the Stop band.

---

## 12. Accessibility, Spanish and dark mode

**Accessibility (WCAG 2.2 AA everywhere, AAA on the proof).**

- Proof body text is 7:1 or better (Press Black on white is 18.6:1). Targets are 44 × 44 px minimum, 48 typical, 56 for the approve button.
- Reflow at 320 CSS px and 200% text zoom with nothing lost. The proof becomes one column with label-above-value rows.
- Proof semantics: one `h1`, `h2` per step (the circled numbers are `aria-hidden`), the fee list is a real `<table>` with `th scope="row"`, the consent panel is the approve button's `aria-describedby`, and the review page image keeps its alt text ("Every value on it is also listed as text under Filing details").
- Focus order follows reading order, there's a skip link on every page, and focus is never hidden by sticky bars (`scroll-padding-top` matches the sticky strip).
- `forced-colors` keeps glyphs and the solid/dashed distinction. Nothing depends on hover or on color alone.
- No thin type: text never below weight 400, Press never below 500.
- Testing with real people: sessions with readers over 60, screen reader users (VoiceOver iOS, TalkBack, NVDA) and Spanish-first business owners, on the proof and the intake form first.

**Spanish.** Every layout allows text 30% longer than English. Buttons wrap to two lines and grow, and never truncate. Pages set `lang="es"` when translated. Uppercase is limited to the kicker, and accents stay on capitals (`ÉXITO`, not `EXITO`). Dates follow Spanish order when translated. Client pages get a language switch top right ⟨copy to come⟩, remembered per link. The translation itself is a copy job: the consent and authorization texts need counsel, and until they're translated the English consent stays the binding text, shown in full.

**Dark mode.** Every surface supports it, following the system setting, with a manual switch (system, light, dark) in the footer and in the desk's account menu. Fixed exceptions: the state's review page image and signature tiles always sit on white, code blocks are always Press Black, and the Poster hero swaps Register Blue for Overprint Violet with Register Blue plates.

---

## 13. Production

**Stack.** The existing Next.js app. Tokens are written once in W3C Design Tokens JSON, then built with Style Dictionary into `tokens.css`, a TypeScript module for `@cofile/theme`, and email-safe constants. Figma variables sync from the same JSON.

- **Motion:** CSS and the View Transitions API for the desk and dashboard. Motion (motion.dev) for components. GSAP ScrollTrigger for the home page's scroll sequences. **Rive** for the logo sting, the match glyph, the 404 plates and the approve lock (state machines, about 30 KB each).
- **3D:** react-three-fiber with drei, lazy-loaded after the largest paint. At most 450 KB gzipped including KTX2 textures. AVIF still fallback.
- **The proof** (server HTML from `src/approvals/render.ts`): one inlined CSS file generated from tokens plus the firm theme, computed server side by `@cofile/theme`. Approving needs no JavaScript, and the lock motion is CSS only.
- **Emails:** React Email components rendered to HTML and sent through Resend. Tested across Outlook (VML buttons), Gmail, Apple Mail and their dark modes.
- **Quality:** Storybook with visual regression, axe and Playwright accessibility checks in CI, the theme fuzz suite. Budgets: home LCP under 2.0 s on a mid-range phone on 4G, under 170 KB of JS before the 3D loads, display font subset under 90 KB, text font under 70 KB for two weights.

**Figma library.** 00 Foundations, 01 Identity, 02 Components, 03 Poster pages, 04 Desk, 05 Counter (with a theming playground of 12 sample firms, including the five in §11.3), 06 Dashboard and Docs, 07 Email, 08 Motion (storyboards, linked Rive files).

**Assets.** The mark, wordmark and lockups (SVG and PNG, light and dark, micro cut); favicon set, touch icon, maskable icon; Open Graph images (home, plus a generator per firm service page); 12 press drawings; the 3D scene and stills; 6 partner portraits and 6 still lifes; 4 Rive files; sonic logo masters; a 45-second launch film in 16:9, 9:16 and 1:1, cut from the hero sequence and built only from locked lines; 6 kinetic type posters; 2 email templates covering every message.

**Commissions (by kind).** An independent type foundry (CoFile Press and Plates, about 16 weeks). A 3D and material studio (scene, stills, film shots). A technical illustrator (press drawings). A documentary photographer (partner portraits). A sound designer working with a percussionist (sonic logo). An independent accessibility auditor. A Spanish transcreation agency working with counsel.

**Phases.**

| Phase | Weeks | What ships |
|---|---|---|
| 0 | 2 | Tokens, stand-in fonts, status system, `@cofile/theme` and its fuzz tests |
| 1 | 5 | Trust first: the proof, client pages, the desk, emails |
| 2 | 4 | Home page (2D with Rive), auth pages, dashboard, docs |
| 3 | 8–12, starting in week 1 | Commissions land and swap in: typeface, 3D, photography, sound, film |
| 4 | after | Spanish, the status page, the rehearsal report |

---

## Appendix A: what I'd push back on in the current site

1. **It's polite and forgettable.** Cream paper, manila, a serif with Plex and a folder-tab mark read as "careful", but so does every bank brochure. Nothing in it would be remembered after one visit, and the folder tab says "office supplies", not "filed with the state".
2. **Green does three jobs:** the brand, approved and live, and the button that moves a filing forward. On firm pages the firm's color then replaces it, so "approved" has no color you can rely on.
3. **Amber means both "rehearsal" and "needs someone to act".** Rehearsal ends up reading as a warning rather than a strength.
4. **15 px body text** on the desk and dashboard is too small for the people this site serves.
5. **The proof is the most important page and the least designed:** inline styles, the consent above the details instead of beside the button, two buttons side by side on a phone. The email button is a hard-coded blue (`#1f4fd1`) that belongs to neither the firm nor CoFile.
6. **Live vs rehearsal rests on a small chip.** It needs a shape difference (solid vs dashed) and the run bar.
7. **The partner desk puts CoFile's name top left and the firm's in the corner.** It should be the other way round.
8. **The contrast fix only handles button text** (`textOn` flips to `#111` above luminance 0.4). Nothing checks the second color used for links, and nothing stops a red approve button from reading as "stop".
9. **The marketing nav disappears under 860 px** (`display: none`) with no menu to replace it.

## Appendix B: copy notes

These are suggestions only. None of them appear in the design above.

1. The filing list shows a **"Test"** badge on rehearsals, and the filing page says "test run" / "filing run" under "Progress on the state site". The locked term is "rehearsal".
2. **"Sign in" survives** in "You're not signed in to this filing desk", the "Signed out" page title, the "Signing in…" button state, and the Team page's "People who sign in" and "Last signed in". The locked term is log in / log out.
3. The "Your partner account is open" email says **"practice filing"**. That term is superseded by "rehearsal".
4. The invitation email says **"filing portal"**. The term is "filing desk".
5. **Grammar:** "1 approved filing is ready to pay and need your card's security code" should end "and needs".
6. The dashboard says **"The engine posts…"** and "Ask the platform team to configure tenant…", which is jargon on a customer page.
7. The home sample proof's button reads **"Approve for filing"**, while the real proof reads "Approve, and authorize submission and payment". If "See what your client sees" is meant literally, the sample should carry the real label.
8. The main color help text, **"Button text is white, so choose a dark color."**, becomes untrue once the automatic fixes in §11.3 land.
9. The proof's H1 is assembled from raw parts (state code, type with an underscore replaced, name). Using the filing type's title ("New Jersey LLC formation") would read better.
10. **New words this design needs** (marked ⟨copy to come⟩): the phone overflow menu label; the footer "reduce motion" and theme switches; a "Go back" action on the code-mismatch page; the Spanish switch; the explanation when CoFile adjusts a firm's color or font; body text for the "filing submitted" and "EIN issued" emails (the status labels exist, the emails don't); the status page and the rehearsal report.
11. The rehearsal timeline ends on **"held, on purpose"**, borrowed from the home page's log. Confirm it can be used as a product label.
