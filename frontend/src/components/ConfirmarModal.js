import React from 'react';
import './ConfirmarModal.css';

const ConfirmarModal = ({ show, onConfirm, onCancel }) => {
    if (!show) {
        return null;
    }

    return (
        <div className="confirm-modal">
            <div className="confirm-modal-content">
                <p>Tem certeza que deseja excluir esta faixa?</p>
                <button onClick={onConfirm}>Confirmar</button>
                <button onClick={onCancel}>Cancelar</button>
            </div>
        </div>
    );
};

export default ConfirmarModal;
