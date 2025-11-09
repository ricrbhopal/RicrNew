import mongoose from "mongoose";

const AboutHeroSchema = new mongoose.Schema({
  mediaType: {
    type: String,
    enum: ['video', 'image'],
    required: true,
  },
  status: {
    type: String,
    enum: ['active', 'inactive'],
    default: 'active',
  },
  url: {
    type: String,
    required: true, // Ensure the URL is always provided
  },
});

const AboutHero = mongoose.model("AboutHero", AboutHeroSchema);

export default AboutHero;
