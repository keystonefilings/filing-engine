import { afterAll, beforeAll, describe, expect, it } from "vitest";
import type { FastifyInstance } from "fastify";
import { PDFDocument } from "pdf-lib";
import { buildServer } from "../src/api/server.js";
import { FsArtifactStore } from "../src/artifacts/store.js";
import { appendDocuments, checkPdf, documentOwner, loadSupportingDocument } from "../src/documents/supporting.js";
import { fillNyForm } from "../src/pdf-forms/ny-dos.js";
import { ClientCompanySettings } from "../src/settings/schema.js";
import type { PaperUploadDetails } from "../src/domain/filing.js";
import type { MemoryStore } from "../src/store/memory.js";
import { seededStore, wire } from "./helpers.js";

/** Decision 19: the Application for Authority's Certificate of Existence and Tax Commission consent are uploaded PDFs. */

async function pdf(pages: number, text = "Certificate of Existence"): Promise<Buffer> {
  const doc = await PDFDocument.create();
  for (let i = 0; i < pages; i++) doc.addPage([612, 792]).drawText(`${text}, page ${i + 1}`, { x: 72, y: 700, size: 14 });
  return Buffer.from(await doc.save());
}

const artifacts = new FsArtifactStore("var/test-artifacts");
let store: MemoryStore;
let app: FastifyInstance;
let w: ReturnType<typeof wire>;
beforeAll(async () => {
  store = await seededStore();
  await store.putClientCompany(ClientCompanySettings.parse({ clientCompanyId: "beta-llp", tenantId: "keystone", name: "Beta LLP" }));
  w = wire(store, { artifacts });
  app = buildServer({ service: w.service, approvals: w.approvals, store, artifacts, publicBaseUrl: "http://api.test", apiKeys: { k1: "keystone", k2: "other-co" } });
  await app.ready();
});
afterAll(() => app.close());

const upload = (company: string, body: Record<string, unknown>, key = "k1") =>
  app.inject({ method: "POST", url: `/v1/client-companies/${company}/documents`, headers: { "x-api-key": key }, payload: body });

const addr = { street1: "1 Main St", city: "Albany", state: "NY" as const, zip: "12207" };
const authority = (extra: Record<string, unknown> = {}) => ({
  tenantId: "keystone", clientCompanyId: "acme-cpa", idempotencyKey: `auth-${Math.random().toString(36).slice(2)}`,
  type: "paper_upload", state: "NY",
  paperUpload: {
    form: "ny_application_for_authority", levelOfService: "routine",
    applicationForAuthority: {
      corporateName: "Example Holdings Inc.", jurisdiction: "Delaware", incorporationDate: "2024-03-01", county: "Albany",
      processRecipient: { name: "Example Holdings Inc.", address: addr }, priorActivity: "none_in_new_york",
      signer: { name: "Jordan Signer", title: "President" }, filer: { name: "Pat Filer", company: "Acme CPA", address: addr }, ...extra,
    },
  },
  contact: { firstName: "Pat", lastName: "Filer", phone: "5185550100", email: "pat@example.test" },
});
const errorPaths = (issues: { path: string; severity: string }[]) => issues.filter((i) => i.severity === "error").map((i) => i.path);

