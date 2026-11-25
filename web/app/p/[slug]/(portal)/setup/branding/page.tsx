import { notFound } from "next/navigation";
import { firmContext } from "@/lib/firm";
import { logoSrc, platformName } from "@/lib/brand";
import { BrandingForm } from "@/components/SetupForms";
import { publicUrl } from "@/lib/session";
import { saveBranding } from "../actions";

export const metadata = { title: "Branding" };

export default async function BrandingPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const { company } = await firmContext(slug);
  if (!company.partner) notFound();
  const p = company.portal;
  return (
    <div className="narrow stack">
      <p className="small muted">Step 2 of 3</p>
      <h1>Branding</h1>
      <p className="muted">Your clients see your name, logo and colors on the pages where they fill in and approve filings.</p>
      <BrandingForm action={saveBranding.bind(null, slug)} platform={platformName()} v={{ slug: p?.slug ?? slug, siteUrl: publicUrl(), font: p?.font, hasCustomFont: !!p?.fontArtifactId, displayName: p?.displayName ?? company.name, logoSrc: logoSrc(p), logoUrl: p?.logoArtifactId ? undefined : p?.logoUrl, primaryColor: p?.primaryColor, secondaryColor: p?.secondaryColor, supportEmail: p?.supportEmail }} />
    </div>
  );
}
