# Design brief: the visual design of cofile.app

Version 2, Nov 26, 2026. It replaces the first brief; the first round of specs was discarded
(it is in git history only).

Ten designers each write, in their own voice, how they would design the CoFile website if every
graphic tool, studio, photographer, illustrator, 3D and motion house, type foundry and technology
were at their disposal.

## The job: visuals only

| | |
|---|---|
| **Locked** | **The copy, the marketing tone and the selling brand.** Every headline, paragraph, button label and the order of the story are final, and so is what CoFile sells and how it sounds. You don't rewrite, reorder the argument, or add messages. |
| **Yours, completely** | **Everything visual.** Strip the current look entirely: today's colors, fonts, folder-tab mark, layout and styling are not a starting point and don't need to survive. Logo and wordmark, color, type, grid, art direction, photography, illustration, 3D, motion, iconography, texture, the look of every component and page. |
| **The goal** | **Bring out the copy.** Your design exists to make the words land: to make a busy firm owner feel "this is for my firm, my clients will love it, I want to try it" and click "Run a free rehearsal". |

## What the copy sells (read it this way)

The copy is in `web/app/page.tsx`. Its selling story, in its own words:

1. **Your firm, your client, your name.** "Your name on the door. Ours in small print." The firm
   keeps the client relationship and looks great doing it: its own name, logo and color on the
   filing desk, the forms and the proof. CoFile is a small "with CoFile".
2. **Effortless for everyone.** "You start it. Your client approves it. CoFile files it." Three
   steps. "Clients don't fill in forms. They text you": a text message becomes a drafted filing.
   Saved answers fill in the rest.
3. **A client experience to be proud of.** The proof: "Your client sees what the state will see,
   before the state does." One page with the firm's name at the top, every detail and fee, one
   button. Like approving a proof at the printer.
4. **It does the work and brings the results home.** CoFile fills in the state's own website screen
   by screen, and "The papers come back to you": documents, the EIN letter, one record.
5. **Try it free, for real.** "Rehearse on the real stage." A free rehearsal on the state's real
   website. "Run one rehearsal. Then decide."

**Security, the checks and "the catch" are support, not the pitch.** The copy has sections for
them ("Checked twice. Filed once.", "Every filing service has a catch", "Security") and they stay
where the copy puts them, designed well and easy to find. But they are reassurance for the reader
who goes looking, not the visual story. Don't build the brand, the logo, the signature idea, the
hero or the motion around stopping, holding, matching, verifying, hashes, seals of approval,
locks, vaults or what CoFile doesn't do. Build them around the firm, its clients and the ease.

## Who's looking

- **Firm owners and staff** at CPA, payroll, fractional CFO and title firms: often 40 to 65,
  proud of their practice and their client relationships, not technical. The site has to make
  them want their name on it.
- **Their clients**, small-business owners (a bakery, a contractor, a first-time founder), often on
  a phone. They see only the firm's branded form, the proof and emails.
- **Enterprise buyers and developers** at platforms and filing companies: "Building a filing
  product? Put CoFile underneath it." They read the API docs.

## The product in one paragraph

CoFile fills in business filings (LLC and corporation formations, EINs, employer registrations,
copies and certificates) on the official New York, New Jersey, Florida and IRS websites. A firm
starts a filing (a short form, a link to the client, or a forwarded text or email), the client
approves the proof, and CoFile files it and brings back the state's documents. Partner firms get a
**filing desk** at `cofile.app/p/<firm>` branded with their logo, colors and font, permanent
branded pages for each service they offer, and client links. Enterprise accounts get a dashboard,
an API, webhooks, a white-label setup and an embeddable widget. CoFile is in beta: filing types go
live one at a time, and until then they run as **rehearsals** that are free. The site states no
prices.

## The words to use in mockups (locked)

