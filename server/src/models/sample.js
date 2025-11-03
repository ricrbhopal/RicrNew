import mongoose from "mongoose";
const SampleSchema = new mongoose.Schema({
    name: {
        type: String,   
        required: true
    },
}, { timestamps: true });
const Sample = mongoose.model('Sample', SampleSchema);
export default Sample;