import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { renderDecisionPage, renderReviewPage } from "../src/approvals/render.js";
import { KIND_TITLES, businessName, filingTypeTitle } from "../src/approvals/titles.js";

// The proof (merged spec 11.5) and whose look it wears (decision 2, the Stripe model).

const base = {
  filingId: "f-1", filingTitle: "Two Sisters Bakery LLC", filingKind: "New Jersey LLC formation",
  payload: { formation: { name: { baseName: "TWO SISTERS BAKERY", designator: "LLC" }, members: [{ name: "Ana Ortiz" }] }, contact: { email: "ana@example.com" } },
  fees: [{ label: "Formation filing fee", amountUsd: 100 }, { label: "NJ portal fee, by card", amountUsd: 3.5 }],
  expiresAt: "2026-12-03T22:00:00Z", einInRun: false, postUrl: "/approve/t", requireCode: false,
};

describe("the proof in CoFile's look", () => {
  const html = renderReviewPage({ ...base, look: "cofile", firmName: "Harbor & Pine CPA", clientName: "Two Sisters Bakery LLC", supportEmail: "help@harborpine.example" });

  it("names the firm and its client as text, with no logo, firm color or \"with CoFile\"", () => {
    expect(html).toContain('<p class="named">Harbor &amp; Pine CPA · Two Sisters Bakery LLC</p>');
    expect(html).not.toContain("<img");
    expect(html).not.toMatch(/with CoFile|--firm-fill/);
  });

  it("has one Brass button, the approve button, and the request-changes outline", () => {
    expect(html).toContain("--action:#D9A84A");
    expect(html.match(/class="approve"/g)).toHaveLength(1);
    expect(html).toContain(">Approve, and authorize submission and payment</button>");
    expect(html).toContain('class="outline" name="decision" value="request_changes"');
  });

  it("groups \"A › B\" details under A, in the payload's own order, and totals the fees", () => {
    expect(html).toContain('<dt class="group">Formation</dt>');
    expect(html).toContain("<dt>Name › Base name</dt><dd>TWO SISTERS BAKERY</dd>");
    expect(html.indexOf("Formation</dt>")).toBeLessThan(html.indexOf("Contact</dt>"));
    expect(html).toContain('<span class="amt">$103.50</span>');
    expect(html).toContain("New Jersey LLC formation");
    expect(html).toContain("Ready to approve");
  });

  it("shows the rehearsal notice only on a rehearsal", () => {
    expect(html).not.toContain("Rehearsal: nothing will be filed");
    expect(renderReviewPage({ ...base, practice: true })).toContain("Rehearsal: nothing will be filed or paid, even if you approve.");
  });

  it("works without scripts", () => {
    expect(html).not.toMatch(/<script/i);
  });
});

describe("a platform's white-label proof", () => {
  it("carries the platform's logo and its ink-matched color, and nothing of CoFile", () => {
    const html = renderReviewPage({ ...base, look: "white", brandName: "Sunrise Filings", logoUrl: "https://sunrise.example/logo.png", primaryColor: "#F2C200", supportEmail: "help@sunrise.example" });
    expect(html).toContain('src="https://sunrise.example/logo.png"');
    // A light yellow keeps its fill with Plate Ink text and a deepened border (the ink match, 3.6).
    expect(html).toContain("--firm-fill:#F2C200");
    expect(html).toContain("--firm-on:#1D2130");
    expect(html).not.toMatch(/CoFile/);
    expect(html).not.toContain('class="named"');
  });

  it("keeps the approve button readable whatever color the platform picks", () => {
    for (const c of ["#F4C430", "#FFFFFF", "#1D3C8C", "#39FF14"]) {
      const html = renderReviewPage({ ...base, look: "white", brandName: "P", primaryColor: c });
      const fill = /--firm-fill:(#[0-9A-F]{6})/.exec(html)![1]!;
      const on = /--firm-on:(#[0-9A-F]{6})/.exec(html)![1]!;
      const lum = (h: string) => { const v = [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16) / 255).map((x) => (x <= 0.04045 ? x / 12.92 : ((x + 0.055) / 1.055) ** 2.4)); return 0.2126 * v[0]! + 0.7152 * v[1]! + 0.0722 * v[2]!; };
      const [a, b] = [lum(fill), lum(on)];
      expect((Math.max(a, b) + 0.05) / (Math.min(a, b) + 0.05), `${c}: ${on} on ${fill}`).toBeGreaterThanOrEqual(4.5);
    }
  });
});

describe("pages around the proof", () => {
  it("an expired or unknown link names nobody", () => {
    const html = renderDecisionPage({ heading: "The proof", paragraphs: ["This link to the proof has expired. Ask whoever sent it for a new one."] });
    expect(html).not.toContain('class="named"');
    expect(html).not.toMatch(/CoFile/);
    expect(html).toContain("This link to the proof has expired.");
  });
});

describe("filing titles", () => {
  it("match the portal's own titles in web/lib/intake/forms.ts", () => {
    const forms = readFileSync(new URL("../web/lib/intake/forms.ts", import.meta.url), "utf8");
    for (const [id, title] of Object.entries(KIND_TITLES)) {
      expect(forms, id).toContain(`id: "${id}"`);
      expect(forms, id).toContain(`title: ${JSON.stringify(title)}`);
    }
  });

  it("name the business and the filing type", () => {
    const r = { state: "NJ", type: "formation", formation: { name: { baseName: "Two Sisters Bakery", designator: "LLC" }, entityType: "LLC" }, intake: { portal: { kind: "nj-llc" } } };
    expect(businessName(r)).toBe("Two Sisters Bakery LLC");
    expect(filingTypeTitle(r)).toBe("New Jersey LLC formation");
    expect(filingTypeTitle({ state: "NY", type: "copy_request" })).toBe("New York copies of filed documents");
  });
});

describe("type on the proof", () => {
  it("loads CoFile's faces from the web app in CoFile's look only", () => {
    const cofile = renderReviewPage({ ...base, look: "cofile", firmName: "F", fontBase: "https://cofile.app/" });
    expect(cofile).toContain('src:url("https://cofile.app/fonts/miller-text-400.woff2")');
    expect(cofile).toContain('font-family:"Founders Grotesk"');
    const white = renderReviewPage({ ...base, look: "white", brandName: "P", primaryColor: "#1D4E63", fontBase: "https://cofile.app/" });
    expect(white).not.toContain("/fonts/miller-text");
  });

  it("uses CoFile's serif only in CoFile's look", () => {
    const cofile = renderReviewPage({ ...base, look: "cofile", firmName: "F" });
    const white = renderReviewPage({ ...base, look: "white", brandName: "P", primaryColor: "#1D4E63" });
    expect(cofile).toMatch(/--font-head:"Miller Display"/);
    expect(white).not.toMatch(/--font-head:"Miller Display"/);
  });
});
