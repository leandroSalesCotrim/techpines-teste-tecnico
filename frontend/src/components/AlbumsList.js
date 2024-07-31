import React, { useEffect, useState } from 'react';
import { getAlbums, deleteAlbums, createFaixa, updateAlbums } from '../services/api';
import AlbumModal from './AlbumModal';
import ConfirmarModal from './ConfirmarModal';
import AddAlbums from './AddAlbums';
import './AlbumsList.css';

const AlbumsList = () => {
    const [albums, setAlbums] = useState([]);
    const [selectedAlbum, setSelectedAlbum] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [editingAlbumId, setEditingAlbumId] = useState(null);
    const [editForm, setEditForm] = useState({
        nome: '',
        artista: '',
        descricao: '',
        data_lancamento: '',
        genero: '',
        qtd_faixas: '',
        capa_url: '',
    });
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [albumToDelete, setAlbumToDelete] = useState(null);
    const [showAddAlbums, setShowAddAlbums] = useState(false);

    const genericImageUrl = 'https://cdn-icons-png.flaticon.com/512/7163/7163433.png';

    useEffect(() => {
        const fetchAlbums = async () => {
            try {
                const response = await getAlbums();
                setAlbums(response.data);
            } catch (error) {
                console.error('Error fetching albums:', error);
            }
        };

        fetchAlbums();
    }, []);

    const handleDelete = async (id) => {
        try {
            await deleteAlbums(id);
            setAlbums(albums.filter(album => album.id !== id));
        } catch (error) {
            console.error('Error deleting album:', error);
        }
    };

    const handleDeleteAlbum = (album) => {
        setAlbumToDelete(album);
        setShowConfirmModal(true);
    };

    const confirmDeleteAlbum = () => {
        handleDelete(albumToDelete.id);
        setShowConfirmModal(false);
        setAlbumToDelete(null);
    };

    const cancelDeleteAlbum = () => {
        setShowConfirmModal(false);
        setAlbumToDelete(null);
    };

    const handleOpenModal = (album) => {
        setSelectedAlbum(album);
    };

    const handleCloseModal = () => {
        setSelectedAlbum(null);
    };

    const handleCreateFaixa = async (albumId, faixa) => {
        try {
            await createFaixa(faixa);

            const updatedAlbums = albums.map(album => {
                if (album.id === albumId) {
                    const updatedFaixa = album.faixa ? [...album.faixa, faixa] : [faixa];
                    return { ...album, faixa: updatedFaixa };
                }
                return album;
            });

            setAlbums(updatedAlbums);
            setSelectedAlbum(null);
        } catch (error) {
            console.error('Error adding faixa:', error);
        }
    };

    const handleEditChange = (e) => {
        const { name, value } = e.target;
        setEditForm(prevForm => ({ ...prevForm, [name]: value }));
    };

    const handleEditSubmit = async (albumId) => {
        try {
            await updateAlbums(albumId, editForm);
            const updatedAlbums = albums.map(album =>
                album.id === albumId ? { ...album, ...editForm } : album
            );
            setAlbums(updatedAlbums);
            setEditingAlbumId(null);
        } catch (error) {
            console.error('Error updating album:', error);
        }
    };

    const handleEditClick = (album) => {
        setEditingAlbumId(album.id);
        setEditForm({
            nome: album.nome,
            artista: album.artista,
            descricao: album.descricao,
            data_lancamento: album.data_lancamento,
            genero: album.genero,
            qtd_faixas: album.qtd_faixas,
            capa_url: album.capa_url,
        });
    };

    const handleCancelEdit = () => {
        setEditingAlbumId(null);
    };

    const filteredAlbums = albums.filter(album =>
        album.nome.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="album-list">
            <h1>Álbuns</h1>
            <div className="search-container">
                <input
                    type="text"
                    placeholder="Pesquisar álbuns..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>
            {filteredAlbums.map(album => (
                <div key={album.id} className="album-item">
                    <img src={album.capa_url || genericImageUrl} alt={album.nome} />
                    <div className="album-info">
                        <h2>{album.nome}</h2>
                        <p>{album.artista}</p>
                        <p>{album.descricao}</p>
                        <p>{album.data_lancamento}</p>
                        <p>{album.genero}</p>
                        <p>{album.qtd_faixas} faixas</p>
                    </div>
                    <div className="album-actions">
                        <button onClick={() => handleOpenModal(album)}>Ver Faixas</button>
                        <button onClick={() => handleEditClick(album)}>Editar</button>
                        <button onClick={() => handleDeleteAlbum(album)}>Excluir</button>
                    </div>
                    {editingAlbumId === album.id && (
                        <div className="edit-form">
                            <div className="input-row">
                                <input
                                    type="text"
                                    name="nome"
                                    value={editForm.nome}
                                    onChange={handleEditChange}
                                    placeholder="Nome"
                                />
                                <input
                                    type="text"
                                    name="artista"
                                    value={editForm.artista}
                                    onChange={handleEditChange}
                                    placeholder="Artista"
                                />
                                <input
                                    type="text"
                                    name="descricao"
                                    value={editForm.descricao}
                                    onChange={handleEditChange}
                                    placeholder="Descrição"
                                />
                            </div>
                            <div className="input-row">
                                <input
                                    type="date"
                                    name="data_lancamento"
                                    value={editForm.data_lancamento}
                                    onChange={handleEditChange}
                                />
                                <input
                                    type="text"
                                    name="genero"
                                    value={editForm.genero}
                                    onChange={handleEditChange}
                                    placeholder="Gênero"
                                />
                                <input
                                    type="number"
                                    name="qtd_faixas"
                                    value={editForm.qtd_faixas}
                                    onChange={handleEditChange}
                                    placeholder="Qtd. Faixas"
                                />
                                <input
                                    type="text"
                                    name="capa_url"
                                    value={editForm.capa_url}
                                    onChange={handleEditChange}
                                    placeholder="URL da Capa"
                                />
                            </div>
                                
                            <button onClick={() => handleEditSubmit(album.id)}>Salvar</button>
                            <button onClick={handleCancelEdit}>Cancelar</button>
                        </div>
                    )}
                </div>
            ))}
            {selectedAlbum && (
                <AlbumModal
                    album={selectedAlbum}
                    onClose={handleCloseModal}
                    onCreateFaixa={handleCreateFaixa}
                />
            )}
            {showConfirmModal && (
                <ConfirmarModal
                    onConfirm={confirmDeleteAlbum}
                    onCancel={cancelDeleteAlbum}
                />
            )}
            <button className="add-album-button" onClick={() => setShowAddAlbums(true)}>
                +
            </button>
            {showAddAlbums && <AddAlbums onClose={() => setShowAddAlbums(false)} />}
        </div>
    );
};

export default AlbumsList;
