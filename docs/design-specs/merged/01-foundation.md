# CoFile merged design, part 1: the foundation (sections 2 to 6)

Merge round, Nov 26, 2026. This part settles the spine and the foundations (concept, identity,
color, type, layout) for the merged design of cofile.app, and gives the direction parts 2 to 8 are built on. It merges
the ten specs in `docs/design-specs/01` to `10`. The choices it makes where the ten disagree are
listed, with the alternatives, in `DECISIONS.md`. The owner's decisions of Nov 26 ("Decided Nov 26"
there) are applied throughout; decision numbers below refer to that file.

Credits in parentheses name the designer an idea comes from: (Greta), (Dev), (Amara), (Jun),
(Rosa), (Tomás), (Elaine), (Marcus), (Priya), (Hal). The spine is Hal Brennan's, so most of what is
not credited follows his spec.

The copy is locked. Every line quoted here is the round 3 copy in `web/app/page.tsx`,
`web/components/landing/Visuals.tsx` and the pages they link. Anything this design needs that the
copy doesn't have is marked `[copy needed]` and listed at the end of this file.

---

## 2. The visual concept: Plate & Proof

### 2.1 The one idea

**CoFile is the firm's stationer.** (Hal)

A good stationer does four things for a firm. They engrave the firm's name on a **plate** once, so
every sheet, card and door its clients see carries that name, beautifully. When something new is
ordered they pull a **proof** at their own counter, and the person whose name is on it approves it
before anything runs. They hand over a plain **price card**. And their own name stays off the
firm's stationery: the firm's clients meet it only in one line of fine print, the authorization
that says who is filing. Small type, on purpose.

That is the copy's selling story, nearly line for line, and much of it is already in the copy's own
images:

- "Your name on the door. Ours in small type." (home and For firms)
- "You've approved a proof before: business cards, letterhead, an invitation at the printer.
  Nothing went to press until you said so." (How it works)
- "Confirm your email, put your name and logo on the door, and choose which card pays the state's
  fees." (sign-up)

So the site is built from the objects of a stationer's shop, and from nothing else: the **Name
Plate** on the door, the **Letterhead** at the head of every page a firm's client sees, the
**Proof** the firm approves, and the **Price card**. The shop itself (the site, the filing desk,
the proof, the firm's own emails) is in CoFile's look, the same for every firm, the way a
stationer's counter looks the same whoever walks in; what leaves the shop for a firm's clients
carries only the firm's name (2.4). CoFile's own mark is a name plate that is blank except for
"Co": we make the plate, the firm puts its name on it (Hal).

The one scene that leaves the shop is the rehearsal. The copy calls it "the whole filing, performed
on the state's real website with no audience", so it is set where the copy puts it: on a stage,
house lights down, a ghost light on (Rosa, Tomás, Amara), with the run printed as the evening's
programme (Greta, Amara). A printed programme is shop work too, so the scene stays in the family.

### 2.2 How it brings out the copy's selling story

| The copy sells | How Plate & Proof shows it |
|---|---|
| **1. Say yes, under your own name.** "Your client needs an LLC. Say yes, under your own name." | The hero picture is CoFile's **filing desk**, a white sheet on plain cotton paper in CoFile's look, signed in as Harbor & Pine CPA: the firm's small logo and its name in the account label, its client filings as the rows. At the top, Two Sisters Bakery LLC, sent by Ana Ortiz with the "Your client" chip, reads "Proof ready to approve", two steps along its track: the firm's next yes. In front of the desk, over its lower right, lies a **Harbor & Pine client page** in the firm's own letterhead and colors: what the firm's clients see. The largest company name in the first screen is still Harbor & Pine's, on that page, not ours (Marcus). |
| **2. Your brand on everything.** "Your name on the door. Ours in small type." | **Two doors, one page.** Two real office doors with two real hand-engraved plates, "Harbor & Pine CPA" on brass and "Northgate Payroll" on steel. Below each, the same client page, each in its own firm's logo, color and font; the bones of the two pages sit on exactly the same pixels, and last a 1 px hairline draws between them to show they are the same page (Priya). Nothing of ours appears on either (3.4). The headline sets "Ours in small type." literally small. |
| **3. Nobody retypes anything.** "Your client sends a text. Nobody retypes it." | The customer's note becomes a set job: Ana Ortiz's text, its key phrases underlined, runs along fine leader lines into a drafted New Jersey LLC formation on the firm's desk; the firm's saved answers were already there (Hal, Elaine). A documentary photograph of Ana at the bakery counter shows how little the client did. |
| **4. You stay in charge.** "Nothing is filed or paid until you approve the proof." | **The proof**: one sheet in CoFile's look, the firm and its client named in its head as text ("Harbor & Pine CPA · Two Sisters Bakery LLC"), every detail and every fee set like a good invoice (dot leaders, a single rule above the total and a double rule under it), and one Brass button at its end, the place your initials would go. It is the calmest, most legible object on the site, and nothing in its section competes with it (Tomás); the three points beside it each point at their part of it. The firm approves it, never its client. |
| **5. It's done, and the papers come back.** "Then it's filed, and the papers come back to you." | The finished order comes home: an envelope addressed to the firm opens on a desk and the state's document and the IRS letter rise out of it onto the firm's record, after three stages ink in along a rule: "Approved", "Submitted", "Filed" (Hal, Jun). |
| **6. The filings your clients already ask for.** New York, New Jersey, Florida and the IRS. | The shop's **sample cards**: one card per place, each listing what it can do, each filing marked with a small plate glyph that is cut, pressed or inked as it gets closer to live (Hal). |
| **7. Try it free.** "In beta: rehearse a filing, free." | **House lights down.** The only dark band on the home page: an empty stage under a single ghost light, and the rehearsal set as a printed run sheet, every screen of the state's real website cued line by line. The last line, "Pay Now · held, on purpose", arrives like every other cue: no drama about stopping (Rosa, Tomás). |
| **8. Simple prices.** "$45 a filing. EIN included with a formation." | The stationer's **price card**: "$45" set as the biggest number on the page, then four plain lines with dot leaders on heavy card stock, nothing in the small type but our name (Hal, Greta). |
| **9. People behind it.** "Built and run by filing professionals. When a filing needs a person, one of them takes over." | A shop with people at the bench: real portraits of CoFile's real filing professionals beside that line in the hero, and at work on How it works, Pricing and Questions. Never models, never stock (all ten). **For now there are no photographs of CoFile's people (owner, Nov 26):** the line stands on its own words, and nothing takes the portraits' place. |

The close, "Run one rehearsal. Then decide.", hangs the plate back on the door **blank**, waiting
for the visitor's own firm name. They can type it there and watch it engrave, and the name carries
into sign-up (Hal, Marcus, Elaine).

### 2.3 The objects of the shop

Every picture and component on the site is one of these objects. If a new thing is needed, it is
made as one of them, never as a new metaphor.

| Object | What it is | Where it appears | Section |
|---|---|---|---|
| **The Name Plate** | A chamfered plate with two level screws. CoFile's mark is the plate with "Co"; the firms' plates carry their names | The mark; the doors in Firms; the blank plate in the Close and sign-up; the coverage glyphs | 3.2, 4.5 |
| **The Letterhead** | The firm's logo or typeset name, then the Firm Rule (a 3 px line in the firm's main color, a 2 px gap, a 1 px line in its second color) | The head of every page a firm's client sees (register 2, 2.4), and of every picture or preview of one. Never the desk, the proof or any other page in CoFile's look, where the firm's logo and name are content | 3.5 |
| **The Sheet** | Pure white paper, square-cut, lying on a cotton-paper desk with the shadow a sheet throws under a window | Every product picture; the proof; every client page | 6.4 |
| **The Proof** | The one sheet the firm approves, in CoFile's look, the firm and its client named in its head, one Brass button | Home section 4, How it works, the real proof page | (part 9/10 writers) |
| **The Price card** | Heavy card, plain figures, dot leaders | Home section 8, Pricing | (part 9/10 writers) |
| **The Programme** | The rehearsal's run sheet, printed for a performance with no audience | Home section 7, What we file, the rehearsal email | (part 9/10 writers) |

### 2.4 Three registers, one system

(Elaine, with Rosa and Amara's "two worlds"; drawn on the owner's Stripe model, decision 2)

Think of Stripe: its dashboard looks the same for every business, but the invoices and receipts a
business sends its customers carry that business's brand. CoFile works the same way.

1. **CoFile's look, the same for every firm**: the public site and every page behind it (Terms,
   Privacy, 404); sign-up, log-in, password, verification and account pages; **the filing desk,
   every page of it** (Filings, New filing, filing detail, Client links, requests from a text or
   email, Signatures, Ready to pay, Billing, Setup, and the Branding page's own chrome); **the
   proof the firm approves, in every state**, its decision page included; the platform dashboard
   and the API docs; **every email to the firm** or to a subscriber's staff, and CoFile's account
   emails. Cotton paper, Plate Ink, Graphite, the foundation's type (Miller for headlines, ledes,
   page titles and prices; Founders Grotesk for everything worked with), and one metal, **Brass**,
   spent on the one main action and on a few fine lines. The desk takes the treatment the platform
   dashboard takes (10C), so the desk and the dashboard read as one product.

   Here the firm's name and logo appear as **content**, never as the page's letterhead: the desk's
   account label shows the firm's logo small (24 px tall) with its name; the proof names the firm
   and its client in its head as text ("Harbor & Pine CPA · Two Sisters Bakery LLC"). No Firm
   Rule on any of these pages. The firm's colors and font appear here only inside pictures and
   previews of its client pages: the empty desk's miniature, the Branding previews, the hero's
   client page, the two pages in Firms.

2. **The firm's branding only**: only what reaches a firm's **clients**: the client intake form
   (`/i/<token>`), client link pages, the firm's page for each filing it offers
   (`/<firm>/<service>`), and **emails to the firm's clients**. The firm's Letterhead leads (its
   logo, its Firm Rule); its colors take Brass's place, through the ink match (3.6); its font sets
   its name and the headings, Founders Grotesk the rest. **Nothing of CoFile is visible** but
   counsel's authorization text (3.4).

3. **White label**: a platform's hosted pages and the embed widget, and a platform's proof that its
   own clients approve. The platform's brand only, unchanged, except that the widget too shows no
   "Filed with CoFile" (3.4).

The grid, the working type, the tables, the fields, the status language and the motion rules are
the same in all three. What changes is whose name heads the page: CoFile's wherever a firm works,
the firm's wherever its clients look, the platform's on a platform's pages.

### 2.5 Five rules for everyone on the build

1. **On every page a firm's client sees, the firm's name is the best-set thing on it.** If CoFile's
   name appears there at all outside the authorization text (3.4), the page is wrong (Hal). On
   CoFile's own pages, the desk and the proof included, the firm's name is content, set as well as
   any name in the product, never as the page's letterhead.
2. **Paper, not plastic.** Surfaces are paper colors, edges are crisp, shadows are the shadows a
   sheet makes on a desk. No glass, no glow, no gradients except light in a photograph or the ghost
   light's pool (Hal, Greta).
3. **Ink where the action is.** Everything is quiet ink on paper except the one thing to do next:
   on CoFile's pages, the desk and the proof included, Brass, **one Brass button per screen**
   (Elaine, Marcus): "Run a free rehearsal" on the site, "Approve, and authorize
   submission and payment" on the proof; on the pages a firm's clients see, the button in the
   firm's own color.
4. **The product is the picture.** Every product picture is the real interface, built live in HTML
   from the real components with the example data, at true scale, labeled as an example. Never a
   screenshot, never blurred, never tilted (Elaine, Marcus, Greta).
5. **Ceremony without officialdom.** Fine rules, generous margins and good type give dignity.
   Nothing on the site imitates a government seal, mark, letterhead or document (3.9).

### 2.6 What the concept is not

It is not built on safety. Security is the one quiet line under the prices, set exactly like "State
fees separate. Rehearsals free. See all plans" above it, with its link, and a calm, well-set
Security page reachable from the footer. The checks on How it works ("Checks before every filing.")
are a plainer reading section. No padlocks, shields, vault doors, seals, stamps, check-mark badges
or "stop" imagery anywhere in the identity, the hero, the pictures or the motion (all ten). The
pride in this shop is in the name and the proof; the care shows in how well everything is set.

It is not pastiche either. No parchment, no wax, no copperplate script, no faux letterpress on
words, no Victorian ornament. The references are a contemporary fine stationer and a well-made
annual report: big confident serif headlines, plain working type, real white space, precise rules,
real photographs.

### 2.7 What the merge took from the ten, and what it left

Taken into the spine: Hal's stationer, plate, letterhead, Firm Rule, price card and ink match; Jun's
sheet-on-a-desk layout and the letterhead's discipline; Elaine's three registers (redrawn on the
owner's Stripe model, 2.4), one spot color spent like money, and the typed name carried into
sign-up; Marcus's conversion rules (one primary button per screen, the firm's name bigger than ours
in the first screen, the sticky phone bar); Greta's typesetting of firm names and her two-size
headline; Dev and Priya's color engines and logo analysis; the theater for the rehearsal from Rosa,
Tomás and Amara.

Left out, because they would make the site read as a second designer's work: Tomás's real-time
daylight across the scroll and his WebGL scenes; Amara's kinetic type, width-axis display face and
3D papers; Rosa's main-street color world and screen-print collage; Elaine's newspaper apparatus
(Oxford rules, markets panel, contact sheet); Jun's hour-by-hour light; Dev's glows and glass;
Greta's yellow poster fields and black-and-white photography; Priya's frame-and-tag mark; Hal's
own blind impression as the sign of a rehearsal, replaced by the stage the ten agreed on; and,
by the owner's decision 12, Hal's imprint, the small "with CoFile" at the foot of every client
page.

---
## 3. Identity

### 3.1 The pieces

| Piece | What it is | Where it's used |
|---|---|---|
| **The Name Plate** (the mark) | A chamfered plate with two level screws and "Co" engraved in the middle (Hal) | Favicon, app icon, header and footer lockup (the site, the filing desk, the dashboard), social avatar, CoFile's email header, the 404 |
| **The wordmark** | "CoFile" as custom lettering in the manner of an engraver's Scotch roman, with a lozenge i-dot (Hal) | Header and footer lockup, the desk's and the dashboard's header, every email in CoFile's look, the docs header |
| **The Letterhead** | The rules that put a firm's logo, name, color and font at the head of the pages its clients see (Hal) | Every register-2 page (2.4), and every picture or preview of one on CoFile's pages |

There is no tagline lockup. The round 3 copy has no tagline, so no line is ever locked to the
mark.

### 3.2 The Name Plate: drawing instructions

