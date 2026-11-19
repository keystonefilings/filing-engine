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
  /** FL formation entity type (Sunbiz): LLC (default), profit corporation, or limited partnership. */
  floridaEntityType: z.enum(["llc", "profit_corporation", "limited_partnership"]).default("llc"),
  /** FL profit corporation: number of authorized shares (required). */
  stockShares: z.number().int().positive().optional(),
  /** FL profit corporation incorporator (name + address); its name is the incorporator signature. */
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

export const FilingRequest = z.object({
  tenantId: z.string().min(1),
  clientCompanyId: z.string().min(1),
  idempotencyKey: z.string().min(8),
  type: FilingType,
  state: FilingState,
  formation: FormationDetails.optional(),
  standing: StandingCertificateDetails.optional(),
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

/** Paths in the payload that are sensitive and must be masked when shown or logged. */
export const SENSITIVE_PATHS = ["ein.responsibleParty.ssn"];
