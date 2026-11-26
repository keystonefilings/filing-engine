/**
 * Client intake forms, one per filing kind, written from the state-portal walkthroughs in
 * docs/portal-maps/. Each field names the engine request path it fills and the portal screen
 * it comes from (`ref`), so the coverage table (docs/portal-maps/INTAKE-COVERAGE.md, made by
 * `npm run coverage`) shows that every field a portal asks for is collected.
 *
 * Paths:
 *  - first-class engine fields go where the engine's FilingRequest schema has them
 *    (src/domain/filing.ts), e.g. `formation.county`;
 *  - payroll questions the engine has no field for go in `payroll.stateAnswers.*`, which the
 *    engine already carries for the long state-specific tail;
 *  - other portal-only answers go in `intake.portal.*` (the engine stores `intake` as given).
 *
 * This file has no imports, so the coverage script can load it with plain Node.
 */

export type FieldType =
  | "text" | "email" | "tel" | "textarea" | "select" | "radio" | "yesno" | "checkbox"
  | "date" | "month" | "number" | "ssn" | "fein" | "zip" | "usState"
  /** A saved signature's id: pick one, or draw a new one (saved with the signer's consent). */
  | "signature";

/** Shown when the value at `path` equals one of `equals` (a path starting with "." is a sibling in the same group item). */
export interface Cond { path: string; equals: string | string[] }

export interface Field {
  kind: "field";
  path: string;
  label: string;
  type: FieldType;
  /** true = always required; "withSiblings" = required once any other field of the same object is filled. */
  required?: boolean | "withSiblings";
  options?: { value: string; label: string }[];
  help?: string;
  maxLength?: number;
  min?: number;
  max?: number;
  /** A number field that takes whole numbers only; on a select of numbers, the value is sent as a number. */
  integer?: boolean;
  /** A text field that needs at least this many words (a first and last name). */
  minWords?: number;
  placeholder?: string;
  defaultValue?: string;
  showIf?: Cond;
  /** Portal walkthrough screen this field comes from. */
  ref?: string;
  /** Turns the form value into the engine's shape. */
  transform?: "monthToDate";
  /** For a signature field: the path of the signer's name, which a saved signature must match. */
  signerPath?: string;
}

export interface Group {
  kind: "group";
  path: string;
  label: string;
  itemLabel: string;
  min: number;
  max: number;
  fields: (Field | Note)[];
  help?: string;
  showIf?: Cond;
  ref?: string;
}

export interface Note { kind: "note"; text: string; showIf?: Cond }

export type Item = Field | Group | Note;

export interface Section { title: string; help?: string; ref?: string; items: Item[]; showIf?: Cond }

/** A signature, attestation or payment authorization the portal reaches; the client grants it here, and again on the approval page. */
export interface Authorization { id: string; text: string; ref: string }

export interface FilingKind {
  id: string;
  title: string;
  summary: string;
  /** Engine request type and state. */
  type: "formation" | "ein_only" | "payroll_registration" | "standing_certificate" | "paper_upload" | "dissolution" | "amendment" | "certificate_of_change" | "copy_request";
  state: "NY" | "NJ" | "FL" | "MO";
  /** Fixed values written into the request. */
  constants: Record<string, unknown>;
  /** Walkthrough file in docs/portal-maps/. */
  map: string;
  /** State fees from the walkthrough, for the client's information (the engine's fee check is what counts). */
  feeNote?: string;
  /** A required step or cost outside this filing, shown below the fee line. */
  feeAside?: string;
  sections: Section[];
  authorizations: Authorization[];
  /** What the engine or the walkthrough does not cover yet. */
  gaps: string[];
}

// ---------------------------------------------------------------- shared lists

export const US_STATES = [
  "AL", "AK", "AZ", "AR", "CA", "CO", "CT", "DE", "DC", "FL", "GA", "HI", "ID", "IL", "IN", "IA", "KS", "KY", "LA", "ME",
  "MD", "MA", "MI", "MN", "MS", "MO", "MT", "NE", "NV", "NH", "NJ", "NM", "NY", "NC", "ND", "OH", "OK", "OR", "PA", "RI",
  "SC", "SD", "TN", "TX", "UT", "VT", "VA", "WA", "WV", "WI", "WY", "PR", "VI", "GU", "AS", "MP",
];

export const NY_COUNTIES = [
  "Albany", "Allegany", "Bronx", "Broome", "Cattaraugus", "Cayuga", "Chautauqua", "Chemung", "Chenango", "Clinton",
  "Columbia", "Cortland", "Delaware", "Dutchess", "Erie", "Essex", "Franklin", "Fulton", "Genesee", "Greene", "Hamilton",
  "Herkimer", "Jefferson", "Kings", "Lewis", "Livingston", "Madison", "Monroe", "Montgomery", "Nassau", "New York",
  "Niagara", "Oneida", "Onondaga", "Ontario", "Orange", "Orleans", "Oswego", "Otsego", "Putnam", "Queens", "Rensselaer",
  "Richmond", "Rockland", "St. Lawrence", "Saratoga", "Schenectady", "Schoharie", "Schuyler", "Seneca", "Steuben",
  "Suffolk", "Sullivan", "Tioga", "Tompkins", "Ulster", "Warren", "Washington", "Wayne", "Westchester", "Wyoming", "Yates",
];

const opts = (...values: string[]) => values.map((v) => ({ value: v, label: v }));
const lv = (pairs: [string, string][]) => pairs.map(([value, label]) => ({ value, label }));

// ---------------------------------------------------------------- field helpers

function f(path: string, label: string, type: FieldType, extra: Partial<Field> = {}): Field {
  return { kind: "field", path, label, type, ...extra };
}

/** A US street address at `path` (street1, street2, city, state, zip). */
function address(path: string, label: string, o: { required?: boolean; state?: string; ref?: string; help?: string; showIf?: Cond; noPoBox?: boolean } = {}): Field[] {
  const req: Field["required"] = o.required ? true : "withSiblings";
  const prefix = label ? `${label}: ` : "";
  return [
    f(`${path}.street1`, `${prefix}street address`, "text", { required: req, ref: o.ref, help: o.noPoBox ? "Street address; a P.O. box is not accepted." : o.help, showIf: o.showIf }),
    f(`${path}.street2`, `${prefix}suite, unit or floor`, "text", { ref: o.ref, showIf: o.showIf }),
    f(`${path}.city`, `${prefix}city`, "text", { required: req, ref: o.ref, showIf: o.showIf }),
    f(`${path}.state`, `${prefix}state`, "usState", { required: req, ref: o.ref, defaultValue: o.state, showIf: o.showIf }),
    f(`${path}.zip`, `${prefix}ZIP code`, "zip", { required: req, ref: o.ref, showIf: o.showIf }),
  ];
}

const yes = (path: string, label: string, ref: string, extra: Partial<Field> = {}) => f(path, label, "yesno", { required: true, ref, ...extra });

function contactSection(ref: string): Section {
  return {
    title: "Filing contact",
    help: "Who the filing company and the state contact about this filing. Receipts and state notices go to this email.",
    items: [
      f("contact.firstName", "First name", "text", { required: true, ref }),
      f("contact.lastName", "Last name", "text", { required: true, ref }),
      f("contact.email", "Email", "email", { required: true, ref }),
      f("contact.phone", "Phone", "tel", { required: true, ref }),
    ],
  };
}

// ---------------------------------------------------------------- NY LLC (DOS)

const NY_DOS = "ny-dos-corporations.md";

const nyLlc: FilingKind = {
  id: "ny-llc",
  title: "New York LLC formation",
  summary: "Articles of Organization for a domestic LLC, filed online with the NY Department of State.",
  type: "formation",
  state: "NY",
  constants: { formation: { entityType: "LLC" } },
  map: NY_DOS,
  feeNote: "State filing fee $200, paid only after the filing is approved. Optional: plain copy $5, certified copy $10, certificate of existence (proof the LLC exists and is in good standing) $25.",
  feeAside: "New York also requires a new LLC to publish a notice of its formation within 120 days. That's a separate step with its own costs and isn't part of this filing.",
  sections: [
    {
      title: "Name",
      ref: "Screen C: Proposed Entity Name",
      items: [
        f("formation.name.baseName", "LLC name, without the ending", "text", { required: true, help: "For example: Blue Harbor Consulting. Words like bank, insurance or school need state consent.", ref: "Screen C" }),
        f("formation.name.designator", "Ending", "select", { required: true, options: opts("LLC", "L.L.C.", "Limited Liability Company"), defaultValue: "LLC", help: "New York rejects a name without one of these.", ref: "Screen C, entity indicator check" }),
        f("formation.name.englishTranslation", "English translation of the name (if not in English)", "text", { ref: "Screen D2, LLC Name" }),
      ],
    },
    {
      title: "Articles",
      ref: "Screen D2: LLC main form",
      items: [
        f("formation.county", "County where the LLC's office will be", "select", { required: true, options: opts(...NY_COUNTIES), help: "Where the LLC will be based; if you work from home, use your home county. In New York City, Manhattan is New York County, Brooklyn is Kings and Staten Island is Richmond.", ref: "Screen D2, County" }),
        f("intake.portal.nyIncludePurposes", "Include the standard \"any lawful act or activity\" purpose clause", "checkbox", { defaultValue: "on", ref: "Screen D2, Purposes (optional)" }),
        f("formation.purpose", "Specific purpose (optional)", "textarea", { maxLength: 300, ref: "Screen D2, Purposes" }),
        f("formation.managementStructure", "Managed by", "radio", { required: true, options: lv([["member_managed", "Its members"], ["manager_managed", "One or more managers"]]), help: "Members are the LLC's owners. Choose \"Its members\" if the owners will run the business; choose managers if people you appoint (owners or not) will run it.", ref: "Screen D2, Management Structure" }),
        f("intake.portal.nyManagementByClass", "Members or managers are organized in classes", "checkbox", { help: "Picks \"a class or classes of\" members or managers on the form.", ref: "Screen D2, Management Structure" }),
        f("formation.effectiveDate", "Effective date", "radio", { required: true, defaultValue: "upon_filing", options: lv([["upon_filing", "When filed"], ["specific", "On a later date"]]), ref: "Screen D2, Effective Date" }),
        f("formation.effectiveDateValue", "Effective on", "date", { required: true, showIf: { path: "formation.effectiveDate", equals: "specific" }, ref: "Screen D2, Effective Date" }),
        f("formation.dissolutionDate", "Latest date to dissolve (leave blank for perpetual existence)", "date", { ref: "Screen D2, Dissolution Date" }),
        f("intake.portal.nyLiabilityStatement", "Include the indemnification (liability) statement", "checkbox", { ref: "Screen D2, Liability Statement" }),
        f("intake.portal.nyOpeningStatement", "Include the opening statement (organizer is a person 18 or older)", "checkbox", { help: "Leave unchecked when the organizer is a company.", ref: "Screen D2, Opening Statement" }),
      ],
    },
    {
      title: "Service of process",
      ref: "Screen D2: Service of Process",
      help: "New York's Secretary of State accepts legal papers (service of process) for the LLC, for example if it is sued, and mails a copy to this name and address. Use an address where mail is read promptly.",
      items: [
        f("formation.serviceOfProcess.mode", "Send legal papers to", "radio", { required: true, defaultValue: "manual", options: lv([["manual", "A name and address I enter (often \"The LLC\" at its address)"], ["service_company", "A service company that receives legal papers for businesses (if you've hired one)"]]), ref: "Screen D2, SOP Select One" }),
        f("formation.serviceOfProcess.person.name", "Name", "text", { required: true, defaultValue: "THE LLC", showIf: { path: "formation.serviceOfProcess.mode", equals: "manual" }, ref: "Screen D2, SOP Name" }),
        ...address("formation.serviceOfProcess.person.address", "Mailing address", { required: true, state: "NY", ref: "Screen D2, SOP address", showIf: { path: "formation.serviceOfProcess.mode", equals: "manual" } }),
        f("formation.serviceOfProcess.serviceCompany", "Service company name, as registered with DOS", "text", { required: true, showIf: { path: "formation.serviceOfProcess.mode", equals: "service_company" }, ref: "Screen D2, Select Service Company" }),
        { kind: "note", text: "If you pick a service company, the Department of State gives that company your contact details, including your email.", showIf: { path: "formation.serviceOfProcess.mode", equals: "service_company" } },
        f("formation.serviceOfProcess.noticeEmail", "Email for service-of-process notices (optional)", "email", { help: "Leave empty to use the contact email below.", ref: "Screen D2, SOP email statement" }),
      ],
    },
    {
      title: "Registered agent (optional)",
      ref: "Screen D2: Registered Agent",
      help: "Optional in New York: the Secretary of State already accepts legal papers for the LLC (see Service of process). Fill this in only if you've hired a registered agent.",
      items: [
        f("formation.registeredAgent.name", "Agent name", "text", { required: "withSiblings", ref: "Screen D2, RA Name" }),
        ...address("formation.registeredAgent.address", "Agent address", { state: "NY", ref: "Screen D2, RA address" }),
      ],
    },
    {
      title: "Organizer and filer",
      ref: "Screen D2: Organizer, Signature, Filer",
      help: "The organizer signs the Articles that create the LLC. It can be the owner or the person filing for them, and being the organizer doesn't make someone an owner. The filer is who the state sends the filing receipt to. Leave blank to use the filing company's details (its organizer and filer on record).",
      items: [
        f("formation.organizer.name", "Organizer name", "text", { required: "withSiblings", help: "This name is typed as the organizer's signature.", ref: "Screen D2, Organizer / Signature" }),
        ...address("formation.organizer.address", "Organizer address", { ref: "Screen D2, Organizer" }),
        f("formation.filer.name", "Filer name", "text", { required: "withSiblings", ref: "Screen D2, Filer" }),
        ...address("formation.filer.address", "Filer address", { ref: "Screen D2, Filer" }),
      ],
    },
    {
      title: "Principal business address (optional)",
      items: address("formation.mainBusinessAddress", "", { ref: "used for the EIN application" }),
    },
    {
      title: "Copies and payment details",
      ref: "Screen F: Payment Information",
      items: [
        f("formation.additionalCertificates.certifiedCopy", "Certified copy ($10)", "checkbox", { ref: "Screen F, Additional Services" }),
        f("formation.additionalCertificates.certificateOfStanding", "Certificate of existence ($25)", "checkbox", { ref: "Screen F, Additional Services" }),
        f("formation.additionalCertificates.plainCopy", "Plain copy ($5)", "checkbox", { ref: "Screen F, Additional Services" }),
        f("intake.portal.customerReference", "Your reference number (optional)", "text", { maxLength: 40, ref: "Screen F, Customer Reference Number" }),
        f("intake.portal.ccEmail", "Copy receipts to this email (optional)", "email", { ref: "Screen F, Cc E-mail Address" }),
      ],
    },
    contactSection("Screen F, E-mail Address"),
  ],
  authorizations: [
    { id: "ny-signature", ref: "Screen D2, Signature (STOP)", text: "I authorize the filing company to type the organizer's name as the organizer's signature on these Articles of Organization and to certify that the statements in them are true and correct." },
    { id: "ny-payment", ref: "Screen F, Payment Authorization (STOP)", text: "I authorize the filing company to pay the state fee shown on the approval page. The Department of State does not refund fees." },
  ],
  gaps: [
    "The page after File Document (the filing receipt) is not mapped, so the filing runs as a dry run.",
  ],
};

