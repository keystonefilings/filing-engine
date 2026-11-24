# NJ-REG: Online Business and Employer Registration (NJ Division of Revenue)

**Status:** mapped end to end to the Review screen and its "Complete Registration" button, in the user's own Chrome (the user typed the real Entity ID, EIN and owner SSN). Not submitted; no attestation box ticked and no signature typed.
**Browser:** Claude's own cloud browser, as a guest. No sign-in, no account. Nothing submitted.
**Mapped:** Nov 24, 2026, 15:45 UTC.
**Base URL:** https://www.njportal.com/DOR/BusinessRegistration/

## What this means for the adapter
- NJ-REG runs **after** formation. A corp, LLC, LP or LLP needs its NJ Business Entity ID (from the formation filing) **and** its IRS EIN before the first data screen.
- Correct order for a NJ entity: NJ formation, then IRS EIN, then NJ-REG.
- No login is needed to start. The flow is a guest wizard.
- Mapping past screen 2 needs a real Entity ID plus EIN pair (a client of ours, with their OK) or a session where the user types them in.
- No fee anywhere in the flow.

## Wizard sections (top nav)
Business Information, Ownership Information, Business Classification, Employment & Tax Information, Contact Information, Review.
"Employment & Tax Information" only shows in the nav once you are past screen 1.
Business Information has three sub-steps: Business Identification, Business Data, Business Address.

## Screen 0: Welcome
- **URL:** /DOR/BusinessRegistration/
- **Title:** "Welcome to New Jersey's Online Business and Employer Registration Service"
- **Use it for:** a business already formed in NJ (tax and employer registration), or a sole proprietorship or partnership. A new entity files Online Formations first.
- **"What you will need":**
  - Business Entity ID or Corporate ID
  - Federal EIN
  - NJ Business Code
  - NAICS code
  - S corp or QSSS: a copy of the federal election, the shareholder's SSN or EIN, Form 8869, and the parent's FID
- **Advance:** Get Started. It opens a modal, "IMPORTANT NOTICE! Did you file your Business Formation Application Online?", with Continue and Close buttons. Continue goes to Screen 1.

## Screen 1: Start Registration
- **URL:** /DOR/BusinessRegistration/Home/FirstStep
- **Page text:** "all corporations, LLC's and limited partnerships must register using their New Jersey Business Entity ID and EIN. If you are registering a partnership or proprietorship, you must provide either your SSN or EIN. This number will serve as your business tax ID in New Jersey."
- **Info box:** a 501(c)(3) seeking a sales-tax exemption uses paper Form REG-1E. An out-of-state 501(c)(3) that only needs payroll picks the "non-New Jersey Business Entity" option.
- **Field:** "Select one:" (radio, required). The first option is selected by default.
  1. Register a Business Entity (For-Profit Corporations, Non-Profit Corporations, Limited Partnerships, Limited Liability Companies and Limited Liability Partnerships)
  2. Register a General Partnership or Proprietorship
  3. Register as an Individual contracting with a NJ State or Local Government Agency
  4. Register a non-New Jersey Business Entity with employees residing in New Jersey
  5. Register as an Individual solely for Transient Accommodations (has a help button)
  6. Register as Remote Seller only (has a help button)
  7. Register as a Domestic/Household Employer (has a help button)
- **Advance:** Continue. Every option goes to /DOR/BusinessRegistration/BusinessDetails.

## Screen 2a: Business Identification, option 1 (Business Entity)
- **URL:** /DOR/BusinessRegistration/BusinessDetails
- **Fields:**
  - **Entity ID\*** (text). Has the link "Need Entity ID?", which goes to the NJ Business Formation welcome page.
  - **EIN\*** (text). Help text: "EIN is a nine-digit long Employer ID Number assigned by IRS. It cannot be assigned or provided by the State."
