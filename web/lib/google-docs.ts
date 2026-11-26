import type { Filing } from "./engine";

/**
 * Portal only (decision of Nov 26): a partner firm saves a filing's record as a Google Doc in its
 * own Google account. Never offered to enterprise accounts. The Doc is written once from what the
 * portal shows. People's Social Security numbers and ITINs (and signatures, logins and card
 * details) are left out entirely, not just masked; the business's own EIN is kept.
 */
export const DOCS_SCOPE = "https://www.googleapis.com/auth/documents";

const LEAVE_OUT = /(ssn|itin|password|token|secret|signature|totp|cvc|cardNumber)/i;
const SKIP_TOP = new Set(["tenantId", "clientCompanyId", "idempotencyKey", "intake", "approvalRecipients", "dryRun"]);

export interface DocContent {
  title: string;
  /** The whole body, inserted at the start of the new Doc. */
  text: string;
  /** Lines to style as headings: UTF-16 offsets into `text`, end exclusive. */
  headings: { start: number; end: number; level: 1 | 2 }[];
}

/** "baseName" -> "Base name", "mainBusinessAddress" -> "Main business address". */
export function label(key: string): string {
  const words = key.replace(/([a-z0-9])([A-Z])/g, "$1 $2").replace(/[_-]+/g, " ").trim().toLowerCase();
  const fixed = words.replace(/\b(ein|llc|ny|nj|fl|mo|irs|dos|id|zip|ui|nys)\b/g, (w) => w.toUpperCase());
  return fixed.charAt(0).toUpperCase() + fixed.slice(1);
}

function lines(value: unknown, prefix: string, out: string[]): void {
  if (value === null || value === undefined || value === "") return;
  if (Array.isArray(value)) {
    value.forEach((v, i) => lines(v, `${prefix} ${i + 1}`, out));
    return;
  }
  if (typeof value === "object") {
    for (const [k, v] of Object.entries(value as Record<string, unknown>)) {
      if (LEAVE_OUT.test(k)) continue;
      lines(v, prefix ? `${prefix}, ${label(k).toLowerCase()}` : label(k), out);
    }
    return;
  }
  const v = typeof value === "boolean" ? (value ? "Yes" : "No") : String(value);
  out.push(`${prefix}: ${v}`);
}

/** The Doc for one filing: who, what, where it stands, every detail filed, and the documents kept. */
export function filingDocContent(f: Filing, o: { title: string; statusLabel: string; firmName: string; filingUrl: string; kindTitle?: string; now: Date }): DocContent {
  let text = "";
  const headings: DocContent["headings"] = [];
  const heading = (s: string, level: 1 | 2) => { const start = text.length; text += `${s}\n`; headings.push({ start, end: start + s.length, level }); };
  const para = (s: string) => { text += `${s}\n`; };

  heading(o.title, 1);
  para(`${o.kindTitle ?? `${f.request.state} ${f.request.type.replace(/_/g, " ")}`}, for ${o.firmName}.`);
  para(`Status: ${o.statusLabel}${f.request.dryRun ? " (practice filing: nothing was filed or paid)" : ""}.`);
  para(`Started ${new Date(f.createdAt).toUTCString()}; this record was saved ${o.now.toUTCString()}.`);
  if (f.ein) para(`EIN: ${f.ein}`);
  para(`Filing reference: ${f.id}`);
  para(`In the portal: ${o.filingUrl}`);

  for (const [k, v] of Object.entries(f.request)) {
    if (SKIP_TOP.has(k) || LEAVE_OUT.test(k) || k === "type" || k === "state") continue;
    const out: string[] = [];
    lines(v, "", out);
    if (!out.length) continue;
    heading(label(k), 2);
    for (const l of out) para(l);
  }

  const auths = ((f.request.intake as { portal?: { authorizations?: { text: string; grantedBy?: string; grantedAt?: string }[] } } | undefined)?.portal?.authorizations) ?? [];
  if (auths.length) {
    heading("Authorizations given", 2);
    for (const a of auths) para(`${a.text}${a.grantedBy ? ` (by ${a.grantedBy}${a.grantedAt ? `, ${new Date(a.grantedAt).toUTCString()}` : ""})` : ""}`);
  }
  if (f.artifacts.length) {
    heading("Documents kept in the portal", 2);
    for (const a of f.artifacts) para(a.label);
  }
  para("People's Social Security numbers and ITINs are left out of this record.");
  return { title: `${o.title}: filing record`.slice(0, 200), text, headings };
}

/** The Docs API batchUpdate requests that write the content into a new, empty Doc. */
export function docRequests(c: DocContent): unknown[] {
  const reqs: unknown[] = [{ insertText: { location: { index: 1 }, text: c.text } }];
  for (const h of c.headings) {
    reqs.push({
      updateParagraphStyle: {
        range: { startIndex: 1 + h.start, endIndex: 1 + h.end },
        paragraphStyle: { namedStyleType: h.level === 1 ? "HEADING_1" : "HEADING_2" },
        fields: "namedStyleType",
      },
    });
  }
  return reqs;
}

/** Creates the Doc in the signed-in Google account and returns its id. */
export async function createGoogleDoc(accessToken: string, c: DocContent, fetchImpl: typeof fetch = fetch): Promise<string> {
  const auth = { authorization: `Bearer ${accessToken}`, "content-type": "application/json" };
  const made = await fetchImpl("https://docs.googleapis.com/v1/documents", { method: "POST", headers: auth, body: JSON.stringify({ title: c.title }), signal: AbortSignal.timeout(20_000) });
  if (!made.ok) throw new Error(`Google Docs refused to create the document (${made.status})`);
  const { documentId } = (await made.json()) as { documentId?: string };
  if (!documentId) throw new Error("Google Docs returned no document id");
  const filled = await fetchImpl(`https://docs.googleapis.com/v1/documents/${encodeURIComponent(documentId)}:batchUpdate`, {
    method: "POST", headers: auth, body: JSON.stringify({ requests: docRequests(c) }), signal: AbortSignal.timeout(20_000),
  });
  if (!filled.ok) throw new Error(`Google Docs refused the document's text (${filled.status})`);
  return documentId;
}
