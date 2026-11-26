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
  /** The NJ account's saved method is chosen for this filing type, but no NJ login is connected. */
  portalPaymentWithoutLogin: boolean;
  /** The per-type setting has the NJ account's saved method pay: no card saved with us is used. */
  paidByPortalAccount: boolean;
  /** Fee-table key for the method the adapters will pick. */
  feeMethod: string;
  /** Option label in NJ's Select Payment Type dropdown. */
  paymentTypeLabel: "Credit Card" | "E-Check";
  owner: "client" | "tenant" | "none";
}

export function njAccount(tenant: TenantSettings, client: ClientCompanySettings, filingKind?: string): NjAccount {
  // Onboarding G1: only a firm that chose "its own account" pays through its own NJ login.
  const useClient = effectivePolicies(tenant, client).stateFees === "own_account";
  const credentialKey = useClient
    ? (client.njAccountCredentialKey ? firmVaultKey(tenant, client, client.njAccountCredentialKey) : null)
    : (tenant.njAccountCredentialKey ? tenantVaultKey(tenant, tenant.njAccountCredentialKey) : null);
  // Yakov (Nov 26): per filing type, the NJ account's own saved method pays instead of a card saved
  // with us. Without that setting, the older account-wide one applies to every NJ filing.
  const portal = (useClient ? client.payments : tenant.payments)?.routing.statePortal?.NJ;
  const legacy = useClient ? client.njStoredPaymentMethod : tenant.njStoredPaymentMethod;
  const wanted = portal ? (filingKind && (portal.kinds as string[]).includes(filingKind) ? portal.method : undefined) : undefined;
  // The per-type setting needs the NJ login (the saved method lives in that account); the older
  // account-wide setting keeps its behaviour.
  const storedMethod = portal ? (wanted && credentialKey ? wanted : undefined) : legacy;
  return {
    credentialKey,
    profileKey: credentialKey ? (useClient ? `nj:${client.clientCompanyId}` : `nj:${tenant.tenantId}`) : null,
    storedMethod,
    portalPaymentWithoutLogin: !!wanted && !credentialKey,
    paidByPortalAccount: !!portal && !!storedMethod,
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

/**
 * Florida Sunbiz filing: the form needs no login (anonymous), so there is no persistent
 * profile. Payment is a credit card entered at the tap, or the service company's prepaid
 * Sunbiz E-file account (a firm's own under answer G1 = own_account).
 */
export interface FlAccount {
  paymentMethod: "credit_card" | "sunbiz_account";
  accountCredentialKey: string | null;
  feeMethod: "credit_card" | "sunbiz_account";
  owner: "client" | "tenant" | "none";
}

export function flAccount(tenant: TenantSettings, client: ClientCompanySettings): FlAccount {
  const method = tenant.flPaymentMethod;
  if (method !== "sunbiz_account") return { paymentMethod: "credit_card", accountCredentialKey: null, feeMethod: "credit_card", owner: "none" };
  const useClient = effectivePolicies(tenant, client).stateFees === "own_account";
  const accountCredentialKey = useClient
    ? (client.flSunbizAccountCredentialKey ? firmVaultKey(tenant, client, client.flSunbizAccountCredentialKey) : null)
    : (tenant.flSunbizAccountCredentialKey ? tenantVaultKey(tenant, tenant.flSunbizAccountCredentialKey) : null);
  return {
    paymentMethod: "sunbiz_account",
    accountCredentialKey,
    feeMethod: "sunbiz_account",
    owner: !accountCredentialKey ? "none" : useClient ? "client" : "tenant",
  };
}

/** Vault keys are namespaced so tenants (and firms) can never read each other's logins. */
export function tenantVaultKey(tenant: TenantSettings, key: string): string {
  return `${tenant.tenantId}/${key}`;
}
export function firmVaultKey(tenant: TenantSettings, client: ClientCompanySettings, key: string): string {
  return `${tenant.tenantId}/${client.clientCompanyId}/${key}`;
}
