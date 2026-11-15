import { canonicalHash } from "../approvals/hash.js";
import type { ClientCompanySettings, TenantSettings } from "./schema.js";

/**
 * Decision 2: the approval binds to the settings as they were when the client
 * approved. Settings are still read fresh at run start (requirement 7), but if they
 * no longer hash to the snapshot the run is blocked and a new approval is needed.
 */
export interface SettingsSnapshot {
  tenant: TenantSettings;
  client: ClientCompanySettings;
  takenAt: string;
  hash: string;
}

export function takeSettingsSnapshot(tenant: TenantSettings, client: ClientCompanySettings): SettingsSnapshot {
  const hash = canonicalHash({ tenant, client });
  return { tenant, client, takenAt: new Date().toISOString(), hash };
}

export function settingsMatchSnapshot(
  snapshot: SettingsSnapshot,
  tenant: TenantSettings,
  client: ClientCompanySettings,
): boolean {
  return canonicalHash({ tenant, client }) === snapshot.hash;
}
