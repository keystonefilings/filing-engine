import { nyDrawdownAccount } from "../../settings/accounts.js";
import { totalUsd } from "../../fees/table.js";
import type { ScreenIntents } from "../../resolver/types.js";
import type { ScreenStep, StepContext } from "../types.js";
import { copyCc } from "../copies.js";

/**
 * What every NY DOS On-Line Filing System run shares (docs/portal-maps/ny-dos-corporations.md):
 * the prepay deposit into the service company's draw-down account (Screen M, "Prepay step"), the
 * signed-in home page's links (Screen A), and the draw-down payment page each flow ends on
 * (Screens F, G4, H5, I5, J4, K3, L4: account, Payment Authorization, the FINAL button).
 */

export const money = (usd: number) => usd.toFixed(2);

/** Links are not form controls: click one by its text, or say which is missing. */
export async function clickLink(ctx: StepContext, name: RegExp, what: string) {
  const link = ctx.page.getByRole("link", { name }).first();
  if (!(await link.count())) throw new Error(`NY DOS: the "${what}" link is not on this page`);
  await link.click();
}

/** "Account Balance $1,234.56" (or "Balance $...") on the page, or null when it is not shown. */
export async function readBalance(ctx: StepContext): Promise<number | null> {
  const text = await ctx.page.locator("body").innerText();
  const m = /(?:account )?balance[^$\d\n]{0,40}\$?\s?([\d,]+\.\d{2})/i.exec(text);
  return m ? Number(m[1]!.replace(/,/g, "")) : null;
}

/** The deposit amount: the total the client approved, which the payment page is checked against later. */
export function approvedTotal(ctx: StepContext): number {
  const total = totalUsd(ctx.expectedFees);
  if (!(total > 0)) throw new Error("NY DOS: no approved fee total to deposit; the filing needs an approval with its fees");
  return total;
}

/** The draw-down account in force (the service company's, or the firm's own under answer G1), else the only one listed. */
export async function pickDrawdown(ctx: StepContext, set: StepContext["set"], field: StepContext["field"]) {
  const ref = nyDrawdownAccount(ctx.tenant, ctx.client);
  const f = field("drawdownAccount");
  const options = (f?.options ?? []).filter((o) => o.value && !/select/i.test(o.label));
  const chosen = ref ? options.find((o) => o.label.includes(ref) || o.value === ref) : options.length === 1 ? options[0] : undefined;
  if (!chosen) {
    throw new Error(ref
      ? `NY DOS: draw-down account "${ref}" is not in the list on this page`
      : `NY DOS: ${options.length} draw-down accounts are listed; name one in the NY settings (nyDrawdownAccountRef)`);
  }
  await set("drawdownAccount", chosen.label);
  return chosen.label;
}

/** Waits (bounded) for fields a choice reveals on the same page, then returns the page resolved fresh. */
export async function whenShown(ctx: StepContext, screen: ScreenIntents, keys: string[], after: string, timeoutMs = 15_000) {
  for (let waited = 0; ; waited += 500) {
    const r = await ctx.resolve(screen);
    if (keys.every((k) => r.field(k)?.visible)) return r;
    if (waited >= timeoutMs) throw new Error(`NY DOS ${screen.title}: ${keys.join(", ")} did not appear after ${after}`);
    await ctx.page.waitForTimeout(500);
  }
}

export const NY_REPLENISH: ScreenIntents = {
  screenKey: "ny.replenish",
  title: "Replenish DD Account",
  intents: [
    { key: "drawdownAccount", labels: ["Drawdown Accounts", "Drawdown Account"], kinds: ["select"], required: true, note: "the account named in the NY settings; with one listed, that one" },
    { key: "depositAmount", labels: ["Deposit Amount"], kinds: ["text", "number"], required: true },
    { key: "paymentAuthorization", labels: ["Payment Authorization", "authorize"], kinds: ["checkbox"], required: false, note: "STOP: ticked only on a live run, covered by the client's approval of this filing's fees" },
  ],
};

/** Any signed-in page: the menu (Replenish DD Account) is on every page. */
export const openReplenish: ScreenStep = {
  screen: { screenKey: "ny.menu", title: "DOS menu (signed in)", intents: [] },
  async fill() { /* nothing to enter */ },
  async advance(ctx) { await clickLink(ctx, /^replenish dd account$/i, "Replenish DD Account"); },
};

