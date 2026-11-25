"use client";

import { useKeptForm } from "./useKeptForm";
import type { TeamState } from "@/app/dashboard/(app)/team/actions";

export function TeamForm({ action }: { action: (prev: TeamState, fd: FormData) => Promise<TeamState> }) {
  const { state: s, pending, formProps } = useKeptForm(action, null, { clearOnSuccess: true });
  return (
    <form {...formProps} className="card">
      {s?.error ? <p className="notice bad" role="alert">{s.error}</p> : null}
      {s?.ok ? <p className="notice ok" role="status">Added. Give them the password privately; they can sign in at the log-in page.</p> : null}
      <div className="field-row n2">
        <div className="field"><label htmlFor="t-name">Name</label><input id="t-name" name="name" type="text" required /></div>
        <div className="field"><label htmlFor="t-email">Email</label><input id="t-email" name="email" type="email" required /></div>
      </div>
      <div className="field"><label htmlFor="t-pw">First password</label><input id="t-pw" name="password" type="password" autoComplete="new-password" minLength={12} required /><p className="help">At least 12 characters.</p></div>
      <button className="btn primary" type="submit" disabled={pending}>{pending ? "Adding…" : "Add"}</button>
    </form>
  );
}
