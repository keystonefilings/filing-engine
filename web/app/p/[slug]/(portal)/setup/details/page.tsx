import { notFound } from "next/navigation";
import { firmContext } from "@/lib/firm";
import { DetailsForm } from "@/components/SetupForms";
import { saveDetails } from "../actions";

export const metadata = { title: "Your firm" };

export default async function DetailsPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const { company } = await firmContext(slug);
  if (!company.partner) notFound();
  const p = company.partner;
  return (
    <div className="narrow stack">
      <p className="small muted">Step 1 of 3</p>
      <h1>Your firm</h1>
      <DetailsForm action={saveDetails.bind(null, slug)} v={{ name: company.name, companyType: p.companyType, contactName: p.contactName, contactEmail: p.contactEmail, phone: p.phone, website: p.website }} />
    </div>
  );
}
