"use client";

import { useKeptForm } from "./useKeptForm";
import { useState } from "react";
import type { Saved } from "@/app/dashboard/(app)/setup/actions";
import type { PaymentMethodRef, PaymentRouting, PortalDefaultField } from "@/lib/engine";
import { Notice } from "./ui/Sheet";

type Action = (prev: Saved, fd: FormData) => Promise<Saved>;

/** Yakov (Nov 26): NJ filing types an enterprise can pay with its NJ account's saved payment method (engine: src/settings/payments.ts). */
export const NJ_PORTAL_PAYMENT_KINDS: { id: string; title: string }[] = [
  { id: "nj-llc", title: "New Jersey LLC formation" },
  { id: "nj-corp", title: "New Jersey corporation formation" },
  { id: "nj-standing", title: "New Jersey standing certificate" },
];

function Result({ s }: { s: Saved }) {
  if (s?.error) return <Notice tone="problem" role="alert">{s.error}</Notice>;
  if (s?.ok) return <Notice tone="done" role="status">Saved.</Notice>;
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

export function RoutingForm({ action, methods, routing, kinds, njLoginConnected }: { action: Action; methods: PaymentMethodRef[]; routing: PaymentRouting; kinds: { id: string; title: string }[]; njLoginConnected?: boolean }) {
  const { state: s, pending, formProps } = useKeptForm(action, null);
  const [mode, setMode] = useState(routing.mode);
  const fee = methods.filter((m) => m.purpose === "state_fees");
  const subs = methods.filter((m) => m.purpose === "subscription");
  return (
    <form {...formProps} className="card dash2-routing">
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
      <fieldset>
        <legend>New Jersey: pay with your NJ account</legend>
        <p className="help" style={{ marginTop: 0 }}>For the filing types you tick, New Jersey&apos;s state fees are paid with the payment method saved in your own NJ Division of Revenue account, instead of a card saved here. The run signs in to that account and picks it at checkout; no card saved here is used or asked for.{njLoginConnected ? "" : " Connect your NJ login under State portal logins first: until then, a filing of a ticked type is stopped before approval."}</p>
        {NJ_PORTAL_PAYMENT_KINDS.map((k) => (
          <label key={k.id} className="choice" style={{ marginBottom: 6 }}><input type="checkbox" name={`njPortal.kind.${k.id}`} defaultChecked={routing.statePortal?.NJ?.kinds.includes(k.id)} /><span>{k.title}</span></label>
        ))}
        <div className="field" style={{ marginTop: 8 }}><label htmlFor="njPortal-method">What&apos;s saved in your NJ account</label>
          <select id="njPortal-method" name="njPortal.method" defaultValue={routing.statePortal?.NJ?.method ?? "stored_card"}>
            <option value="stored_card">A card</option>
            <option value="stored_echeck">A bank account (eCheck)</option>
          </select>
          <p className="help">New Jersey adds its own portal fee: $3.50 by card or $1 by eCheck on a formation, $2 or $1 on a standing certificate. The fee is checked again on New Jersey&apos;s payment page, and the filing stops before paying if it differs.</p>
        </div>
      </fieldset>
      {!methods.length ? <p className="help" style={{ marginBottom: 10 }}>No cards saved yet. Add a card, then choose which card pays for what. You can save these choices now and pick cards later.</p> : null}
      <button className="btn primary" type="submit" disabled={pending}>{pending ? "Saving…" : "Save payment settings"}</button>
    </form>
  );
}

export function DefaultsForm({ title, fields, values, action }: { title: string; fields: PortalDefaultField[]; values: Record<string, string | number | boolean>; action: Action }) {
  const { state: s, pending, formProps } = useKeptForm(action, null);
  return (
    <form {...formProps} className="card dash2-portal-defaults">
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
