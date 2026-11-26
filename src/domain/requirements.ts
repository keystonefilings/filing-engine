import type { FilingRequest } from "./filing.js";

export interface FieldRequirement {
  path: string;
  label: string;
  /** required = the state mandates it (cannot be skipped). optional = the state allows it empty. */
  requirement: "required" | "optional";
}

/**
 * The information a filing needs, declaratively, per type/state. Required fields are
 * state-mandated. Optional fields are collectable-but-not-mandated: a tenant can mark them
 * "required" (they always want them) or "not_needed" (skip), and in strict mode optionals are
 * required unless marked not_needed (completeness.ts applies the tenant's config).
 * The registered agent is intentionally absent here — RegisteredAgentService resolves it.
 */
export function fieldRequirements(req: FilingRequest): FieldRequirement[] {
  const R = (path: string, label: string): FieldRequirement => ({ path, label, requirement: "required" });
  const O = (path: string, label: string): FieldRequirement => ({ path, label, requirement: "optional" });
  const out: FieldRequirement[] = [];

  if (req.type === "formation") {
    out.push(R("formation.name.baseName", "entity name"), R("formation.name.designator", "entity designator"));
    if (req.state === "NY") out.push(
      R("formation.county", "NY county"),
      // An LLC names its organizer and management; a business corporation its shares and incorporator.
      ...(req.formation?.nyEntityType === "business_corporation"
        ? [R("formation.stockShares", "number of shares"), R("formation.incorporator", "incorporator")]
        : [R("formation.managementStructure", "management structure"), R("formation.organizer", "organizer")]),
      R("formation.filer", "filer"),
      R("formation.serviceOfProcess", "service of process"),
      O("formation.mainBusinessAddress", "principal business address"),
    );
    if (req.state === "NJ") out.push(
      // An LLC lists members and signers; a for-profit corporation its shares, directors and incorporators (who sign).
      ...(req.formation?.njEntityType === "for_profit_corporation"
        ? [R("formation.stockShares", "total number of shares"), R("formation.directors", "directors"), R("formation.incorporators", "incorporators")]
        : [R("formation.members", "members"), R("formation.signers", "signers")]),
      O("formation.mainBusinessAddress", "principal business address"),
      O("formation.purpose", "business purpose"),
      O("formation.naicsCode", "NAICS code"),
    );
    if (req.state === "MO") out.push(
      R("formation.managementStructure", "management structure"),
      R("formation.purpose", "business purpose"),
      R("formation.mainBusinessAddress", "principal office address"),
    );
    if (req.state === "FL") {
      out.push(R("formation.mainBusinessAddress", "principal business address"), O("formation.purpose", "business purpose"));
      if (req.formation?.floridaEntityType === "profit_corporation") out.push(R("formation.stockShares", "authorized shares"), R("formation.incorporator", "incorporator"));
      if (req.formation?.floridaEntityType === "limited_partnership") out.push(R("formation.generalPartners", "general partners"));
    }
  }

  if (req.type === "payroll_registration") {
    out.push(R("payroll.legalName", "legal business name"), R("payroll.businessAddress", "business address"), R("payroll.owners", "owners/officers"));
    out.push(O("payroll.tradeName", "trade name"), O("payroll.mailingAddress", "mailing address"));
    if (req.state === "NY") out.push(R("payroll.fein", "FEIN"), R("payroll.dateFirstOperations", "date of first NY operations"));
    if (req.state === "NJ") out.push(R("payroll.beginDate", "business begin date"), O("payroll.naics", "NAICS code"));
  }

  if (req.type === "ein_only" || (req.ein && req.ein.mode !== "none")) {
    out.push(
      R("ein.responsibleParty", "EIN responsible party"),
      R("ein.formationState", "formation state"),
      R("ein.businessActivity.category", "principal business activity"),
      O("ein.tradeName", "trade name"),
    );
  }

  if (req.type === "standing_certificate") {
    out.push(R("standing.entityName", "entity name"), O("standing.form", "certificate form"));
    if (req.state === "NJ") out.push(R("standing.entityType", "entity type"));
    if (req.state === "NY") out.push(R("standing.dosId", "DOS ID"));
  }

  // NY DOS record filings (Screens G to J).
  if (req.type === "dissolution") out.push(R("dissolution.entity", "the LLC's DOS ID and exact name"), R("dissolution.reason", "reason for dissolution"), R("dissolution.signer", "signer"));
  if (req.type === "amendment" && req.state === "NY") out.push(R("amendment.entity", "the LLC's DOS ID and exact name"), R("amendment.newName", "new name"), R("amendment.signer", "signer"));
  if (req.type === "certificate_of_change") out.push(R("certificateOfChange.entity", "the LLC's DOS ID and exact name"), R("certificateOfChange.signer", "signer"));
  if (req.type === "copy_request") out.push(R("copyRequest.entity.dosId", "DOS ID"), R("copyRequest.documents", "documents to copy"));

  return out;
}
