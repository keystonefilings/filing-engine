import { randomUUID } from "node:crypto";
import { GetObjectCommand, PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { isArtifactId, type ArtifactMeta, type ArtifactStore } from "./store.js";

export interface S3ArtifactOptions {
  bucket: string;
  /** Key prefix inside the bucket, e.g. "artifacts/". */
  prefix?: string;
  /** S3-compatible endpoint (Fly Tigris sets AWS_ENDPOINT_URL_S3). Unset = AWS S3. */
  endpoint?: string;
  region?: string;
  /** Path-style URLs (MinIO and some self-hosted stores need them). */
  forcePathStyle?: boolean;
  /** Injected in tests. Credentials otherwise come from the standard AWS_* variables. */
  client?: Pick<S3Client, "send">;
}

/**
 * Artifacts in S3-compatible object storage, shared by the API and the worker when they run on
 * different machines (Fly.io), and kept across redeploys. Each artifact is two objects:
 * `<prefix><id>` (the bytes) and `<prefix><id>.json` (its metadata). Encryption at rest is the
 * storage provider's (Tigris and S3 encrypt every object by default).
 */
export class S3ArtifactStore implements ArtifactStore {
  private readonly client: Pick<S3Client, "send">;
  private readonly prefix: string;

  constructor(private readonly opts: S3ArtifactOptions) {
    this.prefix = opts.prefix ?? "artifacts/";
    this.client = opts.client ?? new S3Client({
      ...(opts.endpoint ? { endpoint: opts.endpoint } : {}),
      region: opts.region ?? "auto",
      forcePathStyle: opts.forcePathStyle ?? false,
    });
  }

  async put(meta: Omit<ArtifactMeta, "id" | "bytes" | "createdAt">, body: Buffer | string): Promise<ArtifactMeta> {
    const buf = Buffer.isBuffer(body) ? body : Buffer.from(body, "utf8");
    const full: ArtifactMeta = { ...meta, id: randomUUID(), bytes: buf.length, createdAt: new Date().toISOString() };
    const key = this.prefix + full.id;
    // Bytes first, metadata last: an artifact is visible only once both are stored.
    await this.client.send(new PutObjectCommand({ Bucket: this.opts.bucket, Key: key, Body: buf, ContentType: meta.contentType }));
    await this.client.send(new PutObjectCommand({ Bucket: this.opts.bucket, Key: `${key}.json`, Body: JSON.stringify(full), ContentType: "application/json" }));
    return full;
  }

  async get(id: string): Promise<{ meta: ArtifactMeta; body: Buffer } | null> {
    if (!isArtifactId(id)) return null; // ids come from URLs; only ours become keys
    const key = this.prefix + id;
    const metaText = await this.read(`${key}.json`);
    if (metaText === null) return null;
    const body = await this.read(key);
    if (body === null) return null;
    return { meta: JSON.parse(metaText.toString("utf8")) as ArtifactMeta, body };
  }

  private async read(key: string): Promise<Buffer | null> {
    try {
      const r = await this.client.send(new GetObjectCommand({ Bucket: this.opts.bucket, Key: key }));
      const bytes = await (r.Body as { transformToByteArray(): Promise<Uint8Array> } | undefined)?.transformToByteArray();
      return bytes ? Buffer.from(bytes) : null;
    } catch (e) {
      const err = e as { name?: string; $metadata?: { httpStatusCode?: number } };
      if (err.name === "NoSuchKey" || err.name === "NotFound" || err.$metadata?.httpStatusCode === 404) return null;
      throw e;
    }
  }
}
