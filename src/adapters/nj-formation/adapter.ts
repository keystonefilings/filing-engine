import { renderName } from "../../domain/name.js";
import { splitZip, stateName, toUsDate } from "../../domain/usStates.js";
import type { ScreenStep, SiteAdapter, StepContext } from "../types.js";
import { njAccount } from "../../settings/accounts.js";
import { NameUnavailable } from "../types.js";
import { NJ_NAME_AVAILABLE, NJ_SCREENS } from "./intents.js";

/**
 * NJ Domestic LLC formation, rebuilt from the live walk of 2026-11-17.
 * Screen order: Welcome -> Business Name -> Designator (name check) -> Business Data ->
 * Business Purpose -> Main Business Address -> Registered Agent -> Registered Agent Info ->
 * Members -> Additional Information -> Signatures -> Review -> Payment.
 *
 * complete=false: Pay Now hands off to the NICUSA payment gateway, which has not been
 * walked (it needs the signed-in client account, walk A). Until then real runs are refused
 * and dry runs stop before Pay Now.
 */

const CONTINUE = /^continue$/i;

function formation(ctx: StepContext) {
  const f = ctx.filing.request.formation;
  if (!f) throw new Error("formation details missing");
  return f;
}

async function clickContinue(ctx: StepContext) {
  await ctx.clickButton(CONTINUE); // the engine wraps advance() in actAndSettle
}

async function bodyText(ctx: StepContext) {
  return (await ctx.page.locator("body").innerText()).replace(/\s+/g, " ");
}

const welcome: ScreenStep = {
  screen: NJ_SCREENS.welcome,
  async present(ctx) { return ctx.page.getByRole("button", { name: /^get started$/i }).isVisible().catch(() => false); },
  async fill() { /* nothing to enter */ },
  async advance(ctx) { await ctx.clickButton(/^get started$/i); },
};

const businessName: ScreenStep = {
  screen: NJ_SCREENS.businessName,
  async fill(ctx) {
    await ctx.set("entityType", "NJ Domestic Limited Liability Company (LLC)");
    await ctx.set("businessName", renderName(formation(ctx).name, "NJ").nameField);
  },
  advance: clickContinue,
};

const designator: ScreenStep = {
  screen: NJ_SCREENS.designator,
  nameCheckGate: true,
  async fill(ctx) {
    const text = await bodyText(ctx);
    const name = renderName(formation(ctx).name, "NJ").nameField;
    if (!NJ_NAME_AVAILABLE.test(text)) {
      throw new NameUnavailable(name, /not available|unavailable|already/i.test(text) ? "portal reported the name is not available" : "availability message not found on the designator screen");
    }
    await ctx.set("designator", renderName(formation(ctx).name, "NJ").designator ?? ctx.client.designatorDefault);
  },
  advance: clickContinue,
};

const businessData: ScreenStep = {
  screen: NJ_SCREENS.businessData,
  async fill(ctx) {
    const f = formation(ctx);
    if (ctx.values.ein) await ctx.set("ein", ctx.values.ein.replace(/\D/g, "")); // location box keeps its 000 default
    if (f.naicsCode) await ctx.set("naicsCode", f.naicsCode);
    if (f.duration) await ctx.set("duration", f.duration);
    if (f.effectiveDate === "specific" && f.effectiveDateValue) await ctx.set("effectiveDate", toUsDate(f.effectiveDateValue));
  },
  advance: clickContinue,
};

const businessPurpose: ScreenStep = {
  screen: NJ_SCREENS.businessPurpose,
  async fill(ctx) {
    const p = formation(ctx).purpose;
    if (p) await ctx.set("purpose", p);
  },
  advance: clickContinue,
};

const mainAddress: ScreenStep = {
  screen: NJ_SCREENS.mainAddress,
  async fill(ctx) {
    const a = formation(ctx).mainBusinessAddress ?? ctx.client.mainBusinessAddress;
    if (!a) return; // optional in NJ
    const z = splitZip(a.zip);
    await ctx.set("street1", a.street1);
    if (a.street2) await ctx.set("street2", a.street2);
    await ctx.set("city", a.city);
    await ctx.set("state", stateName(a.state));
    await ctx.set("zip", z.zip5);
    if (z.plus4) await ctx.set("zipPlus", z.plus4);
  },
  advance: clickContinue,
};

