import express from 'express';
import {
    getHero, uploadBackgroundVideo, getAllHeroes, deleteHero, updateStatus, uploadAffiliation,
    getAffiliations,
    updateAffiliationStatus,
    deleteAffiliation,
    getAllAffilications,
     createMaestro, getAllMaestros, updateMaestro, deleteMaestro, updateMaestroStatus,
     createExpert,
    getExperts,
    updateExpert,
    deleteExpert,
      getAllCelebrates,
  createCelebrate,
  updateCelebrate,
  deleteCelebrate,

  CreateAdvertising,
  GetAllAdvertising,
  UpdateAdvertisingStatus,
  DeleteAdvertising,
  CreateFeaturedInMedia,
  GetAllFeaturedInMedia,
  UpdateFeaturedInMediaStatus,
  DeleteFeaturedInMedia

 

} from '../controller/adminController.js';
import { uploadMedia ,uploadImage} from '../../config/multer.js';
const router = express.Router();


const upload = uploadMedia();

// Hero Routes Section


router.post('/uploadVideo', upload.any(), uploadBackgroundVideo);
router.get('/', getHero);
router.get('/all', getAllHeroes);
router.delete('/s/:id', deleteHero);
router.put('/:id/status', updateStatus);



// Affiliation Routes Section
router.post('/uploadAffiliation', upload.any(), uploadAffiliation);
router.get('/Affiliations', getAffiliations);
router.put('/Affiliations/:id/status', updateAffiliationStatus);
router.delete('/Affiliations/:id', deleteAffiliation);
router.get('/Affiliations/all', getAllAffilications);


// Maestro Routes Section

router.post('/maestros', uploadImage().single('image'), createMaestro);         
router.get('/maestros', getAllMaestros);                                       
router.put('/maestros/:id', uploadImage().single('image'), updateMaestro);      
router.put('/maestros/:id/status', updateMaestroStatus);                       
router.delete('/maestros/:id', deleteMaestro);

// Export the router
router.post('/experts', upload.any(), createExpert);
router.get('/experts', getExperts);
router.put('/experts/:id', upload.any(), updateExpert);
router.delete('/experts/:id', deleteExpert);


// Celebrate Routes Section
router.post('/celebrate', upload.any(), createCelebrate);
router.get('/celebrate', getAllCelebrates);
router.put('/celebrate/:id', updateCelebrate);
router.delete('/celebrate/:id', deleteCelebrate);


// Advertising Routes Section
router.post('/advertising', upload.any(), CreateAdvertising);
router.get('/advertising', GetAllAdvertising);
router.put('/advertising/:id', upload.any(), UpdateAdvertisingStatus);
router.delete('/advertising/:id', DeleteAdvertising);


//Featured In Media Routes SEction
router.post('/featuredInMedia', upload.any(), CreateFeaturedInMedia);
router.get('/featuredInMedia', GetAllFeaturedInMedia);
router.put('/featuredInMedia/:id/status', UpdateFeaturedInMediaStatus);
router.delete('/featuredInMedia/:id', DeleteFeaturedInMedia);

export default router;