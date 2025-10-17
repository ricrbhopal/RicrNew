import express from 'express';
import {
    deleteAdverstand,
    updateAdverstandStatus,
    getAllAdverstands,
    createAdverstanding
} from '../controller/homeController/adverstandingController.js';
import { uploadMedia } from '../../config/multer.js';

const router = express.Router();

router.get('/', getAllAdverstands);
router.post('/', uploadMedia().array('media'), createAdverstanding);
router.put('/:id/status', updateAdverstandStatus);
router.delete('/:id', deleteAdverstand);
export default router;
