import type { ReactNode } from "react";
import Link from "next/link";
import "@/styles/components/site-pages.css";

/**
 * How a page behind the home page ends (merged spec 10A.0.4, decision 26): words only on a quiet Cotton 2 band above
 * the footer's rule, the Brass "Run a free rehearsal" and, where the copy has one, the outline secondary. The Brass
 * button is marked data-brass-cta so the header's copy of it stays an outline and the phone bar stays away while it
 * is on screen. Nothing here moves.
 */
export function PageClose({ title, lede, secondary }: { title: ReactNode; lede?: ReactNode; secondary?: { href: string; label: string } }) {
  return (
    <section className="pg2-band pg2-close">
      <div className="site2-in">
        <h2 className="t-display-l pg2-close-h2">{title}</h2>
        {lede ? <p className="t-lede pg2-close-lede">{lede}</p> : null}
        <div className="pg2-close-ctas">
          <Link className="btn2 is-action" href="/signup" data-brass-cta="">Run a free rehearsal</Link>
          {secondary ? <Link className="btn2 is-outline pg2-close-second" href={secondary.href}>{secondary.label}</Link> : null}
        </div>
      </div>
    </section>
  );
}
