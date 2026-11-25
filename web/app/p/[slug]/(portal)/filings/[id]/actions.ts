"use server";

import { revalidatePath } from "next/cache";
import { engine, EngineError, type Filing } from "@/lib/engine";
import { firmContext } from "@/lib/firm";
import { missingInputs, partialFrom } from "@/lib/missing-fields";
import type { MissingState } from "@/components/MissingInfoForm";

/** V27: sends the missing answers; the filing moves on to its preview or approval once complete. */
export async function supplyMissing(slug: string, filingId: string, _prev: MissingState, fd: FormData): Promise<MissingState> {
  const { session } = await firmContext(slug);
  const { filing } = await engine<{ filing: Filing }>(session.apiKey, `/v1/filings/${encodeURIComponent(filingId)}`);
  if (filing.clientCompanyId !== session.clientCompanyId || filing.status !== "awaiting_information") return { ok: false, error: "This filing isn't waiting for answers any more." };
  const partial = partialFrom(fd, missingInputs(filing.missingInformation ?? []));
  if (!Object.keys(partial).length) return { ok: false, error: "Fill in the answers first." };
  let r: { complete: boolean; missing?: { label: string }[] };
  try {
    r = await engine(session.apiKey, `/v1/filings/${encodeURIComponent(filingId)}/information`, { method: "POST", body: partial });
  } catch (e) {
    if (e instanceof EngineError && e.status === 422) {
      const issues = (e.body as { issues?: { path: string; message: string }[] })?.issues ?? [];
      return { ok: false, error: issues.length ? `Check: ${issues.map((i) => `${i.path} (${i.message})`).join("; ")}` : "Those answers weren't accepted." };
    }
    return { ok: false, error: "That didn't send. Try again in a minute." };
  }
  revalidatePath(`/p/${encodeURIComponent(slug)}/filings/${encodeURIComponent(filingId)}`);
  return r.complete
    ? { ok: true, message: "Thanks, that's everything. The filing moves on to approval." }
    : { ok: true, message: `Saved. Still needed: ${(r.missing ?? []).map((m) => m.label).join(", ")}.` };
}
