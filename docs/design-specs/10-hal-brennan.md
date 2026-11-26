# CoFile: The Countersigned Instrument

**Design spec for cofile.app, every surface.**
Harold "Hal" Brennan, document and security-print designer, Philadelphia. Nov 26, 2026.

---

## 1. Who I am and why it matters here

I spent thirty-five years making paper people trust: stock and bond certificates, bank checks, state certificates and passport pages. Guilloche borders cut on a geometric lathe, portraits and vignettes engraved in steel, microprinted rules, serial numbers in two places so they can be checked against each other, blind embossing and watermarks. For the last decade I have advised on digital trust marks and credentials. I have learned one thing from all of it: **trust is a craft with a visual language, and it is older than the internet.** People sign instruments because the instrument looks like it means it.

CoFile asks a business owner to approve a legal filing and authorize a state fee that won't come back. That is an instrument, and it should look and behave like one. The proof should feel like something you sign, with some weight and some care in it, and it should never feel like a checkout page.

I hold one line without exception. **CoFile is not a government agency.** Nothing in this design imitates a state seal, the IRS, a federal eagle, a notary's crimped foil, a Capitol dome, a flag, a ring of stars or any official mark. No "official" gold, no federal navy and red, no typeface borrowed from a government design system. I worked for states for years and I know their marks. CoFile gets its own trust language, drawn for it and owned by it. The engraving tradition belongs to everyone who ever printed a check or a share certificate. Government heraldry belongs to governments.

Three habits from the trade shape every page below:

1. **Security features have to be checkable by an ordinary person.** On a good banknote you don't need a lab. Tilt it, feel it, hold it to the light, compare the two serial numbers. Every trust cue in CoFile has to be something a 64-year-old CPA or a first-time founder on a phone can check with their own eyes.
2. **Ornament goes where the value is.** The border goes on the certificate, not on the envelope it came in. On CoFile, ornament lives on the proof and the filing record. Desks, dashboards and docs get plain tools.
3. **The fine print is printed at full size.** Engraving lets you print small honestly, but you print the conditions where people can read them. CoFile's catch, its consents and its fees are never set smaller than the body text.

---

## 2. The concept: the countersigned instrument

In my trade an instrument that matters carries **two signatures**: the drawer's, and a countersignature that makes it good. A share certificate is signed by two officers. A traveler's check is signed once at purchase and countersigned at the moment of use. Neither signature alone is enough.

CoFile's locked headline already says this: *"Your client approves the proof. Then CoFile files it."* The client signs, CoFile countersigns, and nothing moves until both have happened, in that order. So the whole design hangs on one idea:

> **Every filing is an instrument. It is drawn up, approved by the client, and only then countersigned by CoFile at the state.**

What that gives us:

- **The proof is the instrument.** It gets the full treatment: a guilloche frame, a serial number in two places, a fee register printed over an anti-alteration underprint like the amount line on a check, and a **filing rosette**, a guilloche pattern generated from the exact details on the page (section 9.4 and the signature idea below).
- **Approval is a strike.** When the client approves, the rosette is struck with a blind emboss: relief with no ink. The check mark appears for the first time, because it is the client's to give.
- **Filing is the countersign.** When CoFile submits at the state, an outer ring closes around the rosette in black ink. Approved and countersigned are visibly different states.
- **A rehearsal is a press proof.** Before an edition, the printer pulls proofs on the real press with the real plates and does not issue them. That is exactly what a CoFile rehearsal is: the whole run on the real website, stopped before the last button. Rehearsals carry the locked word "Rehearsal" repeated in their microprint border, in ochre ink. A rehearsal reads as craft, not as a lesser product.
- **A stop is a cancellation.** Paper instruments are cancelled by perforation: a line of punched holes. Expired links, used links and stopped filings show their rosette cancelled that way, without inventing a word for it.

**Why it fits CoFile.** The product promises "stop and ask rather than guess." Security printing is the same discipline: every sheet is counted, every number is checked twice, and a spoiled sheet is cancelled, never quietly reissued. The locked line "Checked twice. Filed once." is a pressroom rule. The concept also keeps CoFile out of the government's look, because a business instrument (a check, a bond, a certificate of shares) has its own visual tradition that is private, commercial and proud of it.

### The signature idea: the filing rosette

Every proof carries a **rosette**: a guilloche figure computed deterministically from a hash of exactly what the client is approving (the filing reference, every detail shown, every fee, the fee cap and the consent version). The same details always draw the same rosette. Change one character, a name, a ZIP code or a cent, and the rosette comes out visibly different.

The client sees it on the email, on the proof and on the record. The firm sees it on the filing desk. When the run reaches the state's review page and payment screen, the engine recomputes the hash from what it is about to submit. Internally, a mismatch stops the filing before paying. Visibly, the record shows the rosette that was approved beside the one that was filed, and they match.

This turns the locked sentence *"Approving it locks in exactly what's on it. If anything has to change later, it comes back to them to approve again"* into something you can see. A changed filing gets a new rosette and a new proof, and the old one is shown cancelled. It is the oldest anti-tamper idea in my trade, a pattern too fine to alter by hand, made honest for screens: the pattern is the details.

---

## 3. Brand identity

### 3.1 The mark: the Open C

The folder tab goes (see Appendix A). In its place is a mark an engraver can cut and a phone can render at 16 pixels.

**Construction.** Draw on a 48 × 48 unit square.

- **The band.** A capital C made of **five concentric arcs**, centered at (24, 24). The outer arc has radius 22 and the inner arc radius 9.2. Each arc has a stroke of 1.6 units with 1.6-unit gaps, so the band reads as engraved line work, the way a lathe cuts a border. The arcs run from 35° to 325° measured from the positive x-axis, leaving a 70° mouth facing right. Terminals are cut radially, square and not rounded, with the cut of each arc offset 0.8° from its neighbor so the ends make a faint engraved bevel, as a graver leaves.
- **The disc.** A solid circle of radius 5.2 centered at (37.5, 24), sitting in the mouth of the C, about two thirds inside it. The disc is the "o" of Co. It is held but not closed in. Read it as the thing being filed, kept safe by the band. Read it as a letter and it is "Co".
- **No check mark.** The mark never contains a tick. Approval belongs to the client.

**Small sizes.** Below 24 px the five arcs merge into a single solid band (outer radius 22, inner 9.2) and the disc grows to radius 5.6 to hold its weight. At 16 px (the favicon) the disc keeps a 1.6-unit gap from the band so it doesn't fill in. The illustrator delivers three masters: Line (≥ 24 px), Solid (12 to 23 px) and Favicon (16 px, hinted to the pixel grid).

**Color.** On CoFile's own surfaces the band and disc print in Indelible (`#3A2F6E`, dark mode `#B7AEF2`). One-color black and knockout white versions are allowed. Never green: green means approved. Never gold foil, never on a starburst, never inside a circle of text.

**Master.** Commission the Line master hand-engraved on a copper plate at 120 mm, pulled as an intaglio proof on cotton paper, scanned at 4800 dpi, then vectorized and corrected to the geometry above. The printed proof is framed in the office. The vector is the master file. The slight irregularity of the hand cut survives only in the 4K hero renders and print. All UI uses the corrected geometry.

### 3.2 The wordmark

**CoFile** set in Register Roman Display, Semibold (section 5), drawn as a custom lettering file and never typed live.

- Capital C and F, lowercase o, i, l, e. The o is drawn as a true circle, a tie to the disc. The F's middle arm is shortened by 8% so "Fi" doesn't crowd. The i's tittle is a circle and not a lozenge.
- Tracking +12 units (1.2%) at display sizes and +20 at sizes under 20 px.
- Never set in all caps and never written as "Cofile", "COFILE" or "Co-File". In running text it is always plain **CoFile** in the surrounding face.

**Lockup.** Mark at left, wordmark at right. The mark's height is 1.55 × the wordmark's cap height, and the gap between them is 0.6 × the mark's width. Clear space on every side is two disc diameters. Minimum size is a 20 px lockup height on screen and 6 mm in print.

### 3.3 The "with CoFile" co-brand mark

On a firm's pages CoFile appears only as small print. That is the locked promise: *"Your name on the door. Ours in small print."* Small print is my specialty, so it gets precise rules.

```
  [solid Open C, 10px]  with CoFile
  └ 6px gap ┘           Register Sans Medium 12/16, tracking +1%
```

- **Color.** The page's tertiary ink (`--ink-3`), never the firm's brand color and never CoFile's Indelible. It always meets 4.5:1 against its background. Small print is allowed to be small but never faint.
- **Size.** 12 px text with a 10 px mark on screen, 7 pt in PDF and print. It never grows past 14 px, and its height is never more than a quarter of the firm logo's rendered height.
- **Placement.** On intake forms and service pages it sits at the right end of the firm's top bar. On the proof it sits at the bottom edge of the sheet, centered inside the guilloche frame where a printer's imprint line goes ("printed by …"), and never in the brand bar. In emails it goes in the footer, after the firm's address. In the embed widget the line is the locked "Filed with CoFile" (see Copy notes).
- **Never** linked on client pages, so a client is not sent off to CoFile's site in the middle of approving. Never animated, never paired with a badge or seal.
- **Enterprise white-label pages carry no CoFile mark at all.** The subscriber's name and support contact are the only identity, as the engine already enforces.

### 3.4 Usage don'ts, for the brand file

- Don't place the mark inside a circle, shield, wreath, starburst, ribbon or scalloped foil edge.
- Don't pair CoFile with eagles, stars, domes, columns, flags, state outlines or the words "official", "certified", "government" or "seal".
- Don't render the mark in gold or with metallic gradients. Engraving is ink, not foil.
- Don't use the mark as a status icon or a bullet.
- Don't put the rosette (section 9.4) anywhere near the mark. The rosette belongs to the filing, not to CoFile.

