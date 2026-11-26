# Building the merged design: what Claude builds, and what to outsource

Nov 26, 2026. Based on the merged spec in this folder, with the owner's decisions applied
(`DECISIONS.md`), its asset list (13.3), its commissions (13.4) and its build order (13.5).

"Built" means really done: in the code in this repo, working in the product, covered by tests,
checked in a real browser (headless Chromium) at phone and desktop sizes in light and dark mode,
and pushed as reviewable changes. Nothing on list A is a mock-up or a half step.

## A. Claude builds it, completely

**Foundations**
1. **Design tokens as code**: `tokens.json` and the CSS, TypeScript and register files built from it
   (CoFile's look; the firm's branding on client pages; white label), light and dark.
2. **The ink match**: any firm color turned into contrast-safe button, link and tint colors (OKLCH),
   with a test that runs thousands of random colors through it. Also logo handling (light and white
   logos, logos on a white box, padding, sizing by visual weight), the firm-font fallback when
   letters are missing, and the yellow-versus-Ochre rule.
3. **Fonts wired up with metric-matched fallbacks**, so the licensed fonts drop in without anything
   moving. Until the licenses are bought, free stand-ins with matched metrics.
4. **The component library** (spec section 11), every component in every state, viewable in a
   component gallery (Storybook): buttons with the one-Brass-button check, links, fields and forms
   (paired fields, folded questions, "Same as", filled-in answers), the sheet, the Letterhead and
   Firm Rule (client pages only), the proof, chips and status, the stage track and "Sent by" cell,
   the timeline, tables, the price card, navigation and the phone menu sheet, notices, toasts, empty
   states, code blocks and the coverage tiles.

**Every page, rebuilt in the new look**

5. **The public site**: the home page's nine sections, the seven pages behind it (How it works, For
   firms, What we file, Pricing, Security, Questions, For platforms), sign-up, log-in, password and
   verification, invitations, Terms and Privacy with the sticky contents rail, 404 and errors.
6. **The filing desk**, every page, in CoFile's look: Filings with "Sent by" and the stage track
   (the first version is already live), New filing, filing detail with its timeline, Client links,
   requests from a text or email, Signatures, Ready to pay, Billing, and Setup including Branding
   with its three live client-page previews and a new "connect your email domain" step.
7. **The proof** (rendered by the engine) in CoFile's look, in every state, with the approve-button
   contrast fix that is already queued.
8. **The client pages** in the firm's brand, with nothing of CoFile on them: the client form,
   client link pages and the firm's page for each filing. This includes removing the "with CoFile"
   line the web app and the engine show today.
9. **The platform side**: the dashboard, the API docs (prose, reference, code blocks), the
   white-label hosted page and the embed widget.

**The pictures and the motion**

10. **Every picture made of the live product**, built from the real components, not drawn:
    - the hero's desk with the Harbor & Pine client page in front
    - the same client page under two firms
    - Ana's text becoming a draft
    - the sample proof, with its three points that light up their part of the proof
    - the filed record and the envelope
    - the coverage cards
    - the rehearsal run sheet
    - the price card
11. **The motion**: the two doors moment, the short settles, the wipe handle, replay controls, and
    the reduced-motion and phone versions of each.
12. **The typed-name engraving**, in a version that works on every device (SVG and canvas): the
    visitor's firm name engraves letter by letter and carries into sign-up.

**Emails**

13. **Every email**, rebuilt as templates: CoFile's letterhead for emails to the firm, the firm's
    letterhead for emails to its clients, plain-text versions and dark mode. Also the engine
    changes the decisions call for:
    - emails split by recipient
    - the firm's name as the sender on client emails, with replies going to the firm
    - sending from the firm's own domain once it connects one
    - the EIN-only email as a fallback

**Graphics Claude can draw to the spec's grid**

14. **About 40 icons and every glyph** (status, plate stages, ghost light, arrows) as SVG on the
    24, 16 and 12 px grids.
15. **The example firms' logos**: Harbor & Pine, Northgate Payroll, Best Accounting and two spares,
    as SVG. These are fictional firms, so simple, well-made marks are enough. Also the QA gallery
    of difficult test logos.
16. **Interim brand marks**, so nothing waits on the lettering artist: the Name Plate drawn from the
    spec's construction, an interim wordmark, the favicon and app icons. All of them are swapped for
    the final art in one change later.
17. **Generated assets**: social and link-preview images rendered for every page at build time, and
    print stylesheets for the proof, a filing's record and the legal pages.

**Checks on every page**

18. Automated accessibility checks (axe) and contrast tests. Screenshots of every page at phone and
    desktop sizes, light and dark, compared on every change. Performance budgets with Lighthouse.
    A pseudo-Spanish run that makes every string about 35% longer to catch layouts that break.

## B. Claude builds it now, but it's finished only when outside work arrives

Everything here is built and working with placeholders, then completed by swapping in the real
asset, with no layout work at that point.

