// 홈 상단 히어로 섹션: 서비스 소개 헤딩 + 최신 주요 뉴스 1~3건 강조 표시
import Link from "next/link"
import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { SITE_CONFIG } from "@/lib/constants"
import type { NewsArticle } from "@/lib/types"

interface HeroSectionProps {
  // 하이라이트할 최신 뉴스 (최대 3건, 슬라이스는 호출부 책임)
  articles: NewsArticle[]
}

// 개별 히어로 카드: 썸네일 위에 제목·카테고리 오버레이
function HeroCard({ article, large = false }: { article: NewsArticle; large?: boolean }) {
  // 썸네일 유무에 따라 텍스트 색상과 그라데이션 오버레이를 분기
  const hasThumbnail = !!article.thumbnail

  return (
    <Link
      href={`/news/${article.id}`}
      className="group relative block overflow-hidden rounded-xl"
    >
      {/* 썸네일 배경 */}
      <div className={`relative w-full overflow-hidden ${large ? "aspect-video" : "aspect-[4/3]"}`}>
        {hasThumbnail ? (
          <Image
            src={article.thumbnail!}
            alt={article.title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes={large ? "(max-width: 768px) 100vw, 66vw" : "33vw"}
          />
        ) : (
          <div className="h-full w-full bg-muted" />
        )}
        {/* 그라데이션 오버레이: 썸네일 있을 때만 — 없을 때는 밝은 bg-muted 위에 text-white 불가시 */}
        {hasThumbnail && (
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
        )}
      </div>

      {/* 텍스트 오버레이: 하단 정렬 */}
      <div className="absolute bottom-0 left-0 right-0 p-4">
        <Badge variant="secondary" className="mb-2">
          {article.category}
        </Badge>
        <h3
          className={`font-bold leading-snug ${hasThumbnail ? "text-white" : "text-foreground"} ${
            large ? "text-xl md:text-2xl line-clamp-2" : "text-sm line-clamp-3"
          }`}
        >
          {article.title}
        </h3>
      </div>
    </Link>
  )
}

export function HeroSection({ articles }: HeroSectionProps) {
  return (
    <section className="space-y-6 py-8">
      {/* 서비스 헤딩: articles 유무 관계없이 항상 표시 */}
      <div className="text-center">
        <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
          {SITE_CONFIG.name}
        </h1>
        <p className="mt-3 text-lg text-muted-foreground">
          {SITE_CONFIG.description}
        </p>
      </div>

      {/* 뉴스 데이터가 있을 때만 하이라이트 카드 표시 */}
      {articles.length > 0 && (
        <div className="mt-6">
          {articles.length === 1 ? (
            // 1건: 전체 너비 와이드 카드
            <HeroCard article={articles[0]} large />
          ) : (
            // 2~3건: 좌측 대형 + 우측 소형 스택
            <div className="grid gap-4 md:grid-cols-[2fr_1fr]">
              <HeroCard article={articles[0]} large />
              <div className="flex flex-col gap-4">
                {articles.slice(1).map((article) => (
                  <HeroCard key={article.id} article={article} />
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </section>
  )
}
