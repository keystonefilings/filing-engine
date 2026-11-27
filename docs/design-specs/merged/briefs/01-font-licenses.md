# Font licenses: Miller (Type Network) and Founders Grotesk (Klim)

> **Settled (owner, Nov 26).** The owner holds the licenses, and the build keeps both families.

This file has three parts. There are two license requests, one for each foundry, and each is ready
to send once the bracketed items are filled in. A short internal note follows them, and it is not
for sending.

Weeks are counted from the start of our build (week 1).

---

## Request 1: to Type Network, for Miller Display and Miller Text

**Subject:** License request: Miller Display and Miller Text for cofile.app

### Who we are

CoFile (cofile.app) is a filing service for accounting, payroll, fractional-CFO and title firms.
Firms use it to file state business filings for their clients, such as LLC formations, payroll
registrations and EINs, under the firm's own brand. We are rebuilding our website and product in a
new design. Miller is its headline and reading serif.

### What we need

1. To know whether the Miller Text desktop files we already hold cover web use, and if they don't,
   what web license to add.
2. A quote for Miller Display, which we don't have.
3. Web licenses to self-host the styles listed below on our own pages.
4. Desktop licenses for the people who design those pages.
5. Written permission for three uses beyond ordinary web pages, described below.

### What we already hold

We hold six Miller Text desktop files in TrueType format: Roman, Italic, SemiBold, SemiBold Italic,
Bold and Bold Italic. Their copyright notice reads "(c) Carter & Cone Type, Inc. and The Font
Bureau, Inc." We don't have the license that came with them to hand:
[owner to supply: the license or invoice for these desktop files]. We hold no Miller Display files.

Please tell us:

- whether our existing license for these files covers web embedding (self-hosted WOFF2 files made
  from them), and if so, up to what pageview tier;
- if it doesn't, what web license we should add, covering the pages listed below;
- whether we should replace these files with your current release, and whether doing so would
  change the fonts' metrics or character set.

### Scope

**Styles we use.** There are six styles, plus the small capitals:

| Family | Style | Where we use it | Do we hold it? |
|---|---|---|---|
| Miller Display | Roman | Headlines, page titles, prices, the business name at the head of the page a firm approves, large numbers on our dashboard. Also the letters of the engraving effect described below | No: please quote |
| Miller Display | Italic | The italic ampersand in a firm name engraved on that plate, and italics at display sizes | No: please quote |
| Miller Display | Semibold | A temporary "CoFile" wordmark, used until our drawn wordmark is delivered, and nowhere else | No: please quote |
| Miller Text | Roman | Introductory paragraphs, subheads, long reading (Terms, Privacy, our API documentation) and the phone menu | Desktop only |
| Miller Text | Italic | One short line inside a home page headline, and run-in heads in our API documentation | Desktop only |
| Miller Text | Bold | Emphasis on our Terms of Service and Privacy Policy pages only | Desktop only |

We don't use Miller Text SemiBold, SemiBold Italic or Bold Italic on the web.

**Small capitals.** Credentials such as "CPA" and "LLC" in an engraved firm name are set in Miller's
small capitals. Please tell us whether small capitals are in the standard Miller Display fonts (as
an OpenType feature) or are sold separately.

**Characters.** We need Latin and Latin Extended-A, because we set Spanish text and client names such
as "Lucía", "Muñoz" and "Gonçalves".

**OpenType features we keep:** kerning, standard ligatures, tabular, lining and old-style figures,
case-sensitive forms, small capitals and fractions.

**Where Miller appears.** Miller is used only on pages in CoFile's own look, and all of them are
served from cofile.app.

| Surface | Address | Who reads it | Monthly pageviews |
|---|---|---|---|
| Our website | cofile.app: the home page, How it works, For firms, What we file, Pricing, Security, Questions, For platforms, sign-up, log-in and the other account pages, Terms, Privacy, and the error pages | Firm owners and staff | [owner to supply: monthly pageviews now, and expected at launch] |
| The filing desk | cofile.app/p/‹firm› and its pages | Each firm's staff, every working day | [owner to supply: monthly pageviews now, and expected at launch] |
| The proof (the page where a firm approves each filing) | Rendered by our filing engine, with the font files loaded from cofile.app [owner to confirm: the host name the proof page is served from, if it is not cofile.app] | The firm's approver, once or twice per filing | [owner to supply: monthly pageviews now, and expected at launch] |
| The dashboard and API documentation | cofile.app/dashboard, cofile.app/docs | Staff at software platforms that use our API, and developers | [owner to supply: monthly pageviews now, and expected at launch] |

