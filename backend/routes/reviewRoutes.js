import express from "express";
import {
  getReviewsForProduct,
  createReview,
} from "../controllers/reviewController.js";
import { verifyToken } from "../middleware/authMiddleware.js";

const router = express.Router();

// Get reviews for product
router.get("/product/:productId", getReviewsForProduct);

// Create review
router.post("/", verifyToken, createReview);

export default router;