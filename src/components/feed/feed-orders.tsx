import { FC } from 'react'
import { OrderCard } from '../order-card';
import styles from './feed-orders.module.css'
import { FEED_DATA } from "./feed-data";

const FeedOrders: FC = () => {
  const orderCards = FEED_DATA.orders.map(order => (
    <OrderCard
      { ...order }
      name="Супер пупер мега"
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