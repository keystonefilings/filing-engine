import { notFound } from "next/navigation";
import { SiteShell } from "@/components/site/SiteShell";

/** A check page for the public site shell (merged spec 6.7, 9.0, 9.10): header, phone bar and footer around stand-in bands. */
export default function SiteShellCheck() {
  if (process.env.NODE_ENV === "production" && process.env.DESIGN_GALLERY !== "true") notFound();
  return (
    <SiteShell>
      <section style={{ padding: "96px 0" }}>
        <div className="site2-in">
          <h1 style={{ font: "400 4rem/1.05 var(--font-display)", margin: "0 0 32px" }}>A page in CoFile&apos;s look</h1>
          <a className="btn2 is-action" href="/signup" data-brass-cta="">Run a free rehearsal</a>
        </div>
      </section>
      {[1, 2, 3].map((n) => <section key={n} style={{ height: 600, borderTop: "1px solid var(--line)" }} />)}
    </SiteShell>
  );
}
