"use client";

import { useEffect, useRef, useState } from "react";

/**
 * A small Outline "Copy" button for a plate field or a code block (merged spec 10B.11, 10B.14): after a copy it confirms
 * for 2 s and says so to screen readers. "Copy" and "Copied" are stand-ins until the copy owner writes them (10B.30).
 */
export function CopyButton({ value, label = "Copy", className }: { value: string; label?: string; className?: string }) {
  const [copied, setCopied] = useState(false);
  const timer = useRef<number | undefined>(undefined);
  useEffect(() => () => window.clearTimeout(timer.current), []);
  const copy = () => {
    void navigator.clipboard?.writeText(value);
    setCopied(true);
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setCopied(false), 2000);
  };
  return (
    <>
      <button type="button" className={["btn small", className].filter(Boolean).join(" ")} onClick={copy}>{copied ? "Copied" : label}</button>
      <span className="sr-only" role="status">{copied ? "Copied" : ""}</span>
    </>
  );
}