| What | Built now with | Finished when this arrives |
|---|---|---|
| The photographs in the pictures (two doors, the blank plate, Ana, the papers, the stage, the team) | Exact crops, compositing and loading, on labeled placeholders | The photo shoot (C.4) |
| The engraver film on For firms | Player, poster frame, text description, controls | The film (C.5) |
| A photoreal brass engraving (WebGL) | The pipeline and shader; the SVG version on list A ships first | The engraved test plates and plate photographs (C.3, C.4) |
| The final wordmark and Name Plate | Interim marks (A.16) | The lettering artist (C.2) |
| Paper and card textures | A light generated texture | The scanned paper (C.7) |
| The engraved vignettes (empty desk, returned envelope and the rest) | Placeholder line drawings in the right sizes | The illustrator (C.6) |
| Miller and Founders Grotesk | Free stand-ins with matched metrics (A.3) | The licenses (C.1) |
| Engraving with Miller letters | Built on the stand-in | Miller license plus the foundry's written OK for this use |
| Emails tested in Outlook, Gmail and Apple Mail | Rendering checked in Chromium, built to email-safe rules | An email-testing service account (C.9) |
| Safari, iPhone and Firefox checks | Chromium checks at every size | A cross-browser testing account or your own devices (C.10) |

## C. Outsource: people, physical things, licenses

**Must buy or hire**

1. **Font licenses** (purchases):
   - Miller Display and Miller Text from Type Network.
   - Founders Grotesk from Klim. Its web license is priced by pageviews, so it must cover the
     high-volume client pages and the widget. Decision 7 has the free alternative if the price is
     too high.
2. **A lettering artist**: on hold. The owner supplied the drawn wordmarks, marks, favicons and the
   usage sheet (Nov 26).
3. **A hand engraver**: the real brass and steel plates (Harbor & Pine, Northgate, and the blank
   plate), plus test plates for the brass textures.
4. **A photographer and crew**: on hold. The owner supplied the photography for every frame except
   the team (Nov 26), and photographs of CoFile's people are deferred. The brief stays ready in case
   real shoots replace the supplied scenes later.
5. **A small film crew**: the 12-second film of the engraver at the bench.
6. **A steel-engraving illustrator**: on hold. The owner supplied the eleven vignettes (Nov 26).
7. **A scanning studio**: cotton paper and card scanned into seamless textures.
8. **A letterpress shop**: on hold. The photographs are supplied, and the owner's package has the
   press-ready proofs if real prints are ever wanted (Nov 26).
9. **An email-testing service** (subscription): real Outlook, Gmail and Apple Mail rendering. Claude
   can run the tests once there's an account.
10. **Cross-browser and real-device testing** (subscription, or your own iPhone and Mac): Safari and
    Firefox, which this environment doesn't have.
11. **An accessibility consultancy** with experience testing with older adults: an audit of the
    proof, the client form, the desk and the home page, with moderated sessions.
12. **Firm-owner research**: six to eight CPA, payroll, CFO or title firm owners see the desk and the
    client pages in their own logo and color before launch.
13. **A Spanish-speaking typographer**: a review of every page and email set in Spanish.

**Needed from you, not outsourced**

- **The words**: every `[copy needed]` item in `COPY-NEEDED.md` (alt text, control names, the email
  domain step, the EIN fallback email, and the rest), plus a yes on the new desk words ("Sent by",
  "Your client", the five steps).
- **Counsel**: the authorization text stays as confirmed. Terms and Privacy still await their
  review.
- **Access**: DNS for cofile.app's sending domain in Resend, and decisions on the subscriptions above.

**Optional: Claude can do these, a specialist would add polish**

- An icon designer (A.14)
- An identity studio for the example firms (A.15)
- A motion designer to review timing (A.11)
- A creative technologist to finish the photoreal engraving (B)
- An email developer (A.13)

## The order to build in

Each phase ships on its own, and every page sells before any motion is added.

| Phase | What Claude builds | Waits on |
|---|---|---|
| 0. Foundations | Tokens, ink match, fonts with stand-ins, base styles, core components | Nothing |
| 1. The proof and the client pages | The proof in every state; the client form, link pages and service pages in the firm's brand, with no "with CoFile" | Nothing |
| 2. The filing desk | Every desk page in CoFile's look, Branding previews, the email domain step | Nothing |
| 3. The home page, still | All nine sections and their product pictures, with photo placeholders | Nothing |
| 4. The pages behind it, and the account pages | The seven pages, sign-up and the rest, Terms and Privacy | Nothing |
| 5. Motion | The two doors moment, settles, the engraving (SVG), the wipe | Nothing |
| 6. Platforms and emails | Dashboard, docs, white label, widget, every email, and the engine's email changes | An email-testing account for the last check |
| 7. Craft lands | Photographs, film, vignettes, textures, final marks and fonts swapped in | C.1 to C.8 |
| 8. Final passes | Accessibility fixes from the audit, Spanish review fixes, cross-browser fixes, performance | C.10 to C.13 |

Phases 0 to 6 need nothing from outside, so they can start now, while the shoot, the lettering and
the licenses are commissioned in parallel.
