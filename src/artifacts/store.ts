import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { randomUUID } from "node:crypto";

export type ArtifactKind =
  | "screenshot" | "dom_snapshot" | "cp575" | "filing_receipt" | "formation_document"
  | "standing_certificate" | "ss4_authorization" | "generated_pdf" | "trace" | "brand_logo" | "brand_font"
  /** Supporting documents a client uploads with a filing (documents/supporting.ts). */
  | "certificate_of_existence" | "tax_commission_consent" | "other";

export interface ArtifactMeta {
  id: string;
  filingId: string;
  runId?: string;
  kind: ArtifactKind;
  label: string;
  contentType: string;
  bytes: number;
  createdAt: string;
}

/**
 * Artifacts: CP 575, NJ formation documents, NY receipts, per-step screenshots and
 * DOM snapshots. Production on separate machines (Fly.io) uses object storage
 * (artifacts/s3.ts, ARTIFACT_BUCKET); the filesystem store is for development and a
 * single machine where the API and worker share one volume.
 */
export interface ArtifactStore {
  put(meta: Omit<ArtifactMeta, "id" | "bytes" | "createdAt">, body: Buffer | string): Promise<ArtifactMeta>;
  get(id: string): Promise<{ meta: ArtifactMeta; body: Buffer } | null>;
}

/** Artifact ids are UUIDs we generate; anything else (from a URL) is never looked up. */
export function isArtifactId(id: string): boolean {
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(id);
}

export class FsArtifactStore implements ArtifactStore {
  constructor(private readonly root: string) {}

  async put(meta: Omit<ArtifactMeta, "id" | "bytes" | "createdAt">, body: Buffer | string): Promise<ArtifactMeta> {
    const buf = Buffer.isBuffer(body) ? body : Buffer.from(body, "utf8");
    const id = randomUUID();
    const dir = path.join(this.root, meta.filingId);
    await mkdir(dir, { recursive: true });
    const full: ArtifactMeta = { ...meta, id, bytes: buf.length, createdAt: new Date().toISOString() };
    await writeFile(path.join(dir, `${id}.bin`), buf);
    await writeFile(path.join(dir, `${id}.json`), JSON.stringify(full));
    return full;
  }

  async get(id: string): Promise<{ meta: ArtifactMeta; body: Buffer } | null> {
    if (!isArtifactId(id)) return null; // ids come from URLs; never build a path from anything else
    // Scan filing directories; fine for development volumes.
    const { readdir } = await import("node:fs/promises");
    let dirs: string[] = [];
    try { dirs = await readdir(this.root); } catch { return null; }
    for (const d of dirs) {
      try {
        const meta = JSON.parse(await readFile(path.join(this.root, d, `${id}.json`), "utf8")) as ArtifactMeta;
        const body = await readFile(path.join(this.root, d, `${id}.bin`));
        return { meta, body };
      } catch { /* not here */ }
    }
    return null;
  }
}
