import React, { useCallback, FC } from 'react';
import { useDispatch, useSelector } from '../../utils/hooks';
import { useDrop } from "react-dnd";
import { useHistory } from 'react-router-dom';

import BunIngredient from './bun-ingredient';
import MiddleIngredient from './middle-ingredient';
import Modal from '../modal/modal';
import { Ordering, OrderDetails } from '../order-details';
import { CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { getOrder, getOrderResetAction } from '../../services/actions/order';
import { addIngredient, updateCart } from '../../services/actions/cart';
import type { IngredientShape, BunType } from '../../utils/types.js'

import styles from './burger-constructor.module.css';



const BurgerConstructor: FC = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const isAuth = useSelector(state => state.auth.isAuth)
  const { cart } = useSelector(state => state);
  const { orderRequest, orderNumber } = useSelector(state => state.order);

  const [showDetails, setShowDetails] = React.useState(false);

  const [{ isHover }, dropTarget] = useDrop<IngredientShape, void, { isHover: boolean }>({
    accept: "ingredient",
    collect: monitor => ({
      isHover: monitor.isOver(),
    }),
    drop( ingredient) {
      dispatch(addIngredient(ingredient))
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

    dispatch( updateCart(middle) )
  }, [cart, dispatch]);


  const handleButtonClick = () => {
    if (cart.buns.length) {
      if (isAuth) {
        dispatch(getOrder([...cart.buns, ...cart.middle]))
      } else {
        history.push('/login')
      }
    }
  }

  const hideDetails = () => {
    setShowDetails(false);
    dispatch( getOrderResetAction() )
  }

  const bunIngrediets = cart.buns.map(
    (bun, i) => {
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

  const middleIngredients = cart.middle.map(
    (ingredient, i) => {
      return (
        <MiddleIngredient
          id={ingredient.uuid}
          {...ingredient}
          isLocked={false}
          orderIndex={i}
          moveCard={moveCard}
          key={ingredient.uuid}
        />
      )

    })

  const total = [...cart.buns, ...cart.middle].map(item => item.price).reduce((sum, el) => sum + el, 0);

  return (
    <div className={styles['burger-constructor']}>
      {
        showDetails &&
        <Modal closeModal={hideDetails} className={styles["order-details"]}>
          {orderRequest ? <Ordering /> : <OrderDetails orderNum={orderNumber} />}
        </Modal>
      }
      <div className={styles.list} ref={dropTarget} style={{ borderColor }}>
        {bunIngrediets && bunIngrediets[0]}
        <div className={styles.middle}  >
          {middleIngredients}
        </div>
        {bunIngrediets && bunIngrediets[1]}
      </div>
      <div className={styles.checkout}>
        <Button type="primary" size="medium" onClick={handleButtonClick}>
          ???????????????? ??????????
        </Button>
        <div className="text text_type_digits-medium">
          {total}
          <CurrencyIcon type="primary" />
        </div>
      </div>

    </div>
  );
}

export default BurgerConstructor;