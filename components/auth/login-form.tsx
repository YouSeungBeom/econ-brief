"use client"

import { useState } from "react"
import Link from "next/link"
import { Eye, EyeOff, Zap } from "lucide-react"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { SITE_CONFIG } from "@/lib/constants"

// 비밀번호 표시/숨김 토글 버튼
function PasswordToggle({
  show,
  onToggle,
}: {
  show: boolean
  onToggle: () => void
}) {
  return (
    <Button
      type="button"
      variant="ghost"
      size="icon"
      className="absolute right-0 top-0 text-muted-foreground hover:text-foreground"
      onClick={onToggle}
      aria-label={show ? "비밀번호 숨기기" : "비밀번호 표시"}
    >
      {show ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
    </Button>
  )
}

export function LoginForm() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setIsLoading(true)
    // TODO: 실제 인증 로직 연결
    setTimeout(() => setIsLoading(false), 1000)
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2 mb-1">
          <Zap className="size-5 text-primary" />
          <span className="font-semibold text-sm">{SITE_CONFIG.name}</span>
        </div>
        <CardTitle className="text-xl">로그인</CardTitle>
        <CardDescription>계정에 로그인하여 시작하세요</CardDescription>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="email">이메일</Label>
            <Input
              id="email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
              required
              disabled={isLoading}
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <div className="flex items-center justify-between">
              <Label htmlFor="password">비밀번호</Label>
              <Link
                href="#"
                className="text-xs text-muted-foreground hover:text-foreground transition-colors underline-offset-4 hover:underline"
              >
                비밀번호를 잊으셨나요?
              </Link>
            </div>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
                required
                disabled={isLoading}
                className="pr-9"
              />
              <PasswordToggle
                show={showPassword}
                onToggle={() => setShowPassword((prev) => !prev)}
              />
            </div>
          </div>

          <Button type="submit" className="w-full mt-1" disabled={isLoading}>
            {isLoading ? "로그인 중..." : "로그인하기"}
          </Button>
        </form>
      </CardContent>

      <CardFooter className="flex-col gap-2 text-sm">
        <p className="text-muted-foreground">
          계정이 없으신가요?{" "}
          <Link
            href="/signup"
            className="text-foreground font-medium underline-offset-4 hover:underline"
          >
            회원가입
          </Link>
        </p>
      </CardFooter>
    </Card>
  )
}
