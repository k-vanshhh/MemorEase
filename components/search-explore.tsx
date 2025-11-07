"use client"

import { useState } from "react"
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"

export default function SearchExplore() {
  const [searchQuery, setSearchQuery] = useState("")

  const categories = ["Keychains", "Photo Frames", "Mugs", "Jewelry", "Prints", "Custom Art"]

  return (
    <section id="explore" className="py-16 bg-background border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-foreground mb-2">Explore Our Collection</h2>
            <p className="text-muted-foreground">Find the perfect personalized gift</p>
          </div>

          {/* Search Bar */}
          <div className="flex gap-2 max-w-md mx-auto">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={20} />
              <Input
                placeholder="Search artists or products..."
                className="pl-10 py-3 bg-card border border-border rounded-lg"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          {/* Categories */}
          <div className="flex flex-wrap gap-3 justify-center">
            {categories.map((category) => (
              <button
                key={category}
                className="px-4 py-2 bg-emerald-50 text-emerald-700 rounded-full hover:bg-emerald-100 transition"
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
