import type { EntityName, Site } from "./filing.js";

/** Indicators NY accepts for an LLC name (DOS rejects a name without one). */
export const NY_LLC_INDICATORS = ["LLC", "L.L.C.", "LIMITED LIABILITY COMPANY"];

export function normalizeDesignator(d: string): string {
  return d.trim().toUpperCase().replace(/\s+/g, " ");
}

export function hasLlcIndicator(fullName: string): boolean {
  const upper = fullName.toUpperCase().trim();
  return NY_LLC_INDICATORS.some((ind) => upper.endsWith(ind));
}

/** Indicators a NY business corporation name must end with (BCL s.301); DOS rejects a name without one. */
export const NY_CORP_INDICATORS = ["CORPORATION", "CORP.", "CORP", "INCORPORATED", "INC.", "INC", "LIMITED", "LTD.", "LTD"];

export function hasCorpIndicator(fullName: string): boolean {
  return /(^|\s)(CORPORATION|CORP\.?|INCORPORATED|INC\.?|LIMITED|LTD\.?)$/.test(fullName.toUpperCase().trim());
}

/**
 * NJ wants the name WITHOUT the designator (its own screen); NY wants the indicator
 * inside the single name field; IRS wants the full legal name.
 */
export function renderName(name: EntityName, site: Site): { nameField: string; designator?: string } {
  const designator = normalizeDesignator(name.designator);
  const full = `${name.baseName.trim()} ${designator}`;
  switch (site) {
    case "NJ":
      return { nameField: name.baseName.trim(), designator };
    case "NY":
    case "MO":
    case "FL":
    case "IRS":
      return { nameField: full };
  }
}

export function fullLegalName(name: EntityName): string {
  return renderName(name, "IRS").nameField;
}
