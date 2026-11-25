import type { ScreenIntents } from "../../resolver/types.js";

/**
 * NY DOS Division of Corporations On-Line Filing System, signed in as the service company
 * (filings.dos.ny.gov/ords/r/corpanc/), built to the portal map of 2026-11-24
 * (docs/portal-maps/ny-dos-corporations.md, written from Keystone's screen recording up to each
 * flow's final button) and the walk of 2026-11-18 (docs/walks/ny-irs-2026-11-18.md).
 *
 * A run: Replenish DD Account (Screen M, the prepay deposit) -> Home (Screen A) -> filing
 * selection (B) -> Proposed Entity Name (C) -> the one long form (D1 business corporation, D2
 * LLC) -> Review (E) -> Payment Information (F, File Document = FINAL).
 *
 * The long forms repeat labels per section ("Address", "City", "State", "Postal Code" under
 * Service of Process, Registered Agent, Organizer/Incorporator and Filer; "Check if applicable"
 * and "Select One" under each optional clause), so those intents name their section.
 */
const SOP = "Service of Process";

/** Service of process, the same block on both forms. Manual fields show after "enter" is picked. */
const serviceOfProcess = [
  { key: "sopMode", labels: ["Select One", "Service of Process"], kinds: ["radio" as const], required: true, section: SOP, note: "enter the SOP information, or select a service company" },
  { key: "sopName", labels: ["SOP Name", "Name"], kinds: ["text" as const], required: false, section: SOP, note: "C: enter mode; the entity button fills THE LLC / THE CORPORATION" },
  { key: "sopAddress1", labels: ["Address"], kinds: ["text" as const], required: false, section: SOP },
  { key: "sopAddress2", labels: ["Address 2"], kinds: ["text" as const], required: false, section: SOP },
  { key: "sopCity", labels: ["City"], kinds: ["text" as const], required: false, section: SOP },
  { key: "sopState", labels: ["State"], kinds: ["select" as const, "text" as const], required: false, section: SOP, note: "NY by default" },
  { key: "sopZip", labels: ["Postal Code", "Zip"], kinds: ["text" as const], required: false, section: SOP },
  { key: "sopServiceCompany", labels: ["Select Service Company", "Service Company"], kinds: ["select" as const], required: false, section: SOP, note: "C: a pick autofills; DOS then gives that company the filer's contact details" },
  { key: "sopEmailClause", labels: ["E-mail statement", "email statement", "electronic"], kinds: ["checkbox" as const], required: false, section: SOP },
  { key: "sopEmail", labels: ["E-mail", "Email"], kinds: ["email" as const, "text" as const], required: false, section: SOP, note: "C: when the e-mail statement is on" },
  { key: "sopEmailConfirm", labels: ["Confirm E-mail", "Confirm Email"], kinds: ["email" as const, "text" as const], required: false, section: SOP },
];
const filer = [
  { key: "filerName", labels: ["Filer Name"], kinds: ["text" as const], required: true, section: "Filer" },
  { key: "filerAddress1", labels: ["Address"], kinds: ["text" as const], required: true, section: "Filer" },
  { key: "filerAddress2", labels: ["Address 2"], kinds: ["text" as const], required: false, section: "Filer" },
  { key: "filerCity", labels: ["City"], kinds: ["text" as const], required: true, section: "Filer" },
  { key: "filerState", labels: ["State"], kinds: ["select" as const, "text" as const], required: true, section: "Filer" },
  { key: "filerZip", labels: ["Postal Code", "Zip"], kinds: ["text" as const], required: true, section: "Filer" },
];
/** Address autofill buttons on the forms: read, never needed (the engine types each address). */
const FORM_BUTTONS = ["Service Company Address", "SOP Address", "Organizer Address", "Incorporator Address", "Go Back", "Cancel", "Save for Later", "The LLC", "The Corporation"];

