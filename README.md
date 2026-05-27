# Econ Brief

![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js)
![React](https://img.shields.io/badge/React-19-61DAFB?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?logo=tailwindcss)
![Notion](https://img.shields.io/badge/Notion-CMS-000000?logo=notion)

**Notion을 CMS로 활용한 경제 뉴스 요약 웹 서비스.** 바쁜 일상 속 경제 흐름을 짧게 파악하고 싶은 직장인 및 경제 관심층을 위해, Notion DB에 작성된 경제 뉴스를 자동으로 웹에 발행하고 카테고리·태그 기반으로 빠르게 탐색할 수 있도록 한다.

## 주요 기능

- ✅ **Notion CMS 연동** — `@notionhq/client`로 Notion DB에서 뉴스 자동 발행
- ✅ **뉴스 목록 조회** — Status=발행됨인 뉴스를 최신순으로 렌더링
- ✅ **뉴스 상세 조회** — 제목·요약·본문·태그·원문 링크 표시 및 Notion 블록 렌더링
- ✅ **카테고리 필터링** — 거시경제·주식/증시·부동산·글로벌 등 카테고리 탭 탐색
- ✅ **태그 기반 탐색** — 태그 클릭 시 연관 뉴스 목록으로 이동
- ✅ **주요 뉴스 하이라이트** — 최신 뉴스 1-3건을 홈 상단 히어로 영역에 강조 표시
- ✅ **ISR 캐시 전략** — `revalidate` 기반 정적 생성으로 Notion API 호출 최소화
- ✅ **반응형 레이아웃** — 모바일(1열) → 태블릿(2열) → 데스크톱(3열) 그리드
- ✅ **다크/라이트/시스템 테마** — next-themes 기반 전환

## 기술 스택

| 분류 | 라이브러리 | 버전 | 설명 |
|------|-----------|------|------|
| 프레임워크 | Next.js | 16.2.6 | App Router + ISR/SSG |
| UI | React | 19.2.4 | UI 라이브러리 |
| 언어 | TypeScript | ^5 | strict 모드 |
| 스타일 | Tailwind CSS | ^4 | CSS 변수 + OKLCH 색상 토큰 |
| UI 컴포넌트 | shadcn/ui | ^4.7.0 | Radix UI 기반 (radix-nova 스타일) |
| 아이콘 | Lucide React | ^1.14.0 | 1500+ 오픈소스 아이콘 |
| **CMS** | **@notionhq/client** | **latest** | **Notion 공식 SDK, DB 쿼리 및 블록 패치** |
| 테마 | next-themes | ^0.4.6 | 라이트/다크/시스템 테마 |
| 토스트 | Sonner | ^2.0.7 | 알림 UI |

## 시작하기

**Prerequisites:** Node.js 18 이상, Notion Integration Token

### 1. 환경변수 설정

`.env.local` 파일을 생성하고 아래 값을 입력합니다.

```bash
NOTION_API_KEY=<Notion Integration Token>
NOTION_DATABASE_ID=<뉴스 DB ID>
```

> Notion Integration 생성: [https://www.notion.so/my-integrations](https://www.notion.so/my-integrations)
> DB ID는 Notion 페이지 URL의 32자리 UUID입니다.

### 2. 의존성 설치 및 실행

```bash
npm install
npm run dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000)을 열어 확인합니다.

## 개발 명령어

```bash
npm run dev      # 개발 서버 실행
npm run build    # 프로덕션 빌드
npm run start    # 프로덕션 서버 실행
npm run lint     # ESLint 검사
```

## 프로젝트 구조

```
app/
  page.tsx                    # 홈 페이지 (뉴스 목록 + 히어로)
  category/
    [category]/
      page.tsx                # 카테고리별 뉴스 목록
  news/
    [id]/
      page.tsx                # 뉴스 상세 페이지
components/
  news/
    NewsCard.tsx              # 뉴스 카드 컴포넌트
    NewsGrid.tsx              # 카드 그리드 레이아웃
    HeroSection.tsx           # 주요 뉴스 하이라이트
    CategoryTabs.tsx          # 카테고리 탭 필터
    TagBadge.tsx              # 태그 배지
    NotionRenderer.tsx        # Notion 블록 렌더러
  layout/                     # Header (반응형 + 모바일 드로어), Footer
  providers/                  # ThemeProvider (next-themes 래퍼)
  ui/                         # shadcn/ui 컴포넌트
lib/
  notion.ts                   # Notion API 클라이언트 및 쿼리 함수
  constants.ts                # SITE_CONFIG, NAV_LINKS, CATEGORIES 등
  types.ts                    # NewsArticle, NotionBlock 타입 정의
  utils.ts                    # cn() 유틸리티 (clsx + tailwind-merge)
```

## Notion DB 스키마

뉴스 DB에 아래 필드를 설정해야 합니다.

| 필드 | 타입 | 설명 |
|------|------|------|
| Title | 제목 | 뉴스 제목 |
| Summary | 텍스트 | AI 요약 |
| Category | 선택 | 거시경제 / 주식/증시 / 부동산 / 글로벌 |
| Tags | 다중 선택 | 태그 목록 |
| Published | 날짜 | 발행일 |
| Status | 선택 | `Draft` / `Published` |
| Thumbnail | URL | 썸네일 이미지 URL |
| Source | URL | 원문 뉴스 링크 |

## 배포

[Vercel](https://vercel.com)에 배포하는 것을 권장합니다. GitHub 저장소를 연결 후 환경변수(`NOTION_API_KEY`, `NOTION_DATABASE_ID`)를 Vercel 대시보드에 등록하면 자동 배포됩니다.
