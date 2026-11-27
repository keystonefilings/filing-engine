# Words the design needs: `[copy needed]`

The copy is locked, so the merged design uses only words that exist. Where a design needs words the site doesn't have yet (alt text, accessible names for controls, captions, small labels), each part marks it `[copy needed]` and lists it. This file gathers those lists, part by part, as each part wrote them, so the copy owner can write them in one pass. Some items repeat across parts where two surfaces need the same words.

## Slips found in the live copy (fixed Nov 26)

Found by the merge writers, checked against the code and fixed at the owner's request:

- **"…no filing deskal now."** The dashboard's message after a firm's filing desk is turned off now
  reads "Saved. This firm has no filing desk now." (`web/app/dashboard/(app)/firms/[id]/actions.ts`).
- **"1 approved filing is ready to pay and need…"** With one filing it now reads "needs"; with
  several, "need" (the filing desk, `web/app/p/[slug]/(portal)/page.tsx`, and the dashboard,
  `web/app/dashboard/(app)/page.tsx`).
- **"…until you send it and your client approves."** The reply to a request forwarded by email,
  text or Slack now says "…until you send it and you approve the proof." to a partner firm, and
  "…until you send it and the proof is approved." to a firm a subscriber set up, whose approvers
  may be other people (`src/inbound/requests.ts`). The Slack `/file` help, shown before CoFile
  knows who is typing, says "…until you do and the proof is approved." (`src/inbound/slack.ts`).
  The API docs and catalog still say "the client approves"; that is left as is, since a
  platform's approvers are set per account.

## Words added with the owner's request (Nov 26), to confirm

The owner asked that a firm see, on its filing desk, which of its clients sent filings and where each
one is up to. The product now shows it with these words, chosen to match the copy; the copy owner
may change them:

- Column heading **"Sent by"**; a **"Your client"** chip on filings a client sent through their
  link; **"Your team"** when the person isn't known.
- The five steps under each status: **"Details", "Proof", "Filing", "With the state", "Done"**,
  shown as "Proof, step 2 of 5" (read aloud as "Step 2 of 5: Proof").

## Stand-in words in the build (Nov 26), to replace or confirm

The build needed words where the spec says `[copy needed]`. These stand in until the copy owner writes them; each is
one string in the code. The owner chose to ship with them as they are for now (Nov 26).

