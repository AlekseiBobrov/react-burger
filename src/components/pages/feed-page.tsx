import { FC } from 'react'
import FeedOrders from '../feed/feed-orders';
import FeedInfo from '../feed/feed-info';

import styles from './feed-page.module.css';

const FeedPage: FC = () => {
  return (
    <>
      <div className={`text text_type_main-large ${styles.title}`}>
        Лента заказов
      </div>
      <main className={styles.main}>
        <FeedOrders />
        <div className={styles.middle}/>
        <FeedInfo />
      </main>
    </>
  )
}

export default FeedPage