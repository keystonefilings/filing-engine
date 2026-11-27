import { cancelAgentService, type AgentService } from "@/lib/agent-services";
import { Notice } from "@/components/ui/Sheet";

const day = (iso: string) => new Date(iso).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });

/**
 * Decision 9: the businesses using our registered agent service, with renewal dates and cancel. On Billing (10B.18), a
 * white sheet with the offer line and the dashboard's ledger; on phones each business is a block.
 */
export function AgentServicesPanel({ offer, services }: { offer: { provider: string; annualUsd: number; states: string[] } | null; services: AgentService[] }) {
  return (
    <section className="ds2-sheet ds2-ra" aria-labelledby="ra-title">
      <h2 className="ds2-card-title" id="ra-title">Registered agent service</h2>
      {offer
        ? <p className="ds2-small ds2-measure">When a filing uses our registered agent ({offer.provider}, in {offer.states.join(", ")}), the service is ${offer.annualUsd} a year per business, added to your next invoice when the filing is submitted and renewed each year until you cancel it.</p>
        : null}
      {services.length === 0 ? <Notice>No businesses use our registered agent yet.</Notice> : (
        <div className="ds2-ledger">
          <table>
            <thead><tr><th scope="col">Business</th><th scope="col">State</th><th scope="col">Since</th><th scope="col">Status</th><td /></tr></thead>
            <tbody>{services.map((s) => (
              <tr key={s.id}>
                <th scope="row" id={`ra-${s.id}`}>{s.entityName}</th>
                <td data-label="State">{s.state}</td>
                <td data-label="Since" className="ds2-num">{day(s.startedAt)}</td>
                <td data-label="Status" className="ds2-num">{s.status === "active" ? `Renews ${day(s.nextChargeAt)}` : `Cancelled ${s.cancelledAt ? day(s.cancelledAt) : ""}${s.lastChargedAt ? `; covered until ${day(new Date(new Date(s.lastChargedAt).setFullYear(new Date(s.lastChargedAt).getFullYear() + 1)).toISOString())}` : ""}`}</td>
                <td className="ds2-ledger-action">{s.status === "active" ? <form action={cancelAgentService.bind(null, s.id)}><button className="btn small" type="submit" aria-describedby={`ra-${s.id}`}>Cancel renewal</button></form> : null}</td>
              </tr>
            ))}</tbody>
          </table>
        </div>
      )}
      <p className="ds2-small ds2-measure">Cancelling stops the next renewal; the year already paid runs to its end. Before it ends, name a new registered agent with the state, or the business may fall out of good standing.</p>
    </section>
  );
}
