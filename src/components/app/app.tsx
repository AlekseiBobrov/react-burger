import React from 'react';
import { Switch, Route, useHistory, useLocation } from 'react-router-dom';
import { LocationState } from 'history';
import { useDispatch, useSelector } from 'react-redux';
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import { getIngredients } from '../../services/actions/ingredients';
import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import Modal from '../modal/modal';
import { ProtectedRoute } from '../protected-route';
import { LoginPage, RegisterPage, ForgotPasswordPage, ResetPasswordPage, ProfilePage, NotFound404 } from '../pages'
import IngredientDetails from '../ingredient-details/ingredient-details';

import styles from './app.module.css';

const App = () => {
  const { ingredients } = useSelector((state: any) => state.menu);
  const dispatch = useDispatch();

  React.useEffect(
    () => {
      dispatch(getIngredients());
    },
    [dispatch]
  );

  const hideModal = () => {
    history.goBack();
  }

  const history = useHistory();
  let location = useLocation();
  // @ts-ignore
  let { background } =  location.state?location.state:{};
  console.log('location', location)
  console.log('background', background)

  if (ingredients) {
    return (
      <div className={styles.app}>
        <AppHeader />
        <Switch location={ background || location } >
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
            <LoginPage />
          </Route>
          <Route exact path="/register">
            <RegisterPage />
          </Route>
          <Route exact path="/forgot-password">
            <ForgotPasswordPage />
          </Route>
          <Route exact path="/reset-password">
            <ResetPasswordPage />
          </Route>
          <ProtectedRoute exact path="/profile">
            <ProfilePage />
          </ProtectedRoute>
          <Route exact path='/ingredients/:ingredientId'>
            <IngredientDetails />
          </Route>
          <Route>
            <NotFound404 />
          </Route>
        </Switch>

        {background && (
            <Route path='/ingredients/:ingredientId'>
              <Modal closeModal={hideModal} className={styles["ingredient-details"]}>
                <IngredientDetails />
              </Modal>
            </Route>
          )}

      </div>
    );
  } else {
    return (
      <div className={styles.app}>
        <AppHeader />
      </div>
    )
  }
}

export default App;
