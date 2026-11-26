import { DeskHomeLink } from "@/components/desk/DeskHomeLink";
import "@/styles/components/desk.css";

/** Not found inside the desk (merged spec 10B.21): the shell stays, with one way back to the desk's Filings. */
export default function DeskNotFound() {
  return (
    <section className="desk2-fail">
      <h1>Page not found</h1>
      <p>The link may be old or mistyped.</p>
      {/* Stand-in words (spec: [copy needed]): the desk's own label for its Filings page */}
      <p className="desk2-fail-actions"><DeskHomeLink className="btn primary is-main">Filings</DeskHomeLink></p>
    </section>
  );
}