- **Buttons:** Continue, Back (to /DOR/BusinessRegistration/), Cancel (to /Home/Cancel).
- **Validation:** Continue with both fields empty shows "Required" under each.
- **How it was passed (Nov 24):** the user typed a real Entity ID and EIN in their own Chrome. Neither is recorded here, and the business details the portal pulled up are left out too.

## Screen 2b: Business Identification, option 2 (General Partnership or Proprietorship). STOP
- **URL:** /DOR/BusinessRegistration/BusinessDetails (same URL as 2a, with different content)
- **Field:** "Will you have employees?\*" (Yes/No radio, required). Neither is selected at first.
- **If Yes:** an EIN field appears, with the same IRS help text and the link "Need EIN Number?" to the IRS EIN online page. An EIN is effectively mandatory once there are employees.
- **If No:** an EIN field appears, then "Or", then "Social Security Number" with the note "***Do not use employees SSN". Either one is accepted.
- **Buttons:** Continue, Back, Cancel.
- **Stop reason:** an EIN or SSN is needed to go on.

## Screen 3: Business Data
- **URL:** /DOR/BusinessRegistration/BusinessDetails/Data
- **Business Name:** prefilled from the state's entity record, read-only.
- **Beginning Date for this Business in New Jersey\*:** prefilled (mm/dd/yyyy), read-only.
- **Will this be a year round business?\*** Yes/No radio. No (not tried) likely asks for the season.
- **Trade Name ("Doing Business As" Name, if applicable):** dropdown of the trade names already on file, with the prompt "-- Select one for Trade name to be displayed on Business Registration Certificate --" and a help button.
- **Buttons:** Continue, Back, Cancel.

## Screen 4: Business Address
- **URL:** /DOR/BusinessRegistration/BusinessDetails/Address
- **Banner:** "Main Business Address can be a US or International address." Link "Enter an International Address." switches to Country\* and Postal code.
- **Main Business Address** (prefilled from the entity record, editable):
  - Street Address 1\*, Street Address 2
  - State\* (NJ, NY, PA, DE first, then all states, Puerto Rico, Foreign)
  - City\*
  - County\* (dropdown filtered by the address; one option shown)
  - Municipality\* (dropdown filtered by county)
  - Zip Code\* (5 digits + optional 4)
- **Mailing Address:** Attention To\* (text), and checkbox "Mailing Address is different from Business Location", which opens Street Address 1\*, Street Address 2, City\*, State\*, Zip.
- **Buttons:** Continue, Back, Cancel.

## Screen 5: Ownership Type
- **URL:** /DOR/BusinessRegistration/Ownership
- **Ownership Type\*** dropdown, filtered by entity type. For an LLC: "Ltd. Liability Co. (1065 Filer)", "Ltd. Liability Co. (1120 Filer)", "Ltd. Liability Co. - Single Member".
- **Last Month of Fiscal Year** (January to December).
- **Is this business a subsidiary of another corporation?\*** Yes/No.
- **S Corporation or QSSS Section:** "Has your business entity been approved as a Federal S Corporation, QSSS, or neither?\*" Federal S Corporation / QSSS (Qualified Subchapter S Subsidiary) / Neither. Note: "If you do not have your Federal S Corporation or QSSS acceptance letter, choose 'Neither'". With Single Member picked, the S corp and QSSS radios are disabled. Picking S corp or QSSS opens an election block (approval date, NJ S corp election date).
- **Buttons:** Continue, Cancel (no Back).

