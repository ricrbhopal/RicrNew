import express from "express";
import { getBgBanner, createBgBanner, updateBgBanner, deleteBgBanner } from "../../../controllers/homeControllers/heroPage/bgBannerController.js";

const router = express.Router();

// Create BgBanner
router.post('/bgBanners', createBgBanner);

// Get all BgBanners
router.get('/bgBanners', getBgBanner);

// Update BgBanner status
router.put('/bgBanners/:id', updateBgBanner);

// Delete BgBanner
router.delete('/bgBanners/:id', deleteBgBanner);

// Get BgBanner by ID
router.get('/bgBanners/:id', getBgBanner);

export default router;