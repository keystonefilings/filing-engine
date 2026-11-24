import { firmContext, offeredKinds } from "@/lib/firm";
import { ClientLinkForm } from "@/components/ClientLinkForm";
import { makeClientLink } from "./actions";

export const metadata = { title: "Client links" };

export default async function ClientLinksPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const { company, brand } = await firmContext(slug);
  return (
    <div className="narrow stack">
      <h1>Send a client a link</h1>
      <p className="muted">Your client fills in the filing on a page with {brand.name}&apos;s name and logo. It then appears here under Filings, and the approver gets the usual approval link before anything is filed.</p>
      <ClientLinkForm action={makeClientLink.bind(null, slug)} kinds={offeredKinds(company).map((k) => ({ id: k.id, title: k.title }))} />
    </div>
  );
}
