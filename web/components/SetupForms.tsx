"use client";

import { useActionState, useState } from "react";
import type { SetupState } from "@/app/p/[slug]/(portal)/setup/actions";
import type { PaymentMethodRef, PaymentRouting } from "@/lib/engine";
import { textOn } from "@/lib/brand";
import { ColorField, LogoField } from "./BrandFields";

type Action = (prev: SetupState, fd: FormData) => Promise<SetupState>;

function Issue({ s, k }: { s: SetupState; k: string }) {
  const m = s?.issues?.[k];
  return m ? <p className="help" style={{ color: "var(--bad)" }}>{m}</p> : null;
}

function Top({ s }: { s: SetupState }) {
  return s?.error ? <p className="notice bad" role="alert">{s.error}</p> : null;
}

export interface DetailsValues { name: string; companyType?: string; contactName?: string; contactEmail?: string; phone?: string; website?: string }

export function DetailsForm({ action, v }: { action: Action; v: DetailsValues }) {
  const [s, run, pending] = useActionState(action, null);
  return (
    <form action={run} className="card">
      <Top s={s} />
      <div className="field"><label htmlFor="d-name">Firm name</label><input id="d-name" name="name" type="text" defaultValue={v.name} required /><Issue s={s} k="name" /></div>
      <div className="field"><label htmlFor="d-type">Kind of firm</label>
        <select id="d-type" name="companyType" defaultValue={v.companyType ?? "other"}>
          <option value="cpa">CPA or accounting firm</option><option value="payroll">Payroll company</option>
          <option value="cfo">Fractional CFO firm</option><option value="other">Something else</option>
        </select></div>
      <div className="field-row n2">
        <div className="field"><label htmlFor="d-cn">Main contact</label><input id="d-cn" name="contactName" type="text" defaultValue={v.contactName} /></div>
        <div className="field"><label htmlFor="d-ph">Phone</label><input id="d-ph" name="phone" type="tel" defaultValue={v.phone} /></div>
      </div>
      <div className="field-row n2">
        <div className="field"><label htmlFor="d-ce">Contact email</label><input id="d-ce" name="contactEmail" type="email" defaultValue={v.contactEmail} /><Issue s={s} k="contactEmail" /></div>
        <div className="field"><label htmlFor="d-web">Website</label><input id="d-web" name="website" type="url" defaultValue={v.website} placeholder="https://" /><Issue s={s} k="website" /></div>
      </div>
      <button className="btn primary" type="submit" disabled={pending}>{pending ? "Saving…" : "Save and continue"}</button>
    </form>
  );
}

export interface BrandValues { displayName?: string; logoSrc?: string; logoUrl?: string; primaryColor?: string; secondaryColor?: string; supportEmail?: string }

export function BrandingForm({ action, v, platform }: { action: Action; v: BrandValues; platform: string }) {
  const [s, run, pending] = useActionState(action, null);
  const [name, setName] = useState(v.displayName ?? "");
  const [logo, setLogo] = useState<string | undefined>(v.logoSrc);
  const [color, setColor] = useState(v.primaryColor ?? "#1f4fd1");
  const [color2, setColor2] = useState(v.secondaryColor ?? v.primaryColor ?? "#0f766e");
  return (
    <div className="stack">
      <form action={run} className="card">
        <Top s={s} />
        <div className="field"><label htmlFor="b-name">Name your clients see</label><input id="b-name" name="displayName" type="text" value={name} onChange={(e) => setName(e.target.value)} maxLength={80} /></div>
        <LogoField current={v.logoSrc} currentLink={v.logoUrl} onPreview={setLogo} />
        <Issue s={s} k="logoUrl" /><Issue s={s} k="data" />
        <div className="field-row n2">
          <ColorField id="b-color" name="primaryColor" label="Main color" value={color} onChange={setColor} help="Buttons and the top of the page." />
          <ColorField id="b-color2" name="secondaryColor" label="Second color" value={color2} onChange={setColor2} help="Links and highlights." />
        </div>
        <div className="field"><label htmlFor="b-sup">Support email shown to clients</label><input id="b-sup" name="supportEmail" type="email" defaultValue={v.supportEmail} /><Issue s={s} k="supportEmail" /></div>
        <button className="btn primary" type="submit" disabled={pending}>{pending ? "Saving…" : "Save and continue"}</button>
      </form>
      <BrandPreview name={name} logo={logo} color={color} color2={color2} platform={platform} />
    </div>
  );
}

