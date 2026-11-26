/**
 * Typographic highlighting for the docs' code samples (merged spec 10C.16, decision 36): no syntax colors. Keys,
 * keywords and literals are set heavier, strings and everything else regular, comments grey. Wherever the literal
 * `"dryRun": true` or the path `/dry-run` appears, its tokens carry the rehearsal mark.
 */
export type CodeLang = "bash" | "python" | "javascript" | "json" | "http";
export type TokenKind = "key" | "kw" | "lit" | "str" | "com" | "txt";
export interface Token { text: string; kind: TokenKind; rehearsal?: boolean }

const KEYWORDS: Record<CodeLang, Set<string>> = {
  bash: new Set(["curl"]),
  python: new Set(["import", "from", "def", "return", "if", "else", "elif", "for", "in", "not", "and", "or", "as", "with", "class", "try", "except", "raise", "lambda", "pass", "is"]),
  javascript: new Set(["import", "from", "export", "function", "const", "let", "var", "return", "if", "else", "new", "await", "async", "typeof", "of", "in", "for", "throw"]),
  json: new Set(),
  http: new Set(["GET", "POST", "PUT", "DELETE", "PATCH"]),
};
const LITERALS = new Set(["true", "false", "null", "undefined", "None", "True", "False"]);
const REHEARSAL = /"dryRun"\s*:\s*true|\/dry-run\b/g;

function push(out: Token[], text: string, kind: TokenKind) {
  if (!text) return;
  const last = out[out.length - 1];
  if (last && last.kind === kind && kind === "txt") last.text += text;
  else out.push({ text, kind });
}

/** Splits source into tokens whose texts, joined, are exactly the source. */
export function tokenize(src: string, lang: CodeLang): Token[] {
  if (lang === "http") return tokenizeHttp(src);
  const out: Token[] = [];
  const n = src.length;
  let i = 0;
  const lineComment = lang === "javascript" ? "//" : lang === "json" ? null : "#";
  while (i < n) {
    const c = src[i]!;
    const prev = i > 0 ? src[i - 1]! : "\n";
    if (lineComment && src.startsWith(lineComment, i) && (lineComment === "//" || /\s/.test(prev))) {
      let j = src.indexOf("\n", i);
      if (j < 0) j = n;
      push(out, src.slice(i, j), "com");
      i = j;
      continue;
    }
    if (c === '"' || c === "'" || (c === "`" && lang === "javascript")) {
      let j = i + 1;
      while (j < n && src[j] !== c) { if (src[j] === "\\") j++; j++; }
      j = Math.min(j + 1, n);
      const s = src.slice(i, j);
      // A shell argument holding JSON (curl -d '{…}') is set as JSON inside its quotes.
      if (lang === "bash" && c === "'" && /^'\s*[[{]/.test(s) && s.endsWith("'")) {
        push(out, "'", "txt");
        for (const t of tokenize(s.slice(1, -1), "json")) push(out, t.text, t.kind);
        push(out, "'", "txt");
        i = j;
        continue;
      }
      let k = j;
      while (k < n && (src[k] === " " || src[k] === "\t")) k++;
      push(out, s, src[k] === ":" && lang !== "bash" ? "key" : "str");
      i = j;
      continue;
    }
    if (/[0-9]/.test(c) && !/[A-Za-z_$]/.test(prev)) {
      const m = /^\d[\d_]*(\.\d+)?([eE][+-]?\d+)?/.exec(src.slice(i))!;
      push(out, m[0], "lit");
      i += m[0].length;
      continue;
    }
    if (lang === "bash" && c === "-" && /\s/.test(prev)) {
      const m = /^--?[A-Za-z][\w-]*/.exec(src.slice(i));
      if (m) { push(out, m[0], "kw"); i += m[0].length; continue; }
    }
    if (/[A-Za-z_$]/.test(c)) {
      const m = /^[A-Za-z_$][\w$]*/.exec(src.slice(i))!;
      const w = m[0];
      push(out, w, LITERALS.has(w) ? "lit" : KEYWORDS[lang].has(w) ? "kw" : "txt");
      i += w.length;
      continue;
    }
    push(out, c, "txt");
    i++;
  }
  return out;
}

/** An HTTP request: the method, header names as keys, a JSON body. */
function tokenizeHttp(src: string): Token[] {
  const out: Token[] = [];
  const lines = src.split("\n");
  lines.forEach((line, li) => {
    if (li) push(out, "\n", "txt");
    const req = /^([A-Z]+)( .*)$/.exec(line);
    const head = /^([A-Za-z0-9-]+)(:.*)$/.exec(line);
    if (req && KEYWORDS.http.has(req[1]!)) { push(out, req[1]!, "kw"); push(out, req[2]!, "txt"); }
    else if (/^\s*[[{]/.test(line)) for (const t of tokenize(line, "json")) push(out, t.text, t.kind);
    else if (head) { push(out, head[1]!, "key"); push(out, head[2]!, "txt"); }
    else push(out, line, "txt");
  });
  return out;
}

/** Marks the tokens inside each `"dryRun": true` and `/dry-run`, splitting tokens at the mark's edges. */
export function markRehearsal(tokens: Token[]): Token[] {
  const src = tokens.map((t) => t.text).join("");
  const ranges: [number, number][] = [];
  for (const m of src.matchAll(REHEARSAL)) ranges.push([m.index!, m.index! + m[0].length]);
  if (!ranges.length) return tokens;
  const inside = (p: number) => ranges.some(([a, b]) => p >= a && p < b);
  const cuts = new Set(ranges.flat());
  const out: Token[] = [];
  let at = 0;
  for (const t of tokens) {
    let start = 0;
    for (let k = 1; k <= t.text.length; k++) {
      if (k === t.text.length || cuts.has(at + k)) {
        const text = t.text.slice(start, k);
        if (text) out.push({ text, kind: t.kind, ...(inside(at + start) ? { rehearsal: true } : {}) });
        start = k;
      }
    }
    at += t.text.length;
  }
  return out;
}

/** The source as lines of tokens, each line's tokens free of newlines. */
export function highlight(src: string, lang: CodeLang): Token[][] {
  const lines: Token[][] = [[]];
  for (const t of markRehearsal(tokenize(src, lang))) {
    const parts = t.text.split("\n");
    parts.forEach((p, i) => {
      if (i) lines.push([]);
      if (p) lines[lines.length - 1]!.push({ ...t, text: p });
    });
  }
  return lines;
}

/** Whether a piece of prose or a path carries the rehearsal mark. */
export function isRehearsal(text: string): boolean {
  REHEARSAL.lastIndex = 0;
  return new RegExp(REHEARSAL.source).test(text);
}