---

## 4. Color: inks on bond

In a pressroom every color is an ink with a job. That is the model here. There are paper colors, text inks, one brand ink, and three **status inks** that carry meaning and do nothing else. Ornament never borrows a status ink.

**Why violet.** CoFile's brand ink is a deep blue-violet I call **Indelible**, after the copying-pencil and indelible inks once used for anything that must not be erased. A state filing can't be taken back, and this is the ink of things you can't take back. It is also a long way from federal navy, red and gold, and from the greenback.

### 4.1 Light tokens ("bond")

| Token | Name | Hex | Use | Contrast |
|---|---|---|---|---|
| `--paper` | Bond | `#F5F3EC` | Page background | — |
| `--sheet` | Sheet | `#FFFDF8` | Cards, the proof sheet, inputs | — |
| `--sheet-2` | Tint | `#EFECE2` | Table stripes, code inline, quiet fills | — |
| `--line` | Hairline | `#D9D4C6` | Decorative rules and dividers | 1.4:1 (decorative only) |
| `--line-strong` | Rule | `#8A8678` | Input and chip borders | 3.6:1 on sheet |
| `--ink` | Intaglio | `#17171F` | Text, headings | 16.9:1 on bond |
| `--ink-2` | Graphite | `#4E4C57` | Secondary text, ledes | 7.6:1 on bond |
| `--ink-3` | Pencil | `#6A6873` | Captions, small print, "with CoFile" | 4.9:1 on bond, 5.1:1 on sheet |
| `--brand` | Indelible | `#3A2F6E` | CoFile mark, kickers, links on CoFile pages, guilloche on CoFile pages | 10.4:1 on bond |
| `--brand-tint` | Indelible wash | `#E9E6F3` | Underprint pattern ink, selected rows | decorative |
| `--go` | Countersign green | `#11603F` | Approved, live, forward buttons | 6.8:1 on bond; white on it 7.6:1 |
| `--go-tint` | | `#E2EFE7` | Go chip fill | go text on it 6.2:1 |
| `--hold` | Ochre | `#8A5300` | Rehearsal and its planned hold | 5.7:1 on bond |
| `--hold-tint` | | `#F7ECD3` | Rehearsal band, chip fill | hold text on it 5.4:1 |
| `--stop` | Vermilion | `#A8261B` | A stop | 6.4:1 on bond; white on it 7.1:1 |
| `--stop-tint` | | `#F7E1DC` | Stop banner fill | stop text on it 5.7:1 |
| `--focus` | Register | `#3A2F6E` | Focus ring (firm pages: see 11.3) | 10.4:1 |

### 4.2 Dark tokens ("the plate")

Dark mode is the engraved steel plate before it is inked: blue-black metal with light lines.

| Token | Hex | Contrast |
|---|---|---|
| `--paper` | `#111219` | — |
| `--sheet` | `#191A23` | — |
| `--sheet-2` | `#22232E` | — |
| `--line` | `#2E2F3C` | decorative |
| `--line-strong` | `#6B6A7A` | 3.3:1 on sheet |
| `--ink` | `#ECE8DD` | 15.6:1 on paper |
| `--ink-2` | `#BDB9C7` | 10.1:1 |
| `--ink-3` | `#8F8B9C` | 5.6:1 on paper, 5.2:1 on sheet |
| `--brand` | `#B7AEF2` | 9.2:1 |
| `--brand-tint` | `#272440` | decorative |
| `--go` | `#5FCB97` | 9.3:1; button text `#0B1A12` on it 9.6:1 |
| `--go-tint` | `#14291F` | go text on it 7.9:1 |
| `--hold` | `#E9B55F` | 10.0:1 |
| `--hold-tint` | `#2E2312` | hold text on it 8.4:1 |
| `--stop` | `#F28B7F` | 7.8:1; button text `#1E0A08` on it 8.1:1 |
| `--stop-tint` | `#331816` | stop text on it 6.6:1 |

### 4.3 Status inks: three colors and two neutrals

Today's site lets amber mean both "rehearsal" and "waiting for someone", and green mean both "approved" and "the firm's button". I separate them. **Only three things get a color: go, hold and stop.** Anything waiting on a person, or simply in progress, is neutral and identified by shape. Every chip carries a glyph, so meaning never rests on color alone.

| Family | Ink | Glyph | Locked labels it carries |
|---|---|---|---|
| **Go** | Countersign green, solid fill, white text | ● filled disc | Approved · Submitted to the state · Accepted by the state · EIN issued · Completed · Live |
| **Hold** (planned) | Ochre, tint fill, ochre text | ◐ half disc | Rehearsal · Rehearsed to the payment screen |
| **Stop** | Vermilion, tint fill, vermilion text, 1.5 px vermilion border | ■ filled square | Needs correcting · Paused: state site changed · Rejected by the state · Failed · Stopped |
| **Waiting on a person** | Intaglio text, sheet fill, 1.5 px ink border | ○ ring | Waiting for approval · Needs information · Changes requested · Name unavailable · On hold · Being checked |
| **Working** | Graphite text, no border | ··· three dots (static) | Received · Getting the state's review page · Queued · Filing now · Final check |

Coverage labels use the same families with one extra weight step (section 9.10): "Live" is solid go. "Rehearsed to the payment screen" is hold. "Screens recorded, rehearsal next" is a neutral solid outline, "Offered, not yet rehearsed" a neutral dotted outline, and "Planned" plain text with a dash glyph. Live is the only solid green label on the whole public site. That is how you make it impossible to misread.

**The beta notice is not ochre.** Beta is not a hold. The notice prints in Graphite on Tint with "Beta" in Indelible on CoFile's pages, and in Graphite on Tint with "Beta" in Intaglio on firm pages.

### 4.4 Ornament inks

Guilloche, microprint and underprint are drawn in tints that are decorative by definition. They never carry information, and text never sits on them below 7:1.

| Ornament | Light | Dark |
|---|---|---|
| Guilloche, CoFile pages | Indelible at 38% on sheet, about `#A9A3C2` | `#4A4570` |
| Guilloche, firm pages | Firm ink at 38% on sheet (computed, see 11.3) | Firm ink at 30% on the dark sheet |
| Guilloche, rehearsal | Ochre at 45%, about `#C7A56B` | `#7A5E2E` |
| Underprint (anti-alteration) | `#E9E6F3` lines 0.5 px at 3 px pitch | `#262438` |
| Microprint | `--ink-3` | `--ink-3` |

---

## 5. Typography

### 5.1 Families (commissioned from an independent foundry, about 14 months)

**Register Roman** (Display and Text optical sizes). An engraver's roman in the tradition of nineteenth-century commercial bonds and share certificates: vertical stress, bracketed serifs, generous width, high contrast in Display, sturdy hairlines in Text (never thinner than 1.4 px at 18 px). Apertures are opened for screens, and the figures are lining. Display comes in 500 and 600; Text in 400, 400 italic and 600. Used for headlines, ledes and the wordmark.
*Interim:* Newsreader (open source, has optical sizes), Display at opsz 72 for headlines and Text at opsz 16 for ledes.

**Register Sans.** The working face for every interface word: a humanist sans built on hyperlegibility rules. I, l and 1 are distinct. 0 and O are distinct. a, e and c are open. The x-height is 0.53 em. Spacing is wider at small sizes, and the ¿ ¡ ñ á é í ó ú ü forms are drawn as part of the design and not added later. Weights 400, 500, 600 and 700, with tabular and proportional lining figures.
*Interim:* Atkinson Hyperlegible Next, drawn for low-vision readers, which suits our older readers well.

**Register Mono.** Values, fees, codes, references and API docs. Slashed zero, a serifed 1 and l, tabular by nature. Weights 400, 500 and 600.
*Interim:* Atkinson Hyperlegible Mono.

**Register Numbering.** Digits, capitals and the hyphen only, drawn from the heads of mechanical numbering machines like the ones that stamped every certificate I ever printed: slightly condensed, with notched ink traps. Used only for filing references and the rosette's check group.
*Interim:* Atkinson Hyperlegible Mono 500, tracked +8%.

**Faces we will not use.** Public Sans, which is the U.S. federal web design system's face. Caslon, the Declaration of Independence's face. Trajan and blackletter, the "official certificate" clichés. CoFile does not borrow the government's typographic voice either.

### 5.2 Scale: public site, client pages, the proof (base 18)

All line heights sit on a 4 px baseline.

| Token | Desktop | Mobile (< 600) | Face, weight | Notes |
|---|---|---|---|---|
| `display` | 64/72 | 40/48 | Roman Display 600 | Home H1 only; tracking −1% |
| `h1` | 48/56 | 34/40 | Roman Display 600 | Page titles |
| `h2` | 36/44 | 28/36 | Roman Display 600 | Section heads |
| `h3` | 24/32 | 21/28 | Sans 600 | Block heads |
| `lede` | 21/32 | 19/28 | Roman Text 400 | Under H1/H2, 60ch max |
| `body-l` | 18/28 | 18/28 | Sans 400 | Default on public and client pages |
| `body` | 16/24 | 16/24 | Sans 400 | Dense public blocks |
| `small` | 15/24 | 15/24 | Sans 400 | Notes, beta notice |
| `caption` | 14/20 | 14/20 | Sans 500 | **Floor on client pages** |
| `kicker` | 15/20 | 15/20 | Sans 600, Indelible | Sentence case after a 24 px engraved rule. No all caps for older readers. |
| `value` | 17/28 | 17/28 | Mono 400 | Proof values |
| `fee` | 18/28 | 18/28 | Mono 500, tabular | Fee rows |
| `fee-total` | 24/32 | 22/32 | Mono 600, tabular | Totals |
| `serial` | 15/20 | 15/20 | Numbering, tracked +8% | Filing reference |
| `micro` | 3.6 px | 3.6 px | Mono 500 caps | Ornament, `aria-hidden` |

