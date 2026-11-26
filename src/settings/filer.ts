import type { ClientCompanySettings, TenantSettings } from "./schema.js";

/**
 * Who "the filing company" is in the authorizations a client grants (confirmed Nov 26): on a
 * partner firm's pages, the firm filing through the platform; on a firm an enterprise subscriber
 * set up (white-label), that subscriber under its own name.
 */
export function filerNameFor(client: Pick<ClientCompanySettings, "name" | "portal" | "partner">, tenant: Pick<TenantSettings, "name" | "branding"> | null, platformName: string): string {
  if (client.partner) return `${client.portal?.displayName || client.name}, filing through ${platformName}`;
  return tenant?.branding.displayName || tenant?.name || client.portal?.displayName || client.name;
}
