# Econ Brief 개발 로드맵

Notion CMS 기반 경제 뉴스 요약 서비스를 단계적으로 구축하는 개발 계획서.

## 개요

**Econ Brief**는 바쁜 직장인과 경제 관심층을 위해 Notion DB의 콘텐츠를 자동 발행하고, 카테고리·태그 기반으로 탐색할 수 있는 경제 뉴스 웹 서비스다.

- **뉴스 목록 조회**: Notion DB에서 발행됨 상태의 뉴스를 최신순 렌더링
- **뉴스 상세 조회**: 제목·요약·본문·태그·원문 링크를 완전하게 표시
- **카테고리·태그 탐색**: 카테고리 탭 및 태그 배지로 관련 뉴스 필터링
- **주요 뉴스 하이라이트**: 홈 히어로 영역에서 최신 뉴스 1-3건 강조

---

## 개발 워크플로우

1. **작업 계획** — 기존 코드베이스를 파악하고 `ROADMAP.md` 업데이트
2. **작업 생성** — `/tasks` 디렉토리에 `XXX-description.md` 형식으로 작업 파일 생성
3. **작업 구현** — 명세서에 따라 구현하고, API/비즈니스 로직 완료 시 Playwright MCP 테스트 수행
4. **로드맵 업데이트** — 완료된 작업을 ✅로 표시

---

## 개발 단계

### Phase 1: 프로젝트 골격 구축 ✅

> **왜 이 순서인가?**
> 모든 개발 작업의 전제 조건이다. 프레임워크 초기화와 전역 레이아웃 뼈대가 없으면 어떤 파일도 실행 환경을 갖지 못한다.
> 이 단계에서는 "무엇을 만들지"가 아니라 "어디에 만들지"를 확정한다.
> 라우트 파일은 빈 껍데기로만 생성하며, 실제 UI나 로직은 이후 단계에서 채운다.

- **Task 001: 스타터킷 초기 세팅** ✅ — 완료
  - ✅ Next.js 16 App Router 기반 프로젝트 초기화
  - ✅ TypeScript strict 모드, TailwindCSS v4, shadcn/ui 설정
  - ✅ `app/layout.tsx` — ThemeProvider → TooltipProvider → Header/Footer 전역 레이아웃
  - ✅ `app/not-found.tsx` — 404 페이지
  - ✅ `app/category/[category]/page.tsx` — 카테고리 페이지 라우트 골격 생성
  - ✅ `app/news/[id]/page.tsx` — 뉴스 상세 페이지 라우트 골격 생성
  - ✅ `app/loading.tsx` — 전역 로딩 UI (뉴스 그리드 스켈레톤)

---

### Phase 2: 공통 모듈 구축 ✅

> **왜 이 순서인가?**
> 공통 모듈은 이후 모든 Phase의 코드가 import하는 의존성이다.
> 타입 정의(types.ts)가 없으면 컴포넌트와 API 함수의 시그니처를 정할 수 없고,
> 상수(constants.ts)가 없으면 카테고리 목록이 여러 곳에 하드코딩된다.
> Notion API 클라이언트(notion.ts)는 핵심 기능 구현(Phase 3)에서 007·008·009가 모두 의존하므로,
> Phase 3 진입 전에 독립적으로 완성되어야 한다.
> Header·Footer 역시 모든 페이지 UI의 공통 껍데기이므로 이 단계에서 완성한다.

- **Task 002: 타입 정의 및 공통 상수 확립** ✅ — 완료
  - 관련 기능: `F001`, `F002`, `F010`
  - ✅ `lib/types.ts` — `NewsArticle`, `NotionBlock` 인터페이스 정의
  - ✅ `lib/constants.ts` — `SITE_CONFIG`, `CATEGORIES` 상수 추가

