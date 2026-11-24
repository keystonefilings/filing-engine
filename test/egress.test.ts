import { describe, it, expect } from "vitest";
import { describeRoute, isSteel, parseProxy, parseSiteProxies, parseSteelProfiles, routeFor, STEEL_ROUTE } from "../src/browser/egress.js";
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

  it("routes a site to a Steel hosted browser with \"steel\", per site or by default", () => {
    const sites = parseSiteProxies("IRS=steel,NY=Steel,MO=http://office:3128,NJ=direct");
    expect(isSteel(sites.IRS)).toBe(true);
    expect(isSteel(sites.NY)).toBe(true);
    expect(sites.MO).toEqual({ server: "http://office:3128" });
    expect(describeRoute(routeFor("IRS", null, sites))).toBe("via Steel");
    expect(isSteel(routeFor("FL", STEEL_ROUTE, sites))).toBe(true); // BROWSER_PROXY=steel
    expect(routeFor("NJ", STEEL_ROUTE, sites)).toBeNull();
    const h = new BrowserHarness({ profileDir: "var/test-profiles", proxyServer: "steel", siteProxies: parseSiteProxies("NJ=direct") });
    expect(describeRoute(h.routeFor("IRS"))).toBe("via Steel");
    expect(describeRoute(h.routeFor("NJ"))).toBe("direct");
  });

  it("parses saved Steel sign-ins by profile key, without echoing a bad entry", () => {
    expect(parseSteelProfiles("nygov=prof_1, ny:keystone=prof_2")).toEqual({ nygov: "prof_1", "ny:keystone": "prof_2" });
    expect(parseSteelProfiles(undefined)).toEqual({});
    expect(() => parseSteelProfiles("nygov=prof_1,oops")).toThrow(/entry 2 must look like profileKey=profileId/);
  });

  it("the harness picks each site's route from its config", () => {
    const h = new BrowserHarness({ profileDir: "var/test-profiles", siteProxies: parseSiteProxies("IRS=http://office:3128,NY=http://office:3128") });
    expect(h.routeFor("IRS")).toEqual({ server: "http://office:3128" });
    expect(h.routeFor("NJ")).toBeNull();
    expect(h.routeFor(undefined)).toBeNull();
  });
});

import { classify, stillChecking } from "../tools/probe-sites.js";
import { detectChallenge } from "../src/browser/harness.js";

describe("challenge recognition", () => {
  it("treats JavaScript-check pages as not-yet-reachable, and the real page as ok", () => {
    expect(classify(200, "", "Please enable JavaScript to view the page content. Your support ID is: 1234567890")).toBe("blocked");
    expect(classify(200, "Just a moment...", "")).toBe("blocked");
    expect(classify(200, "On-Line Filing", "An official website of New York State")).toBe("ok");
    expect(classify(403, "Access Denied", "")).toBe("blocked");
  });

  it("keeps waiting on a title that says Loading, but not on page text that does", () => {
    expect(stillChecking("Loading https://filings.dos.ny.gov/ords/r/corpanc/ecorp/ecorphome", "")).toBe(true);
    expect(stillChecking("On-Line Filing", "Loading your filings... An official website of New York State")).toBe(false);
  });

  it("never marks a blank page or an unexpected page ok", () => {
    expect(classify(200, "", "")).toBe("blocked"); // a check that has not rendered yet
    expect(classify(200, "", "  \n ")).toBe("blocked");
    expect(classify(200, "Something else", "text", undefined, /Public Inquiry/i)).toBe("error");
    expect(classify(200, "Public Inquiry", "Search", undefined, /Public Inquiry/i)).toBe("ok");
    expect(classify(200, "State of NJ - Online Business Entity Filing", "Welcome to Business Formation", undefined, /Business Formation/i)).toBe("ok");
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
      title: async () => titles[Math.min(i, titles.length - 1)]!, // the page changes as time passes, not as it is read
      locator: () => ({ innerText: async () => "" }),
      waitForTimeout: async () => { waits++; i++; },
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
  it("waits while the page is still blank", async () => {
    const p = scripted(["", "", "On-Line Filing"]);
    expect(await waitOutJsCheck(p.page)).toBeNull();
    expect(p.waits()).toBe(2);
  });
  it("waits while the page is still titled Loading (NY DOS through Steel, 2026-11-24)", async () => {
    const p = scripted(["Loading https://filings.dos.ny.gov/ords/r/corpanc/ecorp/ecorphome", "Loading https://filings.dos.ny.gov/ords/r/corpanc/ecorp/ecorphome", "On-Line Filing"]);
    expect(await waitOutJsCheck(p.page)).toBeNull();
    expect(p.waits()).toBe(2);
  });
  it("gives up when a check does not clear", async () => {
    const p = scripted(["Just a moment..."]);
    expect(await waitOutJsCheck(p.page, 3000)).toBe("just a moment");
    expect(p.waits()).toBe(3);
  });
});
