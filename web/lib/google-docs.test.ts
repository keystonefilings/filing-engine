import { test } from "node:test";
import assert from "node:assert/strict";
import { createGoogleDoc, docRequests, filingDocContent, label } from "./google-docs.ts";

const filing = {
  id: "f-123", tenantId: "keystone", clientCompanyId: "best", status: "completed", createdAt: "2026-11-20T15:00:00Z", updatedAt: "2026-11-21T15:00:00Z",
  ein: "12-3456789", artifacts: [{ id: "a1", kind: "cp575", label: "IRS letter CP 575" }],
  request: {
    type: "formation", state: "NY", tenantId: "keystone", clientCompanyId: "best", idempotencyKey: "k",
    formation: { name: { baseName: "Hudson Ledger", designator: "LLC" }, county: "Kings", mainBusinessAddress: { street1: "1 Main St", city: "Brooklyn", state: "NY", zip: "11201" } },
    ein: { responsibleParty: { name: "Dana Park", ssn: "***-**-6789", itin: "9xx" }, startDate: "2026-11-01" },
    payroll: { owners: [{ name: "Dana Park", ssn: "123-45-6789" }], fein: "12-3456789" },
    contact: { firstName: "Dana", lastName: "Park", email: "dana@example.test", phone: "2125550100" },
    intake: { portal: { authorizations: [{ text: "I authorize the filing company to file.", grantedBy: "pat@best.test", grantedAt: "2026-11-20T15:00:00Z" }] } },
  },
} as never;

test("the filing's Doc leaves out SSNs and ITINs, keeps the business's EIN, and lists what was filed", () => {
  const c = filingDocContent(filing, { title: "Hudson Ledger LLC", statusLabel: "Completed", firmName: "Best Accounting", filingUrl: "https://cofile.app/p/best/filings/f-123", kindTitle: "New York LLC formation", now: new Date("2026-11-26T12:00:00Z") });
  assert.equal(c.title, "Hudson Ledger LLC: filing record");
  const body = c.text.replaceAll("12-3456789", "<EIN>").replace("People's Social Security numbers and ITINs are left out", "");
  assert.ok(!/6789|\*\*\*-\*\*|9xx|ssn|itin/i.test(body), c.text);
  assert.match(c.text, /EIN: 12-3456789/);
  assert.match(c.text, /Formation\n/);
  assert.match(c.text, /Name, base name: Hudson Ledger/);
  assert.match(c.text, /Main business address, city: Brooklyn/);
  assert.match(c.text, /Payroll\nOwners 1, name: Dana Park/);
  assert.match(c.text, /I authorize the filing company to file\. \(by pat@best\.test/);
  assert.match(c.text, /IRS letter CP 575/);
  assert.ok(!c.text.includes("idempotencyKey") && !c.text.includes("Tenant"));
  // Headings point at whole lines.
  for (const h of c.headings) assert.equal(c.text[h.end], "\n");
  assert.equal(c.text.slice(c.headings[0]!.start, c.headings[0]!.end), "Hudson Ledger LLC");
  assert.equal(label("mainBusinessAddress"), "Main business address");
  assert.equal(label("einMode"), "EIN mode");
});

test("the Doc is created, then filled with one insert and its heading styles", async () => {
  const c = filingDocContent(filing, { title: "Hudson Ledger LLC", statusLabel: "Completed", firmName: "Best Accounting", filingUrl: "https://cofile.app/x", now: new Date() });
  const reqs = docRequests(c) as { insertText?: { location: { index: number }; text: string }; updateParagraphStyle?: { range: { startIndex: number } } }[];
  assert.equal(reqs[0]!.insertText!.location.index, 1);
  assert.equal(reqs.length, 1 + c.headings.length);
  const calls: { url: string; body: string; auth: string }[] = [];
  const fake = (async (url: string, init: RequestInit) => {
    calls.push({ url, body: String(init.body), auth: String((init.headers as Record<string, string>).authorization) });
    return new Response(JSON.stringify(url.endsWith("/documents") ? { documentId: "doc_abcdefghijklmnopqrstu" } : {}), { status: 200 });
  }) as unknown as typeof fetch;
  assert.equal(await createGoogleDoc("tok", c, fake), "doc_abcdefghijklmnopqrstu");
  assert.equal(calls[0]!.url, "https://docs.googleapis.com/v1/documents");
  assert.equal(JSON.parse(calls[0]!.body).title, "Hudson Ledger LLC: filing record");
  assert.equal(calls[1]!.url, "https://docs.googleapis.com/v1/documents/doc_abcdefghijklmnopqrstu:batchUpdate");
  assert.equal(calls[1]!.auth, "Bearer tok");
  await assert.rejects(createGoogleDoc("tok", c, (async () => new Response("no", { status: 403 })) as unknown as typeof fetch), /refused/);
});
