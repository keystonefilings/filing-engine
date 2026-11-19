import { renderName, hasLlcIndicator } from "../../domain/name.js";
import type { ScreenStep, SiteAdapter, StepContext } from "../types.js";
import { FL_SCREENS, FL_CORP_FORM, FL_LP_FORM } from "./intents.js";
import { flAccount } from "../../settings/accounts.js";

/**
 * Florida formation on Sunbiz (efile.sunbiz.org), three entity types, each walked to the
 * payment page on 2026-11-19 (test entry, nothing filed): LLC Articles of Organization
 * ($125), Profit Corporation Articles of Incorporation ($70), Limited Partnership
 * Certificate ($1000). All share the flow: disclaimer -> one long form -> review ->
 * pre-payment summary (tracking number) -> Payment Page (Credit Card or prepaid Sunbiz
 * E-file account). No login to file. complete:false: a dry run stops before the payment
 * submit. Florida's form repeats labels across sections, so fields are filled by their
 * exact HTML name; the intents drive drift detection.
 *
 * Florida filings are examiner-reviewed (not instant), so an in-run EIN is refused
 * (validation); the EIN runs after state acceptance.
 */

function formation(ctx: StepContext) {
  const f = ctx.filing.request.formation;
  if (!f) throw new Error("formation details missing");
  return f;
}
const splitName = (n: string): [string, string] => { const p = n.trim().split(/\s+/); return p.length >= 2 ? [p[0]!, p.slice(1).join(" ")] : ["", n]; };

async function fillPrincipalAndAgent(ctx: StepContext) {
  const f = formation(ctx);
  const a = f.mainBusinessAddress;
  if (!a) throw new Error("FL requires the principal place of business address");
  await ctx.setByName("princ_addr1", a.street1);
  if (a.street2) await ctx.setByName("princ_addr2", a.street2);
  await ctx.setByName("princ_city", a.city);
  await ctx.setByName("princ_st", a.state);
  await ctx.setByName("princ_zip", a.zip);
  await ctx.setByName("princ_cntry", "US");
  await ctx.setByName("same_addr_flag", true);
  const agent = ctx.filing.registeredAgentResolution?.agent ?? f.registeredAgent ?? ctx.client.registeredAgent;
  if (!agent?.address) throw new Error("FL requires a registered agent with a Florida address");
  if (agent.address.state !== "FL") throw new Error("FL registered agent must have a Florida address");
  const [first, last] = splitName(agent.name);
  if (first) await ctx.setByName("ra_name_first_name", first);
  await ctx.setByName("ra_name_last_name", last);
  await ctx.setByName("ra_addr1", agent.address.street1);
  await ctx.setByName("ra_city", agent.address.city);
  await ctx.setByName("ra_zip", agent.address.zip);
  await ctx.setByName("ra_signature", agent.name);
}
async function fillEffectiveAndCerts(ctx: StepContext) {
  const f = formation(ctx);
  if (f.additionalCertificates.certificateOfStanding) await ctx.setByName("cos_num_flag", true);
  if (f.additionalCertificates.certifiedCopy) await ctx.setByName("cert_num_flag", true);
  if (f.effectiveDate === "specific" && f.effectiveDateValue) {
    const [y, m, d] = f.effectiveDateValue.split("-");
    await ctx.setByName("eff_date_mm", m!); await ctx.setByName("eff_date_dd", d!); await ctx.setByName("eff_date_yyyy", y!);
  }
}
async function fillCorrespondence(ctx: StepContext) {
  const r = ctx.filing.request;
  await ctx.setByName("ret_name", `${r.contact.firstName} ${r.contact.lastName}`);
  await ctx.setByName("ret_email_addr", r.contact.email);
  await ctx.setByName("email_addr_verify", r.contact.email);
}

