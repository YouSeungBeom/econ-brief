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

### Phase 1: 애플리케이션 골격 구축 ✅

> 프로젝트 구조, 타입 정의, 공통 레이아웃 골격 완성

- **Task 001: 스타터킷 초기 세팅** ✅ — 완료
  - ✅ Next.js 16 App Router 기반 프로젝트 초기화
  - ✅ TypeScript strict 모드, TailwindCSS v4, shadcn/ui 설정
  - ✅ `app/layout.tsx` — ThemeProvider → TooltipProvider → Header/Footer 전역 레이아웃
  - ✅ `app/not-found.tsx` — 404 페이지

- **Task 002: 타입 정의 및 프로젝트 구조 확립** ✅ — 완료
  - 관련 기능: `F001`, `F002`, `F010`
  - ✅ `lib/types.ts` — `NewsArticle`, `NotionBlock` 인터페이스 정의
  - ✅ `lib/constants.ts` — `SITE_CONFIG`, `CATEGORIES` 상수 추가
  - ✅ `app/category/[category]/page.tsx` — 카테고리 페이지 라우트 골격 생성
  - ✅ `app/news/[id]/page.tsx` — 뉴스 상세 페이지 라우트 골격 생성
  - ✅ `app/loading.tsx` — 전역 로딩 UI (뉴스 그리드 스켈레톤)

- **Task 003: 공통 레이아웃 컴포넌트 구현** ✅ — 완료
  - 관련 기능: `F003`, `F012`
  - ✅ `components/layout/header.tsx` — 로고 + 카테고리 탭 + 테마 토글 + 모바일 햄버거 메뉴
  - ✅ `components/layout/footer.tsx` — 사이트 정보 / 출처 안내 푸터
  - ✅ `components/news/CategoryTabs.tsx` — 카테고리 탭 필터 (Client Component)

---

### Phase 2: UI 컴포넌트 완성 (더미 데이터 활용)

> 뉴스 관련 컴포넌트 UI를 완성하고, 더미 데이터로 전체 사용자 플로우 검증

- **Task 004: 뉴스 컴포넌트 UI 구현** 🔄 진행 중
  - 관련 기능: `F001`, `F002`, `F003`, `F004`, `F005`, `F012`
  - 현재 상태: 컴포넌트 파일 생성 완료, 내부 UI 구현 필요
  - `components/news/NewsCard.tsx` — 뉴스 카드 UI (제목·요약·카테고리·발행일·썸네일)
    - shadcn/ui `Card` 컴포넌트 활용
    - 썸네일 이미지 (`next/image`) 표시
    - 카테고리 배지 및 발행일 포맷 표시
    - 클릭 시 `/news/[id]` 라우팅
  - `components/news/NewsGrid.tsx` — 카드 그리드 레이아웃
    - 반응형 1열(모바일) → 2열(태블릿) → 3열(데스크톱)
    - 더미 `NewsArticle[]` 배열을 props로 수신
  - `components/news/HeroSection.tsx` — 홈 상단 히어로 섹션 완성
    - 최신 뉴스 1-3건 대형 카드 강조 표시 (더미 데이터 활용)
    - 서비스명 및 설명 텍스트 포함
  - `components/news/TagBadge.tsx` — 태그 배지 컴포넌트
    - 클릭 시 홈(`/?tag=<값>`)으로 이동
    - shadcn/ui `Badge` 컴포넌트 활용
  - `components/news/NotionRenderer.tsx` — Notion 블록 렌더러 골격 완성
    - `paragraph`, `heading_1/2/3`, `bulleted_list_item`, `quote`, `image` 블록 타입 처리
    - Tailwind Typography (`prose`) 클래스 적용

- **Task 005: 전체 페이지 UI 완성** ⬜ 미시작
  - 관련 기능: `F001`, `F002`, `F003`, `F004`, `F005`, `F011`, `F012`
  - `app/page.tsx` — 홈 페이지 UI 완성
    - `HeroSection` + `CategoryTabs` + `NewsGrid` 컴포넌트 조합
    - 더미 `NewsArticle[]` 배열로 전체 레이아웃 검증
    - `export const revalidate = 3600` 선언 (ISR 준비)
  - `app/category/[category]/page.tsx` — 카테고리 페이지 UI 완성
    - 카테고리명 헤딩 + 필터링된 `NewsGrid`
    - `generateStaticParams`로 CATEGORIES 기반 정적 경로 생성
  - `app/news/[id]/page.tsx` — 뉴스 상세 페이지 UI 완성
    - 아티클 헤더 (제목, 카테고리 배지, 발행일)
    - 썸네일 이미지 영역
    - AI 요약 강조 블록 (summary 필드)
    - `NotionRenderer`로 본문 블록 렌더링
    - `TagBadge` 목록 + 원문 링크 버튼
  - 반응형 디자인 최종 검증 (모바일 375px, 태블릿 768px, 데스크톱 1280px)

