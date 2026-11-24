import Link from "next/link";
import { notFound } from "next/navigation";
import { engine, EngineError, type ClientCompany } from "@/lib/engine";
import { requireTenant } from "@/lib/session";
import { FILING_KINDS } from "@/lib/intake/forms";
import { InviteForm, PortalForm } from "@/components/FirmForms";
import { inviteStaff, savePortal } from "./actions";

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
      <PortalForm action={savePortal.bind(null, c.clientCompanyId)} portal={c.portal} kinds={FILING_KINDS.map((k) => ({ id: k.id, title: k.title }))} />
      <h2>Invite staff</h2>
      <InviteForm action={inviteStaff.bind(null, c.clientCompanyId)} />
    </div>
  );
}
