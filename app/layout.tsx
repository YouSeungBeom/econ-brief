import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Toaster } from "@/components/ui/sonner";
import { SITE_CONFIG } from "@/lib/constants";

// Geist 폰트: CSS 변수로 등록하여 Tailwind에서 사용
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  // metadataBase: 상대 경로 OG 이미지 URL을 절대 경로로 변환하는 기준 URL
  metadataBase: new URL(SITE_CONFIG.url),
  // title template: 하위 페이지에서 title만 지정하면 자동으로 "제목 | Econ Brief" 형태로 조합
  title: {
    template: `%s | ${SITE_CONFIG.name}`,
    default: SITE_CONFIG.name,
  },
  description: SITE_CONFIG.description,
  // 기본 OpenGraph 메타데이터 (하위 페이지에서 오버라이드 가능)
  openGraph: {
    type: "website",
    locale: "ko_KR",
    siteName: SITE_CONFIG.name,
    url: SITE_CONFIG.url,
    images: [
      {
        url: "/og-default.png",
        width: 1200,
        height: 630,
        alt: `${SITE_CONFIG.name} - 경제 뉴스 요약`,
      },
    ],
  },
  // Twitter 카드 메타데이터
  twitter: {
    card: "summary_large_image",
    images: ["/og-default.png"],
  },
  // 검색 엔진 크롤링 허용
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // suppressHydrationWarning: next-themes가 html 클래스를 조작할 때 발생하는 경고 억제
    <html
      lang="ko"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col">
        <ThemeProvider>
          <TooltipProvider>
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
            <Toaster />
          </TooltipProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
