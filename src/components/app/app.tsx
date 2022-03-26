import React from 'react';
import styles from './app.module.css';

import AppHeader from '../app-header/app-header'
import BurgerIngredients from '../burger-ingredients/burger-ingredients'
import BurgerConstructor from '../burger-constructor/burger-constructor'
import type { IngredientShape } from '../../utils/types.js'

const API = "https://norma.nomoreparties.space/api/ingredients"

const App = () => {
  const [ingredients, setIngredients] = React.useState([] as IngredientShape[]);
  const [cart, setCart] = React.useState([] as IngredientShape[]);

  React.useEffect(
    () => {
      fetch(API)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setIngredients(data.data);
      })
      .catch((error) => {  
        console.log('Igredients api error:', error)  
      });
    },
    []
  )
  
  //CART for develop in sprint1
  React.useEffect(
    () => {
      if (ingredients.length){
        const CART = [
          'Краторная булка N-200i',
          'Соус традиционный галактический',
          'Мясо бессмертных моллюсков Protostomia',
          'Плоды Фалленианского дерева',
          'Хрустящие минеральные кольца',
          'Хрустящие минеральные кольца',
          'Краторная булка N-200i',
        ].map( name => ingredients.filter( el => el.name === name)[0] );
        setCart(CART);
      }
    },
    [ingredients]
  )
  // <div id="modal-root" className={styles['modal-root']}/>
  return (
    <div className={styles.app}>
      <AppHeader />
      <main className={styles.main}>
        {ingredients.length && <>
          <BurgerIngredients data={ingredients} cart={cart} setCart={setCart}/>
          <BurgerConstructor cart={cart} setCart={setCart}/>
        </>} 
      </main>
    </div>
  );
}

export default App;
