/**
 * The filing desk for the checks: an in-memory engine (web/design/BUILDING.md, step 5) with one firm, Harbor & Pine
 * CPA, and a few filings, and a desk session for it sealed the way the site seals its own.
 */
import { existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { seal } from "../lib/seal.ts";

export const REPO_ROOT = join(dirname(fileURLToPath(import.meta.url)), "..", "..");
export const ENGINE_PORT = Number(process.env.CHECKS_ENGINE_PORT ?? 8093);
export const ENGINE_URL = `http://127.0.0.1:${ENGINE_PORT}`;
/** Placeholders for a throwaway engine that only ever listens on this machine. */
export const ENGINE_KEY = "checks-desk-key-0123456789abcdef";
const STAFF_KEY = "checks-staff-key-0123456789abcdef";
export const ENGINE_ENV = {
  PORT: String(ENGINE_PORT), WORKER_ENABLED: "false",
  API_KEYS: `${ENGINE_KEY}:acme`, STAFF_API_KEYS: `${STAFF_KEY}:ops@acme`,
  APPROVAL_SIGNING_SECRET: "checks-approval-secret-0123456789abcdef",
};
/** The site's own secret when the caller set one (CI does), so a session sealed here opens there. */
export const SESSION_SECRET = process.env.PORTAL_SESSION_SECRET ?? "checks-only-not-a-real-secret-0123456789abcdef";
export const FIRM_SLUG = "harbor-pine";

/** The engine's runner, when the repository's own dependencies are installed (npm ci at the root). */
export function engineRunner(): string | null {
  for (let dir = REPO_ROOT; ; dir = dirname(dir)) {
    const bin = join(dir, "node_modules", ".bin", "tsx");
    if (existsSync(bin)) return bin;
    if (dirname(dir) === dir) return null;
  }
}

async function call(method: string, path: string, body: unknown, key = ENGINE_KEY): Promise<{ status: number; json: Record<string, unknown> }> {
  const res = await fetch(ENGINE_URL + path, { method, headers: { "x-api-key": key, "content-type": "application/json" }, body: JSON.stringify(body) });
  return { status: res.status, json: (await res.json().catch(() => ({}))) as Record<string, unknown> };
}

const address = (street1: string, city: string, state: string, zip: string) => ({ street1, city, state, zip });

function formation(key: string, baseName: string, member: string, email: string) {
  const home = address("22 River Rd", "Hoboken", "NJ", "07030");
  return {
    clientCompanyId: "harbor-pine", idempotencyKey: key, type: "formation", state: "NJ",
    formation: {
      entityType: "LLC", name: { baseName, designator: "LLC" }, effectiveDate: "upon_filing", mainBusinessAddress: home,
      registeredAgent: { name: "Acme Agents Inc", address: address("9 Agent Way", "Newark", "NJ", "07102") },
      members: [{ name: member, address: home }], signers: [{ name: member, title: "Authorized Representative" }],
      otherProvisions: [], additionalCertificates: { certificateOfStanding: false, certifiedCopy: false },
    },
    contact: { firstName: member.split(" ")[0], lastName: member.split(" ")[1], phone: "2015550100", email },
  };
}

/** Puts the firm and its filings in the engine. Safe to run again: the same ids and idempotency keys each time. */
export async function seedDesk(): Promise<{ filingId: string }> {
  const t = await call("PUT", "/v1/tenants/acme", { name: "Acme Filings" }, STAFF_KEY);
  if (t.status !== 200) throw new Error(`engine refused the tenant: ${t.status} ${JSON.stringify(t.json)}`);
  const c = await call("PUT", "/v1/client-companies/harbor-pine", { name: "Harbor & Pine CPA", einMode: "after_acceptance", portal: { slug: FIRM_SLUG } });
  if (c.status !== 200) throw new Error(`engine refused the firm: ${c.status} ${JSON.stringify(c.json)}`);
  let filingId = "";
  for (const [key, name, member, email] of [
    ["checks-filing-two-sisters", "Two Sisters Bakery", "Ana Ortiz", "ana@example.test"],
    ["checks-filing-hudson-ledger", "Hudson Ledger", "Sam Rivera", "sam@example.test"],
  ] as const) {
    const f = await call("POST", "/v1/filings", formation(key, name, member, email));
    if (f.status !== 200 && f.status !== 201) throw new Error(`engine refused a filing: ${f.status} ${JSON.stringify(f.json)}`);
    filingId ||= String((f.json.filing as { id: string }).id);
  }
  return { filingId };
}

/** The desk's session cookie for Harbor & Pine, as the site's own sign-in would set it. */
export function deskCookie(base: string) {
  const value = seal("session", { kind: "firm", apiKey: ENGINE_KEY, tenantId: "acme", clientCompanyId: "harbor-pine", slug: FIRM_SLUG, email: "owner@example.test", signedInWith: "invite" }, 3600, SESSION_SECRET);
  return { name: "kfe_session", value, url: base };
}
