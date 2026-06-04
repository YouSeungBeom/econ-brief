import type { NextConfig } from "next";

// Notion 및 외부 이미지 도메인 허용 목록
const nextConfig: NextConfig = {
  images: {
    // AVIF 우선 제공 후 WebP 폴백 — 동일 품질 대비 더 작은 파일 크기
    formats: ["image/avif", "image/webp"],
    // Notion signed URL 만료 주기(1시간)에 맞춰 최소 캐시 TTL 설정
    minimumCacheTTL: 3600,
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