// ---------------------------------------------------------------- NY business corporation (DOS)

const nyCorp: FilingKind = {
  id: "ny-corp",
  title: "New York corporation formation",
  summary: "Certificate of Incorporation for a domestic business corporation, filed online with the NY Department of State.",
  type: "formation",
  state: "NY",
  constants: { formation: { entityType: "LLC", nyEntityType: "business_corporation" } },
  map: NY_DOS,
  feeNote: "State filing fee $125 (no tax on shares without par value). Shares with a par value add New York's tax on shares, 1/20 of 1% of their total par value; the state's page works it out, and the filing stops before payment if it differs. Optional: plain copy $5, certified copy $10, certificate of existence $25.",
  sections: [
    {
      title: "Name",
      ref: "Screen C: Proposed Entity Name",
      items: [
        f("formation.name.baseName", "Corporation name, without the ending", "text", { required: true, help: "For example: Hudson Ledger. Words like bank, insurance or school need state consent.", ref: "Screen C" }),
        f("formation.name.designator", "Ending", "select", { required: true, options: opts("Inc.", "Corp.", "Corporation", "Incorporated", "Limited", "Ltd."), defaultValue: "Inc.", help: "New York rejects a corporation name without one of these.", ref: "Screen C, entity indicator check (BCL s.301)" }),
        f("formation.name.englishTranslation", "English translation of the name (if not in English)", "text", { ref: "Screen D1, Corporation Name" }),
      ],
    },
    {
      title: "Certificate",
      ref: "Screen D1: BCL main form",
      items: [
        f("formation.county", "County where the corporation's office will be", "select", { required: true, options: opts(...NY_COUNTIES), ref: "Screen D1, County" }),
        f("formation.stockShares", "Number of shares the corporation may issue", "number", { required: true, min: 1, integer: true, help: "Many new corporations authorize 200 shares without par value.", ref: "Screen D1, Shares" }),
        f("intake.portal.nyShareValue", "Share value", "radio", { defaultValue: "no_par", options: lv([["no_par", "No par value"], ["par", "Par value"]]), help: "No par value unless you pick Par value.", ref: "Screen D1, Share Value" }),
        f("formation.stockParValueUsd", "Par value of each share (US dollars)", "number", { required: true, min: 0.000001, help: "For example 0.01. The tax on shares is 1/20 of 1% of the shares' total par value.", showIf: { path: "intake.portal.nyShareValue", equals: "par" }, ref: "Screen D1, Share Value (par amount)" }),
        f("formation.effectiveDate", "Effective date", "radio", { required: true, defaultValue: "upon_filing", options: lv([["upon_filing", "When filed"], ["specific", "On a later date"]]), ref: "Screen D1, Effective Date" }),
        f("formation.effectiveDateValue", "Effective on", "date", { required: true, showIf: { path: "formation.effectiveDate", equals: "specific" }, ref: "Screen D1, Effective Date" }),
      ],
    },
    {
      title: "Service of process",
      ref: "Screen D1: Service of Process",
      help: "New York's Secretary of State accepts legal papers (service of process) for the corporation, for example if it is sued, and mails a copy to this name and address. Use an address where mail is read promptly.",
      items: [
        f("formation.serviceOfProcess.mode", "Send legal papers to", "radio", { required: true, defaultValue: "manual", options: lv([["manual", "A name and address I enter (often \"The Corporation\" at its address)"], ["service_company", "A service company that receives legal papers for businesses (if you've hired one)"]]), ref: "Screen D1, SOP Select One" }),
        f("formation.serviceOfProcess.person.name", "Name", "text", { required: true, defaultValue: "THE CORPORATION", showIf: { path: "formation.serviceOfProcess.mode", equals: "manual" }, ref: "Screen D1, SOP Name" }),
        ...address("formation.serviceOfProcess.person.address", "Mailing address", { required: true, state: "NY", ref: "Screen D1, SOP address", showIf: { path: "formation.serviceOfProcess.mode", equals: "manual" } }),
        f("formation.serviceOfProcess.serviceCompany", "Service company name, as registered with DOS", "text", { required: true, showIf: { path: "formation.serviceOfProcess.mode", equals: "service_company" }, ref: "Screen D1, Select Service Company" }),
        { kind: "note", text: "If you pick a service company, the Department of State gives that company your contact details, including your email.", showIf: { path: "formation.serviceOfProcess.mode", equals: "service_company" } },
        f("formation.serviceOfProcess.noticeEmail", "Email for service-of-process notices (optional)", "email", { help: "Leave empty to use the contact email below.", ref: "Screen D1, SOP email statement" }),
      ],
    },
    {
      title: "Incorporator",
      ref: "Screen D1: Incorporator, Signature",
      items: [
        f("formation.incorporator.name", "Incorporator's full name", "text", { required: true, minWords: 2, help: "First and last name, with a middle initial if any. This name is typed as the incorporator's signature.", ref: "Screen D1, Incorporator / Signature" }),
        ...address("formation.incorporator.address", "Incorporator address", { required: true, ref: "Screen D1, Incorporator" }),
      ],
    },
    {
      title: "Filer",
      ref: "Screen D1: Filer",
      help: "Leave blank to use the filing company's details (its filer on record).",
      items: [
        f("formation.filer.name", "Filer name", "text", { required: "withSiblings", ref: "Screen D1, Filer" }),
        ...address("formation.filer.address", "Filer address", { ref: "Screen D1, Filer" }),
      ],
    },
    {
      title: "Principal business address (optional)",
      items: address("formation.mainBusinessAddress", "", { ref: "used for the EIN application" }),
    },
    {
      title: "Copies and payment details",
      ref: "Screen F: Payment Information",
      items: [
        f("formation.additionalCertificates.certifiedCopy", "Certified copy ($10)", "checkbox", { ref: "Screen F, Additional Services" }),
        f("formation.additionalCertificates.certificateOfStanding", "Certificate of existence ($25)", "checkbox", { ref: "Screen F, Additional Services" }),
        f("formation.additionalCertificates.plainCopy", "Plain copy ($5)", "checkbox", { ref: "Screen F, Additional Services" }),
        f("intake.portal.customerReference", "Your reference number (optional)", "text", { maxLength: 40, ref: "Screen F, Customer Reference Number" }),
        f("intake.portal.ccEmail", "Copy receipts to this email (optional)", "email", { ref: "Screen F, Cc E-mail Address" }),
      ],
    },
    contactSection("Screen F, E-mail Address"),
  ],
  authorizations: [
    { id: "ny-corp-signature", ref: "Screen D1, Signature of Incorporator (STOP)", text: "I am the incorporator named above. I authorize the filing company to type my name as the incorporator's signature on this Certificate of Incorporation, and I certify that the statements in it are true and correct." },
    { id: "ny-payment", ref: "Screen F, Payment Authorization (STOP)", text: "I authorize the filing company to pay the state fee shown on the approval page. The Department of State does not refund fees." },
  ],
  gaps: [
    "The tax on par-value shares is quoted from the statute (Tax Law s.180); the state's page has only been seen computing it for shares without par value. A different amount on the page stops the filing before payment.",
    "The par amount field's exact label, format and limit were not captured on the walk.",
    "The optional registered agent, duration date, director-liability and preemptive-rights statements on the form aren't entered by the engine yet, so the form doesn't ask for them.",
  ],
};

// ---------------------------------------------------------------- NJ LLC (Business Formation)

const NJ_BF = "nj-business-formation.md";

const njLlc: FilingKind = {
  id: "nj-llc",
  title: "New Jersey LLC formation",
  summary: "Certificate of Formation for a domestic LLC, filed online through NJ Business Formation.",
  type: "formation",
  state: "NJ",
  constants: { formation: { entityType: "LLC" } },
  map: NJ_BF,
  feeNote: "State filing fee $100, plus any charge New Jersey's checkout adds. The approval page shows the exact total, and it's checked again at payment.",
  sections: [
    {
      title: "Name",
      ref: "Screens 1 and 2: Business Name, Business Designator",
      items: [
        f("formation.name.baseName", "LLC name, without the ending", "text", { required: true, help: "Don't type LLC or Ltd. here; pick the ending below.", ref: "Screen 1, Business Name" }),
        f("formation.name.designator", "Ending", "select", { required: true, defaultValue: "LLC", options: opts("LLC", "L.L.C.", "LTD LIABILITY CO", "LTD LIABILITY CO.", "LTD LIABILITY COMPANY", "LIMITED LIABILITY CO", "LIMITED LIABILITY CO.", "LIMITED LIABILITY COMPANY"), ref: "Screen 2, Business Designator" }),
      ],
    },
    {
      title: "Business data",
      ref: "Screens 3 to 5: Business Data, Purpose, Main Business Address",
      items: [
        f("intake.portal.njExistingEin", "EIN, if one is already assigned (usually blank)", "fein", { ref: "Screen 3, Employer Identification Number" }),
        f("formation.naicsCode", "NAICS code (optional)", "text", { help: "2 to 6 digits.", ref: "Screen 3, NAICS Code" }),
        f("formation.duration", "Duration (leave blank for perpetual)", "text", { maxLength: 12, ref: "Screen 3, Duration" }),
        f("formation.effectiveDate", "Effective date", "radio", { required: true, defaultValue: "upon_filing", options: lv([["upon_filing", "When filed"], ["specific", "On a later date"]]), ref: "Screen 3, Effective Date" }),
        f("formation.effectiveDateValue", "Effective on", "date", { required: true, showIf: { path: "formation.effectiveDate", equals: "specific" }, ref: "Screen 3, Effective Date" }),
        f("formation.purpose", "Business purpose (optional)", "textarea", { maxLength: 300, ref: "Screen 4, Business Purpose" }),
        ...address("formation.mainBusinessAddress", "Main business address (optional)", { ref: "Screen 5, Main Business Address" }),
      ],
    },
    {
      title: "Registered agent",
      ref: "Screens 6 and 7: Registered Agent",
      help: "Every New Jersey business needs a registered agent with a New Jersey street address.",
      items: [
        f("formation.registeredAgentChoice", "Registered agent", "radio", { required: true, defaultValue: "client_provided", options: lv([["client_provided", "I'll name the agent"], ["filing_company", "The filing company's registered agent (named on the approval page)"]]), ref: "Screen 6" }),
        f("intake.portal.njRegisteredAgentNumber", "Registered agent number, if the agent has one on file (optional)", "text", { showIf: { path: "formation.registeredAgentChoice", equals: "client_provided" }, ref: "Screen 6, Option A" }),
        f("formation.registeredAgent.name", "Agent name", "text", { required: true, showIf: { path: "formation.registeredAgentChoice", equals: "client_provided" }, ref: "Screen 7, RA Name" }),
        f("formation.registeredAgent.email", "Agent email (optional)", "email", { showIf: { path: "formation.registeredAgentChoice", equals: "client_provided" }, ref: "Screen 7, RA Email" }),
        f("intake.portal.njRegisteredAgentPhone", "Agent phone (optional)", "tel", { showIf: { path: "formation.registeredAgentChoice", equals: "client_provided" }, ref: "Screen 7, Phone Number" }),
        ...address("formation.registeredAgent.address", "Agent office", { required: true, state: "NJ", noPoBox: true, ref: "Screen 7, Office Address", showIf: { path: "formation.registeredAgentChoice", equals: "client_provided" } }),
      ],
    },
    {
      title: "Members and managers",
      ref: "Screen 8a: Members / Managers",
      items: [
        {
          kind: "group", path: "formation.members", label: "Members or managers", itemLabel: "Member", min: 1, max: 10, ref: "Screen 8a, Add New Member",
          help: "Up to 10, each with a street address.",
          fields: [f("name", "Name", "text", { required: true }), ...address("address", "Address", { required: true })],
        },
      ],
    },
    {
      title: "Other provisions (optional)",
      ref: "Screen 9: Other Provisions",
      items: [
        { kind: "group", path: "formation.otherProvisions", label: "Extra articles or provisions", itemLabel: "Provision", min: 0, max: 10, ref: "Screen 9", fields: [f("", "Text", "textarea", { required: true, maxLength: 3000 })] },
      ],
    },
    {
      title: "Signers",
      ref: "Screen 10: Signatures (not reached in the walkthrough)",
      items: [
        { kind: "group", path: "formation.signers", label: "Who signs the certificate", itemLabel: "Signer", min: 1, max: 10, ref: "Screen 10", fields: [f("name", "Full name", "text", { required: true }), f("title", "Title", "text", { required: true, defaultValue: "Authorized Representative" })] },
      ],
    },
    {
      title: "Certificates",
      items: [
        f("formation.additionalCertificates.certificateOfStanding", "Also order a certificate of standing", "checkbox", { ref: "engine add-on" }),
        f("formation.additionalCertificates.certifiedCopy", "Also order a certified copy", "checkbox", { ref: "engine add-on" }),
      ],
    },
    contactSection("Screen 11: Contact Information (not reached)"),
  ],
  authorizations: [
    { id: "nj-ra-attestation", ref: "Screen 7, Attestation checkbox (STOP)", text: "I attest that the registered agent information is correct for this business and that the agent named is aware of and has accepted the responsibility of acting as its registered agent, and I authorize the filing company to check that box for me." },
    { id: "nj-signature", ref: "Screen 10, Signatures (STOP)", text: "I authorize the filing company to enter the signers' names as their signatures on the Certificate of Formation." },
    { id: "nj-payment", ref: "Screen 13, Payment", text: "I authorize the filing company to pay the state fee shown on the approval page." },
  ],
  gaps: [
    "The Signatures, Contact Information, Review and Payment screens were not reached in the walkthrough; their exact fields are unconfirmed.",
  ],
};

