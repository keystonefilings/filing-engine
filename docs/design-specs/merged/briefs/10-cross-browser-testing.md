# Cross-browser and real-device testing: brief

Weeks are counted from the start of our build (week 1).

## Who we are

CoFile (cofile.app) is a filing service for accounting, payroll, fractional-CFO and title firms.
Firms use it to file state business filings for their clients, such as LLC formations, payroll
registrations and EINs, under the firm's own brand. A firm works in CoFile's filing desk. Its
clients see only pages in the firm's own name, logo and colors, mostly on their phones.

## What we need

Our build is checked automatically in Chromium, the engine behind Chrome and Edge. Every page is
checked at phone, tablet and desktop sizes, in light and dark mode. We need the same pages checked
in the browsers our build environment doesn't have: Safari on macOS and iOS, Firefox, Chrome on a
real Android phone, and Edge on Windows.

There are two ways to do this:

- **A subscription** to a cross-browser and real-device testing service, with automation that our
  build agent can drive. The build agent is Claude, an AI model that works in our code.
- **The owner's own iPhone and Mac**, used with a checklist. This covers Safari only.

[owner to confirm: a subscription, the owner's own devices, or both].

## Scope

### Browsers and devices

| Browser | Device | Why it matters |
|---|---|---|
| Safari | iPhone | Where a firm's client usually opens their form, and where firm owners often read the proof (the page where a firm approves each filing) |
| Safari | iPad | Our tablet layout (834 px) |
| Safari | Mac | Many firm owners use one |
| Firefox | Windows and Mac | A different engine. It handles some of the newer CSS features below differently |
| Chrome | A mid-range Android phone | Our performance budget is set on a mid-range Android phone on 4G |
| Edge | Windows | Windows High Contrast (forced colors) and the NVDA screen reader |

**Versions:** the current version of each browser and the one before it.
[owner to confirm: how many older versions to support].

**Screen widths:**

- phones at 320, 360, 390 and 430 px;
- tablet at 834 px;
- laptop at 1024 to 1279 px;
- desktop at 1280 and 1440 px.

### Pages and states

**The proof.** It is rendered by our filing engine and must work with no JavaScript.

- Ready to approve, as a rehearsal (a practice run, where nothing is filed), with the one-time code
  field, and with the "What should change?" box.
- Approval recorded, changes requested, link expired, already decided, link not valid, decision
  couldn't be recorded, code didn't match, and the page shown when the engine fails.
- The state's review picture and its full-screen viewer, with zoom by mouse wheel and by pinch.
- Print, on Letter and A4 paper.
- The white-label version, in a software platform's brand.

**Client pages** (in the firm's brand).

- The firm's page for each filing, the client link page and the intake form, including:
  - error messages;
  - repeating groups (members, signers);
  - "Same as" copying;
  - folded sections;
  - the signature pad, used with a finger, a stylus and a mouse;
  - file upload;
  - the sent state;
  - the "link can't be used" states.
- In the three fictional example firms' brands (Harbor & Pine CPA, Northgate Payroll, Best
  Accounting), and in the hard test cases: a yellow brand color, a pale pink one, a white logo, a
  script font, a 40-character name and a Spanish name with accents.
- Dark mode. The page around the white sheet goes dark, and the sheet stays white.
- With JavaScript off.

**The website widget.** It is tested on a test host page:

- in a 640 px container, in a 320 px container, and at its 300 px minimum width;
- on a white host page and on a tinted one;
- as the frame resizes after sending, and as it scrolls back into view.

**The white-label hosted page.**

**The filing desk** (in CoFile's look), every page:

- Filings, with its "Sent by" column and five-step track, and the empty desk with its live
  miniature of the firm's client page;
- New filing: choosing a state and a type, then the form, with its section rail and the answers
  filled in for the firm;
- Filing detail and its timeline;
- Client links;
- Requests from a text or an email;
- Signatures;
- Ready to pay;
- Billing;
- Setup and Your firm;
- Branding, including:
  - logo upload and processing;
  - the color picker;
  - the font list, with each font shown in its own face;
  - font upload;
  - the live previews and the swap between them;
  - on phones, the preview strip and the preview carousel;
- Payment;
- Registered agents;
- The email-domain step;
- Password, signed out, and the error pages.

Also check the desktop navigation row, the phone menu sheet and dark mode.

**The public site:**

- the home page's nine sections, plus:
  - the header as it compacts;
  - the beta notice;
  - the sticky bar on phones;
  - the menu sheet;
  - the footer and its theme switch;
- the two-doors moment and its drag handle, and on phones the two-card swipe;
- the engraving: a visitor types their firm's name at the end of the home page, and it carries over
  to sign-up;
- How it works;
- For firms, with its short film and its live brand previews;
- What we file;
- Pricing, with one price card whose four columns line up;
- Security;
- Questions;
- For platforms;
- the account pages: sign-up, check your email, log in, forgot and reset password, confirm email,
  and invitations;
- Terms and Privacy, with a contents rail that sticks at 1280 px and wider, and their print
  versions;
- page not found, and something went wrong.

**The dashboard and API documentation.** Code blocks scroll inside themselves, including by
keyboard. Check the copy buttons.

**States for every page:**

- light mode, dark mode, and the footer's manual theme switch (with no flash of the wrong theme on
  load);
- reduced motion;
- larger text, 200% zoom, and 400% zoom (which reflows to the phone layout);
- increased contrast, and Windows High Contrast in Edge;
- keyboard only;
- JavaScript off (the proof and client pages work fully, and the home page's pictures show their
  final frame);
- our Spanish test language, which makes every string about 35% longer.

### Features to check in each browser

These are the newer or less even features the design uses, with what we expect where a browser
doesn't support them.

| Feature | Where it's used | What to check |
|---|---|---|
| `corner-shape: bevel` | Buttons, chips, logo plates, monogram tiles | 45° cut corners where supported. Elsewhere, the `@supports` fallback: a small rounded corner (3 px, or 2 px on small parts), never square and never broken |
| Cross-document View Transitions | Page changes on the site, the desk and the dashboard, and the proof's move to its decision page | The header or letterhead holds still while the content crossfades in 200 ms. Where unsupported, an ordinary page change with nothing broken. None with reduced motion, and none inside the widget |
| Same-document View Transitions | Swapping the Branding previews | A crossfade, or an instant swap |
| Container queries | The widget | Sizes follow the frame's width, not the screen's |
| CSS subgrid | The Pricing page's price card | Rows line up across all four columns |
| `text-wrap: balance` and `text-wrap: pretty` | Headlines, the business name on the proof, long firm names, introductory paragraphs | Balanced lines where supported. Normal wrapping elsewhere, with nothing clipped or truncated |
| `hyphens: auto` with `lang="es"` | Spanish body text only | Spanish body text hyphenates. Headlines, names, buttons and the proof's values never do |
| `color-mix()` | The focus halo on client-page fields | The halo is visible |
| Cascade layers (`@layer`) | All styles | Styles apply in the right order. A failure here would be obvious everywhere |
| Animated `details` (`interpolate-size: allow-keywords` and `::details-content`) | Accordions, folded form sections, "More options" | A smooth open where supported, an instant open elsewhere. The content is always reachable |
| `prefers-color-scheme`, plus a stored manual theme | Everywhere | The chosen theme shows on first paint. Sheets (the proof, client pages, previews, the widget, product pictures) stay white in dark mode |
| `prefers-reduced-motion` | Every moving picture and page change | Every picture shows its final frame. No page transitions run. The film doesn't autoplay |
| `prefers-contrast: more` | Everywhere | Hairlines get stronger, grey text darkens, tinted chips gain a border, and the paper texture turns off |
| `forced-colors: active` (Windows High Contrast) | Everywhere | Chips, notices and controls keep a real border. Glyphs follow the text color. The focus ring uses the system highlight. The dashed rehearsal outline survives. Textures and shadows drop away |
| `prefers-reduced-transparency` | Paper textures | The textures turn off |
| `hover: hover` and `pointer: coarse` | Hover styles, small buttons | Nothing sticks in a hover state on phones. Small buttons grow to 48 px on touch |
| `env(safe-area-inset-*)` | The sticky bar on phones, the footer, sheets | Nothing sits under the iPhone's home indicator or notch |
| Self-hosted WOFF2 web fonts, with `font-display: swap` and fallback rules using `size-adjust`, `ascent-override` and `descent-override` | Everywhere | No visible jump when the fonts arrive (layout shift under 0.02). Accented letters render |
| Firm fonts loaded at run time (ten preset web fonts, or a font file the firm uploaded) | Client pages and previews of them | They load at the matched size, and fall back cleanly where a letter is missing or the font fails to load |
| OpenType figures and features (tabular lining figures, small capitals, case-sensitive forms) | Fees, totals, the price card, names | Figures line up on the decimal point |
| WebGL2 | The engraving at the end of the home page and on sign-up | Which version of the engraving each browser gets, and whether the letters cut as the visitor types |
| SVG `feSpecularLighting` filter | The engraving's second version | The cut letters render. The plate never shows blank while a name is typed |
| Device-memory and data-saver hints | Choosing the engraving's version, and whether the film may autoplay | Not every browser reports these. Check which version and behavior Safari and Firefox get. [owner to confirm: the version of the engraving those browsers should get] |
| Web Animations API and `IntersectionObserver` | Every moving picture | Each picture plays once when 40% in view, then rests in its final frame. The replay control works |
| `sessionStorage` and `localStorage` | The typed firm name carried into sign-up, play-once memory, the theme choice | They work. In private browsing, nothing breaks |
| Video: AV1 with an H.264 fallback, `playsinline`, a poster image and a WebVTT text description | The film on For firms | It plays inline on iPhone. Browsers without AV1 get the H.264 file. The poster shows first. The pause control works |
| Images: AVIF, then WebP, then JPEG through `<picture>`, with a crop for each screen size | Photographs | The right crop and format, with no broken images |
| Canvas | Logo processing at upload, and the signature pad | A logo is trimmed and read the same way in every browser. Strokes follow a finger, a stylus and a mouse, with pressure where the device reports it |
| Form inputs | All forms | 18 px text, so iOS never zooms in. `inputmode` and `autocomplete` work: the one-time code from an SMS on iPhone, postal code, address, organization, email and phone. Also the system color picker, file inputs, and dragging a logo onto the drop area |
| Sticky positioning | The header, the desk's navigation row, the form's section rail, the Terms contents rail, the Branding preview panel and the phone preview strip, and the sticky bar on phones | Each part sticks and releases correctly. Sticky parts never cover a focused field. The sticky bar on phones hides while the keyboard is up |
| Scroll snap and native smooth scrolling | The two-door swipe on phones, the Branding preview carousel, in-page links with `scroll-margin-top` | Swipes snap to each card. In-page links land below the header |
| The widget's frame (`embed.js`) | Firms' own websites | The frame resizes to its content, with no scroll bar inside a scroll bar. Browsers' limits on storage inside third-party frames don't break it |
| Print: `@page` margin boxes and `break-inside: avoid` | The proof, its decision page, a filing's record, Terms and Privacy | Page numbers where supported. The fee table and its total never split across pages |
| Focus ring (`:focus-visible`, an outline with a white gap) | Every focusable element | Visible on every focusable element. It appears instantly |
| Link underlines (`text-underline-offset`, `text-decoration-skip-ink`) | All links | The underline sits 3 px below the text and thickens on hover |
| Fluid type with `clamp()` and `rem` | All text | Text scales with the reader's own text-size setting |

If the build adds other newer features (for example `:has()`), we will add them to this list before
the pass starts.

### Using the owner's own iPhone and Mac

**What it covers:** Safari on iOS and on macOS, plus Firefox on the Mac if it is installed.

**How it works:**

1. Claude sends a list of staging links, grouped into short sittings. Each link comes with what to
   look at and what "right" looks like.
2. Claude also sends the steps to switch the device's settings: dark mode, reduced motion, larger
   text, increased contrast and private browsing.
3. The owner opens each link and takes a screenshot, or a screen recording for anything that moves,
   adding a note where something looks wrong. [owner to confirm: how the screenshots come back to
   us].
4. Claude compares them with the Chromium screenshots, fixes what's wrong, and sends the changed
   links for a recheck.

**What it doesn't cover:**

- Firefox on Windows;
- Edge and Windows High Contrast;
- Chrome on Android;
- the NVDA screen reader;
- older iOS versions;
- other phone sizes.

A subscription, or other people's devices, would be needed for these.

## Standard or criteria

A browser passes when every page and state in the scope meets all of these:

1. **Nothing is broken:** no overlapping, clipped or hidden text, no missing element, and no sideways
   page scroll at any listed width.
2. **Every feature in the table works,** or shows the fallback the table names.
3. **The page matches our Chromium screenshots,** apart from normal differences in font rendering.
   A difference in layout, wrapping that hides content, color, or a missing part is a defect.
4. **The main tasks work by touch, mouse and keyboard:**
   - approve a proof, or request changes;
   - fill in and send a client form, including signing;
   - start a filing on the desk;
   - upload a logo and pick colors in Branding;
   - sign up, with the typed firm name carried over;
   - send the widget's form from a host page.
5. **Focus rings show** on every focusable element.
6. **With reduced motion,** every picture shows its final frame, no page transitions run, and the
   film doesn't autoplay.
7. **In dark mode,** sheets stay white, and the chosen theme shows on first paint without a flash.
8. **High contrast works.** Increased contrast and Windows High Contrast behave as the table says.
9. **The proof and client pages work fully with JavaScript off.**
10. **Fonts load without visible layout shift,** and accented letters show in every face.
11. **The home page is fast on Android.** On the mid-range Android phone over 4G, its largest paint is
    within 2.0 s, and interactions respond within 150 ms. This applies where the service can
    measure it.

**Severity:**

- **Blocker:** a person can't finish a task (approve, send the form, sign up, pay and file), or text
  is unreadable.
- **Major:** content is wrong, missing or overlapping, or a fallback doesn't appear.
- **Minor:** a cosmetic difference.

**Done** means no open blockers or majors in any listed browser, and every remaining minor is listed
and accepted by the owner.

## Deliverables

**From the service:** access to the browsers and devices above, automated runs, screenshots and
screen recordings.

**From each test pass:** a report for each browser, with:

- the pages and states checked;
- a pass or fail for each;
- captures;
- a defect list by severity;
- a recheck after the fixes.

## Timing

- **From week 2:** the proof and the client pages go live in the build's first phase (weeks 2 to 5),
  so testing starts then.
- **As each later phase ships:** the filing desk (weeks 4 to 8), the home page (weeks 5 to 9), the
  pages behind it (weeks 7 to 10), motion (weeks 10 to 13) and the platform pages (weeks 11 to 14).
- **Weeks 13 to 15:** the full pass, with cross-browser fixes, in the final passes before launch.

## What we provide

- Staging links.
- Test accounts set up as the fictional example firms.
- Fictional example data only.
- A test host page for the widget.
- Chromium baseline screenshots.
- A contact: [CoFile contact].

## Rights, privacy and consent

- Only fictional example data. No real firm, client or person appears on any page tested.
- Staging links stay private, behind a password or a secure tunnel.
- Screenshots and recordings stay private. The service must let us delete them.

## To quote

Ask each service for:

- the plan that covers the browsers and devices above;
- automation access;
- the number of parallel sessions and users;
- data retention terms;
- contract length and cancellation terms.

Then fill in the checklist below. No prices go here: put them in the quote.

| Requirement | Service A | Service B | Service C |
|---|---|---|---|
| Real iPhones with Safari, current and previous iOS | | | |
| Real iPads with Safari | | | |
| Safari on macOS, current and previous | | | |
| Firefox on Windows and Mac | | | |
| Chrome on real Android phones, including a mid-range model | | | |
| Edge on Windows, with Windows High Contrast available | | | |
| Automation through Playwright, our test tool | | | |
| Access to private staging (a secure tunnel) | | | |
| Screenshots and screen recordings | | | |
| Device settings: dark mode, reduced motion, larger text, increased contrast | | | |
| Network throttling (4G) and real-device performance measures | | | |
| Nice to have: screen readers on devices (VoiceOver, TalkBack, NVDA) | | | |
| Enough parallel sessions and users | | | |
| Data retention and deletion terms we accept | | | |
| Contract length and cancellation terms we accept | | | |

**Spec references:** 08-components-and-production.md 11.0, 12.1 to 12.6, 13.1 (testing, motion,
engraving, performance budgets), 13.2 (chamfer fallback), 13.5; 01-foundation.md 5.1, 6.4, 4.6, D2,
D5; 02-art-direction-and-motion.md (U5, U9, U10, the engraving, the film); 03-home-page-top.md 9.0,
9.2; 04-home-page-bottom.md 9.9; 05-public-pages.md 10A.4.2, 10A.9, 10A.15;
06-firm-pages-and-the-proof.md 10B.7, 10B.12, 10B.22 to 10B.28; 07-platforms-and-emails.md 10C.16,
10C.18, 10C.19; BUILD-PLAN.md list B, C.10.
