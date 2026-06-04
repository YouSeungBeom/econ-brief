// 홈 페이지: HeroSection + CategoryTabs + NewsGrid 조합
import { Suspense } from "react"
import type { Metadata } from "next"
import Link from "next/link"
import { X } from "lucide-react"
import { Skeleton } from "@/components/ui/skeleton"
import { HeroSection } from "@/components/news/HeroSection"
import { CategoryTabs } from "@/components/news/CategoryTabs"
import { NewsGrid } from "@/components/news/NewsGrid"
import { getNewsArticles, getNewsArticlesByTag } from "@/lib/notion"
import { SITE_CONFIG } from "@/lib/constants"
import type { NewsArticle } from "@/lib/types"

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

// searchParams를 page 레벨에서 await하지 않으므로 ISR 적용 가능
export const revalidate = 3600

interface HomePageProps {
  // ?tag= 쿼리 파라미터로 태그 필터 수신 (searchParams는 Next.js 16에서 Promise)
  searchParams: Promise<{ tag?: string }>
}

// 태그 필터에 의존하는 동적 영역 — Suspense로 감싸 정적 셸과 분리
async function TagFilteredSection({
  searchParams,
  defaultArticles,
}: {
  searchParams: Promise<{ tag?: string }>
  defaultArticles: NewsArticle[]
}) {
  const { tag } = await searchParams
  const decodedTag = tag ? decodeURIComponent(tag) : undefined

  // 태그 있으면 Notion 조회, 없으면 이미 가져온 목록 재사용 (이중 fetch 방지)
  const articles = decodedTag
    ? await getNewsArticlesByTag(decodedTag)
    : defaultArticles

  return (
    <>
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
            <X className="size-3" aria-hidden="true" />
            전체 보기
          </Link>
        </div>
      )}
      <NewsGrid articles={articles} />
    </>
  )
}

// NewsGrid 스켈레톤 — TagFilteredSection 로딩 중 표시
function NewsGridSkeleton() {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="flex flex-col gap-3 rounded-xl overflow-hidden ring-1 ring-foreground/10">
          <Skeleton className="aspect-video w-full" />
          <div className="flex flex-col gap-2 p-4 pt-0">
            <div className="flex items-center gap-2">
              <Skeleton className="h-5 w-16 rounded-full" />
              <Skeleton className="h-4 w-20" />
            </div>
            <Skeleton className="h-5 w-full" />
            <Skeleton className="h-5 w-4/5" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
          </div>
        </div>
      ))}
    </div>
  )
}

export default async function HomePage({ searchParams }: HomePageProps) {
  // HeroSection은 항상 최신 뉴스 표시 — searchParams 무관하게 ISR 캐시 적용
  const heroArticles = await getNewsArticles()

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      <HeroSection articles={heroArticles.slice(0, 3)} />
      <CategoryTabs />
      {/* 태그 필터 영역은 Suspense로 분리 — 정적 셸(HeroSection·탭)과 독립적으로 스트리밍 */}
      <Suspense fallback={<NewsGridSkeleton />}>
        <TagFilteredSection searchParams={searchParams} defaultArticles={heroArticles} />
      </Suspense>
    </div>
  )
}
