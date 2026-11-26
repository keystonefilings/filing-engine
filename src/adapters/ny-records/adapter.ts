import { fullLegalName } from "../../domain/name.js";
import type { CertificateOfChangeDetails, NyDosEntity } from "../../domain/filing.js";
import { tenantVaultKey } from "../../settings/accounts.js";
import type { ScreenIntents } from "../../resolver/types.js";
import { NameUnavailable, type ScreenStep, type SiteAdapter, type StepContext } from "../types.js";
import { NY_SCREENS } from "../ny-formation/intents.js";
import { copyCc } from "../copies.js";
import {
  drawdownPaymentStep, fillAttestation, fillFilerInformation, homeStep, noteTransactionNumber, openReplenish, replenish,
  tickPlainCopyIfAsked, verifyExactMatch,
} from "../ny-dos/common.js";
import { NY_AMENDMENT, NY_CHANGE, NY_CHANGE_TYPES, NY_COPY, NY_DISSOLUTION, NY_STATUS } from "./intents.js";

/**
 * NY DOS filings about an existing entity, on the On-Line Filing System signed in as the service
 * company, built to the portal map of 2026-11-24 (docs/portal-maps/ny-dos-corporations.md):
 *
 *   G  Articles of Dissolution, domestic LLC     search -> form -> validation preview -> payment
 *   H  Certificate of Amendment (name change)    search -> new name -> form -> preview -> payment
 *   I  Certificate of Change, by entity          search -> change selection -> form -> preview -> payment
 *   J  Copy of Document                          search -> filing history -> confirmation -> payment
 *   K  Certificates of Status                    search and certificate -> review -> payment
 *
 * Each run starts like every NY DOS filing, by funding the draw-down account with exactly the
 * approved total (Screen M, shared with the formation adapter), and ends on the same draw-down
 * payment page (account, Payment Authorization, Submit = FINAL), shared with E-Submission's.
 *
 * complete:false for all five: the map stops at each Submit, so no page after it (receipt,
 * transaction confirmation) is mapped, and the live deposit is not built. Dry runs stop before
 * Submit with Payment Authorization unticked. No review screen is marked for decision 7: the
 * previews are images whose text is the entity, DOS ID and a per-session transaction number, so
 * the client approves the data and fees.
 *
 * Not mapped, so the runs stop with a message instead of guessing: where a plain copy is ticked
 * on G to I (only the fee line was visible), how an entity is picked when the J/K search returns
 * a list, the copy type (certified) on J, and the Designate / Revoke Registered Agent sections on I.
 */

const NEXT = /^(continue|next)\s*>?$/i;

async function bodyText(ctx: StepContext) {
  return (await ctx.page.locator("body").innerText()).replace(/\s+/g, " ");
}

function details<T>(ctx: StepContext, key: "dissolution" | "amendment" | "certificateOfChange" | "copyRequest"): T {
  const d = ctx.filing.request[key];
  if (!d) throw new Error(`${key} details missing`);
  return d as T;
}

/** Search by the exact DOS ID and entity name (Screens G1, H1, I1). */
function entitySearchStep(screen: ScreenIntents, entity: (ctx: StepContext) => NyDosEntity): ScreenStep {
  return {
    screen,
    async fill(ctx) {
      const e = entity(ctx);
      await ctx.set("dosId", e.dosId);
      await ctx.set("entityName", e.name);
    },
    async advance(ctx) { await ctx.clickButton(/^search$/i); },
    async verify(ctx) { const e = entity(ctx); await verifyExactMatch(ctx, e.dosId, e.name); },
  };
}

/** The form's read-only Entity Information must be the entity searched for. */
async function checkEntityShown(ctx: StepContext, e: Pick<NyDosEntity, "name">) {
  const text = (await bodyText(ctx)).toUpperCase();
  if (!text.includes(e.name.trim().toUpperCase().replace(/\s+/g, " "))) throw new Error(`NY DOS: this page does not show the entity "${e.name}"`);
}

