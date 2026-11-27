import { afterAll, beforeAll, describe, expect, it } from "vitest";
import sharp from "sharp";
import type { FastifyInstance } from "fastify";
import { needsPlate, plateLogo } from "../src/brand/logo-plate.js";
import { renderEmail, PLATE_PAD } from "../src/comms/email.js";
import { proseLetter } from "../src/comms/letter.js";
import { Notifier } from "../src/comms/notifier.js";
import { MemoryStore } from "../src/store/memory.js";
import { ClientCompanySettings, TenantSettings } from "../src/settings/schema.js";
import { FsArtifactStore } from "../src/artifacts/store.js";
import { buildServer } from "../src/api/server.js";
import type { ChannelSender, OutboundMessage } from "../src/comms/senders.js";
import type { WebhookEvent } from "../src/domain/events.js";
import type { FilingRecord } from "../src/store/types.js";
import { njFormationRequest, seededStore, wire } from "./helpers.js";

/** Owner's decision (Nov 26): a firm's logo stays visible when a mail app forces dark mode, on a small white plate. */

const ART = new FsArtifactStore("var/test-artifacts");

/** A 240 px square: a Plate Ink square on transparent, the kind of logo that vanishes on a dark ground. */
const transparentLogo = () => sharp({ create: { width: 240, height: 240, channels: 4, background: { r: 0, g: 0, b: 0, alpha: 0 } } })
  .composite([{ input: { create: { width: 120, height: 120, channels: 4, background: { r: 29, g: 33, b: 48, alpha: 1 } } }, top: 60, left: 60 }])
  .png().toBuffer();
const opaqueLogo = () => sharp({ create: { width: 240, height: 240, channels: 3, background: { r: 29, g: 78, b: 99 } } }).png().toBuffer();
const jpegLogo = () => sharp({ create: { width: 240, height: 240, channels: 3, background: { r: 255, g: 255, b: 255 } } }).jpeg().toBuffer();

const pixel = async (png: Buffer, x: number, y: number) => {
  const { data, info } = await sharp(png).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  const i = (y * info.width + x) * 4;
  return [data[i], data[i + 1], data[i + 2], data[i + 3]];
};

describe("the white plate baked into a logo", () => {
  it("is needed only when the logo has transparent pixels", async () => {
    expect(await needsPlate(await transparentLogo())).toBe(true);
    expect(await needsPlate(await opaqueLogo())).toBe(false);
    expect(await needsPlate(await jpegLogo())).toBe(false);
    expect(await needsPlate(Buffer.from("not a picture"))).toBe(false);
  });

  it("puts 12 px of white around the logo at the size the email shows it, its corners cut at 45°", async () => {
    // 240 px shows at 56 px (logoBox), so the picture keeps 3x density: logo 168 px, 36 px of white, 18 px cuts.
    const out = (await plateLogo(await transparentLogo()))!;
    expect(out).toMatchObject({ width: 168 + 72, height: 168 + 72 });
    const meta = await sharp(out.body).metadata();
    expect([meta.format, meta.width, meta.height]).toEqual(["png", 240, 240]);
    expect((await pixel(out.body, 0, 0))[3]).toBe(0); // the cut corner shows the ground
    expect(await pixel(out.body, 18, 120)).toEqual([255, 255, 255, 255]); // the plate's margin is white
    expect(await pixel(out.body, 120, 120)).toEqual([29, 33, 48, 255]); // the logo's ink is untouched
    expect(await pixel(out.body, 50, 50)).toEqual([255, 255, 255, 255]); // the logo's own transparency is now white
  });

  it("gives up quietly on a picture it can't read", async () => {
    expect(await plateLogo(Buffer.from("not a picture"))).toBeNull();
  });
});

