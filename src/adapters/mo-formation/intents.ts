import type { ScreenIntents } from "../../resolver/types.js";

/**
 * Missouri SOS online business filing system (bsd.sos.mo.gov), domestic LLC.
 * Built from Missouri's own step-by-step guide "Registering a Limited Liability Company"
 * (sos.mo.gov/bsd/onlinereferenceguides, captured 2026-11-18). Screen order and field
 * MEANINGS are from the guide; exact field LABELS are provisional and must be replaced
 * by the captured wording on the live walk (the site is behind a Cloudflare challenge
 * from data-center IPs, so the walk runs from the fixed-IP machine).
 *
 * The system requires a logged-in account. One account/dashboard serves formation,
 * good standing, annual reports and fictitious name.
 */
export const MO_SCREENS = {
  login: {
    screenKey: "mo.login",
    title: "Business Services sign in",
    intents: [
      { key: "username", labels: ["Username", "Email", "Login"], kinds: ["text"], required: true },
      { key: "password", labels: ["Password"], kinds: ["password"], required: true },
    ],
  },
  dashboard: {
    screenKey: "mo.dashboard",
    title: "Dashboard",
    intents: [],
    knownUnused: ["Create LLC"],
  },
  entityType: {
    screenKey: "mo.entity_type",
    title: "Create LLC: type",
    intents: [
      { key: "entityType", labels: ["Limited Liability Company", "Entity Type", "Type"], kinds: ["select"], required: true },
      { key: "domesticForeign", labels: ["Domestic", "Domestic or Foreign"], kinds: ["radio", "select"], required: true },
    ],
  },
  details: {
    screenKey: "mo.details",
    title: "LLC details",
    intents: [
      { key: "name", labels: ["Entity Name", "LLC Name", "Name"], kinds: ["text"], required: true, note: "name must contain an LLC indicator" },
      { key: "duration", labels: ["Duration", "Period of Duration", "How long will the LLC operate"], kinds: ["text", "select"], required: true, note: "perpetual, or a dissolution date" },
      { key: "management", labels: ["Managed by", "Management", "Member or Manager Managed"], kinds: ["radio", "select"], required: true },
      { key: "purpose", labels: ["Purpose", "Purpose for which the LLC is organized"], kinds: ["textarea", "text"], required: true },
      { key: "seriesLlc", labels: ["Series LLC"], kinds: ["checkbox"], required: false, note: "uploads LLC 1A; paper-upload path not mapped" },
    ],
  },
  registeredAgent: {
    screenKey: "mo.registered_agent",
    title: "Registered agent",
    intents: [
      { key: "agentName", labels: ["Registered Agent Name", "Agent Name", "Name"], kinds: ["text"], required: true },
      { key: "agentStreet1", labels: ["Address", "Street Address", "Registered Office Address"], kinds: ["text"], required: true, note: "must be a Missouri address" },
      { key: "agentStreet2", labels: ["Address 2", "Suite"], kinds: ["text"], required: false },
      { key: "agentCity", labels: ["City"], kinds: ["text"], required: true },
      { key: "agentState", labels: ["State"], kinds: ["select", "text"], required: true, note: "Missouri" },
      { key: "agentZip", labels: ["Zip", "Zip Code", "Postal Code"], kinds: ["text"], required: true },
    ],
  },
  organizers: {
    screenKey: "mo.organizers",
    title: "Organizers",
    intents: [],
    knownUnused: ["Add Organizer", "Save Organizer"],
  },
  organizerModal: {
    screenKey: "mo.organizers.add",
    title: "Add organizer",
    intents: [
      { key: "organizerName", labels: ["Name", "Organizer Name"], kinds: ["text"], required: true },
      { key: "organizerStreet1", labels: ["Address", "Street Address"], kinds: ["text"], required: true },
      { key: "organizerCity", labels: ["City"], kinds: ["text"], required: true },
      { key: "organizerState", labels: ["State"], kinds: ["select", "text"], required: true },
      { key: "organizerZip", labels: ["Zip", "Zip Code"], kinds: ["text"], required: true },
    ],
  },
  principalOffice: {
    screenKey: "mo.principal_office",
    title: "Principal office address",
    intents: [
      { key: "street1", labels: ["Address", "Street Address", "Principal Office Address"], kinds: ["text"], required: true, note: "PO box only with a physical street address" },
      { key: "street2", labels: ["Address 2", "Suite"], kinds: ["text"], required: false },
      { key: "city", labels: ["City"], kinds: ["text"], required: true },
      { key: "state", labels: ["State"], kinds: ["select", "text"], required: true },
      { key: "zip", labels: ["Zip", "Zip Code"], kinds: ["text"], required: true },
    ],
  },
  review: {
    screenKey: "mo.review",
    title: "Review",
    intents: [
      { key: "acknowledge", labels: ["acknowledge that the information provided above is true and correct", "true and correct", "I acknowledge"], kinds: ["checkbox"], required: true },
    ],
  },
  signer: {
    screenKey: "mo.signer",
    title: "Signor",
    intents: [
      { key: "signerName", labels: ["Signor", "Signer", "Name"], kinds: ["text"], required: true },
      { key: "signerTitle", labels: ["Title", "Capacity"], kinds: ["text", "select"], required: false },
      { key: "agreement", labels: ["confirm all information on your filing is true and correct", "agreement", "I agree"], kinds: ["checkbox"], required: true, note: "the human-tap / signature moment" },
    ],
  },
  cart: {
    screenKey: "mo.cart",
    title: "Shopping cart",
    intents: [
      { key: "paymentType", labels: ["Credit Card", "Electronic Check", "Payment Type"], kinds: ["radio", "select"], required: true },
    ],
    knownUnused: ["Payment", "Order Copies/Certificates", "Add Another Filing"],
  },
} satisfies Record<string, ScreenIntents>;

/** Missouri good standing: dashboard -> Order Good Standing -> search -> select -> Order Copies/Certificates -> cart. */
export const MO_STANDING_SCREENS = {
  search: {
    screenKey: "mo.standing.search",
    title: "Order good standing: search",
    intents: [{ key: "businessName", labels: ["Business Name", "Entity Name", "Search"], kinds: ["text"], required: true }],
  },
  cart: {
    screenKey: "mo.standing.cart",
    title: "Shopping cart",
    intents: [{ key: "paymentType", labels: ["Credit Card", "Electronic Check", "Payment Type"], kinds: ["radio", "select"], required: true }],
  },
} satisfies Record<string, ScreenIntents>;
