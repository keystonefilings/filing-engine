"use client";

import { useKeptForm } from "./useKeptForm";
import { useEffect, useRef, useState } from "react";
import { Notice } from "./ui/Sheet";
import { PlateField } from "./dashboard/PlateField";

type R = { ok: true; generated: { url: string; secret: string }[] } | { ok: false; message: string; issues?: { path: string; message: string }[] } | null;
interface Endpoint { url: string; events?: string[]; secretHint: string }

/**
 * The account's webhook endpoints (merged spec 10C.10): one card per endpoint, every event or a chosen few (each with
 * the product's line on when it fires), and the results at the top, new signing secrets each on a plate.
 */
export function WebhookForm({ action, endpoints, events }: { action: (prev: R, fd: FormData) => Promise<R>; endpoints: Endpoint[]; events: [string, string][] }) {
  const { state, pending, formProps } = useKeptForm(action, null);
  const [count, setCount] = useState(endpoints.length ? endpoints.length : 1);
  const rows = Array.from({ length: count }, (_, i) => endpoints[i]);
  const result = useRef<HTMLDivElement>(null);
  // Focus moves to the result, so it is read and seen first.
  useEffect(() => { if (state) result.current?.focus(); }, [state]);
  return (
    <form {...formProps} className="dash2-hooks">
      {state ? (
        <div ref={result} tabIndex={-1} className="dash2-result">
          {!state.ok ? <Notice tone="problem" role="alert"><strong>{state.message}</strong>{state.issues?.length ? <ul>{state.issues.map((i, n) => <li key={n}>{i.message}</li>)}</ul> : null}</Notice> : (
            <Notice tone="done" role="status">Saved.{state.generated.length ? " Copy each new signing secret now; it won't be shown again." : ""}
              {state.generated.map((g) => <div key={g.url} className="dash2-secret"><div className="dash2-secret-url">{g.url}</div><PlateField value={g.secret} /></div>)}
            </Notice>
          )}
        </div>
      ) : null}
      {rows.map((e, i) => (
        <fieldset key={i} className="card dash2-hook">
          <legend>{e ? "Endpoint" : "New endpoint"}</legend>
          <div className="field"><label htmlFor={`ep-${i}`}>URL (https)</label><input id={`ep-${i}`} name={`ep.${i}.url`} type="url" defaultValue={e?.url} readOnly={!!e} placeholder="https://example.com/cofile/webhooks" className="dash2-mono" /></div>
          {e ? <p className="help dash2-hint">Signing secret ends in <code>{e.secretHint}</code>. To change it, remove the endpoint and add it again.</p> : null}
          <label className="choice"><input type="checkbox" name={`ep.${i}.all`} defaultChecked={!e?.events?.length} /><span>Every event</span></label>
          <details className="dash2-events"><summary>Or only these events</summary>
            <div className="dash2-event-list">
              {events.map(([name, when]) => (
                <label key={name} className="choice"><input type="checkbox" name={`ep.${i}.event`} value={name} defaultChecked={e?.events?.includes(name)} />
                  <span><code className="dash2-event">{name}</code><span className="help">{when}</span></span></label>
              ))}
            </div>
          </details>
          {e ? <label className="choice dash2-remove"><input type="checkbox" name={`ep.${i}.remove`} /><span>Remove this endpoint</span></label> : null}
        </fieldset>
      ))}
      <div className="dash2-actions">
        {count < 10 ? <button type="button" className="btn" onClick={() => setCount(count + 1)}>Add another endpoint</button> : null}
        <button className="btn primary is-main" type="submit" disabled={pending}>{pending ? "Saving…" : "Save endpoints"}</button>
      </div>
    </form>
  );
}
