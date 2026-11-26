import type { ScreenStep, SiteAdapter, StepContext } from "../types.js";
import { MO_SCREENS } from "./intents.js";
import { moAccount } from "../../settings/accounts.js";
import { fullLegalName } from "../../domain/name.js";
import { toUsDate } from "../../domain/usStates.js";

/**
 * Missouri domestic LLC formation, mapped from Missouri's step-by-step online guide
 * (docs/walks/missouri-2026-11-18.md). NOT yet walked on the live site: the Missouri online system
 * sits behind a Cloudflare challenge that refuses data-center IPs, so the walk runs from the
 * fixed-IP machine. complete=false: real runs are refused and dry runs stop before the cart payment.
 *
 * Screen order: login -> dashboard "Create LLC" -> type (LLC + domestic, "Begin") -> details
 * (name, duration, management, purpose) -> registered agent (MO address) -> organizers (1-5,
 * "Save organizer" after each) -> principal office -> review (acknowledge) -> signor (agreement)
 * -> shopping cart -> payment (credit card / eCheck). Fee: $50 online (vs $105 paper).
 *
 * The fill steps enter what the guide says each screen asks. The field labels in intents.ts are
 * provisional until the walk, so the first live sight of every screen halts for drift review,
 * where the captured wording replaces them. Buttons the guide names are clicked by those names;
 * the button that leaves the other screens was not in the guide, so these click a single Next or
 * Continue and say so when there is none.
 *
 * What the fixed-IP walk must capture (docs/walks/HOW-TO-RUN-THE-WALKS.md, Walk D): the sign-in
 * page and any second step (typing the stored login is not built; runs use the saved browser
 * session); each screen's exact field labels and the button that leaves it; the duration control
 * (perpetual or a date) and the management options' wording; whether the agent must already be in
 * the system and its consent wording; the organizer form (inline or a popup, and its save button);
 * the acknowledge and agreement wording; the signor title field; the cart's fee lines and any card
 * or eCheck surcharge; and the page after "Payment".
 */

const NEXT = /^(next|continue)\s*>?$/i;

function formation(ctx: StepContext) {
  const f = ctx.filing.request.formation;
  if (!f) throw new Error("formation details missing");
  return f;
}

async function bodyText(ctx: StepContext) {
  return (await ctx.page.locator("body").innerText()).replace(/\s+/g, " ");
}

/** Leaves a screen whose button the guide does not name: one Next or Continue, else a clear stop. */
async function next(ctx: StepContext, screen: string) {
  try {
    await ctx.clickButton(NEXT);
  } catch {
    throw new Error(`MO ${screen}: no Next or Continue button; the button that leaves this screen was not in the guide and must be captured on the walk`);
  }
}

const login: ScreenStep = {
  screen: MO_SCREENS.login,
  /** Only when the sign-in form is showing: a saved session goes straight to the dashboard. */
  async present(ctx) { return ctx.page.locator("input[type=password]").first().isVisible().catch(() => false); },
  async fill(ctx) {
    const profile = moAccount(ctx.tenant, ctx.client).profileKey;
    throw new Error(`MO: the sign-in page is showing; ${profile ? `the saved browser session ${profile} is not signed in` : "no Missouri login is set for this run"}, and typing the stored login is not built (the sign-in page was not walked)`);
  },
  async advance() { /* unreachable: fill stops the run */ },
};

const dashboard: ScreenStep = {
  screen: MO_SCREENS.dashboard,
  async fill() { /* the dashboard lists the LLC options */ },
  async advance(ctx) { await ctx.clickButton(/^create llc$/i); },
};

const entityType: ScreenStep = {
  screen: MO_SCREENS.entityType,
  async fill(ctx) {
    await ctx.set("entityType", "Limited Liability Company");
    await ctx.set("domesticForeign", "Domestic");
  },
  async advance(ctx) { await ctx.clickButton(/^begin$/i); },
};

const details: ScreenStep = {
  screen: MO_SCREENS.details,
  async fill(ctx) {
    const f = formation(ctx);
    if (f.seriesLlc) throw new Error("MO Series LLC needs an LLC 1A upload, which is not mapped yet");
    if (!f.managementStructure) throw new Error("MO requires the management structure");
    if (!f.purpose) throw new Error("MO requires a stated purpose");
    await ctx.set("name", fullLegalName(f.name));
    // "Duration until dissolution": perpetual unless the filing gives a duration or a dissolution date.
    await ctx.set("duration", f.duration ?? (f.dissolutionDate ? toUsDate(f.dissolutionDate) : "Perpetual"));
    await ctx.set("management", f.managementStructure === "manager_managed" ? "Manager-managed" : "Member-managed");
    await ctx.set("purpose", f.purpose);
  },
  async advance(ctx) { await next(ctx, "LLC details"); },
};

