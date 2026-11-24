import Link from "next/link";

export interface NavLink { href: string; label: string; current?: boolean }

export function TopBar({ brand, href, logoUrl, links, right }: { brand: string; href: string; logoUrl?: string; links: NavLink[]; right?: React.ReactNode }) {
  return (
    <header className="topbar">
      <div className="inner">
        <Link className="brand" href={href}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          {logoUrl ? <img src={logoUrl} alt="" /> : null}
          <span>{brand}</span>
        </Link>
        <nav aria-label="Main">
          {links.map((l) => <Link key={l.href} href={l.href} aria-current={l.current ? "page" : undefined}>{l.label}</Link>)}
        </nav>
        <span className="spacer" />
        {right}
      </div>
    </header>
  );
}
