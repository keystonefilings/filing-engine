import type { WebhookEvent } from "../domain/events.js";
import type { FilingRecord } from "../store/types.js";
import { businessName, filingTypeTitle } from "../approvals/titles.js";
import { letterBody, type Block, type Run } from "./letter.js";

export interface RenderedMessage {
  /** client = the filing company's client / end customer; admin = the filing company's staff;
   *  card_owner = whoever's card pays the state (the event names them). */
  audience: "client" | "admin" | "card_owner";
  subject: string;
  /** The words, as every channel sends them; built from blocks. */
  body: string;
  link?: string;
  /** The email button's text; "Open" when not set. */
  linkLabel?: string;
  screenshotArtifactId?: string;
  /** The same words in the parts the email lays out (merged spec 10D.2). */
  blocks: Block[];
  /** The filing's title, the second half of the subject ("Completed: ‹title›"), set as the headline's second line. */
  title: string;
}

function title(filing: FilingRecord): string {
  const r = filing.request;
  const name = r.formation ? `${r.formation.name.baseName} ${r.formation.name.designator}` : r.payroll?.legalName ?? r.standing?.entityName ?? "";
  return `${r.state} ${r.type.replace(/_/g, " ")}${name ? `: ${name}` : ""}`;
}

const mono = (text: string): Run => ({ text, mono: true });
const p = (...runs: Run[]): Block => ({ type: "p", runs });
const marked = (mark: "ochre" | "madder", ...runs: Run[]): Block => ({ type: "p", runs, mark });

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
  const msg = (audience: RenderedMessage["audience"], subject: string, blocks: Block[], extra: Partial<RenderedMessage> = {}): RenderedMessage =>
    ({ audience, subject, body: letterBody({ blocks }), blocks, title: t, ...extra });
  switch (event.type) {
    case "filing.awaiting_approval": {
      const fees = Array.isArray(d.fees) ? (d.fees as { amountUsd?: unknown }[]).filter((f) => typeof f.amountUsd === "number") : [];
      const total = fees.reduce((s, f) => s + (f.amountUsd as number), 0);
      const kind = filingTypeTitle(filing.request);
      const name = businessName(filing.request) ?? kind;
      return msg("client", `Your proof is ready to approve: ${t}`, [
        ...(d.dryRun === true ? [{ type: "rehearsal", text: "Rehearsal: nothing will be filed or paid, even if you approve." } as Block] : []),
        p("Your proof is ready. Open the link to see every detail and every fee, exactly as they'll go to the state, then approve it or ask for changes. Nothing is filed or paid until you approve. The link expires, so please look soon. Don't forward this email: anyone with the link can open your proof."),
        // The proof's head, as the proof itself names it (10D.6); its total as the proof sets it.
        { type: "proof", title: name, ...(kind !== name ? { kind } : {}), chip: "Ready to approve", ...(fees.length ? { totalLabel: "Total to the state", total: `$${total.toFixed(2)}` } : {}) },
      ], { link, linkLabel: "Open your proof" });
    }
    case "filing.information_required": {
      const items = Array.isArray(d.missing) ? (d.missing as { label: string }[]).map((m) => m.label) : [];
      return msg("client", `More information needed: ${t}`, [
        { type: "list", lead: "Before we can file, we still need:", items, after: "Please send these details to whoever is preparing this filing for you. Nothing is filed or paid until then." },
      ]);
    }
    case "filing.card_code_needed": {
      const card = str("card");
      return msg("card_owner", `Card security code needed: ${t}`, [
        p("This filing is approved and ready to pay the state with ", card ? { text: card, strong: true } : "your saved card", ". A card's security code (the 3 or 4 digits on the card) isn't saved with the card, so we need you to enter it once: log in and open Ready to pay with the button below. Every filing waiting for this card then goes ahead. We keep the code for an hour at most, then delete it. Never reply to this email with the code."),
        ...(card ? [{ type: "card", card, chip: "Ready to pay" } as Block] : []),
      ], { linkLabel: "Enter security code" });
    }
    case "filing.changes_requested":
      return msg("client", `Changes requested: ${t}`, [
        { type: "quote", lead: "We received your change request", ...(str("comment") ? { quote: str("comment") } : {}), after: "Nothing has been filed. If the filing is corrected, you'll get a new link to approve." },
      ]);
    case "filing.completed":
      return msg("client", `Completed: ${t}`, [str("reference") ? p("This filing is complete (state reference ", mono(str("reference")!), ").") : p("This filing is complete.")]);
    case "filing.rejected":
      return msg("client", `Rejected by the state: ${t}`, [
        marked("madder", `The state rejected this filing${str("reason") ? `: ${str("reason")}` : "."} Nothing more will be filed until it's corrected and sent again. Contact whoever prepared this filing for you to fix it.`),
      ]);
    case "filing.name_options_ready":
      return msg("admin", `Choose a name: ${t}`, [p("The requested name is unavailable. Open the link to pick an available alternative or enter one.")], { link, linkLabel: "Choose a name" });
    case "filing.review_gate":
      return msg("admin", `Review before submit: ${t}`, [p("The filing reached the review screen (beta). Review the captured screen and approve to submit.")], { link, linkLabel: "Review the filing", screenshotArtifactId: str("screenshotArtifactId") });
    case "filing.drift_halted":
      return msg("admin", `Site changed — review needed: ${t}`, [marked("ochre", "The state changed its website, so this filing stopped before it was submitted. Nothing was filed or paid. Our team is checking the change, and your client may be asked to approve again.")]);
    case "filing.failed":
      if (str("stage") === "bot_challenge") {
        // Nothing was submitted; the engine does not solve or get around a portal's bot check.
        return msg("admin", `Portal bot check: ${t}`, [marked("madder", "The state portal showed a bot check that did not clear on its own (", mono(str("error") ?? "bot challenge"), "). Nothing was submitted. CoFile doesn't get around these checks, so please file this one by hand on the state's website.")]);
      }
      return msg("admin", `Failed: ${t}`, [str("error") ? marked("madder", "The filing failed: ", mono(str("error")!)) : marked("madder", "The filing failed.")]);
    case "filing.blocked":
      return msg("admin", `Blocked: ${t}`, [Array.isArray(d.blockers) ? marked("ochre", "The filing is blocked: ", mono((d.blockers as string[]).join("; "))) : marked("ochre", "The filing is blocked.")]);
    case "filing.needs_reconciliation":
      return msg("admin", `Checking whether the state received: ${t}`, [marked("ochre", "We can't yet tell whether the state received this filing. Please don't file it again: our team is checking what the state received, and the filing won't be re-run until we know.")]);
    default:
      return null;
  }
}

/**
 * The EIN on its own (decision 34; merged spec 10D.8): sent only when a filing completes with an EIN the IRS
 * issued but without the IRS's letter (CP 575) among its documents, which shouldn't happen, so the firm is never
 * left without the number. Normally the number arrives on the CP 575's row of the documents-back email.
 * Its subject and sentence are stand-ins until the copy owner writes them (`[copy needed]`, 10D.18).
 */
export function renderEinIssued(filing: FilingRecord, ein: string): RenderedMessage {
  const t = title(filing);
  const blocks: Block[] = [
    p("The IRS has issued the EIN for this filing."),
    { type: "plate", label: "EIN", value: ein },
  ];
  return { audience: "client", subject: `EIN issued: ${t}`, body: letterBody({ blocks }), blocks, title: t };
}
