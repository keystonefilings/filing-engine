# Instructions for the assistant helping on this computer

You are helping a person at Keystone Filings run **mapping walks** of three government
filing websites. A walk means: open the site, go screen by screen with test data, and save
every screen. A recorder program saves the screens. **Nothing is ever filed, paid or
submitted.** At the end you write a report in the exact format in section 8. The person
pastes it back to the engineer.

## 1. Rules (read first, follow always)

1. **Never click, or tell the person to click, a final Submit, File, Pay, Purchase or
   Confirm button.** The recorder blocks these buttons and shows a red banner. Do not try
   to get around the block, and do not edit any file in the project. The one exception is
   named in Walk A step 6.
2. **You never see or type passwords, one-time codes, SSNs or bank or card numbers.** The
   person types them directly into the browser window. If a screen asks for one, tell the
   person "please type this yourself" and wait. Do not ask for them in chat. Never put
   them in the report.
3. Use only the test data in section 7. The one exception is the person's own login, and
   the responsible party in Walk B, who types their own details.
4. If anything unexpected appears, stop and write it in the report. Examples: an error
   page, a CAPTCHA, a "you have been blocked" page, a payment page you did not expect, or
   anything that looks like a filing went through. Do not retry more than once.
5. Never share or upload the folder `var/walk-profiles`. It holds the browser's login
   cookies. Only the `walks` folder is shared (section 8).

## 2. Check the computer

Run each command in a terminal and note the output for the report:

```bash
node -v
git --version
```

- **Node** must be version 22 or newer. If it is missing or older, the person installs
  the "LTS" version from https://nodejs.org and reopens the terminal.
- **Git** missing: on macOS run `xcode-select --install`. On Windows, install from
  https://git-scm.com.
- On Windows, use **PowerShell**. If a command says scripts are disabled, run:
  `Set-ExecutionPolicy -Scope CurrentUser RemoteSigned` and answer Y.

## 3. Get the project

```bash
git clone https://github.com/keystonefilings/filing-engine
cd filing-engine
npm ci
npx playwright install chromium
```

- The repository is private. If `git clone` asks to sign in, the person signs in to
  GitHub themselves in the window that opens. You do not handle the token.
- If `npm ci` fails, copy the last 20 lines of the error into the report and stop.
  Do **not** run `npm install` or `npm audit fix`: they change the project.
- If `npx playwright install chromium` fails, run it once more. If it fails again, put
  the error in the report and stop.

## 4. Site check (always do this first)

```bash
npm run probe-sites
```

Copy the whole output into the report. Each line says `ok`, `blocked` or `error` for one
site.

- If **IRS EIN assistant** is not `ok`, skip Walk B on this computer.
- If **NY DOS** lines are not `ok`, skip Walk C on this computer.
- NJ should be `ok` everywhere.

## 5. How the recorder works

```bash
npm run walk -- <walk-name> --url <start address>
```

- A normal browser window opens. The person clicks and types in it. You guide them using
  the steps below.
- Every new screen is saved automatically into `walks/<today's date>/<walk-name>/`.
- To save the current screen by hand, for example after opening a dropdown or popup,
  press **Enter** in the terminal.
- To finish, type **q** and press Enter in the terminal, or close the browser window.
- A red banner "Blocked by the walk recorder" means a final button was stopped. That is
  correct. Note which button it was and continue or finish.

**Open every dropdown and every radio group** on each screen, then press Enter in the
terminal so its options are saved. The engineer needs the full option lists.

## 6. The walks

### Walk A: New Jersey, signed in with Keystone's company-wide NJ login

```bash
npm run walk -- nj-signed-in --url https://my.nj.gov/aui/Login --allow "Pay Now"
```

1. The person signs in with Keystone's company-wide NJ login. Note in the report whether
   it asked for a second step: a text code, an email code, an app code, or none. Do not
   write the code.
2. From the signed-in page, find and open **Business Formation**. Note the exact menu
   path.
3. Start an **NJ Domestic Limited Liability Company (LLC)** with the business name
   `Bluefin Harbor Walkthrough`. Do not type "LLC" in the name box. On the next screen
   choose designator `LLC`.
4. Continue through every screen with section 7's data, until you reach **Payment**.
   - Registered Agent: click the link "Enter a Registered Agent/Office", not the number box.
   - Members: click "Add New Member", fill the popup, then press Enter in the ZIP field
     (the Save button may not respond to clicks).
   - Signatures: "Add New Signer", Title "Authorized Representative". Save with the blue
     button in the popup, then tick the signature box in the table.
5. On **Payment**, before anything else:
   - Open **Select Payment Type** and press Enter in the terminal. Report every option.
     Is there a stored method or a business/shared account option?
   - Report every fee shown, exactly.
   - Fill the contact fields with section 7's contact data.
6. Click **Pay Now** once. This is the one button this walk allows, and the recorder
   lets it through **only once**. It should open the payment gateway page, run by
   NICUSA. **Stop on that page.** Do not enter or choose anything there. Press Enter in
   the terminal to save it. Report every field, every button label, and any stored
   payment method shown. Every pay or submit button on the gateway is blocked, even one
   labelled "Pay Now" again.
