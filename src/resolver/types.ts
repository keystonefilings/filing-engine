export type FieldKind =
  | "text" | "email" | "tel" | "number" | "date" | "password" | "textarea"
  | "select" | "radio" | "checkbox" | "file" | "button" | "hidden" | "other";

export interface FieldOption { value: string; label: string; ref?: string }

/** One live field as read from the page in this run. `ref` is only valid for this page load. */
export interface FieldDescriptor {
  ref: string;
  label: string;
  labelSource: string;
  kind: FieldKind;
  name?: string;
  required: boolean;
  requiredSource?: string;
  options?: FieldOption[];
  disabled: boolean;
  visible: boolean;
  checked?: boolean;
  value?: string;
}

export interface PriceItem { label: string; amountUsd: number }

export interface PageInventory {
  url: string;
  title: string;
  headings: string[];
  fields: FieldDescriptor[];
  prices: PriceItem[];
}

/** What drift is measured against: structure only, nothing that is per-run or cosmetic. */
export interface SnapshotField {
  label: string;
  kind: FieldKind;
  required: boolean;
  options?: string[];
}

export interface PageSnapshot {
  site: string;
  screenKey: string;
  fields: SnapshotField[];
  prices: PriceItem[];
  takenAt: string;
  fingerprint: string;
}

/** Adapter-declared meaning of a field on a screen. Labels are the wording seen on the walk. */
export interface FieldIntent {
  key: string;
  labels: string[];
  kinds?: FieldKind[];
  required: boolean;
  note?: string;
}

export interface ScreenIntents {
  screenKey: string;
  title: string;
  intents: FieldIntent[];
  /** Labels of fields on this screen we know about and deliberately leave alone (pre-checked boxes etc.). */
  knownUnused?: string[];
  /**
   * Label patterns (regex source) for fields that differ on every run by design, such as
   * one checkbox per search result. They are left out of the drift snapshot and of the
   * unmatched-field list; everything else on the screen is still checked.
   */
  dynamicFields?: string[];
}

export function normalizeLabel(s: string): string {
  return s
    .toLowerCase()
    .replace(/\(required\)|\(optional\)|\*/g, " ")
    .replace(/[^a-z0-9$.% ]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

export const TEXT_LIKE: ReadonlySet<FieldKind> = new Set(["text", "email", "tel", "number", "date", "password", "textarea"]);

export function kindsCompatible(want: FieldKind[] | undefined, have: FieldKind): boolean {
  if (!want || want.length === 0) return true;
  if (want.includes(have)) return true;
  return want.some((w) => TEXT_LIKE.has(w)) && TEXT_LIKE.has(have);
}

/** The inventory without the screen's per-run fields (see ScreenIntents.dynamicFields). */
export function structuralInventory(inv: PageInventory, screen: Pick<ScreenIntents, "dynamicFields">): PageInventory {
  const dyn = (screen.dynamicFields ?? []).map((r) => new RegExp(r, "i"));
  if (!dyn.length) return inv;
  return { ...inv, fields: inv.fields.filter((f) => !dyn.some((r) => r.test(f.label))) };
}
