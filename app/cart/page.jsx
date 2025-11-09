"use client"

import { useState, useEffect } from "react"
import { cartAPI, orderAPI } from "../../../lib/api.js"
import { useAuth } from "../../../lib/auth-context.jsx"
import { Button } from "../../../components/ui/button.jsx"
import { Card } from "../../../components/ui/card.jsx"
import { Input } from "../../../components/ui/input.jsx"
import Link from "next/link"

export default function CartPage() {
  const { user } = useAuth()
  const [cartItems, setCartItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [shippingAddress, setShippingAddress] = useState("")
  const [city, setCity] = useState("")
  const [state, setState] = useState("")
  const [zipCode, setZipCode] = useState("")
  const [paymentMethod, setPaymentMethod] = useState("credit-card")
  const [isCheckingOut, setIsCheckingOut] = useState(false)

  useEffect(() => {
    if (!user) return

    const fetchCart = async () => {
      try {
        const data = await cartAPI.get()
        setCartItems(data.items || [])
      } catch (err) {
        console.error("Error fetching cart:", err)
      } finally {
        setLoading(false)
      }
    }

    fetchCart()
  }, [user])

  const handleRemoveItem = async (productId) => {
    try {
      await cartAPI.remove(productId)
      setCartItems(cartItems.filter((item) => item.productId !== productId))
    } catch (err) {
      alert("Error removing item: " + err.message)
    }
  }

  const handleCheckout = async () => {
    if (!shippingAddress || !city || !state || !zipCode) {
      alert("Please fill in all shipping details")
      return
    }

    setIsCheckingOut(true)

    try {
      const data = await orderAPI.create({ address: shippingAddress, city, state, zipCode }, paymentMethod)
      alert("Order placed successfully! Order ID: " + data._id)
      await cartAPI.clear()
      setCartItems([])
    } catch (err) {
      alert("Error placing order: " + err.message)
    } finally {
      setIsCheckingOut(false)
    }
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Card className="p-8">
          <p className="mb-4">Please log in to view your cart</p>
          <Link href="/auth/login">
            <Button>Go to Login</Button>
          </Link>
        </Card>
      </div>
    )
  }

  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading cart...</div>

  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)

  return (
    <div className="min-h-screen bg-background py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="md:col-span-2">
            {cartItems.length > 0 ? (
              <div className="space-y-4">
                {cartItems.map((item) => (
                  <Card key={item.productId} className="p-4">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="font-semibold">{item.productName}</h3>
                        <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                      </div>
                      <span className="font-bold">${item.price * item.quantity}</span>
                    </div>
                    {item.customization && (
                      <p className="text-sm text-gray-600 mb-2">Customization: {JSON.stringify(item.customization)}</p>
                    )}
                    <Button variant="destructive" size="sm" onClick={() => handleRemoveItem(item.productId)}>
                      Remove
                    </Button>
                  </Card>
                ))}
              </div>
            ) : (
              <Card className="p-8 text-center">
                <p>Your cart is empty</p>
                <Link href="/">
                  <Button className="mt-4">Continue Shopping</Button>
                </Link>
              </Card>
            )}
          </div>

          {/* Checkout */}
          <div className="md:col-span-1">
            <Card className="p-6 sticky top-8">
              <h2 className="text-xl font-bold mb-4">Order Summary</h2>

              <div className="mb-6 pb-6 border-b">
                <div className="flex justify-between mb-2">
                  <span>Subtotal:</span>
                  <span>${total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span>Shipping:</span>
                  <span>$10.00</span>
                </div>
                <div className="flex justify-between font-bold">
                  <span>Total:</span>
                  <span>${(total + 10).toFixed(2)}</span>
                </div>
              </div>

              <div className="space-y-3 mb-6">
                <div>
                  <label className="block text-sm font-medium mb-1">Address</label>
                  <Input
                    value={shippingAddress}
                    onChange={(e) => setShippingAddress(e.target.value)}
                    placeholder="Street address"
                  />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <Input value={city} onChange={(e) => setCity(e.target.value)} placeholder="City" />
                  <Input value={state} onChange={(e) => setState(e.target.value)} placeholder="State" />
                </div>
                <Input value={zipCode} onChange={(e) => setZipCode(e.target.value)} placeholder="ZIP Code" />

                <div>
                  <label className="block text-sm font-medium mb-1">Payment Method</label>
                  <select
                    value={paymentMethod}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="w-full border rounded p-2"
                  >
                    <option value="credit-card">Credit Card</option>
                    <option value="paypal">PayPal</option>
                    <option value="bank-transfer">Bank Transfer</option>
                  </select>
                </div>
              </div>

              <Button onClick={handleCheckout} disabled={isCheckingOut || cartItems.length === 0} className="w-full">
                {isCheckingOut ? "Processing..." : "Checkout"}
              </Button>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}