### 5.3 Scale: filing desk and enterprise dashboard (base 16)

| Token | Size | Face |
|---|---|---|
| `app-h1` | 32/40 | Roman Display 600 |
| `app-h2` | 24/32 | Roman Display 600 |
| `app-h3` | 19/28 | Sans 600 |
| `app-body` | 16/24 | Sans 400 |
| `app-table` | 15/24 | Sans 400; numbers tabular |
| `app-small` | 14/20 | Sans 400 |
| `app-mono` | 14/20 | Mono 400 |

### 5.4 Docs (base 17)

Prose is Sans 17/28, headings Roman Display (h1 40/48, h2 28/36, h3 Sans 600 20/28), and code Mono 14.5/24 with no ligatures. Endpoint paths are Mono 500.

### 5.5 Numerals and money

- Lining figures everywhere. Old-style figures look fine and read badly for older eyes.
- Tabular figures in every table, fee row, timestamp and count. Proportional figures in running prose.
- Money always has two decimals and a dollar sign, aligned on the decimal point in a right-aligned column: `$100.00`, `$3.50`, `$103.50`.
- Masked SSNs (`***-**-1234`), EINs, references and codes are in Mono with a slashed zero.
- "50/50" stays as typed and is never set as a fraction glyph.
- Dates in client copy use the engine's plain format ("December 3, 2026, 5:00 PM Eastern"), with the time zone always spelled out.

---

## 6. Layout

### 6.1 Grid and breakpoints

| Breakpoint | Width | Columns | Margin | Gutter |
|---|---|---|---|---|
| `xs` | 0 to 599 | 4 | 16 (plus safe-area insets) | 16 |
| `sm` | 600 to 899 | 8 | 24 | 20 |
| `md` | 900 to 1199 | 12 | 32 | 24 |
| `lg` | 1200 and up | 12 | auto, content 1184 max | 24 |

Public pages use a 12-column grid with a **7/5 split** for copy and its exhibit (the specimen, a log, a table). Client pages use a single centered column of 720 px max. The proof sheet itself is 760 px wide including its 20 px guilloche frame, so its content runs 640 px at most. The desk and dashboard use a 240 px left rail plus a fluid content area of 1184 max. Docs use a 240 px rail, 720 px of prose and a 440 px code column at `lg`. Below 1200 the code drops in after each section.

### 6.2 Spacing scale

`2 · 4 · 8 · 12 · 16 · 24 · 32 · 48 · 64 · 96 · 128` (tokens `--s-1` to `--s-11`). Section rhythm on the home page is 128 desktop and 64 mobile. Card padding is 24 desktop and 16 mobile. Field stacks get 24 between fields and 8 between label and input.

### 6.3 Radii

Instruments have square corners.

| Token | Value | Use |
|---|---|---|
| `--r-0` | 0 | The proof sheet, the record sheet, the coverage register |
| `--r-1` | 2 px | Inputs, cards, tables |
| `--r-2` | 4 px | Buttons |
| `--r-chip` | 3 px | Status chips (no pills; pills read as app candy) |
| `--r-disc` | 50% | The disc and the rosette only |

### 6.4 Elevation

Paper lies flat. Only the instrument is lifted off the desk.

| Level | Light | Dark |
|---|---|---|
| `e0` | none | none |
| `e1` | 1 px `--line` border | 1 px `--line` border |
| `e2` (the sheet) | `0 1px 0 rgba(23,23,31,.05), 0 2px 6px -2px rgba(23,23,31,.10), 0 24px 48px -28px rgba(23,23,31,.35)` | 1 px top edge `#3A3B4A` and the sheet color only |
| `e3` (overlays) | `0 28px 64px -20px rgba(23,23,31,.45)` | `0 28px 64px -20px rgba(0,0,0,.7)` |

---

## 7. Imagery

**No stock photography.** No handshakes, no smiling founders with laptops, no city skylines, no Capitol buildings. The product is the picture.

What to commission, by kind:

| Commission | From | Deliverable |
|---|---|---|
| Engraved master plates | A hand engraver in banknote and bond work | The Open C on copper; one master guilloche border; the 12-icon set (vault, lock, perforated link, pen nib, separate drawers, envelope, document, card, key, webhook hook, clock, magnifier), each 40 mm on copper. Pulled on cotton paper, scanned at 4800 dpi and vectorized. |
| Geometric-lathe studies | A rose-engine turning studio | 40 physical rosette studies cut in brass, photographed. These set the parameter ranges for the rosette generator so it draws like a lathe and not like a spirograph toy. |
| The printed specimen | A small intaglio and letterpress shop | The home page's sample proof for "Two Sisters Bakery LLC" (Harbor & Pine CPA), printed by intaglio on 100% cotton bond, with the rehearsal microprint. Used for photography only: Open Graph images, the sign-up "sent" page, 404, press. The live page always renders HTML. |
| Macro photography | A still-life photographer with a macro rig | Raking-light macros of that printed specimen: the rosette's relief, the microprint under a loupe, the fee underprint. Shot at 5:4 and 1:1, both color and duotone. |
| The rosette generator | A creative technologist with type and geometry background | `@cofile/rosette` (section 13): deterministic SVG, WebGL for the hero, PNG for email. |
| Product plates | In-house, from real screens | Real product screens at 2×, framed as "plates" with a 1 px hairline and a 12 px mount. Never device mockups with a hand in them. |

**Data visuals** (dashboard "By status", "By state", "By month") are drawn like engraved charts. Hairline axes, no gridlines except a 0.5 px baseline, and bars filled with **line hatching** coded by family: go is solid, hold is 45° hatch, stop is crosshatch, waiting is open outline, working is 0.5 px dot screen. Hatching survives color blindness, grayscale printing and the fax machine some title companies still have.

**The state's review page** is a photograph of someone else's document. It is always shown **in a mount**: four photo corners, a 1 px border and the locked caption, so nobody could mistake a state's page for one CoFile made, or CoFile's page for the state's.

---

## 8. Motion and interaction

### 8.1 Principles

1. **Nothing moves unless its state changed.** No parallax, no scroll-triggered fly-ins, no idle loops.
2. **Ink is laid down; it does not slide.** Elements appear by revealing a line (a stroke drawing in, or a wipe along the reading direction) and not by sliding or scaling.
3. **The irreversible act is slow on purpose, and only after it is done.** The approve button responds at once. The ceremony (the strike) happens after the server confirms, never before.
4. **No sound.** A filing is a quiet act.

### 8.2 Durations and easings

| Token | Duration | Easing | Use |
|---|---|---|---|
| `--t-instant` | 80 ms | `linear` | Button press-down |
| `--t-quick` | 140 ms | `cubic-bezier(.2,0,0,1)` "lay" | Hover, focus ring, chip change |
| `--t-move` | 240 ms | `cubic-bezier(.2,0,0,1)` | Disclosure open, toast in, drawer |
| `--t-leave` | 180 ms | `cubic-bezier(.4,0,1,1)` "lift" | Anything leaving |
| `--t-draw` | 900 ms | `cubic-bezier(.65,0,.35,1)` | Rosette drawing in, once per filing per device |
| `--t-strike` | 560 ms | 90 ms down `cubic-bezier(.7,0,1,.5)`, 470 ms settle `cubic-bezier(.1,.8,.2,1)` | The approval strike |
| `--t-ring` | 700 ms | `cubic-bezier(.65,0,.35,1)` | The countersign ring closing |

### 8.3 Signature moments

- **The draw.** The first time a client opens a proof, the rosette's three bands draw in from the center out, 900 ms in all, staggered 120 ms. Text is readable from the first frame. The rosette is ornament and never blocks.
- **The strike.** After "Approve, and authorize submission and payment" is confirmed by the server, the decision page ("Approval recorded") shows the rosette receiving a blind emboss. A light-from-upper-left relief (an SVG lighting filter, or CSS layered shadows on the path set) presses in over 90 ms and settles over 470 ms. Then the center disc fills in Countersign green and a check mark is cut out of it, white, drawn in 200 ms. That is the first check mark the client sees anywhere on CoFile.
- **The countersign.** On the filing desk record, when the filing is submitted, a 1.2-unit Intaglio ring closes around the rosette clockwise from 12 o'clock over 700 ms. Seen live, or on the next page load as a static state.
- **Cancellation.** When a proof link is expired, used or superseded, nine 2.4-unit holes punch across the rosette's horizontal diameter, 30 ms apart, and the line work fades from ink to Pencil over 240 ms.
- **The loupe** (home page, "Ours in small print."). On hover, or a tap on touch, over the specimen's imprint line, a 120 px circular loupe magnifies "with CoFile" and the microprint by 4×. It follows the pointer at 60 fps with no easing. Keyboard: focus the imprint and the loupe appears fixed over it.

### 8.4 Reduced motion

With `prefers-reduced-motion: reduce`, the rosette appears complete, the strike becomes an instant state change (relief and green disc shown, no animation), the ring and the punches appear drawn, the loupe becomes a static 4× inset beside the specimen, and every transition is 0 ms except focus (kept at 80 ms opacity so focus still shows where it moved).

---

## 9. Components

### 9.1 Buttons

