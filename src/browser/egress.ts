/**
 * Per-portal network routing for the worker's browser.
 *
 * What a government portal checks is not whether an address is static but whether the
 * network looks like a person or a data center: from our cloud container the IRS EIN
 * assistant answers "Access Denied", NY DOS closes the connection and Missouri serves a
 * Cloudflare challenge, while NJ and Florida work from anywhere. So most sites go direct and
 * only the sites that refuse the worker's own network are sent out another way: a proxy (an
 * office line), or a Steel hosted browser (browser/steel.ts) whose network the portal serves.
 * `npm run probe-sites` shows which.
 *
 *   BROWSER_PROXY=http://proxy.internal:3128                 default route for every site (optional)
 *   SITE_PROXIES=IRS=steel,NY=steel,MO=http://user:pass@office:3128,NJ=direct
 *
 * A site listed in SITE_PROXIES overrides the default. "direct" means this machine's own
 * browser with no proxy; "steel" means a plain Steel session in Steel's cloud. Proxy
 * credentials may be written into the URL; they are split out and never logged.
 */
export interface ProxyRoute { server: string; username?: string; password?: string }
/** The site's browser runs in Steel's cloud instead of on this machine. */
export interface SteelRoute { steel: true }
export const STEEL_ROUTE: SteelRoute = Object.freeze({ steel: true as const });
/** null = this machine's browser, direct. */
export type Route = ProxyRoute | SteelRoute | null;

export function isSteel(route: Route | undefined): route is SteelRoute {
  return !!route && (route as SteelRoute).steel === true;
}

/** "direct", "steel", or a proxy URL. */
export function parseRoute(value: string): Route {
  const v = value.trim();
  if (v.toLowerCase() === "direct") return null;
  if (v.toLowerCase() === "steel") return STEEL_ROUTE;
  return parseProxy(v);
}

export function parseProxy(url: string): ProxyRoute {
  const u = new URL(/^[a-z][a-z0-9+.-]*:\/\//i.test(url) ? url : `http://${url}`);
  const route: ProxyRoute = { server: `${u.protocol}//${u.host}` };
  if (u.username) route.username = decodeURIComponent(u.username);
  if (u.password) route.password = decodeURIComponent(u.password);
  return route;
}

export function parseSiteProxies(spec: string | null | undefined): Record<string, Route> {
  const out: Record<string, Route> = {};
  if (!spec) return out;
  const entries = spec.split(",").map((s) => s.trim()).filter(Boolean);
  entries.forEach((entry, i) => {
    const eq = entry.indexOf("=");
    // The entry may hold credentials, so the error names its position, not its text.
    if (eq < 1) throw new Error(`SITE_PROXIES entry ${i + 1} must look like SITE=url, SITE=steel or SITE=direct`);
    const site = entry.slice(0, eq).trim().toUpperCase();
    out[site] = parseRoute(entry.slice(eq + 1));
  });
  return out;
}

/** The route for a site: its own entry if listed (null = direct), else the default. */
export function routeFor(site: string | undefined, defaultRoute: Route, siteProxies: Record<string, Route>): Route {
  const key = site?.toUpperCase();
  if (key && Object.prototype.hasOwnProperty.call(siteProxies, key)) return siteProxies[key] ?? null;
  return defaultRoute;
}

/** Operator-facing description (host only, never credentials). */
export function describeRoute(route: Route): string {
  if (isSteel(route)) return "via Steel";
  return route ? `via ${route.server}` : "direct";
}

/** STEEL_PROFILES="nygov=<profile id>,ny:keystone=<profile id>": saved Steel sign-ins by profile key. */
export function parseSteelProfiles(spec: string | null | undefined): Record<string, string> {
  const out: Record<string, string> = {};
  for (const [i, entry] of (spec ?? "").split(",").map((s) => s.trim()).filter(Boolean).entries()) {
    const eq = entry.indexOf("=");
    if (eq < 1 || eq === entry.length - 1) throw new Error(`STEEL_PROFILES entry ${i + 1} must look like profileKey=profileId`);
    out[entry.slice(0, eq).trim()] = entry.slice(eq + 1).trim();
  }
  return out;
}
