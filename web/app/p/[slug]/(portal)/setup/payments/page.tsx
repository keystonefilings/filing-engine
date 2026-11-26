import { notFound } from "next/navigation";
import { firmContext, offeredKinds } from "@/lib/firm";
import { PaymentsForm } from "@/components/SetupForms";
import { savePayments } from "../actions";
import { AddCard } from "@/components/AddCard";
import { SavedCards } from "@/components/SavedCards";
import { saveCard } from "@/lib/cards";
import { platformName } from "@/lib/brand";

export const metadata = { title: "Payment" };

export default async function PaymentsPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const { company } = await firmContext(slug);
  if (!company.partner) notFound();
  return (
    <div className="narrow stack">
      <p className="small muted">Step 3 of 3</p>
      <h1>Payment</h1>
      <p className="muted">State fees are charged by the state when a filing is submitted, after your client approves the exact amount. Saved cards are held by Basis Theory, a card vault, never by {platformName()}. A card&apos;s security code isn&apos;t saved, so when approved filings are ready to pay, we ask the card&apos;s owner to enter it on the <a href={`/p/${encodeURIComponent(slug)}/pay`}>Ready to pay</a> page and keep it for an hour at most. Filings wait until it&apos;s entered.</p>
      <SavedCards methods={company.payments?.methods ?? []} />
      {process.env.BASIS_THEORY_PUBLIC_KEY ? <AddCard publicKey={process.env.BASIS_THEORY_PUBLIC_KEY} save={saveCard} /> : <p className="notice">Saving cards isn&apos;t turned on for your account yet. Ask us to turn it on.</p>}
      <PaymentsForm action={savePayments.bind(null, slug)} methods={company.payments?.methods ?? []} routing={company.payments?.routing}
        kinds={offeredKinds(company).map((k) => ({ id: k.id, title: k.title }))} />
    </div>
  );
}
