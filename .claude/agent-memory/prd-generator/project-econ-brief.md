---
name: project-econ-brief
description: Econ Brief 프로젝트 개요 — Notion CMS 기반 경제 뉴스 요약 웹 플랫폼, PRD 작성 완료
metadata:
  type: project
---

PRD가 `docs/PRD.md`에 작성되었다. Next.js 16 App Router 스타터킷 위에 Notion API 연동으로 경제 뉴스 콘텐츠를 발행하는 구조.

**Why:** Notion에서 작성한 콘텐츠가 자동으로 웹에 반영되도록 Notion을 CMS로 활용. 별도 백엔드/DB 구축 없이 1인 개발자가 운영 가능한 구조를 목표로 함.

**How to apply:** 신규 기능 추가나 코드 작업 시 PRD의 기능 ID(F001~F012), 디렉토리 구조, 데이터 모델을 참조할 것. 스타터킷의 `lib/constants.ts`, `components/`, `app/` 구조를 그대로 확장하는 방식으로 설계됨.

핵심 기술:
- `@notionhq/client`: Notion DB 쿼리 및 블록 패치
- ISR(`revalidate`): Notion API 호출 최소화
- 환경변수: `NOTION_API_KEY`, `NOTION_DATABASE_ID`

Notion DB 스키마 주요 필드: Title, Summary, Category, Tags, Published, Status(초안/발행됨), Thumbnail, Source, Content(page content)
