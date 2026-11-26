import Link from "next/link";
import { engine, type ClientCompany } from "@/lib/engine";
import { requireTenant } from "@/lib/session";

export const metadata = { title: "Firms" };

export default async function FirmsPage() {
  const s = await requireTenant();
  const { clientCompanies } = await engine<{ clientCompanies: ClientCompany[] }>(s.apiKey, "/v1/client-companies");
  return (
    <div className="stack">
      <h1>Firms</h1>
      <p className="muted">The CPA, payroll and other firms you file for. Give a firm its own branded filing desk, then invite its staff.</p>
      {clientCompanies.length === 0 ? <p className="notice">No firms yet. Add one with <code>PUT /v1/client-companies/&#123;id&#125;</code> (see the <a href="/docs/reference">API reference</a>).</p> : (
        <div className="card" style={{ padding: 0 }}>
          <table>
            <thead><tr><th>Firm</th><th>Filing desk</th><th>Approvers</th></tr></thead>
            <tbody>{clientCompanies.map((c) => (
              <tr key={c.clientCompanyId}>
                <td><Link href={`/dashboard/firms/${encodeURIComponent(c.clientCompanyId)}`}>{c.name}</Link><div className="small muted">{c.clientCompanyId}</div></td>
                <td>{c.portal ? <code>/p/{c.portal.slug}</code> : <span className="muted small">Not set up</span>}</td>
                <td className="small">{c.approvers?.length ?? 0}</td>
              </tr>
            ))}</tbody>
          </table>
        </div>
      )}
    </div>
  );
}
