"use client"

import { useState, useEffect } from "react"
import { productAPI, reviewAPI, cartAPI } from "../../../lib/api.js"
import { useAuth } from "../../../lib/auth-context.jsx"
import { Button } from "../../../components/ui/button.jsx"
import { Card } from "../../../components/ui/card.jsx"
import { Input } from "../../../components/ui/input.jsx"
import Image from "next/image"
import { useParams } from "next/navigation"

export default function ProductPage() {
  const params = useParams()
  const productId = params.id
  const { user } = useAuth()

  const [product, setProduct] = useState(null)
  const [reviews, setReviews] = useState([])
  const [loading, setLoading] = useState(true)
  const [quantity, setQuantity] = useState(1)
  const [customization, setCustomization] = useState("")
  const [selectedColor, setSelectedColor] = useState("Black")

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const data = await productAPI.getById(productId)
        setProduct(data)

        const reviewsData = await reviewAPI.getByProduct(productId)
        setReviews(reviewsData || [])
      } catch (err) {
        console.error("Error fetching product:", err)
      } finally {
        setLoading(false)
      }
    }

    fetchProduct()
  }, [productId])

  const handleAddToCart = async () => {
    if (!user) {
      alert("Please login to add items to cart")
      return
    }

    try {
      await cartAPI.add(productId, quantity, { color: selectedColor, text: customization }, product.price)
      alert("Added to cart successfully!")
    } catch (err) {
      alert("Error adding to cart: " + err.message)
    }
  }

  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>

  if (!product) return <div className="min-h-screen flex items-center justify-center">Product not found</div>

  return (
    <div className="min-h-screen bg-background py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {/* Product Image */}
          <div className="relative h-96">
            <Image src={product.image || "/placeholder.svg"} alt={product.name} fill className="object-contain" />
          </div>

          {/* Product Details */}
          <div>
            <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
            <p className="text-lg text-gray-600 mb-4">{product.category}</p>

            <div className="mb-6">
              <span className="text-3xl font-bold">${product.price}</span>
              <p className="text-sm text-gray-600">
                {product.rating ? `${product.rating} / 5 (${product.reviewCount} reviews)` : "No reviews yet"}
              </p>
            </div>

            <p className="text-gray-700 mb-6">{product.description}</p>

            {/* Customization Options */}
            <Card className="p-4 mb-6">
              <h3 className="font-semibold mb-4">Customize Your Gift</h3>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Color</label>
                  <select
                    value={selectedColor}
                    onChange={(e) => setSelectedColor(e.target.value)}
                    className="w-full border rounded p-2"
                  >
                    <option>Black</option>
                    <option>White</option>
                    <option>Navy</option>
                    <option>Emerald Green</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Add Personal Text</label>
                  <Input
                    value={customization}
                    onChange={(e) => setCustomization(e.target.value)}
                    placeholder="Add names, dates, or messages..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Quantity</label>
                  <Input
                    type="number"
                    min="1"
                    value={quantity}
                    onChange={(e) => setQuantity(Number.parseInt(e.target.value) || 1)}
                  />
                </div>
              </div>
            </Card>

            <Button onClick={handleAddToCart} className="w-full mb-4">
              Add to Cart
            </Button>
          </div>
        </div>

        {/* Reviews Section */}
        <div>
          <h2 className="text-2xl font-bold mb-4">Reviews</h2>
          {reviews.length > 0 ? (
            <div className="space-y-4">
              {reviews.map((review) => (
                <Card key={review._id} className="p-4">
                  <div className="flex justify-between mb-2">
                    <h4 className="font-semibold">{review.title}</h4>
                    <span className="text-sm text-yellow-600">{review.rating} / 5</span>
                  </div>
                  <p className="text-gray-700">{review.comment}</p>
                  <p className="text-xs text-gray-500 mt-2">By {review.userName}</p>
                </Card>
              ))}
            </div>
          ) : (
            <p className="text-gray-600">No reviews yet. Be the first to review!</p>
          )}
        </div>
      </div>
    </div>
  )
}