## Screen 6: Owner Details
- **URL:** /DOR/BusinessRegistration/Ownership/Owners
- **Banner:** "You must have a minimum of 1 owner/partner/responsible officer listed. You may list up to 1 maximum." (The maximum follows the ownership type; single member = 1.) "Please note that the EIN of the Business Owner cannot be same as that of the Registering Business."
- **Table:** Name, Title, Percentage of Ownership, Actions.
- **Buttons:** Add Individual Owner, Add Business Owner, Continue, Back, Cancel.
- **Add Individual Owner dialog:**
  - First Name\*, Middle Initial, Last Name\*
  - Title\* dropdown: Accountant, Chairman, Chief Operating Officer, Co-Owner, CPA, Director, ESQ., General Partner, Incorporator, Managing Member, MBA, MD, Member, Officer, Other, Owner, PhD., Pres., Public Accountant, Sec., Treas., Trustee, VP
  - Social Security Number\*
  - Percent of Ownership\*
  - Street Address 1\*, Street Address 2, City\*, State\* (same list as above), Zip Code\* (5 + 4). International: Province, Country\* (full ISO country list), Postal code.
  - Buttons: Save, Close.
  - Validation: Save with SSN empty shows "Required" next to it.
- **Add Business Owner dialog:** Business Name\*, Employer Identification Number\*, Percent of Ownership\*, plus the address block (seen in the page structure, not opened).
- **How it was passed:** the user typed the owner's SSN and pressed Save. After saving, the table shows the owner row with Edit and Delete links. The SSN is not recorded here.

## Screen 7: Business Classification
- **URL:** /DOR/BusinessRegistration/BusinessClassification
- **Intro:** the answers are for State and Federal statistical classification. The NJ Business Code and NAICS fields are keyword autocompletes.
- **New Jersey Business Code\*:** autocomplete text, plus a "Find Business Code" link. Typing "consult" offers "2754 (Service) - Consulting Services (All Types)".
- **Principal Product or Service\*:** textarea, 400 characters max, with a counter.
- **Type of Activity\*:** textarea, 400 characters max.
- **Standard Industrial Code:** optional text, plus a "Find SIC Code" link.
- **NAICS Code\*:** autocomplete. Typing "5416" lists 541611 to 541690 with titles. Link "Find NAICS Code".
- **Number of Workers in New Jersey\*:** number.
- **Buttons:** Continue, Cancel.
- **Review shows** the business code and NAICS as bare numbers (2754, 541611), so the adapter can store codes and type them to trigger the autocomplete.

## Screen 8: Employment Activities
- **URL:** /DOR/BusinessRegistration/Tax (sub-steps: Employment Activities, Taxable Activities)
- **All Yes/No, all required:**
  - Acquired substantially all the assets, trade/business and/or employees of any previous employing units? (Yes not tried; likely opens predecessor details)
  - Paying wages, salaries or commissions to NJ residents working outside NJ?
  - Payer of pension or annuity income to NJ residents?
  - More than one employing facility in NJ?
  - Paying wages, salaries, or commissions to employees working in NJ within the next 6 months?
- **That last one = Yes opens:**
  - Date of first wage or salary payment\* (mm/dd/yyyy with date picker)
  - Date of hiring first New Jersey employee (optional)
  - Date cumulative gross payroll exceeds $1,000\*
  - Is your employment agricultural?\* Y/N
  - Is your employment household?\* Y/N (Yes opens "Date when gross cash wages totaled $1,000 or more\*")
  - Subject to FUTA in the current or preceding calendar year?\* Y/N (Yes opens "Indicate year you were subject to FUTA")
  - Claims exemption from liability under the NJ Unemployment Compensation Law?\* Y/N (Yes opens "Explain why this employing unit claims exemption\*"; there is also a hidden voluntary-election Y/N)
  - Is the company a PEO (Employee Leasing Company)?\* Y/N
- **Buttons:** Continue, Cancel.

