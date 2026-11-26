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
    ];
  },
};
export default nextConfig;
