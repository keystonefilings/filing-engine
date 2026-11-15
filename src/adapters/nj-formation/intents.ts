import type { ScreenIntents } from "../../resolver/types.js";

/**
 * NJ DORES Business Formation (njportal.com/DOR/BusinessFormation), Domestic LLC.
 * Labels are the wording captured on the Nov 14 walk. Required/optional per the map.
 */
export const NJ_SCREENS = {
  businessName: {
    screenKey: "nj.business_name",
    title: "Business Name",
    intents: [
      { key: "entityType", labels: ["Business Entity Type", "Entity Type", "Type of Business"], kinds: ["select"], required: true },
      { key: "businessName", labels: ["Business Name", "Proposed Business Name", "Name"], kinds: ["text"], required: true, note: "NO designator here" },
    ],
  },
  designator: {
    screenKey: "nj.designator",
    title: "Business Designator",
    intents: [
      { key: "designator", labels: ["Business Designator", "Designator"], kinds: ["select"], required: true },
    ],
  },
  businessData: {
    screenKey: "nj.business_data",
    title: "Business Data",
    intents: [
      { key: "purpose", labels: ["Business Purpose", "Purpose"], kinds: ["textarea", "text"], required: false },
      { key: "ein", labels: ["EIN", "Federal Employer Identification Number", "FEIN", "Employer Identification Number"], kinds: ["text"], required: false },
    ],
  },
  mainAddress: {
    screenKey: "nj.main_address",
    title: "Main Business Address",
    intents: [
      { key: "street1", labels: ["Street Address 1", "Street Address", "Address Line 1", "Street"], kinds: ["text"], required: true },
      { key: "street2", labels: ["Street Address 2", "Address Line 2"], kinds: ["text"], required: false },
      { key: "city", labels: ["City"], kinds: ["text"], required: true },
      { key: "state", labels: ["State"], kinds: ["select", "text"], required: true },
      { key: "zip", labels: ["Zip", "Zip Code", "Postal Code"], kinds: ["text", "number"], required: true },
    ],
  },
  registeredAgent: {
    screenKey: "nj.registered_agent",
    title: "Registered Agent",
    intents: [
      { key: "agentMode", labels: ["Registered Agent", "Registered Agent/Office", "Enter a Registered Agent/Office"], kinds: ["radio"], required: true },
      { key: "agentName", labels: ["Registered Agent Name", "Agent Name", "Name"], kinds: ["text"], required: true },
      { key: "agentStreet1", labels: ["Street 1", "Street Address 1", "Street"], kinds: ["text"], required: true },
      { key: "agentCity", labels: ["City"], kinds: ["text"], required: true },
      { key: "agentState", labels: ["State"], kinds: ["select", "text"], required: true },
      { key: "agentZip", labels: ["Zip", "Zip Code"], kinds: ["text", "number"], required: true },
      { key: "agentDesignation", labels: ["Designation", "I hereby designate", "Registered Agent Designation"], kinds: ["checkbox"], required: true },
    ],
  },
  members: {
    screenKey: "nj.members",
    title: "Members/Managers",
    intents: [],
    knownUnused: ["Add New Member"],
  },
  memberModal: {
    screenKey: "nj.members.add_modal",
    title: "Add New Member",
    intents: [
      { key: "memberName", labels: ["Name", "Member Name"], kinds: ["text"], required: true },
      { key: "memberStreet1", labels: ["Street Address 1", "Street 1"], kinds: ["text"], required: true },
      { key: "memberStreet2", labels: ["Street Address 2", "Street 2"], kinds: ["text"], required: false },
      { key: "memberCity", labels: ["City"], kinds: ["text"], required: true },
      { key: "memberState", labels: ["State"], kinds: ["select"], required: true },
      { key: "memberZip", labels: ["Zip", "Zip Code"], kinds: ["text", "number"], required: true },
    ],
  },
  otherProvisions: {
    screenKey: "nj.other_provisions",
    title: "Other Provisions",
    intents: [
      { key: "provisionText", labels: ["Article", "Provision", "Other Provision", "Additional Article"], kinds: ["textarea", "text"], required: false },
    ],
  },
  signatures: {
    screenKey: "nj.signatures",
    title: "Signatures",
    intents: [
      { key: "signatureCheckbox", labels: ["Signature", "I accept", "Sign"], kinds: ["checkbox"], required: false, note: "one per signer row, appears after a signer is added; all must be checked (accept certificate and intent to execute)" },
    ],
    knownUnused: ["Add New Signer"],
  },
  signerModal: {
    screenKey: "nj.signatures.add_modal",
    title: "Add New Signer",
    intents: [
      { key: "signerName", labels: ["Name", "Signer Name"], kinds: ["text"], required: true },
      { key: "signerTitle", labels: ["Title"], kinds: ["select"], required: true, note: "observed option: Authorized Representative" },
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
      { key: "certificateOfStanding", labels: ["Certificate of Standing"], kinds: ["checkbox"], required: false },
      { key: "certifiedCopy", labels: ["Certified Copy"], kinds: ["checkbox"], required: false },
      { key: "contactFirstName", labels: ["First Name"], kinds: ["text"], required: true },
      { key: "contactLastName", labels: ["Last Name"], kinds: ["text"], required: true },
      { key: "contactPhone", labels: ["Phone", "Phone Number"], kinds: ["tel", "text"], required: true },
      { key: "contactEmail", labels: ["Email", "Email Address"], kinds: ["email", "text"], required: true },
      { key: "contactEmailConfirm", labels: ["Confirm Email", "Confirm Email Address", "Re-enter Email"], kinds: ["email", "text"], required: true },
      { key: "paymentType", labels: ["Select Payment Type", "Payment Type", "Payment Method"], kinds: ["radio", "select"], required: true },
      { key: "annualReportReminders", labels: ["Annual Report reminders", "Annual Report Reminder"], kinds: ["checkbox"], required: false, note: "pre-checked" },
      { key: "corpWatchAlerts", labels: ["CorpWatch Alerts", "CorpWatch"], kinds: ["checkbox"], required: false, note: "pre-checked" },
    ],
  },
} satisfies Record<string, ScreenIntents>;
