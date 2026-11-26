import Link from "next/link";
import { notFound } from "next/navigation";
import { firmContext } from "@/lib/firm";
import { googleConfigured } from "@/lib/google";
import { engine, EngineError, filingTitle, type Filing, type Run } from "@/lib/engine";
import { StatusBadge } from "@/components/StatusBadge";
import { nextStep } from "@/lib/status";
import { filingKind } from "@/lib/intake/forms";
import { missingInputs } from "@/lib/missing-fields";
import { MissingInfoForm } from "@/components/MissingInfoForm";
import { supplyMissing } from "./actions";

/** After "Save to Google Docs": a document id, or why it didn't happen. */
const DOC_NOTICE: Record<string, string> = {
  cancelled: "Saving to Google Docs was cancelled.", expired: "That Google sign-in took too long. Try again.",
  denied: "Google didn't give access to Google Docs, so nothing was saved.", failed: "The record couldn't be saved to Google Docs. Try again.",
  off: "Saving to Google Docs isn't available here.",
};

export default async function FilingPage({ params, searchParams }: { params: Promise<{ slug: string; id: string }>; searchParams: Promise<{ doc?: string }> }) {
  const { slug, id } = await params;
  const { doc } = await searchParams;
  const { session, company } = await firmContext(slug);
  let data: { filing: Filing; run: Run | null; approvalLink?: string };
  try {
    data = await engine(session.apiKey, `/v1/filings/${encodeURIComponent(id)}`);
  } catch (e) {
    if (e instanceof EngineError && e.status === 404) notFound();
    throw e;
  }
  const { filing: f, run, approvalLink } = data;
  if (f.clientCompanyId !== session.clientCompanyId) notFound();
  // What actually happened to the approval email, so the page never claims a send that didn't happen.
  const messages = approvalLink
    ? (await engine<{ messages: { eventType: string; channel: string; address: string; status: string; createdAt: string }[] }>(session.apiKey, `/v1/filings/${encodeURIComponent(id)}/messages`).catch(() => ({ messages: [] }))).messages
    : [];
  const approvalSends = messages.filter((m) => m.eventType === "filing.awaiting_approval");
  const emailedTo = approvalSends.filter((m) => m.status === "sent").map((m) => m.address);
  const base = `/p/${encodeURIComponent(slug)}`;
  const portal = (f.request.intake as { portal?: { kind?: string; submittedBy?: string; source?: string } } | undefined)?.portal;
  const kind = filingKind(portal?.kind ?? "");
  const step = nextStep(f.status);
  const signer = (f.request.paperUpload as { signatureId?: string } | undefined)?.signatureId;
  return (
    <div className="narrow stack">
      <p className="small"><Link href={base}>← Filings</Link></p>
      <div className="row"><h1 style={{ margin: 0 }}>{filingTitle(f)}</h1><StatusBadge status={f.status} />{f.request.dryRun ? <span className="badge">Practice filing</span> : null}</div>
      <p className="muted" style={{ marginTop: 0 }}>{kind?.title ?? `${f.request.state} ${f.request.type.replace(/_/g, " ")}`} · started {new Date(f.createdAt).toLocaleString()}{portal?.submittedBy ? ` by ${portal.submittedBy}` : ""}{portal?.source === "client_link" ? " (client link)" : ""}</p>
      {step ? <p className="notice">{step}</p> : null}
      {doc && /^[A-Za-z0-9_-]{20,}$/.test(doc)
        ? <p className="notice ok" role="status">Saved to Google Docs. <a href={`https://docs.google.com/document/d/${doc}/edit`} target="_blank" rel="noopener">Open the record</a></p>
        : doc && DOC_NOTICE[doc] ? <p className="notice warn" role="status">{DOC_NOTICE[doc]}</p> : null}
      {googleConfigured() && company.partner ? (
        <p className="small"><a className="btn small" href={`${base}/filings/${encodeURIComponent(f.id)}/google-doc`}>Save to Google Docs</a> <span className="muted">A copy of this record in your Google account. People&apos;s Social Security numbers and ITINs are left out.</span></p>
      ) : null}
      {f.awaitingCardCode
        ? <p className="notice warn">Approved and ready to pay. It needs the security code of {f.awaitingCardCode.label}{f.awaitingCardCode.last4 ? ` ending ${f.awaitingCardCode.last4}` : ""}. <Link href={`/p/${encodeURIComponent(slug)}/pay`}>Pay and file</Link></p>
        : f.lastError && ["invalid", "failed", "blocked", "rejected"].includes(f.status) ? <p className="notice bad">{f.lastError}</p> : null}
      {f.status === "awaiting_information" ? (
        f.missingInformation?.length
          ? <MissingInfoForm action={supplyMissing.bind(null, slug, f.id)} inputs={missingInputs(f.missingInformation)} startOverHref={`${base}/new${kind ? `/${kind.id}` : ""}`} />
          : f.lastError ? <p className="notice bad">{f.lastError}</p> : null
      ) : null}
      {approvalLink ? (
        <div className="card">
          <strong>Approval link</strong>
          <p className="small muted">
            {emailedTo.length
              ? <>We emailed this link to {Array.from(new Set(emailedTo)).join(", ")}. If they can&apos;t find it, you can pass it on.</>
              : <>This link hasn&apos;t been emailed{approvalSends.some((m) => m.status === "failed") ? " (sending failed)" : ""}. Send it to the person who approves the filing.</>}
            {" "}It shows exactly what will be filed and the fees.
          </p>
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
