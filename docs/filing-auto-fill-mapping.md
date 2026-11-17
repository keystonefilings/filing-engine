# Filing auto-fill mapping: EIN (IRS), New York DOS, New Jersey DORES

Field-by-field map of the three filing flows, built by walking each site live on
Sat Nov 14, 2026 (test entries only, nothing submitted). Rules and open items at the end.

## Shape of the build (user, Nov 14 evening)

The filler is built as an API plus webhook app that connects to the filing companies'
websites. Other systems (and the accountant front-end later) call the API to start a
filing; webhooks fire on progress and completion; the engine drives the filing sites
live each run.

## Design rules (from the user)

1. No site saves drafts: every run is one full start-to-submit pass. Verify all data
   before the run starts; there is no resuming mid-form.
2. The EIN confirmation letter downloads only during the run that files the EIN.
   Download it every run, in the same pass as the submit.
3. Run order: (1) start the state filing, enter the name, confirm it is available;
   (2) in the same session window, file the EIN and download the letter;
   (3) come back to the state flow and enter the EIN in its field;
   (4) finish and submit the state filing. If the EIN errors, the run STOPS there
   and reports. It never continues without the EIN.
4. A human tap happens before anything actually submits to a government site.
5. The filler reads the live page each run. No hardcoded selectors or field lists;
   this map is the guide, the live page is the truth.
6. Every field is marked required or optional (below).
7. Reusable values live in a settings layer (see "Settings" below), read fresh each run.

## Run-order note that applies across states

State form first up through the name check, then EIN inside the same window, then
back to the state form to finish. NY and NJ both accept the EIN in the flow
(NY: optional field on screen 2; NJ: Business Data, optional). EIN has no login and
no state; NY needs the saved ny.gov login; NJ is identical logged in or out, no login.

## NY Department of State (Domestic LLC, Articles of Organization)

Site: ecorp.dos.ny.gov (redirects to filings.dos.ny.gov/ords/r/corpanc/...).
Login: saved ny.gov profile. Filing entry: /efiling/1 (choose filing type),
then /efiling/2?p2_filing_type=DLLC, then /efiling/4?clear=4.

### Screen 1: Proposed Entity Name
- Name: REQUIRED, one field. Must contain an LLC-type indicator (LLC, L.L.C., etc.)
  or it rejects with "Type indicator applicable to specified entity type not found."

### Screen 2: one long Filing page
- Opening statement: optional. Checkbox "include following statement"; do not check
  it when the organizer is a business entity.
- LLC name: required (auto-carried from screen 1 but has its own required field) +
  optional English translation of the name.
- Purposes: optional checkbox; default boilerplate lawful-act text.
- County: required dropdown (all NY counties).
- Service of process: required radio - enter info manually, or pick a service
  company from their list. Fields: Name, Address x2, City, State, Zip; then
  Secretary of State notice email + confirm email.
- Registered agent: optional, same radio + fields; State locked to NY.
- Management structure: required radio.
- Effective date: required radio + optional date picker.
- Dissolution date: optional radio + date.
- Liability statement: optional checkbox.
- Organizer: required, name + address. "SOP Address" and "Organizer Address"
  copy buttons on the fields.
- Signature: required text.
- Filer: required, name + address, same copy buttons.
- Bottom of the page after Filer (signature/submit/payment area) and the full
  radio option labels were not yet captured when the walkthrough paused; capture
  them on the next NY run.

## New Jersey (njportal.com/DOR/BusinessFormation, Domestic LLC)

No login needed; identical logged in or out. Wizard sections: Business Information
(Name, Designator, Data, Purpose, Main Address), Registered Agent, Members/Managers,
Other Provisions, Signatures, Review, Payment.

### Screen 1: Business Name
- Entity type: required dropdown.
- Name: required. NO designator in the name field (designator is its own screen).

### Screen 2: Business Designator
- Required dropdown AFTER a name-availability check. Options include LLC,
  L.L.C., LTD LIABILITY CO and others.

### Data screen
- Business purpose and business data, including the EIN field: OPTIONAL (this is
  where the EIN from step 2 of the run order goes).

