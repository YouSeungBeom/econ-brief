"use client"

// 카테고리 탭 필터: 선택된 카테고리로 /category/[id] 라우팅
// activeCategory prop 미전달 시 현재 경로에서 자동 감지 (Header 재사용 지원)

import Link from "next/link"
import { usePathname } from "next/navigation"
import { CATEGORIES } from "@/lib/constants"
import type { CategoryId } from "@/lib/constants"
import { cn } from "@/lib/utils"

interface CategoryTabsProps {
  // 외부에서 활성 카테고리를 주입할 경우 사용, 미전달 시 경로에서 자동 감지
  activeCategory?: CategoryId
  className?: string
}

export function CategoryTabs({ activeCategory, className }: CategoryTabsProps) {
  const pathname = usePathname()

  // activeCategory prop이 없으면 현재 경로에서 추출
  const resolvedActive = activeCategory ?? resolveActiveCategory(pathname)

  return (
    <nav className={cn("flex gap-2 overflow-x-auto pb-1", className)}>
      {CATEGORIES.map((category) => {
        // 현재 카테고리 활성 여부
        const isActive = category.id === resolvedActive

        return (
          <Link
            key={category.id}
            href={category.id === "all" ? "/" : `/category/${category.id}`}
            className={cn(
              "shrink-0 rounded-full px-4 py-2 text-sm font-medium transition-colors",
              isActive
                ? "bg-primary text-primary-foreground"
                : "bg-muted text-muted-foreground hover:bg-muted/80"
            )}
          >
            {category.label}
          </Link>
        )
      })}
    </nav>
  )
}

// 현재 pathname에서 활성 카테고리 id를 추출하는 순수 함수
function resolveActiveCategory(pathname: string): CategoryId {
  const match = pathname.match(/^\/category\/(.+)$/)
  if (match) return match[1] as CategoryId
  if (pathname === "/") return "all"
  return "all"
}
