import { engine, EngineError } from "./engine";

/** V26: the engine's record of each client link (list, revoke, one use). */
export interface IntakeLink {
  id: string; kind: string; label?: string; createdAt: string; createdBy?: string; expiresAt?: string;
  revokedAt?: string; usedAt?: string; filingId?: string; state: "open" | "used" | "revoked" | "expired";
}

const path = (company: string, id?: string, action?: string) =>
  `/v1/client-companies/${encodeURIComponent(company)}/intake-links${id ? `/${encodeURIComponent(id)}` : ""}${action ? `/${action}` : ""}`;

export async function recordLink(apiKey: string, company: string, l: { id: string; kind: string; label?: string; expiresAt: string }): Promise<void> {
  await engine(apiKey, path(company), { method: "POST", body: l });
}

/** The link's record; null for a link made before records existed (it works until it expires). */
export async function linkRecord(apiKey: string, company: string, id: string): Promise<IntakeLink | null> {
  try {
    return (await engine<{ link: IntakeLink }>(apiKey, path(company, id))).link;
  } catch (e) {
    if (e instanceof EngineError && e.status === 404) return null;
    throw e;
  }
}

export async function listLinks(apiKey: string, company: string): Promise<IntakeLink[]> {
  return (await engine<{ links: IntakeLink[] }>(apiKey, path(company))).links;
}

export async function revokeLink(apiKey: string, company: string, id: string): Promise<void> {
  await engine(apiKey, path(company, id, "revoke"), { method: "POST", body: {} });
}

export async function markLinkUsed(apiKey: string, company: string, id: string, filingId: string): Promise<void> {
  await engine(apiKey, path(company, id, "used"), { method: "POST", body: { filingId } }).catch(() => undefined);
}

export const CLOSED_TEXT: Record<Exclude<IntakeLink["state"], "open">, string> = {
  used: "This link was already used. Ask whoever sent it for a new one if you need to file again.",
  revoked: "This link was turned off by whoever sent it. Ask them for a new one.",
  expired: "This link has expired. Ask whoever sent it for a new one.",
};
