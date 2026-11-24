import { readDownload } from "../../browser/harness.js";
import type { ScreenStep, SiteAdapter, StepContext } from "../types.js";
import type { ScreenIntents } from "../../resolver/types.js";
import { IRS_ACTIVITY_CATEGORIES, IRS_SCREENS, IRS_START } from "./intents.js";
import { stateName } from "../../domain/usStates.js";

/**
 * IRS EIN Assistant (sa.www4.irs.gov/applyein), domestic LLC route, built to the portal map
 * of 2026-11-24 (docs/portal-maps/irs-ein-online.md, walked to "Submit EIN Request") and the
 * owner-route walk of 2026-11-18 (docs/walks/ny-irs-2026-11-18.md).
 *
 * Pages: (Before You Begin) -> Legal Structure -> Identity -> (designee) -> Addresses ->
 * Additional Details -> business activity -> Review & Submit -> EIN Assignment. Two pages build
 * themselves as they are answered: Legal Structure reveals the member count and physical state
 * after "LLC", then the reason; Additional Details reveals the employee questions after Yes to
 * W-2 employees. Those parts are filled after they appear, with no Continue between them (a
 * Continue with a part unanswered gets "Selection is required"). "Submit EIN Request" is the
 * irreversible click: a dry run stops there, a real run records a submit intent first and needs
 * an approval.
 *
 * The SSN/ITIN goes only into the Identity field. Identity and Review are sensitive screens:
 * screenshots are masked and DOM snapshots stripped (browser/recorder.ts), and nothing here
 * notes or logs the number.
 *
 * complete:false — dry runs only, until a supervised dry run on the live site (through Steel,
 * whose network the IRS serves) confirms the labels and how the pages reveal their questions.
 * Not mapped yet: the third-party designee branch, the separate mailing block, the address-
 * suggestion dialog, Other > Consulting's follow-ups, and the EIN Assignment / CP 575 screen.
 */

const CONTINUE = /^(continue|next)\b/i;
const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const REASON_LABEL = {
  new_business: "Started a new business",
  hired_employees: "Hired employees",
  banking: "Banking purposes",
  changed_organization: "Changed type of organization",
  purchased_business: "Purchased active business",
} as const;
const ROLE_LABEL = {
  owner: "I am one of the owners, members, or the managing member of this LLC.",
  third_party_designee: "I am a third party applying for an EIN on behalf of this LLC",
} as const;
const NAME_SUFFIXES = new Set(["DDS", "MD", "PHD", "JR", "SR", "I", "II", "III", "IV", "V", "VI"]);

const digits = (s: string) => s.replace(/\D/g, "");
const yesNo = (b: boolean) => (b ? "Yes" : "No");

function einReq(ctx: StepContext) {
  const e = ctx.filing.request.ein;
  if (!e) throw new Error("EIN request details missing");
  return e;
}
function entity(ctx: StepContext) {
  const f = ctx.filing.request.formation;
  if (!f) throw new Error("the LLC's details (formation) are missing");
  return f;
}
function responsibleParty(ctx: StepContext) {
  const r = einReq(ctx).responsibleParty;
  if (!r) throw new Error("the EIN responsible party is missing");
  return r;
}

/** "Mary Ann Smith Jr" -> first Mary, middle Ann, last Smith, suffix Jr. */
export function splitPersonName(full: string): { first: string; middle?: string; last: string; suffix?: string } {
  const parts = full.trim().split(/\s+/);
  let suffix: string | undefined;
  if (parts.length > 2 && NAME_SUFFIXES.has(parts[parts.length - 1]!.replace(/\./g, "").toUpperCase())) suffix = parts.pop();
  if (parts.length < 2) throw new Error("the responsible party needs a first and last name");
  return { first: parts[0]!, middle: parts.length > 2 ? parts.slice(1, -1).join(" ") : undefined, last: parts[parts.length - 1]!, suffix };
}

