import { notFound } from "next/navigation";
import { firmContext } from "@/lib/firm";
import { billingSummary, openBillingPortal, startCheckout } from "@/lib/billing";
import { BillingPanel } from "@/components/BillingPanel";
import { AgentServicesPanel } from "@/components/AgentServicesPanel";
import { agentServices } from "@/lib/agent-services";

export const metadata = { title: "Billing" };

export default async function BillingPage({ params, searchParams }: { params: Promise<{ slug: string }>; searchParams: Promise<{ subscribed?: string }> }) {
  const { slug } = await params;
  await firmContext(slug);
  const [summary, q, agents] = await Promise.all([billingSummary(), searchParams, agentServices()]);
  if (summary && !summary.billed) notFound();
  return (
    <div className="stack">
      <h1>Billing</h1>
      {!summary ? <p className="notice bad">Billing couldn&apos;t be loaded. Try again shortly.</p>
        : <BillingPanel summary={summary} subscribe={startCheckout} manage={openBillingPortal} justSubscribed={q.subscribed === "1"} />}
      {agents && (agents.offer || agents.services.length) ? <AgentServicesPanel offer={agents.offer} services={agents.services} /> : null}
    </div>
  );
}
