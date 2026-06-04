// 동적 사이트맵 생성: 홈 + 카테고리 + 개별 뉴스 URL 포함
import type { MetadataRoute } from "next"
import { CATEGORIES, SITE_CONFIG } from "@/lib/constants"
import { getAllArticleIds } from "@/lib/notion"

// 24시간마다 재생성 (Notion DB 업데이트 주기 고려)
export const revalidate = 86400

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // 발행된 모든 뉴스 ID 조회
  const articleIds = await getAllArticleIds()

  // 카테고리 페이지 경로 목록 (all 제외)
  const categoryRoutes: MetadataRoute.Sitemap = CATEGORIES
    .filter((c) => c.id !== "all")
    .map((c) => ({
      url: `${SITE_CONFIG.url}/category/${c.id}`,
      changeFrequency: "daily" as const,
      priority: 0.8,
    }))

  // 개별 뉴스 페이지 경로 목록
  const articleRoutes: MetadataRoute.Sitemap = articleIds.map((id) => ({
    url: `${SITE_CONFIG.url}/news/${id}`,
    changeFrequency: "weekly" as const,
    priority: 0.6,
  }))

  return [
    // 홈 페이지: 가장 높은 우선순위
    {
      url: SITE_CONFIG.url,
      changeFrequency: "daily",
      priority: 1.0,
      lastModified: new Date(),
    },
    ...categoryRoutes,
    ...articleRoutes,
  ]
}
