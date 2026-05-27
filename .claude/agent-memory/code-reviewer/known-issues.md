---
name: known-issues
description: 코드 리뷰에서 발견된 반복 패턴, 알려진 버그, 개선 필요 지점
metadata:
  type: project
---

## CSS 관련
- `globals.css` L10: `--font-sans: var(--font-sans)` 자기참조 순환 변수. layout.tsx에서 `--font-geist-sans`로 등록하지만 Tailwind @theme에서 이를 `--font-sans`로 매핑하지 않아 실제로 Geist Sans가 html body에 적용되지 않음. `--font-sans: var(--font-geist-sans)`가 되어야 함.
- `--font-heading: var(--font-sans)`도 위 오류를 계승하여 Card/Dialog 제목 폰트가 동일하게 영향받음.

## 접근성 (a11y)
- `ThemeToggle` (theme-toggle.tsx L34): 마운트 전 placeholder 버튼에 `aria-label`이 없음. 스크린 리더가 버튼 목적을 알 수 없음.
- `ThemeToggle` (theme-toggle.tsx L34): placeholder 버튼이 `size="icon"`을 지정하지 않아 실제 버튼(size="icon")과 크기가 다름 — 레이아웃 시프트 발생.
- `DesktopNav` (header.tsx): 현재 활성 페이지 링크에 `aria-current="page"` 없음.
- `SheetContent` 닫기 버튼 (sheet.tsx L80): `<span className="sr-only">Close</span>` 텍스트가 영어. 프로젝트 언어 정책(한국어)과 불일치.
- `DialogContent` 닫기 버튼 (dialog.tsx L79): 동일하게 영어 "Close".
- `DialogFooter` 닫기 버튼 (dialog.tsx L118): "Close" 영어 텍스트.

## 성능
- `header.tsx`: "use client" 전체 파일에 적용. Logo, DesktopNav는 상태 없음. MobileNav만 useState 사용. 서버 컴포넌트로 분리 가능.
- `footer.tsx` L53: `new Date().getFullYear()` — SSR 서버 컴포넌트이므로 빌드 시점이 아닌 요청 시점 연도가 렌더됨. 동적 렌더링 트리거 없이는 `next build` 시 정적으로 고정될 수 있음. 실제로는 연간 배포가 없으면 연도가 묵음. 허용 가능하나 의도 명확히 할 필요.

## 코드 품질
- `SITE_CONFIG.github` (constants.ts L7): `"https://github.com"` 플레이스홀더. 실제 레포 URL로 교체 필요.
- `FOOTER_LINKS` 중 `"#"` 플레이스홀더 다수 (문서, 업데이트, Discord, Twitter).
- `loading.tsx`: `Array.from({ length: 6 }).map((_, i)` — 인덱스를 key로 사용. 스켈레톤 특성상 허용되나 ESLint 경고 가능.
- `page.tsx`의 `ICON_MAP`은 FEATURES와 결합도가 높음. constants.ts 확장 시 icon 추가 누락 위험.
- `lucide` 와 `lucide-react` 둘 다 package.json에 존재 — 중복 패키지. `lucide`는 제거 검토.

**Why:** 스타터킷이 기반 코드가 되므로 이 이슈들이 후속 코드에 패턴으로 퍼질 수 있음
**How to apply:** 새 컴포넌트 작성 시 위 패턴 반복하지 않도록 주의
