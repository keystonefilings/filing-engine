"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Fragment, useEffect, useState } from "react";

export interface DocsLink { href: string; label: string; head?: string; file?: boolean }
export type Sections = Record<string, { id: string; label: string }[]>;

/**
 * The docs' contents (merged spec 10C.16): sticky beside the article on wide screens, the current page marked with the
 * Brass Line bar and its own sections listed under it, the one in view in Plate Ink. Below 1024 px it folds into a
 * row whose button is the current page's title, opening the full list under it.
 */
export function DocsNav({ links, sections }: { links: DocsLink[]; sections: Sections }) {
  const path = usePathname() ?? "/docs";
  const current = links.find((l) => !l.file && l.href === path);
  const toc = current ? sections[current.href] ?? [] : [];
  const [open, setOpen] = useState(false);
  const [here, setHere] = useState<string | undefined>();

  useEffect(() => setOpen(false), [path]);
  useEffect(() => {
    if (!open) return;
    const esc = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
    window.addEventListener("keydown", esc);
    return () => window.removeEventListener("keydown", esc);
  }, [open]);
  // The section in view: the last heading that has passed the top third of the screen.
  useEffect(() => {
    const heads = toc.map((t) => document.getElementById(t.id)).filter((e): e is HTMLElement => Boolean(e));
    if (!heads.length) { setHere(undefined); return; }
    const pick = () => {
      let at: string | undefined;
      for (const h of heads) if (h.getBoundingClientRect().top <= window.innerHeight / 3) at = h.id;
      setHere(at);
    };
    pick();
    window.addEventListener("scroll", pick, { passive: true });
    return () => window.removeEventListener("scroll", pick);
  }, [toc]);

  return (
    <aside className={["docs2-side", open && "is-open"].filter(Boolean).join(" ")}>
      <button type="button" className="docs2-menu" aria-expanded={open} aria-controls="docs-nav" onClick={() => setOpen((o) => !o)}>
        <span>{current?.label ?? links[0]?.label}</span><span className="docs2-chevron" aria-hidden="true" />
      </button>
      <nav id="docs-nav" aria-label="Docs" className="docs2-nav">
        <ul>
          {links.map((l) => (
            <Fragment key={l.href}>
              {l.head ? <li className="docs2-navhead">{l.head}</li> : null}
              <li>
                {l.file
                  ? <a href={l.href}>{l.label}</a>
                  : <Link href={l.href} aria-current={l === current ? "page" : undefined}>{l.label}</Link>}
                {l === current && toc.length ? (
                  <ul className="docs2-toc">
                    {toc.map((t) => <li key={t.id}><a href={`#${t.id}`} className={t.id === here ? "is-here" : undefined} onClick={() => setOpen(false)}>{t.label}</a></li>)}
                  </ul>
                ) : null}
              </li>
            </Fragment>
          ))}
        </ul>
      </nav>
    </aside>
  );
}
