"use client"

import { ThemeProvider as NextThemesProvider } from "next-themes"

// next-themes 공식 ThemeProvider 얇은 래퍼
// attribute="class": html 요소에 .dark 클래스를 붙이는 방식 (globals.css 변수와 연동)
export function ThemeProvider({ children }: { children: React.ReactNode }) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      {children}
    </NextThemesProvider>
  )
}
