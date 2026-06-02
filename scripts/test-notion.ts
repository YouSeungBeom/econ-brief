/**
 * Notion API 클라이언트 테스트 스크립트
 * 실행: npx tsx scripts/test-notion.ts
 */
import "dotenv/config"
import {
  getNewsArticles,
  getNewsArticlesByCategory,
  getNewsArticlesByTag,
  getNewsArticle,
  getNewsBlocks,
} from "../lib/notion"

// 결과 출력 헬퍼
function pass(msg: string) {
  console.log(`  ✅ PASS — ${msg}`)
}
function fail(msg: string) {
  console.log(`  ❌ FAIL — ${msg}`)
}

async function run() {
  console.log("\n=== Notion API 테스트 시작 ===\n")

  // ─── 1. getNewsArticles() ───────────────────────────────────────────
  console.log("1. getNewsArticles() — Published 뉴스만 반환되는지 확인")
  const articles = await getNewsArticles()
  console.log(`   반환 건수: ${articles.length}`)
  if (articles.length === 0) {
    console.log("   ⚠️  Published 뉴스가 없습니다. Notion DB에 데이터를 추가하세요.")
  } else {
    const allPublished = articles.every((a) => a.status === "Published")
    allPublished
      ? pass("모든 항목이 Published 상태")
      : fail("Published 이외 항목 포함")
    console.log(`   샘플: [${articles[0].title}] (${articles[0].category})`)
  }

  // ─── 2. getNewsArticlesByCategory() ────────────────────────────────
  console.log("\n2. getNewsArticlesByCategory() — 카테고리 필터 확인")
  const categories = [...new Set(articles.map((a) => a.category).filter(Boolean))]
  if (categories.length === 0) {
    console.log("   ⚠️  카테고리가 있는 뉴스가 없어 건너뜁니다.")
  } else {
    const testCat = categories[0]
    const catArticles = await getNewsArticlesByCategory(testCat)
    console.log(`   카테고리 '${testCat}' — 반환 건수: ${catArticles.length}`)
    const allMatch = catArticles.every((a) => a.category === testCat)
    allMatch
      ? pass(`모든 항목이 '${testCat}' 카테고리`)
      : fail("다른 카테고리 항목 포함")
    // all 파라미터 테스트
    const allArticles = await getNewsArticlesByCategory("all")
    allArticles.length >= articles.length
      ? pass("category=all 은 전체 반환")
      : fail("category=all 이 전체보다 적게 반환됨")
  }

  // ─── 3. getNewsArticlesByTag() ──────────────────────────────────────
  console.log("\n3. getNewsArticlesByTag() — 태그 필터 확인")
  const tags = [...new Set(articles.flatMap((a) => a.tags))]
  if (tags.length === 0) {
    console.log("   ⚠️  태그가 있는 뉴스가 없어 건너뜁니다.")
  } else {
    const testTag = tags[0]
    const tagArticles = await getNewsArticlesByTag(testTag)
    console.log(`   태그 '${testTag}' — 반환 건수: ${tagArticles.length}`)
    const allHaveTag = tagArticles.every((a) => a.tags.includes(testTag))
    allHaveTag
      ? pass(`모든 항목에 '${testTag}' 태그 포함`)
      : fail("해당 태그가 없는 항목 포함")
  }

  // ─── 4. getNewsArticle(id) ──────────────────────────────────────────
  console.log("\n4. getNewsArticle(id) — 단건 조회 파싱 확인")
  if (articles.length === 0) {
    console.log("   ⚠️  테스트할 뉴스가 없어 건너뜁니다.")
  } else {
    const targetId = articles[0].id
    const article = await getNewsArticle(targetId)
    if (!article) {
      fail("단건 조회 결과가 null")
    } else {
      article.id === targetId
        ? pass("ID 일치")
        : fail("ID 불일치")
      article.title
        ? pass(`title 파싱 성공: "${article.title}"`)
        : fail("title이 비어 있음")
      typeof article.published === "string" && article.published.length > 0
        ? pass(`published가 ISO 문자열: "${article.published}"`)
        : fail("published 파싱 실패")
    }
  }

  // ─── 5. getNewsBlocks(pageId) ───────────────────────────────────────
  console.log("\n5. getNewsBlocks() — 블록 배열 반환 확인")
  if (articles.length === 0) {
    console.log("   ⚠️  테스트할 뉴스가 없어 건너뜁니다.")
  } else {
    const blocks = await getNewsBlocks(articles[0].id)
    console.log(`   반환 블록 수: ${blocks.length}`)
    Array.isArray(blocks)
      ? pass("블록 배열 반환 확인")
      : fail("배열이 아님")
    if (blocks.length > 0) {
      const firstBlock = blocks[0]
      firstBlock.id && firstBlock.type && firstBlock.content
        ? pass(`첫 블록 구조 정상 (type: ${firstBlock.type})`)
        : fail("블록 구조 불완전")
    }
  }

  // ─── 6. 존재하지 않는 ID → null 반환 ───────────────────────────────
  console.log("\n6. 존재하지 않는 ID 조회 — null 반환 확인")
  const ghost = await getNewsArticle("00000000-0000-0000-0000-000000000000")
  ghost === null
    ? pass("null 반환 확인")
    : fail("null이 아닌 값 반환됨")

  console.log("\n=== 테스트 완료 ===\n")
}

run().catch((err) => {
  console.error("\n테스트 실행 중 오류:", err)
  process.exit(1)
})
