import type { ScreenIntents } from "../../resolver/types.js";

/**
 * IRS EIN Assistant (sa.www4.irs.gov/applyein), domestic single-member LLC with an
 * individual responsible party. Wording from the portal map of 2026-11-24
 * (docs/portal-maps/irs-ein-online.md, walked to "Submit EIN Request"), with the earlier
 * labels kept as fallbacks (docs/walks/ny-irs-2026-11-18.md).
 *
 * The live pages: Legal Structure (structure, then member count and physical state, then the
 * reason, each revealed on the same page by the answer before it) -> Identity -> Addresses ->
 * Additional Details (the LLC, the five Yes/No questions, then the employee questions revealed
 * by Yes) -> business activity -> Review & Submit -> EIN Assignment. The screens marked
 * "revealed" below are parts of a page, filled after they appear; they have no Continue.
 * SSN/ITIN is entered only from a protected source and never recorded.
 */
/** Landing page before Legal Structure, when the assistant shows one ("Begin Application"). */
export const IRS_START: ScreenIntents = { screenKey: "irs.start", title: "EIN Assistant start", intents: [] };

/** Radio groups are matched by their question text (legend), so each radio intent lists the
 *  question wording first and the option wording after it. */
export const IRS_SCREENS = {
  legalStructure: { screenKey: "irs.legal_structure", title: "Legal Structure", intents: [
    { key: "legalStructure", labels: ["Choose type of legal structure", "Limited Liability Company (LLC)", "Legal structure", "Legal entity type"], kinds: ["radio"], required: true, note: "LLC and corporation are distinct choices" },
  ] },
  /** Revealed on the Legal Structure page after "Limited Liability Company (LLC)". */
  llcMembers: { screenKey: "irs.llc_members", title: "Legal Structure: LLC members and location (revealed)", intents: [
    { key: "memberCount", labels: ["How many member(s) are in the LLC", "Number of LLC members", "How many members"], kinds: ["number", "text"], required: true, note: "1 = single-member LLC (a disregarded entity by default)" },
    { key: "physicalState", labels: ["Please select the state/territory where the business is physically located", "State where the LLC is physically located", "physically located"], kinds: ["select"], required: true, note: "physical business location, not the formation state" },
    { key: "spouses", labels: ["owned by spouses", "community property"], kinds: ["radio"], required: false, note: "C: only for a qualifying two-member LLC in a community-property location (published)" },
  ] },
  /** Revealed on the Legal Structure page after the member count and state. */
  reason: { screenKey: "irs.reason", title: "Legal Structure: reason for applying (revealed)", intents: [
    { key: "reason", labels: ["Choose one reason", "requesting an EIN", "Why is the LLC requesting an EIN", "Reason for applying"], kinds: ["radio"], required: true },
  ] },
  identity: { screenKey: "irs.identity", title: "Identity: responsible party", intents: [
    { key: "rpFirstName", labels: ["First name"], kinds: ["text"], required: true },
    { key: "rpMiddle", labels: ["Middle name/initial", "Middle name", "Middle initial"], kinds: ["text"], required: false },
    { key: "rpLastName", labels: ["Last name"], kinds: ["text"], required: true },
    { key: "rpSuffix", labels: ["Suffix"], kinds: ["select"], required: false, note: "DDS, MD, PHD, Jr, Sr, I-VI" },
    { key: "rpSsn", labels: ["SSN", "ITIN", "SSN/ITIN", "Social Security Number"], kinds: ["text", "password"], required: true, note: "SENSITIVE: protected source only; never recorded" },
    { key: "applicantRole", labels: ["Your role", "Choose one", "I am one of the owners, members, or the managing member of this LLC", "I am a third party applying for an EIN on behalf of this LLC"], kinds: ["radio"], required: true },
  ] },
  designee: { screenKey: "irs.designee", title: "Third-party designee", intents: [
    { key: "designeeFirstName", labels: ["Designee first name", "First name"], kinds: ["text"], required: true },
    { key: "designeeLastName", labels: ["Designee last name", "Last name"], kinds: ["text"], required: true },
    { key: "designeeStreet", labels: ["Street", "Address"], kinds: ["text"], required: true },
    { key: "designeeCity", labels: ["City"], kinds: ["text"], required: true },
    { key: "designeeState", labels: ["State", "State/Territory"], kinds: ["select"], required: true },
    { key: "designeeZip", labels: ["ZIP", "ZIP code"], kinds: ["text"], required: true },
    { key: "designeePhone", labels: ["Phone"], kinds: ["tel", "text"], required: true, note: "designee's own contact; fax/mail required if it matches the taxpayer's (published)" },
  ] },
  address: { screenKey: "irs.address", title: "Addresses: physical location", intents: [
    { key: "street", labels: ["Street", "Street address", "Physical location"], kinds: ["text"], required: true, note: "U.S. address, no P.O. box; only '-' and '/' allowed" },
    { key: "city", labels: ["City"], kinds: ["text"], required: true },
    { key: "state", labels: ["State", "State/U.S. territory"], kinds: ["select"], required: true },
    { key: "zip", labels: ["ZIP/Postal code", "ZIP code"], kinds: ["text"], required: true, note: "5 digits" },
    { key: "phone", labels: ["Phone number", "Phone"], kinds: ["tel", "text"], required: true, note: "digits, no extension" },
    { key: "hasMailing", labels: ["Do you have an address different from the above where you want your mail to be sent", "Do you have a different mailing address", "Separate mailing address"], kinds: ["radio"], required: true },
  ] },
  mailing: { screenKey: "irs.mailing", title: "Addresses: mailing address", intents: [
    { key: "mailStreet", labels: ["Street", "Mailing street"], kinds: ["text"], required: true, note: "P.O. box and international allowed here" },
    { key: "mailCity", labels: ["City"], kinds: ["text"], required: true },
    { key: "mailState", labels: ["State", "State/province/U.S. territory"], kinds: ["select", "text"], required: true },
    { key: "mailZip", labels: ["ZIP", "ZIP/postal code"], kinds: ["text"], required: true },
    { key: "mailCountry", labels: ["Country"], kinds: ["select"], required: true, note: "United States preselected" },
  ] },
  /** Additional Details page: the LLC, then the five Yes/No questions (irs.regulatory) on the same page. */
  details: { screenKey: "irs.details", title: "Additional Details: the LLC", intents: [
    { key: "legalName", labels: ["Legal name", "Full legal name", "Legal name of LLC"], kinds: ["text"], required: true, note: "must match the articles; may not end in Corp, Inc or PA; only '-' and '&'" },
    { key: "tradeName", labels: ["Trade name/Doing business as", "Trade name", "Doing business as", "DBA"], kinds: ["text"], required: false },
    { key: "county", labels: ["County where the LLC is located", "County", "Physical county"], kinds: ["text"], required: true },
    { key: "physicalStateDetail", labels: ["State/Territory where the LLC is located", "Physical state/territory"], kinds: ["select"], required: true, note: "read back; initially unselected even after the Addresses state" },
    { key: "formationState", labels: ["State/Territory where articles of organization are (or will be) filed", "State where the articles", "Formation state"], kinds: ["select"], required: true },
    { key: "startMonth", labels: ["LLC Start Date", "Start month"], kinds: ["select"], required: true, note: "month dropdown" },
    { key: "startYear", labels: ["LLC Start Date year", "Start year", "Year"], kinds: ["text", "number"], required: true },
  ] },
  /** Additional Details page, "Tell us more about the LLC": five Yes/No questions, all required. */
  regulatory: { screenKey: "irs.regulatory", title: "Additional Details: Yes/No questions", intents: [
    { key: "highwayVehicle", labels: ["highway motor vehicle", "55,000", "heavy highway vehicle"], kinds: ["radio"], required: true },
    { key: "wagering", labels: ["gambling", "wagering"], kinds: ["radio"], required: true },
    { key: "form720", labels: ["Form 720", "excise tax"], kinds: ["radio"], required: true },
    { key: "atf", labels: ["alcohol, tobacco", "firearms", "ATF"], kinds: ["radio"], required: true },
    { key: "expectsEmployees", labels: ["employees who will receive Forms W-2", "W-2", "employees in the next 12 months", "expect to have employees"], kinds: ["radio"], required: true },
  ] },
  /** Revealed on the Additional Details page by Yes to the W-2 employees question ("Describe your employees"). */
  employees: { screenKey: "irs.employees", title: "Additional Details: describe your employees (revealed)", intents: [
    { key: "firstWagesMonth", labels: ["First date wages or annuities were or will be paid", "wages or annuities month", "first paid wages month"], kinds: ["select"], required: true, note: "month dropdown" },
    { key: "firstWagesYear", labels: ["First date wages or annuities were or will be paid year", "first paid wages year"], kinds: ["text", "number"], required: true },
    { key: "agriculturalCount", labels: ["Number of agricultural employees", "Agricultural"], kinds: ["number", "text"], required: false },
    { key: "otherCount", labels: ["Number of other employees", "Other employees"], kinds: ["number", "text"], required: false, note: "total must be at least 1" },
    { key: "lowLiability", labels: ["Do you expect your employment tax liability to be $1,000 or less in a full calendar year", "$1,000 or less", "employment tax liability"], kinds: ["radio"], required: true, note: "yes -> Form 944, no -> Form 941" },
  ] },
  activity: { screenKey: "irs.activity", title: "Additional Details: business activity", intents: [
    { key: "activityCategory", labels: ["Choose one category that best describes your business", "principal business activity", "Business activity"], kinds: ["radio", "select"], required: true, note: "15 categories; see IRS_ACTIVITY_CATEGORIES" },
    { key: "activityDetail", labels: ["type of", "describe", "activity"], kinds: ["radio", "select", "text"], required: false, note: "C per category" },
  ] },
  review: { screenKey: "irs.review", title: "Review and Submit", intents: [
    { key: "noticeDelivery", labels: ["How would you like to receive your EIN Confirmation Letter", "Confirmation letter", "Receive letter digitally in the next step", "Receive letter by mail"], kinds: ["radio"], required: true, note: "digital = CP 575 downloadable this session (rule 2)" },
  ] },
  assignment: { screenKey: "irs.assignment", title: "EIN Assignment", intents: [] },
} satisfies Record<string, ScreenIntents>;

