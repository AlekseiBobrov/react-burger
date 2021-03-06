import { FC } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useSelector } from '../../utils/hooks';
import IngredientIcon from './ingredient-icon'
import { DateString } from '../date-string'
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './order-card.module.css'

interface IOrderCardProp {
  ingredients: string[];
  _id: string;
  status: string;
  number: number;
  createdAt: string;
  updatedAt: string;
  name: string;
}

const OrderCard: FC<IOrderCardProp> = (props) => {
  const location = useLocation();
  const { ingredients } = useSelector(state => state.menu);

  const totalPrice: number = props.ingredients.reduce((summ, id) => {
    const ingredient = ingredients?.find( el => el._id === id);
    return summ + (ingredient ? ingredient.price : 0);
  }, 0)

  const icons = Array.from(new Set(props.ingredients)).map((id, ix, arr) => {
    const ingredient = ingredients?.find( el => el._id === id);
    return (
      <IngredientIcon
        img={ingredient ? ingredient.image_mobile : ''}
        count={props.ingredients.filter(el => el === id).length}
        zIndex={arr.length - ix}
        key={id}
      />
    );
  })

  return (
    <Link
      className={styles['order-card']}
      to={{
        pathname: `${window.location.pathname}/${props.number}`,
        state: { background: location },
      }}
    >
      <div className={styles.first}>
        <p className="text text_type_digits-default">#{props.number}</p>
        <DateString sdate={props.createdAt} />
      </div>
      <div className={styles.second}>
        <p className="text text_type_main-medium">
          {props.name} бургер
        </p>
        <p className="text text_type_main-default">
          {props.status}
        </p>
      </div>
      <div className={styles.third}>
        <div className={styles.icons}>{icons}</div>
        <div className={styles.price}>
          <p className="text text_type_digits-default">{totalPrice}</p>
          <CurrencyIcon type="primary" />
        </div>
      </div>

    </Link>
  )
}

export default OrderCard