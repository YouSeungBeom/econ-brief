import { Skeleton } from "@/components/ui/skeleton"

// 전역 로딩 상태: 페이지 전환 시 자동으로 표시되는 스켈레톤 UI
export default function Loading() {
  return (
    <div className="flex flex-1 flex-col items-center gap-6 py-24 px-4">
      <div className="flex flex-col items-center gap-4 text-center">
        <Skeleton className="h-6 w-32 rounded-full" />
        <Skeleton className="h-12 w-80 md:w-[480px]" />
        <Skeleton className="h-5 w-64 md:w-96" />
        <div className="flex gap-3">
          <Skeleton className="h-10 w-28 rounded-lg" />
          <Skeleton className="h-10 w-28 rounded-lg" />
        </div>
      </div>
      <div className="mt-8 grid w-full max-w-5xl gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="flex flex-col gap-3 rounded-xl p-4 ring-1 ring-foreground/10">
            <Skeleton className="size-10 rounded-lg" />
            <Skeleton className="h-5 w-24" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
          </div>
        ))}
      </div>
    </div>
  )
}
