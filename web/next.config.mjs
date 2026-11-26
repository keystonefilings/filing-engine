/** @type {import('next').NextConfig} */
const nextConfig = {
  poweredByHeader: false,
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
      // Nothing may be framed except the website widget's pages (V39), which carry no session.
      { source: "/:path((?!embed/).*)", headers: [...common, { key: "X-Frame-Options", value: "DENY" }] },
      { source: "/embed/:path*", headers: [...common, { key: "Content-Security-Policy", value: "frame-ancestors *" }] },
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
