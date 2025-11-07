import express from "express"
import Order from "../models/Order.js"
import Cart from "../models/Cart.js"
import { verifyToken } from "../middleware/authMiddleware.js"

const router = express.Router()

// Create order
router.post("/create", verifyToken, async (req, res) => {
  try {
    const { shippingAddress, paymentMethod } = req.body

    const cart = await Cart.findOne({ userId: req.userId }).populate("items.productId")

    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ message: "Cart is empty" })
    }

    const items = cart.items.map((item) => ({
      productId: item.productId._id,
      productName: item.productId.name,
      quantity: item.quantity,
      price: item.price,
      customization: item.customization,
    }))

    const order = new Order({
      userId: req.userId,
      items,
      shippingAddress,
      totalAmount: cart.totalPrice,
      paymentMethod,
    })

    await order.save()

    // Clear cart after order
    await Cart.findOneAndUpdate({ userId: req.userId }, { items: [], totalPrice: 0 })

    res.status(201).json({ message: "Order created", order })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// Get user's orders
router.get("/", verifyToken, async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.userId }).sort({ createdAt: -1 })
    res.json(orders)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// Get order by ID
router.get("/:id", verifyToken, async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)

    if (!order || order.userId.toString() !== req.userId) {
      return res.status(404).json({ message: "Order not found" })
    }

    res.json(order)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

export default router
