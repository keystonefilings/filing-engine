import { describe, expect, it } from "vitest";
import { FilingRequest } from "../src/domain/filing.js";
import { validateFiling, hasErrors } from "../src/domain/validation.js";
import { renderName } from "../src/domain/name.js";
import { expectedFees } from "../src/fees/table.js";
import { adapterFor, flFormationAdapter } from "../src/adapters/index.js";
import { flAccount } from "../src/settings/accounts.js";
import { TenantSettings, ClientCompanySettings } from "../src/settings/schema.js";
import { seededStore, wire } from "./helpers.js";

const FL_ADDR = { street1: "100 Biscayne Blvd", city: "Miami", state: "FL", zip: "33132" };
function flFiling(overrides = {}) {
  return {
    tenantId: "keystone", clientCompanyId: "acme-cpa", idempotencyKey: `fl-${Math.random().toString(36).slice(2)}`,
    type: "formation", state: "FL",
    formation: {
      name: { baseName: "Everglade Harbor Ventures", designator: "LLC" },
      mainBusinessAddress: FL_ADDR,
      registeredAgent: { name: "Tessa Agentsson", address: { street1: "1 Capitol Way", city: "Tallahassee", state: "FL", zip: "32301" } },
      signers: [{ name: "Dana Fields", title: "Authorized Member" }],
      additionalCertificates: { certificateOfStanding: false, certifiedCopy: false },
    },
    contact: { firstName: "Dana", lastName: "Fields", phone: "3055550100", email: "dana@example.test" },
    ...overrides,
  };
}

describe("Florida domain", () => {
  it("renders the name with the indicator in the single field", () => {
    expect(renderName({ baseName: "Everglade Harbor Ventures", designator: "LLC" }, "FL")).toEqual({ nameField: "Everglade Harbor Ventures LLC" });
  });
  it("accepts a complete FL formation", () => {
    expect(hasErrors(validateFiling(FilingRequest.parse(flFiling())))).toBe(false);
  });
  it("requires a Florida registered-agent address and an LLC indicator, caps authorized persons at 6", () => {
    const req = FilingRequest.parse(flFiling());
    req.formation!.registeredAgent!.address!.state = "NJ";
    req.formation!.authorizedPersons = Array.from({ length: 7 }, () => ({ title: "MGR" as const, name: "X", address: FL_ADDR }));
    const paths = validateFiling(req).map((i) => i.path);
    expect(paths).toContain("formation.registeredAgent.address.state");
    expect(paths).toContain("formation.authorizedPersons");
  });
  it("refuses an in-run EIN for Florida (examiner review, not instant)", () => {
    const req = FilingRequest.parse(flFiling({ ein: { mode: "in_run", applicantRole: "owner", formationState: "FL", businessActivity: { category: "Other" }, responsibleParty: { name: "Dana Fields", ssn: "123-45-6789", title: "Member", address: FL_ADDR, phone: "3055550100" } } as never }));
    expect(validateFiling(req).map((i) => i.path)).toContain("ein.mode");
  });
});

describe("Florida fees", () => {
  it("LLC formation is $125, plus $5 status and $30 certified copy", () => {
    expect(expectedFees("FL", "formation", { paymentMethod: "credit_card" })[0]!.amountUsd).toBe(125);
    expect(expectedFees("FL", "formation", { paymentMethod: "credit_card", certificateOfStanding: true, certifiedCopy: true }).reduce((s, l) => s + l.amountUsd, 0)).toBe(160);
  });
});

describe("Florida account and adapter", () => {
  it("pays by credit card by default, no login profile", () => {
    const tenant = TenantSettings.parse({ tenantId: "keystone", name: "Keystone" });
    const client = ClientCompanySettings.parse({ clientCompanyId: "acme", tenantId: "keystone", name: "Acme" });
    expect(flAccount(tenant, client)).toMatchObject({ paymentMethod: "credit_card", accountCredentialKey: null, feeMethod: "credit_card" });
    expect(flFormationAdapter.profileKey({ tenant, client } as never)).toBeNull();
  });
  it("uses the service company's prepaid Sunbiz E-file account when chosen", () => {
    const tenant = TenantSettings.parse({ tenantId: "keystone", name: "Keystone", flPaymentMethod: "sunbiz_account", flSunbizAccountCredentialKey: "SUNBIZ" });
    const client = ClientCompanySettings.parse({ clientCompanyId: "acme", tenantId: "keystone", name: "Acme" });
    expect(flAccount(tenant, client)).toMatchObject({ paymentMethod: "sunbiz_account", accountCredentialKey: "keystone/SUNBIZ", feeMethod: "sunbiz_account", owner: "tenant" });
  });
  it("routes FL formation to the Florida adapter (dry-run only)", () => {
    expect(adapterFor(FilingRequest.parse(flFiling()))).toBe(flFormationAdapter);
    expect(flFormationAdapter.complete).toBe(false);
    expect(flFormationAdapter.site).toBe("FL");
  });
});

describe("Florida filing creation", () => {
  it("creates an FL formation for approval in a dry run", async () => {
    const store = await seededStore();
    const { service } = wire(store);
    const { filing, approvalLink, issues } = await service.createFiling(flFiling({ dryRun: true }));
    expect(issues.filter((i) => i.severity === "error")).toEqual([]);
    expect(filing.status).toBe("awaiting_approval");
    expect(approvalLink).toBeDefined();
  });
});
