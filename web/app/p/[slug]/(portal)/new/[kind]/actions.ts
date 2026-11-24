"use server";

import { firmContext, liveFilings, offeredKinds } from "@/lib/firm";
import { submitIntake } from "@/lib/intake/submit";
import type { IntakeResult } from "@/components/IntakeForm";

const NONCE = /^[A-Za-z0-9_-]{8,40}$/;

export async function createFirmFiling(slug: string, kindId: string, fd: FormData): Promise<IntakeResult> {
  const { session, company } = await firmContext(slug);
  const kind = offeredKinds(company).find((k) => k.id === kindId);
  if (!kind) return { ok: false, error: "This filing isn't offered on this portal.", issues: [] };
  const nonce = String(fd.get("_nonce") ?? "");
  if (!NONCE.test(nonce)) return { ok: false, error: "This form has expired. Reload the page and try again.", issues: [] };
  const r = await submitIntake(kind, fd, {
    apiKey: session.apiKey, tenantId: session.tenantId, clientCompanyId: session.clientCompanyId,
    submittedBy: session.email, source: "firm_portal", dryRun: !liveFilings(), allowSavedSignature: true, idempotencySeed: `${session.clientCompanyId}-${nonce}`,
  });
  if (!r.ok) return r;
  return { ok: true, redirectTo: `/p/${encodeURIComponent(slug)}/filings/${encodeURIComponent(r.result.filing.id)}` };
}
