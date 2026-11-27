import Link from "next/link";
import "@/styles/components/intake.css";
import "@/styles/components/desk-work.css";
import { notFound } from "next/navigation";
import { firmContext, liveFilings, offeredKinds } from "@/lib/firm";
import { IntakeForm } from "@/components/IntakeForm";
import { platformName, supportEmail } from "@/lib/brand";
import { newNonce } from "@/lib/intake/submit";
import { listSignatures } from "@/lib/signatures";
import { createFirmFiling } from "./actions";
import type { ClientCompany } from "@/lib/engine";
import { withFirmDefaults } from "@/lib/firm-defaults";
import { answersFrom, pastClients } from "@/lib/past-clients";
import { engine, type Filing } from "@/lib/engine";
import { answersFor, inboundMessage } from "@/lib/inbound";
import { filingKind } from "@/lib/intake/forms";
import { Notice } from "@/components/ui/Sheet";
import { SectionRail } from "@/components/desk/SectionRail";

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
  const base = `/p/${encodeURIComponent(slug)}`;
  // The desk's own form (merged spec 10B.12.1): the head and its slips, "Start from a client", the form on one white
  // sheet, and from 1280 px the section rail beside it. The form itself is IntakeForm, in CoFile's look inside .intake2.
  return (
    <div className="kind2">
      <div className="kind2-main">
        <p className="dw-back"><Link href={`${base}/new${kind.type === "ein_only" ? "" : `?state=${kind.state}`}`}>← Other filings</Link></p>
        <h1>{kind.title}</h1>
        <p className="dw-lede">{kind.summary} Would your client rather fill it in? <Link href={`${base}/client-links?kind=${encodeURIComponent(kind.id)}`}>Send them a link</Link>.</p>
        {emailed || !liveFilings(kind.id) ? (
          <div className="kind2-notices">
            {emailed ? <Notice tone="turn">Filled in from your message &ldquo;{emailed.subject || "(no subject)"}&rdquo;. Check every answer and add what&apos;s missing.</Notice> : null}
            {!liveFilings(kind.id) ? <Notice tone="rehearsal">Rehearsal: {kind.title} isn&apos;t live yet, so this filing is a rehearsal. {platformName()} fills in every screen of the state&apos;s real website and stops before the last button. Nothing is filed or paid. Each filing type goes live once it&apos;s verified on the state&apos;s website. To ask when this one will, email <a href={`mailto:${supportEmail()}`}>{supportEmail()}</a>.</Notice> : null}
          </div>
        ) : null}
        {clients.length ? (
          <form method="get" className="kind2-from">
            <label htmlFor="from-client">Start from a client you filed for before</label>
            <div className="kind2-from-row">
              <select id="from-client" name="from" defaultValue={from ?? ""}>
                <option value="">New client</option>
                {clients.map((c) => <option key={c.filingId} value={c.filingId}>{c.label}</option>)}
              </select>
              <button className="btn small" type="submit">Fill in</button>
            </div>
          </form>
        ) : null}
        <div className="intake2 kind2-sheet">
          <IntakeForm
            kind={kind}
            nonce={newNonce()}
            action={createFirmFiling.bind(null, slug, kind.id, emailed?.id ?? null)}
            signatures={sigs?.signatures.filter((s) => s.active) ?? []}
            consentText={sigs?.consentText}
            filerName={company.filerName}
            footnote={<p className="kind2-footnote">Next you get the proof to approve. Nothing is filed until you do.</p>}
            prefill={{ ...(Object.keys(fromEmail).some((k) => k.startsWith("contact.")) ? {} : contactPrefill(company)), ...saved, ...fromClient, ...fromEmail }}
            key={from ?? email ?? "new"}
          />
        </div>
      </div>
      <div className="kind2-rail"><SectionRail form=".kind2-sheet form" /></div>
    </div>
  );
}
