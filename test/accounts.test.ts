import { describe, expect, it } from "vitest";
import { njAccount, nyDrawdownAccount } from "../src/settings/accounts.js";
import { ClientCompanySettings, TenantSettings } from "../src/settings/schema.js";

const tenant = TenantSettings.parse({ tenantId: "keystone", name: "Keystone", njAccountCredentialKey: "NJ_KEYSTONE", njStoredPaymentMethod: "stored_echeck", nyDrawdownAccountRef: "DD-KEYSTONE" });

describe("state accounts (company-wide logins, 2026-11-18)", () => {
  it("uses Keystone's company-wide NJ and NY accounts by default", () => {
    const client = ClientCompanySettings.parse({ clientCompanyId: "acme", tenantId: "keystone", name: "Acme" });
    const a = njAccount(tenant, client);
    expect(a).toMatchObject({ credentialKey: "NJ_KEYSTONE", profileKey: "nj:keystone", owner: "tenant", paymentTypeLabel: "E-Check", feeMethod: "stored_echeck" });
    expect(nyDrawdownAccount(tenant, client)).toBe("DD-KEYSTONE");
  });
  it("ignores a firm's own accounts unless its answer is 'the firm's own account'", () => {
    const client = ClientCompanySettings.parse({ clientCompanyId: "acme", tenantId: "keystone", name: "Acme", njAccountCredentialKey: "NJ_ACME", nyDrawdownAccountRef: "DD-ACME" });
    expect(njAccount(tenant, client).credentialKey).toBe("NJ_KEYSTONE");
    expect(nyDrawdownAccount(tenant, client)).toBe("DD-KEYSTONE");
  });
  it("uses the firm's own accounts when it chose to pay state fees itself (G1)", () => {
    const client = ClientCompanySettings.parse({ clientCompanyId: "acme", tenantId: "keystone", name: "Acme", policies: { stateFees: "firm_account" }, njAccountCredentialKey: "NJ_ACME", njStoredPaymentMethod: "stored_card", nyDrawdownAccountRef: "DD-ACME" });
    expect(njAccount(tenant, client)).toMatchObject({ credentialKey: "NJ_ACME", profileKey: "nj:acme", owner: "client", paymentTypeLabel: "Credit Card" });
    expect(nyDrawdownAccount(tenant, client)).toBe("DD-ACME");
  });
  it("a firm that pays itself but has no NJ login on file runs signed out, and pre-flight refuses real runs", () => {
    const client = ClientCompanySettings.parse({ clientCompanyId: "acme", tenantId: "keystone", name: "Acme", policies: { stateFees: "firm_account" } });
    expect(njAccount(tenant, client)).toMatchObject({ credentialKey: null, owner: "none" });
  });
  it("signed out when nobody has an NJ login (dry runs only)", () => {
    const bare = TenantSettings.parse({ tenantId: "t", name: "T" });
    const client = ClientCompanySettings.parse({ clientCompanyId: "c", tenantId: "t", name: "C" });
    expect(njAccount(bare, client)).toMatchObject({ credentialKey: null, profileKey: null, owner: "none", feeMethod: "credit_card" });
  });
});
