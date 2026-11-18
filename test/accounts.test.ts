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
