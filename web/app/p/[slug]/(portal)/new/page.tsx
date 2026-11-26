import Link from "next/link";
import { firmContext, kindsForState, liveFilings, offeredKinds } from "@/lib/firm";
import { firmPageUrl, publicKind, SERVICE_SLUGS, widgetSnippet } from "@/lib/public-pages";
import { requestWays } from "@/lib/inbound";

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
    const ways = await requestWays(session.apiKey, session.clientCompanyId);
    return (
      <div className="stack">
        <h1>New filing</h1>
        <p className="muted">Which state is the business in?</p>
        <p className="small muted">Not every filing type can be filed for real yet. See <Link href="/#coverage">Coverage</Link> on the home page for where each one stands.</p>
        {ways.address || ways.sms || ways.whatsapp || ways.slackInstallUrl ? (
          <div className="small muted">
            <p style={{ marginBottom: 4 }}>Or send us the details and we fill in the form for you to check:</p>
            <ul style={{ marginTop: 0 }}>
              {ways.address ? <li>Email <a href={`mailto:${ways.address}`}>{ways.address}</a> from {session.email}.</li> : null}
              {ways.sms || ways.whatsapp ? <li>{[ways.sms ? `Text ${ways.sms}` : "", ways.whatsapp ? `${ways.sms ? "or WhatsApp" : "WhatsApp"} ${ways.whatsapp}` : ""].filter(Boolean).join(" ")} from your mobile (add it under <a href={`${base}/password`}>your account</a>).</li> : null}
              {ways.slackInstallUrl ? <li>Type <code>/file</code> in Slack (<a href={ways.slackInstallUrl}>add CoFile to your Slack</a>).</li> : null}
            </ul>
          </div>
        ) : null}
        <div className="pick">
          {STATES.map((s) => {
            const kinds = kindsForState(all, s.id);
            const own = kinds.filter((k) => k.type !== "ein_only").length;
            const ein = kinds.length > own;
            const label = own === 0
              ? (ein ? `Federal EIN only. To offer ${s.name} filings, choose them in Setup.` : "None offered yet")
              : `${own === 1 ? "1 filing type" : `${own} filing types`}${ein ? ", plus the federal EIN" : ""}`;
            return (
              <Link key={s.id} href={`${base}/new?state=${s.id}`}>
                <strong>{s.name}</strong>
                <span className="small muted">{label}</span>
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
      <p className="muted">Fill it in yourself, or send your client a link to fill it in. Either way, your client approves exactly what will be filed before anything is filed or paid. Not every filing type can be filed for real yet.</p>
      {kinds.length === 0 ? <p className="notice">No {st.name} filings are offered here yet.</p> : (
        <div className="pick">
          {kinds.map((k) => (
            <Link key={k.id} href={`${base}/new/${k.id}`}>
              <strong>{k.title}</strong>
              <span className="small" style={{ display: "block", marginBottom: 4 }}>{liveFilings(k.id) ? <span className="badge ok">Files for real</span> : <span className="badge">Practice filing: stops before the final step</span>}</span>
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
