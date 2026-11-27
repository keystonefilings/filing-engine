import { readdirSync } from "node:fs";

// The licensed fonts present when the site is built (scripts/licensed-fonts.mjs puts them in public/fonts). Read
// here, at build time, because the server functions a host runs the site in don't carry public/ with them.
const licensedFontFiles = (() => {
  try { return readdirSync(new URL("./public/fonts/", import.meta.url)).filter((f) => f.endsWith(".woff2")).sort(); } catch { return []; }
})();

/** @type {import('next').NextConfig} */
const nextConfig = {
  poweredByHeader: false,
  env: { LICENSED_FONT_FILES: licensedFontFiles.join(",") },
  reactStrictMode: true,
  // Decision 19: intake forms carry PDF uploads (two of 10 MB at most), above the 1 MB default.
  experimental: { serverActions: { bodySizeLimit: "21mb" } },
  async headers() {
    const common = [
      { key: "X-Content-Type-Options", value: "nosniff" },
      { key: "Referrer-Policy", value: "same-origin" },
      { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
    ];
    return [
      // Nothing may be framed except the website widget's pages (V39), which carry no session, and the internal QA
      // gallery's own surfaces (app/design/gallery), which only the gallery itself may frame.
      { source: "/:path((?!embed/|design/gallery/frame|cofile/qa-gallery/).*)", headers: [...common, { key: "X-Frame-Options", value: "DENY" }] },
      { source: "/embed/:path*", headers: [...common, { key: "Content-Security-Policy", value: "frame-ancestors *" }] },
      { source: "/design/gallery/frame", headers: [...common, { key: "X-Frame-Options", value: "SAMEORIGIN" }] },
      { source: "/cofile/qa-gallery/:path*", headers: [...common, { key: "X-Frame-Options", value: "SAMEORIGIN" }] },
      // The proof is served by the engine (ENGINE_PUBLIC_URL) and sets in the licensed fonts served here: only that
      // origin may load them across origins (the web license covers our own domains only).
      ...(process.env.ENGINE_PUBLIC_URL ? [{ source: "/fonts/:file*", headers: [
        { key: "Access-Control-Allow-Origin", value: new URL(process.env.ENGINE_PUBLIC_URL).origin },
        { key: "Vary", value: "Origin" },
        { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
      ] }] : []),
    ];
  },
};
export default nextConfig;
