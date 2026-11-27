import type { InputHTMLAttributes, ReactNode } from "react";
import { Notice } from "@/components/ui/Sheet";
import "@/styles/components/field.css";

/**
 * The fields on Setup's own pages (merged spec 10B.6, 10B.9, 11.3): the label above, help between the label and the
 * field, the message under it with the bar glyph, the field 52 px on the desk. The product marks no field with "*", so
 * these never add one.
 */
export const describedBy = (id: string, help?: unknown, error?: string) => [help ? `${id}-help` : "", error ? `${id}-error` : ""].filter(Boolean).join(" ") || undefined;

export function Field({ id, label, help, error, children }: { id: string; label: ReactNode; help?: ReactNode; error?: string; children: ReactNode }) {
  return (
    <div className="field2">
      <label className="field2-label" htmlFor={id}>{label}</label>
      {help ? <p className="field2-help" id={`${id}-help`}>{help}</p> : null}
      {children}
      {error ? <p className="field2-error" id={`${id}-error`}>{error}</p> : null}
    </div>
  );
}

export function Text({ id, label, help, error, ...rest }: { id: string; label: ReactNode; help?: ReactNode; error?: string } & Omit<InputHTMLAttributes<HTMLInputElement>, "id">) {
  return (
    <Field id={id} label={label} help={help} error={error}>
      <input id={id} className="input2" aria-invalid={error ? true : undefined} aria-describedby={describedBy(id, help, error)} {...rest} />
    </Field>
  );
}

/** "(optional)" in Graphite after a label the product already words that way. */
export const Opt = ({ children }: { children: ReactNode }) => <>{children} <span className="opt">(optional)</span></>;

/** A form's sentence (10B.1.7): its problem as a Problem slip, announced; its success as a Done slip. */
export function FormSlip({ s }: { s: { error?: string; message?: string } | null | undefined }) {
  return s?.error ? <Notice tone="problem" role="alert">{s.error}</Notice> : s?.message ? <Notice tone="done" role="status">{s.message}</Notice> : null;
}

/** A form's save while it waits: same size, the product's pending word, never a spinner (10B.1.4). Brass is the view's one main action; Ink otherwise. */
export function SaveButton({ pending, brass, busy, children }: { pending: boolean; brass?: boolean; busy: string; children: string }) {
  return <button className={brass ? "btn primary is-main ds2-save" : "btn primary ds2-save"} type="submit" disabled={pending} aria-busy={pending || undefined}>{pending ? busy : children}</button>;
}
