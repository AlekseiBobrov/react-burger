import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import AppHeader from '../app-header/app-header'
import BurgerIngredients from '../burger-ingredients/burger-ingredients'
import BurgerConstructor from '../burger-constructor/burger-constructor'

import { getIngredients } from '../../services/actions/ingredients';

import { LoginPage } from '../pages'

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
      <Router>
        <Switch>
          <Route exact path="/">
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
          </Route>
          <Route exact path="/login">
            <LoginPage/>
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
