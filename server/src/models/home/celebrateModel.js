import mongoose from "mongoose";

const celebrateSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    mediaType: {
      type: String,
      enum: ["image", "video"],
      required: true,
    },

    // main file (image / video)
    mediaUrl: {
      type: String,
      required: true,
    },

    // optional background video
    backgroundVideoUrl: {
      type: String,
      default: null,
    },

    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "active",
    },
  },
  { timestamps: true }
);

// 🔥 Optional validation (important)
celebrateSchema.pre("save", function (next) {
  // agar mediaType video hai tabhi backgroundVideo allow kare
  if (this.mediaType === "image" && this.backgroundVideoUrl) {
    return next(new Error("Background video only allowed for video type"));
  }
  next();
});

const Celebrate = mongoose.model("Celebrate", celebrateSchema);

export default Celebrate;