// ---------------------------------------------------------------- NJ for-profit corporation (Business Formation, DP)

const NJ_CORP_ENDINGS = ["INC.", "INC", "CORP.", "CORP", "CORPORATION", "INCORPORATED", "COMPANY", "CO.", "CO", "LTD"];

const njCorp: FilingKind = {
  id: "nj-corp",
  title: "New Jersey corporation formation",
  summary: "Certificate of Incorporation for a domestic for-profit corporation (DP), filed online through NJ Business Formation.",
  type: "formation",
  state: "NJ",
  constants: { formation: { entityType: "LLC", njEntityType: "for_profit_corporation" } },
  map: NJ_BF,
  feeNote: "State filing fee $100, plus any charge New Jersey's checkout adds. The approval page shows the exact total, and it's checked again at payment.",
  sections: [
    {
      title: "Name",
      ref: "Screens 1 and 2: Business Name, Business Designator",
      items: [
        f("formation.name.baseName", "Corporation name, without the ending", "text", { required: true, help: "Don't type Inc. or Corp. here; pick the ending below.", ref: "Screen 1, Business Name" }),
        f("formation.name.designator", "Ending", "select", { required: true, defaultValue: "INC.", options: opts(...NJ_CORP_ENDINGS), ref: "Screen 2, Business Designator (DP)" }),
      ],
    },
    {
      title: "Business data",
      ref: "Screens 3 to 5: Business Data, Purpose, Main Business Address",
      items: [
        f("formation.stockShares", "Total number of shares", "number", { required: true, min: 1, integer: true, help: "At least 1. New Jersey doesn't ask whether they have a par value.", ref: "Screen 3, Stock (Total Number of Shares)" }),
        f("formation.naicsCode", "NAICS code (optional)", "text", { help: "2 to 6 digits.", ref: "Screen 3, NAICS Code" }),
        f("formation.duration", "Duration (leave blank for perpetual)", "text", { maxLength: 12, ref: "Screen 3, Duration" }),
        f("formation.effectiveDate", "Effective date", "radio", { required: true, defaultValue: "upon_filing", options: lv([["upon_filing", "When filed"], ["specific", "On a later date"]]), ref: "Screen 3, Effective Date" }),
        f("formation.effectiveDateValue", "Effective on", "date", { required: true, showIf: { path: "formation.effectiveDate", equals: "specific" }, ref: "Screen 3, Effective Date" }),
        f("formation.purpose", "Business purpose (optional)", "textarea", { maxLength: 300, help: "Left blank, the certificate reads \"General\".", ref: "Screen 4, Business Purpose" }),
        ...address("formation.mainBusinessAddress", "Main business address (optional)", { ref: "Screen 5, Main Business Address" }),
      ],
    },
    {
      title: "Registered agent",
      ref: "Screens 6 and 7: Registered Agent",
      help: "Every New Jersey business needs a registered agent with a New Jersey street address.",
      items: [
        f("formation.registeredAgentChoice", "Registered agent", "radio", { required: true, defaultValue: "client_provided", options: lv([["client_provided", "I'll name the agent"], ["filing_company", "The filing company's registered agent (named on the approval page)"]]), ref: "Screen 6" }),
        f("formation.registeredAgent.name", "Agent name", "text", { required: true, showIf: { path: "formation.registeredAgentChoice", equals: "client_provided" }, ref: "Screen 7, RA Name" }),
        f("formation.registeredAgent.email", "Agent email (optional)", "email", { showIf: { path: "formation.registeredAgentChoice", equals: "client_provided" }, ref: "Screen 7, RA Email" }),
        ...address("formation.registeredAgent.address", "Agent office", { required: true, state: "NJ", noPoBox: true, ref: "Screen 7, Office Address", showIf: { path: "formation.registeredAgentChoice", equals: "client_provided" } }),
      ],
    },
    {
      title: "Board of directors",
      ref: "Screen 8b: Board of Directors",
      items: [
        {
          kind: "group", path: "formation.directors", label: "Directors", itemLabel: "Director", min: 1, max: 10, ref: "Screen 8b, Add New Director",
          help: "At least 1, up to 10, each with a street address.",
          fields: [f("name", "Name", "text", { required: true }), ...address("address", "Address", { required: true })],
        },
      ],
    },
    {
      title: "Incorporators",
      ref: "Screen 8b: Incorporators",
      help: "The incorporators sign the certificate.",
      items: [
        {
          kind: "group", path: "formation.incorporators", label: "Incorporators", itemLabel: "Incorporator", min: 1, max: 10, ref: "Screen 8b, Add New Incorporators",
          help: "At least 1, up to 10, each with an address.",
          fields: [f("name", "Full name", "text", { required: true }), ...address("address", "Address", { required: true })],
        },
      ],
    },
    contactSection("Screen 13: Payment, Contact Information (LLC walk 2026-11-17)"),
  ],
  authorizations: [
    { id: "nj-ra-attestation", ref: "Screen 7, Attestation checkbox (STOP)", text: "I attest that the registered agent information is correct for this business and that the agent named is aware of and has accepted the responsibility of acting as its registered agent, and I authorize the filing company to check that box for me." },
    { id: "nj-corp-signature", ref: "Screen 10, Signatures (STOP)", text: "I am an incorporator named above, and each other incorporator named above has authorized me to give this authorization for them. I authorize the filing company to enter each incorporator's name as a signer and check their Signature Box on the Certificate of Incorporation, which the portal says indicates acceptance of the certificate and the intent to formally execute the filing." },
    { id: "nj-payment", ref: "Screen 13, Payment", text: "I authorize the filing company to pay the state fee shown on the approval page." },
  ],
  gaps: [
    "Signatures, Review and Payment were reached for an LLC only; a corporation's signer title list wasn't seen. Each incorporator signs, with the only title the list offers; the filing stops if it offers several.",
    "A certificate of standing or certified copy can't be ordered with a corporation yet: their prices at its checkout haven't been seen.",
    "Other provisions and the registered agent number aren't entered by the engine yet, so the form doesn't ask for them.",
  ],
};

// ---------------------------------------------------------------- FL (Sunbiz): LLC, profit corp, LP

const FL = "fl-sunbiz.md";

function flCommon(nameRef: string, designators: string[], nameHelp: string): Section[] {
  return [
    {
      title: "Name and effective date",
      items: [
        f("formation.name.baseName", "Name, without the ending", "text", { required: true, help: nameHelp, ref: nameRef }),
        f("formation.name.designator", "Ending", "select", { required: true, options: opts(...designators), defaultValue: designators[0], ref: nameRef }),
        f("formation.effectiveDate", "Effective date", "radio", { required: true, defaultValue: "upon_filing", options: lv([["upon_filing", "When filed"], ["specific", "On another date"]]), ref: "Effective date" }),
        f("formation.effectiveDateValue", "Effective on", "date", { required: true, help: "Up to 5 business days before the state receives it, or up to 90 days after.", showIf: { path: "formation.effectiveDate", equals: "specific" }, ref: "Effective date" }),
      ],
    },
    {
      title: "Addresses",
      items: [
        ...address("formation.mainBusinessAddress", "Principal address", { required: true, noPoBox: true, ref: "Principal address" }),
        f("intake.portal.flMailingSameAsPrincipal", "Mailing address is the same", "checkbox", { defaultValue: "on", ref: "Mailing address same as principal" }),
        ...address("intake.portal.flMailingAddress", "Mailing address", { required: true, help: "A P.O. box is fine here.", ref: "Mailing address", showIf: { path: "intake.portal.flMailingSameAsPrincipal", equals: "" } }),
      ],
    },
    {
      title: "Registered agent",
      help: "A Florida street address is required; the entity can't be its own agent.",
      items: [
        f("formation.registeredAgentChoice", "Registered agent", "radio", { required: true, defaultValue: "client_provided", options: lv([["client_provided", "I'll name the agent"], ["filing_company", "The filing company's registered agent (named on the approval page)"]]) }),
        f("intake.portal.flAgentKind", "The agent is", "radio", { required: true, defaultValue: "individual", options: lv([["individual", "A person"], ["business", "A business"]]), showIf: { path: "formation.registeredAgentChoice", equals: "client_provided" }, ref: "Registered agent, individual or business" }),
        f("intake.portal.flAgentFirstName", "First name", "text", { required: true, showIf: { path: "intake.portal.flAgentKind", equals: "individual" }, ref: "RA First Name" }),
        f("intake.portal.flAgentInitial", "Middle initial", "text", { maxLength: 1, showIf: { path: "intake.portal.flAgentKind", equals: "individual" }, ref: "RA Initial" }),
        f("intake.portal.flAgentLastName", "Last name", "text", { required: true, showIf: { path: "intake.portal.flAgentKind", equals: "individual" }, ref: "RA Last Name" }),
        f("intake.portal.flAgentSuffix", "Suffix", "select", { options: opts("", "Sr", "Jr"), showIf: { path: "intake.portal.flAgentKind", equals: "individual" }, ref: "RA Title (Sr/Jr)" }),
        f("intake.portal.flAgentBusinessName", "Business serving as agent", "text", { required: true, help: "Must differ from the name being filed.", showIf: { path: "intake.portal.flAgentKind", equals: "business" }, ref: "Business to serve as Registered Agent" }),
        ...address("formation.registeredAgent.address", "Agent address", { required: true, state: "FL", noPoBox: true, ref: "RA Address, Suite, City, Zip", showIf: { path: "formation.registeredAgentChoice", equals: "client_provided" } }),
        f("intake.portal.flAgentSignerName", "Person who accepts for the agent (types the agent signature)", "text", { required: true, help: "Must be a person, even when the agent is a business.", showIf: { path: "formation.registeredAgentChoice", equals: "client_provided" }, ref: "Registered Agent Signature (STOP)" }),
      ],
    },
  ];
}

function flCopies(statusFee: string, copyFee: string): Section {
  return {
    title: "Add-ons",
    items: [
      f("formation.additionalCertificates.certificateOfStanding", `Certificate of status (${statusFee})`, "checkbox", { ref: "Certificate of Status" }),
      f("formation.additionalCertificates.certifiedCopy", `Certified copy (${copyFee})`, "checkbox", { ref: "Certified Copy" }),
    ],
  };
}

const flRaAuth: Authorization = { id: "fl-ra-signature", ref: "Registered Agent Signature (STOP)", text: "I am the person named above to accept for the registered agent. I authorize the filing company to type my name as the agent's signature accepting the appointment. (Typing another person's name without authority is forgery under s.831.06 F.S.)" };
const flTerms: Authorization = { id: "fl-disclaimer", ref: "Entry screen, disclaimer checkbox (STOP)", text: "I authorize the filing company to accept the Sunbiz filing disclaimer for this filing." };
const flPay: Authorization = { id: "fl-payment", ref: "Tyler Payment Services hand-off", text: "I understand a submitted Florida filing can't be changed, cancelled or refunded, everything in it becomes public record, and I authorize payment of the fee shown on the approval page." };

const flLlc: FilingKind = {
  id: "fl-llc",
  title: "Florida LLC formation",
  summary: "Articles of Organization for a Florida LLC, filed on Sunbiz.",
  type: "formation",
  state: "FL",
  constants: { formation: { entityType: "LLC", floridaEntityType: "llc" } },
  map: FL,
  feeNote: "State fees $125 (filing $100 + registered agent designation $25). Optional: certificate of status $5, certified copy $30.",
  sections: [
    ...flCommon("LLC Name", ["LLC", "L.L.C.", "Limited Liability Company"], "A professional LLC uses PLLC or P.L.L.C. and must give a professional purpose."),
    {
      title: "Purpose and managers",
      items: [
        f("formation.purpose", "Purpose (optional; required for a professional LLC)", "textarea", { maxLength: 240, ref: "Purpose" }),
        {
          kind: "group", path: "formation.authorizedPersons", label: "Managers and authorized representatives (optional)", itemLabel: "Person", min: 0, max: 6, ref: "Manager / member blocks 1 to 6",
          help: "Banks often ask for these. MGR = manager, AMBR = authorized member, AP = authorized person, AR = authorized representative.",
          fields: [
            f("title", "Title", "select", { required: true, defaultValue: "MGR", options: lv([["MGR", "MGR: manager"], ["AMBR", "AMBR: authorized member"], ["AP", "AP: authorized person"], ["AR", "AR: authorized representative"]]) }),
            f("name", "Person's name (Last, First Initial)", "text", { help: "Or fill in the entity name instead." }),
            f("entityName", "Or: entity name", "text"),
            ...address("address", "Address"),
          ],
        },
      ],
    },
    {
      title: "Authorized representative",
      ref: "Electronic Signature (STOP)",
      items: [f("intake.portal.flSignerName", "Name typed as the electronic signature", "text", { required: true, ref: "Electronic Signature" })],
    },
    flCopies("$5", "$30"),
    contactSection("Correspondence Name / E-mail"),
  ],
  authorizations: [flTerms, flRaAuth, { id: "fl-llc-signature", ref: "Electronic Signature (STOP)", text: "I am the authorized representative named above. I authorize the filing company to type my name as the electronic signature, I affirm the facts are true (false information is a third-degree felony under s.817.155 F.S.), and I acknowledge the annual report duty." }, flPay],
  gaps: ["Review, payment and final submit screens after the signatures are not mapped yet."],
};

