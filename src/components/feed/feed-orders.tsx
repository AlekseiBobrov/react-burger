import { FC } from 'react'
import { OrderCard } from '../order-card';
import { IOrder } from '../../utils/types';
import styles from './feed-orders.module.css'

interface IFeedOrders {
  orders: IOrder[];
}

const FeedOrders: FC<IFeedOrders> = ({ orders }) => {

  const orderCards = orders.map(order => (
    <OrderCard
      {...order}
      name={order.name}
      key={order.number}
    />
  ))

  return (
    <div className={styles.container}>
      {orderCards}
    </div>
  )

}

export default FeedOrders