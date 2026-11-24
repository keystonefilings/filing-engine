import { engine, EngineError, type WebhookEndpointInfo } from "@/lib/engine";
import { requireTenant } from "@/lib/session";
import { WebhookForm } from "@/components/WebhookForm";
import { EVENT_NAMES } from "@/app/docs/events";
import { saveEndpoints } from "./actions";

export const metadata = { title: "Webhooks" };

export default async function WebhooksPage() {
  const s = await requireTenant();
  let endpoints: WebhookEndpointInfo[] = [];
  let unconfigured = false;
  try {
    endpoints = (await engine<{ endpoints: WebhookEndpointInfo[] }>(s.apiKey, "/v1/webhook-endpoints")).endpoints;
  } catch (e) { if (e instanceof EngineError && e.status === 409) unconfigured = true; else throw e; }
  return (
    <div className="stack narrow">
      <h1>Webhooks</h1>
      <p className="muted">The engine posts each filing event to these URLs, signed with the endpoint&apos;s secret. See <a href="/docs/webhooks">Webhooks</a> for verifying the signature.</p>
      {unconfigured ? <p className="notice warn">Your account settings haven&apos;t been set up yet, so endpoints can&apos;t be saved.</p> : <WebhookForm action={saveEndpoints} endpoints={endpoints} events={EVENT_NAMES} />}
    </div>
  );
}
