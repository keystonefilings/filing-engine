import { renderName, hasLlcIndicator } from "../../domain/name.js";
import type { ScreenStep, SiteAdapter, StepContext } from "../types.js";
import { FL_SCREENS } from "./intents.js";
import { flAccount } from "../../settings/accounts.js";

/**
 * Florida domestic LLC formation on Sunbiz, from the live walk of 2026-11-19.
 * No login to file; the final Payment Page offers a credit card or the prepaid Sunbiz
 * E-file account. complete:false: a dry run stops before the final payment submit.
 *
 * Note: Florida filings are reviewed by a document examiner (not instant), and Sunbiz
 * says not to apply for an EIN until the document is officially filed, so an in-run EIN
 * is refused for Florida (validation); the EIN runs after acceptance.
 */

function formation(ctx: StepContext) {
  const f = ctx.filing.request.formation;
  if (!f) throw new Error("formation details missing");
  return f;
}

const disclaimer: ScreenStep = {
  screen: FL_SCREENS.disclaimer,
  async fill(ctx) { await ctx.set("disclaimer", true); },
  async advance(ctx) { await ctx.clickButton(/^start new filing$/i); },
};

const form: ScreenStep = {
  screen: FL_SCREENS.form,
  nameCheckGate: true, // FL has no pre-run availability check; the examiner decides after submission
  async fill(ctx) {
    const f = formation(ctx);
    const name = renderName(f.name, "FL").nameField;
    if (!hasLlcIndicator(name)) throw new Error("FL LLC name needs an LLC indicator");
    await ctx.set("name", name);
    if (f.additionalCertificates.certificateOfStanding) await ctx.set("certificateOfStatus", true);
    if (f.additionalCertificates.certifiedCopy) await ctx.set("certifiedCopy", true);
    if (f.effectiveDate === "specific" && f.effectiveDateValue) {
      const [y, m, d] = f.effectiveDateValue.split("-");
      await ctx.set("effDateMonth", m!); await ctx.set("effDateDay", d!); await ctx.set("effDateYear", y!);
    }
    const a = f.mainBusinessAddress;
    if (!a) throw new Error("FL requires the principal place of business address");
    await ctx.set("princStreet1", a.street1);
    if (a.street2) await ctx.set("princStreet2", a.street2);
    await ctx.set("princCity", a.city);
    await ctx.set("princState", a.state);
    await ctx.set("princZip", a.zip);
    await ctx.set("princCountry", "US");
    await ctx.set("mailSame", true); // mailing = principal unless a separate one is given
    const agent = f.registeredAgent ?? ctx.client.registeredAgent;
    if (!agent?.address) throw new Error("FL requires a registered agent with a Florida address");
    if (agent.address.state !== "FL") throw new Error("FL registered agent must have a Florida address");
    // Person name if it parses to first/last, else treat the whole as the agent name's last field.
    const parts = agent.name.trim().split(/\s+/);
    if (parts.length >= 2) { await ctx.set("raFirstName", parts[0]!); await ctx.set("raLastName", parts.slice(1).join(" ")); }
    else await ctx.set("raLastName", agent.name);
    await ctx.set("raStreet1", agent.address.street1);
    if (agent.address.street2) await ctx.set("raStreet2", agent.address.street2);
    await ctx.set("raCity", agent.address.city);
    await ctx.set("raZip", agent.address.zip);
    await ctx.set("raSignature", agent.name);
    if (f.purpose) await ctx.set("purpose", f.purpose.slice(0, 240));
    const r = ctx.filing.request;
    await ctx.set("correspondenceName", `${r.contact.firstName} ${r.contact.lastName}`);
    await ctx.set("correspondenceEmail", r.contact.email);
    await ctx.set("correspondenceEmailConfirm", r.contact.email);
    const signer = f.signers[0] ?? f.members[0] ?? ctx.client.defaultSigner;
    await ctx.set("signature", signer?.name ?? agent.name);
    // Authorized persons (off1..off6) are optional; the engine fills them by index when present.
    const people = f.authorizedPersons.length ? f.authorizedPersons : [];
    for (const [i, person] of people.entries()) {
      const n = i + 1;
      await ctx.setByName(`off${n}_name_title`, person.title);
      if (person.entityName) await ctx.setByName(`off${n}_name_corp_name`, person.entityName);
      else if (person.name) {
        const p = person.name.trim().split(/\s+/);
        await ctx.setByName(`off${n}_name_first_name`, p[0] ?? "");
        await ctx.setByName(`off${n}_name_last_name`, p.slice(1).join(" ") || (p[0] ?? ""));
      }
      if (person.address) {
        await ctx.setByName(`off${n}_name_addr1`, person.address.street1);
        await ctx.setByName(`off${n}_name_city`, person.address.city);
        await ctx.setByName(`off${n}_name_st`, person.address.state);
        await ctx.setByName(`off${n}_name_zip`, person.address.zip);
      }
    }
  },
  async advance(ctx) { await ctx.clickButton(/^continue$/i); },
};

const review: ScreenStep = {
  screen: FL_SCREENS.review,
  async fill(ctx) {
    const text = (await ctx.page.locator("body").innerText()).toUpperCase();
    if (!text.includes(renderName(formation(ctx).name, "FL").nameField.toUpperCase())) throw new Error("FL review does not show the entity name");
    await ctx.note("review page reached");
  },
  async advance(ctx) { await ctx.actAndSettle(() => ctx.clickButton(/^continue$/i)); },
};

const summary: ScreenStep = {
  screen: FL_SCREENS.summary,
  async fill(ctx) {
    const m = /Document Tracking #:\s*(\d+)/.exec(await ctx.page.locator("body").innerText());
    if (m) await ctx.note(`tracking number ${m[1]}`);
  },
  async advance(ctx) { await ctx.actAndSettle(() => ctx.clickButton(/^continue$/i)); },
};

const payment: ScreenStep = {
  screen: FL_SCREENS.payment,
  paymentScreen: true,
  submitScreen: true,
  async fill(ctx) {
    const acct = flAccount(ctx.tenant, ctx.client);
    if (acct.paymentMethod === "sunbiz_account") {
      if (!ctx.credential?.username) throw new Error("FL Sunbiz E-file account payment chosen but no account credential in the vault");
      await ctx.set("accountNumber", ctx.credential.username);
      if (ctx.credential.password) await ctx.set("accountPassword", ctx.credential.password);
      await ctx.set("accountEmail", ctx.filing.request.contact.email);
    }
    await ctx.note(`payment page reached (method: ${acct.paymentMethod})`);
  },
  async advance(ctx) {
    const acct = flAccount(ctx.tenant, ctx.client);
    const button = acct.paymentMethod === "sunbiz_account" ? /^sunbiz e-file account payment$/i : /^credit card payment$/i;
    await ctx.submit(acct.paymentMethod === "sunbiz_account" ? "Sunbiz E-file Account Payment" : "Credit Card Payment", () => ctx.clickButton(button));
  },
};

export const flFormationAdapter: SiteAdapter = {
  site: "FL",
  key: "fl-formation",
  complete: false,
  entryUrl: () => process.env.FL_FORMATION_URL ?? "https://efile.sunbiz.org/llc_file.html",
  profileKey: () => null, // FL needs no login; ephemeral context
  credentialKey: (ctx) => flAccount(ctx.tenant, ctx.client).accountCredentialKey,
  steps: [disclaimer, form, review, summary, payment],
};
