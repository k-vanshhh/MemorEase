import express from "express"
import Product from "../models/Product.js"

const router = express.Router()

// Search products
router.get("/", async (req, res) => {
  try {
    const { query, category, minPrice, maxPrice, rating, sort } = req.query

    const filter = {}

    if (query) {
      filter.$or = [{ name: { $regex: query, $options: "i" } }, { description: { $regex: query, $options: "i" } }]
    }

    if (category) {
      filter.category = category
    }

    if (minPrice || maxPrice) {
      filter.price = {}
      if (minPrice) filter.price.$gte = Number.parseInt(minPrice)
      if (maxPrice) filter.price.$lte = Number.parseInt(maxPrice)
    }

    if (rating) {
      filter.rating = { $gte: Number.parseInt(rating) }
    }

    const sortOptions = {}
    if (sort === "price-low") sortOptions.price = 1
    if (sort === "price-high") sortOptions.price = -1
    if (sort === "rating") sortOptions.rating = -1
    if (sort === "newest") sortOptions.createdAt = -1

    const products = await Product.find(filter).populate("artistId", "name profileImage").sort(sortOptions)

    res.json({
      count: products.length,
      products,
    })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

export default router
