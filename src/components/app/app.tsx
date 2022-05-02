import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import { ProtectedRoute } from '../protected-route';

import { getIngredients } from '../../services/actions/ingredients';

import { LoginPage, RegisterPage, ForgotPasswordPage, ResetPasswordPage, ProfilePage, NotFound404 } from '../pages'

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
          <Route exact path="/register">
            <RegisterPage/>
          </Route>
          <Route exact path="/forgot-password">
            <ForgotPasswordPage/>
          </Route>
          <Route exact path="/reset-password">
            <ResetPasswordPage/>
          </Route>
          <ProtectedRoute exact path="/profile">
            <ProfilePage/>
          </ProtectedRoute>
          <Route>
            <NotFound404 />
          </Route>
        </Switch>
    </div>
  );
}

export default App;