| Variant | Fill / text | Height | Use |
|---|---|---|---|
| **Forward** | `--go` / white (firm pages: firm ink, contrast-fixed, see 11) | 48 (public), 40 (desk), 56 (the proof) | The one action that moves a filing forward: "Run a free rehearsal", "Send the proof to my client", "Pay and file", "Approve, and authorize submission and payment" |
| **Secondary** | sheet / ink, 1.5 px `--line-strong` | same | "See what your client sees", "Request changes", "Log in" |
| **Quiet** | none / brand ink, underline on hover | 40 | Inline actions: "Copy link", "Turn off" |
| **Destructive** | sheet / `--stop`, 1.5 px stop border | 40 | "Revoke", "Remove", "Disconnect", "Turn down" |

States: **hover** darkens the fill 6% in OKLCH lightness (140 ms). **Focus** is a 3 px focus-ink outline at a 2 px offset with a sheet-colored gap. **Pressed** moves 1 px down with the shadow removed (80 ms), like a key on a numbering machine. **Disabled** keeps the label at 4.5:1 and switches the fill to a 45° hatch of `--line`, never just faded. **Pending** keeps the locked pending label where one exists ("Sending…", "Saving…", "Creating…", "Confirming…", "Checking…") and adds a static three-dot glyph, with no spinner.

Minimum target is 44 × 44 px everywhere and 56 px tall on the proof. Labels never truncate; they wrap to two lines.

### 9.2 Fields

Label above (Sans 600 16/24), input (48 px tall, `--r-1`, 1.5 px `--line-strong`, sheet fill, 18 px text), help below (Sans 15/24 Graphite). Required fields keep the locked "Fields marked * are required." note at the top of the form, with the * in Intaglio, not red: red is for stops.

- **Error:** a 2 px vermilion border, a ■ glyph, and the message under the field in vermilion 15/24. The form's summary ("Please fix these and submit again.") sits in a stop banner at the top with links to each field.
- **Paired fields** (`field-row n2/n3`) collapse to one column under 600 px.
- **"Same as"** renders as a row of small secondary chips above the field group ("Same as" followed by the name of the earlier address or person). Choosing one fills and locks the group with a 1 px dashed border and a quiet "Remove" to unlock.
- **Folded optional questions** use `details.more`: "More options" with a chevron, opening at `--t-move`.
- **Authorizations** sit in a ruled box on Tint, each with a 24 px checkbox. The "filing company" definition is set first in italics.
- **Basis Theory card and code fields** are styled through the vault's element API to match exactly: same height, border and font (Register Mono for the digits).

### 9.3 The proof sheet (the instrument)

```
┌─ guilloche frame, 20px ────────────────────────────────────────┐
│ ░ microprint rule: filing reference · repeated ░               │
│  [firm logo]  Harbor & Pine CPA                   № KF-…-0412  │ ← serial, top right
│ ─────────────────────────────────────────────────────────────── │
│  (rehearsal band, if any)                                      │
│  H1 filing title                                ┌─rosette─┐    │
│  Filing reference … Please decide by …          │  96 px  │    │
│                                                 └─────────┘    │
│  … sections: state's review page (mounted),                    │
│     Filing details, State fees (on underprint)                 │
│ ═══ signature block ═══════════════════════════════════════════ │
│  consent text · one-time code · [ Approve, and authorize … ]   │
│  [ Request changes ]                                           │
│  № KF-…-0412                                      with CoFile  │ ← serial again, bottom left
│ ░ microprint rule ░                                            │
└────────────────────────────────────────────────────────────────┘
```

**Frame construction.** A 20 px band (12 px under 600 px) made of two guilloche strands, each a sine wave with period 14 px and amplitude 4 px, drawn as 7 parallel lines at a 0.5 px stroke and phase-shifted by 1/7 period. The two strands run in counter-phase so they braid. The corners are not mitred. At each corner the strands turn through a quarter-rosette of 9 lobes, 28 px. Inside the frame, at a 4 px inset, a 0.5 px rule of **microprint**: the filing reference followed by " · ", repeated, at 3.6 px Mono caps. On a rehearsal the microprint reads "REHEARSAL · " alternating with the reference, in ochre. The microprint is real text, `aria-hidden`, and legible under browser zoom at 400%. That is the point of microprint: honest, checkable, too fine to fake by retyping.

**Serial in two places.** The filing reference prints in Register Numbering at top right and again at bottom left, just like a banknote. Both copies come from the same value in the same render. A careful reader can compare them, and a screenshot pasted from another filing won't match.

**Fee underprint.** Fee rows, the total and (in the home specimen) the highlighted `<mark>` values sit on an anti-alteration underprint: fine wavy lines at 3 px pitch in `--brand-tint`, the same protective pattern printed behind the amount on a check. The text on top stays at 12:1 or better.

### 9.4 The filing rosette (construction)

The rosette is rendered by `@cofile/rosette` from `H = SHA-256(canonical JSON of {filingId, shownPayload (masked), fees[], feeCapUsd, consentVersion})`.

- **Canvas:** a 100 × 100 unit box. Three concentric **bands**, each built from epitrochoids, `x(t) = (R + r)·cos t − d·cos((R + r)/r · t)` (y likewise with sin), drawn as N phase-shifted copies.
  - Outer band: R = 38, lobes L₁ ∈ {7, 9, 11, 15, 17} (byte 0). **13 is excluded**, because thirteen points is a federal motif. r = R / L₁, d = r × (0.55 to 0.92) (byte 1), N = 24 to 40 (byte 2).
  - Middle band: R = 26, lobes L₂ ∈ {5, 6, 8, 10, 12} (byte 3), with d and N from bytes 4 and 5.
  - Inner band: R = 14, lobes L₃ ∈ {4, 6, 8} (byte 6), with d and N from bytes 7 and 8.
  - Rotation of each band: bytes 9 to 11 mapped to 0 to 360/L.
- **Guards:** d stays below r on every band (smooth curtate loops, never sharp star points). The silhouette is always lobed and never a plain circle with a text ring. There is never text in a ring, a star, or an eagle-friendly symmetry of 13 or 50.
- **Stroke:** 0.22 units at 96 px. The minimum rendered stroke is 0.5 device px; below that the band count drops to 2 (under 48 px) or 1 (under 24 px).
- **Center:** an open disc of radius 8 holding the **check group**, the first four hexadecimal characters of H, uppercase, in Register Numbering at 4.2 units. The client can match "7F3A" in the email against "7F3A" on the page without understanding any of the math. It is data, not words.
- **Ink:** the page's guilloche ink (section 4.4). Ochre on a rehearsal.
- **States:** *drawn* (awaiting approval) · *struck* (approved: blind emboss, green center disc with a knocked-out check mark) · *countersigned* (submitted: an Intaglio outer ring at R = 46, 1.2 units) · *cancelled* (expired, used or superseded: nine punched holes, Pencil ink) · *rehearsal struck* (approved rehearsal: blind emboss with an **ochre** center disc and no check mark, since nothing was authorized to go to the state).
- **Accessibility:** `aria-hidden`. The filing reference carries the identity in text. The rosette is a visual check for those who can use it, never the only one.

### 9.5 Status chips

28 px tall (24 in dense tables), 3 px radius, Sans 600 14/20, glyph 10 px with 6 px to the label, 10 px side padding. Families as in 4.3. Chips never use a firm's color. In tables the chip sits at the left edge of its cell, so a column of statuses reads as a column of shapes.

### 9.6 The timeline: endorsements

A filing's history is shown like the endorsements on the back of a check: a vertical list where each entry has a time (tabular Mono 14), a chip and a one-line note. A 1 px Graphite rule joins the entries, and the current entry sits in a 2 px ink box. The future steps for that filing type are drawn as dotted ghost entries with their labels in Pencil, so the firm can see the road from draft to proof to filed: Received → Getting the state's review page → Waiting for approval → Approved → Filing now → Submitted to the state → Accepted by the state (→ EIN issued) → Completed. Stops break the rule with a vermilion ■ and the engine's `nextStep` text.

### 9.7 Tables (the ledger)

Header in Sans 600 14/20 Graphite, sentence case, with a 1.5 px Intaglio rule under it. Rows are 52 px (44 dense) with hairline separators and no zebra striping, except that the coverage register stripes every fourth row as a ruling aid, like ledger paper. Numbers are right-aligned and tabular. Under 600 px every table becomes stacked cards: the first column as the card title, then label and value pairs.

### 9.8 Navigation

- **Public header:** a 72 px bar on Sheet with the lockup at left, then the locked links ("How it works", "For firms", "What we file", "For platforms") and at right "Log in" (secondary) and "Run a free rehearsal" (forward). Under 900 px the links fold into a "Menu" sheet. The two buttons stay visible down to 360 px, and "Log in" becomes a quiet link under 420 px.
- **Desk and dashboard:** a 240 px left rail on Paper, with the firm's logo (desk) or CoFile lockup (dashboard) at the top, then the locked menu labels, and the user's email and "Log out" at the bottom. The current item gets a 3 px brand-ink bar at its left and Intaglio text. Under 900 px the rail becomes a top bar with a "Menu" drawer.
- **Docs:** a left rail with the locked group heads "Overview", "Guides", "Reference", "Endpoints", "OpenAPI (JSON)".

### 9.9 Banners

| Banner | Look | Copy (locked) |
|---|---|---|
| Beta notice | 40 px strip on Tint, Graphite 15/24, centered; "Beta" set as an Indelible small-caps label | "CoFile is in beta. Any filing can run as a free rehearsal on the state's real website. It stops before the last button, so nothing is filed or paid. Filing types go live one at a time." plus the contact. On firm pages: "This service is in beta. …" with no CoFile name. |
| Rehearsal | Hold-tint band with a 4 px ochre left rule and ◐ glyph | "Rehearsal: nothing will be filed or paid, even if you approve." |
| Stop | Stop-tint, 4 px vermilion rule, ■ glyph | The engine's stop texts, for example the drift notice |
| Waiting | Sheet, 1.5 px ink border, ○ glyph | Desk prompts such as "{n} approved filings are …" with "Pay and file" |

