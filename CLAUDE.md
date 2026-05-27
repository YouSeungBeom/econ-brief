# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## 개발 명령어

```bash
npm run dev      # 개발 서버 실행 (http://localhost:3000)
npm run build    # 프로덕션 빌드
npm run start    # 프로덕션 서버 실행
npm run lint     # ESLint 검사
```

## 기술 스택

| 분류 | 패키지 | 버전 |
|------|--------|------|
| 프레임워크 | next + react + react-dom | 16.2.6 / 19.2.4 |
| 언어 | typescript (strict 모드) | ^5 |
| 스타일 | tailwindcss + tw-animate-css | ^4 |
| UI | shadcn/ui (radix-nova 스타일) + radix-ui | ^4.7.0 / ^1.4.3 |
| 아이콘 | lucide-react | ^1.14.0 |
| 테마 | next-themes | ^0.4.6 |
| 토스트 | sonner | ^2.0.7 |
| 훅 | usehooks-ts | ^3.1.1 |
| 클래스 유틸 | clsx + tailwind-merge + class-variance-authority | - |

## 아키텍처 개요

**Next.js 16 App Router** 기반 스타터킷. Pages Router는 사용하지 않는다.

```
app/
  layout.tsx       # 전역 레이아웃: ThemeProvider → TooltipProvider → Header/main/Footer/Toaster
  page.tsx         # 랜딩 페이지 (HeroSection, FeaturesSection, CTASection)
  loading.tsx      # 전역 로딩 UI
  not-found.tsx    # 404 페이지
  login/
    page.tsx       # 로그인 페이지 (메타데이터 + LoginForm)
components/
  layout/          # Header (sticky, 반응형 네비 — Client), Footer (Server)
  providers/       # ThemeProvider (next-themes 래퍼 — Client)
  theme/           # ThemeToggle (라이트/다크/시스템 전환 — Client)
  auth/            # LoginForm 등 인증 관련 컴포넌트 (Client)
  ui/              # shadcn/ui 컴포넌트 (직접 수정 가능)
lib/
  constants.ts     # SITE_CONFIG, NAV_LINKS, FOOTER_LINKS, FEATURES
  utils.ts         # cn() 유틸리티 (clsx + tailwind-merge)
```

## 컴포넌트 작성 규칙

**Server vs Client 컴포넌트**
- `"use client"`는 `useState` / `useEffect` / 이벤트 핸들러가 필요한 경우에만 선언
- 현재 Client Component: `Header`, `ThemeProvider`, `ThemeToggle`, `LoginForm`
- 나머지는 모두 Server Component (기본값)

**export 규칙**
- `app/` 예약 파일(`layout`, `page`, `loading`, `not-found`)만 `export default`
- 모든 컴포넌트·함수·상수는 `named export` 사용

**경로 별칭**
- `@/*` → 프로젝트 루트 (`tsconfig.json` paths 설정)
- 예: `import { cn } from "@/lib/utils"`, `import { Button } from "@/components/ui/button"`

## 스타일링

- **Tailwind CSS 4** + CSS 변수 방식. `globals.css` import 순서:
  ```css
  @import "tailwindcss";
  @import "tw-animate-css";
  @import "shadcn/tailwind.css";
  ```
- 다크모드는 `attribute="class"` 방식(`.dark` 클래스). `globals.css`의 `@custom-variant dark (&:is(.dark *))` 와 연동.
- 색상 토큰은 `--background`, `--foreground`, `--primary` 등 CSS 변수로 정의되며 `@theme inline` 블록에서 Tailwind 토큰으로 매핑. 색상값은 OKLCH 포맷 사용.
- `cn()` 유틸리티(`clsx` + `tailwind-merge`)로 조건부 클래스 병합.

## 테마 시스템

`ThemeProvider`(`components/providers/theme-provider.tsx`)가 `next-themes`를 래핑. `defaultTheme="system"`, `enableSystem` 활성화. `html` 태그에 `suppressHydrationWarning` 필수.

## 상수 관리

사이트 메타 정보·네비 링크·푸터 링크·랜딩 기능 카드 데이터는 모두 `lib/constants.ts`에서 관리. 페이지·컴포넌트에서 직접 하드코딩 금지.

## shadcn/ui 컴포넌트 추가

```bash
npx shadcn add <component>
```

생성된 파일은 `components/ui/`에 위치하며 직접 수정 가능.

**주요 패턴 (radix-ui v1.4+ 기준)**
- `Slot` 직접 import 대신 `Slot.Root` 사용 (`import { Slot } from "@radix-ui/react-slot"` → `<Slot.Root>`)
- `data-slot` 속성으로 컴포넌트 부위 식별 (CSS 선택자용)
- `data-size`, `data-variant` 속성으로 CVA 없이도 CSS 선택 가능
- CVA(`class-variance-authority`)로 variant 타입 자동 추론
