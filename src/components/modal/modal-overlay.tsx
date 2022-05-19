import React, { FC } from 'react';
import styles from './modal.module.css';

interface ModalOverlayProps {
    closeModal: () => void;
}

const ModalOverlay: FC<ModalOverlayProps> = ( { closeModal, children} ) => {
    const onClickHandler = (e: React.SyntheticEvent) => {
        if (e.target === e.currentTarget){
            closeModal();
        }
    }

    return (
        <div className={styles['modal-overlay']} onClick={onClickHandler}> 
            {children}
        </div>
    )
}

export default ModalOverlay