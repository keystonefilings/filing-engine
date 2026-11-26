"use client";

import { useKeptForm } from "./useKeptForm";

export type LoginState = { ok?: boolean; message?: string; error?: string } | null;

/** V29: connect a state portal login. The password is sent once and never shown again. */
export function PortalLoginForm({ action, portalName }: { action: (prev: LoginState, fd: FormData) => Promise<LoginState>; portalName: string }) {
  const { state: s, pending, formProps } = useKeptForm(action, null, { clearOnSuccess: true });
  return (
    <details className="small">
      <summary className="btn small" aria-label={`Connect ${portalName} login`}>Connect</summary>
      <form {...formProps} className="stack" style={{ marginTop: 8, minWidth: 260 }}>
        <label>Username for {portalName}<input name="username" autoComplete="off" required /></label>
        <label>Password<input name="password" type="password" autoComplete="new-password" required /></label>
        <label>Authenticator key (optional)<input name="totpSeed" autoComplete="off" placeholder="Only if the site uses an authenticator app" /></label>
        <button className="btn small primary" type="submit" disabled={pending}>{pending ? "Saving…" : "Save login"}</button>
        {s?.error ? <p className="notice bad">{s.error}</p> : null}
        <p className="help">Sealed as soon as it arrives and never shown again, here or anywhere. Only a filing run reads it.</p>
      </form>
    </details>
  );
}
