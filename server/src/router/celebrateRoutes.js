import express from 'express';
import {
  getAllCelebrates,
  createCelebrate,
  updateCelebrate,
  deleteCelebrate
} from '../controller/homeController/celebrateController.js';
import { uploadImage } from '../../config/multer.js';

const router = express.Router();

router.get('/', getAllCelebrates);
router.post('/', uploadImage().fields([
  { name: 'image', maxCount: 1 },
  { name: 'companyLogo', maxCount: 1 }
]), createCelebrate);
router.put('/:id', updateCelebrate);
router.delete('/:id', deleteCelebrate);

export default router;

