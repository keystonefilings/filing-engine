import type { ClientCompanySettings, TenantSettings } from "./schema.js";
import { effectivePolicies } from "./policies.js";

/**
 * Which state account a run signs in with and how it pays. The service company's own
 * accounts are the default; a customer firm uses its own only when its answer G1 is
 * "own_account". Vault keys are scoped per tenant (and per firm) so one tenant's logins
 * can never be used for another's filings.
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
  const useClient = effectivePolicies(tenant, client).stateFees === "own_account";
  const credentialKey = useClient
    ? (client.njAccountCredentialKey ? firmVaultKey(tenant, client, client.njAccountCredentialKey) : null)
    : (tenant.njAccountCredentialKey ? tenantVaultKey(tenant, tenant.njAccountCredentialKey) : null);
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

/**
 * Missouri SOS online filing account: the service company's own, or the firm's when its
 * answer G1 is "own_account". Missouri pays by credit card or eCheck at the cart; there is
 * no stored drawdown, so the fee method comes from the account owner's moPaymentMethod.
 */
export interface MoAccount {
  credentialKey: string | null;
  profileKey: string | null;
  feeMethod: "credit_card" | "echeck";
  paymentTypeLabel: "Credit Card" | "Electronic Check";
  owner: "client" | "tenant" | "none";
}

export function moAccount(tenant: TenantSettings, client: ClientCompanySettings): MoAccount {
  const useClient = effectivePolicies(tenant, client).stateFees === "own_account";
  const credentialKey = useClient
    ? (client.moAccountCredentialKey ? firmVaultKey(tenant, client, client.moAccountCredentialKey) : null)
    : (tenant.moAccountCredentialKey ? tenantVaultKey(tenant, tenant.moAccountCredentialKey) : null);
  const feeMethod = tenant.moPaymentMethod;
  return {
    credentialKey,
    profileKey: credentialKey ? (useClient ? `mo:${client.clientCompanyId}` : `mo:${tenant.tenantId}`) : null,
    feeMethod,
    paymentTypeLabel: feeMethod === "echeck" ? "Electronic Check" : "Credit Card",
    owner: !credentialKey ? "none" : useClient ? "client" : "tenant",
  };
}

/** NY drawdown account: the firm's own when its G1 answer is "own_account", else the service company's. */
export function nyDrawdownAccount(tenant: TenantSettings, client: ClientCompanySettings): string | null {
  return effectivePolicies(tenant, client).stateFees === "own_account" ? client.nyDrawdownAccountRef ?? null : tenant.nyDrawdownAccountRef ?? null;
}

/** Vault keys are namespaced so tenants (and firms) can never read each other's logins. */
export function tenantVaultKey(tenant: TenantSettings, key: string): string {
  return `${tenant.tenantId}/${key}`;
}
export function firmVaultKey(tenant: TenantSettings, client: ClientCompanySettings, key: string): string {
  return `${tenant.tenantId}/${client.clientCompanyId}/${key}`;
}
