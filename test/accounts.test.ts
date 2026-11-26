import { describe, expect, it } from "vitest";
import { njAccount, nyDrawdownAccount } from "../src/settings/accounts.js";
import { ClientCompanySettings, TenantSettings } from "../src/settings/schema.js";

const tenant = TenantSettings.parse({ tenantId: "keystone", name: "Keystone", njAccountCredentialKey: "NJ_KEYSTONE", njStoredPaymentMethod: "stored_echeck", nyDrawdownAccountRef: "DD-KEYSTONE" });

describe("state accounts: the service company's own, or the firm's (G1)", () => {
  it("scopes vault keys so two service companies can use the same key name safely", () => {
    const other = TenantSettings.parse({ tenantId: "otherco", name: "Other Co", njAccountCredentialKey: "NJ_KEYSTONE" });
    const c = (tid: string) => ClientCompanySettings.parse({ clientCompanyId: "x", tenantId: tid, name: "X" });
    expect(njAccount(tenant, c("keystone")).credentialKey).toBe("keystone/NJ_KEYSTONE");
    expect(njAccount(other, c("otherco")).credentialKey).toBe("otherco/NJ_KEYSTONE");
  });
  it("uses Keystone's company-wide NJ and NY accounts by default", () => {
    const client = ClientCompanySettings.parse({ clientCompanyId: "acme", tenantId: "keystone", name: "Acme" });
    const a = njAccount(tenant, client);
    expect(a).toMatchObject({ credentialKey: "keystone/NJ_KEYSTONE", profileKey: "nj:keystone", owner: "tenant", paymentTypeLabel: "E-Check", feeMethod: "stored_echeck" });
    expect(nyDrawdownAccount(tenant, client)).toBe("DD-KEYSTONE");
  });
  it("ignores a firm's own accounts unless its answer is 'the firm's own account'", () => {
    const client = ClientCompanySettings.parse({ clientCompanyId: "acme", tenantId: "keystone", name: "Acme", njAccountCredentialKey: "NJ_ACME", nyDrawdownAccountRef: "DD-ACME" });
    expect(njAccount(tenant, client).credentialKey).toBe("keystone/NJ_KEYSTONE");
    expect(nyDrawdownAccount(tenant, client)).toBe("DD-KEYSTONE");
  });
  it("uses the firm's own accounts when it chose to pay state fees itself (G1)", () => {
    const client = ClientCompanySettings.parse({ clientCompanyId: "acme", tenantId: "keystone", name: "Acme", policies: { stateFees: "own_account" }, njAccountCredentialKey: "NJ_ACME", njStoredPaymentMethod: "stored_card", nyDrawdownAccountRef: "DD-ACME" });
    expect(njAccount(tenant, client)).toMatchObject({ credentialKey: "keystone/acme/NJ_ACME", profileKey: "nj:acme", owner: "client", paymentTypeLabel: "Credit Card" });
    expect(nyDrawdownAccount(tenant, client)).toBe("DD-ACME");
  });
  it("a firm that pays itself but has no NJ login on file runs signed out, and pre-flight refuses real runs", () => {
    const client = ClientCompanySettings.parse({ clientCompanyId: "acme", tenantId: "keystone", name: "Acme", policies: { stateFees: "own_account" } });
    expect(njAccount(tenant, client)).toMatchObject({ credentialKey: null, owner: "none" });
  });
  it("signed out when nobody has an NJ login (dry runs only)", () => {
    const bare = TenantSettings.parse({ tenantId: "t", name: "T" });
    const client = ClientCompanySettings.parse({ clientCompanyId: "c", tenantId: "t", name: "C" });
    expect(njAccount(bare, client)).toMatchObject({ credentialKey: null, profileKey: null, owner: "none", feeMethod: "credit_card" });
  });
});

