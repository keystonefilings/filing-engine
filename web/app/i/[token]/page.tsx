import { intakeKey, readClientIntake } from "@/lib/session";
import { filingKind } from "@/lib/intake/forms";
import { brandOf, liveFilings, loadCompany, offeredKinds } from "@/lib/firm";
import { platformName } from "@/lib/brand";
import { ClientPage, NeutralPage } from "@/components/ClientPage";
import { Notice } from "@/components/ui/Sheet";
import { listSignatures } from "@/lib/signatures";
import { IntakeForm } from "@/components/IntakeForm";
import { submitClientIntake } from "./actions";
import { CLOSED_TEXT, linkRecord } from "@/lib/intake-links";
import { withFirmDefaults } from "@/lib/firm-defaults";

export const metadata = { title: "Your filing" };

export default async function ClientIntakePage({ params }: { params: Promise<{ token: string }> }) {
  const { token } = await params;
  const link = readClientIntake(token);
  if (!link) {
    return <NeutralPage><h1 className="client2-title">This link has expired or isn&apos;t valid</h1><p className="client2-summary">Ask whoever sent it for a new one.</p></NeutralPage>;
  }
  const key = intakeKey(link);
  const record = await linkRecord(key, link.clientCompanyId, link.nonce).catch(() => null);
  if (record && record.state !== "open") {
    return <NeutralPage><h1 className="client2-title">This link can&apos;t be used</h1><p className="client2-summary">{CLOSED_TEXT[record.state]}</p></NeutralPage>;
  }
  const company = await loadCompany(key, link.clientCompanyId);
  const brand = brandOf(company);
  const base = filingKind(link.kind);
  const { kind, prefill } = base ? withFirmDefaults(base, company, { forClient: true }) : { kind: base, prefill: {} };
  if (!kind || !offeredKinds(company).some((k) => k.id === kind.id)) {
    return <ClientPage brand={brand}><h1 className="client2-title">This filing is no longer offered</h1><p className="client2-summary">Contact {brand.name}{brand.supportEmail ? ` at ${brand.supportEmail}` : ""}.</p></ClientPage>;
  }
  const signed = kind.sections.some((s) => s.items.some((i) => i.kind === "field" && i.type === "signature"));
  // A client signs fresh: saved signatures belong to the firm's own list, not to whoever holds the link.
  const consentText = signed ? (await listSignatures(key, link.clientCompanyId)).consentText : undefined;
  return (
    <ClientPage brand={brand}>
      {!liveFilings(kind.id) ? <Notice tone="rehearsal">This page is in rehearsal for now. You can fill it in, but nothing will be filed with the state and nothing will be charged, now or later, even after you approve it. To file for real, contact {brand.name}.</Notice> : null}
      <h1 className="client2-title">{kind.title}{link.label ? <span className="client2-for">{"\u00A0· "}{link.label}</span> : null}</h1>
      <p className="client2-summary">{kind.summary} After you send this, {brand.name} checks every detail and approves it. Nothing is filed until they do.</p>
      {kind.feeNote ? <p className="client2-fee">{kind.feeNote}</p> : null}
      <div className="intake2">
        <IntakeForm kind={kind} nonce={link.nonce} action={submitClientIntake.bind(null, token)} submitLabel={`Send to ${brand.name}`} consentText={consentText} prefill={prefill} filerName={company.filerName} forClient={brand.name} feeNoteAbove
          footnote={<><p className="client2-note">Next, {brand.name} checks it and approves the filing. Nothing is filed until they do.</p><p className="client2-foot">By sending, you agree to {platformName()}&apos;s <a href="/terms" target="_blank" rel="noopener">Terms of Service</a>; your details are handled under its <a href="/privacy" target="_blank" rel="noopener">Privacy Policy</a>.</p></>} />
      </div>
      {brand.supportEmail ? <p className="client2-foot">Questions? Email <a href={`mailto:${brand.supportEmail}`}>{brand.supportEmail}</a>.</p> : null}
    </ClientPage>
  );
}
