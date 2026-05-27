// 사이트 전역에서 사용하는 메타 정보 및 상수 모음

export const SITE_CONFIG = {
  name: "NextStarter",
  description: "Next.js 16 기반 모던 웹 개발 스타터킷",
  url: "https://example.com",
  github: "https://github.com",
}

// 헤더 네비게이션 링크 목록
export const NAV_LINKS = [
  { label: "홈", href: "/" },
  { label: "기능", href: "#features" },
  { label: "시작하기", href: "#get-started" },
]

// 푸터 링크 카테고리별 목록
export const FOOTER_LINKS: Record<string, { label: string; href: string }[]> = {
  제품: [
    { label: "기능", href: "#features" },
    { label: "문서", href: "#" },
    { label: "업데이트", href: "#" },
  ],
  리소스: [
    { label: "Next.js", href: "https://nextjs.org" },
    { label: "shadcn/ui", href: "https://ui.shadcn.com" },
    { label: "Tailwind CSS", href: "https://tailwindcss.com" },
  ],
  커뮤니티: [
    { label: "GitHub", href: SITE_CONFIG.github },
    { label: "Discord", href: "#" },
    { label: "Twitter", href: "#" },
  ],
}

// 랜딩 페이지 기능 카드 데이터
export const FEATURES = [
  {
    icon: "Zap",
    title: "Next.js 16",
    description: "최신 App Router와 React 19를 활용한 고성능 풀스택 프레임워크",
  },
  {
    icon: "Shield",
    title: "TypeScript",
    description: "엄격한 타입 검사로 런타임 오류를 사전에 방지하는 안전한 개발",
  },
  {
    icon: "Palette",
    title: "Tailwind CSS 4",
    description: "OKLch 색상과 CSS 변수 기반의 최신 유틸리티 퍼스트 스타일링",
  },
  {
    icon: "Component",
    title: "shadcn/ui",
    description: "Radix UI 기반의 접근성 높고 커스터마이징 가능한 컴포넌트",
  },
  {
    icon: "Sparkles",
    title: "Lucide React",
    description: "1500개 이상의 일관된 오픈소스 아이콘 라이브러리",
  },
  {
    icon: "Moon",
    title: "다크모드",
    description: "next-themes로 구현된 라이트/다크/시스템 모드 완벽 지원",
  },
]
