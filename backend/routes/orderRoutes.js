import express from "express";
import {
  createOrder,
  getOrders,
  getOrderById,
} from "../controllers/orderController.js";
import { verifyToken } from "../middleware/authMiddleware.js";

const router = express.Router();

// Create order
router.post("/create", verifyToken, createOrder);

// Get user's orders
router.get("/", verifyToken, getOrders);

// Get order by ID
router.get("/:id", verifyToken, getOrderById);

export default router;