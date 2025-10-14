import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

const api = axios.create({
    baseURL: BASE_URL,
    timeout: 10000, // 10 seconds timeout
    headers: {
        'Content-Type': 'application/json',
    },
});

export const heroAPI = {
    uploadBackgroundVideo: (formData) => api.post('/hero/uploadVideo', formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    }),
    // accept optional axios config (e.g., onUploadProgress)
    uploadBackgroundVideoWithConfig: (formData, config = {}) => api.post('/hero/uploadVideo', formData, {
        ...config,
        headers: {
            'Content-Type': 'multipart/form-data',
            ...(config.headers || {}),
        },
    }),
    getHero: () => api.get('/hero/'),
    updateHero: (heroData) => api.put('/hero', heroData),
    getBgVideos: () => api.get('/hero/all'),
    deleteHero: (id) => api.delete(`/hero/${id}`),
    updateHeroStatus: (id, status) => api.put(`/hero/${id}/status`, { status }),
};


export const affiliationAPI = {
    uploadAffiliation: (formData) => api.post('/affiliations/upload', formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    }),
    // accept optional axios config (e.g., onUploadProgress)
    uploadAffiliationWithConfig: (formData, config = {}) => api.post('/affiliations/upload', formData, {
        ...config,
        headers: {
            'Content-Type': 'multipart/form-data',
            ...(config.headers || {}),
        },
    }),
    getAffiliations: () => api.get('/affiliations'),
    updateAffiliationStatus: (id, status) => api.put(`/affiliations/${id}/status`, { status }),
    deleteAffiliation: (id) => api.delete(`/affiliations/${id}`),
    getAllAffiliations: () => api.get('/affiliations/all'),
};



export const maestorAPI = {
    uploadMaestor: (formData) => api.post('/maestor', formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    }),
       
    updateMaestroStatus: (id, status) => api.put(`/maestor/${id}/status`, { status }),
    deleteMaestro: (id) => api.delete(`/maestor/${id}`),
    getAllMaestros: () => api.get('/maestor'),
    updateMaestro: (id, formData) => api.put(`/maestor/${id}`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    }),

};

export default api;