/** IRS-permitted rendering of a name: letters, digits, spaces, hyphen and ampersand only. */
export function irsName(name: string): string {
  return name.replace(/[^A-Za-z0-9&\- ]/g, "").replace(/\s+/g, " ").trim();
}

/** State selectors list codes on some screens and names on others: try the code, then the name. */
async function setState(set: StepContext["set"], key: string, code: string) {
  try { await set(key, code); } catch { await set(key, stateName(code)); }
}
/** Month selectors: try the month name, then the two-digit number. */
async function setMonth(set: StepContext["set"], key: string, month: number) {
  try { await set(key, MONTHS[month - 1]!); } catch { await set(key, String(month).padStart(2, "0")); }
}

/** One page's questions, matched together so a revealed question never takes another's field. */
const onePage = (base: ScreenIntents, ...parts: ScreenIntents[]): ScreenIntents => ({ ...base, intents: [base, ...parts].flatMap((p) => p.intents) });
const LEGAL_STRUCTURE_PAGE = onePage(IRS_SCREENS.legalStructure, IRS_SCREENS.llcMembers, IRS_SCREENS.reason);
/** Everything on Additional Details at load: the LLC and the five Yes/No questions. */
const DETAILS_PAGE = onePage(IRS_SCREENS.details, IRS_SCREENS.regulatory);

/**
 * Waits (bounded) for questions the page reveals after an answer, then returns the page
 * resolved fresh. A question that never appears stops the run here, before anything is sent.
 */
async function whenShown(ctx: StepContext, screen: ScreenIntents, keys: string[], after: string, timeoutMs = 15_000) {
  for (let waited = 0; ; waited += 500) {
    const r = await ctx.resolve(screen);
    if (keys.every((k) => r.field(k)?.visible)) return r;
    if (waited >= timeoutMs) throw new Error(`${screen.title}: ${keys.join(", ")} did not appear after ${after}`);
    await ctx.page.waitForTimeout(500);
  }
}

/** The page may raise an information box after an answer (what an LLC is; single-member LLC). */
async function acknowledgeInfo(ctx: StepContext) {
  const box = ctx.page.locator('[role="dialog"]:visible, [role="alertdialog"]:visible').first();
  if (!(await box.count())) return; // shown inline: nothing to press
  const ok = box.getByRole("button", { name: /^(continue|ok|close|got it|i understand)$/i }).first();
  if (await ok.count()) { await ok.click(); await ctx.note("acknowledged an information box"); }
}

/** The LLC's start date: the stated one; for an in-run EIN on a new filing, the effective date or the run date. */
function startDate(ctx: StepContext): { month: number; year: number } {
  const e = einReq(ctx);
  const f = entity(ctx);
  const iso = e.startDate ?? (f.effectiveDate === "specific" ? f.effectiveDateValue : undefined);
  if (iso) { const [y, m] = iso.split("-"); return { year: Number(y), month: Number(m) }; }
  if (ctx.filing.request.type === "ein_only") throw new Error("an EIN-only filing needs the LLC start date (ein.startDate)");
  const now = new Date();
  return { year: now.getFullYear(), month: now.getMonth() + 1 };
}

const start: ScreenStep = {
  screen: IRS_START,
  async present(ctx) {
    const begin = ctx.page.getByRole("button", { name: /begin application|apply online now/i })
      .or(ctx.page.getByRole("link", { name: /begin application|apply online now/i }));
    return (await begin.count()) > 0;
  },
  async fill() { /* landing page */ },
  async advance(ctx) { await ctx.clickButton(/begin application|apply online now/i); },
};