/** Screen M: fund the draw-down account with exactly this filing's approved total, then go Home. */
export const replenish: ScreenStep = {
  screen: NY_REPLENISH, // no card data here; Elavon's card page will be its own masked step
  async fill(ctx) {
    const total = approvedTotal(ctx);
    const account = await pickDrawdown(ctx, ctx.set, ctx.field);
    const before = await readBalance(ctx);
    await ctx.set("depositAmount", money(total));
    ctx.values.nyDepositUsd = money(total);
    if (before !== null) ctx.values.nyBalanceBeforeUsd = money(before);
    if (ctx.dryRun) {
      await ctx.note(`dry run: draw-down deposit of $${money(total)} into ${account} prepared, not authorized (balance $${before === null ? "not shown" : money(before)})`);
      return;
    }
    // A live deposit: tick Payment Authorization, Continue to Elavon, check the order amount to the
    // cent, enter the saved card from the payment vault, Submit Payment through the submit guard,
    // then confirm the balance rose by exactly the total. Not built: the card vault is undecided.
    throw new Error("NY DOS: live draw-down deposits are not built yet (the card vault for the account's NY state fees is an open decision); no deposit was made");
  },
  async advance(ctx) { await clickLink(ctx, /^home$/i, "Home"); },
};

/** Screen A, the service company's home page: the flow starts from one of its links. */
export function homeStep(screen: ScreenIntents, link: RegExp, what: string): ScreenStep {
  return {
    screen,
    async fill() { /* links only */ },
    async advance(ctx) { await clickLink(ctx, link, what); },
  };
}

/**
 * Checks the payment page against the deposit before the FINAL click: the deposit funded exactly
 * the approved total, and the balance shown covers it (a dry run made no deposit, so it notes the gap).
 */
export async function checkDrawdownCovers(ctx: StepContext) {
  const total = approvedTotal(ctx);
  if (ctx.values.nyDepositUsd && ctx.values.nyDepositUsd !== money(total)) {
    throw new Error(`NY DOS: the deposit ($${ctx.values.nyDepositUsd}) differs from the approved total ($${money(total)})`);
  }
  const balance = await readBalance(ctx);
  if (balance !== null && balance < total) {
    if (!ctx.dryRun) throw new Error(`NY DOS: draw-down balance $${money(balance)} does not cover the total $${money(total)}`);
    await ctx.note(`dry run: draw-down balance $${money(balance)} (no deposit was made) against the total $${money(total)}`);
  }
}

/** The payment page's fields after a record filing (Screens G4, H5, I5, J4, K3). */
export function recordPaymentScreen(screenKey: string, title: string): ScreenIntents {
  return {
    screenKey,
    title,
    intents: [
      { key: "drawdownAccount", labels: ["Drawdown Account", "Drawdown"], kinds: ["select"], required: true },
      { key: "customerReference", labels: ["Customer Reference Number"], kinds: ["text"], required: false, note: "seen on the certificate of status payment page (K)" },
      { key: "paymentAuthorization", labels: ["By checking this box I authorize", "Payment Authorization"], kinds: ["checkbox"], required: true, note: "STOP: ticked only inside the submit guard, on a live run" },
    ],
    knownUnused: ["Go Back", "Reset"],
    // What this filing ordered (copies, the number of documents) changes these lines and the
    // total; the filing fee itself stays in the drift snapshot, and the fee check covers them all.
    dynamicPrices: ["^plain cop", "^certified cop", "^total fee"],
  };
}

/**
 * The draw-down payment page that ends a record filing: pick the account, check the deposit
 * covers the approved total, then tick Payment Authorization and press Submit (FINAL) inside
 * the submit guard, so a dry run never ticks the box. The fee check runs on this page first.
 */
export function drawdownPaymentStep(screen: ScreenIntents, present?: ScreenStep["present"]): ScreenStep {
  return {
    screen,
    paymentScreen: true,
    submitScreen: true,
    ...(present ? { present } : {}),
    async fill(ctx) {
      await pickDrawdown(ctx, ctx.set, ctx.field);
      if (ctx.field("customerReference")) await ctx.set("customerReference", ctx.filing.id.slice(0, 40));
      await checkDrawdownCovers(ctx);
    },
    async advance(ctx) {
      await ctx.submit("Submit", async () => {
        await ctx.set("paymentAuthorization", true);
        await ctx.clickButton(/^submit$/i);
      });
    },
  };
}

/**
 * "Filer's Information" on the record filings (Screens G to I, the requester block of J and K):
 * prefilled from the service-company profile. The engine leaves what DOS filled in, types the
 * filing company's filer only into a required box DOS left empty, and puts the copy address (V28)
 * in Cc.
 */
export const FILER_SECTION = "Filer";
export const filerIntents = [
  { key: "requesterName", labels: ["Requester Name"], kinds: ["text" as const], required: true, section: FILER_SECTION, note: "prefilled from the service-company profile" },
  { key: "requesterCompany", labels: ["Company if applicable", "Company"], kinds: ["text" as const], required: false, section: FILER_SECTION },
  { key: "requesterAddress1", labels: ["Address", "Address 1", "Address Line 1"], kinds: ["text" as const], required: true, section: FILER_SECTION },
  { key: "requesterAddress2", labels: ["Address 2", "Address Line 2"], kinds: ["text" as const], required: false, section: FILER_SECTION },
  { key: "requesterCity", labels: ["City"], kinds: ["text" as const], required: true, section: FILER_SECTION },
  { key: "requesterState", labels: ["State"], kinds: ["select" as const, "text" as const], required: true, section: FILER_SECTION },
  { key: "requesterZip", labels: ["Postal Code", "Zip Code", "Zip"], kinds: ["text" as const], required: true, section: FILER_SECTION },
  { key: "requesterCountry", labels: ["Country"], kinds: ["select" as const, "text" as const], required: false, section: FILER_SECTION, note: "USA by default" },
  { key: "distributionEmail", labels: ["Distribution Email Address", "Distribution Email"], kinds: ["email" as const, "text" as const], required: true, section: FILER_SECTION, note: "from the profile" },
  { key: "ccEmail", labels: ["Cc Email Address", "Cc Email"], kinds: ["email" as const, "text" as const], required: false, section: FILER_SECTION },
];

