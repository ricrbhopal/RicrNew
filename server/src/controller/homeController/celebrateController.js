import Celebrate from '../../models/home/celebrateModel.js';
import cloudinary from '../../../config/cloudinary.js';

// Get all celebrate entries
export const getAllCelebrates = async (req, res) => {
    try {
        const celebrates = await Celebrate.find().sort({ createdAt: -1 });
        res.status(200).json(celebrates);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};


// Create a new celebrate entry
export const createCelebrate = async (req, res) => {
    try {
        let imageUrl = '';
        let companyLogoUrl = '';
        // Handle both image and companyLogo uploads
        const files = req.files || {};
        // Helper to upload a file buffer to Cloudinary
        const uploadToCloudinary = (file, folder) => {
            return new Promise((resolve, reject) => {
                const stream = cloudinary.uploader.upload_stream({
                    folder,
                    resource_type: 'image',
                }, (error, result) => {
                    if (error) reject(error);
                    else resolve(result.secure_url);
                });
                stream.end(file.buffer);
            });
        };

        if (files.image && files.image[0]) {
            imageUrl = await uploadToCloudinary(files.image[0], 'celebrate');
        } else if (req.body.image) {
            imageUrl = req.body.image;
        }
        if (files.companyLogo && files.companyLogo[0]) {
            companyLogoUrl = await uploadToCloudinary(files.companyLogo[0], 'celebrate');
        } else if (req.body.companyLogo) {
            companyLogoUrl = req.body.companyLogo;
        }

        // Save celebrate with Cloudinary image URLs
        const celebrate = new Celebrate({
            ...req.body,
            image: imageUrl,
            companyLogo: companyLogoUrl,
        });
        await celebrate.save();
        res.status(201).json(celebrate);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Update a celebrate entry
export const updateCelebrate = async (req, res) => {
    try {
        const { status } = req.body;
        if (!['active', 'inactive'].includes(status)) {
            return res.status(400).json({ error: 'Invalid status value' });
        }
        const celebrate = await Celebrate.findByIdAndUpdate(
            req.params.id,
            { status },
            { new: true, runValidators: true }
        );
        if (!celebrate) return res.status(404).json({ error: 'Not found' });
        res.status(200).json(celebrate);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Delete a celebrate entry
export const deleteCelebrate = async (req, res) => {
    try {
        const celebrate = await Celebrate.findByIdAndDelete(req.params.id);
        if (!celebrate) return res.status(404).json({ error: 'Not found' });
        res.status(200).json({ message: 'Deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
