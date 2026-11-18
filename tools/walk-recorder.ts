/**
 * Walk recorder: a person drives a visible browser through a government site; every
 * screen is captured automatically (screenshot, HTML, field inventory, page text) and
 * any button that would submit or pay is blocked unless explicitly allowed.
 *
 *   npm run walk -- <walk-name> --url <start url> [--allow "Pay Now"] [--proxy http://host:port]
 *
 * --allow lets a named button through ONCE per recording. Every later click on a button
 * with that label is blocked again: a payment gateway's own final button may carry the
 * same label ("Pay Now") and must never get through.
 *
 * Output: walks/<YYYY-MM-DD>/<walk-name>/NN-<page>.{png,html,json,txt}
 * Sensitive inputs (SSN/ITIN, passwords, card and bank numbers) are masked in screenshots
 * and their values are never written to the HTML or JSON.
 * Terminal: press Enter to capture the current screen by hand, type q + Enter to finish.
 */
import { chromium, type BrowserContext, type Page } from "playwright";
import { mkdirSync, writeFileSync, readdirSync } from "node:fs";
import path from "node:path";
import readline from "node:readline";
import { fileURLToPath } from "node:url";
import { collectInventory } from "../src/resolver/inventory.js";

export const DEFAULT_BLOCK = /\b(pay|payment|submit|purchase|place order|file now|sign and file|confirm (and )?pay|authorize|complete (order|filing|purchase))\b/i;
export const SENSITIVE = /ssn|social security|itin|taxpayer id|\btin\b|password|passcode|card ?number|cvv|cvc|security code|account ?number|routing|acct/i;

export interface RecorderOptions {
  walk: string;
  url: string;
  outRoot?: string;
  allow?: string[];
  proxy?: string | null;
  headless?: boolean;
  profileDir?: string;
  date?: string;
}