const registeredAgent: ScreenStep = {
  screen: MO_SCREENS.registeredAgent,
  async fill(ctx) {
    const agent = ctx.filing.registeredAgentResolution?.agent ?? formation(ctx).registeredAgent ?? ctx.client.registeredAgent;
    if (!agent?.address) throw new Error("MO requires a registered agent with an address");
    if (agent.address.state !== "MO") throw new Error("MO registered agent must have a Missouri address");
    await ctx.set("agentName", agent.name);
    await ctx.set("agentStreet1", agent.address.street1);
    if (agent.address.street2) await ctx.set("agentStreet2", agent.address.street2);
    await ctx.set("agentCity", agent.address.city);
    await ctx.set("agentState", "Missouri");
    await ctx.set("agentZip", agent.address.zip);
  },
  async advance(ctx) { await next(ctx, "registered agent"); },
};

const organizers: ScreenStep = {
  screen: MO_SCREENS.organizers,
  async fill(ctx) {
    const f = formation(ctx);
    const list = f.organizers.length ? f.organizers : f.members;
    if (!list.length) throw new Error("MO requires at least one organizer");
    if (list.length > 5) throw new Error("MO online filing allows at most 5 organizers; 6 or more needs a paper filing");
    for (const o of list) {
      if (!o.address) throw new Error(`MO organizer ${o.name} has no address`);
      await ctx.clickButton(/^add organizer$/i);
      await ctx.page.waitForTimeout(300);
      const form = await ctx.resolve(MO_SCREENS.organizerModal);
      await form.set("organizerName", o.name);
      await form.set("organizerStreet1", o.address.street1);
      await form.set("organizerCity", o.address.city);
      await form.set("organizerState", o.address.state);
      await form.set("organizerZip", o.address.zip);
      await ctx.actAndSettle(() => ctx.clickButton(/^save organizer$/i)); // the guide: "Save organizer" after each
      await ctx.note(`organizer saved: ${o.name}`);
    }
    const text = (await bodyText(ctx)).toUpperCase();
    for (const o of list) if (!text.includes(o.name.toUpperCase())) throw new Error(`MO organizer ${o.name} is not listed after saving`);
  },
  async advance(ctx) { await next(ctx, "organizers"); },
};

const principalOffice: ScreenStep = {
  screen: MO_SCREENS.principalOffice,
  async fill(ctx) {
    const a = formation(ctx).mainBusinessAddress ?? ctx.client.mainBusinessAddress;
    if (!a) throw new Error("MO requires the principal office address");
    await ctx.set("street1", a.street1);
    if (a.street2) await ctx.set("street2", a.street2);
    await ctx.set("city", a.city);
    await ctx.set("state", a.state);
    await ctx.set("zip", a.zip);
  },
  async advance(ctx) { await next(ctx, "principal office"); },
};

const review: ScreenStep = {
  screen: MO_SCREENS.review,
  async fill(ctx) {
    const name = fullLegalName(formation(ctx).name).toUpperCase();
    if (!(await bodyText(ctx)).toUpperCase().includes(name)) throw new Error("MO review does not show the LLC's name");
    // STOP: "the information provided above is true and correct", under the client's approval of this filing.
    await ctx.set("acknowledge", true);
  },
  async advance(ctx) { await next(ctx, "review"); },
};

const signer: ScreenStep = {
  screen: MO_SCREENS.signer,
  async fill(ctx) {
    const f = formation(ctx);
    const s = f.moSigner ?? f.signers[0];
    if (!s) throw new Error("MO requires a signer");
    await ctx.set("signerName", s.name);
    if (s.title) await ctx.set("signerTitle", s.title);
    // STOP: the guide's signature moment (agreement that the filing is true and correct), under the client's approval.
    await ctx.set("agreement", true);
  },
  async advance(ctx) { await next(ctx, "signor"); },
};

const cart: ScreenStep = {
  screen: MO_SCREENS.cart,
  paymentScreen: true,
  submitScreen: true,
  async fill(ctx) {
    // The guide: missing required fields raise an error here. How that error looks was not in the
    // guide; the fee check below and the drift review of this screen guard it until the walk.
    await ctx.set("paymentType", moAccount(ctx.tenant, ctx.client).paymentTypeLabel);
  },
  async advance(ctx) {
    // The card or eCheck page after "Payment" is not mapped: a dry run stops here; a live run is refused (complete: false).
    await ctx.submit("Payment", () => ctx.clickButton(/^payment$/i));
  },
};

export const moFormationAdapter: SiteAdapter = {
  site: "MO",
  key: "mo-formation",
  complete: false,
  entryUrl: () => process.env.MO_FORMATION_URL ?? "https://bsd.sos.mo.gov/",
  profileKey: (ctx) => moAccount(ctx.tenant, ctx.client).profileKey,
  credentialKey: (ctx) => moAccount(ctx.tenant, ctx.client).credentialKey,
  steps: [login, dashboard, entityType, details, registeredAgent, organizers, principalOffice, review, signer, cart],
};
