/**
 * V27: what the filing page asks for when a filing is waiting for information. Single values and
 * addresses get a field each; people, members and owners need the full form (startOver).
 */
export type MissingInput =
  | { kind: "text" | "date" | "number" | "textarea"; path: string; label: string; options?: undefined }
  | { kind: "select"; path: string; label: string; options: { value: string; label: string }[] }
  | { kind: "address"; path: string; label: string }
  | { kind: "startOver"; path: string; label: string };

const STATES = ["NY", "NJ", "FL", "MO"].map((s) => ({ value: s, label: s }));

type Spec = { kind: "text" | "date" | "number" | "textarea" | "address" } | { kind: "select"; options: { value: string; label: string }[] };

const KNOWN: Record<string, Spec> = {
  "formation.name.baseName": { kind: "text" },
  "formation.county": { kind: "text" },
  "formation.stockShares": { kind: "number" },
  "formation.managementStructure": { kind: "select", options: [{ value: "member_managed", label: "Its members" }, { value: "manager_managed", label: "One or more managers" }] },
  "formation.purpose": { kind: "textarea" },
  "formation.naicsCode": { kind: "text" },
  "formation.mainBusinessAddress": { kind: "address" },
  "payroll.legalName": { kind: "text" },
  "payroll.tradeName": { kind: "text" },
  "payroll.businessAddress": { kind: "address" },
  "payroll.mailingAddress": { kind: "address" },
  "payroll.fein": { kind: "text" },
  "payroll.dateFirstOperations": { kind: "date" },
  "payroll.beginDate": { kind: "date" },
  "payroll.naics": { kind: "text" },
  "ein.formationState": { kind: "select", options: STATES },
  "ein.tradeName": { kind: "text" },
  "standing.entityName": { kind: "text" },
};

export function missingInputs(missing: { path: string; label: string }[]): MissingInput[] {
  return missing.map((m) => ({ path: m.path, label: m.label, ...(KNOWN[m.path] ?? { kind: "startOver" }) }) as MissingInput);
}

/** The answers as the partial request the engine merges ("formation.county" -> { formation: { county } }). */
export function partialFrom(fd: FormData, inputs: MissingInput[]): Record<string, unknown> {
  const out: Record<string, unknown> = {};
  const set = (path: string, v: unknown) => {
    const keys = path.split(".");
    let o = out;
    for (const k of keys.slice(0, -1)) o = (o[k] ??= {}) as Record<string, unknown>;
    o[keys[keys.length - 1]!] = v;
  };
  for (const i of inputs) {
    if (i.kind === "startOver") continue;
    if (i.kind === "address") {
      const a = Object.fromEntries(["street1", "street2", "city", "state", "zip"].map((k) => [k, String(fd.get(`${i.path}.${k}`) ?? "").trim()]).filter(([, v]) => v));
      if (Object.keys(a).length) set(i.path, a);
      continue;
    }
    const v = String(fd.get(i.path) ?? "").trim();
    if (!v) continue;
    set(i.path, i.kind === "number" ? Number(v) : v);
  }
  return out;
}
