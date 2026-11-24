"use server";

import { revalidatePath } from "next/cache";
import { engine, EngineError, type ApiKeyInfo } from "@/lib/engine";
import { redirect } from "next/navigation";
import { clearSession, requireTenant } from "@/lib/session";

export type NewKey = { ok: true; key: string; name: string } | { ok: false; message: string } | null;

export async function createKey(_prev: NewKey, fd: FormData): Promise<NewKey> {
  const s = await requireTenant();
  const name = String(fd.get("name") ?? "").trim();
  if (!name || name.length > 60) return { ok: false, message: "Give the key a name of up to 60 characters." };
  try {
    const r = await engine<{ key: string; apiKey: ApiKeyInfo }>(s.apiKey, "/v1/api-keys", { method: "POST", body: { name } });
    revalidatePath("/dashboard/keys");
    return { ok: true, key: r.key, name };
  } catch (e) {
    return { ok: false, message: e instanceof EngineError ? e.message : "The key couldn't be created." };
  }
}

export async function revokeKey(fd: FormData): Promise<void> {
  const s = await requireTenant();
  const id = String(fd.get("id") ?? "");
  const { keys } = await engine<{ keys: ApiKeyInfo[] }>(s.apiKey, "/v1/api-keys");
  const k = keys.find((x) => x.id === id);
  if (!k) return;
  await engine(s.apiKey, `/v1/api-keys/${encodeURIComponent(id)}`, { method: "DELETE" });
  // Revoking the key this session signed in with ends the session.
  if (s.apiKey.startsWith(k.prefix)) { await clearSession(); redirect("/dashboard/login"); }
  revalidatePath("/dashboard/keys");
}
