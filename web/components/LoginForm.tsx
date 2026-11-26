"use client";

import { useActionState, useEffect, useRef } from "react";
import { Notice } from "./ui/Sheet";

/** The API-key log-in card (10C.3): an error as a Problem notice at its top, focused; "Log in" the page's Brass. */
export function LoginForm({ action }: { action: (prev: string | null, fd: FormData) => Promise<string | null> }) {
  const [error, run, pending] = useActionState(action, null);
  const alert = useRef<HTMLDivElement>(null);
  useEffect(() => { if (error) alert.current?.focus(); }, [error]);
  return (
    <form action={run} className="card dashlogin2-card">
      {error ? <div ref={alert} tabIndex={-1} className="dash2-result"><Notice tone="problem" role="alert">{error}</Notice></div> : null}
      <div className="field"><label htmlFor="key">API key</label><input id="key" name="apiKey" type="password" autoComplete="off" required className="dash2-mono" /></div>
      <button className="btn primary is-main" type="submit" disabled={pending}>{pending ? "Checking…" : "Log in"}</button>
      <p className="help">You stay logged in for 12 hours. Your browser keeps only an encrypted cookie, and the key itself is never sent back to it.</p>
    </form>
  );
}
