import { z } from "zod";
import { Address, ApprovalRecipient, Contact, EinMode, Person } from "../domain/filing.js";
import { FirmPolicies } from "./policies.js";

/** Tenant = Keystone (or another filing company using the engine). */
export const TenantSettings = z.object({
  tenantId: z.string().min(1),
  name: z.string().min(1),
  /** Keystone's own details, used wherever a firm's answer is "Keystone" (docs/firm-onboarding.md). */
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
  /** Keystone's company-wide NJ login (2026-11-18). Default for every NJ run; a client may override. */
  njAccountCredentialKey: z.string().optional(),
  /** Payment method stored on the company-wide NJ account (walk A confirms how it appears). */
  njStoredPaymentMethod: z.enum(["stored_card", "stored_echeck"]).optional(),
  /** Keystone's NY drawdown account; a client may override with its own. */
  nyDrawdownAccountRef: z.string().optional(),
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
  /** Optional override: this client's own NJ login. Unset = Keystone's company-wide NJ account. */
  njAccountCredentialKey: z.string().optional(),
  njStoredPaymentMethod: z.enum(["stored_card", "stored_echeck"]).optional(),
  /** Optional override: this client's own NY drawdown account. Unset = Keystone's. */
  nyDrawdownAccountRef: z.string().optional(),
  registeredAgent: Person.optional(),
  /** The firm's own details, used wherever its answer is "this firm" (docs/firm-onboarding.md). */
  organizer: Person.optional(),
  filer: Person.optional(),
  serviceOfProcess: Person.optional(),
  noticeEmail: z.string().email().optional(),
  /** Onboarding answers. */
  policies: FirmPolicies.prefault({}),
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
