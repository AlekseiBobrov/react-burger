import React from 'react';
import styles from './modal.module.css';
import {} from '@ya.praktikum/react-developer-burger-ui-components';


interface ModalOverlayProps {
    children:any
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