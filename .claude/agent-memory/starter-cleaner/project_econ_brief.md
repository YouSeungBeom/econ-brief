---
name: project-econ-brief
description: Econ Brief 프로젝트 초기화 작업 내용 및 현재 구조 스냅샷
metadata:
  type: project
---

Econ Brief 스타터킷 초기화 완료 (2026-05-31).

**Why:** Notion CMS 기반 경제 뉴스 서비스 MVP 개발을 위해 Next.js 스타터킷 데모 콘텐츠를 제거하고 실제 프로젝트 구조로 전환.

**How to apply:** 이후 작업 시 아래 구조를 기준으로 진행. 빈 껍데기 파일들에 실제 구현 추가 필요.

## 제거된 항목
- `app/login/` 라우트 (MVP에 인증 없음)
- `components/auth/` 디렉토리 (LoginForm 등)
- `constants.ts`의 NAV_LINKS, FOOTER_LINKS, FEATURES 상수

## 생성된 파일
- `lib/types.ts` — NewsArticle, NotionBlock 타입 정의
- `lib/notion.ts` — Notion API 함수 껍데기 (TODO 주석 포함)
- `app/category/[category]/page.tsx` — 카테고리 라우트 껍데기
- `app/news/[id]/page.tsx` — 뉴스 상세 라우트 껍데기
- `components/news/` — NewsCard, NewsGrid, HeroSection, CategoryTabs, TagBadge, NotionRenderer
- `.env.local.example` — NOTION_API_KEY, NOTION_DATABASE_ID 환경변수 템플릿

## 다음 구현 필요 작업
1. `@notionhq/client` 패키지 설치 후 `lib/notion.ts` 구현
2. `components/news/` 컴포넌트 실제 UI 구현
3. `app/page.tsx`에 HeroSection, CategoryTabs, NewsGrid 연결
4. ISR revalidate 설정
