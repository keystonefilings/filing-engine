"use client";

import { useEffect } from "react";

/** Inside the website widget: tells the page around it how tall the form is, so there's no inner scroll bar. */
export function EmbedResizer() {
  useEffect(() => {
    const send = () => window.parent?.postMessage({ type: "cofile:height", height: document.documentElement.scrollHeight }, "*");
    const ro = new ResizeObserver(send);
    ro.observe(document.body);
    send();
    return () => ro.disconnect();
  }, []);
  return null;
}
