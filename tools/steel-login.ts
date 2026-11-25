/**
 * Save a sign-in as a Steel profile, for a site routed "steel" whose runs need a logged-in
 * browser: a subscriber's ny.gov business login is profile "nygov:<tenant>", NY DOS accounts are
 * "ny:<tenant>". An operator signs in by hand in Steel's live view; nothing here types or
 * stores a password. The session is plain and unrecorded like every engine session
 * (src/browser/steel.ts), except that its live view accepts input so the operator can sign in.
 *
 *   npm run steel-login -- nygov:keystone https://my.ny.gov/
 *
 * Then add the printed "profileKey=profileId" to STEEL_PROFILES. Running it again for a key
 * already in STEEL_PROFILES refreshes that profile.
 */
import readline from "node:readline/promises";
import { config } from "../src/config.js";
import { createSteelSession, redact } from "../src/browser/steel.js";

const say = (line: string) => console.log(redact(line, config.steel.apiKey));
const [profileKey, startUrl] = process.argv.slice(2);
if (!profileKey || !startUrl) {
  say("usage: npm run steel-login -- <profileKey> <sign-in URL>     e.g. nygov:keystone https://my.ny.gov/");
  process.exit(2);
}
const existing = config.steel.profiles[profileKey];
const session = await createSteelSession({
  apiKey: config.steel.apiKey, apiUrl: config.steel.apiUrl, connectUrl: config.steel.connectUrl,
  interactive: true, persistProfile: true, ...(existing ? { profileId: existing } : {}),
  timeoutMs: 15 * 60_000, dimensions: { width: 1280, height: 1600 },
});
try {
  const { chromium } = await import("playwright");
  const browser = await chromium.connectOverCDP(session.connectUrl, { headers: session.headers, timeout: 60_000 });
  const context = browser.contexts()[0] ?? (await browser.newContext());
  const page = context.pages()[0] ?? (await context.newPage());
  await page.goto(startUrl, { waitUntil: "domcontentloaded", timeout: 60_000 });
  say(`Open this link in your browser and sign in (including any verification code):\n\n  ${session.debugUrl ?? "(Steel returned no live-view link; open the session in the Steel dashboard)"}\n`);
  say("The link controls a live browser: do not share it. Press Enter here once you are signed in.");
  const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
  await rl.question("");
  rl.close();
  say(`Signed-in page: ${(await page.title().catch(() => "")) || page.url()}`);
  await browser.close();
} catch (e) {
  say(`Sign-in session failed: ${(e as Error).message.split("\n")[0]}`);
  process.exitCode = 1;
} finally {
  await session.release(); // Steel saves the profile when the session ends
}
if (!process.exitCode) {
  const info = await session.info().catch(() => ({} as { profileId?: string }));
  const id = info.profileId ?? session.profileId ?? existing;
  say(id ? `\nSaved. STEEL_PROFILES entry: ${profileKey}=${id}` : "\nSteel reported no profile id; check the session in the Steel dashboard.");
}
