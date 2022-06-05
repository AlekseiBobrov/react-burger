import { FC } from 'react'
import { OrderCard } from '../order-card'
import { FEED_DATA } from '../feed/feed-data'
import styles from './orders.module.css'

interface IOrdersProps {

}

const Orders: FC = () => {
    const orderCards = FEED_DATA.orders.slice(0,2).map(order => (
        <OrderCard
          { ...order }
          name="Супер пупер мега"
          key={order.number}
        />
      ))
    return (
        <div className={styles.orders}>
            {orderCards}
        </div>
    )
}

export default Orders