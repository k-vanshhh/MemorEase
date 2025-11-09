"use client"

import Link from "next/link"
import { useAuth } from "../lib/auth-context.jsx"
import { Button } from "./ui/button.jsx"
import { ModernLogo } from "./modern-logo.jsx"

export default function Header() {
  const { user, logout } = useAuth()

  return (
    <header className="bg-background border-b sticky top-0 z-50">
      <nav className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <ModernLogo size={32} />
          <span className="text-xl font-bold hidden sm:inline">MemorEase</span>
        </Link>

        <div className="hidden md:flex items-center gap-6">
          <Link href="/" className="text-foreground hover:text-primary transition">
            Home
          </Link>
          <Link href="/search" className="text-foreground hover:text-primary transition">
            Search
          </Link>
          <Link href="/gift-guides" className="text-foreground hover:text-primary transition">
            Gift Guides
          </Link>
        </div>

        <div className="flex items-center gap-4">
          <Link href="/cart">
            <Button variant="outline">Cart</Button>
          </Link>

          {user ? (
            <>
              <Link href="/profile">
                <Button variant="outline">Profile</Button>
              </Link>
              <Button
                variant="ghost"
                onClick={() => {
                  logout()
                  window.location.href = "/"
                }}
              >
                Logout
              </Button>
            </>
          ) : (
            <>
              <Link href="/auth/login">
                <Button variant="outline">Login</Button>
              </Link>
              <Link href="/auth/signup">
                <Button>Sign Up</Button>
              </Link>
            </>
          )}
        </div>
      </nav>
    </header>
  )
}
