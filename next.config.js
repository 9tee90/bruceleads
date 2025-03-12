/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone", // ✅ Fix: Use standalone to support API routes
  distDir: ".next",
};

module.exports = nextConfig; 