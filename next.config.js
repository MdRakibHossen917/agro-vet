// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "i.ibb.co", // এখানে external domain টা allow করো
      },
    ],
  },
};

module.exports = nextConfig;
