// 홈 페이지: HeroSection + CategoryTabs + NewsGrid 조합
import type { Metadata } from "next"
import Link from "next/link"
import { X } from "lucide-react"
import { HeroSection } from "@/components/news/HeroSection"
import { CategoryTabs } from "@/components/news/CategoryTabs"
import { NewsGrid } from "@/components/news/NewsGrid"
import { getNewsArticles, getNewsArticlesByTag } from "@/lib/notion"
import { SITE_CONFIG } from "@/lib/constants"

// 홈 페이지 정적 메타데이터 (layout template → "최신 경제 뉴스 | Econ Brief")
export const metadata: Metadata = {
  title: "최신 경제 뉴스",
  description: SITE_CONFIG.description,
  openGraph: {
    url: "/",
    type: "website",
  },
  // 정규 URL: 쿼리 파라미터(?tag=...) 있는 URL을 정규 URL로 통합
  alternates: { canonical: "/" },
}

export const revalidate = 3600

interface HomePageProps {
  // ?tag= 쿼리 파라미터로 태그 필터 수신 (searchParams는 Next.js 16에서 Promise)
  searchParams: Promise<{ tag?: string }>
}

export default async function HomePage({ searchParams }: HomePageProps) {
  const { tag } = await searchParams
  // URL 인코딩된 태그 값을 디코딩
  const decodedTag = tag ? decodeURIComponent(tag) : undefined

  // 태그 필터가 있으면 해당 태그 뉴스만, 없으면 전체 조회
  const articles = decodedTag
    ? await getNewsArticlesByTag(decodedTag)
    : await getNewsArticles()

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      <HeroSection articles={articles.slice(0, 3)} />
      <CategoryTabs />

      {/* 태그 필터 활성 시 현재 태그 표시 배너 */}
      {decodedTag && (
        <div className="flex items-center gap-2 rounded-lg bg-muted px-4 py-2 text-sm">
          <span>
            태그: <strong>{decodedTag}</strong>
          </span>
          <Link
            href="/"
            className="ml-auto flex items-center gap-1 text-muted-foreground hover:text-foreground transition-colors"
          >
            <X className="size-3" />
            전체 보기
          </Link>
        </div>
      )}

      <NewsGrid articles={articles} />
    </div>
  )
}
