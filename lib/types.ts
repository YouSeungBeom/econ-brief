// 프로젝트 전역 타입 정의

// Notion DB 레코드 하나를 매핑한 뉴스 아티클 타입
export interface NewsArticle {
  id: string              // Notion 페이지 ID (UUID)
  title: string           // 뉴스 제목
  summary: string         // 뉴스 요약 (rich_text)
  category: string        // 경제 카테고리
  tags: string[]          // 태그 목록
  published: string        // 발행일 (ISO 8601 문자열, ISR 직렬화 안전)
  status: "Draft" | "Published"  // Notion 상태 필드
  thumbnail: string | null       // 썸네일 이미지 URL
  source: string | null          // 원문 뉴스 링크
  slug: string            // URL용 식별자 (id 기반)
}

// Notion 인라인 텍스트 요소 타입
export interface NotionRichText {
  type: "text" | "mention" | "equation"
  plain_text: string
  href: string | null
  annotations: {
    bold: boolean
    italic: boolean
    strikethrough: boolean
    underline: boolean
    code: boolean
    color: string
  }
  text?: { content: string; link: { url: string } | null }
}

// 블록 타입별 content 유니온 — NotionRenderer에서 타입 안전하게 사용
export type NotionBlockContent =
  | { rich_text: NotionRichText[] }                                                                      // paragraph, heading, quote, list
  | { rich_text: NotionRichText[]; language?: string }                                                   // code (언어 속성 추가)
  | { type: "external" | "file"; external?: { url: string }; file?: { url: string }; caption?: NotionRichText[] }  // image
  | Record<string, unknown>                                                                              // fallback (알 수 없는 블록)

// Notion 본문 블록 하나를 매핑한 타입
export interface NotionBlock {
  id: string              // 블록 ID
  type: string            // 블록 종류 (paragraph, heading_1, image 등)
  content: NotionBlockContent  // 렌더링할 텍스트/미디어 데이터
  parentId: string        // 부모 블록 ID
}
