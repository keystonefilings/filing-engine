import Link from "next/link";
import { notFound } from "next/navigation";
import { firmContext, liveFilings, offeredKinds } from "@/lib/firm";
import { IntakeForm } from "@/components/IntakeForm";
import { newNonce } from "@/lib/intake/submit";
import { listSignatures } from "@/lib/signatures";
import { createFirmFiling } from "./actions";
import type { ClientCompany } from "@/lib/engine";
import { withFirmDefaults } from "@/lib/firm-defaults";

/** V28: the firm files this one itself, so its own contact details start in the contact block. */
function contactPrefill(c: ClientCompany): Record<string, string> {
  const p = c.partner;
  if (!p) return {};
  const [first, ...rest] = (p.contactName ?? "").trim().split(/\s+/);
  return { "contact.firstName": first ?? "", "contact.lastName": rest.join(" "), "contact.email": p.contactEmail ?? "", "contact.phone": p.phone ?? "" };
}

export default async function NewKindPage({ params }: { params: Promise<{ slug: string; kind: string }> }) {
  const { slug, kind: kindId } = await params;
  const { session, company } = await firmContext(slug);
  const offered = offeredKinds(company).find((k) => k.id === kindId);
  if (!offered) notFound();
  const { kind, prefill: saved } = withFirmDefaults(offered, company);
  const signed = kind.sections.some((s) => s.items.some((i) => i.kind === "field" && i.type === "signature"));
  const sigs = signed ? await listSignatures(session.apiKey, session.clientCompanyId) : null;
  return (
    <div className="narrow stack">
      <p className="small"><Link href={`/p/${encodeURIComponent(slug)}/new${kind.type === "ein_only" ? "" : `?state=${kind.state}`}`}>← Other filings</Link></p>
      <h1>{kind.title}</h1>
      <p className="muted">{kind.summary} Would your client rather fill it in? <Link href={`/p/${encodeURIComponent(slug)}/client-links?kind=${encodeURIComponent(kind.id)}`}>Send them a link</Link>.</p>
      {!liveFilings() ? <p className="notice warn">Test mode: filings from this portal are walked through the state site up to the final step and stopped there. Nothing is filed or paid.</p> : null}
      <IntakeForm
        kind={kind}
        nonce={newNonce()}
        action={createFirmFiling.bind(null, slug, kind.id)}
        signatures={sigs?.signatures.filter((s) => s.active) ?? []}
        consentText={sigs?.consentText}
        prefill={{ ...contactPrefill(company), ...saved }}
      />
    </div>
  );
}
