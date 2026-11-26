import Link from "next/link";
import { engine, type Account, type Usage } from "@/lib/engine";
import { requireTenant } from "@/lib/session";
import { statusLabel } from "@/lib/status";
import { waitingForCardCodes } from "@/lib/cards";
import { billingSummary } from "@/lib/billing";

export const metadata = { title: "Overview" };

const Bars = ({ data }: { data: Record<string, number> }) => {
  const rows = Object.entries(data).sort((a, b) => b[1] - a[1]);
  const max = Math.max(1, ...rows.map(([, n]) => n));
  return rows.length ? (
    <table><tbody>{rows.map(([k, n]) => (
      <tr key={k}><td style={{ width: "40%" }}>{k}</td><td><div style={{ background: "var(--accent)", height: 10, borderRadius: 4, width: `${(n / max) * 100}%`, minWidth: 4 }} /></td><td style={{ width: 50, textAlign: "right" }}>{n}</td></tr>
    ))}</tbody></table>
  ) : <p className="muted small">None yet.</p>;
};

export default async function Overview() {
  const s = await requireTenant();
  const [account, usage, toPay, billing] = await Promise.all([engine<Account>(s.apiKey, "/v1/account"), engine<Usage>(s.apiKey, "/v1/usage"), waitingForCardCodes(), billingSummary()]);
  const payCount = toPay.reduce((n, w) => n + w.filings.length, 0);
  const byStatus = Object.fromEntries(Object.entries(usage.filings.byStatus).map(([k, n]) => [statusLabel(k).label, n]));
  const months = Object.entries(usage.filings.byMonth).sort(([a], [b]) => a.localeCompare(b)).slice(-12);
  return (
    <div className="stack">
      <h1>{account.name}</h1>
      {billing?.billed && !billing.canFileLive ? <p className="notice warn">Real filings need an active subscription; practice filings are free. <Link href="/dashboard/billing">Subscribe</Link></p> : null}
      {payCount ? <p className="notice warn">{payCount === 1 ? "1 approved filing is" : `${payCount} approved filings are`} ready to pay and need a card&apos;s security code. <Link href="/dashboard/pay">Pay and file</Link></p> : null}
      {!account.configured ? <p className="notice warn">Your account settings haven&apos;t been set up by the platform yet, so filings can&apos;t be approved or run. Ask the platform team to configure tenant <code>{account.tenantId}</code>.</p> : null}
      <div className="grid">
        <div className="card"><div className="muted small">Filings</div><div className="stat">{usage.filings.total}</div><div className="small muted">{usage.filings.live} live, {usage.filings.total - usage.filings.live} practice</div></div>
        <div className="card"><div className="muted small">Webhook deliveries</div><div className="stat">{usage.webhooks.delivered ?? 0}</div><div className="small muted">{usage.webhooks.pending ?? 0} pending, {usage.webhooks.dead ?? 0} failed</div></div>
        <div className="card"><div className="muted small">API keys</div><div className="stat">{usage.apiKeys.live}</div><div className="small muted"><Link href="/dashboard/keys">Manage keys</Link></div></div>
      </div>
      <div className="grid">
        <div className="card"><strong>By status</strong><Bars data={byStatus} /></div>
        <div className="card"><strong>By state</strong><Bars data={usage.filings.byState} /></div>
        <div className="card"><strong>By month</strong><Bars data={Object.fromEntries(months)} /></div>
      </div>
      <p className="small muted">As of {new Date(usage.generatedAt).toLocaleString()}.</p>
    </div>
  );
}
