import type { ScreenIntents } from "../../resolver/types.js";

/**
 * NJ DORES Business Formation (njportal.com/DOR/BusinessFormation), Domestic LLC.
 * Labels, order and required flags are from the live walk of 2026-11-17 (signed out,
 * test entry, stopped before Pay Now). Captures: docs/walks/2026-11-17/nj-formation.
 * The first label in each list is the exact live wording.
 */
export const NJ_SCREENS = {
  welcome: {
    screenKey: "nj.welcome",
    title: "Welcome",
    intents: [],
  },
  businessName: {
    screenKey: "nj.business_name",
    title: "Business Name",
    intents: [
      { key: "entityType", labels: ["What type of business would you like to form?", "Business Entity Type"], kinds: ["select"], required: true },
      { key: "businessName", labels: ["Business Name"], kinds: ["text"], required: true, note: "NO designator here" },
    ],
  },
  designator: {
    screenKey: "nj.designator",
    title: "Business Designator",
    intents: [
      { key: "designator", labels: ["Business Designator"], kinds: ["select"], required: true },
    ],
  },
  businessData: {
    screenKey: "nj.business_data",
    title: "Business Data",
    intents: [
      { key: "ein", labels: ["Employer Identification Number (optional)"], kinds: ["text"], required: false, note: "9 digits, FeinNumber" },
      { key: "einLocation", labels: ["Employer Identification Number (optional)"], kinds: ["text"], required: false, note: "3-digit location, defaults 000; left alone" },
      { key: "naicsCode", labels: ["NAICS Code (optional)"], kinds: ["text"], required: false },
      { key: "duration", labels: ["Duration"], kinds: ["text"], required: false },
      { key: "effectiveDate", labels: ["Effective Date"], kinds: ["text", "date"], required: false, note: "MM/DD/YYYY, defaults to today" },
    ],
  },
  businessPurpose: {
    screenKey: "nj.business_purpose",
    title: "Business Purpose",
    intents: [
      { key: "purpose", labels: ["Business Purpose"], kinds: ["textarea"], required: false, note: "300 characters max" },
    ],
    knownUnused: ["You may upload a description of your business purpose if you wish. The upload is not required."],
  },
  mainAddress: {
    screenKey: "nj.main_address",
    title: "Main Business Address",
    intents: [
      { key: "street1", labels: ["Address Line 1"], kinds: ["text"], required: false },
      { key: "street2", labels: ["Address Line 2"], kinds: ["text"], required: false },
      { key: "city", labels: ["City"], kinds: ["text"], required: false },
      { key: "state", labels: ["State"], kinds: ["select"], required: false, note: "full state names" },
      { key: "zip", labels: ["Zip Code"], kinds: ["text"], required: false, note: "5 digits" },
      { key: "zipPlus", labels: ["Zip Code"], kinds: ["text"], required: false, note: "4 digits" },
    ],
  },
  registeredAgent: {
    screenKey: "nj.registered_agent",
    title: "Registered Agent",
    intents: [
      { key: "agentNumber", labels: ["Enter a Registered Agent Number"], kinds: ["text"], required: false, note: "alternative to the 'Enter a Registered Agent/Office' link" },
    ],
  },
  registeredAgentInfo: {
    screenKey: "nj.registered_agent_info",
    title: "Registered Agent Information",
    intents: [
      { key: "agentName", labels: ["Registered Agent Name"], kinds: ["text"], required: true },
      { key: "agentEmail", labels: ["Registered Agent Email"], kinds: ["text", "email"], required: false },
      { key: "agentStreet1", labels: ["Office Address 1"], kinds: ["text"], required: true },
      { key: "agentStreet2", labels: ["Office Address 2"], kinds: ["text"], required: false },
      { key: "agentCity", labels: ["Office City"], kinds: ["text"], required: true },
      { key: "agentState", labels: ["Office State"], kinds: ["text"], required: false, note: "read-only, New Jersey" },
      { key: "agentZip", labels: ["Office Zip Code"], kinds: ["text"], required: true },
      { key: "agentZipPlus", labels: ["Office Zip Code"], kinds: ["text"], required: false },
      { key: "agentAttest", labels: ["I attest that the Registered Agent information entered is correct"], kinds: ["checkbox"], required: true },
    ],
  },
  members: {
    screenKey: "nj.members",
    title: "Members / Managers",
    intents: [],
  },
  memberModal: {
    screenKey: "nj.members.add_modal",
    title: "Add New Member",
    intents: [
      { key: "memberName", labels: ["Name"], kinds: ["text"], required: true },
      { key: "memberStreet1", labels: ["Street Address 1"], kinds: ["text"], required: true },
      { key: "memberStreet2", labels: ["Street Address 2"], kinds: ["text"], required: false, note: "aria-required in markup, no asterisk on screen" },
      { key: "memberCity", labels: ["City"], kinds: ["text"], required: true },
      { key: "memberState", labels: ["State"], kinds: ["select"], required: true, note: "full state names" },
      { key: "memberZip", labels: ["Zip Code"], kinds: ["text"], required: true },
      { key: "memberZipPlus", labels: ["Zip Code"], kinds: ["text"], required: false },
    ],
  },
  additionalInformation: {
    screenKey: "nj.additional_information",
    title: "Other Provisions/Additional Information",
    intents: [],
  },
  signatures: {
    screenKey: "nj.signatures",
    title: "Signatures",
    intents: [],
  },
  signerModal: {
    screenKey: "nj.signatures.add_modal",
    title: "Add New Signer",
    intents: [
      { key: "signerName", labels: ["Name"], kinds: ["text"], required: true },
      { key: "signerTitle", labels: ["Title"], kinds: ["select"], required: true, note: "LLC: only 'Authorized Representative'" },
    ],
  },
  review: {
    screenKey: "nj.review",
    title: "Review",
    intents: [],
  },
  payment: {
    screenKey: "nj.payment",
    title: "Payment",
    intents: [
      { key: "officialFormationDoc", labels: ["Official Authenticated Formation Document"], kinds: ["checkbox"], required: false, note: "pre-checked, disabled" },
      { key: "certificateOfStanding", labels: ["Certificate of Standing (optional)"], kinds: ["checkbox"], required: false },
      { key: "certifiedCopy", labels: ["Certified Copy (optional)"], kinds: ["checkbox"], required: false },
      { key: "contactFirstName", labels: ["First Name"], kinds: ["text"], required: true },
      { key: "contactLastName", labels: ["Last Name"], kinds: ["text"], required: true },
      { key: "contactPhone", labels: ["Phone Number"], kinds: ["text", "tel"], required: true },
      { key: "contactEmail", labels: ["Email Address"], kinds: ["text", "email"], required: true },
      { key: "contactEmailConfirm", labels: ["Confirm Email Address"], kinds: ["text", "email"], required: true },
      { key: "paymentType", labels: ["Select Payment Type"], kinds: ["select"], required: true, note: "signed out: Credit Card / E-Check" },
      { key: "annualReportReminders", labels: ["Reminders for your Annual Reports Filing(s)"], kinds: ["checkbox"], required: false, note: "pre-checked" },
      { key: "corpWatchAlerts", labels: ["CorpWatch Alerts to notify me"], kinds: ["checkbox"], required: false, note: "pre-checked" },
    ],
  },
} satisfies Record<string, ScreenIntents>;

