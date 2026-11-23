import { describe, it, expect } from "vitest";
import { browserSetupProblems } from "../src/browser/setup-check.js";
import { parseSiteProxies } from "../src/browser/egress.js";
import { ADAPTERS } from "../src/adapters/index.js";

const sites = Object.values(ADAPTERS).map((a) => a.site);
const base = { sites, browserProxy: null, siteProxies: {}, steelOnly: false, production: true, steelKeySet: true };

describe("worker start-up check of browser settings", () => {
  it("accepts every browser on Steel in the browserless image", () => {
    expect(browserSetupProblems({ ...base, steelOnly: true, browserProxy: "steel" })).toEqual([]);
    expect(browserSetupProblems({ ...base, steelOnly: true, browserProxy: "steel", siteProxies: parseSiteProxies("MO=steel") })).toEqual([]);
  });

  it("refuses the browserless image when any site would need a local browser", () => {
    const [p] = browserSetupProblems({ ...base, steelOnly: true, siteProxies: parseSiteProxies("IRS=steel,NY=steel") });
    expect(p).toMatch(/no local browser, but FL, MO, NJ would need one/);
    expect(browserSetupProblems({ ...base, steelOnly: true, browserProxy: "steel", siteProxies: parseSiteProxies("NJ=direct") })[0]).toMatch(/but NJ would need one/);
  });

  it("the full image may mix routes", () => {
    expect(browserSetupProblems({ ...base, siteProxies: parseSiteProxies("IRS=steel,NY=steel") })).toEqual([]);
  });

  it("refuses Steel routes without a Steel key in production only", () => {
    expect(browserSetupProblems({ ...base, steelKeySet: false, siteProxies: parseSiteProxies("IRS=steel,NY=steel") })).toEqual(["IRS, NY route to Steel but STEEL_API_KEY is not set"]);
    expect(browserSetupProblems({ ...base, production: false, steelKeySet: false, siteProxies: parseSiteProxies("IRS=steel") })).toEqual([]);
  });
});
