import { FC } from 'react'
import FeedColumns from './feed-columns'
import styles from './feed-info.module.css'

import { FEED_DATA } from "./feed-data";

const FeedInfo: FC = () => {
  return (
    <div className={styles.container}>
      <div className={styles.lists}>
        <FeedColumns
          title="Готовы"
          orders={FEED_DATA.orders.filter(order => order.status === 'done').map(order => order.number)}
        />
        <div className={styles.columns_sep} />
        <FeedColumns
          title="В работе"
          orders={FEED_DATA.orders.filter(order => order.status !== 'done').map(order => order.number)}
        />
      </div>
      <div>
        <p className="text text_type_main-medium">Выполнено за все время:</p>
        <p className="text text_type_digits-large">{FEED_DATA.total}</p>
      </div>
      <div>
        <p className="text text_type_main-medium">Выполнено за сегодня:</p>
        <p className="text text_type_digits-large">{FEED_DATA.totalToday}</p>
      </div>
    </div>
  )
}

export default FeedInfo