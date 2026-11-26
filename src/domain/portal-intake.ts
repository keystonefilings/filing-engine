import type { FilingRequest } from "./filing.js";

/**
 * Answers the front end's intake forms keep on the filing under `intake.portal` for fields the
 * engine had no first-class place for yet (web/lib/intake/forms.ts; docs/portal-maps/INTAKE-COVERAGE.md).
 */
export function portalAnswer(req: Pick<FilingRequest, "intake">, key: string): unknown {
  const portal = (req.intake as { portal?: Record<string, unknown> } | undefined)?.portal;
  return portal ? portal[key] : undefined;
}

/** A checkbox answer: true, "on", "yes" or "true". */
export function portalFlag(req: Pick<FilingRequest, "intake">, key: string): boolean {
  const v = portalAnswer(req, key);
  return v === true || (typeof v === "string" && /^(on|yes|true)$/i.test(v));
}

/** A text answer, trimmed, or undefined when absent or blank. */
export function portalText(req: Pick<FilingRequest, "intake">, key: string): string | undefined {
  const v = portalAnswer(req, key);
  return typeof v === "string" && v.trim() ? v.trim() : undefined;
}

/** NY "Plain Copy": the engine's own field (formation, or a dissolution, amendment or change), or the front end's portal answer. */
export function wantsPlainCopy(req: FilingRequest): boolean {
  return !!req.formation?.additionalCertificates.plainCopy || !!req.dissolution?.plainCopy || !!req.amendment?.plainCopy
    || !!req.certificateOfChange?.plainCopy || portalFlag(req, "plainCopy");
}
