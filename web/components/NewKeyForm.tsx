"use client";

import { useKeptForm } from "./useKeptForm";
import { Notice } from "./ui/Sheet";
import { PlateField } from "./dashboard/PlateField";
type R = { ok: true; key: string; name: string } | { ok: false; message: string } | null;

/** The create row and, once made, the new key on its plate (10C.9): shown once, its Copy button focused. */
export function NewKeyForm({ action }: { action: (prev: R, fd: FormData) => Promise<R> }) {
  const { state, pending, formProps } = useKeptForm(action, null, { clearOnSuccess: true });
  return (
    <div className="stack">
      <form {...formProps} className="card dash2-inline">
        <input name="name" type="text" maxLength={60} placeholder="Key name, e.g. Production server" aria-label="Key name" required />
        <button className="btn primary is-main" type="submit" disabled={pending}>Create key</button>
      </form>
      {state && !state.ok ? <Notice tone="problem" role="alert">{state.message}</Notice> : null}
      {state && state.ok ? (
        <Notice tone="done">
          <strong>{state.name}</strong>: copy this key now. It won&apos;t be shown again.
          <PlateField key={state.key} value={state.key} focus />
        </Notice>
      ) : null}
    </div>
  );
}
