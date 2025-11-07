"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { X, Plus, Minus, Gift } from "lucide-react"
import { cartAPI, orderAPI } from "@/lib/api"

export default function CartPage() {
  const router = useRouter()
  const [cart, setCart] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [isCheckingOut, setIsCheckingOut] = useState(false)
  const [shippingAddress, setShippingAddress] = useState({
    name: "",
    street: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",
    phone: "",
  })

  useEffect(() => {
    fetchCart()
  }, [])

  const fetchCart = async () => {
    try {
      const data = await cartAPI.get()
      setCart(data)
    } catch (error) {
      console.error("Error fetching cart:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleRemoveItem = async (productId: string) => {
    try {
      await cartAPI.remove(productId)
      fetchCart()
    } catch (error) {
      console.error("Error removing item:", error)
    }
  }

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsCheckingOut(true)
    try {
      const order = await orderAPI.create(shippingAddress, "credit-card")
      alert("Order created successfully!")
      router.push("/")
    } catch (error) {
      console.error("Error creating order:", error)
      alert("Failed to create order")
    } finally {
      setIsCheckingOut(false)
    }
  }

  if (loading)
    return (
      <main className="min-h-screen bg-background">
        <Header />
        <div className="flex items-center justify-center py-12">Loading cart...</div>
      </main>
    )

  const items = cart?.items || []
  const subtotal = items.reduce((sum: number, item: any) => sum + item.price * item.quantity, 0)
  const shipping = subtotal > 50 ? 0 : 10
  const tax = subtotal * 0.1
  const total = subtotal + shipping + tax

  return (
    <main className="min-h-screen bg-background">
      <Header />
      <div className="max-w-7xl mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-foreground mb-8">Shopping Cart</h1>

        {items.length === 0 ? (
          <div className="text-center py-16">
            <Gift size={64} className="mx-auto text-muted-foreground mb-4 opacity-50" />
            <h2 className="text-2xl font-bold text-foreground mb-2">Your cart is empty</h2>
            <p className="text-muted-foreground mb-8">Start adding some meaningful gifts!</p>
            <Link href="/">
              <Button className="bg-emerald-600 hover:bg-emerald-700 text-white">Continue Shopping</Button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-4">
              {items.map((item: any) => (
                <div key={item.productId?._id} className="bg-card rounded-lg border border-border p-6 flex gap-6">
                  <img
                    src={item.productId?.images?.[0] || "/placeholder.svg"}
                    alt={item.productId?.name}
                    className="w-24 h-24 object-cover rounded-lg"
                  />
                  <div className="flex-1">
                    <h3 className="font-bold text-foreground">{item.productId?.name}</h3>
                    <p className="text-sm text-muted-foreground">by {item.productId?.artistId?.name}</p>
                    <p className="font-semibold text-foreground mt-2">${item.price}</p>
                  </div>
                  <div className="flex flex-col items-end justify-between">
                    <button
                      onClick={() => handleRemoveItem(item.productId?._id)}
                      className="text-muted-foreground hover:text-red-600"
                    >
                      <X size={20} />
                    </button>
                    <div className="flex items-center border border-border rounded-lg">
                      <button onClick={() => {}} className="p-1 hover:bg-secondary">
                        <Minus size={16} />
                      </button>
                      <span className="px-3 py-1">{item.quantity}</span>
                      <button onClick={() => {}} className="p-1 hover:bg-secondary">
                        <Plus size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-card rounded-lg border border-border p-6 space-y-6 sticky top-20">
                <h2 className="text-xl font-bold text-foreground">Order Summary</h2>

                <div className="space-y-3 border-t border-b border-border py-4">
                  <div className="flex justify-between text-muted-foreground">
                    <span>Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-muted-foreground">
                    <span>Shipping</span>
                    <span>{shipping === 0 ? "FREE" : `$${shipping.toFixed(2)}`}</span>
                  </div>
                  <div className="flex justify-between text-muted-foreground">
                    <span>Tax</span>
                    <span>${tax.toFixed(2)}</span>
                  </div>
                </div>

                <div className="flex justify-between text-xl font-bold text-foreground">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>

                <form onSubmit={handleCheckout} className="space-y-3">
                  <input
                    type="text"
                    placeholder="Full Name"
                    value={shippingAddress.name}
                    onChange={(e) => setShippingAddress({ ...shippingAddress, name: e.target.value })}
                    className="w-full px-3 py-2 border border-border rounded text-sm bg-background text-foreground"
                    required
                  />
                  <input
                    type="text"
                    placeholder="Street Address"
                    value={shippingAddress.street}
                    onChange={(e) => setShippingAddress({ ...shippingAddress, street: e.target.value })}
                    className="w-full px-3 py-2 border border-border rounded text-sm bg-background text-foreground"
                    required
                  />
                  <input
                    type="text"
                    placeholder="City"
                    value={shippingAddress.city}
                    onChange={(e) => setShippingAddress({ ...shippingAddress, city: e.target.value })}
                    className="w-full px-3 py-2 border border-border rounded text-sm bg-background text-foreground"
                    required
                  />
                  <input
                    type="text"
                    placeholder="ZIP Code"
                    value={shippingAddress.zipCode}
                    onChange={(e) => setShippingAddress({ ...shippingAddress, zipCode: e.target.value })}
                    className="w-full px-3 py-2 border border-border rounded text-sm bg-background text-foreground"
                    required
                  />
                  <Button
                    type="submit"
                    disabled={isCheckingOut}
                    className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-2.5"
                    size="lg"
                  >
                    {isCheckingOut ? "Processing..." : "Proceed to Checkout"}
                  </Button>
                </form>

                <Link href="/">
                  <Button variant="outline" className="w-full border-border bg-transparent">
                    Continue Shopping
                  </Button>
                </Link>

                <div className="bg-emerald-50 rounded-lg p-3">
                  <p className="text-xs text-emerald-700">
                    Free shipping on orders over $50! You are ${Math.max(0, 50 - subtotal).toFixed(2)} away.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </main>
  )
}
