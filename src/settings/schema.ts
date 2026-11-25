import { z } from "zod";
import { Address, ApprovalRecipient, Contact, EinMode, Person } from "../domain/filing.js";
import { FirmPolicyAnswers } from "./policies.js";
import { PaymentSettings } from "./payments.js";

/**
 * Tenant = a filing service company subscribing to the platform (Scope 1). Keystone is one
 * tenant. Each tenant brings its own state logins, registered agent service, people,
 * channels and customers; nothing is shared between tenants except the site adapters.
 */
export const TenantSettings = z.object({
  tenantId: z.string().min(1),
  name: z.string().min(1),
  /** The service company's own details, used wherever a customer's answer is "the service company". */
  organizer: Person.optional(),
  filer: Person.optional(),
  signer: Person.optional(),
  /** Legacy single registered agent; the per-state provisioning below supersedes it. */
  registeredAgent: Person.optional(),
  /**
   * Enterprise registered-agent provisioning. When a client asks the filing company to
   * provide the agent, this decides how:
   *  - selfByState: the filing company IS the agent, with a per-state name/address (case 2)
   *  - thirdParty: the filing company orders the agent from a provider, e.g. Registered
   *    Agents, Inc., which quotes pricing across states (case 3)
   *  - defaultProvisioning / perStateProvisioning: which of the two to use (per state).
   */
  registeredAgentProvisioning: z.object({
    defaultProvisioning: z.enum(["self", "third_party"]).optional(),
    selfByState: z.record(
      z.string().regex(/^[A-Z]{2}$/),
      z.object({ name: z.string().min(1), address: Address, email: z.string().email().optional() }),
    ).default({}),
    thirdParty: z.object({
      /** A label/id for this tenant's provider (e.g. "registered_agents_inc", "northwest"). */
      provider: z.string().min(1),
      /** Vault key for the provider's API credential (omit for a static/flat arrangement). */
      apiCredentialKey: z.string().optional(),
      /** Per-state pricing used for quotes before/without a live pricing call. */
      cachedPricing: z.record(z.string().regex(/^[A-Z]{2}$/), z.number().nonnegative()).optional(),
      /** (a) Static per-state agents: a flat arrangement with no live API. */
      agents: z.record(
        z.string().regex(/^[A-Z]{2}$/),
        z.object({ name: z.string().min(1), address: Address, email: z.string().email().optional() }),
      ).optional(),
      /** (b) A declaratively configured HTTP API adapter — any provider. */
      http: z.object({
        baseUrl: z.string().url(),
        authHeader: z.string().optional(),
        authPrefix: z.string().optional(),
        pricing: z.object({
          method: z.enum(["GET", "POST"]).optional(),
          path: z.string().min(1),
          body: z.string().optional(),
          amountPath: z.string().min(1),
          amountInCents: z.boolean().optional(),
        }).optional(),
        order: z.object({
          method: z.enum(["GET", "POST"]).optional(),
          path: z.string().min(1),
          body: z.string().optional(),
          agentNamePath: z.string().min(1),
          agentStreet1Path: z.string().min(1),
          agentStreet2Path: z.string().optional(),
          agentCityPath: z.string().min(1),
          agentStatePath: z.string().min(1),
          agentZipPath: z.string().min(1),
          refPath: z.string().min(1),
          amountPath: z.string().optional(),
          amountInCents: z.boolean().optional(),
        }).optional(),
      }).optional(),
    }).optional(),
    perStateProvisioning: z.record(z.string().regex(/^[A-Z]{2}$/), z.enum(["self", "third_party", "none"])).optional(),
  }).optional(),
  serviceOfProcess: Person.optional(),
  contact: Contact.optional(),
  noticeEmail: z.string().email().optional(),
  nyOpeningStatementWhenOrganizerIsEntity: z.boolean().default(false),
  webhookEndpoints: z
    .array(z.object({ url: z.string().url(), secret: z.string().min(16), events: z.array(z.string()).optional() }))
    .default([]),
  defaultApprovers: z.array(ApprovalRecipient).default([]),
  /** Vault key for the ny.gov service-company login (username/password/totp). Company-wide. */
  nyGovCredentialKey: z.string().default("NYGOV"),
  /** The service company's own Missouri SOS online-filing login (vault key, scoped to this tenant). */
  moAccountCredentialKey: z.string().optional(),
  /** Payment method chosen at the Missouri checkout: credit_card or echeck. */
  moPaymentMethod: z.enum(["credit_card", "echeck"]).default("credit_card"),
  /** Florida needs no login to file; the prepaid Sunbiz E-file account (vault key) pays at checkout. */
  flSunbizAccountCredentialKey: z.string().optional(),
  /** Florida checkout: credit_card, or the prepaid Sunbiz E-file account. */
  flPaymentMethod: z.enum(["credit_card", "sunbiz_account"]).default("credit_card"),
  /** The service company's own NJ login (vault key, scoped to this tenant). Default for its customers' NJ runs. */
  njAccountCredentialKey: z.string().optional(),
  /** Payment method stored on the company-wide NJ account (walk A confirms how it appears). */
  njStoredPaymentMethod: z.enum(["stored_card", "stored_echeck"]).optional(),
  /** The service company's NY drawdown account; a customer may use its own (answer G1). */
  nyDrawdownAccountRef: z.string().optional(),
  /** Defaults for the customer onboarding answers; a customer's own answer overrides unless locked. */
  customerPolicyDefaults: FirmPolicyAnswers.prefault({}),
  /** Questions the service company answers for all its customers (customers cannot change them). */
  lockedCustomerPolicies: z.array(z.string()).default([]),
  /**
   * Pre-flight completeness: verify a filing has every piece of info it needs before it runs.
   * strictOptional makes optional fields required unless marked not_needed; overrides force a
   * field required or skip it. A customer firm's own completeness (below) is overlaid on this.
   */
  completeness: z.object({
    strictOptional: z.boolean().default(false),
    overrides: z.record(z.string(), z.enum(["required", "not_needed"])).default({}),
  }).prefault({}),
  /**
   * Beta review-gate: the live forms have no save, so a real run must finish in one pass.
   * In beta the engine stops at the review screen, screenshots it, and sends it to an admin
   * to approve before submission. Off in production (the run goes straight through).
   */
  betaReviewGate: z.boolean().default(false),
  /** Name-unavailability flow: generate alternatives, admin picks an available one. */
  nameResolution: z.object({
    enabled: z.boolean().default(true),
    maxOptions: z.number().int().min(1).max(10).default(5),
    maxBatches: z.number().int().min(1).max(10).default(3),
    /** AI model id for the generator; unset uses the configured default (or the static generator). */
    model: z.string().optional(),
  }).prefault({}),
  /** Where admin-only beta prompts go (name options, review-gate): the filing company's staff, never the end client. */
  adminChannels: z.array(ApprovalRecipient).default([]),
  /** Branding on approval pages and messages. */
  branding: z.object({ displayName: z.string().optional(), logoUrl: z.string().url().optional(), supportEmail: z.string().email().optional() }).prefault({}),
  /**
   * Where approvals and status updates go. The engine emits signed webhooks today; delivery
   * through email, Slack, WhatsApp or SMS is configured here and sent by the channel module (not built yet).
   * Secrets for channels are vault keys, never stored in settings.
   */
  channels: z.object({
    email: z.object({ fromAddress: z.string().email(), providerKey: z.string() }).optional(),
    slack: z.object({ webhookKey: z.string(), channel: z.string().optional() }).optional(),
    whatsapp: z.object({ providerKey: z.string(), fromNumber: z.string() }).optional(),
    sms: z.object({ providerKey: z.string(), fromNumber: z.string() }).optional(),
  }).prefault({}),
  /** Saved cards (vault references) for state fees and the subscription, and which pays what (src/settings/payments.ts). */
  payments: PaymentSettings.optional(),
  /**
   * The subscriber's state portal logins, one per portal (portal ids in src/users/portals.ts): the vault key
   * holding it and when it was connected. The login itself lives only in the vault.
   */
  portalLogins: z.record(z.string(), z.object({ vaultKey: z.string().min(1), connectedAt: z.string(), connectedBy: z.string().optional() })).default({}),
  /** Defaults per portal and filing type that the subscriber picks in its dashboard (e.g. copies to order, expedite level). */
  portalDefaults: z.record(z.string(), z.record(z.string(), z.union([z.string(), z.number(), z.boolean()]))).default({}),
});
export type TenantSettings = z.infer<typeof TenantSettings>;

