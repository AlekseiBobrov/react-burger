import React from 'react';
import ReactDOM from 'react-dom';

import ModalOverlay from '../modal/modal-overlay'
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';

import styles from './modal.module.css';

interface ModalProps {
  isShow: boolean;
  className: string;
  closeModal: () => void;
  children: React.ReactNode;
}

const Modal = (props: ModalProps) => {
  const escListner = (e: KeyboardEvent) => {
    if (e.key === "Escape") {
      props.closeModal()
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
    <ModalOverlay closeModal={props.closeModal}>
      <div className={`${styles.modal} ${props.className}`} >
        <div onClick={props.closeModal} className={styles['modal-close']}>
          <CloseIcon type="primary"/>
        </div>
        {props.children}
      </div>
    </ModalOverlay>
  )
  
  const modalRoot = document.getElementById('modal-root');

  return (
    props.isShow && modalRoot ? ReactDOM.createPortal(modal, modalRoot) : null
  )
}

export default Modal