// 뉴스 아티클 카드 컴포넌트: 목록에서 단일 뉴스 항목을 표시
// TODO: NewsArticle 데이터를 받아 카드 UI 렌더링

import type { NewsArticle } from "@/lib/types"

interface NewsCardProps {
  // 렌더링할 뉴스 아티클 데이터
  article: NewsArticle
}

export function NewsCard({ article }: NewsCardProps) {
  // TODO: Card, Badge, 썸네일 이미지 등 실제 UI 구현
  return (
    <div className="rounded-xl p-4 ring-1 ring-foreground/10">
      <p className="text-sm text-muted-foreground">{article.title}</p>
    </div>
  )
}
