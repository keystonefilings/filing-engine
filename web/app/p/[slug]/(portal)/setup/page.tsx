import Link from "next/link";
import { notFound } from "next/navigation";
import { firmContext } from "@/lib/firm";
import { Glyph } from "@/components/ui/glyphs";
import "@/styles/components/desk.css";

export const metadata = { title: "Set up your account" };

const STEPS = [
  { id: "details", title: "Your firm", text: "Name, kind of firm and who to contact.", start: "Set up your firm" },
  { id: "branding", title: "Branding", text: "Your logo and color on the pages your clients see.", start: "Set up branding" },
  { id: "payments", title: "Payment", text: "Which card pays state fees: one card for everything, or one per filing type, with a backup.", start: "Set up payment" },
] as const;

/**
 * Setup (merged spec 10B.5): the steps as a ledger, each with the product's status glyph: done (Verdigris), the next
 * one (the Ochre lozenge, its button the page's one Brass button), later (a ring).
 */
export default async function SetupPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const { company } = await firmContext(slug);
  if (!company.partner) notFound();
  const done = new Set(company.partner.setupDone ?? []);
  const base = `/p/${encodeURIComponent(slug)}`;
  const next = STEPS.find((s) => !done.has(s.id));
  return (
    <div className="narrow setup2">
      <h1>{next ? "Set up your account" : "You're set up"}</h1>
      {next ? null : <span className="setup2-rule" aria-hidden="true" />}
      <p className="muted setup2-lede">{next ? "Three short steps, plus registered agents if you want them. You can change any of them later." : "You can change any of these at any time."}</p>
      <ol className="setup2-steps">
        {STEPS.map((s) => {
          const state = done.has(s.id) ? "done" : next?.id === s.id ? "next" : "later";
          return (
            <li key={s.id} className={`setup2-step is-${state}`}>
              <span className="setup2-glyph"><Glyph kind={state === "done" ? "done" : state === "next" ? "turn" : "inhand"} /></span>
              <span className="setup2-what"><strong>{s.title}</strong><span>{s.text}</span></span>
              <Link className={state === "next" ? "btn primary is-main" : "btn"} href={`${base}/setup/${s.id}`}>{state === "done" ? "Change" : s.start}</Link>
            </li>
          );
        })}
      </ol>
      <div className="setup2-card">
        <span className="setup2-what"><strong>Registered agents <span className="muted">(optional)</span></strong><span>Save the agent you use in each state, and your forms offer it so nobody types it again.</span></span>
        <Link className="btn small" href={`${base}/setup/agents`}>{Object.keys(company.registeredAgentsByState ?? {}).length ? "Change agents" : "Add agents"}</Link>
      </div>
      {!next ? <p className="setup2-start"><Link className="btn primary is-main" href={`${base}/new`}>Start a filing</Link></p> : null}
    </div>
  );
}
