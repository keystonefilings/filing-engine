import { removeCard } from "@/lib/cards";

/** V18: the cards saved for state fees (or the subscription), with a way to remove each. */
export function SavedCards({ methods }: { methods: { id: string; label: string; brand?: string; last4?: string; purpose?: string }[] }) {
  if (!methods.length) return null;
  return (
    <ul className="small" style={{ listStyle: "none", padding: 0 }}>
      {methods.map((m) => (
        <li key={m.id} className="row" style={{ gap: 8, marginBottom: 6 }}>
          <span>{m.label}{m.last4 ? ` · ending ${m.last4}` : ""}{m.purpose === "subscription" ? " · subscription" : ""}</span>
          <form action={removeCard.bind(null, m.id)}><button className="btn small" type="submit">Remove</button></form>
        </li>
      ))}
    </ul>
  );
}
