"use server";

import { redirect } from "next/navigation";
import { engine } from "./engine";
import { readSession } from "./session";

/** V33: the signed-in account's subscription (Stripe Billing, through the engine). */
export type BillingSummary = {
  billed: boolean; plan: "enterprise" | "partner" | null; status?: string; canFileLive: boolean; required?: boolean; configured?: boolean;
  price?: { amount: number | null; currency: string; interval?: string; intervalCount?: number; name?: string } | null;
  currentPeriodEnd?: string; cancelAtPeriodEnd?: boolean; hasCustomer?: boolean; lastPaymentFailedAt?: string;
};

const base = (s: NonNullable<Awaited<ReturnType<typeof readSession>>>) =>
  s.kind === "firm" ? `/v1/client-companies/${encodeURIComponent(s.clientCompanyId)}/billing` : "/v1/account/billing";

export async function billingSummary(): Promise<BillingSummary | null> {
  const s = await readSession();
  if (!s) return null;
  return engine<BillingSummary>(s.apiKey, base(s)).catch(() => null);
}

/** Sends the browser to Stripe Checkout; Stripe brings it back to the billing page. */
export async function startCheckout(): Promise<{ error?: string }> {
  const s = await readSession();
  if (!s) return { error: "Sign in again." };
  let url: string;
  try {
    url = (await engine<{ url: string }>(s.apiKey, `${base(s)}/checkout`, { method: "POST", body: {} })).url;
  } catch {
    return { error: "Billing isn't available right now. Try again in a few minutes." };
  }
  redirect(url);
}

/** Stripe's own page to change the card, see invoices or cancel. */
export async function openBillingPortal(): Promise<{ error?: string }> {
  const s = await readSession();
  if (!s) return { error: "Sign in again." };
  let url: string;
  try {
    url = (await engine<{ url: string }>(s.apiKey, `${base(s)}/portal`, { method: "POST", body: {} })).url;
  } catch {
    return { error: "Billing isn't available right now. Try again in a few minutes." };
  }
  redirect(url);
}