/** The preview / validation page (G3, H4, I4): the entity and DOS ID shown, the transaction number noted. */
function previewStep(screen: ScreenIntents, entity: (ctx: StepContext) => NyDosEntity): ScreenStep {
  return {
    screen,
    async fill(ctx) {
      const e = entity(ctx);
      const text = await bodyText(ctx);
      if (!text.includes(e.dosId)) throw new Error(`NY DOS ${screen.title}: DOS ID ${e.dosId} is not on the preview`);
      await noteTransactionNumber(ctx);
    },
    async advance(ctx) { await ctx.clickButton(NEXT); },
  };
}

const adapterBase = {
  site: "NY" as const,
  complete: false,
  // The signed-in home page (Screen A); its address was not readable in the recording, so set NY_DOS_HOME_URL once seen.
  entryUrl: () => process.env.NY_DOS_HOME_URL ?? "https://filings.dos.ny.gov/ords/r/corpanc/efiling",
  // The service company's NY DOS login and saved browser session, per tenant (as formation and E-Submission).
  profileKey: (ctx: Pick<StepContext, "tenant">) => `ny:${ctx.tenant.tenantId}`,
  credentialKey: (ctx: Pick<StepContext, "tenant">) => tenantVaultKey(ctx.tenant, ctx.tenant.nyGovCredentialKey),
};

// ---------------------------------------------------------------- G: Articles of Dissolution

type Dissolution = NonNullable<StepContext["filing"]["request"]["dissolution"]>;
const dissolution = (ctx: StepContext) => details<Dissolution>(ctx, "dissolution");
const DISSOLUTION_REASON: Record<Dissolution["reason"], string> = {
  member_vote: "The vote or written consent of a majority in interest of the members",
  no_members: "There are no members of the limited liability company",
  dissolution_date: "Pursuant to the dissolution date set forth in the articles of organization or operating agreement",
  judicial_decree: "The entry of a decree of judicial dissolution",
};

export const nyDissolutionAdapter: SiteAdapter = {
  ...adapterBase,
  key: "ny-dissolution",
  steps: [
    openReplenish, replenish,
    homeStep(NY_SCREENS.home, /^articles of dissolution: domestic limited liability company$/i, "Articles of Dissolution: Domestic Limited Liability Company"),
    entitySearchStep(NY_DISSOLUTION.search, (ctx) => dissolution(ctx).entity),
    {
      screen: NY_DISSOLUTION.form,
      async fill(ctx) {
        const d = dissolution(ctx);
        await checkEntityShown(ctx, d.entity);
        await ctx.set("reason", DISSOLUTION_REASON[d.reason]);
        await tickPlainCopyIfAsked(ctx, d.plainCopy);
        await fillAttestation(ctx, d.signer);
        await fillFilerInformation(ctx);
      },
      async advance(ctx) { await ctx.clickButton(NEXT); },
    },
    previewStep(NY_DISSOLUTION.preview, (ctx) => dissolution(ctx).entity),
    drawdownPaymentStep(NY_DISSOLUTION.payment),
  ],
};

// ---------------------------------------------------------------- H: Certificate of Amendment (name change only)

type Amendment = NonNullable<StepContext["filing"]["request"]["amendment"]>;
const amendment = (ctx: StepContext) => details<Amendment>(ctx, "amendment");
const newName = (ctx: StepContext) => fullLegalName(amendment(ctx).newName);

