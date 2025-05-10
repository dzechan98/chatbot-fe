import type React from "react"
import { Bot } from "lucide-react"
import Link from "next/link"

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="container flex items-center justify-center flex-1 px-4 py-12 mx-auto sm:px-6">
        <div className="w-full max-w-md space-y-6">
          <div className="flex flex-col items-center space-y-2 text-center">
            <Link href="/" className="flex items-center gap-2">
              <Bot className="w-6 h-6 text-purple-600" />
              <span className="text-xl font-bold">ChatAssist</span>
            </Link>
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}
