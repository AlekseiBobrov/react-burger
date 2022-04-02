import Modal from '../modal/modal';
import OrderConfirmImg from './order_confirm_img';

import styles from './order-details.module.css';

interface OrderDetailsProps {
  isShow: boolean,
  hideDetails: () => void,
  orderNum: number | null,
}

const OrderDetails = (props: OrderDetailsProps) => {

  return (
    <Modal isShow={props.isShow} closeModal={props.hideDetails} className={styles["order-details"]}>
      <div className={styles.order}>
        <p className="text text_type_digits-medium">{props.orderNum}</p>
        <p className="text text_type_main-medium">идентификатор заказа</p>
        <OrderConfirmImg />
        <div className={styles.footer}>
          <p className="text text_type_main-default">Ваш заказ начали готовить</p>
          <p className="text text_type_main-default text_color_inactive">Дождитесь готовности на орбитальной станции</p>
        </div>
      </div>
    </Modal>
  )
}

export default OrderDetails;