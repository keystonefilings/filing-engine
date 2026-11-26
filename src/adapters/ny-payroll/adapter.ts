import { z } from "zod";
import type { ScreenStep, SiteAdapter, StepContext } from "../types.js";
import { Address, type PayrollRegistrationDetails } from "../../domain/filing.js";
import { toUsDate } from "../../domain/usStates.js";
import { portalFlag, portalText } from "../../domain/portal-intake.js";
import { normalizeLabel } from "../../resolver/types.js";
import { tenantVaultKey } from "../../settings/accounts.js";
import { missingAuthorizations, requireAuthorizations } from "../attestation.js";
import { NY_PAYROLL_SCREENS as S, addressScreen } from "./intents.js";
import { pickSuggestion } from "../page-helpers.js";
import {
  NEXT, answer, escapeRe, feinMask, fillAddress, fillDateOfBirth, fillSsn, moveOn, onScreen,
  pageErrors, phoneMask, settle, splitPersonName, validateAddress, whenShown,
} from "./opa.js";

/**
 * NYS-100 employer registration (unemployment insurance, withholding and wage reporting) on NY
 * Business Express, rebuilt from the signed-in walk of 2026-11-24
 * (docs/portal-maps/ny-nys100-unemployment.md). Screen order:
 *   P0 Select the business -> Business Profile: P1 Introduction, P2 Entity Type, P3 Business
 *   Identification, P4 Business Addresses, P5 Business Physical Address, P6 Additional Physical
 *   Location(s), P7 Mailing Address(es), P8 Contact Information, P9 Industry Classification,
 *   P10 Owner/Business Principal, P11 Member Information -> Application: A1 Unemployment Insurance
 *   Registration, A2 Business Identification, A3 Business Liability, A4 Business Transfers, A5 Change
 *   of Legal Entity, A6 Member Information, A7 Address and Contact Information, A8 Location of Books
 *   and Records, A9 Notice of Potential Charges, A10 Agent - C/O, A11 Physical Locations, A12 Physical
 *   Locations Details, A13 Submitter Information -> Ready to Submit.
 *
 * complete:false, dry runs only. The walk stopped at A13 Submitter Information, which carries the
 * submitter's "I attest to the above" certification; Ready to Submit (expected to hold the final
 * Submit button) and everything after it were never seen. A dry run fills every screen up to A13 and
 * stops there before the attestation, which it never ticks. A live run (not allowed until the walk
 * is finished) ticks it only with the submitter's own attestation on file (intake authorization
 * "nys100-attest"), then stops at Ready to Submit because that screen is not mapped. With no review
 * screen reachable, the client approves the data (no reviewScreen), and there is no confirmSubmission.
 *
 * Only the walked branches run: an LLC with person members, one physical location that is also the
 * mailing address, one primary NAICS code. Anything else stops before a single field is typed, with
 * the reason (corporation, partnership and sole-proprietor owner screens, business members, P6 extra
 * locations, P7 extra mailing addresses and the P9 secondary NAICS were not walked).
 *
 * Each subscriber's own NY.gov business login is used (tenant.nyPayrollCredentialKey, else its NY DOS
 * login tenant.nyGovCredentialKey), scoped to the tenant like every login: one subscriber's sign-in
 * never runs another's filing. Sign-in is a browser session saved by hand (V29); a signed-out profile
 * stops at the login wall. There is no fee.
 */

const YesNo = z.boolean().optional();
/** The NYS-100 intake form's payroll.stateAnswers (web/lib/intake/forms.ts, kind "ny-nys100"). */
const NysAnswers = z.object({
  businessPhone: z.string().optional(),
  businessEmail: z.string().optional(),
  website: z.string().optional(),
  secondaryNaics: z.string().optional(),
  owners: z.array(z.object({ principalType: z.enum(["person", "business"]).optional() }).passthrough()).optional(),
  employerRegistrationNumber: z.string().optional(),
  withholdsNyTax: YesNo,
  nonEmployeeWorkers: YesNo,
  nonEmployeeServices: z.string().optional(),
  acquiredBusiness: YesNo,
  acquiredAllOrPart: z.enum(["All", "Part"]).optional(),
  acquiredDate: z.string().optional(),
  acquiredLegalName: z.string().optional(),
  acquiredAddress: Address.optional(),
  acquiredCounty: z.string().optional(),
  acquiredRegistrationNumber: z.string().optional(),
  acquiredFein: z.string().optional(),
  legalEntityChanged: YesNo,
  legalEntityChangeDate: z.string().optional(),
  previousRegistrationNumber: z.string().optional(),
  previousFein: z.string().optional(),
  booksPhone: z.string().optional(),
  chargesAddress: Address.optional(),
  chargesPhone: z.string().optional(),
  mailToAgent: YesNo,
  agentAttn: z.string().optional(),
  agentAddress: Address.optional(),
  submitterPhone: z.string().optional(),
  submitterComments: z.string().optional(),
}).passthrough();
type NysAnswers = z.infer<typeof NysAnswers>;

