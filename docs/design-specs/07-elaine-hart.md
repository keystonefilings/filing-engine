# CoFile, visual design spec: "Nameplate"

**Elaine Hart** · editorial art director · New York · spec 07 of 10 · Nov 26, 2026

The copy, the tone and the selling brand are locked. This spec covers what the site looks like.
Every line of copy quoted here comes from `web/app/page.tsx` or from the product surfaces themselves.
When a design needs a word that doesn't exist yet (a caption, an alt text, a photo credit), I mark it
`[copy needed]`. I don't write it myself.

---

## 1. Who I am, and what I bring

I spent twenty-five years putting names at the top of pages. The first eleven were at a financial
daily, where I came up through the graphics desk and ended up running the front page. The fourteen
after that were at a business monthly, where I art directed the covers, the photo desk and the
redesigns. I've sent photographers out at four in the morning to catch a baker at the oven, and I've
argued with an editor for an hour over whether a headline gets one line or two.

What I know that matters here:

- **How accountants read.** They read the numbers first, the headline second, and the body only if
  you've earned it. They trust a table that's set properly: aligned decimals, figures that line up,
  a double rule under the total. Get a table wrong and they stop believing the page. Get it right
  and they relax.
- **How business owners read.** On a phone, standing up, between two other things. They look at
  one big thing, then one button. If the first screen doesn't tell them what to do, they never see
  the second.
- **Front-page confidence.** A front page doesn't hedge. It has one headline that's bigger than
  anything else, one picture that earns its space, and a clear order: read this, then this, then
  this. Most software sites are shy. This one shouldn't be.
- **Photojournalism and graphics.** Real people photographed doing real things, and graphics that
  explain how something works without a paragraph. I'll commission both.
- **A publication's discipline.** A newspaper is one system that has to look right every day on
  every page, whoever fills it. CoFile has the same problem: thousands of firms will pour their own
  logos, colors and fonts into its pages. The system has to make every one of them look good.

---

## 2. The visual concept: Nameplate

**The idea in one line: every page a client sees is a front page published by the firm. The firm
owns the nameplate. CoFile is the imprint at the foot.**

On a newspaper, the *nameplate* is the paper's name across the top of the front page. It's the one
thing that never changes, the thing a reader spots from across a newsstand. The *imprint* is the line
of small print at the bottom of the back page that says who printed it. The first is the publisher's
pride. The second is the printer's quiet signature.

A *nameplate* is also the plate on an office door: the firm's name in gold leaf on the glass.

The copy says it in nine words: **"Your name on the door. Ours in small print."** Both meanings of
"nameplate" deliver that line, and I've built the whole site around it:

| The copy's selling story | How Nameplate shows it |
|---|---|
| **Your firm, your client, your name.** | Every client-facing page opens with the firm's nameplate: its logo or name, set properly, over a rule in its own color. CoFile appears once, in small print. On the home page the firm's name is literally lettered in gold leaf on an office door, and the visitor can put their own name there. |
| **Effortless for everyone.** | The graphics desk explains the work the way a good newspaper explains a budget: three steps, numbered, one picture each. Ana's text message is drawn being read straight into a filing. The photographs show the client doing her part with one thumb, at 5:40 in the morning, flour on her wrist. |
| **A client experience to be proud of.** | The proof is designed as the client's own front page: her accountant's nameplate on top, *her business's name* as the banner headline. Every small-business owner remembers the first time they saw their name in print. The fees are set like a real statement, double rule under the total. |
| **The papers come back.** | Newsrooms have always said a correspondent *files* a story. CoFile files the filing, and when it's done the record closes with an end mark, the little square a magazine puts after the last word of a finished article. The photography shows the hand-over: the accountant sliding the folder across the café table. |
| **Try it free, for real.** | The rehearsal is shown as a photographer's contact sheet: every frame of the state's real website shot, in order, and nothing published. You can look at every frame before you decide. |

### What Nameplate is not

This is not newspaper pastiche, and I'll fire anyone who brings me pastiche. No blackletter, no
yellowed newsprint texture, no halftone dots, no "EXTRA!", no torn edges, no typewriter clacking. The
reference is the confidence of a contemporary business magazine after a great redesign: very large
serif headlines, real white space, precise rules, color photographs of real people, honest data
graphics and one spot color spent carefully. It should feel like the best-made publication on the
desk, not like a costume of an old one.

And it's not built around safety. Security, the checks and "the catch" are designed as sidebars:
easy to find, well set, quieter in scale. The big moments (the hero, the door, the proof, the close)
are about the firm, the client and how easy it is.

### The three registers

1. **CoFile's own voice** (home page, sign-up, docs, dashboard, account emails): CoFile's wordmark,
   Press Black type on Coated White, Gold Leaf spent on the call to action and the end mark.
2. **The firm's pages** (filing desk, service pages, intake form, proof, client emails): the firm's
   nameplate leads; the firm's color takes Gold Leaf's place; CoFile shrinks to the imprint.
