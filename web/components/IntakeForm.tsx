"use client";

import { useEffect, useMemo, useRef, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { US_STATES, type Field, type FilingKind, type Group, type Item, type Note } from "@/lib/intake/forms";
import { AUTH_PREFIX, visibility, type Raw } from "@/lib/intake/build";
import { NEW_SIGNATURE } from "@/lib/intake/signature-field";
import { ADDRESS_PARTS, addressBlocks, planSections, type Block } from "@/lib/intake/simplify";
import { SignaturePad } from "./SignaturePad";
import { FirmRule } from "./ui/Sheet";

export type IntakeResult =
  | { ok: true; redirectTo?: string; message?: string; title?: string }
  | { ok: false; error?: string; issues: { path: string; message: string }[] };

interface Props {
  kind: FilingKind;
  nonce: string;
  action: (fd: FormData) => Promise<IntakeResult>;
  submitLabel?: string;
  /** Shown above the submit button. */
  footnote?: React.ReactNode;
  /** The page shows the fee note under its summary (client pages, merged spec 10B.24), so the form leaves it out. */
  feeNoteAbove?: boolean;
  /** The company's saved signatures, for a form that is signed. */
  signatures?: { id: string; signerName: string; createdAt: string }[];
  /** The consent a signer accepts when saving a new signature (from the engine). */
  consentText?: string;
  /** Answers filled in from the start (form path -> value), e.g. the firm's own contact details. */
  prefill?: Record<string, string>;
  /** Who "the filing company" in the authorizations is, e.g. "Best Accounting, filing through CoFile". */
  filerName?: string;
  /** On a client's own page (a public firm page or a client link), the firm's name; unset on the firm's portal. */
  forClient?: string;
}

/**
 * Starting values. A prefill names repeated items by position ("formation.members.1.name"); items
 * get form ids from one counter shared by every group, so positions are mapped to ids here, and a
 * group gets as many items as the prefill has.
 */
function initialState(kind: FilingKind, prefill: Record<string, string> = {}): { values: Raw; groups: Record<string, number[]>; next: number; prefill: Record<string, string> } {
  const values: Raw = {};
  const groups: Record<string, number[]> = {};
  const mapped: Record<string, string> = { ...prefill };
  let next = 0;
  const defaults = (fields: (Field | Note)[], prefix: string) => {
    for (const f of fields) if (f.kind === "field" && f.defaultValue !== undefined) values[f.path ? `${prefix}.${f.path}` : prefix] = f.defaultValue;
  };
  for (const s of kind.sections) for (const it of s.items) {
    if (it.kind === "field" && it.defaultValue !== undefined) values[it.path] = it.defaultValue;
    if (it.kind === "group") {
      const re = new RegExp(`^${it.path.replace(/\./g, "\\.")}\\.(\\d+)(\\..*)?$`);
      const positions = [...new Set(Object.keys(prefill).map((k) => re.exec(k)?.[1]).filter((x): x is string => x !== undefined).map(Number))].sort((a, b) => a - b).slice(0, it.max);
      const n = Math.max(it.min, it.min === 0 ? 0 : 1, positions.length);
      groups[it.path] = Array.from({ length: n }, () => next++);
      for (const i of groups[it.path]) defaults(it.fields, `${it.path}.${i}`);
      for (const k of Object.keys(prefill)) {
        const m = re.exec(k);
        if (!m) continue;
        delete mapped[k];
        const at = positions.indexOf(Number(m[1]));
        if (at >= 0) mapped[`${it.path}.${groups[it.path][at]}${m[2] ?? ""}`] = prefill[k]!;
      }
    }
  }
  for (const [k, v] of Object.entries(mapped)) if (v) values[k] = v;
  return { values, groups, next, prefill: mapped };
}

export function IntakeForm({ kind, nonce, action, submitLabel = "Create the proof", footnote, signatures = [], consentText, prefill, filerName, forClient, feeNoteAbove }: Props) {
  const router = useRouter();
  const init = useMemo(() => initialState(kind, prefill), [kind, prefill]);
  const startValues = init.prefill;
  const [values, setValues] = useState<Raw>(init.values);
  const [groups, setGroups] = useState(init.groups);
  const [counter, setCounter] = useState(init.next);
  const [result, setResult] = useState<IntakeResult | null>(null);
  const [pending, start] = useTransition();
  const vis = useMemo(() => visibility(kind, values), [kind, values]);
  const plan = useMemo(() => planSections(kind), [kind]);
  const addresses = useMemo(() => addressBlocks(kind), [kind]);
  const formRef = useRef<HTMLFormElement>(null);
  const sentRef = useRef<HTMLHeadingElement>(null);
  const errorRef = useRef<HTMLDivElement>(null);
  const sent = !!result?.ok && !result.redirectTo;
  // A client's "Thank you" replaces the form under the firm's Letterhead: back to the top, focus on its title (10B.24.3).
  useEffect(() => {
    if (!sent || !forClient) return;
    window.scrollTo({ top: 0 });
    sentRef.current?.focus({ preventScroll: true });
  }, [sent, forClient]);
  // The error summary takes focus and the page scrolls to it, so the problems are the first thing read (10B.12.2).
  useEffect(() => {
    if (!result || result.ok) return;
    errorRef.current?.focus({ preventScroll: true });
    errorRef.current?.scrollIntoView({ block: "start", behavior: "instant" as ScrollBehavior });
  }, [result]);

  /** Copies an address already entered into another one ("Same as"). */
  const copyAddress = (from: string, to: string) => {
    const form = formRef.current;
    if (!form) return;
    const next: Raw = {};
    for (const part of ADDRESS_PARTS) {
      const src = form.elements.namedItem(`${from}.${part}`) as HTMLInputElement | HTMLSelectElement | null;
      const dst = form.elements.namedItem(`${to}.${part}`) as HTMLInputElement | HTMLSelectElement | null;
      if (!src || !dst) continue;
      dst.value = src.value;
      next[`${to}.${part}`] = src.value;
    }
    setValues((p) => ({ ...p, ...next }));
  };
  const sameAs = (street1Path: string) => {
    const to = street1Path.replace(/\.street1$/, "");
    const i = addresses.findIndex((a) => a.prefix === to);
    const earlier = i > 0 ? addresses.slice(0, i).filter((a) => values[`${a.prefix}.street1`]?.trim()) : [];
    if (!earlier.length) return null;
    return (
      <div className="same-as" key={`same-${to}`}>
        <span className="small muted">Same as</span>
        {earlier.map((a) => <button key={a.prefix} type="button" className="btn small" onClick={() => copyAddress(a.prefix, to)}>{a.label}</button>)}
      </div>
    );
  };

  /**
   * V24: a person (a name with an address next to it: organizer, service of process, responsible
   * party) can be someone already entered, a member included: their name and address are copied.
   */
  const personPrefixes = useMemo(() => new Set(addresses.map((a) => a.prefix.replace(/\.address$/, ""))), [addresses]);
  const copyPerson = (from: string, to: string) => {
    const form = formRef.current;
    if (!form) return;
    const next: Raw = {};
    for (const part of ["name", ...ADDRESS_PARTS.map((p) => `address.${p}`)]) {
      const src = (form.elements.namedItem(`${from}.${part}`) as HTMLInputElement | null)?.value ?? values[`${from}.${part}`];
      const dst = form.elements.namedItem(`${to}.${part}`) as HTMLInputElement | HTMLSelectElement | null;
      if (src === undefined || !dst) continue;
      dst.value = src;
      next[`${to}.${part}`] = src;
    }
    setValues((p) => ({ ...p, ...next }));
  };
  const samePerson = (namePath: string) => {
    const to = namePath.replace(/\.name$/, "");
    const people = Object.entries(values)
      .filter(([k, v]) => k.endsWith(".name") && k !== namePath && typeof v === "string" && v.trim() && !/^the (llc|corporation)$/i.test(v.trim()))
      .map(([k, v]) => ({ prefix: k.replace(/\.name$/, ""), name: String(v).trim() }))
      .filter((p) => !p.prefix.startsWith("contact") && !p.prefix.startsWith("formation.name"));
    const unique = people.filter((p, i) => people.findIndex((o) => o.name === p.name) === i).slice(0, 6);
    if (!unique.length) return null;
    return (
      <div className="same-as" key={`same-person-${to}`}>
        <span className="small muted">Same person as</span>
        {unique.map((p) => <button key={p.prefix} type="button" className="btn small" onClick={() => copyPerson(p.prefix, to)}>{p.name}</button>)}
      </div>
    );
  };

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

  if (sent && forClient) {
    return (
      <div className="intake2-sent" role="status">
        <h1 ref={sentRef} tabIndex={-1} className="client2-title">{result!.title ?? "Thank you."}</h1>
        <div className="intake2-sent-rule"><FirmRule draw /></div>
        <p className="client2-summary">{result!.message}</p>
      </div>
    );
  }
  if (result?.ok && !result.redirectTo) {
    return <div className="notice ok"><strong>{result.title ?? "Thank you."}</strong> {result.message}</div>;
  }

  const renderField = (f: Field, name: string, shown: boolean) => {
    const id = `f-${name.replace(/[^a-zA-Z0-9]/g, "-")}`;
    const value = values[name] ?? "";
    const issue = fieldIssues.get(name);
    // Decision 38: an answer the form filled in (the firm's saved agent) is marked until someone changes it.
    const filled = startValues[name] !== undefined && (values[name] ?? startValues[name]) === startValues[name];
    const common = { id, name, disabled: !shown, "aria-required": f.required === true ? true : undefined, "aria-invalid": issue ? true : undefined, "aria-describedby": f.help || issue ? `${id}-help` : undefined, "data-filled": filled ? "" : undefined };
    const label = <>{f.label}{f.required === true ? <span className="req" aria-hidden>*</span> : null}</>;
    let control: React.ReactNode;
    switch (f.type) {
      case "textarea":
        control = <textarea {...common} defaultValue={startValues[name] ?? f.defaultValue} maxLength={f.maxLength} />;
        break;
      case "select":
      case "usState": {
        const options = f.type === "usState" ? US_STATES.map((s) => ({ value: s, label: s })) : f.options ?? [];
        control = (
          <select {...common} defaultValue={startValues[name] ?? f.defaultValue ?? ""}>
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
          <div className="field" key={name} hidden={!shown} role="radiogroup" aria-required={f.required === true ? true : undefined} aria-labelledby={`${id}-label`}>
            <span className="label" id={`${id}-label`}>{label}</span>
            <div className={`choices${f.type === "yesno" ? " inline" : ""}`}>
              {options.map((o) => (
                <label key={o.value} className="choice">
                  <input type="radio" name={name} value={o.value} disabled={!shown} defaultChecked={(startValues[name] ?? f.defaultValue) === o.value} />
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
              It goes on the state form only after this filing is approved, never on a preview. {forClient ? "Only the signer named above may draw it." : "Only the signer named above may draw it; if they aren't with you, send them a client link so they sign it themselves."}
            </p>
            {choice === NEW_SIGNATURE.choice && shown ? (
              <div style={{ marginTop: 10 }}>
                <SignaturePad name={NEW_SIGNATURE.image} label={signer ? `Signature pad: ${signer} draws their signature here with a mouse, finger or stylus.` : "Signature pad: the signer draws their signature here with a mouse, finger or stylus."} />
                <label className="choice consent" style={{ marginTop: 10 }}>
                  <input type="checkbox" name={NEW_SIGNATURE.consent} />
                  <span>{consentText ?? "I adopt this image as my signature for this company's New York filings, used only on approved filings."}</span>
                </label>
              </div>
            ) : null}
          </div>
        );
      }
      case "pdf":
        return (
          <div className="field" key={name} hidden={!shown}>
            <label htmlFor={id}>{label}</label>
            <input {...common} aria-describedby={`${id}-help`} type="file" accept="application/pdf,.pdf" />
            <p className="help" id={`${id}-help`}>
              {issue ? <span style={{ color: "var(--bad)" }}>{issue}. </span> : null}
              {f.help ? `${f.help} ` : ""}A PDF of 10 MB or less, without a password.
            </p>
          </div>
        );
      case "checkbox":
        return (
          <div className="field" key={name} hidden={!shown}>
            <label className="choice"><input type="checkbox" {...common} defaultChecked={(startValues[name] ?? f.defaultValue) === "on"} /><span>{label}</span></label>
            {f.help || issue ? <p className="help" id={`${id}-help`}>{issue ? <span style={{ color: "var(--bad)" }}>{issue}. </span> : null}{f.help}</p> : null}
          </div>
        );
      default: {
        const type = f.type === "email" ? "email" : f.type === "tel" ? "tel" : f.type === "number" ? "number" : f.type === "date" ? "date" : f.type === "month" ? "month" : "text";
        const numeric = f.type === "zip" || f.type === "ssn" || f.type === "fein";
        control = (
          <input {...common} type={type} defaultValue={startValues[name] ?? f.defaultValue} maxLength={f.maxLength} min={f.min} max={f.max} step={f.integer ? 1 : undefined} placeholder={f.placeholder}
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
    const shown = vis.top.has(it.path);
    const field = renderField(it, it.path, shown);
    const personName = it.path.endsWith(".name") && personPrefixes.has(it.path.replace(/\.name$/, ""));
    const street = it.path.endsWith(".street1");
    // Always the same wrapper, with or without the "Same as" buttons: if the wrapper came and went
    // as names were typed elsewhere, React would remount the input and drop what was typed in it.
    if (personName || street) {
      const copy = shown ? (personName ? samePerson(it.path) : sameAs(it.path)) : null;
      return <div key={it.path} hidden={!shown}>{copy}{field}</div>;
    }
    return field;
  };

  const renderBlock = (b: Block, k: number) => {
    if (b.kind === "item") return renderItem(b.item, k);
    const shown = b.fields.some((f) => vis.top.has(f.path));
    const first = b.fields[0];
    const copy = first.path.endsWith(".street1") && shown ? sameAs(first.path) : null;
    return (
      <div key={`row-${first.path}`} hidden={!shown}>
        {copy}
        <div className={`field-row n${b.fields.length}`}>{b.fields.map((f, i) => renderItem(f, i))}</div>
      </div>
    );
  };

  return (
    <form ref={formRef} onSubmit={onSubmit} onChange={onChange} noValidate>
      <input type="hidden" name="_nonce" value={nonce} />
      {result && !result.ok ? (
        <div ref={errorRef} tabIndex={-1} className="notice bad" role="alert">
          <strong>{result.error ?? "Please fix these and submit again."}</strong>
          {result.issues.length ? <ul className="issues">{result.issues.slice(0, 20).map((i, n) => {
            // Each problem links to its field when the form has one (10B.12.2).
            const target = i.path ? `f-${i.path.replace(/[^a-zA-Z0-9]/g, "-")}` : "";
            return <li key={n}>{target && typeof document !== "undefined" && document.getElementById(target) ? <a href={`#${target}`}>{i.message}</a> : i.message}</li>;
          })}</ul> : null}
        </div>
      ) : null}
      <p className="help" style={{ marginTop: 0 }}>Fields marked * are required.</p>
      {plan.map(({ section: s, folded, main, more }) => {
        // A folded section opens by itself when it already holds an answer or a problem.
        const touched = s.items.some((it) => Object.keys(values).some((k) => "path" in it && it.path && k.startsWith(it.path) && values[k] && values[k] !== (it.kind === "field" ? it.defaultValue : undefined)))
          || [...fieldIssues.keys()].some((k) => s.items.some((it) => "path" in it && it.path && k.startsWith(it.path)));
        const body = (
          <>
            {s.help ? <p className="help" style={{ marginTop: 0, marginBottom: 12 }}>{s.help}</p> : null}
            {main.map(renderBlock)}
            {more.length ? (
              <details className="more" open={touched || undefined}>
                <summary>More options <span className="muted">(optional)</span></summary>
                {more.map(renderBlock)}
              </details>
            ) : null}
          </>
        );
        if (folded) {
          const title = /\(optional\)$/i.test(s.title) ? s.title : `${s.title} (optional)`;
          return (
            <details key={s.title} className="fold" hidden={!vis.holds(s.showIf)} open={touched || undefined}>
              <summary>{title}</summary>
              <fieldset>{body}</fieldset>
            </details>
          );
        }
        return (
          <fieldset key={s.title} hidden={!vis.holds(s.showIf)}>
            <legend>{s.title}</legend>
            {body}
          </fieldset>
        );
      })}
      <fieldset>
        <legend>Authorizations</legend>
        <p className="help" style={{ marginTop: 0 }}>{forClient
          ? <>The state form asks for these. Check a box only if the statement is true for you; if a statement names someone else, ask {forClient} before you send this.</>
          : <>The state form asks for these. Each statement is made by the person who checks its box, so a statement that begins &quot;I am&quot; should be checked by the person named; if that&apos;s your client, send them a client link instead.</>}{filerName ? <> Here, &quot;the filing company&quot; means {filerName}.</> : null} Each one is shown again on the proof before anything is filed.</p>
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
        {kind.feeNote && !feeNoteAbove ? <span className="small muted">{kind.feeNote}</span> : null}
      </div>
      {kind.feeAside ? <p className="small muted">{kind.feeAside}</p> : null}
    </form>
  );
}
