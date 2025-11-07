"use client"

import { useState } from "react"
import { ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function ProductGrid() {
  const [cart, setCart] = useState<number[]>([])

  const products = [
    {
      id: 1,
      name: "Custom Photo Keychain",
      artist: "Sarah Designer",
      price: 24.99,
      image: "/custom-photo-keychain.png",
      category: "Keychains",
    },
    {
      id: 2,
      name: "Personalized Mug",
      artist: "Alex Ceramics",
      price: 16.99,
      image: "/personalized-coffee-mug.jpg",
      category: "Mugs",
    },
    {
      id: 3,
      name: "Engraved Bracelet",
      artist: "Luna Jewelry",
      price: 32.99,
      image: "/engraved-silver-bracelet.jpg",
      category: "Jewelry",
    },
    {
      id: 4,
      name: "Custom Portrait Frame",
      artist: "Emma Art Studio",
      price: 38.99,
      image: "/wooden-photo-frame.jpg",
      category: "Photo Frames",
    },
    {
      id: 5,
      name: "Personalized Print",
      artist: "Creative Minds",
      price: 19.99,
      image: "/abstract-art-print.jpg",
      category: "Prints",
    },
    {
      id: 6,
      name: "Custom Necklace",
      artist: "Luna Jewelry",
      price: 45.99,
      image: "/gold-personalized-necklace.jpg",
      category: "Jewelry",
    },
  ]

  const handleAddToCart = (id: number) => {
    setCart([...cart, id])
  }

  return (
    <section className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-foreground mb-2">Featured Products</h2>
          <p className="text-muted-foreground">Handpicked personalized gifts from our community of artists</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-card rounded-xl overflow-hidden shadow-md hover:shadow-lg transition duration-300 group"
            >
              <div className="relative h-64 bg-muted overflow-hidden">
                <img
                  src={product.image || "/placeholder.svg"}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                />
              </div>
              <div className="p-6 space-y-4">
                <div>
                  <p className="text-sm text-emerald-600 font-medium mb-1">{product.category}</p>
                  <h3 className="text-lg font-semibold text-foreground">{product.name}</h3>
                  <p className="text-sm text-muted-foreground">by {product.artist}</p>
                </div>
                <div className="flex items-center justify-between pt-2 border-t border-border">
                  <span className="text-2xl font-bold text-emerald-600">${product.price}</span>
                  <Button
                    onClick={() => handleAddToCart(product.id)}
                    className="bg-emerald-600 hover:bg-emerald-700 text-white gap-2"
                    size="sm"
                  >
                    <ShoppingCart size={16} />
                    Add
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