/** The Add New Member / Director / Incorporators popups: the same fields (portal map 2026-11-24, Screen 8b). */
const personModal = (screenKey: string, title: string): ScreenIntents => ({ ...NJ_SCREENS.memberModal, screenKey, title });

/**
 * NJ Domestic For-Profit Corporation (DP), from the guest walk of 2026-11-24
 * (docs/portal-maps/nj-business-formation.md): the same wizard as the LLC, with the corporation's
 * designators, a required total number of shares on Business Data, and Board of Directors (at
 * least 1) then Incorporators (at least 1) in place of Members. Screens whose content differs
 * from the LLC's have their own keys, so each gets its own approved snapshot.
 *
 * The walk stopped at the Registered Agent attestation, so Signatures, Review and Payment were
 * seen for an LLC only (walk 2026-11-17). The corporation's versions keep their own keys: the
 * first live sight of each halts for review instead of passing on the LLC's snapshot.
 */
export const NJ_DP_SCREENS = {
  designator: { ...NJ_SCREENS.designator, screenKey: "nj.dp.designator", title: "Business Designator (corporation)" },
  businessData: {
    ...NJ_SCREENS.businessData,
    screenKey: "nj.dp.business_data",
    title: "Business Data (corporation)",
    intents: [
      ...NJ_SCREENS.businessData.intents,
      { key: "stock", labels: ["Stock (Total Number of Shares)", "Total Number of Shares", "Stock"], kinds: ["text", "number"], required: true, note: "minimum 1; no par or no-par designation asked" },
    ],
  },
  directors: { screenKey: "nj.dp.directors", title: "Board of Directors", intents: [], knownUnused: ["Add New Director"] },
  directorModal: personModal("nj.dp.directors.add_modal", "Add New Director"),
  incorporators: { screenKey: "nj.dp.incorporators", title: "Incorporators", intents: [], knownUnused: ["Add New Incorporators"] },
  incorporatorModal: personModal("nj.dp.incorporators.add_modal", "Add New Incorporators"),
  signatures: { ...NJ_SCREENS.signatures, screenKey: "nj.dp.signatures", title: "Signatures (corporation)" },
  review: { ...NJ_SCREENS.review, screenKey: "nj.dp.review", title: "Review (corporation)" },
  payment: { ...NJ_SCREENS.payment, screenKey: "nj.dp.payment", title: "Payment (corporation)" },
} satisfies Record<string, ScreenIntents>;

/** Exact availability wording on the designator screen. */
export const NJ_NAME_AVAILABLE = /The Business Name .+ is available/i;
