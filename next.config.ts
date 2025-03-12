/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone", // ✅ Fix: Use standalone to support API routes
  distDir: ".next",
};

export default nextConfig;
