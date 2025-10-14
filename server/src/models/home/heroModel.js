import mongoose  from "mongoose";

const heroSchema = new mongoose.Schema({
    backgroundVideo: { type: String, required: true },
    mediaType: { type: String, enum: ['video', 'image'], default: 'video' },
    status: { type: String, enum: ['active', 'inactive'], default: 'active' },
}, { timestamps: true });

const backgroundHero = mongoose.model('Hero', heroSchema);

export default backgroundHero;