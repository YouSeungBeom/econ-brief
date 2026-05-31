// 뉴스 카드 그리드 컴포넌트: 복수의 NewsCard를 격자 레이아웃으로 표시
// TODO: 데이터 로딩 상태 및 빈 상태 처리 추가

import type { NewsArticle } from "@/lib/types"
import { NewsCard } from "@/components/news/NewsCard"

interface NewsGridProps {
  // 표시할 뉴스 아티클 목록
  articles: NewsArticle[]
}

export function NewsGrid({ articles }: NewsGridProps) {
  // 뉴스가 없을 때 빈 상태 메시지
  if (articles.length === 0) {
    return (
      <p className="text-center text-muted-foreground py-20">
        뉴스가 없습니다.
      </p>
    )
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {articles.map((article) => (
        <NewsCard key={article.id} article={article} />
      ))}
    </div>
  )
}
