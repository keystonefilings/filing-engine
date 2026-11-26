import Link from "next/link";
import { notFound } from "next/navigation";
import { firmContext } from "@/lib/firm";
import { supportEmail } from "@/lib/brand";
import { checkDomain, connectDomain, disconnectDomain, loadEmailDomain } from "@/lib/email-domain";
import { EmailDomainForm } from "@/components/desk/EmailDomainForm";
import "@/styles/components/desk.css";

export const metadata = { title: "Email domain" };

/**
 * Your email domain (merged spec 10B.5.1; decision 37), optional, partner firms only. Emails to the firm's clients
 * go out under its name; until it connects its own domain they come from a CoFile sending address. Every word on
 * this page is a stand-in until the copy owner writes it ([copy needed], COPY-NEEDED.md).
 */
export default async function EmailDomainPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const { company, brand } = await firmContext(slug);
  if (!company.partner) notFound();
  const view = await loadEmailDomain(slug);
  const platformAddress = `filings@${supportEmail().split("@")[1] ?? "cofile.app"}`;
  return (
    <div className="narrow desk2-one edom2-page">
      <p className="filing2-back"><Link href={`/p/${encodeURIComponent(slug)}/setup`}>← Setup</Link></p>
      <h1>Your email domain</h1>
      <p className="muted">Emails to your clients go out under your firm&apos;s name. Until you connect your own domain, they come from a CoFile address; once it&apos;s connected, they come from yours.</p>
      <EmailDomainForm initial={view} firmName={brand.name} platformAddress={platformAddress}
        connect={connectDomain.bind(null, slug)} check={checkDomain.bind(null, slug)} disconnect={disconnectDomain.bind(null, slug)} />
    </div>
  );
}