**CoFile** (never any other name) · **the proof** (the client's approval page) · **rehearsal** ·
**file for real** · **filing desk** (a firm's area; enterprise has a **dashboard**) · **log in** ·
coverage labels "Live", "Rehearsed to the payment screen", "Screens recorded, rehearsal next",
"Offered, not yet rehearsed", "Planned". Quote the real copy from the repo; don't write new
headlines, labels or captions. Where a design needs a word that doesn't exist (an image's alt text,
say), mark it `[copy needed]`.

## The home page, section by section (locked order and words)

1. **Hero**: "For CPA, payroll, fractional CFO and title firms" / "Your client approves the proof.
   Then CoFile files it." / sub / "Run a free rehearsal" and "See what your client sees" / beta
   note / a sample proof for "Two Sisters Bakery LLC" from the example firm "Harbor & Pine CPA".
2. **Process**: "You start it. Your client approves it. CoFile files it."
3. **The proof**: "Your client sees what the state will see, before the state does."
4. **Firms**: "Your name on the door. Ours in small print."
5. **Requests**: "Clients don't fill in forms. They text you." (Ana Ortiz's text about the bakery)
6. **Checks**: "Checked twice. Filed once." (support)
7. **After**: "The papers come back to you."
8. **Rehearsals**: "Rehearse on the real stage."
9. **Coverage**: "New York, New Jersey, Florida and the IRS." (a table of 16 filing types)
10. **The catch**: "Every filing service has a catch. Here's ours." (support)
11. **Security** (support)
12. **Enterprise**: "Building a filing product? Put CoFile underneath it." with the inquiry form
13. **Close**: "Run one rehearsal. Then decide." / "Approve the proof. Then it's filed."

Plus a slim beta notice and a footer (not a law firm or a government agency; Terms, Privacy,
hello@cofile.app).

## The surfaces to design

Weight your spec toward the public site, the firm's branded pages and the proof: that is where
people decide. Then carry the visual language through the rest.

- **Public site**: home (in the most detail), sign-up, log-in, password and verification pages,
  Terms and Privacy, 404 and errors.
- **The firm's branded pages** (the firm's brand leads, CoFile is "with CoFile"): the filing desk
  (overview, setup with logo, colors and font, new filing by state then type, filing detail, client
  links, requests from email or text, signatures, Ready to pay, billing), permanent service pages
  such as `cofile.app/bestaccounting/llc-filing-new-york`, the client intake form, and the proof.
  Show how your visual system makes any firm's logo and color look their best.
- **Enterprise**: the dashboard, API docs, the white-label hosted page and the embed widget.
- **Emails**: the proof is ready, documents back, EIN issued, sign-up and account emails.

## What each spec contains

1. Who you are, briefly, and what you bring to this.
2. **The visual concept**: the one idea, and how it brings out the copy's selling story.
3. **Identity**: logo, wordmark, mark (precise enough for an illustrator to draw), the "with
   CoFile" mark, and how a firm's logo sits on its pages.
4. **Color**: the palette with hex values, light and dark, and how color is used.
5. **Typography**: typefaces (any foundry, or commissioned), the scale, sizes, weights and pairing.
6. **Layout**: grid, spacing, rhythm, how pages breathe on desktop and phone.
7. **Art direction**: photography, illustration, 3D, product imagery, texture. What you'd
   commission (by kind of artist or studio, not named people), shot lists and briefs, and what the
   pictures show.
8. **Motion**: the moments that move, how, and why they sell the copy.
9. **The home page, section by section**: for each of the 13 sections, the full visual treatment,
   with the real copy placed, desktop and phone layouts (ASCII wireframes welcome), imagery and
   motion.
10. **The other pages**: every surface above, with layouts and visual treatment.
11. **Components**: the look of buttons, fields, cards, the proof, chips, tables, navigation.
12. **Craft notes**: dark mode, phones, readable for older eyes, Spanish text length. Short.
13. **Production**: tools, the asset list, what to commission, the order to build in.
14. **What I'd strip from today's visuals**, and why (visuals only).

Be specific: real hex values, sizes, durations, photo and illustration briefs. No word budget:
write it as fully as you'd hand it to a build team and the studios you'd commission. Original work
only: draw on genres and traditions, but don't recreate any other company's brand or site, and
nothing may imitate a government seal, the IRS or an official government mark.
