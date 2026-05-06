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
  DeleteFeaturedInMedia,
  CreatePortfolio,
  GetAllPortfolio,UpdatePortfolioStatus,
  DeletePortfolio,
  CreateStory,
  GetAllStories,
  FetchStoryMetadata,
  RefreshStoryMetadata,
  UpdateStoryStatus,
  DeleteStory,
    deleteAboutHero,
  updateAboutHeroStatus,
  getAllAboutHeroes,
  createAboutHero,
  createOurLogo,
  getAllOurLogos,
  updateOurLogoStatus,
  deleteOurLogo,
  updateHero
,
deleteProgram,
updateProgram,
updateProgramStatus,
updateHeroOrder,
getAllPrograms,
getProgram,
uploadProgram,
deleteHowItWork,
updateHowItWorkStatus,
updateHowItWork,
getAllHowItWorks,
getHowItWork,
createHowItWork,
  createWhyRICR,
  getWhyRICR,
  getAllWhyRICR,
  updateWhyRICR,
  updateWhyRICRStatus,
  deleteWhyRICR,




} from '../controller/adminController.js';
import { uploadMedia ,uploadImage} from '../config/multer.js';

const router = express.Router();


const upload = uploadMedia();

// Hero Routes Section

router.post('/uploadVideo', upload.any(), uploadBackgroundVideo);
router.get('/', getHero);
router.get('/all', getAllHeroes);
router.delete('/s/:id', deleteHero);
router.put('/:id/status', updateStatus);
router.put('/:id', upload.single("media"), updateHero);
router.put('/:id/order', updateHeroOrder);





// Celebrate Routes Section
router.post('/celebrate', upload.any(), createCelebrate);
router.get('/celebrate', getAllCelebrates);
router.put('/celebrate/:id', updateCelebrate);
router.delete('/celebrate/:id', deleteCelebrate);



// dfsfsdfdsff

//Program Routes Section
router.post('/program', upload.single('video'), uploadProgram);
router.get('/program', getProgram); // frontend active
router.get('/program/all', getAllPrograms); // admin
router.put('/program/:id', updateProgram);
router.put('/program/:id/status', updateProgramStatus);
router.delete('/program/:id', deleteProgram);



//How its Works Routes Section
// How its Works Routes Section
router.post("/howitwork", upload.single("media"), createHowItWork);

router.get("/howitwork", getHowItWork);
router.get("/howitwork/all", getAllHowItWorks);

router.put("/howitwork/:id", upload.single("media"), updateHowItWork);

router.put("/howitwork/:id/status", updateHowItWorkStatus);
router.delete("/howitwork/:id", deleteHowItWork);





// ================= ADMIN =================
router.post("/whyricr", upload.single("media"), createWhyRICR);

router.get("/whyricr", getWhyRICR);
router.get("/whyricr/all", getAllWhyRICR);

router.put("/whyricr/:id", upload.single("media"), updateWhyRICR);

router.put("/whyricr/:id/status", updateWhyRICRStatus);
router.delete("/whyricr/:id", deleteWhyRICR);




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


// Portfolio Routes Section
router.post('/portfolio', upload.any(), CreatePortfolio);
router.get('/portfolio', GetAllPortfolio);
router.put('/portfolio/:id/status', UpdatePortfolioStatus);
router.delete('/portfolio/:id', DeletePortfolio);


// Stories Routes Section
router.post('/stories', upload.any(), CreateStory);
router.get('/stories', GetAllStories);
router.get('/stories/metadata', FetchStoryMetadata);
router.put('/stories/:id/refresh-metadata', RefreshStoryMetadata);
router.put('/stories/:id/status', UpdateStoryStatus);
router.delete('/stories/:id', DeleteStory);

// About Hero Routes Section
router.post('/aboutHero', upload.any(), createAboutHero);
router.get('/aboutHero', getAllAboutHeroes);
router.put('/aboutHero/:id/status', updateAboutHeroStatus);
router.delete('/aboutHero/:id', deleteAboutHero);

// Our Logo Routes Section
router.post('/ourLogo', upload.any(), createOurLogo);
router.get('/ourLogo', getAllOurLogos);
router.put('/ourLogo/:id/status', updateOurLogoStatus);
router.delete('/ourLogo/:id', deleteOurLogo);

export default router;