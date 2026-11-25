/** V23: which answers a new filing copies from an earlier one for the same client (see past-clients.ts). */
const COPY = [
  /^contact\./,
  /^formation\.mainBusinessAddress\./, /^formation\.mailingAddress\./,
  /^formation\.members\.0\.(name|address\.)/, /^formation\.signers\.0\.(name|title)$/, /^formation\.organizer\.(name|address\.)/,
  /^payroll\.(businessAddress|mailingAddress)\./,
];

/** Form answers (path -> value) from an earlier filing's request, limited to the client's own details. */
export function answersFrom(request: unknown): Record<string, string> {
  const out: Record<string, string> = {};
  const walk = (v: unknown, path: string) => {
    if (v === null || v === undefined) return;
    if (Array.isArray(v)) { v.forEach((x, i) => walk(x, `${path}.${i}`)); return; }
    if (typeof v === "object") { for (const [k, x] of Object.entries(v)) walk(x, path ? `${path}.${k}` : k); return; }
    if (COPY.some((re) => re.test(path)) && !/\*/.test(String(v))) out[path] = String(v);
  };
  walk(request, "");
  return out;
}
