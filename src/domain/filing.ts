import { z } from "zod";

/**
 * Canonical filing request. This is what callers send, what the client approves,
 * and what every adapter renders into its own site's form. Site-specific
 * differences (NJ wants the designator separately, NY wants it in the name) are
 * handled by renderers, never by the caller.
 */

export const UsState = z.string().regex(/^[A-Z]{2}$/, "two-letter state code");
export const FilingState = z.enum(["NY", "NJ", "MO", "FL"]);
export type FilingState = z.infer<typeof FilingState>;

export const Site = z.enum(["NY", "NJ", "MO", "FL", "IRS"]);
export type Site = z.infer<typeof Site>;

export const Address = z.object({
  street1: z.string().min(1),
  street2: z.string().optional(),
  city: z.string().min(1),
  state: UsState,
  zip: z.string().regex(/^\d{5}(-\d{4})?$/, "zip must be 5 or 9 digits"),
});
export type Address = z.infer<typeof Address>;

export const Person = z.object({
  name: z.string().min(1),
  address: Address.optional(),
  title: z.string().optional(),
  /** NJ registered agent notification email (optional on the NJ agent screen). */
  email: z.string().email().optional(),
});
export type Person = z.infer<typeof Person>;

/** Base name + designator. Rendered per site by domain/name.ts. */
export const EntityName = z.object({
  baseName: z.string().min(1),
  designator: z.string().min(1).default("LLC"),
  englishTranslation: z.string().optional(),
});
export type EntityName = z.infer<typeof EntityName>;

export const EinMode = z.enum(["in_run", "after_acceptance", "none"]);
export type EinMode = z.infer<typeof EinMode>;

/** Responsible-party data is sensitive. It is held per run and purged after completion. */
export const ResponsibleParty = z.object({
  name: z.string().min(1),
  ssn: z
    .string()
    .regex(/^\d{3}-?\d{2}-?\d{4}$/, "SSN/ITIN must be 9 digits")
    .describe("sensitive"),
  title: z.string().min(1),
  address: Address,
  phone: z.string().min(7),
});

/** IRS EIN interview answers, from the live owner-route walk (docs/walks/ny-irs-2026-11-18.md). */
export const EinRequest = z.object({
  mode: EinMode,
  /** Who submits the interview: an owner/member, or Keystone as the authorized third-party designee. */
  applicantRole: z.enum(["owner", "third_party_designee"]).default("third_party_designee"),
  responsibleParty: ResponsibleParty.optional(),
  memberCount: z.number().int().positive().optional(),
  reason: z.enum(["new_business", "hired_employees", "banking", "changed_organization", "purchased_business"]).default("new_business"),
  /** Physical business location (Addresses stage); distinct from the formation state. */
  physicalState: UsState.optional(),
  /** State where the Articles are filed (Additional Details stage). */
  formationState: UsState.optional(),
  county: z.string().optional(),
  tradeName: z.string().optional(),
  /** Start date; the UI collects month + year. */
  startDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional(),
  closingMonth: z.number().int().min(1).max(12).default(12),
  /** Four regulated-activity Yes/No answers (all required in the interview). */
  regulated: z.object({
    highwayVehicle: z.boolean(),
    wagering: z.boolean(),
    form720: z.boolean(),
    alcoholTobaccoFirearms: z.boolean(),
  }).optional(),
  /** W-2 employees expected in the next 12 months, and the branch it opens. */
  employees: z.object({
    expected: z.boolean(),
    firstWages: z.string().regex(/^\d{4}-\d{2}$/).optional(),
    agriculturalCount: z.number().int().nonnegative().optional(),
    otherCount: z.number().int().nonnegative().optional(),
    lowAnnualLiability: z.boolean().optional(),
  }).optional(),
  /** Principal business activity: one of the 15 categories, plus a detail/description. */
  businessActivity: z.object({ category: z.string().min(1), detail: z.string().optional() }).optional(),
  /** Separate mailing address (P.O. box / international allowed). */
  mailingAddress: Address.optional(),
  /** CP 575 delivery: digital this session (rule 2) or by mail. */
  noticeDelivery: z.enum(["digital", "mail"]).default("digital"),
  /** Signed Form SS-4 third-party designee authorization, stored as an artifact id. */
  ss4AuthorizationArtifactId: z.string().optional(),
});

export const ApprovalRecipient = z.object({
  channel: z.enum(["email", "webhook", "slack", "whatsapp", "sms"]),
  address: z.string().min(3),
  name: z.string().optional(),
});

export const FilingType = z.enum([
  "formation",
  "ein_only",
  "standing_certificate",
  "alternate_name",
  "amendment",
  "paper_upload",
  "payroll_registration",
]);
export type FilingType = z.infer<typeof FilingType>;

