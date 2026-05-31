// 프로젝트 전역 타입 정의

// Notion DB 레코드 하나를 매핑한 뉴스 아티클 타입
export interface NewsArticle {
  id: string              // Notion 페이지 ID (UUID)
  title: string           // 뉴스 제목
  summary: string         // 뉴스 요약 (rich_text)
  category: string        // 경제 카테고리
  tags: string[]          // 태그 목록
  published: Date         // 발행일
  status: "Draft" | "Published"  // Notion 상태 필드
  thumbnail: string | null       // 썸네일 이미지 URL
  source: string | null          // 원문 뉴스 링크
  slug: string            // URL용 식별자 (id 기반)
}

// Notion 본문 블록 하나를 매핑한 타입
export interface NotionBlock {
  id: string              // 블록 ID
  type: string            // 블록 종류 (paragraph, heading_1, image 등)
  content: object         // 렌더링할 텍스트/미디어 데이터 (Notion API 원본)
  parentId: string        // 부모 블록 ID
}
