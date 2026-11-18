import type { SiteAdapter, StepContext } from "../types.js";
import { MO_SCREENS } from "./intents.js";
import { moAccount } from "../../settings/accounts.js";

/**
 * Missouri domestic LLC formation, mapped from Missouri's step-by-step online guide
 * (2026-11-18). NOT yet walked on the live site: the Missouri online system sits behind a
 * Cloudflare challenge that refuses data-center IPs, so the walk runs from the fixed-IP
 * machine. complete=false: real runs are refused and dry runs stop before the cart payment.
 *
 * Screen order: login -> dashboard "Create LLC" -> type (LLC + domestic) -> details
 * (name, duration, management, purpose) -> registered agent (MO address) -> organizers
 * (1-5) -> principal office -> review (acknowledge) -> signor (agreement) -> shopping cart
 * -> payment (credit card / eCheck). Fee: $50 online (vs $105 paper).
 */

const STEP_KEYS = [
  "login", "dashboard", "entityType", "details", "registeredAgent",
  "organizers", "principalOffice", "review", "signer", "cart",
] as const;

export const moFormationAdapter: SiteAdapter = {
  site: "MO",
  key: "mo-formation",
  complete: false,
  entryUrl: () => process.env.MO_FORMATION_URL ?? "https://bsd.sos.mo.gov/",
  profileKey: (ctx) => moAccount(ctx.tenant, ctx.client).profileKey,
  credentialKey: (ctx) => moAccount(ctx.tenant, ctx.client).credentialKey,
  steps: STEP_KEYS.map((key) => ({
    screen: MO_SCREENS[key],
    paymentScreen: key === "cart",
    submitScreen: key === "cart",
    async fill() {
      throw new Error("Missouri formation adapter is not mapped on the live site yet (fixed-IP walk pending)");
    },
    async advance(ctx: StepContext) {
      if (key === "cart") await ctx.submit("Payment", async () => { /* unreachable until mapped */ });
    },
  })),
};