/** P2 choices for the intake form's entity type values (the portal's labels; LLC is the walked path). */
const ENTITY_TYPES: Record<string, { type: string; sub?: { key: "llcSubType" | "corpSubType" | "partnershipSubType"; value: string } }> = {
  llc_member_managed: { type: "Limited Liability Company", sub: { key: "llcSubType", value: "Member Managed LLC" } },
  llc_manager_managed: { type: "Limited Liability Company", sub: { key: "llcSubType", value: "Manager Managed LLC" } },
  corporation_s: { type: "Corporation", sub: { key: "corpSubType", value: "S Corp" } },
  corporation_c: { type: "Corporation", sub: { key: "corpSubType", value: "C Corp" } },
  llp: { type: "Limited Liability Partnership" },
  lp: { type: "Limited Partnership" },
  partnership: { type: "Partnership", sub: { key: "partnershipSubType", value: "Partnerships" } },
  sole_proprietor: { type: "Individual (Sole Proprietor)" },
};

const QUARTERS = { Q1: "January - March", Q2: "April - June", Q3: "July - September", Q4: "October - December" } as const;
const MEMBER_TITLES = ["Member", "Managing Member"];
const AUTH_ATTEST = "nys100-attest";

interface Nys {
  p: PayrollRegistrationDetails;
  a: NysAnswers;
  contact: { firstName: string; lastName: string; phone: string; email: string };
}

function nys(ctx: StepContext): Nys {
  const req = ctx.filing.request;
  const p = req.payroll;
  if (!p) throw new Error("payroll registration details missing");
  const parsed = NysAnswers.safeParse(p.stateAnswers ?? {});
  if (!parsed.success) {
    throw new Error(`NYS-100: payroll.stateAnswers is not in the intake form's shape (${parsed.error.issues.map((i) => `${i.path.join(".")}: ${i.message}`).join("; ")})`);
  }
  return { p, a: parsed.data, contact: p.contact ?? req.contact };
}

const norm = (s: string) => normalizeLabel(s);
function sameAddress(x: Address | undefined, y: Address | undefined): boolean {
  if (!x || !y) return false;
  return norm(x.street1) === norm(y.street1) && norm(x.city) === norm(y.city) && x.zip.slice(0, 5) === y.zip.slice(0, 5);
}

const businessPhone = (n: Nys) => n.a.businessPhone ?? n.contact.phone;
const businessEmail = (n: Nys) => n.a.businessEmail ?? n.contact.email;
const withholds = (n: Nys) => n.a.withholdsNyTax ?? (n.p.dateFirstWithholding ? true : undefined);
const mailingIsPhysical = (ctx: StepContext, n: Nys) =>
  portalFlag(ctx.filing.request, "nysMailingSame") || !n.p.mailingAddress || sameAddress(n.p.mailingAddress, n.p.businessAddress);
const booksAtBusiness = (ctx: StepContext, n: Nys) =>
  portalFlag(ctx.filing.request, "booksSameAsBusiness") || !n.p.booksRecordsAddress || sameAddress(n.p.booksRecordsAddress, n.p.businessAddress);
const chargesAtBusiness = (ctx: StepContext, n: Nys) =>
  portalFlag(ctx.filing.request, "chargesSameAsBusiness") || !n.a.chargesAddress || sameAddress(n.a.chargesAddress, n.p.businessAddress);
const extraLocations = (n: Nys) => n.p.workLocations.filter((l) => !sameAddress(l.address, n.p.businessAddress));

/** The primary location's A12 answers: its workLocations row, else the filing's totals. */
function primaryLocation(n: Nys) {
  const row = n.p.workLocations.find((l) => sameAddress(l.address, n.p.businessAddress));
  return { employees: row?.employees ?? n.p.coveredEmployees, activity: row?.activity ?? n.p.businessActivity, details: row?.activityDetails ?? {} };
}

/**
 * Everything this filing needs from the walked screens, checked before a single field is typed (the
 * profile is saved screen by screen, so a run that stopped halfway would leave a partial profile).
 */