### Main business address
- Required address fields (street, city, state, zip).

### Registered Agent
- Radio: "Enter a Registered Agent/Office" or pick from the service company list.
- Fields: Name, Street 1, City, State, Zip, plus a designation checkbox.

### Members / Managers
- AT LEAST ONE MEMBER REQUIRED: with none listed, Continue bounces back to this
  screen. Up to 10.
- "Add New Member" modal fields: Name (req), Street Address 1 (req),
  Street Address 2 (opt), City (req), State (req dropdown), Zip (req).
- Rows are expandable (+/-) and have Edit/Delete.

### Other Provisions
- Optional. Can add up to 10 more Articles/Provisions.

### Signatures
- At least 1 signer required, up to 10.
- "Add New Signer" modal: Name (req), Title (req dropdown; observed option:
  Authorized Representative), Save/Close.
- Each signer row has its own signature checkbox. The checkbox must be CHECKED
  before Continue enables - checking it means acceptance of the certificate and
  intent to formally execute the filing (the human-tap moment).

### Review
- Four collapsible accordion sections: Business Information, Registered Agent,
  Members/Managers, Signatures. Continue / Cancel.

### Payment
- Additional Certificates: Official Authenticated Formation Document (pre-checked,
  disabled - always included); Certificate of Standing (optional, $50);
  Certified Copy (optional, $25).
- Contact Information: First Name (req), Last Name (req), Phone (req),
  Email (req), Confirm Email (req).
- Select Payment Type (req): Credit Card or E-Check.
- Fee table: Formation $100 statutory + $3.50 credit-card service fee or $1 eCheck;
  Certificate of Standing +$2.00 / +$1; Certified Copy +$2.00 / +$1.
- Two notification checkboxes come PRE-CHECKED: Annual Report reminders and
  CorpWatch Alerts. Decide in settings whether to leave them on.
- Disclaimer: NICUSA-NJ processes the payment (service fees on top of statutory).
- Pay Now / Cancel.

### Automation quirks the filler must handle
1. Members modal "Add" button resists scripted clicks (sits under a label element,
   not exposed as a button). Fallback that works: press Enter from a filled field;
   the form posts ModalAddMember.
2. Signer modal "Save" button has no accessible name. Fallback that works:
   click div.modal-body .btn-primary (posts ModalAddSigner).
3. Continue silently bounces back to Members when no member exists - check state
   after every Continue.

## EIN (IRS, mod-ein)

Not yet mapped live: the IRS page was erroring during the Sat Nov 14 walk
(retry on a weekday). Known constraints already locked into the design:
- No login required.
- The whole interview runs in one sitting (short session timeout).
- The confirmation letter (CP 575) downloads only in the same session/run that
  files the EIN - download it on every run, per design rule 2.
Capture the full question-by-question flow (owner info, responsible party,
SSN, business type, member count, etc.) on the first weekday retry.

## Settings layer (read fresh every run)

- Registered agent: name, street, city, state, zip.
- Member: name, street address, city, state, zip (reuse for signer name/title).
- Signer: name, title (e.g. Authorized Representative).
- Filing contact: first name, last name, phone, email.
- Payment type: credit card or e-check.
- Checkbox defaults: NY secondary/registered agent behavior, NJ notification
  checkboxes (annual report reminders, CorpWatch), NY opening statement,
  NJ other provisions.