describe("supporting document uploads", () => {
  it("keeps a real PDF for the firm and returns its id; refuses other files and other tenants' firms", async () => {
    const ok = await upload("acme-cpa", { kind: "certificate_of_existence", data: (await pdf(1)).toString("base64"), fileName: "delaware-good-standing.pdf" });
    expect(ok.statusCode).toBe(201);
    const doc = ok.json().document;
    expect(doc).toMatchObject({ kind: "certificate_of_existence", pages: 1 });
    expect(doc.label).toContain("delaware-good-standing.pdf");
    const stored = await artifacts.get(doc.id);
    expect(stored?.meta.filingId).toBe(documentOwner("acme-cpa"));

    const png = Buffer.from("89504e470d0a1a0a0000000d49484452", "hex");
    expect((await upload("acme-cpa", { kind: "certificate_of_existence", data: png.toString("base64") })).json().issues[0].message).toMatch(/must be a PDF/);
    expect((await upload("acme-cpa", { kind: "certificate_of_existence", data: Buffer.from("%PDF-1.7 not really").toString("base64") })).json().issues[0].message).toMatch(/can't be read/);
    expect((await upload("acme-cpa", { kind: "passport", data: (await pdf(1)).toString("base64") })).statusCode).toBe(422);
    expect((await upload("acme-cpa", { kind: "certificate_of_existence", data: (await pdf(1)).toString("base64") }, "k2")).statusCode).toBe(404);
    expect((await upload("acme-cpa", { kind: "certificate_of_existence", data: "x" }, "nope")).statusCode).toBe(401);
  });

  it("checks size and pages", async () => {
    expect((await checkPdf(Buffer.alloc(0))).ok).toBe(false);
    expect(await checkPdf(await pdf(3))).toEqual({ ok: true, pages: 3 });
    expect((await checkPdf(await pdf(51))).ok).toBe(false);
  });
});

describe("the Application for Authority needs its documents (decision 19)", () => {
  it("refuses a filing without the Certificate of Existence, or without the Tax Commission consent it says is attached", async () => {
    const r = await w.service.createFiling(authority());
    expect(errorPaths(r.issues)).toContain("paperUpload.applicationForAuthority.certificateOfExistenceDocumentId");
    const cert = (await upload("acme-cpa", { kind: "certificate_of_existence", data: (await pdf(1)).toString("base64") })).json().document.id;
    const noConsent = await w.service.createFiling(authority({ certificateOfExistenceDocumentId: cert, priorActivity: "tax_consent_attached" }));
    expect(errorPaths(noConsent.issues)).toEqual(["paperUpload.applicationForAuthority.taxConsentDocumentId"]);
    const consent = (await upload("acme-cpa", { kind: "tax_commission_consent", data: (await pdf(2, "Consent")).toString("base64") })).json().document.id;
    const full = await w.service.createFiling(authority({ certificateOfExistenceDocumentId: cert, priorActivity: "tax_consent_attached", taxConsentDocumentId: consent }));
    // No document errors (the tests' own fee table has no E-Submission prices, so "fees" may remain).
    expect(errorPaths(full.issues).filter((p) => p.startsWith("paperUpload"))).toEqual([]);
  });

  it("never takes another company's document, or a document of the wrong kind", async () => {
    const beta = (await upload("beta-llp", { kind: "certificate_of_existence", data: (await pdf(1)).toString("base64") })).json().document.id;
    const other = await w.service.createFiling(authority({ certificateOfExistenceDocumentId: beta }));
    expect(other.issues.find((i) => i.path.endsWith("certificateOfExistenceDocumentId"))?.message).toMatch(/no such document uploaded for this company/);
    const consent = (await upload("acme-cpa", { kind: "tax_commission_consent", data: (await pdf(1)).toString("base64") })).json().document.id;
    const wrongKind = await w.service.createFiling(authority({ certificateOfExistenceDocumentId: consent }));
    expect(errorPaths(wrongKind.issues)).toContain("paperUpload.applicationForAuthority.certificateOfExistenceDocumentId");
    expect((await loadSupportingDocument(artifacts, "acme-cpa", "../../etc/passwd", "certificate_of_existence")).ok).toBe(false);
  });

  it("uploads the signed form with the documents' pages after it, as one PDF", async () => {
    const details = authority().paperUpload as unknown as PaperUploadDetails;
    const form = await fillNyForm(details, { dryRun: true, signaturePng: null });
    const formPages = (await PDFDocument.load(form)).getPageCount();
    const merged = await appendDocuments(form, [await pdf(1), await pdf(2, "Consent")]);
    expect((await PDFDocument.load(merged)).getPageCount()).toBe(formPages + 3);
    expect(await appendDocuments(form, [])).toBe(form);
  });
});
