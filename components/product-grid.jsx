"use client"

import { useState } from "react"
import { ShoppingCart } from "lucide-react"
import { Button } from "./ui/button.jsx"
import { Badge } from "./ui/badge.jsx"

export default function ProductGrid() {
  const [cart, setCart] = useState([])

  const products = [
    {
      id: 1,
      name: "Custom Photo Keychain",
      artist: "Sarah Designer",
      price: 24.99,
      image: "/custom-photo-keychain.png",
      category: "Accessories",
    },
    {
      id: 2,
      name: "Personalized Mug",
      artist: "Alex Ceramics",
      price: 16.99,
      image: "/personalized-coffee-mug.jpg",
      category: "Home",
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
      category: "Decor",
    },
    {
      id: 5,
      name: "Personalized Print",
      artist: "Creative Minds",
      price: 19.99,
      image: "/abstract-art-print.jpg",
      category: "Art",
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

  const handleAddToCart = (id) => {
    setCart([...cart, id])
  }

  return (
    <section className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div className="space-y-4">
            <h2 className="text-4xl font-serif text-foreground tracking-tight">Curated Finds</h2>
            <p className="text-muted-foreground text-lg max-w-xl">
              Handpicked creations from our community of independent makers.
            </p>
          </div>
          <Button variant="ghost" className="hidden md:flex text-primary hover:bg-primary/5">View All Collection</Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
          {products.map((product) => (
            <div
              key={product.id}
              className="group flex flex-col space-y-4"
            >
              {/* Image Container */}
              <div className="relative aspect-[4/5] overflow-hidden rounded-sm bg-muted">
                <img
                  src={product.image || "/placeholder.svg"}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />

                {/* Overlay Action */}
                <div className="absolute inset-x-4 bottom-4 translate-y-full opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                  <Button
                    onClick={() => handleAddToCart(product.id)}
                    className="w-full shadow-lg bg-white/90 text-foreground hover:bg-white backdrop-blur-sm"
                  >
                    <ShoppingCart size={16} className="mr-2" /> Add to Cart — ${product.price}
                  </Button>
                </div>
              </div>

              {/* Content */}
              <div className="space-y-1">
                <div className="flex justify-between items-start">
                  <h3 className="font-serif text-xl text-foreground font-medium group-hover:text-primary transition-colors cursor-pointer">
                    {product.name}
                  </h3>
                  <Badge variant="secondary" className="font-sans font-normal text-muted-foreground bg-muted/50 rounded-full px-2">
                    {product.category}
                  </Badge>
                </div>
                <p className="text-muted-foreground text-sm font-sans">by {product.artist}</p>
                <p className="text-foreground font-medium pt-1 block md:hidden">${product.price}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center md:hidden">
          <Button variant="outline" className="w-full">View All Collection</Button>
        </div>
      </div>
    </section>
  )
}
