import "@/styles/components/marketing.css";
import Link from "next/link";
import type { ReactNode } from "react";

/** A text link with its 16 px arrow (9.1 "See pricing", 9.2 "For firms"): underlined in Brass Line, the arrow nudging 3 px on hover. */
export function ArrowLink({ href, children, className }: { href: string; children: ReactNode; className?: string }) {
  return (
    <Link className={["mk-arrow", className].filter(Boolean).join(" ")} href={href}>
      <span>{children}</span>
      <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M2 8h11.5M9 3.5 13.5 8 9 12.5" /></svg>
    </Link>
  );
}

/**
 * Marks the page as scripted before first paint (9.9: the Close's field is shown only with JavaScript, and must never
 * pop in). <html> carries suppressHydrationWarning for the theme script; this sits beside it.
 */
export function JsMark() {
  return <script dangerouslySetInnerHTML={{ __html: `document.documentElement.setAttribute("data-js","")` }} />;
}
