import { njAccount } from "../settings/accounts.js";
import { filingKindOf } from "../settings/payments.js";
import type { ClientCompanySettings, TenantSettings } from "../settings/schema.js";
import { effectivePolicies } from "../settings/policies.js";
import { stateFeeCards, type PaymentMethodRef } from "../settings/payments.js";
import type { FilingRecord } from "../store/types.js";

/**
 * V18 (decision 8): customers' own cards live in Basis Theory, collected in Basis Theory's own fields
 * in the browser (the number never reaches our servers). The engine keeps only the token, and reads
 * the card back at the state's payment screen. The security code (CVC) can't be kept after use (PCI
 * DSS), so the card's owner types it when filings are ready to pay (payments/card-codes.ts).
 */
export interface CardData { number: string; expMonth: number; expYear: number; cvc?: string }

export interface CardVault {
  getCard(tokenId: string): Promise<CardData | null>;
  /** A security code the owner typed: a short-lived token holding { cvc }. */
  getCode(tokenId: string): Promise<string | null>;
}

export class BasisTheoryCardVault implements CardVault {
  private readonly fetchImpl: typeof fetch;
  constructor(private readonly opts: { apiKey: string; apiUrl?: string; fetchImpl?: typeof fetch }) {
    this.fetchImpl = opts.fetchImpl ?? fetch;
  }
  private async token(tokenId: string): Promise<{ data?: unknown } | null> {
    if (!/^[0-9a-f-]{36}$/i.test(tokenId)) return null;
    const res = await this.fetchImpl(`${this.opts.apiUrl ?? "https://api.basistheory.com"}/tokens/${tokenId}`, {
      headers: { "BT-API-KEY": this.opts.apiKey }, signal: AbortSignal.timeout(15_000),
    });
    if (res.status === 404) return null;
    if (!res.ok) throw new Error(`basis theory ${res.status}`);
    return (await res.json()) as { data?: unknown };
  }
  async getCard(tokenId: string): Promise<CardData | null> {
    const t = await this.token(tokenId);
    const d = t?.data as { number?: string; expiration_month?: number | string; expiration_year?: number | string; cvc?: string } | undefined;
    if (!d?.number) return null;
    return { number: String(d.number), expMonth: Number(d.expiration_month), expYear: Number(d.expiration_year), ...(d.cvc ? { cvc: String(d.cvc) } : {}) };
  }
  async getCode(tokenId: string): Promise<string | null> {
    const d = (await this.token(tokenId))?.data;
    const cvc = typeof d === "string" ? d : (d as { cvc?: unknown } | undefined)?.cvc;
    return typeof cvc === "string" && /^\d{3,4}$/.test(cvc) ? cvc : null;
  }
}

/** Whose cards pay a filing's state fees: the firm's own under G1 "own_account", else the subscriber's. */
export function cardRefsForFiling(filing: FilingRecord, tenant: TenantSettings, client: ClientCompanySettings): PaymentMethodRef[] {
  const own = effectivePolicies(tenant, client).stateFees === "own_account";
  const kind = filingKindOf(filing.request);
  if (filing.request.state === "NJ" && njAccount(tenant, client, kind).paidByPortalAccount) return []; // the NJ account's saved method pays
  return stateFeeCards(own ? client.payments : tenant.payments, kind);
}

/**
 * The cards to try at a payment screen, in order (the filing's card, then the backup), read from the
 * vault only when the adapter asks. cvc: the security code the client gave with their approval.
 */
export async function cardsForPayment(vault: CardVault, refs: PaymentMethodRef[], cvcFor?: (ref: PaymentMethodRef) => Promise<string | undefined>): Promise<(CardData & { label: string; last4?: string })[]> {
  const out: (CardData & { label: string; last4?: string })[] = [];
  for (const r of refs) {
    const card = await vault.getCard(r.providerRef);
    if (!card) continue;
    const cvc = card.cvc ?? (cvcFor ? await cvcFor(r) : undefined);
    out.push({ ...card, ...(cvc ? { cvc } : {}), label: r.label, last4: r.last4 });
  }
  return out;
}
