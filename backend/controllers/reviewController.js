import Review from "../models/Review.js";
import Product from "../models/Product.js";

// Get reviews for product
export const getReviewsForProduct = async (req, res) => {
  try {
    const reviews = await Review.find({ productId: req.params.productId })
      .populate("userId", "name profileImage")
      .sort({ createdAt: -1 });
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create review
export const createReview = async (req, res) => {
  try {
    const { productId, rating, title, comment, images } = req.body;

    const review = new Review({
      productId,
      userId: req.userId,
      rating,
      title,
      comment,
      images,
    });

    await review.save();

    // Update product rating
    const reviews = await Review.find({ productId });
    const avgRating = reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;

    await Product.findByIdAndUpdate(productId, {
      rating: avgRating,
      reviewCount: reviews.length,
    });

    res.status(201).json({ message: "Review created", review });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
