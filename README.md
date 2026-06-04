# Econ Brief

![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js)
![React](https://img.shields.io/badge/React-19-61DAFB?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?logo=tailwindcss)
![Notion](https://img.shields.io/badge/Notion-CMS-000000?logo=notion)
![Vercel](https://img.shields.io/badge/Deployed_on-Vercel-000000?logo=vercel)

> **Notion을 CMS로 활용한 경제 뉴스 요약 웹 서비스.**
> 바쁜 일상 속 경제 흐름을 짧게 파악하고 싶은 직장인을 위해, Notion DB에 작성된 경제 뉴스를 자동으로 웹에 발행하고 카테고리·태그 기반으로 빠르게 탐색할 수 있도록 한다.

**[econ-brief.vercel.app](https://econ-brief.vercel.app)**

---

## 서비스 소개

Econ Brief는 Notion을 콘텐츠 관리 시스템(CMS)으로 사용하는 경제 뉴스 요약 서비스다. 작성자가 Notion DB에 뉴스를 입력하고 `Published` 상태로 변경하면, 별도의 배포 없이 웹사이트에 자동 반영된다. ISR(Incremental Static Regeneration) 전략으로 Notion API 호출을 최소화하면서 빠른 페이지 로딩을 제공한다.

### 사용자 흐름

```
홈 페이지 (최신 뉴스 + 히어로 섹션)
  ├── 카테고리 탭 클릭  →  카테고리 페이지 (필터링된 뉴스 목록)
  └── 뉴스 카드 클릭   →  뉴스 상세 페이지 (본문 + 요약 + 태그)
                              ├── 태그 클릭      →  홈 페이지 (태그 필터 적용)
                              └── 원문 링크 클릭 →  외부 사이트 (새 탭)
```

---

## 주요 기능

| 기능 | 설명 |
|------|------|
| **Notion CMS 연동** | `@notionhq/client`로 Notion DB를 직접 쿼리. Status = `Published`인 뉴스만 자동 발행 |
| **뉴스 목록 조회** | 최신순 정렬된 뉴스 카드 그리드. 썸네일·카테고리·발행일·요약·태그 표시 |
| **뉴스 상세 조회** | 제목·요약 강조 박스·Notion 본문 블록 렌더링·태그·원문 링크 |
| **카테고리 필터링** | 거시경제·주식/증시·부동산·글로벌 카테고리 탭으로 즉시 필터링 |
| **태그 기반 탐색** | 태그 클릭 시 동일 태그 뉴스 목록으로 이동. 필터 배너로 현재 상태 표시 |
| **주요 뉴스 하이라이트** | 홈 상단 히어로 섹션에 최신 뉴스 1-3건 강조 표시 |
| **ISR 캐시 전략** | 홈·카테고리 1시간, 뉴스 상세 24시간 주기 재생성으로 API 호출 최소화 |
| **반응형 레이아웃** | 모바일(1열) → 태블릿(2열) → 데스크톱(3열) 그리드 |
| **다크/라이트/시스템 테마** | `next-themes` 기반 테마 전환 |
| **SEO 최적화** | 페이지별 동적 메타데이터, OG/Twitter 카드, 동적 사이트맵, robots.txt |

---

## 기술 스택

| 분류 | 라이브러리 | 버전 | 역할 |
|------|-----------|------|------|
| 프레임워크 | Next.js | 16.2.6 | App Router, ISR/SSG |
| UI | React | 19.2.4 | UI 라이브러리 |
| 언어 | TypeScript | ^5 | strict 모드 |
| 스타일 | Tailwind CSS | ^4 | CSS 변수 + OKLCH 색상 토큰 |
| UI 컴포넌트 | shadcn/ui | ^4.7.0 | Radix UI 기반 컴포넌트 |
| 아이콘 | Lucide React | ^1.14.0 | 아이콘 |
| **CMS** | **@notionhq/client** | **latest** | **Notion DB 쿼리 및 블록 패치** |
| 테마 | next-themes | ^0.4.6 | 라이트/다크/시스템 테마 |
| 토스트 | Sonner | ^2.0.7 | 알림 UI |
| 배포 | Vercel | - | Next.js 최적화 배포 |

---

## 시작하기

**Prerequisites:** Node.js 18+, Notion Integration Token

### 1. 저장소 클론 및 의존성 설치

```bash
git clone https://github.com/your-username/econ-brief.git
cd econ-brief
npm install
```

### 2. Notion 설정

1. [Notion Integrations](https://www.notion.so/my-integrations)에서 Integration을 생성하고 API 키를 복사한다.
2. Notion에서 뉴스 DB를 생성하고 아래 스키마를 적용한다.
3. DB 페이지 URL에서 32자리 UUID를 복사한다 (`notion.so/.../{DATABASE_ID}?v=...`).
4. DB 설정 > Connections에서 생성한 Integration을 연결한다.

### 3. 환경변수 설정

`.env.local` 파일을 생성하고 아래 값을 입력한다.

```bash
NOTION_API_KEY=secret_xxxxxxxxxxxxxxxxxxxxxxxxxxxx
NOTION_DATABASE_ID=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

### 4. 개발 서버 실행

```bash
npm run dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000)을 열어 확인한다.

---

## Notion DB 스키마

뉴스 DB에 아래 필드를 설정해야 한다.

| 필드명 | Notion 타입 | 설명 |
|--------|------------|------|
| Title | 제목 (기본) | 뉴스 제목 |
| Summary | 텍스트 | AI 요약 (강조 블록으로 표시) |
| Category | 선택 | `macro` / `stock` / `realestate` / `global` |
| Tags | 다중 선택 | 태그 목록 (예: 금리, 환율, 반도체) |
| Published | 날짜 | 발행일 (정렬 기준) |
| Status | 상태 | `Draft` / `Published` |
| Thumbnail | URL | 썸네일 이미지 URL |
| Source | URL | 원문 뉴스 링크 |

> **Category 값 주의**: Notion DB에는 영어 ID(`macro`, `stock`, `realestate`, `global`)로 입력해야 한다. 웹사이트에는 한국어 레이블(거시경제, 주식/증시, 부동산, 글로벌)로 자동 변환되어 표시된다.

---

## 프로젝트 구조

```
econ-brief/
├── app/
│   ├── layout.tsx                  # 전역 레이아웃 (ThemeProvider → Header/main/Footer)
│   ├── page.tsx                    # 홈 페이지 (히어로 + 카테고리 탭 + 뉴스 그리드)
│   ├── loading.tsx                 # 전역 로딩 스켈레톤 UI
│   ├── not-found.tsx               # 404 페이지
│   ├── error.tsx                   # 에러 바운더리
│   ├── sitemap.ts                  # 동적 사이트맵 생성
│   ├── robots.ts                   # robots.txt 생성
│   ├── category/[category]/
│   │   └── page.tsx                # 카테고리별 뉴스 목록
│   └── news/[id]/
│       └── page.tsx                # 뉴스 상세 페이지
├── components/
│   ├── news/
│   │   ├── HeroSection.tsx         # 홈 상단 히어로 섹션 (최신 뉴스 1-3건 강조)
│   │   ├── NewsCard.tsx            # 뉴스 카드 (썸네일·카테고리·날짜·요약·태그)
│   │   ├── NewsGrid.tsx            # 반응형 카드 그리드 + 빈 상태 UI
│   │   ├── CategoryTabs.tsx        # 카테고리 탭 필터 (Client Component)
│   │   ├── TagBadge.tsx            # 태그 배지 (클릭 시 태그 필터 이동)
│   │   └── NotionRenderer.tsx      # Notion 블록 → HTML 렌더러
│   ├── layout/
│   │   ├── header.tsx              # sticky 헤더 (로고 + 카테고리 탭 + 테마 토글)
│   │   └── footer.tsx              # 푸터
│   ├── providers/
│   │   └── theme-provider.tsx      # next-themes 래퍼 (Client Component)
│   └── ui/                         # shadcn/ui 컴포넌트
├── lib/
│   ├── notion.ts                   # Notion API 클라이언트 및 쿼리 함수
│   ├── types.ts                    # NewsArticle, NotionBlock 타입 정의
│   ├── constants.ts                # SITE_CONFIG, CATEGORIES 상수
│   └── utils.ts                    # cn() 유틸리티
└── public/
    └── og-default.png              # 기본 OG 이미지 (1200×630px)
```

---

## 아키텍처 개요

### 데이터 흐름

```
Notion DB
  └── @notionhq/client (lib/notion.ts)
        ├── getNewsArticles()           → 홈 페이지 (ISR 1h)
        ├── getNewsArticlesByCategory() → 카테고리 페이지 (ISR 1h)
        ├── getNewsArticlesByTag()      → 홈 페이지 태그 필터 (동적)
        ├── getNewsArticle()            → 뉴스 상세 페이지 (ISR 24h)
        └── getNewsBlocks()             → 뉴스 본문 블록 (ISR 24h)
```

### Server / Client 컴포넌트 분리

- **Server Component (기본)**: 데이터 패칭이 필요한 페이지, 정적 UI 컴포넌트 전부
- **Client Component** (`"use client"`): `Header`, `CategoryTabs`, `ThemeProvider`, `ThemeToggle` — 사용자 인터랙션(탭 클릭, 테마 전환)이 필요한 컴포넌트만 Client로 선언

### Notion 블록 렌더링

`NotionRenderer`는 Notion API에서 반환된 블록 배열을 HTML 요소로 변환한다. 지원 블록 타입:

| Notion 블록 | 렌더링 결과 |
|------------|------------|
| `paragraph` | `<p>` |
| `heading_1` | `<h1>` |
| `heading_2` | `<h2>` |
| `heading_3` | `<h3>` |
| `bulleted_list_item` | `<ul><li>` |
| `numbered_list_item` | `<ol><li>` |
| `quote` | `<blockquote>` |
| `code` | `<pre><code>` (언어 표시) |
| `image` | `<img>` (external / file URL 모두 지원) |

---

## 개발 명령어

```bash
npm run dev      # 개발 서버 실행 (http://localhost:3000)
npm run build    # 프로덕션 빌드 (ISR 정적 경로 사전 생성 포함)
npm run start    # 프로덕션 서버 실행
npm run lint     # ESLint 검사
```

---

## 배포

[Vercel](https://vercel.com)에서 GitHub 저장소를 연결하고 환경변수를 등록하면 자동 배포된다.

**Vercel 환경변수 설정:**

| Key | Value |
|-----|-------|
| `NOTION_API_KEY` | Notion Integration 토큰 |
| `NOTION_DATABASE_ID` | Notion DB의 32자리 UUID |

Vercel의 `main` 브랜치 푸시 → 자동 빌드 → ISR로 콘텐츠 자동 갱신.
