import ReactDOM from 'react-dom';
import styles from './order-details.module.css';

import Modal from '../modal/modal'
import ModalOverlay from '../modal/modal-overlay'
import OrderConfirmImg from './order_confirm_img'

interface OrderDetailsProps {
  isShow: boolean,
  hideDetails: () => void,
  order_num: string,
}

const OrderDetails = (props: OrderDetailsProps) => {

  const modal = (
    <ModalOverlay closeModal={props.hideDetails}>
      <Modal closeModal={props.hideDetails} width={500} height={500}>
        <div className={styles.order}>
          <p className="text text_type_digits-medium">{props.order_num}</p>
          <p className="text text_type_main-medium">идентификатор заказа</p>
          <OrderConfirmImg/>
          <div className={styles.footer}>
            <p className="text text_type_main-default">Ваш заказ начали готовить</p>
            <p className="text text_type_main-default text_color_inactive">Дождитесь готовности на орбитальной станции</p>
          </div>
        </div>
      </Modal>
    </ModalOverlay>
  )
  return props.isShow ? ReactDOM.createPortal(modal, document.body) : null;
}

export default OrderDetails;