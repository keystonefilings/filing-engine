# Top Billing

### The visual design of cofile.app, by Amara Okafor

Spec 03 of 10 · written against BRIEF.md v2 (Nov 26, 2026) and the locked copy in `web/app/page.tsx`.
Every headline, paragraph, label and caption quoted here is the real copy. Where my design needs a word that doesn't exist yet, I've marked it `[copy needed]`. I haven't written a single new headline.

---

## 1. Who I am, and what I bring

I'm Amara Okafor. I grew up in Lagos and I run a small brand and motion studio in London. I make brand worlds: custom wordmarks, kinetic type, 3D, launch films and campaign systems. My clients come to me when they need to be remembered after one visit.

Most B2B software looks the same: a blue gradient, a geometric sans, an isometric laptop, a grid of three icons. I could swap the logos on twenty of those sites and nobody would notice. CoFile can't afford that. Its buyer is a firm owner who has spent twenty years building a name, and the copy promises to put that name in front of their clients. The site has to show that promise, with real typographic swagger, before anyone reads a word.

Something personal shaped this concept. Where I grew up, every business has its name painted over the door, however small it is: the tailor, the pharmacy, the bakery, the accountant upstairs. The sign is the business's pride. Old signwriters had a convention for the people who did the work behind the founder: a raised, underlined little *º* after a C, *"& Cº"*. The founder gets the name. The company gets the small print.

That is CoFile's copy, word for word: *"Your name on the door. Ours in small print."* So I'm designing a brand whose most important job is to be the best supporting credit on the internet, and a public site with the nerve to give its own stage to someone else's name.

What I bring to the build: an identity system precise enough for an illustrator to draw and a foundry to cut, a motion language with real durations and easings, and briefs for the photographer, signwriter, 3D studio, illustrator and film crew I'd commission.

---

## 2. The visual concept: **Top Billing**

### The one idea

**The firm always gets top billing. CoFile takes the credit line.**

Every printed show poster, playbill and film one-sheet uses a *billing block*. The star's name is huge. Under it, smaller, comes "with" and the supporting names. Everyone understands that hierarchy without being told. I'm building CoFile's whole visual system on it:

- **The firm is the headliner.** On every page a firm or its client sees, the firm's name, logo, color and font are the biggest, first and boldest things. Our layouts are built to make *their* brand look expensive.
- **The client is the star of their own proof.** On the proof, the client's business name ("Two Sisters Bakery LLC") is set the way a poster sets a name in lights. It's their moment, and their firm presents it.
- **CoFile is the credit.** A small, beautifully made "with CoFile" line, designed to look perfect at 14 pixels under someone else's name. Our monogram is the signwriter's *Cº*: the company behind the name.

The public site at cofile.app is where CoFile gets to perform, and it performs in the language of the **printed show poster**: warm poster paper, flat confident inks, wood-type scale headlines, billing blocks, a stage that goes dark for the rehearsal. The poster is also where the copy's two metaphors meet. A poster gets *proofed at the printer* before it's printed (*"You've approved a proof before … at the printer"*), and it advertises a show that has been *rehearsed* (*"Rehearse on the real stage"*). Printing and theatre: one tradition, the copy's two images.

### How it brings out the copy's selling story

| The copy sells | How Top Billing shows it |
|---|---|
| **1. Your firm, your client, your name.** "Your name on the door. Ours in small print." | The billing block itself. In section 4 the home page hands its whole stage to the firm's color: the section floods in Harbor & Pine's pine green, the headline runs edge to edge, "Ours in small print." is set genuinely small, and a row of swatches lets a visitor try their own firm's color across the desk, the form, the proof and the email. The credit lockup and the *Cº* monogram are the brand's humility made visible. |
| **2. Effortless for everyone.** "You start it. Your client approves it. CoFile files it." | The process headline is set as a billing block. "Your client approves it." is the biggest line, because "your client is in charge of the middle one". "CoFile files it." is the smallest, because that's our billing. Ana's text message is pulled apart word by word and flies into a drafted filing: kinetic type that *shows* "They text you" becoming a form. |
| **3. A client experience to be proud of.** "Your client sees what the state will see, before the state does." | The proof is designed as the most beautiful page in the product, a printer's proof made for a phone. The client's business name gets poster treatment, the firm's brand frames it, fees are set big and plain, and there's one button. The home page shows it nearly life size, annotated like a proof on the press-room table. |
| **4. It does the work and brings the results home.** "The papers come back to you." | A tactile 3D moment: the state's documents and the EIN letter drift in from off-page, at different speeds, and settle in a neat stack on the firm's record, in the firm's color. It's a payoff you can feel. |
| **5. Try it free, for real.** "Rehearse on the real stage." | The house lights go down. As you scroll into the Rehearsals section the paper ground dims to a deep aubergine stage. A marigold spotlight comes up on the rehearsal run sheet while the screens of the state's form fill in one by one. The free-rehearsal button is shaped like a ticket throughout the site: your seat at the rehearsal. |

### What Top Billing is not

It is not vintage pastiche. No distressed wood type, fake ink bleed, sepia, circus ornaments or curly Victorian borders. The references are contemporary: arts-festival identities, the posters of modern theatre seasons, film title sequences. Clean contemporary type at poster scale, flat color, real paper grain.

It is not built around security. Locks, shields, ticks, seals, stamps, vaults, hashes and "verified" badges are all out, including in the support sections. Security, the checks and "the catch" get the calm, readable treatment of a theatre programme's inside pages (see §6, "Posters and Programme pages"). They're easy to find and beautifully set, but they're not the show.

It never imitates government. No eagles, no state seals, no flags, no capitol domes, no IRS typography or colors, no "official" frames. Every document we draw or render is a plain abstract sheet.

---

## 3. Identity

The identity has four parts:

1. **The *Cº* monogram**: the symbol.
2. **The CoFile wordmark**: the name.
3. **The credit, "with CoFile"**: the lockup that appears most often, under other people's names.
4. **The Headliner frame**: the rules for how a firm's logo, name, color and font take the top of their pages.

### 3.1 The *Cº* monogram

**The story.** The signwriter's abbreviation for "& Company" was a capital C followed by a raised, underlined small o. It sat after the founder's name, smaller, a little to the side, like this: *Harbor & Pine & Cº*. It stood for everyone who did the work. We're the Cº.

**Construction** (for the illustrator). All measurements are in units of **S**, the stroke weight of the C. Draw on a grid where S = 20 units.

```
          ┌──── 4.70S ────┐ 0.35S ┌─1.60S─┐
          .  ▄▄▄▄▄▄▄▄▄▄                ▄▄▄▄
       ▄██████████████▄  ▄          ██▀  ▀██      ◄ the º: a ring, outer Ø 1.60S,
     ▄████▀▀      ▀▀███  ▀ ◄ upper    ██    ██        stroke 0.45S, top flush with C top
    ████▀            ▀    terminal    ▀██▄▄██▀
   ████                    (flat cut)                ◄ gap 0.35S
   ████                                ▀▀▀▀▀▀▀▀      ◄ the bar: 1.60S × 0.38S, flat ends
   ████               ◄ aperture 1.50S tall
   ████
    ████▄            ▄   ◄ lower terminal (flat cut,
     ▀████▄▄      ▄▄███▀     extends 0.20S further right
       ▀██████████████▀      than the upper one)
          ▀▀▀▀▀▀▀▀▀▀
          5.00S tall overall
```

