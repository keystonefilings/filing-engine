/**
 * The firm name a visitor types at the home page's Close (or For firms' studio) and finds again at sign-up (merged
 * spec D3, 9.9 "The name stays in the browser", 10A.9.4). It lives only in that tab's sessionStorage, under one key,
 * and reaches the server only as "Firm name" when the visitor submits sign-up.
 *
 * The record is the name as a plain string, or a JSON object { name, color } when a color was chosen in For firms'
 * studio; both are read here, and a write keeps whichever form was there.
 */
export const FIRM_NAME_KEY = "cofile.firmName";

export interface CarriedFirm { name: string; color?: string }

export function readCarriedFirm(): CarriedFirm | null {
  try {
    const raw = sessionStorage.getItem(FIRM_NAME_KEY);
    if (!raw) return null;
    if (raw.startsWith("{")) {
      const v = JSON.parse(raw) as { name?: unknown; color?: unknown };
      const name = typeof v.name === "string" ? v.name : "";
      const color = typeof v.color === "string" && /^#[0-9a-f]{6}$/i.test(v.color) ? v.color : undefined;
      return name || color ? { name, color } : null;
    }
    return { name: raw };
  } catch { return null; }
}

export function writeCarriedName(name: string) {
  try {
    const value = name.trim().slice(0, 60);
    const raw = sessionStorage.getItem(FIRM_NAME_KEY);
    if (raw?.startsWith("{")) {
      const v = JSON.parse(raw) as Record<string, unknown>;
      if (value) v.name = value; else delete v.name;
      sessionStorage.setItem(FIRM_NAME_KEY, JSON.stringify(v));
    } else if (value) sessionStorage.setItem(FIRM_NAME_KEY, value);
    else sessionStorage.removeItem(FIRM_NAME_KEY);
  } catch { /* storage blocked: the plate still works on this page */ }
}
