import { notFound } from "next/navigation";
import { firmContext } from "@/lib/firm";
import { billingSummary, openBillingPortal, startCheckout } from "@/lib/billing";
import { BillingPanel } from "@/components/BillingPanel";
import { PlanPicker } from "@/components/PlanPicker";
import { AgentServicesPanel } from "@/components/AgentServicesPanel";
import { agentServices } from "@/lib/agent-services";

export const metadata = { title: "Billing" };

export default async function BillingPage({ params, searchParams }: { params: Promise<{ slug: string }>; searchParams: Promise<{ subscribed?: string; switched?: string }> }) {
  const { slug } = await params;
  await firmContext(slug);
  const [summary, q, agents] = await Promise.all([billingSummary(), searchParams, agentServices()]);
  if (summary && !summary.billed) notFound();
  return (
    <div className="stack">
      <h1>Billing</h1>
      {q.switched === "1" ? <p className="notice ok" role="status">Your plan is changing. Stripe adjusts this period&apos;s charge for the change, and this page shows the new plan in a moment.</p> : null}
      {!summary ? <p className="notice bad">Billing couldn&apos;t be loaded. Try again shortly.</p>
        : summary.partnerPlans ? (
          <>
            <BillingPanel summary={summary} subscribe={startCheckout} manage={openBillingPortal} justSubscribed={q.subscribed === "1"} plans />
            <PlanPicker view={{ partnerPlans: summary.partnerPlans, payAsYouGo: summary.payAsYouGo!, rolloverMonths: summary.rolloverMonths ?? 1, annualMonthsFree: summary.annualMonthsFree ?? 2, currentPlan: summary.currentPlan ?? null, month: summary.month }} choose={startCheckout} />
          </>
        ) : <BillingPanel summary={summary} subscribe={startCheckout} manage={openBillingPortal} justSubscribed={q.subscribed === "1"} />}
      {agents && (agents.offer || agents.services.length) ? <AgentServicesPanel offer={agents.offer} services={agents.services} /> : null}
    </div>
  );
}
