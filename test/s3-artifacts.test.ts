import { describe, it, expect } from "vitest";
import { S3ArtifactStore } from "../src/artifacts/s3.js";

/** An in-memory stand-in for S3: PutObject and GetObject by bucket and key. */
function fakeS3() {
  const objects = new Map<string, Buffer>();
  const send = async (cmd: { constructor: { name: string }; input: { Bucket: string; Key: string; Body?: Buffer | string } }) => {
    const k = `${cmd.input.Bucket}/${cmd.input.Key}`;
    if (cmd.constructor.name === "PutObjectCommand") { objects.set(k, Buffer.from(cmd.input.Body as Buffer)); return {}; }
    const b = objects.get(k);
    if (!b) throw Object.assign(new Error("The specified key does not exist."), { name: "NoSuchKey", $metadata: { httpStatusCode: 404 } });
    return { Body: { transformToByteArray: async () => new Uint8Array(b) } };
  };
  return { objects, client: { send } as never };
}

describe("artifacts in object storage", () => {
  it("stores bytes and metadata, reads them back by id", async () => {
    const s3 = fakeS3();
    const store = new S3ArtifactStore({ bucket: "kf-artifacts", client: s3.client });
    const meta = await store.put({ filingId: "f1", kind: "cp575", label: "CP 575", contentType: "application/pdf" }, Buffer.from("%PDF-1.7"));
    expect([...s3.objects.keys()].sort()).toEqual([`kf-artifacts/artifacts/${meta.id}`, `kf-artifacts/artifacts/${meta.id}.json`]);
    const got = await store.get(meta.id);
    expect(got?.body.toString()).toBe("%PDF-1.7");
    expect(got?.meta).toMatchObject({ id: meta.id, filingId: "f1", kind: "cp575", bytes: 8 });
  });

  it("answers null for unknown ids and never builds a key from anything but an id", async () => {
    const s3 = fakeS3();
    const store = new S3ArtifactStore({ bucket: "b", client: s3.client });
    expect(await store.get("6f1c1a2e-0000-4000-8000-000000000000")).toBeNull();
    s3.objects.set("b/secret.json", Buffer.from("{}"));
    expect(await store.get("../secret")).toBeNull();
    expect(await store.get("secret")).toBeNull();
  });
});
