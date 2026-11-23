import type { WebhookEvent } from "../domain/events.js";
import type { FilingRecord } from "../store/types.js";

export interface RenderedMessage {
  /** client = the filing company's client / end customer; admin = the filing company's staff. */
  audience: "client" | "admin";
  subject: string;
  body: string;
  link?: string;
  screenshotArtifactId?: string;
}

function title(filing: FilingRecord): string {
  const r = filing.request;
  const name = r.formation ? `${r.formation.name.baseName} ${r.formation.name.designator}` : r.payroll?.legalName ?? r.standing?.entityName ?? "";
  return `${r.state} ${r.type.replace(/_/g, " ")}${name ? `: ${name}` : ""}`;
}

/**
 * Turns a filing event into a message for the right audience, or null when the event is not
 * something a person needs to see. Client gets approvals, requests for missing info, and
 * status; the filing-company admin gets the beta/problem events (name options, review gate,
 * drift, failures) — name options and the review gate are admin-only, never the end client.
 */
export function renderMessage(event: WebhookEvent, filing: FilingRecord): RenderedMessage | null {
  const t = title(filing);
  const d = event.data;
  const str = (k: string): string | undefined => (typeof d[k] === "string" ? (d[k] as string) : undefined);
  const link = str("approvalLink") ?? str("adminLink");
  switch (event.type) {
    case "filing.awaiting_approval":
      return { audience: "client", subject: `Approve: ${t}`, body: "Please review and approve this filing before it is submitted.", link };
    case "filing.information_required": {
      const missing = Array.isArray(d.missing) ? (d.missing as { label: string }[]).map((m) => m.label).join(", ") : "";
      return { audience: "client", subject: `More information needed: ${t}`, body: `Before we can file, we still need: ${missing}.` };
    }
    case "filing.changes_requested":
      return { audience: "client", subject: `Changes requested: ${t}`, body: `Changes were requested${str("comment") ? `: ${str("comment")}` : "."}` };
    case "filing.completed":
      return { audience: "client", subject: `Completed: ${t}`, body: "This filing is complete. Documents are available." };
    case "filing.name_options_ready":
      return { audience: "admin", subject: `Choose a name: ${t}`, body: "The requested name is unavailable. Open the link to pick an available alternative or enter one.", link };
    case "filing.review_gate":
      return { audience: "admin", subject: `Review before submit: ${t}`, body: "The filing reached the review screen (beta). Review the captured screen and approve to submit.", link, screenshotArtifactId: str("screenshotArtifactId") };
    case "filing.drift_halted":
      return { audience: "admin", subject: `Site changed — review needed: ${t}`, body: "A government site changed and the filing is paused for a human to review the proposed mapping." };
    case "filing.failed":
      if (str("stage") === "bot_challenge") {
        // Nothing was submitted; the engine does not solve or get around a portal's bot check.
        return { audience: "admin", subject: `Portal bot check: ${t}`, body: `The state portal showed a bot check that did not clear on its own (${str("error") ?? "bot challenge"}). Nothing was submitted. File this one by hand, or route this portal through a connection it serves (SITE_PROXIES), then run it again.` };
      }
      return { audience: "admin", subject: `Failed: ${t}`, body: `The filing failed${str("error") ? `: ${str("error")}` : "."}` };
    case "filing.blocked":
      return { audience: "admin", subject: `Blocked: ${t}`, body: `The filing is blocked${Array.isArray(d.blockers) ? `: ${(d.blockers as string[]).join("; ")}` : "."}` };
    case "filing.needs_reconciliation":
      return { audience: "admin", subject: `Needs reconciliation: ${t}`, body: "A submission outcome is unknown and needs a human to reconcile before anything is re-run." };
    default:
      return null;
  }
}
