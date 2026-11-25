"use client";

import { useKeptForm } from "./useKeptForm";
import { useEffect, useState } from "react";
import type { SetupState } from "@/app/p/[slug]/(portal)/setup/actions";
import type { PaymentMethodRef, PaymentRouting } from "@/lib/engine";
import { textOn } from "@/lib/brand";
import { ColorField, LogoField } from "./BrandFields";
import { FONT_PRESETS } from "@/lib/fonts";

type Action = (prev: SetupState, fd: FormData) => Promise<SetupState>;

function Issue({ s, k }: { s: SetupState; k: string }) {
  const m = s?.issues?.[k];
  return m ? <p className="help" style={{ color: "var(--bad)" }}>{m}</p> : null;
}

function Top({ s }: { s: SetupState }) {
  return s?.error ? <p className="notice bad" role="alert">{s.error}</p> : null;
}

export interface DetailsValues { name: string; companyType?: string; contactName?: string; contactEmail?: string; phone?: string; website?: string; services?: { id: string; title: string; state: string; offered: boolean }[] }

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
      {v.services?.length ? (
        <fieldset className="field">
          <legend>Services you offer your clients</legend>
          <input type="hidden" name="servicesShown" value="1" />
          <p className="help">Only these show in your portal and on your pages for clients. You can change them any time.</p>
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

export interface BrandValues { slug?: string; siteUrl?: string; font?: string; hasCustomFont?: boolean; displayName?: string; logoSrc?: string; logoUrl?: string; primaryColor?: string; secondaryColor?: string; supportEmail?: string }

export function BrandingForm({ action, v, platform }: { action: Action; v: BrandValues; platform: string }) {
  const { state: s, pending, formProps } = useKeptForm(action, null);
  const [name, setName] = useState(v.displayName ?? "");
  const [logo, setLogo] = useState<string | undefined>(v.logoSrc);
  const [color, setColor] = useState(v.primaryColor ?? "#1f4fd1");
  const [color2, setColor2] = useState(v.secondaryColor ?? v.primaryColor ?? "#0f766e");
  const [font, setFont] = useState(v.font ?? "system");
  const [fontData, setFontData] = useState("");
  const [fontError, setFontError] = useState("");
  // The preview shows the chosen font: a preset from Google Fonts, or the file just picked.
  useEffect(() => {
    const p = FONT_PRESETS[font];
    if (p?.family && !document.querySelector(`link[data-font="${font}"]`)) {
      const l = document.createElement("link");
      l.rel = "stylesheet"; l.dataset.font = font;
      l.href = `https://fonts.googleapis.com/css2?family=${encodeURIComponent(p.family).replace(/%20/g, "+")}:wght@400;600&display=swap`;
      document.head.appendChild(l);
    }
    if (font === "custom" && fontData) void new FontFace("FirmFontPreview", `url(${fontData})`).load().then((f) => document.fonts.add(f)).catch(() => setFontError("That file isn't a font we can use."));
  }, [font, fontData]);
  const previewStack = font === "custom" ? (fontData ? `"FirmFontPreview", system-ui` : v.hasCustomFont ? `"FirmFont", system-ui` : "system-ui") : FONT_PRESETS[font]?.stack ?? "system-ui";
  const pickFont = (file: File | undefined) => {
    setFontError("");
    if (!file) return;
    if (file.size > 600 * 1024) { setFontError("The font file must be 600 KB or smaller."); return; }
    const r = new FileReader();
    r.onload = () => { setFontData(String(r.result)); setFont("custom"); };
    r.readAsDataURL(file);
  };
  return (
    <div className="stack">
      <form {...formProps} className="card">
        <Top s={s} />
        <div className="field">
          <label htmlFor="b-slug">Your web address</label>
          <div className="row" style={{ gap: 4, flexWrap: "nowrap" }}><span className="small muted" style={{ whiteSpace: "nowrap" }}>{(v.siteUrl ?? "").replace(/^https?:\/\//, "")}/</span><input id="b-slug" name="slug" type="text" defaultValue={v.slug} pattern="[a-z0-9](?:[a-z0-9-]{0,38}[a-z0-9])?" maxLength={40} aria-describedby="b-slug-help" /></div>
          <p className="help" id="b-slug-help">Your pages for clients live here, one per service. Lowercase letters, digits and dashes. Changing it changes those links.</p>
          <Issue s={s} k="slug" />
        </div>
        <div className="field"><label htmlFor="b-name">Name your clients see</label><input id="b-name" name="displayName" type="text" value={name} onChange={(e) => setName(e.target.value)} maxLength={80} /></div>
        <LogoField current={v.logoSrc} currentLink={v.logoUrl} onPreview={setLogo} />
        <Issue s={s} k="logoUrl" /><Issue s={s} k="data" />
        <div className="field-row n2">
          <ColorField id="b-color" name="primaryColor" label="Main color" value={color} onChange={setColor} help="Buttons and the top of the page." />
          <ColorField id="b-color2" name="secondaryColor" label="Second color" value={color2} onChange={setColor2} help="Links and highlights." />
        </div>
        <div className="field">
          <label htmlFor="b-font">Font</label>
          <select id="b-font" name="font" value={font} onChange={(e) => setFont(e.target.value)}>
            {Object.entries(FONT_PRESETS).map(([id, p]) => <option key={id} value={id}>{p.label}</option>)}
            {v.hasCustomFont || fontData ? <option value="custom">Your own font (uploaded)</option> : null}
          </select>
          <label className="small" style={{ display: "block", marginTop: 8 }}>Or upload your own (WOFF2, WOFF, TTF or OTF, up to 600 KB)
            <input type="file" accept=".woff2,.woff,.ttf,.otf,font/woff2,font/woff,font/ttf,font/otf" onChange={(e) => pickFont(e.target.files?.[0])} />
          </label>
          <input type="hidden" name="fontData" value={fontData} />
          {fontError ? <span className="err">{fontError}</span> : null}
          <Issue s={s} k="font" />
        </div>
        <div className="field"><label htmlFor="b-sup">Support email shown to clients</label><input id="b-sup" name="supportEmail" type="email" defaultValue={v.supportEmail} /><Issue s={s} k="supportEmail" /></div>
        <button className="btn primary" type="submit" disabled={pending}>{pending ? "Saving…" : "Save and continue"}</button>
      </form>
      <div style={{ fontFamily: previewStack }}><BrandPreview name={name} logo={logo} color={color} color2={color2} platform={platform} /></div>
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
      {none ? <p className="notice">Adding a card isn&apos;t switched on yet. Cards will be held by a secure card vault, never by us, and you&apos;ll pick them here. Your choice above is saved now.</p> : null}
      <button className="btn primary" type="submit" disabled={pending}>{pending ? "Saving…" : "Save"}</button>
    </form>
  );
}
