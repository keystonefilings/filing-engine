import type { ScreenIntents } from "../../resolver/types.js";

/** NY DOS Online Filing (filings.dos.ny.gov), Domestic LLC Articles of Organization. Screen 2 bottom pending walk C. */
export const NY_SCREENS = {
  entityName: {
    screenKey: "ny.entity_name",
    title: "Proposed Entity Name",
    intents: [
      { key: "entityName", labels: ["Proposed Entity Name", "Entity Name", "Name"], kinds: ["text"], required: true, note: "must include LLC indicator" },
    ],
  },
  filing: {
    screenKey: "ny.filing",
    title: "Articles of Organization",
    intents: [
      { key: "openingStatement", labels: ["include following statement", "Include the following statement"], kinds: ["checkbox"], required: false },
      { key: "llcName", labels: ["Name of the Limited Liability Company", "LLC Name", "Entity Name"], kinds: ["text"], required: true },
      { key: "englishTranslation", labels: ["English translation", "English Translation of Name"], kinds: ["text"], required: false },
      { key: "purposes", labels: ["Purposes", "Purpose"], kinds: ["checkbox"], required: false },
      { key: "county", labels: ["County"], kinds: ["select"], required: true },
      { key: "sopMode", labels: ["Service of Process", "Address for Service of Process"], kinds: ["radio"], required: true },
      { key: "sopName", labels: ["Name"], kinds: ["text"], required: true },
      { key: "sopAddress1", labels: ["Address", "Address Line 1"], kinds: ["text"], required: true },
      { key: "sopAddress2", labels: ["Address Line 2", "Address 2"], kinds: ["text"], required: false },
      { key: "sopCity", labels: ["City"], kinds: ["text"], required: true },
      { key: "sopState", labels: ["State"], kinds: ["select", "text"], required: true },
      { key: "sopZip", labels: ["Zip", "Zip Code"], kinds: ["text"], required: true },
      { key: "sopEmail", labels: ["Email", "Secretary of State notice email", "Email Address"], kinds: ["email", "text"], required: true },
      { key: "sopEmailConfirm", labels: ["Confirm Email", "Confirm Email Address"], kinds: ["email", "text"], required: true },
      { key: "registeredAgentMode", labels: ["Registered Agent"], kinds: ["radio"], required: false },
      { key: "managementStructure", labels: ["Management Structure", "Management"], kinds: ["radio"], required: true },
      { key: "effectiveDateMode", labels: ["Effective Date"], kinds: ["radio"], required: true },
      { key: "effectiveDate", labels: ["Effective Date", "Date"], kinds: ["date", "text"], required: false },
      { key: "dissolutionMode", labels: ["Dissolution Date", "Date of Dissolution"], kinds: ["radio"], required: false },
      { key: "liabilityStatement", labels: ["Liability statement", "Limitation of Liability"], kinds: ["checkbox"], required: false },
      { key: "organizerName", labels: ["Organizer Name", "Organizer"], kinds: ["text"], required: true },
      { key: "organizerAddress", labels: ["Organizer Address", "Address"], kinds: ["text"], required: true },
      { key: "signature", labels: ["Signature", "Signature of Organizer"], kinds: ["text"], required: true },
      { key: "filerName", labels: ["Filer Name", "Filer"], kinds: ["text"], required: true },
      { key: "filerAddress", labels: ["Filer Address", "Address"], kinds: ["text"], required: true },
      // Bottom of the page (certification, payment / DD account, submit) is unmapped: walk C.
    ],
    knownUnused: ["SOP Address", "Organizer Address"], // copy buttons
  },
} satisfies Record<string, ScreenIntents>;
