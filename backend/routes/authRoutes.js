import express from "express";
import {
  signup,
  login,
  getMe,
  updateMe,
} from "../controllers/authController.js";
import { verifyToken } from "../middleware/authMiddleware.js";

const router = express.Router();

// Sign Up
router.post("/signup", signup);

// Login
router.post("/login", login);

// Get Current User Profile
router.get("/me", verifyToken, getMe);

// Update User Profile
router.put("/me", verifyToken, updateMe);

export default router;