const flCorp: FilingKind = {
  id: "fl-corp",
  title: "Florida profit corporation",
  summary: "Articles of Incorporation for a Florida for-profit corporation, filed on Sunbiz.",
  type: "formation",
  state: "FL",
  constants: { formation: { entityType: "LLC", floridaEntityType: "profit_corporation" } },
  map: FL,
  feeNote: "State fees $70 (filing $35 + registered agent designation $35). Optional: certificate of status $8.75, certified copy $8.75.",
  sections: [
    ...flCommon("Corporate Name", ["Inc.", "Corp.", "Corporation", "Incorporated", "Company", "Co."], "A professional association uses P.A., Chartered or Professional Association."),
    {
      title: "Shares, purpose and incorporator",
      items: [
        f("formation.stockShares", "Number of authorized shares", "number", { required: true, min: 1, ref: "Corporate Stock Shares" }),
        f("intake.portal.flAnyLawfulBusiness", "Purpose is \"any and all lawful business\"", "checkbox", { defaultValue: "on", help: "Uncheck for a professional association, which must state a specific purpose.", ref: "Any and all lawful business checkbox" }),
        f("formation.purpose", "Specific purpose", "textarea", { required: true, maxLength: 240, showIf: { path: "intake.portal.flAnyLawfulBusiness", equals: "" }, ref: "Purpose" }),
        f("formation.incorporator.name", "Incorporator name", "text", { required: true, help: "Typed as the incorporator's electronic signature.", ref: "Incorporator Name" }),
        ...address("formation.incorporator.address", "Incorporator address", { required: true, ref: "Incorporator Address" }),
      ],
    },
    {
      title: "Officers and directors (optional)",
      items: [{
        kind: "group", path: "intake.portal.flOfficers", label: "Officers and directors", itemLabel: "Officer", min: 0, max: 6, ref: "Officer/Director blocks 1 to 6",
        help: "Needed for most bank accounts. A director can't be a business. Changes later need a paper amendment.",
        fields: [f("title", "Title (P, VP, S, T, D…)", "text", { required: true }), f("name", "Name (Last, First Initial)", "text"), f("entityName", "Or: business name", "text"), ...address("address", "Address")],
      }],
    },
    flCopies("$8.75", "$8.75"),
    contactSection("Correspondence Name / E-mail"),
  ],
  authorizations: [flTerms, flRaAuth, { id: "fl-corp-signature", ref: "Electronic Signature of Incorporator (STOP)", text: "I am the incorporator named above. I authorize the filing company to type my name as the incorporator's electronic signature, and I affirm the facts are true (s.817.155 F.S.)." }, flPay],
  gaps: ["Officers and directors are collected but the engine adapter does not enter them yet.", "Review, payment and final submit are not mapped yet."],
};

const flLp: FilingKind = {
  id: "fl-lp",
  title: "Florida limited partnership",
  summary: "Certificate of Limited Partnership (or LLLP) for Florida, filed on Sunbiz.",
  type: "formation",
  state: "FL",
  constants: { formation: { entityType: "LLC", floridaEntityType: "limited_partnership" } },
  map: FL,
  feeNote: "State fees $1,000 (filing $965 + registered agent designation $35). Optional: certificate of status $8.75, certified copy $52.50.",
  sections: [
    ...flCommon("Limited Partnership Name", ["LP", "L.P.", "Limited Partnership", "Limited", "Ltd.", "LLLP", "L.L.L.P.", "Limited Liability Limited Partnership"], "The ending must match the LLLP choice below."),
    {
      title: "Partnership",
      items: [
        f("formation.isLLLP", "Elect limited liability limited partnership (LLLP) status", "checkbox", { ref: "Limited liability limited partnership checkbox" }),
        {
          kind: "group", path: "formation.generalPartners", label: "General partners", itemLabel: "General partner", min: 1, max: 6, ref: "General Partner blocks 1 to 6",
          help: "Each general partner signs. A business partner must be active on Florida's records.",
          fields: [
            f("name", "Person's name (Last, First Initial)", "text", { help: "Or fill in the entity below." }),
            f("entityName", "Or: entity serving as general partner", "text"),
            f("documentNumber", "That entity's Florida document number", "text"),
            ...address("address", "Address", { required: true }),
            f("signature", "Name typed as this partner's signature", "text", { required: true }),
          ],
        },
      ],
    },
    flCopies("$8.75", "$52.50"),
    contactSection("Correspondence Name / E-mail"),
  ],
  authorizations: [flTerms, flRaAuth, { id: "fl-gp-signatures", ref: "GP Signature per block (STOP)", text: "I am a general partner named above, and each other general partner named above has authorized me to give this authorization for them. I authorize the filing company to type each general partner's name as their signature, and I affirm the facts are true (s.817.155 F.S.)." }, flPay],
  gaps: ["Review, payment and final submit are not mapped yet."],
};

// ---------------------------------------------------------------- IRS EIN

const IRS = "irs-ein-online.md";

const irsEin: FilingKind = {
  id: "irs-ein",
  title: "EIN for an existing LLC",
  summary: "Employer Identification Number (EIN) from the IRS, applied for online. The IRS charges no fee.",
  type: "ein_only",
  state: "NY",
  constants: { ein: { mode: "in_run", applicantRole: "owner" }, formation: { entityType: "LLC", effectiveDate: "upon_filing" } },
  map: IRS,
  feeNote: "No IRS fee. The IRS issues one EIN per responsible party per day, and the online service has set hours.",
  sections: [
    {
      title: "The LLC",
      ref: "Screens 2 and 5: Legal Structure, Additional Details",
      items: [
        f("state", "State where the LLC was formed", "select", { required: true, options: lv([["NY", "New York"], ["NJ", "New Jersey"], ["FL", "Florida"], ["MO", "Missouri"]]), help: "Form the LLC with the state first; the IRS says skipping that may delay the EIN.", ref: "Screen 5, State where articles are filed" }),
        f("formation.name.baseName", "Legal name, without the ending", "text", { required: true, help: "Must match the articles. Only - and & are allowed as special characters.", ref: "Screen 5, Legal name" }),
        f("formation.name.designator", "Ending", "select", { required: true, defaultValue: "LLC", options: opts("LLC", "L.L.C.", "Limited Liability Company"), ref: "Screen 5, Legal name" }),
        f("ein.tradeName", "Trade name / DBA, if different (optional)", "text", { ref: "Screen 5, Trade name" }),
        f("ein.memberCount", "Number of members", "number", { required: true, min: 1, ref: "Screen 2, How many members" }),
        f("ein.county", "County where the LLC is located", "text", { required: true, ref: "Screen 5, County" }),
        f("ein.startDate", "LLC start date (month and year)", "month", { required: true, transform: "monthToDate", ref: "Screen 5, LLC Start Date" }),
        f("ein.closingMonth", "Last month of the accounting year", "select", { defaultValue: "12", options: lv([["1", "January"], ["2", "February"], ["3", "March"], ["4", "April"], ["5", "May"], ["6", "June"], ["7", "July"], ["8", "August"], ["9", "September"], ["10", "October"], ["11", "November"], ["12", "December"]]), ref: "engine (closing month)" }),
        f("ein.reason", "Why the LLC needs an EIN", "radio", { required: true, defaultValue: "new_business", options: lv([["new_business", "Started a new business"], ["hired_employees", "Hired employees"], ["banking", "Banking purposes"], ["changed_organization", "Changed type of organization"], ["purchased_business", "Purchased an active business"]]), ref: "Screen 2, reason" }),
      ],
    },
    {
      title: "Responsible party",
      ref: "Screen 3: Identity",
      help: "The person who controls the LLC. Their details must match IRS records. The SSN is encrypted, used only for this filing and deleted after 30 days.",
      items: [
        f("ein.responsibleParty.name", "Full name", "text", { required: true, help: "Only - and & are allowed as special characters.", ref: "Screen 3, First / Middle / Last name, Suffix" }),
        f("ein.responsibleParty.ssn", "SSN or ITIN", "ssn", { required: true, ref: "Screen 3, SSN/ITIN" }),
        f("ein.responsibleParty.title", "Role in the LLC", "text", { required: true, defaultValue: "Member", ref: "Screen 3, role" }),
        f("ein.responsibleParty.phone", "Phone (digits only)", "tel", { required: true, ref: "Screen 4, Phone number" }),
        ...address("ein.responsibleParty.address", "Physical location of the LLC", { required: true, noPoBox: true, ref: "Screen 4, Addresses", help: "Must be a U.S. address; no P.O. box." }),
        f("intake.portal.mailElsewhere", "Mail should go to a different address", "checkbox", { ref: "Screen 4, different mailing address" }),
        ...address("ein.mailingAddress", "Mailing address", { required: true, showIf: { path: "intake.portal.mailElsewhere", equals: "on" }, ref: "Screen 4, mailing address (branch not walked)" }),
      ],
    },
    {
      title: "Activities and employees",
      ref: "Screen 5: Tell us more about the LLC",
      items: [
        yes("ein.regulated.highwayVehicle", "Owns a highway motor vehicle of 55,000 lb or more?", "Screen 5"),
        yes("ein.regulated.wagering", "Involves gambling or wagering?", "Screen 5"),
        yes("ein.regulated.form720", "Needs to file Form 720 (federal excise tax)?", "Screen 5"),
        yes("ein.regulated.alcoholTobaccoFirearms", "Sells or manufactures alcohol, tobacco or firearms?", "Screen 5"),
        yes("ein.employees.expected", "Has or expects W-2 employees in the next 12 months?", "Screen 5, employees"),
        f("ein.employees.firstWages", "First wages paid (month and year)", "month", { required: true, showIf: { path: "ein.employees.expected", equals: "yes" }, ref: "Screen 5, Describe your employees" }),
        f("ein.employees.agriculturalCount", "Agricultural employees expected", "number", { min: 0, showIf: { path: "ein.employees.expected", equals: "yes" }, ref: "Screen 5, highest number" }),
        f("ein.employees.otherCount", "Other employees expected", "number", { required: true, min: 0, showIf: { path: "ein.employees.expected", equals: "yes" }, ref: "Screen 5, highest number" }),
        f("ein.employees.lowAnnualLiability", "Employment tax liability $1,000 or less a year (files Form 944)?", "yesno", { required: true, showIf: { path: "ein.employees.expected", equals: "yes" }, ref: "Screen 5, $1,000 or less" }),
      ],
    },
    {
      title: "Business activity",
      ref: "Screen 6: Additional Details (part 2)",
      items: [
        f("ein.businessActivity.category", "Category that best describes the business", "select", { required: true, options: opts("Accommodations", "Construction", "Finance", "Food Service", "Health Care", "Insurance", "Manufacturing", "Real Estate", "Rental & Leasing", "Retail", "Social Assistance", "Transportation", "Warehousing", "Wholesale", "Other"), ref: "Screen 6, category" }),
        f("intake.portal.irsOtherActivity", "Primary activity", "select", { required: true, options: opts("Consulting", "Manufacturing", "Organization", "Rental", "Repair", "Sell goods", "Service", "Other"), showIf: { path: "ein.businessActivity.category", equals: "Other" }, ref: "Screen 6, Other activities" }),
        f("ein.businessActivity.detail", "What the business does, in a few words (e.g. management consulting)", "text", { required: true, ref: "Screen 6, follow-up questions" }),
      ],
    },
    {
      title: "Confirmation letter",
      ref: "Screen 7: Review & Submit",
      items: [
        f("ein.noticeDelivery", "How to receive the EIN confirmation letter (CP 575)", "radio", { required: true, defaultValue: "digital", options: lv([["digital", "Digitally, right away"], ["mail", "By mail (up to 4 weeks)"]]), ref: "Screen 7, confirmation letter" }),
      ],
    },
    { ...contactSection("engine contact"), help: "Who the filing company contacts about this application. Updates about it go to this email." },
  ],
  authorizations: [
    { id: "irs-owner-application", ref: "Screen 3, Your role: one of the owners", text: "I am the responsible party named above and one of the LLC's owners or members, or its managing member. I authorize the filing company to complete and submit this EIN application for me, as one of the owners, with the details above." },
  ],
  gaps: [
    "Only the LLC path is mapped; other legal structures, the multi-member branch and the mailing-address branch were not walked.",
    "The EIN Assignment screen (CP 575 download) is unmapped because it needs a real submission.",
  ],
};

// ---------------------------------------------------------------- NY NYS-100