- **The C.** Outer height 5.00S, outer width 4.70S: very slightly narrower than a circle, for optical roundness. Stroke S throughout, with a whisper of thinning at the joints (0.92S where the bowl meets the terminals) so the joints don't clog at small sizes. The inner counter is 3.00S tall. Both terminals are cut **flat and horizontal**, never angled. The upper terminal ends 3.90S from the left edge and the lower at 4.10S; the longer lower terminal gives the C a firm base. The vertical gap between the terminals (the aperture) is 1.50S: open, so it survives a 16 px favicon.
- **The º.** A ring with outer diameter 1.60S and stroke 0.45S. Its top is flush with the top of the C. Its left edge sits 0.35S to the right of the C's widest point.
- **The bar.** 1.60S wide (exactly the ring's diameter) and 0.38S tall, with flat ends. It sits 0.35S below the ring, centered on it.
- **Overall.** 6.65S wide × 5.00S tall. The optical center falls at the C's counter, not the bounding box: in an app icon, shift the mark 0.15S right of the box center.
- **Small sizes.** Below 24 px the º ring gets a heavier stroke (0.55S) and the gap above the bar closes to 0.28S. Supply this as a separate "small" master (`cofile-monogram-sm.svg`).
- **Color.** Ink on light grounds, Paper on dark, Ink on Marigold. In large brand moments only (the app icon, the launch film end card, social avatars, conference banners), the **bar alone** may be Marigold on an Ink ground. It's the underline under the company. It is never another color, and the mark is never outlined, gradient-filled, beveled or set inside a shield or circle badge.
- **App icon / favicon.** An Ink square (corner radius 22.5% for iOS-style masks, square for others) with the Paper monogram centered optically at 58% of the square's height and a Marigold bar. The 16 px and 32 px favicons use the small master, Paper on Ink.

### 3.2 The CoFile wordmark

The wordmark is custom-drawn from CoFile Marquee, our commissioned display face (see §5), at about width 108 and weight 780, then hand-finished. Its job is to stay legible at 11 px cap height in a credit line and to look confident at 200 px on a conference banner.

- **Proportions.** x-height is 0.74 of cap height, deliberately big, for small-size legibility. Stroke contrast is minimal: horizontals are 0.92 of verticals.
- **C** is the same C as the monogram, scaled to cap height, with the same flat horizontal terminals.
- **o** is a true round, the same stroke as C, kerned −4% of cap height tight against the C so "Co" reads as one pair.
- **F** has a top arm 0.62 of cap height long and a middle arm 0.50 long, set at 0.52 of cap height (just above center, optically level). All cuts are flat.
- **i** has a circular tittle 1.20× the stem width across, with a gap of 0.60 stem above the x-height. The F's top arm must end before the tittle starts: the clearance is at least 0.30 stem. No ligature.
- **l** is straight, with no tail.
- **e** has a horizontal terminal cut and an aperture 0.30 of x-height. It's open, so it never closes up at small sizes.
- **Spacing.** Fairly loose (+1% tracking) for small use; supply a "Display" variant at −1.5% for sizes above 64 px.
- **Color.** Ink, Paper or Marigold-on-Ink. The wordmark is never set in a firm's color.

**Lockup.** Monogram to the left of the wordmark, with the monogram's height at 1.30× the wordmark's cap height and a gap of 0.80S (S measured on the monogram). Baselines: the monogram's bottom sits on the wordmark baseline. Clear space all round is one monogram ring diameter. The site header uses the horizontal lockup; social avatars and favicons use the monogram alone.

### 3.3 The credit: "with CoFile"

This is the most-seen piece of our brand, so it gets the most care. It appears on every page a firm's client sees, in every client email, and at the bottom of the embed widget (where the copy reads "Filed with CoFile").

```
   Harbor & Pine CPA ──────────────────────────────────  with CoFile
   ▲ headliner (firm font, ink, 20–24 px)                 ▲ credit (14–16 px)
```

- **Construction.** The word "with" is set in Atkinson Hyperlegible Next Regular, lowercase. It's followed by a normal word space and the CoFile wordmark, scaled so its cap height matches the ascender height of "with". The two share one baseline, so the credit reads as a sentence, not a logo stuck on a sentence. "Filed with CoFile" in the widget follows the same rule.
- **Sizes.** Three sizes only: **14 px** (widget, phone header), **15 px** (proof, forms) and **16 px** (filing desk header, email footer). Never larger than 16 px on any firm surface, and never more than 35% of the firm name's cap height.
- **Color.** Credit Grey `#6E6B74` on light grounds (5.2:1 on white) and `#A7A3AE` on dark. **Never the firm's color, never Marigold, never bold.** The credit has to sit beside any brand without competing with it.
- **Placement.** At the right end of the firm's header band on desktop. On phones, in the page footer instead, so the top of the phone screen belongs entirely to the firm. The credit never sits above the firm's name, never in the middle of a page, and never inside a button.
- **Behavior.** On the filing desk it links to cofile.app. On the proof, the client form and emails it's plain text: nothing should pull the client away from the firm's page.

### 3.4 The Headliner frame: how a firm's brand takes the top of its pages

A firm uploads whatever it has: a crisp wide SVG, a square JPEG with a white box, a stacked logo, a 200 px PNG from its old website. The system makes all of them look deliberate.

**The marquee rule.** A full-bleed band in the firm's **main color**, 6 px tall, across the very top of every firm page, form, proof and email. It carries the firm's exact hex, unadjusted: it's a graphic, not text. If the color is so light that it falls below 1.5:1 against white (a pale yellow, say), a 1 px `rgba(0,0,0,0.08)` line runs beneath it so it still reads as a deliberate edge.

**The header band.** Pure white `#FFFFFF`, 76 px tall on desktop and 64 px on phones, with a 1 px rule beneath it in `#E3E1DC`. It's pure white rather than our warm paper so that a firm's JPEG with a white background disappears into it: I call this the white-box problem.

**Logo optical sizing.** Logos are sized by visual weight, not by a fixed height, so a wide logo and a square logo feel equally important:

1. Auto-trim transparent or near-white margins (luminance > 0.96) from the uploaded image.
2. Let *r* = trimmed width ÷ height.
3. Logo height *h* = clamp(24 px, 52 px × *r*^−0.35, 56 px) on desktop, and × 0.82 on phones. Maximum width is 220 px on desktop and 160 px on phones.
   - Square logo (r = 1): 52 px tall.
   - 2:1 logo: 41 px.
   - 4:1 wordmark: 32 px.
   - 8:1 long wordmark: 25 px.
4. The **proof** and the **client form** use a larger "presenting" scale: × 1.25 (up to 64 px tall on desktop).
5. Never upscale a raster image past its native pixels at 2×. If a logo is too small, show it at its native size and center it vertically.

**The firm's name.** It's set beside the logo in the firm's chosen font (or Atkinson Hyperlegible Next Bold if they haven't chosen one), Ink color, 20 px on desktop, 18 px on phones and 24 px on the proof. The gap between logo and name is 12 px. If a firm's logo already contains its name, a setup option hides the typeset name `[copy needed: label for that option]`.

