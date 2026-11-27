import { requireTenant } from "@/lib/session";
import { billingSummary, openBillingPortal, startCheckout } from "@/lib/billing";
import { BillingPanel } from "@/components/BillingPanel";
import { Notice } from "@/components/ui/Sheet";

export const metadata = { title: "Billing" };

/** Billing (merged spec 10C.14): the plan card, its price in Miller, "Subscribe" the one Brass action. */
export default async function BillingPage({ searchParams }: { searchParams: Promise<{ subscribed?: string }> }) {
  await requireTenant();
  const [summary, q] = await Promise.all([billingSummary(), searchParams]);
  return (
    <div className="dash2-billing">
      <h1>Billing</h1>
      {!summary ? <Notice tone="problem">Billing couldn&apos;t be loaded. Try again shortly.</Notice>
        : !summary.billed ? <p className="muted">This account isn&apos;t billed here.</p>
        : <BillingPanel summary={summary} subscribe={startCheckout} manage={openBillingPortal} justSubscribed={q.subscribed === "1"} />}
    </div>
  );
}
