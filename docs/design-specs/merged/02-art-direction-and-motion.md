# CoFile merged design, part 2: art direction and motion (sections 7 and 8)

Merge round, Nov 26, 2026. This part writes sections 7 (art direction) and 8 (motion) of the merged
design for cofile.app, on the foundation in `01-foundation.md`. It uses the foundation's tokens,
type scale, example data (D4) and signature moments (D3), and doesn't reopen its decisions
(`DECISIONS.md`). The few choices this part had to settle where the ten disagree are in
`DECISIONS.md`.

Credits in parentheses name the designer an idea comes from: (Greta), (Dev), (Amara), (Jun),
(Rosa), (Tomás), (Elaine), (Marcus), (Priya), (Hal). Most of what is not credited follows Hal, as
the foundation directs (D6).

The copy is locked. Words in quotation marks are the round 3 copy, the stand-ins' sample data in
`web/components/landing/Visuals.tsx`, or labels the product already uses. Anything else a picture
or a moving part needs is marked `[copy needed]` and listed at the end of this file.

Section numbers like 3.4 or 6.4 refer to the foundation; D1 to D7 are its binding direction.

---

## 7. Art direction

### 7.1 What the pictures are

Everything on the site that is not words is one of four kinds of picture, in this order of
importance (D1):

1. **The product, live.** The desk, the client page, the draft, the proof, the record, the sample
   cards, the run sheet, the price card: built in HTML from the real components with the example
   data, at true scale, as white sheets lying on cotton paper. These carry the argument.
2. **Craft photography.** The shop's real objects: two real doors with two hand-engraved plates,
   the same door with its plate blank, the engraver at the bench, a printer's proof on a make-ready
   table, a desk where the papers come home, an empty stage with its ghost light.
3. **Documentary photography of people.** CoFile's real filing professionals, Ana at the bakery
   counter, a firm owner reading the proof at her own desk.
4. **Engraved vignettes.** Line engravings of contemporary things, in one ink, only for system
   pages, empty states, the log-in side panel and emails. (D1 also allows the sign-up side panel;
   that panel carries the photographed blank plate instead, because D3 engraves the typed name
   there.)

On the home page the product is the main object in eight of the nine bands, photography is the
setting it lies on in four (the doors, the bakery, the desk, the stage) and the whole picture in
one (the blank plate), and the "$45" is type. By area: about 65% product, 30% photography, 5%
typographic, 0% illustration and 0% 3D. Site-wide, about 60% product, 30% photography, 10%
vignettes.

**What makes them one family** (Hal, Elaine):

- **One light.** Every photograph is lit from camera left: low sun or a north window at the left
  of the frame, practicals where the place has them. Every live sheet composited onto a photograph
  throws its shadow down and to the right to agree with it (7.9). The page's own sheets keep the
  straight-down `--e-sheet` of an overhead window.
- **One paper.** Every sheet is pure white `#FFFFFF`, square-cut, on Cotton; every photograph's
  whites are graded to the Cotton white point, so a white sheet in a photograph and a white sheet
  in HTML look like the same stock.
- **One metal.** The brass in the photographs (the Harbor & Pine plate, the blank plate) is the
  brass of the one button. Brass Line draws the fine lines CoFile adds to its pictures (phrase
  underlines, leaders). No other gold, copper or yellow appears in any picture.
- **One firm at a time.** Harbor & Pine CPA is the firm in every product picture that shows one,
  except the second door of the two (Priya). By the fifth picture a visitor knows this firm; that is what their own
  clients will feel about theirs.

### 7.2 What the pictures are not

Nothing on the site, in any picture, photograph, vignette, icon or texture, is any of these:

- **3D renders or scenes**, WebGL light (the one exception is the engraving of a typed name into
  the photographed blank plate, 7.6 and 8.4 M9), real-time daylight, kinetic type, illustrated
  people, screen-print collage, cut-out portraits, black-and-white photography, duotones, glows,
  glass, colored shadows, isometric drawings, blobs, emoji.
- **Stock of any kind** (photographs, illustration, icons, video), **AI-generated people or
  images**, models standing in for CoFile's staff, and models in borrowed aprons standing in for
  people who bake (Rosa).
- **Testimonial pictures.** Nobody photographed is captioned as a customer, quoted, or implied to
  use CoFile (Rosa, Marcus).
- **Screenshots** of the product, of a state's website or of the IRS's; blurred or "abstracted"
  rows; tilted or perspective product; browser chrome; laptop or phone hardware renders (D1).
- **Anything official** (3.9): seals, rosettes, eagles, flags, capitol domes, columns, courthouses,
  state outlines, guilloche, certificate frames, parchment, a state's or the IRS's real header,
  form or letter layout. Real papers in photographs are edge-on or face-down.
- **Security imagery**: padlocks, shields, vault doors, check-in-circle badges, fingerprints,
  magnifiers over documents, "verified" badges, stamps (2.6).
- **The tired office**: handshakes, high-fives, people pointing at laptops, smiling headsets,
  crowds round a screen, glass-walled startup offices, a stressed person rubbing their temples,
  piles of paperwork as a joke, anyone jumping for joy (Rosa, Marcus, Greta).
- **Messaging apps**: no app's bubble colors, shapes, read receipts, typing dots, timestamps or
  logos. WhatsApp and Slack are named in words only (Tomás, Amara).
- **Legible real business names or marks** in any frame: signage is removed, out of frame or soft
  (Rosa). The only legible names on the site are the example firms' and the example clients'.

### 7.3 The product pictures

#### 7.3.1 How every product picture is built

(Elaine, Marcus, Greta, Hal, with Priya's "one firm tells the story")

| Rule | Specification |
|---|---|
| **Built from** | The real components (section 11) in live HTML, fed the example data in D4 and nothing else. The stand-ins in `Visuals.tsx` are replaced one for one, keeping their figure names and captions. Where a picture also exists in the product (the desk, the proof), it is the same component with a `picture` flag that makes its controls inert |
| **Scale** | 1:1 with the product, or a little under (never above 100%, so type never looks inflated). If a sheet is bigger than its place on the grid, the sheet's edge or the viewport crops it; it is never shrunk to fit (Greta, Dev). On phones each picture uses the product's own phone layout, never a shrunk desktop one |
| **The sheet** | Pure white `--sheet`, `--r-sheet` corners, `--e-sheet` on Cotton, `--e-sheet-dark` on Night, `--e-photo` when lying on a photograph (7.9). Sheets may bleed up to 120 px into the margin (6.2). Never tilted, never in perspective, never in a device frame except the drawn phone slab |
| **The letterhead** | Every product picture of a firm surface opens with that firm's Letterhead and Firm Rule (3.5), in its own font (3.7). CoFile's headline face never appears inside one |
| **The Imprint** | "with CoFile" at its true 13 px, exactly where 3.4 puts it for that surface, never enlarged (Marcus) |
| **Values** | Values that go to the state are in Founders Grotesk Mono (5.5). Prices inside pictures of firm surfaces are Founders Grotesk Text tabular, because those pictures are firm pages (the price card, L8, is CoFile's own and uses Miller). Dollar amounts show cents |
| **Empty values** | Where the copy gives no value for a field, the field is empty or shows a neutral 10 px Rule bar. Never invented text, never lorem ipsum (Marcus) |
| **Buttons in pictures** | Drawn as the real button, `aria-hidden`, not focusable, no hover. The only live controls inside pictures are the wipe handle (L2), the clickable waiting row (L1), the For firms previews' fields (L11) and the Close's name field (L9) |
| **Label** | Every example picture keeps its label (7.10) as a 14 px Graphite caption 12 px under its lower-left corner, always visible, never inside the picture, never a tooltip |
| **Accessibility** | Each picture is a `figure` with the stand-in's accessible name and its label as `figcaption`. Text inside is real text, so a screen reader reads the desk's rows as rows; decorative parts (crop marks, leaders, the pool of light, the photographs that are only a setting) are `aria-hidden` (Greta, Elaine) |
| **Dark mode** | Sheets stay white; the page around them goes to Night; photographs darken 4% (4.6) |

#### 7.3.2 Objects that recur inside the pictures

**The drawn phone slab** (6.4): `--r-device` 44 px, a 10 px Plate Ink bezel, no notch, no buttons,
no brand. Used only where the copy is about a phone or a text and no photograph carries the phone.
On the home page Ana's own phone in photograph C5 does that job, so the slab is held in reserve.

**CoFile's own message bubble** (Hal, Priya): a fragment of a conversation, never any app's.
Cotton 2 `#F3F0E8` fill, Plate Ink text in Founders Grotesk Text 17/25, `--r-sheet` corners, a
small tail at the lower left cut as a 45° chamfered notch 8 px deep (the plate's corner, not a
speech-bubble curl), max width 300 px, 16 × 20 px padding. Under it, outside the bubble: "Ana Ortiz
· text message · example" at 14/20 Graphite. No timestamp, no read mark, no avatar, no typing dots.
On Night (dark mode) the bubble is Night Card `#1F2230` with Night Ink text.

**The state's screens, redrawn** (Dev's "foreign UI", Hal, Priya): wherever a picture shows the
state's website (the proof's "New Jersey's own review page, filled in", the payment slip), it is a
neutral frame that can't be mistaken for any real page: a 1 px Rule border, a plain 20 px Bond
`#F5F5F2` top band with no title, no logo, no dots, no state name; inside, label and value rows in
Founders Grotesk Text 15 px (labels) and Mono 15 px (values), 12 px padding. The only words in it
are the copy's labels and values ("Business Name", "TWO SISTERS BAKERY", "Designator", "LLC").
Above the frame, the copy's caption for it in 14 px Graphite.

