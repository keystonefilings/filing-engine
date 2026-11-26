# Accessibility audit and sessions with older adults: brief

Weeks are counted from the start of our build (week 1).

## Who we are

CoFile (cofile.app) is a filing service for accounting, payroll, fractional-CFO and title firms.
Firms use it to file state business filings for their clients, such as LLC formations, payroll
registrations and EINs, under the firm's own brand. We design for firm owners who are mostly 40 to 65.
Their clients are small-business owners who often fill in our forms on their phones, and some of
those clients prefer Spanish.

## What we need

We need an accessibility consultancy with experience testing with older adults. The work runs in two
rounds: once on our first build, and again before launch. Each round has two parts:

1. **An expert audit** against WCAG 2.2 AA and against our own stricter rules (below). It includes
   testing with screen readers.
2. **Moderated sessions with older adults,** on their own devices with their own settings:
   - eight firm owners over 55 (CPA, payroll, fractional-CFO or title firms);
   - four Spanish-speaking clients over 60 (small-business owners of the kind a firm files for),
     with their sessions in Spanish.

## Scope

### What to audit

**1. The proof.** This is the page a firm reads and approves before we file anything. Audit it in
every state:

- ready to approve, as a rehearsal (a practice run, where nothing is filed), and with a one-time
  code;
- requesting changes;
- approval recorded, and changes requested;
- link expired, already decided, link not valid, decision couldn't be recorded, and code didn't
  match.

Also audit the state's review picture and its full-screen viewer, the print version, the page with
JavaScript off, and the white-label version that software platforms use.

**2. The client form.** This covers the firm's page for each filing, the client link page and the
intake form they share, with all its parts:

- the error summary;
- required fields;
- repeating groups (members, signers);
- "Same as" copying;
- folded optional sections;
- the signature pad;
- the authorization statements;
- file upload;
- the sent state;
- the "link can't be used" states.

Also audit the website widget that firms embed on their own sites. Test all of these in the brands
of our three fictional example firms, plus one firm with a red-family color and one with a light
color, because firm colors change the buttons, links and focus rings.

**3. The filing desk.** This is the firm's daily workspace, in CoFile's look. Audit:

- the header, the navigation row, the phone menu sheet and the skip link;
- Filings, with its "Sent by" column and five-step track;
- the empty desk, with its live miniature of the firm's own client page;
- New filing, and the desk's form (with answers CoFile filled in marked on the field);
- filing detail and its timeline;
- Client links;
- requests from a text or an email;
- Signatures;
- Ready to pay (with its card security code field);
- Billing;
- Setup, including:
  - Branding: logo upload, the color fields and the line that explains a deepened color, the font
    list and the live previews with their swap control;
  - the step that connects the firm's email domain;
- dark mode.

**4. The home page.** Audit:

- its nine sections;
- the header (it compacts as you scroll, and its button turns gold);
- the sticky bar on phones, the menu sheet, and the footer with its theme switch;
- the product pictures. Each is a labelled figure. Most are inert, apart from two parts: a waiting
  row that links to the proof section, and three focusable points beside the sample proof. Each
  point outlines its part of the proof and has a spoken description;
- the motion and its replay controls;
- the "two doors" moment and its drag handle;
- the name field at the end of the page, which engraves the visitor's firm name into a brass plate
  and carries it into sign-up;
- the photographs' alt text.

### Assistive technology

- **Screen readers:** VoiceOver on iOS and macOS, NVDA on Windows, and TalkBack on Android. Audit the
  proof, the client form, the desk and the home page's pictures with each of them.
- **Browser zoom** at 200% and 400%, and each phone's own larger-text setting.
- **Windows High Contrast** (forced colors) and the system's increased-contrast setting.
- **Keyboard only.**

### Two rounds

- **Round 1, on the first build:** the proof and the client pages are built and live by then. Audit
  the proof and the client form (with the widget).
- **Round 2, before launch:** audit all four areas, and recheck the Round 1 fixes.

