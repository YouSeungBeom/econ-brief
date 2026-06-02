// 뉴스 아티클 카드 컴포넌트: 목록에서 단일 뉴스 항목을 카드 형태로 표시
import Link from "next/link"
import Image from "next/image"
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { TagBadge } from "@/components/news/TagBadge"
import type { NewsArticle } from "@/lib/types"

interface NewsCardProps {
  // 렌더링할 뉴스 아티클 데이터
  article: NewsArticle
}

// 발행일을 한국어 형식으로 포맷하는 헬퍼 함수
function formatDate(dateStr: string): string {
  return new Intl.DateTimeFormat("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(dateStr))
}

export function NewsCard({ article }: NewsCardProps) {
  // 태그는 최대 3개까지만 표시
  const visibleTags = article.tags.slice(0, 3)

  return (
    // stretched link 패턴: <a> 중첩 방지 — Link는 absolute로 카드 전체 커버, 태그는 z-10으로 위에 노출
    <Card className="relative h-full transition-shadow hover:shadow-md">
      <Link
        href={`/news/${article.id}`}
        className="absolute inset-0 z-0 rounded-xl"
        aria-label={article.title}
      />

      {/* 썸네일 영역: 이미지 없으면 회색 플레이스홀더 */}
      <div className="relative aspect-video w-full overflow-hidden rounded-t-xl">
        {article.thumbnail ? (
          <Image
            src={article.thumbnail}
            alt={article.title}
            fill
            className="object-cover"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        ) : (
          <div className="h-full w-full bg-muted" />
        )}
      </div>

      {/* 카테고리 배지 + 발행일 */}
      <CardHeader>
        <div className="flex items-center justify-between gap-2">
          <Badge variant="secondary" className="shrink-0">
            {article.category}
          </Badge>
          <span className="text-xs text-muted-foreground">
            {formatDate(article.published)}
          </span>
        </div>
        {/* 제목: 최대 2줄 */}
        <CardTitle className="line-clamp-2 text-sm font-semibold leading-snug">
          {article.title}
        </CardTitle>
      </CardHeader>

      {/* 요약: 최대 3줄 */}
      <CardContent>
        <p className="line-clamp-3 text-xs text-muted-foreground leading-relaxed">
          {article.summary}
        </p>
      </CardContent>

      {/* 태그 배지 목록: z-10으로 stretched link 위에 노출 */}
      {visibleTags.length > 0 && (
        <CardFooter className="relative z-10 flex flex-wrap gap-1">
          {visibleTags.map((tag) => (
            <TagBadge key={tag} tag={tag} />
          ))}
        </CardFooter>
      )}
    </Card>
  )
}
