# Email rendering tests: a brief for a testing service

> **On hold (owner, Nov 26).** No subscription for now: the emails are tested by sending real ones to real
> Gmail, Outlook and Apple Mail inboxes and looking at them, with Resend sending. See `docs/email-testing.md`.

Weeks are counted from the start of our build (week 1).

## Who we are

CoFile (cofile.app) is a filing service for accounting, payroll, fractional-CFO and title firms. A
firm uses it to file state business filings for its clients, such as LLC formations, payroll
registrations and EINs, under the firm's own brand. CoFile sends every email about a filing. Emails
to the firm come from CoFile. Emails to the firm's clients go out under the firm's own name, and
nothing of CoFile appears on them.

## What we need

We need a subscription to an email-testing service. It must show how our emails really render in
Outlook, Gmail, Apple Mail and the other clients listed below, in light and dark mode, with images
on and with images off.

Our build agent will run the tests through the service once we have an account. The build agent is
Claude, an AI model that works in our code. The owner reviews the results.

## Scope

### Two letterheads, one template

Every email is built from one template with one of two letterheads. The body, the button, the sizes
and the build are the same in both. Which letterhead an email gets depends on who receives it.

**CoFile's letterhead** goes on three kinds of email:

- emails to the firm (its approvers and staff);
- emails to the staff of software platforms that use our API;
- CoFile's own account emails.

