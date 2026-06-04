"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"

interface ErrorPageProps {
  error: Error & { digest?: string }
  reset: () => void
}

export default function ErrorPage({ error, reset }: ErrorPageProps) {
  return (
    <div className="container mx-auto flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
      <h2 className="mb-2 text-2xl font-bold">오류가 발생했습니다</h2>
      <p className="mb-6 text-muted-foreground">
        {error.message || "잠시 후 다시 시도해 주세요."}
      </p>
      <div className="flex gap-3">
        <Button onClick={reset}>다시 시도</Button>
        <Button asChild variant="outline">
          <Link href="/">홈으로</Link>
        </Button>
      </div>
    </div>
  )
}
