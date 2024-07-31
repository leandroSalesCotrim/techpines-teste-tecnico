import React, { useState, useEffect } from 'react';
import './AlbumModal.css';
import { getFaixas, deleteFaixas, updateFaixas } from '../services/api';
import ConfirmarModal from './ConfirmarModal'; // Importar o componente de modal de confirmação

const AlbumModal = ({ album, onClose, onAddFaixa }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [faixaNome, setFaixaNome] = useState('');
    const [faixaDescricao, setFaixaDescricao] = useState('');
    const [faixaArtista, setFaixaArtista] = useState('');
    const [faixaNumero, setFaixaNumero] = useState('');
    const [faixaDuracao, setFaixaDuracao] = useState('');
    const [faixas, setFaixas] = useState([]);
    const [editFaixaId, setEditFaixaId] = useState(null);
    const genericImageUrl = 'https://cdn-icons-png.flaticon.com/512/7163/7163433.png';
    const [showConfirmarModal, setShowConfirmarModal] = useState(false);
    const [faixaToDelete, setFaixaToDelete] = useState(null);

    useEffect(() => {
        const fetchFaixas = async () => {
            try {
                const response = await getFaixas();
                setFaixas(response.data);
            } catch (error) {
                console.error('Error fetching faixas:', error);
            }
        };

        fetchFaixas();
    }, []);

    const handleAddFaixa = (e) => {
        e.preventDefault();
        onAddFaixa(album.id, {
            nome: faixaNome,
            descricao: faixaDescricao,
            artista: faixaArtista,
            num_faixa: parseInt(faixaNumero, 10),
            albums_id: album.id,
            duracao: parseFloat(faixaDuracao),
        });
        setFaixaNome('');
        setFaixaDescricao('');
        setFaixaArtista('');
        setFaixaNumero('');
        setFaixaDuracao('');
    };

    const handleEditFaixa = (faixa) => {
        setEditFaixaId(faixa.id);
        setFaixaNome(faixa.nome);
        setFaixaDescricao(faixa.descricao);
        setFaixaArtista(faixa.artista);
        setFaixaNumero(faixa.num_faixa.toString());
        setFaixaDuracao(faixa.duracao.toString());
    };

    const handleDeleteFaixa = (faixa) => {
        setFaixaToDelete(faixa);
        setShowConfirmarModal(true);
    };

    const confirmarDeleteFaixa = async () => {
        setShowConfirmarModal(false);
        try {
            await deleteFaixas(faixaToDelete.id);
            setFaixas(faixas.filter(faixa => faixa.id !== faixaToDelete.id));
            setFaixaToDelete(null);
        } catch (error) {
            console.error('Error deleting faixa:', error);
        }
    };

    const cancelDeleteFaixa = () => {
        setShowConfirmarModal(false);
        setFaixaToDelete(null);
    };

    const handleSaveFaixa = async (e) => {
        e.preventDefault();
        try {
            await updateFaixas(editFaixaId, {
                nome: faixaNome,
                descricao: faixaDescricao,
                artista: faixaArtista,
                num_faixa: parseInt(faixaNumero, 10),
                duracao: parseFloat(faixaDuracao),
            });
            setFaixas((prevFaixas) =>
                prevFaixas.map((faixa) =>
                    faixa.id === editFaixaId ? { ...faixa, nome: faixaNome, descricao: faixaDescricao, artista: faixaArtista, num_faixa: parseInt(faixaNumero, 10), duracao: parseFloat(faixaDuracao) } : faixa
                )
            );
            setEditFaixaId(null);
            setFaixaNome('');
            setFaixaDescricao('');
            setFaixaArtista('');
            setFaixaNumero('');
            setFaixaDuracao('');
        } catch (error) {
            console.error('Error updating faixa:', error);
        }
    };

    const handleCancelEdit = () => {
        setEditFaixaId(null);
        setFaixaNome('');
        setFaixaDescricao('');
        setFaixaArtista('');
        setFaixaNumero('');
        setFaixaDuracao('');
    };

    if (!album) return null;

    const filteredFaixas = faixas.filter(faixa =>
        faixa.albums_id === album.id &&
        faixa.nome.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="modal">
            <div className="modal-content">
                <span className="close" onClick={onClose}>&times;</span>
                <img
                    src={album.capa_url || genericImageUrl}
                    alt={`Capa do álbum ${album.nome}`}
                    style={{ width: '200px', height: '200px' }}
                />
                <h2>{album.nome}</h2>
                <p>Artista: {album.artista}</p>
                <p>Descrição: {album.descricao}</p>
                <p>Data de Lançamento: {album.data_lancamento}</p>
                <p>Gênero: {album.genero}</p>
                <p>Número de Faixas: {album.qtd_faixas}</p>

                <h3>Faixas</h3>
                <input
                    type="text"
                    placeholder="Pesquisar Faixas..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <div className="faixas-list">
                    {filteredFaixas.length > 0 ? (
                        <ul>
                            {filteredFaixas.map(faixa => (
                                <li key={faixa.id}>
                                    {editFaixaId === faixa.id ? (
                                        <form onSubmit={handleSaveFaixa}>
                                            <input
                                                type="text"
                                                value={faixaNome}
                                                onChange={(e) => setFaixaNome(e.target.value)}
                                                required
                                            />
                                            <input
                                                type="text"
                                                value={faixaDescricao}
                                                onChange={(e) => setFaixaDescricao(e.target.value)}
                                            />
                                            <input
                                                type="text"
                                                value={faixaArtista}
                                                onChange={(e) => setFaixaArtista(e.target.value)}
                                                required
                                            />
                                            <input
                                                type="number"
                                                value={faixaNumero}
                                                onChange={(e) => setFaixaNumero(e.target.value)}
                                                required
                                            />
                                            <input
                                                type="text"
                                                value={faixaDuracao}
                                                onChange={(e) => setFaixaDuracao(e.target.value)}
                                                required
                                            />
                                            <button type="submit">Salvar</button>
                                            <button type="button" onClick={handleCancelEdit}>Cancelar</button>
                                        </form>
                                    ) : (
                                        <>
                                            {faixa.nome} - {faixa.artista} - {faixa.descricao} - {faixa.num_faixa} - ({faixa.duracao} min)
                                            <button onClick={() => handleEditFaixa(faixa)}>Editar</button>
                                            <button onClick={() => handleDeleteFaixa(faixa)}>Excluir</button>
                                        </>
                                    )}
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>Não há faixas correspondentes ao termo de pesquisa.</p>
                    )}
                </div>

                <h3>Adicionar Faixa</h3>
                <form onSubmit={handleAddFaixa}>
                    <input
                        type="text"
                        placeholder="Nome da Faixa"
                        value={faixaNome}
                        onChange={(e) => setFaixaNome(e.target.value)}
                        required
                    />
                    <input
                        type="text"
                        placeholder="Descrição da Faixa"
                        value={faixaDescricao}
                        onChange={(e) => setFaixaDescricao(e.target.value)}
                    />
                    <input
                        type="text"
                        placeholder="Artista"
                        value={faixaArtista}
                        onChange={(e) => setFaixaArtista(e.target.value)}
                        required
                    />
                    <input
                        type="number"
                        placeholder="Número da Faixa"
                        value={faixaNumero}
                        onChange={(e) => setFaixaNumero(e.target.value)}
                        required
                    />
                    <input
                        type="text"
                        placeholder="Duração (em minutos)"
                        value={faixaDuracao}
                        onChange={(e) => setFaixaDuracao(e.target.value)}
                        required
                    />
                    <button type="submit">Adicionar Faixa</button>
                </form>
            </div>
            <ConfirmarModal
                show={showConfirmarModal}
                onConfirm={confirmarDeleteFaixa}
                onCancel={cancelDeleteFaixa}
            />
        </div>
    );
};

export default AlbumModal;
