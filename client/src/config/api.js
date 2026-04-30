import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL;

const api = axios.create({
  baseURL: BASE_URL,
  timeout: 10000, // 10 seconds timeout
  headers: {
    "Content-Type": "application/json",
  },
});

// Add a request interceptor for multipart/form-data
api.interceptors.request.use((config) => {
  // If the request data is FormData, set the header
  if (config.data instanceof FormData) {
    config.headers["Content-Type"] = "multipart/form-data";
  }
  return config;
});

export const adminAPI = {
  // Hero Page Section API
  uploadBackgroundVideo: (formData) => api.post("/admin/uploadVideo", formData),
  uploadBackgroundVideoWithConfig: (formData, config = {}) =>
    api.post("/admin/uploadVideo", formData, config),
  getHero: () => api.get("/admin/"),
  updateHero: (id, heroData) => api.put(`/admin/${id}`, heroData),
  getBgVideos: () => api.get("/admin/all"),
  deleteHero: (id) => api.delete(`/admin/s/${id}`),
  updateHeroStatus: (id, status) => api.put(`/admin/${id}/status`, { status }),
  updateHeroOrder: (id, order) => api.put(`/admin/${id}/order`, { order }),





  // Celebrate Page Section API
  createCelebrate: (formData, config = {}) =>
    api.post("/admin/celebrate", formData, config),
  getCelebrates: () => api.get("/admin/celebrate"),
  updateCelebrate: (id, data) => api.put(`/admin/celebrate/${id}`, data),
  deleteCelebrate: (id) => api.delete(`/admin/celebrate/${id}`),



// Program Page Section API
uploadProgram: (formData, config = {}) =>
  api.post("/admin/program", formData, config),
getProgram: () => api.get("/admin/program"),
getAllPrograms: () => api.get("/admin/program/all"),
updateProgram: (id, data) =>
  api.put(`/admin/program/${id}`, data),

updateProgramStatus: (id) =>
  api.put(`/admin/program/${id}/status`),
deleteProgram: (id) =>
  api.delete(`/admin/program/${id}`),





 //  HOW IT WORK PAGE SECTION API

// 🔥 CREATE (WITH FILE)
createHowItWork: (formData, config = {}) =>
  api.post("/admin/howitwork", formData, {
    headers: { "Content-Type": "multipart/form-data" },
    ...config,
  }),

// 🔥 GET ACTIVE
getHowItWork: () =>
  api.get("/admin/howitwork"),

// 🔥 GET ALL
getAllHowItWorks: () =>
  api.get("/admin/howitwork/all"),

// 🔥 UPDATE (IMPORTANT FIX)
updateHowItWork: (id, formData, config = {}) =>
  api.put(`/admin/howitwork/${id}`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
    ...config,
  }),

// 🔥 STATUS TOGGLE
updateHowItWorkStatus: (id) =>
  api.put(`/admin/howitwork/${id}/status`),

// 🔥 DELETE
deleteHowItWork: (id) =>
  api.delete(`/admin/howitwork/${id}`),




// Why RICR Page Section API


// ================= WHY RICR API =================

// CREATE
createWhyRICR: (formData, config = {}) =>
  api.post("/admin/whyricr", formData, {
    headers: { "Content-Type": "multipart/form-data" },
    ...config,
  }),

// GET ACTIVE
getWhyRICR: () =>
  api.get("/admin/whyricr"),

// GET ALL
getAllWhyRICR: () =>
  api.get("/admin/whyricr/all"),

// UPDATE
updateWhyRICR: (id, formData, config = {}) =>
  api.put(`/admin/whyricr/${id}`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
    ...config,
  }),

// STATUS TOGGLE
updateWhyRICRStatus: (id) =>
  api.put(`/admin/whyricr/${id}/status`),

