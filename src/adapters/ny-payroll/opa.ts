import type { StepContext } from "../types.js";
import type { FieldDescriptor, ScreenIntents } from "../../resolver/types.js";
import { normalizeLabel, TEXT_LIKE } from "../../resolver/types.js";
import type { Address } from "../../domain/filing.js";
import { splitZip, stateName } from "../../domain/usStates.js";
import { NY_ADDRESS_MODAL } from "./intents.js";
import { escapeRe, splitPersonName, whenShown } from "../page-helpers.js";

export { escapeRe, splitPersonName, whenShown };

/**
 * How the NYS-100 interview behaves (Oracle Policy Automation v15, walk of 2026-11-24):
 *  - every screen change shows a "Building/Loading/Saving screen ..." or "Processing" spinner for
 *    3 to 10 seconds; one save hung about 45 seconds, dropped back, and went through on a second click;
 *  - Yes/No questions are styled buttons that reveal more required fields;
 *  - every address needs Validate Address, then a choice in the Address Verification window, then
 *    USE SELECTED ADDRESS ("You are required to validate this address." otherwise);
 *  - errors are shown in place ("This field is required.", the FEIN rule, the residency rule).
 */

export const SAVE_AND_CONTINUE = /^\s*save\s*(&|and)\s*continue\s*$/i;
export const NEXT = /^\s*next\s*$/i;

const BUSY = /\b(?:Building|Loading|Saving) screen\b|^\s*Processing\b/im;

/** The messages the walk saw when a screen refused to move on. */
const KNOWN_ERRORS = [
  /This field is required\./i,
  /You are required to validate this address\./i,
  /Federal Employer Identification Number is required/i,
  /You must have a Federal Employer Identification Number \(EIN\) to file/i,
  /The FEIN field cannot have all of the same numbers[^.\n]*\./i,
  /You selected no to being a US resident and provided an address in the US\./i,
];

/** Waits until no interview spinner is showing (bounded). */
export async function settle(ctx: StepContext, timeoutMs = 60_000): Promise<void> {
  const t0 = Date.now();
  for (;;) {
    const text = await ctx.page.locator("body").innerText().catch(() => "");
    if (!BUSY.test(text)) return;
    if (Date.now() - t0 > timeoutMs) throw new Error(`NYS-100: the interview spinner did not clear in ${Math.round(timeoutMs / 1000)} seconds`);
    await ctx.page.waitForTimeout(250);
  }
}

/** The screen's own heading is showing (the left nav repeats the names, so only headings count). */
export async function onScreen(ctx: StepContext, title: string): Promise<boolean> {
  const rx = new RegExp(`^\\s*${escapeRe(title)}\\s*[*:]?\\s*$`, "i");
  const heads = ctx.page.locator("h1, h2, [role=heading]").filter({ hasText: rx });
  const n = await heads.count();
  for (let i = 0; i < n; i++) if (await heads.nth(i).isVisible().catch(() => false)) return true;
  return false;
}

/** The validation messages showing now. */
export async function pageErrors(ctx: StepContext): Promise<string[]> {
  const text = await ctx.page.locator("body").innerText().catch(() => "");
  const found = new Set<string>();
  for (const rx of KNOWN_ERRORS) for (const m of text.matchAll(new RegExp(rx.source, "gi"))) found.add(m[0].trim());
  const alerts = ctx.page.locator("[role=alert]");
  for (let i = 0; i < (await alerts.count()); i++) {
    const a = alerts.nth(i);
    if (await a.isVisible().catch(() => false)) {
      const t = (await a.innerText().catch(() => "")).replace(/\s+/g, " ").trim();
      if (t) found.add(t.slice(0, 200));
    }
  }
  return [...found];
}

/**
 * Clicks the screen's button and checks the interview moved on. A refusal throws with the portal's
 * own messages; a screen that stays put without one gets one more click (the walk's 45-second hang).
 */
