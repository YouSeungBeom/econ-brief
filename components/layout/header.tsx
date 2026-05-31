"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { TrendingUp, Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Separator } from "@/components/ui/separator"
import { ThemeToggle } from "@/components/theme/theme-toggle"
import { CATEGORIES, SITE_CONFIG } from "@/lib/constants"
import { cn } from "@/lib/utils"

// 사이트 로고 컴포넌트
function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2 font-bold">
      <TrendingUp className="size-5 text-primary" />
      <span>{SITE_CONFIG.name}</span>
    </Link>
  )
}

// 현재 경로에서 활성 카테고리 id를 추출
function useActiveCategory() {
  const pathname = usePathname()
  // /category/[id] 패턴 매칭
  const match = pathname.match(/^\/category\/(.+)$/)
  if (match) return match[1]
  // 홈 경로는 "all"로 처리
  if (pathname === "/") return "all"
  return null
}

// 데스크탑 카테고리 탭 네비게이션 (md 이상에서만 표시)
function DesktopCategoryNav() {
  // 현재 활성 카테고리
  const activeCategory = useActiveCategory()

  return (
    <nav className="hidden md:flex items-center gap-1">
      {CATEGORIES.map((category) => {
        // 탭 활성 여부
        const isActive = category.id === activeCategory
        const href = category.id === "all" ? "/" : `/category/${category.id}`

        return (
          <Link
            key={category.id}
            href={href}
            className={cn(
              "rounded-md px-3 py-1.5 text-sm font-medium transition-colors",
              isActive
                ? "bg-primary/10 text-primary"
                : "text-muted-foreground hover:text-foreground hover:bg-muted"
            )}
          >
            {category.label}
          </Link>
        )
      })}
    </nav>
  )
}

// 모바일 슬라이드 드로어 네비게이션 (md 미만에서만 표시)
function MobileNav() {
  // 드로어 열림 상태
  const [open, setOpen] = useState(false)
  const activeCategory = useActiveCategory()

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden" aria-label="메뉴 열기">
          <Menu className="size-5" />
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-64 p-0">
        <SheetHeader className="p-4 pb-0">
          <SheetTitle asChild>
            <Logo />
          </SheetTitle>
        </SheetHeader>
        <Separator className="my-4" />
        <nav className="flex flex-col gap-1 px-2">
          {CATEGORIES.map((category) => {
            const isActive = category.id === activeCategory
            const href = category.id === "all" ? "/" : `/category/${category.id}`

            return (
              <Link
                key={category.id}
                href={href}
                onClick={() => setOpen(false)}
                className={cn(
                  "rounded-md px-3 py-2 text-sm transition-colors",
                  isActive
                    ? "bg-primary/10 text-primary font-medium"
                    : "hover:bg-muted text-muted-foreground"
                )}
              >
                {category.label}
              </Link>
            )
          })}
        </nav>
      </SheetContent>
    </Sheet>
  )
}

// 헤더: 로고 + 카테고리 탭 네비 + 테마 토글 + 모바일 메뉴
export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-6">
          <Logo />
          <DesktopCategoryNav />
        </div>
        <div className="flex items-center gap-1">
          <ThemeToggle />
          <MobileNav />
        </div>
      </div>
    </header>
  )
}