const disclaimer: ScreenStep = {
  screen: FL_SCREENS.disclaimer,
  async fill(ctx) { await ctx.set("disclaimer", true); },
  async advance(ctx) { await ctx.clickButton(/^start new filing$/i); },
};
const review: ScreenStep = {
  screen: FL_SCREENS.review,
  reviewScreen: true, // beta review-gate stops here for admin review before the summary/payment
  async fill(ctx) { await ctx.note("review page reached"); },
  async advance(ctx) { await ctx.actAndSettle(() => ctx.clickButton(/^continue$/i)); },
};
const summary: ScreenStep = {
  screen: FL_SCREENS.summary,
  async fill(ctx) { const m = /Document Tracking #:\s*(\d+)/.exec(await ctx.page.locator("body").innerText()); if (m) await ctx.note(`tracking number ${m[1]}`); },
  async advance(ctx) { await ctx.actAndSettle(() => ctx.clickButton(/^continue$/i)); },
};
const payment: ScreenStep = {
  screen: FL_SCREENS.payment,
  paymentScreen: true,
  submitScreen: true,
  async fill(ctx) {
    const acct = flAccount(ctx.tenant, ctx.client);
    if (acct.paymentMethod === "sunbiz_account") {
      if (!ctx.credential?.username) throw new Error("FL Sunbiz E-file account payment chosen but no account credential in the vault");
      await ctx.setByName("acct_number", ctx.credential.username);
      if (ctx.credential.password) await ctx.setByName("acct_password", ctx.credential.password);
      await ctx.setByName("email_addr", ctx.filing.request.contact.email);
    }
    await ctx.note(`payment page reached (method: ${acct.paymentMethod})`);
  },
  async advance(ctx) {
    const acct = flAccount(ctx.tenant, ctx.client);
    const button = acct.paymentMethod === "sunbiz_account" ? /^sunbiz e-file account payment$/i : /^credit card payment$/i;
    await ctx.submit(acct.paymentMethod === "sunbiz_account" ? "Sunbiz E-file Account Payment" : "Credit Card Payment", () => ctx.clickButton(button));
  },
};

const llcForm: ScreenStep = {
  screen: FL_SCREENS.form,
  nameCheckGate: true, // FL has no pre-run availability check; the examiner decides
  async fill(ctx) {
    const f = formation(ctx);
    const name = renderName(f.name, "FL").nameField;
    if (!hasLlcIndicator(name)) throw new Error("FL LLC name needs an LLC indicator");
    await fillEffectiveAndCerts(ctx);
    await ctx.setByName("corp_name", name);
    await fillPrincipalAndAgent(ctx);
    if (f.purpose) await ctx.setByName("purpose", f.purpose.slice(0, 240));
    await fillCorrespondence(ctx);
    const signer = f.signers[0] ?? f.members[0] ?? ctx.client.defaultSigner;
    await ctx.setByName("signature", signer?.name ?? (f.registeredAgent?.name ?? ""));
    for (const [i, person] of f.authorizedPersons.entries()) {
      const n = i + 1;
      await ctx.setByName(`off${n}_name_title`, person.title);
      if (person.entityName) await ctx.setByName(`off${n}_name_corp_name`, person.entityName);
      else if (person.name) { const [fn, ln] = splitName(person.name); if (fn) await ctx.setByName(`off${n}_name_first_name`, fn); await ctx.setByName(`off${n}_name_last_name`, ln); }
      if (person.address) { await ctx.setByName(`off${n}_name_addr1`, person.address.street1); await ctx.setByName(`off${n}_name_city`, person.address.city); await ctx.setByName(`off${n}_name_st`, person.address.state); await ctx.setByName(`off${n}_name_zip`, person.address.zip); }
    }
  },
  async advance(ctx) { await ctx.clickButton(/^continue$/i); },
};

const corpForm: ScreenStep = {
  screen: FL_CORP_FORM,
  nameCheckGate: true,
  async fill(ctx) {
    const f = formation(ctx);
    if (!f.stockShares) throw new Error("FL profit corporation requires the number of stock shares");
    if (!f.incorporator?.address) throw new Error("FL profit corporation requires an incorporator with an address");
    await fillEffectiveAndCerts(ctx);
    await ctx.setByName("corp_name", renderName(f.name, "FL").nameField);
    await ctx.setByName("stock_shares", String(f.stockShares));
    await fillPrincipalAndAgent(ctx);
    const inc = f.incorporator;
    await ctx.setByName("incorporator1", inc.name);
    await ctx.setByName("incorporator2", inc.address!.street1);
    await ctx.setByName("incorporator4", `${inc.address!.city}, ${inc.address!.state} ${inc.address!.zip}`);
    await ctx.setByName("signature", inc.name);
    if (f.purpose) await ctx.setByName("purpose", f.purpose.slice(0, 240)); else await ctx.setByName("purpose_flag", true);
    await fillCorrespondence(ctx);
    for (const [i, person] of f.authorizedPersons.entries()) {
      const n = i + 1;
      await ctx.setByName(`off${n}_name_title`, person.title);
      if (person.entityName) await ctx.setByName(`off${n}_name_corp_name`, person.entityName);
      else if (person.name) { const [fn, ln] = splitName(person.name); if (fn) await ctx.setByName(`off${n}_name_first_name`, fn); await ctx.setByName(`off${n}_name_last_name`, ln); }
      if (person.address) { await ctx.setByName(`off${n}_name_addr1`, person.address.street1); await ctx.setByName(`off${n}_name_city`, person.address.city); await ctx.setByName(`off${n}_name_st`, person.address.state); await ctx.setByName(`off${n}_name_zip`, person.address.zip); }
    }
  },
  async advance(ctx) { await ctx.clickButton(/^continue$/i); },
};

const lpForm: ScreenStep = {
  screen: FL_LP_FORM,
  nameCheckGate: true,
  async fill(ctx) {
    const f = formation(ctx);
    if (!f.generalPartners.length) throw new Error("FL limited partnership requires at least one general partner");
    await fillEffectiveAndCerts(ctx);
    await ctx.setByName("corp_name", renderName(f.name, "FL").nameField);
    if (f.isLLLP) await ctx.setByName("manager_flag", true);
    await fillPrincipalAndAgent(ctx);
    await fillCorrespondence(ctx);
    for (const [i, gp] of f.generalPartners.entries()) {
      const n = i + 1;
      if (gp.entityName) { await ctx.setByName(`off${n}_name_corp_name`, gp.entityName); if (gp.documentNumber) await ctx.setByName(`off${n}_name_doc_number`, gp.documentNumber); }
      else if (gp.name) { const [fn, ln] = splitName(gp.name); if (fn) await ctx.setByName(`off${n}_name_first_name`, fn); await ctx.setByName(`off${n}_name_last_name`, ln); }
      if (gp.address) { await ctx.setByName(`off${n}_name_addr1`, gp.address.street1); await ctx.setByName(`off${n}_name_city`, gp.address.city); await ctx.setByName(`off${n}_name_st`, gp.address.state); await ctx.setByName(`off${n}_name_zip`, gp.address.zip); }
      await ctx.setByName(`off${n}_name_signature`, gp.signature);
    }
  },
  async advance(ctx) { await ctx.clickButton(/^continue$/i); },
};

function buildFlAdapter(key: string, url: string, form: ScreenStep): SiteAdapter {
  return {
    site: "FL",
    key,
    complete: false,
    entryUrl: () => process.env.FL_FORMATION_URL ?? url,
    profileKey: () => null,
    credentialKey: (ctx) => flAccount(ctx.tenant, ctx.client).accountCredentialKey,
    steps: [disclaimer, form, review, summary, payment],
  };
}

export const flFormationAdapter = buildFlAdapter("fl-formation", "https://efile.sunbiz.org/llc_file.html", llcForm);
export const flProfitCorpAdapter = buildFlAdapter("fl-profit-corporation", "https://efile.sunbiz.org/profit_file.html", corpForm);
export const flLimitedPartnershipAdapter = buildFlAdapter("fl-limited-partnership", "https://efile.sunbiz.org/lp_file.html", lpForm);

/** The FL formation adapter for a given floridaEntityType. */
export function flAdapterFor(entityType: "llc" | "profit_corporation" | "limited_partnership"): SiteAdapter {
  return entityType === "profit_corporation" ? flProfitCorpAdapter : entityType === "limited_partnership" ? flLimitedPartnershipAdapter : flFormationAdapter;
}
