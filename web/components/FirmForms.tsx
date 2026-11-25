"use client";

import { useActionState, useState } from "react";
import { ColorField, LogoField } from "./BrandFields";
import { BrandPreview } from "./SetupForms";

type P = { ok: boolean; message: string } | null;
type I = { ok: true; link: string; email: string } | { ok: false; message: string } | null;
interface Portal { slug: string; displayName?: string; logoUrl?: string; logoArtifactId?: string; primaryColor?: string; secondaryColor?: string; supportEmail?: string; filingKinds?: string[] }

export function PortalForm({ action, portal, kinds, firmName, logoSrc }: { action: (prev: P, fd: FormData) => Promise<P>; portal?: Portal; kinds: { id: string; title: string }[]; firmName: string; logoSrc?: string }) {
  const [state, run, pending] = useActionState(action, null);
  const [on, setOn] = useState(Boolean(portal));
  const [name, setName] = useState(portal?.displayName ?? "");
  const [logo, setLogo] = useState<string | undefined>(logoSrc);
  const [color, setColor] = useState(portal?.primaryColor ?? "#1f4fd1");
  const [color2, setColor2] = useState(portal?.secondaryColor ?? portal?.primaryColor ?? "#0f766e");
  const offered = portal?.filingKinds;
  return (
    <div className="stack">
      <form action={run} className="card">
        {state ? <p className={`notice ${state.ok ? "ok" : "bad"}`} role="status">{state.message}</p> : null}
        <label className="choice"><input type="checkbox" name="portalOn" checked={on} onChange={(e) => setOn(e.target.checked)} /><span><b>This firm has a portal</b></span></label>
        <p className="help">{portal?.slug ? <>Its address is <code>/p/{portal.slug}</code>.</> : "Its address is made from the firm's name when you save."} Unticking turns the portal off.</p>
        {on ? (
          <>
            <div className="field"><label htmlFor="dn">Name shown on the portal</label><input id="dn" name="displayName" type="text" maxLength={80} value={name} onChange={(e) => setName(e.target.value)} placeholder={firmName} /></div>
            <LogoField current={logoSrc} currentLink={portal?.logoArtifactId ? undefined : portal?.logoUrl} onPreview={setLogo} />
            <div className="field-row n2">
              <ColorField id="color" name="primaryColor" label="Main color" value={color} onChange={setColor} help="Buttons and the top of the page." />
              <ColorField id="color2" name="secondaryColor" label="Second color" value={color2} onChange={setColor2} help="Links and highlights." />
            </div>
            <div className="field"><label htmlFor="support">Support email shown to clients</label><input id="support" name="supportEmail" type="email" defaultValue={portal?.supportEmail} /></div>
            <fieldset><legend>Filings offered</legend>
              <div className="choices">{kinds.map((k) => <label key={k.id} className="choice"><input type="checkbox" name="kinds" value={k.id} defaultChecked={!offered || offered.includes(k.id)} /><span>{k.title}</span></label>)}</div>
            </fieldset>
          </>
        ) : null}
        <button className="btn primary" type="submit" disabled={pending}>{pending ? "Saving…" : "Save portal"}</button>
      </form>
      {on ? <BrandPreview name={name || firmName} logo={logo} color={color} color2={color2} /> : null}
    </div>
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