export const nyNameChangeAdapter: SiteAdapter = {
  ...adapterBase,
  key: "ny-amendment",
  steps: [
    openReplenish, replenish,
    homeStep(NY_SCREENS.home, /^certificate of amendment \(name change only\)$/i, "Certificate of Amendment (name change only)"),
    entitySearchStep(NY_AMENDMENT.search, (ctx) => amendment(ctx).entity),
    {
      screen: NY_AMENDMENT.proposedName,
      async fill(ctx) {
        const name = newName(ctx);
        await ctx.set("entityName", name);
        await ctx.actAndSettle(() => ctx.clickButton(/^check name$/i));
        const text = await bodyText(ctx);
        if (!/the entity name is available/i.test(text)) {
          throw new NameUnavailable(name, /not available|unavailable|unacceptable/i.test(text) ? "DOS reported the new name is not available" : "the availability message was not found after Check Name");
        }
        await ctx.note(`new name available: ${name}`);
      },
      async advance(ctx) { await ctx.clickButton(NEXT); },
    },
    {
      screen: NY_AMENDMENT.form,
      async fill(ctx) {
        const a = amendment(ctx);
        const carried = ctx.field("newName")?.value;
        if (carried !== undefined && carried.trim().toUpperCase() !== newName(ctx).toUpperCase()) {
          throw new Error(`NY DOS amendment carries the new name "${carried}", not the approved "${newName(ctx)}"`);
        }
        await tickPlainCopyIfAsked(ctx, a.plainCopy);
        await fillAttestation(ctx, a.signer);
        await fillFilerInformation(ctx);
      },
      async advance(ctx) { await ctx.clickButton(NEXT); },
    },
    previewStep(NY_AMENDMENT.preview, (ctx) => amendment(ctx).entity),
    drawdownPaymentStep(NY_AMENDMENT.payment),
  ],
};

// ---------------------------------------------------------------- I: Certificate of Change, by entity

const change = (ctx: StepContext) => details<CertificateOfChangeDetails>(ctx, "certificateOfChange");
/** The changes this filing asks for, as keys of NY_CHANGE_TYPES. */
function changesAsked(c: CertificateOfChangeDetails): (keyof typeof NY_CHANGE_TYPES)[] {
  const out: (keyof typeof NY_CHANGE_TYPES)[] = [];
  if (c.county) out.push("county");
  if (c.serviceOfProcess) out.push("serviceOfProcess");
  if (c.serviceOfProcessEmail) out.push("serviceOfProcessEmail");
  if (c.registeredAgentName) out.push("registeredAgentName");
  if (c.registeredAgentAddress) out.push("registeredAgentAddress");
  return out;
}

export const nyCertificateOfChangeAdapter: SiteAdapter = {
  ...adapterBase,
  key: "ny-certificate-of-change",
  steps: [
    openReplenish, replenish,
    homeStep(NY_SCREENS.home, /^certificate of change: by entity$/i, "Certificate of Change: By Entity"),
    entitySearchStep(NY_CHANGE.search, (ctx) => change(ctx).entity),
    {
      screen: NY_CHANGE.selection,
      async fill(ctx) {
        const asked = changesAsked(change(ctx));
        if (!asked.length) throw new Error("NY certificate of change: no change was asked for");
        for (const k of asked) {
          const f = ctx.field(k);
          if (!f) throw new Error(`NY DOS Change Selection: "${NY_CHANGE_TYPES[k]}" is not on the page`);
          if (f.disabled) throw new Error(`NY DOS Change Selection: "${NY_CHANGE_TYPES[k]}" is greyed out for this entity (it depends on whether an agent is on file)`);
          await ctx.set(k, true);
        }
        await ctx.note(`changes ticked: ${asked.map((k) => NY_CHANGE_TYPES[k]).join("; ")}`);
      },
      async advance(ctx) { await ctx.clickButton(NEXT); },
    },
    {
      screen: NY_CHANGE.form,
      async fill(ctx) {
        const c = change(ctx);
        await checkEntityShown(ctx, c.entity);
        const need = (keys: string[], what: string) => {
          for (const k of keys) if (!ctx.field(k)?.visible) throw new Error(`NY DOS Certificate of Change: the ${what} section's "${k}" field is not on the page`);
        };
        if (c.county) { need(["newCounty"], "county change"); await ctx.set("newCounty", c.county); }
        if (c.serviceOfProcess) {
          need(["sopName", "sopAddress1", "sopCity", "sopState", "sopZip"], "service of process name and address");
          const a = c.serviceOfProcess.address;
          await ctx.set("sopName", c.serviceOfProcess.name);
          await ctx.set("sopAddress1", a.street1);
          if (a.street2) await ctx.set("sopAddress2", a.street2);
          await ctx.set("sopCity", a.city);
          await ctx.set("sopState", a.state);
          await ctx.set("sopZip", a.zip);
        }
        if (c.serviceOfProcessEmail) {
          need(["sopEmail", "sopEmailConfirm"], "service of process email");
          await ctx.set("sopEmail", c.serviceOfProcessEmail);
          await ctx.set("sopEmailConfirm", c.serviceOfProcessEmail);
        }
        if (c.registeredAgentName) { need(["raName"], "registered agent name"); await ctx.set("raName", c.registeredAgentName); }
        if (c.registeredAgentAddress) {
          need(["raAddress1", "raCity", "raZip"], "registered agent address");
          const a = c.registeredAgentAddress;
          await ctx.set("raAddress1", a.street1);
          if (a.street2) await ctx.set("raAddress2", a.street2);
          await ctx.set("raCity", a.city);
          await ctx.set("raZip", a.zip);
        }
        await tickPlainCopyIfAsked(ctx, c.plainCopy);
        await fillAttestation(ctx, c.signer);
        await fillFilerInformation(ctx);
      },
      async advance(ctx) { await ctx.clickButton(NEXT); },
    },
    previewStep(NY_CHANGE.preview, (ctx) => change(ctx).entity),
    drawdownPaymentStep(NY_CHANGE.payment),
  ],
};

