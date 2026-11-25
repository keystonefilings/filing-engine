import { intakeKey, readClientIntake } from "@/lib/session";
import { filingKind } from "@/lib/intake/forms";
import { brandOf, brandStyle, loadCompany, offeredKinds } from "@/lib/firm";
import { platformName } from "@/lib/brand";
import { listSignatures } from "@/lib/signatures";
import { IntakeForm } from "@/components/IntakeForm";
import { submitClientIntake } from "./actions";
import { CLOSED_TEXT, linkRecord } from "@/lib/intake-links";
import { BrandFont } from "@/components/BrandFont";
import { withFirmDefaults } from "@/lib/firm-defaults";

export const metadata = { title: "Your filing" };

export default async function ClientIntakePage({ params }: { params: Promise<{ token: string }> }) {
  const { token } = await params;
  const link = readClientIntake(token);
  if (!link) {
    return <main className="wrap narrow"><h1>This link has expired or isn&apos;t valid</h1><p>Ask whoever sent it for a new one.</p></main>;
  }
  const key = intakeKey(link);
  const record = await linkRecord(key, link.clientCompanyId, link.nonce).catch(() => null);
  if (record && record.state !== "open") {
    return <main className="wrap narrow"><h1>This link can&apos;t be used</h1><p>{CLOSED_TEXT[record.state]}</p></main>;
  }
  const company = await loadCompany(key, link.clientCompanyId);
  const brand = brandOf(company);
  const base = filingKind(link.kind);
  const { kind, prefill } = base ? withFirmDefaults(base, company, { forClient: true }) : { kind: base, prefill: {} };
  if (!kind || !offeredKinds(company).some((k) => k.id === kind.id)) {
    return <main className="wrap narrow"><h1>This filing is no longer offered</h1><p>Contact {brand.name}{brand.supportEmail ? ` at ${brand.supportEmail}` : ""}.</p></main>;
  }
  const signed = kind.sections.some((s) => s.items.some((i) => i.kind === "field" && i.type === "signature"));
  // A client signs fresh: saved signatures belong to the firm's own list, not to whoever holds the link.
  const consentText = signed ? (await listSignatures(key, link.clientCompanyId)).consentText : undefined;
  return (
    <div className="branded" style={brandStyle(brand)}>
      <BrandFont font={brand.font} />
      <header className="topbar"><div className="inner"><span className="brand">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        {brand.logoUrl ? <img src={brand.logoUrl} alt="" /> : null}<span>{brand.name}</span></span>
        {company.partner ? <><span className="spacer" /><span className="small muted">with {platformName()}</span></> : null}</div></header>
      <main className="wrap narrow stack">
        <h1>{kind.title}{link.label ? <span className="muted" style={{ fontWeight: 400 }}> · {link.label}</span> : null}</h1>
        <p className="muted">{kind.summary} After you send this, you&apos;ll get a link to check exactly what will be filed, and nothing is filed until it&apos;s approved.</p>
        <IntakeForm kind={kind} nonce={link.nonce} action={submitClientIntake.bind(null, token)} submitLabel="Send" consentText={consentText} prefill={prefill} />
        {brand.supportEmail ? <p className="small muted">Questions? Email <a href={`mailto:${brand.supportEmail}`}>{brand.supportEmail}</a>.</p> : null}
      </main>
    </div>
  );
}
