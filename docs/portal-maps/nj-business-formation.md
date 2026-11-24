# NJ Business Formation (njportal.com/DOR/BusinessFormation)

Mapped 2026-11-24 in a cloud browser, as a guest (no login). Nothing was filed or paid. Placeholder draft names: "TEST PLACEHOLDER ZQXV" (LLC and DP).

## Status
- **LLC (Domestic LLC)**: Business Information, Members/Managers and Other Provisions mapped. **Stopped at the Registered Agent attestation checkbox.**
- **Corporation (DP, Domestic For-Profit)**: Business Information, Board of Directors and the Incorporators screen mapped. Same Registered Agent stop.
- **Not reached**: Signatures, Contact Information, Review and Payment. They stay unlinked until the Registered Agent step is complete, and that step can't be completed without ticking the attestation.
- **Login**: guest filing works with no account. "Login" and "New User" (`/Account/SetupBusiness.aspx`) are optional.

## Fees (published schedule, nj.gov/treasury/revenue/fees.shtml, read 2026-11-24)
| Filing | Fee |
|---|---|
| LLC Certificate of Formation | $100 |
| Corporation (for-profit) or LP Certificate of Incorporation | $100 |
| LLC/LLP annual report | $75 |
| Corporate/LP annual report | $75 |
| Expedite | $15 corp / $25 LLC per filing, $500 (2-hour), $1000 (1-hour). The schedule says these apply only to over-the-counter transactions. |
Online checkout amounts were not seen (Payment step unreachable). Add a convenience fee check when the adapter first reaches Payment.

## Wizard layout
Left nav: Business Information → Registered Agent → Members / Managers (LLC) or Board of Directors / Incorporators (DP) → Other Provisions → Signatures → Contact Information → Review → Payment.
- After Business Information is complete, the steps up to Other Provisions become links.
- Signatures onward stay plain text until every earlier step is Complete.
- The Continue button always redirects to the first incomplete step.

Business Information has four sub-steps: Business Name, Business Data, Business Purpose, Business Address.

## Screens

### 1. Business Name: `/DOR/BusinessFormation/CompanyInformation/BusinessName`
- **What type of business would you like to form?\*** (select):
  - DP: NJ Domestic For-Profit Corporation
  - PA: Professional Corporation
  - LLC
  - LP
  - LLP
  - NP: Non-Profit
  - FR: Foreign For-Profit
  - FLC: Foreign LLC
  - LF: Foreign LP
  - FLP: Foreign LLP
  - NF: Foreign Non-Profit
  - NV: Non-Profit Veteran
- **Business Name\*** (text). Help text: "DO NOT enter a designator such as Corp., Ltd., LLC, Etc."
- Buttons: **Continue** (runs the name availability check), Cancel.

### 2. Business Designator: `/CompanyInformation/BusinessDesignator`
- If the name is free: green alert "Congratulations! The Business Name {NAME} is available." The name is shown uppercased.
- **Business Designator\*** (select). Options:
  - LLC: LLC, L.L.C., LTD LIABILITY CO, LTD LIABILITY CO., LTD LIABILITY COMPANY, LIMITED LIABILITY CO, LIMITED LIABILITY CO., LIMITED LIABILITY COMPANY
  - DP: CORPORATION, INCORPORATED, COMPANY, LTD, CO, CO., CORP, CORP., INC, INC.
- Buttons: Continue, Back, Cancel.
- The name-taken branch was not exercised. Map it the first time a duplicate name comes back.

### 3. Business Data: `/CompanyInformation/Data`
Banner: "You have chosen to file a {TYPE} named: {NAME DESIGNATOR}".
- **Employer Identification Number** (optional; kept confidential, used for tax/employer registration) and **EIN Location Code** (text, default `000`).
- **NAICS Code** (optional).
- **Duration** (DP shows the default "Perpetual"; LLC shows it blank, which means perpetual).
- **Effective Date** (mm/dd/yyyy, default today; a future date is allowed for some types).
- **DP only: Stock (Total Number of Shares)\*.** Minimum 1; no par or no-par designation needed. Leaving it blank shows the inline message "Required".
- Buttons: Continue, Back, Cancel.

