"use client";

import { useEffect } from "react";

/** Moves the scan highlight down the hero's run trace, one row at a time. */
export function TraceScan() {
  useEffect(() => {
    const rows = Array.from(document.querySelectorAll<HTMLElement>(".lp .trace li"));
    if (!rows.length || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let i = 0;
    const t = setInterval(() => {
      rows.forEach((r) => r.classList.remove("scan"));
      i = (i + 1) % rows.length;
      rows[i].classList.add("scan");
    }, 900);
    return () => clearInterval(t);
  }, []);
  return null;
}
