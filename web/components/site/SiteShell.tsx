import type { ReactNode } from "react";
import Link from "next/link";
import "@/styles/components/button.css";
import "@/styles/components/shell.css";
import "@/styles/components/site.css";
import { platformName, supportEmail } from "@/lib/brand";
import { betaOn } from "@/lib/beta";
import { Chip } from "@/components/ui/Chip";
import { Lockup } from "@/components/shell/Lockup";
import { SiteHeader } from "./SiteHeader";
import { ThemeSwitch } from "./ThemeSwitch";

/** The five public pages behind the home page, in the header's order (merged spec 9.0). */
export const SITE_NAV: { href: string; label: string }[] = [
  { href: "/how-it-works", label: "How it works" },
  { href: "/for-firms", label: "For firms" },
  { href: "/what-we-file", label: "What we file" },
  { href: "/pricing", label: "Pricing" },
  { href: "/platforms", label: "For platforms" },
];

/**
 * CoFile's own public pages (merged spec 6.7, 9.0, 9.10), in CoFile's look: the beta slip, the sticky header with
 * the lockup, the five links, "Log in" and "Run a free rehearsal" (outline while another Brass button is on screen,
 * Brass after), the phone menu sheet and sticky bar, and the footer set like the foot of a letterhead.
 *
 * A page marks its own Brass "Run a free rehearsal" buttons with data-brass-cta so the header's copy stays an
 * outline while one is in view, and the phone bar stays away (4.8): at most one Brass button per screen.
 */
export function SiteShell({ children }: { children: ReactNode }) {
  const name = platformName();
  const email = supportEmail();
  return (
    <div className="site2 reg-cofile">
      <a className="shell2-skip" href="#content">Skip to content</a>
      {betaOn() ? (
        <div className="site2-beta" role="note">
          <div className="site2-in">
            <Chip tone="rehearsal" compact>Beta</Chip>
            <span>{name} is in beta. Any filing can run as a free rehearsal on the state&apos;s real website. It stops before the last button, so nothing is filed or paid. Filing types go live one at a time. Questions or problems? <a href={`mailto:${email}`}>{email}</a></span>
          </div>
        </div>
      ) : null}
      <SiteHeader name={name} email={email} nav={SITE_NAV} lockup={<Lockup height={28} name={name} />} />
      <main id="content" className="site2-main" tabIndex={-1}>{children}</main>
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
