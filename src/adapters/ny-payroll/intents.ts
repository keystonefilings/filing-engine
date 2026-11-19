import type { ScreenIntents } from "../../resolver/types.js";

/**
 * NY payroll / employer registration (NYS-100): one filing registers for Unemployment
 * Insurance + withholding + wage reporting. Field map from the official NYS 100 (03/26)
 * form (docs/walks/nys-100-payroll-2026-11-19.md). No fee. The online path is NY Business
 * Express, which is NY.gov-ID login-gated and was not walked, so the adapter is
 * complete:false (dry-run only) until the fixed-IP walk confirms the online screens.
 * R required, O optional, C conditional on a branch.
 */
export const NY_PAYROLL_SCREENS = {
  employerInformation: {
    screenKey: "ny.nys100.employer_information",
    title: "Part A - Employer Information",
    intents: [
      { key: "employerType", labels: ["Type", "Business", "Household Employer or Domestic Services"], kinds: ["radio", "checkbox"], required: true, note: "Business -> parts A,B,D,E; Household -> A,C,D,E-1" },
      { key: "legalEntity", labels: ["Legal Entity", "Sole Proprietorship", "Partnership", "Corporation (includes Sub-Chapter S)", "Limited Liability Company (LLC)", "Limited Liability Partnership (LLP)", "Other"], kinds: ["radio", "checkbox"], required: true, note: "C: business only" },
      { key: "fein", labels: ["Federal Employer Identification Number (FEIN)", "FEIN"], kinds: ["text"], required: true, note: "attach CP 575" },
      { key: "telephone", labels: ["Telephone number"], kinds: ["tel", "text"], required: true },
      { key: "fax", labels: ["Fax number"], kinds: ["tel", "text"], required: false },
      { key: "legalName", labels: ["Legal name of business"], kinds: ["text"], required: true },
      { key: "tradeName", labels: ["Trade name (doing business as), if any"], kinds: ["text"], required: false },
      { key: "businessEmail", labels: ["Business email"], kinds: ["email", "text"], required: false },
      { key: "website", labels: ["Website"], kinds: ["text"], required: false },
    ],
  },
  liabilityInformation: {
    screenKey: "ny.nys100.liability_information",
    title: "Part B - Liability Information",
    intents: [
      { key: "dateFirstOperations", labels: ["Enter date of first operations in New York State"], kinds: ["date", "text"], required: true },
      { key: "dateFirstWithholding", labels: ["the date of the first payroll you withheld (or will withhold) New York State Income Tax"], kinds: ["date", "text"], required: false },
      { key: "hasNonEmployeeWorkers", labels: ["Do persons work for you whom you do not consider employees?"], kinds: ["radio"], required: true },
      { key: "registeringForUI", labels: ["Are you registering for Unemployment Insurance?"], kinds: ["radio"], required: true },
      { key: "uiFirstQuarter", labels: ["Jan 1–Mar 31 (1st)", "Apr 1–Jun 30 (2nd)", "Jul 1–Sep 30 (3rd)", "Oct 1–Dec 31 (4th)"], kinds: ["radio", "checkbox"], required: false, note: "C: first quarter paid $300+; when registeringForUI=Yes" },
      { key: "uiYear", labels: ["Year"], kinds: ["text", "number"], required: false, note: "C" },
      { key: "totalCoveredEmployees", labels: ["Total number of covered employees"], kinds: ["number", "text"], required: false },
      { key: "withholdingOnly", labels: ["Are your registering to remit withholding tax only?"], kinds: ["radio"], required: true },
      { key: "acquiredBusiness", labels: ["Have you acquired the business of another employer liable for New York State Unemployment Insurance?"], kinds: ["radio"], required: true },
      { key: "changedLegalEntity", labels: ["Have you changed legal entity?"], kinds: ["radio"], required: true },
    ],
  },
  requiredAddresses: {
    screenKey: "ny.nys100.addresses",
    title: "Part D - Required Addresses",
    intents: [
      { key: "mailingStreet", labels: ["Street or PO box"], kinds: ["text"], required: true, note: "mailing" },
      { key: "mailingCity", labels: ["City"], kinds: ["text"], required: true },
      { key: "mailingState", labels: ["State"], kinds: ["select", "text"], required: true },
      { key: "mailingZip", labels: ["Zip code"], kinds: ["text"], required: true },
      { key: "mailingCounty", labels: ["County"], kinds: ["text", "select"], required: true },
      { key: "physicalStreet", labels: ["Street"], kinds: ["text"], required: false, note: "C: if different / mailing is a PO box" },
      { key: "booksStreet", labels: ["Location of Books/Records", "Street"], kinds: ["text"], required: true },
    ],
    knownUnused: ["ATTN", "ext", "Agent Address (C/O)", "LO 400 Form"],
  },
  businessInformation: {
    screenKey: "ny.nys100.business_information",
    title: "Part E - Business Information",
    intents: [
      { key: "ownerOfficerName", labels: ["Name"], kinds: ["text"], required: true, note: "repeating: proprietor/partners/LLC members/officers" },
      { key: "ownerOfficerSSN", labels: ["Social Security Number"], kinds: ["text"], required: true, note: "SENSITIVE; one per person" },
      { key: "ownerOfficerTitle", labels: ["Title"], kinds: ["text"], required: true },
      { key: "ownerOfficerResidence", labels: ["Residence Address and Phone Number"], kinds: ["text", "textarea"], required: true },
      { key: "numberOfNYLocations", labels: ["number of physical locations at which your company operates in New York State"], kinds: ["number", "text"], required: true },
      { key: "principalActivity", labels: ["Check the principal activity at the above location", "Manufacturing", "Retail Trade", "Construction", "Scientific/professional & technical services", "Other"], kinds: ["checkbox", "radio"], required: true, note: "16 options; Other has a details field" },
    ],
  },
  affirmation: {
    screenKey: "ny.nys100.affirmation",
    title: "Affirmation",
    intents: [
      { key: "signature", labels: ["Signature of Officer, Partner, Proprietor, Member or Individual"], kinds: ["text"], required: true, note: "typed-name signature" },
      { key: "officialPosition", labels: ["Official Position"], kinds: ["text"], required: true },
      { key: "signaturePhone", labels: ["Telephone number"], kinds: ["tel", "text"], required: true },
      { key: "signatureEmail", labels: ["Email address"], kinds: ["email", "text"], required: true },
    ],
  },
} satisfies Record<string, ScreenIntents>;

/** NY payroll registration has no filing fee. */
export const NY_PAYROLL_FEE_USD = 0;
