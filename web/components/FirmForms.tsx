"use client";

import { useKeptForm } from "./useKeptForm";
import { useMemo, useRef, useState, type CSSProperties } from "react";
import { ColorField, LogoField } from "./BrandFields";
import { firmVars, inkMatch } from "@/lib/design/ink";
import { Letterhead, Notice } from "./ui/Sheet";
import { PlateField } from "./dashboard/PlateField";
import "@/styles/components/branding.css";

type P = { ok: boolean; message: string } | null;
type I = { ok: true; link: string; email: string } | { ok: false; message: string } | null;
interface Portal { slug: string; publicPages?: boolean; displayName?: string; logoUrl?: string; logoArtifactId?: string; primaryColor?: string; secondaryColor?: string; supportEmail?: string; filingKinds?: string[] }

const HEX = /^#[0-9a-fA-F]{6}$/;

/** The firm's register for the preview: the ink match of its colors. A half-typed color keeps the last good look. */
function useFirmStyle(color: string, color2: string): CSSProperties {
  const last = useRef<Record<string, string>>({});
  return useMemo(() => {
    try { if (HEX.test(color) && HEX.test(color2)) last.current = firmVars(inkMatch(color, color2)); } catch { /* keep the last good look */ }
    return { ...last.current } as CSSProperties;
  }, [color, color2]);
}

/** When the ink match deepens the button color, the chosen color and the fill the button uses, side by side (3.6, 10C.8). */
function InkLine({ color }: { color: string }) {
  if (!HEX.test(color)) return null;
  let ink;
  try { ink = inkMatch(color, color); } catch { return null; }
  const chosen = color.toUpperCase();
  if (ink.fill.toUpperCase() === chosen) return null;
  return (
    <div className="ink2" aria-label={`Buttons print as ${ink.fill}, from ${chosen}`} role="img">
      <span className="ink2-chip"><span className="ink2-aa" style={{ background: color, color: "#fff", borderColor: color }}>Aa</span><code>{chosen}</code></span>
      <span className="ink2-arrow" aria-hidden="true">→</span>
      <span className="ink2-chip">
        <span className="ink2-aa" style={{ background: ink.fill, color: ink.on, borderColor: ink.fillBorder && ink.fillBorder !== "transparent" ? ink.fillBorder : ink.fill, boxShadow: ink.fillEdge && ink.fillEdge !== "transparent" ? `inset 4px 0 0 ${ink.fillEdge}` : undefined }}>Aa</span>
        <code>{ink.fill.toUpperCase()}</code>
      </span>
    </div>
  );
}

/**
 * The firm's client page as its clients will get it (10C.8), live as the form changes: the same surface the desk's
 * Branding page shows large, at 0.75 scale on the firm's wash. Nothing of CoFile on it; it stays light in dark mode.
 */
function ClientPagePreview({ name, logo, style }: { name: string; logo?: string; style: CSSProperties }) {
  const scale = 0.75, height = 456;
  return (
    <div className="pv2-mat reg-firm" style={{ ...style, width: Math.round(390 * scale), height }}>
      <div className="pv2-scaled" style={{ transform: `scale(${scale})`, height: height / scale }}>
        <div className="pv2-sheet">
          <Letterhead name={name || "Your firm"} logoUrl={logo} />
          <p className="pv2-text">Please fill in your LLC formation details. <span className="pv2-link">What you&apos;ll need</span></p>
          <span className="pv2-label" /><span className="pv2-field" />
          <span className="pv2-label" style={{ width: "40%" }} /><span className="pv2-field" />
          <span className="pv2-button">Send for approval</span>
        </div>
      </div>
    </div>
  );
}

