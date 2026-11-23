import { isSteel, parseRoute, routeFor, type Route } from "./egress.js";

export interface BrowserSetup {
  /** Sites the engine files on (the adapters' sites). */
  sites: string[];
  browserProxy: string | null;
  siteProxies: Record<string, Route>;
  /** The image has no local browser (Dockerfile target "steel" sets BROWSERS=steel-only). */
  steelOnly: boolean;
  production: boolean;
  steelKeySet: boolean;
}

/**
 * Settings that would make every run on some site fail later, found when the worker starts
 * instead. Empty when the setup is consistent.
 */
export function browserSetupProblems(s: BrowserSetup): string[] {
  const def = s.browserProxy ? parseRoute(s.browserProxy) : null;
  const sites = [...new Set(s.sites.map((x) => x.toUpperCase()))].sort();
  const onSteel = sites.filter((site) => isSteel(routeFor(site, def, s.siteProxies)));
  const local = sites.filter((site) => !onSteel.includes(site));
  const problems: string[] = [];
  if (s.steelOnly && local.length) {
    problems.push(`This image has no local browser, but ${local.join(", ")} would need one: route every site to Steel (BROWSER_PROXY=steel, and no SITE_PROXIES entry other than steel) or use the full image`);
  }
  if (s.production && onSteel.length && !s.steelKeySet) {
    problems.push(`${onSteel.join(", ")} route to Steel but STEEL_API_KEY is not set`);
  }
  return problems;
}
