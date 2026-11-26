import type { FieldIntent, ScreenIntents } from "../../resolver/types.js";

/**
 * NYS-100 (Employer Registration for Unemployment Insurance, Withholding, and Wage Reporting) on
 * NY Business Express, from the signed-in walk of 2026-11-24 (docs/portal-maps/ny-nys100-unemployment.md).
 * The interview is Oracle Policy Automation (OPA v15): screen ids are in the comments
 * (each is addressable as /app/interview?link_goal_state=ScreenOrder~Main~qs$<ID>$global$global).
 *
 * Labels are the wording seen on the walk. Yes/No questions are styled buttons, answered by their
 * question text (see opa.ts), so they are not intents here. Fields a Yes, a choice or a country
 * reveals are optional intents: the adapter waits for them after the choice and checks it got them.
 * One run creates or reuses a Business Profile (P1 to P11) and then fills the Application (A1 to A13).
 */

/** The address block every OPA address uses (P5, member records, A4, A8, A9, A10). */
export function addressIntents(section?: string): FieldIntent[] {
  const s = section ? { section } : {};
  return [
    { key: "attn", labels: ["ATTN (C/O)", "ATTN"], kinds: ["text"], required: false, ...s },
    { key: "line1", labels: ["Address Line 1", "Line 1", "Line1"], kinds: ["text"], required: false, note: "no PO box on a physical address", ...s },
    { key: "line2", labels: ["Address Line 2", "Line 2", "Line2"], kinds: ["text"], required: false, ...s },
    { key: "city", labels: ["City"], kinds: ["text"], required: false, ...s },
    { key: "country", labels: ["Country"], kinds: ["select"], required: false, note: "default United States", ...s },
    { key: "state", labels: ["State/Province", "State"], kinds: ["select", "text"], required: false, note: "NY first, then every state and territory", ...s },
    { key: "zip", labels: ["Zip Code", "ZIP/Postal Code", "ZIP Code"], kinds: ["text"], required: false, note: "US addresses", ...s },
    { key: "zip4", labels: ["ZIP + 4", "Zip+4", "ZIP+4"], kinds: ["text"], required: false, ...s },
    { key: "postalCode", labels: ["Postal Code"], kinds: ["text"], required: false, note: "non-US addresses (County and ZIP + 4 disappear)", ...s },
    { key: "county", labels: ["County"], kinds: ["select"], required: false, note: "the 62 NY counties; shown for a New York address", ...s },
  ];
}

/** The same block as a resolvable screen of its own (addresses are filled after a choice opens them). */
export function addressScreen(screenKey: string, title: string, section?: string): ScreenIntents {
  return { screenKey: `${screenKey}#address`, title: `${title}: address`, intents: addressIntents(section) };
}

const NAICS_FILTERS = ["Filter by Category", "Sector", "Sub Sector", "Industry", "Industry Classification"];

