"use client";

import { useActionState, useState } from "react";
import { Chip, type ChipTone } from "@/components/ui/Chip";
import { Notice } from "@/components/ui/Sheet";

/** Dates as "Dec 1, 2026" (10B.1.2), in UTC so the server's and the browser's renders agree. */
const DAY = new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric", year: "numeric", timeZone: "UTC" });
const usd = (n: number) => new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: n % 1 ? 2 : 0 }).format(n);

/** The price as its figure and the words after it, so the figure can be set in Miller (10B.18). */
const money = (p: { amount: number | null; currency: string; interval?: string; intervalCount?: number }) => {
  if (p.amount === null) return { fig: "Price set at checkout", every: "" };
  const fig = new Intl.NumberFormat("en-US", { style: "currency", currency: p.currency.toUpperCase() }).format(p.amount / 100);
  const every = p.interval ? (p.intervalCount && p.intervalCount > 1 ? ` every ${p.intervalCount} ${p.interval}s` : ` a ${p.interval}`) : "";
  return { fig, every };
};

const STATUS: Record<string, string> = {
  none: "No subscription yet", incomplete: "Waiting for the first payment", incomplete_expired: "The first payment didn't go through",
  trialing: "Free trial", active: "Active", past_due: "Payment failed: Stripe is retrying", canceled: "Canceled", unpaid: "Unpaid", paused: "Paused",
};
/** Each status's chip (10B.18): paid ones Done, waiting ones Attention, failed ones Problem; none or canceled a plain chip with no glyph. */
const TONE: Record<string, ChipTone> = {
  active: "done", trialing: "done", incomplete: "attention", paused: "attention", past_due: "problem", unpaid: "problem", incomplete_expired: "problem",
};

type Summary = {
  plan: string | null; status?: string; canFileLive: boolean; required?: boolean; configured?: boolean; price?: { amount: number | null; currency: string; interval?: string; intervalCount?: number; name?: string } | null; currentPeriodEnd?: string; cancelAtPeriodEnd?: boolean; hasCustomer?: boolean; lastPaymentFailedAt?: string;
  currentPlan?: { id: string; name: string; annual: boolean } | null;
  partnerPlans?: { id: string; monthlyUsd: number; annualUsd?: number }[];
};

/**
 * V33: the account's plan, with Stripe's checkout and customer portal behind the buttons. Decided Nov 27: a
 * partner manages its subscription here: sees the plan, changes it (the plans below), updates its card and
 * billing details and reads its invoices (Stripe's portal), and cancels or keeps the plan (`setCancelled`).
 * In CoFile's look (merged spec 10B.18, 10C.14): the status as a chip with its glyph, the price in Miller.
 */