7. Close the browser. Nothing has been paid, because no payment details were entered.
8. Start a new recording for standing certificates:
   ```bash
   npm run walk -- nj-standing-signed-in --url https://www.njportal.com/dor/businessrecords/EntityDocs/StandingCerts.aspx
   ```
   Make sure you are still signed in; if not, use the Login link. Choose search type
   **Business Name**, search `SUMMIT PARTNERS INVESTMENTS LLC`, tick **Short Form** on
   the row with Entity ID `0450754256`, click **Add To Cart**. In the cart, open
   **Select Payment Type**, save the options, and report every fee line. Then click
   **Remove** to empty the cart and confirm it says 0 items. Finish with q.

### Walk B: IRS EIN interview

Only if the site check said the IRS is `ok`. Only Monday to Friday 6:00 a.m. to 1:00
a.m., Saturday 6:00 a.m. to 9:00 p.m., or Sunday 6:00 p.m. to midnight, Eastern time.
It needs a **responsible party**: a real person who agrees to take part and who types
their own name and SSN. The walk stops before Submit, so no EIN is issued. The session
expires after 15 minutes without activity, so keep moving.

```bash
npm run walk -- irs-ein --url https://sa.www4.irs.gov/modiein/individual/index.jsp
```

1. Choose **Limited Liability Company (LLC)**. Members: 1. State: New Jersey.
2. Reason: **Started a new business**.
3. Responsible party: the person types their own details. Choose the option that says
   a third party is applying for the LLC, if offered, and save that screen's wording.
4. Address and LLC details: use section 7's business address, the name
   `Bluefin Harbor Walkthrough LLC`, county Mercer, and today's date as the start date.
5. Letter delivery: choose **receive letter online**.
6. Continue to the **summary** screen. Save it. **Stop. Do not click Submit.** If you
   click it by mistake, the recorder blocks it.
7. Report every screen's question and options, any inactivity warning, and its minutes.

### Walk C: New York DOS

Only if the site check said NY is `ok`. Uses Keystone's company-wide ny.gov login.

```bash
npm run walk -- ny-formation --url https://filings.dos.ny.gov/ords/r/corpanc/ecorp/login_desktop
```

1. The person signs in. Note any second step (do not write the code).
2. Start a filing: **Articles of Organization, Domestic Limited Liability Company**.
   Name: `Bluefin Harbor Walkthrough LLC`.
3. On the long Filing screen, fill with section 7's data. **Open every radio group and
   dropdown and save each**: service of process, registered agent, management, effective
   date, dissolution date, county. Note the service company list if one appears.
4. Scroll to the very bottom, past Filer. Report everything there: certification text,
   signature, any upload option, and the **payment** area. Is there a drawdown (DD)
   account? Is it one account or a choice? Is a balance shown? Is a card option offered?
5. Report the **exact label of the final button**. Do not click it. The recorder blocks
   it if clicked.
6. Separately, find where the account shows the **drawdown balance**, and save that page.
7. Find the **name change amendment** start screen and save it without entering data.

## 7. Test data (use exactly)

| Field | Value |
|---|---|
| Business name | Bluefin Harbor Walkthrough |
| Business address | 3 Test Way, Trenton, NJ 08608 |
| Registered agent | Test Agent Walkthrough, 1 Test Plaza, Trenton, NJ 08608 |
| Member | Test Member Walkthrough, 2 Test Lane, Trenton, NJ 08608 |
| Signer / organizer | Test Signer Walkthrough, Authorized Representative |
| NY service of process | Test Agent Walkthrough, 1 Test Plaza, Albany, NY 12207 |
| NY county | Albany |
| Contact | Test Walkthrough, 609-555-0100, walkthrough@example.com |
| Purpose (if asked) | Test entry for form mapping; not to be filed. |

## 8. Hand back

1. Zip the folder `walks` (only that folder) and give it to the person.
2. Write the report below and give it to the person to paste back. Keep the headings
   exactly. Write "not done" with the reason for anything skipped. No passwords, codes,
   SSNs or account numbers anywhere.

```
WALK REPORT
Date and time (Eastern):
Computer: (macOS/Windows + version)
node -v: 
git --version:
Setup problems (exact error text, or "none"):

SITE CHECK (paste full output):

WALK A - NJ SIGNED IN
Done: yes/no (reason)
Second sign-in step: none / text / email / app
Menu path to Business Formation:
Screens that differ from these steps (what was different):
Payment - Select Payment Type options (exact):
Payment - stored method or business account shown? (exact wording):
Payment - every fee line (exact):
Gateway page after Pay Now - address shown in the address bar (no query part):
Gateway page - every field and button label (exact):
Gateway page - stored payment method shown? (wording only, no numbers):
Standing certificate cart - payment type options and fee lines (exact):
Cart emptied: yes/no
Anything unexpected:

WALK B - IRS
Done: yes/no (reason)
Each screen in order: title, question, options (exact):
Third-party applicant wording (exact):
Inactivity warning and minutes:
Anything unexpected:

WALK C - NY
Done: yes/no (reason)
Second sign-in step: none / text / email / app
Radio groups and options (exact):
Service company list (if any):
Bottom of the Filing screen - everything below Filer (exact):
Payment area - DD account? one or choice? balance shown? card option?:
Final button label (exact):
Where the DD balance is shown (menu path):
Name change amendment start screen (title and fields):
Anything unexpected:

RECORDER
Blocked buttons seen (label and screen):
Number of screens saved per walk:
```
