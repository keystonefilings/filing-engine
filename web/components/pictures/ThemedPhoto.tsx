"use client";

import { useEffect, useState } from "react";
import { PHOTOS, type PhotoName } from "@/lib/photography";
import { PHONE } from "./Photo";

type Theme = "device" | "light" | "dark";

/** The page's appearance: the device's, or the footer's override on <html data-theme> (9.10, 4.6). */
function useTheme(): Theme {
  const [theme, setTheme] = useState<Theme>("device");
  useEffect(() => {
    const read = () => { const t = document.documentElement.dataset.theme; setTheme(t === "light" || t === "dark" ? t : "device"); };
    read();
    const mo = new MutationObserver(read);
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
    return () => mo.disconnect();
  }, []);
  return theme;
}

/**
 * The blank plate by day in light mode and at dusk in dark mode (C3, C4; 9.9): one <picture> whose sources follow
 * prefers-color-scheme, and, once the page has run, the footer's manual override too, by rewriting the sources' media
 * so the browser picks the other crop. The day and dusk crops share their framing, so an engraving laid over the
 * plate stays in register either way.
 */
export function ThemedPhoto({ day, dusk, dayMobile, duskMobile, alt, className }: {
  day: PhotoName; dusk: PhotoName; dayMobile?: PhotoName; duskMobile?: PhotoName; alt: string; className?: string;
}) {
  const theme = useTheme();
  const darkMq = theme === "dark" ? "all" : theme === "light" ? "not all" : "(prefers-color-scheme: dark)";
  const and = (a: string, b: string) => (a === "all" ? b : a === "not all" ? "not all" : `${a} and ${b}`);
  const p = PHOTOS[day];
  const d = PHOTOS[dusk];
  const dm = duskMobile ? PHOTOS[duskMobile] : null;
  const m = dayMobile ? PHOTOS[dayMobile] : null;
  return (
    <picture className={["ph", className].filter(Boolean).join(" ")}>
      {dm ? <source media={and(darkMq, PHONE)} srcSet={dm.src} width={dm.width} height={dm.height} /> : null}
      <source media={darkMq} srcSet={d.src} width={d.width} height={d.height} />
      {m ? <source media={PHONE} srcSet={m.src} width={m.width} height={m.height} /> : null}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={p.src} width={p.width} height={p.height} alt={alt} loading="lazy" decoding="async" />
    </picture>
  );
}
