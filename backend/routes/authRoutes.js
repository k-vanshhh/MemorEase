import express from "express"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import User from "../models/User.js"
import { verifyToken } from "../middleware/authMiddleware.js"

const router = express.Router()

// Sign Up
router.post("/signup", async (req, res) => {
  try {
    const { name, email, password, confirmPassword } = req.body

    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Passwords do not match" })
    }

    const existingUser = await User.findOne({ email })
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" })
    }

    const hashedPassword = await bcrypt.hash(password, 10)
    const user = new User({
      name,
      email,
      password: hashedPassword,
    })

    await user.save()

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET || "secret_key", { expiresIn: "7d" })

    res.status(201).json({
      message: "User created successfully",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// Login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body

    const user = await User.findOne({ email })
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" })
    }

    const isPasswordValid = await bcrypt.compare(password, user.password)
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid email or password" })
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET || "secret_key", { expiresIn: "7d" })

    res.json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// Get Current User Profile
router.get("/me", verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.userId).select("-password")
    res.json(user)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// Update User Profile
router.put("/me", verifyToken, async (req, res) => {
  try {
    const { name, phone, bio, address, preferences } = req.body

    const user = await User.findByIdAndUpdate(
      req.userId,
      { name, phone, bio, address, preferences },
      { new: true },
    ).select("-password")

    res.json({ message: "Profile updated", user })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

export default router
