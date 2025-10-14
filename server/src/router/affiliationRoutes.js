import express from 'express';
import {
	uploadAffiliation,
	getAffiliations,
	updateAffiliationStatus,
	deleteAffiliation,
    getAllAffilications
} from '../controller/homeController/affiliation&accreditaionController.js';
import { uploadMedia } from '../../config/multer.js';

const router = express.Router();

// Use uploadMedia() so both images and (if needed) videos are accepted
const upload = uploadMedia();

router.post('/upload', upload.any(), uploadAffiliation);
router.get('/', getAffiliations);
router.put('/:id/status', updateAffiliationStatus);
router.delete('/:id', deleteAffiliation);
router.get('/all', getAllAffilications); // New route to get all affiliations
export default router;

