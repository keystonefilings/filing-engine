import { US_STATES, type Field, type FilingKind, type Group, type Note } from "./intake/forms.ts";

/** V40: the fields of a form an emailed request may fill in, and the check every answer passes. */
type Slot = { name: string; field: Field; group?: Group };

/** Every answerable field of a form; a repeated item's fields are named with its position (N). */
export function slots(kind: FilingKind): Slot[] {
  const out: Slot[] = [];
  const add = (f: Field | Note, prefix: string, group?: Group) => {
    if (f.kind !== "field" || f.type === "signature" || f.type === "pdf") return;
    out.push({ name: f.path ? `${prefix}${f.path}` : prefix.replace(/\.$/, ""), field: f, group });
  };
  for (const s of kind.sections) for (const it of s.items) {
    if (it.kind === "field") add(it, "");
    else if (it.kind === "group") for (const f of it.fields) add(f, `${it.path}.N.`, it);
  }
  return out;
}

export function describe(kind: FilingKind): string {
  return slots(kind).map(({ name, field: f, group }) => {
    const choices = f.type === "yesno" ? ["yes", "no"] : f.type === "checkbox" ? ["on"] : f.options?.map((o) => o.value);
    const fmt = f.type === "date" ? "YYYY-MM-DD" : f.type === "month" ? "YYYY-MM" : f.type === "usState" ? "two-letter state code" : f.type === "zip" ? "5-digit ZIP" : f.type === "ssn" ? "123-45-6789" : f.type === "fein" ? "12-3456789" : f.type === "number" ? "a number" : "";
    return `- ${name}: ${f.label}${group ? ` (one per ${group.itemLabel.toLowerCase()}, N = 0, 1, ...; at most ${group.max})` : ""}${choices?.length ? `; one of: ${choices.map((c) => JSON.stringify(c)).join(", ")}` : ""}${fmt ? `; format ${fmt}` : ""}`;
  }).join("\n");
}

/** Keeps only answers the form accepts. */
export function checkAnswers(kind: FilingKind, raw: { field: string; value: string }[]): Record<string, string> {
  const byName = new Map(slots(kind).map((s) => [s.name, s]));
  const out: Record<string, string> = {};
  for (const { field, value } of raw) {
    const v = String(value ?? "").trim();
    if (!v) continue;
    const m = /^(.*?)\.(\d+)\.(.+)$/.exec(field);
    let slot = byName.get(field);
    if (!slot && m) {
      const s = byName.get(`${m[1]}.N.${m[3]}`);
      if (s && s.group && Number(m[2]) < s.group.max) slot = s;
    }
    if (!slot) continue;
    const f = slot.field;
    const ok = (() => {
      switch (f.type) {
        case "yesno": return v === "yes" || v === "no";
        case "checkbox": return v === "on";
        case "select": case "radio": return !!f.options?.some((o) => o.value === v);
        case "usState": return US_STATES.includes(v);
        case "date": return /^\d{4}-\d{2}-\d{2}$/.test(v);
        case "month": return /^\d{4}-\d{2}$/.test(v);
        case "zip": return /^\d{5}(-\d{4})?$/.test(v);
        case "ssn": return /^\d{3}-?\d{2}-?\d{4}$/.test(v);
        case "fein": return /^\d{2}-?\d{7}$/.test(v);
        case "number": return /^-?\d+(\.\d+)?$/.test(v);
        case "email": return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
        default: return v.length <= (f.maxLength ?? 2000);
      }
    })();
    if (ok) out[field] = v;
  }
  return out;
}

