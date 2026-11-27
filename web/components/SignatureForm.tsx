"use client";

import { useKeptForm } from "./useKeptForm";
import { SignaturePad } from "./SignaturePad";
import { Notice } from "./ui/Sheet";

type R = { ok: boolean; message: string } | null;

export function SignatureForm({ action, consentText }: { action: (prev: R, fd: FormData) => Promise<R>; consentText: string }) {
  const { state, pending, formProps } = useKeptForm(action, null, { clearOnSuccess: true });
  return (
    <form {...formProps} className="sigs2-form">
      {state ? <Notice tone={state.ok ? "done" : "problem"} role={state.ok ? "status" : "alert"}>{state.message}</Notice> : null}
      <div className="field"><label htmlFor="sig-name">Signer&apos;s full name</label><input id="sig-name" name="signerName" type="text" required autoComplete="name" /></div>
      <div className="field"><label htmlFor="sig-email">Signer&apos;s email (optional)</label><input id="sig-email" name="signerEmail" type="email" /></div>
      <p className="help">Only the signer may draw and adopt their own signature. If the signer is your client, send them a client link for the filing; the form asks them to sign.</p>
      <div className="field"><span className="label">Signature</span><SignaturePad name="image" label="Signature pad: the signer draws their signature here with a mouse, finger or stylus." /></div>
      <label className="choice consent field"><input type="checkbox" name="consent" /><span>{consentText}</span></label>
      <button className="btn primary is-main" type="submit" disabled={pending} aria-busy={pending || undefined}>{pending ? "Saving…" : "Save signature"}</button>
    </form>
  );
}
