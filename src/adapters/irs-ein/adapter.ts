import type { SiteAdapter } from "../types.js";
import { IRS_SCREENS } from "./intents.js";

/**
 * Placeholder until walk B. `complete: false` means the engine refuses any non-dry
 * run that includes an in-run EIN, and pre-flight blocks such filings with a clear reason.
 */
export const irsEinAdapter: SiteAdapter = {
  site: "IRS",
  key: "irs-ein",
  complete: false,
  entryUrl: () => process.env.IRS_EIN_URL ?? "https://sa.www4.irs.gov/applyein/",
  profileKey: () => null, // always a fresh context
  credentialKey: () => null,
  steps: Object.values(IRS_SCREENS).map((screen) => ({
    screen,
    async fill() { throw new Error("IRS EIN adapter is not mapped yet (walk B pending)"); },
    async advance() { /* unreachable */ },
  })),
};
