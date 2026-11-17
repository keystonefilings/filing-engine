import type { FilingRequest } from "./filing.js";
import { hasLlcIndicator, fullLegalName } from "./name.js";

export interface ValidationIssue {
  path: string;
  message: string;
  severity: "error" | "warning";
}

/** Words that need consent or are restricted in NY entity names; flagged, not blocked. */
const NY_RESTRICTED_WORDS = [
  "bank", "banking", "trust", "insurance", "assurance", "annuity", "attorney",
  "lawyer", "doctor", "finance", "financial", "investment", "loan", "mortgage",
  "savings", "school", "university", "college", "education", "cooperative",
  "exchange", "board of trade", "chamber of commerce", "state police", "urban development",
];

/**
 * Pre-run validation, per decision rule 1: all data verified before the run starts.
 * Schema validity is assumed (zod ran first); this layer applies state rules.
 */
export function validateFiling(req: FilingRequest): ValidationIssue[] {
  const issues: ValidationIssue[] = [];
  const err = (path: string, message: string) => issues.push({ path, message, severity: "error" });
  const warn = (path: string, message: string) => issues.push({ path, message, severity: "warning" });

  if (req.type === "formation" || req.type === "ein_only") {
    if (!req.formation) err("formation", "formation details are required");
  }

  if (req.formation) {
    const f = req.formation;
    const legal = fullLegalName(f.name);

    if (/\b(llc|l\.l\.c\.)\b/i.test(f.name.baseName)) {
      err("formation.name.baseName", "baseName must not contain the designator; put it in designator");
    }

    if (req.state === "NY") {
      if (!hasLlcIndicator(legal)) err("formation.name", "NY requires an LLC type indicator in the name");
      if (!f.county) err("formation.county", "NY requires the county");
      if (!f.serviceOfProcess) err("formation.serviceOfProcess", "NY requires service of process details");
      else if (f.serviceOfProcess.mode === "manual") {
        if (!f.serviceOfProcess.person?.address) err("formation.serviceOfProcess.person", "address required for manual service of process");
        if (!f.serviceOfProcess.noticeEmail) err("formation.serviceOfProcess.noticeEmail", "Secretary of State notice email required");
      } else if (!f.serviceOfProcess.serviceCompany) {
        err("formation.serviceOfProcess.serviceCompany", "service company name required");
      }
      if (!f.managementStructure) err("formation.managementStructure", "NY requires the management structure");
      if (!f.organizer?.address) err("formation.organizer", "NY requires organizer name and address");
      if (!f.filer?.address) err("formation.filer", "NY requires filer name and address");
      if (f.effectiveDate === "specific" && !f.effectiveDateValue) err("formation.effectiveDateValue", "effective date value required");
      if (f.registeredAgent && f.registeredAgent.address && f.registeredAgent.address.state !== "NY") {
        err("formation.registeredAgent.address.state", "NY registered agent address must be in NY");
      }
      const lower = legal.toLowerCase();
      for (const w of NY_RESTRICTED_WORDS) {
        if (lower.includes(w)) warn("formation.name", `name contains restricted word "${w}" (consent or approval may be required)`);
      }
    }

    if (req.state === "NJ") {
      if (f.members.length < 1) err("formation.members", "NJ requires at least one member");
      if (f.signers.length < 1) err("formation.signers", "NJ requires at least one signer");
      for (const [i, m] of f.members.entries()) {
        if (!m.address) err(`formation.members[${i}].address`, "NJ member address is required");
      }
      for (const [i, s] of f.signers.entries()) {
        if (!s.title) err(`formation.signers[${i}].title`, "NJ signer title is required");
      }
      if (!f.registeredAgent?.address) err("formation.registeredAgent", "NJ requires a registered agent with address");
      else if (f.registeredAgent.address.state !== "NJ") err("formation.registeredAgent.address.state", "NJ registered agent must be in NJ");
      if (f.purpose && f.purpose.length > 300) err("formation.purpose", "NJ business purpose is limited to 300 characters");
      if (f.otherProvisions.length) err("formation.otherProvisions", "NJ Other Provisions entry is not mapped yet (Add New Provision dialog not walked)");
    }
  }

  if (req.ein && req.ein.mode !== "none") {
    const rp = req.ein.responsibleParty;
    if (!rp) err("ein.responsibleParty", "responsible party is required for an EIN application");
    if (!req.formation?.mainBusinessAddress) {
      err("formation.mainBusinessAddress", "an EIN application needs the LLC's address");
    }
    if (!req.ein.ss4AuthorizationArtifactId) {
      err("ein.ss4AuthorizationArtifactId", "signed Form SS-4 third-party designee authorization is required");
    }
    if (req.ein.memberCount === undefined && req.formation) {
      // derive silently; informational
    }
  }

  if (req.type === "standing_certificate") {
    if (req.formation) warn("formation", "standing certificate requests do not use formation details");
    if (req.state === "NY") err("state", "NY Certificate of Status is a written request, not an online filing; it goes through the paper-upload engine (build order 7)");
    else if (!req.standing) err("standing", "standing certificate details are required (entityName, form)");
    if (req.ein && req.ein.mode !== "none") err("ein", "an EIN is not part of a standing certificate request");
  }

  return issues;
}

export function hasErrors(issues: ValidationIssue[]): boolean {
  return issues.some((i) => i.severity === "error");
}
