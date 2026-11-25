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