---

### Phase 3: Notion API 연동 및 핵심 기능 구현

> 더미 데이터를 실제 Notion API 호출로 교체하고 핵심 비즈니스 로직 완성

- **Task 006: Notion API 클라이언트 구현** ⬜ 미시작
  - 관련 기능: `F001`, `F002`, `F010`
  - 사전 조건: `npm install @notionhq/client` 실행, `.env.local` 환경변수 설정
  - `lib/notion.ts` 완전 구현
    - `@notionhq/client` `Client` 초기화 (`NOTION_API_KEY` 활용)
    - `getNewsArticles()` — Notion DB 쿼리 (status = Published 필터, published 내림차순 정렬)
    - `getNewsArticlesByCategory(category)` — 카테고리 필터 쿼리
    - `getNewsArticle(id)` — 단건 페이지 조회
    - `getNewsBlocks(pageId)` — 페이지 블록 Children 조회
    - `getAllArticleIds()` — ISR `generateStaticParams`용 ID 목록 반환
    - Notion API 응답을 `NewsArticle` 타입으로 파싱하는 변환 함수 구현

  #### 테스트 체크리스트
  - [ ] `getNewsArticles()` 호출 시 Published 뉴스만 반환되는지 확인
  - [ ] `getNewsArticlesByCategory("macro")` 호출 시 거시경제 뉴스만 반환되는지 확인
  - [ ] `getNewsArticle(id)` 호출 시 단건 아티클 데이터가 올바르게 파싱되는지 확인
  - [ ] `getNewsBlocks(pageId)` 호출 시 블록 배열이 반환되는지 확인
  - [ ] 존재하지 않는 ID 조회 시 `null` 반환 여부 확인

- **Task 007: 홈 페이지 및 카테고리 페이지 Notion 연동** ⬜ 미시작
  - 관련 기능: `F001`, `F003`, `F011`, `F012`
  - `app/page.tsx` — 더미 데이터를 `getNewsArticles()` 실제 호출로 교체
    - `export const revalidate = 3600` 적용 (1시간 ISR)
    - `HeroSection`에 최신 1-3건 데이터 연결
    - `NewsGrid`에 전체 뉴스 목록 연결
  - `app/category/[category]/page.tsx` — `getNewsArticlesByCategory()` 연결
    - `generateStaticParams`에 `getAllArticleIds()` 연동
    - `export const revalidate = 3600` 적용

  #### 테스트 체크리스트
  - [ ] 홈 페이지 접속 시 Notion DB 뉴스 목록이 렌더링되는지 확인
  - [ ] 카테고리 탭 클릭 시 해당 카테고리 뉴스만 표시되는지 확인
  - [ ] ISR revalidate 설정이 빌드 시 적용되는지 확인 (`npm run build`)
  - [ ] 빈 카테고리 접근 시 빈 목록 상태가 올바르게 표시되는지 확인

- **Task 008: 뉴스 상세 페이지 Notion 연동** ⬜ 미시작
  - 관련 기능: `F002`, `F004`, `F010`, `F011`
  - `app/news/[id]/page.tsx` — 실제 데이터 연동
    - `getNewsArticle(id)` 호출 후 null이면 `notFound()` 처리
    - `getNewsBlocks(id)` 호출 후 `NotionRenderer`에 연결
    - `generateMetadata`에 아티클 제목 반영
    - `generateStaticParams`에 `getAllArticleIds()` 연동
    - `export const revalidate = 3600` 적용
  - `components/news/NotionRenderer.tsx` — 블록 타입별 완전 구현
    - `paragraph` — `<p>` 태그 + 인라인 텍스트 스타일(bold, italic, code, link)
    - `heading_1/2/3` — `<h1>/<h2>/<h3>` 태그
    - `bulleted_list_item` / `numbered_list_item` — `<ul>/<ol>/<li>` 태그
    - `quote` — `<blockquote>` 태그
    - `image` — `next/image` 컴포넌트 (`external` / `file` URL 분기 처리)
    - `code` — `<pre><code>` 태그 + 언어 속성 처리
    - 알 수 없는 블록 타입 방어 처리 (fallback)

  #### 테스트 체크리스트
  - [ ] 뉴스 카드 클릭 시 상세 페이지로 이동하고 본문이 렌더링되는지 확인
  - [ ] 존재하지 않는 ID로 접근 시 404 페이지가 표시되는지 확인
  - [ ] 다크 모드에서 `prose-invert` 스타일이 올바르게 적용되는지 확인
  - [ ] 썸네일 이미지가 없는 아티클에서 UI 깨짐 없이 표시되는지 확인
  - [ ] 태그 배지 클릭 시 홈 페이지로 이동하는지 확인
  - [ ] 원문 링크 버튼 클릭 시 새 탭으로 외부 페이지가 열리는지 확인

