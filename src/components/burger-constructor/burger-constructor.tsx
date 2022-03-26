import React from 'react';
import styles from './burger-constructor.module.css';
import ConstructorIngredient from './constructor-ingredint'
import OrderDetails from '../order-details/order-details';
import { CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import type { IngredientShape } from '../../utils/types.js'
interface BurgerConstructorProps{
  cart: IngredientShape[],
  setCart: (newCart: IngredientShape[]|[]) => void,
}

type Type = "top" | "bottom" | undefined;

const BurgerConstructor = (props: BurgerConstructorProps) => {
  const [showDetails, setShowDetails] = React.useState(false);

  const handelButtonClick = () => {
    setShowDetails(true);
  }

  const hideDetails = () => {
    setShowDetails(false);
  }

  const removeFromCart = (removeEl: IngredientShape) => { 
    let newCart = props.cart.slice();
    let removeIndex = newCart.findIndex( el => el._id === removeEl._id)
    newCart.splice(removeIndex, 1)
    props.setCart(newCart);
  }

  const ingredients = props.cart.map(
    (el, i, arr) => {
        const { _id, name, image, price, ...otherProps} = el;
        let type;
        let isLocked = false;
        if (i === 0 || i === arr.length - 1){
          type = i?"bottom":"top" as Type;
          isLocked = i?true:false;
        }
        return (
        <ConstructorIngredient
          _id={_id}
          name={name}
          image={image}
          price={price}
          type={type}
          isLocked={isLocked}
          key={i}
        />
        )
  })

  const SUM = props.cart.map( el => el.price ).reduce( (sum, el) => sum + el, 0);
  return (
    <div className={styles['burger-constructor']}>
      <OrderDetails
        isShow={showDetails}
        hideDetails={hideDetails}
        order_num="034536"
      />
      <div className={styles.list}>
        {ingredients[0]}
        <div className={styles.middle}>
          {ingredients.slice(1, -1)}
        </div>
        {ingredients.slice(-1)[0]}
      </div>

      <div className={styles.checkout}>
        <Button type="primary" size="medium" onClick={handelButtonClick}>
          Оформить заказ
        </Button>
        <div className="text text_type_digits-medium">
          {SUM}
          <CurrencyIcon type="primary" />
        </div>
      </div>

    </div>

  );
}

export default BurgerConstructor;