import { createHash } from "node:crypto";

/**
 * Decision 7: the live run must reproduce the state's review page the client approved. Two
 * renderings of the same filing differ only in what changes per session: today's date, times,
 * the dry run's placeholder EIN against the real one, session ids. Those are blanked, the rest
 * is compared. Only the hash is kept: the page shows names, addresses and sometimes an SSN.
 */
export function reviewFingerprint(pageText: string): string {
  const MONTH = "(?:jan|feb|mar|apr|may|jun|jul|aug|sep|sept|oct|nov|dec)[a-z]*\\.?";
  const norm = pageText
    .toLowerCase()
    .replace(new RegExp(`\\b${MONTH}\\s+\\d{1,2},?\\s+\\d{4}\\b`, "g"), "<date>")
    .replace(/\b\d{1,2}[/.-]\d{1,2}[/.-]\d{2,4}\b/g, "<date>")
    .replace(/\b\d{4}-\d{2}-\d{2}(?:t[\d:.]+z?)?\b/g, "<date>")
    .replace(/\b\d{1,2}:\d{2}(?::\d{2})?\s*(?:am|pm)?\b/g, "<time>")
    .replace(/\b\d{2}-\d{7}\b/g, "<ein>")
    .replace(/\b(?=[a-z0-9]*\d)[a-z0-9]{16,}\b/g, "<id>")
    .replace(/\s+/g, " ")
    .trim();
  return createHash("sha256").update(norm).digest("hex");
}
