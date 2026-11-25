import Link from "next/link";
import { notFound } from "next/navigation";
import { engine, EngineError, type ClientCompany } from "@/lib/engine";
import { requireTenant } from "@/lib/session";
import { FILING_KINDS } from "@/lib/intake/forms";
import { logoSrc } from "@/lib/brand";
import { InviteForm, PortalForm } from "@/components/FirmForms";
import { inviteStaff, savePortal } from "./actions";
import { firmPageUrl, publicKind, SERVICE_SLUGS, widgetSnippet } from "@/lib/public-pages";
import { offeredKinds } from "@/lib/firm";

export default async function FirmPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const s = await requireTenant();
  let c: ClientCompany;
  try {
    c = (await engine<{ clientCompany: ClientCompany }>(s.apiKey, `/v1/client-companies/${encodeURIComponent(id)}`)).clientCompany;
  } catch (e) { if (e instanceof EngineError && e.status === 404) notFound(); throw e; }
  return (
    <div className="stack narrow">
      <p className="small"><Link href="/dashboard/firms">← Firms</Link></p>
      <h1>{c.name}</h1>
      {!c.approvers?.length ? <p className="notice warn">This firm has no approvers, so its filings can&apos;t be approved. Add them with <code>PUT /v1/client-companies/{c.clientCompanyId}</code>.</p> : null}
      <h2>Portal</h2>
      <PortalForm action={savePortal.bind(null, c.clientCompanyId)} portal={c.portal} firmName={c.name} logoSrc={logoSrc(c.portal)} kinds={FILING_KINDS.map((k) => ({ id: k.id, title: k.title }))} />
      {c.portal?.publicPages && c.portal.slug ? (
        <div className="card">
          <strong>Public pages and website widget</strong>
          <p className="small muted">Send a page link, or paste the widget code into the firm&apos;s website where the form should appear.</p>
          {offeredKinds(c).filter((k) => SERVICE_SLUGS[k.id] && publicKind(k)).map((k) => (
            <details key={k.id} className="small" style={{ marginTop: 8 }}>
              <summary>{k.title}: <span className="secret">{firmPageUrl(c.tenantId, c.portal!.slug, k)}</span></summary>
              <pre className="secret" style={{ whiteSpace: "pre-wrap" }}>{widgetSnippet(c.tenantId, c.portal!.slug, k)}</pre>
            </details>
          ))}
        </div>
      ) : null}
      <h2>Invite staff</h2>
      <InviteForm action={inviteStaff.bind(null, c.clientCompanyId)} />
    </div>
  );
}
