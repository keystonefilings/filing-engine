"use client";

import { useKeptForm } from "./useKeptForm";
import type { TeamState } from "@/app/dashboard/(app)/team/actions";
import { Notice } from "./ui/Sheet";

export function TeamForm({ action }: { action: (prev: TeamState, fd: FormData) => Promise<TeamState> }) {
  const { state: s, pending, formProps } = useKeptForm(action, null, { clearOnSuccess: true });
  return (
    <form {...formProps} className="card dash2-team-form">
      {s?.error ? <Notice tone="problem" role="alert">{s.error}</Notice> : null}
      {s?.ok ? <Notice tone="done" role="status">Added. Give them the password privately; they can sign in at the log-in page.</Notice> : null}
      <div className="field-row n2">
        <div className="field"><label htmlFor="t-name">Name</label><input id="t-name" name="name" type="text" required /></div>
        <div className="field"><label htmlFor="t-email">Email</label><input id="t-email" name="email" type="email" required /></div>
      </div>
      <div className="field"><label htmlFor="t-pw">First password</label><input id="t-pw" name="password" type="password" autoComplete="new-password" minLength={12} required /><p className="help">At least 12 characters.</p></div>
      <button className="btn primary is-main" type="submit" disabled={pending}>{pending ? "Adding…" : "Add"}</button>
    </form>
  );
}
