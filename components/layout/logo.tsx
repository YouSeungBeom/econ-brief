import Link from "next/link"
import { TrendingUp } from "lucide-react"
import { SITE_CONFIG } from "@/lib/constants"
import { cn } from "@/lib/utils"

interface LogoProps {
  // "md": 헤더용 기본 크기, "sm": 푸터용 소형
  size?: "sm" | "md"
  className?: string
}

// 헤더·푸터에서 공통으로 사용하는 사이트 로고 컴포넌트
export function Logo({ size = "md", className }: LogoProps) {
  return (
    <Link
      href="/"
      className={cn("flex items-center gap-2 font-bold", className)}
    >
      <TrendingUp
        className={cn(
          "text-primary",
          size === "sm" ? "size-4" : "size-5"
        )}
      />
      <span className={cn(size === "sm" ? "text-sm" : "text-base")}>
        {SITE_CONFIG.name}
      </span>
    </Link>
  )
}
