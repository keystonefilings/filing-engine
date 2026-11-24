"use server";

import { readClientIntake } from "@/lib/session";
import { filingKind } from "@/lib/intake/forms";
import { liveFilings, loadCompany, offeredKinds } from "@/lib/firm";
import { submitIntake } from "@/lib/intake/submit";
import type { IntakeResult } from "@/components/IntakeForm";

export async function submitClientIntake(token: string, fd: FormData): Promise<IntakeResult> {
  const link = readClientIntake(token);
  if (!link) return { ok: false, error: "This link has expired. Ask whoever sent it for a new one.", issues: [] };
  const company = await loadCompany(link.apiKey, link.clientCompanyId);
  const kind = filingKind(link.kind);
  if (!kind || !offeredKinds(company).some((k) => k.id === kind.id)) return { ok: false, error: "This filing is no longer offered.", issues: [] };
  const email = String(fd.get("contact.email") ?? "").trim();
  const r = await submitIntake(kind, fd, {
    apiKey: link.apiKey, tenantId: link.tenantId, clientCompanyId: link.clientCompanyId,
    submittedBy: email ? `client:${email}` : "client", source: "client_link", dryRun: !liveFilings(),
    // One link, one filing: sending the form again returns the same filing.
    allowSavedSignature: false, idempotencySeed: `${link.clientCompanyId}-${link.nonce}`,
  });
  if (!r.ok) return r;
  return { ok: true, message: "We have your answers. You'll get an email with a link to check exactly what will be filed and approve it before anything is sent to the state." };
}