function walkedPathProblems(ctx: StepContext): string[] {
  const n = nys(ctx);
  const { p, a } = n;
  const out: string[] = [];
  const e = p.ownershipType ? ENTITY_TYPES[p.ownershipType] : undefined;
  if (!e) out.push(`entity type "${p.ownershipType ?? "(none)"}" is not one of ${Object.keys(ENTITY_TYPES).join(", ")}`);
  else if (e.type !== "Limited Liability Company") out.push(`only the LLC member path was walked; the ${e.type} owner screens are not mapped`);
  if (p.employerType !== "business") out.push("only the business employer registration was walked");
  if (p.withholdingOnly || p.registeringForUI === false) out.push("NYS-100 online registers for unemployment insurance together with withholding; a withholding-only registration is not this application");
  if (!p.fein) out.push("the FEIN is required to file NYS-100 online (an EIN applied for is not enough)");
  else { try { feinMask(p.fein, "Business Identification"); } catch (err) { out.push((err as Error).message); } }
  if (/\bp\.?\s*o\.?\s*box\b/i.test(p.businessAddress.street1)) out.push("the business physical address cannot be a PO box");
  if (p.businessAddress.state === "NY" && !p.county) out.push("the county of the business physical address is missing");
  if (!mailingIsPhysical(ctx, n)) out.push("a mailing address apart from the physical address (P7 Add Another Address) was not walked");
  if (extraLocations(n).length) out.push("additional physical locations (P6 Add Another Location, one A12 screen each) were not walked");
  if (!p.naics) out.push("the primary NAICS code is missing");
  if (a.secondaryNaics) out.push("a secondary NAICS code (P9 Yes) was not walked");
  if (!businessPhone(n)) out.push("the business telephone number is missing");
  if (!p.owners.length) out.push("at least one member is required");
  p.owners.forEach((o, i) => {
    const who = `member ${o.name}`;
    if ((a.owners?.[i]?.principalType ?? "person") !== "person") out.push(`${who}: a business member (Type of Principal = Business) was not walked`);
    if (!MEMBER_TITLES.includes(o.title)) out.push(`${who}: the title must be Member or Managing Member`);
    if (!o.dateOfBirth) out.push(`${who}: the date of birth is missing`);
    if (!o.phone) out.push(`${who}: the telephone number is missing`);
    if (o.percentOwnership === undefined) out.push(`${who}: the ownership percentage is missing`);
    if (o.usResident === undefined) out.push(`${who}: say whether they are a US resident`);
    if (o.usResident === true) {
      if (!o.ssn) out.push(`${who}: the SSN is required for a US resident`);
      if (!o.address) out.push(`${who}: the residential address is missing`);
      else if (o.address.state === "NY" && !o.county) out.push(`${who}: the county of the New York residential address is missing`);
    }
    if (o.usResident === false && !o.foreignAddress) out.push(`${who}: a member who is not a US resident needs a residential address outside the US (the portal refuses a US address)`);
    if (o.usResident === false && o.foreignAddress && /^(us|usa|united states( of america)?)$/i.test(o.foreignAddress.country.trim())) out.push(`${who}: the portal refuses a US address for a member who is not a US resident`);
  });
  if (p.payingWages === undefined) out.push("A3: say whether the business paid (or expects to pay) $300 or more in a calendar quarter");
  if (p.payingWages && (!p.uiLiabilityQuarter || !p.uiLiabilityYear)) out.push("A3: the first quarter and year with $300 or more in wages are missing");
  if (!p.dateFirstOperations) out.push("A3: the date the business began in New York is missing");
  if (p.coveredEmployees === undefined) out.push("A3: the total number of employees is missing");
  if (withholds(n) === undefined) out.push("A3: say whether the business withholds New York income tax");
  if (withholds(n) && !p.dateFirstWithholding) out.push("A3: the date of the first payroll with withholding is missing");
  if (a.nonEmployeeWorkers === undefined) out.push("A3: say whether people work for the business whom it does not consider employees");
  if (a.nonEmployeeWorkers && !a.nonEmployeeServices) out.push("A3: describe the services the non-employees perform");
  if (a.acquiredBusiness === undefined) out.push("A4: say whether the business acquired a liable employer's business");
  if (a.acquiredBusiness && (!a.acquiredAllOrPart || !a.acquiredDate || !a.acquiredLegalName || !a.acquiredAddress)) out.push("A4: the acquired employer's details (all or part, date, legal name, address) are missing");
  if (a.acquiredBusiness && a.acquiredAddress?.state === "NY" && !a.acquiredCounty) out.push("A4: the county of the acquired employer's New York address is missing");
  if (a.legalEntityChanged === undefined) out.push("A5: say whether the legal entity changed");
  if (a.legalEntityChanged && (!a.legalEntityChangeDate || !a.previousRegistrationNumber || !a.previousFein)) out.push("A5: the change date and the previous registration number and FEIN are missing");
  if (a.mailToAgent === undefined) out.push("A10: say whether all unemployment insurance mail goes to an agent (C/O)");
  if (a.mailToAgent && (!a.agentAttn || !a.agentAddress)) out.push("A10: the agent's ATTN (C/O) and address are missing");
  const loc = primaryLocation(n);
  if (loc.employees === undefined) out.push("A12: the number of employees at the business address is missing");
  if (!loc.activity) out.push("A12: the principal activity at the business address is missing");
  if (!p.signer?.name || !p.signer.title) out.push("A13: the submitter's name and official position (payroll.signer) are missing");
  if (!ctx.dryRun && missingAuthorizations(ctx.filing.request, [AUTH_ATTEST]).length) out.push(`A13: the submitter's own attestation (${AUTH_ATTEST}) is not on file`);
  return out;
}

// ---- P0: Select the business you are applying for ----

