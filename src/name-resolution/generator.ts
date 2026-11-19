import type { FilingState } from "../domain/filing.js";

/**
 * Yakov's name-unavailability flow: when the client's chosen name is taken, an AI step
 * takes the chosen base name plus the business purpose and proposes alternative base
 * names. The alternatives are availability-checked (see checker.ts) and only the
 * available ones are shown to the admin — never the end client.
 *
 * This is the ONLY place a language model runs in a filing; the deterministic engine
 * drives the browser. A static, deterministic generator is the default and is used in
 * tests and offline; an Anthropic-backed generator is wired when an API key is set.
 */
export interface NameGenerationInput {
  /** The distinctive part of the chosen name, without the designator (e.g. "Acme Partners"). */
  baseName: string;
  designator: string;
  purpose?: string;
  state: FilingState;
  /** How many fresh candidates to aim for. */
  count: number;
  /** Full names already proposed or known taken; do not return these. */
  avoid: string[];
}

export interface NameCandidateGenerator {
  /** Returns candidate BASE names (no designator), best first. May return more than `count`. */
  generate(input: NameGenerationInput): Promise<string[]>;
}

const SUFFIXES = ["Group", "Partners", "Holdings", "Ventures", "Collective", "Works", "Labs", "Solutions", "Advisors", "Enterprises", "Co", "Studio"];
const PREFIXES = ["New", "Prime", "Summit", "Keystone", "Vanguard", "Apex", "Pioneer"];
const STOPWORDS = new Set(["the", "and", "for", "with", "our", "your", "a", "an", "of", "to", "in", "llc", "inc", "corp", "company", "co", "ltd", "lp", "services", "business"]);

/** Words worth reusing from the purpose (capitalised for a name), longest first, deterministic. */
function purposeWords(purpose: string | undefined): string[] {
  if (!purpose) return [];
  const seen = new Set<string>();
  const out: string[] = [];
  for (const raw of purpose.split(/[^A-Za-z]+/)) {
    const w = raw.trim();
    if (w.length < 4 || STOPWORDS.has(w.toLowerCase()) || seen.has(w.toLowerCase())) continue;
    seen.add(w.toLowerCase());
    out.push(w[0]!.toUpperCase() + w.slice(1).toLowerCase());
  }
  return out.sort((a, b) => b.length - a.length);
}

/**
 * Deterministic, offline generator. Combines the base name with business suffixes,
 * prefixes and words drawn from the purpose. Output order is stable for a given input,
 * so tests and reruns are reproducible.
 */
export class StaticNameGenerator implements NameCandidateGenerator {
  async generate(input: NameGenerationInput): Promise<string[]> {
    const base = input.baseName.trim().replace(/\s+/g, " ");
    const avoid = new Set(input.avoid.map((a) => a.toLowerCase().trim()));
    const pwords = purposeWords(input.purpose);
    const candidates: string[] = [];
    const push = (name: string) => {
      const n = name.trim().replace(/\s+/g, " ");
      if (n && n.toLowerCase() !== base.toLowerCase() && !candidates.some((c) => c.toLowerCase() === n.toLowerCase())) candidates.push(n);
    };

    for (const w of pwords) push(`${base} ${w}`);
    for (const s of SUFFIXES) push(`${base} ${s}`);
    for (const w of pwords) for (const s of SUFFIXES) push(`${base} ${w} ${s}`);
    for (const p of PREFIXES) push(`${p} ${base}`);

    // Keep only names not already proposed/taken (compared as base names here; the
    // service appends the designator before the real availability check).
    return candidates.filter((c) => !avoid.has(c.toLowerCase()) && !avoid.has(`${c} ${input.designator}`.toLowerCase()));
  }
}

export interface AnthropicGeneratorOptions {
  apiKey: string;
  model?: string;
  fetchImpl?: typeof fetch;
}

/**
 * Anthropic-backed generator (production). Asks a small, fast model for alternative base
 * names given the taken name and the purpose. Falls back to the static generator's pool
 * on any error or empty/garbled response, so a model outage never blocks a filing.
 */
export class AnthropicNameGenerator implements NameCandidateGenerator {
  private readonly fallback = new StaticNameGenerator();
  constructor(private readonly opts: AnthropicGeneratorOptions) {}

  async generate(input: NameGenerationInput): Promise<string[]> {
    try {
      const names = await this.ask(input);
      const merged = [...names, ...(await this.fallback.generate(input))];
      const seen = new Set<string>();
      return merged.filter((n) => { const k = n.toLowerCase(); if (seen.has(k)) return false; seen.add(k); return true; });
    } catch {
      return this.fallback.generate(input);
    }
  }

  private async ask(input: NameGenerationInput): Promise<string[]> {
    const f = this.opts.fetchImpl ?? fetch;
    const prompt = [
      `A business wants to register in ${input.state} but the name "${input.baseName}" is already taken.`,
      input.purpose ? `The business does: ${input.purpose}.` : "",
      `Propose ${Math.max(input.count, 5)} alternative business names (the distinctive part only, WITHOUT any entity designator like LLC/Inc).`,
      input.avoid.length ? `Do not reuse: ${input.avoid.join(", ")}.` : "",
      `Reply with only the names, one per line, no numbering, no commentary.`,
    ].filter(Boolean).join("\n");
    const res = await f("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: { "content-type": "application/json", "x-api-key": this.opts.apiKey, "anthropic-version": "2023-06-01" },
      body: JSON.stringify({ model: this.opts.model ?? "claude-haiku-5-5", max_tokens: 400, messages: [{ role: "user", content: prompt }] }),
    });
    if (!res.ok) throw new Error(`anthropic ${res.status}`);
    const data = (await res.json()) as { content?: { type: string; text?: string }[] };
    const text = (data.content ?? []).filter((c) => c.type === "text").map((c) => c.text ?? "").join("\n");
    return text.split("\n").map((l) => l.replace(/^[\s\d.)\-*]+/, "").trim()).filter((l) => l.length >= 2 && l.length <= 120);
  }
}
