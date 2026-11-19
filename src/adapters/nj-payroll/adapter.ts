import type { ScreenStep, SiteAdapter, StepContext } from "../types.js";
import { NJ_PAYROLL_SCREENS } from "./intents.js";

/**
 * NJ payroll / employer registration (NJ-REG) via njportal.com. complete:false: the online
 * wizard's first screen (Business Identification) was walked live, but the deeper screens
 * gate on a real NJ Entity ID + matching EIN that only a formed entity passes, so the
 * online field names/sequence past identification are from the NJ-REG form, not a live walk.
 * The fixed-IP walk with a sandbox entity confirms them and flips this to complete. No login,
 * no fee. The entity must already exist in NJ's formation registry.
 */
function payroll(ctx: StepContext) {
  const p = ctx.filing.request.payroll;
  if (!p) throw new Error("payroll registration details missing");
  return p;
}
function contactOf(ctx: StepContext) {
  return ctx.filing.request.payroll?.contact ?? ctx.filing.request.contact;
}

const identification: ScreenStep = {
  screen: NJ_PAYROLL_SCREENS.identification,
  async fill(ctx) {
    const p = payroll(ctx);
    const entityId = p.entity?.njBusinessNumber;
    if (!entityId) throw new Error("NJ-REG online needs the NJ Entity ID (payroll.entity.njBusinessNumber)");
    if (!p.fein) throw new Error("NJ-REG identification needs the EIN matching the Entity ID");
    await ctx.set("entityId", entityId);
    await ctx.set("ein", p.fein.replace(/\D/g, "")); // digits only, no dashes
  },
  async advance(ctx) { await ctx.actAndSettle(() => ctx.clickButton(/continue/i)); },
};

const registration: ScreenStep = {
  screen: NJ_PAYROLL_SCREENS.registration,
  sensitive: true, // owner SSNs
  async fill(ctx) {
    const p = payroll(ctx);
    await ctx.set("reason", "Original application for a new business");
    await ctx.set("legalName", p.legalName);
    if (p.tradeName) await ctx.set("tradeName", p.tradeName);
    await ctx.set("businessStreet", p.businessAddress.street1);
    await ctx.set("businessCity", p.businessAddress.city);
    await ctx.set("businessZip", p.businessAddress.zip);
    if (p.beginDate) await ctx.set("beginDate", p.beginDate);
    if (p.ownershipType) await ctx.set("ownershipType", p.ownershipType);
    if (p.njBusinessCode) await ctx.set("njBusinessCode", p.njBusinessCode);
    if (p.county) await ctx.set("county", p.county);
    if (p.naics) await ctx.set("naics", p.naics);
    const first = p.owners[0];
    if (first) {
      await ctx.set("ownerName", first.name);
      if (first.ssn) await ctx.set("ownerSSN", first.ssn.replace(/\D/g, ""));
      await ctx.set("ownerTitle", first.title);
      if (first.address) await ctx.set("ownerAddress", `${first.address.street1}, ${first.address.city}, ${first.address.state} ${first.address.zip}`);
    }
  },
  async advance(ctx) { await ctx.actAndSettle(() => ctx.clickButton(/continue/i)); },
};

const employmentTax: ScreenStep = {
  screen: NJ_PAYROLL_SCREENS.employmentTax,
  async fill(ctx) {
    const p = payroll(ctx);
    await ctx.set("payingWagesNext6Mo", p.payingWages === false ? "No" : "Yes");
    if (p.firstWageDate) await ctx.set("firstWageDate", p.firstWageDate);
    if (p.businessActivity) await ctx.set("businessType", p.businessActivity);
  },
  async advance(ctx) { await ctx.actAndSettle(() => ctx.clickButton(/continue/i)); },
};

const salesAndOtherTaxes: ScreenStep = {
  screen: NJ_PAYROLL_SCREENS.salesAndOtherTaxes,
  submitScreen: true,
  async fill(ctx) {
    const p = payroll(ctx);
    const c = contactOf(ctx);
    const answers = p.stateAnswers ?? {};
    await ctx.set("collectSalesTax", answers.collectSalesTax ? "Yes" : "No");
    await ctx.set("contactPerson", `${c.firstName} ${c.lastName}`);
    await ctx.set("contactPhone", c.phone);
    await ctx.set("contactEmail", c.email);
    const signer = p.signer ?? p.owners[0];
    if (signer) await ctx.set("signature", signer.name);
  },
  async advance(ctx) {
    await ctx.submit("Submit NJ-REG", () => ctx.clickButton(/submit|continue|finish/i));
  },
};

export const njPayrollAdapter: SiteAdapter = {
  site: "NJ",
  key: "nj-payroll",
  complete: false,
  entryUrl: () => process.env.NJ_PAYROLL_URL ?? "https://www.njportal.com/DOR/BusinessRegistration/",
  profileKey: () => null, // NJ-REG online needs no login
  credentialKey: () => null,
  steps: [identification, registration, employmentTax, salesAndOtherTaxes],
};
