import "@/styles/components/desk.css";
import Link from "next/link";
import { notFound } from "next/navigation";
import { firmContext, offeredKinds } from "@/lib/firm";
import { AgentsForm } from "@/components/AgentsForm";
import { saveAgents } from "../actions";

export const metadata = { title: "Registered agents" };

export default async function AgentsPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const { company } = await firmContext(slug);
  if (!company.partner) notFound();
  const states = Array.from(new Set(offeredKinds(company).filter((k) => k.type === "formation").map((k) => k.state))).sort();
  return (
    <div className="narrow stack desk2-one">
      <p className="small"><Link href={`/p/${encodeURIComponent(slug)}/setup`}>← Setup</Link></p>
      <h1>Registered agents</h1>
      <p className="muted">Save the agent you use in each state once. Your forms then offer it as the answer, so you and your clients don&apos;t type it again. Anyone can still name a different agent on a filing.</p>
      {states.length ? <AgentsForm action={saveAgents.bind(null, slug)} states={states} agents={company.registeredAgentsByState ?? {}} />
        : <p className="notice">None of the services you offer form a business, so there&apos;s no agent to save.</p>}
    </div>
  );
}
