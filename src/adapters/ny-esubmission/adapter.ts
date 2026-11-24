import { mkdir, unlink, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import type { PaperUploadDetails } from "../../domain/filing.js";
import { fillNyForm, formSignerName } from "../../pdf-forms/ny-dos.js";
import { tenantVaultKey } from "../../settings/accounts.js";
import type { ScreenIntents } from "../../resolver/types.js";
import type { ScreenStep, SiteAdapter, StepContext } from "../types.js";
import { NY_ESUBMISSION_SCREENS } from "../ny-formation/intents.js";

/**
 * NY DOS E-Submission (docs/portal-maps/ny-dos-corporations.md, Screen L): the engine fills the
 * state's own PDF form, signs it only when the client approved the filing, and uploads it.
 *
 *   home → route (category, entity type, filing type) → proposed name (new entity) or entity
 *   selection by DOS ID (assumed name) → Filing Information (upload, level of service, copies)
 *   → Payment (draw-down account, Payment Authorization, Submit = FINAL)
 *
 * Mapped from the user's screen recording only; the route option labels for these two forms and
 * the entity selection results list were not on screen. complete:false keeps it to dry runs.
 */

function upload(ctx: StepContext): PaperUploadDetails {
  const u = ctx.filing.request.paperUpload;
  if (!u) throw new Error("paperUpload details missing");
  return u;
}

const ROUTE: Record<PaperUploadDetails["form"], { entry: RegExp; category: string; entityType: string; filingType: RegExp }> = {
  ny_application_for_authority: { entry: /initial organization filing/i, category: "FOREIGN", entityType: "Business Corporation", filingType: /application for authority/i },
  // Domestic LLC → "Certificate of Assumed Name" was seen; the category follows the entity's law.
  ny_assumed_name: { entry: /^assumed name filing$/i, category: "DOMESTIC", entityType: "Limited Liability Company", filingType: /certificate of assumed name/i },
};

const ENTITY_TYPE_FOR_LAW: Record<string, string> = {
  business_corporation: "Business Corporation",
  limited_liability_company: "Limited Liability Company",
  not_for_profit_corporation: "Not-for-Profit Corporation",
  revised_limited_partnership: "Limited Partnership",
  religious_corporations: "Religious Corporation",
};

const HOME: ScreenIntents = { screenKey: "ny.esub.home", title: "On-Line Filing System home (service company)", intents: [] };
const ENTITY_SELECTION: ScreenIntents = {
  screenKey: "ny.esub.entity_selection",
  title: "E-Submission Amendment Entity Selection",
  intents: [
    { key: "dosId", labels: ["DOS ID"], kinds: ["text"], required: false },
    { key: "entityName", labels: ["Entity Name"], kinds: ["text"], required: false },
  ],
};
const PAYMENT: ScreenIntents = {
  screenKey: "ny.esub.payment",
  title: "Payment",
  intents: [
    { key: "drawdownAccount", labels: ["Drawdown Account"], kinds: ["select"], required: true },
    { key: "paymentAuthorization", labels: ["Payment Authorization"], kinds: ["checkbox"], required: true, note: "STOP: ticked only inside the approved submit" },
  ],
};

/** The generated PDF for this run, kept for the artifacts after submit. */
const generated = new Map<string, { name: string; body: Buffer }>();

const home: ScreenStep = {
  screen: HOME,
  async fill() {},
  async advance(ctx) {
    await ctx.actAndSettle(() => ctx.clickButton(ROUTE[upload(ctx).form].entry));
  },
};

const route: ScreenStep = {
  screen: NY_ESUBMISSION_SCREENS.route,
  async fill(ctx) {
    const u = upload(ctx);
    const r = ROUTE[u.form];
    const entityType = u.form === "ny_assumed_name" ? ENTITY_TYPE_FOR_LAW[u.assumedName!.formedUnder] ?? r.entityType : r.entityType;
    const category = u.form === "ny_assumed_name" && u.assumedName!.foreignFictitiousName ? "FOREIGN" : r.category;
    // Each list loads after the one before it.
    await ctx.actAndSettle(() => ctx.set("businessCategory", category));
    const s2 = await ctx.resolve(NY_ESUBMISSION_SCREENS.route);
    await ctx.actAndSettle(() => s2.set("entityType", entityType));
    const s3 = await ctx.resolve(NY_ESUBMISSION_SCREENS.route);
    const ft = s3.field("filingType");
    const opt = ft?.options?.find((o) => r.filingType.test(o.label));
    if (!opt) throw new Error(`E-Submission has no filing type matching ${r.filingType} for ${entityType}`);
    await s3.set("filingType", opt.label);
  },
  async advance(ctx) { await ctx.actAndSettle(() => ctx.clickButton(/continue/i)); },
};

const proposedName: ScreenStep = {
  screen: NY_ESUBMISSION_SCREENS.proposedName,
  nameCheckGate: true,
  async present(ctx) { return upload(ctx).form === "ny_application_for_authority"; },
  async fill(ctx) {
    const a = upload(ctx).applicationForAuthority!;
    const nyName = a.fictitiousName || [a.corporateName, a.nameAddition].filter(Boolean).join(" ");
    await ctx.set("proposedName", nyName);
  },
  async advance(ctx) { await ctx.actAndSettle(() => ctx.clickButton(/continue/i)); },
};

const entitySelection: ScreenStep = {
  screen: ENTITY_SELECTION,
  async present(ctx) { return upload(ctx).form === "ny_assumed_name"; },
  async fill(ctx) {
    const n = upload(ctx).assumedName!;
    if (n.dosId) await ctx.set("dosId", n.dosId);
    else await ctx.set("entityName", n.realName);
    await ctx.actAndSettle(() => ctx.clickButton(/search/i));
    // The results list was not on screen in the recording; pick only an exact single match.
    const rows = ctx.page.getByRole("row").filter({ hasText: n.dosId ?? n.realName });
    if ((await rows.count()) !== 1) throw new Error(`E-Submission entity search did not return exactly one match for ${n.dosId ? `DOS ID ${n.dosId}` : n.realName}`);
    await rows.first().getByRole("link").first().click();
  },
  async advance(ctx) { await ctx.actAndSettle(() => ctx.clickButton(/continue/i)); },
};

const filingInformation: ScreenStep = {
  screen: NY_ESUBMISSION_SCREENS.filingInformation,
  async fill(ctx) {
    const u = upload(ctx);
    const sig = ctx.dryRun ? null : await ctx.signatureForForm(u.signatureId, formSignerName(u));
    // A real run never uploads an unsigned form: DOS rejects it and the fee is still charged.
    if (sig && !sig.ok) throw new Error(`the form can't be signed: ${sig.reason}`);
    const pdf = Buffer.from(await fillNyForm(u, { dryRun: ctx.dryRun, signaturePng: sig?.ok ? sig.png : null }));
    const name = `${u.form === "ny_application_for_authority" ? "DOS-1335" : "DOS-1338"}-${ctx.filing.id.slice(0, 8)}${ctx.dryRun ? "-dry-run" : ""}.pdf`;
    generated.set(ctx.filing.id, { name, body: pdf });
    const dir = path.join(tmpdir(), "keystone-forms");
    await mkdir(dir, { recursive: true, mode: 0o700 });
    const file = path.join(dir, `${ctx.filing.id}-${Date.now()}.pdf`);
    await writeFile(file, pdf, { mode: 0o600 });
    try {
      await ctx.set("uploadDocument", file);
    } finally {
      await unlink(file).catch(() => {});
    }
    const contact = ctx.filing.request.contact;
    if (contact?.email) await ctx.set("email", contact.email);
    await ctx.set("customerReference", ctx.filing.request.idempotencyKey.slice(0, 30));
    const levels = { routine: "ROUTINE", "24_hour": "24 HOUR", same_day: "SAME DAY", "2_hour": "2 HOUR" } as const;
    await ctx.set("levelOfService", levels[u.levelOfService]);
    if (u.plainCopy) await ctx.set("plainCopy", true);
    if (u.certifiedCopy) await ctx.set("certifiedCopy", true);
    await ctx.note(`uploaded ${name}${ctx.dryRun ? " (dry run, unsigned)" : " (signed)"}`);
  },
  async advance(ctx) {
    await ctx.actAndSettle(() => ctx.clickButton(/continue/i));
    const text = (await ctx.page.locator("body").innerText()).toLowerCase();
    if (text.includes("file upload details not found")) throw new Error("E-Submission did not accept the uploaded PDF");
  },
};

const payment: ScreenStep = {
  screen: PAYMENT,
  paymentScreen: true,
  submitScreen: true,
  async fill(ctx) {
    const acct = ctx.field("drawdownAccount");
    const opts = (acct?.options ?? []).filter((o) => o.value && !/select one/i.test(o.label));
    if (opts.length !== 1) throw new Error(`expected exactly one draw-down account, found ${opts.length}; pick one in the tenant settings first`);
    await ctx.set("drawdownAccount", opts[0]!.label);
  },
  async advance(ctx) {
    // Payment Authorization is part of the approved submit: a dry run stops before it is ticked.
    await ctx.submit("ny.esub.submit", async () => {
      await ctx.set("paymentAuthorization", true);
      await ctx.clickButton(/^submit$/i);
    });
  },
};

export const nyESubmissionAdapter: SiteAdapter = {
  site: "NY",
  key: "ny-esubmission",
  complete: false,
  // The signed-in home page's address was not readable in the recording; set NY_DOS_HOME_URL once seen.
  entryUrl: () => process.env.NY_DOS_HOME_URL ?? "https://filings.dos.ny.gov/ords/r/corpanc/efiling",
  profileKey: (ctx) => `ny:${ctx.tenant.tenantId}`,
  credentialKey: (ctx) => tenantVaultKey(ctx.tenant, ctx.tenant.nyGovCredentialKey),
  steps: [home, route, proposedName, entitySelection, filingInformation, payment],
  async collectArtifacts(ctx) {
    const g = generated.get(ctx.filing.id);
    generated.delete(ctx.filing.id);
    return g ? [{ kind: "filed_form", label: g.name, contentType: "application/pdf", body: g.body }] : [];
  },
};
