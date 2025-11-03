import mongoose from 'mongoose';

const PortfolioSchema = new mongoose.Schema({
    image:{
        type:String,
        required:true
    },
    status:{
        enum: ['active', 'inactive'],   
        type: String,
        default: 'active'
    },
}, { timestamps: true });
const Portfolio = mongoose.model('Portfolio', PortfolioSchema);
export default Portfolio;