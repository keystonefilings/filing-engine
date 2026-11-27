import type { ReactNode } from "react";
import Link from "next/link";
import "@/styles/components/shell.css";
import "@/styles/components/app.css";
import "@/styles/components/button.css";
import type { CSSProperties } from "react";
import { Lockup } from "./Lockup";
import { ShellNav, type ShellLink } from "./ShellNav";
import { BETA_CLIENT_TEXT, betaOn } from "@/lib/beta";
import { Chip } from "@/components/ui/Chip";
import { BrandRowMark, LogoImage } from "@/components/ui/LogoImage";
import type { LogoInfo } from "@/lib/design/logo";

export type { ShellLink };

/**
 * Whose desk this is, in CoFile's look: the firm's logo small and its name, as content, never a letterhead (3.5, 10B.3.1).
 * A logo of light marks sits on a small Plate Ink plate, and on the dark desk straight on Night Card (10B.2.3); `logo` is
 * the engine's reading of it, else it is read in the browser.
 */
export function AccountLabel({ name, logoUrl, logo }: { name: string; logoUrl?: string; logo?: LogoInfo }) {
  return (
    <span className="acct2" title={name}>
      {logoUrl ? <LogoImage src={logoUrl} alt="" info={logo} place="label" wrap="acct2-logo" /> : null}
      <span className="acct2-name">{name}</span>
    </span>
  );
}

export interface ShellUser { email: string; passwordHref?: string; logoutAction?: string }

/**
 * The shell CoFile's desk and dashboard share (merged spec 10B.3, 10C.2): the letterhead row with the lockup, an
 * optional account label and the signed-in person; CoFile's 1 px Plate Ink rule; the sticky navigation row with the
 * current page underlined in Brass Line; the beta strip; the content; a footer. On phones, one sticky 64 px row and a
 * menu sheet. `white` draws a platform's white-label desk instead: its letterhead and Firm Rule, nothing of CoFile.
 */
export function AppShell({ home, account, white, platform, user, links, footer, children }: {
  home: string;
  account?: { name: string; logoUrl?: string; logo?: LogoInfo };
  /** A deployment's own platform name (PLATFORM_NAME): set in type in place of CoFile's lockup, never inside our mark (10C.1). */
  platform?: string;
  /** A platform's white label: its name, logo and ink-matched colors (firmVars) in place of CoFile's. */
  white?: { name: string; logoUrl?: string; logo?: LogoInfo; style: CSSProperties };
  user: ShellUser;
  links: ShellLink[];
  footer?: ReactNode;
  children: ReactNode;
}) {
  const mark = white
    ? <span className="shell2-brand">
        {/* The brand's logo by area at the row's size, its name beside a square or mid logo, light marks on their plate (10B.3.3, 10B.2.3) */}
        <BrandRowMark name={white.name} logoUrl={white.logoUrl} logo={white.logo} />
      </span>
    : platform && platform !== "CoFile" ? <span className="shell2-platform">{platform}</span> : <Lockup height={28} />;
  const head = (
    <>
      <Link className="shell2-home" href={home}>{mark}</Link>
      {account && !white ? <><span className="shell2-divider" aria-hidden="true" /><AccountLabel {...account} /></> : null}
    </>
  );
  return (
    <div className={["shell2", white ? "reg-white is-white" : "reg-cofile"].join(" ")} style={white?.style}>
      <a className="shell2-skip" href="#content">Skip to content</a>
      <ShellNav head={head} user={user} links={links} />
      {betaOn() ? <div className="shell2-beta" role="note"><div className="shell2-in"><Chip tone="rehearsal" compact>Beta</Chip><span>{BETA_CLIENT_TEXT}</span></div></div> : null}
      <main className="shell2-main" id="content" tabIndex={-1}><div className="shell2-in shell2-content">{children}</div></main>
      {footer ? <footer className="shell2-foot">{footer}</footer> : null}
    </div>
  );
}
