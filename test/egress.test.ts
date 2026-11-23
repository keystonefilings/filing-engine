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

import { classify } from "../tools/probe-sites.js";
import { detectChallenge } from "../src/browser/harness.js";

describe("challenge recognition", () => {
  it("treats JavaScript-check pages as not-yet-reachable, and the real page as ok", () => {
    expect(classify(200, "", "Please enable JavaScript to view the page content. Your support ID is: 1234567890")).toBe("blocked");
    expect(classify(200, "Just a moment...", "")).toBe("blocked");
    expect(classify(200, "On-Line Filing", "An official website of New York State")).toBe("ok");
    expect(classify(403, "Access Denied", "")).toBe("blocked");
  });

  it("the engine stops on the same interstitials", async () => {
    const page = (title: string, body: string) => ({ title: async () => title, locator: () => ({ innerText: async () => body }) }) as never;
    expect(await detectChallenge(page("Just a moment...", ""))).toBe("just a moment");
    expect(await detectChallenge(page("", "Please enable JavaScript to view the page content. Your support ID is: 42"))).not.toBeNull();
    expect(await detectChallenge(page("On-Line Filing", "An official website of New York State"))).toBeNull();
  });
});

import { waitOutJsCheck } from "../src/browser/harness.js";

describe("JavaScript checks", () => {
  function scripted(titles: string[]) {
    let i = 0, waits = 0;
    const page = {
      title: async () => titles[Math.min(i++, titles.length - 1)]!,
      locator: () => ({ innerText: async () => "" }),
      waitForTimeout: async () => { waits++; },
    } as never;
    return { page, waits: () => waits };
  }
  it("waits for a JavaScript check to clear on its own", async () => {
    const p = scripted(["Just a moment...", "Just a moment...", "Missouri Business Filings"]);
    expect(await waitOutJsCheck(p.page)).toBeNull();
    expect(p.waits()).toBe(2);
  });
  it("stops at once on a hard block (nothing is bypassed)", async () => {
    const p = scripted(["Access Denied"]);
    expect(await waitOutJsCheck(p.page)).toBe("access denied");
    expect(p.waits()).toBe(0);
  });
  it("gives up when a check does not clear", async () => {
    const p = scripted(["Just a moment..."]);
    expect(await waitOutJsCheck(p.page, 3000)).toBe("just a moment");
    expect(p.waits()).toBe(3);
  });
});
