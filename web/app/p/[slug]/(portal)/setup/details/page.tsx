import "@/styles/components/desk.css";
import "@/styles/components/desk-setup.css";
import { notFound } from "next/navigation";
import { firmContext } from "@/lib/firm";
import { DetailsForm } from "@/components/SetupForms";
import { FILING_KINDS } from "@/lib/intake/forms";
import { offeredKinds } from "@/lib/firm";
import { saveDetails } from "../actions";

export const metadata = { title: "Your firm" };

/** Your firm, Step 1 of 3 (merged spec 10B.6): a narrow page, the form one white sheet. */
export default async function DetailsPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const { company } = await firmContext(slug);
  if (!company.partner) notFound();
  const p = company.partner;
  const offered = new Set(offeredKinds(company).map((k) => k.id));
  return (
    <div className="narrow ds2 ds2-firm">
      <p className="ds2-kicker">Step 1 of 3</p>
      <h1>Your firm</h1>
      <DetailsForm action={saveDetails.bind(null, slug)} v={{ name: company.name, companyType: p.companyType, contactName: p.contactName, contactEmail: p.contactEmail, phone: p.phone, website: p.website, copyEmail: company.copyEmail as string | undefined,
        services: FILING_KINDS.map((k) => ({ id: k.id, title: k.title, state: k.type === "ein_only" ? "US" : k.state, offered: offered.has(k.id) })) }} />
    </div>
  );
}