export const FormationDetails = z.object({
  entityType: z.literal("LLC").default("LLC"),
  name: EntityName,
  purpose: z.string().optional(),
  county: z.string().optional(), // NY required, NJ unused
  managementStructure: z.enum(["member_managed", "manager_managed"]).optional(), // NY
  effectiveDate: z.enum(["upon_filing", "specific"]).default("upon_filing"),
  effectiveDateValue: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional(),
  dissolutionDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional(),
  /** Optional in NJ (walk 2026-11-17: Continue accepts it empty); needed for an EIN application. */
  mainBusinessAddress: Address.optional(),
  /** NJ Business Data screen, optional. */
  naicsCode: z.string().regex(/^\d{2,6}$/).optional(),
  duration: z.string().max(12).optional(),
  serviceOfProcess: z
    .object({
      mode: z.enum(["manual", "service_company"]),
      person: Person.optional(),
      serviceCompany: z.string().optional(),
      noticeEmail: z.string().email().optional(),
    })
    .optional(), // NY
  registeredAgent: Person.optional(),
  /** Per-filing registered-agent choice: none, the client's own agent (registeredAgent above),
   *  or the filing company provides it (self or third-party, decided by tenant provisioning). */
  registeredAgentChoice: z.enum(["none", "client_provided", "filing_company"]).optional(),
  members: z.array(Person).max(10).default([]),
  signers: z.array(Person).max(10).default([]),
  organizer: Person.optional(), // NY
  filer: Person.optional(), // NY
  otherProvisions: z.array(z.string()).max(10).default([]), // NJ
  /** MO online LLC organizers (1-5; 6+ needs a paper filing). */
  organizers: z.array(Person).max(5).default([]),
  /** MO: signer of the online filing ("signor"); falls back to signers[0]. */
  moSigner: Person.optional(),
  /** MO: Series LLC (uploads LLC 1A). Not mapped for online upload yet; refused if true. */
  seriesLlc: z.boolean().optional(),
  /** FL authorized persons to manage the LLC (optional, up to 6): title code + name/entity + address. */
  authorizedPersons: z.array(z.object({
    title: z.enum(["MGR", "AMBR", "AP", "AR"]).default("MGR"),
    name: z.string().optional(),
    entityName: z.string().optional(),
    address: Address.optional(),
  })).max(6).default([]),
  /** NY formation on the DOS On-Line Filing System: LLC Articles of Organization (default) or a
   *  business corporation's Certificate of Incorporation (BCL s.402). */
  nyEntityType: z.enum(["llc", "business_corporation"]).default("llc"),
  /** NY business corporation: par value per share in USD; omit for shares without par value. */
  stockParValueUsd: z.number().positive().optional(),
  /** FL formation entity type (Sunbiz): LLC (default), profit corporation, or limited partnership. */
  floridaEntityType: z.enum(["llc", "profit_corporation", "limited_partnership"]).default("llc"),
  /** FL profit corporation and NY business corporation: number of authorized shares (required). */
  stockShares: z.number().int().positive().optional(),
  /** FL profit corporation / NY business corporation incorporator (name + address); its name is the
   *  incorporator's typed signature (NY: the two must be the same). */
  incorporator: Person.optional(),
  /** FL limited partnership general partners (at least one, each signs). */
  generalPartners: z.array(z.object({
    name: z.string().optional(),
    entityName: z.string().optional(),
    documentNumber: z.string().optional(),
    address: Address.optional(),
    signature: z.string().min(1),
  })).max(6).default([]),
  /** FL limited partnership: elect limited liability limited partnership (LLLP) status. */
  isLLLP: z.boolean().optional(),
  additionalCertificates: z
    .object({
      certificateOfStanding: z.boolean().default(false),
      certifiedCopy: z.boolean().default(false),
      /** NY: a plain copy of the filed document ($5). */
      plainCopy: z.boolean().default(false),
    })
    .prefault({}),
});

/** NJ Business Records Service standing certificate (walk 2026-11-17). One certificate per filing. */
/** NJ entity type codes as the Business Records results grid shows them. */
export const NjEntityType = z.enum(["DP", "PA", "LLC", "LP", "LLP", "NP", "NV", "FR", "FLC", "LF", "FLP", "NF"]);

export const StandingCertificateDetails = z.object({
  /** Exact business name as on the state record (search is by name; the row must match exactly). */
  entityName: z.string().min(1),
  /** NJ Entity ID; required when several records share the name, checked against the result row. */
  entityId: z.string().regex(/^\d{10}$/).optional(),
  form: z.enum(["short", "long_filing_history", "long_officers"]).default("short"),
  /** NJ only: decides the price (LLC/FLC $50, corporations/LP $25); checked against the record's Type column. MO good standing is a flat $10. */
  entityType: NjEntityType.optional(),
});

