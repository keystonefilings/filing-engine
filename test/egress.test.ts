import { describe, it, expect } from "vitest";
import { describeRoute, parseProxy, parseSiteProxies, routeFor } from "../src/browser/egress.js";
import { BrowserHarness } from "../src/browser/harness.js";

describe("per-portal network routing", () => {
  it("parses proxy URLs, defaulting the scheme and splitting out credentials", () => {
    expect(parseProxy("office.internal:3128")).toEqual({ server: "http://office.internal:3128" });
    expect(parseProxy("http://kf:p%40ss@office.internal:3128")).toEqual({ server: "http://office.internal:3128", username: "kf", password: "p@ss" });
    expect(parseProxy("socks5://office.internal:1080")).toEqual({ server: "socks5://office.internal:1080" });
  });

  it("parses SITE_PROXIES, including direct overrides", () => {
    const routes = parseSiteProxies(" IRS=http://office:3128, ny=http://office:3128 ,NJ=direct");
    expect(routes.IRS).toEqual({ server: "http://office:3128" });
    expect(routes.NY).toEqual({ server: "http://office:3128" });
    expect(routes.NJ).toBeNull();
    expect(parseSiteProxies(undefined)).toEqual({});
  });

  it("never echoes a malformed entry (it may hold credentials) in the error", () => {
    expect(() => parseSiteProxies("IRS=http://a:1,http://kf:secret@office:3128")).toThrow(/entry 2 must look like/);
    try { parseSiteProxies("http://kf:secret@office:3128"); } catch (e) { expect((e as Error).message).not.toContain("secret"); }
  });

  it("routes a listed site its own way, an unlisted site by the default, and direct when told", () => {
    const def = { server: "http://default:3128" };
    const sites = parseSiteProxies("IRS=http://office:3128,NJ=direct");
    expect(routeFor("IRS", def, sites)).toEqual({ server: "http://office:3128" });
    expect(routeFor("irs", def, sites)).toEqual({ server: "http://office:3128" });
    expect(routeFor("NJ", def, sites)).toBeNull();
    expect(routeFor("FL", def, sites)).toEqual(def);
    expect(routeFor("FL", null, sites)).toBeNull();
    expect(describeRoute(routeFor("IRS", def, sites))).toBe("via http://office:3128");
    expect(describeRoute(null)).toBe("direct");
  });

  it("the harness picks each site's route from its config", () => {
    const h = new BrowserHarness({ profileDir: "var/test-profiles", siteProxies: parseSiteProxies("IRS=http://office:3128,NY=http://office:3128") });
    expect(h.routeFor("IRS")).toEqual({ server: "http://office:3128" });
    expect(h.routeFor("NJ")).toBeNull();
    expect(h.routeFor(undefined)).toBeNull();
  });
});