3. **White label** (enterprise-hosted pages, the embed): the tenant's nameplate only; CoFile is
   absent, or a single "Filed with CoFile" line in the embed.

The same grid, type, tables and components run through all three. What changes is whose name is on
top.

---

## 3. Identity

### 3.1 The CoFile wordmark

"CoFile", set as custom lettering, followed by the **end mark**. Commission it from a lettering
artist or type designer who works on newspaper mastheads. They draw it from scratch, using the Bold
weight of our headline serif (Publico Headline, section 5) as the reference for contrast and
proportion, so the wordmark sits naturally with the headlines without being "just the font".

Drawing spec, on a 100-unit cap height:

| Element | Spec |
|---|---|
| **C** | Cap height 100, overshoot 2. Bracketed serifs, vertical stress, terminals cut flat at about 8° (not ball terminals). Aperture a little more open than the reference font so it holds up at 16px. |
| **o** | x-height 68, overshoot 1.5. Same stress as the C. Pulled in under the C's upper terminal: C→o fit is −4 units. |
| **F** | Cap height 100. Middle arm 52% the length of the top arm and set slightly above the optical center (at 54 units), so the F reads as a sturdy upright, not a flag. o→F fit 0. |
| **i** | Stem width = the reference stem (about 16 units). **The tittle is a square** with side equal to the stem width, its base 14 units above the x-height. It's the only square letter detail, and it echoes the end mark. F→i fit −2 units. The F's top arm must not touch the tittle: leave at least 6 units of air. |
| **l** | Ascender 104 (a hair above cap height, as in the reference). i→l fit +2. |
| **e** | x-height 68. Horizontal bar at 60% of x-height. Terminal cut flat, matching the C. l→e fit 0. |
| **End mark** | A solid square, side 54 units (about 80% of x-height), sitting on the baseline, 18 units after the e. In **Gold Leaf** on the full-color wordmark. |

Colors: Press Black letters with a Gold Leaf end mark (default). On Press Black: Coated White letters
with a Gold Leaf end mark. Single color (fax, stamp, embossing, one-color print): everything in one
ink, end mark included.

Clear space: one x-height (the height of the "o") on every side. Minimum size: 80px wide on screen,
20mm in print. Below 80px, use the imprint (3.3).

Don'ts: never outline it, never put it on a photograph without a solid plate behind it, never tilt it,
never set the end mark in any color but Gold Leaf or the single ink, never animate the letters (only
the end mark gets a moment, at the close of the home page).

### 3.2 The end mark (the mark)

The end mark is CoFile's mark. In magazines it's the small square printed after the last word of an
article, the publication's signature at the moment the story is finished. "Ours in small print."
It's also exactly what CoFile does: the work is finished and the papers are back.

- **Shape:** a perfect square, sharp corners, no radius. It's deliberately plain. What makes it
  ours is where it sits and its color: on the baseline after a word, in Gold Leaf.
