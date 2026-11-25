import { notFound } from "next/navigation";
import { firmContext, offeredKinds } from "@/lib/firm";
import { PaymentsForm } from "@/components/SetupForms";
import { savePayments } from "../actions";

export const metadata = { title: "Payment" };

export default async function PaymentsPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const { company } = await firmContext(slug);
  if (!company.partner) notFound();
  return (
    <div className="narrow stack">
      <p className="small muted">Step 3 of 3</p>
      <h1>Payment</h1>
      <p className="muted">State fees are charged by the state when a filing is submitted, after your client approves the exact amount.</p>
      <PaymentsForm action={savePayments.bind(null, slug)} methods={company.payments?.methods ?? []} routing={company.payments?.routing}
        kinds={offeredKinds(company).map((k) => ({ id: k.id, title: k.title }))} />
    </div>
  );
}
