import mongoose from 'mongoose';


const bgBannerSchema = new mongoose.Schema({
    BgBanner: {
        type: String,
        enum: ['image', 'video'],
        required: true
    },
    status: {
        type: String,
        enum: ['hide', 'unhide'],
        default: 'unhide'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});


const BgBanner = mongoose.model('BgBanner', bgBannerSchema);

export default BgBanner;
