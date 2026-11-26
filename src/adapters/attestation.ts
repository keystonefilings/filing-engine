import type { FilingRequest } from "../domain/filing.js";

/**
 * Attestations, typed signatures and certification ticks that a portal asks of a real person.
 * The client grants each one on the intake form (the kind's `authorizations` in
 * web/lib/intake/forms.ts); web/lib/intake/build.ts records the grant under
 * `intake.portal.authorizations` with its text, who granted it and when.
 *
 * Adapters tick such a box only on a live run, only inside the submit guard, and only when the
 * grant is on file. Consent is never inferred from anything else (an approval of the data, a
 * signer's name, a default). A dry run never ticks one.
 */
export interface GrantedAuthorization { id: string; text: string; ref?: string; grantedAt: string; grantedBy: string }

const nonEmpty = (v: unknown): v is string => typeof v === "string" && v.trim().length > 0;

/** The grant with this id, or null when the filing carries none. */
export function grantedAuthorization(req: Pick<FilingRequest, "intake">, id: string): GrantedAuthorization | null {
  const list = (req.intake as { portal?: { authorizations?: unknown } } | undefined)?.portal?.authorizations;
  if (!Array.isArray(list)) return null;
  for (const a of list) {
    if (!a || typeof a !== "object") continue;
    const g = a as Record<string, unknown>;
    if (g.id === id && nonEmpty(g.text) && nonEmpty(g.grantedAt) && nonEmpty(g.grantedBy)) {
      return { id, text: g.text, ref: typeof g.ref === "string" ? g.ref : undefined, grantedAt: g.grantedAt, grantedBy: g.grantedBy };
    }
  }
  return null;
}

/** The ids not granted on this filing. */
export function missingAuthorizations(req: Pick<FilingRequest, "intake">, ids: readonly string[]): string[] {
  return ids.filter((id) => !grantedAuthorization(req, id));
}

/** Every id must be granted. Returns the grants, or throws naming the missing ones (call it before the submit guard). */
export function requireAuthorizations(req: Pick<FilingRequest, "intake">, ids: readonly string[], where: string): GrantedAuthorization[] {
  const missing = missingAuthorizations(req, ids);
  if (missing.length) {
    throw new Error(`${where} needs the client's own attestation (${missing.join(", ")}); it is not on file for this filing, so nothing was ticked`);
  }
  return ids.map((id) => grantedAuthorization(req, id)!);
}
