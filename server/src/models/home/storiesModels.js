    import mongoose from 'mongoose';

    const storiesSchema = new mongoose.Schema({
        image: {
            type: String,
            required: true,
        },
        Url: {
            type: String,
            required: true,
        },

        status: {
            enum: ['active', 'inactive'],
            type: String,
            default: 'active',
        },
    }, { timestamps: true });

    const Stories = mongoose.model('Stories', storiesSchema);

    export default Stories;