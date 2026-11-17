import type { ScreenStep, SiteAdapter, StepContext } from "../types.js";
import { NJ_STANDING_FORM_COLUMN, NJ_STANDING_SCREENS } from "./intents.js";

/**
 * NJ standing certificate, one certificate per filing.
 * Search type -> (postback) business name -> (postback) Continue -> results grid ->
 * tick the form column on the exact entity row -> Add To Cart -> Cart: payment type ->
 * fee check -> Pay Now (NICUSA gateway, unmapped).
 *
 * complete=false for the same reason as NJ formation: the gateway after Pay Now has not
 * been walked. Dry runs stop before Pay Now; the cart lives only in the run's session.
 */

function standing(ctx: StepContext) {
  const s = ctx.filing.request.standing;
  if (!s) throw new Error("standing certificate details missing");
  return s;
}

const searchType: ScreenStep = {
  screen: NJ_STANDING_SCREENS.searchType,
  async fill() { /* the choice posts the page back, so it happens in advance() */ },
  async advance(ctx) { await ctx.set("searchType", "Business Name"); },
};

const searchName: ScreenStep = {
  screen: NJ_STANDING_SCREENS.searchName,
  async fill(ctx) {
    await ctx.set("businessName", standing(ctx).entityName);
    // Leaving the box posts back (onchange). Let that finish, or it swallows the Continue click.
    const f = ctx.field("businessName");
    if (f) await ctx.actAndSettle(() => ctx.page.locator(`[data-ke-ref="${f.ref}"]`).press("Tab"));
  },
  async advance(ctx) { await ctx.clickButton(/^continue$/i); },
};

const results: ScreenStep = {
  screen: NJ_STANDING_SCREENS.results,
  async fill(ctx) {
    const s = standing(ctx);
    const scoped = await ctx.resolve(NJ_STANDING_SCREENS.results);
    const column = NJ_STANDING_FORM_COLUMN[s.form];
    const want = s.entityName.trim().toUpperCase();
    const rows = scoped.fields.filter((f) => f.kind === "checkbox" && f.visible && f.label.toUpperCase().startsWith(column.toUpperCase()));
    if (!rows.length) {
      const text = (await ctx.page.locator("body").innerText()).replace(/\s+/g, " ");
      throw new Error(/no (records|results)/i.test(text) ? `the search for "${s.entityName}" returned no records` : "the results grid did not load (still on the search page?)");
    }
    const exact = rows.filter((f) => f.label.slice(f.label.indexOf(":") + 1).trim().toUpperCase() === want);
    let pick = exact;
    if (s.entityId) {
      pick = [];
      for (const f of exact) {
        const rowText = await ctx.page.locator(`[data-ke-ref="${f.ref}"]`).locator("xpath=ancestor::tr[1]").innerText();
        if (rowText.includes(s.entityId)) pick.push(f);
      }
    }
    if (pick.length === 0) throw new Error(`no result row exactly named "${s.entityName}"${s.entityId ? ` with Entity ID ${s.entityId}` : ""}`);
    if (pick.length > 1) throw new Error(`${pick.length} records are named "${s.entityName}"; give the Entity ID to choose one`);
    await ctx.actAndSettle(() => ctx.page.locator(`[data-ke-ref="${pick[0]!.ref}"]`).check());
    await ctx.note(`selected ${column} for ${s.entityName}${s.entityId ? ` (${s.entityId})` : ""}`);
  },
  async advance(ctx) { await ctx.clickButton(/^add to cart$/i); },
};

const cart: ScreenStep = {
  screen: NJ_STANDING_SCREENS.cart,
  paymentScreen: true,
  submitScreen: true,
  async fill(ctx) {
    const text = await ctx.page.locator("body").innerText();
    const m = /Cart \((\d+)\)/.exec(text);
    if (!m || m[1] !== "1") throw new Error(`cart should hold exactly 1 certificate, shows ${m ? m[1] : "none"}`);
    const method = ctx.client.njStoredPaymentMethod === "stored_echeck" ? "E-Check" : "Credit Card";
    // Choosing a type posts back and adds the portal admin fee lines the fee check needs.
    await ctx.actAndSettle(() => ctx.set("paymentType", method));
  },
  async advance(ctx) {
    await ctx.submit("Pay Now", () => ctx.clickButton(/^pay now$/i));
  },
};

export const njStandingAdapter: SiteAdapter = {
  site: "NJ",
  key: "nj-standing",
  complete: false,
  entryUrl: () => process.env.NJ_STANDING_URL ?? "https://www.njportal.com/dor/businessrecords/EntityDocs/StandingCerts.aspx",
  profileKey: (ctx) => (ctx.client.njAccountCredentialKey ? `nj:${ctx.client.clientCompanyId}` : null),
  credentialKey: (ctx) => ctx.client.njAccountCredentialKey ?? null,
  steps: [searchType, searchName, results, cart],
};
