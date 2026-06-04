import { Skeleton } from "@/components/ui/skeleton"

// 전역 로딩 상태: 실제 HeroSection + CategoryTabs + NewsGrid 레이아웃과 일치하는 스켈레톤
export default function Loading() {
  return (
    <div className="container mx-auto px-4 py-8 space-y-8">

      {/* ── 서비스 헤딩 스켈레톤 (HeroSection의 text-center 블록) ── */}
      <div className="flex flex-col items-center gap-3 text-center">
        {/* h1: text-4xl md:text-5xl → 약 h-10 */}
        <Skeleton className="h-10 w-48 md:w-64" />
        {/* p: text-lg mt-3 → h-6 */}
        <Skeleton className="h-6 w-64 md:w-80" />
      </div>

      {/* ── 히어로 카드 스켈레톤 (2~3건 기준: 좌 2fr 대형 + 우 1fr 소형 2개) ── */}
      <div className="grid gap-4 md:grid-cols-[2fr_1fr]">
        {/* 좌측 대형 카드: aspect-video */}
        <Skeleton className="aspect-video w-full rounded-xl" />
        {/* 우측 소형 카드 2개: aspect-[4/3] — 모바일에서는 숨김으로 간소화 */}
        <div className="hidden md:flex flex-col gap-4">
          <Skeleton className="aspect-[4/3] w-full rounded-xl" />
          <Skeleton className="aspect-[4/3] w-full rounded-xl" />
        </div>
      </div>

      {/* ── 카테고리 탭 스켈레톤 (탭 6개 가로 배치) ── */}
      <div className="flex gap-2 overflow-hidden">
        {Array.from({ length: 6 }).map((_, i) => (
          <Skeleton key={i} className="h-9 w-20 shrink-0 rounded-full" />
        ))}
      </div>

      {/* ── 뉴스 카드 그리드 스켈레톤 (실제 NewsCard 내부 구조 반영) ── */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="flex flex-col gap-3 rounded-xl overflow-hidden ring-1 ring-foreground/10">
            {/* 썸네일 영역 */}
            <Skeleton className="aspect-video w-full" />
            <div className="flex flex-col gap-2 p-4 pt-0">
              {/* 카테고리 배지 + 날짜 */}
              <div className="flex items-center gap-2">
                <Skeleton className="h-5 w-16 rounded-full" />
                <Skeleton className="h-4 w-20" />
              </div>
              {/* 제목 2줄 */}
              <Skeleton className="h-5 w-full" />
              <Skeleton className="h-5 w-4/5" />
              {/* 요약 2줄 */}
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
            </div>
          </div>
        ))}
      </div>

    </div>
  )
}
