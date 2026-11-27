# Decisions for you: the merged design

The merge settled every split among the ten designers by using one option, so the merged spec reads as one design. These are the choices a reasonable owner might make differently. Each gives the options (and which designers argued for each), the option the merged spec uses and why, and what changes if you choose otherwise. What the ten agreed on is taken as given and isn't listed (see the round-two [README](../README.md), "Where they agree").

There are 39. The first few shape everything else: the spine (1), CoFile's own color (2), the button (3), what the pictures are (4), the headline type (6) and how much motion (9). The rest are local and can be changed one at a time.

## Decided Nov 26

All 39 were decided with the owner, one by one; each decision's own entry ends with "Your choice". Most follow the merged spec. These change it, and are being applied to the parts:

- **The Stripe model (2):** everything a firm uses is in CoFile's look, the same for every firm (the website, sign-up, the filing desk, the proof the firm approves, the dashboard, emails to the firm); only what reaches a firm's clients carries the firm's branding (the client form and link pages, its page for each filing, emails to clients). Billing (31) and the filing company's notices (33) follow from it.
- **The hero (5):** CoFile's filing desk with a Harbor & Pine client page in front of it, on plain paper.
- **No "with CoFile" on client pages or emails to clients (12):** CoFile appears to a client only inside counsel's authorization text ("{firm}, filing through CoFile"), which is what "Ours in small type" refers to.
- **No example captions on photographs (15).**
- **The sample proof (16, 19):** no numbered callouts; the three points beside it outline their part of the proof on hover, focus or tap.
- **Terms and Privacy (25):** a sticky contents rail on wide screens.
- **Branding previews (30):** the three client-facing surfaces only.
- **The EIN (34):** in the documents-back email, with a number-only email if the IRS letter is ever missing.
- **Email sender (37):** emails to clients go out under the firm's name, from the firm's own domain once connected.
- **Filled-in answers (38):** marked in CoFile's colors on the desk.
- **Added by the owner:** the filing desk shows which of the firm's clients sent each filing and where each one is up to (a "Sent by" column and a five-step track). Built in the product on Nov 26; the spec's desk ledger (10B.4) is being updated to match.
- **Added by the owner (Nov 26): no photographs of the people behind CoFile, for now.** Commission C10 (CoFile's filing professionals at the bench, and a portrait of each) is deferred, so decisions 14 and 18 rest until it returns. Every slot falls back as the spec already says: the hero's note stands alone; Pricing has no row of faces; "Is a person involved?" has no picture; For firms keeps its lozenge; How it works's step 3 takes C6, the papers come back (see the photography entry below), so its three steps keep their photographs. No stock photograph, vignette or illustration takes their place.
- **Supplied by the owner (Nov 26): the photography.** A package of staged, generated editorial scenes (the firms, the bakery and the people in it are fictional examples) covering C1, C2, the blank plate by day and at dusk (the Close, For firms and sign-up), C5, C6, C7, C8, C9 and C11 as stills, with web crops for desktop and phones. It stands in place of the shoot for these frames, and the owner's choice to use generated photographs replaces the spec's "no AI-generated images" rule for them. The masters live outside git (`var/photography/`); the web files are in `web/public/cofile/photography/`. How it works's step 3 uses C6 (the papers come back) in place of C10.
- **Supplied by the owner (Nov 26): the identity and artwork.** The drawn Display and Small wordmarks and lockups, the Name Plate marks, favicons and app icons, the eleven one-ink vignettes (light, dark and email versions; V4 is the envelope on the mat under the mail slot), Harbor & Pine's symbol and lettering and Northgate's plate lettering, spot-color press proofs and 1:1 nameplate guides. The digital files are in `web/public/cofile/`; the print and fabrication PDFs stay outside git (`var/identity/`) as production references. The lettering artist's, the illustrator's and the letterpress shop's briefs are on hold.
- **Decided by the owner (Nov 26), before launch:**
  - **The stand-in words ship as they are for now.** The table in [`COPY-NEEDED.md`](COPY-NEEDED.md) stays as the list to revisit.
  - **Fonts: the owner holds the licenses** for Miller and Founders Grotesk, and the build keeps them. The files stay out of git because the repository is public; each deployment copies them into `web/public/fonts/` (see that folder's README).
  - **Proof links need no fixed address.** A real proof is the per-filing link the engine makes on cofile.app. The sample proof on the marketing pages is built into the page, so nothing points elsewhere.
  - **Firm logos in forced dark mode sit on a small white chip.** In email, a logo with transparent parts goes out with a white plate built into the picture (12 px of white, the Name Plate's cut corners), because mail apps that force dark mode recolor backgrounds but never pictures; a logo on its own solid tile goes as uploaded. On the web, the logo sits on a white chip with the same corners that a browser's forced dark mode leaves alone. On the white sheets the chip and the plate can't be seen.
  - **No email-testing subscription for now; Resend keeps sending.** The emails are tested for free by sending real ones to real Gmail, Outlook and Apple Mail inboxes and looking at them ([`docs/email-testing.md`](../../email-testing.md)). The email-testing brief is on hold.

## At a glance

| # | Question | Used in the merged spec | Where | Your choice |
|---|---|---|---|---|
| 1 | Which concept is the spine | Plate & Proof | Part 1 | Plate & Proof, as merged |
| 2 | How much color CoFile itself has | warm neutrals and one metal: Cotton `#FBFAF6`, Plate Ink `#1D2130`, Graphite `#555867`, and Brass `#D9A84A` on no more than about 2% of a page… | Part 1 | CoFile's look on everything a firm uses; only the partner's branding on what reaches its clients (the Stripe model); warm neutrals + Brass |
| 3 | The button color | Brass `#D9A84A` with Plate Ink text (7.4:1), one Brass button per screen | Part 1 | Brass, dark text, as merged |
| 4 | What the pictures are | the live product as the main object in eight of the nine home sections (about 65% of picture area), set on craft photography (two real doors with… | Part 1 | Product + real photos, as merged |
| 5 | Whether the hero carries a photograph | Harbor & Pine's desk sheet alone on cotton paper, with its proof tucked behind it (Hal) | Part 1 | CoFile's desk + a Harbor & Pine client page in front, on plain paper |
| 6 | Serif or grotesk headlines | a Scotch roman, Miller Display and Miller Text, for CoFile's headlines, ledes and prices, and only on CoFile's own pages; firm pages use the… | Part 1 | Serif (Miller), as merged |
| 7 | The reading and interface face | Founders Grotesk Text and Founders Grotesk Mono (Klim) | Part 1 | Founders Grotesk, as merged |
| 8 | Commissioned type | licensed faces (Miller, Founders Grotesk), with the CoFile wordmark and the "Co" of the Name Plate drawn by a lettering artist (3.3), and the… | Part 1 | Wordmark only, as merged |
| 9 | How much motion | one signature moment (Firms: two doors, one page, about 4.2 s), one interactive moment (the visitor's name engraving into the blank plate at the… | Part 1 | Two moments, else still, as merged |
| 10 | One picture across Requests, the proof and After | a separate picture per section, with no pinning (6.5, 6.6) | Part 1 | A picture each, as merged |
| 11 | Where the visitor types their own firm's name | an optional field in the Close beside the blank plate; each letter engraves into the brass as it's typed, and the name pre-fills "Firm name" at… | Part 1 | At the close, as merged |
| 12 | Where "with CoFile" sits on a client's page | at the foot of every sheet a client sees and of the proof, centred under a 40 px hairline; at the right end of the Letterhead row on the firm's… | Part 1 | Nowhere: no "with CoFile" on client pages or emails to clients |
| 13 | Harbor & Pine CPA's main color | Harbor `#1D4E63` as the main color with Pine `#2B5A47` as the second color (3.8, 4.7) | Part 1 | Harbor blue, as merged |
| 14 | Whether the team portraits carry visible names | names and roles in every portrait's alt text; a visible name-and-role caption under the larger portraits on How it works, Pricing and Questions;… | Part 2 | Names inside, faces only on the hero, as merged (on hold: no team photographs for now) |
| 15 | Whether staged photographs say they're examples | one caption line `[copy needed]` on each staged photograph that stands alone and shows a cast person or an example firm's name (the door's wide… | Part 2 | No captions on photos |
| 16 | Whether the sample proof carries numbered callouts | the callouts, set in the margin outside the firm's sheet so they read as CoFile's mark-up, each pressing in as its block sets (7.3.2, M4) | Part 2 | No numbered callouts (see 19) |
| 17 | "See pricing" in the hero: a second button or a text link | a text link with an arrow, 18 px Medium, underlined, 24 px to the right of the Brass button and wrapping under it when the column is narrow | Part 3 | Text link with arrow, as merged |
| 18 | Whether the hero's team portraits carry printed names | up to three 48 px square portraits above the note, names and roles in alt text only | Part 3 | Up to three faces, names in alt text, as merged (asked with 14) (on hold: no team photographs for now) |
| 19 | Whether the proof's three list items point at the proof | Elaine's four numbered callouts outside the sheet, leading the eye through details, fees, the state's review page and the button, with no hover link | Part 3 | Hover, focus or tap a point to outline its part of the proof |
| 20 | How the visitor's typed firm name is lettered on the blank plate (the Close and sign-up) | Miller Display Roman, with the "&" in its Italic and credentials in its small capitals, cut and filled black like Harbor & Pine's hand-engraved… | Part 4 | Miller, as merged |
| 21 | What pictures carry How it works' three steps | Greta's numerals over Elaine's three photographs (Ana texting, the firm owner reading the proof, one of CoFile's filing professionals at work),… | Part 5 | Numerals over three photos, as merged |
| 22 | Pricing: four plan cards or one rate card | one heavy price card (the home page's card stock) printed with four ruled columns, the rows aligned across plans, Growth marked only by a 3 px… | Part 5 | One ruled price card, as merged |
| 23 | What we file: a progress track in every row, or the stage chip alone | each row's chip with the plate glyph (cut, marked out, inked) and its exact label, and one "road to live" drawn once, large, under the rehearsal… | Part 5 | Chip + one road to live, as merged |
| 24 | For platforms: a dark page or paper | paper, with the one dark object the code panel holding `"dryRun": true`, set on the rehearsal's Night with the dashed rehearsal mark (10A.7) | Part 5 | Paper, as merged |
| 25 | Terms and Privacy: a sticky contents rail or contents at the top | contents at the top, in two columns, each section number hung (10A.15) | Part 5 | Sticky side rail |
| 26 | How the pages behind the home page end | words only, on a quiet Cotton 2 band above the footer's rule, with the Brass button and the copy's secondary button, except For firms, which ends… | Part 5 | Words + buttons; For firms ends on the plate, as merged |
| 27 | How the filing desk's navigation works on a phone | the menu sheet, with the word under the menu icon and each page in a 64 px row (10B.3.2) | Part 6 | Menu sheet, as merged |
| 28 | What a new firm sees on its empty desk | the live miniature of the firm's own client page beside "Your desk is clear. …" and its two buttons | Part 6 | A live miniature of its own client page, as merged |
| 29 | Whether the proof's approve button follows the reader on a phone | never sticky (10B.22.2) | Part 6 | Never sticky, as merged |
| 30 | How the Branding page previews the firm's brand | all four at once, the client's page large at 0.8 scale and the other three as thumbnails that swap into the large slot (10B.7.5) | Part 6 | All client-facing surfaces at once |
| 31 | Whose color Billing wears | the desk's register (10B.18): the current plan's card carries the Firm Rule, the meter fills in `--firm-fill`, prices in Founders Grotesk, no… | Part 6 | CoFile's look (follows from decision 2) |
| 32 | Where a client presses "Send to {firm}" on a phone | at the end of the form only, full width (10B.24.2) | Part 6 | At the end only, as merged |
| 33 | Whose letterhead the filing company's notices carry | CoFile's letterhead (10D.1, 10D.12) | Part 7 | CoFile's letterhead (follows from decision 2) |
| 34 | How the EIN reaches the firm by email | inside the documents-back email (10D.7), with the stand-alone email drawn and parked (10D.8) | Part 7 | In the documents-back email; a number-only email if the IRS letter is missing |
| 35 | Whether emails carry a picture | one engraved vignette on two kinds of email only: the returned envelope on documents back (in Graphite, on the firm's emails) and the blank Name… | Part 7 | Two small engravings, as merged |
| 36 | Syntax color in the docs' code samples | typographic only, on Plate Ink plates (10C.16): keys, keywords and literals in Founders Grotesk Mono Medium, values in Regular, comments in grey | Part 7 | No color, weight only, as merged |
| 37 | The sender's name on the firm's emails | the firm's name (10D.1), with Reply-To the firm's support email when it has one | Part 7 | Firm's name; the firm's own domain once connected |
| 38 | Whether the form marks the answers it filled in for the firm | a 3 px edge in the firm's main color and the firm's row tint on each filled field until someone edits it, with the product's existing notice… | Part 8 | A thin edge on each filled answer, in CoFile's colors |
| 39 | What is built first after the proof and the client's pages | the desk is started first, with the home page overlapping a week behind it (13.5, phases 2 and 3) | Part 8 | Desk, then home page, as merged |


## Part 1: the foundation

Section numbers refer to [`01-foundation.md`](01-foundation.md).

### 1. Which concept is the spine
- **Options:** Plate & Proof, CoFile is the firm's stationer (Hal) · Nameplate, every page a front page and the firm owns the nameplate (Elaine) · Vitrina, CoFile is the sign painter (Rosa) · Doorlight, the light through the firm's door across one working day (Tomás) · Front of House, the firm out front and CoFile backstage (Marcus) · Letterhead in Daylight (Jun) · Top Billing, the show poster's billing block (Amara) · Large Type, a Basel poster system (Greta) · In Your Colors, CoFile is colorless and the firm is the light (Dev) · House Colors, CoFile is graphite and chalk (Priya)
- **Used in the merged spec:** Plate & Proof, because the copy already speaks the stationer's language (the name on the door, "Ours in small type", "You've approved a proof before: business cards, letterhead, an invitation at the printer", "put your name and logo on the door"), and its objects (a name plate, letterhead, a proof, a price card, a small imprint) are things a proud firm owner of 40 to 65 has owned and approved. It also absorbs the door and plate that six of the ten reached for, and leaves room for the agreed rehearsal stage.
- **If you choose otherwise:** the identity, palette and type change with the concept. Elaine's Nameplate is the closest swap (gold leaf on door glass instead of engraved plates, Publico headlines, a newspaper's rules); Rosa's and Amara's bring bold color worlds onto CoFile's pages; Dev's, Priya's and Marcus's take CoFile to near-colorless grotesk; Tomás's adds real-time light and WebGL throughout.
- **Your choice (Nov 26):** Plate & Proof, as the merged spec uses.

### 2. How much color CoFile itself has
- **Options:** Bold color worlds on CoFile's own pages (Amara's marigold and aubergine, Rosa's main-street palette, Greta's Poster Yellow fields) · Warm neutrals with one crafted accent (Hal's copper, Jun's persimmon, Elaine's gold, Tomás's lamplight) · Nearly colorless (Dev, Priya, Marcus)
- **Used in the merged spec:** warm neutrals and one metal: Cotton `#FBFAF6`, Plate Ink `#1D2130`, Graphite `#555867`, and Brass `#D9A84A` on no more than about 2% of a page (4.1, 4.8). Brass never appears on a firm's or a client's page. This keeps the firm's color the strongest color wherever it appears, while still giving CoFile's own pages warmth and one unmistakable action.
- **If you choose otherwise:** a bold world adds full-bleed color bands to the home page (and asks for a texture and a second accent); near-colorless drops Brass, so the button becomes Plate Ink (or the example firm's color) and CoFile's pages read cooler and more like software.
- **Your choice (Nov 26):** The Stripe model. Everything a firm uses is in CoFile's look, the same for every firm: the website, sign-up, the filing desk, the proof the firm approves, the dashboard and emails to the firm, all in warm neutrals with Brass as the one accent. Everything that reaches a firm's clients uses only the firm's branding: the client form and client link pages, the firm's page for each filing it offers, and emails to its clients. A platform's white-label pages, including a proof its own clients approve, keep the platform's brand. This changes the merged spec: the filing desk and the proof move from the firm's letterhead to CoFile's look, emails split by recipient, and the hero shows CoFile's desk with a client page in Harbor & Pine's brand in front of it (see decision 5).

### 3. The button color
- **Options:** Yellow or marigold (Greta, Marcus, Amara) · Gold or amber (Elaine, Tomás) · Persimmon or flamboyán red (Jun, Rosa) · Copper (Hal) · The firm's own color, even on the home page's example (Dev, Priya)
- **Used in the merged spec:** Brass `#D9A84A` with Plate Ink text (7.4:1), one Brass button per screen. It sits in the gold family five of the ten chose, it is the metal of the plate every firm's name goes on, dark text on it reads better for older eyes than white on copper (5.3:1), and it stays far from the navy, green, teal and burgundy that firms pick and from the red of an error.
- **If you choose otherwise:** copper (Hal) gives white text on a red-brown that sits close to red-brand firms and to errors; a brighter yellow (Marcus, Greta) is louder and more "sign here"; the firm's own color on CoFile's pages removes CoFile's one accent entirely and the home page's button changes color with the example firm.
- **Your choice (Nov 26):** Brass #D9A84A with Plate Ink text, one Brass button per screen, as the merged spec uses.

### 4. What the pictures are
- **Options:** People: documentary or cut-out photography of firm owners and clients (Elaine, Rosa, Priya) · Light and place: a desk or room in moving daylight (Jun, Tomás) · Crafted objects: engraved plates, gilded glass, sign painting (Hal, Rosa, Elaine, Tomás) · The product alone, staged (Dev, Marcus, Greta) · 3D and kinetic type (Amara)
- **Used in the merged spec:** the live product as the main object in eight of the nine home sections (about 65% of picture area), set on craft photography (two real doors with hand-engraved plates, the same plate blank) and documentary photography of people (the real team, Ana at the bakery, a firm owner reading the proof) (about 30%), and the "$45" as type. No 3D, no illustration on the home page, no real-time light; engraved vignettes only for system pages and empty states (Direction D1). The product proves the claim; real objects and real people make it feel like a practice, not software.
- **If you choose otherwise:** product-only staging (Dev, Marcus, Greta) drops the door and bakery photography and the engraver commission, and the Firms picture becomes two pages side by side; people-led (Elaine, Rosa) adds cast photographs behind the hero and After; Amara's 3D and kinetic type need a 3D studio and a commissioned variable display face.
- **Your choice (Nov 26):** The live product (about 65%) on real craft and documentary photography (about 30%), no 3D, stock or illustrated people, as the merged spec uses. Under decision 2 the product pictures show CoFile's desk and the firm-branded pages its clients see.

### 5. Whether the hero carries a photograph
- **Options:** The desk alone on paper (Hal, Greta, Dev, Marcus, Priya) · The desk over a photograph of a firm owner saying yes (Elaine, Rosa) · The desk in a sunlit room or moving light (Jun, Tomás) · The desk in front of a gilded door (Amara)
- **Used in the merged spec:** Harbor & Pine's desk sheet alone on cotton paper, with its proof tucked behind it (Hal). The first screen reads in one glance and loads fast, the largest name in it is the firm's, and the two doors in section 2 land harder as the page's first photograph.
- **If you choose otherwise:** Elaine's "The call" (a cast firm partner on the phone, the firm's name reversed on the door glass behind her) goes behind the desk; it adds emotion and a face, a cast photo shoot, a caption marking it as an example, and weight to the first screen.
- **Your choice (Nov 26):** The hero shows CoFile's filing desk (Harbor & Pine as the account, its client filings as content) with a client page in Harbor & Pine's logo and colors in front of it, on plain cotton paper with no photograph. The desk alone in the firm's brand, as merged, is replaced (decision 2).

### 6. Serif or grotesk headlines
- **Options:** Serif: Scotch roman, GT Alpina, Publico, Fraunces (Hal, Jun, Elaine, Tomás) · Grotesk: Suisse Int'l, GT America, a marquee or show-card gothic (Greta, Dev, Marcus, Priya, Amara, Rosa)
- **Used in the merged spec:** a Scotch roman, Miller Display and Miller Text, for CoFile's headlines, ledes and prices, and only on CoFile's own pages; firm pages use the firm's font and Founders Grotesk (5.1). The serif is the engraver's letterhead the spine is built on, and to a 40-to-65 firm owner it reads as established. Keeping it off firm pages answers Priya's concern that a CoFile serif would compete with firms' own serif logos.
- **If you choose otherwise:** a grotesk (GT America or Suisse) sets every headline, the wordmark is redrawn from it, and the site reads more neutral and more like a software company; Miller is dropped.
- **Your choice (Nov 26):** Miller Display and Miller Text for CoFile's headlines, ledes and prices, never on client pages, as the merged spec uses.

### 7. The reading and interface face
- **Options:** Founders Grotesk (Hal) · Atkinson Hyperlegible Next, open-licensed and designed for low vision (Amara, Tomás) · National 2 (Elaine) · Whitney (Jun) · GT America (Marcus, Priya) · Suisse Int'l (Greta, Dev) · Adelle Sans (Rosa)
- **Used in the merged spec:** Founders Grotesk Text and Founders Grotesk Mono (Klim), because they share the Scotch roman's Edinburgh lineage and sit calmly beside any firm's font, at sizes set for older eyes (18 px body, nothing under 14 px).
- **If you choose otherwise:** Atkinson Hyperlegible Next and Mono cost nothing to license on the high-pageview firm and client pages and the embed widget, and make I, l, 1, O and 0 more distinct on the proof; the type is a little less elegant beside Miller. The scale in 5.2 and 5.3 holds either way.
- **Your choice (Nov 26):** Founders Grotesk Text and Founders Grotesk Mono (Klim), as the merged spec uses; the web license is to be scoped to the high-volume client pages and the widget before launch.

### 8. Commissioned type
- **Options:** A custom family (Hal's Plate Roman, Amara's CoFile Marquee, Rosa's Vitrina Sans) · Licensed faces as they are, with only the wordmark commissioned (the other seven)
- **Used in the merged spec:** licensed faces (Miller, Founders Grotesk), with the CoFile wordmark and the "Co" of the Name Plate drawn by a lettering artist (3.3), and the example firms' plates engraved by hand. A family takes four to six months and the buyer would not see the difference; Miller is already the lineage Hal's commission would revive.
- **If you choose otherwise:** commission Hal's Plate Roman (about six months), launch on Miller with matched metrics so nothing reflows when it lands, and draw the wordmark from the new family.
- **Your choice (Nov 26):** Licensed faces; only the CoFile wordmark and the "Co" of the Name Plate are drawn by a lettering artist, and the example firms' plates are engraved by hand, as the merged spec uses.

### 9. How much motion
- **Options:** Real-time light across the whole scroll (Tomás); 3D and kinetic type (Amara) · One or two crafted moments, otherwise still (Hal, Elaine, Greta, Rosa, Marcus) · Calm, tactile motion throughout (Jun, Dev, Priya)
- **Used in the merged spec:** one signature moment (Firms: two doors, one page, about 4.2 s), one interactive moment (the visitor's name engraving into the blank plate at the Close and at sign-up), and short settles of 2.4 s or less elsewhere (3.4 s for the Requests explainer); every picture plays once; no pinning, scrubbing, parallax, loops or moving prices; the only WebGL is the engraving, with fallbacks (Direction D2). Older readers keep their place, and the two moments people will remember get all the attention.
- **If you choose otherwise:** Tomás's light layer or Amara's kinetic type adds a creative-technology studio, device tiers and heavier pages; a calmer-throughout approach (Jun, Dev) adds small motion to every section and pointer effects.
- **Your choice (Nov 26):** One signature moment (two doors, one page), one interactive moment (the typed firm name engraving into the blank plate), short settles elsewhere; nothing pinned, scrubbed, looping or parallax, as the merged spec uses.

### 10. One picture across Requests, the proof and After
- **Options:** One pinned picture that transforms as the three sections scroll past, from a text to a draft to the proof to the filed record (Dev, Marcus) · A separate picture for each section (Hal, Elaine, Greta, Rosa, Jun, Tomás, Amara, Priya)
- **Used in the merged spec:** a separate picture per section, with no pinning (6.5, 6.6). Each section stands on its own at any scroll speed, phones and desktops get the same story, and nothing holds the page still under an older reader's thumb.
- **If you choose otherwise:** Marcus's "The Run": a band about three screens tall on desktop with one sticky picture in the right seven columns that plays each state as its headline crosses the middle of the screen; it reads as one continuous demo and splits back into three pictures on phones.
- **Your choice (Nov 26):** A separate picture for each of Requests, the proof and After, with no pinning, as the merged spec uses.

### 11. Where the visitor types their own firm's name
- **Options:** On the hero's desk, then gilded on the door behind and at the close (Elaine) · On the second door in Firms, replacing Northgate Payroll (Marcus) · On the close's blank plate, carried into sign-up (this merge, from Hal's blank plate and sign-up engraving, and Dev's and Priya's empty plate and frame) · At sign-up only (Tomás, Hal)
- **Used in the merged spec:** an optional field in the Close beside the blank plate; each letter engraves into the brass as it's typed, and the name pre-fills "Firm name" at sign-up, where the same plate keeps engraving (Direction D3). The Firms picture stays a clean comparison of two real example firms that every visitor sees complete, and the name is typed at the moment of decision, right beside "Run a free rehearsal".
- **If you choose otherwise:** on the second door in Firms (Marcus), the personal moment comes early and the Close shows the name already engraved; on the hero's desk (Elaine), it is the first thing a visitor can do, at the cost of a busier first screen.
- **Your choice (Nov 26):** An optional field beside the blank plate at the Close, engraving as typed and carried into sign-up, as the merged spec uses.

### 12. Where "with CoFile" sits on a client's page
- **Options:** At the foot of the sheet (Hal, Jun, Dev) · At the right end of the firm's header (Greta, Amara, Marcus, Tomás, Priya) · Just under the firm's header band (Rosa, Elaine)
- **Used in the merged spec:** at the foot of every sheet a client sees and of the proof, centred under a 40 px hairline; at the right end of the Letterhead row on the firm's own filing desk (3.4). A stationer's imprint sits at the foot, so the top of every client page belongs entirely to the firm, and our small type is the last thing a client reads.
- **If you choose otherwise:** the same 13 px line moves to the right of the firm's logo at the top of each client page (moving to the footer on phones), which makes CoFile a little more visible on every page.
- **Your choice (Nov 26):** Nowhere. Client pages and emails to clients carry no "with CoFile" mark: the client sees only the firm. CoFile appears to a client only inside the authorization text counsel confirmed ("{firm}, filing through CoFile"), which is kept as is and is what "Ours in small type" now refers to; the headline stays. The Firms picture shows the same client page in two firms' brands with nothing of ours on either.

### 13. Harbor & Pine CPA's main color
- **Options:** Pine green (Greta, Rosa, Tomás, Marcus, Priya, Amara, Hal) · Harbor blue or teal (Elaine, Jun, Dev)
- **Used in the merged spec:** Harbor `#1D4E63` as the main color with Pine `#2B5A47` as the second color (3.8, 4.7). Blue keeps the firm's "your turn" color clearly apart from the green of "Filed" on the hero's desk, and sets up the strongest contrast with Northgate Payroll's Ember `#C2410C` in the two-firms picture.
- **If you choose otherwise:** pine as the main color (for example `#2B5A47`) and a harbor blue second color (not brass, which is CoFile's); the desk then shows two greens, told apart by the chips' fill and glyph, and the two-firms picture becomes green against orange.
- **Your choice (Nov 26):** Harbor #1D4E63 as Harbor & Pine's main color with Pine #2B5A47 as its second, as the merged spec uses.

## Part 2: art direction and motion

Section numbers refer to [`02-art-direction-and-motion.md`](02-art-direction-and-motion.md).

### 14. Whether the team portraits carry visible names
- **Options:** A visible name and role with every portrait, the hero's included, and no portrait without one: "a face without a name is a stock photo" (Elaine) · Faces only, no names anywhere (Marcus, Amara; Dev's hero portraits are decorative) · Names in alt text (Tomás; the foundation's C10)
- **Used in the merged spec:** names and roles in every portrait's alt text; a visible name-and-role caption under the larger portraits on How it works, Pricing and Questions; the hero's row of three 56 px portraits carries no visible names (7.5). A named face is a real person rather than a stock photo, which matters to a firm owner deciding whether "built and run by filing professionals" is true, and the first screen has no room for three captions.
- **If you choose otherwise:** Elaine's way puts one named byline portrait beside the hero's note instead of three, and every portrait needs a name approved before it can run; Marcus's way drops the name captions everywhere, so the team's people need only agree to their photograph, not to their name.
- **Your choice (Nov 26):** Visible names and roles under the larger portraits on How it works, Pricing and Questions; faces only in the hero (names in alt text), as the merged spec uses.
- **On hold (Nov 26):** no photographs of CoFile's people for now (see "Decided Nov 26"), so this choice applies only when C10 returns.

### 15. Whether staged photographs say they're examples
- **Options:** One short caption on every staged frame that stands alone, marking it as an example (Elaine's honesty rule) · Reuse the existing words "example firm" where a photograph shows the example firm, and nothing elsewhere (Amara) · No captions on photographs; only the product pictures carry example labels (Rosa, Marcus, Greta)
- **Used in the merged spec:** one caption line `[copy needed]` on each staged photograph that stands alone and shows a cast person or an example firm's name (the door's wide frame and the engraver film on For firms, Ana and the firm owner on How it works, the printer's proof); photographs inside a labelled product picture share its label (7.10). Without it, a 40-to-65-year-old reader may take Ana or the CPA for real customers, and the site's honesty about examples is part of why it is believed.
- **If you choose otherwise:** reusing "example firm" needs no new words but leaves Ana's photograph and the printer's proof unmarked; no captions at all removes the line and relies on the product pictures' labels nearby.
- **Your choice (Nov 26):** No example captions on photographs. Only the product pictures carry their example labels; the staged photographs (Ana, the firm owner, the doors, the engraver film, the printer's proof) stand clean.

### 16. Whether the sample proof carries numbered callouts
- **Options:** Numbered callouts 1 to 4 in the margin beside the proof's blocks, as the stand-in has (Elaine, Amara, Priya, Tomás) · No callouts: the three list items beside the picture do that job, and numbers on a proof look like an inspector's marks (Hal)
- **Used in the merged spec:** the callouts, set in the margin outside the firm's sheet so they read as CoFile's mark-up, each pressing in as its block sets (7.3.2, M4). The foundation's D3 leans on Elaine's callouts for this moment, and they tie "every detail, every fee" to the places on the page a slow, careful reader will check.
- **If you choose otherwise:** the proof stands alone with no marks beside it; M4 loses its four callout beats and still ends at 2.0 s, and the phone version needs no inline numbers.
- **Your choice (Nov 26):** No numbered callouts on the sample proof; the three points beside it point at the proof instead (decision 19).

## Part 3: the home page, 9.0 to 9.4

Section numbers refer to [`03-home-page-top.md`](03-home-page-top.md).

### 17. "See pricing" in the hero: a second button or a text link
- **Options:** A secondary outline button beside or under "Run a free rehearsal" (Hal, Elaine, Dev, Priya, Jun, Rosa, Amara) · A text link with an arrow (Marcus, Greta, Tomás)
- **Used in the merged spec:** a text link with an arrow, 18 px Medium, underlined, 24 px to the right of the Brass button and wrapping under it when the column is narrow, because the hero's four-column words column can't hold two 56 px buttons side by side at most widths, the header already shows an outline "Run a free rehearsal" while the hero's is in view, and with one button the one action is unmistakable (Marcus). The prices stay one click away, set large and underlined so older readers see it as a link.
- **If you choose otherwise:** "See pricing" becomes a 56 px outline button (1 px Plate Ink edge, Plate Ink text). The pair fits on one row only at about 1440 px and wider; below that both buttons stack at the column's full width, which pushes the note and portraits about 70 px lower in the first screen.
- **Your choice (Nov 26):** "See pricing" as a text link with an arrow beside the Brass button, as the merged spec uses.

### 18. Whether the hero's team portraits carry printed names
- **Options:** One portrait with the person's name and role printed under the note (Elaine) · Up to three small portraits, with names and roles in alt text only (Dev, Priya, Marcus, Tomás)
- **Used in the merged spec:** up to three 48 px square portraits above the note, names and roles in alt text only, because a printed name line would be new copy on a locked page, and three faces say "people do this" at a glance.
- **If you choose otherwise:** one 56 px portrait beside the note with a caption line giving that person's name and role (new copy, and that person's agreement to be named on the home page); it reads like a byline and is a little more personal.
- **Your choice (Nov 26):** Asked together with decision 14: up to three small portraits in the hero, names and roles in alt text only, as the merged spec uses.
- **On hold (Nov 26):** no photographs of CoFile's people for now (see "Decided Nov 26"), so this choice applies only when C10 returns.

### 19. Whether the proof's three list items point at the proof
- **Options:** Hovering or focusing a list item outlines its part of the proof (Marcus, Rosa) · Four numbered callouts in the margin beside the sheet, with no interaction (Elaine) · Neither: the list beside the sheet does the job (Hal)
- **Used in the merged spec:** Elaine's four numbered callouts outside the sheet, leading the eye through details, fees, the state's review page and the button, with no hover link, because the foundation keeps the page still apart from its signature and interactive moments (D2), a hover effect leaves phone and keyboard readers out, and the proof should be the calmest object on the site.
- **If you choose otherwise:** each list item gets a hover and focus state that outlines its part of the proof in the firm's color with a pale wash (260 ms); the items become focusable, which needs a short spoken description for each (new copy).
- **Your choice (Nov 26):** Each of the three points beside the sample proof outlines its part of the proof with a pale wash when hovered or focused (260 ms), and when tapped on a phone; the points become focusable, each with a short spoken description ([copy needed]). Since the proof is in CoFile's look (decision 2), the outline is CoFile's ink, not the firm's color.

## Part 4: the home page, 9.5 to 9.10

Section numbers refer to [`04-home-page-bottom.md`](04-home-page-bottom.md).

### 20. How the visitor's typed firm name is lettered on the blank plate (the Close and sign-up)
- **Options:** CoFile's engraver's roman, Miller Display, with the firm-name typesetting rules: the italic "&" and small-capital "CPA" (Hal's live engraving in his house roman; Elaine's gilded name in her roman) · The example firm's own face, as on the plates the visitor has just seen in Firms (Marcus engraves Northgate's plate in Montserrat and Harbor & Pine's in Lora) · A plain grotesk, Founders Grotesk Medium, as neutral lettering
- **Used in the merged spec:** Miller Display Roman, with the "&" in its Italic and credentials in its small capitals, cut and filled black like Harbor & Pine's hand-engraved plate (9.9), because a stationer cuts a new plate in the house roman until the firm chooses its own face, and the Close and sign-up are CoFile's own pages, where Miller belongs. The italic ampersand also makes almost any firm's name look considered at the moment of decision.
- **If you choose otherwise:** in Lora, every visitor's name looks like Harbor & Pine's (a clear echo of Firms, but it lends an example firm's typeface to a real firm); in Founders Grotesk Medium, the plate reads more neutral and more like software, and less like a real engraved plate beside a door. Only the glyph atlas behind the engraving changes; the fitting rules and timings in 9.9 hold either way.
- **Your choice (Nov 26):** Miller Display Roman with the italic "&" and small-capital credentials, cut and filled black, as the merged spec uses.

## Part 5: the public pages

Section numbers refer to [`05-public-pages.md`](05-public-pages.md).

### 21. What pictures carry How it works' three steps
- **Options:** Engraved vignettes, one per step (Hal) · Photographs of the person who does each step: the client, the firm owner, a CoFile filing professional (Elaine) · Product fragments joined by a relay line with a travelling dot (Marcus, Dev, Priya) · Very large numerals alone (Greta)
- **Used in the merged spec:** Greta's numerals over Elaine's three photographs (Ana texting, the firm owner reading the proof, one of CoFile's filing professionals at work), with the firm's step on Hal's white sheet (10A.1.2), because the foundation keeps vignettes to system pages and lists these three photographs for How it works, and a firm owner learns who does what faster from three people than from three diagrams. If real staff can't be photographed, all three photographs drop and the numerals stand alone.
- **If you choose otherwise:** product fragments with a relay line make the steps a fourth moving picture on the page (the dot would play once, since nothing may be scroll-linked) and remove the step photographs from the shoot; numerals alone are the cheapest and calmest, and take away the page's only photograph of the firm owner approving.
- **Your choice (Nov 26):** Greta's large numerals over three photographs of who does each step (Ana, the firm owner, a CoFile filing professional), numerals alone if staff can't be photographed, as the merged spec uses.

### 22. Pricing: four plan cards or one rate card
- **Options:** Four separate cards, the middle one raised, edged or on heavier stock (Hal, Marcus, Priya, Dev, Jun, Rosa, Tomás; Amara's tickets) · One ruled rate card or timetable with four columns (Greta, Elaine)
- **Used in the merged spec:** one heavy price card (the home page's card stock) printed with four ruled columns, the rows aligned across plans, Growth marked only by a 3 px Brass Line rule on its column's top (10A.4.2), following the foundation's lead for Pricing (Greta), because it reads as one shop's price list rather than four boxes competing, the figures and the "A filing professional takes over when a filing needs one" line sit on the same lines across all four, and it is the same object as the home page's price card, at full size.
- **If you choose otherwise:** four 280 px cards with 24 px gutters (1 px Rule border, no shadow), Growth on the heavier stock with the 2 px edge line and the Brass Line rule along its top; on phones, four stacked cards instead of one long card. The type, figures and order don't change.
- **Your choice (Nov 26):** One heavy price card with four ruled columns, rows aligned across plans, Growth marked by a Brass Line rule, as the merged spec uses.

### 23. What we file: a progress track in every row, or the stage chip alone
- **Options:** A five-stop track or meter before each row's label (Greta, Elaine, Marcus) · The stage chip with its glyph and label (Hal, Priya)
- **Used in the merged spec:** each row's chip with the plate glyph (cut, marked out, inked) and its exact label, and one "road to live" drawn once, large, under the rehearsal stage (10A.3.2, 10A.3.3), because sixteen identical tracks make a busy table an older reader has to decode, the plate glyph already shows how far a filing has come, and one ladder explains "earns its way to live" without repeating it sixteen times.
- **If you choose otherwise:** a 120 px five-stop line (Greta's filled and hollow squares) sits before each chip in the "Where it stands" column, `aria-hidden`; the road to live under the stage can then go.
- **Your choice (Nov 26):** Each row's chip with its plate glyph and exact label, and one "road to live" drawn once under the rehearsal stage, as the merged spec uses.

### 24. For platforms: a dark page or paper
- **Options:** A dark page, or a dark title page, for a different reader (Hal, Elaine, Greta, Dev, Amara, Tomás) · Paper, like every other page (Marcus, Priya, Jun, Rosa)
- **Used in the merged spec:** paper, with the one dark object the code panel holding `"dryRun": true`, set on the rehearsal's Night with the dashed rehearsal mark (10A.7), because the foundation gives Night one meaning on CoFile's pages, the stage where a rehearsal happens, and a dry run is exactly that; a dark page would make Night also mean "technical".
- **If you choose otherwise:** the title page runs on a full-bleed Night band (Night Ink type, the white sheets of "underneath" lying on it, the code panel on Night Card), and the list and the order form return to Cotton below it; or the whole page goes Night with the order form as its one white sheet (Elaine). Night then reads as "the platform room" here and "the stage" elsewhere.
- **Your choice (Nov 26):** Paper, with the one dark object the "dryRun": true code panel on Night with the dashed rehearsal mark, as the merged spec uses.

### 25. Terms and Privacy: a sticky contents rail or contents at the top
- **Options:** A sticky contents rail beside the text, the current section marked (Marcus, Elaine, Greta, Dev, Tomás, Priya, Rosa) · A contents list at the top, like a booklet's contents page (Hal)
- **Used in the merged spec:** contents at the top, in two columns, each section number hung (10A.15), because the foundation makes the header the only sticky element on the site, and a document an owner may print reads best when its contents come first.
- **If you choose otherwise:** at 1280 px and wider, a 240 px rail in c1–c3 lists the headings and stays in view, the current one marked by a 2 px Brass Line rule; the text moves to c4–c11 and the hung section numbers move inline.
- **Your choice (Nov 26):** A sticky contents rail on Terms and Privacy: at 1280 px and wider, a 240 px rail in columns 1 to 3 lists the headings and stays in view, the current one marked by a 2 px Brass Line rule; the text moves to columns 4 to 11 and the hung section numbers move inline. On narrower screens the contents sit at the top.

### 26. How the pages behind the home page end
- **Options:** A dark close band (Marcus) · A color poster field (Greta) · A blind-embossed blank plate on a card (Hal) · A small empty frame (Priya) · The door photograph (Dev; Elaine on For firms)
- **Used in the merged spec:** words only, on a quiet Cotton 2 band above the footer's rule, with the Brass button and the copy's secondary button, except For firms, which ends on the blank plate photograph carrying the visitor's typed name, if any (10A.0.4, 10A.2.6), because the foundation keeps Night for the stage and dropped the blind impression, the home page already ends on the plate, and For firms is the one page about the firm's own name.
- **If you choose otherwise:** each close carries the blank plate photograph (or the visitor's engraved name) at 4:5 beside its words, as For firms does; the plate becomes the sign-off of every page, at the cost of seeing the same photograph four or five times in a visit.
- **Your choice (Nov 26):** Words only on a quiet Cotton 2 band with the Brass and secondary buttons; For firms ends on the blank plate with the visitor's typed name, as the merged spec uses.

## Part 6: the firm's pages and the proof

Section numbers refer to [`06-firm-pages-and-the-proof.md`](06-firm-pages-and-the-proof.md).

### 27. How the filing desk's navigation works on a phone
- **Options:** A menu button that opens a full-height sheet of the desk's pages (Hal, Priya, Dev) · A row of tabs under the header that scrolls sideways, the current tab scrolled into view (Greta, Elaine, Marcus)
- **Used in the merged spec:** the menu sheet, with the word under the menu icon and each page in a 64 px row (10B.3.2), because older thumbs miss a sideways strip and half its tabs are hidden off screen; the page's own title says where you are.
- **If you choose otherwise:** a 52 px tab row sits under the Firm Rule on phones, scrolling sideways inside itself, and the account controls move into a small menu at the row's end.
- **Your choice (Nov 26):** A menu button with the word under its icon, opening a full-height sheet with each desk page in a 64 px row, as the merged spec uses.

### 28. What a new firm sees on its empty desk
- **Options:** Its own name set very large in its own font (Greta) · Its logo large on a white sheet with its color glowing behind (Dev) · An engraved or illustrated "clear desk" (Hal, Elaine, Priya, Rosa) · A live miniature of its own client page, in its brand (Marcus)
- **Used in the merged spec:** the live miniature of the firm's own client page beside "Your desk is clear. …" and its two buttons (10B.4.2), because the copy's promise "a link with your logo on it" is then shown, not told, and the first page of a new desk is already in the firm's brand rather than ours.
- **If you choose otherwise:** the sheet's right half holds a Graphite engraved vignette of a clear desk at 160 px (the vignette set in D1 already covers it), or the firm's typeset name at display size above the sentence.
- **Your choice (Nov 26):** A live miniature of the firm's own client page, in its brand, beside "Your desk is clear. …" and its two buttons, on CoFile's desk (decision 2), as the merged spec uses.

### 29. Whether the proof's approve button follows the reader on a phone
- **Options:** A bar fixed to the bottom of the screen once the fees have been seen (Priya) · A slim sticky header keeping the firm's logo in view (Marcus) · Never sticky: the button sits at the foot, after everything (Hal, Elaine, Greta)
- **Used in the merged spec:** never sticky (10B.22.2), because the proof asks the firm to "check everything now", and a button that travels with the reader invites approving before reading; the button is full width and 60 to 80 px tall where it is.
- **If you choose otherwise:** a 64 px white bar with "Approve, and authorize submission and payment" appears at the bottom of the phone screen once "State fees" has scrolled past, and slides away while the decision area is on screen.
- **Your choice (Nov 26):** Never sticky: the approve button sits at the end of the proof, full width, as the merged spec uses (part 8 agrees).

### 30. How the Branding page previews the firm's brand
- **Options:** Every surface at once, live: the client page, the proof's head, the email, the desk header (Hal, Marcus, Priya) · One preview at a time behind tabs or a toggle (Elaine, Dev) · The client page alone (Greta, Rosa)
- **Used in the merged spec:** all four at once, the client's page large at 0.8 scale and the other three as thumbnails that swap into the large slot (10B.7.5), because seeing one color choice land everywhere at once is the moment that sells "your brand on everything", and the thumbnails keep the large preview readable.
- **If you choose otherwise:** with tabs, the panel shows one surface at a time at a larger scale and needs four tab labels; with the client page alone, the panel is simpler and the proof and email are first seen only when a real one arrives.
- **Your choice (Nov 26):** All at once, live: the client page large, with the firm's page for a filing and an email to a client as thumbnails that swap into the large slot. Under decision 2 the proof and the desk header are no longer previews (they are in CoFile's look), so the set is the three client-facing surfaces, not four.

### 31. Whose color Billing wears
- **Options:** The desk's register: the firm's ink marks its current plan and fills the usage meter (Hal, Marcus, Greta) · CoFile's neutral: graphite meter and plain cards, since billing is the firm's account with CoFile (Priya)
- **Used in the merged spec:** the desk's register (10B.18): the current plan's card carries the Firm Rule, the meter fills in `--firm-fill`, prices in Founders Grotesk, no Brass or Miller, because every page under the firm's Letterhead should read as the firm's own office, and a sudden CoFile-colored page inside it would look like leaving it.
- **If you choose otherwise:** the meter and the plan marker become Plate Ink and Graphite, and Billing is the one desk page with no firm color below its Letterhead.
- **Your choice (Nov 26):** Settled by decision 2: Billing is part of the filing desk, so it is in CoFile's look (Plate Ink and Graphite meter and plan marker, Brass for the one main action), not the firm's ink.

### 32. Where a client presses "Send to {firm}" on a phone
- **Options:** A submit bar fixed to the bottom of the screen that joins the flow at the end of the form (Greta) · The button at the end of the form only (Hal, Priya, Elaine, Marcus, Rosa, Dev)
- **Used in the merged spec:** at the end of the form only, full width (10B.24.2), because a long state form should be read to its end, the authorizations sit just above the button, and a fixed bar would cover the fields a client is typing into.
- **If you choose otherwise:** a 64 px white bar holds the button at the bottom of the phone screen, hidden while a field has focus, and sending early shows the error summary for the fields still empty.
- **Your choice (Nov 26):** "Send to {firm}" at the end of the form only, full width, as the merged spec uses.

## Part 7: platforms and emails

Section numbers refer to [`07-platforms-and-emails.md`](07-platforms-and-emails.md).

### 33. Whose letterhead the filing company's notices carry
- **Options:** The firm's letterhead ("Choose a name", "Review before submit", "Site changed — review needed" and the rest set like every other filing email) (Hal, Greta, Jun, Rosa, Tomás, Elaine, Marcus, Priya, Amara) · CoFile's letterhead, with the firm named above the headline (this merge, following who receives them in `src/comms/render.ts` and `src/comms/notifier.ts`)
- **Used in the merged spec:** CoFile's letterhead (10D.1, 10D.12), because the product sends these notices only to the subscriber's own staff, the people who run the filings from CoFile's dashboard, never to a firm or its clients. A firm's letterhead would put the firm's name at the head of a letter the firm never receives; a context line still says which firm the filing belongs to.
- **If you choose otherwise:** the seven notices take the firm's Letterhead, the firm's button color and the Imprint, and the context line above the headline goes.
- **Your choice (Nov 26):** Settled by decision 2: these notices go only to a subscriber's own staff, who work in CoFile's dashboard, so they carry CoFile's letterhead with the firm named above the headline, as the merged spec uses.

### 34. How the EIN reaches the firm by email
- **Options:** A separate "EIN issued" email the moment the IRS issues the number, its words still to be written (Hal, Dev, Greta, Jun, Rosa, Tomás, Amara, Marcus, Priya) · Inside the documents-back email, the EIN set large on the CP 575's row (Elaine)
- **Used in the merged spec:** inside the documents-back email (10D.7), with the stand-alone email drawn and parked (10D.8). It needs no new words and no new engine message, the number arrives beside the IRS letter that proves it, and a firm never gets two emails for one EIN.
- **If you choose otherwise:** the engine also renders `filing.ein_filed` as its own email, designed in 10D.8 (its subject, headline and body are `[copy needed]`). For a formation whose EIN comes during the run, the firm gets the number days before the formation's papers.
- **Your choice (Nov 26):** Normally the EIN arrives inside the documents-back email, set large on the IRS letter's (CP 575) row. If the number was issued but the letter wasn't saved (it shouldn't happen), the stand-alone "EIN issued" email goes out with just the number, so the firm is never left without it. Its words are [copy needed].

### 35. Whether emails carry a picture
- **Options:** No pictures, the letterhead and type only (Greta, Elaine) · An engraved or drawn illustration on a few emails (Hal: the envelope, the door and the plate; Priya: the welcome emails only; Rosa: an envelope, an arch, a door; Jun: a band image) · A photograph or rendered scene as a header image (Tomás, Marcus, Amara, and Dev's rendered door with the firm's monogram)
- **Used in the merged spec:** one engraved vignette on two kinds of email only: the returned envelope on documents back (in Graphite, on the firm's emails) and the blank Name Plate on the two welcome emails (in Plate Ink, on CoFile's). Every other email is letterhead and type (10D.7, 10D.15). Vignettes are the foundation's picture for emails (D1), weigh a few kilobytes, survive Outlook's blocked images because nothing depends on them, and mark the two moments that matter: the papers coming home, and the plate waiting for a new firm's name.
- **If you choose otherwise:** "none" removes two small PNGs and changes nothing else; photographs add 600 × 200 header images, blocked by default in Outlook and heavier on phones, and a server step to composite each firm's color or monogram into them.
- **Your choice (Nov 26):** One engraved vignette on two kinds of email only (the returned envelope on documents back, the blank Name Plate on the welcome emails); every other email is letterhead and type, as the merged spec uses. Both are now emails to the firm, in CoFile's look (decision 2).

### 36. Syntax color in the docs' code samples
- **Options:** A full syntax palette in several hues (Dev, Priya, Marcus, Rosa, Tomás, Amara) · Three or four tones drawn from the site's colors (Hal, Elaine) · Typographic only: weight for structure and one grey for comments (Greta)
- **Used in the merged spec:** typographic only, on Plate Ink plates (10C.16): keys, keywords and literals in Founders Grotesk Mono Medium, values in Regular, comments in grey. Every color on the site already means something (the firm, a status, Brass for the one action), so a code palette would either borrow those meanings or add hues used nowhere else; with none, the rehearsal's dashed `"dryRun": true` is the one mark in a block.
- **If you choose otherwise:** a palette adds four or five hues for code only, each checked at 4.5:1 on Plate Ink and kept apart from the status, firm and Brass colors; Hal's own version (copper strings, verdigris keys) would become Brass strings and pale verdigris keys.
- **Your choice (Nov 26):** Typographic only on Plate Ink panels: weight for structure, one grey for comments, as the merged spec uses.

### 37. The sender's name on the firm's emails
- **Options:** "CoFile", as the product sends today · The firm's name, from `filings@cofile.app`, replies going to the firm (this merge) · Both names, such as "‹Firm› via CoFile" (needs its wording)
- **Used in the merged spec:** the firm's name (10D.1), with Reply-To the firm's support email when it has one. The inbox row is the first thing a firm owner or a client sees of every message, and "Your name on the door. Ours in small type." should hold there too; the sending address and the Imprint at the foot still say who sent it.
- **If you choose otherwise:** "CoFile" makes ours the first name a client sees on every filing email; a "via" form names both and needs its wording `[copy needed]`. CoFile's own emails are sent as "CoFile" either way.
- **Your choice (Nov 26):** Emails to the firm are sent as "CoFile" (decision 2). Emails to the firm's clients are sent under the firm's name with replies to the firm; a firm that connects its own email domain in Setup sends from it, and until then they come from a CoFile sending address.

## Part 8: components and production

Section numbers refer to [`08-components-and-production.md`](08-components-and-production.md).

### 38. Whether the form marks the answers it filled in for the firm
- **Options:** No marking: filled fields look like any typed answer, and the notice at the top of the form says where they came from (Hal) · A colored edge on each filled field (Marcus) · A wash and a small dot with a tooltip (Dev) · A brief flash as the fields fill (Amara)
- **Used in the merged spec:** a 3 px edge in the firm's main color and the firm's row tint on each filled field until someone edits it, with the product's existing notice saying where the answers came from (11.3). "Nobody retypes it" is one of the copy's main claims, and the home page's draft picture shows the filled rows marked; the real form should let the firm's team see at a glance which answers they are checking, so the picture stays true to the product.
- **If you choose otherwise:** filled fields look like any typed answer and only the notice says where they came from; the home page's "from the text" and "already filled" tags then describe something the product doesn't show, so the picture should drop them.
- **Your choice (Nov 26):** A 3 px edge and a light tint on each answer CoFile filled in, until someone edits it, with the existing notice saying where the answers came from. On the desk this is in CoFile's colors (decision 2), not the firm's.

### 39. What is built first after the proof and the client's pages
- **Options:** The home page next, then the desk (Hal, Jun, Greta, Amara) · The desk next, then the home page (Marcus, Priya, Elaine, Dev, Tomás, Rosa)
- **Used in the merged spec:** the desk is started first, with the home page overlapping a week behind it (13.5, phases 2 and 3). Firms use the desk every day, the copy's promise is kept there, and the home page's hero picture is the real desk built from its components, so building the desk first means the picture is real from the start.
- **If you choose otherwise:** the home page can go live about three weeks sooner (around week 6 instead of week 9), with its desk and client-page pictures built from provisional components that are rebuilt when the desk lands.

Part 8 also settled two choices already recorded for part 6, the same way: the proof's approve button is never sticky on phones (decision 29) and the desk's phone navigation is a menu sheet (decision 27).
- **Your choice (Nov 26):** The filing desk is started first, with the home page a week behind it, as the merged spec uses.

