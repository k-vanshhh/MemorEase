import express from "express"
import Product from "../models/Product.js"

const router = express.Router()

// Get all products with pagination
router.get("/", async (req, res) => {
  try {
    const page = Number.parseInt(req.query.page) || 1
    const limit = Number.parseInt(req.query.limit) || 12
    const skip = (page - 1) * limit

    const products = await Product.find()
      .populate("artistId", "name profileImage")
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 })

    const total = await Product.countDocuments()

    res.json({
      products,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// Get product by ID
router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate("artistId")

    if (!product) {
      return res.status(404).json({ message: "Product not found" })
    }

    res.json(product)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// Get products by category
router.get("/category/:category", async (req, res) => {
  try {
    const products = await Product.find({ category: req.params.category }).populate("artistId", "name profileImage")
    res.json(products)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// Get featured products
router.get("/featured/top", async (req, res) => {
  try {
    const products = await Product.find()
      .populate("artistId", "name profileImage")
      .sort({ rating: -1, reviewCount: -1 })
      .limit(8)
    res.json(products)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

export default router
