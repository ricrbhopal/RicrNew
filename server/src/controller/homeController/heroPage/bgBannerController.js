import BgBanner from "../../../models/homeModels/heroPage/bgBannerModel";

// Create BgBanner
export const createBgBanner = async (req, res) => {
    try {
        const { BgBanner } = req.body;
        const newBgBanner = new BgBanner({ BgBanner });
        await newBgBanner.save();
        res.status(201).json(newBgBanner);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get all BgBanners
export const getAllBgBanners = async (req, res) => {
    try {
        const bgBanners = await BgBanner.find();
        res.status(200).json(bgBanners);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update BgBanner status
export const updateBgBannerStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;
        const updatedBgBanner = await BgBanner.findByIdAndUpdate(id, { status }, { new: true });
        if (!updatedBgBanner) {
            return res.status(404).json({ message: 'BgBanner not found' });
        }   
        res.status(200).json(updatedBgBanner);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete BgBanner
export const deleteBgBanner = async (req, res) => {
    try {   
        const { id } = req.params;
        const deletedBgBanner = await BgBanner.findByIdAndDelete(id);
        if (!deletedBgBanner) {
            return res.status(404).json({ message: 'BgBanner not found' });
        }
        res.status(200).json({ message: 'BgBanner deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get BgBanner by ID
export const getBgBannerById = async (req, res) => {
    try {
        const { id } = req.params;
        const bgBanner = await BgBanner.findById(id);
        if (!bgBanner) {
            return res.status(404).json({ message: 'BgBanner not found' });
        }
        res.status(200).json(bgBanner);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


