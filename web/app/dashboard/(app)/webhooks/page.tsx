import { engine, EngineError, type WebhookEndpointInfo } from "@/lib/engine";
import { requireTenant } from "@/lib/session";
import { WebhookForm } from "@/components/WebhookForm";
import { EVENT_NAMES } from "@/app/docs/events";
import { saveEndpoints } from "./actions";
import { Notice } from "@/components/ui/Sheet";
import { Vignette } from "@/components/Vignette";

export const metadata = { title: "Webhooks" };

/**
 * Webhooks (merged spec 10C.10): an endpoint card each, and the one Brass save under them. With none saved yet, the
 * ruled sheet (V10) sits over the first, empty card.
 */
export default async function WebhooksPage() {
  const s = await requireTenant();
  let endpoints: WebhookEndpointInfo[] = [];
  let unconfigured = false;
  try {
    endpoints = (await engine<{ endpoints: WebhookEndpointInfo[] }>(s.apiKey, "/v1/webhook-endpoints")).endpoints;
  } catch (e) { if (e instanceof EngineError && e.status === 409) unconfigured = true; else throw e; }
  return (
    <div className="narrow dash2-webhooks">
      <h1>Webhooks</h1>
      <p className="muted">The engine posts each filing event to these URLs, signed with the endpoint&apos;s secret. See <a href="/docs/webhooks">Webhooks</a> for verifying the signature.</p>
      {unconfigured ? <Notice tone="attention">Your account settings haven&apos;t been set up yet, so endpoints can&apos;t be saved.</Notice> : (
        <>
          {endpoints.length === 0 ? <div className="dash2-empty is-lead"><Vignette name="v10-ruled-sheet" size={120} /></div> : null}
          <WebhookForm action={saveEndpoints} endpoints={endpoints} events={EVENT_NAMES} />
        </>
      )}
    </div>
  );
}
