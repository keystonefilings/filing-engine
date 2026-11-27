import { afterAll, beforeAll, describe, expect, it } from "vitest";
import sharp from "sharp";
import type { FastifyInstance } from "fastify";
import { analyzeLogo, withLogoInfo } from "../src/brand/logo-analysis.js";
import { plateLogo } from "../src/brand/logo-plate.js";
import { renderEmail, LIGHT_PLATE_PAD_Y, PLATE_PAD } from "../src/comms/email.js";
import { proseLetter } from "../src/comms/letter.js";
import { Notifier } from "../src/comms/notifier.js";
import { renderReviewPage } from "../src/approvals/render.js";
import { MemoryStore } from "../src/store/memory.js";
import { ClientCompanySettings, TenantSettings } from "../src/settings/schema.js";
import { FsArtifactStore } from "../src/artifacts/store.js";
import { buildServer } from "../src/api/server.js";
import type { ChannelSender, OutboundMessage } from "../src/comms/senders.js";
import type { WebhookEvent } from "../src/domain/events.js";
import type { FilingRecord } from "../src/store/types.js";
import { njFormationRequest, seededStore, wire } from "./helpers.js";

// A logo made of light marks (merged spec 3.5.1, 10B.2.3): read on the server, and shown on its dark plate everywhere.

const ART = new FsArtifactStore("var/test-artifacts");

/** A 700 × 100 wordmark: seven white letters (bars) on transparent, drawn for a dark website. */
const lightLogo = () => sharp({ create: { width: 700, height: 100, channels: 4, background: { r: 0, g: 0, b: 0, alpha: 0 } } })
  .composite(Array.from({ length: 7 }, (_, i) => ({ input: { create: { width: 60, height: 100, channels: 4 as const, background: { r: 255, g: 255, b: 255, alpha: 1 } } }, top: 0, left: i * 100 + 20 })))
  .png().toBuffer();
/** A Plate Ink square on transparent: an ordinary logo. */
const darkLogo = () => sharp({ create: { width: 240, height: 240, channels: 4, background: { r: 0, g: 0, b: 0, alpha: 0 } } })
  .composite([{ input: { create: { width: 120, height: 120, channels: 4, background: { r: 29, g: 33, b: 48, alpha: 1 } } }, top: 60, left: 60 }])
  .png().toBuffer();
/** Harbor blue on a white box, as a JPEG. */
const whiteBox = () => sharp({ create: { width: 300, height: 200, channels: 3, background: { r: 255, g: 255, b: 255 } } })
  .composite([{ input: { create: { width: 150, height: 100, channels: 3, background: { r: 29, g: 78, b: 99 } } }, top: 50, left: 75 }])
  .jpeg().toBuffer();
/** White letters on their own dark tile. */
const tile = () => sharp({ create: { width: 300, height: 100, channels: 3, background: { r: 29, g: 33, b: 48 } } })
  .composite([{ input: { create: { width: 200, height: 40, channels: 3, background: { r: 255, g: 255, b: 255 } } }, top: 30, left: 50 }])
  .png().toBuffer();

const pixel = async (png: Buffer, x: number, y: number) => {
  const { data, info } = await sharp(png).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  const i = (y * info.width + x) * 4;
  return [data[i], data[i + 1], data[i + 2], data[i + 3]];
};

describe("reading a logo", () => {
  it("finds light marks on transparent, with the picture's own size and shape", async () => {
    const a = (await analyzeLogo(await lightLogo()))!;
    expect(a).toMatchObject({ width: 700, height: 100, ratio: 7, background: "transparent", light: true, ink: "#FFFFFF" });
    expect(a.inkL).toBeGreaterThan(0.8);
  });
  it("tells an ordinary logo, a white box and a tile apart", async () => {
    expect(await analyzeLogo(await darkLogo())).toMatchObject({ background: "transparent", light: false });
    expect(await analyzeLogo(await whiteBox())).toMatchObject({ background: "white", light: false });
    expect(await analyzeLogo(await tile())).toMatchObject({ background: "tile", light: false });
    expect(await analyzeLogo(Buffer.from("not a picture"))).toBeNull();
  });
});

