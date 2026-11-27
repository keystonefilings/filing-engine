"use server";

import { firmContext, liveFilings, offeredKinds } from "@/lib/firm";
import { submitIntake } from "@/lib/intake/submit";
import { withFirmDefaults } from "@/lib/firm-defaults";
import type { IntakeResult } from "@/components/IntakeForm";
import { markFiled } from "@/lib/inbound";

const NONCE = /^[A-Za-z0-9_-]{8,40}$/;

export async function createFirmFiling(slug: string, kindId: string, emailId: string | null, fd: FormData): Promise<IntakeResult> {
  const { session, company } = await firmContext(slug);
  const offered = offeredKinds(company).find((k) => k.id === kindId);
  if (!offered) return { ok: false, error: "This filing isn't offered on this portal.", issues: [] };
  const { kind, resolve } = withFirmDefaults(offered, company);
  const nonce = String(fd.get("_nonce") ?? "");
  if (!NONCE.test(nonce)) return { ok: false, error: "This form has expired. Reload the page and try again.", issues: [] };
  const r = await submitIntake(kind, fd, {
    apiKey: session.apiKey, tenantId: session.tenantId, clientCompanyId: session.clientCompanyId,
    submittedBy: session.email, source: "firm_portal", dryRun: !liveFilings(kind.id), allowSavedSignature: true, idempotencySeed: `${session.clientCompanyId}-${nonce}`, resolve,
  });
  if (!r.ok) return r;
  if (emailId) await markFiled(session.apiKey, session.clientCompanyId, emailId, r.result.filing.id);
  return { ok: true, redirectTo: `/p/${encodeURIComponent(slug)}/filings/${encodeURIComponent(r.result.filing.id)}` };
}
