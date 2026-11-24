# NY unemployment registration (NYS-100) — New York Business Express

Status: MAPPED SIGNED-IN to the Submitter Information screen (2026-11-24), LLC path. Stopped there because it carries the "I attest to the above" certification and the submitter's name. "Ready to Submit" (the final screen) not reached. Nothing submitted. No fee shown anywhere.

How mapped: Claude in Chrome, the user's second connected Chrome ("Browser 2"). The user signed in to NY.gov himself; Claude never saw or typed a password.

Test data left in the user's account: an unsubmitted NYS-100 draft and a new Business Profile named "TEST PLACEHOLDER ZQXV LLC" (member TEST PLACEHOLDER, 100 Placeholder St Albany NY 12207, 518-555-0100, placeholder@example.com). Delete both from My Dashboard. One fake FEIN (99-0000017) was typed on the Business Identification screen before I stopped typing ID numbers; no SSN was typed.

## Key findings for the adapter
- Engine: Oracle Policy Automation (OPA v15) interview. Every screen is addressable as `/app/interview?link_goal_state=ScreenOrder~Main~qs$<SCREEN_ID>$global$global` (location-detail screens use `$LSI_NYS100_PHYSICAL_LOCATION$<guid>`). Spinners ("Building/Loading/Saving screen…", "Processing") take 3–10s; one save hung ~45s and needed a second click.
- Two parts: **Business Profile** (reusable across NY applications, stored on the NY.gov account) then the **Application** (DOL questions).
- FEIN is mandatory to file NYS-100 online ("You must have a FEIN to file an NYS100…"). Validation rejects all-same digits, 123456789 and 987654321.
- **Member SSN is required when the member is a US resident.** Non-resident members need a non-US address (a US address with resident=No blocks Continue).
- Every address needs **Validate Address** → modal → choose a USPS suggestion or "Use the address I provided" → USE SELECTED ADDRESS. Unvalidated gives "You are required to validate this address."
- Yes/No questions are styled buttons; many reveal extra required fields (listed per screen).
- Final certification: "By pressing the submit button, I affirm that I have read the above questions and that the answers provided are true to the best of my knowledge and belief." + checkbox "I attest to the above", with submitter name/position/phone/email. That needs a real person's attestation per filing.

## Public entry (no login)
### Screen 0 — DOL info pages (public)
- dol.ny.gov `/bizserve/ui` → "Employer Registration" `/bizserve/ui/register` → "Complete your Registration" `/bizserve/ui/register/employer`
- Business, agricultural and household employers register online via NY Business Express. Non-profit (NYS-100N), governmental (NYS-100G) and Indian tribe (NYS-100IT) employers can't use online registration; paper form or UI Services (uiservices.labor.ny.gov).
- Prerequisite: an FEIN from the IRS before registering. Registering also opens a NYS withholding tax account if none exists.
- Liability (general business): first day of the calendar quarter in which $300+ wages are paid, or on acquiring a liable employer's business.

### Screen 1 — Business Express application page
- Title: "BUSINESS Employer Registration for Unemployment Insurance, Withholding, and Wage Reporting (NYS 100)"
- URL: `https://www.businessexpress.ny.gov/app/answers/cms/a_id/3033/kw/Employer%20Registration`
- Average processing time shown: 15 days. Fee: none shown.
- Advance: **Apply Online** → `/cc/Core/startIntake?licenseTypeCode=NYS100&appTypeCode=INITAPP`

## Login wall
- `/app/loginregister/?p_next_page=/cc/Core/startIntake?licenseTypeCode=NYS100&appTypeCode=INITAPP` → "Login Here" (login.ny.gov SAML) or "Register Here" (NY.gov Business ID self-registration).
- **Needs:** a NY.gov **Business** ID. Unlocks the NYS-100 interview and the dashboard. Leave "remember me" unticked.

## Signed-in flow (raw screen notes, in order)
Fields marked * are required. "Mapped with No" = the Yes branch was opened to record its fields, then No was used to continue.

