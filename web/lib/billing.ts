"use server";

import { redirect } from "next/navigation";
import { engine } from "./engine";
import { readSession } from "./session";

/** V33: the signed-in account's subscription (Stripe Billing, through the engine). */
export type BillingSummary = {
  billed: boolean; plan: "enterprise" | "partner" | null; status?: string; canFileLive: boolean; required?: boolean; configured?: boolean;
  price?: { amount: number | null; currency: string; interval?: string; intervalCount?: number; name?: string } | null;
  currentPeriodEnd?: string; cancelAtPeriodEnd?: boolean; hasCustomer?: boolean; lastPaymentFailedAt?: string;
} & Partial<PartnerPricingView>;

/** Partner pricing (Nov 26), as the engine shows it on a partner firm's billing page. */
export interface PartnerPlanView { id: string; name: string; monthlyUsd: number; annualUsd?: number; included: number; extraUsd?: number; fairUse?: boolean; priorityHelp?: boolean; blurb?: string; monthlyAvailable: boolean; annualAvailable: boolean }
export interface PartnerPricingView {
  partnerPlans: PartnerPlanView[];
  payAsYouGo: { filing: number; ein_only: number; record: number };
  rolloverMonths: number; annualMonthsFree: number;
  currentPlan: { id: string; name: string; annual: boolean } | null;
  month?: { start: string; end: string; used: number; included: number; rolledOver: number; allowance: number; chargedUsd: number; filings: number };
}

const base = (s: NonNullable<Awaited<ReturnType<typeof readSession>>>) =>
  s.kind === "firm" ? `/v1/client-companies/${encodeURIComponent(s.clientCompanyId)}/billing` : "/v1/account/billing";

export async function billingSummary(): Promise<BillingSummary | null> {
  const s = await readSession();
  if (!s) return null;
  return engine<BillingSummary>(s.apiKey, base(s)).catch(() => null);
}

/** Sends the browser to Stripe Checkout; Stripe brings it back to the billing page. A partner firm names its plan. */
export async function startCheckout(choice?: { plan: string; annual: boolean }): Promise<{ error?: string }> {
  const s = await readSession();
  if (!s) return { error: "Sign in again." };
  let url: string;
  try {
    url = (await engine<{ url: string }>(s.apiKey, `${base(s)}/checkout`, { method: "POST", body: choice ? { plan: choice.plan, annual: choice.annual } : {} })).url;
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
