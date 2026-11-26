"use client";

import { useKeptForm } from "./useKeptForm";
import { Notice } from "./ui/Sheet";

export type DefaultsState = { ok?: boolean; message?: string; error?: string } | null;
type P = { name: string; title?: string; address?: { street1: string; street2?: string; city: string; state: string; zip: string } } | undefined;

/** V30: who the subscriber names on its filings when a client's firm leaves it to the filing company. */
export function FilingDefaultsForm({ action, v }: { action: (prev: DefaultsState, fd: FormData) => Promise<DefaultsState>; v: { organizer?: P; filer?: P; signer?: P; copyEmail?: string } }) {
  const { state: s, pending, formProps } = useKeptForm(action, null);
  const person = (key: "organizer" | "filer" | "signer", label: string, help: string) => (
    <fieldset className="card dash2-person" key={key}>
      <legend><strong>{label}</strong></legend>
      <p className="help">{help}</p>
      <div className="field-row n2">
        <div className="field"><label htmlFor={`fd-${key}-name`}>Name</label><input id={`fd-${key}-name`} name={`${key}.name`} defaultValue={v[key]?.name} placeholder="Leave empty for none" /></div>
        <div className="field"><label htmlFor={`fd-${key}-title`}>Title (optional)</label><input id={`fd-${key}-title`} name={`${key}.title`} defaultValue={v[key]?.title} /></div>
      </div>
      <div className="field"><label htmlFor={`fd-${key}-s1`}>Street address</label><input id={`fd-${key}-s1`} name={`${key}.street1`} defaultValue={v[key]?.address?.street1} /></div>
      <div className="field-row n3">
        <div className="field"><label htmlFor={`fd-${key}-city`}>City</label><input id={`fd-${key}-city`} name={`${key}.city`} defaultValue={v[key]?.address?.city} /></div>
        <div className="field"><label htmlFor={`fd-${key}-st`}>State</label><input id={`fd-${key}-st`} name={`${key}.state`} defaultValue={v[key]?.address?.state} maxLength={2} /></div>
        <div className="field"><label htmlFor={`fd-${key}-zip`}>ZIP</label><input id={`fd-${key}-zip`} name={`${key}.zip`} defaultValue={v[key]?.address?.zip} /></div>
      </div>
    </fieldset>
  );
  return (
    <form {...formProps} className="stack dash2-people">
      {person("organizer", "Organizer", "Named as organizer (New York) when a client's firm leaves it to you.")}
      {person("filer", "Filer", "Named as filer on New York filings.")}
      {person("signer", "Signer", "Signs where a client's firm hasn't named its own signer.")}
      <div className="field">
        <label htmlFor="fd-copy">Also send the state&apos;s copies to (optional)</label>
        <input id="fd-copy" name="copyEmail" type="email" defaultValue={v.copyEmail} />
        <p className="help">Where a state site has a CC for its emailed copies (New York does), this address goes there when a client&apos;s firm has none of its own.</p>
      </div>
      <button className="btn primary" type="submit" disabled={pending}>{pending ? "Saving…" : "Save"}</button>
      {s?.error ? <Notice tone="problem" role="alert">{s.error}</Notice> : s?.message ? <Notice tone="done" role="status">{s.message}</Notice> : null}
    </form>
  );
}
