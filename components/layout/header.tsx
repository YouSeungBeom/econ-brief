"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu } from "lucide-react"
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
import { CATEGORIES } from "@/lib/constants"
import { cn } from "@/lib/utils"
import { Logo } from "@/components/layout/logo"
import { CategoryTabs } from "@/components/news/CategoryTabs"

// 모바일 슬라이드 드로어 네비게이션 (md 미만에서만 표시)
// 드로어 닫기 동작이 필요해 CategoryTabs와 별도로 유지
function MobileNav() {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()
  // 현재 경로에서 활성 카테고리 추출
  const match = pathname.match(/^\/category\/(.+)$/)
  const activeCategory = match ? match[1] : pathname === "/" ? "all" : null

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
          {/* 데스크탑 카테고리 탭 (md 이상에서만 표시) */}
          <CategoryTabs className="hidden md:flex" />
        </div>
        <div className="flex items-center gap-1">
          <ThemeToggle />
          <MobileNav />
        </div>
      </div>
    </header>
  )
}
