import { engine, filingTitle, type ClientCompany, type Filing } from "@/lib/engine";
import { requireTenant } from "@/lib/session";
import { statusLabel } from "@/lib/status";
import { StageTrack } from "@/components/StageTrack";
import { Chip, statusTone } from "@/components/ui/Chip";
import { AutoSubmitSelect } from "@/components/dashboard/AutoSubmitSelect";
import "@/styles/components/desk.css";

export const metadata = { title: "Filings" };

const DAY = new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric", year: "numeric" });

/**
 * Every filing across the platform's firms (merged spec 10C.5), in the desk's ledger construction (10B.4): the
 * filing and its id, the firm (not "Sent by": this list spans firms), the type, the status chip with the five-step
 * track, and the date. Rows waiting for a card's code carry the Your-turn edge, since that is the reader's to do.
 */
export default async function AllFilings({ searchParams }: { searchParams: Promise<{ firm?: string }> }) {
  const s = await requireTenant();
  const { firm } = await searchParams;
  const [{ filings }, { clientCompanies }] = await Promise.all([
    engine<{ filings: Filing[] }>(s.apiKey, `/v1/filings${firm ? `?clientCompanyId=${encodeURIComponent(firm)}` : ""}`),
    engine<{ clientCompanies: ClientCompany[] }>(s.apiKey, "/v1/client-companies"),
  ]);
  const names = new Map(clientCompanies.map((c) => [c.clientCompanyId, c.name]));
  return (
    <div className="dash2-filings">
      <h1>Filings</h1>
      <form className="dash2-filter" method="get">
        <AutoSubmitSelect name="firm" defaultValue={firm ?? ""} label="Firm"><option value="">All firms</option>{clientCompanies.map((c) => <option key={c.clientCompanyId} value={c.clientCompanyId}>{c.name}</option>)}</AutoSubmitSelect>
        <button className="btn" type="submit">Show</button>
      </form>
      <div className="ledger2 is-dash">
        <table>
          <thead><tr><th scope="col">Filing</th><th scope="col">Firm</th><th scope="col">Type</th><th scope="col">Status</th><th scope="col" className="is-date">Created</th></tr></thead>
          <tbody>
            {filings.length === 0 ? <tr className="is-empty"><td colSpan={5}>No filings.</td></tr> : filings.slice(0, 500).map((f) => (
              <tr key={f.id} className={f.awaitingCardCode ? "is-turn" : undefined}>
                <th scope="row" className="ledger2-name">
                  <span className="ledger2-title">{filingTitle(f)}</span>
                  {f.request.dryRun ? <Chip tone="rehearsal" compact>Test</Chip> : null}
                  <code className="ledger2-id">{f.id}</code>
                </th>
                <td className="ledger2-by">{names.get(f.clientCompanyId) ?? f.clientCompanyId}</td>
                <td className="ledger2-type">{f.request.state} {f.request.type.replace(/_/g, " ")}</td>
                <td className="ledger2-status">
                  <Chip tone={statusTone(f.status) === "done" ? "done-quiet" : statusTone(f.status)}>{statusLabel(f.status).label}</Chip>
                  <StageTrack status={f.status} />
                  {f.awaitingCardCode ? <a className="ledger2-pay" href="/dashboard/pay">Ready to pay: needs the card&apos;s code</a> : null}
                </td>
                <td className="ledger2-date"><time dateTime={f.createdAt}>{DAY.format(new Date(f.createdAt))}</time></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
