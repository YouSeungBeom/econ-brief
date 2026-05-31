// 홈 상단 히어로 섹션: 서비스 소개 및 주요 뉴스 강조
// TODO: 최신 주요 뉴스 데이터 연결

import { SITE_CONFIG } from "@/lib/constants"

export function HeroSection() {
  return (
    <section className="py-12 text-center">
      <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
        {SITE_CONFIG.name}
      </h1>
      <p className="mt-4 text-lg text-muted-foreground">
        {SITE_CONFIG.description}
      </p>
      {/* TODO: 오늘의 주요 뉴스 하이라이트 카드 추가 */}
    </section>
  )
}