- **Task 003: 공통 레이아웃 컴포넌트 구현** ✅ — 완료
  - 관련 기능: `F003`, `F012`
  - ✅ `components/layout/header.tsx` — 로고 + 카테고리 탭 + 테마 토글 + 모바일 햄버거 메뉴
  - ✅ `components/layout/footer.tsx` — 사이트 정보 / 출처 안내 푸터
  - ✅ `components/news/CategoryTabs.tsx` — 카테고리 탭 필터 (Client Component)

- **Task 004: Notion API 클라이언트 구현** ✅ — 완료
  - 관련 기능: `F001`, `F002`, `F010`
  - ✅ `npm install @notionhq/client` 설치 완료
  - ✅ `.env.local` 환경변수 (`NOTION_API_KEY`, `NOTION_DATABASE_ID`) 설정 완료
  - ✅ `lib/notion.ts` 완전 구현
    - ✅ `@notionhq/client` `Client` 초기화 (`NOTION_API_KEY` 활용)
    - ✅ `getDataSourceId()` — DB → data_source_id 1회 조회 후 캐싱 (신 SDK 대응)
    - ✅ `getNewsArticles()` — Notion DB 쿼리 (status = Published 필터, published 내림차순 정렬)
    - ✅ `getNewsArticlesByCategory(category)` — 카테고리 필터 쿼리
    - ✅ `getNewsArticlesByTag(tag)` — 태그 필터 쿼리
    - ✅ `getNewsArticle(id)` — 단건 페이지 조회
    - ✅ `getNewsBlocks(pageId)` — 페이지 블록 Children 조회 (iteratePaginatedAPI)
    - ✅ `getAllArticleIds()` — ISR `generateStaticParams`용 ID 목록 반환
    - ✅ `parsePageToNewsArticle()` — Notion API 응답을 `NewsArticle` 타입으로 파싱

  > ⚠️ **참고**: 신 SDK(`@notionhq/client` 최신)에서 `databases.query`가 `dataSources.query`로 변경됨.
  > `data_source_id`는 `databases.retrieve`로 조회 후 캐싱하는 방식으로 구현.

  #### 테스트 체크리스트 (Notion DB에 데이터 추가 후 검증)
  - [x] `getNewsArticles()` 호출 시 Published 뉴스만 반환되는지 확인
  - [x] `getNewsArticlesByCategory("macro")` 호출 시 거시경제 뉴스만 반환되는지 확인
  - [x] `getNewsArticlesByTag(tag)` 호출 시 해당 태그 뉴스만 반환되는지 확인
  - [x] `getNewsArticle(id)` 호출 시 단건 아티클 데이터가 올바르게 파싱되는지 확인
  - [x] `getNewsBlocks(pageId)` 호출 시 블록 배열이 반환되는지 확인 (Notion DB에 본문 블록 없으면 빈 배열 반환 — 정상 동작)
  - [x] 존재하지 않는 ID 조회 시 `null` 반환 여부 확인

---

### Phase 3: 핵심 기능 구현 ✅

> **왜 이 순서인가?**
> Phase 2에서 공통 모듈이 완성되었으므로, 이제 실제 사용자에게 보이는 화면과 데이터 흐름을 완성한다.
> "뉴스 목록 조회(F001)"와 "뉴스 상세 조회(F002)"는 서비스가 동작하기 위한 최소 요건이다.
> 이것 없이는 나머지 기능(카테고리·태그 필터, 히어로)이 존재해도 콘텐츠가 없다.
> UI 컴포넌트를 먼저 더미 데이터로 완성한 뒤 실제 API로 교체하는 순서로 진행하여,
> 데이터 연동 전에 레이아웃 오류를 조기에 발견한다.