const NYS100 = "ny-nys100-unemployment.md";
/** A12 Select Principal Activity, as the walk listed it. */
const NYS100_ACTIVITIES = [
  "Arts, Entertainment & Recreation", "Computer/Information Services", "Construction", "Corporate, Subsidiary Managing Office", "Educational Services",
  "Finance and Insurance", "Food Service, Drinking & Accommodations", "Health & Social Assistance", "Manufacturing", "Non store retailer", "Real Estate",
  "Rental ; Leasing Services", "Retail Trade", "Scientific/Professional & Technical Services", "Transportation", "Utilities", "Warehousing", "Wholesale trade", "Other",
];
/** The activities that ask type of establishment, product or service and % of revenue (Manufacturing and Other ask their own). */
const NYS100_SERVICE_ACTIVITIES = NYS100_ACTIVITIES.filter((a) => a !== "Manufacturing" && a !== "Other");

const nyNys100: FilingKind = {
  id: "ny-nys100",
  title: "New York employer registration (NYS-100)",
  summary: "Unemployment insurance, withholding and wage reporting registration, through NY Business Express.",
  type: "payroll_registration",
  state: "NY",
  constants: { payroll: { employerType: "business" } },
  map: NYS100,
  feeNote: "No state fee. NY Business Express lists an average processing time of 15 days.",
  sections: [
    {
      title: "Business profile",
      ref: "P2 to P9: Entity Type, Business Identification, Addresses, Contact, Industry",
      items: [
        f("payroll.ownershipType", "Type of entity", "select", { required: true, options: lv([["llc_member_managed", "LLC, member managed"], ["llc_manager_managed", "LLC, manager managed"], ["corporation_s", "Corporation, S corp"], ["corporation_c", "Corporation, C corp"], ["llp", "Limited liability partnership"], ["lp", "Limited partnership"], ["partnership", "Partnership"], ["sole_proprietor", "Individual (sole proprietor)"]]), help: "So far this form has been tested only with LLCs. For other entity types, the state may ask for owner details this form doesn't collect.", ref: "P2, Type of entity + sub type" }),
        f("payroll.legalName", "Legal name", "text", { required: true, ref: "P3, Legal Name" }),
        f("payroll.tradeName", "DBA or trade name (optional)", "text", { ref: "P3, DBA" }),
        f("payroll.fein", "Federal EIN", "fein", { required: true, help: "Required to register online. Get the EIN first.", ref: "P3, FEIN" }),
        ...address("payroll.businessAddress", "Business physical address", { required: true, state: "NY", noPoBox: true, ref: "P5, Business Physical Address", help: "No permanent place? Use the owner's home address." }),
        f("payroll.county", "County of the physical address", "select", { required: true, options: opts(...NY_COUNTIES), ref: "P5, County" }),
        f("intake.portal.nysAttn", "ATTN / C/O (optional)", "text", { ref: "P5, ATTN (C/O)" }),
        f("intake.portal.nysMailingSame", "Physical address is also the mailing address", "checkbox", { defaultValue: "on", ref: "P5, also the mailing address" }),
        ...address("payroll.mailingAddress", "Mailing address", { required: true, showIf: { path: "intake.portal.nysMailingSame", equals: "" }, ref: "P7, Mailing Address(es)" }),
        f("payroll.stateAnswers.businessPhone", "Business phone", "tel", { required: true, ref: "P8, Telephone Number" }),
        f("payroll.stateAnswers.businessEmail", "Business email", "email", { ref: "P8, E-mail Address" }),
        f("payroll.stateAnswers.website", "Business website (optional)", "text", { ref: "P8, Business Website" }),
        f("payroll.naics", "Primary NAICS code", "text", { required: true, help: "2 to 6 digits.", ref: "P9, Primary NAICS Code" }),
        f("payroll.stateAnswers.secondaryNaics", "Secondary NAICS code (optional)", "text", { ref: "P9, secondary NAICS" }),
      ],
    },
    {
      title: "Members and owners",
      ref: "P11: Member Information",
      items: [{
        kind: "group", path: "payroll.owners", label: "Members", itemLabel: "Member", min: 1, max: 10, ref: "P11, Add A Member",
        help: "The SSN is required for a US-resident member. It's encrypted, used only for this filing and deleted after 30 days.",
        fields: [
          f("stateAnswers_principalType", "Type", "select", { required: true, defaultValue: "person", options: lv([["person", "Person"], ["business", "Business"]]) }),
          f("title", "Title", "select", { required: true, options: opts("Member", "Managing Member") }),
          f("name", "Full name", "text", { required: true }),
          f("dateOfBirth", "Date of birth", "date", { required: true }),
          f("usResident", "US resident?", "yesno", { required: true }),
          f("ssn", "SSN", "ssn", { required: true, showIf: { path: ".usResident", equals: "yes" } }),
          f("phone", "Phone", "tel", { required: true }),
          f("email", "Email", "email"),
          f("percentOwnership", "Ownership %", "number", { required: true, min: 0, max: 100 }),
          f("profitDistributionPercent", "Profit distribution %, if different", "number", { min: 0, max: 100 }),
          ...address("address", "Residential address", { required: true, showIf: { path: ".usResident", equals: "yes" } }),
          f("county", "County of the residential address", "select", { required: true, options: opts(...NY_COUNTIES), showIf: { path: ".address.state", equals: "NY" }, ref: "P11, County (New York addresses)" }),
          { kind: "note", text: "New York refuses a US address for a member who is not a US resident: give the address outside the US.", showIf: { path: ".usResident", equals: "no" } },
          f("foreignAddress.street1", "Residential address outside the US: street address", "text", { required: true, showIf: { path: ".usResident", equals: "no" }, ref: "P11, non-US address" }),
          f("foreignAddress.street2", "Residential address outside the US: suite, unit or floor", "text", { showIf: { path: ".usResident", equals: "no" }, ref: "P11, non-US address" }),
          f("foreignAddress.city", "Residential address outside the US: city", "text", { required: true, showIf: { path: ".usResident", equals: "no" }, ref: "P11, non-US address" }),
          f("foreignAddress.region", "Residential address outside the US: state or province", "text", { showIf: { path: ".usResident", equals: "no" }, ref: "P11, State/Province" }),
          f("foreignAddress.postalCode", "Residential address outside the US: postal code", "text", { required: true, showIf: { path: ".usResident", equals: "no" }, ref: "P11, Postal Code" }),
          f("foreignAddress.country", "Residential address outside the US: country", "text", { required: true, showIf: { path: ".usResident", equals: "no" }, ref: "P11, Country" }),
        ],
      }],
    },
    {
      title: "Liability",
      ref: "A2 to A5: Business Identification, Liability, Transfers, Change of Legal Entity",
      items: [
        f("payroll.stateAnswers.employerRegistrationNumber", "Existing NY employer registration number (7 digits; leave blank if new)", "text", { help: "Not the FEIN.", ref: "A2, Employer Registration Number" }),
        yes("payroll.payingWages", "Paid, or expect to pay, $300 or more in wages in a calendar quarter?", "A3"),
        f("payroll.dateFirstOperations", "Date the business began in New York", "date", { required: true, ref: "A3, date you began business in NYS" }),
        f("payroll.uiLiabilityQuarter", "First quarter with $300 or more in wages", "select", { required: true, options: lv([["Q1", "January to March"], ["Q2", "April to June"], ["Q3", "July to September"], ["Q4", "October to December"]]), ref: "A3, first calendar quarter" }),
        f("payroll.uiLiabilityYear", "Year of that quarter", "number", { required: true, min: 1990, max: 2100, ref: "A3, Year" }),
        yes("payroll.stateAnswers.withholdsNyTax", "Will you withhold NY income tax from employees' pay?", "A3, withhold"),
        f("payroll.dateFirstWithholding", "Date of the first payroll with withholding", "date", { required: true, showIf: { path: "payroll.stateAnswers.withholdsNyTax", equals: "yes" }, ref: "A3, first payroll withheld" }),
        f("payroll.coveredEmployees", "Total number of employees", "number", { required: true, min: 0, ref: "A3, Total number of Employees" }),
        yes("payroll.stateAnswers.nonEmployeeWorkers", "Do people work for you whom you don't consider employees?", "A3"),
        f("payroll.stateAnswers.nonEmployeeServices", "Describe the services they perform", "textarea", { required: true, showIf: { path: "payroll.stateAnswers.nonEmployeeWorkers", equals: "yes" }, ref: "A3, Describe services" }),
        yes("payroll.stateAnswers.acquiredBusiness", "Did you acquire the business of an employer liable for NY unemployment insurance?", "A4, Business Transfers"),
        f("payroll.stateAnswers.acquiredAllOrPart", "Acquired all or part?", "radio", { required: true, options: opts("All", "Part"), showIf: { path: "payroll.stateAnswers.acquiredBusiness", equals: "yes" }, ref: "A4" }),
        f("payroll.stateAnswers.acquiredDate", "Date acquired", "date", { required: true, showIf: { path: "payroll.stateAnswers.acquiredBusiness", equals: "yes" }, ref: "A4" }),
        f("payroll.stateAnswers.acquiredLegalName", "Acquired employer's legal name", "text", { required: true, showIf: { path: "payroll.stateAnswers.acquiredBusiness", equals: "yes" }, ref: "A4" }),
        ...address("payroll.stateAnswers.acquiredAddress", "Acquired employer's address", { required: true, showIf: { path: "payroll.stateAnswers.acquiredBusiness", equals: "yes" }, ref: "A4" }),
        f("payroll.stateAnswers.acquiredCounty", "Acquired employer's county", "select", { required: true, options: opts(...NY_COUNTIES), showIf: { path: "payroll.stateAnswers.acquiredAddress.state", equals: "NY" }, ref: "A4, County" }),
        f("payroll.stateAnswers.acquiredRegistrationNumber", "Acquired employer's registration number", "text", { showIf: { path: "payroll.stateAnswers.acquiredBusiness", equals: "yes" }, ref: "A4" }),
        f("payroll.stateAnswers.acquiredFein", "Acquired employer's FEIN", "fein", { showIf: { path: "payroll.stateAnswers.acquiredBusiness", equals: "yes" }, ref: "A4" }),
        yes("payroll.stateAnswers.legalEntityChanged", "Has your legal entity changed?", "A5, Change of Legal Entity"),
        f("payroll.stateAnswers.legalEntityChangeDate", "Date of the change", "date", { required: true, showIf: { path: "payroll.stateAnswers.legalEntityChanged", equals: "yes" }, ref: "A5" }),
        f("payroll.stateAnswers.previousRegistrationNumber", "Previous NY employer registration number", "text", { required: true, showIf: { path: "payroll.stateAnswers.legalEntityChanged", equals: "yes" }, ref: "A5" }),
        f("payroll.stateAnswers.previousFein", "Previous FEIN", "fein", { required: true, showIf: { path: "payroll.stateAnswers.legalEntityChanged", equals: "yes" }, ref: "A5" }),
      ],
    },
    {
      title: "Where the state writes",
      ref: "A7 to A10: Addresses",
      items: [
        f("intake.portal.booksSameAsBusiness", "Books and records are kept at the business address", "checkbox", { defaultValue: "on", ref: "A8, Location of Books and Records" }),
        ...address("payroll.booksRecordsAddress", "Books and records address (US only)", { required: true, showIf: { path: "intake.portal.booksSameAsBusiness", equals: "" }, ref: "A8" }),
        f("payroll.stateAnswers.booksPhone", "Phone at the books and records location", "tel", { required: true, showIf: { path: "intake.portal.booksSameAsBusiness", equals: "" }, ref: "A8, Phone Number" }),
        f("intake.portal.chargesSameAsBusiness", "Send the Notice of Potential Charges (LO400) to the business address", "checkbox", { defaultValue: "on", help: "Sent each time a former employee claims unemployment benefits.", ref: "A9, Notice of Potential Charges" }),
        ...address("payroll.stateAnswers.chargesAddress", "Address for the Notice of Potential Charges", { required: true, showIf: { path: "intake.portal.chargesSameAsBusiness", equals: "" }, ref: "A9" }),
        f("payroll.stateAnswers.chargesPhone", "Phone for the Notice of Potential Charges", "tel", { required: true, showIf: { path: "intake.portal.chargesSameAsBusiness", equals: "" }, ref: "A9, Phone Number" }),
        yes("payroll.stateAnswers.mailToAgent", "Send all unemployment insurance mail to an agent (C/O)?", "A10, Agent - C/O"),
        f("payroll.stateAnswers.agentAttn", "Agent ATTN (C/O)", "text", { required: true, showIf: { path: "payroll.stateAnswers.mailToAgent", equals: "yes" }, ref: "A10" }),
        ...address("payroll.stateAnswers.agentAddress", "Agent address", { required: true, showIf: { path: "payroll.stateAnswers.mailToAgent", equals: "yes" }, ref: "A10" }),
      ],
    },
    {
      title: "Physical locations in New York",
      ref: "A11 and A12: Physical Locations",
      items: [{
        kind: "group", path: "payroll.workLocations", label: "Locations (the business address counts as the first)", itemLabel: "Location", min: 1, max: 20, ref: "A12, Physical Locations Details",
        fields: [
          ...address("address", "Address", { required: true, state: "NY" }),
          f("employees", "Employees at this location", "number", { required: true, min: 0 }),
          f("activity", "Principal activity", "select", { required: true, options: opts(...NYS100_ACTIVITIES) }),
          { kind: "note", text: "New York asks these for the activity chosen; only what its screen shows is entered.", showIf: { path: ".activity", equals: NYS100_SERVICE_ACTIVITIES } },
          f("activityDetails.establishmentType", "Type of establishment", "text", { required: true, showIf: { path: ".activity", equals: NYS100_SERVICE_ACTIVITIES }, ref: "A12, Type of Establishment" }),
          f("activityDetails.productOrService", "Principal product sold or service rendered", "text", { required: true, showIf: { path: ".activity", equals: NYS100_SERVICE_ACTIVITIES }, ref: "A12, Principal Product Sold or Service Rendered" }),
          f("activityDetails.percentOfRevenue", "Percent of total revenue", "number", { required: true, min: 0, max: 100, showIf: { path: ".activity", equals: NYS100_SERVICE_ACTIVITIES }, ref: "A12, Percent of Total Revenue" }),
          f("activityDetails.productsProduced", "Principal products produced", "text", { required: true, showIf: { path: ".activity", equals: "Manufacturing" }, ref: "A12, Principal Products Produced" }),
          f("activityDetails.rawMaterials", "Principal raw material used", "text", { required: true, showIf: { path: ".activity", equals: "Manufacturing" }, ref: "A12, Principal Raw Material Used" }),
          f("activityDetails.percentOfSalesValue", "Percent of total sales value", "number", { required: true, min: 0, max: 100, showIf: { path: ".activity", equals: "Manufacturing" }, ref: "A12, Percent of Total Sales Value" }),
          f("activityDetails.otherDetails", "Details of the activity", "textarea", { required: true, showIf: { path: ".activity", equals: "Other" }, ref: "A12, If other, furnish details" }),
        ],
      }],
    },
    {
      title: "Submitter",
      ref: "A13: Submitter Information (STOP)",
      items: [
        f("payroll.signer.name", "Submitter full name", "text", { required: true, ref: "A13, First / M.I. / Last Name" }),
        f("payroll.signer.title", "Official position", "text", { required: true, ref: "A13, Official Position" }),
        f("payroll.signer.email", "Submitter email", "email", { required: true, ref: "A13, Email" }),
        f("payroll.stateAnswers.submitterPhone", "Submitter phone", "tel", { required: true, ref: "A13, Phone Number" }),
        f("payroll.stateAnswers.submitterComments", "Comments for the Department of Labor (optional)", "textarea", { ref: "A13, Submitter Comments" }),
      ],
    },
    contactSection("P8, Contact Information"),
  ],
  authorizations: [
    { id: "nys100-attest", ref: "A13, I attest to the above (STOP)", text: "I am the submitter named above. I affirm that the answers are true to the best of my knowledge and belief, and I authorize the filing company to check \"I attest to the above\" and submit the registration for me." },
  ],
  gaps: [
    "Ready to Submit (the final screen) is not mapped yet, so the engine fills up to Submitter Information and stops there.",
    "Corporation, sole-proprietor and partnership owner screens were not walked; only the LLC member path is confirmed.",
    "Not walked, so the engine stops before typing anything: a business member, a mailing address apart from the physical address, more than one physical location, a secondary NAICS code.",
  ],
};