**Where Miller never appears:**

- the pages a firm's clients see (the client form, client link pages and a firm's page for each
  filing);
- the white-label pages we host for software platforms;
- the website widget that firms embed on their own sites;
- every email. Our emails load no web fonts at all, and CoFile's email headlines use Georgia.

**Formats and hosting.**

- WOFF2 for the web, self-hosted on cofile.app. We don't load fonts from a third-party service.
- We subset the files ourselves to Latin and Latin Extended-A, keeping the features above, so our
  home page loads less than 160 KB of fonts in total.
- We generate fallback font rules from the fonts' metrics, so the page doesn't shift when Miller
  loads.
- Desktop fonts for design work.

**Desktop seats.** These are for our design team, plus one outside contractor: a lettering artist
who uses Miller Display as a reference while drawing our wordmark. They draw the wordmark and don't
trace it. [owner to supply: the number of people who need Miller installed]. Please tell us whether
contractors working for us may use our desktop license.

**App license.** We have no native app. The filing desk and the dashboard are web pages, which people
can add to a phone's home screen. [owner to confirm: whether to ask for an app license now].

### Uses that need your written permission

1. **An engraving effect.** On our home page and sign-up page, a visitor can type their firm's name
   and watch it engrave, letter by letter, into a photographed brass plate. The letters are Miller
   Display Roman. The ampersand is in Miller Display Italic, and credentials are in small capitals.
   To draw the letters in the browser, we build a glyph atlas from the font. The atlas is a texture
   image (PNG, about 70 KB) of signed distance fields, with a small data file of glyph positions,
   and it covers Latin and Latin Extended-A. It is served to browsers along with the page. Devices
   that can't run this version get a second one, which draws the same letters as SVG text using
   the web font. We need your written permission to build and serve the atlas.
2. **Link-preview images.** At build time we render a 1200 × 630 px image for each page, with that
   page's headline set in Miller. Social networks and messaging apps show these images when someone
   shares a link.
3. **A temporary wordmark.** Until our drawn wordmark arrives, "CoFile" will be set in Miller Display
   Semibold and converted to outlines. We will use it as an SVG logo in our header and footer, on
   link-preview images and as a PNG at the head of our emails.

**Please also confirm:** firms print the approval page, or save it as a PDF from their browser, to
keep in their client's file. That PDF carries the fonts the browser embeds.

### Deliverables

- WOFF2 web fonts and desktop fonts for the Miller Display styles above.
- A ruling on whether our Miller Text files are covered for the web, or WOFF2 and web terms for
  Roman, Italic and Bold.
- The license documents.
- Written permission for the three uses above.
- Confirmation of the character set, and of whether small capitals are included.

### Timing

- Desktop Miller Display: from week 1, for design work and the lettering artist.
- Written permission for the engraving atlas: by week 7, when the engraving is built.
- Web licenses: by week 8, when the licensed fonts replace our stand-ins. Launch is in weeks 13 to
  15.

Until then, our live pages use free stand-in fonts with matched metrics.

### What we provide

- The pageview figures above.
- The domain: cofile.app. [owner to confirm: any other host name that will serve the fonts].
- The number of desktop seats.
- [owner to supply: the license or invoice for these desktop files], for the Miller Text files we
  hold.
- A contact for questions: [CoFile contact].

### To quote

Please send back:

1. Whether our existing Miller Text license covers web use, and up to what tier.
2. The price of Miller Display Roman, Italic and Semibold, for desktop and for web, quoted per style.
3. The price of any web license we need to add for Miller Text Roman, Italic and Bold, quoted per
   style. We may drop Miller Text Bold or Miller Display Semibold.
4. How your web license is measured (by pageviews, by domain or otherwise), and what happens when we
   grow past a tier.
5. The price per desktop seat, and whether contractors may use our seats.
6. Your terms for the engraving atlas, the link-preview images and the temporary wordmark.
7. Whether the license is perpetual or renews, and any renewal cost.
8. Whether you supply WOFF2 files, and whether we may subset them.

---

## Request 2: to Klim Type Foundry, for Founders Grotesk