// ---------------------------------------------------------------- J and K: copies and certificates of status

/**
 * Both start with "DOS ID/Assumed Name ID OR Entity Name/Assumed Name Search" (fill one route): the
 * engine searches by DOS ID. When the search shows a results list instead of the next page, how an
 * entity is picked from it was not in the recording (only the red error when none is picked), so
 * the run stops there.
 */
async function checkNextPageAfterSearch(ctx: StepContext, screen: ScreenIntents, dosId: string, nextPage: RegExp) {
  const text = await bodyText(ctx);
  if (nextPage.test(text) && text.includes(dosId)) return;
  const stillSearching = (await ctx.resolve(screen)).field("dosId")?.visible;
  throw new Error(stillSearching
    ? `NY DOS: searching DOS ID ${dosId} did not open the next page; if DOS lists entities to pick from, that list is not mapped yet`
    : `NY DOS: the page after searching DOS ID ${dosId} is not the one expected`);
}

/** Cc (V28) and its confirmation on the requester block of J and K. */
async function fillRequesterCc(ctx: StepContext, set: StepContext["set"], field: StepContext["field"]) {
  if (!(field("distributionEmail")?.value ?? "").trim()) throw new Error("NY DOS requester: the distribution email is empty; it comes from the service-company profile");
  const cc = copyCc(ctx);
  if (!cc) return;
  await set("ccEmail", cc);
  if (field("confirmEmail")) await set("confirmEmail", cc);
}

type CopyRequest = NonNullable<StepContext["filing"]["request"]["copyRequest"]>;
const copyRequest = (ctx: StepContext) => details<CopyRequest>(ctx, "copyRequest");

/** Ticks the Select box of the one Entity Filing History row each requested document names. */
async function selectDocuments(ctx: StepContext) {
  const docs = copyRequest(ctx).documents;
  const rows = ctx.page.locator("table tr").filter({ has: ctx.page.locator("input[type=checkbox]") });
  const n = await rows.count();
  const texts: string[] = [];
  for (let i = 0; i < n; i++) texts.push((await rows.nth(i).innerText()).replace(/\s+/g, " "));
  const picked = new Set<number>();
  const escape = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  for (const d of docs) {
    const date = d.filingDate ? d.filingDate.replace(/^(\d{4})-(\d{2})-(\d{2})$/, "$2/$3/$1") : undefined;
    const hits = texts.map((t, i) => ({ t, i })).filter(({ t }) =>
      (d.filingNumber ? new RegExp(`(^|\\D)${escape(d.filingNumber.trim())}(\\D|$)`).test(t) : true)
      && (d.description ? t.toUpperCase().includes(d.description.trim().toUpperCase()) : true)
      && (date ? t.includes(date) || t.includes(d.filingDate!) : true));
    const what = d.filingNumber ? `filing number ${d.filingNumber}` : `"${d.description}"${d.filingDate ? ` of ${d.filingDate}` : ""}`;
    if (hits.length === 0) throw new Error(`NY DOS Entity Filing History: no document matches ${what}`);
    if (hits.length > 1) throw new Error(`NY DOS Entity Filing History: ${hits.length} documents match ${what}; give its filing number`);
    if (picked.has(hits[0]!.i)) throw new Error(`NY DOS Entity Filing History: ${what} is asked for twice`);
    picked.add(hits[0]!.i);
  }
  for (const i of picked) await rows.nth(i).locator("input[type=checkbox]").first().check();
  await ctx.note(`documents selected: ${picked.size}`);
  const text = await bodyText(ctx);
  const count = /number of documents selected:?\s*(\d+)/i.exec(text)?.[1];
  if (count !== undefined && Number(count) !== docs.length) throw new Error(`NY DOS shows ${count} documents selected, the request lists ${docs.length}`);
}