/** Runs inside every page: masks sensitive fields and blocks submit/pay controls. */
function guardScript(args: { block: string; allow: string[]; sensitive: string }) {
  const block = new RegExp(args.block, "i");
  const sensitive = new RegExp(args.sensitive, "i");
  const allow = args.allow.map((a) => a.trim().toLowerCase());
  const labelOf = (el: Element | null): string => {
    if (!el) return "";
    const e = el as HTMLInputElement;
    return ((e.tagName === "INPUT" ? e.value : "") || e.getAttribute("aria-label") || e.textContent || "").replace(/\s+/g, " ").trim();
  };
  const isBlocked = (el: Element | null) => {
    const label = labelOf(el);
    if (!label || label.length > 60) return false;
    return block.test(label) && !allow.includes(label.toLowerCase());
    // Allowed labels are not "blocked" here; the click handler routes them through the one-use grant.
  };
  const banner = (label: string) => {
    let b = document.getElementById("__walk_banner");
    if (!b) {
      b = document.createElement("div");
      b.id = "__walk_banner";
      b.style.cssText = "position:fixed;top:0;left:0;right:0;z-index:2147483647;background:#b00020;color:#fff;font:16px sans-serif;padding:12px;text-align:center";
      document.documentElement.appendChild(b);
    }
    b.textContent = `Blocked by the walk recorder: "${label}". Walks stop before anything is submitted or paid.`;
    setTimeout(() => b?.remove(), 6000);
  };
  type Passable = Element & { __walkPass?: boolean };
  const clickable = (t: EventTarget | null) => (t as Element | null)?.closest?.("button, input[type=submit], input[type=button], input[type=image], a, [role=button]") ?? null;
  // Looked up at click time: the recorder attaches it after this script is registered.
  const consume = () => (window as unknown as { __walkConsumeAllow?: (l: string) => Promise<boolean> }).__walkConsumeAllow;
  document.addEventListener("click", (ev) => {
    const el = clickable(ev.target) as Passable | null;
    if (el?.__walkPass) {
      // Re-dispatched after the recorder granted its one allowed use; the flag also lets the
      // resulting form submit through, then it is cleared.
      setTimeout(() => { delete el.__walkPass; }, 0);
      (window as unknown as { __walkClicked?: () => void }).__walkClicked?.();
      return;
    }
    if (el && isBlocked(el)) { ev.preventDefault(); ev.stopImmediatePropagation(); banner(labelOf(el)); return; }
    const label = el ? labelOf(el) : "";
    if (el && label && block.test(label) && allow.includes(label.toLowerCase())) {
      // Allowed label: hold the click and ask the recorder whether its single use is still available.
      ev.preventDefault(); ev.stopImmediatePropagation();
      const fn = consume();
      void (fn ? fn(label) : Promise.resolve(false)).then((ok) => {
        if (ok) { el.__walkPass = true; (el as HTMLElement).click(); } else banner(`${label} (already used once in this recording)`);
      });
      return;
    }
    (window as unknown as { __walkClicked?: () => void }).__walkClicked?.();
  }, true);
  document.addEventListener("submit", (ev) => {
    const form = ev.target as HTMLFormElement;
    const submitter = ((ev as SubmitEvent).submitter ?? form.querySelector("button[type=submit], button:not([type]), input[type=submit]")) as Passable | null;
    if (submitter?.__walkPass) return;
    const label = submitter ? labelOf(submitter) : "";
    if (submitter && label && block.test(label) && label.length <= 60) { ev.preventDefault(); ev.stopImmediatePropagation(); banner(label); }
  }, true);
  const mask = () => {
    for (const el of Array.from(document.querySelectorAll<HTMLInputElement>("input"))) {
      const id = el.id ? document.querySelector(`label[for="${CSS.escape(el.id)}"]`)?.textContent ?? "" : "";
      const hint = `${el.name} ${el.id} ${el.getAttribute("aria-label") ?? ""} ${el.placeholder ?? ""} ${id} ${el.autocomplete ?? ""}`;
      if (el.type === "password" || sensitive.test(hint)) {
        el.setAttribute("data-walk-sensitive", "1");
        (el.style as unknown as Record<string, string>).webkitTextSecurity = "disc";
      }
    }
  };
  document.addEventListener("DOMContentLoaded", mask);
  new MutationObserver(mask).observe(document, { childList: true, subtree: true });
}

