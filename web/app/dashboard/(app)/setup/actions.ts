"use server";

import { revalidatePath } from "next/cache";
import { engine, EngineError, type AccountSetup, type PaymentRouting } from "@/lib/engine";
import { requireTenant } from "@/lib/session";
import { FILING_KINDS } from "@/lib/intake/forms";

export type Saved = { ok?: boolean; error?: string } | null;

function problem(e: unknown): string {
  if (e instanceof EngineError) {
    if (e.status === 409) return "Your account settings haven't been set up yet. We'll do that with you first.";
    const issues = (e.body as { issues?: { message: string }[] })?.issues;
    if (e.status === 422 && issues?.length) return issues.map((i) => i.message).join("; ");
  }
  return "That didn't save. Try again in a minute.";
}

export async function saveRouting(_prev: Saved, fd: FormData): Promise<Saved> {
  const s = await requireTenant();
  const setup = await engine<AccountSetup>(s.apiKey, "/v1/account/setup");
  const of = (purpose: "state_fees" | "subscription") => new Set(setup.payments.methods.filter((m) => m.purpose === purpose).map((m) => m.id));
  const fee = of("state_fees"), subs = of("subscription");
  const pick = (k: string, set: Set<string>) => { const v = String(fd.get(k) ?? ""); return set.has(v) ? v : undefined; };
  const mode = fd.get("mode") === "per_filing" ? "per_filing" : "single";
  const byFilingKind: Record<string, string> = {};
  if (mode === "per_filing") for (const k of FILING_KINDS) { const v = pick(`kind.${k.id}`, fee); if (v) byFilingKind[k.id] = v; }
  const routing: PaymentRouting = {
    mode, byFilingKind, defaultMethodId: pick("defaultMethodId", fee), fallbackMethodId: pick("fallbackMethodId", fee),
    subscriptionMethodId: pick("subscriptionMethodId", subs),
  };
  try { await engine(s.apiKey, "/v1/account/payment-routing", { method: "PUT", body: routing }); } catch (e) { return { error: problem(e) }; }
  revalidatePath("/dashboard/setup");
  return { ok: true };
}

export async function saveDefaults(portal: string, _prev: Saved, fd: FormData): Promise<Saved> {
  const s = await requireTenant();
  const setup = await engine<AccountSetup>(s.apiKey, "/v1/account/setup");
  const p = setup.portals.find((x) => x.id === portal);
  if (!p) return { error: "Unknown portal." };
  const body: Record<string, string | number | boolean> = {};
  for (const f of p.defaults) {
    const v = fd.get(f.id);
    if (f.type === "boolean") body[f.id] = v === "on";
    else if (f.type === "number") { if (v !== null && String(v).trim() !== "") body[f.id] = Number(v); }
    else if (v !== null && String(v) !== "") body[f.id] = String(v);
  }
  try { await engine(s.apiKey, `/v1/account/portal-defaults/${encodeURIComponent(portal)}`, { method: "PUT", body }); } catch (e) { return { error: problem(e) }; }
  revalidatePath("/dashboard/setup");
  return { ok: true };
}
