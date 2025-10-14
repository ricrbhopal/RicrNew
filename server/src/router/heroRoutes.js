import express from 'express';
import { getHero , uploadBackgroundVideo ,getAllHeroes,deleteHero,updateStatus } from '../controller/homeController/heroController.js';
import { uploadVideo, uploadImage, uploadMedia } from '../../config/multer.js';
const router = express.Router();


const upload = uploadMedia();

// Use upload.any() to accept files regardless of the field name (more tolerant for frontend)
router.post('/uploadVideo', upload.any(), uploadBackgroundVideo);
// Route to get the active hero (background video)
router.get('/', getHero);
// Route to get all heroes (for admin purposes)
router.get('/all', getAllHeroes);
// Route to delete a hero by ID
router.delete('/:id', deleteHero);
// Route to update hero status by ID
router.put('/:id/status', updateStatus);

export default router;