const selectBusiness: ScreenStep = {
  screen: S.selectBusiness,
  async present(ctx) {
    // Before the drift check and before anything is typed: the login wall, then the walked path.
    const text = await ctx.page.locator("body").innerText().catch(() => "");
    if (/\/loginregister|login\.ny\.gov/i.test(ctx.page.url()) || (/\bLogin Here\b/i.test(text) && /\bRegister Here\b/i.test(text))) {
      throw new Error(`NYS-100: the NY.gov business login is not signed in for this subscriber (browser profile nygov:${ctx.tenant.tenantId}); sign in once in that profile, then run again`);
    }
    const problems = walkedPathProblems(ctx);
    if (problems.length) throw new Error(`NYS-100 cannot fill this filing on the walked screens: ${problems.join("; ")}`);
    return true;
  },
  async fill(ctx) {
    const { p } = nys(ctx);
    const list = ctx.field("business");
    if (!list) throw new Error("NYS-100: the list of the account's businesses is not on the page");
    const options = list.options ?? [];
    const name = norm(p.legalName);
    const last4 = p.fein!.replace(/\D/g, "").slice(-4);
    // The account keeps one Business Profile per business (a dry run saves one too): reuse it, never make a second.
    const mine = options.find((o) => {
      if (/not listed/i.test(o.label)) return false;
      const l = norm(o.label);
      if (!(l === name || l.startsWith(`${name} `))) return false;
      const shown = /(\d{2}|[x*]{2})-?(\d{7}|[x*]{3}\d{4})/i.exec(o.label)?.[0];
      return !shown || shown.replace(/\D/g, "").endsWith(last4);
    });
    const notListed = options.find((o) => /my business is not listed/i.test(o.label));
    if (!mine && !notListed) throw new Error('NYS-100: neither this business nor "My business is not listed" is offered');
    await ctx.set("business", (mine ?? notListed)!.label);
    await ctx.note(mine ? `reusing the Business Profile "${mine.label}"` : "no Business Profile for this business yet: a new one is created");
  },
  async advance(ctx) { await moveOn(ctx, S.selectBusiness, /^\s*start application\s*$/i); },
};

// ---- Business Profile: P1 to P11 ----

const introduction: ScreenStep = {
  screen: S.introduction,
  async fill() { /* text only */ },
  async advance(ctx) { await moveOn(ctx, S.introduction, /^\s*get started\s*$/i); },
};

const entityType: ScreenStep = {
  screen: S.entityType,
  async fill(ctx) {
    const { p } = nys(ctx);
    const e = ENTITY_TYPES[p.ownershipType!]!;
    const f = ctx.field("entityType");
    if (f?.disabled) {
      const current = f.options?.find((o) => o.value === f.value)?.label ?? "";
      if (norm(current) !== norm(e.type)) throw new Error(`NYS-100 Entity Type: the Business Profile is a ${current}, this filing is a ${e.type} (a different type needs a new application)`);
    } else {
      await ctx.set("entityType", e.type);
      await settle(ctx);
    }
    if (e.sub) {
      const r = await whenShown(ctx, S.entityType, [e.sub.key], `choosing ${e.type}`);
      if (!r.field(e.sub.key)?.disabled) await r.set(e.sub.key, e.sub.value);
    }
    if (/Before you continue, please confirm the Business entity type/i.test(await ctx.page.locator("body").innerText())) {
      await ctx.note(`entity type ${e.type}${e.sub ? ` (${e.sub.value})` : ""} confirmed as approved; it cannot be changed later without a new application`);
    }
  },
  async advance(ctx) { await moveOn(ctx, S.entityType, /^\s*continue\s*$/i); },
};

const businessIdentification: ScreenStep = {
  screen: S.businessIdentification,
  async fill(ctx) {
    const { p } = nys(ctx);
    if (!ctx.field("legalName")?.disabled) await ctx.set("legalName", p.legalName);
    if (p.tradeName) await ctx.set("dba", p.tradeName);
    await ctx.set("fein", feinMask(p.fein!, "Business Identification"));
  },
  async advance(ctx) { await moveOn(ctx, S.businessIdentification); },
};

const addressesIntro: ScreenStep = {
  screen: S.addressesIntro,
  async fill() { /* the three address types, text only */ },
  async advance(ctx) { await moveOn(ctx, S.addressesIntro, NEXT); },
};

const physicalAddress: ScreenStep = {
  screen: S.physicalAddress,
  async fill(ctx) {
    const { p } = nys(ctx);
    await fillAddress(ctx, S.physicalAddress, "Business Physical Address", { us: p.businessAddress, county: p.county }, portalText(ctx.filing.request, "nysAttn"));
    // Only this path was walked: the physical address is also the mailing address.
    const r = await ctx.resolve(S.physicalAddress);
    await r.set("alsoMailing", true);
  },
  async advance(ctx) { await moveOn(ctx, S.physicalAddress); },
};

const SAVE_OR_NEXT = /^\s*(save\s*(&|and)\s*continue|next)\s*$/i;

const additionalLocations: ScreenStep = {
  screen: S.additionalLocations,
  async fill() { /* none: extra locations were not walked and are refused up front */ },
  async advance(ctx) { await moveOn(ctx, S.additionalLocations, SAVE_OR_NEXT); },
};

const mailingAddresses: ScreenStep = {
  screen: S.mailingAddresses,
  async fill() { /* none: the physical address was ticked as the mailing address */ },
  async advance(ctx) { await moveOn(ctx, S.mailingAddresses, SAVE_OR_NEXT); },
};

