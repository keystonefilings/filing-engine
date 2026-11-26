import { z } from "zod";
import type { ScreenStep, SiteAdapter, StepContext } from "../types.js";
import { Address, type PayrollRegistrationDetails } from "../../domain/filing.js";
import { splitZip, stateName, toUsDate } from "../../domain/usStates.js";
import { portalFlag } from "../../domain/portal-intake.js";
import type { FieldDescriptor, ScreenIntents } from "../../resolver/types.js";
import { normalizeLabel } from "../../resolver/types.js";
import { labelScore } from "../../resolver/match.js";
import { missingAuthorizations, requireAuthorizations } from "../attestation.js";
import { escapeRe, pickSuggestion, splitPersonName, whenOptionListed, whenShown } from "../page-helpers.js";
import { NJ_OTHER_TAXES, NJ_PAYROLL_SCREENS as S, NJ_TAX_QUESTIONS, NJ_TITLES } from "./intents.js";

/**
 * NJ-REG, Online Business and Employer Registration (njportal.com/DOR/BusinessRegistration), rebuilt
 * from the walk of 2026-11-24 (docs/portal-maps/nj-reg.md). Screen order:
 *   0 Welcome (Get Started, "IMPORTANT NOTICE!" Continue) -> 1 Start Registration (Business Entity)
 *   -> 2a Business Identification (Entity ID, EIN) -> 3 Business Data -> 4 Business Address
 *   -> 5 Ownership Type -> 6 Owner Details -> 7 Business Classification -> 8 Employment Activities
 *   -> 9 Taxable Business Activities -> 10 Contact Information -> 11 Review (Complete Registration).
 *
 * complete:false, dry runs only. The walk went to the Review screen and stopped before
 * "Complete Registration": the confirmation page after it was never seen, so a live click could not
 * be confirmed (no confirmSubmission). A dry run fills every screen, unticks the Gov2Go sign-up the
 * site ticks by default (unless the client chose it), and stops on Review before Complete
 * Registration with nothing attested. Review is the review screen the client approves (decision 7).
 * On a live run the two Yes/No confirmations, the perjury declaration and the typed name of the
 * authorized representative are entered only inside the submit guard and only with the client's own
 * grants on file (intake authorizations njreg-employment, njreg-tax, njreg-perjury).
 *
 * Only walked branches run: registration option 1 (a formed business entity with its NJ Entity ID
 * and EIN), a year-round business, no predecessor, no S corporation or QSSS election, no tobacco
 * sales. Anything else stops before the first field with the reason. The business-owner dialog was
 * seen in the page structure but not opened on the walk. No login (a fresh browser each run), no fee.
 */

const CONTINUE = /^\s*continue\s*$/i;
const YesNo = z.boolean().optional();

/** The NJ-REG intake form's payroll.stateAnswers (web/lib/intake/forms.ts, kind "nj-reg"). */
const NjAnswers = z.object({
  yearRound: YesNo,
  season: z.string().optional(),
  municipality: z.string().optional(),
  mailingAttention: z.string().optional(),
  subsidiary: YesNo,
  sCorpStatus: z.enum(["s_corp", "qsss", "neither"]).optional(),
  sCorpApprovalDate: z.string().optional(),
  businessOwners: z.array(z.object({ name: z.string().min(1), ein: z.string().min(9), percentOwnership: z.number().min(0).max(100), address: Address })).optional(),
  typeOfActivity: z.string().optional(),
  sicCode: z.string().optional(),
  acquiredPredecessor: YesNo,
  predecessorDetails: z.string().optional(),
  njResidentsOutsideNj: YesNo,
  pensionPayer: YesNo,
  multipleFacilities: YesNo,
  firstNjHireDate: z.string().optional(),
  payrollOver1000Date: z.string().optional(),
  agricultural: YesNo,
  household: YesNo,
  household1000Date: z.string().optional(),
  futa: YesNo,
  futaYear: z.number().int().optional(),
  uiExempt: YesNo,
  uiExemptReason: z.string().optional(),
  peo: YesNo,
  /** Screen 9: the 17 Yes/No answers by key, plus firstSaleDate, multipleSalesLocations, tobaccoDetails, otherEligibility. */
  tax: z.record(z.string(), z.union([z.boolean(), z.string()])).optional(),
  /** Older API requests: the sales tax answer before the intake form kept Screen 9 under tax. */
  collectSalesTax: YesNo,
  contactTitle: z.string().optional(),
  eveningPhone: z.string().optional(),
  gov2goNotifications: YesNo,
}).passthrough();
type NjAnswers = z.infer<typeof NjAnswers>;

