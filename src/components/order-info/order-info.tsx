import { FC } from 'react'
import { useParams } from 'react-router'
import DateString from '../feed/date-string'
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import { useSelector } from '../../utils/hooks';
import IngredientInfo from './ingredient-info'
import { RootState, IngredientShape } from '../../utils/types'
import styles from './order-info.module.css'
import { FEED_DATA } from "../feed/feed-data";

interface IFeedParams{
  id: string;
}

const OrderInfo: FC = () => {
  const { id } = useParams<IFeedParams>();
  const menu = useSelector((state: RootState) => state.menu.ingredients);
  const order = FEED_DATA.orders.find( el => el.number === Number(id) );
  

  if (order){
    
    const { number, createdAt, ingredients, status} = order;
    const name  = "Супер Пупер Мега";

    const totalPrice: number = ingredients.reduce((summ, idIngredient) => {
      const ingredient = menu?.find((el: IngredientShape) => el._id === idIngredient);
      return summ + (ingredient ? ingredient.price : 0);
    }, 0);

    const orderIngredients = Array.from(new Set(ingredients)).map((idIngredient, ix, arr) => {
      const ingredient = menu?.find((el: IngredientShape) => el._id === idIngredient);
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
        <p className={`text text_type_main-default ${styles.status} ${status==='done'?styles.done:''}`}>{status}</p>
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