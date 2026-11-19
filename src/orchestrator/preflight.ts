import type { FilingRecord, ApprovalRecord } from "../store/types.js";
import type { ClientCompanySettings, TenantSettings } from "../settings/schema.js";
import type { SiteAdapter } from "../adapters/types.js";
import type { Vault } from "../settings/vault.js";
import { IRS_HOURS } from "../adapters/irs-ein/intents.js";
import type { ApprovalService } from "../approvals/service.js";
import { expectedFees, FeeUnknownError } from "../fees/table.js";
import { njAccount, moAccount, flAccount, nyDrawdownAccount } from "../settings/accounts.js";

export interface PreflightResult { ok: boolean; blockers: string[]; warnings: string[] }

/** Decision 3: NY drawdown balance is read before approval and before the run. Implementation lands with walk C. */
export interface BalanceProvider {
  nyDrawdownBalanceUsd(accountRef: string): Promise<number | null>;
}
export const unknownBalanceProvider: BalanceProvider = { nyDrawdownBalanceUsd: async () => null };

/** Minutes until the IRS assistant closes, or null when it is closed now (published per-day windows). */
export function irsWindowMinutesRemaining(now: Date = new Date()): number | null {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: IRS_HOURS.timeZone, hour12: false, weekday: "short", hour: "2-digit", minute: "2-digit",
  }).formatToParts(now);
  const get = (t: string) => parts.find((p) => p.type === t)?.value ?? "";
  const day = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].indexOf(get("weekday"));
  const nowMin = (Number(get("hour")) % 24) * 60 + Number(get("minute"));
  const [open, close] = IRS_HOURS.windows[day]!;
  if (nowMin >= open && nowMin < close) return close - nowMin;
  // Yesterday's window may run past midnight (weekdays close at 1:00 a.m.).
  const [, prevClose] = IRS_HOURS.windows[(day + 6) % 7]!;
  if (prevClose > 1440 && nowMin + 1440 < prevClose) return prevClose - (nowMin + 1440);
  return null;
}

export async function preflight(input: {
  filing: FilingRecord;
  approval: ApprovalRecord | null;
  tenant: TenantSettings;
  client: ClientCompanySettings;
  adapter: SiteAdapter | null;
  einAdapter: SiteAdapter;
  approvals: ApprovalService;
  vault: Vault;
  balances: BalanceProvider;
  dryRun: boolean;
  now?: Date;
}): Promise<PreflightResult> {
  const b: string[] = [], w: string[] = [];
  const { filing, approval, tenant, client, adapter, dryRun } = input;
  const req = filing.request;

  if (!adapter) b.push(`no adapter wired for ${req.state}/${req.type} yet`);
  else if (!adapter.complete && !dryRun) b.push(`${adapter.key} is not fully mapped; only dry runs are allowed`);

  if (!dryRun) {
    if (!approval) b.push("no approval on file");
    else {
      const v = input.approvals.verifyForRun(filing, approval, tenant, client);
      if (!v.ok) b.push(v.reason);
    }
  }

  const einMode = req.ein?.mode ?? client.einMode;
  if (req.ein && einMode === "in_run") {
    const remaining = irsWindowMinutesRemaining(input.now);
    if (remaining === null) b.push("IRS EIN assistant is closed now (Mon-Fri 6am-1am, Sat 6am-9pm, Sun 6pm-midnight ET); in-run EIN cannot start");
    else if (remaining < IRS_HOURS.minMinutesRemaining) b.push(`only ${remaining} minutes left in the IRS window; need ${IRS_HOURS.minMinutesRemaining}`);
    if (!input.einAdapter.complete && !dryRun) b.push("IRS EIN adapter is not mapped yet (walk B); in-run EIN cannot run for real");
    if (!req.ein.responsibleParty) b.push("in-run EIN requires a responsible party");
  }

  try {
    if (req.type !== "ein_only") {
      expectedFees(req.state, req.type, {
        paymentMethod: req.state === "NJ" ? njAccount(tenant, client).feeMethod : req.state === "MO" ? moAccount(tenant, client).feeMethod : req.state === "FL" ? flAccount(tenant, client).feeMethod : undefined,
        certificateOfStanding: req.formation?.additionalCertificates.certificateOfStanding,
        certifiedCopy: req.formation?.additionalCertificates.certifiedCopy,
        entityType: req.standing?.entityType,
      });
    }
  } catch (e) {
    if (e instanceof FeeUnknownError) (dryRun ? w : b).push(e.message);
    else throw e;
  }

  if (adapter && !dryRun) {
    const credKey = adapter.credentialKey({ filing, client, tenant });
    if (credKey) {
      const cred = await input.vault.getCredential(credKey);
      if (!cred) b.push(`no credential in vault for ${credKey}`);
    } else if (adapter.site === "NJ") {
      b.push("no NJ login for this run: the service company has none set, or the firm pays with its own account (G1) and has none set");
    } else if (adapter.site === "MO") {
      b.push("no Missouri login for this run: the service company has none set, or the firm pays with its own account (G1) and has none set");
    }
  }

  if (req.state === "FL" && !dryRun) {
    const acct = flAccount(tenant, client);
    if (acct.paymentMethod === "sunbiz_account" && !acct.accountCredentialKey) {
      b.push("FL is set to pay by the prepaid Sunbiz E-file account, but no account is on file (service company's, or the firm's per G1)");
    }
    // Card payment is entered at the human tap; no stored card needed (decision 3).
  }

  if (req.state === "NY" && !dryRun) {
    const dd = nyDrawdownAccount(tenant, client);
    if (!dd) b.push("NY filings pay from a drawdown account, but the account in force (service company's, or the firm's per G1) is not set");
    else {
      const bal = await input.balances.nyDrawdownBalanceUsd(dd);
      if (bal === null) b.push("NY drawdown balance could not be read; refusing to start (no drafts, payment is the last step)");
      else if (approval && bal < approval.fees.reduce((s, f) => s + f.amountUsd, 0)) b.push(`NY drawdown balance $${bal} is below the approved fees`);
    }
  }

  return { ok: b.length === 0, blockers: b, warnings: w };
}
