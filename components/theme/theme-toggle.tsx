"use client"

import { useEffect, useState } from "react"
import { useTheme } from "next-themes"
import { Sun, Moon, Monitor } from "lucide-react"
import { Button } from "@/components/ui/button"

// 현재 테마에 대응하는 아이콘 컴포넌트 반환
function ThemeIcon({ theme }: { theme: string | undefined }) {
  if (theme === "light") return <Sun className="size-4" />
  if (theme === "dark") return <Moon className="size-4" />
  return <Monitor className="size-4" />
}

// system → light → dark 순서로 순환하는 다음 테마값 반환
function getNextTheme(current: string | undefined): string {
  if (current === "system") return "light"
  if (current === "light") return "dark"
  return "system"
}

// 다크/라이트/시스템 3단계 테마 토글 버튼
export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  // SSR 하이드레이션 불일치 방지: 클라이언트 마운트 후 렌더
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true)
  }, [])

  // 마운트 전에는 동일한 크기의 빈 버튼 렌더링
  if (!mounted) {
    return <Button variant="ghost" size="icon" disabled aria-label="테마 변경" />
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setTheme(getNextTheme(theme))}
      aria-label="테마 변경"
    >
      <ThemeIcon theme={theme} />
    </Button>
  )
}
