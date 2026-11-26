"use client";

import { useActionState } from "react";

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

/** V33: the account's plan, with Stripe's checkout and customer portal behind the buttons. */
export function BillingPanel({ summary, subscribe, manage, justSubscribed }: {
  summary: { plan: string | null; status?: string; canFileLive: boolean; required?: boolean; configured?: boolean; price?: { amount: number | null; currency: string; interval?: string; intervalCount?: number; name?: string } | null; currentPeriodEnd?: string; cancelAtPeriodEnd?: boolean; hasCustomer?: boolean; lastPaymentFailedAt?: string };
  subscribe: () => Promise<{ error?: string }>; manage: () => Promise<{ error?: string }>; justSubscribed?: boolean;
}) {
  const [subState, doSubscribe, subPending] = useActionState(async () => subscribe(), {} as { error?: string });
  const [manState, doManage, manPending] = useActionState(async () => manage(), {} as { error?: string });
  const status = summary.status ?? "none";
  const subscribed = !["none", "incomplete_expired", "canceled"].includes(status);
  const plan = summary.plan === "enterprise" ? "Enterprise" : "Partner";
  return (
    <div className="card stack" style={{ maxWidth: 560 }}>
      <div className="row"><strong>{plan} plan</strong><span className="spacer" /><span className={`badge ${status === "active" || status === "trialing" ? "ok" : status === "none" ? "" : "warn"}`}>{STATUS[status] ?? status}</span></div>
      {summary.price ? <p style={{ margin: 0 }}>{summary.price.name && summary.price.name.toLowerCase() !== plan.toLowerCase() ? `${summary.price.name}: ` : ""}{money(summary.price)}</p> : null}
      {justSubscribed && status === "none" ? <p className="notice">Thanks. Stripe is confirming the payment; this page updates in a moment.</p> : null}
      {summary.currentPeriodEnd && subscribed ? <p className="small muted" style={{ margin: 0 }}>{summary.cancelAtPeriodEnd ? "Ends" : "Renews"} {new Date(summary.currentPeriodEnd).toLocaleDateString()}.</p> : null}
      {summary.lastPaymentFailedAt ? <p className="notice warn">The last payment failed. Update the card under Manage billing.</p> : null}
      {summary.required && !summary.canFileLive ? <p className="notice warn">Real filings need an active subscription. Practice filings are always free.</p> : null}
      {!summary.configured ? <p className="notice">Subscriptions aren&apos;t switched on for this site yet.</p> : (
        <div className="row">
          {!subscribed ? <form action={doSubscribe}><button className="btn primary" type="submit" disabled={subPending}>{subPending ? "Opening Stripe…" : "Subscribe"}</button></form> : null}
          {summary.hasCustomer ? <form action={doManage}><button className="btn" type="submit" disabled={manPending}>{manPending ? "Opening…" : "Manage billing"}</button></form> : null}
        </div>
      )}
      {subState.error || manState.error ? <p className="notice bad" role="alert">{subState.error ?? manState.error}</p> : null}
      <p className="help">Your subscription lets you file for real; practice filings are always free. State fees aren&apos;t included: they&apos;re shown on each approval page and paid with the cards you chose in Setup. Stripe handles subscription payments; card changes, receipts and canceling are under Manage billing.</p>
    </div>
  );
}
