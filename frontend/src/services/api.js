// src/services/api.js
import axios from 'axios';

// Substitua pelo URL da sua API Laravel
const API_URL = 'http://localhost:8000/api';

export const getAlbums = () => {
    return axios.get(`${API_URL}/albums`);
};

export const getAlbumsById = (id) => {
    return axios.get(`${API_URL}/albums/${id}`);
};

export const createAlbums = (albumsData) => {
    return axios.post(`${API_URL}/albums`, albumsData);
};

export const updateAlbums = (id, albumsData) => {
    return axios.put(`${API_URL}/albums/${id}`, albumsData);
};

export const deleteAlbums = (id) => {
    return axios.delete(`${API_URL}/albums/${id}`);
};


export const createFaixa = ( faixaData) => {
    return axios.post(`${API_URL}/faixas`, faixaData);
};
export const getFaixas = () => {
    return axios.get(`${API_URL}/faixas`);
};
export const updateFaixas = (id, faixaData) => {
    return axios.put(`${API_URL}/faixas/${id}`, faixaData);
};
export const deleteFaixas = (id) => {
    return axios.delete(`${API_URL}/faixas/${id}`);
};