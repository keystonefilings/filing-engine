import "@/styles/components/desk.css";
import "@/styles/components/desk-setup.css";
import { notFound } from "next/navigation";
import { firmContext } from "@/lib/firm";
import { billingSummary, openBillingPortal, setPlanCancelled, startCheckout } from "@/lib/billing";
import { BillingPanel } from "@/components/BillingPanel";
import { PlanMonth, PlanPicker } from "@/components/PlanPicker";
import { AgentServicesPanel } from "@/components/AgentServicesPanel";
import { agentServices } from "@/lib/agent-services";
import { Notice } from "@/components/ui/Sheet";

export const metadata = { title: "Billing" };

/**
 * Billing (V33; decided Nov 27): the firm sees, changes and cancels its plan and reaches its card, billing
 * details and invoices here, plus the businesses on our registered agent service. In CoFile's look (merged spec 10B.18,
 * decision 31): the plan and this month's filings in a 7-column sheet, then the plans; with plan cards there is no single
 * next step, so no Brass, and without them "Subscribe" is the page's Brass.
 */
export default async function BillingPage({ params, searchParams }: { params: Promise<{ slug: string }>; searchParams: Promise<{ subscribed?: string; switched?: string }> }) {
  const { slug } = await params;
  await firmContext(slug);
  const [summary, q, agents] = await Promise.all([billingSummary(), searchParams, agentServices()]);
  if (summary && !summary.billed) notFound();
  return (
    <div className="ds2 ds2-bill">
      <h1>Billing</h1>
      {q.switched === "1" || !summary ? (
        <div className="ds2-notices">
          {q.switched === "1" ? <Notice tone="done" role="status">Your plan is changing. Stripe adjusts this period&apos;s charge for the change, and this page shows the new plan in a moment.</Notice> : null}
          {!summary ? <Notice tone="problem">Billing couldn&apos;t be loaded. Try again shortly.</Notice> : null}
        </div>
      ) : null}
      {!summary ? null
        : summary.partnerPlans ? (
          <>
            <div className="ds2-bill-top">
              <BillingPanel summary={summary} subscribe={startCheckout} manage={openBillingPortal} setCancelled={setPlanCancelled} justSubscribed={q.subscribed === "1"} plans />
              <PlanMonth view={{ currentPlan: summary.currentPlan ?? null, month: summary.month }} />
            </div>
            <h2 id="plans" className="ds2-h2">Plans</h2>
            <PlanPicker view={{ partnerPlans: summary.partnerPlans, payAsYouGo: summary.payAsYouGo!, rolloverMonths: summary.rolloverMonths ?? 1, annualMonthsFree: summary.annualMonthsFree ?? 2, currentPlan: summary.currentPlan ?? null, month: summary.month }} choose={startCheckout} />
          </>
        ) : <div className="ds2-bill-top"><BillingPanel summary={summary} subscribe={startCheckout} manage={openBillingPortal} setCancelled={setPlanCancelled} justSubscribed={q.subscribed === "1"} /></div>}
      {agents && (agents.offer || agents.services.length) ? <AgentServicesPanel offer={agents.offer} services={agents.services} /> : null}
    </div>
  );
}
