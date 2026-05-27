import type { Metadata } from "next"
import { LoginForm } from "@/components/auth/login-form"

export const metadata: Metadata = {
  title: "로그인 | NextStarter",
  description: "계정에 로그인하세요",
}

export default function LoginPage() {
  return (
    <div className="flex min-h-[calc(100vh-4rem)] w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <LoginForm />
      </div>
    </div>
  )
}
