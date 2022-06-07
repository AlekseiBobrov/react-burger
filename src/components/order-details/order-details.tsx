import { FC } from 'react'
import OrderConfirmImg from './order_confirm_img';

import styles from './order-details.module.css';

interface OrderDetailsProps {
  orderNum: number | undefined,
}

const OrderDetails: FC<OrderDetailsProps> = ({orderNum}) => {

  return (
    <>
      <div className={styles.order}>
        <p className="text text_type_digits-large">{orderNum}</p>
        <p className="text text_type_main-medium">идентификатор заказа</p>
        <OrderConfirmImg />
        <div className={styles.footer}>
          <p className="text text_type_main-default">Ваш заказ начали готовить</p>
          <p className="text text_type_main-default text_color_inactive">Дождитесь готовности на орбитальной станции</p>
        </div>
      </div>
    </>
  )
}

export default OrderDetails;