"use server";

import { revalidatePath } from "next/cache";
import { engine, EngineError } from "@/lib/engine";
import { requireTenant } from "@/lib/session";

export type HookResult = { ok: true; generated: { url: string; secret: string }[] } | { ok: false; message: string; issues?: { path: string; message: string }[] } | null;

/** Saves the whole endpoint list. Existing endpoints keep their secrets; new ones get one, shown once. */
export async function saveEndpoints(_prev: HookResult, fd: FormData): Promise<HookResult> {
  const s = await requireTenant();
  const rows = new Map<string, { url: string; events: string[]; all: boolean; remove: boolean }>();
  for (const [k, v] of fd.entries()) {
    const m = /^ep\.(\d+)\.(url|event|all|remove)$/.exec(k);
    if (!m || typeof v !== "string") continue;
    const r = rows.get(m[1]!) ?? { url: "", events: [], all: false, remove: false };
    if (m[2] === "url") r.url = v.trim();
    if (m[2] === "event") r.events.push(v);
    if (m[2] === "all") r.all = v === "on";
    if (m[2] === "remove") r.remove = v === "on";
    rows.set(m[1]!, r);
  }
  const endpoints = [...rows.values()].filter((r) => r.url && !r.remove).map((r) => ({ url: r.url, ...(r.all || !r.events.length ? {} : { events: r.events }) }));
  try {
    const res = await engine<{ generatedSecrets: { url: string; secret: string }[] }>(s.apiKey, "/v1/webhook-endpoints", { method: "PUT", body: { endpoints } });
    revalidatePath("/dashboard/webhooks");
    return { ok: true, generated: res.generatedSecrets };
  } catch (e) {
    if (e instanceof EngineError) {
      const b = e.body as { issues?: { path: string; message: string }[] };
      return { ok: false, message: e.message, issues: Array.isArray(b?.issues) ? b.issues : undefined };
    }
    return { ok: false, message: "The endpoints couldn't be saved." };
  }
}
