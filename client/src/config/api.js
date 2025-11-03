import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://localhost:4500';

const api = axios.create({
    baseURL: BASE_URL,
    timeout: 10000, // 10 seconds timeout
    headers: {
        'Content-Type': 'application/json',
    },
});

// Add a request interceptor for multipart/form-data
api.interceptors.request.use(config => {
    // If the request data is FormData, set the header
    if (config.data instanceof FormData) {
        config.headers['Content-Type'] = 'multipart/form-data';
    }
    return config;
});

export const adminAPI = {
    // Hero (admin)
    // server admin router is mounted at /admin -> adjust paths accordingly
    uploadBackgroundVideo: (formData) => api.post('/admin/uploadVideo', formData),
    // accept optional axios config (e.g., onUploadProgress)
    uploadBackgroundVideoWithConfig: (formData, config = {}) => api.post('/admin/uploadVideo', formData, config),
    getHero: () => api.get('/admin/'),
    updateHero: (heroData) => api.put('/admin', heroData),
    getBgVideos: () => api.get('/admin/all'),
    deleteHero: (id) => api.delete(`/admin/${id}`),
    updateHeroStatus: (id, status) => api.put(`/admin/${id}/status`, { status }),


    // backwards-compatible name used in some components
    uploadAffiliationWithConfig: (formData, config = {}) =>
        api.post('/admin/uploadAffiliation', formData, config),
    getAffiliations: () => api.get('/admin/Affiliations'),
    getAllAffiliations: () => api.get('/admin/Affiliations/all'),
    deleteAffiliation: (id) => api.delete(`/admin/Affiliations/${id}`),
    updateAffiliationStatus: (id, status) => api.put(`/admin/Affiliations/${id}/status`, { status }),

    // Maestro (maestor)
    uploadMaestor: (formData, config = {}) =>
        api.post('/admin/maestros', formData, config),
    getAllMaestros: () => api.get('/admin/maestros'),
    updateMaestro: (id, formData, config = {}) =>
        api.put(`/admin/maestros/${id}`, formData, config),
    deleteMaestro: (id) => api.delete(`/admin/maestros/${id}`),
    updateMaestroStatus: (id, status) => api.put(`/admin/maestros/${id}/status`, { status }),

    // Expert
    createExpert: (formData, config = {}) =>
        api.post('/admin/experts', formData, config),
    getExperts: () => api.get('/admin/experts'),
    updateExpert: (id, formData, config = {}) =>
        api.put(`/admin/experts/${id}`, formData, config),
    deleteExpert: (id) => api.delete(`/admin/experts/${id}`),

    // Celebrate
    createCelebrate: (formData, config = {}) =>
        api.post('/admin/celebrate', formData, config),
    getCelebrates: () => api.get('/admin/celebrate'),
    updateCelebrate: (id, data) => api.put(`/admin/celebrate/${id}`, data),
    deleteCelebrate: (id) => api.delete(`/admin/celebrate/${id}`),



    // Advertising
    createAdvertising: (formData, config = {}) =>
        api.post('/admin/advertising', formData, config),
    getAllAdvertising: () => api.get('/admin/advertising'),
    updateAdvertising: (id, formData, config = {}) =>
        api.put(`/admin/advertising/${id}`, formData, config),
    deleteAdvertising: (id) => api.delete(`/admin/advertising/${id}`),



    // Featured In Media
    createFeaturedInMedia: (formData, config = {}) =>
        api.post('/admin/featuredInMedia', formData, config),
    getAllFeaturedInMedia: () => api.get('/admin/featuredInMedia'),
    updateFeaturedInMediaStatus: (id, status) =>
        api.put(`/admin/featuredInMedia/${id}/status`, { status }),
    deleteFeaturedInMedia: (id) => api.delete(`/admin/featuredInMedia/${id}`),

// Portfolio
    createPortfolio: (formData, config = {}) =>
        api.post('/admin/portfolio', formData, config),
    getAllPortfolio: () => api.get('/admin/portfolio'),
    updatePortfolioStatus: (id, status) =>
        api.put(`/admin/portfolio/${id}/status`, { status }),
    deletePortfolio: (id) => api.delete(`/admin/portfolio/${id}`),
};


export default api;