### 4. Business Purpose: `/CompanyInformation/BusinessPurpose`
- **Business Purpose** (optional, 300 characters max). If a corporation or LP leaves it blank, the certificate reads "General".
- Optional upload: PNG or PDF, up to 3MB or 10 pages, using Choose File then Upload. A document over 10 pages blocks the certificate download.
- Buttons: Continue, Back, Cancel.

### 5. Main Business Address: `/CompanyInformation/MainBusinessAddress`
- Fields: Address Line 1, Address Line 2, City, State (select; NY/NJ/PA/DE listed first, then all states and territories), Zip, Zip Plus 4.
- No field is starred. Continuing with every field blank was **accepted** for both LLC and DP.
- Link "Enter an International Address" opens `/CompanyInformation/InternationalBusinessAddress?force=True`.
- Continue marks Business Information Complete and goes on to Registered Agent.

### 6. Registered Agent: `/RegisteredAgent`
- Note on the page: every NJ business must have a Registered Agent.
- Option A: **Enter a Registered Agent Number\*** (text) for an agent already on file.
- Option B: link "Enter a Registered Agent/Office", which opens `/RegisteredAgent/NoId` and redirects to `/RegisteredAgent/RegisteredAgentInfo`.
- Buttons: Continue, Cancel.

### 7. Registered Agent manual entry: `/RegisteredAgent/RegisteredAgentInfo`
Page warning: the agent must be an individual or corporation in good standing with the NJ Treasurer, with an NJ street address. A PO box is accepted only alongside a street address.
- RA Name\*
- RA Email (optional)
- Phone Number (optional)
- Office Address 1\*
- Office Address 2
- Office City\*
- Office State\* (prefilled "New Jersey")
- Office Zip\* and plus4
- **Attestation checkbox\*** (required): "I attest that the Registered Agent information entered is correct for this business and that the above listed Registered Agent is aware of and has accepted the responsibility of acting as the Registered Agent for this business."
- An empty Continue shows inline "Required" under every starred field, including the checkbox.
- **MAPPING STOP.** Not ticked, because it is a certification. The engine will need the filer's (the user's) authority to tick it for each filing.

### 8a. Members / Managers (LLC): `/Members`
- Text: "List the LLC's members or managers and the street address of each. You may list up to 10 Members."
- Table: Name | Address | Actions (Edit/Delete).
- **Add New Member** opens a modal with:
  - Name\*, Street Address 1\*, Street Address 2, City\*, State\* (select), Zip Code\*, Zip Plus 4
  - Link "Switch to International Address »"
  - Buttons: Save, Close
- **Zero members is allowed**: Continue marks the step Complete.

### 8b. Board of Directors / Incorporators (DP): `/Members`, then `/Members/Incorporators`
- Board of Directors: "List all Directors… **You must have a minimum of 1 Director**. You may list up to 10."
  - Continue is **disabled** until one director is added.
  - **Add New Director** opens a modal with the same fields as Add New Member.
  - Placeholder director "TEST DIRECTOR PLACEHOLDER, 100 Placeholder St, Trenton NJ 08608" saved fine.
- Incorporators (`/Members/Incorporators`): "At least 1 Incorporator is required. You may list up to 10."
  - **Add New Incorporators** opens a modal, assumed to have the same fields.
  - Continue is disabled until one is added.
  - Buttons: Continue, Back, Cancel.

### 9. Other Provisions: `/AdditionalInformation`
- "Add up to 10 more Articles/Provisions if you wish."
- **Add New Provision** adds a textarea (3000 characters max) with a Delete button. Delete opens a confirm dialog: "Are you sure you want to remove this record?" with Delete and Cancel.
- None is allowed: Continue marks the step Complete.

### 10–13. Signatures, Contact Information, Review, Payment
Not reachable without the Registered Agent attestation. Unknown until then:
- signature form (likely a typed name plus an attestation)
- contact email
- the review layout
- the payment gateway and accepted methods

## Adapter notes
- Keep the guest session cookie for the whole wizard. The left-nav links rely on session state.
- Handle the designator list per entity type, and send the name without a designator.
- The DP flow needs: shares (≥1), ≥1 director, ≥1 incorporator.
- The LLC flow can go with zero members, but the Registered Agent is always required.
- Before going live: get the user's sign-off on the Registered Agent attestation and on the Signatures step, then finish mapping Signatures through Payment.
