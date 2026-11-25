import Link from "next/link";
import { CardCode } from "./CardCode";
import { saveCardCode, type WaitingCard } from "@/lib/cards";

/** V18: filings approved and ready to pay, grouped by the card waiting for its security code. */
export function PayWaiting({ waiting, filingHref, showFirm }: { waiting: WaitingCard[]; filingHref?: (id: string) => string; showFirm?: boolean }) {
  const key = process.env.BASIS_THEORY_PUBLIC_KEY;
  if (!waiting.length) return <p className="muted">Nothing is waiting for a card right now.</p>;
  return (
    <div className="stack">
      {waiting.map((w) => {
        const card = `${w.card}${w.last4 ? ` ending ${w.last4}` : ""}`;
        return (
          <div key={`${w.owner.clientCompanyId ?? "-"}:${w.methodId}`} className="card stack">
            <strong>{card}{showFirm && w.owner.name ? <span className="muted"> ({w.owner.name}&apos;s card)</span> : null}</strong>
            <ul className="small">
              {w.filings.map((f) => <li key={f.id}>{filingHref ? <Link href={filingHref(f.id)}>{f.title}</Link> : f.title} <span className="muted">approved, waiting since {new Date(f.since).toLocaleString()}</span></li>)}
            </ul>
            {key
              ? <CardCode publicKey={key} card={card} save={saveCardCode.bind(null, w.methodId, w.owner.clientCompanyId)} />
              : <p className="notice">Card payments need the card vault switched on for this site.</p>}
          </div>
        );
      })}
      <p className="help">A card&apos;s security code can&apos;t be stored, so we ask for it when filings are ready to pay. It goes straight to Basis Theory, our card vault, and is deleted within the hour.</p>
    </div>
  );
}
