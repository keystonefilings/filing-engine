import "@/styles/components/desk.css";
import "@/styles/components/desk-setup.css";
import Link from "next/link";
import { notFound } from "next/navigation";
import { firmContext, offeredKinds } from "@/lib/firm";
import { platformName } from "@/lib/brand";
import { AgentsForm } from "@/components/AgentsForm";
import { AgentChoiceForm } from "@/components/AgentChoiceForm";
import { Notice } from "@/components/ui/Sheet";
import { saveAgentChoice, saveAgents } from "../actions";

export const metadata = { title: "Registered agents" };

/**
 * Setup, Registered agents (merged spec 10B.9; V22, decided Nov 27): first the choice between our registered agent
 * service ($59 a year per business, billed to the firm) and the firm's own, then the firm's own agent per state, one
 * white sheet per state, "Save agents" the page's Brass.
 */
export default async function AgentsPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const { company } = await firmContext(slug);
  if (!company.partner) notFound();
  const states = Array.from(new Set(offeredKinds(company).filter((k) => k.type === "formation").map((k) => k.state))).sort();
  const offer = company.ourAgent && company.ourAgent.states.some((s) => (states as string[]).includes(s)) ? company.ourAgent : null;
  const platform = platformName();
  return (
    <div className="narrow ds2 ds2-agents">
      <p className="ds2-back"><Link href={`/p/${encodeURIComponent(slug)}/setup`}>← Setup</Link></p>
      <h1>Registered agents</h1>
      <p className="ds2-lede">Use {platform} as your registered agent, or save the agent you use in each state once. Your forms then start with that answer, so you and your clients don&apos;t type it again. Anyone can still name a different agent on a filing.</p>
      {states.length === 0 ? <Notice>None of the services you offer form a business, so there&apos;s no agent to choose.</Notice> : (
        <>
          {offer
            ? <AgentChoiceForm action={saveAgentChoice.bind(null, slug)} offer={offer} choice={company.registeredAgentChoice} platform={platform} />
            : <Notice>{platform}&apos;s registered agent service ($59 a year per business) isn&apos;t set up yet for the states you file in. Until it is, your forms use the agents you save here.</Notice>}
          <h2 className="ds2-h2">Your own agents</h2>
          <div className="ds2-own">
            <AgentsForm action={saveAgents.bind(null, slug)} states={states} agents={company.registeredAgentsByState ?? {}} />
          </div>
        </>
      )}
    </div>
  );
}