export const NY_SCREENS = {
  /** Screen M: fund the draw-down account with exactly this filing's approved total. */
  replenish: {
    screenKey: "ny.replenish",
    title: "Replenish DD Account",
    intents: [
      { key: "drawdownAccount", labels: ["Drawdown Accounts", "Drawdown Account"], kinds: ["select"], required: true, note: "the account named in the NY settings; with one listed, that one" },
      { key: "depositAmount", labels: ["Deposit Amount"], kinds: ["text", "number"], required: true },
      { key: "paymentAuthorization", labels: ["Payment Authorization", "authorize"], kinds: ["checkbox"], required: false, note: "STOP: ticked only on a live run, covered by the client's approval of this filing's fees" },
    ],
  },
  /** Screen A: service-company home; the formation entry is a link. */
  home: { screenKey: "ny.home", title: "On-Line Filings for Service Company Filers", intents: [] },
  /** Screen B: which formation document; links. */
  selection: { screenKey: "ny.filing_selection", title: "Formation: filing selection", intents: [] },
  /** Screen C. */
  entityName: {
    screenKey: "ny.entity_name",
    title: "Proposed Entity Name",
    intents: [
      { key: "entityName", labels: ["Name", "Proposed Entity Name", "Entity Name"], kinds: ["text"], required: true, note: "the full name with its type indicator (LLC, or Inc./Corp. for a corporation)" },
    ],
    knownUnused: ["Reset"],
  },
  /** Screen D2: Articles of Organization, Domestic LLC (one long page). */
  filing: {
    screenKey: "ny.filing",
    title: "Articles of Organization",
    intents: [
      { key: "openingStatement", labels: ["Include following statement", "THE UNDERSIGNED, being a natural person"], kinds: ["checkbox"], required: false, note: "natural-person organizer only" },
      { key: "llcName", labels: ["Name"], kinds: ["text"], required: true, section: "LLC Name", note: "read-only, prefilled from Screen C: read back, never typed" },
      { key: "englishTranslation", labels: ["English Translation"], kinds: ["text"], required: false, section: "LLC Name" },
      { key: "purposes", labels: ["Check if applicable", "Purposes"], kinds: ["checkbox"], required: false, section: "Purposes" },
      { key: "county", labels: ["County"], kinds: ["select"], required: true, section: "County", note: "independent of every address record" },
      ...serviceOfProcess,
      { key: "registeredAgentClause", labels: ["Check if applicable"], kinds: ["checkbox"], required: false, section: "Registered Agent" },
      { key: "managementClause", labels: ["Check if applicable", "Management Structure"], kinds: ["checkbox"], required: false, section: "Management Structure" },
      { key: "managementStructure", labels: ["Select One"], kinds: ["radio"], required: false, section: "Management Structure", note: "C: one/more members, class of members, one/more managers, class of managers" },
      { key: "effectiveDateClause", labels: ["Check if applicable"], kinds: ["checkbox"], required: false, section: "Effective Date" },
      { key: "effectiveDateMode", labels: ["Select One"], kinds: ["radio"], required: false, section: "Effective Date", note: "C: upon filing / on a date" },
      { key: "effectiveDate", labels: ["Effective Date"], kinds: ["date", "text"], required: false, section: "Effective Date", note: "C: on-a-date branch" },
      { key: "dissolutionClause", labels: ["Check if applicable"], kinds: ["checkbox"], required: false, section: "Dissolution Date" },
      { key: "liabilityStatement", labels: ["Check if applicable"], kinds: ["checkbox"], required: false, section: "Liability Statement" },
      { key: "organizerName", labels: ["Organizer Name"], kinds: ["text"], required: true, section: "Organizer" },
      { key: "organizerAddress1", labels: ["Address"], kinds: ["text"], required: true, section: "Organizer" },
      { key: "organizerAddress2", labels: ["Address 2"], kinds: ["text"], required: false, section: "Organizer" },
      { key: "organizerCity", labels: ["City"], kinds: ["text"], required: true, section: "Organizer" },
      { key: "organizerState", labels: ["State"], kinds: ["select", "text"], required: true, section: "Organizer" },
      { key: "organizerZip", labels: ["Postal Code", "Zip"], kinds: ["text"], required: true, section: "Organizer" },
      { key: "signature", labels: ["Signature"], kinds: ["text"], required: true, section: "Signature", note: "STOP: typed signature; the organizer's name, under the client's approval of this filing" },
      ...filer,
    ],
    knownUnused: FORM_BUTTONS,
  },
  /** Screen D1: Certificate of Incorporation, Domestic Business Corporation (BCL s.402). */
  bclFiling: {
    screenKey: "ny.bcl_filing",
    title: "Certificate of Incorporation",
    intents: [
      { key: "openingStatement", labels: ["Include following statement", "I, the undersigned, a natural person"], kinds: ["checkbox"], required: false },
      { key: "corpName", labels: ["Name"], kinds: ["text"], required: true, section: "Corporation Name", note: "read-only, prefilled from Screen C" },
      { key: "englishTranslation", labels: ["English Translation"], kinds: ["text"], required: false, section: "Corporation Name" },
      { key: "county", labels: ["County"], kinds: ["select"], required: true, section: "County" },
      { key: "shareCount", labels: ["Number of Shares"], kinds: ["text", "number"], required: true, section: "Shares" },
      { key: "shareValue", labels: ["Share Value"], kinds: ["select"], required: true, section: "Shares", note: "No Par Value, or a par value" },
      ...serviceOfProcess,
      { key: "registeredAgentClause", labels: ["Check if applicable"], kinds: ["checkbox"], required: false, section: "Registered Agent" },
      { key: "effectiveDateClause", labels: ["Check if applicable"], kinds: ["checkbox"], required: false, section: "Effective Date" },
      { key: "effectiveDateMode", labels: ["Select One"], kinds: ["radio"], required: false, section: "Effective Date" },
      { key: "effectiveDate", labels: ["Effective Date"], kinds: ["date", "text"], required: false, section: "Effective Date" },
      { key: "durationClause", labels: ["Check if applicable"], kinds: ["checkbox"], required: false, section: "Duration Date" },
      { key: "liabilityStatement", labels: ["Check if applicable"], kinds: ["checkbox"], required: false, section: "Liability Statement", note: "BCL 719 director-liability text" },
      { key: "preemptiveRights", labels: ["Check if applicable"], kinds: ["checkbox"], required: false, section: "Preemptive Rights" },
      { key: "incFirstName", labels: ["First Name"], kinds: ["text"], required: true, section: "Incorporator" },
      { key: "incMiddle", labels: ["Middle Initial"], kinds: ["text"], required: false, section: "Incorporator" },
      { key: "incLastName", labels: ["Last Name"], kinds: ["text"], required: true, section: "Incorporator" },
      { key: "incAddress1", labels: ["Address"], kinds: ["text"], required: true, section: "Incorporator" },
      { key: "incAddress2", labels: ["Address 2"], kinds: ["text"], required: false, section: "Incorporator" },
      { key: "incCity", labels: ["City"], kinds: ["text"], required: true, section: "Incorporator" },
      { key: "incState", labels: ["State"], kinds: ["select", "text"], required: true, section: "Incorporator" },
      { key: "incZip", labels: ["Postal Code", "Zip"], kinds: ["text"], required: true, section: "Incorporator" },
      { key: "signature", labels: ["Signature of Incorporator", "Signature"], kinds: ["text"], required: true, section: "Signature", note: "STOP: must equal the incorporator's name exactly" },
      ...filer,
    ],
    knownUnused: FORM_BUTTONS,
  },
  /** Screen E: rendered preview; Continue. */
  review: { screenKey: "ny.review", title: "Review", intents: [], knownUnused: ["Print Preview", "Go Back"] },
  /** Screen F: Payment Information; File Document is the FINAL button. */
  payment: {
    screenKey: "ny.payment",
    title: "Payment Information",
    intents: [
      { key: "customerReference", labels: ["Customer Reference Number"], kinds: ["text"], required: false },
      { key: "fein", labels: ["FEIN"], kinds: ["text"], required: false, note: "of the entity being formed, when one exists" },
      { key: "plainCopy", labels: ["Plain Copy"], kinds: ["checkbox"], required: false },
      { key: "certifiedCopy", labels: ["Certified Copy"], kinds: ["checkbox"], required: false },
      { key: "certificateOfExistence", labels: ["Certificate of Existence"], kinds: ["checkbox"], required: false },
      { key: "ccEmail", labels: ["Cc E-mail Address", "Cc Email Address"], kinds: ["email", "text"], required: false },
      { key: "paymentMethod", labels: ["Select One", "Payment"], kinds: ["radio"], required: true, section: "Payment", note: "Credit Card or Drawdown Account" },
      { key: "drawdownAccount", labels: ["Drawdown Account", "Drawdown"], kinds: ["select"], required: false, section: "Payment", note: "C: shows with Drawdown Account" },
      { key: "paymentAuthorization", labels: ["By checking this box I authorize", "Payment Authorization"], kinds: ["checkbox"], required: true, note: "STOP: ticked only inside the submit guard, on a live run" },
    ],
    knownUnused: ["Distribution E-mail Address", "Go Back"],
  },
} satisfies Record<string, ScreenIntents>;

