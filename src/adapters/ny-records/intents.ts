import type { ScreenIntents } from "../../resolver/types.js";
import { attestationIntents, ENTITY_SEARCH_INTENTS, filerIntents, recordPaymentScreen } from "../ny-dos/common.js";

/**
 * NY DOS On-Line Filing System, the filings about an existing entity (service-company home,
 * "On-Line Filings for Service Company Filers" and "Requests for Copy of Document(s) or Certificate
 * of Status"), built to the portal map of 2026-11-24 (docs/portal-maps/ny-dos-corporations.md,
 * Screens G to K, written from Keystone's screen recording up to each flow's FINAL button). The
 * first label in each list is the wording the map gives.
 */

const BUTTONS = ["Go Back", "Reset", "Continue", "Back", "Search", "Next", "Previous", "Check Name"];
const plainCopy = { key: "plainCopy", labels: ["Plain Copy"], kinds: ["checkbox" as const], required: false, note: "seen only as a fee line in the recording; where it is ticked is not mapped" };

/** Screen G: Articles of Dissolution, Domestic LLC ("Certificate of Dissolution-Cancellation", LLC Law s.705). */
export const NY_DISSOLUTION = {
  search: { screenKey: "ny.dissolution.search", title: "Articles of Dissolution: DOS ID and Entity Name Search", intents: ENTITY_SEARCH_INTENTS, knownUnused: BUTTONS },
  form: {
    screenKey: "ny.dissolution.form",
    title: "Articles of Dissolution",
    intents: [
      { key: "reason", labels: ["Reason for Dissolution"], kinds: ["radio", "select"], required: true, note: "majority vote or written consent / no members / dissolution date / judicial decree" },
      plainCopy,
      ...attestationIntents,
      ...filerIntents,
    ],
    knownUnused: BUTTONS,
  },
  /** "E-DISSOLUTION PROCESSING SYSTEM" Successful Validation Request: a preview image, entity, DOS ID, transaction number. */
  preview: { screenKey: "ny.dissolution.preview", title: "E-Dissolution: Successful Validation Request", intents: [], knownUnused: BUTTONS },
  payment: recordPaymentScreen("ny.dissolution.payment", "Articles of Dissolution: Payment"),
} satisfies Record<string, ScreenIntents>;

/** Screen H: Certificate of Amendment (name change only) for a domestic LLC (LLC Law s.211). */
export const NY_AMENDMENT = {
  search: { screenKey: "ny.amendment.search", title: "Certificate of Amendment: DOS ID and Entity Name Search", intents: ENTITY_SEARCH_INTENTS, knownUnused: BUTTONS },
  proposedName: {
    screenKey: "ny.amendment.name",
    title: "Certificate of Amendment: Proposed Entity Name",
    intents: [{ key: "entityName", labels: ["Entity Name"], kinds: ["text"], required: true, note: "the new name with its LLC indicator; Check Name answers \"The Entity Name is Available.\"" }],
    knownUnused: BUTTONS,
  },
  form: {
    screenKey: "ny.amendment.form",
    title: "Certificate of Amendment: Filing Information",
    intents: [
      { key: "newName", labels: ["New Name of the Company"], kinds: ["text"], required: false, note: "read-only, uppercased: read back, never typed" },
      plainCopy,
      ...attestationIntents,
      ...filerIntents,
    ],
    knownUnused: BUTTONS,
  },
  preview: { screenKey: "ny.amendment.preview", title: "Certificate of Amendment: Preview Image", intents: [], knownUnused: BUTTONS },
  payment: recordPaymentScreen("ny.amendment.payment", "Certificate of Amendment: Payment"),
} satisfies Record<string, ScreenIntents>;

/** Screen I: Certificate of Change, By Entity, for a domestic LLC (LLC Law s.211-A). */
export const NY_CHANGE_TYPES = {
  county: "Entity County Location (Edit)",
  serviceOfProcess: "Service of Process Recipient and Mailing Address (Edit)",
  serviceOfProcessEmail: "Service of Process Email Address (Add/Edit)",
  registeredAgentName: "Name of Registered Agent (Edit)",
  registeredAgentAddress: "Registered Agent Address (Edit)",
} as const;

const S = { county: "County Change", sop: "Service of Process Name and Address Change", sopEmail: "Service of Process Email Address Change", raName: "Change Registered Agent Name", raAddress: "Change Registered Agent Address" };

