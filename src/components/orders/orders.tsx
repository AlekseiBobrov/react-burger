import { FC, useEffect } from 'react'
import { useDispatch, useSelector } from '../../utils/hooks';
import { wsConnectionStart, wsConnectionError } from '../../services/actions/web-socket'
import { getCookie } from '../../utils';
import { OrderCard } from '../order-card'
import { IOrder } from '../../utils/types';
import styles from './orders.module.css'

interface IOrdersProps {

}

const Orders: FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const accessToken = getCookie("accessToken");

    if (!accessToken) {
      return;
    }

    dispatch(wsConnectionStart(`/orders?token=${accessToken}`));

    return () => {
      dispatch(wsConnectionError());
    };
  }, [dispatch]);

  const { messages } = useSelector(state => state.ws);

  if (messages.length > 0){
    const orders = JSON.parse(messages.slice(-1)[0]).orders as IOrder[];
    const orderCards = orders?.map( order => (
      <OrderCard
        {...order}
        name={order.name}
        key={order.number}
      />
    ))
  
    return (
      <div className={styles.orders}>
        {orderCards}
      </div>
    )
  } else {
    return <div className={styles.orders}/>
  }
}

export default Orders