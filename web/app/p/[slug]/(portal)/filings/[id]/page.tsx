import Link from "next/link";
import { notFound } from "next/navigation";
import { firmContext } from "@/lib/firm";
import { engine, EngineError, filingTitle, type Filing, type Run } from "@/lib/engine";
import { StatusBadge } from "@/components/StatusBadge";
import { nextStep } from "@/lib/status";
import { filingKind } from "@/lib/intake/forms";

export default async function FilingPage({ params }: { params: Promise<{ slug: string; id: string }> }) {
  const { slug, id } = await params;
  const { session } = await firmContext(slug);
  let data: { filing: Filing; run: Run | null; approvalLink?: string };
  try {
    data = await engine(session.apiKey, `/v1/filings/${encodeURIComponent(id)}`);
  } catch (e) {
    if (e instanceof EngineError && e.status === 404) notFound();
    throw e;
  }
  const { filing: f, run, approvalLink } = data;
  if (f.clientCompanyId !== session.clientCompanyId) notFound();
  const base = `/p/${encodeURIComponent(slug)}`;
  const portal = (f.request.intake as { portal?: { kind?: string; submittedBy?: string; source?: string } } | undefined)?.portal;
  const kind = filingKind(portal?.kind ?? "");
  const step = nextStep(f.status);
  const signer = (f.request.paperUpload as { signatureId?: string } | undefined)?.signatureId;
  return (
    <div className="narrow stack">
      <p className="small"><Link href={base}>← Filings</Link></p>
      <div className="row"><h1 style={{ margin: 0 }}>{filingTitle(f)}</h1><StatusBadge status={f.status} />{f.request.dryRun ? <span className="badge">Test</span> : null}</div>
      <p className="muted" style={{ marginTop: 0 }}>{kind?.title ?? `${f.request.state} ${f.request.type.replace(/_/g, " ")}`} · started {new Date(f.createdAt).toLocaleString()}{portal?.submittedBy ? ` by ${portal.submittedBy}` : ""}{portal?.source === "client_link" ? " (client link)" : ""}</p>
      {step ? <p className="notice">{step}</p> : null}
      {f.lastError && ["invalid", "awaiting_information", "failed", "blocked", "rejected"].includes(f.status) ? <p className="notice bad">{f.lastError}</p> : null}
      {approvalLink ? (
        <div className="card">
          <strong>Approval link</strong>
          <p className="small muted">The approver was sent this link. If they can&apos;t find it, you can pass it on. It shows exactly what will be filed and the fees.</p>
          <p className="secret small">{approvalLink}</p>
        </div>
      ) : null}
      {signer ? <p className="small muted">The signer&apos;s saved signature is placed on the state form only once this filing is approved.</p> : null}
      {f.artifacts.length ? (
        <div className="card">
          <strong>Documents</strong>
          <ul>
            {f.artifacts.map((a) => <li key={a.id}><a href={`${base}/filings/${encodeURIComponent(f.id)}/artifacts/${encodeURIComponent(a.id)}`}>{a.label}</a> <span className="small muted">{a.kind.replace(/_/g, " ")}</span></li>)}
          </ul>
        </div>
      ) : null}
      {f.ein ? <p>EIN: <strong>{f.ein}</strong></p> : null}
      {run ? (
        <details className="card">
          <summary><strong>Progress on the state site</strong> <span className="small muted">({run.dryRun ? "test run" : "filing run"}, {run.status.replace(/_/g, " ")})</span></summary>
          <ol className="small">
            {run.steps.map((s, i) => <li key={i}>{s.note ?? s.screenKey} <span className="muted">{new Date(s.at).toLocaleTimeString()}</span></li>)}
          </ol>
        </details>
      ) : null}
    </div>
  );
}
