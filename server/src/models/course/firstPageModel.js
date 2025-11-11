import mongoose from "mongoose";

const firstPageCourseSchema = new mongoose.Schema(
  {
    image: {
      type: String,
      required: true,
    },
    status: {
      enum: ["active", "inactive"],
      type: String,
      default: "active",
    },
    url: {
      type: String,
      required: true, // Ensure the URL is always provided
    },
    title: {
      type: String,
      required: true,
    },
    sub:{
        type: String,
        required: true,
    }
  },
  { timestamps: true }
);
const FirstPageCourse = mongoose.model("FirstPageCourse", firstPageCourseSchema);

export default FirstPageCourse;