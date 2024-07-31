import React, { useState } from 'react';
import { createAlbums } from '../services/api';
import './AddAlbums.css';

const AddAlbums = ({ onClose }) => {
    const [formData, setFormData] = useState({
        nome: '',
        descricao: '',
        artista: '',
        data_lancamento: '',
        genero: '',
        capa_url: '',
        qtd_faixas: 0,
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await createAlbums(formData);
            onClose(); // Fechar a modal após o envio
            window.location.reload();
        } catch (error) {
            console.error('Error adding albums:', error);
        }
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <form onSubmit={handleSubmit}>
                    <h1>Adicionar Álbum</h1>
                    <label>
                        Nome:
                        <input type="text" name="nome" value={formData.nome} onChange={handleChange} />
                    </label>
                    <label>
                        Descricao:
                        <input type="text" name="descricao" value={formData.descricao} onChange={handleChange} />
                    </label>
                    <label>
                        Artista:
                        <input type="text" name="artista" value={formData.artista} onChange={handleChange} />
                    </label>
                    <label>
                        Data do lançamento:
                        <input type="date" name="data_lancamento" value={formData.data_lancamento} onChange={handleChange} />
                    </label>
                    <label>
                        Genero:
                        <input type="text" name="genero" value={formData.genero} onChange={handleChange} />
                    </label>
                    <label>
                        Número de faixas:
                        <input type="number" name="qtd_faixas" value={formData.qtd_faixas} onChange={handleChange} />
                    </label>
                    <label>
                        URL da capa:
                        <input type="text" name="capa_url" value={formData.capa_url} onChange={handleChange} />
                    </label>
                    <button type="submit">Adicionar Álbum</button>
                    <button type="button" onClick={onClose}>Fechar</button>
                </form>
            </div>
        </div>
    );
};

export default AddAlbums;
