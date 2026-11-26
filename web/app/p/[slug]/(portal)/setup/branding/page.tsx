import { notFound } from "next/navigation";
import { firmContext, offeredKinds } from "@/lib/firm";
import { logoSrc } from "@/lib/brand";
import { BrandingStudio } from "@/components/desk/BrandingStudio";
import { publicUrl } from "@/lib/session";
import { saveBranding } from "../actions";
import "@/styles/components/branding.css";

export const metadata = { title: "Branding" };

/** Step 2 of 3 (merged spec 10B.7): the firm chooses its brand and sees, live, every page its clients will see. */
export default async function BrandingPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const { company } = await firmContext(slug);
  if (!company.partner) notFound();
  const p = company.portal;
  return (
    <div className="brand2-page">
      <p className="brand2-step">Step 2 of 3</p>
      <h1>Branding</h1>
      <p className="muted brand2-lede">Your clients see your name, logo and colors on the pages where they fill in and approve filings.</p>
      <BrandingStudio action={saveBranding.bind(null, slug)} v={{
        slug: p?.slug ?? slug, siteUrl: publicUrl(), font: p?.font, hasCustomFont: !!p?.fontArtifactId, displayName: p?.displayName ?? company.name,
        logoSrc: logoSrc(p), logoUrl: p?.logoArtifactId ? undefined : p?.logoUrl, primaryColor: p?.primaryColor, secondaryColor: p?.secondaryColor,
        supportEmail: p?.supportEmail, firstKind: offeredKinds(company)[0]?.title ?? "New York LLC formation",
      }} />
    </div>
  );
}
