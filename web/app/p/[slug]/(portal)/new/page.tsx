import Link from "next/link";
import { firmContext, kindsForState, offeredKinds } from "@/lib/firm";
import { platformKey, publicPageUrl, SERVICE_SLUGS } from "@/lib/public-pages";

export const metadata = { title: "New filing" };

const STATES = [
  { id: "NY", name: "New York" },
  { id: "NJ", name: "New Jersey" },
  { id: "FL", name: "Florida" },
] as const;

export default async function NewFilingPage({ params, searchParams }: { params: Promise<{ slug: string }>; searchParams: Promise<{ state?: string }> }) {
  const { slug } = await params;
  const { state } = await searchParams;
  const { company } = await firmContext(slug);
  const base = `/p/${encodeURIComponent(slug)}`;
  const all = offeredKinds(company);
  const st = STATES.find((s) => s.id === state);
  if (!st) {
    return (
      <div className="stack">
        <h1>New filing</h1>
        <p className="muted">Which state is the business in?</p>
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
      {company.partner && platformKey() && kinds.some((k) => SERVICE_SLUGS[k.id]) ? (
        <div className="card">
          <strong>Your pages for clients</strong>
          <p className="small muted">Each service has a permanent page with your branding. Put it on your website or send it to any client; every submission becomes a filing here.</p>
          <ul className="small">
            {kinds.filter((k) => SERVICE_SLUGS[k.id]).map((k) => <li key={k.id}>{k.title}: <span className="secret">{publicPageUrl(company.portal?.slug ?? slug, k)}</span></li>)}
          </ul>
        </div>
      ) : null}
    </div>
  );
}
