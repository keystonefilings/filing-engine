import type { ScreenIntents } from "../../resolver/types.js";

/**
 * NY DOS On-Line Filing (filings.dos.ny.gov), Domestic LLC Articles of Organization.
 * Field flags from Keystone's signed-in service-company walk (docs/walks/ny-irs-2026-11-18.md,
 * 2026-11-18): R required, O optional, C conditional on a branch. The long Filing form was
 * verified; the filing-to-checkout transition, distribution email, drawdown/card selection
 * and the final button are still V, so the adapter stays complete:false (dry-run only).
 * No EIN field appears on this form; the EIN is filed separately and entered where asked.
 */
export const NY_SCREENS = {
  entityName: {
    screenKey: "ny.entity_name",
    title: "Proposed Entity Name",
    intents: [
      { key: "entityName", labels: ["Proposed Entity Name", "Entity Name", "Name"], kinds: ["text"], required: true, note: "full approved name with the LLC designator; double entry is an account option (currently off)" },
    ],
  },
  filing: {
    screenKey: "ny.filing",
    title: "Articles of Organization",
    intents: [
      // Opening and purpose (all optional)
      { key: "openingStatement", labels: ["include following statement", "Include the following statement", "organizer"], kinds: ["checkbox"], required: false, note: "natural-person organizer only" },
      { key: "llcName", labels: ["Name of the Limited Liability Company", "LLC Name", "Entity Name"], kinds: ["text"], required: true },
      { key: "englishTranslation", labels: ["English translation", "English Translation of Name"], kinds: ["text"], required: false },
      { key: "purposes", labels: ["Purposes", "Purpose", "lawful"], kinds: ["checkbox"], required: false },
      // Office
      { key: "county", labels: ["County", "NY office county"], kinds: ["select"], required: true, note: "independent of every address record" },
      // Service of process: mode R, manual fields C
      { key: "sopMode", labels: ["Service of Process", "Address for Service of Process", "Enter"], kinds: ["radio"], required: true },
      { key: "sopName", labels: ["Name"], kinds: ["text"], required: false, note: "C: required when manual entry" },
      { key: "sopAddress1", labels: ["Address", "Address Line 1"], kinds: ["text"], required: false, note: "C: manual" },
      { key: "sopAddress2", labels: ["Address Line 2", "Address 2"], kinds: ["text"], required: false },
      { key: "sopCity", labels: ["City"], kinds: ["text"], required: false, note: "C: manual" },
      { key: "sopState", labels: ["State"], kinds: ["select", "text"], required: false, note: "C: manual" },
      { key: "sopZip", labels: ["Zip", "Zip Code", "Postal"], kinds: ["text"], required: false, note: "C: manual" },
      { key: "sopServiceCompany", labels: ["Service Company", "Select a service company"], kinds: ["select"], required: false, note: "C: when a listed provider is chosen" },
      // Electronic process notice (optional clause; email C when enabled)
      { key: "sopEmailClause", labels: ["Include the electronic", "electronic process notice", "notify by email"], kinds: ["checkbox"], required: false },
      { key: "sopEmail", labels: ["Email", "Secretary of State notice email", "Email Address"], kinds: ["email", "text"], required: false, note: "C: when the electronic notice clause is on" },
      { key: "sopEmailConfirm", labels: ["Confirm Email", "Confirm Email Address"], kinds: ["email", "text"], required: false, note: "C" },
      // Additional registered agent (optional)
      { key: "registeredAgentClause", labels: ["Include a registered agent", "Additional registered agent", "Registered Agent"], kinds: ["checkbox"], required: false },
      { key: "registeredAgentMode", labels: ["Registered Agent"], kinds: ["radio"], required: false, note: "C: manual or listed provider when the clause is on" },
      // Management (optional clause)
      { key: "managementClause", labels: ["Include a management", "Management"], kinds: ["checkbox"], required: false },
      { key: "managementStructure", labels: ["Management Structure", "Management", "member", "manager"], kinds: ["radio", "checkbox"], required: false, note: "C: one/more members, class of members, one/more managers, class of managers" },
      // Effective date (optional clause)
      { key: "effectiveDateMode", labels: ["Effective Date", "upon filing", "specified date"], kinds: ["radio"], required: false },
      { key: "effectiveDate", labels: ["Effective Date", "Date"], kinds: ["date", "text"], required: false, note: "C: specified-date branch" },
      // Duration (optional clause)
      { key: "dissolutionMode", labels: ["Dissolution Date", "Date of Dissolution", "Duration", "perpetual"], kinds: ["radio", "checkbox"], required: false },
      { key: "dissolutionDate", labels: ["Dissolution Date", "latest date"], kinds: ["date", "text"], required: false, note: "C: specified-date branch" },
      // Liability (optional)
      { key: "liabilityStatement", labels: ["Liability statement", "Limitation of Liability", "indemnif"], kinds: ["checkbox"], required: false },
      // Organizer: name R, address O
      { key: "organizerName", labels: ["Organizer Name", "Organizer"], kinds: ["text"], required: true },
      { key: "organizerAddress1", labels: ["Organizer Address", "Address Line 1", "Address"], kinds: ["text"], required: false },
      { key: "organizerCity", labels: ["City"], kinds: ["text"], required: false },
      { key: "organizerState", labels: ["State"], kinds: ["select", "text"], required: false },
      { key: "organizerZip", labels: ["Zip", "Zip Code", "Postal"], kinds: ["text"], required: false },
      // Signature R
      { key: "signature", labels: ["Signature", "Signature of Organizer", "typed"], kinds: ["text"], required: true, note: "certification of authority and truthfulness" },
      // Filer: name + address R; line 2 V
      { key: "filerName", labels: ["Filer Name", "Filer"], kinds: ["text"], required: true },
      { key: "filerAddress1", labels: ["Filer Address", "Address Line 1", "Address"], kinds: ["text"], required: true },
      { key: "filerAddress2", labels: ["Address Line 2", "Address 2"], kinds: ["text"], required: false, note: "V: AX marked it required but live validation named only the entity name" },
      { key: "filerCity", labels: ["City"], kinds: ["text"], required: true },
      { key: "filerState", labels: ["State"], kinds: ["select", "text"], required: true },
      { key: "filerZip", labels: ["Zip", "Zip Code", "Postal"], kinds: ["text"], required: true },
      // Bottom: Go Back, Cancel, Save for Later, Continue. Next screen (fee, distribution email,
      // drawdown/card, final button) is V. No EIN field on this form.
    ],
    knownUnused: ["SOP Address", "Service Company Address", "Organizer Address", "Go Back", "Cancel", "Save for Later"],
  },
} satisfies Record<string, ScreenIntents>;

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
