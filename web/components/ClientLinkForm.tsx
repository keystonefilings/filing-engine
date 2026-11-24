"use client";

import { useActionState } from "react";

type R = { ok: true; link: string; kindTitle: string; label?: string } | { ok: false; message: string } | null;

export function ClientLinkForm({ action, kinds }: { action: (prev: R, fd: FormData) => Promise<R>; kinds: { id: string; title: string }[] }) {
  const [state, run, pending] = useActionState(action, null);
  return (
    <div className="stack">
      <form action={run} className="card">
        <div className="field"><label htmlFor="cl-kind">Filing</label>
          <select id="cl-kind" name="kind" required defaultValue=""><option value="" disabled>Choose…</option>{kinds.map((k) => <option key={k.id} value={k.id}>{k.title}</option>)}</select></div>
        <div className="field"><label htmlFor="cl-label">Who it&apos;s for (shown to you and the client)</label><input id="cl-label" name="label" type="text" maxLength={80} placeholder="e.g. Blue Harbor Bakery" /></div>
        <button className="btn primary" type="submit" disabled={pending}>Make link</button>
      </form>
      {state && !state.ok ? <p className="notice bad">{state.message}</p> : null}
      {state && state.ok ? (
        <div className="card">
          <strong>{state.kindTitle}{state.label ? ` for ${state.label}` : ""}</strong>
          <p className="secret small">{state.link}</p>
          <div className="row">
            <button type="button" className="btn small" onClick={() => navigator.clipboard?.writeText(state.link)}>Copy link</button>
            <span className="small muted">Works for 30 days and makes one filing. Anyone with the link can fill in the form, so send it only to your client.</span>
          </div>
        </div>
      ) : null}
    </div>
  );
}