**CoFile's own document cards** (Hal, Dev, Marcus): the papers that come back, drawn as what they
are on the filing desk, never as facsimiles. A white card in letter proportion (8.5 : 11), 184 ×
238 px in the home picture, `--r-sheet`, 1 px Rule edge, 20 px padding. Top: the issuer as a
14 px Graphite label ("New Jersey", "IRS"). Then the document's name in Founders Grotesk Medium
18/24 ("Certificate of Formation", "EIN letter (CP 575)"). Then the value in Mono 15 px ("TWO
SISTERS BAKERY LLC", "EIN 00-0000000"). Then five Rule bars, 6 px tall, 10 px apart, at 100%, 92%,
96%, 74% and 40% of the text width, standing for a body without imitating one. No seal, crest,
signature, barcode, form number styling, letterhead or border.

**The envelope** (Hal, Jun): a heavy white wove envelope drawn in SVG, 1 px Rule edge, 2 px
corners, its flap a separate layer hinged on the top edge (8.4 M5 opens it), the inside of the
flap plain white with a faint 1 px Rule. On its face, the firm's name as the address, set in the
firm's font: "Harbor & Pine CPA" in Lora 600, 15 px, Plate Ink. No stamp, no postmark, no window,
no CoFile mark.

**Status chips, plate glyphs and the rehearsal mark** are drawn exactly as 4.3, 4.4 and 4.5.

**Highlights and leaders that CoFile adds** (Elaine's graphics desk, in our metal): they are
CoFile's annotation, so they use CoFile's line colors and sit outside the firm's sheet wherever
they can.

- Phrase underline: 1.5 px Brass Line `#A87A1E`, 2 px below the baseline, square ends.
- Travelling words: a Brass Tint `#F6EBD0` highlight behind the client's phrases and behind the
  values they land in, inset 2 px top and bottom (4.2). Text on it stays Plate Ink.
- Leaders: 1 px Brass Line, dotted (2 px dots every 5 px), one gentle elbow with a 24 px radius,
  ending in a 4 px Brass Line dot on the thing it points at, never an arrowhead (Elaine).
- Numbered callouts on the proof (Elaine): in the margin outside the sheet, never on it, so they
  read as our mark-up and not the firm's page. Their drawing is section 11's; their timing is M4.
- Inside a firm's sheet, emphasis is the firm's own `--firm-tint` "check this" wash (3.6), never
  Brass.

#### 7.3.3 The product pictures, one by one

Every picture below uses D4's data exactly. Layout on the grid is set in sections 9 and 10; what
each shows, how it is built, its label and how it moves are set here.

| # | Picture | Where | What it shows, and how | Label (figcaption) | Accessible name | Moves |
|---|---|---|---|---|---|---|
| **L1** | **The desk** | Home 1 (hero), with the proof tucked behind; For firms "Your filing desk, in your brand." in full, with the navigation row and no proof behind | Harbor & Pine's filing desk: the Letterhead row (logo, typeset "Harbor & Pine CPA" in Lora 600, "Filing desk", and the Imprint at the row's right end, 3.4), the Firm Rule, "Client filings" and "New filing", and the four rows of D4 with their chips ("Proof ready to approve" as the your-turn chip; "Filed" and "Filed, IRS letter saved" as done chips; "Submitted" as in hand). Behind it on the home page, the edge of the proof for Two Sisters Bakery LLC, offset right and down, `aria-hidden`. The Two Sisters row is the one live link in the picture (Marcus) | "Example · test details · not a real firm" | "An example firm's filing desk" | M1 on the home page; still on For firms |
| **L2** | **Two doors, one page** | Home 2; For firms "Your name on the door. Ours in small type." | Photographs C1 (left) and C2 (right), medium frames, square-cropped on their plates. Over each photograph's lower edge, the same client page in that firm's brand: Letterhead, "Start your New Jersey LLC" in the firm's font, "Business name" and "Who owns it" with empty fields, "Continue" in `--firm-fill`, the Imprint at the foot. Each panel's ground under its sheet is that firm's `--firm-wash`. The two pages' bones sit on the same pixels. Between them, the wipe handle (8.4 M2) | "Two example firms · same page, each in its own brand" | "The same client page under two example firms" | M2 |
| **L3** | **From a text to a draft** | Home 3; How it works "Clients don't always fill in forms. They text you." | Photograph C5 (Ana at the counter) as the setting. Her message set at reading size in CoFile's bubble (7.3.2), laid over the photograph's edge near her phone (her phone screen in the photograph shows the same message, composited small). The draft sheet beside it: Harbor & Pine's working Letterhead, "Draft: New Jersey LLC formation" with the "For your team to check" chip, then the five rows of D4: three values "from the text" (tag in Brass Ink with a 12 px speech-bubble glyph) and two "already filled" (tag in Graphite with a 12 px plate glyph). Brass Line underlines and Brass Tint highlights on "an LLC for the bakery", "me and my sister, 50/50", "in Jersey City" and on the values they became; dotted leaders between them | The bubble's own line, "Ana Ortiz · text message · example" | "A client's text drafted into a New Jersey LLC formation" | M3 |
| **L4** | **The proof** | Home 4; How it works "You see what the state will see, before the state does." (as the end state of L10) | The sample proof on Harbor & Pine's ceremonial (centred) Letterhead, "example firm" in its top corner: "Two Sisters Bakery LLC" with "Ready to approve"; the three detail rows in Mono, with `--firm-tint` behind "TWO SISTERS BAKERY LLC" and "88 Grove St, Jersey City NJ 07302" (the stand-in's highlights); the two fee rows with dot leaders, the single rule, "Total to the state $103.50" and the double rule under the amount; "New Jersey's own review page, filled in" in the neutral frame; "Approve for filing" in `--firm-fill`; the Imprint. Numbered callouts 1 to 4 in the margin (Elaine). Under the sheet's foot, half tucked behind it, the payment slip on Bond: "New Jersey payment screen" · "$103.50" · "Matches the proof" (done chip) | "Sample proof · test details · not a real business" | "A sample proof for an example business" | M4 |
| **L5** | **The order comes home** | Home 5 | Photograph C6, the clean plate of the walnut desk (centre clear), as the tabletop. On it, live: the record card with its three stages on a hairline ("Approved", "Submitted", "Filed", done glyphs); the envelope (7.3.2), addressed "Harbor & Pine CPA"; the two document cards (7.3.2), which end side by side on the record. Shadows matched to the photograph's light (7.9) | "Example record · sample documents" | "A filed record with the state's document and the IRS letter" | M5 |
| **L6** | **The sample cards** | Home 6 | One white card per place in the stand-in's order (New York, New Jersey, Florida, IRS), 1 px Rule border, no shadow (cards on a table): the place name at `display-m`, then each filing from `web/lib/coverage.ts` (Planned types left out) with its plate glyph (4.5) and its status as the glyph's accessible name; the copy's legend in words under the cards. No state outlines, seals or flags: the name alone (Hal) | none: this is real coverage, not an example | the glyphs and legend carry it | M6 |
| **L7** | **The programme** | Home 7; What we file "How a filing type goes live." | Photograph C7, the stage under its ghost light, with the run sheet on a white sheet over its lower edge: Harbor & Pine's working Letterhead, then "Rehearsal · New Jersey LLC formation" with the rehearsal chip (dashed, ghost-light glyph) and "test details", then the seven lines of D4, each label in Founders Grotesk Text 17 px and each result in Mono 16 px. The last line, "Pay Now" · "held, on purpose", is set exactly like the others: no color, no weight, no icon (Hal, Rosa) | "Rehearsal · nothing filed, nothing paid" | "Example rehearsal log" | M7 |
| **L8** | **The price card** | Home 8 | Heavy white card (`--e-card`): the four lines of the copy with dot leaders, left items at `price-l`, right items in Miller Text Italic (section 9 sets it). It is CoFile's own card, not a firm surface, so Miller is right here. No texture on the card | none: real prices | its text | Still. Nothing moves |
| **L9** | **The plate, blank** | Home 9 (the Close); sign-up | Photograph C3 (C4 in dark mode), full bleed on the home page, beside the form at sign-up, with the real-time engraving of the name the visitor types (7.6) | none | `[copy needed: alt text]`, plus `[copy needed: an accessible description of the engraving]` | M9, M10 |
| **L10** | **A letterhead proof becomes the proof** | How it works "You see what the state will see, before the state does." | Opens as a Harbor & Pine letterhead proof on the table: the ceremonial Letterhead, Rule bars for a letter's body (no invented text), and crop marks at the four corners (0.75 px Plate Ink, 16 px long, 8 px clear of the sheet). It becomes L4: the copy's own comparison made visible (Marcus). Beside the lede, photograph C9 | "Sample proof · test details · not a real business" | "A sample proof for an example business" | M13, M14 |
| **L11** | **Your brand, everywhere at once** | For firms | Four live previews in one row (two by two on tablet, stacked on phone): the desk's Letterhead row with its first two rows; the client page from L2; the proof's head (Letterhead, title, chip); the head of the product's real "Your proof is ready to approve" email with D4's data. Above them, the product's own Setup fields "Name your clients see" and "Main color" (the nine ready swatches of Branding), prefilled with Harbor & Pine, or with the name the visitor typed at the Close (Marcus, Dev, Priya) | "Example · test details · not a real firm" | `[copy needed]` | M12 |
| **L12** | **The saved agent** | For firms "Your registered agent, or ours." | A detail crop of L3's draft sheet, cropped like a detail plate in a book (Hal): the Letterhead's edge and the two last rows, "Registered agent" · "Your saved agent" and "Organizer and signer" · "Your saved answers", each "already filled"; the sheet's bottom edge fades into Cotton over 48 px | "Example · test details · not a real firm" | `[copy needed]` | Still |
| **L13** | **Underneath a platform** | For platforms | The embed widget, live, on a neutral host page (a Rule-bar logo and grey text bars, never an invented platform brand), "Filed with CoFile" at its foot (3.4); beside it a code sheet in the docs' code style showing a run with `"dryRun": true` and the webhook stages named with the product's own status labels and D4's values. Section 10 sets the exact request from `openapi.json` | `[copy needed]` | `[copy needed]` | Still |

### 7.4 Photography: the commission

#### 7.4.1 Who

**One photographer for every still on the site** (D1), so the light is one light: an interiors and
still-life photographer who also makes honest documentary portraits, whose book shows real small
businesses and real working rooms rather than staged offices, and who works in natural light and
practicals (Hal, Elaine). Medium-format digital (100 MP), tethered.

**The crew** (Elaine, Rosa, Priya): a producer who also handles releases and locations; a first
assistant; a digital tech shooting tethered to a calibrated monitor, who checks on set that Harbor
`#1D4E63`, Ember `#C2410C`, the brass and skin all render true; a casting director who casts real
people, in English and Spanish, through chambers of commerce, small-business development centres
and community organizations, and pays everyone a proper day rate (Rosa); a location scout; a prop
stylist who mostly removes things (Rosa); a set painter for the Harbor & Pine door; a print-trained
retoucher who knows when to stop (Hal); and, on the door days, a technical director from the
creative-technology studio to capture the HDRIs and the light passes (7.6).

#### 7.4.2 How every photograph looks

- **Light:** natural light and practicals only, shaped with flags and bounce. No strobes. Light
  from camera left in every frame (7.1). Expose to hold the highlights in brass.
- **Grade:** neutral and slightly warm, whites at the Cotton white point, true blacks, skin exactly
  as it is, checked against the person on set. No teal and orange, no haze, no vignetting, no added
  grain, no black and white (D1, Hal). One grade, written as a LUT and given to the photographer,
  the film crew and the retoucher.
- **People:** mid-task, not posing, not looking at the lens except in the tight team portraits.
  Hands matter: a thumb on a phone, a hand near a trackpad, a burin (Elaine, Rosa).
- **Casting** (D1, Rosa): New Jersey, New York and Florida as they are; ages 30 to 70, firm owners
  40 to 70; every background, every body; reading glasses and grey hair where they belong.
- **Screens:** shot dark or with tracking marks, then composited with captures of the real
  components with D4's data (Playwright at 3×), perspective-matched, keeping the glass's real
  reflections and curve. Never invented UI. If a screen can't be replaced cleanly, it faces away
  (Elaine, Priya, Dev).
- **Documents:** never real state or IRS papers. Folders closed, papers edge-on or face-down, or
  CoFile's own document cards printed as props (7.3.2) (Hal, Elaine).
- **Every frame is shot for its crops** (Elaine): each shot below lists its desktop and phone
  crops; the photographer frames for both on the day and delivers each crop as its own
  art-directed file, so a phone never gets a desktop frame squeezed (6.6).
- **Releases** (Elaine, Rosa): model releases for everyone in frame and property releases for
  every location, covering web, email, advertising, social and print, worldwide, five years and
  renewable; bilingual where needed. Everyone sees their selects before use, and a picture of a
  person is retired on request, with no questions asked (Rosa).
- **Retouching:** dust, stray signage, logos on devices and clothing, a flyaway hair. Never a face,
  a body or an added person (Greta, Hal).

#### 7.4.3 The schedule, in the order the shots depend on each other

| Day | Where | Shots |
|---|---|---|
| 1 | The engraver's bench | C11 (the film and its stills): the Harbor & Pine plate is cut on camera, so it exists for day 2 |
| 2 | The Harbor & Pine door, from noon to an hour after sunset | The engraver fits the plate (C11, last shots); C1 in the late sun; C3 in the same 20 minutes of sun; C4 at dusk; HDRIs and light passes |
| 3 | The Northgate door, mid-morning; then a studio or office with a north window | C2; C6 |
| 4 | The bakery, from 5:00 a.m. | C5 |
| 5 | The CPA's own office (morning); the letterpress shop (afternoon) | C8; C9 |
| 6 | The theatre (any hour with the house dark) | C7 |
| 7 | CoFile's own workplace, at the team's convenience | C10 (7.5) |
| — | The reprographic studio | C12 scans, any time |

#### 7.4.4 The shot list

Each shot uses the foundation's commission number (D1). Picture areas at desktop are set by
sections 9 and 10; the crops below give each frame's proportion, what must be safe inside it, and
where the subject sits.

---

**C1 · Harbor & Pine's door**

- **Shows:** a painted wooden office door and, beside it, a real brass name plate hand-engraved
  "Harbor & Pine CPA" with the italic ampersand, letters filled black (the plate: 7.6). The firm's
  name on its door, in good light.
- **Setting:** a brick office building on a quiet street in Jersey City, Hoboken, Montclair or
  Brooklyn: a converted rowhouse or a small 1920s commercial building with a stone step and a
  transom over the door. The door is a deep harbor-blue black, close to Harbor `#1D4E63` in shadow;
  the scout looks for one already that color, otherwise the set painter repaints it with the
  owner's permission and restores it after. A plain brass lever or knob. The plate is mounted on
  the brick to the right of the door, its centre 1,500 mm above the step. No house numbers, no
  names on mailboxes, no neighbouring signs, no intercom brands in frame.
- **Light:** late-afternoon sun raking from camera left at 20° to 30° across the wall, so the
  engraved letters read in light and shadow; the shot is made inside one 20-minute window,
  flagged against spill.
- **Lens and camera:** medium format on a tripod, locked off for the whole day so C1, C3 and C4
  register exactly. A tilt-shift lens for true verticals. Plate frames shot square-on, the lens
  axis perpendicular to the plate, to make compositing exact. Brackets of ±3 EV for HDR.
- **Frames:** *wide* (door, step, brick and plate; about 35 mm full-frame equivalent); *medium*
  (the plate and the doorframe's edge; about 50 mm); *macro* (the engraved letters filling the
  frame in raking light; a 120 mm macro).
