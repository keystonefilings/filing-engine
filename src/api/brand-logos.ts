import type { FastifyInstance, FastifyRequest } from "fastify";
import { z } from "zod";
import type { ArtifactStore } from "../artifacts/store.js";
import { ClientCompanySettings } from "../settings/schema.js";
import type { Store } from "../store/types.js";
import { portalSlugFor, type Auth } from "../users/routes.js";
import { fontType, MAX_FONT_BYTES } from "../settings/fonts.js";
import { needsPlate, platedLogoCached } from "../brand/logo-plate.js";
import { analyzeLogo, trimLogo } from "../brand/logo-analysis.js";

/** Largest logo we keep, in bytes. The front end shrinks big pictures before sending. */
export const MAX_LOGO_BYTES = 512 * 1024;

/**
 * Picture formats a logo may be, told by their first bytes, not by what the caller says.
 * SVG is left out on purpose: it can carry script, and these files are served to anyone.
 */
const SIGNATURES: { type: string; test: (b: Buffer) => boolean }[] = [
  { type: "image/png", test: (b) => b.length > 8 && b.subarray(0, 8).equals(Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a])) },
  { type: "image/jpeg", test: (b) => b.length > 3 && b[0] === 0xff && b[1] === 0xd8 && b[2] === 0xff },
  { type: "image/webp", test: (b) => b.length > 12 && b.subarray(0, 4).toString("latin1") === "RIFF" && b.subarray(8, 12).toString("latin1") === "WEBP" },
];

export function logoType(b: Buffer): string | null {
  return SIGNATURES.find((s) => s.test(b))?.type ?? null;
}

const LogoBody = z.object({
  /** The picture, base64 (a data: URL prefix is accepted and dropped). */
  data: z.string().min(1).max(Math.ceil((MAX_LOGO_BYTES * 4) / 3) + 100),
});

interface Deps {
  store: Store;
  artifacts: ArtifactStore;
  authOf: (req: FastifyRequest) => Promise<Auth | null>;
}

/**
 * A firm's uploaded logo. Upload and removal take the same keys as the firm's other settings
 * (a partner session only for its own firm, see partner-guard.ts). Viewing needs no key: a logo
 * appears on client pages, and its address is a random id that changes with every upload.
 */
