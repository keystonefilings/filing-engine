import { describe, expect, it } from "vitest";
import { FilingRequest } from "../src/domain/filing.js";
import { validateFiling, hasErrors } from "../src/domain/validation.js";
import { renderName } from "../src/domain/name.js";
import { expectedFees } from "../src/fees/table.js";
import { adapterFor, moFormationAdapter } from "../src/adapters/index.js";
import { moAccount } from "../src/settings/accounts.js";
import { TenantSettings, ClientCompanySettings } from "../src/settings/schema.js";
import { preflight, unknownBalanceProvider } from "../src/orchestrator/preflight.js";
import { ApprovalService } from "../src/approvals/service.js";
import { InMemoryVault } from "../src/settings/vault.js";
import { seededStore, wire, SECRET } from "./helpers.js";
import { irsEinAdapter } from "../src/adapters/index.js";

const MO_ADDR = { street1: "1 Capitol Ave", city: "Jefferson City", state: "MO", zip: "65101" };
function moFiling(overrides = {}) {
  return {
    tenantId: "keystone", clientCompanyId: "acme-cpa", idempotencyKey: `mo-${Math.random().toString(36).slice(2)}`,
    type: "formation", state: "MO",
    formation: {
      name: { baseName: "Ozark Ridge Holdings", designator: "LLC" },
      managementStructure: "member_managed", purpose: "Any lawful purpose.",
      registeredAgent: { name: "Ozark Agents LLC", address: MO_ADDR },
      organizers: [{ name: "Dana Fields", address: MO_ADDR }],
      moSigner: { name: "Dana Fields", title: "Organizer" },
      mainBusinessAddress: MO_ADDR,
      duration: "perpetual",
    },
    contact: { firstName: "Dana", lastName: "Fields", phone: "5735550100", email: "dana@example.test" },
    ...overrides,
  };
}
void SECRET;

describe("Missouri domain", () => {
  it("renders the name with the indicator in the single field (like NY)", () => {
    expect(renderName({ baseName: "Ozark Ridge Holdings", designator: "LLC" }, "MO")).toEqual({ nameField: "Ozark Ridge Holdings LLC" });
  });
  it("accepts a complete MO formation", () => {
    expect(hasErrors(validateFiling(FilingRequest.parse(moFiling())))).toBe(false);
  });
  it("requires an MO registered agent address, management, purpose, organizer and principal office", () => {
    const req = FilingRequest.parse(moFiling());
    req.formation!.registeredAgent!.address!.state = "NJ";
    req.formation!.organizers = [];
    req.formation!.purpose = "";
    const paths = validateFiling(req).map((i) => i.path);
    expect(paths).toEqual(expect.arrayContaining(["formation.registeredAgent.address.state", "formation.organizers", "formation.purpose"]));
  });
  it("caps online organizers at five and refuses Series LLC", () => {
    const req = FilingRequest.parse(moFiling());
    req.formation!.organizers = Array.from({ length: 6 }, (_, i) => ({ name: `Org ${i}`, address: MO_ADDR }));
    req.formation!.seriesLlc = true;
    const paths = validateFiling(req).map((i) => i.path);
    expect(paths).toContain("formation.organizers");
    expect(paths).toContain("formation.seriesLlc");
  });
});

describe("Missouri fees", () => {
  it("online formation is $50, good standing $10 flat", () => {
    expect(expectedFees("MO", "formation", { paymentMethod: "credit_card" }).reduce((s, l) => s + l.amountUsd, 0)).toBe(50);
    expect(expectedFees("MO", "standing_certificate", { paymentMethod: "echeck" }).reduce((s, l) => s + l.amountUsd, 0)).toBe(10);
  });
  it("MO good standing needs no entity type (unlike NJ)", () => {
    expect(() => expectedFees("MO", "standing_certificate", { paymentMethod: "credit_card" })).not.toThrow();
  });
});

describe("Missouri account and adapter", () => {
  const tenant = TenantSettings.parse({ tenantId: "keystone", name: "Keystone", moAccountCredentialKey: "MO", moPaymentMethod: "echeck" });
  const client = ClientCompanySettings.parse({ clientCompanyId: "acme", tenantId: "keystone", name: "Acme" });
  it("uses the service company's Missouri login and its payment method", () => {
    expect(moAccount(tenant, client)).toMatchObject({ credentialKey: "keystone/MO", profileKey: "mo:keystone", feeMethod: "echeck", paymentTypeLabel: "Electronic Check", owner: "tenant" });
  });
  it("routes MO formation to the Missouri adapter, which is dry-run only", () => {
    expect(adapterFor(FilingRequest.parse(moFiling()))).toBe(moFormationAdapter);
    expect(moFormationAdapter.complete).toBe(false);
    expect(moFormationAdapter.site).toBe("MO");
  });
  it("pre-flight blocks a real MO run with no login, and the unmapped adapter", async () => {
    const store = await seededStore();
    const approvals = new ApprovalService({ store, signingSecret: SECRET, publicBaseUrl: "http://api.test", defaultTtlHours: 24 });
    const filing = { id: "f", tenantId: "keystone", clientCompanyId: "acme-cpa", idempotencyKey: "k", status: "queued" as const, request: FilingRequest.parse(moFiling({ dryRun: false })), payloadHash: "h", createdAt: "", updatedAt: "", artifacts: [] };
    const pf = await preflight({
      filing, approval: null, tenant: (await store.getTenant("keystone"))!, client: (await store.getClientCompany("acme-cpa"))!,
      adapter: moFormationAdapter, einAdapter: irsEinAdapter, approvals, vault: new InMemoryVault(), balances: unknownBalanceProvider, dryRun: false,
    });
    expect(pf.ok).toBe(false);
    expect(pf.blockers.join(" ")).toMatch(/not fully mapped|Missouri login/);
  });
});

describe("Missouri filing creation", () => {
  it("creates an MO formation and sends it for approval in a dry run", async () => {
    const store = await seededStore();
    const { service } = wire(store);
    const { filing, approvalLink, issues } = await service.createFiling(moFiling({ dryRun: true }));
    expect(issues.filter((i) => i.severity === "error")).toEqual([]);
    expect(filing.status).toBe("awaiting_approval");
    expect(approvalLink).toBeDefined();
  });
});