const legalStructure: ScreenStep = {
  screen: IRS_SCREENS.legalStructure, // at load only the structure question shows
  async fill(ctx) {
    const f = entity(ctx);
    const e = einReq(ctx);
    if (f.floridaEntityType && f.floridaEntityType !== "llc") {
      throw new Error("the IRS adapter maps the LLC route only; corporation and partnership branches are not walked yet");
    }
    await ctx.set("legalStructure", "Limited Liability Company (LLC)");
    await acknowledgeInfo(ctx);
    const members = await whenShown(ctx, LEGAL_STRUCTURE_PAGE, ["memberCount", "physicalState"], "choosing LLC");
    await members.set("memberCount", String(e.memberCount ?? Math.max(1, f.members.length)));
    const physical = e.physicalState ?? f.mainBusinessAddress?.state;
    if (!physical) throw new Error("the EIN interview needs the LLC's physical state");
    await setState(members.set, "physicalState", physical);
    // Spousal / community-property question (two-member LLCs in some states): not mapped yet.
    await acknowledgeInfo(ctx);
    const why = await whenShown(ctx, LEGAL_STRUCTURE_PAGE, ["reason"], "the member count and state");
    await why.set("reason", REASON_LABEL[e.reason]);
  },
  async advance(ctx) { await ctx.clickButton(CONTINUE); },
};

const identity: ScreenStep = {
  screen: IRS_SCREENS.identity,
  sensitive: true,
  async fill(ctx) {
    const r = responsibleParty(ctx);
    const n = splitPersonName(r.name);
    await ctx.set("rpFirstName", n.first);
    if (n.middle) await ctx.set("rpMiddle", n.middle);
    await ctx.set("rpLastName", n.last);
    if (n.suffix) await ctx.set("rpSuffix", n.suffix);
    await ctx.set("rpSsn", digits(r.ssn));
    await ctx.set("applicantRole", ROLE_LABEL[einReq(ctx).applicantRole]);
    await ctx.note("responsible party entered (SSN/ITIN masked)");
  },
  async advance(ctx) { await ctx.clickButton(CONTINUE); },
};

const designee: ScreenStep = {
  screen: IRS_SCREENS.designee,
  async present(ctx) {
    if (einReq(ctx).applicantRole !== "third_party_designee") return false;
    const text = await ctx.page.locator("body").innerText().catch(() => "");
    return /designee|third[- ]party/i.test(text);
  },
  async fill(ctx) {
    // Keystone (the service company) is the designee: its own contact and address.
    const contact = ctx.tenant.contact;
    const who = ctx.tenant.filer ?? ctx.tenant.organizer;
    if (!contact || !who?.address) throw new Error("the third-party designee needs the service company's contact (tenant.contact) and address (tenant.filer or tenant.organizer)");
    const r = responsibleParty(ctx);
    if (digits(contact.phone) === digits(r.phone)) {
      throw new Error("the designee's phone matches the taxpayer's; the IRS requires a fax or mail application in that case");
    }
    await ctx.set("designeeFirstName", contact.firstName);
    await ctx.set("designeeLastName", contact.lastName);
    await ctx.set("designeeStreet", who.address.street1);
    await ctx.set("designeeCity", who.address.city);
    await setState(ctx.set, "designeeState", who.address.state);
    await ctx.set("designeeZip", who.address.zip.slice(0, 5));
    await ctx.set("designeePhone", digits(contact.phone).slice(-10));
  },
  async advance(ctx) { await ctx.clickButton(CONTINUE); },
};

