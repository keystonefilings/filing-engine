import type { ScreenIntents } from "../../resolver/types.js";

/**
 * IRS EIN Assistant. NOT YET MAPPED LIVE (walk B). These are the screens the IRS
 * interview is known to have; labels are provisional and must be replaced by the
 * captured wording before the adapter is marked complete.
 */
/**
 * IRS EIN Assistant (sa.www4.irs.gov/applyein), domestic single-member LLC with an
 * individual responsible party. Mapped from Keystone's live owner-route walk through
 * Review and Submit (docs/walks/ny-irs-2026-11-18.md, 2026-11-18). The progress tracker
 * runs Legal Structure -> Identity -> Addresses -> Additional Details -> Review and
 * Submit -> EIN Assignment. The walk stopped before "Submit EIN Request"; designee
 * screens and some branches are from published references (to verify live), so the
 * adapter stays complete:false. SSN/ITIN is entered only from a protected source and
 * never recorded in traces, screenshots or webhooks.
 */
export const IRS_SCREENS = {
  legalStructure: { screenKey: "irs.legal_structure", title: "Legal Structure", intents: [
    { key: "legalStructure", labels: ["Limited Liability Company (LLC)", "LLC", "Legal structure", "Legal entity type"], kinds: ["radio"], required: true, note: "LLC and corporation are distinct choices" },
  ] },
  llcMembers: { screenKey: "irs.llc_members", title: "LLC members and location", intents: [
    { key: "memberCount", labels: ["Number of LLC members", "How many members", "Members"], kinds: ["number", "text"], required: true, note: "single vs multi-member is derived from the count" },
    { key: "physicalState", labels: ["Physical location", "State where the LLC is physically located", "State/Territory"], kinds: ["select"], required: true, note: "physical business location, not the formation state" },
    { key: "spouses", labels: ["owned by spouses", "community property"], kinds: ["radio"], required: false, note: "C: only for a qualifying two-member LLC in a community-property location (published)" },
  ] },
  reason: { screenKey: "irs.reason", title: "Reason for applying", intents: [
    { key: "reason", labels: ["Started a new business", "Hired employees", "Banking purposes", "Changed type of organization", "Purchased active business"], kinds: ["radio"], required: true },
  ] },
  identity: { screenKey: "irs.identity", title: "Identity: responsible party", intents: [
    { key: "rpFirstName", labels: ["First name"], kinds: ["text"], required: true },
    { key: "rpMiddle", labels: ["Middle name", "Middle initial"], kinds: ["text"], required: false },
    { key: "rpLastName", labels: ["Last name"], kinds: ["text"], required: true },
    { key: "rpSuffix", labels: ["Suffix"], kinds: ["select"], required: false, note: "DDS, MD, PHD, Jr, Sr, I-VI" },
    { key: "rpSsn", labels: ["SSN", "ITIN", "SSN/ITIN", "Social Security Number"], kinds: ["text", "password"], required: true, note: "SENSITIVE: protected source only; never recorded" },
    { key: "applicantRole", labels: ["I am the owner, member, or managing member", "I am a third party applying for an EIN on behalf of this LLC"], kinds: ["radio"], required: true },
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
    { key: "street", labels: ["Street address", "Physical location", "Street"], kinds: ["text"], required: true, note: "no P.O. box in the street field" },
    { key: "city", labels: ["City"], kinds: ["text"], required: true },
    { key: "state", labels: ["State", "State/U.S. territory"], kinds: ["select"], required: true },
    { key: "zip", labels: ["ZIP code", "ZIP/postal code"], kinds: ["text"], required: true },
    { key: "phone", labels: ["Phone number", "Phone"], kinds: ["tel", "text"], required: true, note: "digits, no extension" },
    { key: "hasMailing", labels: ["Do you have a different mailing address", "Separate mailing address"], kinds: ["radio"], required: true },
  ] },
  mailing: { screenKey: "irs.mailing", title: "Addresses: mailing address", intents: [
    { key: "mailStreet", labels: ["Street", "Mailing street"], kinds: ["text"], required: true, note: "P.O. box and international allowed here" },
    { key: "mailCity", labels: ["City"], kinds: ["text"], required: true },
    { key: "mailState", labels: ["State", "State/province/U.S. territory"], kinds: ["select", "text"], required: true },
    { key: "mailZip", labels: ["ZIP", "ZIP/postal code"], kinds: ["text"], required: true },
    { key: "mailCountry", labels: ["Country"], kinds: ["select"], required: true, note: "United States preselected" },
  ] },
  details: { screenKey: "irs.details", title: "Additional Details: the LLC", intents: [
    { key: "legalName", labels: ["Full legal name", "Legal name of LLC", "Legal name"], kinds: ["text"], required: true, note: "from the accepted state filing; excludes corporate endings" },
    { key: "tradeName", labels: ["Trade name", "DBA", "Doing business as"], kinds: ["text"], required: false },
    { key: "county", labels: ["County", "Physical county"], kinds: ["text"], required: true },
    { key: "physicalStateDetail", labels: ["State", "Physical state/territory"], kinds: ["select"], required: true, note: "read back; initially unselected even after the Addresses state" },
    { key: "formationState", labels: ["State where the articles", "Formation state", "State/Territory where organized"], kinds: ["select"], required: true },
    { key: "startMonth", labels: ["Start month", "LLC start date"], kinds: ["select"], required: true },
    { key: "startYear", labels: ["Start year", "Year"], kinds: ["text", "number"], required: true },
  ] },
  regulatory: { screenKey: "irs.regulatory", title: "Additional Details: regulated activities", intents: [
    { key: "highwayVehicle", labels: ["highway motor vehicle", "55,000 pounds", "heavy highway vehicle"], kinds: ["radio"], required: true },
    { key: "wagering", labels: ["gambling", "wagering"], kinds: ["radio"], required: true },
    { key: "form720", labels: ["Form 720", "excise tax"], kinds: ["radio"], required: true },
    { key: "atf", labels: ["alcohol, tobacco", "firearms", "ATF"], kinds: ["radio"], required: true },
  ] },
  employees: { screenKey: "irs.employees", title: "Additional Details: employees", intents: [
    { key: "expectsEmployees", labels: ["employees in the next 12 months", "W-2 employees", "expect to have employees"], kinds: ["radio"], required: true },
    { key: "firstWagesMonth", labels: ["first paid wages month", "wages or annuities month"], kinds: ["select"], required: false, note: "C when employees = yes" },
    { key: "firstWagesYear", labels: ["first paid wages year", "year"], kinds: ["text", "number"], required: false },
    { key: "agriculturalCount", labels: ["Agricultural"], kinds: ["number", "text"], required: false },
    { key: "otherCount", labels: ["Other"], kinds: ["number", "text"], required: false },
    { key: "lowLiability", labels: ["$1,000 or less", "employment tax liability"], kinds: ["radio"], required: false, note: "yes -> Form 944, no -> Form 941" },
  ] },
  activity: { screenKey: "irs.activity", title: "Additional Details: business activity", intents: [
    { key: "activityCategory", labels: ["principal business activity", "Business activity", "Category"], kinds: ["radio", "select"], required: true, note: "15 categories; see IRS_ACTIVITY_CATEGORIES" },
    { key: "activityDetail", labels: ["type of", "describe", "activity"], kinds: ["radio", "select", "text"], required: false, note: "C per category" },
  ] },
  review: { screenKey: "irs.review", title: "Review and Submit", intents: [
    { key: "noticeDelivery", labels: ["Receive letter digitally in the next step", "Receive letter by mail"], kinds: ["radio"], required: true, note: "digital = CP 575 downloadable this session (rule 2)" },
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