const AUTHS = ["njreg-employment", "njreg-tax", "njreg-perjury"] as const;
const REGISTRATION_TYPE = "Register a Business Entity (For-Profit Corporations, Non-Profit Corporations, Limited Partnerships, Limited Liability Companies and Limited Liability Partnerships)";
const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

interface Nj { p: PayrollRegistrationDetails; a: NjAnswers; contact: { firstName: string; lastName: string; phone: string; email: string } }

function nj(ctx: StepContext): Nj {
  const req = ctx.filing.request;
  const p = req.payroll;
  if (!p) throw new Error("payroll registration details missing");
  const parsed = NjAnswers.safeParse(p.stateAnswers ?? {});
  if (!parsed.success) {
    throw new Error(`NJ-REG: payroll.stateAnswers is not in the intake form's shape (${parsed.error.issues.map((i) => `${i.path.join(".")}: ${i.message}`).join("; ")})`);
  }
  return { p, a: parsed.data, contact: p.contact ?? req.contact };
}

const digits = (s: string) => s.replace(/\D/g, "");
const yn = (v: boolean | undefined) => (v ? "Yes" : "No");
/** Names compared the way a record and a form differ: case, punctuation, "L.L.C.". */
const sameName = (x: string, y: string) => normalizeLabel(x).replace(/\./g, "").replace(/\s+/g, " ") === normalizeLabel(y).replace(/\./g, "").replace(/\s+/g, " ");
function sameAddress(x: Address | undefined, y: Address | undefined): boolean {
  if (!x || !y) return false;
  return normalizeLabel(x.street1) === normalizeLabel(y.street1) && normalizeLabel(x.city) === normalizeLabel(y.city) && x.zip.slice(0, 5) === y.zip.slice(0, 5);
}

