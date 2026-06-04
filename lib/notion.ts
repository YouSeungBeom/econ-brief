import {
  Client,
  isFullPage,
  isFullDatabase,
  iteratePaginatedAPI,
} from "@notionhq/client"
import type { PageObjectResponse } from "@notionhq/client"
import type { NewsArticle, NotionBlock } from "@/lib/types"
import { CATEGORIES } from "@/lib/constants"

// Notion 클라이언트 초기화 (Vercel 함수 타임아웃에 맞춰 10초 제한)
const notion = new Client({
  auth: process.env.NOTION_API_KEY,
  timeoutMs: 10000,
})

// 환경변수에서 DB ID 로드
const DATABASE_ID = process.env.NOTION_DATABASE_ID!

// data_source_id 캐시 — 신 SDK에서 query는 databases가 아닌 dataSources 통해 수행
let cachedDataSourceId: string | null = null

// databases.retrieve로 data_source_id 1회 조회 후 캐싱
async function getDataSourceId(): Promise<string> {
  if (cachedDataSourceId) return cachedDataSourceId
  const db = await notion.databases.retrieve({ database_id: DATABASE_ID })
  if (!isFullDatabase(db) || db.data_sources.length === 0) {
    throw new Error("Notion DB에서 데이터 소스를 찾을 수 없습니다.")
  }
  cachedDataSourceId = db.data_sources[0].id
  return cachedDataSourceId
}

// Notion 페이지 응답을 NewsArticle 타입으로 변환하는 파싱 함수
function parsePageToNewsArticle(page: PageObjectResponse): NewsArticle {
  // properties 단축 참조
  const p = page.properties

  // 각 Notion 속성을 안전하게 추출 (타입 가드 포함)
  const title =
    p["Title"]?.type === "title" ? (p["Title"].title[0]?.plain_text ?? "") : ""
  // rich_text 배열을 이어붙여 전체 요약 텍스트 반환
  const summary =
    p["Summary"]?.type === "rich_text"
      ? p["Summary"].rich_text.map((r) => r.plain_text).join("")
      : ""
  // Notion DB의 영어 ID("macro")를 한국어 label("거시경제")로 변환하여 표시에 사용
  const rawCategory =
    p["Category"]?.type === "select" ? (p["Category"].select?.name ?? "") : ""
  const category =
    CATEGORIES.find((c) => c.id === rawCategory)?.label ?? rawCategory
  const tags =
    p["Tags"]?.type === "multi_select"
      ? p["Tags"].multi_select.map((t) => t.name)
      : []
  // Date 객체 대신 ISO 문자열로 반환 — ISR 직렬화 시 타입 불일치 방지
  const published =
    p["Published"]?.type === "date" && p["Published"].date
      ? p["Published"].date.start
      : new Date().toISOString()
  const status =
    p["Status"]?.type === "status" && p["Status"].status
      ? (p["Status"].status.name as "Draft" | "Published")
      : "Draft"
  // Thumbnail은 url 타입 (files 아님)
  const thumbnail =
    p["Thumbnail"]?.type === "url" ? p["Thumbnail"].url : null
  const source = p["Source"]?.type === "url" ? p["Source"].url : null

  return {
    id: page.id,
    title,
    summary,
    category,
    tags,
    published,
    status,
    thumbnail,
    source,
    // slug는 Notion 페이지 ID를 그대로 사용
    slug: page.id,
  }
}

// Published 상태 뉴스 전체 조회 (발행일 내림차순)
export async function getNewsArticles(): Promise<NewsArticle[]> {
  try {
    const dataSourceId = await getDataSourceId()
    const response = await notion.dataSources.query({
      data_source_id: dataSourceId,
      filter: { property: "Status", status: { equals: "Published" } },
      sorts: [{ property: "Published", direction: "descending" }],
    })
    return response.results.filter(isFullPage).map(parsePageToNewsArticle)
  } catch (error) {
    // API 오류(rate limit, timeout 등) 발생 시 빈 배열 반환하여 페이지 렌더링 유지
    console.error("[notion] getNewsArticles 실패:", error)
    return []
  }
}

// 카테고리별 뉴스 조회 (all이면 전체 반환)
export async function getNewsArticlesByCategory(
  category: string
): Promise<NewsArticle[]> {
  if (category === "all") return getNewsArticles()

  try {
    const dataSourceId = await getDataSourceId()
    const response = await notion.dataSources.query({
      data_source_id: dataSourceId,
      filter: {
        and: [
          { property: "Status", status: { equals: "Published" } },
          { property: "Category", select: { equals: category } },
        ],
      },
      sorts: [{ property: "Published", direction: "descending" }],
    })
    return response.results.filter(isFullPage).map(parsePageToNewsArticle)
  } catch (error) {
    // API 오류 시 빈 목록 반환 — 카테고리 페이지 빈 상태 UI로 폴백
    console.error("[notion] getNewsArticlesByCategory 실패:", error)
    return []
  }
}

// 태그별 뉴스 조회 (multi_select contains 필터 사용)
export async function getNewsArticlesByTag(tag: string): Promise<NewsArticle[]> {
  try {
    const dataSourceId = await getDataSourceId()
    const response = await notion.dataSources.query({
      data_source_id: dataSourceId,
      filter: {
        and: [
          { property: "Status", status: { equals: "Published" } },
          { property: "Tags", multi_select: { contains: tag } },
        ],
      },
      sorts: [{ property: "Published", direction: "descending" }],
    })
    return response.results.filter(isFullPage).map(parsePageToNewsArticle)
  } catch (error) {
    // API 오류 시 빈 목록 반환 — 태그 필터 페이지 빈 상태 UI로 폴백
    console.error("[notion] getNewsArticlesByTag 실패:", error)
    return []
  }
}

// 단건 뉴스 아티클 조회 (존재하지 않으면 null 반환)
export async function getNewsArticle(id: string): Promise<NewsArticle | null> {
  try {
    const page = await notion.pages.retrieve({ page_id: id })
    if (!isFullPage(page)) return null
    return parsePageToNewsArticle(page)
  } catch {
    // 존재하지 않는 ID 등 API 오류 시 null 반환
    return null
  }
}

// 뉴스 본문 블록 전체 조회 (iteratePaginatedAPI로 100개 초과 자동 처리)
export async function getNewsBlocks(pageId: string): Promise<NotionBlock[]> {
  try {
    const blocks: NotionBlock[] = []

    for await (const block of iteratePaginatedAPI(notion.blocks.children.list, {
      block_id: pageId,
    })) {
      // type별 하위 객체(paragraph.rich_text 등)만 content로 저장 — NotionRenderer의 content.rich_text 접근과 매칭
      const blockType = "type" in block ? block.type : "unsupported"
      const blockContent =
        (block as Record<string, unknown>)[blockType] ?? {}
      blocks.push({
        id: block.id,
        type: blockType,
        content: blockContent as import("@/lib/types").NotionBlockContent,
        parentId: pageId,
      })
    }

    return blocks
  } catch (error) {
    // 블록 조회 실패 시 빈 배열 반환 — NotionRenderer가 "본문이 없습니다" 표시로 폴백
    console.error("[notion] getNewsBlocks 실패:", error)
    return []
  }
}

// ISR generateStaticParams용 전체 아티클 ID 목록 반환
// 빌드 실패보다 빈 정적 경로가 나으므로 오류 시 빈 배열 반환
export async function getAllArticleIds(): Promise<string[]> {
  try {
    const articles = await getNewsArticles()
    return articles.map((a) => a.id)
  } catch (error) {
    console.error("[notion] getAllArticleIds 실패:", error)
    return []
  }
}
