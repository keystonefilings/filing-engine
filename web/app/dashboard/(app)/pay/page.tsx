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
      <p className="muted">These filings are approved. Type the card&apos;s security code once and every filing waiting for that card is filed.</p>
      <PayWaiting waiting={waiting} showFirm />
    </div>
  );
}
