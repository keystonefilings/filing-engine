import type { FastifyInstance, FastifyRequest } from "fastify";
import { z } from "zod";
import type { ArtifactStore } from "../artifacts/store.js";
import { checkPdf, documentOwner, MAX_DOCUMENT_BYTES, SUPPORTING_DOCUMENT_KINDS } from "../documents/supporting.js";
import type { Store } from "../store/types.js";
import type { Auth } from "../users/routes.js";

const KINDS = Object.keys(SUPPORTING_DOCUMENT_KINDS) as [keyof typeof SUPPORTING_DOCUMENT_KINDS, ...(keyof typeof SUPPORTING_DOCUMENT_KINDS)[]];

const DocumentBody = z.object({
  kind: z.enum(KINDS),
  /** The PDF, base64 (a data: URL prefix is accepted and dropped). */
  data: z.string().min(1).max(Math.ceil((MAX_DOCUMENT_BYTES * 4) / 3) + 100),
  /** The file's name as the client chose it, kept as the label. */
  fileName: z.string().max(200).optional(),
});

interface Deps {
  store: Store;
  artifacts: ArtifactStore;
  authOf: (req: FastifyRequest) => Promise<Auth | null>;
}

/**
 * A client company's supporting documents (decision 19): a PDF uploaded before the filing that
 * names it, such as the home state's Certificate of Existence for a NY Application for Authority.
 * The same keys as the firm's other settings (a partner session only for its own firm). Nothing is
 * listed or served back: the filing names the document by the id returned here.
 */
export function registerDocuments(app: FastifyInstance, deps: Deps): void {
  app.post("/v1/client-companies/:id/documents", { bodyLimit: Math.ceil((MAX_DOCUMENT_BYTES * 4) / 3) + 4096 }, async (req, reply) => {
    const a = await deps.authOf(req);
    if (!a) return reply.code(401).send({ error: "invalid api key" });
    const id = (req.params as { id: string }).id;
    if (a.partnerOf && a.partnerOf !== id) return reply.code(404).send({ error: "not found" });
    const company = await deps.store.getClientCompany(id);
    if (!company || company.tenantId !== a.tenantId) return reply.code(404).send({ error: "not found" });
    const parsed = DocumentBody.safeParse(req.body);
    if (!parsed.success) return reply.code(422).send({ error: "validation failed", issues: [{ path: "data", message: "send the kind and the PDF as base64 (10 MB at most)" }] });
    const bytes = Buffer.from(parsed.data.data.replace(/^data:[^,]*,/, ""), "base64");
    const check = await checkPdf(bytes);
    if (!check.ok) return reply.code(422).send({ error: "validation failed", issues: [{ path: "data", message: check.reason }] });
    const label = `${SUPPORTING_DOCUMENT_KINDS[parsed.data.kind]}${parsed.data.fileName ? ` (${parsed.data.fileName.replace(/[\r\n]/g, " ").trim()})` : ""}`;
    const meta = await deps.artifacts.put({ filingId: documentOwner(company.clientCompanyId), kind: parsed.data.kind, label, contentType: "application/pdf" }, bytes);
    return reply.code(201).send({ document: { id: meta.id, kind: parsed.data.kind, label, pages: check.pages, bytes: meta.bytes, createdAt: meta.createdAt } });
  });
}
