import { requireTenant } from "@/lib/session";
import { waitingForCardCodes } from "@/lib/cards";
import { PayWaiting } from "@/components/PayWaiting";
import { Vignette } from "@/components/Vignette";

export const metadata = { title: "Ready to pay" };

/**
 * Ready to pay (merged spec 10C.6): the calmest page, one card per saved card waiting and one field each. "Pay and
 * file" is the page's Brass when a single card waits, Ink on every card when two or more do. Empty, the clear desk
 * (V2) sits over the product's line.
 */
export default async function PayPage() {
  await requireTenant();
  const waiting = await waitingForCardCodes();
  return (
    <div className={["dash2-pay", waiting.length === 1 && "is-one"].filter(Boolean).join(" ")}>
      <h1>Ready to pay</h1>
      <p className="muted">Approved filings that pay the state with a saved card wait here for the card&apos;s security code (the 3 or 4 digits on the card). Enter it once and every filing waiting for that card goes ahead. We keep the code for an hour at most, then delete it.</p>
      {waiting.length ? <PayWaiting waiting={waiting} showFirm /> : (
        <div className="dash2-empty">
          <Vignette name="v02-clear-desk" size={120} />
          <p className="muted">Nothing is waiting for a card right now.</p>
        </div>
      )}
    </div>
  );
}
