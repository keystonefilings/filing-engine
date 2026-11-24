# IRS EIN online (EIN Assistant)

**Status:** mapped end to end up to the final "Submit EIN Request" button (step 5 of 6). Not submitted.
**Browser:** first Claude's cloud browser as a guest (screens 0 to 3), then the user's own Chrome, where the user typed their own SSN on the Identity screen (Nov 24). No sign-in or account needed. The SSN is not recorded anywhere in this map.
**Mapped:** Nov 24, 2026, UTC. Test data used: 1 member, New York, "Started a new business", Test Placeholder ZQXV LLC, 123 Test Placeholder St, 2 employees, Consulting > Management.
**Fee:** free. The IRS page says "You never have to pay a fee for an EIN."

## Rules that shape the adapter
- **One session, no save.** The session times out after 15 minutes of inactivity, and then you start over. The adapter has to run start to finish in one go.
- **Hours (ET):** Mon–Fri 6:00 a.m. to 1:00 a.m. the next day; Sat 6:00 a.m. to 9:00 p.m.; Sun 6:00 p.m. to midnight. Jobs need to be queued outside these windows.
- **Limit:** 1 EIN per responsible party per day, across online, phone, fax and mail.
- **Eligibility:** a domestic entity with its principal place of business in the US or a US territory. The responsible party (or an authorized representative) must have the responsible party's SSN or ITIN. You can't apply this way with an EIN as the responsible party, unless you're a government entity. Foreign filers without an ITIN can't use it. An entity incorporated abroad must call 267-941-1099.
- **Third-party designee (that's us):** "you must have signed authorization to apply." Our client intake needs a signed SS-4-style designee authorization.
- **Order:** form the entity with the state first. The IRS says skipping that may delay the EIN.
- **Business name:** must follow the IRS name formatting rules (link on the launch page).

## Screen 0: launch page
- **URL:** https://www.irs.gov/businesses/small-businesses-self-employed/get-an-employer-identification-number (the old apply-for-an-ein-online URL redirects here)
- **Advance:** button "Apply for an EIN", which goes to sa.www4.irs.gov/applyein/

## Screen 1: Before You Begin
- **URL:** https://sa.www4.irs.gov/applyein/
- **Title:** "Apply for an Employer Identification Number (EIN)"
- **Sections:** Important Information Before You Begin (with a link to paper Form SS-4), About the EIN Assistant, Restrictions
- **Header:** Help, English language toggle, Exit
- **Advance:** "Begin Application Now"

## Progress tracker (6 steps)
1 Legal Structure, 2 Identity, 3 Addresses, 4 Additional Details, 5 Review & Submit, 6 EIN Assignment

## Screen 2: Legal Structure
- **URL:** /applyein/legalStructure
- **"Choose type of legal structure\*"** (radio):
  - Sole Proprietor (includes household employers)
  - Partnerships (incl. joint ventures)
  - Corporations (incl. S corps, PSCs, REITs, RICs, settlement funds)
  - Limited Liability Company (LLC)
  - Estate
  - Trusts (incl. conservatorships, custodianships, guardianships, irrevocable/revocable, receiverships)
  - Indian Tribal Governments/Enterprises
  - View Additional Types, Including Tax-Exempt and Governmental Organizations
- **Validation:** Continue with nothing picked shows the error banner "Legal Structure: Selection is required."
- **The rest of the screen is built from earlier answers.**
  - **LLC picked:** a confirm box shows what an LLC is and isn't, then two fields appear.
    - "How many member(s) are in the LLC?\*" (text, number)
    - "Please select the state/territory where the business is physically located\*" (dropdown: 50 states, DC, AS, FM, GU, MH, MP, PR, VI, and the Armed Forces codes AA/AP/AE). It has a "Community Property States" help topic.
  - **Members = 1:** a confirm box says it's a Single-Member LLC, a disregarded entity by default, and that you file Form 8832 or 2553 to elect otherwise. A member count over 1 should give the multi-member path, but I didn't try it.
  - **Then "Why is the ... requesting an EIN?" → "Choose one reason ...\*"** (radio):
    - Started a new business
    - Hired employee(s)
    - Banking purposes
    - Changed type of organization
    - Purchased active business
- **Buttons:** Back, Continue, Cancel

## Screen 3: Identity (Responsible Party)
- **URL:** /applyein/identityOfEntities
- **Text:** "Please tell us about the Responsible Party of the LLC" / "Must match IRS records or this application cannot be processed."
- **Fields:**
  - **SSN/ITIN\*** (masked text, format example 123-45-6789; link "Show SSN/ITIN"; help topic)
  - **First name\*.** "The only special characters allowed are '-' and '&'"
  - **Middle name/initial** (optional, same character rule)
  - **Last name\*** (same character rule)
  - **Suffix** (optional dropdown: DDS, MD, PHD, Jr, Sr, I, II, III, IV, V, VI)
- **"Your role" → Choose one\*** (radio):
  - "I am one of the owners, members, or the managing member of this LLC."
  - "I am a third party applying for an EIN on behalf of this LLC." Picking this showed no extra fields on this screen. The designee's details probably come on a later step.
- **Validation:** Continue with the fields empty shows "The following 3 errors have occurred:"
  - "Social Security Number: Input is required. (Responsible Party)"
  - "First Name: Input is required. (Responsible Party)"
  - "Last Name: Input is required. (Responsible Party)"
- **How it was passed (Nov 24):** the user typed their own real SSN and name in their Chrome. None of it is recorded here.

## Screen 4: Addresses
- **URL:** /applyein/addAddresses
- **Heading:** "Where is the Single Member Limited Liability Company (LLC) physically located?"
- **Fields:**
  - **Street\*** (text). Only '-' and '/' allowed as special characters. Note: "Must be a U.S. address. Do not enter a P.O. box." Link: "For military addresses click here."
  - **City\*** (text)
  - **State/U.S. territory\*** (dropdown, same list as screen 2; help topic)
  - **ZIP/Postal code\*** (text). Hint: "The postal code must be 5 digits"
  - **Phone number\*** (text). Hint: "Must contain only digits; do not enter extensions". Shown back as 555-555-0100.
  - **"Do you have an address different from the above where you want your mail to be sent?\*"** Yes/No radio. Yes (not tried) should open a mailing address block.
- **Buttons:** Back, Continue, Cancel
- **Test data used:** 123 Test Placeholder St, New York, NY 10001, 5555550100, No.

## Screen 5: Additional Details (part 1)
- **URL:** /applyein/additionalDetails
- **"Tell us about the Limited Liability Company (LLC)"**
  - **Legal name\*** "(must match articles of organization, if filed)". May not end in 'Corp', 'Inc', 'PA'. Only '-' and '&' allowed.
  - **Trade name/Doing business as** (optional, only if different). May not end in 'LLC', 'LC', 'PLLC', 'PA', 'Corp', 'Inc'. Only '-' and '&'.
  - **County where the LLC is located\*** (text)
  - **State/Territory where the LLC is located\*** (dropdown)
  - **State/Territory where articles of organization are (or will be) filed\*** (dropdown)
  - **LLC Start Date\*** Month (dropdown) + Year (text)
- **"Tell us more about the LLC"** (each Yes/No radio, all required):
  - Owns a highway motor vehicle with taxable gross weight 55,000 lb or more?
  - Involves gambling/wagering?
  - Needs to file Form 720 (Quarterly Federal Excise Tax Return)?
  - Sells or manufactures alcohol, tobacco, or firearms?
  - Has or expects employees who will receive Forms W-2 in the next 12 months?
- **Employees = Yes opens "Describe your employees":**
  - **First date wages or annuities were or will be paid\*** Month + Year. Hint: "If applicant is a withholding agent, enter the date income will first be paid to a nonresident alien"
  - **Highest number of employees expected in the next 12 months\*** "Total number of employees must be at least 1"
    - Number of agricultural employees (text)
    - Number of other employees (text)
  - **"Do you expect your employment tax liability to be $1,000 or less in a full calendar year?\*"** Yes = elects annual Form 944; No = quarterly Form 941.
- **Buttons:** Back, Continue, Cancel

## Screen 6: Additional Details (part 2), business activity
- **URL:** /applyein/activityAndServices
- **"Choose one category that best describes your business\*"** (radio, each with a description line): Accommodations, Construction, Finance, Food Service, Health Care, Insurance, Manufacturing, Real Estate, Rental & Leasing, Retail, Social Assistance, Transportation, Warehousing, Wholesale, Other.
- **Other opens "Tell us more about your Other activities":** primary activity\* radio: Consulting, Manufacturing, Organization (religious, environmental, social or civic, athletic, etc.), Rental, Repair, Sell goods, Service, Other.
  - **Consulting** opens "Do you provide operating advice and assistance to businesses and other organizations?\*" Yes/No.
  - **Yes** opens "Please specify type of consulting (for example, management, marketing, etc.):\*" (text).
  - Each other category and sub-choice has its own follow-up questions; only Other > Consulting > Yes was walked.
- **Buttons:** Back, Continue, Cancel

## Screen 7: Review & Submit. FINAL SCREEN, NOT SUBMITTED
- **URL:** /applyein/reviewAndSubmit
- **Warning:** "If any of the information below is incorrect, you will need to start a new application." There is no edit-in-place; Back is the only way to change answers.
- **"How would you like to receive your EIN Confirmation Letter?\*"** radio:
  - Receive letter digitally in the next step (needs Adobe Reader; view, print, save now; not mailed)
  - Receive letter by mail (up to 4 weeks, to the mailing address given)
- **Summary blocks shown:** Legal Structure; LLC Information (legal name, county, state, start date, articles state); Addresses (physical location, phone, "Mail directed To"); Responsible Party (name with " SOLE MBR" appended, SSN/ITIN masked XXX-XX-####); Employee Information; Principal Business Activity ("What your business/organization does", "Principal product/service"); Additional LLC Information (the five Yes/No answers); Reason for Applying.
- Everything is shown back in UPPER CASE.
- **Final button:** "Submit EIN Request". Text: processing "can take up to two minutes". Also Back and Cancel.
- **Not pressed.** Pressing it would issue a real EIN to the test LLC under the user's SSN.

## Screen 8: EIN Assignment
- Not reached. Per the review screen, the digital option shows the CP 575 letter here.

## Not mapped
- EIN Assignment (where the CP 575 confirmation letter is downloaded), since that needs a real submit.
- The separate mailing address block, the employees = No path, and the third-party designee path.
- The other legal structures' screen 2 branches, and the multi-member LLC branch.
- Screens 3 to 7 were walked on Nov 24 with the user's own SSN, typed by the user; everything else was fake. The session was left on Review & Submit unsubmitted and should simply be abandoned (15-minute timeout).
