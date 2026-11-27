# Brief: steel-engraving illustrator

**The job:** about ten small one-ink vignettes, in the steel-engraving manner but of contemporary
things, for empty states, system pages and two kinds of email.
**For:** a line engraver or illustrator who works in the steel-engraving manner: swelling burin
lines, parallel hatching, cross-hatching for shadow, stipple for texture.
**Contact:** [CoFile contact]

## 1. Who we are

CoFile (cofile.app) is a filing service. Accounting, payroll, fractional-CFO and title firms use it
to file state business filings for their clients (LLC formations, payroll registrations, EINs)
under the firm's own brand. We see ourselves as the firm's stationer, and our line for it is "Your
name on the door. Ours in small type." Our pictures are the real product and real photographs; your
engravings are the only illustrations on the site.

## 2. What we need

A set of small line engravings of ordinary, present-day things: a blank name plate, a clear desk, a
returned envelope, a phone on a bakery counter, a door left ajar. They sit beside a sentence on a
page that is empty or waiting ("No saved signatures yet."), on a few account and system pages, and
in two kinds of email. One ink only. Each is a tight vignette that fades out in its hatching, never boxed.
The charm is the old technique on a new subject: an engraving of a phone on a bakery counter is a
little funny and very memorable. An empty page should look like the nicest clear desk a firm owner
has seen, never a sad picture.

## 3. Deliverables

### 3.1 The set

Eight vignettes are placed on our pages now. Three more (V9 to V11) are in our art direction but
not yet on a page: please price them separately, as options [owner to confirm whether they are
drawn].

| # | Subject | Where it appears | Shown at |
|---|---|---|---|
| V1 | **The blank Name Plate**, engraved large: our mark's shape (a plate in 40 × 16 proportion, all four corners chamfered at 45°), its bevel catching the light, two slotted screws with their slots level, nothing on it | The 404 page ("Page not found"); the two welcome emails ("Your partner account is open", "Your CoFile account is ready"); our platform dashboard's firm list when it is empty | 404: 360 × 144 px (280 × 112 on phones). Emails: 160 × 64 px (128 × 52 on phones). Dashboard: 120 px wide |
| V2 | **A clear desk**: blotter, closed laptop, a pen at rest, a cup | The platform dashboard's "Ready to pay" list when empty: "Nothing is waiting for a card right now." | 120 px wide |
| V3 | **A returned envelope**, flap open, papers rising edge-on | The email that tells a firm its documents are back; a filing's documents card on the firm's filing desk, where the flap opens once | Email: 120 × 80 px (96 × 64 on phones). Desk: 160 px |
| V4 | **The letter at the door.** Our spec describes it two ways: (a) a plain envelope slipped halfway under a closed door, on the sill; or (b) an envelope on a doormat under a brass mail slot [owner to confirm which] | "Check your email", "Confirm your email", "Forgot password", "Reset password" | 120 px tall, above the page's card (96 px on phones) |
| V5 | **The door from the step**: a firm's front door seen from the pavement, a blank name plate beside it with two level screws, the door a hand's width ajar | The log-in page's side panel; the "You're not signed in to this filing desk" page; the expired invitation page ("This link has expired or isn't valid") | Log-in panel: 440 × 550 px (desktop only). Signed out: 160 px (120 on phones). Expired invitation: 120 px tall (96 on phones) |
| V6 | **A capped fountain pen** lying on a signature line on a blank sheet | The filing desk's Signatures page: "No saved signatures yet." | 120 px |
| V7 | **A payment card face down on a clear desk**, no brand, no numbers | The filing desk's Ready to pay page: "Nothing is waiting for a card right now." | 120 px |
| V8 | **A phone lying on a bakery counter** beside a rolling pin and a little flour; screen dark | The filing desk's requests from a text or email, when there are none yet | 160 px |
| V9 *(option)* | **A folded paper plane** resting on a desk, not flying | Client links, when none have been sent | 120 or 160 px |
| V10 *(option)* | **A single blank sheet with one ruled line** | The platform dashboard: "No keys created here yet."; no webhooks yet | 120 or 160 px |
| V11 *(option)* | **An opened envelope lying empty** | A link that has expired or isn't valid; on a firm's client page it is drawn in Graphite under the firm's letterhead | 120 or 160 px |

