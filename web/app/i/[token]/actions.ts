"use server";

import { intakeKey, readClientIntake } from "@/lib/session";
import { filingKind } from "@/lib/intake/forms";
import { liveFilings, loadCompany, offeredKinds } from "@/lib/firm";
import { submitIntake } from "@/lib/intake/submit";
import { CLOSED_TEXT, linkRecord, markLinkUsed } from "@/lib/intake-links";
import type { IntakeResult } from "@/components/IntakeForm";

export async function submitClientIntake(token: string, fd: FormData): Promise<IntakeResult> {
  const link = readClientIntake(token);
  if (!link) return { ok: false, error: "This link has expired. Ask whoever sent it for a new one.", issues: [] };
  const key = intakeKey(link);
  const company = await loadCompany(key, link.clientCompanyId);
  const kind = filingKind(link.kind);
  if (!kind || !offeredKinds(company).some((k) => k.id === kind.id)) return { ok: false, error: "This filing is no longer offered.", issues: [] };
  const record = await linkRecord(key, link.clientCompanyId, link.nonce).catch(() => null);
  if (record && record.state !== "open") return { ok: false, error: CLOSED_TEXT[record.state], issues: [] };
  const email = String(fd.get("contact.email") ?? "").trim();
  const r = await submitIntake(kind, fd, {
    apiKey: key, tenantId: link.tenantId, clientCompanyId: link.clientCompanyId,
    submittedBy: email ? `client:${email}` : "client", source: "client_link", dryRun: !liveFilings(),
    // One link, one filing: sending the form again returns the same filing.
    allowSavedSignature: false, idempotencySeed: `${link.clientCompanyId}-${link.nonce}`,
  });
  if (!r.ok) return r;
  if (record) await markLinkUsed(key, link.clientCompanyId, link.nonce, r.result.filing.id);
  return { ok: true, message: "We have your answers. You'll get an email with a link to check exactly what will be filed and approve it before anything is sent to the state." };
}
