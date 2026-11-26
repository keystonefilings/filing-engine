import Link from "next/link";
import { platformName, supportEmail } from "@/lib/brand";
import "@/app/landing.css";

const FONTS = "https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500&family=IBM+Plex+Sans:wght@400;500;600&family=Source+Serif+4:opsz,wght@8..60,500;8..60,600&display=swap";

export function Seal() {
  return (
    <svg className="seal" viewBox="0 0 32 32" aria-hidden="true">
      <circle cx="16" cy="16" r="14.5" fill="none" stroke="var(--brass)" strokeWidth="1.5" />
      <circle cx="16" cy="16" r="11" fill="none" stroke="var(--brass)" strokeWidth="0.75" strokeDasharray="1.5 1.5" />
      <path d="M11 9.5h7.5l3.5 3.5V22.5H11z" fill="var(--brand)" />
      <path d="M18.5 9.5V13H22" fill="none" stroke="var(--surface)" strokeWidth="1" />
      <path d="M13.5 16h6M13.5 18.5h6M13.5 21h3.5" stroke="var(--surface)" strokeWidth="1" />
    </svg>
  );
}

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
          <Link className="mark" href="/" aria-label={`${name} home`}><Seal /><span className="mark-name">{name}</span></Link>
          {nav ? (
            <nav className="nav" aria-label="Sections">
              <a href="#process">How it works</a>
              <a href="#start">Partners</a>
              <a href="#enterprise">Enterprise</a>
              <a href="#coverage">Coverage</a>
              <a href="#security">Security</a>
            </nav>
          ) : null}
          <div className="actions">
            <Link className="btn btn-quiet" href="/login">Log in</Link>
            <Link className="btn btn-primary" href="/signup">Create a partner account</Link>
          </div>
        </div>
      </header>
      {children}
      <footer className="band">
        <div className="wrap">
          <span>{name} · state filings for CPA, payroll, CFO and title firms, and filing companies</span>
          <span>New York · New Jersey · Florida · IRS</span>
        </div>
        <div className="wrap legal-line">
          <span>{name} is not a law firm or a government agency and doesn&apos;t give legal or tax advice.</span>
          <span><a href="/terms">Terms</a> · <a href="/privacy">Privacy</a> · <a href={`mailto:${supportEmail()}`}>{supportEmail()}</a></span>
        </div>
      </footer>
    </div>
  );
}
