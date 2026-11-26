import Link from "next/link";
import { notFound } from "next/navigation";
import { firmContext } from "@/lib/firm";
import { googleConfigured } from "@/lib/google";
import { engine, EngineError, filingTitle, type Filing, type Run } from "@/lib/engine";
import { Chip, statusTone } from "@/components/ui/Chip";
import { Notice, type NoticeTone } from "@/components/ui/Sheet";
import { StageRule } from "@/components/desk/StageRule";
import { sentBy } from "@/lib/sender";
import "@/styles/components/desk.css";
import { nextStep, statusLabel } from "@/lib/status";
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
  const by = sentBy(f);
  const einOnly = f.request.type === "ein_only";
  const docHref = (a: { id: string }) => `${base}/filings/${encodeURIComponent(f.id)}/artifacts/${encodeURIComponent(a.id)}`;
  // The next step's tone (10B.13.1): the firm's own steps are its turn; fetching the state's page is plain; a taken name needs attention; a stop is a problem.
  const stepTone: NoticeTone = ["awaiting_information", "awaiting_approval", "changes_requested"].includes(f.status) ? "turn"
    : f.status === "awaiting_name_resolution" ? "attention" : ["invalid", "rejected", "failed"].includes(f.status) ? "problem" : "info";
  const DAYTIME = new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric", year: "numeric", hour: "numeric", minute: "2-digit" });
  const google = googleConfigured() && company.partner;
  const rail = f.artifacts.length || f.ein || google;
  return (
    <div className={["filing2", rail && "has-rail"].filter(Boolean).join(" ")}>
      <div className="filing2-main">
        <p className="filing2-back"><Link href={base}>← Filings</Link></p>
        <h1>{filingTitle(f)}</h1>
        <p className="filing2-chips"><Chip tone={statusTone(f.status)}>{statusLabel(f.status).label}</Chip>{f.request.dryRun ? <Chip tone="rehearsal">Rehearsal</Chip> : null}</p>
        <p className="filing2-meta">{kind?.title ?? `${f.request.state} ${f.request.type.replace(/_/g, " ")}`} · started {DAYTIME.format(new Date(f.createdAt))}{by ? ` by ${by.who}` : portal?.submittedBy ? ` by ${portal.submittedBy}` : ""}{portal?.source === "client_link" ? " (client link)" : ""}</p>
        <StageRule status={f.status} einOnly={einOnly} rehearsal={Boolean(f.request.dryRun)} ran={Boolean(run)} />
        {step ? <Notice tone={stepTone}>{step}</Notice> : null}
        {doc && /^[A-Za-z0-9_-]{20,}$/.test(doc)
          ? <Notice tone="done" role="status">Saved to Google Docs. <a href={`https://docs.google.com/document/d/${doc}/edit`} target="_blank" rel="noopener">Open the record</a></Notice>
          : doc && DOC_NOTICE[doc] ? <Notice tone="attention" role="status">{DOC_NOTICE[doc]}</Notice> : null}
        {f.awaitingCardCode
          ? <Notice tone="turn">Approved and ready to pay. It needs the security code of {f.awaitingCardCode.label}{f.awaitingCardCode.last4 ? ` ending ${f.awaitingCardCode.last4}` : ""}. <Link href={`/p/${encodeURIComponent(slug)}/pay`}>Pay and file</Link></Notice>
          : f.lastError && ["invalid", "failed", "blocked", "rejected"].includes(f.status) ? <Notice tone="problem">{f.lastError}</Notice> : null}
        {f.status === "awaiting_information" ? (
          f.missingInformation?.length
            ? <section className="filing2-needed"><h2>Still needed</h2><MissingInfoForm action={supplyMissing.bind(null, slug, f.id)} inputs={missingInputs(f.missingInformation)} startOverHref={`${base}/new${kind ? `/${kind.id}` : ""}`} /></section>
            : f.lastError ? <Notice tone="problem">{f.lastError}</Notice> : null
        ) : null}
        {approvalLink ? (
          <section className="filing2-proof">
            <h2>Your proof is ready</h2>
            <p>Check every detail and fee exactly as they&apos;ll go to the state, then approve it or ask for changes. Nothing is filed until you approve.</p>
            <p><a className="btn primary is-main filing2-open" href={approvalLink} target="_blank" rel="noopener">Open the proof and approve it<svg viewBox="0 0 16 16" aria-hidden="true"><path d="M6 3h7v7M13 3 4.5 11.5" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg><span className="sr-only"> (opens in a new tab)</span></a></p>
            <p className="filing2-sent">
              {emailedTo.length
                ? <>We also emailed the link to {Array.from(new Set(emailedTo)).join(", ")}.</>
                : <>The link wasn&apos;t emailed{approvalSends.some((m) => m.status === "failed") ? " (sending failed)" : ""}; open it here.</>}
            </p>
          </section>
        ) : null}
        {signer ? <p className="filing2-note">The signer&apos;s saved signature is placed on the state form only once this filing is approved.</p> : null}
        {run ? (
          <details className="filing2-progress">
            <summary>Progress on the state site <span>({run.dryRun ? "test run" : "filing run"}, {run.status.replace(/_/g, " ")})</span></summary>
            <ol>
              {run.steps.map((s, i) => <li key={i} className={run.status === "completed" && i === run.steps.length - 1 ? "is-last" : undefined}><span>{s.note ?? s.screenKey}</span><time dateTime={s.at}>{new Date(s.at).toLocaleTimeString()}</time></li>)}
            </ol>
          </details>
        ) : null}
      </div>
      {rail ? (
        <aside className="filing2-rail">
          {f.artifacts.length ? (
            <section>
              <h2>Documents</h2>
              <ul className="filing2-docs">
                {f.artifacts.map((a) => (
                  <li key={a.id}>
                    <a href={docHref(a)}>
                      <span className="filing2-doc" aria-hidden="true"><i /><i /><i /><i style={{ width: "54%" }} /><i style={{ width: "70%" }} /></span>
                      <span className="filing2-doc-label">{a.label}</span>
                    </a>
                    <span className="filing2-doc-kind">{a.kind.replace(/_/g, " ")}</span>
                  </li>
                ))}
              </ul>
            </section>
          ) : null}
          {f.ein ? <p className="filing2-ein">EIN: <strong>{f.ein}</strong></p> : null}
          {google ? (
            <p className="filing2-google"><a className="btn small" href={`${base}/filings/${encodeURIComponent(f.id)}/google-doc`}>Save to Google Docs</a><span>A copy of this record in your Google account. People&apos;s Social Security numbers and ITINs are left out.</span></p>
          ) : null}
        </aside>
      ) : null}
    </div>
  );
}
