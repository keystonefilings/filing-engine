"use server";

import { revalidatePath } from "next/cache";
import { engine, EngineError } from "./engine";
import { readSession } from "./session";
import type { AddCardResult } from "@/components/AddCard";

/** V18: saves a Basis Theory card token for the signed-in enterprise or partner firm. */
export async function saveCard(card: { tokenId: string; label: string; brand?: string; last4?: string; purpose: string }): Promise<AddCardResult> {
  const s = await readSession();
  if (!s) return { ok: false, error: "Sign in again." };
  const body = { provider: "basis_theory", providerRef: card.tokenId, label: card.label.slice(0, 60), brand: card.brand, last4: card.last4, purpose: card.purpose };
  const path = s.kind === "firm" ? `/v1/client-companies/${encodeURIComponent(s.clientCompanyId)}/payment-methods` : "/v1/account/payment-methods";
  try {
    await engine(s.apiKey, path, { method: "POST", body });
  } catch (e) {
    return { ok: false, error: e instanceof EngineError && e.status === 409 ? "Ten cards at most: remove one first." : "The card wasn't saved. Try again." };
  }
  revalidatePath(s.kind === "firm" ? `/p/${encodeURIComponent(s.slug)}/setup/payments` : "/dashboard/setup");
  return { ok: true };
}

export async function removeCard(methodId: string): Promise<void> {
  const s = await readSession();
  if (!s) return;
  const path = s.kind === "firm" ? `/v1/client-companies/${encodeURIComponent(s.clientCompanyId)}/payment-methods/${encodeURIComponent(methodId)}` : `/v1/account/payment-methods/${encodeURIComponent(methodId)}`;
  await engine(s.apiKey, path, { method: "DELETE" }).catch(() => undefined);
  revalidatePath(s.kind === "firm" ? `/p/${encodeURIComponent(s.slug)}/setup/payments` : "/dashboard/setup");
}

export type WaitingCard = { methodId: string; card: string; last4?: string; owner: { clientCompanyId?: string; name?: string }; filings: { id: string; title: string; since: string }[] };

/** Filings approved and waiting for a card's security code: the firm's own, or the whole account's. */
export async function waitingForCardCodes(): Promise<WaitingCard[]> {
  const s = await readSession();
  if (!s) return [];
  const path = s.kind === "firm" ? `/v1/client-companies/${encodeURIComponent(s.clientCompanyId)}/card-codes` : "/v1/account/card-codes";
  return (await engine<{ waiting: WaitingCard[] }>(s.apiKey, path).catch(() => ({ waiting: [] }))).waiting;
}

/** V18: sends the id of the short-lived token holding a card's security code. */
export async function saveCardCode(methodId: string, firmId: string | undefined, tokenId: string, expiresAt: string): Promise<{ ok: boolean; error?: string; queued?: number }> {
  const s = await readSession();
  if (!s) return { ok: false, error: "Sign in again." };
  // A firm session only ever names its own firm; the engine checks the rest.
  const firm = s.kind === "firm" ? s.clientCompanyId : firmId;
  const path = firm
    ? `/v1/client-companies/${encodeURIComponent(firm)}/payment-methods/${encodeURIComponent(methodId)}/code`
    : `/v1/account/payment-methods/${encodeURIComponent(methodId)}/code`;
  try {
    const r = await engine<{ queued: string[] }>(s.apiKey, path, { method: "POST", body: { tokenId, expiresAt } });
    revalidatePath(s.kind === "firm" ? `/p/${encodeURIComponent(s.slug)}` : "/dashboard", "layout");
    return { ok: true, queued: r.queued.length };
  } catch {
    return { ok: false, error: "The code wasn't sent. Try again." };
  }
}
