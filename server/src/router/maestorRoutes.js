import express from 'express';
import { createMaestro, getAllMaestros, updateMaestro, deleteMaestro, updateMaestroStatus } from '../controller/homeController/maestroController.js';
import { uploadImage } from '../../config/multer.js'; // your multer memory storage

const router = express.Router();

router.post('/', uploadImage().single('image'), createMaestro);         
router.get('/', getAllMaestros);                                       
router.put('/:id', uploadImage().single('image'), updateMaestro);      
router.put('/:id/status', updateMaestroStatus);                       
router.delete('/:id', deleteMaestro);                                  

export default router;
