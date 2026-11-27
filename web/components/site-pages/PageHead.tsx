import type { ReactNode } from "react";
import "@/styles/components/site-pages.css";

/**
 * The title page of a page behind the home page (merged spec 10A.0.2): the kicker with its Brass Line lead rule,
 * the h1 at display-page and the lede, on Cotton. The page's own class arranges anything beyond that.
 *
 * On phones it also carries an invisible marker for the site header (data-brass-cta, shown only at phone width):
 * while the title page is on screen the sticky phone bar stays away, so the bar slides up only once the page head
 * has scrolled out of view (10A.0.1). On wider screens the marker is display:none and never counts.
 */
export function PageHead({ kicker, title, children, className, aside }: {
  kicker: string; title: ReactNode; children?: ReactNode; className?: string; aside?: ReactNode;
}) {
  return (
    <header className={["pg2-head", className].filter(Boolean).join(" ")}>
      <div className="site2-in pg2-head-in">
        <div className="pg2-head-words">
          <p className="t-kicker pg2-kicker">{kicker}</p>
          <h1 className="t-display-page pg2-h1">{title}</h1>
          {children}
        </div>
        {aside}
      </div>
      <span className="pg2-barmark" data-brass-cta="" aria-hidden="true" />
    </header>
  );
}

/** A two-sentence headline set one sentence per line on desktop and tablet (5.4); one heading for screen readers. */
export function Lines({ lines }: { lines: string[] }) {
  return <>{lines.map((l, i) => <span key={i} className="pg2-line">{l}{i < lines.length - 1 ? " " : ""}</span>)}</>;
}
