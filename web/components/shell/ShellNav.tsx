"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useLayoutEffect, useRef, useState, type ReactNode } from "react";
import type { ShellUser } from "./AppShell";

export interface ShellLink {
  href: string;
  label: string;
  /** Other paths that count as this page (Filings for /filings/…, New filing for /from-email/…). */
  also?: string[];
  /** Only the exact path counts (a section's home, such as Filings at /p/<firm>). */
  exact?: boolean;
  /** A number waiting on the person ("Ready to pay"); hidden at zero. */
  count?: number;
  /** Sits at the right end of the row after a divider, because it leaves the app ("Docs"). */
  end?: boolean;
}

function isCurrent(l: ShellLink, path: string): boolean {
  const under = (p: string) => path === p || path.startsWith(`${p}/`);
  return (l.exact ? path === l.href : under(l.href)) || (l.also ?? []).some(under);
}

function Count({ n }: { n?: number }) {
  return n ? <span className="shell2-count">{n}</span> : null;
}

function LogOut({ block }: { block?: boolean }) {
  return (
    <form action="/logout" method="post">
      <button className={["btn2 is-outline is-small", block && "is-block"].filter(Boolean).join(" ")} type="submit">Log out</button>
    </form>
  );
}

/**
 * The shell's rows (merged spec 10B.3, 10C.2): the letterhead row, the sticky navigation row with the current page
 * underlined in Brass Line, and on phones a single sticky row with a menu sheet. The phone layout takes over when the
 * links don't fit, measured rather than set by a breakpoint, so a long set of labels never wraps or scrolls.
 */
export function ShellNav({ head, user, links }: { head: ReactNode; user: ShellUser; links: ShellLink[] }) {
  const path = usePathname() ?? "";
  // The most specific match wins, so /p/firm/setup/branding is Setup, not Filings.
  const current = links.filter((l) => isCurrent(l, path)).sort((a, b) => b.href.length - a.href.length)[0];
  const [compact, setCompact] = useState(false);
  const [open, setOpen] = useState(false);
  const rowRef = useRef<HTMLDivElement>(null);
  const measureRef = useRef<HTMLDivElement>(null);
  const sheetRef = useRef<HTMLDialogElement>(null);

  // Measure the links at their natural width against the row's room.
  useLayoutEffect(() => {
    const row = rowRef.current, ghost = measureRef.current;
    if (!row || !ghost) return;
    const check = () => setCompact(ghost.scrollWidth > row.clientWidth + 1);
    check();
    const ro = new ResizeObserver(check);
    ro.observe(row);
    document.fonts?.ready.then(check).catch(() => undefined);
    return () => ro.disconnect();
  }, []);

  const close = () => {
    const d = sheetRef.current;
    if (!d?.open) return setOpen(false);
    d.classList.add("is-closing");
    const done = () => { d.classList.remove("is-closing"); d.close(); setOpen(false); };
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) done(); else window.setTimeout(done, 160);
  };
  const show = () => { sheetRef.current?.showModal(); setOpen(true); };

  // A page change closes the sheet.
  useEffect(() => { const d = sheetRef.current; if (d?.open) { d.close(); setOpen(false); } }, [path]);
  // The sheet goes away if the window grows past the phone layout.
  useEffect(() => { if (!compact && sheetRef.current?.open) { sheetRef.current.close(); setOpen(false); } }, [compact]);

  const email = user.passwordHref
    ? <Link className="shell2-email" href={user.passwordHref} title="Change password">{user.email}</Link>
    : <span className="shell2-email is-plain">{user.email}</span>;

  const main = links.filter((l) => !l.end), end = links.filter((l) => l.end);
  const navLink = (l: ShellLink) => (
    <Link key={l.href} href={l.href} className="shell2-link" aria-current={l === current ? "page" : undefined}>
      <span className="shell2-label">{l.label}</span><Count n={l.count} />
    </Link>
  );

  return (
    <div className={["shell2-top", compact && "is-compact"].filter(Boolean).join(" ")}>
      <header className="shell2-head">
        <div className="shell2-in">
          {head}
          <span className="shell2-spacer" />
          <span className="shell2-user">{email}<LogOut /></span>
          <button type="button" className="shell2-menu" aria-haspopup="dialog" aria-expanded={open} onClick={show}>
            <span className="shell2-burger" aria-hidden="true"><i /><i /><i /></span>
            <span className="shell2-menu-word">Menu</span>
          </button>
        </div>
      </header>
      <nav className="shell2-nav" aria-label="Main">
        <div className="shell2-in" ref={rowRef}>
          {main.map(navLink)}
          {end.length ? <><span className="shell2-nav-divider" aria-hidden="true" />{end.map(navLink)}</> : null}
          <div className="shell2-measure" ref={measureRef} aria-hidden="true">
            {links.map((l) => <span key={l.href} className="shell2-link"><span className="shell2-label">{l.label}</span><Count n={l.count} /></span>)}
          </div>
        </div>
      </nav>
      <dialog className="shell2-sheet" ref={sheetRef} aria-label="Menu" onCancel={(e) => { e.preventDefault(); close(); }}>
        <div className="shell2-head is-sheet">
          <div className="shell2-in">
            {head}
            <span className="shell2-spacer" />
            <button type="button" className="shell2-menu" onClick={close} autoFocus>
              <span className="shell2-close" aria-hidden="true"><i /><i /></span>
              <span className="shell2-menu-word">Close</span>
            </button>
          </div>
        </div>
        <ul className="shell2-sheet-links">
          {links.map((l) => (
            <li key={l.href}>
              <Link href={l.href} aria-current={l === current ? "page" : undefined} onClick={close}>
                <span>{l.label}</span><Count n={l.count} />
              </Link>
            </li>
          ))}
        </ul>
        <div className="shell2-sheet-user">
          <span className="shell2-email is-plain">{user.email}</span>
          {user.passwordHref ? <Link className="shell2-link-text" href={user.passwordHref} onClick={close}>Change password</Link> : null}
          <LogOut block />
        </div>
      </dialog>
    </div>
  );
}