/**
 * The business corporation's Payment Information: the same fields, its own fee lines ($125 plus
 * the tax on shares the page computes), so its own approved snapshot. Prices are part of the
 * drift check on purpose, so a tax the page computes differently stops for review.
 */
export const NY_BCL_PAYMENT: ScreenIntents = { ...NY_SCREENS.payment, screenKey: "ny.bcl_payment", title: "Payment Information (business corporation)" };

/**
 * NY E-Submission upload envelope ("Filing Information"), verified on the Initial
 * Organization domestic LLC Articles upload. The engine generates the completed PDF and
 * fills this envelope, then uploads it; checkout after the upload is still V.
 */
export const NY_ESUBMISSION_SCREENS = {
  route: {
    screenKey: "ny.esub.route",
    title: "E-Submission route",
    intents: [
      { key: "businessCategory", labels: ["Business Category", "Category"], kinds: ["select"], required: true, note: "DOMESTIC or FOREIGN" },
      { key: "entityType", labels: ["Entity Type", "Type"], kinds: ["select"], required: true },
      { key: "filingType", labels: ["Filing Type", "Filing Type & Section of Law"], kinds: ["select"], required: true },
    ],
  },
  proposedName: {
    screenKey: "ny.esub.name",
    title: "Proposed Entity Name",
    intents: [{ key: "proposedName", labels: ["Proposed Entity Name", "Entity Name"], kinds: ["text"], required: true, note: "domestic LLC Articles asks for the name before Filing Information" }],
  },
  filingInformation: {
    screenKey: "ny.esub.filing_information",
    title: "Filing Information",
    intents: [
      { key: "submitterName", labels: ["Submitter Name", "Submitter"], kinds: ["text"], required: true, note: "R/D from the service-company profile" },
      { key: "submitterAddress1", labels: ["Address Line 1", "Address"], kinds: ["text"], required: true, note: "R/D profile" },
      { key: "submitterCity", labels: ["City"], kinds: ["text"], required: true },
      { key: "submitterState", labels: ["State"], kinds: ["select", "text"], required: true },
      { key: "submitterZip", labels: ["Postal", "Zip", "Zip Code"], kinds: ["text"], required: true },
      { key: "submitterAddress2", labels: ["Address Line 2"], kinds: ["text"], required: false },
      { key: "email", labels: ["Email Address", "Email"], kinds: ["email", "text"], required: true, note: "prefilled, editable" },
      { key: "ccEmail", labels: ["CC Email Address", "CC Email"], kinds: ["email", "text"], required: false },
      { key: "customerReference", labels: ["Customer Reference Number", "Reference"], kinds: ["text"], required: false, note: "optional unless the account requires it" },
      { key: "uploadDocument", labels: ["Upload Document", "Upload"], kinds: ["file"], required: true, note: "the completed, signed PDF for this filing type" },
      { key: "levelOfService", labels: ["Level Of Service", "Level of Service"], kinds: ["select", "radio"], required: true, note: "Routine $0 / 24 Hour $25 / Same Day $75 / 2 Hour $150" },
      { key: "plainCopy", labels: ["Plain Copy"], kinds: ["checkbox"], required: false, note: "+$5" },
      { key: "certifiedCopy", labels: ["Certified Copy"], kinds: ["checkbox"], required: false, note: "+$10" },
      { key: "statusCertificate", labels: ["Certificate of Status", "Status Short-Form", "Short-Form"], kinds: ["checkbox"], required: false, note: "+$25" },
    ],
  },
} satisfies Record<string, ScreenIntents>;

/** NY expedite tiers on the E-Submission screen (Level Of Service), USD. */
export const NY_EXPEDITE = { routine: 0, "24_hour": 25, same_day: 75, "2_hour": 150 } as const;
