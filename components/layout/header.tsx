"use client"

import { useState } from "react"
import Link from "next/link"
import { Zap, Menu } from "lucide-react"
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
import { NAV_LINKS, SITE_CONFIG } from "@/lib/constants"

// 사이트 로고 + 이름 조합 컴포넌트
function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2 font-semibold">
      <Zap className="size-5 text-primary" />
      <span>{SITE_CONFIG.name}</span>
    </Link>
  )
}

// 데스크탑 가로 네비게이션 (md 이상에서만 표시)
function DesktopNav() {
  return (
    <nav className="hidden md:flex items-center gap-6">
      {NAV_LINKS.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className="text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          {link.label}
        </Link>
      ))}
    </nav>
  )
}

// 모바일 슬라이드 드로어 네비게이션 (md 미만에서만 표시)
function MobileNav() {
  // 드로어 열림 상태
  const [open, setOpen] = useState(false)

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
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="rounded-md px-3 py-2 text-sm hover:bg-muted transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </SheetContent>
    </Sheet>
  )
}

// 헤더: 로고 + 데스크탑 네비 + 테마 토글 + 모바일 메뉴
export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Logo />
        <DesktopNav />
        <div className="flex items-center gap-1">
          <ThemeToggle />
          <MobileNav />
        </div>
      </div>
    </header>
  )
}
