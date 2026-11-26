import { randomUUID } from "node:crypto";
import { notFound } from "next/navigation";
import { brandOf, brandStyle, liveFilings, offeredKinds } from "@/lib/firm";
import { platformName } from "@/lib/brand";
import { firmBySlug, kindForServiceSlug, publicKind } from "@/lib/public-pages";
import { withFirmDefaults } from "@/lib/firm-defaults";
import { IntakeForm } from "./IntakeForm";
import { BrandFont } from "./BrandFont";
import { EmbedResizer } from "./EmbedResizer";
import { submitPublic } from "@/app/public-actions";

/** V19 / V39: a firm's public page for one service, full page or inside the website widget. */
export async function PublicIntake({ tenantId, firm, service, embed = false }: { tenantId: string; firm: string; service: string; embed?: boolean }) {
  const company = await firmBySlug(firm, tenantId);
  const kind = kindForServiceSlug(service);
  if (!company || !publicKind(kind) || !offeredKinds(company).some((k) => k.id === kind.id)) notFound();
  const brand = brandOf(company);
  const { kind: form, prefill } = withFirmDefaults(kind, company, { forClient: true });
  // A fresh id per page view: sending the form twice from one view makes one filing.
  const nonce = randomUUID();
  const body = (
    <>
      {!liveFilings(kind.id) ? <p className="notice warn">Practice mode: this page runs practice filings only. Nothing you send from it will be filed with the state or paid, now or later, even after you approve it. To file for real, contact {brand.name}.</p> : null}
      <h1>{kind.title}</h1>
      <p className="muted">{kind.summary} {kind.type === "ein_only"
        ? <>After you send this, we&apos;ll email a link to check and approve exactly what will be sent to the IRS. Nothing is filed until it&apos;s approved.</>
        : <>After you send this, we&apos;ll email you a link to check and approve exactly what will be filed, with a picture of the state&apos;s own review page where possible. Nothing is filed or paid until it&apos;s approved.</>}</p>
      {kind.feeNote ? <p className="small">{kind.feeNote}</p> : null}
      <IntakeForm kind={form} prefill={prefill} nonce={nonce} action={submitPublic.bind(null, tenantId, firm, service, nonce)} submitLabel="Send for approval" filerName={company.filerName} forClient={brand.name}
        footnote={<>
          <p className="small muted">By sending, you agree to {platformName()}&apos;s <a href="/terms" target="_blank" rel="noopener">Terms of Service</a>; your details are handled under its <a href="/privacy" target="_blank" rel="noopener">Privacy Policy</a>.</p>
          {brand.supportEmail ? <p className="small muted">Questions about this form? Email {brand.name} at <a href={`mailto:${brand.supportEmail}`}>{brand.supportEmail}</a>.</p> : null}
        </>} />
    </>
  );
  return (
    <div className="branded" style={brandStyle(brand)}>
      <BrandFont font={brand.font} />
      {embed ? (
        <main className="stack" style={{ padding: 16 }}><EmbedResizer />{body}<p className="small muted">Filed with {platformName()}</p></main>
      ) : (
        <>
          <header className="topbar"><div className="inner"><span className="brand">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            {brand.logoUrl ? <img src={brand.logoUrl} alt="" /> : null}<span>{brand.name}</span></span>
            <span className="spacer" /><span className="small muted">with {platformName()}</span></div></header>
          <main className="wrap narrow stack">{body}</main>
        </>
      )}
    </div>
  );
}

export async function publicTitle(tenantId: string, firm: string, service: string): Promise<string> {
  const company = await firmBySlug(firm, tenantId);
  const kind = kindForServiceSlug(service);
  return company && kind ? `${kind.title} · ${brandOf(company).name}` : "Not found";
}
