/**
 * Secrets never live in settings rows or on the worker's disk. The worker fetches
 * them at run time through this interface. EnvVault is for development only.
 */
export interface Credential {
  username?: string;
  password?: string;
  totpSeed?: string;
  extra?: Record<string, string>;
}

export interface Vault {
  getCredential(key: string): Promise<Credential | null>;
}

/**
 * Development vault: reads VAULT_<KEY>_USERNAME / _PASSWORD / _TOTP_SEED, where KEY is the
 * scoped key upper-cased with non-alphanumerics as "_" ("keystone/NYGOV" -> VAULT_KEYSTONE_NYGOV_...).
 */
export class EnvVault implements Vault {
  constructor(private readonly env: NodeJS.ProcessEnv = process.env) {}
  async getCredential(key: string): Promise<Credential | null> {
    const k = key.toUpperCase().replace(/[^A-Z0-9]/g, "_");
    const username = this.env[`VAULT_${k}_USERNAME`];
    const password = this.env[`VAULT_${k}_PASSWORD`];
    const totpSeed = this.env[`VAULT_${k}_TOTP_SEED`];
    if (!username && !password && !totpSeed) return null;
    return { username, password, totpSeed };
  }
}

export class InMemoryVault implements Vault {
  private readonly map = new Map<string, Credential>();
  set(key: string, cred: Credential): void {
    this.map.set(key, cred);
  }
  async getCredential(key: string): Promise<Credential | null> {
    return this.map.get(key) ?? null;
  }
}
