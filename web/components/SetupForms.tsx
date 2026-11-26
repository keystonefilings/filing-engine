"use client";

import { useKeptForm } from "./useKeptForm";
import { useState } from "react";
import type { SetupState } from "@/app/p/[slug]/(portal)/setup/actions";
import type { PaymentMethodRef, PaymentRouting } from "@/lib/engine";
import { firmVars, inkMatch } from "@/lib/design/ink";

type Action = (prev: SetupState, fd: FormData) => Promise<SetupState>;

function Issue({ s, k }: { s: SetupState; k: string }) {
  const m = s?.issues?.[k];
  return m ? <p className="help" style={{ color: "var(--bad)" }}>{m}</p> : null;
}

function Top({ s }: { s: SetupState }) {
  return s?.error ? <p className="notice bad" role="alert">{s.error}</p> : null;
}

export interface DetailsValues { name: string; companyType?: string; contactName?: string; contactEmail?: string; phone?: string; website?: string; copyEmail?: string; services?: { id: string; title: string; state: string; offered: boolean }[] }

const STATE_NAMES: Record<string, string> = { NY: "New York", NJ: "New Jersey", FL: "Florida", MO: "Missouri" };

export function DetailsForm({ action, v }: { action: Action; v: DetailsValues }) {
  const { state: s, pending, formProps } = useKeptForm(action, null);
  return (
    <form {...formProps} className="card">
      <Top s={s} />
      <div className="field"><label htmlFor="d-name">Firm name</label><input id="d-name" name="name" type="text" defaultValue={v.name} required /><Issue s={s} k="name" /></div>
      <div className="field"><label htmlFor="d-type">Kind of firm</label>
        <select id="d-type" name="companyType" defaultValue={v.companyType ?? "other"}>
          <option value="cpa">CPA or accounting firm</option><option value="payroll">Payroll company</option>
          <option value="cfo">Fractional CFO firm</option><option value="title">Title company</option><option value="other">Something else</option>
        </select></div>
      <div className="field-row n2">
        <div className="field"><label htmlFor="d-cn">Main contact</label><input id="d-cn" name="contactName" type="text" defaultValue={v.contactName} /></div>
        <div className="field"><label htmlFor="d-ph">Phone</label><input id="d-ph" name="phone" type="tel" defaultValue={v.phone} /></div>
      </div>
      <div className="field-row n2">
        <div className="field"><label htmlFor="d-ce">Contact email</label><input id="d-ce" name="contactEmail" type="email" defaultValue={v.contactEmail} /><Issue s={s} k="contactEmail" /></div>
        <div className="field"><label htmlFor="d-web">Website</label><input id="d-web" name="website" type="url" defaultValue={v.website} placeholder="https://" /><Issue s={s} k="website" /></div>
      </div>
      <div className="field">
        <label htmlFor="d-copy">Email for the state&apos;s copies (optional)</label>
        <input id="d-copy" name="copyEmail" type="email" defaultValue={v.copyEmail} />
        <p className="help">When we file using our own New York account, the state emails the filed documents to us and sends a copy to this address. Leave it empty to use your contact email.</p>
        <Issue s={s} k="copyEmail" />
      </div>
      {v.services?.length ? (
        <fieldset className="field">
          <legend>Services you offer your clients</legend>
          <input type="hidden" name="servicesShown" value="1" />
          <p className="help">Only these show on your filing desk and your filing pages for clients. You can change them any time.</p>
          {Array.from(new Set(v.services.map((k) => k.state))).map((st) => (
            <div key={st} style={{ marginTop: 8 }}>
              <strong className="small">{st === "US" ? "Federal" : STATE_NAMES[st] ?? st}</strong>
              {v.services!.filter((k) => k.state === st).map((k) => (
                <label key={k.id} className="check"><input type="checkbox" name="services" value={k.id} defaultChecked={k.offered} /> {k.title}</label>
              ))}
            </div>
          ))}
          <Issue s={s} k="services" />
        </fieldset>
      ) : null}
      <button className="btn primary" type="submit" disabled={pending}>{pending ? "Saving…" : "Save and continue"}</button>
    </form>
  );
}

/** The preview's colors, from the same ink match the firm's real pages use (it re-runs as the firm picks colors). */
function previewStyle(color: string, color2: string): Record<string, string> {
  try {
    const ink = inkMatch(color, color2);
    return { ...firmVars(ink), "--accent": ink.fill, "--accent-text": ink.on, "--accent-2": ink.ink, borderTop: `4px solid ${ink.firm2}` };
  } catch {
    return {}; // a half-typed color: keep the last good look
  }
}

/** How a client's page will look with these choices. */
export function BrandPreview({ name, logo, color, color2 }: { name: string; logo?: string; color: string; color2: string }) {
  return (
    <div className="card" style={previewStyle(color, color2)}>
      <p className="small muted" style={{ marginTop: 0 }}>Preview of a client&apos;s page</p>
      <div className="row">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        {logo ? <img src={logo} alt="" style={{ height: 28, width: "auto" }} /> : null}
        <strong>{name || "Your firm"}</strong>
        <span className="spacer" />
      </div>
      <p className="small" style={{ marginBottom: 8 }}>Please fill in your LLC formation details. <a href="#" onClick={(e) => e.preventDefault()}>What you&apos;ll need</a></p>
      <button type="button" className="btn primary small">Send for approval</button>
    </div>
  );
}

export function PaymentsForm({ action, methods, routing, kinds }: { action: Action; methods: PaymentMethodRef[]; routing?: PaymentRouting; kinds: { id: string; title: string }[] }) {
  const { state: s, pending, formProps } = useKeptForm(action, null);
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
    <form {...formProps} className="card">
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
      {none ? <p className="notice">No cards saved yet. Add a card, then choose which card pays for what. You can save how fees are paid now and pick cards later.</p> : null}
      <button className="btn primary" type="submit" disabled={pending}>{pending ? "Saving…" : "Save"}</button>
    </form>
  );
}
