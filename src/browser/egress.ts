/**
 * Per-portal network routing for the worker's browser.
 *
 * What a government portal checks is not whether an address is static but whether the
 * network looks like a person or a data center: from our cloud container the IRS EIN
 * assistant answers "Access Denied", NY DOS closes the connection and Missouri serves a
 * Cloudflare challenge, while NJ and Florida work from anywhere. So most sites go direct and
 * only the sites that refuse the worker's own network are sent out another connection (an
 * office line, or a host whose network the portal serves). `npm run probe-sites` shows which.
 *
 *   BROWSER_PROXY=http://proxy.internal:3128                 default route for every site (optional)
 *   SITE_PROXIES=IRS=http://user:pass@office:3128,NY=http://office:3128,NJ=direct
 *
 * A site listed in SITE_PROXIES overrides the default; "direct" means no proxy for that site.
 * Proxy credentials may be written into the URL; they are split out and never logged.
 */
export interface ProxyRoute { server: string; username?: string; password?: string }

export function parseProxy(url: string): ProxyRoute {
  const u = new URL(/^[a-z][a-z0-9+.-]*:\/\//i.test(url) ? url : `http://${url}`);
  const route: ProxyRoute = { server: `${u.protocol}//${u.host}` };
  if (u.username) route.username = decodeURIComponent(u.username);
  if (u.password) route.password = decodeURIComponent(u.password);
  return route;
}

export function parseSiteProxies(spec: string | null | undefined): Record<string, ProxyRoute | null> {
  const out: Record<string, ProxyRoute | null> = {};
  if (!spec) return out;
  const entries = spec.split(",").map((s) => s.trim()).filter(Boolean);
  entries.forEach((entry, i) => {
    const eq = entry.indexOf("=");
    // The entry may hold credentials, so the error names its position, not its text.
    if (eq < 1) throw new Error(`SITE_PROXIES entry ${i + 1} must look like SITE=url or SITE=direct`);
    const site = entry.slice(0, eq).trim().toUpperCase();
    const value = entry.slice(eq + 1).trim();
    out[site] = value.toLowerCase() === "direct" ? null : parseProxy(value);
  });
  return out;
}

/** The route for a site: its own entry if listed (null = direct), else the default. */
export function routeFor(site: string | undefined, defaultRoute: ProxyRoute | null, siteProxies: Record<string, ProxyRoute | null>): ProxyRoute | null {
  const key = site?.toUpperCase();
  if (key && Object.prototype.hasOwnProperty.call(siteProxies, key)) return siteProxies[key] ?? null;
  return defaultRoute;
}

/** Operator-facing description (host only, never credentials). */
export function describeRoute(route: ProxyRoute | null): string {
  return route ? `via ${route.server}` : "direct";
}
