import Link from "next/link";
import { Vignette } from "@/components/Vignette";
import "@/styles/components/desk-work.css";
import { firmContext } from "@/lib/firm";
import { saveCardCode, waitingForCardCodes } from "@/lib/cards";
import { CardCode } from "@/components/CardCode";
import { Notice } from "@/components/ui/Sheet";

export const metadata = { title: "Ready to pay" };

const DAYTIME = new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric", year: "numeric", hour: "numeric", minute: "2-digit" });

/**
 * Ready to pay (merged spec 10B.17; the dashboard's 10C.6 for one firm's cards): a narrow page, one white sheet per
 * card waiting, its filings as rows led by the Ochre lozenge, then the card's security code and "Pay and file": Brass
 * when one card waits (the page's one action), Ink on every card when two or more do. Once a code goes through, the
 * field folds away and each lozenge turns to a ring.
 */
export default async function PayPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  await firmContext(slug);
  const waiting = await waitingForCardCodes();
  const key = process.env.BASIS_THEORY_PUBLIC_KEY;
  const filingHref = (id: string) => `/p/${encodeURIComponent(slug)}/filings/${encodeURIComponent(id)}`;
  return (
    <div className={["pay2", waiting.length === 1 && "is-one"].filter(Boolean).join(" ")}>
      <h1>Ready to pay</h1>
      <p className="dw-lede">Approved filings that pay the state with a saved card wait here for the card&apos;s security code (the 3 or 4 digits on the card). Enter it once and every filing waiting for that card goes ahead. We keep the code for an hour at most, then delete it.</p>
      {waiting.length ? (
        <>
          {waiting.map((w) => {
            const card = `${w.card}${w.last4 ? ` ending ${w.last4}` : ""}`;
            return (
              <section key={`${w.owner.clientCompanyId ?? "-"}:${w.methodId}`} className="pay2-card">
                <h2 className="pay2-plate"><span className="pay2-glyph" aria-hidden="true" />{card}</h2>
                <ul className="pay2-filings">
                  {w.filings.map((f) => (
                    <li key={f.id}><Link href={filingHref(f.id)}>{f.title}</Link> <span className="pay2-since">approved, waiting since <time dateTime={f.since}>{DAYTIME.format(new Date(f.since))}</time></span></li>
                  ))}
                </ul>
                <div className="pay2-code">
                  {key
                    ? <CardCode publicKey={key} card={card} save={saveCardCode.bind(null, w.methodId, w.owner.clientCompanyId)} />
                    : <Notice>Card payments need the card vault switched on for this site.</Notice>}
                </div>
              </section>
            );
          })}
          <p className="pay2-help">A card&apos;s security code can&apos;t be stored, so we ask for it when filings are ready to pay. It goes straight to Basis Theory, our card vault, and is deleted within the hour.</p>
        </>
      ) : (
        <div className="dw-empty is-open">
          <Vignette name="v07-card-face-down" size={120} />
          <p>Nothing is waiting for a card right now.</p>
        </div>
      )}
    </div>
  );
}
