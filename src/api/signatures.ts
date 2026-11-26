import { randomUUID } from "node:crypto";
import type { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import type { SignatureRecord, Store } from "../store/types.js";
import { parsePng, sealImage, sha256 } from "../signatures/sealed.js";

/**
 * Saved signatures. A signer draws a signature once in the portal, agrees to its use, and it is kept
 * sealed for that client company. It is placed only on a form whose filing that company approved
 * (src/signatures/apply.ts). The image never leaves the engine through the API.
 */

/**
 * Decision 4 (Nov 26): limited to forms that name this signer (src/signatures/apply.ts already checks
 * the name), without "filed in my name", and revocable at any time (DELETE /v1/signatures/:id; a
 * revoked signature is refused at filing time). Each saved signature keeps the text it was agreed under.
 */
export const SIGNATURE_CONSENT =
  "I adopt this image as my signature. I authorize it to be placed only on New York Department of State forms for this company " +
  "that name me as the signer, and only on a filing that has been approved for submission. " +
  "I can revoke this authorization at any time; once it is revoked, my signature won't be placed on any further filing.";

const CreateBody = z.object({
  clientCompanyId: z.string().min(1).max(100),
  signerName: z.string().trim().min(2).max(120),
  signerEmail: z.string().email().max(200).optional(),
  /** A PNG data URL or base64 PNG. */
  image: z.string().min(100).max(420_000),
  /** Must be exactly SIGNATURE_CONSENT: the signer saw and accepted it. */
  consentText: z.string(),
  consented: z.literal(true),
  capturedBy: z.string().max(200).optional(),
});

export function publicSignature(s: SignatureRecord) {
  return {
    id: s.id, clientCompanyId: s.clientCompanyId, signerName: s.signerName, signerEmail: s.signerEmail,
    createdAt: s.createdAt, capturedBy: s.capturedBy, revokedAt: s.revokedAt, lastUsedAt: s.lastUsedAt, active: !s.revokedAt,
  };
}

export interface SignatureDeps {
  store: Store;
  tenantOf: (req: FastifyRequest) => Promise<string | null>;
  now?: () => Date;
  /** Injected in tests; defaults to SIGNATURE_KEY. */
  seal?: (png: Buffer, id: string) => string;
}

export function registerSignatures(app: FastifyInstance, deps: SignatureDeps): void {
  const now = deps.now ?? (() => new Date());
  const seal = deps.seal ?? ((png: Buffer, id: string) => sealImage(png, id));
  const requireTenant = async (req: FastifyRequest, reply: FastifyReply) => {
    const t = await deps.tenantOf(req);
    if (!t) void reply.code(401).send({ error: "invalid api key" });
    return t;
  };

  app.get("/v1/signatures", async (req, reply) => {
    const tenantId = await requireTenant(req, reply);
    if (!tenantId) return reply;
    const q = req.query as { clientCompanyId?: string };
    return { signatures: (await deps.store.listSignatures(tenantId, q.clientCompanyId || undefined)).map(publicSignature), consentText: SIGNATURE_CONSENT };
  });

  app.post("/v1/signatures", { bodyLimit: 512 * 1024 }, async (req, reply) => {
    const tenantId = await requireTenant(req, reply);
    if (!tenantId) return reply;
    const parsed = CreateBody.safeParse(req.body);
    if (!parsed.success) return reply.code(422).send({ error: parsed.error.issues });
    const b = parsed.data;
    if (b.consentText !== SIGNATURE_CONSENT) return reply.code(422).send({ error: "consentText must be the current consent text from GET /v1/signatures" });
    const company = await deps.store.getClientCompany(b.clientCompanyId);
    if (!company || company.tenantId !== tenantId) return reply.code(404).send({ error: "client company not found" });
    let img;
    try { img = parsePng(b.image); } catch (e) { return reply.code(422).send({ error: (e as Error).message }); }
    const live = (await deps.store.listSignatures(tenantId, b.clientCompanyId)).filter((s) => !s.revokedAt);
    if (live.length >= 10) return reply.code(409).send({ error: "this company already has 10 saved signatures; revoke one first" });
    const id = randomUUID();
    let sealed: string;
    try { sealed = seal(img.png, id); } catch (e) { return reply.code(503).send({ error: (e as Error).message }); }
    const at = now().toISOString();
    const rec = await deps.store.createSignature({
      id, tenantId, clientCompanyId: b.clientCompanyId, signerName: b.signerName, signerEmail: b.signerEmail,
      capturedBy: b.capturedBy ?? "api", consentText: b.consentText, createdAt: at,
      imageSha256: sha256(img.png), width: img.width, height: img.height, sealedImage: sealed,
    });
    return reply.code(201).send({ signature: publicSignature(rec) });
  });

  app.delete("/v1/signatures/:id", async (req, reply) => {
    const tenantId = await requireTenant(req, reply);
    if (!tenantId) return reply;
    const ok = await deps.store.revokeSignature(tenantId, (req.params as { id: string }).id, now().toISOString());
    return ok ? { revoked: true } : reply.code(404).send({ error: "not found" });
  });
}
