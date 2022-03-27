import React from 'react';
import styles from './modal.module.css';

interface ModalOverlayProps {
    children: React.ReactNode;
    closeModal: () => void;
}

const ModalOverlay = (props: ModalOverlayProps) => {
    const closeModal = (e: React.SyntheticEvent) => {
        if (e.target === e.currentTarget){
            props.closeModal()
        }
    }

    return (
        <div className={styles['modal-overlay']} onClick={closeModal}> 
            {props.children}
        </div>
    )
}

export default ModalOverlay