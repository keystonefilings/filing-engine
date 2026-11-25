"use client";

import Link from "next/link";

/** Any page that fails: say so plainly, offer to try again, never show a stack trace. */
export default function ErrorPage({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <main className="wrap" style={{ maxWidth: 560, paddingTop: 64 }}>
      <h1>Something went wrong</h1>
      <p>This page couldn&apos;t load just now. It&apos;s usually a short hiccup on our side.</p>
      <p className="row" style={{ gap: 12 }}>
        <button className="btn primary" type="button" onClick={() => reset()}>Try again</button>
        <Link className="btn" href="/login">Log in again</Link>
      </p>
      {error.digest ? <p className="small muted">If it keeps happening, tell us this reference: {error.digest}</p> : null}
    </main>
  );
}
