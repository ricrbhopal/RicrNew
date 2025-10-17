import Expert from '../../models/home/expertModel.js';
import cloudinary from '../../../config/cloudinary.js';
import { Readable } from 'stream';


// create expert with image upload cloudinary
export const createExpert = async (req, res) => {
    try {
        const { name, role, company, linkedIn } = req.body;
        // Support either an uploaded file (req.file or req.files[0]) or an image URL in req.body.img
        let img = '';
        const file = req.file || (Array.isArray(req.files) && req.files[0]);

        // If multer memory buffer present, stream to Cloudinary
        if (file && file.buffer) {
            // upload buffer to Cloudinary
            const uploadBufferToCloudinary = (file, options = { folder: 'experts' }) => {
                return new Promise((resolve, reject) => {
                    if (!file || !file.buffer) return reject(new Error('No file buffer provided'));
                    const mime = file.mimetype || '';
                    if (!mime.startsWith('image/')) return reject(new Error('Only image files are allowed'));

                    const uploadStream = cloudinary.uploader.upload_stream({ folder: options.folder, resource_type: 'image' }, (err, result) => {
                        if (err) return reject(err);
                        resolve(result);
                    });

                    const readable = new Readable();
                    readable.push(file.buffer);
                    readable.push(null);
                    readable.pipe(uploadStream);
                });
            };

            const result = await uploadBufferToCloudinary(file, { folder: 'experts' });
            img = result.secure_url;
        } else if (req.file && req.file.path) {
            img = req.file.path;
        } else if (req.files && req.files.length > 0 && req.files[0].path) {
            img = req.files[0].path;
        } else if (req.body && req.body.img) {
            img = req.body.img;
        }

        // If no image provided, return a 400
        if (!img) {
            return res.status(400).json({ message: 'Image is required (upload a file or provide an image URL in `img`)' });
        }

        const newExpert = new Expert({
            img,
            name,
            role,   
            company,
            linkedIn,
            status: 'active'
        });
        await newExpert.save();
        res.status(201).json({ message: 'Expert created successfully', expert: newExpert });
    } catch (error) {
        console.error('Error creating expert:', error);
        res.status(500).json({ message: 'Server error' });
    }
};


// get all experts
export const getExperts = async (req, res) => {
    try {
        // Return all experts (both active and inactive). Client can filter as needed.
        const experts = await Expert.find().sort({ createdAt: -1 });
        res.status(200).json(experts);
    }                                                                                                           
    catch (error) {
        console.error('Error fetching experts:', error);
        res.status(500).json({ message: 'Server error' });
    }
};


// update expert by id
export const updateExpert = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, role, company, linkedIn, status } = req.body;
        const updateData = { name, role, company, linkedIn, status };
        const file = req.file || (Array.isArray(req.files) && req.files[0]);
        if (file) {
            if (file.buffer) {
                // upload buffer to cloudinary
                const uploadBufferToCloudinary = (file, options = { folder: 'experts' }) => {
                    return new Promise((resolve, reject) => {
                        if (!file || !file.buffer) return reject(new Error('No file buffer provided'));
                        const mime = file.mimetype || '';
                        if (!mime.startsWith('image/')) return reject(new Error('Only image files are allowed'));

                        const uploadStream = cloudinary.uploader.upload_stream({ folder: options.folder, resource_type: 'image' }, (err, result) => {
                            if (err) return reject(err);
                            resolve(result);
                        });

                        const readable = new Readable();
                        readable.push(file.buffer);
                        readable.push(null);
                        readable.pipe(uploadStream);
                    });
                };

                const result = await uploadBufferToCloudinary(file, { folder: 'experts' });
                updateData.img = result.secure_url;
            } else if (file.path) {
                updateData.img = file.path;
            }
        }

        const updatedExpert = await Expert.findByIdAndUpdate
            (id, updateData, { new: true });
        if (!updatedExpert) {
            return res.status(404).json({ message: 'Expert not found' });
        }
        res.status(200).json({ message: 'Expert updated successfully', expert: updatedExpert });
    } catch (error) {
        console.error('Error updating expert:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

// delete expert by id (soft delete by setting status to inactive)
export const deleteExpert = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedExpert = await Expert.findByIdAndUpdate(id, { status: 'inactive' }, { new: true });
        if (!deletedExpert) {
            return res.status(404).json({ message: 'Expert not found' });
        }
        res.status(200).json({ message: 'Expert deleted successfully', expert: deletedExpert });
    }
    catch (error) {
        console.error('Error deleting expert:', error);
        res.status(500).json({ message: 'Server error' });
    }
};



