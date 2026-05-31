// Notion API 연동 모듈 (ISR/SSG 데이터 페칭)
// TODO: @notionhq/client 패키지 설치 후 구현
// npm install @notionhq/client

import type { NewsArticle, NotionBlock } from "@/lib/types"

// Notion 클라이언트 초기화
// TODO: 실제 클라이언트 연결
// const notion = new Client({ auth: process.env.NOTION_API_KEY })

// 뉴스 목록 전체 조회 (Published 상태만 반환)
export async function getNewsArticles(): Promise<NewsArticle[]> {
  // TODO: Notion DB 쿼리 구현
  // - NOTION_DATABASE_ID 환경변수 사용
  // - status === "Published" 필터
  // - published 내림차순 정렬
  return []
}

// 카테고리별 뉴스 목록 조회
export async function getNewsArticlesByCategory(
  category: string
): Promise<NewsArticle[]> {
  // TODO: category 필터 추가
  const articles = await getNewsArticles()
  if (category === "all") return articles
  return articles.filter((article) => article.category === category)
}

// 단일 뉴스 아티클 조회 (상세 페이지용)
export async function getNewsArticle(id: string): Promise<NewsArticle | null> {
  // TODO: Notion 페이지 단건 조회 구현
  return null
}

// 뉴스 본문 블록 목록 조회
export async function getNewsBlocks(pageId: string): Promise<NotionBlock[]> {
  // TODO: Notion 블록 Children 조회 구현
  return []
}

// ISR용 정적 경로 생성 (generateStaticParams에서 사용)
export async function getAllArticleIds(): Promise<string[]> {
  // TODO: 모든 Published 아티클 ID 목록 반환
  return []
}
