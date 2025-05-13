import type React from "react";
import { Bot } from "lucide-react";
import Link from "next/link";
import { ModeToggle } from "@/components/mode-toggle";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex items-center justify-between h-16 px-4 mx-auto sm:px-6">
          <Link href="/" className="flex items-center gap-2">
            <Bot className="w-6 h-6 text-purple-600" />
            <span className="text-xl font-bold">ChatAssist</span>
          </Link>
          <div className="flex items-center gap-4">
            <nav className="hidden space-x-4 md:flex">
              <Link
                href="/features"
                className="text-sm font-medium transition-colors hover:text-purple-600"
              >
                Features
              </Link>
              <Link
                href="/pricing"
                className="text-sm font-medium transition-colors hover:text-purple-600"
              >
                Pricing
              </Link>
              <Link
                href="/about"
                className="text-sm font-medium transition-colors hover:text-purple-600"
              >
                About
              </Link>
            </nav>
            <ModeToggle />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="container flex items-center justify-center flex-1 px-4 py-12 mx-auto sm:px-6">
        <div className="w-full max-w-md space-y-6">
          <div className="flex flex-col items-center space-y-2 text-center">
            {children}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="py-6 border-t">
        <div className="container px-4 mx-auto sm:px-6">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <div className="flex items-center gap-2">
              <Bot className="w-5 h-5 text-purple-600" />
              <span className="font-semibold">ChatAssist</span>
            </div>
            <p className="text-sm text-muted-foreground">
              © 2025 ChatAssist. All rights reserved.
            </p>
            <div className="flex gap-4">
              <Link
                href="/terms"
                className="text-sm text-muted-foreground hover:text-foreground"
              >
                Terms
              </Link>
              <Link
                href="/privacy"
                className="text-sm text-muted-foreground hover:text-foreground"
              >
                Privacy
              </Link>
              <Link
                href="/contact"
                className="text-sm text-muted-foreground hover:text-foreground"
              >
                Contact
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
