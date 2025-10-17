import Adverstand from '../../models/home/adverstandModel.js';
import cloudinary from '../../../config/cloudinary.js';

// create a new adverstand entry
export const createAdverstanding = async (req, res) => {
    try {
        let mediaUrls = [];
        const files = req.files || [];
        // Helper to upload a file buffer to Cloudinary
        const uploadToCloudinary = (file) => {
            return new Promise((resolve, reject) => {
                const resourceType = file.mimetype.startsWith('video/') ? 'video' : 'image';
                const stream = cloudinary.uploader.upload_stream({
                    folder: 'adverstand',
                    resource_type: resourceType,
                }, (error, result) => {
                    if (error) reject(error);
                    else resolve({ url: result.secure_url, type: resourceType, public_id: result.public_id });
                });
                stream.end(file.buffer);
            });
        };
        for (const file of files) {
                const uploadResult = await uploadToCloudinary(file);
                mediaUrls.push(uploadResult);
        }
            // Save adverstand with Cloudinary media URLs and publicId
            const adverstandEntries = mediaUrls.map(media => ({
                medial: media.type,
                url: media.url,
                publicId: media.public_id || media.publicId || '',
            }));
            const created = await Adverstand.insertMany(adverstandEntries);
            res.status(201).json(created);
    }
    catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Get all adverstand entries
export const getAllAdverstands = async (req, res) => {
    try {
        const adverstands = await Adverstand.find().sort({ createdAt: -1 });
        res.status(200).json(adverstands);
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Update adverstand status
export const updateAdverstandStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;
        const adverstand = await Adverstand.findByIdAndUpdate(id, { status }, { new: true });
        if (!adverstand) {
            return res.status(404).json({ error: 'Adverstand not found' });
        }
        res.status(200).json(adverstand);
    }
    catch (err) {
        res.status(400).json({ error: err.message });
    }
};


// Delete an adverstand entry
export const deleteAdverstand = async (req, res) => {
    try {
        const { id } = req.params;
        const adverstand = await Adverstand.findById(id);
        if (!adverstand) {
            return res.status(404).json({ error: 'Adverstand not found' });
        }
        // delete from cloudinary if publicId exists
        if (adverstand.publicId) {
            try {
                await cloudinary.uploader.destroy(adverstand.publicId, { resource_type: adverstand.medial || 'image' });
            } catch (err) {
                console.warn('Cloudinary delete failed', err.message);
            }
        }
        await Adverstand.findByIdAndDelete(id);
        res.status(200).json({ message: 'Adverstand deleted successfully' });
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
};



