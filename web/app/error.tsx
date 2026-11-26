"use client";

import Link from "next/link";
import { useTransition } from "react";
import { Lockup } from "@/components/shell/Lockup";
import "@/styles/components/button.css";
import "@/styles/components/shell.css";
import "@/styles/components/account.css";
import "@/styles/components/errors.css";

/**
 * Any page that fails (merged spec 10A.16.2): say so plainly, offer to try again, never show a stack trace. Outside the
 * page's frame, so it draws a minimal header of its own (the lockup alone, linking home) and loads as little as it can;
 * the beta notice stays. No picture, no red: an apology rather than an alarm.
 */
export default function ErrorPage({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  const [pending, start] = useTransition();
  return (
    <div className="reg-cofile err2">
      <header className="err2-head">
        <div className="err2-in"><Link className="err2-home" href="/"><Lockup height={28} /></Link></div>
      </header>
      <main className="err2-main">
        <div className="acct2-card">
          <h1 className="t-display-m acct2-h1">Something went wrong</h1>
          <p className="t-lede acct2-lede">This page couldn&apos;t load just now. It&apos;s usually a short hiccup on our side.</p>
          <div className="err2-ctas">
            <button className="btn2 is-action" type="button" aria-busy={pending || undefined} onClick={() => start(() => reset())}>Try again</button>
            <Link className="btn2 is-outline" href="/login">Log in again</Link>
          </div>
          {error.digest ? <p className="acct2-note err2-ref">If it keeps happening, tell us this reference: <code className="err2-digest">{error.digest}</code></p> : null}
        </div>
      </main>
    </div>
  );
}