Keep the proportions the sizes give: V1 at the plate's 2.5 : 1, V3 at 3 : 2, V5's log-in panel at
4 : 5. There is deliberately no vignette on the "Something went wrong" page.

### 3.2 How each is drawn and delivered

1. **One ink.** No second color, tint, gradient or fill other than the ink.
2. **Line weight** from 0.6 to 2.4 px at the size shown; nothing finer than 0.6 px.
3. **Two masters per vignette:** a full master, drawn at 4× the largest size it is shown; and a
   simplified master for 160 px and under, with no line under 1 px. Check both at 120 and 160 px.
4. **Real swelling lines.** Ideally you cut the masters on copper, scan them at 2,400 dpi and
   vectorize by hand. Otherwise draw at 4× with a pressure-sensitive line that truly swells. No
   engraving filter, anywhere.
5. **SVG**, optimized, under 80 KB each, transparent background, the ink set as `currentColor`
   so the page colors it.
6. **V3's flap** as a separate SVG group, hinged on its top edge, so the desk can open it once.
7. **Light and dark.** Light: Plate Ink `#1D2130` on our Cotton page `#FBFAF6` and on white
   `#FFFFFF`. Dark: Night Ink `#ECE8DF` on Night `#14161E` and on Night Card `#1F2230`. On a page
   a firm's client sees (V11 only, if drawn): Graphite `#555867` on white.
8. **Email PNGs at 2×**, Plate Ink on white (emails stay white in dark mode): V1 at 320 × 128 px,
   V3 at 240 × 160 px.
9. **Your masters:** the 2,400 dpi scans (or your drawing files) and the hand-vectorized sources.
10. **Naming** (or propose your own at round 1): `v01-blank-plate.svg`, `v01-blank-plate-small.svg`,
    `v01-blank-plate-dark.svg` and `v01-blank-plate-small-dark.svg` if the dark version is redrawn,
    `v01-blank-plate-email@2x.png`; the same pattern for `v02-clear-desk`, `v03-returned-envelope`,
    `v04-letter-at-door`, `v05-door-from-step`, `v06-fountain-pen`, `v07-card-face-down`,
    `v08-phone-bakery-counter`, `v09-paper-plane`, `v10-ruled-sheet`, `v11-empty-envelope`.

**Questions for you:**

- Light lines on a dark ground can read as a negative. Does the dark version need its shading
  redrawn, or will the same drawing in Night Ink hold?
- Can every subject keep its detail under 80 KB? Tell us which can't.
- If you cut on copper, do the copper plates come to us or stay with you?

## 4. How it will be used

- **Only on quiet pages:** empty lists on the filing desk and the platform dashboard, the account
  pages (log in, check your email, password), the 404, and two kinds of email to firms. Never on
  the home page or the marketing pages, where the pictures are the live product and photographs.
- **Mostly small.** Most are seen at 120 to 160 px, above or beside one sentence, read at arm's
  length on a laptop or a phone, often by readers over 50. The simplified master carries these.
  The largest are the log-in panel (440 × 550 px) and the 404 (360 × 144 px).
- **Decorative.** The sentence beside each says the same thing, so screen readers skip the picture.
- **Emails:** V3 sits centred under the first paragraph of the "documents are back" email; V1 sits
  under the letterhead rule of the welcome emails. All of these emails go to the firm, on white.
- **Dark mode:** the desk, dashboard and account pages follow the reader's setting, so each
  vignette is also seen in Night Ink on near-black.

## 5. References and what to avoid

**References:** the steel-engraving manner (swelling burin lines, parallel hatching, cross-hatching
for shadow, stipple for texture), applied to contemporary objects at their real proportions.

**Never:**

