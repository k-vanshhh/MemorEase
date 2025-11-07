"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { Heart, Share2, Star, ShoppingCart, Check } from "lucide-react"
import { productAPI, reviewAPI, cartAPI } from "@/lib/api"

export default function ProductDetailPage() {
  const params = useParams()
  const [product, setProduct] = useState<any>(null)
  const [reviews, setReviews] = useState<any[]>([])
  const [quantity, setQuantity] = useState(1)
  const [isWishlisted, setIsWishlisted] = useState(false)
  const [selectedImage, setSelectedImage] = useState(0)
  const [loading, setLoading] = useState(true)
  const [addingToCart, setAddingToCart] = useState(false)

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const productData = await productAPI.getById(params.id as string)
        setProduct(productData)

        const reviewsData = await reviewAPI.getByProduct(params.id as string)
        setReviews(reviewsData)
      } catch (error) {
        console.error("Error fetching product:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchProduct()
  }, [params.id])

  const handleAddToCart = async () => {
    setAddingToCart(true)
    try {
      await cartAPI.add(params.id as string, quantity, {}, product?.price)
      alert("Added to cart successfully!")
      setQuantity(1)
    } catch (error) {
      console.error("Error adding to cart:", error)
      alert("Failed to add to cart")
    } finally {
      setAddingToCart(false)
    }
  }

  if (loading)
    return (
      <main className="min-h-screen bg-background flex items-center justify-center">
        <Header />
        <p>Loading...</p>
      </main>
    )

  if (!product)
    return (
      <main className="min-h-screen bg-background flex items-center justify-center">
        <Header />
        <p>Product not found</p>
      </main>
    )

  return (
    <main className="min-h-screen bg-background">
      <Header />
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Images */}
          <div className="space-y-4">
            <div className="bg-secondary rounded-lg overflow-hidden">
              <img
                src={product.images?.[selectedImage] || "/placeholder.svg"}
                alt={product.name}
                className="w-full aspect-square object-cover"
              />
            </div>
            <div className="flex gap-3">
              {product.images?.map((image: string, idx: number) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(idx)}
                  className={`w-20 h-20 rounded-lg overflow-hidden border-2 ${
                    selectedImage === idx ? "border-primary" : "border-border"
                  }`}
                >
                  <img src={image || "/placeholder.svg"} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <p className="text-primary font-medium mb-2">By {product.artistId?.name}</p>
              <h1 className="text-4xl font-bold text-foreground mb-3">{product.name}</h1>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={18}
                      className={i < Math.floor(product.rating) ? "fill-yellow-400 text-yellow-400" : "text-muted"}
                    />
                  ))}
                </div>
                <span className="text-muted-foreground">
                  {product.rating?.toFixed(1)} ({product.reviewCount} reviews)
                </span>
              </div>
            </div>

            <div className="space-y-2">
              <p className="text-3xl font-bold text-foreground">${product.price}</p>
              <p className="text-muted-foreground">{product.description}</p>
            </div>

            <div className="space-y-4 py-6 border-t border-b border-border">
              {product.customizationOptions?.map((option: any, idx: number) => (
                <div key={idx}>
                  <label className="text-sm font-medium text-foreground mb-3 block">{option.name}</label>
                  <select className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground">
                    {option.options?.map((opt: string) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                </div>
              ))}
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center border border-border rounded-lg">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-4 py-2 text-foreground hover:bg-secondary"
                >
                  -
                </button>
                <span className="px-4 py-2 text-foreground">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-4 py-2 text-foreground hover:bg-secondary"
                >
                  +
                </button>
              </div>
              <Button
                onClick={handleAddToCart}
                disabled={addingToCart}
                className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white gap-2 py-2.5"
              >
                <ShoppingCart size={20} />
                {addingToCart ? "Adding..." : "Add to Cart"}
              </Button>
              <button
                onClick={() => setIsWishlisted(!isWishlisted)}
                className={`px-4 py-2.5 rounded-lg border-2 transition ${
                  isWishlisted
                    ? "bg-red-50 border-red-600 text-red-600"
                    : "border-border text-foreground hover:border-red-600"
                }`}
              >
                <Heart size={20} fill={isWishlisted ? "currentColor" : "none"} />
              </button>
              <button className="px-4 py-2.5 rounded-lg border-2 border-border text-foreground hover:bg-secondary">
                <Share2 size={20} />
              </button>
            </div>

            <div className="bg-secondary p-4 rounded-lg space-y-2">
              <div className="flex items-center gap-2 text-sm text-foreground">
                <Check size={18} className="text-emerald-600" />
                Free shipping on orders over $50
              </div>
              <div className="flex items-center gap-2 text-sm text-foreground">
                <Check size={18} className="text-emerald-600" />
                30-day money back guarantee
              </div>
              <div className="flex items-center gap-2 text-sm text-foreground">
                <Check size={18} className="text-emerald-600" />
                Premium packaging included
              </div>
            </div>
          </div>
        </div>

        {/* Reviews Section */}
        <div className="mt-16 pt-8 border-t border-border">
          <h2 className="text-3xl font-bold text-foreground mb-8">Customer Reviews</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {reviews.map((review) => (
              <div key={review._id} className="bg-card rounded-lg border border-border p-6">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-full bg-emerald-100"></div>
                  <div>
                    <p className="font-medium text-foreground">{review.userId?.name}</p>
                    <div className="flex gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          size={14}
                          className={i < review.rating ? "fill-yellow-400 text-yellow-400" : "text-muted"}
                        />
                      ))}
                    </div>
                  </div>
                </div>
                <h4 className="font-semibold text-foreground mb-2">{review.title}</h4>
                <p className="text-muted-foreground text-sm">{review.comment}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </main>
  )
}
