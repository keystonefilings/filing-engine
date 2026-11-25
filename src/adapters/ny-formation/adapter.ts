import { hasCorpIndicator, hasLlcIndicator, renderName } from "../../domain/name.js";
import type { ScreenStep, SiteAdapter, StepContext } from "../types.js";
import type { ScreenIntents } from "../../resolver/types.js";
import { nyDrawdownAccount, tenantVaultKey } from "../../settings/accounts.js";
import { totalUsd } from "../../fees/table.js";
import { NY_BCL_PAYMENT, NY_SCREENS } from "./intents.js";
import { portalText, wantsPlainCopy } from "../../domain/portal-intake.js";

/**
 * NY DOS formation, signed in as the service company: a domestic LLC's Articles of Organization
 * or a domestic business corporation's Certificate of Incorporation. Built to the portal map of
 * 2026-11-24 (docs/portal-maps/ny-dos-corporations.md), screens A to F and M.
 *
 * Every NY DOS filing starts by funding the service company's draw-down account with exactly
 * the filing's approved total (the prepay step, Screen M), then files and pays from that
 * account (Screen F). Two irreversible actions, in order: the deposit (Elavon "Submit Payment")
 * and the filing ("File Document").
 *
 * complete:false — dry runs only. A dry run fills the deposit (account and amount) without
 * authorizing it or touching a card, then files up to Payment Information and stops before
 * "File Document"; neither Payment Authorization box is ever ticked. Not built yet: the live
 * deposit (the card vault for the account's NY state fees is an open decision, and entering a
 * card brings the engine into card-data scope), the page after "File Document" (so no
 * submission can be confirmed), and par-value shares (tax on shares not mapped).
 */

function formation(ctx: StepContext) {
  const f = ctx.filing.request.formation;
  if (!f) throw new Error("formation details missing");
  return f;
}
const isCorp = (ctx: StepContext) => formation(ctx).nyEntityType === "business_corporation";
const money = (usd: number) => usd.toFixed(2);

/** Links are not form controls: click one by its text, or say which is missing. */
async function clickLink(ctx: StepContext, name: RegExp, what: string) {
  const link = ctx.page.getByRole("link", { name }).first();
  if (!(await link.count())) throw new Error(`NY DOS: the "${what}" link is not on this page`);
  await link.click();
}

/** "Account Balance $1,234.56" on the page, or null when it is not shown. */
async function readBalance(ctx: StepContext): Promise<number | null> {
  const text = await ctx.page.locator("body").innerText();
  const m = /account balance[^$\d]*\$?\s?([\d,]+\.\d{2})/i.exec(text);
  return m ? Number(m[1]!.replace(/,/g, "")) : null;
}

/** The deposit amount: the total the client approved, which the payment page is checked against later. */
function approvedTotal(ctx: StepContext): number {
  const total = totalUsd(ctx.expectedFees);
  if (!(total > 0)) throw new Error("NY DOS: no approved fee total to deposit; the filing needs an approval with its fees");
  return total;
}

/** The draw-down account in force (the service company's, or the firm's own under answer G1), else the only one listed. */
async function pickDrawdown(ctx: StepContext, set: StepContext["set"], field: StepContext["field"]) {
  const ref = nyDrawdownAccount(ctx.tenant, ctx.client);
  const f = field("drawdownAccount");
  const options = (f?.options ?? []).filter((o) => o.value && !/select/i.test(o.label));
  const chosen = ref ? options.find((o) => o.label.includes(ref) || o.value === ref) : options.length === 1 ? options[0] : undefined;
  if (!chosen) {
    throw new Error(ref
      ? `NY DOS: draw-down account "${ref}" is not in the list on this page`
      : `NY DOS: ${options.length} draw-down accounts are listed; name one in the NY settings (nyDrawdownAccountRef)`);
  }
  await set("drawdownAccount", chosen.label);
  return chosen.label;
}

/** Waits (bounded) for fields a choice reveals on the same page, then returns the page resolved fresh. */
async function whenShown(ctx: StepContext, screen: ScreenIntents, keys: string[], after: string, timeoutMs = 15_000) {
  for (let waited = 0; ; waited += 500) {
    const r = await ctx.resolve(screen);
    if (keys.every((k) => r.field(k)?.visible)) return r;
    if (waited >= timeoutMs) throw new Error(`NY DOS ${screen.title}: ${keys.join(", ")} did not appear after ${after}`);
    await ctx.page.waitForTimeout(500);
  }
}

// ---- Prepay: Screen M (Replenish DD Account) ----

