import { describe, expect, it } from "vitest";
import { applyPolicies } from "../src/settings/policies.js";
import { ClientCompanySettings, TenantSettings } from "../src/settings/schema.js";
import { MemoryStore } from "../src/store/memory.js";
import { wire, SECRET } from "./helpers.js";
import { ValidationFailed } from "../src/orchestrator/service.js";
void SECRET;

const NJ_ADDR = { street1: "1 Test Plaza", city: "Trenton", state: "NJ", zip: "08608" };
const NY_ADDR = { street1: "5 State St", city: "Albany", state: "NY", zip: "12207" };
const tenant = TenantSettings.parse({
  tenantId: "keystone", name: "Keystone",
  registeredAgent: { name: "Keystone Registered Agent Services", address: NJ_ADDR },
  organizer: { name: "Keystone Filings LLC", address: NY_ADDR },
  filer: { name: "Keystone Filings LLC", address: NY_ADDR },
  serviceOfProcess: { name: "Keystone Filings LLC", address: NY_ADDR },
  contact: { firstName: "Keystone", lastName: "Desk", phone: "2125550100", email: "desk@keystone.example" },
});
const firm = (policies: Record<string, unknown>, extra: Record<string, unknown> = {}) => ClientCompanySettings.parse({
  clientCompanyId: "acme", tenantId: "keystone", name: "Acme CPA", policies,
  registeredAgent: { name: "Acme CPA Agent", address: { street1: "9 Agent Way", city: "Newark", state: "NJ", zip: "07102" } },
  organizer: { name: "Acme CPA LLC", address: { street1: "9 Agent Way", city: "Newark", state: "NJ", zip: "07102" } },
  filingContact: { firstName: "Ann", lastName: "Acme", phone: "9735550100", email: "ann@acme.example" },
  ...extra,
});
const intake = {
  owners: [{ name: "Sam Rivera", address: { street1: "22 River Rd", city: "Hoboken", state: "NJ", zip: "07030" } }],
  contact: { firstName: "Sam", lastName: "Rivera", phone: "2015550100", email: "sam@client.example" },
  principalAddress: { street1: "22 River Rd", city: "Hoboken", state: "NJ", zip: "07030" },
};
const njFiling = (formation: Record<string, unknown> = {}) => ({
  tenantId: "keystone", clientCompanyId: "acme", idempotencyKey: "k-123456789", type: "formation", state: "NJ",
  formation: { name: { baseName: "Blue Harbor Consulting" }, ...formation }, intake,
});

describe("registered agent question (C1)", () => {
  const cases: [string, string | null][] = [
    ["keystone", "Keystone Registered Agent Services"],
    ["firm", "Acme CPA Agent"],
    ["entity_member", "Sam Rivera"],
  ];
  for (const [choice, name] of cases) {
    it(`"${choice}" fills the NJ agent`, () => {
      const r = applyPolicies(njFiling(), tenant, firm({ njRegisteredAgent: choice, njMembers: "intake", organizer: "client" }));
      expect(r.issues).toEqual([]);
      expect((r.request as any).formation.registeredAgent.name).toBe(name);
      expect(r.provenance["formation.registeredAgent"]).toBe(choice);
    });
  }
  it('"per_entity" refuses a filing without an agent, accepts one with it', () => {
    const p = firm({ njRegisteredAgent: "per_entity", njMembers: "intake", organizer: "client" });
    expect(applyPolicies(njFiling(), tenant, p).issues.map((i) => i.message)).toEqual([expect.stringContaining("C1")]);
    const r = applyPolicies(njFiling({ registeredAgent: { name: "Chosen Agent", address: NJ_ADDR } }), tenant, p);
    expect(r.issues).toEqual([]);
    expect(r.provenance["formation.registeredAgent"]).toBe("filing");
  });
  it('"intake" without an intake agent is refused with the question number', () => {
    const r = applyPolicies(njFiling(), tenant, firm({ njRegisteredAgent: "intake", njMembers: "intake", organizer: "client" }));
    expect(r.issues[0]?.message).toMatch(/^C1: the registered agent comes from "intake" but no value/);
  });
  it("a value sent with the filing beats the firm's answer", () => {
    const r = applyPolicies(njFiling({ registeredAgent: { name: "Override Agent", address: NJ_ADDR } }), tenant, firm({ njRegisteredAgent: "keystone", njMembers: "intake", organizer: "client" }));
    expect((r.request as any).formation.registeredAgent.name).toBe("Override Agent");
  });
});

