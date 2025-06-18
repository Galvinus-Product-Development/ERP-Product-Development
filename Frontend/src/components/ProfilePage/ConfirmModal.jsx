// components/ConfirmModal.jsx
import './ConfirmModal.css';

const ConfirmModal = ({ isOpen, title, message, onConfirm, onCancel }) => {
    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h3>{title}</h3>
                <p>{message}</p>
                <div className="modal-actions">
                <button onClick={onConfirm} className="delete-btn">Confirm</button>
                <button onClick={onCancel} className="cancel-btn">Cancel</button>
                    
                </div>
            </div>
        </div>
    );
};

export default ConfirmModal;
