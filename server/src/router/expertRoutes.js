import express from 'express';
import {
    createExpert,
    getExperts,
    updateExpert,
    deleteExpert
} from '../controller/homeController/expertController.js';
import { uploadMedia } from '../../config/multer.js';

const router = express.Router();

// create a multer instance that accepts images/videos (memoryStorage)
const upload = uploadMedia();

// Use upload.any() to accept files regardless of the field name (tolerant for frontend)
router.post('/', upload.any(), createExpert);
router.get('/', getExperts);
router.put('/:id', upload.any(), updateExpert);
router.delete('/:id', deleteExpert);

export default router;