const openReplenish: ScreenStep = {
  screen: { screenKey: "ny.menu", title: "DOS menu (signed in)", intents: [] },
  async fill() { /* any signed-in page: the menu is on every page */ },
  async advance(ctx) { await clickLink(ctx, /^replenish dd account$/i, "Replenish DD Account"); },
};

const replenish: ScreenStep = {
  screen: NY_SCREENS.replenish, // no card data here; Elavon's card page will be its own masked step
  async fill(ctx) {
    const total = approvedTotal(ctx);
    const account = await pickDrawdown(ctx, ctx.set, ctx.field);
    const before = await readBalance(ctx);
    await ctx.set("depositAmount", money(total));
    ctx.values.nyDepositUsd = money(total);
    if (before !== null) ctx.values.nyBalanceBeforeUsd = money(before);
    if (ctx.dryRun) {
      await ctx.note(`dry run: draw-down deposit of $${money(total)} into ${account} prepared, not authorized (balance $${before === null ? "not shown" : money(before)})`);
      return;
    }
    // A live deposit: tick Payment Authorization, Continue to Elavon, check the order amount to the
    // cent, enter the saved card from the payment vault, Submit Payment through the submit guard,
    // then confirm the balance rose by exactly the total. Not built: the card vault is undecided.
    throw new Error("NY DOS: live draw-down deposits are not built yet (the card vault for the account's NY state fees is an open decision); no deposit was made");
  },
  async advance(ctx) { await clickLink(ctx, /^home$/i, "Home"); },
};

// ---- Filing: Screens A to F ----

const home: ScreenStep = {
  screen: NY_SCREENS.home,
  async fill() { /* service-company home */ },
  async advance(ctx) {
    await clickLink(ctx, /domestic business corporation \(for profit\) and domestic limited liability company/i, "Domestic Business Corporation (For Profit) and Domestic Limited Liability Company");
  },
};

const selection: ScreenStep = {
  screen: NY_SCREENS.selection,
  async fill() { /* two links */ },
  async advance(ctx) {
    if (isCorp(ctx)) await clickLink(ctx, /certificate of incorporation for a domestic business corporation/i, "Certificate of Incorporation for a Domestic Business Corporation");
    else await clickLink(ctx, /articles of organization for a domestic limited liability company/i, "Articles of Organization for a Domestic Limited Liability Company");
  },
};

const entityName: ScreenStep = {
  screen: NY_SCREENS.entityName,
  nameCheckGate: true, // NY only validates the type indicator here; the pre-run DOS database search is the real gate (decision 1).
  async fill(ctx) {
    const name = renderName(formation(ctx).name, "NY").nameField;
    if (isCorp(ctx) ? !hasCorpIndicator(name) : !hasLlcIndicator(name)) {
      throw new Error(`NY name lacks ${isCorp(ctx) ? "a corporation" : "an LLC"} type indicator`);
    }
    await ctx.set("entityName", name);
  },
  async advance(ctx) { await ctx.clickButton(/^continue/i); },
  async verify(ctx) {
    const text = await ctx.page.locator("body").innerText();
    if (/proposed entity name is unacceptable/i.test(text)) {
      const reason = /entity indicator evaluation:[^\n]*/i.exec(text)?.[0] ?? "see the page";
      throw new Error(`NY DOS rejected the proposed name (${reason.trim().slice(0, 160)})`);
    }
  },
};

/** Service of process, the same block on both forms. */
async function fillServiceOfProcess(ctx: StepContext, screen: ScreenIntents) {
  const sop = formation(ctx).serviceOfProcess;
  if (!sop) throw new Error("NY requires service of process details");
  if (sop.mode === "manual") {
    await ctx.set("sopMode", "Enter");
    const s = await whenShown(ctx, screen, ["sopName", "sopAddress1", "sopCity", "sopZip"], "choosing to enter the service of process");
    const p = sop.person!;
    await s.set("sopName", p.name);
    await s.set("sopAddress1", p.address!.street1);
    if (p.address!.street2) await s.set("sopAddress2", p.address!.street2);
    await s.set("sopCity", p.address!.city);
    await s.set("sopState", p.address!.state);
    await s.set("sopZip", p.address!.zip);
    if (sop.noticeEmail) {
      await s.set("sopEmailClause", true);
      const e = await whenShown(ctx, screen, ["sopEmail", "sopEmailConfirm"], "the service of process e-mail statement");
      await e.set("sopEmail", sop.noticeEmail);
      await e.set("sopEmailConfirm", sop.noticeEmail);
    }
  } else {
    if (!sop.serviceCompany) throw new Error("NY service of process: the service company is required");
    await ctx.set("sopMode", "Select");
    const s = await whenShown(ctx, screen, ["sopServiceCompany"], "choosing a service company");
    await s.set("sopServiceCompany", sop.serviceCompany);
  }
}

