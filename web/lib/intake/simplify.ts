/**
 * Makes a filing page as short as it can be without dropping anything the state asks for:
 *  - optional questions fold into a "More options" panel that opens only when clicked;
 *  - a section with nothing required folds away whole;
 *  - questions that belong together sit on one line (name and ending, first and last name,
 *    city, state and ZIP);
 *  - an address can be copied from one already entered ("Same as").
 * Folded fields are still in the form, so their defaults are still sent.
 */
import type { Field, FilingKind, Item, Section } from "./forms.ts";

export type Block =
  | { kind: "item"; item: Item }
  | { kind: "row"; fields: Field[] };

export interface SectionPlan {
  section: Section;
  /** Nothing in it is required: shown folded, titled with "(optional)". */
  folded: boolean;
  main: Block[];
  more: Block[];
}

export interface AddressBlock { prefix: string; label: string }

const isRequired = (it: Item): boolean =>
  it.kind === "field" ? it.required === true : it.kind === "group" ? it.min > 0 : false;

/** Paths some other item's showIf looks at: those questions stay visible, they open the others. */
function controllers(kind: FilingKind): Set<string> {
  const out = new Set<string>();
  const add = (c?: { path: string }) => { if (c && !c.path.startsWith(".")) out.add(c.path); };
  for (const s of kind.sections) {
    add(s.showIf);
    for (const it of s.items) {
      add(it.showIf);
      if (it.kind === "group") for (const f of it.fields) add(f.showIf);
    }
  }
  return out;
}

const addressPart = (p: string) => /\.(street1|street2|city|state|zip)$/.exec(p)?.[1];
const addressPrefix = (p: string) => p.replace(/\.(street1|street2|city|state|zip)$/, "");

/** Fields that read best side by side. */
function pairs(a: Field, b: Field): boolean {
  if (a.showIf?.path !== b.showIf?.path) return false;
  const pa = a.path, pb = b.path;
  if (pa.endsWith(".baseName") && pb.endsWith(".designator")) return true;
  if (pa.endsWith("firstName") && pb.endsWith("lastName")) return true;
  if (pa.endsWith(".city") && pb.endsWith(".state") && addressPrefix(pa) === addressPrefix(pb)) return true;
  if (pa.endsWith(".state") && pb.endsWith(".zip") && addressPrefix(pa) === addressPrefix(pb)) return true;
  return false;
}

function toBlocks(items: Item[]): Block[] {
  const out: Block[] = [];
  for (const it of items) {
    const last = out[out.length - 1];
    if (it.kind === "field") {
      const prev = last?.kind === "row" ? last.fields[last.fields.length - 1] : last?.kind === "item" && last.item.kind === "field" ? last.item : undefined;
      if (prev && pairs(prev, it)) {
        if (last!.kind === "row") last!.fields.push(it);
        else out[out.length - 1] = { kind: "row", fields: [prev, it] };
        continue;
      }
    }
    out.push({ kind: "item", item: it });
  }
  return out;
}

export function planSections(kind: FilingKind): SectionPlan[] {
  const ctrl = controllers(kind);
  return kind.sections.map((section) => {
    const anyRequired = section.items.some(isRequired);
    if (!anyRequired) return { section, folded: true, main: toBlocks(section.items), more: [] };
    // Address parts stay with their address; a question that opens others stays out; notes stay put.
    const requiredAddress = new Set(section.items.filter((i): i is Field => i.kind === "field" && i.required === true && !!addressPart(i.path)).map((i) => addressPrefix(i.path)));
    const stays = (it: Item) =>
      isRequired(it) || it.kind === "note" || (it.kind === "field" && (ctrl.has(it.path) || (addressPart(it.path) && requiredAddress.has(addressPrefix(it.path))) || it.showIf));
    const main = section.items.filter(stays);
    const more = section.items.filter((i) => !stays(i));
    // Folding one question saves nothing.
    if (more.length < 2) return { section, folded: false, main: toBlocks(section.items), more: [] };
    return { section, folded: false, main: toBlocks(main), more: toBlocks(more) };
  });
}

/** Every address on the form, in order, with a name to show on its "Same as" button. */
export function addressBlocks(kind: FilingKind): AddressBlock[] {
  const out: AddressBlock[] = [];
  for (const s of kind.sections) for (const it of s.items) {
    if (it.kind !== "field" || !it.path.endsWith(".street1")) continue;
    const named = it.label.replace(/:\s*street address$/i, "").trim();
    out.push({ prefix: addressPrefix(it.path), label: named && named.toLowerCase() !== "street address" ? named : s.title.replace(/\s*\(optional\)$/i, "") });
  }
  return out;
}

export const ADDRESS_PARTS = ["street1", "street2", "city", "state", "zip"] as const;
