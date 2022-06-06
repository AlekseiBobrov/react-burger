import { FC, useEffect } from 'react'
import { useDispatch, useSelector } from '../utils/hooks';
import { wsConnectionStart, wsConnectionError } from '../services/actions/web-socket'
import FeedOrders from '../components/feed/feed-orders';
import FeedInfo from '../components/feed/feed-info';
import { IOrder } from '../utils/types';

import styles from './feed-page.module.css';

const FeedPage: FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(wsConnectionStart('/orders/all'));

    return () => {
      dispatch(wsConnectionError());
    };
  }, [dispatch]);

  const { messages } = useSelector(state => state.ws);
  const parsing = messages.length > 0?JSON.parse(messages.slice(-1)[0]):null;
  let orders: IOrder[] = [];
  let totalToday: number = 0;
  let total: number = 0;
  if (parsing){
    orders = parsing.orders;
    totalToday = parsing.totalToday;
    total = parsing.total;
  }

  return (
    <>
      <div className={`text text_type_main-large ${styles.title}`}>
        Лента заказов
      </div>
      <main className={styles.main}>
        <FeedOrders orders={orders}/>
        <div className={styles.middle}/>
        <FeedInfo
          orders={orders}
          totalToday = {totalToday}
          total = { total }
        />
      </main>
    </>
  )
}

export default FeedPage