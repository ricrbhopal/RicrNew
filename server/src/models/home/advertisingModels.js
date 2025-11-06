import mongoose from "mongoose";

const adverstandSchema = new mongoose.Schema(
  {
    // kept original field name for backward compatibility
    medial: {
      enum: ["image", "video"],
      type: String,
      required: true,
    },
    // secure URL returned by Cloudinary
    url: {
      type: String,
      required: true,
    },
    status: {
      enum: ["active", "inactive"],
      type: String,
      default: "active",
    },
  },
  { timestamps: true }
);

const Adverstand = mongoose.model("Adverstand", adverstandSchema);

export default Adverstand;
