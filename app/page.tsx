// 홈 페이지: HeroSection + CategoryTabs + NewsGrid 조합
import { HeroSection } from "@/components/news/HeroSection"
import { CategoryTabs } from "@/components/news/CategoryTabs"
import { NewsGrid } from "@/components/news/NewsGrid"
import { DUMMY_ARTICLES } from "@/lib/dummy"

export const revalidate = 3600

export default function HomePage() {
  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      <HeroSection articles={DUMMY_ARTICLES.slice(0, 3)} />
      <CategoryTabs />
      <NewsGrid articles={DUMMY_ARTICLES} />
    </div>
  )
}
