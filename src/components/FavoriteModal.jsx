
import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './FavoriteModal.module.css';

const FavoriteModal = ({ isOpen, onClose }) => {
  const navigate = useNavigate();

  if (!isOpen) return null;

  const handleRegister = () => {
    onClose();
    navigate('/register');
  };

  const handleClose = () => {
    onClose();
  };

  return (
    <div className={styles.modalOverlay} onClick={handleClose}>
      <div className={styles.modalContent} onClick={e => e.stopPropagation()}>
        <div className={styles.modalHeader}>
          <h3>Save to Favorites</h3>
          <button className={styles.closeBtn} onClick={handleClose}>×</button>
        </div>
        
        <div className={styles.modalBody}>
          <p>Please login or register to save properties to your favorites.</p>
        </div>
        
        <div className={styles.modalFooter}>
          <button className={styles.cancelBtn} onClick={handleClose}>
            Cancel
          </button>
          <button className={styles.registerBtn} onClick={handleRegister}>
            Register
          </button>
        </div>
      </div>
    </div>
  );
};

export default FavoriteModal;