- **Passes:** a base pass with the sun just off the plate (soft light, the engraving readable but
  quiet); fifteen light-pass frames as a 20 cm strip reflector is walked left to right so a band of
  highlight crosses the letters (Elaine's bracket); the same reflector walk filmed as a 1.2 s video
  clip from the same lock-off, cropped later to the plate, first and last frames matching the base
  pass (Home 2's raking light, 9.2); a clean pass with the plate removed; a 360°
  HDRI from the plate's position at the moment of the base pass (for the engraving, 7.6).
- **People and casting:** none.
- **Props:** the plate; nothing else is added. The stylist removes anything branded.
- **Used in:** Home 2, the left door of L2 (medium frame); For firms (wide frame, and the last shot
  of the engraver film C11 ends on it); the macro frame for a detail on For firms if section 10
  wants one, and for press material.
- **Desktop crop:** medium frame at 1:1, the plate's centre at 50% across and 40% down, the plate
  58% of the frame's width, the doorframe's edge at the right; the lower 25% of the frame quiet
  brick, where the client page overlaps. Wide frame at 3:2 for For firms.
- **Phone crop:** medium frame at 4:3 (the L2 carousel card), the plate centred, in the upper half.

---

**C2 · Northgate Payroll's door**

- **Shows:** a different building and a different temperament: a glazed aluminium-framed door and
  beside it a brushed-steel plate of the same shape and size, engraved "NORTHGATE PAYROLL" in
  geometric capitals, black-filled (7.6). Two firms that have never met (Hal).
- **Setting:** a converted mill or a small modern office building: concrete or pale brick, the
  aluminium frame clear-anodized, through the glass a softly lit open office out of focus (no
  legible screens, no people in focus, no logos). Plate centre at 1,500 mm, to the right of the
  door, as at C1.
- **Light:** mid-morning daylight from camera left, softer than C1's sun; a black flag and a
  polariser to control reflections in the glass.
- **Lens and camera:** the same lens, height and framing as C1's medium frame, so the two sit as a
  pair; tripod, square-on to the plate.
- **Frames:** medium (the pair to C1's); a wide for spares.
- **Passes:** base pass, fifteen light-pass frames (as C1), clean pass, and the 1.2 s raking-light
  video clip (as C1).
- **People and casting:** none.
- **Props:** the steel plate.
- **Used in:** Home 2, the right door of L2; For firms, inside L2.
- **Desktop crop:** as C1's medium frame: 1:1, plate centre at 50% across and 40% down, 58% of the
  width.
- **Phone crop:** 4:3, the plate centred in the upper half.

---

**C3 · The blank plate**

- **Shows:** C1's door and wall in the same light, the brass plate **blank**: two screws with their
  slots level, the bevel catching the sun. An empty plate in good light, waiting for a name.
- **Setting, light, lens:** C1's lock-off, in the same 20 minutes of sun, the engraved plate
  swapped for the blank one on the same screws.
- **Frames:** *wide* (for the Close: door, brick and plate); *medium* (for sign-up); a square-on
  *plate* frame at 1:1 for the engraving's base texture (the brass's grain and roughness).
- **Passes:** base pass; the HDRI is C1's; a light-pass set as C1 (for the sweep after typing,
  8.4 M9).
- **People and casting:** none.
- **Used in:** Home 9, the Close (L9); sign-up's side panel (L9); the base for engraving any typed
  name (7.6).
- **Desktop crop:** the Close at 16:7, full bleed (630 px tall at 1440), the plate in the right
  third at eye level, at least 300 px wide at 1440 so a typed name reads; the left 40% quiet door
  and brick, under the Cotton panel. Sign-up at 4:5, the plate centred 45% down.
- **Phone crop:** the Close at 4:5, the plate centred, 70% of the frame's width, 45% down;
  sign-up as a 16:9 strip cropped on the plate.

---

**C4 · The blank plate at dusk**

- **Shows:** C3 thirty minutes after sunset: warm light from the transom above the door, the blank
  plate catching the street light (Hal, with Elaine's and Amara's dusk door).
- **Light:** the transom lit from inside by a 2,700 K practical; a 3,000 K lamp on a stand off
  frame left standing in for a street light so the light still comes from the left. Two passes:
  transom off and transom on. A dusk HDRI from the plate's position.
- **Frames, lens, crops:** C3's wide and medium frames from the same lock-off, the same crops.
- **Used in:** the Close and sign-up in dark mode (the transom-on pass); the social cards for
  CoFile's pages (a 1,200 × 630 crop of the wide frame, the plate in the right third); the
  transom-off pass is a plate for the retoucher.

---

**C5 · The client asks**

- **Shows:** Ana at her bakery counter at the start of the day, thumbing a text with one hand, the
  other floury: a business owner handing a job to someone she trusts, mid-thought, practical, a
  little rushed (Hal, Elaine).
- **Setting:** a real independent neighbourhood bakery in Jersey City, Union City or West New York,
  5:30 to 7:00 a.m.: ovens on, the shop still dark but for the work lights and the first daylight.
  A steel counter with flour on it, a tray just out of the oven, proofing loaves on a rack. Its
  signage out of frame or soft.
- **Light:** the oven's glow and a work lamp as practicals, the first daylight from a window at
  camera left.
- **Lens:** about 50 mm full-frame equivalent at f/2.
- **People and casting:** two real sisters who bake, in their thirties or forties, as Ana and
  Lucia Ortiz (D1); ideally in their own bakery. Ana in an apron, flour on her wrist; Lucia behind
  her, soft, pulling a tray. Cast and captioned as examples (7.10), never as customers.
- **Props:** an unbranded phone in a plain case (logo taped and retouched); flour; a tray; a rolling
  pin. The phone screen is shot dark with tracking marks; her message is composited in CoFile's
  bubble (7.3.2).
- **Frames:** *tight* on her hands and the phone, her face at the frame's edge; *loose* with her
  face and Lucia behind.
- **Used in:** Home 3, inside L3 (tight frame); How it works "Your client asks." (loose frame) and
  "Clients don't always fill in forms. They text you." (inside L3).
- **Desktop crop:** tight frame at 4:5 for L3, the phone in the lower right third where the bubble
  overlaps; loose frame at 3:2 for How it works.
- **Phone crop:** tight frame at 3:2 above the bubble, hands and phone centred.

---

**C6 · The papers come home**

- **Shows:** a top-down still life of a walnut desk (Hal, Jun): at the edges a fountain pen, reading
  glasses and a cup on a coaster; the centre clear, where the live envelope and record will lie.
  A second frame has a heavy white envelope on it, addressed "Harbor & Pine CPA", papers edge-on
  or face-down. A third has the same envelope turned flap-up, so no address shows.
- **Setting:** a studio or office with a large north window; one oiled walnut desktop, about 1.8 ×
  1.0 m, lightly figured, no scratches that read as dirt.
- **Light:** north window light from camera left (top of frame left), soft; a white bounce at
  right.
- **Lens and camera:** medium format on a copy stand directly overhead, a 100 to 120 mm lens from
  about 2.5 m, so every sheet is a true rectangle for compositing (Jun).
- **People and casting:** none.
- **Props:** a black lacquer fountain pen (no brand), tortoiseshell reading glasses, a plain white
  cup on a cork coaster; for the second and third frames, the envelope printed by the prop
  typesetter with the address in Lora 600, and CoFile's own document cards printed as props, shot
  edge-on or face-down.
- **Passes:** the clean plate (props only, centre clear); the envelope frames; a light-only pass on
  a grey card for matching the live shadows.
- **Used in:** Home 5 (the clean plate under L5); How it works "The papers come back to you." (the
  envelope frame); the "Completed" email of every firm (the flap-up frame, so no firm's name but
  its own ever appears in it).
- **Desktop crop:** the clean plate at 4:3, the props inside the outer 15% of the frame, the centre
  60% clear; the envelope frame at 4:3 or 3:2.
- **Phone crop:** the clean plate at 4:5, the props in the corners.

---

**C7 · The stage**

- **Shows:** an empty stage under a single ghost light, from the back of the house: "the whole
  filing, performed on the state's real website with no audience" (Rosa, Amara, Tomás).
- **Setting:** a real small theatre or school auditorium in Jersey City, Newark, Queens or Miami:
  a proscenium, the curtain open, bare boards, rows of empty seats in the foreground falling to
  dark. Exit signs out of frame or retouched dark, since red is only for errors (4.8).
- **Light:** the ghost light only: a bare clear 60 W incandescent bulb (2,700 K) in a wire cage on
  a stand at centre stage, house lights and work lights off; brackets to hold the bulb and the
  dark.
- **Lens:** about 35 mm equivalent from a raised position (the last row or a balcony rail) for the
  wide; about 50 mm for a close frame of the ghost light with the boards and the curtain's edge
  (Rosa T2).
- **People and casting:** none. Nobody on stage, nobody in the seats.
- **Used in:** Home 7, inside L7; What we file "How a filing type goes live.", inside L7.
- **Desktop crop:** the wide at 21:9, the ghost light at about two-thirds across, the run sheet
  overlapping the lower left; the light's pool and the bulb never covered.
- **Phone crop:** the close frame at 4:5, the bulb in the upper third.

---

**C8 · The firm approves**

- **Shows:** a firm owner at her own desk reading the proof on her screen: someone checking a thing
  she cares about, calm and in charge, not pressing anything (Hal, Elaine, Priya).
- **Setting:** her own office, rearranged only for light: framed photographs, a plant, binders, a
  window, a legal pad. No government certificates or seals in frame; a framed licence on the wall is
  out of frame or soft past reading (Amara).
- **Light:** window light from camera left; her desk lamp as a practical.
- **Lens:** about 50 mm at f/2.8 for the over-the-shoulder frame (the screen large in frame, her
  concentration in the set of her shoulders); about 85 mm for a three-quarter frame of her face.
- **People and casting:** a real CPA in her fifties or sixties (D1), cast to appear as the example
  firm's owner, reading glasses on, dressed as she dresses for work. Captioned as an example (7.10).
- **Props:** her own desk; the screen tracking-marked and composited with L4 in Harbor & Pine's
  brand; her hand near the trackpad, the cursor never on the button.
- **Used in:** How it works "You approve it."; For firms (section 10 places it).
- **Desktop crop:** 3:2 over the shoulder; 4:5 three-quarter.
- **Phone crop:** 4:5 over the shoulder, the screen in the upper half.

---

**C9 · The proof at the printer**

- **Shows:** the copy's own comparison: "You've approved a proof before: business cards, letterhead,
  an invitation at the printer."
- **Setting:** the make-ready table of a real letterpress or engraving shop, worn wood or a light
  table, the press soft in the background.
- **Light:** raking window light from camera left.
- **Lens:** overhead at about 50 mm macro; a second frame at 30° with a 120 mm macro.
- **People and casting:** none, or the printer's hand and apron at the frame's edge (Greta).
- **Props:** a sheet of Harbor & Pine CPA business cards eight-up with crop and registration marks,
  and a Harbor & Pine letterhead proof, both printed by the shop on cotton stock from the identity
  studio's files, in Harbor blue; a pencil "OK" in the margin with a short pencil rule, and no
  initials or signature (nobody is invented); a linen tester (loupe) and a pencil. Optionally an
  invitation proof with rules and a blank where the names go. No stamps.
- **Used in:** How it works, beside the lede of "You see what the state will see, before the state
  does."
- **Desktop crop:** 4:3 at about 320 × 240 beside the lede.
- **Phone crop:** 3:2, full width under the lede.

---

**C10 · People at the bench** is CoFile's own team: its brief is 7.5.

**C11 · The engraver** is the craft film: its brief is 7.6.3.

**C12 · Paper scans**

- **What:** flat reprographic scans at 1,200 dpi by a reprographic studio, not a flatbed (Hal): 100%
  cotton letter paper (felt side, about 118 gsm); 600 gsm cotton card; black card.
- **Use:** the cotton tile at 3% multiply on Cotton grounds and the black-card tile at 4% screen on
  Night (4.8); the 600 gsm card is the reference for the price card's edge line and shadow and for
  print collateral, never a texture on a sheet. Cleaned, grey-balanced, made seamless at 512 px,
  WebP under 40 KB each.

### 7.5 The team: "Built and run by filing professionals"

The line is a claim about real people, so its pictures are of the real people, or there are none
(all ten). This is commission C10.

**Who.** CoFile's own filing professionals, the people who take over when a filing needs a person.
Ideally three to five; one is enough to run the pictures. Only people who agree in writing appear.
Nobody stands in for anyone: no models, no stock, no AI, no friend of the founder in a borrowed
headset. If nobody can be photographed, every slot below is dropped and its layout closes up; the
hero note stands as words, which it does well (Hal, Greta).

**Consent.** A written release covering the site, emails, social and sales material, worldwide,
renewable. Each person sees their selects first and chooses which run (Rosa). Anyone can withdraw
at any time, and their pictures come off the site within five working days. The pictures, names,
roles and consent dates live in one data file (for example `web/lib/team.ts`) that every slot
reads, so taking one person out removes them everywhere at once and the rows close up.

**The shoot.** Day 7 of the schedule (7.4.3), half a day for three to five people, by the same
photographer in the same light as the rest of the set, at their real workplace (an office or a home
office) and at a time that suits them.

- **The tight portrait**, for every person: head and shoulders, about 85 mm at f/2.8, eye level,
  window light from camera left, looking just off lens with a natural expression (not a grin),
  their own workplace soft behind them rather than a backdrop. Every person framed the same way:
  the same height in frame, the eyes on the same line, so a row of them reads as a team (Dev,
  Elaine). Delivered at 1:1 and 4:5.
- **At the bench**, for every person: from the side, at work, three-quarter light, one hand on the
  keyboard or a pen, not looking at the camera and not smiling for it (Hal). The screen is
  composited with a neutral redraw of a state form (7.3.2) or the filing desk with D4's data,
  never a real state site, never a real client's details. Delivered at 3:2 and 4:5.
- **Together** (optional): two colleagues reading one printed sheet at a window, 3:2 (Tomás).
- **Hands only** (optional, for anyone who would rather not show their face): their hands at work,
  used only in the at-the-bench slots, never as a portrait (Rosa).

**Styling.** What they wear to work. No props for effect, no headsets unless they use them every
day, nothing branded (CoFile has no merchandise to show, and shouldn't).

**Where they appear, and how they're set.**

| Where | Frame | Size and setting |
|---|---|---|
| Home 1, with the note "Built and run by filing professionals. When a filing needs a person, one of them takes over." | Tight portraits | Up to three square portraits, 56 × 56 px desktop and 48 × 48 px phone, 8 px apart, square corners (`--r-0`), no rings, no overlap, no circles (circles read as avatars in a chat app). Present at first paint; never animated. Names in alt text only (decisions file). Section 9 places the row |
| How it works, step 3 ("CoFile files it.") and the band under the steps | At the bench | A triptych of three 4:5 frames across the grid, or one 3:2 frame beside step 3; a caption under each with the person's name and role `[copy needed]` |
| Pricing, near "Every plan is backed by filing professionals" | Tight portraits | A row of up to five 120 × 120 px squares, the name and role under each in 14 px Graphite `[copy needed]` (Elaine) |
| Questions, inside the answer to "Is a person involved?" | One tight portrait, 4:5 | 200 px wide, floated right on desktop and full width under the answer on phone, its name-and-role caption under it `[copy needed]` (Hal) |
| For firms, beside the list item "CoFile is built and run by filing professionals…" | One tight portrait | A 56 px square in place of that item's lozenge (Hal); the item's own words carry it |

**Rules.** A person never appears twice in one row. A row shows only the people there are; it
never pads with a placeholder or a silhouette. Captions give a name and a role, never a quote and
never "example". Portraits are not links and have no hover.

### 7.6 Craft: the plates, the engraving and the film

#### 7.6.1 The plates

The two doors, the blank plate and the mark all hang on real plates made by a working hand engraver
(the kind who still cuts name plates and trophies by hand), so every brass thing on the site is a
photograph of a real object (Hal).

| Plate | Metal and finish | Lettering | Use |
|---|---|---|---|
| **A. Harbor & Pine CPA** | Brass, 300 × 120 mm, 3 mm thick, satin-brushed face, lacquered against tarnish and fingerprints | "Harbor & Pine CPA" cut by hand with a burin from the identity studio's drawing of the firm's name (a roman in the manner of Lora 600, the ampersand italic, "CPA" in small capitals as 3.5 sets credentials), one line, cap height 14 mm, centred between the screws, letters filled with black wax and wiped flush | Cut on film (C11), then fitted beside the door for C1 |
| **B. The blank** | As A | none | C3, C4, and the base for engraving a typed name |
| **C. Northgate Payroll** | Brushed 304 stainless steel, same size and shape as A | "NORTHGATE PAYROLL" in geometric capitals from the identity studio's drawing of its wordmark, cap height 12 mm, black-filled | C2 |
| **D. The mark** | Brass, 120 mm wide, the Name Plate of 3.2 | "Co" from the lettering artist's drawing | Scanned at 2,400 dpi for tracing the mark's vector (3.2) |
| Spare | One more blank in brass | none | A second take on film; a back-up for B |

**The shape is the mark's** (3.2): every plate is cut to the Name Plate's 40 × 16 proportion
(300 × 120 mm), its four corners chamfered at 45° with an 18.75 mm leg, a 1.5 mm bevel round the
face (the light catching it is the mark's bevel line), and two 4 mm slotted round-head screws on
the centre line, 33.75 mm in from each end, their slots set level. So the plate in every photograph
is the plate in the logo.

#### 7.6.2 The engraving of a typed name

The one piece of real-time rendering on the site (D1): when a visitor types their firm's name at
the Close or at sign-up, it is cut into the photographed blank plate (C3, or C4 in dark mode) so it
looks like the engraver did it.

- **Lettering.** The name as typed, in Miller Display Roman (CoFile's engraver's roman; these are
  CoFile's own pages), never changed in case: "you don't change a person's name to fit a style"
  (Hal). The ampersand in Miller Display Italic and credentials ("CPA", "CPAs", "LLC", "LLP", "PC",
  "PLLC", "& Co.") in small capitals, as 3.5 typesets a firm's name.
- **Fitting.** Inside the plate's safe area (between the screws, x from 7 to 33 units and y from 3.5
  to 12.5 units on the 40 × 16 grid). One line at a reference cap height of 14 mm on the 300 mm
  plate (4.7% of the plate's width) for as long as the name fits; then the size steps down to 70% of
  the reference; then the name breaks into two balanced lines, preferring a break before a credential
  or after "&", at 70% stepping down to 55%. Past two lines at 55% the plate is full: further letters
  are not cut, though the field keeps them. Nothing is ever truncated with an ellipsis on the plate.
- **The cut.** Text to a signed-distance field, then a height map with a V-groove profile (the
  section a burin leaves: 60° walls, a bright facet at the bottom), then a normal map, lit by the
  HDRI captured at the plate (C1's by day, C4's at dusk), and composited onto the photograph in
  exact registration. The groove fills with black, as the real plates are filled: impression, then
  ink.
- **Studio.** A creative-technology studio with WebGL and type-rendering experience (7.8).
- **Fallbacks, designed as finished pictures** (Hal): on devices without WebGL, under `deviceMemory`
  4, or in Save-Data mode, an SVG version (the text's alpha through `feSpecularLighting` and an
  inner shadow, with a black fill); without JavaScript, the blank plate and no field.
- **Words we won't engrave.** A short client-side list of offensive words: if the typed text matches
  one, the plate quietly stays as it was (Elaine). No message is shown.
- **Privacy.** The name lives only in that browser tab (`sessionStorage`) and is sent nowhere until
  the visitor submits sign-up (D3).

#### 7.6.3 C11 · The engraver: the film and its stills

Rosa's film structure, recast for the engraver (D1).

- **Who:** the hand engraver who makes the plates, paid as a craftsperson and credited
  `[copy needed]`. Their hands are the stars.
- **Crew:** a director-camera operator who shoots craft documentary (the stills photographer, if they
  shoot motion), a focus puller, the producer. The film is graded with the stills' LUT.
- **Where:** the engraver's own bench (day 1), then the Harbor & Pine door (day 2).
- **The shots, in order:** (1) extreme macro: the burin's point entering the brass; (2) the H cut,
  one curl of brass lifting off the graver; (3) the italic ampersand, in one sweep; (4) a time-lapse
  of the whole name, the plate turning on the engraver's ball vise; (5) black wax rubbed into the
  letters and wiped back so they stand out; (6) at the door, two screws turned until their slots
  are level (the fitter's care, and the mark's level screws); (7) pull back: the door and its plate
  in the late sun, which is C1's wide frame.
- **Cut for the site:** 12 seconds, silent, played once when it is 40% in view, holding its last
  frame (8.4 M11). Also a 30-second and a 60-second cut for sales and social, which may add
  Northgate's steel plate being cut.
- **Technical:** 6K at 24 fps, the macro shots at 48 fps for a little slow motion, the time-lapse
  at one frame every two seconds. Delivered as AV1 and H.264 MP4 at 1920 × 1080 and 1080 × 1350
  (phone), the site cut under 4 MB, with a poster still (the plate fitted beside the door) as AVIF.
  No speech, so no captions; a text description for screen readers `[copy needed]`.
- **Stills** from the same days: the engraver at the bench (side, three-quarter light), the burin
  and the curl of brass in macro, the finished plate on the bench. Used on For firms if section 10
  wants them and in press material.

### 7.7 Engraved vignettes

Line engravings in the steel-engraving manner of contemporary things (an engraving of a phone on a
bakery counter is a little funny and very memorable) (Hal 7.3). Used **only** on system pages,
empty states, the log-in side panel and emails (D1), never on the home page or the marketing
pages.

**Artist.** A line engraver or illustrator who works in the steel-engraving manner: swelling burin
lines, parallel hatching, cross-hatching for shadow, stipple for texture. Ideally they cut the
masters on copper; otherwise they draw at 4× with a pressure-sensitive line that truly swells. No
engraving filter, anywhere. Masters scanned at 2,400 dpi and vectorized by hand (Hal).

**Style rules.**

- One ink: Plate Ink on light grounds, Night Ink on dark, Graphite on a firm's pages (D1).
- Contemporary objects at their real proportions; no caricature, no allegory, no ornament, no eagles.
- A tight vignette that fades out in hatching, never boxed in a frame or a circle.
- Line weight from 0.6 to 2.4 px at 1×; nothing finer than 0.6 px. A simplified master for sizes of
  160 px and under, with no line under 1 px.
- Sizes: 120, 160, 240 and 360 px wide.
- Decorative: `alt=""` / `aria-hidden`, because the words beside each one carry the meaning.
- Delivered as optimized SVG under 80 KB each, light and dark, with a 2× PNG for email. The envelope
  (V3) has its flap as a separate SVG group, so the desk can open it (8.6 P3).

**The set.**

| # | Subject | Where it's used (beside the product's own words) |
|---|---|---|
| V1 | The blank Name Plate, engraved large, full bevel, slotted level screws | 404 ("Page not found"), at 360 px |
| V2 | A clear desk: blotter, closed laptop, a pen at rest, a cup | The filing desk's empty state ("Your desk is clear. Start a filing (it can be a free rehearsal), or send a client a link with your logo on it.") |
| V3 | A returned envelope, flap open, papers rising edge-on | A filing's Documents card when documents arrive; the filing detail page |
| V4 | An envelope on a doormat under a brass mail slot | "Check your email" and the other sent-a-link pages (confirm email, forgot and reset password) |
| V5 | A door with its name plate, seen from the step | The log-in side panel; "Confirm your email for CoFile" and the invitation email |
| V6 | A capped fountain pen lying on a signature line | Signatures: "No saved signatures yet." |
| V7 | A payment card face down on a desk, no brand, no numbers | Ready to pay: "Nothing is waiting for a card right now." |
| V8 | A phone lying on a bakery counter beside a rolling pin and a little flour | Requests from a text or email, when there are none yet (the product's own line) |
| V9 | A folded paper plane resting on a desk, not flying | Client links, when none have been sent (the product's own line) |
| V10 | A single blank sheet with one ruled line | CoFile's dashboard: "No keys created here yet."; webhooks, when there are none |
| V11 | An opened envelope lying empty | "This link has expired or isn't valid" (CoFile's page, and a firm's client-link page in Graphite under the firm's Letterhead) |

"Something went wrong" gets no vignette: a broken page shouldn't try to be charming (Hal).

### 7.8 What to commission

By kind of studio or artist, in the order the work depends on itself. Section 13 sets the schedule
and budget.

| # | Who | What | Depends on |
|---|---|---|---|
| 1 | **A lettering artist** in the engraver's Scotch roman tradition | The CoFile wordmark (two masters) and the "Co" of the Name Plate (3.2, 3.3) | — |
| 2 | **A small identity studio** | Harbor & Pine CPA, Northgate Payroll and Best Accounting as believable modest firms (3.8): logo files as the product accepts them (Harbor & Pine also as a JPEG on a white box), colors, preset font; the drawings of each name for its plate; Harbor & Pine's business card and letterhead artwork for the printer (C9); two spare firms for Branding and the docs `[copy needed: two more example firm names]` | — |
| 3 | **A hand engraver** | Plates A to D and a spare (7.6.1); appears in the film (C11) and fits the plates on set | 1 (for D), 2 (for A and C) |
| 4 | **A letterpress or engraving shop** | The location for C9, and printing Harbor & Pine's card and letterhead proofs on cotton stock | 2 |
| 5 | **One photographer and crew** (7.4.1) | C1 to C10; casting, locations, releases, retouching | 3, 4 |
| 6 | **A craft-film director-camera operator** (or the photographer, if they shoot motion) | C11 in 12, 30 and 60 second cuts, with stills | 3 |
| 7 | **A creative-technology studio** | The engraving (7.6.2) with its SVG fallback; the HDRI and light-pass capture on the door days; the light passes' compositing for M2; a review of the motion module against 8.9. No 3D studio is needed | 5 (the HDRIs and C3) |
| 8 | **A steel-engraving illustrator** | V1 to V11 | — |
| 9 | **A reprographic scanning studio** | C12 | — |
| 10 | **An icon designer** | The icon set of about 40 (D5), with the glyphs motion needs: replay, play and pause (8.7 U13, M11), drawn to sit with the plate's 45° chamfers | — |
| 11 | **A screen compositor** (often the retoucher) | Screens in C5, C8 and C10 from Playwright captures of the real components at 3× | 5, and the components |

### 7.9 Image treatment

**Corners, edges and frames.** Photographs are square-cut (`--r-0`), with no border, no frame, no
shadow and no rounded corners. They may bleed to one or both viewport edges (6.2). They are never
tilted, never in a Polaroid border, never cut out.

**Type never sits on a photograph.** Words go on Cotton beside or under it; at the Close they sit on
a Cotton panel (6.5). Captions sit under pictures.

**Composites.** Live sheets laid on a photograph (L2, L3, L5, L7) throw a shadow that agrees with
the photograph's light from the left, `--e-photo`:

```css
--e-photo: 1px 1px 2px rgba(29,33,48,.06), 6px 10px 24px -8px rgba(29,33,48,.22);
--e-photo-lift: 2px 2px 3px rgba(29,33,48,.07), 10px 18px 36px -12px rgba(29,33,48,.26);
```

On Night (L7, and every composite in dark mode) the shadow's color is `rgba(0,0,0,…)` at 1.6× the
alphas.

**Color.** Graded masters in Adobe RGB, 16-bit; site files in sRGB with the profile embedded, so the
firms' hexes and the brass agree with the CSS. The firm's color never tints a photograph (3.6).

**Dark mode.** Photographs take a fixed 4% darkening (`filter: brightness(.96)`), never an inversion,
tint or duotone (4.6). The Close and sign-up switch to C4.

**Files and sizes.** AVIF first, WebP second, JPEG last, at 640, 960, 1,280, 1,920 and 2,560 px
wide, with `sizes` set from the layout; each crop (7.4.4) is its own file. Every photograph below
the first screen loads lazily. The hero has no photograph, so the Largest Contentful Paint is the
h1 or the desk sheet, never an image (Amara).

| Photograph on the home page | Budget at 1440 (AVIF) |
|---|---|
| C1 and C2 medium, square | 60 KB each |
| C5 tight, 4:5 | 90 KB |
| C6 clean plate, 4:3 | 110 KB |
| C7 wide, 21:9 | 140 KB |
| C3 wide, 16:7 full bleed | 220 KB |
| Light-pass masters for C1 and C2 | 40 KB each |
| Team portraits, three at 56 px (2×) | 6 KB each |

**Placeholders.** While a photograph loads, its box shows a flat block of the photograph's mean
color, computed at build time. No blurred preview: blur reads as a glow (Greta).

**Never.** Black and white, duotones, color washes, gradients over photographs, darkened corners,
Ken Burns pans (the Close's 8-second push-in is the one camera move, M9), parallax, hover zooms.

### 7.10 Labels for examples

Every picture showing an example keeps its label, in the caption style (5.2: 14/20 Founders Grotesk
Text, Graphite, +0.5%), 12 px under the picture's lower-left corner, always visible, never inside
the picture, never a tooltip (all ten).

| Picture | Label |
|---|---|
| L1 The desk; L11 the previews; L12 the saved agent | "Example · test details · not a real firm" |
| L2 Two doors, one page | "Two example firms · same page, each in its own brand" |
| L3 From a text to a draft | "Ana Ortiz · text message · example", under the bubble |
| L4 The proof; L10 the letterhead proof | "Sample proof · test details · not a real business" |
| L5 The order comes home | "Example record · sample documents" |
| L7 The programme | "Rehearsal · nothing filed, nothing paid" |
| L6, L8 | None: the coverage and the prices are real |

**Photographs.** A photograph inside one of these pictures shares its label (the doors in L2, Ana in
L3, the desk in L5, the stage in L7). A photograph that stands alone and shows a cast person or an
example firm's name (C1's wide frame and the engraver film on For firms, C5's loose frame and C8 on
How it works, C9) carries one short caption marking it as an example `[copy needed: one line for
staged frames]` (Elaine's honesty rule; decisions file). Photographs with no person and no name
(C3, C4, C6's clean plate, C7) carry none. The team's photographs carry the person's name and role
`[copy needed]`, never "example", never a quote.

### 7.11 Alt text needed

Product pictures keep the stand-ins' accessible names (7.3.3); their text is real text. Everything
below needs words from the copy owner. The notes say what each must convey.

| Picture | Where | `[copy needed]`: what the alt text should say |
|---|---|---|
| C1 medium (in L2) | Home 2; For firms | Harbor & Pine CPA's office door with its engraved brass name plate |
| C2 medium (in L2) | Home 2; For firms | Northgate Payroll's glass door with its engraved steel plate |
| C1 wide | For firms | The same door and plate, from the street |
| C3 / C4 (L9) | Home 9; sign-up | A blank brass name plate beside an office door, waiting for a name; and an accessible description of the engraving, read once when a name is typed (D7) |
| C5 tight (in L3) | Home 3; How it works | A bakery owner at her counter at dawn, texting with flour on her hands |
| C5 loose | How it works | The same, wider, her sister behind her |
| C6 clean plate (in L5) | Home 5 | Decorative (`alt=""`): the live record carries the meaning |
| C6 envelope frame | How it works | An opened envelope addressed to the firm on a walnut desk |
| C6 flap-up frame | "Completed" emails | Decorative (`alt=""`) |
| C7 (in L7) | Home 7; What we file | An empty stage with a single ghost light, the seats empty |
| C8 | How it works; For firms | A firm owner at her desk reading the proof on her screen |
| C9 | How it works | Business card and letterhead proofs on a printer's table, marked OK in pencil |
| C10 portraits and frames | Home 1; How it works; Pricing; Questions; For firms | Each person's name and role, and what they are doing (D7) |
| C11 film | For firms | A text description of the film: an engraver cuts "Harbor & Pine CPA" into a brass plate and fits it beside the door (D7) |
| L11, L12, L13 | For firms; For platforms | Accessible names for the three added product pictures |
| V1 to V11 | System pages, empty states, emails | Decorative (`alt=""`) |

---

## 8. Motion

### 8.1 Principles

**One signature moment, one interactive moment, and quiet settles. Otherwise still** (D2). Print
doesn't slide or bounce: it arrives in two beats, the **impression** and then the **ink**, quickly
and once (Hal). The signature moment is the two doors (M2). The interactive moment is a visitor's
firm name being cut into the blank plate (M9, M10). Everything else that moves is a settle of 2.4 s
or less, plus the Requests explainer (3.4 s) and the engraver film (12 s, once).

The eight binding principles of D2, with what each means for the build:

1. **Words never wait.** Headlines, ledes, kickers, lists, prices and buttons are on the page at
   first paint and never animate. Only pictures move, and only their parts (Hal, Greta, Priya).
2. **Once per visit.** A picture plays the first time it is 40% in view, then rests in its final
   frame and never replays on scroll-back (Hal, Elaine). The visit is the browser tab's session: a
   picture is keyed by its id (L1 to L13 and the film), so L2, which appears on the home page and on
   For firms, plays once across both. Each moving picture has a replay control in its caption row
   (8.7 U13) (Hal, Marcus).
3. **Nothing scrolls the page for you.** No pinning, no scroll-scrubbed animation, no
   scroll-jacking, no parallax, no pointer tilt, no cursor effects, no smooth-scroll library. A
   picture may move inside itself (the two-door carousel on phones slides itself once, M2) (Greta,
   Hal).
4. **Nothing loops.** Not the film, not the ghost light, not a status. The only repeating motion on
   the site is the loading pulse and the wait mark (8.6 P4), and only while something is loading.
5. **Money never moves.** Prices, fees and totals appear complete and stay still: no counting up,
   no rolling digits, no "$45" dropping into place (Marcus, Hal, Elaine).
6. **Nothing celebrates a stop.** "Pay Now · held, on purpose" arrives exactly like every other
   line. Approval gets no stamp, confetti, tick burst or pulse (all ten).
7. **Short.** Each picture's choreography is done in 2.4 s or less; Requests may run 3.4 s and the
   two doors 4.2 s. The one slow move is the Close's 8-second push-in on the blank plate, a camera
   move with nothing else moving (Hal).
8. **Reduced motion shows the final picture.** With `prefers-reduced-motion: reduce`, every picture
   is in its final, fully composed state at first paint, the engraving of a typed name appears at
   once, the film doesn't autoplay and nothing fades. Nothing is lost but the timing: no information
   lives only in motion.

Four rules the build adds so the principles hold in practice:

- **One at a time** (Jun). Only one picture plays at once. If a second picture reaches 40% while one
  is playing, it waits and starts when the first ends; if it would wait longer than 600 ms, the
  first jumps to its final frame and the second starts.
- **Never half-built.** If a playing picture drops below 10% in view, or the tab is hidden, it jumps
  to its final frame. Nobody returns to a picture caught mid-sentence.
- **The final frame is the markup.** Each picture's default HTML is its final state, so a reader
  without JavaScript, a printer, a search engine and a screenshot all see it complete (Greta). The
  motion module sets a picture's "before" state only while the picture is out of view, or, for the
  hero, from a small inline script that runs before first paint, so nothing flashes.
- **Distances are short.** Nothing travels more than 40 px, with three exceptions the foundation's
  moments require: the page parting in two and each firm's name travelling from its plate to its
  letterhead (M2), and the documents rising out of the envelope (M5).

### 8.2 Tokens

The foundation's tokens (D2) are first; the rest are added by this part so every duration on the
site is named.

| Token | Value | Use |
|---|---|---|
| `--ease-press` | `cubic-bezier(.3, 0, .2, 1)` | The impression beat; a button going down; the cut of a letter (D2) |
| `--ease-settle` | `cubic-bezier(.2, .8, .2, 1)` | The ink beat; anything settling into place (D2) |
| `--ease-sweep` | `cubic-bezier(.45, 0, .25, 1)` | A light crossing a plate; rules, leaders and reveals drawing (D2) |
| `--ease-exit` | `cubic-bezier(.4, 0, 1, 1)`, 160 ms | Things leaving: menus, the phone bar, washes clearing (D2) |
| `--t-quick` | 120 ms | Hover color changes; underline thickening (D2) |
| `--t-press` | 180 ms | The impression beat (D2) |
| `--t-ink` | 260 ms | The ink beat (D2) |
| `--t-set` | 320 ms | A row or line setting into place (D2) |
| `--t-draw` | 600 ms | A rule or leader drawing (D2) |
| `--t-light` | 1,200 ms | A light raking across a plate; the ghost light coming up (D2) |
| `--stagger` | 70 to 120 ms | Between rows (D2): 70 for proof rows, 90 for desk rows, 120 for cues |
| `--t-down` / `--t-release` | 80 / 160 ms | A button pressed and released (D2's interface motion) |
| `--t-cut` | 90 ms | One letter cut into the plate |
| `--t-glint` | 60 ms | The glint at the bottom of a fresh cut |
| `--t-fill` | 120 ms | The black fill settling into a cut |
| `--t-uncut` | 60 ms | A deleted letter filling back in |
| `--t-fade` | 200 ms | Crossfades: chips, the header button, page changes, notices, the replay control |
| `--t-open` | 240 ms | Accordions; the phone menu sheet; the phone bar arriving |
| `--t-slow-fade` | 400 ms | The Imprint's one fade in M2; a slip sliding from under the proof |
| `--t-reveal` | 700 ms | A name inking in behind a left-to-right reveal (the burin pass); the page parting |
| `--t-travel` | 800 ms | A firm's name travelling from its plate to its letterhead |
| `--t-hold` | 1,200 ms | The pause before the phone carousel slides itself (M2) |
| `--t-pulse` | 1,600 ms | One cycle of the loading pulse |
| `--t-wash` | 2,000 ms | A row wash fading out (a changed status; an arrival at a Questions anchor) |
| `--t-push` | 8,000 ms | The Close's push-in |
| `--d-ink` | 2 px | The rise of content in the ink beat |
| `--d-bubble`, `--d-slip` | 12 px | Ana's bubble rising; the payment slip sliding out |
| `--d-proof`, `--d-deal` | 16 px | The hero's tucked proof sliding out; a sample card dealt |
| `--d-sheet` | 24 px | A sheet laid down (the proof) |
| `--d-max` | 40 px | The longest travel allowed, except the three moves in 8.1 |
| `--in-view` | 0.4 | The IntersectionObserver threshold that starts a picture |

```css
:root {
  --ease-press: cubic-bezier(.3,0,.2,1);   --ease-settle: cubic-bezier(.2,.8,.2,1);
  --ease-sweep: cubic-bezier(.45,0,.25,1); --ease-exit: cubic-bezier(.4,0,1,1);
  --t-quick: 120ms; --t-press: 180ms; --t-ink: 260ms; --t-set: 320ms; --t-draw: 600ms;
  --t-light: 1200ms; --t-down: 80ms; --t-release: 160ms; --t-cut: 90ms; --t-glint: 60ms;
  --t-fill: 120ms; --t-uncut: 60ms; --t-fade: 200ms; --t-open: 240ms; --t-slow-fade: 400ms;
  --t-reveal: 700ms; --t-travel: 800ms; --t-hold: 1200ms; --t-pulse: 1600ms;
  --t-wash: 2000ms; --t-push: 8000ms;
}
@media (prefers-reduced-motion: reduce) {
  :root { --t-press: 0ms; --t-ink: 0ms; --t-set: 0ms; --t-draw: 0ms; --t-light: 0ms;
          --t-cut: 0ms; --t-fill: 0ms; --t-reveal: 0ms; --t-travel: 0ms; --t-push: 0ms;
          --t-open: 0ms; --t-fade: 0ms; --t-slow-fade: 0ms; }
}
```

(Zeroing the tokens is a safety net; the motion module also skips every sequence under reduced
motion, so nothing even starts.)

### 8.3 The recipes

Every moment below is built from these few moves, so the site moves in one hand.

| Recipe | What happens | Properties |
|---|---|---|
| **press-in** (D2, Hal) | The element starts at opacity 0 with only its edge showing (a 1 px inset Rule, or the chip's or button's own border). Over `--t-press` with `--ease-press` the edge comes to full; then over `--t-ink` with `--ease-settle` the content goes 0 → 1 and rises `--d-ink` into place. 440 ms in all | `opacity`, `transform` |
| **draw** | A rule or a solid line grows from its start: `scaleX` 0 → 1 from the left (or `scaleY` from the top) over `--t-draw`, `--ease-sweep`. A dotted leader is drawn by a solid mask path revealed with `stroke-dashoffset` over the dotted line | `transform`, `stroke-dashoffset` |
| **reveal** (the burin pass) | Content appears left to right behind a moving edge: a wrapper with `overflow: hidden` slides from `translateX(-100%)` to 0 while its child slides from `translateX(100%)` to 0, so only the edge moves; a static 24 px gradient mask softens the leading edge. `--t-reveal`, `--ease-sweep` | `transform` |
| **set** | A row's content goes 0 → 1 and rises `--d-ink` over `--t-set`, `--ease-settle`; rows staggered | `opacity`, `transform` |
| **deal** | A card rises `--d-deal` and fades in over 400 ms, `--ease-settle` | `opacity`, `transform` |
| **lay** | A sheet rises `--d-sheet` into place and fades in over 600 ms, `--ease-settle`, its shadow growing from `--e-lift` to `--e-sheet` (two stacked shadow layers crossfading) | `opacity`, `transform` |
| **fade** | Plain opacity, no movement: `--t-fade` or `--t-slow-fade` | `opacity` |
| **light pass** | On a photographed plate: the base photograph, with the light-pass master (7.4.4, C1) above it inside a band 30% of the plate's width with soft 40% edges. The band is the reveal trick: a wrapper translates across the plate while its image counter-translates, so the highlight seems to cross the engraving. `--t-light`, `--ease-sweep`, left to right, once | `transform` |
| **cue** | On the run sheet: the pool of light (4.8's one gradient) moves to a line (`translateY`, 120 ms, `--ease-settle`) as the line takes its ink beat | `transform`, `opacity` |
| **cut** | One letter engraved (7.6.2): the groove deepens 0 → full over `--t-cut` with `--ease-press`; a `--t-glint` highlight at the bottom of the cut; then the black fill rises in over `--t-fill`, `--ease-settle`. Impression, then ink | shader uniforms, per letter |

### 8.4 The home page, moment by moment

The beta notice, the footer, every headline and lede and every list never move. The header and the
phone bar are interface (8.7 U7, U8).

---

#### M1 · Hero · The desk under its own name

*Lean on: Hal M1; Marcus for the clickable row.*

- **Trigger:** first paint, when the hero is in view at load (always on desktop and tablet). On
  phones the desk sits below the h1, sub, buttons and note, so it starts at 40% in view.
- **Before:** the desk sheet already in place with its frame and `--e-sheet`, so nothing jumps; the
  row hairlines, the caption and the Imprint (at the Letterhead row's right end, 3.4) present; the
  Firm Rule undrawn; the logo, name, "Filing desk", "Client filings", "New filing" and the four rows'
  content at 0; the proof behind in place 16 px short of its final offset.

| t (ms) | What moves |
|---|---|
| 120–720 | The Firm Rule's 3 px Harbor line draws left to right (draw) |
| 240–840 | Its 1 px Pine line follows, 120 ms behind (draw) |
| 300–1000 | The square logo, "Harbor & Pine CPA" and "Filing desk" ink in behind a left-to-right reveal, like a burin pass (reveal) |
| 760–1200 | "Client filings" (set) and "New filing" (press-in) |
| 1000–1590 | The four rows set top to bottom, 90 ms apart (set, `--t-set`). The first row's chip is held back; the others set with their rows |
| 1600–2040 | The first row's chip, "Proof ready to approve", presses in last (press-in: its `--firm-ink` border, then its lozenge and words) |
| 1600–2200 | As it does, the proof tucked behind slides 16 px further out to the right (`translateX`, 600 ms, `--ease-settle`), so the eye travels to it |
| 2200 | Rest. The replay control fades into the caption row (`--t-fade`) |

- **End state:** the complete desk, the proof 16 px further out. The Imprint never moved.
- **Interaction:** the Two Sisters Bakery row is the one link on the desk (to the proof section).
  Hover and focus give it `--firm-row` in `--t-quick` and the focus ring; the other rows are inert.
- **Reduced motion:** complete at first paint; no replay control.
- **Phone:** the product's phone desk layout (rows stacked: business, filing, chip); the proof behind
  is dropped, so the sequence ends at 2,040 ms.

---

#### M2 · Firms · Two doors, one page: the signature moment

*Lean on: Hal 8.3; Dev M2 and Priya for the split; Greta for two brands read at a glance.*

- **Trigger:** L2 40% in view, once per visit (shared with For firms).
- **Before:** both door photographs (C1 and C2, base pass) at rest. One **unbranded** client page
  centred over the gutter between the doors, overlapping both photographs' lower edges equally,
  with `--e-photo`: an empty Letterhead band at its final height, a 1 px Rule where the Firm Rule
  will be, "Start your New Jersey LLC" in Founders Grotesk Medium, the two labels and empty fields
  exactly as they will be, "Continue" as a 1 px Rule Strong outline with a Graphite label, and no
  Imprint. Both panels' grounds Cotton. The caption present. No wipe handle.

| t (ms) | Harbor & Pine CPA (left) | Northgate Payroll (right) |
|---|---|---|
| 0–300 | A 1 px Rule hairline draws down the middle of the one page, top to bottom (draw) | |
| 300–1000 | The page parts: two identical copies slide apart to their places under the doors (about 180 px each way at 1440, `--t-reveal`, `--ease-settle`); the hairline fades (200 ms) | |
| 800–2000 | Light pass across the brass plate, left to right | 1100–2300: light pass across the steel plate |
| 1500–2300 | **The name lifts:** "Harbor & Pine CPA" appears as ink over the engraved name (opacity 0 → 1 in its first 240 ms) and travels down to the page's Letterhead (`--t-travel`, `--ease-settle`), landing as the typeset name in Lora 600 | 1800–2600: Northgate's wordmark appears over its plate and travels to its Letterhead; no typeset name (the wide-logo rule, 3.5) |
| 2100–2500 | The square logo inks in beside the landed name (reveal, 400 ms) | — |
| 2300–3020 | The Firm Rule draws: 3 px Harbor, then 1 px Pine 120 ms behind | 2600–3320: 3 px Ember, then 1 px Ember at 35% |
| 2500–3300 | **The page inks:** the panel's ground crossfades from Cotton to `--firm-wash` (400 ms); the title crossfades from Founders Grotesk to Lora 600 (two stacked layers, 240 ms, from 2600); "Continue" fills with `--firm-fill` and its white label (press-in, from 2860) | 2800–3600: the same in Northgate's brand: ground to its `--firm-wash`, title to Montserrat 600 (from 2900), "Continue" in Ember (from 3160) |
| 3800–4200 | **"with CoFile" fades in at the foot of both pages at the same moment** (fade, `--t-slow-fade`, no movement). This is the one place the Imprint ever appears by fading: ours, in small type, last (Hal, Rosa, Priya) | |
| 4200 | Rest. The wipe handle fades in between the pages (`--t-fade`); the replay control appears | |

The fields and labels never move after the parting: inside each sheet they sit on exactly the same
pixels from the first frame to the last.

**The wipe** (Hal 8.3), on desktop and tablet, after the sequence:

- **The handle:** a 1 px Brass Line vertical line the height of the left page, at its right edge,
  with a plate-shaped grip centred on it (the Name Plate's outline, 32 × 13 px, one screw dot at its
  outer end) drawn in 1.5 px Brass Line on Sheet, inside a 48 × 48 px hit area. Outline only, never
  filled, so it is never a second Brass button on the screen.
- **Dragging** it left moves the line across the left page. To the right of the line, that page
  shows Northgate's brand (logo, font, Firm Rule, button, ground) on exactly the same bones; to the
  left, Harbor & Pine's. Nothing else moves a pixel: not a field, not a label, not the Imprint. On
  release it returns to the edge over 400 ms, `--ease-settle`.
- **Keyboard:** it is a `role="slider"` with an accessible name `[copy needed]`; Left and Right move
  it 10% of the page's width, Home and End to the ends; it stays where the keyboard leaves it.
- **Built from** two stacked brand layers inside the left page, with the reveal trick (8.3) on the
  upper one, so a drag moves only transforms.

- **End state:** both pages complete under their doors, the Imprint at both feet, the handle at
  rest.
- **Reduced motion:** both doors, both finished pages and both Imprints at first paint; the handle
  present and working, returning instantly on release.
- **Tablet:** as desktop.
- **Phone:** a two-card carousel (300 px cards, the next card's edge showing 24 px, CSS
  scroll-snap, dots under the caption). There is no parting: each card starts with its own
  unbranded page under its door.

| t (ms), phone | Card 1: Harbor & Pine, starting at 40% in view |
|---|---|
| 0–1200 | Light pass across the brass plate |
| 700–1500 | The name lifts to the Letterhead; 1200–1600 the logo inks in beside it |
| 1500–2220 | The Firm Rule draws |
| 1700–2500 | The page inks: ground, title font, "Continue" |
| 2800–3200 | "with CoFile" fades in at the foot |
| 3200–4400 | Hold (`--t-hold`) |
| 4400–5000 | The carousel slides itself once to card 2 (the carousel's own native smooth scroll, about 600 ms), where Northgate's page is already complete, its Imprint in the same place. After that it is under the thumb |

  If the visitor touches the carousel before 4,400 ms, or it leaves the screen, it doesn't slide
  itself, and anything unplayed jumps to its final frame. No wipe handle on phones: the swipe is the
  comparison.

---

#### M3 · Requests · Nobody retypes it

*Lean on: Hal M3; Elaine M4; Rosa's moment 3.*

- **Trigger:** L3 40% in view, once per visit (shared with How it works).
- **Before:** photograph C5 at rest; the bubble at 0, 12 px low; the draft sheet in place with its
  Letterhead, its head "Draft: New Jersey LLC formation" and its five labels; the three "from the
  text" values and tags at 0; the two saved values ("Your saved agent", "Your saved answers")
  already there in Graphite at 40%, without their tags, because they were already there; the "For
  your team to check" chip at its edge only. No underlines, highlights or leaders.

| t (ms) | What moves |
|---|---|
| 0–320 | Ana's bubble rises 12 px and fades in, with its line "Ana Ortiz · text message · example" (set, `--d-bubble`) |
| 720–1020 | (After a 400 ms pause.) "an LLC for the bakery" is underlined in 1.5 px Brass Line, left to right (draw, 300 ms), its Brass Tint highlight fading up with it |
| 1020–1520 | From the end of that underline, a dotted Brass Line leader draws along its elbow to the "Business name" row (draw, 500 ms, `--ease-settle`) |
| 1520–1780 | "TWO SISTERS BAKERY LLC" inks in on a Brass Tint highlight, with its "from the text" tag (ink beat) |
| 1170–1470 | "me and my sister, 50/50" is underlined |
| 1470–1970 | Its leader draws to "Members" |
| 1970–2230 | "Ana Ortiz, Lucia Ortiz (50/50)" inks in with its tag |
| 1620–1920 | "in Jersey City" is underlined |
| 1920–2420 | Its leader draws to "City" |
| 2420–2680 | "Jersey City, NJ" inks in with its tag. **At the same moment** the two saved rows ink together, from 40% Graphite to Plate Ink, with their "already filled" tags, and no leaders: they were already there (Hal, Elaine) |
| 2960–3400 | The "For your team to check" chip presses in last |
| 3400 | Rest; the replay control appears |

- **End state:** the bubble with its three underlined, highlighted phrases; the three leaders; the
  draft complete, the three values on their highlights. The highlights stay: they show where each
  word went.
- **Reduced motion:** complete at first paint.
- **Phone:** words; C5's 3:2 crop; the bubble on Cotton below it; one vertical dotted leader 48 px
  long; the draft full width with each tag under its value. The underlines play as on desktop
  (720–1920); the single leader drops at 1920–2420; the three values ink 90 ms apart from 2420; the
  saved rows ink at 2600; the chip presses in at 2960. Done at 3,400 ms.

---

#### M4 · The proof · One page, your button

*Lean on: Hal M4; Elaine M5 and her numbered callouts.*

- **Trigger:** L4 40% in view, once per visit.
- **Before:** the Cotton 2 band; the proof sheet at 0, 24 px low; the payment slip tucked fully
  under the sheet's foot (12 px short of its final place); the callouts at 0.

| t (ms) | What moves |
|---|---|
| 0–600 | The proof is laid down with its Letterhead, title and "Ready to approve" already printed on it (lay) |
| 400–860 | The three detail rows set, 70 ms apart (set); callout 1 presses in beside them |
| 760–1160 | The fee rows set and their dot leaders draw from each label to its amount (draw, 400 ms); callout 2 |
| 1060–1360 | The single 1 px rule above the total draws; "Total to the state $103.50" sets (ink beat) |
| 1200–1500 | The double rule under the amount draws (1 px, 2 px gap, 1 px) |
| 1160–1460 | "New Jersey's own review page, filled in" and its neutral frame fade in (fade, 300 ms); callout 3 |
| 1400–1840 | "Approve for filing" presses in, last; callout 4 with it. **It never pulses** |
| 1600–2000 | The payment slip slides 12 px out from under the sheet's foot (`--t-slow-fade`, `--ease-settle`); "Matches the proof" is simply there on it, with no motion of its own: it supports the proof, it isn't the show (Dev) |
| 2000 | Rest; the replay control appears |

- **End state:** the complete proof and slip.
- **Reduced motion:** complete at first paint.
- **Phone:** the sheet full width; callouts set inline at the start of their blocks (section 9);
  the slip sits under the sheet rather than behind it, so instead of sliding it fades in (`--t-fade`)
  at 1600.

---

#### M5 · After · The order comes home

*Lean on: Hal M5; Jun M6 (lift, arc, land; no bounce).*

- **Trigger:** L5 40% in view, once per visit.
- **Before:** photograph C6's clean plate at rest; the record card in place, its three stage labels
  present in Graphite and their marks as 1 px Rule outlines; the hairline between them undrawn; the
  envelope closed, the documents inside it.

| t (ms) | What moves |
|---|---|
| 0–440 | "Approved": its mark presses in to a Verdigris done glyph and its label inks to Plate Ink |
| 150–450 | The hairline to "Submitted" draws |
| 300–740 | "Submitted" presses in |
| 450–750 | The hairline to "Filed" draws |
| 600–1040 | "Filed" presses in: "an update at each stage" |
| 1000–1500 | The envelope's flap opens on its top hinge (`rotateX` 0 → −180° in a 900 px perspective, 500 ms, `--ease-settle`), showing its plain white inside |
| 1400–1720 | The New Jersey document card rises out of the envelope (320 ms, `--ease-settle`), lifting from `--e-photo` to `--e-photo-lift` |
| 1520–1840 | The IRS card follows, 120 ms behind |
| 1840–2400 | Both travel on a slight arc to the record and settle side by side (560 ms, `--ease-settle`), a 3° tilt easing to 0, their shadows landing back to `--e-photo`. No bounce |
| 2400 | Rest; the replay control appears |

- **End state:** the record with its three stages inked; the envelope open; the two document cards
  side by side on the record.
- **Reduced motion:** complete at first paint.
- **Phone:** C6's 4:5 crop with the record above the envelope; the same sequence, its travel scaled
  to the smaller picture.

---

#### M6 · Coverage · Cards dealt

*Lean on: Hal M6; Elaine's "facts shouldn't perform".*

- **Trigger:** L6 40% in view, once per visit.
- **Sequence:** the four cards are dealt left to right, New York first: each rises 16 px and fades
  in (deal, 400 ms), 80 ms apart. Done at 640 ms. **Nothing else moves**: no glyph fills, no hover
  inking. The headline, lede and legend are words, present from first paint.
- **End state:** the four cards and the legend.
- **Reduced motion:** complete at first paint.
- **Tablet:** two by two, dealt in reading order.
- **Phone:** one column; each card is dealt on its own as it reaches 40% in view, with no stagger.

---

#### M7 · Rehearsals · House lights down; the run is cued

*Lean on: Rosa's moment 7; Tomás M9; Marcus M8; Greta M6.*

- **Trigger:** L7 40% in view, once per visit (shared with What we file).
- **Before:** the band is dark from its first frame: no scroll-linked color change, ever (D3). The
  photograph C7 under a Night overlay at 30% (so it shows at 70% brightness); the run sheet in place
  with its Letterhead and header line; its seven lines at 0; the pool of light at 0 over the
  sheet's header.

| t (ms) | What moves |
|---|---|
| 0–1200 | The ghost light comes up: the overlay goes from 30% to 0 (`--t-light`, `--ease-sweep`), the photograph from 70% to 100%. The pool of light fades up over the sheet's header (400 ms) |
| 300–1280 | The seven lines are cued one by one, 120 ms apart: for each, the pool moves to the line (cue) as the line takes its ink beat. "Pay Now" · "held, on purpose" arrives like every other line, in the same color, at the same pace |
| 1300–2400 | The pool widens until it washes the whole sheet evenly (scale 1 → 2.4, 1,100 ms, `--ease-settle`), and rests there, so no line, the last least of all, is singled out |
| 2400 | Rest; the replay control appears |

- **End state:** the stage at full brightness; the run sheet complete in an even pool of warm light.
- **Reduced motion:** complete at first paint: photograph at 100%, the pool at its final, wide wash.
- **Dark mode:** the band deepens to `#0E1016`; the moment is the same.
- **Phone:** words; C7's 4:5 crop; the run sheet under it. The ghost light comes up when the
  photograph is 40% in view; the cues play when the sheet is 40% in view.

---

#### M8 · Pricing · The price card, still

Nothing moves. Not "$45", not the price card, not its leaders, not the two small lines under it. A
price that animates looks negotiable (Greta, Hal, Elaine, Marcus). There is no replay control.

---

#### M9 · Close · Your name on the plate: the interactive moment

*Lean on: Hal M8 and M9; Marcus M3; Elaine M2 and M10 for the carry-over.*

**The push-in.** When L9 is 40% in view, once per visit, the photograph (C3, or C4 in dark mode)
scales from 1.00 to 1.03 over `--t-push` (8 s), `--ease-settle`, its origin at the plate's centre.
Nothing else moves: an empty plate in good light, and the visitor supplies the name (Hal). The
engraving layer sits inside the same scaled wrapper, so typing during the push-in stays in
register. Reduced motion: no push-in. Phone: the same on the 4:5 crop.

**The field.** In the Cotton panel, above "Run a free rehearsal", one optional field, label
`[copy needed: its label]`, Founders Grotesk Text `input` 18 px in a 56 px field, full width of the
panel. It is hidden without JavaScript, since it only matters to the engraving and to sign-up.

**The engraving, as the visitor types** (7.6.2):

| Event | What happens |
|---|---|
| A letter typed | Input is debounced 30 ms; the name is fitted (7.6.2); the new letter is cut (`--t-cut`, `--ease-press`), glints at the bottom of the cut (`--t-glint`), then fills black (`--t-fill`, `--ease-settle`). About 270 ms a letter, overlapping when typing is fast; no backlog |
| A letter deleted | Its fill lifts and the groove closes (`--t-uncut`) |
| The fit changes (a smaller size or a line break) | The whole engraving crossfades from the old setting to the new over 160 ms: a re-cut, never a slide |
| A name pasted | It appears cut and filled at once with one 160 ms fade |
| Typing pauses for 800 ms | One light pass crosses the plate, left to right (`--t-light`), at most once every 4 seconds: the same light as the doors in M2 |
| The field emptied | The plate is blank again |

- **Carry-over:** the name lives only in that tab's `sessionStorage`, sent nowhere. "Run a free
  rehearsal" leads to sign-up, where "Firm name" is pre-filled from it (M10), and For firms' previews
  start with it (M12). It is never put in a URL.
- **Fallbacks:** the SVG version cuts each letter with a 90 ms fade and has no light pass; without
  WebGL or JavaScript, the blank plate (7.6.2).
- **Reduced motion:** each letter appears cut and filled at once; no glint, no light pass, no
  push-in.
- **Dark mode:** C4 (transom on), lit by the dusk HDRI.
- **Phone:** the photograph comes first at 4:5 and the panel under it, so the keyboard can hide
  the plate while the visitor types. While the field has focus and the plate is less than half in
  view, a 64 px tall live crop of the plate (the same render, cropped to the plate) opens directly
  above the field (height 0 → 64 px over `--t-open`; instant with reduced motion) and closes when
  focus leaves. The sticky phone bar is already away while a field has focus (6.7).
- **Accessibility:** the engraving is `aria-hidden`; the field is the real thing. The accessible
  description of the engraving is `[copy needed]` (D7).

### 8.5 The pages behind the home page, and the account pages

Page heads never move: kicker, h1, lede and any frontispiece are there at first paint (the one
moving frontispiece is the For firms film, M11). Each page's close section is still except its
button's interface motion. What moves on each page:

| Page | What moves | What stays still |
|---|---|---|
| **How it works** | M13 and M14 (the proof); M3 in "Clients don't always fill in forms. They text you." if L3 hasn't played this visit, otherwise L3 complete | The three steps and their photographs (C5, C8, C10); "Checks before every filing."; C6 in "The papers come back to you."; C9 |
| **For firms** | M11 (the film); M2 in "Your name on the door. Ours in small type." if L2 hasn't played this visit, then the handle glides to its parked place (below); M12 (the previews) | L1 in full (the desk is shown complete: the visitor has seen it set in the hero, and a second desk settling would spend the motion budget twice); L12; the close |
| **What we file** | M7 in "How a filing type goes live." if L7 hasn't played this visit | The coverage table and its chips; "State by state." |
| **Pricing** | Nothing | The plan cards, the prices, the team portraits, every list |
| **Security** | Nothing | Everything; it reads like a letter from a careful firm (Hal) |
| **Questions** | Accordions (U5); M15 | The portrait |
| **For platforms** | The inquiry form's sent state (U11) | L13; the code; the list |
| **Sign-up** | M10 | The rest of the form |
| **Log in, password, verification, check your email, invite expired** | Interface only (U1 to U12) | The vignettes; the cards |
| **Terms, Privacy, 404, "Something went wrong"** | Interface only | Everything |

---

#### M10 · Sign-up · It's already yours

*Lean on: Hal M9; Elaine; Tomás M12; Greta M8.*

- **On load:** if a name was carried from the Close, "Firm name" is pre-filled and the plate in the
  side panel (L9 on C3, or C4 in dark mode) shows it already engraved at first paint: no cutting
  replay. It's already yours. Otherwise the plate is blank.
- **Typing in "Firm name":** exactly as M9's table: each letter cut, glinted and filled; deletions
  fill back; a light pass after an 800 ms pause.
- **The letterhead preview** under the plate (section 10) typesets the name instantly with each
  keystroke, with no animation: typesetting is instant (Greta).
- **No push-in:** this is a form page, and nothing moves on its own.
- **Reduced motion:** letters appear cut at once; no glint, no light pass.
- **Phone:** the plate as a 16:9 strip above the form, cropped on the plate. "Firm name" is the
  first field, so the plate stays in view above it while the visitor types.

---

#### M11 · For firms · The engraver film

*Lean on: Rosa 7.4 for its structure; D1 C11.*

- **Trigger:** the film 40% in view (at the page head, usually at load), once per visit.
- **Play:** muted, `playsinline`, autoplays once, never loops, and holds its last frame (the plate
  fitted beside the door, which is also its poster). If it leaves the screen it pauses, and carries
  on from there when it returns.
- **Controls:** always shown, bottom left inside the frame, 16 px in: a 48 × 48 px Cotton tile at
  90% opacity with `--chamfer` corners and a 24 px Plate Ink glyph: pause while it plays, play when
  paused or before it starts, replay once it has ended. Accessible names `[copy needed: pause, play,
  replay]`. Space and Enter work it.
- **Reduced motion and Save-Data:** no autoplay; the poster with the play control.
- **Phone:** the 1080 × 1350 cut, the same behaviour.
- **Text description** for screen readers, and the engraver's credit: `[copy needed]` (D7).

---

#### M12 · For firms · Your brand, everywhere at once

*Lean on: Marcus M12; Dev's color dial; Priya's live dressing.*

- **Controls:** the product's own Setup fields, "Name your clients see" and "Main color" (the nine
  ready swatches of Branding), above the four previews of L11. They start with Harbor & Pine CPA,
  or with the name the visitor typed at the Close.
- **Typing a name:** it typesets instantly in all four Letterheads, each refitting by its own rules
  (3.5). No animation.
- **Choosing a color:** the ink match (3.6) runs, and the four previews re-ink in a same-document
  View Transition that crossfades each preview over `--t-fade` + 40 ms (240 ms), left to right,
  60 ms apart (Marcus). Everything changes by crossfade, so only opacity animates. The Imprint
  doesn't change in any of the four.
- **Reduced motion:** changes are instant.
- **Phone:** the controls first, then the previews stacked; a change applies to all four,
  including those out of view.

**L2 on For firms.** Shown complete with the wipe handle parked in the middle of the left page, so
both brands are visible in one sheet from the start (Hal 10.2). If L2 hasn't played this visit, M2
plays first and the handle then glides from the page's edge to its parked place (600 ms,
`--ease-settle`).

---

#### M13 · How it works · A letterhead proof becomes the proof

*Lean on: Marcus M10; C9 beside the lede.*

- **Trigger:** L10 40% in view, once per visit.
- **Before:** a Harbor & Pine letterhead proof lying on the page: its centred Letterhead, Rule bars
  for a letter's body, crop marks at its four corners, its Imprint at the foot (present, as always).

| t (ms) | What moves |
|---|---|
| 0–400 | The crop marks fade out |
| 200–600 | The letter's Rule bars fade out. **The Letterhead stays exactly where it is** |
| 400–840 | "Two Sisters Bakery LLC" sets and "Ready to approve" presses in |
| 500–960 | The three detail rows set, 70 ms apart |
| 800–1200 | The fee rows set; their dot leaders draw |
| 1100–1550 | The rule above the total draws, the total sets, the double rule under it draws |
| 1200–1500 | The review-page frame fades in |
| 1160–1600 | "Approve for filing" presses in, last |
| 1300–1600 | The payment slip slides 12 px out from under the foot |
| 1600 | Rest: the sheet is L4, the same proof as the home page's |

- **Reduced motion:** L4 complete at first paint.
- **Phone:** the same, the sheet full width.

---

#### M14 · How it works · Point to the proof

*Lean on: Marcus M11; Hal 10.1's mark-up in the margin.*

- **On desktop and tablet**, after M13: hovering or focusing one of the list items beside the proof
  washes the matching region of the proof in `--firm-tint` (fade, `--t-fade`) and draws a 1 px Brass
  Line leader from the item's lozenge to the region's edge (draw, 300 ms). The leader lies on the
  Cotton page between the list and the sheet: our mark-up in the margin; inside the sheet the only
  emphasis is the firm's own tint. Leaving clears both (`--ease-exit`, 160 ms). One at a time. On a
  touch screen, a tap on an item toggles it.
- **Which item points where:** "Every name, address and answer, in the order the state asks for
  them" to the detail rows; "Every fee in dollars and cents, from a verified fee table" to the fees
  and total; "Where the state's website allows it, a picture of the state's own review page, filled
  in" to the review-page frame; "One button. Until it's pressed, nothing is submitted and nothing is
  paid." to the button. "Each statement on the form, and who made it…" has no region in D4's sample
  proof, so it gets no leader unless sample statement text is supplied `[copy needed]` (Hal). The
  last item, the e-file comparison, is a closing remark and points nowhere.
- **Reduced motion:** the wash and the leader appear and clear instantly.
- **Phone:** no leaders and no hover: each item is followed by a static crop of its region (section
  10). Nothing here is tied to scrolling.

---

#### M15 · Questions · Arriving at an answer

- A link to an answer (`/faq#rehearsal`, `/faq#people` and the rest) opens that answer at once (no
  height animation on arrival), moves focus to its question, and gives its row a Brass Tint wash
  that fades out over `--t-wash` (Hal). It tells an older reader where they've landed.
- **Reduced motion:** the wash shows and clears after 2 s with no fade.

(What we file has no moment of its own: it reuses M7.)

### 8.6 The firm's pages and the apps

The firm's pages move very little. They are the firm's house, and approving a filing is serious
(Amara, Rosa). The Letterhead and the Imprint never move on any of them; page changes hold them
still (U9). On phones every moment below behaves exactly as on desktop: nothing is added and
nothing is taken away, because these pages are the product, not a picture of it.

#### P1 · The filing desk: a status changes while the desk is open

- The old chip fades out (120 ms); the new one presses in (press-in, 440 ms).
- The row takes a wash of `--firm-row` that fades out over `--t-wash` (D2's "6% firm wash"): an
  update at each stage, made visible.
- Nothing else on the desk moves by itself. "Filing now" is a still chip, like every other.
- **Reduced motion:** the new chip at once; the wash shows and clears after 2 s with no fade.
- **Dark desk:** the wash is `--firm-ink-dark` at 12% over Night Card.

#### P2 · The filing desk: a new filing arrives

- The rows below make room by moving down one row height (`transform`, 240 ms, `--ease-settle`),
  then the new row presses in at its place with the same `--firm-row` wash fading over 2 s.
- **Reduced motion:** the row is simply there, with the wash.

#### P3 · Documents arrive

- On the filing's page, the Documents card plays V3's envelope once: the flap opens (500 ms,
  `--ease-settle`) and the document rows press in under it, 90 ms apart. On the desk's list, the
  filing's chip changes as P1.
- **Reduced motion:** the open envelope and the rows at once.

#### P4 · Loading and waiting (the desk, the dashboard, client pages)

- **Loading rows** are blank sheets at their final size, pulsing between 60% and 100% opacity over
  `--t-pulse` (1.6 s), ease in and out, for as long as they load. No shimmer, no sweep (Hal).
- **A pending button** holds its pressed state (U1) and shows the product's pending label
  ("Sending…", "Saving…", "Confirming…") in place of its label.
- **The wait mark**, only once a wait passes 3 seconds: a 16 px ring (1.5 px Rule) with a 90° arc
  in Plate Ink (or `--firm-ink` on a firm's page) turning once every 1.2 s, linear, beside the
  pending label.
- **Reduced motion:** loading rows hold at 80% without pulsing; the wait mark shows its ring and
  arc without turning.

#### P5 · The proof page, and the decision

- **No entrance theatrics** (D2). The proof is on the page at first paint, sheet and all. Nothing on
  it moves as the firm reads.
- **"Approve, and authorize submission and payment"** debosses on press (U1) and holds that state
  while the request goes. "Request changes" behaves the same.
- **The decision page** ("Approval recorded", and its siblings) arrives as a page change (U9) with
  the Letterhead held still; its heading presses in and a Firm Rule (3 px `--firm`, 2 px gap, 1 px
  `--firm-2`) draws under it (draw, `--t-draw`), like the rule under a signature (Hal). Nothing
  else: no stamp, no confetti, no tick.
- **Reduced motion:** the decision page complete, its rule drawn.

#### P6 · The client's pages (the intake form, client link pages, the firm's filing pages)

- **Sections** open and close with an accordion's 240 ms height ease (U5).
- **"Same as"** fills its fields at once, and each filled field takes a 200 ms flash of
  `--firm-tint` fading to nothing, so the client sees what was filled for them (Amara).
- **Errors** appear instantly: the field's border, the message under it, the error summary at the
  top, which takes focus. Never a shake, never a slide.
- **Steps**, where a form has them, change by a 200 ms crossfade with the Letterhead held still
  (U9).
- **Submit** behaves as P4. The page after it arrives like the decision page: its heading presses
  in; nothing else.
- **Reduced motion:** instant everywhere.

#### P7 · The signature pad

- The stroke draws under the pen or finger in Signature Ink `#26336A`, live, with no smoothing
  animation beyond the pen's own path. Clearing fades the stroke out over 160 ms (`--ease-exit`).

#### P8 · Branding setup

- **Live dressing** (Priya, Marcus): the preview (the miniature Letterhead, client form, button,
  proof head and email of 3.6) re-inks with a same-document View Transition crossfade of 240 ms when
  the firm picks a color, uploads a logo or changes the font. A name typed in "Name your clients
  see" typesets at once.
- **Logo processing:** the upload is shown as the firm sent it and, beside it, as it will appear
  (trimmed, sized, on its plate if it needs one, 3.5); the processed version crossfades in over
  400 ms once it's ready.
- **The ink match:** a deepened button color appears beside the original at once, with its line of
  explanation `[copy needed]` (3.6).
- **Reduced motion:** instant.

#### P9 · The embed widget

- Interface motion only (U1 to U5), and step changes by a 200 ms crossfade. It respects the host
  page's `prefers-reduced-motion`. "Filed with CoFile" never moves.

#### P10 · CoFile's platform dashboard and the API docs

- Stat numbers never count up (principle 5). Status chips and new rows as P1 and P2, with Ochre for
  "your turn" (4.3) and Brass Tint for the row wash.
- Docs: a copy button swaps its glyph to a done mark instantly and back after 1.2 s; no morph. Code
  tabs switch instantly. Anchors in the docs' navigation scroll as U15.

#### P11 · Emails

Nothing moves in any email: no animated GIFs, no video, no animated images, ever.

### 8.7 Interface motion, everywhere

Color changes on hover and press (buttons, links, chips) are the one place a color animates rather
than an opacity; they are 200 ms or less, on small elements. Phones behave as desktop unless a row
says otherwise; hover effects have a focus or tap equivalent, or are decoration only.

| # | Element | Motion | Reduced motion |
|---|---|---|---|
| U1 | **Buttons** (D2) | Press: down 1 px over `--t-down` with a 1 px inset shadow, like a key into paper; release over `--t-release`, `--ease-settle`. Hover: fill to Brass Deep on CoFile's pages, or the firm's fill 8% deeper on a firm's, in `--t-quick`. A pending button holds its pressed state (P4). No ripples, no glow, no scale, no light band crossing it | Fill changes only; no movement |
| U2 | **Links** | The underline thickens 1 → 2 px and turns from Brass Line to Plate Ink (on firm pages it stays `--firm-ink`) in `--t-quick` | The same, instantly |
| U3 | **Focus** | The focus ring (D5) appears instantly, never animated, so a keyboard user never waits | — |
| U4 | **Chips** | A changed chip crossfades over `--t-fade`; in the pictures, chips press in | Instant |
| U5 | **Accordions** (Questions, client form sections, "Progress on the state site") | Height opens and closes over `--t-open` with `--ease-settle` (`interpolate-size: allow-keywords` and a transition on `::details-content`); the marker's fill crossfades in `--t-quick`. No chevron spin | Instant |
| U6 | **Menus and popovers; the phone menu sheet** | Open: opacity 0 → 1 and 8 px down to place over `--t-open`, `--ease-settle`. Close: `--ease-exit`, 160 ms. The full-height phone menu sheet opens the same way; the page behind doesn't scroll; focus is held in the sheet | Instant |
| U7 | **The header** (6.7) | After 120 px of scroll it compacts from 76 to 60 px over `--t-fade`: the bar translates up 16 px while its contents translate down 8 px and the lockup scales from 28 to 24 px, so only transforms move; the 1 px Rule along its foot fades in. Its "Run a free rehearsal" is an outline button while another Brass button is in view (the hero's, a page's close, the Close) and crossfades to Brass over `--t-fade` once it has scrolled away (4.8) | Instant switches |
| U8 | **The sticky phone bar** (6.7) | Once the hero's button has scrolled away, it slides up from below (`translateY` 100% → 0, `--t-open`, `--ease-settle`); it slides away (`--ease-exit`, 160 ms) while the Close's button is on screen, in For platforms' form, and whenever a field has focus. A legally needed consent notice takes its place the same way (6.7) | Appears and disappears at once |
| U9 | **Page changes** | Cross-document View Transitions: the header lockup and, on a firm's pages, the Letterhead carry a `view-transition-name`, so they stay perfectly still while the content crossfades over `--t-fade` (Hal, Priya). Nothing slides in | No transition |
| U10 | **The two-door carousel** (phones) | Native CSS scroll-snap and momentum; the dots follow; tapping a dot scrolls to its card with the browser's smooth scroll. It slides itself once (M2) | Taps jump at once; no self-slide |
| U11 | **Forms** | Fields change border and focus ring instantly; errors appear instantly (P6); the sent state of For platforms' inquiry form crossfades the fields out and the confirmation in, 200 ms each | Instant |
| U12 | **Notices** | Appear in place with a `--t-fade` opacity fade; content below them moves without animation. They stay until dismissed or the page changes: no timers, because older readers read at their own pace (Greta) | Instant |
| U13 | **The replay control** | A 24 px replay glyph in a 48 × 48 px hit area at the right end of a moving picture's caption row, Graphite, appearing over `--t-fade` once the picture has played. Pressing it returns the picture to its "before" state at once and plays it through; it is disabled while playing. Accessible name `[copy needed]` (D7). Not shown with reduced motion, or on pictures that don't move | Not shown |
| U14 | **Theme change** (system or the manual override) | Instant. No crossfade between light and night stock | — |
| U15 | **In-page anchors** (the hero's waiting row, Terms and Privacy contents, the docs) | A user-chosen anchor scrolls with the browser's native smooth scroll, and its heading takes focus. Nothing ever scrolls on its own | Jumps at once |

### 8.8 What never moves

- Headlines, kickers, ledes, body text, lists and their lozenges, captions and example labels,
  footnotes, the security line.
- Prices, fees, totals and "$45", anywhere; the price card; the plan cards.
- The mark, the wordmark, the lockup (beyond the header's compaction), the favicon.
- The Imprint, everywhere, with its one exception: its fade in at the end of M2.
- The Letterhead and the Firm Rule on every live firm page (the decision page's rule under its
  heading is a new rule, P5).
- Buttons' labels; the button in the proof picture after it presses in (it never pulses).
- Photographs, except the ghost light coming up (M7), the light passes on the plates (M2, M9,
  M10), the Close's push-in (M9) and the film (M11).
- The proof page; the client's pages beyond P6; every email; the beta notice; the footer.
- Status chips and coverage glyphs, except at the moment they change.
- Focus rings.

**And nothing on the site ever:** loops, pulses for attention, shakes, bounces, springs past its
mark, counts up, rolls digits, spins (beyond the wait mark), parallaxes, pins, scrubs with the
scroll, tilts with the pointer, trails the cursor, shows typing dots, plays sound, vibrates, or
celebrates.

### 8.9 Build, budget and testing

- **One shared motion module** of about 12 KB (gzip) on the Web Animations API and CSS
  transitions, started by IntersectionObserver at `--in-view` (0.4). No animation library, no
  Lottie, no video for interface (D2). Each moving picture is one React component with a `reduced`
  state equal to its final markup, and a timeline declared as data (the tables above), a few
  kilobytes each; none adds more than 40 KB of script.
- **Only `transform`, `opacity` and SVG `stroke-dashoffset` animate** in pictures, plus the small
  interface color changes in 8.7. `will-change` is set only while a picture plays and removed after.
  The target: 60 fps on a three-year-old mid-range phone, each frame's motion work under 4 ms.
- **Once-per-visit keys** in `sessionStorage` (`cofile.played`), by picture id. The queue (8.1)
  lives in the module.
- **The engraving** is hand-written WebGL2 (no 3D engine, so it stays inside the 40 KB budget): a
  small SDF generator for the typed text, the groove and lighting shaders, and a prefiltered HDRI
  (about 60 KB as an asset). It loads only when the Close or sign-up is within one screen, on
  devices reporting `deviceMemory` ≥ 4 and not in Save-Data mode; everyone else gets the SVG version
  (7.6.2) (D2).
- **The light passes** are two images per plate (the base photograph and its light-pass master,
  7.9's budgets) and the transform-only band of 8.3. No video, no WebGL.
- **The film** is the one video: AV1 with an H.264 fallback, under 4 MB, `preload="none"` until the
  film is within one screen, the poster AVIF loaded first.
- **Reduced motion** is read live: if it turns on mid-visit, every picture jumps to its final frame,
  the film pauses and the push-in resets to 1.00.
- **Forced colors** (Windows High Contrast): every picture is shown final; the pool of light, the
  Brass Tint highlights and the light passes are hidden; underlines and rules take system colors.
- **Print:** final states; the film's poster; the Close's plate blank.
- **Tests:** a Playwright snapshot of every picture's final state, in light and dark, desktop and
  phone, which is also its reduced-motion state; a timeline test asserting each picture's total
  duration against this section (2.4 s, 3.4 s, 4.2 s) and that no headline, lede, price or button
  label is ever animated; a check that no viewport holds two Brass buttons during U7's crossfade;
  and sessions with real readers over 60 on real phones, watching for anyone who loses their place
  (Hal).

---

## `[copy needed]` raised by this part

Items already listed by the foundation (D7) are marked "(D7)"; the rest are new here.

| Where | What |
|---|---|
| Every photograph (C1 to C11) | Alt text, as 7.11 describes each (D7) |
| The team (C10) | Each person's name and role, for alt text and for the captions on How it works, Pricing and Questions (D7) |
| Staged photographs that stand alone (C1 wide and the film on For firms; C5 loose and C8 on How it works; C9) | One short caption marking them as examples (D7) |
| The Close (M9) | The optional field's label; an accessible description of the engraving (D7) |
| Moving pictures | The replay control's accessible name (D7) |
| Home 2 and For firms (M2) | The wipe handle's accessible name (D7) |
| The engraver film (M11) | The engraver's credit; a text description for screen readers (D7); **new:** accessible names for the film's pause, play and replay control |
| For firms (L11, L12) and For platforms (L13) | **New:** accessible names for the three added product pictures; L13's figure caption |
| How it works (M14) | **New:** sample statement text for the proof, if "Each statement on the form, and who made it…" is to point at a region; otherwise it has no leader |
| Branding setup (P8) | One line explaining a deepened button color (D7, from 3.6) |
| Example firms (7.8) | Two more example firm names for Branding and the docs (D7) |
