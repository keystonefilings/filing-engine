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

describe("Florida profit corporation and limited partnership", () => {
  const FL_ADDR2 = { street1: "200 Ocean Dr", city: "Tampa", state: "FL", zip: "33602" };
  const FL_RA = { name: "Tessa Agentsson", address: { street1: "1 Capitol Way", city: "Tallahassee", state: "FL", zip: "32301" } };
  const base = (floridaEntityType: string, extra: Record<string, unknown>) => ({
    tenantId: "keystone", clientCompanyId: "acme-cpa", idempotencyKey: `fl-${floridaEntityType}-${Math.random()}`,
    type: "formation", state: "FL",
    formation: { name: { baseName: "Palm Coast Industries", designator: floridaEntityType === "limited_partnership" ? "LP" : "Inc" }, floridaEntityType, mainBusinessAddress: FL_ADDR2, registeredAgent: FL_RA, ...extra },
    contact: { firstName: "Test", lastName: "Filer", phone: "8135550100", email: "t@example.test" },
  });

  it("routes to the profit-corporation adapter and prices it at $70", () => {
    const req = FilingRequest.parse(base("profit_corporation", { stockShares: 1000, incorporator: { name: "Test Incorporator", address: FL_ADDR2 } }));
    expect(adapterFor(req)!.key).toBe("fl-profit-corporation");
    expect(expectedFees("FL", "formation", { paymentMethod: "credit_card", floridaEntityType: "profit_corporation" })[0]!.amountUsd).toBe(70);
    expect(hasErrors(validateFiling(req))).toBe(false);
  });
  it("requires stock shares and an incorporator for a profit corporation", () => {
    const paths = validateFiling(FilingRequest.parse(base("profit_corporation", {}))).map((i) => i.path);
    expect(paths).toContain("formation.stockShares");
    expect(paths).toContain("formation.incorporator");
  });
  it("routes to the limited-partnership adapter, prices it at $1000, requires a general partner", () => {
    const ok = FilingRequest.parse(base("limited_partnership", { generalPartners: [{ name: "Gene Partnerton", address: FL_ADDR2, signature: "Gene Partnerton" }] }));
    expect(adapterFor(ok)!.key).toBe("fl-limited-partnership");
    expect(expectedFees("FL", "formation", { paymentMethod: "credit_card", floridaEntityType: "limited_partnership" })[0]!.amountUsd).toBe(1000);
    expect(hasErrors(validateFiling(ok))).toBe(false);
    const missing = FilingRequest.parse(base("limited_partnership", {}));
    expect(validateFiling(missing).map((i) => i.path)).toContain("formation.generalPartners");
  });
  it("adds the Certificate of Status and Certified Copy at the right per-type amounts", () => {
    const corp = expectedFees("FL", "formation", { paymentMethod: "credit_card", floridaEntityType: "profit_corporation", certificateOfStanding: true, certifiedCopy: true });
    expect(corp.reduce((s, l) => s + l.amountUsd, 0)).toBe(70 + 8.75 + 52.5);
  });
});

describe("Florida professional entities (decision 18)", () => {
  const FL_ADDR3 = { street1: "200 S Orange Ave", city: "Orlando", state: "FL", zip: "32801" };
  const corp = (designator: string, extra: Record<string, unknown> = {}) => FilingRequest.parse(flFiling({
    formation: {
      entityType: "LLC", floridaEntityType: "profit_corporation", name: { baseName: "Rivera Dental", designator },
      mainBusinessAddress: FL_ADDR3, registeredAgent: { name: "Tessa Agentsson", address: FL_ADDR3 },
      stockShares: 100, incorporator: { name: "Sam Rivera", address: FL_ADDR3 }, ...extra,
    },
  }));
  const llc = (designator: string, extra: Record<string, unknown> = {}) => {
    const base = flFiling() as { formation: Record<string, unknown> };
    return FilingRequest.parse({ ...base, formation: { ...base.formation, name: { baseName: "Fields Accounting", designator }, ...extra } });
  };
  const errorsAt = (req: FilingRequest, path: string) => validateFiling(req).filter((i) => i.severity === "error" && i.path === path);

  it("accepts PLLC, P.L.L.C. and Chartered for an LLC, and needs its professional purpose", () => {
    for (const d of ["PLLC", "P.L.L.C.", "Professional Limited Liability Company", "Chartered"]) {
      expect(errorsAt(llc(d), "formation.name")).toEqual([]);
      expect(errorsAt(llc(d), "formation.purpose")[0]?.message).toMatch(/professional LLC .* must state its professional purpose/);
      expect(hasErrors(validateFiling(llc(d, { purpose: "The practice of public accounting" })))).toBe(false);
    }
    expect(errorsAt(llc("LLC"), "formation.purpose")).toEqual([]); // an ordinary LLC needn't
    expect(errorsAt(llc("Partners"), "formation.name")).toHaveLength(1);
  });

  it("accepts P.A., Professional Association and Chartered for a corporation, and needs its professional purpose", () => {
    for (const d of ["P.A.", "Professional Association", "Chartered"]) {
      expect(errorsAt(corp(d), "formation.name")).toEqual([]);
      expect(errorsAt(corp(d), "formation.purpose")[0]?.message).toMatch(/professional association .* must state its professional purpose/);
      expect(hasErrors(validateFiling(corp(d, { purpose: "The practice of dentistry" })))).toBe(false);
    }
    for (const d of ["Inc.", "Inc", "Corp.", "Corporation", "Incorporated", "Company", "Co."]) expect(hasErrors(validateFiling(corp(d)))).toBe(false);
    expect(errorsAt(corp("Group"), "formation.name")).toHaveLength(1);
  });
});
