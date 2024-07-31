import React from 'react';
import './ConfirmarModal.css';

const ConfirmarModal = ({  onConfirm, onCancel }) => {


    return (
        <div className="confirmar-modal">
            <div className="confirmar-modal-content">
                <h2>Confirmar Exclusão</h2>
                <p>Tem certeza de que deseja excluir esta faixa?</p>
                <div className='confirmar-modal-buttons'>
                    <button onClick={onConfirm}>Sim</button>
                    <button onClick={onCancel}>Não</button>
                </div>

            </div>
        </div>
    );
};

export default ConfirmarModal;