const contact: ScreenStep = {
  screen: S.contact,
  async fill(ctx) {
    const n = nys(ctx);
    await ctx.set("phone", phoneMask(businessPhone(n), "Contact Information"));
    await ctx.set("email", businessEmail(n));
    if (n.a.website) await ctx.set("website", n.a.website);
  },
  async advance(ctx) { await moveOn(ctx, S.contact); },
};

const industry: ScreenStep = {
  screen: S.industry,
  async fill(ctx) {
    const { p } = nys(ctx);
    const picked = await pickSuggestion(ctx, ctx.field("naicsSearch"), p.naics!, "NYS-100 Industry Classification (Primary NAICS)", () => settle(ctx));
    await ctx.note(`primary NAICS: ${picked}`);
    await answer(ctx, S.industry.title, "Do you have a secondary NAICS Code?", "No");
  },
  async advance(ctx) { await moveOn(ctx, S.industry, SAVE_OR_NEXT); },
};

const ownerIntro: ScreenStep = {
  screen: S.ownerIntro,
  async fill() { /* what the next screens collect, text only */ },
  async advance(ctx) { await moveOn(ctx, S.ownerIntro, NEXT); },
};

/** A member grid row, told apart by the member's first and last name (a row's text runs its cells together: no word boundaries). */
function memberRow(ctx: StepContext, fullName: string) {
  const n = splitPersonName(fullName, "Member Information");
  return ctx.page.getByRole("row")
    .filter({ hasText: new RegExp(escapeRe(n.first), "i") })
    .filter({ hasText: new RegExp(escapeRe(n.last), "i") });
}

const members: ScreenStep = {
  screen: S.members,
  sensitive: true, // the member record takes the SSN; the grid shows it masked
  async fill(ctx) {
    const { p } = nys(ctx);
    for (const o of p.owners) {
      const where = `member ${o.name}`;
      const row = memberRow(ctx, o.name);
      const editing = (await row.count()) > 0;
      if (editing) await row.first().getByRole("link", { name: /^\s*edit\s*$/i }).or(row.first().getByRole("button", { name: /^\s*edit\s*$/i })).first().click();
      else await ctx.clickButton(/^\s*add a member\s*$/i);
      await settle(ctx);
      const r0 = await whenShown(ctx, S.memberRecord, ["firstName", "lastName", "title"], editing ? "Edit" : "Add A Member");
      if (!editing) await r0.set("principalType", "Person");
      await r0.set("title", o.title);
      const name = splitPersonName(o.name, where);
      await r0.set("firstName", name.first);
      await r0.set("middleInitial", name.middleInitial ?? "");
      await r0.set("lastName", name.last);
      if (name.suffix) await r0.set("suffix", name.suffix);
      await fillDateOfBirth(ctx, r0.fields, o.dateOfBirth!, where);
      await answer(ctx, "Member Information", "Is this individual a resident of the United States?", o.usResident ? "Yes" : "No");
      if (o.usResident) {
        const r = await whenShown(ctx, S.memberRecord, ["ssn"], "answering Yes to US resident");
        await fillSsn(ctx, r.fields, r.field("ssn"), o.ssn!, where);
      }
      const r1 = await ctx.resolve(S.memberRecord);
      await r1.set("phone", phoneMask(o.phone!, where));
      if (o.email) await r1.set("email", o.email);
      await r1.set("ownership", String(o.percentOwnership));
      if (o.profitDistributionPercent !== undefined && o.profitDistributionPercent !== o.percentOwnership) await r1.set("profitShare", String(o.profitDistributionPercent));
      await fillAddress(ctx, S.memberRecord, where, o.usResident ? { us: o.address!, county: o.county } : { foreign: o.foreignAddress! });
      await ctx.actAndSettle(() => ctx.clickButton(editing ? /^\s*update\s*$/i : /^\s*save and close\s*$/i));
      // The record window closes and the grid lists the member; a refusal keeps it open with the reason.
      for (let waited = 0; (await ctx.resolve(S.memberRecord)).field("firstName")?.visible; waited += 250) {
        await settle(ctx);
        const errors = await pageErrors(ctx);
        if (errors.length) throw new Error(`NYS-100 ${where}: the member record was refused: ${errors.join("; ")}`);
        if (waited >= 15_000) throw new Error(`NYS-100 ${where}: the member record did not close after saving`);
        await ctx.page.waitForTimeout(250);
      }
      if (!(await memberRow(ctx, o.name).count())) throw new Error(`NYS-100 ${where}: not listed in the member grid after saving`);
      await ctx.note(`${where} ${editing ? "updated" : "added"}`);
    }
    // A reused profile must not carry members this filing does not name.
    const rows = ctx.page.getByRole("row").filter({ has: ctx.page.getByRole("link", { name: /^\s*edit\s*$/i }).or(ctx.page.getByRole("button", { name: /^\s*edit\s*$/i })) });
    if ((await rows.count()) > p.owners.length) {
      throw new Error(`NYS-100 Member Information: the Business Profile lists ${await rows.count()} members, this filing names ${p.owners.length}; remove the others from the profile by hand first`);
    }
  },
  async advance(ctx) { await moveOn(ctx, S.members); },
};

// ---- Application: A1 to A13 ----

