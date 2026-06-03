import type { NextConfig } from "next";

// Notion 및 외부 이미지 도메인 허용 목록
const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "**.amazonaws.com" },
      { protocol: "https", hostname: "**.notion.so" },
      { protocol: "https", hostname: "notion.so" },
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "**.pstatic.net" },
    ],
  },
};

export default nextConfig;