- **Task 005: 뉴스 컴포넌트 UI 구현** ✅ — 완료
  - 관련 기능: `F001`, `F002`, `F003`, `F004`, `F005`, `F012`
  - ✅ `components/news/TagBadge.tsx` — `Badge asChild` + `Link` 조합, `/?tag=<인코딩값>` 이동
  - ✅ `components/news/NewsCard.tsx` — Card + 썸네일(`next/image`) + 카테고리 배지 + 날짜 + TagBadge
  - ✅ `components/news/NewsGrid.tsx` — 반응형 3열 그리드 + 빈 상태 UI (`Newspaper` 아이콘 + CTA)
  - ✅ `components/news/HeroSection.tsx` — `articles: NewsArticle[]` props, 1건/2~3건 레이아웃 분기, 그라데이션 오버레이
  - ✅ `components/news/NotionRenderer.tsx` — `paragraph`, `heading_1/2/3`, `bulleted_list_item`, `numbered_list_item`, `quote`, `code`, `image` 7종 블록 처리, `renderRichText()` 헬퍼 분리
  - ✅ `next.config.ts` — Notion/S3/Unsplash 이미지 도메인 `remotePatterns` 추가

- **Task 006: 전체 페이지 UI 완성 (더미 데이터)** ✅ — 완료
  - 관련 기능: `F001`, `F002`, `F003`, `F004`, `F005`, `F011`, `F012`
  - ✅ `lib/dummy.ts` — `NewsArticle` 6건 + `NotionBlock` 7건 더미 데이터 분리 (`@/lib/dummy` import 통일)
  - ✅ `app/page.tsx` — 홈 페이지 UI 완성
    - ✅ `HeroSection` + `CategoryTabs` + `NewsGrid` 컴포넌트 조합
    - ✅ 더미 `NewsArticle[]` 배열로 전체 레이아웃 검증
    - ✅ `export const revalidate = 3600` 선언 (ISR 준비)
  - ✅ `app/category/[category]/page.tsx` — 카테고리 페이지 UI 완성
    - ✅ 카테고리명 헤딩 + 필터링된 `NewsGrid`
    - ✅ `generateStaticParams`로 CATEGORIES 기반 정적 경로 생성
    - ✅ 페이지 내 `CategoryTabs` — 다른 카테고리로 전환 가능하도록 탭 제공 (모바일에서 헤더 드로어 외 탐색 경로 확보)
  - ✅ `app/news/[id]/page.tsx` — 뉴스 상세 페이지 UI 완성
    - ✅ 아티클 헤더 (제목, 카테고리 배지, 발행일)
    - ✅ 썸네일 이미지 영역
    - ✅ AI 요약 강조 블록 (summary 필드)
    - ✅ `NotionRenderer`로 본문 블록 렌더링
    - ✅ `TagBadge` 목록 + 원문 링크 버튼
  - ✅ `components/news/NewsCard.tsx` — stretched link 패턴으로 중첩 `<a>` 태그 수정
  - ✅ 반응형 디자인 최종 검증 (모바일 375px, 태블릿 768px, 데스크톱 1280px)

- **Task 007: 홈 페이지 및 카테고리 페이지 Notion 연동** ✅ — 완료
  - 관련 기능: `F001`, `F003`, `F011`, `F012`
  - ✅ `lib/notion.ts` — `getNewsBlocks()` content 구조 버그 수정 (`block` → `block[blockType]` 추출)
  - ✅ `lib/notion.ts` — `parsePageToNewsArticle()`에서 Notion 영어 id → 한국어 label 변환 (`CATEGORIES` 활용)
  - ✅ `app/page.tsx` — `getNewsArticles()` 실제 호출로 교체, DUMMY_ARTICLES 제거
  - ✅ `app/category/[category]/page.tsx` — `getNewsArticlesByCategory(category)` 연결 (id 직접 전달)
  - ✅ `next.config.ts` — `imgnews.pstatic.net` 이미지 도메인 추가
  - ✅ `export const revalidate = 3600` 적용 (1시간 ISR)
  - ✅ 빈 카테고리 접근 시 빈 목록 상태 정상 표시 확인

  #### 테스트 체크리스트
  - [x] 홈 페이지 접속 시 Notion DB 뉴스 목록이 렌더링되는지 확인
  - [x] 카테고리 탭 클릭 시 해당 카테고리 뉴스만 표시되는지 확인
  - [x] ISR revalidate 설정이 빌드 시 적용되는지 확인 (`npm run build`)
  - [x] 빈 카테고리 접근 시 빈 목록 상태가 올바르게 표시되는지 확인

