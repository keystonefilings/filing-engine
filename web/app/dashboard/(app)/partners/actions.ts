"use server";

import { revalidatePath } from "next/cache";
import { engine, EngineError } from "@/lib/engine";
import { requireTenant } from "@/lib/session";

/** Approves or turns down a partner sign-up. An approved partner is emailed a link to log in. */
export async function decideSignup(id: string, action: "approve" | "reject"): Promise<void> {
  const s = await requireTenant();
  try {
    await engine(s.apiKey, `/v1/partner-signups/${encodeURIComponent(id)}/decision`, { method: "POST", body: { action } });
  } catch (e) {
    if (!(e instanceof EngineError && e.status === 409)) throw e;
  }
  revalidatePath("/dashboard/partners");
}

/** V32: approve an enterprise request (creates the account and emails a set-password link) or decline it. */
export async function decideInquiry(id: string, action: "approve" | "decline"): Promise<void> {
  const s = await requireTenant();
  try {
    await engine(s.apiKey, `/v1/inquiries/${encodeURIComponent(id)}/decision`, { method: "POST", body: { action } });
  } catch (e) {
    if (!(e instanceof EngineError && e.status === 409)) throw e;
  }
  revalidatePath("/dashboard/partners");
}
