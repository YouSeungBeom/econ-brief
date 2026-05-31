// 뉴스 상세 페이지
// TODO: Notion 페이지 ID로 아티클 및 블록 데이터 페칭

import type { Metadata } from "next"
import { notFound } from "next/navigation"

// 동적 라우트 파라미터 타입
interface PageProps {
  params: Promise<{ id: string }>
}

// 아티클 제목을 title에 반영하는 동적 메타데이터
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params
  // TODO: getNewsArticle(id)로 title 조회 후 반영
  return {
    title: `뉴스 상세 | Econ Brief`,
    description: `Econ Brief 경제 뉴스 상세 페이지 (id: ${id})`,
  }
}

// ISR용 정적 경로 사전 생성
export async function generateStaticParams() {
  // TODO: getAllArticleIds() 연결
  return []
}

export default async function NewsDetailPage({ params }: PageProps) {
  const { id } = await params

  // TODO: getNewsArticle(id) 호출 후 null이면 notFound() 처리
  if (!id) notFound()

  return (
    <article className="container mx-auto px-4 py-8 max-w-3xl">
      {/* TODO: 아티클 헤더 (제목, 카테고리, 발행일, 태그) */}
      {/* TODO: 썸네일 이미지 */}
      {/* TODO: NotionRenderer 컴포넌트로 본문 블록 렌더링 */}
      <p className="text-muted-foreground text-center py-20">
        콘텐츠 준비 중입니다.
      </p>
    </article>
  )
}
