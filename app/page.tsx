import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Bot, MessageSquare, BarChart3, Shield } from "lucide-react"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <header className="border-b">
        <div className="container flex items-center justify-between h-16 px-4 mx-auto sm:px-6">
          <div className="flex items-center gap-2">
            <Bot className="w-6 h-6 text-purple-600" />
            <span className="text-xl font-bold">ChatAssist</span>
          </div>
          <nav className="hidden space-x-4 md:flex">
            <Link href="/features" className="text-sm font-medium transition-colors hover:text-purple-600">
              Features
            </Link>
            <Link href="/pricing" className="text-sm font-medium transition-colors hover:text-purple-600">
              Pricing
            </Link>
            <Link href="/about" className="text-sm font-medium transition-colors hover:text-purple-600">
              About
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <Link href="/login">
              <Button variant="ghost" size="sm">
                Login
              </Button>
            </Link>
            <Link href="/register">
              <Button size="sm" className="bg-purple-600 hover:bg-purple-700">
                Sign Up
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container px-4 py-24 mx-auto text-center sm:px-6 md:py-32">
        <h1 className="text-4xl font-extrabold tracking-tight md:text-5xl lg:text-6xl">
          Your AI-Powered <span className="text-purple-600">Chat Assistant</span>
        </h1>
        <p className="max-w-2xl mx-auto mt-6 text-lg text-muted-foreground">
          Experience the power of AI with our intelligent chat assistant. Get instant answers, insights, and assistance
          for all your needs.
        </p>
        <div className="flex flex-col items-center justify-center gap-4 mt-10 sm:flex-row">
          <Link href="/register">
            <Button size="lg" className="bg-purple-600 hover:bg-purple-700">
              Get Started <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
          <Link href="/features">
            <Button variant="outline" size="lg">
              Learn More
            </Button>
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="container px-4 py-16 mx-auto sm:px-6">
        <h2 className="text-3xl font-bold text-center">Key Features</h2>
        <div className="grid gap-8 mt-12 sm:grid-cols-2 lg:grid-cols-3">
          <div className="flex flex-col items-center p-6 text-center rounded-lg bg-card">
            <MessageSquare className="w-12 h-12 text-purple-600" />
            <h3 className="mt-4 text-xl font-bold">Smart Conversations</h3>
            <p className="mt-2 text-muted-foreground">
              Engage in natural conversations with our AI that understands context and nuance.
            </p>
          </div>
          <div className="flex flex-col items-center p-6 text-center rounded-lg bg-card">
            <BarChart3 className="w-12 h-12 text-purple-600" />
            <h3 className="mt-4 text-xl font-bold">Insightful Analytics</h3>
            <p className="mt-2 text-muted-foreground">
              Track your conversations and get insights on usage patterns and trends.
            </p>
          </div>
          <div className="flex flex-col items-center p-6 text-center rounded-lg bg-card">
            <Shield className="w-12 h-12 text-purple-600" />
            <h3 className="mt-4 text-xl font-bold">Secure & Private</h3>
            <p className="mt-2 text-muted-foreground">
              Your conversations are encrypted and your data remains private and secure.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-6 mt-auto border-t">
        <div className="container px-4 mx-auto sm:px-6">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <div className="flex items-center gap-2">
              <Bot className="w-5 h-5 text-purple-600" />
              <span className="font-semibold">ChatAssist</span>
            </div>
            <p className="text-sm text-muted-foreground">© 2025 ChatAssist. All rights reserved.</p>
            <div className="flex gap-4">
              <Link href="/terms" className="text-sm text-muted-foreground hover:text-foreground">
                Terms
              </Link>
              <Link href="/privacy" className="text-sm text-muted-foreground hover:text-foreground">
                Privacy
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
