import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    dangerouslyAllowSVG: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "api.dicebear.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "res.cloudinary.com", // ✅ ক্লাউডিনারি ডোমেন যুক্ত করা হলো
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;