export function registerBrandLogos(app: FastifyInstance, deps: Deps): void {
  const ownCompany = async (req: FastifyRequest) => {
    const a = await deps.authOf(req);
    if (!a) return { status: 401 as const };
    const id = (req.params as { id: string }).id;
    if (a.partnerOf && a.partnerOf !== id) return { status: 404 as const };
    const c = await deps.store.getClientCompany(id);
    if (!c || c.tenantId !== a.tenantId) return { status: 404 as const };
    return { status: 200 as const, company: c };
  };

  app.put("/v1/client-companies/:id/logo", async (req, reply) => {
    const own = await ownCompany(req);
    if (own.status !== 200) return reply.code(own.status).send({ error: own.status === 401 ? "invalid api key" : "not found" });
    const parsed = LogoBody.safeParse(req.body);
    if (!parsed.success) return reply.code(422).send({ error: "validation failed", issues: [{ path: "data", message: "send the picture as base64" }] });
    const bytes = Buffer.from(parsed.data.data.replace(/^data:[^,]*,/, ""), "base64");
    if (bytes.length > MAX_LOGO_BYTES) return reply.code(422).send({ error: "validation failed", issues: [{ path: "data", message: "the logo must be 512 KB or smaller" }] });
    const type = logoType(bytes);
    if (!type) return reply.code(422).send({ error: "validation failed", issues: [{ path: "data", message: "the logo must be a PNG, JPEG or WebP picture" }] });
    const c = own.company;
    // Processed at upload (3.5.1): its empty margin trimmed, as Branding does in the browser, for a logo sent by the API.
    const trimmed = await trimLogo(bytes);
    const logo = trimmed && trimmed.body.length <= MAX_LOGO_BYTES ? trimmed : { body: bytes, type };
    const meta = await deps.artifacts.put({ filingId: `brand-${c.clientCompanyId}`, kind: "brand_logo", label: "Logo", contentType: logo.type }, logo.body);
    // Read at upload (3.5.1): its shape, its edge, and whether its marks are light, so every page shows it right.
    const info = await analyzeLogo(logo.body);
    const next = ClientCompanySettings.parse({
      ...c,
      portal: {
        ...c.portal, slug: await portalSlugFor(deps.store, c.tenantId, c), logoArtifactId: meta.id, logoUrl: undefined,
        logoInfo: info ? { ...info, artifactId: meta.id } : undefined,
      },
    });
    await deps.store.putClientCompany(next);
    return { clientCompany: next, logoArtifactId: meta.id };
  });

  app.delete("/v1/client-companies/:id/logo", async (req, reply) => {
    const own = await ownCompany(req);
    if (own.status !== 200) return reply.code(own.status).send({ error: own.status === 401 ? "invalid api key" : "not found" });
    const c = own.company;
    if (!c.portal) return { clientCompany: c };
    const next = ClientCompanySettings.parse({ ...c, portal: { ...c.portal, logoArtifactId: undefined, logoUrl: undefined, logoInfo: undefined } });
    await deps.store.putClientCompany(next);
    return { clientCompany: next };
  });

  // V21: a firm's own font file, shown on its client pages.
  app.put("/v1/client-companies/:id/font", async (req, reply) => {
    const own = await ownCompany(req);
    if (own.status !== 200) return reply.code(own.status).send({ error: own.status === 401 ? "invalid api key" : "not found" });
    const parsed = z.object({ data: z.string().min(1).max(Math.ceil((MAX_FONT_BYTES * 4) / 3) + 100) }).safeParse(req.body);
    if (!parsed.success) return reply.code(422).send({ error: "validation failed", issues: [{ path: "font", message: "send the font file as base64, 600 KB or smaller" }] });
    const bytes = Buffer.from(parsed.data.data.replace(/^data:[^,]*,/, ""), "base64");
    if (bytes.length > MAX_FONT_BYTES) return reply.code(422).send({ error: "validation failed", issues: [{ path: "font", message: "the font file must be 600 KB or smaller" }] });
    const ft = fontType(bytes);
    if (!ft) return reply.code(422).send({ error: "validation failed", issues: [{ path: "font", message: "the font must be a WOFF2, WOFF, TTF or OTF file" }] });
    const c = own.company;
    const meta = await deps.artifacts.put({ filingId: `brand-${c.clientCompanyId}`, kind: "brand_font", label: "Font", contentType: ft.type }, bytes);
    const next = ClientCompanySettings.parse({ ...c, portal: { ...c.portal, slug: await portalSlugFor(deps.store, c.tenantId, c), font: "custom", fontArtifactId: meta.id } });
    await deps.store.putClientCompany(next);
    return { clientCompany: next, fontArtifactId: meta.id };
  });

  app.get("/v1/brand-fonts/:id", async (req, reply) => {
    const a = await deps.artifacts.get((req.params as { id: string }).id);
    if (!a || a.meta.kind !== "brand_font" || !fontType(a.body)) return reply.code(404).send({ error: "not found" });
    return reply
      .header("content-type", a.meta.contentType)
      .header("cache-control", "public, max-age=31536000, immutable")
      .header("x-content-type-options", "nosniff")
      .header("access-control-allow-origin", "*")
      .send(a.body);
  });

  // The logo on its baked plate, for email (src/brand/logo-plate.ts): white, or with ?bg=RRGGBB the dark plate a logo
  // of light marks sits on (10B.2.3). A logo that needs no plate, or can't be plated, is served as uploaded, so the
  // address always shows the logo.
  app.get("/v1/brand-logos/:id/plate", async (req, reply) => {
    const id = (req.params as { id: string }).id;
    const bg = (req.query as { bg?: unknown }).bg;
    if (bg !== undefined && (typeof bg !== "string" || !/^[0-9a-fA-F]{6}$/.test(bg))) return reply.code(404).send({ error: "not found" });
    const a = await deps.artifacts.get(id);
    if (!a || a.meta.kind !== "brand_logo" || !logoType(a.body)) return reply.code(404).send({ error: "not found" });
    const plated = (await needsPlate(a.body)) ? await platedLogoCached(id, a.body, bg ? `#${bg.toUpperCase()}` : undefined) : null;
    return reply
      .header("content-type", plated ? "image/png" : a.meta.contentType)
      .header("cache-control", "public, max-age=31536000, immutable")
      .header("x-content-type-options", "nosniff")
      .header("content-security-policy", "default-src 'none'; sandbox")
      .send(plated ?? a.body);
  });

  app.get("/v1/brand-logos/:id", async (req, reply) => {
    const a = await deps.artifacts.get((req.params as { id: string }).id);
    // Only logos: every other artifact (filed documents, screenshots) stays behind a key.
    if (!a || a.meta.kind !== "brand_logo" || !logoType(a.body)) return reply.code(404).send({ error: "not found" });
    return reply
      .header("content-type", a.meta.contentType)
      .header("cache-control", "public, max-age=31536000, immutable")
      .header("x-content-type-options", "nosniff")
      .header("content-security-policy", "default-src 'none'; sandbox")
      .send(a.body);
  });
}
