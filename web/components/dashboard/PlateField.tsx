"use client";

import { useEffect, useRef, useState } from "react";

/**
 * The plate field (merged spec 10C.2): a value shown once and meant to be copied (a new API key, a signing secret, an
 * invitation link, the widget code), in mono on Cotton 2 with the product's "Copy" beside it. After a copy the button
 * confirms for 2 s and says so to screen readers. No eye, padlock or key icon.
 */
export function PlateField({ value, label = "Copy", focus, small }: { value: string; label?: string; focus?: boolean; small?: boolean }) {
  const [copied, setCopied] = useState(false);
  const button = useRef<HTMLButtonElement>(null);
  const timer = useRef<number | undefined>(undefined);
  useEffect(() => { if (focus) button.current?.focus(); }, [focus]);
  useEffect(() => () => window.clearTimeout(timer.current), []);
  const copy = () => {
    void navigator.clipboard?.writeText(value);
    setCopied(true);
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setCopied(false), 2000);
  };
  return (
    <div className={["plate2", small && "is-small"].filter(Boolean).join(" ")}>
      <code className="plate2-value">{value}</code>
      <button ref={button} type="button" className="btn small plate2-copy" onClick={copy}>{copied ? "Copied" : label}</button>
      <span className="sr-only" role="status">{copied ? "Copied" : ""}</span>
    </div>
  );
}
