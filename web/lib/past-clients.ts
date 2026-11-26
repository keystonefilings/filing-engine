import { engine, type Filing } from "./engine";
export { answersFrom } from "./client-answers.ts";

/**
 * V23: a firm's clients, from its earlier filings (no separate address book to keep up to date).
 * A new filing can start from one: the client's contact, business and mailing addresses, and the
 * first member, signer and organizer. Never the new entity's name, and never anything sensitive
 * (SSNs are masked by the engine anyway and not copied).
 */
export interface PastClient { filingId: string; label: string; email: string; createdAt: string }

export async function pastClients(apiKey: string, company: string): Promise<PastClient[]> {
  const { filings } = await engine<{ filings: Filing[] }>(apiKey, `/v1/filings?clientCompanyId=${encodeURIComponent(company)}`).catch(() => ({ filings: [] as Filing[] }));
  const seen = new Map<string, PastClient>();
  for (const f of filings) {
    const c = (f.request as { contact?: { firstName?: string; lastName?: string; email?: string } }).contact;
    if (!c?.email || seen.has(c.email.toLowerCase())) continue;
    const r = f.request as { formation?: { name?: { baseName?: string; designator?: string } }; payroll?: { legalName?: string } };
    const entity = r.formation?.name?.baseName ? `${r.formation.name.baseName} ${r.formation.name.designator ?? ""}`.trim() : r.payroll?.legalName;
    seen.set(c.email.toLowerCase(), { filingId: f.id, email: c.email, createdAt: f.createdAt, label: `${[c.firstName, c.lastName].filter(Boolean).join(" ")}${entity ? ` (${entity})` : ""}` });
  }
  return [...seen.values()].slice(0, 100);
}

