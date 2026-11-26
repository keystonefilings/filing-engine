import Link from "next/link";
import { platformName, supportEmail } from "@/lib/brand";
import "@/app/landing.css";

const FONTS = "https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500&family=IBM+Plex+Sans:wght@400;500;600&family=Source+Serif+4:opsz,wght@8..60,500;8..60,600&display=swap";

/** The mark (Nov 26): a manila folder tab with a check cut into its edge. The tab says file, the check says approved. */
export function FolderTab({ size = 30 }: { size?: number }) {
  return (
    <svg className="seal" width={size} height={Math.round(size * 28 / 34)} viewBox="0 0 34 28" aria-hidden="true">
      <path d="M2 8h11l3-5h15a1 1 0 0 1 1 1v21a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1z" fill="var(--manila)" stroke="var(--ink)" strokeWidth="1.6" />
      <path d="M19 5.5l2.2 2.2 4.4-4.4" fill="none" stroke="var(--ok)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
/** Kept for pages that still import it. */
export const Seal = FolderTab;

/** The public pages' frame: header with Log in and partner sign-up, and the footer. */
export function Shell({ children, nav = false }: { children: React.ReactNode; nav?: boolean }) {
  const name = platformName();
  return (
    <div className="lp">
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
      <link rel="stylesheet" href={FONTS} precedence="default" />
      <header className="top band">
        <div className="wrap">
          <Link className="mark" href="/" aria-label={`${name} home`}><FolderTab /><span className="mark-name">{name}</span></Link>
          {nav ? (
            <nav className="nav" aria-label="Sections">
              <a href="/#process">How it works</a>
              <a href="/#firms">For firms</a>
              <a href="/#coverage">What we file</a>
              <a href="/#enterprise">For platforms</a>
            </nav>
          ) : null}
          <div className="actions">
            <Link className="btn btn-quiet" href="/login">Log in</Link>
            <Link className="btn btn-primary" href="/signup">Run a free rehearsal</Link>
          </div>
        </div>
      </header>
      {children}
      <footer className="band">
        <div className="wrap">
          <span>{name} · the filing desk behind your firm</span>
          <span>New York · New Jersey · Florida · IRS</span>
        </div>
        <div className="wrap legal-line">
          <span>{name} is not a law firm or a government agency, isn&apos;t affiliated with any state or the IRS, and doesn&apos;t give legal or tax advice.</span>
          <span><a href="/terms">Terms</a> · <a href="/privacy">Privacy</a> · <a href="/#security">Security</a> · <a href={`mailto:${supportEmail()}`}>{supportEmail()}</a></span>
        </div>
      </footer>
    </div>
  );
}
