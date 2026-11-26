"use client";

import { useActionState } from "react";

export function LoginForm({ action }: { action: (prev: string | null, fd: FormData) => Promise<string | null> }) {
  const [error, run, pending] = useActionState(action, null);
  return (
    <form action={run} className="card">
      {error ? <p className="notice bad" role="alert">{error}</p> : null}
      <div className="field"><label htmlFor="key">API key</label><input id="key" name="apiKey" type="password" autoComplete="off" required /></div>
      <button className="btn primary" type="submit" disabled={pending}>{pending ? "Checking…" : "Log in"}</button>
      <p className="help">You stay logged in for 12 hours. Your browser keeps only an encrypted cookie, and the key itself is never sent back to it.</p>
    </form>
  );
}
