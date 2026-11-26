import Link from "next/link";
import { notFound } from "next/navigation";
import { firmContext, liveFilings, offeredKinds } from "@/lib/firm";
import { IntakeForm } from "@/components/IntakeForm";
import { platformName } from "@/lib/brand";
import { newNonce } from "@/lib/intake/submit";
import { listSignatures } from "@/lib/signatures";
import { createFirmFiling } from "./actions";
import type { ClientCompany } from "@/lib/engine";
import { withFirmDefaults } from "@/lib/firm-defaults";
import { answersFrom, pastClients } from "@/lib/past-clients";
import { engine, type Filing } from "@/lib/engine";
import { answersFor, inboundMessage } from "@/lib/inbound";
import { filingKind } from "@/lib/intake/forms";

/** The tab names the form: "New York LLC formation · New filing · CoFile" (the root layout adds the brand). */
export async function generateMetadata({ params }: { params: Promise<{ slug: string; kind: string }> }) {
  const k = filingKind((await params).kind);
  return { title: k ? `${k.title} · New filing` : "New filing" };
}

/** V28: the firm files this one itself, so its own contact details start in the contact block. */
function contactPrefill(c: ClientCompany): Record<string, string> {
  const p = c.partner;
  if (!p) return {};
  const [first, ...rest] = (p.contactName ?? "").trim().split(/\s+/);
  return { "contact.firstName": first ?? "", "contact.lastName": rest.join(" "), "contact.email": p.contactEmail ?? "", "contact.phone": p.phone ?? "" };
}

export default async function NewKindPage({ params, searchParams }: { params: Promise<{ slug: string; kind: string }>; searchParams: Promise<{ from?: string; email?: string }> }) {
  const { slug, kind: kindId } = await params;
  const { from, email } = await searchParams;
  const { session, company, brand } = await firmContext(slug);
  const offered = offeredKinds(company).find((k) => k.id === kindId);
  if (!offered) notFound();
  const { kind, prefill: saved } = withFirmDefaults(offered, company);
  // V23: start from a client this firm filed for before.
  const clients = await pastClients(session.apiKey, session.clientCompanyId);
  const earlier = from && /^[0-9a-f-]{36}$/i.test(from) ? await engine<{ filing: Filing }>(session.apiKey, `/v1/filings/${encodeURIComponent(from)}`).then((r) => r.filing).catch(() => null) : null;
  const fromClient = earlier && earlier.clientCompanyId === session.clientCompanyId ? answersFrom(earlier.request) : {};
  // V40: a request the firm emailed in fills in the form.
  const emailed = email ? await inboundMessage(session.apiKey, session.clientCompanyId, email) : null;
  const fromEmail = emailed && !emailed.purgedAt ? await answersFor(session.apiKey, session.clientCompanyId, emailed, kind) : {};
  const signed = kind.sections.some((s) => s.items.some((i) => i.kind === "field" && i.type === "signature"));
  const sigs = signed ? await listSignatures(session.apiKey, session.clientCompanyId) : null;
  return (
    <div className="narrow stack">
      <p className="small"><Link href={`/p/${encodeURIComponent(slug)}/new${kind.type === "ein_only" ? "" : `?state=${kind.state}`}`}>← Other filings</Link></p>
      <h1>{kind.title}</h1>
      <p className="muted">{kind.summary} Would your client rather fill it in? <Link href={`/p/${encodeURIComponent(slug)}/client-links?kind=${encodeURIComponent(kind.id)}`}>Send them a link</Link>.</p>
      {emailed ? <p className="notice">Filled in from your message &ldquo;{emailed.subject || "(no subject)"}&rdquo;. Check every answer and add what&apos;s missing.</p> : null}
      {!liveFilings() ? <p className="notice warn">Practice mode: this portal isn&apos;t switched to live filing yet, so this filing goes through the government site up to the final step and stops there. Nothing is filed or paid.</p> : null}
      {clients.length ? (
        <form method="get" className="row" style={{ gap: 8 }}>
          <label htmlFor="from-client" className="small">Start from a client you filed for before</label>
          <select id="from-client" name="from" defaultValue={from ?? ""}>
            <option value="">New client</option>
            {clients.map((c) => <option key={c.filingId} value={c.filingId}>{c.label}</option>)}
          </select>
          <button className="btn small" type="submit">Fill in</button>
        </form>
      ) : null}
      <IntakeForm
        kind={kind}
        nonce={newNonce()}
        action={createFirmFiling.bind(null, slug, kind.id, emailed?.id ?? null)}
        signatures={sigs?.signatures.filter((s) => s.active) ?? []}
        consentText={sigs?.consentText}
        filerName={company.filerName}
        prefill={{ ...(Object.keys(fromEmail).some((k) => k.startsWith("contact.")) ? {} : contactPrefill(company)), ...saved, ...fromClient, ...fromEmail }}
        key={from ?? email ?? "new"}
      />
    </div>
  );
}
