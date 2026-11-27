import { brandStyle, firmContext } from "@/lib/firm";
import { personalSession } from "@/lib/session";
import { waitingForCardCodes } from "@/lib/cards";
import { AppShell, type ShellLink } from "@/components/shell/AppShell";
import { BrandFont } from "@/components/BrandFont";

/**
 * The filing desk (merged spec 10B.3). A partner firm works in CoFile's look, the same for every firm, with its logo
 * and name in the account label (decision 2); its own color and font appear only in previews of its clients' pages.
 * A firm a platform invited keeps that platform's white label, as before.
 */
export default async function PortalLayout({ children, params }: { children: React.ReactNode; params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const { session, company, brand } = await firmContext(slug);
  const base = `/p/${encodeURIComponent(slug)}`;
  const partner = Boolean(company.partner);
  const waiting = (await waitingForCardCodes().catch(() => [])).reduce((n, c) => n + c.filings.length, 0);
  const links: ShellLink[] = [
    { href: base, label: "Filings", exact: true, also: [`${base}/filings`] },
    { href: `${base}/new`, label: "New filing", also: [`${base}/from-email`] },
    { href: `${base}/pay`, label: "Ready to pay", count: waiting },
    { href: `${base}/client-links`, label: "Client links" },
    { href: `${base}/signatures`, label: "Signatures" },
    ...(partner ? [{ href: `${base}/setup`, label: "Setup" }, { href: `${base}/billing`, label: "Billing" }] : []),
  ];
  const user = { email: session.email, passwordHref: personalSession(session) ? `${base}/password` : undefined };
  const footer = brand.supportEmail ? <>Questions? Email <a href={`mailto:${brand.supportEmail}`}>{brand.supportEmail}</a>.</> : null;
  return (
    <>
      {/* The firm's font is loaded for the previews of its clients' pages, never for the desk itself. */}
      <BrandFont font={brand.font} />
      <AppShell
        home={base}
        account={partner ? { name: brand.name, logoUrl: brand.logoUrl, logo: brand.logo } : undefined}
        white={partner ? undefined : { name: brand.name, logoUrl: brand.logoUrl, logo: brand.logo, style: brandStyle(brand) }}
        user={user} links={links} footer={footer}
      >
        {children}
      </AppShell>
    </>
  );
}