(Hal's construction, recolored for this palette.)

Draw it on a grid of **40 × 16 units**. One unit is 1/40 of the plate's width.

```
     0    4.5                 20                 35.5   40
 0   ╱‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾╲
     │  ╱‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾╲  │   ← bevel line (64 px wide and up)
 8   │ (⊖)               Co                 (⊖)  │   ← screws, slots level
     │  ╲________________________________________╱  │
16   ╲________________________________________________╱
```

- **Outer plate.** A 40 × 16 rectangle with all four corners chamfered at 45°, chamfer leg 2.5
  units. Stroke 1.2 units, mitred joins, centred on the path.
- **Bevel line.** A second chamfered rectangle inset 2 units from the outer edge, chamfer leg 1.6
  units, stroke 0.4 units: the light catching the plate's bevelled edge. Drawn only when the mark
  is 64 px wide or more.
- **Screws.** Two circles of radius 1.1 units centred at (4.5, 8) and (35.5, 8), stroke 0.6 units,
  each with a **horizontal** slot 1.4 units long and 0.4 units thick through its centre. A good
  fitter sets the slots level. Below 32 px wide the screws become solid dots of radius 0.9 units
  with no slot.
- **"Co".** Lettered by hand in the wordmark's italic (3.3): cap height 6.4 units, baseline at
  y = 11.2, optically centred on x = 20 (the C's overshoot sits 0.3 units left of true centre). The
  C's upper terminal ends in a hairline flick rising at 20°. The o tucks into the C's mouth with
  −0.4 units of kerning so the two read as one cut. Stroke contrast 1:4; no hairline under 0.35
  units.
- **Clear space.** 4 units on every side. Nothing goes inside it, a firm's logo included.
- **Minimum size.** 28 px wide on screen (screws as dots, no bevel); 12 mm wide in print.
- **Reference.** Before the vector is drawn, the hand engraver commissioned for the doors (Direction
  D1) cuts this plate in real brass at 120 mm wide. The vector is traced from a 2400 dpi scan and
  cleaned on the grid, so the "Co" keeps the slight swell only a burin gives (Hal).

**Colors.** A line drawing in one ink, never filled, never shaded, never a gradient or gold-foil
effect on screen:

| Ground | Plate, screws and "Co" |
|---|---|
| Cotton, Sheet or any light ground | Plate Ink `#1D2130` |
| Night `#14161E` or any dark ground | Brass `#D9A84A` (the only place the mark is drawn in Brass) |
| One-color print, fax, emboss | the single ink |

**Favicon and app icon.** At 16 and 32 px the plate is redrawn at **32 × 16 units** (2:1) so it
fills the square better; it keeps the dot screws and the "Co" and drops the bevel. Hand-pixel the
16 px master; never let the browser scale the vector down (Greta).

| Asset | Drawing |
|---|---|
| Favicon (SVG, with a `prefers-color-scheme` swap) | Plate Ink plate on transparent for light tabs; Brass plate for dark tabs |
| ICO 16 / 32 / 48 | The 32 × 16 plate, Plate Ink on a Cotton square |
| Apple touch 180, PWA 192 / 512, maskable 512 | A Plate Ink square; the full 40 × 16 plate with bevel and slotted screws in Brass, 72% of the tile width, centred optically |
| Social avatar | Same as the app icon |

**Never:** in a circle (that makes it a seal), with a ribbon, stars, laurel or any border, filled
with brass color, given a drop shadow, or used on a page a firm's client sees or on a platform's.
There the plate belongs to the firm, and CoFile appears only in the authorization's words (3.4).
The only brass-metal Name Plates anywhere are the real ones in the photographs.

### 3.3 The wordmark

**"CoFile"**, capital C and capital F, one word, drawn as a logotype by a lettering artist who works
in the engraver's Scotch roman tradition, using **Miller Display** (the headline face, 5.1) as the
reference for proportion and contrast. It is drawn, not typed, and not traced from the font (Hal,
Tomás).

Drawing spec, on a 1000-unit em with a cap height of 700:

| Letter | Spec |
|---|---|
| **C** | Vertical stress. A sharp beak serif on the upper terminal (beak 56 units long); a softer bracketed lower terminal. Aperture opened 4% against the reference so it holds at 13 px. |
| **o** | x-height 476 (0.68 of cap height), overshoot 12. Hairlines top and bottom at 1:5 contrast, a touch finer than the text cut. Kerned C–o −20. |
| **F** | Top arm extended 6% past the reference glyph; middle arm shortened 8% and set at 52% of cap height, so the gap after the F doesn't open up. F–i kerned −10. The top arm must clear the i's dot by at least 40 units. |
| **i** | **The dot is a lozenge**: a square turned 45°, its diagonal 1.25 × the stem width, its lower point 70 units above the x-height. It echoes the plate's chamfer and is the wordmark's one quirk; no text face uses it (Hal). |
| **l** | Ascender 728, 4% above cap height, as in engraved romans. i–l 0. |
| **e** | Level crossbar at 58% of x-height; a fine, slightly lifted hairline terminal. l–e −5. |
| **Spacing** | Tracking +10/1000 at display sizes. |

**Two masters.** *Display*, for 20 px and up, at the contrast above. *Small*, for 11 to 19 px (the
header on phones, and any other setting under 20 px): contrast 1:2.5, x-height raised to 0.72 of cap
height, spacing +30/1000, the lozenge enlarged to 1.5 × stem, and no hairline thinner than 1 CSS px
at a 13 px font size (Marcus, Priya, Tomás all ask for a small master).

**Colors.** Plate Ink on light grounds, Night Ink `#ECE8DF` on dark. On CoFile's own pages only
(register 1, the desk and the dashboard included), in the header and footer lockup, the lozenge may
be **Brass Line** `#A87A1E` on light grounds and Brass on dark: CoFile's one point of metal in its
own name. Everywhere else (emails, the docs) the lozenge is the letters' color. Never set in a
firm's color, never in Brass as a whole, never outlined, never all caps, small caps or lowercase:
"you don't change a person's name to fit a style" (Hal).

**Lockups.**

- **Horizontal** (header, footer): plate, then wordmark. Plate height = 1.15 × the wordmark's cap
  height; gap = 0.6 × plate height; the plate's centre line aligns with the wordmark's x-height
  centre. Header lockup 28 px tall on desktop, 24 px on phones.
- **Stacked** (social card, the 404, CoFile's email header): plate above the wordmark, centred,
  gap 0.5 × plate height.
- **Wordmark alone**: in running text in the docs header.
- **Clear space**: one cap height on every side. **Minimum**: wordmark 8 px cap height; lockup
  12 px cap height.

**Interim, until the lettering is delivered:** "CoFile" set in Miller Display Semibold, tracking
+10, with its stock dot. Same metrics, so nothing moves when the drawn wordmark lands.

### 3.4 Where CoFile appears to a firm's client

Nowhere, except one line of fine print (decision 12). The merged spec's Imprint, the small "with
CoFile" at the foot of every sheet a client saw, is retired as an object, and the widget's "Filed
with CoFile" with it: a firm's client sees only the firm. No mark, wordmark, Imprint, link, Miller
or Brass of ours appears on the client intake form, client link pages, the firm's page for each
filing, emails to the firm's clients, a platform's white-label pages or the embed widget. It is the
merge's old rule for client pages, "nothing should pull a client away from their firm" (Greta,
Rosa, Marcus, Priya), carried to its end.

The one place a client meets CoFile's name is the **authorization text counsel confirmed** on the
client form, which names the filing company as "{firm}, filing through CoFile" (for example
"Harbor & Pine CPA, filing through CoFile"). It is set as the form's normal authorization text,
exactly like the statements around it (10B.12.2, 11.3): the client page's body type, Plate Ink,
never set apart, bolded, linked or set in CoFile's type or color, and its words unchanged. That fine
print is what the locked line "Ours in small type." now refers to; the Firms headline stays as
written, and still sets the line small (5.4).

On CoFile's own pages (register 1, the desk and the proof included) CoFile is simply the house: its
lockup heads the page (3.1, 6.8), and nothing there marks it as "with" anyone.

For firms' list line "The only sign of us is a small “with CoFile”." no longer describes the
product; whether it changes is the copy owner's call `[copy needed]`.

### 3.5 The Letterhead: how a firm's logo, name, color and font sit on its clients' pages

Every page a firm's client sees (register 2, 2.4) opens with the Letterhead, the system a stationer
builds for a client's stationery, made to take any logo and any color a firm uploads and make it
look intended (Hal). The desk and the proof don't: they are in CoFile's look, and there the firm is
content (below, "On CoFile's pages").

**Anatomy, top to bottom:**

```
CEREMONIAL PIECES (emails to the firm's clients; a platform's own proof, register 3): centred

                        [   firm logo   ]               ← head margin 32 px (20 px phone)
                        Harbor & Pine CPA               ← typeset name, when shown
   ═══════════════════════════════════════════════════  ← 3 px --firm, full sheet content width
   ───────────────────────────────────────────────────  ← 1 px --firm-2, 2 px below
                                                           20 px below the logo block

WORKING PIECES (intake form, client link pages, the firm's page for each filing): left-aligned

   [ logo ]  Harbor & Pine CPA
   ═══════════════════════════════════════════════════
   ───────────────────────────────────────────────────
```

The firm never chooses the alignment; the page decides (Hal).

**On CoFile's pages, the firm is content.** The desk and the proof carry no Letterhead and no Firm
Rule. The desk's header is CoFile's, the dashboard's (6.8, 10C.2): the lockup, then, past a
1 × 24 px Rule divider, the **account label**: the firm's logo small, **24 px tall** (processed as
below; a wide wordmark at most 160 px wide), then the firm's name in `ui` 17 / 24 Founders Grotesk
Text Medium, Plate Ink, always shown, never in the firm's font or color; a 1 px Plate Ink rule runs
under the row. With no logo the label is the name alone. The **proof** names the firm and its client
in its head as text, "Harbor & Pine CPA · Two Sisters Bakery LLC" (6.8). The firm's colors and font
appear on CoFile's pages only inside pictures and previews of its client pages (2.4).

**1. The logo: processing at upload** (in the browser when the firm uploads in Branding, and again
on the server for older logos; the firm sees the before and after in the setup preview):

1. **Trim** transparent and near-white margins (OKLCH L > 0.96) to the ink's bounding box, then add
   4% padding back (Dev, Priya).
2. **Read the background** from the outer 2 px ring of the trimmed image:

| What we find | What we do |
|---|---|
| Transparent | Sits straight on the sheet |
| Solid white or near-white (a JPEG with a white box) | Sits straight on the sheet: the sheet is always pure `#FFFFFF`, so the box disappears (Hal, Greta). Off white (the desk's account label in dark mode), it goes on the white logo plate (below) |
| Solid color or dark box | Shown exactly as uploaded, square corners, as a deliberate tile. No extra plate, border or rounding |
| Busy or photographic | Shown as uploaded with a 1 px Rule hairline around it |
| Light marks on transparent (mean OKLCH L of ink pixels > 0.80, a logo made for a dark website) | Sits on a **logo plate** filled with `--firm-fill`: a rectangle with `--chamfer` corners (6.4), padding 8 × 12 px (Priya, Tomás). In the desk's account label the plate is Plate Ink, padding 4 × 6 px, so no firm color is spent on CoFile's chrome |

3. **Classify by shape**, from the trimmed aspect ratio r = width ÷ height: *wide* r ≥ 2.5, *mid*
   1.6 ≤ r < 2.5, *square or tall* r < 1.6.
4. **Size by area, not by height**, so a wide wordmark and a square emblem look like peers (Jun,
   Elaine): height h = √(A ÷ r), then clamp.

| Surface | Target area A | Height clamp | Max width |
|---|---|---|---|
| Sheets, desktop (forms, client pages; a platform's proof) | 6,400 px² | 28–64 px | 280 px |
| Sheets, phone | 4,400 px² | 24–48 px | 220 px |
| Emails to the firm's clients | 5,000 px² | 28–56 px | 260 px |
| The desk's account label (register 1) | none: fixed height | 24 px | 160 px |

   Worked at 6,400 px²: a square logo hits the 64 px cap (64 × 64); a 2:1 logo is 57 × 113; a 4:1
   wordmark 40 × 160; an 8:1 wordmark 28 × 226.
5. **Rasters** are never upscaled past half their native pixels; a small logo is shown at native
   size ÷ 2 and the setup preview says why `[copy needed]` (Hal).
6. **Never** recolor, invert, outline, shadow, round the corners of, crop to a circle or stretch a
   firm's logo.

**2. The firm's name, typeset.** Shown beside a square or tall logo, when there is no logo, and
beside a mid logo by default. Hidden on screen next to a wide logo, which almost always contains the
name (kept as visually hidden text and in the page title). A setting in Branding overrides the
default either way `[copy needed: the setting's label]` (Dev, Priya, Hal).

- Set in the firm's font (3.7) at weight 600, in Plate Ink, never in the firm's color: a name in
  ink always reads best, and the color goes into the rule (Hal).
- Sizes: 24 px beside a logo on sheets (20 px on phones); 30 px when there is no logo (24 px on
  phones). (The desk's account label sets the name in Founders Grotesk, above.)
- Tracking by class: −0.01 em for sans faces, 0 for serifs, +0.02 em for condensed or monospaced
  faces (Greta).
- **The ampersand.** If the firm's font family has an italic, the "&" is set in the italic:
  "Harbor *&* Pine CPA". The oldest courtesy in the compositor's book, and it makes almost any
  name look considered (Greta, Elaine).
- **Credentials** ("CPA", "CPAs", "LLC", "LLP", "PC", "PLLC", "& Co."): in the font's real small
  capitals when it has them; otherwise at 88% size with +0.04 em tracking (Greta).
- **Long names** never wrap in the desk's account label: they truncate with the full name in the
  title attribute. On client pages, and in the proof's head, they wrap to two balanced lines and are
  never truncated (Greta, Rosa).

**3. The Firm Rule.** The device that makes any firm's color look like a printing ink rather than a
web stripe (Hal): a **3 px line in `--firm`** (the exact main color), a **2 px gap**, a **1 px line
in `--firm-2`** (the second color, or the main color at 35% over white when there is none). Full
content width of the sheet, 20 px below the logo block. It never appears on a page in CoFile's look
(the desk, the proof, an email to the firm) except inside a preview of a client page. If the main
color is very pale (contrast with white under 1.5:1), a 1 px `rgba(29,33,48,.10)` line runs under
the 3 px line so it still reads as a deliberate edge (Amara). The Firm Rule is the one place the
firm's exact hex always appears at full strength.

**4. The page under the sheet.** The page around the firm's sheets takes a whisper of the firm's
ink, the way a paper mill tints a stock for a client: `--firm-wash` (3.6). With no color set, Bond
`#F5F5F2` (Hal).

**5. No logo yet.** The Letterhead is the typeset name alone, which already looks like letterhead
because the Firm Rule does the work. Where a square symbol is unavoidable on a client's page (the
browser tab, the avatar on an email to a client), the system draws a **monogram tile**: a square
with the plate's 45° chamfered corners, filled with `--firm-fill`, carrying up to two initials in
`--firm-on`, in the firm's font at 600. Initials come from the first two significant words, skipping
"&", "and", "the", "of", "CPA", "CPAs", "LLC", "LLP", "PC", "Inc", "Group": "Harbor & Pine CPA"
becomes "HP" (Amara, Rosa, Priya).

**6. Dark mode.** The sheets a client sees and the proof stay pure white in dark mode, so the logo
is always on the white it was made for (4.6). In the desk's account label, when the desk's chrome
goes dark, the logo sits on a small **white logo plate**: a white rectangle with the Name Plate's
45° corners and 4 × 6 px padding at that size, which quietly ties back to the mark (Hal).

**7. The tab.** On the pages a firm's clients see, the favicon is the firm's square logo crop or its
monogram tile, and the tab title is the firm's name, never CoFile's (Dev). The desk and the proof
carry CoFile's favicon, as every register-1 page does (3.2).

### 3.6 The ink match: making any firm color look its best

A firm gives us a Main color ("Buttons and the top of the page.") and an optional Second color
("Links and highlights."), the product's own Setup labels. A stationer matches a customer's color
as an ink and tells them honestly when it won't print. The system does the same, automatically, in
OKLCH, once when Branding is saved, and writes these custom properties (Hal's ink match, with the
token set from Dev, Priya and Tomás). It never changes the firm's color in its logo or in the 3 px
line of the Firm Rule.

These tokens apply only on register-2 pages (2.4) and on pictures and previews of them (the
empty desk's miniature, the Branding previews, the pictures on CoFile's site). Nothing in CoFile's
look uses them: on the desk and the proof, the jobs below are done by CoFile's own colors (4.2).

| Token | Derivation (OKLCH: L lightness, C chroma, H hue of the main color) | Used for |
|---|---|---|
| `--firm` | The main color, exact | The Firm Rule's 3 px line; the "your turn" lozenge glyph on a client's page; list bullets on client pages |
| `--firm-2` | The second color, exact, if set and distinct (ΔE OK > 0.08); else `--firm` mixed 35% over white | The Firm Rule's 1 px line |
| `--firm-fill` | (a) `--firm` if white text on it reaches 4.5:1. (b) If not, and the color is light (white under 3:1) and Plate Ink on it reaches 7:1, `--firm` with Plate Ink text and a 1 px `--firm-ink` border so the shape holds on white (Dev, Tomás). (c) Otherwise lower L in 0.02 steps, H fixed, C clipped to sRGB, until white reaches 4.5:1 (Hal, Amara, Elaine). (d) If C > 0.20, the fill's C is capped at 0.17 (Hal). (e) If the color is near-white (contrast with white under 1.25:1), a Plate Ink button with a 4 px left edge in `--firm` (Hal) | Primary buttons, the selected choice card, checkbox and radio fills, the monogram tile, the logo plate for light logos |
| `--firm-on` | `#FFFFFF` or Plate Ink `#1D2130`, as chosen above | Text on `--firm-fill` |
| `--firm-ink` | The second color if it reaches 4.5:1 on white; else `--firm` if it does; else `--firm` lowered in L in 0.02 steps until it does | Links, focus rings, the "your turn" chip's text and border on a client's page; the 3 px edge on an answer prefilled on a client's form (with `--firm-row`, 4.2) |
| `--firm-wash` | oklch(0.976, min(C × 0.12, 0.010), H) | The page under the firm's sheets (the mill tint) |
| `--firm-row` | oklch(0.97, min(C × 0.25, 0.025), H) | Hovered and selected rows and checked choice rows on client pages; the wash on an answer prefilled on a client's form, until someone edits it |
| `--firm-tint` | oklch(0.94, min(C × 0.35, 0.045), H) | Highlights on client pages; the focus halo at 50% alpha |
| `--firm-ink-dark` | `--firm` with C ≤ 0.14, L raised in 0.02 steps until it reaches 4.5:1 on Night Card `#1F2230` | Links and focus rings that fall on the Night page around a client's sheet in dark mode |

Text on `--firm-wash`, `--firm-row` and `--firm-tint` is always Plate Ink (12:1 or better). A firm
color is never a page background behind text, never colors body text, and never tints a
photograph (Elaine, Jun).

**Edge cases, designed on purpose.** Tested on the nine ready colors the product's Branding page
already offers (`#1f4fd1`, `#0f766e`, `#15803d`, `#b45309`, `#b91c1c`, `#7e22ce`, `#be185d`,
`#334155`, `#111827`) and on a QA gallery of hostile cases (Priya): yellow `#F2C200`, neon
`#39FF14`, pale pink `#F9C5D1`, near-white `#F5F5F5`, pure black, a 64 px logo, a 4000 px logo, a
white logo on transparent, a logo with 40% padding, a photo as a logo, a script font, a very
condensed font, a 40-character name, a 2-letter name, a Spanish name with accents, no logo, and a
firm whose color equals a status color.

| Case | Rule |
|---|---|
| **Near-black or grey** (C < 0.03) | Everything derives from the exact color; `--firm-wash` becomes Bond `#F5F5F2` so the page never looks muddy. A near-black button looks very sharp (Dev, Tomás) |
| **Bright yellow** `#F2C200` | Fill stays yellow with Plate Ink text (9.5:1) and a 1 px deepened-yellow border; links use the yellow lowered to 4.5:1 (about `#8A6D00`). The Firm Rule stays bright yellow |
| **Pale** (pale pink `#F9C5D1`) | Fill stays pink with Plate Ink text (10.6:1) and a 1 px `--firm-ink` border; the Firm Rule gets its 1 px under-line |
| **Neon** (C > 0.20) | Fills capped at C 0.17; the Firm Rule and the logo keep the exact color; the color is never used for large areas |
| **Red family** (H 15°–40°, C > 0.12), Northgate's Ember included | Errors on that firm's client pages never rely on hue: Madder text plus the problem glyph, a 2 px Madder left rule and a Plate Ink outline, so an error never looks like the firm's button and the button never looks like an error (Dev, Rosa, Tomás) |
| **Green near Verdigris** (H 140°–190°, C > 0.05) | Status chips keep Verdigris; the "Filed" chip is a solid fill with a filled glyph and the "your turn" chip an outline with a lozenge, so shape, not hue, tells them apart (Priya) |
| **Second color too light** (under 4.5:1 on white) | It still draws the Firm Rule's thin line and the highlights; links fall back to `--firm-ink`. The firm still sees both its colors; nothing is illegible (Hal) |

**What never changes on a client's page, whatever the firm picks:** the status colors and glyphs,
the focus ring's construction, the error color, the field borders, the authorization's words (3.4)
(Rosa).

**The setup preview** (Branding) shows every token live on the three surfaces the firm's clients
see, all at once (decision 30): the client page large, and the firm's page for a filing and an email
to a client as thumbnails that swap into the large slot (10B.7.5); the proof's head and the desk's
header are not previewed, since they are in CoFile's look. Beside it, the original color sits next
to any deepened shade, so the firm sees its color done right before any client does `[copy needed:
one line explaining a deepened button color]` (Hal, Rosa, Marcus). The product's existing help text,
"Button text is white, so choose a dark color.", becomes unnecessary once the ink match ships;
whether to change it is a copy decision `[copy needed]` (Dev).

### 3.7 The firm's font on its clients' pages

The firm picks a preset in Branding (Standard (the device's own), Inter, IBM Plex Sans, Roboto,
Open Sans, Lato, Montserrat, Source Serif, Merriweather, Lora) or uploads its own. The rule, on the
pages its clients see (register 2): **the firm's voice for the name and the headings, our
legibility for the facts** (Amara, Greta, Hal). On the desk and the proof (register 1) the firm's
font never appears; the desk's page titles and the proof's title are CoFile's (5.3), and the
firm's name there is set in Founders Grotesk (3.5). On CoFile's pages the firm's font appears only
inside pictures and previews of its client pages.

| Element | Preset font | Uploaded font |
|---|---|---|
| The firm's typeset name in the Letterhead | Firm font 600 | Firm font 600 |
| h1 and h2 on client pages | Firm font 600 | Firm font 600 |
| Primary button labels on client pages | Firm font 600 | Founders Grotesk Medium (uploads often lack the weights or glyphs a button needs) (Priya) |
| Body, labels, fields, help text, tables, chips, fees | Founders Grotesk Text | Founders Grotesk Text |
| Values exactly as they go to the state (5.5) | Founders Grotesk Mono | Founders Grotesk Mono |

- "Standard (the device's own)" uses `system-ui` for the firm roles.
- Every firm font is size-adjusted to Founders Grotesk Text's x-height (`size-adjust`,
  `ascent-override`, `descent-override`, measured at upload for uploaded files, measured once and
  stored in `web/lib/fonts.ts` for presets), so a small-x-height serif never looks timid next to
  the sans and nothing reflows when it loads (Greta, Jun, Tomás).
- Script, decorative or very condensed faces (x-height under 0.40 em, or flagged in setup review)
  are used for the firm's name only; the headings fall back to Founders Grotesk Medium (Greta,
  Tomás).
- If a firm font fails to load, headings fall back to Founders Grotesk, never to CoFile's serif and
  never to Times (Elaine's rule, with our face).
- **CoFile's headline face never appears on a page a firm's client sees, or on a platform's.**
  CoFile's voice disappears there entirely; its name survives only in the authorization's words,
  in the page's own body type (3.4) (Tomás).

### 3.8 The example firms

The copy names two example firms, plus one in a page path. They are commissioned from a small
identity studio as believable, modest, real-looking practices, deliberately unlike each other and
unlike CoFile, using only what the product allows (a logo file, two colors, one preset font), so
every picture shows exactly what CoFile does for a real firm (Jun, Priya, Hal). None may resemble a
real firm's identity; the studio checks names and marks before delivery. Every picture that shows
them keeps its "example" label.

| | **Harbor & Pine CPA** | **Northgate Payroll** | **Best Accounting** |
|---|---|---|---|
| Where | Every picture on the site: the hero (the account on CoFile's desk, and its client page in front), Firms (left door), Requests draft, the proof (named in its head), After, rehearsal programme, How it works | Firms (right door and page); For firms | Only where the copy names it: the firm's filing page example `cofile.app/bestaccounting/llc-filing-new-york`, and the widget example |
| Character | A twenty-year-old, twelve-person CPA practice: traditional, tasteful, a little conservative | A younger payroll company: modern, geometric, crisp | A newer firm with a plain website it likes |
| Logo | A **square symbol**: a pine standing above two short wave lines, drawn in one weight, in Harbor (below). The firm's name is typeset beside it by the system (3.5), which demonstrates the square-logo rule. Also supplied as a JPEG on a white box, to show the box disappearing on the sheet (Jun) | A **wide wordmark**: a gate mark (two posts and a lintel that read as an N) followed by "Northgate Payroll" in a geometric sans, one color, transparent PNG. No name typeset beside it, which demonstrates the wide-logo rule | A plain wide wordmark in a sans, one color, no symbol |
| Main color | **Harbor** `#1D4E63`, a deep harbor blue (white text 9.0:1) (Elaine) | **Ember** `#C2410C` (white text 5.2:1) (Priya) | **Best Blue** `#1F4FD1`, the Branding page's default swatch (white text 6.8:1) |
| Second color | **Pine** `#2B5A47` (7.9:1 on white, so links use it untouched) | none: the thin line of its Firm Rule is Ember at 35%, links use `--firm-ink`, which demonstrates the no-second-color rule | none |
| Font (presets only) | **Lora** (serif), 600 for the name and headings | **Montserrat**, 600 | **Inter**, 600 |
| On its door (photography, D1) | A deep harbor-blue painted wooden door, a **hand-engraved brass plate** "Harbor & Pine CPA" with the italic ampersand, letters filled black | A glazed aluminium-framed door, a **brushed-steel plate** of the same shape engraved "Northgate Payroll" in geometric capitals, filled black (Hal) | none |
| What it proves | A classic dark color, a serif, a square logo with a typeset name | A warm mid-tone next to a cool dark one, a geometric sans, a wide logo alone, the red-family error rule | The product's own default color |

Blue against orange, serif against geometric sans, square symbol against wide wordmark, an old
practice against a young one: if the system makes both look like themselves on the same page, a
visitor believes it will do the same for them (Priya).

The clients (Two Sisters Bakery LLC, Hudson Ledger LLC, Orchard Lane Inc.) never get logos or signs:
they are the firm's clients, shown as names and values only (Dev, Rosa). Ana Ortiz, who sent Two
Sisters Bakery LLC to Harbor & Pine, appears on the desk as its "Sent by" name with the "Your
client" chip (D4).

Two spare example firms for the Branding page and the docs need names `[copy needed: two more
example firm names]` (Jun).

### 3.9 Lines nobody crosses

CoFile is not a government agency and never looks like one, on its own pages or a firm's (Hal,
with every spec agreeing). None of the following appears in any art, photograph, icon,
illustration, texture or document card:

- Circular seals, rosettes, medallions, starbursts, "approved" stamps, notary crimps, embossed foil
  seals, wax seals, ribbons, laurels.
- Guilloche, microprinting, security borders, certificate frames, banknote vignettes, allegorical
  figures, portraits in engraved ovals.
- Eagles, flags, stars-and-stripes, state outlines, capitol domes, columns, scales of justice,
  courthouses, government buildings.
- Red-white-and-blue together, Treasury greens, parchment, blackletter.
- The typefaces of American government sites (Public Sans; Source Sans as used in federal design
  systems), Trajan, Copperplate Gothic.
- Any reproduction of a state's or the IRS's header, logo, letterhead, document or form layout. In
  marketing pictures the state's website is a neutral redraw (plain field rows, no header, no
  seal) and the papers that come back are **CoFile's own document cards** (a typeset label on a
  plain sheet with grey text bars), never facsimiles. In photographs, real papers are edge-on or
  face-down (Hal, Marcus, Priya).
- Padlocks, shields, vault doors, check-in-circle badges, fingerprints, magnifiers over documents,
  "verified" badges, AI sparkles, robots. Not because they're dishonest, but because they would
  make security the story, and it isn't.

---
## 4. Color

### 4.1 The idea: paper, ink and one metal

There is paper, and there is ink. CoFile owns one metal of its own: **Brass**, the metal its Name
Plate is cut from, the plate every firm's name goes on (Hal's paper-and-one-ink system; the metal
moved from his copper to the brass of the plate, in the gold family five of the ten chose for the
action: Greta, Amara, Elaine, Tomás, Marcus). Wherever a firm itself works (the site, the desk, the
proof, the emails it receives) Brass is the one metal, the same for every firm. On the pages a
firm's clients see, Brass steps aside entirely and the firm's own color takes its place (2.4).
Everything else is paper colors and one blue-black ink.