/** Filer block, the same on both forms. */
async function fillFiler(ctx: StepContext, set: StepContext["set"]) {
  const filer = formation(ctx).filer ?? ctx.tenant.filer;
  if (!filer?.address) throw new Error("NY filer name and address missing");
  await set("filerName", filer.name);
  await set("filerAddress1", filer.address.street1);
  if (filer.address.street2) await set("filerAddress2", filer.address.street2);
  await set("filerCity", filer.address.city);
  await set("filerState", filer.address.state);
  await set("filerZip", filer.address.zip);
}

/** The read-only name the form carries over from Screen C must be the approved one. */
function checkCarriedName(ctx: StepContext, key: "llcName" | "corpName") {
  const carried = ctx.field(key)?.value;
  const want = renderName(formation(ctx).name, "NY").nameField;
  if (carried !== undefined && carried.trim().toUpperCase() !== want.toUpperCase()) {
    throw new Error(`NY DOS form carries the name "${carried}", not the approved "${want}"`);
  }
}

async function fillEffectiveDate(ctx: StepContext, screen: ScreenIntents) {
  const f = formation(ctx);
  if (f.effectiveDate !== "specific") return; // upon filing: the clause stays off
  if (!f.effectiveDateValue) throw new Error("NY effective date: the date is missing");
  await ctx.set("effectiveDateClause", true);
  const s = await whenShown(ctx, screen, ["effectiveDateMode"], "the effective date clause");
  await s.set("effectiveDateMode", "On a date");
  const d = await whenShown(ctx, screen, ["effectiveDate"], "choosing a date");
  await d.set("effectiveDate", f.effectiveDateValue);
}

const llcForm: ScreenStep = {
  screen: NY_SCREENS.filing,
  async present(ctx) { return !isCorp(ctx); },
  async fill(ctx) {
    const f = formation(ctx);
    const organizer = f.organizer ?? ctx.tenant.organizer;
    if (!organizer?.address) throw new Error("NY organizer name and address missing");
    checkCarriedName(ctx, "llcName");
    if (ctx.client.checkboxDefaults.nyOpeningStatement) await ctx.set("openingStatement", true);
    if (f.name.englishTranslation) await ctx.set("englishTranslation", f.name.englishTranslation);
    const county = f.county ?? ctx.client.countyDefault;
    if (!county) throw new Error("NY requires the county");
    await ctx.set("county", county);
    await fillServiceOfProcess(ctx, NY_SCREENS.filing);
    if (f.managementStructure) {
      await ctx.set("managementClause", true);
      const m = await whenShown(ctx, NY_SCREENS.filing, ["managementStructure"], "the management structure clause");
      await m.set("managementStructure", f.managementStructure === "manager_managed" ? "One or more managers" : "One or more members");
    }
    await fillEffectiveDate(ctx, NY_SCREENS.filing);
    const s = await ctx.resolve(NY_SCREENS.filing); // after the clauses above changed the page
    await s.set("organizerName", organizer.name);
    await s.set("organizerAddress1", organizer.address.street1);
    if (organizer.address.street2) await s.set("organizerAddress2", organizer.address.street2);
    await s.set("organizerCity", organizer.address.city);
    await s.set("organizerState", organizer.address.state);
    await s.set("organizerZip", organizer.address.zip);
    // STOP field: the typed signature is the organizer's name, under the client's approval of this filing.
    await s.set("signature", organizer.name);
    await fillFiler(ctx, s.set);
  },
  async advance(ctx) { await ctx.clickButton(/^continue/i); },
};

/** "Mary A Smith" -> first Mary, middle A, last Smith. */
function splitName(full: string) {
  const parts = full.trim().split(/\s+/);
  if (parts.length < 2) throw new Error("the incorporator needs a first and last name");
  return { first: parts[0]!, middle: parts.length > 2 ? parts.slice(1, -1).join(" ") : undefined, last: parts[parts.length - 1]! };
}

