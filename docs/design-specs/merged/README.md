# The merged design for cofile.app: Plate & Proof

Merge round, Nov 26, 2026. The ten visual design specs in [`docs/design-specs/`](../README.md)
merged into **one direction**, for you to approve, with the choices only you can make listed in
[`DECISIONS.md`](DECISIONS.md). The copy, the marketing tone and the selling brand are the round 3
copy on the site, unchanged.

## The direction in one page

**The spine is Hal Brennan's "Plate & Proof": CoFile is the firm's stationer.** The copy already
speaks a stationer's language ("Your name on the door. Ours in small type.", the proof, the
letterhead), and its objects are things a proud firm owner has owned and approved. Jun's letterhead
on a desk and Elaine's editorial structure are folded in, and the rehearsal is the stage that Rosa,
Tomás and Amara drew.

- **The look.** Warm cotton paper, blue-black Plate Ink, big Scotch-roman headlines (Miller) and
  plain working text (Founders Grotesk). CoFile spends one metal, **Brass**, on the single "Run a
  free rehearsal" button on each screen, and never on a firm's pages.
- **The firm leads.** Every picture is the live product as a white sheet, headed by the firm's
  **Letterhead**: its logo, its font and the **Firm Rule** (a 3 px line in its main color, a 2 px
  gap, a 1 px line in its second color). "with CoFile" is a 13 px **Imprint** at the foot. An
  automatic ink match makes any firm's color, logo and font look right.
- **The mark** is a brass **Name Plate** with two level screws, carrying "Co"; firms' plates carry
  their names.
- **The pictures:** the live product (about two-thirds), set on real craft and documentary
  photography: two doors with hand-engraved plates, the same plate blank, Ana at the bakery, a
  ghost-lit stage for the rehearsal, and real photos of the team. No 3D, no stock, no illustrated
  people.
- **The two moments people will remember:** in Firms, **two doors, one page**: two engraved plates,
  and the same client page in each firm's brand with the Imprint unmoved; and at the Close, the
  visitor's own firm name **engraving into the blank plate** letter by letter, then carried into
  sign-up. Everything else settles once and stays still.
- **Three registers, one system:** CoFile's own pages (paper, Miller, Brass); the firm's pages (its
  letterhead, its colors in Brass's place, CoFile only as the Imprint); white label (the platform's
  letterhead only).

| Core palette | |
|---|---|
| Cotton (page) | `#FBFAF6` |
| Sheet (every firm page and product picture) | `#FFFFFF` |
| Plate Ink (text) | `#1D2130` |
| Graphite (secondary text, the Imprint) | `#555867` |
| Brass (the one button; Plate Ink text on it, 7.4:1) | `#D9A84A` |
| Night (dark mode, the rehearsal stage) | `#14161E` |
| Verdigris (done) · Ochre (attention) · Madder (problem) | `#2E6B57` · `#855A0C` · `#9A2D2D` |
| Example firms: Harbor & Pine (Harbor, Pine) · Northgate Payroll (Ember) | `#1D4E63`, `#2B5A47` · `#C2410C` |

Type: Miller Display and Miller Text (headlines, ledes, prices; CoFile's pages only), Founders
Grotesk and Founders Grotesk Text (everything else), Founders Grotesk Mono (values as they go to the
state, and code). A firm's own font sets its name and headings on its pages.

## The parts

| Part | Sections | Covers | Words |
|---|---|---|---|
| [1. The foundation](01-foundation.md) | 2 to 6 | The concept and the shop's objects, identity (the Name Plate, wordmark, Imprint, Letterhead and the firm theming rules), color, type, layout, and the direction every other part follows | 20,600 |
| [2. Art direction and motion](02-art-direction-and-motion.md) | 7, 8 | Every product picture, full shot lists for the photographs and the engraver film, the team portraits, vignettes; motion tokens and every moment, timed, with reduced-motion and phone versions | 20,000 |
| [3. The home page, top](03-home-page-top.md) | 9.0 to 9.4 | The page's rhythm, the beta notice and header, the hero desk, two doors one page, the text that becomes a draft, the proof | 15,100 |
| [4. The home page, bottom](04-home-page-bottom.md) | 9.5 to 9.10 | The papers come back, coverage, the rehearsal stage, "$45" and the price card, the Close with the engraving, the footer | 13,500 |
| [5. The public pages](05-public-pages.md) | 10A | How it works, For firms, What we file, Pricing, Security, Questions, For platforms, sign-up, log-in, password, verification, invitations, Terms, Privacy, errors | 19,300 |
| [6. The firm's pages and the proof](06-firm-pages-and-the-proof.md) | 10B | The filing desk and every page in it, Branding with live previews and worked examples (including an awkward brand), the proof in every state, service pages, the client form and link pages | 24,100 |
| [7. Platforms and emails](07-platforms-and-emails.md) | 10C, 10D | The dashboard, the API docs, white-label and embed, every email | 20,400 |
| [8. Components and production](08-components-and-production.md) | 11 to 14 | Every component and state, craft notes, tools and tokens as code, the asset list, 14 commissions, the build order in nine phases, what to strip from today | 20,100 |
| [Decisions for you](DECISIONS.md) | | 39 choices, with the options and what changes if you choose otherwise | 8,100 |
| [Words the design needs](COPY-NEEDED.md) | | Every `[copy needed]` item, and three slips found in the live copy | 2,500 |

Credits in parentheses, such as "(Hal)" or "(from Rosa and Tomás)", name the designer an idea
comes from.

## What it asks you to provide or commission

From section 13.4. Licensed, not commissioned: Miller and Founders Grotesk (Klim prices its web
license by pageviews, so it must be scoped to the firm and client pages before launch; decision 7
has the open-licensed alternative).

1. A lettering artist (the CoFile wordmark and the "Co" of the Name Plate)
2. A hand engraver (the example firms' plates and the blank plate)
3. A small identity studio (the example firms' identities and two spare firms)
4. One photographer and crew (every photograph, including real team portraits, with consent)
5. A small craft-film crew (the engraver at the bench)
6. A steel-engraving illustrator (about ten vignettes for system pages and empty states)
7. An icon designer (about 40 icons)
8. A scanning studio (paper and card textures)
9. A creative technologist (the WebGL engraving of a typed name, with fallbacks)
10. A motion designer, for direction only
11. An email developer
12. An accessibility consultancy with older-adult research experience
13. Firm-owner research (six to eight owners see it in their own logo and color)
14. A Spanish-speaking typographer

**Build order** (13.5): foundations, then the proof and the client's pages, then the filing desk,
then the home page (still), the pages behind it, the craft landing, motion, platforms, and a final
pass. Every page has to sell before any motion is added.

## How this was made

A lead merge writer read sections 2 to 6 of all ten specs, chose the spine and wrote the foundation
with its decisions. Seven writers then each took one area, read that area in all ten specs, and
wrote it on the foundation, leaning on the designers the foundation named for each area. The parts
were then put together here, checked for consistency (every color in parts 2 to 8 is the
foundation's, a worked example, or today's color quoted in "what to strip"), and their decisions
gathered into one list.

## Next

- **Choose.** Read the [decision table](DECISIONS.md#at-a-glance). Decisions 1 to 9 shape everything;
  the rest can be changed one at a time. Changing the spine (decision 1) would mean merging again
  around another designer's concept, most easily Elaine's Nameplate, the closest alternative.
- **Write the missing words.** [`COPY-NEEDED.md`](COPY-NEEDED.md) is the list for the copy owner.
- **Then build** in the order of 13.5, starting with the foundations and the proof.
