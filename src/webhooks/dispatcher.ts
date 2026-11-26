import { createHmac, randomUUID, timingSafeEqual } from "node:crypto";
import type { EventType, WebhookEvent } from "../domain/events.js";
import type { Store, WebhookDeliveryRecord } from "../store/types.js";

export interface WebhookEndpoint { url: string; secret: string; events?: string[] }

/** Backoff after each failed attempt, in ms. After the last one the delivery is dead-lettered. */
export const BACKOFF_MS = [60_000, 300_000, 1_800_000, 7_200_000, 43_200_000];

export function signPayload(secret: string, timestamp: string, body: string): string {
  return createHmac("sha256", secret).update(`${timestamp}.${body}`).digest("hex");
}

/** For consumers: verify `X-CoFile-Signature: t=<unix>,v1=<hex>` against the raw body. */
export function verifySignature(secret: string, header: string, body: string, toleranceSec = 300, now = Date.now()): boolean {
  const m = /t=(\d+),v1=([0-9a-f]+)/.exec(header);
  if (!m) return false;
  const [, t, v1] = m as unknown as [string, string, string];
  if (Math.abs(now / 1000 - Number(t)) > toleranceSec) return false;
  const expected = Buffer.from(signPayload(secret, t, body));
  const got = Buffer.from(v1);
  return expected.length === got.length && timingSafeEqual(expected, got);
}

export type FetchLike = (url: string, init: { method: string; headers: Record<string, string>; body: string }) => Promise<{ status: number }>;

export class WebhookDispatcher {
  constructor(
    private readonly store: Store,
    private readonly fetchImpl: FetchLike = (url, init) => fetch(url, init).then((r) => ({ status: r.status })),
    private readonly now: () => Date = () => new Date(),
  ) {}

  /** Creates one pending delivery per subscribed endpoint. Nothing is sent synchronously. */
  async emit(
    type: EventType,
    ctx: { tenantId: string; filingId: string; runId?: string },
    data: Record<string, unknown>,
    endpoints: WebhookEndpoint[],
  ): Promise<WebhookEvent> {
    const event: WebhookEvent = { id: randomUUID(), type, ...ctx, occurredAt: this.now().toISOString(), data };
    for (const ep of endpoints) {
      if (ep.events && ep.events.length && !ep.events.includes(type)) continue;
      await this.store.createDelivery({
        id: randomUUID(), event, url: ep.url, attempts: 0, nextAttemptAt: event.occurredAt, status: "pending",
      });
    }
    return event;
  }

  /** Attempts every due delivery once. Call from a timer or a queue worker. */
  async processDue(): Promise<{ delivered: number; failed: number; dead: number }> {
    const due = await this.store.listDueDeliveries(this.now().toISOString());
    const stats = { delivered: 0, failed: 0, dead: 0 };
    for (const d of due) await this.attempt(d, stats);
    return stats;
  }

  /** The signing secret is read from the tenant's settings at delivery time, so retries
   *  after a restart, or from another process, are signed the same way. */
  private async secretFor(d: WebhookDeliveryRecord): Promise<string | null> {
    const tenant = await this.store.getTenant(d.event.tenantId);
    return tenant?.webhookEndpoints.find((e) => e.url === d.url)?.secret ?? null;
  }

  private async attempt(d: WebhookDeliveryRecord, stats: { delivered: number; failed: number; dead: number }) {
    const secret = await this.secretFor(d);
    if (!secret) {
      // Endpoint removed from settings since the event was queued: never send unsigned.
      await this.store.updateDelivery(d.id, { attempts: d.attempts, status: "dead", lastError: "endpoint no longer configured for tenant" });
      stats.dead++;
      return;
    }
    const body = JSON.stringify(d.event);
    const ts = String(Math.floor(this.now().getTime() / 1000));
    const headers: Record<string, string> = {
      "content-type": "application/json",
      "x-cofile-event": d.event.type,
      "x-cofile-delivery": d.id,
      "x-cofile-signature": `t=${ts},v1=${signPayload(secret, ts, body)}`,
    };
    let status = 0, error: string | undefined;
    try {
      status = (await this.fetchImpl(d.url, { method: "POST", headers, body })).status;
    } catch (e) {
      error = (e as Error).message;
    }
    const attempts = d.attempts + 1;
    if (status >= 200 && status < 300) {
      await this.store.updateDelivery(d.id, { attempts, status: "delivered", lastStatusCode: status });
      stats.delivered++;
      return;
    }
    const backoff = BACKOFF_MS[attempts - 1];
    if (backoff === undefined) {
      await this.store.updateDelivery(d.id, { attempts, status: "dead", lastStatusCode: status || undefined, lastError: error });
      stats.dead++;
      return;
    }
    await this.store.updateDelivery(d.id, {
      attempts, lastStatusCode: status || undefined, lastError: error,
      nextAttemptAt: new Date(this.now().getTime() + backoff).toISOString(),
    });
    stats.failed++;
  }
}
