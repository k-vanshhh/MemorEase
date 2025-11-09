import express from "express";
import {
  getAllArtists,
  getArtistById,
  getArtistProducts,
} from "../controllers/artistController.js";

const router = express.Router();

// Get all artists
router.get("/", getAllArtists);

// Get artist by ID
router.get("/:id", getArtistById);

// Get artist's products
router.get("/:id/products", getArtistProducts);

export default router;