import { z } from "zod";
import { Address, Contact, Person, ResponsibleParty } from "../domain/filing.js";
import type { ClientCompanySettings, TenantSettings } from "./schema.js";

/**
 * Customer-firm onboarding answers (docs/onboarding/customer-firm.md). Question IDs in comments.
 * Levels: the platform -> a filing service company (tenant) -> its customer firms (CPA, title,
 * payroll company) -> the entity being filed. "service_company" = the tenant's own details,
 * "firm" = the customer firm's, "client"/"intake" = the entity's owner / intake answers.
 * "per_entity" = no default: the filing itself must carry the value.
 */
export const FirmPolicies = z.object({
  approver: z.enum(["firm", "client", "per_entity"]).optional(), // B1
  njRegisteredAgent: z.enum(["service_company", "firm", "new_entity", "entity_member", "per_entity", "intake"]).default("per_entity"), // C1
  nySopAddress: z.enum(["service_company", "firm", "entity_address", "per_entity", "intake"]).default("per_entity"), // C3
  nyNoticeEmail: z.enum(["service_company", "firm", "client"]).default("firm"), // C4
  nyRegisteredAgent: z.enum(["none", "service_company", "firm", "per_entity"]).default("none"), // C5
  organizer: z.enum(["service_company", "firm", "client", "per_entity", "intake"]).default("per_entity"), // D1
  njSigner: z.enum(["same_as_organizer", "service_company", "firm", "client", "per_entity"]).default("same_as_organizer"), // D2
  nyFiler: z.enum(["service_company", "firm", "per_entity"]).default("service_company"), // D3
  njMembers: z.enum(["intake", "per_entity"]).default("per_entity"), // E1
  nyManagement: z.enum(["member_managed", "manager_managed", "intake", "per_entity"]).default("per_entity"), // E2
  mainAddress: z.enum(["firm", "intake", "per_entity", "omit"]).default("per_entity"), // E3
  county: z.enum(["firm_default", "intake", "per_entity"]).default("per_entity"), // E4
  purpose: z.enum(["general", "firm_text", "intake", "per_entity"]).default("general"), // E5
  purposeText: z.string().max(300).optional(),
  effectiveDate: z.enum(["upon_filing", "per_entity"]).default("upon_filing"), // E6
  designator: z.string().default("LLC"), // E7 ("per_entity" = must be given)
  nameUnavailable: z.enum(["stop", "alternates"]).default("stop"), // E8 (stored; alternates not built)
  einResponsibleParty: z.enum(["intake", "per_entity"]).default("intake"), // F2
  ss4Collection: z.enum(["service_company_esign", "firm_uploads"]).optional(), // F3 (stored)
  closingMonth: z.number().int().min(1).max(12).default(12), // F4
  stateFees: z.enum(["service_company_account", "own_account"]).default("service_company_account"), // G1
  billing: z.enum(["per_filing", "monthly", "prepaid"]).optional(), // G2 (stored)
  njExtraCertificates: z.enum(["none", "standing", "certified", "both", "per_entity"]).default("none"), // G3
  filingContact: z.enum(["service_company", "firm", "client"]).default("firm"), // G5
  standingDefaultForm: z.enum(["short", "long_filing_history", "long_officers"]).default("short"), // G6
  documentsTo: z.enum(["firm", "client", "both"]).optional(), // H1 (stored)
  nyPublication: z.enum(["service_company", "firm_handles", "reminder_only"]).optional(), // H2 (stored)
  annualReports: z.enum(["service_company_reminds", "firm_handles"]).optional(), // H3 (stored)
});
export type FirmPolicies = z.infer<typeof FirmPolicies>;

/**
 * Stored answers: only the questions actually answered (no defaults filled in), so that a
 * service company's defaults apply to everything its customer left unanswered.
 */
