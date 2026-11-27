import type { ReactNode } from "react";
import Link from "next/link";
import "@/styles/components/button.css";
import "@/styles/components/shell.css";
import "@/styles/components/site.css";
import "@/styles/components/account.css";
import { platformName, supportEmail } from "@/lib/brand";
import { Lockup } from "@/components/shell/Lockup";
import { PublicBetaNotice } from "@/components/site/PublicBetaNotice";
import { ThemeSwitch } from "@/components/site/ThemeSwitch";

/**
 * The account pages' frame (merged spec 10A.0.1, 10A.8): SiteShell's beta slip and footer around a header that holds
 * only the lockup and the page's one quiet link, never a Brass button and never the five links or the phone bar,
 * because the page's own button is its one job. A local variant of components/site/SiteShell.tsx (same classes, same
 * footer), kept apart so the shared shell needn't change; if SiteShell grows an account header, this can fold into it.
 */
export function AccountShell({ link, children }: { link: { href: string; label: string; underlined?: boolean }; children: ReactNode }) {
  const name = platformName();
  const email = supportEmail();
  return (
    <div className="site2 reg-cofile">
      <a className="shell2-skip" href="#content">Skip to content</a>
      <PublicBetaNotice />
      <header className="acct2-head">
        <div className="site2-in acct2-head-row">
          <Link className="site2-home" href="/" aria-label={`${name} home`}><Lockup height={28} name={name} /></Link>
          <Link className={["acct2-head-link", !link.underlined && "is-quiet"].filter(Boolean).join(" ")} href={link.href}>{link.label}</Link>
        </div>
      </header>
      <main id="content" className="site2-main acct2-main" tabIndex={-1}>{children}</main>
      <footer className="site2-foot">
        <div className="site2-in">
          <div className="site2-rule" aria-hidden="true" />
          <div className="site2-foot-grid">
            <p className="site2-foot-name"><span className="site2-foot-lockup"><Lockup height={24} name={name} /></span><span> · the filing desk behind your firm</span></p>
            <div className="site2-foot-where">
              <p className="site2-foot-states">New York<span aria-hidden="true"> · </span>New Jersey<span aria-hidden="true"> · </span>Florida<span aria-hidden="true"> · </span>IRS</p>
              <p>Building a filing product? <Link href="/platforms">{name} for platforms</Link></p>
            </div>
            <p className="site2-foot-legal">{name} is not a law firm or a government agency, isn&apos;t affiliated with any state or the IRS, and doesn&apos;t give legal or tax advice.</p>
            <div className="site2-foot-links">
              <p>
                <Link href="/terms">Terms</Link><span aria-hidden="true"> · </span><Link href="/privacy">Privacy</Link><span aria-hidden="true"> · </span>
                <Link href="/security">Security</Link><span aria-hidden="true"> · </span><Link href="/faq">FAQ</Link><span aria-hidden="true"> · </span>
                <a href={`mailto:${email}`}>{email}</a>
              </p>
              <ThemeSwitch />
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

/**
 * The single card (10A.8): the page's label as the kicker, the heading (the page's h1), the lede, then the rest. A
 * vignette sits above it on Cotton, its left edge on the card's text edge.
 */
export function AccountCard({ kicker, title, lede, children, className, vignette }: {
  kicker?: string; title: string; lede?: ReactNode; children?: ReactNode; className?: string; vignette?: ReactNode;
}) {
  return (
    <div className="site2-in acct2-single">
      {vignette ? <div className="acct2-vig">{vignette}</div> : null}
      <div className={["acct2-card", className].filter(Boolean).join(" ")}>
        {kicker ? <p className="t-kicker acct2-kicker">{kicker}</p> : null}
        <h1 className="t-display-m acct2-h1">{title}</h1>
        {lede ? <p className="t-lede acct2-lede">{lede}</p> : null}
        {children}
      </div>
    </div>
  );
}
