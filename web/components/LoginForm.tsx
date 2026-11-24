"use client";

import { useActionState } from "react";

export function LoginForm({ action }: { action: (prev: string | null, fd: FormData) => Promise<string | null> }) {
  const [error, run, pending] = useActionState(action, null);
  return (
    <form action={run} className="card">
      {error ? <p className="notice bad" role="alert">{error}</p> : null}
      <div className="field"><label htmlFor="key">API key</label><input id="key" name="apiKey" type="password" autoComplete="off" required /></div>
      <button className="btn primary" type="submit" disabled={pending}>{pending ? "Checking…" : "Sign in"}</button>
      <p className="help">The key stays on this site&apos;s server in an encrypted cookie for 12 hours; it is never sent to your browser again.</p>
    </form>
  );
}
