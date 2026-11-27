"use client";

import { useEffect, useState } from "react";

/**
 * A page's own h2s as a sticky contents rail (merged spec 10C.11), the section in view marked with the Brass Line bar.
 * It needs no heading or name of its own (the page's title names it); below 1280 px it isn't shown.
 */
export function ContentsRail({ items, labelledBy }: { items: { id: string; label: string }[]; labelledBy: string }) {
  const [current, setCurrent] = useState(items[0]?.id);
  useEffect(() => {
    const heads = items.map((i) => document.getElementById(i.id)).filter((e): e is HTMLElement => Boolean(e));
    if (!heads.length) return;
    // The current section is the last heading that has passed the top third of the screen.
    const pick = () => {
      const line = window.innerHeight / 3;
      let at = heads[0]!.id;
      for (const h of heads) if (h.getBoundingClientRect().top <= line) at = h.id;
      setCurrent(at);
    };
    pick();
    window.addEventListener("scroll", pick, { passive: true });
    window.addEventListener("resize", pick);
    return () => { window.removeEventListener("scroll", pick); window.removeEventListener("resize", pick); };
  }, [items]);
  return (
    <nav className="rail2" aria-labelledby={labelledBy}>
      <ul>
        {items.map((i) => <li key={i.id}><a href={`#${i.id}`} aria-current={i.id === current ? "location" : undefined}>{i.label}</a></li>)}
      </ul>
    </nav>
  );
}
