import { Skeleton } from "@/components/ui/skeleton"

// 전역 로딩 상태: 페이지 전환 시 자동 표시되는 뉴스 그리드 스켈레톤 UI
export default function Loading() {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* 히어로 영역 스켈레톤 */}
      <div className="mb-8 flex flex-col items-center gap-3 text-center">
        <Skeleton className="h-8 w-64" />
        <Skeleton className="h-5 w-96" />
      </div>
      {/* 카테고리 탭 스켈레톤 */}
      <div className="mb-6 flex gap-2">
        {Array.from({ length: 5 }).map((_, i) => (
          <Skeleton key={i} className="h-9 w-20 rounded-full" />
        ))}
      </div>
      {/* 뉴스 카드 그리드 스켈레톤 */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="flex flex-col gap-3 rounded-xl p-4 ring-1 ring-foreground/10">
            <Skeleton className="aspect-video w-full rounded-lg" />
            <Skeleton className="h-5 w-3/4" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-2/3" />
          </div>
        ))}
      </div>
    </div>
  )
}