**No logo?** The firm's name becomes the logo. We draw an **initial tile**: a 36 px square with a 9 px corner radius, filled with the firm's main color, carrying up to two initials (the first letters of the first two significant words: "Harbor & Pine CPA" becomes **HP**) in white, firm font, weight 700, 16 px, centered optically. The full name is set beside it. Initials are never generated from "CPA", "LLC", "&", "and", "of" or "the".

**Logos in dark mode and on color.** If the logo isn't transparent, or it's dark on transparent and would vanish on a dark ground, it sits on a **logo plate**: a white rounded rectangle (10 px radius, 8 px padding) that keeps the firm's artwork exactly as they made it. We never invert, recolor or put a filter on a firm's logo.

**The firm's color, made to look its best.** It's handled automatically, working in OKLCH:

| Use | Rule |
|---|---|
| Marquee rule | The exact hex. |
| Primary button fill | The exact hex if white text on it reaches 4.5:1. If not, lower its lightness (L) in steps of 0.02, keeping hue and chroma within gamut, until white text passes. The firm sees the adjusted shade in the setup preview. The existing help text already says "Button text is white, so choose a dark color."; this just catches the near misses. |
| Selected and hover tints | The main color mixed with white in OKLab: **6%** for selected table rows, **12%** for highlighted values on the proof, **24%** for focus halos. |
| Links and highlights ("Second color") | Must reach 4.5:1 on white; if not, darken it the same way. If no second color is set, links use the adjusted main color. |
| Dark mode | Text uses of the color are lifted to L ≥ 0.74. Button fills keep the light-mode fill, which already passes with white text. |
| Clash guard | If the firm's color sits close in hue to a status color (a green firm and our "Accepted" green, say), the status pills still separate by shape and label (see §11). Nothing in the system relies on color alone. |

**The firm's font.** It's applied to the firm's name, page headings (h1 to h3), legends and buttons. **Body text, field values and fees stay in Atkinson Hyperlegible Next** so every fact is equally legible whatever font the firm loves. My rule: the firm's voice for the headlines, our legibility for the facts. To stop a small-x-height serif from looking puny beside Atkinson, we apply CSS `font-size-adjust` with the firm font's measured x-height ratio, normalized to 0.53.

### 3.5 Harbor & Pine CPA: the example firm's identity

The copy's example firm appears in the hero, the proof, the Firms section, the emails and every mockup, so it needs a real, believable identity. That's also how the site proves a traditional firm looks wonderful on our system. I'd commission it like a real job, labelled "example firm" wherever the copy already says so.

- **Logo.** A rounded square holding a simple pine (three stacked chevrons) above a single wave line, beside "Harbor & Pine" in a classic old-style serif, with "CPA" set in small caps beneath. It's drawn to feel like a real 20-year-old practice: tasteful, slightly conservative, nothing trendy.
- **Main color.** Harbor Pine `#1F5A4C` (8.0:1 with white).
- **Second color.** Harbor Blue `#245F7E`.
- **Font.** Libre Caslon Text, a free Caslon revival and the kind of font a real CPA firm picks.
- **Its job on the site.** It shows the system's range. CoFile's own pages are loud contemporary poster; Harbor & Pine's pages are calm, white and traditional. Both look intentional.

---
## 4. Color

### 4.1 The idea: house lights

There are two color worlds, and the line between them is the concept:

1. **CoFile's own pages** (the public site, sign-up, log-in, the enterprise dashboard, docs) are **the theatre**: warm poster paper, flat inks, a marigold light, and an aubergine stage for the rehearsal.
2. **The firm's pages** (filing desk, service pages, client form, the proof, client emails) are **the firm's own house**: white sheets on a near-neutral ground, built to flatter *any* firm color. CoFile's Marigold never appears on these pages. That's the strongest way I know to say "Your name on the door."

### 4.2 CoFile's palette (the theatre)

| Name | Hex | Role |
|---|---|---|
| **Poster Paper** | `#F6F0E6` | The main ground of the public site. Warm, uncoated, never pure white. |
| **Press Ink** | `#17141F` | All text and the main ink. A near-black with a violet cast, so it feels printed rather than digital. 16:1 on Paper. |
| **Marigold** | `#FFB21E` | The signature: the light. Primary buttons (with Ink text, 10:1), full-bleed poster sections, the spotlight, the highlighter. **Never used as text on paper.** |
| **Stage Aubergine** | `#241530` | The stage: the Rehearsals section, dark mode, the deepest shadows in photographs. 15:1 with Paper text. |
| **Vermilion** | `#F2542D` | The second ink, used sparingly: kinetic accents, numbered callouts on the proof, underline sweeps in the text-to-filing moment. A graphic color only. |
| **Programme** | `#ECE3D3` | The ground of the support sections (Checks, The catch, Security) and footnotes. A slightly deeper paper, like the inside pages of a programme. |

Supporting tones:

| Name | Hex | Role |
|---|---|---|
| Ink 2 | `#5A5363` | Secondary text on Paper (6.5:1) and on Programme (5.8:1). |
| Rule | `#D9CFBF` | Hairlines and table rules on Paper. |
| Marigold Deep | `#F5A300` | Primary button hover. |
| Marigold Wash | `#FFE7B3` | The highlighter on the hero proof; tinted backgrounds. |
| Ochre Ink | `#8A5A00` | When something "marigold" has to be *text* on Paper (5.2:1). |
| Vermilion Ink | `#B8320F` | Vermilion as text on Paper: callout numbers under 24 px, inline emphasis (5.3:1). |
| Ink Night | `#100D16` | The Enterprise section and the footer. |
| Plum Mist | `#B9B0C2` | Secondary text on Stage and Ink Night. |

**Proportions.** On a typical scroll of the home page: Paper and Programme about 60%, Ink text and the Ink Night sections about 15%, Marigold about 12% (two full-bleed posters plus buttons and light), the firm's color about 8% (the Firms takeover and the mockups), Aubergine about 4% (the stage) and Vermilion under 1%.

**Rules.**

- Marigold is light, not decoration. It appears where something is lit (the proof in the hero, the run sheet on stage), where something is to be pressed (primary buttons) and on the two bookend posters (Process and Close).
- Only one full-bleed color section in view at a time. Between color sections there is always Paper.
- No gradients except light: the spotlight pools (soft radial gradients from Marigold at 55% opacity to transparent) and the dimming of the house lights. Never a two-hue UI gradient.
- Paper grain on every Paper, Programme and Marigold ground: a 512 × 512 px tiled noise texture at 4% opacity with multiply blend (Ink Night sections use 3% screen blend). It's the difference between a poster and a screen.