### 9.10 The coverage register

A ledger of 16 rows with columns "Filing", "Where" and "Where it stands" (locked headers). The status cell holds the chip plus a **five-position stage track**: five 8 px squares in a row, filled up to the row's stage (Planned 1, Offered 2, Screens recorded 3, Rehearsed 4, Live 5). Live fills all five in go green. Every other row fills in Graphite, with the rehearsed row's fourth square in ochre. Read down the column and the live rows jump out as the only full green tracks. Rows are grouped by stage in the locked order. On mobile each row becomes a card with the chip under the filing name.

### 9.11 Empty states, toasts

**Empty states** are a single engraved icon (40 px, line master), the locked sentence and the forward button, for example "Your desk is clear. Start a filing (it can be a free rehearsal), or send a client a link with your logo on it." with "New filing" and "Send a client a link". No illustrations of people.

**Toasts** appear at bottom center on mobile and bottom left on desktop: 48 px, Sheet with an e3 shadow, a glyph plus a locked message (for example "Thanks. Filings for this card pay with it for the next hour."). They stay for 6 s, pause on hover or focus, and use `role="status"`. Stops never appear only as a toast. They stay on the page.

---

## 10. Page by page

### 10.1 Ornament density: how it stays out of the way

| Level | What it includes | Where |
|---|---|---|
| **4: Instrument** | Guilloche frame, microprint, two serials, rosette, underprint | The proof; the home page specimen; the filing record sheet |
| **3: Envelope** | One guilloche rule (8 px), rosette thumbnail, serial | Emails about a filing; the "Approval recorded" page; the client's decision pages |
| **2: Letterhead** | A 1 px Indelible rule under the header, engraved icons | Public pages other than the home specimen; sign-up and log-in pages |
| **1: Ledger** | Hairlines, serial figures in tables, 24 px rosette thumbnails in filing rows | Filing desk, enterprise dashboard |
| **0: Plain** | Type and rules only, no rosettes, no guilloche | Docs, API reference, forms while being filled in, Ready to pay, Billing, Setup |

The rule for the build team is that **level 4 appears only where a person decides or keeps a record**. If you're not sure, go down a level.

### 10.2 Home `/`

```
 ── beta notice (40px) ───────────────────────────────────────────────
 [Open C] CoFile   How it works  For firms  What we file  For platforms   Log in  [Run a free rehearsal]
 ─────────────────────────────────────────────────────────────────────
 For CPA, payroll, fractional CFO and title firms          ┌ specimen sheet ─────┐
 Your client approves the proof.                           │ Harbor & Pine CPA   │
 Then CoFile files it.                                     │ Two Sisters Bakery… │
 (sub)                                                     │ 1 2 3 4 callouts    │
 [Run a free rehearsal]  [See what your client sees]       │ [Approve for filing]│
 In beta. A rehearsal fills in every screen…               └─────────────────────┘
                                                            Sample proof · test details · not a real business
```

1. **Hero.** 7/5 split. The kicker is in Indelible after the engraved rule, then the H1 at `display`, the sub at `lede` and the CTAs (forward, then secondary). The beta note is `small` in Graphite, set at full measure and never in grey-on-grey. On the right is the **specimen**: a level-4 proof sheet at 0.86 scale, tilted 0°. Instruments are never shown at jaunty angles. It shows "Harbor & Pine CPA" with "example firm", "Two Sisters Bakery LLC" with the Rehearsal chip, "New Jersey LLC formation. Please approve by Dec 3, 5:00 PM Eastern.", the detail rows with the `<mark>` values on underprint, the fees `$100.00`, `$3.50` and "Total to the state" `$103.50`, "New Jersey's own review page, filled in" in a photo mount, and the forward button "Approve for filing" with "Nothing is submitted or paid until you approve." The numbered callouts 1 to 4 are 24 px square plate numbers in Indelible, set in the sheet's left margin like the key letters on an engraved anatomy plate. The rosette draws in once (900 ms). The caption is the locked "Sample proof · test details · not a real business", set as the sheet's imprint line. On mobile the specimen follows the CTAs at full width, scale 1.0, with callouts inline.
2. **Process.** "You start it. Your client approves it. CoFile files it." is drawn as a **signature block**: three columns over three engraved signature lines, each with the locked step name in `h3` and its paragraph below. The middle line is the only one in Indelible, carrying the locked lede "Three steps, and your client is in charge of the middle one." On mobile the columns stack and the lines remain.
3. **The proof.** "Your client sees what the state will see, before the state does." On the left are the H2 and the printer's-proof lede. On the right is an **anatomy plate**: the specimen in line-art (no color, engraved hatching) with six leader lines to the six locked checks, each check marked with a plate number rather than today's tick. Ticks mean approval, so they don't belong on a feature list. On mobile the six checks become a numbered list under a smaller line-art proof.
4. **Firms.** "Your name on the door. Ours in small print." This is the **loupe moment**. The specimen's imprint line is enlarged with the loupe over "with CoFile" (section 8.3), and the four locked points sit beside it. A swatch row under the specimen (five dots of sample firm inks) re-inks the specimen's brand bar, buttons and guilloche live, showing the theming system with no new words.
5. **Requests.** "Clients don't fill in forms. They text you." Ana Ortiz's bubble is drawn as a plain phone message (Sans, a 16 px rounded bubble, the only rounded shape on the page, because it belongs to the phone and not to us). Three engraved leader lines run from "LLC" and "bakery", "me and my sister, 50/50" and "Jersey City" to the specimen's fields, then the locked arrow line "↳ read into a drafted New Jersey LLC formation for your team to check".
6. **Checks.** "Checked twice. Filed once." The exhibit is a **counterfoil**: the proof's fee register on the left stub, the state's payment screen on the right, a perforation between them, and `$103.50` on both sides aligned on one baseline. The five locked points sit beside it.
7. **After.** "The papers come back to you." A **record sheet** at level 4 in its countersigned state: the stub holds the serial and the countersigned rosette, and the body lists the three locked points as entries.
8. **Rehearsals.** "Rehearse on the real stage." The example log is set as a **press-proof sheet** with an ochre microprint border reading "REHEARSAL". Its header is "Rehearsal · New Jersey LLC formation" with "test details". Rows are Mono 15/24 with results right-aligned, and "matched the proof" and "matches the proof" carry a small ● in go green. The last row, "Pay Now" / "held, on purpose", is set in ochre with a ◐ and a 4 px ochre bracket in the margin, a printer's hold mark. No rotated rubber stamp. The caption "13 screens of New Jersey's own LLC form…" sits below.
9. **Coverage.** "New York, New Jersey, Florida and the IRS." The **coverage register** (9.10) runs full width, with the lede above and the locked note and mailto link below. Before launch the engineering team confirms each row's live switch, and the page renders "Live" only from `liveFilings(kind)`.
10. **The catch.** "Every filing service has a catch. Here's ours." The five points are set as **the conditions on the reverse of a certificate**, but at `body-l` 18/28, two columns at `lg`, each numbered in Register Numbering in a 40 px square. The fine print is printed big.
11. **Security.** Five blocks in a 3 + 2 grid, each with its engraved icon (vault, lock, perforated link, pen nib, separate drawers), the locked `h3` and the paragraph.
12. **Enterprise.** "Building a filing product? Put CoFile underneath it." This band switches to **the plate** (dark tokens) regardless of system theme, as a signal that it is the developer's register. It holds the locked list (with `"dryRun": true` in Mono) and the inquiry form at the right on a Sheet card in plate colors. Form fields are as locked: "Name", "Company", "Work email", "Phone (optional)", "States you file in", "Filings per month", "What you'd like to do (optional)" and "Send".
13. **Close.** "Run one rehearsal. Then decide." with the lede, the forward button and the "Questions first?" mailto. The tagline "Approve the proof. Then it's filed." is set at `h3` in Roman Display italic beside the Open C.

**Footer.** Bond with an Intaglio 1.5 px top rule. "CoFile · the filing desk behind your firm" and "New York · New Jersey · Florida · IRS" on one line. Then the legal line at `small` (15 px, never smaller): "CoFile is not a law firm or a government agency, isn't affiliated with any state or the IRS, and doesn't give legal or tax advice." Then "Terms · Privacy · Security · hello@cofile.app".

### 10.3 Accounts: sign-up, log-in and their kin (level 2)