// ---------------------------------------------------------------- NJ-REG

const NJREG = "nj-reg.md";
const NJ_TITLES = opts("Accountant", "Chairman", "Chief Operating Officer", "Co-Owner", "CPA", "Director", "ESQ.", "General Partner", "Incorporator", "Managing Member", "MBA", "MD", "Member", "Officer", "Other", "Owner", "PhD.", "Pres.", "Public Accountant", "Sec.", "Treas.", "Trustee", "VP");

const NJ_TAX_QUESTIONS: [string, string][] = [
  ["salesTax", "Collect NJ sales tax and/or pay use tax?"],
  ["exemptPurchases", "Make exempt purchases for inventory or production?"],
  ["tobacco", "Sell or distribute cigarettes, tobacco or nicotine products?"],
  ["motorFuels", "Sell or transport motor fuels or petroleum?"],
  ["petroleumStorage", "Store petroleum or hazardous chemicals?"],
  ["litter", "Make, wholesale, distribute or retail litter-generating products?"],
  ["solidWasteFacility", "Operate a solid waste facility?"],
  ["solidWasteTransport", "Transport solid waste to an out-of-state site or rail transfer station?"],
  ["landfill", "Own or operate a sanitary landfill or solid waste facility in NJ?"],
  ["gasElectric", "Sell, store, deliver or transport natural gas or electricity in NJ?"],
  ["publicContractor", "Contractor or subcontractor to the state, public agencies, schools or casino licensees?"],
  ["vehicleRental", "Rent motor vehicles for 28 days or less?"],
  ["tiresVehicles", "Sell new motor vehicle tires, or sell or lease motor vehicles?"],
  ["telecom", "Provide voice grade access or mobile telecommunications in NJ?"],
  ["lodging", "Operate a hotel, motel, B&B or similar in NJ?"],
  ["gamesOfChance", "Run legalized games of chance with a prize over $1,000?"],
  ["millvilleDistrict", "Operate in the Sports and Entertainment District of Millville?"],
];

const njReg: FilingKind = {
  id: "nj-reg",
  title: "New Jersey business and employer registration (NJ-REG)",
  summary: "Tax and employer registration for a business already formed in New Jersey. Needs the NJ Entity ID and the EIN.",
  type: "payroll_registration",
  state: "NJ",
  constants: { payroll: { employerType: "business" } },
  map: NJREG,
  feeNote: "No state fee.",
  sections: [
    {
      title: "Business identification",
      ref: "Screens 1 to 4",
      help: "Order for a new NJ entity: formation, then the EIN, then this registration.",
      items: [
        f("payroll.legalName", "Business name (as on the state record)", "text", { required: true, ref: "Screen 3, Business Name (prefilled)" }),
        f("payroll.entity.njBusinessNumber", "NJ Business Entity ID", "text", { required: true, help: "10 digits, from the formation filing.", ref: "Screen 2a, Entity ID" }),
        f("payroll.fein", "Federal EIN", "fein", { required: true, ref: "Screen 2a, EIN" }),
        f("payroll.beginDate", "Beginning date for this business in NJ", "date", { required: true, ref: "Screen 3, Beginning Date" }),
        yes("payroll.stateAnswers.yearRound", "Year-round business?", "Screen 3"),
        f("payroll.stateAnswers.season", "Which months does the business operate?", "text", { required: true, showIf: { path: "payroll.stateAnswers.yearRound", equals: "no" }, ref: "Screen 3 (branch not walked)" }),
        f("payroll.tradeName", "Trade name to show on the certificate (optional)", "text", { ref: "Screen 3, Trade Name" }),
        ...address("payroll.businessAddress", "Main business address", { required: true, state: "NJ", ref: "Screen 4, Main Business Address" }),
        f("payroll.county", "County", "text", { required: true, ref: "Screen 4, County" }),
        f("payroll.stateAnswers.municipality", "Municipality", "text", { required: true, ref: "Screen 4, Municipality" }),
        f("payroll.stateAnswers.mailingAttention", "Mailing: attention to", "text", { required: true, ref: "Screen 4, Attention To" }),
        f("intake.portal.njMailingDifferent", "Mailing address is different from the business location", "checkbox", { ref: "Screen 4, checkbox" }),
        ...address("payroll.mailingAddress", "Mailing address", { required: true, showIf: { path: "intake.portal.njMailingDifferent", equals: "on" }, ref: "Screen 4, Mailing Address" }),
      ],
    },
    {
      title: "Ownership",
      ref: "Screens 5 and 6",
      items: [
        f("payroll.ownershipType", "Ownership type", "select", { required: true, options: opts("Ltd. Liability Co. (1065 Filer)", "Ltd. Liability Co. (1120 Filer)", "Ltd. Liability Co. - Single Member", "Corporation", "Limited Partnership", "Limited Liability Partnership"), help: "The state's list depends on the entity type. These are the LLC options; other entity types may see different choices on the state's site, and only LLCs have been tested so far.", ref: "Screen 5, Ownership Type" }),
        f("payroll.entity.fiscalMonth", "Last month of the fiscal year", "select", { options: lv([["1", "January"], ["2", "February"], ["3", "March"], ["4", "April"], ["5", "May"], ["6", "June"], ["7", "July"], ["8", "August"], ["9", "September"], ["10", "October"], ["11", "November"], ["12", "December"]]), defaultValue: "12", integer: true, ref: "Screen 5" }),
        yes("payroll.stateAnswers.subsidiary", "Is this business a subsidiary of another corporation?", "Screen 5"),
        f("payroll.stateAnswers.sCorpStatus", "Federal S corporation status", "radio", { required: true, defaultValue: "neither", options: lv([["s_corp", "Federal S Corporation"], ["qsss", "QSSS"], ["neither", "Neither"]]), help: "Pick Neither if you don't have the IRS acceptance letter.", ref: "Screen 5, S Corporation or QSSS" }),
        f("payroll.stateAnswers.sCorpApprovalDate", "Federal S corp / QSSS approval date", "date", { required: true, showIf: { path: "payroll.stateAnswers.sCorpStatus", equals: ["s_corp", "qsss"] }, ref: "Screen 5, election block (not walked)" }),
        {
          kind: "group", path: "payroll.owners", label: "Owners, partners or responsible officers", itemLabel: "Owner", min: 1, max: 10, ref: "Screen 6, Add Individual Owner",
          help: "At least one. A single-member LLC lists exactly one. Each SSN is encrypted, used only for this filing and deleted after 30 days.",
          fields: [
            f("name", "Full name", "text", { required: true }),
            f("title", "Title", "select", { required: true, options: NJ_TITLES }),
            f("ssn", "SSN", "ssn", { required: true }),
            f("percentOwnership", "Percent of ownership", "number", { required: true, min: 0, max: 100 }),
            ...address("address", "Address", { required: true }),
          ],
        },
        {
          kind: "group", path: "payroll.stateAnswers.businessOwners", label: "Business owners (optional)", itemLabel: "Business owner", min: 0, max: 10, ref: "Screen 6, Add Business Owner (not opened)",
          fields: [f("name", "Business name", "text", { required: true }), f("ein", "Its EIN (not this business's)", "fein", { required: true }), f("percentOwnership", "Percent of ownership", "number", { required: true, min: 0, max: 100 }), ...address("address", "Address", { required: true })],
        },
      ],
    },
    {
      title: "Business classification",
      ref: "Screen 7",
      items: [
        f("payroll.njBusinessCode", "NJ business code", "text", { required: true, help: "For example 2754 (Consulting Services).", ref: "Screen 7, New Jersey Business Code" }),
        f("payroll.businessActivity", "Principal product or service", "textarea", { required: true, maxLength: 400, ref: "Screen 7, Principal Product or Service" }),
        f("payroll.stateAnswers.typeOfActivity", "Type of activity", "textarea", { required: true, maxLength: 400, ref: "Screen 7, Type of Activity" }),
        f("payroll.stateAnswers.sicCode", "SIC code (optional)", "text", { ref: "Screen 7, Standard Industrial Code" }),
        f("payroll.naics", "NAICS code", "text", { required: true, ref: "Screen 7, NAICS Code" }),
        f("payroll.coveredEmployees", "Number of workers in NJ", "number", { required: true, min: 0, ref: "Screen 7, Number of Workers in New Jersey" }),
      ],
    },
    {
      title: "Employment activities",
      ref: "Screen 8",
      items: [
        yes("payroll.stateAnswers.acquiredPredecessor", "Acquired substantially all the assets, business or employees of a previous employer?", "Screen 8"),
        f("payroll.stateAnswers.predecessorDetails", "Predecessor's name, NJ ID and date acquired", "textarea", { required: true, showIf: { path: "payroll.stateAnswers.acquiredPredecessor", equals: "yes" }, ref: "Screen 8 (branch not walked)" }),
        yes("payroll.stateAnswers.njResidentsOutsideNj", "Paying wages to NJ residents working outside NJ?", "Screen 8"),
        yes("payroll.stateAnswers.pensionPayer", "Paying pension or annuity income to NJ residents?", "Screen 8"),
        yes("payroll.stateAnswers.multipleFacilities", "More than one employing facility in NJ?", "Screen 8"),
        yes("payroll.payingWages", "Paying wages to employees working in NJ within the next 6 months?", "Screen 8"),
        f("payroll.firstWageDate", "Date of the first wage payment", "date", { required: true, showIf: { path: "payroll.payingWages", equals: "yes" }, ref: "Screen 8" }),
        f("payroll.stateAnswers.firstNjHireDate", "Date the first NJ employee was hired (optional)", "date", { showIf: { path: "payroll.payingWages", equals: "yes" }, ref: "Screen 8" }),
        f("payroll.stateAnswers.payrollOver1000Date", "Date cumulative gross payroll exceeds $1,000", "date", { required: true, showIf: { path: "payroll.payingWages", equals: "yes" }, ref: "Screen 8" }),
        f("payroll.stateAnswers.agricultural", "Is the employment agricultural?", "yesno", { required: true, showIf: { path: "payroll.payingWages", equals: "yes" }, ref: "Screen 8" }),
        f("payroll.stateAnswers.household", "Is the employment household?", "yesno", { required: true, showIf: { path: "payroll.payingWages", equals: "yes" }, ref: "Screen 8" }),
        f("payroll.stateAnswers.household1000Date", "Date household cash wages reached $1,000", "date", { required: true, showIf: { path: "payroll.stateAnswers.household", equals: "yes" }, ref: "Screen 8" }),
        f("payroll.stateAnswers.futa", "Subject to FUTA this year or last?", "yesno", { required: true, showIf: { path: "payroll.payingWages", equals: "yes" }, ref: "Screen 8" }),
        f("payroll.stateAnswers.futaYear", "Year first subject to FUTA", "number", { required: true, min: 1950, max: 2100, showIf: { path: "payroll.stateAnswers.futa", equals: "yes" }, ref: "Screen 8" }),
        f("payroll.stateAnswers.uiExempt", "Claims exemption under the NJ Unemployment Compensation Law?", "yesno", { required: true, showIf: { path: "payroll.payingWages", equals: "yes" }, ref: "Screen 8" }),
        f("payroll.stateAnswers.uiExemptReason", "Why it claims the exemption", "textarea", { required: true, showIf: { path: "payroll.stateAnswers.uiExempt", equals: "yes" }, ref: "Screen 8" }),
        f("payroll.stateAnswers.peo", "Is the company a PEO (employee leasing company)?", "yesno", { required: true, showIf: { path: "payroll.payingWages", equals: "yes" }, ref: "Screen 8" }),
      ],
    },
    {
      title: "Taxable business activities",
      ref: "Screen 9",
      items: [
        ...NJ_TAX_QUESTIONS.map(([k, q]) => yes(`payroll.stateAnswers.tax.${k}`, q, "Screen 9")),
        f("payroll.stateAnswers.tax.firstSaleDate", "Exact date of the first sale", "date", { required: true, showIf: { path: "payroll.stateAnswers.tax.salesTax", equals: "yes" }, ref: "Screen 9, sales tax branch" }),
        f("payroll.stateAnswers.tax.multipleSalesLocations", "More than one NJ location collecting sales tax?", "yesno", { required: true, showIf: { path: "payroll.stateAnswers.tax.salesTax", equals: "yes" }, ref: "Screen 9, sales tax branch" }),
        f("payroll.stateAnswers.tax.tobaccoDetails", "Tobacco: wholesaler/distributor status and who you buy from", "textarea", { required: true, showIf: { path: "payroll.stateAnswers.tax.tobacco", equals: "yes" }, ref: "Screen 9, tobacco branch" }),
        f("payroll.stateAnswers.tax.otherEligibility", "Eligible for any other NJ state tax? (list them, or \"No other eligibility\")", "text", { required: true, defaultValue: "No other eligibility", help: "Alcoholic Beverage, Atlantic City Luxury, Cape May County Tourism, Corporation Banking and Financial Business, Insurance Premiums, Landfill Closure, Public Utility Franchise, Sanitary Landfill, Solid Waste Services, Transfer Inheritance and Estate, Unemployment and Disability, Salem County.", ref: "Screen 9, Eligibility for any other NJ State Tax" }),
      ],
    },
    {
      title: "Contact and signature",
      ref: "Screens 10 and 11",
      items: [
        f("payroll.stateAnswers.contactTitle", "Contact's title", "select", { required: true, options: NJ_TITLES, ref: "Screen 10, Title" }),
        f("payroll.stateAnswers.eveningPhone", "Evening phone (optional)", "tel", { ref: "Screen 10, Evening Phone" }),
        f("payroll.signer.name", "Authorized representative (typed as the signature)", "text", { required: true, ref: "Screen 11, Name of Authorized Representative" }),
        f("payroll.signer.title", "Their title", "select", { required: true, options: NJ_TITLES, ref: "Screen 11" }),
        f("payroll.stateAnswers.gov2goNotifications", "Sign up for free Gov2Go text/email reminders for NJ tax returns", "checkbox", { help: "The site checks this by default; the filing company unchecks it unless you choose it here.", ref: "Screen 11, Gov2Go checkbox" }),
      ],
    },
    contactSection("Screen 10: Contact Information"),
  ],
  authorizations: [
    { id: "njreg-employment", ref: "Screen 11, employment attestation (STOP)", text: "I confirm the Yes/No employment answers above accurately reflect the business's employment activities, and I understand NJ payroll tax filings are required for any \"Yes\"." },
    { id: "njreg-tax", ref: "Screen 11, taxable activities attestation (STOP)", text: "I confirm the Yes/No answers above accurately reflect the business activities subject to New Jersey taxes." },
    { id: "njreg-perjury", ref: "Screen 11, perjury declaration and typed name (STOP)", text: "I am the authorized representative named above. I declare under penalty of perjury that the information is true, correct and complete, and I authorize the filing company to check the declaration box and type my name as the signature." },
  ],
  gaps: [
    "Only the business-entity registration option is covered; sole proprietorships and partnerships (option 2) and options 3 to 7 are not.",
    "The confirmation screen after Complete Registration is not mapped.",
    "Not walked, so the engine stops before typing anything: a seasonal business, an acquired predecessor, an S corporation or QSSS election, cigarette and tobacco sales.",
  ],
};