| Where | Stand-in | Spec |
|---|---|---|
| Desk and dashboard: the skip link | "Skip to content" | 10B.3.1 |
| Desk on phones: the menu button and the sheet's close button | "Menu", "Close" | 10B.3.2 |
| Empty desk: the accessible name of the client page preview | "Preview: the page {firm}'s clients see" | 10B.4.2 |
| Branding: the two thumbnail captions | "Your page for a filing", "An email to a client" | 10B.7.5 |
| Branding: a thumbnail's accessible name | "Show larger: {caption}" | 10B.7.5 |
| Branding: the logo bay's two captions | "as uploaded", "on your pages" (the spec's own suggestion) | 10B.7.3 |
| Branding on phones: the preview sheet's title | "Previews" | 10B.7.6 |
| Branding: the ink match line's spoken text | "Buttons print as {hex}", "Buttons print as {hex}, from {hex}" (no visible explanation line yet) | 10B.7.4 |
| Desk: the not-found page's button back to Filings | "Filings" | 10B.21 |
| Setup: the email-domain card | "Your email domain" (optional), "Send your clients' emails from your own address.", "Connect" / "Change", chips "Waiting for records" and "Connected" | 10B.5 |
| The email-domain page (every word) | title "Your email domain"; lede "Emails to your clients go out under your firm's name. Until you connect your own domain, they come from a CoFile address; once it's connected, they come from yours."; "Your domain"; "Connect domain"; "Check again"; "Add these records where your domain's DNS is managed"; heads "Type", "Name", "Value", "State"; chips "Not found yet", "Found"; "Copy" / "Copied"; "Connected. Your clients' emails now come from {address}."; "Your clients' emails keep coming from the CoFile address under your firm's name until the records are found."; "The records stopped resolving. …"; "Disconnect" and its confirmation; errors "Enter a domain like yourfirm.com.", "That domain can't be used for sending.", "Connecting a domain isn't available yet."; the inbox row's name "How your clients see your emails" | 10B.5.1 |
| Every moving picture: the replay control's name and tooltip (home, How it works, What we file) | "Play again" | D7, 10A.0.5 |
| Home hero: the waiting row's hidden hint; the client page's group name | "Goes to the sample proof below"; "The page Harbor & Pine CPA's clients see" | 9.1 |
| Home 2: the two door photographs | "A brass name plate engraved Harbor & Pine CPA beside a blue door", "A steel name plate engraved Northgate Payroll beside a glass door" | 9.2 |
| Home 2: the wipe handle | name "Compare the two firms' pages"; spoken values "{n}% of Harbor & Pine CPA's page in Northgate Payroll's brand", "{n}% of Northgate Payroll's page in Harbor & Pine CPA's brand", "Each page in its own firm's brand" | 9.2 |
| Home 3: the bakery photograph (C5) | "A baker reading a text message on a phone at the counter" | 9.3 |
| Home 4: the three points beside the sample proof | "Outlines the state's review page on the sample proof.", "Outlines the fees, the total and the payment screen's total on the sample proof.", "Outlines the Approve for filing button on the sample proof." | 9.4 |
| Home: the stage photograph (C7) | "An empty stage lit by a single ghost light" | 9.7 |
| The Close (home and For firms) | field label "Your firm's name"; hidden description "As you type, each letter is engraved on the blank plate in the photograph."; plate alt "A blank brass name plate beside a blue door", and with a name "A brass name plate engraved {name} beside a blue door" | 9.9, 10A.2.6 |
| How it works: the step photographs | "A baker typing a text message on a phone"; "A firm owner reading a proof on a laptop" (also For firms' C8); "An envelope addressed to Harbor & Pine CPA on a walnut desk"; "A printer's proof of letterhead, initialled in pencil"; "An opened envelope with its papers on a walnut desk" | 10A.1 |
| How it works: the five points beside the sample proof | "Outlines the {part} on the sample proof." for the business's details, the fees and the total, the state's review page, the statements, the Approve for filing button | 10A.1.3 |
| For firms | engraver photograph (C11) "An engraver polishing a brass plate engraved Harbor & Pine CPA"; the saved-agent picture "The saved registered agent and answers on an example draft"; the studio's group name "Try your firm's name and color"; its thumbnails reuse Branding's stand-ins above | 10A.2 |
| Terms and Privacy: the contents list's name | "Contents" | 10A.15, 10A.17 |
| Pictures left without words: the What we file stage photograph (inside the figure "Example rehearsal log"), the sign-up plate photographs, the For platforms picture | decorative for now (no alt text written) | 10A |
| Dashboard and docs: the copy buttons' confirmation | "Copied" (shown and announced) | 10C |
| Docs: each code block's accessible name | the language: "bash", "http", "javascript", "json", "python" | 10C |
| Dashboard: the hidden heads of the action columns | "Approve" (Partners), "Revoke" (API keys) | 10C |
| The EIN email to a client, when the IRS letter isn't among the papers | subject "EIN issued: {filing}"; sentence "The IRS has issued the EIN for this filing." | 10D.18 |

## Part 1: the foundation

From [`01-foundation.md`](01-foundation.md).

| Where | What |
|---|---|
| Every photograph and every added picture (the doors, the blank plate, the bakery, the desk still life, the stage, the team, the engraver film, the vignettes) | Alt text; for the team, each person's name and role |
| The Close | The label of the optional firm-name field; an accessible description of the engraving |
| Moving pictures | The accessible name of the replay control |
| Home 2 | The accessible name of the wipe handle |
| Header (phone) | The word on the menu button ("Menu") and the menu sheet's accessible name |
| Branding setup | The label of the setting that shows or hides the typed name beside the logo; one line explaining a deepened button color; whether "Button text is white, so choose a dark color." changes once the ink match ships; the note when a raster logo is too small to show sharp |
| The engraver film | The craftsperson's credit and a text description for screen readers |
| Examples | Two more example firm names for the Branding page and docs |
| Home 4, the sample proof | A short spoken description for each of the three points beside it, saying which part of the proof it outlines (three items) |
| For firms | Whether the list line "The only sign of us is a small “with CoFile”." changes, now that no such mark appears to a firm's clients (3.4) |
| Setup | The words of the new step where a firm connects its own email domain, so emails to its clients come from it (6.8) |

## Part 2: art direction and motion

From [`02-art-direction-and-motion.md`](02-art-direction-and-motion.md).

Items already listed by the foundation (D7) are marked "(D7)"; the rest are new here.

| Where | What |
|---|---|
| Every photograph (C1 to C11) | Alt text, as 7.11 describes each (D7) |
| The team (C10) | Each person's name and role, for alt text and for the captions on How it works, Pricing and Questions (D7) (on hold: no photographs of CoFile's people for now) |
| Home 1, the desk (L1) | **New:** a sample email address for Ana Ortiz, to show under her name in the desk's "Sent by" column; until one is supplied, her name stands alone |
| The Close (M9) | The optional field's label; an accessible description of the engraving (D7) |
| Moving pictures | The replay control's accessible name (D7) |
| Home 2 and For firms (M2) | The wipe handle's accessible name (D7) |
| Home 4, the sample proof (M4) | **New:** a short spoken description for each of the three points beside the proof, saying which part of the proof it outlines (three items) |
| The engraver film (M11) | The engraver's credit; a text description for screen readers (D7); **new:** accessible names for the film's pause, play and replay control |
| For firms (L11, L12) and For platforms (L13) | **New:** accessible names for the three added product pictures; L13's figure caption |
| How it works (M14) | **New:** sample statement text for the proof, if "Each statement on the form, and who made it…" is to point at a region; otherwise it points at nothing |
| Branding setup (P8) | One line explaining a deepened button color (D7, from 3.6) |
| Example firms (7.8) | Two more example firm names for Branding and the docs (D7) |

