import { readFile } from "node:fs/promises";
import { deflateSync } from "node:zlib";
import { describe, expect, it } from "vitest";
import Fastify from "fastify";
import { PDFDocument } from "pdf-lib";
import { MemoryStore } from "../src/store/memory.js";
import { openImage, parsePng, sealImage, sha256 } from "../src/signatures/sealed.js";
import { signatureForApprovedFiling } from "../src/signatures/apply.js";
import { registerSignatures, SIGNATURE_CONSENT } from "../src/api/signatures.js";
import { paperUploadFees } from "../src/fees/paper-upload.js";
import { fillNyForm } from "../src/pdf-forms/ny-dos.js";
import type { ApprovalRecord, FilingRecord } from "../src/store/types.js";
import type { PaperUploadDetails } from "../src/domain/filing.js";

const KEY = Buffer.alloc(32, 7);

/** A real (tiny, grey) PNG, built by hand so the test needs no image library. */
function png(width = 200, height = 60): Buffer {
  const crcTable = Array.from({ length: 256 }, (_, n) => { let c = n; for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1; return c >>> 0; });
  const crc = (b: Buffer) => { let c = 0xffffffff; for (const x of b) c = crcTable[(c ^ x) & 0xff]! ^ (c >>> 8); return (c ^ 0xffffffff) >>> 0; };
  const chunk = (type: string, data: Buffer) => { const len = Buffer.alloc(4); len.writeUInt32BE(data.length); const td = Buffer.concat([Buffer.from(type), data]); const c = Buffer.alloc(4); c.writeUInt32BE(crc(td)); return Buffer.concat([len, td, c]); };
  const ihdr = Buffer.alloc(13); ihdr.writeUInt32BE(width, 0); ihdr.writeUInt32BE(height, 4); ihdr[8] = 8; ihdr[9] = 0;
  const raw = Buffer.alloc((width + 1) * height, 0x80); for (let y = 0; y < height; y++) raw[y * (width + 1)] = 0;
  return Buffer.concat([Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]), chunk("IHDR", ihdr), chunk("IDAT", deflateSync(raw)), chunk("IEND", Buffer.alloc(0))]);
}

const addr = { street1: "1 Main St", city: "Albany", state: "NY" as const, zip: "12207" };
const filer = { name: "Pat Filer", company: "Keystone Filings", address: addr };

const authority: PaperUploadDetails = {
  form: "ny_application_for_authority", levelOfService: "routine",
  applicationForAuthority: {
    corporateName: "Example Holdings Inc.", jurisdiction: "Delaware", incorporationDate: "2024-03-01", county: "Albany",
    processRecipient: { name: "Example Holdings Inc.", address: addr }, priorActivity: "none_in_new_york",
    signer: { name: "Jordan Signer", title: "President" }, filer,
  },
};

const assumed = (over: Partial<NonNullable<PaperUploadDetails["assumedName"]>> = {}): PaperUploadDetails => ({
  form: "ny_assumed_name", levelOfService: "24_hour",
  assumedName: {
    realName: "Example Holdings Inc.", formedUnder: "business_corporation", assumedName: "Example Bakery",
    principalPlace: addr, noNyPrincipalPlace: false, counties: ["Albany", "Kings", "Queens"], locations: [addr], noNyLocation: false,
    signer: { name: "Jordan Signer", capacity: "officer" }, filer, ...over,
  },
});

function filingAndApproval(paperUpload: PaperUploadDetails, status: ApprovalRecord["status"] = "approved", signatureId?: string) {
  const filing = {
    id: "f1", tenantId: "t1", clientCompanyId: "c1", idempotencyKey: "order-0001", status: "approved", payloadHash: "h1",
    createdAt: "", updatedAt: "", request: { state: "NY", type: "paper_upload", paperUpload: { ...paperUpload, signatureId } },
  } as unknown as FilingRecord;
  const approval = { id: "a1", filingId: "f1", tenantId: "t1", payloadHash: "h1", status } as ApprovalRecord;
  return { filing, approval };
}

async function storeWithSignature(signerName = "Jordan Signer") {
  const store = new MemoryStore();
  const image = png();
  await store.createSignature({
    id: "s1", tenantId: "t1", clientCompanyId: "c1", signerName, capturedBy: "test", consentText: SIGNATURE_CONSENT,
    createdAt: "", imageSha256: sha256(image), width: 200, height: 60, sealedImage: sealImage(image, "s1", KEY),
  });
  return { store, image };
}

describe("sealed signatures", () => {
  it("round-trips, and the sealed image is bound to its record id", () => {
    const image = png();
    const sealed = sealImage(image, "s1", KEY);
    expect(sealed).not.toContain(image.toString("base64").slice(0, 40));
    expect(openImage(sealed, "s1", KEY).equals(image)).toBe(true);
    expect(() => openImage(sealed, "s2", KEY)).toThrow();
  });
  it("accepts only real PNGs of a sensible size", () => {
    expect(parsePng(`data:image/png;base64,${png().toString("base64")}`).width).toBe(200);
    expect(() => parsePng(Buffer.from("not a png at all, only text. ".repeat(10)).toString("base64"))).toThrow(/PNG/);
    expect(() => parsePng(png(10, 10).toString("base64"))).toThrow();
  });
});

