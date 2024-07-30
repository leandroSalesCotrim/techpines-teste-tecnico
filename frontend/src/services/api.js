// src/services/api.js
import axios from 'axios';

// Substitua pelo URL da sua API Laravel
const API_URL = 'http://localhost:8000/api';

export const getAlbums = () => {
    return axios.get(`${API_URL}/albums`);
};

export const getalbumsById = (id) => {
    return axios.get(`${API_URL}/albums/${id}`);
};

export const createalbums = (albumsData) => {
    return axios.post(`${API_URL}/albums`, albumsData);
};

export const updatealbums = (id, albumsData) => {
    return axios.put(`${API_URL}/albums/${id}`, albumsData);
};

export const deletealbums = (id) => {
    return axios.delete(`${API_URL}/albums/${id}`);
};
