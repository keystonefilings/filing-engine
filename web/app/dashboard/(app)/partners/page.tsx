import { engine, EngineError, type Inquiry, type PublicUser } from "@/lib/engine";
import { requireTenant } from "@/lib/session";
import { isPlatformTenant } from "@/lib/brand";
import { decideInquiry, decideSignup } from "./actions";

export const metadata = { title: "Sign-ups" };

const TYPE: Record<string, string> = { cpa: "CPA", payroll: "Payroll", cfo: "CFO", other: "Other" };

export default async function PartnersPage() {
  const s = await requireTenant();
  const { mode, signups } = await engine<{ mode: string; signups: PublicUser[] }>(s.apiKey, "/v1/partner-signups");
  let inquiries: Inquiry[] | null = null;
  if (isPlatformTenant(s.tenantId)) {
    try { inquiries = (await engine<{ inquiries: Inquiry[] }>(s.apiKey, "/v1/inquiries")).inquiries; } catch (e) { if (!(e instanceof EngineError && e.status === 403)) throw e; }
  }
  const pending = signups.filter((u) => u.status === "pending");
  const rest = signups.filter((u) => u.status !== "pending");
  return (
    <div className="stack">
      <h1>Sign-ups</h1>
      <p className="muted">{mode === "automatic" ? "New partner accounts open straight away, without a review." : "New partner accounts wait here for approval. Approving opens their dashboard; nothing is emailed, so let them know yourself."}</p>

      <h2>Waiting for approval</h2>
      {pending.length === 0 ? <p className="muted">None.</p> : (
        <div className="table-wrap card" style={{ padding: 0 }}>
          <table>
            <thead><tr><th>Firm</th><th>Contact</th><th>States, volume</th><th>Signed up</th><th /></tr></thead>
            <tbody>
              {pending.map((u) => (
                <tr key={u.id}>
                  <td><strong>{u.signup?.companyName}</strong><br /><span className="small muted">{TYPE[u.signup?.companyType ?? "other"]}{u.signup?.website ? ` · ${u.signup.website}` : ""}</span></td>
                  <td className="small">{u.name}<br />{u.email}{u.signup?.phone ? <><br />{u.signup.phone}</> : null}</td>
                  <td className="small">{u.signup?.states?.join(", ") || "—"}<br />{u.signup?.expectedVolume ?? ""}</td>
                  <td className="small muted">{new Date(u.createdAt).toLocaleDateString()}</td>
                  <td>
                    <div className="row">
                      <form action={decideSignup.bind(null, u.id, "approve")}><button className="btn small primary" type="submit">Approve</button></form>
                      <form action={decideSignup.bind(null, u.id, "reject")}><button className="btn small danger" type="submit">Turn down</button></form>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {rest.length ? (
        <>
          <h2>Decided</h2>
          <div className="table-wrap card" style={{ padding: 0 }}>
            <table>
              <thead><tr><th>Firm</th><th>Contact</th><th>Status</th></tr></thead>
              <tbody>{rest.map((u) => <tr key={u.id}><td>{u.signup?.companyName}</td><td className="small">{u.email}</td><td><span className={`badge ${u.status === "active" ? "ok" : "bad"}`}>{u.status === "active" ? "Approved" : u.status}</span></td></tr>)}</tbody>
            </table>
          </div>
        </>
      ) : null}

      {inquiries ? (
        <>
          <h2>Enterprise requests</h2>
          <p className="muted">From the contact form on the landing page. Approving creates the account and emails the person a link to set their password (it works for 7 days).</p>
          {inquiries.length === 0 ? <p className="muted">None yet.</p> : (
            <div className="table-wrap card" style={{ padding: 0 }}>
              <table>
                <thead><tr><th>Company</th><th>Contact</th><th>States, volume</th><th>Message</th><th>Sent</th><th>Status</th></tr></thead>
                <tbody>{inquiries.map((q) => (
                  <tr key={q.id}><td><strong>{q.company}</strong></td><td className="small">{q.name}<br />{q.email}{q.phone ? <><br />{q.phone}</> : null}</td>
                    <td className="small">{q.states ?? ""}<br />{q.volume ?? ""}</td><td className="small">{q.message ?? ""}</td><td className="small muted">{new Date(q.createdAt).toLocaleDateString()}</td>
                    <td className="small">{q.status === "approved" ? <span className="badge ok">Approved{q.tenantId ? ` (${q.tenantId})` : ""}</span> : q.status === "declined" ? <span className="badge">Declined</span> : (
                      <div className="row" style={{ gap: 6 }}>
                        <form action={decideInquiry.bind(null, q.id, "approve")}><button className="btn small primary" type="submit">Approve</button></form>
                        <form action={decideInquiry.bind(null, q.id, "decline")}><button className="btn small" type="submit">Decline</button></form>
                      </div>
                    )}</td></tr>
                ))}</tbody>
              </table>
            </div>
          )}
        </>
      ) : null}
    </div>
  );
}
