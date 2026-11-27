"use client";

import { useEffect, useId, useRef, useState } from "react";

/**
 * The contents of Terms and Privacy (merged spec 10A.15): the page's own headings as links. At 1280 px and wider it is
 * a sticky rail and the current section is marked (the last whose heading has passed a third of the way down the
 * window; nothing before the first; the last at the very foot), at once, with no slide. If the rail is taller than the
 * window under the header it stops being sticky rather than scrolling inside itself. Choosing an item moves focus to
 * its heading. Its accessible name, "Contents", is a stand-in until the copy owner writes one.
 */
export function LegalContents({ items, numbered }: { items: { id: string; n?: string; title: string }[]; numbered: boolean }) {
  const [current, setCurrent] = useState<string | null>(null);
  const [tall, setTall] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [ready, setReady] = useState(false);
  const contentsId = useId();
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    setReady(true);
    const wide = window.matchMedia("(min-width: 1280px)");
    const heads = items.map((i) => document.getElementById(i.id)).filter((h): h is HTMLElement => !!h);
    const update = () => {
      if (!wide.matches) { setCurrent(null); return; }
      const line = window.innerHeight / 3;
      let at: string | null = null;
      for (const h of heads) if (h.getBoundingClientRect().top <= line) at = h.id;
      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2 && heads.length) at = heads[heads.length - 1]!.id;
      setCurrent(at);
    };
    const measure = () => setTall(!!ref.current && wide.matches && ref.current.offsetHeight > window.innerHeight - 96 - 24);
    update(); measure();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    window.addEventListener("resize", measure);
    wide.addEventListener("change", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
      window.removeEventListener("resize", measure);
      wide.removeEventListener("change", update);
    };
  }, [items]);

  return (
    <nav ref={ref} className={["legal2-contents", numbered && "is-numbered", tall && "is-static", ready && "has-disclosure", expanded && "is-expanded"].filter(Boolean).join(" ")} aria-label="Contents">
      <button type="button" className="legal2-toggle" aria-expanded={expanded} aria-controls={contentsId} onClick={() => setExpanded(!expanded)}>
        Contents <span aria-hidden="true">{expanded ? "−" : "+"}</span>
      </button>
      <ol id={contentsId}>
        {items.map((i) => (
          <li key={i.id}>
            <a href={`#${i.id}`} aria-current={current === i.id ? "location" : undefined}
              onClick={() => requestAnimationFrame(() => document.getElementById(i.id)?.focus({ preventScroll: true }))}>
              {i.n ? <><span className="legal2-n">{i.n}.</span>{" "}</> : null}<span className="legal2-t">{i.title}</span>
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
