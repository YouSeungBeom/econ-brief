// 뉴스 카드 그리드 컴포넌트: NewsCard 배열을 반응형 격자로 표시, 빈 상태 UI 포함
import Link from "next/link"
import { Newspaper } from "lucide-react"
import { Button } from "@/components/ui/button"
import { NewsCard } from "@/components/news/NewsCard"
import type { NewsArticle } from "@/lib/types"

interface NewsGridProps {
  // 표시할 뉴스 아티클 목록
  articles: NewsArticle[]
}

// 뉴스가 없을 때 표시할 빈 상태 UI
function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center gap-6 px-4 py-24 text-center">
      <div className="flex size-16 items-center justify-center rounded-full bg-muted">
        <Newspaper className="size-8 text-muted-foreground" />
      </div>
      <div className="space-y-2">
        <h2 className="text-xl font-semibold">아직 뉴스가 없습니다</h2>
        <p className="text-muted-foreground">
          새로운 경제 뉴스가 곧 업데이트될 예정입니다.
        </p>
      </div>
      <Button asChild>
        <Link href="/">홈으로 돌아가기</Link>
      </Button>
    </div>
  )
}

export function NewsGrid({ articles }: NewsGridProps) {
  if (articles.length === 0) {
    return <EmptyState />
  }

  return (
    // 반응형 그리드: 모바일 1열 → 태블릿 2열 → 데스크톱 3열
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {articles.map((article) => (
        <NewsCard key={article.id} article={article} />
      ))}
    </div>
  )
}
