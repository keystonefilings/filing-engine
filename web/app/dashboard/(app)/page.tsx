import Link from "next/link";
import { engine, type Account, type Usage } from "@/lib/engine";
import { requireTenant } from "@/lib/session";
import { statusLabel } from "@/lib/status";
import { waitingForCardCodes } from "@/lib/cards";
import { billingSummary } from "@/lib/billing";
import { statusTone } from "@/components/ui/Chip";
import { Glyph, type GlyphKind } from "@/components/ui/glyphs";
import { Notice } from "@/components/ui/Sheet";

export const metadata = { title: "Overview" };

const GLYPH: Record<string, GlyphKind> = { done: "done", turn: "turn", attention: "attention", inhand: "inhand", problem: "problem" };
const MONTH = new Intl.DateTimeFormat("en-US", { month: "short", year: "numeric", timeZone: "UTC" });
const WHEN = new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric", year: "numeric", hour: "numeric", minute: "2-digit" });

interface Row { key: string; label: string; n: number; glyph?: { kind: GlyphKind; tone: string }; current?: boolean }

/**
 * One of the product's tables of counts drawn as a quiet chart (10C.4): the label on its own line, under it a bar in
 * one ink on a full-width track and the value, printed. It stays a real table, so the numbers are read aloud.
 */
function Chart({ title, rows }: { title: string; rows: Row[] }) {
  const max = Math.max(1, ...rows.map((r) => r.n));
  return (
    <section className="dash2-chart">
      <h2 className="dash2-chart-title">{title}</h2>
      {rows.length ? (
        <table role="table" className="dash2-bars">
          <tbody role="rowgroup">
            {rows.map((r) => (
              <tr key={r.key} role="row">
                <th scope="row" role="rowheader" className={r.current ? "is-current" : undefined}>
                  {r.glyph ? <span className={`dash2-glyph is-${r.glyph.tone}`}><Glyph kind={r.glyph.kind} /></span> : null}{r.label}
                </th>
                <td role="cell">
                  <span className="dash2-track" aria-hidden="true"><span style={{ width: `${(r.n / max) * 100}%` }} /></span>
                  <span className="dash2-value">{r.n}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : <p className="muted small">None yet.</p>}
    </section>
  );
}

/** The Overview (merged spec 10C.4): the account's name, its notices, three figures and three quiet charts. */
export default async function Overview() {
  const s = await requireTenant();
  const [account, usage, toPay, billing] = await Promise.all([engine<Account>(s.apiKey, "/v1/account"), engine<Usage>(s.apiKey, "/v1/usage"), waitingForCardCodes(), billingSummary()]);
  const payCount = toPay.reduce((n, w) => n + w.filings.length, 0);
  const byStatus: Row[] = Object.entries(usage.filings.byStatus).sort((a, b) => b[1] - a[1]).map(([k, n]) => {
    const tone = statusTone(k);
    return { key: k, label: statusLabel(k).label, n, glyph: GLYPH[tone] ? { kind: GLYPH[tone]!, tone } : undefined };
  });
  const byState: Row[] = Object.entries(usage.filings.byState).sort((a, b) => b[1] - a[1]).map(([k, n]) => ({ key: k, label: k, n }));
  const thisMonth = new Date().toISOString().slice(0, 7);
  // The product's last 12 months, kept in date order; the keys are shown as a short month and year.
  const byMonth: Row[] = Object.entries(usage.filings.byMonth).sort(([a], [b]) => a.localeCompare(b)).slice(-12).map(([k, n]) => {
    const d = /^\d{4}-\d{2}$/.test(k) ? new Date(`${k}-01T00:00:00Z`) : null;
    return { key: k, label: d ? MONTH.format(d) : k, n, current: k === thisMonth };
  });
  const notices = billing?.billed && !billing.canFileLive || payCount || !account.configured;
  return (
    <div className="dash2-overview">
      <h1>{account.name}</h1>
      {notices ? (
        <div className="dash2-notices">
          {billing?.billed && !billing.canFileLive ? <Notice tone="attention">Real filings need an active subscription; rehearsals are free. <Link href="/dashboard/billing">Subscribe</Link></Notice> : null}
          {payCount ? <Notice tone="turn">{payCount === 1 ? "1 approved filing is ready to pay and needs" : `${payCount} approved filings are ready to pay and need`} a card&apos;s security code. <Link href="/dashboard/pay">Pay and file</Link></Notice> : null}
          {!account.configured ? <Notice tone="attention">Your account settings haven&apos;t been set up by the platform yet, so filings can&apos;t be approved or run. Ask the platform team to configure tenant <code>{account.tenantId}</code>.</Notice> : null}
        </div>
      ) : null}
      <div className="dash2-tiles">
        <div className="dash2-tile"><div className="dash2-tile-label">Filings</div><div className="dash2-stat">{usage.filings.total}</div><div className="dash2-tile-sub">{usage.filings.live} live, {usage.filings.total - usage.filings.live} rehearsals</div></div>
        <div className="dash2-tile"><div className="dash2-tile-label">Webhook deliveries</div><div className="dash2-stat">{usage.webhooks.delivered ?? 0}</div><div className="dash2-tile-sub">{usage.webhooks.pending ?? 0} pending, {usage.webhooks.dead ?? 0} failed</div></div>
        <div className="dash2-tile"><div className="dash2-tile-label">API keys</div><div className="dash2-stat">{usage.apiKeys.live}</div><div className="dash2-tile-sub"><Link href="/dashboard/keys">Manage keys</Link></div></div>
      </div>
      <div className="dash2-charts">
        <Chart title="By status" rows={byStatus} />
        <Chart title="By state" rows={byState} />
        <Chart title="By month" rows={byMonth} />
      </div>
      <p className="dash2-asof">As of {WHEN.format(new Date(usage.generatedAt))}.</p>
    </div>
  );
}
