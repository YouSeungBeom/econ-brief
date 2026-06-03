// 카테고리별 뉴스 목록 페이지
import type { Metadata } from "next"
import { CATEGORIES } from "@/lib/constants"
import type { CategoryId } from "@/lib/constants"
import { CategoryTabs } from "@/components/news/CategoryTabs"
import { NewsGrid } from "@/components/news/NewsGrid"
import { getNewsArticlesByCategory } from "@/lib/notion"

// 동적 라우트 파라미터 타입
interface PageProps {
  params: Promise<{ category: CategoryId }>
}

export const revalidate = 3600

// 카테고리명을 title에 반영하는 동적 메타데이터
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { category } = await params
  const found = CATEGORIES.find((c) => c.id === category)
  const label = found?.label ?? category

  return {
    title: `${label} | Econ Brief`,
    description: `${label} 카테고리의 경제 뉴스 요약`,
  }
}

// ISR용 정적 경로 사전 생성 (all 제외)
export async function generateStaticParams() {
  return CATEGORIES.filter((c) => c.id !== "all").map((c) => ({ category: c.id }))
}

export default async function CategoryPage({ params }: PageProps) {
  const { category } = await params
  const found = CATEGORIES.find((c) => c.id === category)
  // CATEGORIES id("macro") → Notion select label("거시경제") 변환 후 쿼리
  const label = found?.label ?? category

  // Notion DB는 영어 id("macro")로 필터링, 표시용 label은 별도 변환
  const articles = await getNewsArticlesByCategory(category)

  return (
    <div className="container mx-auto px-4 py-8 space-y-6">
      <h1 className="text-2xl font-bold">{label}</h1>
      <CategoryTabs activeCategory={category} />
      <NewsGrid articles={articles} />
    </div>
  )
}
