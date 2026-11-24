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
  if (req.type === "ein_only") {
    // The LLC already exists; its details identify it to the IRS. State formation rules below do not apply.
    if (!req.ein || req.ein.mode === "none") err("ein", "an EIN-only filing needs the EIN request (ein)");
    else if (!req.ein.startDate) err("ein.startDate", "an EIN-only filing needs the LLC start date");
  }

  if (req.formation) {
    const f = req.formation;
    const legal = fullLegalName(f.name);
    // When the filing defers the registered agent to the filing company (or needs none),
    // the agent is resolved from tenant provisioning, not the request; don't require it here.
    const raFromTenant = f.registeredAgentChoice === "filing_company" || f.registeredAgentChoice === "none";

    if (/\b(llc|l\.l\.c\.)\b/i.test(f.name.baseName)) {
      err("formation.name.baseName", "baseName must not contain the designator; put it in designator");
    }

    if (req.type === "formation" && req.state === "NY") {
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

    if (req.type === "formation" && req.state === "NJ") {
      if (f.members.length < 1) err("formation.members", "NJ requires at least one member");
      if (f.signers.length < 1) err("formation.signers", "NJ requires at least one signer");
      for (const [i, m] of f.members.entries()) {
        if (!m.address) err(`formation.members[${i}].address`, "NJ member address is required");
      }
      for (const [i, s] of f.signers.entries()) {
        if (!s.title) err(`formation.signers[${i}].title`, "NJ signer title is required");
      }
      if (!raFromTenant && !f.registeredAgent?.address) err("formation.registeredAgent", "NJ requires a registered agent with address");
      else if (f.registeredAgent?.address && f.registeredAgent.address.state !== "NJ") err("formation.registeredAgent.address.state", "NJ registered agent must be in NJ");
      if (f.purpose && f.purpose.length > 300) err("formation.purpose", "NJ business purpose is limited to 300 characters");
      if (f.otherProvisions.length) err("formation.otherProvisions", "NJ Other Provisions entry is not mapped yet (Add New Provision dialog not walked)");
    }

    if (req.type === "formation" && req.state === "MO") {
      if (!hasLlcIndicator(legal)) err("formation.name", "MO requires an LLC indicator in the name");
      if (!f.managementStructure) err("formation.managementStructure", "MO requires the management structure (member or manager managed)");
      if (!f.purpose) err("formation.purpose", "MO requires a stated purpose");
      if (!raFromTenant && !f.registeredAgent?.address) err("formation.registeredAgent", "MO requires a registered agent with an address");
      else if (f.registeredAgent?.address && f.registeredAgent.address.state !== "MO") err("formation.registeredAgent.address.state", "MO registered agent must have a Missouri address");
      const organizers = f.organizers.length ? f.organizers : f.members;
      if (organizers.length < 1) err("formation.organizers", "MO requires at least one organizer");
      if (organizers.length > 5) err("formation.organizers", "MO online filing allows at most 5 organizers; 6 or more needs a paper filing");
      if (!f.mainBusinessAddress) err("formation.mainBusinessAddress", "MO requires the principal office address");
      if (!f.moSigner && !f.signers.length) err("formation.moSigner", "MO requires a signer");
      if (f.seriesLlc) err("formation.seriesLlc", "MO Series LLC needs an LLC 1A upload, which is not mapped yet");
    }

    if (req.type === "formation" && req.state === "FL") {
      const flType = f.floridaEntityType;
      if (!f.mainBusinessAddress) err("formation.mainBusinessAddress", "FL requires the principal place of business address");
      const agent = f.registeredAgent;
      if (!raFromTenant && !agent?.address) err("formation.registeredAgent", "FL requires a registered agent with an address");
      else if (agent?.address && agent.address.state !== "FL") err("formation.registeredAgent.address.state", "FL registered agent must have a Florida address");
      if (f.purpose && f.purpose.length > 240) err("formation.purpose", "FL purpose is limited to 240 characters");
      if (flType === "llc") {
        if (!hasLlcIndicator(legal)) err("formation.name", "FL requires an LLC indicator in the name");
        if (f.authorizedPersons.length > 6) err("formation.authorizedPersons", "FL online filing lists at most 6 authorized persons");
      } else if (flType === "profit_corporation") {
        if (!f.stockShares) err("formation.stockShares", "FL profit corporation requires the number of authorized shares");
        if (!f.incorporator?.address) err("formation.incorporator", "FL profit corporation requires an incorporator with an address");
        if (f.authorizedPersons.length > 6) err("formation.authorizedPersons", "FL online filing lists at most 6 officers/directors");
      } else if (flType === "limited_partnership") {
        if (f.generalPartners.length < 1) err("formation.generalPartners", "FL limited partnership requires at least one general partner");
        if (f.generalPartners.length > 6) err("formation.generalPartners", "FL online filing lists at most 6 general partners");
      }
    }
  }

  if (req.ein && req.ein.mode !== "none") {
    if (req.type === "formation" && req.state === "FL" && req.ein.mode === "in_run") {
      err("ein.mode", "Florida filings are reviewed by a document examiner (not instant); apply for the EIN after the state accepts the filing (mode after_acceptance)");
    }
    const rp = req.ein.responsibleParty;
    if (!rp) err("ein.responsibleParty", "responsible party is required for an EIN application");
    if (!req.formation?.mainBusinessAddress) {
      err("formation.mainBusinessAddress", "an EIN application needs the LLC's address");
    }
    if (req.ein.applicantRole === "third_party_designee" && !req.ein.ss4AuthorizationArtifactId) {
      err("ein.ss4AuthorizationArtifactId", "a third-party designee EIN application needs a signed Form SS-4 authorization");
    }
    // Additional Details stage (live owner-route walk): the LLC's identity is required.
    if (!req.ein.formationState) err("ein.formationState", "the EIN interview needs the state where the Articles are filed");
    if (!req.ein.businessActivity?.category) err("ein.businessActivity", "the EIN interview needs a principal business activity category");
    // These are required in the live UI and must come from intake before the run; flag when absent.
    if (!req.ein.regulated) warn("ein.regulated", "the four regulated-activity answers are required on the live form; supply them from intake");
    if (!req.ein.employees) warn("ein.employees", "the W-2 employees question is required on the live form; supply it from intake");
    if (!req.ein.county && !req.formation?.county) warn("ein.county", "the EIN interview asks for the physical county; supply it from intake");
    if (req.ein.physicalState === undefined && req.formation?.mainBusinessAddress) {
      // physical state can derive from the main address; informational
    }
  }

  if (req.type === "standing_certificate") {
    if (req.formation) warn("formation", "standing certificate requests do not use formation details");
    if (req.state === "NY") err("state", "NY Certificate of Status is a written request, not an online filing; it goes through the paper-upload engine (build order 7)");
    else if (!req.standing) err("standing", "standing certificate details are required (entityName, form)");
    else if (req.state === "NJ" && !req.standing.entityType) err("standing.entityType", "NJ standing certificates are priced by entity type, so the entity type is required");
    if (req.ein && req.ein.mode !== "none") err("ein", "an EIN is not part of a standing certificate request");
  }

  if (req.type === "payroll_registration") {
    if (req.state !== "NY" && req.state !== "NJ") err("state", "payroll registration is mapped for NY (NYS-100) and NJ (NJ-REG) only");
    if (req.formation) warn("formation", "payroll registration requests do not use formation details");
    const p = req.payroll;
    if (!p) err("payroll", "payroll registration details are required");
    else {
      // The FEIN is a prerequisite for payroll registration (the entity already exists); not filed in-run here.
      const hasEin = !!p.fein || p.feinAppliedFor === true;
      if (p.owners.length < 1) err("payroll.owners", "at least one owner / partner / member / officer is required (name, SSN, title)");
      if (req.state === "NY") {
        if (!hasEin) err("payroll.fein", "NYS-100 requires the FEIN (attach CP 575); supply it or mark feinAppliedFor");
        if (!p.dateFirstOperations) err("payroll.dateFirstOperations", "NYS-100 Part B requires the date of first operations in New York State");
        if (p.employerType === "business" && !p.ownershipType) warn("payroll.ownershipType", "NYS-100 Part A asks the legal entity type");
      }
      if (req.state === "NJ") {
        const hasId = hasEin || p.owners.some((o) => !!o.ssn);
        if (!hasId) err("payroll.fein", "NJ-REG requires a FEIN, an owner SSN, or feinAppliedFor");
        if (!p.beginDate) err("payroll.beginDate", "NJ-REG requires the business beginning date");
        if (!p.ownershipType) warn("payroll.ownershipType", "NJ-REG requires the type of ownership");
      }
    }
  }

  if (req.type === "paper_upload") {
    const u = req.paperUpload;
    if (req.state !== "NY") err("state", "PDF upload filings are wired for New York only");
    if (!u) err("paperUpload", "a PDF upload filing needs paperUpload");
    else if (u.form === "ny_application_for_authority") {
      const a = u.applicationForAuthority;
      if (!a) err("paperUpload.applicationForAuthority", "the Application for Authority answers are required");
      else {
        if (a.jurisdiction.trim().toLowerCase() === "new york") err("paperUpload.applicationForAuthority.jurisdiction", "an Application for Authority is for a corporation formed outside New York");
        if (a.incorporationDate > new Date().toISOString().slice(0, 10)) err("paperUpload.applicationForAuthority.incorporationDate", "the incorporation date can't be in the future");
        warn("paperUpload.applicationForAuthority", "attach a Certificate of Existence or Good Standing from the home jurisdiction, dated within the last 6 months");
        if (a.priorActivity === "tax_consent_attached") warn("paperUpload.applicationForAuthority.priorActivity", "the NYS Tax Commission consent must be attached to the upload");
      }
    } else if (u.form === "ny_assumed_name") {
      const n = u.assumedName;
      if (!n) err("paperUpload.assumedName", "the Certificate of Assumed Name answers are required");
      else {
        if (n.formedUnder === "other" && !n.otherLaw) err("paperUpload.assumedName.otherLaw", "name the law the entity was formed under");
        if (!n.noNyLocation && n.locations.length === 0) err("paperUpload.assumedName.locations", "list each NY place of business, or say there is none");
        if (n.assumedName.trim().toLowerCase() === n.realName.trim().toLowerCase()) err("paperUpload.assumedName.assumedName", "the assumed name must differ from the real name");
        if (!n.dosId) warn("paperUpload.assumedName.dosId", "E-Submission finds the entity by DOS ID; without it the run searches by the real name");
      }
    }
    if (u && !u.signatureId) warn("paperUpload.signatureId", "no saved signature: the form is uploaded unsigned and DOS may reject it");
  }

  return issues;
}

export function hasErrors(issues: ValidationIssue[]): boolean {
  return issues.some((i) => i.severity === "error");
}
