"use client"

import Link from "next/link"
import { useAuth } from "../lib/auth-context.jsx"
import { Button } from "./ui/button.jsx"
import { ModernLogo } from "./modern-logo.jsx"
import { Search, ShoppingBag, User, Menu } from 'lucide-react';

export default function Header() {
  const { user, logout } = useAuth()

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-md supports-[backdrop-filter]:bg-background/60">
      <nav className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">

        {/* Logo Section */}
        <Link href="/" className="flex items-center gap-2 group">
          <ModernLogo size={32} />
          <span className="font-serif text-2xl font-bold tracking-tight group-hover:text-primary transition-colors">
            MemorEase
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          <NavLink href="/search">Find Art</NavLink>
          <NavLink href="/artists">Our Artists</NavLink>
          <NavLink href="/gift-guides">Curated Gifts</NavLink>
        </div>

        {/* Actions / Auth */}
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="md:hidden">
            <Search className="h-5 w-5" />
          </Button>

          <Link href="/cart">
            <Button variant="ghost" size="icon" className="relative group">
              <ShoppingBag className="h-5 w-5 group-hover:scale-110 transition-transform" />
              <span className="sr-only">Cart</span>
            </Button>
          </Link>

          {user ? (
            <div className="flex items-center gap-2">
              <Link href="/profile">
                <Button variant="ghost" size="icon">
                  <User className="h-5 w-5" />
                </Button>
              </Link>
            </div>
          ) : (
            <div className="hidden md:flex items-center gap-2">
              <Link href="/auth/login">
                <Button variant="ghost" className="font-serif italic hover:bg-transparent hover:text-primary">Log in</Button>
              </Link>
              <Link href="/auth/signup">
                <Button className="rounded-full px-6 font-medium">Join us</Button>
              </Link>
            </div>
          )}

          <Button variant="ghost" size="icon" className="md:hidden">
            <Menu className="h-5 w-5" />
          </Button>
        </div>
      </nav>
    </header>
  )
}

function NavLink({ href, children }) {
  return (
    <Link
      href={href}
      className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors relative after:content-[''] after:absolute after:left-0 after:bottom-[-4px] after:h-[1px] after:w-0 after:bg-primary after:transition-all hover:after:w-full"
    >
      {children}
    </Link>
  )
}
