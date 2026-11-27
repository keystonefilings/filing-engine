import "@/styles/components/desk.css";
import "@/styles/components/desk-setup.css";
import { notFound } from "next/navigation";
import { firmContext, offeredKinds } from "@/lib/firm";
import { PaymentsForm } from "@/components/SetupForms";
import { savePayments } from "../actions";
import { AddCard } from "@/components/AddCard";
import { removeCard, saveCard } from "@/lib/cards";
import { platformName, supportEmail } from "@/lib/brand";
import { Notice } from "@/components/ui/Sheet";
import type { PaymentMethodRef } from "@/lib/engine";

export const metadata = { title: "Payment" };

/**
 * The saved cards as card plates (10B.8): white rows in one sheet, a drawn card with one stripe and no network art,
 * "{label} · ending {last4}", and "Remove". The desk's own drawing of SavedCards (which the dashboard keeps), with the
 * same words and the same remove action.
 */
function CardPlates({ methods }: { methods: PaymentMethodRef[] }) {
  if (!methods.length) return null;
  return (
    <ul className="ds2-sheet ds2-cards">
      {methods.map((m) => (
        <li key={m.id}>
          <span className="ds2-cardglyph" aria-hidden="true" />
          <span className="ds2-cardname" id={`card-${m.id}`}>{m.label}{m.last4 ? ` · ending ${m.last4}` : ""}{m.purpose === "subscription" ? " · subscription" : ""}</span>
          <form action={removeCard.bind(null, m.id)}><button className="btn small" type="submit" aria-describedby={`card-${m.id}`}>Remove</button></form>
        </li>
      ))}
    </ul>
  );
}

/** Payment, Step 3 of 3 (merged spec 10B.8): the paragraph, the saved cards, "Add a card", then how state fees are paid. */
export default async function PaymentsPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const { company } = await firmContext(slug);
  if (!company.partner) notFound();
  const methods = company.payments?.methods ?? [];
  // One Brass button at a time (D5): "Save card" while no card pays state fees, then the fees form's "Save".
  const noCards = !methods.some((m) => m.purpose === "state_fees");
  return (
    <div className={["narrow ds2 ds2-pay", noCards && "is-nocards"].filter(Boolean).join(" ")}>
      <p className="ds2-kicker">Step 3 of 3</p>
      <h1>Payment</h1>
      <p className="ds2-lede is-ink">State fees are charged by the state when a filing is submitted, after you approve the exact amount on the proof. Saved cards are held by Basis Theory, a card vault, never by {platformName()}. A card&apos;s security code isn&apos;t saved, so when approved filings are ready to pay, we ask the card&apos;s owner to enter it on the <a href={`/p/${encodeURIComponent(slug)}/pay`}>Ready to pay</a> page and keep it for an hour at most. Filings wait until it&apos;s entered.</p>
      <CardPlates methods={methods} />
      {process.env.BASIS_THEORY_PUBLIC_KEY
        ? <div className="ds2-addcard"><AddCard publicKey={process.env.BASIS_THEORY_PUBLIC_KEY} save={saveCard} /></div>
        : <Notice>Saving cards isn&apos;t turned on for your account yet. Email {supportEmail()} to turn it on.</Notice>}
      <PaymentsForm action={savePayments.bind(null, slug)} methods={methods} routing={company.payments?.routing}
        kinds={offeredKinds(company).map((k) => ({ id: k.id, title: k.title }))} />
    </div>
  );
}