export const FirmPolicyAnswers = z.object(
  Object.fromEntries(Object.entries(FirmPolicies.shape).map(([k, v]) => [
    k, ((v as z.ZodType) instanceof z.ZodDefault ? (v as unknown as z.ZodDefault<z.ZodType>).unwrap() : (v as z.ZodType)).optional(),
  ])) as { [K in keyof typeof FirmPolicies.shape]: z.ZodOptional<z.ZodType<z.infer<typeof FirmPolicies>[K]>> },
);
export type FirmPolicyAnswers = z.infer<typeof FirmPolicyAnswers>;
export const POLICY_KEYS = Object.keys(FirmPolicies.shape) as (keyof FirmPolicies)[];

/** The service company's intake answers for one entity, sent with the filing. */
export const FilingIntake = z.object({
  owners: z.array(Person).default([]),
  contact: Contact.optional(),
  principalAddress: Address.optional(),
  county: z.string().optional(),
  managementStructure: z.enum(["member_managed", "manager_managed"]).optional(),
  purpose: z.string().max(300).optional(),
  registeredAgent: Person.optional(),
  organizer: Person.optional(),
  serviceOfProcess: Person.optional(),
  responsibleParty: ResponsibleParty.optional(),
  nameAlternates: z.array(z.string()).default([]),
});
export type FilingIntake = z.infer<typeof FilingIntake>;

export interface PolicyIssue { path: string; message: string; severity: "error" }
export interface PolicyResult {
  /** The request with policy values filled in where the filing left them out. */
  request: Record<string, unknown>;
  issues: PolicyIssue[];
  /** Field path -> where its value came from, for review and audit. */
  provenance: Record<string, string>;
}

type Obj = Record<string, any>; // raw request before schema parsing

/**
 * Applies the firm's onboarding answers to a raw filing request, before it is parsed.
 * Only fields the filing left out are filled: a value sent with the filing always wins.
 */
/**
 * The answers in force for a customer firm: the service company's defaults, overlaid by the
 * firm's own answers, except for questions the service company has locked.
 */
export function effectivePolicies(tenant: TenantSettings, client: ClientCompanySettings): FirmPolicies {
  const own = Object.fromEntries(Object.entries(client.policies ?? {}).filter(([k, v]) => v !== undefined && !tenant.lockedCustomerPolicies.includes(k)));
  return FirmPolicies.parse({ ...tenant.customerPolicyDefaults, ...own });
}

