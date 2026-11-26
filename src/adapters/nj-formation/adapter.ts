import { filingKindOf } from "../../settings/payments.js";
import { renderName } from "../../domain/name.js";
import { splitZip, stateName, toUsDate } from "../../domain/usStates.js";
import type { ScreenStep, SiteAdapter, StepContext } from "../types.js";
import { njAccount } from "../../settings/accounts.js";
import { NameUnavailable } from "../types.js";
import { NJ_DP_SCREENS, NJ_NAME_AVAILABLE, NJ_SCREENS } from "./intents.js";
import { readDownload } from "../../browser/harness.js";
import type { ScreenIntents } from "../../resolver/types.js";
import type { Person } from "../../domain/filing.js";

/**
 * NJ Domestic LLC formation, rebuilt from the live walk of 2026-11-17, and the Domestic
 * For-Profit Corporation (DP) on the same wizard, from the guest walk of 2026-11-24
 * (docs/portal-maps/nj-business-formation.md).
 * Screen order: Welcome -> Business Name -> Designator (name check) -> Business Data ->
 * Business Purpose -> Main Business Address -> Registered Agent -> Registered Agent Info ->
 * Members (LLC) or Board of Directors and Incorporators (DP) -> Additional Information ->
 * Signatures -> Review -> Payment.
 *
 * complete=false: Pay Now hands off to the NICUSA payment gateway, which has not been
 * walked (it needs the signed-in client account, walk A). Until then real runs are refused
 * and dry runs stop before Pay Now. For a corporation, Signatures, Review and Payment were
 * not reached on its walk: they run as the LLC's do, under their own screen keys (see
 * NJ_DP_SCREENS), and the signer title is the only one the list offers or the one the filing
 * names.
 */

const CONTINUE = /^continue$/i;

function formation(ctx: StepContext) {
  const f = ctx.filing.request.formation;
  if (!f) throw new Error("formation details missing");
  return f;
}
const isCorp = (ctx: StepContext) => formation(ctx).njEntityType === "for_profit_corporation";
const forLlc = { async present(ctx: StepContext) { return !isCorp(ctx); } };
const forCorp = { async present(ctx: StepContext) { return isCorp(ctx); } };

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
    // Option labels as the live list shows them (capture 2026-11-17, 02-business-name).
    await ctx.set("entityType", isCorp(ctx) ? "NJ Domestic For-Profit Corporation (DP)" : "NJ Domestic Limited Liability Company (LLC)");
    await ctx.set("businessName", renderName(formation(ctx).name, "NJ").nameField);
  },
  advance: clickContinue,
};

