"use server";

import { revalidatePath } from "next/cache";
import { engine, EngineError } from "./engine";
import { personalSession, readSession } from "./session";

/** V42-V43: the person's mobile number for filing requests by text or WhatsApp. */
export type PhoneStatus = { phone: string | null; pending: string | null; numbers: { sms: string | null; whatsapp: string | null } | null };
export type PhoneState = { error?: string; pending?: string; done?: string } | null;

const where = (s: NonNullable<Awaited<ReturnType<typeof readSession>>>) => (s.kind === "firm" ? `/p/${encodeURIComponent(s.slug)}/password` : "/dashboard/password");

export async function phoneStatus(): Promise<PhoneStatus | null> {
  const s = await readSession();
  if (!s || !personalSession(s)) return null;
  return engine<PhoneStatus>(s.apiKey, "/v1/account/phone").catch(() => null);
}

export async function sendPhoneCode(_prev: PhoneState, fd: FormData): Promise<PhoneState> {
  const s = await readSession();
  if (!s || !personalSession(s)) return { error: "Sign in again." };
  try {
    const r = await engine<{ pending: string }>(s.apiKey, "/v1/account/phone", { method: "POST", body: { phone: String(fd.get("phone") ?? "").slice(0, 30) } });
    return { pending: r.pending };
  } catch (e) {
    const msg = e instanceof EngineError ? (e.body as { error?: string } | null)?.error : undefined;
    return { error: msg ? msg[0]!.toUpperCase() + msg.slice(1) + "." : "We couldn't send the code. Try again." };
  }
}

export async function confirmPhoneCode(_prev: PhoneState, fd: FormData): Promise<PhoneState> {
  const s = await readSession();
  if (!s || !personalSession(s)) return { error: "Sign in again." };
  try {
    const r = await engine<{ phone: string }>(s.apiKey, "/v1/account/phone/confirm", { method: "POST", body: { code: String(fd.get("code") ?? "").replace(/\D/g, "").slice(0, 6) } });
    revalidatePath(where(s));
    return { done: r.phone };
  } catch (e) {
    const msg = e instanceof EngineError ? (e.body as { error?: string } | null)?.error : undefined;
    return { error: msg ? msg[0]!.toUpperCase() + msg.slice(1) + "." : "That didn't work. Try again.", pending: String(fd.get("pending") ?? "") || undefined };
  }
}

export async function removePhone(): Promise<void> {
  const s = await readSession();
  if (!s || !personalSession(s)) return;
  await engine(s.apiKey, "/v1/account/phone", { method: "DELETE" }).catch(() => undefined);
  revalidatePath(where(s));
}