/** How a client's page will look with these choices. */
export function BrandPreview({ name, logo, color, color2, platform }: { name: string; logo?: string; color: string; color2: string; platform?: string }) {
  return (
    <div className="card" style={{ ["--accent" as string]: color, ["--accent-text" as string]: textOn(color), ["--accent-2" as string]: color2, borderTop: `4px solid ${color2}` }}>
      <p className="small muted" style={{ marginTop: 0 }}>Preview of a client&apos;s page</p>
      <div className="row">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        {logo ? <img src={logo} alt="" style={{ height: 28, width: "auto" }} /> : null}
        <strong>{name || "Your firm"}</strong>
        <span className="spacer" />
        {platform ? <span className="small muted">with {platform}</span> : null}
      </div>
      <p className="small" style={{ marginBottom: 8 }}>Please fill in your LLC formation details. <a href="#" onClick={(e) => e.preventDefault()}>What you&apos;ll need</a></p>
      <button type="button" className="btn primary small">Send</button>
    </div>
  );
}

export function PaymentsForm({ action, methods, routing, kinds }: { action: Action; methods: PaymentMethodRef[]; routing?: PaymentRouting; kinds: { id: string; title: string }[] }) {
  const [s, run, pending] = useActionState(action, null);
  const [mode, setMode] = useState<"single" | "per_filing">(routing?.mode ?? "single");
  const cards = methods.filter((m) => m.purpose === "state_fees");
  const none = cards.length === 0;
  const CardSelect = ({ name, value, label }: { name: string; value?: string; label: string }) => (
    <select name={name} defaultValue={value ?? ""} disabled={none} aria-label={label}>
      <option value="">{none ? "No cards yet" : "Choose a card"}</option>
      {cards.map((c) => <option key={c.id} value={c.id}>{c.label}{c.last4 ? ` ending ${c.last4}` : ""}</option>)}
    </select>
  );
  return (
    <form action={run} className="card">
      <Top s={s} />
      <fieldset>
        <legend>How state fees are paid</legend>
        <div className="choices">
          <label className="choice"><input type="radio" name="mode" value="single" checked={mode === "single"} onChange={() => setMode("single")} /><span><b>One card for every filing</b></span></label>
          <label className="choice"><input type="radio" name="mode" value="per_filing" checked={mode === "per_filing"} onChange={() => setMode("per_filing")} /><span><b>A card for each type of filing</b>, with one main card for the rest</span></label>
        </div>
      </fieldset>
      <div className="field-row n2">
        <div className="field"><label>Main card</label><CardSelect name="defaultMethodId" value={routing?.defaultMethodId} label="Main card" /></div>
        <div className="field"><label>Backup card, used if the main one is declined</label><CardSelect name="fallbackMethodId" value={routing?.fallbackMethodId} label="Backup card" /></div>
      </div>
      {mode === "per_filing" ? (
        <fieldset>
          <legend>Card for each filing</legend>
          {kinds.map((k) => (
            <div className="field" key={k.id}><label>{k.title}</label><CardSelect name={`kind.${k.id}`} value={routing?.byFilingKind?.[k.id]} label={k.title} /></div>
          ))}
        </fieldset>
      ) : null}
      {none ? <p className="notice">Adding a card isn&apos;t switched on yet. Cards will be held by a secure card vault, never by us, and you&apos;ll pick them here. Your choice above is saved now.</p> : null}
      <button className="btn primary" type="submit" disabled={pending}>{pending ? "Saving…" : "Save"}</button>
    </form>
  );
}
