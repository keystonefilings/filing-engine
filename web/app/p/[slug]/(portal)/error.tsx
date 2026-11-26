"use client";

import Link from "next/link";
import "@/styles/components/desk.css";

/** A desk page that fails (merged spec 10B.21): the desk's header and navigation stay; one sheet says so plainly. */
export default function DeskError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <section className="desk2-fail">
      <h1>Something went wrong</h1>
      <p>This page couldn&apos;t load just now. It&apos;s usually a short hiccup on our side.</p>
      <p className="desk2-fail-actions">
        <button className="btn primary is-main" type="button" onClick={() => reset()}>Try again</button>
        <Link className="btn" href="/login">Log in again</Link>
      </p>
      {error.digest ? <p className="desk2-fail-ref">If it keeps happening, tell us this reference: <code>{error.digest}</code></p> : null}
    </section>
  );
}
