import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Serve the demo's CDN photos from our own origin: the rail uses them as CSS
  // masks, and cross-origin mask images are blocked without CORS headers.
  async rewrites() {
    return [{ source: "/rail-assets/:path*", destination: "https://cdn.21st.dev/assets/mirror/:path*" }];
  },
};

export default nextConfig;