const address: ScreenStep = {
  screen: IRS_SCREENS.address,
  async fill(ctx) {
    const f = entity(ctx);
    const e = einReq(ctx);
    const a = f.mainBusinessAddress;
    if (!a) throw new Error("the EIN interview needs the LLC's physical address (formation.mainBusinessAddress)");
    await ctx.set("street", [a.street1, a.street2].filter(Boolean).join(" "));
    await ctx.set("city", a.city);
    await setState(ctx.set, "state", a.state);
    await ctx.set("zip", a.zip.slice(0, 5));
    await ctx.set("phone", digits(e.responsibleParty?.phone ?? ctx.filing.request.contact.phone).slice(-10));
    const mail = e.mailingAddress;
    await ctx.set("hasMailing", yesNo(!!mail));
    if (mail) {
      // The mailing fields appear on the same screen after "Yes". Match both sets together so
      // identical labels ("City", "State") resolve physical-first, mailing-second.
      const both = await ctx.resolve({ ...IRS_SCREENS.address, intents: [...IRS_SCREENS.address.intents, ...IRS_SCREENS.mailing.intents] });
      await both.set("mailStreet", [mail.street1, mail.street2].filter(Boolean).join(" "));
      await both.set("mailCity", mail.city);
      await setState(both.set, "mailState", mail.state);
      await both.set("mailZip", mail.zip.slice(0, 5));
      await both.set("mailCountry", "United States");
    }
  },
  async advance(ctx) { await ctx.clickButton(CONTINUE); },
  async verify(ctx) {
    // The IRS may offer a corrected address. Keep the entered one and note it for the approval record.
    const keep = ctx.page.getByRole("button", { name: /use (the )?address (i|you) entered|keep (my|the) address/i });
    if (await keep.count()) {
      await ctx.note("IRS suggested an address correction; kept the entered address");
      await ctx.actAndSettle(() => keep.first().click());
    }
  },
};

const details: ScreenStep = {
  screen: DETAILS_PAGE,
  async fill(ctx) {
    const f = entity(ctx);
    const e = einReq(ctx);
    await ctx.set("legalName", irsName(`${f.name.baseName} ${f.name.designator}`));
    if (e.tradeName) await ctx.set("tradeName", irsName(e.tradeName));
    const county = e.county ?? f.county;
    if (!county) throw new Error("the EIN interview needs the LLC's physical county (ein.county)");
    await ctx.set("county", county);
    const physical = e.physicalState ?? f.mainBusinessAddress?.state;
    if (physical) await setState(ctx.set, "physicalStateDetail", physical);
    if (!e.formationState) throw new Error("the EIN interview needs the formation state (ein.formationState)");
    await setState(ctx.set, "formationState", e.formationState);
    const sd = startDate(ctx);
    await setMonth(ctx.set, "startMonth", sd.month);
    await ctx.set("startYear", String(sd.year));

    // "Tell us more about the LLC": five Yes/No questions on the same page.
    const r = e.regulated;
    if (!r) throw new Error("the four regulated-activity answers are required (ein.regulated)");
    const emp = e.employees;
    if (!emp) throw new Error("the W-2 employees answer is required (ein.employees)");
    await ctx.set("highwayVehicle", yesNo(r.highwayVehicle));
    await ctx.set("wagering", yesNo(r.wagering));
    await ctx.set("form720", yesNo(r.form720));
    await ctx.set("atf", yesNo(r.alcoholTobaccoFirearms));
    await ctx.set("expectsEmployees", yesNo(emp.expected));
    if (!emp.expected) return;

    // Yes opens "Describe your employees" on the same page.
    if (!emp.firstWages) throw new Error("employees expected: the first wages month is required (ein.employees.firstWages)");
    if (emp.lowAnnualLiability === undefined) throw new Error("employees expected: the $1,000-or-less liability answer is required (ein.employees.lowAnnualLiability)");
    const s2 = await whenShown(ctx, onePage(DETAILS_PAGE, IRS_SCREENS.employees), ["firstWagesMonth", "firstWagesYear", "lowLiability"], "Yes to W-2 employees");
    const [y, m] = emp.firstWages.split("-");
    await setMonth(s2.set, "firstWagesMonth", Number(m));
    await s2.set("firstWagesYear", y!);
    if (emp.agriculturalCount !== undefined) await s2.set("agriculturalCount", String(emp.agriculturalCount));
    if (emp.otherCount !== undefined) await s2.set("otherCount", String(emp.otherCount));
    await s2.set("lowLiability", yesNo(emp.lowAnnualLiability));
  },
  async advance(ctx) { await ctx.clickButton(CONTINUE); },
};

