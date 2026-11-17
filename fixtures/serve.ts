import http from "node:http";
import { readFile, stat } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.dirname(fileURLToPath(import.meta.url));
const TYPES: Record<string, string> = { ".html": "text/html", ".css": "text/css", ".js": "text/javascript" };

/**
 * Serves the wizard replicas captured from the walks so the engine can be developed
 * and tested without touching a government site. `?variant=drift` swaps in the
 * drift versions of pages (e.g. payment-drift.html) to exercise the review flow.
 */
export function startFixtureServer(port = 0): Promise<{ url: string; close: () => Promise<void>; setVariant: (v: string | null) => void }> {
  let variant: string | null = null;
  const server = http.createServer(async (req, res) => {
    const url = new URL(req.url ?? "/", "http://x");
    let p = url.pathname === "/" ? "/nj-formation/welcome.html" : url.pathname;
    if (variant && p.endsWith(".html")) {
      const alt = p.replace(/\.html$/, `-${variant}.html`);
      try { await stat(path.join(ROOT, alt)); p = alt; } catch { /* no variant for this page */ }
    }
    try {
      const body = await readFile(path.join(ROOT, p));
      res.writeHead(200, { "content-type": TYPES[path.extname(p)] ?? "application/octet-stream" });
      res.end(body);
    } catch {
      res.writeHead(404); res.end("not found");
    }
  });
  return new Promise((resolve) => {
    server.listen(port, "127.0.0.1", () => {
      const addr = server.address() as { port: number };
      resolve({
        url: `http://127.0.0.1:${addr.port}`,
        close: () => new Promise((r) => server.close(() => r())),
        setVariant: (v) => { variant = v; },
      });
    });
  });
}

if (process.argv[1] && fileURLToPath(import.meta.url) === path.resolve(process.argv[1])) {
  startFixtureServer(Number(process.env.FIXTURE_PORT ?? 4310)).then((s) => console.log(`fixtures at ${s.url}/nj-formation/welcome.html`));
}
