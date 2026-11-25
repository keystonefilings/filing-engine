"use client";

import { useActionState } from "react";

type R = { ok: true; link: string; kindTitle: string; label?: string; days?: number; from?: string } | { ok: false; message: string } | null;

function mailto(r: Extract<R, { ok: true }>): string {
  const subject = `Please fill in your ${r.kindTitle}`;
  const body = `Hi,\n\nPlease fill in the details for your ${r.kindTitle} here:\n${r.link}\n\nAfter you send it you'll get a link to check exactly what will be filed, and nothing is filed until it's approved.\n\nThanks${r.from ? `,\n${r.from}` : ""}`;
  return `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

export function ClientLinkForm({ action, kinds, defaultKind }: { action: (prev: R, fd: FormData) => Promise<R>; kinds: { id: string; title: string }[]; defaultKind?: string }) {
  const [state, run, pending] = useActionState(action, null);
  return (
    <div className="stack">
      <form action={run} className="card">
        <div className="field"><label htmlFor="cl-kind">Filing</label>
          <select id="cl-kind" name="kind" required defaultValue={defaultKind ?? ""}><option value="" disabled>Choose…</option>{kinds.map((k) => <option key={k.id} value={k.id}>{k.title}</option>)}</select></div>
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
            <a className="btn small" href={mailto(state)}>Email it from your mail app</a>
          </div>
          <p className="small muted">Works for {state.days ?? 30} days and makes one filing. Anyone with the link can fill in the form, so send it only to your client.</p>
        </div>
      ) : null}
    </div>
  );
}