- People, or any part of a person.
- Caricature, allegory, ornament, eagles.
- A frame, box or circle around a vignette.
- Anything official: seals, rosettes, medallions, stamps, ribbons, laurels, guilloche,
  microprinting, certificate frames, banknote vignettes, portraits in engraved ovals, flags, state
  outlines, capitol domes, columns, scales of justice, government buildings. Postage stamps and
  postmarks on envelopes. Papers stay edge-on, never legible as a state or IRS document.
- Padlocks, shields, check-mark badges, magnifiers over documents.
- Brands, logos, legible words or numbers, card numbers, a phone screen showing an app or message
  bubbles.
- Pastiche: parchment, Victorian ornament, copperplate script, blackletter.
- Stock, AI-generated images, engraving filters, 3D.

## 6. Rounds and acceptance

We suggest four rounds. Please quote on that basis and say what an extra round costs.

1. **Thumbnails** of every subject (V4 in both versions if we haven't chosen), showing composition
   and crop at the sizes in 3.1. We check subject, proportion and the "never" list.
2. **A pilot**, one vignette finished in both masters (we suggest V1, since it is also our mark's
   shape), placed on our pages at 120, 160 and 360 px, light and dark, and as the email PNG. This
   sets the line style for the set.
3. **The rest**, finished, in one or two batches.
4. **Final files**, named and sized.

At every round we check: one ink; line weights between 0.6 and 2.4 px at size, and no line under
1 px in the simplified master; it reads at 120 and 160 px; it fades out in hatching and is
unframed; real proportions; nothing on the "never" list; under 80 KB; V3's flap opens cleanly.

**Accepted** means every check passes, each vignette drops into its place on our pages in light and
dark mode with no changes, the email PNGs are crisp in our email templates, and [CoFile contact]
signs off in writing.

## 7. Timing

Week numbers count from the start of our programme (week 1). The calendar date of week 1 is
[owner to confirm].

- **Weeks 4 to 10**, your commission.
- **V1 and V3 first**, as their email PNGs feed our email templates, built in weeks 8 to 10.
- Your art replaces placeholder drawings in our weeks 8 to 12. Nothing in our build waits on you:
  the placeholders are already the right sizes.

**You depend on:** nothing to start. For V1 and V5 we send the Name Plate's construction; the
photographs of the real brass plates and doors come from our shoot in weeks 6 to 8, if you want
them for reference. **Who depends on you:** our email templates (V1 and V3) and the final swap in
our build.

## 8. Rights

- Copyright in the vignettes assigned to CoFile, including the right to resize, simplify and set
  them in our inks. If your terms differ, quote an exclusive, perpetual, worldwide license as an
  alternative.
- You may show the work in your portfolio after our launch.

## 9. What we provide

- The subject list, the sentence each sits beside, and its sizes (3.1).
- The colors above.
- The Name Plate's drawing instructions: the 40 × 16 grid, the 45° chamfers, the bevel, the two
  slotted screws.
- Screenshots of the placeholders in place, light and dark.
- Photographs of the real plates and doors, once shot.
- [CoFile contact] for questions and reviews.

## 10. To quote

Please send:

1. A price per vignette for V1 to V8, and for V9 to V11 as options, so the set can grow or shrink.
   Include the email PNGs, and say what an extra round costs.
2. Whether you cut on copper or draw, and any price difference between the two.
3. Your schedule against our weeks 4 to 10, with V1 and V3 first.
4. Samples of engraving or engraving-manner work, ideally of everyday objects at small sizes.
5. Your answers to the questions in 3.2, and your own questions.

---

Spec references (for CoFile's use): 01-foundation 2.6, 3.2, 3.9, 4.2, 4.6, D1 (kind 4);
02-art-direction-and-motion 7.1, 7.2, 7.7, 8.6 P3; 05-public-pages 10A.0.5, 10A.8, 10A.10–10A.14,
10A.16; 06-firm-pages-and-the-proof 10B.1.7, 10B.13, 10B.15, 10B.16, 10B.17, 10B.20; 07-platforms-and-emails 10C.6,
10C.7, 10D.7, 10D.15; 08-components-and-production 11.13, 13.3, 13.4; DECISIONS 28, 35; BUILD-PLAN C.6.
