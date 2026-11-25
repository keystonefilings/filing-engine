"use server";

import { firmBySlug, kindForServiceSlug, platformKey, takePublicSubmission } from "@/lib/public-pages";
import { liveFilings, offeredKinds } from "@/lib/firm";
import { submitIntake } from "@/lib/intake/submit";
import type { IntakeResult } from "@/components/IntakeForm";
import { withFirmDefaults } from "@/lib/firm-defaults";

/** A submission from a firm's public page: a new filing for that firm (each page view sends at most one). */
export async function submitPublicIntake(firmSlug: string, serviceSlug: string, nonce: string, fd: FormData): Promise<IntakeResult> {
  const key = platformKey();
  const company = await firmBySlug(firmSlug);
  const kind = kindForServiceSlug(serviceSlug);
  if (!key || !company || !kind || !offeredKinds(company).some((k) => k.id === kind.id)) return { ok: false, error: "This page isn't available any more.", issues: [] };
  if (!/^[a-f0-9-]{36}$/.test(nonce)) return { ok: false, error: "Reload the page and try again.", issues: [] };
  if (!takePublicSubmission(company.clientCompanyId)) return { ok: false, error: "This page has had a lot of submissions in the last hour. Try again later, or contact the firm.", issues: [] };
  const email = String(fd.get("contact.email") ?? "").trim();
  const r = await submitIntake(withFirmDefaults(kind, company, { forClient: true }).kind, fd, {
    apiKey: key, tenantId: company.tenantId, clientCompanyId: company.clientCompanyId,
    submittedBy: email ? `client:${email}` : "client", source: "client_link", dryRun: !liveFilings(),
    allowSavedSignature: false, idempotencySeed: `${company.clientCompanyId}-public-${nonce}`,
  });
  if (!r.ok) return r;
  return { ok: true, message: "We have your answers. You'll get an email with the state's own page to check and approve before anything is sent to the state." };
}