- **Task 008: 뉴스 상세 페이지 Notion 연동** ✅ — 완료
  - 관련 기능: `F002`, `F004`, `F010`, `F011`
  - ✅ `app/news/[id]/page.tsx` — 실제 데이터 연동
    - ✅ `getNewsArticle(id)` 호출 후 null이면 `notFound()` 처리
    - ✅ `getNewsBlocks(id)` 호출 후 `NotionRenderer`에 연결
    - ✅ `generateMetadata`에 아티클 제목 반영
    - ✅ `generateStaticParams`에 `getAllArticleIds()` 연동
    - ✅ `export const revalidate = 3600` 적용
  - ✅ `components/news/NotionRenderer.tsx` — Task 005에서 이미 완전 구현 (수정 불필요)

  #### 테스트 체크리스트
  - [x] 뉴스 카드 클릭 시 상세 페이지로 이동하고 본문이 렌더링되는지 확인
  - [x] 존재하지 않는 ID로 접근 시 404 페이지가 표시되는지 확인
  - [x] 썸네일 이미지가 있는 아티클에서 UI 정상 표시 확인
  - [x] 태그 배지 클릭 시 홈 페이지로 이동하는지 확인
  - [x] 원문 링크 버튼 클릭 시 새 탭으로 외부 페이지가 열리는지 확인

---

### Phase 4: 추가 기능 구현 ✅

> **왜 이 순서인가?**
> 카테고리 필터(F003)·태그 탐색(F004)·히어로 섹션(F005)은 핵심 기능(뉴스 목록·상세 조회)이
> 실제 데이터와 연동된 이후에야 의미 있게 동작한다.
> 더미 데이터 단계에서는 UI 골격만 확인하고, 실제 필터링 로직은 이 단계에서 완성한다.
> E2E 테스트는 모든 사용자 플로우가 갖춰진 시점에 전체 흐름을 한 번에 검증한다.

- **Task 009: 태그 기반 탐색 구현** ✅ — 완료
  - 관련 기능: `F004`
  - ✅ `app/page.tsx` — `searchParams`로 `tag` 쿼리 파라미터 수신 후 `getNewsArticlesByTag()` 분기 호출
  - ✅ `components/news/TagBadge.tsx` — `/?tag=<인코딩값>` URL 링크 (Task 005에서 이미 구현)
  - ✅ 태그 필터 활성 시 배너 표시 (태그명 + X 아이콘 + "전체 보기" 초기화 링크)

  #### 테스트 체크리스트
  - [x] 뉴스 상세에서 태그 클릭 시 홈 페이지에 태그 필터가 적용되는지 확인
  - [x] 태그 필터 적용 시 해당 태그를 가진 뉴스만 표시되는지 확인
  - [x] 태그 초기화(전체 보기) 클릭 시 전체 뉴스 목록으로 복귀하는지 확인

- **Task 010: Notion API 통합 E2E 테스트** ✅ — 완료
  - ✅ 홈 → 글로벌 카테고리 탭 → 뉴스 상세 → 뒤로가기 전체 플로우 검증
  - ✅ 태그 클릭 → 홈 필터링 플로우 검증 (이전 세션 완료)
  - ✅ 원문 링크 클릭 → 새 탭으로 외부 URL 열기 검증
  - ✅ 404 에러 케이스 (존재하지 않는 ID) 처리 검증 (이전 세션 완료)
  - ✅ 빈 목록 케이스 (거시경제 카테고리 빈 상태) 검증 (이전 세션 완료)
  - ✅ `getNewsBlocks()` — Notion DB에 본문 블록 없으면 빈 배열 반환, NotionRenderer "본문이 없습니다" 표시 정상 동작 확인

---

