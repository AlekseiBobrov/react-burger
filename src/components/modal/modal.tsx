import React, { FC } from 'react';
import ReactDOM from 'react-dom';

import ModalOverlay from '../modal/modal-overlay'
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';

import styles from './modal.module.css';

interface ModalProps {
  className: string;
  closeModal: () => void;
}

const Modal: FC<ModalProps> = ({closeModal, className, children}) => {
  const escListner = (e: KeyboardEvent) => {
    if (e.key === "Escape") {
      closeModal()
    }
  }

  React.useEffect(
    () => {
      document.addEventListener('keydown', escListner)
      return () => {
        document.removeEventListener('keydown', escListner)
      }
    },
    []
  )

  const modal = (
    <ModalOverlay closeModal={closeModal}>
      <div className={`${styles.modal} ${className}`} >
        <div onClick={closeModal} className={styles['modal-close']}>
          <CloseIcon type="primary"/>
        </div>
        {children}
      </div>
    </ModalOverlay>
  )
  
  const modalRoot = document.getElementById('modal-root');

  return (
    modalRoot ? ReactDOM.createPortal(modal, modalRoot) : null
  )
}

export default Modal