export const Contact = z.object({
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  phone: z.string().min(7),
  email: z.string().email(),
});

/**
 * Payroll / employer registration (NY NYS-100, NJ NJ-REG). One registration covers
 * Unemployment Insurance + withholding + wage reporting. No filing fee in either state.
 * Field maps: docs/walks/nys-100-payroll-2026-11-19.md, docs/walks/nj-reg-payroll-2026-11-19.md.
 * SSNs on the owners/officers are sensitive (masked, never stored as reusable defaults).
 */
export const PayrollOwner = z.object({
  name: z.string().min(1),
  ssn: z.string().regex(/^\d{3}-?\d{2}-?\d{4}$/, "SSN must be 9 digits").describe("sensitive").optional(),
  title: z.string().min(1),
  address: Address.optional(),
  percentOwnership: z.number().min(0).max(100).optional(),
  /** NYS-100 member screen: date of birth, US residency (SSN required when resident), contact, profit share. */
  dateOfBirth: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional(),
  usResident: z.boolean().optional(),
  phone: z.string().min(7).optional(),
  email: z.string().email().optional(),
  profitDistributionPercent: z.number().min(0).max(100).optional(),
});

export const PayrollRegistrationDetails = z.object({
  reason: z.enum(["new_business", "additional_location", "amended", "moved", "registration_certificate", "withholding_only"]).default("new_business"),
  legalName: z.string().min(1),
  tradeName: z.string().optional(),
  /** FEIN, or feinAppliedFor; NY requires the FEIN (attach CP 575), NJ allows the owner SSN instead. */
  fein: z.string().regex(/^\d{2}-?\d{7}$/, "FEIN must be 9 digits").optional(),
  feinAppliedFor: z.boolean().optional(),
  /** NY Part A1 employer type; NJ infers from ownership type. */
  employerType: z.enum(["business", "household"]).default("business"),
  /** State-specific ownership/legal-entity vocabulary, mapped to the site's options by the adapter. */
  ownershipType: z.string().optional(),
  businessAddress: Address,
  mailingAddress: Address.optional(),
  booksRecordsAddress: Address.optional(),
  entity: z.object({
    incorporationDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional(),
    stateOfIncorporation: UsState.optional(),
    fiscalMonth: z.number().int().min(1).max(12).optional(),
    /** NJ Entity ID / Business-Corp number — the online NJ-REG flow gates on this. */
    njBusinessNumber: z.string().optional(),
  }).optional(),
  owners: z.array(PayrollOwner).max(10).default([]),
  naics: z.string().regex(/^\d{2,6}$/).optional(),
  njBusinessCode: z.string().optional(),
  countyMunicipalityCode: z.string().optional(),
  county: z.string().optional(),
  businessActivity: z.string().optional(),
  /** Liability dates/flags. */
  beginDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional(),
  dateFirstOperations: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional(),
  dateFirstWithholding: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional(),
  payingWages: z.boolean().optional(),
  firstWageDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional(),
  registeringForUI: z.boolean().optional(),
  withholdingOnly: z.boolean().optional(),
  uiLiabilityQuarter: z.enum(["Q1", "Q2", "Q3", "Q4"]).optional(),
  uiLiabilityYear: z.number().int().optional(),
  coveredEmployees: z.number().int().nonnegative().optional(),
  workLocations: z.array(z.object({
    address: Address,
    employees: z.number().int().nonnegative().optional(),
    activity: z.string().optional(),
  })).max(20).default([]),
  /** Falls back to the request-level contact when absent. */
  contact: Contact.optional(),
  signer: Person.optional(),
  /** The long state-specific tail (NJ sales/tobacco/petroleum questions, NY branches): answered keys only. */
  stateAnswers: z.record(z.string(), z.unknown()).optional(),
});
export type PayrollRegistrationDetails = z.infer<typeof PayrollRegistrationDetails>;

/**
 * NY filings that go in as a completed PDF through E-Submission (docs/portal-maps/ny-dos-corporations.md,
 * Screen L). The engine fills the state's own form (assets/forms/ny/) from these fields and uploads it.
 */
export const NY_COUNTY_NAMES = [
  "Albany", "Allegany", "Bronx", "Broome", "Cattaraugus", "Cayuga", "Chautauqua", "Chemung", "Chenango", "Clinton",
  "Columbia", "Cortland", "Delaware", "Dutchess", "Erie", "Essex", "Franklin", "Fulton", "Genesee", "Greene", "Hamilton",
  "Herkimer", "Jefferson", "Kings", "Lewis", "Livingston", "Madison", "Monroe", "Montgomery", "Nassau", "New York",
  "Niagara", "Oneida", "Onondaga", "Ontario", "Orange", "Orleans", "Oswego", "Otsego", "Putnam", "Queens", "Rensselaer",
  "Richmond", "Rockland", "St. Lawrence", "Saratoga", "Schenectady", "Schoharie", "Schuyler", "Seneca", "Steuben",
  "Suffolk", "Sullivan", "Tioga", "Tompkins", "Ulster", "Warren", "Washington", "Wayne", "Westchester", "Wyoming", "Yates",
] as const;
export const NyCounty = z.enum(NY_COUNTY_NAMES);

