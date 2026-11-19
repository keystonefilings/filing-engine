import type { FilingRequest } from "./filing.js";
import { fieldRequirements } from "./requirements.js";

export interface CompletenessConfig {
  /** When true, optional fields are required unless marked not_needed (Yakov's model). */
  strictOptional: boolean;
  /** Per-field overrides: force an optional field required, or skip it. not_needed cannot drop a state-mandated field. */
  overrides: Record<string, "required" | "not_needed">;
}

export const DEFAULT_COMPLETENESS: CompletenessConfig = { strictOptional: false, overrides: {} };

export interface MissingField { path: string; label: string; }
export interface CompletenessResult {
  complete: boolean;
  missing: MissingField[];
  /** The paths that were required (after config) and checked. */
  checked: string[];
}

function getByPath(obj: unknown, path: string): unknown {
  return path.split(".").reduce<unknown>((acc, k) => (acc && typeof acc === "object" ? (acc as Record<string, unknown>)[k] : undefined), obj);
}
function isPresent(v: unknown): boolean {
  if (v === undefined || v === null) return false;
  if (typeof v === "string") return v.trim().length > 0;
  if (Array.isArray(v)) return v.length > 0;
  return true;
}

/**
 * Verifies a filing has every piece of information it needs, before the run. Required (state-
 * mandated) fields are always checked; optional fields are checked when the tenant marked them
 * required or turned on strict mode, and skipped when marked not_needed. Returns the missing
 * fields so the engine can ask for them.
 */
export function checkCompleteness(req: FilingRequest, config: CompletenessConfig = DEFAULT_COMPLETENESS): CompletenessResult {
  const missing: MissingField[] = [];
  const checked: string[] = [];
  for (const fr of fieldRequirements(req)) {
    const override = config.overrides[fr.path];
    let required: boolean;
    if (fr.requirement === "required") required = true; // state-mandated; not_needed cannot drop it
    else if (override === "not_needed") required = false;
    else if (override === "required") required = true;
    else required = config.strictOptional;
    if (!required) continue;
    checked.push(fr.path);
    if (!isPresent(getByPath(req, fr.path))) missing.push({ path: fr.path, label: fr.label });
  }
  return { complete: missing.length === 0, missing, checked };
}
