import React from 'react';
import styles from './burger-ingredients.module.css';
import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'

interface IngredientProps {
  img: string,
  price: number,
  name: string,
  count: number,
}

function Ingredient(props: IngredientProps) {
  return ( 
    <div className={"m-5 " + styles.ingredient}>
      <Counter count={props.count} size="default" />
      <img src={props.img}/>
      <div className={styles.price}>
        <p className="text text_type_digits-default">{props.price}</p>
        <CurrencyIcon type="primary" />
      </div>
      <p className="text text_type_main-default">{props.name}</p>
    </div>
  );
}

export default Ingredient;