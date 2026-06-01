# Econ Brief - AI Agent 개발 규칙

## 프로젝트 개요

- **서비스**: Notion CMS 기반 경제 뉴스 요약 발행 서비스
- **스택**: Next.js 16 (App Router) · TypeScript strict · TailwindCSS v4 · shadcn/ui (radix-nova)
- **패키지 매니저**: npm
- **배포**: Vercel

---

## 디렉토리 구조 및 역할

```
app/                          # 라우트 전용 (layout/page/loading/not-found)
  layout.tsx                  # 전역 레이아웃 — ThemeProvider→TooltipProvider→Header/Footer/Toaster
  page.tsx                    # 홈 (뉴스 목록 + 히어로)
  loading.tsx                 # 전역 스켈레톤 로딩 UI
  not-found.tsx               # 404 페이지
  category/[category]/page.tsx
  news/[id]/page.tsx

components/
  news/                       # 뉴스 도메인 컴포넌트
    NewsCard.tsx  NewsGrid.tsx  HeroSection.tsx
    CategoryTabs.tsx  TagBadge.tsx  NotionRenderer.tsx
  layout/
    header.tsx  footer.tsx
  providers/
    theme-provider.tsx        # next-themes 래퍼 (Client)
  theme/
    theme-toggle.tsx          # 테마 전환 버튼 (Client)
  ui/                         # shadcn/ui 컴포넌트 (직접 수정 가능)

lib/
  types.ts                    # NewsArticle, NotionBlock 인터페이스 — 타입 변경은 여기만
  constants.ts                # SITE_CONFIG, CATEGORIES, CategoryId — 상수 변경은 여기만
  notion.ts                   # Notion API 클라이언트·쿼리 함수 — API 함수는 여기만
  utils.ts                    # cn() 유틸리티만 존재 — 다른 유틸 추가 금지
```

---

## 코드 규칙

### Export 패턴
- `app/` 예약 파일(`layout`, `page`, `loading`, `not-found`)만 `export default` 사용
- **모든 컴포넌트·함수·상수는 `named export`** (`export function`, `export const`)
- 위반 예: `export default function NewsCard()` → **금지**

### Server / Client 컴포넌트
- `"use client"` 선언은 `useState` / `useEffect` / 이벤트 핸들러가 필요한 경우에만 추가
- **현재 Client Component**: `Header`, `ThemeProvider`, `ThemeToggle`, `CategoryTabs`
- 새 컴포넌트는 기본적으로 Server Component — 브라우저 API 없이 구현 가능하면 `"use client"` 금지

### TypeScript
- `strict: true` 모드 — `any` 타입 사용 금지
- 외부 API 응답 타입은 반드시 `lib/types.ts`에 인터페이스로 정의 후 사용
- 함수 반환 타입 명시 필수 (타입 추론 가능해도 API 함수는 명시)

### 경로 별칭
- 모든 import는 `@/*` 별칭 사용 (`../../../` 상대경로 금지)
- 예: `import { cn } from "@/lib/utils"`, `import { Button } from "@/components/ui/button"`

---

## 스타일링 규칙

### TailwindCSS v4
- `globals.css` import 순서 고정 (변경 금지):
  ```css
  @import "tailwindcss";
  @import "tw-animate-css";
  @import "shadcn/tailwind.css";
  ```
- `tailwind.config.js` 파일 없음 — CSS 파일로만 설정
- 색상은 반드시 CSS 변수 토큰 사용: `bg-background`, `text-foreground`, `text-primary` 등
- **하드코딩 색상 금지**: `bg-white`, `text-black`, `#ffffff` 등 직접 색상값 사용 금지
- 새 색상 토큰 추가 시 `globals.css`의 `:root` 블록과 `.dark` 블록 모두 OKLCH 포맷으로 추가

### 다크모드
- 다크모드 클래스: `.dark` (attribute="class" 방식)
- Tailwind 다크모드 variant: `dark:` prefix 사용
- `@custom-variant dark (&:is(.dark *))` 이미 선언됨 — 중복 선언 금지

### 조건부 클래스
- `cn()` 유틸리티 사용: `import { cn } from "@/lib/utils"`
- `clsx()` 또는 템플릿 리터럴 문자열 조합 직접 사용 금지

---

## 상수 및 카테고리 관리

### 카테고리 추가/수정
1. `lib/constants.ts`의 `CATEGORIES` 배열만 수정
2. **연동 파일 자동 반영됨** (별도 수정 불필요):
   - `components/layout/header.tsx` — `CATEGORIES` import하여 탭 렌더링
   - `components/news/CategoryTabs.tsx` — `CATEGORIES` import하여 탭 렌더링
3. `CategoryId` 타입은 `CATEGORIES` 배열에서 자동 추론 — 수동 유니온 타입 추가 금지

### 사이트 메타 정보 수정
- `lib/constants.ts`의 `SITE_CONFIG` 수정
- `app/layout.tsx`에서 `SITE_CONFIG` import하여 metadata에 반영됨

