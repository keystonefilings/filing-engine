"use client";

import { useActionState } from "react";

type P = { ok: boolean; message: string } | null;
type I = { ok: true; link: string; email: string } | { ok: false; message: string } | null;
interface Portal { slug: string; displayName?: string; logoUrl?: string; primaryColor?: string; supportEmail?: string; filingKinds?: string[] }

export function PortalForm({ action, portal, kinds }: { action: (prev: P, fd: FormData) => Promise<P>; portal?: Portal; kinds: { id: string; title: string }[] }) {
  const [state, run, pending] = useActionState(action, null);
  const offered = portal?.filingKinds;
  return (
    <form action={run} className="card">
      {state ? <p className={`notice ${state.ok ? "ok" : "bad"}`} role="status">{state.message}</p> : null}
      <div className="field"><label htmlFor="slug">Portal address</label><input id="slug" name="slug" type="text" defaultValue={portal?.slug} pattern="[a-z0-9][a-z0-9-]{0,46}[a-z0-9]" placeholder="smith-cpa" />
        <p className="help">Lowercase letters, digits and dashes. Leave empty to turn the portal off.</p></div>
      <div className="field"><label htmlFor="dn">Name shown on the portal</label><input id="dn" name="displayName" type="text" maxLength={80} defaultValue={portal?.displayName} /></div>
      <div className="field"><label htmlFor="logo">Logo URL (https)</label><input id="logo" name="logoUrl" type="url" defaultValue={portal?.logoUrl} /></div>
      <div className="field"><label htmlFor="color">Brand color</label><input id="color" name="primaryColor" type="text" defaultValue={portal?.primaryColor} placeholder="#1f4b99" pattern="#[0-9a-fA-F]{6}" /></div>
      <div className="field"><label htmlFor="support">Support email shown to clients</label><input id="support" name="supportEmail" type="email" defaultValue={portal?.supportEmail} /></div>
      <fieldset><legend>Filings offered</legend>
        <div className="choices">{kinds.map((k) => <label key={k.id} className="choice"><input type="checkbox" name="kinds" value={k.id} defaultChecked={!offered || offered.includes(k.id)} /><span>{k.title}</span></label>)}</div>
      </fieldset>
      <button className="btn primary" type="submit" disabled={pending}>{pending ? "Saving…" : "Save portal"}</button>
    </form>
  );
}

export function InviteForm({ action }: { action: (prev: I, fd: FormData) => Promise<I> }) {
  const [state, run, pending] = useActionState(action, null);
  return (
    <div className="stack">
      <form action={run} className="card row">
        <input name="email" type="email" required placeholder="name@firm.com" aria-label="Staff email" style={{ flex: 1, minWidth: 220 }} />
        <button className="btn primary" type="submit" disabled={pending}>Make invite link</button>
      </form>
      {state && !state.ok ? <p className="notice bad">{state.message}</p> : null}
      {state && state.ok ? (
        <div className="card">
          <strong>Invite for {state.email}</strong>
          <p className="secret small">{state.link}</p>
          <div className="row"><button type="button" className="btn small" onClick={() => navigator.clipboard?.writeText(state.link)}>Copy link</button>
            <span className="small muted">Send it to them yourself. It works for 7 days and signs whoever opens it in to this firm&apos;s portal.</span></div>
        </div>
      ) : null}
    </div>
  );
}
