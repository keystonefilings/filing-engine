import type { Page } from "playwright";
import type { FilingRecord } from "../store/types.js";
import type { ClientCompanySettings, TenantSettings } from "../settings/schema.js";
import type { FieldDescriptor, ScreenIntents } from "../resolver/types.js";
import type { Credential } from "../settings/vault.js";
import type { FeeLine } from "../fees/table.js";

export interface RunValues {
  /** EIN obtained in this run (decision 1), entered into the state form when present. */
  ein?: string;
}

/** What a step gets from the engine. Filling goes through `set` so every value is matched by label, never by selector. */
export interface StepContext {
  page: Page;
  filing: FilingRecord;
  tenant: TenantSettings;
  client: ClientCompanySettings;
  values: RunValues;
  dryRun: boolean;
  credential: Credential | null;
  /** Fill the field matched to this intent. Throws if the intent was not matched and is required. */
  set(intentKey: string, value: string | boolean): Promise<void>;
  /** The live field an intent resolved to, if any. */
  field(intentKey: string): FieldDescriptor | undefined;
  /** Re-read the page (after a modal opened) and match the given intents; returns a scoped setter. */
  resolve(screen: ScreenIntents): Promise<{ set: StepContext["set"]; field: StepContext["field"]; fields: FieldDescriptor[] }>;
  /** Click the control whose label matches (buttons are matched by text). */
  clickButton(label: string | RegExp): Promise<void>;
  /** Record evidence with a note. */
  note(text: string): Promise<void>;
  /** Runs an action that may navigate or post back (same URL) and waits for the page to settle. */
  actAndSettle(action: () => Promise<void>): Promise<void>;
  /** Marks the moment before the irreversible click. Dry runs stop here; real runs write the submit intent. */
  submit(action: string, click: () => Promise<void>): Promise<void>;
  /** Expected fee lines for this filing (from the approved table). */
  expectedFees: FeeLine[];
  feeCapUsd?: number;
}

export interface ScreenStep {
  screen: ScreenIntents;
  /** After this screen the name has been checked; EIN sub-run may start (decision 1). */
  nameCheckGate?: boolean;
  /** Fee check runs on this screen before any submit (decision 5). */
  paymentScreen?: boolean;
  /** Where the final irreversible click happens (rule 6: only after approval; dry runs stop here). */
  submitScreen?: boolean;
  /** Whether this screen is expected right now; optional screens (e.g. MFA) return false to be skipped. */
  present?(ctx: StepContext): Promise<boolean>;
  fill(ctx: StepContext): Promise<void>;
  advance(ctx: StepContext): Promise<void>;
  /** Post-advance check (e.g. NJ bouncing back to Members). Throws to fail the run. */
  verify?(ctx: StepContext): Promise<void>;
}

export interface SiteAdapter {
  site: "NY" | "NJ" | "MO" | "IRS";
  key: string;
  /** False until the walk that maps the remaining screens is done; incomplete adapters only dry-run. */
  complete: boolean;
  entryUrl(ctx: Pick<StepContext, "filing" | "client" | "tenant">): string;
  /** Persistent profile key (ny.gov, client NJ account) or null for an ephemeral context. */
  profileKey(ctx: Pick<StepContext, "filing" | "client" | "tenant">): string | null;
  /** Vault key for the login this run uses, or null. */
  credentialKey(ctx: Pick<StepContext, "filing" | "client" | "tenant">): string | null;
  steps: ScreenStep[];
  /** After submit: download CP 575, formation documents, receipts. */
  collectArtifacts?(ctx: StepContext): Promise<{ kind: string; label: string; contentType: string; body: Buffer }[]>;
}

export class NameUnavailable extends Error {
  constructor(public readonly name: string, detail: string) { super(`name "${name}" not available: ${detail}`); }
}
