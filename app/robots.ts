// robots.txt 동적 생성: 전체 허용 + 사이트맵 URL 지정
import type { MetadataRoute } from "next"
import { SITE_CONFIG } from "@/lib/constants"

export default function robots(): MetadataRoute.Robots {
  return {
    // 모든 크롤러에게 전체 경로 허용
    rules: {
      userAgent: "*",
      allow: "/",
    },
    // 사이트맵 절대 URL 지정 (검색엔진 크롤러에게 사이트맵 위치 안내)
    sitemap: `${SITE_CONFIG.url}/sitemap.xml`,
  }
}
