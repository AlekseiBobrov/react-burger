import React from 'react';

import { IngredientsContext } from '../../services/appContext'

import ConstructorIngredient from './constructor-ingredint';
import Modal from '../modal/modal';
import OrderDetails from '../order-details/order-details';
import { CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import type { CartType } from '../../utils/types.js'

import styles from './burger-constructor.module.css';

import { getOrder } from '../../utils/api'
// import { getOrder } from '../../utils/fake-api' //fakeAPI for test without internet

interface BurgerConstructorProps {
  cart: CartType,
  setCart: (newCart: CartType) => void,
}

type BunType = "top" | "bottom" | undefined;

const BurgerConstructor = (props: BurgerConstructorProps) => {
  const { ingredients } = React.useContext(IngredientsContext);
  const [showDetails, setShowDetails] = React.useState(false);
  const [order, setOrder] =  React.useState(null);

  const handelButtonClick = () => {
    getOrder([...props.cart.buns, ...props.cart.middle])
    .then((number) => {
      setOrder(number);
      setShowDetails(true);
    })
    .catch((error) => {
      console.log('order api error:', error)
    })
    
  }

  const hideDetails = () => {
    setShowDetails(false);
  }

  if (ingredients) {
    var bunIngrediets;

    if (props.cart.buns.length) {
      const bun = ingredients.find(el => el._id === props.cart.buns[0]);
      if (bun) {
        bunIngrediets = props.cart.buns.map(
          (id, i) => {
            const bType = (i ? "bottom" : "top") as BunType;
            return (
            <ConstructorIngredient
              _id={id}
              name={bun.name}
              image={bun.image}
              price={bun.price}
              type={bType}
              isLocked={true}
              key={i}
            />
            )
          }
        )
      }
    }

    const middleIngredients = props.cart.middle.map(
      (el, i, arr) => {
        const TEMPLATE = { _id: null, name: null, image: null, price: null };
        const ingredient = ingredients.find(ingr => ingr._id === el);
        const { _id, name, image, price } = ingredient ? ingredient : TEMPLATE;

        if (_id) {
          return (
            <ConstructorIngredient
              _id={_id}
              name={name}
              image={image}
              price={price}
              isLocked={false}
              key={i}
            />
          )
        } else {
          return null;
        }
      })

    const total = [...props.cart.buns, ...props.cart.middle].map(
      el => {
        const ingredient = ingredients.find(item => item._id === el);
        return ingredient ? ingredient.price : 0
      }).reduce((sum, el) => sum + el, 0);

    return (
      <div className={styles['burger-constructor']}>
        {showDetails && 
        <Modal closeModal={hideDetails} className={styles["order-details"]}>
          <OrderDetails orderNum={order} />
        </Modal>}
        <div className={styles.list}>
          {bunIngrediets && bunIngrediets[0]}
          <div className={styles.middle}>
            {middleIngredients}
          </div>
          {bunIngrediets && bunIngrediets[1]}
        </div>

        <div className={styles.checkout}>
          <Button type="primary" size="medium" onClick={handelButtonClick}>
            Оформить заказ
          </Button>
          <div className="text text_type_digits-medium">
            {total}
            <CurrencyIcon type="primary" />
          </div>
        </div>

      </div>

    );
  } else {
    return null
  }
}

export default BurgerConstructor;