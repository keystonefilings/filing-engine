import Link from "next/link";
import { firmContext, offeredKinds } from "@/lib/firm";
import { engine, filingTitle, type Filing } from "@/lib/engine";
import { StageTrack } from "@/components/StageTrack";
import { sentBy } from "@/lib/sender";
import { NEEDS_ACTION, statusLabel } from "@/lib/status";
import { filingKind } from "@/lib/intake/forms";
import { waitingForCardCodes } from "@/lib/cards";
import { billingSummary } from "@/lib/billing";
import { Chip, statusTone } from "@/components/ui/Chip";
import { Notice } from "@/components/ui/Sheet";
import { ClientPagePreview } from "@/components/desk/ClientPagePreview";
import "@/styles/components/desk.css";

export const metadata = { title: "Filings" };

const DAY = new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric", year: "numeric" });

/** The desk's overview (merged spec 10B.4): the ledger of the firm's filings, who sent each and where it is up to. */
export default async function FilingsPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const { session, company, brand } = await firmContext(slug);
  const { filings } = await engine<{ filings: Filing[] }>(session.apiKey, `/v1/filings?clientCompanyId=${encodeURIComponent(session.clientCompanyId)}`);
  const base = `/p/${encodeURIComponent(slug)}`;
  const waiting = filings.filter((f) => NEEDS_ACTION.has(f.status)).length;
  const [codes, billing] = await Promise.all([waitingForCardCodes(), billingSummary()]);
  const toPay = codes.reduce((n, w) => n + w.filings.length, 0);
  const empty = filings.length === 0;
  return (
    <div className="desk2-filings">
      <div className="desk2-head">
        <h1>Filings</h1>
        {/* While the desk is empty its own "New filing" is the view's one Brass button (D5) */}
        {empty ? null : <Link className="btn primary is-main" href={`${base}/new`}>New filing</Link>}
      </div>
      {billing?.billed && !billing.canFileLive || toPay || waiting ? (
        <div className="desk2-notices">
          {billing?.billed && !billing.canFileLive ? <Notice tone="attention">Real filings need an active subscription; rehearsals are free. <Link href={`${base}/billing`}>Subscribe</Link></Notice> : null}
          {toPay ? <Notice tone="turn">{toPay === 1 ? "1 approved filing is ready to pay and needs" : `${toPay} approved filings are ready to pay and need`} your card&apos;s security code. <Link href={`${base}/pay`}>Pay and file</Link></Notice> : null}
          {waiting ? <Notice tone="turn">{waiting === 1 ? "1 filing needs" : `${waiting} filings need`} someone to act.</Notice> : null}
        </div>
      ) : null}
      {empty ? (
        <section className="desk2-empty">
          <div className="desk2-empty-text">
            <p>Your desk is clear. Start a filing (it can be a free rehearsal), or send a client a link with your logo on it.</p>
            <div className="desk2-empty-actions">
              <Link className="btn primary is-main" href={`${base}/new`}>New filing</Link>
              <Link className="btn" href={`${base}/client-links`}>Send a client a link</Link>
            </div>
          </div>
          <div className="desk2-empty-picture">
            <ClientPagePreview brand={brand} title={offeredKinds(company)[0]?.title ?? brand.name} label={`Preview: the page ${brand.name}'s clients see`} />
          </div>
        </section>
      ) : (
        <div className="ledger2">
          <table>
            <thead><tr><th scope="col">Filing</th><th scope="col">Sent by</th><th scope="col">Type</th><th scope="col">Status</th><th scope="col" className="is-date">Started</th></tr></thead>
            <tbody>
              {filings.map((f) => {
                const k = filingKind(String((f.request.intake as { portal?: { kind?: string } } | undefined)?.portal?.kind ?? ""));
                const by = sentBy(f);
                const turn = NEEDS_ACTION.has(f.status);
                return (
                  <tr key={f.id} className={turn ? "is-turn" : undefined}>
                    <th scope="row" className="ledger2-name">
                      <Link href={`${base}/filings/${encodeURIComponent(f.id)}`}>{filingTitle(f)}</Link>
                      {f.request.dryRun ? <Chip tone="rehearsal" compact>Test</Chip> : null}
                    </th>
                    <td className="ledger2-by">
                      {by ? <><span className="ledger2-who">{by.who}{by.client ? <Chip tone="quiet" compact>Your client</Chip> : null}</span>{by.detail ? <span className="ledger2-detail">{by.detail}</span> : null}</> : <span className="ledger2-team">Your team</span>}
                    </td>
                    <td className="ledger2-type">{k?.title ?? `${f.request.state} ${f.request.type.replace(/_/g, " ")}`}</td>
                    <td className="ledger2-status"><Chip tone={statusTone(f.status)}>{statusLabel(f.status).label}</Chip><StageTrack status={f.status} /></td>
                    <td className="ledger2-date"><time dateTime={f.createdAt}>{DAY.format(new Date(f.createdAt))}</time></td>
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