// ---------------------------------------------------------------- NY forms uploaded through E-Submission

const NY_LEVELS = lv([["routine", "Routine (no extra fee)"], ["24_hour", "24 hour (+$25)"], ["same_day", "Same day (+$75)"], ["2_hour", "2 hour (+$150)"]]);

function deliverySection(): Section {
  return {
    title: "Handling and copies",
    ref: "Screen L3: Filing Information, Additional Services",
    items: [
      f("paperUpload.levelOfService", "How fast the state handles it", "radio", { required: true, defaultValue: "routine", options: NY_LEVELS, ref: "Screen L3, Level Of Service" }),
      f("paperUpload.plainCopy", "Plain copy of the filed document (+$5)", "checkbox", { ref: "Screen L3, Plain Copy" }),
      f("paperUpload.certifiedCopy", "Certified copy of the filed document (+$10)", "checkbox", { ref: "Screen L3, Certified Copy" }),
    ],
  };
}

function filerSection(base: string): Section {
  return {
    title: "Filer",
    help: "Printed at the end of the form: who the state mails the filing receipt to.",
    items: [
      f(`${base}.filer.name`, "Filer's name", "text", { required: true, ref: "Filer box" }),
      f(`${base}.filer.company`, "Company (if any)", "text", { ref: "Filer box" }),
      ...address(`${base}.filer.address`, "Mailing address", { required: true, ref: "Filer box" }),
    ],
  };
}

const esubSign: Authorization = {
  id: "ny-esub-signature",
  ref: "Form signature line (STOP)",
  text: "I am the signer named above. I authorize the filing company to place my saved signature on this New York form, only once this filing is approved, and I confirm what the form states is true.",
};
const esubPay: Authorization = {
  id: "ny-esub-payment",
  ref: "Screen L4: Payment Authorization (STOP)",
  text: "I authorize the filing company to submit this form to the NY Department of State and pay the fees shown on the approval page.",
};

const AU = "paperUpload.applicationForAuthority";

const nyAuthority: FilingKind = {
  id: "ny-authority",
  title: "New York Application for Authority (foreign corporation)",
  summary: "Registers a corporation formed in another state to do business in New York (form DOS-1335-f, BCL §1304), uploaded through E-Submission.",
  type: "paper_upload",
  state: "NY",
  constants: { paperUpload: { form: "ny_application_for_authority" } },
  map: NY_DOS,
  feeNote: "State filing fee $225. Faster handling and copies cost extra.",
  sections: [
    {
      title: "The corporation",
      ref: "DOS-1335-f, paragraphs FIRST to FOURTH",
      items: [
        f(`${AU}.corporateName`, "Corporation's exact name", "text", { required: true, help: "As on its formation documents in its home state.", ref: "DOS-1335-f FIRST" }),
        f(`${AU}.nameAddition`, "Word added for use in New York (if needed)", "text", { help: "Only if the name lacks Corporation, Incorporated, Limited or an abbreviation, e.g. \"Inc.\"", ref: "DOS-1335-f FIRST (added word)" }),
        f(`${AU}.fictitiousName`, "Fictitious name for use in New York (if the real name isn't available)", "text", { ref: "DOS-1335-f FIRST (fictitious name)" }),
        f(`${AU}.jurisdiction`, "State or country where it was formed", "text", { required: true, ref: "DOS-1335-f SECOND" }),
        f(`${AU}.incorporationDate`, "Date it was formed", "date", { required: true, ref: "DOS-1335-f SECOND" }),
        f(`${AU}.county`, "County where its New York office will be", "select", { required: true, options: opts(...NY_COUNTIES), ref: "DOS-1335-f THIRD" }),
      ],
    },
    {
      title: "Service of process",
      help: "The Secretary of State is the corporation's agent for service of process and mails any process it receives to this name and address.",
      ref: "DOS-1335-f FIFTH",
      items: [
        f(`${AU}.processRecipient.name`, "Name process is mailed to", "text", { required: true, ref: "DOS-1335-f FIFTH" }),
        ...address(`${AU}.processRecipient.address`, "Address", { required: true, ref: "DOS-1335-f FIFTH" }),
      ],
    },
    {
      title: "Business already done in New York",
      ref: "DOS-1335-f SIXTH",
      items: [
        f(`${AU}.priorActivity`, "Has the corporation done business in New York before this application?", "radio", { required: true, options: lv([["none_in_new_york", "No, it hasn't done business in New York yet"], ["tax_consent_attached", "Yes, and the NYS Tax Commission's consent is attached"]]), ref: "DOS-1335-f SIXTH" }),
        { kind: "note", text: "The state also needs a Certificate of Existence (good standing) from the home state, dated within the last 6 months. Send it to the filing company; it is uploaded with the form.", },
      ],
    },
    {
      title: "Signature",
      ref: "DOS-1335-f signature block",
      items: [
        f(`${AU}.signer.name`, "Signer's name", "text", { required: true, help: "An officer or director of the corporation.", ref: "DOS-1335-f Name of Signer" }),
        f(`${AU}.signer.title`, "Signer's title", "text", { required: true, ref: "DOS-1335-f Title of Signer" }),
        f("paperUpload.signatureId", "Signature", "signature", { required: true, signerPath: `${AU}.signer.name`, ref: "DOS-1335-f (Signature)" }),
      ],
    },
    filerSection(AU),
    deliverySection(),
    contactSection("Screen L3: Email Address"),
  ],
  authorizations: [esubSign, esubPay],
  gaps: [
    "The Certificate of Existence from the home state is not collected here yet; the engine uploads only the form.",
    "E-Submission's route for this form and its payment page are mapped from a recording; the engine runs it as a dry run only.",
  ],
};

const AN = "paperUpload.assumedName";

const nyAssumedName: FilingKind = {
  id: "ny-assumed-name",
  title: "New York Certificate of Assumed Name (DBA)",
  summary: "Registers a name the business trades under other than its real name (form DOS-1338-f, GBL §130), uploaded through E-Submission.",
  type: "paper_upload",
  state: "NY",
  constants: { paperUpload: { form: "ny_assumed_name" } },
  map: NY_DOS,
  feeNote: "$25 for an LLC or LP. A corporation pays $25 plus $100 for each New York City county and $25 for each other county.",
  sections: [
    {
      title: "The business",
      ref: "DOS-1338-f paragraphs 1 and 2",
      items: [
        f(`${AN}.realName`, "Real name of the business", "text", { required: true, ref: "DOS-1338-f 1" }),
        f(`${AN}.dosId`, "NY DOS ID (if known)", "text", { help: "On the state's entity search; it lets the filing find the business exactly.", maxLength: 10, ref: "Screen L2: Entity Selection, DOS ID" }),
        f(`${AN}.foreignFictitiousName`, "Fictitious name it uses in New York (out-of-state businesses only)", "text", { ref: "DOS-1338-f 1a" }),
        f(`${AN}.formedUnder`, "Formed under", "select", { required: true, options: lv([["limited_liability_company", "Limited Liability Company Law"], ["business_corporation", "Business Corporation Law"], ["not_for_profit_corporation", "Not-for-Profit Corporation Law"], ["revised_limited_partnership", "Revised Limited Partnership Act"], ["religious_corporations", "Religious Corporations Law"], ["education", "Education Law"], ["other", "Another law"]]), ref: "DOS-1338-f 2" }),
        f(`${AN}.otherLaw`, "Which law", "text", { required: true, showIf: { path: `${AN}.formedUnder`, equals: "other" }, ref: "DOS-1338-f 2, Other" }),
      ],
    },
    {
      title: "Assumed name",
      ref: "DOS-1338-f 3",
      items: [f(`${AN}.assumedName`, "The assumed name", "text", { required: true, ref: "DOS-1338-f 3" })],
    },
    {
      title: "Principal place of business",
      ref: "DOS-1338-f 4",
      items: [
        f(`${AN}.noNyPrincipalPlace`, "It has no principal place of business in New York", "checkbox", { help: "Then give its address outside New York below.", ref: "DOS-1338-f 4, check box" }),
        ...address(`${AN}.principalPlace`, "Address", { required: true, noPoBox: true, ref: "DOS-1338-f 4" }),
      ],
    },
    {
      title: "Counties",
      ref: "DOS-1338-f 5",
      items: [
        f("intake.portal.nyAllCounties", "Where it will do business under this name", "radio", { required: true, defaultValue: "some", options: lv([["all", "Every county in New York"], ["some", "Only certain counties"]]), help: "For a corporation each county adds a fee: $100 in New York City, $25 elsewhere.", ref: "DOS-1338-f 5, all counties" }),
        { kind: "group", path: `${AN}.counties`, label: "Counties", itemLabel: "County", min: 1, max: 62, showIf: { path: "intake.portal.nyAllCounties", equals: "some" }, ref: "DOS-1338-f 5",
          fields: [f("", "County", "select", { required: true, options: opts(...NY_COUNTIES), ref: "DOS-1338-f 5" })] },
      ],
    },
    {
      title: "Places of business in New York",
      ref: "DOS-1338-f 6",
      items: [
        f(`${AN}.noNyLocation`, "It has no place of business in New York", "checkbox", { ref: "DOS-1338-f 6, if none" }),
        { kind: "group", path: `${AN}.locations`, label: "Each place it does business under this name", itemLabel: "Location", min: 0, max: 10, help: "Street address of each location in New York (up to 10).", ref: "DOS-1338-f 6",
          fields: [
            f("street1", "Street address", "text", { required: true, ref: "DOS-1338-f 6" }),
            f("street2", "Suite, unit or floor", "text", { ref: "DOS-1338-f 6" }),
            f("city", "City", "text", { required: true, ref: "DOS-1338-f 6" }),
            f("state", "State", "usState", { required: true, defaultValue: "NY", ref: "DOS-1338-f 6" }),
            f("zip", "ZIP code", "zip", { required: true, ref: "DOS-1338-f 6" }),
          ] },
      ],
    },
    {
      title: "Signature",
      ref: "DOS-1338-f signature block",
      items: [
        f(`${AN}.signer.name`, "Signer's name", "text", { required: true, ref: "DOS-1338-f Name of Signer" }),
        f(`${AN}.signer.capacity`, "Signing as", "radio", { required: true, options: lv([["authorized_person", "Authorized person"], ["officer", "Officer of the corporation"], ["general_partner", "General partner of the limited partnership"], ["member", "Member of the LLC"], ["manager", "Manager of the LLC"]]), ref: "DOS-1338-f Capacity of Signer" }),
        f("paperUpload.signatureId", "Signature", "signature", { required: true, signerPath: `${AN}.signer.name`, ref: "DOS-1338-f Signature" }),
      ],
    },
    filerSection(AN),
    deliverySection(),
    contactSection("Screen L3: Email Address"),
  ],
  authorizations: [esubSign, esubPay],
  gaps: [
    "E-Submission's entity search results and payment page are mapped from a recording; the engine runs it as a dry run only.",
    "Some counties also require the certificate to be published or filed with the county clerk; that is not handled.",
  ],
};