Signed-in NYS-100 (Browser 2, user signed in himself). Flow: /app/dashboard/descriptionToInterview?licenseTypeCode=NYS100&appTypeCode=INITAPP
P0 "Select the business you are applying for": radio list of user's existing Business Profiles (name, entity type, FEIN) + "My business is not listed"; buttons Go Back / Start Application. Existing profile prefills. Chose "not listed" (fake data).
OPA interview (Oracle Policy Automation v15), URL /app/interview?link_goal_state=ScreenOrder~Main~qs$<SCREEN_ID>$global$global
Left nav: Business Profile [Introduction, Entity Type, Business Identification, Business Addresses, Business Physical Address, Additional Physical Location(s), Contact Information, Industry Classification, Owner/Business Principal], Application, Ready to Submit.
P1 Introduction CDI_BI_STATIC_SCRN: text only; Get Started / Exit Application. Says profile is created and reused.
P2 Entity Type CDI_BI_ENT_TYPES_SCRN: "Type of entity or organization:" select (Individual (Sole Proprietor), Limited Liability Company, Corporation, Limited Liability Partnership, Limited Partnership, Partnership, Government, Trust, Estate). Red * = required. Back / Exit.
P2 cont: choosing a type shows "Stop: Before you continue, please confirm the Business entity type... If incorrect, you will have to start a new application." + tips. Conditional sub-type select: LLC -> "Sub Type for LLC" (Member Managed LLC | Manager Managed LLC); Corporation -> "Sub Type for Corporation" (S Corp | C Corp); Partnership -> "Sub Type for Partnership" (Joint Venture | Partnerships). Button Continue. Saving shows "Saving screen ..." spinner ~3-6s. After LLC, left nav adds "Member Information" under Owner/Business Principal.
P3 Business Identification CDI_BI_SCRN_NOSP: Legal Name* (text; empty -> "This field is required."); DBA or trade name (opt); Federal Employer Identification Number (EIN) (text mask ##-#######); checkbox "I do not have a Federal Employer Identification Number (EIN)". Button "Save & Continue". Validation: EIN blank -> banner "Federal Employer Identification Number is required / You must have a Federal Employer Identification Number (EIN) to file an NYS100 ... application." EIN 99-9999999 -> "The FEIN field cannot have all of the same numbers or equal 123456789 or 987654321." Fake used: 99-0000017 accepted.
P4 Business Addresses CDI_BI_ADD_STATIC_SCRN: info only (3 address types: Business Physical Address(es) primary; Additional Physical Location(s); Mailing Address(es); checkbox "This is also a mailing address" on physical). Back / Continue.
P4 button is "Next".
P5 Business Physical Address CDI_BI_BUS_ADD_SCRN: note no permanent place -> owner's home address. ATTN (C/O) (opt); Address Line 1* (no PO Box); Address Line 2; City*; Country* (select, default United States, full world list); State/Province* (select; NY first; all states+territories); Zip Code*; ZIP + 4; County* (select of 62 NY counties; shown for NY). Button "Validate Address" -> modal "Address Verification / Address Confirmation": radio list "Use the validated address returned by the system" (USPS suggestions) OR "Use the address I provided"; button "USE SELECTED ADDRESS". Checkbox "This is also the mailing address" -> warning text "all correspondence, including your license/permit, will be sent to the physical address listed..." Buttons Back / Save & Continue. Fake 100 Placeholder St, Albany NY 12207, Albany county accepted via "address I provided".
P6 Additional Physical Location(s) CDI_ADD_LOC: grid Total Records: 0 (ADDRESS | Edit | Delete), "Add Another Location" button, shows Primary Physical Location summary (DBA, Address). Left nav now shows "Mailing Address(es)" step too. Back / Next.
P6 Additional Locations: Save & Continue with 0 rows OK. Add Another Location opens inline row editor (Update/Save and Close/Cancel).
P7 Mailing Address(es) CDI_BI_BUS_MAIL_ADD_SCRN: warning about correspondence to physical address; grid Total Records (ADDRESS|Edit|Delete), "Add Another Address"; lists "Physical Locations that are also a Mailing Address". Save & Continue with 0 extra OK when physical ticked as mailing.
P8 Contact Information CDI_BI_CONT_SCRN: Telephone Number* (mask ###-###-####) + Remove + "Add Another Telephone Number"; Mobile Phone Number (opt); Fax Number (opt); E-mail Address (tip: enter at least one) + Remove + "Add Another Email Address"; Business Website (opt). Save & Continue. Fake 518-555-0100 / placeholder@example.com accepted.
P9 Industry Classification CDI_BI_NAICS_SCRN: Primary NAICS Code: typeahead "Enter NAICS to Search" (code or description; pick from list) OR "Filter by Category" (Sector > Sub Sector > Industry > Industry Classification, Select/Reset). "Do you have a secondary NAICS Code?" Yes/No radio. Help link to 2017 NAICS search.

## P10 Owner/Business Principal intro — CDI_BI_STATIC2_SCRN
Text: collects name, title, address, phone, DOB, SSN or FEIN, ownership %, profit distribution %. Button: Next.

## P11 Member Information — CDI_LLC_MEM_SCRN (LLC only)
Grid: Title | Name | SSN | Ownership % | Address | Edit | Delete. Button "Add A Member". Footer: Back / Save & Continue / Exit Application.
Add Record modal (Edit Record = same, Type of Principal read-only, button Update):
- Type of Principal* select: Person / Business
- Title* select: Member / Managing Member
- First Name*, M.I., Last Name*, Suffix select (I, II, III, IV, V, JR, SR)
- Date of Birth* : YYYY (1926–2026) / MM / DD selects
- "Is this individual a resident of the United States?*" Yes/No buttons
- SSN: 3 boxes (###-##-####). REQUIRED when resident = Yes ("This field is required."); optional when No.
- Telephone Number* (###-###-####), E-mail Address
- Ownership Percentage*; "Profit distribution percentage, if different than ownership percentage"
- Residential Address: Line 1*, Line 2, City*, Country* (default United States), State/Province*,
  US: Zip Code*, ZIP+4, County*; non-US (e.g. Canada): Postal Code* (County/ZIP+4 disappear)
- Validate Address button (required: "You are required to validate this address.") -> Address Verification modal
  (validated suggestion or "Use the address I provided" radio; button USE SELECTED ADDRESS)
- Buttons: Save and Close / Cancel
Rules seen:
- Resident = No with a US address -> page error "You selected no to being a US resident and provided an address in the US." and Save & Continue is removed until fixed.
- Mapped onward with a non-resident member (Toronto, ON, M5V 0A1) so no SSN typed. Real adapter must send SSN for US-resident members.

# APPLICATION SECTION (nav: UI Registration, Business Identification, Business Liability, Business Transfers, Change of Legal Entity, Member Information, Address and Contact Information, Address: Location of Books and Records, Address: Notice of Potential Charges, Address: Agent - C/O, Physical Locations, Submitter Information, Ready to Submit)

## A1 Unemployment Insurance Registration intro — DOL_NYS100_1. Text only. Back / Next.
## A2 Business Identification — DOL_BUS_IDENT_SCRN
- Employer Registration Number (optional, 7-digit; "Do not enter your FEIN"; new employers get one assigned)
- Employer Type: read-only "Business Employer"
- Back / Save & Continue
## A3 Business Liability — DOL_BL_BUS_SCRN (all starred)
- "Have you paid (or do you expect to pay) total remuneration of $300 or more during any calendar quarter?*" Yes/No
- "Select the date you began business in New York State.*" MM/DD/YYYY + calendar
- "Select first calendar quarter and year that you paid (or expect to pay) total remuneration of $300 or more:*" select (January - March / April - June / July - September / October - December) + Year* textbox (yyyy)
- "Have you or will you withhold New York State Income Tax from your employees' pay?*" Yes/No
  - Yes -> "Select the date of the first payroll from which you withheld or will withhold. (mm/dd/yyyy):*"
- "Total number of Employees:*" number
- "Do persons work for you whom you do not consider to be your employees?*" Yes/No
  - Yes -> "Describe services performed:*" textarea
- Back / Save & Continue
Test values: Yes; 01/05/2026; Jan-Mar 2026; withhold Yes, 01/15/2026; 1 employee; non-employees No.

## A4 Business Transfers — DOL_BT_SCRN_
- "Have you acquired the business of an employer liable for New York State Unemployment Insurance?" Yes/No
  - Yes -> repeating "Acquired Employer Details" block (Add New / Remove; grid "DOL Business Transfer"):
    Did you acquire All or Part? (All/Part); Acquired Date; Acquired Employer Legal Name;
    Acquired Employer Address (Line1, Line2, City, Country [full list, US first], State [NY first + all states/territories], ZIP/Postal code, Zip+4, County [NY counties], Validate Address);
    Acquired Employer Registration Number (mask ##-#####); Acquired Employer's FEIN (mask ##-#######)
- Mapped with No.
- Yes-branch validation (empty Save): All/Part*, Acquired Date*, Legal Name*, Line1*, City*, ZIP/Postal*, County*, "You are required to validate this address." Reg number and FEIN not flagged.

## A5 Change of Legal Entity — DOL_CHG_LEGAL_SCRN
- "Has your Legal Entity changed?*" Yes/No
  - Yes -> Date of Legal Entity Change:* (MM/DD/YYYY); Previous NYS Employer Registration Number:*; Previous Federal Employer Identification Number:*
- Mapped with No.

## A6 Member Information check — DOL_MEMBER_CHECK
"You must enter atleast one Member for this application..." Shows member card(s) from Business Profile (Title, Name, Address, Phone, Ownership %), row selection ("1 of 1 rows selected"). Button "Add New Member Information". Back / Save & Continue.

## A7 Address and Contact Information — DOL_MAILING_ADDR
Three single-select radio grids prefilled from Business Profile, each with "Add New ...":
- Mailing Address (DBA, address) + Add New Mailing Address (opens address form w/ Validate -> USE SELECTED ADDRESS)
- Email Addresses + Add New
- Telephone Numbers + Add New
Pick one of each. Back / Save & Continue.

## A8 Address: Location of Books and Records — DOL_ADD_DET_SCRN
"Physical address where your books and records can be reviewed. This address must be located in the United States."
- "Select an Address for Location of Books and Records": radio list of profile addresses + "Other"
  - Other -> ATTN (C/O), Line1, Line2, City, Country, State, ZIP/Postal, Zip+4, County, Validate Address
- Phone Number
- Field is a SELECT (not radios): options = profile addresses + "Other" (default Other). Picking a profile address prefills the form; Validate Address still required. Phone Number* (###-###-####).

## A9 Address: Notice of Potential Charges — DOL_ADD_DET2_SCRN
"This is the address where the Notice of Potential Charges (LO400) will be sent. It is sent each time a former employee files a claim for UI benefits."
Same layout as A8: "Select an Address for: Notice of Potential Charges*" select (profile addresses / Other), ATTN, Line1*, Line2, City*, Country, State, ZIP, Zip+4, County, Validate Address, Phone Number*.
Note: first Save & Continue hung on "Processing" ~45s then dropped back; second click worked. Adapter: retry once.

## A10 Address: Agent - C/O — DOL_ADD_DET3_SCRN
"Do you want all of your mail directed to your Agent - C/O?*" Yes/No
- Yes -> ATTN (C/O)* (required here), Address Line 1*, Line 2, City, etc. Tip: "This is your agent's address. Complete this only if you want all your Unemployment Insurance mail sent here."
- Mapped with No.

## A11 Physical Locations — DOL_PHY_LOC_SCRN
"Below are Physical Locations in New York associated with the business." Grid of profile physical addresses (row selected), "Add New Physical Address(es)". Back / Save & Continue.

## A12 Physical Locations Details — DOL_PHY_LOC_SCRN_DETAILS$LSI_NYS100_PHYSICAL_LOCATION$<guid> (one per location)
- Shows the address.
- Number of employees (at the above location)
- Select Principal Activity: select — Arts, Entertainment & Recreation; Computer/Information Services; Construction; Corporate, Subsidiary Managing Office; Educational Services; Finance and Insurance; Food Service, Drinking & Accommodations; Health & Social Assistance; Manufacturing; Non store retailer; Real Estate; Rental ; Leasing Services; Retail Trade; Scientific/Professional & Technical Services; Transportation; Utilities; Warehousing; Wholesale trade; Other
  - Other -> "If other, furnish details:"
  - Manufacturing (hidden fields seen) -> Principal Products Produced:, Principal Raw Material Used:, Percent of Total Sales Value:
  - hidden "Principal Activity or farm production with greatest..." select (farm branch)
  - Service-type (e.g. Scientific/Professional) -> Type of Establishment:*, Principal Product Sold or Service Rendered:*, Percent of Total Revenue:*
- Back / Save & Continue

## A13 Submitter Information — DOL_SUB_INF_SCRN (STOP)
- First Name*, M. I., Last Name*, Official Position*, Phone Number* (###-###-####), Email*, Submitter Comments (textarea)
- Text: "By pressing the submit button, I affirm that I have read the above questions and that the answers provided are true to the best of my knowledge and belief."
- Checkbox "I attest to the above" (shown greyed until the fields are filled; not ticked)
- Empty Save & Continue → "This field is required." on First Name, Last Name, Official Position, Phone Number, Email.
- Back / Save & Continue. Next nav step: **Ready to Submit** (not reached; expected to hold the final Submit).

## Not mapped
- Ready to Submit (behind the attestation).
- Corporation / sole-prop / partnership owner screens (only the LLC Member path was walked; nav shows Owner/Business Principal varies by entity type).
- US-resident member path (needs an SSN).
