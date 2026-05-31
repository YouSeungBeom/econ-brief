// 태그 뱃지 컴포넌트: 뉴스 카드와 상세 페이지에서 태그를 시각적으로 표시
import { Badge } from "@/components/ui/badge"

interface TagBadgeProps {
  // 표시할 태그 텍스트
  tag: string
}

export function TagBadge({ tag }: TagBadgeProps) {
  return (
    <Badge variant="secondary" className="text-xs">
      {tag}
    </Badge>
  )
}