| Route | Layout | Locked copy that leads |
|---|---|---|
| `/signup` | 7/5 split. Form on the left; on the right a **live desk preview**, the brand bar of the firm's future pages that fills with the typed "Firm name" in the default ink. On mobile the preview collapses to a 64 px strip above the button. | Kicker "For firms", H1 "Set up your firm's filing desk", the lede, then fields "Firm name", the kind of firm (radio cards: "CPA or accounting firm", "Payroll company", "Fractional CFO firm", "Title company", "Something else"), "Your name", "Work email", "Password" and "Password again" (help "At least 12 characters. A short sentence works well."), "Phone (optional)", "Website (optional)", "States you file in", the volume radios ("Under 10" … "Over 200"), the terms checkbox, and "Create account". "Building a filing product?" links to `/#enterprise`. |
| `/signup/sent` | Centered 560 px. The macro photograph of the printed specimen at 5:4 above the text. | "Your filing desk" / "Check your email" and the paragraph, then "send the link again" as a quiet button |
| `/login` | Centered 440 px card on Bond with a level 2 rule | "Log in" / "Welcome back" / "Firms go to their filing desk, platforms to their dashboard." A secondary full-width "Continue with Google" above an engraved "or" rule, then "Email", "Password", "Forgot your password?" and the forward "Log in". Below: "New here? Set up your firm's filing desk. Enterprise developers can also log in with an API key." Message strings (waiting for approval, Google errors) appear as banners above the card. |
| `/forgot-password`, `/reset-password` | Same card | "Reset your password" with "Email me a reset link"; "Choose a new password" with "Set new password"; incomplete-link text as a waiting banner |
| `/verify-email` | Same card | "Confirm your email", "One click and your email is confirmed.", "Confirm my email"; resend form under an engraved rule |
| `/invite-expired`, `/join/<token>` (redirects) | Same card, rosette-free. A cancelled perforation line (9 holes) runs across the top of the card. | "This link has expired or isn't valid" plus the paragraph |
| `/terms`, `/privacy` | Level 2 reading page: 720 px measure, Roman Text 19/32 for clauses, a sticky clause index on the left at `lg`, clause numbers in Numbering | Counsel's text, unchanged |
| 404 | Centered; the macro photo of a cancelled specimen (perforated) | "Page not found", "The link may be old or mistyped.", "Go to the home page" |
| Error | Same, no photo | "Something went wrong", the paragraph, "Try again" (forward) and "Log in again" |
| `/session-ended` | Same card | The locked session message and "Log in" |

### 10.4 The proof (api.cofile.app/approve/…), the page everything serves

It is served by the engine as server-rendered HTML, so it must work fully **without JavaScript**: inline SVG for the rosette and frame, `<details>` for disclosures, and fonts self-hosted on api.cofile.app (no third-party font request on a consent page). Firm brand at the top; level 4.

```
 375px phone                                   
┌───────────────────────────────────┐
│ [firm logo] Harbor & Pine CPA     │ brand bar, firm ink rule 3px
├─guilloche 12px────────────────────┤
│ ◐ Rehearsal: nothing will be filed│ (rehearsal only, full width)
│   or paid, even if you approve.   │
│ NJ LLC formation: TWO SISTERS…    │ h1 34/40
│ Filing reference ▮▮▮▮-0412.       │ serial figures
│ Please decide by December 3, 2026,│ bold deadline
│ 5:00 PM Eastern. After that…      │
│            ( rosette 120px )      │ centered, check group 7F3A
│ Government sites don't save       │ waiting box
│ drafts… Please check everything.  │
│ ── The state's review page ────── │
│ ⌜ picture in a mount, tap to zoom⌟│
│ ── Filing details ─────────────── │
│ Business name                     │ label 15 Graphite
│ TWO SISTERS BAKERY LLC            │ value 17 Mono
│ …                                 │
│ ── State fees ─────────────────── │
│ Nothing is charged on this page…  │
│ Formation filing fee     $100.00  │ on underprint
│ NJ portal fee, by card     $3.50  │
│ Total                    $103.50  │ 22/32 600
│ ══ signature block ══════════════ │
│ By approving, you confirm every…  │ body-l, on Sheet, ink rule
│ (EIN sentence if any)             │
│ One-time code sent to you [____]  │ (if required)
│ ┌───────────────────────────────┐ │
│ │ Approve, and authorize        │ │ 56px+, two lines, forward
│ │ submission and payment        │ │
│ └───────────────────────────────┘ │
│ [ Request changes ]               │ secondary, full width
│ ▸ What should change? (Needed     │ <details>, opens textarea
│   only if you ask for changes)    │
│ Questions: help@harborpine…       │
│ № …-0412             with CoFile  │ imprint line
└───────────────────────────────────┘
```

**Ordering (chunked, not rewritten).** The engine's single note is split into its sentences and placed where each one does its job. The "Government sites don't save drafts…" sentence opens the page as a waiting box, because it tells the reader to check. The consent sentence, the EIN sentence and the fee cap go into the **signature block**, directly above the button, so the client reads the authorization and the total in the same glance as the button. Every word is the engine's, in its own order inside each chunk.

**Details.** Labels sit above values on phones and beside them (40/60) from 600 px. Values are Mono, and masked SSNs show the locked masking note above the table. The state's review page sits in a photo mount with the locked heading and paragraph; tapping opens a full-screen viewer with pinch zoom and a "close" control, and the alt text is the engine's. On IRS filings there is no review image and no mount at all, so nothing claims to be the IRS's page.

**The signature block.** It sits on Sheet, ruled above by a double Intaglio rule (1.5 px + 0.5 px, 2 px apart), the way a certificate separates the text from the signatures. The approve button runs the full width of the column with a minimum height of 56 px, in forward ink (or Intaglio, see 11.2), with its label on two lines on phones. It has no icon. "Request changes" is secondary and full width, 16 px below. The "What should change?" textarea is inside a `<details>` so the approve path carries no empty field. Submitting "Request changes" with an empty comment is allowed, as today.

**After the decision.** `renderDecisionPage` uses the same frame at level 3. "Approval recorded" plus the locked paragraph (the rehearsal or live version), with the rosette struck (8.3); for rehearsals the ochre center. The change-request reply shows the rosette cancelled. The approval errors (already decided, expired, invalid, the code mismatch) each get the branded frame rather than today's bare `<p>`: a cancelled rosette for expired, used and invalid links, and a stop banner for "That code didn't match…", with the form still on the page.

**Mobile rule.** The total and the approve button must both be visible in one 667 px-tall viewport once the client scrolls to the signature block, and the button is never sticky. A floating approve button invites approval without reading.

### 10.5 Client intake `/i/<token>` and service pages `/<firm>/<service>`

Both are firm-branded at level 0 while the form is being filled in; the instrument comes later. The firm's top bar carries the logo or monogram and the firm name, with "with CoFile" at the right (enterprise tenants: nothing). The beta notice is the neutral version.

- If the type isn't live: the rehearsal banner with the locked "This page is in rehearsal for now. You can fill it in and see your proof, but nothing will be filed with the state and nothing will be charged, now or later, even after you approve it. To file for real, contact {firm}."
- H1 is the filing type title (for example "New York LLC formation"), then the summary and the locked "After you send this, we'll email you a link to check and approve exactly what will be filed…" line, and the fee note if any.
- The form is built from section folds (`details.fold`) with the section titles from the form definitions ("Name", "Registered agent", "Members and managers", …). The first fold is open and the rest are closed with a ✓ count once complete. Paired fields, "Same as" chips and "More options" as in 9.2. The authorization box comes last before the button.
- The forward button ("Send the proof to my client" for staff, or the client-facing label the form passes), then "Next, we'll email you a proof to check. Nothing is filed until you approve it." and the Terms line, then "Questions about this form? Email {firm} at …".
- Expired or invalid: the firm frame, a cancelled perforation rule, "This link has expired or isn't valid" / "Ask whoever sent it for a new one." Not offered: "This filing is no longer offered".

### 10.6 Partner filing desk `/p/<slug>` (level 1, the firm's brand)

**Frame.** Left rail on Paper, 240 px. At the top is **the firm's** logo (40 px max height) and name; this is their desk, and Appendix A covers the change. Under it, the locked menu: "Filings", "New filing", "Ready to pay", "Client links", "Signatures", "Setup", "Billing". "Ready to pay" carries a count badge in neutral ink when filings are waiting. At the bottom are the email (linking to password), "Log out", and "with CoFile". The firm's second color runs as a 3 px rule down the rail's right edge. The content area is 1184 max on Bond.

