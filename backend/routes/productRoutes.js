import express from "express";
import {
  getAllProducts,
  getProductById,
  getProductsByCategory,
  getFeaturedProducts,
} from "../controllers/productController.js";

const router = express.Router();

// Get all products with pagination
router.get("/", getAllProducts);

// Get product by ID
router.get("/:id", getProductById);

// Get products by category
router.get("/category/:category", getProductsByCategory);

// Get featured products
router.get("/featured/top", getFeaturedProducts);

export default router;