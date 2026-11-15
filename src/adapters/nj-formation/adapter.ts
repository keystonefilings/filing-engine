import { renderName } from "../../domain/name.js";
import type { ScreenStep, SiteAdapter, StepContext } from "../types.js";
import { NameUnavailable } from "../types.js";
import { NJ_SCREENS } from "./intents.js";

const CONTINUE = /^(continue|next)$/i;

function formation(ctx: StepContext) {
  const f = ctx.filing.request.formation;
  if (!f) throw new Error("formation details missing");
  return f;
}

async function clickContinue(ctx: StepContext) {
  await ctx.clickButton(CONTINUE); // the engine wraps advance() in actAndSettle
}

const businessName: ScreenStep = {
  screen: NJ_SCREENS.businessName,
  async fill(ctx) {
    const f = formation(ctx);
    await ctx.set("entityType", "Domestic Limited Liability Company");
    await ctx.set("businessName", renderName(f.name, "NJ").nameField);
  },
  advance: clickContinue,
};

const designator: ScreenStep = {
  screen: NJ_SCREENS.designator,
  nameCheckGate: true,
  async fill(ctx) {
    const text = (await ctx.page.locator("body").innerText()).toLowerCase();
    if (/not available|already in use|unavailable|too similar/.test(text)) {
      throw new NameUnavailable(renderName(formation(ctx).name, "NJ").nameField, "portal reported the name is not available");
    }
    await ctx.set("designator", renderName(formation(ctx).name, "NJ").designator ?? ctx.client.designatorDefault);
  },
  advance: clickContinue,
};

const businessData: ScreenStep = {
  screen: NJ_SCREENS.businessData,
  async fill(ctx) {
    const f = formation(ctx);
    if (f.purpose) await ctx.set("purpose", f.purpose);
    if (ctx.values.ein) await ctx.set("ein", ctx.values.ein.replace(/\D/g, ""));
  },
  advance: clickContinue,
};

const mainAddress: ScreenStep = {
  screen: NJ_SCREENS.mainAddress,
  async fill(ctx) {
    const a = formation(ctx).mainBusinessAddress;
    await ctx.set("street1", a.street1);
    if (a.street2) await ctx.set("street2", a.street2);
    await ctx.set("city", a.city);
    await ctx.set("state", a.state);
    await ctx.set("zip", a.zip);
  },
  advance: clickContinue,
};

const registeredAgent: ScreenStep = {
  screen: NJ_SCREENS.registeredAgent,
  async fill(ctx) {
    const agent = formation(ctx).registeredAgent ?? ctx.client.registeredAgent;
    if (!agent?.address) throw new Error("registered agent missing");
    await ctx.set("agentMode", "Enter a Registered Agent/Office");
    const scoped = await ctx.resolve(NJ_SCREENS.registeredAgent); // fields may appear after the radio
    await scoped.set("agentName", agent.name);
    await scoped.set("agentStreet1", agent.address.street1);
    await scoped.set("agentCity", agent.address.city);
    await scoped.set("agentState", agent.address.state);
    await scoped.set("agentZip", agent.address.zip);
    await scoped.set("agentDesignation", true);
  },
  advance: clickContinue,
};

