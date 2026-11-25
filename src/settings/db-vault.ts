import type { FieldCipher } from "../store/sensitive.js";
import type { Store } from "../store/types.js";
import type { Credential, Vault } from "./vault.js";

/**
 * V29: state portal logins a subscriber connects in its dashboard, sealed with AES-256-GCM under
 * DATA_ENCRYPTION_KEY (the same key as SSNs) in the database. Write-only from the API's side: a
 * login is never sent back, only when it was connected and by whom. Keys stay namespaced per
 * tenant ("<tenant>/<key>", settings/accounts.ts), so one subscriber's login never runs another's filing.
 */
export class DbVault implements Vault {
  constructor(private readonly store: Store, private readonly cipher: FieldCipher) {}
  async getCredential(key: string): Promise<Credential | null> {
    const sealed = await this.store.getVaultSecret(key);
    return sealed ? (JSON.parse(this.cipher.open(sealed)) as Credential) : null;
  }
  async put(key: string, tenantId: string, cred: Credential): Promise<void> {
    await this.store.putVaultSecret(key, tenantId, this.cipher.seal(JSON.stringify(cred)));
  }
  async remove(key: string): Promise<void> {
    await this.store.deleteVaultSecret(key);
  }
}

/** Reads the first vault that has the key: connected logins first, then environment variables. */
export class ChainVault implements Vault {
  constructor(private readonly vaults: Vault[]) {}
  async getCredential(key: string): Promise<Credential | null> {
    for (const v of this.vaults) { const c = await v.getCredential(key); if (c) return c; }
    return null;
  }
}

/** Which tenant setting names each portal's login in the vault, and its key when unset. */
export const PORTAL_LOGIN_KEYS: Record<string, { setting: "nyGovCredentialKey" | "nyPayrollCredentialKey" | "njAccountCredentialKey" | "flSunbizAccountCredentialKey" | "moAccountCredentialKey"; fallback: string }> = {
  "ny-dos": { setting: "nyGovCredentialKey", fallback: "NYGOV" },
  "ny-gov": { setting: "nyPayrollCredentialKey", fallback: "NYGOV_BUSINESS" },
  "mo-sos": { setting: "moAccountCredentialKey", fallback: "MO" },
  "nj-portal": { setting: "njAccountCredentialKey", fallback: "NJ" },
  "fl-sunbiz": { setting: "flSunbizAccountCredentialKey", fallback: "FL_SUNBIZ" },
};
