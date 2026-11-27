import type { ReactNode } from "react";
import Link from "next/link";
import { SiteShell } from "@/components/site/SiteShell";
import { platformName } from "@/lib/brand";
import { LegalContents } from "./LegalContents";
import "@/styles/components/legal.css";

export interface LegalSection { n?: string; title: string; body: ReactNode }

/** The section's anchor: its number on Terms ("section-4"), its title on Privacy ("who-we-share-it-with"). */
export const sectionId = (s: LegalSection) => (s.n ? `section-${s.n}` : s.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, ""));

/**
 * The frame for the Terms and the Privacy Policy (merged spec 10A.15, decision 25): a well-printed booklet. At 1280 px
 * and wider the contents stay beside the text in a sticky rail with the current section marked; narrower, they sit at
 * the top like a booklet's contents page. Miller Text for the reading, the section numbers hung (or inline beside the
 * rail). Printing gives US Letter with the contents first and a running foot.
 */
export function LegalPage({ title, effective, other, intro, sections }: {
  title: string; effective: string; other: "terms" | "privacy"; intro: ReactNode; sections: LegalSection[];
}) {
  const foot = `${platformName()} · ${title} · `;
  return (
    <SiteShell>
      <style>{`@page { size: letter; margin: 1in; @bottom-center { content: ${JSON.stringify(foot)} counter(page); font: 8.5pt "Founders Grotesk Text", "Founders Grotesk", Arial, sans-serif; color: #555867; } }`}</style>
      <article className="legal2">
        <div className="site2-in legal2-grid">
          <header className="legal2-head">
            <h1 className="t-display-page legal2-h1">{title}</h1>
            <p className="t-small legal2-effective">Effective {effective}. See also our {other === "terms" ? <Link href="/terms">Terms of Service</Link> : <Link href="/privacy">Privacy Policy</Link>}.</p>
          </header>
          <LegalContents items={sections.map((s) => ({ id: sectionId(s), n: s.n, title: s.title }))} numbered={sections.some((s) => s.n)} />
          <div className="legal2-text">
            {intro}
            {sections.map((s) => (
              <section key={s.title} className="legal2-sec">
                <h2 id={sectionId(s)} className="t-display-s legal2-h2" tabIndex={-1}>{s.n ? <><span className="legal2-n">{s.n}.</span> </> : null}{s.title}</h2>
                {s.body}
              </section>
            ))}
          </div>
        </div>
      </article>
    </SiteShell>
  );
}