### 4.3 The firm's house palette (the firm's pages)

The neutrals are deliberately almost colorless (OKLCH chroma under 0.006), with the faintest warmth, so a navy, a burgundy, a teal or a pine all sit naturally on them.

| Name | Hex | Role |
|---|---|---|
| House Canvas | `#F6F6F3` | The page ground behind sheets. |
| Sheet | `#FFFFFF` | Header band, cards, the proof, the form. |
| House Rule | `#E3E1DC` | Borders and table rules. |
| Field Border | `#8F8B84` | Input borders (3.4:1 against white, above the 3:1 a field boundary needs). |
| House Ink | `#1C1B1F` | Text (17:1 on white). |
| House Ink 2 | `#57555C` | Secondary text (7.4:1). |
| Credit Grey | `#6E6B74` | "with CoFile" (5.2:1). |
| *Firm Main* | firm's hex | Marquee rule, primary buttons, active nav, focus ring, and the initial tile when there's no logo. |
| *Firm Second* | firm's hex | Links, highlighted values on the proof (as a 12% tint), the selected state of choice cards. |

### 4.4 Status colors (both worlds)

Status is never shown by color alone. Each tone has a shape, and the label is always written out (the labels come from `web/lib/status.ts`).

| Tone | Text | Tint | Shape | Used for |
|---|---|---|---|---|
| Neutral | `#57555C` | `#EFEDEA` | hollow circle ○ | Received, Queued, Filing now, Final check, Getting the state's review page |
| Waiting / warn | `#8A5A00` | `#FFF1D6` | half-filled circle ◐ | Waiting for approval, Needs information, Changes requested, On hold, Being checked, Paused: state site changed, Name unavailable |
| Done / ok | `#256B42` | `#E3F1E8` | filled circle ● | Approved, Submitted to the state, Accepted by the state, Completed, EIN issued |
| Problem / bad | `#A3261B` | `#FBE4E0` | filled diamond ◆ | Needs correcting, Rejected by the state, Failed, Stopped |
| Rehearsal | `#17141F` | `#FFFFFF` with a 1.5 px dashed `#17141F` border | — | The "Rehearsal" chip (a dashed outline, like a pencilled-in date) |

On CoFile's own pages, the Rehearsal chip is Ink on Marigold Wash with a dashed Ink border. On firm pages it's House Ink on white with a dashed border: neutral, never Marigold.

### 4.5 Dark mode

**CoFile's pages (the theatre at night).** The ground is Stage Night `#15111C`, surfaces are `#211A2B`, text is Paper `#F3ECE0` and secondary text is Plum Mist `#B9B0C2`. Rules are `#3A3045`. Marigold stays `#FFB21E`; a dark ground suits it even better. Vermilion lifts to `#FF6B47`. Poster sections in Marigold stay Marigold, which makes them luminous panels in a dark page. Grain switches to 3% screen blend.

**Firm pages.** The ground is `#141416`, sheets are `#1E1E21`, text is `#F2F1EE` and secondary text is `#ABA8B0`; Credit Grey becomes `#A7A3AE`. Firm color text uses lift to L ≥ 0.74. Logos sit on the logo plate (§3.4). **The proof stays a white sheet in dark mode**, surrounded by the dark canvas, because a proof is paper. The client should see exactly the document they're approving, the way they'd see the state's own page.

---

## 5. Typography

### 5.1 The faces

| Role | Face | Why |
|---|---|---|
| **Display: the voice of CoFile** | **CoFile Marquee**, commissioned. A variable grotesque with a width axis from 60 (billing-block condensed) to 150 (headliner extended) and weight from 300 to 900. | Billing blocks need both extremes: condensed credits and wide, heavy headliners. A width axis lets one family do both, and it lets type *move*: words breathe open from condensed to full width as they arrive. It also absorbs Spanish text length (§12). |
| Interim display, until the commission lands | **GT Flexa** (Grilli Type) variable, licensed for web. For prototypes and open builds: **Anybody** (variable wdth 50–150, wght 100–900, free). | The closest retail and open-source behavior to Marquee's width range. |
| **Text, forms, the proof, the app** | **Atkinson Hyperlegible Next** (Braille Institute), weights 300 to 800 with italics. | It was designed for low-vision readers. Its letterforms are distinct where it matters on a filing: I l 1, O 0, rn m, 5 S, 8 B. Our readers are often 40 to 65, the values on a proof must be read exactly, and the client is often on a phone in a bakery. It has full Latin coverage for Spanish. |
| **Code and API docs** | **Atkinson Hyperlegible Mono** | It keeps the family together and the same distinctness rules apply to keys and IDs. Used only in the docs, the dashboard API keys page, the `"dryRun": true` snippet and widget code. **Never for client-facing values.** |
| The firm's font | Whatever the firm chooses in Setup → Branding | Applied as described in §3.4. |

**Brief for the CoFile Marquee commission** (an independent foundry with variable-font experience):

- A contemporary grotesque in the wood-type poster tradition: big x-height (0.74), flat horizontal terminals (the C, c, e, s, a and r terminals echo the monogram), a sturdy, slightly squared bowl structure, low contrast.
- **Axes:** wdth 60–150 and wght 300–900. A named instance "Credit" (wdth 70, wght 560) and a named instance "Headliner" (wdth 112, wght 820).
- **Glyph set:** Latin Extended-A at minimum, all Spanish characters (á é í ó ú ü ñ ¿ ¡), lining and tabular figures, a proper º and ª, arrows (↳ ← →), and a designed ampersand. The ampersand matters a lot, because "Harbor & Pine" and "& Cº" are both in the story.
- **Alternates:** a stylistic set with a single-storey **a** and a **G** without a spur, for headlines.
- **Delivery:** variable WOFF2 subset for the web (Latin, about 70 KB), plus static instances for email (as images) and print.
- **Timeline:** 16 to 20 weeks. The interim face ships first; Marquee swaps in with no layout changes, because its metrics are briefed to match GT Flexa's x-height and width range.

### 5.2 The public site scale

Sizes are fluid between 375 px and 1440 px viewports using `clamp()`. Display sizes use CoFile Marquee; text sizes use Atkinson Hyperlegible Next.

| Token | Desktop | Phone | Face · width · weight | Line height | Tracking | Used for |
|---|---|---|---|---|---|---|
| `display-xxl` | 152 px | 58 px | Marquee · 112 · 820 | 0.90 | −2% | Billing headliners: "Your name on the door.", the Close |
| `display-xl` | 100 px | 46 px | Marquee · 100 · 800 | 0.94 | −1.5% | Hero h1 |
| `display-l` | 72 px | 38 px | Marquee · 100 · 780 | 1.00 | −1% | Poster section h2 |
| `display-m` | 48 px | 32 px | Marquee · 92 · 720 | 1.06 | −0.5% | Programme section h2 (support) |
| `title` | 28 px | 22 px | Marquee · 96 · 680 | 1.20 | 0 | h3, card titles, step titles |
| `kicker` | 16 px | 15 px | Marquee · 72 · 660 · CAPS | 1.30 | +5% | "For CPA, payroll, fractional CFO and title firms" |
| `credit` | 15 px | 14 px | Marquee · 70 · 560 · CAPS | 1.30 | +8% | Billing credit lines, figure captions, table heads |
| `lede` | 24 px | 20 px | Atkinson Next · 400 | 1.45 | 0 | Ledes |
| `body` | 19 px | 18 px | Atkinson Next · 400 | 1.60 | 0 | Paragraphs, list items |
| `small` | 16 px | 16 px | Atkinson Next · 400 | 1.50 | +0.5% | Notes, captions, footnotes. **Nothing meaningful is smaller than this.** |
| `button` | 18 px | 17 px | Marquee · 96 · 720 | 1.00 | +0.5% | Public-site buttons |
| `mono` | 16 px | 15 px | Atkinson Mono · 400 | 1.55 | 0 | Code |

