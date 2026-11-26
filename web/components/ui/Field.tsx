import "@/styles/components/field.css";
import type { InputHTMLAttributes, ReactNode, SelectHTMLAttributes, TextareaHTMLAttributes } from "react";

interface FieldShell {
  id: string;
  label: ReactNode;
  help?: ReactNode;
  error?: string;
  required?: boolean;
  /** Shows "(optional)" after the label, in Graphite. */
  optional?: boolean;
  /** Filled in for the person (from saved answers or a message) until they edit it (11.3, decision 38). */
  filled?: boolean;
}

function Shell({ id, label, help, error, required, optional, children }: FieldShell & { children: ReactNode }) {
  return (
    <div className="field2">
      <label className="field2-label" htmlFor={id}>
        {label}
        {optional ? <span className="opt"> (optional)</span> : null}
        {required ? <span className="req" aria-hidden="true">*</span> : null}
      </label>
      {help ? <p className="field2-help" id={`${id}-help`}>{help}</p> : null}
      {children}
      {error ? <p className="field2-error" id={`${id}-error`}>{error}</p> : null}
    </div>
  );
}

const described = (f: FieldShell) => [f.help && `${f.id}-help`, f.error && `${f.id}-error`].filter(Boolean).join(" ") || undefined;

/** A text field: label above, help between label and field, the error under it (11.3). */
export function TextField(props: FieldShell & Omit<InputHTMLAttributes<HTMLInputElement>, "id">) {
  const { id, label, help, error, required, optional, filled, className, ...rest } = props;
  return (
    <Shell {...{ id, label, help, error, required, optional }}>
      <input id={id} required={required} aria-invalid={error ? true : undefined} aria-describedby={described(props)}
        className={["input2", filled && "is-filled", className].filter(Boolean).join(" ")} {...rest} />
    </Shell>
  );
}

export function SelectField(props: FieldShell & Omit<SelectHTMLAttributes<HTMLSelectElement>, "id"> & { children: ReactNode }) {
  const { id, label, help, error, required, optional, filled, className, children, ...rest } = props;
  return (
    <Shell {...{ id, label, help, error, required, optional }}>
      <select id={id} required={required} aria-invalid={error ? true : undefined} aria-describedby={described(props)}
        className={["select2", filled && "is-filled", className].filter(Boolean).join(" ")} {...rest}>{children}</select>
    </Shell>
  );
}

export function TextArea(props: FieldShell & Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, "id">) {
  const { id, label, help, error, required, optional, filled, className, ...rest } = props;
  return (
    <Shell {...{ id, label, help, error, required, optional }}>
      <textarea id={id} required={required} aria-invalid={error ? true : undefined} aria-describedby={described(props)}
        className={["textarea2", filled && "is-filled", className].filter(Boolean).join(" ")} {...rest} />
    </Shell>
  );
}

/** A checkbox or radio whose whole label is the target, at least 48 px tall. */
export function Check({ type = "checkbox", children, ...rest }: { type?: "checkbox" | "radio"; children: ReactNode } & Omit<InputHTMLAttributes<HTMLInputElement>, "type">) {
  return <label className="check2"><input type={type} {...rest} /><span>{children}</span></label>;
}

/** A choice card: a radio with a real choice behind it (11.3). */
export function ChoiceCard({ title, note, ...rest }: { title: ReactNode; note?: ReactNode } & Omit<InputHTMLAttributes<HTMLInputElement>, "type">) {
  return (
    <label className="choice2">
      <input type="radio" {...rest} />
      <span><span className="choice2-title">{title}</span>{note ? <span className="choice2-note">{note}</span> : null}</span>
    </label>
  );
}

/** A folded optional section: native details/summary, so it works without scripts (11.3). */
export function Fold({ title, open, children }: { title: string; open?: boolean; children: ReactNode }) {
  const m = /^(.*?)\s*\((optional)\)$/.exec(title);
  return (
    <details className="fold2" open={open}>
      <summary><span className="fold2-title">{m ? <>{m[1]} <span className="opt">(optional)</span></> : title}</span></summary>
      <div className="form2" style={{ maxWidth: "none" }}>{children}</div>
    </details>
  );
}

/** Paired fields on one row: n2 at 2:1, n3 at 2:1:1; they stack on phones (11.3). */
export function FieldRow({ n, children }: { n: 2 | 3; children: ReactNode }) {
  return <div className={`field2-row n${n}`}>{children}</div>;
}
