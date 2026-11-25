"use client";

import { useKeptForm } from "./useKeptForm";
import { useState } from "react";
import type { Saved } from "@/app/dashboard/(app)/setup/actions";
import type { PaymentMethodRef, PaymentRouting, PortalDefaultField } from "@/lib/engine";

type Action = (prev: Saved, fd: FormData) => Promise<Saved>;

function Result({ s }: { s: Saved }) {
  if (s?.error) return <p className="notice bad" role="alert">{s.error}</p>;
  if (s?.ok) return <p className="notice ok" role="status">Saved.</p>;
  return null;
}

function CardSelect({ name, value, cards, label }: { name: string; value?: string; cards: PaymentMethodRef[]; label: string }) {
  return (
    <select name={name} defaultValue={value ?? ""} disabled={!cards.length} aria-label={label}>
      <option value="">{cards.length ? "Choose a card" : "No cards yet"}</option>
      {cards.map((c) => <option key={c.id} value={c.id}>{c.label}{c.last4 ? ` ending ${c.last4}` : ""}</option>)}
    </select>
  );
}

export function RoutingForm({ action, methods, routing, kinds }: { action: Action; methods: PaymentMethodRef[]; routing: PaymentRouting; kinds: { id: string; title: string }[] }) {
  const { state: s, pending, formProps } = useKeptForm(action, null);
  const [mode, setMode] = useState(routing.mode);
  const fee = methods.filter((m) => m.purpose === "state_fees");
  const subs = methods.filter((m) => m.purpose === "subscription");
  return (
    <form {...formProps} className="card">
      <Result s={s} />
      <div className="field"><label>Card for your subscription</label><CardSelect name="subscriptionMethodId" value={routing.subscriptionMethodId} cards={subs} label="Subscription card" /></div>
      <fieldset>
        <legend>State fees</legend>
        <div className="choices" style={{ marginBottom: 12 }}>
          <label className="choice"><input type="radio" name="mode" value="single" checked={mode === "single"} onChange={() => setMode("single")} /><span>One card for every filing</span></label>
          <label className="choice"><input type="radio" name="mode" value="per_filing" checked={mode === "per_filing"} onChange={() => setMode("per_filing")} /><span>A card for each type of filing, with a main card for the rest</span></label>
        </div>
        <div className="field-row n2">
          <div className="field"><label>Main card</label><CardSelect name="defaultMethodId" value={routing.defaultMethodId} cards={fee} label="Main card" /></div>
          <div className="field"><label>Backup card</label><CardSelect name="fallbackMethodId" value={routing.fallbackMethodId} cards={fee} label="Backup card" /></div>
        </div>
        {mode === "per_filing" ? kinds.map((k) => (
          <div className="field" key={k.id}><label>{k.title}</label><CardSelect name={`kind.${k.id}`} value={routing.byFilingKind[k.id]} cards={fee} label={k.title} /></div>
        )) : null}
      </fieldset>
      {!methods.length ? <p className="help" style={{ marginBottom: 10 }}>Adding cards opens once the card vault is chosen. Your choices here are saved now.</p> : null}
      <button className="btn primary" type="submit" disabled={pending}>{pending ? "Saving…" : "Save payment settings"}</button>
    </form>
  );
}

export function DefaultsForm({ title, fields, values, action }: { title: string; fields: PortalDefaultField[]; values: Record<string, string | number | boolean>; action: Action }) {
  const { state: s, pending, formProps } = useKeptForm(action, null);
  return (
    <form {...formProps} className="card">
      <strong>{title}</strong>
      <Result s={s} />
      <div style={{ marginTop: 10 }}>
        {fields.map((f) => f.type === "boolean" ? (
          <label key={f.id} className="choice" style={{ marginBottom: 8 }}><input type="checkbox" name={f.id} defaultChecked={values[f.id] === true} /><span>{f.label}{f.help ? <span className="muted small"> · {f.help}</span> : null}</span></label>
        ) : f.type === "select" ? (
          <div className="field" key={f.id}><label htmlFor={`${title}-${f.id}`}>{f.label}</label>
            <select id={`${title}-${f.id}`} name={f.id} defaultValue={String(values[f.id] ?? "")}>
              <option value="">No default</option>
              {f.options?.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
            </select></div>
        ) : (
          <div className="field" key={f.id}><label htmlFor={`${title}-${f.id}`}>{f.label}</label><input id={`${title}-${f.id}`} name={f.id} type="number" defaultValue={values[f.id] as number | undefined} /></div>
        ))}
      </div>
      <button className="btn small" type="submit" disabled={pending}>{pending ? "Saving…" : "Save"}</button>
    </form>
  );
}