const bclForm: ScreenStep = {
  screen: NY_SCREENS.bclFiling,
  async present(ctx) { return isCorp(ctx); },
  async fill(ctx) {
    const f = formation(ctx);
    const inc = f.incorporator;
    if (!inc?.address) throw new Error("NY business corporation: incorporator name and address missing");
    if (!f.stockShares) throw new Error("NY business corporation: the number of shares is missing");
    if (f.stockParValueUsd) throw new Error("NY business corporation: par-value shares are not mapped yet (tax on shares)");
    checkCarriedName(ctx, "corpName");
    if (ctx.client.checkboxDefaults.nyOpeningStatement) await ctx.set("openingStatement", true);
    if (f.name.englishTranslation) await ctx.set("englishTranslation", f.name.englishTranslation);
    const county = f.county ?? ctx.client.countyDefault;
    if (!county) throw new Error("NY requires the county");
    await ctx.set("county", county);
    await ctx.set("shareCount", String(f.stockShares));
    await ctx.set("shareValue", "No Par Value");
    await fillServiceOfProcess(ctx, NY_SCREENS.bclFiling);
    await fillEffectiveDate(ctx, NY_SCREENS.bclFiling);
    const s = await ctx.resolve(NY_SCREENS.bclFiling);
    const n = splitName(inc.name);
    await s.set("incFirstName", n.first);
    if (n.middle) await s.set("incMiddle", n.middle);
    await s.set("incLastName", n.last);
    await s.set("incAddress1", inc.address.street1);
    if (inc.address.street2) await s.set("incAddress2", inc.address.street2);
    await s.set("incCity", inc.address.city);
    await s.set("incState", inc.address.state);
    await s.set("incZip", inc.address.zip);
    // STOP field. DOS: "The Name of the Incorporator and the Signature of the Incorporator must be the same."
    await s.set("signature", [n.first, n.middle, n.last].filter(Boolean).join(" "));
    await fillFiler(ctx, s.set);
  },
  async advance(ctx) { await ctx.clickButton(/^continue/i); },
};

const review: ScreenStep = {
  screen: NY_SCREENS.review,
  async fill() { /* rendered preview */ },
  async advance(ctx) { await ctx.clickButton(/^continue/i); },
};

const payment: ScreenStep = {
  screen: NY_SCREENS.payment,
  async present(ctx) { return !isCorp(ctx); },
  paymentScreen: true, // the live fee check runs here before anything is submitted
  reviewScreen: true,  // the beta review gate stops here
  submitScreen: true,
  async fill(ctx) {
    const f = formation(ctx);
    const extras = f.additionalCertificates;
    const req = ctx.filing.request;
    // The firm's own reference and Cc address when its intake form gave them (intake.portal).
    await ctx.set("customerReference", (portalText(req, "customerReference") ?? ctx.filing.id).slice(0, 40));
    const cc = portalText(req, "ccEmail");
    if (cc) await ctx.set("ccEmail", cc);
    const ein = ctx.values.ein ?? ctx.filing.ein;
    if (ein && !/^00-0000000$/.test(ein)) await ctx.set("fein", ein);
    if (wantsPlainCopy(req)) await ctx.set("plainCopy", true);
    if (extras.certifiedCopy) await ctx.set("certifiedCopy", true);
    if (extras.certificateOfStanding) await ctx.set("certificateOfExistence", true);
    await ctx.set("paymentMethod", "Drawdown Account");
    const s = await whenShown(ctx, NY_SCREENS.payment, ["drawdownAccount"], "choosing the draw-down account");
    await pickDrawdown(ctx, s.set, s.field);
    // The deposit funded exactly this total; the page's total is checked against the approval next.
    const total = approvedTotal(ctx);
    if (ctx.values.nyDepositUsd && ctx.values.nyDepositUsd !== money(total)) {
      throw new Error(`NY DOS: the deposit ($${ctx.values.nyDepositUsd}) differs from the approved total ($${money(total)})`);
    }
    const balance = await readBalance(ctx);
    if (balance !== null && balance < total) {
      if (!ctx.dryRun) throw new Error(`NY DOS: draw-down balance $${money(balance)} does not cover the total $${money(total)}`);
      await ctx.note(`dry run: draw-down balance $${money(balance)} (no deposit was made) against the total $${money(total)}`);
    }
  },
  async advance(ctx) {
    // Payment Authorization is ticked inside the guard, so a dry run never ticks it.
    await ctx.submit("File Document", async () => {
      await ctx.set("paymentAuthorization", true);
      await ctx.clickButton(/^file document$/i);
    });
  },
};

/** The same page for a business corporation, under its own screen (its fee lines differ). */
const bclPayment: ScreenStep = { ...payment, screen: NY_BCL_PAYMENT, async present(ctx) { return isCorp(ctx); } };

export const nyFormationAdapter: SiteAdapter = {
  site: "NY",
  key: "ny-formation",
  complete: false,
  entryUrl: () => process.env.NY_FORMATION_URL ?? "https://filings.dos.ny.gov/ords/r/corpanc/efiling/1",
  profileKey: (ctx) => `ny:${ctx.tenant.tenantId}`,
  credentialKey: (ctx) => tenantVaultKey(ctx.tenant, ctx.tenant.nyGovCredentialKey),
  steps: [openReplenish, replenish, home, selection, entityName, llcForm, bclForm, review, payment, bclPayment],
};
