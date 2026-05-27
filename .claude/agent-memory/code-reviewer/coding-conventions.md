---
name: coding-conventions
description: 프로젝트에서 관찰된 코딩 컨벤션 및 스타일 규칙
metadata:
  type: project
---

## 준수된 규칙
- 2스페이스 들여쓰기 전체 준수
- 각 컴포넌트/함수에 한글 주석 한 줄 (예: `// 사이트 로고 + 이름 조합 컴포넌트`)
- 함수 길이 30줄 이하 준수 (가장 긴 함수도 20줄 내외)
- 상수는 lib/constants.ts에서 임포트, 하드코딩 없음
- 컴포넌트 PascalCase, 변수/함수 camelCase 준수
- named export 사용 (default export는 page/layout/loading/not-found 예약 파일만)
- `cn()` 유틸 일관적 사용

## 파일별 컴포넌트 분리 패턴
- 한 파일에 여러 내부 함수형 컴포넌트 정의 후, 최종 export 컴포넌트에서 조합하는 패턴
- 예: header.tsx → Logo, DesktopNav, MobileNav → Header

## 타입 정의 방식
- `React.ComponentProps<"button">` 패턴으로 HTML 네이티브 속성 확장
- CVA(class-variance-authority)로 variant 타입 자동 추론

**How to apply:** 코드 작성 시 위 패턴 따르기. 특히 새 상수 추가는 constants.ts에.