const uiIntroduction: ScreenStep = {
  screen: S.uiIntroduction,
  async fill() { /* text only */ },
  async advance(ctx) { await moveOn(ctx, S.uiIntroduction, NEXT); },
};

const uiIdentification: ScreenStep = {
  screen: S.uiIdentification,
  async fill(ctx) {
    const reg = nys(ctx).a.employerRegistrationNumber?.replace(/\D/g, "");
    if (!reg) return; // a new employer gets one assigned
    if (reg.length !== 7) throw new Error("NYS-100 Business Identification: the NY employer registration number has 7 digits (not the FEIN)");
    await ctx.set("registrationNumber", reg);
  },
  async advance(ctx) { await moveOn(ctx, S.uiIdentification); },
};

const yn = (v: boolean | undefined) => (v ? "Yes" : "No");

const liability: ScreenStep = {
  screen: S.liability,
  async fill(ctx) {
    const n = nys(ctx);
    const { p, a } = n;
    const T = S.liability.title;
    await answer(ctx, T, "Have you paid (or do you expect to pay) total remuneration of $300 or more during any calendar quarter?", yn(p.payingWages));
    let r = await ctx.resolve(S.liability);
    await r.set("beganDate", toUsDate(p.dateFirstOperations!));
    if (p.uiLiabilityQuarter && (p.payingWages || r.field("firstQuarter"))) await r.set("firstQuarter", QUARTERS[p.uiLiabilityQuarter]);
    if (p.uiLiabilityYear && (p.payingWages || r.field("firstYear"))) await r.set("firstYear", String(p.uiLiabilityYear));
    await answer(ctx, T, "Have you or will you withhold New York State Income Tax from your employees' pay?", yn(withholds(n)));
    if (withholds(n)) {
      r = await whenShown(ctx, S.liability, ["firstPayrollDate"], "answering Yes to withholding");
      await r.set("firstPayrollDate", toUsDate(p.dateFirstWithholding!));
    }
    r = await ctx.resolve(S.liability);
    await r.set("employees", String(p.coveredEmployees));
    await answer(ctx, T, "Do persons work for you whom you do not consider to be your employees?", yn(a.nonEmployeeWorkers));
    if (a.nonEmployeeWorkers) {
      r = await whenShown(ctx, S.liability, ["servicesPerformed"], "answering Yes to non-employee workers");
      await r.set("servicesPerformed", a.nonEmployeeServices!);
    }
  },
  async advance(ctx) { await moveOn(ctx, S.liability); },
};

const transfers: ScreenStep = {
  screen: S.transfers,
  async fill(ctx) {
    const { a } = nys(ctx);
    const T = S.transfers.title;
    await answer(ctx, T, "Have you acquired the business of an employer liable for New York State Unemployment Insurance?", yn(a.acquiredBusiness));
    if (!a.acquiredBusiness) return;
    await answer(ctx, T, "Did you acquire All or Part?", a.acquiredAllOrPart!, ["All", "Part"]);
    const r = await whenShown(ctx, S.transfers, ["acquiredDate", "acquiredName"], "answering Yes to an acquisition");
    await r.set("acquiredDate", toUsDate(a.acquiredDate!));
    await r.set("acquiredName", a.acquiredLegalName!);
    await fillAddress(ctx, addressScreen(S.transfers.screenKey, T), "Acquired Employer Address", { us: a.acquiredAddress!, county: a.acquiredCounty });
    const r2 = await ctx.resolve(S.transfers);
    const reg = a.acquiredRegistrationNumber?.replace(/\D/g, "");
    if (reg) await r2.set("acquiredRegistration", reg.length === 7 ? `${reg.slice(0, 2)}-${reg.slice(2)}` : reg);
    const fein = a.acquiredFein?.replace(/\D/g, "");
    if (fein) await r2.set("acquiredFein", fein.length === 9 ? `${fein.slice(0, 2)}-${fein.slice(2)}` : fein);
  },
  async advance(ctx) { await moveOn(ctx, S.transfers); },
};

const legalEntityChange: ScreenStep = {
  screen: S.legalEntityChange,
  async fill(ctx) {
    const { a } = nys(ctx);
    await answer(ctx, S.legalEntityChange.title, "Has your Legal Entity changed?", yn(a.legalEntityChanged));
    if (!a.legalEntityChanged) return;
    const r = await whenShown(ctx, S.legalEntityChange, ["changeDate", "previousRegistration", "previousFein"], "answering Yes to a change of legal entity");
    await r.set("changeDate", toUsDate(a.legalEntityChangeDate!));
    await r.set("previousRegistration", a.previousRegistrationNumber!);
    const fein = a.previousFein!.replace(/\D/g, "");
    await r.set("previousFein", fein.length === 9 ? `${fein.slice(0, 2)}-${fein.slice(2)}` : a.previousFein!);
  },
  async advance(ctx) { await moveOn(ctx, S.legalEntityChange); },
};

