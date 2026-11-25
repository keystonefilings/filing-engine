"use server";

import { revalidatePath } from "next/cache";
import { engine, EngineError } from "@/lib/engine";
import { requireTenant } from "@/lib/session";

export type TeamState = { ok?: boolean; error?: string } | null;

/** Adds a colleague who signs in with email and password. They should change the password once signed in. */
export async function addTeamMember(_prev: TeamState, fd: FormData): Promise<TeamState> {
  const s = await requireTenant();
  const body = { name: String(fd.get("name") ?? "").trim(), email: String(fd.get("email") ?? "").trim().toLowerCase(), password: String(fd.get("password") ?? "") };
  try {
    await engine(s.apiKey, "/v1/users", { method: "POST", body });
  } catch (e) {
    if (e instanceof EngineError && e.status === 409) return { error: "That email already has an account." };
    if (e instanceof EngineError && e.status === 422) {
      const issues = (e.body as { issues?: { path: string; message: string }[] })?.issues ?? [];
      return { error: issues.map((i) => `${i.path}: ${i.message}`).join("; ") || "Check the fields." };
    }
    return { error: "That didn't save. Try again in a minute." };
  }
  revalidatePath("/dashboard/team");
  return { ok: true };
}
