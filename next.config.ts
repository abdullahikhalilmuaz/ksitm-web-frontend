import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  images: {
    domains: [
      "localhost",
      "ksitm-backend-api.onrender.com", // Your backend
      "ksitm-library.vercel.app", // Your Vercel domain
    ],
  },
};

export default nextConfig;
