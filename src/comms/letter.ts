/**
 * What an email says, in parts (merged spec 10D.2): the product's words, with the few pieces the design sets
 * apart (the rehearsal line, a list, a quoted comment, the documents and their EIN, the state's review page)
 * lifted out of the prose as data. Every part has a text form, and the message's body is built from them,
 * so the email, its plain-text part, the message record and the other channels carry the same words.
 */

/** A run of text inside a paragraph: plain, a value set in mono (a reference, an error), or set in 600. */
export type Run = string | { text: string; mono?: boolean; strong?: boolean };

export type Block =
  /** The rehearsal line, set in the dashed band under the headline (10D.5). */
  | { type: "rehearsal"; text: string }
  /** A paragraph. mark: the 2 px left rule of a notice (10D.11, 10D.12). small: `small` Graphite. */
  | { type: "p"; runs: Run[]; mark?: "ochre" | "madder"; small?: boolean }
  /** "Before we can file, we still need:", each item on its own line, then the sentence after (10D.10). */
  | { type: "list"; lead: string; items: string[]; after: string }
  /** "We received your change request:", the comment as a quote, then the sentence after (10D.11). */
  | { type: "quote"; lead: string; quote?: string; after: string }
  /** The proof card under the body of "Your proof is ready" (10D.6). Email only: it repeats the proof's data,
   *  so the body and the plain-text part leave it out, as 10D.17's sample does. */
  | { type: "proof"; title: string; kind?: string; chip: string; totalLabel?: string; total?: string }
  /** The card slip of "Card security code needed" (10D.9). Email only. */
  | { type: "card"; card: string; chip: string }
  /** The documents that came back, one row each, the EIN on the CP 575's row (10D.7, decision 34). */
  | { type: "documents"; label: string; docs: { name: string; ein?: string }[]; after: string[] }
  /** A value the reader keeps, in a plate: the EIN of the fallback email (10D.8). */
  | { type: "plate"; label: string; value: string }
  /** The state's review page, attached, shown beside its paragraph after the button (10D.6). */
  | { type: "review"; text: string; alt: string; contentId?: string };

/** The firm's Letterhead, for the emails that reach its clients (10D.3). */
export interface FirmLetterhead {
  /** The name its desk shows ("Name shown on the filing desk", else its name). */
  name: string;
  /**
   * The processed logo; width and height are its natural pixels when known, for sizing by area. `plate` when the
   * url serves it on its baked white plate (src/brand/logo-plate.ts), so the email sizes it with the plate's margin.
   */
  logo?: { url: string; width?: number; height?: number; plate?: boolean };
  primaryColor?: string;
  secondaryColor?: string;
  /** The firm's font when it is one of the Google presets (3.7). */
  font?: { family: string; href: string };
}

export interface Letter {
  /** Whose letterhead: "cofile" for the firm, a subscriber's staff and CoFile's account emails; "firm" for
   *  the firm's clients, with nothing of CoFile on it (decisions 2 and 12). */
  side: "cofile" | "firm";
  /** CoFile's letterhead only: the firm the filing belongs to, named above the headline (10D.5, decision 33). */
  context?: string;
  /** The subject as the headline; where it joins a phrase and a filing with ": ", the two halves (10D.5). */
  headline: { phrase: string; title?: string };
  blocks: Block[];
  /** Side "firm": the firm's Letterhead. */
  firm?: FirmLetterhead;
  /** CoFile's letterhead: the support address, set in the foot as "Questions? Email ‹address›." (10D.5). */
  support?: string;
  /**
   * Where one of the two engraved vignettes goes (decision 35): the returned envelope on documents back, the
   * blank Name Plate on the welcome emails. The engravings aren't drawn yet, so the slot is left empty.
   */
  vignette?: "envelope" | "blank-plate";
}

export const runText = (r: Run): string => (typeof r === "string" ? r : r.text);
export const runsText = (runs: Run[]): string => runs.map(runText).join("");

/** A block's words as they read in the message body, or null for a part only the email shows. */
export function blockText(b: Block): string | null {
  switch (b.type) {
    case "rehearsal": return b.text;
    case "p": return runsText(b.runs);
    case "list": return `${b.lead} ${b.items.join(", ")}. ${b.after}`;
    case "quote": return b.quote !== undefined ? `${b.lead}: "${b.quote}". ${b.after}` : `${b.lead}. ${b.after}`;
    case "documents": return `${b.label} ${b.docs.map((d) => d.name).join("; ")}.${b.after.map((s) => ` ${s}`).join("")}`;
    case "review": return b.text;
    case "plate": return `${b.label} ${b.value}`;
    case "proof": case "card": return null;
  }
}

export const supportLine = (address: string) => `Questions? Email ${address}.`;

/** The message body: the blocks' words, a blank line between paragraphs, and the support line last. */
export function letterBody(l: Pick<Letter, "blocks" | "support">): string {
  const parts = l.blocks.map(blockText).filter((t): t is string => t !== null);
  if (l.support) parts.push(supportLine(l.support));
  return parts.join("\n\n");
}

/** Splits a subject that joins a phrase and a filing title, keeping every character: "Completed: ‹title›". */
export function headlineOf(subject: string, title?: string): Letter["headline"] {
  if (title && subject.endsWith(`: ${title}`) && subject.length > title.length + 2) {
    return { phrase: subject.slice(0, subject.length - title.length - 1), title };
  }
  return { phrase: subject };
}

const SUPPORT = /^Questions\? Email (\S+@\S+?)\.$/;

/**
 * A letter for a message written as plain prose (the account emails, replies to requests sent by email):
 * CoFile's letterhead, the subject as a one-line headline, the body's paragraphs as written, and a closing
 * "Questions? Email ‹address›." moved into the foot. strong: words set in 600 where they appear (a firm's
 * name as typed at sign-up, 10D.13).
 */
export function proseLetter(subject: string, body: string, opts: { strong?: string[]; context?: string; vignette?: Letter["vignette"] } = {}): Letter {
  const paragraphs = body.split(/\n{2,}/).map((p) => p.trim()).filter(Boolean);
  let support: string | undefined;
  const last = paragraphs.at(-1);
  const m = last ? SUPPORT.exec(last) : null;
  if (m) { support = m[1]; paragraphs.pop(); }
  const strong = (opts.strong ?? []).filter((s) => s.length > 0);
  const runsOf = (p: string): Run[] => {
    for (const s of strong) {
      const at = p.indexOf(s);
      if (at >= 0) return [...runsOf(p.slice(0, at)), { text: s, strong: true }, ...runsOf(p.slice(at + s.length))].filter((r) => runText(r) !== "");
    }
    return [p];
  };
  return {
    side: "cofile",
    ...(opts.context ? { context: opts.context } : {}),
    headline: { phrase: subject },
    blocks: paragraphs.map((p) => ({ type: "p", runs: runsOf(p) })),
    ...(support ? { support } : {}),
    ...(opts.vignette ? { vignette: opts.vignette } : {}),
  };
}
