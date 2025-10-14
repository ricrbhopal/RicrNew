import mongoose from 'mongoose';

const expertSchema = new mongoose.Schema({
    img: { type: String, required: true },
    name: { type: String, required: true },
    role: { type: String, required: true },
    company: { type: String, required: true },
    linkedIn: { type: String, required: true },
    status: { type: String, enum: ['active', 'inactive'], default: 'active' }
}, { timestamps: true });


const expertModel = mongoose.model('Expert', expertSchema);
export default expertModel;
