/**
 * The state portals a subscriber connects a login for, and the defaults it can set per portal.
 * Ids are stable; they key TenantSettings.portalLogins and portalDefaults.
 */
export interface PortalDefaultField {
  id: string;
  label: string;
  type: "select" | "number" | "boolean";
  options?: { value: string; label: string }[];
  help?: string;
}

export interface PortalInfo {
  id: string;
  state: "NY" | "NJ" | "FL" | "MO" | "US";
  name: string;
  /** True when the portal needs a login for the subscriber's filings. */
  needsLogin: boolean;
  /** How state fees are paid there. */
  pays: string;
  defaults: PortalDefaultField[];
}

const copies: PortalDefaultField[] = [
  { id: "plainCopy", label: "Order a plain copy", type: "boolean", help: "$5.00 per document" },
  { id: "certifiedCopy", label: "Order a certified copy", type: "boolean", help: "$10.00 per document" },
];

export const PORTALS: PortalInfo[] = [
  {
    id: "ny-dos", state: "NY", name: "NY Department of State, service company filing", needsLogin: true,
    pays: "Draw-down account, topped up with the filing's exact cost before each filing",
    defaults: [
      ...copies,
      { id: "certificateOfExistence", label: "Order a certificate of existence with formations", type: "boolean", help: "$25.00" },
      { id: "expedite", label: "E-Submission service level", type: "select", options: [
        { value: "ROUTINE", label: "Routine ($0)" }, { value: "24 HOUR", label: "24 hour ($25)" },
        { value: "SAME DAY", label: "Same day ($75)" }, { value: "2 HOUR", label: "2 hour ($150)" },
      ] },
    ],
  },
  { id: "ny-gov", state: "NY", name: "NY.gov business account (NYS-100 and payroll)", needsLogin: true, pays: "No state fee", defaults: [] },
  {
    id: "nj-portal", state: "NJ", name: "NJ Division of Revenue business portal", needsLogin: true, pays: "Card typed into the state's payment page, or, per filing type, the payment method saved in your NJ account",
    defaults: [
      { id: "annualReportReminders", label: "Sign up for annual report reminders", type: "boolean" },
      { id: "corpWatchAlerts", label: "Sign up for CorpWatch alerts", type: "boolean" },
    ],
  },
  {
    id: "fl-sunbiz", state: "FL", name: "Florida Sunbiz", needsLogin: false, pays: "Card at checkout, or a prepaid Sunbiz E-file account",
    defaults: [
      { id: "certifiedCopy", label: "Order a certified copy", type: "boolean" },
      { id: "certificateOfStatus", label: "Order a certificate of status", type: "boolean" },
    ],
  },
  { id: "irs-ein", state: "US", name: "IRS EIN online application", needsLogin: false, pays: "No fee", defaults: [] },
];

export function portalById(id: string): PortalInfo | undefined {
  return PORTALS.find((p) => p.id === id);
}

/** Checks a defaults object against the portal's fields; returns problems, or none. */
export function portalDefaultsProblems(portalId: string, values: Record<string, unknown>): string[] {
  const p = portalById(portalId);
  if (!p) return [`unknown portal ${portalId}`];
  const out: string[] = [];
  for (const [k, v] of Object.entries(values)) {
    const f = p.defaults.find((d) => d.id === k);
    if (!f) { out.push(`${portalId}: unknown default ${k}`); continue; }
    if (f.type === "boolean" && typeof v !== "boolean") out.push(`${portalId}.${k} must be true or false`);
    if (f.type === "number" && typeof v !== "number") out.push(`${portalId}.${k} must be a number`);
    if (f.type === "select" && !f.options?.some((o) => o.value === v)) out.push(`${portalId}.${k} must be one of ${f.options?.map((o) => o.value).join(", ")}`);
  }
  return out;
}
