import express from "express";
import {
  getCart,
  addToCart,
  removeFromCart,
  clearCart,
} from "../controllers/cartController.js";
import { verifyToken } from "../middleware/authMiddleware.js";

const router = express.Router();

// Get cart
router.get("/", verifyToken, getCart);

// Add to cart
router.post("/add", verifyToken, addToCart);

// Remove from cart
router.delete("/remove/:productId", verifyToken, removeFromCart);

// Clear cart
router.delete("/clear", verifyToken, clearCart);

export default router;