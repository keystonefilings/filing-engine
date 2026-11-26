import { requireTenant } from "@/lib/session";
import { billingSummary, openBillingPortal, startCheckout } from "@/lib/billing";
import { BillingPanel } from "@/components/BillingPanel";

export const metadata = { title: "Billing" };

export default async function BillingPage({ searchParams }: { searchParams: Promise<{ subscribed?: string }> }) {
  await requireTenant();
  const [summary, q] = await Promise.all([billingSummary(), searchParams]);
  return (
    <div className="stack">
      <h1>Billing</h1>
      {!summary ? <p className="notice bad">Billing couldn&apos;t be loaded. Try again shortly.</p>
        : !summary.billed ? <p className="muted">This account isn&apos;t billed here.</p>
        : <BillingPanel summary={summary} subscribe={startCheckout} manage={openBillingPortal} justSubscribed={q.subscribed === "1"} />}
    </div>
  );
}
