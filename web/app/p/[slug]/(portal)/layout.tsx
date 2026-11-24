import { firmContext } from "@/lib/firm";
import { TopBar } from "@/components/TopBar";

export default async function PortalLayout({ children, params }: { children: React.ReactNode; params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const { session, brand } = await firmContext(slug);
  const base = `/p/${encodeURIComponent(slug)}`;
  return (
    <div style={{ ["--accent" as string]: brand.color }}>
      <TopBar
        brand={brand.name} href={base} logoUrl={brand.logoUrl}
        links={[
          { href: base, label: "Filings" },
          { href: `${base}/new`, label: "New filing" },
          { href: `${base}/client-links`, label: "Client links" },
          { href: `${base}/signatures`, label: "Signatures" },
        ]}
        right={<form action="/logout" method="post" className="row"><span className="small muted">{session.email}</span><button className="btn small" type="submit">Sign out</button></form>}
      />
      <main className="wrap">{children}</main>
      {brand.supportEmail ? <footer className="wrap small muted" style={{ paddingTop: 0 }}>Questions? Email <a href={`mailto:${brand.supportEmail}`}>{brand.supportEmail}</a>.</footer> : null}
    </div>
  );
}
