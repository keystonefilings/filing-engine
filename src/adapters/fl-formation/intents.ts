import type { ScreenIntents } from "../../resolver/types.js";

/**
 * Florida Division of Corporations (Sunbiz), domestic LLC Articles of Organization
 * (efile.sunbiz.org/llc_file.html). Walked end to end to the payment page on 2026-11-19
 * (test entry, nothing filed). No login is needed to file; payment is a credit card or a
 * prepaid Sunbiz E-file account at the final Payment Page. complete:false: a dry run stops
 * before the final payment submit, as with NJ and NY.
 *
 * Flow: disclaimer (llc_file.html) -> one long form (coretype.exe) -> review (coredisp.exe)
 * -> pre-payment summary with tracking number (corefile.exe) -> Payment Page (corenrtn.exe).
 * Field labels are the exact wording captured from the live form.
 */
export const FL_SCREENS = {
  disclaimer: {
    screenKey: "fl.disclaimer",
    title: "Disclaimer",
    intents: [
      { key: "disclaimer", labels: ["I have read and accept the terms of this disclaimer"], kinds: ["checkbox"], required: true },
    ],
    knownUnused: ["Tracking Number:", "PIN:", "Update Filing"],
  },
  form: {
    screenKey: "fl.form",
    title: "Articles of Organization",
    intents: [
      // Effective date (optional)
      { key: "effDateMonth", labels: ["(MM"], kinds: ["text"], required: false, note: "effective date month, optional" },
      { key: "effDateDay", labels: ["/DD"], kinds: ["text"], required: false },
      { key: "effDateYear", labels: ["/YYYY)"], kinds: ["text"], required: false },
      // Optional certificates (+$5 / +$30)
      { key: "certificateOfStatus", labels: ["Certificate of Status"], kinds: ["checkbox"], required: false, note: "+$5" },
      { key: "certifiedCopy", labels: ["Certified Copy"], kinds: ["checkbox"], required: false, note: "+$30" },
      // Name
      { key: "name", labels: ["Limited Liability Company Name"], kinds: ["text"], required: true, note: "must contain an LLC indicator" },
      // Principal address
      { key: "princStreet1", labels: ["Address"], kinds: ["text"], required: true },
      { key: "princStreet2", labels: ["Suite, Apt. #, etc."], kinds: ["text"], required: false },
      { key: "princCity", labels: ["City,"], kinds: ["text"], required: true },
      { key: "princState", labels: ["State"], kinds: ["text"], required: true },
      { key: "princZip", labels: ["Zip Code"], kinds: ["text"], required: true },
      { key: "princCountry", labels: ["Country"], kinds: ["text"], required: true },
      // Mailing
      { key: "mailSame", labels: ["Mailing address same as principal address"], kinds: ["checkbox"], required: false },
      { key: "mailStreet1", labels: ["Address"], kinds: ["text"], required: false, note: "C: when mailing differs" },
      { key: "mailCity", labels: ["City,"], kinds: ["text"], required: false },
      { key: "mailState", labels: ["State"], kinds: ["text"], required: false },
      { key: "mailZip", labels: ["Zip Code"], kinds: ["text"], required: false },
      { key: "mailCountry", labels: ["Country"], kinds: ["text"], required: false },
      // Registered agent (Florida address; person name OR business name)
      { key: "raLastName", labels: ["Last Name"], kinds: ["text"], required: false, note: "C: individual agent" },
      { key: "raFirstName", labels: ["First Name"], kinds: ["text"], required: false },
      { key: "raInitial", labels: ["Initial"], kinds: ["text"], required: false },
      { key: "raSuffix", labels: ["Title (Sr., Jr., etc.)"], kinds: ["text"], required: false },
      { key: "raBusinessName", labels: ["Business to serve as RA"], kinds: ["text"], required: false, note: "C: entity agent, instead of a person" },
      { key: "raStreet1", labels: ["Address"], kinds: ["text"], required: true, note: "Florida street address" },
      { key: "raStreet2", labels: ["Suite, Apt. #, etc."], kinds: ["text"], required: false },
      { key: "raCity", labels: ["City,"], kinds: ["text"], required: true },
      { key: "raZip", labels: ["Zip Code"], kinds: ["text"], required: true, note: "state is implicitly FL" },
      { key: "raSignature", labels: ["Registered Agent Signature"], kinds: ["text"], required: true },
      // Purpose (optional, 240 chars)
      { key: "purpose", labels: ["(Maximum of 240 characters.)"], kinds: ["textarea"], required: false },
      // Correspondence
      { key: "correspondenceName", labels: ["Name"], kinds: ["text"], required: true },
      { key: "correspondenceEmail", labels: ["E-mail Address"], kinds: ["text", "email"], required: true },
      { key: "correspondenceEmailConfirm", labels: ["Re-enter E-mail Address"], kinds: ["text", "email"], required: true },
      // Signature of a member / authorized representative
      { key: "signature", labels: ["Electronic Signature"], kinds: ["text"], required: true },
    ],
    // Authorized persons (off1..off6) are optional and added per person via the FL_AUTHORIZED_PERSON intents.
    knownUnused: ["Continue", "reset", "(Maximum of 240 characters.)"],
  },
  review: {
    screenKey: "fl.review",
    title: "Filing Information (review)",
    intents: [],
    knownUnused: ["Continue"],
  },
  summary: {
    screenKey: "fl.summary",
    title: "Online Filing Information (pre-payment)",
    intents: [],
    knownUnused: ["Continue"],
  },
  payment: {
    screenKey: "fl.payment",
    title: "Payment Page",
    intents: [
      { key: "accountNumber", labels: ["Sunbiz E-file account number"], kinds: ["text"], required: false, note: "C: when paying by the prepaid account" },
      { key: "accountPassword", labels: ["Password"], kinds: ["password"], required: false, note: "C: prepaid account" },
      { key: "accountEmail", labels: ["E-mail Address"], kinds: ["text", "email"], required: false },
    ],
    knownUnused: ["Credit Card Payment", "Sunbiz E-file Account Payment"],
  },
} satisfies Record<string, ScreenIntents>;

/** One authorized person (off<N>) on the FL form. Title codes: MGR, AMBR, AP, AR. Optional. */
export const FL_AUTHORIZED_PERSON = [
  { key: "apTitle", labels: ["Title"], kinds: ["text" as const], required: true, note: "MGR / AMBR / AP / AR" },
  { key: "apLastName", labels: ["Last Name"], kinds: ["text" as const], required: false },
  { key: "apFirstName", labels: ["First Name"], kinds: ["text" as const], required: false },
  { key: "apEntityName", labels: ["Entity Name to serve as MGR"], kinds: ["text" as const], required: false },
  { key: "apStreet1", labels: ["Street Address"], kinds: ["text" as const], required: false },
  { key: "apCity", labels: ["City,"], kinds: ["text" as const], required: false },
  { key: "apState", labels: ["State"], kinds: ["text" as const], required: false },
  { key: "apZip", labels: ["Zip Code"], kinds: ["text" as const], required: false },
];

/** FL online formation entity types and their start URLs + fee keys (fees in config/fees.json FL). */
export const FL_ENTITY_TYPES = {
  llc: { url: "https://efile.sunbiz.org/llc_file.html", feeKey: "statutory", label: "Articles of Organization (LLC)" },
  profit_corp: { url: "https://efile.sunbiz.org/profit_file.html", feeKey: "profit_corp", label: "Articles of Incorporation (Profit Corporation)" },
  limited_partnership: { url: "https://efile.sunbiz.org/lp_file.html", feeKey: "limited_partnership", label: "Certificate of Limited Partnership" },
} as const;
