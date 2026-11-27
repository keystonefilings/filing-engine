import Link from "next/link";
import { firmContext, kindsForState, liveFilings, offeredKinds } from "@/lib/firm";
import { firmPageUrl, publicKind, SERVICE_SLUGS, widgetSnippet } from "@/lib/public-pages";
import { requestWays } from "@/lib/inbound";
import { Chip } from "@/components/ui/Chip";
import { Notice } from "@/components/ui/Sheet";
import { CopyButton } from "@/components/desk/CopyButton";
import "@/styles/components/desk-work.css";

export const metadata = { title: "New filing" };

const STATES = [
  { id: "NY", name: "New York" },
  { id: "NJ", name: "New Jersey" },
  { id: "FL", name: "Florida" },
] as const;

/** The 20 px arrow on a card that is a link: decoration, the card's words carry it. */
function Arrow({ back }: { back?: boolean }) {
  return (
    <svg className={back ? "dw-arrow is-back" : "dw-arrow"} viewBox="0 0 20 20" aria-hidden="true">
      <path d={back ? "M16 10H4M9 5l-5 5 5 5" : "M4 10h12M11 5l5 5-5 5"} fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/**
 * New filing (merged spec 10B.10, 10B.11). Step one: the three states as cards, the other ways in beside the head.
 * Step two (`?state=`): the state's filing types as cards with their Live or Rehearsal chip, and the firm's permanent
 * pages for clients with their addresses and widget code to copy.
 */
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
      <div className="new2">
        <div className="new2-head">
          <h1>New filing</h1>
          <p className="new2-question">Which state is the business in?</p>
          <p className="new2-note">Filing types go live one at a time; until then they run as rehearsals. See <Link href="/what-we-file">What we file</Link> for where each one stands.</p>
        </div>
        <ul className="new2-states">
          {STATES.map((s) => {
            const kinds = kindsForState(all, s.id);
            const own = kinds.filter((k) => k.type !== "ein_only").length;
            const ein = kinds.length > own;
            const label = own === 0
              ? (ein ? `Federal EIN only. To offer ${s.name} filings, choose them in Setup.` : "None offered yet")
              : `${own === 1 ? "1 filing type" : `${own} filing types`}${ein ? ", plus the federal EIN" : ""}`;
            return (
              <li key={s.id}>
                <Link className="new2-card is-state" href={`${base}/new?state=${s.id}`}>
                  <span className="new2-state-name">{s.name}</span>
                  <span className="new2-count">{label}</span>
                  <Arrow />
                </Link>
              </li>
            );
          })}
        </ul>
        {/* After the cards in the markup, so reading order and visual order match on every screen (10B.10) */}
        {ways.address || ways.sms || ways.whatsapp || ways.slackInstallUrl ? (
          <div className="new2-ways">
            <p>Or send us the details and we fill in the form for you to check:</p>
            <ul>
              {ways.address ? <li>Email <a className="dw-mono" href={`mailto:${ways.address}`}>{ways.address}</a> from <span className="dw-mono">{session.email}</span>.</li> : null}
              {ways.sms || ways.whatsapp ? (
                <li>
                  {ways.sms ? <>Text <span className="dw-mono is-number">{ways.sms}</span></> : null}
                  {ways.whatsapp ? <>{ways.sms ? " or WhatsApp " : "WhatsApp "}<span className="dw-mono is-number">{ways.whatsapp}</span></> : null}
                  {" "}from your mobile (add it under <a href={`${base}/password`}>your account</a>).
                </li>
              ) : null}
              {ways.slackInstallUrl ? <li>Type <span className="dw-mono is-number">/file</span> in Slack (<a href={ways.slackInstallUrl}>add CoFile to your Slack</a>).</li> : null}
            </ul>
          </div>
        ) : null}
      </div>
    );
  }
  const kinds = kindsForState(all, st.id);
  const pages = (company.partner || company.portal?.publicPages) ? kinds.filter((k) => SERVICE_SLUGS[k.id] && publicKind(k)) : [];
  const firmSlug = company.portal?.slug ?? slug;
  return (
    <div className="new2 is-kinds">
      <p className="dw-back"><Link href={`${base}/new`}><Arrow back />All states</Link></p>
      <h1>{st.name}: what are you filing?</h1>
      <p className="dw-lede">Fill it in yourself, or send your client a link to fill it in. Either way, you approve the proof before anything is filed or paid. Filing types go live one at a time; until then they run as rehearsals.</p>
      {kinds.length === 0 ? <Notice>No {st.name} filings are offered here yet.</Notice> : (
        <ul className="new2-kinds">
          {kinds.map((k) => {
            const live = liveFilings(k.id);
            return (
              <li key={k.id}>
                <Link className="new2-card is-kind" href={`${base}/new/${k.id}`} aria-describedby={live ? undefined : `why-${k.id}`}>
                  <span className="new2-kind-title">{k.title}</span>
                  <span className="new2-kind-chip">
                    {live ? <Chip tone="done">Live</Chip> : <Chip tone="rehearsal">Rehearsal</Chip>}
                    {/* The rehearsal chip's explanation: the card's description, and on hover or focus a tooltip; kept out of the
                        card's name, which stays the words on the card */}
                    {live ? null : <span className="new2-tip" id={`why-${k.id}`} aria-hidden="true">Runs on the state&apos;s real website and stops before the last button: nothing is filed or paid</span>}
                  </span>
                  <span className="new2-kind-summary">{k.summary}</span>
                  {k.feeNote ? <span className="new2-kind-fee">{k.feeNote}</span> : null}
                </Link>
              </li>
            );
          })}
        </ul>
      )}
      {pages.length ? (
        <section className="new2-pages" aria-labelledby="new2-pages-title">
          <h2 id="new2-pages-title">Your pages for clients</h2>
          <p className="new2-pages-line">Each service has a permanent page with your branding. Send it to any client, or put the form on your own website with the widget code; every submission becomes a filing here.</p>
          <ul>
            {pages.map((k) => {
              const url = firmPageUrl(company.tenantId, firmSlug, k);
              const snippet = widgetSnippet(company.tenantId, firmSlug, k);
              return (
                <li key={k.id} className="new2-page">
                  <p className="new2-page-title">{k.title}:</p>
                  <div className="dw-plate">
                    <a className="dw-plate-value" href={url} target="_blank" rel="noopener">{url}<span className="sr-only"> (opens in a new tab)</span></a>
                    <CopyButton value={url} />
                  </div>
                  <details className="dw-fold new2-widget">
                    <summary>Website widget: paste where the form should appear.</summary>
                    <div className="dw-code">
                      <pre>{snippet}</pre>
                      <CopyButton value={snippet} />
                    </div>
                  </details>
                </li>
              );
            })}
          </ul>
        </section>
      ) : null}
    </div>
  );
}
