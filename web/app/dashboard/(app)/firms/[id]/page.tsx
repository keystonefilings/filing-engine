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
import { Notice } from "@/components/ui/Sheet";
import { PlateField } from "@/components/dashboard/PlateField";

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const s = await requireTenant();
  const c = await engine<{ clientCompany: ClientCompany }>(s.apiKey, `/v1/client-companies/${encodeURIComponent(id)}`).then((r) => r.clientCompany).catch(() => null);
  return { title: c ? `${c.name} · Firms` : "Firms" };
}

/**
 * A firm (merged spec 10C.8): its filing desk's settings beside a live preview of the page its clients get, then its
 * public pages and the widget code, then inviting its staff.
 */
export default async function FirmPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const s = await requireTenant();
  let c: ClientCompany;
  try {
    c = (await engine<{ clientCompany: ClientCompany }>(s.apiKey, `/v1/client-companies/${encodeURIComponent(id)}`)).clientCompany;
  } catch (e) { if (e instanceof EngineError && e.status === 404) notFound(); throw e; }
  return (
    <div className="dash2-firm-page">
      <p className="dash2-back"><Link href="/dashboard/firms">← Firms</Link></p>
      <h1>{c.name}</h1>
      {!c.approvers?.length ? <Notice tone="attention">This firm has no approvers, so its filings can&apos;t be approved. Add them with <code>PUT /v1/client-companies/{c.clientCompanyId}</code>.</Notice> : null}
      <h2>Filing desk</h2>
      <PortalForm action={savePortal.bind(null, c.clientCompanyId)} portal={c.portal} firmName={c.name} logoSrc={logoSrc(c.portal)} kinds={FILING_KINDS.map((k) => ({ id: k.id, title: k.title }))} />
      {c.portal?.publicPages && c.portal.slug ? (
        <section className="card dash2-public">
          <h3>Public pages and website widget</h3>
          <p className="small muted">Send a page link, or paste the widget code into the firm&apos;s website where the form should appear.</p>
          {offeredKinds(c).filter((k) => SERVICE_SLUGS[k.id] && publicKind(k)).map((k) => (
            <details key={k.id} className="dash2-disclosure">
              <summary>{k.title}: <span className="dash2-url">{firmPageUrl(c.tenantId, c.portal!.slug, k)}</span></summary>
              <PlateField value={widgetSnippet(c.tenantId, c.portal!.slug, k)} />
            </details>
          ))}
        </section>
      ) : null}
      <h2>Invite staff</h2>
      <InviteForm action={inviteStaff.bind(null, c.clientCompanyId)} />
    </div>
  );
}
