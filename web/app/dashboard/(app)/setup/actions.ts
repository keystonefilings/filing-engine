"use server";

import type { LoginState } from "@/components/PortalLoginForm";
import type { DefaultsState } from "@/components/FilingDefaultsForm";
import type { AgentsState } from "@/components/AgentsForm";
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
  // Yakov (Nov 26): NJ filing types paid with the NJ account's own saved method.
  const njKinds = ["nj-llc", "nj-corp", "nj-standing"].filter((k) => fd.get(`njPortal.kind.${k}`) === "on");
  const routing: PaymentRouting = {
    mode, byFilingKind, defaultMethodId: pick("defaultMethodId", fee), fallbackMethodId: pick("fallbackMethodId", fee),
    subscriptionMethodId: pick("subscriptionMethodId", subs),
    statePortal: { NJ: { method: fd.get("njPortal.method") === "stored_echeck" ? "stored_echeck" : "stored_card", kinds: njKinds } },
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

/** V29: connect a state portal login (sealed by the engine, never returned). */
export async function connectLogin(portal: string, _prev: LoginState, fd: FormData): Promise<LoginState> {
  const s = await requireTenant();
  const body = {
    username: String(fd.get("username") ?? "").trim(), password: String(fd.get("password") ?? ""),
    ...(String(fd.get("totpSeed") ?? "").trim() ? { totpSeed: String(fd.get("totpSeed")).trim() } : {}),
  };
  if (!body.username || !body.password) return { error: "Enter the username and password." };
  try {
    await engine(s.apiKey, `/v1/account/portal-logins/${encodeURIComponent(portal)}`, { method: "PUT", body });
  } catch (e) {
    if (e instanceof EngineError && e.status === 422) return { error: ((e.body as { issues?: { message: string }[] })?.issues?.[0]?.message) ?? "Check the login details." };
    if (e instanceof EngineError && e.status === 501) return { error: "Connecting logins isn't switched on for this site yet." };
    return { error: "That didn't save. Try again in a minute." };
  }
  revalidatePath("/dashboard/setup");
  return { ok: true };
}

export async function disconnectLogin(portal: string): Promise<void> {
  const s = await requireTenant();
  await engine(s.apiKey, `/v1/account/portal-logins/${encodeURIComponent(portal)}`, { method: "DELETE" }).catch(() => undefined);
  revalidatePath("/dashboard/setup");
}

const t = (fd: FormData, k: string, max = 160) => String(fd.get(k) ?? "").trim().slice(0, max);

/** V30: organizer, filer and signer (an empty name removes one). */
export async function saveFilingDefaults(_prev: DefaultsState, fd: FormData): Promise<DefaultsState> {
  const s = await requireTenant();
  const body: Record<string, unknown> = {};
  for (const k of ["organizer", "filer", "signer"]) {
    const name = t(fd, `${k}.name`);
    if (!name) { body[k] = null; continue; }
    const street1 = t(fd, `${k}.street1`, 120), city = t(fd, `${k}.city`, 80), state = t(fd, `${k}.state`, 2).toUpperCase(), zip = t(fd, `${k}.zip`, 10);
    const hasAddress = street1 || city || zip;
    if (hasAddress && (!street1 || !city || !/^[A-Z]{2}$/.test(state) || !/^\d{5}(-\d{4})?$/.test(zip))) return { error: `Finish the ${k}'s address (street, city, state, ZIP) or leave it empty.` };
    body[k] = { name, ...(t(fd, `${k}.title`, 80) ? { title: t(fd, `${k}.title`, 80) } : {}), ...(hasAddress ? { address: { street1, city, state, zip } } : {}) };
  }
  const copy = t(fd, "copyEmail", 200).toLowerCase();
  if (copy && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(copy)) return { error: "Check the copy email address." };
  body.copyEmail = copy || null;
  try { await engine(s.apiKey, "/v1/account/filing-defaults", { method: "PUT", body }); }
  catch (e) { return { error: e instanceof EngineError && e.status === 409 ? "Your account settings aren't set up yet." : "That didn't save. Try again in a minute." }; }
  revalidatePath("/dashboard/setup");
  return { ok: true, message: "Saved." };
}

/** V30: the subscriber's own registered agent per state. */
export async function saveTenantAgents(_prev: AgentsState, fd: FormData): Promise<AgentsState> {
  const s = await requireTenant();
  const agents: Record<string, unknown> = {};
  for (const st of ["NY", "NJ", "FL", "MO"]) {
    if (!fd.has(`${st}.name`)) continue;
    const name = t(fd, `${st}.name`);
    if (!name) { agents[st] = null; continue; }
    const street1 = t(fd, `${st}.street1`, 120), city = t(fd, `${st}.city`, 80), zip = t(fd, `${st}.zip`, 10);
    if (!street1 || !city || !/^\d{5}(-\d{4})?$/.test(zip)) return { error: `Fill in the ${st} agent's street, city and ZIP, or leave its name empty.` };
    agents[st] = { name, ...(t(fd, `${st}.email`) ? { email: t(fd, `${st}.email`) } : {}), address: { street1, ...(t(fd, `${st}.street2`, 120) ? { street2: t(fd, `${st}.street2`, 120) } : {}), city, state: st, zip } };
  }
  try { await engine(s.apiKey, "/v1/account/filing-defaults", { method: "PUT", body: { registeredAgents: agents } }); }
  catch (e) { return { error: e instanceof EngineError && e.status === 422 ? "Each agent's address must be in its own state." : "That didn't save. Try again in a minute." }; }
  revalidatePath("/dashboard/setup");
  return { ok: true, message: "Saved. Filings where you provide the agent name these." };
}
