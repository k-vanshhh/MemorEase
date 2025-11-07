import mongoose from "mongoose"

const artistSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    bio: String,
    profileImage: String,
    coverImage: String,
    followers: {
      type: Number,
      default: 0,
    },
    rating: {
      type: Number,
      default: 0,
    },
    socialLinks: {
      instagram: String,
      twitter: String,
      website: String,
    },
    specialties: [String],
    isVerified: {
      type: Boolean,
      default: false,
    },
    totalProducts: {
      type: Number,
      default: 0,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true },
)

export default mongoose.model("Artist", artistSchema)
