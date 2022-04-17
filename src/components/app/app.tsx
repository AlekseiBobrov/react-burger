import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import AppHeader from '../app-header/app-header'
import BurgerIngredients from '../burger-ingredients/burger-ingredients'
import BurgerConstructor from '../burger-constructor/burger-constructor'

import { getIngredients } from '../../services/actions/ingredients';

import styles from './app.module.css';

const App = () => {
  const { ingredients } = useSelector( (state: any) => state.menu );
  const dispatch = useDispatch();

  React.useEffect(
    () => {
      dispatch( getIngredients() ); 
    },
    [dispatch]
  );

  return (
    <div className={styles.app}>
      <AppHeader />
      <DndProvider backend={HTML5Backend}>
        <main className={styles.main}>
          {ingredients &&
            <>
              <BurgerIngredients />
              <BurgerConstructor />
            </>
          }
        </main>
      </DndProvider>
    </div>
  );
}

export default App;
