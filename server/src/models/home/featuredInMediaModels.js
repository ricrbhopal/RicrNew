import mongoose from 'mongoose';


const featuredInMediaSchema = new mongoose.Schema({
 
    image:{
        type:String,
        required:true
    }
    ,
    status:{
        enum: ['active', 'inactive'],
        type: String,
        default: 'active'
    },
}, { timestamps: true });

const FeaturedInMedia = mongoose.model('FeaturedInMedia', featuredInMediaSchema);
export default FeaturedInMedia;