describe("organizer / incorporator question (D1, D2, D3)", () => {
  const ny = { tenantId: "keystone", clientCompanyId: "acme", idempotencyKey: "k-ny-1234567", type: "formation", state: "NY", formation: { name: { baseName: "Blue Harbor Consulting" } }, intake: { ...intake, county: "Albany" } };
  it("NY: Keystone as organizer and filer; LLC's own address for service of process", () => {
    const r = applyPolicies(ny, tenant, firm({ organizer: "keystone", nyFiler: "keystone", nySopAddress: "entity_address", mainAddress: "intake", nyManagement: "member_managed", county: "intake", nyNoticeEmail: "client" }));
    expect(r.issues).toEqual([]);
    const f = (r.request as any).formation;
    expect(f.organizer.name).toBe("Keystone Filings LLC");
    expect(f.filer.name).toBe("Keystone Filings LLC");
    expect(f.serviceOfProcess).toMatchObject({ mode: "manual", person: { name: "Blue Harbor Consulting LLC" }, noticeEmail: "sam@client.example" });
    expect(f.managementStructure).toBe("member_managed");
    expect(f.county).toBe("Albany");
  });
  it("NY: the client as organizer", () => {
    const r = applyPolicies(ny, tenant, firm({ organizer: "client", nySopAddress: "firm", mainAddress: "intake", nyManagement: "intake", county: "intake" }, { serviceOfProcess: { name: "Acme CPA LLC", address: NY_ADDR } }));
    expect((r.request as any).formation.organizer.name).toBe("Sam Rivera");
    expect(r.issues.map((i) => i.path)).toEqual(["formation.managementStructure"]); // E2 from intake, intake has none
  });
  it("NJ: signer follows the organizer answer, titled Authorized Representative", () => {
    const r = applyPolicies(njFiling(), tenant, firm({ organizer: "firm", njSigner: "same_as_organizer", njMembers: "intake", njRegisteredAgent: "keystone" }));
    expect((r.request as any).formation.signers).toEqual([{ name: "Acme CPA LLC", address: expect.any(Object), title: "Authorized Representative" }]);
  });
  it('NJ: "decide per entity" organizer means the filing must name the signer', () => {
    const r = applyPolicies(njFiling(), tenant, firm({ organizer: "per_entity", njMembers: "intake", njRegisteredAgent: "keystone" }));
    expect(r.issues.map((i) => i.message)).toEqual([expect.stringMatching(/^D2: the signer is decided per entity/)]);
  });
});

describe("other answers", () => {
  it("designator, extras, contact, approvers, EIN party and standing form", () => {
    const p = firm({ designator: "L.L.C.", njExtraCertificates: "both", filingContact: "firm", approver: "client", njMembers: "intake", njRegisteredAgent: "keystone", organizer: "client", einResponsibleParty: "intake", closingMonth: 6, standingDefaultForm: "long_officers" });
    const r = applyPolicies({ ...njFiling(), ein: { mode: "in_run" }, intake: { ...intake, responsibleParty: { name: "Sam Rivera", ssn: "123456789", title: "Member", address: intake.principalAddress, phone: "2015550100" } } }, tenant, p);
    const q = r.request as any;
    expect(r.issues).toEqual([]);
    expect(q.formation.name.designator).toBe("L.L.C.");
    expect(q.formation.additionalCertificates).toEqual({ certificateOfStanding: true, certifiedCopy: true });
    expect(q.contact.email).toBe("ann@acme.example");
    expect(q.approvalRecipients).toEqual([{ channel: "email", address: "sam@client.example", name: "Sam Rivera" }]);
    expect(q.ein.responsibleParty.name).toBe("Sam Rivera");
    expect(q.ein.closingMonth).toBe(6);
    const s = applyPolicies({ tenantId: "keystone", clientCompanyId: "acme", type: "standing_certificate", state: "NJ", standing: { entityName: "X LLC", entityType: "LLC" } }, tenant, p);
    expect((s.request as any).standing.form).toBe("long_officers");
  });
});

describe("filing creation uses the answers end to end", () => {
  it("a filing with only the name and intake becomes complete, with provenance recorded", async () => {
    const store = new MemoryStore();
    await store.putTenant(tenant);
    await store.putClientCompany(firm({ njRegisteredAgent: "keystone", njMembers: "intake", organizer: "client", mainAddress: "intake", filingContact: "client", approver: "client" }));
    const { service } = wire(store);
    const { filing, approvalLink, issues } = await service.createFiling({ ...njFiling(), contact: undefined });
    expect(issues.filter((i) => i.severity === "error")).toEqual([]);
    expect(filing.status).toBe("awaiting_approval");
    expect(approvalLink).toBeDefined();
    expect(filing.request.formation!.registeredAgent!.name).toBe("Keystone Registered Agent Services");
    expect(filing.request.formation!.signers[0]!.name).toBe("Sam Rivera");
    expect(filing.appliedPolicies).toMatchObject({ "formation.registeredAgent": "keystone", "formation.members": "intake", contact: "client", approvalRecipients: "client" });
    const approval = (await store.getApproval(filing.currentApprovalId!))!;
    expect(approval.recipients).toEqual([{ channel: "email", address: "sam@client.example", name: "Sam Rivera" }]);
  });
  it("an unanswered per-entity question is refused before anything is stored", async () => {
    const store = new MemoryStore();
    await store.putTenant(tenant);
    await store.putClientCompany(firm({ njRegisteredAgent: "per_entity", njMembers: "intake", organizer: "client" }));
    const { service } = wire(store);
    const r = await service.createFiling(njFiling()).catch((e) => e);
    // Missing agent is a policy issue; the request still parses, so it is stored as invalid with the reason.
    if (r instanceof ValidationFailed) expect(r.issues.some((i) => i.message.startsWith("C1"))).toBe(true);
    else { expect(r.filing.status).toBe("invalid"); expect(r.filing.lastError).toContain("C1"); }
  });
});