- **Task 009: 태그 기반 탐색 구현** ⬜ 미시작
  - 관련 기능: `F004`
  - `app/page.tsx` — `searchParams`로 `tag` 쿼리 파라미터 수신 후 필터링
  - `lib/notion.ts` — `getNewsArticlesByTag(tag)` 함수 추가
  - `components/news/TagBadge.tsx` — `/?tag=<값>` URL로 이동하는 Link 완성
  - 태그 필터 활성 시 홈 페이지 상단에 현재 태그 표시 및 초기화 버튼 제공

  #### 테스트 체크리스트
  - [ ] 뉴스 상세에서 태그 클릭 시 홈 페이지에 태그 필터가 적용되는지 확인
  - [ ] 태그 필터 적용 시 해당 태그를 가진 뉴스만 표시되는지 확인
  - [ ] 태그 초기화(전체) 클릭 시 전체 뉴스 목록으로 복귀하는지 확인

- **Task 009-1: Notion API 통합 E2E 테스트** ⬜ 미시작
  - Playwright MCP를 사용한 전체 사용자 플로우 E2E 테스트
  - 홈 → 카테고리 페이지 → 뉴스 상세 → 뒤로가기 플로우 검증
  - 태그 클릭 → 홈 필터링 플로우 검증
  - 원문 링크 외부 이동 검증
  - 에러 케이스 (404, 빈 목록, 네트워크 오류) 처리 검증

---

### Phase 4: 성능 최적화 및 배포

> ISR 전략 최적화, SEO 완성, Vercel 배포 파이프라인 구축

- **Task 010: SEO 및 메타데이터 완성** ⬜ 미시작
  - 관련 기능: `F011`
  - `app/layout.tsx` — 전역 `metadata` 객체 완성 (OG 이미지, Twitter 카드)
  - 각 페이지 `generateMetadata` — 아티클/카테고리별 동적 title, description, OG
  - `public/` — 기본 OG 이미지 및 favicon 추가
  - `robots.txt` / `sitemap.xml` — Next.js 내장 Metadata API 활용

- **Task 011: 성능 최적화** ⬜ 미시작
  - 관련 기능: `F011`, `F012`
  - `next/image` — 이미지 최적화 (도메인 허용 목록, `sizes` 속성 설정)
  - ISR `revalidate` 값 조정 (콘텐츠 업데이트 빈도 기반)
  - `loading.tsx` — 스켈레톤 UI가 실제 레이아웃과 일치하도록 개선
  - Notion API 응답 에러 핸들링 강화 (rate limit, timeout 대응)

- **Task 012: Vercel 배포 및 환경변수 설정** ⬜ 미시작
  - Vercel 프로젝트 연결 및 GitHub 자동 배포 설정
  - `NOTION_API_KEY`, `NOTION_DATABASE_ID` 환경변수 Vercel 대시보드 등록
  - 프로덕션 빌드 검증 (`npm run build && npm run start`)
  - 배포 후 홈·카테고리·상세 페이지 동작 확인
  - Vercel Analytics 활성화 (선택)

---

## 기능 ID 인덱스

| 기능 ID | 기능명 | 관련 Task |
|---------|--------|----------|
| F001 | Notion 뉴스 목록 조회 | Task 002, 004, 005, 006, 007 |
| F002 | 뉴스 상세 조회 | Task 002, 004, 005, 008 |
| F003 | 카테고리 필터링 | Task 003, 004, 005, 007 |
| F004 | 태그 기반 탐색 | Task 004, 005, 008, 009 |
| F005 | 주요 뉴스 하이라이트 | Task 004, 005, 007 |
| F010 | Notion API 연동 | Task 002, 006, 007, 008 |
| F011 | ISR 캐시 전략 | Task 005, 007, 008, 010, 011 |
| F012 | 반응형 레이아웃 | Task 003, 004, 005, 007, 011 |

---

## 진행 현황

| Phase | 상태 | 완료 Task |
|-------|------|----------|
| Phase 1: 애플리케이션 골격 구축 | ✅ 완료 | Task 001, 002, 003 |
| Phase 2: UI 컴포넌트 완성 | 🔄 진행 중 | Task 004 진행 중 |
| Phase 3: Notion API 연동 및 핵심 기능 구현 | ⬜ 미시작 | — |
| Phase 4: 성능 최적화 및 배포 | ⬜ 미시작 | — |
