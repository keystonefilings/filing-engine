import type { SiteAdapter } from "./types.js";
import { njFormationAdapter } from "./nj-formation/adapter.js";
import { nyFormationAdapter } from "./ny-formation/adapter.js";
import { irsEinAdapter } from "./irs-ein/adapter.js";
import { njStandingAdapter } from "./nj-standing/adapter.js";
import { moFormationAdapter } from "./mo-formation/adapter.js";
import type { FilingRequest } from "../domain/filing.js";

export const ADAPTERS: Record<string, SiteAdapter> = {
  [njFormationAdapter.key]: njFormationAdapter,
  [nyFormationAdapter.key]: nyFormationAdapter,
  [irsEinAdapter.key]: irsEinAdapter,
  [njStandingAdapter.key]: njStandingAdapter,
  [moFormationAdapter.key]: moFormationAdapter,
};

/** Picks the state adapter for a filing; null when the filing type is not wired yet. */
export function adapterFor(req: FilingRequest): SiteAdapter | null {
  if (req.type === "formation") return req.state === "NJ" ? njFormationAdapter : req.state === "MO" ? moFormationAdapter : nyFormationAdapter;
  if (req.type === "standing_certificate" && req.state === "NJ") return njStandingAdapter;
  return null; // alternate_name, amendment, paper_upload: build order 5-7
}

export { irsEinAdapter, moFormationAdapter };
