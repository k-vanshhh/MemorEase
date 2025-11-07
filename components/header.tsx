"use client"

import { useState } from "react"
import { ShoppingCart, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import ModernLogo from "./modern-logo"

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 bg-background border-b border-border shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center gap-2">
            <div className="text-emerald-600">
              <ModernLogo size={32} variant="full" />
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <a href="/" className="text-muted-foreground hover:text-foreground transition">
              Home
            </a>
            <a href="/search" className="text-muted-foreground hover:text-foreground transition">
              Explore
            </a>
            <a href="/artists/1" className="text-muted-foreground hover:text-foreground transition">
              Artists
            </a>
            <a href="/gift-guides" className="text-muted-foreground hover:text-foreground transition">
              Gift Guides
            </a>
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-4">
            <a href="/cart" className="relative text-muted-foreground hover:text-foreground transition">
              <ShoppingCart size={20} />
              <span className="absolute -top-2 -right-2 bg-emerald-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                0
              </span>
            </a>
            <a href="/auth/login" className="hidden sm:inline-flex">
              <Button className="bg-emerald-600 hover:bg-emerald-700 text-white">Sign In</Button>
            </a>

            {/* Mobile menu button */}
            <button
              className="md:hidden text-muted-foreground hover:text-foreground"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <nav className="md:hidden pb-4 space-y-3">
            <a href="/" className="block text-muted-foreground hover:text-foreground">
              Home
            </a>
            <a href="/search" className="block text-muted-foreground hover:text-foreground">
              Explore
            </a>
            <a href="/artists/1" className="block text-muted-foreground hover:text-foreground">
              Artists
            </a>
            <a href="/gift-guides" className="block text-muted-foreground hover:text-foreground">
              Gift Guides
            </a>
            <a href="/auth/login" className="block">
              <Button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white">Sign In</Button>
            </a>
          </nav>
        )}
      </div>
    </header>
  )
}
