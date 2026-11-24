"use client";

import { useActionState } from "react";
import { SignaturePad } from "./SignaturePad";

type R = { ok: boolean; message: string } | null;

export function SignatureForm({ action, consentText }: { action: (prev: R, fd: FormData) => Promise<R>; consentText: string }) {
  const [state, run, pending] = useActionState(action, null);
  return (
    <form action={run} className="card">
      {state ? <p className={`notice ${state.ok ? "ok" : "bad"}`} role="status">{state.message}</p> : null}
      <div className="field"><label htmlFor="sig-name">Signer&apos;s full name</label><input id="sig-name" name="signerName" type="text" required autoComplete="name" /></div>
      <div className="field"><label htmlFor="sig-email">Signer&apos;s email (optional)</label><input id="sig-email" name="signerEmail" type="email" /></div>
      <div className="field"><span className="label">Signature</span><SignaturePad name="image" label="The signer signs here" /></div>
      <label className="choice consent field"><input type="checkbox" name="consent" /><span>{consentText}</span></label>
      <button className="btn primary" type="submit" disabled={pending}>{pending ? "Saving…" : "Save signature"}</button>
      <p className="help">The signer should draw and adopt it themselves. To have a client do that, send them a client link for the filing; the form asks them to sign.</p>
    </form>
  );
}
