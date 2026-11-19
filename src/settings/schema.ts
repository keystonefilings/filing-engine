import { z } from "zod";
import { Address, ApprovalRecipient, Contact, EinMode, Person } from "../domain/filing.js";
import { FirmPolicyAnswers } from "./policies.js";

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
  registeredAgent: Person.optional(),
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
});
export type ClientCompanySettings = z.infer<typeof ClientCompanySettings>;
