import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

const api = axios.create({
    baseURL: BASE_URL,
    timeout: 10000, // 10 seconds timeout
    headers: {
        'Content-Type': 'application/json',
    },
});



// ...existing code...
export const adminAPI = {
    // Hero (admin)
    // server admin router is mounted at /admin -> adjust paths accordingly
    uploadBackgroundVideo: (formData) => api.post('/admin/uploadVideo', formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    }),
    // accept optional axios config (e.g., onUploadProgress)
    uploadBackgroundVideoWithConfig: (formData, config = {}) => api.post('/admin/uploadVideo', formData, {
        ...config,
        headers: {
            'Content-Type': 'multipart/form-data',
            ...(config.headers || {}),
        },
    }),
    getHero: () => api.get('/admin/'),
    updateHero: (heroData) => api.put('/admin', heroData),
    getBgVideos: () => api.get('/admin/all'),
    deleteHero: (id) => api.delete(`/admin/${id}`),
    updateHeroStatus: (id, status) => api.put(`/admin/${id}/status`, { status }),


    // backwards-compatible name used in some components
    uploadAffiliationWithConfig: (formData, config = {}) =>
        api.post('/admin/uploadAffiliation', formData, {
            ...config,
            headers: { 'Content-Type': 'multipart/form-data', ...(config.headers || {}) },
        }),
    getAffiliations: () => api.get('/admin/Affiliations'),
    getAllAffiliations: () => api.get('/admin/Affiliations/all'),
    deleteAffiliation: (id) => api.delete(`/admin/Affiliations/${id}`),
    updateAffiliationStatus: (id, status) => api.put(`/admin/Affiliations/${id}/status`, { status }),

    // Maestro (maestor)
    uploadMaestor: (formData, config = {}) =>
        api.post('/admin/maestros', formData, {
            ...config,
            headers: { 'Content-Type': 'multipart/form-data', ...(config.headers || {}) },
        }),
    getAllMaestros: () => api.get('/admin/maestros'),
    updateMaestro: (id, formData, config = {}) =>
        api.put(`/admin/maestros/${id}`, formData, {
            ...config,
            headers: { 'Content-Type': 'multipart/form-data', ...(config.headers || {}) },
        }),
    deleteMaestro: (id) => api.delete(`/admin/maestros/${id}`),
    updateMaestroStatus: (id, status) => api.put(`/admin/maestros/${id}/status`, { status }),

    // Expert
    createExpert: (formData, config = {}) =>
        api.post('/admin/experts', formData, {
            ...config,
            headers: { 'Content-Type': 'multipart/form-data', ...(config.headers || {}) },
        }),
    getExperts: () => api.get('/admin/experts'),
    updateExpert: (id, formData, config = {}) =>
        api.put(`/admin/experts/${id}`, formData, {
            ...config,
            headers: { 'Content-Type': 'multipart/form-data', ...(config.headers || {}) },
        }),
    deleteExpert: (id) => api.delete(`/admin/experts/${id}`),

    // Celebrate
    createCelebrate: (formData, config = {}) =>
        api.post('/admin/celebrate', formData, {
            ...config,
            headers: { 'Content-Type': 'multipart/form-data', ...(config.headers || {}) },
        }),
    getCelebrates: () => api.get('/admin/celebrate'),
    updateCelebrate: (id, data) => api.put(`/admin/celebrate/${id}`, data),
    deleteCelebrate: (id) => api.delete(`/admin/celebrate/${id}`),



    // Advertising
    createAdvertising: (formData, config = {}) =>
        api.post('/admin/advertising', formData, {  
            ...config,
            headers: { 'Content-Type': 'multipart/form-data', ...(config.headers || {}) },
        }),
    getAllAdvertising: () => api.get('/admin/advertising'),
    updateAdvertising: (id, formData, config = {}) =>
        api.put(`/admin/advertising/${id}`, formData, {
            ...config,
            headers: { 'Content-Type': 'multipart/form-data', ...(config.headers || {}) },
        }),
    deleteAdvertising: (id) => api.delete(`/admin/advertising/${id}`),

};
// ...existing code...


export default api;