/** The 15 principal-business-activity categories, live LLC owner route (2026-11-18). */
export const IRS_ACTIVITY_CATEGORIES = [
  "Accommodations", "Construction", "Finance", "Food Service", "Health Care", "Insurance",
  "Manufacturing", "Real Estate", "Rental & Leasing", "Retail", "Social Assistance",
  "Transportation", "Warehousing", "Wholesale", "Other",
] as const;

/**
 * IRS online EIN assistant availability, Eastern Time, as published on irs.gov
 * ("Get an employer identification number", captured 2026-11-17):
 *   Mon-Fri 6:00 a.m. - 1:00 a.m. (next day), Sat 6:00 a.m. - 9:00 p.m., Sun 6:00 p.m. - 12:00 a.m.
 * Windows are minutes from local midnight of the opening day; a close past 1440 runs into the next day.
 * The session expires after 15 minutes of inactivity; 1 EIN per responsible party per day.
 */
export const IRS_HOURS = {
  timeZone: "America/New_York",
  /** index 0 = Sunday */
  windows: [
    [18 * 60, 24 * 60], // Sun
    [6 * 60, 25 * 60], // Mon
    [6 * 60, 25 * 60], // Tue
    [6 * 60, 25 * 60], // Wed
    [6 * 60, 25 * 60], // Thu
    [6 * 60, 25 * 60], // Fri
    [6 * 60, 21 * 60], // Sat
  ] as [number, number][],
  inactivityTimeoutMinutes: 15,
  minMinutesRemaining: 45,
};
