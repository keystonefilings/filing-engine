"use client";

import { useActionState } from "react";

type R = { ok: true; key: string; name: string } | { ok: false; message: string } | null;

export function NewKeyForm({ action }: { action: (prev: R, fd: FormData) => Promise<R> }) {
  const [state, run, pending] = useActionState(action, null);
  return (
    <div className="stack">
      <form action={run} className="card row">
        <input name="name" type="text" maxLength={60} placeholder="Key name, e.g. Production server" aria-label="Key name" style={{ flex: 1, minWidth: 220 }} required />
        <button className="btn primary" type="submit" disabled={pending}>Create key</button>
      </form>
      {state && !state.ok ? <p className="notice bad">{state.message}</p> : null}
      {state && state.ok ? (
        <div className="notice ok">
          <strong>{state.name}</strong>: copy this key now. It won&apos;t be shown again.
          <p className="secret">{state.key}</p>
          <button type="button" className="btn small" onClick={() => navigator.clipboard?.writeText(state.key)}>Copy</button>
        </div>
      ) : null}
    </div>
  );
}
