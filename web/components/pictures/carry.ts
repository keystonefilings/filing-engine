import { FIRM_NAME_KEY, readCarriedFirm, writeCarriedName } from "@/lib/firm-name-carry";

/**
 * The pictures' side of the carried firm name (merged spec 9.9, 10A.2.2): the shared record in lib/firm-name-carry.ts
 * (sessionStorage "cofile.firmName", plain text or { name, color }), which sign-up reads. This adds only the in-tab
 * signal that keeps the Close's plate, For firms' studio and its closing plate in step, and the studio's color.
 */
export const FIRM_NAME_EVENT = "cofile:firmname";
export const FIRM_NAME_MAX = 60;

export const readName = (): string => readCarriedFirm()?.name ?? "";
export const readColor = (): string => readCarriedFirm()?.color ?? "";

export function writeName(name: string): void {
  writeCarriedName(name);
}

/** The studio's color joins the name in the record's object form, which lib/firm-name-carry.ts already reads. */
export function writeColor(color: string): void {
  if (!/^#[0-9a-f]{6}$/i.test(color)) return;
  try {
    const current = readCarriedFirm();
    sessionStorage.setItem(FIRM_NAME_KEY, JSON.stringify({ ...(current?.name ? { name: current.name } : {}), color }));
  } catch { /* storage blocked: the studio still works on this page */ }
}

/** Tell this tab's other plates and previews that the name changed. */
export function announceName(name: string): void {
  window.dispatchEvent(new CustomEvent(FIRM_NAME_EVENT, { detail: name }));
}
