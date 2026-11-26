import { cancelAgentService, type AgentService } from "@/lib/agent-services";

const day = (iso: string) => new Date(iso).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });

/** Decision 9: the businesses using our registered agent service, with renewal dates and cancel. */
export function AgentServicesPanel({ offer, services }: { offer: { provider: string; annualUsd: number; states: string[] } | null; services: AgentService[] }) {
  return (
    <div className="card stack" style={{ maxWidth: 760 }}>
      <strong>Registered agent service</strong>
      {offer
        ? <p className="small muted" style={{ margin: 0 }}>When a filing uses our registered agent ({offer.provider}, in {offer.states.join(", ")}), the service is ${offer.annualUsd} a year per business, added to your next invoice when the filing is submitted and renewed each year until you cancel it.</p>
        : null}
      {services.length === 0 ? <p className="muted" style={{ margin: 0 }}>No businesses use our registered agent yet.</p> : (
        <div className="table-wrap">
          <table>
            <thead><tr><th>Business</th><th>State</th><th>Since</th><th>Status</th><th /></tr></thead>
            <tbody>{services.map((s) => (
              <tr key={s.id}>
                <td>{s.entityName}</td><td>{s.state}</td><td className="small">{day(s.startedAt)}</td>
                <td className="small">{s.status === "active" ? `Renews ${day(s.nextChargeAt)}` : `Cancelled ${s.cancelledAt ? day(s.cancelledAt) : ""}${s.lastChargedAt ? `; covered until ${day(new Date(new Date(s.lastChargedAt).setFullYear(new Date(s.lastChargedAt).getFullYear() + 1)).toISOString())}` : ""}`}</td>
                <td>{s.status === "active" ? <form action={cancelAgentService.bind(null, s.id)}><button className="btn small" type="submit">Cancel renewal</button></form> : null}</td>
              </tr>
            ))}</tbody>
          </table>
        </div>
      )}
      <p className="help">Cancelling stops the next renewal; the year already paid runs to its end. Before it ends, name a new registered agent with the state, or the business may fall out of good standing.</p>
    </div>
  );
}