export async function moveOn(ctx: StepContext, screen: Pick<ScreenIntents, "title">, button: RegExp = SAVE_AND_CONTINUE): Promise<void> {
  for (let attempt = 1; attempt <= 2; attempt++) {
    await ctx.actAndSettle(() => ctx.clickButton(button));
    await settle(ctx);
    const errors = await pageErrors(ctx);
    if (errors.length) throw new Error(`NYS-100 ${screen.title}: the portal did not accept the screen: ${errors.join("; ")}`);
    if (!(await onScreen(ctx, screen.title))) return;
    if (attempt === 1) await ctx.note(`NYS-100 ${screen.title}: still on the screen after the click and no message shown; clicking once more`);
  }
  throw new Error(`NYS-100 ${screen.title}: the screen did not move on after two clicks`);
}

/**
 * Answers a question shown as styled buttons (OPA Yes/No) or as a radio group, by the question's text.
 * The control is the one inside the question's own container: the smallest ancestor of the question
 * text that holds the choices. Two questions in one container would be ambiguous and throw.
 */
export async function answer(ctx: StepContext, where: string, question: string, choice: string, choices: string[] = ["Yes", "No"]): Promise<void> {
  const label = question.replace(/[\s?*:]+$/, "");
  // A native radio group labelled by the question.
  const r = await ctx.resolve({ screenKey: `${where}#question`, title: where, intents: [{ key: "q", labels: [question, label], kinds: ["radio"], required: false }] });
  const radio = r.field("q");
  if (radio?.options?.some((o) => normalizeLabel(o.label) === normalizeLabel(choice))) {
    await r.set("q", choice);
    await settle(ctx);
    return;
  }
  const text = ctx.page.getByText(new RegExp(escapeRe(label).replace(/\s+/g, "\\s+").replace(/'/g, "['’]"), "i")).filter({ visible: true }).first();
  if (!(await text.count())) throw new Error(`NYS-100 ${where}: the question "${question}" is not on the page`);
  const any = new RegExp(`^\\s*(${choices.map(escapeRe).join("|")})\\s*$`, "i");
  const want = new RegExp(`^\\s*${escapeRe(choice)}\\s*$`, "i");
  for (let up = 1; up <= 6; up++) {
    const box = text.locator(`xpath=ancestor::*[${up}]`);
    const all = box.getByRole("button", { name: any }).or(box.getByRole("radio", { name: any }));
    const n = await all.count();
    if (!n) continue;
    if (n > choices.length) throw new Error(`NYS-100 ${where}: more than one question shares the container of "${question}"`);
    const hit = box.getByRole("button", { name: want }).or(box.getByRole("radio", { name: want }));
    if ((await hit.count()) !== 1) throw new Error(`NYS-100 ${where}: no "${choice}" answer for "${question}"`);
    await hit.click(); // reveals are client-side; the spinner check covers a postback
    await settle(ctx);
    return;
  }
  throw new Error(`NYS-100 ${where}: no ${choices.join("/")} buttons next to "${question}"`);
}

/** An option of a select by any of the spellings, or undefined. */
function optionLabel(f: FieldDescriptor | undefined, spellings: string[]): string | undefined {
  const want = spellings.map(normalizeLabel);
  return f?.options?.find((o) => want.includes(normalizeLabel(o.label)) || want.includes(normalizeLabel(o.value)))?.label;
}

/** The State/Province option for a US state code: the portal may list names or codes. */
function stateOption(f: FieldDescriptor | undefined, code: string, where: string): string {
  if (!f || f.kind !== "select") return code;
  const hit = optionLabel(f, [stateName(code), code]);
  if (!hit) throw new Error(`NYS-100 ${where}: the State/Province list has no ${code}`);
  return hit;
}

export interface ForeignAddressValue { street1: string; street2?: string; city: string; region?: string; postalCode: string; country: string }

/**
 * Fills the OPA address block on `screen` (US or non-US) and validates it. A New York address
 * shows County, starred on most screens (countyOptional where the walk saw it unstarred: A8 to A10).
 * The Address Verification window keeps the address as entered ("Use the address I provided"):
 * the filing carries the address the client approved; USPS's suggestion is recorded in the run,
 * not swapped in.
 */
export async function fillAddress(ctx: StepContext, screen: ScreenIntents, where: string,
  a: { us: Address; county?: string; countyOptional?: boolean } | { foreign: ForeignAddressValue }, attn?: string): Promise<void> {
  let r = await ctx.resolve(screen);
  if (attn) await r.set("attn", attn);
  if ("foreign" in a) {
    const f = a.foreign;
    if (!r.field("country")) throw new Error(`NYS-100 ${where}: no Country list for an address outside the US`);
    await r.set("country", f.country);
    r = await whenShown(ctx, screen, ["postalCode"], `choosing ${f.country}`);
    await r.set("line1", f.street1);
    if (f.street2) await r.set("line2", f.street2);
    await r.set("city", f.city);
    if (f.region && r.field("state")?.visible) await r.set("state", r.field("state")?.kind === "select" ? (optionLabel(r.field("state"), [f.region]) ?? f.region) : f.region);
    await r.set("postalCode", f.postalCode);
  } else {
    const us = a.us;
    const country = r.field("country");
    if (country && !/united states/i.test(country.options?.find((o) => o.value === country.value)?.label ?? "")) await r.set("country", "United States");
    r = await ctx.resolve(screen);
    await r.set("line1", us.street1);
    if (us.street2) await r.set("line2", us.street2);
    await r.set("city", us.city);
    await r.set("state", stateOption(r.field("state"), us.state, where));
    const z = splitZip(us.zip);
    r = await ctx.resolve(screen); // the state can change the block (County shows for New York)
    if (r.field("zip4")?.visible) {
      await r.set("zip", z.zip5);
      if (z.plus4) await r.set("zip4", z.plus4);
    } else await r.set("zip", us.zip);
    if (us.state === "NY") {
      const s = await whenShown(ctx, screen, ["county"], "choosing New York", 5_000).catch(() => null);
      if (s && a.county) await s.set("county", a.county);
      else if (s && !a.countyOptional) throw new Error(`NYS-100 ${where}: the portal asks the county of ${us.street1}, ${us.city}; the filing has none`);
    }
  }
  await validateAddress(ctx, where);
}

/** Validate Address -> Address Verification -> "Use the address I provided" -> USE SELECTED ADDRESS. */
export async function validateAddress(ctx: StepContext, where: string): Promise<void> {
  await ctx.clickButton(/^\s*validate address\s*$/i);
  await settle(ctx);
  let provided: string | undefined;
  const suggestions: string[] = [];
  for (let waited = 0; !provided; waited += 250) {
    const r = await ctx.resolve(NY_ADDRESS_MODAL);
    for (const g of r.fields.filter((f) => f.kind === "radio" && f.visible)) {
      for (const o of g.options ?? []) {
        if (/use the address i provided/i.test(o.label)) provided = o.ref;
        else if (o.label && !/use the validated address/i.test(o.label)) suggestions.push(o.label.replace(/\s+/g, " ").trim());
      }
    }
    if (provided) break;
    if (waited >= 20_000) throw new Error(`NYS-100 ${where}: the Address Verification window did not offer "Use the address I provided"`);
    await ctx.page.waitForTimeout(250);
  }
  await ctx.page.locator(`[data-ke-ref="${provided}"]`).check();
  if (suggestions.length) await ctx.note(`NYS-100 ${where}: the address was kept as approved; USPS suggested ${[...new Set(suggestions)].join(" | ")}`);
  await ctx.clickButton(/^\s*use selected address\s*$/i);
  await settle(ctx);
  const use = ctx.page.getByRole("button", { name: /^\s*use selected address\s*$/i });
  for (let waited = 0; await use.isVisible().catch(() => false); waited += 250) {
    if (waited >= 10_000) throw new Error(`NYS-100 ${where}: the Address Verification window did not close`);
    await ctx.page.waitForTimeout(250);
  }
}

/** "5185550100" -> "518-555-0100" (the portal's ###-###-#### mask). */
export function phoneMask(phone: string, where: string): string {
  let d = phone.replace(/\D/g, "");
  if (d.length === 11 && d.startsWith("1")) d = d.slice(1);
  if (d.length !== 10) throw new Error(`NYS-100 ${where}: "${phone}" is not a 10-digit US phone number`);
  return `${d.slice(0, 3)}-${d.slice(3, 6)}-${d.slice(6)}`;
}

/** "12-3456789" or "123456789" -> "12-3456789"; the FEIN rule the portal enforces is checked first. */
export function feinMask(fein: string, where: string): string {
  const d = fein.replace(/\D/g, "");
  if (d.length !== 9) throw new Error(`NYS-100 ${where}: the FEIN must be 9 digits`);
  if (/^(\d)\1{8}$/.test(d) || d === "123456789" || d === "987654321") {
    throw new Error(`NYS-100 ${where}: the portal refuses this FEIN (it cannot have all of the same numbers or equal 123456789 or 987654321)`);
  }
  return `${d.slice(0, 2)}-${d.slice(2)}`;
}

/** Date of Birth is three selects (YYYY, MM, DD), told apart by their options. */
export async function fillDateOfBirth(ctx: StepContext, fields: FieldDescriptor[], iso: string, where: string): Promise<void> {
  const [y, m, d] = iso.split("-").map(Number) as [number, number, number];
  const real = (f: FieldDescriptor) => (f.options ?? []).filter((o) => o.value !== "" && !/^(yyyy|mm|dd|year|month|day|select.*)$/i.test(o.label.trim()));
  const selects = fields.filter((f) => f.kind === "select" && f.visible && !f.disabled);
  const year = selects.find((f) => real(f).length >= 20 && real(f).every((o) => /^\d{4}$/.test(o.label.trim())));
  const month = selects.find((f) => f !== year && real(f).length === 12);
  const day = selects.find((f) => f !== year && f !== month && real(f).length >= 28 && real(f).length <= 31 && real(f).every((o) => /^\d{1,2}$/.test(o.label.trim())));
  if (!year || !month || !day) throw new Error(`NYS-100 ${where}: the three Date of Birth lists (YYYY, MM, DD) were not found`);
  const num = (o: { value: string; label: string }) => Number(/^\d+$/.test(o.value) ? o.value : o.label.trim());
  const MONTHS = ["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"];
  const pickY = real(year).find((o) => o.label.trim() === String(y));
  const pickM = real(month).find((o) => num(o) === m || o.label.trim().toLowerCase().startsWith(MONTHS[m - 1]!));
  const pickD = real(day).find((o) => num(o) === d);
  if (!pickY || !pickM || !pickD) throw new Error(`NYS-100 ${where}: the date of birth ${iso} is not in the portal's lists`);
  await ctx.page.locator(`[data-ke-ref="${year.ref}"]`).selectOption({ value: pickY.value });
  await ctx.page.locator(`[data-ke-ref="${month.ref}"]`).selectOption({ value: pickM.value });
  await ctx.page.locator(`[data-ke-ref="${day.ref}"]`).selectOption({ value: pickD.value });
}

/** The SSN: three boxes (###, ##, ####) after the SSN label, or one box. Never noted or logged. */
export async function fillSsn(ctx: StepContext, fields: FieldDescriptor[], first: FieldDescriptor | undefined, ssn: string, where: string): Promise<void> {
  if (!first) throw new Error(`NYS-100 ${where}: the SSN boxes did not appear`);
  const d = ssn.replace(/\D/g, "");
  if (d.length !== 9) throw new Error(`NYS-100 ${where}: the SSN must be 9 digits`);
  const at = fields.findIndex((f) => f.ref === first.ref);
  const boxes = fields.slice(at, at + 3).filter((f) => TEXT_LIKE.has(f.kind) && f.visible);
  const max = await ctx.page.locator(`[data-ke-ref="${first.ref}"]`).getAttribute("maxlength");
  if (boxes.length === 3 && max === "3") {
    const parts = [d.slice(0, 3), d.slice(3, 5), d.slice(5)];
    for (let i = 0; i < 3; i++) await ctx.page.locator(`[data-ke-ref="${boxes[i]!.ref}"]`).fill(parts[i]!);
  } else {
    await ctx.page.locator(`[data-ke-ref="${first.ref}"]`).fill(`${d.slice(0, 3)}-${d.slice(3, 5)}-${d.slice(5)}`);
  }
}
