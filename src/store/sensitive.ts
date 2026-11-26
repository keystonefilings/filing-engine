import { createCipheriv, createDecipheriv, randomBytes } from "node:crypto";
import { SENSITIVE_PATHS } from "../domain/filing.js";
import { TERMINAL } from "../domain/states.js";
import type { FilingRecord, Store } from "./types.js";

/**
 * Social Security numbers at rest (V5, docs/vision-check-2026-11-25.md).
 *  - FieldCipher seals each SENSITIVE_PATHS value with AES-256-GCM before a filing is written to the
 *    database and opens it on read; the rest of the engine only ever sees plain values.
 *    A value written before encryption existed has no prefix and is read as it is.
 *  - purgeSensitive replaces them with the masked form once a filing is finished (completed or
 *    aborted) and the retention period has passed. Nothing else needs them after that.
 */

const PREFIX = "enc:v1:";

export class FieldCipher {
  private constructor(private readonly key: Buffer) {}

  /** DATA_ENCRYPTION_KEY: 32 random bytes as 64 hex characters (openssl rand -hex 32). */
  static fromSpec(spec: string | null | undefined): FieldCipher | null {
    if (!spec) return null;
    if (!/^[0-9a-fA-F]{64}$/.test(spec)) throw new Error("DATA_ENCRYPTION_KEY must be 64 hex characters (openssl rand -hex 32)");
    return new FieldCipher(Buffer.from(spec, "hex"));
  }

  seal(value: string): string {
    if (value.startsWith(PREFIX)) return value;
    const iv = randomBytes(12);
    const c = createCipheriv("aes-256-gcm", this.key, iv);
    const body = Buffer.concat([c.update(value, "utf8"), c.final()]);
    return `${PREFIX}${iv.toString("base64url")}.${body.toString("base64url")}.${c.getAuthTag().toString("base64url")}`;
  }

  open(value: string): string {
    if (!value.startsWith(PREFIX)) return value;
    const [iv, body, tag] = value.slice(PREFIX.length).split(".");
    if (!iv || !body || !tag) throw new Error("sealed value is damaged");
    const d = createDecipheriv("aes-256-gcm", this.key, Buffer.from(iv, "base64url"));
    d.setAuthTag(Buffer.from(tag, "base64url"));
    return Buffer.concat([d.update(Buffer.from(body, "base64url")), d.final()]).toString("utf8");
  }
}

/** A copy of the request with every sensitive value passed through fn (paths like "payroll.owners[].ssn"). */
export function mapSensitive<T>(request: T, fn: (v: string) => string): T {
  const copy = JSON.parse(JSON.stringify(request)) as T;
  const walk = (node: unknown, parts: string[]): void => {
    if (node === null || typeof node !== "object" || !parts.length) return;
    const [head, ...rest] = parts;
    const list = head!.endsWith("[]");
    const key = list ? head!.slice(0, -2) : head!;
    const obj = node as Record<string, unknown>;
    if (list) {
      if (Array.isArray(obj[key])) for (const item of obj[key] as unknown[]) walk(item, rest);
      return;
    }
    if (!rest.length) {
      if (typeof obj[key] === "string") obj[key] = fn(obj[key] as string);
      return;
    }
    walk(obj[key], rest);
  };
  for (const p of SENSITIVE_PATHS) walk(copy, p.split("."));
  return copy;
}

export function sealFiling(f: FilingRecord, cipher: FieldCipher | null): FilingRecord {
  return cipher ? { ...f, request: mapSensitive(f.request, (v) => cipher.seal(v)) } : f;
}

export function openFiling<T extends FilingRecord | null>(f: T, cipher: FieldCipher | null): T {
  return cipher && f ? { ...f, request: mapSensitive(f.request, (v) => cipher.open(v)) } : f;
}

/** "123-45-6789" -> "***-**-6789"; an already masked value stays as it is. */
export function maskSsn(v: string): string {
  const digits = v.replace(/\D/g, "");
  return digits.length >= 4 ? `***-**-${digits.slice(-4)}` : "***-**-****";
}

const isMasked = (v: string) => /^\*{3}-\*{2}-[\d*]{4}$/.test(v);

/**
 * Masks the SSNs of every filing that has been finished for at least retentionDays. Returns the ids
 * it purged. Safe to run on any number of machines at once: purging twice changes nothing.
 */
export async function purgeSensitive(store: Store, opts: { retentionDays: number; now?: Date }): Promise<string[]> {
  const cutoff = new Date((opts.now ?? new Date()).getTime() - opts.retentionDays * 86_400_000).toISOString();
  const purged: string[] = [];
  // V40: emailed-in requests keep only who sent what subject and when.
  for (const m of await store.listInboundToPurge(cutoff)) {
    await store.updateInbound(m.id, { text: undefined, extracted: undefined, purgedAt: (opts.now ?? new Date()).toISOString() });
  }
  for (const f of await store.listFilingsByStatus([...TERMINAL])) {
    if (f.sensitivePurgedAt || f.updatedAt > cutoff) continue;
    let found = false;
    mapSensitive(f.request, (v) => { if (!isMasked(v)) found = true; return v; });
    if (!found) continue;
    await store.updateFiling(f.id, { request: mapSensitive(f.request, maskSsn), sensitivePurgedAt: (opts.now ?? new Date()).toISOString() });
    purged.push(f.id);
  }
  return purged;
}
