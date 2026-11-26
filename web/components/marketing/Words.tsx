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

/** The title page of a page behind the home page (10A.0.2): kicker, h1 (one sentence per line), lede, and a frontispiece if any. */
export function PageHead({ kicker, title, lede, aside, id }: { kicker: string; title: string[]; lede: ReactNode; aside?: ReactNode; id?: string }) {
  return (
    <section className={["mk-head", aside && "has-aside"].filter(Boolean).join(" ")} aria-labelledby={id ?? "mk-h1"}>
      <div className="site2-in mk-head-grid">
        <div className="mk-head-words">
          <p className="mk-kicker t-kicker">{kicker}</p>
          <h1 id={id ?? "mk-h1"} className="mk-h1 t-display-page">{title.map((t, i) => <span key={i}>{t}{i < title.length - 1 ? " " : null}</span>)}</h1>
          <div className="mk-lede t-lede">{lede}</div>
        </div>
        {aside ? <div className="mk-head-aside">{aside}</div> : null}
      </div>
    </section>
  );
}

/** The page close (10A.0.4): h2, lede and buttons on a quiet Cotton 2 band above the footer's rule. */
export function PageClose({ title, lede, secondary, aside }: { title: string[]; lede: ReactNode; secondary?: { href: string; label: string }; aside?: ReactNode }) {
  return (
    <section className={["mk-close", aside && "has-aside"].filter(Boolean).join(" ")} aria-labelledby="mk-close-h">
      <div className="site2-in mk-close-grid">
        <div className="mk-close-words">
          <h2 id="mk-close-h" className="mk-close-h t-display-l">{title.map((t, i) => <span key={i}>{t}{i < title.length - 1 ? " " : null}</span>)}</h2>
          <p className="mk-close-lede t-lede">{lede}</p>
          <div className="mk-close-buttons">
            <Link className="btn2 is-action" href="/signup" data-brass-cta="">Run a free rehearsal</Link>
            {secondary ? <Link className="btn2 is-outline" href={secondary.href}>{secondary.label}</Link> : null}
          </div>
        </div>
        {aside ? <div className="mk-close-aside">{aside}</div> : null}
      </div>
    </section>
  );
}