/** The Screen 5 option for the intake form's ownership type (older requests wrote "LLC (1065 Filer)"). */
function ownershipLabel(t: string): string {
  if (/^(ltd\.? liability co\.?|llc)\s*\(?\s*1065/i.test(t)) return "Ltd. Liability Co. (1065 Filer)";
  if (/^(ltd\.? liability co\.?|llc)\s*\(?\s*1120/i.test(t)) return "Ltd. Liability Co. (1120 Filer)";
  if (/^(ltd\.? liability co\.?|llc)\s*[-(]?\s*single member/i.test(t)) return "Ltd. Liability Co. - Single Member";
  return t;
}

const taxAnswer = (a: NjAnswers, key: string): boolean | undefined => {
  const v = a.tax?.[key];
  if (typeof v === "boolean") return v;
  return key === "salesTax" ? a.collectSalesTax : undefined;
};
const taxText = (a: NjAnswers, key: string): string | undefined => {
  const v = a.tax?.[key];
  return typeof v === "string" && v.trim() ? v.trim() : undefined;
};

/** Screen 9 "Eligibility for any other New Jersey State Tax": the boxes the client's answer names. */
function otherTaxes(a: NjAnswers): { picks: number[]; unknown: string[] } {
  const raw = taxText(a, "otherEligibility");
  if (!raw) return { picks: [], unknown: [] };
  const picks: number[] = [], unknown: string[] = [];
  for (const item of raw.split(/[,;\n]+/).map((s) => s.trim()).filter(Boolean)) {
    let best = -1, score = 0;
    NJ_OTHER_TAXES.forEach((label, i) => { const s = labelScore(item, label); if (s > score) { score = s; best = i; } });
    if (best >= 0 && score >= 0.6) picks.push(best); else unknown.push(item);
  }
  return { picks: [...new Set(picks)], unknown };
}

const mailingDifferent = (ctx: StepContext, n: Nj) =>
  portalFlag(ctx.filing.request, "njMailingDifferent") || (!!n.p.mailingAddress && !sameAddress(n.p.mailingAddress, n.p.businessAddress));

/** Everything this filing needs from the walked screens, checked before the first field is typed. */
function walkedPathProblems(ctx: StepContext): string[] {
  const n = nj(ctx);
  const { p, a } = n;
  const out: string[] = [];
  if (!p.entity?.njBusinessNumber) out.push("the NJ Business Entity ID is required (registration option 1; the partnership and proprietorship path was walked only to its first screen)");
  if (!p.fein) out.push("the EIN that goes with the Entity ID is required");
  if (a.yearRound === undefined) out.push("Screen 3: say whether the business is open all year");
  else if (!a.yearRound) out.push("Screen 3: a seasonal business (year round = No) was not walked");
  if (!p.county) out.push("Screen 4: the county is missing");
  if (!a.municipality && !p.countyMunicipalityCode) out.push("Screen 4: the municipality is missing");
  if (!a.mailingAttention) out.push("Screen 4: the mailing address's Attention To is missing");
  if (mailingDifferent(ctx, n) && !p.mailingAddress) out.push("Screen 4: the mailing address is missing");
  if (!p.ownershipType) out.push("Screen 5: the ownership type is missing");
  if (a.subsidiary === undefined) out.push("Screen 5: say whether the business is a subsidiary of another corporation");
  if (a.sCorpStatus === "s_corp" || a.sCorpStatus === "qsss") out.push("Screen 5: the S corporation / QSSS election block was not walked");
  const owners = p.owners.length + (a.businessOwners?.length ?? 0);
  if (!owners) out.push("Screen 6: at least one owner, partner or responsible officer is required");
  if (p.ownershipType && /single member/i.test(ownershipLabel(p.ownershipType)) && owners > 1) out.push("Screen 6: a single-member LLC lists exactly one owner");
  for (const o of p.owners) {
    if (!o.ssn) out.push(`Screen 6: owner ${o.name} has no SSN`);
    if (!NJ_TITLES.includes(o.title)) out.push(`Screen 6: owner ${o.name}'s title "${o.title}" is not one of the portal's titles`);
    if (o.percentOwnership === undefined) out.push(`Screen 6: owner ${o.name} has no percent of ownership`);
    if (!o.address) out.push(`Screen 6: owner ${o.name} has no address`);
  }
  for (const b of a.businessOwners ?? []) {
    if (p.fein && digits(b.ein) === digits(p.fein)) out.push(`Screen 6: business owner ${b.name}'s EIN cannot be the registering business's own`);
  }
  if (!p.njBusinessCode) out.push("Screen 7: the NJ business code is missing");
  if (!p.businessActivity) out.push("Screen 7: the principal product or service is missing");
  else if (p.businessActivity.length > 400) out.push("Screen 7: the principal product or service is over 400 characters");
  if (!a.typeOfActivity) out.push("Screen 7: the type of activity is missing");
  else if (a.typeOfActivity.length > 400) out.push("Screen 7: the type of activity is over 400 characters");
  if (!p.naics) out.push("Screen 7: the NAICS code is missing");
  if (p.coveredEmployees === undefined) out.push("Screen 7: the number of workers in NJ is missing");
  if (a.acquiredPredecessor === undefined) out.push("Screen 8: say whether the business acquired a previous employer");
  else if (a.acquiredPredecessor) out.push("Screen 8: an acquired predecessor (Yes) was not walked");
  for (const [k, what] of [["njResidentsOutsideNj", "wages to NJ residents working outside NJ"], ["pensionPayer", "pension or annuity payments"], ["multipleFacilities", "more than one NJ facility"]] as const) {
    if (a[k] === undefined) out.push(`Screen 8: the answer on ${what} is missing`);
  }
  if (p.payingWages === undefined) out.push("Screen 8: say whether the business pays wages in NJ within the next 6 months");
  if (p.payingWages) {
    if (!p.firstWageDate) out.push("Screen 8: the date of the first wage payment is missing");
    if (!a.payrollOver1000Date) out.push("Screen 8: the date cumulative payroll exceeds $1,000 is missing");
    for (const k of ["agricultural", "household", "futa", "uiExempt", "peo"] as const) if (a[k] === undefined) out.push(`Screen 8: the ${k} answer is missing`);
    if (a.household && !a.household1000Date) out.push("Screen 8: the date household wages reached $1,000 is missing");
    if (a.futa && !a.futaYear) out.push("Screen 8: the year first subject to FUTA is missing");
    if (a.uiExempt && !a.uiExemptReason) out.push("Screen 8: the reason for the exemption claim is missing");
  }
  for (const [k, q] of NJ_TAX_QUESTIONS) if (taxAnswer(a, k) === undefined) out.push(`Screen 9: no answer to "${q}"`);
  if (taxAnswer(a, "salesTax") && (!taxText(a, "firstSaleDate") || typeof a.tax?.multipleSalesLocations !== "boolean")) out.push("Screen 9: the first sale date and the more-than-one-location answer are missing");
  if (taxAnswer(a, "tobacco")) out.push("Screen 9: the cigarette and tobacco branch (Yes) was not walked");
  const other = otherTaxes(a);
  if (!taxText(a, "otherEligibility")) out.push('Screen 9: "Eligibility for any other New Jersey State Tax" is not answered');
  if (other.unknown.length) out.push(`Screen 9: not on the portal's list of other state taxes: ${other.unknown.join(", ")}`);
  if (!a.contactTitle || !NJ_TITLES.includes(a.contactTitle)) out.push("Screen 10: the contact's title is missing or not one of the portal's titles");
  if (!p.signer?.name) out.push("Screen 11: the authorized representative (payroll.signer) is missing");
  if (!ctx.dryRun) {
    const missing = missingAuthorizations(ctx.filing.request, AUTHS);
    if (missing.length) out.push(`Screen 11: the client's own attestations (${missing.join(", ")}) are not on file`);
  }
  return out;
}

/** The validation messages showing now (MVC field errors, summaries, alerts). */
async function njErrors(ctx: StepContext): Promise<string[]> {
  const loc = ctx.page.locator(".field-validation-error, .validation-summary-errors, .text-danger, [role=alert]");
  const out = new Set<string>();
  for (let i = 0; i < (await loc.count()); i++) {
    const el = loc.nth(i);
    if (!(await el.isVisible().catch(() => false))) continue;
    const t = (await el.innerText().catch(() => "")).replace(/\s+/g, " ").trim();
    if (t) out.add(t.slice(0, 200));
  }
  return [...out];
}

/** Continue, then check the wizard left the screen (its anchor field is gone); a refusal throws with the portal's messages. */
async function continueFrom(ctx: StepContext, screen: ScreenIntents, stillHere: string | (() => Promise<boolean>)): Promise<void> {
  await ctx.actAndSettle(() => ctx.clickButton(CONTINUE));
  const here = typeof stillHere === "string" ? !!(await ctx.resolve(screen)).field(stillHere)?.visible : await stillHere();
  if (!here) return;
  const errors = await njErrors(ctx);
  throw new Error(`NJ-REG ${screen.title}: the portal did not move on${errors.length ? `: ${errors.join("; ")}` : ""}`);
}

/** The State option for a code: NJ's lists show names ("New Jersey"); a code is tried too. */
function stateLabel(f: FieldDescriptor | undefined, code: string): string {
  const want = [stateName(code), code].map(normalizeLabel);
  return f?.options?.find((o) => want.includes(normalizeLabel(o.label)) || want.includes(normalizeLabel(o.value)))?.label ?? stateName(code);
}

/** Fills an address block on `screen` (keys street1, street2, city, state, zip, zipPlus). */
async function fillUsAddress(ctx: StepContext, screen: ScreenIntents, a: Address, clearStreet2 = false): Promise<void> {
  const r = await ctx.resolve(screen);
  const z = splitZip(a.zip);
  await r.set("street1", a.street1);
  if (a.street2 || clearStreet2) await r.set("street2", a.street2 ?? "");
  await r.set("city", a.city);
  await r.set("state", stateLabel(r.field("state"), a.state));
  if (r.field("zipPlus")?.visible) {
    await r.set("zip", z.zip5);
    if (z.plus4) await r.set("zipPlus", z.plus4);
  } else await r.set("zip", a.zip);
}

const welcome: ScreenStep = {
  screen: S.welcome,
  async present(ctx) {
    // Before the drift check and before the first field: only walked branches go on.
    const problems = walkedPathProblems(ctx);
    if (problems.length) throw new Error(`NJ-REG cannot fill this filing on the walked screens: ${problems.join("; ")}`);
    return true;
  },
  async fill() { /* what you will need, text only */ },
  async advance(ctx) {
    await ctx.clickButton(/^\s*get started\s*$/i);
    // "IMPORTANT NOTICE! Did you file your Business Formation Application Online?" Continue / Close.
    await ctx.page.getByText(/IMPORTANT NOTICE/i).filter({ visible: true }).first().waitFor({ state: "visible", timeout: 15_000 });
    await ctx.actAndSettle(() => ctx.clickButton(CONTINUE));
  },
};

const start: ScreenStep = {
  screen: S.start,
  async fill(ctx) { await ctx.set("registrationType", REGISTRATION_TYPE); },
  async advance(ctx) { await continueFrom(ctx, S.start, "registrationType"); },
};

const identification: ScreenStep = {
  screen: S.identification,
  async fill(ctx) {
    const { p } = nj(ctx);
    await ctx.set("entityId", p.entity!.njBusinessNumber!.trim());
    await ctx.set("ein", digits(p.fein!)); // nine digits, no dash
  },
  async advance(ctx) { await continueFrom(ctx, S.identification, "entityId"); },
};

const businessData: ScreenStep = {
  screen: S.businessData,
  async fill(ctx) {
    const { p } = nj(ctx);
    // The name and beginning date come from NJ's entity record: they must be the approved business.
    const shown = ctx.field("businessName")?.value?.trim();
    if (shown ? !sameName(shown, p.legalName) : !normalizeLabel(await ctx.page.locator("body").innerText()).includes(normalizeLabel(p.legalName))) {
      throw new Error(`NJ-REG Business Data: the Entity ID belongs to "${shown ?? "another business"}", not the approved "${p.legalName}"`);
    }
    const begin = ctx.field("beginDate")?.value?.trim();
    if (begin && p.beginDate && begin !== toUsDate(p.beginDate)) await ctx.note(`NJ's record gives the beginning date ${begin}; the filing said ${toUsDate(p.beginDate)} (the record's date is the one registered)`);
    await ctx.set("yearRound", "Yes");
    if (p.tradeName) {
      const opt = ctx.field("tradeName")?.options?.find((o) => sameName(o.label, p.tradeName!));
      if (!opt) throw new Error(`NJ-REG Business Data: the trade name "${p.tradeName}" is not on file with NJ for this business (the list shows only registered trade names)`);
      await ctx.set("tradeName", opt.label);
    }
  },
  async advance(ctx) { await continueFrom(ctx, S.businessData, "yearRound"); },
};

/** "Hudson" against "Hudson County", "HUDSON"; "Hoboken" against "Hoboken City" (codes ignored). */
function placeMatches(label: string, want: string): boolean {
  const clean = (s: string) => normalizeLabel(s).replace(/\b\d+\b/g, " ").replace(/\b(county|city|town|township|borough|village)\b/g, " ").replace(/\s+/g, " ").trim();
  return !!clean(want) && clean(label) === clean(want);
}

const businessAddress: ScreenStep = {
  screen: S.businessAddress,
  async fill(ctx) {
    const n = nj(ctx);
    const { p, a } = n;
    await fillUsAddress(ctx, S.businessAddress, p.businessAddress, true);
    // County is filtered by the address, Municipality by the county: wait for each list.
    const county = await whenOptionListed(ctx, S.businessAddress, "county", (o) => placeMatches(o.label, p.county!), "entering the address");
    await county.r.set("county", county.opt.label);
    const code = p.countyMunicipalityCode?.trim();
    const muni = await whenOptionListed(ctx, S.businessAddress, "municipality",
      (o) => (code ? o.value === code || new RegExp(`\\b${escapeRe(code)}\\b`).test(o.label) : placeMatches(o.label, a.municipality!)), `choosing ${county.opt.label}`);
    await muni.r.set("municipality", muni.opt.label);
    const r = await ctx.resolve(S.businessAddress);
    await r.set("attention", a.mailingAttention!);
    const different = mailingDifferent(ctx, n);
    await r.set("mailingDifferent", different);
    if (different) {
      await whenShown(ctx, S.mailingAddress, ["street1", "city", "zip"], "ticking Mailing Address is different");
      await fillUsAddress(ctx, S.mailingAddress, p.mailingAddress!);
    }
  },
  async advance(ctx) { await continueFrom(ctx, S.businessAddress, "attention"); },
};

const ownership: ScreenStep = {
  screen: S.ownership,
  async fill(ctx) {
    const { p, a } = nj(ctx);
    await ctx.set("ownershipType", ownershipLabel(p.ownershipType!));
    await ctx.page.waitForTimeout(300); // the S corp choices follow the ownership type
    let r = await ctx.resolve(S.ownership);
    if (p.entity?.fiscalMonth) await r.set("fiscalMonth", MONTHS[p.entity.fiscalMonth - 1]!);
    await r.set("subsidiary", yn(a.subsidiary));
    r = await ctx.resolve(S.ownership);
    const neither = r.field("sCorp")?.options?.find((o) => /^neither$/i.test(o.label.trim()));
    if (!neither?.ref) throw new Error("NJ-REG Ownership Type: no \"Neither\" choice for the S corporation question");
    const box = ctx.page.locator(`[data-ke-ref="${neither.ref}"]`);
    if (await box.isDisabled()) {
      if (!(await box.isChecked())) throw new Error("NJ-REG Ownership Type: \"Neither\" is disabled and not chosen");
    } else await box.check();
  },
  async advance(ctx) { await continueFrom(ctx, S.ownership, "ownershipType"); },
};

/** Waits for an owner dialog to close after Save; its messages if it stays open. */
async function savedDialog(ctx: StepContext, screen: ScreenIntents, anchor: string, who: string): Promise<void> {
  await ctx.actAndSettle(() => ctx.clickButton(/^\s*save\s*$/i));
  for (let waited = 0; (await ctx.resolve(screen)).field(anchor)?.visible; waited += 250) {
    const errors = await njErrors(ctx);
    if (errors.length || waited >= 10_000) throw new Error(`NJ-REG Owner Details: ${who} was not saved${errors.length ? `: ${errors.join("; ")}` : ""}`);
    await ctx.page.waitForTimeout(250);
  }
}

/** An owners-table row holding every part (a row's text runs its cells together: no word boundaries). */
const ownerRow = (ctx: StepContext, ...parts: string[]) =>
  parts.reduce((loc, t) => loc.filter({ hasText: new RegExp(escapeRe(t), "i") }), ctx.page.getByRole("row"));

const owners: ScreenStep = {
  screen: S.owners,
  sensitive: true, // the individual owner dialog takes the SSN
  async fill(ctx) {
    const { p, a } = nj(ctx);
    const max = /up to (\d+) maximum/i.exec(await ctx.page.locator("body").innerText())?.[1];
    const total = p.owners.length + (a.businessOwners?.length ?? 0);
    if (max && total > Number(max)) throw new Error(`NJ-REG Owner Details: this ownership type takes at most ${max} owners; the filing names ${total}`);
    for (const o of p.owners) {
      const who = `owner ${o.name}`;
      await ctx.actAndSettle(() => ctx.clickButton(/^\s*add individual owner\s*$/i));
      const r = await whenShown(ctx, S.individualOwner, ["firstName", "lastName", "ssn"], "Add Individual Owner");
      const name = splitPersonName(o.name, `NJ-REG ${who}`);
      await r.set("firstName", name.first);
      if (name.middleInitial) await r.set("middleInitial", name.middleInitial);
      await r.set("lastName", name.suffix ? `${name.last} ${name.suffix}` : name.last);
      await r.set("title", o.title);
      await r.set("ssn", digits(o.ssn!));
      await r.set("percent", String(o.percentOwnership));
      await fillUsAddress(ctx, S.individualOwner, o.address!);
      await savedDialog(ctx, S.individualOwner, "firstName", who);
      if (!(await ownerRow(ctx, name.first, name.last).count())) throw new Error(`NJ-REG Owner Details: ${who} is not in the owners table after Save`);
      await ctx.note(`${who} added`);
    }
    for (const b of a.businessOwners ?? []) {
      const who = `business owner ${b.name}`;
      await ctx.actAndSettle(() => ctx.clickButton(/^\s*add business owner\s*$/i));
      const r = await whenShown(ctx, S.businessOwner, ["businessName", "ein"], "Add Business Owner");
      await r.set("businessName", b.name);
      await r.set("ein", digits(b.ein));
      await r.set("percent", String(b.percentOwnership));
      await fillUsAddress(ctx, S.businessOwner, b.address);
      await savedDialog(ctx, S.businessOwner, "businessName", who);
      if (!(await ownerRow(ctx, b.name).count())) throw new Error(`NJ-REG Owner Details: ${who} is not in the owners table after Save`);
      await ctx.note(`${who} added`);
    }
  },
  async advance(ctx) {
    await continueFrom(ctx, S.owners, () => ctx.page.getByRole("button", { name: /^\s*add individual owner\s*$/i }).or(ctx.page.getByRole("link", { name: /^\s*add individual owner\s*$/i })).first().isVisible().catch(() => false));
  },
};

const classification: ScreenStep = {
  screen: S.classification,
  async fill(ctx) {
    const { p, a } = nj(ctx);
    const code = /^\s*(\d+)/.exec(p.njBusinessCode!)?.[1] ?? p.njBusinessCode!.trim();
    await ctx.note(`NJ business code: ${await pickSuggestion(ctx, ctx.field("businessCode"), code, "NJ-REG Business Classification (New Jersey Business Code)")}`);
    let r = await ctx.resolve(S.classification);
    await r.set("principalProduct", p.businessActivity!);
    await r.set("typeOfActivity", a.typeOfActivity!);
    if (a.sicCode) await r.set("sic", a.sicCode);
    await ctx.note(`NAICS: ${await pickSuggestion(ctx, r.field("naics"), p.naics!, "NJ-REG Business Classification (NAICS Code)")}`);
    r = await ctx.resolve(S.classification);
    await r.set("workers", String(p.coveredEmployees));
  },
  async advance(ctx) { await continueFrom(ctx, S.classification, "businessCode"); },
};

/** One radio answer, read fresh (answers can open more questions and move the page). */
async function radio(ctx: StepContext, screen: ScreenIntents, key: string, value: string) {
  const r = await ctx.resolve(screen);
  await r.set(key, value);
}

const employment: ScreenStep = {
  screen: S.employment,
  async fill(ctx) {
    const { p, a } = nj(ctx);
    const E = S.employment;
    await radio(ctx, E, "acquiredPredecessor", "No");
    await radio(ctx, E, "residentsOutsideNj", yn(a.njResidentsOutsideNj));
    await radio(ctx, E, "pensionPayer", yn(a.pensionPayer));
    await radio(ctx, E, "multipleFacilities", yn(a.multipleFacilities));
    await radio(ctx, E, "payingWages", yn(p.payingWages));
    if (!p.payingWages) return;
    const r = await whenShown(ctx, E, ["firstWageDate", "over1000Date", "agricultural", "household", "futa", "uiExempt", "peo"], "answering Yes to paying wages in the next 6 months");
    await r.set("firstWageDate", toUsDate(p.firstWageDate!));
    if (a.firstNjHireDate) await r.set("firstHireDate", toUsDate(a.firstNjHireDate));
    await r.set("over1000Date", toUsDate(a.payrollOver1000Date!));
    await radio(ctx, E, "agricultural", yn(a.agricultural));
    await radio(ctx, E, "household", yn(a.household));
    if (a.household) await (await whenShown(ctx, E, ["household1000Date"], "answering Yes to household employment")).set("household1000Date", toUsDate(a.household1000Date!));
    await radio(ctx, E, "futa", yn(a.futa));
    if (a.futa) await (await whenShown(ctx, E, ["futaYear"], "answering Yes to FUTA")).set("futaYear", String(a.futaYear));
    await radio(ctx, E, "uiExempt", yn(a.uiExempt));
    if (a.uiExempt) await (await whenShown(ctx, E, ["uiExemptReason"], "answering Yes to the exemption claim")).set("uiExemptReason", a.uiExemptReason!);
    await radio(ctx, E, "peo", yn(a.peo));
  },
  async advance(ctx) { await continueFrom(ctx, S.employment, "payingWages"); },
};

const taxableActivities: ScreenStep = {
  screen: S.taxableActivities,
  async fill(ctx) {
    const { a } = nj(ctx);
    const T = S.taxableActivities;
    for (const [key] of NJ_TAX_QUESTIONS) {
      await radio(ctx, T, key, yn(taxAnswer(a, key)));
      if (key === "salesTax" && taxAnswer(a, key)) {
        const r = await whenShown(ctx, T, ["firstSaleDate", "multipleSalesLocations"], "answering Yes to sales tax");
        await r.set("firstSaleDate", toUsDate(taxText(a, "firstSaleDate")!));
        await radio(ctx, T, "multipleSalesLocations", yn(a.tax?.multipleSalesLocations === true));
      }
    }
    const r = await ctx.resolve(T);
    for (const i of otherTaxes(a).picks) await r.set(`otherTax${i}`, true);
  },
  async advance(ctx) { await continueFrom(ctx, S.taxableActivities, "salesTax"); },
};

const contact: ScreenStep = {
  screen: S.contact,
  async fill(ctx) {
    const { a, contact: c } = nj(ctx);
    await ctx.set("name", `${c.firstName} ${c.lastName}`);
    await ctx.set("title", a.contactTitle!);
    await ctx.set("email", c.email);
    await ctx.set("confirmEmail", c.email);
    await ctx.set("dayPhone", c.phone);
    if (a.eveningPhone) await ctx.set("eveningPhone", a.eveningPhone);
  },
  async advance(ctx) { await continueFrom(ctx, S.contact, "name"); },
};

const review: ScreenStep = {
  screen: S.review,
  reviewScreen: true, // the client approves this page (decision 7); the beta review gate stops here
  submitScreen: true,
  sensitive: true, // the owners block shows SSNs (masked by the portal)
  async fill(ctx) {
    const { p, a } = nj(ctx);
    const text = normalizeLabel(await ctx.page.locator("body").innerText());
    if (!text.includes(normalizeLabel(p.legalName))) throw new Error(`NJ-REG Review: the review does not show "${p.legalName}"`);
    if (!text.includes(normalizeLabel(p.entity!.njBusinessNumber!))) throw new Error("NJ-REG Review: the review does not show the Entity ID");
    // Gov2Go text/email reminders: the site ticks the sign-up by default; it stays only if the client chose it.
    await ctx.set("gov2go", a.gov2goNotifications === true);
  },
  async advance(ctx) {
    const { p } = nj(ctx);
    // Live only, and only with the client's own grants (checked here, before the guard opens).
    if (!ctx.dryRun) requireAuthorizations(ctx.filing.request, AUTHS, "NJ-REG Review");
    for (const k of ["employmentAttest", "taxAttest", "perjury", "signatureName"]) {
      if (!ctx.field(k)) throw new Error(`NJ-REG Review: "${S.review.intents.find((i) => i.key === k)!.labels[0]}" is not on the page`);
    }
    await ctx.submit("Complete Registration", async () => {
      await ctx.set("employmentAttest", true);
      await ctx.set("taxAttest", true);
      await ctx.set("perjury", true);
      await ctx.set("signatureName", p.signer!.name);
      await ctx.clickButton(/^\s*complete registration\s*$/i);
    });
  },
};

export const njPayrollAdapter: SiteAdapter = {
  site: "NJ",
  key: "nj-payroll",
  complete: false,
  entryUrl: () => process.env.NJ_PAYROLL_URL ?? "https://www.njportal.com/DOR/BusinessRegistration/",
  profileKey: () => null, // NJ-REG needs no login: a fresh browser each run
  credentialKey: () => null,
  steps: [welcome, start, identification, businessData, businessAddress, ownership, owners, classification, employment, taxableActivities, contact, review],
};
