"use server";

import { firmBySlug, kindForServiceSlug, publicKind, publicSubmitPath } from "@/lib/public-pages";
import { liveFilings, offeredKinds } from "@/lib/firm";
import { submitIntake } from "@/lib/intake/submit";
import { withFirmDefaults } from "@/lib/firm-defaults";
import type { IntakeResult } from "@/components/IntakeForm";

/** A submission from a firm's public page or website widget: a new filing for that firm, with no key. */
export async function submitPublic(tenantId: string, firmSlug: string, serviceSlug: string, nonce: string, fd: FormData): Promise<IntakeResult> {
  const company = await firmBySlug(firmSlug, tenantId);
  const kind = kindForServiceSlug(serviceSlug);
  if (!company || !publicKind(kind) || !offeredKinds(company).some((k) => k.id === kind.id)) return { ok: false, error: "This page isn't available any more.", issues: [] };
  if (!/^[a-f0-9-]{36}$/.test(nonce)) return { ok: false, error: "Reload the page and try again.", issues: [] };
  const email = String(fd.get("contact.email") ?? "").trim();
  const shaped = withFirmDefaults(kind, company, { forClient: true });
  const r = await submitIntake(shaped.kind, fd, {
    apiKey: "", publicPath: publicSubmitPath(tenantId, firmSlug), tenantId, clientCompanyId: company.clientCompanyId,
    submittedBy: email ? `client:${email}` : "client", source: "client_link", dryRun: !liveFilings(kind.id),
    allowSavedSignature: false, idempotencySeed: nonce, resolve: shaped.resolve,
  });
  if (!r.ok) return r.error?.includes("429") ? { ok: false, error: "This page has had a lot of submissions in the last hour. Try again later, or contact the firm.", issues: [] } : r;
  return { ok: true, title: "Thank you, we have your details.", message: "Next, the firm checks every detail and approves the filing. Nothing is filed or paid until it does. You can close this page." };
}
