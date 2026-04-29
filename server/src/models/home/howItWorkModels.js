import mongoose from "mongoose";

const howItWorkSchema = new mongoose.Schema(
  {
    title: { type: String, default: "" },

    mediaUrl: { type: String, default: "" }, // 🔥 ADD

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
  { timestamps: true } // 🔥 ADD
);

export default mongoose.model("HowItWork", howItWorkSchema);