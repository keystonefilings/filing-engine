import type { SupportingDocumentKind } from "../documents/supporting.js";
import type { Page } from "playwright";
import type { FilingRecord } from "../store/types.js";
import type { ClientCompanySettings, TenantSettings } from "../settings/schema.js";
import type { FieldDescriptor, ScreenIntents } from "../resolver/types.js";
import type { Credential } from "../settings/vault.js";
import type { FeeLine } from "../fees/table.js";

export interface RunValues {
  /** EIN obtained in this run (decision 1), entered into the state form when present. */
  ein?: string;
  /** NY DOS prepay: the draw-down deposit this run prepared (dry run) or made, and the balance before it. */
  nyDepositUsd?: string;
  nyBalanceBeforeUsd?: string;
}

/** What a step gets from the engine. Filling goes through `set` so every value is matched by label, never by selector. */
export interface StepContext {
  /**
   * V18: the cards to try at a state's payment screen, in order (the filing's card, then the
   * backup), read from the card vault only when called. Absent when no card vault is set up.
   */
  paymentCards?: () => Promise<{ label: string; last4?: string; number: string; expMonth: number; expYear: number; cvc?: string }[]>;
  page: Page;
  filing: FilingRecord;
  tenant: TenantSettings;
  client: ClientCompanySettings;
  values: RunValues;
  dryRun: boolean;
  credential: Credential | null;
  /** Fill the field matched to this intent. Throws if the intent was not matched and is required. */
  set(intentKey: string, value: string | boolean): Promise<void>;
  /** Fill the live field whose HTML name attribute equals `name` (for repeated fields a label cannot tell apart). */
  setByName(name: string, value: string | boolean): Promise<void>;
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
  /**
   * The saved signature image for a form, or why it can't be used. Opens it only on a real run of a
   * filing its client approved, unchanged since (src/signatures/apply.ts); a dry run always gets no.
   */
  signatureForForm(signatureId: string | undefined, signerName: string): Promise<{ ok: true; png: Buffer } | { ok: false; reason: string }>;
  /** A supporting document this filing's client company uploaded (documents/supporting.ts), or why it can't be used. */
  supportingDocument(id: string, kind: SupportingDocumentKind): Promise<{ ok: true; body: Buffer } | { ok: false; reason: string }>;
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
  /**
   * What the payment screen shows. "cart" (default): the charge lines and/or a payable total,
   * which must reconcile with the approval. "price_list": a schedule of prices for every option
   * and no payable total (NJ formation); the approved lines must be listed, but the charge
   * cannot be verified there, so only dry runs may continue past it.
   */
  feeDisplay?: "cart" | "price_list";
  /** Where the final irreversible click happens (rule 6: only after approval; dry runs stop here). */
  submitScreen?: boolean;
  /** The review/summary screen. In beta, with the tenant's review gate on, the engine
   *  screenshots this screen and stops for admin review before proceeding to submit. */
  reviewScreen?: boolean;
  /** The screen shows or takes an SSN/ITIN: its screenshots are masked and its DOM snapshots
   *  stripped of values, so the number never lands in an artifact. */
  sensitive?: boolean;
  /** Whether this screen is expected right now; optional screens (e.g. MFA) return false to be skipped. */
  present?(ctx: StepContext): Promise<boolean>;
  fill(ctx: StepContext): Promise<void>;
  advance(ctx: StepContext): Promise<void>;
  /** Post-advance check (e.g. NJ bouncing back to Members). Throws to fail the run. */
  verify?(ctx: StepContext): Promise<void>;
}

export interface SiteAdapter {
  site: "NY" | "NJ" | "MO" | "FL" | "IRS";
  key: string;
  /** False until the walk that maps the remaining screens is done; incomplete adapters only dry-run. */
  complete: boolean;
  /**
   * V18: the state's checkout takes a card typed per filing (NJ, FL). A live run then starts only
   * once the card's owner has given the security code for the hour (payments/card-codes.ts).
   */
  paysWithCard?: boolean;
  entryUrl(ctx: Pick<StepContext, "filing" | "client" | "tenant">): string;
  /** Persistent profile key (ny.gov, client NJ account) or null for an ephemeral context. */
  profileKey(ctx: Pick<StepContext, "filing" | "client" | "tenant">): string | null;
  /** Vault key for the login this run uses, or null. */
  credentialKey(ctx: Pick<StepContext, "filing" | "client" | "tenant">): string | null;
  steps: ScreenStep[];
  /**
   * After the irreversible click: read evidence that the portal took the filing (confirmation
   * number, receipt, assigned EIN). Return null when it is not there. Until this returns
   * evidence the submit intent stays open; an adapter without it can never complete a live run.
   */
  confirmSubmission?(ctx: StepContext): Promise<SubmissionEvidence | null>;
  /** After submit: download CP 575, formation documents, receipts. */
  collectArtifacts?(ctx: StepContext): Promise<{ kind: string; label: string; contentType: string; body: Buffer }[]>;
}

export interface SubmissionEvidence {
  /** Confirmation number, EIN, or other reference the portal issued. */
  reference?: string;
  /** What was read, for the run record. */
  detail: string;
}

/** The value a dry run carries in place of an EIN it never applied for. Never stored, never reused. */
export const PLACEHOLDER_EIN = "00-0000000";

/** An EIN the IRS actually issued for this filing (not missing, not the dry-run placeholder). */
export function isIssuedEin(ein: string | undefined | null): ein is string {
  return !!ein && ein !== PLACEHOLDER_EIN;
}

export class NameUnavailable extends Error {
  constructor(public readonly name: string, detail: string) { super(`name "${name}" not available: ${detail}`); }
}
