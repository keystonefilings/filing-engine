"use client";

import { useMemo, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { US_STATES, type Field, type FilingKind, type Group, type Item, type Note } from "@/lib/intake/forms";
import { AUTH_PREFIX, visibility, type Raw } from "@/lib/intake/build";
import { NEW_SIGNATURE } from "@/lib/intake/signature-field";
import { SignaturePad } from "./SignaturePad";

export type IntakeResult =
  | { ok: true; redirectTo?: string; message?: string }
  | { ok: false; error?: string; issues: { path: string; message: string }[] };

interface Props {
  kind: FilingKind;
  nonce: string;
  action: (fd: FormData) => Promise<IntakeResult>;
  submitLabel?: string;
  /** Shown above the submit button. */
  footnote?: React.ReactNode;
  /** The company's saved signatures, for a form that is signed. */
  signatures?: { id: string; signerName: string; createdAt: string }[];
  /** The consent a signer accepts when saving a new signature (from the engine). */
  consentText?: string;
}

function initialState(kind: FilingKind): { values: Raw; groups: Record<string, number[]>; next: number } {
  const values: Raw = {};
  const groups: Record<string, number[]> = {};
  let next = 0;
  const defaults = (fields: (Field | Note)[], prefix: string) => {
    for (const f of fields) if (f.kind === "field" && f.defaultValue !== undefined) values[f.path ? `${prefix}.${f.path}` : prefix] = f.defaultValue;
  };
  for (const s of kind.sections) for (const it of s.items) {
    if (it.kind === "field" && it.defaultValue !== undefined) values[it.path] = it.defaultValue;
    if (it.kind === "group") {
      const n = Math.max(it.min, it.min === 0 ? 0 : 1);
      groups[it.path] = Array.from({ length: n }, () => next++);
      for (const i of groups[it.path]) defaults(it.fields, `${it.path}.${i}`);
    }
  }
  return { values, groups, next };
}

export function IntakeForm({ kind, nonce, action, submitLabel = "Submit for approval", footnote, signatures = [], consentText }: Props) {
  const router = useRouter();
  const init = useMemo(() => initialState(kind), [kind]);
  const [values, setValues] = useState<Raw>(init.values);
  const [groups, setGroups] = useState(init.groups);
  const [counter, setCounter] = useState(init.next);
  const [result, setResult] = useState<IntakeResult | null>(null);
  const [pending, start] = useTransition();
  const vis = useMemo(() => visibility(kind, values), [kind, values]);

  const fieldIssues = useMemo(() => {
    const m = new Map<string, string>();
    if (result && !result.ok) for (const i of result.issues) if (!m.has(i.path)) m.set(i.path, i.message);
    return m;
  }, [result]);

  const onChange = (e: React.FormEvent<HTMLFormElement>) => {
    const t = e.target as HTMLInputElement;
    if (!t.name) return;
    const v = t.type === "checkbox" ? (t.checked ? "on" : "") : t.value;
    setValues((p) => ({ ...p, [t.name]: v }));
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    start(async () => {
      const r = await action(fd);
      setResult(r);
      if (r.ok && r.redirectTo) router.push(r.redirectTo);
      if (!r.ok) window.scrollTo({ top: 0, behavior: "smooth" });
    });
  };

  const addItem = (g: Group) => {
    const id = counter;
    setCounter(id + 1);
    setGroups((p) => ({ ...p, [g.path]: [...(p[g.path] ?? []), id] }));
    setValues((p) => {
      const n = { ...p };
      for (const f of g.fields) if (f.kind === "field" && f.defaultValue !== undefined) n[f.path ? `${g.path}.${id}.${f.path}` : `${g.path}.${id}`] = f.defaultValue;
      return n;
    });
  };
  const removeItem = (g: Group, id: number) => setGroups((p) => ({ ...p, [g.path]: (p[g.path] ?? []).filter((x) => x !== id) }));

  if (result?.ok && !result.redirectTo) {
    return <div className="notice ok"><strong>Thank you.</strong> {result.message}</div>;
  }

  const renderField = (f: Field, name: string, shown: boolean) => {
    const id = `f-${name.replace(/[^a-zA-Z0-9]/g, "-")}`;
    const value = values[name] ?? "";
    const issue = fieldIssues.get(name);
    const common = { id, name, disabled: !shown, "aria-invalid": issue ? true : undefined, "aria-describedby": f.help || issue ? `${id}-help` : undefined };
    const label = <>{f.label}{f.required === true ? <span className="req" aria-hidden>*</span> : null}</>;
    let control: React.ReactNode;
    switch (f.type) {
      case "textarea":
        control = <textarea {...common} defaultValue={f.defaultValue} maxLength={f.maxLength} />;
        break;
      case "select":
      case "usState": {
        const options = f.type === "usState" ? US_STATES.map((s) => ({ value: s, label: s })) : f.options ?? [];
        control = (
          <select {...common} defaultValue={f.defaultValue ?? ""}>
            {f.defaultValue === undefined || f.type === "usState" ? <option value="">Choose…</option> : null}
            {options.map((o) => <option key={o.value} value={o.value}>{o.label || "(none)"}</option>)}
          </select>
        );
        break;
      }
      case "radio":
      case "yesno": {
        const options = f.type === "yesno" ? [{ value: "yes", label: "Yes" }, { value: "no", label: "No" }] : f.options ?? [];
        return (
          <div className="field" key={name} hidden={!shown} role="radiogroup" aria-labelledby={`${id}-label`}>
            <span className="label" id={`${id}-label`}>{label}</span>
            <div className={`choices${f.type === "yesno" ? " inline" : ""}`}>
              {options.map((o) => (
                <label key={o.value} className="choice">
                  <input type="radio" name={name} value={o.value} disabled={!shown} defaultChecked={f.defaultValue === o.value} />
                  <span>{o.label}</span>
                </label>
              ))}
            </div>
            {f.help || issue ? <p className="help" id={`${id}-help`}>{issue ? <span style={{ color: "var(--bad)" }}>{issue}. </span> : null}{f.help}</p> : null}
          </div>
        );
      }
      case "signature": {
        const choice = value || (signatures.length ? "" : NEW_SIGNATURE.choice);
        const signer = f.signerPath ? values[f.signerPath]?.trim() : "";
        return (
          <div className="field" key={name} hidden={!shown}>
            <label htmlFor={id}>{label}</label>
            <select {...common} value={choice} onChange={(e) => setValues((p) => ({ ...p, [name]: e.target.value }))}>
              {signatures.length ? <option value="">Choose…</option> : null}
              {signatures.map((s) => <option key={s.id} value={s.id}>{s.signerName}, saved {new Date(s.createdAt).toLocaleDateString()}</option>)}
              <option value={NEW_SIGNATURE.choice}>Draw a new signature{signer ? ` for ${signer}` : ""}</option>
            </select>
            <p className="help" id={`${id}-help`}>
              {issue ? <span style={{ color: "var(--bad)" }}>{issue}. </span> : null}
              It goes on the state form only after this filing is approved, never on a preview. It must be the signer named above.
            </p>
            {choice === NEW_SIGNATURE.choice && shown ? (
              <div style={{ marginTop: 10 }}>
                <SignaturePad name={NEW_SIGNATURE.image} label={signer ? `${signer}, sign here` : "Signer, sign here"} />
                <label className="choice consent" style={{ marginTop: 10 }}>
                  <input type="checkbox" name={NEW_SIGNATURE.consent} />
                  <span>{consentText ?? "I adopt this image as my signature for this company's New York filings, used only on approved filings."}</span>
                </label>
              </div>
            ) : null}
          </div>
        );
      }
      case "checkbox":
        return (
          <div className="field" key={name} hidden={!shown}>
            <label className="choice"><input type="checkbox" {...common} defaultChecked={f.defaultValue === "on"} /><span>{label}</span></label>
            {f.help || issue ? <p className="help" id={`${id}-help`}>{issue ? <span style={{ color: "var(--bad)" }}>{issue}. </span> : null}{f.help}</p> : null}
          </div>
        );
      default: {
        const type = f.type === "email" ? "email" : f.type === "tel" ? "tel" : f.type === "number" ? "number" : f.type === "date" ? "date" : f.type === "month" ? "month" : "text";
        const numeric = f.type === "zip" || f.type === "ssn" || f.type === "fein";
        control = (
          <input {...common} type={type} defaultValue={f.defaultValue} maxLength={f.maxLength} min={f.min} max={f.max} placeholder={f.placeholder}
            inputMode={numeric ? "numeric" : undefined} autoComplete={f.type === "ssn" || f.type === "fein" ? "off" : undefined}
            spellCheck={f.type === "ssn" ? false : undefined} />
        );
      }
    }
    return (
      <div className="field" key={name} hidden={!shown}>
        <label htmlFor={id}>{label}</label>
        {control}
        {f.help || issue ? <p className="help" id={`${id}-help`}>{issue ? <span style={{ color: "var(--bad)" }}>{issue}. </span> : null}{f.help}</p> : null}
        {value && f.type === "textarea" && f.maxLength ? <p className="help">{value.length} / {f.maxLength}</p> : null}
      </div>
    );
  };

  const renderGroup = (g: Group) => {
    const shown = vis.holds(g.showIf);
    const ids = groups[g.path] ?? [];
    const issue = fieldIssues.get(g.path);
    return (
      <div key={g.path} hidden={!shown} className="field">
        <span className="label">{g.label}</span>
        {g.help ? <p className="help">{g.help}</p> : null}
        {issue ? <p className="help" style={{ color: "var(--bad)" }}>{issue}</p> : null}
        {ids.map((id, n) => {
          const prefix = `${g.path}.${id}`;
          return (
            <div key={id} className="group-item">
              <div className="item-title">
                <span>{g.itemLabel} {n + 1}</span>
                {ids.length > g.min ? <button type="button" className="btn small" onClick={() => removeItem(g, id)}>Remove</button> : null}
              </div>
              <div className="cols">
                {g.fields.map((gf, k) => gf.kind === "note"
                  ? <p key={k} className="help" hidden={!vis.holds(gf.showIf, prefix)} style={{ gridColumn: "1 / -1" }}>{gf.text}</p>
                  : renderField(gf, gf.path ? `${prefix}.${gf.path}` : prefix, shown && vis.holds(gf.showIf, prefix)))}
              </div>
            </div>
          );
        })}
        {ids.length < g.max ? <button type="button" className="btn small" onClick={() => addItem(g)} disabled={!shown}>Add {g.itemLabel.toLowerCase()}</button> : null}
      </div>
    );
  };

  const renderItem = (it: Item, k: number) => {
    if (it.kind === "note") return <p key={k} className="notice" hidden={!vis.holds(it.showIf)}>{it.text}</p>;
    if (it.kind === "group") return renderGroup(it);
    return renderField(it, it.path, vis.top.has(it.path));
  };

  return (
    <form onSubmit={onSubmit} onChange={onChange} noValidate>
      <input type="hidden" name="_nonce" value={nonce} />
      {result && !result.ok ? (
        <div className="notice bad" role="alert">
          <strong>{result.error ?? "Please fix these and submit again."}</strong>
          {result.issues.length ? <ul className="issues">{result.issues.slice(0, 20).map((i, n) => <li key={n}>{i.message}</li>)}</ul> : null}
        </div>
      ) : null}
      {kind.sections.map((s) => (
        <fieldset key={s.title} hidden={!vis.holds(s.showIf)}>
          <legend>{s.title}</legend>
          {s.help ? <p className="help" style={{ marginTop: 0, marginBottom: 12 }}>{s.help}</p> : null}
          {s.items.map(renderItem)}
        </fieldset>
      ))}
      <fieldset>
        <legend>Authorizations</legend>
        <p className="help" style={{ marginTop: 0 }}>The state form asks for these. Each one is shown again on the approval page before anything is filed.</p>
        {kind.authorizations.map((a) => (
          <label key={a.id} className="auth">
            <input type="checkbox" name={`${AUTH_PREFIX}${a.id}`} />
            <span>{a.text}{fieldIssues.has(`${AUTH_PREFIX}${a.id}`) ? <span style={{ color: "var(--bad)" }}> Please confirm.</span> : null}</span>
          </label>
        ))}
      </fieldset>
      {footnote}
      <div className="row">
        <button className="btn primary" type="submit" disabled={pending}>{pending ? "Sending…" : submitLabel}</button>
        {kind.feeNote ? <span className="small muted">{kind.feeNote}</span> : null}
      </div>
    </form>
  );
}
