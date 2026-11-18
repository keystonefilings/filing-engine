import { hasLlcIndicator, renderName } from "../../domain/name.js";
import type { ScreenStep, SiteAdapter, StepContext } from "../types.js";
import { tenantVaultKey } from "../../settings/accounts.js";
import { NY_SCREENS } from "./intents.js";

function formation(ctx: StepContext) {
  const f = ctx.filing.request.formation;
  if (!f) throw new Error("formation details missing");
  return f;
}

const entityName: ScreenStep = {
  screen: NY_SCREENS.entityName,
  nameCheckGate: true, // NY only validates the indicator here; the pre-run DOS database search is the real gate (decision 1).
  async fill(ctx) {
    const name = renderName(formation(ctx).name, "NY").nameField;
    if (!hasLlcIndicator(name)) throw new Error("NY name lacks an LLC indicator");
    await ctx.set("entityName", name);
  },
  async advance(ctx) {
    await ctx.clickButton(/continue|next/i);
    await ctx.page.waitForLoadState("domcontentloaded");
    // Settle is handled by the engine; this check runs in verify-style after the click.
    const text = (await ctx.page.locator("body").innerText()).toLowerCase();
    if (text.includes("type indicator applicable to specified entity type not found")) throw new Error("NY rejected the name: missing type indicator");
  },
};

const filing: ScreenStep = {
  screen: NY_SCREENS.filing,
  async fill(ctx) {
    const f = formation(ctx);
    const r = ctx.filing.request;
    const organizer = f.organizer ?? ctx.tenant.organizer;
    const filer = f.filer ?? ctx.tenant.filer;
    if (!organizer?.address || !filer?.address) throw new Error("NY organizer/filer missing");
    if (ctx.client.checkboxDefaults.nyOpeningStatement) await ctx.set("openingStatement", true);
    await ctx.set("llcName", renderName(f.name, "NY").nameField);
    if (f.name.englishTranslation) await ctx.set("englishTranslation", f.name.englishTranslation);
    await ctx.set("county", f.county ?? ctx.client.countyDefault ?? "");
    const sop = f.serviceOfProcess!;
    if (sop.mode === "manual") {
      await ctx.set("sopMode", "Enter");
      const scoped = await ctx.resolve(NY_SCREENS.filing);
      const p = sop.person!;
      await scoped.set("sopName", p.name);
      await scoped.set("sopAddress1", p.address!.street1);
      if (p.address!.street2) await scoped.set("sopAddress2", p.address!.street2);
      await scoped.set("sopCity", p.address!.city);
      await scoped.set("sopState", p.address!.state);
      await scoped.set("sopZip", p.address!.zip);
      await scoped.set("sopEmail", sop.noticeEmail!);
      await scoped.set("sopEmailConfirm", sop.noticeEmail!);
    } else {
      await ctx.set("sopMode", sop.serviceCompany!);
    }
    if (f.managementStructure) { await ctx.set("managementClause", true); await ctx.set("managementStructure", f.managementStructure === "manager_managed" ? "manager" : "member"); }
    if (f.effectiveDate === "specific") await ctx.set("effectiveDateMode", "specif"); else await ctx.set("effectiveDateMode", "filing");
    if (f.effectiveDate === "specific" && f.effectiveDateValue) await ctx.set("effectiveDate", f.effectiveDateValue);
    await ctx.set("organizerName", organizer.name);
    await ctx.set("organizerAddress1", organizer.address.street1);
    await ctx.set("organizerCity", organizer.address.city);
    await ctx.set("organizerState", organizer.address.state);
    await ctx.set("organizerZip", organizer.address.zip);
    await ctx.set("signature", organizer.name);
    await ctx.set("filerName", filer.name);
    await ctx.set("filerAddress1", filer.address.street1);
    await ctx.set("filerCity", filer.address.city);
    await ctx.set("filerState", filer.address.state);
    await ctx.set("filerZip", filer.address.zip);
    void r;
  },
  async advance() {
    // The long Filing form is mapped (2026-11-18); the filing-to-checkout transition,
    // distribution email, drawdown/card selection and final button are not yet walked.
    throw new Error("NY checkout (fee, distribution email, drawdown/card, final button) is not mapped yet; see docs/walks/ny-irs-2026-11-18.md");
  },
};

export const nyFormationAdapter: SiteAdapter = {
  site: "NY",
  key: "ny-formation",
  complete: false,
  entryUrl: () => process.env.NY_FORMATION_URL ?? "https://filings.dos.ny.gov/ords/r/corpanc/efiling/1",
  profileKey: (ctx) => `ny:${ctx.tenant.tenantId}`,
  credentialKey: (ctx) => tenantVaultKey(ctx.tenant, ctx.tenant.nyGovCredentialKey),
  steps: [entityName, filing],
};
