"use client"

import { useState, useEffect } from "react"
import { searchAPI } from "@/lib/api"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Select } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import Image from "next/image"

const categories = ["All", "Prints", "Jewelry", "Ceramics", "Textiles", "Personalized"]
const sortOptions = [
  { value: "newest", label: "Newest" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "rating", label: "Top Rated" },
]

export default function SearchPage() {
  const [query, setQuery] = useState("")
  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [priceRange, setPriceRange] = useState([0, 1000])
  const [minRating, setMinRating] = useState(0)
  const [sortBy, setSortBy] = useState("newest")

  useEffect(() => {
    const performSearch = async () => {
      if (!query && selectedCategory === "All") return

      setLoading(true)
      try {
        const data = await searchAPI.search(
          query,
          selectedCategory === "All" ? null : selectedCategory,
          priceRange[0],
          priceRange[1],
          minRating,
          sortBy,
        )
        setResults(data.products || [])
      } catch (err) {
        console.error("Search error:", err)
      } finally {
        setLoading(false)
      }
    }

    performSearch()
  }, [query, selectedCategory, priceRange, minRating, sortBy])

  return (
    <div className="min-h-screen bg-background py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Search Products</h1>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Filters */}
          <div className="md:col-span-1">
            <Card className="p-4">
              <h2 className="font-semibold mb-4">Filters</h2>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Search</label>
                  <Input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search..." />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Category</label>
                  <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                    {categories.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </Select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Price Range: ${priceRange[0]} - ${priceRange[1]}
                  </label>
                  <Slider min={0} max={1000} step={50} value={priceRange} onValueChange={setPriceRange} />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Min Rating: {minRating} stars</label>
                  <Slider
                    min={0}
                    max={5}
                    step={0.5}
                    value={[minRating]}
                    onValueChange={(val) => setMinRating(val[0])}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Sort By</label>
                  <Select value={sortBy} onValueChange={setSortBy}>
                    {sortOptions.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </Select>
                </div>
              </div>
            </Card>
          </div>

          {/* Results */}
          <div className="md:col-span-3">
            {loading ? (
              <div className="text-center py-12">
                <p>Loading...</p>
              </div>
            ) : results.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {results.map((product) => (
                  <Card key={product._id} className="overflow-hidden hover:shadow-lg transition">
                    <div className="relative h-48">
                      <Image
                        src={product.image || "/placeholder.svg"}
                        alt={product.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold mb-2">{product.name}</h3>
                      <p className="text-sm text-gray-600 mb-3">{product.category}</p>
                      <div className="flex justify-between items-center">
                        <span className="font-bold">${product.price}</span>
                        <span className="text-sm">{product.rating ? `${product.rating} / 5` : "No ratings"}</span>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p>No products found</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
