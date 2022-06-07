import { FC, useState, useEffect } from 'react'
import { useParams } from 'react-router'
import { DateString } from '../date-string'
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import { useSelector, useDispatch } from '../../utils/hooks';
import IngredientInfo from './ingredient-info'
import { wsConnectionStart, wsConnectionClosed } from '../../services/actions/web-socket'
import { IOrder } from '../../utils/types'
import styles from './order-info.module.css';

interface IFeedParams {
  id: string;
}

const OrderInfo: FC = () => {
  const [didInitWS, setDidInitWS] = useState(false);
  const { id } = useParams<IFeedParams>();
  const menu = useSelector(state => state.menu.ingredients);
  const { wsConnected } = useSelector(state => state.ws);
  const { messages } = useSelector(state => state.ws);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!wsConnected) {
      dispatch(wsConnectionStart('/orders/all'))
      setDidInitWS(true);
    };

    return () => {
      if (didInitWS){
        dispatch(wsConnectionClosed());
      }
    };
  }, [dispatch, didInitWS, setDidInitWS]);

  const orders: IOrder[] = messages.length > 0 ? JSON.parse(messages.slice(-1)[0]).orders : [];
  const order = orders.find(el => el.number === Number(id));

  if (order) {

    const { number, createdAt, ingredients, status, name } = order;

    const totalPrice: number = ingredients.reduce((summ, idIngredient) => {
      const ingredient = menu?.find(el => el._id === idIngredient);
      return summ + (ingredient ? ingredient.price : 0);
    }, 0);

    const orderIngredients = Array.from(new Set(ingredients)).map((idIngredient, ix, arr) => {
      const ingredient = menu?.find(el => el._id === idIngredient);
      return (
        <IngredientInfo
          img={ingredient ? ingredient.image_mobile : ''}
          name={ingredient ? ingredient.name : ''}
          price={ingredient ? ingredient.price : undefined}
          count={ingredients.filter(el => el === idIngredient).length}
          key={idIngredient}
        />
      );
    })

    return (
      <div className={styles.order_info}>

        <p className={`text text_type_digits-default ${styles.number}`}>#{number}</p>
        <p className={`text text_type_main-medium ${styles.name}`}>{name} бургер</p>
        <p className={`text text_type_main-default ${styles.status} ${status === 'done' ? styles.done : ''}`}>{status}</p>
        <p className={`text text_type_main-medium ${styles.sostav}`}>Состав:</p>

        <div className={styles.ingredients}>
          {orderIngredients}
        </div>

        <div className={styles.bottom}>
          <DateString sdate={createdAt} />
          <div className={styles.total_price}>
            <p className="text text_type_digits-default">{totalPrice}</p>
            <CurrencyIcon type="primary" />
          </div>
        </div>

      </div>
    )
  } else {
    return null
  }
}

export default OrderInfo