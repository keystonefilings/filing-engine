import type { ClientCompanySettings, TenantSettings } from "../settings/schema.js";
import { effectivePolicies } from "../settings/policies.js";
import type { Store } from "../store/types.js";

/**
 * V18: a stored card's security code. PCI DSS forbids keeping it after a payment, and Basis Theory
 * drops it from stored cards, so the card's owner types it when filings are ready to pay. The code
 * itself sits in Basis Theory as a token that expires within the hour; the engine keeps only that
 * token's id, per card, and every filing waiting for the card pays within that hour.
 *
 * The owner is whoever's card it is: the firm under G1 "own_account", else the subscriber. The client
 * who approves a filing usually is neither, so the code never goes on the approval page.
 */
export interface CardOwner { tenantId: string; clientCompanyId?: string }

export function cardOwnerFor(tenant: TenantSettings, client: ClientCompanySettings): CardOwner {
  return effectivePolicies(tenant, client).stateFees === "own_account"
    ? { tenantId: client.tenantId, clientCompanyId: client.clientCompanyId }
    : { tenantId: tenant.tenantId };
}

export const sameOwner = (a: CardOwner, b: CardOwner) => a.tenantId === b.tenantId && (a.clientCompanyId ?? null) === (b.clientCompanyId ?? null);

/** The longest a code is kept; Basis Theory deletes the token at its own expiry too. */
export const CODE_LIFE_MS = 60 * 60_000;
/** A run starts only with this much of the code's life left, enough to reach the payment screen. */
export const CODE_MIN_LEFT_MS = 15 * 60_000;

interface CodeRecord { tokenId: string; expiresAt: string; by?: string }

export class CardCodes {
  private readonly now: () => Date;
  constructor(private readonly store: Store, now?: () => Date) { this.now = now ?? (() => new Date()); }

  private key(o: CardOwner, methodId: string): string {
    return `cardcode:${o.tenantId}:${o.clientCompanyId ?? "-"}:${methodId}`;
  }

  /** Keeps the code's token id until it expires (at most an hour from now). Returns the expiry used. */
  async put(o: CardOwner, methodId: string, tokenId: string, expiresAt?: string, by?: string): Promise<string> {
    const cap = this.now().getTime() + CODE_LIFE_MS;
    const asked = expiresAt ? Date.parse(expiresAt) : NaN;
    const exp = new Date(Number.isFinite(asked) ? Math.min(asked, cap) : cap).toISOString();
    const rec: CodeRecord = { tokenId, expiresAt: exp, ...(by ? { by } : {}) };
    await this.store.putVaultSecret(this.key(o, methodId), o.tenantId, JSON.stringify(rec));
    return exp;
  }

  /** The code's token id while it has at least minLeftMs of life left; an expired one is deleted. */
  async fresh(o: CardOwner, methodId: string, minLeftMs = 0): Promise<string | null> {
    const raw = await this.store.getVaultSecret(this.key(o, methodId));
    if (!raw) return null;
    let rec: CodeRecord;
    try { rec = JSON.parse(raw) as CodeRecord; } catch { return null; }
    const left = Date.parse(rec.expiresAt) - this.now().getTime();
    if (left <= 0) { await this.store.deleteVaultSecret(this.key(o, methodId)).catch(() => {}); return null; }
    return left >= minLeftMs ? rec.tokenId : null;
  }

  async clear(o: CardOwner, methodId: string): Promise<void> {
    await this.store.deleteVaultSecret(this.key(o, methodId));
  }
}
