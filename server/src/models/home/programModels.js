import mongoose from "mongoose";

const ProgramSchema = new mongoose.Schema(
  {
    subtext: { type: String},
    video: { type: String },
    status: { type: String, enum: ["active", "inactive"], default: "active" },
  },
  { timestamps: true }
);

const Program = mongoose.model("Program", ProgramSchema);

export default Program;