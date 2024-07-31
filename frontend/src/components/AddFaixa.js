// src/components/AddFaixa.js
import React, { useState } from 'react';
import { createFaixa } from '../services/api';
import './AddFaixa.css';

const AddFaixa = ({ albumId }) => {
    const [formData, setFormData] = useState({
        nome: '',
        descricao: '',
        artista: '',
        num_faixa: '',
        duracao: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await createFaixa({ ...formData, albums_id: albumId });
            setFormData({
                nome: '',
                descricao: '',
                artista: '',
                num_faixa: '',
                duracao: '',
            });
        } catch (error) {
            console.error('Error adding faixa:', error);
        }
    };

    return (
        <form class="form-faixa"onSubmit={handleSubmit}>
            <h3>Adicionar Faixa</h3>
            <label>
                Nome:
                <input type="text" name="nome" value={formData.nome} onChange={handleChange} required />
            </label>
            <label>
                Descrição:
                <input type="text" name="descricao" value={formData.descricao} onChange={handleChange} />
            </label>
            <label>
                <input type="text" name="artista" value={formData.artista} onChange={handleChange} required />
            </label>
            <label>
                Número da Faixa:
                <input type="number" name="num_faixa" value={formData.num_faixa} onChange={handleChange} required />
            </label>
            <label>
                Duração (em minutos):
                <input type="text" name="duracao" value={formData.duracao} onChange={handleChange} required />
            </label>
            <button type="submit">Adicionar Faixa</button>
        </form>
    );
};

export default AddFaixa;