- Designator default: LLC (or the entity's type).
- Effective date default.
- County defaults per client.
- EIN wait rule: run stops and reports if EIN errors.


## Expanded scope (user request, Sat Nov 14 ~7:10pm): amendments, good standing, DBA, other online filings, NY paper uploads

### New York - what is actually online
The DOS Online Filing System (filings.dos.ny.gov/efiling/1) offers ONLY two filings:
Certificate of Incorporation for a domestic business corporation, and Articles of
Organization for a domestic LLC. Everything else below is a separate route.

- Amendment, NAME CHANGE ONLY (domestic LLC, and domestic business corporation):
  FILED ONLINE per dos.ny.gov (Business Express route; the DOS amendment page links
  the online filing). Fee $60. Online filing returns an email acknowledgement with
  the filing receipt as a PDF within minutes, and offers additional services
  (plain copy, certified copy, certificate of existence) attached as PDFs.
  Field-by-field walk of that online screen: still to do (needs the ny.gov
  account session).
- ALL other amendments: paper form mailed to Division of Corporations,
  One Commerce Plaza, 99 Washington Ave, Albany NY 12231. Expedited (paper only):
  $25 per document within 24h, $75 same day, $150 within 2h, paid by separate
  check/money order or on the Credit Card/Debit Card Authorization Form (form
  1515-f).
- Good standing (NY calls it Certificate of Status): requested in writing to the
  Division of Corporations (mail; requests with a credit-card authorization form
  may go by email per the copies page). Not online self-serve.
- Certified copies of filed documents: written request + fee, mail or hand
  delivery; a credit-card authorization form + written request may be emailed to
  the Division (copcs@dos.ny.gov on the page).
- Biennial statements: filed online on the DOS site.

### New York - paper-upload automation (the user's design, voice Nov 14 ~7:08pm)
In the NY service-company account (the ny.gov login we hold), paper filings have
an upload option: create the paper filing online, enter the basic information on
the online screen, and upload the completed form. So the filler can:
1. Generate the completed paper form as a filled PDF (from settings + filing data).
2. Enter the basic information on the service-company online screen.
3. Upload the PDF as the paper filing, same pass.
Applies to the paper-only NY items: good standing/Certificate of Status, assumed
name (DBA), foreign qualification, non-name-change amendments, dissolutions.
Map each paper form's fields (the PDFs from dos.ny.gov/forms) on the next walk.

### New Jersey - good standing (Business Record Service)
njportal.com/dor/businessrecords/EntityDocs/StandingCerts.aspx
Flow: Search type (required radio: Business Name, Entity ID, Principal Name
(officer/director/manager/managing member), Registered Agent, Associated Name
(alternate/fictitious/previous name)) -> if Business Name: one required Business
Name field -> Continue -> Results -> Select Documents. A Cart and a
"Retrieve Documents" page sit at the top; the service is usable logged in or out
(same pattern as formation). Note shown on the page: electronic filings are
updated by 10:00 AM the next business day. Fees for standing certificates: not
shown on the search screen; read at the Select Documents step on the first real
run (needs a real entity to walk).

### New Jersey - DBA
Two paths, decided by entity type:
- LLC, corporation, limited partnership: Certificate of ALTERNATE NAME, filed
  online through the NJ Business Amendment Service
  (njportal.com/DOR/BusinessAmendments - log in or create an account; check name
  availability at njportal.com/DOR/BusinessNameSearch first). Field-by-field walk:
  still to do.
- Sole proprietor / general partnership: trade name registered with the COUNTY
  CLERK (paper, county-level, not state).
NJ amendments (charter amendments) also go through the Business Amendment Service
online, so amendment mapping for NJ lands on the same flow as the alternate name.

### New Jersey - other online services worth wiring
- Annual Reports: njportal.com/DOR/annualreports/
- Business Records: searches, certified copies, standing certificates
  (njportal.com/DOR/businessrecords/)
- Business Name Search: njportal.com/DOR/BusinessNameSearch/Search/BusinessName

## Open items (updated)
- EIN flow: map on the first weekday the IRS page is up.
- NY screen 2 bottom (post-Filer area) and radio option labels: capture next NY run.
- NY name-change-only amendment online screen: walk under the ny.gov account.
- NY paper forms (good standing, assumed name, foreign qualification, other
  amendments): pull the PDFs and map their fields for the paper-upload engine.
- NJ Business Amendment Service (alternate name + amendments): walk the flow,
  confirm whether it needs the account login.
- NJ standing certificate fees: read at Select Documents on a real entity.
- NJ signer Title dropdown: confirm the full option list.

## Open items
- EIN flow: map on the first weekday the IRS page is up.
- NY screen 2 bottom (post-Filer area) and radio option labels: capture next NY run.
- NJ signer Title dropdown: confirm the full option list (only Authorized
  Representative observed).
