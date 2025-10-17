import mongoose from 'mongoose';

const celebrateSchema = new mongoose.Schema({
    name: { type: String, required: true },
    position: { type: String, required: true },
    company: { type: String, required: true },
    image: { type: String, required: true },
    companyLogo: { type: String, required: true },
    batch: { type: String, required: true },
    status: { type: String, enum: ['active', 'inactive'], default: 'active' },
}, { timestamps: true });
const Celebrate = mongoose.model('Celebrate', celebrateSchema);

export default Celebrate;