/**
 * Client company = a customer firm of the service company (CPA, title company, payroll
 * company). In Scope 2 these are Keystone's customers using Keystone's front end.
 */
export const ClientCompanySettings = z.object({
  clientCompanyId: z.string().min(1),
  tenantId: z.string().min(1),
  name: z.string().min(1),
  /** Default filing state for this client ("state selector", requirement 7). */
  defaultState: z.enum(["NY", "NJ", "MO", "FL"]).optional(),
  /** Decision 1: per-client-company EIN timing. */
  einMode: EinMode.default("in_run"),
  /** Decision 2: who may approve through the link; default is the named signer/organizer. */
  approvers: z.array(ApprovalRecipient).default([]),
  approvalTtlHours: z.number().int().positive().optional(),
  requireOneTimeCode: z.boolean().default(false),
  /** This firm's own NJ login (vault key, scoped to tenant + firm); used only when answer G1 is "own_account". */
  njAccountCredentialKey: z.string().optional(),
  /** This firm's own Missouri login; used only when answer G1 is "own_account". */
  moAccountCredentialKey: z.string().optional(),
  /** This firm's own Florida Sunbiz E-file account; used only when answer G1 is "own_account". */
  flSunbizAccountCredentialKey: z.string().optional(),
  njStoredPaymentMethod: z.enum(["stored_card", "stored_echeck"]).optional(),
  /** This firm's own NY drawdown account; used only when answer G1 is "own_account". */
  nyDrawdownAccountRef: z.string().optional(),
  registeredAgent: Person.optional(),
  /** This firm's default registered-agent choice for its filings: none, bring its own, or let the filing company provide it. */
  registeredAgentChoice: z.enum(["none", "client_provided", "filing_company"]).optional(),
  /** This firm's completeness config, overlaid on the service company's (same shape). */
  completeness: z.object({
    strictOptional: z.boolean().optional(),
    overrides: z.record(z.string(), z.enum(["required", "not_needed"])).optional(),
  }).optional(),
  /** The firm's own details, used wherever its answer is "this firm" (docs/onboarding/customer-firm.md). */
  organizer: Person.optional(),
  filer: Person.optional(),
  serviceOfProcess: Person.optional(),
  noticeEmail: z.string().email().optional(),
  /** Onboarding answers actually given (see effectivePolicies for the answers in force). */
  policies: FirmPolicyAnswers.prefault({}),
  /** NJ Registered Agent Number, if the agent has one (NJ offers it as an alternative to manual entry; path not walked yet). */
  njRegisteredAgentNumber: z.string().regex(/^\d{1,20}$/).optional(),
  defaultMember: Person.optional(),
  defaultSigner: Person.optional(),
  filingContact: z
    .object({ firstName: z.string(), lastName: z.string(), phone: z.string(), email: z.string().email() })
    .optional(),
  designatorDefault: z.string().default("LLC"),
  countyDefault: z.string().optional(),
  effectiveDateDefault: z.enum(["upon_filing", "specific"]).default("upon_filing"),
  checkboxDefaults: z
    .object({
      njAnnualReportReminders: z.boolean().default(true),
      njCorpWatchAlerts: z.boolean().default(true),
      nyRegisteredAgent: z.boolean().default(false),
      nyOpeningStatement: z.boolean().default(false),
      njOtherProvisions: z.boolean().default(false),
    })
    .prefault({}),
  mainBusinessAddress: Address.optional(),
  /**
   * The firm's white-label portal (web/): the address slug and the brand its own clients see.
   * Absent = the firm has no portal page. The slug is unique within the service company.
   */
  portal: z.object({
    slug: z.string().regex(/^[a-z0-9](?:[a-z0-9-]{0,46}[a-z0-9])?$/, "lowercase letters, digits and dashes"),
    displayName: z.string().min(1).max(80).optional(),
    logoUrl: z.string().url().startsWith("https://").optional(),
    primaryColor: z.string().regex(/^#[0-9a-fA-F]{6}$/, "a hex color like #1f4b99").optional(),
    supportEmail: z.string().email().optional(),
    /** Filing kinds the firm offers its clients (web/lib/intake ids); absent = all. */
    filingKinds: z.array(z.string()).optional(),
  }).optional(),
  /** A partner firm that signed up on the landing page: what it told us, and the setup guide's progress. */
  partner: z.object({
    companyType: z.enum(["cpa", "payroll", "cfo", "other"]).optional(),
    contactName: z.string().max(120).optional(),
    contactEmail: z.string().email().optional(),
    phone: z.string().max(40).optional(),
    website: z.string().url().startsWith("https://").optional(),
    /** Setup guide steps the firm has finished. */
    setupDone: z.array(z.enum(["details", "branding", "payments"])).default([]),
  }).optional(),
  /** The firm's saved cards for state fees and which pays which filing (src/settings/payments.ts). */
  payments: PaymentSettings.optional(),
});
export type ClientCompanySettings = z.infer<typeof ClientCompanySettings>;