| Page | Layout and locked copy |
|---|---|
| **Overview** ("Filings") | H1 "Filings" with "New filing" (forward) at the right. Waiting banners: "{n} approved filings are …" with "Pay and file"; "{n} filings need …"; the subscription line "Real filings need an active subscription; rehearsals are free." with "Subscribe" (quiet). The ledger has columns "Filing", "Type", "Status" and "Started", each row starting with a 24 px rosette thumbnail, then the business name, type, chip and date. Rehearsal rows carry the Rehearsal chip (today's "Test", see Copy notes). Empty: "Your desk is clear. …" with "New filing" and "Send a client a link". |
| **Setup** | "Set up your account" (then "You're set up") with the lede "Three short steps, plus registered agents if you want them. You can change any of them later." Three **numbered plates** ("Your firm", "Branding", "Payment"), each with its description and button, and the next one shown as a forward button. Done steps get a ● and "Change …". "Registered agents (optional)" sits under an engraved rule. Sub-pages show "Step 1 of 3" etc. as a three-square track. |
| **Setup › Branding** | Two columns. On the left: "Logo" (upload with drag-and-drop, the locked help, "Remove logo", "Or a link to your logo", "Use a link instead"), the color fields ("Use a hex code like #1f4fd1."), and the font presets as specimen cards showing each face set in the firm's name (Standard, Inter, IBM Plex Sans, Roboto, Open Sans, Lato, Montserrat, Source Serif, Merriweather, Lora, or upload). On the right is a **live proof preview** at 0.6 scale using the Two Sisters Bakery sample. Any contrast correction the guard makes is shown beside the swatch as a before/after pair of dots, with no new words (see Copy notes for a suggested line). |
| **Setup › Payment, Registered agents, Your firm** | Level 0 forms on a 720 px column, the locked copy as is, the Basis Theory element styled per 9.2 |
| **New filing** | "New filing" / "Which state is the business in?" as four large state cards (New York, New Jersey, Florida, All states), with no state outlines and no seals, only the names in Roman Display at 28 px. Then the type list: each type is a card with its name, and either a solid "Live" chip or a "Rehearsal" chip with the locked tooltip "Runs on the state's real website and stops before the last button: nothing is filed or paid". The locked "Filing types go live one at a time…" line sits above the list, and "Or send us the details…" (email, WhatsApp, Slack `/file`) in a quiet panel below. "Your pages for clients" with the widget code in a Mono box and "Copy". |
| **New filing › form** | As 10.5, with the staff-only "Fields marked * are required." note and authorizations guidance |
| **Filing detail** | The **record sheet** (level 4 header, level 1 below). On the left is the stub with the rosette in its current state, the serial, and the chip. On the right are the endorsements timeline (9.6), then cards for "Link to the proof" (the link in a Mono box with "Copy link"), "Documents", "EIN:" in Mono 18, "Progress on the state site" (a `<details>` with each step in tabular time), and "Save to Google Docs". If the filing was re-approved, the earlier rosettes sit in a row, cancelled. |
| **Client links** | "Send a client a link": filing select, "Who it's for (shown to you and the client)", "Make link", then "Copy link" and "Email it from your mail app". "Links you sent" ledger: "For", "Filing", "Made", "Status" with chips "Waiting for the client" (waiting), "Turned off" and "Expired" (neutral with perforation glyph), and "Used: open the filing" (go). "Turn off" is destructive. |
| **From email** | "Filing request": two columns. On the left, "Your message", the original text as a bubble (or the 30-day deletion note). On the right, "This looks like a request for: …" with "Open the filled-in form" or "Not this filing? Choose another", and leader lines from the message's words to the fields found, as on the home page. |
| **Signatures** | "Saved signatures" with the locked paragraph, then the ledger "Signer", "Saved", "Last used", "Remove". The signature pad is always on white paper (even in dark mode) with a 0.5 px baseline rule and an "×" at the left like a signature line. "Save signature". |
| **Ready to pay** | Level 0, 560 px. "Ready to pay" and its paragraph, then the waiting filings as a short ledger (business, type, total), then one Basis Theory code field (Mono 24, four boxes visually, one input), and "Pay and file" (forward). Success: the locked toast. Empty: "Nothing is waiting for a card right now." |
| **Billing** | Level 0. Stripe's plan and amounts appear only here, inside the logged-in desk, in a ledger. The locked state messages appear as banners. |
| **Password** | The 440 px card pattern: "Current password", "New password", "New password again", "Change password" |
| **Signed out** (`/p/<slug>/signed-out`) | Firm frame, "You're not signed in to this filing desk", the paragraph, "log in here" |

### 10.7 Enterprise dashboard `/dashboard` (level 1, CoFile's brand, built for density)

Same rail pattern, with the CoFile lockup at the top and the locked menu "Overview", "Filings", "Ready to pay", "Firms", "API keys", "Webhooks", "Setup", "Team", "Billing", "Docs", plus "Sign-ups" for the platform tenant. App type scale (5.3), 44 px dense rows available as a toggle.

- **Overview:** stat plates for "Filings", "Webhook deliveries" and "API keys" ("Manage keys"), then the three hatched charts "By status", "By state", "By month" (section 7). The setup-missing banner is waiting-family.
- **API keys:** ledger "Name", "Key" (prefix in Mono, `cofile_…`), "Last used", "Revoke"/"Revoked". A new key appears once in a dashed "secret" box in Mono 16 with "Copy", plus a reminder from the locked docs link.
- **Webhooks:** endpoints ledger with delivery chips. The signing-secret box is the same as for keys.
- **Filings, Firms, firm detail:** ledgers with filters as chips. Firm detail shows the firm's desk theme as a small preview plate.
- **Setup:** "Payment methods", "State portal logins" (ledger "Portal", "Pays by", "Login", with "Disconnect" for NY DOS, NYS-100, NJ, IRS, FL; "Not needed" in Pencil), "Who's named on your filings", "Your registered agent in each state", each as a level 0 section with the locked paragraphs.
- **Ready to pay, Billing, Team, Password:** as in the desk. Team ledger: "Name", "Email", "Last signed in", "Add someone".
- **Sign-ups** (platform tenant): "Waiting for approval" with "Approve" (forward) and "Turn down" (destructive), then the decided list.

### 10.8 White-label surfaces

- **`/e/<tenant>/<firm>/<service>`**: identical to 10.5, themed entirely by the enterprise subscriber (11). No CoFile mark anywhere; the neutral beta notice.
- **`/embed/...` and `embed.js`**: level 0, no beta banner, no top bar (the host page is the frame). Transparent background by default, with an option for Sheet. A 16 px inner padding, the host's font if it is passed, and our guard on its color. It reports height through `EmbedResizer` so it never scrolls inside itself. The locked "Filed with CoFile" line at 13 px Pencil at the bottom. The forward button and form behave exactly as in 10.5.

### 10.9 Developer docs (level 0)

Built for the second reader: an engineer who wants density, precision and speed.

- **`/docs`**: H1 "CoFile API" in Roman Display 40, the locked intro paragraph (with its "Not every filing type is live yet; see Coverage"), "Quick start" as a numbered list with code at the right, "Guides" as a list of eight titled rows ("Authentication", "Filings and the lifecycle", …). Four machine-readable links in one row of Mono outlined chips: "all docs in one Markdown file", "OpenAPI 3.1" (`/openapi.json`), "llms.txt", plus the Base URL `https://api.cofile.app` in a copyable Mono box.
- **`/docs/reference`**: 25 endpoints in the rail grouped by resource. Each endpoint has a Mono path heading with a **monochrome method label** (outlined, Mono 600 12/16, uppercase): GET, POST, PUT and DELETE are distinguished by text, never by status colors (Appendix A). The request and response schemas are set as nested ledgers; examples are in the plate (dark) code panel whatever the theme, with a Mono 14.5/24 copy button. `dryRun` is glossed once as the docs already do.
- **Lifecycle diagram** in "Filings and the lifecycle": the endorsement timeline as a state diagram in hairline engraving, with the locked status keys in Mono and the plain labels beside them.
- **`/openapi.json`, `/llms.txt`, `/docs.md`**: plain text, no design beyond order. `llms.txt` opens with the product name, the one-paragraph summary from the docs intro and the beta sentence, then links; `/docs.md` uses one H1, consistent H2 per guide and fenced code with language tags. Served with `Content-Disposition: inline` and a download link on `/docs`.

### 10.10 Emails (Resend; level 3 for filing emails, level 2 for account emails)

A 600 px single column on Sheet inside a Bond background. At the top is the firm's logo or name (CoFile's lockup for account emails), with a 3 px firm-ink rule. Below is an **8 px guilloche rule** as a PNG with the firm's ink. The subject is repeated as the H1 at Georgia-fallback 26/32 (web fonts are a bonus in email, not a dependency). The body is 17/28 in the system sans stack. There is one bulletproof forward button, 48 px, using the locked label ("Open your proof", "Enter security code", "Choose a name", "Review the filing"). Then the footer: the firm's contact, then "with CoFile" (partner) or nothing (enterprise).

| Email | Special treatment |
|---|---|
| "Your proof is ready to approve: …" | A 96 px rosette PNG with its check group beside the filing title, matching the proof. The rehearsal line in an ochre-ruled box first. "Don't forward this email…" set as a waiting box above the footer, not as grey fine print. |
| "Card security code needed: …" | "Never reply to this email with the code." in a stop-ruled box |
| "More information needed: …" | The missing items as a bulleted ledger |
| Submitted, "Completed: …", documents back, EIN issued | The rosette countersigned; the state reference in Numbering; the EIN in Mono 20 |
| "Changes requested: …", "Rejected by the state: …" | Rosette cancelled; stop box for rejection |
| Staff alerts ("Site changed — review needed: …", "Portal bot check: …", "Checking whether the state received: …") | Stop or waiting box, no rosette |
| Account: "Confirm your email for CoFile", "Reset your password", "Your CoFile account is ready", "Your partner account is open", invitations | Level 2, CoFile lockup, no rosette |

Plain-text versions are generated for every email, with the check group written out.

---

## 11. The white-label theming system

**The principle: the firm owns the voice, the instrument owns the numbers.** A firm's name, logo, ink and typeface take over its pages. The status inks, the fee and value type, the signature block and the frame's construction belong to the instrument and stay the same for every firm, so a client who has seen one proof can read any proof.

### 11.1 What a firm (or enterprise subscriber) controls

| Input | Where it shows | Guardrails |
|---|---|---|
| Name | Brand bar, emails, titles, the "filing company" definition | Set in the firm's font. Ellipsis never applied; wraps to two lines. |
| Logo | Brand bar (48 px max on the proof, 40 px in the desk), emails (160 × 48 box) | Transparent and white margins are trimmed automatically. If the logo's opaque pixels are under 3:1 against the sheet, it is placed on a 2 px-radius plate of the firm fill. With no logo, a **monogram** (up to 3 initials in Register Roman Display 600 on a square firm-ink plate) is used. Never a circle, so nothing reads as a seal. |
| Primary color | Forward buttons, links, brand rule, guilloche, focus | The guard in 11.2 |
| Second color | The 3 px brand rule and rail edge only | Raised to 1.5:1 against the sheet. Never used for text unless it passes 4.5:1. |
| Font | Firm name, headings, buttons; body text only if it passes legibility | Presets or upload (WOFF2/OTF ≤ 400 KB). Checked for Spanish coverage (á é í ó ú ü ñ ¿ ¡), x-height ≥ 0.45 em and a real bold; otherwise headings only. **Never** used for values, fees, references or the consent. |
| Support email | Proof footer "Questions:", emails, intake pages | Required for the proof to show contact; falls back to the firm name only |

### 11.2 The guard (automatic contrast and meaning fixes)

