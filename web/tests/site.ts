/**
 * The pages the automated checks cover (web/design/BUILDING.md, "The automated checks"), and what they share: how a
 * page is opened and brought to rest before it is measured or photographed.
 */
import type { Page } from "@playwright/test";

export interface SitePage { path: string; name: string; group: "site" | "account" | "docs" | "gallery" }

/** CoFile's public pages: the site, sign-up and the account pages, the docs, and the not-found page. */
export const PUBLIC_PAGES: SitePage[] = [
  { path: "/", name: "home", group: "site" },
  { path: "/how-it-works", name: "how-it-works", group: "site" },
  { path: "/for-firms", name: "for-firms", group: "site" },
  { path: "/what-we-file", name: "what-we-file", group: "site" },
  { path: "/pricing", name: "pricing", group: "site" },
  { path: "/security", name: "security", group: "site" },
  { path: "/faq", name: "faq", group: "site" },
  { path: "/platforms", name: "platforms", group: "site" },
  { path: "/terms", name: "terms", group: "site" },
  { path: "/privacy", name: "privacy", group: "site" },
  { path: "/this-page-does-not-exist", name: "not-found", group: "site" },
  { path: "/signup", name: "signup", group: "account" },
  { path: "/signup/sent", name: "signup-sent", group: "account" },
  { path: "/login", name: "login", group: "account" },
  { path: "/forgot-password", name: "forgot-password", group: "account" },
  { path: "/reset-password", name: "reset-password", group: "account" },
  { path: "/verify-email", name: "verify-email", group: "account" },
  { path: "/invite-expired", name: "invite-expired", group: "account" },
  { path: "/docs", name: "docs", group: "docs" },
  { path: "/docs/filings", name: "docs-filings", group: "docs" },
  { path: "/docs/reference", name: "docs-reference", group: "docs" },
];

/** The design gallery: served only with DESIGN_GALLERY=true, which the checks' server sets. */
export const GALLERY_PAGES: SitePage[] = [
  { path: "/design", name: "design", group: "gallery" },
  { path: "/design/site", name: "design-site", group: "gallery" },
  { path: "/design/pictures", name: "design-pictures", group: "gallery" },
];

export const ALL_PAGES = [...PUBLIC_PAGES, ...GALLERY_PAGES];

/** Phone, small phone, tablet and desktop (merged spec 13.1), each with a screen height of that class of device. */
export const VIEWPORTS = {
  320: { width: 320, height: 640 },
  390: { width: 390, height: 844 },
  834: { width: 834, height: 1112 },
  1440: { width: 1440, height: 900 },
} as const;
export type Width = keyof typeof VIEWPORTS;

/** Anything not served by the site under test (the Google Fonts stylesheet and the like): refused, so a check never waits on the network. */
export async function blockOtherHosts(page: Page, base: string): Promise<void> {
  const own = new URL(base).host;
  await page.route((url) => url.host !== own, (route) => route.abort());
}

/**
 * Opens a page and brings it to rest: every lazy picture loaded, the fonts in, the moving pictures in their final
 * state (the contexts ask for reduced motion, which the site honours: merged spec 12.5).
 */
export async function openAtRest(page: Page, path: string): Promise<void> {
  await page.goto(path, { waitUntil: "load" });
  await page.evaluate(async () => {
    for (const img of Array.from(document.images)) { if (img.loading === "lazy") img.loading = "eager"; }
    await Promise.all(Array.from(document.images).map((img) => (img.complete ? null : new Promise((r) => { img.addEventListener("load", r, { once: true }); img.addEventListener("error", r, { once: true }); }))));
    await document.fonts.ready;
    await new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r)));
  });
}