---

## Notion API 규칙

### 함수 추가/수정
- **모든 Notion 관련 함수는 `lib/notion.ts`에만 위치**
- 페이지 컴포넌트에서 직접 Notion API 호출 금지
- 환경변수: `NOTION_API_KEY`, `NOTION_DATABASE_ID` (`.env.local` 및 Vercel 환경변수)

### 기존 함수 시그니처 (변경 시 호출처 모두 업데이트)
```typescript
getNewsArticles(): Promise<NewsArticle[]>
getNewsArticlesByCategory(category: string): Promise<NewsArticle[]>
getNewsArticlesByTag(tag: string): Promise<NewsArticle[]>
getNewsArticle(id: string): Promise<NewsArticle | null>
getNewsBlocks(pageId: string): Promise<NotionBlock[]>
getAllArticleIds(): Promise<string[]>
```

### ISR 설정
- 모든 데이터 페칭 페이지에 `export const revalidate = 3600` 선언 필수
- `generateStaticParams`에서 `getAllArticleIds()` 사용

---

## 컴포넌트 구현 규칙

### shadcn/ui 컴포넌트
- 새 UI 컴포넌트 추가: `npx shadcn add <component>` 명령 사용
- 생성 위치: `components/ui/` — 직접 수정 가능
- Radix UI v1.4+ 패턴: `Slot.Root` 사용 (`<Slot>` 직접 사용 금지)
- `data-slot` 속성으로 컴포넌트 부위 식별

### 이미지
- **모든 이미지는 `next/image` 사용** (`<img>` 태그 금지)
- 외부 도메인 이미지 사용 시 `next.config.ts`의 `images.remotePatterns`에 도메인 추가 필수
- Notion 파일 이미지 URL 분기: `external` 타입과 `file` 타입 구분 처리

### 라우팅
- 내부 링크는 `next/link`의 `<Link>` 사용 (`<a>` 태그 직접 사용 금지)
- 외부 링크(원문 URL): `target="_blank" rel="noopener noreferrer"` 필수

### 뉴스 상세 페이지 notFound 처리
```typescript
// app/news/[id]/page.tsx
const article = await getNewsArticle(id)
if (!article) notFound()  // next/navigation에서 import
```

---

## 파일 연동 관계 (수정 시 반드시 확인)

| 수정 파일 | 함께 확인할 파일 |
|-----------|----------------|
| `lib/types.ts` (NewsArticle 필드 추가) | `lib/notion.ts` (파싱 함수 업데이트) |
| `lib/constants.ts` (CATEGORIES 변경) | `app/category/[category]/page.tsx` (generateStaticParams) |
| `lib/notion.ts` (함수 시그니처 변경) | 해당 함수를 호출하는 모든 page.tsx |
| `app/globals.css` (CSS 변수 추가) | `:root` 블록 + `.dark` 블록 동시 추가 필수 |
| `components/ui/*` (shadcn 컴포넌트 수정) | 해당 컴포넌트 사용처 전체 |

---

## 금지 사항

- `Pages Router` 사용 (`pages/` 디렉토리 생성 금지)
- `any` 타입 사용
- 하드코딩 색상값 (`#ffffff`, `rgb(...)`, `white` 등)
- 카테고리 문자열 하드코딩 (항상 `CATEGORIES` 상수에서 참조)
- `lib/notion.ts` 외부에서 Notion API 직접 호출
- `lib/types.ts` 외부에서 도메인 인터페이스 정의
- 상대경로 import (`../../../` 형식)
- `export default` (app/ 예약 파일 제외)
- Server Component에 `"use client"` 불필요하게 추가
- `<img>` 태그 직접 사용 (반드시 `next/image`)
- `tailwind.config.js` 파일 생성 (TailwindCSS v4는 CSS 파일로 설정)
- `globals.css` import 순서 변경

---

## 의사결정 기준

### 새 컴포넌트 위치 결정
1. 뉴스 도메인 관련 → `components/news/`
2. 페이지 공통 레이아웃 → `components/layout/`
3. shadcn/ui 기반 순수 UI → `components/ui/` (npx shadcn add 사용)
4. 전역 Provider → `components/providers/`
5. 테마 관련 UI → `components/theme/`

### Client Component 선언 판단 트리
```
useState / useEffect / 이벤트 핸들러 필요?
├── YES → "use client" 선언
└── NO → useRouter / usePathname / useSearchParams 필요?
          ├── YES → "use client" 선언
          └── NO → Server Component (선언 없음)
```

### 데이터 페칭 방식
- 목록 페이지 → `getNewsArticles()` 또는 `getNewsArticlesByCategory()`
- 상세 페이지 → `getNewsArticle(id)` + `getNewsBlocks(id)`
- 태그 필터 → `app/page.tsx`에서 `searchParams.tag`로 클라이언트 필터링