export async function startRecorder(o: RecorderOptions) {
  const date = o.date ?? new Date().toISOString().slice(0, 10);
  const outDir = path.resolve(o.outRoot ?? "walks", date, o.walk);
  mkdirSync(outDir, { recursive: true });
  const profile = path.resolve(o.profileDir ?? path.join("var", "walk-profiles", o.walk));
  mkdirSync(profile, { recursive: true });
  const context: BrowserContext = await chromium.launchPersistentContext(profile, {
    headless: o.headless ?? false,
    viewport: { width: 1280, height: 1000 },
    ...(o.proxy ? { proxy: { server: o.proxy } } : {}),
  });
  await context.addInitScript(guardScript, { block: DEFAULT_BLOCK.source, allow: o.allow ?? [], sensitive: SENSITIVE.source });

  let busy = Promise.resolve();
  let lastSig = "";
  const captures: string[] = [];
  const capture = (page: Page, reason: string) => {
    busy = busy.then(async () => {
      try {
        await page.waitForLoadState("domcontentloaded");
        await page.waitForTimeout(700);
        const inv = await collectInventory(page);
        for (const f of inv.fields) delete f.value; // never persist typed values
        const sig = JSON.stringify([page.url(), inv.headings, inv.fields.map((f) => [f.label, f.kind, f.visible, f.checked])]);
        if (sig === lastSig && reason !== "manual") return;
        lastSig = sig;
        const n = String(readdirSync(outDir).filter((f) => f.endsWith(".png")).length + 1).padStart(2, "0");
        const slug = (new URL(page.url()).pathname.split("/").filter(Boolean).pop() ?? "page").replace(/[^a-z0-9]+/gi, "-").slice(0, 40).toLowerCase() || "page";
        const base = path.join(outDir, `${n}-${slug}`);
        await page.screenshot({ path: `${base}.png`, fullPage: true });
        const html = await page.evaluate(() => {
          const clone = document.documentElement.cloneNode(true) as HTMLElement;
          clone.querySelectorAll("[data-walk-sensitive]").forEach((e) => e.removeAttribute("value"));
          clone.querySelector("#__walk_banner")?.remove();
          return "<!doctype html>\n" + clone.outerHTML;
        });
        writeFileSync(`${base}.html`, html);
        writeFileSync(`${base}.json`, JSON.stringify({ capturedAt: new Date().toISOString(), reason, ...inv }, null, 2));
        writeFileSync(`${base}.txt`, `URL: ${page.url()}\n\n` + (await page.locator("body").innerText()).replace(/\n{2,}/g, "\n"));
        captures.push(base);
        console.log(`captured ${path.basename(base)}  (${reason})  ${page.url()}`);
      } catch (e) {
        console.warn(`capture skipped: ${(e as Error).message.split("\n")[0]}`);
      }
    });
    return busy;
  };

  const watch = async (page: Page) => {
    await page.exposeFunction("__walkClicked", () => { setTimeout(() => void capture(page, "after click"), 1200); }).catch(() => {});
    page.on("load", () => void capture(page, "page load"));
  };
  // One use per allowed label for the whole recording, kept on this side so page loads cannot reset it.
  const remaining = new Map((o.allow ?? []).map((a) => [a.trim().toLowerCase(), 1]));
  await context.exposeFunction("__walkConsumeAllow", (label: string) => {
    const k = label.trim().toLowerCase();
    const n = remaining.get(k) ?? 0;
    if (n <= 0) return false;
    remaining.set(k, n - 1);
    console.log(`allowed once: "${label}" (no further uses in this recording)`);
    return true;
  });
  context.on("page", (p) => void watch(p));
  const page = context.pages()[0] ?? (await context.newPage());
  await watch(page);
  await page.goto(o.url, { waitUntil: "domcontentloaded" });

  return {
    context, page, outDir, captures,
    captureNow: () => capture(context.pages()[context.pages().length - 1] ?? page, "manual"),
    stop: async () => { await busy; await context.close(); },
  };
}

function parseArgs(argv: string[]) {
  const walk = argv[0];
  const get = (flag: string) => { const i = argv.indexOf(flag); return i >= 0 ? argv[i + 1] : undefined; };
  const allow: string[] = [];
  argv.forEach((a, i) => { if (a === "--allow" && argv[i + 1]) allow.push(argv[i + 1]!); });
  return { walk, url: get("--url"), allow, proxy: get("--proxy") ?? process.env.BROWSER_PROXY ?? null, headless: argv.includes("--headless") };
}

if (process.argv[1] && fileURLToPath(import.meta.url) === path.resolve(process.argv[1])) {
  const a = parseArgs(process.argv.slice(2));
  if (!a.walk || !a.url) {
    console.error('usage: npm run walk -- <walk-name> --url <start url> [--allow "Pay Now"] [--proxy http://host:port]');
    process.exit(2);
  }
  const r = await startRecorder({ walk: a.walk, url: a.url, allow: a.allow, proxy: a.proxy, headless: a.headless });
  console.log(`Recording "${a.walk}" into ${r.outDir}`);
  console.log(`Blocked: buttons like Pay / Submit / Purchase${a.allow.length ? ` (allowed once each: ${a.allow.join(", ")})` : ""}.`);
  console.log("Press Enter to capture the current screen; type q and Enter to finish.");
  const rl = readline.createInterface({ input: process.stdin });
  rl.on("line", async (line) => {
    if (line.trim().toLowerCase() === "q") { rl.close(); await r.stop(); console.log(`Done: ${r.captures.length} screens in ${r.outDir}`); process.exit(0); }
    await r.captureNow();
  });
  r.context.on("close", () => { console.log(`Browser closed: ${r.captures.length} screens in ${r.outDir}`); process.exit(0); });
}
