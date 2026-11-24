"use server";

import { revalidatePath } from "next/cache";
import { firmContext } from "@/lib/firm";
import { listSignatures, revokeSignature, saveSignature } from "@/lib/signatures";
import { EngineError } from "@/lib/engine";

export type SigResult = { ok: boolean; message: string } | null;

export async function addSignature(slug: string, _prev: SigResult, fd: FormData): Promise<SigResult> {
  const { session } = await firmContext(slug);
  const signerName = String(fd.get("signerName") ?? "").trim();
  const signerEmail = String(fd.get("signerEmail") ?? "").trim() || undefined;
  const image = String(fd.get("image") ?? "");
  if (signerName.length < 2) return { ok: false, message: "Enter the signer's full name." };
  if (!image) return { ok: false, message: "Draw the signature in the box." };
  if (fd.get("consent") !== "on") return { ok: false, message: "The signer has to tick the box to adopt the signature." };
  try {
    const { consentText } = await listSignatures(session.apiKey, session.clientCompanyId);
    await saveSignature(session.apiKey, { clientCompanyId: session.clientCompanyId, signerName, signerEmail, image, consentText, capturedBy: `firm_portal:${session.email}` });
  } catch (e) {
    return { ok: false, message: e instanceof EngineError ? e.message : "The signature couldn't be saved." };
  }
  revalidatePath(`/p/${slug}/signatures`);
  return { ok: true, message: `Saved ${signerName}'s signature.` };
}

export async function removeSignature(slug: string, fd: FormData): Promise<void> {
  const { session } = await firmContext(slug);
  const id = String(fd.get("id") ?? "");
  const { signatures } = await listSignatures(session.apiKey, session.clientCompanyId);
  if (!signatures.some((s) => s.id === id)) return;
  await revokeSignature(session.apiKey, id);
  revalidatePath(`/p/${slug}/signatures`);
}
