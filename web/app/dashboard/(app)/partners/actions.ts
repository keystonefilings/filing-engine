"use server";

import { revalidatePath } from "next/cache";
import { engine, EngineError } from "@/lib/engine";
import { requireTenant } from "@/lib/session";

/** Approves or turns down a partner sign-up. Nothing is emailed; tell them yourself for now. */
export async function decideSignup(id: string, action: "approve" | "reject"): Promise<void> {
  const s = await requireTenant();
  try {
    await engine(s.apiKey, `/v1/partner-signups/${encodeURIComponent(id)}/decision`, { method: "POST", body: { action } });
  } catch (e) {
    if (!(e instanceof EngineError && e.status === 409)) throw e;
  }
  revalidatePath("/dashboard/partners");
}
