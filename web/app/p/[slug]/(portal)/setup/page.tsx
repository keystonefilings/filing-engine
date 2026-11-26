import Link from "next/link";
import { notFound } from "next/navigation";
import { firmContext } from "@/lib/firm";

export const metadata = { title: "Set up your account" };

const STEPS = [
  { id: "details", title: "Your firm", text: "Name, kind of firm and who to contact.", start: "Set up your firm" },
  { id: "branding", title: "Branding", text: "Your logo and color on the pages your clients see.", start: "Set up branding" },
  { id: "payments", title: "Payment", text: "Which card pays state fees, per filing or one for all, with a backup.", start: "Set up payment" },
] as const;

export default async function SetupPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const { company } = await firmContext(slug);
  if (!company.partner) notFound();
  const done = new Set(company.partner.setupDone ?? []);
  const base = `/p/${encodeURIComponent(slug)}`;
  const next = STEPS.find((s) => !done.has(s.id));
  return (
    <div className="narrow stack">
      <h1>{next ? "Set up your account" : "You're set up"}</h1>
      <p className="muted">{next ? "Three short steps. You can change any of them later." : "You can change any of these at any time."}</p>
      <ol className="steps-list">
        {STEPS.map((s) => (
          <li key={s.id} className={done.has(s.id) ? "done" : undefined}>
            <span className="dot" aria-hidden="true" />
            <span style={{ flex: 1 }}><strong>{s.title}</strong><br /><span className="small muted">{s.text}</span></span>
            <Link className={`btn small${next?.id === s.id ? " primary" : ""}`} href={`${base}/setup/${s.id}`}>{done.has(s.id) ? "Change" : s.start}</Link>
          </li>
        ))}
      </ol>
      <div className="card">
        <strong>Registered agents</strong> <span className="small muted">(optional)</span>
        <p className="small muted">Save the agent you use in each state, and your forms offer it so nobody types it again.</p>
        <Link className="btn small" href={`${base}/setup/agents`}>{Object.keys(company.registeredAgentsByState ?? {}).length ? "Change agents" : "Add agents"}</Link>
      </div>
      {!next ? <p><Link className="btn primary" href={`${base}/new`}>Start a filing</Link></p> : null}
    </div>
  );
}
