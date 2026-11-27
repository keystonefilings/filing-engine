"use client";

import { useKeptForm } from "./useKeptForm";
import { useState, type SelectHTMLAttributes } from "react";
import type { SetupState } from "@/app/p/[slug]/(portal)/setup/actions";
import type { PaymentMethodRef, PaymentRouting } from "@/lib/engine";
import { Notice } from "@/components/ui/Sheet";
import { describedBy, Field, FormSlip, Opt, SaveButton as Save, Text } from "@/components/desk/SetupFields";

type Action = (prev: SetupState, fd: FormData) => Promise<SetupState>;

/** The form's sentence at its top (10B.1.7): a Problem slip, announced. */
function Top({ s }: { s: SetupState }) {
  return <FormSlip s={s} />;
}

export interface DetailsValues { name: string; companyType?: string; contactName?: string; contactEmail?: string; phone?: string; website?: string; copyEmail?: string; services?: { id: string; title: string; state: string; offered: boolean }[] }

const STATE_NAMES: Record<string, string> = { NY: "New York", NJ: "New Jersey", FL: "Florida", MO: "Missouri" };

/**
 * Your firm, Step 1 of 3 (merged spec 10B.6): one white sheet, the contact fields in two columns from 600 px, then the
 * services the firm offers, a two-column set of state groups with the desk's checkboxes; "Save and continue" in Brass.
 */
export function DetailsForm({ action, v }: { action: Action; v: DetailsValues }) {
  const { state: s, pending, formProps } = useKeptForm(action, null);
  const issue = (k: string) => s?.issues?.[k];
  const states = v.services?.length ? Array.from(new Set(v.services.map((k) => k.state))) : [];
  return (
    <form {...formProps} className="ds2-sheet ds2-form">
      <Top s={s} />
      <Text id="d-name" label="Firm name" name="name" type="text" defaultValue={v.name} required autoComplete="organization" error={issue("name")} />
      <Field id="d-type" label="Kind of firm">
        <select id="d-type" name="companyType" className="select2" defaultValue={v.companyType ?? "other"}>
          <option value="cpa">CPA or accounting firm</option><option value="payroll">Payroll company</option>
          <option value="cfo">Fractional CFO firm</option><option value="title">Title company</option><option value="other">Something else</option>
        </select>
      </Field>
      <div className="ds2-pair">
        <Text id="d-cn" label="Main contact" name="contactName" type="text" defaultValue={v.contactName} autoComplete="name" />
        <Text id="d-ph" label="Phone" name="phone" type="tel" defaultValue={v.phone} autoComplete="tel" />
      </div>
      <div className="ds2-pair">
        <Text id="d-ce" label="Contact email" name="contactEmail" type="email" defaultValue={v.contactEmail} autoComplete="email" error={issue("contactEmail")} />
        <Text id="d-web" label="Website" name="website" type="url" defaultValue={v.website} placeholder="https://" autoComplete="url" error={issue("website")} />
      </div>
      <Text id="d-copy" label={<Opt>Email for the state&apos;s copies</Opt>} name="copyEmail" type="email" defaultValue={v.copyEmail} error={issue("copyEmail")}
        help="When we file using our own New York account, the state emails the filed documents to us and sends a copy to this address. Leave it empty to use your contact email." />
      {states.length ? (
        <fieldset className="ds2-services" aria-describedby={describedBy("d-services", true, issue("services"))}>
          <legend className="ds2-legend">Services you offer your clients</legend>
          <input type="hidden" name="servicesShown" value="1" />
          <p className="field2-help" id="d-services-help">Only these show on your filing desk and your filing pages for clients. You can change them any time.</p>
          <div className="ds2-states">
            {states.map((st) => (
              <div key={st} className="ds2-state" role="group" aria-labelledby={`d-st-${st}`}>
                <p className="ds2-state-name" id={`d-st-${st}`}>{st === "US" ? "Federal" : STATE_NAMES[st] ?? st}</p>
                {v.services!.filter((k) => k.state === st).map((k) => (
                  <label key={k.id} className="check2"><input type="checkbox" name="services" value={k.id} defaultChecked={k.offered} /><span>{k.title}</span></label>
                ))}
              </div>
            ))}
          </div>
          {issue("services") ? <p className="field2-error" id="d-services-error">{issue("services")}</p> : null}
        </fieldset>
      ) : null}
      <p className="ds2-actions"><Save pending={pending} brass busy="Saving…">Save and continue</Save></p>
    </form>
  );
}

function CardSelect({ id, name, value, cards, ...rest }: { id: string; name: string; value?: string; cards: PaymentMethodRef[] } & Omit<SelectHTMLAttributes<HTMLSelectElement>, "id" | "name" | "value">) {
  const none = cards.length === 0;
  return (
    <select id={id} name={name} className="select2" defaultValue={value ?? ""} disabled={none} {...rest}>
      <option value="">{none ? "No cards yet" : "Choose a card"}</option>
      {cards.map((c) => <option key={c.id} value={c.id}>{c.label}{c.last4 ? ` ending ${c.last4}` : ""}</option>)}
    </select>
  );
}

/**
 * Payment, "How state fees are paid" (merged spec 10B.8): the two ways as choice cards, the main and backup cards, a card
 * per filing type when chosen. Its "Save" is the page's Brass once a card is saved; before that, "Save card" is.
 */
export function PaymentsForm({ action, methods, routing, kinds }: { action: Action; methods: PaymentMethodRef[]; routing?: PaymentRouting; kinds: { id: string; title: string }[] }) {
  const { state: s, pending, formProps } = useKeptForm(action, null);
  const [mode, setMode] = useState<"single" | "per_filing">(routing?.mode ?? "single");
  const cards = methods.filter((m) => m.purpose === "state_fees");
  const none = cards.length === 0;
  return (
    <form {...formProps} className="ds2-sheet ds2-form ds2-fees">
      <Top s={s} />
      <fieldset className="ds2-group">
        <legend className="ds2-legend">How state fees are paid</legend>
        <div className="ds2-choices">
          <label className="choice2"><input type="radio" name="mode" value="single" checked={mode === "single"} onChange={() => setMode("single")} /><span><span className="choice2-title">One card for every filing</span></span></label>
          <label className="choice2"><input type="radio" name="mode" value="per_filing" checked={mode === "per_filing"} onChange={() => setMode("per_filing")} /><span><strong>A card for each type of filing</strong>, with one main card for the rest</span></label>
        </div>
      </fieldset>
      <div className="ds2-pair is-end">
        <Field id="pf-main" label="Main card"><CardSelect id="pf-main" name="defaultMethodId" value={routing?.defaultMethodId} cards={cards} /></Field>
        <Field id="pf-backup" label="Backup card, used if the main one is declined"><CardSelect id="pf-backup" name="fallbackMethodId" value={routing?.fallbackMethodId} cards={cards} /></Field>
      </div>
      {mode === "per_filing" ? (
        <fieldset className="ds2-group">
          <legend className="ds2-legend is-small">Card for each filing</legend>
          <div className="ds2-kinds">
            {kinds.map((k) => (
              <Field key={k.id} id={`pf-${k.id}`} label={k.title}><CardSelect id={`pf-${k.id}`} name={`kind.${k.id}`} value={routing?.byFilingKind?.[k.id]} cards={cards} /></Field>
            ))}
          </div>
        </fieldset>
      ) : null}
      {none ? <Notice>No cards saved yet. Add a card, then choose which card pays for what. You can save how fees are paid now and pick cards later.</Notice> : null}
      <p className="ds2-actions"><Save pending={pending} brass={!none} busy="Saving…">Save</Save></p>
    </form>
  );
}
