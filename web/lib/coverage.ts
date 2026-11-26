import { liveFilings } from "@/lib/firm";

/**
 * Where each filing type stands, for the home page's state tiles and the What we file page.
 * "Live" comes from the deployment's live switch, per type (PORTAL_LIVE_KINDS).
 */
export const STAGES = {
  rehearsed: "Rehearsed to the payment screen",
  recorded: "Screens recorded, rehearsal next",
  offered: "Offered, not yet rehearsed",
  planned: "Planned",
} as const;
export type Stage = keyof typeof STAGES;

export type Place = "New York" | "New Jersey" | "Florida" | "IRS";
export const PLACES: Place[] = ["New York", "New Jersey", "Florida", "IRS"];

export interface CoverageRow { what: string; short: string; where: Place; stage: Stage; kind?: string }

export const COVERAGE: CoverageRow[] = [
  { what: "LLC formation", short: "LLC formation", where: "New Jersey", stage: "rehearsed", kind: "nj-llc" },
  { what: "Standing certificate (through the API; not on the filing desk yet)", short: "Standing certificate", where: "New Jersey", stage: "rehearsed" },
  { what: "LLC formation", short: "LLC formation", where: "Florida", stage: "rehearsed", kind: "fl-llc" },
  { what: "Profit corporation formation", short: "Corporation formation", where: "Florida", stage: "rehearsed", kind: "fl-corp" },
  { what: "Limited partnership formation", short: "Limited partnership", where: "Florida", stage: "rehearsed", kind: "fl-lp" },
  { what: "EIN, with the IRS letter saved", short: "EIN, with the IRS letter", where: "IRS", stage: "recorded", kind: "irs-ein" },
  { what: "Articles of Organization (LLC)", short: "LLC formation", where: "New York", stage: "recorded", kind: "ny-llc" },
  { what: "Certificate of Incorporation (business corporation)", short: "Corporation formation", where: "New York", stage: "recorded", kind: "ny-corp" },
  { what: "Employer registration (NYS-100)", short: "Payroll registration (NYS-100)", where: "New York", stage: "recorded", kind: "ny-nys100" },
  { what: "Employer registration (NJ-REG)", short: "Payroll registration (NJ-REG)", where: "New Jersey", stage: "recorded", kind: "nj-reg" },
  { what: "LLC name change, certificate of change and dissolution", short: "LLC changes and dissolution", where: "New York", stage: "recorded" },
  { what: "Copies and certificate of status", short: "Copies and certificate of status", where: "New York", stage: "recorded", kind: "ny-copies" },
  { what: "Corporation formation (for-profit)", short: "Corporation formation", where: "New Jersey", stage: "offered", kind: "nj-corp" },
  { what: "Application for Authority (foreign corporation)", short: "Application for Authority", where: "New York", stage: "offered", kind: "ny-authority" },
  { what: "Certificate of Assumed Name (DBA)", short: "Assumed name (DBA)", where: "New York", stage: "offered", kind: "ny-assumed-name" },
  { what: "Alternate name, charter amendments", short: "Alternate name, amendments", where: "New Jersey", stage: "planned" },
];

export const isLive = (row: CoverageRow) => (row.kind ? liveFilings(row.kind) : false);

/** The status chip a row shows: Live, or its stage. */
export function statusOf(row: CoverageRow): { label: string; tone: "live" | "rehearsed" | "plain" } {
  if (isLive(row)) return { label: "Live", tone: "live" };
  return { label: STAGES[row.stage], tone: row.stage === "rehearsed" ? "rehearsed" : "plain" };
}
