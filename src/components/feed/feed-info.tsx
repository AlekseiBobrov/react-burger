import { FC } from 'react'
import FeedColumns from './feed-columns'
import { IOrder } from '../../utils/types';
import styles from './feed-info.module.css'

interface IFeedInfo {
  orders: IOrder[];
  total: number;
  totalToday: number;
}

const FeedInfo: FC<IFeedInfo> = ({orders, total, totalToday}) => {
  return (
    <div className={styles.container}>
      <div className={styles.lists}>
        <FeedColumns
          title="Готовы"
          orders={orders.filter(order => order.status === 'done').map(order => order.number)}
        />
        <div className={styles.columns_sep} />
        <FeedColumns
          title="В работе"
          orders={orders.filter(order => order.status !== 'done').map(order => order.number)}
        />
      </div>
      <div>
        <p className="text text_type_main-medium">Выполнено за все время:</p>
        <p className="text text_type_digits-large">{total}</p>
      </div>
      <div>
        <p className="text text_type_main-medium">Выполнено за сегодня:</p>
        <p className="text text_type_digits-large">{totalToday}</p>
      </div>
    </div>
  )
}

export default FeedInfo