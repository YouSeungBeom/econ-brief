// 태그 배지 컴포넌트: 클릭 시 해당 태그로 필터링된 홈 페이지로 이동
import Link from "next/link"
import { Badge } from "@/components/ui/badge"

interface TagBadgeProps {
  // 표시할 태그 텍스트
  tag: string
}

export function TagBadge({ tag }: TagBadgeProps) {
  // 태그 값을 URL 파라미터로 인코딩하여 홈 필터 링크 생성
  const href = `/?tag=${encodeURIComponent(tag)}`

  return (
    <Badge
      asChild
      variant="outline"
      className="cursor-pointer transition-colors hover:bg-muted"
    >
      <Link href={href}>{tag}</Link>
    </Badge>
  )
}
