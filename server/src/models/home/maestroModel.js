import mongoose from "mongoose";

const maestroSchema = new mongoose.Schema({
    name: { type: String, required: true },       // Name of the mentor/expert
    img: { type: String, required: true },        // Image URL / path
    role: { type: String, required: true },       // Job title / role
    linkedIn: { type: String },                   // LinkedIn URL
    type: { type: String, enum: ['maestro'], required: true }, // Distinguish mentor vs expert
    status: { type: String, enum: ['active', 'inactive'], default: 'active' } // optional for future use
}, { timestamps: true });

const Maestros = mongoose.model('Maestros', maestroSchema);
export default Maestros;