describe("the letterhead of a firm's email", () => {
  const letter = { ...proseLetter("Hello", "Hello."), side: "firm" as const };
  it("sizes a plated logo with the plate's margin and lets the plate stand in for the gap above the name", () => {
    const { html } = renderEmail({ subject: "s", body: "b", letter: { ...letter, firm: { name: "Harbor & Pine CPA", logo: { url: "https://api.test/v1/brand-logos/x/plate", width: 240, height: 240, plate: true } } } });
    expect(html).toContain(`width="${56 + 2 * PLATE_PAD}" height="${56 + 2 * PLATE_PAD}"`);
    expect(html).toContain("/v1/brand-logos/x/plate");
    expect(html).not.toMatch(/x-name"[^>]*padding-top:12px/);
  });
  it("keeps the 12 px gap for a logo used as uploaded", () => {
    const { html } = renderEmail({ subject: "s", body: "b", letter: { ...letter, firm: { name: "Harbor & Pine CPA", logo: { url: "https://api.test/v1/brand-logos/y", width: 240, height: 240 } } } });
    expect(html).toContain('width="56" height="56"');
    expect(html).toMatch(/x-name"[^>]*padding-top:12px/);
  });
});

describe("the notifier", () => {
  class Capture implements ChannelSender {
    readonly channel = "email" as const;
    sent: OutboundMessage[] = [];
    async send(_to: { address: string }, msg: OutboundMessage) { this.sent.push(msg); return { ok: true }; }
  }
  const now = "2026-11-26T12:00:00.000Z";
  const clientLogo = async (body: Buffer) => {
    const store = new MemoryStore();
    await store.putTenant(TenantSettings.parse({ tenantId: "keystone", name: "CoFile" }));
    const meta = await ART.put({ filingId: "brand-harbor", kind: "brand_logo", label: "Logo", contentType: "image/png" }, body);
    await store.putClientCompany(ClientCompanySettings.parse({ clientCompanyId: "harbor", tenantId: "keystone", name: "Harbor & Pine CPA", portal: { slug: "harbor-pine", displayName: "Harbor & Pine CPA", logoArtifactId: meta.id }, policies: { documentsTo: "both" } }));
    const cap = new Capture();
    const n = new Notifier({ store, senders: { email: cap }, publicBaseUrl: "http://api.test", webBaseUrl: "http://web.test", artifacts: ART, supportEmail: "hello@cofile.app", platformTenantId: "keystone" });
    const f = { id: "f-plate", tenantId: "keystone", clientCompanyId: "harbor", idempotencyKey: "k", status: "completed", request: njFormationRequest({ clientCompanyId: "harbor", contact: { firstName: "Ana", lastName: "Ortiz", phone: "2015550100", email: "ana@twosisters.test" } } as never), payloadHash: "h", createdAt: now, updatedAt: now, artifacts: [] } as FilingRecord;
    await n.notify({ id: "e", type: "filing.completed", tenantId: "keystone", filingId: f.id, occurredAt: now, data: {} } as WebhookEvent, f, (await store.getTenant("keystone"))!);
    return { id: meta.id, logo: cap.sent.find((m) => m.letter?.side === "firm")?.letter?.firm?.logo };
  };
  it("sends a transparent logo on its plate, and a logo on its own tile as uploaded", async () => {
    const t = await clientLogo(await transparentLogo());
    expect(t.logo).toEqual({ url: `http://api.test/v1/brand-logos/${t.id}/plate`, width: 240, height: 240, plate: true });
    const o = await clientLogo(await opaqueLogo());
    expect(o.logo).toEqual({ url: `http://api.test/v1/brand-logos/${o.id}`, width: 240, height: 240 });
  });
});

describe("the plated logo's address", () => {
  let app: FastifyInstance;
  beforeAll(async () => {
    const store = await seededStore();
    const w = wire(store);
    app = buildServer({ service: w.service, approvals: w.approvals, store, artifacts: ART, publicBaseUrl: "http://api.test", apiKeys: { k1: "keystone" } });
    await app.ready();
  });
  afterAll(async () => { await app.close(); });

  it("serves the plated PNG to anyone, a tile logo as uploaded, and nothing that isn't a logo", async () => {
    const t = await ART.put({ filingId: "brand-x", kind: "brand_logo", label: "Logo", contentType: "image/png" }, await transparentLogo());
    const r = await app.inject({ method: "GET", url: `/v1/brand-logos/${t.id}/plate` });
    expect(r.statusCode).toBe(200);
    expect(r.headers["content-type"]).toBe("image/png");
    expect(r.headers["cache-control"]).toContain("immutable");
    expect((await sharp(r.rawPayload).metadata()).width).toBe(240);
    expect((await pixel(r.rawPayload, 0, 0))[3]).toBe(0);

    const jpg = await jpegLogo();
    const o = await ART.put({ filingId: "brand-x", kind: "brand_logo", label: "Logo", contentType: "image/jpeg" }, jpg);
    const ro = await app.inject({ method: "GET", url: `/v1/brand-logos/${o.id}/plate` });
    expect(ro.headers["content-type"]).toBe("image/jpeg");
    expect(ro.rawPayload.equals(jpg)).toBe(true);

    const doc = await ART.put({ filingId: "f-1", kind: "filing_receipt", label: "Receipt", contentType: "image/png" }, await transparentLogo());
    expect((await app.inject({ method: "GET", url: `/v1/brand-logos/${doc.id}/plate` })).statusCode).toBe(404);
  });
});
