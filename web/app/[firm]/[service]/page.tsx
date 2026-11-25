import { randomUUID } from "node:crypto";
import { notFound } from "next/navigation";
import { brandOf, brandStyle, offeredKinds } from "@/lib/firm";
import { platformName } from "@/lib/brand";
import { firmBySlug, kindForServiceSlug } from "@/lib/public-pages";
import { IntakeForm } from "@/components/IntakeForm";
import { submitPublicIntake } from "./actions";
import { BrandFont } from "@/components/BrandFont";
import { withFirmDefaults } from "@/lib/firm-defaults";

/** A partner firm's permanent page for one service (V19). */
export async function generateMetadata({ params }: { params: Promise<{ firm: string; service: string }> }) {
  const { firm, service } = await params;
  const company = await firmBySlug(firm);
  const kind = kindForServiceSlug(service);
  return { title: company && kind ? `${kind.title} · ${brandOf(company).name}` : "Not found" };
}

export default async function PublicServicePage({ params }: { params: Promise<{ firm: string; service: string }> }) {
  const { firm, service } = await params;
  const company = await firmBySlug(firm);
  const kind = kindForServiceSlug(service);
  if (!company || !kind || !offeredKinds(company).some((k) => k.id === kind.id)) notFound();
  const brand = brandOf(company);
  const { kind: form, prefill } = withFirmDefaults(kind, company);
  // A fresh id per page view: sending the form twice from one view makes one filing.
  const nonce = randomUUID();
  return (
    <div className="branded" style={brandStyle(brand)}>
      <BrandFont font={brand.font} />
      <header className="topbar"><div className="inner"><span className="brand">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        {brand.logoUrl ? <img src={brand.logoUrl} alt="" /> : null}<span>{brand.name}</span></span>
        <span className="spacer" /><span className="small muted">with {platformName()}</span></div></header>
      <main className="wrap narrow stack">
        <h1>{kind.title}</h1>
        <p className="muted">{kind.summary} After you send this, you&apos;ll get the state&apos;s own page to check, and nothing is filed until it&apos;s approved.</p>
        {kind.feeNote ? <p className="small">{kind.feeNote}</p> : null}
        <IntakeForm kind={form} prefill={prefill} nonce={nonce} action={submitPublicIntake.bind(null, firm, service, nonce)} submitLabel="Send" />
        {brand.supportEmail ? <p className="small muted">Questions? Email <a href={`mailto:${brand.supportEmail}`}>{brand.supportEmail}</a>.</p> : null}
      </main>
    </div>
  );
}
