import mongoose from "mongoose";

const WhyRICRSchema = new mongoose.Schema(
  {
    title: { type: String, default: "" },

    mediaUrl: { type: String, default: "" }, 

    mediaType: {
      type: String,
      enum: ["video", "image"],
      default: "video",
    },

    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "inactive",
    },
  },
  { timestamps: true } 
);

export default mongoose.model("WhyRICR", WhyRICRSchema);