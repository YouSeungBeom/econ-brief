import Link from "next/link"
import { Zap } from "lucide-react"
import { Separator } from "@/components/ui/separator"
import { FOOTER_LINKS, SITE_CONFIG } from "@/lib/constants"

// 푸터 링크 카테고리 단일 컬럼 컴포넌트
function FooterLinkColumn({
  category,
  links,
}: {
  category: string
  links: { label: string; href: string }[]
}) {
  return (
    <div>
      <h3 className="mb-3 text-sm font-semibold">{category}</h3>
      <ul className="space-y-2">
        {links.map((link) => (
          <li key={link.label}>
            <Link
              href={link.href}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

// 사이트 소개 브랜드 섹션
function FooterBrand() {
  return (
    <div className="col-span-2 md:col-span-1">
      <Link href="/" className="flex items-center gap-2 font-semibold">
        <Zap className="size-5 text-primary" />
        <span>{SITE_CONFIG.name}</span>
      </Link>
      <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
        {SITE_CONFIG.description}
      </p>
    </div>
  )
}

// 저작권 및 빌드 정보 하단 바
function FooterBottom() {
  return (
    <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
      <p className="text-sm text-muted-foreground">
        © {new Date().getFullYear()} {SITE_CONFIG.name}. All rights reserved.
      </p>
      <p className="text-sm text-muted-foreground">
        Built with Next.js 16 + shadcn/ui
      </p>
    </div>
  )
}

// 전체 푸터: 브랜드 + 링크 컬럼 + 하단 저작권
export function Footer() {
  return (
    <footer className="border-t border-border bg-muted/30">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          <FooterBrand />
          {Object.entries(FOOTER_LINKS).map(([category, links]) => (
            <FooterLinkColumn key={category} category={category} links={links} />
          ))}
        </div>
        <Separator className="my-8" />
        <FooterBottom />
      </div>
    </footer>
  )
}
