import React from 'react';
import styles from './burger-ingredients.module.css';
import Tabs from './tabs'
import Options from './options'

import type { CartType } from '../../utils/types.js'

interface BurgerIngredientsProps{
  cart: CartType,
  setCart: (newCart: CartType) => void,
}

const BurgerIngredients = (props: BurgerIngredientsProps) => {
  type Tab = 'Булки' | 'Соусы' | 'Начинки';
  const [current_tab, setCurrent] = React.useState('Булки')
  return (
    <div className={styles['burger-ingredients']}>
      <p className={"text text_type_main-large " + styles['header']}>Соберите бургер</p>
      <div>
        <Tabs current={current_tab as Tab} setCurrent={setCurrent}/>
        <Options cart={props.cart} setCart={props.setCart}/>
      </div>
    </div>
  );
}

export default BurgerIngredients;