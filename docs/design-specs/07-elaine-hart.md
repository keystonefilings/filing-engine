# CoFile, visual design spec: "Nameplate"

**Elaine Hart** · editorial art director · New York · spec 07 of 10 · Nov 26, 2026

Written against brief version 3 and the round 3 copy (the nine-section home page, public prices,
the seven pages behind the home page, and the firm approving the proof).

The copy, the tone and the selling brand are locked. This spec covers what the site looks like.
Every line of copy quoted here comes from `web/app/page.tsx`, the seven pages behind it, the sample
data in the example pictures (`web/components/landing/Visuals.tsx`) or the product surfaces
themselves. When a design needs a word that doesn't exist yet (a caption, an alt text, a photo
credit, a person's name), I mark it `[copy needed]`. I don't write it myself.

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
- **The press check.** I've stood beside a press at two in the morning with a proof in my hand, and
  nothing ran until I initialed it. Firm owners know that feeling from their own work: nothing goes
  to the IRS until they've signed off. The proof should feel like that moment, the editor's moment,
  not like a form.
- **Front-page confidence.** A front page doesn't hedge. It has one headline that's bigger than
  anything else, one picture that earns its space, and a clear order: read this, then this, then
  this. Most software sites are shy. This one shouldn't be.
- **Photojournalism and graphics.** Real people photographed doing real things, and graphics that
  explain how something works without a paragraph. I'll commission both. The home page copy was cut
  to about 330 words so the pictures carry the page. That's how a good front page has always
  worked: the headline sells, the picture proves, the caption closes.
- **A publication's discipline.** A newspaper is one system that has to look right every day on
  every page, whoever fills it. CoFile has the same problem: thousands of firms will pour their own
  logos, colors and fonts into its pages. The system has to make every one of them look good.

---

## 2. The visual concept: Nameplate

**The idea in one line: every page is a front page, and the firm owns the nameplate. CoFile is the
small type at the foot.**

On a newspaper, the *nameplate* is the paper's name across the top of the front page. It's the one
thing that never changes, the thing a reader spots from across a newsstand. The *imprint* is the line
of small type at the bottom of the back page that says who printed it. The first is the publisher's
pride. The second is the printer's quiet signature.

A *nameplate* is also the plate on an office door: the firm's name in gold leaf on the glass.

The copy says it in nine words: **"Your name on the door. Ours in small type."** And the hero says
it again: **"Say yes, under your own name."** Both meanings of "nameplate" deliver those lines, and
I've built the whole site around them. The firm is the publisher and the editor. Its client is the
story. CoFile is the press and the small type.

| The copy's selling story | How Nameplate shows it |
|---|---|
| **Say yes, under your own name.** | The hero picture is a firm owner on the phone with a client, saying yes, with her firm's name in gold leaf on the door glass behind her, and her filing desk in front of her under her own nameplate. The visitor can click the example firm's name on the desk and type their own. From then on the page is about *their* firm. |
| **Your brand on everything.** | Every page a client sees opens with the firm's nameplate: its logo or name, set properly, over a rule in its own color. The Firms picture is two office doors in one corridor, two firms' names in gold leaf, and the same client page under each firm's brand. A printer's loupe hunts for CoFile and finds it in the small type. |
| **Nobody retypes anything.** | The graphics desk draws Ana's text being lifted, phrase by phrase, into the drafted filing, with the firm's saved answers already sitting in their rows. The photograph shows how little it took: one thumb, 5:40 in the morning, flour on her wrist. |
| **You stay in charge.** | The proof is designed as a page proof on the editor's desk, and the firm is the editor. In print, nothing runs until the editor passes the proof for press. The client's business name is the headline; the fees are set like a statement, with a double rule under the total; one button, in the firm's own color. |
| **It's done, and the papers come back.** | Newsrooms have always said a correspondent *files* a story. "Then it's filed": the record closes with an end mark, the little square a magazine puts after the last word of a finished article. The photograph shows the hand-over: the accountant sliding the folder across the café table to the two sisters. |
| **The filings your clients already ask for.** | New York, New Jersey, Florida and the IRS set like the markets panel on a financial front page: four columns, everything in them readable at a glance. |
| **Try it free.** | A rehearsal is shown as a photographer's contact sheet: every frame of the state's real website shot, in order, and nothing published. |
| **Simple prices.** | Set like a printer's rate card. The figures are the biggest thing in the section, lined up the way accountants line up figures. |
| **People behind it.** | "Built and run by filing professionals" gets what a newspaper gives a columnist: a real photograph next to the byline. The people who take over a filing are photographed at work, not illustrated. |

### What Nameplate is not

This is not newspaper pastiche, and I'll fire anyone who brings me pastiche. No blackletter, no
yellowed newsprint texture, no halftone dots, no "EXTRA!", no torn edges, no typewriter clacking. The
reference is the confidence of a contemporary business magazine after a great redesign: very large
serif headlines, real white space, precise rules, color photographs of real people, honest data
graphics and one spot color spent carefully. It should feel like the best-made publication on the
desk, not like a costume of an old one.

And it's not built around safety. Security is one quiet line and a link on the home page, and its
own page is a plain, well-set reading page. The checks on How it works are a sidebar. The big
moments (the hero, the doors, the proof, the papers, the close) are about the firm, its clients and
how easy it is. There is no lock, shield, vault or seal anywhere in this system.

### The three registers

1. **CoFile's own voice** (home page and the seven pages behind it, sign-up, docs, the platform
   dashboard, account emails): CoFile's wordmark, Press Black type on Coated White, Gold Leaf spent
   on the call to action and the end mark.
2. **The firm's pages** (the filing desk, the proof the firm approves, the page for each filing it
   offers, client link pages, the intake form, emails about its filings): the firm's nameplate leads;
   the firm's color takes Gold Leaf's place; CoFile shrinks to the small type.
3. **White label** (platform-hosted pages, the embed widget): the platform's nameplate only; CoFile
   is absent, or a single "Filed with CoFile" line in the embed.

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
the end mark gets a moment, in the After picture on the home page, when the record is filed).

### 3.2 The end mark (the mark)

The end mark is CoFile's mark. In magazines it's the small square printed after the last word of an
article, the publication's signature at the moment the story is finished: ours, in small type.
It's also exactly what CoFile does. "Then it's filed, and the papers come back to you."

- **Shape:** a perfect square, sharp corners, no radius. It's deliberately plain. What makes it
  ours is where it sits and its color: on the baseline after a word, in Gold Leaf.
- **Where it appears:** after the wordmark; in the imprint; on the home page's After picture, where
  it lands after "Filed" on the record's timeline; as the closing mark on every completed filing
  record on the filing desk (in Press Black there, since a firm's pages never carry our gold); and
  at the end of long-form pages (Terms, Privacy, each docs guide).
  Never as a bullet or a decoration, and never more than once per screen.
- **Favicon and app icon:** a Press Black tile; the wordmark's **C** in Coated White, centered
  optically (shifted 4% left); a Gold Leaf end mark on the C's baseline, to the right of the C's
  lower terminal. Pixel-hinted masters for 16, 32, 48 and 180px. At 16px: the C is 10px tall, and
  the end mark is 4×4px, sitting on the C's baseline with a 1px gap. App icons follow the platforms'
  corner masks; our master is square.
- **Social card / Open Graph:** Coated White ground, the home page headline set in the Banner style,
  the wordmark at the bottom left.

### 3.3 The "with CoFile" imprint: ours in small type

The imprint is the only sign of CoFile on a firm's pages, and it's the promise of the Firms
headline made literal: "Ours in small type." It's small, gray and sits after the firm's name. It's
never decorated. (For firms puts it the same way: "The only sign of us is a small “with CoFile”.")

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

**Anatomy (the pages a client sees: the page for each filing a firm offers, client link pages, the
intake form, emails to the client; and the proof the firm approves, which carries the same
nameplate so the firm sees its brand exactly as its client does):**

```
                 ┌──────────────────────────┐
                 │   [ firm logo, centered ] │      28px above, 16px below
                 └──────────────────────────┘
══════════════════════════════════════════════════   3px rule, firm color
──────────────────────────────────────────────────   1px rule, firm color, 3px below the first
                                       with CoFile■   imprint, right-aligned, 8px below
```

Centered on client pages and the proof, because they're single-column documents and a centered
nameplate reads as "the front of something". Left-aligned on the filing desk, which is an app and
needs the nameplate to sit with the navigation.

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
it has one, otherwise in Publico Headline Medium, 32px desktop / 26px phone, tracking −0.5%. In our
face, an ampersand is automatically swapped for Publico Headline's italic ampersand, the oldest trick
in the masthead book: "Harbor *&* Pine CPA". (We don't do this in a firm's own font, because we don't
know its italic.)

**The firm's font** is used for the nameplate (when there's no logo) and for the H1 and H2 headings on
the firm's pages. Never for body text, fields, values, tables or buttons: we can't vouch for a
font's small sizes, the client has to read the form, and the firm has to read every value on the
proof. To keep layouts stable, the firm font is scaled to match Publico Headline's x-height (`font-size-adjust: from-font`, with a measured fallback
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
| Harbor & Pine CPA, the first example firm: harbor blue `#1D4E63` | `#1D4E63` (unchanged) | 9.0:1 |
| Northgate Payroll, the second example firm: brick `#9A3B26` | `#9A3B26` (unchanged) | 6.9:1 |
| A navy `#1F3A5F` | unchanged | 11.5:1 |
| A forest green `#2F5D46` | unchanged | 7.6:1 |
| A burgundy `#7A2232` | unchanged | 10.0:1 |
| A bright yellow `#F2C200` | `#8A6D00` | 4.9:1. The rules stay bright yellow; the buttons use the deepened yellow. |

**Never** does a firm color fill a page background, color body text, or tint a photograph.

---

## 4. Color

A newspaper's color is ink on paper plus one spot color, and the spot color is spent like money.
CoFile gets the same: Press Black on Coated White, and Gold Leaf. Gold because it's the color of
the name on the door: the gilt lettering that a proud practice has painted on its glass, and that a
new bakery has painted on its window. It says "established". It's never the color of a warning.

### 4.1 CoFile's palette, light

