"use client";

import { useEffect, useRef, useState } from "react";

/** The code plate's "Copy" (10C.16): confirms for 2 s, and says so to screen readers. */
export function CopyCode({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  const timer = useRef<number | undefined>(undefined);
  useEffect(() => () => window.clearTimeout(timer.current), []);
  return (
    <>
      <button type="button" className="code2-copy" onClick={() => {
        void navigator.clipboard?.writeText(text);
        setCopied(true);
        window.clearTimeout(timer.current);
        timer.current = window.setTimeout(() => setCopied(false), 2000);
      }}>{copied ? "Copied" : "Copy"}</button>
      <span className="sr-only" role="status">{copied ? "Copied" : ""}</span>
    </>
  );
}
