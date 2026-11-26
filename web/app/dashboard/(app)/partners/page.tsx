import { engine, EngineError, type Inquiry, type PublicUser } from "@/lib/engine";
import { requireTenant } from "@/lib/session";
import { isPlatformTenant } from "@/lib/brand";
import { Chip } from "@/components/ui/Chip";
import { decideInquiry, decideSignup } from "./actions";

export const metadata = { title: "Sign-ups" };

const TYPE: Record<string, string> = { cpa: "CPA", payroll: "Payroll", cfo: "CFO", other: "Other" };
const DAY = new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric", year: "numeric" });

/**
 * Sign-ups (merged spec 10C.15), the platform's own account only: who gets a filing desk, and which enterprise
 * requests become accounts. Every row has its own Approve, so it is Ink; turning down is Danger.
 */
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
    <div className="dash2-signups">
      <h1>Sign-ups</h1>
      <p className="muted">{mode === "automatic" ? "New partner accounts open straight away, without a review." : "New partner accounts wait here for approval. Approving opens their dashboard; nothing is emailed, so let them know yourself."}</p>

      <h2>Waiting for approval</h2>
      {pending.length === 0 ? <p className="muted">None.</p> : (
        <div className="dash2-table is-blocks">
          <table>
            <thead><tr><th scope="col">Firm</th><th scope="col">Contact</th><th scope="col">States, volume</th><th scope="col">Signed up</th><th scope="col"><span className="sr-only">Approve</span></th></tr></thead>
            <tbody>
              {pending.map((u) => (
                <tr key={u.id}>
                  <th scope="row"><span className="dash2-strong">{u.signup?.companyName}</span><span className="dash2-sub">{TYPE[u.signup?.companyType ?? "other"]}{u.signup?.website ? ` · ${u.signup.website}` : ""}</span></th>
                  <td data-label="Contact" className="small dash2-lines">{u.name}<br />{u.email}{u.signup?.phone ? <><br />{u.signup.phone}</> : null}</td>
                  <td data-label="States, volume" className="small dash2-lines">{u.signup?.states?.join(", ") || "—"}<br />{u.signup?.expectedVolume ?? ""}</td>
                  <td data-label="Signed up" className="small muted dash2-when">{DAY.format(new Date(u.createdAt))}</td>
                  <td className="is-action">
                    <div className="dash2-decide">
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
          <div className="dash2-table is-blocks">
            <table>
              <thead><tr><th scope="col">Firm</th><th scope="col">Contact</th><th scope="col">Status</th></tr></thead>
              <tbody>{rest.map((u) => (
                <tr key={u.id}>
                  <th scope="row">{u.signup?.companyName}</th>
                  <td data-label="Contact" className="small">{u.email}</td>
                  <td data-label="Status">{u.status === "active" ? <Chip tone="done-quiet" compact>Approved</Chip> : <Chip tone="neutral" compact>{u.status}</Chip>}</td>
                </tr>
              ))}</tbody>
            </table>
          </div>
        </>
      ) : null}

      {inquiries ? (
        <>
          <h2>Enterprise requests</h2>
          <p className="muted">From the contact form on the landing page. Approving creates the account and emails the person a link to set their password (it works for 7 days).</p>
          {inquiries.length === 0 ? <p className="muted">None yet.</p> : (
            <div className="dash2-table is-blocks">
              <table>
                <thead><tr><th scope="col">Company</th><th scope="col">Contact</th><th scope="col">States, volume</th><th scope="col">Message</th><th scope="col">Sent</th><th scope="col">Status</th></tr></thead>
                <tbody>{inquiries.map((q) => (
                  <tr key={q.id}>
                    <th scope="row"><span className="dash2-strong">{q.company}</span></th>
                    <td data-label="Contact" className="small dash2-lines">{q.name}<br />{q.email}{q.phone ? <><br />{q.phone}</> : null}</td>
                    <td data-label="States, volume" className="small dash2-lines">{q.states ?? ""}<br />{q.volume ?? ""}</td>
                    <td data-label="Message" className="small dash2-message">{q.message ?? ""}</td>
                    <td data-label="Sent" className="small muted dash2-when">{DAY.format(new Date(q.createdAt))}</td>
                    <td data-label="Status" className="small">{q.status === "approved" ? <Chip tone="done-quiet" compact>Approved{q.tenantId ? <> (<code>{q.tenantId}</code>)</> : ""}</Chip> : q.status === "declined" ? <Chip tone="neutral" compact>Declined</Chip> : (
                      <div className="dash2-decide">
                        <form action={decideInquiry.bind(null, q.id, "approve")}><button className="btn small primary" type="submit">Approve</button></form>
                        <form action={decideInquiry.bind(null, q.id, "decline")}><button className="btn small" type="submit">Decline</button></form>
                      </div>
                    )}</td>
                  </tr>
                ))}</tbody>
              </table>
            </div>
          )}
        </>
      ) : null}
    </div>
  );
}