| Name | Hex | Role | Measured contrast |
|---|---|---|---|
| **Coated White** | `#FBFAF6` | The page. A bright, very slightly warm white, like good coated magazine stock. Not cream, not manila. | — |
| **Press Black** | `#16181C` | Type, rules, the dark band on For platforms, the footer wordmark. | 17.0:1 on Coated White |
| **Gold Leaf** | `#CF9F3A` | The spot color: the primary button fill, the end mark, the one highlight in each graphic (leader lines, the loupe's ring, the current month). | Press Black text on it: 7.3:1. Never used as text on paper (2.3:1). |
| **Burnished Gold** | `#7A5714` | Gold you can read: the 1px border on gold buttons (6.3:1 against the page, so the button edge is clear), gold text in chips and captions inside graphics. | 6.3:1 on Coated White, 5.5:1 on Newsprint |
| **Newsprint** | `#EFEBE2` | Quiet bands (the security line, the How it works checks sidebar), inline code, and the "desk" ground that pictures of pages sit on. | Press Black on it: 14.9:1 |
| **Caption Gray** | `#555A61` | Captions, secondary text, the imprint, example labels. | 6.7:1 on Coated White, 5.8:1 on Newsprint |
| Hairline | `#D8D3C8` | Rules and dividers. Decorative only: nothing depends on seeing it. | — |
| Field Line | `#857F73` | Borders of fields, checkboxes, outline buttons. | 3.8:1 on Coated White |
| Sheet White | `#FFFFFF` | The paper of a page shown *inside* a picture (the desk, the proof, the client page), one step whiter than the site's page, so a picture of a page reads as an object lying on the page. | — |

**Semantic colors.** These are system meanings, not brand, so they also appear on firms' pages.

| Meaning | Text / mark | Wash | Measured |
|---|---|---|---|
| **Done** (Live, Filed, Approved, Accepted by the state, Completed) | Live Green `#1B7349` | `#E2F0E8` | 5.6:1 on Coated White; 5.0:1 on its wash |
| **Waiting on a person** (Proof ready to approve, Waiting for approval, Needs information, Ready to pay) | Burnished Gold `#7A5714` | Amber wash `#F6EBD3` | 5.5:1 on its wash |
| **Under way** (Received, Queued, Filing now, Submitted, Submitted to the state) | Press Black | none, 1.5px outline | 17:1 |
| **Stopped or rejected** (Rejected by the state, Failed, Stopped, Paused: state site changed) | Correction Red `#B3261E` | `#F8E4E1` | 6.3:1 on Coated White; 5.4:1 on its wash |

Every status also has its own shape (section 11), so nobody has to tell green from gold.

### 4.2 Dark

Dark mode is a night edition, not an inverted page.

| Name | Hex | Role | Measured contrast |
|---|---|---|---|
| Night Paper | `#101214` | The page | — |
| Night Surface | `#1A1D21` | Cards, the header when scrolled, fields | — |
| Night Ink | `#EFEAE0` | Type | 15.7:1 on Night Paper, 14.1:1 on Night Surface |
| Night Caption | `#A6A39C` | Secondary text, imprint | 7.5:1 on Night Paper, 6.7:1 on Night Surface |
| Night Hairline | `#2E3238` | Rules | decorative |
| Night Field Line | `#6B6F76` | Field borders | 3.4:1 on Night Surface |
| Night Gold | `#D9A845` | Buttons (Press Black text, 8.2:1), end mark, graphic highlights | 8.6:1 on Night Paper |
| Live, dark | `#5CC98F` | Done | 9.1:1 |
| Amber, dark | `#E7C27A` on `#2A2416` | Waiting on a person | 9.1:1 |
| Error, dark | `#FF8A7A` | Stopped | 8.2:1 |

Pictures of pages (the desk, the proof, the client pages, the record) **stay light in dark mode**:
they're pictures of paper documents, and they're what the firm's pages look like for most of its
clients. Their Sheet White is dimmed to `#F2EFE8` so they don't glare, and they sit on Night Paper
with no shadow. Photographs are never inverted, tinted or darkened for dark mode.

### 4.3 How color is used

- **Proportions on CoFile's own pages:** about 80% Coated White and Press Black type, 12% Newsprint
  and photographs, 5% Press Black bands, and no more than 3% Gold Leaf.
- **Gold Leaf is spent three ways only:** the primary button ("Run a free rehearsal"), the end
  mark, and one highlight in each graphic. Never two gold buttons on one screen: while the hero's
  gold button is in view, the header's "Run a free rehearsal" is drawn as a Press Black outline
  button, and it turns gold (200ms crossfade) once the hero has scrolled away.
- **Links** are Press Black, underlined 1px with the underline in Caption Gray, offset 3px; on
  hover the underline thickens to 2px and turns Press Black. No colored links on CoFile's pages; on
  firms' pages links are `--firm-ink`.
- **On a firm's pages there is no Gold Leaf at all.** The firm's color takes its place (3.5). Gold
  appears only in the semantic amber of a "waiting on a person" chip, which is a meaning, not a
  brand.
- **In photographs**, the gold is real: gold leaf on glass, oven light, late sun. I'll brief the
  photographer to let warm practical light into every frame, so the site's one spot color seems to
  come out of the pictures rather than being painted on.
- **The two example firms** have their own colors and never borrow ours: Harbor & Pine CPA in
  harbor blue `#1D4E63`, Northgate Payroll in brick `#9A3B26`. Next to each other they prove the
  point of the Firms section on sight.
- **Data:** Live Green for live, Gold Leaf for rehearsed to the payment screen, Press Black outline
  for screens recorded or offered. Shape always doubles color.
- **Never:** gradients, glows, color photographs tinted to brand, colored section backgrounds
  other than Newsprint and the one Press Black band, red anywhere except an error.

---

## 5. Typography

Headlines in a newspaper serif with real contrast and weight, because a headline is a promise and
should look like one. Reading in a text serif, because firm owners read like readers. Doing (fields,
buttons, labels, tables) in a sturdy, plain sans. And everything that will be typed into the state's
website in a mono, so the firm can see exactly what will be filed.

### 5.1 The faces

| Role | Face | Weights | Why |
|---|---|---|---|
| **Headlines, prices, big numerals** | **Publico Headline** (Commercial Type) | Bold, Medium, Bold Italic, Medium Italic | Drawn for a newspaper's headlines. It has the punch of a front page at 90px and stays civil at 26px. Its figures make a price look like a fact. |
| **Reading** | **Publico Text** (Commercial Type) | Roman, Italic, Semibold, Semibold Italic | The same family's text cut: the ledes, the long answers on Questions, the explainer copy on How it works, Terms, Privacy, docs prose. One family from banner to body. |
| **Doing** | **National 2** (Klim Type Foundry), with **National 2 Narrow** | Regular, Italic, Medium, Bold; Narrow Regular and Medium | A plain, honest grotesque with open shapes that hold up at 15px for older eyes. UI, buttons, nav, kickers, labels, captions, the imprint. Narrow for tables, tiles and the labels inside graphics. |
| **What the state will see** | **GT America Mono** (Grilli Type) | Regular, Medium | Business names, addresses, members, EINs, filing references, fees in drafts and proofs, code. A mono makes "TWO SISTERS BAKERY LLC" look typed, which is exactly what it will be. |

Licensing: web licenses for cofile.app and every firm page under it (firm pages are high
pageview; budget for it), desktop licenses for the studio, and app/email licenses where offered.
Self-hosted WOFF2, subset to Latin plus Latin Extended-A (Spanish and most client names), with
`font-display: swap` and size-adjusted fallbacks so nothing jumps.

**Commissioned type:**

- **The wordmark** (3.1), from a lettering artist.
- **Door Roman**, a sign painter's gold-leaf alphabet for the doors: a classic roman with a fine
  outline and a drop shade, drawn by a lettering artist working with a traditional gilder, so it
  looks like brush-and-leaf work, not a font with a gold fill. Capitals, lowercase, figures, the
  ampersand, basic punctuation and Spanish accents (á é í ó ú ñ ü). Delivered as three aligned
  layers (letter, outline, shade) for the gilding engine (section 7.6). It's used only on the
  doors, never as text.

**Fallbacks:** on firms' pages whose own font fails, and in emails: headlines in Georgia, UI in
"Helvetica Neue", Arial, sans-serif, values in Menlo, Consolas, monospace.

### 5.2 The scale

Desktop sizes apply from 1200px; phone sizes below 600px; between, sizes interpolate with `clamp()`.

| Style | Face and weight | Desktop size / line | Phone size / line | Tracking | Used for |
|---|---|---|---|---|---|
| **Banner** | Publico Headline Bold | 88 / 88 | 44 / 46 | −1.5% | The home page H1 only |
| **Headline 1** | Publico Headline Bold | 64 / 66 | 36 / 40 | −1% | H1 on the pages behind the home page; home H2s |
| **Headline 2** | Publico Headline Bold | 48 / 52 | 30 / 34 | −0.75% | H2s on inner pages; the Close |
| **Headline 3** | Publico Headline Medium | 32 / 38 | 26 / 32 | −0.5% | Card heads, plan names, state names on tiles |
| **Headline 4** | Publico Headline Medium | 24 / 30 | 22 / 28 | 0 | Questions on Questions, sub-heads, client names in the desk |
| **Figure** | Publico Headline Bold, lining tabular | 72 / 72 | 52 / 52 | −1% | Prices on the rate card and plan cards |
| **Lede** | Publico Text Roman | 24 / 35 | 20 / 30 | 0 | The sentence under a headline |
| **Body** | Publico Text Roman | 20 / 32 | 18 / 29 | 0 | Long reading |
| **UI** | National 2 Regular | 18 / 27 | 17 / 26 | 0 | Lists, form help, app text |
| **Label** | National 2 Medium | 17 / 22 | 17 / 22 | 0 | Field labels, buttons, nav |
| **Small** | National 2 Regular | 16 / 24 | 16 / 24 | 0 | Notes, secondary lines |
| **Caption** | National 2 Regular | 15 / 22 | 15 / 22 | +0.5% | Picture captions and example labels |
| **Kicker** | National 2 Medium, capitals | 14 / 18 | 14 / 18 | +8% | The line over a headline |
| **Imprint** | National 2 Regular/Medium | 13 / 18 | 13 / 18 | +1% | "with CoFile" only |
| **Data** | National 2 Narrow Regular, tabular | 17 / 24 | 16 / 24 | 0 | Tables, tiles, graphic labels |
| **Value** | GT America Mono Regular | 17 / 26 | 16 / 24 | 0 | What the state will see |

Nothing a person needs to read is smaller than 15px. The only exception is the 13px imprint, which
is the point of the joke, and which is never the only place information lives.

### 5.3 House style

- **One sentence per line.** So many of this site's headlines are two short sentences that it
  becomes the house style: on desktop and tablet, a headline made of two sentences breaks between
  them, each sentence on its own line, with balanced wrapping inside each. "Your client needs an
  LLC. / Say yes, under your own name." "Your name on the door. / Ours in small type." "Your client
  sends a text. / Nobody retypes it." "Run one rehearsal. / Then decide." One-sentence headlines use
  `text-wrap: balance`. On phones, natural wrapping. This is a visual line break only; the words
  don't change.
- **Kickers** are the only capitals on the site. Everything else is sentence case, as written.
- **Figures** are lining everywhere; tabular in tables, fees, tiles and prices; never oldstyle.
  Accountants read columns of numbers, and numbers that jump up and down in a line look wrong to them.
- **Money:** in tables, "$103.50" right-aligned on the decimal. On the price strip and plan cards,
  the dollar sign is set at 55% of the figure's size and raised to cap height, the rate-card
  convention, so "$45" reads first as a number.
- **Totals** get a single rule above and a double rule below (1px, 2px gap, 1px), the way every
  accountant has underlined a total since ledgers.
- **Quotes:** Ana's text keeps its quotation shape with hanging punctuation, so the text's left edge
  stays clean.
- **Ampersands** in our own face, in example firm names, use Publico Headline's italic ampersand:
  "Harbor *&* Pine CPA".
- **Measure:** body 60 to 68 characters; ledes 48 to 58; captions up to 72.
- **Pairing on a screen:** never more than the three families plus the mono. Never a fourth "fun"
  face.

---

## 6. Layout

### 6.1 Grid

| | Columns | Column | Gutter | Outer margin | Content width |
|---|---|---|---|---|---|
| **Wide** (≥1440px) | 12 | 86px | 24px | auto | 1296px |
| **Desktop** (1200 to 1439px) | 12 | 76px | 24px | ≥ 48px | 1176px |
| **Tablet** (768 to 1199px) | 8 | fluid | 24px | 40px | fluid |
| **Phone** (< 768px) | 4 | fluid | 16px | 20px | fluid |

- **Bleeds:** photographs can bleed to one or both viewport edges; UI plates never bleed (a page
  floating off the edge of the screen looks broken, not bold).
- **Column rules:** a 1px Hairline between columns of text (footer, Security, the state notes on
  What we file, the rate card), the way a newspaper separates columns. Never between a picture and
  its text.
- **Baseline:** 8px, with a 4px half-step for type. Spacing scale: 4, 8, 12, 16, 24, 32, 48, 64, 96,
  128, 160.

### 6.2 Section openers and rhythm

- **The Oxford rule** opens each home page section: a 4px Press Black rule, a 3px gap, a 1px rule,
  across the content width, with the kicker or headline 32px below. It's the most newspaper thing on
  the site and it does real work: it tells the eye "new story".
- **Quiet openers** for the quiet parts (the security line, the How it works checks): one Hairline,
  no thick rule, on Newsprint. You can see they're sidebars before you read a word.
- **Section padding:** 128px above and below on desktop, 160px for the hero and the Close, 96px for
  quiet sections. Phone: 72px, 88px, 56px.
- **Pacing.** A magazine feature well never repeats the same layout twice in a row, and neither does
  this home page. The nine sections alternate between a picture on the right, a picture on the
  left, a centerpiece and a full-width strip (section 9 shows each), so that scrolling feels like
  turning pages.
- **Text and pictures:** the text column is narrow (4 of 12 columns) and the picture is wide (7 or
  8 of 12). With about 330 words on the page, the pictures carry it, and the layout admits it.
- **Captions** sit under their picture, left-aligned to it, in Caption style, with 12px above. Every
  example picture carries its example label as its caption, always visible, never on hover.

### 6.3 Phones

- **Order:** a section's words keep their order. Its picture goes where it does the most work:
  after the headline and lede, before the short list and the link, so the phone reader gets
  headline, picture, details.
- **Pictures** are redrawn for the phone, not shrunk: UI plates are the real phone layouts of those
  pages, photographs are recropped to 4:5 by the photographer (shot for both crops on the day), and
  graphics are restacked vertically.
- **Buttons** are full width, 56px tall; two buttons stack with 12px between.
- **No horizontal scrolling of the page,** ever. A few pictures scroll sideways inside themselves
  (the contact sheet, the two doors), with scroll-snap and a visible edge of the next item.
- **Sticky:** only the slim header (56px) sticks. Nothing sticks at the bottom.

---

## 7. Art direction

The home page has about 330 words. Everything else is pictures, and I'm going to treat them the way
a good front page does: each one has a job, a caption, and a reason to be the size it is.

### 7.1 The five kinds of picture

1. **Photographs of people**, shot as reportage by an editorial documentary photographer. A firm
   owner on the phone. A baker texting at the counter. An accountant handing over a folder. The
   filing professionals who run CoFile, at work. Real light, real rooms, real hands.
2. **Product plates**: the filing desk, the client page, the drafted filing, the proof, the record,
   built from the real product components with sample data and shown crisp, as sheets of paper
   lying on the page. Never blurred, never fake, never in a glossy device mockup.
3. **Explanatory graphics** from an editorial graphics desk: leader lines, numbered callouts, the
   contact sheet, the state tiles, the rate card. They explain the plates and the photographs.
4. **Gold leaf**: the office doors, lettered by a real gilder, photographed, and then extended in
   real time so a visitor's own firm name can be gilded onto a door. The one piece of luxury in
   the system, and it's spent on the firm's name.
5. **Spot illustrations** in brush and ink, only for system pages and empty states (404, errors,
   an empty desk), where a photograph would be too much.

What makes them one family: the same warm-neutral light in every photograph; the same Sheet White
paper and soft shadow under every plate; the same 1.5px Press Black line and Gold Leaf highlight in
every graphic; and the gold in the photographs rhyming with the gold in the graphics.

### 7.2 Photography: the commission

**Who:** one editorial documentary photographer who shoots for business magazines (portraits and
reportage, comfortable directing non-actors), with a first assistant, a digital tech shooting
tethered, a producer, a casting director who casts real-looking people (real small-business owners
and office workers hired as talent, not models), a location scout, a prop stylist, a retoucher who
knows when to stop, and a still-life photographer for two table-top days.

**Honesty rule, from my newsroom:** Harbor & Pine CPA, Northgate Payroll and Two Sisters Bakery
are examples, so every photograph with them in it is a photo illustration, cast and staged, and is
captioned as one `[copy needed]`. Photographs of CoFile's own filing professionals are reportage of
real people, captioned with their real names and roles `[copy needed]`, with their consent. When
real customers agree to be photographed as customers, we reshoot as reportage and swap the
pictures. No stock photography, and no AI-generated people, ever.

**Look:**

- Full-frame, prime lenses: 35mm for scenes, 50mm for hands and objects, 85mm for portraits.
- Available light and practicals (desk lamps, oven glow, corridor sconces), shaped with
  flags and bounce, never flashy. Expose to protect the highlights in the gold.
- Grade: warm-neutral, true skin, blacks lifted just a hair, fine grain the equivalent of ISO 800
  film. No teal and orange, no heavy vignette, no haze filters, no black and white.
- People mid-action, not posing to the lens (except the portraits). Hands matter: this is a story
  of a thumb, a pen, a folder.
- Let warm light into every frame: gold leaf on glass, oven light, late sun. The site's spot color
  should seem to come out of the pictures.
- Shoot every frame for four crops: 16:9, 3:2, 4:5 and 1:1, with the subject's face and hands safe
  in all four.

**Screens in photographs** are shot dark (or with tracking markers) and composited with real renders
of the product at 2× resolution, keeping the real reflections and the slight curve of the glass.
Every screen shows the firm's brand (Harbor & Pine or Northgate), never a big CoFile.

**Documents in photographs** are never real state or IRS documents. Folders are closed, or the pages
are our own neutral dummy layouts seen at an angle. No seals, eagles, flags, capitol domes,
government buildings or anything that imitates an official mark.

**Releases:** web, email, advertising, social and print, worldwide, five years, for everyone in
frame. Casting reflects New Jersey, New York and Florida as they are: ages 30 to 70, every
background.

### 7.3 The shot list

| # | Title | Used on | The picture |
|---|---|---|---|
| **PH-01** | **The call** | Home hero; For firms | Harbor & Pine's office, late morning. The partner (cast, about 55, reading glasses pushed up into her hair) at her desk, phone to her ear, pen in her other hand, caught at the half-second she's saying yes: the start of a smile, a small nod. On the desk: a monitor (screen composited with her filing desk), a mug, a legal pad with a few lines of handwriting (prop-styled, illegible). Behind her, out of focus, the office's glass-panel door, and on the glass, seen from inside so it reads **in reverse**, the gilt lettering "Harbor & Pine CPA". Her name is literally behind her. 35mm, f/2.8, eye level, window light from camera left. Her face sits in the right third, so the desk plate can overlap the lower left of the frame. Also shot: a clean plate of the door glass, unlettered, for the gilding engine. |
| **PH-02** | **Two doors** | Home Firms; For firms | A pre-war commercial building's corridor (Jersey City or Newark): terrazzo floor, oak doors with frosted glass panels, brass handles, numbers on the frames. Two neighboring doors, both lettered in 23-karat gold leaf by our gilder in Door Roman: "Harbor & Pine CPA" on one, "Northgate Payroll" on the other. Each door shot dead-on, camera on axis with the glass, on a tilt-shift lens for true verticals, the lettering at one third from the top. A few frames with a figure passing, soft, inside each office. Plus one wide of the corridor showing both doors. Plus a 15-position bracket of a single moving light across each door's lettering (for the gilding engine's highlight). |
| **PH-03** | **The counter** | Home Requests; How it works | A working bakery in Jersey City at 5:40 a.m. Ana (cast, about 40), apron, flour on her forearms, standing at the steel counter with a tray of proofing loaves behind her, thumb-typing on her phone with one hand, the other resting on a sack of flour. The oven glow lights her from behind; a work lamp from the front. The phone screen is composited: her text, in our own neutral message bubble (never any real messaging app's interface). 50mm, f/2. Tight on hands and phone for the 4:5 crop; looser with her face for 3:2. |
| **PH-04** | **The hand-off** | Home After; How it works | The same bakery, mid-afternoon after closing, chairs up on half the tables. Harbor & Pine's partner (from PH-01) at a café table with Ana and her sister Lucia (cast). She slides a plain kraft folder across the table; Lucia is laughing, Ana has a hand flat on the folder. The folder is closed; nothing in frame is a legible document. Late sun through the front window throws the reversed shadow of the window lettering across the table. 35mm, f/2.8. |
| **PH-05** | **Your door at dusk** | Home Close; sign-up; For firms close | A third door in the same corridor as PH-02, glass **unlettered** (the clean plate the gilding engine letters with the visitor's own firm name), shot at dusk: corridor lights low and warm, the office lit inside, a desk lamp on, a coat on a hook. Two passes, locked off: office lights off, office lights on, for a two-second cinemagraph of the lights coming on. Plus the 15-position light bracket. 50mm tilt-shift, frontal. |
| **PH-06** | **The filing professionals** | Hero byline; How it works step 3; Pricing; Questions | Reportage of CoFile's real filing professionals, at work in their real workplace: at two monitors with a state's website on one (composited as our neutral redraw, never a real state site's header or seal), on a headset call, writing a note. Then two portrait framings for each person: a tight byline portrait (head and shoulders, 1:1, soft background, looking just off lens, natural expression) and an environmental 3:2. Names and roles in captions `[copy needed]`. |
| **PH-07** | **You approve it** | How it works step 2 | The partner at her desk from PH-01, now reading: leaning in to her monitor, one hand on the mouse, the proof on screen (composited). Over-the-shoulder, so the screen is big in frame and her concentration reads from the set of her shoulders. 50mm. |
| **PH-08** | **The printer's proof** | How it works, the proof section | Still life, overhead, on a light table: a printer's proof of letterpress business cards and letterhead for the example bakery, a pencil "OK" and initials in the margin, a linen tester (loupe), a pencil. Raking light, macro. It's the picture of the copy's own analogy: "You've approved a proof before." |
| **PH-09** | **The partner at the door** | For firms opener | Environmental portrait: the partner in her open office doorway, one hand on the frame, relaxed and proud, the gilt "Harbor & Pine CPA" on the open door's glass beside her, sharp. 85mm, f/2.8, eye level. Shot for a full-bleed 21:9 crop with her in the left third. |
| **PH-10** | **The clipped page** | 404 | Still life: a sheet of Coated White paper printed with our own neutral layout (rules, blocks, no real masthead), with a neat rectangle cut out of it, lying on a walnut desk so the hole shows the wood and casts a soft shadow. A pair of scissors at the edge of frame. |

### 7.4 Product plates

- Built from the real components (section 11) with the sample data from the example pictures:
  Harbor & Pine CPA, Northgate Payroll, Two Sisters Bakery LLC, Hudson Ledger LLC, Orchard Lane Inc.,
  Ana Ortiz and Lucia Ortiz, 88 Grove St, $100.00 + $3.50 = $103.50.
- Rendered live in HTML where they're interactive (the desk, the two client pages), otherwise as
  SVG exported from the components, so text is sharp at every size and readable by screen readers.
- Sheet White, 0px radius (paper has square corners), a hairline edge (`rgba(22,24,28,.08)`) and a
  soft "lying on the desk" shadow: `0 1px 0 rgba(22,24,28,.04), 0 18px 40px -20px rgba(22,24,28,.28)`.
- Shown at true scale or a little under (never above 100%, so text never looks inflated), and never
  tilted. Perspective tricks make a page look like an ad.
- On phones, the plate is the real phone layout of that page.
- Anything that shows a state's or the IRS's own screen (the state's review page in the proof, the
  frames in the contact sheet) is a neutral redraw: plain gray header band with no seal, no logo,
  no state name lockup; just field labels and values. The copy's labels ("Business Name",
  "Designator") are the only words on them.

### 7.5 Explanatory graphics: the graphics desk

Commission an editorial information-graphics designer who has worked a newspaper graphics desk.
House style:

- **Lines:** 1.5px Press Black, square caps. Leader lines end in a 4px dot on the thing they point
  at, never an arrowhead (arrowheads are for directions; dots are for "this").
- **Numbered callouts:** 28px circles, Press Black fill, Coated White numeral in Publico Headline
  Bold 16px. On a firm's plate they sit outside the plate, in the margin, so they're clearly our
  annotation, not part of the firm's page.
- **Highlight:** one thing per graphic in Gold Leaf: a 3px underline under the words that matter, a
  gold leader line, the loupe's ring.
- **Labels:** National 2 Narrow Medium 15px, Press Black, set horizontally, never rotated.
- **Fills:** Newsprint for grounds, Sheet White for paper, nothing else.
- **No icons** where a word or a picture can do it.

The graphics, all in section 9 and 10: the desk annotations, the loupe over the small type, the
text-to-draft leader lines, the proof callouts, the record timeline, the state tiles, the contact
sheet, the rate card, the filing-unit squares on Pricing, the cutaway on For platforms, the
three-step triptych on How it works, the dashboard's small multiples.

### 7.6 Gold leaf: the doors and the gilding engine

This is the site's one indulgence and its signature.

1. **The real thing first.** A traditional sign painter and gilder letters the two example doors
   (PH-02) in 23-karat leaf on the inside of the glass, the old way: matte-centered letters with a
   burnished outline and a painted drop shade, in Door Roman. We photograph them.
2. **The engine.** A creative-technology studio builds a small WebGL renderer that letters *any*
   name onto the clean plates (PH-01's background door, PH-05's dusk door) so it looks like the
   gilder did it:
   - Layout: Door Roman, centered on the glass, one or two lines (it breaks before "CPA", "LLP",
     "& Co." and similar endings), fitted to the glass panel's safe area by width, between 60% and
     100% of the reference cap height. Up to 40 characters.
   - Materials: a gold-leaf albedo map with the faint seams of real leaf squares, a normal map of
     the leaf's crinkle, a burnished-outline mask, and the drop shade as flat paint. Lit from the
     photographed light positions (the 15-position bracket), so the specular highlight moves
     where the real one did.
   - Glass: a refraction offset, a slight frost, and the photographed reflections composited on
     top, so the letters sit *behind* the glass's surface, not on top of the photo.
   - PH-01 renders the name mirrored, at the photograph's depth of field (a matching lens blur).
   - Falls back to a pre-rendered still of "Harbor & Pine CPA" when WebGL isn't available, when
     reduced motion is on (the letters appear without the highlight), or on low-power devices.
3. **The rule:** the gilding engine only ever letters the *firm's* name: the example firm's, or the
   name the visitor typed. Never CoFile's.

### 7.7 Spot illustrations

Commission an editorial spot illustrator who works in brush and ink, with a single flat Gold Leaf
accent (on CoFile's pages) or none (on firms' pages, where spots are drawn in Press Black only). Ten
spots, each drawn at 240px and legible at 96px:

| Spot | Where | What it shows |
|---|---|---|
| A clear desk | Empty filing desk ("Your desk is clear.") | A desk seen from the front: lamp, one tidy stack, a pen laid square. |
| A coffee ring | "Something went wrong" | A page with a coffee ring on it. The universal small hiccup. |
| An envelope, flap open | Confirm your email, check your email | A plain envelope, a sheet half out. |
| A torn ticket stub | Link expired, invite expired | The stub of a ticket, torn along its perforation. |
| A desk lamp, switched off | Session ended, signed out | The lamp from the first spot, dark, its chain still swinging. |
| A pen, capped | No saved signatures yet | A fountain pen lying on a signature line. |
| A card, face down | Nothing waiting for a card | A payment card face down on a desk (no brand, no numbers). |
| A paper plane | No client links yet | A folded plane resting on a desk, not flying. |
| A stack of letters | No filing requests yet | Three envelopes, squared. |
| A clean page | No API keys or webhooks yet | A blank sheet with a single ruled line. |

### 7.8 Texture

None, on screen. Coated White is flat. No paper grain overlays, no newsprint texture, no halftone
screens, no noise. The only texture on the site is in the photographs and the gold leaf, which is
why both look rich.

### 7.9 Captions and labels

- Every example picture keeps its example label as its caption: "Example · test details · not a real
  firm", "Two example firms · same page, each in its own brand", "Sample proof · test details · not a
  real business", "Example record · sample documents", "Rehearsal · nothing filed, nothing paid", and
  "Ana Ortiz · text message · example" on the text bubble.
- Photographs need their own captions and credits `[copy needed]`, including the "photo
  illustration" line on staged frames.
- Every picture needs alt text `[copy needed]`. Plates built in HTML are read as real text, so their
  alt text describes only what's visual (for example, that two pages are side by side).

---

## 8. Motion

**Type sets. Pictures develop. Nothing bounces.**

A front page doesn't fly in; it's printed. So headlines never animate on this site, and photographs
are simply there. What moves is the explanation: a line drawing from a word in a text message to
the row it filled, a frame of the contact sheet developing, a light coming on behind a door. Motion
here is the graphics desk explaining, and the gold leaf catching the light.

### 8.1 Tokens

| Token | Value | For |
|---|---|---|
| `--dur-micro` | 120ms | Hover, press, focus |
| `--dur-ui` | 200ms | Chips, tabs, the header, accordions |
| `--dur-reveal` | 360ms | Elements of a picture arriving |
| `--dur-draw` | 400ms | A leader line or timeline segment drawing |
| `--dur-feature` | 900 to 1200ms | Gold-leaf highlight sweeps |
| `--ease-set` | `cubic-bezier(0.2, 0, 0, 1)` | Arrivals: fast start, soft landing, like type dropping onto the bed of a press |
| `--ease-move` | `cubic-bezier(0.4, 0, 0.2, 1)` | Things that travel (the loupe, a document) |
| `--ease-exit` | `cubic-bezier(0.4, 0, 1, 1)`, 160ms | Leaving |

**Rules:**

- A picture's motion plays **once per visit**, when 35% of it is in view. It never replays on
  scroll-up and never loops. The one cinemagraph (the dusk door) plays once and holds.
- Each picture's choreography finishes in **1.8 seconds or less**, except Requests (2.6s), which is
  an explainer and earns it.
- Arrivals are opacity plus a 6 to 12px rise. No scaling of text, no blur-ins, no parallax, no
  scroll-jacking, no cursor trails.
- Only `transform` and `opacity` animate (plus SVG stroke-dashoffset for lines). The gilding engine
  loads when its picture is one viewport away and pauses when off screen.
- **Reduced motion:** every picture renders in its final state at once; the gilding engine shows
  the lettering lit but still; the dusk door shows its "lights on" frame. Nothing is lost but the
  movement.

### 8.2 The moments

| # | Where | What moves | Timing | Why it sells |
|---|---|---|---|---|
| **M1** | Hero: the desk sets | On load, the desk plate rises into place over the photograph (12px, 360ms). Harbor & Pine's nameplate rule draws left to right (420ms, starting at 120ms). The four rows set one after another (280ms each, 70ms apart). Last, the first row, Two Sisters Bakery LLC, "Proof ready to approve", takes its pale firm-color highlight (240ms): the one thing on this desk waiting for the firm. | 1.3s | The desk looks alive and orderly, and the eye ends on the client waiting for you. |
| **M2** | Hero: your name | Hovering the firm's name on the desk shows a dotted underline and a small pencil (120ms). Click or press Enter and the name becomes editable in place, already selected. As you type, the nameplate updates letter by letter. When you finish (Enter, or click away), the reversed gilt lettering on the door behind the partner re-letters to your name with one highlight sweeping across it (600ms). | on demand | "Say yes, under your own name": it's now literally your name, on your desk and your door. |
| **M3** | Firms: the loupe | Both doors' gold catches one highlight sweep (900ms, the second door 200ms after the first). A printer's loupe appears over the first firm's client page, magnifying its "with CoFile" (holds 1.2s), then glides to the second firm's page and magnifies the same small type there (900ms). On desktop you can then drag the loupe anywhere. | 3s, once | "Ours in small type": you need a loupe to find us, on either firm's page. |
| **M4** | Requests: nobody retypes it | Three typing dots (600ms), then Ana's bubble (240ms). A pause. Three phrases in it get a Gold Leaf underline, one after another: "the bakery", "me and my sister, 50/50", "in Jersey City". From each, a leader line draws to its row in the draft (400ms), and the row's value sets as the line arrives. Then the two saved rows (registered agent, organizer and signer) appear together, at once, with no lines: they were already there. | 2.6s | You watch the text become the filing without a single keystroke, and the saved answers need no effort at all. |
| **M5** | The proof: the page proof | The proof is already lying on the desk. The four numbered callouts appear beside their blocks (200ms each, 120ms apart). The total's double rule draws (300ms). The New Jersey payment screen strip slides out from under the proof's lower edge and settles (360ms). The approve button never pulses. | 1.4s | One page, every detail, every fee, read in order, the way an editor reads a proof. |
| **M6** | After: filed | The record's timeline fills: Approved, a line draws, Submitted, a line draws, Filed (200ms per dot, 400ms per line). Then the Gold Leaf end mark lands after "Filed" (scales from 0.6 to 1, 240ms). Then the two documents slide into the record from the right, 150ms apart, as if handed across the table. | 1.9s | "Then it's filed": the story ends with our end mark, and the papers arrive. |
| **M7** | Coverage | The tiles are still. Each filing type's status mark fills in as its row enters (200ms, 40ms apart). | under 1s | A calm, factual panel. Facts shouldn't perform. |
| **M8** | Rehearsals: the contact sheet | Each frame starts as a Newsprint rectangle with its frame number and develops into its screen (240ms crossfade, 160ms apart); its line in the log sets at the same moment. The last frame develops like the others. | 1.4s | Every screen of the real website, shot in order. You can look at each frame before you decide. |
| **M9** | Pricing | Nothing moves. Prices never count up: money that spins looks like a slot machine. | — | Simple prices look settled. |
| **M10** | Close: your door at dusk | The dusk door carries the firm's name (yours if you typed it in the hero, otherwise Harbor & Pine's). As it comes into view the office light behind the glass comes on (the two-second cinemagraph, once), then the gold catches one slow highlight (1.2s). The last motion on the page. | 3.2s | You end where you started: your name on the door, the light on, ready to try it. |

### 8.3 Interface motion

- **Buttons:** color change 120ms; press moves the button down 1px (80ms). No ripple, no glow.
- **Links:** underline thickens from 1px to 2px (120ms).
- **Header:** shrinks from 72px to 56px after 80px of scroll (200ms); the header's gold button
  crossfades in when the hero's leaves (200ms).
- **Questions accordion:** opens with a 220ms height change; the "+" becomes "−" with no rotation.
- **Filing desk, live updates:** when a filing's status changes, its chip crossfades (200ms) and
  the row takes a pale firm-color highlight that fades out over 1.2 seconds. "An update at each
  stage", made visible.
- **Loading:** a 2px rule under the button label grows from left to right while "Sending…" shows.
  No spinners. Skeletons are flat Newsprint bars with no shimmer.

---

## 9. The home page, section by section

The home page is a front page: one banner headline, one dominant picture, and then a run of short
stories, each with its own picture, each laid out differently from the one before. Nine sections,
nine pictures plus the typographic rate card (I've added the dusk door at the Close and a byline
portrait in the hero). Copy is
quoted exactly; "CoFile" is the platform name the code fills in.

The pacing, top to bottom:

| # | Section | Layout | Picture |
|---|---|---|---|
| 1 | Hero | Banner across the page; text left, picture right | PH-01 *The call* with the desk plate; byline portrait |
| 2 | Firms | Picture left (wide), text right | *Two doors*: PH-02 with two client pages and the loupe |
| 3 | Requests | Text left, picture right | *The counter*: PH-03, the bubble, the draft |
| 4 | The proof | Centerpiece on a Newsprint desk, full bleed | *The page proof* |
| 5 | After | Headline and list above; photograph full bleed | *The hand-off*: PH-04 with the filed record |
| 6 | Coverage | Full-width panel | *The markets panel*: four state tiles |
| 7 | Rehearsals | Picture left, text right | *The contact sheet* |
| 8 | Pricing | Full-width strip | *The rate card* (typographic) |
| 9 | Close | Picture bleeding left, text right | *Your door at dusk*: PH-05 |

### 9.0 The frame: beta banner, header, footer

**Beta banner** (kept on the home page, not sticky). A Newsprint strip above the header, 16px top
and bottom padding, text centered on desktop and left-aligned on phone. A small label "Beta" in
the Kicker style, Coated White on Press Black, 4px × 8px padding, square corners; then the
sentence in National 2 15px Press Black: "CoFile is in beta. Any filing can run as a free rehearsal
on the state's real website. It stops before the last button, so nothing is filed or paid. Filing
types go live one at a time. Questions or problems? hello@cofile.app". Two lines on desktop, four
on a phone. The email is a link.

**Header**, 72px tall, Coated White, a Hairline below.

```
┌──────────────────────────────────────────────────────────────────────────────────────────┐
│ CoFile■     How it works   For firms   What we file   Pricing   For platforms   Log in  [Run a free rehearsal] │
└──────────────────────────────────────────────────────────────────────────────────────────┘
```

- Wordmark left, 18px cap height (about 108px wide).
- Navigation in National 2 Medium 16px, Press Black, 28px apart; the current page gets a 2px Press
  Black underline 6px below the text.
- "Log in" is a text button; "Run a free rehearsal" is a medium (44px) button: Press Black outline
  while the hero's gold button is on screen, Gold Leaf after (4.3).
- After 80px of scroll the header sticks and shrinks to 56px, Coated White at 96% with a backdrop
  blur of 8px.
- **Phone:** wordmark left (14px cap height), "Log in" as a text link, and a 44 × 44px menu button
  (two 2px Press Black lines, 8px apart). The menu opens a full-height Coated White sheet laid out
  like a magazine's contents page: the five links in Publico Headline Medium 32px, each on its own
  line between Hairlines, 64px tall; then "Run a free rehearsal" full width in Gold Leaf and
  "Log in" under it. The sheet slides down 12px and fades in (200ms).

**Footer**, Coated White, opened by an Oxford rule.

```
════════════════════════════════════════════════════════════════════════════════════════════
 CoFile■                        │ New York · New Jersey · Florida · IRS │ Building a filing product?
 CoFile · the filing desk       │                                       │ CoFile for platforms
 behind your firm               │                                       │
────────────────────────────────────────────────────────────────────────────────────────────
 CoFile is not a law firm or a government agency, isn't affiliated   Terms · Privacy · Security ·
 with any state or the IRS, and doesn't give legal or tax advice.    FAQ · hello@cofile.app
```

Three columns with column rules in National 2 16px; the legal line in Caption style 15px under a
Hairline. On phones everything stacks, 24px apart, with the links as 44px-tall rows.

---

### 9.1 Hero: "Your client needs an LLC. Say yes, under your own name."

**The copy, placed:**

- Kicker: "For CPA, payroll, fractional CFO and title firms"
- Banner (H1): "Your client needs an LLC. / Say yes, under your own name."
- Lede: "CoFile files your clients' formations, EINs and payroll registrations on the official state
  and IRS websites, once you approve."
- Buttons: "Run a free rehearsal" (Gold Leaf, large) · "See pricing" (outline, large)
- Note: "Built and run by filing professionals. When a filing needs a person, one of them takes
  over."

**The treatment.** This is the front page, so the headline gets the whole width: the Banner style,
88px, two lines, one sentence each. Nothing else on the site is that big. The kicker sits above it
in Kicker style with a 48px Press Black rule to its right. Beneath the banner, 48px down, the page
splits: the text column on the left (4 columns), the lead picture on the right (8 columns).

**Desktop (1280px):**

```
│ FOR CPA, PAYROLL, FRACTIONAL CFO AND TITLE FIRMS ────                                      │
│                                                                                            │
│ Your client needs an LLC.                                                                  │  Banner 88/88
│ Say yes, under your own name.                                                              │
│                                                                                            │
│ ┌ cols 1–4 ───────────────┐  ┌ cols 5–12: PH-01, 3:2, 776 × 517 ─────────────────────────┐ │
│ │ CoFile files your        │  │ (door glass behind her: "Harbor & Pine CPA" in reverse)   │ │
│ │ clients' formations,     │  │                                     partner on the phone, │ │
│ │ EINs and payroll         │  │                                     saying yes ►          │ │
│ │ registrations on the     │  │   ┌ desk plate, 520px ─────────────────────────┐          │ │
│ │ official state and IRS   │  │   │ [H&P] Harbor & Pine CPA        Filing desk │          │ │
│ │ websites, once you       │  └───│════════════════════════════════════════════│──────────┘ │
│ │ approve.                 │      │ Client filings                [New filing] │            │
│ │                          │      │▌Two Sisters Bakery LLC  ◐ Proof ready to approve │       │
│ │ [ Run a free rehearsal ] │      │▌New Jersey LLC formation                    │            │
│ │ [ See pricing          ] │      │ Hudson Ledger LLC              ● Filed      │            │
│ │                          │      │ New York LLC formation                      │            │
│ │ ┌──┐ Built and run by    │      │ Hudson Ledger LLC   ● Filed, IRS letter saved │          │
│ │ │▓▓│ filing professionals.│     │ EIN                                         │            │
│ │ └──┘ When a filing needs │      │ Orchard Lane Inc.              ○ Submitted  │            │
│ │ a person, one of them    │      │ Payroll registration (NJ-REG)               │            │
│ │ takes over.              │      │                                with CoFile■ │            │
│ └──────────────────────────┘      └─────────────────────────────────────────────┘            │
│                                   Example · test details · not a real firm                 │
```

**Phone (390px):**

```
[ Beta strip ]
[ CoFile■                 Log in   ≡ ]
FOR CPA, PAYROLL, FRACTIONAL CFO AND TITLE FIRMS
Your client needs an
LLC. Say yes, under
your own name.                         Banner 44/46
CoFile files your clients' formations, EINs and payroll registrations
on the official state and IRS websites, once you approve.
[        Run a free rehearsal        ]  56px, gold
[            See pricing             ]  56px, outline
┌──────── PH-01, 4:5, full bleed ─────────┐
│  partner on the phone, door behind her   │
│   ┌ desk plate, phone layout ──────┐    │
└───│ [H&P] Harbor & Pine CPA        │────┘   overlaps the photo by 64px
    │ ══════════════════════════════ │
    │ Client filings     [New filing]│
    │ ▌Two Sisters Bakery LLC        │
    │ ▌New Jersey LLC formation      │
    │ ▌◐ Proof ready to approve      │   chip drops under the name
    │  …three more rows…             │
    │                   with CoFile■ │
    └────────────────────────────────┘
Example · test details · not a real firm
[▓▓] Built and run by filing professionals. When a filing needs a person, one of them takes over.
```

#### Picture 1A: *The call* (PH-01) with the desk plate (replaces `DeskVisual`)

**What it shows.** A firm owner saying yes to her client, under her own name. The photograph is
the emotion; the plate is the product. Harbor & Pine's partner is on the phone at her desk (PH-01,
7.3), caught mid-yes. On the glass of her office door behind her, soft and reversed, "Harbor & Pine
CPA" in gold leaf. Lying across the lower left of the photograph is her filing desk, crisp, in her
firm's brand.

**Composition.** The photograph fills columns 5 to 12 at 3:2, bleeding to the right edge of the
viewport on screens wider than 1440px. Her face sits in the right third. The desk plate (520px wide
on desktop, its real phone layout on phones) overlaps the photograph's lower left: its top edge at
55% of the photograph's height, its left edge 40px inside the photograph, and it hangs about 260px
below the photograph's bottom edge, so it reads as a sheet laid on top. Caption below the plate.

**The desk plate, in detail** (built from the real filing desk components, 7.4):

- **Nameplate** (app style, left-aligned): Harbor & Pine's example logo, a commissioned monogram,
  "H&P" in a classical roman, Coated White on a 36px harbor-blue square; then "Harbor *&* Pine CPA" in
  Publico Headline Medium 20px; at the right, "Filing desk" in National 2 Medium 14px, Caption Gray.
  Beneath: the thick-thin rule in harbor blue `#1D4E63` (3px, 2px gap, 1px).
- **Head row:** "Client filings" in Publico Headline Medium 22px; "New filing" as a small button,
  harbor blue with white text.
- **Four rows**, 64px each, Hairlines between. Left: the client's business name in Publico Headline
  Medium 19px (the client is the story) over the filing type in National 2 15px Caption Gray.
  Right: the status chip (section 11).
  - "Two Sisters Bakery LLC" · "New Jersey LLC formation" · **"Proof ready to approve"**: amber chip
    with a half-filled circle. This row is the one waiting for the firm, so it gets the firm wash
    (`#E7EEF1`) and a 3px harbor-blue bar on its left edge.
  - "Hudson Ledger LLC" · "New York LLC formation" · "Filed": green chip, filled circle.
  - "Hudson Ledger LLC" · "EIN" · "Filed, IRS letter saved": green chip, filled circle.
  - "Orchard Lane Inc." · "Payroll registration (NJ-REG)" · "Submitted": outline chip, ring with a dot.
- **Foot:** "with CoFile■" imprint, right-aligned, 13px Caption Gray.
- **Caption** under the plate: "Example · test details · not a real firm".

**The byline portrait (picture 1B, my addition).** Next to the note "Built and run by filing
professionals…", a 56px square portrait of one of CoFile's real filing professionals (PH-06, tight
framing), square corners, set the way a newspaper sets a columnist's face beside the byline. The
note wraps beside it in National 2 16px. Under the note, the person's name and role in Caption
style `[copy needed]`. If that line isn't approved, the portrait doesn't run: a face without a name
is a stock photo.

**States.**

| State | What changes |
|---|---|
| Default | As above. |
| Hover or focus on the firm's name in the nameplate | A 1px dotted Caption Gray underline and a 16px pencil glyph appear after the name; cursor becomes a text cursor. The pencil button's label `[copy needed]`. |
| Editing | The name becomes an inline field in place, same type, all text selected, with a 2px harbor-blue focus ring. Up to 40 characters. Enter or a click away confirms; Escape cancels. A short client-side list catches rude words and quietly restores the example. |
| Personalized | The nameplate shows the visitor's name (the logo square shows its first letter in the same roman). The gilding engine re-letters the door glass behind the partner, mirrored and at the photograph's depth of field. The same name is lettered on the dusk door at the Close (9.9) and offered to the sign-up form's "Firm name" field. Kept in `sessionStorage` only. The example caption stays. |
| No WebGL | Once personalized, the photograph switches to its clean-plate version (door glass unlettered), so the door never disagrees with the desk. |
| Reduced motion | The plate is in place at load; no rule drawing, no row stagger; re-lettering is instant. |
| Dark mode | Photograph unchanged; the plate's paper dims to `#F2EFE8`; text column in Night Ink. |

**Motion:** M1 on load, M2 on demand (8.2).

---

### 9.2 Firms: "Your name on the door. Ours in small type."

**The copy, placed:**

- H2: "Your name on the door." / "Ours in small type."
- Lede: "Your logo and color on every page your client sees."
- List: "A link for each client" · "A page for every filing you offer" · "A button for your own
  website" · "Your registered agent, or ours"
- Link: "For firms"

**The treatment.** The headline tells its own joke typographically. "Your name on the door." is set
in Headline 1 (64px). "Ours in small type." is set beneath it, on its own line, in National 2
Medium 18px with +4% tracking, Caption Gray, like the imprint line at the foot of a page. It's one
H2; both sentences are read together by a screen reader; the second is simply, and deliberately,
small. (On phones: 36px and 16px.)

The list is set without ticks: four short lines in National 2 Medium 19px, each between Hairlines,
48px tall, with a 6px Press Black square bullet hung in the margin. The link "For firms" is a text
link with a "→" drawn as a 1.5px line, not a glyph.

This section flips the hero: picture left, wide; text right.

**Desktop:**

```
════════════════════════════════════════════════════════════════════════════════════════════
┌ cols 1–8: Two doors ──────────────────────────────────────┐   ┌ cols 9–12 ─────────────────┐
│ ┌ PH-02 door A, 3:4 ──────┐   ┌ PH-02 door B, 3:4 ──────┐ │   │ Your name on the door.     │
│ │   HARBOR & PINE CPA     │   │   NORTHGATE PAYROLL     │ │   │ Ours in small type.        │
│ │   (gold leaf on glass)  │   │   (gold leaf on glass)  │ │   │                            │
│ │                         │   │                         │ │   │ Your logo and color on     │
│ │  ┌ client page ───────┐ │   │  ┌ client page ───────┐ │ │   │ every page your client     │
│ │  │ [logo] Harbor&Pine │ │   │  │▓▓▓ Northgate band ▓│ │ │   │ sees.                      │
│ └──│ ══════════════════ │─┘   └──│                    │─┘ │   │ ─────────────────────────  │
│    │ Start your New     │        │ Start your New     │   │   │ ▪ A link for each client   │
│    │ Jersey LLC         │        │ Jersey LLC         │   │   │ ▪ A page for every filing  │
│    │ Business name [  ] │        │ Business name [  ] │   │   │   you offer                │
│    │ Who owns it   [  ] │        │ Who owns it   [  ] │   │   │ ▪ A button for your own    │
│    │ [   Continue     ] │        │ [   Continue     ] │   │   │   website                  │
│    │      ( with CoFile■ ) ◄─ loupe                  │   │   │ ▪ Your registered agent,   │
│    └────────────────────┘        └────────────────────┘   │   │   or ours                  │
│ Two example firms · same page, each in its own brand      │   │ For firms ──→              │
└───────────────────────────────────────────────────────────┘   └────────────────────────────┘
```

**Phone:** H2 (36px / 16px), lede, then the two doors as a sideways pair inside the picture
(each door 82% of the screen width, scroll-snap, the next door's edge visible), each with its
client page overlapping its lower half; the loupe sits over the visible page's imprint; caption;
then the list and the link.

#### Picture 2: *Two doors* (replaces `TwoFirmsVisual`)

**What it shows.** The same client page under two firms, each in its own brand, and each firm's
name in gold leaf on its own door in the same corridor. Two different practices, two different
looks, one identical page underneath. And CoFile, in both cases, only in the small type, which a
printer's loupe finds for you.

**Composition.** Two PH-02 door photographs side by side at 3:4, 24px apart, filling columns 1 to 8.
Each door's gilt lettering sits in its upper third. Over the lower half of each door lies that
firm's client page (its real phone layout, 300px wide), shadowed like paper, its top edge at 52% of
the door's height. The loupe floats over the first page's imprint. Caption under both.

**The two client pages** (built from the real client page components):

| | Harbor & Pine CPA | Northgate Payroll |
|---|---|---|
| Nameplate | Logo on paper: the H&P monogram square, then the name in Publico Headline (the firm has no font of its own), centered; thick-thin rule in harbor blue `#1D4E63` | Logo is white, so it sits on a **nameplate band** in brick `#9A3B26`, 88px tall, logo centered: a commissioned example logo, a simple gate-and-arrow mark with "Northgate Payroll" in the firm's own font (a free geometric sans from Google Fonts, to show that firm fonts work) |
| Headline | "Start your New Jersey LLC" in Publico Headline Bold 26px | "Start your New Jersey LLC" in Northgate's own font, 26px, scaled to Publico's x-height |
| Fields | "Business name", "Who owns it": labels in National 2 Medium 16px, empty 52px fields | identical |
| Button | "Continue", full width, harbor blue, white text | "Continue", full width, brick, white text |
| Imprint | "with CoFile■", 13px Caption Gray, right-aligned at the foot | identical, in exactly the same place |

The point is in the table: everything a client notices is the firm's; everything that makes it
work is identical; and the CoFile part is the same 13px line on both.

**The loupe** (graphics desk, 7.5). A 120px circle with a 1.5px Press Black rim and a soft shadow,
like a linen tester lying on the page, showing the page beneath it magnified 2.5× (rendered from
the plate itself, so it's sharp). Inside, "with CoFile■" fills the lens. It's the only Gold Leaf
in the picture: a 3px gold ring just inside the rim.

**States.** Default as above. Desktop hover over either page: the loupe can be dragged anywhere
over both pages; it springs back to the nearest imprint when let go (300ms). Phone: the loupe sits
over the visible page's imprint and moves with the scroll-snap. Reduced motion: loupe static over
door A's imprint, highlight sweep off. Dark mode: photographs unchanged, pages dimmed paper.

**Motion:** M3 (8.2).

---

### 9.3 Requests: "Your client sends a text. Nobody retypes it."

**The copy, placed:**

- H2: "Your client sends a text. / Nobody retypes it."
- Lede: "Forward the text, email, WhatsApp or Slack message. AI drafts the filing, your saved answers
  fill in the rest, and your team checks it."

**The treatment.** Text left (columns 1 to 4), picture right (columns 5 to 12). Two short lines of
headline, one lede, and a wide picture that does the explaining.

**Desktop:**

```
════════════════════════════════════════════════════════════════════════════════════════════
┌ cols 1–4 ────────────────┐  ┌ cols 5–7 ────────┐      ┌ cols 8–12: the draft ─────────────┐
│ Your client sends a      │  │ PH-03, 4:5       │      │ [H&P] Harbor & Pine CPA           │
│ text.                    │  │ Ana at the       │      │ ───────────────────────────────── │
│ Nobody retypes it.       │  │ counter, 5:40am, │      │ Draft: New Jersey LLC formation   │
│                          │  │ thumb on phone   │      │               (For your team to check) │
│ Forward the text, email, │  │       ┌──────────────────────┐                                  │
│ WhatsApp or Slack        │  │       │ Need an LLC for      │──● Business name  TWO SISTERS…  ▌from the text │
│ message. AI drafts the   │  │       │ ‾the bakery‾. It's   │                                  │
│ filing, your saved       │  │       │ ‾me and my sister,   │──● Members  Ana Ortiz, Lucia…   ▌from the text │
│ answers fill in the      │  │       │ 50/50‾, ‾in Jersey   │                                  │
│ rest, and your team      │  │       │ City‾.               │──● City  Jersey City, NJ         ▌from the text │
│ checks it.               │  │       │ Ana Ortiz · text     │      Registered agent  Your saved agent  ▏already filled │
│                          │  │       │ message · example    │      Organizer and signer  Your saved answers ▏already filled │
│                          │  └───────└──────────────────────┘      └──────────────────────────────────┘
```

**Phone:** H2, lede, then PH-03 at 4:5 full bleed with Ana's bubble overlapping its lower edge;
then the draft plate. On the phone the leader lines become numbered Gold Leaf dots: a small "1",
"2", "3" after each underlined phrase in the bubble, and the same numbers before the matching rows.

#### Picture 3: *The counter* (replaces `TextToFormVisual`)

**What it shows.** A client's text becoming a drafted New Jersey LLC formation. The photograph
shows how little the client did: Ana, at the bakery counter before dawn, thumbing a text. The
graphic shows how little the firm has to do: the words of her text lifted straight into the rows
of a draft on the firm's desk, and the firm's saved answers already in place.

**Composition.** Three layers, left to right: PH-03 at 4:5 (columns 5 to 7); Ana's message bubble
overlapping the photograph's right edge, as if it has just come off her screen; the draft plate
(columns 8 to 12, 452px), linked to the bubble by three Gold Leaf leader lines.

**The bubble.** Our own neutral message bubble, never any real messaging app's look: Newsprint
fill, 20px corner radius with a squared-off lower-left corner (an incoming message), 24px padding,
max 300px wide, the text in National 2 20px/30px Press Black: "Need an LLC for the bakery. It's me
and my sister, 50/50, in Jersey City." Under it, in Caption style: "Ana Ortiz · text message ·
example". Three phrases carry a 3px Gold Leaf underline: "the bakery", "me and my sister, 50/50",
"in Jersey City".

**The draft plate** (the filing desk's draft view, in Harbor & Pine's brand):

- A slim nameplate (logo square 24px, "Harbor & Pine CPA" in Publico Headline Medium 15px, a 2px
  harbor-blue rule).
- Head: "Draft: New Jersey LLC formation" in Publico Headline Medium 22px; the chip "For your team
  to check" (outline chip, under way).
- Five rows, 52px each: label in National 2 15px Caption Gray, value in GT America Mono 16px, and a
  source tag on the right.
  - "Business name" · "TWO SISTERS BAKERY LLC" · "from the text"
  - "Members" · "Ana Ortiz, Lucia Ortiz (50/50)" · "from the text"
  - "City" · "Jersey City, NJ" · "from the text"
  - "Registered agent" · "Your saved agent" · "already filled"
  - "Organizer and signer" · "Your saved answers" · "already filled"
- **Source tags:** "from the text" in National 2 Medium 14px, Burnished Gold, with a 3px Gold Leaf bar
  to its left, the same gold as the underlines in the bubble, so you can see where each answer came
  from without a legend. "already filled" in National 2 14px, Caption Gray, with a 3px Hairline bar.
- **Leader lines:** 1.5px Gold Leaf, gently curved (a single cubic curve each, never crossing), from
  the end of each underlined phrase to a 4px dot at the start of its row.

**States.** Default as above (after motion). Reduced motion: everything in place, lines drawn.
Phone: numbered dots replace lines. Dark mode: the photograph unchanged; the bubble's fill becomes
Night Surface with Night Ink text, the plate stays paper.

**Motion:** M4 (8.2).

---

### 9.4 The proof: "Nothing is filed or paid until you approve the proof."

**The copy, placed:**

- H2: "Nothing is filed or paid until you approve the proof."
- Lede: "One page: every detail, every fee."
- List: "The state's own review page, where possible" · "Every fee checked again before paying" ·
  "Any later change comes back for approval"
- Link: "How it works"

**The treatment.** The centerpiece of the page, and the one section laid out symmetrically. The whole
section is a full-bleed Newsprint band: the editor's desk. The headline is centered across columns 2
to 11 in Headline 1, balanced over two lines. The lede is centered under it in Lede style. The three
list items sit in a row of three columns with column rules, centered text, National 2 Medium 18px,
and then the link. Below, the proof lies on the desk, centered, as large as it can be while still
true to scale.

The firm is the editor here. I want the section to feel like the moment at the press check: a
single page on the desk, everything on it, and a pencil in your hand.

**Desktop:**

```
▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓ Newsprint band, full bleed ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓
                     Nothing is filed or paid until
                         you approve the proof.
                     One page: every detail, every fee.
   The state's own review page, │ Every fee checked again │ Any later change comes
   where possible               │ before paying           │ back for approval
                              How it works ──→

                    ┌ the proof, 560px, Sheet White ─────────────────┐
                    │            [H&P] Harbor & Pine CPA              │
                    │ ═══════════════════════════════════════════════ │
                    │ example firm                       with CoFile■ │
                    │ Two Sisters Bakery LLC        ◐ Ready to approve│
               (1)  │ Business name     TWO SISTERS BAKERY LLC        │
                    │ Members           Ana Ortiz, Lucia Ortiz (50/50)│
                    │ Main business     88 Grove St, Jersey City NJ   │
                    │ address           07302                         │
               (2)  │ Formation filing fee                    $100.00 │
                    │ NJ portal fee, by card                    $3.50 │
                    │ ─────────────────────────────────────────────── │
                    │ Total to the state                      $103.50 │
                    │                                         ═══════ │
               (3)  │ New Jersey's own review page, filled in         │
                    │ ┌ redraw ───────────────────────────────────┐   │
                    │ │ Business Name  TWO SISTERS BAKERY          │   │
                    │ │ Designator     LLC                         │   │
                    │ └────────────────────────────────────────────┘   │
               (4)  │ [            Approve for filing              ]  │
                    └─────────────────────────────────────┬───────────┘
                                         ┌ New Jersey payment screen  $103.50  ● Matches the proof ┐
                                         └──────────────────────────────────────────────────────────┘
                    Sample proof · test details · not a real business
```

**Phone:** the Newsprint band; H2 (left-aligned on phones, 36px); lede; then the proof at the full
width minus 20px margins, in its real phone layout, with the callout numbers sitting on the sheet's
left edge (half on, half off); the payment strip under it; the caption; then the three list items
stacked between Hairlines; then the link.

#### Picture 4: *The page proof* (replaces `ProofVisual`)

**What it shows.** A sample proof for "Two Sisters Bakery LLC": one page, under Harbor & Pine's
nameplate, with every detail and every fee, the state's own review page, and one button. Tucked
under it, the New Jersey payment screen's total.

**The sheet**, 560px, Sheet White, square corners, the paper shadow (7.4):

- **Nameplate**, centered: the H&P monogram (40px) and "Harbor *&* Pine CPA" in Publico Headline
  Medium 22px; the thick-thin harbor-blue rule across the sheet. Under the rule, on one line:
  "example firm" at the left and "with CoFile■" at the right, both in the imprint style.
- **Headline:** "Two Sisters Bakery LLC" in Publico Headline Bold 34px. The business is the story,
  so its name is set like one. To its right, the chip "Ready to approve" (amber, half-filled circle).
- **Block 1, details:** a two-column table. Labels in National 2 15px Caption Gray (40% width);
  values in GT America Mono 16px Press Black. Hairlines between rows. "TWO SISTERS BAKERY LLC" and
  "88 Grove St, Jersey City NJ 07302" carry the stand-in's highlight as our graphics-desk mark: a
  3px Gold Leaf underline, the only gold in the picture.
- **Block 2, fees:** National 2 Narrow 17px, tabular figures, amounts right-aligned on the decimal.
  "Formation filing fee $100.00", "NJ portal fee, by card $3.50", then a 1px Press Black rule, then
  "Total to the state $103.50" in National 2 Bold, with the accountant's double rule under the
  amount only.
- **Block 3, the state's review page:** the caption "New Jersey's own review page, filled in" in
  Caption style, then the neutral redraw (7.4): a Newsprint frame with a plain gray header band, no
  seal or state logo, and two rows: "Business Name" · "TWO SISTERS BAKERY", "Designator" · "LLC".
- **Block 4:** "Approve for filing", full width of the sheet's content, 52px, harbor blue, white
  National 2 Medium 17px. It looks pressable, and it's the firm's color, not ours.
- **Callouts** (1) to (4): Press Black circles in the left margin, outside the sheet, each with a
  short 1.5px leader to its block.

**The payment strip.** A narrow slip of Sheet White (380 × 56px), its edge hairlined, tucked under
the sheet's lower right: it starts 40px inside the sheet's right edge and hangs 28px below it, as if
the payment screen's printout were slipped under the proof. On it: "New Jersey payment screen"
(National 2 15px), "$103.50" (GT America Mono 16px), and the chip "Matches the proof" (green,
filled circle). It's set quietly, at the same weight as the rest: a fact, not a fanfare.

**States.** Default as above. The picture is not interactive: it's a sample, and its button does
nothing, so it has no hover or pressed state and isn't focusable. Reduced motion: final state. Dark mode: the band
becomes Night Surface; the sheet stays paper, dimmed.

**Motion:** M5 (8.2).

---

### 9.5 After: "Then it's filed, and the papers come back to you."

**The copy, placed:**

- H2: "Then it's filed, and the papers come back to you."
- List: "The state's documents, saved and sent to you" · "CoFile applies for the EIN and keeps the
  IRS letter" · "An update at each stage"

**The treatment.** Back on Coated White, and the biggest photograph on the page. The headline sits
in columns 1 to 7 in Headline 1; the three list items stack in columns 9 to 12 between Hairlines,
top-aligned with the headline. Below them, PH-04 runs full bleed at 21:9, and the filed record lies
across its lower right, hanging below it.

**Desktop:**

```
════════════════════════════════════════════════════════════════════════════════════════════
│ Then it's filed, and the papers               │   ───────────────────────────────────────  │
│ come back to you.                             │   ▪ The state's documents, saved and sent  │
│                                               │     to you                                 │
│                                               │   ▪ CoFile applies for the EIN and keeps   │
│                                               │     the IRS letter                         │
│                                               │   ▪ An update at each stage                │
┌────────────────────────── PH-04 The hand-off, 21:9, full bleed ─────────────────────────────┐
│  the partner slides the folder across the café table; Lucia laughing; Ana's hand on it      │
│                                                                                             │
│                                                    ┌ the record, 600px ─────────────────────┐│
└────────────────────────────────────────────────────│ [H&P] Harbor & Pine CPA                │┘
                                                     │ ────────────────────────────────────── │
                                                     │ ●───────────●───────────●  ■           │
                                                     │ Approved    Submitted   Filed          │
                                                     │ ┌ NEW JERSEY ────────┐ ┌ IRS ────────┐ │
                                                     │ │ Certificate of     │ │ EIN letter  │ │
                                                     │ │ Formation          │ │ (CP 575)    │ │
                                                     │ │ TWO SISTERS        │ │ EIN         │ │
                                                     │ │ BAKERY LLC         │ │ 00-0000000  │ │
                                                     │ │ ≡≡≡≡≡≡≡≡≡≡         │ │ ≡≡≡≡≡≡≡≡    │ │
                                                     │ └────────────────────┘ └─────────────┘ │
                                                     └────────────────────────────────────────┘
                                                     Example record · sample documents
```

**Phone:** H2; PH-04 at 4:5 full bleed (the folder and the two sisters' hands); the record plate
overlapping its lower edge by 64px; the caption; then the list.

#### Picture 5: *The hand-off* (PH-04) with the filed record (replaces `PapersVisual`)

**What it shows.** The photograph shows the feeling: the accountant handing the two sisters their
papers, at their own café table, after closing. The plate shows the fact: the filing's record on
the firm's desk, every stage done, the state's document and the IRS letter saved in it.

**The record plate**, 600px, Sheet White, paper shadow:

- Slim Harbor & Pine nameplate (as in Requests).
- **The timeline:** three stages on a horizontal line, "Approved", "Submitted", "Filed", labels in
  National 2 Medium 16px under 14px Live Green filled dots, joined by a 2px Press Black line. After
  "Filed": the **end mark**, a 14px Gold Leaf square on the line's baseline. This is the end mark's
  one appearance on the home page, and it's the most literal: the story is filed.
- **Two document cards**, 230 × 290px, side by side, 16px apart, each a sheet with a hairline edge.
  They are not facsimiles of real documents (7.2): no seals, no letterheads, no IRS or state marks.
  Each has, at the top, a kicker in National 2 Medium 12px capitals ("New Jersey", "IRS"), the
  document's name in Publico Headline Medium 20px ("Certificate of Formation"; "EIN letter (CP
  575)"), the value in GT America Mono 15px ("TWO SISTERS BAKERY LLC"; "EIN 00-0000000"), and below,
  six neutral gray bars suggesting the page's text, nothing more.
- Caption: "Example record · sample documents".

**Composition.** The photograph at 21:9 bleeding both edges. The record's top edge sits at 62% of
the photograph's height, its right edge on column 12's right edge, so it lies across the table in
the picture, right where the folder is going.

**States.** Default as above. Reduced motion: final state. Dark mode: photograph unchanged; plate
dimmed paper.

**Motion:** M6 (8.2).

---

### 9.6 Coverage: "The filings your clients already ask you for."

**The copy, placed:**

- H2: "The filings your clients already ask you for."
- Lede: "New York, New Jersey, Florida and the IRS. See which are live today" (the last four words
  are the link to What we file)
- Legend: "Live" · "Rehearsed to the payment screen" · "Screens recorded or offered, rehearsal next"

**The treatment.** A full-width panel, set like the markets box on the front of a financial paper:
four places, side by side, with column rules between them, every filing readable at a glance and
nothing decorated. Headline and lede left-aligned above it across columns 1 to 8.

**Desktop:**

```
════════════════════════════════════════════════════════════════════════════════════════════
The filings your clients already ask you for.
New York, New Jersey, Florida and the IRS. See which are live today ──→
──────────────────────────────────────────────────────────────────────────────────────────── 2px
New York              │ New Jersey            │ Florida               │ IRS
───────────────────── │ ───────────────────── │ ───────────────────── │ ─────────────────────
○ LLC formation       │ ◐ LLC formation       │ ◐ LLC formation       │ ○ EIN, with the IRS
○ Corporation         │ ◐ Standing            │ ◐ Corporation         │   letter
  formation           │   certificate         │   formation           │
○ Payroll registration│ ○ Payroll registration│ ◐ Limited partnership │
  (NYS-100)           │   (NJ-REG)            │                       │
○ LLC changes and     │ ○ Corporation         │                       │
  dissolution         │   formation           │                       │
○ Copies and          │                       │                       │
  certificate of      │                       │                       │
  status              │                       │                       │
○ Application for     │                       │                       │
  Authority           │                       │                       │
○ Assumed name (DBA)  │                       │                       │
──────────────────────────────────────────────────────────────────────────────────────────── 1px
● Live    ◐ Rehearsed to the payment screen    ○ Screens recorded or offered, rehearsal next
```

**Phone:** H2, lede, then the four places stacked, each with its name and its list, separated by
Oxford rules; the legend at the end. No collapsing: everything visible.

#### Picture 6: *The markets panel* (replaces `StateTiles`)

**What it shows.** Each place, each filing type, and where it stands, as of today (the data comes
live from the coverage list and the deployment's live switch; "Planned" types are left off, as
today).

**Design:**

- A 2px Press Black rule above the panel, a 1px rule below the last row, and column rules between
  the four places. No boxes, no cards, no fills: a newspaper panel, not a dashboard.
- **Place names** in Publico Headline Bold 32px, then a 1px rule.
- **Rows:** National 2 17px, 36px row height, the status mark hung in the left margin of each
  column so the names align. Columns end where their lists end; nothing is padded to match.
- **Status marks** (12px), shape first, color second: Live is a filled Live Green circle;
  "Rehearsed to the payment screen" is a circle half-filled in Gold Leaf with a Burnished Gold
  outline; "Screens recorded or offered, rehearsal next" is a 1.5px Press Black ring. Each row also
  carries its full status label for screen readers, and as a tooltip on hover and long-press, so no
  one has to decode a dot.
- **Legend** under the panel, in Caption style, with the three marks.

**States.** As data changes, marks change (a filled circle replacing a half-filled one is the whole
"something went live" story, and it should look like a small, satisfying fact). Dark mode: rules in
Night Ink, Live and gold marks in their dark versions.

**Motion:** M7 (8.2).

---

### 9.7 Rehearsals: "In beta: rehearse a filing, free."

**The copy, placed:**

- H2: "In beta: rehearse a filing, free."
- Lede: "CoFile fills in every screen of the state's real website and stops before the last button:
  nothing is filed or paid. Filing types go live one at a time."

**The treatment.** Picture left (columns 1 to 8), text right (columns 9 to 12). The headline in
Headline 1: "In beta:" sits on the first line, "rehearse a filing, free." on the second (a balanced
break at the colon).

**Desktop:**

```
════════════════════════════════════════════════════════════════════════════════════════════
┌ cols 1–8: the contact sheet, on Newsprint ──────────────────────┐  ┌ cols 9–12 ───────────┐
│ Rehearsal · New Jersey LLC formation                test details │  │ In beta:             │
│  1           2           3           4                           │  │ rehearse a filing,   │
│ ┌────────┐ ┌────────┐ ┌────────┐ ┌────────┐                      │  │ free.                │
│ │ screen │ │ screen │ │ screen │ │ screen │                      │  │                      │
│ └────────┘ └────────┘ └────────┘ └────────┘                      │  │ CoFile fills in      │
│  5           6           7                                       │  │ every screen of the  │
│ ┌────────┐ ┌────────┐ ┌────────┐                                 │  │ state's real website │
│ │ screen │ │ screen │ │Pay Now │                                 │  │ and stops before the │
│ └────────┘ └────────┘ └────────┘                                 │  │ last button: nothing │
│ ─────────────────────────────────────────────────────────────── │  │ is filed or paid.    │
│ 1 Business name ................................. filled         │  │ Filing types go live │
│ 2 Name check .................................... passed         │  │ one at a time.       │
│ 3 Registered agent .............................. filled         │  └──────────────────────┘
│ 4 Members and signatures ........................ filled         │
│ 5 Review page ................................... matched the proof │
│ 6 Payment: $103.50 .............................. matches the proof │
│ 7 Pay Now ....................................... held, on purpose  │
└──────────────────────────────────────────────────────────────────┘
Rehearsal · nothing filed, nothing paid
```

**Phone:** H2, lede, then the frames as a sideways strip inside the picture (each frame 200px wide,
scroll-snap, frame 2's edge showing), then the log as a full-width table, then the caption.

#### Picture 7: *The contact sheet* (replaces `RehearsalLog`)

**What it shows.** A rehearsal of a New Jersey LLC formation, the way a photo editor sees a shoot:
every frame, in order, on one sheet. Seven frames, one for each line of the rehearsal log, and the
log itself set underneath like the frame notes.

**Design:**

- **The sheet:** a Newsprint ground, 32px padding. The header line, "Rehearsal · New Jersey LLC
  formation" in National 2 Medium 16px at the left and "test details" in Caption style at the right,
  over a 1px rule.
- **Frames:** 4:3, 164px wide on desktop, Sheet White, square corners, a 1px Press Black keyline
  (the film edge). Each is a neutral redraw of that step's screen (7.4): a plain gray header band,
  field rows, and our test values in GT America Mono at thumbnail size. Frame 7 shows the payment
  screen with its "Pay Now" button drawn plainly, unpressed, the same as every other button on the
  sheet. Above each frame, its number in GT America Mono 12px, Caption Gray, the way edge numbers
  run along a strip of film.
- **The log:** under the frames, a box score: seven numbered rows in National 2 Narrow 17px, the
  step at the left, the result at the right, dotted leaders between (like a table of contents):
  "Business name" · "filled", "Name check" · "passed", "Registered agent" · "filled", "Members and
  signatures" · "filled", "Review page" · "matched the proof", "Payment: $103.50" · "matches the
  proof", "Pay Now" · "held, on purpose". Results in Press Black; "held, on purpose" in Publico Text
  Italic, as a plain note, with no color and no icon.
- **Caption:** "Rehearsal · nothing filed, nothing paid".
- No gold in this picture. It's a working document.

**States.** Hover or focus on a frame (desktop) highlights its log row with a Newsprint-darker band
(`#E6E1D6`) and vice versa. Reduced motion: all frames developed at once. Dark mode: the sheet
becomes Night Surface; frames stay light, dimmed.

**Motion:** M8 (8.2).

---

### 9.8 Pricing: "$45 a filing. EIN included with a formation."

**The copy, placed:**

- H2: "$45 a filing. / EIN included with a formation."
- The four items: "Pay as you go" / "per live filing" · "$25" / "an EIN on its own" · "$15" /
  "copies and certificates" · "Plans from $250" / "a month for 6 filings"
- Small line: "State fees separate. Rehearsals free. See all plans" (the last three words link to
  Pricing)
- The security line: "Social Security numbers encrypted and deleted 30 days after the filing. Saved
  cards held in a card vault, never in our database. Security" (the last word links to the
  Security page)

**The treatment.** No photograph. For this reader a well-set number *is* the picture. The section is
a printer's rate card: the headline's figure is the biggest number on the page after the banner,
and the four items sit in a ruled strip beneath it.

- **The headline:** "$45" is set in the Figure style at 112px (the dollar sign at 55%, raised to cap
  height); "a filing." follows on the same baseline in Headline 1 (64px); "EIN included with a
  formation." on the second line in Headline 1. One H2; the figure is simply larger. (Phone: "$45"
  at 72px, the rest at 34px.)
- **The strip:** a 2px Press Black rule above, a 1px rule below, four equal cells with column rules.
  In each cell the bold part in Publico Headline Bold 36px, lining tabular figures ("Pay as you go",
  "$25", "$15", "Plans from $250"), and under it the description in National 2 17px Caption Gray.
  On desktop the cells are 24px padded; the figures align on a common baseline across the strip.
- **The small line** under the strip, in Small style, left-aligned.
- **The security line** below, set as a quiet sidebar: a full-width Newsprint band 24px tall top and
  bottom, a Hairline above, the sentence in National 2 16px Press Black, and "Security" as a normal
  text link. No icon, no lock, no shield. One line of reassurance, and the door to the page for
  anyone who wants it.

**Desktop:**

```
════════════════════════════════════════════════════════════════════════════════════════════
 $45 a filing.          ← "$45" at 112px with the raised dollar sign; "a filing." at 64px
 EIN included with a formation.
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 Pay as you go         │ $25                   │ $15                   │ Plans from $250
 per live filing       │ an EIN on its own     │ copies and            │ a month for 6 filings
                       │                       │ certificates          │
────────────────────────────────────────────────────────────────────────────────────────────
 State fees separate. Rehearsals free. See all plans
▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓ Newsprint ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓
 Social Security numbers encrypted and deleted 30 days after the filing. Saved cards held in a
 card vault, never in our database. Security
```

**Phone:** the strip becomes a 2 × 2 grid with column and row rules; everything else stacks.

**Motion:** none (M9).

---

### 9.9 Close: "Run one rehearsal. Then decide."

**The copy, placed:**

- H2: "Run one rehearsal. / Then decide."
- Lede: "Try it on a filing you know by heart. Questions? hello@cofile.app" (the email is a link)
- Button: "Run a free rehearsal" (Gold Leaf, large)

**The treatment.** The back page. A photograph bleeding off the left edge, the text on the right,
lots of air. The headline in Headline 1 at 64px, one sentence per line. The button the same large
gold button as the hero: the page opens and closes on the same action.

**Desktop:**

```
════════════════════════════════════════════════════════════════════════════════════════════
┌ PH-05, 4:5, bleeds left, cols 1–6 ───────┐
│                                           │     Run one rehearsal.
│     [ your firm's name, in gold leaf,     │     Then decide.
│       on the glass; office light on ]     │
│                                           │     Try it on a filing you know by heart.
│                                           │     Questions? hello@cofile.app
│                                           │
│                                           │     [ Run a free rehearsal ]
│                                           │
└───────────────────────────────────────────┘
 [caption: copy needed]
```

**Phone:** PH-05 at 4:5 full bleed; then the H2, lede and full-width button.

#### Picture 8: *Your door at dusk* (PH-05; my addition, the Close had no picture)

**What it shows.** A door in the same corridor as the two firms' doors, at dusk, the office light on
behind the glass, and on the glass, in gold leaf, the visitor's own firm name if they typed it in
the hero; otherwise "Harbor & Pine CPA". It's the promise of the whole page in one frame: your name
on the door, and the light on.

**Composition.** The door dead-on at 4:5, the glass panel in the upper half, the lettering on it at
one third from the top, a warm corridor sconce at the frame's edge. The photograph bleeds off the
left edge of the viewport; its right edge sits on column 6.

**Caption.** It's an example picture (a photo illustration with an example name, or with the
visitor's), so it carries a small example label `[copy needed]`, plus its alt text `[copy needed]`.

**States.** Example name (default); the visitor's name (lettered by the gilding engine, 7.6); no
WebGL (a pre-rendered still with "Harbor & Pine CPA" if the visitor hasn't typed a name; the
unlettered clean plate if they have); reduced motion (lights on, lettering lit, no sweep); dark mode
(unchanged: it was always dusk).

**Motion:** M10 (8.2).

---

## 10. The other pages

### 10.0 The inner-page template

Every page behind the home page opens the same way, like a section front in a newspaper:

- **Kicker** with a 48px Press Black rule after it.
- **H1** in Headline 1 (64px desktop, 36px phone) across columns 1 to 9, one sentence per line.
- **Lede** across columns 1 to 7 in Lede style.
- An **Oxford rule** under the opener, then the page's sections, each opened by an Oxford rule (or
  a quiet opener for sidebars).
- Many of these pages end in a close (a headline, a line, a button): set centered on a Newsprint
  band, 128px padding, the headline in Headline 2, the gold button under it.
- The pictures from the home page are reused where the copy reuses them (the same components, so
  they stay in step with the product), always at a different crop or scale from the home page, so
  a reader who comes from the home page doesn't feel they're seeing the same page twice.

### 10.1 How it works (`/how-it-works`)

The explainer. A business magazine would run this as a "how it works" spread with a big process
graphic up front, and that's what it is.

**Opener.** Kicker "How it works"; H1 "Your client asks. / You approve it. / CoFile files it." (three
sentences, three lines); lede "Three steps. Your client hands the job to you, and you sign off
before anything is filed."

**The steps (picture: *The triptych*, my addition).** Three columns, each with a photograph, a big
numeral and the step's text:

```
●──────────────────────────────●──────────────────────────────●          route line, 2px
1                              2                              3          Publico Headline Bold 72px
┌ PH-03 crop, 4:5 ─────────┐   ┌ PH-07, 4:5 ──────────────┐   ┌ PH-06, 4:5 ──────────────┐
│ Ana texting at the       │   │ the partner reading the  │   │ a CoFile filing          │
│ counter                  │   │ proof at her desk        │   │ professional at work     │
└──────────────────────────┘   └──────────────────────────┘   └──────────────────────────┘
Your client asks. They fill    You approve it. You get the    CoFile files it. It fills in
in a short form from your      proof: one page with your      the state's own website
link, or text or email you,    firm's name at the top,        screen by screen, checks the
and you forward it; or you     showing every detail and       fee again before paying, and
fill it in yourself. Your      every fee.                     brings back the state's
saved answers fill in the                                     documents. When a filing needs
rest: registered agent,                                       a person, one of the filing
organizer, signer, addresses.                                 professionals who run CoFile
                                                              takes over. You hear about
                                                              each stage.
```

- Each step's bold lead ("Your client asks.", "You approve it.", "CoFile files it.") is a run-in
  head in National 2 Bold 19px, the paragraph continuing in National 2 18px.
- The route line runs across the tops of the three columns with a 14px Press Black dot at each
  numeral. The middle step, the firm's, carries the graphic's one Gold Leaf touch: a 3px gold
  underline under its numeral. You are the middle of the process.
- Captions under each photograph `[copy needed]`.
- Phone: the three stack; the route line turns vertical, running down the left margin.

**"You see what the state will see, before the state does."** Text left (columns 1 to 5): the H2,
then the long lede in Body style (Publico Text 20px; it's a paragraph to read, not a slogan), then
**PH-08 *The printer's proof*** inset at 3:2 across columns 1 to 5 with its caption `[copy needed]`:
the copy's own analogy ("business cards, letterhead, an invitation at the printer") in a picture.
Then the six items as a list with square bullets. The sixth, "Like reviewing a return before you
e-file it: nothing goes to the state until you've signed off.", is the line every CPA will
remember, so it's set as a pull quote: Publico Headline Medium Italic 28px, a 2px Press Black rule
above it, still in its place as the last item. Right (columns 7 to 12): *The page proof* (picture
4), at full scale, sticky on desktop while the long left column scrolls past it (sticky releases at
the section's end).

**"Clients don't always fill in forms. They text you."** Text right this time (columns 9 to 12),
*The counter* (picture 3) left at columns 1 to 8.

**"Checks before every filing."** (anchor `#checks`, linked from the Security page). A sidebar:
Newsprint band, quiet opener, H2 in Headline 2 (48px). Heading and lede in columns 1 to 4; the
four items in a two-by-two grid in columns 5 to 12 with column and row rules, National 2 18px. No
icons and no picture. It's here for the reader who wants it, at the weight of a well-set sidebar.

**"The papers come back to you."** Text left (columns 1 to 5) with the lede and the three items;
right, *The hand-off* in a 3:2 crop with the record plate (picture 5) overlapping its lower edge.

**Close.** "Run one rehearsal. Then decide." with its lede, and two buttons: "Run a free rehearsal"
(gold) and "Questions" (outline).

### 10.2 For firms (`/for-firms`)

The cover story, about the reader.

**Opener (picture: *The partner at the door*, PH-09).** Kicker "For CPA, payroll, fractional CFO
and title firms"; H1 "Form the business. / Keep the client."; then the lede, long and conversational
(Lede style, columns 1 to 7). Under the opener, full bleed at 21:9, the partner in her doorway, her
firm's name in gold leaf on the glass beside her. Caption `[copy needed]`. On phones, 4:5.

**"Your filing desk, in your brand."** Text left (columns 1 to 4) with its five items; picture
right: **the desk, interactive** (picture 1A's plate at 680px, without the photograph), and under
it a **brand bar** (my addition) that lets the visitor try what setup does:

```
┌ desk plate, 680px, in the chosen brand ───────────────────────────────┐
│ [logo] Harbor & Pine CPA                                  Filing desk  │
│ ═════════════════════════════════════════════════════════════════════ │
│ …rows…                                                    with CoFile■ │
└───────────────────────────────────────────────────────────────────────┘
 [ name: click to type ]   ● ● ● ● ● ●   [ logo: H&P | NG | none ]
                           harbor brick navy forest burgundy yellow
 Example · test details · not a real firm
```

- **Name:** the same editable nameplate as the hero (it remembers what was typed there).
- **Color:** six 28px swatches: harbor blue `#1D4E63`, brick `#9A3B26`, navy `#1F3A5F`, forest
  `#2F5D46`, burgundy `#7A2232`, bright yellow `#F2C200`. Choosing one recolors the rule, the
  button and the selected row (240ms crossfade). Bright yellow shows the system at work: the rules
  go bright yellow, the button uses the deepened `#8A6D00`, and a small graphic note shows both
  chips side by side `[copy needed]`.
- **Logo:** three choices: the H&P monogram, Northgate's white logo (which switches the nameplate
  to the band variant), and none (the name typeset in Publico Headline with the italic ampersand).
- Control labels and swatch names for screen readers `[copy needed]`.
- The fifth item, "CoFile is built and run by filing professionals. When a filing needs a person,
  one of them takes over.", gets the byline portrait (1B) beside it.

**"Your name on the door. Ours in small type."** Same two-size headline as the home page; lede;
then *Two doors* (picture 2), here at the full 12 columns, with the corridor wide shot of PH-02
above the two doors as a 21:9 establishing frame.

**"Your registered agent, or ours."** Text left with the lede and three items (each with its link);
right, a small inset (my addition): a crop of the draft plate (picture 3) showing just two rows,
"Registered agent · Your saved agent · already filled" and "Organizer and signer · Your saved
answers · already filled", at 1.25× scale. Caption: the example label `[copy needed]`.

**Close (picture: *Your door at dusk*, PH-05).** "Open your firm's filing desk." with its lede and
the gold button, laid out like the home page's close: the door with the visitor's name (or the
example's) bleeding off the left.

### 10.3 What we file (`/what-we-file`)

The listings page. A financial paper's data pages are the most read and the least designed; these
should be the reverse.

**Opener.** Kicker "What we file"; H1 "New York, New Jersey, Florida and the IRS."; lede.

**The coverage table (picture: *The stage track*, my addition inside the table).** Sixteen rows, the
columns "Filing", "Where" and "Where it stands", in the order the copy gives them.

```
Filing                                            Where        Where it stands
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
                                                               Planned ─ Offered ─ Recorded ─ Rehearsed ─ Live   (key)
LLC formation                                     New Jersey   ○────○────○────●────○   ◐ Rehearsed to the payment screen
Standing certificate (through the API; not on     New Jersey   ○────○────○────●────○   ◐ Rehearsed to the payment screen
the filing desk yet)
…
Alternate name, charter amendments                New Jersey   ●────○────○────○────○   Planned
```

- Header: National 2 Medium 15px, a 2px Press Black rule above, 1px below.
- Rows: 56px minimum, Hairlines between, "Filing" in National 2 17px Press Black, "Where" in
  National 2 17px Caption Gray.
- **Where it stands:** a five-step track (2px Hairline line, 10px stops) running Planned, Offered,
  Screens recorded, Rehearsed, Live, with the row's stage filled: Press Black for planned, offered
  and recorded; Gold Leaf for rehearsed; Live Green for live. After the track, the row's own chip
  with its exact label ("Rehearsed to the payment screen", "Screens recorded, rehearsal next",
  "Offered, not yet rehearsed", "Planned", "Live"). The key above the column uses the exact stage
  labels in Caption style; on desktop it's set as five short labels over the five stops (the full
  labels wrap to two lines where needed); on phones the key is a list above the table.
- Phone: each row becomes a block: the filing in National 2 Medium 17px, "Where" under it in
  Caption Gray, then the track full width, then the chip.
- The note under the table ("Rehearsed to the payment screen: …") in Small style, columns 1 to 8,
  with the email link.

**"How a filing type goes live."** Text left (columns 1 to 5) with the lede; *The contact sheet*
(picture 7) right.

**"State by state."** Four columns with column rules (two by two on tablet, stacked on phone). Each
place's name (the H3) is set as a wire-story **dateline**: National 2 Bold 15px capitals, +8%
tracking, followed by a drawn 24px rule, with the note running on in National 2 18px. It's how a
correspondent's dispatch starts, and these four paragraphs are dispatches.

**Close.** "Rehearse one you know by heart." with two buttons: "Run a free rehearsal" and "See
pricing".

### 10.4 Pricing (`/pricing`)

The rate card, in full.

**Opener.** Kicker "Pricing for firms"; H1 "$45 a filing. / EIN included with a formation." with
"$45" in the Figure style at 112px (as on the home page); lede. Under the lede (picture: *The
people*, my addition): three 72px square byline portraits of CoFile's filing professionals in a
row, names and roles under each in Caption style `[copy needed]`, because the lede says "Every plan
is backed by filing professionals" and I want to show them. If names aren't approved, this picture
doesn't run.

**The plans.** Four columns under a 2px Press Black rule, with column rules, like a printed rate
card:

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
                       │                      ▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀ (gold) │
 Pay as you go         │ Starter              │ Growth               │ Unlimited
 ˢ45 a filing          │ ˢ250 a month         │ ˢ500 a month         │ ˢ1,000 a month
 No monthly fee. Pay   │ or $2,500 a year     │ or $5,000 a year     │ or $10,000 a year
 only for live filings.│ (2 months free)      │ (2 months free)      │ (2 months free)
 ───────────────────── │ ──────────────────── │ ──────────────────── │ ────────────────────
 ▪ $25 for an EIN on   │ ▪ 6 filings a month  │ ▪ 15 filings a month │ ▪ Unlimited filings
   its own             │ ▪ $40 for each       │ ▪ $33 for each       │   (fair use: 60 a month)
 ▪ $15 for copies and  │   filing past that   │   filing past that   │ ▪ $15 for each filing
   certificates        │ ▪ A filing           │ ▪ A filing           │   past fair use
 ▪ A filing            │   professional takes │   professional takes │ ▪ Priority help from a
   professional takes  │   over when a filing │   over when a filing │   person
   over when a filing  │   needs one          │   needs one          │ ▪ A filing professional
   needs one           │                      │                      │   takes over when a
                       │                      │                      │   filing needs one
```

(The "ˢ" in the sketch stands for the raised dollar sign, 5.3: the figures are "$45", "$250",
"$500", "$1,000".)

- Plan names in Headline 3; prices in the Figure style (72px), with "a filing" / "a month" in
  National 2 18px on the same baseline; the annual line in Small style, Caption Gray.
- The **Growth** column (the one the code marks as the middle plan) gets a 4px Gold Leaf rule on
  top and a Newsprint fill: emphasis without a badge or a new word.
- The last line of every plan, "A filing professional takes over when a filing needs one", is set
  apart below a Hairline in National 2 Italic, so it reads as the promise that runs under all four.
- Phone: the four stack, each as a full-width card between Oxford rules; Growth keeps its gold rule.
- The note ("Prices in US dollars, for partner firms. …") in Small style under the card, with its link.

**"What counts as a filing." (picture: *The units*, my addition).** Text left with the lede and the
five items, each with its bold lead in National 2 Bold. Right, a small graphic from the graphics
desk: three squares, 72px, in a row, each a Press Black outline filled with Gold Leaf to its share:
a full square labeled "One filing", a half-filled square labeled "An EIN on its own", a
third-filled square labeled "Copies and certificates" (labels are the copy's bold leads, in National
2 Narrow Medium 15px). The square is the end mark's shape, so the units are measured in our own mark.

**"What's separate."** The four items in two columns with a column rule, bold leads in National 2
Bold. No picture.

**Close.** "Start with a free rehearsal." with its lede and the gold button.

### 10.5 Security (`/security`)

A plain, well-set reading page. Nothing on it is illustrated, and that's the design: it reads like a
straightforward page of facts.

- **Opener.** Kicker "Security"; H1 "How we handle what you trust us with."; lede.
- **The five items** set as newspaper columns: three columns on desktop (CSS columns with a
  Hairline column rule, items kept whole), two on tablet, one on phones. Each H3 in National 2 Bold
  18px, the paragraph in National 2 18px/28px.
- **The last paragraph** in Lede style across columns 1 to 8, with its three links.
- The end mark closes the page after the last sentence.
- No locks, shields, vaults, padlocks, keys, checkmarks in circles, fingerprints or anything blue
  and glowing.

### 10.6 Questions (`/faq`)

Set like a magazine Q&A: big questions, readable answers.

- **Opener.** Kicker "Questions"; H1 "Questions, answered."; lede "Something else? hello@cofile.app".
- **The fourteen questions** in one column (columns 3 to 10 on desktop, centered measure). Each
  question is a full-width row, 72px minimum, the question in Headline 4 (Publico Headline Medium
  24px), a drawn "+" at the right (two 2px lines, 18px), Hairlines between rows. Open, the "+"
  becomes "−" and the answer appears in Publico Text 19px/30px, at most 64 characters a line, with
  32px below it.
- Deep links (`/faq#rehearsal`) open that answer and scroll to it with 96px of headroom.
- "Is a person involved?" carries the byline portrait (1B) beside its answer.
- Print stylesheet: all answers open, no "+" marks.

### 10.7 For platforms (`/platforms`)

A change of register for a different reader: the business section.

- **Opener on Press Black.** The page head runs on a full-bleed Press Black band: the kicker "For
  platforms" in Night Caption, the H1 "Building a filing product? / Put CoFile underneath it." in
  Coated White Headline 1, the lede in Night Ink.
- **Picture: *The cutaway* (my addition).** Under the lede, still on the dark band: a large graphic
  of a platform's own product page, drawn as an unbranded, neutral interface in grays (a header bar,
  a form, a button; no words other than `[copy needed]` placeholders), with its lower-right corner
  cut away on a clean 45° line. Through the cut you see the layer underneath: Press Black, and on
  it, in GT America Mono 20px, `"dryRun": true`, with `true` in Night Gold. The cut edge shows three
  hairline strata, like a cross-section, so it reads as "underneath" without a word. Caption and
  alt text `[copy needed]`.
- **The list and the form.** On the same dark band: the five items on the left (columns 1 to 6) in
  Night Ink, National 2 18px, square bullets in Night Caption; `"dryRun": true` as inline code on a
  Night Surface chip; "Read the API docs" as an underlined link. On the right (columns 8 to 12), the
  inquiry form as a **reply card**, the way business magazines bound one in: a Sheet White card,
  32px padding, Press Black text, fields as in section 11, and the gold submit button. White card on
  black band: the one place on the site where you're asked to write to us, and it looks like it.
- Fields, in order: "Name", "Company", "Work email", "Phone (optional)", "States you file in" (New
  York, New Jersey, Florida, Several of these, Other states too), "Filings per month" (Under 50, 50
  to 250, 250 to 1,000, Over 1,000), "What you'd like to do (optional)". The spam trap ("Leave this
  field empty…") is visually hidden.
- Phone: everything stacks on the dark band; the reply card goes full width with 20px margins.

### 10.8 Sign-up, log-in, password and verification

All of these are CoFile's own pages (register 1), with the header (no section navigation) and the
footer.

**Sign-up: "Set up your firm's filing desk"** (picture: *Your door*, PH-05, my addition). The one
account page that gets a photograph, because its own copy asks you to "put your name and logo on
the door".

```
┌ cols 1–6: the form ─────────────────────────┐  ┌ cols 7–12: PH-05, sticky ───────────────┐
│ FOR FIRMS ────                               │  │                                         │
│ Set up your firm's                           │  │     [ the Firm name field, lettered     │
│ filing desk                                  │  │       in gold leaf on the glass,        │
│ For firms that file for their clients.       │  │       as you type ]                     │
│ Confirm your email, put your name and logo   │  │                                         │
│ on the door, and choose which card pays the  │  │                                         │
│ state's fees. Your first filing can be a     │  │                                         │
│ free rehearsal: nothing filed, nothing paid. │  │                                         │
│ Firm name            [__________________]    │  │                                         │
│ (Choose one)         [CPA or accounting… ▾]  │  └─────────────────────────────────────────┘
│ Your name · Work email · Password · …        │    [caption: copy needed]
│ ☐ I agree to the Terms of Service and the    │
│   Privacy Policy                             │
│ [ Create account ]                           │
│ Building a filing product? See CoFile for platforms.
└──────────────────────────────────────────────┘
```

- The form in one column (480px), fields per section 11, in their order: "Firm name", the kind of
  firm ("Choose one": "CPA or accounting firm", "Payroll company", "Fractional CFO firm", "Title
  company", "Something else"), "Your name", "Work email", "Password", "Password again" with its
  hint, "Phone (optional)", "Website (optional)", "States you file in", the filings-a-month choice,
  the agreement checkbox, and "Create account" (gold, large, full width of the column).
- The door photograph is sticky on desktop and letters the "Firm name" field's value, live, with the
  gilding engine (debounced 300ms; one highlight sweep when the field loses focus). If the visitor
  typed a name in the hero, the field arrives prefilled and the door already carries it.
- Phone: the photograph runs first as a 16:9 band (the glass and its lettering only), then the form.
  The band stays at the top as you type the firm name, then scrolls away.

**Log in: "Welcome back".** A turnstile, so: fast and plain. A single centered column, 440px, on
Coated White. Kicker "Log in"; H1 "Welcome back" in Headline 2; the line "Firms go to their filing
desk, platforms to their dashboard." in UI style. "Continue with Google" as an outline button with
Google's own mark as their guidelines require, then a Hairline with space, then "Email",
"Password", "Forgot your password?" (text link under the password field, right-aligned), the gold
button, and "New here? Set up your firm's filing desk. Enterprise developers can also log in with an
API key." in Small style. Messages ("Your session ended. Log in again to carry on.", "Your password
is changed. Log in with the new one.", "Your account is ready. Log in to set it up.", the Google
errors, "Your account is waiting for approval. We'll email you when it's ready.") appear as a notice
strip above the kicker (section 11).

**Forgot password, reset password, confirm your email, link expired, session ended.** The same
440px column template, each with a spot illustration (7.7) above the kicker at 120px:

| Page | Copy | Spot |
|---|---|---|
| Forgot password | "Forgot password" / "Reset your password" / "Enter the email you log in with. We'll send a link to choose a new password." / "Email me a reset link" / "Back to log in" | the envelope |
| Reset password | kicker "Reset password" / "Choose a new password" / "New password", "New password again", "At least 12 characters. A few unrelated words work well." / "Set new password"; an incomplete link: "This link isn't complete. Open it again from the email, or ask for a new one" | the envelope |
| Confirm your email | kicker "Your filing desk" / "Confirm your email" / "One click and your email is confirmed." / "Confirm my email"; resend: "Lost the email, or the link expired? …" / "Send a new link" | the envelope |
| Link expired | "This link has expired or isn't valid" / "Ask whoever sent it for a new invitation. Invitations now come by email with a link to set your own password." | the torn ticket stub |
| Session ended | not a page of its own: it returns to Log in with the notice "Your session ended. Log in again to carry on." | the lamp, switched off, beside the notice |

### 10.9 Terms and Privacy

Long-form reading, set like a well-made book page, because some firm owners will print them and
read them with a pen.

- One column of Body (Publico Text 20px/32px) at 66 characters, centered on desktop, with a sticky
  contents rail on the left from 1200px (National 2 15px, the section titles, the current one in
  Press Black with a 2px rule, the others in Caption Gray).
- H1 in Headline 1; section heads in Headline 3 with hanging section numbers in the margin.
- Defined terms in Publico Text Semibold. Lists with hanging numerals.
- The end mark after the last sentence.
- A print stylesheet: Publico Text 11pt on A4 and Letter, running heads with the page title, page
  numbers, URLs printed after links, no header, footer or banner.

### 10.10 404 and errors

**404: "Page not found"** (picture: *The clipped page*, PH-10). The photograph at 4:3 in columns 1
to 6: a page with a neat rectangle cut out of it, the desk showing through. Text in columns 8 to
12, vertically centered: H1 "Page not found" in Headline 1, "The link may be old or mistyped." in
Lede style, and "Go to the home page" as an outline button. Phone: the photograph first, then the
text. No jokes in words; the picture makes the one joke.

**Error: "Something went wrong"**. The coffee-ring spot illustration (120px), H1 "Something went
wrong" in Headline 2, "This page couldn't load just now. It's usually a short hiccup on our side."
and the buttons "Try again" (gold) and "Log in again" (outline). On a firm's pages, the same layout
under the firm's nameplate, with the spot drawn in Press Black only.

**Signed out of a filing desk** (`/p/<firm>/signed-out`, firm-branded): the firm's nameplate, the
lamp spot in Press Black, H1 "You're not signed in to this filing desk", and the copy's two lines
with "log in here" as a link.

### 10.11 The firm's filing desk (`cofile.app/p/<firm>`)

Register 2: the firm's brand leads. The test of the whole system is that a firm owner logs in, sees
their own name across the top, and feels they're in their own office.

**The chrome.**

```
┌──────────────────────────────────────────────────────────────────────────────────────────┐
│ [firm logo]  Harbor & Pine CPA                              ana@… (gray)   Log out       │  80px
│ ═════════════════════════════════════════════════════════════════════════════════════════ │  firm thick-thin rule
│ Filings   New filing   Ready to pay ①   Client links   Signatures   Setup   Billing      │  section tabs, 48px
│                                                                             with CoFile■ │
└──────────────────────────────────────────────────────────────────────────────────────────┘
```

- **Nameplate,** left-aligned: the logo at 4,000px² (3.4), then the firm's name in its own font
  or Publico Headline Medium 22px. The thick-thin rule in `--firm` runs the full width under it.
- **Section tabs** under the rule, like a newspaper's section bar: "Filings", "New filing", "Ready to
  pay", "Client links", "Signatures", "Setup", "Billing", in National 2 Medium 16px, 24px apart; the
  current one gets a 3px `--firm-ink` underline. "Ready to pay" carries a count when filings are
  waiting: a 20px `--firm-ink` disc with a white numeral.
- **Right:** the user's email in Caption Gray (a link to change the password where the code allows)
  and "Log out" as a text button. The imprint "with CoFile■" right-aligned under the tabs.
- **Footer:** "Questions? Email …" when the firm has a support email, in Small style.
- **Page head pattern:** H1 in Headline 2 (the firm's font, if any), with the page's main action as a
  button at the right of the same line ("New filing").
- **Phone:** the nameplate and a menu button in a 64px bar; the rule; the tabs become a sideways
  scrolling row under it (sticky, 48px), the current tab scrolled into view.

**Filings (the overview).**

- H1 "Filings" and the "New filing" button (`--firm-ink`).
- **Notices** above the table, as notice strips (section 11): "Real filings need an active
  subscription; rehearsals are free. Subscribe"; "1 approved filing is ready to pay and needs your
  card's security code. Pay and file"; "1 filing needs someone to act."
- **The table** (section 11): "Filing" (the business name in National 2 Medium 17px as a link, the
  "Test" badge after it for rehearsals), "Type", "Status" (chip), "Started" (date, tabular, Caption
  Gray). Rows 60px, Hairlines, hover in `--firm-wash`. A filing waiting for the firm's approval gets
  the 3px `--firm` bar on its left edge, as on the home page's desk.
- **Empty:** the clear-desk spot (Press Black only), "Your desk is clear. Start a filing (it can be a
  free rehearsal), or send a client a link with your logo on it.", and the two buttons "New filing"
  and "Send a client a link".

**Setup: "Set up your account".** A contents page with three numbered steps and the optional fourth:

```
Set up your account
Three short steps, plus registered agents if you want them. You can change any of them later.
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 1   Your firm      Name, kind of firm and who to contact.                 [ Set up your firm ]
 ─────────────────────────────────────────────────────────────────────────────────────────
 2   Branding       Your logo and color on the pages your clients see.    [ Set up branding ]
 ─────────────────────────────────────────────────────────────────────────────────────────
 3   Payment        Which card pays state fees: one card for everything,  [ Set up payment ]
                    or one per filing type, with a backup.
 ─────────────────────────────────────────────────────────────────────────────────────────
     Registered agents (optional)  Save the agent you use in each state, …  [ Add agents ]
```

Numerals in Publico Headline Bold 48px; done steps get a filled `--firm-ink` square behind the
numeral (white numeral). When all three are done: "You're set up", "You can change any of these at
any time.", and "Start a filing" as the primary button.

**Branding ("Step 2 of 3" · "Branding").** The page that makes a firm proud before it has filed
anything.

- **Left (columns 1 to 5): the fields.** "Logo": a 160px drop zone with a 1.5px dashed Field Line
  border, showing the uploaded logo twice, on paper and on the firm color, with the size we'll use;
  "A PNG, JPEG or WebP picture. A wide logo on a clear background looks best. Big pictures are shrunk
  for you."; "Remove logo"; "Or a link to your logo" / "Use a link instead". "Main color" and "Second
  color": a 44px swatch, the hex field ("Use a hex code like #1f4fd1."), and the ready colors as 32px
  swatches. "Font": choose from Google Fonts or upload a file (under 600 KB), with a live preview line.
- **Right (columns 6 to 12, sticky): the proofs of the brand.** Three live previews of the firm's
  pages, scaled to 60%, switched by tabs: the proof's top, the client's form, and an email. They
  update as the firm types. If we deepened the main color for buttons (3.5), the color field shows
  both swatches side by side, the color as given and the one used for buttons, so nothing happens
  behind the firm's back (labels `[copy needed]`). A light/dark toggle shows the dark-mode version.
- Phone: the previews become a single preview card above the fields that updates as you go.

**Your firm (Step 1 of 3), Payment (Step 3 of 3), Registered agents, Password:** forms in one
480px column with section heads in Headline 4, following section 11. Payment explains "Ready to pay"
with a link, in Small style.

**New filing: "Which state is the business in?"**

- H1 "New filing"; the question in Lede style; the small note with its link to What we file.
- "Or send us the details and we fill in the form for you to check:" and the email, text, WhatsApp
  and Slack lines in UI style, each address in GT America Mono.
- **Three state cards** in a row (stacked on phones): 220px tall, Sheet White, hairlined, the state
  name in Headline 3 (36px), the count line in UI style ("4 filing types, plus the federal EIN").
  Hover: a 3px `--firm` rule appears along the top edge (120ms). No maps and no state symbols.

**"New Jersey: what are you filing?"** The H1 in Headline 2, the line under it, then filing-type
cards in two columns: the title in Headline 4, the "Live" or "Rehearsal" badge, the summary in UI
style, the fee note in Small style with tabular figures. Below, the card "Your pages for clients"
with each page's address in GT America Mono 15px and the widget code in a code block (section 11).

**The new filing form** (`/new/<kind>`): "← Other filings" as a back link; the choice of "Send them a
link", "Start from a client you filed for before", "New client" or "Fill in" as four segmented
options (section 11); then the intake form (10.13) for the firm's own staff, with its submit button
"Create the proof" and the note "Next you get the proof to approve. Nothing is filed until you do."

**Filing detail.** The filing's own front page.

```
← Filings
NEW JERSEY LLC FORMATION                                       ◐ Waiting for approval   [Rehearsal]
Two Sisters Bakery LLC                                         (Headline 1, the firm's font)
┌ Your proof is ready ─────────────────────────────────────┐   ┌ right rail ─────────────────┐
│ ▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀ 4px firm rule                             │   │ Documents                   │
│ Check every detail and fee exactly as they'll go to the   │   │ ▭ (document rows)           │
│ state, then approve it or ask for changes. Nothing is     │   │ EIN: 00-0000000 (mono 28px) │
│ filed until you approve.                                  │   │ Open the record             │
│ [ Open the proof and approve it ]                         │   │ Save to Google Docs         │
│ We also emailed the link to …                             │   └─────────────────────────────┘
└───────────────────────────────────────────────────────────┘
Progress on the state site
 ● screen 1 ── ● screen 2 ── ● screen 3 ── ○ …        (a strip of the captured screens, the contact sheet)
```

- The kicker is the filing type; the H1 is the business name, large, in the firm's font. The client
  is the story.
- **"Your proof is ready"** is the first thing on the page whenever the firm needs to approve: a
  Sheet White card with a 4px `--firm` top rule, the heading in Headline 3, the copy's sentence in
  UI style, "Open the proof and approve it" as a large `--firm-ink` button, and the emailed-to line
  in Small style.
- **"Progress on the state site"**: the captured screens as a contact sheet (the same component as
  picture 7), with each frame's step and time, so the firm can see exactly what CoFile did.
- **"Documents"**: rows with a document glyph (a plain page outline, no seals), the name, the date,
  and a download link. **"EIN:"** set in GT America Mono 28px in a hairlined box: the number a new
  business will quote for the rest of its life deserves to be set big. When the filing is complete,
  the record closes with the end mark.
- "Pay and file", "Open the record", "Save to Google Docs" (with its note "A copy of this record in
  your Google account. People's Social Security numbers and ITINs are left out.") as secondary
  actions in the right rail. The signature note in Small style.
- Phone: one column; the proof card first, then documents and EIN, then progress, then actions.

**Client links.** H1 "Client links". The card "Send a client a link": "Filing" (select), "Who it's for
(shown to you and the client)", "Make link"; once made, the link in a GT America Mono field with
"Copy link" and "Email it from your mail app". Then "Links you sent" as a table: "For", "Filing",
"Made", "Status" (chips: "Waiting for the client" amber, "Turned off" gray outline, and "Used: open
the filing" as a link), "Turn off" as a text button.

**Requests from a text or email** ("Filing request"). "Your message" shown as the same message
bubble as the home page (for an email, the same bubble squared off, with the sender and subject in
Caption style above it). Then "This looks like a request for: …", "Open the filled-in form" (primary),
and "Not this filing? Choose another" with "Choose the filing". The other states ("Already sent as a
filing. Open the filing", the 30-day deletion note, "We couldn't find answers in your message for
this form.", "Reading emails automatically isn't switched on for this site yet.", "We couldn't tell
which filing this is.") as notice strips.

**Signatures.** H1 "Signatures"; "Saved signatures" with its paragraph; a table "Signer", "Saved",
"Last used", "Remove" (no signature images shown); "No saved signatures yet." with the capped-pen
spot; "Add a signature" opens the signature pad (section 11).

**Ready to pay.** H1 "Ready to pay" and its paragraph. One card per saved card: the card's name and
last four digits as the product gives them, the approved filings waiting on it as a small fee table
(tabular, the total with the double rule), one security-code field (GT America Mono 24px, 4 boxes
wide, `inputmode="numeric"`), and "Pay and file". Empty: "Nothing is waiting for a card right now."
with the face-down card spot.

**Billing.** H1 "Billing". The plan, set as one column of the rate card (10.4) with "your plan"
marked by the 4px `--firm` rule `[copy needed]` if a label is wanted; the plan picker as the four
rate-card columns; saved cards; the notices ("Your plan is changing. …", "Billing couldn't be loaded.
Try again shortly."). Invoices as a table with tabular figures and double-ruled totals.

### 10.12 The proof (the page the firm approves)

The most important page in the product, and the press check. It's reached from the filing desk
("Open the proof and approve it") and by email, and it carries the firm's nameplate, so the firm
sees its filing under its own name.

```
                          [ Harbor & Pine CPA logo ]
═══════════════════════════════════════════════════════════════════════  firm thick-thin
                                                           with CoFile■
┌ Rehearsal: nothing will be filed or paid, even if you approve. ──────┐  (rehearsals only)
(the filing's title, as the product gives it)                             (H1)
Filing reference …. Please decide by December 3, 2026, 5:00 PM Eastern.
After that, this link stops working and you'll need a new one.
┌ statement ───────────────────────────────────────────────────────────┐
│ By approving, you confirm every detail below is correct and           │
│ authorize its submission exactly as shown, and payment of the fees    │
│ shown, up to the total shown ($103.50). Government fees generally     │
│ can't be refunded once paid, even if the filing is rejected. …        │
│ Government sites don't save drafts, so once you approve, the whole    │
│ filing is sent in one go. Please check everything now.                │
└───────────────────────────────────────────────────────────────────────┘
The state's review page                       (H2) + its paragraph
[ the picture of the state's own review page, framed; tap to enlarge ]
Filing details                                (H2) [+ SSN note]
  label ........................ VALUE IN MONO
State fees                                    (H2) + "Nothing is charged on this page. …"
  Formation filing fee                                        $100.00
  NJ portal fee, by card                                        $3.50
  ───────────────────────────────────────────────────────────────────
  Total                                                       $103.50
                                                              ═══════
  Maximum you authorize      $…… (if the state asks for more, we stop before paying)
One-time code sent to you      [ □ □ □ □ □ □ ]                 (when required)
What should change? (Needed only if you ask for changes)
[ textarea ]
[      Approve, and authorize submission and payment      ]   60px, --firm-ink
[                    Request changes                      ]   outline
Questions: …
```

- **Width** 720px, centered; phone full width with 20px margins. Coated White page; the content is
  not a card, it *is* the page.
- **Nameplate** as in 3.4, centered, with the imprint under the rule at the right.
- **Rehearsal note:** a notice strip with a 4px Press Black left rule on Newsprint, the sentence in
  National 2 Bold 17px. Unmissable but calm.
- **H1** in Headline 2 (48px desktop, 30px phone) in the firm's font; the deadline line under it in
  UI style.
- **The statement** (the approval consent, verbatim) in a box with a 1px Press Black border and
  24px padding, in Publico Text 18px/29px, not small type: this is what the firm is agreeing to, and
  it should be read.
- **The state's review page:** the H2, its paragraph, and the image in a hairlined frame at full
  column width, captioned with its alt text. On phones, tap opens it full screen with pinch-zoom.
- **Filing details:** H2, the SSN note when present (Small style), and the table: labels in National
  2 15px Caption Gray (40%), values in GT America Mono 17px, nested groups indented 16px with their
  group label as a row head in National 2 Medium. Masked SSNs ("***-**-1234") in mono as they are.
- **State fees:** National 2 Narrow 18px, amounts right-aligned on the decimal, the total in Bold
  with the double rule, "Maximum you authorize" as a final row in UI style.
- **Approving:** the one-time code field (six boxes, GT America Mono 28px), the change textarea
  (labelled as the copy gives it), then **"Approve, and authorize submission and payment"** as a
  60px `--firm-ink` button, full width; its label is long, so it wraps to two centered lines on
  phones and the button grows. "Request changes" as a full-width outline button below, with 16px
  between them so neither can be hit by mistake.
- **No sticky approve button.** The copy asks the firm to "check everything now"; a button that
  follows you down the page invites approving without reading. Instead, a 2px `--firm` reading
  progress rule along the top of the viewport.
- **After deciding** (the decision page): the same nameplate, the heading in Headline 2, the
  paragraphs in UI style, the questions line. Nothing else. A finished page should look finished.

### 10.13 The client's pages: filing pages, client links and the intake form

These are the only pages a firm's client sees (with the emails), so they're where "Your logo and
color on every page your client sees" is kept.

**The page for each filing a firm offers** (`cofile.app/bestaccounting/llc-filing-new-york`):

```
                         [ Best Accounting logo ]
══════════════════════════════════════════════════════════════════  firm thick-thin
                                                       with CoFile■
┌ This page is in rehearsal for now. You can fill it in, but nothing will be filed … ┐
New York LLC formation                                    (H1, firm font, Headline 2)
(summary) After you send this, Best Accounting checks every detail and fee and
approves exactly what will be filed. Nothing is filed or paid until they do.
(fee note, Small)
──────────────────────────────────────────────────────────────────
 1  (first group of the form)                             Headline 4, numeral in --firm-ink
    Label *
    [_______________________________________]  56px
 2  …
[              Send to Best Accounting               ]   60px, --firm-ink
Next, Best Accounting checks it and approves the filing. Nothing is filed until they do.
By sending, you agree to CoFile's Terms of Service; your details are handled under its Privacy Policy.
Questions about this form? Email Best Accounting at …
──────────────────────────────────────────────────────────────────
Terms · Privacy                                         with CoFile■
```

- 720px column, centered; the nameplate as in 3.4.
- The rehearsal notice as a notice strip (Newsprint, 4px Press Black left rule), never in red.
- The H1 is the filing type, in the firm's font; the summary in Lede style (20px).
- **"Thank you."** after sending: the nameplate, "Thank you." in Headline 2, and the copy's next-step
  line. Nothing else.

**Client link pages** (`/i/<token>`, "Your filing"): the same template, under the firm's nameplate.
"This link has expired or isn't valid" / "Ask whoever sent it for a new one.", "This link can't be
used" and "This filing is no longer offered" use the same layout with the torn-ticket spot in Press
Black.

**The intake form** (used here, on client links, and by the firm's staff):

- Fields grouped into numbered sections ("chapters"): the group's legend in Headline 4, its numeral
  in `--firm-ink` Publico Headline Bold.
- "Fields marked * are required." at the top in Small style. The asterisk is Press Black, not red.
- Labels above fields; help text under the label; 56px fields; values typed in National 2 18px (the
  proof shows them in mono, as filed).
- "Same as" / "Same person as" as 28px checkboxes that collapse the repeated fields with a 200ms
  height change.
- Repeating groups (members, officers) as hairlined cards with "Remove" as a text button and an
  outline add button.
- "More options" as a disclosure row.
- **Authorizations**: each statement as a 28px checkbox with the statement in UI style beside it,
  under the copy's explanation ("The state form asks for these. …").
- The signature pad when needed (section 11), with "Only the signer named above may draw it." under
  it.
- Errors: "Please fix these and submit again." as a notice strip at the top listing each field as an
  anchor link; each field's message under it in Correction Red with a 2px red border.
- Submit: "Send to {firm}" for the client, "Create the proof" for staff; full width on phones.

### 10.14 Platforms: the dashboard, API docs, white-label page and widget

**The dashboard** (`/dashboard`). CoFile's register (1), tuned for density: these readers live in
it all day.

- **Chrome:** a left rail, 248px, Newsprint, the wordmark at the top (16px cap height), then the
  sections "Overview", "Filings", "Ready to pay", "Firms", "API keys", "Webhooks", "Setup", "Team",
  "Billing", "Sign-ups", "Docs" in National 2 Medium 16px, 44px rows; the current one in Press Black
  with a 3px Press Black bar at its left, the rest in Caption Gray. "Change password" and "Log out"
  at the foot. On phones the rail becomes a top bar with a menu sheet.
- **Overview:** H1 "Overview"; notices; then a row of three "by the numbers" figures ("Filings",
  "Webhook deliveries", "API keys" with "Manage keys"): the count in Publico Headline Bold 56px with
  tabular figures, the label in Caption style above it. Then the three charts **"By status"**,
  **"By state"** and **"By month"** as small multiples in the newspaper chart style: horizontal bars
  for status and state, columns for months; National 2 Narrow labels set directly on the bars (no
  legends); a baseline and no gridlines; Press Black bars with the single highlight in Gold Leaf
  (the "waiting for approval" bar; the current month). "None yet." when empty.
- **Firms, Filings, API keys, Webhooks, Sign-ups, Team:** tables (section 11). Keys and endpoint
  URLs in GT America Mono; revoked keys get the "Revoked" outline chip; webhook deliveries show HTTP
  status as chips (2xx Live Green, 4xx and 5xx Correction Red). Sign-ups: "Waiting for approval" with
  "Approve" (primary small) and "Turn down" (text button), then "Decided" and "Enterprise requests".
- **Setup:** one long settings page with a sticky in-page contents list at the right ("Payment
  methods", "State portal logins", "Who's named on your filings", "Your registered agent in each
  state", "Defaults per portal"); each part a section with Headline 4 and its explanation in UI style.
  Portal logins as a table ("Portal", "Pays by", "Login", "Disconnect", "Not needed"). No lock icons.

**API docs** (`/docs`). A technical book, set as carefully as the Terms.

- **Three columns from 1280px:** a 260px contents rail ("Overview", "Guides" with its eight guides,
  "Reference", "Endpoints", "OpenAPI (JSON)", and "Dashboard"), the prose column at 680px, and a
  440px sticky code column on the right. Under 1280px the code drops into the prose column; on
  phones the contents become a "Contents" disclosure at the top `[copy needed]` if it needs a label.
- **Prose** in Publico Text 18px/30px; headings in Publico Headline; inline code in GT America Mono
  15.5px on Newsprint with 3px padding.
- **Code blocks** on Press Black (in both themes), GT America Mono 15px/24px, three colors only:
  Night Ink for keys and punctuation, Night Gold for strings and literals, Night Caption for
  comments. A "copy" control as a small outline button in the block's top right (label `[copy
  needed]` if it isn't already in the docs).
- **Endpoints:** a method chip (GET, POST, PUT, DELETE in GT America Mono Medium 13px capitals,
  outlined in Press Black; DELETE in Correction Red) and the path in GT America Mono 20px.
- **Quick start** as a numbered list with the Publico Headline Bold numerals of How it works.
- **`"dryRun": true`** gets the graphics desk's gold underline wherever the docs introduce it: it's
  the platforms' free rehearsal.
- The end mark closes each guide.

**The white-label hosted page** (`/e/<tenant>/<firm>/<service>`). Register 3: the platform's (or its
firm's) nameplate, exactly as 10.13, with **no CoFile anywhere**: the imprint slot under the rule is
left empty, and the footer carries the platform's own links. The system is the same; only the names
change.

**The embed widget** (`/embed/...`). It lives inside someone else's website, so it brings no
nameplate (the host page is the nameplate) and no page background (transparent by default, or
Coated White, or Night Paper, chosen by the firm in its widget code). It takes the firm's color and
font. Compact spacing: 48px fields, 16px gaps, 16px padding. The rehearsal notice and the form as in
10.13. At the foot, one line: "Filed with CoFile" in the imprint style. Width 320 to 720px; it sizes
its own height to fit. It honors the host page's `prefers-color-scheme` when set to "auto".

### 10.15 Emails

Emails are pages that arrive. They follow the same nameplate system, in a 600px table layout that
survives every mail client.

**Two templates:**

| Template | Header | Used for |
|---|---|---|
| **The firm's** | The firm's nameplate, centered: logo (6,000px² target, max 200 × 56px) or the firm's name in Georgia 24px; the thick-thin rule as two table rows in `--firm` (3px, 2px gap, 1px); "with CoFile" right-aligned under it in 12px Caption Gray | Everything about a filing: the proof is ready, documents back, the EIN, card security code, changes requested, more information needed, rejected, client link emails, invitations to a firm's desk |
| **CoFile's** | The wordmark, left, 16px cap height, as an image with "CoFile" alt text; a 1px Press Black rule | Account emails: "Confirm your email for CoFile", "Reset your password", "Your partner account is open", "Your CoFile account is ready" |

**The body, in both:** Coated White background inside a Newsprint canvas; the subject restated as
the headline in Georgia 26px/32px Press Black; the body in 17px/26px "Helvetica Neue", Arial; values
(business names, references, EINs) in Menlo, Consolas, monospace; one button (a bulletproof button,
with VML for Outlook): 48px tall, 4px radius, `--firm-ink` with white text on the firm's template,
Gold Leaf with Press Black text and a Burnished Gold border on CoFile's. Its label is the email's own
("Log in", "Choose a name", "Review the filing", or the default "Open"). The footer: the firm's
contact line ("Questions? …"), then the legal line in 12px Caption Gray.

**The ones that matter most:**

- **"Your proof is ready to approve: …"** (to the firm). The rehearsal line first, when it applies,
  as a Newsprint strip with a 4px Press Black left rule ("Rehearsal: nothing will be filed or paid,
  even if you approve."). The body paragraph. When the state's review page is attached ("State
  review page.png"), a 520px thumbnail of it inline, hairlined, with the attachment's sentence under
  it as a caption. Then the button.
- **"Completed: …" (documents back).** The headline; the body; then "Documents: …" set as a list of
  rows, each with a plain document glyph, the document's name and "attached"; then the button to the
  filing page.
- **EIN issued.** The "Completed" email for an EIN, with the EIN itself set in the "by the numbers"
  box: Menlo 28px in a 1px Press Black frame, centered, and the IRS letter listed as an attached
  document. Any EIN-specific headline or line `[copy needed]`.
- **The client link email** ("Please fill in the details for your … here"): the firm's nameplate,
  the body, and the link as the button, sent from the firm's own mail app, so in practice it often
  arrives as plain text. The plain-text version is designed too: the firm's name on the first line,
  a blank line, the body, the link on its own line.
- **Account emails** on CoFile's template, short, one button each.

**Dark mode in mail:** `prefers-color-scheme` styles swap to Night Paper and Night Ink; the firm's
logo sits on a Coated White logo plate (3.4) so a dark logo never vanishes; buttons keep their
colors.

**Plain-text versions** of every email, set with care: the firm's name (or "CoFile") on the first
line, the headline, a blank line, the body, the link on its own line, the footer.

---

## 11. Components

One component library serves all three registers. Every component takes two color sets: CoFile's
(Press Black, Gold Leaf) and the firm's (`--firm`, `--firm-ink`, `--firm-wash`). Nothing in a
component is hard-coded to gold.

### 11.1 Buttons

| | Large | Medium | Small |
|---|---|---|---|
| Height | 56px | 48px | 40px (desktop only; 44px hit area) |
| Padding | 0 28px | 0 22px | 0 16px |
| Label | National 2 Medium 18px | National 2 Medium 17px | National 2 Medium 16px |

- **Corners:** 4px. Paper has square corners; a button is the one thing you press, so it's softened
  just enough to look pressable.
- **Primary, CoFile's:** Gold Leaf fill, Press Black label, 1px Burnished Gold border. Hover
  `#BF8E2A` (label still 6.0:1). Pressed: 1px down, `#B3842A`. Used for "Run a free rehearsal",
  "Create account" and other CoFile actions; never more than one on a screen.
- **Primary, the firm's:** `--firm-ink` fill, white label, no border. Hover: 6% darker. Used for
  "Approve, and authorize submission and payment", "New filing", "Send to {firm}", "Create the
  proof", "Pay and file".
- **Outline:** transparent, 1.5px Press Black border (or Night Ink on dark), Press Black label;
  hover fills Newsprint. "See pricing", "Request changes", "Questions".
- **Text button:** Press Black label, underline on hover. "Log in", "Log out".
- **Destructive:** a text button in Correction Red ("Remove", "Turn off", "Revoke", "Disconnect",
  "Turn down"), always followed by a confirmation.
- **Loading:** the label changes as the copy says ("Sending…", "Saving…", "Creating…", "Signing
  in…", "Confirming…"), and a 2px rule grows under it. The button keeps its width.
- **Disabled:** Newsprint fill, Caption Gray label, Field Line border, and a reason nearby in text.
- **Focus (everything focusable):** a 3px outline, offset 2px, in Press Black on CoFile's pages and
  `--firm-ink` on a firm's (with a 2px white gap so it shows on a firm-colored button). Never
  removed.
- **Phone:** full width; two buttons stack, primary first.
- **Arrow links** ("For firms", "How it works", "See all plans"): a text link followed by a drawn
  arrow, a 1.5px line 20px long with a 6px head, which moves 4px right on hover (120ms).

### 11.2 Fields

- **Label** above, National 2 Medium 17px Press Black, 8px gap. "(optional)" in Caption Gray after
  the label; "*" in Press Black for required. No placeholder text standing in for a label, ever.
- **Help text** between the label and the field, National 2 15px Caption Gray, so it's read before
  typing.
- **Text field:** 56px tall, Sheet White, 1.5px Field Line border, 4px corners, 16px padding,
  National 2 18px. Focus: a 2px border in Press Black (or `--firm-ink`) plus a 3px ring of the same
  color at 25%.
- **Error:** a 2px Correction Red border, and under the field a 16px red disc with a white "!" and
  the message in National 2 Medium 15px Correction Red. The error summary at the top of the form
  links to each field.
- **Select:** as a text field, with a drawn 12px chevron.
- **Textarea:** at least 120px tall, grows vertically.
- **Code boxes** (one-time code, card security code): one input drawn as separate 56 × 64px boxes,
  GT America Mono 28px, paste fills them all.
- **Checkbox:** 24px box (44px hit area), 2px Press Black border, 2px corners; checked: filled Press
  Black (or `--firm-ink`) with a white tick. **Radio:** 24px circle, checked with a 12px dot.
- **Segmented options** ("Send them a link", "Start from a client you filed for before", "New
  client", "Fill in"): outline buttons joined in a row (stacked on phones); the selected one gets a
  2px `--firm-ink` border and `--firm-wash` fill.
- **Choice cards** (states, filing types): Sheet White, hairlined, the whole card clickable, a 3px
  top rule in `--firm` on hover and when selected.
- **File drop:** 160px, 1.5px dashed Field Line, the file's preview inside once chosen.
- **Color field:** a 44px swatch, the hex in GT America Mono, the ready colors as 32px swatches; a
  checkmark-free selected state (a 2px Press Black ring with 2px gap).
- **Font picker:** a search field and a list where each font's name is shown in that font, 20px,
  with the preview line.
- **Signature pad:** a 3:1 Sheet White panel, 1.5px Field Line border; a 1.5px Press Black baseline
  at 72% of the height with a drawn "×" at its left end (the old sign-here mark); the pen in Press
  Black with pressure-varied width (2 to 3.5px); its accessible label is the copy's "Signature pad:
  the signer draws their signature here with a mouse, finger or stylus."; a clear control `[copy
  needed]` if none exists; the statement checkbox under it.

### 11.3 Chips and badges

28px tall, 0 10px padding, 2px corners (labels, not pills), National 2 Medium 14px, a 10px mark
before the label. **Shape carries the meaning; color confirms it.**

| Meaning | Mark | Colors | Examples |
|---|---|---|---|
| Done | filled circle | Live Green on Live wash | "Live", "Filed", "Filed, IRS letter saved", "Approved", "Accepted by the state", "Completed", "Matches the proof" |
| Waiting on a person | half-filled circle | Burnished Gold on Amber wash | "Proof ready to approve", "Ready to approve", "Waiting for approval", "Needs information", "Needs correcting", "Changes requested", "Name unavailable", "Waiting for the client" |
| Under way | ring with a center dot | Press Black, 1px outline, no fill | "Submitted", "Received", "Queued", "Filing now", "Final check", "Submitted to the state", "Getting the state's review page", "Being checked", "For your team to check" |
| Stopped | circle with a bar | Correction Red on red wash | "Rejected by the state", "Failed", "Stopped", "Paused: state site changed", "On hold" |
| Off | dashed ring | Caption Gray, dashed outline | "Turned off", "Revoked", "Planned" |

**Coverage chips** use the same system: "Live" (done), "Rehearsed to the payment screen" (a circle
half-filled in Gold Leaf: the one gold chip, on CoFile's pages only), "Screens recorded, rehearsal
next" and "Offered, not yet rehearsed" (ring), "Planned" (dashed ring).

**Badges** ("Rehearsal", "Test"): an outline label with a 1.5px *dashed* Press Black border and no
mark, National 2 Medium 13px. Dashed means "not for real yet", everywhere.

### 11.4 Cards and plates

- **Card:** Sheet White, 1px Hairline border, square corners, 24px padding (32px from 1200px), no
  shadow. The head in Headline 4. Cards hold things; they don't decorate.
- **Plate** (a picture of a page): Sheet White, hairline edge, the paper shadow (7.4). Only inside
  pictures.
- **The proof**: 10.12 (the page) and 9.4 (the picture).
- **The record**: the timeline component (11.9) plus document cards: 230 × 290px sheets, a kicker,
  the document's name in Headline 4, its value in GT America Mono, and gray text bars; never a
  facsimile.
- **Desk rows**: 60 to 64px, the business name over the filing type, the chip at the right, the
  `--firm` bar for rows waiting on the firm.

### 11.5 Price cards

The rate-card column (10.4): a 2px Press Black rule on top; the plan name in Headline 3; the price
in the Figure style with its raised dollar sign and "a month" / "a filing" in National 2 18px on the
baseline; the annual line in Small style; a Hairline; the items with square bullets; a Hairline;
the promise line in National 2 Italic. Column rules between cards. The highlighted plan: a 4px Gold
Leaf rule on top and a Newsprint fill. On the firm's Billing page, the current plan takes a 4px
`--firm` rule instead.

### 11.6 Tables

- **Head:** National 2 Medium 15px Press Black; a 2px Press Black rule above, a 1px rule below.
- **Rows:** 56px minimum (48px in the dense dashboard), National 2 17px, Hairlines between, no zebra
  stripes.
- **Numbers:** tabular lining figures, right-aligned on the decimal; totals with a single rule above
  and a double rule below.
- **Links in tables:** the row's main item (business name, firm, key name) as a link in National 2
  Medium; the whole row is not a link.
- **Hover:** Newsprint on CoFile's pages, `--firm-wash` on a firm's.
- **Phones:** tables of records become stacked blocks (each row a block, its column names as small
  labels); tables of numbers scroll sideways inside their frame, with the first column sticky and a
  fade on the right edge to show there's more.

### 11.7 Navigation

- **Public header** and its phone sheet: 9.0.
- **Filing desk:** nameplate and section tabs, 10.11.
- **Dashboard rail** and **docs rail:** 10.14.
- **Back links** ("← Filings", "← Other filings", "All states"): National 2 Medium 16px with a drawn
  left arrow.
- **In-page contents** (Terms, Privacy, Setup on the dashboard): a sticky list, the current item
  with a 2px rule at its left.
- **Skip link** to the main content, visible on focus `[copy needed]` if it doesn't exist.

### 11.8 Notices

A full-width strip, square corners, 16px × 20px padding, National 2 17px, a 4px rule on the left:

| Kind | Rule | Background | Examples |
|---|---|---|---|
| Information and rehearsal | Press Black | Newsprint | "This page is in rehearsal for now. …", "Rehearsal: nothing will be filed or paid, even if you approve." |
| Needs action | Burnished Gold | Amber wash | "1 filing needs someone to act.", "… ready to pay and needs your card's security code. Pay and file" |
| Error | Correction Red | red wash | "Please fix these and submit again.", "Billing couldn't be loaded. Try again shortly." |
| Done | Live Green | Live wash | "Saved to Google Docs." |

No icons. The link at the end of the sentence, underlined.

### 11.9 The editorial components

- **Nameplate** (3.4): props for logo, name, font, color, alignment (centered or left) and size
  (client 7,200px², phone 5,000px², desk 4,000px², email 6,000px²); the thick-thin rule; the band
  variant for white logos; the logo plate in dark mode.
- **Imprint** (3.3) and **end mark** (3.2). On a firm's pages the end mark is drawn in Caption Gray
  as part of the imprint, or in Press Black where it closes a completed record.
- **Oxford rule:** 4px + 3px gap + 1px, Press Black.
- **Kicker:** National 2 Medium 14px capitals +8%, followed by a 48px rule.
- **Message bubble** (9.3): incoming (Newsprint, squared lower-left corner) and, for emails, a
  squared version with a sender line.
- **Leader lines and callouts** (7.5).
- **The loupe** (9.2).
- **Contact sheet** (9.7): frames, edge numbers, the box-score log; reused on the filing detail.
- **Stage track** (10.3): five stops, the filled one colored by stage.
- **Timeline** (9.5): dots and lines, labels below, the end mark after the last stage when done.
- **Figure:** the price figure with the raised dollar sign; and the "by the numbers" box (a 1px Press
  Black frame around a big mono or headline figure) for EINs and dashboard counts.
- **Byline portrait:** a square photograph (56px or 72px) with a name line under or beside it.
- **Pull quote:** Publico Headline Medium Italic 28px, a 2px Press Black rule above, no quotation
  marks added.

### 11.10 Code

- **Blocks:** Press Black in both themes, 20px padding, GT America Mono 15px/24px, three colors
  (Night Ink, Night Gold, Night Caption), horizontal scroll inside the block on phones, a copy
  control at the top right.
- **Inline:** GT America Mono at 0.9em on Newsprint (Night Surface on dark), 3px × 5px padding.

### 11.11 Accordion

The Questions rows (10.6): 72px minimum, the question in Headline 4, the drawn "+" / "−", Hairlines,
220ms open. Keyboard: Enter and Space toggle; the summary is the button.

### 11.12 Empty, loading, success

- **Empty:** a spot illustration (7.7) at 120px, the copy's sentence in UI style, and the copy's
  actions as buttons. Centered in the content area, 96px padding.
- **Loading:** skeleton bars in flat Newsprint (Night Surface on dark), the shapes of the real
  content, no shimmer.
- **Success:** a Done notice strip, or the page simply moving on. No confetti, no toasts sliding in
  from corners.

---

## 12. Craft notes

**Dark mode.** A night edition (4.2): Night Paper, Night Ink, Night Gold, the same rules and type.
Pictures of pages stay light (dimmed paper), photographs are untouched, and firms' colors switch to
their `--firm-ink-dark` versions for links and rules. Logos get the Coated White logo plate. It
follows the system setting, with a toggle in the footer `[copy needed]`; the choice is kept in
`localStorage`.

**Phones.** Most clients and many firm owners will see this on a phone first. 20px margins; text
first, then the picture, then the details; 56px full-width buttons; 44px minimum touch targets;
nothing sticky at the bottom; photographs recropped by the photographer, plates redrawn as their
real phone layouts; sideways scrolling only inside a picture, with the next item's edge visible.
The gilding engine renders at half resolution on phones and falls back to stills on low-power
devices and slow connections.

**Older eyes.** This audience is 40 to 65 and reads with glasses on the end of their nose. Body text
is 18px on phones and 20px on desktop; nothing anyone needs is under 15px; Press Black on Coated
White is 17:1; no gray lighter than Caption Gray for text, ever; no weight lighter than Regular; no
text set over photographs; links underlined; focus always visible; every status shown by shape and
words, not color alone; pages hold up at 200% zoom with no sideways scrolling; motion respects
reduced-motion settings.

**Spanish.** Plan for text 25 to 35% longer. Headlines keep the one-sentence-per-line rule and wrap
within each line; if a banner line overflows its measure, the Banner style steps down from 88px to
76px (a container-query fit check) rather than breaking a word. Buttons wrap to two lines rather than
truncate. The header's navigation moves into the menu below 1280px when the page is in Spanish.
Chips and table cells wrap. `hyphens: auto` with `lang="es"` for body text only, never for headlines
or names. Door Roman and every web font are subset with Spanish accents, and the gilding engine
handles ñ and accented capitals.

---

## 13. Production

### 13.1 Tools

- **Design:** Figma, with one library and variable modes for CoFile light, CoFile dark, Firm light,
  Firm dark and White label. Firm tokens are driven by a small plugin that runs the same OKLCH
  derivation as the code (3.5), so designers see exactly what a firm's color will become.
- **Tokens:** exported with Style Dictionary to CSS custom properties; the firm derivation in code
  with an OKLCH color library, unit-tested against WCAG contrast for every token pair.
- **Components:** built and reviewed in Storybook with a **sample-firm switcher**: twelve fictional
  firms with deliberately awkward brands (a white logo, a 9:1 wordmark, a square seal-shaped logo, a
  bright yellow, a near-black, a pastel, a script font, a condensed font, a name 40 characters long,
  no logo at all). Every component and page is screenshot-tested against all twelve.
- **Pictures:** product plates rendered from the real components (HTML where interactive, SVG
  exports otherwise); photographs as AVIF and WebP in responsive sizes; graphics as SVG.
- **Gilding engine:** WebGL (a lightweight library such as OGL or three.js), custom shaders, Door
  Roman layers as signed-distance-field textures, the photographed light brackets as lookups.
- **Motion:** prototyped in After Effects and the browser, built with CSS, the Web Animations API
  and SVG stroke animation; no animation runtime heavier than that except the gilding engine.
- **Cinemagraph:** a 2-second H.264 and AV1 MP4 under 1.2MB, with a poster frame.
- **Email:** built in MJML, tested across the major desktop, web and mobile mail clients,
  including Outlook's Windows renderer and dark modes.

### 13.2 What to commission

| Commission | Kind of studio or artist | Delivers |
|---|---|---|
| Wordmark and Door Roman | A lettering artist who draws newspaper mastheads and sign alphabets | The wordmark (3.1) in all versions; Door Roman in three layers with Spanish accents |
| The doors | A traditional sign painter and gilder | Gold-leaf lettering of "Harbor & Pine CPA" and "Northgate Payroll" on two real glass doors; a lettering reference sheet for the engine |
| Photography | An editorial documentary photographer, with producer, casting, location scout, prop stylist, digital tech and retoucher | PH-01 to PH-07 and PH-09, every frame in four crops, clean plates, light brackets, the dusk cinemagraph passes |
| Still life | A still-life photographer | PH-08 and PH-10 |
| Graphics | An editorial information-graphics designer from a newspaper graphics desk | Every explanatory graphic (7.5) and the chart style for the dashboard |
| Spot illustrations | An editorial spot illustrator working in brush and ink | The ten spots (7.7), in a gold-accent and a one-color version |
| Gilding engine and loupe | A creative-technology studio | The WebGL engine (7.6), the loupe (9.2), fallbacks, performance budget |
| Motion | A motion designer with editorial and interface experience | Prototypes and specs for M1 to M10 |
| Example brands | A small identity studio | The H&P monogram, Northgate's gate mark, a Best Accounting sample logo, and the twelve awkward sample firms for testing |
| Type licenses | Commercial Type, Klim Type Foundry, Grilli Type | Web, app and desktop licenses (5.1) |

### 13.3 The asset list

| Group | Assets |
|---|---|
| Identity | Wordmark (SVG, PNG; full color, reversed, one color); end mark; favicon set (16, 32, 48, 180, 512); app icons; Open Graph images for the home page and the seven pages |
| Type | Publico Headline and Text, National 2 and Narrow, GT America Mono (WOFF2, subset); Door Roman (three layers, SDF textures) |
| Photography | PH-01 *The call* (+ clean plate); PH-02 *Two doors* (two doors, corridor wide, brackets); PH-03 *The counter*; PH-04 *The hand-off*; PH-05 *Your door at dusk* (clean plate, lights off/on, brackets); PH-06 *The filing professionals* (reportage + byline squares per person); PH-07 *You approve it*; PH-08 *The printer's proof*; PH-09 *The partner at the door*; PH-10 *The clipped page*; each in 16:9, 3:2, 4:5 and 1:1 |
| Plates | The desk (desktop and phone); two client pages (Harbor & Pine, Northgate); the draft; the proof and payment strip; the record and two document cards; seven contact-sheet frames; the state review page redraw; the cutaway's neutral product page |
| Graphics | Callouts and leader lines; the loupe; the markets panel; the contact sheet and log; the stage track; the timeline; the units squares; the triptych route line; the cutaway; dashboard chart styles |
| Illustration | Ten spots, two versions each |
| Motion and code | The gilding engine; the dusk cinemagraph; M1 to M10 specs |
| Email | The firm's template and CoFile's template (HTML and plain text), each event's variant |
| Testing | Twelve sample firms (logos, colors, fonts) |

### 13.4 The shoot

- **Week before:** the gilder letters the two example doors on location (a day and a half each, with
  drying time).
- **Day 1, the corridor:** PH-02 (both doors, the wide), PH-05 (afternoon clean plates, then dusk,
  lights off and on), PH-09 (the partner in her doorway), all light brackets.
- **Day 2, Harbor & Pine's office** (a dressed real office): PH-01, its clean plate, PH-07.
- **Day 3, the bakery:** PH-03 at 5 a.m., PH-04 mid-afternoon.
- **Day 4, CoFile's workplace:** PH-06, reportage in the morning, portraits in the afternoon.
- **Day 5, the studio:** PH-08 and PH-10.

### 13.5 The order to build in

1. **Foundations (weeks 1 to 3):** tokens, type, grid, the nameplate component and the firm color
   derivation, tested against the twelve sample firms. Everything else depends on these.
2. **Core components (weeks 2 to 5):** buttons, fields, chips, tables, notices, cards, in Storybook.
3. **The proof and the client's pages (weeks 4 to 7):** the proof, the decision page, filing pages
   for each service, client link pages and the intake form. The firm's and the client's experience
   come first, because they're the product.
4. **The filing desk (weeks 6 to 9).**
5. **Emails (weeks 7 to 9).**
6. **The home page (weeks 7 to 11)**, with plates and graphics first. Until the photographs arrive,
   the pictures run as their plates alone on Newsprint, never with stock.
7. **Photography (weeks 3 to 8, in parallel):** casting, locations, the gilder, the shoot,
   retouching, screen composites.
8. **The gilding engine (weeks 4 to 10, in parallel):** its still fallbacks ship first, the engine
   when it's ready.
9. **The seven pages behind the home page (weeks 10 to 12).**
10. **Account pages, Terms, Privacy, errors and spots (weeks 11 to 12).**
11. **Platforms: dashboard, docs, white-label page, widget (weeks 11 to 14).**
12. **Last:** the motion pass, then dark mode, Spanish, accessibility and performance audits. Budget:
    the home page's largest image painted in under 2 seconds on a mid-range phone on 4G; the hero
    photograph under 180KB as AVIF; the gilding engine under 120KB compressed plus about 600KB of
    textures, all loaded lazily.

---

## 14. What I'd strip from today's visuals, and why

I've kept every word and its order. Everything I'm stripping is visual.

- **The folder-tab mark with a check cut into it.** A folder says "paperwork"; a check says
  "verified". It's the wrong story twice, and as a colored, illustrated mark it competes with the
  firm's logo on the firm's own pages. It's replaced by a wordmark and an end mark that step back.
- **The manila and cream paper colors.** A cream page reads as stationery and makes every firm's
  logo look a little dirty. Coated White makes them look printed on good stock.
- **Green as the house accent.** Green buttons and green ticks everywhere say "approved, checked,
  safe", which is exactly the register the brief steers away from, and green collides with every
  firm whose color is green. Our accent is gold, and it leaves the room on firms' pages.
- **IBM Plex Sans, IBM Plex Mono and Source Serif 4.** Competent and generic; Plex is a technology
  company's corporate face, and nothing in this pairing says front page, headline or pride.
- **A green tick before every list item.** Dozens of identical ticks flatten the hierarchy and turn
  selling points into a compliance checklist. Short lists get square bullets or none.
- **The same two-column band for every section.** A page with no pacing stops being read after the
  third band. The home page now alternates layouts the way a feature well does.
- **Pictures drawn as small boxes of interface.** Today's stand-ins are boxes with chips in them:
  they look like widgets, not pictures, and there isn't a single person on the site. The new
  pictures have people, doors, light and paper, and the interface plates are set as documents.
- **The 4px colored stripe at the top of the proof.** A firm's brand reduced to a stripe. It becomes
  a proper nameplate.
- **Status chips told apart by color alone,** and rounded pills. They become square labels with a
  shape for each meaning.
- **Buttons inside pictures that look clickable.** In the new pictures, sample buttons sit on paper
  plates, aren't focusable and show no hover, so nobody tries to press a picture.

---

*Elaine Hart*■
