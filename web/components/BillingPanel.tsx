"use client";

import { useActionState, useState } from "react";

const money = (p: { amount: number | null; currency: string; interval?: string; intervalCount?: number }) => {
  if (p.amount === null) return "Price set at checkout";
  const v = new Intl.NumberFormat("en-US", { style: "currency", currency: p.currency.toUpperCase() }).format(p.amount / 100);
  const every = p.interval ? (p.intervalCount && p.intervalCount > 1 ? ` every ${p.intervalCount} ${p.interval}s` : ` a ${p.interval}`) : "";
  return `${v}${every}`;
};

const STATUS: Record<string, string> = {
  none: "No subscription yet", incomplete: "Waiting for the first payment", incomplete_expired: "The first payment didn't go through",
  trialing: "Free trial", active: "Active", past_due: "Payment failed: Stripe is retrying", canceled: "Canceled", unpaid: "Unpaid", paused: "Paused",
};

/**
 * V33: the account's plan, with Stripe's checkout and customer portal behind the buttons. Decided Nov 27: a
 * partner manages its subscription here: sees the plan, changes it (the plans below), updates its card and
 * billing details and reads its invoices (Stripe's portal), and cancels or keeps the plan (`setCancelled`).
 */
export function BillingPanel({ summary, subscribe, manage, setCancelled, justSubscribed, plans = false }: {
  summary: { plan: string | null; status?: string; canFileLive: boolean; required?: boolean; configured?: boolean; price?: { amount: number | null; currency: string; interval?: string; intervalCount?: number; name?: string } | null; currentPeriodEnd?: string; cancelAtPeriodEnd?: boolean; hasCustomer?: boolean; lastPaymentFailedAt?: string };
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
  const plan = summary.plan === "enterprise" ? "Enterprise" : (summary as { currentPlan?: { name: string } | null }).currentPlan?.name ?? "Partner";
  const ends = summary.currentPeriodEnd ? new Date(summary.currentPeriodEnd).toLocaleDateString() : undefined;
  const canCancel = !!setCancelled && subscribed && ["active", "trialing", "past_due"].includes(status);
  const error = subState.error ?? manState.error ?? cancelState.error;
  return (
    <div className="card stack" style={{ maxWidth: 560 }}>
      <div className="row"><strong>{plan} plan</strong><span className="spacer" /><span className={`badge ${status === "active" || status === "trialing" ? "ok" : status === "none" ? "" : "warn"}`}>{STATUS[status] ?? status}</span></div>
      {summary.price ? <p style={{ margin: 0 }}>{summary.price.name && summary.price.name.toLowerCase() !== plan.toLowerCase() ? `${summary.price.name}: ` : ""}{money(summary.price)}</p> : null}
      {justSubscribed && status === "none" ? <p className="notice">Thanks. Stripe is confirming the payment; this page updates in a moment.</p> : null}
      {ends && subscribed ? <p className="small muted" style={{ margin: 0 }}>{summary.cancelAtPeriodEnd ? `Cancelled: your plan ends ${ends}. Until then everything works as usual.` : `Renews ${ends}.`}</p> : null}
      {summary.lastPaymentFailedAt ? <p className="notice warn">The last payment failed. Update the card under Card and billing details.</p> : null}
      {summary.required && !summary.canFileLive ? <p className="notice warn">Real filings need an active subscription. Rehearsals are always free.</p> : null}
      {!summary.configured ? <p className="notice">You can&apos;t subscribe from this page yet. To ask about filing for real, email <a href="mailto:hello@cofile.app">hello@cofile.app</a>.</p> : (
        <div className="row" style={{ flexWrap: "wrap", gap: 8 }}>
          {!subscribed && !plans ? <form action={doSubscribe}><button className="btn primary" type="submit" disabled={subPending}>{subPending ? "Opening Stripe…" : "Subscribe"}</button></form> : null}
          {plans && subscribed ? <a className="btn" href="#plans">Change plan</a> : null}
          {summary.hasCustomer ? <form action={doManage}><button className="btn" type="submit" disabled={manPending}>{manPending ? "Opening…" : "Card and billing details"}</button></form> : null}
          {summary.hasCustomer ? <form action={doManage}><button className="btn" type="submit" disabled={manPending}>Invoices</button></form> : null}
          {canCancel && !summary.cancelAtPeriodEnd && !confirming ? <button className="btn" type="button" onClick={() => setConfirming(true)}>Cancel plan</button> : null}
          {canCancel && summary.cancelAtPeriodEnd ? <form action={doCancel}><input type="hidden" name="cancel" value="false" /><button className="btn primary" type="submit" disabled={cancelPending}>{cancelPending ? "Saving…" : "Keep my plan"}</button></form> : null}
        </div>
      )}
      {confirming && canCancel && !summary.cancelAtPeriodEnd ? (
        <div className="notice stack" role="group" aria-label="Cancel your plan">
          <p style={{ margin: 0 }}>Cancel your plan? It stays on until {ends ?? "the end of the period you've paid for"}; after that, live filings need a plan again. Rehearsals stay free, and any registered agent service you use is billed on its own until you cancel it.</p>
          <div className="row">
            <form action={doCancel}><input type="hidden" name="cancel" value="true" /><button className="btn primary" type="submit" disabled={cancelPending}>{cancelPending ? "Cancelling…" : "Yes, cancel my plan"}</button></form>
            <button className="btn" type="button" onClick={() => setConfirming(false)} disabled={cancelPending}>No, keep it</button>
          </div>
        </div>
      ) : null}
      {error ? <p className="notice bad" role="alert">{error}</p> : null}
      <p className="help">Your plan pays for live filings; rehearsals are always free. State fees aren&apos;t included: they&apos;re shown on each proof and paid with the cards you chose in Setup. Stripe handles subscription payments{summary.hasCustomer ? ": your card, billing address, email for receipts and past invoices are under Card and billing details" : ""}.</p>
    </div>
  );
}