[owner to confirm: whether both rounds include all twelve sessions, or Round 1 has fewer].

## Standard or criteria

Test against WCAG 2.2 AA everywhere, and against our own rules, which are stricter in places.

**Contrast.**

- Body text is 12:1 or better.
- Our lightest text color is a grey (#555867). It must reach at least 6.2:1 on the darkest paper it
  sits on.
- Controls and field edges are at least 3:1, and our field-border color is 3.7:1 on white. A faint
  hairline is never the only edge of a control.
- Our gold (#D9A84A) is a button fill only, with dark text at 7.4:1. It is never used for text on
  paper.
- On client pages, each firm's colors are computed automatically, so that text, links and button
  labels reach at least 4.5:1, whatever color the firm chose.

**Text sizes.**

- Body text is 18 px on our own pages and on client pages, and 17 px on the desk.
- Text inside fields is 18 px.
- Nothing a person needs is under 14 px, and nothing longer than six words is under 15 px.
- **One exception, on purpose:** the desk's 13 px step line under each status label ("Proof, step 2
  of 5"). It repeats the status label above it, and screen readers read it aloud in full ("Step 2 of
  5: Proof"), so it is never the only place that information lives.

**Reading.**

- Weights are 400 and up only.
- Sentence case everywhere.
- Links are always underlined.
- Labels are always visible. A placeholder never stands in for a label.
- Paragraphs run 60 to 68 characters a line.
- No text sits on photographs.

**Zoom.**

- Sizes are in rem, so the reader's own text size scales everything.
- Layouts hold at 200% zoom, and reflow to the phone layout at 400% with nothing clipped.
- Nothing scrolls sideways, except code blocks, wide documentation tables and the two-door swipe.

**Focus.**

- Every focusable element gets the same ring: a 2 px outline, set 2 px off the element, with a 2 px
  white gap inside it.
- The ring is dark ink on our pages, and the firm's link color on client pages.
- It appears instantly, is never animated and is never removed.
- Fields show it on any focus.
- Focus moves to an error summary, a success heading or an opened sheet, and returns to the opener
  when a menu or sheet closes.

**Reduced motion.**

- With reduced motion set, every picture shows its final state, no page transitions run, and the
  short film doesn't autoplay.
- Nothing carries information only in motion.
- Nothing loops, and nothing scrolls the page for the reader.

**Screen-reader names and structure.**

- Every picture is a figure with an accessible name and a caption.
- Decorative glyphs are hidden, and their meaning is given in words.
- The desk's five-step track is a single image named, for example, "Step 2 of 5: Proof".
- There is one h1 per page, a legend on every fieldset, and header cells in every table.
- Error summaries are announced as alerts, and success messages as status updates.
- Pending buttons are marked busy. Required fields are marked required. Disabled controls say why
  in words nearby.
- Some accessible names are still being written: the replay controls, the drag handle, the menu
  button and the preview swap control. We will give you the final list before each round.

**Never color alone.**

- Every status has a glyph and words as well as a color. "Your turn" and "attention" share a color
  on the desk, and they differ by shape.
- Errors have a bar glyph and words. A firm whose brand color is red never has its button mistaken
  for an error.
- Rehearsals are always marked with a dashed outline and a small "ghost light" glyph.

**Touch targets.**

- Every target is at least 48 × 48 px, with 8 px between neighbours.
- Primary buttons are 56 px tall and full width on phones, and fields are 56 px on phones.
- The proof's approve button is 60 to 80 px tall, at the end of the page, and never sticky.
- Nothing depends on hover.

**Other rules.**

- The proof and every client page work fully without JavaScript.
- With increased contrast and Windows High Contrast, chips, notices and controls keep a real border.
- `lang` is set on every element whose language differs from the page's.

## Participants and sessions

**Firm owners (eight):**

- owners or partners of CPA, payroll, fractional-CFO or title firms, all over 55;
- a mix of the four firm types;
- using their own phone and computer, with their own text size and settings.

**Clients (four):**

- small-business owners over 60 who would be a firm's client, and who prefer Spanish;
- their sessions are moderated in Spanish, on their own phones, with their own settings.

**Everyday needs.** Include a mix: reading glasses, larger text settings, and some low vision or
unsteady hands. [owner to confirm: whether to recruit at least one participant who uses a screen
reader or a magnifier].

**Format.** [owner to confirm: remote or in person]. Please propose the session length.

**Tasks to propose around:**

- **Firm owners:** open a "proof is ready" email; read the proof; find the fees and the total;
  approve it or ask for changes. On the desk: find the filing that needs them, see who sent it and
  where it is up to, start a new filing, and send a client a link. On the home page: say what CoFile
  does and who it is for.
- **Clients:** open a client link on their own phone, fill in an LLC formation form, sign it, send
  it, and read the thank-you page.

Participants use fictional details that we supply, never their own Social Security number or real
business details.

## Deliverables

For each round:

1. **Findings ranked by severity:**
   - **Critical:** someone can't complete a task.
   - **Serious:** it is very hard, or a WCAG 2.2 AA failure on a main path.
   - **Moderate:** it causes difficulty.
   - **Minor:** polish.
2. **The detail for each finding:**
   - where it is (the page and state);
   - the steps to reproduce it;
   - who it affects;
   - the WCAG criterion or our own rule it breaks;
   - evidence (a screenshot or a clip);
   - a recommended fix our team can act on, marked as a code, design or wording fix.
3. **A short summary** of what works and what doesn't, for each of the four areas.
4. **Session notes and highlight clips,** where participants consented to recording.
5. **A read-out call** with the owner and the build team.
6. **In Round 2 only:** a recheck of every Round 1 finding, marked fixed or still open.

Please send findings in a table or spreadsheet that we can import into our issue list, as well as
in the report.

## Timing

- **Round 1:** when the first phase of the build is complete, at about week 5. The first phase runs
  from week 2 to week 5.
- **Round 2:** at the start of the final passes, in week 13, so that the fixes land before launch in
  weeks 14 and 15.

[owner to confirm: the exact dates of both rounds]. Please tell us how long after each round the
findings will arrive.

## What we provide

- Staging links, and test accounts set up as our fictional example firms.
- An example filing in each state of the proof.
- The fictional details participants enter.
- This brief's rules as the written standard.
- The final list of accessible names before each round.
- A contact: [CoFile contact].

## Rights, privacy and consent

- **Informed consent** from every participant, in their own language, before the session. Consent to
  recording is asked for separately.
- **Recordings** are used only to analyse the sessions, are shared only with our team, and are
  deleted after [owner to confirm: how long recordings are kept].
- **The report** identifies no participant by name.
- **No real data:** participants never enter real personal or business details.
- **Incentives:** [owner to confirm].
- **Ownership:** we own the report and the findings.

## To quote

Please send back:

1. The price for each round, split into the audit and the sessions.
2. How you recruit older adults and Spanish-speaking participants, and how you handle incentives.
3. Who moderates the sessions in English and in Spanish.
4. Your screen-reader coverage (VoiceOver, NVDA, TalkBack), and who on your team does it.
5. Your proposed session length and the timeline for each round.
6. A sample report, with personal details removed.
7. Your experience with older adults, and with forms or financial and legal products.

If you also run firm-owner research, we have a separate brief for six to eight sessions in week 6.
A combined quote is welcome.

**Spec references:** 08-components-and-production.md 11.0 (states), 12.2, 12.3, 12.5, 13.1 (testing
row), 13.4 (rows 12 and 13), 13.5; 01-foundation.md 4.2, 4.3, 4.4, 5.2, 5.3, 5.4, D2, D5;
06-firm-pages-and-the-proof.md 10B.1.3, 10B.12, 10B.22 to 10B.28; 03-home-page-top.md and
04-home-page-bottom.md (the nine sections); DECISIONS.md decisions 19, 27, 29, 32; BUILD-PLAN.md
C.11.
