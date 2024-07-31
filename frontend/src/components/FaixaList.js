import React, { useState, useEffect } from 'react';
import { getFaixas } from '../services/api';
import FaixaItem from './FaixaItem';
import AddFaixa from './AddFaixa'; // Importe o componente AddFaixa
import './FaixaList.css';

const FaixaList = ({ albumId }) => {
    const [faixas, setFaixas] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [showAddFaixaForm, setShowAddFaixaForm] = useState(false);

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

    const filteredFaixas = faixas.filter(faixa =>
        faixa.albums_id === albumId && // Ajustado para usar albums_id
        faixa.nome.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div>
            <h1>Faixas</h1>
            <div className="faixa-header">
                <div className="album-info">
                    <input
                        type="text"
                        placeholder="Pesquisar Faixas..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <button
                        className="add-faixa-button"
                        onClick={() => setShowAddFaixaForm(!showAddFaixaForm)}
                    >
                        {showAddFaixaForm ? '-' : '+'}
                    </button>
                </div>
                {showAddFaixaForm && <AddFaixa albumId={albumId} />}
            </div>
            <div className="faixas-list">
                {filteredFaixas.length > 0 ? (
                    <ul>
                        {filteredFaixas.map(faixa => (
                            <FaixaItem key={faixa.id} faixa={faixa} setFaixas={setFaixas} />
                        ))}
                    </ul>
                ) : (
                    <p>Não há faixas correspondentes ao termo de pesquisa.</p>
                )}
            </div>
        </div>
    );
};

export default FaixaList;
