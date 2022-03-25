import React from 'react';
import styles from './burger-constructor.module.css';
import {data} from '../../utils/data.js';
import ConstructorIngredient from './constructor-ingredint'
import { CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components';

const ORDER = [
  "Краторная булка N-200i",
  "Соус традиционный галактический",
  "Мясо бессмертных моллюсков Protostomia",
  "Плоды Фалленианского дерева",
  "Хрустящие минеральные кольца",
  "Хрустящие минеральные кольца",
  "Краторная булка N-200i",
]

function BurgerConstructor() {
  type Type = "top" | "bottom" | undefined;
  const ingredients = ORDER.map( name => data.filter( el => el.name === name)[0] )
       .map( (el, i, arr) => {
        const { name, image, price, ...oterProps} = el;
        let type;
        let isLocked = false;
        if (i === 0 || i === arr.length - 1){
          type = i?"bottom":"top" as Type;
          isLocked = i?true:false;
        }
        return (
        <ConstructorIngredient
          name={name}
          image={image}
          price={price}
          type={type}
          isLocked={isLocked}
          key={i}
        />
        )
       })
  return (
    <div className={styles['burger-constructor']}>

      <div className={styles.list}>
        {ingredients[0]}
        <div className={styles.middle}>
          {ingredients.slice(1, -1)}
        </div>
        {ingredients.slice(-1)[0]}
      </div>

      <div className={styles.checkout}>
        <Button type="primary" size="medium">
          Оформить заказ
        </Button>
        <div className="text text_type_digits-medium">
          {ORDER.map( name => data.filter( el => el.name === name)[0]['price'] ).reduce( (sum, el) => sum + el, 0)}
          <CurrencyIcon type="primary" />
        </div>
      </div>

    </div>

  );
}

export default BurgerConstructor;