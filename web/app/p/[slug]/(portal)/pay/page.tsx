import { Vignette } from "@/components/Vignette";
import "@/styles/components/desk.css";
import { firmContext } from "@/lib/firm";
import { waitingForCardCodes } from "@/lib/cards";
import { PayWaiting } from "@/components/PayWaiting";

export const metadata = { title: "Ready to pay" };

export default async function PayPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  await firmContext(slug);
  const waiting = await waitingForCardCodes();
  return (
    <div className={waiting.length === 1 ? "stack desk2-one" : "stack"}>
      <h1>Ready to pay</h1>
      <p className="muted">Approved filings that pay the state with a saved card wait here for the card&apos;s security code (the 3 or 4 digits on the card). Enter it once and every filing waiting for that card goes ahead. We keep the code for an hour at most, then delete it.</p>
      {waiting.length
        ? <PayWaiting waiting={waiting} filingHref={(id) => `/p/${encodeURIComponent(slug)}/filings/${encodeURIComponent(id)}`} />
        : <div className="desk2-quiet"><Vignette name="v07-card-face-down" size={120} /><p>Nothing is waiting for a card right now.</p></div>}
    </div>
  );
}