describe("the dark plate baked into a light logo for email", () => {
  it("is the plate color, 12 px across and 8 px above and below, its corners cut", async () => {
    const out = (await plateLogo(await lightLogo(), "#1D2130"))!;
    // 700 × 100 shows at 196 × 28 by area (logoBox); the picture keeps 3x density: 588 × 84, 36 px across, 24 above and below.
    const meta = await sharp(out.body).metadata();
    expect([meta.width, meta.height]).toEqual([out.width, out.height]);
    expect(out.width).toBe(588 + 2 * 3 * PLATE_PAD);
    expect(out.height).toBe(84 + 2 * 3 * LIGHT_PLATE_PAD_Y);
    expect((await pixel(out.body, 0, 0))[3]).toBe(0);
    expect(await pixel(out.body, 10, Math.round(out.height / 2))).toEqual([29, 33, 48, 255]);
    expect(await plateLogo(await lightLogo(), "red")).toBeNull();
  });

  it("sizes a seen plate with its 12 × 8 margins and keeps the gap above the name", () => {
    const letter = { ...proseLetter("Hello", "Hello."), side: "firm" as const };
    const square = { url: "https://api.test/v1/brand-logos/x/plate?bg=1D2130", width: 240, height: 240, plate: true, plateColor: "#1D2130" };
    const { html } = renderEmail({ subject: "s", body: "b", letter: { ...letter, firm: { name: "Kitefold Tax", logo: square } } });
    expect(html).toContain(`width="${56 + 2 * PLATE_PAD}" height="${56 + 2 * LIGHT_PLATE_PAD_Y}"`);
    expect(html).toMatch(/x-name"[^>]*padding-top:12px/);
  });
});

describe("the engine keeps the reading with the logo", () => {
  let app: FastifyInstance;
  let store: Awaited<ReturnType<typeof seededStore>>;
  const as = { "x-api-key": "k1" };
  beforeAll(async () => {
    store = await seededStore();
    const w = wire(store);
    app = buildServer({ service: w.service, approvals: w.approvals, store, artifacts: ART, publicBaseUrl: "http://api.test", apiKeys: { k1: "keystone" }, platformTenantId: "keystone" });
    await app.ready();
  });
  afterAll(async () => { await app.close(); });

  it("reads a logo at upload, keeps it through a settings save, and drops it with the logo", async () => {
    await app.inject({ method: "PUT", url: "/v1/client-companies/kitefold", headers: as, payload: { name: "Kitefold Tax", portal: { slug: "kitefold", primaryColor: "#F2C200" } } });
    const up = await app.inject({ method: "PUT", url: "/v1/client-companies/kitefold/logo", headers: as, payload: { data: (await lightLogo()).toString("base64") } });
    expect(up.statusCode).toBe(200);
    const id = up.json().logoArtifactId as string;
    expect((await store.getClientCompany("kitefold"))?.portal?.logoInfo).toMatchObject({ artifactId: id, light: true, ratio: 7 });

    // A save that sends the portal back (with a made-up reading) keeps the engine's own.
    const c = (await store.getClientCompany("kitefold"))!;
    const bogus = { ...c.portal!.logoInfo!, light: false };
    expect((await app.inject({ method: "PUT", url: "/v1/client-companies/kitefold", headers: as, payload: { name: c.name, portal: { ...c.portal, logoInfo: bogus } } })).statusCode).toBe(200);
    expect((await store.getClientCompany("kitefold"))?.portal?.logoInfo?.light).toBe(true);

    const got = await app.inject({ method: "GET", url: "/v1/client-companies/kitefold", headers: as });
    expect(got.json().clientCompany.portal.logoInfo).toMatchObject({ artifactId: id, light: true });

    await app.inject({ method: "DELETE", url: "/v1/client-companies/kitefold/logo", headers: as });
    expect((await store.getClientCompany("kitefold"))?.portal?.logoInfo).toBeUndefined();
  });

  it("reads an older logo the first time its firm is loaded, and saves the reading", async () => {
    const meta = await ART.put({ filingId: "brand-older", kind: "brand_logo", label: "Logo", contentType: "image/png" }, await lightLogo());
    await store.putClientCompany(ClientCompanySettings.parse({ clientCompanyId: "older", tenantId: "keystone", name: "Older Firm", portal: { slug: "older-firm", logoArtifactId: meta.id } }));
    const listed = await app.inject({ method: "GET", url: "/v1/client-companies", headers: as });
    const row = (listed.json().clientCompanies as ClientCompanySettings[]).find((c) => c.clientCompanyId === "older");
    expect(row?.portal?.logoInfo).toMatchObject({ artifactId: meta.id, light: true });
    expect((await store.getClientCompany("older"))?.portal?.logoInfo?.artifactId).toBe(meta.id);
    // A reading of another logo is stale: it is made again.
    const fresh = await ART.put({ filingId: "brand-older", kind: "brand_logo", label: "Logo", contentType: "image/png" }, await darkLogo());
    const c = (await store.getClientCompany("older"))!;
    const again = await withLogoInfo({ store, artifacts: ART }, { ...c, portal: { ...c.portal!, logoArtifactId: fresh.id } });
    expect(again.portal?.logoInfo).toMatchObject({ artifactId: fresh.id, light: false });
  });

  it("serves the dark plate at ?bg=, and nothing for a color that isn't one", async () => {
    const t = await ART.put({ filingId: "brand-x", kind: "brand_logo", label: "Logo", contentType: "image/png" }, await lightLogo());
    const r = await app.inject({ method: "GET", url: `/v1/brand-logos/${t.id}/plate?bg=1D2130` });
    expect(r.statusCode).toBe(200);
    expect(r.headers["content-type"]).toBe("image/png");
    expect(await pixel(r.rawPayload, 10, 40)).toEqual([29, 33, 48, 255]);
    expect((await app.inject({ method: "GET", url: `/v1/brand-logos/${t.id}/plate?bg=nope` })).statusCode).toBe(404);
  });
});

describe("a light logo in an email to the firm's client", () => {
  class Capture implements ChannelSender {
    readonly channel = "email" as const;
    sent: OutboundMessage[] = [];
    async send(_to: { address: string }, msg: OutboundMessage) { this.sent.push(msg); return { ok: true }; }
  }
  const now = "2026-11-27T12:00:00.000Z";
  const send = async (primaryColor?: string) => {
    const store = new MemoryStore();
    await store.putTenant(TenantSettings.parse({ tenantId: "keystone", name: "CoFile" }));
    const meta = await ART.put({ filingId: "brand-kite", kind: "brand_logo", label: "Logo", contentType: "image/png" }, await lightLogo());
    await store.putClientCompany(ClientCompanySettings.parse({ clientCompanyId: "kite", tenantId: "keystone", name: "Kitefold Tax", portal: { slug: "kitefold", displayName: "Kitefold Tax", logoArtifactId: meta.id, primaryColor }, policies: { documentsTo: "both" } }));
    const cap = new Capture();
    const n = new Notifier({ store, senders: { email: cap }, publicBaseUrl: "http://api.test", webBaseUrl: "http://web.test", artifacts: ART, supportEmail: "hello@cofile.app", platformTenantId: "keystone" });
    const f = { id: "f-kite", tenantId: "keystone", clientCompanyId: "kite", idempotencyKey: "k", status: "completed", request: njFormationRequest({ clientCompanyId: "kite", contact: { firstName: "Ana", lastName: "Ortiz", phone: "2015550100", email: "ana@twosisters.test" } } as never), payloadHash: "h", createdAt: now, updatedAt: now, artifacts: [] } as FilingRecord;
    await n.notify({ id: "e", type: "filing.completed", tenantId: "keystone", filingId: f.id, occurredAt: now, data: {} } as WebhookEvent, f, (await store.getTenant("keystone"))!);
    return { id: meta.id, logo: cap.sent.find((m) => m.letter?.side === "firm")?.letter?.firm?.logo };
  };
  it("goes out on Plate Ink when it can't read on the firm's fill, and on the fill when it can", async () => {
    const yellow = await send("#F2C200");
    expect(yellow.logo).toEqual({ url: `http://api.test/v1/brand-logos/${yellow.id}/plate?bg=1D2130`, width: 700, height: 100, plate: true, plateColor: "#1D2130" });
    const harbor = await send("#1D4E63");
    expect(harbor.logo).toMatchObject({ url: `http://api.test/v1/brand-logos/${harbor.id}/plate?bg=1D4E63`, plateColor: "#1D4E63" });
    const none = await send();
    expect(none.logo?.plateColor).toBe("#1D2130");
  });
});

describe("a light logo on a platform's white-label proof", () => {
  const base = {
    filingId: "f-1", filingTitle: "Two Sisters Bakery LLC", filingKind: "New Jersey LLC formation", payload: {},
    fees: [{ label: "Formation filing fee", amountUsd: 100 }], expiresAt: "2026-12-03T22:00:00Z", einInRun: false, postUrl: "/approve/t", requireCode: false,
  };
  const light = { v: 1, width: 700, height: 100, ratio: 7, background: "transparent" as const, inkL: 1, ink: "#FFFFFF", light: true };
  it("sits on its plate, sized by area, with the name kept as its alt text", () => {
    const html = renderReviewPage({ ...base, look: "white", brandName: "Kitefold Tax", logoUrl: "https://api.test/v1/brand-logos/x", logo: light, primaryColor: "#F2C200" });
    expect(html).toContain('class="lh-logo is-sized is-plate"');
    expect(html).toContain("--plate:#1D2130");
    expect(html).toContain('alt="Kitefold Tax"');
    expect(html).toMatch(/--lw:211\.7px;--lh:30\.2px/);
    expect(html).not.toContain('class="lh-name"');
  });
  it("takes the brand's fill when the marks read on it, and leaves an ordinary logo on white with its name typeset", () => {
    expect(renderReviewPage({ ...base, look: "white", brandName: "K", logoUrl: "https://x.test/l.png", logo: light, primaryColor: "#1D4E63" })).toContain("--plate:#1D4E63");
    const square = { ...light, width: 240, height: 240, ratio: 1, light: false, ink: "#1D4E63", inkL: 0.4 };
    const html = renderReviewPage({ ...base, look: "white", brandName: "Harbor & Pine CPA", logoUrl: "https://x.test/l.png", logo: square, primaryColor: "#1D4E63" });
    expect(html).toContain('class="lh-logo is-sized"');
    expect(html).toContain('<span class="lh-name">Harbor &amp; Pine CPA</span>');
  });
});