// DELETE
deleteWhyRICR: (id) =>
  api.delete(`/admin/whyricr/${id}`),


  // backwards-compatible name used in some components
  uploadAffiliationWithConfig: (formData, config = {}) =>
    api.post("/admin/uploadAffiliation", formData, config),
  getAffiliations: () => api.get("/admin/Affiliations"),
  getAllAffiliations: () => api.get("/admin/Affiliations/all"),
  deleteAffiliation: (id) => api.delete(`/admin/Affiliations/${id}`),
  updateAffiliationStatus: (id, status) =>
    api.put(`/admin/Affiliations/${id}/status`, { status }),

  // Maestro (maestor)
  uploadMaestor: (formData, config = {}) =>
    api.post("/admin/maestros", formData, config),
  getAllMaestros: () => api.get("/admin/maestros"),
  updateMaestro: (id, formData, config = {}) =>
    api.put(`/admin/maestros/${id}`, formData, config),
  deleteMaestro: (id) => api.delete(`/admin/maestros/${id}`),
  updateMaestroStatus: (id, status) =>
    api.put(`/admin/maestros/${id}/status`, { status }),

  // Expert
  createExpert: (formData, config = {}) =>
    api.post("/admin/experts", formData, config),
  getExperts: () => api.get("/admin/experts"),
  updateExpert: (id, formData, config = {}) =>
    api.put(`/admin/experts/${id}`, formData, config),
  deleteExpert: (id) => api.delete(`/admin/experts/${id}`),


  // Advertising
  createAdvertising: (formData, config = {}) =>
    api.post("/admin/advertising", formData, config),
  getAllAdvertising: () => api.get("/admin/advertising"),
  updateAdvertising: (id, formData, config = {}) =>
    api.put(`/admin/advertising/${id}`, formData, config),
  deleteAdvertising: (id) => api.delete(`/admin/advertising/${id}`),

  // Featured In Media
  createFeaturedInMedia: (formData, config = {}) =>
    api.post("/admin/featuredInMedia", formData, config),
  getAllFeaturedInMedia: () => api.get("/admin/featuredInMedia"),
  updateFeaturedInMediaStatus: (id, status) =>
    api.put(`/admin/featuredInMedia/${id}/status`, { status }),
  deleteFeaturedInMedia: (id) => api.delete(`/admin/featuredInMedia/${id}`),

  // Portfolio
  createPortfolio: (formData, config = {}) =>
    api.post("/admin/portfolio", formData, config),
  getAllPortfolio: () => api.get("/admin/portfolio"),
  updatePortfolioStatus: (id, status) =>
    api.put(`/admin/portfolio/${id}/status`, { status }),
  deletePortfolio: (id) => api.delete(`/admin/portfolio/${id}`),

  // Stories
  createStory: (formData, config = {}) =>
    api.post("/admin/stories", formData, config),
  getAllStories: () => api.get("/admin/stories"),
  refreshStoryMetadata: (id) =>
    api.put(`/admin/stories/${id}/refresh-metadata`),
  updateStoryStatus: (id, status) =>
    api.put(`/admin/stories/${id}/status`, { status }),
  deleteStory: (id) => api.delete(`/admin/stories/${id}`),

  // About Hero
  createAboutHero: (formData, config = {}) =>
    api.post("/admin/aboutHero", formData, config),
  getAllAboutHeroes: () => api.get("/admin/aboutHero"),
  updateAboutHeroStatus: (id, status) =>
    api.put(`/admin/aboutHero/${id}/status`, { status }),
  deleteAboutHero: (id) => api.delete(`/admin/aboutHero/${id}`),

  // Our Logo
  createOurLogo: (formData, config = {}) =>
    api.post("/admin/ourLogo", formData, config),
  getAllOurLogos: () => api.get("/admin/ourLogo"),
  updateOurLogoStatus: (id, status) =>
    api.put(`/admin/ourLogo/${id}/status`, { status }),
  deleteOurLogo: (id) => api.delete(`/admin/ourLogo/${id}`),
};

export default api;
