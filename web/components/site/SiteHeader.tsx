"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState, type ReactNode } from "react";

/**
 * The public header (merged spec 9.0, 6.7): sticky, 76 px, compacting to 60 px after 120 px of scroll with a Rule
 * edge appearing; "Run a free rehearsal" as an outline while a page's own Brass copy of it is on screen, Brass after.
 * Phones: 64 px, "Log in", a menu button with the word "Menu", a full-height menu sheet, and a sticky bar with the
 * button once the page's own has scrolled away.
 */
export function SiteHeader({ name, email, nav, lockup }: { name: string; email: string; nav: { href: string; label: string }[]; lockup: ReactNode }) {
  const path = usePathname() ?? "/";
  const [compact, setCompact] = useState(false);
  const [brassInView, setBrassInView] = useState(path === "/");
  const [pastFirstBrass, setPastFirstBrass] = useState(false);
  const [typing, setTyping] = useState(false);
  const [open, setOpen] = useState(false);
  const sheetRef = useRef<HTMLDialogElement>(null);
  const menuRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => setCompact(window.scrollY > 120);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Watch the page's own Brass buttons: while one is on screen, the header's stays an outline and the bar stays away.
  useEffect(() => {
    const els = [...document.querySelectorAll<HTMLElement>("[data-brass-cta]")];
    setPastFirstBrass(false);
    if (!els.length) {
      setBrassInView(false);
      return;
    }
    const visible = new Set<Element>();
    const io = new IntersectionObserver((entries) => {
      for (const e of entries) { if (e.isIntersecting) visible.add(e.target); else visible.delete(e.target); }
      setBrassInView(visible.size > 0);
      const first = els.find((el) => el.getClientRects().length > 0);
      setPastFirstBrass(!!first && first.getBoundingClientRect().bottom <= 64);
    }, { rootMargin: "-64px 0px 0px", threshold: 0 });
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [path]);

  useEffect(() => {
    const on = (e: FocusEvent) => setTyping((e.target as HTMLElement)?.matches?.("input, textarea, select") ?? false);
    const off = () => setTyping(false);
    document.addEventListener("focusin", on);
    document.addEventListener("focusout", off);
    return () => { document.removeEventListener("focusin", on); document.removeEventListener("focusout", off); };
  }, []);

  useEffect(() => { if (sheetRef.current?.open) { sheetRef.current.close(); setOpen(false); } }, [path]);

  const close = () => {
    const d = sheetRef.current;
    if (!d?.open) return;
    const done = () => { d.classList.remove("is-closing"); d.close(); setOpen(false); menuRef.current?.focus(); };
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return done();
    d.classList.add("is-closing");
    window.setTimeout(done, 160);
  };
  const show = () => { sheetRef.current?.showModal(); setOpen(true); };

  const current = (href: string) => path === href || path.startsWith(`${href}/`);
  // On a page with no Brass button of its own, the header's is Brass from the start.
  const headerBrass = !brassInView;
  const barShown = pastFirstBrass && !brassInView && !typing && !open;

  return (
    <>
      <header className={["site2-head", compact && "is-compact"].filter(Boolean).join(" ")}>
        <div className="site2-in site2-head-row">
          <Link className="site2-home" href="/" aria-label={`${name} home`}>{lockup}</Link>
          <nav className="site2-nav" aria-label="Main">
            {nav.map((l) => <Link key={l.href} href={l.href} aria-current={current(l.href) ? "page" : undefined}>{l.label}</Link>)}
          </nav>
          <span className="site2-spacer" />
          <Link className="site2-login" href="/login" aria-current={current("/login") ? "page" : undefined}>Log in</Link>
          <Link className={["btn2 is-header site2-cta", headerBrass ? "is-action" : "is-outline"].join(" ")} href="/signup">Run a free rehearsal</Link>
          <button ref={menuRef} type="button" className="site2-menu" aria-haspopup="dialog" aria-expanded={open} onClick={show}>
            <span className="shell2-burger" aria-hidden="true"><i /><i /><i /></span><span>Menu</span>
          </button>
        </div>
      </header>
      <dialog ref={sheetRef} className="site2-sheet" aria-label="Menu" onCancel={(e) => { e.preventDefault(); close(); }}>
        <div className="site2-in site2-head-row is-sheet">
          <Link className="site2-home" href="/" aria-label={`${name} home`} onClick={close}>{lockup}</Link>
          <span className="site2-spacer" />
          <button type="button" className="site2-menu is-on" onClick={close}>
            <span className="shell2-close" aria-hidden="true"><i /><i /></span><span>Close</span>
          </button>
        </div>
        <div className="site2-in site2-sheet-body">
          <ul className="site2-sheet-links">
            {nav.map((l, i) => <li key={l.href}><Link href={l.href} onClick={close} autoFocus={i === 0} aria-current={current(l.href) ? "page" : undefined}>{l.label}</Link></li>)}
          </ul>
          <Link className="site2-sheet-login" href="/login" onClick={close}>Log in</Link>
          <Link className="btn2 is-action is-block" href="/signup" onClick={close}>Run a free rehearsal</Link>
          <a className="site2-sheet-email" href={`mailto:${email}`}>{email}</a>
        </div>
      </dialog>
      <div className={["site2-bar", barShown && "is-shown"].filter(Boolean).join(" ")} aria-hidden={!barShown}>
        <Link className="btn2 is-action is-block" href="/signup" tabIndex={barShown ? undefined : -1}>Run a free rehearsal</Link>
      </div>
    </>
  );
}
