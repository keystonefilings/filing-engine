import { z } from "zod";
import { Address, ApprovalRecipient, EinMode, Person } from "../domain/filing.js";

/** Tenant = Keystone (or another filing company using the engine). */
export const TenantSettings = z.object({
  tenantId: z.string().min(1),
  name: z.string().min(1),
  /** Keystone acts as organizer/filer on NY filings unless a client overrides. */
  organizer: Person.optional(),
  filer: Person.optional(),
  nyOpeningStatementWhenOrganizerIsEntity: z.boolean().default(false),
  webhookEndpoints: z
    .array(z.object({ url: z.string().url(), secret: z.string().min(16), events: z.array(z.string()).optional() }))
    .default([]),
  defaultApprovers: z.array(ApprovalRecipient).default([]),
  /** Vault key for the ny.gov service-company login (username/password/totp). */
  nyGovCredentialKey: z.string().default("NYGOV"),
  /** Keystone staff who review drift halts (decision 6). */
  driftReviewers: z.array(z.string().email()).default([]),
});
export type TenantSettings = z.infer<typeof TenantSettings>;

/** Client company = the accountant/firm/entity owner Keystone files for. */
export const ClientCompanySettings = z.object({
  clientCompanyId: z.string().min(1),
  tenantId: z.string().min(1),
  name: z.string().min(1),
  /** Default filing state for this client ("state selector", requirement 7). */
  defaultState: z.enum(["NY", "NJ"]).optional(),
  /** Decision 1: per-client-company EIN timing. */
  einMode: EinMode.default("in_run"),
  /** Decision 2: who may approve through the link; default is the named signer/organizer. */
  approvers: z.array(ApprovalRecipient).default([]),
  approvalTtlHours: z.number().int().positive().optional(),
  requireOneTimeCode: z.boolean().default(false),
  /** Decision 3: NJ pays through the client's own signed-in NJ account. */
  njAccountCredentialKey: z.string().optional(),
  njStoredPaymentMethod: z.enum(["stored_card", "stored_echeck"]).optional(),
  /** Decision 3: NY pays from a prepaid drawdown (DD) account. */
  nyDrawdownAccountRef: z.string().optional(),
  registeredAgent: Person.optional(),
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