**Subject:** License request: Founders Grotesk, Founders Grotesk Text and Founders Grotesk Mono for
cofile.app

### Who we are

CoFile (cofile.app) is a filing service for accounting, payroll, fractional-CFO and title firms.
Firms use it to file state business filings for their clients, such as LLC formations, payroll
registrations and EINs, under the firm's own brand. We are rebuilding our website and product in a
new design. Founders Grotesk sets everything people read, fill in or press, on every page we serve.

### What we need

1. To know whether the Founders Grotesk desktop files we already hold cover web use, and if they
   don't, what web license to add.
2. A quote for Founders Grotesk Text and Founders Grotesk Mono, which we don't have.
3. A web license for the styles listed below, self-hosted and covering every surface listed. We
   understand your web licenses are priced by pageviews, so we list each surface on its own,
   including the high-volume ones.
4. Desktop licenses for our design team.
5. Confirmation that two uses are covered, described below.

### What we already hold

We hold Founders Grotesk desktop files in OpenType format, from 2010. Their copyright notice reads
"© 2010 Klim Type Foundry", and the files point to klim.co.nz/licensing.php. We hold these styles:

- Light, Regular, Medium, Semibold and Bold, each with its italic;
- Condensed Light, Extra Condensed Light and Extra Condensed Bold.

The terms we bought them under: [owner to supply: the license or invoice for these desktop files].
We hold no Founders Grotesk Text and no Founders Grotesk Mono.

Please tell us:

- whether our existing license covers web embedding (self-hosted WOFF2 files made from these
  files), and if so, up to what pageview tier;
- if it doesn't, what web license we should add, covering the surfaces listed below;
- whether the 2010 files include Latin Extended-A, and whether your current release differs in its
  metrics or character set, so we know whether to update.

### Scope

**Styles we use.** There are six styles, and none of them is italic:

| Family | Styles | Where we use it | Do we hold it? |
|---|---|---|---|
| Founders Grotesk Text | Regular, Medium | All reading and interface text at 20 px and below: body text, labels, fields, help text, tables, buttons, status labels, fees. It appears on every surface below, including every client page and the widget | No: please quote |
| Founders Grotesk | Regular, Medium | Larger text in our own look: section headings, totals, large buttons and short labels. On client pages it appears only in the cases described below | Desktop only (2010) |
| Founders Grotesk Mono | Regular, Medium | Values exactly as they go to the state, filing references, web addresses, API keys and code. Medium is for emphasis in code samples and for totals on drafts | No: please quote |

We don't use the Light, Semibold, Bold, condensed or italic styles we hold.

**Characters.** We need Latin and Latin Extended-A, because we set Spanish text and client names such
as "Lucía", "Muñoz" and "Gonçalves".

**OpenType features we keep:** kerning, standard ligatures, tabular and lining figures,
case-sensitive forms and fractions.

**How client pages use Founders Grotesk.** Pages that a firm's clients see are in the firm's brand,
not ours. On those pages the firm's own font sets only three things: its name, its page headings,
and its button labels when the firm chose one of our preset fonts. Founders Grotesk Text sets
everything else: the body text, labels, fields, help text and fees. That means Founders Grotesk Text
loads on every client page and inside the widget. Founders Grotesk Medium also loads on a client page
in two cases:

- when the firm's font can't be used for a heading: a script or very condensed font, an uploaded
  font that lacks letters we need, or a font that fails to load;
- for button labels, when the firm uploaded its own font.

Founders Grotesk Mono loads where a client page shows a value exactly as the state will receive it.

