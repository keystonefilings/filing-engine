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

/**
 * Florida name endings (decision 18, Nov 26). An LLC ends with LLC, L.L.C. or Limited Liability
 * Company (s.605.0112 F.S.); a professional LLC with PLLC, P.L.L.C., Professional Limited Liability
 * Company or Chartered (s.621.12 F.S.). A profit corporation ends with Corporation, Company,
 * Incorporated or their abbreviations (s.607.0401 F.S.); a professional association with P.A.,
 * Professional Association or Chartered (s.621.12 F.S.). A professional entity must state its
 * professional purpose.
 */
export const FL_PROFESSIONAL_LLC_ENDINGS = ["PROFESSIONAL LIMITED LIABILITY COMPANY", "P.L.L.C.", "PLLC", "CHARTERED"];
export const FL_LLC_ENDINGS = ["LIMITED LIABILITY COMPANY", "L.L.C.", "LLC", ...FL_PROFESSIONAL_LLC_ENDINGS];
export const FL_PROFESSIONAL_CORP_ENDINGS = ["PROFESSIONAL ASSOCIATION", "P.A.", "PA", "CHARTERED"];
export const FL_CORP_ENDINGS = ["CORPORATION", "COMPANY", "INCORPORATED", "CORP.", "CORP", "INC.", "INC", "CO.", "CO", ...FL_PROFESSIONAL_CORP_ENDINGS];

const endsWithWord = (fullName: string, endings: string[]) => {
  const upper = fullName.toUpperCase().trim().replace(/\s+/g, " ");
  return endings.some((e) => upper === e || upper.endsWith(` ${e}`) || upper.endsWith(`,${e}`));
};
/** A Florida LLC (s.605.0112) or professional LLC (s.621.12) name ending. */
export function hasFlLlcEnding(fullName: string): boolean { return endsWithWord(fullName, FL_LLC_ENDINGS); }
/** A Florida profit corporation (s.607.0401) or professional association (s.621.12) name ending. */
export function hasFlCorpEnding(fullName: string): boolean { return endsWithWord(fullName, FL_CORP_ENDINGS); }
/** The name marks a Florida professional entity (PLLC, P.A., Chartered...), which must state its professional purpose. */
export function isFlProfessionalName(fullName: string, floridaEntityType: string | undefined): boolean {
  if (floridaEntityType === "llc") return endsWithWord(fullName, FL_PROFESSIONAL_LLC_ENDINGS);
  if (floridaEntityType === "profit_corporation") return endsWithWord(fullName, FL_PROFESSIONAL_CORP_ENDINGS);
  return false;
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
