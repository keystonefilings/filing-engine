"use server";

import { revalidatePath } from "next/cache";
import { engine, EngineError } from "./engine";
import { firmContext } from "./firm";

/** Decision 37: a partner firm's own email domain (merged spec 10B.5.1), as the engine keeps it. */
export interface DomainRecord { record: string; type: string; name: string; value: string; priority?: number; status: "found" | "missing" }
export interface EmailDomainView {
  emailDomain: { domain: string; status: "pending" | "verified" | "failed"; checkedAt?: string } | null;
  records: DomainRecord[];
  available: boolean;
  error?: string;
}
export type DomainState = (EmailDomainView & { problem?: "invalid" | "unusable" | "unavailable" | "failed" }) | null;

const path = (company: string, rest = "") => `/v1/client-companies/${encodeURIComponent(company)}/email-domain${rest}`;

export async function loadEmailDomain(slug: string): Promise<EmailDomainView> {
  const { session } = await firmContext(slug);
  return engine<EmailDomainView>(session.apiKey, path(session.clientCompanyId)).catch(() => ({ emailDomain: null, records: [], available: false }));
}

async function run(slug: string, method: string, rest: string, body?: unknown): Promise<DomainState> {
  const { session } = await firmContext(slug);
  try {
    const r = await engine<EmailDomainView>(session.apiKey, path(session.clientCompanyId, rest), { method, body });
    revalidatePath(`/p/${encodeURIComponent(slug)}/setup`);
    return r;
  } catch (e) {
    const prev = await loadEmailDomain(slug);
    if (e instanceof EngineError && e.status === 503) return { ...prev, problem: "unavailable" };
    if (e instanceof EngineError && e.status === 422) {
      const m = (e.body as { issues?: { message: string }[] })?.issues?.[0]?.message;
      return { ...prev, problem: m === "unusable" ? "unusable" : "invalid" };
    }
    return { ...prev, problem: "failed" };
  }
}

export async function connectDomain(slug: string, _prev: DomainState, fd: FormData): Promise<DomainState> {
  return run(slug, "PUT", "", { domain: String(fd.get("domain") ?? "").slice(0, 300) });
}
export async function checkDomain(slug: string): Promise<DomainState> {
  return run(slug, "POST", "/check", {});
}
export async function disconnectDomain(slug: string): Promise<DomainState> {
  return run(slug, "DELETE", "");
}