**Where the fonts load.** All of these surfaces are served from cofile.app.
[owner to confirm: no plan to serve client pages from firms' own domains].

| Surface | Address | Who sees it | Styles that load | Monthly pageviews |
|---|---|---|---|---|
| Our website | cofile.app: the home page, How it works, For firms, What we file, Pricing, Security, Questions, For platforms, sign-up, log-in and the other account pages, Terms, Privacy, and the error pages | Firm owners and staff | All six | [owner to supply: monthly pageviews now, and expected at launch] |
| The filing desk | cofile.app/p/‹firm› and its pages | Each firm's staff, every working day | All six | [owner to supply: monthly pageviews now, and expected at launch] |
| The proof (the page where a firm approves each filing) | Rendered by our filing engine, with the font files loaded from cofile.app [owner to confirm: the host name the proof page is served from, if it is not cofile.app] | The firm's approver | Text Regular and Medium, Founders Grotesk Medium, Mono Regular | [owner to supply: monthly pageviews now, and expected at launch] |
| The dashboard and API documentation | cofile.app/dashboard, cofile.app/docs | Staff at software platforms that use our API, and developers | All six | [owner to supply: monthly pageviews now, and expected at launch] |
| **Client pages** (high volume) | cofile.app/i/‹token› (a client's own link) and cofile.app/‹firm›/‹service› (a firm's page for each filing it offers) | Each firm's clients, mostly on phones | Text Regular and Medium on every page. Founders Grotesk Medium and Mono only on some pages (see above) | [owner to supply: monthly pageviews now, and expected at launch] |
| **White-label pages** (high volume) | cofile.app/e/‹account›/‹firm›/‹service› | Clients of firms that use a software platform built on our API | The same as client pages | [owner to supply: monthly pageviews now, and expected at launch] |
| White-label proof | Rendered by our filing engine | Firms that use a platform built on our API | Text Regular and Medium, Mono Regular, and Founders Grotesk Medium only as a fallback for headings | [owner to supply: monthly pageviews now, and expected at launch] |
| **The website widget** (high volume) | A frame whose page is served from cofile.app/embed/…, which firms place on their own websites with one script tag | Visitors to firms' own websites | Founders Grotesk Text Regular and Medium only | [owner to supply: monthly widget loads now, and expected at launch] |
| Emails | None | None | None. Our emails load no web fonts and use system fonts | None |

**Two questions about counting:**

- The widget's page and its font files come from cofile.app, but the frame sits on many firms' own
  websites. How do you count these views, and does it matter that the frame appears on other
  domains?
- Client pages, white-label pages and the widget carry our customers' brands (a firm's or a
  platform's), not ours, though we serve them. Does one license held by CoFile cover fonts on pages
  we serve under our customers' brands?

**Formats and hosting.**

- WOFF2 for the web, self-hosted on cofile.app. We don't load fonts from a third-party service.
- We subset the files ourselves to Latin and Latin Extended-A, keeping the features above.
- We generate fallback font rules from the fonts' metrics, so pages don't shift when the fonts load.
  We also scale each firm's own font to match the x-height of Founders Grotesk Text.
- Desktop fonts for design work.

**Desktop seats.** These are for our design team.
[owner to supply: the number of people who need Founders Grotesk installed, and how many seats the
2010 license covers]. Please tell us whether contractors working for us may use our desktop
license.

**App license.** We have no native app. The filing desk and the dashboard are web pages, which people
can add to a phone's home screen. [owner to confirm: whether to ask for an app license now].

### Uses to confirm

1. **Link-preview images.** At build time we render a 1200 × 630 px image for each page. Some of these
   images include our product pictures, which contain Founders Grotesk text.
2. **Printed and saved copies.** Firms print the approval page, or save it as a PDF from their
   browser, to keep in their client's file. That PDF carries the fonts the browser embeds.

### Deliverables

- WOFF2 web fonts and desktop fonts for Founders Grotesk Text and Founders Grotesk Mono, Regular and
  Medium.
- A ruling on whether our 2010 Founders Grotesk files are covered for the web, or WOFF2 files and
  web terms for Regular and Medium.
- The license documents.
- Confirmation that the two uses above are covered.

### Timing

- Desktop Founders Grotesk Text and Mono: from week 1, for design work.
- The scope and price of the web license: agreed before week 8, when the licensed fonts replace our
  stand-ins. Launch is in weeks 13 to 15.

Until then, our live pages use free stand-in fonts with matched metrics.

### What we provide

- The pageview figures above, per surface.
- The domain: cofile.app. [owner to confirm: any other host name that will serve the fonts].
- The number of desktop seats.
- [owner to supply: the license or invoice for these desktop files], for the 2010 files we hold.
- A contact for questions: [CoFile contact].

### To quote

Please send back:

1. Whether our existing Founders Grotesk license covers web use, and up to what pageview tier.
2. The price of Founders Grotesk Text (Regular, Medium) and Founders Grotesk Mono (Regular, Medium),
   for desktop and for web.
3. The price of the web license for all six styles, with the pageview tier for each surface and the
   total.
4. A second web quote that covers only our own pages (the website, the filing desk, the proof, and
   the dashboard and documentation), without the client pages, white-label pages and the widget, so
   that we can compare.
5. How pageviews are counted (each page load, or each font request), how we report them, and what
   happens if we exceed our tier.
6. The price per desktop seat, and whether contractors may use our seats.
7. Whether the license is perpetual or renews, and any renewal cost.
8. Whether you supply WOFF2 files, and whether we may subset them.

---

## Internal note (not for sending)

**What drives the cost.** Miller appears only on CoFile's own pages, so its web use is the lower-volume
part. Founders Grotesk is the cost driver. The spec puts Founders Grotesk Text on every client page,
on every white-label page and inside the widget. The firm's own font covers only the firm's name,
its headings and its button labels when the firm chose a preset. So the high-volume pages do need a
Klim license unless we change the reading face there. This is why decision 7 says the license must
be scoped to the client pages and the widget before launch. Emails load neither family, so they add
no pageviews.

**The files the owner supplied are development stand-ins only.** The site build now uses them in
place of the cuts we don't have: Miller Text stands in for Miller Display, and the 2010 Founders
Grotesk stands in for Founders Grotesk Text. They must not be served on the live site until the web
licenses are confirmed in writing. The proof and the client pages go live in weeks 2 to 5, so until
then those live pages keep the free metric-matched stand-ins. Keep these files out of anything that
is deployed. They are never committed: the repository is public, so `.gitignore` keeps
`web/public/fonts` out of git, and the site declares a face only when its file is on the machine
(`web/lib/licensed-fonts.ts`, `web/public/fonts/README.md`). The files' embedding flag (fsType 8, "editable embedding") governs embedding in
documents such as PDFs. It is not a web license, so we can't rely on it.

**To fill in before sending:**

- monthly pageviews per surface, now and expected at launch;
- desktop seat counts;
- the license or invoice for both sets of desktop files;
- the host name the proof is served from;
- whether to ask for app licenses;
- [owner to confirm: whether our component gallery (Storybook) will be public]. If it will be, it is
  one more surface to list.

**Miller Text Bold.** The public-pages part of the spec adds it, for Terms and Privacy only. The
spec's asset list names only Roman and Italic, and the docs part says "Roman and Italic only". We
already hold Bold on desktop. [owner to confirm: whether to license Bold for the web, or to set the
emphasis on Terms and Privacy another way].

**Miller Display Semibold** is only for the temporary wordmark. Once that is outlined into artwork it
may need only a desktop license. [owner to confirm: whether to buy Semibold for the web].

**Other styles we hold.** The other Miller Text and Founders Grotesk styles we hold (SemiBold, Light,
the condensed widths and the italics) aren't used in the spec. We don't need web licenses for them.

**The engraving.** The engraving's glyph atlas needs Type Network's written permission (build plan,
list B). Without it, the engraving stays on the stand-in face.

**If the Klim quote is too high.** Decision 7 names the open-licensed alternative: Atkinson
Hyperlegible Next with Atkinson Hyperlegible Mono.

- It costs nothing to license on the high-pageview firm and client pages and the widget.
- It was designed for low vision, and it makes I, l, 1, O and 0 more distinct on the proof.
- It is a little less elegant beside Miller.
- The type sizes in the spec hold either way, and we regenerate the fallback metrics for the new
  face.

There are two ways to use it:

- **As decision 7 describes it:** Atkinson Hyperlegible Next and Mono replace Founders Grotesk
  everywhere. Miller stays on CoFile's own pages.
- **A middle path, which is not in the spec:** keep Founders Grotesk on CoFile's own pages, and use
  Atkinson Hyperlegible on the client pages, white-label pages and the widget. Klim's second quote
  (item 4 in its request) prices this path. It would need the owner's yes and a design check.

[owner to confirm: the price above which we switch, and which of the two paths].

**Spec references:** 01-foundation.md 3.3, 3.4, 3.7, 5.1 to 5.5; 04-home-page-bottom.md 9.9
(lettering, rendering tiers); 05-public-pages.md 10A.15, 10A.18; 06-firm-pages-and-the-proof.md
10B.1.2, 10B.22.4, 10B.22.6, 10B.26; 07-platforms-and-emails.md 10C.16, 10C.18, 10C.19, 10D.2;
08-components-and-production.md 13.1, 13.3, 13.4; DECISIONS.md decisions 6, 7, 8, 20; BUILD-PLAN.md
C.1 and list B.
