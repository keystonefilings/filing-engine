import type { ScreenIntents } from "../../resolver/types.js";

/**
 * IRS EIN Assistant. NOT YET MAPPED LIVE (walk B). These are the screens the IRS
 * interview is known to have; labels are provisional and must be replaced by the
 * captured wording before the adapter is marked complete.
 */
export const IRS_SCREENS = {
  legalStructure: { screenKey: "irs.legal_structure", title: "Legal structure", intents: [
    { key: "legalStructure", labels: ["Limited Liability Company (LLC)", "Legal structure"], kinds: ["radio"], required: true },
  ] },
  llcDetails: { screenKey: "irs.llc_details", title: "LLC members and state", intents: [
    { key: "memberCount", labels: ["Number of LLC members", "How many members"], kinds: ["number", "text"], required: true },
    { key: "llcState", labels: ["State where the LLC is physically located", "State"], kinds: ["select"], required: true },
  ] },
  reason: { screenKey: "irs.reason", title: "Why is the LLC requesting an EIN", intents: [
    { key: "reason", labels: ["Started a new business", "Why is the LLC requesting an EIN"], kinds: ["radio"], required: true },
  ] },
  responsibleParty: { screenKey: "irs.responsible_party", title: "Responsible party", intents: [
    { key: "rpFirstName", labels: ["First name"], kinds: ["text"], required: true },
    { key: "rpLastName", labels: ["Last name"], kinds: ["text"], required: true },
    { key: "rpSsn", labels: ["SSN/ITIN", "Social Security Number", "SSN"], kinds: ["text", "password"], required: true },
    { key: "applicantRole", labels: ["I am one of the owners, members, or the managing member", "I am a third party applying for an EIN on behalf of this LLC"], kinds: ["radio"], required: true },
  ] },
  address: { screenKey: "irs.address", title: "Address", intents: [
    { key: "street", labels: ["Street address"], kinds: ["text"], required: true },
    { key: "city", labels: ["City"], kinds: ["text"], required: true },
    { key: "state", labels: ["State"], kinds: ["select"], required: true },
    { key: "zip", labels: ["ZIP code"], kinds: ["text"], required: true },
    { key: "phone", labels: ["Phone number"], kinds: ["tel", "text"], required: true },
  ] },
  details: { screenKey: "irs.details", title: "Tell us about the LLC", intents: [
    { key: "legalName", labels: ["Legal name of LLC", "Legal name"], kinds: ["text"], required: true },
    { key: "county", labels: ["County where the LLC is located", "County"], kinds: ["text"], required: true },
    { key: "articlesState", labels: ["State/Territory where the articles of organization are (or will be) filed"], kinds: ["select"], required: true },
    { key: "startDate", labels: ["LLC start date", "Date business started or acquired"], kinds: ["date", "text"], required: true },
    { key: "closingMonth", labels: ["Closing month of accounting year"], kinds: ["select"], required: true },
  ] },
  letterDelivery: { screenKey: "irs.letter_delivery", title: "Confirmation letter", intents: [
    { key: "receiveOnline", labels: ["Receive letter online", "Receive your EIN confirmation letter online"], kinds: ["radio"], required: true, note: "MUST be online; CP 575 is only downloadable in this session (rule 2)" },
  ] },
  summary: { screenKey: "irs.summary", title: "Summary", intents: [] },
} satisfies Record<string, ScreenIntents>;

/** IRS online EIN assistant availability, Eastern time. Verify on walk B. */
export const IRS_HOURS = { timeZone: "America/New_York", openHour: 7, closeHour: 22, days: [1, 2, 3, 4, 5], minMinutesRemaining: 45 };
