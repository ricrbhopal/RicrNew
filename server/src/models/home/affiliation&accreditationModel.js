import mongoose from "mongoose";

const affiliationSchema = new mongoose.Schema({
    image: { type: String, required: true },
    status:{ type: String, enum: ['active', 'inactive'], default: 'inactive' },
}, { timestamps: true });

const Affiliation = mongoose.model('Affiliation', affiliationSchema);

export default Affiliation;