/** The name check, then the designator (the LLC's and the corporation's lists differ). */
function designatorStep(screen: ScreenIntents, present: ScreenStep["present"]): ScreenStep {
  return {
    screen,
    present,
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
}
const designator = designatorStep(NJ_SCREENS.designator, forLlc.present);
const dpDesignator = designatorStep(NJ_DP_SCREENS.designator, forCorp.present);

async function fillBusinessData(ctx: StepContext) {
  const f = formation(ctx);
  if (ctx.values.ein) await ctx.set("ein", ctx.values.ein.replace(/\D/g, "")); // location box keeps its 000 default
  if (f.naicsCode) await ctx.set("naicsCode", f.naicsCode);
  if (f.duration) await ctx.set("duration", f.duration); // a corporation's box shows "Perpetual" by default
  if (f.effectiveDate === "specific" && f.effectiveDateValue) await ctx.set("effectiveDate", toUsDate(f.effectiveDateValue));
}

const businessData: ScreenStep = {
  screen: NJ_SCREENS.businessData,
  ...forLlc,
  fill: fillBusinessData,
  advance: clickContinue,
};

/** A corporation's Business Data adds the required Stock (Total Number of Shares), minimum 1. */
const dpBusinessData: ScreenStep = {
  screen: NJ_DP_SCREENS.businessData,
  ...forCorp,
  async fill(ctx) {
    const shares = formation(ctx).stockShares;
    if (!shares || shares < 1) throw new Error("NJ corporation: the total number of shares (at least 1) is missing");
    await fillBusinessData(ctx);
    await ctx.set("stock", String(shares));
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

/** Adds one person through an Add New ... popup (Name, street address, city, state, ZIP 5+4). */
async function addPerson(ctx: StepContext, button: string, modalScreen: ScreenIntents, who: string, p: Person) {
  if (!p.address) throw new Error(`${who} ${p.name} has no address`);
  const z = splitZip(p.address.zip);
  await ctx.clickButton(button); // link styled as a button
  await ctx.page.waitForTimeout(500); // modal fade-in
  const modal = await ctx.resolve(modalScreen);
  await modal.set("memberName", p.name);
  await modal.set("memberStreet1", p.address.street1);
  if (p.address.street2) await modal.set("memberStreet2", p.address.street2);
  await modal.set("memberCity", p.address.city);
  await modal.set("memberState", stateName(p.address.state));
  await modal.set("memberZip", z.zip5);
  if (z.plus4) await modal.set("memberZipPlus", z.plus4);
  // Quirk 1 (confirmed 2026-11-17 on Members): Enter from a filled field posts the popup. The
  // corporation's popups are assumed to behave the same; the table check before Continue catches it if not.
  const zipField = modal.field("memberZip");
  if (!zipField) throw new Error(`${who} zip field not resolved`);
  await ctx.actAndSettle(() => ctx.page.locator(`[data-ke-ref="${zipField.ref}"]`).press("Enter"));
  await ctx.page.waitForTimeout(500);
  await ctx.note(`${who} added: ${p.name}`);
}

/** Every person added must be in the page's table before Continue (Quirk 3: Continue may move on regardless). */
async function checkTable(ctx: StepContext, who: string, people: Person[]) {
  const text = await bodyText(ctx);
  if (new RegExp(`No ${who} Listed`, "i").test(text)) throw new Error(`NJ ${who.toLowerCase()} table is empty after adding them`);
  for (const p of people) {
    if (!text.toUpperCase().includes(p.name.toUpperCase())) throw new Error(`${who.toLowerCase()} ${p.name} not shown in the ${who.toLowerCase()} table`);
  }
}

const members: ScreenStep = {
  screen: NJ_SCREENS.members,
  ...forLlc,
  async fill(ctx) {
    const list = formation(ctx).members.length ? formation(ctx).members : ctx.client.defaultMember ? [ctx.client.defaultMember] : [];
    if (!list.length) throw new Error("NJ LLC needs at least one member");
    for (const m of list) await addPerson(ctx, "Add New Member", NJ_SCREENS.memberModal, "member", m);
  },
  async verify() { /* checked below, before Continue */ },
  async advance(ctx) {
    // Quirk 3 did not reproduce on 2026-11-17 (Continue with no member moved on). Check the table ourselves.
    await checkTable(ctx, "Member", formation(ctx).members);
    await clickContinue(ctx);
  },
};

/** A corporation's Board of Directors (Members page) and Incorporators (Members/Incorporators): at least one each, up to 10. */
function corpPeopleStep(screen: ScreenIntents, button: string, modal: ScreenIntents, who: "Director" | "Incorporator", list: (ctx: StepContext) => Person[]): ScreenStep {
  return {
    screen,
    ...forCorp,
    async fill(ctx) {
      const people = list(ctx);
      if (!people.length) throw new Error(`a NJ corporation needs at least one ${who.toLowerCase()}`);
      if (people.length > 10) throw new Error(`NJ lists at most 10 ${who.toLowerCase()}s`);
      for (const p of people) await addPerson(ctx, button, modal, who.toLowerCase(), p);
    },
    async advance(ctx) {
      // Continue stays disabled until one is added (walk 2026-11-24); the table check says which is missing.
      await checkTable(ctx, who, list(ctx));
      await clickContinue(ctx);
    },
  };
}
const directors = corpPeopleStep(NJ_DP_SCREENS.directors, "Add New Director", NJ_DP_SCREENS.directorModal, "Director", (ctx) => formation(ctx).directors);
const incorporators = corpPeopleStep(NJ_DP_SCREENS.incorporators, "Add New Incorporators", NJ_DP_SCREENS.incorporatorModal, "Incorporator", (ctx) => formation(ctx).incorporators);

const additionalInformation: ScreenStep = {
  screen: NJ_SCREENS.additionalInformation,
  async fill(ctx) {
    if (formation(ctx).otherProvisions.length) throw new Error("NJ Other Provisions entry is not mapped yet");
  },
  advance: clickContinue,
};

/**
 * Who signs, and under which title. An LLC: the filing's signers (else the firm's default), as
 * "Authorized Representative" unless named (the LLC's only title, 2026-11-17). A corporation: the
 * filing's signers, else its incorporators; a signer without a title takes the only title the
 * list offers, and the run stops when it offers several (the corporation's list was not walked).
 */
function signersFor(ctx: StepContext): { name: string; title?: string }[] {
  const f = formation(ctx);
  if (isCorp(ctx)) return f.signers.length ? f.signers : f.incorporators.map((p) => ({ name: p.name }));
  const list = f.signers.length ? f.signers : ctx.client.defaultSigner ? [ctx.client.defaultSigner] : [];
  return list.map((s) => ({ name: s.name, title: s.title ?? "Authorized Representative" }));
}

function signaturesStep(screen: ScreenIntents, present: ScreenStep["present"]): ScreenStep {
  return {
    screen,
    present,
    async fill(ctx) {
      const signers = signersFor(ctx);
      if (!signers.length) throw new Error("NJ requires at least one signer");
      for (const s of signers) {
        await ctx.clickButton("Add New Signer");
        await ctx.page.waitForTimeout(500);
        const modal = await ctx.resolve(NJ_SCREENS.signerModal);
        await modal.set("signerName", s.name);
        const offered = (modal.field("signerTitle")?.options ?? []).filter((o) => o.value && !/select one/i.test(o.label));
        const title = s.title ?? (offered.length === 1 ? offered[0]!.label : undefined);
        if (!title) throw new Error(`NJ Signatures: the title list offers ${offered.map((o) => `"${o.label}"`).join(", ") || "no titles"}; name the title for ${s.name}`);
        await modal.set("signerTitle", title);
        // Quirk 2 (confirmed): the Save input is aria-hidden, so it has no accessible name. It is the modal's primary button.
        await ctx.actAndSettle(() => ctx.page.locator("div.modal-body .btn-primary, .modal .btn-primary").first().click());
        await ctx.page.waitForTimeout(500);
        await ctx.note(`signer added: ${s.name} (${title})`);
      }
      // Each signer row has its own signature checkbox (labelled by the "Signature" column); Continue enables when all are checked.
      const scoped = await ctx.resolve(screen);
      const boxes = scoped.fields.filter((x) => x.kind === "checkbox" && x.visible && !x.disabled && /^signature\b/i.test(x.label));
      if (boxes.length !== signers.length) throw new Error(`expected ${signers.length} signature boxes, found ${boxes.length}`);
      for (const box of boxes) await ctx.page.locator(`[data-ke-ref="${box.ref}"]`).check();
      await ctx.note(`signature checkboxes checked: ${boxes.length}`);
    },
    advance: clickContinue,
  };
}
const signatures = signaturesStep(NJ_SCREENS.signatures, forLlc.present);
const dpSignatures = signaturesStep(NJ_DP_SCREENS.signatures, forCorp.present);

function reviewStep(screen: ScreenIntents, present: ScreenStep["present"]): ScreenStep {
  return {
    screen,
    present,
    async fill(ctx) {
      const text = (await bodyText(ctx)).toUpperCase();
      const f = formation(ctx);
      const name = renderName(f.name, "NJ").nameField.toUpperCase();
      if (!text.includes(name)) throw new Error("review screen does not show the business name");
      await ctx.note("review screen reached");
    },
    advance: clickContinue,
  };
}
const review = reviewStep(NJ_SCREENS.review, forLlc.present);
const dpReview = reviewStep(NJ_DP_SCREENS.review, forCorp.present);

const payment: ScreenStep = {
  screen: NJ_SCREENS.payment,
  ...forLlc,
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
    await ctx.set("paymentType", njAccount(ctx.tenant, ctx.client, filingKindOf(ctx.filing.request)).paymentTypeLabel);
    const understand = ctx.page.getByRole("button", { name: /^I Understand$/i });
    if (await understand.isVisible().catch(() => false)) await understand.click(); // e-check disclaimer modal
    const d = ctx.client.checkboxDefaults;
    // V30: the subscriber's NJ portal defaults (Setup) decide, else the firm's settings.
    const pd = (ctx.tenant.portalDefaults as Record<string, Record<string, unknown> | undefined> | undefined)?.["nj-portal"];
    await ctx.set("annualReportReminders", typeof pd?.annualReportReminders === "boolean" ? pd.annualReportReminders : d.njAnnualReportReminders);
    await ctx.set("corpWatchAlerts", typeof pd?.corpWatchAlerts === "boolean" ? pd.corpWatchAlerts : d.njCorpWatchAlerts);
  },
  async advance(ctx) {
    await ctx.submit("Pay Now", () => ctx.clickButton(/^pay now$/i));
  },
};

/** The corporation's Payment page, under its own key: not reached on its walk, and its add-on prices are unknown (none are ordered). */
const dpPayment: ScreenStep = { ...payment, screen: NJ_DP_SCREENS.payment, ...forCorp };

export const njFormationAdapter: SiteAdapter = {
  site: "NJ",
  key: "nj-formation",
  complete: false,
  entryUrl: () => process.env.NJ_FORMATION_URL ?? "https://www.njportal.com/DOR/BusinessFormation/Home/Welcome",
  profileKey: (ctx) => njAccount(ctx.tenant, ctx.client).profileKey,
  credentialKey: (ctx) => njAccount(ctx.tenant, ctx.client).credentialKey,
  steps: [
    welcome, businessName, designator, dpDesignator, businessData, dpBusinessData, businessPurpose, mainAddress,
    registeredAgent, registeredAgentInfo, members, directors, incorporators, additionalInformation,
    signatures, dpSignatures, review, dpReview, payment, dpPayment,
  ],
  async collectArtifacts(ctx) {
    // Unreached until the gateway is mapped. NJ documents are later retrievable with the
    // confirmation number + email at businessrecords/RetrieveDocuments.aspx.
    const out: { kind: string; label: string; contentType: string; body: Buffer }[] = [];
    const links = ctx.page.locator("a[href$='.pdf'], a:has-text('Download'), a:has-text('Formation Document')");
    const n = await links.count();
    for (let i = 0; i < n; i++) {
      const [dl] = await Promise.all([ctx.page.waitForEvent("download", { timeout: 15_000 }).catch(() => null), links.nth(i).click()]);
      if (!dl) continue;
      const body = await readDownload(dl).catch(() => null);
      if (!body) continue;
      out.push({ kind: "formation_document", label: dl.suggestedFilename(), contentType: "application/pdf", body });
    }
    return out;
  },
};