export function PortalForm({ action, portal, kinds, firmName, logoSrc }: { action: (prev: P, fd: FormData) => Promise<P>; portal?: Portal; kinds: { id: string; title: string }[]; firmName: string; logoSrc?: string }) {
  const { state, pending, formProps } = useKeptForm(action, null);
  const [on, setOn] = useState(Boolean(portal));
  const [name, setName] = useState(portal?.displayName ?? "");
  const [logo, setLogo] = useState<string | undefined>(logoSrc);
  const [color, setColor] = useState(portal?.primaryColor ?? "#1f4fd1");
  const [color2, setColor2] = useState(portal?.secondaryColor ?? portal?.primaryColor ?? "#0f766e");
  const firm = useFirmStyle(color, color2);
  const offered = portal?.filingKinds;
  return (
    <div className={["dashfirm2", on && "has-preview"].filter(Boolean).join(" ")}>
      <form {...formProps} className="card dashfirm2-form">
        {state ? <Notice tone={state.ok ? "done" : "problem"} role="status">{state.message}</Notice> : null}
        <div className="dashfirm2-on">
          <label className="choice"><input type="checkbox" name="portalOn" checked={on} onChange={(e) => setOn(e.target.checked)} /><span><b>This firm has a portal</b></span></label>
          <p className="help">{portal?.slug ? <>Its address is <code>/p/{portal.slug}</code>.</> : "Its address is made from the firm's name when you save."} Unchecking turns the portal off.</p>
        </div>
        {on ? (
          <>
            <div className="field"><label htmlFor="dn">Name shown on the filing desk</label><input id="dn" name="displayName" type="text" maxLength={80} value={name} onChange={(e) => setName(e.target.value)} placeholder={firmName} /></div>
            <LogoField current={logoSrc} currentLink={portal?.logoArtifactId ? undefined : portal?.logoUrl} onPreview={setLogo} name={name || firmName} />
            <div className="field-row n2 dashfirm2-colors">
              <ColorField id="color" name="primaryColor" label="Main color" value={color} onChange={setColor} help="Buttons and the top of the page. Button text is white, so choose a dark color." below={<InkLine color={color} />} />
              <ColorField id="color2" name="secondaryColor" label="Second color" value={color2} onChange={setColor2} help="Links and highlights. Choose a color that's easy to read on white." />
            </div>
            <div className="field"><label htmlFor="support">Support email shown to clients</label><input id="support" name="supportEmail" type="email" defaultValue={portal?.supportEmail} /></div>
            <label className="choice dashfirm2-public"><input type="checkbox" name="publicPages" defaultChecked={portal?.publicPages} /><span><b>Public pages and website widget</b><br /><span className="small muted">A page per service anyone can fill in, and code to put the form on the firm&apos;s own website. Each submission becomes a filing for this firm and goes through approval as usual.</span></span></label>
            <fieldset className="dashfirm2-kinds"><legend>Filings offered</legend>
              <div className="choices">{kinds.map((k) => <label key={k.id} className="choice"><input type="checkbox" name="kinds" value={k.id} defaultChecked={!offered || offered.includes(k.id)} /><span>{k.title}</span></label>)}</div>
            </fieldset>
          </>
        ) : null}
        <button className="btn primary is-main" type="submit" disabled={pending}>{pending ? "Saving…" : "Save filing desk"}</button>
      </form>
      {on ? (
        <aside className="dashfirm2-preview">
          <p className="dashfirm2-caption">Preview of a client&apos;s page</p>
          <ClientPagePreview name={name || firmName} logo={logo} style={firm} />
        </aside>
      ) : null}
    </div>
  );
}

export function InviteForm({ action }: { action: (prev: I, fd: FormData) => Promise<I> }) {
  const { state, pending, formProps } = useKeptForm(action, null, { clearOnSuccess: true });
  return (
    <div className="stack">
      <form {...formProps} className="card dash2-inline">
        <input name="email" type="email" required placeholder="name@firm.com" aria-label="Staff email" />
        <button className="btn primary" type="submit" disabled={pending}>Invite</button>
      </form>
      {state && !state.ok ? <Notice tone="problem" role="alert">{state.message}</Notice> : null}
      {state && state.ok ? (
        <div className="card dash2-invite">
          <strong>Invite for {state.email}</strong>
          <PlateField value={state.link} label="Copy link" />
          <p className="help">We emailed {state.email} this link to set their password (it works for 7 days). Then they log in with their email, to this firm&apos;s portal only. If email isn&apos;t set up here yet, send it to them yourself.</p>
        </div>
      ) : null}
    </div>
  );
}
