"use client";

import Link from "next/link";
import { useKeptForm } from "./useKeptForm";
import type { MissingInput } from "@/lib/missing-fields";

export type MissingState = { ok: boolean; message?: string; error?: string } | null;

/** V27: the answers a filing still needs, on its own page. */
export function MissingInfoForm({ action, inputs, startOverHref }: { action: (prev: MissingState, fd: FormData) => Promise<MissingState>; inputs: MissingInput[]; startOverHref: string }) {
  const { state: s, pending, formProps } = useKeptForm(action, null);
  const fillable = inputs.filter((i) => i.kind !== "startOver");
  const big = inputs.filter((i) => i.kind === "startOver");
  return (
    <div className="card stack">
      <strong>Still needed</strong>
      {fillable.length ? (
        <form {...formProps} className="stack">
          {fillable.map((i) => (
            <div key={i.path} className="field">
              <label htmlFor={`m-${i.path}`}>{i.label[0]!.toUpperCase() + i.label.slice(1)}</label>
              {i.kind === "address" ? (
                <div className="stack" style={{ gap: 6 }}>
                  <input id={`m-${i.path}`} name={`${i.path}.street1`} placeholder="Street" required />
                  <input name={`${i.path}.street2`} placeholder="Suite, floor (optional)" />
                  <div className="field-row n3">
                    <input name={`${i.path}.city`} placeholder="City" required />
                    <input name={`${i.path}.state`} placeholder="State" maxLength={2} required />
                    <input name={`${i.path}.zip`} placeholder="ZIP" required />
                  </div>
                </div>
              ) : i.kind === "select" ? (
                <select id={`m-${i.path}`} name={i.path} required defaultValue=""><option value="" disabled>Choose…</option>{i.options.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}</select>
              ) : i.kind === "textarea" ? (
                <textarea id={`m-${i.path}`} name={i.path} required rows={3} />
              ) : (
                <input id={`m-${i.path}`} name={i.path} type={i.kind} required />
              )}
            </div>
          ))}
          <button className="btn primary is-main" type="submit" disabled={pending}>{pending ? "Sending…" : "Send the answers"}</button>
          {s?.error ? <p className="notice bad" role="alert">{s.error}</p> : s?.message ? <p className="notice ok" role="status">{s.message}</p> : null}
        </form>
      ) : null}
      {big.length ? (
        <p className="small">
          Also needed: {big.map((i) => i.label).join(", ")}. These take the full form: <Link href={startOverHref}>start this filing again</Link> with them, and this one can be left as it is.
        </p>
      ) : null}
    </div>
  );
}