describe("NJ state fees from the NJ account's saved method, per filing type (Yakov, Nov 26)", () => {
  const card = { id: "ops", label: "Ops card", provider: "basis_theory", providerRef: "6f1c2a9e-1111-4222-8333-944455556666", purpose: "state_fees" };
  const ent = (njPortal?: unknown, login = true) => TenantSettings.parse({
    tenantId: "ent", name: "Enterprise Co", ...(login ? { njAccountCredentialKey: "NJ_ENT" } : {}),
    payments: { methods: [card], routing: { defaultMethodId: "ops", ...(njPortal ? { statePortal: { NJ: njPortal } } : {}) } },
  });
  const firm = ClientCompanySettings.parse({ clientCompanyId: "f1", tenantId: "ent", name: "Firm" });
  const nj = (type: string, extra: Record<string, unknown> = {}) => ({
    id: "f", request: { tenantId: "ent", clientCompanyId: "f1", state: "NJ", type, ...extra },
  }) as never;

  it("uses the NJ account's method only for the ticked types, and no card saved with us for them", async () => {
    const { cardRefsForFiling } = await import("../src/payments/card-vault.js");
    const { filingKindOf } = await import("../src/settings/payments.js");
    const t = ent({ method: "stored_echeck", kinds: ["nj-llc", "nj-standing"] });
    expect(njAccount(t, firm, "nj-llc")).toMatchObject({ storedMethod: "stored_echeck", feeMethod: "stored_echeck", paymentTypeLabel: "E-Check", portalPaymentWithoutLogin: false });
    expect(njAccount(t, firm, "nj-corp")).toMatchObject({ storedMethod: undefined, feeMethod: "credit_card" });
    // API filings carry no form kind: their state and type say which it is.
    expect(filingKindOf({ state: "NJ", type: "formation", formation: { njEntityType: "llc" } })).toBe("nj-llc");
    expect(filingKindOf({ state: "NJ", type: "formation", formation: { njEntityType: "for_profit_corporation" } })).toBe("nj-corp");
    expect(filingKindOf({ state: "NJ", type: "standing_certificate" })).toBe("nj-standing");
    expect(cardRefsForFiling(nj("standing_certificate"), t, firm)).toEqual([]);
    expect(cardRefsForFiling(nj("formation", { formation: { njEntityType: "for_profit_corporation" } }), t, firm).map((c) => c.id)).toEqual(["ops"]);
  });

  it("refuses at approval when the NJ login isn't connected, never falling back to a card", async () => {
    const { feeOptionsFor } = await import("../src/fees/request-fees.js");
    const { FeeUnknownError } = await import("../src/fees/table.js");
    const t = ent({ method: "stored_card", kinds: ["nj-llc"] }, false);
    expect(njAccount(t, firm, "nj-llc")).toMatchObject({ storedMethod: undefined, portalPaymentWithoutLogin: true });
    expect(() => feeOptionsFor({ state: "NJ", type: "formation", formation: { njEntityType: "llc", additionalCertificates: {} } } as never, t, firm)).toThrow(FeeUnknownError);
    expect(() => feeOptionsFor({ state: "NJ", type: "formation", formation: { njEntityType: "for_profit_corporation", additionalCertificates: {} } } as never, t, firm)).not.toThrow();
  });

  it("only NJ filing types can be set this way, and the production table quotes the saved methods", async () => {
    const { PaymentSettings } = await import("../src/settings/payments.js");
    expect(PaymentSettings.safeParse({ methods: [], routing: { statePortal: { NJ: { kinds: ["ny-llc"] } } } }).success).toBe(false);
    expect(PaymentSettings.safeParse({ methods: [], routing: { statePortal: { NJ: { method: "stored_card", kinds: ["nj-corp"] } } } }).success).toBe(true);
    const { expectedFees, totalUsd } = await import("../src/fees/table.js");
    const { readFileSync } = await import("node:fs");
    const prod = JSON.parse(readFileSync("config/fees.json", "utf8"));
    expect(totalUsd(expectedFees("NJ", "formation", { paymentMethod: "stored_card" }, prod))).toBe(103.5);
    expect(totalUsd(expectedFees("NJ", "formation", { paymentMethod: "stored_echeck" }, prod))).toBe(101);
    expect(totalUsd(expectedFees("NJ", "standing_certificate", { paymentMethod: "stored_card", entityType: "LLC" }, prod))).toBe(52);
  });

  it("without the per-type setting, the older account-wide saved method still applies to every NJ filing", () => {
    expect(njAccount(tenant, ClientCompanySettings.parse({ clientCompanyId: "acme", tenantId: "keystone", name: "Acme" }), "nj-corp").storedMethod).toBe("stored_echeck");
  });
});
