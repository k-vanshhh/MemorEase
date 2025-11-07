"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { Search, Sliders } from "lucide-react"
import { searchAPI } from "@/lib/api"
import Link from "next/link"

export default function SearchPage() {
  const [products, setProducts] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const [filters, setFilters] = useState({
    priceRange: [0, 500],
    category: "all",
    artist: "all",
    rating: 0,
    query: "",
    sort: "",
  })

  const [showFilters, setShowFilters] = useState(true)

  useEffect(() => {
    performSearch()
  }, [])

  const performSearch = async () => {
    setLoading(true)
    try {
      const response = await searchAPI.search(
        filters.query,
        filters.category !== "all" ? filters.category : undefined,
        filters.priceRange[0],
        filters.priceRange[1],
        filters.rating || undefined,
        filters.sort || undefined,
      )
      setProducts(response.products || [])
    } catch (error) {
      console.error("Search error:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    performSearch()
  }

  return (
    <main className="min-h-screen bg-background">
      <Header />
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Search Bar */}
        <form onSubmit={handleSearch} className="mb-12">
          <div className="relative">
            <Search className="absolute left-4 top-3.5 text-muted-foreground" size={20} />
            <input
              type="text"
              placeholder="Search products, artists, or collections..."
              value={filters.query}
              onChange={(e) => setFilters({ ...filters, query: e.target.value })}
              className="w-full pl-12 pr-4 py-3 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
        </form>

        <div className="flex gap-8">
          {/* Filters Sidebar */}
          {showFilters && (
            <div className="w-full md:w-64 space-y-6">
              <div className="bg-card rounded-lg border border-border p-6 space-y-6">
                <div>
                  <h3 className="font-bold text-foreground mb-4 flex items-center gap-2">
                    <Sliders size={18} />
                    Filters
                  </h3>
                </div>

                {/* Price Range */}
                <div>
                  <label className="text-sm font-medium text-foreground mb-3 block">Price Range</label>
                  <input
                    type="range"
                    min="0"
                    max="500"
                    value={filters.priceRange[1]}
                    onChange={(e) => setFilters({ ...filters, priceRange: [0, Number.parseInt(e.target.value)] })}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground mt-2">
                    <span>${filters.priceRange[0]}</span>
                    <span>${filters.priceRange[1]}</span>
                  </div>
                </div>

                {/* Category */}
                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">Category</label>
                  <select
                    value={filters.category}
                    onChange={(e) => setFilters({ ...filters, category: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-border bg-background text-foreground"
                  >
                    <option value="all">All Categories</option>
                    <option value="personalized-gifts">Personalized Gifts</option>
                    <option value="custom-art">Custom Art</option>
                    <option value="mugs">Mugs</option>
                    <option value="frames">Frames</option>
                    <option value="apparel">Apparel</option>
                    <option value="home-decor">Home Decor</option>
                    <option value="accessories">Accessories</option>
                  </select>
                </div>

                {/* Artist */}
                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">Artist</label>
                  <select
                    value={filters.artist}
                    onChange={(e) => setFilters({ ...filters, artist: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-border bg-background text-foreground"
                  >
                    <option value="all">All Artists</option>
                    <option value="sarah">Sarah Anderson</option>
                    <option value="john">John Smith</option>
                    <option value="emma">Emma Davis</option>
                    <option value="lisa">Lisa Chen</option>
                  </select>
                </div>

                {/* Rating */}
                <div>
                  <label className="text-sm font-medium text-foreground mb-3 block">Minimum Rating</label>
                  <div className="space-y-2">
                    {[4, 3, 2, 1].map((rating) => (
                      <label key={rating} className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          name="rating"
                          value={rating}
                          checked={filters.rating === rating}
                          onChange={() => setFilters({ ...filters, rating })}
                          className="w-4 h-4"
                        />
                        <span className="text-sm text-foreground">{rating} stars & up</span>
                      </label>
                    ))}
                  </div>
                </div>

                <Button onClick={performSearch} className="w-full bg-emerald-600 hover:bg-emerald-700 text-white">
                  Apply Filters
                </Button>
              </div>
            </div>
          )}

          {/* Products Grid */}
          <div className="flex-1">
            <div className="mb-6 flex items-center justify-between">
              <p className="text-muted-foreground">{products.length} products found</p>
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="md:hidden flex items-center gap-2 px-4 py-2 rounded-lg border border-border text-foreground hover:bg-secondary"
              >
                <Sliders size={18} />
                Filters
              </button>
            </div>

            {loading ? (
              <div className="text-center py-12">Loading products...</div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map((product) => (
                  <Link key={product._id} href={`/product/${product._id}`}>
                    <div className="bg-card rounded-lg overflow-hidden border border-border hover:shadow-lg transition cursor-pointer">
                      <img
                        src={product.images?.[0] || "/placeholder.svg?height=300&width=300&query=product"}
                        alt={product.name}
                        className="w-full aspect-square object-cover"
                      />
                      <div className="p-4">
                        <p className="text-xs text-muted-foreground mb-1">{product.artistId?.name}</p>
                        <h3 className="font-bold text-foreground mb-2 line-clamp-2">{product.name}</h3>
                        <div className="flex items-center justify-between mb-4">
                          <span className="font-bold text-emerald-600">${product.price}</span>
                          <span className="text-xs text-muted-foreground">★ {product.rating?.toFixed(1)}</span>
                        </div>
                        <Button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white" size="sm">
                          View Product
                        </Button>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </main>
  )
}
