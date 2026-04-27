import mongoose from "mongoose";

const heroSchema = new mongoose.Schema({
  backgroundVideo: { type: String, required: true },

  mediaType: {
    type: String,
    enum: ["video", "image"],
    default: "video",
  },

  // 🔥 NEW FIELDS
  headline: { type: String, default: "" },
  subtext: { type: String, default: "" },

  cta1Text: { type: String, default: "" },
  cta1Link: { type: String, default: "" },

  cta2Text: { type: String, default: "" },
  cta2Link: { type: String, default: "" },

  status: {
    type: String,
    enum: ["active", "inactive"],
    default: "active",
  },
}, { timestamps: true });

const backgroundHero = mongoose.model("Hero", heroSchema);

export default backgroundHero;