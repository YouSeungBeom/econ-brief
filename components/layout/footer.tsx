import Link from "next/link"
import { TrendingUp } from "lucide-react"
import { Separator } from "@/components/ui/separator"
import { SITE_CONFIG, CATEGORIES } from "@/lib/constants"

// 브랜드 로고 및 서비스 소개 섹션
function FooterBrand() {
  return (
    <div>
      <Link href="/" className="flex items-center gap-2 font-bold">
        <TrendingUp className="size-5 text-primary" />
        <span>{SITE_CONFIG.name}</span>
      </Link>
      <p className="mt-3 text-sm text-muted-foreground leading-relaxed max-w-xs">
        {SITE_CONFIG.description}
      </p>
    </div>
  )
}

// 카테고리 탐색 링크 컬럼
function FooterCategoryLinks() {
  return (
    <div>
      <h3 className="mb-3 text-sm font-semibold">카테고리</h3>
      <ul className="space-y-2">
        {CATEGORIES.map((category) => (
          <li key={category.id}>
            <Link
              href={category.id === "all" ? "/" : `/category/${category.id}`}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              {category.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

// 출처 안내 섹션
function FooterDisclaimer() {
  return (
    <div>
      <h3 className="mb-3 text-sm font-semibold">출처 안내</h3>
      <p className="text-sm text-muted-foreground leading-relaxed">
        본 서비스의 뉴스 콘텐츠는 각 언론사의 원문을 바탕으로 요약·편집된 것으로,
        원문 출처 링크를 함께 제공합니다.
        콘텐츠의 저작권은 해당 언론사에 있습니다.
      </p>
    </div>
  )
}

// 저작권 하단 바
function FooterBottom() {
  return (
    <div className="flex flex-col items-center justify-between gap-2 sm:flex-row">
      <p className="text-sm text-muted-foreground">
        © {new Date().getFullYear()} {SITE_CONFIG.name}. All rights reserved.
      </p>
      <p className="text-sm text-muted-foreground">
        Powered by Notion + Next.js
      </p>
    </div>
  )
}

// 전체 푸터: 브랜드 + 카테고리 링크 + 출처 안내 + 저작권
export function Footer() {
  return (
    <footer className="border-t border-border bg-muted/30">
      <div className="container mx-auto px-4 py-10">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          <FooterBrand />
          <FooterCategoryLinks />
          <FooterDisclaimer />
        </div>
        <Separator className="my-8" />
        <FooterBottom />
      </div>
    </footer>
  )
}
