import express from 'express';
import {
    createExpert,
    getExperts,
    updateExpert,
    deleteExpert
} from '../controller/homeController/expertController.js';
import { uploadMedia } from '../../config/multer.js';

const router = express.Router();

router.post('/', uploadMedia, createExpert);
router.get('/', getExperts);
router.put('/:id', uploadMedia, updateExpert);
router.delete('/:id', deleteExpert);

export default router;