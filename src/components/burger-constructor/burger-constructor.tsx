import React, {useCallback} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useDrop } from "react-dnd";
import { v4 as uuid } from 'uuid';

import BunIngredient from './bun-ingredient';
import MiddleIngredient from './middle-ingredient';
import Modal from '../modal/modal';
import {Ordering, OrderDetails} from '../order-details';
import { CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import type { IngredientShape } from '../../utils/types.js'
import { getOrder } from '../../services/actions/order';
import { ADD_INGREDIENT, UPDATE_CART } from '../../services/actions/cart';

import styles from './burger-constructor.module.css';

type BunType = "top" | "bottom";

const BurgerConstructor = () => {
  const dispatch = useDispatch();
  const { ingredients } = useSelector((state: any) => state.menu);
  const { cart } = useSelector((state: any) => state);
  const { orderRequest, orderNumber } = useSelector((state: any) => state.order);

  const [showDetails, setShowDetails] = React.useState(false);

  const [{ isHover }, dropTarget] = useDrop({
    accept: "ingredient",
    collect: monitor => ({
      isHover: monitor.isOver(),
    }),
    drop(itemId: any) {
      const ingredient = ingredients.find((ingr: IngredientShape) => ingr._id === itemId.id);
      dispatch({
        type: ADD_INGREDIENT,
        ingredient
      })
    },
  });

  const borderColor = isHover ? 'lightgreen' : 'transparent';

  React.useEffect(
    () => {
      if (orderRequest || orderNumber) {
        setShowDetails(true);
      }
    },
    [orderRequest, orderNumber]
  );

  const moveCard = useCallback((dragIndex, hoverIndex) => {
    const dragCard = cart['middle'][dragIndex];
    const middle = [...cart.middle];

    middle.splice(dragIndex, 1)
    middle.splice(hoverIndex, 0, dragCard)

    dispatch({
      type: UPDATE_CART,
      middle,
    })
  }, [cart, dispatch]);


  const handelButtonClick = () => {
    dispatch(getOrder([...cart.buns, ...cart.middle]))
  }

  const hideDetails = () => {
    setShowDetails(false);
  }

  if (ingredients) {
    var bunIngrediets;

    if (cart.buns.length) {
      const bun = ingredients.find((el: IngredientShape) => el._id === cart.buns[0]);
      if (bun) {
        bunIngrediets = cart.buns.map(
          (id: string, i: number) => {
            const bType = (i ? "bottom" : "top") as BunType;
            return (
              <BunIngredient
                {...bun}
                bunType={bType}
                key={bType}
              />
            )
          }
        )
      }
    }

    const middleIngredients = cart.middle.map(
      (id: string, i: number) => {
        const TEMPLATE = { _id: null, name: null, image: null, price: null };
        const ingredient = ingredients.find((ingr: IngredientShape) => ingr._id === id);
        const { _id } = ingredient ? ingredient : TEMPLATE;

        if (_id) {
          let id = uuid();
          return (
            <MiddleIngredient
              id={id}
              {...ingredient}
              isLocked={false}
              orderIndex={i}
              moveCard={moveCard}
              key={id}
            />
          )
        } else {
          return null;
        }
      })

    const total = [...cart.buns, ...cart.middle].map(
      id => {
        const ingredient = ingredients.find((item: IngredientShape) => item._id === id);
        return ingredient ? ingredient.price : 0
      }).reduce((sum, el) => sum + el, 0);

    return (
      <div className={styles['burger-constructor']}>
        {showDetails &&
          <Modal closeModal={hideDetails} className={styles["order-details"]}>
            {orderRequest?<Ordering/>:<OrderDetails orderNum={orderNumber} />}
          </Modal>}
        <div className={styles.list} ref={dropTarget} style={{ borderColor }}>
          {bunIngrediets && bunIngrediets[0]}
          <div className={styles.middle}  > {/* ref={dropOrderTarget} */}
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