## Part 3: the home page, 9.0 to 9.4

From [`03-home-page-top.md`](03-home-page-top.md).

New items this part adds (beyond D7's list):

| Where | What |
|---|---|
| Header (phone) | The menu button's word while the menu sheet is open (for example "Close") |
| Header | The words of the "Skip to content" link, the first focusable element on every page |
| Hero, the desk picture | A short, visually hidden description for the waiting row's link, saying it goes to the sample proof below |
| Hero, the desk picture | An example email address for Ana Ortiz, to sit under her name in the "Sent by" column, if one is wanted (also raised in part 2, L1); until then her name stands alone, as D4 has it |
| Hero, the client page in front | The accessible name of the client page lying in front of the desk (a `group`), saying it is the page the firm's clients see |
| Firms, the wipe handle | The spoken value (`aria-valuetext`) saying how much of which page shows the other firm's brand |
| The proof, the three points | A short spoken description for each of the three points beside the sample proof, saying which part of it the point outlines (three items; also in the foundation's D7) |

Items from D7 that this part uses: the alt text of the door photographs (C1, C2), of Ana's
photograph (C5) and of each team portrait with the person's name and role (C10) (the portraits on hold: no photographs of CoFile's people for now); the accessible name
of the replay control; the accessible name of the wipe handle; the word "Menu" on the phone's menu
button and the menu sheet's accessible name.

The words the desk picture shows in its "Sent by" column and under its chips ("Sent by", "Your
client", "Your team", "Proof, step 2 of 5" and the five step names) are the product's own, already built
and listed for the copy owner in `COPY-NEEDED.md`; they need nothing new here. No staged photograph
in this half carries an example caption (decision 15), so none is needed.

## Part 4: the home page, 9.5 to 9.10

From [`04-home-page-bottom.md`](04-home-page-bottom.md).

**New, raised by this part:**

| Where | What |
|---|---|
| 9.10 Footer | The appearance switch: its group label and its three options (light, dark, and following the device's setting) |

**Already raised in the foundation (D7), placed here:**

| Where | What |
|---|---|
| 9.5 After, 9.6 Coverage, 9.7 Rehearsals | The accessible name of the replay control |
| 9.7 Rehearsals | Alt text for the stage photograph (C7) |
| 9.9 Close | The label of the optional firm-name field; the visually hidden description of the engraving it drives; alt text for the blank-plate photograph (C3 and C4) |

Everything else in these bands is existing copy: the coverage tooltips use `statusOf`'s labels, the
pictures use the stand-ins' labels and the example data in D4, and the After photograph is
decorative (`alt=""`) inside a figure that keeps the stand-in's accessible name.

## Part 5: the public pages

From [`05-public-pages.md`](05-public-pages.md).

Beyond the foundation's list (D7: alt text for every photograph, replay controls, the Close's
field, "Menu", the engraver film's credit and description), these pages need:

| Where | What |
|---|---|
| How it works, step 3 (10A.1.2) | The caption under the C10 photograph: the filing professional's name and role (on hold: no photographs of CoFile's people for now) |
| How it works, the proof (10A.1.3) | A short spoken description for each of the five list items that outline their part of the sample proof (the detail rows, the fees and total, the state's review page, the Authorizations group, the button), five items |
| For firms, the desk (10A.2.2) | New words for the list item "Your client sees your firm on the form and in every email. The only sign of us is a small “with CoFile”.": client pages and emails to clients no longer carry "with CoFile" (decisions file) |
| For firms, the desk (10A.2.2) | Confirmation or new words for the h2 "Your filing desk, in your brand." and the item "Your filing desk carries your firm's name, logo and color.": the desk is now in CoFile's look, with the firm's name and logo as its account (decisions file) |
| For firms, the film (10A.2.1) | The accessible names of the film's pause and play control |
| For firms, the desk (10A.2.2) | An example email address for Ana Ortiz under her name in the "Sent by" column (as art direction's L1); until then her name stands alone |
| For firms, the studio (10A.2.2) | The accessible name of the studio's control group |
| For firms, the studio (10A.2.2) | The accessible names of the three previews as thumbnail buttons (the client's page, the firm's page for a filing, an email to a client) |
| For firms, close (10A.2.6) | The alt text pattern for the plate when it carries the visitor's typed name |
| Pricing, title page (10A.4.1) | The names and roles of the filing professionals in the three portraits (alt text) (on hold: no photographs of CoFile's people for now) |
| Questions, "Is a person involved?" (10A.6.2) | The name and role of the person in the portrait (alt text) (on hold: no photographs of CoFile's people for now) |
| For platforms, "underneath" (10A.7.1) | The picture's accessible name (and a caption, if the owner wants one beyond the proof's label) |
| Sign-up and Choose a new password (10A.9.2, 10A.12.2) | The two labels of the optional show-password control; without them it's left out |
| Terms and Privacy (10A.15) | The accessible name of the contents list |

---

## Part 6: the firm's pages and the proof

From [`06-firm-pages-and-the-proof.md`](06-firm-pages-and-the-proof.md).

| Where | What |
|---|---|
| Desk shell (10B.3) | The accessible name of the "Ready to pay" count; "Skip to content"; the phone menu button's word ("Menu") and the sheet's close button ("Close") |
| Overview (10B.4) | The accessible name of the empty desk's preview of the firm's own client page; whether the list's "Test" chip should read "Rehearsal", as on the filing's own page (Priya). The owner's new words ("Sent by", "Your client", "Your team", and the five steps "Details", "Proof", "Filing", "With the state", "Done", shown as "Proof, step 2 of 5" and read "Step 2 of 5: Proof") are already in the product and listed for confirmation in `COPY-NEEDED.md` |
| Setup and the email-domain step (10B.5, 10B.5.1) | On Setup: the step's title, its line, its button and its two chip labels (records still missing, connected). On its page: the title; the paragraph (what connecting does, and that until then emails to clients come from a CoFile sending address under the firm's name, with replies to the firm); the domain field's label and its two errors; the connect button and the check-again button; the records sheet's title and its four column heads; the two record-state labels; "Copy" and "Copied"; the connected, still-waiting and failed messages; the disconnect button and its confirmation; the accessible name of the inbox preview |
| Your firm and Branding (10B.7) | A short note when Branding opens with a color chosen in For firms' preview; two notes after a font upload ("used for your name only", "falls back where letters are missing"); the two captions in the logo bay ("as uploaded", "on your pages"); the label of the show-or-hide-the-name setting (also in the foundation's list); the note when a raster logo is too small (also in the foundation's list); one line explaining a deepened button color (also in the foundation's list); one line explaining that a light color's buttons print with dark text; one line explaining that links use a darker shade; two preview captions (the firm's page for a filing, an email to a client) and the accessible name of the swap control |
| Branding on phones | "Close" for the preview sheet (the same word as the menu's) |
| New filing (10B.11) | "Copy" and "Copied" for the page addresses and the widget code |
| The desk's form (10B.12.1) | The visually hidden line naming where a filled-in answer came from ("Filled in from your saved answers" / "Filled in from your message"; part 8 asks for the same words) |
| Filing detail (10B.13) | The hidden hint that "Open the proof and approve it" opens in a new tab |
| Client links (10B.14) | "Copied" after "Copy link"; the accessible name of the preview of the page the link opens |
| Errors (10B.21) | The desk's version of "Go to the home page" |
| The proof (10B.22, 10B.23) | "Close" for the review picture's viewer; the print footer's page wording; a heading for the change-request page; a link back to the proof after a code that didn't match; a short page for a proof link that fails to load |
| Example firms (10B.2.3) | The awkward brand's name, one of the two spare example firm names the foundation already asks for |
| Copy notes (no new words) | The Branding help "Button text is white, so choose a dark color." no longer holds for light colors once the ink match ships (foundation 3.6). Setup's line "Three short steps, plus registered agents if you want them." doesn't mention the new email-domain step. Decision 12 has a client meet CoFile's name only in the authorization text ("{firm}, filing through CoFile"), but the client pages' legal line also names it ("By sending, you agree to CoFile's Terms of Service; your details are handled under its Privacy Policy."); it is kept as written, for the copy owner and counsel to decide |

## Part 7: platforms (10C)

From [`07-platforms-and-emails.md`](07-platforms-and-emails.md).

**`[copy needed]`**

| Where | What |
|---|---|
| Every Copy button (new key, signing secrets, invitation link, widget code, docs code) | A short confirmation shown for 2 s after copying, e.g. "Copied" |
| A firm's page in the dashboard, color fields | The foundation's line explaining a deepened button color (3.6, D7), reused here |
| Sign-ups, "Decided" | A label for a turned-down sign-up (the product shows the raw status "rejected") |
| Sign-ups, the firm's kind | A label for a title company: the product's kind map has "CPA", "Payroll", "CFO" and "Other" but sign-up offers "Title company", which shows nothing today |
| Filings, "Type" column; the email subjects (10D) | Whether to show the desk's filing titles ("New Jersey LLC formation") instead of the engine's "NJ formation" / "NJ llc formation": existing words, but the copy owner should confirm the change |

**Copy notes** (possible slips in the locked copy, for the copy owner; the design quotes them as
they are):

- `web/app/dashboard/(app)/firms/[id]/actions.ts`: "Saved. This firm has no filing deskal now."
  reads as a typo.
- The Overview's notice: "1 approved filing is ready to pay and need a card's security code." (the
  singular takes "needs").
- Sign-ups' lede says "nothing is emailed, so let them know yourself", but approving sends "Your
  partner account is open" (`src/users/routes.ts`).
- The reply to a request sent by email says "Nothing is filed until you send it and your client
  approves." while the firm approves the proof (`src/inbound/requests.ts`).
- `/docs.md`'s section names differ from the HTML guides' ("How a filing goes" against "Filings and
  the lifecycle"); aligning them is a copy choice.
- Under decision 2 the filing desk is in CoFile's look, with the firm's name and logo as content,
  and only the firm's client pages carry its colors. Two lines still describe a desk in the firm's
  brand: the Firms lede "Give a firm its own branded filing desk, then invite its staff."
  (`web/app/dashboard/(app)/firms/page.tsx`) and the White-label firm portal guide's "Give a CPA or
  payroll firm its own branded filing portal." and "a portal on this site at /p/<slug>, in the
  firm's own name, logo and color" (`web/app/docs/guides.tsx`).

---

## Part 7: emails (10D)

From [`07-platforms-and-emails.md`](07-platforms-and-emails.md).

**`[copy needed]`**

| Where | What |
|---|---|
| EIN issued (10D.8), the fallback sent only when the IRS letter wasn't saved | Its subject, headline and body |
| Setup on the filing desk, the new step that connects the firm's own email domain (the firm's-pages part designs the step; 10D.1 depends on it) | Its words: the step's title, its explanation, its field labels and help, its results and errors |
| "Completed: …" (10D.7) | Optional: a button label for the filing page; the product's default "Open" is used until then |
| Every filing email's subject and its headline's second line | Whether the filing title uses the desk's titles ("New Jersey LLC formation") instead of the engine's "NJ llc formation" (also in 10C.21) |

**Copy notes.** The product's link fallback "Or paste this link into your browser:" is 13 px in
`src/comms/resend.ts`; the design sets it at 15 px (the floor for a line of more than six words).
The reply to an emailed request says "your client approves" (10C.21). "More information needed"
and "Rejected by the state" have one body each, written to a client ("Please send these details to
whoever is preparing this filing for you.", "Contact whoever prepared this filing for you to fix
it."), but they go to the firm's approvers whenever the firm has them (`src/comms/notifier.ts`), and
now on CoFile's letterhead; the copy owner may want a firm's version of each sentence.

---

## Part 8: components and production

From [`08-components-and-production.md`](08-components-and-production.md).


| Where | What |
|---|---|
| Every page (11.2) | The skip link's words, e.g. "Skip to content" |
| The home page's sample proof (11.5) | Three short spoken descriptions, one for each point beside the proof, saying which part of the proof it outlines |
| Plate fields and code blocks (11.3, 11.15) | A copy confirmation for "Copy link" and "Copy" (e.g. "Copied"), and a "Copy" label for docs code blocks |
| Filled-in fields (11.3) | A short hidden line naming the source of a filled answer ("from your saved answers", "from your message") |
| "Same as" and "Same person as" (11.3) | A short spoken confirmation that the details were copied |
| Desk navigation (11.6, 11.10) | The count badge's accessible name (e.g. "2 waiting"); the desk menu sheet's accessible name |
| Phone menu sheets (11.10) | The close button's accessible name ("Close menu") |
| Footer (11.10, 12.1) | The theme control's label and its three options |
| Docs (11.10) | The heading of the right rail ("On this page") |
| Toasts (11.12) | The close button's accessible name |
| Engraver film (11.17) | The pause and play buttons' accessible names |
| Dialogs (11.17) | Confirmation words for "Remove", "Turn off" and "Revoke" wherever the product has none |
| Consent notice (11.11) | Its words and buttons, only if one is ever legally required |
| Branding (12.4) | The note to the firm when an uploaded font lacks Spanish accents |
| Setup (13.5) | The words of the new step where a firm connects its own email domain, so emails to its clients are sent from it (decision 37) |
| For firms (14, row 30) | New wording for two locked lines that now describe what the product no longer does: "The only sign of us is a small “with CoFile”." and "Your filing desk carries your firm's name, logo and color." (the desk now shows the firm's name and logo, in CoFile's look) |

D7's items (the Menu word, the menu sheet's name, replay, wipe handle, alt text and the rest) stand
as listed in the foundation and are not repeated here.