export const NY_PAYROLL_SCREENS = {
  /** P0, /app/dashboard/descriptionToInterview?licenseTypeCode=NYS100&appTypeCode=INITAPP (not OPA yet). */
  selectBusiness: {
    screenKey: "ny.nys100.select_business",
    title: "Select the business you are applying for",
    intents: [
      { key: "business", labels: ["Select the business you are applying for"], kinds: ["radio"], required: false, note: "the account's Business Profiles (name, entity type, FEIN) + My business is not listed; checked in fill" },
    ],
    // One choice per Business Profile on the account: it differs from run to run by design.
    dynamicFields: ["^Select the business you are applying for"],
  },
  /** P1 CDI_BI_STATIC_SCRN: text only; Get Started. */
  introduction: { screenKey: "ny.nys100.bp_introduction", title: "Introduction", intents: [] },
  /** P2 CDI_BI_ENT_TYPES_SCRN. A type shows the "Stop: ... confirm the Business entity type" notice and its sub type. */
  entityType: {
    screenKey: "ny.nys100.bp_entity_type",
    title: "Entity Type",
    intents: [
      { key: "entityType", labels: ["Type of entity or organization"], kinds: ["select"], required: true, note: "cannot be changed later without a new application" },
      { key: "llcSubType", labels: ["Sub Type for LLC"], kinds: ["select"], required: false, note: "C: LLC (Member Managed LLC | Manager Managed LLC)" },
      { key: "corpSubType", labels: ["Sub Type for Corporation"], kinds: ["select"], required: false, note: "C: Corporation (S Corp | C Corp)" },
      { key: "partnershipSubType", labels: ["Sub Type for Partnership"], kinds: ["select"], required: false, note: "C: Partnership (Joint Venture | Partnerships)" },
    ],
    // A reused Business Profile opens with its type chosen, so its sub type is already showing.
    dynamicFields: ["^Sub Type for"],
  },
  /** P3 CDI_BI_SCRN_NOSP. */
  businessIdentification: {
    screenKey: "ny.nys100.bp_identification",
    title: "Business Identification",
    intents: [
      { key: "legalName", labels: ["Legal Name"], kinds: ["text"], required: true },
      { key: "dba", labels: ["DBA or trade name"], kinds: ["text"], required: false },
      { key: "fein", labels: ["Federal Employer Identification Number (EIN)"], kinds: ["text"], required: true, note: "mask ##-#######; required to file online; all-same digits, 123456789 and 987654321 refused" },
    ],
    knownUnused: ["I do not have a Federal Employer Identification Number (EIN)"],
  },
  /** P4 CDI_BI_ADD_STATIC_SCRN: the three address types, text only; Next. */
  addressesIntro: { screenKey: "ny.nys100.bp_addresses", title: "Business Addresses", intents: [] },
  /** P5 CDI_BI_BUS_ADD_SCRN. Validate Address opens the Address Verification modal. */
  physicalAddress: {
    screenKey: "ny.nys100.bp_physical_address",
    title: "Business Physical Address",
    intents: [
      ...addressIntents().map((i) => (["line1", "city", "state", "zip"].includes(i.key) ? { ...i, required: true } : i)),
      { key: "alsoMailing", labels: ["This is also the mailing address", "This is also a mailing address"], kinds: ["checkbox"], required: false, note: "ticked: all correspondence goes to the physical address" },
    ],
    // County shows for a New York address, Postal Code for a non-US one: a reused profile opens with them showing.
    dynamicFields: ["^County", "^Postal Code"],
  },
  /** P6 CDI_ADD_LOC: grid of additional locations (Add Another Location); none is fine. */
  additionalLocations: { screenKey: "ny.nys100.bp_additional_locations", title: "Additional Physical Location(s)", intents: [] },
  /** P7 CDI_BI_BUS_MAIL_ADD_SCRN: grid of extra mailing addresses; none when the physical one is ticked as mailing. */
  mailingAddresses: { screenKey: "ny.nys100.bp_mailing_addresses", title: "Mailing Address(es)", intents: [] },
  /** P8 CDI_BI_CONT_SCRN. */
  contact: {
    screenKey: "ny.nys100.bp_contact",
    title: "Contact Information",
    intents: [
      { key: "phone", labels: ["Telephone Number"], kinds: ["tel", "text"], required: true, note: "mask ###-###-####" },
      { key: "mobile", labels: ["Mobile Phone Number"], kinds: ["tel", "text"], required: false },
      { key: "fax", labels: ["Fax Number"], kinds: ["tel", "text"], required: false },
      { key: "email", labels: ["E-mail Address"], kinds: ["email", "text"], required: false, note: "tip: enter at least one" },
      { key: "website", labels: ["Business Website"], kinds: ["text"], required: false },
    ],
  },
  /** P9 CDI_BI_NAICS_SCRN: Primary NAICS by typeahead (code or description; pick from the list). */
  industry: {
    screenKey: "ny.nys100.bp_industry",
    title: "Industry Classification",
    intents: [
      { key: "naicsSearch", labels: ["Enter NAICS to Search", "Primary NAICS Code"], kinds: ["text"], required: true },
      { key: "secondaryNaics", labels: ["Do you have a secondary NAICS Code?"], kinds: ["radio"], required: false, note: "Yes/No radio" },
    ],
    knownUnused: NAICS_FILTERS,
  },
  /** P10 CDI_BI_STATIC2_SCRN: Owner/Business Principal intro; Next. */
  ownerIntro: { screenKey: "ny.nys100.bp_owner_intro", title: "Owner/Business Principal", intents: [] },
  /** P11 CDI_LLC_MEM_SCRN (LLC only): grid Title | Name | SSN | Ownership % | Address; Add A Member. */
  members: { screenKey: "ny.nys100.bp_members", title: "Member Information", intents: [] },
  /** P11 Add Record / Edit Record modal (Edit: Type of Principal read-only, button Update). */
  memberRecord: {
    screenKey: "ny.nys100.bp_member_record",
    title: "Member Information: Add Record",
    intents: [
      { key: "principalType", labels: ["Type of Principal"], kinds: ["select"], required: false, note: "Person | Business; read-only on Edit" },
      { key: "title", labels: ["Title"], kinds: ["select"], required: true, note: "Member | Managing Member" },
      { key: "firstName", labels: ["First Name"], kinds: ["text"], required: true },
      { key: "middleInitial", labels: ["M.I.", "Middle Initial"], kinds: ["text"], required: false },
      { key: "lastName", labels: ["Last Name"], kinds: ["text"], required: true },
      { key: "suffix", labels: ["Suffix"], kinds: ["select"], required: false, note: "I, II, III, IV, V, JR, SR" },
      { key: "ssn", labels: ["SSN", "Social Security Number"], kinds: ["text"], required: false, note: "SENSITIVE; 3 boxes ###-##-####; required when a US resident" },
      { key: "phone", labels: ["Telephone Number"], kinds: ["tel", "text"], required: true },
      { key: "email", labels: ["E-mail Address"], kinds: ["email", "text"], required: false },
      { key: "ownership", labels: ["Ownership Percentage"], kinds: ["text", "number"], required: true },
      { key: "profitShare", labels: ["Profit distribution percentage, if different than ownership percentage"], kinds: ["text", "number"], required: false },
      ...addressIntents(),
    ],
  },
  /** A1 DOL_NYS100_1: Unemployment Insurance Registration intro; Next. */
  uiIntroduction: { screenKey: "ny.nys100.ui_introduction", title: "Unemployment Insurance Registration", intents: [] },
  /** A2 DOL_BUS_IDENT_SCRN. Employer Type is read-only "Business Employer". */
  uiIdentification: {
    screenKey: "ny.nys100.ui_identification",
    title: "Business Identification",
    intents: [
      { key: "registrationNumber", labels: ["Employer Registration Number"], kinds: ["text"], required: false, note: "7 digits; not the FEIN; new employers get one assigned" },
    ],
    knownUnused: ["Employer Type"],
  },
  /** A3 DOL_BL_BUS_SCRN (all starred). */
  liability: {
    screenKey: "ny.nys100.ui_liability",
    title: "Business Liability",
    intents: [
      { key: "beganDate", labels: ["Select the date you began business in New York State"], kinds: ["text", "date"], required: true, note: "MM/DD/YYYY" },
      { key: "firstQuarter", labels: ["Select first calendar quarter and year that you paid (or expect to pay) total remuneration of $300 or more"], kinds: ["select"], required: true, note: "January - March | April - June | July - September | October - December" },
      { key: "firstYear", labels: ["Year"], kinds: ["text", "number"], required: true, note: "yyyy" },
      { key: "firstPayrollDate", labels: ["Select the date of the first payroll from which you withheld or will withhold"], kinds: ["text", "date"], required: false, note: "C: withholding = Yes" },
      { key: "employees", labels: ["Total number of Employees"], kinds: ["text", "number"], required: true },
      { key: "servicesPerformed", labels: ["Describe services performed"], kinds: ["textarea", "text"], required: false, note: "C: non-employee workers = Yes" },
    ],
  },
  /** A4 DOL_BT_SCRN_. Yes opens one "Acquired Employer Details" block (Add New / Remove). */
  transfers: {
    screenKey: "ny.nys100.ui_transfers",
    title: "Business Transfers",
    intents: [
      { key: "acquiredDate", labels: ["Acquired Date"], kinds: ["text", "date"], required: false },
      { key: "acquiredName", labels: ["Acquired Employer Legal Name"], kinds: ["text"], required: false },
      { key: "acquiredRegistration", labels: ["Acquired Employer Registration Number"], kinds: ["text"], required: false, note: "mask ##-#####" },
      { key: "acquiredFein", labels: ["Acquired Employer's FEIN", "Acquired Employer FEIN"], kinds: ["text"], required: false, note: "mask ##-#######" },
    ],
  },
  /** A5 DOL_CHG_LEGAL_SCRN. */
  legalEntityChange: {
    screenKey: "ny.nys100.ui_legal_entity_change",
    title: "Change of Legal Entity",
    intents: [
      { key: "changeDate", labels: ["Date of Legal Entity Change"], kinds: ["text", "date"], required: false },
      { key: "previousRegistration", labels: ["Previous NYS Employer Registration Number"], kinds: ["text"], required: false },
      { key: "previousFein", labels: ["Previous Federal Employer Identification Number"], kinds: ["text"], required: false },
    ],
  },
  /** A6 DOL_MEMBER_CHECK: the members from the Business Profile, row selection. */
  memberCheck: { screenKey: "ny.nys100.ui_member_check", title: "Member Information", intents: [] },
  /** A7 DOL_MAILING_ADDR: three single-select radio grids (mailing address, email, telephone), from the profile. */
  addressAndContact: {
    screenKey: "ny.nys100.ui_address_contact",
    title: "Address and Contact Information",
    intents: [],
    // Each list shows this business's own profile entries.
    dynamicFields: ["^Mailing Address", "^E-?mail Address", "^Telephone Number"],
  },
  /** A8 DOL_ADD_DET_SCRN: a select of the profile's addresses + Other; Validate Address still required. */
  booksAndRecords: {
    screenKey: "ny.nys100.ui_books_records",
    title: "Address: Location of Books and Records",
    intents: [
      { key: "addressChoice", labels: ["Select an Address for Location of Books and Records"], kinds: ["select"], required: false, note: "profile addresses + Other (default Other); US only; checked in fill" },
      ...addressIntents(),
      { key: "phone", labels: ["Phone Number"], kinds: ["tel", "text"], required: true },
    ],
    dynamicFields: ["^Select an Address for"], // its choices are the profile's addresses
  },
  /** A9 DOL_ADD_DET2_SCRN: where the Notice of Potential Charges (LO400) goes. Its first save once hung ~45s. */
  potentialCharges: {
    screenKey: "ny.nys100.ui_potential_charges",
    title: "Address: Notice of Potential Charges",
    intents: [
      { key: "addressChoice", labels: ["Select an Address for: Notice of Potential Charges"], kinds: ["select"], required: false, note: "profile addresses + Other; checked in fill" },
      ...addressIntents(),
      { key: "phone", labels: ["Phone Number"], kinds: ["tel", "text"], required: true },
    ],
    dynamicFields: ["^Select an Address for"],
  },
  /** A10 DOL_ADD_DET3_SCRN. Yes opens ATTN (C/O)* and the agent's address. */
  agent: {
    screenKey: "ny.nys100.ui_agent",
    title: "Address: Agent - C/O",
    intents: addressIntents(),
  },
  /** A11 DOL_PHY_LOC_SCRN: the profile's NY physical locations (row selected). */
  physicalLocations: { screenKey: "ny.nys100.ui_physical_locations", title: "Physical Locations", intents: [] },
  /** A12 DOL_PHY_LOC_SCRN_DETAILS$LSI_NYS100_PHYSICAL_LOCATION$<guid>, one per location. */
  locationDetails: {
    screenKey: "ny.nys100.ui_location_details",
    title: "Physical Locations Details",
    intents: [
      { key: "employees", labels: ["Number of employees"], kinds: ["text", "number"], required: true, note: "at the location shown" },
      { key: "activity", labels: ["Select Principal Activity"], kinds: ["select"], required: true },
      { key: "otherDetails", labels: ["If other, furnish details"], kinds: ["text", "textarea"], required: false, note: "C: Other" },
      { key: "productsProduced", labels: ["Principal Products Produced"], kinds: ["text", "textarea"], required: false, note: "C: Manufacturing" },
      { key: "rawMaterials", labels: ["Principal Raw Material Used"], kinds: ["text", "textarea"], required: false, note: "C: Manufacturing" },
      { key: "percentOfSalesValue", labels: ["Percent of Total Sales Value"], kinds: ["text", "number"], required: false, note: "C: Manufacturing" },
      { key: "establishmentType", labels: ["Type of Establishment"], kinds: ["text", "textarea"], required: false, note: "C: service activities" },
      { key: "productOrService", labels: ["Principal Product Sold or Service Rendered"], kinds: ["text", "textarea"], required: false, note: "C: service activities" },
      { key: "percentOfRevenue", labels: ["Percent of Total Revenue"], kinds: ["text", "number"], required: false, note: "C: service activities" },
    ],
  },
  /** A13 DOL_SUB_INF_SCRN: where the walk stopped. "I attest to the above" is the submitter's own certification. */
  submitter: {
    screenKey: "ny.nys100.ui_submitter",
    title: "Submitter Information",
    intents: [
      { key: "firstName", labels: ["First Name"], kinds: ["text"], required: true },
      { key: "middleInitial", labels: ["M. I.", "M.I."], kinds: ["text"], required: false },
      { key: "lastName", labels: ["Last Name"], kinds: ["text"], required: true },
      { key: "position", labels: ["Official Position"], kinds: ["text"], required: true },
      { key: "phone", labels: ["Phone Number"], kinds: ["tel", "text"], required: true, note: "###-###-####" },
      { key: "email", labels: ["Email"], kinds: ["email", "text"], required: true },
      { key: "comments", labels: ["Submitter Comments"], kinds: ["textarea"], required: false },
      { key: "attest", labels: ["I attest to the above"], kinds: ["checkbox"], required: false, note: "STOP: greyed until the fields are filled; ticked only on a live run with the submitter's attestation on file" },
    ],
  },
  /** Ready to Submit: the last nav step, behind the attestation. Not reached on the walk, so not mapped. */
  readyToSubmit: { screenKey: "ny.nys100.ready_to_submit", title: "Ready to Submit", intents: [] },
} satisfies Record<string, ScreenIntents>;

/** The address verification modal Validate Address opens (P5, member records, A4, A8 to A10). */
export const NY_ADDRESS_MODAL: ScreenIntents = {
  screenKey: "ny.nys100.address_verification",
  title: "Address Verification",
  intents: [
    { key: "choice", labels: ["Address Confirmation", "Address Verification", "Use the validated address returned by the system"], kinds: ["radio"], required: false, note: "USPS suggestion(s) or Use the address I provided" },
  ],
};

/** A12 Select Principal Activity: the options seen on the walk. */
export const NY_PRINCIPAL_ACTIVITIES = [
  "Arts, Entertainment & Recreation", "Computer/Information Services", "Construction", "Corporate, Subsidiary Managing Office",
  "Educational Services", "Finance and Insurance", "Food Service, Drinking & Accommodations", "Health & Social Assistance",
  "Manufacturing", "Non store retailer", "Real Estate", "Rental ; Leasing Services", "Retail Trade",
  "Scientific/Professional & Technical Services", "Transportation", "Utilities", "Warehousing", "Wholesale trade", "Other",
] as const;

/** NY payroll registration has no filing fee. */
export const NY_PAYROLL_FEE_USD = 0;
