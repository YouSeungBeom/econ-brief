"use client"

// 카테고리 탭 필터: 선택된 카테고리로 뉴스 목록 필터링
// TODO: URL 쿼리 파라미터 또는 라우팅 방식으로 필터 상태 관리

import Link from "next/link"
import { CATEGORIES } from "@/lib/constants"
import type { CategoryId } from "@/lib/constants"
import { cn } from "@/lib/utils"

interface CategoryTabsProps {
  // 현재 선택된 카테고리 id
  activeCategory: CategoryId
}

export function CategoryTabs({ activeCategory }: CategoryTabsProps) {
  return (
    <nav className="flex gap-2 overflow-x-auto pb-1">
      {CATEGORIES.map((category) => {
        // 현재 카테고리 활성 여부
        const isActive = category.id === activeCategory

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