const members: ScreenStep = {
  screen: NJ_SCREENS.members,
  async fill(ctx) {
    const list = formation(ctx).members.length ? formation(ctx).members : ctx.client.defaultMember ? [ctx.client.defaultMember] : [];
    if (!list.length) throw new Error("NJ requires at least one member");
    for (const m of list) {
      if (!m.address) throw new Error(`member ${m.name} has no address`);
      await ctx.clickButton(/add new member/i);
      const modal = await ctx.resolve(NJ_SCREENS.memberModal);
      await modal.set("memberName", m.name);
      await modal.set("memberStreet1", m.address.street1);
      if (m.address.street2) await modal.set("memberStreet2", m.address.street2);
      await modal.set("memberCity", m.address.city);
      await modal.set("memberState", m.address.state);
      await modal.set("memberZip", m.address.zip);
      // Quirk 1: the modal's Add control sits under a label and resists clicks; Enter from a filled field posts ModalAddMember.
      const zipField = modal.field("memberZip");
      if (!zipField) throw new Error("member zip field not resolved");
      await ctx.actAndSettle(() => ctx.page.locator(`[data-ke-ref="${zipField.ref}"]`).press("Enter"));
      await ctx.note(`member added: ${m.name}`);
    }
  },
  advance: clickContinue,
  async verify(ctx) {
    // Quirk 3: Continue silently bounces back here when no member exists.
    const headings = (await ctx.page.locator("h1,h2,h3,legend").allInnerTexts()).join(" ").toLowerCase();
    if (/members?\s*\/?\s*managers?/.test(headings) && !/other provisions/.test(headings)) {
      throw new Error("NJ bounced back to Members/Managers: no member was saved");
    }
  },
};

const otherProvisions: ScreenStep = {
  screen: NJ_SCREENS.otherProvisions,
  async fill(ctx) {
    const f = formation(ctx);
    for (const p of f.otherProvisions) {
      await ctx.clickButton(/add/i);
      const scoped = await ctx.resolve(NJ_SCREENS.otherProvisions);
      await scoped.set("provisionText", p);
      await ctx.clickButton(/save|add/i);
    }
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
      await ctx.clickButton(/add new signer/i);
      const modal = await ctx.resolve(NJ_SCREENS.signerModal);
      await modal.set("signerName", s.name);
      await modal.set("signerTitle", s.title ?? "Authorized Representative");
      // Quirk 2: the Save button has no accessible name; click the modal body's primary button (posts ModalAddSigner).
      await ctx.actAndSettle(() => ctx.page.locator("div.modal-body .btn-primary, .modal .btn-primary").first().click());
      await ctx.note(`signer added: ${s.name}`);
    }
    // Each signer row has its own signature checkbox; all must be checked before Continue enables.
    const scoped = await ctx.resolve(NJ_SCREENS.signatures);
    const boxes = scoped.fields.filter((f) => f.kind === "checkbox" && f.visible && !f.disabled && /sign|accept|execute|certif/i.test(f.label));
    for (const box of boxes) await ctx.page.locator(`[data-ke-ref="${box.ref}"]`).check();
    if (!boxes.length) await scoped.set("signatureCheckbox", true);
    await ctx.note(`signature checkboxes checked: ${boxes.length || 1}`);
  },
  advance: clickContinue,
};

const review: ScreenStep = {
  screen: NJ_SCREENS.review,
  async fill(ctx) { await ctx.note("review screen reached"); },
  advance: clickContinue,
};

const payment: ScreenStep = {
  screen: NJ_SCREENS.payment,
  paymentScreen: true,
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
    // Decision 3: pay with the method stored in the client's signed-in NJ account.
    const method = ctx.client.njStoredPaymentMethod === "stored_echeck" ? "E-Check" : "Credit Card";
    await ctx.set("paymentType", method);
    const d = ctx.client.checkboxDefaults;
    await ctx.set("annualReportReminders", d.njAnnualReportReminders);
    await ctx.set("corpWatchAlerts", d.njCorpWatchAlerts);
  },
  async advance(ctx) {
    await ctx.submit("Pay Now", () => ctx.clickButton(/pay now/i));
  },
};

export const njFormationAdapter: SiteAdapter = {
  site: "NJ",
  key: "nj-formation",
  complete: true,
  entryUrl: () => process.env.NJ_FORMATION_URL ?? "https://www.njportal.com/DOR/BusinessFormation",
  profileKey: (ctx) => (ctx.client.njAccountCredentialKey ? `nj:${ctx.client.clientCompanyId}` : null),
  credentialKey: (ctx) => ctx.client.njAccountCredentialKey ?? null,
  steps: [businessName, designator, businessData, mainAddress, registeredAgent, members, otherProvisions, signatures, review, payment],
  async collectArtifacts(ctx) {
    // Official Authenticated Formation Document is always included; capture whatever download links appear.
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
