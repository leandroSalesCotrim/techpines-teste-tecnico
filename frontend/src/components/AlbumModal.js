import React from 'react';
import './AlbumModal.css';
import FaixaList from './FaixaList';

const AlbumModal = ({ album, onClose }) => {
    const genericImageUrl = 'https://cdn-icons-png.flaticon.com/512/7163/7163433.png';

    if (!album) return null;

    return (
        <div className="modal">
            <div className="modal-content">
                <span className="close" onClick={onClose}>&times;</span>
                <div className="album-header">
                    <img
                        src={album.capa_url || genericImageUrl}
                        alt={`Capa do álbum ${album.nome}`}
                    />
                    <div className="album-info">
                        <h2>{album.nome}</h2>
                        <p>Artista: {album.artista}</p>
                        <p>Descrição: {album.descricao}</p>
                        <p>Data de Lançamento: {album.data_lancamento}</p>
                        <p>Gênero: {album.genero}</p>
                        <p>Número de Faixas: {album.qtd_faixas}</p>
                    </div>
                </div>

                <FaixaList albumId={album.id} />
            </div>
        </div>
    );
};

export default AlbumModal;
