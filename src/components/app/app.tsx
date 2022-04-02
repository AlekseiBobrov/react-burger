import React from 'react';

import { IngredientsContext } from '../../services/appContext';
import type { CartType } from '../../utils/types.js'

import AppHeader from '../app-header/app-header'
import BurgerIngredients from '../burger-ingredients/burger-ingredients'
import BurgerConstructor from '../burger-constructor/burger-constructor'

import styles from './app.module.css';

// import { getItemsRequest } from '../../services/fakeAPI' //fakeAPI for test without internet
const API = "https://norma.nomoreparties.space/api/ingredients"

//CART for develop in sprint2/step1
const CART = {
  buns: [
    "60d3b41abdacab0026a733c6",
    "60d3b41abdacab0026a733c6"
  ],
  middle: [
    "60d3b41abdacab0026a733ce",
    "60d3b41abdacab0026a733c8",
    "60d3b41abdacab0026a733d1",
    "60d3b41abdacab0026a733d0",
    "60d3b41abdacab0026a733d0",
  ]
}

const App = () => {
  const [ingredients, setIngredients] = React.useState(null);
  const [cart, setCart] = React.useState<CartType>(CART);

  React.useEffect(
    () => {
      fetch(API)
        .then((response) => {
          if (!response.ok) {
            throw new Error("HTTP error, status = " + response.status);
          }
          return response.json();
        })
      // getItemsRequest() //fake api for testin without internet
        .then((data) => {
          setIngredients(data.data); //
        })
        .catch((error) => {
          console.log('Igredients api error:', error)
        });
    },
    []
  )

  return (
    <div className={styles.app}>
      <AppHeader />
      <main className={styles.main}>

        {ingredients &&
          <IngredientsContext.Provider value={{ ingredients, setIngredients }}>
            <BurgerIngredients cart={cart} setCart={setCart} />
            <BurgerConstructor cart={cart} setCart={setCart} />
          </IngredientsContext.Provider>
        }

      </main>
    </div>
  );
}

export default App;
