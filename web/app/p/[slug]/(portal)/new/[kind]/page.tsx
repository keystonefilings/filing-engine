import Link from "next/link";
import { notFound } from "next/navigation";
import { firmContext, liveFilings, offeredKinds } from "@/lib/firm";
import { IntakeForm } from "@/components/IntakeForm";
import { newNonce } from "@/lib/intake/submit";
import { listSignatures } from "@/lib/signatures";
import { createFirmFiling } from "./actions";

export default async function NewKindPage({ params }: { params: Promise<{ slug: string; kind: string }> }) {
  const { slug, kind: kindId } = await params;
  const { session, company } = await firmContext(slug);
  const kind = offeredKinds(company).find((k) => k.id === kindId);
  if (!kind) notFound();
  const signed = kind.sections.some((s) => s.items.some((i) => i.kind === "field" && i.type === "signature"));
  const sigs = signed ? await listSignatures(session.apiKey, session.clientCompanyId) : null;
  return (
    <div className="narrow stack">
      <p className="small"><Link href={`/p/${encodeURIComponent(slug)}/new`}>← All filings</Link></p>
      <h1>{kind.title}</h1>
      <p className="muted">{kind.summary}</p>
      {!liveFilings() ? <p className="notice warn">Test mode: filings from this portal are walked through the state site up to the final step and stopped there. Nothing is filed or paid.</p> : null}
      <IntakeForm
        kind={kind}
        nonce={newNonce()}
        action={createFirmFiling.bind(null, slug, kind.id)}
        signatures={sigs?.signatures.filter((s) => s.active) ?? []}
        consentText={sigs?.consentText}
      />
    </div>
  );
}