These emails are sent as "CoFile". They show CoFile's logo, centred at the head, with a serif
headline in Georgia and one gold button (#D9A84A) with dark text.

**The firm's letterhead** goes on emails to the firm's clients. They are sent under the firm's name,
and replies go to the firm. They come from the firm's own email domain once the firm connects one,
and from a CoFile sending address until then. They show:

- the firm's logo, with a white plate baked into the image;
- the firm's name;
- a three-line color rule in the firm's colors (3 px, a 2 px gap, then 1 px);
- a button in the firm's color.

Nothing of CoFile appears on them anywhere.

### Every email

There are 21 emails. Six of them also have a version on the firm's letterhead, so there are 27
versions to test in all.

| # | Email (its subject) | On CoFile's letterhead | On the firm's letterhead |
|---|---|---|---|
| 1 | "Your proof is ready to approve: ‹filing›" | Yes | Yes, only when a filing has no approvers (a platform's own client approving) |
| 2 | "Completed: ‹filing›" (the documents are back, with the EIN when the IRS letter is among them) | Yes | Yes |
| 3 | "EIN issued" (sent only if the EIN was issued but the IRS letter wasn't saved; its words are still being written) | Yes | Yes |
| 4 | "Card security code needed: ‹filing›" | Yes | No |
| 5 | "More information needed: ‹filing›" | Yes | Yes |
| 6 | "Changes requested: ‹filing›" | Yes | Yes |
| 7 | "Rejected by the state: ‹filing›" | Yes | Yes |
| 8 | "You're invited to ‹firm›'s filing portal" | Yes | No |
| 9 | "Ready to check: ‹subject›" (the reply to a filing request sent by email) | Yes | No |
| 10 | "Filing by email works from a firm's portal" | Yes | No |
| 11 to 17 | Seven notices to platform staff: "Choose a name", "Review before submit", "Site changed — review needed", "Portal bot check", "Failed", "Blocked", "Checking whether the state received" | Yes | No |
| 18 | "Confirm your email for CoFile" | Yes | No |
| 19 | "Reset your password" | Yes | No |
| 20 | "Your partner account is open" | Yes | No |
| 21 | "Your CoFile account is ready" | Yes | No |

### Variants to test

**Content variants:**

- A rehearsal (a practice run, where nothing is filed) or a real filing. A rehearsal adds a dashed
  band under the headline.
- Documents back, in four forms:
  - documents with the EIN in a large value box;
  - documents without an EIN;
  - "‹n› more are too large to attach";
  - nothing back yet.
- Changes requested, with and without the firm's comment, which shows as a quote.
- The notices that carry an amber or a red left rule (warnings and failures).
- The two pictures: an engraved envelope on documents back (the firm's copy only) and an engraved
  blank plate on the two welcome emails.

**Firm variants,** on the firm's letterhead. All of these firms are fictional and come from our
design:

- Harbor & Pine CPA: a square symbol, dark blue, and the Lora web font, which some mail apps load.
- Northgate Payroll: a wide wordmark, orange-red, and Montserrat. Our error styling must not look
  like its button.
- Best Accounting: a plain wide wordmark, blue, and Inter.
- Hard cases:
  - no logo (the name alone);
  - a white logo made for dark websites;
  - a very pale main color (which adds an extra 1 px line to the rule);
  - bright yellow (the button takes dark text);
  - a 40-character firm name;
  - a 2-letter firm name;
  - a Spanish name with accents;
  - the device's own font (no web font).

**Viewing conditions:** images on and off, and text at 100% and at 200%.

### Clients

These come from our design's test matrix:

| Client | Platform | What we expect in dark mode |
|---|---|---|
| Apple Mail | macOS | It honours our dark-mode rules: dark ground, white sheet, exact colors |
| Mail | iOS (iPhone) | As Apple Mail |
| Outlook for Mac | macOS | As Apple Mail |
| Outlook.com and the new Outlook | Web and Windows | Partial inversion, held back by our Outlook-specific rules. The sheet stays white in most cases |
| Outlook for Windows, 2016 to 365 (classic) | Windows | Partial inversion. Buttons are drawn in VML |
| Gmail | Web | No dark rendering of the message: it shows light, as designed |
| Gmail app | iOS and Android | Forced full inversion: a dark sheet and light text, the logo still on its white plate, the button color shifted but readable |
| Yahoo Mail, AOL Mail | Web | Mixed. The baked white plate and the live text carry the message |
| Samsung Mail | Android | Mixed, as above |

**Versions:** the current version of each client, plus every Outlook for Windows version from 2016
to 365 that the service offers. Other clients are welcome but not required.

## Standard or criteria

A version passes when, in every client, in light and dark mode, with images on and with images off,
all of these hold:

1. **The whole email is readable.** Nothing that carries meaning is inside an image. With images off,
   the logo's alt text still names the sender (CoFile or the firm) in styled text.
2. **The letterhead is right.** On CoFile's emails, CoFile's logo is centred at the head. On the
   firm's emails, the firm's logo sits on its white plate, never on black, with the firm's name and
   the color rule drawn at exactly 3, 2 and 1 px. The rule must hold in Outlook for Windows too.
3. **Nothing of CoFile appears on an email to a client:** no logo, no footer line, no mark. The From
   name is the firm's.
4. **Headlines use the right face.** On CoFile's emails that is Georgia. On the firm's emails it is
   the firm's web font where the mail app loads it (Apple Mail, iOS Mail, Samsung Mail and Outlook
   for Mac), and otherwise the system sans-serif. It is never Times.
5. **The button is right.** There is one button, 56 px tall, with a readable label:
   - gold with dark text on CoFile's emails, and the firm's color on the firm's emails;
   - a VML button in Outlook for Windows;
   - full width on phones.

   The "Or paste this link into your browser:" line and its address are present, and the address
   wraps.
6. **The layout holds.** On desktop the email is a 600 px white sheet with a hairline border. On
   screens 480 px wide and below, it runs edge to edge with 20 px padding. Nothing scrolls sideways.
7. **Text sizes hold.** Nothing a reader needs is below 15 px, except the 14 px link address.
8. **Dark mode matches the table above.** Where a client forces its own dark mode, text stays legible
   and the logo stays on white.
9. **Figures read cleanly.** The EIN box on documents back reads at its large size. The fee total
   keeps its single and double rules. Values set in a monospaced font line up.
10. **The inbox preview is right.** It shows the right sender name, the subject and the first
    sentence of the body, not letterhead text.
11. **Images are light.** They total under 60 KB per email.
12. **The plain-text part matches.** It has the same words in the same order.
13. **Large text works.** At 200% text size, nothing is cut off.
14. **It works with a screen reader.** The email reads as one article with one heading, in source
    order (VoiceOver with iOS Mail, NVDA with Outlook). If the service can't check this, we will
    check it by hand.

## What the service must offer

**Required:**

- Renders in the real clients listed (the real apps, on real or virtual devices), not a simulation.
- Light and dark mode for every client that has a dark mode.
- An images-off view.
- Full-length captures, not cut off at the first screen.
- Two ways to submit an email: a real send from our staging system to a test address (which also
  tests the From name, the Reply-To and the sending domain), and an HTML upload through an API.
- An API to start a test and download every capture, so tests can run from our build.
- Enough tests each month for our volume (see "How Claude will run the tests").
- At least two users: the owner and the build account.
- Clear data handling: where test emails and captures are stored, for how long, and how to delete
  them.

**Nice to have:**

- Screen-reader or accessibility checks.
- An inbox preview (sender, subject and preview text).
- Views at larger text or zoom.
- Link and image checks.
- A comparison between runs that shows what changed.

## How Claude will run the tests

Once there is an account:

1. The owner adds the service's API key to our build environment as a stored secret. It is never
   written into the code or into a message.
2. Claude builds each of the 27 versions from the templates in each variant above, using only our
   fictional example data (Harbor & Pine CPA, Two Sisters Bakery LLC, EIN 00-0000000 and so on).
3. Claude sends each one to the service, either by API upload or by a real send from staging.
4. Claude downloads every capture and checks it against the criteria above. For each email, Claude
   writes a report with a pass or fail for every client and mode, showing the capture and the
   reason for each fail.
5. Claude fixes the templates and runs the tests again until every version passes. The last good set
   becomes the baseline.
6. After launch, any change to an email template reruns the affected versions and compares them with
   the baseline.
7. The owner reviews the final set before launch.

**Volume.** A full run is all 27 versions, each in its variants, across every client. We expect
several full runs during the build, then smaller runs after each template change.
[owner to confirm: whether to keep the subscription after launch].

## Timing

- **Week 5:** we want the account in place. The first filing emails go live with the first phase of
  the build, in weeks 2 to 5.
- **Weeks 8 to 10:** the heaviest use, when both template families are finished.
- **Weeks 13 to 15:** final passes, until launch.

## What we provide

- Our HTML and plain-text emails, or real sends from our staging system.
- Fictional example data only.
- A contact: [CoFile contact].

## Rights, privacy and consent

- Test emails contain only fictional example data. No real client, firm or person appears in them.
- Real sends go only to the service's own test addresses.
- We must be able to delete our tests and captures at any time.

## To quote

Ask each service for:

- the plan, or plans, that cover the clients and the volume above;
- the number of users;
- API access;
- data retention and deletion terms;
- contract length and cancellation terms.

Then fill in the checklist below.

## Comparison checklist

Tick each box, or note what's missing. No prices go here: put them in the quote.

| Requirement | Service A | Service B | Service C |
|---|---|---|---|
| Apple Mail on macOS, real render | | | |
| Mail on iOS (iPhone), real render | | | |
| Outlook for Mac | | | |
| Outlook.com | | | |
| New Outlook for Windows | | | |
| Outlook for Windows 2016, 2019, 2021 and 365 (classic) | | | |
| Gmail on the web | | | |
| Gmail app on iOS | | | |
| Gmail app on Android | | | |
| Yahoo Mail, AOL Mail | | | |
| Samsung Mail | | | |
| Light and dark mode for each client | | | |
| Images-off view | | | |
| Full-length captures | | | |
| Real send to a test address | | | |
| HTML upload through an API | | | |
| API to start tests and download captures | | | |
| Monthly test allowance that covers our full runs | | | |
| Two or more users | | | |
| Data retention and deletion terms we accept | | | |
| Contract length and cancellation terms we accept | | | |
| Nice to have: accessibility or screen-reader checks | | | |
| Nice to have: inbox preview | | | |
| Nice to have: larger text or zoom views | | | |
| Nice to have: link and image checks | | | |
| Nice to have: comparison between runs | | | |

**Spec references:** 07-platforms-and-emails.md 10D.1 to 10D.17; 08-components-and-production.md
12.1 (emails), 13.1 (email row), 13.3 (email row), 13.4 (row 11), 13.5; 01-foundation.md 5.1
(emails row); DECISIONS.md decisions 2, 12, 33, 34, 35, 37; BUILD-PLAN.md list B, C.9.
