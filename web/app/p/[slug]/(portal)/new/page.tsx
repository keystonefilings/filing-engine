import Link from "next/link";
import { firmContext, kindsForState, offeredKinds } from "@/lib/firm";
import { firmPageUrl, publicKind, SERVICE_SLUGS, widgetSnippet } from "@/lib/public-pages";
import { inboundAddress } from "@/lib/inbound";

export const metadata = { title: "New filing" };

const STATES = [
  { id: "NY", name: "New York" },
  { id: "NJ", name: "New Jersey" },
  { id: "FL", name: "Florida" },
] as const;

export default async function NewFilingPage({ params, searchParams }: { params: Promise<{ slug: string }>; searchParams: Promise<{ state?: string }> }) {
  const { slug } = await params;
  const { state } = await searchParams;
  const { session, company } = await firmContext(slug);
  const base = `/p/${encodeURIComponent(slug)}`;
  const all = offeredKinds(company);
  const st = STATES.find((s) => s.id === state);
  if (!st) {
    const inbox = await inboundAddress(session.apiKey, session.clientCompanyId);
    return (
      <div className="stack">
        <h1>New filing</h1>
        <p className="muted">Which state is the business in?</p>
        {inbox ? <p className="small muted">Or email the details to <a href={`mailto:${inbox}`}>{inbox}</a> from {session.email}. We fill in the form from your email and send you a link to check it.</p> : null}
        <div className="pick">
          {STATES.map((s) => {
            const n = kindsForState(all, s.id).length;
            return (
              <Link key={s.id} href={`${base}/new?state=${s.id}`}>
                <strong>{s.name}</strong>
                <span className="small muted">{n === 1 ? "1 filing" : `${n} filings`}</span>
              </Link>
            );
          })}
        </div>
      </div>
    );
  }
  const kinds = kindsForState(all, st.id);
  return (
    <div className="stack">
      <p className="small"><Link href={`${base}/new`}>All states</Link></p>
      <h1>{st.name}: what are you filing?</h1>
      <p className="muted">Fill it in yourself, or send your client a link to fill it in. Either way the approver checks exactly what will be filed before anything is sent to the state.</p>
      {kinds.length === 0 ? <p className="notice">No {st.name} filings are offered here yet.</p> : (
        <div className="pick">
          {kinds.map((k) => (
            <Link key={k.id} href={`${base}/new/${k.id}`}>
              <strong>{k.title}</strong>
              <span className="small muted">{k.summary}</span>
              {k.feeNote ? <span className="small" style={{ display: "block", marginTop: 6 }}>{k.feeNote}</span> : null}
            </Link>
          ))}
        </div>
      )}
      {(company.partner || company.portal?.publicPages) && kinds.some((k) => SERVICE_SLUGS[k.id] && publicKind(k)) ? (
        <div className="card">
          <strong>Your pages for clients</strong>
          <p className="small muted">Each service has a permanent page with your branding. Send it to any client, or put the form on your own website with the widget code; every submission becomes a filing here.</p>
          {kinds.filter((k) => SERVICE_SLUGS[k.id] && publicKind(k)).map((k) => (
            <details key={k.id} className="small" style={{ marginTop: 8 }}>
              <summary>{k.title}: <span className="secret">{firmPageUrl(company.tenantId, company.portal?.slug ?? slug, k)}</span></summary>
              <p className="muted" style={{ margin: "6px 0 2px" }}>Website widget: paste where the form should appear.</p>
              <pre className="secret" style={{ whiteSpace: "pre-wrap" }}>{widgetSnippet(company.tenantId, company.portal?.slug ?? slug, k)}</pre>
            </details>
          ))}
        </div>
      ) : null}
    </div>
  );
}
