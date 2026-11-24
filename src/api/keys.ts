import { createHash, timingSafeEqual } from "node:crypto";

/**
 * Caller and staff credentials from the environment. Outside production a development key
 * ("dev-key" for tenant keystone) keeps local work simple; in production nothing has a default:
 * a missing, placeholder or short key stops the process at start instead of leaving the API open.
 */
const PLACEHOLDER = /change-me/i;
const MIN_KEY = 24;
const MIN_SECRET = 32;
export const DEV_SIGNING_SECRET = "dev-only-secret-not-for-production";

/** API_KEYS="key:tenantId,key2:tenantId2" -> key -> tenantId. Errors name the entry's position, never its text. */
export function parseApiKeys(spec: string | undefined, production: boolean): Record<string, string> {
  if (!spec?.trim()) {
    if (production) throw new Error("API_KEYS must be set in production (key:tenantId, comma separated)");
    return { "dev-key": "keystone" };
  }
  const out: Record<string, string> = {};
  for (const [i, entry] of spec.split(",").map((s) => s.trim()).filter(Boolean).entries()) {
    const c = entry.indexOf(":");
    if (c < 1 || c === entry.length - 1) throw new Error(`API_KEYS entry ${i + 1} must look like key:tenantId`);
    const key = entry.slice(0, c);
    if (production && (key.length < MIN_KEY || PLACEHOLDER.test(key))) throw new Error(`API_KEYS entry ${i + 1}: use a random key of at least ${MIN_KEY} characters in production`);
    out[key] = entry.slice(c + 1);
  }
  return out;
}

/**
 * STAFF_API_KEYS="key:identity,key2:identity2": platform staff, presented in x-api-key like a
 * tenant key. Only staff change tenant settings and decide drift reviews; the identity is
 * recorded as the reviewer. Required in production: without it nothing can be configured.
 */
export function parseStaffKeys(spec: string | undefined, production: boolean): Record<string, string> {
  if (!spec?.trim()) {
    if (production) throw new Error("STAFF_API_KEYS must be set in production (key:identity, comma separated): only staff can create tenants and review site changes");
    return {};
  }
  const out: Record<string, string> = {};
  for (const [i, entry] of spec.split(",").map((s) => s.trim()).filter(Boolean).entries()) {
    const c = entry.indexOf(":");
    if (c < 1 || c === entry.length - 1) throw new Error(`STAFF_API_KEYS entry ${i + 1} must look like key:identity`);
    const key = entry.slice(0, c);
    if (production && (key.length < MIN_KEY || PLACEHOLDER.test(key))) throw new Error(`STAFF_API_KEYS entry ${i + 1}: use a random key of at least ${MIN_KEY} characters in production`);
    out[key] = entry.slice(c + 1);
  }
  return out;
}

/** The approval-link signing secret. In production it must be set, random-looking and not the development default. */
export function signingSecretFrom(value: string | undefined, production: boolean): string {
  if (!production) return value || DEV_SIGNING_SECRET;
  if (!value || value === DEV_SIGNING_SECRET || value.length < MIN_SECRET || PLACEHOLDER.test(value)) {
    throw new Error(`APPROVAL_SIGNING_SECRET must be set to a random value of at least ${MIN_SECRET} characters in production (it signs approval and admin links)`);
  }
  return value;
}

/** Constant-time lookup: the value for a presented key, or null (hashing first makes lengths equal). */
export function lookupKey(table: Record<string, string>, candidate: string): string | null {
  if (!candidate) return null;
  const c = createHash("sha256").update(candidate).digest();
  let hit: string | null = null;
  for (const [k, v] of Object.entries(table)) if (timingSafeEqual(c, createHash("sha256").update(k).digest())) hit = v;
  return hit;
}

/** Constant-time membership check. */
export function keyMatches(candidate: string, keys: readonly string[]): boolean {
  return lookupKey(Object.fromEntries(keys.map((k) => [k, "1"])), candidate) !== null;
}