const activity: ScreenStep = {
  screen: IRS_SCREENS.activity,
  async fill(ctx) {
    const a = einReq(ctx).businessActivity;
    if (!a?.category) throw new Error("the principal business activity is required (ein.businessActivity)");
    const category = IRS_ACTIVITY_CATEGORIES.find((c) => c.toLowerCase() === a.category.toLowerCase());
    if (!category) throw new Error(`"${a.category}" is not one of the IRS activity categories (${IRS_ACTIVITY_CATEGORIES.join(", ")})`);
    await ctx.set("activityCategory", category);
    if (a.detail) {
      const s = await ctx.resolve(IRS_SCREENS.activity); // the follow-up appears after the category
      await s.set("activityDetail", a.detail);
    }
  },
  async advance(ctx) { await ctx.clickButton(CONTINUE); },
};

const review: ScreenStep = {
  screen: IRS_SCREENS.review,
  sensitive: true,      // the summary shows the (masked) identity; recorded masked regardless
  reviewScreen: true,   // the beta review-gate stops here
  submitScreen: true,
  async fill(ctx) {
    await ctx.set("noticeDelivery", einReq(ctx).noticeDelivery === "mail"
      ? "Receive letter by mail (allow up to 4 weeks for delivery)"
      : "Receive letter digitally in the next step");
  },
  async advance(ctx) {
    await ctx.submit("Submit EIN Request", () => ctx.clickButton(/submit ein request/i));
  },
};

const assignment: ScreenStep = {
  screen: IRS_SCREENS.assignment,
  async fill(ctx) {
    const text = await ctx.page.locator("body").innerText();
    const m = /\b(\d{2}-\d{7})\b/.exec(text);
    if (!m) throw new Error("EIN not found on the IRS assignment page");
    ctx.values.ein = m[1]!;
    await ctx.note("EIN assigned");
  },
  async advance() { /* last screen */ },
};

export const irsEinAdapter: SiteAdapter = {
  site: "IRS",
  key: "irs-ein",
  complete: false,
  entryUrl: () => process.env.IRS_EIN_URL ?? "https://sa.www4.irs.gov/applyein/",
  profileKey: () => null, // always a fresh context
  credentialKey: () => null,
  steps: [start, legalStructure, identity, designee, address, details, activity, review, assignment],
  async confirmSubmission(ctx) {
    // Evidence is the EIN printed on the assignment page itself, not a value carried in memory.
    const m = /\b(\d{2}-\d{7})\b/.exec(await ctx.page.locator("body").innerText());
    return m ? { reference: m[1]!, detail: "EIN shown on the IRS assignment page" } : null;
  },
  async collectArtifacts(ctx) {
    const out: { kind: string; label: string; contentType: string; body: Buffer }[] = [];
    // The official notice, when digital delivery offers it this session.
    const dl = ctx.page.getByRole("link", { name: /download|confirmation letter|cp ?575/i })
      .or(ctx.page.getByRole("button", { name: /download|confirmation letter|cp ?575/i })).first();
    if (await dl.count()) {
      try {
        const [download] = await Promise.all([ctx.page.waitForEvent("download", { timeout: 20_000 }), dl.click()]);
        // Local or Steel-hosted browser alike (a remote browser's file is not on this machine).
        out.push({ kind: "cp575", label: "CP 575 EIN confirmation letter", contentType: "application/pdf", body: await readDownload(download) });
      } catch (e) {
        await ctx.note(`CP 575 download did not complete: ${(e as Error).message.split("\n")[0]}`);
      }
    }
    // The assignment page itself, as evidence (distinct from the official notice).
    try {
      out.push({ kind: "other", label: "EIN assignment page (printed)", contentType: "application/pdf", body: await ctx.page.pdf({ printBackground: true }) });
    } catch { /* page.pdf needs headless Chromium */ }
    return out;
  },
};