On any CoFile page, squint and you should see warm white paper, dark ink, a firm's color only inside
the client pages a picture shows, and one point of brass to press: on the site, the button that
says "Run a free rehearsal".

### 4.2 CoFile's palette, light

Contrast figures are measured (WCAG 2.x) against the ground named.

| Token | Name | Hex | Role | Contrast |
|---|---|---|---|---|
| `--cotton` | **Cotton** | `#FBFAF6` | The page on every CoFile page: a warm white like 100% cotton letter paper, not cream, not parchment (Hal; the same hex as Elaine's Coated White) | — |
| `--sheet` | **Sheet** | `#FFFFFF` | Every sheet: the proof, forms, cards, the desk, client pages, document cards, the price card. Firm logos always sit on it | — |
| `--ink` | **Plate Ink** | `#1D2130` | All text, the mark, dark rules, the footer's thick-and-thin, the reached dots of the desk's stage track. A blue-black like engraving ink | 15.3:1 on Cotton, 16.0:1 on Sheet |
| `--graphite` | **Graphite** | `#555867` | Secondary text, captions, example labels, ledes on Cotton 2, the stage track's "Proof, step 2 of 5", the text of the desk's "Your client" chip. The lightest text allowed anywhere; deliberately dark because older eyes lose pale grey first (Greta) | 6.8:1 on Cotton, 7.0:1 on Sheet, 6.2:1 on Cotton 2 |
| `--brass` | **Brass** | `#D9A84A` | **CoFile's one accent.** The primary button fill on every page in CoFile's look, the desk and the proof included (Plate Ink text); the mark on dark grounds. Never text on paper | Plate Ink on it 7.4:1; on paper only 2.1:1, so never a text or line color on light grounds |

**Supporting tones:**

| Token | Name | Hex | Role | Contrast |
|---|---|---|---|---|
| `--cotton-2` | Cotton 2 | `#F3F0E8` | Quiet bands (the proof's section, the beta notice, the footer), table header rows, inline code, the fill of the desk's neutral "Your client" chip (Graphite text 6.2:1; never a status color) | Plate Ink 14.1:1 |
| `--bond` | Bond | `#F5F5F2` | The page under a firm's sheets when the firm has no color set | Plate Ink 14.7:1 |
| `--rule` | Rule | `#DDD7CB` | Hairlines, dividers, card borders, the unreached dots of the desk's stage track. Decorative only, never the only edge of a control | 1.4:1 |
| `--rule-strong` | Rule Strong | `#8A8578` | Field borders, checkbox and radio outlines, the outline button, the price card's thickness edge, dot leaders | 3.5:1 on Cotton, 3.7:1 on Sheet (meets 3:1 for controls) |
| `--brass-deep` | Brass Deep | `#C99A3F` | Primary button hover and pressed fill | Plate Ink on it 6.2:1 |
| `--brass-line` | Brass Line | `#A87A1E` | Brass as a **line** on light grounds: link underlines on CoFile pages (the desk's included), the kicker's lead rule, the lozenge bullets, the current-page nav underline (the site, the desk, the dashboard), the 2 px rule at the current heading in Terms' and Privacy's contents rail, leader lines and phrase underlines in marketing pictures, the wordmark's lozenge in the lockup, the 3 px edge on an answer CoFile filled in on the desk's forms (decision 38) | 3.7:1 on Cotton, 3.8:1 on Sheet (non-text 3:1) |
| `--brass-ink` | Brass Ink | `#7A5714` | Brass as **text**, rarely: the "from the text" source tag in the Requests picture | 6.3:1 on Cotton, 6.6:1 on Sheet |
| `--brass-tint` | Brass Tint | `#F6EBD0` | The highlighter behind words that travel in CoFile's marketing pictures (the client's phrases and where they land); selected rows on the dashboard and the desk; the wash on an answer CoFile filled in on the desk's forms, until someone edits it (decision 38); the "check this" highlight on the proof; the wash on the part of the sample proof a point beside it names (decision 19) | Plate Ink 13.5:1 |
| `--signature-ink` | Signature Ink | `#26336A` | The stroke of every signature drawn on the signature pad: an iron-gall blue-black, so a signature looks like a pen did it, never a brand color (Hal) | 11.9:1 on Sheet |

### 4.3 Status colors and shapes

Status is never shown by color alone: every tone has a glyph and its words, using the product's own
labels (`web/lib/status.ts`) and, in the home pictures, the stand-ins' labels (all ten). Status
colors mean the same thing on every surface, including the pages a firm's clients see.

| Tone | Text | Fill | Glyph (12 px) | Labels |
|---|---|---|---|---|
| **Done** | `#FFFFFF` | Verdigris `#2E6B57` solid | filled circle ● in white | "Live", "Filed", "Filed, IRS letter saved", "Approved", "Submitted to the state", "Accepted by the state", "Completed", "EIN issued", "Matches the proof" |
| **Done, quiet** (dense tables, the What we file table) | Verdigris `#2E6B57` | Verdigris Tint `#E4F0EA` | filled circle ● | the same labels where a solid chip would be too loud (5.4:1) |
| **Your turn** (on CoFile's pages: the filing desk, the proof, the platform dashboard, emails to the firm, and pictures of them) | Ochre `#855A0C` | Ochre Tint `#F7EDD8` | lozenge ◆ | "Proof ready to approve", "Ready to approve", "Waiting for approval", "Needs information", "Changes requested", "Your proof is ready" (5.2:1). The firm's own next step: an invitation, not a warning, told from Attention by its lozenge and its words (Dev, Amara, Hal) |
| **Your turn** (on a page a firm's client sees, where the client has a step to take) | `--firm-ink` | Sheet, 1 px `--firm-ink` border | lozenge ◆ in `--firm` | the same labels, in the firm's own color |
| **Attention** | Ochre `#855A0C` | Ochre Tint `#F7EDD8` | half-filled circle ◐ | "Name unavailable", "On hold", "Being checked", "Paused: state site changed", "Ready to pay" |
| **In hand** | Iron `#3F434F` | Sheet, 1 px Iron border | ring ○ | "Received", "Queued", "Getting the state's review page", "Filing now", "Final check", "Submitted" (9.9:1) |
| **Problem** | Madder `#9A2D2D` | Madder Tint `#F8E6E3` | a short bar ▬ (never a warning triangle) | "Needs correcting", "Rejected by the state", "Failed", "Stopped", and field errors (6.3:1; Madder on Sheet 7.5:1) |
| **Rehearsal** | Plate Ink | Sheet (or transparent), **1.5 px dashed Plate Ink border, dash 4 / gap 3** | the ghost-light glyph (4.4) | "Rehearsal", "Test", the "Beta" chip, "Rehearsed to the payment screen" |

On the desk, Done (solid Verdigris, ●) and Your turn (Ochre, ◆) differ in hue, fill and glyph. On
a client's page, Done keeps its solid fill and Your turn takes the firm's outline, so on a green or
teal firm's page the two can never be confused by hue (Priya's clash rule, 3.6).

**The desk's ledger** adds two neutral marks (added by the owner, Nov 26; 10B.4): the **"Your
client"** chip in the "Sent by" column (Cotton 2 fill, Graphite text, `chip` type, `--chamfer-s`;
not a status, so never a status color or glyph), and under each status chip a **stage track**: five
8 px dots, reached ones Plate Ink and the rest Rule, then "Proof, step 2 of 5" in 13 px Graphite (5.3),
read aloud "Step 2 of 5: Proof". A rejected, failed or stopped filing has no track: its status says
what happened.

### 4.4 The rehearsal's mark: spike tape and a ghost light

A rehearsal looks like the real thing marked out in dashes, the way spike tape marks positions on a
stage floor before the show (Dev), with the theater's own sign, the ghost light (Tomás). One
treatment, everywhere a rehearsal appears, on CoFile's pages and the pages a firm's clients see
alike, because dashes and a bulb work with any firm color:

- **Dashed** outline, 1.5 px Plate Ink, dash 4 px, gap 3 px, on chips, notices and the beta chip.
  Dashed means rehearsal; solid means live. Never dashed for anything else on the site.
- **The ghost-light glyph** (Tomás), 14 px: a bare bulb (a 6 px circle, 1.5 px stroke) in a wire
  cage (two 1.25 px arcs) on a stand (a vertical line to three short feet). It replaces any warning
  triangle for rehearsals: a rehearsal is a stage, not a hazard.
- No Brass on a rehearsal chip, so it can sit on a client's page; no red, ever, and no special
  color on the run's last line.

### 4.5 Coverage marks: the plate glyphs

The three tones the coverage copy uses, plus "Planned" on What we file, are one small glyph: the
Name Plate's outline without screws, 16 × 10 px, chamfered (Hal). Cut, then marked out, then
inked, so the scale reads in grayscale, for color-blind readers and in print.

| Stage (the copy's legend words) | Glyph |
|---|---|
| **Live** | Solid Verdigris plate with a 1 px Cotton line engraved across its middle: inked |
| **Rehearsed to the payment screen** | The plate outline in 1.5 px **dashed** Plate Ink (the rehearsal mark), empty |
| **Screens recorded or offered, rehearsal next** | The plate outline in 1 px solid Graphite: cut, not yet marked |
| **Planned** (What we file only) | The plate outline in 1 px dotted Rule Strong |

Every glyph carries its status as its accessible name, and a visible legend in words sits under
every set of tiles.

### 4.6 Dark mode: night stock

Fine stationers sell black card printed in light ink; dark mode is that card (Hal). The site
follows the system setting, with a manual override (`data-theme`).

| Light token | Dark value | Contrast |
|---|---|---|
| Cotton (page) | Night `#14161E` | — |
| Cotton 2 (quiet bands) | Night 2 `#1A1D27` | — |
| Sheet as CoFile's own card (pricing card, auth cards, dashboard and desk panels) | Night Card `#1F2230`; raised `#2A2D3B` | — |
| Plate Ink (text) | Night Ink `#ECE8DF` | 14.8:1 on Night, 12.9:1 on Night Card |
| Graphite | `#A9ABB5` | 7.9:1 on Night, 6.9:1 on Night Card |
| Rule / Rule Strong | `#323646` / `#6E7180` | Rule Strong 3.7:1 on Night |
| Brass (button fill) | Brass `#D9A84A`, unchanged, with **Night** `#14161E` text | 8.3:1 |
| Brass Deep (hover) | `#C99A3F`, Night text | 7.0:1 |
| Brass Line | Brass `#D9A84A` (on dark, the full Brass serves as line and, rarely, text) | 8.3:1 |
| Verdigris (done) | `#6FB39A` text on `#18302A`; solid chip `#2E6B57` with white text unchanged | 5.7:1 on its tint, 6.5:1 on Night Card |
| Ochre | `#E3B567` on `#2B2416` | 8.1:1 |
| Madder | `#E58B85` on `#2E1B1C` | 6.3:1 |
| Iron | `#C3C6CF` on `#2A2D3B` | — |
| Rehearsal dashes | Night Ink | — |
| The rehearsal stage band | deepens to `#0E1016` so it still reads as a change of scene | Night Ink 15.6:1 |
| Firm tokens on Night around a client's sheet | `--firm-ink-dark` (3.6) | ≥ 4.5:1 |

**What stays light in dark mode** (all ten agree on the proof; Hal, Greta, Marcus and Elaine on
the rest):

- **The proof**, always: it is a sheet of paper, and the firm approving a filing sees it exactly as
  it will be kept.
- **The firm's client-facing pages** (intake form, client link pages, the firm's filing pages,
  the widget) and **every email**, to a firm or to its clients: the firm's logo and colors were
  chosen for white paper, and mail is read, printed and forwarded on white. The page around the
  sheet goes to Night; the sheet stays `#FFFFFF` and every color on it stays as in light mode.
- **The product pictures on CoFile's site**: white sheets on the dark page, lit like paper under a
  lamp. Their shadow switches to the dark elevation (6.4).
- **Photographs** are never inverted or tinted; they take a 4% darkening at most.

The filing desk (the firm staff's own working pages) follows the system setting exactly as the
platform dashboard does (10C.1): Night chrome, tables on Night Card, Brass buttons with Night text.
The firm's logo in the account label sits on the white logo plate (3.5), and every preview of a
client page (the empty desk's miniature, the Branding previews) stays a white sheet.

### 4.7 The example firms' colors, with their derived tokens

Computed with the ink match (3.6). Use exactly these in every picture and preview of a client
page.

| Token | Harbor & Pine CPA | Northgate Payroll | Best Accounting |
|---|---|---|---|
| `--firm` (main) | Harbor `#1D4E63` | Ember `#C2410C` | Best Blue `#1F4FD1` |
| `--firm-2` (second) | Pine `#2B5A47` | Ember at 35% over white (`#EABCAA`) | Best Blue at 35% (`#B1C1EF`) |
| `--firm-fill` | `#1D4E63` (white 9.0:1) | `#C2410C` (white 5.2:1) | `#1F4FD1` (white 6.8:1) |
| `--firm-on` | `#FFFFFF` | `#FFFFFF` | `#FFFFFF` |
| `--firm-ink` (links, focus, your turn) | Pine `#2B5A47` (7.9:1) | `#C2410C` (5.2:1) | `#1F4FD1` (6.8:1) |
| `--firm-wash` (page under the sheet) | `#F2F8FB` | `#FEF5F2` | `#F4F7FE` |
| `--firm-row` | `#EBF7FE` | `#FFF0E9` | `#EDF5FF` |
| `--firm-tint` | `#DDEEF7` | `#FFE2D6` | `#DCECFF` |
| `--firm-ink-dark` | `#6394AB` | `#D76E4D` | `#628AE2` |
| Rules that apply | — | Red family: the error rule (3.6) | — |

Hex values for the wash, row and tint tokens are the OKLCH formulas rounded to sRGB; the build
computes them, and these are the reference values to check against.

### 4.8 How color is used

- **Proportions on a CoFile page:** about 85% paper (Cotton, Cotton 2, Sheet) and Plate Ink type;
  about 8% the example firms' colors, only inside the client pages that pictures show (and the
  logo in a pictured desk's account label) and in photographs; about 5% the
  one Night band (the rehearsal stage) and the dark photographs; no more than 2% Brass (Hal,
  Elaine, Tomás).
- **One Brass button per screen.** On any viewport-height of any CoFile page there is at most one
  Brass-filled button. While the hero's "Run a free rehearsal" is in view, the header's copy of it
  is drawn as an outline button (1 px Plate Ink, Plate Ink text) and it turns Brass, with a 200 ms
  crossfade, once the hero's button has scrolled away. The phone's sticky bar follows the same rule
  (Elaine, Marcus). The desk and the proof keep the same rule: on the desk, Brass for the page's
  one main action (the dashboard's button kinds, 10C.1); on the proof, "Approve, and authorize
  submission and payment", at the end, never sticky, full width on phones.
- **Brass inside a picture.** A picture of a page in CoFile's look (the desk, the sample proof)
  draws its one main action in Brass, as the product does: the desk's "New filing", the sample
  proof's "Approve for filing". It is part of a sheet, not a second button to press: drawn at true
  size, never pulsing, not focusable, and the only Brass on its sheet. The one-Brass-button rule
  counts the buttons a visitor can press.
- **Brass is never text on paper**, never a field color, never a page or section background,
  never a gradient, and **never on a page a firm's client sees, a platform's page, or an email to
  a firm's client**. There the firm's color does Brass's job and CoFile is absent (3.4). On the
  desk, the proof and emails to the firm, Brass is CoFile's, the same for every firm (Hal; decision
  2).
- **Links** on CoFile's pages (the desk and the proof included) are Plate Ink, underlined 1 px in
  Brass Line with a 3 px offset; on hover the underline thickens to 2 px and turns Plate Ink
  (Elaine's construction, our metal). On the pages a firm's clients see, links are `--firm-ink`,
  underlined in the same color. Links are always underlined: older readers look for the underline
  (Hal, Priya).
- **The firm's color lives inside the client pages** that pictures and previews show, on the site
  and on the desk alike. Outside them the page is paper, ink and one point of Brass (Marcus).
- **Status colors appear only on chips, notices, glyphs and the coverage plates.** Red appears only
  for something that went wrong (Jun, Tomás).
- **Gradients:** none, except the light inside photographs and the soft pool of the ghost light
  over the rehearsal programme (a radial from `rgba(255,196,107,.16)` to transparent at 70%, the
  one gradient on the site) (Marcus, Hal).
- **Texture:** a scanned cotton-paper texture at 3% (multiply), tiled at 512 px, on Cotton grounds
  only; Night carries a scanned black-card texture at 4% (screen). Sheets have none: a client's
  details sit on clean white. Both are switched off with `prefers-reduced-transparency`, on
  low-power devices and in Windows High Contrast (Hal).
- **Never:** red, white and blue together (3.9); a firm's color on CoFile's own chrome, the
  desk's and the proof's included; color as the only signal; glows, glass or colored shadows.

### 4.9 Tokens

```css
:root {
  /* CoFile */
  --cotton: #FBFAF6;  --cotton-2: #F3F0E8;  --sheet: #FFFFFF;  --bond: #F5F5F2;
  --ink: #1D2130;     --graphite: #555867;  --rule: #DDD7CB;   --rule-strong: #8A8578;
  --brass: #D9A84A;   --brass-deep: #C99A3F; --brass-line: #A87A1E; --brass-ink: #7A5714;
  --brass-tint: #F6EBD0; --signature-ink: #26336A;
  --night: #14161E;   --night-2: #1A1D27;   --night-card: #1F2230; --stage: #14161E;
  /* status */
  --done: #2E6B57;    --done-tint: #E4F0EA;
  --ochre: #855A0C;   --ochre-tint: #F7EDD8;
  --madder: #9A2D2D;  --madder-tint: #F8E6E3;
  --iron: #3F434F;
  /* set per firm by the ink match, for register-2 pages and previews of them; Harbor & Pine shown */
  --firm: #1D4E63;  --firm-2: #2B5A47;  --firm-fill: #1D4E63;  --firm-on: #FFFFFF;
  --firm-ink: #2B5A47;  --firm-wash: #F2F8FB;  --firm-row: #EBF7FE;  --firm-tint: #DDEEF7;
  --firm-ink-dark: #6394AB;
}
@media (prefers-color-scheme: dark) {
  :root:not([data-theme="light"]) {
    --cotton: #14161E;  --cotton-2: #1A1D27;  --bond: #14161E;
    --ink: #ECE8DF;     --graphite: #A9ABB5;  --rule: #323646;  --rule-strong: #6E7180;
    --brass-line: #D9A84A; --brass-ink: #D9A84A; --stage: #0E1016;
    --done: #6FB39A;  --done-tint: #18302A;  --ochre: #E3B567;  --ochre-tint: #2B2416;
    --madder: #E58B85; --madder-tint: #2E1B1C; --iron: #C3C6CF;
    /* --sheet stays #FFFFFF for sheets; CoFile's own cards use --night-card */
  }
}
:root[data-theme="dark"] { /* the same values as the media-query block */ }
```

---
## 5. Typography

Three families, one lineage. The Scotch roman and the early grotesques both came out of the
Edinburgh typefoundries of the 1800s (Miller & Richard among them), and American engravers and job
printers set letterheads and price lists in them for a hundred years (Hal). Miller is drawn from
that Scotch roman tradition; Founders Grotesk from those grotesques. **Miller speaks** (headlines,
ledes, prices: the voice of a well-made letter). **Founders Grotesk works** (everything you read,
fill in, check or press). **Founders Grotesk Mono types** (exactly what goes to the state, and
code).

### 5.1 The faces

| Role | Face | Foundry, license | Cuts used | Why |
|---|---|---|---|---|
| **Display**: headlines, page titles, prices, the close | **Miller Display** | Font Bureau (Matthew Carter), through Type Network; web, desktop and app licenses | Roman 400, Italic 400, Semibold 600 (the interim wordmark only) | An engraver's Scotch roman with real contrast and authority at 52 to 160 px, civil at 34 px. It reads as established, the way a good firm's letterhead does, without pastiche. Figures that make a price look like a fact (Hal, Elaine, Jun) |
| **Text serif**: ledes, long reading on CoFile's own pages (Terms, Privacy, docs prose) | **Miller Text** | Font Bureau, Type Network | Roman 400, Italic 400 | The same family's text cut: sturdier hairlines and a larger x-height for 18 to 24 px, so a lede reads like a well-printed letter (Hal) |
| **Working sans**: body, UI, forms, tables, buttons, chips, captions, the proof's data, the desk, every client page's body | **Founders Grotesk Text** (20 px and below) and **Founders Grotesk** (21 px and above) | Klim Type Foundry; web license covering cofile.app and every firm and client page under it, the embed widget wherever it renders, app and desktop | Regular 400, Medium 500 | A plain, honest grotesque with open shapes that holds up at 17 to 18 px for older eyes, and the same Edinburgh lineage as the Scotch roman. Never too clever to sit beside any firm's font (Hal, Elaine's National 2 in the same role) |
| **Mono**: values exactly as they go to the state, references, URLs, API keys, code | **Founders Grotesk Mono** | Klim | Regular 400, Medium 500 (totals in drafts only) | Shares the grotesque's proportions, so a value sits beside its label without a jolt; 0/O and 1/l/I are distinct. A value in mono always means "this is exactly what will be typed" (Jun, Elaine, Dev, Priya, Tomás) |
| **The firm's font** (the pages its clients see, and pictures and previews of them, only) | The firm's preset or upload | — | 400, 600 | Rules in 3.7 |
| **Emails** | System stacks (below); on emails to a firm's clients, the firm's font where the mail client supports web fonts | — | — | Web fonts are unreliable in mail; every email layout is designed to survive the fallback (Greta, Dev, Priya) |

**Where each face may appear.** Miller appears only on CoFile's pages (register 1, 2.4), the desk,
the proof and emails to the firm included; never on a page a firm's client sees, a platform's page
or an email to a firm's client. Founders Grotesk appears everywhere. This keeps the firm's own
typography, often a serif logo, the only voice with personality on the pages its clients see
(Priya, Tomás).

**Commissioned (lettering, not fonts):** the CoFile wordmark and the "Co" of the Name Plate (3.2,
3.3), from a lettering artist in the engraver's tradition. The example firms' plates are engraved
by hand by a real engraver (Direction D1); that is craft, not a font. No custom type family is
commissioned (`DECISIONS.md`).

**Stand-ins until licenses and lettering are in place.** Prototypes and open builds use the
fallback stacks below, which are metric-adjusted so swapping in the licensed faces moves nothing.
The interim wordmark is in 3.3.

**Fallback stacks**, each with a metric-matched `@font-face` fallback (`size-adjust`,
`ascent-override`, `descent-override`):

```css
--font-display: "Miller Display", "Miller Text", Georgia, "Times New Roman", serif;
--font-serif:   "Miller Text", Georgia, "Times New Roman", serif;
--font-sans:    "Founders Grotesk Text", "Founders Grotesk", "Helvetica Neue", Arial, system-ui, sans-serif;
--font-mono:    "Founders Grotesk Mono", ui-monospace, "SF Mono", Menlo, Consolas, monospace;
/* emails */
--font-email-head: Georgia, "Times New Roman", serif;          /* emails in CoFile's look only */
--font-email-body: -apple-system, "Segoe UI", Helvetica, Arial, sans-serif;
```

**Files and loading.** Self-hosted WOFF2, subset to Latin plus Latin Extended-A (Spanish á é í ó ú ü
ñ ¿ ¡, and client names such as "Lucía", "Muñoz", "Gonçalves"), with `kern`, `liga`, `tnum`, `lnum`,
`onum`, `case`, `smcp` and `frac` kept. Preload Miller Display Roman and Founders Grotesk Text
Regular and Medium (Latin subset) on CoFile's pages, the desk and the proof included; client pages
preload only Founders Grotesk Text and the firm's font. Everything else `font-display: swap`.
First-load font weight under 160 KB on the home page.

### 5.2 The scale: CoFile's own pages

Sizes are fluid between a 390 px and a 1440 px viewport with `clamp()`, set in rem so they grow
with the reader's own text-size setting; tablet values are what the clamp gives at 834 px. Line
heights snap to 2 px.

| Token | Face | Desktop (1440) | Tablet (834) | Phone (390) | Weight | Tracking | Used for |
|---|---|---|---|---|---|---|---|
| `price-xl` | Miller Display, lining figures | 160 / 144 | 120 / 108 | 88 / 80 | 400 | −1.5% | "$45" in "$45 a filing. EIN included with a formation." on the home page and the Pricing page: **the biggest number on the page**, a size change inside the headline, not a new word (Hal, Greta) |
| `display-xl` | Miller Display | 72 / 76 | 56 / 60 | 42 / 46 | 400 | −1% | The hero h1 only |
| `display-page` | Miller Display | 60 / 64 | 50 / 54 | 38 / 42 | 400 | −0.8% | The h1 of the seven pages behind the home page |
| `display-l` | Miller Display | 52 / 56 | 44 / 48 | 34 / 38 | 400 | −0.6% | Home section h2s, the close, "Your name on the door." |
| `price-l` | Miller Display, lining figures | 56 / 60 | 48 / 52 | 44 / 48 | 400 | −0.5% | The price card's left items ("$25", "$15", "Plans from $250"), plan prices on the Pricing page |
| `display-m` | Miller Display | 36 / 42 | 32 / 38 | 28 / 34 | 400 | −0.3% | Section h2s on the pages behind the home page, the coverage place names, auth card titles, the 404 |
| `display-s` | Miller Text | 26 / 32 | 24 / 30 | 22 / 28 | 400 | 0 | h3: step titles, plan names, card titles, Questions' questions |
| `lede` | Miller Text | 22 / 34 | 21 / 32 | 19 / 30 | 400 | 0 | Section ledes and the hero sub, max 34 em |
| `small-type` | Miller Text Italic | 18 / 26 | 17 / 24 | 16 / 22 | 400, Graphite | 0 | "Ours in small type." inside the Firms h2, and nowhere else |
| `body` | Founders Grotesk Text | 18 / 29 | 18 / 29 | 17 / 27 | 400 | 0 | Paragraphs, answers, step text |
| `list` | Founders Grotesk Text | 19 / 28 | 19 / 28 | 18 / 26 | 500 | 0 | The home page's short lists (the four Firms items, the three proof items, the three After items) |
| `kicker` | Founders Grotesk | 16 / 22 | 16 / 22 | 15 / 22 | 500, Graphite | +0.5% | "For CPA, payroll, fractional CFO and title firms", "Pricing for firms": sentence case, led by a 24 × 1.5 px Brass Line rule at x-height; may wrap to two lines (Spanish) |
| `nav` | Founders Grotesk Text | 17 / 24 | 17 / 24 | 24 / 32 in the menu sheet (Miller Text) | 400 | 0 | Header links |
| `button-l` | Founders Grotesk | 18 / 24 | 18 / 24 | 18 / 24 | 500 | +0.2% | 56 px buttons |
| `button-s` | Founders Grotesk Text | 16 / 20 | 16 / 20 | 16 / 20 | 500 | +0.2% | 40 to 44 px buttons (the header CTA) |
| `ui` | Founders Grotesk Text | 17 / 24 | 17 / 24 | 17 / 24 | 400 | 0 | Interface text, tables on CoFile's pages |
| `small` | Founders Grotesk Text | 15 / 23 | 15 / 23 | 15 / 23 | 400, Graphite | 0 | Notes, "State fees separate…", the security line, the beta notice, the legal line. **The floor for any running text** |
| `caption` | Founders Grotesk Text | 14 / 20 | 14 / 20 | 14 / 20 | 400, Graphite | +0.5% | Picture captions and example labels ("Example · test details · not a real firm") |
| `mono` | Founders Grotesk Mono | 16 / 24 | 16 / 24 | 15 / 22 | 400 | 0 | Values in pictures, URLs, `"dryRun": true` |
| `code` | Founders Grotesk Mono | 15 / 24 | 15 / 24 | 14 / 22 | 400 | 0 | Docs code blocks |

Example clamps: `display-xl: clamp(2.625rem, 1.929rem + 2.857vw, 4.5rem)`;
`price-xl: clamp(5.5rem, 3.829rem + 6.857vw, 10rem)`.

**Floors** (all ten): nothing a person needs to read is under 14 px; nothing longer than six words
is under 15 px. The only text below 14 px is the desk's stage-track line ("Proof, step 2 of 5", 13 px,
5.3; added by the owner), which repeats the status chip above it and is read aloud in full, so it is
never the only place information lives.

### 5.3 The scale: the client pages and the apps

The firm's font where noted, on client pages only (3.7); on the desk, the proof and the dashboard,
CoFile's faces (Miller for titles and big numbers, Founders Grotesk for everything else). Base
18 px on client pages and the proof (a client on a phone, an owner reading every value), 17 px on
the filing desk and CoFile's dashboard (Hal, Priya).

| Token | Desktop | Phone | Face, weight | Used for |
|---|---|---|---|---|
| `firm-name` | 24 / 30 beside a logo, 30 / 36 alone | 20 / 26, 24 / 30 | Firm font 600 | The typeset name in the Letterhead (client pages) |
| `proof-title` | 34 / 40 | 28 / 34 | Miller Display 400 on the proof and the desk's filing page; the platform's font 600 on a platform's own proof (register 3) | The client's business name at the head of the proof and the filing page: "Two Sisters Bakery LLC" (Greta) |
| `page-title` | 32 / 38 | 28 / 34 | Firm font 600 on client pages; Miller Display 400 on the desk, the dashboard and the docs | Desk page titles ("Client filings"), client page h1 |
| `section` | 22 / 28 | 20 / 26 | Firm font 600 on client pages; Founders Grotesk Medium on the desk | Fieldset legends, card titles, "Filing details", "State fees" |
| `body-client` | 18 / 28 | 17 / 27 | Founders Grotesk Text 400 | Client pages and the proof |
| `body-desk` | 17 / 26 | 17 / 26 | Founders Grotesk Text 400 | The desk, the dashboard |
| `table` | 16 / 22 | 16 / 22 | Founders Grotesk Text 400; header 14 / 18 Medium, Graphite, sentence case | Desk tables |
| `label` | 16 / 22 | 16 / 22 | Founders Grotesk Text 500 | Field labels |
| `input` | 18 / 24 | 18 / 24 | Founders Grotesk Text 400 | Text inside fields: 18 px avoids iOS zoom and suits older eyes |
| `help` | 15 / 22 | 15 / 22 | Founders Grotesk Text 400, Graphite | Help under fields |
| `chip` | 14 / 18 | 14 / 18 | Founders Grotesk Text 500 | Status chips and the desk's "Your client" chip: the smallest text in the product apart from the stage track |
| `stage` | 13 / 18 | 13 / 18 | Founders Grotesk Text 400, Graphite, tabular | The stage track's "Proof, step 2 of 5" under each status chip on the desk (4.3); it repeats the chip and is read aloud in full, so it may sit under the 14 px floor (5.2) |
| `proof-label` | 16 / 22 | 15 / 20 (above the value) | Founders Grotesk Text 500, Graphite | The left column of "Filing details" |
| `proof-value` | 16 / 24 | 17 / 24 | Founders Grotesk Mono 400, Plate Ink | Values as the state will receive them |
| `fee` | 18 / 26 | 18 / 26 | Founders Grotesk Text 400, tabular | Fee rows, right-aligned on the decimal |
| `total` | 22 / 28 | 22 / 28 | Founders Grotesk Medium, tabular | "Total to the state $103.50" |
| `button` | 18 / 24 | 18 / 24 | Firm font 600 on client pages (presets); Founders Grotesk Medium elsewhere | All primary and secondary buttons |
| `stat` | 40 / 44 | 32 / 36 | Miller Display 400, lining tabular | Big numbers on CoFile's platform dashboard |
| `docs-prose` | 17 / 28, measure 68 ch | 17 / 27 | Miller Text 400 | API docs reading text |

### 5.4 Setting rules

- **Sentence case everywhere**, exactly as the copy writes it: no all-caps kickers, labels or table
  heads; capitals are slow for older eyes and run long in Spanish (Greta, Jun, Marcus, Priya,
  Rosa, Dev, Tomás). The only capitals are data the state receives in capitals: "TWO SISTERS
  BAKERY LLC", set with the `case` feature on.
- **Flush left, ragged right.** Centred setting only on the ceremonial pieces (the proof's head,
  the decision page, emails, the price card's headline) (Hal).
- **One sentence per line** for the two-sentence headlines on desktop and tablet, where the column
  allows: "Your client needs an LLC. / Say yes, under your own name." "Your client sends a text. /
  Nobody retypes it." "Run one rehearsal. / Then decide." Each sentence is a block-level span; the
  words don't change. On phones, `text-wrap: balance` and never a widow (Elaine, Marcus, Priya).
  One-sentence headlines use `text-wrap: balance`; ledes and paragraphs `text-wrap: pretty`.
- **The Firms headline sets its own joke:** "Your name on the door." at `display-l`, then "Ours in
  small type." on its own line at `small-type`, 16 px below, one h2 read as one by screen readers
  (Greta, Elaine, Hal). "Ours" is now the authorization's fine print (3.4); the headline is
  unchanged.
- **Hierarchy comes from size and space, not weight.** Miller is set in its Roman at every display
  size; no bold headlines (Hal). Founders: Regular for reading, Medium for anything you act on or
  scan for, Medium tabular for totals. Nothing lighter than 400, ever.
- **Measure:** ledes max 34 em; body 60 to 68 characters; captions up to 72; long reading 68 ch.
- **Figures:** lining tabular in every table, fee, date, chip, price and count, so $100.00, $3.50
  and $103.50 align on the point and the plan prices line up across their cards; old-style
  proportional only inside Miller running text. Dollar amounts on the proof always show cents.
- **Money at display size:** the "$" of `price-xl` and `price-l` is set at 60% of the figure size,
  raised to cap height, and hung into the left margin on desktop, so "$45" reads first as a number
  (Elaine, Greta).
- **Totals:** a single 1 px rule above the total row and a double rule (1 px, 2 px gap, 1 px) under
  the amount, the way an accountant underlines a total (Jun, Elaine).
- **Dot leaders** on fee rows, the price card and "What counts as a filing.": Founders Grotesk Text
  periods every 0.4 em in Rule Strong, on a shared baseline (Hal).
- **Lists:** no ticks. A 7 px lozenge (a square turned 45°) hung in the margin, in Brass Line on
  CoFile's pages (the desk included) and `--firm` on the pages a firm's clients see (Hal). Support pages may use a plain 6 px Graphite
  en rule instead (Tomás).
- **Links:** always underlined (4.8).
- **Punctuation:** typographer's apostrophes and quotes (’ “ ”), real en dashes in ranges; the
  copy's `&apos;` renders as U+2019 (a glyph change, not a word change; confirm with the copy owner)
  (Greta). Opening quotes and list lozenges hang into the margin.
- **The ampersand** in a firm's typeset name follows 3.5. In CoFile's own Miller headlines the
  ampersand is the Roman, as the copy writes it.
- **Spanish:** `lang` per element; `hyphens: auto` on Spanish body only, never headlines; ¿ and ¡
  hang into the margin at display sizes; kickers and buttons may wrap to two lines and never shrink
  below their floor (Rosa, Hal).
- **No effects on type:** no letterpress text-shadow, no gradient fills, no outlines, no animated
  headlines (Elaine, Greta).

### 5.5 Numerals and mono, precisely

- **Prices on CoFile's pages:** Miller Display lining figures (`lnum`; tabular `tnum` where figures
  stack, as on the price card and plan cards).
- **Fees and totals everywhere, including the price figures inside product pictures:** Founders
  Grotesk Text tabular lining (`tnum lnum`). Fees are facts to check, so they are set in the
  working face on every surface, the proof included; Miller sets only CoFile's own prices for sale,
  and never appears on a client's page.
- **Mono is for machines and for the state.** Founders Grotesk Mono sets: values on the proof and
  in drafts exactly as they will be typed into the state's form ("TWO SISTERS BAKERY LLC", "Ana
  Ortiz, Lucia Ortiz (50/50)", "88 Grove St, Jersey City NJ 07302", "EIN 00-0000000"), the rehearsal
  programme's results, references, page URLs (`cofile.app/bestaccounting/llc-filing-new-york`), API
  keys, webhook payloads, `"dryRun": true` and docs code. Never sentences, labels, a client's name
  in a desk row, prose, chips or prices. A bakery's name in a list is a name; on the proof, it is a
  value (Greta and Hal's caution, Jun and Elaine's rule).
- **Mono may sit inside a Founders sentence** (a fee, a path). Miller never shares a line with
  either, with one exception: in the API docs' Miller Text prose, inline code is set as a Cotton 2
  chip, an object in the line rather than mixed type (10C.16).

---
## 6. Layout

### 6.1 One layout idea

**The page is a stationer's table; the things that carry a firm's name lie on it as sheets** (Jun,
Hal). What CoFile says to the firm (headlines, ledes, the short lists) is printed directly on the
Cotton page. Everything that carries a firm's name (the desk, the client's page, the draft, the
proof, the record, the run sheet, the price card) is a white sheet with weight and a shadow. With
about 330 words on the home page, the sheets are the page: each band is a short column of words
beside one large sheet, and the sheet is always the bigger of the two (Hal, Dev, Elaine).

### 6.2 Grid and breakpoints

| Breakpoint | Width | Columns | Outer margin | Gutter | Content max |
|---|---|---|---|---|---|
| Phone | ≤ 599 px (designed at 390) | 4 | 20 px (16 px at ≤ 360) | 16 px | 100% |
| Tablet | 600–1023 px (designed at 834) | 8 | 40 px | 24 px | 100% |
| Laptop | 1024–1279 px | 12 | 48 px | 24 px | 100% |
| Desktop | 1280–1599 px (designed at 1440) | 12 (78 px columns) | auto, at least 64 px | 24 px | **1200 px** (12 × 78 + 11 × 24) |
| Wide | ≥ 1600 px | 12 | auto | 24 px | 1200 px: paper doesn't stretch; margins grow (Hal) |

```
Desktop 1440: margin 120 | 12 columns of 78 px, 24 px gutters (1200) | margin 120
|120|c1 |c2 |c3 |c4 |c5 |c6 |c7 |c8 |c9 |c10|c11|c12|120|
    |-- words: c1–c4 --| c5 |-------- picture: c6–c12 -------->| bleed ≤ 120 px
```

- **Bleeds.** Product sheets in a picture may run off the grid into the right (or left) margin by up
  to 120 px, clipped by the viewport below 1280 px; a sheet cropped by the edge reads as bigger
  than the screen (Dev, Hal). Photographs may bleed to one or both viewport edges. Text never
  bleeds; nothing scrolls the page sideways.
- **Reading measures:** ledes and body max 34 em (about 64 characters); long reading (Terms,
  Privacy, docs) 68 ch; forms max 640 px; sheets (the proof, client pages) max 760 px, the width of
  a letter-size sheet with comfortable margins at 96 dpi (Hal).
- **Vertical alignment:** the headline's cap height lines up with the top edge of the picture's
  main object (the desk sheet, the doors, the proof), not with the picture's frame (Tomás). A short
  text column is vertically centred on its picture, never top-aligned with a void beneath it (Rosa,
  Marcus).

### 6.3 Spacing

An 8 px base with one half step: **4, 8, 12, 16, 24, 32, 48, 64, 96, 128, 160.** Nothing off
scale.

**Sections breathe like a letterhead: less above, more below** (Hal). A good sheet has a smaller
head margin than foot margin, and so does a good section.

| Rhythm | Desktop | Tablet | Phone |
|---|---|---|---|
| Showpiece bands (every home section, the heads of the pages behind it): above / below | 128 / 160 | 96 / 128 | 64 / 80 |
| The hero: above (under the header) / below | 64 / 160 | 48 / 128 | 32 / 80 |
| Support bands ("Checks before every filing.", Security, Questions, "What's separate.", Terms, Privacy): above / below | 96 / 112 | 72 / 88 | 56 / 64 |
| Kicker to headline | 16 | 16 | 12 |
| Headline to lede | 24 | 24 | 16 |
| Lede to content (list, link or picture) | 48 | 40 | 32 |
| Between short list items | 16 | 16 | 14 |
| List to its text link ("For firms", "How it works") | 24 | 24 | 24 |
| Words to picture, stacked (phone) | — | 48 | 40 |
| Picture to its caption | 12 | 12 | 12 |
| Sheet inner margins (a product sheet in a picture) | 40 | 32 | 20 |
| Card padding (CoFile's own cards) | 32 | 32 | 20 |
| Field to field / between field groups | 24 / 48 | 24 / 48 | 20 / 40 |
| The filing desk and dashboard: between blocks | 32 / 48 | 32 / 48 | 24 / 32 |

### 6.4 Corners and depth

**Corners.** Paper is square-cut; plates are chamfered (Hal).

| Token | Value | Used for |
|---|---|---|
| `--r-0` | 0 | Photographs, rules, the Firm Rule |
| `--r-sheet` | 2 px (just enough to anti-alias) | Sheets, cards, document cards, fields, panels, notices, the price card, the drawn phone's screen |
| `--chamfer` | `border-radius: 6px; corner-shape: bevel;` falling back to a 3 px round radius where `corner-shape` isn't supported | **Only** buttons, chips, the logo plates, the monogram tile and the Name Plate glyphs: things that are struck, not cut |
| `--chamfer-s` | 4 px bevel (fallback 2 px round) | Chips under 28 px tall |
| `--r-device` | 44 px | The drawn phone slab only (10 px Plate Ink bezel, no notch, no buttons, no brand), used only where the copy is about a phone or a text (Hal, Tomás) |

**Depth.** Shadows are the shadows a sheet makes on a desk under a window: close and soft, mixed
from Plate Ink, never black, never colored (Hal, Jun's cool-shadow note).

| Token | Value | Used for |
|---|---|---|
| `--e0` | none | Most things. Cards *inside* sheets get a 1 px Rule border and no shadow: paper on paper throws no shadow you can see |
| `--e-sheet` | `0 1px 1px rgba(29,33,48,.05), 0 10px 28px -10px rgba(29,33,48,.20)` | Every sheet lying on the page: product pictures, the proof page's sheet, client pages on desktop |
| `--e-lift` | `0 2px 2px rgba(29,33,48,.06), 0 22px 44px -14px rgba(29,33,48,.24)` plus `translateY(-2px)` | A sheet that is picked up: hover on a clickable card, the hero desk as it settles |
| `--e-card` | `--e-sheet` plus a 2 px Rule Strong edge line along the bottom and right | Heavy card stock: the price card only (Hal) |
| `--e-menu` | `0 8px 24px rgba(29,33,48,.12), 0 0 0 1px rgba(29,33,48,.06)` | Menus, popovers, the phone menu sheet |
| `--e-sheet-dark` | `0 1px 0 rgba(0,0,0,.40), 0 16px 40px -12px rgba(0,0,0,.55)` | White sheets on Night |

No glass, no backdrop blur, no glow, no colored or long "floating" shadows anywhere.

### 6.5 The home page bands

One idea per band: a headline, its line or two, and one picture. The standard band is **four
columns of words, one empty column, seven columns of picture** (Hal, Tomás, Marcus, Elaine), and
the picture side alternates down the page, so the eye zigzags the way it does through a sample
book. Three bands break the pattern on purpose: Coverage and Pricing run full width, and the Close
is a full-bleed photograph. No band is taller than about 1.3 screens on desktop (Tomás).

| # | Band | Ground | Arrangement (desktop) | Phone |
|---|---|---|---|---|
| — | Beta notice | Cotton 2, 1 px Rule under it | Centred on the grid, one or two lines, 15 / 23 Graphite, the "Beta" chip in the rehearsal style (4.4); not dismissible on the home page | Wraps to four lines |
| — | Header | Cotton, sticky | Lockup left; five links; "Log in"; the header CTA (6.7) | 64 px; lockup, "Log in", menu |
| 1 | Hero | Cotton | The h1 across the full content width, one sentence per line (Elaine, Marcus); 48 px below it, words in c1–c4 (sub, buttons, the note; its 48 px team portraits wait for C10, deferred) and **CoFile's desk sheet**, signed in as Harbor & Pine, in c6–c12, bleeding right, with **a Harbor & Pine client page** lying in front of it over its lower right (decision 5) | Words and both buttons first; the desk and the client page next |
| 2 | Firms | Cotton | Picture c1–c7, bleeding left (two doors, one page); words c9–c12 | Words, then the doors as a two-card swipe |
| 3 | Requests | Cotton | Words c1–c4; picture c6–c12 (Ana's photograph, her text, the draft sheet) | Words, then picture |
| 4 | The proof | **Cotton 2**: the proof needs the quietest ground on the page (Hal) | Picture c1–c7 (the proof sheet, the payment slip under it); words c9–c12 | Words, then the proof full width |
| 5 | After | Cotton | Words c1–c4; picture c6–c12 (the desk still-life photograph, the envelope, the record) | Words, then picture |
| 6 | Coverage | Cotton | Headline and lede c1–c8; the four sample cards across all 12 columns; the legend under them | Cards stack in one column |
| 7 | Rehearsals | **Night** (`--stage`): the one dark band on the home page, the house lights down | Words c1–c4 on the stage; the ghost-light photograph and the run sheet c6–c12 | Words, then the run sheet under the photograph |
| 8 | Pricing | Cotton | Centred: "$45" headline, the price card (c3–c10, 760 px), the two small lines under it | Left-aligned; the card full width |
| 9 | Close | Full-bleed photograph (the blank plate) | A Cotton panel c1–c5 carries the words, the name field and the button, so type never sits on the photograph (Hal) | Photograph first at 4:5, words below on Cotton |
| — | Footer | Cotton 2, opened by the thick-and-thin rule in Plate Ink (3 px, 2 px gap, 1 px): the foot of the letterhead (Hal) | Lockup and "CoFile · the filing desk behind your firm" (the Shell's existing line), places line, legal line, links | Stacks, 24 px between groups |

Rhythm, top to bottom: paper, paper, paper, quiet paper, paper, paper, **night**, paper, photograph.
The quiet ground sits under the proof; the dark sits exactly where the copy talks about a
performance; the page ends on the door.

**Section anatomy, desktop (A: words beside a picture).**

```
 c1          c4   c5   c6                                          c12   bleed
┌───────────────┬────┬──────────────────────────────────────────────┬──────┐
│ Kicker (if any)│    │ ┌──────────────────────────────────────────┐ │      │
│ H2 at          │    │ │ the sheet's own head: CoFile's on the    │ │      │
│ display-l      │    │ │ desk and the proof; the firm's Letterhead│ │      │
│                │    │ │ and Firm Rule on a client's page         │ │      │
│ Lede in Miller │    │ │                                          │─┼──┐   │
│ Text           │    │ │        the product sheet, live HTML,     │ │  │   │
│                │    │ │        example data, true scale          │ │  │   │
│ ◆ list item    │    │ │                                          │ │  │   │
│ ◆ list item    │    │ │                                          │ │  │   │
│ ◆ list item    │    │ │                                          │ │  │   │
│                │    │ └──────────────────────────────────────────┘ │  │   │
│ For firms →    │    │ Example · test details · not a real firm     │  │   │
└───────────────┴────┴──────────────────────────────────────────────┴──┴───┘
  words vertically centred on the picture's main object
```

**B: headline over a full-width picture** (Coverage), and **C: centred** (Pricing):

```
 B ┌───────────────────────────────────────┐      C ┌─────────────────────────────────┐
   │ H2 (c1–c8)                            │        │      $45  a filing. EIN          │
   │ Lede · link                           │        │           included with a       │
   ├─────────┬─────────┬─────────┬─────────┤        │           formation.            │
   │ card    │ card    │ card    │ card    │        │   ┌─────────────────────────┐   │
   │ (3 col) │ (3 col) │ (3 col) │ (3 col) │        │   │ price card, c3–c10      │   │
   └─────────┴─────────┴─────────┴─────────┘        │   └─────────────────────────┘▌  │
   legend in words                                  │   small lines, centred          │
                                                    └─────────────────────────────────┘
```

**Phone anatomy (390).**

```
┌──────────────────────────────┐
│ Kicker                       │
│ H2 at 34 / 38                │
│ Lede, 19 / 30                │
│ ◆ list items, 18 / 26        │
│ For firms →                  │
│                              │  40 px
│ ┌──────────────────────────┐ │  the picture keeps 20 px side margins
│ │ product sheet, its real  │ │  and its shadow: it is a picture,
│ │ phone layout, never a    │ │  not the page
│ │ shrunk desktop one       │ │
│ └──────────────────────────┘ │
│ Example · test details · …   │
└──────────────────────────────┘
```

### 6.6 How pages breathe

- **Desktop:** generous but never empty. A band holds one picture and one primary action at most.
  Air goes around the sheets; nobody crowds a letterhead (Hal). The only sticky elements are the
  header and, on Terms and Privacy at 1280 px and wider, the contents rail (decision 25, 10A.15).
- **Phone:** one column, in the copy's order: **words first, then the picture**; no band opens with
  a picture and no two pictures touch without words between them (Rosa, Hal, Marcus). In the hero
  the h1, sub and both buttons come before the desk, so a phone visitor sees the promise and the
  action in the first screen. Every picture has a phone composition of its own (the product's real
  phone layout, a photograph recropped to 4:5 by the photographer on the day), never a shrunk
  desktop one (Elaine, Tomás). Full-bleed grounds keep their color on phones.
- **No scroll tricks.** No pinned sections, no scroll-jacking, no parallax, no snap on the page (a
  picture may snap inside itself, as the two doors do on phones). A reader of sixty scrolls at
  their own pace (Greta, Hal).
- **Tap targets** 48 × 48 px minimum with 8 px between neighbours; primary buttons 56 px tall and
  full width on phones (Jun, Amara).

### 6.7 Persistent elements

- **Header.** Desktop 76 px, compacting to 60 px after 120 px of scroll (200 ms); Cotton, with a
  1 px Rule bottom edge that appears only once the page has scrolled. Lockup 28 px tall; links
  ("How it works", "For firms", "What we file", "Pricing", "For platforms") in `nav`, 32 px apart,
  the current page with a 2 px Brass Line underline 6 px below the baseline; "Log in" as a plain
  text link; "Run a free rehearsal" as a 44 px button (outline while the hero's button is in view,
  Brass after: 4.8). From 640 to 1100 px the five links move into the menu and the CTA stays.
  Phone: 64 px, lockup at 24 px, "Log in", and a menu button with three lines and the word
  `[copy needed: "Menu"]` for people who don't read hamburger icons (Rosa). The menu opens a
  full-height Cotton sheet: the five links in Miller Text 24 / 32 with 64 px rows and hairlines,
  "Log in", "Run a free rehearsal" full width, and the support email.
- **The sticky phone bar.** Once the hero's "Run a free rehearsal" has scrolled out of view, a
  64 px bar (plus `env(safe-area-inset-bottom)`) slides up: Cotton, 1 px Rule top line, the button
  full width inside it. It slides away while the Close's own button is on screen, in For
  platforms' inquiry form, and whenever a field has focus, so two copies of the button are never
  visible at once (Jun, Tomás, Marcus, Hal).
- **No popups**, no chat bubble, no cookie wall over content. If a consent notice is legally
  needed, it is a bottom sheet the height of the sticky bar and replaces it until dismissed
  (Marcus).

### 6.8 The client pages and the apps

| Surface | Layout |
|---|---|
| **The proof**, the decision page | One centred sheet, 760 px wide on desktop, on Cotton, `--e-sheet`, 48 px padding, in CoFile's look: no Letterhead and no Firm Rule; at its head, centred, the firm and its client named as text ("Harbor & Pine CPA · Two Sisters Bakery LLC"; 10B.22 sets the head). Its one Brass button, "Approve, and authorize submission and payment", sits at the end, never sticky, full width on phones. On phones the sheet *is* the screen: edge to edge, no shadow, 20 px padding (Hal). A platform's own proof keeps the platform's brand (register 3) |
| **Client pages** (the intake form behind a client link, client link pages, the firm's page for each filing) | One sheet, 760 px on desktop (form column 640 px inside it), the firm's Letterhead left-aligned; one field per row, labels above fields; edge to edge on phones. Nothing of CoFile's but the authorization's words (3.4) |
| **The filing desk** | The platform dashboard's shell (10C.2), in CoFile's look: CoFile's header row (76 / 64 px) with the lockup, then the firm's account label (its logo 24 px tall and its name, 3.5), the signed-in person's email at the right; a 1 px Plate Ink rule; a 52 px navigation row, the current page underlined in Brass Line; content on the 12-column grid to 1200 px, 17 px base. "Narrow" pages (a filing, a form, setup steps) use a centred 720 px column with an optional 320 px rail at ≥ 1280 px. Previews of the firm's client pages (the empty desk's miniature, Branding) lie on it as white sheets in the firm's brand |
| **CoFile's platform dashboard** | The same shell, with no firm's account label, so the desk and the dashboard read as one product |
| **Auth pages** (sign-up, log in, password, verification) | One 480 px card on Cotton; sign-up 560 px plus a side panel holding the blank plate that engraves the typed "Firm name" (Direction D3) |
| **Emails** | 600 px, single column, 32 px padding. **To the firm** (the proof is ready, documents back, Ready to pay, missing information when the firm must act, account emails) and to a subscriber's staff: CoFile's letterhead, sent as "CoFile". **To the firm's clients** (a client link, a request for details): the firm's Letterhead centred and nothing of CoFile's, sent under the firm's name with Reply-To the firm, from the firm's own email domain once it connects one in Setup (a new Setup step, its words `[copy needed]`), otherwise from a CoFile sending address (decisions 2 and 37; 10D) |
| **Docs** | A 240 px navigation, a 720 px article, and a 400 px code rail at ≥ 1280 px |
| **Embed widget** | Fluid to its container, 20 px padding; nothing of CoFile's in it, at its foot or anywhere (3.4) |

**A client page, desktop and phone.**

```
DESKTOP: page on --firm-wash                      PHONE (390): the sheet is the screen
┌────────────────────────────────────────────┐    ┌──────────────────────────────┐
│   ┌────────── sheet, 760 px ────────────┐  │    │ [logo] Harbor & Pine CPA     │
│   │ [logo]  Harbor & Pine CPA           │  │    │ ════════════════════════════ │
│   │ ════════════════════════════════════│  │    │ ──────────────────────────── │
│   │ ────────────────────────────────────│  │    │ Start your New Jersey LLC    │
│   │                                     │  │    │                              │
│   │ Start your New Jersey LLC  (firm font)│ │    │ Business name                │
│   │                                     │  │    │ [__________________________] │
│   │ Business name                       │  │    │ Who owns it                  │
│   │ [_______________________________]   │  │    │ [__________________________] │
│   │ Who owns it                         │  │    │                              │
│   │ [_______________________________]   │  │    │ [        Continue          ] │
│   │                                     │  │    │                              │
│   │ [ Continue ]   (--firm-fill)        │  │    └──────────────────────────────┘
│   │                                     │  │
│   └─────────────────────────────────────┘  │
└────────────────────────────────────────────┘
```

**The filing desk, desktop.**

```
┌─────────────────────────────────────────────────────────────────────────────────────┐
│ [▱Co▱] CoFile◆ │ [logo] Harbor & Pine CPA                              ‹email› ▾    │ 76 px, Cotton
├─────────────────────────────────────────────────────────────────────────────────────┤
│ Filings   New filing   Ready to pay   Client links   …                              │ 52 px, under a 1 px Plate Ink rule
├─────────────────────────────────────────────────────────────────────────────────────┤
│ Client filings (Miller Display, page-title)                          [ New filing ] │ Brass
│ ─────────────────────────────────────────────────────────────────────────────────── │
│ Filing                    Sent by                   Status                          │ table head
│ ─────────────────────────────────────────────────────────────────────────────────── │
│ Two Sisters Bakery LLC    Ana Ortiz (Your client)   ◆ Proof ready to approve  ›     │ Ochre ◆ (4.3)
│ New Jersey LLC formation                        ●●○○○ Proof, step 2 of 5            │ stage track
│ ─────────────────────────────────────────────────────────────────────────────────── │
│ Hudson Ledger LLC         Your team                 ● Filed                         │
│ New York LLC formation                          ●●●●● Done, step 5 of 5             │
│ …                                                                                   │
└─────────────────────────────────────────────────────────────────────────────────────┘
```

(‹email› stands for the signed-in person's address. The stage track's dots: reached ones Plate Ink,
the rest Rule (4.3). The ledger's full columns are in 10B.4.)

---
## Direction for the other parts

Parts 2 to 8 (sections 7 to 14) are built on this foundation. This section is binding: where a
source spec disagrees with it, this section wins. Where it is silent, lean on the designers
named in D6 and keep to the spine: every new thing is one of the shop's objects (2.3).

### D1. What the pictures are

**Four kinds, in this order of importance:**

1. **The product, live** (the core). The desk, the client page, the draft, the proof, the record,
   the sample cards, the run sheet, the price card: built from the real components in live HTML
   with the example data (D4), at true scale (1:1, or a little under; never above 100%, so text
   never looks inflated), square-cut white sheets with `--e-sheet` on Cotton. Never screenshots,
   never blurred or "abstracted" rows, never tilted or in perspective, no browser chrome and no
   laptop renders; a drawn phone slab (6.4) only where the copy is about a phone or a text
   (Elaine, Marcus, Greta, Hal). Where the copy gives no value for a field, the field is empty or
   shows a neutral Rule bar, never invented text (Marcus). Every one keeps its example label as a
   14 px Graphite caption under its lower-left corner, always visible (all ten). Each page is
   drawn in its own register (2.4): the desk, the draft, the proof and the record in CoFile's look,
   the firm named as content; the client page, the firm's page for a filing and an email to a
   client in the firm's brand.
2. **Craft photography**: the shop's real objects. Two real doors with real hand-engraved plates
   (Harbor & Pine's brass, Northgate's steel), the same door with its plate **blank**, the engraver
   at the bench, a printer's proof on a table, a desk where the papers come home (Hal, with
   Elaine's and Rosa's door sets as reference).
3. **Documentary photography of people**: CoFile's real filing professionals (required; real
   people who agree, or the slot is left empty: never models, never stock); Ana at the bakery
   counter; a firm owner reading the proof at her own desk. Natural light, real places, people
   mid-task, hands that matter (Elaine, Rosa, Hal, Jun, Priya).
4. **Engraved vignettes**, one ink, in the steel-engraving manner but of contemporary things (a
   phone on a bakery counter, a returned envelope, a clear desk, the blank plate): **only** for
   system pages (404, errors, signed out), empty states, sign-up and log-in side panels and two
   kinds of email (the returned envelope on documents back, the blank plate on the welcome emails),
   both now emails to the firm in CoFile's look (decision 35). Never on the home page. Plate Ink on
   light, Night Ink on dark; on a page a firm's client sees, Graphite (Hal 7.3).

**The ratio.** On the home page, the product is the main object in eight of the nine bands (all but
the Close); photography is the setting it sits on in four (Firms: the doors; Requests: the bakery;
After: the desk; Rehearsals: the stage) and the whole picture in one (the Close: the blank plate).
(The team portraits beside the hero's note wait for C10, which is deferred: owner, Nov 26.) By area, about **65% product, 30% photography, 5%
typographic** (the "$45"), and **0% illustration, 0% 3D**. Site-wide, about 60% product, 30%
photography, 10% engraved vignettes.

**Not used anywhere:** 3D scenes or renders, WebGL light, real-time daylight, kinetic type,
illustrated people, screen-print collage, cut-out portraits, black-and-white photography, glows,
stock of any kind, AI-generated people or images (decisions file: "What the pictures are"). The one
piece of real-time rendering on the site is the engraving of a typed name into the photographed
blank plate (D3), with an SVG fallback and a static frame.

**The hero has no photograph.** The first screen is CoFile's filing desk in CoFile's look, signed
in as Harbor & Pine CPA (its small logo and name in the account label, its client filings as the
rows), with a Harbor & Pine client page in front of it, overlapping its lower right, in the firm's
Letterhead and colors, on plain cotton paper (decision 5). It holds no photographs at all for now:
the team's 48 px portraits beside the note wait for C10, which is deferred (owner, Nov 26; decisions
14 and 18 on hold), so the note stands alone.
The first photograph on the page is the two doors in Firms (decisions file).

**The core commissions.** The art-direction writer expands each into a full brief and shot list;
the content and use of each is fixed here.

| # | Picture | Used in | Notes |
|---|---|---|---|
| C1 | **Harbor & Pine's door**: a painted wooden office door in a deep harbor-blue black, in a brick office building on a quiet street (no house numbers, no signs); beside it a real brass plate, **hand-engraved "Harbor & Pine CPA"** with the italic ampersand, letters filled black; late raking sun from the left so the engraving reads in light and shadow. Wide, medium and macro frames | Home 2 (left door); For firms | Tripod lock-off, plate shot square-on for compositing; an HDRI from the plate's position for the engraving shader (Hal P1) |
| C2 | **Northgate Payroll's door**: a glazed aluminium-framed door in a converted mill or small modern office, mid-morning daylight; a brushed-steel plate of the same shape engraved "Northgate Payroll" in geometric capitals, black-filled. Same lens, height and framing as C1's medium frame | Home 2 (right door) | The two doors must feel like two real firms that have never met (Hal P2) |
| C3 | **The blank plate**: C1's lock-off and light, the brass plate **blank** (two screws, slots level, the bevel catching the light) | Home 9 (the Close), sign-up, the base for engraving any typed name | Same session, same light as C1 (Hal P3) |
| C4 | **The blank plate at dusk**: C3's frame thirty minutes after sunset, warm light from the transom, the plate catching the street light; a lights-off and a lights-on pass | The Close in dark mode; the social card | (Hal P4; Elaine and Amara's dusk door) |
| C5 | **The client asks**: early morning in a real neighbourhood bakery; Ana (cast, real sisters for Ana and Lucia Ortiz), apron on, flour on her wrist, thumbing a text; her sister soft behind | Home 3; How it works | Phone screen shot dark with tracking marks; the message composited in CoFile's own neutral bubble, never a messaging app's look; the phone unbranded (Hal P5, Elaine PH-03) |
| C6 | **The papers come home**: a top-down still life on a walnut desk (pen, reading glasses, a cup on a coaster at the edges, the centre clear) as a clean plate, plus a frame with a heavy white envelope addressed "Harbor & Pine CPA", papers edge-on or face-down | Home 5 (the clean plate under the live envelope and record); the documents email | No state or IRS paper ever legible (Hal P7) |
| C7 | **The stage**: a real small theatre or school auditorium from the back of the house, house lights off, a single ghost light (a bare bulb in a wire cage on a stand) on a bare stage, the seats empty. 21:9 and 4:5 | Home 7; What we file "How a filing type goes live." | (Rosa T1, Amara P6, Tomás) |
| C8 | **The firm approves**: a real CPA in her fifties or sixties at her own desk in her own office, reading glasses on, reading the proof on screen (composited), not pressing anything | How it works "You approve it."; For firms | (Hal P6, Elaine PH-07, Priya P3) |
| C9 | **The proof at the printer**: a make-ready table, a business-card proof and a letterhead proof on cotton stock initialled in pencil, a loupe | How it works, beside "You've approved a proof before" | At a real engraving or letterpress shop; fictional names only (Hal P8, Elaine PH-08) |
| C10 | **Deferred (owner, Nov 26): no photographs of CoFile's people for now.** When it returns: **People at the bench**: CoFile's real filing professionals at their desks, from the side, at work; plus a tight portrait of each | Hero note (48 px square portraits, faces only); How it works; Pricing; Questions "Is a person involved?" | Real staff only, with consent and names in alt text; or the slot is dropped (all ten) |
| C11 | **The engraver**: a hand engraver at the bench cutting "Harbor & Pine CPA" into the brass plate, then fitting it beside the door; filmed (12 s silent cut for the site) and photographed | For firms head | Adapted from Rosa's sign-painter film and Tomás's gilder film; the craftsperson paid and credited `[copy needed]` |
| C12 | **Paper scans**: cotton letter paper, heavy card stock for the price card, black card for dark mode, at 1200 dpi | Textures (4.8) | A reprographic studio (Hal P10) |

**Rules for every photograph** (Hal, Elaine, Rosa): one photographer for the whole set so the light
is consistent; natural light and practicals; a neutral, slightly warm grade with the Cotton white
point, true skin, true blacks, no teal-and-orange, no haze; casting that reflects New Jersey, New
York and Florida as they are, ages 30 to 70 (firm owners 40 to 70), every background; releases for
everyone in frame; screens composited with the real product, never invented UI; no legible real
business names; real people never captioned as customers or quoted (Rosa, Marcus). **Staged
photographs carry no example caption** (decision 15): the doors, Ana, the firm owner, the engraver
film, the printer's proof and the stage stand clean; only the product pictures carry their example
labels.

**Documents and state screens** (3.9): the papers are CoFile's own document cards (a small issuer
label, the document's name from the copy, the value in mono, grey bars); the state's website is a
neutral redraw with only the copy's labels and values. Never facsimiles.

### D2. Motion: budget and principles

**One signature moment, one interactive moment, and quiet settles. Otherwise still** (Hal, Elaine,
Greta, Rosa, Marcus). Print doesn't slide or bounce: it arrives in two beats, the **impression**
and then the **ink**, quickly and once (Hal).

**Principles (binding):**

1. **Words never wait.** Headlines, ledes, prices and buttons are on the page at first paint and
   never animate. Only pictures move (Hal, Greta, Priya).
2. **Once per visit.** A picture plays the first time it is 40% in view, then rests in its final
   frame; it never replays on scroll-back. Each moving picture has a small replay control in its
   label row (24 px, accessible name `[copy needed]`); the engraver film, which carries no caption
   (D1), keeps its control in its own lower corner (Hal, Marcus).
3. **Nothing scrolls the page for you.** No pinning, no scroll-scrubbed animation, no
   scroll-jacking, no parallax, no pointer tilt. The page scrolls at its normal speed everywhere.
4. **Nothing loops.** The 12-second engraver film on For firms plays once and holds its last frame.
5. **Money never moves.** Prices and fees appear complete and stay still: no counting, no rolling
   digits (Marcus, Hal, Elaine).
6. **Nothing celebrates a stop.** The rehearsal's "held, on purpose" arrives exactly like every
   other line; approval gets no stamp, confetti or tick burst (all ten).
7. **Short.** Each picture's choreography finishes in **2.4 s or less**; the Requests explainer may
   run 3.4 s and the Firms signature 4.2 s. The one slow move is the Close's 8 s push-in on the
   blank plate, a camera move with nothing else moving (Hal M8).
8. **Reduced motion** (`prefers-reduced-motion: reduce`) shows every picture in its final, fully
   composed state; the engraving of a typed name appears at once. Nothing is lost but the timing.
   No information lives only in motion.

**Tokens** (Hal):

| Token | Value | Use |
|---|---|---|
| `--ease-press` | `cubic-bezier(.3, 0, .2, 1)` | The impression beat, button presses |
| `--ease-settle` | `cubic-bezier(.2, .8, .2, 1)` | The ink beat; things settling into place |
| `--ease-sweep` | `cubic-bezier(.45, 0, .25, 1)` | A light crossing a plate; rules and leaders drawing |
| `--ease-exit` | `cubic-bezier(.4, 0, 1, 1)`, 160 ms | Things leaving (menus closing) |
| `--t-quick` | 120 ms | Hover color changes |
| `--t-press` | 180 ms | The impression beat |
| `--t-ink` | 260 ms | The ink beat |
| `--t-set` | 320 ms | A row or line setting into place |
| `--t-draw` | 600 ms | A rule or leader line drawing |
| `--t-light` | 1200 ms | The light raking across a plate; the ghost light coming up |
| `--stagger` | 70–120 ms | Between rows |

**The two-beat recipe, `press-in`** (Hal): the element starts at opacity 0 with only its edge (a
1 px inset Rule); over `--t-press` the edge comes up; then over `--t-ink` with `--ease-settle` the
content goes 0 → 1 and rises 2 px into place. Distances are short: nothing travels more than 40 px
except the documents rising out of the envelope.

**Budget:** CSS transitions and the Web Animations API, triggered by IntersectionObserver, in one
shared motion module of about 12 KB; no animation library, no Lottie, no video for UI; no moving
picture adds more than 40 KB of script. Only `transform`, `opacity` and SVG `stroke-dashoffset`
animate. The WebGL engraving loads only on devices reporting `deviceMemory ≥ 4`, not in Save-Data
mode, once its section is within one screen; everyone else gets the SVG filter version
(`feSpecularLighting` over the text's alpha), then a still (Hal). Each moment's final state is the
page's default markup, so a reader without JavaScript sees every picture complete (Greta).

**Interface motion:** buttons press like a key into paper (80 ms down 1 px with a 1 px inset shadow;
160 ms release, `--ease-settle`; hover fill to Brass Deep, or on a client's page the firm color 8%
deeper, in `--t-quick`; no ripples, glows or scale-ups). Focus rings appear instantly, never
animated. Links: the underline thickens 1 → 2 px in 120 ms. Chips change by crossfade (200 ms).
Accordions open with a 240 ms height ease. Page changes use cross-document View Transitions that
keep the header lockup and the firm's Letterhead perfectly still while the content crossfades
(200 ms) (Hal, Priya).

**In the product:** the proof has no entrance theatrics; pressing "Approve, and authorize submission
and payment" debosses the Brass button, and the decision page arrives with its heading pressing in
and a 1 px Plate Ink rule drawing under it, like the rule under a signature. On the filing desk, a
changed status's chip presses in, its stage track's newly reached dot inks in with it, and its row
carries a Brass Tint wash that fades over 2 s; arriving documents play the envelope flap once.
Loading rows are blank sheets at their final size pulsing 60% ↔ 100% over 1.6 s: no shimmer, no
spinner unless a wait passes 3 s (Hal). Client pages barely move: they are for reading and deciding
(Rosa, Amara).

### D3. The signature moments, and where each belongs

| Section | Moment | What it is (the section writers specify the beats) | Lean on |
|---|---|---|---|
| Home 1, Hero | **The desk, and the page your client sees** | On first paint CoFile's desk sheet and the Harbor & Pine client page in front of it are already in place, so nothing jumps. The desk's four rows set top to bottom, and the Two Sisters Bakery LLC row's "Proof ready to approve" chip presses in last, its track's second dot inking in with it; then, on the client page, the Firm Rule draws left to right and Harbor & Pine's logo and name ink in behind a left-to-right mask like a burin pass. Nothing of CoFile's is on the client page. About 2.2 s | Hal M1 (the burin pass, now on the client page); Marcus (the waiting row is the one clickable row, and scrolls to the proof section) |
| Home 2, Firms | **Two doors, one page: the signature moment** | The two door photographs at rest; between and below them one unbranded client page. It parts into two (Dev, Greta, Priya); as each half settles under its door, a light rakes across that door's engraved plate and the firm's name lifts off the plate into the page's letterhead, the Firm Rule draws, and the page inks in that firm's brand: logo, font, button, page tint. The fields sit on exactly the same pixels in both. **Last, a 1 px hairline draws between the two pages to show they are the same page (Priya); nothing of ours appears on either.** About 4.2 s, once. Then a brass wipe handle between the pages lets the visitor drag one page into the other firm's brand while nothing else moves a pixel (Hal 8.3). Phone: a two-card swipe that plays the left half, then slides itself once to the second firm | Hal 8.3 (M2 and the wipe); Dev M2 and Priya 9.2 (the split, and the hairline that joins the pages); Greta 9.3 (two brands at a glance) |
| Home 3, Requests | **Nobody retypes it** | Ana's bubble rises in; three phrases are underlined in Brass Line one after another ("an LLC for the bakery", "me and my sister, 50/50", "in Jersey City"); from each a fine leader draws to its row in the draft and the value sets with its "from the text" tag; then the two saved rows ink together, at once, with no lines: they were already there. The "For your team to check" chip presses in last. About 3.4 s | Hal M3; Elaine M4; Rosa moment 3 |
| Home 4, The proof | **One page, your button** | The sample proof is in CoFile's look, the firm and its client named in its head, with **no numbered callouts** (decision 16). It is laid down; the detail rows set; the fee leaders draw; "Total to the state $103.50" sets with its rules; the Brass "Approve for filing" button presses in last and **never pulses**; the "New Jersey payment screen" slip slides 12 px out from under the sheet's foot with "Matches the proof" simply there. About 2.0 s. Then the three points beside it ("The state's own review page, where possible", "Every fee checked again before paying", "Any later change comes back for approval") point at their part of the proof: on hover or keyboard focus, and on a tap on phones, that part takes a 2 px Plate Ink outline and a Brass Tint wash (260 ms in, at once with reduced motion). The points are focusable, each with a short spoken description `[copy needed]` (decision 19) | Hal M4; Elaine M5; Marcus (point-to-the-proof) |
| Home 5, After | **The order comes home** | Three stages ink along a hairline ("Approved", "Submitted", "Filed"); then the envelope (live SVG over photograph C6) opens on its hinge and the two document cards rise out of it and settle side by side on the record. About 2.4 s | Hal M5; Jun M6 (lift, arc, land; no bounce) |
| Home 6, Coverage | **Cards dealt** | The four sample cards are dealt left to right (each rises 16 px, 80 ms apart), and nothing else. Under 1 s | Hal M6; Elaine M7 ("facts shouldn't perform") |
| Home 7, Rehearsals | **House lights down; the run is cued** | The band is dark from its first frame (no scroll-linked color change). As it enters, the ghost light comes up (the photograph from 70% to 100% brightness over 1.2 s) and the run sheet's lines are cued one by one, 120 ms apart, as a soft pool of light moves down to each. "Pay Now · held, on purpose" arrives like every other line. About 2.4 s | Rosa moment 7; Tomás M9; Marcus M8 (the stage); Greta M6 (the programme) |
| Home 8, Pricing | **The price card, still** | Nothing moves. A price that animates looks negotiable | Greta, Hal, Elaine, Marcus |
| Home 9, Close | **Your name on the plate** (the interactive moment) | Photograph C3 (C4 in dark mode): the blank plate. In the Close's Cotton panel, above "Run a free rehearsal", one optional field `[copy needed: its label]`. As the visitor types, each letter is cut into the brass (the WebGL engraving lit from the HDRI, about 90 ms a letter, with a glint at the bottom of the cut; deleting fills it back). If they don't type, the plate stays blank: an empty plate in good light, and a slow 8 s push-in from 1.00 to 1.03, once (Hal M8). The name lives only in the visitor's browser (`sessionStorage`) and is never sent until they submit sign-up | Hal M8 and M9; Marcus M3 (typing onto a plate); Elaine M2 and M10 (the carry-over) |
| Sign-up | **It's already yours** | The typed name arrives pre-filled in "Firm name", engraved on the same plate in the side panel; typing there keeps cutting it | Hal M9; Elaine; Tomás M12; Greta M8 |
| For firms | **The engraver; your brand everywhere at once** | The head opens on the engraver film C11 (one 12 s silent play with a visible pause control). Further down, typing a name and choosing a main color re-brands three live previews of what the firm's clients see, at once (the client page, the firm's page for a filing, an email to a client); the desk and the proof stay in CoFile's look and are not previewed (2.4) | Rosa 7.4 (film structure); Marcus M12; Dev's color dial; Priya's live dressing |
| How it works | **A letterhead proof becomes the proof** | A Harbor & Pine letterhead proof with crop marks lies on the table; the crop marks fade, the letterhead gives way to the filing proof's head in CoFile's look ("Harbor & Pine CPA · Two Sisters Bakery LLC", as text), and the body reflows into the filing proof's rows: the copy's own comparison, made visible | Marcus M10; with C9 beside the lede |

### D4. The example data (use exactly this, everywhere)

All sample data comes from the copy and `Visuals.tsx`, and the desk's ledger words ("Sent by",
"Your client", "Your team", the five steps) from the product (`web/lib/sender.ts`,
`web/lib/status.ts`). Every picture that shows it keeps its label.

| Picture | Data |
|---|---|
| Firms | **Harbor & Pine CPA** (Harbor `#1D4E63`, Pine `#2B5A47`, Lora, square symbol + typeset name); **Northgate Payroll** (Ember `#C2410C`, no second color, Montserrat, wide wordmark); **Best Accounting** (Best Blue `#1F4FD1`, Inter) only for `cofile.app/bestaccounting/llc-filing-new-york` and the widget (3.8) |
| The desk (the hero, and wherever the desk is pictured) | CoFile's desk in CoFile's look, the account **Harbor & Pine CPA** (its logo 24 px tall and its name in the account label); "Client filings", "New filing"; the ledger's "Sent by" column and a stage track under each status (4.3); rows: Two Sisters Bakery LLC · New Jersey LLC formation · sent by **Ana Ortiz** with the "Your client" chip · "Proof ready to approve" (your turn) · "Proof, step 2 of 5"; Hudson Ledger LLC · New York LLC formation · "Your team" · "Filed" · "Done, step 5 of 5"; Hudson Ledger LLC · EIN · "Your team" · "Filed, IRS letter saved" · "Done, step 5 of 5"; Orchard Lane Inc. · Payroll registration (NJ-REG) · "Your team" · "Submitted" · "With the state, step 4 of 5". No email under Ana's name and no staff emails: the copy gives none, and the product shows "Your team" when the sender isn't known. Dates the copy doesn't give are Rule bars (D1) |
| The client page | Harbor & Pine's Letterhead and colors (the hero's page in front of the desk; Firms in both firms' brands; the empty desk's miniature and the Branding previews in the firm's own); "Start your New Jersey LLC"; fields "Business name", "Who owns it"; button "Continue" |
| The text | "Need an LLC for the bakery. It's me and my sister, 50/50, in Jersey City." · "Ana Ortiz · text message · example" |
| The draft | "Draft: New Jersey LLC formation" · "For your team to check"; Business name TWO SISTERS BAKERY LLC, Members Ana Ortiz, Lucia Ortiz (50/50), City Jersey City, NJ ("from the text"); Registered agent "Your saved agent", Organizer and signer "Your saved answers" ("already filled") |
| The proof | In CoFile's look, no letterhead: its head names "Harbor & Pine CPA · Two Sisters Bakery LLC" as text, with "example firm"; Two Sisters Bakery LLC · "Ready to approve"; Business name TWO SISTERS BAKERY LLC; Members Ana Ortiz, Lucia Ortiz (50/50); Main business address 88 Grove St, Jersey City NJ 07302; Formation filing fee $100.00; NJ portal fee, by card $3.50; Total to the state $103.50; "New Jersey's own review page, filled in": Business Name TWO SISTERS BAKERY, Designator LLC; "Approve for filing" (Brass); "New Jersey payment screen" $103.50 "Matches the proof"; beside it, the copy's three points, no numbered callouts |
| The record | Stages "Approved", "Submitted", "Filed"; New Jersey · Certificate of Formation · TWO SISTERS BAKERY LLC; IRS · EIN letter (CP 575) · EIN 00-0000000 |
| The rehearsal | "Rehearsal · New Jersey LLC formation" · "test details"; Business name filled; Name check passed; Registered agent filled; Members and signatures filled; Review page matched the proof; Payment: $103.50 matches the proof; Pay Now held, on purpose |
| Coverage | From `web/lib/coverage.ts` (Planned types left out on the home page), with the copy's legend: "Live", "Rehearsed to the payment screen", "Screens recorded or offered, rehearsal next" |
| Prices | From `web/lib/pricing.ts` only: $45 a filing; $25 an EIN on its own; $15 copies and certificates; plans Starter $250 a month (6 filings), Growth $500 (15), Unlimited $1,000 (60); state fees separate; rehearsals free. If the figures change, the design doesn't |
| Labels | "Example · test details · not a real firm"; "Two example firms · same page, each in its own brand"; "Sample proof · test details · not a real business"; "Example record · sample documents"; "Rehearsal · nothing filed, nothing paid" |
| Paths (fixtures, not copy) | `cofile.app/p/<firm>` for the desk; `cofile.app/bestaccounting/llc-filing-new-york` for the filing page |

No other names, people, businesses, numbers or addresses are invented. Social Security numbers, if
ever shown, are masked as the product masks them.

### D5. What every writer must stay consistent with

- **The registers** (2.4), on the Stripe model (decision 2): everything a firm uses is in CoFile's
  look, the same for every firm (the site, sign-up and account pages, the filing desk on every
  page, the proof in every state, the dashboard, the docs, every email to the firm or a
  subscriber's staff), with Miller, Founders Grotesk and Brass; only what reaches a firm's clients
  (the client form, client link pages, the firm's page for each filing, emails to its clients)
  carries the firm's Letterhead, colors and font, with Founders Grotesk; a platform's pages, its own
  proof and the widget carry only the platform's brand. On CoFile's pages the firm's name and logo
  are content (the desk's account label, the proof's head), never the letterhead, and its colors
  and font appear only inside pictures and previews of its client pages.
- **Sheets are always pure white**, in both modes, wherever a firm's name or a client's details
  appear.
- **One Brass button per screen** on every page in CoFile's look, the desk and the proof included
  (a Brass button pictured inside a sheet is not counted, 4.8); one primary button per view, in
  the firm's color, on a page its clients see.
- **No "with CoFile"** anywhere a client looks: no Imprint, no "Filed with CoFile", no mark of ours
  on client pages, emails to clients, white-label pages or the widget. CoFile reaches a client
  only in counsel's authorization text, set as the form's own (3.4).
- **The Firm Rule** (3 px, 2 px, 1 px) heads every page a firm's client sees and every picture or
  preview of one, and nothing else: never the desk, the proof or an email to the firm. CoFile uses
  the thick-and-thin only once for itself, in Plate Ink at the top of its footer.
- **The desk's ledger** shows who sent each filing ("Sent by", with the neutral "Your client"
  chip) and where it is up to (the five-dot stage track), on the desk and in every picture of it
  (4.3; 10B.4).
- **Filled-in answers**: an answer CoFile filled in on the desk's forms has a 3 px Brass Line edge
  and a Brass Tint wash until someone edits it; on a client's form, a prefilled answer uses the
  firm's derived colors (`--firm-ink` edge, `--firm-row` wash) (decision 38; 4.2, 3.6).
- **Status** uses 4.3's tones and glyphs; **rehearsal** is always dashed plus the ghost light (4.4);
  **coverage** uses the plate glyphs (4.5). Never color alone.
- **Chamfered corners** only on buttons, chips, plates and tiles; everything paper is square-cut.
- **No ticks**: lozenge bullets (5.4). No icons for ideas; an icon set of about 40, 24 px grid,
  1.5 px stroke, round caps and joins, Plate Ink, drawn to sit with the plate's 45° chamfers, with
  no padlock, shield, vault, seal, stamp, check-badge or government building in it (Marcus, Tomás,
  Priya).
- **Security stays support**: one line under the prices, set like its neighbour, and a calm page.
- **Nothing official** (3.9). **Nothing invented** (D4). **`[copy needed]`** wherever words are
  missing, listed in each part.
- **Accessibility floors**: 14 px minimum text except the stage track's 13 px line, which repeats
  the status beside it (5.2); 15 px for anything longer than six words; WCAG 2.2 AA everywhere,
  with the measured pairs in section 4; 48 px tap targets; focus rings (a 2 px outline in Plate
  Ink, or `--firm-ink` on a client's page, offset 2 px from a 2 px white ring) on every focusable
  element; every picture a `figure` with an accessible name and its label as `figcaption`.
- **Dark mode** per 4.6; **Spanish** per 5.4 (text runs about 20% longer: no fixed-width buttons,
  kickers may wrap).

### D6. Whose work to lean on

| Area | Lean on | For |
|---|---|---|
| **Art direction** (section 7) | **Hal** 7.1–7.6 | The photography commission and shot list (C1–C4, C6, C8–C10, C12 are his), the engraved vignettes, product imagery rules, ornament |
| | **Elaine** 7.2, 7.4, 7.5 | The documentary commission and honesty rule, product plates, the graphics desk (leader lines; not her numbered callouts on the proof, decision 16) |
| | **Rosa** 7.1, 7.3 (T1), 7.4 | Casting principles, the theatre, the structure of the craft film (re-cast for the engraver) |
| | **Jun** 7.2 | Still-life paper photography (After, the printer's proof) |
| **Motion** (section 8) | **Hal** 8.1–8.5 | Principles, tokens, the two-beat recipe, M1–M10 and the Firms moment in detail |
| | **Elaine** 8.1–8.2 | Once-per-visit rules, durations, the typed name carried through the page |
| | **Rosa** 8.3 (moments 3, 5, 7) | The text-to-draft, homecoming and house-lights choreography |
| | **Jun** 8.1, 8.4 (M6) | Paper physics for the envelope |
| | **Marcus** 8.1, 8.3 (M3, M10, M12) | Replay controls, money never moves, typing onto a plate, letterhead into proof, live brand previews |
| **Home page** (section 9) | **Hal** 9.0–9.9 | The base for every band, the header, the footer and the beta notice |
| | **Elaine** 9.1, 9.2, 9.4 | The full-width hero headline, the Firms headline's two sizes, the proof as centrepiece |
| | **Marcus** 9.1, 9.2 | Conversion detail: the hero's buttons and note, the clickable waiting row, phone order |
| | **Greta** 9.9, 9.3 | "$45" as a typographic picture; two brands read at a glance |
| | **Dev** 9.2, **Priya** 9.2 | The split's timing and the hairline that shows the two pages are one |
| | **Rosa** 9.7, **Tomás** 9.7 | The rehearsal stage |
| **Firm pages** (section 10: the desk, the proof, client pages, setup, emails) | **Hal** 10 | The Letterhead on every client-facing surface, the proof and the decision page (now in CoFile's look), the Branding previews |
| | **Priya** 10 | The house-color QA gallery, the proof's sign-off, client link pages (the desk's shell is now the dashboard's, 10C.2) |
| | **Dev** 10 | Logo analysis edge cases, the Door, the proof scale |
| | **Greta** 3.4, 10 | Typesetting firm names, the proof as a printer's proof |
| | **Marcus** 10 | The logo bay, Setup's live preview, carrying the typed name and color into Branding |
| **The pages behind the home page** | **Hal** (page heads), **Marcus** (For firms, How it works point-to-the-proof), **Elaine** and **Hal** (How it works photography), **Greta** (Pricing, the 1-2-3) | |
| **Components** (section 11) | **Hal** 11 | Chamfered buttons and chips, the price card, dot leaders, the proof |
| | **Marcus** 11, **Priya** 11 | States, fields, tables, one primary per screen |

### D7. `[copy needed]` raised by this foundation

| Where | What |
|---|---|
| Every photograph and every added picture (the doors, the blank plate, the bakery, the desk still life, the stage, the team, the engraver film, the vignettes) | Alt text; for the team, each person's name and role |
| The Close | The label of the optional firm-name field; an accessible description of the engraving |
| Moving pictures | The accessible name of the replay control |
| Home 2 | The accessible name of the wipe handle |
| Header (phone) | The word on the menu button ("Menu") and the menu sheet's accessible name |
| Branding setup | The label of the setting that shows or hides the typed name beside the logo; one line explaining a deepened button color; whether "Button text is white, so choose a dark color." changes once the ink match ships; the note when a raster logo is too small to show sharp |
| The engraver film | The craftsperson's credit and a text description for screen readers |
| Examples | Two more example firm names for the Branding page and docs |
| Home 4, the sample proof | A short spoken description for each of the three points beside it, saying which part of the proof it outlines (three items) |
| For firms | Whether the list line "The only sign of us is a small “with CoFile”." changes, now that no such mark appears to a firm's clients (3.4) |
| Setup | The words of the new step where a firm connects its own email domain, so emails to its clients come from it (6.8) |
