import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { randomUUID } from "node:crypto";

export type ArtifactKind =
  | "screenshot" | "dom_snapshot" | "cp575" | "filing_receipt" | "formation_document"
  | "standing_certificate" | "ss4_authorization" | "generated_pdf" | "trace" | "other";

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
 * DOM snapshots. Production target is encrypted object storage; the filesystem
 * implementation is for development and the worker's local spool.
 */
export interface ArtifactStore {
  put(meta: Omit<ArtifactMeta, "id" | "bytes" | "createdAt">, body: Buffer | string): Promise<ArtifactMeta>;
  get(id: string): Promise<{ meta: ArtifactMeta; body: Buffer } | null>;
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
