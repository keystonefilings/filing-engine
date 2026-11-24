"use client";

import { useActionState, useState } from "react";

type R = { ok: true; generated: { url: string; secret: string }[] } | { ok: false; message: string; issues?: { path: string; message: string }[] } | null;
interface Endpoint { url: string; events?: string[]; secretHint: string }

export function WebhookForm({ action, endpoints, events }: { action: (prev: R, fd: FormData) => Promise<R>; endpoints: Endpoint[]; events: [string, string][] }) {
  const [state, run, pending] = useActionState(action, null);
  const [count, setCount] = useState(endpoints.length ? endpoints.length : 1);
  const rows = Array.from({ length: count }, (_, i) => endpoints[i]);
  return (
    <form action={run} className="stack">
      {state && !state.ok ? <div className="notice bad"><strong>{state.message}</strong>{state.issues?.length ? <ul>{state.issues.map((i, n) => <li key={n}>{i.message}</li>)}</ul> : null}</div> : null}
      {state && state.ok ? (
        <div className="notice ok">Saved.{state.generated.length ? " Copy each new signing secret now; it won't be shown again." : ""}
          {state.generated.map((g) => <div key={g.url} style={{ marginTop: 8 }}><div className="small">{g.url}</div><p className="secret">{g.secret}</p></div>)}
        </div>
      ) : null}
      {rows.map((e, i) => (
        <fieldset key={i} className="card">
          <legend>{e ? "Endpoint" : "New endpoint"}</legend>
          <div className="field"><label htmlFor={`ep-${i}`}>URL (https)</label><input id={`ep-${i}`} name={`ep.${i}.url`} type="url" defaultValue={e?.url} readOnly={!!e} placeholder="https://example.com/keystone/webhooks" /></div>
          {e ? <p className="small muted">Signing secret ends in <code>{e.secretHint}</code>. To change it, remove the endpoint and add it again.</p> : null}
          <label className="choice"><input type="checkbox" name={`ep.${i}.all`} defaultChecked={!e?.events?.length} /><span>Every event</span></label>
          <details><summary className="small">Or only these events</summary>
            <div className="choices" style={{ marginTop: 6 }}>
              {events.map(([name]) => <label key={name} className="choice small"><input type="checkbox" name={`ep.${i}.event`} value={name} defaultChecked={e?.events?.includes(name)} /><code>{name}</code></label>)}
            </div>
          </details>
          {e ? <label className="choice" style={{ marginTop: 8 }}><input type="checkbox" name={`ep.${i}.remove`} /><span>Remove this endpoint</span></label> : null}
        </fieldset>
      ))}
      <div className="row">
        {count < 10 ? <button type="button" className="btn" onClick={() => setCount(count + 1)}>Add another endpoint</button> : null}
        <button className="btn primary" type="submit" disabled={pending}>{pending ? "Saving…" : "Save endpoints"}</button>
      </div>
    </form>
  );
}