describe("a saved signature is used only on an approved filing", () => {
  const base = { signerName: "Jordan Signer", key: KEY };
  it("signs a real run of the approved, unchanged filing", async () => {
    const { store, image } = await storeWithSignature();
    const { filing, approval } = filingAndApproval(authority, "approved", "s1");
    const d = await signatureForApprovedFiling({ ...base, store, filing, approval, dryRun: false, signatureId: "s1" });
    expect(d.ok && d.png.equals(image)).toBe(true);
    expect((await store.getSignature("s1"))?.lastUsedAt).toBeTruthy();
  });
  it("never on a dry run, a pending approval, or a filing changed after approval", async () => {
    const { store } = await storeWithSignature();
    const { filing, approval } = filingAndApproval(authority, "approved", "s1");
    expect((await signatureForApprovedFiling({ ...base, store, filing, approval, dryRun: true, signatureId: "s1" })).ok).toBe(false);
    expect((await signatureForApprovedFiling({ ...base, store, filing, approval: { ...approval, status: "pending" }, dryRun: false, signatureId: "s1" })).ok).toBe(false);
    expect((await signatureForApprovedFiling({ ...base, store, filing, approval: null, dryRun: false, signatureId: "s1" })).ok).toBe(false);
    expect((await signatureForApprovedFiling({ ...base, store, filing: { ...filing, payloadHash: "h2" }, approval, dryRun: false, signatureId: "s1" })).ok).toBe(false);
  });
  it("never another company's signature, a revoked one, or someone else's for this signer", async () => {
    const { store } = await storeWithSignature();
    const { filing, approval } = filingAndApproval(authority, "approved", "s1");
    expect((await signatureForApprovedFiling({ ...base, store, filing: { ...filing, clientCompanyId: "c2" }, approval, dryRun: false, signatureId: "s1" })).ok).toBe(false);
    expect((await signatureForApprovedFiling({ ...base, signerName: "Someone Else", store, filing, approval, dryRun: false, signatureId: "s1" })).ok).toBe(false);
    await store.revokeSignature("t1", "s1", "2026-11-24T00:00:00Z");
    expect((await store.getSignature("s1"))?.sealedImage).toBeUndefined();
    expect((await signatureForApprovedFiling({ ...base, store, filing, approval, dryRun: false, signatureId: "s1" })).ok).toBe(false);
  });
});

describe("signature API", () => {
  async function app() {
    const store = new MemoryStore();
    await store.putClientCompany({ clientCompanyId: "c1", tenantId: "t1" } as never);
    const a = Fastify();
    registerSignatures(a, { store, tenantOf: async (req) => (req.headers["x-api-key"] === "k1" ? "t1" : req.headers["x-api-key"] === "k2" ? "t2" : null), seal: (p, id) => sealImage(p, id, KEY) });
    return { a, store };
  }
  const body = { clientCompanyId: "c1", signerName: "Jordan Signer", image: png().toString("base64"), consentText: SIGNATURE_CONSENT, consented: true };
  it("saves with consent, never returns the image, and revokes", async () => {
    const { a, store } = await app();
    const res = await a.inject({ method: "POST", url: "/v1/signatures", headers: { "x-api-key": "k1" }, payload: body });
    expect(res.statusCode).toBe(201);
    expect(res.body).not.toContain("sealed");
    const id = res.json().signature.id;
    const list = await a.inject({ method: "GET", url: "/v1/signatures?clientCompanyId=c1", headers: { "x-api-key": "k1" } });
    expect(list.json().signatures).toHaveLength(1);
    expect(list.body).not.toContain((await store.getSignature(id))!.sealedImage!.slice(0, 20));
    expect((await a.inject({ method: "DELETE", url: `/v1/signatures/${id}`, headers: { "x-api-key": "k2" } })).statusCode).toBe(404);
    expect((await a.inject({ method: "DELETE", url: `/v1/signatures/${id}`, headers: { "x-api-key": "k1" } })).statusCode).toBe(200);
  });
  it("refuses without the consent, or for another tenant's company", async () => {
    const { a } = await app();
    expect((await a.inject({ method: "POST", url: "/v1/signatures", headers: { "x-api-key": "k1" }, payload: { ...body, consentText: "ok" } })).statusCode).toBe(422);
    expect((await a.inject({ method: "POST", url: "/v1/signatures", headers: { "x-api-key": "k2" }, payload: body })).statusCode).toBe(404);
  });
});

describe("fees", () => {
  const req = (paperUpload: PaperUploadDetails) => ({ state: "NY", type: "paper_upload", paperUpload }) as never;
  it("Application for Authority is $225", () => {
    expect(paperUploadFees(req(authority)).reduce((s, l) => s + l.amountUsd, 0)).toBe(225);
  });
  it("a corporation's assumed name adds county fees: $100 in NYC, $25 elsewhere", () => {
    // $25 + Kings and Queens $200 + Albany $25 + 24-hour $25
    expect(paperUploadFees(req(assumed())).reduce((s, l) => s + l.amountUsd, 0)).toBe(275);
  });
  it("an LLC's assumed name is $25 whatever the counties", () => {
    expect(paperUploadFees(req({ ...assumed({ formedUnder: "limited_liability_company", counties: "all" }), levelOfService: "routine" })).reduce((s, l) => s + l.amountUsd, 0)).toBe(25);
  });
});

describe("filling the state's PDF", () => {
  it("fills DOS-1335-f and leaves a flattened form", async () => {
    const out = await fillNyForm(authority, { dryRun: true });
    const doc = await PDFDocument.load(out);
    expect(doc.getForm().getFields()).toHaveLength(0);
    expect(doc.getPageCount()).toBe(3);
  });
  it("fills DOS-1338-f with counties and a signature", async () => {
    const out = await fillNyForm(assumed(), { signaturePng: png() });
    expect((await PDFDocument.load(out)).getPageCount()).toBe(2);
    // The blank form is untouched on disk.
    expect((await readFile("assets/forms/ny/DOS-1338-f.pdf")).length).toBeGreaterThan(100_000);
  });
});
