import express from "express"
import Artist from "../models/Artist.js"
import Product from "../models/Product.js"

const router = express.Router()

// Get all artists
router.get("/", async (req, res) => {
  try {
    const artists = await Artist.find().populate("userId", "name email").sort({ followers: -1 })
    res.json(artists)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// Get artist by ID
router.get("/:id", async (req, res) => {
  try {
    const artist = await Artist.findById(req.params.id).populate("userId", "name email")

    if (!artist) {
      return res.status(404).json({ message: "Artist not found" })
    }

    const products = await Product.find({ artistId: req.params.id })

    res.json({
      ...artist.toObject(),
      products,
    })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// Get artist's products
router.get("/:id/products", async (req, res) => {
  try {
    const products = await Product.find({ artistId: req.params.id }).sort({ createdAt: -1 })
    res.json(products)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

export default router