// ---------------------------------------------------------------- NY filings about an existing entity (DOS online, Screens G to K)

/** The DOS ID and exact name: dissolution, amendment and change search on both and need an exact match. */
function nyEntitySection(base: string, ref: string, nameRequired = true): Section {
  return {
    title: "The entity",
    ref,
    items: [
      f(`${base}.dosId`, "NY DOS ID", "text", { required: true, maxLength: 10, help: "On the Department of State's entity search.", ref: `${ref}, DOS ID` }),
      f(`${base}.name`, nameRequired ? "Name, exactly as on the state's records" : "Name, as on the state's records (optional)", "text", { required: nameRequired, help: nameRequired ? "The state searches for this name and the DOS ID together; both must match exactly." : "Checked against the record the DOS ID finds.", ref: `${ref}, Entity Name` }),
    ],
  };
}

/** Attestation and Signature: the typed name and Capacity of Signer (Screens G2, H3, I3). */
function nySignerSection(base: string, ref: string): Section {
  return {
    title: "Signer",
    ref,
    items: [
      f(`${base}.signer.name`, "Signer's full name", "text", { required: true, minWords: 2, help: "Typed on the form as the signature.", ref: `${ref}, Signature` }),
      f(`${base}.signer.capacity`, "Signing as", "radio", { required: true, options: lv([["member", "Member"], ["manager", "Manager"], ["authorized_person", "Authorized person"]]), ref: `${ref}, Capacity of Signer` }),
    ],
  };
}

const nyRecordSignature = (id: string, ref: string, doc: string): Authorization => ({
  id, ref,
  text: `The signer named above authorizes the filing company to check the certification box and type their name as their signature on ${doc}: that they have read the statements, are authorized to sign, and that the statements are true and correct to the best of their knowledge and belief.`,
});
const nyRecordPayment = (id: string, ref: string, what: string, refund = false): Authorization => ({
  id, ref,
  text: `I authorize the filing company to authorize the ${what} shown on the approval page to be charged to the Department of State draw-down account this filing is paid from.${refund ? " The Department of State does not refund fees." : ""}`,
});
const NY_RECORD_GAPS = [
  "The page after Submit (the filing receipt) is not mapped, so the filing runs as a dry run.",
  "No copy is ordered: where the flow offers a plain copy was not visible in the walkthrough, only its $5 fee line. If the state adds one, the filing stops before payment.",
];

const nyDissolution: FilingKind = {
  id: "ny-llc-dissolution",
  title: "New York LLC dissolution",
  summary: "Articles of Dissolution for a domestic LLC (Certificate of Dissolution-Cancellation, LLC Law §705), filed online with the NY Department of State.",
  type: "dissolution",
  state: "NY",
  constants: {},
  map: NY_DOS,
  feeNote: "State filing fee $60.",
  sections: [
    nyEntitySection("dissolution.entity", "Screen G1: DOS ID and Entity Name Search"),
    {
      title: "Reason for dissolution",
      ref: "Screen G2: Reason for Dissolution",
      items: [
        f("dissolution.reason", "The LLC is dissolving because of", "radio", { required: true, options: lv([
          ["member_vote", "The vote or written consent of a majority in interest of the members"],
          ["no_members", "There are no members of the limited liability company"],
          ["dissolution_date", "The dissolution date set forth in the articles of organization or operating agreement"],
          ["judicial_decree", "The entry of a decree of judicial dissolution"],
        ]), ref: "Screen G2, Reason for Dissolution" }),
      ],
    },
    nySignerSection("dissolution", "Screen G2: Attestation and Signature"),
    contactSection("engine contact (DOS sends receipts to the service company's distribution email)"),
  ],
  authorizations: [
    nyRecordSignature("ny-dissolution-signature", "Screen G2, Attestation and Signature (STOP)", "these articles of dissolution"),
    nyRecordPayment("ny-dissolution-payment", "Screen G4, Payment Authorization (STOP)", "total fee", true),
  ],
  gaps: NY_RECORD_GAPS,
};

const nyNameChange: FilingKind = {
  id: "ny-llc-name-change",
  title: "New York LLC name change",
  summary: "Certificate of Amendment (name change only) for a domestic LLC (LLC Law §211), filed online with the NY Department of State.",
  type: "amendment",
  state: "NY",
  constants: { amendment: { kind: "name_change" } },
  map: NY_DOS,
  feeNote: "State filing fee $60.",
  sections: [
    nyEntitySection("amendment.entity", "Screen H1: DOS ID and Entity Name Search"),
    {
      title: "New name",
      ref: "Screen H2: Proposed Entity Name",
      items: [
        f("amendment.newName.baseName", "New name, without the ending", "text", { required: true, help: "The state checks it is available before the form opens. Words like bank, insurance or school need state consent.", ref: "Screen H2, Entity Name (Check Name)" }),
        f("amendment.newName.designator", "Ending", "select", { required: true, options: opts("LLC", "L.L.C.", "Limited Liability Company"), defaultValue: "LLC", ref: "Screen H2, Entity Name" }),
      ],
    },
    nySignerSection("amendment", "Screen H3: Attestation and Signature"),
    contactSection("engine contact (DOS sends receipts to the service company's distribution email)"),
  ],
  authorizations: [
    nyRecordSignature("ny-amendment-signature", "Screen H3, Attestation and Signature (STOP)", "this certificate of amendment"),
    nyRecordPayment("ny-amendment-payment", "Screen H5, Payment Authorization (STOP)", "total fee"),
  ],
  gaps: [...NY_RECORD_GAPS, "Only a domestic LLC's flow was walked; a corporation's name change isn't offered yet."],
};

const CH = "certificateOfChange";
const changeShown = (k: string): Cond => ({ path: `intake.portal.${k}`, equals: "on" });

const nyChange: FilingKind = {
  id: "ny-llc-change",
  title: "New York LLC certificate of change",
  summary: "Certificate of Change by the entity for a domestic LLC (LLC Law §211-A): county, service of process address or email, registered agent's name or address. Filed online with the NY Department of State.",
  type: "certificate_of_change",
  state: "NY",
  constants: {},
  map: NY_DOS,
  feeNote: "State filing fee $30.",
  sections: [
    nyEntitySection(`${CH}.entity`, "Screen I1: DOS ID and Entity Name Search"),
    {
      title: "What changes",
      ref: "Screen I2: Change Selection",
      help: "Check each change. The state greys out the registered agent changes when no agent is on file.",
      items: [
        f("intake.portal.nyChangeCounty", "The county where the LLC's office is", "checkbox", { ref: "Screen I2, Entity County Location (Edit)" }),
        f(`${CH}.county`, "New county", "select", { required: true, options: opts(...NY_COUNTIES), showIf: changeShown("nyChangeCounty"), ref: "Screen I3, County Change" }),
        f("intake.portal.nyChangeSop", "Who receives legal papers (service of process) and where", "checkbox", { ref: "Screen I2, Service of Process Recipient and Mailing Address (Edit)" }),
        f(`${CH}.serviceOfProcess.name`, "Name", "text", { required: true, showIf: changeShown("nyChangeSop"), ref: "Screen I3, Service of Process Name and Address Change" }),
        ...address(`${CH}.serviceOfProcess.address`, "Mailing address", { required: true, state: "NY", ref: "Screen I3, Service of Process Name and Address Change", showIf: changeShown("nyChangeSop") }),
        f("intake.portal.nyChangeSopEmail", "The email for service-of-process notices", "checkbox", { ref: "Screen I2, Service of Process Email Address (Add/Edit)" }),
        f(`${CH}.serviceOfProcessEmail`, "New email address", "email", { required: true, showIf: changeShown("nyChangeSopEmail"), ref: "Screen I3, Service of Process Email Address Change" }),
        f("intake.portal.nyChangeAgentName", "The registered agent's name", "checkbox", { ref: "Screen I2, Name of Registered Agent (Edit)" }),
        f(`${CH}.registeredAgentName`, "New registered agent name", "text", { required: true, showIf: changeShown("nyChangeAgentName"), ref: "Screen I3, Change Registered Agent Name" }),
        f("intake.portal.nyChangeAgentAddress", "The registered agent's address", "checkbox", { ref: "Screen I2, Registered Agent Address (Edit)" }),
        ...address(`${CH}.registeredAgentAddress`, "New agent address", { required: true, state: "NY", ref: "Screen I3, Change Registered Agent Address (State is NY)", showIf: changeShown("nyChangeAgentAddress") }),
      ],
    },
    nySignerSection(CH, "Screen I3: Attestation and Signature"),
    contactSection("engine contact (DOS sends receipts to the service company's distribution email)"),
  ],
  authorizations: [
    nyRecordSignature("ny-change-signature", "Screen I3, Attestation and Signature (STOP)", "this certificate of change"),
    nyRecordPayment("ny-change-payment", "Screen I5, Payment Authorization (STOP)", "total fee"),
  ],
  gaps: [...NY_RECORD_GAPS, "Designating a first registered agent and revoking one are on the state's list but their sections weren't in the walkthrough, so they aren't offered."],
};

const nyCopies: FilingKind = {
  id: "ny-copies",
  title: "New York copies of filed documents",
  summary: "Plain copies of documents on an entity's filing history, ordered online from the NY Department of State.",
  type: "copy_request",
  state: "NY",
  constants: {},
  map: NY_DOS,
  feeNote: "$5 per document (plain copy).",
  sections: [
    nyEntitySection("copyRequest.entity", "Screen J1: Search Entity", false),
    {
      title: "Documents",
      ref: "Screen J2: Entity Filing History",
      items: [
        {
          kind: "group", path: "copyRequest.documents", label: "Documents to copy", itemLabel: "Document", min: 1, max: 25, ref: "Screen J2, Select",
          help: "Each by its filing number, or by its description (with the filing date when several share it), as the state's filing history lists them.",
          fields: [
            f("filingNumber", "Filing number", "text", { ref: "Screen J2, Filing Number" }),
            f("description", "Or: description (e.g. Articles of Organization)", "text", { ref: "Screen J2, Description" }),
            f("filingDate", "Filing date (optional)", "date", { ref: "Screen J2, Filing Date" }),
          ],
        },
      ],
    },
    contactSection("engine contact (DOS sends the copies to the service company's distribution email)"),
  ],
  authorizations: [nyRecordPayment("ny-copies-payment", "Screen J4, Payment Authorization (STOP)", "copy fees")],
  gaps: [
    "Certified copies aren't offered: where the copy type is chosen wasn't visible in the walkthrough.",
    "If the state's search lists several entities to pick from, how one is picked isn't mapped; the filing stops there.",
    "The page after Submit is not mapped, so the request runs as a dry run.",
  ],
};

const nyStatus: FilingKind = {
  id: "ny-status",
  title: "New York certificate of status",
  summary: "Certificate of Status (short form, or long form with every document filed), ordered online from the NY Department of State.",
  type: "standing_certificate",
  state: "NY",
  constants: {},
  map: NY_DOS,
  feeNote: "$25 for either form.",
  sections: [
    {
      title: "The entity",
      ref: "Screen K: Search Entity",
      items: [
        f("standing.dosId", "NY DOS ID", "text", { required: true, maxLength: 10, help: "On the Department of State's entity search.", ref: "Screen K, DOS ID" }),
        f("standing.entityName", "Name, as on the state's records", "text", { required: true, ref: "Screen K, Entity Name" }),
        { kind: "note", text: "An entity dissolved before January 1, 1985 needs a written request to the Department of State instead." },
      ],
    },
    {
      title: "Certificate",
      ref: "Screen K: Select Certificate of Status",
      items: [
        f("standing.form", "Which certificate", "radio", { required: true, defaultValue: "short", options: lv([["short", "Short form: the current status"], ["long_filing_history", "Long form: the current status and a list of every document filed"]]), ref: "Screen K, Short Form / Long Form" }),
      ],
    },
    contactSection("engine contact (DOS sends the certificate to the service company's distribution email)"),
  ],
  authorizations: [nyRecordPayment("ny-status-payment", "Screen K, Payment Authorization (STOP)", "fee")],
  gaps: [
    "If the state's search lists several entities to pick from, how one is picked isn't mapped; the filing stops there.",
    "The page after Submit is not mapped, so the request runs as a dry run.",
  ],
};

export const FILING_KINDS: FilingKind[] = [nyLlc, nyCorp, njLlc, njCorp, flLlc, flCorp, flLp, irsEin, nyNys100, njReg, nyAuthority, nyAssumedName, nyDissolution, nyNameChange, nyChange, nyCopies, nyStatus];

export function filingKind(id: string): FilingKind | undefined {
  return FILING_KINDS.find((k) => k.id === id);
}
