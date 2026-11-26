import type { WebhookEvent } from "../domain/events.js";
import type { FilingRecord } from "../store/types.js";

export interface RenderedMessage {
  /** client = the filing company's client / end customer; admin = the filing company's staff;
   *  card_owner = whoever's card pays the state (the event names them). */
  audience: "client" | "admin" | "card_owner";
  subject: string;
  body: string;
  link?: string;
  /** The email button's text; "Open" when not set. */
  linkLabel?: string;
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
      return { audience: "client", subject: `Your proof is ready to approve: ${t}`, body: `${d.dryRun === true ? "Rehearsal: nothing will be filed or paid, even if you approve.\n\n" : ""}Your proof is ready. Open the link to see every detail and every fee, exactly as they'll go to the state, then approve it or ask for changes. Nothing is filed or paid until you approve. The link expires, so please look soon. Don't forward this email: anyone with the link can open your proof.`, link, linkLabel: "Open your proof" };
    case "filing.information_required": {
      const missing = Array.isArray(d.missing) ? (d.missing as { label: string }[]).map((m) => m.label).join(", ") : "";
      return { audience: "client", subject: `More information needed: ${t}`, body: `Before we can file, we still need: ${missing}. Please send these details to whoever is preparing this filing for you. Nothing is filed or paid until then.` };
    }
    case "filing.card_code_needed":
      return { audience: "card_owner", subject: `Card security code needed: ${t}`, body: `This filing is approved and ready to pay the state with ${str("card") ?? "your saved card"}. A card's security code (the 3 or 4 digits on the card) isn't saved with the card, so we need you to enter it once: log in and open Ready to pay with the button below. Every filing waiting for this card then goes ahead. We keep the code for an hour at most, then delete it. Never reply to this email with the code.`, linkLabel: "Enter security code" };
    case "filing.changes_requested":
      return { audience: "client", subject: `Changes requested: ${t}`, body: `We received your change request${str("comment") ? `: "${str("comment")}".` : "."} Nothing has been filed. If the filing is corrected, you'll get a new link to approve.` };
    case "filing.completed":
      return { audience: "client", subject: `Completed: ${t}`, body: `This filing is complete${str("reference") ? ` (state reference ${str("reference")})` : ""}.` };
    case "filing.rejected":
      return { audience: "client", subject: `Rejected by the state: ${t}`, body: `The state rejected this filing${str("reason") ? `: ${str("reason")}` : "."} Nothing more will be filed until it's corrected and sent again. Contact whoever prepared this filing for you to fix it.` };
    case "filing.name_options_ready":
      return { audience: "admin", subject: `Choose a name: ${t}`, body: "The requested name is unavailable. Open the link to pick an available alternative or enter one.", link, linkLabel: "Choose a name" };
    case "filing.review_gate":
      return { audience: "admin", subject: `Review before submit: ${t}`, body: "The filing reached the review screen (beta). Review the captured screen and approve to submit.", link, linkLabel: "Review the filing", screenshotArtifactId: str("screenshotArtifactId") };
    case "filing.drift_halted":
      return { audience: "admin", subject: `Site changed — review needed: ${t}`, body: "The state changed its website, so this filing stopped before it was submitted. Nothing was filed or paid. Our team is checking the change, and your client may be asked to approve again." };
    case "filing.failed":
      if (str("stage") === "bot_challenge") {
        // Nothing was submitted; the engine does not solve or get around a portal's bot check.
        return { audience: "admin", subject: `Portal bot check: ${t}`, body: `The state portal showed a bot check that did not clear on its own (${str("error") ?? "bot challenge"}). Nothing was submitted. CoFile doesn't get around these checks, so please file this one by hand on the state's website.` };
      }
      return { audience: "admin", subject: `Failed: ${t}`, body: `The filing failed${str("error") ? `: ${str("error")}` : "."}` };
    case "filing.blocked":
      return { audience: "admin", subject: `Blocked: ${t}`, body: `The filing is blocked${Array.isArray(d.blockers) ? `: ${(d.blockers as string[]).join("; ")}` : "."}` };
    case "filing.needs_reconciliation":
      return { audience: "admin", subject: `Checking whether the state received: ${t}`, body: "We can't yet tell whether the state received this filing. Please don't file it again: our team is checking what the state received, and the filing won't be re-run until we know." };
    default:
      return null;
  }
}