- **Where it appears:** after the wordmark; after the last line of the home page ("Approve the proof.
  Then it's filed."); in the imprint; as the closing mark on a completed filing record and at the
  end of long-form pages (Terms, Privacy, each docs guide). Never as a bullet or a decoration, and
  never more than once per screen.
- **Favicon and app icon:** a Press Black tile; the wordmark's **C** in Coated White, centered
  optically (shifted 4% left); a Gold Leaf end mark on the C's baseline, to the right of the C's
  lower terminal. Pixel-hinted masters for 16, 32, 48 and 180px. At 16px: the C is 10px tall, and
  the end mark is 4×4px, sitting on the C's baseline with a 1px gap. App icons follow the platforms'
  corner masks; our master is square.
- **Social card / Open Graph:** Coated White ground, the home page headline set in the Banner style,
  the wordmark at the bottom left.

### 3.3 The "with CoFile" imprint

The imprint is the only sign of CoFile on a firm's pages. It's small, gray and sits after the
firm's name. It's never decorated.

```
with CoFile■
```

- Set in National 2 (section 5): "with" in Regular Italic, "CoFile" in Medium, 13px on screen (never
  smaller than 12px, never larger than 14px on a firm's page), tracking +1%.
- Caption Gray (`#555A61`) on light, `#A6A39C` on dark. The end mark after it is the same gray, at
  0.5em, on the baseline. **On a firm's pages the imprint is never gold and never takes the firm's
  color.** Gold is CoFile's color on CoFile's pages only.
- It links to cofile.app in a new tab and has a visible focus ring.
- Placement: right-aligned directly under the firm's nameplate rule (one line), and again at the very
  foot of the page in the legal line. On the embed widget it's the single line "Filed with CoFile",
  set the same way.
- Never above or beside the firm's logo at the same size, never in a box, never with the full
  wordmark.

### 3.4 The firm's nameplate

This is the most important piece of identity in the system, because it's someone else's brand. It
has to make a cheap logo look considered and a good logo look great.

**Anatomy (client-facing pages: proof, intake, service pages, client emails):**

```
                 ┌──────────────────────────┐
                 │   [ firm logo, centered ] │      28px above, 16px below
                 └──────────────────────────┘
══════════════════════════════════════════════════   3px rule, firm color
──────────────────────────────────────────────────   1px rule, firm color, 3px below the first
                                       with CoFile■   imprint, right-aligned, 8px below
```

Centered on client pages, because a proof is a single-column document and a centered nameplate
reads as "the front of something". Left-aligned on the filing desk, which is an app and needs the
nameplate to sit with the navigation.

**Logo sizing: by area, not by height.** This is a trick from the advertising pages, where sponsor
logos of every shape have to look equally important. A wide logo set to the same height as a square
one looks huge; set to the same width, a square logo looks tiny. So we size by area:

- Trim transparent or uniform-white margins automatically. Measure the aspect ratio *r* (width ÷ height).
- Target area *A*: 7,200px² on desktop client pages, 5,000px² on phone, 4,000px² in the filing desk
  header, 6,000px² in emails.
- Height = √(A ÷ r), clamped between 28px and 64px; width capped at 280px (desktop), 220px (phone).
- Examples at 7,200px²: a square logo → 64px tall (capped); a 3:1 logo → 49 × 147px; a 6:1 logo →
  35 × 208px.

**Logo on its background:**

- Dark or colored logos sit on paper (white or Coated White).
- If the logo is mostly white or very light (average luminance of its opaque pixels above 0.8), it
  goes on a **nameplate band**: a full-width panel in the firm's color, 112px tall on desktop and
  88px on phone, with the logo centered. The rules are dropped; the imprint sits below the band.
- A JPEG logo on a white box: we detect the uniform edge and remove it, and show the firm the result
  in setup with a toggle to keep the original.
- In dark mode, a dark logo sits on a **logo plate**: a Coated White rounded rectangle (6px radius,
  12px padding) so it never disappears into the dark.

**No logo? We set the name.** The firm's name is typeset as a nameplate: in the firm's chosen font if
it has one, otherwise in Publico Headline Semibold, 32px desktop / 26px phone, tracking −0.5%. In our
face, an ampersand is automatically swapped for Publico Headline's italic ampersand, the oldest trick
in the masthead book: "Harbor *&* Pine CPA". (We don't do this in a firm's own font, because we don't
know its italic.)

**The firm's font** is used for the nameplate (when there's no logo) and for the H1 and H2 headings on
the firm's pages. Never for body text, fields, values, tables or buttons: we can't vouch for a
font's small sizes, and the client has to read the proof. To keep layouts stable, the firm font is
scaled to match Publico Headline's x-height (`font-size-adjust: from-font`, with a measured fallback
ratio), and if it fails to load, the headings fall back to Publico Headline, never to Times.

### 3.5 The firm's color

A firm gives us a **Main color** and an optional **Second color** (the setup fields). We derive a
small, safe set of tokens from them so any color looks good and stays readable:

| Token | Derived how | Used for |
|---|---|---|
| `--firm` | The main color as given. | The nameplate rules and the nameplate band, where it's decorative. |
| `--firm-ink` | In OKLCH, keep hue and chroma and lower the lightness in 0.02 steps until white text on it reaches 4.5:1 *and* it reaches 4.5:1 on Coated White. If the color is already dark enough, it's the color itself. | Primary buttons (white text), links, focus rings, the selected tab, numerals in the intake form. Also replaces `--firm` in the rules when the main color is very light (lightness above 0.85). |
| `--firm-wash` | Same hue, lightness 0.96, chroma at a quarter of the original (max 0.03). | Hovered and selected table rows, the selected choice in a radio group. Never a page background. |
| `--firm-ink-dark` | For dark mode: raise lightness until it reaches 4.5:1 on Night Paper. | Links, rules and focus in dark mode. Buttons in dark mode use `--firm-ink-dark` with Press Black text when that passes 4.5:1, otherwise `--firm-ink` with white text and a 1px lighter border. |
| `--firm-2` | The second color, *only* if it reaches 3:1 on Coated White. | One accent: the selected state of choice chips and the active step number in setup. If it fails, we quietly ignore it. I'd rather drop a firm's second color than let it hurt their page. |

Worked examples (all contrast figures are measured):

| Firm color | `--firm-ink` | White text on it |
|---|---|---|
| Harbor & Pine CPA, the example firm: harbor blue `#1D4E63` | `#1D4E63` (unchanged) | 9.0:1 |
| A navy `#1F3A5F` | unchanged | 11.5:1 |
| A forest green `#2F5D46` | unchanged | 7.6:1 |
| A burgundy `#7A2232` | unchanged | 10.0:1 |
| A bright yellow `#F2C200` | `#8A6D00` | 4.9:1. The rules stay bright yellow; the buttons use the deepened yellow. |

**Never** does a firm color fill a page background, color body text, or tint a photograph.

---
