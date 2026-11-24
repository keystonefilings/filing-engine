import Link from "next/link";
import { firmContext } from "@/lib/firm";
import { engine, filingTitle, type Filing } from "@/lib/engine";
import { StatusBadge } from "@/components/StatusBadge";
import { NEEDS_ACTION } from "@/lib/status";
import { filingKind } from "@/lib/intake/forms";

export const metadata = { title: "Filings" };

export default async function FilingsPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const { session } = await firmContext(slug);
  const { filings } = await engine<{ filings: Filing[] }>(session.apiKey, `/v1/filings?clientCompanyId=${encodeURIComponent(session.clientCompanyId)}`);
  const base = `/p/${encodeURIComponent(slug)}`;
  const waiting = filings.filter((f) => NEEDS_ACTION.has(f.status)).length;
  return (
    <div className="stack">
      <div className="row">
        <h1 style={{ margin: 0 }}>Filings</h1>
        <span className="spacer" />
        <Link className="btn primary" href={`${base}/new`}>New filing</Link>
      </div>
      {waiting ? <p className="notice warn">{waiting === 1 ? "1 filing needs" : `${waiting} filings need`} someone to act.</p> : null}
      {filings.length === 0 ? (
        <div className="card"><p>No filings yet. Start one yourself, or send your client a link to fill in.</p>
          <div className="row"><Link className="btn primary" href={`${base}/new`}>New filing</Link><Link className="btn" href={`${base}/client-links`}>Send a client a link</Link></div></div>
      ) : (
        <div className="table-wrap card" style={{ padding: 0 }}>
          <table>
            <thead><tr><th>Filing</th><th>Type</th><th>Status</th><th>Started</th></tr></thead>
            <tbody>
              {filings.map((f) => {
                const k = filingKind(String((f.request.intake as { portal?: { kind?: string } } | undefined)?.portal?.kind ?? ""));
                return (
                  <tr key={f.id}>
                    <td><Link href={`${base}/filings/${encodeURIComponent(f.id)}`}>{filingTitle(f)}</Link>{f.request.dryRun ? <span className="badge" style={{ marginLeft: 6 }}>Test</span> : null}</td>
                    <td className="small">{k?.title ?? `${f.request.state} ${f.request.type.replace(/_/g, " ")}`}</td>
                    <td><StatusBadge status={f.status} /></td>
                    <td className="small muted">{new Date(f.createdAt).toLocaleDateString()}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
