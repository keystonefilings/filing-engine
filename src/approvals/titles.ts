/**
 * Plain names for a filing on the proof: the filing type as the portal calls it ("New Jersey LLC formation"),
 * and the business it is for ("Two Sisters Bakery LLC"). The titles match web/lib/intake/forms.ts, where
 * the portal's filing kinds are defined; test/proof-page.test.ts checks they stay the same.
 */
export const KIND_TITLES: Record<string, string> = {
  "ny-llc": "New York LLC formation",
  "ny-corp": "New York corporation formation",
  "nj-llc": "New Jersey LLC formation",
  "nj-corp": "New Jersey corporation formation",
  "fl-llc": "Florida LLC formation",
  "fl-corp": "Florida profit corporation",
  "fl-lp": "Florida limited partnership",
  "irs-ein": "EIN for an existing LLC",
  "ny-nys100": "New York employer registration (NYS-100)",
  "nj-reg": "New Jersey business and employer registration (NJ-REG)",
  "ny-authority": "New York Application for Authority (foreign corporation)",
  "ny-assumed-name": "New York Certificate of Assumed Name (DBA)",
  "ny-llc-dissolution": "New York LLC dissolution",
  "ny-llc-name-change": "New York LLC name change",
  "ny-llc-change": "New York LLC certificate of change",
  "ny-copies": "New York copies of filed documents",
  "ny-status": "New York certificate of status",
};

const STATES: Record<string, string> = { NY: "New York", NJ: "New Jersey", FL: "Florida", MO: "Missouri", US: "IRS" };
const TYPES: Record<string, string> = {
  formation: "formation", ein_only: "EIN", standing_certificate: "standing certificate", alternate_name: "alternate name",
  amendment: "amendment", paper_upload: "filing", payroll_registration: "employer registration", dissolution: "dissolution",
  certificate_of_change: "certificate of change", copy_request: "copies of filed documents",
};

interface RequestLike {
  state: string;
  type: string;
  formation?: { name?: { baseName?: string; designator?: string }; entityType?: string };
  payroll?: { legalName?: string };
  standing?: { entityName?: string };
  intake?: unknown;
}

/** The filing type in the portal's words, e.g. "New Jersey LLC formation". */
export function filingTypeTitle(r: RequestLike): string {
  const kind = (r.intake as { portal?: { kind?: string } } | undefined)?.portal?.kind;
  if (kind && KIND_TITLES[kind]) return KIND_TITLES[kind]!;
  const state = STATES[r.state] ?? r.state;
  const entity = r.type === "formation" && r.formation?.entityType === "LLC" ? "LLC " : "";
  return `${state} ${entity}${TYPES[r.type] ?? r.type.replace(/_/g, " ")}`;
}

/** The business the filing is for, when the request names one. */
export function businessName(r: RequestLike): string | undefined {
  const n = r.formation?.name;
  if (n?.baseName) return `${n.baseName}${n.designator ? ` ${n.designator}` : ""}`;
  return r.payroll?.legalName ?? r.standing?.entityName ?? undefined;
}