const registeredAgent: ScreenStep = {
  screen: NJ_SCREENS.registeredAgent,
  async fill() { /* choice is made in advance() */ },
  async advance(ctx) {
    if (ctx.client.njRegisteredAgentNumber) {
      // The number path has not been walked (no real agent number used on 2026-11-17).
      throw new Error("NJ registered agent number path is not mapped yet; remove njRegisteredAgentNumber or walk it first");
    }
    await ctx.clickButton("Enter a Registered Agent/Office"); // a link to RegisteredAgent/NoId
  },
};

const registeredAgentInfo: ScreenStep = {
  screen: NJ_SCREENS.registeredAgentInfo,
  async fill(ctx) {
    const agent = ctx.filing.registeredAgentResolution?.agent ?? formation(ctx).registeredAgent ?? ctx.client.registeredAgent;
    if (!agent?.address) throw new Error("registered agent missing");
    const z = splitZip(agent.address.zip);
    await ctx.set("agentName", agent.name);
    if (agent.email) await ctx.set("agentEmail", agent.email);
    await ctx.set("agentStreet1", agent.address.street1);
    if (agent.address.street2) await ctx.set("agentStreet2", agent.address.street2);
    await ctx.set("agentCity", agent.address.city);
    await ctx.set("agentZip", z.zip5);
    if (z.plus4) await ctx.set("agentZipPlus", z.plus4);
    await ctx.set("agentAttest", true);
  },
  advance: clickContinue,
};

const members: ScreenStep = {
  screen: NJ_SCREENS.members,
  async fill(ctx) {
    const list = formation(ctx).members.length ? formation(ctx).members : ctx.client.defaultMember ? [ctx.client.defaultMember] : [];
    if (!list.length) throw new Error("NJ LLC needs at least one member");
    for (const m of list) {
      if (!m.address) throw new Error(`member ${m.name} has no address`);
      const z = splitZip(m.address.zip);
      await ctx.clickButton("Add New Member"); // link styled as a button
      await ctx.page.waitForTimeout(500); // modal fade-in
      const modal = await ctx.resolve(NJ_SCREENS.memberModal);
      await modal.set("memberName", m.name);
      await modal.set("memberStreet1", m.address.street1);
      if (m.address.street2) await modal.set("memberStreet2", m.address.street2);
      await modal.set("memberCity", m.address.city);
      await modal.set("memberState", stateName(m.address.state));
      await modal.set("memberZip", z.zip5);
      if (z.plus4) await modal.set("memberZipPlus", z.plus4);
      // Quirk 1 (confirmed 2026-11-17): Enter from a filled field posts Members/ModalAddMember.
      const zipField = modal.field("memberZip");
      if (!zipField) throw new Error("member zip field not resolved");
      await ctx.actAndSettle(() => ctx.page.locator(`[data-ke-ref="${zipField.ref}"]`).press("Enter"));
      await ctx.page.waitForTimeout(500);
      await ctx.note(`member added: ${m.name}`);
    }
  },
  async verify() { /* checked below, before Continue */ },
  async advance(ctx) {
    // Quirk 3 did not reproduce on 2026-11-17 (Continue with no member moved on). Check the table ourselves.
    const text = await bodyText(ctx);
    if (/No Member Listed/i.test(text)) throw new Error("NJ member table is empty after adding members");
    for (const m of formation(ctx).members) {
      if (!text.toUpperCase().includes(m.name.toUpperCase())) throw new Error(`member ${m.name} not shown in the member table`);
    }
    await clickContinue(ctx);
  },
};

const additionalInformation: ScreenStep = {
  screen: NJ_SCREENS.additionalInformation,
  async fill(ctx) {
    if (formation(ctx).otherProvisions.length) throw new Error("NJ Other Provisions entry is not mapped yet");
  },
  advance: clickContinue,
};