### Phase 5: 최적화 및 배포 ✅

> **왜 이 순서인가?**
> 모든 기능이 완성된 후에야 무엇을 최적화할지 판단할 수 있다.
> ISR revalidate 값, 이미지 도메인 허용 목록, 메타데이터는 실제 콘텐츠 구조를 보고 결정해야 한다.
> SEO·성능 작업을 먼저 하면 기능 변경 시 메타데이터를 반복해서 수정해야 한다.
> 배포는 가장 마지막에 수행하여 프로덕션 환경의 환경변수와 빌드 검증을 한 번에 처리한다.

- **Task 011: SEO 및 메타데이터 완성** ✅ — 완료
  - 관련 기능: `F011`
  - ✅ `app/layout.tsx` — `metadataBase`, title template, OG/Twitter 전역 메타데이터 완성
  - ✅ 각 페이지 `generateMetadata` — 아티클/카테고리별 동적 title, description, OG, canonical 추가
  - ✅ `public/og-default.png` — 기본 OG 이미지 추가 (1200×630px)
  - ✅ `app/sitemap.ts` — 동적 사이트맵 생성 (홈 + 카테고리 + 전체 뉴스, 24시간 revalidate)
  - ✅ `app/robots.ts` — robots.txt 생성 (전체 허용 + sitemap URL 지정)

- **Task 012: 성능 최적화** ✅ — 완료
  - 관련 기능: `F011`, `F012`
  - ✅ `next.config.ts` — AVIF/WebP 이미지 포맷 추가, `minimumCacheTTL: 3600` 설정
  - ✅ `app/news/[id]/page.tsx` — `revalidate` 3600 → 86400 (24시간)으로 조정
  - ✅ `app/loading.tsx` — 실제 HeroSection 레이아웃에 맞는 스켈레톤 UI 개선
  - ✅ `lib/notion.ts` — `timeoutMs: 10000` 설정, 5개 함수 try/catch 에러 핸들링 추가

- **Task 013: Vercel 배포 및 환경변수 설정** ✅ — 완료
  - ✅ Vercel 프로젝트 연결 및 GitHub 자동 배포 설정
  - ✅ `NOTION_API_KEY`, `NOTION_DATABASE_ID` 환경변수 Vercel 대시보드 등록
  - ✅ 프로덕션 빌드 검증 (`npm run build`)
  - ✅ 배포 후 홈·카테고리·상세 페이지 동작 확인
  - ✅ Vercel Analytics 활성화 (선택)

---

## 기능 ID 인덱스

| 기능 ID | 기능명 | 관련 Task |
|---------|--------|----------|
| F001 | Notion 뉴스 목록 조회 | Task 002, 004, 005, 006, 007 |
| F002 | 뉴스 상세 조회 | Task 002, 004, 005, 006, 008 |
| F003 | 카테고리 필터링 | Task 003, 005, 006, 007 |
| F004 | 태그 기반 탐색 | Task 005, 006, 008, 009 |
| F005 | 주요 뉴스 하이라이트 | Task 005, 006, 007 |
| F010 | Notion API 연동 | Task 002, 004, 007, 008 |
| F011 | ISR 캐시 전략 | Task 006, 007, 008, 011, 012 |
| F012 | 반응형 레이아웃 | Task 003, 005, 006, 007, 012 |

---

## 진행 현황

| Phase | 상태 | 완료 Task |
|-------|------|----------|
| Phase 1: 프로젝트 골격 구축 | ✅ 완료 | Task 001 |
| Phase 2: 공통 모듈 구축 | ✅ 완료 | Task 002, 003, 004 완료 |
| Phase 3: 핵심 기능 구현 | ✅ 완료 | Task 005, 006, 007, 008, 009 완료 |
| Phase 4: 추가 기능 구현 | ✅ 완료 | Task 009, 010 완료 |
| Phase 5: 최적화 및 배포 | ✅ 완료 | Task 011, 012, 013 완료 |
