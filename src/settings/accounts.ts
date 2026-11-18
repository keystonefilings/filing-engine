import type { ClientCompanySettings, TenantSettings } from "./schema.js";

/**
 * Which state account a run signs in with and how it pays. Keystone has company-wide
 * logins in NJ and NY (2026-11-18), so the tenant's account is the default; a client
 * company may override with its own NJ account.
 */
export interface NjAccount {
  credentialKey: string | null;
  profileKey: string | null;
  storedMethod: "stored_card" | "stored_echeck" | undefined;
  /** Fee-table key for the method the adapters will pick. */
  feeMethod: string;
  /** Option label in NJ's Select Payment Type dropdown. */
  paymentTypeLabel: "Credit Card" | "E-Check";
  owner: "client" | "tenant" | "none";
}

export function njAccount(tenant: TenantSettings, client: ClientCompanySettings): NjAccount {
  // Onboarding G1: only a firm that chose "its own account" pays through its own NJ login.
  const useClient = client.policies.stateFees === "firm_account";
  const credentialKey = useClient ? client.njAccountCredentialKey ?? null : tenant.njAccountCredentialKey ?? null;
  const storedMethod = useClient ? client.njStoredPaymentMethod : tenant.njStoredPaymentMethod;
  return {
    credentialKey,
    profileKey: credentialKey ? (useClient ? `nj:${client.clientCompanyId}` : `nj:${tenant.tenantId}`) : null,
    storedMethod,
    feeMethod: storedMethod ?? "credit_card",
    paymentTypeLabel: storedMethod === "stored_echeck" ? "E-Check" : "Credit Card",
    owner: !credentialKey ? "none" : useClient ? "client" : "tenant",
  };
}

/** NY drawdown account: the firm's own when its G1 answer is "its own account", else Keystone's. */
export function nyDrawdownAccount(tenant: TenantSettings, client: ClientCompanySettings): string | null {
  return client.policies.stateFees === "firm_account" ? client.nyDrawdownAccountRef ?? null : tenant.nyDrawdownAccountRef ?? null;
}