Computed in OKLCH at save time (web) and again at render (engine), stored as a per-firm **theme ticket** of derived tokens:

1. **`firm-fill`** (button backgrounds). If white text on it is ≥ 4.5:1, use it with white. If the color is light (L ≥ 0.72) and Intaglio text on it is ≥ 4.5:1, keep the color and switch the label to Intaglio. This fixes the "light color behind white button text" case without muddying the brand. Otherwise lower L in 0.01 steps, keeping the hue and clamping chroma to sRGB, until white passes.
2. **`firm-text`** (links and accents on sheet). Lower L until ≥ 4.5:1 on the sheet. In dark mode raise L until ≥ 4.5:1 on the dark sheet.
3. **`firm-guilloche`**: firm-text at 38% over the sheet. **`firm-tint`**: L 0.97, chroma ≤ 0.03.
4. **Meaning guard.** If the color's chroma is ≥ 0.08 and its hue falls in the **stop zone (15° to 40°)** or the **hold zone (55° to 90°)**, the firm keeps it for its brand bar, logo plate, links and guilloche, but **forward buttons, including the approve button, print in Intaglio** with white text. A red firm never gets a red Approve button, and an orange firm never gets one that reads as a rehearsal hold. Greens and every other hue may use their own color for forward buttons.
5. **Focus.** firm-text if it is ≥ 3:1 against both the sheet and the fill it surrounds; otherwise Intaglio.
6. **Chips are never themed.** Status inks and glyphs are fixed for every firm.

Setup shows the result live on the sample proof. When the guard changed something, it shows the firm's swatch and the corrected swatch side by side.

### 11.3 Enterprise themes

The same ticket, plus the subscriber's own name on the "filing company" definition, its support contact on the proof, its own email sender domain through Resend, and no "with CoFile". The embed takes `--cf-font`, `--cf-ink` and `--cf-radius` (0 to 8 px) from the host. All three still pass through the guard.

---

## 12. Accessibility, Spanish and dark mode

**Accessibility (WCAG 2.2 AA everywhere; AAA 7:1 for body text on client pages and the proof).**
- An 18 px base and 14 px floor on client pages. No all-caps labels. Links are always underlined. Every target is at least 44 px, and the approve button at least 56 px.
- **Meaning never rests on color alone.** Chips have glyphs, charts have hatching, and errors have a ■ and text.
- The proof is navigable by headings: firm banner, H1, then H2 for "The state's review page", "Filing details" and "State fees", then the signature form. The approve button is `aria-describedby` the consent paragraph and the total. The rosette, frame, microprint and second serial are `aria-hidden`, so the reference is read once.
- It reflows at 400% zoom with no horizontal scroll. Focus is always visible. There is a skip link, and the reading order is the visual order.
- No timeouts are hidden. The proof deadline is printed in words at the top.
- Testing: screen readers (VoiceOver iOS, TalkBack, NVDA), keyboard only, 200% text, Windows High Contrast (forced-colors: frames drop to a 1 px system border; chips keep their glyphs).

**Spanish.**
- Translations of the locked copy are a copy-team deliverable by a legal translator with Spanish-first review. The design does not invent them.
- A 30% expansion budget everywhere. Buttons wrap and never truncate. The approve button is designed for a three-line Spanish label at 360 px.
- An "English · Español" switch at the top right of client pages, the proof and emails (Copy notes), remembered per link. `lang` is set on the page and on any untranslated value.
- **What the state receives is never translated.** Proof values stay exactly as filed. Prose around them is translated. Money stays `$103.50` in US format because it is a US state fee. Dates are written in Spanish with the time zone spelled out.

**Dark mode (the plate).**
- Follows the system setting, with a manual toggle on the desk, dashboard and docs.
- On the proof, the sheet becomes the plate and the guilloche thins to 30%. **The state's review page picture is never inverted.** It stays as photographed inside its mount. The signature pad always stays white paper.
- The enterprise band on the home page is always the plate.
- Emails declare `color-scheme: light dark` and ship rosette PNGs with a sheet-colored disc behind them so they never vanish on dark clients.

---

## 13. Production

**Design files.** A Figma library, "CoFile Register", holds the tokens (as variables, light, dark and firm-theme modes), every component in 9 with all its states, and page templates for every route in 10. It also has a "Theme lab" page with 40 real-world-style firm color and logo combinations run through the guard.

**Code packages.**
- `@cofile/tokens`: Style Dictionary output to CSS custom properties (web), a TS constants file (the engine's `render.ts` inline styles) and an inline-style map for email.
- `@cofile/rosette`: zero-dependency TypeScript. Takes the canonical approval object and returns an SVG string (engine, no JS on the client), a React component (web) and a PNG via resvg (email). Tests: identical input gives byte-identical SVG; 10,000 random hashes all pass the guards (no 13 lobes, d < r, minimum stroke); the snapshot changes when any detail changes.
- `@cofile/ornament`: frame, corner rosettes, microprint rule and underprint as SVG generators.
- `@cofile/theme-guard`: OKLCH conversion, contrast and the meaning guard, shared by web and engine, with property tests (any input color yields derived pairs that meet their ratios).
- Fonts: WOFF2, subset to Latin and Latin Extended, self-hosted on cofile.app and api.cofile.app, with metric-matched fallbacks so pages don't shift when they load.

**Assets.** The Open C (Line, Solid, Favicon) as SVG, PNG 16 to 512, ICO, apple-touch 180 and maskable 512. Wordmark and lockups (light, dark, one-color). The "with CoFile" lockup. Twelve engraved icons. Frame corner masters. Generated guilloche rules per firm for email. Open Graph images (1200 × 630) from the macro photography. Email templates in React Email. 404 and sign-up photographs.

**To commission.** A type foundry (four families, section 5), a hand engraver (mark, icons, master border), a rose-engine studio (lathe studies), an intaglio print shop (the specimen), a macro photographer, a creative technologist (the rosette generator), a legal translator for Spanish, and an accessibility auditor with older and low-vision testers.

**Phases.**
1. **Weeks 1 to 4: the proof first.** Tokens, interim type, the guard, the status families, and the proof rebuilt in `render.ts` with the frame, serials, signature block and server-side rosette. It is the act everything else serves.
2. **Weeks 5 to 10:** the home page, account pages, desk frame and pages, emails.
3. **Weeks 8 to 14:** the dashboard, docs, white-label pages and embed.
4. **Months 4 to 6:** engraved masters and lathe studies replace the drafted vectors, then photography, Spanish, a dark-mode audit, and moderated sessions with 12 firm owners over 55 and 12 Spanish-first clients approving on their own phones.
5. **Month 14:** the commissioned typefaces replace the interim ones.

---

## Appendix A: What I would push back on in the current site

1. **The mark puts a green check on every page before anyone has approved anything.** The folder tab with a check cut into it says "approved" on the log-in page, the 404 and the footer. In my trade you never pre-print the signature. The check belongs to the client, and it should appear only when they approve.
2. **The proof looks like a printout, not an instrument.** It is a field table in an 860 px column with a 4 px colored line as the only brand, the consent in a beige note at the top far from the button, and fonts fetched from a third party on a page where someone gives legal consent.
3. **Amber carries three meanings.** It marks a rehearsal, "waiting for approval" and the beta banner. Only a planned hold should be ochre.
4. **The firm's color replaces green on the forward button with no guard on meaning.** A red-branded firm gets a red Approve button.
5. **The partner desk leads with CoFile's name** and tucks the firm's logo at the right. It is the firm's desk; put their name on the door there too.
6. **HTTP method badges in status colors** (GET green, DELETE red) teach developers that green and red mean something other than approved and stopped.
7. **The rotated rubber stamp** on the rehearsal log. Instruments are not crooked, and a gimmick next to "held, on purpose" undercuts it.
8. **Type too small for the audience.** A 15 px body on the desk and 12.5 px badges are too small for readers aged 40 to 65 with reading glasses on the desk.

## Appendix B: Copy notes (suggestions only; nothing here is used in the design)

1. The home sample proof's button reads "Approve for filing", while the real proof reads "Approve, and authorize submission and payment". I'd make the sample match, so the first proof a firm sees is the one its client will.
2. "Test" (the chip on the desk's filing list), "test run" (filing detail progress) and "preview or test run" (Signatures) should be "rehearsal".
3. "Sign in" wording conflicts with "log in": "Signing in…" (the log-in button's pending label), "This account can't sign in", "People who sign in to this dashboard", "Last signed in", "Signed out" / "You're not signed in to this filing desk", "signs you out on every other device". "Google sign-in" may stay as Google's own term.
4. The embed says "Filed with CoFile" and everything else says "with CoFile". Pick one.
5. "You're invited to {firm}'s filing portal" should say "filing desk". The desk's next-step texts say "The approver" and "Your filing company" where partner copy elsewhere says "your client" and names the firm.
6. The proof title is built from codes ("NJ llc formation: TWO SISTERS BAKERY LLC"). Suggested: "New Jersey LLC formation: Two Sisters Bakery LLC".
7. Engine jargon on the dashboard: "The engine posts…" (Webhooks) and "Ask the platform team to configure tenant…" (Overview).
8. The staff subject "Site changed — review needed:" uses an em dash where the rest of the copy uses colons.
9. The rosette needs one sentence near it, which I have not added. A suggestion: "This pattern is drawn from the details on this page. If any detail changes, so does the pattern." Branding setup could use one too: "We adjusted your color slightly so text on it stays easy to read."
10. The language switch needs approved labels: "English" and "Español".
11. The live "Approval recorded" text, "We'll submit the filing exactly as shown.", is close to the "will be submitted" promise the copy rules avoid. It is saved by the stop-before-paying sentence that follows. Worth a look by counsel.