export const NY_CHANGE = {
  search: { screenKey: "ny.change.search", title: "Certificate of Change: DOS ID and Entity Name Search", intents: ENTITY_SEARCH_INTENTS, knownUnused: BUTTONS },
  selection: {
    screenKey: "ny.change.selection",
    title: "Certificate of Change: Change Selection",
    intents: Object.entries(NY_CHANGE_TYPES).map(([key, label]) => ({ key, labels: [label], kinds: ["checkbox" as const], required: false, note: "greys out depending on whether an agent is on file" })),
    // Shown on the page, not offered: their sections were not in the recording.
    knownUnused: [...BUTTONS, "Designate Registered Agent (Add)", "Revocation of Registered Agent (Delete)"],
  },
  form: {
    screenKey: "ny.change.form",
    title: "Certificate of Change: Current Information and Changes",
    intents: [
      { key: "newCounty", labels: ["New County"], kinds: ["select"], required: false, section: S.county },
      { key: "sopName", labels: ["Name"], kinds: ["text"], required: false, section: S.sop },
      { key: "sopAddress1", labels: ["Mailing Address 1", "Mailing Address1"], kinds: ["text"], required: false, section: S.sop },
      { key: "sopAddress2", labels: ["Mailing Address 2", "Mailing Address2"], kinds: ["text"], required: false, section: S.sop },
      { key: "sopCity", labels: ["City"], kinds: ["text"], required: false, section: S.sop },
      { key: "sopState", labels: ["State"], kinds: ["select", "text"], required: false, section: S.sop },
      { key: "sopZip", labels: ["Zip Code", "Zip"], kinds: ["text"], required: false, section: S.sop },
      { key: "sopEmail", labels: ["New Email Address"], kinds: ["email", "text"], required: false, section: S.sopEmail },
      { key: "sopEmailConfirm", labels: ["Confirm Email Address"], kinds: ["email", "text"], required: false, section: S.sopEmail },
      { key: "raName", labels: ["Name"], kinds: ["text"], required: false, section: S.raName },
      { key: "raAddress1", labels: ["Mailing Address1", "Mailing Address 1"], kinds: ["text"], required: false, section: S.raAddress },
      { key: "raAddress2", labels: ["Mailing Address2", "Mailing Address 2"], kinds: ["text"], required: false, section: S.raAddress },
      { key: "raCity", labels: ["City"], kinds: ["text"], required: false, section: S.raAddress },
      { key: "raZip", labels: ["Zip Code", "Zip"], kinds: ["text"], required: false, section: S.raAddress, note: "State is NY, fixed" },
      plainCopy,
      ...attestationIntents,
      ...filerIntents,
    ],
    knownUnused: BUTTONS,
  },
  /** The rendered certificate stamped "PREVIEW ONLY". */
  preview: { screenKey: "ny.change.preview", title: "Certificate of Change: Preview", intents: [], knownUnused: BUTTONS },
  payment: recordPaymentScreen("ny.change.payment", "Certificate of Change: Payment"),
} satisfies Record<string, ScreenIntents>;

/** The copy and status requests search on four routes; the engine fills one, the DOS ID. */
const entityLookup = [
  { key: "dosId", labels: ["DOS ID"], kinds: ["text" as const], required: true, note: "one of four routes (DOS ID, Entity Name, Assumed Name ID, Assumed Name)" },
  { key: "entityName", labels: ["Entity Name"], kinds: ["text" as const], required: false },
];
const requester = [
  { key: "distributionEmail", labels: ["Distribution Email Address", "Distribution Email"], kinds: ["email" as const, "text" as const], required: true, note: "prefilled from the profile" },
  { key: "ccEmail", labels: ["Cc Email Address", "Cc Email"], kinds: ["email" as const, "text" as const], required: false },
  { key: "confirmEmail", labels: ["Confirm Email Address", "Confirm Email"], kinds: ["email" as const, "text" as const], required: false, note: "its enforcement was not verified (walk 2026-11-18)" },
];

/** Screen J: Copy of Document ("Copy Request Processing System"). */
export const NY_COPY = {
  search: { screenKey: "ny.copy.search", title: "Copy of Document: Search Entity", intents: [...entityLookup, { key: "assumedNameId", labels: ["Assumed Name ID"], kinds: ["text"], required: false }, { key: "assumedName", labels: ["Assumed Name"], kinds: ["text"], required: false }], knownUnused: BUTTONS },
  history: {
    screenKey: "ny.copy.history",
    title: "Copy of Document: Entity Filing History",
    intents: requester,
    // One Select box per filing on the record: they differ for every entity.
    dynamicFields: ["^select\\b"],
    knownUnused: [...BUTTONS, "Search", "Actions"],
  },
  confirm: { screenKey: "ny.copy.confirm", title: "Copy of Document: selection confirmation", intents: [], knownUnused: BUTTONS },
  payment: recordPaymentScreen("ny.copy.payment", "Copy of Document: Payment"),
} satisfies Record<string, ScreenIntents>;

/** Screen K: Certificates of Status ("Certificate of Status Processing System"). */
export const NY_STATUS = {
  request: {
    screenKey: "ny.status.request",
    title: "Certificates of Status: Search Entity and certificate",
    intents: [
      ...entityLookup,
      { key: "assumedNameId", labels: ["Assumed Name ID"], kinds: ["text"], required: false },
      { key: "assumedName", labels: ["Assumed Name"], kinds: ["text"], required: false },
      ...requester,
      { key: "certificateType", labels: ["Select Certificate of Status", "Certificate of Status"], kinds: ["radio", "select"], required: true, note: "Short Form (current status) / Long Form (plus every document filed)" },
    ],
    knownUnused: BUTTONS,
  },
  review: { screenKey: "ny.status.review", title: "Certificates of Status: Review", intents: [], knownUnused: BUTTONS },
  payment: recordPaymentScreen("ny.status.payment", "Certificates of Status: Payment"),
} satisfies Record<string, ScreenIntents>;
