import type { ScreenStep, SiteAdapter, StepContext } from "../types.js";
import { tenantVaultKey } from "../../settings/accounts.js";
import { NY_PAYROLL_SCREENS } from "./intents.js";

/**
 * NY payroll / employer registration (NYS-100) via NY Business Express. complete:false:
 * Business Express is NY.gov-ID login-gated and was not walked, so the online screen
 * sequence, field names and the final Submit button are unverified. The field intents are
 * from the official NYS 100 (03/26) form; the fixed-IP walk confirms the online layout and
 * flips this to complete. Each subscriber's own NY.gov login is used (tenant.nyGovCredentialKey,
 * scoped to the tenant like every other login: one subscriber's sign-in never runs another's
 * filing); there is no fee.
 */
function payroll(ctx: StepContext) {
  const p = ctx.filing.request.payroll;
  if (!p) throw new Error("payroll registration details missing");
  return p;
}
function contactOf(ctx: StepContext) {
  return ctx.filing.request.payroll?.contact ?? ctx.filing.request.contact;
}

const employerInformation: ScreenStep = {
  screen: NY_PAYROLL_SCREENS.employerInformation,
  nameCheckGate: false,
  async fill(ctx) {
    const p = payroll(ctx);
    const c = contactOf(ctx);
    await ctx.set("employerType", p.employerType === "household" ? "Household Employer or Domestic Services" : "Business");
    if (p.ownershipType) await ctx.set("legalEntity", p.ownershipType);
    if (p.fein) await ctx.set("fein", p.fein);
    await ctx.set("telephone", c.phone);
    await ctx.set("legalName", p.legalName);
    if (p.tradeName) await ctx.set("tradeName", p.tradeName);
    await ctx.set("businessEmail", c.email);
  },
  async advance(ctx) { await ctx.actAndSettle(() => ctx.clickButton(/continue|next/i)); },
};

const liabilityInformation: ScreenStep = {
  screen: NY_PAYROLL_SCREENS.liabilityInformation,
  async fill(ctx) {
    const p = payroll(ctx);
    if (p.dateFirstOperations) await ctx.set("dateFirstOperations", p.dateFirstOperations);
    if (p.dateFirstWithholding) await ctx.set("dateFirstWithholding", p.dateFirstWithholding);
    await ctx.set("registeringForUI", p.registeringForUI === false ? "No" : "Yes");
    if (p.uiLiabilityQuarter) await ctx.set("uiFirstQuarter", p.uiLiabilityQuarter);
    if (p.uiLiabilityYear) await ctx.set("uiYear", String(p.uiLiabilityYear));
    if (p.coveredEmployees !== undefined) await ctx.set("totalCoveredEmployees", String(p.coveredEmployees));
    await ctx.set("withholdingOnly", p.withholdingOnly ? "Yes" : "No");
  },
  async advance(ctx) { await ctx.actAndSettle(() => ctx.clickButton(/continue|next/i)); },
};

const requiredAddresses: ScreenStep = {
  screen: NY_PAYROLL_SCREENS.requiredAddresses,
  async fill(ctx) {
    const p = payroll(ctx);
    const m = p.mailingAddress ?? p.businessAddress;
    await ctx.set("mailingStreet", m.street1);
    await ctx.set("mailingCity", m.city);
    await ctx.set("mailingState", m.state);
    await ctx.set("mailingZip", m.zip);
    if (p.county) await ctx.set("mailingCounty", p.county);
    await ctx.set("booksStreet", (p.booksRecordsAddress ?? p.businessAddress).street1);
  },
  async advance(ctx) { await ctx.actAndSettle(() => ctx.clickButton(/continue|next/i)); },
};

const businessInformation: ScreenStep = {
  screen: NY_PAYROLL_SCREENS.businessInformation,
  sensitive: true, // owner/officer SSNs
  async fill(ctx) {
    const p = payroll(ctx);
    const first = p.owners[0];
    if (first) {
      await ctx.set("ownerOfficerName", first.name);
      if (first.ssn) await ctx.set("ownerOfficerSSN", first.ssn);
      await ctx.set("ownerOfficerTitle", first.title);
      if (first.address) await ctx.set("ownerOfficerResidence", `${first.address.street1}, ${first.address.city}, ${first.address.state} ${first.address.zip}`);
    }
    await ctx.set("numberOfNYLocations", String(Math.max(1, p.workLocations.length)));
    if (p.businessActivity) await ctx.set("principalActivity", p.businessActivity);
    // Multi-owner / multi-location rows use add-row controls on the live form; map them on the walk.
    await ctx.note(`owners: ${p.owners.length}, work locations: ${p.workLocations.length} (additional rows pending the online walk)`);
  },
  async advance(ctx) { await ctx.actAndSettle(() => ctx.clickButton(/continue|next/i)); },
};

const affirmation: ScreenStep = {
  screen: NY_PAYROLL_SCREENS.affirmation,
  submitScreen: true,
  async fill(ctx) {
    const p = payroll(ctx);
    const c = contactOf(ctx);
    const signer = p.signer ?? p.owners[0];
    if (signer) await ctx.set("signature", signer.name);
    if (signer?.title) await ctx.set("officialPosition", signer.title);
    await ctx.set("signaturePhone", c.phone);
    await ctx.set("signatureEmail", c.email);
  },
  async advance(ctx) {
    await ctx.submit("Submit NYS-100", () => ctx.clickButton(/submit|finish|register/i));
  },
};

export const nyPayrollAdapter: SiteAdapter = {
  site: "NY",
  key: "ny-payroll",
  complete: false,
  entryUrl: () => process.env.NY_PAYROLL_URL ?? "https://www.businessexpress.ny.gov",
  // The subscriber's NY.gov business login (persistent context), kept apart from its NY DOS account (ny:<tenant>).
  profileKey: (ctx) => `nygov:${ctx.tenant.tenantId}`,
  credentialKey: (ctx) => tenantVaultKey(ctx.tenant, ctx.tenant.nyGovCredentialKey),
  steps: [employerInformation, liabilityInformation, requiredAddresses, businessInformation, affirmation],
};
