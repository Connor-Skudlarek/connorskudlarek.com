import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Fully static site: Apache on Lightsail serves the exported files directly,
  // so there is no Node process to supervise or restart.
  output: "export",
  // Every route exports as a directory with index.html, which Apache serves
  // without any rewrite rules.
  trailingSlash: true,
  images: { unoptimized: true },
};

export default nextConfig;