Example clamp: `display-xl: clamp(46px, 2.85rem + 4.9vw, 100px)`.

### 5.3 The app scale (filing desk, proof, forms, dashboard)

| Token | Size | Face | Weight | Line height |
|---|---|---|---|---|
| `h1` | 36 px / phone 30 px | firm font → else Atkinson Next | 700 | 1.15 |
| `h2` | 26 px / 23 px | firm font → else Atkinson Next | 700 | 1.25 |
| `h3` | 20 px | firm font → else Atkinson Next | 700 | 1.30 |
| `body` | 18 px | Atkinson Next | 400 | 1.55 |
| `label` | 16 px | Atkinson Next | 600 | 1.35 |
| `value` (proof values, table cells) | 18 px | Atkinson Next | 600, tabular figures | 1.45 |
| `help` | 15 px | Atkinson Next | 400 | 1.45 |
| `proof-name` (the client's business name) | 44 px / phone 32 px | firm font → else Atkinson Next | 700 | 1.08 |
| `fee-total` | 34 px / 28 px | Atkinson Next | 700, tabular | 1.10 |

On the enterprise dashboard and docs (CoFile's own), `h1` and `h2` switch to CoFile Marquee at width 96 and weight 720.

### 5.4 Pairing rules

- Marquee shouts and Atkinson explains. A Marquee line is never longer than about 12 words, and body text is never in Marquee.
- **The billing block** is the signature typographic structure: a headliner (`display-xxl` or `display-l`) over a hairline rule (1.5 px Ink, 48 px long, or full width on posters) over a credit (`credit`). It's used for section openings, the Process headline, the Close, OG images and email headers.
- Kickers and credits in CAPS are never longer than one line at their size. Anything longer is sentence case.
- Figures: tabular lining for all money and dates. Fees align on the decimal point.
- Values the client typed or the state will receive (business name, address, members) are set in Atkinson Next 600, **not** mono or small caps. Uppercase values appear in uppercase only because that's how they were entered or how the state formats them ("TWO SISTERS BAKERY LLC").
- Italics: Atkinson Next Italic for captions such as "example firm" and "Sample proof · test details · not a real business". Never Marquee italics (it doesn't have them, on purpose).

---

## 6. Layout

### 6.1 Grid

| Breakpoint | Columns | Outer margin | Gutter | Content max |
|---|---|---|---|---|
| Phone < 640 px | 4 | 20 px | 16 px | 100% |
| Tablet 640–1023 px | 8 | 32 px | 20 px | 100% |
| Laptop 1024–1279 px | 12 | 48 px | 24 px | 1184 px |
| Desktop ≥ 1280 px | 12 | 80 px | 24 px | 1280 px |

Full-bleed poster grounds always run edge to edge; the content inside them keeps the grid. Billing headliners may break the grid on desktop and run from margin to margin, overriding the 1280 px max, up to 1600 px on very wide screens.

### 6.2 Spacing

The base unit is 8 px, with a 4 px sub-grid for type.

Scale: `4 · 8 · 12 · 16 · 24 · 32 · 48 · 64 · 96 · 128 · 160 · 208`

| Rhythm | Desktop | Phone |
|---|---|---|
| Poster section padding (top / bottom) | 160 / 160 | 96 / 96 |
| Programme section padding | 112 / 112 | 72 / 72 |
| Headline to lede | 32 | 20 |
| Lede to content | 64 | 40 |
| Between list items | 20 | 16 |
| Card padding | 32 | 20 |
| Form field to field | 24 | 20 |

**Reading measure.** Ledes 34 to 38 em (about 60 characters per line at 24 px); body 62 to 68 ch. Long paragraphs are never set across 12 columns.

### 6.3 Posters and Programme pages: how the home page breathes

The 13 sections alternate between two page types, which carries the brief's split between selling and support:

- **Posters** (Hero, Process, Proof, Firms, Requests, After, Rehearsals, Coverage, Enterprise, Close) are big type, one dominant visual, generous air, and full-bleed color where noted. One idea per screen.
- **Programme pages** (Checks, The catch, Security) sit on Programme `#ECE3D3`. They're set like the inside of a theatre programme: a two-column text layout, a smaller `display-m` headline, hairline rules, numbered notes, no imagery. They're calm, dense, honest, easy to find and easy to read, and they never compete with the posters.

**The section grounds, top to bottom:**

```
 1 Hero ............ Poster Paper  + marigold light pool
 2 Process ......... MARIGOLD full bleed
 3 The proof ....... Poster Paper
 4 Firms ........... FIRM COLOR full bleed (Harbor Pine, re-tintable)
 5 Requests ........ Poster Paper
 6 Checks .......... Programme                         (support)
 7 After ........... Poster Paper
 8 Rehearsals ...... STAGE AUBERGINE (house lights go down)
 9 Coverage ........ Poster Paper
10 The catch ....... Programme                         (support)
11 Security ........ Programme                         (support, joined to 10)
12 Enterprise ...... INK NIGHT
13 Close ........... MARIGOLD full bleed
   Footer .......... Ink Night
```

The rhythm is P · M · P · F · P · p · P · A · P · p · p · I · M. The two Marigold posters bookend the story (the three steps, and "Run one rehearsal. Then decide."). The firm's color sits right where the story is about the firm. The dark stage sits right where the story is about rehearsing.

### 6.4 Phones

- Every section stacks in copy order: headline, lede, visual, list.
- The hero puts the proof **after** the CTAs and beta note, not before. The phone visitor sees the promise and the button in the first screen, and the proof is the first thing they scroll to.
- Full-bleed color sections keep their color on phones: the color is the point.
- Wide tables become cards (§11). Two-column layouts become one column, and the list always follows its headline.
- Sticky header height is 56 px. The "Run a free rehearsal" ticket button stays in the header on phones; the nav links move into a sheet.
- Tap targets are at least 48 × 48 px, with 8 px between adjacent targets.

---

## 7. Art direction

### 7.1 The principles

1. **Real people, real places, real paper.** The site's people are the copy's people: a firm owner who is proud of the practice, and a small-business client (the bakery). They're photographed where they work, in natural light. No stock, no handshakes, no people pointing at laptops, no blue offices.
2. **The product is shown as live HTML, never as screenshots.** The hero proof, the drafted filing and the desk mockups are real components rendered in the page. They're crisp at any zoom, readable by screen readers, translatable, and the Firms swatches can re-tint them. Photography and 3D frame the product; they never replace it.
3. **Two inks over paper** for illustration: Ink plus Marigold, or Ink plus Vermilion, on Paper, with real screenprint grain. Never full-color clip art.
4. **Tactile 3D, used once and well**: the papers coming home (section 7). It's paper you can feel, studio-lit and quiet.
5. **Never government.** No seals, eagles, flags, capitol domes, state outlines used as emblems, IRS marks or official-looking letterheads in any photo, render or illustration. Documents are abstract sheets: a title bar, lines of text and a signature line. The art director checks every frame for this before sign-off. Any real government website screen used on the site (the "state's own review page" picture) is shown at the size the copy needs, in a plain neutral frame, with any seal cropped out or blurred.

### 7.2 Photography

**What I'd commission:** an editorial portrait and documentary photographer who shoots small businesses and food: someone who lights darker skin beautifully, works with natural light plus one soft source, and makes real places look warm without styling them into a catalogue. Two shoot days in a real bakery and a real accounting office in the New York and New Jersey area, plus one half day on a theatre stage. The cast is real people (non-actors or lightly cast), with full model and property releases. The art director attends all shoots.

**Grade.** A warm, filmic grade: highlights lean toward Marigold (+8 warmth), shadows sit toward Aubergine (−4 tint toward magenta-blue). Moderate contrast, natural skin. One LUT, supplied to every photographer and the 3D studio, so photos and renders sit in one world.

**Lenses and feel.** 35 mm and 50 mm equivalents, eye level, shallow depth of field (f/2 to f/2.8). Hands and objects matter more than faces.

**Shot list**

| # | Shot | Where it's used | What it shows | Notes |
|---|---|---|---|---|
| P1 | **The Door.** A glass office door, morning light. "Harbor & Pine CPA" is gilded on the glass by a real signwriter (see §7.5). Behind the frosted half, the soft shape of someone at a desk. | Section 4 (Firms), sign-up page, launch film | "Your name on the door." Made literal, and beautiful. | Gold leaf, centered, classic layout. **Optional detail:** a tiny "with CoFile" credit painted in 10 mm grey letters at the bottom right of the glass, like a glazier's mark. It should be noticeable only on a second look. Shoot with and without. Crops: 4:5, 3:2, 1:1. |
| P2 | **The bakery at 5 am.** Ana and Lucia Ortiz (cast) behind the counter of a real Jersey City-style bakery. Ovens on, flour in the air. Ana has her phone out. | Section 5 (Requests), emails, social | Who the client is. The text message happens in real life. | Phone screen left blank (comped with the live UI). Two sisters, believably related, in their 30s to 40s. |
| P3 | **Thumb on the proof.** Close up: Ana's floury thumb over her phone, the proof on screen (comped), a tray of conchas out of focus behind. | Section 3 (The proof), the proof email | "A client experience to be proud of." | The screen is comped with the real proof component in Harbor & Pine's brand, and the thumb never covers the button. |
| P4 | **The printer's proof.** Still life: a hand holds a fresh business card proof up to a window. A pencil and a few more proofs lie on a worktable in a small print shop. | Section 3, beside the lede | The copy's analogy: "You've approved a proof before: business cards, letterhead, an invitation at the printer." | Warm, quiet. **No "approved" stamps or seals** in frame. The card is blank or reads a fictional name. |
| P5 | **The firm owner.** The (cast) founder of Harbor & Pine, a woman in her late 50s, at her desk with the filing desk on her laptop (comped), mid-laugh on the phone with a client. | Section 4 brand-world spread, sign-up page, log-in page | The buyer sees herself: proud, busy, in charge. | Framed diplomas and plants are fine; **no government certificates or seals visible.** |
| P6 | **The ghost light.** An empty theatre stage with a single bare-bulb ghost light center stage and the house in darkness. | Section 8 (Rehearsals), 404 page | "The whole filing, performed on the state's real website with no audience." | Shoot on a real proscenium stage. The bulb is Marigold-warm and the house falls to Aubergine. A clean plate is needed for the 404 too. |
| P7 | **The four firm types.** Four environmental portraits: a CPA, a payroll company owner, a fractional CFO and a title company owner, each in their own space. | Sign-up page, OG images, campaign | "For CPA, payroll, fractional CFO and title firms" made visible. | Ages 40 to 65, a mix of genders and backgrounds. Each holds or looks at one physical object of their trade. |

Alt text for every photograph: `[copy needed]` (the brief requires it; I've noted what each picture shows, above, for the copywriter).

### 7.3 Illustration

**What I'd commission:** a printmaker-illustrator who works in limited-palette screenprint style: bold flat shapes, two inks, visible grain, a sense of humor without being cartoonish. The deliverables are vectors for animation in Rive.

**Style rules:**
- Two inks per illustration over Paper: Ink plus Marigold (default) or Ink plus Vermilion (Requests only).
- Shapes are built from rounded rectangles and circles with flat cuts, the monogram's geometry. Stroke-free fills. One 2 px Ink line weight for details.
- People appear as hands only, never faces: the photography carries the faces.
- Objects drawn: a short form, a link chip, a speech bubble, a phone, a sheet of paper, a stack of documents, a desk lamp.

**Illustration list:**

| # | Illustration | Where | Description |
|---|---|---|---|
| I1 | "You start it." loop | Section 2, step 1 | Three objects (a short form card, a link chip and a speech bubble) drift in from three directions and meet on a single sheet, which settles. 4 s loop. |
| I2 | "Your client approves it." loop | Section 2, step 2 | A phone in a hand. The proof scrolls by, a thumb taps the one button, and the button fills with a firm-green flash. 4 s loop. |
| I3 | "CoFile files it." loop | Section 2, step 3 | A row of abstract screens (blank form layouts, no government styling) flips past like a flipbook, then a single sheet slides back out toward the viewer. 4 s loop. |
| I4 | Empty desk | Filing desk empty state | A clean desk with a lamp and a single sheet, drawn in the **firm's** main color plus House Ink (re-tinted live from the firm's settings). |
| I5 | Empty stage | 404, error page | A spotlight pool on an empty stage floor. Ink plus Marigold. |
| I6 | Email arriving | "Check your email" page | An envelope with the monogram's bar as its flap line. |
| I7 | Small spot set (12) | Docs guides, setup steps, dashboard empty states | Your firm (a door), Branding (a swatch fan), Payment (a card, never a lock), Registered agents (a building), Signatures (a pen line), Webhooks (two connected dots), and so on. |

### 7.4 3D

**What I'd commission:** a 3D studio that does tactile product and still-life work, with paper and fabric simulation, soft studio lighting and restraint, and that can deliver a real-time scene (glTF) as well as renders.

**The one scene: "Papers home"** (section 7).
- **Objects.** Three sheets of off-white paper (slightly different stocks: one bright, one cream, one with a faint laid texture), each with abstract content: a title bar, grey text lines and a signature line. **No seals, crests or government marks of any kind.** One sheet stands for "The state's documents", one for "The EIN" letter and one for the "one place" record. Also the firm's **record**: a closed card folio in the firm's main color with a white label plate showing the firm's initial tile.
- **The action.** The sheets drift in from the right edge of the viewport, from "the state", with gentle paper physics: a slight curl, air resistance and a small flutter. They settle one at a time onto the folio on a warm Paper-colored surface. First sheet: immediate. Second: 0.6 s later. Third: 1.6 s later. That's "Some states answer at once. Others take their time."
- **Light.** One large soft key from the top left, a Marigold rim light from the right (where the papers come from) and a soft contact shadow.
- **Delivery.** A real-time glTF scene (under 600 KB with Draco-compressed geometry and 1K paper textures) rendered with three.js. The folio color is a uniform, so it takes the visitor's chosen swatch from section 4. There's also a pre-rendered 1600 × 1200 still of the final frame for reduced motion, no-WebGL and email use.

**Optional brand object**, for the launch film end card, social and conference banners: the *Cº* monogram as a physical object, bent Ink-colored steel with a Marigold enamel bar, photographed on Paper. It's a sculptural sign piece, nodding to the signwriter tradition.

### 7.5 Craft commissions

- **A signwriter (gilder)** to gild "Harbor & Pine CPA" on a real glass door in 23-carat gold leaf, with the process filmed for the launch film. Layout: Libre Caslon-derived lettering, traditional centered door layout with "CPA" in small caps beneath.
- **The launch film** (see §8.6) needs a small production company, a director with craft or food documentary experience, and a sound designer.

### 7.6 Texture

- **Paper grain:** one 512 × 512 px seamless noise tile, made by scanning real uncoated poster stock at 1200 dpi and reducing it. Applied at 4% (multiply) on light grounds and 3% (screen) on dark ones. It's one shared asset, under 40 KB as WebP.
- **No other textures.** No halftones, fake ink bleed or torn edges.

### 7.7 Iconography

A custom set of 36 icons on a 24 px grid: 2 px Ink strokes, flat-cut terminals matching the monogram, a 2 px corner radius, and a live area of 20 px. They're used sparingly, only where an icon is faster than a word: message channels, documents, download, external link, copy, link, signature, card, calendar, add, remove, menu and close.

- Message channels: **email** (an envelope), **text** (a speech bubble), **WhatsApp** and **Slack** (both drawn as generic bubbles with a small distinguishing glyph; we never redraw a third party's logo, and the official marks are used only where their guidelines require).
- **Banned icons:** lock, shield, checkmark-in-circle, seal, rosette, key, vault, eye or eye-slash for "privacy", stars and sparkles for "AI".

---

## 8. Motion

### 8.1 The principle: the type performs, the firm takes the bow

In a poster world, motion is kinetic typography: words arriving, breathing, finding their billing. Motion on this site does three jobs:

1. **Billing.** It establishes hierarchy over time: the firm's name and the client's step arrive biggest and last longest.
2. **Ease.** It shows effort disappearing: a text becomes a form, screens fill themselves, papers come home.
3. **Ownership.** It hands color and attention to the firm: the takeover, the re-tint, the record in your color.

Motion never dramatizes stopping, holding, locking or checking. The support sections fade in and that's all.

### 8.2 Tokens

| Token | Value | Use |
|---|---|---|
| `--dur-micro` | 120 ms | Hover color, press |
| `--dur-small` | 200 ms | Chips, toggles, focus |
| `--dur-medium` | 360 ms | Cards, sheets, menus |
| `--dur-large` | 600 ms | Color takeover, section reveals |
| `--dur-scene` | 1200 ms | Kinetic headlines, papers home |
| `--ease-out` | `cubic-bezier(0.16, 1, 0.3, 1)` | Everything that arrives (expo out) |
| `--ease-in-out` | `cubic-bezier(0.65, 0, 0.35, 1)` | Color wipes, house lights |
| `--ease-standard` | `cubic-bezier(0.2, 0, 0, 1)` | UI state changes |
| `--spring-paper` | stiffness 170, damping 22, mass 1 | Papers settling, the proof card settling |
| `--stagger-word` | 40 ms | Kinetic headline words |
| `--stagger-item` | 70 ms | List items, run-sheet lines |

### 8.3 The signature move: the breath

**Kinetic headlines breathe open.** Each word of a poster headline arrives at width 60 (condensed), 20% opacity and +12 px down. It opens to width 100 (or 112 for headliners), full opacity and 0 offset over 700 ms with `--ease-out`, words staggered 40 ms apart. A 10-word headline is complete in about 1.1 s. It's done with the variable font's `font-variation-settings: "wdth"`, animated per word span. Lines don't reflow during the animation, because each word's box is reserved at its final width before it animates. That's the one hard engineering rule.

It plays once per section, on first entry (40% of the section in view). It never replays on scroll-back.

Used on: the Hero h1, the Process h2, "Your name on the door." in Firms, "Rehearse on the real stage.", and the Close. **Not** on the Programme pages.

### 8.4 The moments that move, and why they sell

| # | Moment | Where | What happens | Duration | Why it sells |
|---|---|---|---|---|---|
| M1 | **Opening titles** | Hero, on load | Kicker fades in (200 ms) → h1 breathes open (§8.3) → sub and CTAs fade up (360 ms, 120 ms after the h1) → the proof card rises 48 px with a 6° rotateX settling to 2° (`--spring-paper`) into its Marigold pool of light, which blooms from 0 to 100% opacity over 900 ms → a Marigold Wash highlighter sweeps left to right across "TWO SISTERS BAKERY LLC" then "88 Grove St, Jersey City NJ 07302" (each 450 ms, 150 ms apart). | 2.2 s total | The client's business name is literally highlighted, the way you'd mark a proof. The first thing that moves after the headline is the client's own details. |
| M2 | **Proof tilt** | Hero, on pointer move (desktop) | The proof card tilts up to ±3° toward the cursor with `--spring-paper`, and its shadow shifts the other way. | Continuous | It feels like a real sheet in your hand. |
| M3 | **The billing block** | Process h2 | The three sentences of the h2 breathe in in sequence, each at its own billing size: "You start it." (display-l), "Your client approves it." (display-xxl), "CoFile files it." (title size). The client's line lands last and holds the eye. | 1.4 s | "Your client is in charge of the middle one", shown in type. |
| M4 | **Step loops** | Process, steps 1 to 3 | Illustrations I1 to I3 loop (4 s each) while in view, offset by 1.3 s so they play like a round. They pause when out of view. | 4 s loops | Three steps, each effortless. |
| M5 | **Annotated proof** | The proof section | On desktop, as the reader scrolls, each of the six list items lights up in turn (Ink text from 40% to 100%, a Vermilion number disc pops in at 0.8 → 1 scale) and a thin Vermilion leader line draws (300 ms) from the item to its part of the life-size proof, which gets a 12% firm-tint wash. On phones the proof sits in a phone frame and scrolls itself (scroll-linked) while each list item takes its turn as the caption beneath. | Scroll-linked | Shows every detail, fee and statement on one page, and that there's only one button. |
| M6 | **The takeover** | Firms section, on entry | The Paper ground is wiped by the firm's color in a 600 ms `--ease-in-out` vertical wipe from the bottom edge up, like a curtain rising. "Your name on the door." breathes open in white at display-xxl. Then "Ours in small print." *types* in at its small size: characters appear 18 ms apart, in white at 82% opacity. | 1.6 s | The headline enacts itself. The site gives its stage to the firm. |
| M7 | **Try your color** | Firms section, on swatch tap | A circle of the new color expands from the tapped swatch to cover the section (600 ms, `--ease-in-out`, clip-path circle). Every mockup in the spread (desk header, form, proof and email) re-tints in the same frame. Contrast-adjusted button shades come along automatically. The choice is kept for this visit (sessionStorage) and carried down the page to the drafted filing's marquee rule in Requests and the record folio in After. | 600 ms | "Your filing desk carries your firm's name, logo and color." The visitor sees their own color on it. |
| M8 | **Text to filing** | Requests | Explained in full in §9.5. Ana's words get Vermilion underlines one by one, lift as copies and fly along a gentle arc into a drafted filing card, landing in their rows. | 3.2 s | "Clients don't fill in forms. They text you." made visible. The most kinetic moment on the site. |
| M9 | **Papers home** | After | The 3D scene (§7.4): three sheets arrive at three speeds and settle on the firm's record. | 2.4 s | "The papers come back to you." It's a payoff you can feel. |
| M10 | **House lights down** | Entering Rehearsals | Scroll-linked over 480 px of travel, the page ground interpolates from Poster Paper to Stage Aubergine, text from Ink to Paper, and the grain from multiply to screen. At the end, a Marigold spotlight pool fades up (800 ms) on the run sheet. Scrolling back up raises the lights again. | Scroll-linked + 800 ms | The theatre moment. "Rehearse on the real stage." |
| M11 | **The run sheet** | Rehearsals | The log lines arrive one by one like cues being called (70 ms stagger, each line slides 8 px left to place, 280 ms). While they arrive, the filmstrip of 13 abstract screens fills in one frame at a time. The last line, "held, on purpose", arrives exactly like the others, in Marigold text. There's no special stop effect. | 1.5 s | The whole filing, performed. |
| M12 | **Stage meter fill** | Coverage table | Each row's stage meter fills its segments left to right (200 ms per segment, rows staggered 30 ms) when the table enters view. "Live" rows end with a single Marigold glow on the last segment (300 ms). | ≈ 1 s | Progress toward live, at a glance. |
| M13 | **The final billing** | Close | "Run one rehearsal. Then decide." breathes open at display-xxl on Marigold. The tagline "Approve the proof. Then it's filed." slides in beneath as a credit line, with the monogram's bar drawing under it (400 ms). | 1.4 s | The bookend. Ends on the ask. |
| M14 | **Ticket press** | Every "Run a free rehearsal" button | On hover, the ticket lifts 2 px and its shadow deepens (120 ms). On press, it settles 1 px and a dashed perforation line (1 px Ink at 30%) flashes across its right fifth for 200 ms, like a ticket being torn. | 120–200 ms | A tiny reward on the main action. |

### 8.5 Motion in the product (firm pages and the proof)

The firm's pages move very little. They're the firm's house, and the client is doing something important.

- **The proof:** no entrance theatrics. A 2 px reading-progress line in the firm's main color runs along the bottom edge of the header as the client scrolls.
- **After "Approve…":** the "Approval recorded" page draws a 3 px firm-color underline under the business name (500 ms, `--ease-out`). Nothing else moves. No confetti, ticks or stamps.
- **Filing detail:** the status journey's current step pulses its ring once on page load (600 ms), then stays still. Documents arriving later slide into the Documents card (360 ms) if the page is open.
- **Branding setup:** color changes re-tint the live preview with the same circular wipe as M7 (400 ms). The two are deliberately the same motion: the site promised it, and the product does it.
- **Forms:** sections expand and collapse in 260 ms; "Same as" fills fields with a 200 ms tint flash (12% firm tint fading to 0).

### 8.6 The launch film: "Name on the Door" (60 s, plus 30 s and 15 s cuts)

A short documentary-style film for launch, the conference circuit and the top of the Firms section (as an optional "watch" link, `[copy needed]`). It uses only lines that are already in the copy, as title cards in the billing-block style.

| # | Shot | Sound |
|---|---|---|
| 1 | Pre-dawn. A signwriter's hands lay gold leaf on a glass door. Close on the brush. | Room tone, the soft tap of a gilder's tip. |
| 2 | The bakery at 5 am. Ana Ortiz, flour on her hands, types on her phone. | Oven fans, a radio low. |
| 3 | Over Ana's shoulder: her text reads "Need an LLC for the bakery. It's me and my sister, 50/50, in Jersey City." | A send whoosh, designed (not a platform sound). |
| 4 | Harbor & Pine's office. The owner reads the drafted filing on her laptop and nods. | Office ambience. |
| 5 | Title card on Marigold: "You start it. Your client approves it. CoFile files it." The breath animation, billing sizes. | A single warm synth chord. |
| 6 | Ana between batches, phone propped against the flour bin, scrolls her proof: Harbor & Pine's logo at the top, "Two Sisters Bakery LLC" big. Her thumb taps the button. | Quiet. |
| 7 | Abstract, stylized screens fill themselves in (motion graphics, no government styling). | Typewriter-like ticks, designed and musical. |
| 8 | At the firm, three sheets slide onto the owner's desk at three different moments. | Paper sounds. |
| 9 | The gilder steps back from the finished door: "Harbor & Pine CPA" in gold. Low in the corner glass, tiny and grey, "with CoFile". | The chord resolves. |
| 10 | End card on Ink: the *Cº* monogram with a Marigold bar. "Approve the proof. Then it's filed." Then "Run a free rehearsal" and cofile.app. | Silence, then one soft note. |

Captions are burned in on social cuts and supplied as WebVTT for the site. There's an audio-described version too. Spanish subtitles are needed when the Spanish site ships.

### 8.7 Reduced motion and performance

- With `prefers-reduced-motion: reduce`, every scroll-linked and kinetic effect is replaced by its **final frame**, revealed with a 150 ms opacity fade. There's no width animation, no flying words (the drafted card simply shows its filled rows) and no 3D (the still render is used). House lights still change, as a 200 ms crossfade when the section's top crosses mid-viewport, because it's meaningful, not decorative.
- Only `transform`, `opacity`, `clip-path` and `font-variation-settings` are animated. Animations run under IntersectionObserver and pause off-screen.
- The 3D scene loads only after the page is interactive, and only when section 7 is within two viewports. If the device can't sustain 50 fps for the first 30 frames, it falls back to the still.
- Rive files: under 120 KB each. Total motion payload for the home page: under 900 KB, lazy-loaded below the hero. The hero's motion is pure CSS plus a small script, so it costs nothing in Largest Contentful Paint.

