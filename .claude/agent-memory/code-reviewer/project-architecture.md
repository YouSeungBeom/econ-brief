---
name: project-architecture
description: NextJs-Web-StarterKit 프로젝트 아키텍처 개요 — 기술 스택, 컴포넌트 구조, 스타일링 방식
metadata:
  type: project
---

## 기술 스택
- Next.js 16.2.6 (App Router 전용, Pages Router 미사용)
- React 19.2.4
- TypeScript 5 (strict 모드)
- Tailwind CSS 4 + tw-animate-css
- shadcn/ui (radix-ui ^1.4.3 직접 의존, `Slot.Root` 패턴)
- next-themes ^0.4.6 (attribute="class", .dark 클래스 방식)
- sonner ^2.0.7 (토스트)
- lucide-react ^1.14.0 + lucide ^1.3.0 (둘 다 설치됨 — 중복 주의)
- class-variance-authority, clsx, tailwind-merge

## 컴포넌트 구조
- `app/` — layout.tsx(전역), page.tsx(랜딩), loading.tsx, not-found.tsx
- `components/layout/` — Header, Footer (Header만 "use client")
- `components/providers/` — ThemeProvider (next-themes 래퍼)
- `components/theme/` — ThemeToggle
- `components/ui/` — shadcn/ui 컴포넌트 (직접 수정 가능)
- `lib/constants.ts` — SITE_CONFIG, NAV_LINKS, FOOTER_LINKS, FEATURES
- `lib/utils.ts` — cn() 유틸리티

## 스타일링 규칙
- globals.css: `@import "tailwindcss"` → `@import "tw-animate-css"` → `@import "shadcn/tailwind.css"` 순서
- `@custom-variant dark (&:is(.dark *))` 로 다크모드 변형 정의
- `@theme inline` 블록에서 CSS 변수 → Tailwind 토큰 매핑
- 색상은 OKLCH 포맷 사용

## shadcn/ui 사용 패턴
- `Slot.Root` (radix-ui v1.4+에서 `Slot` 대신 직접 import)
- `data-slot` 속성으로 컴포넌트 식별
- `data-size`, `data-variant` 속성으로 CVA 없이도 CSS 선택 가능

**Why:** 스타터킷이므로 아키텍처 결정이 향후 확장의 기반이 됨
**How to apply:** 새 컴포넌트 추가 시 이 구조에 맞게 배치, 상수는 반드시 lib/constants.ts에
