import Link from "next/link";
import { SiteShell } from "@/components/site/SiteShell";
import { Vignette } from "@/components/Vignette";
import "@/styles/components/errors.css";

export const metadata = { title: "Page not found" };

/**
 * Page not found (merged spec 10A.16.1): the full site frame, so someone who followed a bad link can go anywhere, and
 * the blank plate engraved large, saying gently that there's nothing here. "Go to the home page" is the outline button,
 * so the header's "Run a free rehearsal" stays the screen's one Brass button.
 */
export default function NotFound() {
  return (
    <SiteShell>
      <div className="site2-in nf2">
        <div className="nf2-in">
          <Vignette name="v01-blank-plate" size={360} phone={280} master="full" />
          <h1 className="t-display-m nf2-h1">Page not found</h1>
          <p className="t-lede nf2-lede">The link may be old or mistyped.</p>
          <Link className="btn2 is-outline nf2-btn" href="/">Go to the home page</Link>
        </div>
      </div>
    </SiteShell>
  );
}
