import { brandStyle, firmContext } from "@/lib/firm";
import { platformName } from "@/lib/brand";
import Link from "next/link";
import { TopBar } from "@/components/TopBar";
import { BrandFont } from "@/components/BrandFont";

export default async function PortalLayout({ children, params }: { children: React.ReactNode; params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const { session, company, brand } = await firmContext(slug);
  const base = `/p/${encodeURIComponent(slug)}`;
  // Partner firms (signed up themselves) get our dashboard, co-branded with their own name and logo.
  // Firms an enterprise invited keep that enterprise's white-label look.
  const partner = Boolean(company.partner);
  const cobrand = partner ? (
    <span className="cobrand">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      {brand.logoUrl ? <img src={brand.logoUrl} alt="" /> : null}<span>{brand.name}</span>
    </span>
  ) : null;
  return (
    <div className="branded" style={brandStyle(brand)}>
      <BrandFont font={brand.font} />
      <TopBar
        brand={partner ? platformName() : brand.name} href={base} logoUrl={partner ? undefined : brand.logoUrl}
        links={[
          { href: base, label: "Filings" },
          { href: `${base}/new`, label: "New filing" },
          { href: `${base}/client-links`, label: "Client links" },
          { href: `${base}/signatures`, label: "Signatures" },
          ...(partner ? [{ href: `${base}/setup`, label: "Setup" }, { href: `${base}/billing`, label: "Billing" }] : []),
        ]}
        right={<form action="/logout" method="post" className="row">{cobrand}{session.signedInWith === "password" ? <Link className="small muted" href={`${base}/password`} title="Change password">{session.email}</Link> : <span className="small muted">{session.email}</span>}<button className="btn small" type="submit">Sign out</button></form>}
      />
      <main className="wrap">{children}</main>
      {brand.supportEmail ? <footer className="wrap small muted" style={{ paddingTop: 0 }}>Questions? Email <a href={`mailto:${brand.supportEmail}`}>{brand.supportEmail}</a>.</footer> : null}
    </div>
  );
}
