// 뉴스 상세 페이지
import type { Metadata } from "next"
import Image from "next/image"
import { notFound } from "next/navigation"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { TagBadge } from "@/components/news/TagBadge"
import { NotionRenderer } from "@/components/news/NotionRenderer"
import { getNewsArticle, getNewsBlocks, getAllArticleIds } from "@/lib/notion"

// 동적 라우트 파라미터 타입
interface PageProps {
  params: Promise<{ id: string }>
}

export const revalidate = 3600

// 발행일을 한국어 형식으로 포맷하는 헬퍼 함수
function formatDate(dateStr: string): string {
  return new Intl.DateTimeFormat("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(dateStr))
}

// 아티클 제목을 title에 반영하는 동적 메타데이터
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params
  const article = await getNewsArticle(id)
  if (!article) {
    return { title: "뉴스를 찾을 수 없습니다 | Econ Brief" }
  }
  return {
    title: `${article.title} | Econ Brief`,
    description: article.summary,
  }
}

// ISR용 정적 경로 사전 생성 (Notion DB의 Published 아티클 ID 기반)
export async function generateStaticParams() {
  const ids = await getAllArticleIds()
  return ids.map((id) => ({ id }))
}

export default async function NewsDetailPage({ params }: PageProps) {
  const { id } = await params
  const article = await getNewsArticle(id)
  // 존재하지 않는 ID 접근 시 404 페이지로 이동
  if (!article) notFound()

  const blocks = await getNewsBlocks(id)

  return (
    <article className="container mx-auto px-4 py-8 max-w-3xl space-y-6">
      {/* 아티클 헤더: 카테고리 배지 + 제목 + 발행일 */}
      <header className="space-y-3">
        <div className="flex items-center gap-3">
          <Badge variant="secondary">{article.category}</Badge>
          <time className="text-sm text-muted-foreground">
            {formatDate(article.published)}
          </time>
        </div>
        <h1 className="text-3xl font-bold leading-tight">{article.title}</h1>
      </header>

      {/* 썸네일 이미지 (없으면 영역 자체 생략) */}
      {article.thumbnail && (
        <div className="relative aspect-video w-full overflow-hidden rounded-xl">
          <Image
            src={article.thumbnail}
            alt={article.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 768px"
          />
        </div>
      )}

      {/* AI 요약 강조 블록 */}
      {article.summary && (
        <aside className="rounded-lg border-l-4 border-primary bg-muted/50 p-4 space-y-1">
          <p className="text-xs font-semibold uppercase tracking-wide text-primary">요약</p>
          <p className="leading-relaxed text-foreground">{article.summary}</p>
        </aside>
      )}

      {/* Notion 본문 블록 렌더링 */}
      <NotionRenderer blocks={blocks} />

      {/* 태그 배지 목록 */}
      {article.tags.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {article.tags.map((tag) => (
            <TagBadge key={tag} tag={tag} />
          ))}
        </div>
      )}

      {/* 원문 링크 버튼 (source가 있을 때만 렌더링) */}
      {article.source && (
        <div>
          <Button asChild variant="outline">
            <a href={article.source} target="_blank" rel="noopener noreferrer">
              원문 보기
            </a>
          </Button>
        </div>
      )}
    </article>
  )
}
