// 사이트 전역에서 사용하는 메타 정보 및 상수 모음

// 사이트 기본 정보
export const SITE_CONFIG = {
  name: "Econ Brief",
  description: "바쁜 일상 속 경제 흐름을 짧고 명확하게 파악하는 경제 뉴스 요약 서비스",
  url: "https://econ-brief.vercel.app",
}

// 뉴스 카테고리 목록 (헤더 탭 및 필터링에 사용)
export const CATEGORIES = [
  { id: "all", label: "전체" },
  { id: "macro", label: "거시경제" },
  { id: "stock", label: "주식/증시" },
  { id: "realestate", label: "부동산" },
  { id: "global", label: "글로벌" },
] as const

// 카테고리 id 타입 추론용 유니온 타입
export type CategoryId = (typeof CATEGORIES)[number]["id"]