const memberCheck: ScreenStep = {
  screen: S.memberCheck,
  async fill(ctx) {
    const { p } = nys(ctx);
    const text = await ctx.page.locator("body").innerText();
    for (const o of p.owners) {
      const n = splitPersonName(o.name, "Member Information");
      if (!new RegExp(`\\b${escapeRe(n.first)}\\b[\\s\\S]*\\b${escapeRe(n.last)}\\b`, "i").test(text)) throw new Error(`NYS-100 Member Information: ${o.name} is not among the profile's members`);
    }
    const sel = /(\d+)\s+of\s+(\d+)\s+rows?\s+selected/i.exec(text);
    if (sel && sel[1] !== sel[2]) throw new Error(`NYS-100 Member Information: only ${sel[1]} of ${sel[2]} members are selected`);
  },
  async advance(ctx) { await moveOn(ctx, S.memberCheck); },
};

const addressAndContact: ScreenStep = {
  screen: S.addressAndContact,
  async fill(ctx) {
    const n = nys(ctx);
    const r = await ctx.resolve(S.addressAndContact);
    const groups = r.fields.filter((f) => f.kind === "radio" && f.visible);
    const digits = (s: string) => s.replace(/\D/g, "");
    const want = { email: businessEmail(n).toLowerCase(), phone: digits(businessPhone(n)).slice(-10), street: norm(n.p.businessAddress.street1) };
    const kinds = new Set<string>();
    for (const g of groups) {
      const opts = g.options ?? [];
      const kind = opts.some((o) => o.label.includes("@")) ? "email" : opts.every((o) => digits(o.label).length >= 10 && !/[a-z]{4,}/i.test(o.label.replace(/^[^:]*:/, ""))) ? "phone" : "address";
      const pick = opts.find((o) => kind === "email" ? o.label.toLowerCase().includes(want.email)
        : kind === "phone" ? digits(o.label).includes(want.phone) : norm(o.label).includes(want.street));
      if (!pick?.ref) throw new Error(`NYS-100 Address and Contact Information: the profile's ${kind} list does not include ${kind === "email" ? want.email : kind === "phone" ? businessPhone(n) : n.p.businessAddress.street1}`);
      await ctx.page.locator(`[data-ke-ref="${pick.ref}"]`).check();
      kinds.add(kind);
    }
    for (const k of ["address", "email", "phone"]) if (!kinds.has(k)) throw new Error(`NYS-100 Address and Contact Information: no ${k} list to choose from`);
  },
  async advance(ctx) { await moveOn(ctx, S.addressAndContact); },
};

/** A8 and A9: a profile address (still validated) or Other with its own address, and a phone. */
function addressDetails(screen: typeof S.booksAndRecords | typeof S.potentialCharges, pick: (ctx: StepContext, n: Nys) => { address?: Address; phone: string }): ScreenStep {
  return {
    screen,
    async fill(ctx) {
      const n = nys(ctx);
      const { address, phone } = pick(ctx, n);
      const choice = ctx.field("addressChoice");
      if (!choice) throw new Error(`NYS-100 ${screen.title}: the "Select an Address for" list is not on the page`);
      if (!address) {
        const opt = choice.options?.find((o) => norm(o.label).includes(norm(n.p.businessAddress.street1)));
        if (!opt) throw new Error(`NYS-100 ${screen.title}: the business address is not among the profile's addresses`);
        await ctx.set("addressChoice", opt.label);
        await settle(ctx);
        await validateAddress(ctx, screen.title); // prefilled from the profile, still to be validated
      } else {
        await ctx.set("addressChoice", "Other");
        await settle(ctx);
        await fillAddress(ctx, screen, screen.title, { us: address, county: sameAddress(address, n.p.businessAddress) ? n.p.county : undefined, countyOptional: true });
      }
      const r = await ctx.resolve(screen);
      await r.set("phone", phoneMask(phone, screen.title));
    },
    async advance(ctx) { await moveOn(ctx, screen); }, // A9's first save once hung and dropped back: moveOn clicks once more
  };
}

const booksAndRecords = addressDetails(S.booksAndRecords, (ctx, n) => ({
  address: booksAtBusiness(ctx, n) ? undefined : n.p.booksRecordsAddress,
  phone: n.a.booksPhone ?? businessPhone(n),
}));

const potentialCharges = addressDetails(S.potentialCharges, (ctx, n) => ({
  address: chargesAtBusiness(ctx, n) ? undefined : n.a.chargesAddress,
  phone: n.a.chargesPhone ?? businessPhone(n),
}));

const agent: ScreenStep = {
  screen: S.agent,
  async fill(ctx) {
    const { a } = nys(ctx);
    await answer(ctx, S.agent.title, "Do you want all of your mail directed to your Agent - C/O?", yn(a.mailToAgent));
    if (!a.mailToAgent) return;
    await whenShown(ctx, S.agent, ["attn", "line1"], "answering Yes to an agent");
    await fillAddress(ctx, S.agent, "Agent - C/O", { us: a.agentAddress!, countyOptional: true }, a.agentAttn);
  },
  async advance(ctx) { await moveOn(ctx, S.agent); },
};

const physicalLocations: ScreenStep = {
  screen: S.physicalLocations,
  async fill(ctx) {
    const { p } = nys(ctx);
    if (!norm(await ctx.page.locator("body").innerText()).includes(norm(p.businessAddress.street1))) {
      throw new Error(`NYS-100 Physical Locations: ${p.businessAddress.street1} is not listed`);
    }
  },
  async advance(ctx) { await moveOn(ctx, S.physicalLocations); },
};

