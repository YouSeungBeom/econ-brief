import Link from "next/link"
import {
  Zap,
  Shield,
  Palette,
  Component,
  Sparkles,
  Moon,
  ArrowRight,
  GitFork,
  type LucideIcon,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { FEATURES, SITE_CONFIG } from "@/lib/constants"

// 아이콘 이름 → Lucide 컴포넌트 매핑 (FEATURES 상수와 연동)
const ICON_MAP: Record<string, LucideIcon> = {
  Zap,
  Shield,
  Palette,
  Component,
  Sparkles,
  Moon,
}

// Hero 섹션: 스타터킷 소개 및 CTA 버튼
function HeroSection() {
  return (
    <section className="flex flex-col items-center justify-center gap-6 py-24 px-4 text-center md:py-32">
      <Badge variant="outline" className="gap-1.5 px-3 py-1 text-sm">
        <Zap className="size-3.5 text-primary" />
        Next.js 16 스타터킷
      </Badge>
      <h1 className="max-w-2xl text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl">
        빠르게 시작하는{" "}
        <span className="text-primary">모던 웹 개발</span>
      </h1>
      <p className="max-w-xl text-lg text-muted-foreground leading-relaxed">
        Next.js 16, TypeScript, Tailwind CSS 4, shadcn/ui가 이미 설정된
        프로덕션 레디 스타터킷으로 바로 개발을 시작하세요.
      </p>
      <div className="flex flex-col gap-3 sm:flex-row">
        <Button size="lg" asChild>
          <Link href="#get-started">
            시작하기
            <ArrowRight className="size-4" />
          </Link>
        </Button>
        <Button size="lg" variant="outline" asChild>
          <Link href={SITE_CONFIG.github} target="_blank" rel="noopener noreferrer">
            <GitFork className="size-4" />
            GitHub
          </Link>
        </Button>
      </div>
    </section>
  )
}

// 기능 카드 단일 아이템
function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: string
  title: string
  description: string
}) {
  // 아이콘 이름으로 Lucide 컴포넌트를 조회 (없으면 Zap 기본값)
  const Icon = ICON_MAP[icon] ?? Zap

  return (
    <Card className="transition-shadow hover:shadow-md">
      <CardHeader>
        <div className="mb-2 flex size-10 items-center justify-center rounded-lg bg-primary/10">
          <Icon className="size-5 text-primary" />
        </div>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
      </CardContent>
    </Card>
  )
}

// Features 섹션: 6가지 기술 스택 카드 그리드
function FeaturesSection() {
  return (
    <section id="features" className="py-20 px-4 bg-muted/30">
      <div className="container mx-auto">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold tracking-tight">포함된 기술 스택</h2>
          <p className="mt-3 text-muted-foreground">
            검증된 라이브러리로 구성된 완전한 개발 환경
          </p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((feature) => (
            <FeatureCard key={feature.title} {...feature} />
          ))}
        </div>
      </div>
    </section>
  )
}

// CTA 섹션: 하단 전환 유도 섹션
function CTASection() {
  return (
    <section id="get-started" className="py-24 px-4 text-center">
      <div className="container mx-auto max-w-2xl">
        <h2 className="text-3xl font-bold tracking-tight">지금 바로 시작하세요</h2>
        <p className="mt-4 text-muted-foreground leading-relaxed">
          반복 설정 없이 바로 비즈니스 로직 개발에 집중하세요.
          필요한 모든 기반 구조가 이미 준비되어 있습니다.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Button size="lg" asChild>
            <Link href={SITE_CONFIG.github} target="_blank" rel="noopener noreferrer">
              <GitFork className="size-4" />
              템플릿 사용하기
            </Link>
          </Button>
          <Button size="lg" variant="outline" asChild>
            <Link href="#features">기능 살펴보기</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}

export default function Home() {
  return (
    <>
      <HeroSection />
      <FeaturesSection />
      <CTASection />
    </>
  )
}