export function applyPolicies(raw: unknown, tenant: TenantSettings, client: ClientCompanySettings): PolicyResult {
  const req: Obj = structuredClone((raw ?? {}) as Obj);
  const p = effectivePolicies(tenant, client);
  const issues: PolicyIssue[] = [];
  const provenance: Record<string, string> = {};
  const intakeParsed = FilingIntake.safeParse(req.intake ?? {});
  const intake: FilingIntake = intakeParsed.success ? intakeParsed.data : FilingIntake.parse({});
  if (!intakeParsed.success) issues.push({ path: "intake", message: `intake answers are malformed: ${intakeParsed.error.issues[0]?.message}`, severity: "error" });
  const owner = intake.owners[0];

  const fill = (obj: Obj, key: string, path: string, q: string, choice: string, value: unknown, what: string) => {
    if (obj[key] !== undefined && !(Array.isArray(obj[key]) && obj[key].length === 0)) { provenance[path] = "filing"; return; }
    if (choice === "per_entity") { issues.push({ path, message: `${q}: ${what} is decided per entity and this filing does not give it`, severity: "error" }); return; }
    if (value === undefined || value === null || (Array.isArray(value) && value.length === 0)) {
      issues.push({ path, message: `${q}: ${what} comes from "${choice}" but no value is on file there`, severity: "error" });
      return;
    }
    obj[key] = structuredClone(value);
    provenance[path] = choice;
  };
  const pick = <T>(choice: string, table: Record<string, T | undefined>): T | undefined => table[choice];

  // G5 filing contact (NJ payment page; state emails).
  fill(req, "contact", "contact", "G5", p.filingContact, pick(p.filingContact, { service_company: tenant.contact, firm: client.filingContact, client: intake.contact }), "the filing contact");

  // B1 approvers.
  if (p.approver && !req.approvalRecipients) {
    const recips = p.approver === "firm" ? client.approvers
      : p.approver === "client" && intake.contact ? [{ channel: "email" as const, address: intake.contact.email, name: `${intake.contact.firstName} ${intake.contact.lastName}` }]
      : undefined;
    fill(req, "approvalRecipients", "approvalRecipients", "B1", p.approver, recips, "who approves");
  }

  if (req.type === "formation" && req.formation && typeof req.formation === "object") {
    const f: Obj = req.formation;
    const state = req.state;

    // E7 designator.
    if (f.name && typeof f.name === "object" && f.name.designator === undefined) {
      if (p.designator === "per_entity") issues.push({ path: "formation.name.designator", message: "E7: the designator is decided per entity and this filing does not give it", severity: "error" });
      else { f.name.designator = p.designator; provenance["formation.name.designator"] = "firm policy"; }
    }

    // E3 main address. Optional in NJ (walk 2026-11-17), so "per entity"/"omit" never demand one;
    // validation still requires it where it is needed (an EIN application).
    if (p.mainAddress === "firm" || p.mainAddress === "intake") fill(f, "mainBusinessAddress", "formation.mainBusinessAddress", "E3", p.mainAddress, pick(p.mainAddress, { firm: client.mainBusinessAddress, intake: intake.principalAddress }), "the main business address");

    // D1 organizer (NY uses it directly; NJ signer may follow it).
    const organizerValue = pick(p.organizer, { service_company: tenant.organizer, firm: client.organizer, client: owner, intake: intake.organizer });
    if (state === "NY") {
      fill(f, "organizer", "formation.organizer", "D1", p.organizer, organizerValue, "the organizer");
      fill(f, "filer", "formation.filer", "D3", p.nyFiler, pick(p.nyFiler, { service_company: tenant.filer, firm: client.filer }), "the filer");
      fill(f, "managementStructure", "formation.managementStructure", "E2", p.nyManagement,
        p.nyManagement === "member_managed" || p.nyManagement === "manager_managed" ? p.nyManagement : intake.managementStructure, "the management structure");
      fill(f, "county", "formation.county", "E4", p.county, pick(p.county, { firm_default: client.countyDefault, intake: intake.county }), "the county");
      // C3 service of process + C4 notice email.
      const noticeEmail = pick(p.nyNoticeEmail, { service_company: tenant.contact?.email ?? tenant.noticeEmail, firm: client.noticeEmail ?? client.filingContact?.email, client: intake.contact?.email });
      const sopPerson = pick(p.nySopAddress, {
        service_company: tenant.serviceOfProcess, firm: client.serviceOfProcess, intake: intake.serviceOfProcess,
        entity_address: (f.mainBusinessAddress ?? intake.principalAddress) && f.name?.baseName
          ? { name: `${f.name.baseName} ${f.name.designator ?? p.designator}`.trim(), address: f.mainBusinessAddress ?? intake.principalAddress } : undefined,
      });
      fill(f, "serviceOfProcess", "formation.serviceOfProcess", "C3", p.nySopAddress, sopPerson ? { mode: "manual", person: sopPerson, noticeEmail } : undefined, "the service of process address");
      if (f.serviceOfProcess && typeof f.serviceOfProcess === "object" && !f.serviceOfProcess.noticeEmail && noticeEmail) {
        f.serviceOfProcess.noticeEmail = noticeEmail; provenance["formation.serviceOfProcess.noticeEmail"] = p.nyNoticeEmail;
      }
      // C5 optional NY registered agent. Skipped when the filing uses registeredAgentChoice.
      if (f.registeredAgentChoice === undefined && (p.nyRegisteredAgent === "service_company" || p.nyRegisteredAgent === "firm" || p.nyRegisteredAgent === "per_entity")) {
        fill(f, "registeredAgent", "formation.registeredAgent", "C5", p.nyRegisteredAgent, pick(p.nyRegisteredAgent, { service_company: tenant.registeredAgent, firm: client.registeredAgent }), "the NY registered agent");
      }
    }

    if (state === "NJ") {
      // E1 members.
      fill(f, "members", "formation.members", "E1", p.njMembers, p.njMembers === "intake" ? intake.owners : undefined, "the members/managers list");
      // C1 registered agent. Skipped when the filing uses the new registeredAgentChoice model
      // (then RegisteredAgentService resolves it from tenant provisioning or a third party).
      if (f.registeredAgentChoice === undefined) {
        const members: Obj[] = Array.isArray(f.members) && f.members.length ? f.members : intake.owners;
        const njMember = members.find((m) => m?.address?.state === "NJ");
        fill(f, "registeredAgent", "formation.registeredAgent", "C1", p.njRegisteredAgent, pick(p.njRegisteredAgent, {
          service_company: tenant.registeredAgent, firm: client.registeredAgent, intake: intake.registeredAgent,
          entity_member: intake.registeredAgent ?? (njMember ? { name: njMember.name, address: njMember.address } : undefined),
          // The new LLC as its own agent (NJ accepts this, confirmed 2026-11-18), at its NJ address.
          new_entity: (() => {
            const addr = f.mainBusinessAddress ?? intake.principalAddress;
            if (!addr || addr.state !== "NJ" || !f.name?.baseName) return undefined;
            return { name: `${f.name.baseName} ${f.name.designator ?? p.designator}`.trim(), address: addr };
          })(),
        }), "the registered agent");
      }
      // D2 signer(s).
      const signerChoice = p.njSigner === "same_as_organizer" ? p.organizer : p.njSigner;
      const signer = p.njSigner === "same_as_organizer" ? organizerValue
        : pick(p.njSigner, { service_company: tenant.signer ?? tenant.organizer, firm: client.defaultSigner ?? client.organizer, client: owner });
      fill(f, "signers", "formation.signers", "D2", signerChoice, signer ? [{ ...signer, title: "Authorized Representative" }] : undefined, "the signer");
      // G3 extras.
      if (f.additionalCertificates === undefined) {
        if (p.njExtraCertificates === "per_entity") issues.push({ path: "formation.additionalCertificates", message: "G3: NJ formation extras are decided per entity and this filing does not say", severity: "error" });
        else {
          f.additionalCertificates = { certificateOfStanding: p.njExtraCertificates === "standing" || p.njExtraCertificates === "both", certifiedCopy: p.njExtraCertificates === "certified" || p.njExtraCertificates === "both" };
          provenance["formation.additionalCertificates"] = p.njExtraCertificates;
        }
      }
    }

    // E5 purpose.
    if (p.purpose !== "general") fill(f, "purpose", "formation.purpose", "E5", p.purpose, pick(p.purpose, { firm_text: p.purposeText, intake: intake.purpose }), "the business purpose");
    // E6 effective date.
    if (p.effectiveDate === "per_entity" && f.effectiveDate === undefined) issues.push({ path: "formation.effectiveDate", message: "E6: the effective date is decided per entity and this filing does not give it", severity: "error" });
  }

  // F2 / F4 EIN.
  if (req.ein && typeof req.ein === "object" && req.ein.mode !== "none") {
    fill(req.ein, "responsibleParty", "ein.responsibleParty", "F2", p.einResponsibleParty, intake.responsibleParty, "the EIN responsible party");
    if (req.ein.closingMonth === undefined) { req.ein.closingMonth = p.closingMonth; provenance["ein.closingMonth"] = "firm policy"; }
  }

  // G6 standing certificate form.
  if (req.type === "standing_certificate" && req.standing && typeof req.standing === "object" && req.standing.form === undefined) {
    req.standing.form = p.standingDefaultForm; provenance["standing.form"] = "firm policy";
  }

  return { request: req, issues, provenance };
}