## Screen 9: Taxable Business Activities
- **URL:** /DOR/BusinessRegistration/Tax/Activities
- **17 required Yes/No questions:**
  1. Collect NJ Sales Tax and/or pay Use Tax? Yes opens "Exact Date you expect to make the first sale\*" (date) and "More than one location in NJ that collects NJ Sales Tax?\*" Y/N.
  2. Exempt purchases for inventory or production?
  3. Sell or distribute cigarettes, tobacco or nicotine products? (Yes opens wholesaler/distributor and purchase-from questions)
  4. Sales or transport of motor fuels and/or petroleum?
  5. Storage of petroleum and/or hazardous chemicals?
  6. Manufacturer, wholesaler, distributor or retailer of litter-generating products? (exempt under $500,000 annual retail sales)
  7. Operate a solid waste facility?
  8. Transport solid waste to an out-of-state site or rail transfer station?
  9. Own or operate a sanitary landfill or solid waste facility in NJ?
  10. Sell, store, deliver or transport natural gas or electricity in NJ?
  11. Contractor or subcontractor to the state, public agencies, schools or casino licensees?
  12. Motor vehicle rental for 28 days or less?
  13. Retail sale of new motor vehicle tires, or sell or lease motor vehicles?
  14. Voice grade access or mobile telecommunications in NJ?
  15. Hotel, motel, bed and breakfast or similar in NJ?
  16. Legalized games of chance with any one prize over $1,000?
  17. Operating in the Sports and Entertainment District of Millville?
- **"Eligibility for any other New Jersey State Tax\*"** (checkboxes): No other eligibility, Alcoholic Beverage Tax, Atlantic City Luxury Tax, Cape May County Tourism Sales Tax, Corporation Banking and Financial Business Tax, Insurance Premiums Tax, Landfill Closure and Contingency Tax, Public Utility Franchise Tax, Sanitary Landfill Tax, Solid Waste Services Tax, Transfer Inheritance and Estate Tax, Unemployment and Disability Taxes, Salem County Tax.
- **Buttons:** Continue, Back, Cancel.

## Screen 10: Contact Information
- **URL:** /DOR/BusinessRegistration/Contact
- Contact Name\*, Title\* (same title list as owners), Email Address\*, Confirm Email Address, Daytime Phone\* + Ext, Evening Phone + Ext.
- **Buttons:** Continue, Cancel.

## Screen 11: Review. FINAL SCREEN, NOT SUBMITTED
- **URL:** /DOR/BusinessRegistration/Review
- "Review all entered information below. If changes need to be made, click the appropriate 'Edit' button." Each block has an Edit button.
- **Blocks:** Business Information (name, Entity ID, EIN masked ###-###-nnn, trade names, beginning date, open all year, location, county, municipality with code, mailing name and address); Ownership Information (type, fiscal month, subsidiary, S corp, owners with masked SSN); Business Classification; Employment Activities; Taxable Business Activities; Contact Information.
- **Attestation checkboxes (required, not ticked by me):**
  - Under Employment Activities: "I confirm the 'Yes/No' answers above accurately reflect my employment activities ... I understand that I will be required to submit New Jersey payroll tax filings for activities that show a 'Yes.' \*"
  - Under Taxable Business Activities: "I confirm the 'Yes/No' answers above accurately reflect my business activities that are subject to New Jersey taxes ... \*"
- **Signature section:**
  - Checkbox "Get free Text/Email Notifications for your State Tax returns..." which signs you up for Gov2Go. Its popup says "By leaving the box checked you are signing up". It appears checked by default; the adapter should untick it.
  - Checkbox "I declare, under penalty of perjury, that to the best of my knowledge and belief, all the information provided in this registration is true, correct, and complete. \*"
  - Name of Authorized Representative (typed signature)
- **Final button:** "Complete Registration". Also Cancel.
- **Not pressed.** Pressing it would really register the business for NJ tax and employer purposes. The tab was closed with the registration incomplete.
- **For the adapter:** the client must sign: the perjury box and the typed name are the client's own attestation, so this step needs the client's explicit sign-off (or the client presses it themselves).
- **Fee:** none shown anywhere in the flow.

## Not mapped
- Options 3 to 7 on Screen 1. They share the BusinessDetails URL and very likely open the same ID gate.
- The Yes branches not tried: predecessor acquisition, seasonal business, international addresses, Business Owner (instead of individual), and the S corp/QSSS election block.
- The confirmation screen after Complete Registration.