export async function fillFilerInformation(ctx: StepContext) {
  const filer = ctx.tenant.filer;
  const empty = (key: string) => { const f = ctx.field(key); return !!f && !(f.value ?? "").trim(); };
  const fillIfEmpty = async (key: string, value: string | undefined, what: string) => {
    if (!empty(key)) return;
    if (!value) throw new Error(`NY DOS Filer's Information: ${what} is empty on the page and the filing company has no filer ${what} on file`);
    await ctx.set(key, value);
  };
  await fillIfEmpty("requesterName", filer?.name, "name");
  await fillIfEmpty("requesterAddress1", filer?.address?.street1, "address");
  await fillIfEmpty("requesterCity", filer?.address?.city, "city");
  await fillIfEmpty("requesterState", filer?.address?.state, "state");
  await fillIfEmpty("requesterZip", filer?.address?.zip, "postal code");
  if (empty("distributionEmail")) throw new Error("NY DOS Filer's Information: the distribution email is empty; it comes from the service-company profile");
  const cc = copyCc(ctx);
  if (cc) await ctx.set("ccEmail", cc);
}

/** The entity must be found by an exact DOS ID and name match (Screens G1, H1, I1). */
export const ENTITY_SEARCH_INTENTS = [
  { key: "dosId", labels: ["DOS ID"], kinds: ["text" as const], required: true },
  { key: "entityName", labels: ["Entity Name"], kinds: ["text" as const], required: true, note: "exactly as on the DOS records" },
];

/** After the search: DOS's "not an exact match" message stops the run with what was searched. */
export async function verifyExactMatch(ctx: StepContext, dosId: string, name: string) {
  const text = (await ctx.page.locator("body").innerText()).replace(/\s+/g, " ");
  if (/not an exact match|cannot be found/i.test(text)) {
    throw new Error(`NY DOS found no entity matching DOS ID ${dosId} and the name "${name}" exactly; check both against the DOS entity search`);
  }
}

/** The certify box, typed signature and capacity of signer (Screens G2, H3, I3; STOP). */
export const ATTESTATION_SECTION = "Attestation";
export const attestationIntents = [
  { key: "certify", labels: ["I certify that I have read the above statements"], kinds: ["checkbox" as const], required: true, section: ATTESTATION_SECTION, note: "STOP: under the client's approval of this filing" },
  { key: "signature", labels: ["Signature", "My typed name below constitutes my signature"], kinds: ["text" as const], required: true, section: ATTESTATION_SECTION, note: "STOP: the signer's typed name" },
  { key: "capacity", labels: ["Capacity of Signer"], kinds: ["radio" as const, "select" as const], required: true, section: ATTESTATION_SECTION, note: "Member / Manager / Authorized Person" },
];

const CAPACITY_LABEL = { member: "Member", manager: "Manager", authorized_person: "Authorized Person" } as const;

export async function fillAttestation(ctx: StepContext, signer: { name: string; capacity: keyof typeof CAPACITY_LABEL }) {
  // STOP fields: the certify box and the typed name, under the client's approval of this filing.
  await ctx.set("certify", true);
  await ctx.set("signature", signer.name);
  await ctx.set("capacity", CAPACITY_LABEL[signer.capacity]);
}

/** The "Plain Copy" choice, wherever the flow shows it; its place in Screens G to I was not visible in the recording. */
export async function tickPlainCopyIfAsked(ctx: StepContext, wanted: boolean) {
  if (!wanted) return;
  if (!ctx.field("plainCopy")) throw new Error("NY DOS: a plain copy was asked for, but the Plain Copy choice is not on this screen (its place in this flow is not mapped yet)");
  await ctx.set("plainCopy", true);
}

/** The preview / validation page shows a transaction number DOS keeps 3 business days; note it for reconciliation. */
export async function noteTransactionNumber(ctx: StepContext) {
  const text = (await ctx.page.locator("body").innerText()).replace(/\s+/g, " ");
  const m = /transaction number:?\s*([A-Za-z0-9-]+)/i.exec(text);
  await ctx.note(m ? `DOS transaction number ${m[1]} (kept 3 business days; check Retrieve a Saved Transaction before refiling)` : "no transaction number shown on the preview");
}