export function BillingPanel({ summary, subscribe, manage, setCancelled, justSubscribed, plans = false }: {
  summary: Summary;
  subscribe: () => Promise<{ error?: string }>; manage: () => Promise<{ error?: string }>;
  /** Cancel the plan at the end of the paid period (true), or keep it after all (false). */
  setCancelled?: (cancel: boolean) => Promise<{ error?: string }>;
  justSubscribed?: boolean;
  /** Partner plans are chosen below (PlanPicker): no Subscribe button here. */
  plans?: boolean;
}) {
  const [subState, doSubscribe, subPending] = useActionState(async () => subscribe(), {} as { error?: string });
  const [manState, doManage, manPending] = useActionState(async () => manage(), {} as { error?: string });
  const [cancelState, doCancel, cancelPending] = useActionState(async (_: { error?: string }, fd: FormData) => (setCancelled ? setCancelled(fd.get("cancel") === "true") : ({} as { error?: string })), {} as { error?: string });
  const [confirming, setConfirming] = useState(false);
  const status = summary.status ?? "none";
  const subscribed = !["none", "incomplete_expired", "canceled"].includes(status);
  const plan = summary.plan === "enterprise" ? "Enterprise" : summary.currentPlan?.name ?? "Partner";
  const ends = summary.currentPeriodEnd ? DAY.format(new Date(summary.currentPeriodEnd)) : undefined;
  const canCancel = !!setCancelled && subscribed && ["active", "trialing", "past_due"].includes(status);
  const error = subState.error ?? manState.error ?? cancelState.error;
  // A partner plan's own price, from the plans, when Stripe's price isn't named here.
  const own = !summary.price && summary.currentPlan ? summary.partnerPlans?.find((p) => p.id === summary.currentPlan!.id) : undefined;
  const price = summary.price ? { ...money(summary.price), name: summary.price.name && summary.price.name.toLowerCase() !== plan.toLowerCase() ? `${summary.price.name}: ` : "" }
    : own && own.monthlyUsd > 0 ? { name: "", ...(summary.currentPlan!.annual && own.annualUsd ? { fig: usd(own.annualUsd), every: " a year" } : { fig: usd(own.monthlyUsd), every: " a month" }) }
    : null;
  return (
    <div className="card stack ds2-plan" style={{ maxWidth: 560 }}>
      <div className="row ds2-plan-head"><strong>{plan} plan</strong><span className="spacer" /><Chip tone={TONE[status] ?? "neutral"}>{STATUS[status] ?? status}</Chip></div>
      {price ? <p className="ds2-price">{price.name}<span className="ds2-fig">{price.fig}</span>{price.every}</p> : null}
      {ends && subscribed ? <p className="small muted ds2-renews">{summary.cancelAtPeriodEnd ? `Cancelled: your plan ends ${ends}. Until then everything works as usual.` : `Renews ${ends}.`}</p> : null}
      {justSubscribed && status === "none" ? <Notice>Thanks. Stripe is confirming the payment; this page updates in a moment.</Notice> : null}
      {summary.lastPaymentFailedAt ? <Notice tone="problem">The last payment failed. Update the card under Card and billing details.</Notice> : null}
      {summary.required && !summary.canFileLive ? <Notice tone="attention">Real filings need an active subscription. Rehearsals are always free.</Notice> : null}
      {!summary.configured ? <Notice>You can&apos;t subscribe from this page yet. To ask about filing for real, email <a href="mailto:hello@cofile.app">hello@cofile.app</a>.</Notice> : (
        <div className="row ds2-plan-actions">
          {!subscribed && !plans ? <form action={doSubscribe}><button className="btn primary is-main" type="submit" disabled={subPending} aria-busy={subPending || undefined}>{subPending ? "Opening Stripe…" : "Subscribe"}</button></form> : null}
          {plans && subscribed ? <a className="btn" href="#plans">Change plan</a> : null}
          {summary.hasCustomer ? <form action={doManage}><button className="btn" type="submit" disabled={manPending} aria-busy={manPending || undefined}>{manPending ? "Opening…" : "Card and billing details"}</button></form> : null}
          {summary.hasCustomer ? <form action={doManage}><button className="btn" type="submit" disabled={manPending}>Invoices</button></form> : null}
          {canCancel && !summary.cancelAtPeriodEnd && !confirming ? <button className="btn" type="button" onClick={() => setConfirming(true)}>Cancel plan</button> : null}
          {canCancel && summary.cancelAtPeriodEnd ? <form action={doCancel}><input type="hidden" name="cancel" value="false" /><button className="btn primary" type="submit" disabled={cancelPending} aria-busy={cancelPending || undefined}>{cancelPending ? "Saving…" : "Keep my plan"}</button></form> : null}
        </div>
      )}
      {confirming && canCancel && !summary.cancelAtPeriodEnd ? (
        <div className="notice stack ds2-confirm" role="group" aria-label="Cancel your plan">
          <p>Cancel your plan? It stays on until {ends ?? "the end of the period you've paid for"}; after that, live filings need a plan again. Rehearsals stay free, and any registered agent service you use is billed on its own until you cancel it.</p>
          <div className="row">
            <form action={doCancel}><input type="hidden" name="cancel" value="true" /><button className="btn danger" type="submit" disabled={cancelPending} aria-busy={cancelPending || undefined}>{cancelPending ? "Cancelling…" : "Yes, cancel my plan"}</button></form>
            <button className="btn" type="button" onClick={() => setConfirming(false)} disabled={cancelPending}>No, keep it</button>
          </div>
        </div>
      ) : null}
      {error ? <Notice tone="problem" role="alert">{error}</Notice> : null}
      <p className="help ds2-help">Your plan pays for live filings; rehearsals are always free. State fees aren&apos;t included: they&apos;re shown on each proof and paid with the cards you chose in Setup. Stripe handles subscription payments{summary.hasCustomer ? ": your card, billing address, email for receipts and past invoices are under Card and billing details" : ""}.</p>
    </div>
  );
}