const signatures: ScreenStep = {
  screen: NJ_SCREENS.signatures,
  async fill(ctx) {
    const f = formation(ctx);
    const signers = f.signers.length ? f.signers : ctx.client.defaultSigner ? [ctx.client.defaultSigner] : [];
    if (!signers.length) throw new Error("NJ requires at least one signer");
    for (const s of signers) {
      await ctx.clickButton("Add New Signer");
      await ctx.page.waitForTimeout(500);
      const modal = await ctx.resolve(NJ_SCREENS.signerModal);
      await modal.set("signerName", s.name);
      await modal.set("signerTitle", s.title ?? "Authorized Representative");
      // Quirk 2 (confirmed): the Save input is aria-hidden, so it has no accessible name. It is the modal's primary button.
      await ctx.actAndSettle(() => ctx.page.locator("div.modal-body .btn-primary, .modal .btn-primary").first().click());
      await ctx.page.waitForTimeout(500);
      await ctx.note(`signer added: ${s.name}`);
    }
    // Each signer row has its own signature checkbox (labelled by the "Signature" column); Continue enables when all are checked.
    const scoped = await ctx.resolve(NJ_SCREENS.signatures);
    const boxes = scoped.fields.filter((x) => x.kind === "checkbox" && x.visible && !x.disabled && /^signature\b/i.test(x.label));
    if (boxes.length !== signers.length) throw new Error(`expected ${signers.length} signature boxes, found ${boxes.length}`);
    for (const box of boxes) await ctx.page.locator(`[data-ke-ref="${box.ref}"]`).check();
    await ctx.note(`signature checkboxes checked: ${boxes.length}`);
  },
  advance: clickContinue,
};

const review: ScreenStep = {
  screen: NJ_SCREENS.review,
  async fill(ctx) {
    const text = (await bodyText(ctx)).toUpperCase();
    const f = formation(ctx);
    const name = renderName(f.name, "NJ").nameField.toUpperCase();
    if (!text.includes(name)) throw new Error("review screen does not show the business name");
    await ctx.note("review screen reached");
  },
  advance: clickContinue,
};

const payment: ScreenStep = {
  screen: NJ_SCREENS.payment,
  paymentScreen: true,
  feeDisplay: "price_list", // the screen lists every option's price and no payable total
  submitScreen: true,
  async fill(ctx) {
    const f = formation(ctx);
    const r = ctx.filing.request;
    if (f.additionalCertificates.certificateOfStanding) await ctx.set("certificateOfStanding", true);
    if (f.additionalCertificates.certifiedCopy) await ctx.set("certifiedCopy", true);
    await ctx.set("contactFirstName", r.contact.firstName);
    await ctx.set("contactLastName", r.contact.lastName);
    await ctx.set("contactPhone", r.contact.phone);
    await ctx.set("contactEmail", r.contact.email);
    await ctx.set("contactEmailConfirm", r.contact.email);
    // Signed out the dropdown offers Credit Card / E-Check; the signed-in stored-method behaviour is unwalked (decision 3).
    await ctx.set("paymentType", njAccount(ctx.tenant, ctx.client).paymentTypeLabel);
    const understand = ctx.page.getByRole("button", { name: /^I Understand$/i });
    if (await understand.isVisible().catch(() => false)) await understand.click(); // e-check disclaimer modal
    const d = ctx.client.checkboxDefaults;
    await ctx.set("annualReportReminders", d.njAnnualReportReminders);
    await ctx.set("corpWatchAlerts", d.njCorpWatchAlerts);
  },
  async advance(ctx) {
    await ctx.submit("Pay Now", () => ctx.clickButton(/^pay now$/i));
  },
};

export const njFormationAdapter: SiteAdapter = {
  site: "NJ",
  key: "nj-formation",
  complete: false,
  entryUrl: () => process.env.NJ_FORMATION_URL ?? "https://www.njportal.com/DOR/BusinessFormation/Home/Welcome",
  profileKey: (ctx) => njAccount(ctx.tenant, ctx.client).profileKey,
  credentialKey: (ctx) => njAccount(ctx.tenant, ctx.client).credentialKey,
  steps: [welcome, businessName, designator, businessData, businessPurpose, mainAddress, registeredAgent, registeredAgentInfo, members, additionalInformation, signatures, review, payment],
  async collectArtifacts(ctx) {
    // Unreached until the gateway is mapped. NJ documents are later retrievable with the
    // confirmation number + email at businessrecords/RetrieveDocuments.aspx.
    const out: { kind: string; label: string; contentType: string; body: Buffer }[] = [];
    const links = ctx.page.locator("a[href$='.pdf'], a:has-text('Download'), a:has-text('Formation Document')");
    const n = await links.count();
    for (let i = 0; i < n; i++) {
      const [dl] = await Promise.all([ctx.page.waitForEvent("download", { timeout: 15_000 }).catch(() => null), links.nth(i).click()]);
      if (!dl) continue;
      const path = await dl.path();
      if (!path) continue;
      const { readFile } = await import("node:fs/promises");
      out.push({ kind: "formation_document", label: dl.suggestedFilename(), contentType: "application/pdf", body: await readFile(path) });
    }
    return out;
  },
};
