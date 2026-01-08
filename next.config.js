// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "i.ibb.co",
        pathname: "/**",
      },
    ],
    unoptimized: true, // Disable image optimization to prevent 500 errors
  },
};

module.exports = nextConfig;
