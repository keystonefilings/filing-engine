import { requireTenant } from "@/lib/session";
import { waitingForCardCodes } from "@/lib/cards";
import { PayWaiting } from "@/components/PayWaiting";

export const metadata = { title: "Ready to pay" };

export default async function PayPage() {
  await requireTenant();
  const waiting = await waitingForCardCodes();
  return (
    <div className="stack">
      <h1>Ready to pay</h1>
      <p className="muted">Approved filings that pay the state with a saved card wait here for the card&apos;s security code (the 3 or 4 digits on the card). Enter it once and every filing waiting for that card goes ahead. We keep the code for an hour at most, then delete it.</p>
      <PayWaiting waiting={waiting} showFirm />
    </div>
  );
}
