import Expert from '../../models/home/expertModel.js';


// create expert with image upload cloudinary
export const createExpert = async (req, res) => {
    try {
        const { name, role, company, linkedIn } = req.body;
        if (!req.files || req.files.length === 0) {
            return res.status(400).json({ message: 'Image is required' });
        }
        const img = req.files[0].path; // Assuming the first file is the image

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
        const experts = await Expert.find({ status: 'active' }).sort({ createdAt: -1 });
        res.status(200).json({ experts });
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
        if (req.files && req.files.length > 0) {
            updateData.img = req.files[0].path; // Update image if new file is uploaded
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



