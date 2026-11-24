import { engine, filingTitle, type ClientCompany, type Filing } from "@/lib/engine";
import { requireTenant } from "@/lib/session";
import { StatusBadge } from "@/components/StatusBadge";

export const metadata = { title: "Filings" };

export default async function AllFilings({ searchParams }: { searchParams: Promise<{ firm?: string }> }) {
  const s = await requireTenant();
  const { firm } = await searchParams;
  const [{ filings }, { clientCompanies }] = await Promise.all([
    engine<{ filings: Filing[] }>(s.apiKey, `/v1/filings${firm ? `?clientCompanyId=${encodeURIComponent(firm)}` : ""}`),
    engine<{ clientCompanies: ClientCompany[] }>(s.apiKey, "/v1/client-companies"),
  ]);
  const names = new Map(clientCompanies.map((c) => [c.clientCompanyId, c.name]));
  return (
    <div className="stack">
      <h1>Filings</h1>
      <form className="row" method="get">
        <select name="firm" defaultValue={firm ?? ""} aria-label="Firm" style={{ maxWidth: 320 }}><option value="">All firms</option>{clientCompanies.map((c) => <option key={c.clientCompanyId} value={c.clientCompanyId}>{c.name}</option>)}</select>
        <button className="btn" type="submit">Show</button>
      </form>
      <div className="card" style={{ padding: 0 }}>
        <table>
          <thead><tr><th>Filing</th><th>Firm</th><th>Type</th><th>Status</th><th>Created</th></tr></thead>
          <tbody>
            {filings.length === 0 ? <tr><td colSpan={5} className="muted">No filings.</td></tr> : filings.slice(0, 500).map((f) => (
              <tr key={f.id}>
                <td>{filingTitle(f)}{f.request.dryRun ? <span className="badge" style={{ marginLeft: 6 }}>Test</span> : null}<div className="small muted"><code>{f.id}</code></div></td>
                <td className="small">{names.get(f.clientCompanyId) ?? f.clientCompanyId}</td>
                <td className="small">{f.request.state} {f.request.type.replace(/_/g, " ")}</td>
                <td><StatusBadge status={f.status} /></td>
                <td className="small muted">{new Date(f.createdAt).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