/** A12 follow-up questions per principal activity (seen on the walk: service activities, Manufacturing, Other). */
const DETAIL_KEYS = ["otherDetails", "productsProduced", "rawMaterials", "percentOfSalesValue", "establishmentType", "productOrService", "percentOfRevenue"] as const;

const locationDetails: ScreenStep = {
  screen: S.locationDetails,
  async fill(ctx) {
    const n = nys(ctx);
    if (!norm(await ctx.page.locator("body").innerText()).includes(norm(n.p.businessAddress.street1))) {
      throw new Error("NYS-100 Physical Locations Details: this screen is for a location other than the business address (more than one location was not walked)");
    }
    const loc = primaryLocation(n);
    await ctx.set("employees", String(loc.employees));
    await ctx.set("activity", loc.activity!);
    await settle(ctx);
    await ctx.page.waitForTimeout(500); // the activity's own questions appear after the choice
    const r = await ctx.resolve(S.locationDetails);
    for (const key of DETAIL_KEYS) {
      const f = r.field(key);
      if (!f?.visible) continue;
      const v = loc.details[key];
      if (v === undefined || v === "") throw new Error(`NYS-100 Physical Locations Details: for "${loc.activity}" the portal asks "${f.label}", which the filing does not answer`);
      await r.set(key, String(v));
    }
  },
  async advance(ctx) {
    const { p } = nys(ctx);
    await moveOn(ctx, S.locationDetails);
    // One A12 screen per location: a second one would be for a location this filing cannot have.
    if (await onScreen(ctx, S.locationDetails.title) && !norm(await ctx.page.locator("body").innerText()).includes(norm(p.businessAddress.street1))) {
      throw new Error("NYS-100 Physical Locations Details: the profile has another physical location; more than one was not walked");
    }
  },
};

const submitter: ScreenStep = {
  screen: S.submitter,
  submitScreen: true, // where the walk stopped: the submitter's certification
  async fill(ctx) {
    const n = nys(ctx);
    const signer = n.p.signer!;
    const name = splitPersonName(signer.name, "Submitter Information");
    await ctx.set("firstName", name.first);
    if (name.middleInitial) await ctx.set("middleInitial", name.middleInitial);
    await ctx.set("lastName", name.suffix ? `${name.last} ${name.suffix}` : name.last);
    await ctx.set("position", signer.title!);
    await ctx.set("phone", phoneMask(n.a.submitterPhone ?? n.contact.phone, "Submitter Information"));
    await ctx.set("email", signer.email ?? n.contact.email);
    if (n.a.submitterComments) await ctx.set("comments", n.a.submitterComments);
  },
  async advance(ctx) {
    if (ctx.dryRun) {
      // A dry run goes no further: past here is the submitter's own attestation.
      await ctx.submit('"I attest to the above" (Submitter Information)', async () => {});
      return;
    }
    // Live: only with the submitter's own attestation, granted on the intake form.
    requireAuthorizations(ctx.filing.request, [AUTH_ATTEST], "NYS-100 Submitter Information");
    const r = await whenShown(ctx, S.submitter, ["attest"], "filling the submitter's details");
    if (r.field("attest")?.disabled) throw new Error('NYS-100 Submitter Information: "I attest to the above" stayed greyed out');
    await r.set("attest", true);
    await moveOn(ctx, S.submitter);
  },
};

const readyToSubmit: ScreenStep = {
  screen: S.readyToSubmit,
  submitScreen: true,
  async fill(ctx) {
    await ctx.note("NYS-100 Ready to Submit reached: recorded for the walk that maps it");
    throw new Error("NYS-100 Ready to Submit is not mapped (the walk of 2026-11-24 stopped at Submitter Information); nothing was submitted");
  },
  async advance() { throw new Error("NYS-100 Ready to Submit is not mapped"); },
};

export const nyPayrollAdapter: SiteAdapter = {
  site: "NY",
  key: "ny-payroll",
  complete: false,
  entryUrl: () => process.env.NY_PAYROLL_URL ?? "https://www.businessexpress.ny.gov/app/dashboard/descriptionToInterview?licenseTypeCode=NYS100&appTypeCode=INITAPP",
  // The subscriber's NY.gov business login (persistent context), kept apart from its NY DOS account (ny:<tenant>).
  profileKey: (ctx) => `nygov:${ctx.tenant.tenantId}`,
  credentialKey: (ctx) => tenantVaultKey(ctx.tenant, ctx.tenant.nyPayrollCredentialKey ?? ctx.tenant.nyGovCredentialKey),
  steps: [
    selectBusiness, introduction, entityType, businessIdentification, addressesIntro, physicalAddress, additionalLocations,
    mailingAddresses, contact, industry, ownerIntro, members,
    uiIntroduction, uiIdentification, liability, transfers, legalEntityChange, memberCheck, addressAndContact,
    booksAndRecords, potentialCharges, agent, physicalLocations, locationDetails, submitter, readyToSubmit,
  ],
};
