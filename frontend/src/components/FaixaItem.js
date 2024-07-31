import React, { useState } from 'react';
import { deleteFaixas, updateFaixas } from '../services/api';
import ConfirmarModal from './ConfirmarModal';

const FaixaItem = ({ faixa, setFaixas }) => {
    const [editFaixaId, setEditFaixaId] = useState(null);
    const [faixaNome, setFaixaNome] = useState('');
    const [faixaDescricao, setFaixaDescricao] = useState('');
    const [faixaArtista, setFaixaArtista] = useState('');
    const [faixaNumero, setFaixaNumero] = useState('');
    const [faixaDuracao, setFaixaDuracao] = useState('');
    const [showConfirmarModal, setShowConfirmarModal] = useState(false);
    const [faixaToDelete, setFaixaToDelete] = useState(null);

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
            setFaixas(prevFaixas => prevFaixas.filter(f => f.id !== faixaToDelete.id));
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
                    faixa.id === editFaixaId
                        ? {
                            ...faixa,
                            nome: faixaNome,
                            descricao: faixaDescricao,
                            artista: faixaArtista,
                            num_faixa: parseInt(faixaNumero, 10),
                            duracao: parseFloat(faixaDuracao),
                        }
                        : faixa
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

    return (
        <li>
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
                <div>
                    <span>{faixa.nome}</span>
                    <span>{faixa.descricao}</span>
                    <span>{faixa.artista}</span>
                    <span>{faixa.num_faixa}</span>
                    <span>{faixa.duracao}</span>
                    <div className='faixas-btns'>
                        <button onClick={() => handleEditFaixa(faixa)}>Editar</button>
                        <button onClick={() => handleDeleteFaixa(faixa)}>Excluir</button>
                    </div>

                </div>
            )}

            {showConfirmarModal && (
                <ConfirmarModal
                    onConfirm={confirmarDeleteFaixa}
                    onCancel={cancelDeleteFaixa}
                />
            )}
        </li>
    );
};

export default FaixaItem;
