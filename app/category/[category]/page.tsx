// 카테고리별 뉴스 목록 페이지
// TODO: Notion에서 카테고리 필터링된 뉴스 데이터 페칭

import type { Metadata } from "next"
import { CATEGORIES } from "@/lib/constants"
import type { CategoryId } from "@/lib/constants"

// 동적 라우트 파라미터 타입
interface PageProps {
  params: Promise<{ category: CategoryId }>
}

// 카테고리명을 title에 반영하는 동적 메타데이터
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  // params는 Next.js 16에서 Promise로 변경됨
  const { category } = await params
  const found = CATEGORIES.find((c) => c.id === category)
  const label = found?.label ?? category

  return {
    title: `${label} | Econ Brief`,
    description: `${label} 카테고리의 경제 뉴스 요약`,
  }
}

// ISR용 정적 경로 사전 생성
export async function generateStaticParams() {
  // TODO: getAllArticleIds() 연결 후 개별 카테고리 경로도 추가
  return CATEGORIES.map((c) => ({ category: c.id }))
}

export default async function CategoryPage({ params }: PageProps) {
  const { category } = await params
  const found = CATEGORIES.find((c) => c.id === category)
  const label = found?.label ?? category

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-6 text-2xl font-bold">{label}</h1>
      {/* TODO: 카테고리 필터링된 NewsGrid 컴포넌트 추가 */}
      <p className="text-muted-foreground text-center py-20">
        콘텐츠 준비 중입니다.
      </p>
    </div>
  )
}