export const nyCopyRequestAdapter: SiteAdapter = {
  ...adapterBase,
  key: "ny-copy-request",
  steps: [
    openReplenish, replenish,
    homeStep(NY_SCREENS.home, /^copy of document$/i, "Copy of Document"),
    {
      screen: NY_COPY.search,
      async fill(ctx) { await ctx.set("dosId", copyRequest(ctx).entity.dosId); },
      async advance(ctx) { await ctx.clickButton(NEXT); },
      async verify(ctx) { await checkNextPageAfterSearch(ctx, NY_COPY.search, copyRequest(ctx).entity.dosId, /entity filing history/i); },
    },
    {
      screen: NY_COPY.history,
      async fill(ctx) {
        const r = copyRequest(ctx);
        if (r.entity.name) await checkEntityShown(ctx, { name: r.entity.name });
        await selectDocuments(ctx);
        const s = await ctx.resolve(NY_COPY.history);
        await fillRequesterCc(ctx, s.set, s.field);
      },
      async advance(ctx) { await ctx.clickButton(NEXT); },
    },
    {
      screen: NY_COPY.confirm,
      async fill(ctx) {
        if (!/review all information/i.test(await bodyText(ctx))) throw new Error("NY DOS: the copy request's confirmation page is not showing");
      },
      async advance(ctx) { await ctx.clickButton(NEXT); },
    },
    drawdownPaymentStep(NY_COPY.payment),
  ],
};

type Standing = NonNullable<StepContext["filing"]["request"]["standing"]>;
function standing(ctx: StepContext): Standing & { dosId: string } {
  const s = ctx.filing.request.standing;
  if (!s?.dosId) throw new Error("NY Certificate of Status: the DOS ID is missing");
  return s as Standing & { dosId: string };
}

export const nyStatusCertificateAdapter: SiteAdapter = {
  ...adapterBase,
  key: "ny-status-certificate",
  steps: [
    openReplenish, replenish,
    homeStep(NY_SCREENS.home, /^certificates of status$/i, "Certificates of Status"),
    {
      screen: NY_STATUS.request,
      async fill(ctx) {
        const s = standing(ctx);
        if (s.form === "long_officers") throw new Error("NY Certificate of Status: there is no officers form; choose Short Form or Long Form");
        await ctx.set("dosId", s.dosId);
        await ctx.set("certificateType", s.form === "short" ? "Short Form" : "Long Form");
        await fillRequesterCc(ctx, ctx.set, ctx.field);
      },
      async advance(ctx) { await ctx.clickButton(NEXT); },
      async verify(ctx) { await checkNextPageAfterSearch(ctx, NY_STATUS.request, standing(ctx).dosId, /review/i); },
    },
    {
      screen: NY_STATUS.review,
      async fill(ctx) {
        const s = standing(ctx);
        await checkEntityShown(ctx, { name: s.entityName });
        const text = await bodyText(ctx);
        const want = s.form === "short" ? /short form/i : /long form/i;
        if (!want.test(text)) throw new Error(`NY DOS: the review page does not show the ${s.form === "short" ? "Short" : "Long"} Form`);
      },
      async advance(ctx) { await ctx.clickButton(NEXT); },
    },
    drawdownPaymentStep(NY_STATUS.payment),
  ],
};

export const NY_RECORD_ADAPTERS = [nyDissolutionAdapter, nyNameChangeAdapter, nyCertificateOfChangeAdapter, nyCopyRequestAdapter, nyStatusCertificateAdapter];
