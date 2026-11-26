import { randomUUID } from "node:crypto";
import { notFound } from "next/navigation";
import { brandOf, liveFilings, offeredKinds } from "@/lib/firm";
import { platformName } from "@/lib/brand";
import { firmBySlug, kindForServiceSlug, publicKind } from "@/lib/public-pages";
import { withFirmDefaults } from "@/lib/firm-defaults";
import { IntakeForm } from "./IntakeForm";
import { ClientPage } from "./ClientPage";
import { Notice } from "./ui/Sheet";
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
      {!liveFilings(kind.id) ? <Notice tone="rehearsal">This page is in rehearsal for now. You can fill it in, but nothing will be filed with the state and nothing will be charged, now or later, even after you approve it. To file for real, contact {brand.name}.</Notice> : null}
      <h1 className="client2-title">{kind.title}</h1>
      <p className="client2-summary">{kind.summary} {kind.type === "ein_only"
        ? <>After you send this, {brand.name} checks every detail and approves exactly what will be sent to the IRS. Nothing is filed until they do.</>
        : <>After you send this, {brand.name} checks every detail and fee and approves exactly what will be filed. Nothing is filed or paid until they do.</>}</p>
      {kind.feeNote ? <p className="client2-fee">{kind.feeNote}</p> : null}
      <div className="intake2"><IntakeForm kind={form} prefill={prefill} nonce={nonce} action={submitPublic.bind(null, tenantId, firm, service, nonce)} submitLabel={`Send to ${brand.name}`} filerName={company.filerName} forClient={brand.name} feeNoteAbove
        footnote={<>
          <p className="client2-note">Next, {brand.name} checks it and approves the filing. Nothing is filed until they do.</p>
          <p className="client2-foot">By sending, you agree to {platformName()}&apos;s <a href="/terms" target="_blank" rel="noopener">Terms of Service</a>; your details are handled under its <a href="/privacy" target="_blank" rel="noopener">Privacy Policy</a>.</p>
          {brand.supportEmail ? <p className="client2-foot">Questions about this form? Email {brand.name} at <a href={`mailto:${brand.supportEmail}`}>{brand.supportEmail}</a>.</p> : null}
        </>} /></div>
    </>
  );
  // Nothing of CoFile on a page a firm's client sees: no "with CoFile", no "Filed with CoFile" (decision 12).
  return embed
    ? <ClientPage brand={brand} embed><EmbedResizer />{body}</ClientPage>
    : <ClientPage brand={brand}>{body}</ClientPage>;
}

export async function publicTitle(tenantId: string, firm: string, service: string): Promise<string> {
  const company = await firmBySlug(firm, tenantId);
  const kind = kindForServiceSlug(service);
  return company && kind ? `${kind.title} · ${brandOf(company).name}` : "Not found";
}
