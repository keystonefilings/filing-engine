import type { StepContext } from "./types.js";
import type { FieldDescriptor, ScreenIntents } from "../resolver/types.js";

/** Page interactions both payroll adapters need (NYS-100, NJ-REG). Fields are found by label, never by selector. */

export const escapeRe = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

/** Waits (bounded) for fields a choice reveals, then returns the page resolved fresh. */
export async function whenShown(ctx: StepContext, screen: ScreenIntents, keys: string[], after: string, timeoutMs = 15_000) {
  for (let waited = 0; ; waited += 250) {
    const r = await ctx.resolve(screen);
    if (keys.every((k) => r.field(k)?.visible)) return r;
    if (waited >= timeoutMs) throw new Error(`${screen.title}: ${keys.join(", ")} did not appear after ${after}`);
    await ctx.page.waitForTimeout(250);
  }
}

/** Waits (bounded) until a select offers an option matching `want` (lists filled in after another answer). */
export async function whenOptionListed(ctx: StepContext, screen: ScreenIntents, key: string, want: (o: { value: string; label: string }) => boolean, after: string, timeoutMs = 15_000) {
  for (let waited = 0; ; waited += 250) {
    const r = await ctx.resolve(screen);
    const opt = r.field(key)?.options?.find(want);
    if (opt) return { r, opt };
    if (waited >= timeoutMs) {
      const listed = (r.field(key)?.options ?? []).map((o) => o.label).filter(Boolean).slice(0, 12).join(", ");
      throw new Error(`${screen.title}: the ${key} list has no matching choice after ${after} (listed: ${listed || "none"})`);
    }
    await ctx.page.waitForTimeout(250);
  }
}

/**
 * Types a code into a keyword autocomplete the way a person does (key by key, so the widget searches)
 * and picks the suggestion carrying the code. Returns the suggestion's text.
 */
export async function pickSuggestion(ctx: StepContext, field: FieldDescriptor | undefined, code: string, where: string, settle?: () => Promise<void>): Promise<string> {
  if (!field) throw new Error(`${where}: the search box is not on the page`);
  const box = ctx.page.locator(`[data-ke-ref="${field.ref}"]`);
  await box.fill("");
  await box.pressSequentially(code, { delay: 30 });
  const rx = new RegExp(`(^|\\D)${escapeRe(code)}(\\D|$)`);
  const pick = ctx.page.getByRole("option", { name: rx }).or(ctx.page.getByRole("menuitem", { name: rx })).or(ctx.page.locator("li").filter({ hasText: rx }));
  for (let waited = 0; ; waited += 250) {
    const shown = pick.filter({ visible: true });
    if (await shown.count()) {
      const text = (await shown.first().innerText()).replace(/\s+/g, " ").trim();
      await ctx.actAndSettle(() => shown.first().click());
      if (settle) await settle();
      return text;
    }
    if (waited >= 15_000) throw new Error(`${where}: no suggestion for ${code} appeared in the list`);
    await ctx.page.waitForTimeout(250);
  }
}

const SUFFIXES = ["JR", "SR", "I", "II", "III", "IV", "V"];

/** "Mary Ann Smith Jr." -> first Mary, middle initial A, last Smith, suffix JR (both portals take a middle initial only). */
export function splitPersonName(full: string, where: string): { first: string; middleInitial?: string; last: string; suffix?: string } {
  const parts = full.trim().split(/\s+/);
  let suffix: string | undefined;
  const tail = parts[parts.length - 1]!.replace(/[.,]$/, "").toUpperCase();
  if (parts.length > 2 && SUFFIXES.includes(tail)) { suffix = tail; parts.pop(); }
  if (parts.length < 2) throw new Error(`${where}: "${full}" needs a first and a last name`);
  const middle = parts.slice(1, -1);
  return { first: parts[0]!.replace(/,$/, ""), middleInitial: middle.length ? middle[0]![0]!.toUpperCase() : undefined, last: parts[parts.length - 1]!, suffix };
}