/** Filer's name and mailing address, printed on the last page of each form. */
export const FormFiler = z.object({ name: z.string().min(1), company: z.string().optional(), address: Address });

/** DOS-1335-f: Application for Authority of a foreign business corporation (BCL s.1304). $225. */
export const NyApplicationForAuthority = z.object({
  corporateName: z.string().min(1),
  /** Word or abbreviation added for use in NY when the name lacks a corporate indicator (BCL s.301). */
  nameAddition: z.string().optional(),
  /** Only when the true name is not available in NY (BCL s.301/302). */
  fictitiousName: z.string().optional(),
  jurisdiction: z.string().min(1),
  incorporationDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  county: NyCounty,
  /** Where the Secretary of State mails process: a name and an address. */
  processRecipient: z.object({ name: z.string().min(1), address: Address }),
  /** SIXTH: no NY activity yet, or the NYS Tax Commission consent is attached. */
  priorActivity: z.enum(["none_in_new_york", "tax_consent_attached"]),
  signer: z.object({ name: z.string().min(1), title: z.string().min(1) }),
  filer: FormFiler,
});

export const AssumedNameLaw = z.enum(["business_corporation", "limited_liability_company", "religious_corporations", "education", "not_for_profit_corporation", "revised_limited_partnership", "other"]);

/** DOS-1338-f: Certificate of Assumed Name (GBL s.130). $25; corporations add a fee per county. */
export const NyAssumedName = z.object({
  /** DOS ID of the existing entity; E-Submission finds the record by it. */
  dosId: z.string().regex(/^\d{1,10}$/).optional(),
  realName: z.string().min(1),
  foreignFictitiousName: z.string().optional(),
  formedUnder: AssumedNameLaw,
  otherLaw: z.string().optional(),
  assumedName: z.string().min(1),
  /** Principal place of business in NY; or none in NY, with the out-of-state address. */
  principalPlace: Address,
  noNyPrincipalPlace: z.boolean().default(false),
  counties: z.union([z.literal("all"), z.array(NyCounty).min(1)]),
  /** Each NY place of business (10 fit on the form). */
  locations: z.array(Address).max(10).default([]),
  noNyLocation: z.boolean().default(false),
  signer: z.object({ name: z.string().min(1), capacity: z.enum(["authorized_person", "officer", "general_partner", "member", "manager"]) }),
  filer: FormFiler,
});

export const PaperUploadDetails = z.object({
  form: z.enum(["ny_application_for_authority", "ny_assumed_name"]),
  applicationForAuthority: NyApplicationForAuthority.optional(),
  assumedName: NyAssumedName.optional(),
  /** Saved signature (POST /v1/signatures) drawn onto the form. Applied only on a run of the approved
   *  filing, never on a dry run; it must belong to the filing's client company and the form's signer. */
  signatureId: z.string().optional(),
  levelOfService: z.enum(["routine", "24_hour", "same_day", "2_hour"]).default("routine"),
  plainCopy: z.boolean().optional(),
  certifiedCopy: z.boolean().optional(),
});
export type PaperUploadDetails = z.infer<typeof PaperUploadDetails>;

export const FilingRequest = z.object({
  tenantId: z.string().min(1),
  clientCompanyId: z.string().min(1),
  idempotencyKey: z.string().min(8),
  type: FilingType,
  state: FilingState,
  formation: FormationDetails.optional(),
  standing: StandingCertificateDetails.optional(),
  payroll: PayrollRegistrationDetails.optional(),
  paperUpload: PaperUploadDetails.optional(),
  ein: EinRequest.optional(),
  contact: Contact,
  /** The service company's intake answers for this entity (shape: settings/policies.ts FilingIntake). */
  intake: z.record(z.string(), z.unknown()).optional(),
  approvalRecipients: z.array(ApprovalRecipient).optional(),
  dryRun: z.boolean().optional(),
  /** Caller-side maximum charge the client approves (fee cap, decision 5). */
  feeCapUsd: z.number().nonnegative().optional(),
});
export type FilingRequest = z.infer<typeof FilingRequest>;

/** Paths in the payload that are sensitive and must be masked when shown or logged.
 *  `[]` is an array wildcard (every element). */
export const SENSITIVE_PATHS = ["ein.responsibleParty.ssn", "payroll.owners[].ssn"];
