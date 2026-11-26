"use client";

import { useEffect } from "react";

/**
 * Questions' anchors (merged spec 10A.6.2): arriving at /faq#approves (or following a link to it on the page) opens
 * that answer, lands its row 96 px under the header and gives it a Cotton 2 wash that fades over 2 s. Printing opens
 * every answer. Renders nothing.
 */
export function FaqAnchors() {
  useEffect(() => {
    const arrive = () => {
      const id = decodeURIComponent(location.hash.slice(1));
      const el = id ? document.getElementById(id) : null;
      if (!(el instanceof HTMLDetailsElement)) return;
      el.open = true;
      el.scrollIntoView({ block: "start" });
      el.classList.remove("is-arrived");
      void el.offsetWidth;
      el.classList.add("is-arrived");
    };
    arrive();
    window.addEventListener("hashchange", arrive);
    const opened = new Set<HTMLDetailsElement>();
    const beforePrint = () => {
      for (const d of document.querySelectorAll<HTMLDetailsElement>(".faq2-row:not([open])")) { d.open = true; opened.add(d); }
    };
    const afterPrint = () => { for (const d of opened) d.open = false; opened.clear(); };
    window.addEventListener("beforeprint", beforePrint);
    window.addEventListener("afterprint", afterPrint);
    return () => {
      window.removeEventListener("hashchange", arrive);
      window.removeEventListener("beforeprint", beforePrint);
      window.removeEventListener("afterprint", afterPrint);
    };
  }, []);
  return null;
}
