# Design brief: the visual design of cofile.app

Version 3, Nov 26, 2026. It follows the round 3 copy now published on the site (`main`, "Round 3
site: benefits first, fewer words, public prices and the pages behind the home page", and "The firm
approves the proof, not its client"). Version 1's specs were discarded and are in git history only.

Ten designers each write, in their own voice, how they would design the CoFile website if every
graphic tool, studio, photographer, illustrator, 3D and motion house, type foundry and technology
were at their disposal.

## The job: visuals only

| | |
|---|---|
| **Locked** | **The copy, the marketing tone and the selling brand.** Every headline, line, button label, price and the order of each page are final, and so is what CoFile sells and how it sounds. You don't rewrite, reorder the argument, or add messages. |
| **Yours, completely** | **Everything visual.** Strip the current look entirely: today's colors, fonts, folder-tab mark, layout and styling are not a starting point and don't need to survive. Logo and wordmark, color, type, grid, art direction, photography, illustration, 3D, motion, iconography, texture, the look of every component and page. |
| **The goal** | **Bring out the copy.** The copy was cut to about 330 words on the home page on purpose, so the **pictures carry the page**. Your design has to make a busy firm owner feel "this is for my firm, I can say yes to my clients, I want to try it", and click "Run a free rehearsal". |

## What the copy sells (read it this way)

The copy is in `web/app/page.tsx` and the pages linked from it. Its selling story, in its own words:

1. **Say yes, under your own name.** "Your client needs an LLC. Say yes, under your own name." The
   firm keeps the client and the work, and looks great doing it.
2. **Your brand on everything.** "Your name on the door. Ours in small type." "Your logo and color
   on every page your client sees." A link for each client, a page for every filing, a button for
   the firm's own website, its registered agent or ours.
3. **Nobody retypes anything.** "Your client sends a text. Nobody retypes it." A forwarded text,
   email, WhatsApp or Slack message becomes a drafted filing.
4. **You stay in charge.** "Nothing is filed or paid until you approve the proof." One page: every
   detail, every fee. **The firm approves the proof, not its client.**
5. **It's done, and the papers come back.** "Then it's filed, and the papers come back to you."
   The state's documents, the EIN and the IRS letter, an update at each stage.
6. **The filings your clients already ask for**: New York, New Jersey, Florida and the IRS.
7. **Try it free.** "In beta: rehearse a filing, free." "Run one rehearsal. Then decide."
8. **Simple prices.** "$45 a filing. EIN included with a formation." Plans from $250 a month.
9. **People behind it.** "Built and run by filing professionals. When a filing needs a person, one
   of them takes over."

**Security is one line and a link** ("Social Security numbers encrypted and deleted 30 days after
the filing. Saved cards held in a card vault, never in our database. Security") with its own page.
It is reassurance for the reader who looks for it, not the visual story. Don't build the brand,
the logo, the signature idea, the hero or the motion around safety, stopping, holding, verifying,
locks, vaults or what CoFile doesn't do. Build them around the firm, its clients and the ease.

## Who's looking

- **Firm owners and staff** at CPA, payroll, fractional CFO and title firms: often 40 to 65,
  proud of their practice and their client relationships, not technical. They approve the proof.
- **Their clients**, small-business owners (a bakery, a contractor, a first-time founder), often on
  a phone. They see only the firm's branded form, client link pages and emails, never CoFile's.
- **Platforms and filing companies** ("For platforms"), and their developers in the API docs.

## The product in one paragraph

CoFile files business filings (LLC and corporation formations, EINs, payroll registrations,
copies and certificates) on the official New York, New Jersey, Florida and IRS websites. A firm
starts a filing (a short form, a link to its client, or a forwarded text or email), the firm
approves the proof, and CoFile files it and brings back the state's documents. Partner firms get a
**filing desk** at `cofile.app/p/<firm>` branded with their logo, colors and font, a page for each
filing they offer, client links and a button for their own site. Platforms get a dashboard, an
API, webhooks, a white-label setup and an embeddable widget. It is in beta: filing types go live
one at a time, and until then a filing runs as a free **rehearsal** on the state's real website.
Prices are public (`web/lib/pricing.ts`): $45 a filing, an EIN on its own $25, copies and
certificates $15; plans Starter $250 a month (6 filings), Growth $500 (15), Unlimited $1,000 (60);
state fees separate; rehearsals free.

## The words to use in mockups (locked)

**CoFile** (never any other name) · **the proof** (the page the firm approves) · **rehearsal** ·
**filing desk** (a firm's area; platforms have a **dashboard**) · **log in** · "Ours in small
type" · the coverage labels and prices as the site shows them. Quote the real copy from the repo;
don't write new headlines, labels or captions. Where a design needs a word that doesn't exist (an
image's alt text, say), mark it `[copy needed]`.

## The home page (locked order and words)

About 330 words. Each section is a short text column beside a **picture**. The pictures are plain
HTML stand-ins today (`web/components/landing/Visuals.tsx`, each labeled as an example) and are
**yours to design**: they are the core of this job.

| # | Section | The copy (headline) | The picture to design (today's stand-in) |
|---|---|---|---|
| 1 | Hero | Kicker "For CPA, payroll, fractional CFO and title firms" / "Your client needs an LLC. Say yes, under your own name." / sub / "Run a free rehearsal" and "See pricing" / "Built and run by filing professionals…" | **The filing desk**, in an example firm's brand (`DeskVisual`) |
| 2 | Firms | "Your name on the door. Ours in small type." + 4 short ticks + "For firms" link | **The same client page under two example firms**, each in its own brand (`TwoFirmsVisual`) |
| 3 | Requests | "Your client sends a text. Nobody retypes it." | **A client's text becoming a drafted New Jersey LLC formation** (`TextToFormVisual`) |
| 4 | The proof | "Nothing is filed or paid until you approve the proof." + 3 ticks + "How it works" link | **A sample proof** for "Two Sisters Bakery LLC" (`ProofVisual`) |
| 5 | After | "Then it's filed, and the papers come back to you." + 3 ticks | **A filed record with the state's document and the IRS letter** (`PapersVisual`) |
| 6 | Coverage | "The filings your clients already ask you for." / "See which are live today" | **State tiles**: NY, NJ, FL, IRS with each filing type's status (`StateTiles`) |
| 7 | Rehearsals | "In beta: rehearse a filing, free." | **A rehearsal log** (`RehearsalLog`) |
| 8 | Pricing | "$45 a filing. EIN included with a formation." + 4 price items + the one security line | A price strip (no stand-in picture) |
| 9 | Close | "Run one rehearsal. Then decide." | (none today) |

Plus the beta banner (kept on the home page), the header with its navigation, and a footer (not a
law firm or a government agency; Terms, Privacy, hello@cofile.app). Every example picture keeps a
small label saying it is an example (as the stand-ins' captions do).

## The surfaces to design

Weight your spec toward the home page and its pictures, the pages behind it, and the firm's
branded pages: that is where people decide. Then carry the visual language through the rest.

- **Public site**: home (in the most detail, picture by picture); the pages behind it, each in
  `web/app/<slug>/page.tsx`: **How it works** (`/how-it-works`), **For firms** (`/for-firms`),
  **What we file** (`/what-we-file`), **Pricing** (`/pricing`), **Security** (`/security`),
  **Questions** (`/faq`), **For platforms** (`/platforms`); sign-up, log-in, password and
  verification pages, Terms and Privacy, 404 and errors.
- **The firm's pages** (the firm's brand leads; CoFile is "with CoFile"): the filing desk
  (overview, setup with logo, colors and font, new filing by state then type, filing detail, client
  links, requests from a text or email, signatures, Ready to pay, billing), **the proof** the firm
  approves, a page for each filing it offers (such as `cofile.app/bestaccounting/llc-filing-new-york`),
  the client intake form and client link pages. Show how your system makes any firm's logo and
  color look their best.
- **Platforms**: the dashboard, API docs, the white-label hosted page and the embed widget.
- **Emails**: the proof is ready, documents back, EIN issued, sign-up and account emails.

## What each spec contains

1. Who you are, briefly, and what you bring to this.
2. **The visual concept**: the one idea, and how it brings out the copy's selling story.
3. **Identity**: logo, wordmark, mark (precise enough for an illustrator to draw), the "with
   CoFile" / "ours in small type" mark, and how a firm's logo sits on its pages.
4. **Color**: the palette with hex values, light and dark, and how color is used.
5. **Typography**: typefaces (any foundry, or commissioned), the scale, sizes, weights and pairing.
6. **Layout**: grid, spacing, rhythm, how pages breathe on desktop and phone.
7. **Art direction**: photography, illustration, 3D, product imagery, texture. What you'd
   commission (by kind of artist or studio, not named people), shot lists and briefs.
8. **Motion**: the moments that move, how, and why they sell the copy.
9. **The home page, section by section**: for each of the 9 sections, the full visual treatment
   with the real copy placed, and **each of the seven pictures designed in full** (what it shows,
   composition, style, states, motion), desktop and phone layouts (ASCII wireframes welcome).
10. **The other pages**: the seven pages behind the home page, then every other surface above.
11. **Components**: the look of buttons, fields, cards, the proof, chips, price cards, tables,
    navigation.
12. **Craft notes**: dark mode, phones, readable for older eyes, Spanish text length. Short.
13. **Production**: tools, the asset list, what to commission, the order to build in.
14. **What I'd strip from today's visuals**, and why (visuals only).

Be specific: real hex values, sizes, durations, photo and illustration briefs. No word budget:
write it as fully as you'd hand it to a build team and the studios you'd commission. Original work
only: draw on genres and traditions, but don't recreate any other company's brand or site, and
nothing may imitate a government seal, the IRS or an official government mark.
