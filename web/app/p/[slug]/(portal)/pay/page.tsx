import { firmContext } from "@/lib/firm";
import { waitingForCardCodes } from "@/lib/cards";
import { PayWaiting } from "@/components/PayWaiting";

export const metadata = { title: "Ready to pay" };

export default async function PayPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  await firmContext(slug);
  const waiting = await waitingForCardCodes();
  return (
    <div className="stack">
      <h1>Ready to pay</h1>
      <p className="muted">These filings are approved. Type your card&apos;s security code once and every filing waiting for that card is filed.</p>
      <PayWaiting waiting={waiting} filingHref={(id) => `/p/${encodeURIComponent(slug)}/filings/${encodeURIComponent(id)}`} />
    </div>
  );
}
